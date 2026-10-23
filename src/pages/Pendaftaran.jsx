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
      await addDoc(collection(db, 'registrations'), {
        name: form.name, phone: form.phone, address: form.address,
        package: form.package, price: d.price, status: 'baru',
        createdAt: serverTimestamp()
      });
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
    <>
      <section className="page-head">
        <div className="container">
          <span className="hero-eyebrow">Pendaftaran</span>
          <h1>Daftar Kursus Mengemudi</h1>
          <p>Isi data diri Anda dan konfirmasi pendaftaran langsung melalui WhatsApp.</p>
        </div>
      </section>

      <section className="form-section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2" style={{ background: 'linear-gradient(130deg, var(--navy-deep) 0%, var(--navy) 45%, #0055a8 100%)', borderRadius: 'var(--radius)', padding: 32, color: '#fff' }}>
              <h2 style={{ color: '#fff', fontSize: 20, marginBottom: 8 }}>Butuh informasi?</h2>
              <p style={{ color: '#cddcf3', fontSize: 14, marginBottom: 20 }}>Tim kami siap membantu Anda sebelum mendaftar.</p>
              <a className="btn btn-primary" href="https://wa.me/628979480919?text=Halo%20AL%20AUTO%2C%20saya%20ingin%20bertanya%20tentang%20kursus%20mengemudi." target="_blank" rel="noopener">
                Chat WhatsApp
              </a>
            </div>
            <div className="lg:col-span-3 form-card">
              <h2>Silakan Isi Formulir Pendaftaran</h2>
              <p className="form-subtitle">Data yang Anda isi akan otomatis dirangkum dan dikirim ke kami.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nama Lengkap</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Contoh: Budi Santoso" required />
                </div>
                <div className="form-group">
                  <label>No. HP / WhatsApp</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Contoh: 081234567890" required />
                </div>
                <div className="form-group">
                  <label>Alamat</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Contoh: Jl. Merdeka, Palembang" required />
                </div>
                <div className="form-group">
                  <label>Paket Kursus</label>
                  <select name="package" value={form.package} onChange={handleChange} required>
                    <option value="" disabled>Pilih Paket</option>
                    {Object.keys(packages).map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                {price && (
                  <div className="form-group">
                    <label>Harga</label>
                    <input type="text" value={price} readOnly className="form-control" />
                  </div>
                )}
                <button type="submit" disabled={loading} className="btn btn-navy btn-block">
                  {loading ? 'Memproses...' : 'Kirim Pendaftaran'}
                </button>
                <p className="form-note">Setelah menekan tombol, Anda akan diarahkan ke WhatsApp untuk konfirmasi pendaftaran.</p>
              </form>
              {msg && <p className={`form-note ${msg.includes('Terima kasih') ? 'text-green-600' : 'text-red-500'}`} style={{ color: msg.includes('Terima kasih') ? '#16a34a' : '#dc2626' }}>{msg}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
