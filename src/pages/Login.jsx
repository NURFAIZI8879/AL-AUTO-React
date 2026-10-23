import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, register, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setMsg('Login gagal: ' + (err.message || err));
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await register(name, email, password, phone);
      setMsg('Pendaftaran berhasil. Cek email untuk verifikasi, lalu tunggu persetujuan admin.');
    } catch (err) {
      setMsg('Daftar gagal: ' + (err.message || err));
    } finally { setLoading(false); }
  };

  const forgotPassword = async () => {
    if (!email) { setMsg('Masukkan email terlebih dahulu.'); return; }
    try {
      await resetPassword(email);
      setMsg('Link reset password telah dikirim ke email Anda.');
    } catch (err) { setMsg('Gagal: ' + (err.message || err)); }
  };

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="hero-eyebrow">Akun</span>
          <h1>Login / Daftar</h1>
          <p>Masuk untuk mengakses fitur absensi dan panel admin.</p>
        </div>
      </section>

      <section className="form-section">
        <div className="container" style={{ maxWidth: 480 }}>
          <div className="form-card">
            <h2>Login / Daftar</h2>
            <p className="form-subtitle">Masuk untuk mengakses fitur absensi dan panel admin.</p>

            <div className="admin-tabs" style={{ marginBottom: 16 }}>
              <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
              <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Daftar</button>
            </div>

            {mode === 'login' ? (
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading} className="btn btn-navy btn-block">
                  {loading ? 'Memproses...' : 'Masuk'}
                </button>
                <p className="form-note">
                  <button type="button" onClick={forgotPassword} style={{ color: 'var(--blue)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    Lupa password?
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label>Nama Lengkap</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>No. HP / WhatsApp</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                </div>
                <button type="submit" disabled={loading} className="btn btn-navy btn-block">
                  {loading ? 'Memproses...' : 'Daftar'}
                </button>
              </form>
            )}

            {msg && (
              <p className="form-note" style={{ color: msg.includes('berhasil') || msg.includes('terkirim') ? '#16a34a' : '#dc2626' }}>
                {msg}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
