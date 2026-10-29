import { getTranslation, getLang } from '../utils/i18n.js';

/**
 * SangEnebaerbuskView - Sange: "Så går vi rundt om en enebærbusk"
 * Didaktisk flade med moderne vrimlebillede, sangtekst, ordforråd til husarbejde,
 * ledsætninger med "når" og hyldest til værdigheden i hverdagens omsorgsarbejde.
 */
export function renderSangEnebaerbuskView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const isEn = getLang() === 'en';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sang-enebaerbusk-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${isEn ? 'Back to Stories' : 'Tilbage til Historier'}`;
    backBtn.onclick = () => navigateFn('historier_menu');
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
        .sang-enebaerbusk-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.2rem 4rem;
            color: #f8fafc;
            font-family: inherit;
        }

        .hero-song-header {
            text-align: center;
            margin-bottom: 1.8rem;
        }
        .hero-song-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid rgba(245, 158, 11, 0.45);
            color: #fbbf24;
            padding: 0.35rem 0.9rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.8rem;
        }
        .hero-song-header h1 {
            font-size: 2.1rem;
            font-weight: 800;
            margin-bottom: 0.4rem;
            background: linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero-song-header p {
            color: #cbd5e1;
            font-size: 1.05rem;
            max-width: 780px;
            margin: 0 auto;
            line-height: 1.5;
        }

        /* Tabs Navigation */
        .song-tabs-nav {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.8rem;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 0.5rem;
            overflow-x: auto;
            scrollbar-width: thin;
        }
        .song-tab-btn {
            background: #1e293b;
            color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.65rem 1.1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .song-tab-btn:hover {
            color: white;
            background: #334155;
            border-color: rgba(255, 255, 255, 0.2);
        }
        .song-tab-btn.active {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            border-color: #fbbf24;
            box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
        }

        .song-panel {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .song-panel.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* ----------------------------------------------------
           TAB 1: Vrimlebillede
           ---------------------------------------------------- */
        .vrimmel-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .vrimmel-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.8rem;
            margin-bottom: 0.9rem;
            padding: 0.4rem 0.6rem;
            background: #0f172a;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .vrimmel-hint {
            font-size: 0.88rem;
            color: #94a3b8;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .pure-toggle-btn {
            background: #334155;
            color: white;
            border: 1px solid #475569;
            padding: 0.45rem 0.9rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .pure-toggle-btn:hover {
            border-color: #fbbf24;
        }
        .pure-toggle-btn.active {
            background: #f59e0b;
            border-color: #fbbf24;
            color: #0f172a;
        }

        .vrimmel-stage {
            position: relative;
            width: 100%;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.5);
            line-height: 0;
            user-select: none;
        }
        .vrimmel-stage img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
        }

        /* Hotspot styling */
        .vrimmel-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: rgba(245, 158, 11, 0.9);
            border: 2.5px solid #ffffff;
            color: #0f172a;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1.1rem;
            cursor: pointer;
            box-shadow: 0 0 16px rgba(245, 158, 11, 0.7);
            transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 10;
        }
        .vrimmel-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.3);
            background: #fbbf24;
            box-shadow: 0 0 24px #fbbf24;
        }
        .vrimmel-hotspot.active {
            transform: translate(-50%, -50%) scale(1.35);
            background: #ec4899;
            color: white;
            border-color: #fdf2f8;
            box-shadow: 0 0 26px #ec4899;
        }
        .pure-mode .vrimmel-hotspot {
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Detail card below image */
        .hotspot-detail-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.4rem;
            margin-top: 1.2rem;
            border: 1.5px solid rgba(245, 158, 11, 0.4);
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 1.2rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
        .detail-info-left {
            flex: 1;
            min-width: 280px;
        }
        .detail-badges {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-bottom: 0.6rem;
        }
        .badge-pill {
            padding: 0.25rem 0.65rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }
        .badge-dag {
            background: rgba(245, 158, 11, 0.2);
            color: #fbbf24;
            border: 1px solid #f59e0b;
        }
        .badge-verbum {
            background: rgba(239, 68, 68, 0.2);
            color: #f87171;
            border: 1px solid #ef4444;
        }
        .badge-vaerdighed {
            background: rgba(168, 85, 247, 0.2);
            color: #d8b4fe;
            border: 1px solid #a855f7;
        }

        .detail-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.3rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .detail-forms {
            color: #38bdf8;
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 0.6rem;
        }
        .detail-redskaber {
            color: #cbd5e1;
            font-size: 0.95rem;
            margin-bottom: 0.6rem;
        }
        .detail-redskaber strong {
            color: #4ade80;
        }
        .detail-saetning-box {
            background: rgba(30, 41, 59, 0.7);
            border-left: 3px solid #f59e0b;
            padding: 0.7rem 1rem;
            border-radius: 0 10px 10px 0;
            margin-bottom: 0.6rem;
            font-size: 1.05rem;
            color: #f1f5f9;
        }
        .detail-vaerdighed-note {
            color: #d8b4fe;
            font-size: 0.92rem;
            font-style: italic;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }

        .detail-actions-right {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
        }
        .listen-btn {
            background: #f59e0b;
            color: #0f172a;
            border: none;
            padding: 0.75rem 1.3rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .listen-btn:hover {
            background: #fbbf24;
            transform: scale(1.04);
            box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4);
        }

        /* ----------------------------------------------------
           TAB 2: Syng med
           ---------------------------------------------------- */
        .song-lyrics-container {
            max-width: 860px;
            margin: 0 auto;
        }
        .chorus-card {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(15, 23, 42, 0.9));
            border: 2px solid rgba(245, 158, 11, 0.5);
            border-radius: 18px;
            padding: 1.6rem;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .chorus-tag {
            background: #f59e0b;
            color: #0f172a;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            display: inline-block;
            margin-bottom: 0.8rem;
        }
        .chorus-text {
            font-size: 1.25rem;
            line-height: 1.8;
            font-weight: 600;
            color: #f8fafc;
            margin-bottom: 1rem;
        }

        .verses-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
            gap: 1.2rem;
            margin-bottom: 2rem;
        }
        .verse-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1.4rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.25s ease;
        }
        .verse-card:hover {
            border-color: rgba(245, 158, 11, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        .verse-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.8rem;
        }
        .verse-day-pill {
            font-size: 0.85rem;
            font-weight: 800;
            background: rgba(245, 158, 11, 0.2);
            color: #fbbf24;
            padding: 0.3rem 0.75rem;
            border-radius: 20px;
            border: 1px solid rgba(245, 158, 11, 0.4);
        }
        .verse-lyrics {
            font-size: 1.05rem;
            line-height: 1.6;
            color: #f1f5f9;
            margin-bottom: 0.8rem;
        }
        .verse-lyrics mark {
            background: rgba(245, 158, 11, 0.25);
            color: #fde047;
            font-weight: 700;
            padding: 0.1rem 0.3rem;
            border-radius: 4px;
        }
        .verse-note {
            font-size: 0.85rem;
            color: #94a3b8;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            padding-top: 0.6rem;
            margin-bottom: 0.8rem;
        }
        .verse-note strong {
            color: #38bdf8;
        }
        .verse-listen-btn {
            background: #334155;
            color: white;
            border: 1px solid #475569;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            transition: all 0.2s ease;
            width: 100%;
        }
        .verse-listen-btn:hover {
            background: #f59e0b;
            color: #0f172a;
            border-color: #fbbf24;
        }

        /* ----------------------------------------------------
           TAB 3: Ord-detektiv (Moderne redskaber)
           ---------------------------------------------------- */
        .detective-card {
            max-width: 820px;
            margin: 0 auto;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .detective-score-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #0f172a;
            padding: 0.8rem 1.4rem;
            border-radius: 14px;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .detective-clue-box {
            background: #0f172a;
            border: 1.5px solid rgba(56, 189, 248, 0.4);
            border-radius: 16px;
            padding: 1.6rem;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .detective-clue-title {
            font-size: 0.85rem;
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 0.6px;
            color: #38bdf8;
            margin-bottom: 0.6rem;
        }
        .detective-clue-text {
            font-size: 1.25rem;
            line-height: 1.6;
            color: #f8fafc;
            font-weight: 600;
            margin-bottom: 0.8rem;
        }
        .detective-options-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .detective-opt-btn {
            background: #0f172a;
            border: 2px solid #334155;
            color: white;
            padding: 1.1rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .detective-opt-btn:hover {
            border-color: #f59e0b;
            transform: translateY(-2px);
        }
        .detective-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .detective-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
        }
        .detective-feedback-box {
            background: #0f172a;
            border-radius: 14px;
            padding: 1.2rem;
            margin-bottom: 1.2rem;
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .detective-next-btn {
            background: #f59e0b;
            color: #0f172a;
            border: none;
            padding: 0.85rem 1.8rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: block;
            margin: 0 auto;
        }
        .detective-next-btn:hover {
            background: #fbbf24;
            transform: scale(1.03);
        }

        /* ----------------------------------------------------
           TAB 4: Sætningsbygger (Når & Så)
           ---------------------------------------------------- */
        .builder-card {
            max-width: 860px;
            margin: 0 auto;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .builder-grammar-legend {
            display: flex;
            gap: 0.6rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
            background: #0f172a;
            padding: 0.8rem 1.2rem;
            border-radius: 14px;
            font-size: 0.82rem;
            font-weight: 700;
        }
        .legend-chip {
            padding: 0.25rem 0.6rem;
            border-radius: 8px;
        }
        .chip-forfelt { background: rgba(168, 85, 247, 0.25); color: #c084fc; border: 1px solid #a855f7; }
        .chip-verbum { background: rgba(239, 68, 68, 0.25); color: #f87171; border: 1px solid #ef4444; }
        .chip-subjekt { background: rgba(34, 197, 94, 0.25); color: #4ade80; border: 1px solid #22c55e; }
        .chip-objekt { background: rgba(56, 189, 248, 0.25); color: #38bdf8; border: 1px solid #0284c7; }
        .chip-adverbial { background: rgba(249, 115, 22, 0.25); color: #fb923c; border: 1px solid #ea580c; }

        .builder-task-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
            gap: 0.6rem;
        }
        .builder-prompt-text {
            font-size: 1.15rem;
            color: #f1f5f9;
            font-weight: 700;
        }

        .builder-drop-zone {
            min-height: 80px;
            background: #0f172a;
            border: 2px dashed #475569;
            border-radius: 16px;
            padding: 1rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.7rem;
            align-items: center;
            margin-bottom: 1.5rem;
            transition: all 0.2s ease;
        }
        .builder-drop-zone.filled {
            border-color: #38bdf8;
            background: rgba(15, 23, 42, 0.85);
        }
        .builder-drop-zone.success {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.1);
        }

        .builder-tiles-pool {
            display: flex;
            flex-wrap: wrap;
            gap: 0.7rem;
            margin-bottom: 1.6rem;
            min-height: 50px;
        }
        .builder-word-tile {
            padding: 0.7rem 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            user-select: none;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .builder-word-tile:hover {
            transform: translateY(-2px);
            filter: brightness(1.15);
        }

        .tile-forfelt { background: #581c87; color: #e9d5ff; border: 1.5px solid #a855f7; }
        .tile-verbum { background: #7f1d1d; color: #fecaca; border: 1.5px solid #ef4444; }
        .tile-subjekt { background: #14532d; color: #bbf7d0; border: 1.5px solid #22c55e; }
        .tile-objekt { background: #0c4a6e; color: #bae6fd; border: 1.5px solid #0284c7; }
        .tile-adverbial { background: #7c2d12; color: #fed7aa; border: 1.5px solid #ea580c; }

        .builder-controls-row {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .builder-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .builder-btn-reset {
            background: #334155;
            color: #cbd5e1;
            border: 1px solid #475569;
        }
        .builder-btn-check {
            background: #f59e0b;
            color: #0f172a;
            border: none;
        }
        .builder-btn-next {
            background: #22c55e;
            color: white;
            border: none;
        }

        /* ----------------------------------------------------
           TAB 5: Dengang og nu (Værdighed & Udvikling)
           ---------------------------------------------------- */
        .history-card {
            max-width: 900px;
            margin: 0 auto;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .tribute-box {
            background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(15, 23, 42, 0.9));
            border: 1.5px solid rgba(236, 72, 153, 0.4);
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            text-align: center;
        }
        .tribute-badge {
            background: #ec4899;
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
            margin-bottom: 0.6rem;
        }
        .tribute-text {
            font-size: 1.15rem;
            line-height: 1.6;
            color: #fdf2f8;
            font-weight: 500;
        }

        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.2rem;
            margin-bottom: 2.5rem;
        }
        .comparison-item {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1.4rem;
        }
        .comp-header {
            font-size: 1.1rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .comp-era {
            margin-bottom: 0.8rem;
            font-size: 0.92rem;
            line-height: 1.5;
        }
        .comp-era.then {
            color: #cbd5e1;
            padding-left: 0.6rem;
            border-left: 2px solid #ef4444;
        }
        .comp-era.now {
            color: #4ade80;
            padding-left: 0.6rem;
            border-left: 2px solid #22c55e;
        }

        .discussion-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.2rem;
        }
        .discussion-card {
            background: #0f172a;
            border: 1px solid rgba(168, 85, 247, 0.3);
            border-radius: 16px;
            padding: 1.4rem;
            transition: all 0.25s ease;
        }
        .discussion-card:hover {
            border-color: #a855f7;
            transform: translateY(-2px);
        }
        .disc-icon {
            font-size: 1.6rem;
            margin-bottom: 0.5rem;
        }
        .disc-question {
            font-size: 1.05rem;
            font-weight: 700;
            color: #f8fafc;
            margin-bottom: 0.8rem;
            line-height: 1.4;
        }
        .disc-helpers {
            font-size: 0.85rem;
            color: #c084fc;
            background: rgba(168, 85, 247, 0.1);
            padding: 0.5rem 0.8rem;
            border-radius: 10px;
        }

        /* ----------------------------------------------------
           Mobile Responsiveness
           ---------------------------------------------------- */
        @media (max-width: 768px) {
            .sang-enebaerbusk-view {
                padding: 0.8rem 0.6rem 3rem;
            }
            .hero-song-header h1 {
                font-size: 1.6rem;
            }
            .hero-song-header p {
                font-size: 0.95rem;
            }
            .vrimmel-card, .detective-card, .builder-card, .history-card {
                padding: 1.1rem 0.8rem;
                border-radius: 16px;
            }
            .detective-options-grid {
                grid-template-columns: 1fr;
            }
            .verses-grid {
                grid-template-columns: 1fr;
            }
            .vrimmel-hotspot {
                width: 32px;
                height: 32px;
                font-size: 0.95rem;
            }
            .hotspot-detail-card {
                padding: 1rem;
            }
            .detail-title {
                font-size: 1.3rem;
            }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const hero = document.createElement('div');
    hero.className = 'hero-song-header';
    hero.innerHTML = `
        <div class="hero-song-badge">🎵 ${isEn ? 'Danish Songs & Everyday Life' : 'Danske sange & Hverdagsliv'}</div>
        <h1>${isEn ? 'Så går vi rundt om en enebærbusk' : 'Så går vi rundt om en enebærbusk'}</h1>
        <p>${isEn 
            ? 'Sing along to Denmark’s classic singing game, explore contemporary household tasks, learn subordinate clauses with "når", and honor the dignity and care that build a great home.' 
            : 'Syng med på den klassiske danske sangleg, lær moderne ordforråd til husarbejde og tøjpleje, byg ledsætninger med "når", og fejr værdigheden i hverdagens omsorgsarbejde.'}</p>
    `;
    viewContainer.appendChild(hero);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'song-tabs-nav';

    const tabsData = [
        { id: 'tab_vrimmel', icon: '🖼️', label: isEn ? '1. Wimmelbild (Chores)' : '1. Vrimlebillede (Husarbejde)' },
        { id: 'tab_sang', icon: '🎶', label: isEn ? '2. Sing Along (Lyrics)' : '2. Syng med (Sangtekst)' },
        { id: 'tab_detektiv', icon: '🕵️', label: isEn ? '3. Word Detective' : '3. Ord-detektiv (Redskaber)' },
        { id: 'tab_saetning', icon: '🧱', label: isEn ? '4. Sentence Builder' : '4. Sætningsbygger (Når & Så)' },
        { id: 'tab_udvikling', icon: '⏳', label: isEn ? '5. Then & Now' : '5. Dengang & nu (Værdighed)' }
    ];

    let currentTab = extraData.activeTab || 'tab_vrimmel';

    tabsData.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `song-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.innerHTML = `<span>${t.icon}</span> ${t.label}`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    panelsHolder.className = 'panels-holder';
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', `#/${lang}/sang_enebaerbusk/${tabId}`);
        tabsMenu.querySelectorAll('.song-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.song-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // =========================================================================
    // DATA DEFINITION: Hotspots & Chores
    // =========================================================================
    const husarbejdeItems = [
        {
            id: 'mandag',
            dag: 'Mandag',
            dagEn: 'Monday',
            icon: '🧺',
            handling: 'at vaske tøj',
            handlingEn: 'to wash clothes / do laundry',
            nutid: 'vasker tøj',
            datid: 'vaskede tøj',
            foerdatid: 'har vasket tøj',
            redskaber: 'en vaskemaskine, flydende vaskemiddel, en vasketøjskurv',
            redskaberEn: 'a washing machine, liquid detergent, a laundry basket',
            saetning: 'Når vi vasker tøj, doserer vi vaskemidlet og vælger det rette vaskeprogram.',
            saetningEn: 'When we wash clothes, we dose the detergent and select the right wash cycle.',
            vaerdighed: 'At vaske tøj er omsorg for familien, som sikrer renlighed og god sundhed i hverdagen.',
            vaerdighedEn: 'Doing laundry is family care that ensures cleanliness and good health in daily life.',
            x: 18,
            y: 60
        },
        {
            id: 'tirsdag',
            dag: 'Tirsdag',
            dagEn: 'Tuesday',
            icon: '🧼',
            handling: 'at skylle og tømme maskinen',
            handlingEn: 'to rinse & empty the machine',
            nutid: 'skyller / tømmer maskinen',
            datid: 'skyllede / tømte maskinen',
            foerdatid: 'har skyllet / har tømt maskinen',
            redskaber: 'en vasketøjskurv, et skyllemiddel, en centrifuge',
            redskaberEn: 'a laundry basket, fabric softener, spin cycle',
            saetning: 'Når maskinen bipper og er færdig, løfter vi det rene, duftende tøj op i kurven.',
            saetningEn: 'When the machine beeps and finishes, we lift the fresh smelling laundry into the basket.',
            vaerdighed: 'Når børn og voksne hjælper hinanden med vasketøjet, styrkes fællesskabet i hjemmet.',
            vaerdighedEn: 'When children and adults help each other with laundry, family cooperation is strengthened.',
            x: 32,
            y: 72
        },
        {
            id: 'onsdag',
            dag: 'Onsdag',
            dagEn: 'Wednesday',
            icon: '💨',
            handling: 'at tørre tøj',
            handlingEn: 'to dry clothes',
            nutid: 'tørrer tøj / hænger tøj op',
            datid: 'tørrede tøj / hængte tøj op',
            foerdatid: 'har tørret tøj / har hængt tøj op',
            redskaber: 'et tørrestativ, tøjklemmer, en tørretumbler',
            redskaberEn: 'a drying rack, clothespins, a tumble dryer',
            saetning: 'Når den milde vind blæser, hænger vi tøjet op på tørrestativet ved den åbne havedør.',
            saetningEn: 'When the gentle breeze blows, we hang the clothes on the drying rack by the open garden door.',
            vaerdighed: 'Naturlig lufttørring sparer strøm, skåner tøjets fibre og dufter vidunderligt af sommer.',
            vaerdighedEn: 'Natural air drying saves electricity, preserves clothing fibers, and smells wonderfully like summer.',
            x: 44,
            y: 46
        },
        {
            id: 'torsdag',
            dag: 'Torsdag',
            dagEn: 'Thursday',
            icon: '📦',
            handling: 'at folde og lægge sammen',
            handlingEn: 'to fold and put away',
            nutid: 'folder tøj / lægger sammen',
            datid: 'foldede tøj / lagde sammen',
            foerdatid: 'har foldet tøj / har lagt sammen',
            redskaber: 'et rent bord, nydelige bunker, et klædeskab',
            redskaberEn: 'a clean counter, neat stacks, a wardrobe',
            saetning: 'Når tøjet er helt tørt, folder vi det omhyggeligt i bunker og lægger det på plads i skabet.',
            saetningEn: 'When the laundry is dry, we fold it carefully into neat piles and place it in the wardrobe.',
            vaerdighed: 'Et ryddeligt klædeskab skaber ro i sindet og gør morgenerne lette og overskuelige.',
            vaerdighedEn: 'An orderly wardrobe brings peace of mind and makes busy mornings smooth and easy.',
            x: 62,
            y: 42
        },
        {
            id: 'fredag',
            dag: 'Fredag',
            dagEn: 'Friday',
            icon: '👔',
            handling: 'at stryge tøj',
            handlingEn: 'to iron clothes',
            nutid: 'stryger skjorter og kjoler',
            datid: 'strøg skjorter og kjoler',
            foerdatid: 'har strøget skjorter og kjoler',
            redskaber: 'et dampstrygejern, et strygebræt, bøjler',
            redskaberEn: 'a steam iron, an ironing board, clothes hangers',
            saetning: 'Når vi stryger skjorter, bruger vi varm damp, så alle krøller og folder glattes helt ud.',
            saetningEn: 'When we iron shirts, we use hot steam so that all creases and wrinkles vanish completely.',
            vaerdighed: 'Nystrøget tøj giver personlig værdighed, elegance og selvtillid til fest og arbejde.',
            vaerdighedEn: 'Crisply pressed clothes provide personal dignity, elegance, and confidence for work and gatherings.',
            x: 68,
            y: 62
        },
        {
            id: 'loerdag',
            dag: 'Lørdag',
            dagEn: 'Saturday',
            icon: '✨',
            handling: 'at vaske gulv og gøre rent',
            handlingEn: 'to mop the floor and clean',
            nutid: 'vasker gulv / gør rent',
            datid: 'vaskede gulv / gjorde rent',
            foerdatid: 'har vasket gulv / har gjort rent',
            redskaber: 'en ergonomisk gulvmoppe, en spand med sæbevand, en mikrofiberklud',
            redskaberEn: 'an ergonomic floor mop, a soapy bucket, a microfiber cloth',
            saetning: 'Om lørdagen vasker vi gulvet, så træet og klinkerne skinner og hele huset dufter friskt.',
            saetningEn: 'On Saturday we mop the floor so the wood and tiles shine and the whole house smells clean.',
            vaerdighed: 'Rene gulve og et hygiejnisk hjem danner den trygge ramme om hele familiens liv.',
            vaerdighedEn: 'Clean floors and a hygienic home form the safe foundation for the whole family life.',
            x: 84,
            y: 68
        },
        {
            id: 'soendag',
            dag: 'Søndag',
            dagEn: 'Sunday',
            icon: '☕',
            handling: 'at holde fri og hygge sig',
            handlingEn: 'to rest and relax together',
            nutid: 'holder fri / hygger sig',
            datid: 'holdt fri / hyggede sig',
            foerdatid: 'har holdt fri / har hygget sig',
            redskaber: 'en kaffekop, sofaen, tid til familien, søndagsro',
            redskaberEn: 'a coffee cup, the sofa, family time, Sunday peace',
            saetning: 'Om søndagen slapper vi af med kaffe og samtale i et rent, fredeligt og velholdt hjem.',
            saetningEn: 'On Sunday we relax with coffee and conversation in a clean, quiet, and well-kept home.',
            vaerdighed: 'Efter en uges flittigt arbejde er hvilen fuldt fortjent. Hjemmet er familiens trygge havn.',
            vaerdighedEn: 'After a week of diligent care, rest is fully earned. Home is the family safe haven.',
            x: 88,
            y: 38
        },
        {
            id: 'enebaerbusk',
            dag: 'Haven',
            dagEn: 'The Garden',
            icon: '🌲',
            handling: 'enebærbusken i haven',
            handlingEn: 'the juniper bush in the garden',
            nutid: 'vokser i haven',
            datid: 'voksede i haven',
            foerdatid: 'har vokset i haven',
            redskaber: 'en stedsegrøn enebærbusk, haven, naturen',
            redskaberEn: 'an evergreen juniper bush, garden, nature',
            saetning: 'Gennem vinduet ses den grønne enebærbusk, som har givet navn til den elskede sangleg.',
            saetningEn: 'Through the window sits the green juniper bush that gave name to the beloved singing game.',
            vaerdighed: 'Enebærbusken er stedsegrøn hele vinteren og er et gammelt symbol på sundhed og styrke.',
            vaerdighedEn: 'The juniper bush stays evergreen all winter and is an ancient symbol of health and strength.',
            x: 21,
            y: 30
        },
        {
            id: 'radio',
            dag: 'Musikken',
            dagEn: 'The Song',
            icon: '📻',
            handling: 'radioen med sangen',
            handlingEn: 'the radio playing the song',
            nutid: 'spiller musik',
            datid: 'spillede musik',
            foerdatid: 'har spillet musik',
            redskaber: 'en radio, musikglæde, en sangleg',
            redskaberEn: 'a radio, musical joy, a singing game',
            saetning: 'Radioen spiller sangen om enebærbusken, og musikken giver godt humør og lette fødder til arbejdet.',
            saetningEn: 'The radio plays the song about the juniper bush, bringing cheerful spirits to the chores.',
            vaerdighed: 'Sang og kultur binder generationer sammen og forvandler pligter til glæde og fællesskab.',
            vaerdighedEn: 'Singing and culture unite generations and transform everyday tasks into joyful community.',
            x: 57,
            y: 22
        }
    ];

    // =========================================================================
    // TAB 1: 🖼️ VRIMLEBILLEDE
    // =========================================================================
    const panelVrimmel = document.createElement('div');
    panelVrimmel.className = `song-panel ${currentTab === 'tab_vrimmel' ? 'active' : ''}`;
    panelVrimmel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'vrimmel-card';

    // Control bar
    const controlBar = document.createElement('div');
    controlBar.className = 'vrimmel-control-bar';

    const hintText = document.createElement('div');
    hintText.className = 'vrimmel-hint';
    hintText.innerHTML = `<span>💡</span> ${isEn ? 'Click on the glowing dots to explore the tasks of each day:' : 'Klik på de lysende prikker for at udforske ugens gøremål:'}`;
    controlBar.appendChild(hintText);

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-toggle-btn';
    let pureModeActive = false;
    pureBtn.innerHTML = `<span>🖼️</span> ${isEn ? 'Image only:' : 'Vis kun billedet:'} <strong id="pure-status">${isEn ? 'OFF' : 'FRA'}</strong>`;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-status').textContent = pureModeActive ? (isEn ? 'ON' : 'TIL') : (isEn ? 'OFF' : 'FRA');
    };
    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/sang_enebaerbusk_vrimmel.jpg';
    img.alt = 'Så går vi rundt om en enebærbusk - Vrimlebillede af moderne husarbejde';
    stage.appendChild(img);

    // Detail card container
    const detailCard = document.createElement('div');
    detailCard.className = 'hotspot-detail-card';

    function showItemDetail(item) {
        detailCard.innerHTML = `
            <div class="detail-info-left">
                <div class="detail-badges">
                    <span class="badge-pill badge-dag">🗓️ ${isEn ? item.dagEn : item.dag}</span>
                    <span class="badge-pill badge-verbum">🔴 ${isEn ? 'Verb & Action' : 'Verbum & Handling'}</span>
                    <span class="badge-pill badge-vaerdighed">✨ ${isEn ? 'Care & Dignity' : 'Omsorg & Værdighed'}</span>
                </div>
                <div class="detail-title">
                    <span>${item.icon}</span> ${item.handling}
                </div>
                <div class="detail-forms">
                    ${item.nutid} · ${item.datid} · ${item.foerdatid}
                </div>
                <div class="detail-redskaber">
                    <strong>${isEn ? 'Modern tools:' : 'Moderne redskaber:'}</strong> ${isEn ? item.redskaberEn : item.redskaber}
                </div>
                <div class="detail-saetning-box">
                    "${item.saetning}"
                </div>
                <div class="detail-vaerdighed-note">
                    <span>💜</span> ${isEn ? item.vaerdighedEn : item.vaerdighed}
                </div>
            </div>
            <div class="detail-actions-right">
                <button class="listen-btn" id="btn-listen-hotspot">
                    <span>🔊</span> ${isEn ? 'Listen to sentence' : 'Lyt til sætning'}
                </button>
            </div>
        `;
        detailCard.querySelector('#btn-listen-hotspot').onclick = () => {
            speakDanish(item.saetning);
        };
    }

    // Default select Mandag
    showItemDetail(husarbejdeItems[0]);

    // Create hotspots
    husarbejdeItems.forEach((item, index) => {
        const dot = document.createElement('div');
        dot.className = `vrimmel-hotspot ${index === 0 ? 'active' : ''}`;
        dot.style.left = `${item.x}%`;
        dot.style.top = `${item.y}%`;
        dot.textContent = item.icon;
        dot.title = `${item.dag}: ${item.handling}`;

        dot.onclick = () => {
            stage.querySelectorAll('.vrimmel-hotspot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            showItemDetail(item);
            speakDanish(item.handling);
        };
        stage.appendChild(dot);
    });

    vrimmelCard.appendChild(stage);
    vrimmelCard.appendChild(detailCard);
    panelVrimmel.appendChild(vrimmelCard);
    panelsHolder.appendChild(panelVrimmel);

    // =========================================================================
    // TAB 2: 🎶 SYNG MED (Sangtekst & Karaoke)
    // =========================================================================
    const panelSang = document.createElement('div');
    panelSang.className = `song-panel ${currentTab === 'tab_sang' ? 'active' : ''}`;
    panelSang.dataset.panel = 'tab_sang';

    const lyricsContainer = document.createElement('div');
    lyricsContainer.className = 'song-lyrics-container';

    // Chorus
    const chorusCard = document.createElement('div');
    chorusCard.className = 'chorus-card';
    chorusCard.innerHTML = `
        <span class="chorus-tag">🌿 ${isEn ? 'Chorus of the Song Game' : 'Sanglegens faste omkvæd'}</span>
        <div class="chorus-text">
            Så går vi rundt om en enebærbusk,<br>
            enebærbusk, enebærbusk.<br>
            Så går vi rundt om en enebærbusk<br>
            tidlig en mandag morgen!
        </div>
        <button class="listen-btn" id="btn-listen-chorus" style="margin: 0 auto;">
            <span>🔊</span> ${isEn ? 'Listen to Chorus' : 'Lyt til omkvædet'}
        </button>
    `;
    chorusCard.querySelector('#btn-listen-chorus').onclick = () => {
        speakDanish('Så går vi rundt om en enebærbusk, enebærbusk, enebærbusk. Så går vi rundt om en enebærbusk, tidlig en mandag morgen!');
    };
    lyricsContainer.appendChild(chorusCard);

    // Verses Data
    const versesData = [
        {
            dag: 'Mandag',
            dagEn: 'Monday',
            icon: '🧺',
            action: 'vasker',
            text: 'Så gør vi sådan, når vi <mark>vasker vort tøj</mark>,<br>vasker vort tøj, vasker vort tøj.<br>Så gør vi sådan, når vi <mark>vasker vort tøj</mark>,<br>tidlig en mandag morgen.',
            tts: 'Så gør vi sådan, når vi vasker vort tøj, vasker vort tøj, vasker vort tøj. Så gør vi sådan, når vi vasker vort tøj, tidlig en mandag morgen.',
            modernNote: isEn ? 'Modern Danish: "når vi vasker vores tøj" (vores instead of archaic vort).' : 'Moderne dansk: "når vi vasker vores tøj" (vores i stedet for det gamle vort).'
        },
        {
            dag: 'Tirsdag',
            dagEn: 'Tuesday',
            icon: '🧼',
            action: 'skyller',
            text: 'Så gør vi sådan, når vi <mark>skyller vort tøj</mark>,<br>skyller vort tøj, skyller vort tøj.<br>Så gør vi sådan, når vi <mark>skyller vort tøj</mark>,<br>tidlig en tirsdag morgen.',
            tts: 'Så gør vi sådan, når vi skyller vort tøj, skyller vort tøj, skyller vort tøj. Så gør vi sådan, når vi skyller vort tøj, tidlig en tirsdag morgen.',
            modernNote: isEn ? 'Modern Danish: "når vi skyller vores tøj" (after washing).' : 'Moderne dansk: "når vi skyller vores tøj" i maskinens skylleprogram.'
        },
        {
            dag: 'Onsdag',
            dagEn: 'Wednesday',
            icon: '💨',
            action: 'tørrer',
            text: 'Så gør vi sådan, når vi <mark>tørrer vort tøj</mark>,<br>tørrer vort tøj, tørrer vort tøj.<br>Så gør vi sådan, når vi <mark>tørrer vort tøj</mark>,<br>tidlig en onsdag morgen.',
            tts: 'Så gør vi sådan, når vi tørrer vort tøj, tørrer vort tøj, tørrer vort tøj. Så gør vi sådan, når vi tørrer vort tøj, tidlig en onsdag morgen.',
            modernNote: isEn ? 'Notice inversion: "Så gør vi sådan" (Så + gør + vi).' : 'Bemærk inversion: "Så gør vi sådan" (Forfelt + Verbum + Subjekt).'
        },
        {
            dag: 'Torsdag',
            dagEn: 'Thursday',
            icon: '📦',
            action: 'folder & ruller',
            text: 'Så gør vi sådan, når vi <mark>folder vort tøj</mark>,<br>folder vort tøj, folder vort tøj.<br>Så gør vi sådan, når vi <mark>folder vort tøj</mark>,<br>tidlig en torsdag morgen.',
            tts: 'Så gør vi sådan, når vi folder vort tøj, folder vort tøj, folder vort tøj. Så gør vi sådan, når vi folder vort tøj, tidlig en torsdag morgen.',
            modernNote: isEn ? 'Historically: "ruller vort tøj" (mangelbræt). Today: "folder tøjet sammen".' : 'Historisk: "ruller vort tøj" (strygerulle). I dag: "folder vi tøjet pænt sammen".'
        },
        {
            dag: 'Fredag',
            dagEn: 'Friday',
            icon: '👔',
            action: 'stryger',
            text: 'Så gør vi sådan, når vi <mark>stryger vort tøj</mark>,<br>stryger vort tøj, stryger vort tøj.<br>Så gør vi sådan, når vi <mark>stryger vort tøj</mark>,<br>tidlig en fredag morgen.',
            tts: 'Så gør vi sådan, når vi stryger vort tøj, stryger vort tøj, stryger vort tøj. Så gør vi sådan, når vi stryger vort tøj, tidlig en fredag morgen.',
            modernNote: isEn ? 'Verb forms: at stryge – stryger – strøg – har strøget.' : 'Verbum: at stryge – stryger – strøg – har strøget (stærkt bøjet verbum).'
        },
        {
            dag: 'Lørdag',
            dagEn: 'Saturday',
            icon: '✨',
            action: 'vasker gulv',
            text: 'Så gør vi sådan, når vi <mark>vasker vort gulv</mark>,<br>vasker vort gulv, vasker vort gulv.<br>Så gør vi sådan, når vi <mark>vasker vort gulv</mark>,<br>tidlig en lørdag morgen.',
            tts: 'Så gør vi sådan, når vi vasker vort gulv, vasker vort gulv, vasker vort gulv. Så gør vi sådan, når vi vasker vort gulv, tidlig en lørdag morgen.',
            modernNote: isEn ? 'Historically: "skurer vort gulv". Today: "vasker gulv med moppe".' : 'Historisk: "skurer vort gulv" (på knæ). I dag: "vasker gulv med moppe".'
        },
        {
            dag: 'Søndag',
            dagEn: 'Sunday',
            icon: '☕',
            action: 'holder fri & hygger',
            text: 'Så gør vi sådan, når vi <mark>holder vor fri</mark>,<br>holder vor fri, hygger os bravt.<br>Så gør vi sådan, når vi <mark>holder vor fri</mark>,<br>tidlig en søndag morgen.',
            tts: 'Så gør vi sådan, når vi holder vor fri, holder vor fri, hygger os bravt. Så gør vi sådan, når vi holder vor fri, tidlig en søndag morgen.',
            modernNote: isEn ? 'Historically: "går vi til kirke". Modern life: family relaxation and Sunday hygge.' : 'Klassisk: "går vi til kirke". I det moderne samfund: velfortjent søndagshygge og familietid.'
        }
    ];

    const versesGrid = document.createElement('div');
    versesGrid.className = 'verses-grid';

    versesData.forEach(v => {
        const vCard = document.createElement('div');
        vCard.className = 'verse-card';
        vCard.innerHTML = `
            <div>
                <div class="verse-header">
                    <span class="verse-day-pill">${v.icon} ${isEn ? v.dagEn : v.dag}</span>
                    <span style="font-size: 0.85rem; color: #94a3b8; font-weight: 700;">${v.action}</span>
                </div>
                <div class="verse-lyrics">${v.text}</div>
                <div class="verse-note">💡 ${v.modernNote}</div>
            </div>
            <button class="verse-listen-btn">
                <span>🔊</span> ${isEn ? 'Listen to verse' : 'Lyt til verset'}
            </button>
        `;
        vCard.querySelector('.verse-listen-btn').onclick = () => {
            speakDanish(v.tts);
        };
        versesGrid.appendChild(vCard);
    });

    lyricsContainer.appendChild(versesGrid);
    panelSang.appendChild(lyricsContainer);
    panelsHolder.appendChild(panelSang);

    // =========================================================================
    // TAB 3: 🕵️ ORD-DETEKTIV (Moderne redskaber)
    // =========================================================================
    const panelDetektiv = document.createElement('div');
    panelDetektiv.className = `song-panel ${currentTab === 'tab_detektiv' ? 'active' : ''}`;
    panelDetektiv.dataset.panel = 'tab_detektiv';

    const detectiveCard = document.createElement('div');
    detectiveCard.className = 'detective-card';

    const detectiveChallenges = [
        {
            clue: 'Elektrisk hvidvare, som vasker tøjet rent med vand og sæbe ved 40° eller 60°.',
            clueEn: 'Household appliance that washes clothes clean with water and soap at 40° or 60°.',
            target: 'en vaskemaskine',
            options: ['en vaskemaskine', 'et strygejern', 'en gulvmoppe', 'et tørrestativ'],
            explanation: 'Vaskemaskinen er en af de største teknologiske opfindelser, der befriede hjemmet for hårdt fysisk slid.'
        },
        {
            clue: 'Sæbe i flydende form, som vi hælder i låget for at dosere til vasken.',
            clueEn: 'Soap in liquid form that we pour into the cap to dose for the laundry.',
            target: 'flydende vaskemiddel',
            options: ['flydende vaskemiddel', 'et skyllemiddel', 'en spand vand', 'en mikrofiberklud'],
            explanation: 'Flydende vaskemiddel opløses hurtigt og er skånsomt mod både farver og miljøet.'
        },
        {
            clue: 'Sammenklappeligt stativ af metal, hvor vi hænger våde skjorter og bukser til tørre.',
            clueEn: 'Foldable metal rack where we hang damp shirts and trousers to dry.',
            target: 'et tørrestativ',
            options: ['et tørrestativ', 'et strygebræt', 'en vaskemaskine', 'et klædeskab'],
            explanation: 'Tørrestativet gør det nemt at tørre tøjet i frisk luft ved det åbne havevindue.'
        },
        {
            clue: 'Maskine med roterende tromle og varm luft, som gør håndklæder bløde og tørre på kort tid.',
            clueEn: 'Machine with a rotating drum and hot air that dries towels and makes them soft quickly.',
            target: 'en tørretumbler',
            options: ['en tørretumbler', 'en vaskemaskine', 'et strygejern', 'en gulvmoppe'],
            explanation: 'Tørretumbleren er fantastisk til håndklæder og sengetøj på regnfulde dage.'
        },
        {
            clue: 'Varmt elektrisk apparat med damp og glat sål, der fjerner krøller og folder på skjorter.',
            clueEn: 'Hot electric appliance with steam and a smooth sole that removes wrinkles from shirts.',
            target: 'et strygejern',
            options: ['et strygejern', 'et tørrestativ', 'en vasketøjskurv', 'en mikroovn'],
            explanation: 'Dampstrygejernet sender hed damp ind i tøjets fibre, så stoffet bliver helt glat og blødt.'
        },
        {
            clue: 'Polstret aflangt bord på foldbare ben, som man stryger sit tøj på.',
            clueEn: 'Padded oblong board on foldable legs where you iron your clothes.',
            target: 'et strygebræt',
            options: ['et strygebræt', 'et spisebord', 'et tørrestativ', 'en sofa'],
            explanation: 'Strygebrættet har den rette ergonomiske arbejdshøjde, så man skåner ryg og skuldre.'
        },
        {
            clue: 'Skaft med fladt led og mikrofiberklud, som bruges til at vaske trægulve og klinker rene.',
            clueEn: 'Long handle with a flat head and microfiber pad used to mop wooden floors and tiles clean.',
            target: 'en gulvmoppe',
            options: ['en gulvmoppe', 'et strygejern', 'en opvaskebørste', 'en støvsuger'],
            explanation: 'Gulvmoppen gør gulvvask let og hurtig uden at man behøver at ligge på knæ med en skurebørste.'
        },
        {
            clue: 'Let kurv af flet eller plast, som vi bærer det tørre og vaskede tøj rundt i.',
            clueEn: 'Light basket of woven wicker or plastic used to carry fresh laundry around.',
            target: 'en vasketøjskurv',
            options: ['en vasketøjskurv', 'en skraldespand', 'en flyttekasse', 'en gulvspand'],
            explanation: 'Vasketøjskurven er uundværlig, når tøjet skal bæres fra maskinen til tørrestativet.'
        }
    ];

    let detIdx = 0;
    let detScore = 0;

    function renderDetectiveRound() {
        detectiveCard.innerHTML = '';
        const challenge = detectiveChallenges[detIdx];

        // Score bar
        const scoreBar = document.createElement('div');
        scoreBar.className = 'detective-score-bar';
        scoreBar.innerHTML = `
            <span style="font-weight: 800; color: #fbbf24;">🕵️ ${isEn ? 'Challenge' : 'Opgave'} ${detIdx + 1} / ${detectiveChallenges.length}</span>
            <span style="font-weight: 800; color: #4ade80;">⭐ ${isEn ? 'Score' : 'Point'}: ${detScore}</span>
        `;
        detectiveCard.appendChild(scoreBar);

        // Clue Box
        const clueBox = document.createElement('div');
        clueBox.className = 'detective-clue-box';
        clueBox.innerHTML = `
            <div class="detective-clue-title">${isEn ? 'What modern household tool is this?' : 'Hvilket moderne husredskab beskrives her?'}</div>
            <div class="detective-clue-text">"${isEn ? challenge.clueEn : challenge.clue}"</div>
            <button class="listen-btn" id="btn-listen-clue" style="margin: 0 auto; padding: 0.5rem 1rem; font-size: 0.85rem;">
                <span>🔊</span> ${isEn ? 'Listen to clue' : 'Lyt til ledetråd'}
            </button>
        `;
        clueBox.querySelector('#btn-listen-clue').onclick = () => {
            speakDanish(challenge.clue);
        };
        detectiveCard.appendChild(clueBox);

        // Options Grid
        const optsGrid = document.createElement('div');
        optsGrid.className = 'detective-options-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'detective-feedback-box';

        let answered = false;

        challenge.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'detective-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                if (answered) return;
                answered = true;

                const isCorrect = opt === challenge.target;
                if (isCorrect) {
                    btn.classList.add('correct');
                    detScore++;
                    scoreBar.querySelector('span:nth-child(2)').textContent = `⭐ ${isEn ? 'Score' : 'Point'}: ${detScore}`;
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                            🎉 ${isEn ? 'Correct!' : 'Helt rigtigt!'} <strong>${opt}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">${challenge.explanation}</div>
                    `;
                    speakDanish(opt);
                } else {
                    btn.classList.add('wrong');
                    optsGrid.querySelectorAll('.detective-opt-btn').forEach(b => {
                        if (b.textContent === challenge.target) b.classList.add('correct');
                    });
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                            ❌ ${isEn ? 'Not quite!' : 'Ikke helt!'} Det rigtige svar er <strong>${challenge.target}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">${challenge.explanation}</div>
                    `;
                }

                feedbackBox.style.display = 'block';

                const nextBtn = document.createElement('button');
                nextBtn.className = 'detective-next-btn';
                nextBtn.innerHTML = detIdx + 1 < detectiveChallenges.length 
                    ? `<span>${isEn ? 'Next Tool' : 'Næste redskab'}</span> →` 
                    : `<span>🏆 ${isEn ? 'See Result' : 'Se dit resultat'}</span>`;
                nextBtn.onclick = () => {
                    if (detIdx + 1 < detectiveChallenges.length) {
                        detIdx++;
                        renderDetectiveRound();
                    } else {
                        renderDetectiveFinish();
                    }
                };
                feedbackBox.appendChild(nextBtn);
            };

            optsGrid.appendChild(btn);
        });

        detectiveCard.appendChild(optsGrid);
        detectiveCard.appendChild(feedbackBox);
    }

    function renderDetectiveFinish() {
        detectiveCard.innerHTML = `
            <div style="text-align: center; padding: 2rem 1rem;">
                <div style="font-size: 3.5rem; margin-bottom: 0.8rem;">🎉🧺🏆</div>
                <h2 style="font-size: 1.8rem; color: #fbbf24; margin-bottom: 0.6rem;">
                    ${isEn ? 'Outstanding Work!' : 'Flot klaret! Du er mester i hjemmets redskaber!'}
                </h2>
                <p style="font-size: 1.2rem; color: #f8fafc; margin-bottom: 1.5rem;">
                    ${isEn ? 'You scored' : 'Du fik'} <strong>${detScore}</strong> ${isEn ? 'out of' : 'ud af'} <strong>${detectiveChallenges.length}</strong> ${isEn ? 'points' : 'point'}!
                </p>
                <p style="color: #cbd5e1; max-width: 580px; margin: 0 auto 2rem; line-height: 1.6;">
                    ${isEn 
                        ? 'You now master the key Danish nouns for everyday domestic care and laundry tools.' 
                        : 'Du mestrer nu de præcise danske navneord for moderne redskaber til tøjvask, rengøring og hverdagens omsorgsarbejde.'}
                </p>
                <button class="detective-next-btn" id="btn-restart-detective">
                    🔄 ${isEn ? 'Try Again' : 'Prøv igen'}
                </button>
            </div>
        `;
        detectiveCard.querySelector('#btn-restart-detective').onclick = () => {
            detIdx = 0;
            detScore = 0;
            renderDetectiveRound();
        };
    }

    renderDetectiveRound();
    panelDetektiv.appendChild(detectiveCard);
    panelsHolder.appendChild(panelDetektiv);

    // =========================================================================
    // TAB 4: 🧱 SÆTNINGSBYGGER (Når & Så)
    // =========================================================================
    const panelSaetning = document.createElement('div');
    panelSaetning.className = `song-panel ${currentTab === 'tab_saetning' ? 'active' : ''}`;
    panelSaetning.dataset.panel = 'tab_saetning';

    const builderCard = document.createElement('div');
    builderCard.className = 'builder-card';

    const builderPuzzles = [
        {
            prompt: 'Byg sætningen med "når" (Ledsætning først ➔ Inversion i hovedsætningen):',
            promptEn: 'Build the sentence with "når" (Subordinate clause first ➔ Inversion in main clause):',
            targetTokens: ['Når vi vasker tøj,', 'sorterer', 'vi', 'farverne først.'],
            tokenTypes: ['forfelt', 'verbum', 'subjekt', 'objekt'],
            fullSentence: 'Når vi vasker tøj, sorterer vi farverne først.',
            ruleTip: 'Når en ledsætning står forrest som Forfelt (Felt 1), kommer verbet på 2. plads: "sorterer" (V) + "vi" (S).'
        },
        {
            prompt: 'Byg sangens klassiske verslinje med "Så" (Forfelt ➔ Verbum ➔ Subjekt):',
            promptEn: 'Build the song’s classic line with "Så" (Front field ➔ Verb ➔ Subject):',
            targetTokens: ['Så', 'gør', 'vi', 'sådan.'],
            tokenTypes: ['forfelt', 'verbum', 'subjekt', 'adverbial'],
            fullSentence: 'Så gør vi sådan.',
            ruleTip: 'Ordet "Så" tager Forfeltet (Felt 1), så verbet "gør" står på 2. plads.'
        },
        {
            prompt: 'Byg tidsudtrykket med mandag (Tidsangivelse forrest ➔ Inversion):',
            promptEn: 'Build the time expression (Time in front field ➔ Inversion):',
            targetTokens: ['Tidlig en mandag morgen', 'starter', 'mor', 'vaskemaskinen.'],
            tokenTypes: ['forfelt', 'verbum', 'subjekt', 'objekt'],
            fullSentence: 'Tidlig en mandag morgen starter mor vaskemaskinen.',
            ruleTip: 'Tidsudtrykket "Tidlig en mandag morgen" udgør ét samlet Forfelt. Derefter kommer verbet "starter".'
        },
        {
            prompt: 'Byg sætningen om strygning med dampjern:',
            promptEn: 'Build the sentence about ironing with a steam iron:',
            targetTokens: ['Når skjorten er krøllet,', 'bruger', 'vi', 'et dampstrygejern.'],
            tokenTypes: ['forfelt', 'verbum', 'subjekt', 'objekt'],
            fullSentence: 'Når skjorten er krøllet, bruger vi et dampstrygejern.',
            ruleTip: 'Ledsætning ("Når skjorten er krøllet,") + Verbum ("bruger") + Subjekt ("vi") + Objekt ("et dampstrygejern").'
        },
        {
            prompt: 'Byg sætningen om søndagens hygge og velfortjente hvile:',
            promptEn: 'Build the sentence about Sunday relaxation in a clean home:',
            targetTokens: ['Om søndagen', 'slapper', 'familien', 'af i det rene hjem.'],
            tokenTypes: ['forfelt', 'verbum', 'subjekt', 'adverbial'],
            fullSentence: 'Om søndagen slapper familien af i det rene hjem.',
            ruleTip: 'Felt 1: "Om søndagen" | Felt 2: "slapper" | Felt 3: "familien".'
        }
    ];

    let puzIdx = 0;

    function renderBuilderPuzzle() {
        builderCard.innerHTML = '';
        const puzzle = builderPuzzles[puzIdx];

        // Grammar Legend
        const legend = document.createElement('div');
        legend.className = 'builder-grammar-legend';
        legend.innerHTML = `
            <span style="color: #94a3b8; margin-right: 0.4rem;">${isEn ? 'Grammar code:' : 'Grammatisk farvekode:'}</span>
            <span class="legend-chip chip-forfelt">${isEn ? 'Purple: Front Field / Clause' : 'Lilla: Forfelt / Ledsætning'}</span>
            <span class="legend-chip chip-verbum">${isEn ? 'Red: Verb (Pos. 2)' : 'Rød: Verbum (Plads 2)'}</span>
            <span class="legend-chip chip-subjekt">${isEn ? 'Green: Subject' : 'Grøn: Subjekt'}</span>
            <span class="legend-chip chip-objekt">${isEn ? 'Blue: Object' : 'Blå: Objekt'}</span>
            <span class="legend-chip chip-adverbial">${isEn ? 'Orange: Adverbial' : 'Orange: Adverbial'}</span>
        `;
        builderCard.appendChild(legend);

        // Header
        const header = document.createElement('div');
        header.className = 'builder-task-header';
        header.innerHTML = `
            <span class="builder-prompt-text">${isEn ? puzzle.promptEn : puzzle.prompt}</span>
            <span style="color: #fbbf24; font-weight: 800; font-size: 0.9rem;">${isEn ? 'Exercise' : 'Øvelse'} ${puzIdx + 1} / ${builderPuzzles.length}</span>
        `;
        builderCard.appendChild(header);

        // Drop zone (placed tiles)
        const dropZone = document.createElement('div');
        dropZone.className = 'builder-drop-zone';

        // Pool of available tiles
        const tilesPool = document.createElement('div');
        tilesPool.className = 'builder-tiles-pool';

        let placedTokens = [];

        // Shuffle tokens for pool
        const shuffledTokens = puzzle.targetTokens.map((token, i) => ({
            text: token,
            type: puzzle.tokenTypes[i],
            origIndex: i
        })).sort(() => Math.random() - 0.5);

        function updateDropZoneUI() {
            dropZone.innerHTML = '';
            if (placedTokens.length === 0) {
                dropZone.innerHTML = `<span style="color: #64748b; font-style: italic;">${isEn ? 'Click tiles below to build the sentence...' : 'Klik på brikkerne nedenfor for at placere dem her...'}</span>`;
                dropZone.classList.remove('filled');
            } else {
                dropZone.classList.add('filled');
                placedTokens.forEach((item, idx) => {
                    const tile = document.createElement('div');
                    tile.className = `builder-word-tile tile-${item.type}`;
                    tile.innerHTML = `<span>${item.text}</span> <span style="font-size: 0.75rem; opacity: 0.7;">✕</span>`;
                    tile.onclick = () => {
                        // Return tile to pool
                        placedTokens.splice(idx, 1);
                        tilesPool.appendChild(item.element);
                        item.element.style.display = 'inline-flex';
                        updateDropZoneUI();
                        feedbackDiv.style.display = 'none';
                    };
                    dropZone.appendChild(tile);
                });
            }
        }

        shuffledTokens.forEach(item => {
            const tileBtn = document.createElement('div');
            tileBtn.className = `builder-word-tile tile-${item.type}`;
            tileBtn.textContent = item.text;
            item.element = tileBtn;

            tileBtn.onclick = () => {
                placedTokens.push(item);
                tileBtn.style.display = 'none';
                updateDropZoneUI();
                feedbackDiv.style.display = 'none';
            };
            tilesPool.appendChild(tileBtn);
        });

        builderCard.appendChild(dropZone);
        builderCard.appendChild(tilesPool);

        // Feedback box
        const feedbackDiv = document.createElement('div');
        feedbackDiv.style.display = 'none';
        feedbackDiv.style.marginBottom = '1.2rem';
        feedbackDiv.style.padding = '1.1rem';
        feedbackDiv.style.borderRadius = '14px';
        feedbackDiv.style.background = '#0f172a';
        builderCard.appendChild(feedbackDiv);

        // Controls
        const controlsRow = document.createElement('div');
        controlsRow.className = 'builder-controls-row';

        const resetBtn = document.createElement('button');
        resetBtn.className = 'builder-btn builder-btn-reset';
        resetBtn.innerHTML = `<span>🔄</span> ${isEn ? 'Reset' : 'Nulstil'}`;
        resetBtn.onclick = () => {
            renderBuilderPuzzle();
        };
        controlsRow.appendChild(resetBtn);

        const checkBtn = document.createElement('button');
        checkBtn.className = 'builder-btn builder-btn-check';
        checkBtn.innerHTML = `<span>✓</span> ${isEn ? 'Check Sentence' : 'Tjek sætning'}`;
        checkBtn.onclick = () => {
            const currentSentence = placedTokens.map(t => t.text).join(' ');
            const targetSentence = puzzle.targetTokens.join(' ');

            if (currentSentence === targetSentence) {
                dropZone.classList.add('success');
                feedbackDiv.style.display = 'block';
                feedbackDiv.style.border = '1.5px solid #22c55e';
                feedbackDiv.innerHTML = `
                    <div style="color: #4ade80; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                        🎉 ${isEn ? 'Perfect Danish word order!' : 'Helt perfekt dansk ordstilling!'}
                    </div>
                    <div style="color: #f8fafc; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
                        "${puzzle.fullSentence}"
                    </div>
                    <div style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.5; margin-bottom: 1rem;">
                        💡 <strong>${isEn ? 'Grammar note:' : 'Grammatik-regel:'}</strong> ${puzzle.ruleTip}
                    </div>
                `;

                speakDanish(puzzle.fullSentence);

                const nextBtn = document.createElement('button');
                nextBtn.className = 'builder-btn builder-btn-next';
                nextBtn.innerHTML = puzIdx + 1 < builderPuzzles.length 
                    ? `<span>${isEn ? 'Next Sentence' : 'Næste sætning'}</span> →` 
                    : `<span>🏆 ${isEn ? 'All Built!' : 'Alle sætninger gennemført!'}</span>`;
                nextBtn.onclick = () => {
                    if (puzIdx + 1 < builderPuzzles.length) {
                        puzIdx++;
                        renderBuilderPuzzle();
                    } else {
                        renderBuilderFinish();
                    }
                };
                feedbackDiv.appendChild(nextBtn);
            } else {
                feedbackDiv.style.display = 'block';
                feedbackDiv.style.border = '1.5px solid #ef4444';
                feedbackDiv.innerHTML = `
                    <div style="color: #f87171; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.4rem;">
                        ❌ ${isEn ? 'Not quite right yet.' : 'Ikke helt rigtigt endnu.'}
                    </div>
                    <div style="color: #cbd5e1; font-size: 0.95rem;">
                        ${isEn ? 'Tip: Remember that the finite verb must occupy Position 2!' : 'Husk V2-reglen: Det bøjede verbum skal altid stå på 2. plads i hovedsætningen!'}
                    </div>
                `;
            }
        };
        controlsRow.appendChild(checkBtn);

        builderCard.appendChild(controlsRow);
        updateDropZoneUI();
    }

    function renderBuilderFinish() {
        builderCard.innerHTML = `
            <div style="text-align: center; padding: 2rem 1rem;">
                <div style="font-size: 3.5rem; margin-bottom: 0.8rem;">🌟🧱🇩🇰</div>
                <h2 style="font-size: 1.8rem; color: #fbbf24; margin-bottom: 0.6rem;">
                    ${isEn ? 'Sentence Master!' : 'Fantastisk! Du mestrer ledsætninger og V2-ordstilling!'}
                </h2>
                <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6; font-size: 1.1rem;">
                    ${isEn 
                        ? 'You have successfully practiced Danish word order with "når", "så", and time expressions in the front field.' 
                        : 'Du har mestret inversion efter forfelt og ledsætninger med "når", så dine sætninger flyder naturligt og grammatisk korrekt.'}
                </p>
                <button class="builder-btn builder-btn-check" id="btn-restart-builder" style="margin: 0 auto;">
                    🔄 ${isEn ? 'Try Again' : 'Byg igen'}
                </button>
            </div>
        `;
        builderCard.querySelector('#btn-restart-builder').onclick = () => {
            puzIdx = 0;
            renderBuilderPuzzle();
        };
    }

    renderBuilderPuzzle();
    panelSaetning.appendChild(builderCard);
    panelsHolder.appendChild(panelSaetning);

    // =========================================================================
    // TAB 5: ⏳ DENGANG & NU (Værdighed & Udvikling)
    // =========================================================================
    const panelUdvikling = document.createElement('div');
    panelUdvikling.className = `song-panel ${currentTab === 'tab_udvikling' ? 'active' : ''}`;
    panelUdvikling.dataset.panel = 'tab_udvikling';

    const historyCard = document.createElement('div');
    historyCard.className = 'history-card';

    // Tribute Box
    const tributeBox = document.createElement('div');
    tributeBox.className = 'tribute-box';
    tributeBox.innerHTML = `
        <span class="tribute-badge">👑 ${isEn ? 'Tribute to Domestic Care' : 'Hyldest til omsorgsarbejdet i hjemmet'}</span>
        <div class="tribute-text">
            ${isEn 
                ? '“Household care is the silent work that makes all other work possible. When clothes are clean, floors are washed, and the home is peaceful, it provides safety, health, and dignity for everyone. Domestic work deserves the utmost respect and recognition.”' 
                : '“Husarbejde er det usynlige fundament, der gør alt andet arbejde i samfundet muligt. Når tøjet er rent, gulvet er vasket og hjemmet emmer af ro, skaber det sundhed, tryghed og livsglæde for hele familien. Husarbejde er et værdigt og værdifuldt arbejde, der fortjener den dybeste anerkendelse.”'}
        </div>
    `;
    historyCard.appendChild(tributeBox);

    // Modern language shift note
    const languageNote = document.createElement('div');
    languageNote.style.background = '#0f172a';
    languageNote.style.border = '1px solid rgba(56, 189, 248, 0.4)';
    languageNote.style.borderRadius = '16px';
    languageNote.style.padding = '1.2rem 1.6rem';
    languageNote.style.marginBottom = '2rem';
    languageNote.innerHTML = `
        <div style="color: #38bdf8; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.4rem;">
            🗣️ ${isEn ? 'Language Evolution: From "vort" to "vores"' : 'Sprog i forandring: Fra "vort tøj" til "vores tøj"'}
        </div>
        <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5; margin: 0;">
            ${isEn 
                ? 'In the old song, they sang "vort tøj" (our clothes) and "vor fri" (our day off). Today, modern Danish uses the common possessive pronoun <strong>vores</strong>: "vores tøj", "vores hjem", "vores børn". The old form "vort" is now only used in formal poetry or church hymns.' 
                : 'I den historiske sang synger man "vort tøj" og "vor fri". På moderne dansk bruger vi i dag næsten altid det uformelle possessive pronomen <strong>vores</strong> ("vores tøj", "vores hjem", "vores familie"). Det er godt at kende den gamle form "vort" fra litteratur og sange, men i hverdagen siger du trygt <em>vores</em>!'}
        </p>
    `;
    historyCard.appendChild(languageNote);

    // Comparison Grid
    const comparisonGrid = document.createElement('div');
    comparisonGrid.className = 'comparison-grid';

    const compData = [
        {
            title: isEn ? '1. Laundry: From River to A+++' : '1. Tøjvask: Fra gruekedel til A+++',
            icon: '🧺',
            then: isEn 
                ? '1800s: Heavy wooden washboards, caustic soda, freezing river water, and boiling gruekedler. Took 2–3 full days of backbreaking labor every month.' 
                : 'Dengang: Tunge vaskebrætter, lud, iskoldt åvand og tunge gruekedler over åben ild. Det tog 2-3 dages hårdt slid hver måned for kvinderne.',
            now: isEn 
                ? 'Today: Modern energy-efficient front-loader with specialized cycles. Clothes come out fresh at the press of a button.' 
                : 'I dag: Moderne vaskemaskine med skåneprogram og timer. Maskinen klarer det tunge arbejde, mens vi kan bruge tiden på familie og uddannelse.'
        },
        {
            title: isEn ? '2. Ironing: From Coals to Steam' : '2. Strygning: Fra glødende kul til damp',
            icon: '👔',
            then: isEn 
                ? '1800s: Heavy cast-iron irons filled with glowing hot embers from the stove. Sparks, smoke, and constant soot hazards.' 
                : 'Dengang: Tunge jern fyldt med glødende kul eller opvarmet på komfuret. Risiko for sod, brand og røg.',
            now: isEn 
                ? 'Today: Lightweight ergonomic steam irons and presses that smooth collars and fabrics gently in minutes.' 
                : 'I dag: Letvægts dampstrygejern med teflonsål og fin damp, der glatter skjorter og kjoler ergonomisk på få minutter.'
        },
        {
            title: isEn ? '3. Floor Care: From Knees to Mop' : '3. Gulve: Fra knæslid til ergonomisk moppe',
            icon: '✨',
            then: isEn 
                ? '1800s: Scrubbing unpainted floorboards on hands and knees with abrasive sand and stiff horsehair brushes.' 
                : 'Dengang: Skuring af rå trægulve på knæ med sand og stive børster, hvilket ødelagde knæ og ryg.',
            now: isEn 
                ? 'Today: Ergonomic flat microfibre mops and eco-friendly soap solutions that clean quickly while standing tall.' 
                : 'I dag: Ergonomisk fladmoppe med mikrofiberklud og mild universalrengøring, der skåner ryg og led.'
        }
    ];

    compData.forEach(c => {
        const item = document.createElement('div');
        item.className = 'comparison-item';
        item.innerHTML = `
            <div class="comp-header"><span>${c.icon}</span> ${c.title}</div>
            <div class="comp-era then"><strong>${isEn ? 'Then:' : 'Dengang:'}</strong> ${c.then}</div>
            <div class="comp-era now"><strong>${isEn ? 'Now:' : 'I dag:'}</strong> ${c.now}</div>
        `;
        comparisonGrid.appendChild(item);
    });

    historyCard.appendChild(comparisonGrid);

    // Classroom Discussion Cards
    const discTitle = document.createElement('h3');
    discTitle.style.fontSize = '1.3rem';
    discTitle.style.color = '#fbbf24';
    discTitle.style.marginBottom = '1rem';
    discTitle.textContent = isEn ? '💬 Conversation Starters for Pair Work' : '💬 Samtalekort til makkerpar og klasse';
    historyCard.appendChild(discTitle);

    const discGrid = document.createElement('div');
    discGrid.className = 'discussion-cards-grid';

    const discCards = [
        {
            icon: '🤝',
            q: isEn ? 'Who does what chores at your home? Do you share the tasks?' : 'Hvem laver husarbejdet hjemme hos dig? Deler I opgaverne?',
            helpers: isEn ? 'Keywords: at deles om opgaverne, at lave mad, at vaske op, at gøre rent' : 'Hjælpeord: at deles om det, at lave mad, at vaske op, at støvsuge'
        },
        {
            icon: '🌸',
            q: isEn ? 'Which household task gives you the greatest satisfaction when completed?' : 'Hvilket husarbejde giver dig den bedste følelse, når du er færdig?',
            helpers: isEn ? 'Keywords: duften af rent tøj, nystrøgede skjorter, skinnende gulve' : 'Hjælpeord: duften af rent tøj, nystrøgede skjorter, et rent og pænt hjem'
        },
        {
            icon: '👵',
            q: isEn ? 'How did your grandparents wash and dry clothes when they were young?' : 'Hvordan vaskede dine forældre eller bedsteforældre tøj, da de var unge?',
            helpers: isEn ? 'Keywords: i hånden, i en balje, i en gammel maskine, i solskin' : 'Hjælpeord: i hånden, i en balje, i en gammeldags maskine, tørresnor i haven'
        },
        {
            icon: '🏡',
            q: isEn ? 'What does the Danish expression "hjem kære hjem" (home sweet home) mean to you?' : 'Hvad betyder udtrykket "hjem kære hjem" for dig?',
            helpers: isEn ? 'Keywords: tryghed, varme, ro, familie, omsorg' : 'Hjælpeord: tryghed, varme, ro, familie, fællesskab, omsorg'
        }
    ];

    discCards.forEach(d => {
        const dCard = document.createElement('div');
        dCard.className = 'discussion-card';
        dCard.innerHTML = `
            <div class="disc-icon">${d.icon}</div>
            <div class="disc-question">${d.q}</div>
            <div class="disc-helpers">${d.helpers}</div>
        `;
        discGrid.appendChild(dCard);
    });

    historyCard.appendChild(discGrid);
    panelUdvikling.appendChild(historyCard);
    panelsHolder.appendChild(panelUdvikling);

    // Initial subPath routing check
    if (extraData && extraData.subPath) {
        switchTab(extraData.subPath);
    }

    container.appendChild(viewContainer);
}
