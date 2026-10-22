import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Absensi from './pages/Absensi';
import Admin from './pages/Admin';
import Paket from './pages/Paket';
import Testimoni from './pages/Testimoni';
import Pendaftaran from './pages/Pendaftaran';
import FAQ from './pages/FAQ';
import Privasi from './pages/Privasi';
import NotFound from './pages/NotFound';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, userDoc, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen text-navy">Memuat...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && userDoc?.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen flex flex-col bg-cream">
          <Navbar />
          <main className="flex-1 pt-[72px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/paket" element={<Paket />} />
              <Route path="/testimoni" element={<Testimoni />} />
              <Route path="/pendaftaran" element={<Pendaftaran />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privasi" element={<Privasi />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/absensi" element={<ProtectedRoute><Absensi /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}