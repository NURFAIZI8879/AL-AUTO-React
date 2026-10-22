import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, userDoc, logout, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/testimoni', label: 'Testimoni' },
    { to: '/paket', label: 'Paket & Harga' },
    { to: '/absensi', label: 'Absensi' },
    { to: '/pendaftaran', label: 'Daftar', cta: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[72px]">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <span className="bg-white rounded-lg px-2 py-1 flex items-center">
            <img src={`${import.meta.env.BASE_URL}assets/img/logo.png`} alt="Logo AL AUTO" className="h-7 w-auto" />
          </span>
          <span className="flex flex-col text-white font-extrabold text-lg leading-tight tracking-wide">
            AL AUTO
            <small className="text-[9px] font-medium tracking-[0.2em] uppercase text-blue-200">Kursus Mengemudi</small>
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-11 h-11 p-2.5 bg-white/10 rounded-lg border-none cursor-pointer"
          aria-label="Buka menu navigasi"
        >
          <span className={`block h-0.5 w-full bg-white rounded transition-all ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-full bg-white rounded transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-full bg-white rounded transition-all ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>

        <nav className={`${open ? 'flex' : 'hidden'} md:flex absolute md:static top-[72px] left-0 right-0 flex-col md:flex-row items-stretch md:items-center gap-1 bg-navy p-4 md:p-0 md:bg-transparent shadow-lg md:shadow-none`}>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                l.cta
                  ? 'bg-yellow text-navy font-bold text-center hover:bg-white'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              } ${location.pathname === l.to ? 'text-white font-semibold' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              {isAdmin && <Link to="/admin" className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white">Admin Panel</Link>}
              <button onClick={logout} className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white bg-transparent border-none cursor-pointer text-left">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white">Login / Daftar</Link>
          )}
        </nav>
      </div>
    </header>
  );
}