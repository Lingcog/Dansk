import { getTranslation } from '../utils/i18n.js';

/**
 * VerberParkView - Didaktisk vrimlebillede for Scene 3: Parken & Udendørscaféen
 * Dækker 34 højfrekvente verber med infinitiv, nutid og datid.
 * 7 interaktive opgaveflader for maksimal pædagogisk progression.
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
        <h1>${getTranslation('top100_verber_scene4_title')}</h1>
        <p>${getTranslation('top100_verber_scene4_desc')}</p>
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
    // --- 20 VERBER I PARKEN & FRITIDEN (Scene 4) med DATID
    // ========================================================
    const parkVerber = [
        { word: 'at løbe', nutid: 'løber', datid: 'løb', x: 78, y: 65, sentence: 'Løberen løber hurtigt forbi bænken.' },
        { word: 'at spille', nutid: 'spiller', datid: 'spillede', x: 82, y: 60, sentence: 'Børnene spiller bold på plænen.' },
        { word: 'at vinde', nutid: 'vinder', datid: 'vandt', x: 85, y: 58, sentence: 'Holdet vinder fodboldkampen!' },
        { word: 'at tabe', nutid: 'taber', datid: 'tabte', x: 80, y: 70, sentence: 'Pigen taber bolden på græsset.' },
        { word: 'at kaste', nutid: 'kaster', datid: 'kastede', x: 86, y: 50, sentence: 'Drengen kaster en pind til sin hund.' },
        { word: 'at gribe', nutid: 'griber', datid: 'greb', x: 88, y: 55, sentence: 'Hunden griber pinden i luften.' },
        { word: 'at nyde', nutid: 'nyder', datid: 'nød', x: 26, y: 60, sentence: 'Gæsterne nyder den dejlige formiddag.' },
        { word: 'at føle', nutid: 'føler', datid: 'følte', x: 48, y: 50, sentence: 'Hun føler varmen fra solen.' },
        { word: 'at mærke', nutid: 'mærker', datid: 'mærkede', x: 46, y: 60, sentence: 'Han mærker den bløde vind.' },
        { word: 'at skinne', nutid: 'skinner', datid: 'skinnede', x: 50, y: 10, sentence: 'Solen skinner fra en skyfri himmel.' },
        { word: 'at vokse', nutid: 'vokser', datid: 'voksede', x: 62, y: 35, sentence: 'Træerne vokser sig store og grønne.' },
        { word: 'at leve', nutid: 'lever', datid: 'levede', x: 50, y: 25, sentence: 'Fuglene lever frit i træerne.' },
        { word: 'at elske', nutid: 'elsker', datid: 'elskede', x: 38, y: 58, sentence: 'De elsker at gå ture i den smukke park.' },
        { word: 'at ønske', nutid: 'ønsker', datid: 'ønskede', x: 28, y: 50, sentence: 'Hun ønsker sig en dejlig sommer.' },
        { word: 'at prøve', nutid: 'prøver', datid: 'prøvede', x: 22, y: 72, sentence: 'Hun prøver en ny rute gennem parken.' },
        { word: 'at opleve', nutid: 'oplever', datid: 'oplevede', x: 55, y: 45, sentence: 'De oplever den dejlige forårsdag.' },
        { word: 'at fortælle', nutid: 'fortæller', datid: 'fortalte', x: 32, y: 62, sentence: 'Bedstefar fortæller en sjov historie på bænken.' },
        { word: 'at tro', nutid: 'tror', datid: 'troede', x: 25, y: 55, sentence: 'Jeg tror solen skinner hele eftermiddagen.' },
        { word: 'at kende', nutid: 'kender', datid: 'kendte', x: 42, y: 65, sentence: 'De kender hinanden rigtig godt fra kvarteret.' },
        { word: 'at ændre', nutid: 'ændrer', datid: 'ændrede', x: 55, y: 15, sentence: 'Vejret ændrer sig hurtigt over parken.' }
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
    img.alt = 'Parken og caféen vrimlebillede';
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
                    <button class="listen-word-btn" id="listen-park-verb-btn">
                        <span>🔊</span> Hør målord
                    </button>
                </div>
            `;

            detailCard.querySelector('#listen-park-verb-btn').onclick = () => {
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

    const parkVisualMissions = [
        {
            title: "Mission 1 af 8",
            cropX: 82,
            cropY: 60,
            question: "Kig på børnene på den grønne græsplæne. Hvad gør de?",
            options: [
                { text: "Spiller bold sammen på plænen ⚽", correct: true },
                { text: "Arbejder på kontor ved en computer 💻", correct: false },
                { text: "Køber togbilletter i automaten 🎫", correct: false }
            ]
        },
        {
            title: "Mission 2 af 8",
            cropX: 78,
            cropY: 65,
            question: "Kig på personen i sportstøjet på stien. Hvad gør personen?",
            options: [
                { text: "Løber hurtigt forbi bænken 🏃", correct: true },
                { text: "Ligger og sover på jorden 😴", correct: false },
                { text: "Kører i en rød bus 🚌", correct: false }
            ]
        },
        {
            title: "Mission 3 af 8",
            cropX: 86,
            cropY: 50,
            question: "Kig på drengen og hunden i det grønne. Hvad gør drengen?",
            options: [
                { text: "Kaster en pind til hunden 🤾", correct: true },
                { text: "Skriver med en kuglepen ✍️", correct: false },
                { text: "Vasker vinduer med sæbe 🧽", correct: false }
            ]
        },
        {
            title: "Mission 4 af 8",
            cropX: 32,
            cropY: 62,
            question: "Kig på den ældre mand på bænken. Hvad gør han?",
            options: [
                { text: "Fortæller en historie til barnet 💬", correct: true },
                { text: "Svømmer i det kolde vand 🏊", correct: false },
                { text: "Taler i mikrofon på scenen 🎤", correct: false }
            ]
        },
        {
            title: "Mission 5 af 8",
            cropX: 26,
            cropY: 60,
            question: "Kig på de to personer på picnictæppet i det grønne. Hvad gør de?",
            options: [
                { text: "Nyder det gode vejr og den varme sol ☀️", correct: true },
                { text: "Sover i et mørkt værelse 🛌", correct: false },
                { text: "Vasker gulv med spand og klud 🧼", correct: false }
            ]
        },
        {
            title: "Mission 6 af 8",
            cropX: 86,
            cropY: 50,
            question: "Kig på pigen der kaster frisbee over græsplænen. Hvad gør hun?",
            options: [
                { text: "Kaster frisbee’en højt op i luften mod sin ven 🥏", correct: true },
                { text: "Kører i en bus 🚌", correct: false },
                { text: "Laver mad over bål 🔥", correct: false }
            ]
        },
        {
            title: "Mission 7 af 8",
            cropX: 88,
            cropY: 55,
            question: "Kig på drengen der strækker armene ud for at fange bolden. Hvad gør han?",
            options: [
                { text: "Griber bolden sikkert i luften 🧤", correct: true },
                { text: "Læser en tyk avis 📰", correct: false },
                { text: "Svømmer over søen 🏊", correct: false }
            ]
        },
        {
            title: "Mission 8 af 8",
            cropX: 46,
            cropY: 60,
            question: "Kig på vandreren der standser op på stien. Hvad mærker han?",
            options: [
                { text: "Føler og mærker den milde forårsvind 🌿", correct: true },
                { text: "Tænder en radiator 🔌", correct: false },
                { text: "Kører på elektrisk løbehjul 🛴", correct: false }
            ]
        }
    ];

    let currParkVisualIdx = 0;
    const visualMissionCard = document.createElement('div');
    visualMissionCard.className = 'exercise-card';

    function renderParkVisualMission() {
        visualMissionCard.innerHTML = '';
        const mission = parkVisualMissions[currParkVisualIdx];

        const badge = document.createElement('div');
        badge.className = 'mission-badge';
        badge.textContent = `${mission.title} • Visuel Detektiv`;
        visualMissionCard.appendChild(badge);

        // Zoom viewfinder frame
        const zoomFrame = document.createElement('div');
        zoomFrame.className = 'detective-zoom-frame';
        zoomFrame.style.backgroundImage = "url('assets/verber_park_vrimmel.jpg')";
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
                        <button class="mission-next-btn" id="next-visual-park-btn">
                            ${currParkVisualIdx < parkVisualMissions.length - 1 ? 'Næste mission ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-visual-park-btn').onclick = () => {
                        currParkVisualIdx = (currParkVisualIdx + 1) % parkVisualMissions.length;
                        renderParkVisualMission();
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

    renderParkVisualMission();
    detektivPanel.appendChild(visualMissionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. TAB: FIND HANDLINGER I KONTEKST (Model 2)
    // ========================================================
    const handlingerPanel = document.createElement('div');
    handlingerPanel.className = 'verber-panel';
    handlingerPanel.dataset.panel = 'tab_handlinger';

    const parkContextTasks = [
        {
            title: "Opgave 1 af 10: Sanser og oplevelser i parken",
            prompt: "Find 3 handlinger, der udtrykker sanser og følelser i naturen:",
            targetCount: 3,
            options: [
                { text: "at nyde ☀️", correct: true },
                { text: "at betale penge 💳", correct: false },
                { text: "at føle ❤️", correct: true },
                { text: "at lukke dør 🚪", correct: false },
                { text: "at mærke 🌬️", correct: true },
                { text: "at købe billet 🎫", correct: false }
            ]
        },
        {
            title: "Opgave 2 af 10: Sport og bevægelse på plænen",
            prompt: "Find 3 handlinger, man gør under boldspil og sport i parken:",
            targetCount: 3,
            options: [
                { text: "at sove 🛌", correct: false },
                { text: "at spille ⚽", correct: true },
                { text: "at løbe 🏃", correct: true },
                { text: "at skrive lektier ✍️", correct: false },
                { text: "at vinde 🏆", correct: true },
                { text: "at vaske op 🍽️", correct: false }
            ]
        },
        {
            title: "Opgave 3 af 10: Leg med bold og hund",
            prompt: "Find 3 handlinger, man gør når man kaster og leger i parken:",
            targetCount: 3,
            options: [
                { text: "at kaste 🤾", correct: true },
                { text: "at gribe 🐕", correct: true },
                { text: "at tabe ❌", correct: true },
                { text: "at køre tog 🚆", correct: false },
                { text: "at taste kode 💻", correct: false },
                { text: "at reparere cykel 🔧", correct: false }
            ]
        },
        {
            title: "Opgave 4 af 10: Sport og konkurrence",
            prompt: "Find 3 handlinger, der har med spil og konkurrence at gøre:",
            targetCount: 3,
            options: [
                { text: "at spille fodbold ⚽", correct: true },
                { text: "at vinde en pokal 🏆", correct: true },
                { text: "at sove 😴", correct: false },
                { text: "at tabe en kamp 🥈", correct: true },
                { text: "at bage boller 🥐", correct: false },
                { text: "at spise kage 🍰", correct: false }
            ]
        },
        {
            title: "Opgave 5 af 10: Boldleg og motorik",
            prompt: "Find 3 handlinger, man typisk udfører med en bold:",
            targetCount: 3,
            options: [
                { text: "at kaste bolden ⚾", correct: true },
                { text: "at sove i sengen 🛏️", correct: false },
                { text: "at gribe den med handsken 🧤", correct: true },
                { text: "at sparke med foden 👟", correct: true },
                { text: "at male med pensel 🎨", correct: false },
                { text: "at synge opera 🎤", correct: false }
            ]
        },
        {
            title: "Opgave 6 af 10: Følelser og velvære i det fri",
            prompt: "Find 3 handlinger, der beskriver følelser og nydelse:",
            targetCount: 3,
            options: [
                { text: "at nyde solen ☀️", correct: true },
                { text: "at cykle på gaden 🚲", correct: false },
                { text: "at føle glæde 💖", correct: true },
                { text: "at skrive e-mails ✍️", correct: false },
                { text: "at mærke den friske luft 🌿", correct: true },
                { text: "at tænde en pære 💡", correct: false }
            ]
        },
        {
            title: "Opgave 7 af 10: Naturens egne processer",
            prompt: "Find 3 handlinger, der sker i naturen helt af sig selv:",
            targetCount: 3,
            options: [
                { text: "at skinne fra himlen ☀️", correct: true },
                { text: "at køre bil 🚗", correct: false },
                { text: "at vokse sig stor 🌱", correct: true },
                { text: "at leve i skoven 🦋", correct: true },
                { text: "at betale med kort 💰", correct: false },
                { text: "at stege kød 🍳", correct: false }
            ]
        },
        {
            title: "Opgave 8 af 10: Håb, ønsker og kærlighed",
            prompt: "Find 3 handlinger, der handler om hjertet og drømme:",
            targetCount: 3,
            options: [
                { text: "at elske naturen ❤️", correct: true },
                { text: "at svømme over søen 🏊", correct: false },
                { text: "at ønske sig fred 🌟", correct: true },
                { text: "at tro på det bedste 🌈", correct: true },
                { text: "at koge kartofler 🍲", correct: false },
                { text: "at vaske vinduer 🧼", correct: false }
            ]
        },
        {
            title: "Opgave 9 af 10: Motion og træning i parken",
            prompt: "Find 3 handlinger, man gør for at få motion i parken:",
            targetCount: 3,
            options: [
                { text: "at løbe en tur 🏃", correct: true },
                { text: "at prøve en ny øvelse 💪", correct: true },
                { text: "at sove på bænken 🛌", correct: false },
                { text: "at strække kroppen ud 🧘", correct: true },
                { text: "at spise fastfood 🍔", correct: false },
                { text: "at råbe højt 📢", correct: false }
            ]
        },
        {
            title: "Opgave 10 af 10: Samtaler og historiefortælling",
            prompt: "Find 3 handlinger, to venner gør sammen på bænken:",
            targetCount: 3,
            options: [
                { text: "at fortælle historier 🗣️", correct: true },
                { text: "at klatre i en lygtepæl 🧗", correct: false },
                { text: "at lytte opmærksomt 👂", correct: true },
                { text: "at smile til hinanden 😊", correct: true },
                { text: "at bage kringle 🍞", correct: false },
                { text: "at svømme i fontænen 🌊", correct: false }
            ]
        }
    ];

    let currContextTaskIdx = 0;
    const contextCard = document.createElement('div');
    contextCard.className = 'exercise-card';

    function renderParkContextTask() {
        contextCard.innerHTML = '';
        const task = parkContextTasks[currContextTaskIdx];
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
                            <button class="mission-next-btn" id="next-context-park-btn">
                                ${currContextTaskIdx < parkContextTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                            </button>
                        `;
                        feedbackBox.querySelector('#next-context-park-btn').onclick = () => {
                            currContextTaskIdx = (currContextTaskIdx + 1) % parkContextTasks.length;
                            renderParkContextTask();
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

    renderParkContextTask();
    handlingerPanel.appendChild(contextCard);
    panelsHolder.appendChild(handlingerPanel);

    // ========================================================
    // --- 4. TAB: HISTORIE (Byg en historie - INGEN TTS)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'verber-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const parkStories = [
        {
            title: "1. Boldspil i parken",
            steps: [
                {
                    q: "1. Hvad laver børnene på græsplænen?",
                    options: [
                        { text: "De spiller bold sammen ⚽", correct: true },
                        { text: "De maler græsset blåt 🎨", correct: false },
                        { text: "De sover under bordet 😴", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør Peter med bolden?",
                    options: [
                        { text: "Han kaster bolden til sin ven 🤾", correct: true },
                        { text: "Han svømmer i søen 🏊", correct: false },
                        { text: "Han klatrer op i et træ 🌳", correct: false }
                    ]
                },
                {
                    q: "3. Hvad sker der i kampen til sidst?",
                    options: [
                        { text: "Vores hold vinder kampen 🏆", correct: true },
                        { text: "Bolden forvandler sig til en fugl 🐦", correct: false },
                        { text: "De løber væk i panik 🏃", correct: false }
                    ]
                }
            ]
        },
        {
            title: "2. Hunden henter pinden",
            steps: [
                {
                    q: "1. Hvad kaster drengen hen ad stien?",
                    options: [
                        { text: "Han kaster en lille pind 🤾", correct: true },
                        { text: "Han kaster sine sko væk 👟", correct: false },
                        { text: "Han kaster en bog i søen 📖", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør hunden i luften?",
                    options: [
                        { text: "Hunden griber pinden med munden 🐕", correct: true },
                        { text: "Hunden læser en avis 📰", correct: false },
                        { text: "Hunden kører i bil 🚗", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør han over for sin hund bagefter?",
                    options: [
                        { text: "Han roser og elsker sin hund ❤️", correct: true },
                        { text: "Han græder og går hjem 😢", correct: false },
                        { text: "Han gemmer sig i en busk 🌳", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. En forårsdag i parken",
            steps: [
                {
                    q: "1. Hvordan er vejret på himlen?",
                    options: [
                        { text: "Solen skinner fra en skyfri himmel ☀️", correct: true },
                        { text: "Det sner voldsomt ❄️", correct: false },
                        { text: "Månen falder ned 🌙", correct: false }
                    ]
                },
                {
                    q: "2. Hvad kan de besøgende mærke?",
                    options: [
                        { text: "De mærker den milde forårsvind 🌬️", correct: true },
                        { text: "De ser et spøgelse 👻", correct: false },
                        { text: "De ser en ubåd i græsset 🚢", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør folk i det grønne?",
                    options: [
                        { text: "De nyder den dejlige dag 🌿", correct: true },
                        { text: "De sover hele dagen i en seng 🛌", correct: false },
                        { text: "De smider deres penge væk 🪙", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. En fortælling på bænken",
            steps: [
                {
                    q: "1. Hvad gør den gamle bedstefar på bænken?",
                    options: [
                        { text: "Han fortæller en spændende historie 👴", correct: true },
                        { text: "Han hopper op og ned på bænken 🦘", correct: false },
                        { text: "Han sover i en barnevogn 👶", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør børnene imens?",
                    options: [
                        { text: "De lytter og oplever historien ✨", correct: true },
                        { text: "De råber og skriger højt 📢", correct: false },
                        { text: "De kaster deres jakker i søen 🧥", correct: false }
                    ]
                },
                {
                    q: "3. Hvad ønsker de sig, da historien er slut?",
                    options: [
                        { text: "De ønsker at høre mere 💭", correct: true },
                        { text: "De løber deres vej i vrede 🏃", correct: false },
                        { text: "De taber deres tasker 🎒", correct: false }
                    ]
                }
            ]
        },
        {
            title: "5. Fodboldkampen på plænen",
            steps: [
                {
                    q: "1. Hvad samles de unge for at gøre på den store græsplæne?",
                    options: [
                        { text: "De vil spille en spændende fodboldkamp sammen ⚽", correct: true },
                        { text: "De vil bygge en murstensskorsten 🧱", correct: false },
                        { text: "De vil sove i en hule 🕳️", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør målmanden, da det afgørende skud sendes afsted?",
                    options: [
                        { text: "Han springer op og griber bolden sikkert i luften 🧤", correct: true },
                        { text: "Han spiser en sandwich 🥪", correct: false },
                        { text: "Han gemmer sig bag et træ 🌳", correct: false }
                    ]
                },
                {
                    q: "3. Hvad råber holdkammeraterne, da dommeren fløjter af?",
                    options: [
                        { text: "De jubler og fejrer, at de vandt kampen 🏆", correct: true },
                        { text: "De kaster deres sko i søen 👟", correct: false },
                        { text: "De maler græsset gult 🎨", correct: false }
                    ]
                }
            ]
        },
        {
            title: "6. Solopgang over søen",
            steps: [
                {
                    q: "1. Hvad begynder at skinne over trækronerne tidligt om morgenen?",
                    options: [
                        { text: "Morgensolen skinner varmt og gyldent over vandet 🌅", correct: true },
                        { text: "En stor grøn laserkanon 🔫", correct: false },
                        { text: "Et blinkende neonskilt 💡", correct: false }
                    ]
                },
                {
                    q: "2. Hvad mærker motionisten, mens han løber på stien?",
                    options: [
                        { text: "Han mærker den rene friske luft fylde lungerne 🏃", correct: true },
                        { text: "Han mærker en tung sten i lommen 🪨", correct: false },
                        { text: "Han mærker at han svæver til månen 🌕", correct: false }
                    ]
                },
                {
                    q: "3. Hvad nyder han fra bænken ved søbredden bagefter?",
                    options: [
                        { text: "Han nyder den fredelige udsigt og stilheden 🌿", correct: true },
                        { text: "Han lytter til en larmende motorsav 🪚", correct: false },
                        { text: "Han smider sit ur i vandet ⏰", correct: false }
                    ]
                }
            ]
        },
        {
            title: "7. Det lille frø der voksede",
            steps: [
                {
                    q: "1. Hvad lægger pigen forsigtigt ned i parkens blomsterbed?",
                    options: [
                        { text: "Hun lægger et lille solsikkefrø i jorden 🌱", correct: true },
                        { text: "Hun lægger en gammel cykelslange 🚲", correct: false },
                        { text: "Hun lægger et stykke kridt 🖍️", correct: false }
                    ]
                },
                {
                    q: "2. Hvad sker der med planten efter regn og solskin?",
                    options: [
                        { text: "Planten vokser sig høj, stærk og flot 🌻", correct: true },
                        { text: "Den bliver til en kaffekande 🫖", correct: false },
                        { text: "Den flyver væk med vinden 💨", correct: false }
                    ]
                },
                {
                    q: "3. Hvad oplever forbipasserende, da den springer ud?",
                    options: [
                        { text: "De oplever en smuk blomst, som alle beundrer 🌸", correct: true },
                        { text: "De taber deres briller i græsset 👓", correct: false },
                        { text: "De klipper blomsten i stykker ✂️", correct: false }
                    ]
                }
            ]
        },
        {
            title: "8. Picnic under de store bøgetræer",
            steps: [
                {
                    q: "1. Hvor breder familien det store tæppe ud?",
                    options: [
                        { text: "De breder det ud i skyggen under bøgetræerne 🌳", correct: true },
                        { text: "De lægger det midt på kørebanen 🚗", correct: false },
                        { text: "De hænger det op i en flagstang 🚩", correct: false }
                    ]
                },
                {
                    q: "2. Hvad deler forældre og børn med hinanden fra kurven?",
                    options: [
                        { text: "De deler frisk frugt, brød og kold saft 🍎", correct: true },
                        { text: "De deler gamle aviser 📰", correct: false },
                        { text: "De deler grannåle 🌲", correct: false }
                    ]
                },
                {
                    q: "3. Hvad fortæller bedstefar børnene med et glimt i øjet?",
                    options: [
                        { text: "Han fortæller sjove og spændende historier fra sin barndom 📖", correct: true },
                        { text: "Han hvisker til en myre 🐜", correct: false },
                        { text: "Han råber ad skyerne ☁️", correct: false }
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
    // --- 5. TAB: SYNONYMER & ANTONYMER (INGEN TTS)
    // ========================================================
    const synonymPanel = document.createElement('div');
    synonymPanel.className = 'verber-panel';
    synonymPanel.dataset.panel = 'tab_synonym_antonym';

    const parkSynonymTasks = [
        {
            type: 'synonym',
            word: 'at føle',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at mærke 🌬️', correct: true },
                { text: 'at høre 👂', correct: false },
                { text: 'at smage 👅', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at prøve',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at forsøge 🎯', correct: true },
                { text: 'at råbe 🗣️', correct: false },
                { text: 'at sove 😴', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at elske',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at hade 💔', correct: true },
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
            word: 'at kaste',
            prompt: 'Hvilket verbum er et antonym / modstykke til:',
            options: [
                { text: 'at gribe 🤲', correct: true },
                { text: 'at gemme 📦', correct: false },
                { text: 'at se 👀', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at leve',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at dø 🥀', correct: true },
                { text: 'at hvile sig 🛋️', correct: false },
                { text: 'at ligge ned 🛏️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at vinde',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at tabe 🥈', correct: true },
                { text: 'at spille ⚽', correct: false },
                { text: 'at smile 😊', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at kaste',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at gribe 🧤', correct: true },
                { text: 'at løbe 🏃', correct: false },
                { text: 'at nyde ☀️', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at nyde',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at fryde sig over / værdsætte 🌸', correct: true },
                { text: 'at sove 🛌', correct: false },
                { text: 'at græde 😢', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at føle',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at mærke / sanse 🌿', correct: true },
                { text: 'at spise 🍽️', correct: false },
                { text: 'at køre 🚗', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at elske',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at hade 💔', correct: true },
                { text: 'at ønske 🌟', correct: false },
                { text: 'at tro 🤔', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at fortælle',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at berette / skildre 🗣️', correct: true },
                { text: 'at tie stille 🤫', correct: false },
                { text: 'at tabe ❌', correct: false }
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
    // --- 6. TAB: SÆTNINGSBYGGER (Grammatisk puslespil - INGEN TTS)
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'verber-panel';
    saetningPanel.dataset.panel = 'tab_saetning';

    const parkSentenceTasks = [
        {
            subjekt: "Gæsterne",
            correctVerb: "nyder",
            wrongVerbs: ["cykler", "læser"],
            objekt: "den dejlige sol",
            adverbial: "i parken"
        },
        {
            subjekt: "Børnene",
            correctVerb: "spiller",
            wrongVerbs: ["koger", "vasker"],
            objekt: "bold",
            adverbial: "på plænen"
        },
        {
            subjekt: "Løberen",
            correctVerb: "løber",
            wrongVerbs: ["sover", "svømmer"],
            objekt: "en lang tur",
            adverbial: "på grusstien"
        },
        {
            subjekt: "Drengen",
            correctVerb: "kaster",
            wrongVerbs: ["flyver", "kører"],
            objekt: "en pind",
            adverbial: "til hunden"
        },
        {
            subjekt: "Bedstefar",
            correctVerb: "fortæller",
            wrongVerbs: ["steger", "vasker"],
            objekt: "en sjov historie",
            adverbial: "på bænken"
        },
        {
            subjekt: "Børnene",
            correctVerb: "kaster",
            wrongVerbs: ["koger", "læser"],
            objekt: "bolden",
            adverbial: "til hinanden på plænen"
        },
        {
            subjekt: "Solen",
            correctVerb: "skinner",
            wrongVerbs: ["svømmer", "drikker"],
            objekt: "fra en skyfri himmel",
            adverbial: "hele eftermiddagen"
        },
        {
            subjekt: "Løberen",
            correctVerb: "mærker",
            wrongVerbs: ["steger", "cykler"],
            objekt: "den friske vind",
            adverbial: "på skovstien"
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

    // ========================================================
    // --- 7. TAB: NUTID & DATID (Tidsmarkør-træning - INGEN TTS)
    // ========================================================
    const tidBoejningPanel = document.createElement('div');
    tidBoejningPanel.className = 'verber-panel';
    tidBoejningPanel.dataset.panel = 'tab_tid_boejning';

    const parkTidTasks = [
        {
            marker: "I går aftes",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I går aftes",
            sentenceAfter: "vi en fantastisk solnedgang over søen.",
            baseVerb: "at opleve",
            options: [
                { text: "oplevede", form: "Datid", correct: true },
                { text: "oplever", form: "Nutid", correct: false }
            ],
            explanation: '"I går aftes" viser, at handlingen skete i fortiden, så verbet skal stå i datid (oplevede).'
        },
        {
            marker: "Lige nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Lige nu",
            sentenceAfter: "solen dejligt og varmer hele parken.",
            baseVerb: "at skinne",
            options: [
                { text: "skinner", form: "Nutid", correct: true },
                { text: "skinnede", form: "Datid", correct: false }
            ],
            explanation: '"Lige nu" viser, at handlingen sker i dette øjeblik, så verbet skal stå i nutid (skinner).'
        },
        {
            marker: "I søndags",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I søndags",
            sentenceAfter: "drengen sin kasket under den vilde leg.",
            baseVerb: "at tabe",
            options: [
                { text: "tabte", form: "Datid", correct: true },
                { text: "taber", form: "Nutid", correct: false }
            ],
            explanation: '"I søndags" viser, at handlingen skete i fortiden, så verbet skal stå i datid (tabte).'
        },
        {
            marker: "Hver eftermiddag",
            hint: "peger på en vane / nutid ➔ Nutid",
            sentenceBefore: "Hver eftermiddag",
            sentenceAfter: "gæsterne den friske luft på terrassen.",
            baseVerb: "at nyde",
            options: [
                { text: "nyder", form: "Nutid", correct: true },
                { text: "nød", form: "Datid", correct: false }
            ],
            explanation: '"Hver eftermiddag" viser en gentagen vane i nutid, så verbet skal stå i nutid (nyder).'
        },
        {
            marker: "For to timer siden",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "For to timer siden",
            sentenceAfter: "fodboldholdet den spændende kamp på plænen.",
            baseVerb: "at vinde",
            options: [
                { text: "vandt", form: "Datid", correct: true },
                { text: "vinder", form: "Nutid", correct: false }
            ],
            explanation: '"For to timer siden" viser en afsluttet handling i fortiden, så verbet skal stå i datid (vandt).'
        },
        {
            marker: "I dag",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "I dag",
            sentenceAfter: "motionisterne hurtigt rundt ad grusstierne.",
            baseVerb: "at løbe",
            options: [
                { text: "løber", form: "Nutid", correct: true },
                { text: "løb", form: "Datid", correct: false }
            ],
            explanation: '"I dag" angiver nutid, så verbet skal stå i nutid (løber).'
        },
        {
            marker: "Sidste søndag",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "Sidste søndag",
            sentenceAfter: "børnene en spændende fodboldkamp i parken.",
            baseVerb: "at spille",
            options: [
                { text: "spillede", form: "Datid", correct: true },
                { text: "spiller", form: "Nutid", correct: false }
            ],
            explanation: '"Sidste søndag" angiver fortid, så verbet skal stå i datid (spillede).'
        },
        {
            marker: "Lige nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Lige nu",
            sentenceAfter: "solen fantastisk over de grønne trækroner.",
            baseVerb: "at skinne",
            options: [
                { text: "skinner", form: "Nutid", correct: true },
                { text: "skinnede", form: "Datid", correct: false }
            ],
            explanation: '"Lige nu" viser nutid, så verbet skal stå i nutid (skinner).'
        },
        {
            marker: "I fjor",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I fjor",
            sentenceAfter: "det lille bøgetræ sig dobbelt så højt.",
            baseVerb: "at vokse",
            options: [
                { text: "voksede", form: "Datid", correct: true },
                { text: "vokser", form: "Nutid", correct: false }
            ],
            explanation: '"I fjor" betyder sidste år (fortid), så verbet skal stå i datid (voksede).'
        },
        {
            marker: "Hver sommer",
            hint: "peger på en vane / nutid ➔ Nutid",
            sentenceBefore: "Hver sommer",
            sentenceAfter: "mange familier den friske natur og bader.",
            baseVerb: "at nyde",
            options: [
                { text: "nyder", form: "Nutid", correct: true },
                { text: "nød", form: "Datid", correct: false }
            ],
            explanation: '"Hver sommer" angiver en vane i nutid, så verbet skal stå i nutid (nyder).'
        },
        {
            marker: "I går morges",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I går morges",
            sentenceAfter: "drengen bolden med begge hænder.",
            baseVerb: "at gribe",
            options: [
                { text: "greb", form: "Datid", correct: true },
                { text: "griber", form: "Nutid", correct: false }
            ],
            explanation: '"I går morges" peger på fortid, så verbet skal stå i datid (greb).'
        },
        {
            marker: "I dette øjeblik",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "I dette øjeblik",
            sentenceAfter: "fuglen frit i den blå luft.",
            baseVerb: "at leve",
            options: [
                { text: "lever", form: "Nutid", correct: true },
                { text: "levede", form: "Datid", correct: false }
            ],
            explanation: '"I dette øjeblik" angiver nutid, så verbet skal stå i nutid (lever).'
        }
    ];

    let currTidTaskIdx = 0;
    const tidCard = document.createElement('div');
    tidCard.className = 'exercise-card';

    function renderParkTidTask() {
        tidCard.innerHTML = '';
        const task = parkTidTasks[currTidTaskIdx];

        const badge = document.createElement('div');
        badge.className = 'time-marker-badge';
        badge.textContent = `Opgave ${currTidTaskIdx + 1} af ${parkTidTasks.length} • Tidsmarkør: "${task.marker}"`;
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
                        <button class="mission-next-btn" id="next-tid-park-btn">
                            ${currTidTaskIdx < parkTidTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-tid-park-btn').onclick = () => {
                        currTidTaskIdx = (currTidTaskIdx + 1) % parkTidTasks.length;
                        renderParkTidTask();
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

    renderParkTidTask();
    tidBoejningPanel.appendChild(tidCard);
    panelsHolder.appendChild(tidBoejningPanel);

    container.appendChild(viewContainer);
}
