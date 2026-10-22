import { Link } from 'react-router-dom';

const features = [
  { icon: '🚗', title: 'Berkendara Mudah Dipahami', desc: 'Dengan teknik berkendara yang tepat, risiko kecelakaan berkurang dan kenyamanan meningkat.' },
  { icon: '🛡️', title: 'Lecet? Tanggung Jawab Kami', desc: 'Kami berusaha memberikan rasa aman dan nyaman bagi setiap pelanggan.' },
  { icon: '📅', title: 'Jadwal Bisa Diatur Sendiri', desc: 'Layanan menyesuaikan gaya hidup dan kebutuhan Anda.' },
];

const steps = [
  { num: 1, title: 'Pilih Paket', desc: 'Tentukan paket Bisa atau Mahir, manual atau matic.' },
  { num: 2, title: 'Isi Formulir', desc: 'Lengkapi data diri, konfirmasi via WhatsApp.' },
  { num: 3, title: 'Mulai Latihan', desc: 'Atur jadwal dengan instruktur dan mulai sesi mengemudi.' },
];

const alur = [
  { num: 1, title: 'Daftar & Konsultasi', desc: 'Isi formulir pendaftaran dan konsultasikan kebutuhan Anda via WhatsApp.' },
  { num: 2, title: 'Pilih Paket', desc: 'Tentukan paket Bisa/Mahir, manual/matic sesuai kemampuan dan jadwal.' },
  { num: 3, title: 'Jadwal Latihan', desc: 'Atur jadwal latihan bersama instruktur (fleksibel, bisa diubah).' },
  { num: 4, title: 'Praktik Mengemudi', desc: 'Latihan intensif dengan instruktur berpengalaman, aman & nyaman.' },
  { num: 5, title: 'Evaluasi & Selesai', desc: 'Evaluasi kemampuan, persiapan ujian SIM, dan selesai.' },
];

