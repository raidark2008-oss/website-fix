/**
 * ==============================================================================
 * KATEGORI 1: TEKS UTAMA & PENGATURAN WEBSITE
 * ==============================================================================
 * File ini untuk mengubah judul utama website, teks pembuka, manifesto,
 * dan teks catatan kaki (footer).
 * 
 * Buka dan edit file ini langsung di VS Code.
 * Cukup ubah teks di dalam tanda kutip "..." atau '...'.
 * ==============================================================================
 */

const dataTeksUtama = {
    // 1. Nama Brand / Judul di sudut kiri atas
    namaBrand: "Re-Light",

    // 2. Sub-judul / Edisi di sebelah nama brand
    edisiBrand: "Portfolio",

    // 3. Label badge kecil di atas judul utama
    badgeKecil: "Arsip Visual ",

    // 4. Judul besar Hero (bagian awal)
    judulDepan: "Ulangi, definisikan, dan",

    // 5. Judul besar Hero yang diberi penekanan miring (warna amber)
    judulSorotan: "perbaiki cahaya.",

    // 6. Paragraf deskripsi di bawah judul besar
    deskripsiPengantar: "In The Name of Light, Who Fight the Darkness, Create the Shadow.",

    // 7. Kutipan filosofi / manifesto (di kotak kanan samping judul)
    manifesto: "(Re:Light) — Mengulang proses, menemukan kembali kontras antara gelap dan terang. ",

    // 8. Teks kredit di bagian paling bawah website (Footer)
    footerKredit: "made by Raifan. Dibuat dengan kesederhanaan."
};

// Hubungkan ke sistem website (jangan dihapus)
if (typeof window !== 'undefined') {
    window.dataTeksUtama = dataTeksUtama;
}
