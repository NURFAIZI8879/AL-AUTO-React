import { Link } from 'react-router-dom';

const faqs = [
  { q: 'Apakah saya bisa memilih instruktur?', a: 'Ya, Anda dapat memilih instruktur sesuai preferensi, tergantung ketersediaan jadwal.' },
  { q: 'Berapa lama durasi 1 pertemuan?', a: 'Setiap pertemuan berdurasi 1 jam (60 menit) mengemudi.' },
  { q: 'Apakah mobil latihan tersedia manual & matic?', a: 'Ya, kami menyediakan kedua jenis mobil untuk latihan.' },
  { q: 'Bagaimana cara mendaftar?', a: 'Isi formulir pendaftaran di website, lalu konfirmasi melalui WhatsApp.' },
  { q: 'Apakah ada garansi lulus SIM?', a: 'Kami membantu persiapan hingga siap ujian SIM, namun kelulusan tergantung peserta.' },
  { q: 'Apakah jadwal bisa diubah?', a: 'Ya, jadwal fleksibel dan dapat diubah sesuai kesepakatan dengan instruktur.' },
];

export default function FAQ() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="hero-eyebrow">FAQ</span>
          <h1>Pertanyaan yang Sering Diajukan</h1>
          <p>Temukan jawaban atas pertanyaan umum seputar kursus mengemudi AL AUTO.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="grid grid-1" style={{ gap: 16 }}>
            {faqs.map((f, i) => (
              <article className="card fade-in" key={i}>
                <h3 style={{ fontSize: 17, marginBottom: 6 }}>{f.q}</h3>
                <p style={{ color: 'var(--muted)', marginBottom: 0, fontSize: 14.5 }}>{f.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
