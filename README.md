# 💻 WargaKlik Frontend (Web App)

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Turbopack-Ready-blueviolet?style=for-the-badge&logo=turbopack" alt="Turbopack" />
</div>

---

**WargaKlik Frontend** adalah antarmuka web modern, interaktif, dan responsif tinggi untuk ekosistem **WargaKlik** (Sistem Informasi & Pembayaran Iuran Warga). Web app ini dibangun menggunakan kerangka kerja **Next.js 16 (App Router)** terbaru, didesain super cepat menggunakan compiler **Turbopack**, dirancang estetis menggunakan **Tailwind CSS v4**, serta dilengkapi bagan visual interaktif menggunakan **Chart.js**.

---

## ✨ Fitur Utama

- 🏠 **Dashboard Multi-Role (Admin & Warga)**:
  - **Admin/RT**: Kelola penuh data warga, kelola tagihan, kelola iuran masuk, audit kas kas bulanan, posting pengumuman penting, serta kelola dan verifikasi keluhan warga.
  - **Warga**: Lihat sisa tagihan aktif, bayar iuran instan via Midtrans Snap popup, riwayat pembayaran personal, ajukan keluhan, serta lihat grafik kas RT transparan secara real-time.

- 📊 **Visualisasi Data Dinamis**:
  - Grafik tren pendapatan iuran bulanan dan pengeluaran kas menggunakan **Chart.js** & **React-Chartjs-2** demi transparansi keuangan warga yang maksimal.

- 🔒 **Otentikasi & Manajemen Sesi Aman**:
  - Integrasi otentikasi JWT yang mulus dengan *Request & Response Interceptor* otomatis menggunakan **Axios**.
  - Mekanisme *silent automatic token refresh* pada background untuk pembaruan sesi warga tanpa interupsi.
  - Cookie penyimpanan aman dilengkapi flag keamanan guna mencegah eksploitasi CSRF.

- 🎨 **Desain Antarmuka Premium**:
  - Layout modern bertema HSL minimalis yang adaptif (mobile & desktop-friendly).
  - Elemen dekoratif interaktif yang didukung koleksi ikon elegan dari **Lucide-React**.
  - Notifikasi interaktif & animasi mikro yang mulus didukung **React Hot Toast**.

---

## 🛠️ Persyaratan Sistem

Sebelum memulai, pastikan perangkat Anda telah terpasang:
- **Node.js** (v20 ke atas direkomendasikan)
- **npm** atau **yarn**

---

## 🚀 Panduan Instalasi & Penggunaan

### 1. Klon & Masuk ke Folder Projek
Jika belum, masuk ke direktori frontend:
```bash
cd frontend
```

### 2. Pasang Dependensi
Pasang semua paket library yang dibutuhkan:
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env` lalu lengkapi nilai variabelnya:
```bash
# Untuk Windows (PowerShell)
Copy-Item .env.example .env

# Untuk Linux/macOS
cp .env.example .env
```

Berikut adalah skema konfigurasi `.env` yang digunakan:
```env
# API Connection Toggle
NEXT_PUBLIC_USE_NGROK=false
NEXT_PUBLIC_LOCAL_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Deprecated (Handled in src/utils/api.js)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key_sandbox
```

### 4. Jalankan Server Pengembangan (Development Server)
Jalankan server Next.js di mode lokal pengembangan:
```bash
npm run dev
```

Buka peramban (browser) Anda dan akses alamat **[http://localhost:3000](http://localhost:3000)** untuk melihat antarmuka secara langsung.

### 5. Kompilasi Produksi (Production Build)
Untuk membangun bundel aplikasi teroptimasi untuk produksi:
```bash
npm run build
```

Jalankan server produksi lokal:
```bash
npm run start
```

---

## 📂 Struktur Folder Utama

```text
frontend/
├── public/              # Aset gambar statis, logo, dan SVG
├── src/
│   ├── app/             # Routing Next.js App Router (Halaman login, dashboard, aktivasi, dll)
│   ├── components/      # Komponen UI global (Sidebar, TopBar, ClientProviders, ConfirmModal)
│   ├── contexts/        # AuthContext untuk manajemen status otentikasi global warga
│   └── utils/           # Konfigurasi Axios API (Axios Interceptors) & format helper rupiah/tanggal
├── jsconfig.json        # Path alias map compiler options (@/* -> ./src/*)
├── postcss.config.mjs
├── tailwind.config.js   # Konfigurasi kustom desain Tailwind CSS v4
└── package.json
```

---

## 🔒 Lisensi & Keamanan
Seluruh parameter rahasia di dalam file `.env` telah secara ketat dimasukkan ke dalam `.gitignore` guna mencegah kebocoran kredensial di repositori publik.

---
<div align="center">
  <p>Dibuat dengan ❤️ untuk kemudahan pengelolaan administrasi warga.</p>
</div>
