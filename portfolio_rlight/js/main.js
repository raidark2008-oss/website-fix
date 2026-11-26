/**
 * ==============================================================================
 * RE-LIGHT | APLIKASI UTAMA (LOGIKA INTERAKTIF & MOTION GRAPHICS)
 * ==============================================================================
 * Menggabungkan seluruh file data dari folder 'content/' dan merender antarmuka
 * secara otomatis, dinamis, dan penuh animasi motion graphic.
 * 
 * SUMBER KONTEN KATEGORIS:
 * - content/1_teks_utama.js
 * - content/2_profil_saya.js
 * - content/3_karya_desain.js
 * - content/4_karya_sketsa.js
 * - content/5_karya_fotografi.js
 * - content/6_catatan_esai.js
 * - content/7_musik_spotify.js
 * ==============================================================================
 */

// State Aplikasi
let currentFilter = 'all';
let currentModalIndex = 0;
let visibleArtworks = [];
let siteData = null;

// State Modul Sketsa
let sketchCtx = null;
let isDrawing = false;
let currentTool = 'pencil';
let currentStrokeColor = '#e38d4a';
let currentBrushSize = 3;
let sketchHistory = [];
const MAX_SKETCH_HISTORY = 25;

// State Modul Kamera
let photoIndex = 0;
let shutterAudioCtx = null;
let cameraPhotoItems = [];
let currentLensFilterIndex = 0;
const cameraLensFilters = [
    { label: 'COLOR', className: '' },
    { label: 'MONO 35MM', className: 'film-mono' },
    { label: 'WARM FILM', className: 'film-warm' }
];

// State Motion Graphic Partikel
let particleRgb = '242, 154, 82';

// Inisialisasi Aplikasi saat Dokumen Siap
document.addEventListener('DOMContentLoaded', () => {
    siteData = loadAllCategorizedData();
    initSiteContent();
    initSketchCanvas();
    initCameraPhotosList();
    renderCatalog();
    initEventListeners();
    initScrollEffects();
    initMotionParticleCanvas();
    initCardMotionEffects();
    safeCreateIcons();
});

/**
 * Helper aman memanggil Lucide Icons (tidak error jika offline/tanpa internet)
 */
function safeCreateIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

/**
 * Menggabungkan data dari 7 file kategoris di folder 'content/'
 */
function loadAllCategorizedData() {
    const teks = window.dataTeksUtama || {};
    const profil = window.dataProfil || {};

    const listDesain = (window.dataKaryaDesain || []).map(item => ({
        id: item.id,
        category: 'design',
        categoryLabel: 'Digital Design',
        src: item.gambar,
        title: item.judul,
        caption: item.keteranganSingkat,
        desc: item.ceritaLengkap,
        tools: item.alat,
        aspect: item.bentukRasio || 'portrait',
        accentText: item.teksWatermark || 'DESIGN'
    }));

    const listSketsa = (window.dataKaryaSketsa || []).map(item => ({
        id: item.id,
        category: 'sketch',
        categoryLabel: 'Sketsa Lepas',
        src: item.gambar,
        title: item.judul,
        caption: item.keteranganSingkat,
        desc: item.ceritaLengkap,
        tools: item.alat,
        aspect: item.bentukRasio || 'square',
        accentText: item.teksWatermark || 'SKETCH'
    }));

    const listFoto = (window.dataKaryaFotografi || []).map(item => ({
        id: item.id,
        category: 'photo',
        categoryLabel: 'Fotografi',
        src: item.gambar,
        title: item.judul,
        caption: item.keteranganSingkat,
        desc: item.ceritaLengkap,
        tools: item.alat,
        aspect: item.bentukRasio || 'square',
        accentText: item.teksWatermark || 'STREET'
    }));

    const listEsai = (window.dataCatatanEsai || []).map(item => ({
        id: item.id,
        number: item.nomor,
        readTime: item.waktuBaca,
        topic: item.topik,
        title: item.judul,
        snippet: item.cuplikanSingkat,
        content: item.isiLengkap
    }));

    const musik = window.dataMusikSpotify || {};

    return {
        siteInfo: {
            brandName: teks.namaBrand || "Re-Light",
            edition: teks.edisiBrand || "Ed. 2024 / Studio Raifan",
            footerCredit: teks.footerKredit || "Dirancang dan dirawat oleh Raifan."
        },
        hero: {
            metaBadge: teks.badgeKecil || "Arsip Visual & Eksplorasi Digital • Raifan",
            headingMain: teks.judulDepan || "Ulangi, definisikan, dan",
            headingEmphasized: teks.judulSorotan || "perbaiki cahaya.",
            description: teks.deskripsiPengantar || "",
            manifesto: teks.manifesto || "",
            stats: {
                creatorRole: profil.peran || "Kreator Biasa"
            }
        },
        profile: {
            name: profil.nama || "Raifan",
            role: profil.peran || "Generalis Kreatif",
            avatar: profil.foto || "images/profile/profile.png.jpeg",
            status: profil.status || "Terbuka untuk Kolaborasi",
            quote: profil.kutipan || "",
            bio: profil.bio || "",
            skills: profil.keahlian || [],
            contactEmail: profil.email || "raifan.creator@example.com"
        },
        artworks: [...listDesain, ...listSketsa, ...listFoto],
        essays: listEsai,
        music: {
            header: musik.header || {},
            player: musik.pemutarUtama || {},
            tracks: musik.koleksiLagu || []
        }
    };
}

