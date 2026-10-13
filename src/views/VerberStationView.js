import { getTranslation } from '../utils/i18n.js';

/**
 * VerberStationView - Didaktisk vrimlebillede for Scene 1: Banegården / Rejsen
 * Dækker 33 højfrekvente verber (bevægelse, rejse, transport, transaktioner).
 */
export function renderVerberStationView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container verber-vrimmel-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('top100_verber');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // TTS Audio Helper (ONLY used for målordet in Tab 1)
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .verber-vrimmel-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .verber-hero-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .verber-hero-header h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #ef4444, #f97316, #fbbf24);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .verber-hero-header p {
            color: #94a3b8;
            font-size: 1.1rem;
            max-width: 780px;
            margin: 0 auto;
            line-height: 1.5;
        }

        /* Tabs Navigation */
        .verber-tabs {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 2rem;
            background: rgba(30, 41, 59, 0.7);
            padding: 0.5rem;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .verber-tab-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 0.7rem 1.2rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .verber-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.06);
        }
        .verber-tab-btn.active {
            background: #ef4444;
            color: white;
            box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
        }

        /* Panels */
        .verber-panel {
            display: none;
        }
        .verber-panel.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Vrimmel Card & Hotspots */
        .vrimmel-card {
            background: #1e293b;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .radar-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.9rem 1.4rem;
            background: #0f172a;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .pure-image-toggle-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #e2e8f0;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .pure-image-toggle-btn:hover {
            background: rgba(255, 255, 255, 0.15);
            color: white;
        }
        .pure-image-toggle-btn.active {
            background: #ef4444;
            border-color: #ef4444;
            color: white;
        }

        .vrimmel-stage {
            position: relative;
            width: 100%;
            user-select: none;
            overflow: hidden;
        }
        .vrimmel-stage img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
        }
        .vrimmel-stage.pure-mode .vrimmel-hotspot {
            display: none !important;
        }

        /* Hotspot Dot (Red for Verbs) */
        .vrimmel-hotspot {
            position: absolute;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 800;
            transition: all 0.2s ease;
            z-index: 10;
            background: rgba(239, 68, 68, 0.9);
            color: white;
            border: 2px solid white;
            box-shadow: 0 0 12px rgba(239, 68, 68, 0.8);
            animation: pulseRed 1.8s infinite;
        }
        .vrimmel-hotspot:hover, .vrimmel-hotspot.active {
            transform: translate(-50%, -50%) scale(1.3);
            background: #dc2626;
            box-shadow: 0 0 20px rgba(239, 68, 68, 1);
            z-index: 20;
        }
        @keyframes pulseRed {
            0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 8px rgba(239, 68, 68, 0.7); }
            50% { transform: translate(-50%, -50%) scale(1.2); box-shadow: 0 0 18px rgba(239, 68, 68, 1); }
        }

        /* Detail card */
        .hotspot-detail-card {
            background: #1e293b;
            border: 1px solid #475569;
            border-radius: 16px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.5rem;
            flex-wrap: wrap;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .badge-verbum {
            background: rgba(239, 68, 68, 0.2);
            color: #f87171;
            border: 1px solid #ef4444;
            padding: 0.35rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            display: inline-block;
            margin-bottom: 0.5rem;
        }
        .detail-main-word { font-size: 1.7rem; font-weight: 800; color: white; margin-bottom: 0.3rem; }
        .detail-forms { font-size: 1.05rem; color: #cbd5e1; margin-bottom: 0.5rem; }
        .detail-sentence { font-size: 1.05rem; color: #e2e8f0; font-style: italic; }
        .listen-word-btn {
            background: #ef4444;
            color: white;
            border: none;
            padding: 0.8rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .listen-word-btn:hover { background: #dc2626; transform: scale(1.05); }

        /* Detective Mission */
        .mission-card {
            max-width: 800px;
            margin: 0 auto;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
        }
        .mission-badge {
            display: inline-block;
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid #ef4444;
            color: #f87171;
            font-size: 0.85rem;
            font-weight: 800;
            padding: 0.35rem 0.9rem;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.8rem;
        }
        .mission-clue-box {
            background: #0f172a;
            border: 1px solid #334155;
            padding: 1.2rem;
            border-radius: 14px;
            margin: 1.5rem 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: #f8fafc;
        }
        .mission-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1.5rem;
        }
        .mission-opt-btn {
            background: #0f172a;
            border: 2px solid #334155;
            color: white;
            padding: 1rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .mission-opt-btn:hover {
            border-color: #ef4444;
            transform: translateY(-2px);
        }
        .mission-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .mission-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
        }
        .mission-next-btn {
            background: #ef4444;
            color: white;
            border: none;
            padding: 0.8rem 1.6rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            margin-top: 1.5rem;
            transition: all 0.2s ease;
        }
        .mission-next-btn:hover {
            background: #dc2626;
        }

        /* Story */
        .story-container {
            max-width: 800px;
            margin: 0 auto;
        }
        .story-nav-pills {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .story-nav-btn {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #cbd5e1;
            padding: 0.6rem 1.2rem;
            border-radius: 20px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .story-nav-btn.active {
            background: #ef4444;
            color: white;
            border-color: #ef4444;
        }
        .story-step-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1.3rem;
            margin-bottom: 1rem;
            transition: all 0.3s ease;
        }
        .story-step-card.active-step {
            border-color: #ef4444;
            box-shadow: 0 4px 18px rgba(239, 68, 68, 0.15);
        }
        .story-options-row {
            display: flex;
            gap: 0.6rem;
            flex-wrap: wrap;
            margin-top: 0.8rem;
        }
        .story-opt-btn {
            background: #0f172a;
            border: 1px solid #475569;
            color: white;
            padding: 0.7rem 1.2rem;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .story-opt-btn:hover { border-color: #ef4444; }
        .story-opt-btn.correct { background: rgba(34, 197, 94, 0.25); border-color: #22c55e; color: #4ade80; }
        .story-opt-btn.wrong { background: rgba(239, 68, 68, 0.25); border-color: #ef4444; color: #f87171; }
        .story-explanation-box {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 16px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            text-align: center;
        }

        /* Synonyms & Antonyms */
        .synonym-card {
            max-width: 800px;
            margin: 0 auto;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
        }
        .synonym-type-badge {
            display: inline-block;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 1rem;
        }
        .badge-type-synonym {
            background: rgba(56, 189, 248, 0.2);
            color: #38bdf8;
            border: 1px solid #0284c7;
        }
        .badge-type-antonym {
            background: rgba(249, 115, 22, 0.2);
            color: #fb923c;
            border: 1px solid #ea580c;
        }
        .synonym-target-word {
            font-size: 2.2rem;
            font-weight: 800;
            color: white;
            margin: 0.5rem 0 1rem;
        }
        .synonym-target-word span {
            color: #ef4444;
        }

        /* Sentence Builder */
        .sentence-builder-card {
            max-width: 850px;
            margin: 0 auto;
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
        }
        .builder-slots-row {
            display: flex;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: #0f172a;
            border-radius: 14px;
            border: 1px dashed rgba(255, 255, 255, 0.2);
            min-height: 70px;
            align-items: center;
        }
        .builder-slot-box {
            padding: 0.7rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 1.05rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.2rem;
        }
        .slot-subjekt { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid #22c55e; }
        .slot-verbum { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; }
        .slot-objekt { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid #22c55e; }
        .slot-adverbial { background: rgba(2, 132, 199, 0.2); color: #60a5fa; border: 1px solid #0284c7; }
        .slot-role-tag {
            font-size: 0.72rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            opacity: 0.85;
            margin-bottom: 0.2rem;
        }
        .grammar-legend-bar {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.2rem;
            margin-bottom: 1.4rem;
            padding: 0.6rem 1rem;
            background: rgba(15, 23, 42, 0.7);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 0.85rem;
        }
        .grammar-legend-item { display: flex; align-items: center; gap: 0.4rem; }
        .legend-chip { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
        .chip-substantiv { background: #22c55e; }
        .chip-verbum { background: #ef4444; }
        .chip-sted { background: #0284c7; }

        .words-selection-tray { margin-bottom: 1.5rem; }
        .tray-group-title { font-size: 0.95rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.6rem; }
        .tray-chips-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .tray-chip-btn {
            background: #1e293b;
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: white;
            padding: 0.6rem 1.1rem;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .tray-chip-btn:hover { background: #ef4444; }
        .live-sentence-preview {
            background: #0f172a;
            border: 1px solid #334155;
            padding: 1.2rem;
            border-radius: 14px;
            font-size: 1.2rem;
            color: #f8fafc;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const heroHeader = document.createElement('div');
    heroHeader.className = 'verber-hero-header';
    heroHeader.innerHTML = `
        <h1>${getTranslation('top100_verber_scene1_title')}</h1>
        <p>${getTranslation('top100_verber_scene1_desc')}</p>
    `;
    viewContainer.appendChild(heroHeader);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'verber-tabs';
    const tabs = [
        { id: 'tab_vrimmel', label: '1. Vrimlebillede', icon: '🔍' },
        { id: 'tab_detektiv', label: '2. Detektiv', icon: '🕵️' },
        { id: 'tab_historie', label: '3. Historie', icon: '💭' },
        { id: 'tab_synonym_antonym', label: '4. Synonymer & Antonymer', icon: '🔄' },
        { id: 'tab_saetning', label: '5. Sætningsbygger', icon: '✍️' }
    ];

    let currentTab = 'tab_vrimmel';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `verber-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.innerHTML = `<span>${t.icon}</span> ${t.label}`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        tabsMenu.querySelectorAll('.verber-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.verber-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- 33 VERBER PÅ BANEGÅRDEN (Scene 1)
    // ========================================================
    const stationVerber = [
        { word: 'at være', nutid: 'er', x: 52, y: 35, sentence: 'Toget er på perron 2.' },
        { word: 'at have', nutid: 'har', x: 35, y: 72, sentence: 'Manden har en kuffert.' },
        { word: 'at kunne', nutid: 'kan', x: 82, y: 65, sentence: 'Han kan nå toget.' },
        { word: 'at skulle', nutid: 'skal', x: 60, y: 60, sentence: 'Passagererne skal rejse til Odense.' },
        { word: 'at ville', nutid: 'vil', x: 22, y: 68, sentence: 'Kvinden vil købe en kaffe.' },
        { word: 'at blive', nutid: 'bliver', x: 70, y: 22, sentence: 'Toget bliver forsinket fem minutter.' },
        { word: 'at få', nutid: 'får', x: 18, y: 70, sentence: 'Hun får sin billet.' },
        { word: 'at komme', nutid: 'kommer', x: 88, y: 40, sentence: 'Toget kommer ind på sporet.' },
        { word: 'at gå', nutid: 'går', x: 48, y: 75, sentence: 'Folk går hurtigt mod udgangen.' },
        { word: 'at tage', nutid: 'tager', x: 75, y: 70, sentence: 'Han tager sin rygsæk på.' },
        { word: 'at lade', nutid: 'lader', x: 42, y: 65, sentence: 'Han lader døren stå åben.' },
        { word: 'at stå', nutid: 'står', x: 58, y: 55, sentence: 'Folk står og venter på perronen.' },
        { word: 'at give', nutid: 'giver', x: 15, y: 68, sentence: 'Ekspedienten giver kunden kaffen.' },
        { word: 'at køre', nutid: 'kører', x: 92, y: 30, sentence: 'Toget kører mod København.' },
        { word: 'at falde', nutid: 'falder', x: 65, y: 82, sentence: 'En avis falder ned på gulvet.' },
        { word: 'at gælde', nutid: 'gælder', x: 25, y: 50, sentence: 'Billetten gælder i to timer.' },
        { word: 'at betale', nutid: 'betaler', x: 12, y: 72, sentence: 'Kunden betaler med sit kort.' },
        { word: 'at købe', nutid: 'køber', x: 10, y: 65, sentence: 'Manden køber en billet i automaten.' },
        { word: 'at vente', nutid: 'venter', x: 62, y: 45, sentence: 'Kvinden venter på sin ven.' },
        { word: 'at hente', nutid: 'henter', x: 40, y: 80, sentence: 'Faren henter sin datter på stationen.' },
        { word: 'at bringe', nutid: 'bringer', x: 30, y: 75, sentence: 'Buddet bringer pakker ud.' },
        { word: 'at trække', nutid: 'trækker', x: 38, y: 70, sentence: 'Kvinden trækker en rullekuffert.' },
        { word: 'at mangle', nutid: 'mangler', x: 80, y: 78, sentence: 'Han mangler sit rejsekort.' },
        { word: 'at rejse', nutid: 'rejser', x: 55, y: 50, sentence: 'De rejser sammen til Jylland.' },
        { word: 'at flytte', nutid: 'flytter', x: 28, y: 85, sentence: 'Familien flytter til en ny by.' },
        { word: 'at virke', nutid: 'virker', x: 22, y: 45, sentence: 'Billetautomaten virker fint i dag.' },
        { word: 'at stoppe', nutid: 'stopper', x: 85, y: 35, sentence: 'Toget stopper ved perronen.' },
        { word: 'at vælge', nutid: 'vælger', x: 16, y: 58, sentence: 'Han vælger en plads ved vinduet.' },
        { word: 'at sælge', nutid: 'sælger', x: 8, y: 68, sentence: 'Kiosken sælger aviser og kaffe.' },
        { word: 'at ske', nutid: 'sker', x: 50, y: 25, sentence: 'Hvad sker der på storskærmen?' },
        { word: 'at følge', nutid: 'følger', x: 45, y: 68, sentence: 'Hunden følger efter sin ejer.' },
        { word: 'at begynde', nutid: 'begynder', x: 50, y: 15, sentence: 'Rejsen begynder nu.' },
        { word: 'at handle', nutid: 'handler', x: 5, y: 75, sentence: 'De handler i stationsbutikken.' }
    ];

    // ========================================================
    // --- 1. TAB: VRIMLEBILLEDE MED HOTSPOTS
    // ========================================================
    const vrimmelPanel = document.createElement('div');
    vrimmelPanel.className = 'verber-panel active';
    vrimmelPanel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'vrimmel-card';

    // Control bar
    const controlBar = document.createElement('div');
    controlBar.className = 'radar-control-bar';

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-image-toggle-btn';
    pureBtn.innerHTML = `<span>🖼️</span> Se rent billede: <strong id="pure-mode-status-station">FRA</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-station').textContent = pureModeActive ? 'TIL 🖼️' : 'FRA';
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/verber_station_vrimmel.jpg';
    img.alt = 'Banegården vrimlebillede';
    stage.appendChild(img);

    // Detail card container
    const detailCard = document.createElement('div');
    detailCard.className = 'hotspot-detail-card';
    detailCard.style.display = 'none';

    // Create hotspots
    stationVerber.forEach(item => {
        const dot = document.createElement('div');
        dot.className = 'vrimmel-hotspot';
        dot.style.left = `${item.x}%`;
        dot.style.top = `${item.y}%`;
        dot.textContent = '●';
        dot.title = `${item.word} (${item.nutid})`;

        dot.onclick = () => {
            stage.querySelectorAll('.vrimmel-hotspot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            // Show detail card
            detailCard.style.display = 'flex';
            detailCard.innerHTML = `
                <div>
                    <span class="badge-verbum">🔴 Verbum</span>
                    <div class="detail-main-word">${item.word}</div>
                    <div class="detail-forms">Nutid: <strong>${item.nutid}</strong></div>
                    <div class="detail-sentence">"${item.sentence}"</div>
                </div>
                <div>
                    <button class="listen-word-btn" id="listen-station-verb-btn">
                        <span>🔊</span> Hør målord
                    </button>
                </div>
            `;

            detailCard.querySelector('#listen-station-verb-btn').onclick = () => {
                speakDanish(`${item.word}. ${item.nutid}. ${item.sentence}`);
            };

            // Speak word on click in Tab 1
            speakDanish(item.word);
        };

        stage.appendChild(dot);
    });

    vrimmelCard.appendChild(stage);
    vrimmelPanel.appendChild(vrimmelCard);
    vrimmelPanel.appendChild(detailCard);
    panelsHolder.appendChild(vrimmelPanel);

    // ========================================================
    // --- 2. TAB: DETEKTIV (Find handlingen - INGEN TTS)
    // ========================================================
    const detektivPanel = document.createElement('div');
    detektivPanel.className = 'verber-panel';
    detektivPanel.dataset.panel = 'tab_detektiv';

    const stationMissions = [
        {
            title: "Mission 1 af 4",
            clue: "Find personen der trækker sin kuffert hen over perronen:",
            options: [
                { text: "at trække (trækker) 🧳", correct: true },
                { text: "at sove (sover) 🛌", correct: false },
                { text: "at spise (spiser) 🥪", correct: false }
            ]
        },
        {
            title: "Mission 2 af 4",
            clue: "Find kunden der betaler for kaffen og avisen i kiosken:",
            options: [
                { text: "at køre (kører) 🚗", correct: false },
                { text: "at betale (betaler) 💳", correct: true },
                { text: "at stoppe (stopper) 🛑", correct: false }
            ]
        },
        {
            title: "Mission 3 af 4",
            clue: "Find toget der ankommer og kører ind til perronen:",
            options: [
                { text: "at læse (læser) 📖", correct: false },
                { text: "at køre (kører) 🚆", correct: true },
                { text: "at skrive (skriver) ✍️", correct: false }
            ]
        },
        {
            title: "Mission 4 af 4",
            clue: "Find kvinden der står og venter på sin ven:",
            options: [
                { text: "at vente (venter) ⏳", correct: true },
                { text: "at flytte (flytter) 📦", correct: false },
                { text: "at svømme (svømmer) 🏊", correct: false }
            ]
        }
    ];

    let currStationMissionIdx = 0;
    const missionCard = document.createElement('div');
    missionCard.className = 'mission-card';

    function renderStationMission() {
        missionCard.innerHTML = '';
        const mission = stationMissions[currStationMissionIdx];

        const badge = document.createElement('div');
        badge.className = 'mission-badge';
        badge.textContent = mission.title;
        missionCard.appendChild(badge);

        const clueBox = document.createElement('div');
        clueBox.className = 'mission-clue-box';
        clueBox.textContent = mission.clue;
        missionCard.appendChild(clueBox);

        const grid = document.createElement('div');
        grid.className = 'mission-options-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.style.marginTop = '1.5rem';

        mission.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'mission-opt-btn';
            btn.textContent = opt.text;

            btn.onclick = () => {
                if (opt.correct) {
                    btn.classList.add('correct');
                    grid.querySelectorAll('.mission-opt-btn').forEach(b => b.style.pointerEvents = 'none');
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.8rem;">
                            ✓ Rigtigt svaret!
                        </div>
                        <button class="mission-next-btn" id="next-station-mission-btn">
                            ${currStationMissionIdx < stationMissions.length - 1 ? 'Næste mission ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-station-mission-btn').onclick = () => {
                        currStationMissionIdx = (currStationMissionIdx + 1) % stationMissions.length;
                        renderStationMission();
                    };
                } else {
                    btn.classList.add('wrong');
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-size: 1.1rem; font-weight: 700;">
                            ✗ Forkert svaret. Prøv igen!
                        </div>
                    `;
                    setTimeout(() => btn.classList.remove('wrong'), 700);
                }
            };
            grid.appendChild(btn);
        });

        missionCard.appendChild(grid);
        missionCard.appendChild(feedbackBox);
    }

    renderStationMission();
    detektivPanel.appendChild(missionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. TAB: HISTORIE (Byg en lille historie - INGEN TTS)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'verber-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const stationStories = [
        {
            title: "1. På perronen",
            steps: [
                {
                    q: "1. Hvad sker der ved sporet?",
                    options: [
                        { text: "Toget kommer ind 🚆", correct: true },
                        { text: "Bilen flyver ✈️", correct: false },
                        { text: "Solen sover 🌙", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør passagererne?",
                    options: [
                        { text: "De lægger sig på gulvet 😴", correct: false },
                        { text: "De går ind i toget 🚶", correct: true },
                        { text: "De svømmer 🏊", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør toget bagefter?",
                    options: [
                        { text: "Toget kører af sted 🚄", correct: true },
                        { text: "Toget spiser et æble 🍎", correct: false },
                        { text: "Toget forsvinder 🪄", correct: false }
                    ]
                }
            ]
        },
        {
            title: "2. I kiosken",
            steps: [
                {
                    q: "1. Hvad vil manden i kiosken?",
                    options: [
                        { text: "Han vil købe en kaffe ☕", correct: true },
                        { text: "Han vil sove 🛏️", correct: false },
                        { text: "Han vil vaske sit tøj 👕", correct: false }
                    ]
                },
                {
                    q: "2. Hvordan betaler han?",
                    options: [
                        { text: "Han glemmer pengene ❌", correct: false },
                        { text: "Han betaler med sit kort 💳", correct: true },
                        { text: "Han kaster kortet væk 🗑️", correct: false }
                    ]
                },
                {
                    q: "3. Hvad får han af ekspedienten?",
                    options: [
                        { text: "Han får en cykel 🚲", correct: false },
                        { text: "Han får sin varme kaffe ☕", correct: true },
                        { text: "Han får en bold ⚽", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. Rejsen begynder",
            steps: [
                {
                    q: "1. Hvad skal familien i dag?",
                    options: [
                        { text: "De skal rejse til Jylland 🚆", correct: true },
                        { text: "De skal male huset 🏠", correct: false },
                        { text: "De skal købe en hund 🐕", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør faren med bagagen?",
                    options: [
                        { text: "Han taber tasken i søen 🌊", correct: false },
                        { text: "Han trækker den store kuffert 🧳", correct: true },
                        { text: "Han kaster kufferten væk 🚀", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør familien inde i toget?",
                    options: [
                        { text: "De finder deres pladser 💺", correct: true },
                        { text: "De løber væk 🏃", correct: false },
                        { text: "De sover på taget ⛺", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. Venner på stationen",
            steps: [
                {
                    q: "1. Hvem venter Anna på?",
                    options: [
                        { text: "Hun venter på sin ven Peter ⏳", correct: true },
                        { text: "Hun venter på en bus 🚌", correct: false },
                        { text: "Hun venter på lægen 🩺", correct: false }
                    ]
                },
                {
                    q: "2. Hvordan ankommer Peter?",
                    options: [
                        { text: "Han kommer med toget 🚆", correct: true },
                        { text: "Han kommer gående fra skoven 🌲", correct: false },
                        { text: "Han svømmer 🏊", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør de sammen?",
                    options: [
                        { text: "De henter taskerne og smiler 😊", correct: true },
                        { text: "De råber af hinanden 😡", correct: false },
                        { text: "De går hjem hver for sig 🚶", correct: false }
                    ]
                }
            ]
        }
    ];

    let currStationStoryIdx = 0;
    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';

    function renderActiveStationStory() {
        storyContainer.innerHTML = '';
        const story = stationStories[currStationStoryIdx];

        const navBar = document.createElement('div');
        navBar.className = 'story-nav-pills';
        stationStories.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = `story-nav-btn ${idx === currStationStoryIdx ? 'active' : ''}`;
            btn.textContent = `Historie ${idx + 1}`;
            btn.onclick = () => {
                currStationStoryIdx = idx;
                renderActiveStationStory();
            };
            navBar.appendChild(btn);
        });
        storyContainer.appendChild(navBar);

        const titleEl = document.createElement('h2');
        titleEl.style.fontSize = '1.8rem';
        titleEl.style.marginBottom = '0.4rem';
        titleEl.style.textAlign = 'center';
        titleEl.textContent = story.title;
        storyContainer.appendChild(titleEl);

        const descEl = document.createElement('p');
        descEl.style.color = '#94a3b8';
        descEl.style.textAlign = 'center';
        descEl.style.marginBottom = '1.8rem';
        descEl.textContent = 'Vælg det rigtige verbum for at bygge historien:';
        storyContainer.appendChild(descEl);

        const stepsHolder = document.createElement('div');

        story.steps.forEach((step, sIdx) => {
            const stepCard = document.createElement('div');
            stepCard.className = `story-step-card ${sIdx === 0 ? 'active-step' : ''}`;
            stepCard.id = `station-step-${sIdx}`;
            if (sIdx > 0) {
                stepCard.style.opacity = '0.35';
                stepCard.style.pointerEvents = 'none';
            }

            const qEl = document.createElement('h4');
            qEl.style.marginBottom = '0.6rem';
            qEl.textContent = step.q;
            stepCard.appendChild(qEl);

            const optRow = document.createElement('div');
            optRow.className = 'story-options-row';

            const stepFeedback = document.createElement('div');

            step.options.forEach(opt => {
                const optBtn = document.createElement('button');
                optBtn.className = 'story-opt-btn';
                optBtn.textContent = opt.text;

                optBtn.onclick = () => {
                    if (opt.correct) {
                        optBtn.classList.add('correct');
                        stepFeedback.innerHTML = `<div style="color: #4ade80; font-weight: 700; margin-top: 0.6rem;">✓ Rigtigt svaret!</div>`;
                        optRow.querySelectorAll('.story-opt-btn').forEach(b => b.style.pointerEvents = 'none');

                        const nextCard = stepsHolder.querySelector(`#station-step-${sIdx + 1}`);
                        if (nextCard) {
                            nextCard.style.opacity = '1';
                            nextCard.style.pointerEvents = 'auto';
                            nextCard.classList.add('active-step');
                        } else {
                            const completeBox = storyContainer.querySelector('#station-story-complete');
                            if (completeBox) completeBox.style.display = 'block';
                        }
                    } else {
                        optBtn.classList.add('wrong');
                        stepFeedback.innerHTML = `<div style="color: #f87171; font-weight: 700; margin-top: 0.6rem;">✗ Forkert svaret. Prøv igen!</div>`;
                        setTimeout(() => optBtn.classList.remove('wrong'), 700);
                    }
                };
                optRow.appendChild(optBtn);
            });

            stepCard.appendChild(optRow);
            stepCard.appendChild(stepFeedback);
            stepsHolder.appendChild(stepCard);
        });

        storyContainer.appendChild(stepsHolder);

        const completeBox = document.createElement('div');
        completeBox.id = 'station-story-complete';
        completeBox.className = 'story-explanation-box';
        completeBox.style.display = 'none';
        completeBox.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: #4ade80;">
                🎉 Flot klaret! Du har gennemført historien.
            </div>
            <button class="mission-next-btn" id="next-station-story-btn">
                ${currStationStoryIdx < stationStories.length - 1 ? 'Gå til næste historie ➔' : 'Start forfra 🔄'}
            </button>
        `;
        storyContainer.appendChild(completeBox);

        completeBox.querySelector('#next-station-story-btn').onclick = () => {
            currStationStoryIdx = (currStationStoryIdx + 1) % stationStories.length;
            renderActiveStationStory();
        };
    }

    renderActiveStationStory();
    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 4. TAB: SYNONYMER & ANTONYMER (INGEN TTS)
    // ========================================================
    const synonymPanel = document.createElement('div');
    synonymPanel.className = 'verber-panel';
    synonymPanel.dataset.panel = 'tab_synonym_antonym';

    const stationSynonymTasks = [
        {
            type: 'synonym',
            word: 'at køre',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at transportere sig 🚆', correct: true },
                { text: 'at sove 🛌', correct: false },
                { text: 'at spise 🍽️', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at handle',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at købe ind 🛒', correct: true },
                { text: 'at løbe hurtigt 🏃', correct: false },
                { text: 'at synge 🎵', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at komme',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at gå 🚶', correct: true },
                { text: 'at ankomme 🛬', correct: false },
                { text: 'at smile 😊', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at købe',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at sælge 🏷️', correct: true },
                { text: 'at betale 💳', correct: false },
                { text: 'at hente 📦', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at begynde',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at stoppe 🛑', correct: true },
                { text: 'at starte ▶️', correct: false },
                { text: 'at fortsætte ➡️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at give',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at få / modtage 🎁', correct: true },
                { text: 'at række frem 🤲', correct: false },
                { text: 'at vise 👁️', correct: false }
            ]
        }
    ];

    let currStationSynonymIdx = 0;
    const synonymCard = document.createElement('div');
    synonymCard.className = 'synonym-card';

    function renderStationSynonymTask() {
        synonymCard.innerHTML = '';
        const task = stationSynonymTasks[currStationSynonymIdx];

        const isSynonym = task.type === 'synonym';
        const typeBadge = document.createElement('div');
        typeBadge.className = `synonym-type-badge ${isSynonym ? 'badge-type-synonym' : 'badge-type-antonym'}`;
        typeBadge.textContent = isSynonym ? '🔗 Find Synonym (Samme betydning)' : '⚡ Find Antonym (Modsætning)';
        synonymCard.appendChild(typeBadge);

        const promptText = document.createElement('p');
        promptText.style.color = '#cbd5e1';
        promptText.style.fontSize = '1.1rem';
        promptText.textContent = task.prompt;
        synonymCard.appendChild(promptText);

        const wordEl = document.createElement('div');
        wordEl.className = 'synonym-target-word';
        wordEl.innerHTML = `<span>${task.word}</span>`;
        synonymCard.appendChild(wordEl);

        const grid = document.createElement('div');
        grid.className = 'mission-options-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.style.marginTop = '1.5rem';

        task.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'mission-opt-btn';
            btn.textContent = opt.text;

            btn.onclick = () => {
                if (opt.correct) {
                    btn.classList.add('correct');
                    grid.querySelectorAll('.mission-opt-btn').forEach(b => b.style.pointerEvents = 'none');
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.8rem;">
                            ✓ Rigtigt svaret!
                        </div>
                        <button class="mission-next-btn" id="next-synonym-task-btn">
                            ${currStationSynonymIdx < stationSynonymTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-synonym-task-btn').onclick = () => {
                        currStationSynonymIdx = (currStationSynonymIdx + 1) % stationSynonymTasks.length;
                        renderStationSynonymTask();
                    };
                } else {
                    btn.classList.add('wrong');
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-size: 1.1rem; font-weight: 700;">
                            ✗ Forkert svaret. Prøv igen!
                        </div>
                    `;
                    setTimeout(() => btn.classList.remove('wrong'), 700);
                }
            };
            grid.appendChild(btn);
        });

        synonymCard.appendChild(grid);
        synonymCard.appendChild(feedbackBox);
    }

    renderStationSynonymTask();
    synonymPanel.appendChild(synonymCard);
    panelsHolder.appendChild(synonymPanel);

    // ========================================================
    // --- 5. TAB: SÆTNINGSBYGGER (Sæt verbet ind - INGEN TTS)
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'verber-panel';
    saetningPanel.dataset.panel = 'tab_saetning';

    const stationSentenceTasks = [
        {
            subjekt: "Toget",
            correctVerb: "kører",
            objekt: "mod København",
            adverbial: "om morgenen",
            wrongVerbs: ["koger", "læser"]
        },
        {
            subjekt: "Manden",
            correctVerb: "betaler",
            objekt: "for sin billet",
            adverbial: "i automaten",
            wrongVerbs: ["sover", "spiser"]
        },
        {
            subjekt: "Kvinden",
            correctVerb: "trækker",
            objekt: "sin kuffert",
            adverbial: "på perronen",
            wrongVerbs: ["kaster", "drikker"]
        },
        {
            subjekt: "Passagererne",
            correctVerb: "venter",
            objekt: "på toget",
            adverbial: "på stationen",
            wrongVerbs: ["svømmer", "danser"]
        },
        {
            subjekt: "Faren",
            correctVerb: "henter",
            objekt: "sin datter",
            adverbial: "ved udgangen",
            wrongVerbs: ["steger", "vasker"]
        }
    ];

    let currStationSentenceIdx = 0;
    const sentenceCard = document.createElement('div');
    sentenceCard.className = 'sentence-builder-card';

    function renderStationSentenceBuilder() {
        sentenceCard.innerHTML = '';
        const task = stationSentenceTasks[currStationSentenceIdx];

        sentenceCard.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div class="mission-badge">Sætningsbygger ${currStationSentenceIdx + 1} af ${stationSentenceTasks.length}</div>
                <h3 style="font-size: 1.6rem; color: white;">Vælg det rigtige verbum og dan sætningen:</h3>
            </div>

            <!-- Grammatisk farveforklaring -->
            <div class="grammar-legend-bar">
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>Substantiv (grøn)</strong></div>
                <div class="grammar-legend-item"><span class="legend-chip chip-verbum"></span> <strong>Verbum (rød)</strong></div>
                <div class="grammar-legend-item"><span class="legend-chip chip-sted"></span> <strong>Sted / Tid (blå)</strong></div>
            </div>

            <div class="builder-slots-row">
                <div class="builder-slot-box slot-subjekt">
                    <span class="slot-role-tag">Subjekt</span>
                    <span>${task.subjekt}</span>
                </div>
                <div class="builder-slot-box slot-verbum" id="station-builder-verb-slot">
                    <span class="slot-role-tag">Verbum</span>
                    <span>❓ Vælg verbum</span>
                </div>
                <div class="builder-slot-box slot-objekt">
                    <span class="slot-role-tag">Objekt / Præp.</span>
                    <span>${task.objekt}</span>
                </div>
                <div class="builder-slot-box slot-adverbial">
                    <span class="slot-role-tag">Sted / Tid</span>
                    <span>${task.adverbial}</span>
                </div>
            </div>

            <div class="words-selection-tray">
                <div class="tray-group-title">Hvilket verbum passer til handlingen? (🔴 Verbum)</div>
                <div class="tray-chips-list" id="station-verb-options-tray"></div>
            </div>

            <div class="live-sentence-preview" id="station-preview-box">
                <span id="station-preview-text">Vælg et verbum ovenfor for at færdiggøre sætningen...</span>
            </div>
            <div id="station-builder-feedback" style="margin-top: 1rem; text-align: center;"></div>
        `;

        const verbTray = sentenceCard.querySelector('#station-verb-options-tray');
        const verbSlot = sentenceCard.querySelector('#station-builder-verb-slot');
        const previewText = sentenceCard.querySelector('#station-preview-text');
        const feedbackEl = sentenceCard.querySelector('#station-builder-feedback');

        const allOptions = [task.correctVerb, ...task.wrongVerbs].sort(() => Math.random() - 0.5);

        allOptions.forEach(v => {
            const chipBtn = document.createElement('button');
            chipBtn.className = 'tray-chip-btn';
            chipBtn.textContent = v;

            chipBtn.onclick = () => {
                if (v === task.correctVerb) {
                    verbSlot.querySelector('span:last-child').textContent = v;
                    verbSlot.style.background = 'rgba(34, 197, 94, 0.3)';
                    verbSlot.style.borderColor = '#22c55e';
                    verbSlot.style.color = '#4ade80';

                    previewText.innerHTML = `<strong>${task.subjekt}</strong> <span style="color:#ef4444; font-weight:800;">${v}</span> ${task.objekt} ${task.adverbial}.`;
                    feedbackEl.innerHTML = `
                        <div style="color: #4ade80; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.8rem;">
                            ✓ Rigtigt svaret!
                        </div>
                        <button class="mission-next-btn" id="next-station-builder-btn">
                            ${currStationSentenceIdx < stationSentenceTasks.length - 1 ? 'Næste sætning ➔' : 'Start forfra 🔄'}
                        </button>
                    `;
                    verbTray.querySelectorAll('.tray-chip-btn').forEach(b => b.style.pointerEvents = 'none');

                    feedbackEl.querySelector('#next-station-builder-btn').onclick = () => {
                        currStationSentenceIdx = (currStationSentenceIdx + 1) % stationSentenceTasks.length;
                        renderStationSentenceBuilder();
                    };
                } else {
                    feedbackEl.innerHTML = `
                        <div style="color: #f87171; font-size: 1.1rem; font-weight: 700;">
                            ✗ Forkert svaret. Prøv igen!
                        </div>
                    `;
                }
            };

            verbTray.appendChild(chipBtn);
        });
    }

    renderStationSentenceBuilder();
    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    container.appendChild(viewContainer);
}
