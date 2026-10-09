# PROYEK GARUDA — Node.js Information System

Portal berbahasa Indonesia untuk menampilkan enam konsep teknologi dari poster referensi pengguna, dilengkapi dashboard admin, PostgreSQL, formulir kontak, dan CTA WhatsApp 0858-9109-9220.

## Fitur
- Landing page responsif bertema teknologi Indonesia
- Profil program bergaya company profile dengan visi, misi, nilai, dan proses eksplorasi
- 6 katalog konsep + halaman detail
- Status dan progress R&D
- Login admin + edit informasi proyek
- Form pesan masuk tersimpan PostgreSQL
- Integrasi tombol WhatsApp
- Disclaimer konsep visual/non-resmi

## Instalasi
1. Install Node.js 18+ dan PostgreSQL.
2. Di pgAdmin, daftarkan server PostgreSQL jika belum ada, lalu catat host, port, username, dan password yang digunakan.
3. Buat database bernama `proyek_garuda` di pgAdmin.
4. Pilih database tersebut, buka **Tools → Query Tool**, jalankan `database/setup.sql` untuk membuat tabel dan enam proyek awal. Skrip aman dijalankan ulang.
5. Salin `.env.example` menjadi `.env` (PowerShell: `Copy-Item .env.example .env`; Git Bash: `cp .env.example .env`).
6. Isi `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, dan `PGPASSWORD` di `.env` agar cocok dengan server PostgreSQL pgAdmin. `DATABASE_URL` lama tetap didukung oleh aplikasi, tetapi konfigurasi baru menggunakan variabel `PG*`. Jangan bagikan atau commit `.env`.
7. Jalankan `npm install`, kemudian `npm run dev` atau `npm start`.
8. Buka `http://localhost:3000`.

Aplikasi membuat tabel dan enam proyek contoh saat pertama kali tersambung. Akun admin mengikuti `ADMIN_USERNAME` dan `ADMIN_PASSWORD` di `.env`; gunakan password admin yang kuat.

Jika koneksi gagal, pastikan PostgreSQL Server aktif dan host, port, nama database, username, serta password pada `.env` sama dengan koneksi pgAdmin.

## Deploy ke Vercel
1. Push repository ke GitHub, lalu import repository tersebut dari dashboard Vercel. Pilih branch `master`.
2. Vercel tidak dapat mengakses PostgreSQL yang hanya berjalan di komputer lokal. Gunakan PostgreSQL hosted yang dapat diakses Vercel.
3. Tambahkan `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_USERNAME`, dan `ADMIN_PASSWORD` pada **Project Settings → Environment Variables** di Vercel. Gunakan koneksi PostgreSQL hosted untuk `DATABASE_URL`; jangan masukkan isi `.env` lokal ke GitHub.
4. Deploy ulang setelah environment variables tersimpan. Aplikasi membuat tabel, data contoh, dan penyimpanan session PostgreSQL saat permintaan pertama.

Express di-export sebagai Vercel Function melalui `api/index.js`; `server.js` tetap menjadi entry point lokal. Session admin disimpan di PostgreSQL agar tetap bekerja pada serverless.
Gambar portofolio disajikan sebagai WebP yang dioptimalkan; inisialisasi database juga mengubah referensi gambar lama dari PNG ke WebP.

## Struktur
- `server.js` entry point
- `src/app.js` Express app untuk lokal dan Vercel
- `api/index.js` Vercel Function entry point
- `src/config/db.js` koneksi + auto schema/seed
- `database/setup.sql` skema dan data proyek awal untuk pgAdmin
- `src/routes` public/admin routes
- `src/views` EJS templates
- `public/css` styling
- `public/images` poster referensi