/**
 * 1. Mengisi Semua Teks & Pengaturan ke DOM
 */
function initSiteContent() {
    if (!siteData) return;

    if (siteData.siteInfo) {
        setText('brandTitleDisplay', siteData.siteInfo.brandName);
        setText('brandEditionDisplay', siteData.siteInfo.edition);
        setText('footerCreditDisplay', siteData.siteInfo.footerCredit);
    }

    if (siteData.hero) {
        setText('heroMetaDisplay', siteData.hero.metaBadge);
        setText('heroHeadingMain', siteData.hero.headingMain);
        setText('heroHeadingEm', siteData.hero.headingEmphasized);
        setText('heroDescDisplay', siteData.hero.description);
        setText('heroManifestoDisplay', siteData.hero.manifesto);
        setText('statCreatorRole', siteData.hero.stats?.creatorRole || "Kreator Biasa");
        setText('statEssaysCount', siteData.essays ? siteData.essays.length : 3);
    }

    if (siteData.profile) {
        setText('profileNameDisplay', siteData.profile.name);
        setText('profileRoleDisplay', siteData.profile.role);
        setText('profileStatusDisplay', siteData.profile.status);
        setText('profileQuoteDisplay', `"${siteData.profile.quote}"`);
        setText('profileBioDisplay', siteData.profile.bio);

        const avatarImg = document.getElementById('profileAvatarImg');
        if (avatarImg && siteData.profile.avatar) {
            avatarImg.src = siteData.profile.avatar;
            avatarImg.addEventListener('error', function handleAvatarErr() {
                avatarImg.removeEventListener('error', handleAvatarErr);
                avatarImg.src = createAvatarFallbackSvg(siteData.profile.name);
            });
        }

        const skillsContainer = document.getElementById('skillsContainer');
        if (skillsContainer && siteData.profile.skills) {
            skillsContainer.innerHTML = siteData.profile.skills
                .map(skill => `<span class="skill-chip">${escapeHtml(skill)}</span>`)
                .join('');
        }

        const contactBtn = document.getElementById('contactEmailBtn');
        if (contactBtn && siteData.profile.contactEmail) {
            contactBtn.onclick = () => copyContactEmail(siteData.profile.contactEmail);
        }
    }

    renderEssays();
    renderMusicSection();
}

/**
 * Mengisi daftar foto simulasi kamera dari kategori fotografi
 */
function initCameraPhotosList() {
    if (!siteData || !siteData.artworks) return;

    cameraPhotoItems = siteData.artworks.filter(item => item.category === 'photo');
    if (cameraPhotoItems.length > 0) {
        updateViewfinderPhoto(0);
    }
}

function updateViewfinderPhoto(index) {
    const item = cameraPhotoItems[index];
    const imgEl = document.getElementById('viewfinderImg');
    if (!item || !imgEl) return;

    const fallbackUri = createFallbackSvg(item.title, item.categoryLabel, item.accentText);
    imgEl.onerror = function() {
        imgEl.onerror = null;
        imgEl.src = fallbackUri;
    };
    imgEl.src = item.src;
    imgEl.alt = item.title;

    setText('hudPhotoTitleDisplay', item.title);
    setText('hudPhotoCount', `[FOTO: #${String(index + 1).padStart(2, '0')}]`);
}

/**
 * 2. Render Katalog & Logika Pemisahan "Semua" (Interaktif) vs Kategori Gambar
 */
function renderCatalog() {
    if (!siteData || !siteData.artworks) return;

    const atelierEl = document.getElementById('interactiveAtelier');
    const gridEl = document.getElementById('catalogGrid');
    if (!gridEl) return;

    // Hitung jumlah karya per kategori & perbarui di semua elemen UI
    const counts = {
        all: siteData.artworks.length,
        design: siteData.artworks.filter(a => a.category === 'design').length,
        sketch: siteData.artworks.filter(a => a.category === 'sketch').length,
        photo: siteData.artworks.filter(a => a.category === 'photo').length
    };

    setText('totalCount', counts.all);
    setText('countAll', counts.all);
    setText('countDesign', counts.design);
    setText('countSketch', counts.sketch);
    setText('countPhoto', counts.photo);
    setText('portalCountDesign', counts.design);
    setText('portalCountSketch', counts.sketch);
    setText('portalCountPhoto', counts.photo);

    // Bagian "Semua" HANYA menampilkan instrumen interaktif (tanpa grid gambar)
    if (currentFilter === 'all') {
        if (atelierEl) atelierEl.style.display = 'block';
        gridEl.style.display = 'none';
        gridEl.innerHTML = '';
        setText('activeFilterLabel', 'Mode Interaktif: Atelier & Studio Re-Light (Tanpa Gambar)');
        return;
    }

    // Kategori Gambar: sembunyikan atelier, tampilkan galeri foto
    if (atelierEl) atelierEl.style.display = 'none';
    gridEl.style.display = 'grid';
    gridEl.innerHTML = '';

    visibleArtworks = siteData.artworks.filter(item => item.category === currentFilter);

    visibleArtworks.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'art-card interactive-sheen';
        card.style.setProperty('--stagger', String(index));
        card.onclick = () => openArtModal(index);

        const visualWrap = document.createElement('div');
        visualWrap.className = `card-visual ${item.aspect || 'square'}`;

        const img = document.createElement('img');
        img.className = 'card-img';
        img.src = item.src;
        img.alt = item.title;
        img.loading = 'lazy';

        const fallbackUri = createFallbackSvg(item.title, item.categoryLabel, item.accentText);
        img.addEventListener('error', function handleImgError() {
            img.removeEventListener('error', handleImgError);
            img.src = fallbackUri;
        });

        visualWrap.appendChild(img);

        const infoWrap = document.createElement('div');
        infoWrap.className = 'card-info';
        infoWrap.innerHTML = `
            <div>
                <div class="card-header-line">
                    <span class="card-category-badge">${escapeHtml(item.categoryLabel)}</span>
                    <span>№ ${String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
                <p class="card-caption">${escapeHtml(item.caption)}</p>
            </div>
            <div class="card-footer">
                <span>${escapeHtml(item.tools)}</span>
                <span class="inspect-cue">Lihat Detail <i data-lucide="arrow-up-right" size="13"></i></span>
            </div>
        `;

        card.appendChild(visualWrap);
        card.appendChild(infoWrap);
        gridEl.appendChild(card);
    });

    safeCreateIcons();
}

