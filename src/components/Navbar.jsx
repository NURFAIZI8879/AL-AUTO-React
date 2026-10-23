import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Beranda' },
    { to: '/testimoni', label: 'Testimoni' },
    { to: '/paket', label: 'Paket & Harga' },
    { to: '/absensi', label: 'Absensi' },
  ];

  const isActive = (to) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to));

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link className="brand" to="/">
          <span className="brand-logo">
            <img src={`${import.meta.env.BASE_URL}assets/img/logo.png`} alt="Logo AL AUTO" />
          </span>
          <span className="brand-text">
            AL AUTO
            <small>Kursus Mengemudi</small>
          </span>
        </Link>

        <button
          className={`nav-toggle ${open ? 'is-active' : ''}`}
          type="button"
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`navbar-nav ${open ? 'is-open' : ''}`} id="nav-menu">
          {links.map((l) => (
            <li className="nav-item" key={l.to}>
              <Link className={`nav-link ${isActive(l.to) ? 'active' : ''}`} to={l.to}>
                {l.label}
              </Link>
            </li>
          ))}

          {user ? (
            <>
              {isAdmin && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                    to="/admin"
                  >
                    Admin
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <button className="nav-link" type="button" onClick={logout} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">
                Login
              </Link>
            </li>
          )}

          <li className="nav-item daftar">
            <Link className="nav-link" to="/pendaftaran">
              Daftar
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
