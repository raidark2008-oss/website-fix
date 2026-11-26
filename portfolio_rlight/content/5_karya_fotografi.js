/**
 * ==============================================================================
 * KATEGORI 5: DAFTAR KARYA FOTOGRAFI JALANAN & RUANG
 * ==============================================================================
 * File ini khusus untuk menambah, mengganti, atau menghapus foto-foto jepretan Anda.
 * 
 * CARA GANTI FOTO:
 * 1. Simpan foto baru ke dalam folder: images/photography/
 * 2. Ganti nilai 'gambar' di bawah sesuai nama file foto Anda.
 * 
 * CARA MENAMBAH FOTO BARU:
 * Salin salah satu blok kurung kurawal { ... }, tempel di bawahnya,
 * lalu sesuaikan judul dan nama file fotonya.
 * ==============================================================================
 */

const dataKaryaFotografi = [
    {
        id: 'pht-1',
        judul: 'Rama And Shinta',
        gambar: 'images/photography/jepret1.jpeg',
        keteranganSingkat: 'Interaksi hangat di tengah dinginnya malam jalanan perkotaan.',
        ceritaLengkap: 'Foto human interest yang menangkap kebersamaan dua sosok dalam temaram cahaya lampu jalan, membawa nuansa romansa klasik di tengah keramaian urban.',
        alat: 'Mobile Photography / 35mm Equivalent',
        bentukRasio: 'square',
        teksWatermark: 'STREET'
    },
    {
        id: 'pht-2',
        judul: 'The Unknown Field',
        gambar: 'images/photography/jepret2.jpeg',
        keteranganSingkat: 'Arsitektur dan bentangan ruang lapang yang hening.',
        ceritaLengkap: 'Menyoroti keterasingan dan keheningan di sudut ruang terbuka publik. Geometri bangunan membingkai kekosongan dengan damai.',
        alat: 'Lensa Sudut Lebar',
        bentukRasio: 'square',
        teksWatermark: 'ARCHI'
    },
    {
        id: 'pht-3',
        judul: 'Absolute Void',
        gambar: 'images/photography/jepret3.jpeg',
        keteranganSingkat: 'Minimalisme ekstrem dan kontras ruang hampa.',
        ceritaLengkap: 'Komposisi minimalis di mana sebagian besar bingkai didominasi oleh ruang negatif gelap, membiarkan sedikit cahaya mendefinisikan batas objek.',
        alat: 'Low Light Capture',
        bentukRasio: 'square',
        teksWatermark: 'VOID'
    },
    {
        id: 'pht-4',
        judul: 'The Deep Fire In Forest',
        gambar: 'images/photography/jepret4.jpeg',
        keteranganSingkat: 'Suhu warna hangat yang menyala di kedalaman pepohonan.',
        ceritaLengkap: 'Cahaya keemasan senja yang menembus dedaunan lebat, memberikan sensasi hangat seperti lidah api yang menyala di antara ketenangan rimba.',
        alat: 'Golden Hour Aperture',
        bentukRasio: 'square',
        teksWatermark: 'FOREST'
    },
    {
        id: 'pht-5',
        judul: 'Triad POV',
        gambar: 'images/photography/jepret5.jpeg',
        keteranganSingkat: 'Sudut pandang segitiga komposisi tiga elemen utama.',
        ceritaLengkap: 'Eksperimen komposisi segitiga visual yang menuntun mata penonton bergerak melingkar di seluruh sudut bingkai foto.',
        alat: 'Street Framing',
        bentukRasio: 'square',
        teksWatermark: 'TRIAD'
    },
    {
        id: 'pht-6',
        judul: 'Dont Know',
        gambar: 'images/photography/jepret6.jpeg',
        keteranganSingkat: 'Spontanitas murni tanpa rencana yang berlebihan.',
        ceritaLengkap: 'Foto spontan yang diambil begitu saja saat berjalan. Tidak semua momen butuh alasan teoritis—terkadang insting visual sudah cukup.',
        alat: 'Candid Snapshot',
        bentukRasio: 'square',
        teksWatermark: 'CANDID'
    },
    {
        id: 'pht-7',
        judul: 'The Little Hope',
        gambar: 'images/photography/jepret7.jpeg',
        keteranganSingkat: 'Secercah cahaya kecil yang memecah kegelapan.',
        ceritaLengkap: 'Kontras dramatis antara bayangan tebal dan seberkas sinar kecil yang jatuh tepat pada subjek, menyiratkan harapan di tengah kepekatan.',
        alat: 'High Contrast Mode',
        bentukRasio: 'square',
        teksWatermark: 'HOPE'
    
    },
    {
        id: 'pht-9',
        judul: 'Between Three and Sky',
        gambar: 'images/photography/jepret9.jpeg',
        keteranganSingkat: 'Siluet dahan pepohonan yang membelah cakrawala.',
        ceritaLengkap: 'Interaksi puitis antara cabang-cabang pohon dengan gradasi warna langit senja yang lembut, menghadirkan suasana melankolis yang menenangkan.',
        alat: 'Dusk Natural Light',
        bentukRasio: 'square',
        teksWatermark: 'DUSK'
    }
];

// Hubungkan ke sistem website (jangan dihapus)
if (typeof window !== 'undefined') {
    window.dataKaryaFotografi = dataKaryaFotografi;
}
