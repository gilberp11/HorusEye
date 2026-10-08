/**
 * HORUSEYE // MASTER CONTROLLER (v5.2 BULLETPROOF)
 * Features:
 * - 100% Guaranteed immediate halo rendering with zero exceptions
 * - Total Page Bilingual Translation Engine (Header, Halos, Modales & Full Footer Bio)
 * - Restored vibrant cyberpunk-Egyptian colors (Cyan, Magenta, Gold, Lime, Purple)
 * - Click-to-enter interactive portal chamber on any halo
 * - Procedural Ancient Egyptian Ambient BGM with clear audio state
 * - Papyrus unroll transition to Osiris AI
 */

// Application State
let portalTargets = (typeof window.HORUS_DATABASE !== 'undefined' ? window.HORUS_DATABASE : (typeof HORUS_DATABASE !== 'undefined' ? HORUS_DATABASE : []));
let activeCategory = "ALL";
let currentLanguage = "en"; // English by default
let favoriteIds = JSON.parse(localStorage.getItem("horuseye_favs") || "[]");

// Osiris AI Target Link
const OSIRIS_URL = "https://osirisai.live/?layers=maritime,satellites,cctv,cctv_previews,live_news,earthquakes,global_incidents,day_night,cables,sdk_sea,sdk_air,sdk_naval";

// Load user-injected custom portals from localStorage
try {
  const storedCustomNodes = JSON.parse(localStorage.getItem("horuseye_custom_nodes") || "[]");
  if (storedCustomNodes.length > 0) {
    portalTargets.push(...storedCustomNodes);
  }
} catch (e) {}