/**
 * 3. Filter Katalog Berdasarkan Kategori
 */
function filterCatalog(category, buttonEl) {
    if (!siteData) siteData = loadAllCategorizedData();
    currentFilter = category;

    // Update status aktif pada pill toolbar
    document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
    if (buttonEl && buttonEl.classList.contains('filter-pill')) {
        buttonEl.classList.add('active');
    } else {
        const targetPill = document.querySelector(`.filter-pill[data-category="${category}"]`);
        if (targetPill) targetPill.classList.add('active');
    }

    // Update status aktif pada navbar atas
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const targetNav = document.querySelector(`.nav-btn[data-category="${category}"]`);
    if (targetNav) targetNav.classList.add('active');

    // Label penjelasan filter
    const countCategory = siteData.artworks.filter(a => a.category === category).length;
    const labelMap = {
        'all': 'Mode Interaktif: Atelier & Studio Re-Light (Tanpa Gambar)',
        'design': `Menampilkan Kategori Digital Design (${countCategory} Karya)`,
        'sketch': `Menampilkan Kategori Sketsa Lepas (${countCategory} Karya)`,
        'photo': `Menampilkan Kategori Fotografi (${countCategory} Karya)`
    };
    setText('activeFilterLabel', labelMap[category] || 'Arsip Karya');

    renderCatalog();

    // Pastikan jika berpindah dari bawah (seperti tombol di About) langsung menggulir rapi ke galeri
    const anchor = (category === 'all')
        ? document.getElementById('interactiveAtelier')
        : document.getElementById('catalogGrid');

    if (anchor) {
        const rect = anchor.getBoundingClientRect();
        if (rect.top < 40 || rect.top > window.innerHeight * 0.75) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

/**
 * ==============================================================================
 * 4. MODUL INTERAKTIF 1: DIGITAL SKETCHPAD (KANVAS CORETAN BEBAS)
 * ==============================================================================
 */
function initSketchCanvas() {
    const canvas = document.getElementById('sketchCanvas');
    if (!canvas) return;

    sketchCtx = canvas.getContext('2d');
    resizeSketchCanvas(false);
    saveSketchHistory();

    // Event Mouse Desktop
    canvas.addEventListener('mousedown', (e) => startDrawing(getCanvasPos(canvas, e)));
    canvas.addEventListener('mousemove', (e) => draw(getCanvasPos(canvas, e)));
    window.addEventListener('mouseup', stopDrawing);

    // Event Touch Mobile / Tablet
    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            e.preventDefault();
            startDrawing(getCanvasPos(canvas, e.touches[0]));
        }
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            e.preventDefault();
            draw(getCanvasPos(canvas, e.touches[0]));
        }
    }, { passive: false });

    window.addEventListener('touchend', stopDrawing);

    // Preserving canvas artwork when viewport resizes
    let resizeTimeout = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => resizeSketchCanvas(true), 150);
    });
}

function resizeSketchCanvas(preserveContent) {
    const canvas = document.getElementById('sketchCanvas');
    if (!canvas || !sketchCtx) return;

    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(rect.width) || 560;
    const targetH = Math.round(rect.height) || 350;

    if (canvas.width === targetW && canvas.height === targetH) return;

    let snapshot = null;
    if (preserveContent && canvas.width > 0 && canvas.height > 0) {
        snapshot = document.createElement('canvas');
        snapshot.width = canvas.width;
        snapshot.height = canvas.height;
        snapshot.getContext('2d').drawImage(canvas, 0, 0);
    }

    canvas.width = targetW;
    canvas.height = targetH;

    if (snapshot) {
        sketchCtx.drawImage(snapshot, 0, 0, targetW, targetH);
    }
}

function getCanvasPos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

function startDrawing(pos) {
    isDrawing = true;

    const wrap = document.querySelector('.sketch-canvas-wrap');
    if (wrap && !wrap.classList.contains('has-drawn')) {
        wrap.classList.add('has-drawn');
    }

    applyBrushSettings();
    sketchCtx.beginPath();
    sketchCtx.moveTo(pos.x, pos.y);
    // Menggambar titik langsung saat klik/ketuk tunggal
    sketchCtx.lineTo(pos.x + 0.01, pos.y + 0.01);
    sketchCtx.stroke();
}

