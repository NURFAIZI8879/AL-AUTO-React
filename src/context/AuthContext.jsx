import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const snap = await getDoc(doc(db, 'users', u.uid));
          setUserDoc(snap.exists() ? snap.data() : null);
        } catch (e) {
          setUserDoc(null);
        }
      } else {
        setUserDoc(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred;
  };

  const register = async (name, email, password, phone) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    try { await sendEmailVerification(cred.user); } catch (e) { console.warn(e); }
    await setDoc(doc(db, 'users', cred.user.uid), {
      name, email, phone: phone || '', role: 'user', status: 'pending',
      emailVerified: false, createdAt: serverTimestamp()
    });
    return cred;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const isAdmin = userDoc?.role === 'admin';
  const isApproved = userDoc?.status === 'approved';

  return (
    <AuthContext.Provider value={{ user, userDoc, loading, login, register, logout, resetPassword, isAdmin, isApproved }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);