// Complete Full-Page Bilingual Translation Dictionary
const TRANSLATIONS = {
  en: {
    brandSub: "OMNI-PORTAL OF 50 RABBIT HOLES // CYBER-ARCHIVE",
    telemetrySanctuary: "Web Sanctuary",
    telemetryLive: "SYSTEM LIVE",
    telemetryConnected: "Connected Portals",
    telemetryFrequency: "Visual Frequency",
    telemetryHalos: "HALOS ACTIVE",
    btnRoulette: "🎲 ASTRAL WARP",
    btnCustom: "+ ADD NODE",
    btnBgmOn: "𓏢 BGM ON",
    btnBgmOff: "𓏢 BGM MUTE",
    btnLang: "𓏛 EN",
    btnOsiris: "𓁀 OSIRIS AI",
    searchPlaceholder: "Awaken a portal: search satellites, cosmos, history, rare books, maps, telemetry or art...",
    bannerTitle: "HALOS OF VISION // PORTAL MATRIX",
    bannerTotal: "50 PORTALS // OMNI-VISION",
    favCategory: "Sacred Treasures",
    allCategory: "All Portals",
    emptyTitle: "No Portal Answers These Coordinates",
    emptyDesc: "Try alternate search queries or awaken another celestial realm.",
    modalOpenFull: "⚡ OPEN FULLSCREEN",
    modalTipLabel: "Exploration Secret",
    modalSecTitle: "Secured Origin Portal",
    modalSecDesc: "This realm enforces strict browser origin protection. You can explore it with unhindered fidelity in an isolated warp window.",
    modalSecBtn: "🚀 ENTER EXTERNAL REALM",
    modalForceBtn: "🔄 ATTEMPT FORCED EMBED",
    papyrusTitle: "THE SANCTUARY OF OSIRIS",
    papyrusDesc: "You stand at the threshold of Osiris AI: real-time global telemetry featuring maritime armadas, satellites, live CCTV previews, seismic rifts, and naval intelligence.",
    papyrusCta: "𓁀 ENTER OSIRIS INTELLIGENCE",
    customModalTitle: "INSCRIBE NEW PORTAL",
    customNameLabel: "Portal Name",
    customUrlLabel: "URL Link (https://)",
    customCatLabel: "Category",
    customDescLabel: "Rabbit Hole Lore",
    customTipLabel: "Secret Exploration Clue",
    customTagsLabel: "Tags (comma separated)",
    customSubmit: "✦ AWAKEN PORTAL INTO THE MATRIX",
    // Footer translations
    footerCreatorBadge: "𓂀 CREATOR & TECHNOLOGICAL VISION",
    footerCreatorTitle: "Creative Tech Design // Cybersecurity // Graphic Design with AI Agents",
    footerCreatorBio: "Architect exploring the convergence of advanced cybersecurity, autonomous AI agent workflows, and high-impact visual design. HorusEye transforms the deepest rabbit holes of the global web into an intuitive, sacred command station accessible to every curious mind.",
    footerVisionTitle: "𓋹 OPEN SOURCE INITIATIVE & LIVING EVOLUTION",
    footerVisionP1: "This project is 100% open source and cleanly decoupled into modular scripts so engineers, design enthusiasts, and cybersecurity students can fork, replicate, and expand it.",
    footerVisionP2: "Periodically updated with new open-source intelligence (OSINT) feeds, legendary rabbit holes, and audiovisual experiments. Contributions and pull requests are welcomed.",
    footerBadgeLicense: "✦ MIT LICENSE",
    footerBadgeTech: "✦ VANILLA ES6+",
    footerBadgeAudio: "✦ WEB AUDIO API",
    footerBadgeCredits: "✦ CRAFTED WITH ANTIGRAVITY & GILBER PAULINO",
    footerCopyright: "© HorusEye // Conceived & Designed by Gilber Paulino with Antigravity. Kemet Experience // Free for Humanity."
  },
  es: {
    brandSub: "OMNI-PORTAL DE 50 AGUJEROS DE CONEJO // CIBER-ARCHIVO",
    telemetrySanctuary: "Santuario Web",
    telemetryLive: "SISTEMA EN VIVO",
    telemetryConnected: "Portales Conectados",
    telemetryFrequency: "Frecuencia Visual",
    telemetryHalos: "HALOS ACTIVOS",
    btnRoulette: "🎲 SALTO ASTRAL",
    btnCustom: "+ AÑADIR NODO",
    btnBgmOn: "𓏢 MÚSICA ON",
    btnBgmOff: "𓏢 MÚSICA OFF",
    btnLang: "𓏛 ES",
    btnOsiris: "𓁀 OSIRIS AI",
    searchPlaceholder: "Despierta un portal: busca satélites, cosmos, historia, libros raros, mapas o arte...",
    bannerTitle: "HALOS DE VISIÓN // MATRIZ DE PORTALES",
    bannerTotal: "50 PORTALES // VISIÓN TOTAL",
    favCategory: "Tesoros Guardados",
    allCategory: "Todos los Portales",
    emptyTitle: "Ningún Portal Responde a Estas Coordenadas",
    emptyDesc: "Prueba con otros términos de búsqueda o selecciona otra categoría sagrada.",
    modalOpenFull: "⚡ ABRIR EN VENTANA COMPLETA",
    modalTipLabel: "Consejo de Exploración",
    modalSecTitle: "Portal de Alta Seguridad",
    modalSecDesc: "Este sitio web opera con estrictos protocolos de seguridad de origen. Puedes acceder con máxima fidelidad en una ventana aislada.",
    modalSecBtn: "🚀 ENTRAR AL PORTAL EXTERNO",
    modalForceBtn: "🔄 INTENTAR FORZAR EMBED",
    papyrusTitle: "EL SANTUARIO DE OSIRIS",
    papyrusDesc: "Te encuentras ante el umbral de Osiris AI: telemetría global en vivo con capas marítimas, satélites, cámaras CCTV, sismos e inteligencia naval.",
    papyrusCta: "𓁀 INGRESAR A OSIRIS AI",
    customModalTitle: "INCORPORAR NUEVO PORTAL",
    customNameLabel: "Nombre del Portal",
    customUrlLabel: "Enlace URL (https://)",
    customCatLabel: "Categoría",
    customDescLabel: "Descripción del Agujero de Conejo",
    customTipLabel: "Consejo o Secreto a Descubrir",
    customTagsLabel: "Etiquetas (separadas por coma)",
    customSubmit: "✦ DESPERTAR PORTAL EN LA RED",
    // Footer translations
    footerCreatorBadge: "𓂀 CREADOR & VISIÓN TECNOLÓGICA",
    footerCreatorTitle: "Creative Tech Design // Ciberseguridad // Diseño Gráfico con Agentes IA",
    footerCreatorBio: "Explorador de la intersección entre ciberseguridad avanzada, arquitectura de agentes de inteligencia artificial y diseño visual hipertecnológico. HorusEye nace de la visión de convertir los rincones más profundos y asombrosos de internet en una estación de mando intuitiva, hipnótica y al alcance de cualquier curioso.",
    footerVisionTitle: "𓋹 PROYECTO OPEN SOURCE & EVOLUCIÓN VIVA",
    footerVisionP1: "Este proyecto es 100% código abierto y está estructurado en módulos para que desarrolladores, entusiastas del diseño y curiosos de la ciberseguridad puedan clonarlo, aprender de su arquitectura y expandirlo.",
    footerVisionP2: "Se actualizará periódicamente con nuevos agujeros de conejo, herramientas de inteligencia de fuentes abiertas (OSINT) y experimentos visuales. ¡Cualquiera es bienvenido a abrir un Pull Request en GitHub o sugerir nuevos portales!",
    footerBadgeLicense: "✦ LICENCIA MIT",
    footerBadgeTech: "✦ VANILLA JS ES6+",
    footerBadgeAudio: "✦ WEB AUDIO API",
    footerBadgeCredits: "✦ HECHO CON ANTIGRAVITY & GILBER PAULINO",
    footerCopyright: "© HorusEye // Concebido y Diseñado por Gilber Paulino con Antigravity. Experiencia Kemet // Libre para la Humanidad."
  }
};