function draw(pos) {
    if (!isDrawing) return;
    sketchCtx.lineTo(pos.x, pos.y);
    sketchCtx.stroke();
}

function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    sketchCtx.closePath();
    saveSketchHistory();
}

function applyBrushSettings() {
    sketchCtx.lineCap = 'round';
    sketchCtx.lineJoin = 'round';

    if (currentTool === 'pencil') {
        sketchCtx.globalCompositeOperation = 'source-over';
        sketchCtx.strokeStyle = currentStrokeColor;
        sketchCtx.lineWidth = currentBrushSize;
        sketchCtx.shadowBlur = 0;
    } else if (currentTool === 'glow') {
        sketchCtx.globalCompositeOperation = 'source-over';
        sketchCtx.strokeStyle = currentStrokeColor;
        sketchCtx.lineWidth = currentBrushSize + 2;
        sketchCtx.shadowBlur = 14;
        sketchCtx.shadowColor = currentStrokeColor;
    } else if (currentTool === 'eraser') {
        sketchCtx.globalCompositeOperation = 'destination-out';
        sketchCtx.strokeStyle = 'rgba(0,0,0,1)';
        sketchCtx.lineWidth = Math.max(16, currentBrushSize * 3);
        sketchCtx.shadowBlur = 0;
    }
}

function saveSketchHistory() {
    const canvas = document.getElementById('sketchCanvas');
    if (!canvas || !sketchCtx) return;
    try {
        const snapshot = sketchCtx.getImageData(0, 0, canvas.width, canvas.height);
        sketchHistory.push(snapshot);
        if (sketchHistory.length > MAX_SKETCH_HISTORY) {
            sketchHistory.shift();
        }
    } catch (e) {
        // Ignore security/memory edge cases
    }
}

function undoSketchCanvas() {
    const canvas = document.getElementById('sketchCanvas');
    if (!canvas || !sketchCtx || sketchHistory.length <= 1) {
        showToast('Tidak ada coretan lagi untuk di-undo.');
        return;
    }
    sketchHistory.pop();
    const prev = sketchHistory[sketchHistory.length - 1];
    if (prev) {
        sketchCtx.globalCompositeOperation = 'source-over';
        sketchCtx.putImageData(prev, 0, 0);
        showToast('Coretan terakhir diurungkan!');
    }
}

function setSketchTool(tool, btnEl) {
    currentTool = tool;
    ['toolPencil', 'toolGlow', 'toolEraser'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
    if (btnEl) btnEl.classList.add('active');
}

function setBrushSize(size, btnEl) {
    currentBrushSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
}

function setSketchColor(hex, dotEl) {
    currentStrokeColor = hex;
    if (currentTool === 'eraser') {
        setSketchTool('pencil', document.getElementById('toolPencil'));
    }
    document.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('active'));
    if (dotEl) dotEl.classList.add('active');
}

function clearSketchCanvas() {
    const canvas = document.getElementById('sketchCanvas');
    if (!canvas || !sketchCtx) return;
    sketchCtx.globalCompositeOperation = 'source-over';
    sketchCtx.clearRect(0, 0, canvas.width, canvas.height);
    saveSketchHistory();

    const wrap = document.querySelector('.sketch-canvas-wrap');
    if (wrap) wrap.classList.remove('has-drawn');

    showToast('Kanvas dibersihkan!');
}

