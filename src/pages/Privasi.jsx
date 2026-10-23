export default function Privasi() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Kebijakan Privasi</h1>
          <p>Terakhir diperbarui: 20 Oktober 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="card fade-in" style={{ padding: 32 }}>
            {[
              { title: 'Data yang Kami Kumpulkan', body: 'Kami mengumpulkan nama, email, nomor HP, dan data absensi peserta untuk keperluan administrasi kursus mengemudi.' },
              { title: 'Penggunaan Data', body: 'Data digunakan untuk pendaftaran, penjadwalan, absensi, dan komunikasi terkait kursus. Kami tidak menjual data Anda ke pihak ketiga.' },
              { title: 'Penyimpanan & Keamanan', body: 'Data disimpan di Firebase (Google Cloud) dengan enkripsi. Akses dibatasi berdasarkan role (user/admin).' },
              { title: 'Hak Anda', body: 'Anda berhak meminta penghapusan data pribadi Anda dengan menghubungi kami via WhatsApp.' },
              { title: 'Kontak', body: 'WhatsApp: 0897-9480-919 | Email: info@alauto.com' },
            ].map((s) => (
              <div key={s.title} style={{ marginBottom: 18 }}>
                <h2 style={{ fontSize: 18, color: 'var(--navy)', marginBottom: 6 }}>{s.title}</h2>
                <p style={{ color: 'var(--muted)', fontSize: 14.5, marginBottom: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