// Safe element getters
const getEl = id => document.getElementById(id);

/**
 * Filter Categories Setup
 */
function setupCategoryPills() {
  const categoryPillList = getEl('categoryPillList');
  if (!categoryPillList) return;

  const t = TRANSLATIONS[currentLanguage];
  const isEn = currentLanguage === 'en';

  const categories = [
    { id: "ALL", name: t.allCategory, hiero: "𓁹" },
    { id: "FAVORITES", name: t.favCategory, hiero: "𓋹" },
    { id: isEn ? "Satellite & Weather" : "Satelital & Clima", name: isEn ? "Satellite & Weather" : "Satelital & Clima", hiero: "🛰️" },
    { id: isEn ? "Network & Grid" : "Red & Infraestructura", name: isEn ? "Network & Grid" : "Red & Infraestructura", hiero: "🌐" },
    { id: isEn ? "Cartography & Realms" : "Cartografía & Exploración", name: isEn ? "Cartography & Realms" : "Cartografía & Exploración", hiero: "🗺️" },
    { id: isEn ? "Cosmos & Science" : "Cosmos & Ciencia", name: isEn ? "Cosmos & Science" : "Cosmos & Ciencia", hiero: "🚀" },
    { id: isEn ? "Data & Telemetry" : "Datos & Telemetría", name: isEn ? "Data & Telemetry" : "Datos & Telemetría", hiero: "📊" },
    { id: isEn ? "Archives & Vaults" : "Archivos & Bibliotecas", name: isEn ? "Archives & Vaults" : "Archivos & Bibliotecas", hiero: "🏛️" },
    { id: isEn ? "Art, Culture & Audio" : "Arte, Cultura & Audio", name: isEn ? "Art, Culture & Audio" : "Arte, Cultura & Audio", hiero: "🎨" }
  ];

  categoryPillList.innerHTML = '';
  categories.forEach(cat => {
    let count = 0;
    if (cat.id === "ALL") {
      count = portalTargets.length;
    } else if (cat.id === "FAVORITES") {
      count = favoriteIds.length;
    } else {
      count = portalTargets.filter(p => (isEn ? p.category_en : p.category_es) === cat.id).length;
    }

    const btn = document.createElement('button');
    btn.className = `cat-filter-halo ${activeCategory === cat.id ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="cat-hiero">${cat.hiero}</span>
      <span class="cat-text">${cat.name}</span>
      <span class="cat-badge">${count}</span>
    `;

    btn.addEventListener('mouseenter', () => {
      if (window.HorusAudio && window.HorusAudio.playHoverTick) window.HorusAudio.playHoverTick();
    });

    btn.addEventListener('click', () => {
      if (window.HorusAudio && window.HorusAudio.playChime) window.HorusAudio.playChime(587);
      activeCategory = cat.id;
      setupCategoryPills();
      renderHalos();
    });

    categoryPillList.appendChild(btn);
  });
}

