/**
 * ==============================================================================
 * KATEGORI 6: CATATAN & ESAI (TULISAN / PEMIKIRAN)
 * ==============================================================================
 * File ini khusus untuk menambah, mengganti, atau mengedit tulisan refleksi,
 * esai santai, atau catatan proses kreatif Anda.
 * 
 * TIPS MENULIS:
 * - Gunakan dua kali enter (baris kosong) untuk memisahkan antar paragraf.
 * - Anda bebas mengubah topik, perkiraan waktu baca, dan judul.
 * ==============================================================================
 */

const dataCatatanEsai = [
    {
        id: 'essay-1',
        nomor: 'ESAI № 01',
        waktuBaca: '3 MIN BACA',
        topik: 'ESTETIKA & RUANG',
        judul: 'Filosofi Cahaya',
        cuplikanSingkat: 'Cahaya bukan sekadar gelombang elektromagnetik. Bagi saya, cahaya adalah pembawa informasi tentang ruang dan waktu. Tanpa cahaya, estetika hanyalah kegelapan yang tak terdefinisi...',
        isiLengkap: `Cahaya bukan sekadar gelombang elektromagnetik. Bagi saya, cahaya adalah pembawa informasi tentang ruang dan waktu. Tanpa cahaya, estetika hanyalah kegelapan yang tak terdefinisi. Dalam setiap desain dan foto yang saya buat, saya selalu mencoba memahami bagaimana cahaya jatuh, memantul, dan memberikan nyawa serta kedalaman pada suatu objek.

Dalam fotografi jalanan maupun grafis dua dimensi, bayangan (shadow) sama berharganya dengan sorotan (highlight). Bayangan memberi tempat bagi mata untuk beristirahat, sementara cahaya menuntun perhatian kepada inti cerita.`
    },
    {
        id: 'essay-2',
        nomor: 'ESAI № 02',
        waktuBaca: '2 MIN BACA',
        topik: 'MEDIA & KEJUJURAN',
        judul: 'Narasi Digital',
        cuplikanSingkat: 'Di era algoritma serba cepat, cerita sering kali terkubur oleh tren sesaat dan dorongan untuk selalu viral. Namun saya percaya, narasi yang jujur akan selalu menemukan jalannya sendiri...',
        isiLengkap: `Di era algoritma serba cepat, cerita sering kali terkubur oleh tren sesaat dan dorongan untuk selalu viral. Namun saya percaya, narasi yang jujur akan selalu menemukan jalannya sendiri.

Melalui portofolio Re-Light ini, saya mencoba mengumpulkan kembali serpihan narasi yang sempat tercecer di folder-folder tak bernama. Karya yang dibuat bukan untuk memuaskan metrik mesin pencari, melainkan sebagai tanda bahwa kita pernah memperhatikan detail-detail kecil di sekitar kita.`
    },
    {
        id: 'essay-3',
        nomor: 'ESAI № 03',
        waktuBaca: '3 MIN BACA',
        topik: 'PROSES BELAJAR',
        judul: 'Estetika yang "Nanggung"',
        cuplikanSingkat: 'Banyak orang merasa harus menjadi seorang spesialis mutlak sebelum berani memperlihatkan apa yang mereka buat. Namun ada kebebasan luar biasa saat kita mengakui proses belajar yang tidak sempurna...',
        isiLengkap: `Banyak orang merasa harus menjadi seorang spesialis mutlak sebelum berani memperlihatkan apa yang mereka buat. Saya sering menyebut diri saya sebagai orang yang 'bisa banyak hal tapi bisanya nanggung'. Awalnya ada rasa minder terhadap sebutan tersebut.

Namun lambat laun, saya menyadari ada kebebasan luar biasa di sana. Ketika kita tidak terbebani gelar 'ahli', kita bebas mencoba coretan sketsa aneh, menjelajahi komposisi fotografi jalanan, atau bereksperimen dengan tipografi tanpa takut salah. Ketidaksempurnaan itulah yang membuat karya terasa manusiawi.`
    }
];

// Hubungkan ke sistem website (jangan dihapus)
if (typeof window !== 'undefined') {
    window.dataCatatanEsai = dataCatatanEsai;
}
