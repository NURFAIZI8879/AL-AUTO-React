import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 text-center">
      <div>
        <h1 className="text-7xl font-extrabold text-navy mb-2">404</h1>
        <h2 className="text-2xl font-bold text-navy mb-3">Halaman Tidak Ditemukan</h2>
        <p className="text-muted max-w-md mx-auto mb-6">Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <Link to="/" className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-navy text-white font-bold text-sm hover:bg-blue transition-all">Kembali ke Beranda</Link>
      </div>
    </div>
  );
}