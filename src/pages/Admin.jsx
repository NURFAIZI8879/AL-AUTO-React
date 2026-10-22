import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function Admin() {
  const { user, userDoc } = useAuth();
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [status, setStatus] = useState('Memuat...');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ uid: '', name: '', email: '', phone: '', password: '', role: 'user', status: 'pending' });
  const [search, setSearch] = useState('');
  const [attView, setAttView] = useState('all');

  const isAdmin = userDoc?.role === 'admin';

  const loadUsers = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      const list = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
      setUsers(list);
      setStatus('Total user: ' + list.length);
    } catch (e) { setStatus('Gagal memuat: ' + (e.message || e)); }
  };

  const loadAttendance = async () => {
    try {
      const snap = await getDocs(collection(db, 'attendance'));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAttendance(list);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (isAdmin) { loadUsers(); loadAttendance(); }
  }, [isAdmin]);

  const approve = async (uid) => {
    await updateDoc(doc(db, 'users', uid), { status: 'approved' });
    await addDoc(collection(db, 'audit'), { actor: user.email, action: 'APPROVE_USER', target: uid, createdAt: serverTimestamp() });
    loadUsers();
  };
  const reject = async (uid) => {
    await updateDoc(doc(db, 'users', uid), { status: 'rejected' });
    await addDoc(collection(db, 'audit'), { actor: user.email, action: 'REJECT_USER', target: uid, createdAt: serverTimestamp() });
    loadUsers();
  };
  const deleteUser = async (uid) => {
    if (!confirm('Hapus user ini?')) return;
    await deleteDoc(doc(db, 'users', uid));
    await addDoc(collection(db, 'audit'), { actor: user.email, action: 'DELETE_USER', target: uid, createdAt: serverTimestamp() });
    loadUsers();
  };
  const deleteAttendance = async (id) => {
    if (!confirm('Hapus data absensi ini?')) return;
    await deleteDoc(doc(db, 'attendance', id));
    await addDoc(collection(db, 'audit'), { actor: user.email, action: 'DELETE_ATTENDANCE', target: id, createdAt: serverTimestamp() });
    loadAttendance();
  };

  const openModal = (u) => {
    if (u) {
      setForm({ uid: u.uid, name: u.name || '', email: u.email || '', phone: u.phone || '', password: '', role: u.role || 'user', status: u.status || 'pending' });
    } else {
      setForm({ uid: '', name: '', email: '', phone: '', password: '', role: 'user', status: 'pending' });
    }
    setModal(true);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      if (form.uid) {
        await updateDoc(doc(db, 'users', form.uid), { name: form.name, email: form.email, phone: form.phone, role: form.role, status: form.status });
        await addDoc(collection(db, 'audit'), { actor: user.email, action: 'UPDATE_USER', target: form.uid, createdAt: serverTimestamp() });
      } else {
        // create via auth not possible client-side without secondary app; store doc only
        const newUid = 'u_' + Math.random().toString(36).slice(2, 9);
        await setDoc(doc(db, 'users', newUid), { name: form.name, email: form.email, phone: form.phone, role: form.role, status: form.status, createdAt: serverTimestamp() });
        await addDoc(collection(db, 'audit'), { actor: user.email, action: 'CREATE_USER', target: newUid, createdAt: serverTimestamp() });
      }
      setModal(false);
      loadUsers();
    } catch (err) { alert('Gagal: ' + (err.message || err)); }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-3">Akses Ditolak</h2>
          <p className="text-muted">Hanya admin yang boleh mengakses panel ini.</p>
        </div>
      </div>
    );
  }

  // Stats
  const totalUsers = users.length;
  const pending = users.filter((u) => u.status === 'pending').length;
  const approved = users.filter((u) => u.status === 'approved').length;
  const totalAtt = attendance.length;
  const hadir = attendance.filter((a) => a.status === 'Hadir').length;

  // Filter attendance
  const filteredAtt = attendance.filter((a) =>
    !search || (a.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.phone || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.email || '').toLowerCase().includes(search.toLowerCase())
  );

  // Summary by user
  const summary = {};
  filteredAtt.forEach((a) => {
    const key = a.uid || a.email || a.name;
    if (!summary[key]) summary[key] = { name: a.name, phone: a.phone, email: a.email, count: 0, hadir: 0, izin: 0, sakit: 0, alfa: 0, last: '' };
    summary[key].count++;
    if (a.status === 'Hadir') summary[key].hadir++;
    else if (a.status === 'Izin') summary[key].izin++;
    else if (a.status === 'Sakit') summary[key].sakit++;
    else if (a.status === 'Alfa') summary[key].alfa++;
    if (!summary[key].last || (a.createdAt || '') > summary[key].last) summary[key].last = a.createdAt || a.tanggal;
  });

  const exportCSV = () => {
    let csv = 'Tanggal,Nama,No HP,Email,Pertemuan,Status,Catatan,CreatedAt\n';
    attendance.forEach((a) => {
      csv += `"${a.tanggal || ''}","${a.name || ''}","${a.phone || ''}","${a.email || ''}","${a.idAbsen || ''}","${a.status || ''}","${a.note || ''}","${a.createdAt || ''}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'absensi.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-8 px-5 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">Panel Admin — Manajemen User & Absensi</h1>
        <p className="text-muted text-sm mt-1">Kelola user (CRUD) dan data absensi. Hanya admin yang boleh mengakses.</p>
        <p className="text-muted text-sm mt-2 font-semibold">{status}</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button onClick={() => setTab('users')} className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${tab === 'users' ? 'bg-navy text-white' : 'bg-white text-navy border border-line'}`}>Manajemen User</button>
        <button onClick={() => setTab('attendance')} className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${tab === 'attendance' ? 'bg-navy text-white' : 'bg-white text-navy border border-line'}`}>Data Absensi</button>
        <button onClick={() => setTab('stats')} className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${tab === 'stats' ? 'bg-navy text-white' : 'bg-white text-navy border border-line'}`}>Statistik & Export</button>
      </div>

      {tab === 'users' && (
        <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <h2 className="text-xl font-bold text-navy">Daftar User</h2>
            <button onClick={() => openModal(null)} className="px-4 py-2 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-blue transition">+ Tambah User</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-soft">
                  <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Nama</th>
                  <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Email</th>
                  <th className="border border-line px-3 py-2 text-left font-semibold text-navy">HP</th>
                  <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Role</th>
                  <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Status</th>
                  <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.uid} className="hover:bg-soft">
                    <td className="border border-line px-3 py-2">{u.name || '-'}</td>
                    <td className="border border-line px-3 py-2">{u.email || '-'}</td>
                    <td className="border border-line px-3 py-2">{u.phone || '-'}</td>
                    <td className="border border-line px-3 py-2">{u.role || '-'}</td>
                    <td className="border border-line px-3 py-2">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${u.status === 'approved' ? 'bg-green-100 text-green-700' : u.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{u.status || '-'}</span>
                    </td>
                    <td className="border border-line px-3 py-2">
                      <div className="flex gap-1.5 flex-wrap">
                        {u.status !== 'approved' && <button onClick={() => approve(u.uid)} className="px-2.5 py-1 rounded text-xs font-semibold bg-navy text-white hover:bg-blue transition">Setujui</button>}
                        {u.status !== 'rejected' && <button onClick={() => reject(u.uid)} className="px-2.5 py-1 rounded text-xs font-semibold bg-white text-navy border border-line hover:bg-soft transition">Tolak</button>}
                        <button onClick={() => openModal(u)} className="px-2.5 py-1 rounded text-xs font-semibold bg-white text-navy border border-line hover:bg-soft transition">Edit</button>
                        <button onClick={() => deleteUser(u.uid)} className="px-2.5 py-1 rounded text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'attendance' && (
        <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-navy mb-4">Data Absensi</h2>
          <div className="flex gap-2 mb-4 flex-wrap items-center">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama / no HP / email..." className="flex-1 min-w-[200px] px-3.5 py-2 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
            <button onClick={() => setAttView('all')} className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${attView === 'all' ? 'bg-navy text-white' : 'bg-white text-navy border border-line'}`}>Semua Absensi</button>
            <button onClick={() => setAttView('summary')} className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${attView === 'summary' ? 'bg-navy text-white' : 'bg-white text-navy border border-line'}`}>Ringkasan per User</button>
          </div>

          {attView === 'all' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-soft">
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Tanggal</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Nama</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">No. HP</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Email</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Pertemuan</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Status</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Catatan</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAtt.map((a) => (
                    <tr key={a.id} className="hover:bg-soft">
                      <td className="border border-line px-3 py-2">{a.tanggal || '-'}</td>
                      <td className="border border-line px-3 py-2">{a.name || '-'}</td>
                      <td className="border border-line px-3 py-2">{a.phone || '-'}</td>
                      <td className="border border-line px-3 py-2">{a.email || a.uid || '-'}</td>
                      <td className="border border-line px-3 py-2">{a.idAbsen || '-'}</td>
                      <td className="border border-line px-3 py-2">{a.status || '-'}</td>
                      <td className="border border-line px-3 py-2">{a.note || '-'}</td>
                      <td className="border border-line px-3 py-2">
                        <button onClick={() => deleteAttendance(a.id)} className="px-2.5 py-1 rounded text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition">Hapus</button>
                      </td>
                    </tr>
                  ))}
                  {filteredAtt.length === 0 && <tr><td colSpan={8} className="border border-line px-3 py-2 text-center text-muted">Tidak ada data.</td></tr>}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-soft">
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Nama</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">No. HP</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Email</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Jumlah</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Hadir</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Izin</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Sakit</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Alfa</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Terakhir</th>
                    <th className="border border-line px-3 py-2 text-left font-semibold text-navy">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(summary).map(([key, g]) => (
                    <tr key={key} className="hover:bg-soft">
                      <td className="border border-line px-3 py-2">{g.name || '-'}</td>
                      <td className="border border-line px-3 py-2">{g.phone || '-'}</td>
                      <td className="border border-line px-3 py-2">{g.email || '-'}</td>
                      <td className="border border-line px-3 py-2 font-bold">{g.count}</td>
                      <td className="border border-line px-3 py-2">{g.hadir}</td>
                      <td className="border border-line px-3 py-2">{g.izin}</td>
                      <td className="border border-line px-3 py-2">{g.sakit}</td>
                      <td className="border border-line px-3 py-2">{g.alfa}</td>
                      <td className="border border-line px-3 py-2">{(g.last || '-').slice(0, 10)}</td>
                      <td className="border border-line px-3 py-2">
                        <button onClick={() => {
                          const detail = document.getElementById('att-detail');
                          const rows = attendance.filter((a) => (a.uid || a.email || a.name) === key);
                          let html = '<h3 class="text-lg font-semibold text-navy mb-3">Detail Absensi</h3><ul class="list-none p-0 space-y-2">';
                          rows.forEach((a) => {
                            html += `<li class="py-2 border-b border-dashed border-line text-sm">${a.idAbsen || '-'} — ${a.tanggal || '-'} — ${a.status || '-'}${a.note ? ' (Catatan: ' + a.note + ')' : ''} <button class="ml-2 px-2 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition" data-delatt="${a.id}">Hapus</button></li>`;
                          });
                          html += '</ul>';
                          detail.innerHTML = html;
                          detail.querySelectorAll('button[data-delatt]').forEach((b) => {
                            b.addEventListener('click', async () => {
                              if (!confirm('Hapus data absensi ini?')) return;
                              await deleteAttendance(b.getAttribute('data-delatt'));
                              detail.innerHTML = '';
                            });
                          });
                        }} className="px-2.5 py-1 rounded text-xs font-semibold bg-white text-navy border border-line hover:bg-soft transition">Detail</button>
                      </td>
                    </tr>
                  ))}
                  {Object.keys(summary).length === 0 && <tr><td colSpan={10} className="border border-line px-3 py-2 text-center text-muted">Tidak ada data.</td></tr>}
                </tbody>
              </table>
              <div id="att-detail" className="mt-4"></div>
            </div>
          )}
        </div>
      )}

      {tab === 'stats' && (
        <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-navy mb-4">Statistik</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {[
              { label: 'Total User', val: totalUsers },
              { label: 'Pending', val: pending },
              { label: 'Approved', val: approved },
              { label: 'Total Absensi', val: totalAtt },
              { label: 'Hadir', val: hadir },
            ].map((it, i) => (
              <div key={i} className="bg-white border border-line rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-extrabold text-blue">{it.val}</div>
                <div className="text-xs text-muted mt-1">{it.label}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            <button onClick={exportCSV} className="px-4 py-2 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-blue transition">Export Absensi (CSV)</button>
            <button onClick={async () => {
              const snap = await getDocs(collection(db, 'audit'));
              const rows = snap.docs.map((d) => d.data()).sort((a, b) => (b.createdAt || '') > (a.createdAt || '') ? 1 : -1);
              let html = '<table class="w-full text-sm border-collapse"><thead><tr class="bg-soft"><th class="border border-line px-3 py-2 text-left font-semibold text-navy">Waktu</th><th class="border border-line px-3 py-2 text-left font-semibold text-navy">Aktor</th><th class="border border-line px-3 py-2 text-left font-semibold text-navy">Aksi</th><th class="border border-line px-3 py-2 text-left font-semibold text-navy">Target</th></tr></thead><tbody>';
              if (rows.length === 0) html += '<tr><td colspan="4" class="border border-line px-3 py-2 text-center text-muted">Belum ada audit log.</td></tr>';
              rows.forEach((a) => {
                html += `<tr><td class="border border-line px-3 py-2">${a.createdAt || '-'}</td><td class="border border-line px-3 py-2">${a.actor || '-'}</td><td class="border border-line px-3 py-2">${a.action || '-'}</td><td class="border border-line px-3 py-2">${a.target || '-'}</td></tr>`;
              });
              html += '</tbody></table>';
              document.getElementById('audit-log').innerHTML = html;
            }} className="px-4 py-2 rounded-lg bg-white text-navy border border-line font-semibold text-sm hover:bg-soft transition">Lihat Audit Log</button>
          </div>
          <div id="audit-log" className="max-h-[300px] overflow-auto text-sm"></div>
        </div>
      )}

      {/* Modal user */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-navy mb-4">{form.uid ? 'Edit User' : 'Tambah User'}</h3>
            <form onSubmit={saveUser} className="space-y-3">
              <input type="hidden" value={form.uid} />
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Nama</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full px-3 py-2 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">No. HP</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Password</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength={6} className="w-full px-3 py-2 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 border border-line rounded-lg text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10">
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <button type="button" onClick={() => setModal(false)} className="px-4 py-2 rounded-lg border border-line text-navy font-semibold text-sm hover:bg-soft transition">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-blue transition">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}