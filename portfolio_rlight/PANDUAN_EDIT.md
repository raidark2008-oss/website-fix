# 📖 PANDUAN MENGEDIT WEBSITE RE-LIGHT (DI VS CODE)

Website ini sekarang telah dibagi menjadi **file-file khusus per kategori** di dalam folder `content/`. Anda bisa membuka folder ini langsung di **VS Code**, mengedit teks atau foto yang diinginkan, dan perubahan akan langsung tampil di website.

---

## 🗂️ Struktur File di VS Code

Saat Anda membuka folder `website no AI` di VS Code, Anda akan melihat susunan berikut:

```text
website no AI/
│
├── 📂 content/                      <-- ⭐️ BUKA FOLDER INI UNTUK MENGEDIT
│   ├── 📄 1_teks_utama.js           <-- Edit Judul Besar, Tagline, Manifesto, & Footer
│   ├── 📄 2_profil_saya.js          <-- Edit Nama, Bio, Keahlian, Kontak Email, & Foto Profil
│   ├── 📄 3_karya_desain.js         <-- Edit / Tambah Foto Karya Digital Design (Poster dll)
│   ├── 📄 4_karya_sketsa.js         <-- Edit / Tambah Foto Karya Sketsa Lepas
│   ├── 📄 5_karya_fotografi.js      <-- Edit / Tambah Foto Karya Fotografi Jalanan
│   ├── 📄 6_catatan_esai.js         <-- Edit / Tambah Tulisan & Catatan Refleksi
│   └── 📄 7_musik_spotify.js        <-- Edit Playlist & Rekomendasi Musik Spotify
│
├── 📂 images/                       <-- 🖼️ Tempat Menyimpan File Gambar / Foto
│   ├── design/                      <-- Taruh poster / desain baru di sini
│   ├── photography/                 <-- Taruh foto kamera baru di sini
│   ├── sketches/                    <-- Taruh gambar sketsa baru di sini
│   └── profile/                     <-- Taruh foto profil Anda di sini
│
├── 📄 index.html                    <-- Halaman website (klik 2x untuk membuka di browser)
└── 📄 PANDUAN_EDIT.md               <-- Panduan praktis ini
```

---

## 🛠️ Panduan Praktis Per Kategori

### 1. Ingin Mengubah Judul & Teks Pembuka Website?
👉 Buka file: **`content/1_teks_utama.js`**
* Cukup ubah teks di dalam tanda kutip `"..."` pada bagian `judulDepan`, `judulSorotan`, `deskripsiPengantar`, atau `manifesto`.

### 2. Ingin Mengubah Nama, Bio, atau Foto Profil?
👉 Buka file: **`content/2_profil_saya.js`**
* **Mengganti Foto Profil**:
  1. Masukkan foto baru Anda ke folder `images/profile/` (contoh: `foto-baru.jpg`).
  2. Di file `2_profil_saya.js`, ganti baris:
     ```javascript
     foto: "images/profile/foto-baru.jpg",
     ```
* **Mengganti Bio / Keahlian / Email**:
  Ubah langsung teks di variabel `bio`, `keahlian`, atau `email`.

### 3. Ingin Mengganti atau Menambah Karya Foto / Desain / Sketsa?
Pilih file sesuai kategorinya:
* **Desain** $\rightarrow$ Buka **`content/3_karya_desain.js`**
* **Sketsa** $\rightarrow$ Buka **`content/4_karya_sketsa.js`**
* **Fotografi** $\rightarrow$ Buka **`content/5_karya_fotografi.js`**

**Langkah menambah foto baru:**
1. Masukkan file gambar Anda ke folder yang sesuai (misal: `images/photography/senja.jpeg`).
2. Buka file kategori yang bersangkutan, salin salah satu blok kurung kurawal `{ ... }`, tempel di urutan paling atas atau bawah, lalu ganti datanya:
   ```javascript
   {
       id: 'pht-10',
       judul: 'Senja di Ujung Jalan',
       gambar: 'images/photography/senja.jpeg', // jalur ke foto Anda
       keteranganSingkat: 'Pendaran cahaya sore di persimpangan kota.',
       ceritaLengkap: 'Foto candid yang diambil saat matahari mulai terbenam di antara gedung-gedung tinggi.',
       alat: 'Kamera HP / 35mm',
       bentukRasio: 'square', // 'square' atau 'portrait'
       teksWatermark: 'SUNSET'
   },
   ```
*Jumlah karya dan nomor urut di website akan dihitung otomatis oleh sistem!*

### 4. Ingin Mengubah atau Menulis Esai Baru?
👉 Buka file: **`content/6_catatan_esai.js`**
* Anda bisa mengubah judul, waktu baca, topik, dan paragraf isi tulisan.
* Gunakan dua kali Enter (baris kosong) untuk memisahkan antar paragraf.

### 5. Ingin Mengubah Playlist / Rekomendasi Lagu Spotify?
👉 Buka file: **`content/7_musik_spotify.js`**
* **Mengganti Playlist Pemutar Spotify**:
  1. Buka playlist atau lagu Anda di Spotify.
  2. Klik tanda titik tiga `(...)` -> **Share (Bagikan)** -> **Copy link to playlist** (Salin Tautan).
  3. Ganti URL di bagian `embedUrl` atau `tautanSpotify`.
* **Mengedit / Menambah Daftar Lagu Pilihan**:
  Di bagian `koleksiLagu: [ ... ]`, Anda bisa menambahkan lagu favorit baru lengkap dengan artis, durasi, mood tag, serta catatan kurasi Anda.
  Tombol menu **"Musik"** di bilah atas akan mengarahkan pengunjung langsung ke repositori musik ini!

---

## 💡 Keunggulan Sistem Kategori Baru Ini
1. **Terpisah & Sangat Rapi**: Jika ingin mengedit foto fotografi, Anda tidak perlu melihat ratusan baris kode desain atau profil. Cukup buka satu file yang bersangkutan.
2. **Bahasa Indonesia Jelas**: Semua nama variabel dan instruksi di setiap file menggunakan bahasa Indonesia yang mudah dipahami.
3. **Aman dari Kerusakan**: Kode HTML (`index.html`) dan CSS (`style.css`) tidak akan tersentuh sama sekali, sehingga tata letak website dijamin tidak akan rusak atau berantakan saat Anda mengedit konten.
4. **Fitur Simpan Otomatis di VS Code**: Pengaturan VS Code telah diaktifkan otomatis (`files.autoSave`), sehingga perubahan yang Anda ketik langsung tersimpan dengan rapi.
