import { getTranslation } from '../utils/i18n.js';

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
        .story-step-card {
            background: #1e293b; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 5px solid #38bdf8;
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
            text-align: center; background: #0f172a; border: 2px solid #38bdf8; padding: 1.2rem;
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
        <h1>🏙️ Byrummet (Byen, gaden & hverdagen)</h1>
        <p>Her finder du <strong>60–70 % af de mest brugte danske substantiver</strong>! Mød menneskene på gaden, transportmidler, skolen, butikken, tid og penge i et levende vrimlebillede.</p>
    `;
    viewContainer.appendChild(heroHeader);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'byrum-tabs';
    const tabs = [
        { id: 'tab_vrimmel', label: '1. Udforsk billedet', icon: '🔍' },
        { id: 'tab_detektiv', label: '2. Detektiv-missionen', icon: '🕵️' },
        { id: 'tab_historie', label: '3. Mikro-historie', icon: '💭' },
        { id: 'tab_kontekst', label: '4. Kontekst-skiftet', icon: '🔄' },
        { id: 'tab_saetning', label: '5. Find verbet & Byg', icon: '✍️' }
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
        { word: 'en sol', clean: 'sol', gender: 'en', bestemt: 'solen', flertal: 'sole', x: 65, y: 8, icon: '☀️', sentence: 'Solen skinner varmt over byens tage.' },
        { word: 'en tid', clean: 'tid', gender: 'en', bestemt: 'tiden', flertal: 'tider', x: 56, y: 17, icon: '⏰', sentence: 'Uret på tårnet viser den præcise tid og time.' },
        { word: 'en by', clean: 'by', gender: 'en', bestemt: 'byen', flertal: 'byer', x: 35, y: 25, icon: '🏙️', sentence: 'Der er mange mennesker i byen i dag.' },
        { word: 'et hus', clean: 'hus', gender: 'et', bestemt: 'huset', flertal: 'huse', x: 10, y: 15, icon: '🏠', sentence: 'Et gult hus med flotte vinduer.' },
        { word: 'et vindue', clean: 'vindue', gender: 'et', bestemt: 'vinduet', flertal: 'vinduer', x: 4, y: 12, icon: '🪟', sentence: 'Vinduet står åbent mod gaden.' },
        { word: 'en café', clean: 'virksomhed', gender: 'en', bestemt: 'caféen', flertal: 'caféer', x: 21, y: 32, icon: '☕', sentence: 'Folk sidder på caféen og slapper af.' },
        { word: 'penge', clean: 'penge', gender: 'en', bestemt: 'pengene', flertal: 'penge', x: 8.5, y: 63, icon: '🪙', sentence: 'Kunden betaler med mønter og penge.' },
        { word: 'en krone', clean: 'krone', gender: 'en', bestemt: 'kronen', flertal: 'kroner', x: 5.5, y: 55, icon: '🏷️', sentence: 'Prisen på brødet er tyve kroner.' },
        { word: 'et arbejde', clean: 'arbejde', gender: 'et', bestemt: 'arbejdet', flertal: 'arbejder', x: 14, y: 56, icon: '💼', sentence: 'Hun har et godt arbejde i bageriet.' },
        { word: 'en læge', clean: 'læge', gender: 'en', bestemt: 'lægen', flertal: 'læger', x: 21, y: 74, icon: '🩺', sentence: 'Lægen i hvid kittel går en tur på gaden.' },
        { word: 'en hund', clean: 'hund', gender: 'en', bestemt: 'hunden', flertal: 'hunde', x: 29.5, y: 88, icon: '🐕', sentence: 'Hunden går pænt i snor ved siden af lægen.' },
        { word: 'et træ', clean: 'træ', gender: 'et', bestemt: 'træet', flertal: 'træer', x: 39, y: 24, icon: '🌳', sentence: 'Høje grønne træer giver skygge på gaden.' },
        { word: 'en kvinde', clean: 'kvinde', gender: 'en', bestemt: 'kvinden', flertal: 'kvinder', x: 42, y: 68, icon: '👩', sentence: 'En kvinde cykler glad på cykelstien.' },
        { word: 'en tur', clean: 'tur', gender: 'en', bestemt: 'turen', flertal: 'ture', x: 43.5, y: 82, icon: '🚲', sentence: 'Hun tager en frisk cykeltur gennem byen.' },
        { word: 'en vej', clean: 'vej', gender: 'en', bestemt: 'vejen', flertal: 'veje', x: 47, y: 74, icon: '🛣️', sentence: 'Der er biler og cykler på vejen.' },
        { word: 'en familie', clean: 'familie', gender: 'en', bestemt: 'familien', flertal: 'familier', x: 50, y: 58, icon: '👨‍👩‍👧', sentence: 'En glad familie går sammen på torvet.' },
        { word: 'et barn', clean: 'barn', gender: 'et', bestemt: 'barnet', flertal: 'børn', x: 55.5, y: 63, icon: '👶', sentence: 'Et lille barn holder sin mor i hånden.' },
        { word: 'en plads', clean: 'plads', gender: 'en', bestemt: 'pladsen', flertal: 'pladser', x: 63, y: 56, icon: '🏛️', sentence: 'Der er masser af liv på den store plads.' },
        { word: 'en dreng', clean: 'dreng', gender: 'en', bestemt: 'drengen', flertal: 'drenge', x: 62.5, y: 58, icon: '👦', sentence: 'To drenge leger og løber i solen.' },
        { word: 'en pige', clean: 'pige', gender: 'en', bestemt: 'pigen', flertal: 'piger', x: 82, y: 53, icon: '👧', sentence: 'En pige går med sin skoletaske.' },
        { word: 'en skole', clean: 'skole', gender: 'en', bestemt: 'skolen', flertal: 'skoler', x: 88, y: 28, icon: '🏫', sentence: 'Børnene går i skole for at lære.' },
        { word: 'en dør', clean: 'dør', gender: 'en', bestemt: 'døren', flertal: 'døre', x: 88, y: 44, icon: '🚪', sentence: 'Skolens dør er åben for eleverne.' },
        { word: 'en ven', clean: 'ven', gender: 'en', bestemt: 'vennen', flertal: 'venner', x: 93, y: 60, icon: '🫂', sentence: 'To gode venner krammer foran skolen.' },
        { word: 'en bil', clean: 'bil', gender: 'en', bestemt: 'bilen', flertal: 'biler', x: 71, y: 76, icon: '🚗', sentence: 'En blå bil holder ved vejkanten.' },
        { word: 'en mand', clean: 'mand', gender: 'en', bestemt: 'manden', flertal: 'mænd', x: 78.5, y: 71, icon: '👨', sentence: 'En mand står ved siden af sin bil.' },
        { word: 'et problem', clean: 'problem', gender: 'et', bestemt: 'problemet', flertal: 'problemer', x: 75, y: 68, icon: '⚠️', sentence: 'Bilen er stoppet – manden har et problem og en fejl.' }
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

    const radarToggleWrapper = document.createElement('div');
    radarToggleWrapper.className = 'radar-toggle-wrapper';

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-image-toggle-btn';
    pureBtn.innerHTML = `<span>🖼️</span> Se rent billede: <strong id="pure-mode-status-byrum">FRA</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-byrum').textContent = pureModeActive ? 'TIL 🖼️' : 'FRA';
    };

    const radarBtn = document.createElement('button');
    radarBtn.className = 'radar-toggle-btn';
    radarBtn.innerHTML = `<span>📡</span> Farve-radar (EN / ET): <strong id="radar-status-byrum">FRA</strong>`;

    const radarLegend = document.createElement('div');
    radarLegend.className = 'radar-legend';
    radarLegend.innerHTML = `
        <div class="legend-item"><div class="legend-dot-en"></div> <strong>EN</strong> (blå)</div>
        <div class="legend-item"><div class="legend-dot-et"></div> <strong>ET</strong> (orange)</div>
    `;

    radarToggleWrapper.appendChild(pureBtn);
    radarToggleWrapper.appendChild(radarBtn);
    controlBar.appendChild(radarToggleWrapper);
    controlBar.appendChild(radarLegend);
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
            <div class="detail-word-badge badge-en">Klik på en cirkel i byrummet</div>
            <div class="detail-main-word">Gå på opdagelse i byen!</div>
            <div class="detail-forms">Lær om ordet hedder <strong>en</strong> eller <strong>et</strong>, lyt til udtalen og træn med mikrofonen.</div>
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
            detailBox.innerHTML = `
                <div style="flex: 1; min-width: 250px;">
                    <div>
                        <span class="badge-substantiv">Substantiv</span>
                        <span class="detail-word-badge badge-${bw.gender}">🏷️ ${bw.gender.toUpperCase()}-ord (${bw.gender === 'en' ? 'Fælleskøn' : 'Intetkøn'})</span>
                    </div>
                    <div class="detail-main-word">${bw.icon} ${bw.word}</div>
                    <div class="detail-forms">Bestemt: <strong>${bw.bestemt}</strong> | Flertal: <strong>${bw.flertal}</strong></div>
                    <div class="detail-sentence">"${bw.sentence}"</div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-start;">
                    <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                        <button class="listen-word-btn" id="listen-byrum-word">
                            <span>🔊</span> Hør udtale
                        </button>
                        <button class="mic-speak-btn" id="mic-byrum-word">
                            <span>🎤</span> Prøv at udtale
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
                    feedbackBox.textContent = 'Tale-genkendelse understøttes i Chrome, Safari og Edge.';
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
                            micBtn.innerHTML = `<span>🔴</span> Lytter...`;
                            feedbackBox.className = 'speech-feedback-box listening';
                            feedbackBox.textContent = `Sig ordet: "${bw.clean}"...`;
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
                                feedbackBox.innerHTML = `🎉 Flot! Du sagde: <strong>"${spoken}"</strong> ✓`;
                                speakDanish("Rigtigt");
                            } else {
                                feedbackBox.className = 'speech-feedback-box incorrect';
                                feedbackBox.innerHTML = `🤔 Du sagde: <em>"${spoken}"</em>. Prøv igen!`;
                            }
                        };

                        rec.onerror = (err) => {
                            isListening = false;
                            micBtn.classList.remove('listening');
                            micBtn.innerHTML = `<span>🎤</span> Prøv at udtale`;
                            if (err.error !== 'no-speech') {
                                feedbackBox.className = 'speech-feedback-box incorrect';
                                feedbackBox.textContent = `Mikrofon: ${err.error}`;
                            }
                        };

                        rec.onend = () => {
                            isListening = false;
                            micBtn.classList.remove('listening');
                            micBtn.innerHTML = `<span>🎤</span> Prøv at udtale`;
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

    let radarActive = false;
    radarBtn.onclick = () => {
        radarActive = !radarActive;
        stage.classList.toggle('radar-active', radarActive);
        radarBtn.classList.toggle('active', radarActive);
        radarBtn.querySelector('#radar-status-byrum').textContent = radarActive ? 'TIL ⚡' : 'FRA';

        renderedHotspots.forEach(({ el, bw }) => {
            el.textContent = radarActive ? bw.gender.toUpperCase() : '?';
        });
    };

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
            <h3 style="font-size: 1.3rem; margin: 0;">📦 Sorter alle 24 ord i EN- og ET-kassen</h3>
            <p style="color: #94a3b8; margin: 0.2rem 0 0; font-size: 0.95rem;">Vælg et ord nedenfor og klik på kassen. Træn kønnet på de vigtigste hverdagsord!</p>
        </div>
        <div class="sort-progress-badge" id="byrum-sort-progress">0 / ${byrumWords.length} sorteret</div>
    `;
    sortingBox.appendChild(sortHeader);

    const binsContainer = document.createElement('div');
    binsContainer.className = 'bins-container';

    const binEn = document.createElement('div');
    binEn.className = 'sort-bin bin-en';
    binEn.innerHTML = `<div class="bin-title bin-title-en">🔵 EN-kassen (Klik her)</div><div class="bin-items-list" id="bin-byrum-en"></div>`;

    const binEt = document.createElement('div');
    binEt.className = 'sort-bin bin-et';
    binEt.innerHTML = `<div class="bin-title bin-title-et">🟠 ET-kassen (Klik her)</div><div class="bin-items-list" id="bin-byrum-et"></div>`;

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
            sortHeader.querySelector('#byrum-sort-progress').textContent = `${byrumPlacedCount} / ${byrumWords.length} sorteret`;

            wordsBank.querySelectorAll('.sort-word-chip').forEach(c => {
                if (c.textContent === selectedSortWord.clean) {
                    c.classList.add('placed');
                    c.classList.remove('selected');
                }
            });

            if (byrumPlacedCount === byrumWords.length) {
                sortHeader.querySelector('#byrum-sort-progress').innerHTML = `🎉 Alle 24 ord sorteret!`;
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
    resetBtn.innerHTML = `🔄 Nulstil sortering`;
    resetBtn.onclick = () => {
        byrumPlacedCount = 0;
        selectedSortWord = null;
        binEn.querySelector('#bin-byrum-en').innerHTML = '';
        binEt.querySelector('#bin-byrum-et').innerHTML = '';
        sortHeader.querySelector('#byrum-sort-progress').textContent = `0 / ${byrumWords.length} sorteret`;
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
            title: "Find 3 transportmidler eller ting på vejen 🚗",
            targetCount: 3,
            options: [
                { text: "en bil", correct: true },
                { text: "et hus", correct: false },
                { text: "en tur (på cykel)", correct: true },
                { text: "en læge", correct: false },
                { text: "en vej", correct: true },
                { text: "en sol", correct: false }
            ],
            feedback: "🎉 Perfekt! Bil, cykeltur og vej er byens transportnet."
        },
        {
            title: "Find 3 steder eller bygninger i byen 🏫",
            targetCount: 3,
            options: [
                { text: "en by", correct: true },
                { text: "en hund", correct: false },
                { text: "en skole", correct: true },
                { text: "en plads", correct: true },
                { text: "en krone", correct: false },
                { text: "et barn", correct: false }
            ],
            feedback: "🎉 Helt rigtigt! Byen, skolen og torvepladsen danner byens rum."
        },
        {
            title: "Find 3 personer på gaden 👥",
            targetCount: 3,
            options: [
                { text: "en læge", correct: true },
                { text: "et træ", correct: false },
                { text: "en mand", correct: true },
                { text: "en bil", correct: false },
                { text: "en ven", correct: true },
                { text: "et vindue", correct: false }
            ],
            feedback: "🎉 Flot fundet! Lægen, manden og vennerne færdes i byen."
        },
        {
            title: "Find 3 ting, der handler om tid eller penge ⏰🪙",
            targetCount: 3,
            options: [
                { text: "en tid / en time", correct: true },
                { text: "en dør", correct: false },
                { text: "penge (mønter)", correct: true },
                { text: "en krone", correct: true },
                { text: "en pige", correct: false },
                { text: "en hund", correct: false }
            ],
            feedback: "🎉 Super godt! Tid, time, kroner og penge styrer hverdagen."
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
            <div class="mission-badge">🕵️ Detektiv-mission ${currMissionIdx + 1} af ${byrumMissions.length}</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 0.4rem;">${m.title}</div>
            <div style="font-size: 0.95rem; color: #94a3b8;">Klik på de 3 rigtige ord herunder:</div>
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
            btn.textContent = opt.text;

            btn.onclick = () => {
                if (btn.classList.contains('selected-correct') || btn.classList.contains('selected-wrong')) return;

                if (opt.correct) {
                    btn.classList.add('selected-correct');
                    selectedCount++;
                    speakDanish(opt.text);

                    if (selectedCount === m.targetCount) {
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.3rem; font-weight: 800; margin-bottom: 0.8rem;">
                                Rigtigt! ✓
                            </div>
                            <button class="mission-next-btn" id="next-byrum-mission">
                                ${currMissionIdx < byrumMissions.length - 1 ? 'Næste mission ➔' : 'Start forfra 🔄'}
                            </button>
                        `;
                        speakDanish("Rigtigt");
                        feedbackEl.querySelector('#next-byrum-mission').onclick = () => {
                            currMissionIdx = (currMissionIdx + 1) % byrumMissions.length;
                            renderByrumMission();
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

    renderByrumMission();
    detektivPanel.appendChild(missionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. DEL: MIKRO-HISTORIE (Bilen holder stille)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'byrum-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';
    storyContainer.innerHTML = `
        <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; text-align: center;">💭 Mikro-historie: Bilen holder i vejsiden</h2>
        <p style="color: #94a3b8; text-align: center; margin-bottom: 1.8rem;">
            Se på manden ved den blå bil til højre i byrummet. Sådan kobles konkrete situationer til abstrakte ord:
        </p>

        <!-- Trin 1 -->
        <div class="story-step-card active-step" id="byrum-story-1">
            <h4>Trin 1: Hvilken konkret maskine kørte manden i?</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="true">En bil 🚗</button>
                <button class="story-opt-btn" data-correct="false">En seng 🛏️</button>
                <button class="story-opt-btn" data-correct="false">Et træ 🌳</button>
            </div>
        </div>

        <!-- Trin 2 -->
        <div class="story-step-card" id="byrum-story-2" style="opacity: 0.4; pointer-events: none;">
            <h4>Trin 2: Hvad skete der i motoren, da bilen stoppede?</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="false">En ferie 🏖️</button>
                <button class="story-opt-btn" data-correct="true">En fejl (et uheld) ⚙️</button>
                <button class="story-opt-btn" data-correct="false">En kage 🍰</button>
            </div>
        </div>

        <!-- Trin 3 -->
        <div class="story-step-card" id="byrum-story-3" style="opacity: 0.4; pointer-events: none;">
            <h4>Trin 3: Hvad har manden nu, da han ikke kan køre videre?</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="true">Et problem ⚠️</button>
                <button class="story-opt-btn" data-correct="false">En gave 🎁</button>
                <button class="story-opt-btn" data-correct="false">En sol ☀️</button>
            </div>
        </div>

        <!-- Trin 4 -->
        <div class="story-step-card" id="byrum-story-4" style="opacity: 0.4; pointer-events: none;">
            <h4>Trin 4: Hvad tænker manden for at løse situationen?</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="false">Han spiser en is</button>
                <button class="story-opt-btn" data-correct="true">Han får en tanke om at ringe efter en mekaniker 💡</button>
            </div>
        </div>

        <div id="byrum-story-summary" style="display: none;" class="story-explanation-box">
            💡 <strong>Didaktisk pointe:</strong> Abstrakte begreber som <em>en fejl</em>, <em>et problem</em> og <em>en tanke</em> er nemme at huske, når de knytter sig til en reel hændelse i hverdagen!
        </div>
    `;

    function setupByrumStoryCard(stepNum, nextStepNum) {
        const card = storyContainer.querySelector(`#byrum-story-${stepNum}`);
        card.querySelectorAll('.story-opt-btn').forEach(btn => {
            btn.onclick = () => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                    speakDanish(btn.textContent);
                    if (nextStepNum) {
                        const nextCard = storyContainer.querySelector(`#byrum-story-${nextStepNum}`);
                        nextCard.style.opacity = '1';
                        nextCard.style.pointerEvents = 'auto';
                        nextCard.classList.add('active-step');
                    } else {
                        storyContainer.querySelector('#byrum-story-summary').style.display = 'block';
                        speakDanish("Flot klaret! Manden løser sit problem.");
                    }
                } else {
                    speakDanish("Nej, prøv at overveje situationen!");
                }
            };
        });
    }

    setupByrumStoryCard(1, 2);
    setupByrumStoryCard(2, 3);
    setupByrumStoryCard(3, 4);
    setupByrumStoryCard(4, null);

    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 4. DEL: KONTEKST-SKIFTET (Samme ord – ny scene)
    // ========================================================
    const kontekstPanel = document.createElement('div');
    kontekstPanel.className = 'byrum-panel';
    kontekstPanel.dataset.panel = 'tab_kontekst';

    const contextCard = document.createElement('div');
    contextCard.className = 'context-card';
    contextCard.innerHTML = `
        <div class="context-word-banner">
            <h2>Målord: "en skole" og "penge"</h2>
            <p style="color: #94a3b8;">Samme ord bruges på forskellige måder i samfundet:</p>
        </div>

        <div class="context-scenes-grid">
            <div class="scene-role-card">
                <h4 style="color: #38bdf8;">🏫 1. Ordet "en skole"</h4>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.8rem;">Hvad er en skoles vigtigste funktion i hverdagen?</p>
                <button class="role-choice-btn" data-correct="true">A) Børn og voksne lærer sprog, fag og færdigheder</button>
                <button class="role-choice-btn" data-correct="false">B) Man reparerer biler indeni klassen</button>
            </div>

            <div class="scene-role-card">
                <h4 style="color: #f59e0b;">🪙 2. Ordet "penge"</h4>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.8rem;">Hvordan bruger man penge i byrummet?</p>
                <button class="role-choice-btn" data-correct="true">A) Man betaler med mønter eller kort, når man køber varer</button>
                <button class="role-choice-btn" data-correct="false">B) Man spiser mønterne som mad</button>
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
                <div class="mission-badge">✍️ Sætningsbygger ${currByrumSentenceIdx + 1} af ${byrumSentenceTasks.length}</div>
                <h3 style="font-size: 1.6rem; color: white;">Vælg det rigtige verbum og dan en byrums-sætning:</h3>
            </div>

            <!-- Grammatisk farveforklaring -->
            <div class="grammar-legend-bar">
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>Substantiv</strong> (grøn)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-verbum"></span> <strong>Verbum</strong> (rød)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-adjektiv"></span> <strong>Adjektiv</strong> (orange)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-sted"></span> <strong>Sted</strong> (blå)</div>
            </div>

            <div class="builder-slots-row">
                <div class="builder-slot-box slot-subjekt">
                    <span class="slot-role-tag">Substantiv</span>
                    <span>${task.subjekt}</span>
                </div>
                <div class="builder-slot-box slot-verbum" id="slot-v-byrum">
                    <span class="slot-role-tag">Verbum</span>
                    <span>❓ Vælg verbum</span>
                </div>
                <div class="builder-slot-box slot-objekt">
                    <span class="slot-role-tag">Substantiv</span>
                    <span>${task.objekt}</span>
                </div>
                <div class="builder-slot-box slot-adverbial">
                    <span class="slot-role-tag">Sted</span>
                    <span>${task.adverbial}</span>
                </div>
            </div>

            <div class="words-selection-tray">
                <div class="tray-group-title">Hvilket verbum passer til handlingen? (🔴 Verbum)</div>
                <div class="tray-chips-list" id="verb-chips-byrum"></div>
            </div>

            <div class="live-sentence-preview" id="preview-box-byrum">
                <span id="preview-text-byrum">Vælg et verbum for at høre sætningen...</span>
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
                    slotV.innerHTML = `<span class="slot-role-tag">Verbum</span><span>${v} ✓</span>`;
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
                        <button class="listen-word-btn" style="display: inline-flex; margin-right: 0.8rem;" id="listen-byrum-sent">
                            🔊 Hør udtale
                        </button>
                        <button class="mission-next-btn" style="margin-top: 0;" id="next-byrum-sent-task">
                            ${currByrumSentenceIdx < byrumSentenceTasks.length - 1 ? 'Næste sætning ➔' : 'Start forfra 🔄'}
                        </button>
                    `;
                    actionArea.querySelector('#listen-byrum-sent').onclick = () => speakDanish(task.correctText);
                    actionArea.querySelector('#next-byrum-sent-task').onclick = () => {
                        currByrumSentenceIdx = (currByrumSentenceIdx + 1) % byrumSentenceTasks.length;
                        renderByrumSentenceBuilder();
                    };
                } else {
                    slotV.innerHTML = `<span class="slot-role-tag">Verbum</span><span>${v} ✕</span>`;
                    slotV.style.borderColor = '#ef4444';
                    slotV.style.color = '#f87171';
                    previewText.textContent = `Nej, "${task.subjekt} ${v} ${task.objekt}" passer ikke. Prøv et andet verbum!`;
                    speakDanish(`Nej, prøv et andet verbum`);
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
