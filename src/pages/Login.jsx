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
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-line">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-navy">Login / Daftar</h1>
          <p className="text-muted text-sm mt-1">Masuk untuk mengakses fitur absensi dan panel admin.</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-lg font-semibold text-sm transition ${mode === 'login' ? 'bg-navy text-white' : 'bg-soft text-navy border border-line'}`}>Login</button>
          <button onClick={() => setMode('register')} className={`flex-1 py-2 rounded-lg font-semibold text-sm transition ${mode === 'register' ? 'bg-navy text-white' : 'bg-soft text-navy border border-line'}`}>Daftar</button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-blue transition-all disabled:opacity-60">
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
            <p className="text-center text-sm text-muted mt-2">
              <button type="button" onClick={forgotPassword} className="text-blue hover:underline bg-transparent border-none cursor-pointer">Lupa password?</button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Nama Lengkap</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">No. HP / WhatsApp</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
            </div>
            {/* reCAPTCHA placeholder (ganti YOUR_SITE_KEY) */}
            {/* <div className="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY" /> */}
            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-blue transition-all disabled:opacity-60">
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>
        )}

        {msg && <p className={`mt-4 text-center text-sm ${msg.includes('berhasil') || msg.includes('terkirim') ? 'text-green-600' : 'text-red-500'}`}>{msg}</p>}
      </div>
    </div>
  );
}