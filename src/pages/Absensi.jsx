import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
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
          <a href="/login" className="btn btn-navy">Login / Daftar</a>
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
          <a href="/login" className="btn btn-navy">Kembali</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="hero-eyebrow">Absensi</span>
          <h1>Absensi Kehadiran Peserta</h1>
          <p>Fitur absensi hanya tersedia untuk user yang sudah login, terdaftar, dan diverifikasi admin.</p>
        </div>
      </section>

      <section className="form-section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="form-card">
            <h2>Silakan Isi Absensi Kehadiran</h2>
            <p className="form-subtitle">Data absensi akan tersimpan dan dapat dilihat admin.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Pertemuan ke-</label>
                <input type="text" value={`Pertemuan ke-${pertemuan}`} readOnly />
              </div>
              <div className="form-group">
                <label>Tanggal</label>
                <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required max={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="form-group">
                <label>Status Kehadiran</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                  <option value="" disabled>Pilih Status</option>
                  <option value="Hadir">Hadir</option>
                  <option value="Izin">Izin</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Alfa">Alfa</option>
                </select>
              </div>
              <div className="form-group">
                <label>Catatan (opsional)</label>
                <textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} rows={2} placeholder="Contoh: latihan parkir" style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" disabled={loading} className="btn btn-navy btn-block">
                {loading ? 'Memproses...' : 'Kirim Absensi'}
              </button>
            </form>
            {msg && <p className="form-note" style={{ color: msg.includes('berhasil') ? '#16a34a' : '#dc2626' }}>{msg}</p>}
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 18, color: 'var(--navy)', marginBottom: 8 }}>Riwayat Absensi</h3>
              {history.length === 0 ? (
                <p className="text-muted" style={{ fontSize: 14 }}>Belum ada riwayat absensi.</p>
              ) : (
                <ul className="list-none p-0" style={{ margin: 0 }}>
                  {history.map((h) => (
                    <li key={h.id} style={{ padding: '8px 0', borderBottom: '1px dashed var(--line)', fontSize: 14 }}>
                      <strong style={{ color: 'var(--navy)' }}>{h.idAbsen}</strong> — {h.tanggal} — {h.status}
                      {h.note && <span className="text-muted"> (Catatan: {h.note})</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
