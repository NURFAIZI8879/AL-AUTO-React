import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white text-base font-semibold mb-4 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-yellow after:rounded">Tentang AL AUTO</h4>
          <p className="text-sm leading-relaxed text-slate-400">Kursus Al Auto menyediakan pelatihan mengemudi berkualitas dengan harga terjangkau, dipandu oleh instruktur berpengalaman.</p>
        </div>
        <div>
          <h4 className="text-white text-base font-semibold mb-4 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-yellow after:rounded">Navigasi</h4>
          <ul className="list-none p-0 space-y-1">
            {['/', '/testimoni', '/paket', '/absensi', '/pendaftaran'].map((to, i) => (
              <li key={to}><Link to={to} className="block text-slate-300 no-underline text-sm py-1 hover:text-yellow hover:translate-x-1 transition-all">{['Beranda','Testimoni','Paket & Harga','Absensi','Pendaftaran'][i]}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white text-base font-semibold mb-4 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-yellow after:rounded">Paket Kursus</h4>
          <ul className="list-none p-0 space-y-1">
            <li><Link to="/paket" className="block text-slate-300 no-underline text-sm py-1 hover:text-yellow hover:translate-x-1 transition-all">Paket Bisa Manual</Link></li>
            <li><Link to="/paket" className="block text-slate-300 no-underline text-sm py-1 hover:text-yellow hover:translate-x-1 transition-all">Paket Bisa Matic</Link></li>
            <li><Link to="/paket" className="block text-slate-300 no-underline text-sm py-1 hover:text-yellow hover:translate-x-1 transition-all">Paket Mahir Manual</Link></li>
            <li><Link to="/paket" className="block text-slate-300 no-underline text-sm py-1 hover:text-yellow hover:translate-x-1 transition-all">Paket Mahir Matic</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-base font-semibold mb-4 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-yellow after:rounded">Hubungi Kami</h4>
          <ul className="list-none p-0 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <svg className="w-4.5 h-4.5 mt-0.5 flex-shrink-0 stroke-yellow fill-none stroke-2" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7a2 2 0 0 1 1.7 2z"/></svg>
              <a href="https://wa.me/628979480919" target="_blank" rel="noopener" className="text-slate-300 no-underline hover:text-yellow">0897-9480-919</a>
            </li>
            <li className="flex items-start gap-2.5">
              <svg className="w-4.5 h-4.5 mt-0.5 flex-shrink-0 stroke-yellow fill-none stroke-2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Kota Palembang, Sumatera Selatan</span>
            </li>
          </ul>
          <h4 className="text-white text-base font-semibold mb-3 mt-4 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-yellow after:rounded">Media Sosial</h4>
          <div className="flex gap-4">
            <a href="https://instagram.com/alauto" target="_blank" rel="noopener" className="text-slate-300 no-underline hover:text-yellow text-sm">Instagram</a>
            <a href="https://tiktok.com/@alauto" target="_blank" rel="noopener" className="text-slate-300 no-underline hover:text-yellow text-sm">TikTok</a>
            <a href="https://facebook.com/alauto" target="_blank" rel="noopener" className="text-slate-300 no-underline hover:text-yellow text-sm">Facebook</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span>© {new Date().getFullYear()} AL AUTO. Seluruh hak cipta dilindungi.</span>
          <span>Kursus Mengemudi Manual & Matic — Palembang</span>
        </div>
      </div>
    </footer>
  );
}