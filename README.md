# AL AUTO — Kursus Mengemudi (React Version)

Website resmi **AL AUTO Kursus Mengemudi** — kursus mengemudi mobil manual & matic di Kota Palembang. Versi ini dibangun dengan **React + Vite + Tailwind CSS + Firebase**.

## Live Demo

https://nurfaizi8879.github.io/AL-AUTO-React/

## Fitur

### Halaman Publik
- **Beranda** — hero video, keunggulan, alur belajar 5 langkah, profil instruktur, mobil & area jangkauan, legalitas, lokasi & jam operasional, CTA.
- **Paket & Harga** — 4 paket (Bisa/Mahir x Manual/Matic) dengan harga dan detail.
- **Testimoni** — kutipan peserta + galeri foto (lightbox).
- **Pendaftaran** — formulir pendaftaran + konfirmasi otomatis via WhatsApp + simpan ke Firestore.
- **FAQ** — pertanyaan yang sering diajukan.
- **Kebijakan Privasi** — kebijakan privasi pengguna.
- **404** — halaman tidak ditemukan.

### Fitur Khusus (butuh login)
- **Absensi** — absensi per pertemuan (auto numbering), status kehadiran, catatan, riwayat.
- **Panel Admin** — CRUD user (approve/reject), statistik, search & filter, ringkasan/detail, export CSV, audit log.

### Keamanan
- Firebase Authentication (email/password).
- Role-based access (user vs admin).
- Protected routes.
- Honeypot anti-spam di form.
- reCAPTCHA placeholder (siap integrasi).

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, React Router
- **Backend:** Firebase (Auth + Firestore)
- **Hosting:** GitHub Pages
- **Animasi:** Scroll progress bar, back-to-top, fade-in reveal, staggered children, floating logo, gradient shift, WA FAB pulse, button ripple

## Tema

Warna original dipertahankan (tidak diubah):
- Navy: #002b5e
- Blue: #008cff
- Yellow: #ffdd00

## Cara Menjalankan Lokal

### Prasyarat
- Node.js v22+ (portable: C:\nodejs)

### Install & Run
```
cd "AL-AUTO (react)"
npm install
npm run dev
```
Buka http://localhost:5173/AL-AUTO-React/

### Build
```
npm run build
```
Output di dist/. Copy ke docs/ untuk GitHub Pages.

## Struktur Project

```
AL-AUTO (react)/
├── public/
│   ├── assets/          # CSS, gambar, video (salinan dari versi HTML)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/      # Navbar, Footer, ScrollFx
│   ├── context/         # AuthContext
│   ├── pages/           # Home, Login, Absensi, Admin, Paket, Testimoni, Pendaftaran, FAQ, Privasi, NotFound
│   ├── styles/          # CSS asli (global, home, paket, pendaftaran, testimoni, absensi)
│   ├── firebase.js      # Firebase config
│   ├── App.jsx          # Routes
│   ├── main.jsx
│   └── index.css        # Tailwind theme
├── index.html
├── vite.config.js       # base: '/AL-AUTO-React/'
└── package.json
```

## Akun Demo

- **Admin:** admin@alauto.com / admin@alauto.com
- **User:** daftar via halaman Login/Register, lalu tunggu persetujuan admin.

## Kontak

- WhatsApp: 0897-9480-919
- Kota Palembang, Sumatera Selatan

## Lisensi

Proyek ini untuk keperluan edukasi & bisnis AL AUTO Kursus Mengemudi.
