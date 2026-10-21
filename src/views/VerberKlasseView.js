import { getTranslation, getLang } from '../utils/i18n.js';
import { verberWordTranslations } from '../utils/top100_verber_translations.js';
import { formatNounLinks, attachNounLinkListeners } from '../utils/nounQuickPeekModal.js';
import { shuffleArray } from '../utils/shuffle.js';

/**
 * VerberKlasseView - Didaktisk vrimlebillede for Scene 2: Klasseværelset & Kontoret
 * Dækker 33 højfrekvente verber med infinitiv, nutid og datid.
 * 7 interaktive opgaveflader for maksimal pædagogisk progression.
 */
export function renderVerberKlasseView(container, navigateFn, extraData = {}) {
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
            border: 1px solid #ef4444;
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
            background: rgba(239, 68, 68, 0.15);
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
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
            border-color: #ef4444;
            color: white;
            background: #dc2626;
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
            background: rgba(239, 68, 68, 0.08);
            border: 1px solid rgba(239, 68, 68, 0.25);
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
            border-color: #ef4444;
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
            border-color: #ef4444;
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
            background: #dc2626;
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
            background: #b91c1c;
            transform: translateY(-2px);
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
        <h1>${getTranslation('top100_verber_scene3_title')}</h1>
        <p>${getTranslation('top100_verber_scene3_desc')}</p>
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
        history.pushState(null, '', '#/' + lang + '/verber_klasse/' + tabId);
        tabsMenu.querySelectorAll('.verber-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.verber-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- 20 VERBER I KLASSEVÆRELSET & KONTORET (Scene 3) med DATID
    // ========================================================
    const klasseVerber = [
        { word: 'at sige', nutid: 'siger', datid: 'sagde', x: 48, y: 45, sentence: 'Læreren siger godmorgen til klassen.' },
        { word: 'at tale', nutid: 'taler', datid: 'talte', x: 45, y: 52, sentence: 'Kursisterne taler dansk i timerne.' },
        { word: 'at spørge', nutid: 'spørger', datid: 'spurgte', x: 38, y: 50, sentence: 'En elev spørger læreren om et ord.' },
        { word: 'at svare', nutid: 'svarer', datid: 'svarede', x: 58, y: 48, sentence: 'Læreren svarer venligt på spørgsmålet.' },
        { word: 'at høre', nutid: 'hører', datid: 'hørte', x: 78, y: 55, sentence: 'Eleverne hører en dansk lydfil.' },
        { word: 'at læse', nutid: 'læser', datid: 'læste', x: 22, y: 65, sentence: 'Kvinden læser en historie i bogen.' },
        { word: 'at skrive', nutid: 'skriver', datid: 'skrev', x: 20, y: 70, sentence: 'Eleven skriver en sætning med blyant.' },
        { word: 'at tænke', nutid: 'tænker', datid: 'tænkte', x: 65, y: 50, sentence: 'Hun tænker over det svære spørgsmål.' },
        { word: 'at forstå', nutid: 'forstår', datid: 'forstod', x: 44, y: 60, sentence: 'Nu forstår alle grammatikken.' },
        { word: 'at lære', nutid: 'lærer', datid: 'lærte', x: 32, y: 68, sentence: 'De lærer mange nye danske ord.' },
        { word: 'at huske', nutid: 'husker', datid: 'huskede', x: 68, y: 45, sentence: 'Husk at skrive lektier til i morgen!' },
        { word: 'at glemme', nutid: 'glemmer', datid: 'glemte', x: 15, y: 80, sentence: 'Hun glemmer sit penalhus på bordet.' },
        { word: 'at forklare', nutid: 'forklarer', datid: 'forklarede', x: 42, y: 48, sentence: 'Underviseren forklarer reglen en gang til.' },
        { word: 'at vise', nutid: 'viser', datid: 'viste', x: 52, y: 28, sentence: 'Læreren viser et billede på tavlen.' },
        { word: 'at bruge', nutid: 'bruger', datid: 'brugte', x: 72, y: 70, sentence: 'Manden bruger sin bærbare computer.' },
        { word: 'at arbejde', nutid: 'arbejder', datid: 'arbejdede', x: 85, y: 65, sentence: 'De to kolleger arbejder sammen i gruppen.' },
        { word: 'at sende', nutid: 'sender', datid: 'sendte', x: 75, y: 75, sentence: 'Kollegaen sender en vigtig e-mail.' },
        { word: 'at søge', nutid: 'søger', datid: 'søgte', x: 70, y: 68, sentence: 'Han søger efter et ord i ordbogen.' },
        { word: 'at mene', nutid: 'mener', datid: 'mente', x: 40, y: 55, sentence: 'Hvad mener du om teksten?' },
        { word: 'at synes', nutid: 'synes', datid: 'syntes', x: 30, y: 60, sentence: 'Han synes dansk er spændende.' }
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
    pureBtn.innerHTML = `<span>🖼️</span> ${getTranslation('verber_pure_label')} <strong id="pure-mode-status-klasse">${getTranslation('verber_status_off')}</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-klasse').textContent = pureModeActive ? `${getTranslation('verber_status_on')} 🖼️` : getTranslation('verber_status_off');
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/verber_klasse_vrimmel.jpg';
    img.alt = 'Klasseværelset og kontoret vrimlebillede';
    stage.appendChild(img);

    // Detail card container
    const detailCard = document.createElement('div');
    detailCard.className = 'hotspot-detail-card';
    detailCard.style.display = 'none';

    // Create hotspots
    klasseVerber.forEach(item => {
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
                    <button class="listen-word-btn" id="listen-klasse-verb-btn">
                        <span>🔊</span> ${getTranslation('verber_listen_word')}
                    </button>
                </div>
            `;
            attachNounLinkListeners(detailCard, navigateFn, 'tab_vrimmel');

            detailCard.querySelector('#listen-klasse-verb-btn').onclick = () => {
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

    const klasseVisualMissions = [
        {
            title: "Mission 1 af 8",
            cropX: 52,
            cropY: 28,
            question: "Kig på læreren foran den store tavle. Hvad gør læreren?",
            options: [
                { text: "Viser et billede og ord på tavlen 📋", correct: true },
                { text: "Sover på gulvet 🛌", correct: false },
                { text: "Køber en billet i butikken 🎫", correct: false }
            ]
        },
        {
            title: "Mission 2 af 8",
            cropX: 20,
            cropY: 70,
            question: "Kig på eleven med blyanten i hånden. Hvad gør eleven?",
            options: [
                { text: "Kører i bus mod byen 🚌", correct: false },
                { text: "Skriver en sætning med blyant ✍️", correct: true },
                { text: "Ringer med en klokke 🔔", correct: false }
            ]
        },
        {
            title: "Mission 3 af 8",
            cropX: 72,
            cropY: 70,
            question: "Kig på personen foran computerskærmen. Hvad gør han?",
            options: [
                { text: "Bruger sin bærbare computer 💻", correct: true },
                { text: "Spiser en stor is i solen 🍦", correct: false },
                { text: "Vasker vinduer med vand 🧽", correct: false }
            ]
        },
        {
            title: "Mission 4 af 8",
            cropX: 38,
            cropY: 50,
            question: "Kig på eleven der rækker hånden op mod læreren. Hvad gør eleven?",
            options: [
                { text: "Lukker døren forsigtigt 🚪", correct: false },
                { text: "Spørger læreren om et ord ❓", correct: true },
                { text: "Løber en tur i skoven 🏃", correct: false }
            ]
        },
        {
            title: "Mission 5 af 8",
            cropX: 45,
            cropY: 52,
            question: "Kig på de to kursister ved bordet. Hvad gør de sammen?",
            options: [
                { text: "Taler sammen om den svære opgave 💬", correct: true },
                { text: "Sover på bordet 🛌", correct: false },
                { text: "Spiser en stor middag 🍽️", correct: false }
            ]
        },
        {
            title: "Mission 6 af 8",
            cropX: 22,
            cropY: 65,
            question: "Kig på eleven der sidder bøjet over den tykke ordbog. Hvad gør eleven?",
            options: [
                { text: "Læser en tekst og slår ord op 📖", correct: true },
                { text: "Kaster med ordbogen 📚", correct: false },
                { text: "Cykler på gangen 🚲", correct: false }
            ]
        },
        {
            title: "Mission 7 af 8",
            cropX: 48,
            cropY: 45,
            question: "Kig på læreren der peger på tavlen. Hvad gør læreren for eleverne?",
            options: [
                { text: "Siger og forklarer en vigtig grammatikregel 🧑‍🏫", correct: true },
                { text: "Vasker vinduer med sæbe 🪟", correct: false },
                { text: "Danser tango foran klassen 💃", correct: false }
            ]
        },
        {
            title: "Mission 8 af 8",
            cropX: 32,
            cropY: 68,
            question: "Kig på kursisten der lytter koncentreret med høretelefoner. Hvad gør han?",
            options: [
                { text: "Hører en dansk lydfil og lærer udtalen 🎧", correct: true },
                { text: "Spiller høj rockmusik for alle 🎸", correct: false },
                { text: "Bager boller i klassen 🥐", correct: false }
            ]
        }
    ];

    let currKlasseVisualIdx = 0;
    const visualMissionCard = document.createElement('div');
    visualMissionCard.className = 'exercise-card';

    function renderKlasseVisualMission() {
        visualMissionCard.innerHTML = '';
        const mission = klasseVisualMissions[currKlasseVisualIdx];

        const badge = document.createElement('div');
        badge.className = 'mission-badge';
        badge.textContent = `${mission.title} • Visuel Detektiv`;
        visualMissionCard.appendChild(badge);

        // Zoom viewfinder frame
        const zoomFrame = document.createElement('div');
        zoomFrame.className = 'detective-zoom-frame';
        zoomFrame.style.backgroundImage = "url('assets/verber_klasse_vrimmel.jpg')";
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

        shuffleArray(mission.options).forEach(opt => {
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
                        <button class="mission-next-btn" id="next-visual-klasse-btn">
                            ${currKlasseVisualIdx < klasseVisualMissions.length - 1 ? getTranslation('verber_next_mission') : getTranslation('verber_restart')}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-visual-klasse-btn').onclick = () => {
                        currKlasseVisualIdx = (currKlasseVisualIdx + 1) % klasseVisualMissions.length;
                        renderKlasseVisualMission();
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

    renderKlasseVisualMission();
    detektivPanel.appendChild(visualMissionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. TAB: FIND HANDLINGER I KONTEKST (Model 2)
    // ========================================================
    const handlingerPanel = document.createElement('div');
    handlingerPanel.className = 'verber-panel';
    handlingerPanel.dataset.panel = 'tab_handlinger';

    const klasseContextTasks = [
        {
            title: "Opgave 1 af 10: Læreren i undervisningen",
            prompt: "Find 3 handlinger, læreren gør i undervisningen:",
            targetCount: 3,
            options: [
                { text: "at forklare 🗣️", correct: true },
                { text: "at sove 🛌", correct: false },
                { text: "at vise 📋", correct: true },
                { text: "at cykle 🚲", correct: false },
                { text: "at svare 💬", correct: true },
                { text: "at svømme 🏊", correct: false }
            ]
        },
        {
            title: "Opgave 2 af 10: Kursisterne arbejder med sproget",
            prompt: "Find 3 handlinger, kursisterne gør med det danske sprog:",
            targetCount: 3,
            options: [
                { text: "at male 🎨", correct: false },
                { text: "at tale 🗣️", correct: true },
                { text: "at skrive ✍️", correct: true },
                { text: "at køre tog 🚆", correct: false },
                { text: "at læse 📖", correct: true },
                { text: "at lave mad 🍳", correct: false }
            ]
        },
        {
            title: "Opgave 3 af 10: Ved computeren på kontoret",
            prompt: "Find 3 handlinger, man gør foran computeren på kontoret:",
            targetCount: 3,
            options: [
                { text: "at sende (e-mail) ✉️", correct: true },
                { text: "at søge (på internettet) 🔍", correct: true },
                { text: "at danse 💃", correct: false },
                { text: "at bruge (pc) 💻", correct: true },
                { text: "at sove i seng 🛏️", correct: false },
                { text: "at klatre i træer 🌲", correct: false }
            ]
        },
        {
            title: "Opgave 4 af 10: Mundtlig dialog og samtale",
            prompt: "Find 3 handlinger, man bruger i en mundtlig samtale:",
            targetCount: 3,
            options: [
                { text: "at tale 🗣️", correct: true },
                { text: "at sove 🛌", correct: false },
                { text: "at sige 💬", correct: true },
                { text: "at svømme 🏊", correct: false },
                { text: "at lytte 👂", correct: true },
                { text: "at male 🎨", correct: false }
            ]
        },
        {
            title: "Opgave 5 af 10: Skriftlig kommunikation",
            prompt: "Find 3 handlinger, der handler om at skrive og læse:",
            targetCount: 3,
            options: [
                { text: "at skrive ✍️", correct: true },
                { text: "at køre bil 🚗", correct: false },
                { text: "at læse 📖", correct: true },
                { text: "at stege kød 🍳", correct: false },
                { text: "at sende en mail ✉️", correct: true },
                { text: "at synge 🎤", correct: false }
            ]
        },
        {
            title: "Opgave 6 af 10: Hukommelse og glemsel",
            prompt: "Find 3 handlinger, der har med hukommelsen at gøre:",
            targetCount: 3,
            options: [
                { text: "at huske 🧠", correct: true },
                { text: "at spise sandwich 🥪", correct: false },
                { text: "at glemme ❓", correct: true },
                { text: "at repetere ordene 🔄", correct: true },
                { text: "at hoppe 🦘", correct: false },
                { text: "at vaske gulv 🧼", correct: false }
            ]
        },
        {
            title: "Opgave 7 af 10: Meninger og synspunkter",
            prompt: "Find 3 handlinger, man bruger til at udtrykke sin holdning:",
            targetCount: 3,
            options: [
                { text: "at synes 💭", correct: true },
                { text: "at cykle 🚲", correct: false },
                { text: "at mene 🗣️", correct: true },
                { text: "at tro 🤔", correct: true },
                { text: "at sove 😴", correct: false },
                { text: "at bage 🍞", correct: false }
            ]
        },
        {
            title: "Opgave 8 af 10: Informationssøgning og IT",
            prompt: "Find 3 handlinger, når man arbejder ved computeren:",
            targetCount: 3,
            options: [
                { text: "at søge oplysninger 🔍", correct: true },
                { text: "at bruge musen 💻", correct: true },
                { text: "at svømme 🌊", correct: false },
                { text: "at skrive på tastatur ⌨️", correct: true },
                { text: "at klatre 🧗", correct: false },
                { text: "at danse 💃", correct: false }
            ]
        },
        {
            title: "Opgave 9 af 10: Læring og forståelse",
            prompt: "Find 3 handlinger, der fører til ny viden:",
            targetCount: 3,
            options: [
                { text: "at lære nyt 📚", correct: true },
                { text: "at forstå reglen 💡", correct: true },
                { text: "at råbe højt 📢", correct: false },
                { text: "at tænke sig om 🧠", correct: true },
                { text: "at tabe ting 💔", correct: false },
                { text: "at sove 🛌", correct: false }
            ]
        },
        {
            title: "Opgave 10 af 10: Undervisning og instruktion",
            prompt: "Find 3 handlinger, som en underviser typisk udfører:",
            targetCount: 3,
            options: [
                { text: "at forklare stoffet 🧑‍🏫", correct: true },
                { text: "at vise et eksempel 🖥️", correct: true },
                { text: "at sove på bordet 😴", correct: false },
                { text: "at stille et spørgsmål ❓", correct: true },
                { text: "at stege bøffer 🥩", correct: false },
                { text: "at løbe væk 🏃", correct: false }
            ]
        }
    ];

    let currContextTaskIdx = 0;
    const contextCard = document.createElement('div');
    contextCard.className = 'exercise-card';

    function renderKlasseContextTask() {
        contextCard.innerHTML = '';
        const task = klasseContextTasks[currContextTaskIdx];
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

        shuffleArray(task.options).forEach(opt => {
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
                            <button class="mission-next-btn" id="next-context-klasse-btn">
                                ${currContextTaskIdx < klasseContextTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
                            </button>
                        `;
                        feedbackBox.querySelector('#next-context-klasse-btn').onclick = () => {
                            currContextTaskIdx = (currContextTaskIdx + 1) % klasseContextTasks.length;
                            renderKlasseContextTask();
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

    renderKlasseContextTask();
    handlingerPanel.appendChild(contextCard);
    panelsHolder.appendChild(handlingerPanel);

    // ========================================================
    // --- 4. TAB: HISTORIE (Byg en historie - INGEN TTS)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'verber-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const klasseStories = [
        {
            title: "1. I dansktimen",
            steps: [
                {
                    q: "1. Hvad gør læreren på tavlen?",
                    options: [
                        { text: "Læreren viser et nyt ord 📋", correct: true },
                        { text: "Læreren sover på gulvet 🛌", correct: false },
                        { text: "Læreren spiser en kage 🎂", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør kursisterne?",
                    options: [
                        { text: "De lytter opmærksomt 👂", correct: true },
                        { text: "De løber ud af døren 🏃", correct: false },
                        { text: "De råber højt 🗣️", correct: false }
                    ]
                },
                {
                    q: "3. Hvad sker der bagefter?",
                    options: [
                        { text: "De forstår grammatikken 💡", correct: true },
                        { text: "De glemmer deres navne ❓", correct: false },
                        { text: "De kaster deres bøger 🚀", correct: false }
                    ]
                }
            ]
        },
        {
            title: "2. En svær opgave",
            steps: [
                {
                    q: "1. Hvad gør eleven først i bogen?",
                    options: [
                        { text: "Han læser teksten grundigt 📖", correct: true },
                        { text: "Han tegner på væggen 🖍️", correct: false },
                        { text: "Han klipper papiret i stykker ✂️", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør han når det er svært?",
                    options: [
                        { text: "Han tænker over spørgsmålet 🧠", correct: true },
                        { text: "Han går hjem med det samme 🏠", correct: false },
                        { text: "Han taber sin stol 🪑", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør han til sidst?",
                    options: [
                        { text: "Han skriver det rigtige svar ✍️", correct: true },
                        { text: "Han river bogen over 📄", correct: false },
                        { text: "Han lukker øjnene og sover 😴", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. Samtale i klassen",
            steps: [
                {
                    q: "1. Hvad gør læreren til hele klassen?",
                    options: [
                        { text: "Læreren spørger om et nyt emne ❓", correct: true },
                        { text: "Læreren synger en sang 🎵", correct: false },
                        { text: "Læreren slukker lyset 💡", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør Maria da hun rækker hånden op?",
                    options: [
                        { text: "Hun svarer på dansk 💬", correct: true },
                        { text: "Hun råber på læreren 📢", correct: false },
                        { text: "Hun gemmer sig under bordet 🙈", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør alle i klassen bagefter?",
                    options: [
                        { text: "De smiler og roser hende 😊", correct: true },
                        { text: "De græder af sorg 😢", correct: false },
                        { text: "De går deres vej 🚶", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. Arbejde ved computeren",
            steps: [
                {
                    q: "1. Hvad gør kollegaen først?",
                    options: [
                        { text: "Hun bruger sin computer 💻", correct: true },
                        { text: "Hun kaster computeren ud 🗑️", correct: false },
                        { text: "Hun tager skoene af 👟", correct: false }
                    ]
                },
                {
                    q: "2. Hvad skriver hun på tastaturet?",
                    options: [
                        { text: "Hun skriver en vigtig e-mail ✉️", correct: true },
                        { text: "Hun tegner et træ 🌳", correct: false },
                        { text: "Hun vasker skærmen med vand 🧽", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør hun når mailen er færdig?",
                    options: [
                        { text: "Hun sender mailen af sted 📤", correct: true },
                        { text: "Hun sletter hele teksten ❌", correct: false },
                        { text: "Hun lukker computeren og græder 😭", correct: false }
                    ]
                }
            ]
        },
        {
            title: "5. Den vigtige aflevering",
            steps: [
                {
                    q: "1. Hvad skriver kursisten færdig på sin bærbare computer?",
                    options: [
                        { text: "Hun skriver sin store månedsopgave i dansk 📄", correct: true },
                        { text: "Hun skriver et brev til en trold 🧙", correct: false },
                        { text: "Hun tegner et billede af en ost 🧀", correct: false }
                    ]
                },
                {
                    q: "2. Hvem spørger hun om hjælp til et svært ord?",
                    options: [
                        { text: "Hun spørger sin lærer ved tavlen 🧑‍🏫", correct: true },
                        { text: "Hun spørger lampen i loftet 💡", correct: false },
                        { text: "Hun spørger gulvtæppet 🧶", correct: false }
                    ]
                },
                {
                    q: "3. Hvor sender hun opgaven hen bagefter?",
                    options: [
                        { text: "Hun sender den som PDF-fil til skolens portal ✉️", correct: true },
                        { text: "Hun kaster den ud af vinduet 🪟", correct: false },
                        { text: "Hun gemmer den i en skraldespand 🗑️", correct: false }
                    ]
                }
            ]
        },
        {
            title: "6. Gruppearbejdet i pausen",
            steps: [
                {
                    q: "1. Hvad taler de tre kursister sammen om i pausen?",
                    options: [
                        { text: "De taler sammen om de nye verber og deres bøjning 💬", correct: true },
                        { text: "De taler om at flyve til Mars 🚀", correct: false },
                        { text: "De diskuterer dinosaurernes madvaner 🦖", correct: false }
                    ]
                },
                {
                    q: "2. Hvad søger de efter på internettet?",
                    options: [
                        { text: "De søger efter gode eksempelsætninger 💻", correct: true },
                        { text: "De leder efter en bortløben elefant 🐘", correct: false },
                        { text: "De køber 500 kilo mel 🌾", correct: false }
                    ]
                },
                {
                    q: "3. Hvad viser de foran klassen efter pausen?",
                    options: [
                        { text: "De viser en flot planche med bøjningsformer 📊", correct: true },
                        { text: "De viser et tryllekunst med en hat 🎩", correct: false },
                        { text: "De sover foran tavlen 😴", correct: false }
                    ]
                }
            ]
        },
        {
            title: "7. Den glemte blyant",
            steps: [
                {
                    q: "1. Hvad opdager Ali i tasken, da timen starter?",
                    options: [
                        { text: "Han opdager, at han har glemt sit penalhus derhjemme ✏️", correct: true },
                        { text: "Han opdager en levende krabbe i tasken 🦀", correct: false },
                        { text: "Han opdager en stor vandmelon 🍉", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør hans venlige sidemand straks?",
                    options: [
                        { text: "Sidemanden smiler og låner ham en god blyant 🤝", correct: true },
                        { text: "Sidemanden råber ad ham 📢", correct: false },
                        { text: "Sidemanden løber ud af lokalet 🏃", correct: false }
                    ]
                },
                {
                    q: "3. Hvad skriver Ali flittigt i sin skrivebog?",
                    options: [
                        { text: "Han skriver alle de nye gloser pænt ned 📝", correct: true },
                        { text: "Han river siderne ud 📄", correct: false },
                        { text: "Han maler bogen helt sort 🎨", correct: false }
                    ]
                }
            ]
        },
        {
            title: "8. Den mundtlige prøve",
            steps: [
                {
                    q: "1. Hvad tænker Maria grundigt over før prøven?",
                    options: [
                        { text: "Hun tænker over de emner, læreren har gennemgået 🤔", correct: true },
                        { text: "Hun tænker på en ny bil 🏎️", correct: false },
                        { text: "Hun tænker på at bestige et bjerg 🏔️", correct: false }
                    ]
                },
                {
                    q: "2. Hvordan svarer hun, da læreren stiller et spørgsmål?",
                    options: [
                        { text: "Hun svarer roligt og tydeligt på godt dansk 🗣️", correct: true },
                        { text: "Hun synger en vuggevise 🎶", correct: false },
                        { text: "Hun gemmer sig under bordet 🙈", correct: false }
                    ]
                },
                {
                    q: "3. Hvad siger læreren til hende med et smil bagefter?",
                    options: [
                        { text: "Læreren roser hende for hendes flotte indsats 🌟", correct: true },
                        { text: "Læreren giver hende en bøde 🧾", correct: false },
                        { text: "Læreren slukker lyset og går 🚪", correct: false }
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
        descEl.textContent = 'Vælg det rigtige verbum for at bygge historien:';
        storyContainer.appendChild(descEl);

        const stepsHolder = document.createElement('div');

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
            qEl.innerHTML = formatNounLinks(step.q);
            attachNounLinkListeners(qEl);
            stepCard.appendChild(qEl);

            const optRow = document.createElement('div');
            optRow.className = 'story-options-row';

            const stepFeedback = document.createElement('div');

            shuffleArray(step.options).forEach(opt => {
                const optBtn = document.createElement('button');
                optBtn.className = 'story-opt-btn';
                optBtn.textContent = opt.text;

                optBtn.onclick = () => {
                    if (opt.correct) {
                        optBtn.classList.add('correct');
                        stepFeedback.innerHTML = `<div style="color: #4ade80; font-weight: 700; margin-top: 0.6rem;">${getTranslation('verber_correct')}</div>`;
                        optRow.querySelectorAll('.story-opt-btn').forEach(b => b.style.pointerEvents = 'none');

                        const nextCard = stepsHolder.querySelector(`#klasse-step-${sIdx + 1}`);
                        if (nextCard) {
                            nextCard.style.opacity = '1';
                            nextCard.style.pointerEvents = 'auto';
                            nextCard.classList.add('active-step');
                        } else {
                            const completeBox = storyContainer.querySelector('#klasse-story-complete');
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
        completeBox.id = 'klasse-story-complete';
        completeBox.className = 'story-explanation-box';
        completeBox.style.display = 'none';
        completeBox.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: #4ade80;">
                ${getTranslation('verber_story_complete')}
            </div>
            <button class="mission-next-btn" id="next-klasse-story-btn">
                ${currKlasseStoryIdx < klasseStories.length - 1 ? getTranslation('verber_next_story') : getTranslation('verber_restart')}
            </button>
        `;
        storyContainer.appendChild(completeBox);

        completeBox.querySelector('#next-klasse-story-btn').onclick = () => {
            currKlasseStoryIdx = (currKlasseStoryIdx + 1) % klasseStories.length;
            renderActiveKlasseStory();
        };
    }

    renderActiveKlasseStory();
    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 5. TAB: SYNONYMER & ANTONYMER (INGEN TTS)
    // ========================================================
    const synonymPanel = document.createElement('div');
    synonymPanel.className = 'verber-panel';
    synonymPanel.dataset.panel = 'tab_synonym_antonym';

    const klasseSynonymTasks = [
        {
            type: 'synonym',
            word: 'at tale',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at snakke 🗣️', correct: true },
                { text: 'at tie stille 🤫', correct: false },
                { text: 'at sove 🛌', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at høre',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at lytte efter 👂', correct: true },
                { text: 'at råbe højt 📢', correct: false },
                { text: 'at løbe stærkt 🏃', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at mene',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at synes 🤔', correct: true },
                { text: 'at glemme 💭', correct: false },
                { text: 'at spise 🍽️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at spørge',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at svare 💬', correct: true },
                { text: 'at gætte 🤔', correct: false },
                { text: 'at råbe 🗣️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at huske',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at glemme 💭', correct: true },
                { text: 'at tænke 🧠', correct: false },
                { text: 'at lære 📚', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at sende',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at modtage (få) 📥', correct: true },
                { text: 'at gemme 📦', correct: false },
                { text: 'at kaste 🤾', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at forklare',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at redegøre for / udlægge 🗣️', correct: true },
                { text: 'at sove 🛌', correct: false },
                { text: 'at spise 🍽️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at huske',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at glemme ❓', correct: true },
                { text: 'at tænke 🧠', correct: false },
                { text: 'at smile 😊', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at tænke',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at overveje / reflektere 🤔', correct: true },
                { text: 'at løbe 🏃', correct: false },
                { text: 'at male 🎨', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at spørge',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at svare 💬', correct: true },
                { text: 'at kigge 👀', correct: false },
                { text: 'at råbe 📢', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at bruge',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at anvende / benytte 💻', correct: true },
                { text: 'at miste ❌', correct: false },
                { text: 'at synge 🎵', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at forstå',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at misforstå 🤷', correct: true },
                { text: 'at vide 💡', correct: false },
                { text: 'at høre 👂', correct: false }
            ]
        }
    ];

    let currKlasseSynonymIdx = 0;
    const synonymCard = document.createElement('div');
    synonymCard.className = 'synonym-card';

    function renderKlasseSynonymTask() {
        synonymCard.innerHTML = '';
        const task = klasseSynonymTasks[currKlasseSynonymIdx];

        const isSynonym = task.type === 'synonym';
        const typeBadge = document.createElement('div');
        typeBadge.className = `synonym-type-badge ${isSynonym ? 'badge-type-synonym' : 'badge-type-antonym'}`;
        typeBadge.textContent = isSynonym ? '🔗 Find synonym (samme betydning)' : '⚡ Find antonym (modsætning)';
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

        shuffleArray(task.options).forEach(opt => {
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
                        <button class="mission-next-btn" id="next-klasse-synonym-btn">
                            ${currKlasseSynonymIdx < klasseSynonymTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-klasse-synonym-btn').onclick = () => {
                        currKlasseSynonymIdx = (currKlasseSynonymIdx + 1) % klasseSynonymTasks.length;
                        renderKlasseSynonymTask();
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

    renderKlasseSynonymTask();
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
                <h3 style="font-size: 1.7rem; color: white; margin-bottom: 0.4rem;">Byg dine egne sætninger i klassen og på kontoret</h3>
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

            <div id="free-builder-rows-klasse-verb"></div>

            <!-- Live Output Sentence -->
            <div class="sb-live-box">
                <div class="sb-live-label">Din samlede sætning</div>
                <div class="sb-live-sentence" id="free-live-sentence-klasse-verb"></div>
                <button class="sb-listen-btn" id="free-listen-btn-klasse-verb">
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
                options: ['Læreren', 'Eleven', 'Kursisten', 'Kollegaen', 'Underviseren', 'Kvinden', 'Manden', 'Klassen']
            },
            {
                id: 'verbum',
                title: '2. Hvad laver personen / dyret?',
                role: 'Verbum (Kernen)',
                catClass: 'sb-cat-verbum',
                badgeClass: 'badge-cat-verbum',
                icon: '⚡',
                options: ['læser', 'skriver', 'forklarer', 'spørger om', 'hører', 'lærer', 'bruger', 'sender']
            },
            {
                id: 'objekt',
                title: '3. Hvilken genstand eller ting?',
                role: 'Objekt (Ting)',
                catClass: 'sb-cat-objekt',
                badgeClass: 'badge-cat-objekt',
                icon: '📦',
                options: ['en lektie', 'en sætning', 'en grammatikregel', 'et nyt ord', 'en lydfil', 'dansk', 'en computer', 'en vigtig e-mail']
            },
            {
                id: 'sted',
                title: '4. Hvor i klassen eller på kontoret sker det?',
                role: 'Sted (Rum)',
                catClass: 'sb-cat-sted',
                badgeClass: 'badge-cat-sted',
                icon: '📍',
                options: ['i klassen', 'på tavlen', 'i hæftet', 'på kontoret', 'ved bordet', 'i skolen', 'foran skærmen', 'i lokalet']
            }
        ];

        let selected = ['Læreren', 'forklarer', 'en grammatikregel', 'på tavlen'];

        const rowsContainer = freeBuilderContainer.querySelector('#free-builder-rows-klasse-verb');
        const liveSentenceEl = freeBuilderContainer.querySelector('#free-live-sentence-klasse-verb');
        const listenBtn = freeBuilderContainer.querySelector('#free-listen-btn-klasse-verb');

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
    const klasseChallengeTasks = [
        {
            context: "Læreren står foran tavlen og hjælper alle kursisterne med sproget.",
            subjekt: "Læreren",
            objekt: "en grammatikregel",
            sted: "på tavlen",
            questionPrompt: "Hvad gør Læreren med en grammatikregel på tavlen?",
            correctVerb: "forklarer",
            distractors: ["drikker", "sover", "koger"],
            pedagogyNote: "Læreren forklarer reglerne, så kursisterne forstår dem."
        },
        {
            context: "Eleven sidder ved sit bord med en blyant og skal lave sine opgaver.",
            subjekt: "Eleven",
            objekt: "en god sætning",
            sted: "i sit hæfte",
            questionPrompt: "Hvad gør Eleven med en god sætning i sit hæfte?",
            correctVerb: "skriver",
            distractors: ["hopper", "kører", "cykler"],
            pedagogyNote: "Man skriver med en blyant eller kuglepen i et hæfte."
        },
        {
            context: "Kursisten har slået op på side 20 for at forstå dagens tekst.",
            subjekt: "Kursisten",
            objekt: "den svære tekst",
            sted: "i bogen",
            questionPrompt: "Hvad gør Kursisten med den svære tekst i bogen?",
            correctVerb: "læser",
            distractors: ["steger", "vasker", "kaster"],
            pedagogyNote: "Man læser tekster i bøger og aviser med øjnene."
        },
        {
            context: "Der er noget i opgaven, som kursisten ikke forstår, og hånden rækkes op.",
            subjekt: "Kursisten",
            objekt: "hjælp til opgaven",
            sted: "i undervisningen",
            questionPrompt: "Hvad gør Kursisten i forhold til hjælp til opgaven i undervisningen?",
            correctVerb: "spørger om",
            distractors: ["køber", "spiser", "åbner"],
            pedagogyNote: "Man spørger om hjælp, når man er i tvivl."
        },
        {
            context: "Klassen har hovedtelefoner på for at lytte til den danske udtale.",
            subjekt: "Klassen",
            objekt: "en lydfil med udtale",
            sted: "foran computeren",
            questionPrompt: "Hvad gør Klassen med en lydfil med udtale foran computeren?",
            correctVerb: "hører",
            distractors: ["løber", "sidder", "deler"],
            pedagogyNote: "Man hører lydfiler og samtaler med ørerne."
        },
        {
            context: "Kursisterne øver sig flittigt hver dag for at bestå prøven.",
            subjekt: "Kursisterne",
            objekt: "mange nye ord",
            sted: "i sprogskolen",
            questionPrompt: "Hvad gør Kursisterne med mange nye ord i sprogskolen?",
            correctVerb: "lærer",
            distractors: ["taber", "glemmer", "slukker"],
            pedagogyNote: "Når man træner og øver sig, lærer man et nyt sprog."
        },
        {
            context: "Medarbejderen tænder for sin bærbare for at skrive dagens rapport.",
            subjekt: "Kollegaen",
            objekt: "en bærbar computer",
            sted: "på kontoret",
            questionPrompt: "Hvad gør Kollegaen med en bærbar computer på kontoret?",
            correctVerb: "bruger",
            distractors: ["drikker", "koger", "spiller"],
            pedagogyNote: "Man bruger et redskab eller en computer til arbejdet."
        },
        {
            context: "Rapporten er færdig, og chefen skal modtage den med det samme.",
            subjekt: "Kollegaen",
            objekt: "en vigtig e-mail",
            sted: "til chefen",
            questionPrompt: "Hvad gør Kollegaen med en vigtig e-mail til chefen?",
            correctVerb: "sender",
            distractors: ["spiser", "kaster", "falder"],
            pedagogyNote: "Man sender breve, beskeder og e-mails til andre."
        }
    ];

    let currentKlasseChallengeIdx = 0;
    const completedKlasseChallenges = new Set();

    function setupKlasseChallenge() {
        challengeContainer.innerHTML = '';
        const task = klasseChallengeTasks[currentKlasseChallengeIdx];

        // Header with pills
        const header = document.createElement('div');
        header.className = 'sb-task-header';

        const titleDiv = document.createElement('div');
        titleDiv.innerHTML = `
            <div style="font-size: 0.85rem; color: #f87171; font-weight: 800; text-transform: uppercase;">
                Udfordring ${currentKlasseChallengeIdx + 1} af ${klasseChallengeTasks.length}
            </div>
            <h3 style="font-size: 1.5rem; color: white; margin: 0.2rem 0;">Find handlingen & saml puslespillet</h3>
        `;
        header.appendChild(titleDiv);

        const pills = document.createElement('div');
        pills.className = 'sb-task-pills';
        klasseChallengeTasks.forEach((_, idx) => {
            const pill = document.createElement('div');
            pill.className = `sb-task-pill ${idx === currentKlasseChallengeIdx ? 'active' : ''} ${completedKlasseChallenges.has(idx) ? 'done' : ''}`;
            pill.textContent = idx + 1;
            pill.onclick = () => {
                currentKlasseChallengeIdx = idx;
                setupKlasseChallenge();
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

        const allOptions = shuffleArray([task.correctVerb, ...task.distractors]);

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
                    renderKlassePuzzleStep(puzzleContainer, task);
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
    function renderKlassePuzzleStep(container, task) {
        container.innerHTML = `
            <div class="sb-puzzle-title">
                <span>🧩</span> Trin 2: Puslespillet – Saml hele sætningen!
            </div>
            <div class="sb-puzzle-desc">
                Klik på brikkerne i den rigtige danske ordstilling: <strong>1. Hvem ➔ 2. Handling (V2) ➔ 3. Hvilken ting ➔ 4. Hvor</strong>.
            </div>

            <!-- 4 Slots -->
            <div class="sb-puzzle-slots" id="klasse-puzzle-slots-verb">
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
            <div class="sb-puzzle-bank" id="klasse-puzzle-bank-verb"></div>

            <!-- Feedback -->
            <div class="sb-feedback-box" id="klasse-puzzle-feedback-verb"></div>
        `;

        const correctOrder = [task.subjekt, task.correctVerb, task.objekt, task.sted];
        const scrambledWords = shuffleArray(correctOrder);

        let placedSlots = [null, null, null, null];

        const slotsEl = container.querySelector('#klasse-puzzle-slots-verb');
        const bankEl = container.querySelector('#klasse-puzzle-bank-verb');
        const feedbackEl = container.querySelector('#klasse-puzzle-feedback-verb');

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
                completedKlasseChallenges.add(currentKlasseChallengeIdx);
                speakDanish(fullSentence);

                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg success">
                        ${getTranslation('verber_sb_success')} "<strong>${fullSentence}</strong>" ✓
                    </div>
                    <div style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.8rem;">
                        💡 ${task.pedagogyNote}
                    </div>
                    <div class="sb-action-row">
                        <button class="sb-listen-btn" id="klasse-listen-full-verb">
                            <span>🔊</span> Hør sætningen igen
                        </button>
                        <button class="sb-action-btn" id="klasse-next-btn-verb">
                            ${currentKlasseChallengeIdx < klasseChallengeTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
                        </button>
                    </div>
                `;

                feedbackEl.querySelector('#klasse-listen-full-verb').onclick = () => speakDanish(fullSentence);
                feedbackEl.querySelector('#klasse-next-btn-verb').onclick = () => {
                    currentKlasseChallengeIdx = (currentKlasseChallengeIdx + 1) % klasseChallengeTasks.length;
                    setupKlasseChallenge();
                };
            } else {
                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg error">
                        ${getTranslation('verber_sb_order_error')}
                    </div>
                    <div style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.6rem;">
                        ${getTranslation('verber_sb_order_reminder')}
                    </div>
                    <button class="sb-action-btn" id="klasse-retry-btn-verb" style="background: #475569;">
                        ${getTranslation('verber_sb_reset')}
                    </button>
                `;

                feedbackEl.querySelector('#klasse-retry-btn-verb').onclick = () => {
                    placedSlots = [null, null, null, null];
                    updateSlotsAndBank();
                };
            }
        }

        updateSlotsAndBank();
    }

    // Initialize both sub-tabs
    setupFreeBuilder();
    setupKlasseChallenge();
    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    // ========================================================
    // --- 7. TAB: NUTID & DATID (Tidsmarkør-træning - INGEN TTS)
    // ========================================================
    const tidBoejningPanel = document.createElement('div');
    tidBoejningPanel.className = 'verber-panel';
    tidBoejningPanel.dataset.panel = 'tab_tid_boejning';

    const klasseTidTasks = [
        {
            marker: "I går",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I går",
            sentenceAfter: "læreren den svære grammatikregel en gang til.",
            baseVerb: "at forklare",
            options: [
                { text: "forklarede", form: "Datid", correct: true },
                { text: "forklarer", form: "Nutid", correct: false }
            ],
            explanation: '"I går" viser, at handlingen skete i fortiden, så verbet skal stå i datid (forklarede).'
        },
        {
            marker: "Lige nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Lige nu",
            sentenceAfter: "kursisterne dansk sammen i gruppen.",
            baseVerb: "at tale",
            options: [
                { text: "taler", form: "Nutid", correct: true },
                { text: "talte", form: "Datid", correct: false }
            ],
            explanation: '"Lige nu" viser, at handlingen sker i dette øjeblik, så verbet skal stå i nutid (taler).'
        },
        {
            marker: "I morges",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I morges",
            sentenceAfter: "eleven sit penalhus derhjemme på bordet.",
            baseVerb: "at glemme",
            options: [
                { text: "glemte", form: "Datid", correct: true },
                { text: "glemmer", form: "Nutid", correct: false }
            ],
            explanation: '"I morges" viser, at handlingen skete tidligere (fortid), så verbet skal stå i datid (glemte).'
        },
        {
            marker: "Hver dag",
            hint: "peger på en vane / nutid ➔ Nutid",
            sentenceBefore: "Hver dag",
            sentenceAfter: "de mange nye danske ord i skolen.",
            baseVerb: "at lære",
            options: [
                { text: "lærer", form: "Nutid", correct: true },
                { text: "lærte", form: "Datid", correct: false }
            ],
            explanation: '"Hver dag" viser en gentagen vane i nutid, så verbet skal stå i nutid (lærer).'
        },
        {
            marker: "Sidste mandag",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "Sidste mandag",
            sentenceAfter: "kollegaen en vigtig e-mail til chefen.",
            baseVerb: "at sende",
            options: [
                { text: "sendte", form: "Datid", correct: true },
                { text: "sender", form: "Nutid", correct: false }
            ],
            explanation: '"Sidste mandag" viser en afsluttet handling i fortiden, så verbet skal stå i datid (sendte).'
        },
        {
            marker: "Nu",
            sentenceBefore: "Nu",
            sentenceAfter: "alle i klassen heldigvis lektien rigtig godt.",
            baseVerb: "at forstå",
            options: [
                { text: "forstår", form: "Nutid", correct: true },
                { text: "forstod", form: "Datid", correct: false }
            ],
            explanation: '"Nu" angiver nutid, så verbet skal stå i nutid (forstår).'
        },
        {
            marker: "I går aftes",
            sentenceBefore: "I går aftes",
            sentenceAfter: "hun tre kapitler i lærebogen før sengetid.",
            baseVerb: "at læse",
            options: [
                { text: "læste", form: "Datid", correct: true },
                { text: "læser", form: "Nutid", correct: false }
            ],
            explanation: '"I går aftes" peger på fortiden, så verbet skal stå i datid (læste).'
        },
        {
            marker: "Lige nu",
            sentenceBefore: "Lige nu",
            sentenceAfter: "kursisterne flittigt på deres fælles projekt.",
            baseVerb: "at arbejde",
            options: [
                { text: "arbejder", form: "Nutid", correct: true },
                { text: "arbejdede", form: "Datid", correct: false }
            ],
            explanation: '"Lige nu" angiver nutid, så verbet skal stå i nutid (arbejder).'
        },
        {
            marker: "I sidste uge",
            sentenceBefore: "I sidste uge",
            sentenceAfter: "vi et helt nyt emne om det danske arbejdsmarked.",
            baseVerb: "at lære",
            options: [
                { text: "lærte", form: "Datid", correct: true },
                { text: "lærer", form: "Nutid", correct: false }
            ],
            explanation: '"I sidste uge" angiver fortid, så verbet skal stå i datid (lærte).'
        },
        {
            marker: "Hver dag",
            sentenceBefore: "Hver dag",
            sentenceAfter: "læreren nye nyttige ord på tavlen.",
            baseVerb: "at skrive",
            options: [
                { text: "skriver", form: "Nutid", correct: true },
                { text: "skrev", form: "Datid", correct: false }
            ],
            explanation: '"Hver dag" viser en vane i nutid, så verbet skal stå i nutid (skriver).'
        },
        {
            marker: "I morges",
            sentenceBefore: "I morges",
            sentenceAfter: "eleven et klogt spørgsmål til læreren.",
            baseVerb: "at stille",
            options: [
                { text: "stillede", form: "Datid", correct: true },
                { text: "stiller", form: "Nutid", correct: false }
            ],
            explanation: '"I morges" peger på fortid, så verbet skal stå i datid (stillede).'
        },
        {
            marker: "I dette øjeblik",
            sentenceBefore: "I dette øjeblik",
            sentenceAfter: "kursisten grundigt over svaret.",
            baseVerb: "at tænke",
            options: [
                { text: "tænker", form: "Nutid", correct: true },
                { text: "tænkte", form: "Datid", correct: false }
            ],
            explanation: '"I dette øjeblik" angiver nutid, så verbet skal stå i nutid (tænker).'
        }
    ];

    let currTidTaskIdx = 0;
    const tidCard = document.createElement('div');
    tidCard.className = 'exercise-card';

    function renderKlasseTidTask() {
        tidCard.innerHTML = '';
        const task = klasseTidTasks[currTidTaskIdx];

        const badge = document.createElement('div');
        badge.className = 'time-marker-badge';
        badge.textContent = `Opgave ${currTidTaskIdx + 1} af ${klasseTidTasks.length} • Tidsmarkør: "${task.marker}"`;
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

        if (currTidTaskIdx < 5 && task.hint) {
            const hintInfo = document.createElement('div');
            hintInfo.style.color = '#c084fc';
            hintInfo.style.fontSize = '0.95rem';
            hintInfo.style.fontWeight = '600';
            hintInfo.style.marginBottom = '1rem';
            hintInfo.textContent = `💡 Hint: "${task.marker}" ${task.hint}`;
            tidCard.appendChild(hintInfo);
        }

        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'time-options-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.style.marginTop = '1.2rem';

        shuffleArray(task.options).forEach(opt => {
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
                        <button class="mission-next-btn" id="next-tid-klasse-btn">
                            ${currTidTaskIdx < klasseTidTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-tid-klasse-btn').onclick = () => {
                        currTidTaskIdx = (currTidTaskIdx + 1) % klasseTidTasks.length;
                        renderKlasseTidTask();
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

    renderKlasseTidTask();
    tidBoejningPanel.appendChild(tidCard);
    panelsHolder.appendChild(tidBoejningPanel);

    const initialTab = (extraData && (extraData.subPath || extraData.activeTab || extraData.tab)) || 'tab_vrimmel';
    switchTab(initialTab);

    container.appendChild(viewContainer);
}
