/**
 * ==============================================================================
 * KATEGORI 3: DAFTAR KARYA DIGITAL DESIGN
 * ==============================================================================
 * File ini khusus untuk menambah, mengganti, atau menghapus karya Desain Grafis,
 * Poster, Cover, dan Layout.
 * 
 * CARA GANTI GAMBAR:
 * 1. Simpan foto/poster baru Anda ke dalam folder: images/design/
 * 2. Ganti nilai 'gambar' di bawah sesuai nama file baru Anda.
 * 
 * CARA MENAMBAH KARYA BARU:
 * Salin salah satu blok kurung kurawal { ... }, tempel di bawahnya,
 * lalu sesuaikan judul dan nama filenya.
 * ==============================================================================
 */

const dataKaryaDesain = [
    {
        id: 'des-1',
        judul: 'Absurdity Horror',
        gambar: 'images/design/poster1.jpeg',
        keteranganSingkat: 'Eksperimen tipografi kelam dengan permainan kontras tinggi dan tekstur visual.',
        ceritaLengkap: 'Poster berkonsep horor psikologis yang menggabungkan elemen tipografi terdistorsi dan komposisi gelap untuk menciptakan ketegangan visual yang pekat.',
        alat: 'Adobe Photoshop / Illustrator',
        bentukRasio: 'portrait', // Pilihan: 'portrait' (tinggi) atau 'square' (kotak)
        teksWatermark: 'HORROR'
    },
    {
        id: 'des-2',
        judul: 'Recruitment Ekskul',
        gambar: 'images/design/poster2.jpeg',
        keteranganSingkat: 'Desain visual promosi untuk keterlibatan kegiatan kampus/sekolah.',
        ceritaLengkap: 'Pendekatan visual yang dinamis dan berenergi untuk menarik minat anggota baru, memadukan palet warna kontemporer dan hierarki teks yang tegas.',
        alat: 'Canva & Adobe Suite',
        bentukRasio: 'portrait',
        teksWatermark: 'RECRUIT'
    },
    {
        id: 'des-3',
        judul: 'Drama Promotion',
        gambar: 'images/design/poster3.jpeg',
        keteranganSingkat: 'Key art pementasan drama dengan penekanan pada mood dramatis.',
        ceritaLengkap: 'Desain poster untuk promosi teater, menitikberatkan pada pencahayaan panggung dan tata letak karakter yang menyiratkan konflik cerita.',
        alat: 'Adobe Illustrator',
        bentukRasio: 'portrait',
        teksWatermark: 'THEATRE'
    },
    {
        id: 'des-4',
        judul: 'Nationality',
        gambar: 'images/design/poster4.jpeg',
        keteranganSingkat: 'Eksplorasi grafis identitas kebangsaan dan visual kultural modern.',
        ceritaLengkap: 'Karya desain yang merespons elemen simbolisme kebangsaan yang diinterpretasikan ulang dengan sentuhan grafis minimalis dan kontemporer.',
        alat: 'Digital Layout',
        bentukRasio: 'portrait',
        teksWatermark: 'NATION'
    }
];

// Hubungkan ke sistem website (jangan dihapus)
if (typeof window !== 'undefined') {
    window.dataKaryaDesain = dataKaryaDesain;
}
