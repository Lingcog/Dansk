import { getTranslation, getLang, appState } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

/**
 * TraenTidsudtrykView - Didaktisk flade for tidsudtryk og handlinger.
 * Samler verber (handlingen) og adverbielle tidsudtryk (tidsankeret).
 * 
 * Didaktisk opstramning:
 * 1. Dansk retskrivning: Ingen vilkårlige store bogstaver eller bindestreger i overskrifter.
 * 2. Vrimlebilledet sætter de grammatiske tider i fokus (i morgen, lige nu, i morges, i aften, kl. 11.15, altid)
 *    i stedet for personerne.
 * 3. Inversion: Interaktiv vendeknap mellem ligefrem ordstilling og inversion.
 * 4. Hints kun i opgave 1-5, og fjernet fra opgave 6-10.
 */
export function renderTraenTidsudtrykView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container tidsudtryk-view';

    // Toplinje med tilbageknap
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
        if (!('speechSynthesis' in window) || !text) return;
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
            max-width: 1040px;
            margin: 0 auto;
            padding: 0.5rem 1.25rem 4rem;
            color: #f8fafc;
        }

        /* Hero */
        .tids-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .byggeplads-pills {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.3rem 0.9rem;
            border-radius: 9999px;
            margin-bottom: 0.8rem;
            font-size: 0.82rem;
            font-weight: 600;
        }
        .pill-vrb { color: #f87171; background: rgba(239, 68, 68, 0.15); padding: 0.15rem 0.5rem; border-radius: 8px; }
        .pill-adv { color: #38bdf8; background: rgba(56, 189, 248, 0.15); padding: 0.15rem 0.5rem; border-radius: 8px; }
        .pill-plus { color: #94a3b8; }

        .tids-hero h1 {
            font-size: 2.1rem;
            font-weight: 800;
            margin: 0 0 0.5rem;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        .tids-hero p {
            color: #94a3b8;
            font-size: 1.05rem;
            max-width: 720px;
            margin: 0 auto;
            line-height: 1.55;
        }

        /* Regel-banner */
        .golden-rule-banner {
            background: rgba(14, 165, 233, 0.08);
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 16px;
            padding: 1.2rem 1.4rem;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            gap: 1.2rem;
        }
        .golden-rule-icon {
            font-size: 2.2rem;
            flex-shrink: 0;
        }
        .golden-rule-content h3 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #38bdf8;
            margin: 0 0 0.3rem;
        }
        .golden-rule-content p {
            color: #e2e8f0;
            font-size: 0.92rem;
            line-height: 1.5;
            margin: 0;
        }
        .golden-rule-highlight {
            color: #fde047;
            font-weight: 600;
        }

        /* Fanemenu */
        .tids-tabs-nav {
            display: flex;
            gap: 0.4rem;
            margin-bottom: 1.8rem;
            background: rgba(15, 23, 42, 0.8);
            padding: 0.35rem;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            overflow-x: auto;
        }
        .tids-tab-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 0.65rem 1.15rem;
            border-radius: 10px;
            font-weight: 600;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
        }
        .tids-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.05);
        }
        .tids-tab-btn.active {
            background: #0ea5e9;
            color: white;
            font-weight: 700;
        }

        /* TAB 1: Vrimlebillede Stage med Tids-knapper */
        .vrimmel-stage-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            overflow: hidden;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .vrimmel-stage-header {
            padding: 1.2rem 1.4rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .vrimmel-stage-title {
            font-size: 1.15rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.25rem;
        }
        .vrimmel-stage-subtitle {
            font-size: 0.88rem;
            color: #94a3b8;
        }

        /* Række af tids-knapper til at vælge direkte */
        .vrimmel-time-filter-bar {
            padding: 0.75rem 1.25rem;
            background: #0f172a;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            overflow-x: auto;
        }
        .vrimmel-time-label {
            font-size: 0.8rem;
            color: #94a3b8;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            white-space: nowrap;
            margin-right: 0.3rem;
        }
        .time-filter-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #e2e8f0;
            padding: 0.4rem 0.8rem;
            border-radius: 9999px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .time-filter-btn:hover {
            background: rgba(255, 255, 255, 0.12);
            color: white;
            transform: translateY(-1px);
        }
        .time-filter-btn.active {
            background: #38bdf8;
            border-color: #38bdf8;
            color: #0f172a;
            font-weight: 800;
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

        /* Hotspot Pins: Tydelig fokus på TIDSANKERET */
        .tids-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.05rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
            transition: all 0.25s ease;
            z-index: 10;
        }
        .tids-pin:hover, .tids-pin.active {
            transform: translate(-50%, -50%) scale(1.25) !important;
            z-index: 30;
            box-shadow: 0 0 20px #ffffff, 0 4px 15px rgba(0, 0, 0, 0.8);
        }
        .tids-pin-pill {
            position: absolute;
            bottom: 115%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(8px);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.25);
            padding: 0.25rem 0.65rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 700;
            white-space: nowrap;
            pointer-events: none;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            transition: all 0.2s ease;
        }
        .tids-pin:hover .tids-pin-pill, .tids-pin.active .tids-pin-pill {
            transform: translateX(-50%) scale(1.1);
            background: #0f172a;
            border-color: #38bdf8;
        }

        /* Inspektør for valgt tidspunkt */
        .hotspot-inspector {
            padding: 1.5rem;
            background: #0f172a;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .inspector-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.8rem;
            margin-bottom: 1rem;
        }
        .inspector-title-area {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .inspector-icon { font-size: 1.8rem; }
        .inspector-time-heading {
            font-size: 1.25rem;
            font-weight: 800;
            color: white;
            margin: 0;
        }
        .inspector-badge {
            display: inline-block;
            padding: 0.2rem 0.65rem;
            border-radius: 9999px;
            font-size: 0.8rem;
            font-weight: 700;
            border: 1px solid;
        }

        .sentence-display-box {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 1.25rem 1.4rem;
            margin-bottom: 1.25rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .sentence-text-lead {
            font-size: 1.25rem;
            font-weight: 700;
            color: white;
            line-height: 1.5;
        }
        .hl-verb {
            color: #f87171;
            text-decoration: underline;
            text-underline-offset: 4px;
        }
        .hl-time {
            color: #38bdf8;
            text-decoration: underline;
            text-underline-offset: 4px;
        }
        .sentence-actions {
            display: flex;
            gap: 0.6rem;
            flex-wrap: wrap;
        }
        .btn-action-listen, .btn-action-invert {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #f1f5f9;
            padding: 0.55rem 0.95rem;
            border-radius: 10px;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .btn-action-listen:hover, .btn-action-invert:hover {
            background: rgba(56, 189, 248, 0.2);
            border-color: #38bdf8;
            color: white;
        }

        .inspector-analysis-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1rem;
        }
        .analysis-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 1rem 1.15rem;
        }
        .analysis-card-title {
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            margin-bottom: 0.35rem;
            color: #94a3b8;
        }
        .analysis-card-val {
            font-size: 1.1rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.25rem;
        }
        .analysis-card-desc {
            font-size: 0.88rem;
            color: #cbd5e1;
            line-height: 1.45;
        }

        /* TAB 2: Nutid som Fremtid */
        .future-lab-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
            gap: 1.25rem;
            margin-bottom: 2rem;
        }
        .future-model-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .model-card-tag {
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            margin-bottom: 0.5rem;
        }
        .tag-model-1 { color: #4ade80; }
        .tag-model-2 { color: #fcd34d; }
        .tag-model-3 { color: #c084fc; }
        .future-model-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.5rem;
        }
        .future-model-desc {
            font-size: 0.9rem;
            color: #cbd5e1;
            line-height: 1.5;
            margin-bottom: 1rem;
        }
        .example-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1.2rem;
        }
        .example-item {
            background: #0f172a;
            border-radius: 10px;
            padding: 0.65rem 0.9rem;
            font-size: 0.92rem;
            color: #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .listen-icon-btn {
            background: transparent;
            border: none;
            color: #38bdf8;
            cursor: pointer;
            padding: 0 0.2rem;
            font-size: 0.95rem;
        }

        .mini-quiz-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.6rem;
            margin-bottom: 2rem;
        }
        .mini-quiz-header h3 {
            font-size: 1.2rem;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 0.3rem;
        }
        .mini-quiz-header p {
            color: #94a3b8;
            font-size: 0.9rem;
            margin: 0 0 1.25rem;
        }
        .quiz-card-item {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 1.1rem;
            margin-bottom: 0.85rem;
        }
        .quiz-sentence-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 1.05rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.75rem;
        }
        .quiz-options-row {
            display: flex;
            gap: 0.6rem;
            flex-wrap: wrap;
        }
        .quiz-opt-btn {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #cbd5e1;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .quiz-opt-btn:hover {
            border-color: #38bdf8;
            color: white;
        }
        .quiz-opt-btn.correct {
            background: rgba(34, 197, 94, 0.2) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .quiz-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.15) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
        }
        .quiz-feedback-box {
            font-size: 0.88rem;
            line-height: 1.45;
            padding: 0.65rem 0.9rem;
            border-radius: 8px;
            margin-top: 0.65rem;
            display: none;
        }

        /* TAB 3: Opgaver */
        .vaerksted-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.75rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .vaerksted-progress-bar {
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: 1.25rem;
        }
        .vaerksted-progress-fill {
            height: 100%;
            background: #0ea5e9;
            transition: width 0.3s ease;
        }
        .vaerksted-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.25rem;
            color: #94a3b8;
            font-size: 0.88rem;
            font-weight: 600;
        }
        .vaerksted-sentence-box {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 1.5rem;
            text-align: center;
            font-size: 1.35rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1.5rem;
            line-height: 1.5;
        }
        .blank-placeholder {
            display: inline-block;
            min-width: 110px;
            padding: 0.1rem 0.6rem;
            border-bottom: 2px solid #38bdf8;
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.08);
            border-radius: 6px;
        }
        .vaerksted-choices-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.85rem;
            margin-bottom: 1.25rem;
        }
        .vaerksted-choice-btn {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            color: #f1f5f9;
            padding: 0.95rem 1rem;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .vaerksted-choice-btn:hover {
            border-color: #38bdf8;
            background: rgba(56, 189, 248, 0.08);
        }
        .vaerksted-choice-btn.selected-correct {
            background: rgba(34, 197, 94, 0.2) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .vaerksted-choice-btn.selected-wrong {
            background: rgba(239, 68, 68, 0.15) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
        }
        .vaerksted-feedback-banner {
            border-radius: 10px;
            padding: 1rem 1.15rem;
            margin-bottom: 1.25rem;
            font-size: 0.95rem;
            line-height: 1.5;
            display: none;
        }
        .vaerksted-feedback-banner.correct {
            display: block;
            background: rgba(34, 197, 94, 0.12);
            border: 1px solid rgba(34, 197, 94, 0.4);
            color: #4ade80;
        }
        .vaerksted-feedback-banner.wrong {
            display: block;
            background: rgba(239, 68, 68, 0.12);
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: #f87171;
        }
        .vaerksted-actions-row {
            display: flex;
            justify-content: flex-end;
            gap: 0.8rem;
        }
        .btn-next-question {
            background: #0ea5e9;
            color: white;
            border: none;
            padding: 0.75rem 1.6rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: none;
        }
        .btn-next-question:hover {
            background: #0284c7;
        }

        /* TAB 4: Tidslinje og Frekvens */
        .timeline-section-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.75rem;
            margin-bottom: 2rem;
        }
        .timeline-track {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.2rem;
            margin-bottom: 2rem;
        }
        .timeline-column {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 1.2rem;
        }
        .timeline-col-header {
            font-size: 1.05rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .col-past { color: #f87171; }
        .col-now { color: #4ade80; }
        .col-future { color: #38bdf8; }

        .tidsord-chip-list {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
        }
        .tidsord-chip {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.55rem 0.8rem;
            border-radius: 8px;
            font-size: 0.88rem;
            color: #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        .tidsord-chip:hover {
            background: rgba(56, 189, 248, 0.15);
            border-color: #38bdf8;
            color: white;
        }

        .frekvens-barometer {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 1.25rem;
        }
        .frekvens-scale {
            display: flex;
            gap: 0.6rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }
        .frekvens-step {
            flex: 1;
            min-width: 90px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            padding: 0.75rem 0.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        .frekvens-step:hover {
            background: rgba(245, 158, 11, 0.15);
            border-color: #f59e0b;
        }
        .frekvens-pct { font-size: 0.75rem; color: #f59e0b; font-weight: 700; }
        .frekvens-word { font-size: 0.95rem; font-weight: 700; color: white; margin-top: 0.2rem; }

        /* Interaktive øvelser på Tidslinje-fanen */
        .tids-exercise-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.6rem;
            margin-top: 1.8rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        }
        .tids-exercise-header {
            margin-bottom: 1.25rem;
        }
        .tids-exercise-tag {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.2rem 0.6rem;
            border-radius: 6px;
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            margin-bottom: 0.4rem;
        }
        .tids-exercise-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: white;
            margin: 0 0 0.3rem;
        }
        .tids-exercise-desc {
            color: #94a3b8;
            font-size: 0.92rem;
            margin: 0;
            line-height: 1.5;
        }

        /* 3-vejs Sortering */
        .tids-sorter-active {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 1.4rem;
            text-align: center;
            margin-bottom: 1.4rem;
        }
        .tids-sorter-word {
            font-size: 1.6rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 1.2rem;
        }
        .tids-sorter-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 0.75rem;
            margin-bottom: 0.5rem;
        }
        .tids-pick-btn {
            background: #1e293b;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            color: white;
            padding: 0.85rem 1rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
        }
        .btn-pick-past:hover {
            border-color: #f87171;
            background: rgba(239, 68, 68, 0.12);
            color: #fca5a5;
        }
        .btn-pick-now:hover {
            border-color: #4ade80;
            background: rgba(34, 197, 94, 0.12);
            color: #86efac;
        }
        .btn-pick-future:hover {
            border-color: #38bdf8;
            background: rgba(56, 189, 248, 0.12);
            color: #7dd3fc;
        }

        .tids-sorter-buckets {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
        }
        .tids-bucket {
            background: #0f172a;
            border-radius: 12px;
            padding: 1rem;
            border: 1.5px solid rgba(255, 255, 255, 0.08);
            min-height: 120px;
        }
        .tids-bucket-header {
            font-size: 0.9rem;
            font-weight: 700;
            margin-bottom: 0.6rem;
            display: flex;
            align-items: center;
            gap: 0.35rem;
        }
        .bucket-past { border-color: rgba(239, 68, 68, 0.3); }
        .bucket-past .tids-bucket-header { color: #f87171; }
        .bucket-now { border-color: rgba(34, 197, 94, 0.3); }
        .bucket-now .tids-bucket-header { color: #4ade80; }
        .bucket-future { border-color: rgba(56, 189, 248, 0.3); }
        .bucket-future .tids-bucket-header { color: #38bdf8; }

        .tids-bucket-flow {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
        }
        .placed-chip {
            font-size: 0.8rem;
            font-weight: 600;
            padding: 0.25rem 0.55rem;
            border-radius: 6px;
        }
        .placed-past {
            background: rgba(239, 68, 68, 0.18);
            color: #fca5a5;
            border: 1px solid rgba(239, 68, 68, 0.35);
        }
        .placed-now {
            background: rgba(34, 197, 94, 0.18);
            color: #86efac;
            border: 1px solid rgba(34, 197, 94, 0.35);
        }
        .placed-future {
            background: rgba(56, 189, 248, 0.18);
            color: #7dd3fc;
            border: 1px solid rgba(56, 189, 248, 0.35);
        }

        /* Frekvens Quiz */
        .frekvens-quiz-box {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 1.35rem;
            margin-top: 1.25rem;
        }
        .frekvens-q-text {
            font-size: 1.15rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1.1rem;
            line-height: 1.45;
        }
        .frekvens-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
            gap: 0.75rem;
            margin-bottom: 1rem;
        }
        .frekvens-opt-btn {
            background: #1e293b;
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            color: white;
            padding: 0.85rem;
            border-radius: 10px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .frekvens-opt-btn:hover {
            border-color: #f59e0b;
            background: rgba(245, 158, 11, 0.1);
            color: #fde68a;
        }
        .frekvens-opt-btn.correct {
            background: rgba(34, 197, 94, 0.2) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .frekvens-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.15) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
        }

        @media (max-width: 768px) {
            .tidsudtryk-view {
                padding: 0.25rem 0.65rem 3rem;
            }
            .tids-hero {
                margin-bottom: 1.2rem;
            }
            .tids-hero h1 {
                font-size: 1.4rem;
            }
            .tids-hero p {
                font-size: 0.88rem;
                line-height: 1.45;
            }
            .byggeplads-pills {
                font-size: 0.75rem;
                padding: 0.25rem 0.6rem;
                gap: 0.35rem;
                flex-wrap: wrap;
                justify-content: center;
            }
            .golden-rule-banner {
                flex-direction: column;
                text-align: center;
                gap: 0.6rem;
                padding: 0.9rem 1rem;
                margin-bottom: 1.2rem;
            }
            .golden-rule-icon {
                font-size: 1.6rem;
            }
            .golden-rule-content h3 {
                font-size: 0.98rem;
            }
            .golden-rule-content p {
                font-size: 0.84rem;
            }
            .tids-tabs-nav {
                margin-bottom: 1.2rem;
                gap: 0.25rem;
                padding: 0.25rem;
            }
            .tids-tab-btn {
                padding: 0.5rem 0.8rem;
                font-size: 0.82rem;
            }
            .vrimmel-stage-card {
                border-radius: 14px;
                margin-bottom: 1.2rem;
            }
            .vrimmel-stage-header {
                padding: 0.8rem 1rem;
            }
            .vrimmel-stage-title {
                font-size: 1rem;
            }
            .vrimmel-time-filter-bar {
                padding: 0.5rem 0.75rem;
                gap: 0.35rem;
            }
            .time-filter-btn {
                padding: 0.35rem 0.65rem;
                font-size: 0.78rem;
            }
            .hotspot-inspector {
                padding: 1rem 0.85rem;
            }
            .inspector-top {
                gap: 0.5rem;
                margin-bottom: 0.75rem;
            }
            .inspector-icon {
                font-size: 1.4rem;
            }
            .inspector-time-heading {
                font-size: 1.05rem;
            }
            .inspector-badge {
                font-size: 0.72rem;
                padding: 0.15rem 0.5rem;
            }
            .sentence-display-box {
                flex-direction: column;
                align-items: flex-start;
                padding: 0.85rem 1rem;
                gap: 0.75rem;
            }
            .sentence-text-lead {
                font-size: 1.05rem;
                line-height: 1.45;
            }
            .sentence-actions {
                width: 100%;
                justify-content: flex-start;
                gap: 0.4rem;
            }
            .btn-action-listen, .btn-action-invert {
                font-size: 0.8rem;
                padding: 0.45rem 0.75rem;
            }
            .inspector-analysis-grid {
                grid-template-columns: 1fr;
                gap: 0.6rem;
            }
            .analysis-card {
                padding: 0.75rem 0.85rem;
            }
            .analysis-card-title {
                font-size: 0.72rem;
            }
            .analysis-card-val {
                font-size: 0.98rem;
            }
            .analysis-card-desc {
                font-size: 0.82rem;
            }
            .future-lab-grid {
                grid-template-columns: 1fr;
                gap: 0.85rem;
                margin-bottom: 1.2rem;
            }
            .future-model-card {
                padding: 1rem;
                border-radius: 14px;
            }
            .future-model-title {
                font-size: 1.08rem;
            }
            .future-model-desc {
                font-size: 0.84rem;
                margin-bottom: 0.75rem;
            }
            .example-item {
                font-size: 0.84rem;
                padding: 0.55rem 0.75rem;
            }
            .mini-quiz-card {
                padding: 1rem;
                border-radius: 14px;
                margin-bottom: 1.2rem;
            }
            .mini-quiz-header h3 {
                font-size: 1.05rem;
            }
            .quiz-sentence-row {
                font-size: 0.95rem;
            }
            .quiz-opt-btn {
                padding: 0.45rem 0.8rem;
                font-size: 0.82rem;
            }
            .vaerksted-card {
                padding: 1rem;
                border-radius: 14px;
            }
            .vaerksted-sentence-box {
                padding: 1rem 0.75rem;
                font-size: 1.05rem;
                margin-bottom: 1rem;
                line-height: 1.45;
            }
            .blank-placeholder {
                min-width: 80px;
                padding: 0.1rem 0.4rem;
            }
            .vaerksted-choices-grid {
                grid-template-columns: 1fr;
                gap: 0.6rem;
                margin-bottom: 1rem;
            }
            .vaerksted-choice-btn {
                padding: 0.75rem 0.85rem;
                font-size: 0.92rem;
            }
            .vaerksted-feedback-banner {
                padding: 0.8rem 0.9rem;
                font-size: 0.88rem;
            }
            .btn-next-question {
                width: 100%;
                text-align: center;
                padding: 0.7rem 1.2rem;
                font-size: 0.9rem;
            }
            .timeline-section-card {
                padding: 1rem;
                border-radius: 14px;
                margin-bottom: 1.2rem;
            }
            .timeline-track {
                grid-template-columns: 1fr;
                gap: 0.75rem;
                margin-bottom: 1.2rem;
            }
            .timeline-column {
                padding: 0.85rem;
            }
            .timeline-col-header {
                font-size: 0.95rem;
                margin-bottom: 0.6rem;
            }
            .tidsord-chip {
                padding: 0.45rem 0.65rem;
                font-size: 0.82rem;
            }
            .frekvens-barometer {
                padding: 0.85rem;
            }
            .frekvens-scale {
                gap: 0.4rem;
            }
            .frekvens-step {
                min-width: 65px;
                padding: 0.5rem 0.3rem;
            }
            .frekvens-pct {
                font-size: 0.7rem;
            }
            .frekvens-word {
                font-size: 0.82rem;
            }
            .tids-exercise-card {
                padding: 1rem;
                border-radius: 14px;
                margin-top: 1.2rem;
            }
            .tids-exercise-title {
                font-size: 1.08rem;
            }
            .tids-exercise-desc {
                font-size: 0.84rem;
            }
            .tids-sorter-active {
                padding: 1rem 0.75rem;
                margin-bottom: 1rem;
            }
            .tids-sorter-word {
                font-size: 1.25rem;
                margin-bottom: 0.8rem;
            }
            .tids-sorter-buttons {
                grid-template-columns: 1fr;
                gap: 0.5rem;
            }
            .tids-pick-btn {
                padding: 0.7rem 0.85rem;
                font-size: 0.88rem;
            }
            .tids-sorter-buckets {
                grid-template-columns: 1fr;
                gap: 0.75rem;
            }
            .tids-bucket {
                min-height: auto;
                padding: 0.85rem;
            }
            .frekvens-quiz-box {
                padding: 0.95rem;
            }
            .frekvens-q-text {
                font-size: 0.98rem;
                margin-bottom: 0.8rem;
            }
            .frekvens-options-grid {
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
            }
            .frekvens-opt-btn {
                padding: 0.65rem 0.5rem;
                font-size: 0.9rem;
            }
        }

        @media (max-width: 480px) {
            .tidsudtryk-view {
                padding: 0.2rem 0.4rem 2.5rem;
            }
            .tids-hero h1 {
                font-size: 1.25rem;
            }
            .tids-hero p {
                font-size: 0.82rem;
            }
            .golden-rule-banner {
                padding: 0.75rem 0.8rem;
            }
            .frekvens-options-grid {
                grid-template-columns: 1fr;
            }
            .tids-tab-btn {
                padding: 0.45rem 0.65rem;
                font-size: 0.78rem;
            }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section - Korrekt dansk retskrivning
    const hero = document.createElement('div');
    hero.className = 'tids-hero';
    hero.innerHTML = `
        <div class="byggeplads-pills">
            <span>${getTranslation('tids_byggeplads')}</span>
            <span class="pill-vrb">${getTranslation('tids_verb_action')}</span>
            <span class="pill-plus">+</span>
            <span class="pill-adv">${getTranslation('tids_adv_time')}</span>
        </div>
        <h1>${getTranslation('tids_hero_title')}</h1>
        <p>${getTranslation('tids_hero_desc')}</p>
    `;
    viewContainer.appendChild(hero);

    // Den gyldne regel
    const goldenBanner = document.createElement('div');
    goldenBanner.className = 'golden-rule-banner';
    goldenBanner.innerHTML = `
        <div class="golden-rule-icon">💡</div>
        <div class="golden-rule-content">
            <h3>${getTranslation('tids_golden_title')}</h3>
            <p>${getTranslation('tids_golden_desc')}</p>
        </div>
    `;
    viewContainer.appendChild(goldenBanner);

    // Fanemenu
    const tabsNav = document.createElement('div');
    tabsNav.className = 'tids-tabs-nav';

    const tabsData = [
        { id: 'vrimmel', label: getTranslation('tids_tab_vrimmel') },
        { id: 'nutid_fremtid', label: getTranslation('tids_tab_nutid_fremtid') },
        { id: 'vaerksted', label: getTranslation('tids_tab_vaerksted') },
        { id: 'tidslinje', label: getTranslation('tids_tab_tidslinje') }
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

            const lang = appState.lang || getLang();
            window.history.pushState(null, '', `#/${lang}/traen_tidsudtryk/${tab.id}`);

            renderActiveTab();
        };
        tabsNav.appendChild(btn);
    });

    viewContainer.appendChild(tabsNav);
    viewContainer.appendChild(contentArea);

    // -------------------------------------------------------------
    // DATA: 6 Tidsudtryk i Vrimlebilledet (Fokus på TIDSANKERET)
    // -------------------------------------------------------------
    function getVrimmelHotspots() {
        return [
            {
                id: 'rejser_imorgen',
                timeTitle: getTranslation('tids_spot_1_title'),
                timeCategory: getTranslation('tids_spot_1_cat'),
                icon: '🔵',
                color: '#38bdf8',
                badgeBg: 'rgba(56, 189, 248, 0.15)',
                badgeBorder: '#38bdf8',
                x: 51,
                y: 74,
                straightSentence: 'Jeg rejser til Italien i morgen.',
                inversionSentence: 'I morgen rejser jeg til Italien.',
                verb: 'rejser',
                verbTense: 'Nutid (præsens)',
                timeWord: 'i morgen',
                pedagogicalTip: getTranslation('tids_spot_1_tip')
            },
            {
                id: 'drikker_kaffe_nu',
                timeTitle: getTranslation('tids_spot_2_title'),
                timeCategory: getTranslation('tids_spot_2_cat'),
                icon: '🟢',
                color: '#4ade80',
                badgeBg: 'rgba(34, 197, 94, 0.15)',
                badgeBorder: '#22c55e',
                x: 67,
                y: 80,
                straightSentence: 'Vi drikker kaffe og spiser kage nu.',
                inversionSentence: 'Nu drikker vi kaffe og spiser kage.',
                verb: 'drikker',
                verbTense: 'Nutid (præsens)',
                timeWord: 'nu / lige nu',
                pedagogicalTip: getTranslation('tids_spot_2_tip')
            },
            {
                id: 'drak_kaffe_imorges',
                timeTitle: getTranslation('tids_spot_3_title'),
                timeCategory: getTranslation('tids_spot_3_cat'),
                icon: '🔴',
                color: '#f87171',
                badgeBg: 'rgba(239, 68, 68, 0.15)',
                badgeBorder: '#ef4444',
                x: 89,
                y: 83,
                straightSentence: 'Jeg drak kaffe i morges.',
                inversionSentence: 'I morges drak jeg kaffe.',
                verb: 'drak',
                verbTense: 'Datid (præteritum)',
                timeWord: 'i morges',
                pedagogicalTip: getTranslation('tids_spot_3_tip')
            },
            {
                id: 'ses_iaften',
                timeTitle: getTranslation('tids_spot_4_title'),
                timeCategory: getTranslation('tids_spot_4_cat'),
                icon: '🟣',
                color: '#c084fc',
                badgeBg: 'rgba(168, 85, 247, 0.15)',
                badgeBorder: '#a855f7',
                x: 18,
                y: 72,
                straightSentence: 'Vi ses til middag i aften!',
                inversionSentence: 'I aften ses vi til middag!',
                verb: 'ses',
                verbTense: 'Nutid (reciprok form)',
                timeWord: 'i aften',
                pedagogicalTip: getTranslation('tids_spot_4_tip')
            },
            {
                id: 'toget_afgaar',
                timeTitle: getTranslation('tids_spot_5_title'),
                timeCategory: getTranslation('tids_spot_5_cat'),
                icon: '⏱️',
                color: '#38bdf8',
                badgeBg: 'rgba(56, 189, 248, 0.15)',
                badgeBorder: '#38bdf8',
                x: 82,
                y: 22,
                straightSentence: 'Toget afgår klokken 11.15.',
                inversionSentence: 'Klokken 11.15 afgår toget.',
                verb: 'afgår',
                verbTense: 'Nutid (præsens)',
                timeWord: 'klokken 11.15',
                pedagogicalTip: getTranslation('tids_spot_5_tip')
            },
            {
                id: 'cykler_altid',
                timeTitle: getTranslation('tids_spot_6_title'),
                timeCategory: getTranslation('tids_spot_6_cat'),
                icon: '🔄',
                color: '#fbbf24',
                badgeBg: 'rgba(245, 158, 11, 0.15)',
                badgeBorder: '#f59e0b',
                x: 39,
                y: 62,
                straightSentence: 'Hun cykler altid på arbejde.',
                inversionSentence: 'Hver dag cykler hun på arbejde.',
                verb: 'cykler',
                verbTense: 'Nutid (vane/gentagelse)',
                timeWord: 'altid / hver dag',
                pedagogicalTip: getTranslation('tids_spot_6_tip')
            }
        ];
    }

    let VRIMMEL_HOTSPOTS = getVrimmelHotspots();
    let selectedHotspot = VRIMMEL_HOTSPOTS[0];
    let isInverted = false;

    // Render aktiv fane
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

    // --- TAB 1: VRIMLEBILLEDE MED TIDER I FOKUS ---
    function renderVrimmelTab(parent) {
        const stageCard = document.createElement('div');
        stageCard.className = 'vrimmel-stage-card';

        stageCard.innerHTML = `
            <div class="vrimmel-stage-header">
                <div class="vrimmel-stage-title">${getTranslation('tids_vrimmel_title')}</div>
                <div class="vrimmel-stage-subtitle">${getTranslation('tids_vrimmel_subtitle')}</div>
            </div>

            <!-- Tids-knaprække: Intuitiv styring af tiderne -->
            <div class="vrimmel-time-filter-bar" id="time-filter-bar">
                <span class="vrimmel-time-label">${getTranslation('tids_vrimmel_time_anchors')}</span>
                ${VRIMMEL_HOTSPOTS.map(spot => `
                    <button type="button" class="time-filter-btn ${spot.id === selectedHotspot.id ? 'active' : ''}" data-id="${spot.id}">
                        <span>${spot.icon}</span>
                        <span>${spot.timeTitle}</span>
                    </button>
                `).join('')}
            </div>

            <div class="vrimmel-img-container" id="vrimmel-container">
                <img src="assets/tidsudtryk_vrimmel.jpg" alt="Vrimlebillede over tidsudtryk i København" class="vrimmel-img" />
            </div>

            <div class="hotspot-inspector" id="hotspot-inspector"></div>
        `;

        const imgContainer = stageCard.querySelector('#vrimmel-container');
        const inspectorEl = stageCard.querySelector('#hotspot-inspector');
        const filterBar = stageCard.querySelector('#time-filter-bar');

        // Tilføj pins med TIDS-etiket
        VRIMMEL_HOTSPOTS.forEach(spot => {
            const pin = document.createElement('button');
            pin.type = 'button';
            pin.className = `tids-pin ${spot.id === selectedHotspot.id ? 'active' : ''}`;
            pin.style.left = `${spot.x}%`;
            pin.style.top = `${spot.y}%`;
            pin.style.background = spot.color;
            pin.title = `${spot.timeTitle} (${spot.timeCategory})`;
            pin.innerHTML = `
                <span>${spot.icon}</span>
                <div class="tids-pin-pill">${spot.icon} ${spot.timeTitle}</div>
            `;

            pin.onclick = (e) => {
                e.stopPropagation();
                selectSpot(spot);
            };

            imgContainer.appendChild(pin);
        });

        // Håndter filterknapperne over billedet
        filterBar.querySelectorAll('.time-filter-btn').forEach(btn => {
            btn.onclick = () => {
                const spotId = btn.getAttribute('data-id');
                const found = VRIMMEL_HOTSPOTS.find(s => s.id === spotId);
                if (found) selectSpot(found);
            };
        });

        function selectSpot(spot) {
            selectedHotspot = spot;
            isInverted = false;
            stageCard.querySelectorAll('.tids-pin').forEach((p, idx) => {
                p.classList.toggle('active', VRIMMEL_HOTSPOTS[idx].id === spot.id);
            });
            filterBar.querySelectorAll('.time-filter-btn').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-id') === spot.id);
            });
            updateInspector(inspectorEl);
        }

        function updateInspector(targetEl) {
            const sentenceToDisplay = isInverted ? selectedHotspot.inversionSentence : selectedHotspot.straightSentence;
            
            // Fremhæv verbum og tidsudtryk i sætningen
            let highlighted = sentenceToDisplay
                .replace(selectedHotspot.verb, `<span class="hl-verb" title="Verbum">${selectedHotspot.verb}</span>`);
            
            const timeParts = selectedHotspot.timeWord.split(' / ');
            timeParts.forEach(tp => {
                const reg = new RegExp(`(${tp})`, 'gi');
                highlighted = highlighted.replace(reg, `<span class="hl-time" title="Tidsudtryk">$1</span>`);
            });

            targetEl.innerHTML = `
                <div class="inspector-top">
                    <div class="inspector-title-area">
                        <span class="inspector-icon">${selectedHotspot.icon}</span>
                        <div>
                            <h3 class="inspector-time-heading">${getTranslation('tids_inspector_heading', { title: selectedHotspot.timeTitle })}</h3>
                        </div>
                    </div>
                    <span class="inspector-badge" style="background: ${selectedHotspot.badgeBg}; border-color: ${selectedHotspot.badgeBorder}; color: ${selectedHotspot.color};">
                        ${selectedHotspot.timeCategory}
                    </span>
                </div>

                <div class="sentence-display-box">
                    <div class="sentence-text-lead">${highlighted}</div>
                    <div class="sentence-actions">
                        <button type="button" class="btn-action-listen" id="btn-listen">
                            <span>🔊</span>
                            <span>${getTranslation('tids_listen_sentence')}</span>
                        </button>
                        <button type="button" class="btn-action-invert" id="btn-invert" title="Skift mellem ligefrem ordstilling og inversion">
                            <span>🔄</span>
                            <span>${isInverted ? getTranslation('tids_show_straight') : getTranslation('tids_show_inversion')}</span>
                        </button>
                    </div>
                </div>

                <div class="inspector-analysis-grid">
                    <div class="analysis-card">
                        <div class="analysis-card-title">${getTranslation('tids_card_verb_title')}</div>
                        <div class="analysis-card-val" style="color: #f87171;">${selectedHotspot.verb}</div>
                        <div class="analysis-card-desc">${getTranslation('tids_card_verb_desc', { tense: selectedHotspot.verbTense })}</div>
                    </div>
                    <div class="analysis-card">
                        <div class="analysis-card-title">${getTranslation('tids_card_time_title')}</div>
                        <div class="analysis-card-val" style="color: #38bdf8;">${selectedHotspot.timeWord}</div>
                        <div class="analysis-card-desc">${getTranslation('tids_card_time_desc', { cat: selectedHotspot.timeCategory })}</div>
                    </div>
                    <div class="analysis-card">
                        <div class="analysis-card-title">${getTranslation('tids_card_point_title')}</div>
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

    // --- TAB 2: NUTID SOM FREMTID ---
    function renderNutidFremtidTab(parent) {
        const labGrid = document.createElement('div');
        labGrid.className = 'future-lab-grid';

        labGrid.innerHTML = `
            <!-- Model 1 -->
            <div class="future-model-card">
                <div>
                    <div class="model-card-tag tag-model-1">${getTranslation('tids_m1_tag')}</div>
                    <div class="future-model-title">${getTranslation('tids_m1_title')}</div>
                    <div class="future-model-desc">
                        ${getTranslation('tids_m1_desc')}
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
                <div style="font-size: 0.85rem; color: #4ade80; font-weight: 600;">
                    ${getTranslation('tids_m1_sub')}
                </div>
            </div>

            <!-- Model 2 -->
            <div class="future-model-card">
                <div>
                    <div class="model-card-tag tag-model-2">${getTranslation('tids_m2_tag')}</div>
                    <div class="future-model-title">${getTranslation('tids_m2_title')}</div>
                    <div class="future-model-desc">
                        ${getTranslation('tids_m2_desc')}
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
                <div style="font-size: 0.85rem; color: #fcd34d; font-weight: 600;">
                    ${getTranslation('tids_m2_sub')}
                </div>
            </div>

            <!-- Model 3 -->
            <div class="future-model-card">
                <div>
                    <div class="model-card-tag tag-model-3">${getTranslation('tids_m3_tag')}</div>
                    <div class="future-model-title">${getTranslation('tids_m3_title')}</div>
                    <div class="future-model-desc">
                        ${getTranslation('tids_m3_desc')}
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
                <div style="font-size: 0.85rem; color: #c084fc; font-weight: 600;">
                    ${getTranslation('tids_m3_sub')}
                </div>
            </div>
        `;
        parent.appendChild(labGrid);

        // Mini-quiz
        const quizCard = document.createElement('div');
        quizCard.className = 'mini-quiz-card';
        quizCard.innerHTML = `
            <div class="mini-quiz-header">
                <h3>${getTranslation('tids_mq_header_title')}</h3>
                <p>${getTranslation('tids_mq_header_desc')}</p>
            </div>
            <div id="quiz-list-container"></div>
        `;

        const quizItems = [
            {
                sentence: "Jeg ringer til dig i morgen tidlig.",
                correct: "fremtid",
                explanation: getTranslation('tids_mq_q1_exp')
            },
            {
                sentence: "Lige nu drikker jeg en kop kaffe på bænken.",
                correct: "ligenu",
                explanation: getTranslation('tids_mq_q2_exp')
            },
            {
                sentence: "Vi flytter i næste måned.",
                correct: "fremtid",
                explanation: getTranslation('tids_mq_q3_exp')
            },
            {
                sentence: "Toget afgår om to minutter.",
                correct: "fremtid",
                explanation: getTranslation('tids_mq_q4_exp')
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
                    <button type="button" class="quiz-opt-btn" data-choice="ligenu">${getTranslation('tids_mq_choice_now')}</button>
                    <button type="button" class="quiz-opt-btn" data-choice="fremtid">${getTranslation('tids_mq_choice_future')}</button>
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
                        feedbackEl.style.display = 'block';
                        feedbackEl.style.background = 'rgba(34, 197, 94, 0.12)';
                        feedbackEl.style.border = '1px solid rgba(34, 197, 94, 0.4)';
                        feedbackEl.style.color = '#4ade80';
                        feedbackEl.innerHTML = getTranslation('tids_mq_correct', { exp: q.explanation });
                    } else {
                        btn.classList.add('wrong');
                        feedbackEl.style.display = 'block';
                        feedbackEl.style.background = 'rgba(239, 68, 68, 0.12)';
                        feedbackEl.style.border = '1px solid rgba(239, 68, 68, 0.4)';
                        feedbackEl.style.color = '#f87171';
                        feedbackEl.innerHTML = getTranslation('tids_mq_try_again', { exp: q.explanation });
                    }
                };
            });

            quizList.appendChild(itemEl);
        });

        parent.appendChild(quizCard);
    }

    // --- TAB 3: TRÆN TIDSUDTRYK (10 OPGAVER) ---
    function renderVaerkstedTab(parent) {
        const vaerkstedCard = document.createElement('div');
        vaerkstedCard.className = 'vaerksted-card';

        function getVaerkstedQuestions() {
            return [
                {
                    textBefore: "Jeg rejser til Italien ",
                    textAfter: ".",
                    correct: "i morgen",
                    options: ["i morgen", "i går", "for to dage siden"],
                    tip: getTranslation('tids_v_tip_1'),
                    verbContext: getTranslation('tids_v_ctx_1'),
                    hasHint: true,
                    hintText: getTranslation('tids_v_hint_1')
                },
                {
                    textBefore: "Jeg drak en dejlig kop kaffe ",
                    textAfter: ".",
                    correct: "i morges",
                    options: ["i morges", "i morgen", "nu"],
                    tip: getTranslation('tids_v_tip_2'),
                    verbContext: getTranslation('tids_v_ctx_2'),
                    hasHint: true,
                    hintText: getTranslation('tids_v_hint_2')
                },
                {
                    textBefore: "",
                    textAfter: " rejser vi til Italien.",
                    correct: "I morgen",
                    options: ["I morgen", "I går", "Forleden"],
                    tip: getTranslation('tids_v_tip_3'),
                    verbContext: getTranslation('tids_v_ctx_3'),
                    hasHint: true,
                    hintText: getTranslation('tids_v_hint_3')
                },
                {
                    textBefore: "Toget mod Århus afgår ",
                    textAfter: ".",
                    correct: "om fem minutter",
                    options: ["om fem minutter", "i går aftes", "sidste uge"],
                    tip: getTranslation('tids_v_tip_4'),
                    verbContext: getTranslation('tids_v_ctx_4'),
                    hasHint: true,
                    hintText: getTranslation('tids_v_hint_4')
                },
                {
                    textBefore: "Vi ses til middag ",
                    textAfter: "!",
                    correct: "i aften",
                    options: ["i aften", "i forgårs", "for en uge siden"],
                    tip: getTranslation('tids_v_tip_5'),
                    verbContext: getTranslation('tids_v_ctx_5'),
                    hasHint: true,
                    hintText: getTranslation('tids_v_hint_5')
                },
                {
                    textBefore: "Hun cykler ",
                    textAfter: " på arbejde gennem byen.",
                    correct: "altid",
                    options: ["altid", "i går morges", "i forgårs"],
                    tip: getTranslation('tids_v_tip_6'),
                    verbContext: getTranslation('tids_v_ctx_6'),
                    hasHint: false
                },
                {
                    textBefore: "",
                    textAfter: " drak jeg en kold øl ved kanalen.",
                    correct: "I fredags",
                    options: ["I fredags", "I aften", "I morgen"],
                    tip: getTranslation('tids_v_tip_7'),
                    verbContext: getTranslation('tids_v_ctx_7'),
                    hasHint: false
                },
                {
                    textBefore: "I aften ",
                    textAfter: " vi en god film i biografen.",
                    correct: "ser",
                    options: ["ser", "så", "have set"],
                    tip: getTranslation('tids_v_tip_8'),
                    verbContext: getTranslation('tids_v_ctx_8'),
                    hasHint: false
                },
                {
                    textBefore: "Han ",
                    textAfter: " til tandlægen i morgen tidlig.",
                    correct: "skal",
                    options: ["skal", "var", "blev"],
                    tip: getTranslation('tids_v_tip_9'),
                    verbContext: getTranslation('tids_v_ctx_9'),
                    hasHint: false
                },
                {
                    textBefore: "Vi flytter ind i den nye lejlighed ",
                    textAfter: ".",
                    correct: "i næste uge",
                    options: ["i næste uge", "i morges", "for to år siden"],
                    tip: getTranslation('tids_v_tip_10'),
                    verbContext: getTranslation('tids_v_ctx_10'),
                    hasHint: false
                }
            ];
        }

        const QUESTIONS = getVaerkstedQuestions();
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
                    <span>${getTranslation('tids_v_task_count', { current: currentIdx + 1, total: QUESTIONS.length })}</span>
                    <span style="color: #38bdf8;">${getTranslation('tids_v_context_label', { context: q.verbContext })}</span>
                </div>

                <div class="vaerksted-sentence-box">
                    <span>${q.textBefore}</span>
                    <span class="blank-placeholder" id="blank-target">...</span>
                    <span>${q.textAfter}</span>
                </div>

                ${q.hasHint ? `
                    <div style="color: #38bdf8; font-size: 0.9rem; margin-bottom: 1.25rem; text-align: center;">
                        ${getTranslation('tids_v_hint_label', { hint: q.hintText })}
                    </div>
                ` : ''}

                <div class="vaerksted-choices-grid" id="choices-grid"></div>

                <div class="vaerksted-feedback-banner" id="feedback-banner"></div>

                <div class="vaerksted-actions-row">
                    <button type="button" class="btn-action-listen" id="btn-audio-full" style="display: none;">
                        <span>🔊</span>
                        <span>${getTranslation('tids_v_btn_listen')}</span>
                    </button>
                    <button type="button" class="btn-next-question" id="btn-next">${currentIdx === QUESTIONS.length - 1 ? getTranslation('tids_v_btn_see_result') : getTranslation('tids_v_btn_next')}</button>
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

                    if (opt.toLowerCase() === q.correct.toLowerCase()) {
                        score++;
                        btn.classList.add('selected-correct');
                        feedbackBanner.className = 'vaerksted-feedback-banner correct';
                        feedbackBanner.innerHTML = getTranslation('tids_v_feedback_correct', { tip: q.tip });
                    } else {
                        btn.classList.add('selected-wrong');
                        choicesGrid.querySelectorAll('.vaerksted-choice-btn').forEach(b => {
                            if (b.textContent.toLowerCase() === q.correct.toLowerCase()) b.classList.add('selected-correct');
                        });
                        feedbackBanner.className = 'vaerksted-feedback-banner wrong';
                        feedbackBanner.innerHTML = getTranslation('tids_v_feedback_wrong', { correct: q.correct, tip: q.tip });
                    }

                    audioBtn.style.display = 'inline-flex';
                    audioBtn.onclick = () => speakDanish(fullSentence);

                    nextBtn.style.display = 'inline-block';
                    if (currentIdx === QUESTIONS.length - 1) {
                        nextBtn.textContent = getTranslation('tids_v_btn_see_result');
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
                    <h2 style="font-size: 1.8rem; color: white; margin-bottom: 0.5rem;">${getTranslation('tids_v_res_title')}</h2>
                    <p style="color: #94a3b8; font-size: 1.15rem; margin-bottom: 1.5rem;">
                        ${getTranslation('tids_v_res_score', { score: score, total: QUESTIONS.length })}
                    </p>
                    <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6;">
                        ${getTranslation('tids_v_res_desc')}
                    </p>
                    <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        <button type="button" class="btn-action-listen" id="btn-restart" style="padding: 0.75rem 1.5rem; font-weight: 700; cursor: pointer;">
                            ${getTranslation('tids_v_btn_restart')}
                        </button>
                    </div>
                </div>
            `;

            vaerkstedCard.querySelector('#btn-restart').onclick = () => {
                currentIdx = 0;
                score = 0;
                renderQuestion();
            };
        }

        renderQuestion();
        parent.appendChild(vaerkstedCard);
    }

    // --- TAB 4: TIDSLINJE OG FREKVENS ---
    function renderTidslinjeTab(parent) {
        // 1. Reference: Tidsaksen (fortid, nutid, fremtid)
        const timelineCard = document.createElement('div');
        timelineCard.className = 'timeline-section-card';

        timelineCard.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: white; margin: 0 0 0.3rem;">
                    ${getTranslation('tids_axis_heading')}
                </h3>
                <p style="color: #94a3b8; font-size: 0.92rem; margin: 0;">
                    ${getTranslation('tids_axis_sub')}
                </p>
            </div>

            <div class="timeline-track">
                <!-- Fortid -->
                <div class="timeline-column">
                    <div class="timeline-col-header col-past">
                        <span>${getTranslation('tids_col_past')}</span>
                    </div>
                    <div class="tidsord-chip-list">
                        <div class="tidsord-chip" data-sentence="I morges drak jeg kaffe.">
                            <span><strong>i morges</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-sentence="I går var jeg træt.">
                            <span><strong>i går</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-sentence="I forgårs cyklede vi i parken.">
                            <span><strong>i forgårs</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-sentence="I lørdags var vi til fest.">
                            <span><strong>i lørdags</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-sentence="Sidste uge købte vi en ny cykel.">
                            <span><strong>sidste uge</strong></span>
                            <span>🔊</span>
                        </div>
                    </div>
                </div>

                <!-- Nutid -->
                <div class="timeline-column">
                    <div class="timeline-col-header col-now">
                        <span>${getTranslation('tids_col_now')}</span>
                    </div>
                    <div class="tidsord-chip-list">
                        <div class="tidsord-chip" data-sentence="Nu drikker vi kaffe.">
                            <span><strong>nu</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-sentence="Lige nu sidder jeg på caféen.">
                            <span><strong>lige nu</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-sentence="I dag skinner solen i København.">
                            <span><strong>i dag</strong></span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-sentence="I dette øjeblik kører bussen.">
                            <span><strong>i dette øjeblik</strong></span>
                            <span>🔊</span>
                        </div>
                    </div>
                </div>

                <!-- Fremtid -->
                <div class="timeline-column">
                    <div class="timeline-col-header col-future">
                        <span>${getTranslation('tids_col_future')}</span>
                    </div>
                    <div class="tidsord-chip-list">
                        <div class="tidsord-chip" data-sentence="Jeg rejser til Italien i morgen.">
                            <span><strong>i morgen</strong> ${getTranslation('tids_chip_present_suffix')}</span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-sentence="Vi ses til middag i aften.">
                            <span><strong>i aften</strong> ${getTranslation('tids_chip_present_suffix')}</span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-sentence="Toget kører om lidt.">
                            <span><strong>om lidt</strong> ${getTranslation('tids_chip_present_suffix')}</span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-sentence="På fredag holder vi fest.">
                            <span><strong>på fredag</strong> ${getTranslation('tids_chip_present_suffix')}</span>
                            <span>🔊</span>
                        </div>
                        <div class="tidsord-chip" data-sentence="Vi starter i næste uge.">
                            <span><strong>i næste uge</strong> ${getTranslation('tids_chip_present_suffix')}</span>
                            <span>🔊</span>
                        </div>
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

        // ==========================================================
        // 2. ØVELSE 1: SORTÉR TIDSUDTRYK (Datid, nutid, fremtid)
        // ==========================================================
        const sorterCard = document.createElement('div');
        sorterCard.className = 'tids-exercise-card';

        const TIMELINE_MARKERS = [
            // Fortid (datid)
            { word: 'i morges', target: 'past', label: getTranslation('tids_col_past') },
            { word: 'i går', target: 'past', label: getTranslation('tids_col_past') },
            { word: 'i forgårs', target: 'past', label: getTranslation('tids_col_past') },
            { word: 'i lørdags', target: 'past', label: getTranslation('tids_col_past') },
            { word: 'sidste uge', target: 'past', label: getTranslation('tids_col_past') },
            // Nutid (lige nu)
            { word: 'nu', target: 'now', label: getTranslation('tids_col_now') },
            { word: 'lige nu', target: 'now', label: getTranslation('tids_col_now') },
            { word: 'i dag', target: 'now', label: getTranslation('tids_col_now') },
            { word: 'i dette øjeblik', target: 'now', label: getTranslation('tids_col_now') },
            // Fremtid (planlagt)
            { word: 'i morgen', target: 'future', label: getTranslation('tids_col_future') },
            { word: 'i aften', target: 'future', label: getTranslation('tids_col_future') },
            { word: 'om lidt', target: 'future', label: getTranslation('tids_col_future') },
            { word: 'på fredag', target: 'future', label: getTranslation('tids_col_future') },
            { word: 'i næste uge', target: 'future', label: getTranslation('tids_col_future') }
        ];

        let remainingMarkers = [...TIMELINE_MARKERS].sort(() => Math.random() - 0.5);
        let pastBucket = [];
        let nowBucket = [];
        let futureBucket = [];

        function renderSorterExercise() {
            sorterCard.innerHTML = '';

            const header = document.createElement('div');
            header.className = 'tids-exercise-header';
            header.innerHTML = `
                <span class="tids-exercise-tag">${getTranslation('tids_ex1_tag')}</span>
                <h3 class="tids-exercise-title">${getTranslation('tids_ex1_title')}</h3>
                <p class="tids-exercise-desc">${getTranslation('tids_ex1_desc')}</p>
            `;
            sorterCard.appendChild(header);

            if (remainingMarkers.length > 0) {
                const currentItem = remainingMarkers[0];
                const activeBox = document.createElement('div');
                activeBox.className = 'tids-sorter-active';
                activeBox.innerHTML = `
                    <div style="font-size: 0.85rem; color: #94a3b8; font-weight: 600; margin-bottom: 0.4rem;">
                        ${getTranslation('tids_ex1_q', { count: remainingMarkers.length })}
                    </div>
                    <div class="tids-sorter-word">"${currentItem.word}"</div>
                    <div class="tids-sorter-buttons">
                        <button type="button" class="tids-pick-btn btn-pick-past" id="btn-pick-past">
                            <span>📍</span>
                            <span>${getTranslation('tids_ex1_btn_past')}</span>
                        </button>
                        <button type="button" class="tids-pick-btn btn-pick-now" id="btn-pick-now">
                            <span>🟢</span>
                            <span>${getTranslation('tids_ex1_btn_now')}</span>
                        </button>
                        <button type="button" class="tids-pick-btn btn-pick-future" id="btn-pick-future">
                            <span>🔵</span>
                            <span>${getTranslation('tids_ex1_btn_future')}</span>
                        </button>
                    </div>
                    <div id="sorter-feedback" style="display: none; margin-top: 0.8rem; font-size: 0.92rem; font-weight: 700;"></div>
                `;

                const feedbackEl = activeBox.querySelector('#sorter-feedback');

                function handleChoice(chosen) {
                    if (chosen === currentItem.target) {
                        feedbackEl.style.display = 'block';
                        feedbackEl.style.color = '#4ade80';
                        feedbackEl.textContent = getTranslation('tids_ex1_correct', { word: currentItem.word, label: currentItem.label.toLowerCase() });

                        if (chosen === 'past') pastBucket.push(currentItem.word);
                        else if (chosen === 'now') nowBucket.push(currentItem.word);
                        else futureBucket.push(currentItem.word);

                        remainingMarkers.shift();
                        setTimeout(() => renderSorterExercise(), 500);
                    } else {
                        feedbackEl.style.display = 'block';
                        feedbackEl.style.color = '#f87171';
                        feedbackEl.textContent = getTranslation('tids_ex1_wrong', { word: currentItem.word, label: currentItem.label.toLowerCase() });
                    }
                }

                activeBox.querySelector('#btn-pick-past').onclick = () => handleChoice('past');
                activeBox.querySelector('#btn-pick-now').onclick = () => handleChoice('now');
                activeBox.querySelector('#btn-pick-future').onclick = () => handleChoice('future');

                sorterCard.appendChild(activeBox);
            } else {
                const doneBox = document.createElement('div');
                doneBox.className = 'tids-sorter-active';
                doneBox.innerHTML = `
                    <div style="color: #4ade80; font-size: 1.3rem; font-weight: 800; margin-bottom: 0.5rem;">
                        ${getTranslation('tids_ex1_done_title')}
                    </div>
                    <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 1.2rem;">
                        ${getTranslation('tids_ex1_done_desc')}
                    </p>
                    <button type="button" class="task-next-btn" id="btn-restart-sorter">${getTranslation('tids_ex1_btn_restart')}</button>
                `;
                doneBox.querySelector('#btn-restart-sorter').onclick = () => {
                    remainingMarkers = [...TIMELINE_MARKERS].sort(() => Math.random() - 0.5);
                    pastBucket = [];
                    nowBucket = [];
                    futureBucket = [];
                    renderSorterExercise();
                };
                sorterCard.appendChild(doneBox);
            }

            // Kasserne til opsamling
            const bucketsGrid = document.createElement('div');
            bucketsGrid.className = 'tids-sorter-buckets';
            bucketsGrid.innerHTML = `
                <div class="tids-bucket bucket-past">
                    <div class="tids-bucket-header">
                        <span>📍</span>
                        <span>${getTranslation('tids_bucket_past', { count: pastBucket.length })}</span>
                    </div>
                    <div class="tids-bucket-flow">
                        ${pastBucket.map(w => `<span class="placed-chip placed-past">${w}</span>`).join('')}
                    </div>
                </div>

                <div class="tids-bucket bucket-now">
                    <div class="tids-bucket-header">
                        <span>🟢</span>
                        <span>${getTranslation('tids_bucket_now', { count: nowBucket.length })}</span>
                    </div>
                    <div class="tids-bucket-flow">
                        ${nowBucket.map(w => `<span class="placed-chip placed-now">${w}</span>`).join('')}
                    </div>
                </div>

                <div class="tids-bucket bucket-future">
                    <div class="tids-bucket-header">
                        <span>🔵</span>
                        <span>${getTranslation('tids_bucket_future', { count: futureBucket.length })}</span>
                    </div>
                    <div class="tids-bucket-flow">
                        ${futureBucket.map(w => `<span class="placed-chip placed-future">${w}</span>`).join('')}
                    </div>
                </div>
            `;
            sorterCard.appendChild(bucketsGrid);
        }

        renderSorterExercise();
        parent.appendChild(sorterCard);

        // ==========================================================
        // 3. ØVELSE 2: VÆLG DET RIGTIGE TIDSUDTRYK TIL SÆTNINGEN
        // ==========================================================
        const sentenceCard = document.createElement('div');
        sentenceCard.className = 'tids-exercise-card';

        function getSentenceTasks() {
            return [
                {
                    sentenceBefore: "Hvad laver du ",
                    sentenceAfter: "? – Jeg vasker op.",
                    options: ["lige nu", "i forgårs", "i morges"],
                    correct: "lige nu",
                    tenseCategory: "nutid",
                    tenseCategoryLabel: getTranslation('tids_ex2_tense_nutid'),
                    explanation: getTranslation('tids_ex2_exp_1'),
                    fullSentence: "Hvad laver du lige nu? – Jeg vasker op."
                },
                {
                    sentenceBefore: "Vi spiste en dejlig middag hos mormor ",
                    sentenceAfter: ".",
                    options: ["i lørdags", "om lidt", "nu"],
                    correct: "i lørdags",
                    tenseCategory: "fortid",
                    tenseCategoryLabel: getTranslation('tids_ex2_tense_fortid'),
                    explanation: getTranslation('tids_ex2_exp_2'),
                    fullSentence: "Vi spiste en dejlig middag hos mormor i lørdags."
                },
                {
                    sentenceBefore: "Flyet afgår ",
                    sentenceAfter: ", så vi skal skynde os.",
                    options: ["om lidt", "i går", "i forgårs"],
                    correct: "om lidt",
                    tenseCategory: "fremtid",
                    tenseCategoryLabel: getTranslation('tids_ex2_tense_fremtid'),
                    explanation: getTranslation('tids_ex2_exp_3'),
                    fullSentence: "Flyet afgår om lidt, så vi skal skynde os."
                },
                {
                    sentenceBefore: "Børnene cyklede i skole ",
                    sentenceAfter: " klokken 8.00.",
                    options: ["i morges", "i aften", "i næste uge"],
                    correct: "i morges",
                    tenseCategory: "fortid",
                    tenseCategoryLabel: getTranslation('tids_ex2_tense_fortid'),
                    explanation: getTranslation('tids_ex2_exp_4'),
                    fullSentence: "Børnene cyklede i skole i morges klokken 8.00."
                },
                {
                    sentenceBefore: "Solen skinner dejligt ",
                    sentenceAfter: " over hele byen.",
                    options: ["i dag", "sidste uge", "i forgårs"],
                    correct: "i dag",
                    tenseCategory: "nutid",
                    tenseCategoryLabel: getTranslation('tids_ex2_tense_nutid'),
                    explanation: getTranslation('tids_ex2_exp_5'),
                    fullSentence: "Solen skinner dejligt i dag over hele byen."
                },
                {
                    sentenceBefore: "Vi holder stor havefest ",
                    sentenceAfter: ", hvis det bliver godt vejr.",
                    options: ["på fredag", "i forgårs", "i går"],
                    correct: "på fredag",
                    tenseCategory: "fremtid",
                    tenseCategoryLabel: getTranslation('tids_ex2_tense_fremtid'),
                    explanation: getTranslation('tids_ex2_exp_6'),
                    fullSentence: "Vi holder stor havefest på fredag, hvis det bliver godt vejr."
                }
            ];
        }

        const SENTENCE_TASKS = getSentenceTasks();
        let taskIndex = 0;
        let taskScore = 0;

        function renderSentenceExercise() {
            sentenceCard.innerHTML = '';
            const t = SENTENCE_TASKS[taskIndex];
            const pct = Math.round(((taskIndex + 1) / SENTENCE_TASKS.length) * 100);

            sentenceCard.innerHTML = `
                <div class="tids-exercise-header">
                    <span class="tids-exercise-tag">${getTranslation('tids_ex2_tag')}</span>
                    <h3 class="tids-exercise-title">${getTranslation('tids_ex2_title')}</h3>
                    <p class="tids-exercise-desc">${getTranslation('tids_ex2_desc')}</p>
                </div>

                <div class="vaerksted-progress-bar">
                    <div class="vaerksted-progress-fill" style="width: ${pct}%;"></div>
                </div>
                <div class="vaerksted-header">
                    <span>${getTranslation('tids_ex2_task_count', { current: taskIndex + 1, total: SENTENCE_TASKS.length })}</span>
                    <span style="color: #38bdf8; text-transform: capitalize;">${getTranslation('tids_ex2_tense_label', { tense: t.tenseCategoryLabel })}</span>
                </div>

                <div class="vaerksted-sentence-box">
                    <span>${t.sentenceBefore}</span>
                    <span class="blank-placeholder" id="sentence-blank">...</span>
                    <span>${t.sentenceAfter}</span>
                </div>

                <div class="vaerksted-choices-grid" id="sentence-choices"></div>

                <div class="vaerksted-feedback-banner" id="sentence-feedback"></div>

                <div class="vaerksted-actions-row">
                    <button type="button" class="btn-action-listen" id="btn-listen-sentence" style="display: none;">
                        <span>🔊</span>
                        <span>${getTranslation('tids_v_btn_listen')}</span>
                    </button>
                    <button type="button" class="btn-next-question" id="btn-sentence-next">${taskIndex === SENTENCE_TASKS.length - 1 ? getTranslation('tids_v_btn_see_result') : getTranslation('tids_v_btn_next')}</button>
                </div>
            `;

            const choicesGrid = sentenceCard.querySelector('#sentence-choices');
            const blankTarget = sentenceCard.querySelector('#sentence-blank');
            const feedbackBanner = sentenceCard.querySelector('#sentence-feedback');
            const nextBtn = sentenceCard.querySelector('#btn-sentence-next');
            const listenBtn = sentenceCard.querySelector('#btn-listen-sentence');

            t.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'vaerksted-choice-btn';
                btn.textContent = opt;

                btn.onclick = () => {
                    choicesGrid.querySelectorAll('.vaerksted-choice-btn').forEach(b => b.disabled = true);
                    blankTarget.textContent = opt;

                    if (opt === t.correct) {
                        taskScore++;
                        btn.classList.add('selected-correct');
                        feedbackBanner.className = 'vaerksted-feedback-banner correct';
                        feedbackBanner.innerHTML = `<strong>${getTranslation('tids_correct')}</strong> ${t.explanation}`;
                    } else {
                        btn.classList.add('selected-wrong');
                        choicesGrid.querySelectorAll('.vaerksted-choice-btn').forEach(b => {
                            if (b.textContent === t.correct) b.classList.add('selected-correct');
                        });
                        feedbackBanner.className = 'vaerksted-feedback-banner wrong';
                        feedbackBanner.innerHTML = `${getTranslation('tids_v_feedback_wrong', { correct: t.correct, tip: t.explanation })}`;
                    }

                    listenBtn.style.display = 'inline-flex';
                    listenBtn.onclick = () => speakDanish(t.fullSentence);

                    nextBtn.style.display = 'inline-block';
                    if (taskIndex === SENTENCE_TASKS.length - 1) {
                        nextBtn.textContent = getTranslation('tids_v_btn_see_result');
                    }
                };

                choicesGrid.appendChild(btn);
            });

            nextBtn.onclick = () => {
                if (taskIndex < SENTENCE_TASKS.length - 1) {
                    taskIndex++;
                    renderSentenceExercise();
                } else {
                    renderSentenceResult();
                }
            };
        }

        function renderSentenceResult() {
            sentenceCard.innerHTML = `
                <div style="text-align: center; padding: 2rem 1rem;">
                    <span class="tids-exercise-tag">${getTranslation('tids_ex2_res_tag')}</span>
                    <h2 style="font-size: 1.8rem; color: white; margin: 0.8rem 0 0.5rem;">${getTranslation('tids_ex2_res_title')}</h2>
                    <p style="color: #94a3b8; font-size: 1.15rem; margin-bottom: 1.5rem;">
                        ${getTranslation('tids_ex2_res_score', { score: taskScore, total: SENTENCE_TASKS.length })}
                    </p>
                    <p style="color: #cbd5e1; max-width: 580px; margin: 0 auto 2rem; line-height: 1.6;">
                        ${getTranslation('tids_ex2_res_desc')}
                    </p>
                    <button type="button" class="task-next-btn" id="btn-restart-sentence">${getTranslation('tids_ex2_btn_restart')}</button>
                </div>
            `;
            sentenceCard.querySelector('#btn-restart-sentence').onclick = () => {
                taskIndex = 0;
                taskScore = 0;
                renderSentenceExercise();
            };
        }

        renderSentenceExercise();
        parent.appendChild(sentenceCard);

        // ==========================================================
        // 4. FREKVENS BAROMETER & QUIZ (0 % - 100 %)
        // ==========================================================
        const frekvensSection = document.createElement('div');
        frekvensSection.className = 'timeline-section-card';
        frekvensSection.style.marginTop = '2rem';

        frekvensSection.innerHTML = `
            <div class="frekvens-barometer">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                    <div style="font-weight: 700; font-size: 1.05rem; color: white;">
                        ${getTranslation('tids_fq_heading')}
                    </div>
                    <span style="font-size: 0.8rem; color: #f59e0b; font-weight: 600;">${getTranslation('tids_fq_sub')}</span>
                </div>
                <div class="frekvens-scale">
                    <div class="frekvens-step" id="step-0">
                        <div class="frekvens-pct">0 %</div>
                        <div class="frekvens-word">aldrig</div>
                    </div>
                    <div class="frekvens-step" id="step-20">
                        <div class="frekvens-pct">20 %</div>
                        <div class="frekvens-word">sjældent</div>
                    </div>
                    <div class="frekvens-step" id="step-50">
                        <div class="frekvens-pct">50 %</div>
                        <div class="frekvens-word">sommetider</div>
                    </div>
                    <div class="frekvens-step" id="step-75">
                        <div class="frekvens-pct">75 %</div>
                        <div class="frekvens-word">tit / ofte</div>
                    </div>
                    <div class="frekvens-step" id="step-100">
                        <div class="frekvens-pct">100 %</div>
                        <div class="frekvens-word">altid</div>
                    </div>
                </div>
            </div>

            <!-- Quiz container -->
            <div id="frekvens-quiz-container"></div>
        `;

        frekvensSection.querySelector('#step-0').onclick = () => speakDanish('De kører aldrig i bil.');
        frekvensSection.querySelector('#step-20').onclick = () => speakDanish('Han kommer sjældent for sent.');
        frekvensSection.querySelector('#step-50').onclick = () => speakDanish('Sommetider går vi en tur ved vandet.');
        frekvensSection.querySelector('#step-75').onclick = () => speakDanish('Bussen kommer tit forbi.');
        frekvensSection.querySelector('#step-100').onclick = () => speakDanish('Bageren smiler altid til kunderne.');

        // Frekvens Quiz logik
        function getFrekvensQuestions() {
            return [
                {
                    question: getTranslation('tids_fq_q1'),
                    options: ["altid", "sommetider", "aldrig", "sjældent"],
                    correct: "altid",
                    explanation: getTranslation('tids_fq_q1_exp'),
                    exampleSentence: "Bageren smiler altid til kunderne."
                },
                {
                    question: getTranslation('tids_fq_q2'),
                    options: ["20 %", "50 %", "75 %", "0 %"],
                    correct: "20 %",
                    explanation: getTranslation('tids_fq_q2_exp'),
                    exampleSentence: "Han kommer sjældent for sent."
                },
                {
                    question: getTranslation('tids_fq_q3'),
                    options: ["aldrig", "sjældent", "sommetider", "tit / ofte"],
                    correct: "aldrig",
                    explanation: getTranslation('tids_fq_q3_exp'),
                    exampleSentence: "De kører aldrig i bil."
                },
                {
                    question: getTranslation('tids_fq_q4'),
                    options: ["50 %", "20 %", "75 %", "100 %"],
                    correct: "50 %",
                    explanation: getTranslation('tids_fq_q4_exp'),
                    exampleSentence: "Sommetider går vi en tur ved vandet."
                },
                {
                    question: getTranslation('tids_fq_q5'),
                    options: ["tit / ofte", "sjældent", "sommetider", "aldrig"],
                    correct: "tit / ofte",
                    explanation: getTranslation('tids_fq_q5_exp'),
                    exampleSentence: "Bussen kommer tit forbi."
                }
            ];
        }

        const FREKVENS_QUESTIONS = getFrekvensQuestions();
        let fqIndex = 0;
        let fqScore = 0;
        const fqContainer = frekvensSection.querySelector('#frekvens-quiz-container');

        function renderFrekvensQuiz() {
            fqContainer.innerHTML = '';
            const q = FREKVENS_QUESTIONS[fqIndex];
            const pct = Math.round(((fqIndex + 1) / FREKVENS_QUESTIONS.length) * 100);

            const box = document.createElement('div');
            box.className = 'frekvens-quiz-box';

            box.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                    <span class="tids-exercise-tag" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
                        ${getTranslation('tids_fq_tag')}
                    </span>
                    <span style="font-size: 0.85rem; color: #94a3b8; font-weight: 600;">
                        ${getTranslation('tids_fq_q_count', { current: fqIndex + 1, total: FREKVENS_QUESTIONS.length })}
                    </span>
                </div>

                <div class="vaerksted-progress-bar" style="margin-bottom: 1rem;">
                    <div class="vaerksted-progress-fill" style="width: ${pct}%; background: #f59e0b;"></div>
                </div>

                <div class="frekvens-q-text">${q.question}</div>

                <div class="frekvens-options-grid" id="fq-options"></div>

                <div class="vaerksted-feedback-banner" id="fq-feedback"></div>

                <div class="vaerksted-actions-row">
                    <button type="button" class="btn-action-listen" id="btn-fq-listen" style="display: none;">
                        <span>🔊</span>
                        <span>${getTranslation('tids_fq_btn_listen')}</span>
                    </button>
                    <button type="button" class="btn-next-question" id="btn-fq-next" style="background: #f59e0b; color: #0f172a;">
                        ${fqIndex === FREKVENS_QUESTIONS.length - 1 ? getTranslation('tids_fq_btn_see_res') : getTranslation('tids_fq_btn_next')}
                    </button>
                </div>
            `;

            const optGrid = box.querySelector('#fq-options');
            const feedbackEl = box.querySelector('#fq-feedback');
            const nextBtn = box.querySelector('#btn-fq-next');
            const listenBtn = box.querySelector('#btn-fq-listen');

            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'frekvens-opt-btn';
                btn.textContent = opt;

                btn.onclick = () => {
                    optGrid.querySelectorAll('.frekvens-opt-btn').forEach(b => b.disabled = true);

                    if (opt === q.correct) {
                        fqScore++;
                        btn.classList.add('correct');
                        feedbackEl.className = 'vaerksted-feedback-banner correct';
                        feedbackEl.innerHTML = `<strong>${getTranslation('tids_correct')}</strong> ${q.explanation}`;
                    } else {
                        btn.classList.add('wrong');
                        optGrid.querySelectorAll('.frekvens-opt-btn').forEach(b => {
                            if (b.textContent === q.correct) b.classList.add('correct');
                        });
                        feedbackEl.className = 'vaerksted-feedback-banner wrong';
                        feedbackEl.innerHTML = getTranslation('tids_v_feedback_wrong', { correct: q.correct, tip: q.explanation });
                    }

                    listenBtn.style.display = 'inline-flex';
                    listenBtn.onclick = () => speakDanish(q.exampleSentence);

                    nextBtn.style.display = 'inline-block';
                    if (fqIndex === FREKVENS_QUESTIONS.length - 1) {
                        nextBtn.textContent = getTranslation('tids_fq_btn_see_res');
                    }
                };

                optGrid.appendChild(btn);
            });

            nextBtn.onclick = () => {
                if (fqIndex < FREKVENS_QUESTIONS.length - 1) {
                    fqIndex++;
                    renderFrekvensQuiz();
                } else {
                    renderFrekvensResult();
                }
            };

            fqContainer.appendChild(box);
        }

        function renderFrekvensResult() {
            fqContainer.innerHTML = `
                <div class="frekvens-quiz-box" style="text-align: center; padding: 2rem 1rem;">
                    <span class="tids-exercise-tag" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
                        ${getTranslation('tids_fq_res_tag')}
                    </span>
                    <h3 style="font-size: 1.6rem; color: white; margin: 0.8rem 0 0.4rem;">${getTranslation('tids_fq_res_title')}</h3>
                    <p style="color: #94a3b8; font-size: 1.15rem; margin-bottom: 1.4rem;">
                        ${getTranslation('tids_fq_res_score', { score: fqScore, total: FREKVENS_QUESTIONS.length })}
                    </p>
                    <p style="color: #cbd5e1; max-width: 520px; margin: 0 auto 1.8rem; line-height: 1.6;">
                        ${getTranslation('tids_fq_res_desc')}
                    </p>
                    <button type="button" class="task-next-btn" id="btn-restart-fq" style="background: #f59e0b; color: #0f172a;">
                        ${getTranslation('tids_fq_btn_restart')}
                    </button>
                </div>
            `;

            fqContainer.querySelector('#btn-restart-fq').onclick = () => {
                fqIndex = 0;
                fqScore = 0;
                renderFrekvensQuiz();
            };
        }

        renderFrekvensQuiz();
        parent.appendChild(frekvensSection);
    }

    // Initial render
    renderActiveTab();

    container.appendChild(viewContainer);
}
