import { useState } from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
  { name: 'Budi S.', package: 'Paket Bisa Matic', quote: 'Instruktornya sabar dan jelas. Saya yang awalnya takut nyetir sekarang sudah percaya diri.' },
  { name: 'Sari D.', package: 'Paket Mahir Manual', quote: 'Jadwal fleksibel, bisa disesuaikan dengan kerja. Mobil bersih dan aman.' },
  { name: 'Andi R.', package: 'Paket Bisa Manual', quote: 'Harga terjangkau, instruktur profesional. Recommended untuk pemula!' },
  { name: 'Dewi L.', package: 'Paket Mahir Matic', quote: 'Proses belajar menyenangkan, instruktur ramah dan sabar. Lulus SIM dalam 1 bulan!' },
];

export default function Testimoni() {
  const base = import.meta.env.BASE_URL;
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <section className="page-hero">
        <img className="page-hero-img" src={`${base}assets/img/bg-testimoni.jpg`} alt="" aria-hidden="true" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content fade-in">
          <span className="hero-eyebrow">Testimoni</span>
          <h1>Apa Kata Pelanggan Kami</h1>
          <p>Ulasan tertulis dari peserta yang sudah belajar bersama AL AUTO.</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head fade-in">
            <span className="eyebrow">Testimoni</span>
            <h2>Apa Kata Mereka</h2>
            <p>Ulasan tertulis dari peserta yang sudah belajar bersama AL AUTO.</p>
          </div>
          <div className="grid grid-3">
            {testimonials.map((t, i) => (
              <article className="card fade-in" key={i}>
                <p style={{ fontStyle: 'italic', color: 'var(--muted)' }}>&ldquo;{t.quote}&rdquo;</p>
                <h3 style={{ marginTop: 12, fontSize: 16 }}>{t.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>{t.package}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head fade-in">
            <span className="eyebrow">Galeri</span>
            <h2>Galeri Testimoni Kami</h2>
            <p>Klik gambar untuk memperbesar.</p>
          </div>
          <div className="carousel fade-in">
            <div className="slide" id="testi-slide">
              {Array.from({ length: 8 }, (_, i) => {
                const src = `${base}assets/img/testimoni/testi${i + 1}.${i < 5 ? 'png' : 'jpg'}`;
                return (
                  <figure className="team-member" key={i}>
                    <img
                      src={src}
                      alt={`Testimoni pelanggan ${i + 1}`}
                      loading="lazy"
                      onClick={() => setLightbox(src)}
                    />
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <div className="cta-inner fade-in">
            <div className="cta-text">
              <h2>Ingin Seperti Mereka?</h2>
              <p>Daftar sekarang dan mulai belajar mengemudi bersama AL AUTO.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary" to="/pendaftaran">Daftar Sekarang</Link>
            </div>
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="lightbox"
          style={{ display: 'flex' }}
          onClick={() => setLightbox(null)}
        >
          <button className="lightbox-close" type="button" aria-label="Tutup gambar" onClick={() => setLightbox(null)}>
            &times;
          </button>
          <img className="lightbox-img" src={lightbox} alt="Testimoni" />
        </div>
      )}
    </>
  );
}
