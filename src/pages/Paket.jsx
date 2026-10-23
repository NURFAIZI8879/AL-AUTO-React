import { Link } from 'react-router-dom';

const packages = [
  { name: 'Paket Bisa Manual', badge: 'Pemula', price: 'Rp800.000', sessions: '10x pertemuan', unit: '1x pertemuan 1 jam', features: ['Mobil manual', 'Instruktur berpengalaman', 'Jadwal fleksibel', 'Materi dasar'] },
  { name: 'Paket Bisa Matic', badge: 'Pemula', price: 'Rp800.000', sessions: '10x pertemuan', unit: '1x pertemuan 1 jam', features: ['Mobil matic', 'Instruktur berpengalaman', 'Jadwal fleksibel', 'Materi dasar'] },
  { name: 'Paket Mahir Manual', badge: 'Lanjutan', price: 'Rp1.400.000', sessions: '20x pertemuan', unit: '1x pertemuan 1 jam', features: ['Mobil manual', 'Instruktur senior', 'Jadwal fleksibel', 'Materi lanjutan', 'Persiapan SIM'] },
  { name: 'Paket Mahir Matic', badge: 'Lanjutan', price: 'Rp1.400.000', sessions: '25x pertemuan', unit: '1x pertemuan 1 jam', features: ['Mobil matic', 'Instruktur senior', 'Jadwal fleksibel', 'Materi lanjutan', 'Persiapan SIM'] },
];

export default function Paket() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="hero-eyebrow">Daftar Harga</span>
          <h1>Harga dan Paket Kursus Kami</h1>
          <p>Pilih paket latihan yang sesuai dengan kebutuhan Anda. Semua paket berdurasi 1 jam setiap pertemuannya.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-4 price-grid">
            {packages.map((p, i) => (
              <article className="price-card fade-in" key={i}>
                <span className="price-badge">{p.badge}</span>
                <h2>{p.name}</h2>
                <div className="price-value">
                  <span className="price-from">Mulai dari</span>
                  {p.price}
                </div>
                <ul className="price-meta">
                  <li>{p.sessions}</li>
                  <li>{p.unit}</li>
                  {p.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
                <Link className="btn btn-primary" to={`/pendaftaran?paket=${encodeURIComponent(p.name)}`} style={{ marginTop: 'auto' }}>
                  Daftar Sekarang
                </Link>
              </article>
            ))}
          </div>
          <p className="price-note fade-in">
            Harga dapat berubah sewaktu-waktu. Hubungi kami untuk informasi terbaru dan promo.
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <div className="cta-inner fade-in">
            <div className="cta-text">
              <h2>Sudah Menentukan Pilihan?</h2>
              <p>Daftar sekarang dan atur jadwal latihan pertama Anda bersama instruktur kami.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary" to="/pendaftaran">Daftar Sekarang</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
