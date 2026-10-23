import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: '40px 20px' }}>
      <div>
        <h1 style={{ fontSize: 72, margin: 0, color: 'var(--navy)' }}>404</h1>
        <h2 style={{ fontSize: 24, color: 'var(--navy)', marginTop: 8 }}>Halaman Tidak Ditemukan</h2>
        <p style={{ color: 'var(--muted)', maxWidth: 420, margin: '12px auto 24px' }}>
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link className="btn btn-primary" to="/">Kembali ke Beranda</Link>
      </div>
    </main>
  );
}
