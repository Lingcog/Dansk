import { getTranslation, getLang } from '../utils/i18n.js';
import { kitchenWordTranslations } from '../utils/top100_translations.js';

/**
 * KoekkenHjemmetView - Test-prototype for semantisk ordforråd: Køkkenet & Hjemmet
 * Implementerer 4-trins modellen + kønstræning (farve-radar) + detektiv + mikro-historie + sætningsbygger.
 */
export function renderKoekkenHjemmetView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container koekken-vrimmel-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('word_learning');
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
        .koekken-vrimmel-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .kv-hero-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .kv-hero-header h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #38bdf8, #818cf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .kv-hero-header p {
            color: #94a3b8;
            font-size: 1.1rem;
            max-width: 750px;
            margin: 0 auto;
        }

        /* Tabs Navigation */
        .kv-tabs {
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
        .kv-tab-btn {
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
        .kv-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.06);
        }
        .kv-tab-btn.active {
            background: #3b82f6;
            color: white;
            box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
        }

        /* Panel Container */
        .kv-panel {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .kv-panel.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* =========================================
           TAB 1: VRIMLEBILLEDE & FARVE-RADAR
           ========================================= */
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
        .legend-dot-en {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #38bdf8;
            box-shadow: 0 0 8px #38bdf8;
        }
        .legend-dot-et {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #f97316;
            box-shadow: 0 0 8px #f97316;
        }

        /* Image with Hotspots */
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
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 0.8rem;
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

        /* When Radar is Active */
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
            50% { transform: translate(-50%, -50%) scale(1.22); box-shadow: 0 0 22px #38bdf8, 0 0 35px rgba(56, 189, 248, 0.6); }
        }
        @keyframes pulseOrange {
            0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 10px #f97316; }
            50% { transform: translate(-50%, -50%) scale(1.22); box-shadow: 0 0 22px #f97316, 0 0 35px rgba(249, 115, 22, 0.6); }
        }

        /* Hotspot popup card */
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
        .detail-main-word {
            font-size: 1.6rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.3rem;
        }
        .detail-forms {
            font-size: 0.95rem;
            color: #94a3b8;
            margin-bottom: 0.5rem;
        }
        .detail-sentence {
            font-size: 1.05rem;
            color: #e2e8f0;
            font-style: italic;
        }
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
        .listen-word-btn:hover {
            background: #1d4ed8;
            transform: scale(1.05);
        }
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

        /* En/Et Sorting Game */
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
        .sorting-header-row h3 {
            font-size: 1.3rem;
            margin: 0;
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
            min-height: 180px;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        .bin-en {
            background: rgba(2, 132, 199, 0.12);
            border: 2px dashed #0284c7;
        }
        .bin-en:hover {
            background: rgba(2, 132, 199, 0.22);
        }
        .bin-et {
            background: rgba(234, 88, 12, 0.12);
            border: 2px dashed #ea580c;
        }
        .bin-et:hover {
            background: rgba(234, 88, 12, 0.22);
        }
        .bin-title {
            font-size: 1.15rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            text-align: center;
        }
        .bin-title-en { color: #38bdf8; }
        .bin-title-et { color: #fb923c; }
        .bin-items-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
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
            gap: 0.6rem;
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
            padding: 0.55rem 1.1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sort-word-chip:hover {
            background: #475569;
            transform: translateY(-2px);
        }
        .sort-word-chip.selected {
            border-color: #38bdf8;
            box-shadow: 0 0 14px rgba(56, 189, 248, 0.6);
            background: #1e293b;
        }
        .sort-word-chip.placed {
            opacity: 0.35;
            pointer-events: none;
            background: #0f172a;
            text-decoration: line-through;
        }
        .sort-actions-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1.2rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .reset-sort-btn {
            background: #475569;
            color: white;
            border: none;
            padding: 0.6rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .reset-sort-btn:hover {
            background: #64748b;
        }

        /* =========================================
           TAB 2: DETEKTIV-MISSIONEN
           ========================================= */
        .mission-card {
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
        }
        .mission-header {
            text-align: center;
            margin-bottom: 1.8rem;
        }
        .mission-badge {
            display: inline-block;
            background: #f59e0b;
            color: #000;
            font-weight: 800;
            font-size: 0.85rem;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            text-transform: uppercase;
            margin-bottom: 0.6rem;
        }
        .mission-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.4rem;
        }
        .mission-counter {
            font-size: 0.95rem;
            color: #94a3b8;
        }
        .clues-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .clue-btn {
            background: #1e293b;
            border: 2px solid #334155;
            color: white;
            padding: 1.2rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;
        }
        .clue-btn:hover {
            border-color: #38bdf8;
            transform: translateY(-3px);
        }
        .clue-btn.selected-correct {
            background: rgba(34, 197, 94, 0.25);
            border-color: #22c55e;
            color: #4ade80;
        }
        .clue-btn.selected-wrong {
            background: rgba(239, 68, 68, 0.25);
            border-color: #ef4444;
            color: #f87171;
        }
        .mission-feedback {
            text-align: center;
            min-height: 50px;
            margin-top: 1rem;
        }
        .mission-next-btn {
            background: #22c55e;
            color: #0f172a;
            font-weight: 800;
            border: none;
            padding: 0.8rem 1.6rem;
            border-radius: 12px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-top: 1rem;
        }
        .mission-next-btn:hover {
            background: #16a34a;
            transform: scale(1.05);
        }

        /* =========================================
           TAB 3: MIKRO-HISTORIE
           ========================================= */
        .story-container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
        }
        .story-step-card {
            background: #1e293b;
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            border-left: 5px solid #38bdf8;
            transition: all 0.3s ease;
        }
        .story-step-card.active-step {
            border-left-color: #f59e0b;
            box-shadow: 0 4px 20px rgba(245, 158, 11, 0.2);
        }
        .story-step-card h4 {
            font-size: 1.15rem;
            margin-bottom: 0.6rem;
            color: #f1f5f9;
        }
        .story-options-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-top: 0.8rem;
        }
        .story-opt-btn {
            background: #334155;
            color: white;
            border: none;
            padding: 0.6rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .story-opt-btn:hover {
            background: #475569;
        }
        .story-opt-btn.correct {
            background: #22c55e !important;
            color: #0f172a;
        }
        .story-explanation-box {
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid #f59e0b;
            border-radius: 12px;
            padding: 1rem 1.2rem;
            margin-top: 1rem;
            font-size: 0.95rem;
            color: #fde68a;
        }

        /* =========================================
           TAB 4: KONTEKST-SKIFTET
           ========================================= */
        .context-card {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
        }
        .context-word-banner {
            text-align: center;
            background: #0f172a;
            border: 2px solid #38bdf8;
            padding: 1.2rem;
            border-radius: 16px;
            margin-bottom: 1.5rem;
        }
        .context-word-banner h2 {
            font-size: 1.8rem;
            color: #38bdf8;
            margin-bottom: 0.3rem;
        }
        .context-scenes-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.2rem;
        }
        .scene-role-card {
            background: #1e293b;
            border-radius: 14px;
            padding: 1.2rem;
            border: 1px solid rgba(255,255,255,0.08);
        }
        .scene-role-card h4 {
            color: #f59e0b;
            font-size: 1.1rem;
            margin-bottom: 0.6rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .role-choice-btn {
            display: block;
            width: 100%;
            background: #334155;
            color: white;
            border: none;
            padding: 0.8rem 1rem;
            border-radius: 10px;
            text-align: left;
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .role-choice-btn:hover {
            background: #475569;
        }
        .role-choice-btn.correct {
            background: #22c55e !important;
            color: #0f172a;
        }

        /* =========================================
           TAB 5: VERBUM & SÆTNINGSBYGGER
           ========================================= */
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

        .words-selection-tray {
            margin-bottom: 1.5rem;
        }
        .tray-group-title {
            font-size: 0.95rem;
            color: #94a3b8;
            margin-bottom: 0.5rem;
            font-weight: 700;
            text-transform: uppercase;
        }
        .tray-chips-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.2rem;
        }
        .tray-chip-btn {
            background: #1e293b;
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: white;
            padding: 0.6rem 1rem;
            border-radius: 10px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .tray-chip-btn:hover {
            border-color: #ef4444;
            background: rgba(239, 68, 68, 0.15);
            transform: translateY(-2px);
        }
        .live-sentence-preview {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 14px;
            padding: 1.2rem;
            text-align: center;
            font-size: 1.3rem;
            font-weight: 700;
            color: #f8fafc;
            margin-bottom: 1.5rem;
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
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const heroHeader = document.createElement('div');
    heroHeader.className = 'kv-hero-header';
    heroHeader.innerHTML = `
        <h1>${getTranslation('koekken_hero_title')}</h1>
        <p>${getTranslation('koekken_hero_desc')}</p>
    `;
    viewContainer.appendChild(heroHeader);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'kv-tabs';
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
        btn.className = `kv-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.innerHTML = `<span>${t.icon}</span> ${t.label}`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    // Panels Holder
    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        tabsMenu.querySelectorAll('.kv-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.kv-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- NØGLEORD DATA (Præcis 20 ord fra top 100 frekvensliste)
    // ========================================================
    const kitchenWords = [
        { word: 'en sol', clean: 'sol', gender: 'en', bestemt: 'solen', flertal: 'sole', x: 8.8, y: 18, icon: '☀️', sentence: 'Solen skinner varmt ind ad vinduet.' },
        { word: 'et vindue', clean: 'vindue', gender: 'et', bestemt: 'vinduet', flertal: 'vinduer', x: 15, y: 11, icon: '🪟', sentence: 'Solen skinner ind ad det store vindue.' },
        { word: 'et træ', clean: 'træ', gender: 'et', bestemt: 'træet', flertal: 'træer', x: 19.5, y: 23, icon: '🌳', sentence: 'Der står et smukt grønt træ i haven.' },
        { word: 'en hund', clean: 'hund', gender: 'en', bestemt: 'hunden', flertal: 'hunde', x: 11.5, y: 70, icon: '🐕', sentence: 'Hunden sidder pænt ved siden af madskålen.' },
        { word: 'en kat', clean: 'kat', gender: 'en', bestemt: 'katten', flertal: 'katte', x: 18.5, y: 67, icon: '🐈', sentence: 'Katten kigger nysgerrigt på hunden.' },
        { word: 'et barn', clean: 'barn', gender: 'et', bestemt: 'barnet', flertal: 'børn', x: 28.5, y: 55, icon: '👶', sentence: 'Barnet sidder glad i højstolen.' },
        { word: 'en mor', clean: 'mor', gender: 'en', bestemt: 'moren', flertal: 'mødre', x: 34, y: 44, icon: '👩', sentence: 'Moren hælder vand op i et glas.' },
        { word: 'en far', clean: 'far', gender: 'en', bestemt: 'faren', flertal: 'fædre', x: 49, y: 46, icon: '👨', sentence: 'Faren taler ved spisebordet.' },
        { word: 'en seng', clean: 'seng', gender: 'en', bestemt: 'sengen', flertal: 'senge', x: 60, y: 38, icon: '🛏️', sentence: 'Sengen står inde i soveværelset.' },
        { word: 'et tøj', clean: 'tøj', gender: 'et', bestemt: 'tøjet', flertal: 'tøj', x: 71, y: 32, icon: '🧥', sentence: 'Tøjet og jakken hænger på knagen.' },
        { word: 'en sko', clean: 'sko', gender: 'en', bestemt: 'skoen', flertal: 'sko', x: 71, y: 53, icon: '👟', sentence: 'Skoene står ordentligt på skohylden.' },
        { word: 'en stol', clean: 'stol', gender: 'en', bestemt: 'stolen', flertal: 'stole', x: 29, y: 83, icon: '🪑', sentence: 'Drengen sidder på en stol.' },
        { word: 'en mad', clean: 'mad', gender: 'en', bestemt: 'maden', flertal: 'madder', x: 38, y: 64, icon: '🍞', sentence: 'De spiser mad og rugbrød sammen.' },
        { word: 'en kop', clean: 'kop', gender: 'en', bestemt: 'koppen', flertal: 'kopper', x: 42, y: 58, icon: '☕', sentence: 'Der står en kop kaffe på bordet.' },
        { word: 'et kød', clean: 'kød', gender: 'et', bestemt: 'kødet', flertal: 'kød', x: 44.5, y: 68, icon: '🥩', sentence: 'Der er kød og pålæg på bordet.' },
        { word: 'en fisk', clean: 'fisk', gender: 'en', bestemt: 'fisken', flertal: 'fisk', x: 47.5, y: 70, icon: '🐟', sentence: 'De spiser frisk fisk til frokost.' },
        { word: 'et glas', clean: 'glas', gender: 'et', bestemt: 'glasset', flertal: 'glas', x: 54.5, y: 64, icon: '🥛', sentence: 'Moren hælder et glas koldt vand op.' },
        { word: 'et bord', clean: 'bord', gender: 'et', bestemt: 'bordet', flertal: 'borde', x: 57, y: 68, icon: '🪑', sentence: 'Familien sidder samlet ved bordet.' },
        { word: 'en kaffe', clean: 'kaffe', gender: 'en', bestemt: 'kaffen', flertal: 'kaffe', x: 90.5, y: 49, icon: '☕', sentence: 'Kaffemaskinen brygger varm kaffe.' },
        { word: 'et problem', clean: 'problem', gender: 'et', bestemt: 'problemet', flertal: 'problemer', x: 93, y: 79, icon: '⚠️', sentence: 'Kaffen væltede – det er et problem og et uheld!' }
    ];

    // ========================================================
    // --- 1. DEL: VRIMLEBILLEDE MED FARVE-RADAR (EN / ET)
    // ========================================================
    const vrimmelPanel = document.createElement('div');
    vrimmelPanel.className = 'kv-panel active';
    vrimmelPanel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'vrimmel-card';

    // Control bar
    const controlBar = document.createElement('div');
    controlBar.className = 'radar-control-bar';

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-image-toggle-btn';
    pureBtn.innerHTML = `<span>🖼️</span> ${getTranslation('vrimmel_pure_btn')} <strong id="pure-mode-status">${getTranslation('vrimmel_status_off')}</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status').textContent = pureModeActive ? `${getTranslation('vrimmel_status_on')} 🖼️` : getTranslation('vrimmel_status_off');
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage with Image + Hotspots
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/koekken_vrimmel.jpg';
    img.alt = 'Køkkenet og hjemmet vrimlebillede';
    img.className = 'vrimmel-img';
    stage.appendChild(img);

    // Detail Display Box below image
    const detailBox = document.createElement('div');
    detailBox.className = 'hotspot-detail-card';
    detailBox.innerHTML = `
        <div>
            <div class="detail-word-badge badge-en">${getTranslation('koekken_default_badge')}</div>
            <div class="detail-main-word">${getTranslation('koekken_default_title')}</div>
            <div class="detail-forms">${getTranslation('koekken_default_desc')}</div>
        </div>
    `;

    // Render Hotspots on Stage
    const renderedHotspots = [];
    kitchenWords.forEach((kw) => {
        const spot = document.createElement('div');
        spot.className = `vrimmel-hotspot hotspot-${kw.gender}`;
        spot.style.left = `${kw.x}%`;
        spot.style.top = `${kw.y}%`;
        spot.textContent = '?';
        spot.title = kw.word;

        spot.onclick = () => {
            const lang = getLang();
            const wordTrans = kitchenWordTranslations[kw.word]?.[lang] || (lang !== 'da' ? kitchenWordTranslations[kw.word]?.['en'] : null);
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
                        <button class="listen-word-btn" id="listen-curr-word">
                            <span>🔊</span> ${getTranslation('vrimmel_listen_btn')}
                        </button>
                        <button class="mic-speak-btn" id="mic-curr-word">
                            <span>🎤</span> ${getTranslation('vrimmel_mic_btn')}
                        </button>
                    </div>
                    <div class="speech-feedback-box" id="speech-feedback"></div>
                </div>
            `;

            detailBox.querySelector('#listen-curr-word').onclick = () => {
                if (kw.audioFile) {
                    const audio = new Audio(kw.audioFile);
                    audio.play().catch(() => speakDanish(kw.word));
                } else {
                    speakDanish(kw.word);
                }
            };

            const micBtn = detailBox.querySelector('#mic-curr-word');
            const feedbackBox = detailBox.querySelector('#speech-feedback');
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

            if (kw.audioFile) {
                const audio = new Audio(kw.audioFile);
                audio.play().catch(() => speakDanish(kw.word));
            } else {
                speakDanish(kw.word);
            }
        };

        stage.appendChild(spot);
        renderedHotspots.push({ el: spot, kw });
    });

    vrimmelCard.appendChild(stage);
    vrimmelCard.appendChild(detailBox);
    vrimmelPanel.appendChild(vrimmelCard);

    // ========================================================
    // --- KOMPLET EN / ET KASSE-SORTERING (ALLE 20 ORD) ---
    // ========================================================
    const sortingBox = document.createElement('div');
    sortingBox.className = 'sorting-game-box';

    const sortHeader = document.createElement('div');
    sortHeader.className = 'sorting-header-row';
    sortHeader.innerHTML = `
        <div>
            <h3>📦 ${getTranslation('sort_kitchen_title')}</h3>
            <p style="color: #94a3b8; margin: 0.2rem 0 0; font-size: 0.95rem;">${getTranslation('sort_instruction')}</p>
        </div>
        <div class="sort-progress-badge" id="sort-progress-text">${getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', 20)}</div>
    `;
    sortingBox.appendChild(sortHeader);

    const binsContainer = document.createElement('div');
    binsContainer.className = 'bins-container';

    const binEn = document.createElement('div');
    binEn.className = 'sort-bin bin-en';
    binEn.innerHTML = `<div class="bin-title bin-title-en">${getTranslation('sort_bin_en_title')}</div><div class="bin-items-list" id="bin-en-items"></div>`;

    const binEt = document.createElement('div');
    binEt.className = 'sort-bin bin-et';
    binEt.innerHTML = `<div class="bin-title bin-title-et">${getTranslation('sort_bin_et_title')}</div><div class="bin-items-list" id="bin-et-items"></div>`;

    binsContainer.appendChild(binEn);
    binsContainer.appendChild(binEt);
    sortingBox.appendChild(binsContainer);

    const wordsBank = document.createElement('div');
    wordsBank.className = 'words-bank-row';

    // Alle 20 ord fra listen:
    const allSortingWords = [
        { name: 'mor', gender: 'en' },
        { name: 'far', gender: 'en' },
        { name: 'barn', gender: 'et' },
        { name: 'bord', gender: 'et' },
        { name: 'stol', gender: 'en' },
        { name: 'seng', gender: 'en' },
        { name: 'kop', gender: 'en' },
        { name: 'kaffe', gender: 'en' },
        { name: 'glas', gender: 'et' },
        { name: 'mad', gender: 'en' },
        { name: 'kød', gender: 'et' },
        { name: 'fisk', gender: 'en' },
        { name: 'hund', gender: 'en' },
        { name: 'kat', gender: 'en' },
        { name: 'vindue', gender: 'et' },
        { name: 'sol', gender: 'en' },
        { name: 'træ', gender: 'et' },
        { name: 'tøj', gender: 'et' },
        { name: 'sko', gender: 'en' },
        { name: 'problem', gender: 'et' }
    ];

    let currentSelectedWord = null;
    let placedCount = 0;

    function renderSortingBank() {
        wordsBank.innerHTML = '';
        allSortingWords.forEach(item => {
            const chip = document.createElement('button');
            chip.className = 'sort-word-chip';
            chip.textContent = item.name;

            chip.onclick = () => {
                currentSelectedWord = item;
                wordsBank.querySelectorAll('.sort-word-chip').forEach(c => c.classList.remove('selected'));
                chip.classList.add('selected');
            };
            wordsBank.appendChild(chip);
        });
    }

    renderSortingBank();

    binEn.onclick = () => handleBinDrop('en', binEn.querySelector('#bin-en-items'));
    binEt.onclick = () => handleBinDrop('et', binEt.querySelector('#bin-et-items'));

    function handleBinDrop(targetGender, binListEl) {
        if (!currentSelectedWord) {
            return;
        }

        if (currentSelectedWord.gender === targetGender) {
            const placedChip = document.createElement('div');
            placedChip.className = 'chip-in-bin';
            placedChip.textContent = `${targetGender} ${currentSelectedWord.name}`;
            binListEl.appendChild(placedChip);

            placedCount++;
            sortHeader.querySelector('#sort-progress-text').textContent = getTranslation('sort_progress_text').replace('{n}', placedCount).replace('{total}', allSortingWords.length);

            // Disable button in bank
            wordsBank.querySelectorAll('.sort-word-chip').forEach(c => {
                if (c.textContent === currentSelectedWord.name) {
                    c.classList.add('placed');
                    c.classList.remove('selected');
                }
            });

            if (placedCount === allSortingWords.length) {
                sortHeader.querySelector('#sort-progress-text').innerHTML = getTranslation('sort_all_complete');
            }

            currentSelectedWord = null;
        } else {
            const wrongBin = targetGender === 'en' ? binEn : binEt;
            wrongBin.classList.add('bin-shake');
            setTimeout(() => wrongBin.classList.remove('bin-shake'), 400);
        }
    }

    // Actions bar with reset
    const actionsBar = document.createElement('div');
    actionsBar.className = 'sort-actions-bar';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-sort-btn';
    resetBtn.innerHTML = getTranslation('sort_reset_btn');
    resetBtn.onclick = () => {
        placedCount = 0;
        currentSelectedWord = null;
        binEn.querySelector('#bin-en-items').innerHTML = '';
        binEt.querySelector('#bin-et-items').innerHTML = '';
        sortHeader.querySelector('#sort-progress-text').textContent = getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', allSortingWords.length);
        renderSortingBank();
    };

    actionsBar.appendChild(resetBtn);
    sortingBox.appendChild(wordsBank);
    sortingBox.appendChild(actionsBar);
    vrimmelPanel.appendChild(sortingBox);
    panelsHolder.appendChild(vrimmelPanel);

    // ========================================================
    // --- 2. DEL: DETEKTIV-MISSIONEN (KATEGORISERING)
    // ========================================================
    const detektivPanel = document.createElement('div');
    detektivPanel.className = 'kv-panel';
    detektivPanel.dataset.panel = 'tab_detektiv';

    const missions = [
        {
            title: getTranslation('koekken_m1_title'),
            targetCount: 3,
            options: [
                { text: "en kaffe", correct: true },
                { text: "et bord", correct: false },
                { text: "et glas vand", correct: true },
                { text: "en stol", correct: false },
                { text: "en kop te", correct: true },
                { text: "en sko", correct: false }
            ]
        },
        {
            title: getTranslation('koekken_m2_title'),
            targetCount: 3,
            options: [
                { text: "en mad", correct: true },
                { text: "en seng", correct: false },
                { text: "et kød", correct: true },
                { text: "et vindue", correct: false },
                { text: "en fisk", correct: true },
                { text: "en hund", correct: false }
            ]
        },
        {
            title: getTranslation('koekken_m3_title'),
            targetCount: 3,
            options: [
                { text: "en mor", correct: true },
                { text: "et bord", correct: false },
                { text: "en far", correct: true },
                { text: "et barn", correct: true },
                { text: "en kop", correct: false },
                { text: "et tøj", correct: false }
            ]
        },
        {
            title: getTranslation('koekken_m4_title'),
            targetCount: 3,
            options: [
                { text: "et bord", correct: true },
                { text: "en stol", correct: true },
                { text: "en sol", correct: false },
                { text: "en seng", correct: true },
                { text: "en fisk", correct: false },
                { text: "et glas", correct: false }
            ]
        }
    ];

    let currentMissionIdx = 0;

    const missionCard = document.createElement('div');
    missionCard.className = 'mission-card';

    function renderMission() {
        missionCard.innerHTML = '';
        const m = missions[currentMissionIdx];
        let selectedCount = 0;

        const header = document.createElement('div');
        header.className = 'mission-header';
        header.innerHTML = `
            <div class="mission-badge">🕵️ ${getTranslation('tab_label_detektiv')} ${currentMissionIdx + 1} / ${missions.length}</div>
            <div class="mission-title">${m.title}</div>
            <div class="mission-counter">${getTranslation('koekken_detektiv_count_prompt')}</div>
        `;
        missionCard.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'clues-grid';

        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'mission-feedback';

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
                    speakDanish(opt.text);

                    if (selectedCount === m.targetCount) {
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.3rem; font-weight: 800; margin-bottom: 0.8rem;">
                                ${getTranslation('koekken_detektiv_complete')}
                            </div>
                            <button class="mission-next-btn" id="next-mission-btn">
                                ${currentMissionIdx < missions.length - 1 ? getTranslation('koekken_detektiv_next') : getTranslation('koekken_detektiv_restart')}
                            </button>
                        `;
                        speakDanish("Rigtigt");
                        feedbackEl.querySelector('#next-mission-btn').onclick = () => {
                            currentMissionIdx = (currentMissionIdx + 1) % missions.length;
                            renderMission();
                        };
                    }
                } else {
                    btn.classList.add('selected-wrong');
                    setTimeout(() => {
                        btn.classList.remove('selected-wrong');
                    }, 800);
                }
            };
            grid.appendChild(btn);
        });

        missionCard.appendChild(grid);
        missionCard.appendChild(feedbackEl);
    }

    renderMission();
    detektivPanel.appendChild(missionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. DEL: MIKRO-HISTORIE (FRA KONKRET TIL ABSTRAKT)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'kv-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';
    storyContainer.innerHTML = `
        <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; text-align: center;">${getTranslation('koekken_story_title')}</h2>
        <p style="color: #94a3b8; text-align: center; margin-bottom: 1.8rem;">
            ${getTranslation('koekken_story_desc')}
        </p>

        <!-- Trin 1: Konkret genstand -->
        <div class="story-step-card active-step" id="story-step-1">
            <h4>${getTranslation('koekken_story_s1_q')}</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="true">En kop kaffe ☕</button>
                <button class="story-opt-btn" data-correct="false">En sko 👟</button>
                <button class="story-opt-btn" data-correct="false">Et træ 🌳</button>
            </div>
            <div class="story-feedback-area"></div>
        </div>

        <!-- Trin 2: Hændelsen -->
        <div class="story-step-card" id="story-step-2" style="opacity: 0.4; pointer-events: none;">
            <h4>${getTranslation('koekken_story_s2_q')}</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="false">En ferie 🏖️</button>
                <button class="story-opt-btn" data-correct="true">Et uheld (en fejl) 💥</button>
                <button class="story-opt-btn" data-correct="false">En hund 🐕</button>
            </div>
            <div class="story-feedback-area"></div>
        </div>

        <!-- Trin 3: Abstraktionen -->
        <div class="story-step-card" id="story-step-3" style="opacity: 0.4; pointer-events: none;">
            <h4>${getTranslation('koekken_story_s3_q')}</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="true">Et problem ⚠️</button>
                <button class="story-opt-btn" data-correct="false">En gave 🎁</button>
                <button class="story-opt-btn" data-correct="false">Et barn 👶</button>
            </div>
            <div class="story-feedback-area"></div>
        </div>

        <!-- Trin 4: Løsningen -->
        <div class="story-step-card" id="story-step-4" style="opacity: 0.4; pointer-events: none;">
            <h4>${getTranslation('koekken_story_s4_q')}</h4>
            <div class="story-options-row">
                <button class="story-opt-btn" data-correct="false">Hun sover i sengen</button>
                <button class="story-opt-btn" data-correct="true">Hun tørrer op med en klud 🧽</button>
            </div>
            <div class="story-feedback-area"></div>
        </div>

        <div id="story-final-summary" style="display: none;" class="story-explanation-box">
            ${getTranslation('koekken_story_pedagogy')}
        </div>
    `;

    // Hook up Story Steps logic
    function setupStoryCard(stepNum, nextStepNum) {
        const card = storyContainer.querySelector(`#story-step-${stepNum}`);
        card.querySelectorAll('.story-opt-btn').forEach(btn => {
            btn.onclick = () => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                    speakDanish(btn.textContent);
                    if (nextStepNum) {
                        const nextCard = storyContainer.querySelector(`#story-step-${nextStepNum}`);
                        nextCard.style.opacity = '1';
                        nextCard.style.pointerEvents = 'auto';
                        nextCard.classList.add('active-step');
                    } else {
                        storyContainer.querySelector('#story-final-summary').style.display = 'block';
                        speakDanish("Flot klaret! Problemet er løst.");
                    }
                } else {
                    speakDanish("Nej, tænk på situationen og prøv igen.");
                }
            };
        });
    }

    setupStoryCard(1, 2);
    setupStoryCard(2, 3);
    setupStoryCard(3, 4);
    setupStoryCard(4, null);

    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 4. DEL: KONTEKST-SKIFTET (SAMME ORD I FLERE SCENER)
    // ========================================================
    const kontekstPanel = document.createElement('div');
    kontekstPanel.className = 'kv-panel';
    kontekstPanel.dataset.panel = 'tab_kontekst';

    const contextCard = document.createElement('div');
    contextCard.className = 'context-card';
    contextCard.innerHTML = `
        <div class="context-word-banner">
            <h2>${getTranslation('koekken_context_title')}</h2>
            <p style="color: #94a3b8;">${getTranslation('koekken_context_desc')}</p>
        </div>

        <div class="context-scenes-grid">
            <!-- Scene 1: I køkkenet -->
            <div class="scene-role-card">
                <h4>${getTranslation('koekken_context_s1_title')}</h4>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.8rem;">${getTranslation('koekken_context_s1_q')}</p>
                <button class="role-choice-btn" data-correct="true">${getTranslation('koekken_context_s1_a')}</button>
                <button class="role-choice-btn" data-correct="false">${getTranslation('koekken_context_s1_b')}</button>
            </div>

            <!-- Scene 2: I undervisningslokalet -->
            <div class="scene-role-card">
                <h4>${getTranslation('koekken_context_s2_title')}</h4>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.8rem;">${getTranslation('koekken_context_s2_q')}</p>
                <button class="role-choice-btn" data-correct="true">${getTranslation('koekken_context_s2_a')}</button>
                <button class="role-choice-btn" data-correct="false">${getTranslation('koekken_context_s2_b')}</button>
            </div>

            <!-- Scene 3: I byrummet / på caféen -->
            <div class="scene-role-card">
                <h4>${getTranslation('koekken_context_s3_title')}</h4>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.8rem;">${getTranslation('koekken_context_s3_q')}</p>
                <button class="role-choice-btn" data-correct="true">${getTranslation('koekken_context_s3_a')}</button>
                <button class="role-choice-btn" data-correct="false">${getTranslation('koekken_context_s3_b')}</button>
            </div>
        </div>
    `;

    contextCard.querySelectorAll('.role-choice-btn').forEach(btn => {
        btn.onclick = () => {
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
                speakDanish(btn.textContent);
            } else {
                speakDanish("Nej, det passer ikke til denne scene. Prøv igen!");
            }
        };
    });

    kontekstPanel.appendChild(contextCard);
    panelsHolder.appendChild(kontekstPanel);

    // ========================================================
    // --- 5. DEL: FIND VERBET & BYG SÆTNINGEN
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'kv-panel';
    saetningPanel.dataset.panel = 'tab_saetning';

    const sentenceTasks = [
        {
            subjekt: "Moren",
            verbum: "drikker",
            objekt: "en kop kaffe",
            adverbial: "i køkkenet",
            correctText: "Moren drikker en kop kaffe i køkkenet.",
            wrongVerbs: ["kører", "sover"]
        },
        {
            subjekt: "Faren",
            verbum: "sidder på",
            objekt: "en stol",
            adverbial: "ved bordet",
            correctText: "Faren sidder på en stol ved bordet.",
            wrongVerbs: ["spiser", "vasker"]
        },
        {
            subjekt: "Barnet",
            verbum: "spiser",
            objekt: "en mad",
            adverbial: "med familien",
            correctText: "Barnet spiser en mad med familien.",
            wrongVerbs: ["drikker", "læser"]
        },
        {
            subjekt: "Hunden",
            verbum: "kigger på",
            objekt: "katten",
            adverbial: "på gulvet",
            correctText: "Hunden kigger på katten på gulvet.",
            wrongVerbs: ["koger", "skriver"]
        },
        {
            subjekt: "Kvinden",
            verbum: "har",
            objekt: "et problem",
            adverbial: "med kaffen",
            correctText: "Kvinden har et problem med kaffen.",
            wrongVerbs: ["hopper", "køber"]
        }
    ];

    let currSentenceIdx = 0;

    const sentenceCard = document.createElement('div');
    sentenceCard.className = 'sentence-builder-card';

    function renderSentenceBuilder() {
        sentenceCard.innerHTML = '';
        const task = sentenceTasks[currSentenceIdx];

        sentenceCard.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div class="mission-badge">${getTranslation('builder_badge').replace('{current}', currSentenceIdx + 1).replace('{total}', sentenceTasks.length)}</div>
                <h3 style="font-size: 1.6rem; color: white;">${getTranslation('builder_kitchen_title')}</h3>
            </div>

            <!-- Grammatisk farveforklaring -->
            <div class="grammar-legend-bar">
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>${getTranslation('top100_legend_substantiv')}</strong> (${getTranslation('top100_legend_green')})</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-verbum"></span> <strong>${getTranslation('top100_legend_verbum')}</strong> (${getTranslation('top100_legend_red')})</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-adjektiv"></span> <strong>${getTranslation('top100_legend_adjektiv')}</strong> (${getTranslation('top100_legend_orange')})</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-sted"></span> <strong>${getTranslation('top100_legend_sted')}</strong> (${getTranslation('top100_legend_blue')})</div>
            </div>

            <!-- Slots container -->
            <div class="builder-slots-row" id="sentence-slots">
                <div class="builder-slot-box slot-subjekt">
                    <span class="slot-role-tag">${getTranslation('builder_slot_substantiv')}</span>
                    <span>${task.subjekt}</span>
                </div>
                <div class="builder-slot-box slot-verbum" id="slot-v">
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

            <!-- Verbs selection -->
            <div class="words-selection-tray">
                <div class="tray-group-title">${getTranslation('builder_tray_title')}</div>
                <div class="tray-chips-list" id="verb-chips-list"></div>
            </div>

            <div class="live-sentence-preview" id="sentence-preview-box">
                <span id="preview-text">${getTranslation('builder_preview_default')}</span>
            </div>

            <div style="text-align: center;" id="sentence-action-area"></div>
        `;

        const verbChipsList = sentenceCard.querySelector('#verb-chips-list');
        const allVerbs = [task.verbum, ...task.wrongVerbs].sort(() => Math.random() - 0.5);

        allVerbs.forEach(v => {
            const btn = document.createElement('button');
            btn.className = 'tray-chip-btn';
            btn.textContent = v;

            btn.onclick = () => {
                const slotV = sentenceCard.querySelector('#slot-v');
                const previewText = sentenceCard.querySelector('#preview-text');
                const actionArea = sentenceCard.querySelector('#sentence-action-area');

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
                        <button class="listen-word-btn" style="display: inline-flex; margin-right: 0.8rem;" id="listen-full-sentence">
                            <span>🔊</span> ${getTranslation('vrimmel_listen_btn')}
                        </button>
                        <button class="mission-next-btn" style="margin-top: 0;" id="next-sentence-task">
                            ${currSentenceIdx < sentenceTasks.length - 1 ? getTranslation('builder_next_btn') : getTranslation('builder_restart_btn')}
                        </button>
                    `;
                    actionArea.querySelector('#listen-full-sentence').onclick = () => speakDanish(task.correctText);
                    actionArea.querySelector('#next-sentence-task').onclick = () => {
                        currSentenceIdx = (currSentenceIdx + 1) % sentenceTasks.length;
                        renderSentenceBuilder();
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

    renderSentenceBuilder();
    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    container.appendChild(viewContainer);
}
