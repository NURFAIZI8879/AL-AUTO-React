import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export default function Absensi() {
  const { user, userDoc, isAdmin, isApproved } = useAuth();
  const [pertemuan, setPertemuan] = useState(1);
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('');
  const [catatan, setCatatan] = useState('');
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, 'attendance'), where('uid', '==', user.uid));
      const snap = await getDocs(q);
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      docs.sort((a, b) => (b.createdAt || '') > (a.createdAt || '') ? 1 : -1);
      setHistory(docs.slice(0, 10));
      setPertemuan(docs.length + 1);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { loadHistory(); }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tanggal || !status) { setMsg('Mohon lengkapi formulir absensi.'); return; }
    // cegah duplikat tanggal
    if (history.some((h) => h.tanggal === tanggal)) {
      setMsg('Anda sudah absen pada tanggal ini.');
      return;
    }
    setLoading(true);
    setMsg('');
    try {
      await addDoc(collection(db, 'attendance'), {
        uid: user.uid,
        name: userDoc?.name || user.email,
        phone: userDoc?.phone || '',
        email: user.email,
        idAbsen: 'Pertemuan ' + pertemuan,
        tanggal,
        status,
        note: catatan,
        createdAt: serverTimestamp()
      });
      setMsg('Absensi berhasil disimpan (Pertemuan ' + pertemuan + ').');
      setTanggal(new Date().toISOString().split('T')[0]);
      setStatus('');
      setCatatan('');
      loadHistory();
    } catch (err) {
      setMsg('Gagal menyimpan: ' + (err.message || err));
    } finally { setLoading(false); }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy mb-3">Login Diperlukan</h2>
          <p className="text-muted mb-5">Silakan login terlebih dahulu untuk mengakses fitur absensi.</p>
          <a href="/login" className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-blue transition-all">Login / Daftar</a>
        </div>
      </div>
    );
  }

  if (!isAdmin && !isApproved) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy mb-3">Absensi Belum Tersedia</h2>
          <p className="text-muted mb-5">Akun Anda belum diverifikasi admin. Fitur absensi akan aktif setelah disetujui.</p>
          <a href="/login" className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-blue transition-all">Kembali</a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="inline-block text-blue text-xs font-semibold tracking-[0.16em] uppercase mb-2">Absensi</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3">Absensi Kehadiran Peserta</h1>
          <p className="text-muted text-base">Fitur absensi hanya tersedia untuk user yang sudah login, terdaftar, dan diverifikasi admin.</p>
        </div>
        <div className="bg-white border border-line rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-navy mb-2">Silakan Isi Absensi Kehadiran</h2>
          <p className="text-muted text-sm mb-6">Data absensi akan tersimpan dan dapat dilihat admin.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Pertemuan ke-</label>
              <input type="text" value={`Pertemuan ke-${pertemuan}`} readOnly className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm bg-soft text-muted cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Tanggal</label>
              <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required max={new Date().toISOString().split('T')[0]} className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Status Kehadiran</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} required className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10">
                <option value="" disabled>Pilih Status</option>
                <option value="Hadir">Hadir</option>
                <option value="Izin">Izin</option>
                <option value="Sakit">Sakit</option>
                <option value="Alfa">Alfa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Catatan (opsional)</label>
              <textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} rows={2} placeholder="Contoh: latihan parkir" className="w-full px-3.5 py-2.5 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 resize-y" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-blue transition-all disabled:opacity-60">
              {loading ? 'Memproses...' : 'Kirim Absensi'}
            </button>
          </form>
          {msg && <p className={`mt-3 text-center text-sm ${msg.includes('berhasil') ? 'text-green-600' : 'text-red-500'}`}>{msg}</p>}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-navy mb-3">Riwayat Absensi</h3>
            {history.length === 0 ? (
              <p className="text-muted text-sm">Belum ada riwayat absensi.</p>
            ) : (
              <ul className="list-none p-0 space-y-2">
                {history.map((h) => (
                  <li key={h.id} className="py-2 border-b border-dashed border-line text-sm">
                    <strong className="text-navy">{h.idAbsen}</strong> — {h.tanggal} — {h.status}
                    {h.note && <span className="text-muted"> (Catatan: {h.note})</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}