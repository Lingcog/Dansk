import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

/**
 * TraenTidsudtrykView - Nytænkt flade for Tidsudtryk & Handlinger.
 * Samler Verbumfladen (🔴 Motoren) og Adverbiumfladen (🔵 Tidsankeret) fra Sprogets Byggeplads.
 * 
 * Særligt didaktisk fokus:
 * 1. Moderne dansk bruger næsten altid nutid (præsens) til fremtidige planer ("Jeg rejser til Italien i morgen").
 * 2. Vrimlebillede over Københavns Rejsehub & Bytorv med 6 interaktive hotspots.
 * 3. Inversion: Når tidsudtrykket står på 1. plads, rykker verbet ind på 2. plads foran subjektet.
 * 4. Faneopbygning med deep-linking.
 */
export function renderTraenTidsudtrykView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container tidsudtryk-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('dagens_opgave');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Audio TTS Helper
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
        .tidsudtryk-view {
            max-width: 1100px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }

        /* Hero Header */
        .tids-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .byggeplads-pills {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 0.35rem 1rem;
            border-radius: 20px;
            margin-bottom: 1rem;
            font-size: 0.85rem;
            font-weight: 700;
        }
        .pill-vrb { color: #f87171; background: rgba(239, 68, 68, 0.2); padding: 0.2rem 0.6rem; border-radius: 12px; }
        .pill-adv { color: #38bdf8; background: rgba(56, 189, 248, 0.2); padding: 0.2rem 0.6rem; border-radius: 12px; }
        .pill-plus { color: #94a3b8; font-weight: 900; }

        .tids-hero h1 {
            font-size: 2.3rem;
            font-weight: 800;
            margin-bottom: 0.6rem;
            background: linear-gradient(135deg, #38bdf8, #818cf8, #f43f5e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .tids-hero p {
            color: #94a3b8;
            font-size: 1.1rem;
            max-width: 780px;
            margin: 0 auto;
            line-height: 1.6;
        }

        /* Golden Rule Banner */
        .golden-rule-banner {
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(244, 63, 94, 0.12));
            border: 1.5px solid rgba(56, 189, 248, 0.4);
            border-radius: 18px;
            padding: 1.3rem 1.6rem;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            gap: 1.4rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
        }
        .golden-rule-icon {
            font-size: 2.8rem;
            flex-shrink: 0;
        }
        .golden-rule-content h3 {
            font-size: 1.15rem;
            font-weight: 800;
            color: #38bdf8;
            margin-bottom: 0.3rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .golden-rule-content p {
            color: #e2e8f0;
            font-size: 0.95rem;
            line-height: 1.5;
            margin: 0;
        }
        .golden-rule-highlight {
            color: #fde047;
            font-weight: 700;
        }

        /* Navigation Tabs */
        .tids-tabs-nav {
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
        .tids-tab-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 0.7rem 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .tids-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.06);
        }
        .tids-tab-btn.active {
            background: linear-gradient(135deg, #0ea5e9, #2563eb);
            color: white;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
        }

        /* TAB 1: Vrimlebillede Stage */
        .vrimmel-stage-card {
            background: #1e293b;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            overflow: hidden;
            margin-bottom: 2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }
        .vrimmel-stage-header {
            padding: 1.2rem 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .vrimmel-stage-title {
            font-size: 1.15rem;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: white;
        }
        .vrimmel-stage-subtitle {
            font-size: 0.85rem;
            color: #94a3b8;
        }

        .vrimmel-img-container {
            position: relative;
            width: 100%;
            line-height: 0;
            background: #0f172a;
        }
        .vrimmel-img {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Hotspots */
        .tids-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: 2.5px solid #ffffff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.7);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 10;
            background: #0ea5e9;
            animation: pulsePin 2.5s infinite;
        }
        @keyframes pulsePin {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        .tids-pin:hover, .tids-pin.active {
            transform: translate(-50%, -50%) scale(1.3) !important;
            z-index: 30;
            box-shadow: 0 0 25px #ffffff, 0 0 15px currentColor;
            border-color: #ffffff;
            background: #f43f5e;
        }
        .tids-pin-pill {
            position: absolute;
            bottom: 115%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(8px);
            color: #ffffff;
            border: 1.5px solid rgba(255, 255, 255, 0.25);
            padding: 0.25rem 0.65rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 800;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            pointer-events: none;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            opacity: 0.95;
            transition: all 0.2s ease;
        }
        .tids-pin:hover .tids-pin-pill, .tids-pin.active .tids-pin-pill {
            opacity: 1;
            transform: translateX(-50%) scale(1.1);
            border-color: #f43f5e;
            background: #0f172a;
        }

        /* Hotspot Inspector Card */
        .hotspot-inspector {
            padding: 1.5rem;
            background: rgba(15, 23, 42, 0.9);
            border-top: 1.5px solid rgba(255, 255, 255, 0.1);
        }
        .inspector-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .inspector-title-area {
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }
        .inspector-icon { font-size: 2.2rem; }
        .inspector-title { font-size: 1.3rem; font-weight: 800; color: white; }
        .inspector-badge {
            background: rgba(14, 165, 233, 0.2);
            border: 1px solid #38bdf8;
            color: #38bdf8;
            padding: 0.2rem 0.65rem;
            border-radius: 20px;
            font-size: 0.78rem;
            font-weight: 800;
        }

        .sentence-display-box {
            background: rgba(30, 41, 59, 0.8);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
            padding: 1.2rem 1.5rem;
            margin-bottom: 1.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .sentence-text-lead {
            font-size: 1.35rem;
            font-weight: 800;
            color: #f8fafc;
            line-height: 1.4;
        }
        .hl-verb {
            color: #f87171;
            border-bottom: 2.5px solid #ef4444;
            padding-bottom: 2px;
        }
        .hl-time {
            color: #38bdf8;
            border-bottom: 2.5px solid #0ea5e9;
            padding-bottom: 2px;
        }
        .sentence-actions {
            display: flex;
            gap: 0.6rem;
        }
        .btn-action-listen {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .btn-action-listen:hover {
            background: white;
            color: #0f172a;
        }
        .btn-action-invert {
            background: rgba(244, 63, 94, 0.15);
            border: 1px solid rgba(244, 63, 94, 0.4);
            color: #fb7185;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .btn-action-invert:hover {
            background: #f43f5e;
            color: white;
        }

        .inspector-analysis-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .analysis-card {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 0.9rem 1.1rem;
        }
        .analysis-card-title {
            font-size: 0.78rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.3rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .analysis-card-verb .analysis-card-title { color: #f87171; }
        .analysis-card-time .analysis-card-title { color: #38bdf8; }
        .analysis-card-tip .analysis-card-title { color: #fde047; }
        .analysis-card-val {
            font-size: 1.05rem;
            font-weight: 700;
            color: white;
            margin-bottom: 0.2rem;
        }
        .analysis-card-desc {
            font-size: 0.85rem;
            color: #94a3b8;
            line-height: 1.4;
        }

        /* TAB 2: Nutid som Fremtid Lab */
        .future-lab-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2.5rem;
        }
        .future-model-card {
            background: #1e293b;
            border-radius: 20px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            padding: 1.6rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .model-card-tag {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            width: fit-content;
            margin-bottom: 0.8rem;
        }
        .tag-model-1 { background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; color: #4ade80; }
        .tag-model-2 { background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; color: #fbbf24; }
        .tag-model-3 { background: rgba(168, 85, 247, 0.15); border: 1px solid #a855f7; color: #c084fc; }
        .future-model-title { font-size: 1.3rem; font-weight: 800; color: white; margin-bottom: 0.5rem; }
        .future-model-desc { color: #94a3b8; font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.2rem; }
        .example-list {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 12px;
            padding: 1rem;
            margin-bottom: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.7rem;
        }
        .example-item {
            font-size: 0.95rem;
            color: #f1f5f9;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .listen-icon-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.1rem;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .listen-icon-btn:hover { opacity: 1; transform: scale(1.1); }

        /* Quiz: Er det fremtid? */
        .mini-quiz-card {
            background: linear-gradient(145deg, #1e293b, #0f172a);
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            border-radius: 20px;
            padding: 1.8rem;
            margin-bottom: 2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }
        .mini-quiz-header {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .mini-quiz-header h3 { font-size: 1.4rem; font-weight: 800; color: white; margin-bottom: 0.4rem; }
        .mini-quiz-header p { color: #94a3b8; font-size: 0.95rem; }

        .quiz-card-item {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 1.2rem;
            margin-bottom: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }
        .quiz-sentence-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 1.2rem;
            font-weight: 800;
            color: #f8fafc;
        }
        .quiz-options-row {
            display: flex;
            gap: 0.8rem;
            flex-wrap: wrap;
        }
        .quiz-opt-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            color: white;
            padding: 0.55rem 1.1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .quiz-opt-btn:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }
        .quiz-opt-btn.correct {
            background: #22c55e !important;
            border-color: #22c55e !important;
            color: white !important;
        }
        .quiz-opt-btn.wrong {
            background: #ef4444 !important;
            border-color: #ef4444 !important;
            color: white !important;
        }
        .quiz-feedback-box {
            font-size: 0.88rem;
            line-height: 1.4;
            padding: 0.6rem 0.9rem;
            border-radius: 8px;
            display: none;
        }
        .quiz-feedback-box.show-success {
            display: block;
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #4ade80;
        }
        .quiz-feedback-box.show-error {
            display: block;
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid #ef4444;
            color: #f87171;
        }

        /* TAB 3: Tids-Værkstedet */
        .vaerksted-card {
            background: #1e293b;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            margin-bottom: 2rem;
        }
        .vaerksted-progress-bar {
            width: 100%;
            height: 8px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 1.5rem;
        }
        .vaerksted-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #0ea5e9, #22c55e);
            width: 10%;
            transition: width 0.3s ease;
        }
        .vaerksted-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            color: #94a3b8;
            font-size: 0.9rem;
            font-weight: 700;
        }
        .vaerksted-sentence-box {
            background: rgba(15, 23, 42, 0.7);
            border: 2px dashed rgba(255, 255, 255, 0.18);
            border-radius: 16px;
            padding: 1.8rem;
            text-align: center;
            font-size: 1.45rem;
            font-weight: 800;
            color: white;
            margin-bottom: 1.8rem;
            line-height: 1.5;
        }
        .blank-placeholder {
            display: inline-block;
            min-width: 120px;
            padding: 0.15rem 0.8rem;
            border-bottom: 3px solid #38bdf8;
            color: #38bdf8;
            font-weight: 900;
            background: rgba(56, 189, 248, 0.1);
            border-radius: 8px;
        }
        .vaerksted-choices-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .vaerksted-choice-btn {
            background: rgba(255, 255, 255, 0.06);
            border: 2px solid rgba(255, 255, 255, 0.12);
            color: #f1f5f9;
            padding: 1rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            text-align: center;
        }
        .vaerksted-choice-btn:hover {
            background: rgba(255, 255, 255, 0.12);
            border-color: #38bdf8;
            transform: translateY(-3px);
        }
        .vaerksted-choice-btn.selected-correct {
            background: #22c55e !important;
            border-color: #22c55e !important;
            color: white !important;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
        }
        .vaerksted-choice-btn.selected-wrong {
            background: #ef4444 !important;
            border-color: #ef4444 !important;
            color: white !important;
        }
        .vaerksted-feedback-banner {
            border-radius: 12px;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
            font-size: 1rem;
            line-height: 1.5;
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .vaerksted-feedback-banner.correct {
            display: block;
            background: rgba(34, 197, 94, 0.15);
            border: 1.5px solid #22c55e;
            color: #4ade80;
        }
        .vaerksted-feedback-banner.wrong {
            display: block;
            background: rgba(239, 68, 68, 0.15);
            border: 1.5px solid #ef4444;
            color: #f87171;
        }
        .vaerksted-actions-row {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
        }
        .btn-next-question {
            background: #0ea5e9;
            color: white;
            border: none;
            padding: 0.85rem 1.8rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: none;
        }
        .btn-next-question:hover {
            background: #0284c7;
            transform: translateY(-2px);
        }

        /* TAB 4: Tidslinje & Frekvens */
        .timeline-section-card {
            background: #1e293b;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }
        .timeline-track {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1.2rem;
            margin-bottom: 2rem;
        }
        .timeline-column {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1.2rem;
        }
        .timeline-col-header {
            font-size: 1.1rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .col-past { color: #f43f5e; border-color: rgba(244, 63, 94, 0.3); }
        .col-now { color: #22c55e; border-color: rgba(34, 197, 94, 0.3); }
        .col-future { color: #38bdf8; border-color: rgba(56, 189, 248, 0.3); }
        .tidsord-chip-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .tidsord-chip {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            padding: 0.5rem 0.8rem;
            font-size: 0.88rem;
            color: #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .tidsord-chip:hover {
            background: rgba(255, 255, 255, 0.12);
            border-color: #38bdf8;
            transform: translateX(4px);
        }

        /* Frekvens Barometer */
        .frekvens-barometer {
            background: rgba(15, 23, 42, 0.7);
            border-radius: 16px;
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .frekvens-scale {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-top: 1rem;
        }
        .frekvens-step {
            flex: 1;
            min-width: 90px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 0.8rem 0.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .frekvens-step:hover {
            background: rgba(245, 158, 11, 0.15);
            border-color: #f59e0b;
            transform: translateY(-3px);
        }
        .frekvens-pct { font-size: 0.75rem; color: #f59e0b; font-weight: 800; }
        .frekvens-word { font-size: 0.95rem; font-weight: 700; color: white; margin-top: 0.2rem; }

        @media (max-width: 768px) {
            .tids-hero h1 { font-size: 1.8rem; }
            .golden-rule-banner { flex-direction: column; text-align: center; gap: 0.8rem; }
            .timeline-track { grid-template-columns: 1fr; }
            .sentence-display-box { flex-direction: column; align-items: flex-start; }
            .sentence-actions { width: 100%; justify-content: flex-end; }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'tids-hero';
    hero.innerHTML = `
        <div class="byggeplads-pills">
            <span>Sprogets Byggeplads:</span>
            <span class="pill-vrb">🔴 Verbum (Motoren)</span>
            <span class="pill-plus">+</span>
            <span class="pill-adv">🔵 Tidsudtryk (Tidsankeret)</span>
        </div>
        <h1>Tidsudtryk & Handlinger</h1>
        <p>I moderne hverdagsdansk bruger vi næsten altid <strong>nutid</strong>, når vi taler om fremtidige planer (<em>"Jeg rejser i morgen"</em>). Lær samspillet mellem handlingen og tiden.</p>
    `;
    viewContainer.appendChild(hero);

    // Den Gyldne Regel i Moderne Dansk Banner
    const goldenBanner = document.createElement('div');
    goldenBanner.className = 'golden-rule-banner';
    goldenBanner.innerHTML = `
        <div class="golden-rule-icon">💡</div>
        <div class="golden-rule-content">
            <h3>Moderne dansk: Nutid som Fremtid ✈️</h3>
            <p>Du behøver <strong>IKKE</strong> altid sige <em>"Jeg skal rejse"</em>. Når der er et tidsord som <span class="golden-rule-highlight">i morgen</span>, <span class="golden-rule-highlight">i aften</span> eller <span class="golden-rule-highlight">på fredag</span>, bruger vi som regel almindelig nutid:<br>
            ✅ <strong>"Jeg rejser til Italien i morgen."</strong> <em>(Helt naturligt hverdagsdansk!)</em><br>
            ✅ <strong>"Toget afgår klokken 11:15."</strong> &nbsp;•&nbsp; ✅ <strong>"Vi ses i aften!"</strong></p>
        </div>
    `;
    viewContainer.appendChild(goldenBanner);

    // Tabs Nav
    const tabsNav = document.createElement('div');
    tabsNav.className = 'tids-tabs-nav';

    const tabsData = [
        { id: 'vrimmel', label: '🏙️ Vrimlebillede & Hotspots' },
        { id: 'nutid_fremtid', label: '⚡ Nutid som Fremtid' },
        { id: 'vaerksted', label: '🎯 Tids-Værkstedet' },
        { id: 'tidslinje', label: '🧭 Tidslinje & Frekvens' }
    ];

    let currentTab = extraData.subPath || 'vrimmel';
    if (!tabsData.some(t => t.id === currentTab)) currentTab = 'vrimmel';

    const contentArea = document.createElement('div');
    contentArea.className = 'tids-content-area';

    tabsData.forEach(tab => {
        const btn = document.createElement('button');
        btn.className = `tids-tab-btn ${tab.id === currentTab ? 'active' : ''}`;
        btn.textContent = tab.label;
        btn.onclick = () => {
            currentTab = tab.id;
            tabsNav.querySelectorAll('.tids-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Deep link update
            const lang = appState.lang || getLang();
            window.history.pushState(null, '', `#/${lang}/traen_tidsudtryk/${tab.id}`);

            renderActiveTab();
        };
        tabsNav.appendChild(btn);
    });

    viewContainer.appendChild(tabsNav);
    viewContainer.appendChild(contentArea);

    // -------------------------------------------------------------
    // DATA: 6 Hotspots i Vrimlebilledet
    // -------------------------------------------------------------
    const VRIMMEL_HOTSPOTS = [
        {
            id: 'rejser_imorgen',
            title: 'Manden med kufferten',
            icon: '🧳',
            badge: 'Nutid som fremtid ✈️',
            x: 51,
            y: 74,
            straightSentence: 'Jeg rejser til Italien i morgen.',
            inversionSentence: 'I morgen rejser jeg til Italien.',
            modalAlternative: 'Jeg skal rejse til Italien i morgen.',
            verb: 'rejser',
            verbTense: 'Nutid (præsens)',
            timeWord: 'i morgen',
            timeCategory: 'Fremtidigt tidsadverbium',
            description: 'Manden står klar med kuffert og togbillet på pladsen foran Københavns Hovedbanegård.',
            pedagogicalTip: '<strong>Moderne dansk:</strong> Du behøver ikke sige "skal rejse". Når du har tidsordet <em>"i morgen"</em>, bruger vi næsten altid almindelig nutid: <strong>"Jeg rejser i morgen"</strong>.'
        },
        {
            id: 'drikker_kaffe_nu',
            title: 'Café Hygge (Lige nu)',
            icon: '☕',
            badge: 'Nutid her & nu ☕',
            x: 67,
            y: 80,
            straightSentence: 'Vi drikker kaffe og spiser kage nu.',
            inversionSentence: 'Nu drikker vi kaffe og spiser kage.',
            verb: 'drikker',
            verbTense: 'Nutid (præsens)',
            timeWord: 'nu / lige nu',
            timeCategory: 'Nutidigt tidsadverbium',
            description: 'Vennerne sidder ved cafébordet i solskinnet og nyder deres kaffe.',
            pedagogicalTip: 'Når handlingen sker lige i dette øjeblik, bruger vi nutid sammen med <em>nu</em> eller <em>lige nu</em>.'
        },
        {
            id: 'drak_kaffe_imorges',
            title: 'Morgenstund (Fortid)',
            icon: '🥐',
            badge: 'Datid (Afsluttet tid) ⏪',
            x: 89,
            y: 83,
            straightSentence: 'Jeg drak kaffe i morges.',
            inversionSentence: 'I morges drak jeg kaffe.',
            verb: 'drak',
            verbTense: 'Datid (præteritum)',
            timeWord: 'i morges',
            timeCategory: 'Fortidigt tidsadverbium',
            description: 'Manden mindes morgenkaffen tidligere på dagen, før han tog ind til byen.',
            pedagogicalTip: 'Fordi handlingen skete tidligere i dag og er afsluttet, skifter verbet til <strong>datid</strong> (<em>drak</em>) sammen med <em>i morges</em>.'
        },
        {
            id: 'ses_iaften',
            title: 'Vennerne ved overgangen',
            icon: '🫂',
            badge: 'Nær fremtid & aftale 🌙',
            x: 18,
            y: 72,
            straightSentence: 'Vi ses til middag i aften!',
            inversionSentence: 'I aften ses vi til middag!',
            verb: 'ses',
            verbTense: 'Nutid (reciprok/passiv form)',
            timeWord: 'i aften',
            timeCategory: 'Fremtidigt tidsadverbium',
            description: 'Tre gode venner skilles ved fodgængerovergangen og aftaler at mødes igen senere.',
            pedagogicalTip: 'Hilsenen <em>"Vi ses i aften"</em> er en af de mest almindelige vendinger på dansk. Verbet <em>ses</em> er nutid, men <em>i aften</em> peger direkte fremad.'
        },
        {
            id: 'toget_afgaar',
            title: 'Toget på perronen',
            icon: '🚆',
            badge: 'Køreplan & tidsplan ⏱️',
            x: 82,
            y: 22,
            straightSentence: 'Toget afgår klokken 11:15.',
            inversionSentence: 'Klokken 11:15 afgår toget.',
            verb: 'afgår / kører',
            verbTense: 'Nutid (præsens)',
            timeWord: 'klokken 11:15 / om lidt',
            timeCategory: 'Præcist tidsadverbial',
            description: 'Det røde og hvide DSB-tog holder ved perronen klar til afgang mod Århus.',
            pedagogicalTip: 'I køreplaner og officielle programmer bruger dansk altid nutid om fremtidige tidspunkter: <em>"Toget kører kl. 11:15"</em>, <em>"Filmen starter kl. 20"</em>.'
        },
        {
            id: 'cykler_altid',
            title: 'Cyklisterne i byen',
            icon: '🚲',
            badge: 'Frekvens & hverdagsrutine 🔁',
            x: 39,
            y: 62,
            straightSentence: 'Hun cykler altid på arbejde.',
            inversionSentence: 'Hver dag cykler hun på arbejde.',
            verb: 'cykler',
            verbTense: 'Nutid (vane/gentagelse)',
            timeWord: 'altid / hver dag',
            timeCategory: 'Frekvensadverbium (100%)',
            description: 'En kvinde på grøn cykel pendler ufortrødent gennem byen.',
            pedagogicalTip: 'Frekvensadverbier som <em>altid, tit, ofte, sjældent</em> og <em>aldrig</em> knytter sig til verbet for at fortælle, hvor tit handlingen gentages.'
        }
    ];

    let selectedHotspot = VRIMMEL_HOTSPOTS[0];
    let isInverted = false;

    // -------------------------------------------------------------
    // RENDER AKTIV FANE
    // -------------------------------------------------------------
    function renderActiveTab() {
        contentArea.innerHTML = '';

        if (currentTab === 'vrimmel') {
            renderVrimmelTab(contentArea);
        } else if (currentTab === 'nutid_fremtid') {
            renderNutidFremtidTab(contentArea);
        } else if (currentTab === 'vaerksted') {
            renderVaerkstedTab(contentArea);
        } else if (currentTab === 'tidslinje') {
            renderTidslinjeTab(contentArea);
        }
    }

    // --- TAB 1: VRIMLEBILLEDE & HOTSPOTS ---
    function renderVrimmelTab(parent) {
        const stageCard = document.createElement('div');
        stageCard.className = 'vrimmel-stage-card';

        stageCard.innerHTML = `
            <div class="vrimmel-stage-header">
                <div>
                    <div class="vrimmel-stage-title">
                        <span>🏙️</span>
                        <span>København Hovedbanegård & Bytorv</span>
                    </div>
                    <div class="vrimmel-stage-subtitle">Tryk på et pegefelt i scenen for at se samspillet mellem handling og tid</div>
                </div>
            </div>

            <div class="vrimmel-img-container" id="vrimmel-container">
                <img src="assets/tidsudtryk_vrimmel.jpg" alt="Vrimlebillede over Tidsudtryk i København" class="vrimmel-img" />
            </div>

            <div class="hotspot-inspector" id="hotspot-inspector"></div>
        `;

        const imgContainer = stageCard.querySelector('#vrimmel-container');
        const inspectorEl = stageCard.querySelector('#hotspot-inspector');

        // Tilføj de 6 pins
        VRIMMEL_HOTSPOTS.forEach(spot => {
            const pin = document.createElement('button');
            pin.type = 'button';
            pin.className = `tids-pin ${spot.id === selectedHotspot.id ? 'active' : ''}`;
            pin.style.left = `${spot.x}%`;
            pin.style.top = `${spot.y}%`;
            pin.title = spot.title;
            pin.innerHTML = `
                <span>${spot.icon}</span>
                <div class="tids-pin-pill">${spot.icon} ${spot.title}</div>
            `;

            pin.onclick = (e) => {
                e.stopPropagation();
                selectedHotspot = spot;
                isInverted = false;
                stageCard.querySelectorAll('.tids-pin').forEach(p => p.classList.remove('active'));
                pin.classList.add('active');
                updateInspector(inspectorEl);
            };

            imgContainer.appendChild(pin);
        });

        function updateInspector(targetEl) {
            const sentenceToDisplay = isInverted ? selectedHotspot.inversionSentence : selectedHotspot.straightSentence;
            
            // Format sentence with colored word-class highlights
            let highlighted = sentenceToDisplay
                .replace(selectedHotspot.verb, `<span class="hl-verb" title="🔴 Verbum">${selectedHotspot.verb}</span>`);
            
            // Replace time phrase
            const timeParts = selectedHotspot.timeWord.split(' / ');
            timeParts.forEach(tp => {
                const reg = new RegExp(`(${tp})`, 'gi');
                highlighted = highlighted.replace(reg, `<span class="hl-time" title="🔵 Tidsudtryk">$1</span>`);
            });

            targetEl.innerHTML = `
                <div class="inspector-top">
                    <div class="inspector-title-area">
                        <span class="inspector-icon">${selectedHotspot.icon}</span>
                        <div>
                            <div class="inspector-title">${selectedHotspot.title}</div>
                            <span class="inspector-badge">${selectedHotspot.badge}</span>
                        </div>
                    </div>
                </div>

                <div class="sentence-display-box">
                    <div class="sentence-text-lead">${highlighted}</div>
                    <div class="sentence-actions">
                        <button type="button" class="btn-action-listen" id="btn-listen">
                            <span>🔊</span>
                            <span>Hør sætning</span>
                        </button>
                        <button type="button" class="btn-action-invert" id="btn-invert" title="Skift mellem ligefrem ordstilling og inversion">
                            <span>🔄</span>
                            <span>${isInverted ? 'Vis ligefrem ordstilling' : 'Vend: Sæt tiden forrest (Inversion)'}</span>
                        </button>
                    </div>
                </div>

                <div class="inspector-analysis-grid">
                    <div class="analysis-card analysis-card-verb">
                        <div class="analysis-card-title">🔴 Verbum (Handlingen)</div>
                        <div class="analysis-card-val">${selectedHotspot.verb}</div>
                        <div class="analysis-card-desc">Bøjningsform: <strong>${selectedHotspot.verbTense}</strong></div>
                    </div>
                    <div class="analysis-card analysis-card-time">
                        <div class="analysis-card-title">🔵 Tidsudtryk (Tidsankeret)</div>
                        <div class="analysis-card-val">${selectedHotspot.timeWord}</div>
                        <div class="analysis-card-desc">${selectedHotspot.timeCategory}</div>
                    </div>
                    <div class="analysis-card analysis-card-tip">
                        <div class="analysis-card-title">💡 Pædagogisk pointe</div>
                        <div class="analysis-card-desc">${selectedHotspot.pedagogicalTip}</div>
                    </div>
                </div>
            `;

            targetEl.querySelector('#btn-listen').onclick = () => {
                speakDanish(sentenceToDisplay);
            };

            targetEl.querySelector('#btn-invert').onclick = () => {
                isInverted = !isInverted;
                updateInspector(targetEl);
            };
        }

        updateInspector(inspectorEl);
        parent.appendChild(stageCard);
    }

    // --- TAB 2: NUTID SOM FREMTID LAB ---
    function renderNutidFremtidTab(parent) {
        const labGrid = document.createElement('div');
        labGrid.className = 'future-lab-grid';

        labGrid.innerHTML = `
            <!-- Model 1: Nutid + Tidsadverbium -->
            <div class="future-model-card">
                <div>
                    <div class="model-card-tag tag-model-1">⭐ Den mest almindelige hverdagsform</div>
                    <div class="future-model-title">1. Nutid + Tidsord</div>
                    <div class="future-model-desc">
                        I hverdagsdansk bruger vi næsten altid almindelig nutid, fordi tidsordet (<em>i morgen, i aften, om lidt</em>) allerede fastslår fremtiden.
                    </div>
                    <div class="example-list">
                        <div class="example-item">
                            <span>✈️ <strong>Jeg rejser</strong> til Italien i morgen.</span>
                            <button class="listen-icon-btn" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Jeg rejser til Italien i morgen.'))">🔊</button>
                        </div>
                        <div class="example-item">
                            <span>🍕 <strong>Vi spiser</strong> pizza i aften kl. 18.</span>
                            <button class="listen-icon-btn" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Vi spiser pizza i aften klokken 18.'))">🔊</button>
                        </div>
                        <div class="example-item">
                            <span>🚆 Toget <strong>kører</strong> om fem minutter.</span>
                            <button class="listen-icon-btn" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Toget kører om fem minutter.'))">🔊</button>
                        </div>
                    </div>
                </div>
                <div style="font-size: 0.85rem; color: #4ade80; font-weight: 700;">
                    ✓ 90% af al samtale om fremtidige aftaler bruger denne model!
                </div>
            </div>

            <!-- Model 2: SKAL + Infinitiv -->
            <div class="future-model-card">
                <div>
                    <div class="model-card-tag tag-model-2">🗓️ Plan, forpligtelse eller aftale</div>
                    <div class="future-model-title">2. 'SKAL' + Navneform</div>
                    <div class="future-model-desc">
                        Bruges når der er en decideret fast plan, pligt eller officiel aftale (f.eks. læge, tandlæge, arbejde eller eksamen).
                    </div>
                    <div class="example-list">
                        <div class="example-item">
                            <span>🦷 Jeg <strong>skal</strong> til tandlægen på mandag.</span>
                            <button class="listen-icon-btn" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Jeg skal til tandlægen på mandag.'))">🔊</button>
                        </div>
                        <div class="example-item">
                            <span>💼 Han <strong>skal</strong> starte på nyt arbejde snart.</span>
                            <button class="listen-icon-btn" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Han skal starte på nyt arbejde snart.'))">🔊</button>
                        </div>
                        <div class="example-item">
                            <span>✈️ Jeg <strong>skal</strong> rejse tidligt i morgen.</span>
                            <button class="listen-icon-btn" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Jeg skal rejse tidligt i morgen.'))">🔊</button>
                        </div>
                    </div>
                </div>
                <div style="font-size: 0.85rem; color: #fbbf24; font-weight: 700;">
                    ✓ Bruges når noget er bestemt eller nødvendigt.
                </div>
            </div>

            <!-- Model 3: VIL + Infinitiv -->
            <div class="future-model-card">
                <div>
                    <div class="model-card-tag tag-model-3">💭 Ønske, vilje eller forudsigelse</div>
                    <div class="future-model-title">3. 'VIL' + Navneform</div>
                    <div class="future-model-desc">
                        Bruges om noget man <em>har lyst til</em> (vil gerne), eller en uundgåelig forudsigelse (fx vejrudsigten).
                    </div>
                    <div class="example-list">
                        <div class="example-item">
                            <span>☕ Jeg <strong>vil</strong> gerne have en kop kaffe.</span>
                            <button class="listen-icon-btn" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Jeg vil gerne have en kop kaffe.'))">🔊</button>
                        </div>
                        <div class="example-item">
                            <span>🌧️ Det <strong>vil</strong> regne i eftermiddag.</span>
                            <button class="listen-icon-btn" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Det vil regne i eftermiddag.'))">🔊</button>
                        </div>
                        <div class="example-item">
                            <span>🏠 Vi <strong>vil</strong> gerne købe et hus en dag.</span>
                            <button class="listen-icon-btn" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Vi vil gerne købe et hus en dag.'))">🔊</button>
                        </div>
                    </div>
                </div>
                <div style="font-size: 0.85rem; color: #c084fc; font-weight: 700;">
                    ✓ Viser hensigt ("vil gerne") eller naturens gang.
                </div>
            </div>
        `;
        parent.appendChild(labGrid);

        // Mini Quiz: Peger sætningen på fremtiden eller lige nu?
        const quizCard = document.createElement('div');
        quizCard.className = 'mini-quiz-card';
        quizCard.innerHTML = `
            <div class="mini-quiz-header">
                <h3>🧪 Mini-laboratorium: Peger sætningen på Fremtid eller Lige Nu?</h3>
                <p>Læg mærke til verbet og tidsudtrykket i hver sætning</p>
            </div>
            <div id="quiz-list-container"></div>
        `;

        const quizItems = [
            {
                sentence: "Jeg ringer til dig i morgen tidlig.",
                correct: "fremtid",
                explanation: "Verbet 'ringer' er nutid, men tidsudtrykket 'i morgen tidlig' gør, at hele handlingen sker i FREMTIDEN."
            },
            {
                sentence: "Lige nu drikker jeg en kop kaffe på bænken.",
                correct: "ligenu",
                explanation: "'Lige nu' angiver det aktuelle øjeblik. Handlingen foregår i nutiden."
            },
            {
                sentence: "Vi flytter i næste måned.",
                correct: "fremtid",
                explanation: "'Flytter' er nutid, men 'i næste måned' placerer begivenheden i fremtiden."
            },
            {
                sentence: "Toget afgår om to minutter.",
                correct: "fremtid",
                explanation: "Køreplanen er fastsat, og 'om to minutter' peger ud i den nære fremtid."
            }
        ];

        const quizList = quizCard.querySelector('#quiz-list-container');
        quizItems.forEach((q, idx) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'quiz-card-item';
            itemEl.innerHTML = `
                <div class="quiz-sentence-row">
                    <span>${q.sentence}</span>
                    <button class="listen-icon-btn" title="Lyt">🔊</button>
                </div>
                <div class="quiz-options-row">
                    <button type="button" class="quiz-opt-btn" data-choice="ligenu">⏸️ Lige nu (Nutid)</button>
                    <button type="button" class="quiz-opt-btn" data-choice="fremtid">⏩ Fremtid (Plan/Aftale)</button>
                </div>
                <div class="quiz-feedback-box" id="q-feedback-${idx}"></div>
            `;

            itemEl.querySelector('.listen-icon-btn').onclick = () => speakDanish(q.sentence);

            const optBtns = itemEl.querySelectorAll('.quiz-opt-btn');
            const feedbackEl = itemEl.querySelector(`#q-feedback-${idx}`);

            optBtns.forEach(btn => {
                btn.onclick = () => {
                    const choice = btn.getAttribute('data-choice');
                    optBtns.forEach(b => b.classList.remove('correct', 'wrong'));

                    if (choice === q.correct) {
                        btn.classList.add('correct');
                        feedbackEl.className = 'quiz-feedback-box show-success';
                        feedbackEl.innerHTML = `🎉 <strong>Rigtigt!</strong> ${q.explanation}`;
                    } else {
                        btn.classList.add('wrong');
                        feedbackEl.className = 'quiz-feedback-box show-error';
                        feedbackEl.innerHTML = `Prøv igen: ${q.explanation}`;
                    }
                };
            });

            quizList.appendChild(itemEl);
        });

        parent.appendChild(quizCard);
    }

    // --- TAB 3: TIDS-VÆRKSTEDET (OPGAVER) ---
    function renderVaerkstedTab(parent) {
        const vaerkstedCard = document.createElement('div');
        vaerkstedCard.className = 'vaerksted-card';

        const QUESTIONS = [
            {
                textBefore: "Jeg rejser til Italien ",
                textAfter: ".",
                correct: "i morgen",
                options: ["i morgen", "i går", "for to dage siden"],
                tip: "Præcis! I moderne dansk bruger vi almindelig nutid ('rejser') sammen med 'i morgen' om fremtidige rejser og ferier.",
                verbContext: "rejser (nutid om fremtid)"
            },
            {
                textBefore: "Jeg drak en dejlig kop kaffe ",
                textAfter: ".",
                correct: "i morges",
                options: ["i morges", "i morgen", "nu"],
                tip: "Korrekt! Verbet 'drak' er datid (i fortiden). Derfor passer 'i morges' perfekt.",
                verbContext: "drak (datid)"
            },
            {
                textBefore: "",
                textAfter: " rejser vi til Italien.",
                correct: "I morgen",
                options: ["I morgen", "I går", "Forleden"],
                tip: "Flot! Her har vi inversion: Tidsudtrykket 'I morgen' står på 1. plads, og verbet 'rejser' følger straks på 2. plads.",
                verbContext: "Inversion (tid forrest)"
            },
            {
                textBefore: "Toget mod Århus afgår ",
                textAfter: ".",
                correct: "om fem minutter",
                options: ["om fem minutter", "i går aftes", "sidste uge"],
                tip: "Rigtigt! Køreplaner omtales altid i nutid: 'Toget afgår om fem minutter'.",
                verbContext: "afgår (køreplan i nutid)"
            },
            {
                textBefore: "Vi ses til middag ",
                textAfter: "!",
                correct: "i aften",
                options: ["i aften", "i forgårs", "for en uge siden"],
                tip: "Helt rigtigt! 'Vi ses i aften' er en klassisk hverdagsaftale i nær fremtid.",
                verbContext: "ses (nær fremtid)"
            },
            {
                textBefore: "Hun cykler ",
                textAfter: " på arbejde gennem byen.",
                correct: "altid",
                options: ["altid", "i går morges", "i forgårs"],
                tip: "Præcis! 'Altid' er et frekvensadverbium (100%), som beskriver en fast hverdagsrutine.",
                verbContext: "cykler (gentagelse / vane)"
            },
            {
                textBefore: "",
                textAfter: " drak jeg en kold øl ved kanalen.",
                correct: "I fredags",
                options: ["I fredags", "I aften", "I morgen"],
                tip: "Rigtigt! 'Drak' er datid, så her skal vi bruge det afsluttede tidsudtryk 'I fredags'.",
                verbContext: "Inversion i datid"
            },
            {
                textBefore: "I aften ",
                textAfter: " vi en god film i biografen.",
                correct: "ser",
                options: ["ser", "så", "have set"],
                tip: "Fremragende! I aften + nutidsformen 'ser' danner den helt naturlige hverdagsdanske fremtid.",
                verbContext: "ser (nutid som fremtid)"
            },
            {
                textBefore: "Han ",
                textAfter: " til tandlægen i morgen tidlig.",
                correct: "skal",
                options: ["skal", "var", "blev"],
                tip: "Korrekt! Modalverbet 'skal' bruges ved faste aftaler og forpligtelser: 'skal til tandlægen'.",
                verbContext: "skal (aftale / nødvendighed)"
            },
            {
                textBefore: "Vi flytter ind i den nye lejlighed ",
                textAfter: ".",
                correct: "i næste uge",
                options: ["i næste uge", "i morges", "for to år siden"],
                tip: "Præcis! 'Flytter' er nutid, og 'i næste uge' gør, at det er en fremtidig flytning.",
                verbContext: "flytter (planlagt fremtid)"
            }
        ];

        let currentIdx = 0;
        let score = 0;

        function renderQuestion() {
            vaerkstedCard.innerHTML = '';
            const q = QUESTIONS[currentIdx];
            const pct = Math.round(((currentIdx + 1) / QUESTIONS.length) * 100);

            vaerkstedCard.innerHTML = `
                <div class="vaerksted-progress-bar">
                    <div class="vaerksted-progress-fill" style="width: ${pct}%;"></div>
                </div>
                <div class="vaerksted-header">
                    <span>Opgave ${currentIdx + 1} af ${QUESTIONS.length}</span>
                    <span style="color: #38bdf8;">Kontekst: ${q.verbContext}</span>
                </div>

                <div class="vaerksted-sentence-box">
                    <span>${q.textBefore}</span>
                    <span class="blank-placeholder" id="blank-target">...</span>
                    <span>${q.textAfter}</span>
                </div>

                <div class="vaerksted-choices-grid" id="choices-grid"></div>

                <div class="vaerksted-feedback-banner" id="feedback-banner"></div>

                <div class="vaerksted-actions-row">
                    <button type="button" class="btn-action-listen" id="btn-audio-full" style="display: none;">
                        <span>🔊</span>
                        <span>Hør hele sætningen</span>
                    </button>
                    <button type="button" class="btn-next-question" id="btn-next">Næste opgave ➔</button>
                </div>
            `;

            const choicesGrid = vaerkstedCard.querySelector('#choices-grid');
            const blankTarget = vaerkstedCard.querySelector('#blank-target');
            const feedbackBanner = vaerkstedCard.querySelector('#feedback-banner');
            const nextBtn = vaerkstedCard.querySelector('#btn-next');
            const audioBtn = vaerkstedCard.querySelector('#btn-audio-full');

            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'vaerksted-choice-btn';
                btn.textContent = opt;

                btn.onclick = () => {
                    choicesGrid.querySelectorAll('.vaerksted-choice-btn').forEach(b => b.disabled = true);
                    blankTarget.textContent = opt;

                    const fullSentence = `${q.textBefore}${opt}${q.textAfter}`;

                    if (opt === q.correct) {
                        score++;
                        btn.classList.add('selected-correct');
                        feedbackBanner.className = 'vaerksted-feedback-banner correct';
                        feedbackBanner.innerHTML = `🎉 <strong>Rigtigt!</strong> ${q.tip}`;
                    } else {
                        btn.classList.add('selected-wrong');
                        // Find the right one and highlight gently
                        choicesGrid.querySelectorAll('.vaerksted-choice-btn').forEach(b => {
                            if (b.textContent === q.correct) b.classList.add('selected-correct');
                        });
                        feedbackBanner.className = 'vaerksted-feedback-banner wrong';
                        feedbackBanner.innerHTML = `Det rigtige svar er <strong>"${q.correct}"</strong>.<br>${q.tip}`;
                    }

                    audioBtn.style.display = 'inline-flex';
                    audioBtn.onclick = () => speakDanish(fullSentence);

                    nextBtn.style.display = 'inline-block';
                    if (currentIdx === QUESTIONS.length - 1) {
                        nextBtn.textContent = 'Se resultat 🏆';
                    }
                };

                choicesGrid.appendChild(btn);
            });

            nextBtn.onclick = () => {
                if (currentIdx < QUESTIONS.length - 1) {
                    currentIdx++;
                    renderQuestion();
                } else {
                    renderResult();
                }
            };
        }

        function renderResult() {
            vaerkstedCard.innerHTML = `
                <div style="text-align: center; padding: 2rem 1rem;">
                    <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎉</div>
                    <h2 style="font-size: 2rem; color: white; margin-bottom: 0.5rem;">Godt klaret!</h2>
                    <p style="color: #94a3b8; font-size: 1.15rem; margin-bottom: 1.5rem;">
                        Du fik <strong>${score}</strong> ud af <strong>${QUESTIONS.length}</strong> rigtige.
                    </p>
                    <p style="color: #e2e8f0; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6;">
                        Du har nu styr på, at vi i moderne dansk bruger <strong>nutid</strong> til fremtidige rejser og planer (<em>"Jeg rejser i morgen"</em>), og at tidsudtrykket fastsætter tidsforankringen.
                    </p>
                    <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        <button type="button" class="gemini-btn" id="btn-restart" style="padding: 0.8rem 1.6rem; border-radius: 12px; font-weight: 700; cursor: pointer;">
                            Prøv igen 🔄
                        </button>
                        <button type="button" class="gemini-btn outline-btn" id="btn-to-byggeplads" style="padding: 0.8rem 1.6rem; border-radius: 12px; font-weight: 700; cursor: pointer; background: transparent; border: 1.5px solid #38bdf8; color: #38bdf8;">
                            Tilbage til Sprogets Byggeplads ➔
                        </button>
                    </div>
                </div>
            `;

            vaerkstedCard.querySelector('#btn-restart').onclick = () => {
                currentIdx = 0;
                score = 0;
                renderQuestion();
            };

            vaerkstedCard.querySelector('#btn-to-byggeplads').onclick = () => {
                navigateFn('word_learning');
            };
        }

        renderQuestion();
        parent.appendChild(vaerkstedCard);
    }

    // --- TAB 4: TIDSLINJE & FREKVENS ---
    function renderTidslinjeTab(parent) {
        const timelineCard = document.createElement('div');
        timelineCard.className = 'timeline-section-card';

        timelineCard.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.35rem; font-weight: 800; color: white; margin-bottom: 0.3rem;">
                    🧭 Tidsaksen (Fra Byggepladsens Adverbier)
                </h3>
                <p style="color: #94a3b8; font-size: 0.95rem;">
                    Tryk på et tidsord for at høre det og se, hvordan det placerer handlingen i tid.
                </p>
            </div>

            <div class="timeline-track">
                <!-- Fortid -->
                <div class="timeline-column">
                    <div class="timeline-col-header col-past">
                        <span>⏪</span>
                        <span>Fortid (Datid)</span>
                    </div>
                    <div class="tidsord-chip-list">
                        <div class="tidsord-chip" data-word="i morges" data-sentence="I morges drak jeg kaffe.">
                            <span><strong>i morges</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-word="i går" data-sentence="I går var jeg træt.">
                            <span><strong>i går</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-word="i forgårs" data-sentence="I forgårs cyklede vi i parken.">
                            <span><strong>i forgårs</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-word="i lørdags" data-sentence="I lørdags var vi til fest.">
                            <span><strong>i lørdags</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-word="sidste uge" data-sentence="Sidste uge købte vi ny cykel.">
                            <span><strong>sidste uge</strong></span>
                            <span>🔊</span>
                        </div>
                    </div>
                </div>

                <!-- Nutid -->
                <div class="timeline-column">
                    <div class="timeline-col-header col-now">
                        <span>⏸️</span>
                        <span>Nutid (Her og nu)</span>
                    </div>
                    <div class="tidsord-chip-list">
                        <div class="tidsord-chip" data-word="nu" data-sentence="Nu drikker vi kaffe.">
                            <span><strong>nu</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-word="lige nu" data-sentence="Lige nu sidder jeg på caféen.">
                            <span><strong>lige nu</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-word="i dag" data-sentence="I dag skinner solen i København.">
                            <span><strong>i dag</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-word="i dette øjeblik" data-sentence="I dette øjeblik kører bussen.">
                            <span><strong>i dette øjeblik</strong></span>
                            <span>🔊</span>
                        </div>
                    </div>
                </div>

                <!-- Fremtid -->
                <div class="timeline-column">
                    <div class="timeline-col-header col-future">
                        <span>⏩</span>
                        <span>Fremtid (Plan / Aftale)</span>
                    </div>
                    <div class="tidsord-chip-list">
                        <div class="tidsord-chip" data-word="i morgen" data-sentence="Jeg rejser til Italien i morgen.">
                            <span><strong>i morgen</strong> (nutid)</span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-word="i aften" data-sentence="Vi ses til middag i aften.">
                            <span><strong>i aften</strong> (nutid)</span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-word="om lidt" data-sentence="Toget kører om lidt.">
                            <span><strong>om lidt</strong> (nutid)</span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-word="på fredag" data-sentence="På fredag holder vi fest.">
                            <span><strong>på fredag</strong> (nutid)</span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-word="i næste uge" data-sentence="Vi starter i næste uge.">
                            <span><strong>i næste uge</strong> (nutid)</span>
                            <span>🔊</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Frekvens Barometer -->
            <div class="frekvens-barometer">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <div style="font-weight: 800; font-size: 1.1rem; color: white;">
                        🔁 Frekvens-Barometret: Hvor tit sker handlingen?
                    </div>
                    <span style="font-size: 0.8rem; color: #f59e0b; font-weight: 700;">Fra 0% til 100%</span>
                </div>
                <div class="frekvens-scale">
                    <div class="frekvens-step" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('De kører aldrig i bil.'))">
                        <div class="frekvens-pct">0%</div>
                        <div class="frekvens-word">aldrig</div>
                    </div>
                    <div class="frekvens-step" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Han kommer sjældent for sent.'))">
                        <div class="frekvens-pct">20%</div>
                        <div class="frekvens-word">sjældent</div>
                    </div>
                    <div class="frekvens-step" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Sommetider går vi en tur ved vandet.'))">
                        <div class="frekvens-pct">50%</div>
                        <div class="frekvens-word">sommetider</div>
                    </div>
                    <div class="frekvens-step" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Bussen kommer tit forbi.'))">
                        <div class="frekvens-pct">75%</div>
                        <div class="frekvens-word">tit / ofte</div>
                    </div>
                    <div class="frekvens-step" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('Bageren smiler altid til kunderne.'))">
                        <div class="frekvens-pct">100%</div>
                        <div class="frekvens-word">altid</div>
                    </div>
                </div>
            </div>
        `;

        timelineCard.querySelectorAll('.tidsord-chip').forEach(chip => {
            chip.onclick = () => {
                const sentence = chip.getAttribute('data-sentence');
                speakDanish(sentence);
            };
        });

        parent.appendChild(timelineCard);
    }

    // Initial render
    renderActiveTab();

    container.appendChild(viewContainer);
}