const instruktur = [
  { icon: '👨‍🏫', title: 'Instruktur Senior', desc: 'Pengalaman 10+ tahun, bersertifikat, sabar membimbing pemula.' },
  { icon: '🛡️', title: 'Keamanan Prioritas', desc: 'Kendaraan dilengkapi safety features, instruktur siap mengambil alih.' },
  { icon: '📅', title: 'Jadwal Fleksibel', desc: 'Atur jadwal latihan sesuai kesibukan Anda, pagi/siang/sore.' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center text-center min-h-[calc(100vh-72px)] overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy px-5 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1.5px,transparent_1.5px)] bg-[size:26px_26px] opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block text-yellow text-xs font-semibold tracking-[0.22em] uppercase mb-4">Selamat Datang di</span>
          <div className="inline-block bg-white rounded-2xl px-6 py-4 shadow-2xl mb-6">
            <img src={`${import.meta.env.BASE_URL}assets/img/logo.png`} alt="AL AUTO" className="h-16 sm:h-24 w-auto" />
          </div>
          <p className="text-blue-100 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Kursus mengemudi mobil <strong className="text-white">manual & matic</strong> di Kota Palembang — belajar terarah bersama instruktur berpengalaman, dengan jadwal yang bisa Anda atur sendiri.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/pendaftaran" className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-yellow text-navy font-bold text-sm hover:bg-white transition-all hover:-translate-y-0.5 shadow-lg">Daftar Sekarang</Link>
            <Link to="/paket" className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg border-2 border-white/75 text-white font-semibold text-sm hover:bg-white hover:text-navy transition-all hover:-translate-y-0.5">Lihat Paket & Harga</Link>
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section className="relative text-center py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-blue">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1.5px,transparent_1.5px)] bg-[size:26px_26px] opacity-40" />
        <div className="relative max-w-4xl mx-auto px-5">
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">Tempat Belajar Mengemudi Mobil Manual dan Matic di Kota Palembang</h2>
          <p className="text-blue-100 text-base max-w-2xl mx-auto mb-6">Kursus Al Auto menyediakan pelatihan mengemudi berkualitas dengan harga terjangkau, dipandu oleh instruktur berpengalaman untuk memastikan proses belajar yang aman dan efektif.</p>
          <Link to="/pendaftaran" className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-yellow text-navy font-bold text-sm hover:bg-white transition-all">Ambil Kelas Sekarang</Link>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Kenapa Memilih Kami</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">Belajar Mengemudi Jadi Lebih Mudah</h2>
            <p className="text-muted text-base">Beberapa alasan mengapa banyak peserta mempercayakan latihan mengemudinya kepada AL AUTO.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <article key={i} className="bg-white border border-line rounded-xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center text-3xl">{f.icon}</div>
                <h3 className="text-lg font-semibold text-navy mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Alur Belajar */}
      <section className="py-16 sm:py-24 bg-soft">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Alur Belajar</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">5 Langkah Menuju SIM</h2>
            <p className="text-muted text-base">Proses belajar yang terstruktur dari pendaftaran hingga lulus.</p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 list-none p-0 max-w-6xl mx-auto">
            {alur.map((s) => (
              <li key={s.num} className="bg-white border border-line rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all">
                <span className="w-12 h-12 mx-auto mb-4 rounded-full bg-navy text-yellow text-xl font-extrabold flex items-center justify-center">{s.num}</span>
                <h3 className="text-base font-semibold text-navy mb-2">{s.title}</h3>
                <p className="text-muted text-xs">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Profil Instruktur */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Tim Kami</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">Instruktur Berpengalaman</h2>
            <p className="text-muted text-base">Belajar bersama instruktur profesional yang sabar dan berpengalaman.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {instruktur.map((f, i) => (
              <article key={i} className="bg-white border border-line rounded-xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center text-3xl">{f.icon}</div>
                <h3 className="text-lg font-semibold text-navy mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mobil & Area */}
      <section className="py-16 sm:py-24 bg-soft">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Fasilitas</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">Mobil Latihan & Area Jangkauan</h2>
            <p className="text-muted text-base">Kami menyediakan mobil latihan manual & matic, area latihan di Palembang.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <article className="bg-white border border-line rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-navy mb-3">Mobil Latihan</h3>
              <ul className="text-muted text-sm space-y-2 pl-5 list-disc">
                <li>Mobil manual (transmisi kopling)</li>
                <li>Mobil matic (otomatis)</li>
                <li>Kondisi terawat & aman</li>
                <li>Double pedal (instruktur bisa mengontrol)</li>
              </ul>
            </article>
            <article className="bg-white border border-line rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-navy mb-3">Area Jangkauan</h3>
              <ul className="text-muted text-sm space-y-2 pl-5 list-disc">
                <li>Kota Palembang (semua kecamatan)</li>
                <li>Penjemputan di rumah/lokasi</li>
                <li>Area latihan: jalan sepi & parkir luas</li>
                <li>Siap melayani area sekitar Palembang</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Legalitas */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Kepercayaan</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">Legalitas & Keunggulan</h2>
            <p className="text-muted text-base">AL AUTO beroperasi secara resmi dan profesional.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '🛡️', title: 'Izin Usaha Resmi', desc: 'Beroperasi secara legal dengan izin usaha yang sah.' },
              { icon: '👥', title: '1000+ Murid Lulus', desc: 'Sudah membantu ribuan peserta mendapatkan SIM.' },
              { icon: '📅', title: '5+ Tahun Pengalaman', desc: 'Berpengalaman melayani kursus mengemudi di Palembang.' },
            ].map((f, i) => (
              <article key={i} className="bg-white border border-line rounded-xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center text-3xl">{f.icon}</div>
                <h3 className="text-lg font-semibold text-navy mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lokasi & Jam */}
      <section className="py-16 sm:py-24 bg-soft">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Lokasi</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">Kunjungi Kami</h2>
            <p className="text-muted text-base">Kursus mengemudi AL AUTO di Kota Palembang, Sumatera Selatan.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-sm border border-line">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.0!2d104.7!3d-2.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75e5f5f5f5f5%3A0x0!2sPalembang!5e0!3m2!1sid!2sid!4v1700000000000" width="100%" height="300" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi AL AUTO Palembang" />
            </div>
            <div className="bg-white border border-line rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-navy mb-4">Jam Operasional</h3>
              <ul className="list-none p-0 space-y-2">
                <li className="py-2 border-b border-dashed border-line"><strong>Senin – Jumat:</strong> 08.00 – 17.00</li>
                <li className="py-2 border-b border-dashed border-line"><strong>Sabtu:</strong> 08.00 – 15.00</li>
                <li className="py-2"><strong>Minggu:</strong> By appointment</li>
              </ul>
              <p className="mt-4 text-muted text-sm">Hubungi kami via WhatsApp untuk jadwal khusus.</p>
              <a href="https://wa.me/628979480919?text=Halo%20AL%20AUTO%2C%20saya%20ingin%20bertanya%20tentang%20kursus%20mengemudi." target="_blank" rel="noopener" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-yellow text-navy font-bold text-sm hover:bg-white transition-all mt-3">Chat WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Daftar */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Cara Mendaftar</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">Tiga Langkah untuk Mulai Belajar</h2>
            <p className="text-muted text-base">Proses pendaftaran cepat dan tanpa ribet, langsung terhubung dengan kami.</p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6 list-none p-0 max-w-4xl mx-auto">
            {steps.map((s) => (
              <li key={s.num} className="bg-white border border-line rounded-xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all">
                <span className="w-12 h-12 mx-auto mb-4 rounded-full bg-navy text-yellow text-xl font-extrabold flex items-center justify-center">{s.num}</span>
                <h3 className="text-lg font-semibold text-navy mb-2">{s.title}</h3>
                <p className="text-muted text-sm">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 sm:py-20 bg-navy overflow-hidden">
        <div className="absolute w-[420px] h-[420px] -top-44 -right-28 rounded-full bg-blue/20 blur-[60px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-between gap-7">
          <div>
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">Siap Belajar Mengemudi?</h2>
            <p className="text-blue-200 text-base">Hubungi kami untuk informasi jadwal, pendaftaran, dan pilihan paket kursus.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/pendaftaran" className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-yellow text-navy font-bold text-sm hover:bg-white transition-all">Daftar Sekarang</Link>
            <a href="https://wa.me/628979480919?text=Halo%20AL%20AUTO%2C%20saya%20ingin%20bertanya%20tentang%20kursus%20mengemudi." target="_blank" rel="noopener" className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg border-2 border-white/75 text-white font-semibold text-sm hover:bg-white hover:text-navy transition-all">Chat WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}