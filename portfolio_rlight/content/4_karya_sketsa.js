/**
 * ==============================================================================
 * KATEGORI 4: DAFTAR KARYA SKETSA LEPAS
 * ==============================================================================
 * File ini khusus untuk menambah, mengganti, atau menghapus karya Sketsa,
 * Coretan Digital, Studi Anatomi, dan Konsep Seni.
 * 
 * CARA GANTI GAMBAR:
 * 1. Simpan foto/gambar sketsa baru ke dalam folder: images/sketches/
 * 2. Ganti nilai 'gambar' di bawah sesuai nama file baru Anda.
 * ==============================================================================
 */

const dataKaryaSketsa = [
    {
        id: 'skt-1',
        judul: 'someone',
        gambar: 'images/sketches/draw1.png.jpeg',
        keteranganSingkat: 'Coretan gestur figuratif tanpa patokan realistis yang kaku.',
        ceritaLengkap: 'Sketsa digital spontan yang mengeksplorasi garis-garis bebas untuk menangkap esensi postur dan ekspresi sesosok manusia.',
        alat: 'Digital Brush / Stylus',
        bentukRasio: 'square',
        teksWatermark: 'SKETCH'
    },
    {
        id: 'skt-2',
        judul: '',
        gambar: 'images/blomdiupdate.png.png',
        keteranganSingkat: '',
        ceritaLengkap: '',
        alat: 'Digital Pencil 2B',
        bentukRasio: 'square',
        teksWatermark: 'STUDY'
    },
    {
        id: 'skt-3',
        judul: '',
        gambar: 'images/sabar.png.png',
        keteranganSingkat: '.',
        ceritaLengkap: '',
        alat: 'Ink & Digital Pen',
        bentukRasio: 'square',
        teksWatermark: 'SCENIC'
    },
    {
        id: 'skt-4',
        judul: '',
        gambar: 'images/blomdiupdate.png.png',
        keteranganSingkat: '',
        ceritaLengkap: '',
        bentukRasio: 'square',
        teksWatermark: 'SHADOW'
    },
  
];

// Hubungkan ke sistem website (jangan dihapus)
if (typeof window !== 'undefined') {
    window.dataKaryaSketsa = dataKaryaSketsa;
}
