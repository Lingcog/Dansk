import { getTranslation, getLang } from '../utils/i18n.js';
import { klasseWordTranslations } from '../utils/top100_translations.js';

/**
 * KlasseKontorView - Didaktisk vrimlebillede for semantisk felt: Undervisningslokalet og kontoret
 * Dækker centrale højfrekvente substantiver om læring, sprog, teknologi og arbejde.
 */
export function renderKlasseKontorView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container klasse-vrimmel-view';

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
        .klasse-vrimmel-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .klasse-hero-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .klasse-hero-header h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #38bdf8, #818cf8, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .klasse-hero-header p {
            color: #94a3b8;
            font-size: 1.1rem;
            max-width: 780px;
            margin: 0 auto;
            line-height: 1.5;
        }

        /* Tabs Navigation */
        .klasse-tabs {
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
        .klasse-tab-btn {
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
        .klasse-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.06);
        }
        .klasse-tab-btn.active {
            background: #3b82f6;
            color: white;
            box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
        }

        /* Panels */
        .klasse-panel {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .klasse-panel.active {
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
            background: #3b82f6;
            color: white;
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
        .story-nav-pills {
            display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.8rem;
        }
        .story-nav-btn {
            background: #1e293b; color: #94a3b8; border: 2px solid #334155; padding: 0.6rem 1.2rem;
            border-radius: 12px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease;
        }
        .story-nav-btn:hover { border-color: #38bdf8; color: white; transform: translateY(-2px); }
        .story-nav-btn.active {
            background: #0284c7; color: white; border-color: #38bdf8; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
        }
        .story-step-card {
            background: #1e293b; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 5px solid #38bdf8;
            transition: all 0.3s ease;
        }
        .story-options-row { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.8rem; }
        .story-opt-btn {
            background: #334155; color: white; border: none; padding: 0.6rem 1.2rem;
            border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.2s ease;
        }
        .story-opt-btn:hover { background: #475569; }
        .story-opt-btn.correct { background: #22c55e !important; color: #0f172a; }
        .story-opt-btn.wrong { background: #ef4444 !important; color: white; }
        .story-explanation-box {
            background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; border-radius: 14px;
            padding: 1.2rem; margin-top: 1.5rem; font-size: 1rem; color: #4ade80; text-align: center;
        }

        /* Overemne & Underemne (Model C) */
        .category-card {
            max-width: 800px; margin: 0 auto; background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2rem;
            text-align: center;
        }
        .category-badge {
            display: inline-block; background: #8b5cf6; color: white; font-weight: 800;
            font-size: 0.85rem; padding: 0.35rem 0.9rem; border-radius: 20px; text-transform: uppercase;
            letter-spacing: 0.5px; margin-bottom: 0.8rem;
        }
        .category-subwords-row {
            display: flex; justify-content: center; gap: 0.8rem; flex-wrap: wrap; margin: 1.2rem 0 1.6rem;
        }
        .category-word-chip {
            background: #0f172a; border: 2px solid #38bdf8; color: #f8fafc;
            padding: 0.6rem 1.2rem; border-radius: 12px; font-weight: 700; font-size: 1.1rem;
        }
        .category-options-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-top: 1.2rem;
        }
        .category-opt-btn {
            background: #1e293b; border: 2px solid #334155; color: white; padding: 1.1rem;
            border-radius: 14px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease;
            text-align: center;
        }
        .category-opt-btn:hover { border-color: #38bdf8; transform: translateY(-2px); }
        .category-opt-btn.selected-correct {
            background: rgba(34, 197, 94, 0.25) !important; border-color: #22c55e !important; color: #4ade80 !important;
        }
        .category-opt-btn.selected-wrong {
            background: rgba(239, 68, 68, 0.25) !important; border-color: #ef4444 !important; color: #f87171 !important;
        }

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
    heroHeader.className = 'klasse-hero-header';
    heroHeader.innerHTML = `
        <h1>${getTranslation('klasse_hero_title')}</h1>
        <p>${getTranslation('klasse_hero_desc')}</p>
    `;
    viewContainer.appendChild(heroHeader);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'klasse-tabs';
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
        btn.className = `klasse-tab-btn ${t.id === currentTab ? 'active' : ''}`;
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
        tabsMenu.querySelectorAll('.klasse-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.klasse-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- 24 NØGLEORD I UNDERVISNINGSLOKALET OG KONTORET
    // ========================================================
    const klasseWords = [
        { word: 'et billede', clean: 'billede', gender: 'et', bestemt: 'billedet', flertal: 'billeder', x: 9, y: 35, icon: '🖼️', sentence: 'Der hænger et billede på væggen.' },
        { word: 'en lampe', clean: 'lampe', gender: 'en', bestemt: 'lampen', flertal: 'lamper', x: 26, y: 16, icon: '💡', sentence: 'Lampen giver lys.' },
        { word: 'et ur', clean: 'ur', gender: 'et', bestemt: 'uret', flertal: 'ure', x: 42.5, y: 19, icon: '🕒', sentence: 'Uret hænger på væggen.' },
        { word: 'en tavle', clean: 'tavle', gender: 'en', bestemt: 'tavlen', flertal: 'tavler', x: 33, y: 41, icon: '🟩', sentence: 'Læreren skriver på tavlen.' },
        { word: 'et sprog', clean: 'sprog', gender: 'et', bestemt: 'sproget', flertal: 'sprog', x: 38, y: 34, icon: '🇩🇰', sentence: 'Kursisterne lærer dansk.' },
        { word: 'et spørgsmål', clean: 'spørgsmål', gender: 'et', bestemt: 'spørgsmålet', flertal: 'spørgsmål', x: 23.5, y: 36, icon: '❓', sentence: 'Eleven stiller et spørgsmål.' },
        { word: 'en elev', clean: 'elev', gender: 'en', bestemt: 'eleven', flertal: 'elever', x: 22, y: 53, icon: '🙋‍♂️', sentence: 'En elev rækker hånden op.' },
        { word: 'en lærer', clean: 'lærer', gender: 'en', bestemt: 'læreren', flertal: 'lærere', x: 54.5, y: 45, icon: '👩‍🏫', sentence: 'En lærer underviser klassen.' },
        { word: 'et svar', clean: 'svar', gender: 'et', bestemt: 'svaret', flertal: 'svar', x: 61, y: 29, icon: '✅', sentence: 'Læreren kender svaret.' },
        { word: 'en bog', clean: 'bog', gender: 'en', bestemt: 'bogen', flertal: 'bøger', x: 19.5, y: 67, icon: '📖', sentence: 'Han læser i en bog.' },
        { word: 'et bord', clean: 'bord', gender: 'et', bestemt: 'bordet', flertal: 'borde', x: 23, y: 73, icon: '🪑', sentence: 'Bogen ligger på bordet.' },
        { word: 'en stol', clean: 'stol', gender: 'en', bestemt: 'stolen', flertal: 'stole', x: 9, y: 75, icon: '🪑', sentence: 'Kursisten sidder på en stol.' },
        { word: 'et papir', clean: 'papir', gender: 'et', bestemt: 'papiret', flertal: 'papirer', x: 39, y: 70, icon: '📄', sentence: 'Hun skriver på et papir.' },
        { word: 'en opgave', clean: 'opgave', gender: 'en', bestemt: 'opgaven', flertal: 'opgaver', x: 34, y: 64, icon: '📝', sentence: 'Hun løser en opgave.' },
        { word: 'en blyant', clean: 'blyant', gender: 'en', bestemt: 'blyanten', flertal: 'blyanter', x: 43, y: 71.5, icon: '✏️', sentence: 'Han skriver med en blyant.' },
        { word: 'en telefon', clean: 'telefon', gender: 'en', bestemt: 'telefonen', flertal: 'telefoner', x: 46, y: 71, icon: '📱', sentence: 'Telefonen ligger på bordet.' },
        { word: 'en taske', clean: 'taske', gender: 'en', bestemt: 'tasken', flertal: 'tasker', x: 50, y: 90, icon: '🎒', sentence: 'Tasken står på gulvet.' },
        { word: 'et arbejde', clean: 'arbejde', gender: 'et', bestemt: 'arbejdet', flertal: 'arbejder', x: 70, y: 47, icon: '💼', sentence: 'Hun er på arbejde.' },
        { word: 'et møde', clean: 'møde', gender: 'et', bestemt: 'mødet', flertal: 'møder', x: 78.5, y: 44, icon: '🤝', sentence: 'De har et møde i dag.' },
        { word: 'en idé', clean: 'idé', gender: 'en', bestemt: 'idéen', flertal: 'idéer', x: 84.5, y: 25.5, icon: '💡', sentence: 'Han får en god idé.' },
        { word: 'et brev', clean: 'brev', gender: 'et', bestemt: 'brevet', flertal: 'breve', x: 83.5, y: 47.5, icon: '✉️', sentence: 'Hun åbner et brev.' },
        { word: 'et vindue', clean: 'vindue', gender: 'et', bestemt: 'vinduet', flertal: 'vinduer', x: 97, y: 31, icon: '🪟', sentence: 'Lyset kommer ind ad et vindue.' },
        { word: 'en computer', clean: 'computer', gender: 'en', bestemt: 'computeren', flertal: 'computere', x: 82.5, y: 83, icon: '💻', sentence: 'Manden arbejder ved en computer.' },
        { word: 'et problem', clean: 'problem', gender: 'et', bestemt: 'problemet', flertal: 'problemer', x: 80.5, y: 74, icon: '⚠️', sentence: 'Der er et problem med computeren.' }
    ];

    // ========================================================
    // --- 1. DEL: UDFORSK BILLEDET
    // ========================================================
    const vrimmelPanel = document.createElement('div');
    vrimmelPanel.className = 'klasse-panel active';
    vrimmelPanel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'vrimmel-card';

    // Control bar
    const controlBar = document.createElement('div');
    controlBar.className = 'radar-control-bar';

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-image-toggle-btn';
    pureBtn.innerHTML = `<span>🖼️</span> ${getTranslation('vrimmel_pure_btn')} <strong id="pure-mode-status-klasse">${getTranslation('vrimmel_status_off')}</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-klasse').textContent = pureModeActive ? `${getTranslation('vrimmel_status_on')} 🖼️` : getTranslation('vrimmel_status_off');
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage with Image
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/klasse_kontor_vrimmel.jpg';
    img.alt = 'Undervisningslokalet og kontoret vrimlebillede';
    img.className = 'vrimmel-img';
    stage.appendChild(img);

    // Detail display box
    const detailBox = document.createElement('div');
    detailBox.className = 'hotspot-detail-card';
    detailBox.innerHTML = `
        <div>
            <div class="detail-word-badge badge-en">${getTranslation('klasse_default_badge')}</div>
            <div class="detail-main-word">${getTranslation('klasse_default_title')}</div>
            <div class="detail-forms">${getTranslation('klasse_default_desc')}</div>
        </div>
    `;

    // Render hotspots
    const renderedHotspots = [];
    klasseWords.forEach(kw => {
        const spot = document.createElement('div');
        spot.className = `vrimmel-hotspot hotspot-${kw.gender}`;
        spot.style.left = `${kw.x}%`;
        spot.style.top = `${kw.y}%`;
        spot.textContent = '?';
        spot.title = kw.word;

        spot.onclick = () => {
            const lang = getLang();
            const wordTrans = klasseWordTranslations[kw.word]?.[lang] || (lang !== 'da' ? klasseWordTranslations[kw.word]?.['en'] : null);
            const transMeaning = wordTrans?.meaning;
            const transSentence = wordTrans?.sentence;

            detailBox.innerHTML = `
                <div style="flex: 1; min-width: 250px;">
                    <div>
                        <span class="badge-substantiv">${getTranslation('vrimmel_badge_substantiv')}</span>
                        <span class="detail-word-badge badge-${kw.gender}">${kw.gender === 'en' ? getTranslation('vrimmel_badge_en') : getTranslation('vrimmel_badge_et')}</span>
                    </div>
                    <div class="detail-main-word">
                        ${kw.icon} ${kw.word}
                        ${transMeaning ? `<span style="font-size: 1.1rem; color: #94a3b8; font-weight: 500; margin-left: 0.5rem;">(${transMeaning})</span>` : ''}
                    </div>
                    <div class="detail-forms">${getTranslation('vrimmel_form_bestemt')} <strong>${kw.bestemt}</strong> | ${getTranslation('vrimmel_form_flertal')} <strong>${kw.flertal}</strong></div>
                    <div class="detail-sentence">"${kw.sentence}"</div>
                    ${transSentence ? `<div style="font-size: 0.95rem; color: #94a3b8; font-style: italic; margin-top: 0.2rem;">"${transSentence}"</div>` : ''}
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-start;">
                    <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                        <button class="listen-word-btn" id="listen-klasse-word">
                            <span>🔊</span> ${getTranslation('vrimmel_listen_btn')}
                        </button>
                        <button class="mic-speak-btn" id="mic-klasse-word">
                            <span>🎤</span> ${getTranslation('vrimmel_mic_btn')}
                        </button>
                    </div>
                    <div class="speech-feedback-box" id="speech-feedback-klasse"></div>
                </div>
            `;

            detailBox.querySelector('#listen-klasse-word').onclick = () => {
                speakDanish(kw.word);
            };

            const micBtn = detailBox.querySelector('#mic-klasse-word');
            const feedbackBox = detailBox.querySelector('#speech-feedback-klasse');
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
                            feedbackBox.textContent = `${getTranslation('vrimmel_mic_prompt')} "${kw.clean}"...`;
                        };

                        rec.onresult = (evt) => {
                            const spoken = evt.results[0][0].transcript.toLowerCase().trim();
                            const cleanSpoken = spoken.replace(/[.,!?]/g, '').trim();
                            const cleanTarget = kw.clean.toLowerCase().trim();
                            const fullTarget = kw.word.toLowerCase().trim();
                            const isMatch = cleanSpoken === cleanTarget ||
                                            cleanSpoken === fullTarget ||
                                            cleanSpoken.split(' ').includes(cleanTarget) ||
                                            cleanTarget.includes(cleanSpoken);

                            if (isMatch) {
                                feedbackBox.className = 'speech-feedback-box correct';
                                feedbackBox.innerHTML = `${getTranslation('vrimmel_mic_correct')} <strong>"${spoken}"</strong> ✓`;
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

            speakDanish(kw.word);
        };

        stage.appendChild(spot);
        renderedHotspots.push({ el: spot, kw });
    });

    vrimmelCard.appendChild(stage);
    vrimmelCard.appendChild(detailBox);
    vrimmelPanel.appendChild(vrimmelCard);

    // ========================================================
    // --- EN / ET KASSE-SORTERING (ALLE 24 ORD) ---
    // ========================================================
    const sortingBox = document.createElement('div');
    sortingBox.className = 'sorting-game-box';

    const sortHeader = document.createElement('div');
    sortHeader.className = 'sorting-header-row';
    sortHeader.innerHTML = `
        <div>
            <h3 style="font-size: 1.3rem; margin: 0;">📦 ${getTranslation('sort_klasse_title')}</h3>
            <p style="color: #94a3b8; margin: 0.2rem 0 0; font-size: 0.95rem;">${getTranslation('sort_instruction')}</p>
        </div>
        <div class="sort-progress-badge" id="klasse-sort-progress">${getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', klasseWords.length)}</div>
    `;
    sortingBox.appendChild(sortHeader);

    const binsContainer = document.createElement('div');
    binsContainer.className = 'bins-container';

    const binEn = document.createElement('div');
    binEn.className = 'sort-bin bin-en';
    binEn.innerHTML = `<div class="bin-title bin-title-en">${getTranslation('sort_bin_en_title')}</div><div class="bin-items-list" id="bin-klasse-en"></div>`;

    const binEt = document.createElement('div');
    binEt.className = 'sort-bin bin-et';
    binEt.innerHTML = `<div class="bin-title bin-title-et">${getTranslation('sort_bin_et_title')}</div><div class="bin-items-list" id="bin-klasse-et"></div>`;

    binsContainer.appendChild(binEn);
    binsContainer.appendChild(binEt);
    sortingBox.appendChild(binsContainer);

    const wordsBank = document.createElement('div');
    wordsBank.className = 'words-bank-row';

    let selectedSortWord = null;
    let klassePlacedCount = 0;

    function renderKlasseBank() {
        wordsBank.innerHTML = '';
        klasseWords.forEach(item => {
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

    renderKlasseBank();

    binEn.onclick = () => handleKlasseBinDrop('en', binEn.querySelector('#bin-klasse-en'));
    binEt.onclick = () => handleKlasseBinDrop('et', binEt.querySelector('#bin-klasse-et'));

    function handleKlasseBinDrop(targetGender, binListEl) {
        if (!selectedSortWord) {
            return;
        }

        if (selectedSortWord.gender === targetGender) {
            const placedChip = document.createElement('div');
            placedChip.className = 'chip-in-bin';
            placedChip.textContent = `${targetGender} ${selectedSortWord.clean}`;
            binListEl.appendChild(placedChip);

            klassePlacedCount++;
            sortHeader.querySelector('#klasse-sort-progress').textContent = getTranslation('sort_progress_text').replace('{n}', klassePlacedCount).replace('{total}', klasseWords.length);

            wordsBank.querySelectorAll('.sort-word-chip').forEach(c => {
                if (c.textContent === selectedSortWord.clean) {
                    c.classList.add('placed');
                    c.classList.remove('selected');
                }
            });

            if (klassePlacedCount === klasseWords.length) {
                sortHeader.querySelector('#klasse-sort-progress').innerHTML = getTranslation('sort_all_complete');
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
        klassePlacedCount = 0;
        selectedSortWord = null;
        binEn.querySelector('#bin-klasse-en').innerHTML = '';
        binEt.querySelector('#bin-klasse-et').innerHTML = '';
        sortHeader.querySelector('#klasse-sort-progress').textContent = getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', klasseWords.length);
        renderKlasseBank();
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
    detektivPanel.className = 'klasse-panel';
    detektivPanel.dataset.panel = 'tab_detektiv';

    const klasseMissions = [
        {
            title: getTranslation('klasse_m1_title'),
            targetCount: 3,
            options: [
                { text: "en bog", correct: true },
                { text: "en lampe", correct: false },
                { text: "et papir", correct: true },
                { text: "et vindue", correct: false },
                { text: "en blyant", correct: true },
                { text: "en stol", correct: false }
            ]
        },
        {
            title: getTranslation('klasse_m2_title'),
            targetCount: 3,
            options: [
                { text: "et spørgsmål", correct: true },
                { text: "en taske", correct: false },
                { text: "et svar", correct: true },
                { text: "et bord", correct: false },
                { text: "et sprog", correct: true },
                { text: "et ur", correct: false }
            ]
        },
        {
            title: getTranslation('klasse_m3_title'),
            targetCount: 3,
            options: [
                { text: "en lærer", correct: true },
                { text: "en blyant", correct: false },
                { text: "en elev", correct: true },
                { text: "et møde", correct: true },
                { text: "et billede", correct: false },
                { text: "en lampe", correct: false }
            ]
        },
        {
            title: getTranslation('klasse_m4_title'),
            targetCount: 3,
            options: [
                { text: "en computer", correct: true },
                { text: "en stol", correct: false },
                { text: "en telefon", correct: true },
                { text: "et brev", correct: true },
                { text: "en tavle", correct: false },
                { text: "en taske", correct: false }
            ]
        }
    ];

    let currMissionIdx = 0;
    const missionCard = document.createElement('div');
    missionCard.className = 'mission-card';

    function renderKlasseMission() {
        missionCard.innerHTML = '';
        const m = klasseMissions[currMissionIdx];
        let selectedCount = 0;

        const header = document.createElement('div');
        header.className = 'mission-header';
        header.innerHTML = `
            <div class="mission-badge">🕵️ ${getTranslation('tab_label_detektiv')} ${currMissionIdx + 1} / ${klasseMissions.length}</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 0.4rem;">${m.title}</div>
            <div style="font-size: 0.95rem; color: #94a3b8;">${getTranslation('klasse_detektiv_count_prompt')}</div>
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

                    if (selectedCount === m.targetCount) {
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.3rem; font-weight: 800; margin-bottom: 0.8rem;">
                                ✓ Rigtigt svaret! ${getTranslation('klasse_detektiv_complete')}
                            </div>
                            <button class="mission-next-btn" id="next-klasse-mission">
                                ${currMissionIdx < klasseMissions.length - 1 ? getTranslation('klasse_detektiv_next') : getTranslation('klasse_detektiv_restart')}
                            </button>
                        `;
                        feedbackEl.querySelector('#next-klasse-mission').onclick = () => {
                            currMissionIdx = (currMissionIdx + 1) % klasseMissions.length;
                            renderKlasseMission();
                        };
                    } else {
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem;">
                                ✓ Rigtigt svaret! (${selectedCount} af ${m.targetCount})
                            </div>
                        `;
                    }
                } else {
                    btn.classList.add('selected-wrong');
                    feedbackEl.innerHTML = `
                        <div style="color: #f87171; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem;">
                            ✗ Forkert svaret. Prøv igen!
                        </div>
                    `;
                    setTimeout(() => btn.classList.remove('selected-wrong'), 800);
                }
            };
            grid.appendChild(btn);
        });

        missionCard.appendChild(grid);
        missionCard.appendChild(feedbackEl);
    }

    renderKlasseMission();
    detektivPanel.appendChild(missionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. DEL: EN LILLE HISTORIE (4 ENKLE HISTORIER) ---
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'klasse-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const klasseStories = [
        {
            title: "1. Computeren driller",
            fullStoryText: "Manden arbejder ved en computer. Der er en fejl på skærmen. Manden har et problem med computeren. Han stiller et spørgsmål og får hjælp.",
            steps: [
                {
                    q: "1. Hvad arbejder han ved?",
                    options: [
                        { text: "En computer 💻", correct: true },
                        { text: "En seng 🛏️", correct: false },
                        { text: "Et træ 🌳", correct: false }
                    ]
                },
                {
                    q: "2. Hvad sker der?",
                    options: [
                        { text: "En ferie 🏖️", correct: false },
                        { text: "Der er en fejl ⚙️", correct: true },
                        { text: "En kage 🍰", correct: false }
                    ]
                },
                {
                    q: "3. Hvad har manden?",
                    options: [
                        { text: "Et problem med computeren ⚠️", correct: true },
                        { text: "En gave 🎁", correct: false },
                        { text: "En sol ☀️", correct: false }
                    ]
                },
                {
                    q: "4. Hvad gør han?",
                    options: [
                        { text: "Han sover på gulvet 😴", correct: false },
                        { text: "Han stiller et spørgsmål 💡", correct: true }
                    ]
                }
            ]
        },
        {
            title: "2. Kursisterne lærer dansk",
            fullStoryText: "Læreren skriver på tavlen. Kursisterne læser i en bog. En elev stiller et spørgsmål. Læreren giver et svar.",
            steps: [
                {
                    q: "1. Hvad gør læreren?",
                    options: [
                        { text: "Læreren skriver på tavlen 🟩", correct: true },
                        { text: "Læreren sover 😴", correct: false },
                        { text: "Læreren spiser is 🍦", correct: false }
                    ]
                },
                {
                    q: "2. Hvad læser kursisterne i?",
                    options: [
                        { text: "De kigger på en sko 👟", correct: false },
                        { text: "De læser i en bog 📖", correct: true },
                        { text: "De læser på et træ 🌳", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør en elev?",
                    options: [
                        { text: "Eleven stiller et spørgsmål ❓", correct: true },
                        { text: "Eleven løber hjem 🏃", correct: false },
                        { text: "Eleven gemmer sig 🙈", correct: false }
                    ]
                },
                {
                    q: "4. Hvad gør læreren?",
                    options: [
                        { text: "Læreren giver et svar ✅", correct: true },
                        { text: "Læreren slukker lyset 💡", correct: false },
                        { text: "Læreren går 🚪", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. Et møde på kontoret",
            fullStoryText: "To kolleger har et møde. De kigger på et papir. En kollega får en god idé.",
            steps: [
                {
                    q: "1. Hvad har de to kolleger?",
                    options: [
                        { text: "De har et møde 🤝", correct: true },
                        { text: "De holder en fest 🎉", correct: false },
                        { text: "De sover 😴", correct: false }
                    ]
                },
                {
                    q: "2. Hvad kigger de på?",
                    options: [
                        { text: "En hund 🐕", correct: false },
                        { text: "Et papir 📄", correct: true },
                        { text: "En bil 🚗", correct: false }
                    ]
                },
                {
                    q: "3. Hvad får kollegaen?",
                    options: [
                        { text: "En god idé 💡", correct: true },
                        { text: "En kop te ☕", correct: false },
                        { text: "En ny sko 👟", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. Opgaven er færdig",
            fullStoryText: "Hun tager en blyant fra tasken. Hun skriver ord med blyanten. Hun løser opgaven.",
            steps: [
                {
                    q: "1. Hvor tager hun blyanten fra?",
                    options: [
                        { text: "Fra tasken 🎒", correct: true },
                        { text: "Fra køleskabet ❄️", correct: false },
                        { text: "Fra haven 🌲", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør hun?",
                    options: [
                        { text: "Hun klipper papiret ✂️", correct: false },
                        { text: "Hun skriver ord med en blyant ✏️", correct: true },
                        { text: "Hun sover 😴", correct: false }
                    ]
                },
                {
                    q: "3. Hvad sker der til sidst?",
                    options: [
                        { text: "Hun glemmer opgaven ❌", correct: false },
                        { text: "Hun løser opgaven 📝", correct: true },
                        { text: "Hun går hjem 🏃", correct: false }
                    ]
                }
            ]
        }
    ];

    let currKlasseStoryIdx = 0;
    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';

    function renderActiveKlasseStory() {
        storyContainer.innerHTML = '';
        const story = klasseStories[currKlasseStoryIdx];

        const navBar = document.createElement('div');
        navBar.className = 'story-nav-pills';
        klasseStories.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = `story-nav-btn ${idx === currKlasseStoryIdx ? 'active' : ''}`;
            btn.textContent = `Historie ${idx + 1}`;
            btn.onclick = () => {
                currKlasseStoryIdx = idx;
                renderActiveKlasseStory();
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
        descEl.textContent = 'Vælg det rigtige ord for at bygge historien:';
        storyContainer.appendChild(descEl);

        const stepsHolder = document.createElement('div');
        stepsHolder.className = 'story-steps-list';

        story.steps.forEach((step, sIdx) => {
            const stepCard = document.createElement('div');
            stepCard.className = `story-step-card ${sIdx === 0 ? 'active-step' : ''}`;
            stepCard.id = `klasse-step-${sIdx}`;
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
            stepFeedback.className = 'story-step-feedback';

            step.options.forEach(opt => {
                const optBtn = document.createElement('button');
                optBtn.className = 'story-opt-btn';
                optBtn.textContent = opt.text;

                optBtn.onclick = () => {
                    if (opt.correct) {
                        optBtn.classList.add('correct');
                        stepFeedback.innerHTML = `<div style="color: #4ade80; font-weight: 700; margin-top: 0.6rem;">✓ Rigtigt svaret!</div>`;

                        optRow.querySelectorAll('.story-opt-btn').forEach(b => {
                            b.style.pointerEvents = 'none';
                        });

                        const nextStepCard = stepsHolder.querySelector(`#klasse-step-${sIdx + 1}`);
                        if (nextStepCard) {
                            nextStepCard.style.opacity = '1';
                            nextStepCard.style.pointerEvents = 'auto';
                            nextStepCard.classList.add('active-step');
                        } else {
                            const completeBox = storyContainer.querySelector('#klasse-story-complete-box');
                            if (completeBox) {
                                completeBox.style.display = 'block';
                                completeBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
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
        completeBox.id = 'klasse-story-complete-box';
        completeBox.className = 'story-explanation-box';
        completeBox.style.display = 'none';

        const isLastStory = currKlasseStoryIdx === klasseStories.length - 1;
        completeBox.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">
                🎉 Flot klaret! Du har gennemført historien.
            </div>
            <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">
                <button class="story-opt-btn" id="btn-next-klasse-story" style="background: #22c55e; color: #0f172a; font-weight: 800;">
                    ${isLastStory ? 'Start forfra ↺' : 'Gå til næste historie ➔'}
                </button>
            </div>
        `;
        storyContainer.appendChild(completeBox);

        completeBox.querySelector('#btn-next-klasse-story').onclick = () => {
            currKlasseStoryIdx = (currKlasseStoryIdx + 1) % klasseStories.length;
            renderActiveKlasseStory();
        };
    }

    renderActiveKlasseStory();
    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 4. DEL: SAMMENHÆNG (Samme ord – ny scene)
    // ========================================================
    // ========================================================
    // --- 4. DEL: OVEREMNE OG UNDEREMNE (Model C)
    // ========================================================
    const kontekstPanel = document.createElement('div');
    kontekstPanel.className = 'klasse-panel';
    kontekstPanel.dataset.panel = 'tab_kontekst';

    const klasseCategoryTasks = [
        {
            type: "find_overemne",
            subwords: ["en lærer 👨‍🏫", "en elev 👩‍🎓", "en klasse 🏫"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Skole og undervisning 🏫", correct: true },
                { text: "Transport 🚗", correct: false },
                { text: "Køkken 🍳", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["en computer 💻", "en skærm 🖥️", "en mus 🖱️"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Teknologi og IT 💻", correct: true },
                { text: "Møbler 🪑", correct: false },
                { text: "Dyr 🐾", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Skrive- og læsemateriale ✏️",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "en bog 📖", correct: true },
                { text: "en blyant ✏️", correct: true },
                { text: "et papir 📄", correct: true },
                { text: "et komfur 🍳", correct: false },
                { text: "en seng 🛏️", correct: false },
                { text: "en bil 🚗", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Arbejde og opgaver 💼",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "et møde 🤝", correct: true },
                { text: "en opgave 📝", correct: true },
                { text: "en pause ☕", correct: true },
                { text: "et træ 🌳", correct: false },
                { text: "en kat 🐈", correct: false },
                { text: "en vej 🛣️", correct: false }
            ]
        }
    ];

    let currKlasseCategoryIdx = 0;
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';

    function renderKlasseCategoryTask() {
        categoryCard.innerHTML = '';

        if (currKlasseCategoryIdx >= klasseCategoryTasks.length) {
            categoryCard.innerHTML = `
                <div style="font-size: 2.8rem; margin-bottom: 0.6rem;">🎉</div>
                <h2 style="font-size: 1.8rem; color: #4ade80; margin-bottom: 0.6rem;">Flot klaret!</h2>
                <p style="color: #cbd5e1; font-size: 1.05rem; margin-bottom: 1.6rem;">
                    Du har gennemført alle opgaver med overemne og underemne.
                </p>
                <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
                    <button class="mission-next-btn" id="restart-klasse-category-btn" style="background: #475569; color: white;">
                        Start forfra 🔄
                    </button>
                    <button class="mission-next-btn" id="klasse-category-next-tab-btn" style="background: #22c55e; color: #0f172a;">
                        Gå til 5. Find verbet ➔
                    </button>
                </div>
            `;
            categoryCard.querySelector('#restart-klasse-category-btn').onclick = () => {
                currKlasseCategoryIdx = 0;
                renderKlasseCategoryTask();
            };
            categoryCard.querySelector('#klasse-category-next-tab-btn').onclick = () => {
                switchTab('tab_saetning');
            };
            return;
        }

        const task = klasseCategoryTasks[currKlasseCategoryIdx];
        let selectedCount = 0;

        const badge = document.createElement('div');
        badge.className = 'category-badge';
        badge.textContent = `🏷️ Opgave ${currKlasseCategoryIdx + 1} af ${klasseCategoryTasks.length}`;
        categoryCard.appendChild(badge);

        if (task.type === 'find_overemne') {
            const promptTitle = document.createElement('h3');
            promptTitle.style.fontSize = '1.35rem';
            promptTitle.style.color = '#94a3b8';
            promptTitle.style.margin = '0.3rem 0 0.8rem';
            promptTitle.textContent = 'Underemner:';
            categoryCard.appendChild(promptTitle);

            const wordsRow = document.createElement('div');
            wordsRow.className = 'category-subwords-row';
            task.subwords.forEach(w => {
                const chip = document.createElement('span');
                chip.className = 'category-word-chip';
                chip.textContent = w;
                wordsRow.appendChild(chip);
            });
            categoryCard.appendChild(wordsRow);

            const qEl = document.createElement('div');
            qEl.style.fontSize = '1.25rem';
            qEl.style.fontWeight = '800';
            qEl.style.color = '#f8fafc';
            qEl.style.marginBottom = '1.2rem';
            qEl.textContent = task.question;
            categoryCard.appendChild(qEl);

            const grid = document.createElement('div');
            grid.className = 'category-options-grid';

            const feedbackEl = document.createElement('div');
            feedbackEl.style.marginTop = '1.2rem';

            task.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'category-opt-btn';
                btn.textContent = opt.text;

                btn.onclick = () => {
                    if (opt.correct) {
                        btn.classList.add('selected-correct');
                        grid.querySelectorAll('.category-opt-btn').forEach(b => b.style.pointerEvents = 'none');
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.8rem;">
                                ✓ Rigtigt svaret! Overemnet er ${opt.text}
                            </div>
                            <button class="mission-next-btn" id="next-category-btn">Næste opgave ➔</button>
                        `;
                        feedbackEl.querySelector('#next-category-btn').onclick = () => {
                            currKlasseCategoryIdx++;
                            renderKlasseCategoryTask();
                        };
                    } else {
                        btn.classList.add('selected-wrong');
                        feedbackEl.innerHTML = `
                            <div style="color: #f87171; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem;">
                                ✗ Forkert svaret. Prøv igen!
                            </div>
                        `;
                        setTimeout(() => btn.classList.remove('selected-wrong'), 700);
                    }
                };
                grid.appendChild(btn);
            });

            categoryCard.appendChild(grid);
            categoryCard.appendChild(feedbackEl);
        } else {
            // task.type === 'find_underemner'
            const promptTitle = document.createElement('div');
            promptTitle.style.fontSize = '0.95rem';
            promptTitle.style.color = '#94a3b8';
            promptTitle.style.textTransform = 'uppercase';
            promptTitle.style.letterSpacing = '0.5px';
            promptTitle.textContent = 'Overemne:';
            categoryCard.appendChild(promptTitle);

            const mainCategoryTitle = document.createElement('h2');
            mainCategoryTitle.style.fontSize = '1.8rem';
            mainCategoryTitle.style.color = '#38bdf8';
            mainCategoryTitle.style.margin = '0.3rem 0 0.8rem';
            mainCategoryTitle.textContent = task.overemne;
            categoryCard.appendChild(mainCategoryTitle);

            const qEl = document.createElement('p');
            qEl.style.color = '#cbd5e1';
            qEl.style.fontSize = '1.05rem';
            qEl.style.marginBottom = '1.2rem';
            qEl.textContent = task.question;
            categoryCard.appendChild(qEl);

            const grid = document.createElement('div');
            grid.className = 'category-options-grid';

            const feedbackEl = document.createElement('div');
            feedbackEl.style.marginTop = '1.2rem';

            task.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'category-opt-btn';
                btn.textContent = opt.text;

                btn.onclick = () => {
                    if (btn.classList.contains('selected-correct') || btn.classList.contains('selected-wrong')) return;

                    if (opt.correct) {
                        btn.classList.add('selected-correct');
                        selectedCount++;

                        if (selectedCount === task.targetCount) {
                            feedbackEl.innerHTML = `
                                <div style="color: #4ade80; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.8rem;">
                                    🎉 Rigtigt svaret! Du fandt alle 3 underemner.
                                </div>
                                <button class="mission-next-btn" id="next-category-btn">
                                    ${currKlasseCategoryIdx < klasseCategoryTasks.length - 1 ? 'Næste opgave ➔' : 'Se resultat 🎉'}
                                </button>
                            `;
                            feedbackEl.querySelector('#next-category-btn').onclick = () => {
                                currKlasseCategoryIdx++;
                                renderKlasseCategoryTask();
                            };
                        } else {
                            feedbackEl.innerHTML = `
                                <div style="color: #4ade80; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem;">
                                    ✓ Rigtigt svaret! (${selectedCount} af ${task.targetCount})
                                </div>
                            `;
                        }
                    } else {
                        btn.classList.add('selected-wrong');
                        feedbackEl.innerHTML = `
                            <div style="color: #f87171; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem;">
                                ✗ Forkert svaret. Prøv igen!
                            </div>
                        `;
                        setTimeout(() => btn.classList.remove('selected-wrong'), 700);
                    }
                };
                grid.appendChild(btn);
            });

            categoryCard.appendChild(grid);
            categoryCard.appendChild(feedbackEl);
        }
    }

    renderKlasseCategoryTask();
    kontekstPanel.appendChild(categoryCard);
    panelsHolder.appendChild(kontekstPanel);

    // ========================================================
    // --- 5. DEL: FIND VERBET
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'klasse-panel';
    saetningPanel.dataset.panel = 'tab_saetning';

    const klasseSentenceTasks = [
        {
            subjekt: "Læreren",
            verbum: "forklarer",
            objekt: "opgaven",
            adverbial: "ved tavlen",
            correctText: "Læreren forklarer opgaven ved tavlen.",
            wrongVerbs: ["sover", "kører"]
        },
        {
            subjekt: "Eleven",
            verbum: "stiller",
            objekt: "et spørgsmål",
            adverbial: "i timen",
            correctText: "Eleven stiller et spørgsmål i timen.",
            wrongVerbs: ["koger", "cykler"]
        },
        {
            subjekt: "Kursisten",
            verbum: "skriver",
            objekt: "et svar",
            adverbial: "på papiret",
            correctText: "Kursisten skriver et svar på papiret.",
            wrongVerbs: ["drikker", "løber"]
        },
        {
            subjekt: "Kollegerne",
            verbum: "holder",
            objekt: "et møde",
            adverbial: "på kontoret",
            correctText: "Kollegerne holder et møde på kontoret.",
            wrongVerbs: ["bager", "svømmer"]
        },
        {
            subjekt: "Manden",
            verbum: "arbejder på",
            objekt: "en computer",
            adverbial: "ved bordet",
            correctText: "Manden arbejder på en computer ved bordet.",
            wrongVerbs: ["spiser", "flyver"]
        }
    ];

    let currKlasseSentenceIdx = 0;
    const sentenceCard = document.createElement('div');
    sentenceCard.className = 'sentence-builder-card';

    function renderKlasseSentenceBuilder() {
        sentenceCard.innerHTML = '';
        const task = klasseSentenceTasks[currKlasseSentenceIdx];

        sentenceCard.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div class="mission-badge">${getTranslation('builder_badge').replace('{current}', currKlasseSentenceIdx + 1).replace('{total}', klasseSentenceTasks.length)}</div>
                <h3 style="font-size: 1.6rem; color: white;">${getTranslation('builder_klasse_title')}</h3>
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
                <div class="builder-slot-box slot-verbum" id="slot-v-klasse">
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
                <div class="tray-chips-list" id="verb-chips-klasse"></div>
            </div>

            <div class="live-sentence-preview" id="preview-box-klasse">
                <span id="preview-text-klasse">${getTranslation('builder_preview_default')}</span>
            </div>

            <div style="text-align: center;" id="action-area-klasse"></div>
        `;

        const verbChipsList = sentenceCard.querySelector('#verb-chips-klasse');
        const allVerbs = [task.verbum, ...task.wrongVerbs].sort(() => Math.random() - 0.5);

        allVerbs.forEach(v => {
            const btn = document.createElement('button');
            btn.className = 'tray-chip-btn';
            btn.textContent = v;

            btn.onclick = () => {
                const slotV = sentenceCard.querySelector('#slot-v-klasse');
                const previewText = sentenceCard.querySelector('#preview-text-klasse');
                const actionArea = sentenceCard.querySelector('#action-area-klasse');

                if (v === task.verbum) {
                    slotV.innerHTML = `<span class="slot-role-tag">${getTranslation('builder_slot_verbum')}</span><span>${v} ✓</span>`;
                    slotV.style.background = 'rgba(239, 68, 68, 0.35)';
                    slotV.style.borderColor = '#ef4444';
                    slotV.style.color = '#fca5a5';

                    previewText.innerHTML = `
                        <div style="color: #4ade80; font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem;">
                            ✓ Rigtigt svaret!
                        </div>
                        <div style="font-size: 1.25rem;">
                            <span class="grammar-word word-substantiv">${task.subjekt}</span> 
                            <span class="grammar-word word-verbum">${task.verbum}</span> 
                            <span class="grammar-word word-substantiv">${task.objekt}</span> 
                            <span class="grammar-word word-sted">${task.adverbial}</span>.
                        </div>
                    `;

                    actionArea.innerHTML = `
                        <button class="mission-next-btn" style="margin-top: 0;" id="next-klasse-sent-task">
                            ${currKlasseSentenceIdx < klasseSentenceTasks.length - 1 ? getTranslation('builder_next_btn') : getTranslation('builder_restart_btn')}
                        </button>
                    `;
                    actionArea.querySelector('#next-klasse-sent-task').onclick = () => {
                        currKlasseSentenceIdx = (currKlasseSentenceIdx + 1) % klasseSentenceTasks.length;
                        renderKlasseSentenceBuilder();
                    };
                } else {
                    slotV.innerHTML = `<span class="slot-role-tag">${getTranslation('builder_slot_verbum')}</span><span>${v} ✕</span>`;
                    slotV.style.borderColor = '#ef4444';
                    slotV.style.color = '#f87171';
                    previewText.innerHTML = `
                        <div style="color: #f87171; font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem;">
                            ✗ Forkert svaret.
                        </div>
                        <div style="color: #94a3b8; font-size: 1rem;">
                            ${getTranslation('builder_wrong_feedback')}
                        </div>
                    `;
                }
            };
            verbChipsList.appendChild(btn);
        });
    }

    renderKlasseSentenceBuilder();
    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    container.appendChild(viewContainer);
}
