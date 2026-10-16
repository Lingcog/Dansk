import { getTranslation, getLang } from '../utils/i18n.js';
import { verberWordTranslations } from '../utils/top100_verber_translations.js';
import { formatNounLinks, attachNounLinkListeners } from '../utils/nounQuickPeekModal.js';

/**
 * VerberHjemView - Didaktisk vrimlebillede for Scene 2: Hjemmet & Køkkenet
 * Dækker 20 højfrekvente verber for huslige handlinger, morgenrutiner og familiens gøremål.
 * 7 interaktive opgaveflader for maksimal pædagogisk progression.
 */
export function renderVerberHjemView(container, navigateFn, extraData = {}) {
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
        <h1>Scene 2: Hjemmet & Køkkenet</h1>
        <p>Lær 20 uundværlige hverdagsverber om madlavning, huslige gøremål og hyggelige rutiner i hjemmet.</p>
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
        history.pushState(null, '', '#/' + lang + '/verber_hjem/' + tabId);
        tabsMenu.querySelectorAll('.verber-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.verber-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- 20 VERBER I HJEMMET & KØKKENET med DATID
    // ========================================================
    const hjemVerber = [
        { word: 'at spise', nutid: 'spiser', datid: 'spiste', x: 48, y: 56, sentence: 'Pigen sidder ved bordet og spiser morgenmad.' },
        { word: 'at drikke', nutid: 'drikker', datid: 'drak', x: 55, y: 62, sentence: 'Hun drikker mælk af koppen.' },
        { word: 'at åbne', nutid: 'åbner', datid: 'åbnede', x: 30, y: 42, sentence: 'Manden åbner køleskabet for at tage mælk.' },
        { word: 'at lukke', nutid: 'lukker', datid: 'lukkede', x: 34, y: 35, sentence: 'Husk at lukke køleskabsdøren.' },
        { word: 'at gøre', nutid: 'gør', datid: 'gjorde', x: 18, y: 60, sentence: 'Kvinden gør morgenmaden klar.' },
        { word: 'at sidde', nutid: 'sidder', datid: 'sad', x: 84, y: 60, sentence: 'Bedstemor sidder i den bløde lænestol.' },
        { word: 'at stå', nutid: 'står', datid: 'stod', x: 20, y: 68, sentence: 'Kvinden står ved køkkenbordet og skærer brød.' },
        { word: 'at ligge', nutid: 'ligger', datid: 'lå', x: 88, y: 82, sentence: 'Katten ligger og sover på det varme gulvtæppe.' },
        { word: 'at lægge', nutid: 'lægger', datid: 'lagde', x: 14, y: 75, sentence: 'Hun lægger brødet i brødristeren.' },
        { word: 'at sætte', nutid: 'sætter', datid: 'satte', x: 74, y: 46, sentence: 'Manden sætter den fine blomstervase på reolen.' },
        { word: 'at holde', nutid: 'holder', datid: 'holdt', x: 82, y: 55, sentence: 'Hun holder den spændende bog i hænderne.' },
        { word: 'at tage', nutid: 'tager', datid: 'tog', x: 36, y: 44, sentence: 'Manden tager en karton mælk ud.' },
        { word: 'at give', nutid: 'giver', datid: 'gav', x: 45, y: 58, sentence: 'Faren giver sin datter en skål mysli.' },
        { word: 'at have', nutid: 'har', datid: 'havde', x: 10, y: 50, sentence: 'De har mange krydderier på hylden.' },
        { word: 'at være', nutid: 'er', datid: 'var', x: 62, y: 32, sentence: 'Pigen er vågen og strækker armene i soveværelset.' },
        { word: 'at lade', nutid: 'lader', datid: 'lod', x: 65, y: 25, sentence: 'Han lader døren til soveværelset stå åben.' },
        { word: 'at ringe', nutid: 'ringer', datid: 'ringede', x: 78, y: 28, sentence: 'Telefonen ringer inde fra værelset.' },
        { word: 'at dele', nutid: 'deler', datid: 'delte', x: 50, y: 65, sentence: 'Børnene deler det friske brød.' },
        { word: 'at falde', nutid: 'falder', datid: 'faldt', x: 92, y: 85, sentence: 'Katten falder i søvn i solskinnet.' },
        { word: 'at flytte', nutid: 'flytter', datid: 'flyttede', x: 70, y: 50, sentence: 'Han flytter vasen over på den lave hylde.' }
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
    pureBtn.innerHTML = `<span>🖼️</span> ${getTranslation('verber_pure_label')} <strong id="pure-mode-status-hjem-verb">${getTranslation('verber_status_off')}</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-hjem-verb').textContent = pureModeActive ? `${getTranslation('verber_status_on')} 🖼️` : getTranslation('verber_status_off');
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/verber_hjem_vrimmel.jpg';
    img.alt = 'Hjemmet og køkkenet vrimlebillede';
    stage.appendChild(img);

    // Detail card container
    const detailCard = document.createElement('div');
    detailCard.className = 'hotspot-detail-card';
    detailCard.style.display = 'none';

    // Create hotspots (20 velplacerede pegefelter)
    hjemVerber.forEach(item => {
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
                    <button class="listen-word-btn" id="listen-hjem-verb-btn">
                        <span>🔊</span> ${getTranslation('verber_listen_word')}
                    </button>
                </div>
            `;
            attachNounLinkListeners(detailCard, navigateFn, 'tab_vrimmel');

            detailCard.querySelector('#listen-hjem-verb-btn').onclick = () => {
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

    const hjemVisualMissions = [
        {
            title: "Mission 1 af 8",
            cropX: 20,
            cropY: 65,
            question: "Kig på kvinden ved køkkenbordet. Hvad gør hun?",
            options: [
                { text: "Skærer brød og gør morgenmad klar 🍞", correct: true },
                { text: "Sover på gulvet 🛌", correct: false },
                { text: "Cykler på gaden 🚲", correct: false }
            ]
        },
        {
            title: "Mission 2 af 8",
            cropX: 32,
            cropY: 40,
            question: "Kig på manden ved det store blå køleskab. Hvad gør han?",
            options: [
                { text: "Læser en avis 📖", correct: false },
                { text: "Åbner køleskabet og tager mælk ud 🥛", correct: true },
                { text: "Kaster en bold ⚽", correct: false }
            ]
        },
        {
            title: "Mission 3 af 8",
            cropX: 84,
            cropY: 60,
            question: "Kig på kvinden i den gule lænestol. Hvad gør hun?",
            options: [
                { text: "Sidder afslappet og læser i sin bog 📚", correct: true },
                { text: "Vasker op i hånden 🧼", correct: false },
                { text: "Løber stærkt 🏃", correct: false }
            ]
        },
        {
            title: "Mission 4 af 8",
            cropX: 62,
            cropY: 30,
            question: "Kig på personen i døråbningen til soveværelset. Hvad gør hun?",
            options: [
                { text: "Køber en togbillet 🎫", correct: false },
                { text: "Er lige vågnet og strækker armene 🌅", correct: true },
                { text: "Laver mad i en gryde 🍲", correct: false }
            ]
        },
        {
            title: "Mission 5 af 8",
            cropX: 48,
            cropY: 56,
            question: "Kig på personen der dækker bordet i spisestuen. Hvad gør personen?",
            options: [
                { text: "Sætter tallerkener og glas på bordet 🍽️", correct: true },
                { text: "Sover på gulvet 🛌", correct: false },
                { text: "Vasker en bil 🚗", correct: false }
            ]
        },
        {
            title: "Mission 6 af 8",
            cropX: 55,
            cropY: 62,
            question: "Kig på barnet der rækker skålen videre. Hvad gør barnet?",
            options: [
                { text: "Deler maden med sin familie 🥗", correct: true },
                { text: "Kaster maden ud af vinduet 🪟", correct: false },
                { text: "Løber en tur i skoven 🏃", correct: false }
            ]
        },
        {
            title: "Mission 7 af 8",
            cropX: 20,
            cropY: 68,
            question: "Kig på personen ved køkkenvasken. Hvad gør han?",
            options: [
                { text: "Står op og skyller grøntsager i vasken 🚰", correct: true },
                { text: "Flyver med en drage 🪁", correct: false },
                { text: "Kører på motorcykel 🏍️", correct: false }
            ]
        },
        {
            title: "Mission 8 af 8",
            cropX: 88,
            cropY: 82,
            question: "Kig på katten på det bløde tæppe ved sofaen. Hvad gør den?",
            options: [
                { text: "Ligger trygt og slapper af 🐈", correct: true },
                { text: "Cykler på to hjul 🚲", correct: false },
                { text: "Taler i mobiltelefon 📱", correct: false }
            ]
        }
    ];

    let currHjemVisualIdx = 0;
    const visualMissionCard = document.createElement('div');
    visualMissionCard.className = 'exercise-card';

    function renderHjemVisualMission() {
        visualMissionCard.innerHTML = '';
        const mission = hjemVisualMissions[currHjemVisualIdx];

        const badge = document.createElement('div');
        badge.className = 'mission-badge';
        badge.textContent = `${mission.title} • Visuel Detektiv`;
        visualMissionCard.appendChild(badge);

        // Zoom viewfinder frame
        const zoomFrame = document.createElement('div');
        zoomFrame.className = 'detective-zoom-frame';
        zoomFrame.style.backgroundImage = "url('assets/verber_hjem_vrimmel.jpg')";
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
                        <button class="mission-next-btn" id="next-visual-hjem-btn">
                            ${currHjemVisualIdx < hjemVisualMissions.length - 1 ? getTranslation('verber_next_mission') : getTranslation('verber_restart')}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-visual-hjem-btn').onclick = () => {
                        currHjemVisualIdx = (currHjemVisualIdx + 1) % hjemVisualMissions.length;
                        renderHjemVisualMission();
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

    renderHjemVisualMission();
    detektivPanel.appendChild(visualMissionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. TAB: FIND HANDLINGER I KONTEKST (Model 2)
    // ========================================================
    const handlingerPanel = document.createElement('div');
    handlingerPanel.className = 'verber-panel';
    handlingerPanel.dataset.panel = 'tab_handlinger';

    const hjemContextTasks = [
        {
            title: "Opgave 1 af 10: Morgenmad i køkkenet",
            prompt: "Find 3 handlinger, man gør ved morgenmaden i køkkenet:",
            targetCount: 3,
            options: [
                { text: "at spise 🥣", correct: true },
                { text: "at sove 🛌", correct: false },
                { text: "at drikke 🥛", correct: true },
                { text: "at køre bil 🚗", correct: false },
                { text: "at åbne (køleskab) 🚪", correct: true },
                { text: "at cykle 🚲", correct: false }
            ]
        },
        {
            title: "Opgave 2 af 10: Afslapning i stuen",
            prompt: "Find 3 handlinger, man gør for at slappe af i stuen:",
            targetCount: 3,
            options: [
                { text: "at løbe maraton 🏃", correct: false },
                { text: "at sidde 🛋️", correct: true },
                { text: "at ligge 🛏️", correct: true },
                { text: "at bygge vej 🔨", correct: false },
                { text: "at holde (en bog) 📖", correct: true },
                { text: "at købe billet 🎫", correct: false }
            ]
        },
        {
            title: "Opgave 3 af 10: Orden og ting i hjemmet",
            prompt: "Find 3 handlinger, man gør når man flytter og ordner ting i hjemmet:",
            targetCount: 3,
            options: [
                { text: "at sætte 🏺", correct: true },
                { text: "at lægge 📦", correct: true },
                { text: "at svømme 🏊", correct: false },
                { text: "at flytte 🛋️", correct: true },
                { text: "at flyve ✈️", correct: false },
                { text: "at danse opera 💃", correct: false }
            ]
        },
        {
            title: "Opgave 4 af 10: Tilberedning af måltider",
            prompt: "Find 3 handlinger, man gør når man laver mad i køkkenet:",
            targetCount: 3,
            options: [
                { text: "at lave mad 🍳", correct: true },
                { text: "at åbne en dåse 🥫", correct: true },
                { text: "at sove 🛌", correct: false },
                { text: "at smage på saucen 👅", correct: true },
                { text: "at cykle 🚲", correct: false },
                { text: "at danse 💃", correct: false }
            ]
        },
        {
            title: "Opgave 5 af 10: Kropsstillinger i hjemmet",
            prompt: "Find 3 handlinger, der beskriver hvordan kroppen placeres:",
            targetCount: 3,
            options: [
                { text: "at sidde 🪑", correct: true },
                { text: "at flyve ✈️", correct: false },
                { text: "at stå 🧍", correct: true },
                { text: "at svømme 🏊", correct: false },
                { text: "at ligge 🛌", correct: true },
                { text: "at male 🎨", correct: false }
            ]
        },
        {
            title: "Opgave 6 af 10: Placering og oprydning",
            prompt: "Find 3 handlinger, når man sætter ting på plads i hjemmet:",
            targetCount: 3,
            options: [
                { text: "at sætte en kop ☕", correct: true },
                { text: "at synge højt 🎤", correct: false },
                { text: "at lægge en bog 📖", correct: true },
                { text: "at græde 😢", correct: false },
                { text: "at tage tallerkener 🍽️", correct: true },
                { text: "at løbe maraton 🏃", correct: false }
            ]
        },
        {
            title: "Opgave 7 af 10: Døre, skabe og vinduer",
            prompt: "Find 3 handlinger med låger og vinduer i huset:",
            targetCount: 3,
            options: [
                { text: "at åbne 🚪", correct: true },
                { text: "at spise 🥪", correct: false },
                { text: "at lukke 🔐", correct: true },
                { text: "at holde døren 🚪", correct: true },
                { text: "at koge vand 🍲", correct: false },
                { text: "at bide 🦷", correct: false }
            ]
        },
        {
            title: "Opgave 8 af 10: Fællesskab og samtale ved bordet",
            prompt: "Find 3 handlinger, familien gør sammen under aftensmaden:",
            targetCount: 3,
            options: [
                { text: "at dele maden 🥗", correct: true },
                { text: "at sove 😴", correct: false },
                { text: "at give saltet videre 🧂", correct: true },
                { text: "at have det hyggeligt 🕯️", correct: true },
                { text: "at køre bil 🚗", correct: false },
                { text: "at svømme 🌊", correct: false }
            ]
        },
        {
            title: "Opgave 9 af 10: Kontakt til familie og venner",
            prompt: "Find 3 handlinger, man gør for at tale med bedsteforældrene:",
            targetCount: 3,
            options: [
                { text: "at ringe op 📞", correct: true },
                { text: "at stege kød 🥩", correct: false },
                { text: "at svare i telefonen 🗣️", correct: true },
                { text: "at tale sammen 💬", correct: true },
                { text: "at ligge i sengen 🛏️", correct: false },
                { text: "at bage brød 🍞", correct: false }
            ]
        },
        {
            title: "Opgave 10 af 10: Drikkevarer og forfriskninger",
            prompt: "Find 3 handlinger, når man slukker tørsten i køkkenet:",
            targetCount: 3,
            options: [
                { text: "at drikke vand 🥛", correct: true },
                { text: "at hælde kaffe op 🫖", correct: true },
                { text: "at tage et rent glas 🥤", correct: true },
                { text: "at hoppe 🦘", correct: false },
                { text: "at sove 🛌", correct: false },
                { text: "at tabe ting 💔", correct: false }
            ]
        }
    ];

    let currContextTaskIdx = 0;
    const contextCard = document.createElement('div');
    contextCard.className = 'exercise-card';

    function renderHjemContextTask() {
        contextCard.innerHTML = '';
        const task = hjemContextTasks[currContextTaskIdx];
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
                            <button class="mission-next-btn" id="next-context-hjem-btn">
                                ${currContextTaskIdx < hjemContextTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
                            </button>
                        `;
                        feedbackBox.querySelector('#next-context-hjem-btn').onclick = () => {
                            currContextTaskIdx = (currContextTaskIdx + 1) % hjemContextTasks.length;
                            renderHjemContextTask();
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

    renderHjemContextTask();
    handlingerPanel.appendChild(contextCard);
    panelsHolder.appendChild(handlingerPanel);

    // ========================================================
    // --- 4. TAB: HISTORIE (Byg en historie - INGEN TTS)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'verber-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const hjemStories = [
        {
            title: "1. En god morgen",
            steps: [
                {
                    q: "1. Hvad gør pigen da hun vågner?",
                    options: [
                        { text: "Hun strækker armene og står op 🌅", correct: true },
                        { text: "Hun svømmer i søen 🏊", correct: false },
                        { text: "Hun cykler i skoven 🚲", correct: false }
                    ]
                },
                {
                    q: "2. Hvad spiser hun ved spisebordet?",
                    options: [
                        { text: "Hun spiser en skål mysli med mælk 🥣", correct: true },
                        { text: "Hun spiser en bog 📖", correct: false },
                        { text: "Hun spiser en kuffert 🧳", correct: false }
                    ]
                },
                {
                    q: "3. Hvad drikker hun bagefter?",
                    options: [
                        { text: "Hun drikker et glas juice 🧃", correct: true },
                        { text: "Hun taber stolen 🪑", correct: false },
                        { text: "Hun råber ad døren 🚪", correct: false }
                    ]
                }
            ]
        },
        {
            title: "2. I køkkenet",
            steps: [
                {
                    q: "1. Hvad åbner faren for at finde mælk?",
                    options: [
                        { text: "Han åbner det store køleskab 🥛", correct: true },
                        { text: "Han åbner vinduet og hopper ud 🪟", correct: false },
                        { text: "Han åbner en skraldespand 🗑️", correct: false }
                    ]
                },
                {
                    q: "2. Hvad tager han ud af køleskabet?",
                    options: [
                        { text: "Han tager en karton kold mælk 🥛", correct: true },
                        { text: "Han tager en cykel ud 🚲", correct: false },
                        { text: "Han tager en sko ud 👟", correct: false }
                    ]
                },
                {
                    q: "3. Hvad giver han til sin datter?",
                    options: [
                        { text: "Han giver hende et glas mælk 🥛", correct: true },
                        { text: "Han kaster mælken på gulvet ❌", correct: false },
                        { text: "Han gemmer sig i skabet 🙈", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. Læsestund i stuen",
            steps: [
                {
                    q: "1. Hvor sidder bedstemor henne?",
                    options: [
                        { text: "Hun sidder i den bløde lænestol 🛋️", correct: true },
                        { text: "Hun sidder på taget ⛺", correct: false },
                        { text: "Hun svømmer under bordet 🏊", correct: false }
                    ]
                },
                {
                    q: "2. Hvad holder hun i sine hænder?",
                    options: [
                        { text: "Hun holder en god bog 📖", correct: true },
                        { text: "Hun holder en hammer 🔨", correct: false },
                        { text: "Hun holder en bil 🚗", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør katten ved hendes fødder?",
                    options: [
                        { text: "Katten ligger og sover på tæppet 🐱", correct: true },
                        { text: "Katten flyver væk 🦅", correct: false },
                        { text: "Katten laver mad 🍳", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. Oprydning og pynt",
            steps: [
                {
                    q: "1. Hvad flytter manden over på hylden?",
                    options: [
                        { text: "Han flytter en smuk blomstervase 🌸", correct: true },
                        { text: "Han flytter et helt hus 🏠", correct: false },
                        { text: "Han flytter et tog 🚆", correct: false }
                    ]
                },
                {
                    q: "2. Hvor sætter han vasen?",
                    options: [
                        { text: "Han sætter den forsigtigt på reolen 📚", correct: true },
                        { text: "Han kaster den ud ad vinduet 🗑️", correct: false },
                        { text: "Han gemmer den i ovnen 🍕", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør han da han er færdig?",
                    options: [
                        { text: "Han smiler og beundrer stuen 😊", correct: true },
                        { text: "Han løber sin vej 🏃", correct: false },
                        { text: "Han sover på bordet 😴", correct: false }
                    ]
                }
            ]
        },
        {
            title: "5. Pandekager en søndag",
            steps: [
                {
                    q: "1. Hvad laver far og datter i køkkenet søndag formiddag?",
                    options: [
                        { text: "De rører en stor skål pandekagedej sammen 🥞", correct: true },
                        { text: "De bygger en murstensvæg 🧱", correct: false },
                        { text: "De reparerer en cykel på bordet 🚲", correct: false }
                    ]
                },
                {
                    q: "2. Hvad åbner datteren for at hente frisk mælk?",
                    options: [
                        { text: "Hun åbner det kolde køleskab 🥛", correct: true },
                        { text: "Hun åbner kaminen 🔥", correct: false },
                        { text: "Hun åbner en paraply ☂️", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør de, da pandekagerne er bagt gyldne?",
                    options: [
                        { text: "De sætter sig ved spisebordet og spiser med syltetøj 🍓", correct: true },
                        { text: "De kaster dem ud i haven 🌳", correct: false },
                        { text: "De gemmer dem under sengen 🛏️", correct: false }
                    ]
                }
            ]
        },
        {
            title: "6. En varm kop aften-te",
            steps: [
                {
                    q: "1. Hvad koger moren i elkanden efter aftensmaden?",
                    options: [
                        { text: "Hun koger vand til en beroligende kop te 🫖", correct: true },
                        { text: "Hun koger havvand 🌊", correct: false },
                        { text: "Hun koger sten 🪨", correct: false }
                    ]
                },
                {
                    q: "2. Hvor sætter hun sig for at slappe af?",
                    options: [
                        { text: "Hun sætter sig i den bløde lænestol i stuen 🛋️", correct: true },
                        { text: "Hun sætter sig på tagryggen 🏠", correct: false },
                        { text: "Hun sætter sig i en vandpyt 🌧️", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør hun, mens hun drikker sin te?",
                    options: [
                        { text: "Hun læser et kapitel i en god bog 📖", correct: true },
                        { text: "Hun spiller trommer 🥁", correct: false },
                        { text: "Hun støvsuger haven 🌾", correct: false }
                    ]
                }
            ]
        },
        {
            title: "7. Oprydning efter festen",
            steps: [
                {
                    q: "1. Hvad gør forældrene, efter fødselsdagsgæsterne er gået hjem?",
                    options: [
                        { text: "De tager tallerkener og fade af bordet 🍽️", correct: true },
                        { text: "De hopper på spisebordet 🤾", correct: false },
                        { text: "De sover under sofaen 🛋️", correct: false }
                    ]
                },
                {
                    q: "2. Hvor lægger de det rene viskestykke?",
                    options: [
                        { text: "De lægger det pænt ved siden af vasken 🧽", correct: true },
                        { text: "De kaster det i ovnen 🔥", correct: false },
                        { text: "De smider det ud af vinduet 🪟", correct: false }
                    ]
                },
                {
                    q: "3. Hvad lukker de omhyggeligt, inden de går i seng?",
                    options: [
                        { text: "De lukker vinduet og låser hoveddøren 🚪", correct: true },
                        { text: "De lukker øjnene og danser 💃", correct: false },
                        { text: "De lukker for radioen med en hammer 🔨", correct: false }
                    ]
                }
            ]
        },
        {
            title: "8. Telefonopkaldet til mormor",
            steps: [
                {
                    q: "1. Hvem ringer barnebarnet til om eftermiddagen?",
                    options: [
                        { text: "Han ringer op til sin mormor på landet 👵", correct: true },
                        { text: "Han ringer til politiet for sjov 🚓", correct: false },
                        { text: "Han ringer til julemanden 🎅", correct: false }
                    ]
                },
                {
                    q: "2. Hvad fortæller han glad om i telefonen?",
                    options: [
                        { text: "Han fortæller om sin gode dag og en ny ven 💬", correct: true },
                        { text: "Han hvisker hemmeligheder til en plante 🪴", correct: false },
                        { text: "Han råber ad fjernsynet 📺", correct: false }
                    ]
                },
                {
                    q: "3. Hvad aftaler de to at gøre i næste weekend?",
                    options: [
                        { text: "De aftaler at bage kanelsnegle sammen 🥐", correct: true },
                        { text: "De aftaler at flyve til månen 🌕", correct: false },
                        { text: "De aftaler at bygge en ubåd 🚤", correct: false }
                    ]
                }
            ]
        }
    ];

    let currHjemStoryIdx = 0;
    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';

    function renderActiveHjemStory() {
        storyContainer.innerHTML = '';
        const story = hjemStories[currHjemStoryIdx];

        const navBar = document.createElement('div');
        navBar.className = 'story-nav-pills';
        hjemStories.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = `story-nav-btn ${idx === currHjemStoryIdx ? 'active' : ''}`;
            btn.textContent = `Historie ${idx + 1}`;
            btn.onclick = () => {
                currHjemStoryIdx = idx;
                renderActiveHjemStory();
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
            stepCard.id = `hjem-step-${sIdx}`;
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

                        const nextCard = stepsHolder.querySelector(`#hjem-step-${sIdx + 1}`);
                        if (nextCard) {
                            nextCard.style.opacity = '1';
                            nextCard.style.pointerEvents = 'auto';
                            nextCard.classList.add('active-step');
                        } else {
                            const completeBox = storyContainer.querySelector('#hjem-story-complete');
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
        completeBox.id = 'hjem-story-complete';
        completeBox.className = 'story-explanation-box';
        completeBox.style.display = 'none';
        completeBox.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: #4ade80;">
                ${getTranslation('verber_story_complete')}
            </div>
            <button class="mission-next-btn" id="next-hjem-story-btn">
                ${currHjemStoryIdx < hjemStories.length - 1 ? getTranslation('verber_next_story') : getTranslation('verber_restart')}
            </button>
        `;
        storyContainer.appendChild(completeBox);

        completeBox.querySelector('#next-hjem-story-btn').onclick = () => {
            currHjemStoryIdx = (currHjemStoryIdx + 1) % hjemStories.length;
            renderActiveHjemStory();
        };
    }

    renderActiveHjemStory();
    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 5. TAB: SYNONYMER & ANTONYMER (INGEN TTS)
    // ========================================================
    const synonymPanel = document.createElement('div');
    synonymPanel.className = 'verber-panel';
    synonymPanel.dataset.panel = 'tab_synonym_antonym';

    const hjemSynonymTasks = [
        {
            type: 'antonym',
            word: 'at åbne',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at lukke 🚪', correct: true },
                { text: 'at se 👀', correct: false },
                { text: 'at drikke 🥛', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at sidde',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at stå 🧍', correct: true },
                { text: 'at sove 🛌', correct: false },
                { text: 'at spise 🍽️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at give',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at tage 🤲', correct: true },
                { text: 'at smile 😊', correct: false },
                { text: 'at bage 🥐', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at sætte',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at placere 🏺', correct: true },
                { text: 'at tabe ❌', correct: false },
                { text: 'at råbe 📢', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at lave mad',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at tilberede 🍳', correct: true },
                { text: 'at vaske tøj 🧺', correct: false },
                { text: 'at sove 😴', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at lave mad',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at tilberede mad 🍳', correct: true },
                { text: 'at sove 🛌', correct: false },
                { text: 'at cykle 🚲', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at åbne',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at lukke 🚪', correct: true },
                { text: 'at kigge 👀', correct: false },
                { text: 'at hente 🛍️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at give',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at modtage / tage 🤲', correct: true },
                { text: 'at smile 😊', correct: false },
                { text: 'at gå 🚶', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at sidde',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at tage plads på 🪑', correct: true },
                { text: 'at løbe 🏃', correct: false },
                { text: 'at koge 🍲', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at stå',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at ligge / sidde 🛌', correct: true },
                { text: 'at råbe 📢', correct: false },
                { text: 'at spise 🍽️', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at ringe',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at telefonere 📞', correct: true },
                { text: 'at male 🎨', correct: false },
                { text: 'at sove 😴', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at sætte',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at fjerne / tage væk ❌', correct: true },
                { text: 'at stille 🥛', correct: false },
                { text: 'at kigge 👀', correct: false }
            ]
        }
    ];

    let currHjemSynonymIdx = 0;
    const synonymCard = document.createElement('div');
    synonymCard.className = 'synonym-card';

    function renderHjemSynonymTask() {
        synonymCard.innerHTML = '';
        const task = hjemSynonymTasks[currHjemSynonymIdx];

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
                        <button class="mission-next-btn" id="next-hjem-synonym-btn">
                            ${currHjemSynonymIdx < hjemSynonymTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-hjem-synonym-btn').onclick = () => {
                        currHjemSynonymIdx = (currHjemSynonymIdx + 1) % hjemSynonymTasks.length;
                        renderHjemSynonymTask();
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

    renderHjemSynonymTask();
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
                <h3 style="font-size: 1.7rem; color: white; margin-bottom: 0.4rem;">Byg dine egne sætninger i hjemmet og køkkenet</h3>
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

            <div id="free-builder-rows-hjem-verb"></div>

            <!-- Live Output Sentence -->
            <div class="sb-live-box">
                <div class="sb-live-label">Din samlede sætning</div>
                <div class="sb-live-sentence" id="free-live-sentence-hjem-verb"></div>
                <button class="sb-listen-btn" id="free-listen-btn-hjem-verb">
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
                options: ['Faren', 'Moren', 'Pigen', 'Drengen', 'Bedstemor', 'Katten', 'Gæsten', 'Familien']
            },
            {
                id: 'verbum',
                title: '2. Hvad laver personen / dyret?',
                role: 'Verbum (Kernen)',
                catClass: 'sb-cat-verbum',
                badgeClass: 'badge-cat-verbum',
                icon: '⚡',
                options: ['spiser', 'drikker', 'laver', 'åbner', 'sidder i', 'tager', 'deler', 'koger']
            },
            {
                id: 'objekt',
                title: '3. Hvilken genstand eller ting?',
                role: 'Objekt (Ting)',
                catClass: 'sb-cat-objekt',
                badgeClass: 'badge-cat-objekt',
                icon: '📦',
                options: ['en kop kaffe', 'morgenmad', 'mad', 'køleskabet', 'en kold mælk', 'en kage', 'vand', 'en lænestol']
            },
            {
                id: 'sted',
                title: '4. Hvor i hjemmet sker det?',
                role: 'Sted (Rum)',
                catClass: 'sb-cat-sted',
                badgeClass: 'badge-cat-sted',
                icon: '📍',
                options: ['i køkkenet', 'ved bordet', 'i stuen', 'ved ovnen', 'på stolen', 'i hjemmet', 'ved vasken', 'i sofaen']
            }
        ];

        let selected = ['Faren', 'drikker', 'en kop kaffe', 'ved bordet'];

        const rowsContainer = freeBuilderContainer.querySelector('#free-builder-rows-hjem-verb');
        const liveSentenceEl = freeBuilderContainer.querySelector('#free-live-sentence-hjem-verb');
        const listenBtn = freeBuilderContainer.querySelector('#free-listen-btn-hjem-verb');

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
    const hjemChallengeTasks = [
        {
            context: "Faren står tidligt op og tænder for kaffemaskinen i køkkenet.",
            subjekt: "Faren",
            objekt: "en kop varm kaffe",
            sted: "ved bordet",
            questionPrompt: "Hvad gør Faren med en kop varm kaffe ved bordet?",
            correctVerb: "drikker",
            distractors: ["sover", "cykler", "kaster"],
            pedagogyNote: "Man drikker kaffe, te og vand, når man er tørstig."
        },
        {
            context: "Morgenmaden er serveret, og pigen har fået sin skål havregryn.",
            subjekt: "Pigen",
            objekt: "sin morgenmad",
            sted: "i køkkenet",
            questionPrompt: "Hvad gør Pigen med sin morgenmad i køkkenet?",
            correctVerb: "spiser",
            distractors: ["kører", "åbner", "flytter"],
            pedagogyNote: "Man spiser mad for at få energi til dagen."
        },
        {
            context: "Drengen er sulten efter skole og skal finde mælken frem.",
            subjekt: "Drengen",
            objekt: "det kolde køleskab",
            sted: "i køkkenet",
            questionPrompt: "Hvad gør Drengen med det kolde køleskab i køkkenet?",
            correctVerb: "åbner",
            distractors: ["drikker", "sidder", "læser"],
            pedagogyNote: "Man åbner køleskabet for at tage mad og drikke ud."
        },
        {
            context: "Bedstemor har taget en god bog frem for at slappe af i stuen.",
            subjekt: "Bedstemor",
            objekt: "den bløde lænestol",
            sted: "i stuen",
            questionPrompt: "Hvad gør Bedstemor i den bløde lænestol i stuen?",
            correctVerb: "sidder i",
            distractors: ["koger", "steger", "løber"],
            pedagogyNote: "Man sidder i en lænestol, når man vil hvile sig."
        },
        {
            context: "Manden står ved det åbne køleskab og mangler mælk til kaffen.",
            subjekt: "Manden",
            objekt: "en kold mælk",
            sted: "fra køleskabet",
            questionPrompt: "Hvad gør Manden med en kold mælk fra køleskabet?",
            correctVerb: "tager",
            distractors: ["sover", "kører", "falder"],
            pedagogyNote: "Man tager en genstand med hånden."
        },
        {
            context: "Moren har fået smukke blomster og vil pynte stuen op.",
            subjekt: "Moren",
            objekt: "en flot vase",
            sted: "på reolen",
            questionPrompt: "Hvad gør Moren med en flot vase på reolen?",
            correctVerb: "sætter",
            distractors: ["drikker", "spiser", "åbner"],
            pedagogyNote: "Man sætter en vase eller kop ned på en flade."
        },
        {
            context: "Kagen er nybagt og dufter dejligt, og alle vil have et stykke.",
            subjekt: "Familien",
            objekt: "den varme kage",
            sted: "ved spisebordet",
            questionPrompt: "Hvad gør Familien med den varme kage ved spisebordet?",
            correctVerb: "deler",
            distractors: ["lukker", "ringer", "står"],
            pedagogyNote: "Når man deler, får alle et stykke af kagen."
        },
        {
            context: "Efter en god skål mad hviler den lille kat sig på det varme tæppe.",
            subjekt: "Katten",
            objekt: "på gulvtæppet",
            sted: "i stuen",
            questionPrompt: "Hvad gør Katten på gulvtæppet i stuen?",
            correctVerb: "ligger",
            distractors: ["koger", "drikker", "åbner"],
            pedagogyNote: "Katte ligger ned og sover, når de er mætte og trygge."
        }
    ];

    let currentHjemChallengeIdx = 0;
    const completedHjemChallenges = new Set();

    function setupHjemChallenge() {
        challengeContainer.innerHTML = '';
        const task = hjemChallengeTasks[currentHjemChallengeIdx];

        // Header with pills
        const header = document.createElement('div');
        header.className = 'sb-task-header';

        const titleDiv = document.createElement('div');
        titleDiv.innerHTML = `
            <div style="font-size: 0.85rem; color: #f87171; font-weight: 800; text-transform: uppercase;">
                Udfordring ${currentHjemChallengeIdx + 1} af ${hjemChallengeTasks.length}
            </div>
            <h3 style="font-size: 1.5rem; color: white; margin: 0.2rem 0;">Find handlingen & saml puslespillet</h3>
        `;
        header.appendChild(titleDiv);

        const pills = document.createElement('div');
        pills.className = 'sb-task-pills';
        hjemChallengeTasks.forEach((_, idx) => {
            const pill = document.createElement('div');
            pill.className = `sb-task-pill ${idx === currentHjemChallengeIdx ? 'active' : ''} ${completedHjemChallenges.has(idx) ? 'done' : ''}`;
            pill.textContent = idx + 1;
            pill.onclick = () => {
                currentHjemChallengeIdx = idx;
                setupHjemChallenge();
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
                    renderHjemPuzzleStep(puzzleContainer, task);
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
    function renderHjemPuzzleStep(container, task) {
        container.innerHTML = `
            <div class="sb-puzzle-title">
                <span>🧩</span> Trin 2: Puslespillet – Saml hele sætningen!
            </div>
            <div class="sb-puzzle-desc">
                Klik på brikkerne i den rigtige danske ordstilling: <strong>1. Hvem ➔ 2. Handling (V2) ➔ 3. Hvilken ting ➔ 4. Hvor</strong>.
            </div>

            <!-- 4 Slots -->
            <div class="sb-puzzle-slots" id="hjem-puzzle-slots-verb">
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
            <div class="sb-puzzle-bank" id="hjem-puzzle-bank-verb"></div>

            <!-- Feedback -->
            <div class="sb-feedback-box" id="hjem-puzzle-feedback-verb"></div>
        `;

        const correctOrder = [task.subjekt, task.correctVerb, task.objekt, task.sted];
        const scrambledWords = [...correctOrder].sort(() => Math.random() - 0.5);

        let placedSlots = [null, null, null, null];

        const slotsEl = container.querySelector('#hjem-puzzle-slots-verb');
        const bankEl = container.querySelector('#hjem-puzzle-bank-verb');
        const feedbackEl = container.querySelector('#hjem-puzzle-feedback-verb');

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
                completedHjemChallenges.add(currentHjemChallengeIdx);
                speakDanish(fullSentence);

                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg success">
                        ${getTranslation('verber_sb_success')} "<strong>${fullSentence}</strong>" ✓
                    </div>
                    <div style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.8rem;">
                        💡 ${task.pedagogyNote}
                    </div>
                    <div class="sb-action-row">
                        <button class="sb-listen-btn" id="hjem-listen-full-verb">
                            <span>🔊</span> Hør sætningen igen
                        </button>
                        <button class="sb-action-btn" id="hjem-next-btn-verb">
                            ${currentHjemChallengeIdx < hjemChallengeTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
                        </button>
                    </div>
                `;

                feedbackEl.querySelector('#hjem-listen-full-verb').onclick = () => speakDanish(fullSentence);
                feedbackEl.querySelector('#hjem-next-btn-verb').onclick = () => {
                    currentHjemChallengeIdx = (currentHjemChallengeIdx + 1) % hjemChallengeTasks.length;
                    setupHjemChallenge();
                };
            } else {
                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg error">
                        ${getTranslation('verber_sb_order_error')}
                    </div>
                    <div style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.6rem;">
                        ${getTranslation('verber_sb_order_reminder')}
                    </div>
                    <button class="sb-action-btn" id="hjem-retry-btn-verb" style="background: #475569;">
                        ${getTranslation('verber_sb_reset')}
                    </button>
                `;

                feedbackEl.querySelector('#hjem-retry-btn-verb').onclick = () => {
                    placedSlots = [null, null, null, null];
                    updateSlotsAndBank();
                };
            }
        }

        updateSlotsAndBank();
    }

    // Initialize both sub-tabs
    setupFreeBuilder();
    setupHjemChallenge();
    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    // ========================================================
    // --- 7. TAB: NUTID & DATID (Tidsmarkør-træning - INGEN TTS)
    // ========================================================
    const tidBoejningPanel = document.createElement('div');
    tidBoejningPanel.className = 'verber-panel';
    tidBoejningPanel.dataset.panel = 'tab_tid_boejning';

    const hjemTidTasks = [
        {
            marker: "I morges",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I morges",
            sentenceAfter: "manden mælken ud af køleskabet.",
            baseVerb: "at tage",
            options: [
                { text: "tog", form: "Datid", correct: true },
                { text: "tager", form: "Nutid", correct: false }
            ],
            explanation: '"I morges" viser, at handlingen skete tidligere (fortid), så verbet skal stå i datid (tog).'
        },
        {
            marker: "Lige nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Lige nu",
            sentenceAfter: "pigen ved spisebordet og spiser.",
            baseVerb: "at sidde",
            options: [
                { text: "sidder", form: "Nutid", correct: true },
                { text: "sad", form: "Datid", correct: false }
            ],
            explanation: '"Lige nu" viser, at handlingen sker i dette øjeblik, så verbet skal stå i nutid (sidder).'
        },
        {
            marker: "I går",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I går",
            sentenceAfter: "kvinden aftensmaden klar klokken seks.",
            baseVerb: "at gøre",
            options: [
                { text: "gjorde", form: "Datid", correct: true },
                { text: "gør", form: "Nutid", correct: false }
            ],
            explanation: '"I går" viser, at handlingen skete i fortiden, så verbet skal stå i datid (gjorde).'
        },
        {
            marker: "Hver morgen",
            hint: "peger på en vane / nutid ➔ Nutid",
            sentenceBefore: "Hver morgen",
            sentenceAfter: "han en kop varm kaffe i køkkenet.",
            baseVerb: "at drikke",
            options: [
                { text: "drikker", form: "Nutid", correct: true },
                { text: "drak", form: "Datid", correct: false }
            ],
            explanation: '"Hver morgen" viser en gentagen vane i nutid, så verbet skal stå i nutid (drikker).'
        },
        {
            marker: "I går aftes",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I går aftes",
            sentenceAfter: "katten på det bløde gulvtæppe.",
            baseVerb: "at ligge",
            options: [
                { text: "lå", form: "Datid", correct: true },
                { text: "ligger", form: "Nutid", correct: false }
            ],
            explanation: '"I går aftes" viser en afsluttet handling i fortiden, så verbet skal stå i datid (lå).'
        },
        {
            marker: "Nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Nu",
            sentenceAfter: "familien dejlig morgenmad sammen.",
            baseVerb: "at spise",
            options: [
                { text: "spiser", form: "Nutid", correct: true },
                { text: "spiste", form: "Datid", correct: false }
            ],
            explanation: '"Nu" angiver nutid, så verbet skal stå i nutid (spiser).'
        },
        {
            marker: "I aftes",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I aftes",
            sentenceAfter: "mor en lækker grøntsagssuppe til os alle.",
            baseVerb: "at lave mad",
            options: [
                { text: "lavede", form: "Datid", correct: true },
                { text: "laver", form: "Nutid", correct: false }
            ],
            explanation: '"I aftes" viser fortid, så verbet skal stå i datid (lavede).'
        },
        {
            marker: "Lige nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Lige nu",
            sentenceAfter: "katten og sover i den bløde sofa.",
            baseVerb: "at ligge",
            options: [
                { text: "ligger", form: "Nutid", correct: true },
                { text: "lå", form: "Datid", correct: false }
            ],
            explanation: '"Lige nu" viser nutid, så verbet skal stå i nutid (ligger).'
        },
        {
            marker: "For en time siden",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "For en time siden",
            sentenceAfter: "de døren til haven op for at lufte ud.",
            baseVerb: "at åbne",
            options: [
                { text: "åbnede", form: "Datid", correct: true },
                { text: "åbner", form: "Nutid", correct: false }
            ],
            explanation: '"For en time siden" angiver fortid, så verbet skal stå i datid (åbnede).'
        },
        {
            marker: "Hver morgen",
            hint: "peger på en vane / nutid ➔ Nutid",
            sentenceBefore: "Hver morgen",
            sentenceAfter: "hun et stort glas koldt vand før morgenmaden.",
            baseVerb: "at drikke",
            options: [
                { text: "drikker", form: "Nutid", correct: true },
                { text: "drak", form: "Datid", correct: false }
            ],
            explanation: '"Hver morgen" udtrykker en vane i nutid, så verbet skal stå i nutid (drikker).'
        },
        {
            marker: "I morges",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I morges",
            sentenceAfter: "drengen sin varme jakke på før han gik ud.",
            baseVerb: "at tage",
            options: [
                { text: "tog", form: "Datid", correct: true },
                { text: "tager", form: "Nutid", correct: false }
            ],
            explanation: '"I morges" peger på fortid, så verbet skal stå i datid (tog).'
        },
        {
            marker: "I dette øjeblik",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "I dette øjeblik",
            sentenceAfter: "telefonen ude i entréen.",
            baseVerb: "at ringe",
            options: [
                { text: "ringer", form: "Nutid", correct: true },
                { text: "ringede", form: "Datid", correct: false }
            ],
            explanation: '"I dette øjeblik" angiver nutid, så verbet skal stå i nutid (ringer).'
        }
    ];

    let currTidTaskIdx = 0;
    const tidCard = document.createElement('div');
    tidCard.className = 'exercise-card';

    function renderHjemTidTask() {
        tidCard.innerHTML = '';
        const task = hjemTidTasks[currTidTaskIdx];

        const badge = document.createElement('div');
        badge.className = 'time-marker-badge';
        badge.textContent = `Opgave ${currTidTaskIdx + 1} af ${hjemTidTasks.length} • Tidsmarkør: "${task.marker}"`;
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
                        <button class="mission-next-btn" id="next-tid-hjem-btn">
                            ${currTidTaskIdx < hjemTidTasks.length - 1 ? getTranslation('verber_next_task') : getTranslation('verber_restart')}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-tid-hjem-btn').onclick = () => {
                        currTidTaskIdx = (currTidTaskIdx + 1) % hjemTidTasks.length;
                        renderHjemTidTask();
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

    renderHjemTidTask();
    tidBoejningPanel.appendChild(tidCard);
    panelsHolder.appendChild(tidBoejningPanel);

    const initialTab = (extraData && (extraData.subPath || extraData.activeTab || extraData.tab)) || 'tab_vrimmel';
    switchTab(initialTab);

    container.appendChild(viewContainer);
}
