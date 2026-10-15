import { getTranslation, getLang } from '../utils/i18n.js';
import { byrumWordTranslations } from '../utils/top100_translations.js';

/**
 * ByrummetView - Didaktisk vrimlebillede for semantisk felt: Byrummet (byen, gaden, hverdagen)
 * Dækker 60-70% af de 100 mest almindelige danske substantiver.
 */
export function renderByrummetView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container byrum-vrimmel-view';

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
        .byrum-vrimmel-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .byrum-hero-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .byrum-hero-header h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #38bdf8, #818cf8, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .byrum-hero-header p {
            color: #94a3b8;
            font-size: 1.1rem;
            max-width: 780px;
            margin: 0 auto;
            line-height: 1.5;
        }

        /* Tabs Navigation */
        .byrum-tabs {
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
        .byrum-tab-btn {
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
        .byrum-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.06);
        }
        .byrum-tab-btn.active {
            background: #3b82f6;
            color: white;
            box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
        }

        /* Panels */
        .byrum-panel {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .byrum-panel.active {
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
        .radar-toggle-wrapper {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .radar-toggle-btn {
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
        .radar-toggle-btn.active {
            background: linear-gradient(135deg, #0284c7, #ea580c);
            border-color: #38bdf8;
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
            color: white;
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
        .radar-legend {
            display: flex;
            align-items: center;
            gap: 1.2rem;
            font-size: 0.9rem;
        }
        .legend-item {
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .legend-dot-en { width: 14px; height: 14px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 8px #38bdf8; }
        .legend-dot-et { width: 14px; height: 14px; border-radius: 50%; background: #f97316; box-shadow: 0 0 8px #f97316; }

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

        /* Radar Active Pulses */
        .radar-active .vrimmel-hotspot.hotspot-en {
            background: rgba(2, 132, 199, 0.92);
            color: white;
            border-color: #7dd3fc;
            box-shadow: 0 0 14px rgba(56, 189, 248, 0.9);
            animation: pulseBlue 1.6s infinite;
        }
        .radar-active .vrimmel-hotspot.hotspot-et {
            background: rgba(234, 88, 12, 0.92);
            color: white;
            border-color: #fdba74;
            box-shadow: 0 0 14px rgba(249, 115, 22, 0.9);
            animation: pulseOrange 1.6s infinite;
        }
        @keyframes pulseBlue {
            0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 10px #38bdf8; }
            50% { transform: translate(-50%, -50%) scale(1.22); box-shadow: 0 0 22px #38bdf8; }
        }
        @keyframes pulseOrange {
            0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 10px #f97316; }
            50% { transform: translate(-50%, -50%) scale(1.22); box-shadow: 0 0 22px #f97316; }
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
        /* Grammatisk farvesystematik:
           🟢 Substantiv/Pronomen (Subjekt & Objekt): Grøn
           🔴 Verbum: Rød
           🟠 Adjektiv: Orange
           🔵 Sted / Præposition: Blå
           🟣 Tid: Lilla
        */
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
    heroHeader.className = 'byrum-hero-header';
    heroHeader.innerHTML = `
        <h1>${getTranslation('byrum_hero_title')}</h1>
        <p>${getTranslation('byrum_hero_desc')}</p>
    `;
    viewContainer.appendChild(heroHeader);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'byrum-tabs';
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
        btn.className = `byrum-tab-btn ${t.id === currentTab ? 'active' : ''}`;
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
        tabsMenu.querySelectorAll('.byrum-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.byrum-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- 24 NØGLEORD I BYRUMMET (Højfrekvens fra top 100)
    // ========================================================
    const byrumWords = [
        { word: 'en sol', clean: 'sol', gender: 'en', bestemt: 'solen', flertal: 'sole', x: 65, y: 8, icon: '☀️', sentence: 'Solen skinner.' },
        { word: 'en tid', clean: 'tid', gender: 'en', bestemt: 'tiden', flertal: 'tider', x: 56, y: 17, icon: '⏰', sentence: 'Uret viser tiden.' },
        { word: 'en by', clean: 'by', gender: 'en', bestemt: 'byen', flertal: 'byer', x: 35, y: 25, icon: '🏙️', sentence: 'Hun bor i en stor by.' },
        { word: 'et hus', clean: 'hus', gender: 'et', bestemt: 'huset', flertal: 'huse', x: 10, y: 15, icon: '🏠', sentence: 'Hun bor i et gult hus.' },
        { word: 'et vindue', clean: 'vindue', gender: 'et', bestemt: 'vinduet', flertal: 'vinduer', x: 4, y: 12, icon: '🪟', sentence: 'Vinduet er åbent.' },
        { word: 'en café', clean: 'virksomhed', gender: 'en', bestemt: 'caféen', flertal: 'caféer', x: 21, y: 32, icon: '☕', sentence: 'De sidder på en café.' },
        { word: 'penge', clean: 'penge', gender: 'en', bestemt: 'pengene', flertal: 'penge', x: 8.5, y: 63, icon: '🪙', sentence: 'Kunden bruger penge.' },
        { word: 'en krone', clean: 'krone', gender: 'en', bestemt: 'kronen', flertal: 'kroner', x: 5.5, y: 55, icon: '🏷️', sentence: 'Brødet koster tyve kroner.' },
        { word: 'et arbejde', clean: 'arbejde', gender: 'et', bestemt: 'arbejdet', flertal: 'arbejder', x: 14, y: 56, icon: '💼', sentence: 'Hun har et godt arbejde.' },
        { word: 'en læge', clean: 'læge', gender: 'en', bestemt: 'lægen', flertal: 'læger', x: 21, y: 74, icon: '🩺', sentence: 'Lægen går på gaden.' },
        { word: 'en hund', clean: 'hund', gender: 'en', bestemt: 'hunden', flertal: 'hunde', x: 29.5, y: 88, icon: '🐕', sentence: 'Manden går med en hund.' },
        { word: 'et træ', clean: 'træ', gender: 'et', bestemt: 'træet', flertal: 'træer', x: 39, y: 24, icon: '🌳', sentence: 'Der står et stort træ.' },
        { word: 'en kvinde', clean: 'kvinde', gender: 'en', bestemt: 'kvinden', flertal: 'kvinder', x: 42, y: 68, icon: '👩', sentence: 'En kvinde cykler på gaden.' },
        { word: 'en tur', clean: 'tur', gender: 'en', bestemt: 'turen', flertal: 'ture', x: 43.5, y: 82, icon: '🚲', sentence: 'Hun går en tur.' },
        { word: 'en vej', clean: 'vej', gender: 'en', bestemt: 'vejen', flertal: 'veje', x: 47, y: 74, icon: '🛣️', sentence: 'Der er biler og cykler på vejen.' },
        { word: 'en familie', clean: 'familie', gender: 'en', bestemt: 'familien', flertal: 'familier', x: 50, y: 58, icon: '👨‍👩‍👧', sentence: 'En familie går en tur.' },
        { word: 'et barn', clean: 'barn', gender: 'et', bestemt: 'barnet', flertal: 'børn', x: 55.5, y: 63, icon: '👶', sentence: 'Barnet smiler.' },
        { word: 'en plads', clean: 'plads', gender: 'en', bestemt: 'pladsen', flertal: 'pladser', x: 63, y: 56, icon: '🏛️', sentence: 'Der er mange på pladsen.' },
        { word: 'en dreng', clean: 'dreng', gender: 'en', bestemt: 'drengen', flertal: 'drenge', x: 62.5, y: 58, icon: '👦', sentence: 'En dreng leger i solen.' },
        { word: 'en pige', clean: 'pige', gender: 'en', bestemt: 'pigen', flertal: 'piger', x: 82, y: 53, icon: '👧', sentence: 'En pige går i skole.' },
        { word: 'en skole', clean: 'skole', gender: 'en', bestemt: 'skolen', flertal: 'skoler', x: 88, y: 28, icon: '🏫', sentence: 'Børnene går i skole.' },
        { word: 'en dør', clean: 'dør', gender: 'en', bestemt: 'døren', flertal: 'døre', x: 88, y: 44, icon: '🚪', sentence: 'Døren er åben.' },
        { word: 'en ven', clean: 'ven', gender: 'en', bestemt: 'vennen', flertal: 'venner', x: 93, y: 60, icon: '🫂', sentence: 'Hun taler med en ven.' },
        { word: 'en bil', clean: 'bil', gender: 'en', bestemt: 'bilen', flertal: 'biler', x: 71, y: 76, icon: '🚗', sentence: 'En bil holder på vejen.' },
        { word: 'en mand', clean: 'mand', gender: 'en', bestemt: 'manden', flertal: 'mænd', x: 78.5, y: 71, icon: '👨', sentence: 'En mand står på gaden.' },
        { word: 'et problem', clean: 'problem', gender: 'et', bestemt: 'problemet', flertal: 'problemer', x: 75, y: 68, icon: '⚠️', sentence: 'Manden har et problem.' }
    ];

    // ========================================================
    // --- 1. DEL: VRIMLEBILLEDE MED FARVE-RADAR
    // ========================================================
    const vrimmelPanel = document.createElement('div');
    vrimmelPanel.className = 'byrum-panel active';
    vrimmelPanel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'vrimmel-card';

    // Control bar
    const controlBar = document.createElement('div');
    controlBar.className = 'radar-control-bar';

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-image-toggle-btn';
    pureBtn.innerHTML = `<span>🖼️</span> ${getTranslation('vrimmel_pure_btn')} <strong id="pure-mode-status-byrum">${getTranslation('vrimmel_status_off')}</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-byrum').textContent = pureModeActive ? `${getTranslation('vrimmel_status_on')} 🖼️` : getTranslation('vrimmel_status_off');
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage with Image
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/byrum_vrimmel.jpg';
    img.alt = 'Byrummet vrimlebillede';
    img.className = 'vrimmel-img';
    stage.appendChild(img);

    // Detail display box
    const detailBox = document.createElement('div');
    detailBox.className = 'hotspot-detail-card';
    detailBox.innerHTML = `
        <div>
            <div class="detail-word-badge badge-en">${getTranslation('byrum_default_badge')}</div>
            <div class="detail-main-word">${getTranslation('byrum_default_title')}</div>
            <div class="detail-forms">${getTranslation('byrum_default_desc')}</div>
        </div>
    `;

    // Render hotspots
    const renderedHotspots = [];
    byrumWords.forEach(bw => {
        const spot = document.createElement('div');
        spot.className = `vrimmel-hotspot hotspot-${bw.gender}`;
        spot.style.left = `${bw.x}%`;
        spot.style.top = `${bw.y}%`;
        spot.textContent = '?';
        spot.title = bw.word;

        spot.onclick = () => {
            const lang = getLang();
            const wordTrans = byrumWordTranslations[bw.word]?.[lang] || (lang !== 'da' ? byrumWordTranslations[bw.word]?.['en'] : null);
            const transMeaning = wordTrans?.meaning;
            const transSentence = wordTrans?.sentence;

            detailBox.innerHTML = `
                <div style="flex: 1; min-width: 250px;">
                    <div>
                        <span class="badge-substantiv">${getTranslation('vrimmel_badge_substantiv')}</span>
                        <span class="detail-word-badge badge-${bw.gender}">${bw.gender === 'en' ? getTranslation('vrimmel_badge_en') : getTranslation('vrimmel_badge_et')}</span>
                    </div>
                    <div class="detail-main-word">
                        ${bw.icon} ${bw.word}
                        ${transMeaning ? `<span style="font-size: 1.1rem; color: #94a3b8; font-weight: 500; margin-left: 0.5rem;">(${transMeaning})</span>` : ''}
                    </div>
                    <div class="detail-forms">${getTranslation('vrimmel_form_bestemt')} <strong>${bw.bestemt}</strong> | ${getTranslation('vrimmel_form_flertal')} <strong>${bw.flertal}</strong></div>
                    <div class="detail-sentence">"${bw.sentence}"</div>
                    ${transSentence ? `<div style="font-size: 0.95rem; color: #94a3b8; font-style: italic; margin-top: 0.2rem;">"${transSentence}"</div>` : ''}
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-start;">
                    <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                        <button class="listen-word-btn" id="listen-byrum-word">
                            <span>🔊</span> ${getTranslation('vrimmel_listen_btn')}
                        </button>
                        <button class="mic-speak-btn" id="mic-byrum-word">
                            <span>🎤</span> ${getTranslation('vrimmel_mic_btn')}
                        </button>
                    </div>
                    <div class="speech-feedback-box" id="speech-feedback-byrum"></div>
                </div>
            `;

            detailBox.querySelector('#listen-byrum-word').onclick = () => {
                if (bw.audioFile) {
                    const audio = new Audio(bw.audioFile);
                    audio.play().catch(() => speakDanish(bw.word));
                } else {
                    speakDanish(bw.word);
                }
            };

            const micBtn = detailBox.querySelector('#mic-byrum-word');
            const feedbackBox = detailBox.querySelector('#speech-feedback-byrum');
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
                            feedbackBox.textContent = `${getTranslation('vrimmel_mic_prompt')} "${bw.clean}"...`;
                        };

                        rec.onresult = (evt) => {
                            const spoken = evt.results[0][0].transcript.toLowerCase().trim();
                            const cleanSpoken = spoken.replace(/[.,!?]/g, '').trim();
                            const cleanTarget = bw.clean.toLowerCase().trim();
                            const fullTarget = bw.word.toLowerCase().trim();
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

            if (bw.audioFile) {
                const audio = new Audio(bw.audioFile);
                audio.play().catch(() => speakDanish(bw.word));
            } else {
                speakDanish(bw.word);
            }
        };

        stage.appendChild(spot);
        renderedHotspots.push({ el: spot, bw });
    });

    vrimmelCard.appendChild(stage);
    vrimmelCard.appendChild(detailBox);
    vrimmelPanel.appendChild(vrimmelCard);

    // ========================================================
    // --- EN / ET KASSE-SORTERING (ALLE BYRUM-ORD) ---
    // ========================================================
    const sortingBox = document.createElement('div');
    sortingBox.className = 'sorting-game-box';

    const sortHeader = document.createElement('div');
    sortHeader.className = 'sorting-header-row';
    sortHeader.innerHTML = `
        <div>
            <h3 style="font-size: 1.3rem; margin: 0;">📦 ${getTranslation('sort_byrum_title')}</h3>
            <p style="color: #94a3b8; margin: 0.2rem 0 0; font-size: 0.95rem;">${getTranslation('sort_instruction')}</p>
        </div>
        <div class="sort-progress-badge" id="byrum-sort-progress">${getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', byrumWords.length)}</div>
    `;
    sortingBox.appendChild(sortHeader);

    const binsContainer = document.createElement('div');
    binsContainer.className = 'bins-container';

    const binEn = document.createElement('div');
    binEn.className = 'sort-bin bin-en';
    binEn.innerHTML = `<div class="bin-title bin-title-en">${getTranslation('sort_bin_en_title')}</div><div class="bin-items-list" id="bin-byrum-en"></div>`;

    const binEt = document.createElement('div');
    binEt.className = 'sort-bin bin-et';
    binEt.innerHTML = `<div class="bin-title bin-title-et">${getTranslation('sort_bin_et_title')}</div><div class="bin-items-list" id="bin-byrum-et"></div>`;

    binsContainer.appendChild(binEn);
    binsContainer.appendChild(binEt);
    sortingBox.appendChild(binsContainer);

    const wordsBank = document.createElement('div');
    wordsBank.className = 'words-bank-row';

    let selectedSortWord = null;
    let byrumPlacedCount = 0;

    function renderByrumBank() {
        wordsBank.innerHTML = '';
        byrumWords.forEach(item => {
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

    renderByrumBank();

    binEn.onclick = () => handleByrumBinDrop('en', binEn.querySelector('#bin-byrum-en'));
    binEt.onclick = () => handleByrumBinDrop('et', binEt.querySelector('#bin-byrum-et'));

    function handleByrumBinDrop(targetGender, binListEl) {
        if (!selectedSortWord) {
            return;
        }

        if (selectedSortWord.gender === targetGender) {
            const placedChip = document.createElement('div');
            placedChip.className = 'chip-in-bin';
            placedChip.textContent = `${targetGender} ${selectedSortWord.clean}`;
            binListEl.appendChild(placedChip);

            byrumPlacedCount++;
            sortHeader.querySelector('#byrum-sort-progress').textContent = getTranslation('sort_progress_text').replace('{n}', byrumPlacedCount).replace('{total}', byrumWords.length);

            wordsBank.querySelectorAll('.sort-word-chip').forEach(c => {
                if (c.textContent === selectedSortWord.clean) {
                    c.classList.add('placed');
                    c.classList.remove('selected');
                }
            });

            if (byrumPlacedCount === byrumWords.length) {
                sortHeader.querySelector('#byrum-sort-progress').innerHTML = getTranslation('sort_all_complete');
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
        byrumPlacedCount = 0;
        selectedSortWord = null;
        binEn.querySelector('#bin-byrum-en').innerHTML = '';
        binEt.querySelector('#bin-byrum-et').innerHTML = '';
        sortHeader.querySelector('#byrum-sort-progress').textContent = getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', byrumWords.length);
        renderByrumBank();
    };
    resetBar.appendChild(resetBtn);

    sortingBox.appendChild(wordsBank);
    sortingBox.appendChild(resetBar);
    vrimmelPanel.appendChild(sortingBox);
    panelsHolder.appendChild(vrimmelPanel);

    // ========================================================
    // --- 2. DEL: DETEKTIV-MISSIONEN I BYRUMMET
    // ========================================================
    const detektivPanel = document.createElement('div');
    detektivPanel.className = 'byrum-panel';
    detektivPanel.dataset.panel = 'tab_detektiv';

    const byrumMissions = [
        {
            title: getTranslation('byrum_m1_title'),
            targetCount: 3,
            options: [
                { text: "en bil", correct: true },
                { text: "et hus", correct: false },
                { text: "en tur", correct: true },
                { text: "en læge", correct: false },
                { text: "en vej", correct: true },
                { text: "en sol", correct: false }
            ]
        },
        {
            title: getTranslation('byrum_m2_title'),
            targetCount: 3,
            options: [
                { text: "en læge", correct: true },
                { text: "et træ", correct: false },
                { text: "en mand", correct: true },
                { text: "en bil", correct: false },
                { text: "en ven", correct: true },
                { text: "et vindue", correct: false }
            ]
        },
        {
            title: getTranslation('byrum_m3_title'),
            targetCount: 3,
            options: [
                { text: "en by", correct: true },
                { text: "en hund", correct: false },
                { text: "en skole", correct: true },
                { text: "en plads", correct: true },
                { text: "en krone", correct: false },
                { text: "et barn", correct: false }
            ]
        },
        {
            title: getTranslation('byrum_m4_title'),
            targetCount: 3,
            options: [
                { text: "en tid", correct: true },
                { text: "en dør", correct: false },
                { text: "penge", correct: true },
                { text: "en krone", correct: true },
                { text: "en pige", correct: false },
                { text: "en hund", correct: false }
            ]
        },
        {
            title: getTranslation("byrum_m5_title"),
            targetCount: 3,
            options: [
                { text: "en familie", correct: true },
                { text: "en vej", correct: false },
                { text: "et barn", correct: true },
                { text: "en bil", correct: false },
                { text: "en dreng", correct: true },
                { text: "en café", correct: false }
            ]
        },
        {
            title: getTranslation("byrum_m6_title"),
            targetCount: 3,
            options: [
                { text: "et hus", correct: true },
                { text: "en dør", correct: true },
                { text: "en sol", correct: false },
                { text: "et vindue", correct: true },
                { text: "en læge", correct: false },
                { text: "en tur", correct: false }
            ]
        },
        {
            title: getTranslation("byrum_m7_title"),
            targetCount: 3,
            options: [
                { text: "en sol", correct: true },
                { text: "penge", correct: false },
                { text: "et træ", correct: true },
                { text: "en skole", correct: false },
                { text: "en tur", correct: true },
                { text: "et problem", correct: false }
            ]
        },
        {
            title: getTranslation("byrum_m8_title"),
            targetCount: 3,
            options: [
                { text: "et arbejde", correct: true },
                { text: "en pige", correct: false },
                { text: "en læge", correct: true },
                { text: "en plads", correct: false },
                { text: "et problem", correct: true },
                { text: "en krone", correct: false }
            ]
        }
    ];

    let currMissionIdx = 0;
    const missionCard = document.createElement('div');
    missionCard.className = 'mission-card';

    function renderByrumMission() {
        missionCard.innerHTML = '';
        const m = byrumMissions[currMissionIdx];
        let selectedCount = 0;

        const header = document.createElement('div');
        header.className = 'mission-header';
        header.innerHTML = `
            <div class="mission-badge">🕵️ ${getTranslation('tab_label_detektiv')} ${currMissionIdx + 1} / ${byrumMissions.length}</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 0.4rem;">${m.title}</div>
            <div style="font-size: 0.95rem; color: #94a3b8;">${getTranslation('byrum_detektiv_count_prompt')}</div>
        `;
        missionCard.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'clues-grid';

        const feedbackEl = document.createElement('div');
        feedbackEl.style.textAlign = 'center';
        feedbackEl.style.minHeight = '50px';
        feedbackEl.style.marginTop = '1rem';

        const lang = getLang();

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
                                ✓ Rigtigt svaret! ${getTranslation('byrum_detektiv_complete')}
                            </div>
                            <button class="mission-next-btn" id="next-byrum-mission">
                                ${currMissionIdx < byrumMissions.length - 1 ? getTranslation('byrum_detektiv_next') : getTranslation('byrum_detektiv_restart')}
                            </button>
                        `;
                        feedbackEl.querySelector('#next-byrum-mission').onclick = () => {
                            currMissionIdx = (currMissionIdx + 1) % byrumMissions.length;
                            renderByrumMission();
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

    renderByrumMission();
    detektivPanel.appendChild(missionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. DEL: EN LILLE HISTORIE (4 ENKLE HISTORIER) ---
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'byrum-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const byrumStories = [
        {
            title: "1. Bilen stopper",
            fullStoryText: "En bil kører på vejen. Der er en fejl på bilen. Manden har et problem. Han ringer efter hjælp.",
            steps: [
                {
                    q: "1. Hvad kører på vejen?",
                    options: [
                        { text: "En bil 🚗", correct: true },
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
                        { text: "Et problem ⚠️", correct: true },
                        { text: "En gave 🎁", correct: false },
                        { text: "En sol ☀️", correct: false }
                    ]
                },
                {
                    q: "4. Hvad gør manden?",
                    options: [
                        { text: "Han spiser en is 🍦", correct: false },
                        { text: "Han ringer efter hjælp 💡", correct: true }
                    ]
                }
            ]
        },
        {
            title: "2. En kaffe med en ven",
            fullStoryText: "De mødes på pladsen. De går på café. Kunden bruger penge. De drikker kaffe.",
            steps: [
                {
                    q: "1. Hvor mødes de?",
                    options: [
                        { text: "På pladsen 🏛️", correct: true },
                        { text: "I sengen 🛏️", correct: false },
                        { text: "I skoven 🌲", correct: false }
                    ]
                },
                {
                    q: "2. Hvor går de hen?",
                    options: [
                        { text: "Hjem i seng 😴", correct: false },
                        { text: "På en café ☕", correct: true },
                        { text: "I skole 🏫", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør kunden?",
                    options: [
                        { text: "Kunden sover 💤", correct: false },
                        { text: "Kunden bruger penge 🪙", correct: true },
                        { text: "Kunden løber 🏃", correct: false }
                    ]
                },
                {
                    q: "4. Hvad gør de bagefter?",
                    options: [
                        { text: "De drikker kaffe ☕", correct: true },
                        { text: "De køber en bil 🚗", correct: false },
                        { text: "De vasker op 🧼", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. På vej i skole",
            fullStoryText: "Pigen åbner døren. Hun cykler på vejen. Hun møder sine venner.",
            steps: [
                {
                    q: "1. Hvad åbner pigen?",
                    options: [
                        { text: "Fjernsynet 📺", correct: false },
                        { text: "Døren 🚪", correct: true },
                        { text: "En sko 👟", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør hun?",
                    options: [
                        { text: "Hun sover 🛌", correct: false },
                        { text: "Hun cykler på vejen 🚲", correct: true },
                        { text: "Hun svømmer 🏊", correct: false }
                    ]
                },
                {
                    q: "3. Hvem møder hun?",
                    options: [
                        { text: "Sine venner 🎒", correct: true },
                        { text: "En kat 🐈", correct: false },
                        { text: "En læge 🩺", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. En tur med hunden",
            fullStoryText: "Manden går en tur med en hund. De ser et stort træ. Familien smiler til hunden.",
            steps: [
                {
                    q: "1. Hvem går en tur?",
                    options: [
                        { text: "Manden og en hund 🐕", correct: true },
                        { text: "En læge og en bil 🚗", correct: false },
                        { text: "En kat og en fisk 🐟", correct: false }
                    ]
                },
                {
                    q: "2. Hvad ser de?",
                    options: [
                        { text: "En seng 🛏️", correct: false },
                        { text: "Et stort træ 🌳", correct: true },
                        { text: "Et komfur 🍳", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør familien?",
                    options: [
                        { text: "De sover 😴", correct: false },
                        { text: "De smiler til hunden 😊", correct: true },
                        { text: "De løber væk 🏃", correct: false }
                    ]
                }
            ]
        }
    ];

    let currByrumStoryIdx = 0;
    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';

    function renderActiveByrumStory() {
        storyContainer.innerHTML = '';
        const story = byrumStories[currByrumStoryIdx];

        const navBar = document.createElement('div');
        navBar.className = 'story-nav-pills';
        byrumStories.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = `story-nav-btn ${idx === currByrumStoryIdx ? 'active' : ''}`;
            btn.textContent = `Historie ${idx + 1}`;
            btn.onclick = () => {
                currByrumStoryIdx = idx;
                renderActiveByrumStory();
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
            stepCard.id = `byrum-step-${sIdx}`;
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

                        const nextStepCard = stepsHolder.querySelector(`#byrum-step-${sIdx + 1}`);
                        if (nextStepCard) {
                            nextStepCard.style.opacity = '1';
                            nextStepCard.style.pointerEvents = 'auto';
                            nextStepCard.classList.add('active-step');
                        } else {
                            const completeBox = storyContainer.querySelector('#byrum-story-complete-box');
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
        completeBox.id = 'byrum-story-complete-box';
        completeBox.className = 'story-explanation-box';
        completeBox.style.display = 'none';

        const isLastStory = currByrumStoryIdx === byrumStories.length - 1;
        completeBox.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">
                🎉 Flot klaret! Du har gennemført historien.
            </div>
            <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">
                <button class="story-opt-btn" id="btn-next-byrum-story" style="background: #22c55e; color: #0f172a; font-weight: 800;">
                    ${isLastStory ? 'Start forfra ↺' : 'Gå til næste historie ➔'}
                </button>
            </div>
        `;
        storyContainer.appendChild(completeBox);

        completeBox.querySelector('#btn-next-byrum-story').onclick = () => {
            currByrumStoryIdx = (currByrumStoryIdx + 1) % byrumStories.length;
            renderActiveByrumStory();
        };
    }

    renderActiveByrumStory();
    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 4. DEL: OVEREMNE OG UNDEREMNE (Model C)
    // ========================================================
    const kontekstPanel = document.createElement('div');
    kontekstPanel.className = 'byrum-panel';
    kontekstPanel.dataset.panel = 'tab_kontekst';

    const byrumCategoryTasks = [
        {
            type: "find_overemne",
            subwords: ["en bil 🚗", "en cykel 🚲", "en bus 🚌"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Transport 🚗", correct: true },
                { text: "Møbler 🪑", correct: false },
                { text: "Mad 🍞", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["et hus 🏠", "en skole 🏫", "en butik 🏪"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Bygninger og steder 🏢", correct: true },
                { text: "Kroppen 🦶", correct: false },
                { text: "Tøj 👟", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Penge og handel 🪙",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "penge 🪙", correct: true },
                { text: "en krone 👑", correct: true },
                { text: "en pris 🏷️", correct: true },
                { text: "et træ 🌳", correct: false },
                { text: "en seng 🛏️", correct: false },
                { text: "en hund 🐕", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Mennesker og roller 🧑‍🤝‍🧑",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "en mand 👨", correct: true },
                { text: "en pige 👧", correct: true },
                { text: "en ven 🤝", correct: true },
                { text: "en vej 🛣️", correct: false },
                { text: "en dør 🚪", correct: false },
                { text: "et vindue 🪟", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["en mor 👩", "en far 👨", "et barn 🧒"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Familie 👨‍👩‍👧", correct: true },
                { text: "Vejret 🌤️", correct: false },
                { text: "Møbler 🪑", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["en sol ☀️", "et træ 🌳", "en vind 💨"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Natur og vejr ☀️", correct: true },
                { text: "Skole 🏫", correct: false },
                { text: "Transport 🚗", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Byens steder og rum 🏙️",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "en by 🏙️", correct: true },
                { text: "en plads ⛲", correct: true },
                { text: "en café ☕", correct: true },
                { text: "en seng 🛏️", correct: false },
                { text: "et vindue 🪟", correct: false },
                { text: "en fisk 🐟", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Husets dele 🏠",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "en dør 🚪", correct: true },
                { text: "et vindue 🪟", correct: true },
                { text: "et tag 🏠", correct: true },
                { text: "en bil 🚗", correct: false },
                { text: "en læge 🧑‍⚕️", correct: false },
                { text: "en hund 🐕", correct: false }
            ]
        }
    ];

    let currByrumCategoryIdx = 0;
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';

    function renderByrumCategoryTask() {
        categoryCard.innerHTML = '';

        if (currByrumCategoryIdx >= byrumCategoryTasks.length) {
            categoryCard.innerHTML = `
                <div style="font-size: 2.8rem; margin-bottom: 0.6rem;">🎉</div>
                <h2 style="font-size: 1.8rem; color: #4ade80; margin-bottom: 0.6rem;">${getTranslation('top100_category_complete_title')}</h2>
                <p style="color: #cbd5e1; font-size: 1.05rem; margin-bottom: 1.6rem;">
                    ${getTranslation('top100_category_complete_desc')}
                </p>
                <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
                    <button class="mission-next-btn" id="restart-byrum-category-btn" style="background: #475569; color: white;">
                        ${getTranslation('top100_start_over_btn')}
                    </button>
                    <button class="mission-next-btn" id="byrum-category-next-tab-btn" style="background: #22c55e; color: #0f172a;">
                        ${getTranslation('top100_goto_saetning_btn')}
                    </button>
                </div>
            `;
            categoryCard.querySelector('#restart-byrum-category-btn').onclick = () => {
                currByrumCategoryIdx = 0;
                renderByrumCategoryTask();
            };
            categoryCard.querySelector('#byrum-category-next-tab-btn').onclick = () => {
                switchTab('tab_saetning');
            };
            return;
        }

        const task = byrumCategoryTasks[currByrumCategoryIdx];
        let selectedCount = 0;

        const badge = document.createElement('div');
        badge.className = 'category-badge';
        badge.textContent = `🏷️ ${getTranslation('top100_task_counter').replace('{current}', currByrumCategoryIdx + 1).replace('{total}', byrumCategoryTasks.length)}`;
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
                btn.textContent = getTranslation(opt.text);

                btn.onclick = () => {
                    if (opt.correct) {
                        btn.classList.add('selected-correct');
                        grid.querySelectorAll('.category-opt-btn').forEach(b => b.style.pointerEvents = 'none');
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.8rem;">
                                ✓ ${getTranslation("top100_correct_overemne_prefix")} ${getTranslation(opt.text)}
                            </div>
                            <button class="mission-next-btn" id="next-category-btn">${getTranslation('top100_next_task_btn')}</button>
                        `;
                        feedbackEl.querySelector('#next-category-btn').onclick = () => {
                            currByrumCategoryIdx++;
                            renderByrumCategoryTask();
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
            mainCategoryTitle.style.color = '#38bdf8';
            mainCategoryTitle.style.margin = '0.3rem 0 0.8rem';
            mainCategoryTitle.textContent = getTranslation(task.overemne);
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
                btn.textContent = getTranslation(opt.text);

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
                                    ${currByrumCategoryIdx < byrumCategoryTasks.length - 1 ? getTranslation('top100_next_task_btn') : getTranslation('top100_see_result_btn')}
                                </button>
                            `;
                            feedbackEl.querySelector('#next-category-btn').onclick = () => {
                                currByrumCategoryIdx++;
                                renderByrumCategoryTask();
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

    renderByrumCategoryTask();
    kontekstPanel.appendChild(categoryCard);
    panelsHolder.appendChild(kontekstPanel);

    // ========================================================
    // --- 5. DEL: FIND VERBET & BYG SÆTNINGEN
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'byrum-panel';
    saetningPanel.dataset.panel = 'tab_saetning';

    const byrumSentenceTasks = [
        {
            subjekt: "Kvinden",
            verbum: "cykler",
            objekt: "en tur",
            adverbial: "på vejen",
            correctText: "Kvinden cykler en tur på vejen.",
            wrongVerbs: ["koger", "læser"]
        },
        {
            subjekt: "Lægen",
            verbum: "går med",
            objekt: "hunden",
            adverbial: "i byen",
            correctText: "Lægen går med hunden i byen.",
            wrongVerbs: ["kører", "drikker"]
        },
        {
            subjekt: "Manden",
            verbum: "kører i",
            objekt: "en bil",
            adverbial: "til sit arbejde",
            correctText: "Manden kører i en bil til sit arbejde.",
            wrongVerbs: ["sover", "spiser"]
        },
        {
            subjekt: "Børnene",
            verbum: "møder",
            objekt: "en ven",
            adverbial: "ved skolen",
            correctText: "Børnene møder en ven ved skolen.",
            wrongVerbs: ["steger", "vasker"]
        },
        {
            subjekt: "Kunden",
            verbum: "betaler med",
            objekt: "penge",
            adverbial: "ved caféen",
            correctText: "Kunden betaler med penge ved caféen.",
            wrongVerbs: ["løber", "hopper"]
        },
        {
            subjekt: "Familien",
            verbum: "bor i",
            objekt: "et hus",
            adverbial: "i den store by",
            correctText: "Familien bor i et hus i den store by.",
            wrongVerbs: ["koger", "flyver"]
        },
        {
            subjekt: "Drengen",
            verbum: "åbner",
            objekt: "en dør",
            adverbial: "til skolen",
            correctText: "Drengen åbner en dør til skolen.",
            wrongVerbs: ["drikker", "sover"]
        },
        {
            subjekt: "Solen",
            verbum: "skinner på",
            objekt: "træet",
            adverbial: "på pladsen",
            correctText: "Solen skinner på træet på pladsen.",
            wrongVerbs: ["spiser", "køber"]
        },
        {
            subjekt: "Pigen",
            verbum: "løser",
            objekt: "et problem",
            adverbial: "i fællesskab",
            correctText: "Pigen løser et problem i fællesskab.",
            wrongVerbs: ["cykler", "steger"]
        },
        {
            subjekt: "Vennen",
            verbum: "venter på",
            objekt: "en ven",
            adverbial: "foran caféen",
            correctText: "Vennen venter på en ven foran caféen.",
            wrongVerbs: ["bager", "læser"]
        }
    ];

    let currByrumSentenceIdx = 0;
    const sentenceCard = document.createElement('div');
    sentenceCard.className = 'sentence-builder-card';

    function renderByrumSentenceBuilder() {
        sentenceCard.innerHTML = '';
        const task = byrumSentenceTasks[currByrumSentenceIdx];

        sentenceCard.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div class="mission-badge">${getTranslation('builder_badge').replace('{current}', currByrumSentenceIdx + 1).replace('{total}', byrumSentenceTasks.length)}</div>
                <h3 style="font-size: 1.6rem; color: white;">${getTranslation('builder_byrum_title')}</h3>
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
                <div class="builder-slot-box slot-verbum" id="slot-v-byrum">
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
                <div class="tray-chips-list" id="verb-chips-byrum"></div>
            </div>

            <div class="live-sentence-preview" id="preview-box-byrum">
                <span id="preview-text-byrum">${getTranslation('builder_preview_default')}</span>
            </div>

            <div style="text-align: center;" id="action-area-byrum"></div>
        `;

        const verbChipsList = sentenceCard.querySelector('#verb-chips-byrum');
        const allVerbs = [task.verbum, ...task.wrongVerbs].sort(() => Math.random() - 0.5);

        allVerbs.forEach(v => {
            const btn = document.createElement('button');
            btn.className = 'tray-chip-btn';
            btn.textContent = v;

            btn.onclick = () => {
                const slotV = sentenceCard.querySelector('#slot-v-byrum');
                const previewText = sentenceCard.querySelector('#preview-text-byrum');
                const actionArea = sentenceCard.querySelector('#action-area-byrum');

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
                        <button class="mission-next-btn" style="margin-top: 0;" id="next-byrum-sent-task">
                            ${currByrumSentenceIdx < byrumSentenceTasks.length - 1 ? getTranslation('builder_next_btn') : getTranslation('builder_restart_btn')}
                        </button>
                    `;
                    actionArea.querySelector('#next-byrum-sent-task').onclick = () => {
                        currByrumSentenceIdx = (currByrumSentenceIdx + 1) % byrumSentenceTasks.length;
                        renderByrumSentenceBuilder();
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

    renderByrumSentenceBuilder();
    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    container.appendChild(viewContainer);
}
