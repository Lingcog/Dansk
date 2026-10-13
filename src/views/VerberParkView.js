import { getTranslation } from '../utils/i18n.js';

/**
 * VerberParkView - Didaktisk vrimlebillede for Scene 3: Parken & Udendørscaféen
 * Dækker 34 højfrekvente verber (sanser, følelser, relationer, liv, mad & drikke).
 */
export function renderVerberParkView(container, navigateFn) {
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
        <h1>${getTranslation('top100_verber_scene3_title')}</h1>
        <p>${getTranslation('top100_verber_scene3_desc')}</p>
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
    // --- 34 VERBER I PARKEN & CAFÉEN (Scene 3)
    // ========================================================
    const parkVerber = [
        { word: 'at se', nutid: 'ser', x: 45, y: 35, sentence: 'Hun ser de smukke blomster i parken.' },
        { word: 'at finde', nutid: 'finder', x: 60, y: 75, sentence: 'Drengen finder en lille sten på stien.' },
        { word: 'at holde', nutid: 'holder', x: 35, y: 65, sentence: 'Manden holder en kop varm te i hånden.' },
        { word: 'at tro', nutid: 'tror', x: 25, y: 55, sentence: 'Jeg tror solen skinner hele eftermiddagen.' },
        { word: 'at ligge', nutid: 'ligger', x: 75, y: 80, sentence: 'Tæppet ligger på det grønne græs.' },
        { word: 'at sidde', nutid: 'sidder', x: 30, y: 68, sentence: 'Vennerne sidder ved cafébordet.' },
        { word: 'at leve', nutid: 'lever', x: 50, y: 25, sentence: 'Fuglene lever frit i træerne.' },
        { word: 'at spille', nutid: 'spiller', x: 82, y: 60, sentence: 'Børnene spiller bold på plænen.' },
        { word: 'at prøve', nutid: 'prøver', x: 22, y: 72, sentence: 'Hun prøver en ny lækker kage.' },
        { word: 'at fortælle', nutid: 'fortæller', x: 32, y: 62, sentence: 'Bedstefar fortæller en sjov historie.' },
        { word: 'at opleve', nutid: 'oplever', x: 55, y: 45, sentence: 'De oplever den dejlige forårsdag.' },
        { word: 'at ønske', nutid: 'ønsker', x: 28, y: 50, sentence: 'Hun ønsker sig en stor is.' },
        { word: 'at spise', nutid: 'spiser', x: 20, y: 65, sentence: 'Manden spiser en sandwich.' },
        { word: 'at miste', nutid: 'mister', x: 88, y: 75, sentence: 'Pas på ikke at miste din kasket i blæsten!' },
        { word: 'at føle', nutid: 'føler', x: 48, y: 50, sentence: 'Hun føler varmen fra solen.' },
        { word: 'at kigge', nutid: 'kigger', x: 40, y: 40, sentence: 'Parret kigger på svanerne i søen.' },
        { word: 'at møde', nutid: 'møder', x: 65, y: 55, sentence: 'Vennerne møder hinanden ved caféen.' },
        { word: 'at elske', nutid: 'elsker', x: 38, y: 58, sentence: 'De elsker at gå ture i parken.' },
        { word: 'at drikke', nutid: 'drikker', x: 24, y: 68, sentence: 'Kvinden drikker en kold sodavand.' },
        { word: 'at tabe', nutid: 'taber', x: 80, y: 70, sentence: 'Pigen taber bolden på græsset.' },
        { word: 'at ændre', nutid: 'ændrer', x: 55, y: 15, sentence: 'Vejret ændrer sig hurtigt.' },
        { word: 'at passe', nutid: 'passer', x: 70, y: 65, sentence: 'Storesøster passer godt på sin lillebror.' },
        { word: 'at bo', nutid: 'bor', x: 10, y: 25, sentence: 'Mange mennesker bor tæt på parken.' },
        { word: 'at hjælpe', nutid: 'hjælper', x: 68, y: 72, sentence: 'Drengen hjælper sin ven op fra græsset.' },
        { word: 'at mærke', nutid: 'mærker', x: 46, y: 60, sentence: 'Han mærker den bløde vind.' },
        { word: 'at vinde', nutid: 'vinder', x: 85, y: 58, sentence: 'Holdet vinder fodboldkampen!' },
        { word: 'at vokse', nutid: 'vokser', x: 62, y: 35, sentence: 'Træerne vokser sig store og grønne.' },
        { word: 'at slå', nutid: 'slår', x: 83, y: 65, sentence: 'Han slår til bolden med foden.' },
        { word: 'at sove', nutid: 'sover', x: 72, y: 82, sentence: 'Hunden sover trygt i skyggen.' },
        { word: 'at lukke', nutid: 'lukker', x: 18, y: 60, sentence: 'Caféen lukker først i aften.' },
        { word: 'at håbe', nutid: 'håber', x: 30, y: 45, sentence: 'De håber på solskin i morgen.' },
        { word: 'at smile', nutid: 'smiler', x: 36, y: 52, sentence: 'Kæresteparret smiler til hinanden.' },
        { word: 'at grine', nutid: 'griner', x: 42, y: 55, sentence: 'Alle griner af den sjove vittighed.' },
        { word: 'at græde', nutid: 'græder', x: 78, y: 68, sentence: 'Det lille barn græder fordi det slog sig.' }
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
    pureBtn.innerHTML = `<span>🖼️</span> Se rent billede: <strong id="pure-mode-status-park">FRA</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-park').textContent = pureModeActive ? 'TIL 🖼️' : 'FRA';
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/verber_park_vrimmel.jpg';
    img.alt = 'Parken vrimlebillede';
    stage.appendChild(img);

    // Detail card container
    const detailCard = document.createElement('div');
    detailCard.className = 'hotspot-detail-card';
    detailCard.style.display = 'none';

    // Create hotspots
    parkVerber.forEach(item => {
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
                    <button class="listen-word-btn" id="listen-park-verb-btn">
                        <span>🔊</span> Hør målord
                    </button>
                </div>
            `;

            detailCard.querySelector('#listen-park-verb-btn').onclick = () => {
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

    const parkMissions = [
        {
            title: "Mission 1 af 4",
            clue: "Find de to venner der sidder ved cafébordet og drikker en kop kaffe:",
            options: [
                { text: "at drikke (drikker) ☕", correct: true },
                { text: "at sove (sover) 🛌", correct: false },
                { text: "at svømme (svømmer) 🏊", correct: false }
            ]
        },
        {
            title: "Mission 2 af 4",
            clue: "Find børnene der spiller bold sammen på græsplænen:",
            options: [
                { text: "at køre (kører) 🚗", correct: false },
                { text: "at spille (spiller) ⚽", correct: true },
                { text: "at skrive (skriver) ✍️", correct: false }
            ]
        },
        {
            title: "Mission 3 af 4",
            clue: "Find hunden der sover fredeligt i skyggen under det store træ:",
            options: [
                { text: "at sove (sover) 🐕", correct: true },
                { text: "at flyve (flyver) 🦅", correct: false },
                { text: "at læse (læser) 📖", correct: false }
            ]
        },
        {
            title: "Mission 4 af 4",
            clue: "Find det lille barn der græder efter at have slået sit knæ:",
            options: [
                { text: "at græde (græder) 😢", correct: true },
                { text: "at spise (spiser) 🥪", correct: false },
                { text: "at synge (synger) 🎵", correct: false }
            ]
        }
    ];

    let currParkMissionIdx = 0;
    const missionCard = document.createElement('div');
    missionCard.className = 'mission-card';

    function renderParkMission() {
        missionCard.innerHTML = '';
        const mission = parkMissions[currParkMissionIdx];

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
                        <button class="mission-next-btn" id="next-park-mission-btn">
                            ${currParkMissionIdx < parkMissions.length - 1 ? 'Næste mission ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-park-mission-btn').onclick = () => {
                        currParkMissionIdx = (currParkMissionIdx + 1) % parkMissions.length;
                        renderParkMission();
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

    renderParkMission();
    detektivPanel.appendChild(missionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. TAB: HISTORIE (Byg en lille historie - INGEN TTS)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'verber-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const parkStories = [
        {
            title: "1. En eftermiddag i caféen",
            steps: [
                {
                    q: "1. Hvad gør vennerne ved caféen?",
                    options: [
                        { text: "De møder hinanden med et kram 🫂", correct: true },
                        { text: "De kaster kaffe på jorden ☕", correct: false },
                        { text: "De sover under bordet 😴", correct: false }
                    ]
                },
                {
                    q: "2. Hvor sætter de sig hen?",
                    options: [
                        { text: "De sidder ved bordet i solen ☀️", correct: true },
                        { text: "De svømmer i søen 🏊", correct: false },
                        { text: "De klatrer op i et træ 🌳", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør de sammen?",
                    options: [
                        { text: "De drikker kaffe og smiler 😊", correct: true },
                        { text: "De råber af hinanden 😡", correct: false },
                        { text: "De løber væk i panik 🏃", correct: false }
                    ]
                }
            ]
        },
        {
            title: "2. Boldspil i parken",
            steps: [
                {
                    q: "1. Hvad laver børnene på græsplænen?",
                    options: [
                        { text: "De spiller bold sammen ⚽", correct: true },
                        { text: "De maler græsset blåt 🎨", correct: false },
                        { text: "De læser lektier i stilhed 📖", correct: false }
                    ]
                },
                {
                    q: "2. Hvad sker der under spillet?",
                    options: [
                        { text: "Peter taber bolden på stien ⚽", correct: true },
                        { text: "Bolden forvandler sig til en fugl 🐦", correct: false },
                        { text: "Solen forsvinder i jorden 🕳️", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør hans gode ven?",
                    options: [
                        { text: "Hans ven finder bolden og slår til den 👟", correct: true },
                        { text: "Hans ven græder og går hjem 😢", correct: false },
                        { text: "Hans ven kaster sine sko væk 👟", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. En tur i solen",
            steps: [
                {
                    q: "1. Hvad gør familien på en dejlig søndag?",
                    options: [
                        { text: "De går en tur i den grønne park 🌳", correct: true },
                        { text: "De vasker deres bil 🚗", correct: false },
                        { text: "De sover hele dagen 🛌", correct: false }
                    ]
                },
                {
                    q: "2. Hvad ser de oppe i luften?",
                    options: [
                        { text: "De ser de smukke fugle i træerne 🐦", correct: true },
                        { text: "De ser et spøgelse 👻", correct: false },
                        { text: "De ser en ubåd 🚢", correct: false }
                    ]
                },
                {
                    q: "3. Hvad køber de ved kiosken?",
                    options: [
                        { text: "De spiser en lækker is sammen 🍦", correct: true },
                        { text: "De spiser en kuffert 🧳", correct: false },
                        { text: "De smider pengene i søen 🪙", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. En lille ulykke",
            steps: [
                {
                    q: "1. Hvad gør den lille dreng på stien?",
                    options: [
                        { text: "Han løber hurtigt og falder 🏃", correct: true },
                        { text: "Han sidder helt stille 🪑", correct: false },
                        { text: "Han sover i en vogn 🛌", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør han da han slår sit knæ?",
                    options: [
                        { text: "Han græder fordi det gør ondt 😭", correct: true },
                        { text: "Han griner højt og hopper 🦘", correct: false },
                        { text: "Han synger en sang 🎵", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør hans storesøster med det samme?",
                    options: [
                        { text: "Hun hjælper ham op og trøster ham 🤗", correct: true },
                        { text: "Hun løber sin vej 🏃", correct: false },
                        { text: "Hun tager hans sko af 👟", correct: false }
                    ]
                }
            ]
        }
    ];

    let currParkStoryIdx = 0;
    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';

    function renderActiveParkStory() {
        storyContainer.innerHTML = '';
        const story = parkStories[currParkStoryIdx];

        const navBar = document.createElement('div');
        navBar.className = 'story-nav-pills';
        parkStories.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = `story-nav-btn ${idx === currParkStoryIdx ? 'active' : ''}`;
            btn.textContent = `Historie ${idx + 1}`;
            btn.onclick = () => {
                currParkStoryIdx = idx;
                renderActiveParkStory();
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
            stepCard.id = `park-step-${sIdx}`;
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

                        const nextCard = stepsHolder.querySelector(`#park-step-${sIdx + 1}`);
                        if (nextCard) {
                            nextCard.style.opacity = '1';
                            nextCard.style.pointerEvents = 'auto';
                            nextCard.classList.add('active-step');
                        } else {
                            const completeBox = storyContainer.querySelector('#park-story-complete');
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
        completeBox.id = 'park-story-complete';
        completeBox.className = 'story-explanation-box';
        completeBox.style.display = 'none';
        completeBox.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: #4ade80;">
                🎉 Flot klaret! Du har gennemført historien.
            </div>
            <button class="mission-next-btn" id="next-park-story-btn">
                ${currParkStoryIdx < parkStories.length - 1 ? 'Gå til næste historie ➔' : 'Start forfra 🔄'}
            </button>
        `;
        storyContainer.appendChild(completeBox);

        completeBox.querySelector('#next-park-story-btn').onclick = () => {
            currParkStoryIdx = (currParkStoryIdx + 1) % parkStories.length;
            renderActiveParkStory();
        };
    }

    renderActiveParkStory();
    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 4. TAB: SYNONYMER & ANTONYMER (INGEN TTS)
    // ========================================================
    const synonymPanel = document.createElement('div');
    synonymPanel.className = 'verber-panel';
    synonymPanel.dataset.panel = 'tab_synonym_antonym';

    const parkSynonymTasks = [
        {
            type: 'synonym',
            word: 'at se',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at kigge 👀', correct: true },
                { text: 'at høre 👂', correct: false },
                { text: 'at smage 👅', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at smile',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at grine 😊', correct: true },
                { text: 'at råbe 🗣️', correct: false },
                { text: 'at sove 😴', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at grine / smile',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at græde 😢', correct: true },
                { text: 'at synge 🎵', correct: false },
                { text: 'at spise 🍽️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at vinde',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at tabe ❌', correct: true },
                { text: 'at prøve 🔄', correct: false },
                { text: 'at score et mål ⚽', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at finde',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at miste 🔍', correct: true },
                { text: 'at gemme 📦', correct: false },
                { text: 'at se 👀', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at sove',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at vågne ⏰', correct: true },
                { text: 'at hvile sig 🛋️', correct: false },
                { text: 'at ligge ned 🛏️', correct: false }
            ]
        }
    ];

    let currParkSynonymIdx = 0;
    const synonymCard = document.createElement('div');
    synonymCard.className = 'synonym-card';

    function renderParkSynonymTask() {
        synonymCard.innerHTML = '';
        const task = parkSynonymTasks[currParkSynonymIdx];

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
                        <button class="mission-next-btn" id="next-park-synonym-btn">
                            ${currParkSynonymIdx < parkSynonymTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-park-synonym-btn').onclick = () => {
                        currParkSynonymIdx = (currParkSynonymIdx + 1) % parkSynonymTasks.length;
                        renderParkSynonymTask();
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

    renderParkSynonymTask();
    synonymPanel.appendChild(synonymCard);
    panelsHolder.appendChild(synonymPanel);

    // ========================================================
    // --- 5. TAB: SÆTNINGSBYGGER (Sæt verbet ind - INGEN TTS)
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'verber-panel';
    saetningPanel.dataset.panel = 'tab_saetning';

    const parkSentenceTasks = [
        {
            subjekt: "Vennerne",
            correctVerb: "sidder",
            objekt: "ved cafébordet",
            adverbial: "i solen",
            wrongVerbs: ["cykler", "læser"]
        },
        {
            subjekt: "Børnene",
            correctVerb: "spiller",
            objekt: "bold",
            adverbial: "på plænen",
            wrongVerbs: ["koger", "vasker"]
        },
        {
            subjekt: "Manden",
            correctVerb: "spiser",
            objekt: "en sandwich",
            adverbial: "på bænken",
            wrongVerbs: ["sover", "svømmer"]
        },
        {
            subjekt: "Hunden",
            correctVerb: "sover",
            objekt: "i skyggen",
            adverbial: "under træet",
            wrongVerbs: ["flyver", "kører"]
        },
        {
            subjekt: "Pigen",
            correctVerb: "smiler",
            objekt: "til sin ven",
            adverbial: "i parken",
            wrongVerbs: ["kaster", "steger"]
        }
    ];

    let currParkSentenceIdx = 0;
    const sentenceCard = document.createElement('div');
    sentenceCard.className = 'sentence-builder-card';

    function renderParkSentenceBuilder() {
        sentenceCard.innerHTML = '';
        const task = parkSentenceTasks[currParkSentenceIdx];

        sentenceCard.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div class="mission-badge">Sætningsbygger ${currParkSentenceIdx + 1} af ${parkSentenceTasks.length}</div>
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
                <div class="builder-slot-box slot-verbum" id="park-builder-verb-slot">
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
                <div class="tray-chips-list" id="park-verb-options-tray"></div>
            </div>

            <div class="live-sentence-preview" id="park-preview-box">
                <span id="park-preview-text">Vælg et verbum ovenfor for at færdiggøre sætningen...</span>
            </div>
            <div id="park-builder-feedback" style="margin-top: 1rem; text-align: center;"></div>
        `;

        const verbTray = sentenceCard.querySelector('#park-verb-options-tray');
        const verbSlot = sentenceCard.querySelector('#park-builder-verb-slot');
        const previewText = sentenceCard.querySelector('#park-preview-text');
        const feedbackEl = sentenceCard.querySelector('#park-builder-feedback');

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
                        <button class="mission-next-btn" id="next-park-builder-btn">
                            ${currParkSentenceIdx < parkSentenceTasks.length - 1 ? 'Næste sætning ➔' : 'Start forfra 🔄'}
                        </button>
                    `;
                    verbTray.querySelectorAll('.tray-chip-btn').forEach(b => b.style.pointerEvents = 'none');

                    feedbackEl.querySelector('#next-park-builder-btn').onclick = () => {
                        currParkSentenceIdx = (currParkSentenceIdx + 1) % parkSentenceTasks.length;
                        renderParkSentenceBuilder();
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

    renderParkSentenceBuilder();
    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    container.appendChild(viewContainer);
}