function downloadSketchCanvas() {
    const canvas = document.getElementById('sketchCanvas');
    if (!canvas) return;

    // Gabungkan gambar dengan latar gelap buku sketsa agar PNG hasilnya indah
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const exportCtx = exportCanvas.getContext('2d');

    exportCtx.fillStyle = '#08090b';
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    exportCtx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.download = `sketsa-relight-${Date.now()}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Sketsa Anda berhasil diunduh!');
}

/**
 * ==============================================================================
 * 5. MODUL INTERAKTIF 2: SIMULASI KAMERA & SHUTTER ANALOG 35MM
 * ==============================================================================
 */
function setCameraAperture(label, blurFilter, btnEl) {
    const hud = document.getElementById('hudApertureDisplay');
    const imgEl = document.getElementById('viewfinderImg');

    const labelText = label === 'f/8' ? 'f/8 TAJAM' : (label === 'f/1.8' ? 'f/1.8 BOKEH' : 'f/2.8 STANDAR');
    if (hud) hud.innerText = `[${labelText}]`;

    if (imgEl) {
        imgEl.style.filter = blurFilter;
        imgEl.style.transform = blurFilter === 'none' ? 'scale(1)' : 'scale(1.06)';
    }

    if (btnEl) {
        btnEl.parentElement.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        btnEl.classList.add('active');
    }
}

function cycleCameraLensFilter(btnEl) {
    currentLensFilterIndex = (currentLensFilterIndex + 1) % cameraLensFilters.length;
    const mode = cameraLensFilters[currentLensFilterIndex];
    const imgEl = document.getElementById('viewfinderImg');
    const hudFilter = document.getElementById('hudLensFilterDisplay');

    if (imgEl) {
        imgEl.classList.remove('film-mono', 'film-warm');
        if (mode.className) imgEl.classList.add(mode.className);
    }

    if (hudFilter) {
        hudFilter.innerText = `[${mode.label}]`;
    }

    if (btnEl) {
        btnEl.classList.toggle('active', currentLensFilterIndex !== 0);
    }

    showToast(`Mode Lensa: ${mode.label}`);
}

function triggerCameraShutter() {
    if (cameraPhotoItems.length === 0) return;

    playMechanicalShutterSound();

    // Motion Graphic: Fokus AF & Tirai Rana Mekanik menutup sekejap
    const topCurtain = document.getElementById('shutterCurtainTop');
    const bottomCurtain = document.getElementById('shutterCurtainBottom');
    const crosshair = document.getElementById('viewfinderCrosshair');
    const flash = document.getElementById('cameraFlash');

    if (crosshair) crosshair.classList.add('focus-pulse');
    if (topCurtain) topCurtain.classList.add('closed');
    if (bottomCurtain) bottomCurtain.classList.add('closed');

    setTimeout(() => {
        if (flash) flash.classList.add('flash');

        // Ganti foto tepat saat rana tertutup
        photoIndex = (photoIndex + 1) % cameraPhotoItems.length;
        updateViewfinderPhoto(photoIndex);

        if (topCurtain) topCurtain.classList.remove('closed');
        if (bottomCurtain) bottomCurtain.classList.remove('closed');

        setTimeout(() => {
            if (flash) flash.classList.remove('flash');
            if (crosshair) crosshair.classList.remove('focus-pulse');
        }, 100);
    }, 90);

    const nextItem = cameraPhotoItems[(photoIndex + 1) % cameraPhotoItems.length];
    showToast(`Cekrek! Membidik "${nextItem ? nextItem.title : 'Foto'}"`);
}

function openCurrentViewfinderPhoto() {
    if (cameraPhotoItems.length === 0) return;
    visibleArtworks = [...cameraPhotoItems];
    openArtModal(photoIndex);
}

/**
 * Sintesis Suara Rana Kamera Mekanik menggunakan Web Audio API (100% Offline)
 */
function playMechanicalShutterSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        if (!shutterAudioCtx) {
            shutterAudioCtx = new AudioContext();
        }

        if (shutterAudioCtx.state === 'suspended') {
            shutterAudioCtx.resume();
        }

        const now = shutterAudioCtx.currentTime;
        playClickPulse(now, 1250, 0.025);
        playClickPulse(now + 0.07, 820, 0.042);
    } catch (e) {
        // Fallback hening jika audio diblokir browser
    }
}

function playClickPulse(time, freq, duration) {
    const osc = shutterAudioCtx.createOscillator();
    const gain = shutterAudioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(120, time + duration);

    gain.gain.setValueAtTime(0.28, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(shutterAudioCtx.destination);

    osc.start(time);
    osc.stop(time + duration);
}

/**
 * ==============================================================================
 * 6. MODUL INTERAKTIF 3: LABORATORIUM SUHU PENCAHAYAAN KELVIN
 * ==============================================================================
 */
function updateKelvinSlider(val) {
    const kelvin = parseInt(val, 10);
    const display = document.getElementById('kelvinValueDisplay');
    const ambient = document.getElementById('ambientLight');

    let desc = "Tungsten Warm";
    let colorRgb = "242, 154, 82";

    if (kelvin < 2600) {
        desc = "Lilin Pijar Hangat";
        colorRgb = "245, 115, 40";
    } else if (kelvin < 3600) {
        desc = "Tungsten Warm";
        colorRgb = "242, 154, 82";
    } else if (kelvin < 4800) {
        desc = "Netral Studio";
        colorRgb = "232, 218, 190";
    } else if (kelvin < 6200) {
        desc = "Daylight Siang";
        colorRgb = "190, 220, 245";
    } else {
        desc = "Langit Senja Biru";
        colorRgb = "90, 160, 240";
    }

    if (display) {
        display.innerText = `${kelvin}K (${desc})`;
    }

    // Setel langsung pada document.body.style agar menimpa body[data-lighting]
    document.body.style.setProperty('--accent-warm', `rgb(${colorRgb})`);
    document.body.style.setProperty('--accent-glow', `rgba(${colorRgb}, 0.28)`);
    particleRgb = colorRgb;

    if (ambient) {
        ambient.style.background = `radial-gradient(ellipse at 50% 30%, rgba(${colorRgb}, 0.34) 0%, transparent 65%)`;
    }
}

function updateBeamSlider(val) {
    const percent = parseInt(val, 10);
    const display = document.getElementById('beamValueDisplay');
    const ambient = document.getElementById('ambientLight');

    let label = "Sedang";
    if (percent < 35) label = "Sempit (Spotlight)";
    else if (percent > 75) label = "Penuh (Floodlight)";

    if (display) {
        display.innerText = `${percent}% (${label})`;
    }

    if (ambient) {
        ambient.style.width = `${500 + percent * 8}px`;
        ambient.style.opacity = (0.3 + (percent / 100) * 0.5).toFixed(2);
    }
}

/**
 * ==============================================================================
 * 7. RENDER CATATAN & ESAI (WRITING)
 * ==============================================================================
 */
function renderEssays() {
    if (!siteData || !siteData.essays) return;

    const container = document.getElementById('essayGridContainer');
    if (!container) return;

    container.innerHTML = '';

    siteData.essays.forEach((essay, idx) => {
        const article = document.createElement('article');
        article.className = 'essay-card interactive-sheen';
        article.onclick = () => openEssayModal(essay.title, essay.content);

        article.innerHTML = `
            <div>
                <div class="essay-card-header">
                    <span class="essay-index">${escapeHtml(essay.number || `ESAI № 0${idx + 1}`)}</span>
                    <span>${escapeHtml(essay.readTime || '3 MIN')}</span>
                </div>
                <h3 class="essay-title">${escapeHtml(essay.title)}</h3>
                <p class="essay-snippet">${escapeHtml(essay.snippet)}</p>
            </div>
            <div class="essay-footer">
                <span>${escapeHtml(essay.topic || 'REFLEKSI')}</span>
                <span class="read-action">Baca Selengkapnya <i data-lucide="arrow-right" size="14"></i></span>
            </div>
        `;

        container.appendChild(article);
    });
}

/**
 * ==============================================================================
 * 8. RENDER REPOSITORI MUSIK SPOTIFY
 * ==============================================================================
 */
function toSpotifyEmbedUrl(url) {
    if (!url || typeof url !== 'string') return '';
    if (url.includes('/embed/')) return url;

    const match = url.match(/open\.spotify\.com\/(track|playlist|album|artist|episode|show)\/([a-zA-Z0-9]+)/);
    if (match) {
        return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
    }
    return url;
}

function isDirectSpotifyPlayable(url) {
    return typeof url === 'string' && /open\.spotify\.com\/(embed\/)?(track|playlist|album|episode|show)\/[a-zA-Z0-9]+/.test(url);
}

function loadTrackIntoSpotifyPlayer(title, url) {
    const embedUrl = toSpotifyEmbedUrl(url);
    const iframe = document.getElementById('spotifyIframe');
    const titleEl = document.getElementById('spotifyPlayerTitle');
    const extLink = document.getElementById('spotifyExternalLink');

    if (iframe && embedUrl) iframe.src = embedUrl;
    if (titleEl && title) titleEl.innerText = title;
    if (extLink && url) extLink.href = url;

    showToast(`Memuat "${title}" ke pemutar Spotify!`);
}

function renderMusicSection() {
    if (!siteData || !siteData.music) return;
    const m = siteData.music;

    if (m.header) {
        setText('musicMetaBadge', m.header.badgeKecil || "Repositori Audio & Gelombang Suara");
        setText('musicSectionTitle', m.header.judul || "Soundtrack Ruang Kreatif");
        setText('musicSectionDesc', m.header.deskripsi || "");
    }

    if (m.player) {
        setText('spotifyPlayerTitle', m.player.judul || "Re-Light: Darkroom Focus");

        const iframe = document.getElementById('spotifyIframe');
        const resolvedEmbed = toSpotifyEmbedUrl(m.player.embedUrl || m.player.tautanSpotify);
        if (iframe && resolvedEmbed) {
            iframe.src = resolvedEmbed;
        }

        const extLink = document.getElementById('spotifyExternalLink');
        if (extLink && m.player.tautanSpotify) {
            extLink.href = m.player.tautanSpotify;
        }
    }

    const container = document.getElementById('musicRepoListContainer');
    if (!container || !m.tracks) return;

    container.innerHTML = '';
    m.tracks.forEach((track) => {
        const card = document.createElement('div');
        card.className = 'music-track-card interactive-sheen';

        const canLoadInPlayer = isDirectSpotifyPlayable(track.tautanSpotify);
        const loadButtonHtml = canLoadInPlayer
            ? `<button type="button" class="track-preview-btn" data-title="${escapeHtml(track.judul)}" data-url="${escapeHtml(track.tautanSpotify)}">
                   <i data-lucide="disc" size="14"></i> Muat di Player
               </button>`
            : '';

        card.innerHTML = `
            <div class="track-top-meta">
                <span class="track-index">${escapeHtml(track.nomor || 'TRACK')}</span>
                <span class="track-mood-badge">${escapeHtml(track.moodTag || 'SPOTIFY')}</span>
            </div>
            <div class="track-main-info">
                <div>
                    <h4 class="track-title">${escapeHtml(track.judul)}</h4>
                    <span class="track-artist">${escapeHtml(track.artis)} • ${escapeHtml(track.kategoriKarya || '')}</span>
                </div>
                <span class="track-duration">${escapeHtml(track.durasi || '')}</span>
            </div>
            <p class="track-curator-note">${escapeHtml(track.catatanKurator || '')}</p>
            <div class="track-footer-action">
                <span>Kurasi Raifan</span>
                <div class="track-actions-group">
                    ${loadButtonHtml}
                    <a href="${escapeHtml(track.tautanSpotify || 'https://open.spotify.com')}" target="_blank" rel="noopener noreferrer" class="track-play-link">
                        Putar di Spotify <i data-lucide="play-circle" size="14" style="color: #1db954;"></i>
                    </a>
                </div>
            </div>
        `;

        const previewBtn = card.querySelector('.track-preview-btn');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => {
                loadTrackIntoSpotifyPlayer(track.judul, track.tautanSpotify);
            });
        }

        container.appendChild(card);
    });

    safeCreateIcons();
}

/**
 * ==============================================================================
 * 9. LIGHTBOX MODAL (PREVIEW DETAIL FOTO)
 * ==============================================================================
 */
function openArtModal(index) {
    currentModalIndex = index;
    updateModalContent();
    const modal = document.getElementById('artModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function updateModalContent() {
    const item = visibleArtworks[currentModalIndex];
    if (!item) return;

    const modalImg = document.getElementById('modalImgDisplay');
    const fallbackUri = createFallbackSvg(item.title, item.categoryLabel, item.accentText);

    if (modalImg) {
        modalImg.onerror = function() {
            modalImg.onerror = null;
            modalImg.src = fallbackUri;
        };
        modalImg.src = item.src;
    }

    setText('modalTitleDisplay', item.title);
    setText('modalCategoryBadge', item.categoryLabel);
    setText('modalDescDisplay', item.desc);
    setText('modalMetaIndex', `№ ${String(currentModalIndex + 1).padStart(2, '0')} / ${visibleArtworks.length}`);
    setText('modalMetaTool', item.tools);
    setText('modalCounter', `${currentModalIndex + 1} / ${visibleArtworks.length}`);

    safeCreateIcons();
}

function navigateModal(direction) {
    if (visibleArtworks.length === 0) return;
    currentModalIndex = (currentModalIndex + direction + visibleArtworks.length) % visibleArtworks.length;
    updateModalContent();
}

function closeArtModal() {
    const modal = document.getElementById('artModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * ==============================================================================
 * 10. READING MODAL (ESAI LENGKAP)
 * ==============================================================================
 */
function openEssayModal(title, content) {
    setText('essayModalTitle', title);
    const paragraphs = content.split('\n\n').map(p => `<p>${escapeHtml(p)}</p>`).join('');
    const bodyEl = document.getElementById('essayModalBody');
    if (bodyEl) bodyEl.innerHTML = paragraphs;

    const modal = document.getElementById('essayModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    safeCreateIcons();
}

function closeEssayModal() {
    const modal = document.getElementById('essayModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * ==============================================================================
 * 11. PENGATUR TEMA & NAVIGASI
 * ==============================================================================
 */
function setLighting(theme, btnEl) {
    // Hapus override inline dari slider Kelvin agar tema preset langsung aktif
    document.body.style.removeProperty('--accent-warm');
    document.body.style.removeProperty('--accent-glow');

    const ambient = document.getElementById('ambientLight');
    if (ambient) {
        ambient.style.removeProperty('background');
        ambient.style.removeProperty('width');
        ambient.style.removeProperty('opacity');
    }

    document.body.setAttribute('data-lighting', theme);
    document.querySelectorAll('.light-option').forEach(b => b.classList.remove('active'));
    if (btnEl) {
        btnEl.classList.add('active');
    } else {
        const targetBtn = document.querySelector(`.light-option[data-theme="${theme}"]`);
        if (targetBtn) targetBtn.classList.add('active');
    }

    // Sinkronkan warna partikel background & tampilan slider Kelvin
    const presetMap = {
        tungsten: { kelvin: 3200, label: '3200K (Tungsten Warm)', rgb: '242, 154, 82' },
        studio: { kelvin: 4500, label: '4500K (Netral Studio)', rgb: '232, 228, 220' },
        noir: { kelvin: 5800, label: '5800K (Monokrom Noir)', rgb: '194, 189, 178' }
    };
    const preset = presetMap[theme] || presetMap.tungsten;
    particleRgb = preset.rgb;

    const kSlider = document.getElementById('kelvinSlider');
    const bSlider = document.getElementById('beamSlider');
    if (kSlider) kSlider.value = preset.kelvin;
    if (bSlider) bSlider.value = 65;
    setText('kelvinValueDisplay', preset.label);
    setText('beamValueDisplay', '65% (Sedang)');
}

function scrollToSection(sectionId, btnEl) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (btnEl) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        btnEl.classList.add('active');
    }
}

function initEventListeners() {
    window.addEventListener('click', (e) => {
        if (e.target.id === 'artModal') closeArtModal();
        if (e.target.id === 'essayModal') closeEssayModal();
    });

    window.addEventListener('keydown', (e) => {
        const artModalActive = document.getElementById('artModal')?.classList.contains('active');
        const essayModalActive = document.getElementById('essayModal')?.classList.contains('active');

        if (e.key === 'Escape') {
            if (artModalActive) closeArtModal();
            if (essayModalActive) closeEssayModal();
        }

        if (artModalActive) {
            if (e.key === 'ArrowLeft') navigateModal(-1);
            if (e.key === 'ArrowRight') navigateModal(1);
        }

        // Ctrl+Z untuk undo cepat di kanvas sketsa ketika modal tidak terbuka
        if (!artModalActive && !essayModalActive && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
            if (currentFilter === 'all') {
                e.preventDefault();
                undoSketchCanvas();
            }
        }
    });
}

/**
 * ==============================================================================
 * 12. MOTION GRAPHICS ENGINE (SCROLL CHOREOGRAPHY, PARTIKEL CAHAYA, SHEEN)
 * ==============================================================================
 */
function initScrollEffects() {
    // 1. Garis Progres Tinta Scroll di Puncak Layar
    const progressBar = document.getElementById('scrollProgressBar');
    let scrollTicking = false;

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                if (progressBar) {
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const pct = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;
                    progressBar.style.width = `${pct}%`;
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // 2. Scroll Reveal Choreography menggunakan IntersectionObserver
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }
}

function initCardMotionEffects() {
    // Efek kilau cahaya tungsten yang mengikuti posisi kursor
    document.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.interactive-sheen');
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
    }, { passive: true });
}

function initMotionParticleCanvas() {
    const canvas = document.getElementById('motionBgCanvas');
    if (!canvas) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const pointer = { x: width * 0.5, y: height * 0.3, active: false };
    window.addEventListener('mousemove', (e) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.active = true;
    }, { passive: true });

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    // Buat partikel debu cahaya ruang gelap (darkroom light motes)
    const particleCount = Math.min(46, Math.max(20, Math.floor(width / 32)));
    const motes = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.1 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.32 + 0.08),
        alpha: Math.random() * 0.45 + 0.12,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.018 + 0.008
    }));

    function animate() {
        if (!document.hidden) {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < motes.length; i++) {
                const m = motes[i];
                m.phase += m.speed;
                m.x += m.vx + Math.sin(m.phase) * 0.12;
                m.y += m.vy;

                // Interaksi lembut dengan kursor (mote terdorong perlahan)
                if (pointer.active) {
                    const dx = m.x - pointer.x;
                    const dy = m.y - pointer.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < 18000 && distSq > 1) {
                        const force = (1 - distSq / 18000) * 0.45;
                        m.x += (dx / Math.sqrt(distSq)) * force;
                        m.y += (dy / Math.sqrt(distSq)) * force;
                    }
                }

                // Wrap around screen edges
                if (m.y < -10) {
                    m.y = height + 10;
                    m.x = Math.random() * width;
                }
                if (m.x < -10) m.x = width + 10;
                if (m.x > width + 10) m.x = -10;

                const twinkle = m.alpha * (0.65 + 0.35 * Math.sin(m.phase * 1.4));
                ctx.beginPath();
                ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${particleRgb}, ${twinkle.toFixed(3)})`;
                ctx.fill();

                // Tambah halo pendaran halus untuk partikel lebih besar
                if (m.r > 1.8) {
                    ctx.beginPath();
                    ctx.arc(m.x, m.y, m.r * 3.2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${particleRgb}, ${(twinkle * 0.14).toFixed(3)})`;
                    ctx.fill();
                }
            }
        }

        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
}

/**
 * ==============================================================================
 * 13. UTILITAS
 * ==============================================================================
 */
function copyContactEmail(email) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(email).then(() => {
            showToast(`Alamat email (${email}) disalin ke clipboard!`);
        }).catch(() => {
            fallbackCopyEmail(email);
        });
    } else {
        fallbackCopyEmail(email);
    }
}

function fallbackCopyEmail(email) {
    try {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Alamat email (${email}) disalin ke clipboard!`);
    } catch (e) {
        showToast(`Kontak email: ${email}`);
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (toast && toastMsg) {
        toastMsg.innerText = msg;
        toast.classList.add('show');
        clearTimeout(window.__toastTimer);
        window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
    }
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined) {
        el.innerText = text;
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function encodeSvgText(str) {
    return encodeURIComponent(escapeHtml(str)).replace(/'/g, '%27');
}

function createFallbackSvg(title, categoryLabel, accentText) {
    const encodedTitle = encodeSvgText(title || 'Karya');
    const encodedCategory = encodeSvgText((categoryLabel || 'ARSIP').toUpperCase());
    const encodedAccent = encodeSvgText(accentText || 'RE-LIGHT');

    return `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22450%22 viewBox=%220 0 600 450%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 stop-color=%22%2317181d%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%230e0f13%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22600%22 height=%22450%22 fill=%22url(%23g)%22/%3E%3Crect x=%2220%22 y=%2220%22 width=%22560%22 height=%22410%22 fill=%22none%22 stroke=%22rgba(240,235,225,0.08)%22 stroke-width=%221.5%22 stroke-dasharray=%226 6%22/%3E%3Ctext x=%2250%22 y=%2282%22 fill=%22%23e38d4a%22 font-family=%22cursive, sans-serif%22 font-size=%2215%22 letter-spacing=%222%22%3E${encodedCategory} %E2%84%96 ARSIP%3C/text%3E%3Ctext x=%2250%22 y=%22215%22 fill=%22%23f6f1e7%22 font-family=%22cursive, serif%22 font-size=%2238%22 font-style=%22italic%22%3E${encodedTitle}%3C/text%3E%3Ctext x=%2250%22 y=%22252%22 fill=%22%23959085%22 font-family=%22cursive, sans-serif%22 font-size=%2217%22%3EKoleksi Visual Raifan%3C/text%3E%3Ctext x=%22545%22 y=%22400%22 text-anchor=%22end%22 fill=%22rgba(255,255,255,0.08)%22 font-family=%22cursive, monospace%22 font-size=%2236%22 font-weight=%22bold%22%3E${encodedAccent}%3C/text%3E%3C/svg%3E`;
}

function createAvatarFallbackSvg(name) {
    return `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22 viewBox=%220 0 400 400%22%3E%3Crect fill=%22%23141519%22 width=%22400%22 height=%22400%22/%3E%3Ccircle cx=%22200%22 cy=%22160%22 r=%2270%22 fill=%22%232a2c35%22/%3E%3Cpath d=%22M90 340 C90 260 150 240 200 240 C250 240 310 260 310 340 Z%22 fill=%22%232a2c35%22/%3E%3Ctext x=%2250%25%22 y=%22375%22 text-anchor=%22middle%22 fill=%22%23e38d4a%22 font-family=%22cursive, sans-serif%22 font-size=%2218%22%3E${encodeSvgText(name || 'RAIFAN')}%3C/text%3E%3C/svg%3E`;
}
