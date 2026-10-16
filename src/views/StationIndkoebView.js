import { getTranslation, getLang } from '../utils/i18n.js';
import { stationWordTranslations } from '../utils/top100_translations.js';

/**
 * StationIndkoebView - Didaktisk vrimlebillede for semantisk felt: Stationen, indkøb og tiden
 * Dækker 21 centrale højfrekvente substantiver om station, transport, dagligvarer, kalender og tid på døgnet.
 */
export function renderStationIndkoebView(container, navigateFn, extraData = {}) {
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
        .story-nav-pills {
            display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.8rem;
        }
        .story-nav-btn {
            background: #1e293b; color: #94a3b8; border: 2px solid #334155; padding: 0.6rem 1.2rem;
            border-radius: 12px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease;
        }
        .story-nav-btn:hover { border-color: #f59e0b; color: white; transform: translateY(-2px); }
        .story-nav-btn.active {
            background: #d97706; color: white; border-color: #f59e0b; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
        }
        .story-step-card {
            background: #1e293b; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 5px solid #f59e0b;
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
            background: #0f172a; border: 2px solid #f59e0b; color: #f8fafc;
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
        .category-opt-btn:hover { border-color: #f59e0b; transform: translateY(-2px); }
        .category-opt-btn.selected-correct {
            background: rgba(34, 197, 94, 0.25) !important; border-color: #22c55e !important; color: #4ade80 !important;
        }
        .category-opt-btn.selected-wrong {
            background: rgba(239, 68, 68, 0.25) !important; border-color: #ef4444 !important; color: #f87171 !important;
        }

        /* =========================================
           TAB 5: SÆTNINGSBYGGER (UDFORSK & OPGAVER)
           ========================================= */
        .sentence-builder-card {
            max-width: 960px;
            margin: 0 auto;
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        /* Sub-navigation for Tab 5 */
        .sb-sub-nav {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 1rem;
            flex-wrap: wrap;
        }
        .sb-sub-btn {
            background: rgba(15, 23, 42, 0.6);
            color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.75rem 1.4rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-sub-btn:hover {
            color: white;
            border-color: #f59e0b;
            background: rgba(245, 158, 11, 0.1);
        }
        .sb-sub-btn.active {
            background: linear-gradient(135deg, #d97706, #f59e0b);
            color: #0f172a;
            border-color: #fbbf24;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
        }

        /* Grammar Legend */
        .grammar-legend-bar {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.2rem;
            margin-bottom: 1.5rem;
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

        /* Free Builder Styles */
        .sb-category-row {
            margin-bottom: 1.3rem;
            background: rgba(15, 23, 42, 0.45);
            border-radius: 14px;
            padding: 1rem 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-left: 4px solid #64748b;
        }
        .sb-cat-subjekt { border-left-color: #22c55e; }
        .sb-cat-verbum { border-left-color: #ef4444; }
        .sb-cat-objekt { border-left-color: #22c55e; }
        .sb-cat-sted { border-left-color: #0284c7; }

        .sb-category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.7rem;
            flex-wrap: wrap;
            gap: 0.4rem;
        }
        .sb-category-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: #e2e8f0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-category-badge {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
        }
        .badge-cat-subjekt { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .badge-cat-verbum { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
        .badge-cat-objekt { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .badge-cat-sted { background: rgba(2, 132, 199, 0.15); color: #60a5fa; border: 1px solid rgba(2, 132, 199, 0.3); }

        .sb-chips-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .sb-chip-btn {
            background: #1e293b;
            color: #cbd5e1;
            border: 1px solid #475569;
            padding: 0.55rem 1rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sb-chip-btn:hover {
            color: white;
            border-color: #94a3b8;
            transform: translateY(-2px);
        }
        .sb-chip-btn.selected {
            font-weight: 800;
            transform: translateY(-2px);
        }
        .sb-cat-subjekt .sb-chip-btn.selected {
            background: rgba(34, 197, 94, 0.25);
            color: #4ade80;
            border-color: #22c55e;
            box-shadow: 0 0 12px rgba(34, 197, 94, 0.4);
        }
        .sb-cat-verbum .sb-chip-btn.selected {
            background: rgba(239, 68, 68, 0.25);
            color: #fca5a5;
            border-color: #ef4444;
            box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
        }
        .sb-cat-objekt .sb-chip-btn.selected {
            background: rgba(34, 197, 94, 0.25);
            color: #4ade80;
            border-color: #22c55e;
            box-shadow: 0 0 12px rgba(34, 197, 94, 0.4);
        }
        .sb-cat-sted .sb-chip-btn.selected {
            background: rgba(2, 132, 199, 0.25);
            color: #93c5fd;
            border-color: #0284c7;
            box-shadow: 0 0 12px rgba(2, 132, 199, 0.4);
        }

        /* Live Result Box */
        .sb-live-box {
            background: #0f172a;
            border: 2px solid #334155;
            border-radius: 16px;
            padding: 1.4rem;
            margin-top: 1.5rem;
            text-align: center;
        }
        .sb-live-label {
            font-size: 0.8rem;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.6rem;
            font-weight: 700;
        }
        .sb-live-sentence {
            font-size: 1.35rem;
            font-weight: 800;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .grammar-word { font-weight: 800; }
        .word-substantiv { color: #4ade80; }
        .word-verbum { color: #f87171; }
        .word-adjektiv { color: #fb923c; }
        .word-sted { color: #60a5fa; }
        .word-tid { color: #c084fc; }

        .sb-listen-btn {
            background: #1e293b;
            color: #f8fafc;
            border: 1px solid #f59e0b;
            padding: 0.65rem 1.4rem;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-listen-btn:hover {
            background: rgba(245, 158, 11, 0.15);
            box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);
            transform: scale(1.03);
        }

        /* Challenge / Task Mode */
        .sb-task-container {
            animation: fadeIn 0.3s ease;
        }
        .sb-task-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .sb-task-pills {
            display: flex;
            gap: 0.35rem;
            flex-wrap: wrap;
        }
        .sb-task-pill {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #1e293b;
            color: #94a3b8;
            border: 1px solid #475569;
            font-size: 0.8rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        .sb-task-pill.active {
            border-color: #f59e0b;
            color: #0f172a;
            background: #f59e0b;
        }
        .sb-task-pill.done {
            background: #22c55e;
            color: #0f172a;
            border-color: #22c55e;
        }

        /* Step 1: Semantic Match */
        .sb-context-card {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
        }
        .sb-context-title {
            font-size: 1.05rem;
            color: #94a3b8;
            margin-bottom: 0.8rem;
        }
        .sb-context-elements {
            display: flex;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin-bottom: 0.8rem;
        }
        .sb-context-chip {
            padding: 0.5rem 0.9rem;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.95rem;
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
        }
        .sb-context-chip.subjekt { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .sb-context-chip.verbum { background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); }
        .sb-context-chip.sted { background: rgba(2, 132, 199, 0.15); color: #93c5fd; border: 1px solid rgba(2, 132, 199, 0.3); }
        .sb-chip-role { font-size: 0.72rem; text-transform: uppercase; opacity: 0.8; }

        .sb-question-box {
            background: rgba(245, 158, 11, 0.08);
            border: 1px solid rgba(245, 158, 11, 0.25);
            border-radius: 12px;
            padding: 1rem 1.3rem;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .sb-question-text {
            font-size: 1.25rem;
            font-weight: 800;
            color: white;
        }
        .sb-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 0.8rem;
            margin-bottom: 1.5rem;
        }
        .sb-option-btn {
            background: #1e293b;
            color: white;
            border: 2px solid #475569;
            padding: 1rem 1.2rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .sb-option-btn:hover {
            border-color: #f59e0b;
            background: #334155;
            transform: translateY(-2px);
        }
        .sb-option-btn.correct {
            background: rgba(34, 197, 94, 0.25);
            border-color: #22c55e;
            color: #4ade80;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
        }
        .sb-option-btn.incorrect {
            background: rgba(239, 68, 68, 0.2);
            border-color: #ef4444;
            color: #f87171;
            animation: shakeBin 0.4s ease;
        }

        /* Step 2: Puzzle */
        .sb-puzzle-section {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            animation: fadeIn 0.35s ease;
        }
        .sb-puzzle-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.4rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-puzzle-desc {
            font-size: 0.9rem;
            color: #94a3b8;
            margin-bottom: 1.2rem;
        }
        .sb-puzzle-slots {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
            gap: 0.8rem;
            margin-bottom: 1.5rem;
        }
        .sb-puzzle-slot {
            background: #0f172a;
            border: 2px dashed #475569;
            border-radius: 12px;
            padding: 0.9rem;
            min-height: 76px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            position: relative;
        }
        .sb-puzzle-slot.slot-0 { border-color: rgba(34, 197, 94, 0.4); }
        .sb-puzzle-slot.slot-1 { border-color: rgba(239, 68, 68, 0.4); }
        .sb-puzzle-slot.slot-2 { border-color: rgba(34, 197, 94, 0.4); }
        .sb-puzzle-slot.slot-3 { border-color: rgba(2, 132, 199, 0.4); }

        .sb-puzzle-slot .slot-hint {
            font-size: 0.8rem;
            color: #94a3b8;
            font-weight: 700;
        }
        .sb-puzzle-slot .slot-role {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 0.2rem;
            opacity: 0.8;
        }
        .sb-puzzle-slot.filled {
            border-style: solid;
            background: #1e293b;
        }
        .sb-puzzle-slot.filled.slot-0 { border-color: #22c55e; color: #4ade80; }
        .sb-puzzle-slot.filled.slot-1 { border-color: #ef4444; color: #f87171; }
        .sb-puzzle-slot.filled.slot-2 { border-color: #22c55e; color: #4ade80; }
        .sb-puzzle-slot.filled.slot-3 { border-color: #0284c7; color: #60a5fa; }
        .sb-puzzle-slot.filled .slot-remove {
            position: absolute;
            top: 4px;
            right: 6px;
            font-size: 0.75rem;
            color: #94a3b8;
        }

        .sb-puzzle-bank {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            justify-content: center;
            margin-bottom: 1.2rem;
            padding: 1rem;
            background: rgba(15, 23, 42, 0.5);
            border-radius: 12px;
            min-height: 60px;
        }
        .sb-puzzle-chip {
            background: #1e293b;
            color: white;
            border: 2px solid #64748b;
            padding: 0.65rem 1.2rem;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sb-puzzle-chip:hover {
            border-color: #f59e0b;
            transform: translateY(-2px);
        }
        .sb-puzzle-chip.placed {
            opacity: 0.25;
            pointer-events: none;
            cursor: default;
        }
        .sb-feedback-box {
            margin-top: 1rem;
            text-align: center;
        }
        .sb-feedback-msg {
            padding: 0.8rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 1.05rem;
            margin-bottom: 0.8rem;
            display: inline-block;
        }
        .sb-feedback-msg.success {
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
            border: 1px solid #22c55e;
        }
        .sb-feedback-msg.error {
            background: rgba(239, 68, 68, 0.2);
            color: #f87171;
            border: 1px solid #ef4444;
        }
        .sb-action-row {
            display: flex;
            justify-content: center;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin-top: 0.6rem;
        }
        .sb-action-btn {
            background: #d97706;
            color: white;
            border: none;
            padding: 0.7rem 1.4rem;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sb-action-btn:hover {
            background: #b45309;
            transform: translateY(-2px);
        }
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
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/station_indkoeb/' + tabId);
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
        { word: 'en butik', clean: 'butik', gender: 'en', bestemt: 'butikken', flertal: 'butikker', x: 20, y: 12, icon: '🏪', sentence: 'Manden handler i en butik.' },
        { word: 'en verden', clean: 'verden', gender: 'en', bestemt: 'verdenen', flertal: 'verdener', x: 6, y: 24, icon: '🌍', sentence: 'Der er mange lande i verden.' },
        { word: 'et land', clean: 'land', gender: 'et', bestemt: 'landet', flertal: 'lande', x: 9.5, y: 23, icon: '🇩🇰', sentence: 'Danmark er et lille land.' },
        { word: 'et år', clean: 'år', gender: 'et', bestemt: 'året', flertal: 'år', x: 8, y: 33, icon: '📅', sentence: 'Et år har tolv måneder.' },
        { word: 'en måned', clean: 'måned', gender: 'en', bestemt: 'måneden', flertal: 'måneder', x: 4.5, y: 33, icon: '🗓️', sentence: 'Maj er en forårsmåned.' },
        { word: 'en uge', clean: 'uge', gender: 'en', bestemt: 'ugen', flertal: 'uger', x: 6, y: 39, icon: '📆', sentence: 'En uge har syv dage.' },
        { word: 'en dag', clean: 'dag', gender: 'en', bestemt: 'dagen', flertal: 'dage', x: 6.5, y: 36, icon: '☀️', sentence: 'Det er tirsdag i dag.' },
        { word: 'et brød', clean: 'brød', gender: 'et', bestemt: 'brødet', flertal: 'brød', x: 6.5, y: 81, icon: '🍞', sentence: 'Hun køber et frisk brød.' },
        { word: 'en pris', clean: 'pris', gender: 'en', bestemt: 'prisen', flertal: 'priser', x: 13.5, y: 91.5, icon: '🏷️', sentence: 'Skiltet viser varens pris.' },
        { word: 'en mælk', clean: 'mælk', gender: 'en', bestemt: 'mælken', flertal: 'mælk', x: 15, y: 78, icon: '🥛', sentence: 'Hun køber en karton mælk.' },
        { word: 'en flaske', clean: 'flaske', gender: 'en', bestemt: 'flasken', flertal: 'flasker', x: 19.5, y: 71, icon: '🍾', sentence: 'Der står en flaske vand.' },
        { word: 'et æble', clean: 'æble', gender: 'et', bestemt: 'æblet', flertal: 'æbler', x: 22.5, y: 76, icon: '🍎', sentence: 'Drengen spiser et æble.' },
        { word: 'en pose', clean: 'pose', gender: 'en', bestemt: 'posen', flertal: 'poser', x: 29, y: 63, icon: '🛍️', sentence: 'Hun bærer en pose.' },
        { word: 'en bus', clean: 'bus', gender: 'en', bestemt: 'bussen', flertal: 'busser', x: 43.5, y: 47, icon: '🚌', sentence: 'Bussen kører ind til byen.' },
        { word: 'en cykel', clean: 'cykel', gender: 'en', bestemt: 'cyklen', flertal: 'cykler', x: 53, y: 63, icon: '🚲', sentence: 'En cykel holder ved stationen.' },
        { word: 'en time', clean: 'time', gender: 'en', bestemt: 'timen', flertal: 'timer', x: 48.5, y: 15.5, icon: '🕐', sentence: 'Toget kører om en time.' },
        { word: 'en morgen', clean: 'morgen', gender: 'en', bestemt: 'morgenen', flertal: 'morgener', x: 57, y: 7.5, icon: '🌅', sentence: 'Hun rejser tidligt om morgenen.' },
        { word: 'en aften', clean: 'aften', gender: 'en', bestemt: 'aftenen', flertal: 'aftener', x: 66.5, y: 7.5, icon: '🌆', sentence: 'Toget kører om aftenen.' },
        { word: 'en nat', clean: 'nat', gender: 'en', bestemt: 'natten', flertal: 'nætter', x: 71, y: 7.5, icon: '🌙', sentence: 'Det er mørkt om natten.' },
        { word: 'et tog', clean: 'tog', gender: 'et', bestemt: 'toget', flertal: 'tog', x: 88, y: 46, icon: '🚆', sentence: 'Toget holder ved perronen.' },
        { word: 'en billet', clean: 'billet', gender: 'en', bestemt: 'billetten', flertal: 'billetter', x: 81.5, y: 76, icon: '🎫', sentence: 'Hun viser sin billet.' }
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
            title: "Find 3 madvarer i butikken 🍞🍎",
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
            title: "Find 3 transportmidler på stationen 🚆🚌",
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
            title: "Find 3 tider på døgnet 🌅🌙",
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
            title: "Find 3 ord fra kalenderen 📅",
            targetCount: 3,
            options: [
                { text: "et år", correct: true },
                { text: "en billet", correct: false },
                { text: "en måned", correct: true },
                { text: "en uge", correct: true },
                { text: "en mælk", correct: false },
                { text: "et æble", correct: false }
            ]
        },
        {
            title: "Find 3 ting man pakker eller bærer varer i 🛍️🍾",
            targetCount: 3,
            options: [
                { text: "en pose", correct: true },
                { text: "et tog", correct: false },
                { text: "en flaske", correct: true },
                { text: "et år", correct: false },
                { text: "et brød", correct: true },
                { text: "en verden", correct: false }
            ]
        },
        {
            title: "Find 3 ord om rejse og billetter 🎫🚲",
            targetCount: 3,
            options: [
                { text: "en billet", correct: true },
                { text: "en mælk", correct: false },
                { text: "en cykel", correct: true },
                { text: "en aften", correct: false },
                { text: "en bus", correct: true },
                { text: "et æble", correct: false }
            ]
        },
        {
            title: "Find 3 ord om geografi og samfund 🌍🗺️",
            targetCount: 3,
            options: [
                { text: "en verden", correct: true },
                { text: "et minut", correct: false },
                { text: "et land", correct: true },
                { text: "en mælk", correct: false },
                { text: "en butik", correct: true },
                { text: "en nat", correct: false }
            ]
        },
        {
            title: "Find 3 ord om priser og tidsenheder 🏷️⏳",
            targetCount: 3,
            options: [
                { text: "en pris", correct: true },
                { text: "en flaske", correct: false },
                { text: "en time", correct: true },
                { text: "en bus", correct: false },
                { text: "en uge", correct: true },
                { text: "et brød", correct: false }
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

                    if (selectedCount === m.targetCount) {
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.3rem; font-weight: 800; margin-bottom: 0.8rem;">
                                ✓ Rigtigt svaret! ${getTranslation('station_detektiv_complete')}
                            </div>
                            <button class="mission-next-btn" id="next-station-mission">
                                ${currMissionIdx < stationMissions.length - 1 ? getTranslation('station_detektiv_next') : getTranslation('station_detektiv_restart')}
                            </button>
                        `;
                        feedbackEl.querySelector('#next-station-mission').onclick = () => {
                            currMissionIdx = (currMissionIdx + 1) % stationMissions.length;
                            renderStationMission();
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
                            ✗ ${getTranslation('top100_wrong_try_again')}
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

    renderStationMission();
    detektivPanel.appendChild(missionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. DEL: EN LILLE HISTORIE (4 ENKLE HISTORIER) ---
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'station-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const stationStories = [
        {
            title: "1. Toget er forsinket",
            fullStoryText: "Kvinden venter på et tog. Toget er forsinket. Hun har et problem. Hun tager bussen med sin billet.",
            steps: [
                {
                    q: "1. Hvad venter kvinden på?",
                    options: [
                        { text: "Et tog 🚆", correct: true },
                        { text: "En seng 🛏️", correct: false },
                        { text: "Et træ 🌳", correct: false }
                    ]
                },
                {
                    q: "2. Hvad sker der med tiden?",
                    options: [
                        { text: "En fest 🎉", correct: false },
                        { text: "Toget er forsinket ⏰", correct: true },
                        { text: "En blomst 🌸", correct: false }
                    ]
                },
                {
                    q: "3. Hvad har hun nu?",
                    options: [
                        { text: "Et problem ⚠️", correct: true },
                        { text: "En gave 🎁", correct: false },
                        { text: "Et æble 🍎", correct: false }
                    ]
                },
                {
                    q: "4. Hvad gør hun?",
                    options: [
                        { text: "Hun sover på perronen 😴", correct: false },
                        { text: "Hun tager bussen med sin billet 💡", correct: true }
                    ]
                }
            ]
        },
        {
            title: "2. En tur i butikken",
            fullStoryText: "Manden handler i en butik. Han køber mælk og brød. Skiltet viser varens pris. Kunden lægger maden i en pose.",
            steps: [
                {
                    q: "1. Hvor handler manden?",
                    options: [
                        { text: "I en butik 🏪", correct: true },
                        { text: "I skoven 🌲", correct: false },
                        { text: "På stranden 🏖️", correct: false }
                    ]
                },
                {
                    q: "2. Hvad køber han?",
                    options: [
                        { text: "En cykel 🚲", correct: false },
                        { text: "Mælk og brød 🍞", correct: true },
                        { text: "En seng 🛏️", correct: false }
                    ]
                },
                {
                    q: "3. Hvad viser skiltet?",
                    options: [
                        { text: "Varens pris 🏷️", correct: true },
                        { text: "Et tog 🚆", correct: false },
                        { text: "En sang 🎵", correct: false }
                    ]
                },
                {
                    q: "4. Hvor lægger kunden maden?",
                    options: [
                        { text: "På gulvet 🗑️", correct: false },
                        { text: "I en pose 🛍️", correct: true },
                        { text: "I lommen 👖", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. Morgentoget på arbejde",
            fullStoryText: "Hun rejser tidligt om morgenen. Cyklen står ved stationen. Hun viser sin billet. Toget kører til tiden.",
            steps: [
                {
                    q: "1. Hvornår rejser hun?",
                    options: [
                        { text: "Tidligt om morgenen 🌅", correct: true },
                        { text: "Midt om natten 🌙", correct: false },
                        { text: "Aldrig 🛑", correct: false }
                    ]
                },
                {
                    q: "2. Hvor står cyklen?",
                    options: [
                        { text: "I stuen 🛋️", correct: false },
                        { text: "Ved stationen 🚲", correct: true },
                        { text: "I vandet 🌊", correct: false }
                    ]
                },
                {
                    q: "3. Hvad viser hun?",
                    options: [
                        { text: "Sin billet 🎫", correct: true },
                        { text: "Et æble 🍎", correct: false },
                        { text: "En sko 👟", correct: false }
                    ]
                },
                {
                    q: "4. Hvad gør toget?",
                    options: [
                        { text: "Toget stopper for altid 🛑", correct: false },
                        { text: "Toget kører til tiden 🚆", correct: true },
                        { text: "Toget sover 💤", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. Planlæg en tur",
            fullStoryText: "Det er tirsdag i dag. Maj er en forårsmåned. Familien vil rejse rundt i Danmark. Toget kører om en time.",
            steps: [
                {
                    q: "1. Hvilken dag er det?",
                    options: [
                        { text: "Det er tirsdag i dag 📅", correct: true },
                        { text: "Det er jul 🎄", correct: false },
                        { text: "Det er nat 🌌", correct: false }
                    ]
                },
                {
                    q: "2. Hvilken måned rejser de i?",
                    options: [
                        { text: "December er kold ❄️", correct: false },
                        { text: "Maj er en forårsmåned 🗓️", correct: true },
                        { text: "Natten er lang 🌃", correct: false }
                    ]
                },
                {
                    q: "3. Hvor vil de rejse hen?",
                    options: [
                        { text: "Rundt i Danmark 🇩🇰", correct: true },
                        { text: "Til månen 🌕", correct: false },
                        { text: "I kælderen 🗝️", correct: false }
                    ]
                },
                {
                    q: "4. Hvornår kører toget?",
                    options: [
                        { text: "Toget kørte for et år siden ⏳", correct: false },
                        { text: "Toget kører om en time ⏰", correct: true },
                        { text: "Aldrig 🛑", correct: false }
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
        descEl.textContent = 'Vælg det rigtige ord for at bygge historien:';
        storyContainer.appendChild(descEl);

        const stepsHolder = document.createElement('div');
        stepsHolder.className = 'story-steps-list';

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

                        const nextStepCard = stepsHolder.querySelector(`#station-step-${sIdx + 1}`);
                        if (nextStepCard) {
                            nextStepCard.style.opacity = '1';
                            nextStepCard.style.pointerEvents = 'auto';
                            nextStepCard.classList.add('active-step');
                        } else {
                            const completeBox = storyContainer.querySelector('#station-story-complete-box');
                            if (completeBox) {
                                completeBox.style.display = 'block';
                                completeBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                        }
                    } else {
                        optBtn.classList.add('wrong');
                        stepFeedback.innerHTML = `<div style="color: #f87171; font-weight: 700; margin-top: 0.6rem;">✗ ${getTranslation('top100_wrong_try_again')}</div>`;
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
        completeBox.id = 'station-story-complete-box';
        completeBox.className = 'story-explanation-box';
        completeBox.style.display = 'none';

        const isLastStory = currStationStoryIdx === stationStories.length - 1;
        completeBox.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">
                🎉 Flot klaret! Du har gennemført historien.
            </div>
            <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">
                <button class="story-opt-btn" id="btn-next-station-story" style="background: #22c55e; color: #0f172a; font-weight: 800;">
                    ${isLastStory ? 'Start forfra ↺' : 'Gå til næste historie ➔'}
                </button>
            </div>
        `;
        storyContainer.appendChild(completeBox);

        completeBox.querySelector('#btn-next-station-story').onclick = () => {
            currStationStoryIdx = (currStationStoryIdx + 1) % stationStories.length;
            renderActiveStationStory();
        };
    }

    renderActiveStationStory();
    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 4. DEL: OVEREMNE OG UNDEREMNE (Model C)
    // ========================================================
    const kontekstPanel = document.createElement('div');
    kontekstPanel.className = 'station-panel';
    kontekstPanel.dataset.panel = 'tab_kontekst';

    const stationCategoryTasks = [
        {
            type: "find_overemne",
            subwords: ["en dag 📅", "en time ⏰", "en uge 🗓️"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Tid ⏰", correct: true },
                { text: "Kæledyr 🐕", correct: false },
                { text: "Møbler 🪑", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["et tog 🚆", "en bus 🚌", "en billet 🎫"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Offentlig transport 🚆", correct: true },
                { text: "Kroppen 🦶", correct: false },
                { text: "Vejret 🌤️", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Indkøb i butikken 🛍️",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "en butik 🏪", correct: true },
                { text: "en pose 🛍️", correct: true },
                { text: "en vare 🏷️", correct: true },
                { text: "et træ 🌳", correct: false },
                { text: "en seng 🛏️", correct: false },
                { text: "en skov 🌲", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Årets tidspunkter 🗓️",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "et minut ⏱️", correct: true },
                { text: "en måned 📅", correct: true },
                { text: "et år ⏳", correct: true },
                { text: "en cykel 🚲", correct: false },
                { text: "en kop ☕", correct: false },
                { text: "en hund 🐕", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["en morgen 🌅", "en aften 🌆", "en nat 🌙"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Døgnets tider 🌅", correct: true },
                { text: "Møbler 🪑", correct: false },
                { text: "Kroppen 🦶", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["en verden 🌍", "et land 🇩🇰", "en by 🏙️"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Geografi og verden 🌍", correct: true },
                { text: "Mad 🍞", correct: false },
                { text: "Teknologi 💻", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Dagligvarer i kurven 🥛",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "en mælk 🥛", correct: true },
                { text: "et brød 🍞", correct: true },
                { text: "et æble 🍎", correct: true },
                { text: "et tog 🚆", correct: false },
                { text: "en cykel 🚲", correct: false },
                { text: "et land 🌍", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Rejse og transport 🚲",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "en cykel 🚲", correct: true },
                { text: "en billet 🎫", correct: true },
                { text: "en bus 🚌", correct: true },
                { text: "en flaske 🍾", correct: false },
                { text: "en seng 🛏️", correct: false },
                { text: "et ur ⏰", correct: false }
            ]
        }
    ];

    let currStationCategoryIdx = 0;
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';

    function renderStationCategoryTask() {
        categoryCard.innerHTML = '';

        if (currStationCategoryIdx >= stationCategoryTasks.length) {
            categoryCard.innerHTML = `
                <div style="font-size: 2.8rem; margin-bottom: 0.6rem;">🎉</div>
                <h2 style="font-size: 1.8rem; color: #4ade80; margin-bottom: 0.6rem;">${getTranslation('top100_category_complete_title')}</h2>
                <p style="color: #cbd5e1; font-size: 1.05rem; margin-bottom: 1.6rem;">
                    ${getTranslation('top100_category_complete_desc')}
                </p>
                <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
                    <button class="mission-next-btn" id="restart-station-category-btn" style="background: #475569; color: white;">
                        ${getTranslation('top100_start_over_btn')}
                    </button>
                    <button class="mission-next-btn" id="station-category-next-tab-btn" style="background: #22c55e; color: #0f172a;">
                        ${getTranslation('top100_goto_saetning_btn')}
                    </button>
                </div>
            `;
            categoryCard.querySelector('#restart-station-category-btn').onclick = () => {
                currStationCategoryIdx = 0;
                renderStationCategoryTask();
            };
            categoryCard.querySelector('#station-category-next-tab-btn').onclick = () => {
                switchTab('tab_saetning');
            };
            return;
        }

        const task = stationCategoryTasks[currStationCategoryIdx];
        let selectedCount = 0;

        const badge = document.createElement('div');
        badge.className = 'category-badge';
        badge.textContent = `🏷️ ${getTranslation('top100_task_counter').replace('{current}', currStationCategoryIdx + 1).replace('{total}', stationCategoryTasks.length)}`;
        categoryCard.appendChild(badge);

        if (task.type === 'find_overemne') {
            const promptTitle = document.createElement('h3');
            promptTitle.style.fontSize = '1.35rem';
            promptTitle.style.color = '#94a3b8';
            promptTitle.style.margin = '0.3rem 0 0.8rem';
            promptTitle.textContent = getTranslation('top100_underemner_label');
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
            qEl.textContent = getTranslation('top100_q_find_overemne');
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
                                ✓ ${getTranslation("top100_correct_overemne_prefix")} ${opt.text}
                            </div>
                            <button class="mission-next-btn" id="next-category-btn">${getTranslation('top100_next_task_btn')}</button>
                        `;
                        feedbackEl.querySelector('#next-category-btn').onclick = () => {
                            currStationCategoryIdx++;
                            renderStationCategoryTask();
                        };
                    } else {
                        btn.classList.add('selected-wrong');
                        feedbackEl.innerHTML = `
                            <div style="color: #f87171; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem;">
                                ✗ ${getTranslation('top100_wrong_try_again')}
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
            promptTitle.textContent = getTranslation('top100_overemne_label');
            categoryCard.appendChild(promptTitle);

            const mainCategoryTitle = document.createElement('h2');
            mainCategoryTitle.style.fontSize = '1.8rem';
            mainCategoryTitle.style.color = '#f59e0b';
            mainCategoryTitle.style.margin = '0.3rem 0 0.8rem';
            mainCategoryTitle.textContent = task.overemne;
            categoryCard.appendChild(mainCategoryTitle);

            const qEl = document.createElement('p');
            qEl.style.color = '#cbd5e1';
            qEl.style.fontSize = '1.05rem';
            qEl.style.marginBottom = '1.2rem';
            qEl.textContent = getTranslation('top100_q_find_underemner');
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
                                    🎉 ${getTranslation('top100_correct_all_underemner')}
                                </div>
                                <button class="mission-next-btn" id="next-category-btn">
                                    ${currStationCategoryIdx < stationCategoryTasks.length - 1 ? getTranslation('top100_next_task_btn') : getTranslation('top100_see_result_btn')}
                                </button>
                            `;
                            feedbackEl.querySelector('#next-category-btn').onclick = () => {
                                currStationCategoryIdx++;
                                renderStationCategoryTask();
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
                                ✗ ${getTranslation('top100_wrong_try_again')}
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

    renderStationCategoryTask();
    kontekstPanel.appendChild(categoryCard);
    panelsHolder.appendChild(kontekstPanel);

    // ========================================================
    // --- 5. DEL: SÆTNINGSBYGGER (UDFORSK & OPGAVER)
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'station-panel';
    saetningPanel.dataset.panel = 'tab_saetning';

    const sentenceCard = document.createElement('div');
    sentenceCard.className = 'sentence-builder-card';

    // Sub-navigation: 1. Udforsk & Byg selv vs 2. Opgave & Puslespil
    const sbSubNav = document.createElement('div');
    sbSubNav.className = 'sb-sub-nav';

    const subTab1Btn = document.createElement('button');
    subTab1Btn.className = 'sb-sub-btn active';
    subTab1Btn.innerHTML = `<span>🎨</span> 1. Udforsk & Byg selv`;

    const subTab2Btn = document.createElement('button');
    subTab2Btn.className = 'sb-sub-btn';
    subTab2Btn.innerHTML = `<span>🧩</span> 2. Opgave & Puslespil`;

    sbSubNav.appendChild(subTab1Btn);
    sbSubNav.appendChild(subTab2Btn);
    sentenceCard.appendChild(sbSubNav);

    // Containers for the two sub-tabs
    const freeBuilderContainer = document.createElement('div');
    freeBuilderContainer.className = 'sb-free-container';

    const challengeContainer = document.createElement('div');
    challengeContainer.className = 'sb-challenge-container';
    challengeContainer.style.display = 'none';

    sentenceCard.appendChild(freeBuilderContainer);
    sentenceCard.appendChild(challengeContainer);

    subTab1Btn.onclick = () => {
        subTab1Btn.classList.add('active');
        subTab2Btn.classList.remove('active');
        freeBuilderContainer.style.display = 'block';
        challengeContainer.style.display = 'none';
    };

    subTab2Btn.onclick = () => {
        subTab2Btn.classList.add('active');
        subTab1Btn.classList.remove('active');
        freeBuilderContainer.style.display = 'none';
        challengeContainer.style.display = 'block';
    };

    // ========================================================
    // --- SUB-TAB 1: DEN FRIE SÆTNINGSBYGGER (UDFORSK)
    // ========================================================
    function setupFreeBuilder() {
        freeBuilderContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.7rem; color: white; margin-bottom: 0.4rem;">Byg dine egne sætninger om stationen og indkøb</h3>
                <p style="color: #94a3b8; font-size: 1.05rem; max-width: 650px; margin: 0 auto;">
                    Vælg et element fra hver række herunder. Prøv forskellige kombinationer og lyt til hvordan sætningen lyder på dansk!
                </p>
            </div>

            <!-- Grammatisk farveforklaring -->
            <div class="grammar-legend-bar">
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>1. Hvem?</strong> (Subjekt - grøn)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-verbum"></span> <strong>2. Handling</strong> (Verbum - rød)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>3. Hvilken ting?</strong> (Objekt - grøn)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-sted"></span> <strong>4. Hvor?</strong> (Sted - blå)</div>
            </div>

            <div id="free-builder-rows-station"></div>

            <!-- Live Output Sentence -->
            <div class="sb-live-box">
                <div class="sb-live-label">Din samlede sætning</div>
                <div class="sb-live-sentence" id="free-live-sentence-station"></div>
                <button class="sb-listen-btn" id="free-listen-btn-station">
                    <span>🔊</span> Hør udtale
                </button>
            </div>
        `;

        const freeCategories = [
            {
                id: 'subjekt',
                title: '1. Hvem taler vi om?',
                role: 'Subjekt',
                catClass: 'sb-cat-subjekt',
                badgeClass: 'badge-cat-subjekt',
                icon: '👤',
                options: ['Passageren', 'Kunden', 'Manden', 'Kvinden', 'Drengen', 'Barnet', 'Chaufføren', 'Turisten']
            },
            {
                id: 'verbum',
                title: '2. Hvad laver personen / dyret?',
                role: 'Verbum',
                catClass: 'sb-cat-verbum',
                badgeClass: 'badge-cat-verbum',
                icon: '⚡',
                options: ['køber', 'viser', 'venter på', 'spiser', 'drikker', 'bærer', 'kører i', 'hælder']
            },
            {
                id: 'objekt',
                title: '3. Hvilken genstand eller ting?',
                role: 'Objekt (Ting)',
                catClass: 'sb-cat-objekt',
                badgeClass: 'badge-cat-objekt',
                icon: '📦',
                options: ['en billet', 'et frisk brød', 'et rødt æble', 'en flaske vand', 'en liter mælk', 'en pose', 'et tog', 'en bus']
            },
            {
                id: 'sted',
                title: '4. Hvor sker det?',
                role: 'Sted (Rum)',
                catClass: 'sb-cat-sted',
                badgeClass: 'badge-cat-sted',
                icon: '📍',
                options: ['på stationen', 'i butikken', 'ved perronen', 'i bussen', 'ved kassen', 'i toget', 'på gaden', 'ved stoppestedet']
            }
        ];

        let selected = ['Passageren', 'viser', 'en billet', 'i toget'];

        const rowsContainer = freeBuilderContainer.querySelector('#free-builder-rows-station');
        const liveSentenceEl = freeBuilderContainer.querySelector('#free-live-sentence-station');
        const listenBtn = freeBuilderContainer.querySelector('#free-listen-btn-station');

        function updateSentence() {
            liveSentenceEl.innerHTML = `
                <span class="grammar-word word-substantiv">${selected[0]}</span>
                <span class="grammar-word word-verbum">${selected[1]}</span>
                <span class="grammar-word word-substantiv">${selected[2]}</span>
                <span class="grammar-word word-sted">${selected[3]}</span>.
            `;
        }

        listenBtn.onclick = () => {
            speakDanish(`${selected[0]} ${selected[1]} ${selected[2]} ${selected[3]}`);
        };

        freeCategories.forEach((cat, catIdx) => {
            const row = document.createElement('div');
            row.className = `sb-category-row ${cat.catClass}`;

            row.innerHTML = `
                <div class="sb-category-header">
                    <div class="sb-category-title">
                        <span>${cat.icon}</span> ${cat.title}
                    </div>
                    <span class="sb-category-badge ${cat.badgeClass}">${cat.role}</span>
                </div>
                <div class="sb-chips-grid"></div>
            `;

            const grid = row.querySelector('.sb-chips-grid');

            cat.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = `sb-chip-btn ${selected[catIdx] === opt ? 'selected' : ''}`;
                btn.textContent = opt;

                btn.onclick = () => {
                    selected[catIdx] = opt;
                    grid.querySelectorAll('.sb-chip-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    updateSentence();
                    speakDanish(opt);
                };

                grid.appendChild(btn);
            });

            rowsContainer.appendChild(row);
        });

        updateSentence();
    }

    // ========================================================
    // --- SUB-TAB 2: OPGAVE & PUSLESPIL (UDFORDRINGEN)
    // ========================================================
    const stationChallengeTasks = [
        {
            context: "Kontrolløren går gennem vognen for at tjekke de rejsende.",
            subjekt: "Passageren",
            verbum: "viser",
            sted: "i toget",
            questionPrompt: "Hvad viser passageren i toget?",
            targetWord: "en billet",
            distractors: ["en cykel", "et æble", "et land"],
            pedagogyNote: "Man skal altid have gyldig billet for at køre med toget."
        },
        {
            context: "Det dufter dejligt af nybagte varer ved bagerdisken.",
            subjekt: "Kunden",
            verbum: "køber",
            sted: "i butikken",
            questionPrompt: "Hvad køber kunden i butikken?",
            targetWord: "et frisk brød",
            distractors: ["en bus", "en time", "en billet"],
            pedagogyNote: "Man kan købe varmt og frisk brød hos bageren i butikken."
        },
        {
            context: "Han sidder og hviler sig efter en lang gåtur i byen.",
            subjekt: "Drengen",
            verbum: "spiser",
            sted: "på bænken",
            questionPrompt: "Hvad spiser drengen på bænken?",
            targetWord: "et rødt æble",
            distractors: ["en flaske", "et tog", "en verden"],
            pedagogyNote: "Et saftigt æble er en sund og god snack."
        },
        {
            context: "Rejsende står klar med kufferter på perron 2 og kigger på skærmen.",
            subjekt: "Pendlere",
            verbum: "venter på",
            sted: "ved perronen",
            questionPrompt: "Hvad venter pendlere på ved perronen?",
            targetWord: "et tog",
            distractors: ["en mælk", "en pose", "et brød"],
            pedagogyNote: "Toget ankommer til tiden og kører videre til næste by."
        },
        {
            context: "Solen bager på den lange togtur mod København.",
            subjekt: "Kvinden",
            verbum: "drikker",
            sted: "på rejsen",
            questionPrompt: "Hvad drikker kvinden på rejsen?",
            targetWord: "en flaske vand",
            distractors: ["et tog", "en cykel", "en pris"],
            pedagogyNote: "Det er vigtigt at slukke tørsten med en flaske koldt vand."
        },
        {
            context: "Varerne er betalt, og det er tid til at gå hjem og lave mad.",
            subjekt: "Manden",
            verbum: "bærer",
            sted: "fra butikken",
            questionPrompt: "Hvad bærer manden fra butikken?",
            targetWord: "en pose",
            distractors: ["en bus", "et år", "en morgen"],
            pedagogyNote: "Man pakker sine dagligvarer i en pose ved kassen."
        },
        {
            context: "Den rejsende har fundet stoppestedet og skal ind til rådhuset.",
            subjekt: "Turisten",
            verbum: "kører i",
            sted: "ind til byen",
            questionPrompt: "Hvad kører turisten i ind til byen?",
            targetWord: "en bus",
            distractors: ["en mælk", "et brød", "en aften"],
            pedagogyNote: "Bussen er et praktisk transportmiddel i byen."
        },
        {
            context: "Morgenmaden er serveret på bordet inden skole og arbejde.",
            subjekt: "Pigen",
            verbum: "hælder",
            sted: "i glasset",
            questionPrompt: "Hvad hælder pigen i glasset?",
            targetWord: "en liter mælk",
            distractors: ["en cykel", "et tog", "en billet"],
            pedagogyNote: "Mælk er hvid og god at drikke til havregrynene."
        }
    ];

    let currentStationChallengeIdx = 0;
    const completedStationChallenges = new Set();

    function setupStationChallenge() {
        challengeContainer.innerHTML = '';
        const task = stationChallengeTasks[currentStationChallengeIdx];

        // Header with pills
        const header = document.createElement('div');
        header.className = 'sb-task-header';

        const titleDiv = document.createElement('div');
        titleDiv.innerHTML = `
            <div style="font-size: 0.85rem; color: #f59e0b; font-weight: 800; text-transform: uppercase;">
                Udfordring ${currentStationChallengeIdx + 1} af ${stationChallengeTasks.length}
            </div>
            <h3 style="font-size: 1.5rem; color: white; margin: 0.2rem 0;">Find tingen & saml puslespillet</h3>
        `;
        header.appendChild(titleDiv);

        const pills = document.createElement('div');
        pills.className = 'sb-task-pills';
        stationChallengeTasks.forEach((_, idx) => {
            const pill = document.createElement('div');
            pill.className = `sb-task-pill ${idx === currentStationChallengeIdx ? 'active' : ''} ${completedStationChallenges.has(idx) ? 'done' : ''}`;
            pill.textContent = idx + 1;
            pill.onclick = () => {
                currentStationChallengeIdx = idx;
                setupStationChallenge();
            };
            pills.appendChild(pill);
        });
        header.appendChild(pills);
        challengeContainer.appendChild(header);

        // Step 1: Context & Semantic Match
        const contextCard = document.createElement('div');
        contextCard.className = 'sb-context-card';
        contextCard.innerHTML = `
            <div class="sb-context-title">📍 <em>${task.context}</em></div>
            <div class="sb-context-elements">
                <div class="sb-context-chip subjekt">
                    <span class="sb-chip-role">1. Hvem?</span>
                    <span>${task.subjekt}</span>
                </div>
                <div class="sb-context-chip verbum">
                    <span class="sb-chip-role">2. Handling</span>
                    <span>${task.verbum}</span>
                </div>
                <div class="sb-context-chip sted">
                    <span class="sb-chip-role">4. Hvor?</span>
                    <span>${task.sted}</span>
                </div>
            </div>
        `;
        challengeContainer.appendChild(contextCard);

        // Question box: Spørgsmål 3 (Genstand / Objekt)
        const qBox = document.createElement('div');
        qBox.className = 'sb-question-box';
        qBox.innerHTML = `
            <div style="font-size: 0.85rem; color: #f59e0b; font-weight: 700; text-transform: uppercase; margin-bottom: 0.3rem;">
                Spørgsmål 3: Genstand / Objekt (Kernen i opgaven)
            </div>
            <div class="sb-question-text">${task.questionPrompt}</div>
        `;
        challengeContainer.appendChild(qBox);

        // Options Grid (4 substantiver fra scenen)
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'sb-options-grid';

        const allOptions = [task.targetWord, ...task.distractors].sort(() => Math.random() - 0.5);

        const puzzleContainer = document.createElement('div');
        puzzleContainer.className = 'sb-puzzle-section';
        puzzleContainer.style.display = 'none';

        allOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'sb-option-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                if (btn.classList.contains('correct')) return;

                if (opt === task.targetWord) {
                    btn.classList.add('correct');
                    optionsGrid.querySelectorAll('.sb-option-btn').forEach(b => {
                        if (b !== btn) b.style.opacity = '0.4';
                        b.style.pointerEvents = 'none';
                    });

                    speakDanish(opt);

                    // Show Step 2: Puslespil
                    renderStationPuzzleStep(puzzleContainer, task);
                    puzzleContainer.style.display = 'block';
                    puzzleContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    btn.classList.add('incorrect');
                    speakDanish("Nej, prøv igen");
                    setTimeout(() => btn.classList.remove('incorrect'), 600);
                }
            };

            optionsGrid.appendChild(btn);
        });

        challengeContainer.appendChild(optionsGrid);
        challengeContainer.appendChild(puzzleContainer);
    }

    // Step 2: Puzzle (Saml sætningen i V2 / SVO-rækkefølge)
    function renderStationPuzzleStep(container, task) {
        container.innerHTML = `
            <div class="sb-puzzle-title">
                <span>🧩</span> Trin 2: Puslespillet – Saml hele sætningen!
            </div>
            <div class="sb-puzzle-desc">
                Klik på brikkerne i den rigtige danske ordstilling: <strong>1. Hvem ➔ 2. Handling ➔ 3. Hvilken ting ➔ 4. Hvor</strong>.
            </div>

            <!-- 4 Slots -->
            <div class="sb-puzzle-slots" id="station-puzzle-slots">
                <div class="sb-puzzle-slot slot-0" data-idx="0">
                    <span class="slot-hint">1. Hvem?</span>
                    <span class="slot-role">[Subjekt]</span>
                </div>
                <div class="sb-puzzle-slot slot-1" data-idx="1">
                    <span class="slot-hint">2. Handling?</span>
                    <span class="slot-role">[Verbum]</span>
                </div>
                <div class="sb-puzzle-slot slot-2" data-idx="2">
                    <span class="slot-hint">3. Hvilken ting?</span>
                    <span class="slot-role">[Objekt]</span>
                </div>
                <div class="sb-puzzle-slot slot-3" data-idx="3">
                    <span class="slot-hint">4. Hvor?</span>
                    <span class="slot-role">[Sted]</span>
                </div>
            </div>

            <!-- Bank of chips -->
            <div class="sb-puzzle-bank" id="station-puzzle-bank"></div>

            <!-- Feedback -->
            <div class="sb-feedback-box" id="station-puzzle-feedback"></div>
        `;

        const correctOrder = [task.subjekt, task.verbum, task.targetWord, task.sted];
        const scrambledWords = [...correctOrder].sort(() => Math.random() - 0.5);

        let placedSlots = [null, null, null, null];

        const slotsEl = container.querySelector('#station-puzzle-slots');
        const bankEl = container.querySelector('#station-puzzle-bank');
        const feedbackEl = container.querySelector('#station-puzzle-feedback');

        function updateSlotsAndBank() {
            // Update slots
            slotsEl.querySelectorAll('.sb-puzzle-slot').forEach((slot, idx) => {
                const word = placedSlots[idx];
                const hints = [
                    { h: '1. Hvem?', r: '[Subjekt]' },
                    { h: '2. Handling?', r: '[Verbum]' },
                    { h: '3. Hvilken ting?', r: '[Objekt]' },
                    { h: '4. Hvor?', r: '[Sted]' }
                ];

                if (word) {
                    slot.className = `sb-puzzle-slot filled slot-${idx}`;
                    slot.innerHTML = `
                        <span class="slot-remove" title="Fjern">✕</span>
                        <span style="font-weight: 800; font-size: 1.05rem;">${word}</span>
                        <span class="slot-role">${hints[idx].r}</span>
                    `;
                    slot.onclick = () => {
                        placedSlots[idx] = null;
                        updateSlotsAndBank();
                    };
                } else {
                    slot.className = `sb-puzzle-slot slot-${idx}`;
                    slot.innerHTML = `
                        <span class="slot-hint">${hints[idx].h}</span>
                        <span class="slot-role">${hints[idx].r}</span>
                    `;
                    slot.onclick = null;
                }
            });

            // Update bank
            bankEl.innerHTML = '';
            const usedCounts = {};
            placedSlots.filter(Boolean).forEach(w => usedCounts[w] = (usedCounts[w] || 0) + 1);

            scrambledWords.forEach(word => {
                const btn = document.createElement('button');
                btn.className = 'sb-puzzle-chip';
                btn.textContent = word;

                const isPlaced = (usedCounts[word] || 0) > 0;
                if (isPlaced) {
                    btn.classList.add('placed');
                    usedCounts[word]--;
                } else {
                    btn.onclick = () => {
                        const firstEmpty = placedSlots.indexOf(null);
                        if (firstEmpty !== -1) {
                            placedSlots[firstEmpty] = word;
                            speakDanish(word);
                            updateSlotsAndBank();
                        }
                    };
                }

                bankEl.appendChild(btn);
            });

            // Check if all 4 are filled
            if (!placedSlots.includes(null)) {
                checkPuzzle();
            } else {
                feedbackEl.innerHTML = '';
            }
        }

        function checkPuzzle() {
            const isCorrect = placedSlots.every((w, i) => w === correctOrder[i]);
            const fullSentence = `${placedSlots[0]} ${placedSlots[1]} ${placedSlots[2]} ${placedSlots[3]}.`;

            if (isCorrect) {
                completedStationChallenges.add(currentStationChallengeIdx);
                speakDanish(fullSentence);

                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg success">
                        🎉 Fantastisk! "<strong>${fullSentence}</strong>" ✓
                    </div>
                    <div style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.8rem;">
                        💡 ${task.pedagogyNote}
                    </div>
                    <div class="sb-action-row">
                        <button class="sb-listen-btn" id="station-listen-full">
                            <span>🔊</span> Hør sætningen igen
                        </button>
                        <button class="sb-action-btn" id="station-next-btn">
                            ${currentStationChallengeIdx < stationChallengeTasks.length - 1 ? 'Næste opgave ➔' : 'Start forfra 🔄'}
                        </button>
                    </div>
                `;

                feedbackEl.querySelector('#station-listen-full').onclick = () => speakDanish(fullSentence);
                feedbackEl.querySelector('#station-next-btn').onclick = () => {
                    currentStationChallengeIdx = (currentStationChallengeIdx + 1) % stationChallengeTasks.length;
                    setupStationChallenge();
                };
            } else {
                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg error">
                        ✗ Rækkefølgen er ikke helt rigtig.
                    </div>
                    <div style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.6rem;">
                        Husk rækkefølgen på dansk: 1. Hvem (Subjekt) ➔ 2. Handling (Verbum) ➔ 3. Hvilken ting (Objekt) ➔ 4. Hvor (Sted).
                    </div>
                    <button class="sb-action-btn" id="station-retry-btn" style="background: #475569;">
                        Nulstil brikker 🔄
                    </button>
                `;

                feedbackEl.querySelector('#station-retry-btn').onclick = () => {
                    placedSlots = [null, null, null, null];
                    updateSlotsAndBank();
                };
            }
        }

        updateSlotsAndBank();
    }

    // Initialize both sub-tabs
    setupFreeBuilder();
    setupStationChallenge();
    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    const initialTab = (extraData && (extraData.subPath || extraData.activeTab || extraData.tab)) || 'tab_vrimmel';
    switchTab(initialTab);

    container.appendChild(viewContainer);
}
