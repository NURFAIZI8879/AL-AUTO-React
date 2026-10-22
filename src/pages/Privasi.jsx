export default function Privasi() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Privasi</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3">Kebijakan Privasi</h1>
          <p className="text-muted text-base">Terakhir diperbarui: 20 Oktober 2026</p>
        </div>
        <div className="bg-white border border-line rounded-2xl p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-navy mb-2">Data yang Kami Kumpulkan</h2>
            <p className="text-muted text-sm leading-relaxed">Kami mengumpulkan nama, email, nomor HP, dan data absensi peserta untuk keperluan administrasi kursus mengemudi.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy mb-2">Penggunaan Data</h2>
            <p className="text-muted text-sm leading-relaxed">Data digunakan untuk pendaftaran, penjadwalan, absensi, dan komunikasi terkait kursus. Kami tidak menjual data Anda ke pihak ketiga.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy mb-2">Penyimpanan & Keamanan</h2>
            <p className="text-muted text-sm leading-relaxed">Data disimpan di Firebase (Google Cloud) dengan enkripsi. Akses dibatasi berdasarkan role (user/admin).</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy mb-2">Hak Anda</h2>
            <p className="text-muted text-sm leading-relaxed">Anda berhak meminta penghapusan data pribadi Anda dengan menghubungi kami via WhatsApp.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy mb-2">Kontak</h2>
            <p className="text-muted text-sm leading-relaxed">WhatsApp: 0897-9480-919 | Email: info@alauto.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}