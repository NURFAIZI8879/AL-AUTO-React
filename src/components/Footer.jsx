import { Link } from 'react-router-dom';

const WA = 'https://wa.me/628979480919';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Tentang AL AUTO</h4>
            <p>
              Kursus Al Auto menyediakan pelatihan mengemudi berkualitas dengan harga terjangkau, dipandu oleh
              instruktur berpengalaman untuk memastikan proses belajar yang aman dan efektif.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigasi</h4>
            <ul>
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/testimoni">Testimoni</Link></li>
              <li><Link to="/paket">Paket &amp; Harga</Link></li>
              <li><Link to="/absensi">Absensi</Link></li>
              <li><Link to="/pendaftaran">Pendaftaran</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Paket Kursus</h4>
            <ul>
              <li><Link to="/paket">Paket Bisa Manual</Link></li>
              <li><Link to="/paket">Paket Bisa Matic</Link></li>
              <li><Link to="/paket">Paket Mahir Manual</Link></li>
              <li><Link to="/paket">Paket Mahir Matic</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Hubungi Kami</h4>
            <ul className="footer-contact">
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7a2 2 0 0 1 1.7 2z" />
                </svg>
                <a href={WA} target="_blank" rel="noopener">
                  0897-9480-919
                </a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Kota Palembang, Sumatera Selatan</span>
              </li>
            </ul>

            <h4 style={{ marginTop: 18 }}>Media Sosial</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <li><a href="https://instagram.com/alauto" target="_blank" rel="noopener" style={{ color: '#c9d6ea', textDecoration: 'none' }}>Instagram</a></li>
              <li><a href="https://tiktok.com/@alauto" target="_blank" rel="noopener" style={{ color: '#c9d6ea', textDecoration: 'none' }}>TikTok</a></li>
              <li><a href="https://facebook.com/alauto" target="_blank" rel="noopener" style={{ color: '#c9d6ea', textDecoration: 'none' }}>Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>&copy; {new Date().getFullYear()} AL AUTO. Seluruh hak cipta dilindungi.</span>
          <span>Kursus Mengemudi Manual &amp; Matic &mdash; Palembang</span>
        </div>
      </div>
    </footer>
  );
}
