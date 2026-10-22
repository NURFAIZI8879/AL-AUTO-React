const packages = [
  { name: 'Paket Bisa Manual', price: 'Rp800.000', sessions: '10x pertemuan', unit: '1x pertemuan 1 jam', features: ['Mobil manual', 'Instruktur berpengalaman', 'Jadwal fleksibel', 'Materi dasar'] },
  { name: 'Paket Bisa Matic', price: 'Rp800.000', sessions: '10x pertemuan', unit: '1x pertemuan 1 jam', features: ['Mobil matic', 'Instruktur berpengalaman', 'Jadwal fleksibel', 'Materi dasar'] },
  { name: 'Paket Mahir Manual', price: 'Rp1.400.000', sessions: '20x pertemuan', unit: '1x pertemuan 1 jam', features: ['Mobil manual', 'Instruktur senior', 'Jadwal fleksibel', 'Materi lanjutan', 'Persiapan SIM'] },
  { name: 'Paket Mahir Matic', price: 'Rp1.400.000', sessions: '25x pertemuan', unit: '1x pertemuan 1 jam', features: ['Mobil matic', 'Instruktur senior', 'Jadwal fleksibel', 'Materi lanjutan', 'Persiapan SIM'] },
];

export default function Paket() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Paket & Harga</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3">Pilih Paket Kursus Anda</h1>
          <p className="text-muted text-base">Paket lengkap untuk berbagai kebutuhan, manual atau matic.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((p, i) => (
            <div key={i} className="bg-white border border-line rounded-xl p-7 flex flex-col text-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all">
              <span className="self-center inline-block bg-blue/10 text-blue text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-4">{p.name.split(' ')[1]}</span>
              <h2 className="text-sm font-bold tracking-wide uppercase text-navy mb-3">{p.name}</h2>
              <div className="mb-5">
                <span className="text-xs font-medium text-muted uppercase tracking-wider">Mulai dari</span>
                <div className="text-3xl font-extrabold text-navy leading-tight">{p.price}</div>
                <span className="text-xs text-muted">{p.sessions}, {p.unit}</span>
              </div>
              <ul className="list-none p-0 text-left flex-grow mb-6 space-y-2">
                {p.features.map((f, j) => (
                  <li key={j} className="relative pl-7 text-sm text-muted py-1.5 border-b border-dashed border-line last:border-0">
                    <span className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-blue/10 text-blue text-[11px] font-bold flex items-center justify-center">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={`/pendaftaran?paket=${encodeURIComponent(p.name)}`} className="inline-flex items-center justify-center w-full py-3 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-blue transition-all">Daftar Sekarang</a>
            </div>
          ))}
        </div>
        <p className="text-center text-muted text-sm max-w-2xl mx-auto mt-10">Harga dapat berubah sewaktu-waktu. Hubungi kami untuk informasi terbaru dan promo.</p>
      </div>
    </div>
  );
}