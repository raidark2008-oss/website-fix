/**
 * ==============================================================================
 * KATEGORI 7: REPOSITORI MUSIK BY SPOTIFY
 * ==============================================================================
 * File ini khusus untuk menambah, mengganti, atau mengedit playlist dan lagu Spotify
 * yang menemani proses berkarya (desain, sketsa, dan fotografi).
 * 
 * CARA MENGGANTI PLAYLIST SPOTIFY:
 * 1. Buka Spotify di browser atau aplikasi.
 * 2. Buka Playlist / Album / Lagu favorit Anda.
 * 3. Klik tanda titik tiga (...) -> Share (Bagikan) -> Copy Link (Salin Tautan).
 * 4. Untuk embedUrl: Ganti ID playlist/lagu pada URL embed di bawah:
 *    Format: "https://open.spotify.com/embed/playlist/[ID_PLAYLIST]?utm_source=generator&theme=0"
 *    Atau untuk lagu: "https://open.spotify.com/embed/track/[ID_LAGU]?utm_source=generator&theme=0"
 * ==============================================================================
 */

const dataMusikSpotify = {
    // 1. Informasi Header Bagian Musik
    header: {
        badgeKecil: "Music",
        judul: "My fav songs",
        deskripsi: "Koleksi lagu Spotify yang menemani proses hidupku"
    },

    // 2. Pemutar Spotify Utama (Embedded Player)
    // Playlist pilihan yang disematkan langsung di website
    pemutarUtama: {
        judul: "My top 10 songs",
        kurator: "Approved by Me",
        deskripsi: "My Top 10 songs",
        // Tautan sematan resmi Spotify (Dark Theme)
        embedUrl: "https://open.spotify.com/embed/playlist/4SXsJKkZlsDakxgtqIpy7z?utm_source=generator&si=9384146970fe412d",
        tautanSpotify: "https://open.spotify.com/playlist/4SXsJKkZlsDakxgtqIpy7z?si=d20b28f0b81945dd"
    },

    // 3. Repositori Rekomendasi Lagu & Playlist Pilihan
    // Anda bisa menambah, mengganti, atau menghapus daftar lagu di bawah ini
    koleksiLagu: [
        {
            id: 'sp-1',
            nomor: '№ 01',
            judul: '君の恋人になったら (Kimi no Koibito ni Nattara)',
            artis: 'back number',
            kategoriKarya: 'Fav malam hari',
            durasi: '04:04',
            moodTag: 'When Yah',
            tautanSpotify: 'https://open.spotify.com/track/0k4KaqElLVjdR6sVHPTS6h?si=e27e18a3d6c54bdc',
            catatanKurator: 'Liriknya ngomongin bayangan manis dan rasa tulus kalau suatu hari bisa bareng—hangat, agak lucu, tapi ngena banget pas didengerin malam-malam.'
        },
        {
            id: 'sp-2',
            nomor: '№ 02',
            judul: '青い栞 (Aoi Shiori)',
            artis: 'Galileo Galilei',
            kategoriKarya: 'Nostalgia Sore',
            durasi: '05:38',
            moodTag: 'Mitsuketa...Menma',
            tautanSpotify: 'https://open.spotify.com/track/0K8HZrpxySH9R001UPv8H5?si=2de13ba772504991',
            catatanKurator: 'Nostalgia masa muda dan rasa yang belum sempat terucap—hangat sekaligus pengen nahan waktu biar nggak cepet lewat.'
        },
        {
            id: 'sp-3',
            nomor: '№ 03',
            judul: '凸凹 (Dekoboko)',
            artis: 'Kiyoe Yoshioka',
            kategoriKarya: 'Biter sweet',
            durasi: '03:49',
            moodTag: 'mood hype',
            tautanSpotify: 'https://open.spotify.com/track/59zVkMccrN10JrDGdV4JeG?si=69b10b0aee654224',
            catatanKurator: 'Dua orang yang beda dan saling melengkapi—kekurangan masing-masing justru bikin nyambung.'
        },
        {
            id: 'sp-4',
            nomor: 'Honorable Mention',
            judul: 'Harmony Cinta',
            artis: 'Gita Gutawa',
            kategoriKarya: 'Love bombing and never disappear',
            durasi: '3:54',
            moodTag: 'Falling In Love',
            tautanSpotify: 'https://open.spotify.com/track/2OBt0NazZ5xBrJsVOQl3nF?si=fa340196cfbd4e0e',
            catatanKurator: 'Debaran jatuh cinta yang terasa familiar dan salting'
        }
    ]
};

// Hubungkan ke sistem website (jangan dihapus)
if (typeof window !== 'undefined') {
    window.dataMusikSpotify = dataMusikSpotify;
}
