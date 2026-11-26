/**
 * ==============================================================================
 * KATEGORI 2: PROFIL, FOTO DIRI & KONTAK ANDA
 * ==============================================================================
 * File ini khusus untuk mengubah data Anda: nama, foto profil, peran,
 * bio/cerita diri, daftar keahlian, dan alamat email kontak.
 * 
 * TIPS GANTI FOTO PROFIL:
 * 1. Simpan foto baru Anda di folder: images/profile/
 * 2. Ganti nama file di baris 'foto' di bawah.
 * ==============================================================================
 */

const dataProfil = {
    // 1. Nama lengkap / panggilan yang ditampilkan di profil
    nama: "Raifan Syakib Febrian",

    // 2. Sebutan peran / pekerjaan Anda
    peran: "Website Creator, Visual Storyteller, dan Desainer Grafis",

    // 3. Jalur foto profil (Simpan file di folder images/profile/)
    foto: "images/profile/profile.png.jpeg",

    // 4. Status ketersediaan (ditandai titik hijau menyala)
    status: "Terbuka untuk Kolaborasi",

    // 5. Kutipan statement utama Anda
    kutipan: "Seorang manusia biasa yang lumayan bisa banyak hal tapi 'bisa'-nya nanggung. Website ini berawal dari rasa gabut, tapi semoga tetap memberi nilai.",

    // 6. Narasi cerita singkat tentang diri Anda
    bio: "Halo, saya Raifan. Saat ini merupakan Mahasiswa Universitas Komputer Indonesia Di balik label portofolio ini, saya hanyalah seseorang yang senang mengamati visual di sekitar kita, gemar menyusun tata letak poster di Canva dan Adobe, sketching, serta senang mencoba hal baru.",

    // 7. Daftar keahlian atau aplikasi yang Anda gunakan
    keahlian: [
        "Canva",
        "Vibecoder",
        "Sketching",
        "Photography",
        "Layouting",
        "Visual Storytelling"
    ],

    // 8. Alamat email yang disalin otomatis saat pengunjung menekan tombol email
    email: "raidark2008@gmail.com"
};

// Hubungkan ke sistem website (jangan dihapus)
if (typeof window !== 'undefined') {
    window.dataProfil = dataProfil;
}
