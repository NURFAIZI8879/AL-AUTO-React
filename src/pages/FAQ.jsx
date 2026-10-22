const faqs = [
  { q: 'Berapa biaya kursus?', a: 'Lihat halaman Paket & Harga. Harga mulai dari paket "Bisa" hingga "Mahir", manual atau matic.' },
  { q: 'Berapa lama durasi kursus?', a: 'Durasi tergantung paket. Setiap pertemuan berlangsung sekitar 1,5–2 jam. Jadwal bisa diatur sendiri.' },
  { q: 'Berapa jumlah pertemuan?', a: 'Paket "Bisa" biasanya 10 pertemuan, paket "Mahir" lebih banyak. Detail ada di halaman Paket.' },
  { q: 'Apakah mobil disediakan?', a: 'Ya, mobil latihan disediakan (manual/matic sesuai paket). Anda tidak perlu membawa mobil sendiri.' },
  { q: 'Area penjemputan di mana?', a: 'Kota Palembang dan sekitarnya. Hubungi kami via WhatsApp untuk konfirmasi lokasi Anda.' },
  { q: 'Apakah ada garansi belajar sampai bisa?', a: 'Kami berusaha memberikan pelatihan terbaik. Konsultasikan dengan instruktur untuk kebutuhan khusus.' },
  { q: 'Bagaimana cara daftar?', a: 'Isi formulir di halaman Pendaftaran atau chat WhatsApp kami.' },
];

export default function FAQ() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">FAQ</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3">Pertanyaan yang Sering Diajukan</h1>
          <p className="text-muted text-base">Jawaban untuk pertanyaan umum seputar kursus mengemudi AL AUTO.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border border-line rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-navy mb-2">{f.q}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}