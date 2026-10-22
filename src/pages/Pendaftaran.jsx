import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const packages = {
  'Paket Bisa Manual': { price: 'Rp800.000', sessions: '10x pertemuan', unit: '1x pertemuan 1 jam' },
  'Paket Bisa Matic': { price: 'Rp800.000', sessions: '10x pertemuan', unit: '1x pertemuan 1 jam' },
  'Paket Mahir Manual': { price: 'Rp1.400.000', sessions: '20x pertemuan', unit: '1x pertemuan 1 jam' },
  'Paket Mahir Matic': { price: 'Rp1.400.000', sessions: '25x pertemuan', unit: '1x pertemuan 1 jam' },
};

export default function Pendaftaran() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', address: '', package: '' });
  const [price, setPrice] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'package' && packages[value]) {
      const d = packages[value];
      setPrice(`${d.price} — ${d.sessions}, ${d.unit}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.package) {
      setMsg('Mohon lengkapi formulir pendaftaran.');
      return;
    }
    setLoading(true);
    setMsg('');
    try {
      const d = packages[form.package];
      if (window.ALAuth?.db || db) {
        await addDoc(collection(db, 'registrations'), {
          name: form.name, phone: form.phone, address: form.address,
          package: form.package, price: d.price, status: 'baru',
          createdAt: serverTimestamp()
        });
      }
      const msgText = `Halo AL AUTO, saya ingin mendaftar kursus mengemudi.\n\nNama: ${form.name}\nNo. HP: ${form.phone}\nAlamat: ${form.address}\nPaket: ${form.package}\nHarga: ${d.price} (${d.sessions}, ${d.unit})`;
      window.open(`https://wa.me/628979480919?text=${encodeURIComponent(msgText)}`, '_blank');
      setMsg('Terima kasih! Formulir Anda siap dikirim melalui WhatsApp.');
      setForm({ name: '', phone: '', address: '', package: '' });
      setPrice('');
    } catch (err) {
      setMsg('Gagal: ' + (err.message || err));
    } finally { setLoading(false); }
  };

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Pendaftaran</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3">Formulir Pendaftaran</h1>
          <p className="text-muted text-base">Isi data diri Anda dan konfirmasi pendaftaran langsung melalui WhatsApp.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-navy to-blue rounded-2xl p-8 text-white">
            <h2 className="text-xl font-bold mb-3">Butuh informasi?</h2>
            <p className="text-blue-100 text-sm mb-6">Tim kami siap membantu Anda sebelum mendaftar.</p>
            <a href="https://wa.me/628979480919?text=Halo%20AL%20AUTO%2C%20saya%20ingin%20bertanya%20tentang%20kursus%20mengemudi." target="_blank" rel="noopener" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-yellow text-navy font-bold text-sm hover:bg-white transition-all">
              Chat WhatsApp
            </a>
          </div>
          <div className="lg:col-span-3 bg-white border border-line rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-navy mb-2">Silakan Isi Formulir Pendaftaran</h2>
            <p className="text-muted text-sm mb-6">Data yang Anda isi akan otomatis dirangkum dan dikirim ke kami.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">Nama Lengkap</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Contoh: Budi Santoso" required className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">No. HP / WhatsApp</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Contoh: 081234567890" required className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">Alamat</label>
                <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Contoh: Jl. Merdeka, Palembang" required className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">Paket Kursus</label>
                <select name="package" value={form.package} onChange={handleChange} required className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10">
                  <option value="" disabled>Pilih Paket</option>
                  {Object.keys(packages).map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              {price && (
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Harga</label>
                  <input type="text" value={price} readOnly className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm bg-soft text-muted cursor-not-allowed" />
                </div>
              )}
              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-blue transition-all disabled:opacity-60">
                {loading ? 'Memproses...' : 'Kirim Pendaftaran'}
              </button>
              <p className="text-center text-xs text-muted mt-2">Setelah menekan tombol, Anda akan diarahkan ke WhatsApp untuk konfirmasi pendaftaran.</p>
            </form>
            {msg && <p className={`mt-4 text-center text-sm ${msg.includes('Terima kasih') ? 'text-green-600' : 'text-red-500'}`}>{msg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}