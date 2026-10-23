import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Berkendara Mudah Dipahami',
    desc: 'Dengan memahami dan menerapkan teknik-teknik berkendara, pengemudi dapat mengurangi risiko kecelakaan dan meningkatkan kenyamanan.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 11l1.5-4.2A2 2 0 0 1 8.4 5.5h7.2a2 2 0 0 1 1.9 1.3L19 11" />
        <rect x="3" y="11" width="18" height="6" rx="2" />
        <path d="M7 17v1.5M17 17v1.5M6.5 14h1M16.5 14h1" />
      </svg>
    ),
  },
  {
    title: 'Lecet? Tanggung Jawab Kami',
    desc: 'Kami berusaha memberikan rasa aman dan nyaman bagi setiap pelanggan yang mempercayakan kendaraannya kepada kami.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l7.5 3v5.2c0 4.6-3.1 8.8-7.5 10.3C7.6 20 4.5 15.8 4.5 11.2V6L12 3z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
      </svg>
    ),
  },
  {
    title: 'Jadwal? Bisa Diatur Sendiri',
    desc: 'Layanan yang menyesuaikan gaya hidup dan kebutuhan Anda, memberikan kenyamanan dan kemudahan di setiap langkah.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
      </svg>
    ),
  },
];

const alur = [
  { title: 'Daftar & Konsultasi', desc: 'Isi formulir pendaftaran dan konsultasikan kebutuhan Anda via WhatsApp.' },
  { title: 'Pilih Paket', desc: 'Tentukan paket Bisa/Mahir, manual/matic sesuai kemampuan dan jadwal.' },
  { title: 'Jadwal Latihan', desc: 'Atur jadwal latihan bersama instruktur (fleksibel, bisa diubah).' },
  { title: 'Praktik Mengemudi', desc: 'Latihan intensif dengan instruktur berpengalaman, aman & nyaman.' },
  { title: 'Evaluasi & Selesai', desc: 'Evaluasi kemampuan, persiapan ujian SIM, dan selesai.' },
];

const instruktur = [
  {
    title: 'Instruktur Senior',
    desc: 'Pengalaman 10+ tahun, bersertifikat, sabar membimbing pemula.',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>,
  },
  {
    title: 'Keamanan Prioritas',
    desc: 'Kendaraan dilengkapi safety features, instruktur siap mengambil alih.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l7.5 3v5.2c0 4.6-3.1 8.8-7.5 10.3C7.6 20 4.5 15.8 4.5 11.2V6L12 3z" />
      </svg>
    ),
  },
  {
    title: 'Jadwal Fleksibel',
    desc: 'Atur jadwal latihan sesuai kesibukan Anda, pagi/siang/sore.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </svg>
    ),
  },
];

const legalitas = [
  {
    title: 'Izin Usaha Resmi',
    desc: 'Beroperasi secara legal dengan izin usaha yang sah.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l7.5 3v5.2c0 4.6-3.1 8.8-7.5 10.3C7.6 20 4.5 15.8 4.5 11.2V6L12 3z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
      </svg>
    ),
  },
  {
    title: '1000+ Murid Lulus',
    desc: 'Sudah membantu ribuan peserta mendapatkan SIM.',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>,
  },
  {
    title: '5+ Tahun Pengalaman',
    desc: 'Berpengalaman melayani kursus mengemudi di Palembang.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </svg>
    ),
  },
];

