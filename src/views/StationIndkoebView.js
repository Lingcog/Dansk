import { getTranslation, getLang } from '../utils/i18n.js';
import { stationWordTranslations } from '../utils/top100_translations.js';

/**
 * StationIndkoebView - Didaktisk vrimlebillede for semantisk felt: Stationen, indkøb og tiden
 * Dækker 21 centrale højfrekvente substantiver om station, transport, dagligvarer, kalender og tid på døgnet.
 */
export function renderStationIndkoebView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container station-vrimmel-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('top100_substantiver');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // TTS Audio Helper
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
        .station-vrimmel-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .station-hero-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .station-hero-header h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #38bdf8, #f59e0b, #fb923c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .station-hero-header p {
            color: #94a3b8;
            font-size: 1.1rem;
            max-width: 780px;
            margin: 0 auto;
            line-height: 1.5;
        }

        /* Tabs Navigation */
        .station-tabs {
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
        .station-tab-btn {
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
        .station-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.06);
        }
        .station-tab-btn.active {
            background: #f59e0b;
            color: #0f172a;
            box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);
        }

        /* Panels */
        .station-panel {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .station-panel.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Stage Card */
        .vrimmel-card {
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        .radar-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 1.2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .pure-image-toggle-btn {
            background: #1e293b;
            color: #f1f5f9;
            border: 2px solid #64748b;
            padding: 0.6rem 1.3rem;
            border-radius: 25px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .pure-image-toggle-btn:hover {
            border-color: #10b981;
            background: #334155;
        }
        .pure-image-toggle-btn.active {
            background: linear-gradient(135deg, #059669, #10b981);
            border-color: #34d399;
            box-shadow: 0 0 18px rgba(16, 185, 129, 0.5);
            color: white;
        }
        .vrimmel-stage.pure-mode .vrimmel-hotspot {
            display: none !important;
        }

        /* Stage */
        .vrimmel-stage {
            position: relative;
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            line-height: 0;
            background: #0f172a;
        }
        .vrimmel-img {
            width: 100%;
            height: auto;
            display: block;
            user-select: none;
        }
        .vrimmel-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 0.75rem;
            border: 2px solid white;
            transition: all 0.25s ease;
            z-index: 10;
            background: rgba(30, 41, 59, 0.85);
            color: #f8fafc;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
        }
        .vrimmel-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.3);
            z-index: 20;
            background: #f59e0b;
            color: #0f172a;
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
        .detail-word-badge {
            display: inline-block;
            padding: 0.35rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }
        .badge-substantiv {
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
            border: 1px solid #22c55e;
            padding: 0.35rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            display: inline-block;
            margin-bottom: 0.5rem;
            margin-right: 0.4rem;
        }
        .badge-en { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid #0284c7; }
        .badge-et { background: rgba(249, 115, 22, 0.2); color: #fb923c; border: 1px solid #ea580c; }
        .detail-main-word { font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 0.3rem; }
        .detail-forms { font-size: 0.95rem; color: #94a3b8; margin-bottom: 0.5rem; }
        .detail-sentence { font-size: 1.05rem; color: #e2e8f0; font-style: italic; }
        .listen-word-btn {
            background: #2563eb;
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
        .listen-word-btn:hover { background: #1d4ed8; transform: scale(1.05); }
        .mic-speak-btn {
            background: #0f172a;
            color: #f8fafc;
            border: 2px solid #64748b;
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
        .mic-speak-btn:hover {
            border-color: #38bdf8;
            background: #1e293b;
        }
        .mic-speak-btn.listening {
            border-color: #ef4444;
            background: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
            animation: micGlow 1.2s infinite ease-in-out;
        }
        @keyframes micGlow {
            0%, 100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.4); transform: scale(1); }
            50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.8); transform: scale(1.05); }
        }
        .speech-feedback-box {
            width: 100%;
            margin-top: 0.6rem;
            font-size: 0.95rem;
            font-weight: 600;
            padding: 0.5rem 0.8rem;
            border-radius: 8px;
            display: none;
        }
        .speech-feedback-box.correct {
            display: block;
            background: rgba(34, 197, 94, 0.15);
            color: #4ade80;
            border: 1px solid #22c55e;
        }
        .speech-feedback-box.incorrect {
            display: block;
            background: rgba(249, 115, 22, 0.15);
            color: #fb923c;
            border: 1px solid #ea580c;
        }
        .speech-feedback-box.listening {
            display: block;
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            border: 1px solid #0284c7;
        }
        @keyframes shakeBin {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
        }
        .bin-shake {
            animation: shakeBin 0.4s ease;
            border-color: #ef4444 !important;
        }

        /* Sorting Game */
        .sorting-game-box {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.5rem;
            margin-top: 2rem;
        }
        .sorting-header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 1.2rem;
        }
        .sort-progress-badge {
            background: rgba(56, 189, 248, 0.2);
            color: #38bdf8;
            border: 1px solid #0284c7;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.9rem;
        }
        .bins-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.2rem;
            margin-bottom: 1.5rem;
        }
        .sort-bin {
            border-radius: 16px;
            padding: 1.2rem;
            min-height: 200px;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        .bin-en { background: rgba(2, 132, 199, 0.12); border: 2px dashed #0284c7; }
        .bin-en:hover { background: rgba(2, 132, 199, 0.22); }
        .bin-et { background: rgba(234, 88, 12, 0.12); border: 2px dashed #ea580c; }
        .bin-et:hover { background: rgba(234, 88, 12, 0.22); }
        .bin-title { font-size: 1.15rem; font-weight: 800; margin-bottom: 0.8rem; text-align: center; }
        .bin-title-en { color: #38bdf8; }
        .bin-title-et { color: #fb923c; }
        .bin-items-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .chip-in-bin {
            background: #1e293b;
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            color: white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .words-bank-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            background: rgba(30, 41, 59, 0.5);
            padding: 1.2rem;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .sort-word-chip {
            background: #334155;
            color: white;
            border: 2px solid transparent;
            padding: 0.5rem 1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sort-word-chip:hover { background: #475569; transform: translateY(-2px); }
        .sort-word-chip.selected { border-color: #38bdf8; box-shadow: 0 0 14px rgba(56, 189, 248, 0.6); background: #1e293b; }
        .sort-word-chip.placed { opacity: 0.35; pointer-events: none; background: #0f172a; text-decoration: line-through; }
        .reset-sort-btn {
            background: #475569; color: white; border: none; padding: 0.6rem 1.2rem;
            border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.2s ease;
        }
        .reset-sort-btn:hover { background: #64748b; }

        /* Detective Cards */
        .mission-card {
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
        }
        .mission-badge {
            display: inline-block; background: #f59e0b; color: #000; font-weight: 800;
            font-size: 0.85rem; padding: 0.3rem 0.8rem; border-radius: 20px; text-transform: uppercase; margin-bottom: 0.6rem;
        }
        .clues-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem;
        }
        .clue-btn {
            background: #1e293b; border: 2px solid #334155; color: white; padding: 1.2rem;
            border-radius: 14px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.25s ease;
            text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
        }
        .clue-btn:hover { border-color: #38bdf8; transform: translateY(-3px); }
        .clue-btn.selected-correct { background: rgba(34, 197, 94, 0.25); border-color: #22c55e; color: #4ade80; }
        .clue-btn.selected-wrong { background: rgba(239, 68, 68, 0.25); border-color: #ef4444; color: #f87171; }
        .mission-next-btn {
            background: #22c55e; color: #0f172a; font-weight: 800; border: none; padding: 0.8rem 1.6rem;
            border-radius: 12px; font-size: 1rem; cursor: pointer; transition: all 0.2s ease;
        }

        /* Micro-story */
        .story-container {
            max-width: 800px; margin: 0 auto; background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2rem;
        }
        .story-step-card {
            background: #1e293b; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 5px solid #f59e0b;
        }
        .story-options-row { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.8rem; }
        .story-opt-btn {
            background: #334155; color: white; border: none; padding: 0.6rem 1.2rem;
            border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.2s ease;
        }
        .story-opt-btn:hover { background: #475569; }
        .story-opt-btn.correct { background: #22c55e !important; color: #0f172a; }
        .story-explanation-box {
            background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; border-radius: 12px;
            padding: 1rem 1.2rem; margin-top: 1rem; font-size: 0.95rem; color: #fde68a;
        }

        /* Context */
        .context-card {
            max-width: 800px; margin: 0 auto; background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2rem;
        }
        .context-word-banner {
            text-align: center; background: #0f172a; border: 2px solid #f59e0b; padding: 1.2rem;
            border-radius: 16px; margin-bottom: 1.5rem;
        }
        .scene-role-card {
            background: #1e293b; border-radius: 14px; padding: 1.2rem; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 1rem;
        }
        .role-choice-btn {
            display: block; width: 100%; background: #334155; color: white; border: none;
            padding: 0.8rem 1rem; border-radius: 10px; text-align: left; margin-bottom: 0.5rem;
            font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;
        }
        .role-choice-btn:hover { background: #475569; }
        .role-choice-btn.correct { background: #22c55e !important; color: #0f172a; }

        /* Sentence Builder */
        .sentence-builder-card {
            max-width: 850px; margin: 0 auto; background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2rem;
        }
        .builder-slots-row {
            display: flex; gap: 0.8rem; flex-wrap: wrap; margin-bottom: 1.5rem; padding: 1rem;
            background: #0f172a; border-radius: 14px; border: 1px dashed rgba(255, 255, 255, 0.2); min-height: 70px; align-items: center;
        }
        .builder-slot-box {
            padding: 0.7rem 1.2rem; border-radius: 10px; font-weight: 700; font-size: 1.05rem;
            display: flex; flex-direction: column; align-items: flex-start; gap: 0.2rem;
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
        .chip-substantiv { background: #22c55e; box-shadow: 0 0 6px rgba(34, 197, 94, 0.6); }
        .chip-verbum { background: #ef4444; box-shadow: 0 0 6px rgba(239, 68, 68, 0.6); }
        .chip-adjektiv { background: #f97316; box-shadow: 0 0 6px rgba(249, 115, 22, 0.6); }
        .chip-sted { background: #0284c7; box-shadow: 0 0 6px rgba(2, 132, 199, 0.6); }
        .chip-tid { background: #8b5cf6; box-shadow: 0 0 6px rgba(139, 92, 246, 0.6); }

        .tray-chips-list { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.2rem; }
        .tray-chip-btn {
            background: #1e293b; border: 1px solid rgba(239, 68, 68, 0.4); color: white; padding: 0.6rem 1rem;
            border-radius: 10px; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease;
        }
        .tray-chip-btn:hover { border-color: #ef4444; background: rgba(239, 68, 68, 0.15); transform: translateY(-2px); }
        .live-sentence-preview {
            background: #0f172a; border: 1px solid #334155; border-radius: 14px; padding: 1.2rem;
            text-align: center; font-size: 1.3rem; font-weight: 700; color: #f8fafc; margin-bottom: 1.5rem;
            display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap;
        }
        .grammar-word { font-weight: 800; }
        .word-substantiv { color: #4ade80; }
        .word-verbum { color: #f87171; }
        .word-adjektiv { color: #fb923c; }
        .word-sted { color: #60a5fa; }
        .word-tid { color: #c084fc; }
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const heroHeader = document.createElement('div');
    heroHeader.className = 'station-hero-header';
    heroHeader.innerHTML = `
        <h1>${getTranslation('station_hero_title')}</h1>
        <p>${getTranslation('station_hero_desc')}</p>
    `;
    viewContainer.appendChild(heroHeader);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'station-tabs';
    const tabs = [
        { id: 'tab_vrimmel', label: getTranslation('tab_label_vrimmel'), icon: '🔍' },
        { id: 'tab_detektiv', label: getTranslation('tab_label_detektiv'), icon: '🕵️' },
        { id: 'tab_historie', label: getTranslation('tab_label_historie'), icon: '💭' },
        { id: 'tab_kontekst', label: getTranslation('tab_label_kontekst'), icon: '🔄' },
        { id: 'tab_saetning', label: getTranslation('tab_label_saetning'), icon: '✍️' }
    ];

    let currentTab = 'tab_vrimmel';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `station-tab-btn ${t.id === currentTab ? 'active' : ''}`;
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
        tabsMenu.querySelectorAll('.station-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.station-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- 21 NØGLEORD VED STATIONEN, INDKØB OG TIDEN
    // ========================================================
    const stationWords = [
        { word: 'en butik', clean: 'butik', gender: 'en', bestemt: 'butikken', flertal: 'butikker', x: 20, y: 12, icon: '🏪', sentence: 'På hjørnet ved stationen ligger en travl butik med madvarer.' },
        { word: 'en verden', clean: 'verden', gender: 'en', bestemt: 'verdenen', flertal: 'verdener', x: 6, y: 24, icon: '🌍', sentence: 'Globussen viser lande og kontinenter i hele verden.' },
        { word: 'et land', clean: 'land', gender: 'et', bestemt: 'landet', flertal: 'lande', x: 9.5, y: 23, icon: '🇩🇰', sentence: 'Danmark er et lille land med rødt og hvidt flag.' },
        { word: 'et år', clean: 'år', gender: 'et', bestemt: 'året', flertal: 'år', x: 8, y: 33, icon: '📅', sentence: 'Kalenderen på væggen viser måned og år.' },
        { word: 'en måned', clean: 'måned', gender: 'en', bestemt: 'måneden', flertal: 'måneder', x: 4.5, y: 33, icon: '🗓️', sentence: 'Maj er en skøn og lys måned i foråret.' },
        { word: 'en uge', clean: 'uge', gender: 'en', bestemt: 'ugen', flertal: 'uger', x: 6, y: 39, icon: '📆', sentence: 'En hel række i kalenderen svarer til en uge med syv dage.' },
        { word: 'en dag', clean: 'dag', gender: 'en', bestemt: 'dagen', flertal: 'dage', x: 6.5, y: 36, icon: '☀️', sentence: 'Dagen i dag er markeret med et felt i kalenderen.' },
        { word: 'et brød', clean: 'brød', gender: 'et', bestemt: 'brødet', flertal: 'brød', x: 6.5, y: 81, icon: '🍞', sentence: 'Der ligger et friskbagt brød på træbrættet.' },
        { word: 'en pris', clean: 'pris', gender: 'en', bestemt: 'prisen', flertal: 'priser', x: 13.5, y: 91.5, icon: '🏷️', sentence: 'Det lille skilt viser varens pris i kroner.' },
        { word: 'en mælk', clean: 'mælk', gender: 'en', bestemt: 'mælken', flertal: 'mælk', x: 15, y: 78, icon: '🥛', sentence: 'En kold karton mælk står klar på disken.' },
        { word: 'en flaske', clean: 'flaske', gender: 'en', bestemt: 'flasken', flertal: 'flasker', x: 19.5, y: 71, icon: '🍾', sentence: 'Bag mælken står en klar flaske med vand.' },
        { word: 'et æble', clean: 'æble', gender: 'et', bestemt: 'æblet', flertal: 'æbler', x: 22.5, y: 76, icon: '🍎', sentence: 'Kurven er fyldt med røde og friske æbler.' },
        { word: 'en pose', clean: 'pose', gender: 'en', bestemt: 'posen', flertal: 'poser', x: 29, y: 63, icon: '🛍️', sentence: 'Kvinden bærer sine indkøb i en brun papirpose.' },
        { word: 'en bus', clean: 'bus', gender: 'en', bestemt: 'bussen', flertal: 'busser', x: 43.5, y: 47, icon: '🚌', sentence: 'Den gule bus kører passagerer ind til centrum.' },
        { word: 'en cykel', clean: 'cykel', gender: 'en', bestemt: 'cyklen', flertal: 'cykler', x: 53, y: 63, icon: '🚲', sentence: 'En blå cykel står parkeret i cykelstativet ved perronen.' },
        { word: 'en time', clean: 'time', gender: 'en', bestemt: 'timen', flertal: 'timer', x: 48.5, y: 15.5, icon: '🕐', sentence: 'Stationsuret viser hver time og hvert minut.' },
        { word: 'en morgen', clean: 'morgen', gender: 'en', bestemt: 'morgenen', flertal: 'morgener', x: 57, y: 7.5, icon: '🌅', sentence: 'Mange pendlere rejser på arbejde tidligt om morgenen.' },
        { word: 'en aften', clean: 'aften', gender: 'en', bestemt: 'aftenen', flertal: 'aftener', x: 66.5, y: 7.5, icon: '🌆', sentence: 'Om aftenen kører togene passagererne hjem igen.' },
        { word: 'en nat', clean: 'nat', gender: 'en', bestemt: 'natten', flertal: 'nætter', x: 71, y: 7.5, icon: '🌙', sentence: 'Når det bliver mørk nat, er der stille på stationen.' },
        { word: 'et tog', clean: 'tog', gender: 'et', bestemt: 'toget', flertal: 'tog', x: 88, y: 46, icon: '🚆', sentence: 'Det røde tog kører langs perronen på spor 3.' },
        { word: 'en billet', clean: 'billet', gender: 'en', bestemt: 'billetten', flertal: 'billetter', x: 81.5, y: 76, icon: '🎫', sentence: 'Kvinden står med sin billet i hånden og kigger på uret.' }
    ];

    // ========================================================
    // --- 1. DEL: UDFORSK BILLEDET
    // ========================================================
    const vrimmelPanel = document.createElement('div');
    vrimmelPanel.className = 'station-panel active';
    vrimmelPanel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'vrimmel-card';

    // Control bar
    const controlBar = document.createElement('div');
    controlBar.className = 'radar-control-bar';

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-image-toggle-btn';
    pureBtn.innerHTML = `<span>🖼️</span> ${getTranslation('vrimmel_pure_btn')} <strong id="pure-mode-status-station">${getTranslation('vrimmel_status_off')}</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-station').textContent = pureModeActive ? `${getTranslation('vrimmel_status_on')} 🖼️` : getTranslation('vrimmel_status_off');
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage with Image
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/station_indkoeb_vrimmel.jpg';
    img.alt = 'Stationen, indkøb og tiden vrimlebillede';
    img.className = 'vrimmel-img';
    stage.appendChild(img);

    // Detail display box
    const detailBox = document.createElement('div');
    detailBox.className = 'hotspot-detail-card';
    detailBox.innerHTML = `
        <div>
            <div class="detail-word-badge badge-en">${getTranslation('station_default_badge')}</div>
            <div class="detail-main-word">${getTranslation('station_default_title')}</div>
            <div class="detail-forms">${getTranslation('station_default_desc')}</div>
        </div>
    `;

    // Render hotspots
    const renderedHotspots = [];
    stationWords.forEach(sw => {
        const spot = document.createElement('div');
        spot.className = `vrimmel-hotspot hotspot-${sw.gender}`;
        spot.style.left = `${sw.x}%`;
        spot.style.top = `${sw.y}%`;
        spot.textContent = '?';
        spot.title = sw.word;

        spot.onclick = () => {
            const lang = getLang();
            const wordTrans = stationWordTranslations[sw.word]?.[lang] || (lang !== 'da' ? stationWordTranslations[sw.word]?.['en'] : null);
            const transMeaning = wordTrans?.meaning;
            const transSentence = wordTrans?.sentence;

            detailBox.innerHTML = `
                <div style="flex: 1; min-width: 250px;">
                    <div>
                        <span class="badge-substantiv">${getTranslation('vrimmel_badge_substantiv')}</span>
                        <span class="detail-word-badge badge-${sw.gender}">${sw.gender === 'en' ? getTranslation('vrimmel_badge_en') : getTranslation('vrimmel_badge_et')}</span>
                    </div>
                    <div class="detail-main-word">
                        ${sw.icon} ${sw.word}
                        ${transMeaning ? `<span style="font-size: 1.1rem; color: #94a3b8; font-weight: 500; margin-left: 0.5rem;">(${transMeaning})</span>` : ''}
                    </div>
                    <div class="detail-forms">${getTranslation('vrimmel_form_bestemt')} <strong>${sw.bestemt}</strong> | ${getTranslation('vrimmel_form_flertal')} <strong>${sw.flertal}</strong></div>
                    <div class="detail-sentence">"${sw.sentence}"</div>
                    ${transSentence ? `<div style="font-size: 0.95rem; color: #94a3b8; font-style: italic; margin-top: 0.2rem;">"${transSentence}"</div>` : ''}
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-start;">
                    <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                        <button class="listen-word-btn" id="listen-station-word">
                            <span>🔊</span> ${getTranslation('vrimmel_listen_btn')}
                        </button>
                        <button class="mic-speak-btn" id="mic-station-word">
                            <span>🎤</span> ${getTranslation('vrimmel_mic_btn')}
                        </button>
                    </div>
                    <div class="speech-feedback-box" id="speech-feedback-station"></div>
                </div>
            `;

            detailBox.querySelector('#listen-station-word').onclick = () => {
                speakDanish(sw.word);
            };

            const micBtn = detailBox.querySelector('#mic-station-word');
            const feedbackBox = detailBox.querySelector('#speech-feedback-station');
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (!SpeechRecognition) {
                micBtn.onclick = () => {
                    feedbackBox.className = 'speech-feedback-box incorrect';
                    feedbackBox.textContent = getTranslation('vrimmel_mic_unsupported');
                };
            } else {
                let rec = null;
                let isListening = false;
                micBtn.onclick = () => {
                    if (isListening && rec) {
                        rec.stop();
                        return;
                    }
                    try {
                        rec = new SpeechRecognition();
                        rec.lang = 'da-DK';
                        rec.interimResults = false;
                        rec.maxAlternatives = 1;

                        rec.onstart = () => {
                            isListening = true;
                            micBtn.classList.add('listening');
                            micBtn.innerHTML = `<span>🔴</span> ${getTranslation('vrimmel_mic_listening')}`;
                            feedbackBox.className = 'speech-feedback-box listening';
                            feedbackBox.textContent = `${getTranslation('vrimmel_mic_prompt')} "${sw.clean}"...`;
                        };

                        rec.onresult = (evt) => {
                            const spoken = evt.results[0][0].transcript.toLowerCase().trim();
                            const cleanSpoken = spoken.replace(/[.,!?]/g, '').trim();
                            const cleanTarget = sw.clean.toLowerCase().trim();
                            const fullTarget = sw.word.toLowerCase().trim();
                            const isMatch = cleanSpoken === cleanTarget ||
                                            cleanSpoken === fullTarget ||
                                            cleanSpoken.split(' ').includes(cleanTarget) ||
                                            cleanTarget.includes(cleanSpoken);

                            if (isMatch) {
                                feedbackBox.className = 'speech-feedback-box correct';
                                feedbackBox.innerHTML = `${getTranslation('vrimmel_mic_correct')} <strong>"${spoken}"</strong> ✓`;
                                speakDanish("Rigtigt");
                            } else {
                                feedbackBox.className = 'speech-feedback-box incorrect';
                                feedbackBox.innerHTML = getTranslation('vrimmel_mic_incorrect').replace('{spoken}', spoken);
                            }
                        };

                        rec.onerror = (err) => {
                            isListening = false;
                            micBtn.classList.remove('listening');
                            micBtn.innerHTML = `<span>🎤</span> ${getTranslation('vrimmel_mic_btn')}`;
                            if (err.error !== 'no-speech') {
                                feedbackBox.className = 'speech-feedback-box incorrect';
                                feedbackBox.textContent = `Mikrofon: ${err.error}`;
                            }
                        };

                        rec.onend = () => {
                            isListening = false;
                            micBtn.classList.remove('listening');
                            micBtn.innerHTML = `<span>🎤</span> ${getTranslation('vrimmel_mic_btn')}`;
                        };

                        rec.start();
                    } catch (e) {
                        feedbackBox.className = 'speech-feedback-box incorrect';
                        feedbackBox.textContent = 'Kunne ikke starte mikrofonen.';
                    }
                };
            }

            speakDanish(sw.word);
        };

        stage.appendChild(spot);
        renderedHotspots.push({ el: spot, sw });
    });

    vrimmelCard.appendChild(stage);
    vrimmelCard.appendChild(detailBox);
    vrimmelPanel.appendChild(vrimmelCard);

    // ========================================================
    // --- EN / ET KASSE-SORTERING (ALLE 21 ORD) ---
    // ========================================================
    const sortingBox = document.createElement('div');
    sortingBox.className = 'sorting-game-box';

    const sortHeader = document.createElement('div');
    sortHeader.className = 'sorting-header-row';
    sortHeader.innerHTML = `
        <div>
            <h3 style="font-size: 1.3rem; margin: 0;">📦 ${getTranslation('sort_station_title')}</h3>
            <p style="color: #94a3b8; margin: 0.2rem 0 0; font-size: 0.95rem;">${getTranslation('sort_instruction')}</p>
        </div>
        <div class="sort-progress-badge" id="station-sort-progress">${getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', stationWords.length)}</div>
    `;
    sortingBox.appendChild(sortHeader);

    const binsContainer = document.createElement('div');
    binsContainer.className = 'bins-container';

    const binEn = document.createElement('div');
    binEn.className = 'sort-bin bin-en';
    binEn.innerHTML = `<div class="bin-title bin-title-en">${getTranslation('sort_bin_en_title')}</div><div class="bin-items-list" id="bin-station-en"></div>`;

    const binEt = document.createElement('div');
    binEt.className = 'sort-bin bin-et';
    binEt.innerHTML = `<div class="bin-title bin-title-et">${getTranslation('sort_bin_et_title')}</div><div class="bin-items-list" id="bin-station-et"></div>`;

    binsContainer.appendChild(binEn);
    binsContainer.appendChild(binEt);
    sortingBox.appendChild(binsContainer);

    const wordsBank = document.createElement('div');
    wordsBank.className = 'words-bank-row';

    let selectedSortWord = null;
    let stationPlacedCount = 0;

    function renderStationBank() {
        wordsBank.innerHTML = '';
        stationWords.forEach(item => {
            const chip = document.createElement('button');
            chip.className = 'sort-word-chip';
            chip.textContent = item.clean;

            chip.onclick = () => {
                selectedSortWord = item;
                wordsBank.querySelectorAll('.sort-word-chip').forEach(c => c.classList.remove('selected'));
                chip.classList.add('selected');
            };
            wordsBank.appendChild(chip);
        });
    }

    renderStationBank();

    binEn.onclick = () => handleStationBinDrop('en', binEn.querySelector('#bin-station-en'));
    binEt.onclick = () => handleStationBinDrop('et', binEt.querySelector('#bin-station-et'));

    function handleStationBinDrop(targetGender, binListEl) {
        if (!selectedSortWord) {
            return;
        }

        if (selectedSortWord.gender === targetGender) {
            const placedChip = document.createElement('div');
            placedChip.className = 'chip-in-bin';
            placedChip.textContent = `${targetGender} ${selectedSortWord.clean}`;
            binListEl.appendChild(placedChip);

            stationPlacedCount++;
            sortHeader.querySelector('#station-sort-progress').textContent = getTranslation('sort_progress_text').replace('{n}', stationPlacedCount).replace('{total}', stationWords.length);

            wordsBank.querySelectorAll('.sort-word-chip').forEach(c => {
                if (c.textContent === selectedSortWord.clean) {
                    c.classList.add('placed');
                    c.classList.remove('selected');
                }
            });

            if (stationPlacedCount === stationWords.length) {
                sortHeader.querySelector('#station-sort-progress').innerHTML = getTranslation('sort_all_complete');
            }

            selectedSortWord = null;
        } else {
            const wrongBin = targetGender === 'en' ? binEn : binEt;
            wrongBin.classList.add('bin-shake');
            setTimeout(() => wrongBin.classList.remove('bin-shake'), 400);
        }
    }

    const resetBar = document.createElement('div');
    resetBar.style.marginTop = '1.2rem';
    resetBar.style.display = 'flex';
    resetBar.style.justifyContent = 'flex-end';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-sort-btn';
    resetBtn.innerHTML = getTranslation('sort_reset_btn');
    resetBtn.onclick = () => {
        stationPlacedCount = 0;
        selectedSortWord = null;
        binEn.querySelector('#bin-station-en').innerHTML = '';
        binEt.querySelector('#bin-station-et').innerHTML = '';
        sortHeader.querySelector('#station-sort-progress').textContent = getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', stationWords.length);
        renderStationBank();
    };
    resetBar.appendChild(resetBtn);

    sortingBox.appendChild(wordsBank);
    sortingBox.appendChild(resetBar);
    vrimmelPanel.appendChild(sortingBox);
    panelsHolder.appendChild(vrimmelPanel);

    // ========================================================
    // --- 2. DEL: FIND ORD DER HÆNGER SAMMEN
    // ========================================================
    const detektivPanel = document.createElement('div');
    detektivPanel.className = 'station-panel';
    detektivPanel.dataset.panel = 'tab_detektiv';

    const stationMissions = [
        {
            title: getTranslation('station_m1_title'),
            targetCount: 3,
            options: [
                { text: "et brød", correct: true },
                { text: "et tog", correct: false },
                { text: "en mælk", correct: true },
                { text: "en cykel", correct: false },
                { text: "et æble", correct: true },
                { text: "en nat", correct: false }
            ]
        },
        {
            title: getTranslation('station_m2_title'),
            targetCount: 3,
            options: [
                { text: "et tog", correct: true },
                { text: "et brød", correct: false },
                { text: "en bus", correct: true },
                { text: "en flaske", correct: false },
                { text: "en cykel", correct: true },
                { text: "et år", correct: false }
            ]
        },
        {
            title: getTranslation('station_m3_title'),
            targetCount: 3,
            options: [
                { text: "en morgen", correct: true },
                { text: "en pose", correct: false },
                { text: "en aften", correct: true },
                { text: "en nat", correct: true },
                { text: "en butik", correct: false },
                { text: "en pris", correct: false }
            ]
        },
        {
            title: getTranslation('station_m4_title'),
            targetCount: 3,
            options: [
                { text: "et år", correct: true },
                { text: "en billet", correct: false },
                { text: "en måned", correct: true },
                { text: "en uge", correct: true },
                { text: "en mælk", correct: false },
                { text: "et æble", correct: false }
            ]
        }
    ];

    let currMissionIdx = 0;
    const missionCard = document.createElement('div');
    missionCard.className = 'mission-card';

    function renderStationMission() {
        missionCard.innerHTML = '';
        const m = stationMissions[currMissionIdx];
        let selectedCount = 0;

        const header = document.createElement('div');
        header.className = 'mission-header';
        header.innerHTML = `
            <div class="mission-badge">🕵️ ${getTranslation('tab_label_detektiv')} ${currMissionIdx + 1} / ${stationMissions.length}</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 0.4rem;">${m.title}</div>
            <div style="font-size: 0.95rem; color: #94a3b8;">${getTranslation('station_detektiv_count_prompt')}</div>
        `;
        missionCard.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'clues-grid';

        const feedbackEl = document.createElement('div');
        feedbackEl.style.textAlign = 'center';
        feedbackEl.style.minHeight = '50px';
        feedbackEl.style.marginTop = '1rem';

        m.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'clue-btn';
            btn.innerHTML = `<span>${opt.text}</span>`;

            btn.onclick = () => {
                if (btn.classList.contains('selected-correct') || btn.classList.contains('selected-wrong')) return;

                if (opt.correct) {
                    btn.classList.add('selected-correct');
                    selectedCount++;
                    speakDanish(opt.text);

                    if (selectedCount === m.targetCount) {
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.3rem; font-weight: 800; margin-bottom: 0.8rem;">
                                ${getTranslation('station_detektiv_complete')}
                            </div>
                            <button class="mission-next-btn" id="next-station-mission">
                                ${currMissionIdx < stationMissions.length - 1 ? getTranslation('station_detektiv_next') : getTranslation('station_detektiv_restart')}
                            </button>
                        `;
                        speakDanish("Rigtigt");
                        feedbackEl.querySelector('#next-station-mission').onclick = () => {
                            currMissionIdx = (currMissionIdx + 1) % stationMissions.length;
                            renderStationMission();
                        };
                    }
                } else {
                    btn.classList.add('selected-wrong');
                    setTimeout(() => btn.classList.remove('selected-wrong'), 800);
                }
            };
            grid.appendChild(btn);
        });

        missionCard.appendChild(grid);
        missionCard.appendChild(feedbackEl);
    }

    renderStationMission();
    detektivPanel.appendChild(missionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. DEL: EN LILLE HISTORIE (Toget der er kørt)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'station-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';
    storyContainer.innerHTML = `
        <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; text-align: center;">${getTranslation('station_story_title')}</h2>
        <p style="color: #94a3b8; text-align: center; margin-bottom: 1.8rem;">
            ${getTranslation('station_story_desc')}
        </p>

        <!-- Trin 1 -->
        <div class="story-step-card active-step" id="station-story-1">
            <h4>${getTranslation('station_story_s1_q')}</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="true">Et tog 🚆</button>
                <button class="story-opt-btn" data-correct="false">En seng 🛏️</button>
                <button class="story-opt-btn" data-correct="false">Et træ 🌳</button>
            </div>
        </div>

        <!-- Trin 2 -->
        <div class="story-step-card" id="station-story-2" style="opacity: 0.4; pointer-events: none;">
            <h4>${getTranslation('station_story_s2_q')}</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="false">En fest 🎉</button>
                <button class="story-opt-btn" data-correct="true">En fejl med tiden (hun kommer for sent) ⏰</button>
                <button class="story-opt-btn" data-correct="false">En blomst 🌸</button>
            </div>
        </div>

        <!-- Trin 3 -->
        <div class="story-step-card" id="station-story-3" style="opacity: 0.4; pointer-events: none;">
            <h4>${getTranslation('station_story_s3_q')}</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="true">Et problem ⚠️</button>
                <button class="story-opt-btn" data-correct="false">En gave 🎁</button>
                <button class="story-opt-btn" data-correct="false">Et æble 🍎</button>
            </div>
        </div>

        <!-- Trin 4 -->
        <div class="story-step-card" id="station-story-4" style="opacity: 0.4; pointer-events: none;">
            <h4>${getTranslation('station_story_s4_q')}</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="false">Hun går i seng på perronen</button>
                <button class="story-opt-btn" data-correct="true">Hun bruger sin billet til at tage bussen i stedet 💡</button>
            </div>
        </div>

        <div id="station-story-summary" style="display: none;" class="story-explanation-box">
            ${getTranslation('station_story_pedagogy')}
        </div>
    `;

    function setupStationStoryCard(stepNum, nextStepNum) {
        const card = storyContainer.querySelector(`#station-story-${stepNum}`);
        card.querySelectorAll('.story-opt-btn').forEach(btn => {
            btn.onclick = () => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                    speakDanish(btn.textContent);
                    if (nextStepNum) {
                        const nextCard = storyContainer.querySelector(`#station-story-${nextStepNum}`);
                        nextCard.style.opacity = '1';
                        nextCard.style.pointerEvents = 'auto';
                        nextCard.classList.add('active-step');
                    } else {
                        storyContainer.querySelector('#station-story-summary').style.display = 'block';
                        speakDanish("Flot klaret! Kvinden tager bussen med sin billet.");
                    }
                } else {
                    speakDanish("Nej, prøv at overveje situationen!");
                }
            };
        });
    }

    setupStationStoryCard(1, 2);
    setupStationStoryCard(2, 3);
    setupStationStoryCard(3, 4);
    setupStationStoryCard(4, null);

    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 4. DEL: SAMMENHÆNG (Samme ord – ny scene)
    // ========================================================
    const kontekstPanel = document.createElement('div');
    kontekstPanel.className = 'station-panel';
    kontekstPanel.dataset.panel = 'tab_kontekst';

    const contextCard = document.createElement('div');
    contextCard.className = 'context-card';
    contextCard.innerHTML = `
        <div class="context-word-banner">
            <h2>${getTranslation('station_context_title')}</h2>
            <p style="color: #94a3b8;">${getTranslation('station_context_desc')}</p>
        </div>

        <div class="context-scenes-grid">
            <div class="scene-role-card">
                <h4 style="color: #38bdf8;">${getTranslation('station_context_s1_title')}</h4>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.8rem;">${getTranslation('station_context_s1_q')}</p>
                <button class="role-choice-btn" data-correct="true">${getTranslation('station_context_s1_a')}</button>
                <button class="role-choice-btn" data-correct="false">${getTranslation('station_context_s1_b')}</button>
            </div>

            <div class="scene-role-card">
                <h4 style="color: #f59e0b;">${getTranslation('station_context_s2_title')}</h4>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.8rem;">${getTranslation('station_context_s2_q')}</p>
                <button class="role-choice-btn" data-correct="true">${getTranslation('station_context_s2_a')}</button>
                <button class="role-choice-btn" data-correct="false">${getTranslation('station_context_s2_b')}</button>
            </div>

            <div class="scene-role-card">
                <h4 style="color: #10b981;">${getTranslation('station_context_s3_title')}</h4>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.8rem;">${getTranslation('station_context_s3_q')}</p>
                <button class="role-choice-btn" data-correct="true">${getTranslation('station_context_s3_a')}</button>
                <button class="role-choice-btn" data-correct="false">${getTranslation('station_context_s3_b')}</button>
            </div>
        </div>
    `;

    contextCard.querySelectorAll('.role-choice-btn').forEach(btn => {
        btn.onclick = () => {
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
                speakDanish(btn.textContent);
            } else {
                speakDanish("Nej, det passer ikke. Prøv igen!");
            }
        };
    });

    kontekstPanel.appendChild(contextCard);
    panelsHolder.appendChild(kontekstPanel);

    // ========================================================
    // --- 5. DEL: FIND VERBET
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'station-panel';
    saetningPanel.dataset.panel = 'tab_saetning';

    const stationSentenceTasks = [
        {
            subjekt: "Kvinden",
            verbum: "køber",
            objekt: "et brød",
            adverbial: "i butikken",
            correctText: "Kvinden køber et brød i butikken.",
            wrongVerbs: ["sover", "flyver"]
        },
        {
            subjekt: "Passageren",
            verbum: "viser",
            objekt: "en billet",
            adverbial: "i toget",
            correctText: "Passageren viser en billet i toget.",
            wrongVerbs: ["koger", "svømmer"]
        },
        {
            subjekt: "Bussen",
            verbum: "kører",
            objekt: "hver time",
            adverbial: "fra stationen",
            correctText: "Bussen kører hver time fra stationen.",
            wrongVerbs: ["spiser", "læser"]
        },
        {
            subjekt: "Kunden",
            verbum: "bærer",
            objekt: "en pose",
            adverbial: "med æbler",
            correctText: "Kunden bærer en pose med æbler.",
            wrongVerbs: ["cykler", "synger"]
        },
        {
            subjekt: "Pendleren",
            verbum: "rejser",
            objekt: "om morgenen",
            adverbial: "med toget",
            correctText: "Pendleren rejser om morgenen med toget.",
            wrongVerbs: ["bager", "maler"]
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
                <div class="mission-badge">${getTranslation('builder_badge').replace('{current}', currStationSentenceIdx + 1).replace('{total}', stationSentenceTasks.length)}</div>
                <h3 style="font-size: 1.6rem; color: white;">${getTranslation('builder_station_title')}</h3>
            </div>

            <!-- Grammatisk farveforklaring -->
            <div class="grammar-legend-bar">
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>${getTranslation('top100_legend_substantiv')}</strong> (${getTranslation('top100_legend_green')})</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-verbum"></span> <strong>${getTranslation('top100_legend_verbum')}</strong> (${getTranslation('top100_legend_red')})</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-adjektiv"></span> <strong>${getTranslation('top100_legend_adjektiv')}</strong> (${getTranslation('top100_legend_orange')})</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-sted"></span> <strong>${getTranslation('top100_legend_sted')}</strong> (${getTranslation('top100_legend_blue')})</div>
            </div>

            <div class="builder-slots-row">
                <div class="builder-slot-box slot-subjekt">
                    <span class="slot-role-tag">${getTranslation('builder_slot_substantiv')}</span>
                    <span>${task.subjekt}</span>
                </div>
                <div class="builder-slot-box slot-verbum" id="slot-v-station">
                    <span class="slot-role-tag">${getTranslation('builder_slot_verbum')}</span>
                    <span>${getTranslation('builder_choose_verb_slot')}</span>
                </div>
                <div class="builder-slot-box slot-objekt">
                    <span class="slot-role-tag">${getTranslation('builder_slot_substantiv')}</span>
                    <span>${task.objekt}</span>
                </div>
                <div class="builder-slot-box slot-adverbial">
                    <span class="slot-role-tag">${getTranslation('builder_slot_sted')}</span>
                    <span>${task.adverbial}</span>
                </div>
            </div>

            <div class="words-selection-tray">
                <div class="tray-group-title">${getTranslation('builder_tray_title')}</div>
                <div class="tray-chips-list" id="verb-chips-station"></div>
            </div>

            <div class="live-sentence-preview" id="preview-box-station">
                <span id="preview-text-station">${getTranslation('builder_preview_default')}</span>
            </div>

            <div style="text-align: center;" id="action-area-station"></div>
        `;

        const verbChipsList = sentenceCard.querySelector('#verb-chips-station');
        const allVerbs = [task.verbum, ...task.wrongVerbs].sort(() => Math.random() - 0.5);

        allVerbs.forEach(v => {
            const btn = document.createElement('button');
            btn.className = 'tray-chip-btn';
            btn.textContent = v;

            btn.onclick = () => {
                const slotV = sentenceCard.querySelector('#slot-v-station');
                const previewText = sentenceCard.querySelector('#preview-text-station');
                const actionArea = sentenceCard.querySelector('#action-area-station');

                if (v === task.verbum) {
                    slotV.innerHTML = `<span class="slot-role-tag">${getTranslation('builder_slot_verbum')}</span><span>${v} ✓</span>`;
                    slotV.style.background = 'rgba(239, 68, 68, 0.35)';
                    slotV.style.borderColor = '#ef4444';
                    slotV.style.color = '#fca5a5';

                    previewText.innerHTML = `
                        🎉 <span class="grammar-word word-substantiv">${task.subjekt}</span> 
                        <span class="grammar-word word-verbum">${task.verbum}</span> 
                        <span class="grammar-word word-substantiv">${task.objekt}</span> 
                        <span class="grammar-word word-sted">${task.adverbial}</span>.
                    `;
                    speakDanish(task.correctText);

                    actionArea.innerHTML = `
                        <button class="listen-word-btn" style="display: inline-flex; margin-right: 0.8rem;" id="listen-station-sent">
                            <span>🔊</span> ${getTranslation('vrimmel_listen_btn')}
                        </button>
                        <button class="mission-next-btn" style="margin-top: 0;" id="next-station-sent-task">
                            ${currStationSentenceIdx < stationSentenceTasks.length - 1 ? getTranslation('builder_next_btn') : getTranslation('builder_restart_btn')}
                        </button>
                    `;
                    actionArea.querySelector('#listen-station-sent').onclick = () => speakDanish(task.correctText);
                    actionArea.querySelector('#next-station-sent-task').onclick = () => {
                        currStationSentenceIdx = (currStationSentenceIdx + 1) % stationSentenceTasks.length;
                        renderStationSentenceBuilder();
                    };
                } else {
                    slotV.innerHTML = `<span class="slot-role-tag">${getTranslation('builder_slot_verbum')}</span><span>${v} ✕</span>`;
                    slotV.style.borderColor = '#ef4444';
                    slotV.style.color = '#f87171';
                    previewText.textContent = getTranslation('builder_wrong_feedback');
                    speakDanish(`Nej, prøv et andet verbum`);
                }
            };
            verbChipsList.appendChild(btn);
        });
    }

    renderStationSentenceBuilder();
    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    container.appendChild(viewContainer);
}
