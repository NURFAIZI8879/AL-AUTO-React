# AL AUTO - Kursus Mengemudi (React Version)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_%2B_Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub_Pages-222222?logo=github&logoColor=white)](https://nurfaizi8879.github.io/AL-AUTO-React/)
[![License](https://img.shields.io/badge/License-Educational-green)]()

Website resmi **AL AUTO Kursus Mengemudi** - kursus mengemudi mobil manual & matic di Kota Palembang. Versi ini dibangun ulang dengan **React + Vite + Tailwind CSS + Firebase**, dengan desain yang pixel-identical dengan versi HTML asli.

---

## 🌐 Demo & Preview

**Live Demo:** [https://nurfaizi8879.github.io/AL-AUTO-React/](https://nurfaizi8879.github.io/AL-AUTO-React/)

### Screenshot

> 📸 _Screenshot halaman utama akan ditambahkan di sini._

| Halaman | Preview |
|---------|---------|
| Beranda | ![Home](./docs/screenshots/home.png) |
| Paket & Harga | ![Paket](./docs/screenshots/paket.png) |
| Testimoni | ![Testimoni](./docs/screenshots/testimoni.png) |
| Pendaftaran | ![Pendaftaran](./docs/screenshots/pendaftaran.png) |
| Absensi | ![Absensi](./docs/screenshots/absensi.png) |
| Panel Admin | ![Admin](./docs/screenshots/admin.png) |

---

## 📋 Latar Belakang

AL AUTO Kursus Mengemudi adalah usaha kursus mengemudi mobil (manual & matic) yang beroperasi di Kota Palembang. Sebelumnya, website menggunakan teknologi HTML/CSS/JS murni dengan Firebase. Versi React ini dibuat untuk:

- **Migrasi ke arsitektur modern** dengan React + Vite untuk maintainability yang lebih baik.
- **Mempertahankan desain asli** (pixel-identical) agar pengguna tidak merasakan perubahan visual.
- **Menambahkan fitur** seperti panel admin, absensi, dan sistem autentikasi yang lebih robust.
- **Deployment otomatis** via GitHub Pages.

---

## ✨ Fitur Utama

### Halaman Publik
- 🏠 **Beranda** - Hero video, keunggulan, alur belajar 5 langkah, profil instruktur, mobil & area jangkauan, legalitas, lokasi & jam operasional, CTA.
- 📦 **Paket & Harga** - 4 paket (Bisa/Mahir × Manual/Matic) dengan harga dan detail lengkap.
- 💬 **Testimoni** - Kutipan peserta + galeri foto dengan lightbox.
- 📝 **Pendaftaran** - Formulir pendaftaran + konfirmasi otomatis via WhatsApp + simpan ke Firestore.
- ❓ **FAQ** - Pertanyaan yang sering diajukan.
- 🔒 **Kebijakan Privasi** - Kebijakan privasi pengguna.
- 🚫 **404** - Halaman tidak ditemukan.

### Fitur Khusus (Butuh Login)
- 📋 **Absensi** - Absensi per pertemuan (auto numbering), status kehadiran, catatan, riwayat.
- 👨‍💼 **Panel Admin** - CRUD user (approve/reject), statistik, search & filter, ringkasan/detail, export CSV, audit log.

### Keamanan
- 🔐 Firebase Authentication (email/password).
- 👤 Role-based access (user vs admin).
- 🛡️ Protected routes.
- 🐝 Honeypot anti-spam di form.
- 🤖 reCAPTCHA placeholder (siap integrasi).

### Animasi & UX
- Scroll progress bar
- Back-to-top button
- Fade-in reveal on scroll
- Staggered children animation
- Floating logo
- Gradient shift
- WhatsApp FAB pulse
- Button ripple effect

---

## 🛠️ Tech Stack

| Teknologi | Fungsi |
|-----------|--------|
| **React 19** | Library UI utama |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **React Router v7** | Client-side routing |
| **Firebase Auth** | Autentikasi user (email/password) |
| **Firebase Firestore** | Database (pendaftaran, absensi, user data) |
| **GitHub Pages** | Hosting & deployment |
| **Lucide React** | Icon library |

---

## 🎨 Tema

Warna original dipertahankan (tidak diubah):

| Warna | Hex | Penggunaan |
|-------|-----|------------|
| Navy | `#002b5e` | Primary dark |
| Blue | `#008cff` | Accent |
| Yellow | `#ffdd00` | Highlight |

---

## 📁 Struktur Folder

```
AL-AUTO (react)/
├── public/
│   ├── assets/          # CSS, gambar, video (salinan dari versi HTML)
│   ├── robots.txt       # SEO robots
│   └── sitemap.xml      # SEO sitemap
├── src/
│   ├── components/      # Navbar, Footer, ScrollFx
│   ├── context/         # AuthContext (Firebase Auth state)
│   ├── pages/           # Home, Login, Absensi, Admin, Paket, Testimoni, Pendaftaran, FAQ, Privasi, NotFound
│   ├── styles/          # CSS asli (global, home, paket, pendaftaran, testimoni, absensi)
│   ├── firebase.js      # Firebase config & initialization
│   ├── App.jsx          # Routes & layout
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind theme
├── index.html           # HTML template
├── vite.config.js       # Vite config (base: '/AL-AUTO-React/')
└── package.json         # Dependencies & scripts
```

---

## 🚀 Instalasi & Cara Menjalankan

### Prasyarat
- Node.js v22+ ([download](https://nodejs.org/) atau portable di `C:\nodejs`)
- Git
- Akun Firebase (untuk Auth & Firestore)

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/NURFAIZI8879/AL-AUTO-React.git
cd AL-AUTO-React

# 2. Install dependencies
npm install

# 3. Konfigurasi Firebase
# Edit src/firebase.js dengan config Firebase kamu:
# apiKey, authDomain, projectId, dll.

# 4. Jalankan dev server
npm run dev
```

Buka [http://localhost:5173/AL-AUTO-React/](http://localhost:5173/AL-AUTO-React/)

### Build untuk Production

```bash
npm run build
```

Output di folder `dist/`. Copy ke `docs/` untuk GitHub Pages:

```bash
# Copy dist ke docs
cp -r dist/* docs/

# Commit & push
git add -A
git commit -m "Build: update docs for GitHub Pages"
git push
```

---

## 👤 Cara Penggunaan

### Akun Demo

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@alauto.com` | `admin@alauto.com` |
| User | Daftar via halaman Login/Register | - |

### Alur Penggunaan

1. **Pengunjung** → Buka website → Lihat info kursus → Pilih paket → Daftar via form → Konfirmasi via WhatsApp.
2. **User terdaftar** → Login → Lihat absensi per pertemuan → Catat kehadiran.
3. **Admin** → Login → Panel admin → Approve/reject user → Lihat statistik → Export CSV → Audit log.

---

## 📐 Peran & Kontribusi

- **Peran:** Full-Stack Developer (solo)
- **Kontribusi:**
  - Migrasi dari HTML/CSS/JS ke React + Vite + Tailwind.
  - Implementasi Firebase Auth & Firestore (pendaftaran, absensi, user management).
  - Panel admin dengan CRUD user, statistik, search & filter, export CSV, audit log.
  - Replikasi desain pixel-identical dari versi HTML (CSS asli diimport).
  - Komponen `ScrollFx` untuk animasi (scroll progress, back-to-top, fade-in reveal, WA FAB, page fade).
  - Deployment ke GitHub Pages.

---

## 🏆 Pencapaian

- Desain pixel-identical dengan versi HTML (`.navbar`, `.footer`, `.scroll-progress`, `.back-to-top`, `.wa-fab`, `.hero-video`, 31× `.fade-in`).
- 0 console errors setelah verifikasi.
- Semua halaman berfungsi: Home, Login, Absensi, Admin, Paket, Testimoni, Pendaftaran, FAQ, Privasi, NotFound.

---

## 🔮 Rencana Pengembangan

- [ ] Integrasi reCAPTCHA pada form login & pendaftaran.
- [ ] Email verification untuk user baru.
- [ ] 2FA (Two-Factor Authentication) untuk admin.
- [ ] Firebase App Check untuk keamanan.
- [ ] Optimasi performa (lazy loading, code splitting).
- [ ] PWA (Progressive Web App) support.
- [ ] Notifikasi push untuk jadwal kursus.

---

## 📞 Kontak

- **WhatsApp:** 0852-6804-2056
- **Email:** Faiziasyi140406@gmail.com
- **Lokasi:** Kota Palembang, Sumatera Selatan
- **GitHub:** [https://github.com/NURFAIZI8879](https://github.com/NURFAIZI8879)

---

## 📄 Lisensi

Proyek ini untuk keperluan edukasi & bisnis AL AUTO Kursus Mengemudi.

---

> 💡 **Tips untuk recruiter:** Project ini menunjukkan kemampuan migrasi dari vanilla HTML ke React modern, implementasi Firebase (Auth + Firestore), desain pixel-identical, dan deployment otomatis via GitHub Pages.