/**
 * Filter logic
 */
function getFilteredPortals() {
  const searchInput = getEl('searchInput');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const isEn = currentLanguage === 'en';

  return portalTargets.filter(item => {
    const itemCat = isEn ? item.category_en : item.category_es;

    if (activeCategory === "FAVORITES") {
      if (!favoriteIds.includes(item.id)) return false;
    } else if (activeCategory !== "ALL") {
      if (itemCat !== activeCategory) return false;
    }

    if (query) {
      const matchTitle = (item.title || '').toLowerCase().includes(query);
      const matchDesc = (isEn ? item.desc_en : item.desc_es || '').toLowerCase().includes(query);
      const matchUrl = (item.url || '').toLowerCase().includes(query);
      const matchCat = (itemCat || '').toLowerCase().includes(query);
      const matchTags = item.tags && item.tags.some(tag => tag.toLowerCase().includes(query));
      return matchTitle || matchDesc || matchUrl || matchCat || matchTags;
    }

    return true;
  });
}

/**
 * Render the Halos of Vision
 * Always rendered with high visibility, colorful neon halos and click-to-open!
 */
function renderHalos() {
  const halosGrid = getEl('halosGrid');
  if (!halosGrid) return;

  const filtered = getFilteredPortals();
  const t = TRANSLATIONS[currentLanguage];
  const isEn = currentLanguage === 'en';

  const totalPortalsCountEl = getEl('totalPortalsCount');
  if (totalPortalsCountEl) {
    totalPortalsCountEl.innerText = `${filtered.length} / ${portalTargets.length}`;
  }

  const activeCategoryTitle = getEl('activeCategoryTitle');
  if (activeCategoryTitle) {
    if (activeCategory === 'ALL') activeCategoryTitle.innerText = t.bannerTotal;
    else if (activeCategory === 'FAVORITES') activeCategoryTitle.innerText = `${t.favCategory.toUpperCase()} (${favoriteIds.length})`;
    else activeCategoryTitle.innerText = activeCategory.toUpperCase();
  }

  if (filtered.length === 0) {
    halosGrid.innerHTML = `
      <div class="empty-halos-portal">
        <div class="empty-hiero-glyph">𓁿</div>
        <h3>${t.emptyTitle}</h3>
        <p>${t.emptyDesc}</p>
      </div>
    `;
    return;
  }

  halosGrid.innerHTML = filtered.map(item => {
    const isFav = favoriteIds.includes(item.id);
    const domain = (item.url || '').replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const cleanId = String(item.id).padStart(2, '0');
    const categoryName = isEn ? item.category_en : item.category_es;
    const accentColor = item.color || "#00f0ff";

    return `
      <div class="vision-halo-card" data-id="${item.id}" style="--portal-accent: ${accentColor};" onclick="openPortalView(${item.id})">
        <!-- Floating Halo Orb -->
        <div class="halo-portal-orb">
          <!-- Animated Celestial Orbit Rings -->
          <div class="halo-orbit-ring ring-outer"></div>
          <div class="halo-orbit-ring ring-inner"></div>
          <div class="halo-compass-marks">
            <span class="mark mark-n">𓇳</span>
            <span class="mark mark-s">𓋹</span>
            <span class="mark mark-e">𓊽</span>
            <span class="mark mark-w">𓏛</span>
          </div>

          <!-- Central Core Viewport -->
          <div class="halo-core-viewport">
            <img src="${item.bgImage}" alt="${item.title}" class="halo-preview-backdrop" loading="lazy">
            <div class="halo-core-overlay"></div>
            
            <!-- Sacred Hieroglyph -->
            <div class="halo-dormant-state">
              <span class="halo-glyph-symbol">${item.hieroglyph || '𓁹'}</span>
              <span class="halo-glyph-label">${item.glyphName || 'Portal'}</span>
            </div>
          </div>

          <!-- Portal ID Pill -->
          <div class="halo-id-pill">
            <span class="h-dot"></span> #${cleanId}
          </div>

          <!-- Favorite Toggle -->
          <button class="halo-fav-toggle ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${item.id})" title="Favorite">
            ${isFav ? '★' : '☆'}
          </button>
        </div>

        <!-- Typography Block -->
        <div class="halo-identity-block">
          <h2 class="halo-title">${item.title}</h2>
          <div class="halo-subline">
            <span class="halo-cat-tag">${item.categoryIcon || '✦'} ${categoryName}</span>
            <span class="halo-domain">${domain}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  attachHaloAudioEvents();
}

function attachHaloAudioEvents() {
  const cards = document.querySelectorAll('.vision-halo-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (window.HorusAudio && window.HorusAudio.playHoverTick) window.HorusAudio.playHoverTick();
    });
  });
}

function triggerWarpSound() {
  if (window.HorusAudio && window.HorusAudio.playWarp) window.HorusAudio.playWarp();
}

/**
 * Toggle Favorite Portal
 */
window.toggleFavorite = function(id) {
  if (window.HorusAudio && window.HorusAudio.playChime) window.HorusAudio.playChime(640);
  if (favoriteIds.includes(id)) {
    favoriteIds = favoriteIds.filter(fId => fId !== id);
  } else {
    favoriteIds.push(id);
  }
  localStorage.setItem("horuseye_favs", JSON.stringify(favoriteIds));
  setupCategoryPills();
  renderHalos();
};

/**
 * Open Modal Preview with High-Fidelity Fallback Guard
 */
window.openPortalView = function(id) {
  const portal = portalTargets.find(p => p.id === id);
  if (!portal) return;

  const isEn = currentLanguage === 'en';
  const categoryName = isEn ? portal.category_en : portal.category_es;
  const desc = isEn ? portal.desc_en : portal.desc_es;
  const tip = isEn ? portal.deepTip_en : portal.deepTip_es;
  const t = TRANSLATIONS[currentLanguage];

  if (window.HorusAudio && window.HorusAudio.playChime) window.HorusAudio.playChime(780);

  const modalNodeId = getEl('modalNodeId');
  const modalTitle = getEl('modalTitle');
  const modalCategory = getEl('modalCategory');
  const modalGlyph = getEl('modalGlyph');
  const modalExternalLink = getEl('modalExternalLink');
  const modalHoloTitle = getEl('modalHoloTitle');
  const modalHoloDesc = getEl('modalHoloDesc');
  const modalHoloTip = getEl('modalHoloTip');
  const modalHoloLaunch = getEl('modalHoloLaunch');
  const modalForceEmbedBtn = getEl('modalForceEmbedBtn');
  const modalHologramFallback = getEl('modalHologramFallback');
  const modalIframe = getEl('modalIframe');
  const portalModal = getEl('portalModal');

  if (modalNodeId) modalNodeId.innerText = `#${String(portal.id).padStart(2, '0')}`;
  if (modalTitle) modalTitle.innerText = portal.title;
  if (modalCategory) modalCategory.innerText = `${portal.categoryIcon || '✦'} ${(categoryName || '').toUpperCase()} // ${portal.url.replace(/^https?:\/\//, '')}`;
  if (modalGlyph) modalGlyph.innerText = portal.hieroglyph || '𓁹';

  if (modalExternalLink) {
    modalExternalLink.href = portal.url;
    modalExternalLink.innerText = t.modalOpenFull;
    modalExternalLink.onclick = () => triggerWarpSound();
  }

  if (modalHoloTitle) modalHoloTitle.innerText = portal.title;
  if (modalHoloDesc) modalHoloDesc.innerText = desc;
  if (modalHoloTip) modalHoloTip.innerText = `💡 ${t.modalTipLabel}: ${tip}`;
  
  if (modalHoloLaunch) {
    modalHoloLaunch.href = portal.url;
    modalHoloLaunch.innerText = t.modalSecBtn;
    modalHoloLaunch.onclick = () => triggerWarpSound();
  }
  if (modalForceEmbedBtn) modalForceEmbedBtn.innerText = t.modalForceBtn;

  // Direct Live Iframe vs Hologram Fallback
  if (portal.embedType === 'direct') {
    if (modalHologramFallback) modalHologramFallback.style.display = 'none';
    if (modalIframe) {
      modalIframe.style.display = 'block';
      modalIframe.src = portal.url;
    }
  } else {
    if (modalIframe) {
      modalIframe.style.display = 'none';
      modalIframe.src = 'about:blank';
    }
    if (modalHologramFallback) modalHologramFallback.style.display = 'flex';
  }

  if (modalForceEmbedBtn) {
    modalForceEmbedBtn.onclick = () => {
      if (window.HorusAudio && window.HorusAudio.playChime) window.HorusAudio.playChime(500);
      if (modalHologramFallback) modalHologramFallback.style.display = 'none';
      if (modalIframe) {
        modalIframe.style.display = 'block';
        modalIframe.src = portal.url;
      }
    };
  }

  if (portalModal) portalModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  if (window.HorusAudio && window.HorusAudio.playHoverTick) window.HorusAudio.playHoverTick();
  const portalModal = getEl('portalModal');
  const modalIframe = getEl('modalIframe');
  if (portalModal) portalModal.classList.remove('active');
  if (modalIframe) modalIframe.src = 'about:blank';
  document.body.style.overflow = 'auto';
}

/**
 * Event Listeners Registration
 */
function registerEvents() {
  const modalCloseBtn = getEl('modalCloseBtn');
  const portalModal = getEl('portalModal');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (portalModal) {
    portalModal.addEventListener('click', (e) => {
      if (e.target === portalModal) closeModal();
    });
  }

  // Astral Roulette
  const rouletteBtn = getEl('rouletteBtn');
  if (rouletteBtn) {
    rouletteBtn.addEventListener('click', () => {
      triggerWarpSound();
      if (portalTargets.length > 0) {
        const randomIndex = Math.floor(Math.random() * portalTargets.length);
        const chosen = portalTargets[randomIndex];
        openPortalView(chosen.id);
      }
    });
  }

  // Osiris Papyrus Scroll
  const osirisPortalBtn = getEl('osirisPortalBtn');
  const papyrusOverlay = getEl('papyrusOverlay');
  const closePapyrusBtn = getEl('closePapyrusBtn');
  const papyrusCtaLink = getEl('papyrusCtaLink');

  if (osirisPortalBtn && papyrusOverlay) {
    osirisPortalBtn.addEventListener('click', () => {
      if (window.HorusAudio && window.HorusAudio.playPapyrusUnroll) window.HorusAudio.playPapyrusUnroll();
      papyrusOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closePapyrusBtn && papyrusOverlay) {
    closePapyrusBtn.addEventListener('click', () => {
      papyrusOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (papyrusOverlay) {
    papyrusOverlay.addEventListener('click', (e) => {
      if (e.target === papyrusOverlay) {
        papyrusOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (papyrusCtaLink) {
    papyrusCtaLink.addEventListener('click', () => {
      triggerWarpSound();
    });
  }

  // Ambient Egyptian BGM
  const bgmBtn = getEl('bgmBtn');
  if (bgmBtn) {
    bgmBtn.addEventListener('click', () => {
      if (!window.HorusAudio) return;
      const isPlaying = window.HorusAudio.toggleBGM();
      bgmBtn.classList.toggle('muted', !isPlaying);
      const t = TRANSLATIONS[currentLanguage];
      bgmBtn.innerHTML = `<span class="btn-icon">𓏢</span> ${isPlaying ? t.btnBgmOn : t.btnBgmOff}`;
    });
  }

  // Language Switcher
  const langToggleBtn = getEl('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
      if (window.HorusAudio && window.HorusAudio.playChime) window.HorusAudio.playChime(660);
      applyLanguageUpdates();
      setupCategoryPills();
      renderHalos();
    });
  }

  // Search input
  const searchInput = getEl('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderHalos();
    });
  }

  // Custom node modal
  const customNodeBtn = getEl('customNodeBtn');
  const customModal = getEl('customModal');
  const closeCustomModal = getEl('closeCustomModal');
  const customForm = getEl('customForm');

  if (customNodeBtn && customModal) {
    customNodeBtn.addEventListener('click', () => {
      if (window.HorusAudio && window.HorusAudio.playChime) window.HorusAudio.playChime(520);
      customModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeCustomModal && customModal) {
    closeCustomModal.addEventListener('click', () => {
      customModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (customModal) {
    customModal.addEventListener('click', (e) => {
      if (e.target === customModal) {
        customModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (customForm) {
    customForm.addEventListener('submit', (e) => {
      e.preventDefault();
      triggerWarpSound();

      const name = (getEl('customName') || {}).value || '';
      const url = (getEl('customUrl') || {}).value || '';
      const cat = (getEl('customCat') || {}).value || 'Cosmos & Science';
      const desc = (getEl('customDesc') || {}).value || '';
      const tip = (getEl('customTip') || {}).value || '';
      const rawTags = (getEl('customTags') || {}).value || '';
      const tags = rawTags ? rawTags.split(',').map(t => t.trim().toLowerCase()) : ["custom", "portal"];

      const newPortal = {
        id: portalTargets.length + 1,
        title: name,
        url: url,
        category_en: cat,
        category_es: cat,
        categoryIcon: "✦",
        desc_en: desc,
        desc_es: desc,
        deepTip_en: tip || "Custom portal inscribed by explorer.",
        deepTip_es: tip || "Portal añadido por el explorador.",
        tags: tags,
        color: "#00f0ff",
        embedType: "direct",
        hieroglyph: "𓁹",
        glyphName: "Newly Inscribed Portal",
        bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
      };

      portalTargets.push(newPortal);
      try {
        const stored = JSON.parse(localStorage.getItem("horuseye_custom_nodes") || "[]");
        stored.push(newPortal);
        localStorage.setItem("horuseye_custom_nodes", JSON.stringify(stored));
      } catch (err) {}

      customForm.reset();
      if (customModal) customModal.classList.remove('active');
      document.body.style.overflow = 'auto';

      setupCategoryPills();
      renderHalos();
    });
  }

  // Keyboard shortcut (Escape closes modals)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      if (papyrusOverlay) papyrusOverlay.classList.remove('active');
      if (customModal) customModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Auto-resume audio on first user touch / click
  document.addEventListener('click', () => {
    if (window.HorusAudio && window.HorusAudio.ensureContext) {
      window.HorusAudio.ensureContext();
    }
  }, { once: true });
}

/**
 * Apply Full Page Bilingual Updates (Guaranteed against null references)
 */
function applyLanguageUpdates() {
  const t = TRANSLATIONS[currentLanguage];

  const update = (id, prop, val) => {
    const el = getEl(id);
    if (el) el[prop] = val;
  };

  update('langToggleBtn', 'innerHTML', `<span class="lang-hiero">𓏛</span> ${currentLanguage.toUpperCase()}`);
  update('brandSubtext', 'innerText', t.brandSub);
  update('telemetrySanctuaryLabel', 'innerText', t.telemetrySanctuary);
  update('telemetrySanctuaryVal', 'innerHTML', `<span class="pulse-dot"></span>${t.telemetryLive}`);
  update('telemetryConnectedLabel', 'innerText', t.telemetryConnected);
  update('telemetryFrequencyLabel', 'innerText', t.telemetryFrequency);
  update('telemetryFrequencyVal', 'innerText', t.telemetryHalos);

  update('rouletteBtn', 'innerHTML', t.btnRoulette);
  update('customNodeBtn', 'innerHTML', t.btnCustom);
  update('osirisPortalBtn', 'innerHTML', `<span class="btn-icon">𓁀</span> ${t.btnOsiris}`);

  const isBgmPlaying = window.HorusAudio ? window.HorusAudio.bgmEnabled : false;
  update('bgmBtn', 'innerHTML', `<span class="btn-icon">𓏢</span> ${isBgmPlaying ? t.btnBgmOn : t.btnBgmOff}`);

  const searchInput = getEl('searchInput');
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;
  update('bannerMainTitle', 'innerText', t.bannerTitle);

  // Papyrus Overlay
  update('papyrusTitleEl', 'innerText', t.papyrusTitle);
  update('papyrusDescEl', 'innerText', t.papyrusDesc);
  update('papyrusCtaLink', 'innerText', t.papyrusCta);

  // Custom Form Modal
  update('customModalHeading', 'innerText', t.customModalTitle);
  update('lblCustomName', 'innerText', t.customNameLabel);
  update('lblCustomUrl', 'innerText', t.customUrlLabel);
  update('lblCustomCat', 'innerText', t.customCatLabel);
  update('lblCustomDesc', 'innerText', t.customDescLabel);
  update('lblCustomTip', 'innerText', t.customTipLabel);
  update('lblCustomTags', 'innerText', t.customTagsLabel);
  update('btnCustomSubmit', 'innerText', t.customSubmit);

  // Footer Sanctuary
  update('footerCreatorBadge', 'innerText', t.footerCreatorBadge);
  update('footerCreatorTitle', 'innerText', t.footerCreatorTitle);
  update('footerCreatorBio', 'innerText', t.footerCreatorBio);
  update('footerVisionTitle', 'innerText', t.footerVisionTitle);
  update('footerVisionP1', 'innerText', t.footerVisionP1);
  update('footerVisionP2', 'innerText', t.footerVisionP2);
  update('badgeLicense', 'innerText', t.footerBadgeLicense);
  update('badgeTech', 'innerText', t.footerBadgeTech);
  update('badgeAudio', 'innerText', t.footerBadgeAudio);
  update('badgeCredits', 'innerText', t.footerBadgeCredits);
  update('footerCopyright', 'innerText', t.footerCopyright);
}

// Master Initialization
function initializeHorusEye() {
  try { registerEvents(); } catch (e) { console.error("Event register error:", e); }
  try { applyLanguageUpdates(); } catch (e) { console.error("Lang error:", e); }
  try { setupCategoryPills(); } catch (e) { console.error("Pills error:", e); }
  try { renderHalos(); } catch (e) { console.error("Halos render error:", e); }
}

// Guaranteed launch
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeHorusEye);
} else {
  initializeHorusEye();
}
