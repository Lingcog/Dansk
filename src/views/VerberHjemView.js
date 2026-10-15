import { getTranslation } from '../utils/i18n.js';

/**
 * VerberHjemView - Didaktisk vrimlebillede for Scene 2: Hjemmet & Køkkenet
 * Dækker 20 højfrekvente verber for huslige handlinger, morgenrutiner og familiens gøremål.
 * 7 interaktive opgaveflader for maksimal pædagogisk progression.
 */
export function renderVerberHjemView(container, navigateFn) {
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

    // TTS Audio Helper (KUN brugt til målordet i Tab 1)
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
            gap: 0.5rem;
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
            padding: 0.65rem 1.1rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.45rem;
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
            display: block;
            object-fit: cover;
        }

        .vrimmel-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(239, 68, 68, 0.85);
            border: 2px solid white;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
            box-shadow: 0 0 14px rgba(239, 68, 68, 0.7);
            transition: all 0.25s ease;
            z-index: 10;
        }
        .vrimmel-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.25);
            background: #ef4444;
            box-shadow: 0 0 20px #ef4444;
        }
        .vrimmel-hotspot.active {
            transform: translate(-50%, -50%) scale(1.3);
            background: #f59e0b;
            border-color: #fef08a;
            box-shadow: 0 0 22px #f59e0b;
        }
        .pure-mode .vrimmel-hotspot {
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Detail card below vrimmel */
        .hotspot-detail-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.4rem;
            margin-top: 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.2rem;
        }
        .badge-verbum {
            background: rgba(239, 68, 68, 0.2);
            color: #f87171;
            border: 1px solid #ef4444;
            padding: 0.25rem 0.7rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.8rem;
            text-transform: uppercase;
        }
        .detail-main-word {
            font-size: 1.8rem;
            font-weight: 800;
            color: white;
            margin: 0.4rem 0 0.2rem;
        }
        .detail-forms {
            color: #94a3b8;
            font-size: 1rem;
            margin-bottom: 0.4rem;
        }
        .detail-forms strong {
            color: #38bdf8;
        }
        .detail-sentence {
            color: #cbd5e1;
            font-size: 1.05rem;
            font-style: italic;
        }
        .listen-word-btn {
            background: #ef4444;
            color: white;
            border: none;
            padding: 0.7rem 1.4rem;
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

        /* Shared Card Layout for Exercises */
        .exercise-card {
            max-width: 820px;
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
            margin: 1.2rem 0 1.5rem;
            font-size: 1.25rem;
            font-weight: 600;
            color: #f8fafc;
            line-height: 1.5;
        }
        .mission-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
            margin-top: 1.2rem;
        }
        .mission-opt-btn {
            background: #0f172a;
            border: 2px solid #334155;
            color: white;
            padding: 1rem;
            border-radius: 14px;
            font-size: 1.05rem;
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

        /* 2. Visual Detective Viewfinder */
        .detective-zoom-frame {
            position: relative;
            width: 100%;
            max-width: 580px;
            height: 240px;
            margin: 0 auto 1.2rem;
            border-radius: 18px;
            overflow: hidden;
            border: 2px solid #ef4444;
            background-repeat: no-repeat;
            background-size: 340%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .zoom-crosshair-badge {
            position: absolute;
            top: 12px;
            left: 12px;
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid #ef4444;
            color: #fca5a5;
            font-size: 0.8rem;
            font-weight: 800;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            backdrop-filter: blur(4px);
        }

        /* 3. Context Actions (Find 3 handlinger) */
        .context-chips-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin: 1.5rem 0;
        }
        .context-chip-btn {
            background: #0f172a;
            border: 2px solid #334155;
            color: white;
            padding: 1.1rem 0.8rem;
            border-radius: 14px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
        }
        .context-chip-btn:hover {
            border-color: #38bdf8;
            transform: translateY(-2px);
        }
        .context-chip-btn.found {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
            cursor: default;
        }
        .context-chip-btn.wrong-shake {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
            animation: shakeChip 0.4s ease;
        }
        @keyframes shakeChip {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-6px); }
            75% { transform: translateX(6px); }
        }
        .context-progress-pill {
            display: inline-block;
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid #38bdf8;
            color: #38bdf8;
            font-size: 0.85rem;
            font-weight: 800;
            padding: 0.35rem 0.9rem;
            border-radius: 20px;
            margin-bottom: 0.8rem;
        }

        /* 4. Story */
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

        /* 5. Synonyms & Antonyms */
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

        /* 6. Sentence Builder */
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
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
        }
        .grammar-legend-item {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.88rem;
            color: #cbd5e1;
        }
        .legend-chip {
            width: 12px;
            height: 12px;
            border-radius: 3px;
        }
        .chip-substantiv { background: #22c55e; }
        .chip-verbum { background: #ef4444; }
        .chip-sted { background: #0284c7; }
        .words-selection-tray {
            background: #0f172a;
            border-radius: 14px;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
            border: 1px solid #334155;
        }
        .tray-group-title {
            font-size: 0.9rem;
            font-weight: 700;
            color: #94a3b8;
            margin-bottom: 0.8rem;
            text-transform: uppercase;
        }
        .tray-chips-list {
            display: flex;
            gap: 0.8rem;
            flex-wrap: wrap;
        }
        .tray-chip-btn {
            background: #1e293b;
            color: white;
            border: 1px solid #475569;
            padding: 0.7rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .tray-chip-btn:hover {
            border-color: #ef4444;
            transform: translateY(-2px);
        }
        .live-sentence-preview {
            background: #0f172a;
            border: 2px solid #334155;
            border-radius: 14px;
            padding: 1.2rem;
            font-size: 1.3rem;
            font-weight: 600;
            color: white;
            min-height: 55px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        /* 7. Time Training (Nutid vs. Datid) */
        .time-marker-badge {
            display: inline-block;
            background: rgba(168, 85, 247, 0.2);
            border: 1px solid #a855f7;
            color: #c084fc;
            font-size: 0.85rem;
            font-weight: 800;
            padding: 0.35rem 0.9rem;
            border-radius: 20px;
            margin-bottom: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .time-sentence-box {
            background: #0f172a;
            border: 1px solid #334155;
            padding: 1.4rem;
            border-radius: 16px;
            margin: 1.2rem 0 1.5rem;
            font-size: 1.35rem;
            line-height: 1.6;
            color: #f8fafc;
        }
        .time-sentence-box mark {
            background: rgba(168, 85, 247, 0.25);
            color: #d8b4fe;
            border-radius: 6px;
            padding: 0.1rem 0.4rem;
            border: 1px solid rgba(168, 85, 247, 0.4);
            font-weight: 800;
        }
        .time-options-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.2rem;
            margin: 1.5rem 0;
        }
        .time-opt-btn {
            background: #0f172a;
            border: 2px solid #334155;
            color: white;
            padding: 1.2rem;
            border-radius: 14px;
            font-size: 1.2rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.3rem;
        }
        .time-opt-btn span.form-label {
            font-size: 0.8rem;
            color: #94a3b8;
            text-transform: uppercase;
            font-weight: 800;
        }
        .time-opt-btn:hover {
            border-color: #a855f7;
            transform: translateY(-2px);
        }
        .time-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .time-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
        }
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const heroHeader = document.createElement('div');
    heroHeader.className = 'verber-hero-header';
    heroHeader.innerHTML = `
        <h1>Scene 2: Hjemmet & Køkkenet</h1>
        <p>Lær 20 uundværlige hverdagsverber om madlavning, huslige gøremål og hyggelige rutiner i hjemmet.</p>
    `;
    viewContainer.appendChild(heroHeader);

    // 7 Tabs Navigation
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'verber-tabs';
    const tabs = [
        { id: 'tab_vrimmel', label: '1. Vrimlebillede', icon: '🔍' },
        { id: 'tab_detektiv', label: '2. Visuel Detektiv', icon: '🕵️' },
        { id: 'tab_handlinger', label: '3. Find handlinger', icon: '🎯' },
        { id: 'tab_historie', label: '4. Historie', icon: '💭' },
        { id: 'tab_synonym_antonym', label: '5. Synonymer & Antonymer', icon: '🔄' },
        { id: 'tab_saetning', label: '6. Sætningsbygger', icon: '✍️' },
        { id: 'tab_tid_boejning', label: '7. Nutid & Datid', icon: '⏱️' }
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
    // --- 20 VERBER I HJEMMET & KØKKENET med DATID
    // ========================================================
    const hjemVerber = [
        { word: 'at spise', nutid: 'spiser', datid: 'spiste', x: 48, y: 56, sentence: 'Pigen sidder ved bordet og spiser morgenmad.' },
        { word: 'at drikke', nutid: 'drikker', datid: 'drak', x: 55, y: 62, sentence: 'Hun drikker mælk af koppen.' },
        { word: 'at åbne', nutid: 'åbner', datid: 'åbnede', x: 30, y: 42, sentence: 'Manden åbner køleskabet for at tage mælk.' },
        { word: 'at lukke', nutid: 'lukker', datid: 'lukkede', x: 34, y: 35, sentence: 'Husk at lukke køleskabsdøren.' },
        { word: 'at gøre', nutid: 'gør', datid: 'gjorde', x: 18, y: 60, sentence: 'Kvinden gør morgenmaden klar.' },
        { word: 'at sidde', nutid: 'sidder', datid: 'sad', x: 84, y: 60, sentence: 'Bedstemor sidder i den bløde lænestol.' },
        { word: 'at stå', nutid: 'står', datid: 'stod', x: 20, y: 68, sentence: 'Kvinden står ved køkkenbordet og skærer brød.' },
        { word: 'at ligge', nutid: 'ligger', datid: 'lå', x: 88, y: 82, sentence: 'Katten ligger og sover på det varme gulvtæppe.' },
        { word: 'at lægge', nutid: 'lægger', datid: 'lagde', x: 14, y: 75, sentence: 'Hun lægger brødet i brødristeren.' },
        { word: 'at sætte', nutid: 'sætter', datid: 'satte', x: 74, y: 46, sentence: 'Manden sætter den fine blomstervase på reolen.' },
        { word: 'at holde', nutid: 'holder', datid: 'holdt', x: 82, y: 55, sentence: 'Hun holder den spændende bog i hænderne.' },
        { word: 'at tage', nutid: 'tager', datid: 'tog', x: 36, y: 44, sentence: 'Manden tager en karton mælk ud.' },
        { word: 'at give', nutid: 'giver', datid: 'gav', x: 45, y: 58, sentence: 'Faren giver sin datter en skål mysli.' },
        { word: 'at have', nutid: 'har', datid: 'havde', x: 10, y: 50, sentence: 'De har mange krydderier på hylden.' },
        { word: 'at være', nutid: 'er', datid: 'var', x: 62, y: 32, sentence: 'Pigen er vågen og strækker armene i soveværelset.' },
        { word: 'at lade', nutid: 'lader', datid: 'lod', x: 65, y: 25, sentence: 'Han lader døren til soveværelset stå åben.' },
        { word: 'at ringe', nutid: 'ringer', datid: 'ringede', x: 78, y: 28, sentence: 'Telefonen ringer inde fra værelset.' },
        { word: 'at dele', nutid: 'deler', datid: 'delte', x: 50, y: 65, sentence: 'Børnene deler det friske brød.' },
        { word: 'at falde', nutid: 'falder', datid: 'faldt', x: 92, y: 85, sentence: 'Katten falder i søvn i solskinnet.' },
        { word: 'at flytte', nutid: 'flytter', datid: 'flyttede', x: 70, y: 50, sentence: 'Han flytter vasen over på den lave hylde.' }
    ];

    // ========================================================
    // --- 1. TAB: VRIMLEBILLEDE MED HOTSPOTS (MÅLORD + DATID)
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
    pureBtn.innerHTML = `<span>🖼️</span> Se rent billede: <strong id="pure-mode-status-hjem-verb">FRA</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-hjem-verb').textContent = pureModeActive ? 'TIL 🖼️' : 'FRA';
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/verber_hjem_vrimmel.jpg';
    img.alt = 'Hjemmet og køkkenet vrimlebillede';
    stage.appendChild(img);

    // Detail card container
    const detailCard = document.createElement('div');
    detailCard.className = 'hotspot-detail-card';
    detailCard.style.display = 'none';

    // Create hotspots (20 velplacerede pegefelter)
    hjemVerber.forEach(item => {
        const dot = document.createElement('div');
        dot.className = 'vrimmel-hotspot';
        dot.style.left = `${item.x}%`;
        dot.style.top = `${item.y}%`;
        dot.textContent = '●';
        dot.title = `${item.word} (${item.nutid} / ${item.datid})`;

        dot.onclick = () => {
            stage.querySelectorAll('.vrimmel-hotspot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            // Show detail card med nutid og datid
            detailCard.style.display = 'flex';
            detailCard.innerHTML = `
                <div>
                    <span class="badge-verbum">🔴 Verbum</span>
                    <div class="detail-main-word">${item.word}</div>
                    <div class="detail-forms">Nutid: <strong>${item.nutid}</strong> &nbsp;|&nbsp; Datid: <strong>${item.datid}</strong></div>
                    <div class="detail-sentence">"${item.sentence}"</div>
                </div>
                <div>
                    <button class="listen-word-btn" id="listen-hjem-verb-btn">
                        <span>🔊</span> Hør målord
                    </button>
                </div>
            `;

            detailCard.querySelector('#listen-hjem-verb-btn').onclick = () => {
                speakDanish(item.word);
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
    // --- 2. TAB: VISUEL DETEKTIV (Model 1 - Billedudsnit)
    // ========================================================
    const detektivPanel = document.createElement('div');
    detektivPanel.className = 'verber-panel';
    detektivPanel.dataset.panel = 'tab_detektiv';

    const hjemVisualMissions = [
        {
            title: "Mission 1 af 4",
            cropX: 20,
            cropY: 65,
            question: "Kig på kvinden ved køkkenbordet. Hvad gør hun?",
            options: [
                { text: "Skærer brød og gør morgenmad klar 🍞", correct: true },
                { text: "Sover på gulvet 🛌", correct: false },
                { text: "Cykler på gaden 🚲", correct: false }
            ]
        },
        {
            title: "Mission 2 af 4",
            cropX: 32,
            cropY: 40,
            question: "Kig på manden ved det store blå køleskab. Hvad gør han?",
            options: [
                { text: "Læser en avis 📖", correct: false },
                { text: "Åbner køleskabet og tager mælk ud 🥛", correct: true },
                { text: "Kaster en bold ⚽", correct: false }
            ]
        },
        {
            title: "Mission 3 af 4",
            cropX: 84,
            cropY: 60,
            question: "Kig på kvinden i den gule lænestol. Hvad gør hun?",
            options: [
                { text: "Sidder afslappet og læser i sin bog 📚", correct: true },
                { text: "Vasker op i hånden 🧼", correct: false },
                { text: "Løber stærkt 🏃", correct: false }
            ]
        },
        {
            title: "Mission 4 af 4",
            cropX: 62,
            cropY: 30,
            question: "Kig på personen i døråbningen til soveværelset. Hvad gør hun?",
            options: [
                { text: "Køber en togbillet 🎫", correct: false },
                { text: "Er lige vågnet og strækker armene 🌅", correct: true },
                { text: "Laver mad i en gryde 🍲", correct: false }
            ]
        }
    ];

    let currHjemVisualIdx = 0;
    const visualMissionCard = document.createElement('div');
    visualMissionCard.className = 'exercise-card';

    function renderHjemVisualMission() {
        visualMissionCard.innerHTML = '';
        const mission = hjemVisualMissions[currHjemVisualIdx];

        const badge = document.createElement('div');
        badge.className = 'mission-badge';
        badge.textContent = `${mission.title} • Visuel Detektiv`;
        visualMissionCard.appendChild(badge);

        // Zoom viewfinder frame
        const zoomFrame = document.createElement('div');
        zoomFrame.className = 'detective-zoom-frame';
        zoomFrame.style.backgroundImage = "url('assets/verber_hjem_vrimmel.jpg')";
        zoomFrame.style.backgroundPosition = `${mission.cropX}% ${mission.cropY}%`;
        zoomFrame.innerHTML = `<div class="zoom-crosshair-badge">🎯 Fokus på handlingen</div>`;
        visualMissionCard.appendChild(zoomFrame);

        const clueBox = document.createElement('div');
        clueBox.className = 'mission-clue-box';
        clueBox.textContent = mission.question;
        visualMissionCard.appendChild(clueBox);

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
                        <button class="mission-next-btn" id="next-visual-hjem-btn">
                            ${currHjemVisualIdx < hjemVisualMissions.length - 1 ? 'Næste mission ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-visual-hjem-btn').onclick = () => {
                        currHjemVisualIdx = (currHjemVisualIdx + 1) % hjemVisualMissions.length;
                        renderHjemVisualMission();
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

        visualMissionCard.appendChild(grid);
        visualMissionCard.appendChild(feedbackBox);
    }

    renderHjemVisualMission();
    detektivPanel.appendChild(visualMissionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. TAB: FIND HANDLINGER I KONTEKST (Model 2)
    // ========================================================
    const handlingerPanel = document.createElement('div');
    handlingerPanel.className = 'verber-panel';
    handlingerPanel.dataset.panel = 'tab_handlinger';

    const hjemContextTasks = [
        {
            title: "Opgave 1 af 3: Morgenmad i køkkenet",
            prompt: "Find 3 handlinger, man gør ved morgenmaden i køkkenet:",
            targetCount: 3,
            options: [
                { text: "at spise 🥣", correct: true },
                { text: "at sove 🛌", correct: false },
                { text: "at drikke 🥛", correct: true },
                { text: "at køre bil 🚗", correct: false },
                { text: "at åbne (køleskab) 🚪", correct: true },
                { text: "at cykle 🚲", correct: false }
            ]
        },
        {
            title: "Opgave 2 af 3: Afslapning i stuen",
            prompt: "Find 3 handlinger, man gør for at slappe af i stuen:",
            targetCount: 3,
            options: [
                { text: "at løbe maraton 🏃", correct: false },
                { text: "at sidde 🛋️", correct: true },
                { text: "at ligge 🛏️", correct: true },
                { text: "at bygge vej 🔨", correct: false },
                { text: "at holde (en bog) 📖", correct: true },
                { text: "at købe billet 🎫", correct: false }
            ]
        },
        {
            title: "Opgave 3 af 3: Orden og ting i hjemmet",
            prompt: "Find 3 handlinger, man gør når man flytter og ordner ting i hjemmet:",
            targetCount: 3,
            options: [
                { text: "at sætte 🏺", correct: true },
                { text: "at lægge 📦", correct: true },
                { text: "at svømme 🏊", correct: false },
                { text: "at flytte 🛋️", correct: true },
                { text: "at flyve ✈️", correct: false },
                { text: "at danse opera 💃", correct: false }
            ]
        }
    ];

    let currContextTaskIdx = 0;
    const contextCard = document.createElement('div');
    contextCard.className = 'exercise-card';

    function renderHjemContextTask() {
        contextCard.innerHTML = '';
        const task = hjemContextTasks[currContextTaskIdx];
        let foundCount = 0;

        const badge = document.createElement('div');
        badge.className = 'mission-badge';
        badge.textContent = task.title;
        contextCard.appendChild(badge);

        const clueBox = document.createElement('div');
        clueBox.className = 'mission-clue-box';
        clueBox.textContent = task.prompt;
        contextCard.appendChild(clueBox);

        const progressPill = document.createElement('div');
        progressPill.className = 'context-progress-pill';
        progressPill.textContent = `Fundet: 0 af ${task.targetCount}`;
        contextCard.appendChild(progressPill);

        const chipsGrid = document.createElement('div');
        chipsGrid.className = 'context-chips-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.style.marginTop = '1.2rem';

        task.options.forEach(opt => {
            const chip = document.createElement('button');
            chip.className = 'context-chip-btn';
            chip.textContent = opt.text;

            chip.onclick = () => {
                if (chip.classList.contains('found')) return;

                if (opt.correct) {
                    chip.classList.add('found');
                    foundCount++;
                    progressPill.textContent = `Fundet: ${foundCount} af ${task.targetCount}`;

                    if (foundCount === task.targetCount) {
                        chipsGrid.querySelectorAll('.context-chip-btn').forEach(b => {
                            if (!b.classList.contains('found')) b.style.opacity = '0.4';
                        });
                        feedbackBox.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.8rem;">
                                ✓ Rigtigt svaret! Du fandt alle 3 handlinger!
                            </div>
                            <button class="mission-next-btn" id="next-context-hjem-btn">
                                ${currContextTaskIdx < hjemContextTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                            </button>
                        `;
                        feedbackBox.querySelector('#next-context-hjem-btn').onclick = () => {
                            currContextTaskIdx = (currContextTaskIdx + 1) % hjemContextTasks.length;
                            renderHjemContextTask();
                        };
                    }
                } else {
                    chip.classList.add('wrong-shake');
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-size: 1.05rem; font-weight: 700;">
                            ✗ Ikke i denne situation. Prøv igen!
                        </div>
                    `;
                    setTimeout(() => chip.classList.remove('wrong-shake'), 600);
                }
            };

            chipsGrid.appendChild(chip);
        });

        contextCard.appendChild(chipsGrid);
        contextCard.appendChild(feedbackBox);
    }

    renderHjemContextTask();
    handlingerPanel.appendChild(contextCard);
    panelsHolder.appendChild(handlingerPanel);

    // ========================================================
    // --- 4. TAB: HISTORIE (Byg en historie - INGEN TTS)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'verber-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const hjemStories = [
        {
            title: "1. En god morgen",
            steps: [
                {
                    q: "1. Hvad gør pigen da hun vågner?",
                    options: [
                        { text: "Hun strækker armene og står op 🌅", correct: true },
                        { text: "Hun svømmer i søen 🏊", correct: false },
                        { text: "Hun cykler i skoven 🚲", correct: false }
                    ]
                },
                {
                    q: "2. Hvad spiser hun ved spisebordet?",
                    options: [
                        { text: "Hun spiser en skål mysli med mælk 🥣", correct: true },
                        { text: "Hun spiser en bog 📖", correct: false },
                        { text: "Hun spiser en kuffert 🧳", correct: false }
                    ]
                },
                {
                    q: "3. Hvad drikker hun bagefter?",
                    options: [
                        { text: "Hun drikker et glas juice 🧃", correct: true },
                        { text: "Hun taber stolen 🪑", correct: false },
                        { text: "Hun råber ad døren 🚪", correct: false }
                    ]
                }
            ]
        },
        {
            title: "2. I køkkenet",
            steps: [
                {
                    q: "1. Hvad åbner faren for at finde mælk?",
                    options: [
                        { text: "Han åbner det store køleskab 🥛", correct: true },
                        { text: "Han åbner vinduet og hopper ud 🪟", correct: false },
                        { text: "Han åbner en skraldespand 🗑️", correct: false }
                    ]
                },
                {
                    q: "2. Hvad tager han ud af køleskabet?",
                    options: [
                        { text: "Han tager en karton kold mælk 🥛", correct: true },
                        { text: "Han tager en cykel ud 🚲", correct: false },
                        { text: "Han tager en sko ud 👟", correct: false }
                    ]
                },
                {
                    q: "3. Hvad giver han til sin datter?",
                    options: [
                        { text: "Han giver hende et glas mælk 🥛", correct: true },
                        { text: "Han kaster mælken på gulvet ❌", correct: false },
                        { text: "Han gemmer sig i skabet 🙈", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. Læsestund i stuen",
            steps: [
                {
                    q: "1. Hvor sidder bedstemor henne?",
                    options: [
                        { text: "Hun sidder i den bløde lænestol 🛋️", correct: true },
                        { text: "Hun sidder på taget ⛺", correct: false },
                        { text: "Hun svømmer under bordet 🏊", correct: false }
                    ]
                },
                {
                    q: "2. Hvad holder hun i sine hænder?",
                    options: [
                        { text: "Hun holder en god bog 📖", correct: true },
                        { text: "Hun holder en hammer 🔨", correct: false },
                        { text: "Hun holder en bil 🚗", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør katten ved hendes fødder?",
                    options: [
                        { text: "Katten ligger og sover på tæppet 🐱", correct: true },
                        { text: "Katten flyver væk 🦅", correct: false },
                        { text: "Katten laver mad 🍳", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. Oprydning og pynt",
            steps: [
                {
                    q: "1. Hvad flytter manden over på hylden?",
                    options: [
                        { text: "Han flytter en smuk blomstervase 🌸", correct: true },
                        { text: "Han flytter et helt hus 🏠", correct: false },
                        { text: "Han flytter et tog 🚆", correct: false }
                    ]
                },
                {
                    q: "2. Hvor sætter han vasen?",
                    options: [
                        { text: "Han sætter den forsigtigt på reolen 📚", correct: true },
                        { text: "Han kaster den ud ad vinduet 🗑️", correct: false },
                        { text: "Han gemmer den i ovnen 🍕", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør han da han er færdig?",
                    options: [
                        { text: "Han smiler og beundrer stuen 😊", correct: true },
                        { text: "Han løber sin vej 🏃", correct: false },
                        { text: "Han sover på bordet 😴", correct: false }
                    ]
                }
            ]
        }
    ];

    let currHjemStoryIdx = 0;
    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';

    function renderActiveHjemStory() {
        storyContainer.innerHTML = '';
        const story = hjemStories[currHjemStoryIdx];

        const navBar = document.createElement('div');
        navBar.className = 'story-nav-pills';
        hjemStories.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = `story-nav-btn ${idx === currHjemStoryIdx ? 'active' : ''}`;
            btn.textContent = `Historie ${idx + 1}`;
            btn.onclick = () => {
                currHjemStoryIdx = idx;
                renderActiveHjemStory();
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
            stepCard.id = `hjem-step-${sIdx}`;
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

                        const nextCard = stepsHolder.querySelector(`#hjem-step-${sIdx + 1}`);
                        if (nextCard) {
                            nextCard.style.opacity = '1';
                            nextCard.style.pointerEvents = 'auto';
                            nextCard.classList.add('active-step');
                        } else {
                            const completeBox = storyContainer.querySelector('#hjem-story-complete');
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
        completeBox.id = 'hjem-story-complete';
        completeBox.className = 'story-explanation-box';
        completeBox.style.display = 'none';
        completeBox.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: #4ade80;">
                🎉 Flot klaret! Du har gennemført historien.
            </div>
            <button class="mission-next-btn" id="next-hjem-story-btn">
                ${currHjemStoryIdx < hjemStories.length - 1 ? 'Gå til næste historie ➔' : 'Start forfra 🔄'}
            </button>
        `;
        storyContainer.appendChild(completeBox);

        completeBox.querySelector('#next-hjem-story-btn').onclick = () => {
            currHjemStoryIdx = (currHjemStoryIdx + 1) % hjemStories.length;
            renderActiveHjemStory();
        };
    }

    renderActiveHjemStory();
    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 5. TAB: SYNONYMER & ANTONYMER (INGEN TTS)
    // ========================================================
    const synonymPanel = document.createElement('div');
    synonymPanel.className = 'verber-panel';
    synonymPanel.dataset.panel = 'tab_synonym_antonym';

    const hjemSynonymTasks = [
        {
            type: 'antonym',
            word: 'at åbne',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at lukke 🚪', correct: true },
                { text: 'at se 👀', correct: false },
                { text: 'at drikke 🥛', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at sidde',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at stå 🧍', correct: true },
                { text: 'at sove 🛌', correct: false },
                { text: 'at spise 🍽️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at give',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at tage 🤲', correct: true },
                { text: 'at smile 😊', correct: false },
                { text: 'at bage 🥐', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at sætte',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at placere 🏺', correct: true },
                { text: 'at tabe ❌', correct: false },
                { text: 'at råbe 📢', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at lave mad',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at tilberede 🍳', correct: true },
                { text: 'at vaske tøj 🧺', correct: false },
                { text: 'at sove 😴', correct: false }
            ]
        }
    ];

    let currHjemSynonymIdx = 0;
    const synonymCard = document.createElement('div');
    synonymCard.className = 'synonym-card';

    function renderHjemSynonymTask() {
        synonymCard.innerHTML = '';
        const task = hjemSynonymTasks[currHjemSynonymIdx];

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
                        <button class="mission-next-btn" id="next-hjem-synonym-btn">
                            ${currHjemSynonymIdx < hjemSynonymTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-hjem-synonym-btn').onclick = () => {
                        currHjemSynonymIdx = (currHjemSynonymIdx + 1) % hjemSynonymTasks.length;
                        renderHjemSynonymTask();
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

    renderHjemSynonymTask();
    synonymPanel.appendChild(synonymCard);
    panelsHolder.appendChild(synonymPanel);

    // ========================================================
    // --- 6. TAB: SÆTNINGSBYGGER (Grammatisk puslespil - INGEN TTS)
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'verber-panel';
    saetningPanel.dataset.panel = 'tab_saetning';

    const hjemSentenceTasks = [
        {
            subjekt: "Pigen",
            correctVerb: "spiser",
            wrongVerbs: ["cykler", "læser i"],
            objekt: "sin morgenmad",
            adverbial: "ved bordet"
        },
        {
            subjekt: "Manden",
            correctVerb: "tager",
            wrongVerbs: ["koger", "sover på"],
            objekt: "en kold mælk",
            adverbial: "fra køleskabet"
        },
        {
            subjekt: "Bedstemor",
            correctVerb: "sidder",
            wrongVerbs: ["kaster", "hopper"],
            objekt: "i lænestolen",
            adverbial: "hele morgenen"
        },
        {
            subjekt: "Faren",
            correctVerb: "sætter",
            wrongVerbs: ["drikker", "synger"],
            objekt: "en flot vase",
            adverbial: "på reolen"
        }
    ];

    let currHjemSentenceIdx = 0;
    const sentenceCard = document.createElement('div');
    sentenceCard.className = 'sentence-builder-card';

    function renderHjemSentenceBuilder() {
        sentenceCard.innerHTML = '';
        const task = hjemSentenceTasks[currHjemSentenceIdx];

        sentenceCard.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div class="mission-badge">Sætningsbygger ${currHjemSentenceIdx + 1} af ${hjemSentenceTasks.length}</div>
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
                <div class="builder-slot-box slot-verbum" id="hjem-builder-verb-slot">
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
                <div class="tray-chips-list" id="hjem-verb-options-tray"></div>
            </div>

            <div class="live-sentence-preview" id="hjem-preview-box">
                <span id="hjem-preview-text">Vælg et verbum ovenfor for at færdiggøre sætningen...</span>
            </div>
            <div id="hjem-builder-feedback" style="margin-top: 1rem; text-align: center;"></div>
        `;

        const verbTray = sentenceCard.querySelector('#hjem-verb-options-tray');
        const verbSlot = sentenceCard.querySelector('#hjem-builder-verb-slot');
        const previewText = sentenceCard.querySelector('#hjem-preview-text');
        const feedbackEl = sentenceCard.querySelector('#hjem-builder-feedback');

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
                        <button class="mission-next-btn" id="next-hjem-builder-btn">
                            ${currHjemSentenceIdx < hjemSentenceTasks.length - 1 ? 'Næste sætning ➔' : 'Start forfra 🔄'}
                        </button>
                    `;
                    verbTray.querySelectorAll('.tray-chip-btn').forEach(b => b.style.pointerEvents = 'none');

                    feedbackEl.querySelector('#next-hjem-builder-btn').onclick = () => {
                        currHjemSentenceIdx = (currHjemSentenceIdx + 1) % hjemSentenceTasks.length;
                        renderHjemSentenceBuilder();
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

    renderHjemSentenceBuilder();
    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    // ========================================================
    // --- 7. TAB: NUTID & DATID (Tidsmarkør-træning - INGEN TTS)
    // ========================================================
    const tidBoejningPanel = document.createElement('div');
    tidBoejningPanel.className = 'verber-panel';
    tidBoejningPanel.dataset.panel = 'tab_tid_boejning';

    const hjemTidTasks = [
        {
            marker: "I morges",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I morges",
            sentenceAfter: "manden mælken ud af køleskabet.",
            baseVerb: "at tage",
            options: [
                { text: "tog", form: "Datid", correct: true },
                { text: "tager", form: "Nutid", correct: false }
            ],
            explanation: '"I morges" viser, at handlingen skete tidligere (fortid), så verbet skal stå i datid (tog).'
        },
        {
            marker: "Lige nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Lige nu",
            sentenceAfter: "pigen ved spisebordet og spiser.",
            baseVerb: "at sidde",
            options: [
                { text: "sidder", form: "Nutid", correct: true },
                { text: "sad", form: "Datid", correct: false }
            ],
            explanation: '"Lige nu" viser, at handlingen sker i dette øjeblik, så verbet skal stå i nutid (sidder).'
        },
        {
            marker: "I går",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I går",
            sentenceAfter: "kvinden aftensmaden klar klokken seks.",
            baseVerb: "at gøre",
            options: [
                { text: "gjorde", form: "Datid", correct: true },
                { text: "gør", form: "Nutid", correct: false }
            ],
            explanation: '"I går" viser, at handlingen skete i fortiden, så verbet skal stå i datid (gjorde).'
        },
        {
            marker: "Hver morgen",
            hint: "peger på en vane / nutid ➔ Nutid",
            sentenceBefore: "Hver morgen",
            sentenceAfter: "han en kop varm kaffe i køkkenet.",
            baseVerb: "at drikke",
            options: [
                { text: "drikker", form: "Nutid", correct: true },
                { text: "drak", form: "Datid", correct: false }
            ],
            explanation: '"Hver morgen" viser en gentagen vane i nutid, så verbet skal stå i nutid (drikker).'
        },
        {
            marker: "I går aftes",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I går aftes",
            sentenceAfter: "katten på det bløde gulvtæppe.",
            baseVerb: "at ligge",
            options: [
                { text: "lå", form: "Datid", correct: true },
                { text: "ligger", form: "Nutid", correct: false }
            ],
            explanation: '"I går aftes" viser en afsluttet handling i fortiden, så verbet skal stå i datid (lå).'
        },
        {
            marker: "Nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Nu",
            sentenceAfter: "familien dejlig morgenmad sammen.",
            baseVerb: "at spise",
            options: [
                { text: "spiser", form: "Nutid", correct: true },
                { text: "spiste", form: "Datid", correct: false }
            ],
            explanation: '"Nu" angiver nutid, så verbet skal stå i nutid (spiser).'
        }
    ];

    let currTidTaskIdx = 0;
    const tidCard = document.createElement('div');
    tidCard.className = 'exercise-card';

    function renderHjemTidTask() {
        tidCard.innerHTML = '';
        const task = hjemTidTasks[currTidTaskIdx];

        const badge = document.createElement('div');
        badge.className = 'time-marker-badge';
        badge.textContent = `Opgave ${currTidTaskIdx + 1} af ${hjemTidTasks.length} • Tidsmarkør: "${task.marker}"`;
        tidCard.appendChild(badge);

        const heading = document.createElement('h3');
        heading.style.fontSize = '1.35rem';
        heading.style.color = '#f8fafc';
        heading.style.margin = '0.5rem 0 0.8rem';
        heading.textContent = `Vælg den rigtige form af ${task.baseVerb}:`;
        tidCard.appendChild(heading);

        const sentenceBox = document.createElement('div');
        sentenceBox.className = 'time-sentence-box';
        sentenceBox.innerHTML = `<mark>${task.sentenceBefore}</mark> ________ ${task.sentenceAfter} <span style="color: #94a3b8; font-size: 1.05rem;">(${task.baseVerb})</span>`;
        tidCard.appendChild(sentenceBox);

        const hintInfo = document.createElement('div');
        hintInfo.style.color = '#c084fc';
        hintInfo.style.fontSize = '0.95rem';
        hintInfo.style.fontWeight = '600';
        hintInfo.style.marginBottom = '1rem';
        hintInfo.textContent = `💡 Hint: "${task.marker}" ${task.hint}`;
        tidCard.appendChild(hintInfo);

        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'time-options-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.style.marginTop = '1.2rem';

        task.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'time-opt-btn';
            btn.innerHTML = `
                <span>${opt.text}</span>
                <span class="form-label">${opt.form}</span>
            `;

            btn.onclick = () => {
                if (opt.correct) {
                    btn.classList.add('correct');
                    optionsGrid.querySelectorAll('.time-opt-btn').forEach(b => b.style.pointerEvents = 'none');
                    sentenceBox.innerHTML = `<mark>${task.sentenceBefore}</mark> <strong style="color: #4ade80; text-decoration: underline;">${opt.text}</strong> ${task.sentenceAfter}`;
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">
                            ✓ Rigtigt svaret!
                        </div>
                        <div style="color: #94a3b8; font-size: 1rem; margin-bottom: 1rem;">
                            ${task.explanation}
                        </div>
                        <button class="mission-next-btn" id="next-tid-hjem-btn">
                            ${currTidTaskIdx < hjemTidTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-tid-hjem-btn').onclick = () => {
                        currTidTaskIdx = (currTidTaskIdx + 1) % hjemTidTasks.length;
                        renderHjemTidTask();
                    };
                } else {
                    btn.classList.add('wrong');
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-size: 1.1rem; font-weight: 700;">
                            ✗ Forkert svaret. Prøv igen!
                        </div>
                        <div style="color: #94a3b8; font-size: 0.95rem; margin-top: 0.3rem;">
                            Kig på tidsmarkøren "${task.marker}" - peger den på nuet eller fortiden?
                        </div>
                    `;
                    setTimeout(() => btn.classList.remove('wrong'), 700);
                }
            };

            optionsGrid.appendChild(btn);
        });

        tidCard.appendChild(optionsGrid);
        tidCard.appendChild(feedbackBox);
    }

    renderHjemTidTask();
    tidBoejningPanel.appendChild(tidCard);
    panelsHolder.appendChild(tidBoejningPanel);

    container.appendChild(viewContainer);
}
