import { getTranslation } from '../utils/i18n.js';

/**
 * VerberStationView - Didaktisk vrimlebillede for Scene 1: Banegården / Rejsen
 * Dækker 33 højfrekvente verber med infinitiv, nutid og datid.
 * 7 interaktive opgaveflader for maksimal pædagogisk progression.
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
        <h1>${getTranslation('top100_verber_scene5_title')}</h1>
        <p>${getTranslation('top100_verber_scene5_desc')}</p>
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
    // --- 20 VERBER PÅ BANEGÅRDEN (Scene 5) med DATID
    // ========================================================
    const stationVerber = [
        { word: 'at rejse', nutid: 'rejser', datid: 'rejste', x: 55, y: 50, sentence: 'Passagererne rejser sammen med toget til Jylland.' },
        { word: 'at trække', nutid: 'trækker', datid: 'trak', x: 38, y: 70, sentence: 'Kvinden trækker en tung rullekuffert.' },
        { word: 'at betale', nutid: 'betaler', datid: 'betalte', x: 12, y: 72, sentence: 'Kunden betaler med sit betalingskort.' },
        { word: 'at købe', nutid: 'køber', datid: 'købte', x: 10, y: 65, sentence: 'Manden køber en togbillet i automaten.' },
        { word: 'at sælge', nutid: 'sælger', datid: 'solgte', x: 8, y: 68, sentence: 'Kiosken sælger aviser og varme drikke.' },
        { word: 'at vælge', nutid: 'vælger', datid: 'valgte', x: 16, y: 58, sentence: 'Han vælger en god plads ved vinduet.' },
        { word: 'at gælde', nutid: 'gælder', datid: 'gjaldt', x: 25, y: 50, sentence: 'Billetten gælder i to timer fra nu.' },
        { word: 'at virke', nutid: 'virker', datid: 'virkede', x: 22, y: 45, sentence: 'Billetautomaten virker hurtigt og nemt.' },
        { word: 'at mangle', nutid: 'mangler', datid: 'manglede', x: 80, y: 78, sentence: 'Han mangler sit rejsekort i pungen.' },
        { word: 'at begynde', nutid: 'begynder', datid: 'begyndte', x: 50, y: 15, sentence: 'Rejsen mod vest begynder nu.' },
        { word: 'at starte', nutid: 'starter', datid: 'startede', x: 52, y: 20, sentence: 'Toget starter med at køre ud af hallen.' },
        { word: 'at slutte', nutid: 'slutter', datid: 'sluttede', x: 52, y: 22, sentence: 'Togrejsen slutter først sent i aften.' },
        { word: 'at kalde', nutid: 'kalder', datid: 'kaldte', x: 68, y: 30, sentence: 'Højttaleren kalder passagererne til sporet.' },
        { word: 'at bestemme', nutid: 'bestemmer', datid: 'bestemte', x: 30, y: 60, sentence: 'Køreplanen bestemmer afgangstidspunktet.' },
        { word: 'at skabe', nutid: 'skaber', datid: 'skabte', x: 65, y: 40, sentence: 'Rejsen skaber mange nye oplevelser.' },
        { word: 'at kunne', nutid: 'kan', datid: 'kunne', x: 82, y: 65, sentence: 'Han kan heldigvis nå toget til tiden.' },
        { word: 'at skulle', nutid: 'skal', datid: 'skulle', x: 60, y: 60, sentence: 'Passagererne skal vise gyldig billet.' },
        { word: 'at ville', nutid: 'vil', datid: 'ville', x: 22, y: 68, sentence: 'Kvinden vil købe en flaske vand i kiosken.' },
        { word: 'at blive', nutid: 'bliver', datid: 'blev', x: 70, y: 22, sentence: 'Toget bliver ikke forsinket i dag.' },
        { word: 'at få', nutid: 'får', datid: 'fik', x: 18, y: 70, sentence: 'Hun får sin togbillet udskrevet.' }
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
                    <button class="listen-word-btn" id="listen-station-verb-btn">
                        <span>🔊</span> Hør målord
                    </button>
                </div>
            `;

            detailCard.querySelector('#listen-station-verb-btn').onclick = () => {
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

    const stationVisualMissions = [
        {
            title: "Mission 1 af 4",
            cropX: 38,
            cropY: 70,
            question: "Kig på personen med den store rullekuffert på perronen. Hvad gør personen?",
            options: [
                { text: "Trækker kufferten hen over perronen 🧳", correct: true },
                { text: "Sover på en bænk ved sporet 🛌", correct: false },
                { text: "Spiser en sandwich i kiosken 🥪", correct: false }
            ]
        },
        {
            title: "Mission 2 af 4",
            cropX: 12,
            cropY: 72,
            question: "Kig på kunden ved kassen i stationskiosken. Hvad gør kunden?",
            options: [
                { text: "Kører i bus mod byen 🚌", correct: false },
                { text: "Betaler med sit kort for varerne 💳", correct: true },
                { text: "Løber en tur i parken 🏃", correct: false }
            ]
        },
        {
            title: "Mission 3 af 4",
            cropX: 10,
            cropY: 65,
            question: "Kig på manden ved automaten. Hvad gør han?",
            options: [
                { text: "Køber en togbillet i automaten 🎫", correct: true },
                { text: "Læser en avis i sengen 📖", correct: false },
                { text: "Skriver en besked på tavlen ✍️", correct: false }
            ]
        },
        {
            title: "Mission 4 af 4",
            cropX: 55,
            cropY: 50,
            question: "Kig på passagererne med billetterne på perronen. Hvad skal de?",
            options: [
                { text: "Skal rejse med toget mod Jylland 🚆", correct: true },
                { text: "Flytter møbler til en ny lejlighed 📦", correct: false },
                { text: "Svømmer i svømmehallen 🏊", correct: false }
            ]
        }
    ];

    let currStationVisualIdx = 0;
    const visualMissionCard = document.createElement('div');
    visualMissionCard.className = 'exercise-card';

    function renderStationVisualMission() {
        visualMissionCard.innerHTML = '';
        const mission = stationVisualMissions[currStationVisualIdx];

        const badge = document.createElement('div');
        badge.className = 'mission-badge';
        badge.textContent = `${mission.title} • Visuel Detektiv`;
        visualMissionCard.appendChild(badge);

        // Zoom viewfinder frame
        const zoomFrame = document.createElement('div');
        zoomFrame.className = 'detective-zoom-frame';
        zoomFrame.style.backgroundImage = "url('assets/verber_station_vrimmel.jpg')";
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
                        <button class="mission-next-btn" id="next-visual-station-btn">
                            ${currStationVisualIdx < stationVisualMissions.length - 1 ? 'Næste mission ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-visual-station-btn').onclick = () => {
                        currStationVisualIdx = (currStationVisualIdx + 1) % stationVisualMissions.length;
                        renderStationVisualMission();
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

    renderStationVisualMission();
    detektivPanel.appendChild(visualMissionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. TAB: FIND HANDLINGER I KONTEKST (Model 2)
    // ========================================================
    const handlingerPanel = document.createElement('div');
    handlingerPanel.className = 'verber-panel';
    handlingerPanel.dataset.panel = 'tab_handlinger';

    const stationContextTasks = [
        {
            title: "Opgave 1 af 3: I kiosken på banegården",
            prompt: "Find 3 handlinger, man kan gøre i kiosken på banegården:",
            targetCount: 3,
            options: [
                { text: "at købe 🛒", correct: true },
                { text: "at sove 🛌", correct: false },
                { text: "at betale 💳", correct: true },
                { text: "at svømme 🏊", correct: false },
                { text: "at vælge 🍫", correct: true },
                { text: "at cykle 🚲", correct: false }
            ]
        },
        {
            title: "Opgave 2 af 3: Billetautomaten og regler",
            prompt: "Find 3 handlinger, der handler om billetter og automater:",
            targetCount: 3,
            options: [
                { text: "at spise 🍽️", correct: false },
                { text: "at gælde (billetten) 🎫", correct: true },
                { text: "at virke (automaten) ⚙️", correct: true },
                { text: "at male 🎨", correct: false },
                { text: "at mangle (rejsekort) ❓", correct: true },
                { text: "at synge 🎵", correct: false }
            ]
        },
        {
            title: "Opgave 3 af 3: Rejsen og afgangen",
            prompt: "Find 3 handlinger, der har med rejsen og afgangen at gøre:",
            targetCount: 3,
            options: [
                { text: "at begynde (turen) 🎬", correct: true },
                { text: "at trække (kuffert) 🧳", correct: true },
                { text: "at rejse 🚆", correct: true },
                { text: "at lave mad 🍳", correct: false },
                { text: "at sove i seng 🛏️", correct: false },
                { text: "at bygge hus 🔨", correct: false }
            ]
        }
    ];

    let currContextTaskIdx = 0;
    const contextCard = document.createElement('div');
    contextCard.className = 'exercise-card';

    function renderStationContextTask() {
        contextCard.innerHTML = '';
        const task = stationContextTasks[currContextTaskIdx];
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
                            <button class="mission-next-btn" id="next-context-station-btn">
                                ${currContextTaskIdx < stationContextTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                            </button>
                        `;
                        feedbackBox.querySelector('#next-context-station-btn').onclick = () => {
                            currContextTaskIdx = (currContextTaskIdx + 1) % stationContextTasks.length;
                            renderStationContextTask();
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

    renderStationContextTask();
    handlingerPanel.appendChild(contextCard);
    panelsHolder.appendChild(handlingerPanel);

    // ========================================================
    // --- 4. TAB: HISTORIE (Byg en historie - INGEN TTS)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'verber-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const stationStories = [
        {
            title: "1. På perronen og rejsen",
            steps: [
                {
                    q: "1. Hvad skal passagererne i dag?",
                    options: [
                        { text: "De skal rejse med toget 🚆", correct: true },
                        { text: "Bilen flyver ✈️", correct: false },
                        { text: "Solen sover 🌙", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør manden med sin kuffert?",
                    options: [
                        { text: "De lægger sig på gulvet 😴", correct: false },
                        { text: "Han trækker den tunge kuffert 🧳", correct: true },
                        { text: "De svømmer 🏊", correct: false }
                    ]
                },
                {
                    q: "3. Hvad sker der når toget kører?",
                    options: [
                        { text: "Rejsen mod vest begynder nu 🚄", correct: true },
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
            title: "3. Billetten og automaten",
            steps: [
                {
                    q: "1. Hvordan virker billetautomaten i dag?",
                    options: [
                        { text: "Den virker nemt og hurtigt ⚙️", correct: true },
                        { text: "Den kaster med sten 🪨", correct: false },
                        { text: "Den sover i solen 😴", correct: false }
                    ]
                },
                {
                    q: "2. Hvilken plads vælger kunden?",
                    options: [
                        { text: "Han vælger en god plads ved vinduet 🪟", correct: true },
                        { text: "Han taber tasken i søen 🌊", correct: false },
                        { text: "Han kaster kufferten væk 🚀", correct: false }
                    ]
                },
                {
                    q: "3. Hvor længe gælder billetten?",
                    options: [
                        { text: "Billetten gælder i to timer fra nu 🎫", correct: true },
                        { text: "De løber væk 🏃", correct: false },
                        { text: "De sover på taget ⛺", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. Afgang mod vest",
            steps: [
                {
                    q: "1. Hvad kalder højttaleren ud på perronen?",
                    options: [
                        { text: "Højttaleren kalder passagererne til sporet 📢", correct: true },
                        { text: "Højttaleren synger vuggevise 🎵", correct: false },
                        { text: "Højttaleren græder højt 😭", correct: false }
                    ]
                },
                {
                    q: "2. Hvad bestemmer køreplanen for turen?",
                    options: [
                        { text: "Den bestemmer det præcise afgangstidspunkt ⏰", correct: true },
                        { text: "Den maler toget gult 🎨", correct: false },
                        { text: "Den svømmer 🏊", correct: false }
                    ]
                },
                {
                    q: "3. Hvad kan de rejsende glæde sig til?",
                    options: [
                        { text: "Turen skaber gode nye minder 🌟", correct: true },
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
    // --- 5. TAB: SYNONYMER & ANTONYMER (INGEN TTS)
    // ========================================================
    const synonymPanel = document.createElement('div');
    synonymPanel.className = 'verber-panel';
    synonymPanel.dataset.panel = 'tab_synonym_antonym';

    const stationSynonymTasks = [
        {
            type: 'synonym',
            word: 'at begynde',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at starte 🎬', correct: true },
                { text: 'at sove 🛌', correct: false },
                { text: 'at spise 🍽️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at starte',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at slutte 🛑', correct: true },
                { text: 'at løbe hurtigt 🏃', correct: false },
                { text: 'at synge 🎵', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at købe',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at sælge 🏷️', correct: true },
                { text: 'at betale 💳', correct: false },
                { text: 'at smile 😊', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at vælge',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at bestemme 🎯', correct: true },
                { text: 'at glemme 💭', correct: false },
                { text: 'at hente 📦', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at mangle',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at have (besidde) 💼', correct: true },
                { text: 'at miste ❌', correct: false },
                { text: 'at glemme ❓', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at kunne',
            prompt: 'Hvilket verbum udtrykker næsten det samme som (at have evne til):',
            options: [
                { text: 'at formå / magte 💪', correct: true },
                { text: 'at nægte 🙅', correct: false },
                { text: 'at sove 😴', correct: false }
            ]
        }
    ];

    let currStationSynonymIdx = 0;
    const synonymCard = document.createElement('div');
    synonymCard.className = 'synonym-card';

    function renderStationSynonymTask() {
        synonymCard.innerHTML = '';
        const task = stationSynonymTasks[currStationSynonymIdx];

        const badge = document.createElement('div');
        badge.className = `synonym-type-badge ${task.type === 'synonym' ? 'badge-type-synonym' : 'badge-type-antonym'}`;
        badge.textContent = task.type === 'synonym' ? 'Synonym (Betyder næsten det samme)' : 'Antonym (Det modsatte)';
        synonymCard.appendChild(badge);

        const promptText = document.createElement('p');
        promptText.style.color = '#94a3b8';
        promptText.style.fontSize = '1.1rem';
        promptText.textContent = task.prompt;
        synonymCard.appendChild(promptText);

        const targetWord = document.createElement('div');
        targetWord.className = 'synonym-target-word';
        targetWord.innerHTML = `<span>${task.word}</span>`;
        synonymCard.appendChild(targetWord);

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
                        <button class="mission-next-btn" id="next-station-synonym-btn">
                            ${currStationSynonymIdx < stationSynonymTasks.length - 1 ? 'Næste opgave ➔' : 'Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-station-synonym-btn').onclick = () => {
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
    // --- 6. TAB: SÆTNINGSBYGGER (Grammatisk puslespil - INGEN TTS)
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'verber-panel';
    saetningPanel.dataset.panel = 'tab_saetning';

    const stationSentenceTasks = [
        {
            subjekt: "Passagererne",
            correctVerb: "rejser",
            wrongVerbs: ["spiser", "sover"],
            objekt: "mod Odense",
            adverbial: "klokken to"
        },
        {
            subjekt: "Kunden",
            correctVerb: "betaler",
            wrongVerbs: ["cykler", "svømmer"],
            objekt: "med sit kort",
            adverbial: "i kiosken"
        },
        {
            subjekt: "Kvinden",
            correctVerb: "trækker",
            wrongVerbs: ["kaster", "falder"],
            objekt: "en tung kuffert",
            adverbial: "over perronen"
        },
        {
            subjekt: "Manden",
            correctVerb: "køber",
            wrongVerbs: ["flyver", "drikker"],
            objekt: "en togbillet",
            adverbial: "i automaten"
        },
        {
            subjekt: "Togrejsen",
            correctVerb: "begynder",
            wrongVerbs: ["slutter", "hopper"],
            objekt: "med afgang",
            adverbial: "fra spor 2"
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

    // ========================================================
    // --- 7. TAB: NUTID & DATID (Tidsmarkør-træning - INGEN TTS)
    // ========================================================
    const tidBoejningPanel = document.createElement('div');
    tidBoejningPanel.className = 'verber-panel';
    tidBoejningPanel.dataset.panel = 'tab_tid_boejning';

    const stationTidTasks = [
        {
            marker: "I går",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I går",
            sentenceAfter: "Jens sin tunge kuffert hurtigt gennem banegården.",
            baseVerb: "at trække",
            options: [
                { text: "trak", form: "Datid", correct: true },
                { text: "trækker", form: "Nutid", correct: false }
            ],
            explanation: '"I går" viser, at handlingen skete i fortiden, så verbet skal stå i datid (trak).'
        },
        {
            marker: "Lige nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Lige nu",
            sentenceAfter: "han sit rejsekort i pungen.",
            baseVerb: "at mangle",
            options: [
                { text: "mangler", form: "Nutid", correct: true },
                { text: "manglede", form: "Datid", correct: false }
            ],
            explanation: '"Lige nu" viser, at situationen er i dette øjeblik, så verbet skal stå i nutid (mangler).'
        },
        {
            marker: "I morges",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I morges",
            sentenceAfter: "kunden med sit betalingskort i stationskiosken.",
            baseVerb: "at betale",
            options: [
                { text: "betalte", form: "Datid", correct: true },
                { text: "betaler", form: "Nutid", correct: false }
            ],
            explanation: '"I morges" viser, at handlingen skete tidligere på dagen (fortid), så verbet skal stå i datid (betalte).'
        },
        {
            marker: "Hver dag",
            hint: "peger på en vane / nutid ➔ Nutid",
            sentenceBefore: "Hver dag",
            sentenceAfter: "rejsen mod vest klokken otte.",
            baseVerb: "at begynde",
            options: [
                { text: "begynder", form: "Nutid", correct: true },
                { text: "begyndte", form: "Datid", correct: false }
            ],
            explanation: '"Hver dag" viser en gentagen vane i nutid, så verbet skal stå i nutid (begynder).'
        },
        {
            marker: "Sidste uge",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "Sidste uge",
            sentenceAfter: "familien til Jylland med toget.",
            baseVerb: "at rejse",
            options: [
                { text: "rejste", form: "Datid", correct: true },
                { text: "rejser", form: "Nutid", correct: false }
            ],
            explanation: '"Sidste uge" viser en afsluttet handling i fortiden, så verbet skal stå i datid (rejste).'
        },
        {
            marker: "I dag",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "I dag",
            sentenceAfter: "billetautomaten heldigvis helt perfekt.",
            baseVerb: "at virke",
            options: [
                { text: "virker", form: "Nutid", correct: true },
                { text: "virkede", form: "Datid", correct: false }
            ],
            explanation: '"I dag" angiver nutid, så verbet skal stå i nutid (virker).'
        }
    ];

    let currTidTaskIdx = 0;
    const tidCard = document.createElement('div');
    tidCard.className = 'exercise-card';

    function renderStationTidTask() {
        tidCard.innerHTML = '';
        const task = stationTidTasks[currTidTaskIdx];

        const badge = document.createElement('div');
        badge.className = 'time-marker-badge';
        badge.textContent = `Opgave ${currTidTaskIdx + 1} af ${stationTidTasks.length} • Tidsmarkør: "${task.marker}"`;
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
                        <button class="mission-next-btn" id="next-tid-station-btn">
                            ${currTidTaskIdx < stationTidTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-tid-station-btn').onclick = () => {
                        currTidTaskIdx = (currTidTaskIdx + 1) % stationTidTasks.length;
                        renderStationTidTask();
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

    renderStationTidTask();
    tidBoejningPanel.appendChild(tidCard);
    panelsHolder.appendChild(tidBoejningPanel);

    container.appendChild(viewContainer);
}
