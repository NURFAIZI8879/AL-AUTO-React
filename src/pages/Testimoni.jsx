const testimonials = [
  { name: 'Budi S.', package: 'Paket Bisa Matic', quote: 'Instruktornya sabar dan jelas. Saya yang awalnya takut nyetir sekarang sudah percaya diri.' },
  { name: 'Sari D.', package: 'Paket Mahir Manual', quote: 'Jadwal fleksibel, bisa disesuaikan dengan kerja. Mobil bersih dan aman.' },
  { name: 'Andi R.', package: 'Paket Bisa Manual', quote: 'Harga terjangkau, instruktur profesional. Recommended untuk pemula!' },
  { name: 'Dewi L.', package: 'Paket Mahir Matic', quote: 'Proses belajar menyenangkan, instruktur ramah dan sabar. Lulus SIM dalam 1 bulan!' },
];

export default function Testimoni() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Testimoni</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3">Apa Kata Pelanggan Kami</h1>
          <p className="text-muted text-base">Ulasan tertulis dari peserta yang sudah belajar bersama AL AUTO.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <article key={i} className="bg-white border border-line rounded-xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <p className="text-muted text-sm italic leading-relaxed mb-4">"{t.quote}"</p>
              <h3 className="text-base font-semibold text-navy">{t.name}</h3>
              <p className="text-xs text-muted mt-1">{t.package}</p>
            </article>
          ))}
        </div>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Galeri</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">Galeri Testimoni</h2>
          <p className="text-muted text-base">Klik gambar untuk memperbesar.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <figure key={i} className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer">
              <img src={`${import.meta.env.BASE_URL}assets/img/testimoni/testi${i + 1}.${i < 5 ? 'png' : 'jpg'}`} alt={`Testimoni pelanggan ${i + 1}`} className="w-full h-48 object-cover hover:scale-105 transition-transform" loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}