export default function Home() {
  const base = import.meta.env.BASE_URL;
  return (
    <>
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline preload="none" poster={`${base}assets/img/logo.png`}>
          <source src={`${base}assets/video/hero.mp4`} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content fade-in">
          <span className="hero-eyebrow">Selamat Datang di</span>
          <div className="hero-logo">
            <img src={`${base}assets/img/logo.png`} alt="AL AUTO — Kursus Mengemudi" />
          </div>
          <p className="hero-tagline">
            Kursus mengemudi mobil <strong>manual &amp; matic</strong> di Kota Palembang — belajar terarah bersama
            instruktur berpengalaman, dengan jadwal yang bisa Anda atur sendiri.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/pendaftaran">Daftar Sekarang</Link>
            <Link className="btn btn-outline" to="/paket">Lihat Paket &amp; Harga</Link>
          </div>
        </div>
      </section>

      <section className="about-band" id="tentang">
        <div className="container">
          <div className="about-inner fade-in">
            <h2>Tempat Belajar Mengemudi Mobil Manual dan Matic di Kota Palembang</h2>
            <p>
              Kursus Al Auto menyediakan pelatihan mengemudi berkualitas dengan harga terjangkau, dipandu oleh
              instruktur berpengalaman untuk memastikan proses belajar yang aman dan efektif.
            </p>
            <Link className="btn btn-primary" to="/pendaftaran">Ambil Kelas Sekarang</Link>
          </div>
        </div>
      </section>

      <section className="section" id="keunggulan">
        <div className="container">
          <div className="section-head fade-in">
            <span className="eyebrow">Kenapa Memilih Kami</span>
            <h2>Belajar Mengemudi Jadi Lebih Mudah</h2>
            <p>Beberapa alasan mengapa banyak peserta mempercayakan latihan mengemudinya kepada AL AUTO.</p>
          </div>
          <div className="grid grid-3">
            {features.map((f) => (
              <article className="card feature-card fade-in" key={f.title}>
                <div className="card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="cara-daftar">
        <div className="container">
          <div className="section-head fade-in">
            <span className="eyebrow">Cara Mendaftar</span>
            <h2>Tiga Langkah untuk Mulai Belajar</h2>
            <p>Proses pendaftaran cepat dan tanpa ribet, langsung terhubung dengan kami.</p>
          </div>
          <ol className="steps">
            <li className="step fade-in">
              <span className="step-num">1</span>
              <h3>Pilih Paket</h3>
              <p>Tentukan paket Bisa atau Mahir, dengan mobil manual atau matic, sesuai kebutuhan Anda.</p>
            </li>
            <li className="step fade-in">
              <span className="step-num">2</span>
              <h3>Isi Formulir Pendaftaran</h3>
              <p>Lengkapi data diri melalui formulir pendaftaran di website, lalu konfirmasi lewat WhatsApp.</p>
            </li>
            <li className="step fade-in">
              <span className="step-num">3</span>
              <h3>Mulai Latihan</h3>
              <p>Atur jadwal latihan bersama instruktur dan mulai sesi mengemudi Anda.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <div className="cta-inner fade-in">
            <div className="cta-text">
              <h2>Siap Belajar Mengemudi?</h2>
              <p>Hubungi kami untuk informasi jadwal, pendaftaran, dan pilihan paket kursus.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary" to="/pendaftaran">Daftar Sekarang</Link>
              <a className="btn btn-outline" href="https://wa.me/628979480919?text=Halo%20AL%20AUTO%2C%20saya%20ingin%20bertanya%20tentang%20kursus%20mengemudi." target="_blank" rel="noopener">
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="alur-belajar">
        <div className="container">
          <div className="section-head fade-in">
            <span className="eyebrow">Alur Belajar</span>
            <h2>5 Langkah Menuju SIM</h2>
            <p>Proses belajar yang terstruktur dari pendaftaran hingga lulus.</p>
          </div>
          <ol className="steps">
            {alur.map((s, i) => (
              <li className="step fade-in" key={s.title}>
                <span className="step-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt" id="instruktur">
        <div className="container">
          <div className="section-head fade-in">
            <span className="eyebrow">Tim Kami</span>
            <h2>Instruktur Berpengalaman</h2>
            <p>Belajar bersama instruktur profesional yang sabar dan berpengalaman.</p>
          </div>
          <div className="grid grid-3">
            {instruktur.map((f) => (
              <article className="card feature-card fade-in" key={f.title}>
                <div className="card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="mobil-area">
        <div className="container">
          <div className="section-head fade-in">
            <span className="eyebrow">Fasilitas</span>
            <h2>Mobil Latihan &amp; Area Jangkauan</h2>
            <p>Kami menyediakan mobil latihan manual &amp; matic, area latihan di Palembang.</p>
          </div>
          <div className="grid grid-2">
            <article className="card fade-in">
              <h3>Mobil Latihan</h3>
              <ul style={{ color: 'var(--muted)', fontSize: 15, paddingLeft: 20 }}>
                <li>Mobil manual (transmisi kopling)</li>
                <li>Mobil matic (otomatis)</li>
                <li>Kondisi terawat &amp; aman</li>
                <li>Double pedal (instruktur bisa mengontrol)</li>
              </ul>
            </article>
            <article className="card fade-in">
              <h3>Area Jangkauan</h3>
              <ul style={{ color: 'var(--muted)', fontSize: 15, paddingLeft: 20 }}>
                <li>Kota Palembang (semua kecamatan)</li>
                <li>Penjemputan di rumah/lokasi</li>
                <li>Area latihan: jalan sepi &amp; parkir luas</li>
                <li>Siap melayani area sekitar Palembang</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="legalitas">
        <div className="container">
          <div className="section-head fade-in">
            <span className="eyebrow">Kepercayaan</span>
            <h2>Legalitas &amp; Keunggulan</h2>
            <p>AL AUTO beroperasi secara resmi dan profesional.</p>
          </div>
          <div className="grid grid-3">
            {legalitas.map((f) => (
              <article className="card feature-card fade-in" key={f.title}>
                <div className="card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="lokasi">
        <div className="container">
          <div className="section-head fade-in">
            <span className="eyebrow">Lokasi</span>
            <h2>Kunjungi Kami</h2>
            <p>Kursus mengemudi AL AUTO di Kota Palembang, Sumatera Selatan.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
            <div className="card fade-in" style={{ padding: 0, overflow: 'hidden' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.0!2d104.7!3d-2.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75e5f5f5f5f5%3A0x0!2sPalembang!5e0!3m2!1sid!2sid!4v1700000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi AL AUTO Palembang"
              />
            </div>
            <div className="card fade-in">
              <h3>Jam Operasional</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--line)' }}>
                  <strong>Senin – Jumat:</strong> 08.00 – 17.00
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--line)' }}>
                  <strong>Sabtu:</strong> 08.00 – 15.00
                </li>
                <li style={{ padding: '8px 0' }}>
                  <strong>Minggu:</strong> By appointment
                </li>
              </ul>
              <p style={{ marginTop: 16, color: 'var(--muted)', fontSize: 14 }}>
                Hubungi kami via WhatsApp untuk jadwal khusus.
              </p>
              <a
                className="btn btn-primary"
                href="https://wa.me/628979480919?text=Halo%20AL%20AUTO%2C%20saya%20ingin%20bertanya%20tentang%20kursus%20mengemudi."
                target="_blank"
                rel="noopener"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
