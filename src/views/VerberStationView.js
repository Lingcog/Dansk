import { getTranslation, getLang } from '../utils/i18n.js';
import { verberWordTranslations } from '../utils/top100_verber_translations.js';
import { formatNounLinks, attachNounLinkListeners } from '../utils/nounQuickPeekModal.js';

/**
 * VerberStationView - Didaktisk vrimlebillede for Scene 1: Banegården / Rejsen
 * Dækker 33 højfrekvente verber med infinitiv, nutid og datid.
 * 7 interaktive opgaveflader for maksimal pædagogisk progression.
 */
export function renderVerberStationView(container, navigateFn, extraData = {}) {
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

        /* =========================================
           6. SÆTNINGSBYGGER (UDFORSK & OPGAVER)
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

        /* Sub-navigation for Tab 6 */
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
            border-color: #ef4444;
            background: rgba(239, 68, 68, 0.1);
        }
        .sb-sub-btn.active {
            background: linear-gradient(135deg, #dc2626, #ef4444);
            color: white;
            border-color: #f87171;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
        }

        /* Grammar Legend */
        .grammar-legend-bar {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            flex-wrap: wrap;
            margin-bottom: 1.8rem;
            background: rgba(15, 23, 42, 0.5);
            padding: 0.75rem 1.2rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .grammar-legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.88rem;
            color: #cbd5e1;
        }
        .legend-chip {
            width: 12px;
            height: 12px;
            border-radius: 3px;
            display: inline-block;
        }
        .chip-substantiv { background: #22c55e; }
        .chip-verbum { background: #ef4444; }
        .chip-sted { background: #38bdf8; }

        /* Sub-tab 1: Free Builder Category Rows */
        .sb-category-row {
            background: rgba(15, 23, 42, 0.5);
            border-radius: 14px;
            padding: 1.25rem 1.5rem;
            margin-bottom: 1.25rem;
            border-left: 4px solid transparent;
            transition: all 0.2s ease;
        }
        .sb-cat-subjekt { border-left-color: #22c55e; }
        .sb-cat-verbum { border-left-color: #ef4444; }
        .sb-cat-objekt { border-left-color: #22c55e; }
        .sb-cat-sted { border-left-color: #38bdf8; }

        .sb-category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.9rem;
        }
        .sb-category-title {
            font-size: 1rem;
            font-weight: 700;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-category-badge {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.25rem 0.6rem;
            border-radius: 6px;
            letter-spacing: 0.5px;
        }
        .badge-cat-subjekt { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
        .badge-cat-verbum { background: rgba(239, 68, 68, 0.2); color: #f87171; }
        .badge-cat-objekt { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
        .badge-cat-sted { background: rgba(56, 189, 248, 0.2); color: #7dd3fc; }

        .sb-chips-grid {
            display: flex;
            gap: 0.6rem;
            flex-wrap: wrap;
        }
        .sb-chip-btn {
            background: rgba(30, 41, 59, 0.8);
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.55rem 1rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sb-chip-btn:hover {
            border-color: rgba(255, 255, 255, 0.3);
            color: white;
            transform: translateY(-1px);
        }
        .sb-chip-btn.selected {
            background: white;
            color: #0f172a;
            font-weight: 800;
            border-color: white;
            box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
            transform: scale(1.03);
        }

        /* Live output box */
        .sb-live-box {
            background: #0f172a;
            border: 2px solid rgba(239, 68, 68, 0.4);
            border-radius: 16px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            text-align: center;
        }
        .sb-live-label {
            font-size: 0.8rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.6rem;
        }
        .sb-live-sentence {
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        .grammar-word {
            display: inline-block;
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
            margin: 0 0.15rem;
        }
        .word-substantiv { background: rgba(34, 197, 94, 0.25); color: #86efac; }
        .word-verbum { background: rgba(239, 68, 68, 0.25); color: #fca5a5; font-weight: 800; }
        .word-sted { background: rgba(56, 189, 248, 0.25); color: #7dd3fc; }

        .sb-listen-btn {
            background: linear-gradient(135deg, #0284c7, #0ea5e9);
            color: white;
            border: none;
            padding: 0.65rem 1.4rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-listen-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(14, 165, 233, 0.35);
        }

        /* Sub-tab 2: Challenge & Puzzle */
        .sb-task-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .sb-task-pills {
            display: flex;
            gap: 0.4rem;
            flex-wrap: wrap;
        }
        .sb-task-pill {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(15, 23, 42, 0.6);
            color: #94a3b8;
            font-weight: 700;
            font-size: 0.85rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sb-task-pill.active {
            background: #ef4444;
            color: white;
            border-color: #f87171;
        }
        .sb-task-pill.done {
            background: #22c55e;
            color: white;
            border-color: #4ade80;
        }

        .sb-context-card {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 1.25rem 1.5rem;
            margin-bottom: 1.5rem;
        }
        .sb-context-title {
            font-size: 1.05rem;
            color: #e2e8f0;
            margin-bottom: 0.75rem;
            line-height: 1.5;
        }
        .sb-context-elements {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
        }
        .sb-context-chip {
            padding: 0.4rem 0.85rem;
            border-radius: 8px;
            font-size: 0.88rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .sb-context-chip.subjekt { background: rgba(34, 197, 94, 0.2); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.4); }
        .sb-context-chip.objekt { background: rgba(34, 197, 94, 0.2); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.4); }
        .sb-context-chip.sted { background: rgba(56, 189, 248, 0.2); color: #7dd3fc; border: 1px solid rgba(56, 189, 248, 0.4); }
        .sb-chip-role {
            font-size: 0.7rem;
            text-transform: uppercase;
            opacity: 0.75;
            font-weight: 800;
        }

        .sb-question-box {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 14px;
            padding: 1.25rem;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .sb-question-text {
            font-size: 1.25rem;
            font-weight: 700;
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
            border: 2px solid #334155;
            border-radius: 12px;
            padding: 1rem 1.2rem;
            font-size: 1.15rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .sb-option-btn:hover {
            border-color: #ef4444;
            transform: translateY(-2px);
        }
        .sb-option-btn.correct {
            background: rgba(34, 197, 94, 0.25);
            border-color: #22c55e;
            color: #4ade80;
        }
        .sb-option-btn.incorrect {
            background: rgba(239, 68, 68, 0.25);
            border-color: #ef4444;
            color: #fca5a5;
            animation: shake 0.4s ease;
        }

        /* Puzzle Step */
        .sb-puzzle-section {
            background: rgba(15, 23, 42, 0.7);
            border: 2px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            padding: 1.5rem;
            margin-top: 1.5rem;
        }
        .sb-puzzle-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-puzzle-desc {
            font-size: 0.95rem;
            color: #94a3b8;
            margin-bottom: 1.2rem;
        }

        .sb-puzzle-slots {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.8rem;
            margin-bottom: 1.2rem;
        }
        @media (max-width: 768px) {
            .sb-puzzle-slots {
                grid-template-columns: 1fr;
            }
        }
        .sb-puzzle-slot {
            background: rgba(30, 41, 59, 0.7);
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            min-height: 70px;
            padding: 0.75rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: all 0.2s ease;
            position: relative;
        }
        .sb-puzzle-slot.slot-0 { border-color: rgba(34, 197, 94, 0.4); }
        .sb-puzzle-slot.slot-1 { border-color: rgba(239, 68, 68, 0.5); }
        .sb-puzzle-slot.slot-2 { border-color: rgba(34, 197, 94, 0.4); }
        .sb-puzzle-slot.slot-3 { border-color: rgba(56, 189, 248, 0.4); }

        .sb-puzzle-slot.filled {
            border-style: solid;
            background: rgba(15, 23, 42, 0.9);
            cursor: pointer;
        }
        .sb-puzzle-slot.filled.slot-0 { border-color: #22c55e; color: #86efac; }
        .sb-puzzle-slot.filled.slot-1 { border-color: #ef4444; color: #fca5a5; font-weight: 800; }
        .sb-puzzle-slot.filled.slot-2 { border-color: #22c55e; color: #86efac; }
        .sb-puzzle-slot.filled.slot-3 { border-color: #38bdf8; color: #7dd3fc; }

        .slot-hint {
            font-size: 0.75rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.2rem;
        }
        .slot-role {
            font-size: 0.7rem;
            color: #64748b;
        }
        .slot-remove {
            position: absolute;
            top: 4px;
            right: 6px;
            font-size: 0.8rem;
            color: #94a3b8;
            opacity: 0.7;
        }

        .sb-puzzle-bank {
            display: flex;
            gap: 0.7rem;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 1.5rem;
            min-height: 45px;
        }
        .sb-puzzle-chip {
            background: #1e293b;
            color: white;
            border: 2px solid #475569;
            border-radius: 10px;
            padding: 0.65rem 1.2rem;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sb-puzzle-chip:hover {
            border-color: #ef4444;
            transform: translateY(-2px);
        }
        .sb-puzzle-chip.placed {
            opacity: 0.25;
            pointer-events: none;
            cursor: default;
        }

        .sb-feedback-box {
            text-align: center;
            margin-top: 1rem;
        }
        .sb-feedback-msg {
            font-size: 1.2rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
        }
        .sb-feedback-msg.success { color: #4ade80; }
        .sb-feedback-msg.error { color: #f87171; }
        .sb-action-row {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-top: 0.8rem;
        }
        .sb-action-btn {
            background: linear-gradient(135deg, #dc2626, #ef4444);
            color: white;
            border: none;
            padding: 0.75rem 1.6rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sb-action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
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
        { id: 'tab_vrimmel', label: getTranslation('verber_tab_1'), icon: '🔍' },
        { id: 'tab_detektiv', label: getTranslation('verber_tab_2'), icon: '🕵️' },
        { id: 'tab_handlinger', label: getTranslation('verber_tab_3'), icon: '🎯' },
        { id: 'tab_historie', label: getTranslation('verber_tab_4'), icon: '💭' },
        { id: 'tab_synonym_antonym', label: getTranslation('verber_tab_5'), icon: '🔄' },
        { id: 'tab_saetning', label: getTranslation('verber_tab_6'), icon: '✍️' },
        { id: 'tab_tid_boejning', label: getTranslation('verber_tab_7'), icon: '⏱️' }
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
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/verber_station/' + tabId);
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
    pureBtn.innerHTML = `<span>🖼️</span> ${getTranslation('verber_pure_label')} <strong id="pure-mode-status-station">${getTranslation('verber_status_off')}</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-station').textContent = pureModeActive ? `${getTranslation('verber_status_on')} 🖼️` : getTranslation('verber_status_off');
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
            const lang = getLang();
            const wordTrans = verberWordTranslations[item.word]?.[lang] || (lang !== 'da' ? verberWordTranslations[item.word]?.['en'] : null);
            const transMeaning = wordTrans?.meaning;
            const transSentence = wordTrans?.sentence;

            detailCard.style.display = 'flex';
            detailCard.innerHTML = `
                <div>
                    <span class="badge-verbum">${getTranslation('verber_badge_verbum')}</span>
                    <div class="detail-main-word">
                        ${item.word}
                        ${transMeaning ? `<span style="font-size: 1.1rem; color: #94a3b8; font-weight: 500; margin-left: 0.5rem;">(${transMeaning})</span>` : ''}
                    </div>
                    <div class="detail-forms">${getTranslation('verber_form_nutid')} <strong>${item.nutid}</strong> &nbsp;|&nbsp; ${getTranslation('verber_form_datid')} <strong>${item.datid}</strong></div>
                    <div class="detail-sentence">"${formatNounLinks(item.sentence)}"</div>
                    ${transSentence ? `<div style="font-size: 0.95rem; color: #94a3b8; font-style: italic; margin-top: 0.2rem;">"${transSentence}"</div>` : ''}
                </div>
                <div>
                    <button class="listen-word-btn" id="listen-station-verb-btn">
                        <span>🔊</span> ${getTranslation('verber_listen_word')}
                    </button>
                </div>
            `;
            attachNounLinkListeners(detailCard, navigateFn, 'tab_vrimmel');

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
            title: "Mission 1 af 8",
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
            title: "Mission 2 af 8",
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
            title: "Mission 3 af 8",
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
            title: "Mission 4 af 8",
            cropX: 55,
            cropY: 50,
            question: "Kig på passagererne med billetterne på perronen. Hvad skal de?",
            options: [
                { text: "Skal rejse med toget mod Jylland 🚆", correct: true },
                { text: "Flytter møbler til en ny lejlighed 📦", correct: false },
                { text: "Svømmer i svømmehallen 🏊", correct: false }
            ]
        },
        {
            title: "Mission 5 af 8",
            cropX: 50,
            cropY: 15,
            question: "Kig på det store røde lyntog ved perronen. Hvad gør toget?",
            options: [
                { text: "Begynder sin rejse til tiden mod vest 🚆", correct: true },
                { text: "Sover i en hængekøje 🛌", correct: false },
                { text: "Vasker op med sæbe 🧼", correct: false }
            ]
        },
        {
            title: "Mission 6 af 8",
            cropX: 16,
            cropY: 58,
            question: "Kig på pendlere der tjekker den store afgangsskærm. Hvad gør de?",
            options: [
                { text: "Vælger den hurtigste rute og afgang 🕒", correct: true },
                { text: "Danser på skinnerne 💃", correct: false },
                { text: "Spiser en hel fødselsdagskage 🎂", correct: false }
            ]
        },
        {
            title: "Mission 7 af 8",
            cropX: 8,
            cropY: 68,
            question: "Kig på ekspedienten bag disken i stationskiosken. Hvad gør han?",
            options: [
                { text: "Sælger kaffe og aviser til de rejsende ☕", correct: true },
                { text: "Kaster med varerne 📦", correct: false },
                { text: "Løber væk fra forretningen 🏃", correct: false }
            ]
        },
        {
            title: "Mission 8 af 8",
            cropX: 25,
            cropY: 50,
            question: "Kig på kontrolløren der tjekker passagerernes billetter. Hvad undersøger han?",
            options: [
                { text: "Undersøger om billetten gælder til denne zone 🎫", correct: true },
                { text: "Kører på en hvid hest 🐎", correct: false },
                { text: "Svømmer over togsporene 🏊", correct: false }
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
        clueBox.innerHTML = formatNounLinks(mission.question);
        attachNounLinkListeners(clueBox);
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
                            ${getTranslation('verber_correct')}
                        </div>
                        <button class="mission-next-btn" id="next-visual-station-btn">
                            ${currStationVisualIdx < stationVisualMissions.length - 1 ? getTranslation('verber_next_mission') : getTranslation('verber_restart')}
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
                            ${getTranslation('verber_wrong')}
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
            title: "Opgave 1 af 10: I kiosken på banegården",
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
            title: "Opgave 2 af 10: Billetautomaten og regler",
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
            title: "Opgave 3 af 10: Rejsen og afgangen",
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
        },
        {
            title: "Opgave 4 af 10: Penge, varer og betaling",
            prompt: "Find 3 handlinger, der handler om handel og køb på stationen:",
            targetCount: 3,
            options: [
                { text: "at betale med kort 💳", correct: true },
                { text: "at sove 🛌", correct: false },
                { text: "at købe en sandwich 🛍️", correct: true },
                { text: "at sælge billetter 🏷️", correct: true },
                { text: "at cykle på taget 🚲", correct: false },
                { text: "at synge højt 🎵", correct: false }
            ]
        },
        {
            title: "Opgave 5 af 10: Tidens start og afslutning",
            prompt: "Find 3 handlinger, der markerer begyndelse eller ende på en tur:",
            targetCount: 3,
            options: [
                { text: "at starte rejsen ⏱️", correct: true },
                { text: "at spise kage 🍽️", correct: false },
                { text: "at begynde til tiden 🏁", correct: true },
                { text: "at slutte rejsen 🛑", correct: true },
                { text: "at male et billede 🎨", correct: false },
                { text: "at hoppe i trampolin 🦘", correct: false }
            ]
        },
        {
            title: "Opgave 6 af 10: Teknik og funktion på stationen",
            prompt: "Find 3 handlinger eller tilstande om automater og billetter:",
            targetCount: 3,
            options: [
                { text: "at virke perfekt ⚙️", correct: true },
                { text: "at gælde hele dagen 🎫", correct: true },
                { text: "at danse 💃", correct: false },
                { text: "at mangle papir 🔋", correct: true },
                { text: "at svømme 🏊", correct: false },
                { text: "at bage brød 🥐", correct: false }
            ]
        },
        {
            title: "Opgave 7 af 10: Valg og beslutninger på rejsen",
            prompt: "Find 3 handlinger, man gør når man planlægger sin rute:",
            targetCount: 3,
            options: [
                { text: "at vælge afgang 🗺️", correct: true },
                { text: "at sove på bænken 😴", correct: false },
                { text: "at bestemme rejsetidspunkt 🤔", correct: true },
                { text: "at kalde på hjælp 📢", correct: true },
                { text: "at koge kartofler 🍲", correct: false },
                { text: "at stege kød 🥩", correct: false }
            ]
        },
        {
            title: "Opgave 8 af 10: Bagage og kufferter på perronen",
            prompt: "Find 3 handlinger med kufferter og tasker på stationen:",
            targetCount: 3,
            options: [
                { text: "at trække rullekufferten 🧳", correct: true },
                { text: "at svømme 🌊", correct: false },
                { text: "at bære den tunge taske 🎒", correct: true },
                { text: "at synge opera 🎤", correct: false },
                { text: "at løfte kufferten ind 💼", correct: true },
                { text: "at male bænken 🎨", correct: false }
            ]
        },
        {
            title: "Opgave 9 af 10: Ankomst og modtagelse",
            prompt: "Find 3 handlinger, når man når frem til destinationen:",
            targetCount: 3,
            options: [
                { text: "at få hjælp til bagagen 🤝", correct: true },
                { text: "at blive mødt af venner 🧑‍🤝‍🧑", correct: true },
                { text: "at sove på gaden 🛏️", correct: false },
                { text: "at rejse videre med bus 🚅", correct: true },
                { text: "at stege bøffer 🍳", correct: false },
                { text: "at glemme sit navn ❓", correct: false }
            ]
        },
        {
            title: "Opgave 10 af 10: Offentlig transport i hverdagen",
            prompt: "Find 3 handlinger, som rejsende gør hver dag:",
            targetCount: 3,
            options: [
                { text: "at rejse med tog 🚆", correct: true },
                { text: "at vise sin gyldige billet 🎫", correct: true },
                { text: "at bage boller 🍞", correct: false },
                { text: "at stige på toget 🚪", correct: true },
                { text: "at klatre i master 🧗", correct: false },
                { text: "at danse vals 💃", correct: false }
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
        clueBox.innerHTML = formatNounLinks(task.prompt);
        attachNounLinkListeners(clueBox);
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
                                ${getTranslation('verber_correct')} Du fandt alle 3 handlinger!
                            </div>
                            <button class="mission-next-btn" id="next-context-station-btn">
                                ${currContextTaskIdx < stationContextTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
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
        },
        {
            title: "5. Det forsinkede lyntog",
            steps: [
                {
                    q: "1. Hvad kigger de mange pendlere op på i hallen?",
                    options: [
                        { text: "De kigger på den store digitale afgangsskærm 🕒", correct: true },
                        { text: "De kigger på en svævende luftballon 🎈", correct: false },
                        { text: "De kigger på loftslamperne 💡", correct: false }
                    ]
                },
                {
                    q: "2. Hvad meddeler stationshøjttaleren om toget mod Odense?",
                    options: [
                        { text: "Toget starter med 10 minutters forsinkelse 📢", correct: true },
                        { text: "Toget er forvandlet til en hest 🐴", correct: false },
                        { text: "Toget kører baglæns til Kina 🌏", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør passagererne, da toget endelig ruller ind?",
                    options: [
                        { text: "De stiger på og finder deres reserverede pladser 💺", correct: true },
                        { text: "De kaster deres kufferter i skraldespanden 🗑️", correct: false },
                        { text: "De lægger sig på perronen 😴", correct: false }
                    ]
                }
            ]
        },
        {
            title: "6. Den glemte pung ved automaten",
            steps: [
                {
                    q: "1. Hvad skal Lotte vælge på billetautomatens touchskærm?",
                    options: [
                        { text: "Hun skal vælge en returbillet til Århus 🎫", correct: true },
                        { text: "Hun skal vælge en pizza med ananas 🍕", correct: false },
                        { text: "Hun skal vælge en ny frakke 🧥", correct: false }
                    ]
                },
                {
                    q: "2. Hvad opdager hun med forskrækkelse, da hun vil betale?",
                    options: [
                        { text: "Hun opdager, at hun mangler sit betalingskort 💳", correct: true },
                        { text: "Hun opdager at hun har vinger 🦅", correct: false },
                        { text: "Hun opdager en levende fisk i lommen 🐟", correct: false }
                    ]
                },
                {
                    q: "3. Hvem hjælper hende og rækker pungen frem med et smil?",
                    options: [
                        { text: "En venlig mand bagved finder den på hylden og giver den til hende 🤝", correct: true },
                        { text: "En tryllekunstner med en kanin 🐇", correct: false },
                        { text: "En politibetjent på rulleskøjter 🛼", correct: false }
                    ]
                }
            ]
        },
        {
            title: "7. Kiosken på spor 2",
            steps: [
                {
                    q: "1. Hvad vil den rejsende købe i kiosken før afgang?",
                    options: [
                        { text: "Han vil købe en kop varm kaffe og en flaske kildevand ☕", correct: true },
                        { text: "Han vil købe en flyvemaskine ✈️", correct: false },
                        { text: "Han vil købe et klaver 🎹", correct: false }
                    ]
                },
                {
                    q: "2. Hvordan betaler han for varerne ved kassen?",
                    options: [
                        { text: "Han betaler hurtigt og kontaktløst med sin mobiltelefon 📱", correct: true },
                        { text: "Han betaler med muslingeskaller 🐚", correct: false },
                        { text: "Han synger en sang for kassedamen 🎤", correct: false }
                    ]
                },
                {
                    q: "3. Hvor trækker han sin kuffert hen bagefter?",
                    options: [
                        { text: "Han trækker kufferten hen foran togvognens dør 🧳", correct: true },
                        { text: "Han trækker den ud på motorvejen 🛣️", correct: false },
                        { text: "Han gemmer den i et dueslag 🕊️", correct: false }
                    ]
                }
            ]
        },
        {
            title: "8. Den store togrejse ud i Europa",
            steps: [
                {
                    q: "1. Hvor drømmer de to venner om at rejse hen til sommer?",
                    options: [
                        { text: "De vil rejse hele vejen gennem Europa med tog 🌍", correct: true },
                        { text: "De vil rejse til Nordpolen i en robåd 🚣", correct: false },
                        { text: "De vil grave en tunnel til Australien 🦘", correct: false }
                    ]
                },
                {
                    q: "2. Hvad bestemmer de sig for at købe i billetkontoret?",
                    options: [
                        { text: "De køber et Interrail-pas, der gælder i en måned 🎫", correct: true },
                        { text: "De køber en pose gulerødder 🥕", correct: false },
                        { text: "De køber en brugt cykelpumpe 🚲", correct: false }
                    ]
                },
                {
                    q: "3. Hvad oplever de, da nattoget ruller afsted?",
                    options: [
                        { text: "De oplever suset og glæden ved eventyr og nye kulturer 🌄", correct: true },
                        { text: "De mister alle deres tænder 🦷", correct: false },
                        { text: "De sover igennem hele rejsen i en kuffert 🧳", correct: false }
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
            qEl.innerHTML = formatNounLinks(step.q);
            attachNounLinkListeners(qEl);
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
                        stepFeedback.innerHTML = `<div style="color: #4ade80; font-weight: 700; margin-top: 0.6rem;">${getTranslation('verber_correct')}</div>`;
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
                        stepFeedback.innerHTML = `<div style="color: #f87171; font-weight: 700; margin-top: 0.6rem;">${getTranslation('verber_wrong')}</div>`;
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
                ${getTranslation('verber_story_complete')}
            </div>
            <button class="mission-next-btn" id="next-station-story-btn">
                ${currStationStoryIdx < stationStories.length - 1 ? getTranslation('verber_next_story') : getTranslation('verber_restart')}
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
            type: 'antonym',
            word: 'at starte',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at slutte 🛑', correct: true },
                { text: 'at begynde 🏁', correct: false },
                { text: 'at rejse 🚆', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at begynde',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at starte / indlede 🏁', correct: true },
                { text: 'at slutte 🛑', correct: false },
                { text: 'at sove 🛌', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at vælge',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at udvælge / foretrække 🎯', correct: true },
                { text: 'at miste ❌', correct: false },
                { text: 'at råbe 📢', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at mangle',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at have rigeligt af / besidde ✅', correct: true },
                { text: 'at lede efter 🔍', correct: false },
                { text: 'at tabe 💔', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at bestemme',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at beslutte / afgøre ⚖️', correct: true },
                { text: 'at tvivle ❓', correct: false },
                { text: 'at glemme ❌', correct: false }
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
                            ${getTranslation('verber_correct')}
                        </div>
                        <button class="mission-next-btn" id="next-station-synonym-btn">
                            ${currStationSynonymIdx < stationSynonymTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
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
                            ${getTranslation('verber_wrong')}
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
    // --- 6. TAB: SÆTNINGSBYGGER (UDFORSK & OPGAVER)
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'verber-panel';
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
                <h3 style="font-size: 1.7rem; color: white; margin-bottom: 0.4rem;">Byg dine egne sætninger på banegården og rejsen</h3>
                <p style="color: #94a3b8; font-size: 1.05rem; max-width: 650px; margin: 0 auto;">
                    Vælg et element fra hver række herunder. Prøv forskellige verber og lyt til hvordan sætningen lyder på dansk!
                </p>
            </div>

            <!-- Grammatisk farveforklaring -->
            <div class="grammar-legend-bar">
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> ${getTranslation('verber_sb_legend_subjekt')}</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-verbum"></span> ${getTranslation('verber_sb_legend_verbum')}</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> ${getTranslation('verber_sb_legend_objekt')}</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-sted"></span> ${getTranslation('verber_sb_legend_sted')}</div>
            </div>

            <div id="free-builder-rows-station-verb"></div>

            <!-- Live Output Sentence -->
            <div class="sb-live-box">
                <div class="sb-live-label">Din samlede sætning</div>
                <div class="sb-live-sentence" id="free-live-sentence-station-verb"></div>
                <button class="sb-listen-btn" id="free-listen-btn-station-verb">
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
                options: ['Passageren', 'Kunden', 'Manden', 'Kvinden', 'Turisten', 'Pendleren', 'Familien', 'Chaufføren']
            },
            {
                id: 'verbum',
                title: '2. Hvad laver personen / dyret?',
                role: 'Verbum (Kernen)',
                catClass: 'sb-cat-verbum',
                badgeClass: 'badge-cat-verbum',
                icon: '⚡',
                options: ['rejser', 'trækker', 'køber', 'betaler for', 'vælger', 'får', 'mangler', 'venter på']
            },
            {
                id: 'objekt',
                title: '3. Hvilken genstand eller ting?',
                role: 'Objekt (Ting)',
                catClass: 'sb-cat-objekt',
                badgeClass: 'badge-cat-objekt',
                icon: '📦',
                options: ['en togbillet', 'en tung kuffert', 'en kop kaffe', 'sit rejsekort', 'en god plads', 'en flaske vand', 'det røde tog', 'en bus']
            },
            {
                id: 'sted',
                title: '4. Hvor på banegården eller rejsen sker det?',
                role: 'Sted (Rum)',
                catClass: 'sb-cat-sted',
                badgeClass: 'badge-cat-sted',
                icon: '📍',
                options: ['på stationen', 'i toget', 'ved automaten', 'på perronen', 'i kiosken', 'ved sporet', 'på rejsen', 'i hallen']
            }
        ];

        let selected = ['Passageren', 'køber', 'en togbillet', 'ved automaten'];

        const rowsContainer = freeBuilderContainer.querySelector('#free-builder-rows-station-verb');
        const liveSentenceEl = freeBuilderContainer.querySelector('#free-live-sentence-station-verb');
        const listenBtn = freeBuilderContainer.querySelector('#free-listen-btn-station-verb');

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
            context: "Passageren står foran den store billetautomat på stationen.",
            subjekt: "Passageren",
            objekt: "en togbillet",
            sted: "i automaten",
            questionPrompt: "Hvad gør Passageren med en togbillet i automaten?",
            correctVerb: "køber",
            distractors: ["sover", "spiser", "koger"],
            pedagogyNote: "Man køber en billet for at have ret til at køre med toget."
        },
        {
            context: "Kvinden har pakket alt sit tøj og går hen mod toget.",
            subjekt: "Kvinden",
            objekt: "en tung kuffert",
            sted: "hen ad perronen",
            questionPrompt: "Hvad gør Kvinden med en tung kuffert hen ad perronen?",
            correctVerb: "trækker",
            distractors: ["drikker", "hopper", "kaster"],
            pedagogyNote: "Man trækker en kuffert på hjul efter sig."
        },
        {
            context: "Kunden tager sit betalingskort frem ved kassen i stationskiosken.",
            subjekt: "Kunden",
            objekt: "en kop kaffe",
            sted: "i kiosken",
            questionPrompt: "Hvad gør Kunden med en kop kaffe i kiosken?",
            correctVerb: "betaler for",
            distractors: ["cykler", "læser", "sover"],
            pedagogyNote: "Man betaler for sine varer med penge eller betalingskort."
        },
        {
            context: "Familien er steget om bord på toget, som nu kører mod vest.",
            subjekt: "Familien",
            objekt: "mod Jylland",
            sted: "med det røde tog",
            questionPrompt: "Hvad gør Familien mod Jylland med det røde tog?",
            correctVerb: "rejser",
            distractors: ["vasker", "koger", "steger"],
            pedagogyNote: "Man rejser, når man tager fra ét sted til et andet med tog eller bus."
        },
        {
            context: "Manden kigger efter et rart sæde med god udsigt til markerne.",
            subjekt: "Manden",
            objekt: "en vinduesplads",
            sted: "i toget",
            questionPrompt: "Hvad gør Manden med en vinduesplads i toget?",
            correctVerb: "vælger",
            distractors: ["taber", "spiser", "glemmer"],
            pedagogyNote: "Man vælger den plads, som man helst vil have."
        },
        {
            context: "Billetten er betalt, og maskinen udskriver papiret med en kvittering.",
            subjekt: "Kunden",
            objekt: "sin billet",
            sted: "fra automaten",
            questionPrompt: "Hvad gør Kunden med sin billet fra automaten?",
            correctVerb: "får",
            distractors: ["kaster", "løber", "hopper"],
            pedagogyNote: "Man får en billet eller kvittering ud af automaten."
        },
        {
            context: "Turisten kigger i sin pung, men kan ikke finde mønter til automaten.",
            subjekt: "Turisten",
            objekt: "småpenge",
            sted: "i pungen",
            questionPrompt: "Hvad gør Turisten i forhold til småpenge i pungen?",
            correctVerb: "mangler",
            distractors: ["drikker", "åbner", "rejser"],
            pedagogyNote: "Man mangler penge, når man ikke har nok."
        },
        {
            context: "Ekspedienten i kiosken rækker en kold sodavand over disken.",
            subjekt: "Ekspedienten",
            objekt: "en kold sodavand",
            sted: "til de rejsende",
            questionPrompt: "Hvad gør Ekspedienten med en kold sodavand til de rejsende?",
            correctVerb: "sælger",
            distractors: ["falder", "sover", "bager"],
            pedagogyNote: "En butik eller kiosk sælger varer til kunderne."
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
            <div style="font-size: 0.85rem; color: #f87171; font-weight: 800; text-transform: uppercase;">
                Udfordring ${currentStationChallengeIdx + 1} af ${stationChallengeTasks.length}
            </div>
            <h3 style="font-size: 1.5rem; color: white; margin: 0.2rem 0;">Find handlingen & saml puslespillet</h3>
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
            <div class="sb-context-title">📍 <em>${formatNounLinks(task.context)}</em></div>
            <div class="sb-context-elements">
                <div class="sb-context-chip subjekt">
                    <span class="sb-chip-role">1. Hvem?</span>
                    <span>${formatNounLinks(task.subjekt)}</span>
                </div>
                <div class="sb-context-chip objekt">
                    <span class="sb-chip-role">3. Hvilken ting?</span>
                    <span>${formatNounLinks(task.objekt)}</span>
                </div>
                <div class="sb-context-chip sted">
                    <span class="sb-chip-role">4. Hvor?</span>
                    <span>${formatNounLinks(task.sted)}</span>
                </div>
            </div>
        `;
        attachNounLinkListeners(contextCard);
        challengeContainer.appendChild(contextCard);

        // Question box: Spørgsmål 2 (Verbet / Handlingen)
        const qBox = document.createElement('div');
        qBox.className = 'sb-question-box';
        qBox.innerHTML = `
            <div style="font-size: 0.85rem; color: #f87171; font-weight: 700; text-transform: uppercase; margin-bottom: 0.3rem;">
                Spørgsmål 2: Handlingen (Kernen i opgaven)
            </div>
            <div class="sb-question-text">${formatNounLinks(task.questionPrompt)}</div>
        `;
        attachNounLinkListeners(qBox);
        challengeContainer.appendChild(qBox);

        // Options Grid (4 verber fra scenen)
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'sb-options-grid';

        const allOptions = [task.correctVerb, ...task.distractors].sort(() => Math.random() - 0.5);

        const puzzleContainer = document.createElement('div');
        puzzleContainer.className = 'sb-puzzle-section';
        puzzleContainer.style.display = 'none';

        allOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'sb-option-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                if (btn.classList.contains('correct')) return;

                if (opt === task.correctVerb) {
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
                Klik på brikkerne i den rigtige danske ordstilling: <strong>1. Hvem ➔ 2. Handling (V2) ➔ 3. Hvilken ting ➔ 4. Hvor</strong>.
            </div>

            <!-- 4 Slots -->
            <div class="sb-puzzle-slots" id="station-puzzle-slots-verb">
                <div class="sb-puzzle-slot slot-0" data-idx="0">
                    <span class="slot-hint">1. Hvem?</span>
                    <span class="slot-role">[Subjekt]</span>
                </div>
                <div class="sb-puzzle-slot slot-1" data-idx="1">
                    <span class="slot-hint">2. Handling?</span>
                    <span class="slot-role">[Verbum - V2]</span>
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
            <div class="sb-puzzle-bank" id="station-puzzle-bank-verb"></div>

            <!-- Feedback -->
            <div class="sb-feedback-box" id="station-puzzle-feedback-verb"></div>
        `;

        const correctOrder = [task.subjekt, task.correctVerb, task.objekt, task.sted];
        const scrambledWords = [...correctOrder].sort(() => Math.random() - 0.5);

        let placedSlots = [null, null, null, null];

        const slotsEl = container.querySelector('#station-puzzle-slots-verb');
        const bankEl = container.querySelector('#station-puzzle-bank-verb');
        const feedbackEl = container.querySelector('#station-puzzle-feedback-verb');

        function updateSlotsAndBank() {
            // Update slots
            slotsEl.querySelectorAll('.sb-puzzle-slot').forEach((slot, idx) => {
                const word = placedSlots[idx];
                const hints = [
                    { h: '1. Hvem?', r: '[Subjekt]' },
                    { h: '2. Handling?', r: '[Verbum - V2]' },
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
                        ${getTranslation('verber_sb_success')} "<strong>${fullSentence}</strong>" ✓
                    </div>
                    <div style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.8rem;">
                        💡 ${task.pedagogyNote}
                    </div>
                    <div class="sb-action-row">
                        <button class="sb-listen-btn" id="station-listen-full-verb">
                            <span>🔊</span> Hør sætningen igen
                        </button>
                        <button class="sb-action-btn" id="station-next-btn-verb">
                            ${currentStationChallengeIdx < stationChallengeTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
                        </button>
                    </div>
                `;

                feedbackEl.querySelector('#station-listen-full-verb').onclick = () => speakDanish(fullSentence);
                feedbackEl.querySelector('#station-next-btn-verb').onclick = () => {
                    currentStationChallengeIdx = (currentStationChallengeIdx + 1) % stationChallengeTasks.length;
                    setupStationChallenge();
                };
            } else {
                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg error">
                        ${getTranslation('verber_sb_order_error')}
                    </div>
                    <div style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.6rem;">
                        ${getTranslation('verber_sb_order_reminder')}
                    </div>
                    <button class="sb-action-btn" id="station-retry-btn-verb" style="background: #475569;">
                        ${getTranslation('verber_sb_reset')}
                    </button>
                `;

                feedbackEl.querySelector('#station-retry-btn-verb').onclick = () => {
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
        },
        {
            marker: "I forgårs",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I forgårs",
            sentenceAfter: "hun en togbillet på internettet.",
            baseVerb: "at købe",
            options: [
                { text: "købte", form: "Datid", correct: true },
                { text: "køber", form: "Nutid", correct: false }
            ],
            explanation: '"I forgårs" peger på fortiden, så verbet skal stå i datid (købte).'
        },
        {
            marker: "Lige nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Lige nu",
            sentenceAfter: "toget roligt ind på perron 3.",
            baseVerb: "at rulle",
            options: [
                { text: "ruller", form: "Nutid", correct: true },
                { text: "rullede", form: "Datid", correct: false }
            ],
            explanation: '"Lige nu" angiver nutid, så verbet skal stå i nutid (ruller).'
        },
        {
            marker: "Sidste måned",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "Sidste måned",
            sentenceAfter: "de med tog hele vejen til Berlin.",
            baseVerb: "at rejse",
            options: [
                { text: "rejste", form: "Datid", correct: true },
                { text: "rejser", form: "Nutid", correct: false }
            ],
            explanation: '"Sidste måned" angiver fortid, så verbet skal stå i datid (rejste).'
        },
        {
            marker: "Hver eftermiddag",
            hint: "peger på en vane / nutid ➔ Nutid",
            sentenceBefore: "Hver eftermiddag",
            sentenceAfter: "lyntoget fra spor 1 klokken fire.",
            baseVerb: "at afgå",
            options: [
                { text: "afgår", form: "Nutid", correct: true },
                { text: "afgik", form: "Datid", correct: false }
            ],
            explanation: '"Hver eftermiddag" udtrykker en gentagen vane i nutid, så verbet skal stå i nutid (afgår).'
        },
        {
            marker: "I morges",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I morges",
            sentenceAfter: "rejsen præcis til tiden fra spor 2.",
            baseVerb: "at begynde",
            options: [
                { text: "begyndte", form: "Datid", correct: true },
                { text: "begynder", form: "Nutid", correct: false }
            ],
            explanation: '"I morges" peger på fortid, så verbet skal stå i datid (begyndte).'
        },
        {
            marker: "I dette øjeblik",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "I dette øjeblik",
            sentenceAfter: "automaten perfekt efter reparationen.",
            baseVerb: "at virke",
            options: [
                { text: "virker", form: "Nutid", correct: true },
                { text: "virkede", form: "Datid", correct: false }
            ],
            explanation: '"I dette øjeblik" angiver nutid, så verbet skal stå i nutid (virker).'
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
                            ${getTranslation('verber_correct')}
                        </div>
                        <div style="color: #94a3b8; font-size: 1rem; margin-bottom: 1rem;">
                            ${task.explanation}
                        </div>
                        <button class="mission-next-btn" id="next-tid-station-btn">
                            ${currTidTaskIdx < stationTidTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
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
                            ${getTranslation('verber_wrong')}
                        </div>
                        <div style="color: #94a3b8; font-size: 0.95rem; margin-top: 0.3rem;">
                            ${getTranslation('verber_tid_marker_hint', { marker: task.marker })}
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

    const initialTab = (extraData && (extraData.subPath || extraData.activeTab || extraData.tab)) || 'tab_vrimmel';
    switchTab(initialTab);

    container.appendChild(viewContainer);
}
