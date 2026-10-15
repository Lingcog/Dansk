import { getTranslation, getLang } from '../utils/i18n.js';
import { formatNounLinks, attachNounLinkListeners } from '../utils/nounQuickPeekModal.js';

/**
 * VerberByrumView - Didaktisk vrimlebillede for Scene 1: Byrummet & Gaden
 * Dækker 20 højfrekvente verber for bevægelse, gadeliv og sociale handlinger.
 * 7 interaktive opgaveflader for maksimal pædagogisk progression.
 */
export function renderVerberByrumView(container, navigateFn, extraData = {}) {
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

    // Return banner if navigated from Substantivfladen (e.g. Byrummet)
    if (extraData && extraData.returnView) {
        const returnBanner = document.createElement('div');
        returnBanner.className = 'verb-return-nav-banner';
        const cleanName = extraData.targetVerb ? extraData.targetVerb.replace(/^at\s+/, '') : '';
        const targetTitle = cleanName ? `Du undersøger verbet: "at ${cleanName}"` : 'Velkommen til Verbumfladen';
        returnBanner.innerHTML = `
            <div class="vrn-left">
                <span class="vrn-pill">🔴 Verbum-flade</span>
                <div class="vrn-text">
                    <span class="vrn-title"><strong>${targetTitle}</strong></span>
                    <span class="vrn-sub">Se handlingen på billedet nedenfor med nutid og datid.</span>
                </div>
            </div>
            <button class="vrn-back-btn" id="vrn-back-to-substantiv">
                ⬅ Tilbage til ${extraData.returnLabel || 'Byrummet (Substantiver)'}
            </button>
        `;
        returnBanner.querySelector('#vrn-back-to-substantiv').onclick = () => {
            navigateFn(extraData.returnView, { activeTab: extraData.returnTab || 'tab_vrimmel' });
        };
        viewContainer.appendChild(returnBanner);
    }

    // TTS Audio Helper (KUN brugt til målordet i Tab 1)
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // State tracking across tabs and exercises
    let currentTab = 'tab_vrimmel';
    let currByrumVisualIdx = 0;
    let currentByrumChallengeIdx = 0;

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .verber-vrimmel-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }

        .verb-return-nav-banner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.22), rgba(15, 23, 42, 0.95));
            border: 1.5px solid rgba(239, 68, 68, 0.55);
            border-radius: 16px;
            padding: 0.9rem 1.4rem;
            margin-bottom: 1.8rem;
            gap: 1rem;
            flex-wrap: wrap;
            box-shadow: 0 4px 20px rgba(239, 68, 68, 0.25);
            animation: fadeIn 0.3s ease;
        }
        .vrn-left {
            display: flex;
            align-items: center;
            gap: 0.9rem;
        }
        .vrn-pill {
            background: #ef4444;
            color: white;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.35rem 0.75rem;
            border-radius: 20px;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
        }
        .vrn-text {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }
        .vrn-title {
            font-size: 1.1rem;
            color: #f8fafc;
        }
        .vrn-sub {
            font-size: 0.88rem;
            color: #cbd5e1;
        }
        .vrn-back-btn {
            background: #0f172a;
            border: 1.5px solid #ef4444;
            color: #fca5a5;
            padding: 0.65rem 1.25rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .vrn-back-btn:hover {
            background: #ef4444;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
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
        <h1>Scene 1: Byrummet & Gaden</h1>
        <p>Lær 20 uundværlige hverdagsverber om bevægelse, transport og sociale møder i byens gader.</p>
    `;
    viewContainer.appendChild(heroHeader);

    // 7 Tabs Navigation
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'verber-tabs';
    const tabs = [
        { id: 'tab_vrimmel', label: '1. Vrimlebillede', icon: '🔍' },
        { id: 'tab_detektiv', label: '2. Visuel Detektiv', icon: '🕵️' },
        { id: 'tab_handlinger', label: '3. Find handlinger', icon: '🎯' },
        { id: 'tab_historie', label: '4. Historie', icon: '💭' },
        { id: 'tab_synonym_antonym', label: '5. Synonymer & Antonymer', icon: '🔄' },
        { id: 'tab_saetning', label: '6. Sætningsbygger', icon: '✍️' },
        { id: 'tab_tid_boejning', label: '7. Nutid & Datid', icon: '⏱️' }
    ];

    currentTab = 'tab_vrimmel';

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
        tabsMenu.querySelectorAll('.verber-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.verber-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- 20 VERBER I BYRUMMET & GADEN med DATID
    // ========================================================
    const byrumVerber = [
        { word: 'at gå', nutid: 'går', datid: 'gik', x: 60, y: 48, sentence: 'Folk går på den hyggelige gågade.' },
        { word: 'at komme', nutid: 'kommer', datid: 'kom', x: 85, y: 26, sentence: 'Den blå bybus kommer kørende.' },
        { word: 'at møde', nutid: 'møder', datid: 'mødte', x: 47, y: 46, sentence: 'De to venner møder hinanden på gaden.' },
        { word: 'at køre', nutid: 'kører', datid: 'kørte', x: 82, y: 28, sentence: 'Bussen kører gennem byen.' },
        { word: 'at cykle', nutid: 'cykler', datid: 'cyklede', x: 35, y: 68, sentence: 'Manden cykler sikkert på cykelstien.' },
        { word: 'at stoppe', nutid: 'stopper', datid: 'stoppede', x: 78, y: 44, sentence: 'Manden stopper ved fodgængerfeltet.' },
        { word: 'at vente', nutid: 'venter', datid: 'ventede', x: 67, y: 72, sentence: 'Kvinden venter tålmodigt på bænken.' },
        { word: 'at kigge', nutid: 'kigger', datid: 'kiggede', x: 27, y: 48, sentence: 'Kvinden kigger ind ad butiksvinduet.' },
        { word: 'at se', nutid: 'ser', datid: 'så', x: 85, y: 76, sentence: 'Hun ser de flotte farverige blomster.' },
        { word: 'at smile', nutid: 'smiler', datid: 'smilede', x: 50, y: 44, sentence: 'Vennerne smiler til hinanden da de ses.' },
        { word: 'at hente', nutid: 'henter', datid: 'hentede', x: 16, y: 56, sentence: 'Hun henter frisk brød og grøntsager i butikken.' },
        { word: 'at bringe', nutid: 'bringer', datid: 'bragte', x: 52, y: 84, sentence: 'Drengen bringer et brev til den røde postkasse.' },
        { word: 'at finde', nutid: 'finder', datid: 'fandt', x: 88, y: 82, sentence: 'Pigen finder en flot buket blomster.' },
        { word: 'at miste', nutid: 'mister', datid: 'mistede', x: 74, y: 48, sentence: 'Pas på ikke at miste din pung i menneskemængden!' },
        { word: 'at passe', nutid: 'passer', datid: 'passede', x: 38, y: 75, sentence: 'Cyklisten passer godt på fodgængerne.' },
        { word: 'at hjælpe', nutid: 'hjælper', datid: 'hjalp', x: 8, y: 60, sentence: 'Ekspedienten hjælper kunden i butikken.' },
        { word: 'at følge', nutid: 'følger', datid: 'fulgte', x: 62, y: 45, sentence: 'Parret følger hinanden hen ad fortovet.' },
        { word: 'at ske', nutid: 'sker', datid: 'skete', x: 50, y: 35, sentence: 'Der sker mange spændende ting i byen.' },
        { word: 'at handle', nutid: 'handler', datid: 'handlede', x: 6, y: 52, sentence: 'Mange mennesker handler i de små butikker.' },
        { word: 'at bo', nutid: 'bor', datid: 'boede', x: 60, y: 15, sentence: 'Mange familier bor i de smukke byhuse.' }
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
    pureBtn.innerHTML = `<span>🖼️</span> Se rent billede: <strong id="pure-mode-status-byrum-verb">FRA</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-byrum-verb').textContent = pureModeActive ? 'TIL 🖼️' : 'FRA';
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/verber_byrum_vrimmel.jpg';
    img.alt = 'Byrummet og gaden vrimlebillede';
    stage.appendChild(img);

    // Detail card container
    const detailCard = document.createElement('div');
    detailCard.className = 'hotspot-detail-card';
    detailCard.style.display = 'none';

    // Create hotspots (20 velplacerede pegefelter)
    byrumVerber.forEach(item => {
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
            detailCard.style.display = 'flex';
            detailCard.innerHTML = `
                <div>
                    <span class="badge-verbum">🔴 Verbum</span>
                    <div class="detail-main-word">${item.word}</div>
                    <div class="detail-forms">Nutid: <strong>${item.nutid}</strong> &nbsp;|&nbsp; Datid: <strong>${item.datid}</strong></div>
                    <div class="detail-sentence">"${item.sentence}"</div>
                </div>
                <div>
                    <button class="listen-word-btn" id="listen-byrum-verb-btn">
                        <span>🔊</span> Hør målord
                    </button>
                </div>
            `;

            detailCard.querySelector('#listen-byrum-verb-btn').onclick = () => {
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


    const byrumVisualMissions = [
        {
            title: "Mission 1 af 8",
            cropX: 35,
            cropY: 68,
            question: "Kig på manden på cykelstien tæt ved vejen. Hvad gør han?",
            options: [
                { text: "Cykler sikkert gennem byen 🚲", correct: true },
                { text: "Sover på en bænk i parken 🛌", correct: false },
                { text: "Spiser en sandwich i caféen 🥪", correct: false }
            ]
        },
        {
            title: "Mission 2 af 8",
            cropX: 48,
            cropY: 46,
            question: "Kig på de to venner midt på vejen foran et hus. Hvad gør de?",
            options: [
                { text: "Løber et maraton i skoven 🏃", correct: false },
                { text: "Møder hinanden og giver hånd 🤝", correct: true },
                { text: "Kaster med store sten 🪨", correct: false }
            ]
        },
        {
            title: "Mission 3 af 8",
            cropX: 67,
            cropY: 72,
            question: "Kig på kvinden der sidder på bænken foran skolen. Hvad gør hun?",
            options: [
                { text: "Venter tålmodigt ved stoppestedet ⏳", correct: true },
                { text: "Kører i en hurtig bil 🚗", correct: false },
                { text: "Vasker tøj i floden 🧼", correct: false }
            ]
        },
        {
            title: "Mission 4 af 8",
            cropX: 86,
            cropY: 76,
            question: "Kig på kvinden der står ved døren til butikken med blomster. Hvad gør hun?",
            options: [
                { text: "Lukker butiksdøren i regnen 🚪", correct: false },
                { text: "Ser og dufter til de smukke blomster 🌸", correct: true },
                { text: "Sover i sin seng 🛌", correct: false }
            ]
        },
        {
            title: "Mission 5 af 8",
            cropX: 60,
            cropY: 48,
            question: "Kig på manden der går en tur på vejen med sin hund. Hvad gør han?",
            options: [
                { text: "Går en tur gennem gaden 🚶", correct: true },
                { text: "Svømmer i en sø 🏊", correct: false },
                { text: "Klatrer i et højt træ 🌳", correct: false }
            ]
        },
        {
            title: "Mission 6 af 8",
            cropX: 82,
            cropY: 28,
            question: "Kig på den store gule bybus der kører børnene hen til skolen. Hvad gør chaufføren?",
            options: [
                { text: "Kører bussen frem til passagererne 🚌", correct: true },
                { text: "Sover på bagsædet 🛌", correct: false },
                { text: "Maler bussen med pensel 🎨", correct: false }
            ]
        },
        {
            title: "Mission 7 af 8",
            cropX: 27,
            cropY: 48,
            question: "Kig på manden foran et hus på vejen. Hvad gør han?",
            options: [
                { text: "Kigger nysgerrigt på varerne i vinduet 👀", correct: true },
                { text: "Flyver med en drage 🪁", correct: false },
                { text: "Stryger sit tøj 👔", correct: false }
            ]
        },
        {
            title: "Mission 8 af 8",
            cropX: 78,
            cropY: 44,
            question: "Kig på bilen der holder stille foran huset. Hvad gør manden i bilen?",
            options: [
                { text: "Stopper bilen ved lyskrydset 🛑", correct: true },
                { text: "Drikker en kop varm suppe 🍲", correct: false },
                { text: "Spiller guitar på taget 🎸", correct: false }
            ]
        }
    ];

    currByrumVisualIdx = 0;
    const visualMissionCard = document.createElement('div');
    visualMissionCard.className = 'exercise-card';

    function renderByrumVisualMission() {
        visualMissionCard.innerHTML = '';
        const mission = byrumVisualMissions[currByrumVisualIdx];

        const badge = document.createElement('div');
        badge.className = 'mission-badge';
        badge.textContent = `${mission.title} • Visuel Detektiv`;
        visualMissionCard.appendChild(badge);

        // Zoom viewfinder frame
        const zoomFrame = document.createElement('div');
        zoomFrame.className = 'detective-zoom-frame';
        zoomFrame.style.backgroundImage = "url('assets/verber_byrum_vrimmel.jpg')";
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
                            ✓ Rigtigt svaret!
                        </div>
                        <button class="mission-next-btn" id="next-visual-byrum-btn">
                            ${currByrumVisualIdx < byrumVisualMissions.length - 1 ? 'Næste mission ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-visual-byrum-btn').onclick = () => {
                        currByrumVisualIdx = (currByrumVisualIdx + 1) % byrumVisualMissions.length;
                        renderByrumVisualMission();
                    };
                } else {
                    btn.classList.add('wrong');
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-size: 1.1rem; font-weight: 700;">
                            ✗ Forkert svaret. Prøv igen!
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

    renderByrumVisualMission();
    detektivPanel.appendChild(visualMissionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. TAB: FIND HANDLINGER I KONTEKST (Model 2)
    // ========================================================
    const handlingerPanel = document.createElement('div');
    handlingerPanel.className = 'verber-panel';
    handlingerPanel.dataset.panel = 'tab_handlinger';

    const byrumContextTasks = [
        {
            title: "Opgave 1 af 10: Transport og bevægelse i byen",
            prompt: "Find 3 handlinger, der handler om transport og bevægelse i byen:",
            targetCount: 3,
            options: [
                { text: "at cykle 🚲", correct: true },
                { text: "at sove 🛌", correct: false },
                { text: "at gå 🚶", correct: true },
                { text: "at spise 🍽️", correct: false },
                { text: "at køre 🚌", correct: true },
                { text: "at male 🎨", correct: false }
            ]
        },
        {
            title: "Opgave 2 af 10: Møder og kontakt på gaden",
            prompt: "Find 3 handlinger, man gør når man møder andre på gaden:",
            targetCount: 3,
            options: [
                { text: "at svømme 🏊", correct: false },
                { text: "at møde 🤝", correct: true },
                { text: "at smile 😊", correct: true },
                { text: "at bage 🥐", correct: false },
                { text: "at se 👀", correct: true },
                { text: "at vaske 🧼", correct: false }
            ]
        },
        {
            title: "Opgave 3 af 10: Indkøb og ærinder i byen",
            prompt: "Find 3 handlinger, man gør når man har ærinder i butikkerne:",
            targetCount: 3,
            options: [
                { text: "at handle 🛒", correct: true },
                { text: "at hente 🛍️", correct: true },
                { text: "at flyve ✈️", correct: false },
                { text: "at finde 🔍", correct: true },
                { text: "at sove i seng 🛏️", correct: false },
                { text: "at danse 💃", correct: false }
            ]
        },
        {
            title: "Opgave 4 af 10: Færdsel og sikkerhed på vejen",
            prompt: "Find 3 handlinger, der handler om sikkerhed i trafikken:",
            targetCount: 3,
            options: [
                { text: "at stoppe 🛑", correct: true },
                { text: "at passe på ⚠️", correct: true },
                { text: "at sove 😴", correct: false },
                { text: "at kigge sig for 👀", correct: true },
                { text: "at spise kage 🍰", correct: false },
                { text: "at synge højt 🎤", correct: false }
            ]
        },
        {
            title: "Opgave 5 af 10: Hjælp og venlighed mellem mennesker",
            prompt: "Find 3 handlinger, der viser hjælpsomhed og venlighed i byen:",
            targetCount: 3,
            options: [
                { text: "at hjælpe 🤝", correct: true },
                { text: "at råbe af folk 📢", correct: false },
                { text: "at smile 😊", correct: true },
                { text: "at tabe sine ting 💔", correct: false },
                { text: "at følge nogen over vejen 🚶‍♂️", correct: true },
                { text: "at glemme nøgler ❓", correct: false }
            ]
        },
        {
            title: "Opgave 6 af 10: At miste og lede efter ting",
            prompt: "Find 3 handlinger, man gør hvis man har tabt sine nøgler:",
            targetCount: 3,
            options: [
                { text: "at miste 🔑", correct: true },
                { text: "at danse 💃", correct: false },
                { text: "at kigge grundigt efter 👀", correct: true },
                { text: "at cykle hurtigt 🚲", correct: false },
                { text: "at finde nøglerne 🔍", correct: true },
                { text: "at sove på bænken 🛏️", correct: false }
            ]
        },
        {
            title: "Opgave 7 af 10: Beboelse og hverdag i byen",
            prompt: "Find 3 handlinger, der handler om at leve og bo i byen:",
            targetCount: 3,
            options: [
                { text: "at bo i lejlighed 🏠", correct: true },
                { text: "at flyve i rummet 🚀", correct: false },
                { text: "at komme hjem 🏡", correct: true },
                { text: "at gå på trapper 🚶", correct: true },
                { text: "at sejle i kano 🛶", correct: false },
                { text: "at klatre på bjerge 🧗", correct: false }
            ]
        },
        {
            title: "Opgave 8 af 10: Post og pakker i gadebilledet",
            prompt: "Find 3 handlinger, der handler om at modtage og bringe pakker:",
            targetCount: 3,
            options: [
                { text: "at hente en pakke 📦", correct: true },
                { text: "at svømme 🏊", correct: false },
                { text: "at bringe et brev ud ✉️", correct: true },
                { text: "at stege kød 🍳", correct: false },
                { text: "at vente ved pakkeboksen ⏳", correct: true },
                { text: "at synge opera 🎵", correct: false }
            ]
        },
        {
            title: "Opgave 9 af 10: At observere og holde øje",
            prompt: "Find 3 handlinger, der handler om at bruge øjnene i byrummet:",
            targetCount: 3,
            options: [
                { text: "at se 👀", correct: true },
                { text: "at spise sandwich 🥪", correct: false },
                { text: "at kigge i butiksruder 🔎", correct: true },
                { text: "at sove til middag 🛌", correct: false },
                { text: "at passe på lyssignalet 🚦", correct: true },
                { text: "at vaske gulv 🧼", correct: false }
            ]
        },
        {
            title: "Opgave 10 af 10: På farten til fods og på to hjul",
            prompt: "Find 3 handlinger, når man bevæger sig gennem byen:",
            targetCount: 3,
            options: [
                { text: "at gå en tur 🚶", correct: true },
                { text: "at cykle på cykelstien 🚲", correct: true },
                { text: "at bage boller 🥐", correct: false },
                { text: "at køre med bussen 🚌", correct: true },
                { text: "at sidde i en sofa 🛋️", correct: false },
                { text: "at tegne huse ✏️", correct: false }
            ]
        }
    ];

    let currContextTaskIdx = 0;
    const contextCard = document.createElement('div');
    contextCard.className = 'exercise-card';

    function renderByrumContextTask() {
        contextCard.innerHTML = '';
        const task = byrumContextTasks[currContextTaskIdx];
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
                                ✓ Rigtigt svaret! Du fandt alle 3 handlinger!
                            </div>
                            <button class="mission-next-btn" id="next-context-byrum-btn">
                                ${currContextTaskIdx < byrumContextTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                            </button>
                        `;
                        feedbackBox.querySelector('#next-context-byrum-btn').onclick = () => {
                            currContextTaskIdx = (currContextTaskIdx + 1) % byrumContextTasks.length;
                            renderByrumContextTask();
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

    renderByrumContextTask();
    handlingerPanel.appendChild(contextCard);
    panelsHolder.appendChild(handlingerPanel);

    // ========================================================
    // --- 4. TAB: HISTORIE (Byg en historie - INGEN TTS)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'verber-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const byrumStories = [
        {
            title: "1. En gåtur gennem byen",
            steps: [
                {
                    q: "1. Hvad gør Sofie på gågaden?",
                    options: [
                        { text: "Hun går en tur i det fine vejr 🚶", correct: true },
                        { text: "Hun sover på gaden 🛌", correct: false },
                        { text: "Hun maler bilerne 🎨", correct: false }
                    ]
                },
                {
                    q: "2. Hvem møder hun ved caféen?",
                    options: [
                        { text: "Hun møder sin gode ven Peter 🤝", correct: true },
                        { text: "Hun møder en løve 🦁", correct: false },
                        { text: "Hun flyver op i skyerne ✈️", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør de da de ser hinanden?",
                    options: [
                        { text: "De smiler og hilser pænt 😊", correct: true },
                        { text: "De råber og skændes 😡", correct: false },
                        { text: "De løber væk 🏃", correct: false }
                    ]
                }
            ]
        },
        {
            title: "2. På to hjul",
            steps: [
                {
                    q: "1. Hvordan transporterer Lars sig?",
                    options: [
                        { text: "Han cykler på sin grønne cykel 🚲", correct: true },
                        { text: "Han svømmer i kanalen 🏊", correct: false },
                        { text: "Han klatrer over taget 🧗", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør han ved fodgængerfeltet?",
                    options: [
                        { text: "Han stopper pænt for de gående 🛑", correct: true },
                        { text: "Han lukker øjnene 🙈", correct: false },
                        { text: "Han kaster cyklen væk 🗑️", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør han bagefter?",
                    options: [
                        { text: "Han kører videre mod sit arbejde 🏢", correct: true },
                        { text: "Han lægger sig til at sove 😴", correct: false },
                        { text: "Han synger i mikrofon 🎤", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. Indkøb og ærinder",
            steps: [
                {
                    q: "1. Hvad kigger kvinden på i butikken?",
                    options: [
                        { text: "Hun kigger på de friske madvarer 🥖", correct: true },
                        { text: "Hun kigger på en raket 🚀", correct: false },
                        { text: "Hun kaster en bold ⚽", correct: false }
                    ]
                },
                {
                    q: "2. Hvad henter hun ved disken?",
                    options: [
                        { text: "Hun henter sin pose med grøntsager 🛍️", correct: true },
                        { text: "Hun henter en stor kuffert 🧳", correct: false },
                        { text: "Hun taber sine sko 👟", correct: false }
                    ]
                },
                {
                    q: "3. Hvor går hun hen bagefter?",
                    options: [
                        { text: "Hun går hjem til sin lejlighed 🏠", correct: true },
                        { text: "Hun svømmer over søen 🌊", correct: false },
                        { text: "Hun bygger et telt ⛺", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. Brevet i postkassen",
            steps: [
                {
                    q: "1. Hvad bringer drengen hen til gadehjørnet?",
                    options: [
                        { text: "Han bringer et fødselsdagsbrev ✉️", correct: true },
                        { text: "Han bringer en tung sofa 🛋️", correct: false },
                        { text: "Han bringer en gryde suppe 🍲", correct: false }
                    ]
                },
                {
                    q: "2. Hvor putter han brevet ned?",
                    options: [
                        { text: "Han putter det i den røde postkasse 📮", correct: true },
                        { text: "Han smider det i skraldespanden 🗑️", correct: false },
                        { text: "Han river det i stykker 📄", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør han ved busstoppestedet?",
                    options: [
                        { text: "Han venter på bussen hjem 🚌", correct: true },
                        { text: "Han løber væk i panik 🏃", correct: false },
                        { text: "Han maler bænken 🎨", correct: false }
                    ]
                }
            ]
        },
        {
            title: "5. Den glemte paraply",
            steps: [
                {
                    q: "1. Hvad gør Sarah, da det pludselig begynder at regne?",
                    options: [
                        { text: "Hun går hurtigt ind på den hyggelige café ☕", correct: true },
                        { text: "Hun lægger sig til at sove på fortovet 🛌", correct: false },
                        { text: "Hun klatrer op i en lygtepæl 💈", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør hun ved kassen, da hun bestiller kaffe?",
                    options: [
                        { text: "Hun kigger i sin taske og finder pengene frem 🪙", correct: true },
                        { text: "Hun smider kaffen på gulvet ☕", correct: false },
                        { text: "Hun løber ud af bagdøren 🏃", correct: false }
                    ]
                },
                {
                    q: "3. Hvad opdager tjeneren, da Sarah forlader caféen?",
                    options: [
                        { text: "Tjeneren ser hendes glemte paraply og bringer den til hende ☂️", correct: true },
                        { text: "Tjeneren kaster med kopper 💥", correct: false },
                        { text: "Tjeneren maler væggen rød 🎨", correct: false }
                    ]
                }
            ]
        },
        {
            title: "6. Den lille bortløbne hund",
            steps: [
                {
                    q: "1. Hvad ser Mads løbe forvirret rundt på gågaden?",
                    options: [
                        { text: "Han ser en lille hund, der leder efter sin ejer 🐶", correct: true },
                        { text: "Han ser en vild tiger i fuld fart 🐯", correct: false },
                        { text: "Han ser en flyvende tallerken 🛸", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør han for at hjælpe hunden?",
                    options: [
                        { text: "Han stopper op og kalder roligt på den 🐕", correct: true },
                        { text: "Han sparker til en lygtepæl 🥾", correct: false },
                        { text: "Han hopper i havnebassinet 🌊", correct: false }
                    ]
                },
                {
                    q: "3. Hvad sker der, da ejeren kommer løbende?",
                    options: [
                        { text: "Ejeren smiler taknemmeligt og henter sin hund 🤝", correct: true },
                        { text: "Ejeren bygger et sandslot 🏖️", correct: false },
                        { text: "Ejeren kører væk i en traktor 🚜", correct: false }
                    ]
                }
            ]
        },
        {
            title: "7. Indkøbsturen til weekenden",
            steps: [
                {
                    q: "1. Hvor cykler familien hen lørdag formiddag?",
                    options: [
                        { text: "De cykler hen til supermarkedet på torvet 🛒", correct: true },
                        { text: "De cykler direkte ud i havet 🌊", correct: false },
                        { text: "De cykler op på taget af rådhuset 🏛️", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør de inde i butikken?",
                    options: [
                        { text: "De handler friske grøntsager og brød 🍞", correct: true },
                        { text: "De leger gemmeleg i fryseren ❄️", correct: false },
                        { text: "De synger i en megafon 📢", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør de, da de kommer hjem med bæreposerne?",
                    options: [
                        { text: "De sætter maden på plads i køleskabet 🥗", correct: true },
                        { text: "De kaster poserne ud ad vinduet 🪟", correct: false },
                        { text: "De klipper poserne i små stykker ✂️", correct: false }
                    ]
                }
            ]
        },
        {
            title: "8. En hjælpende hånd ved krydset",
            steps: [
                {
                    q: "1. Hvem venter tålmodigt ved det røde lyssignal?",
                    options: [
                        { text: "En ældre mand med en tung indkøbstaske 🛍️", correct: true },
                        { text: "En pingvin i smoking 🐧", correct: false },
                        { text: "En klovn på stylter 🎪", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør en ung kvinde, da lyset skifter til grønt?",
                    options: [
                        { text: "Hun hjælper manden og følger ham sikkert over vejen 🚶‍♂️", correct: true },
                        { text: "Hun løber væk i panik 🏃", correct: false },
                        { text: "Hun lægger sig til at sove 😴", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør den ældre mand som tak?",
                    options: [
                        { text: "Han smiler varmt og takker for hjælpen 😊", correct: true },
                        { text: "Han kaster sin taske i kanalen 🌊", correct: false },
                        { text: "Han råber ad en bus 🚌", correct: false }
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
        descEl.textContent = 'Vælg det rigtige verbum for at bygge historien:';
        storyContainer.appendChild(descEl);

        const stepsHolder = document.createElement('div');

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
                        stepFeedback.innerHTML = `<div style="color: #4ade80; font-weight: 700; margin-top: 0.6rem;">✓ Rigtigt svaret!</div>`;
                        optRow.querySelectorAll('.story-opt-btn').forEach(b => b.style.pointerEvents = 'none');

                        const nextCard = stepsHolder.querySelector(`#byrum-step-${sIdx + 1}`);
                        if (nextCard) {
                            nextCard.style.opacity = '1';
                            nextCard.style.pointerEvents = 'auto';
                            nextCard.classList.add('active-step');
                        } else {
                            const completeBox = storyContainer.querySelector('#byrum-story-complete');
                            if (completeBox) completeBox.style.display = 'block';
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
        completeBox.id = 'byrum-story-complete';
        completeBox.className = 'story-explanation-box';
        completeBox.style.display = 'none';
        completeBox.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: #4ade80;">
                🎉 Flot klaret! Du har gennemført historien.
            </div>
            <button class="mission-next-btn" id="next-byrum-story-btn">
                ${currByrumStoryIdx < byrumStories.length - 1 ? 'Gå til næste historie ➔' : 'Start forfra 🔄'}
            </button>
        `;
        storyContainer.appendChild(completeBox);

        completeBox.querySelector('#next-byrum-story-btn').onclick = () => {
            currByrumStoryIdx = (currByrumStoryIdx + 1) % byrumStories.length;
            renderActiveByrumStory();
        };
    }

    renderActiveByrumStory();
    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 5. TAB: SYNONYMER & ANTONYMER (INGEN TTS)
    // ========================================================
    const synonymPanel = document.createElement('div');
    synonymPanel.className = 'verber-panel';
    synonymPanel.dataset.panel = 'tab_synonym_antonym';

    const byrumSynonymTasks = [
        {
            type: 'synonym',
            word: 'at kigge',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at se 👀', correct: true },
                { text: 'at sove 🛌', correct: false },
                { text: 'at spise 🍽️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at gå',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at stoppe 🛑', correct: true },
                { text: 'at løbe 🏃', correct: false },
                { text: 'at smile 😊', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at finde',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at miste 🔍', correct: true },
                { text: 'at hente 🛍️', correct: false },
                { text: 'at kigge 👀', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at handle',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at købe ind 🛒', correct: true },
                { text: 'at danse 💃', correct: false },
                { text: 'at råbe 📢', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at smile',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at græde 😢', correct: true },
                { text: 'at grine 😄', correct: false },
                { text: 'at gå 🚶', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at køre',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at transportere sig 🚗', correct: true },
                { text: 'at sove 🛌', correct: false },
                { text: 'at spise 🍽️', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at komme',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at gå væk / forlade 🚪', correct: true },
                { text: 'at ankomme 🛬', correct: false },
                { text: 'at smile 😊', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at hjælpe',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at assistere / støtte 🤝', correct: true },
                { text: 'at drille 😜', correct: false },
                { text: 'at sove 😴', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at hente',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at aflevere 📦', correct: true },
                { text: 'at tage 🤲', correct: false },
                { text: 'at løbe 🏃', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at bo',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at have hjemme 🏠', correct: true },
                { text: 'at rejse ✈️', correct: false },
                { text: 'at spise 🥪', correct: false }
            ]
        },
        {
            type: 'antonym',
            word: 'at starte',
            prompt: 'Hvilket verbum er et antonym (det modsatte af):',
            options: [
                { text: 'at stoppe / standse 🛑', correct: true },
                { text: 'at begynde 🏁', correct: false },
                { text: 'at køre 🚙', correct: false }
            ]
        },
        {
            type: 'synonym',
            word: 'at bringe',
            prompt: 'Hvilket verbum er et synonym (betyder næsten det samme som):',
            options: [
                { text: 'at levere / aflevere 📬', correct: true },
                { text: 'at miste ❌', correct: false },
                { text: 'at synge 🎵', correct: false }
            ]
        }
    ];

    let currByrumSynonymIdx = 0;
    const synonymCard = document.createElement('div');
    synonymCard.className = 'synonym-card';

    function renderByrumSynonymTask() {
        synonymCard.innerHTML = '';
        const task = byrumSynonymTasks[currByrumSynonymIdx];

        const isSynonym = task.type === 'synonym';
        const typeBadge = document.createElement('div');
        typeBadge.className = `synonym-type-badge ${isSynonym ? 'badge-type-synonym' : 'badge-type-antonym'}`;
        typeBadge.textContent = isSynonym ? '🔗 Find Synonym (Samme betydning)' : '⚡ Find Antonym (Modsætning)';
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
                            ✓ Rigtigt svaret!
                        </div>
                        <button class="mission-next-btn" id="next-byrum-synonym-btn">
                            ${currByrumSynonymIdx < byrumSynonymTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-byrum-synonym-btn').onclick = () => {
                        currByrumSynonymIdx = (currByrumSynonymIdx + 1) % byrumSynonymTasks.length;
                        renderByrumSynonymTask();
                    };
                } else {
                    btn.classList.add('wrong');
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-size: 1.1rem; font-weight: 700;">
                            ✗ Forkert svaret. Prøv igen!
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

    renderByrumSynonymTask();
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
                <h3 style="font-size: 1.7rem; color: white; margin-bottom: 0.4rem;">Byg dine egne sætninger i byrummet</h3>
                <p style="color: #94a3b8; font-size: 1.05rem; max-width: 650px; margin: 0 auto;">
                    Vælg et element fra hver række herunder. Prøv forskellige verber og lyt til hvordan sætningen lyder på dansk!
                </p>
            </div>

            <!-- Grammatisk farveforklaring -->
            <div class="grammar-legend-bar">
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>1. Hvem?</strong> (Subjekt - grøn)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-verbum"></span> <strong>2. Handling</strong> (Verbum - rød)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>3. Hvilken ting?</strong> (Objekt - grøn)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-sted"></span> <strong>4. Hvor?</strong> (Sted - blå)</div>
            </div>

            <div id="free-builder-rows-byrum-verb"></div>

            <!-- Live Output Sentence -->
            <div class="sb-live-box">
                <div class="sb-live-label">Din samlede sætning</div>
                <div class="sb-live-sentence" id="free-live-sentence-byrum-verb"></div>
                <button class="sb-listen-btn" id="free-listen-btn-byrum-verb">
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
                options: ['Manden', 'Kvinden', 'Børnene', 'Cyklisten', 'Chaufføren', 'Vennerne', 'Turisten', 'Naboen']
            },
            {
                id: 'verbum',
                title: '2. Hvad laver personen / dyret?',
                role: 'Verbum (Kernen)',
                catClass: 'sb-cat-verbum',
                badgeClass: 'badge-cat-verbum',
                icon: '⚡',
                options: ['går på', 'cykler på', 'møder', 'venter på', 'kigger på', 'henter', 'hjælper med', 'kører i']
            },
            {
                id: 'objekt',
                title: '3. Hvilken genstand eller person?',
                role: 'Objekt (Ting/Person)',
                catClass: 'sb-cat-objekt',
                badgeClass: 'badge-cat-objekt',
                icon: '📦',
                options: ['en ven', 'en cykel', 'en rød bus', 'et butiksvindue', 'frisk brød', 'de tunge poser', 'en bil', 'en vej']
            },
            {
                id: 'sted',
                title: '4. Hvor i byrummet sker det?',
                role: 'Sted (Rum)',
                catClass: 'sb-cat-sted',
                badgeClass: 'badge-cat-sted',
                icon: '📍',
                options: ['på gaden', 'på cykelstien', 'ved lyskrydset', 'ved stoppestedet', 'på torvet', 'i byen', 'foran butikken', 'på fortovet']
            }
        ];

        let selected = ['Manden', 'cykler på', 'en cykel', 'på cykelstien'];

        const rowsContainer = freeBuilderContainer.querySelector('#free-builder-rows-byrum-verb');
        const liveSentenceEl = freeBuilderContainer.querySelector('#free-live-sentence-byrum-verb');
        const listenBtn = freeBuilderContainer.querySelector('#free-listen-btn-byrum-verb');

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
    const byrumChallengeTasks = [
        {
            context: "Morgensolen skinner foran et hus, og en mand gør sin cykel klar.",
            subjekt: "Manden",
            objekt: "på en cykel",
            sted: "på cykelstien ved vejen",
            questionPrompt: "Hvad gør Manden på en cykel på cykelstien?",
            correctVerb: "cykler",
            distractors: ["sover", "koger", "drikker"],
            pedagogyNote: "Man cykler på en to-hjulet cykel for at komme hurtigt frem."
        },
        {
            context: "To gode venner møder hinanden på vejen foran skolen.",
            subjekt: "Vennerne",
            objekt: "hinanden",
            sted: "på gaden",
            questionPrompt: "Hvad gør Vennerne med hinanden på gaden?",
            correctVerb: "møder",
            distractors: ["taber", "steger", "falder"],
            pedagogyNote: "Man møder andre mennesker, når man støder ind i dem i byen."
        },
        {
            context: "Kvinden åbner døren til butikken for at handle ind.",
            subjekt: "Kvinden",
            objekt: "friske varer",
            sted: "i butikken",
            questionPrompt: "Hvad gør Kvinden med friske varer i butikken?",
            correctVerb: "handler",
            distractors: ["flyver", "svømmer", "sover"],
            pedagogyNote: "At handle betyder at købe varer ind i butikken."
        },
        {
            context: "Manden holder stille med sin bil foran et hus og venter.",
            subjekt: "Manden i bilen",
            objekt: "på sin ven",
            sted: "ved vejen",
            questionPrompt: "Hvad gør Manden i bilen på vejen?",
            correctVerb: "venter på",
            distractors: ["læser i", "koger", "kaster"],
            pedagogyNote: "Man venter på transportmidler eller på sin ven."
        },
        {
            context: "Børnene har skoletasker på ryggen og går glade i skole.",
            subjekt: "Børnene",
            objekt: "til fods",
            sted: "i skole",
            questionPrompt: "Hvad gør Børnene til fods i skole?",
            correctVerb: "går",
            distractors: ["koger", "bager", "drikker"],
            pedagogyNote: "At gå er at bevæge sig fremad på sine egne fødder."
        },
        {
            context: "Trafiklyset skifter til rødt foran et hus, og en bil skal standse på vejen.",
            subjekt: "Chaufføren",
            objekt: "den store bil",
            sted: "ved lyskrydset",
            questionPrompt: "Hvad gør Chaufføren med bilen ved lyskrydset?",
            correctVerb: "stopper",
            distractors: ["drikker", "sover", "lægger"],
            pedagogyNote: "Chaufføren stopper køretøjet, når lyset er rødt."
        },
        {
            context: "Turisten kigger på døren til museet og leder efter vejen foran et hus.",
            subjekt: "Turisten",
            objekt: "et stort bykort",
            sted: "på vejen",
            questionPrompt: "Hvad gør Turisten med et stort bykort på vejen?",
            correctVerb: "kigger på",
            distractors: ["steger", "hopper", "falder"],
            pedagogyNote: "Man kigger på noget med sine øjne for at orientere sig."
        },
        {
            context: "Manden går på vejen sammen med sin hund foran døren til naboens hus.",
            subjekt: "Manden og hunden",
            objekt: "de tunge poser",
            sted: "foran døren",
            questionPrompt: "Hvad gør Manden og hunden foran døren?",
            correctVerb: "hjælper med",
            distractors: ["cykler i", "flyver over", "mister"],
            pedagogyNote: "Det er god stil at hjælpe andre, når poserne er tunge."
        }
    ];

    currentByrumChallengeIdx = 0;
    const completedByrumChallenges = new Set();

    function setupByrumChallenge() {
        challengeContainer.innerHTML = '';
        const task = byrumChallengeTasks[currentByrumChallengeIdx];

        // Header with pills
        const header = document.createElement('div');
        header.className = 'sb-task-header';

        const titleDiv = document.createElement('div');
        titleDiv.innerHTML = `
            <div style="font-size: 0.85rem; color: #f87171; font-weight: 800; text-transform: uppercase;">
                Udfordring ${currentByrumChallengeIdx + 1} af ${byrumChallengeTasks.length}
            </div>
            <h3 style="font-size: 1.5rem; color: white; margin: 0.2rem 0;">Find handlingen & saml puslespillet</h3>
        `;
        header.appendChild(titleDiv);

        const pills = document.createElement('div');
        pills.className = 'sb-task-pills';
        byrumChallengeTasks.forEach((_, idx) => {
            const pill = document.createElement('div');
            pill.className = `sb-task-pill ${idx === currentByrumChallengeIdx ? 'active' : ''} ${completedByrumChallenges.has(idx) ? 'done' : ''}`;
            pill.textContent = idx + 1;
            pill.onclick = () => {
                currentByrumChallengeIdx = idx;
                setupByrumChallenge();
            };
            pills.appendChild(pill);
        });
        header.appendChild(pills);
        challengeContainer.appendChild(header);

        // Step 1: Context & Semantic Match (Hvem, Objekt, Hvor er givet ➔ Find Verbum)
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
                    <span class="sb-chip-role">3. Hvilken ting/person?</span>
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
                    renderByrumPuzzleStep(puzzleContainer, task);
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
    function renderByrumPuzzleStep(container, task) {
        container.innerHTML = `
            <div class="sb-puzzle-title">
                <span>🧩</span> Trin 2: Puslespillet – Saml hele sætningen!
            </div>
            <div class="sb-puzzle-desc">
                Klik på brikkerne i den rigtige danske ordstilling: <strong>1. Hvem ➔ 2. Handling (V2) ➔ 3. Hvilken ting ➔ 4. Hvor</strong>.
            </div>

            <!-- 4 Slots -->
            <div class="sb-puzzle-slots" id="byrum-puzzle-slots-verb">
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
            <div class="sb-puzzle-bank" id="byrum-puzzle-bank-verb"></div>

            <!-- Feedback -->
            <div class="sb-feedback-box" id="byrum-puzzle-feedback-verb"></div>
        `;

        const correctOrder = [task.subjekt, task.correctVerb, task.objekt, task.sted];
        const scrambledWords = [...correctOrder].sort(() => Math.random() - 0.5);

        let placedSlots = [null, null, null, null];

        const slotsEl = container.querySelector('#byrum-puzzle-slots-verb');
        const bankEl = container.querySelector('#byrum-puzzle-bank-verb');
        const feedbackEl = container.querySelector('#byrum-puzzle-feedback-verb');

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
                completedByrumChallenges.add(currentByrumChallengeIdx);
                speakDanish(fullSentence);

                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg success">
                        🎉 Fantastisk! "<strong>${fullSentence}</strong>" ✓
                    </div>
                    <div style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.8rem;">
                        💡 ${task.pedagogyNote}
                    </div>
                    <div class="sb-action-row">
                        <button class="sb-listen-btn" id="byrum-listen-full-verb">
                            <span>🔊</span> Hør sætningen igen
                        </button>
                        <button class="sb-action-btn" id="byrum-next-btn-verb">
                            ${currentByrumChallengeIdx < byrumChallengeTasks.length - 1 ? 'Næste opgave ➔' : 'Start forfra 🔄'}
                        </button>
                    </div>
                `;

                feedbackEl.querySelector('#byrum-listen-full-verb').onclick = () => speakDanish(fullSentence);
                feedbackEl.querySelector('#byrum-next-btn-verb').onclick = () => {
                    currentByrumChallengeIdx = (currentByrumChallengeIdx + 1) % byrumChallengeTasks.length;
                    setupByrumChallenge();
                };
            } else {
                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg error">
                        ✗ Rækkefølgen er ikke helt rigtig.
                    </div>
                    <div style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.6rem;">
                        Husk den faste danske ordstilling: 1. Hvem (Subjekt) ➔ 2. Handling (Verbum) ➔ 3. Hvilken ting (Objekt) ➔ 4. Hvor (Sted).
                    </div>
                    <button class="sb-action-btn" id="byrum-retry-btn-verb" style="background: #475569;">
                        Nulstil brikker 🔄
                    </button>
                `;

                feedbackEl.querySelector('#byrum-retry-btn-verb').onclick = () => {
                    placedSlots = [null, null, null, null];
                    updateSlotsAndBank();
                };
            }
        }

        updateSlotsAndBank();
    }

    // Initialize both sub-tabs
    setupFreeBuilder();
    setupByrumChallenge();
    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    // ========================================================
    // --- 7. TAB: NUTID & DATID (Tidsmarkør-træning - INGEN TTS)
    // ========================================================
    const tidBoejningPanel = document.createElement('div');
    tidBoejningPanel.className = 'verber-panel';
    tidBoejningPanel.dataset.panel = 'tab_tid_boejning';

    const byrumTidTasks = [
        {
            marker: "I går",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I går",
            sentenceAfter: "Jens en lang tur gennem byens gader.",
            baseVerb: "at gå",
            options: [
                { text: "gik", form: "Datid", correct: true },
                { text: "går", form: "Nutid", correct: false }
            ],
            explanation: '"I går" viser, at handlingen skete i fortiden, så verbet skal stå i datid (gik).'
        },
        {
            marker: "Lige nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Lige nu",
            sentenceAfter: "manden sikkert over fodgængerfeltet.",
            baseVerb: "at cykle",
            options: [
                { text: "cykler", form: "Nutid", correct: true },
                { text: "cyklede", form: "Datid", correct: false }
            ],
            explanation: '"Lige nu" viser, at handlingen sker i dette øjeblik, så verbet skal stå i nutid (cykler).'
        },
        {
            marker: "I morges",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I morges",
            sentenceAfter: "hun sin gamle ven ved butikken.",
            baseVerb: "at møde",
            options: [
                { text: "mødte", form: "Datid", correct: true },
                { text: "møder", form: "Nutid", correct: false }
            ],
            explanation: '"I morges" viser, at handlingen skete tidligere (fortid), så verbet skal stå i datid (mødte).'
        },
        {
            marker: "Hver dag",
            hint: "peger på en vane / nutid ➔ Nutid",
            sentenceBefore: "Hver dag",
            sentenceAfter: "den blå bybus forbi klokken ti.",
            baseVerb: "at køre",
            options: [
                { text: "kører", form: "Nutid", correct: true },
                { text: "kørte", form: "Datid", correct: false }
            ],
            explanation: '"Hver dag" viser en gentagen vane i nutid, så verbet skal stå i nutid (kører).'
        },
        {
            marker: "I går aftes",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I går aftes",
            sentenceAfter: "de en pakke i butikken.",
            baseVerb: "at hente",
            options: [
                { text: "hentede", form: "Datid", correct: true },
                { text: "henter", form: "Nutid", correct: false }
            ],
            explanation: '"I går aftes" viser en afsluttet handling i fortiden, så verbet skal stå i datid (hentede).'
        },
        {
            marker: "Nu",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "Nu",
            sentenceAfter: "kvinden tålmodigt på bænken ved stoppestedet.",
            baseVerb: "at vente",
            options: [
                { text: "venter", form: "Nutid", correct: true },
                { text: "ventede", form: "Datid", correct: false }
            ],
            explanation: '"Nu" angiver nutid, så verbet skal stå i nutid (venter).'
        },
        {
            marker: "Sidste sommer",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "Sidste sommer",
            sentenceAfter: "hun i en hyggelig lejlighed midt i byen.",
            baseVerb: "at bo",
            options: [
                { text: "boede", form: "Datid", correct: true },
                { text: "bor", form: "Nutid", correct: false }
            ],
            explanation: '"Sidste sommer" viser fortid, så verbet skal stå i datid (boede).'
        },
        {
            marker: "I dette øjeblik",
            hint: "peger på nutiden ➔ Nutid",
            sentenceBefore: "I dette øjeblik",
            sentenceAfter: "to venner varmt til hinanden på fortovet.",
            baseVerb: "at smile",
            options: [
                { text: "smiler", form: "Nutid", correct: true },
                { text: "smilede", form: "Datid", correct: false }
            ],
            explanation: '"I dette øjeblik" viser nutid, så verbet skal stå i nutid (smiler).'
        },
        {
            marker: "I forgårs",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I forgårs",
            sentenceAfter: "Mads sin pung i bussen.",
            baseVerb: "at miste",
            options: [
                { text: "mistede", form: "Datid", correct: true },
                { text: "mister", form: "Nutid", correct: false }
            ],
            explanation: '"I forgårs" angiver en afsluttet handling i fortiden, så verbet skal stå i datid (mistede).'
        },
        {
            marker: "Altid",
            hint: "peger på en generel regel / nutid ➔ Nutid",
            sentenceBefore: "Bilisterne",
            sentenceAfter: "altid pænt for fodgængerne ved overgangen.",
            baseVerb: "at stoppe",
            options: [
                { text: "stopper", form: "Nutid", correct: true },
                { text: "stoppede", form: "Datid", correct: false }
            ],
            explanation: '"Altid" udtrykker en generel regel i nutid, så verbet skal stå i nutid (stopper).'
        },
        {
            marker: "I morges kl. 8",
            hint: "peger på fortiden ➔ Datid",
            sentenceBefore: "I morges kl. 8",
            sentenceAfter: "børnene glade hen til skolen.",
            baseVerb: "at gå",
            options: [
                { text: "gik", form: "Datid", correct: true },
                { text: "går", form: "Nutid", correct: false }
            ],
            explanation: '"I morges" peger på en bestemt tid i fortiden, så verbet skal stå i datid (gik).'
        },
        {
            marker: "Lige straks",
            hint: "nutid om nær fremtid ➔ Nutid",
            sentenceBefore: "Lige straks",
            sentenceAfter: "den næste bus om hjørnet.",
            baseVerb: "at komme",
            options: [
                { text: "kommer", form: "Nutid", correct: true },
                { text: "kom", form: "Datid", correct: false }
            ],
            explanation: '"Lige straks" bruges med nutidsform (kommer) til at udtrykke en forestående handling.'
        }
    ];

    let currTidTaskIdx = 0;
    const tidCard = document.createElement('div');
    tidCard.className = 'exercise-card';

    function renderByrumTidTask() {
        tidCard.innerHTML = '';
        const task = byrumTidTasks[currTidTaskIdx];

        const badge = document.createElement('div');
        badge.className = 'time-marker-badge';
        badge.textContent = `Opgave ${currTidTaskIdx + 1} af ${byrumTidTasks.length} • Tidsmarkør: "${task.marker}"`;
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
                            ✓ Rigtigt svaret!
                        </div>
                        <div style="color: #94a3b8; font-size: 1rem; margin-bottom: 1rem;">
                            ${task.explanation}
                        </div>
                        <button class="mission-next-btn" id="next-tid-byrum-btn">
                            ${currTidTaskIdx < byrumTidTasks.length - 1 ? 'Næste opgave ➔' : 'Gennemført! Start forfra 🔄'}
                        </button>
                    `;
                    feedbackBox.querySelector('#next-tid-byrum-btn').onclick = () => {
                        currTidTaskIdx = (currTidTaskIdx + 1) % byrumTidTasks.length;
                        renderByrumTidTask();
                    };
                } else {
                    btn.classList.add('wrong');
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-size: 1.1rem; font-weight: 700;">
                            ✗ Forkert svaret. Prøv igen!
                        </div>
                        <div style="color: #94a3b8; font-size: 0.95rem; margin-top: 0.3rem;">
                            Kig på tidsmarkøren "${task.marker}" - peger den på nuet eller fortiden?
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

    renderByrumTidTask();
    tidBoejningPanel.appendChild(tidCard);
    panelsHolder.appendChild(tidBoejningPanel);

    // Restore state if returning from Mulighed B or another deep link
    if (extraData && extraData.activeTab) {
        switchTab(extraData.activeTab);
        if (extraData.activeTab === 'tab_saetning') {
            subTab2Btn.click();
            if (extraData.taskIdx !== undefined) {
                currentByrumChallengeIdx = parseInt(extraData.taskIdx, 10) || 0;
                setupByrumChallenge();
            }
        } else if (extraData.activeTab === 'tab_detektiv') {
            if (extraData.taskIdx !== undefined) {
                currByrumVisualIdx = parseInt(extraData.taskIdx, 10) || 0;
                renderByrumVisualMission();
            }
        }
    }

    // Auto-focus target verb if navigated from Substantivfladen (e.g. Byrummet)
    if (extraData && extraData.targetVerb) {
        const cleanTarget = extraData.targetVerb.toLowerCase().replace(/^at\s+/, '').trim();
        const foundIndex = byrumVerber.findIndex(v => 
            v.word.toLowerCase().includes(cleanTarget) ||
            v.nutid.toLowerCase() === cleanTarget ||
            v.datid.toLowerCase() === cleanTarget
        );
        if (foundIndex !== -1) {
            switchTab('tab_vrimmel');
            setTimeout(() => {
                const hotspots = stage.querySelectorAll('.vrimmel-hotspot');
                if (hotspots[foundIndex]) {
                    hotspots[foundIndex].click();
                    hotspots[foundIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    hotspots[foundIndex].classList.add('b-test-spotlight');
                }
            }, 300);
        }
    }

    container.appendChild(viewContainer);
}
