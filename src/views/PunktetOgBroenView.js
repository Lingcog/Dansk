import { getTranslation } from '../utils/i18n.js';

/**
 * PunktetOgBroenView - Didaktisk flade til:
 * "Datid og førnutid: punktet og broen"
 * 
 * Enkelt og stramt design efter dansk retskrivning:
 *  1. Enkel, visuel tidslinje (Punktet over for broen)
 *  2. Hovedreglen (Datid vs. førnutid)
 *  3. Sammenlign eksempler (Direkte sammenligninger)
 *  4. Vælg den rigtige tid (10 fokuserede opgaver)
 *  5. Sortér tidsudtryk (Direkte, intuitiv sortering uden pop op)
 */
export function renderPunktetOgBroenView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container punktet-broen-view';

    // Toplinje med tilbageknap
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.marginBottom = '1.5rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    const returnTarget = extraData.from || 'dagens_opgave';
    backBtn.onclick = () => navigateFn(returnTarget);
    topBar.appendChild(backBtn);

    const verbHubBtn = document.createElement('button');
    verbHubBtn.className = 'back-btn';
    verbHubBtn.style.background = 'rgba(239, 68, 68, 0.12)';
    verbHubBtn.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    verbHubBtn.style.color = '#f87171';
    verbHubBtn.innerHTML = `Top 100-verber ➔`;
    verbHubBtn.onclick = () => navigateFn('top100_verber');
    topBar.appendChild(verbHubBtn);

    viewContainer.appendChild(topBar);

    // Oplæsning (TTS)
    function speakDanish(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // CSS Styling - Stram, enkel og uden unødig visuel støj
    const style = document.createElement('style');
    style.textContent = `
        .punktet-broen-view {
            max-width: 1040px;
            margin: 0 auto;
            padding: 0.5rem 1.25rem 4rem;
            color: #f8fafc;
        }

        /* Hero */
        .pob-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .pob-hero h1 {
            font-size: 2.1rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 0.5rem;
            letter-spacing: -0.02em;
        }
        .pob-hero p {
            color: #94a3b8;
            font-size: 1.05rem;
            max-width: 700px;
            margin: 0 auto 1.2rem;
            line-height: 1.5;
        }
        .pob-hero-badges {
            display: flex;
            justify-content: center;
            gap: 0.75rem;
            flex-wrap: wrap;
        }
        .pob-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.35rem 0.9rem;
            border-radius: 9999px;
            font-size: 0.85rem;
            font-weight: 600;
            border: 1px solid;
        }
        .tag-punkt {
            background: rgba(239, 68, 68, 0.1);
            border-color: rgba(239, 68, 68, 0.35);
            color: #fca5a5;
        }
        .tag-bro {
            background: rgba(245, 158, 11, 0.1);
            border-color: rgba(245, 158, 11, 0.35);
            color: #fcd34d;
        }

        /* Enkel SVG-tidslinje */
        .pob-timeline-card {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1.25rem;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .pob-timeline-caption {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.75rem;
            padding-top: 0.75rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 0.85rem;
            color: #94a3b8;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        /* Fanemenu */
        .pob-nav-tabs {
            display: flex;
            gap: 0.4rem;
            margin-bottom: 1.8rem;
            background: rgba(15, 23, 42, 0.8);
            padding: 0.35rem;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            overflow-x: auto;
        }
        .pob-nav-btn {
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
        .pob-nav-btn:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.05);
        }
        .pob-nav-btn.active {
            background: #f59e0b;
            color: #0f172a;
            font-weight: 700;
        }

        /* Hovedreglen: 2 søjler */
        .pob-rules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        .rule-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.6rem;
            display: flex;
            flex-direction: column;
        }
        .rule-card.rule-punkt {
            border-top: 4px solid #ef4444;
        }
        .rule-card.rule-bro {
            border-top: 4px solid #f59e0b;
        }
        .rule-card-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }
        .rule-icon {
            font-size: 1.6rem;
        }
        .rule-title h3 {
            font-size: 1.35rem;
            font-weight: 700;
            margin: 0;
            color: #ffffff;
        }
        .rule-title span {
            font-size: 0.85rem;
            color: #94a3b8;
            font-weight: 500;
        }
        .rule-formula {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 0.65rem 0.9rem;
            font-size: 0.9rem;
            color: #38bdf8;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        .rule-body {
            color: #cbd5e1;
            font-size: 0.95rem;
            line-height: 1.55;
            margin-bottom: 1.25rem;
            flex-grow: 1;
        }
        .rule-points {
            list-style: none;
            padding: 0;
            margin: 0 0 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
        }
        .rule-points li {
            font-size: 0.9rem;
            color: #cbd5e1;
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            line-height: 1.45;
        }
        .rule-footer-title {
            font-size: 0.8rem;
            font-weight: 700;
            color: #94a3b8;
            margin-bottom: 0.4rem;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .rule-chips {
            display: flex;
            gap: 0.4rem;
            flex-wrap: wrap;
        }
        .rule-chip {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            font-size: 0.8rem;
            color: #e2e8f0;
        }

        /* Eksempler (Dueller) */
        .pob-examples-list {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            margin-bottom: 2rem;
        }
        .example-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1.4rem;
        }
        .example-title {
            font-size: 1.05rem;
            font-weight: 700;
            color: #f1f5f9;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .example-columns {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
        }
        .example-box {
            background: #0f172a;
            border-radius: 12px;
            padding: 1rem 1.15rem;
            border-left: 3px solid #ef4444;
        }
        .example-box.box-bro {
            border-left-color: #f59e0b;
        }
        .example-label {
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            margin-bottom: 0.35rem;
        }
        .example-sentence {
            font-size: 1.05rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.4rem;
        }
        .example-explanation {
            font-size: 0.88rem;
            color: #94a3b8;
            line-height: 1.45;
        }

        /* Opgaver */
        .pob-task-container {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            padding: 1.75rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .task-counter-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.25rem;
        }
        .task-counter {
            font-size: 0.85rem;
            font-weight: 700;
            color: #f59e0b;
            background: rgba(245, 158, 11, 0.12);
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .task-sentence-box {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 1.25rem 1.4rem;
            font-size: 1.25rem;
            font-weight: 600;
            line-height: 1.5;
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .task-audio-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #38bdf8;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            flex-shrink: 0;
            transition: all 0.2s;
        }
        .task-audio-btn:hover {
            background: rgba(56, 189, 248, 0.2);
            transform: scale(1.05);
        }
        .task-hint {
            color: #38bdf8;
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .task-choices-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
            margin-bottom: 1.25rem;
        }
        .choice-btn {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            border-radius: 14px;
            padding: 1rem;
            color: #ffffff;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }
        .choice-btn:hover {
            border-color: #38bdf8;
            background: rgba(56, 189, 248, 0.08);
            transform: translateY(-2px);
        }
        .choice-text {
            font-size: 1.2rem;
            font-weight: 700;
        }
        .choice-type {
            font-size: 0.8rem;
            color: #94a3b8;
        }
        .choice-btn.correct {
            background: rgba(34, 197, 94, 0.2) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .choice-btn.wrong {
            background: rgba(239, 68, 68, 0.15) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
            opacity: 0.7;
        }
        .task-feedback {
            padding: 1.1rem 1.25rem;
            border-radius: 12px;
            margin-top: 1rem;
            line-height: 1.5;
        }
        .task-next-btn {
            background: #f59e0b;
            color: #0f172a;
            border: none;
            padding: 0.75rem 1.6rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            margin-top: 1rem;
            transition: all 0.2s;
            display: inline-block;
        }
        .task-next-btn:hover {
            background: #fbbf24;
            transform: translateY(-1px);
        }

        /* Sortér tidsudtryk - Rent, inline og uden pop op */
        .sorter-container {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1.6rem;
        }
        .sorter-instruction {
            margin-bottom: 1.5rem;
        }
        .sorter-instruction h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0 0 0.35rem;
            color: #ffffff;
        }
        .sorter-instruction p {
            color: #94a3b8;
            font-size: 0.92rem;
            margin: 0;
        }
        .sorter-active-area {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1.25rem;
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .sorter-current-word {
            font-size: 1.5rem;
            font-weight: 800;
            color: #38bdf8;
            margin-bottom: 1rem;
        }
        .sorter-direct-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .sorter-pick-btn {
            border: 1.5px solid;
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .btn-punkt-pick {
            background: rgba(239, 68, 68, 0.15);
            border-color: #ef4444;
            color: #f87171;
        }
        .btn-punkt-pick:hover {
            background: rgba(239, 68, 68, 0.25);
            transform: translateY(-2px);
        }
        .btn-bro-pick {
            background: rgba(245, 158, 11, 0.15);
            border-color: #f59e0b;
            color: #fbbf24;
        }
        .btn-bro-pick:hover {
            background: rgba(245, 158, 11, 0.25);
            transform: translateY(-2px);
        }

        .sorter-buckets-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.25rem;
        }
        .sorter-bucket {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
            padding: 1.25rem;
            min-height: 180px;
            display: flex;
            flex-direction: column;
        }
        .bucket-punkt {
            border-top: 3px solid #ef4444;
        }
        .bucket-bro {
            border-top: 3px solid #f59e0b;
        }
        .bucket-title {
            font-size: 1.05rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .bucket-sub {
            font-size: 0.8rem;
            color: #94a3b8;
            margin-bottom: 0.85rem;
        }
        .bucket-chips-flow {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            flex-grow: 1;
            align-content: flex-start;
        }
        .placed-badge {
            padding: 0.3rem 0.65rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
        }
        .placed-punkt {
            background: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
            border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .placed-bro {
            background: rgba(245, 158, 11, 0.2);
            color: #fde68a;
            border: 1px solid rgba(245, 158, 11, 0.3);
        }

        @media (max-width: 768px) {
            .punktet-broen-view {
                padding: 0.25rem 0.65rem 3rem;
            }
            .pob-hero {
                margin-bottom: 1.2rem;
            }
            .pob-hero h1 {
                font-size: 1.4rem;
            }
            .pob-hero p {
                font-size: 0.88rem;
                line-height: 1.45;
                margin-bottom: 0.8rem;
            }
            .pob-hero-badges {
                gap: 0.4rem;
            }
            .pob-tag {
                font-size: 0.75rem;
                padding: 0.25rem 0.65rem;
            }
            .pob-timeline-card {
                padding: 0.85rem 0.65rem;
                border-radius: 14px;
                margin-bottom: 1.2rem;
            }
            .pob-timeline-caption {
                font-size: 0.75rem;
                flex-direction: column;
                align-items: flex-start;
                gap: 0.3rem;
            }
            .pob-nav-tabs {
                margin-bottom: 1.2rem;
                gap: 0.25rem;
                padding: 0.25rem;
            }
            .pob-nav-btn {
                padding: 0.5rem 0.8rem;
                font-size: 0.82rem;
            }
            .pob-rules-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
                margin-bottom: 1.2rem;
            }
            .rule-card {
                padding: 1rem;
                border-radius: 14px;
            }
            .rule-card-header {
                gap: 0.5rem;
                margin-bottom: 0.75rem;
            }
            .rule-icon {
                font-size: 1.3rem;
            }
            .rule-title h3 {
                font-size: 1.15rem;
            }
            .rule-title span {
                font-size: 0.78rem;
            }
            .rule-formula {
                padding: 0.55rem 0.75rem;
                font-size: 0.82rem;
                margin-bottom: 0.75rem;
            }
            .rule-body {
                font-size: 0.88rem;
                line-height: 1.45;
                margin-bottom: 0.85rem;
            }
            .rule-points {
                gap: 0.45rem;
                margin-bottom: 0.85rem;
            }
            .rule-points li {
                font-size: 0.82rem;
                gap: 0.4rem;
            }
            .rule-chip {
                font-size: 0.75rem;
                padding: 0.15rem 0.45rem;
            }
            .pob-examples-list {
                gap: 0.85rem;
                margin-bottom: 1.2rem;
            }
            .example-card {
                padding: 1rem;
                border-radius: 14px;
            }
            .example-title {
                font-size: 0.98rem;
                margin-bottom: 0.75rem;
            }
            .example-columns {
                grid-template-columns: 1fr;
                gap: 0.65rem;
            }
            .example-box {
                padding: 0.75rem 0.85rem;
            }
            .example-label {
                font-size: 0.72rem;
            }
            .example-sentence {
                font-size: 0.95rem;
            }
            .example-explanation {
                font-size: 0.82rem;
            }
            .pob-task-container {
                padding: 1rem;
                border-radius: 14px;
            }
            .task-sentence-box {
                padding: 0.9rem 0.85rem;
                font-size: 1.05rem;
                flex-direction: column;
                align-items: flex-start;
                gap: 0.6rem;
            }
            .task-audio-btn {
                width: 34px;
                height: 34px;
                font-size: 0.95rem;
            }
            .task-hint {
                font-size: 0.82rem;
                margin-bottom: 0.85rem;
            }
            .task-choices-grid {
                grid-template-columns: 1fr;
                gap: 0.6rem;
                margin-bottom: 1rem;
            }
            .choice-btn {
                padding: 0.75rem 0.85rem;
                border-radius: 12px;
            }
            .choice-text {
                font-size: 1.05rem;
            }
            .choice-type {
                font-size: 0.75rem;
            }
            .task-feedback {
                padding: 0.85rem 0.95rem;
                font-size: 0.88rem;
            }
            .task-next-btn {
                width: 100%;
                text-align: center;
                padding: 0.7rem 1.2rem;
                font-size: 0.9rem;
            }
            .sorter-container {
                padding: 1rem;
                border-radius: 14px;
            }
            .sorter-instruction {
                margin-bottom: 1rem;
            }
            .sorter-instruction h3 {
                font-size: 1.08rem;
            }
            .sorter-instruction p {
                font-size: 0.84rem;
            }
            .sorter-active-area {
                padding: 0.9rem 0.75rem;
                border-radius: 12px;
                margin-bottom: 1rem;
            }
            .sorter-current-word {
                font-size: 1.25rem;
                margin-bottom: 0.8rem;
            }
            .sorter-direct-actions {
                gap: 0.6rem;
                flex-direction: column;
            }
            .sorter-pick-btn {
                width: 100%;
                justify-content: center;
                padding: 0.7rem 1rem;
                font-size: 0.88rem;
            }
            .sorter-buckets-grid {
                grid-template-columns: 1fr;
                gap: 0.85rem;
            }
            .sorter-bucket {
                min-height: auto;
                padding: 0.9rem;
                border-radius: 12px;
            }
            .bucket-title {
                font-size: 0.95rem;
            }
            .placed-badge {
                font-size: 0.78rem;
                padding: 0.25rem 0.55rem;
            }
        }

        @media (max-width: 480px) {
            .punktet-broen-view {
                padding: 0.2rem 0.4rem 2.5rem;
            }
            .pob-hero h1 {
                font-size: 1.25rem;
            }
            .pob-hero p {
                font-size: 0.82rem;
            }
            .pob-nav-btn {
                padding: 0.45rem 0.65rem;
                font-size: 0.78rem;
            }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section - Korrekt dansk retskrivning
    const hero = document.createElement('div');
    hero.className = 'pob-hero';
    hero.innerHTML = `
        <h1>Datid og førnutid: punktet og broen</h1>
        <p>Lær forskellen mellem et afsluttet tidspunkt i fortiden og en handling, der rækker ind i nutiden.</p>
        <div class="pob-hero-badges">
            <span class="pob-tag tag-punkt">📍 Punktet (datid): afsluttet tid</span>
            <span class="pob-tag tag-bro">🌉 Broen (førnutid): forbindelse til nu</span>
        </div>
    `;
    viewContainer.appendChild(hero);

    // ==========================================================
    // --- STRAM, ENKEL SVG-TIDSLINJE ---
    // ==========================================================
    const timelineCard = document.createElement('div');
    timelineCard.className = 'pob-timeline-card';
    timelineCard.innerHTML = `
        <svg viewBox="0 0 900 240" width="100%" height="auto" style="display: block; max-height: 260px;" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="axisGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#475569" />
                    <stop offset="70%" stop-color="#64748b" />
                    <stop offset="100%" stop-color="#38bdf8" />
                </linearGradient>
                <linearGradient id="bridgeArc" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#f59e0b" />
                    <stop offset="100%" stop-color="#10b981" />
                </linearGradient>
            </defs>

            <!-- Tidslinje-akse -->
            <line x1="60" y1="160" x2="840" y2="160" stroke="url(#axisGrad)" stroke-width="3" stroke-linecap="round" />
            <polygon points="846,160 834,154 834,166" fill="#38bdf8" />

            <!-- Zoner -->
            <text x="70" y="35" fill="#64748b" font-size="12" font-weight="700" letter-spacing="0.5">FORTID</text>
            <text x="750" y="35" fill="#38bdf8" font-size="12" font-weight="700" letter-spacing="0.5">NUTID</text>

            <!-- Punktet (Datid) -->
            <g id="svg-punkt" style="cursor: pointer;">
                <circle cx="280" cy="160" r="10" fill="#ef4444" />
                <circle cx="280" cy="160" r="4" fill="#ffffff" />
                <line x1="280" y1="145" x2="280" y2="115" stroke="#ef4444" stroke-width="1.5" />
                
                <rect x="180" y="70" width="200" height="42" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" />
                <text x="280" y="88" fill="#fca5a5" font-size="13" font-weight="700" text-anchor="middle">Punktet (datid)</text>
                <text x="280" y="103" fill="#94a3b8" font-size="11" text-anchor="middle">Afsluttet tid: "jeg boede", "jeg gik"</text>
                
                <text x="280" y="185" fill="#94a3b8" font-size="11" text-anchor="middle">i går • for et år siden • i 2018</text>
            </g>

            <!-- Broen (Førnutid) -->
            <g id="svg-bro" style="cursor: pointer;">
                <!-- Bue fra x=420 til x=750 -->
                <path d="M 420,160 Q 585,55 750,160" fill="none" stroke="url(#bridgeArc)" stroke-width="4" stroke-linecap="round" />
                <circle cx="420" cy="160" r="6" fill="#f59e0b" />
                <circle cx="750" cy="160" r="10" fill="#10b981" />
                <circle cx="750" cy="160" r="4" fill="#ffffff" />

                <rect x="485" y="45" width="200" height="42" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" />
                <text x="585" y="63" fill="#fde68a" font-size="13" font-weight="700" text-anchor="middle">Broen (førnutid)</text>
                <text x="585" y="78" fill="#94a3b8" font-size="11" text-anchor="middle">har/er + kort tillægsform</text>

                <text x="750" y="185" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">Nu</text>
                <text x="750" y="200" fill="#94a3b8" font-size="11" text-anchor="middle">Forbindelse til nu</text>
            </g>
        </svg>

        <div class="pob-timeline-caption">
            <span><strong>Regel:</strong> Datid bruges ved et lukket tidspunkt. Førnutid bruges ved forbindelse til nuet.</span>
            <span>Tryk på en fane nedenfor for at udforske eksempler og opgaver.</span>
        </div>
    `;
    viewContainer.appendChild(timelineCard);

    // Fanemenu
    const navTabs = document.createElement('div');
    navTabs.className = 'pob-nav-tabs';
    const tabsData = [
        { id: 'tab_concept', label: 'Hovedreglen' },
        { id: 'tab_duels', label: 'Sammenlign eksempler' },
        { id: 'tab_quiz', label: 'Vælg den rigtige tid (10 opgaver)' },
        { id: 'tab_sorter', label: 'Sortér tidsudtryk' }
    ];

    let activeTabId = 'tab_concept';

    tabsData.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `pob-nav-btn ${t.id === activeTabId ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.textContent = t.label;
        btn.onclick = () => switchTab(t.id);
        navTabs.appendChild(btn);
    });
    viewContainer.appendChild(navTabs);

    const panelsContainer = document.createElement('div');
    viewContainer.appendChild(panelsContainer);

    // ==========================================================
    // --- FANE 1: HOVEDREGLEN ---
    // ==========================================================
    const conceptPanel = document.createElement('div');
    conceptPanel.id = 'panel_concept';
    conceptPanel.innerHTML = `
        <div class="pob-rules-grid">
            <!-- 1. Punktet (Datid) -->
            <div class="rule-card rule-punkt">
                <div class="rule-card-header">
                    <span class="rule-icon">📍</span>
                    <div class="rule-title">
                        <h3>Punktet</h3>
                        <span>Datid (præteritum)</span>
                    </div>
                </div>
                <div class="rule-formula">
                    Form: datidsform (boede, gik, drak, kom, mødte)
                </div>
                <div class="rule-body">
                    Datid bruges, når handlingen skete på et <strong>afsluttet tidspunkt</strong> i fortiden. Tidsrummet er overstået, og handlingen har sluppet nuet.
                </div>
                <ul class="rule-points">
                    <li>• <strong>Afsluttet tid:</strong> Dagen eller perioden er forbi (i går, sidste år).</li>
                    <li>• <strong>Præcist tidspunkt:</strong> Svarer på "hvornår?" (kl. 8, i 2018, for to timer siden).</li>
                    <li>• <strong>Fortælling:</strong> Handlinger i en historie, der skete efter hinanden.</li>
                </ul>
                <div style="margin-top: auto;">
                    <div class="rule-footer-title">Typiske tidsudtryk med datid:</div>
                    <div class="rule-chips">
                        <span class="rule-chip">i går</span>
                        <span class="rule-chip">i 2018</span>
                        <span class="rule-chip">sidste uge</span>
                        <span class="rule-chip">for ... siden</span>
                        <span class="rule-chip">dengang</span>
                        <span class="rule-chip">da jeg var barn</span>
                    </div>
                </div>
            </div>

            <!-- 2. Broen (Førnutid) -->
            <div class="rule-card rule-bro">
                <div class="rule-card-header">
                    <span class="rule-icon">🌉</span>
                    <div class="rule-title">
                        <h3>Broen</h3>
                        <span>Førnutid (perfektum)</span>
                    </div>
                </div>
                <div class="rule-formula" style="color: #fcd34d;">
                    Form: har/er + kort tillægsform (har boet, er kommet)
                </div>
                <div class="rule-body">
                    Førnutid bygger en bro fra fortiden til nutiden. Vi bruger den, når handlingen har <strong>betydning eller resultat lige nu</strong>.
                </div>
                <ul class="rule-points">
                    <li>• <strong>Erfaring indtil nu:</strong> "Jeg har set den film tre gange."</li>
                    <li>• <strong>Stadig i gang:</strong> "Jeg har boet her i fem år (og bor her stadig)."</li>
                    <li>• <strong>Friskt resultat i nuet:</strong> "Han er lige kommet (han står her nu)."</li>
                </ul>
                <div style="margin-top: auto;">
                    <div class="rule-footer-title">Typiske tidsudtryk med førnutid:</div>
                    <div class="rule-chips">
                        <span class="rule-chip">indtil nu</span>
                        <span class="rule-chip">allerede</span>
                        <span class="rule-chip">endnu ikke</span>
                        <span class="rule-chip">nogensinde</span>
                        <span class="rule-chip">aldrig</span>
                        <span class="rule-chip">i dag</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // ==========================================================
    // --- FANE 2: SAMMENLIGN EKSEMPLER ---
    // ==========================================================
    const duelsPanel = document.createElement('div');
    duelsPanel.id = 'panel_duels';

    const examplePairs = [
        {
            title: 'At bo et sted',
            icon: '🏠',
            punkt: {
                sentence: 'Jeg boede i Spanien i to år.',
                explanation: 'Handlingen er afsluttet. Jeg bor ikke i Spanien i dag.'
            },
            bro: {
                sentence: 'Jeg har boet i Spanien i to år.',
                explanation: 'Handlingen begyndte for to år siden og fortsætter i dag: Jeg bor stadig i Spanien.'
            }
        },
        {
            title: 'At drikke kaffe',
            icon: '☕',
            punkt: {
                sentence: 'Vi drak kaffe for en time siden.',
                explanation: '"For en time siden" låser handlingen fast til et bestemt tidspunkt i fortiden.'
            },
            bro: {
                sentence: 'Vi har drukket tre kopper kaffe i dag.',
                explanation: 'Dagen i dag er ikke slut endnu, og handlingen har betydning for nuet.'
            }
        },
        {
            title: 'At tabe sine nøgler',
            icon: '🔑',
            punkt: {
                sentence: 'I går tabte jeg mine nøgler (men naboen fandt dem).',
                explanation: 'Handlingen skete i går, og problemet blev løst. Ingen konsekvens nu.'
            },
            bro: {
                sentence: 'Hjælp, jeg har tabt mine nøgler!',
                explanation: 'Konsekvensen gælder lige nu: Jeg kan ikke komme ind ad døren.'
            }
        },
        {
            title: 'At gå i biografen',
            icon: '🎬',
            punkt: {
                sentence: 'I fredags var jeg i biografen.',
                explanation: '"I fredags" er et lukket tidspunkt i fortiden.'
            },
            bro: {
                sentence: 'Jeg har været i biografen mange gange.',
                explanation: 'Det handler om min samlede livserfaring frem til i dag.'
            }
        }
    ];

    duelsPanel.innerHTML = `
        <div class="pob-examples-list">
            ${examplePairs.map(ex => `
                <div class="example-card">
                    <div class="example-title">
                        <span>${ex.icon}</span>
                        <span>${ex.title}</span>
                    </div>
                    <div class="example-columns">
                        <div class="example-box">
                            <div class="example-label" style="color: #f87171;">Datid (punktet)</div>
                            <div class="example-sentence">"${ex.punkt.sentence}"</div>
                            <div class="example-explanation">${ex.punkt.explanation}</div>
                        </div>
                        <div class="example-box box-bro">
                            <div class="example-label" style="color: #fbbf24;">Førnutid (broen)</div>
                            <div class="example-sentence">"${ex.bro.sentence}"</div>
                            <div class="example-explanation">${ex.bro.explanation}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // ==========================================================
    // --- FANE 3: VÆLG DEN RIGTIGE TID (10 opgaver) ---
    // ==========================================================
    const quizPanel = document.createElement('div');
    quizPanel.id = 'panel_quiz';

    const tasks = [
        {
            sentenceBefore: "I 2012",
            sentenceAfter: "familien til Danmark.",
            options: [
                { text: "flyttede", type: "punkt", label: "datid" },
                { text: "er flyttet", type: "bro", label: "førnutid" }
            ],
            correct: "flyttede",
            hint: '"I 2012" er et præcist årstal i fortiden.',
            explanation: '"I 2012" er et lukket tidspunkt i fortiden. Ved et præcist årstal skal vi bruge datid (flyttede).'
        },
        {
            sentenceBefore: "Hvor er Mads? – Han",
            sentenceAfter: "lige ind ad døren.",
            options: [
                { text: "kom", type: "punkt", label: "datid" },
                { text: "er kommet", type: "bro", label: "førnutid" }
            ],
            correct: "er kommet",
            hint: '"Lige" viser, at handlingen har direkte betydning nu.',
            explanation: '"Lige" bygger bro til nuet (han står her nu). Derfor bruges førnutid (er kommet).'
        },
        {
            sentenceBefore: "Jeg",
            sentenceAfter: "tre kopper kaffe for en time siden.",
            options: [
                { text: "drak", type: "punkt", label: "datid" },
                { text: "har drukket", type: "bro", label: "førnutid" }
            ],
            correct: "drak",
            hint: 'Tidsudtryk med "for ... siden" peger på et afsluttet tidspunkt.',
            explanation: '"For en time siden" låser handlingen fast til et bestemt tidspunkt i fortiden (drak).'
        },
        {
            sentenceBefore: "Sofie",
            sentenceAfter: "i denne lejlighed i fem år, og hun elsker stadig at bo her.",
            options: [
                { text: "boede", type: "punkt", label: "datid" },
                { text: "har boet", type: "bro", label: "førnutid" }
            ],
            correct: "har boet",
            hint: 'Handlingen fortsætter stadig lige nu.',
            explanation: 'Hun bor stadig i lejligheden i dag. Derfor bygges broen til nutiden med førnutid (har boet).'
        },
        {
            sentenceBefore: "I går",
            sentenceAfter: "jeg min gamle ven ved bussen.",
            options: [
                { text: "mødte", type: "punkt", label: "datid" },
                { text: "har mødt", type: "bro", label: "førnutid" }
            ],
            correct: "mødte",
            hint: '"I går" er en afsluttet dag i fortiden.',
            explanation: '"I går" er et afsluttet tidsrum. Derfor skal det være datid (mødte).'
        },
        {
            sentenceBefore: "Jeg",
            sentenceAfter: "aldrig prøvet at køre i metroen i København.",
            options: [
                { text: "har", type: "bro", label: "førnutid" },
                { text: "havde", type: "punkt", label: "datid" }
            ],
            correct: "har",
            hint: null,
            explanation: '"Aldrig" og "nogensinde" beskriver erfaringer i hele livet indtil nu. Derfor bruges førnutid (har aldrig prøvet).'
        },
        {
            sentenceBefore: "Toget",
            sentenceAfter: "allerede stationen, så vi må vente på det næste.",
            options: [
                { text: "forlod", type: "punkt", label: "datid" },
                { text: "har forladt", type: "bro", label: "førnutid" }
            ],
            correct: "har forladt",
            hint: null,
            explanation: '"Allerede" kobler afgangen til vores situation lige nu. Derfor bruges førnutid (har forladt).'
        },
        {
            sentenceBefore: "Da jeg var barn,",
            sentenceAfter: "jeg altid til fodbold om onsdagen.",
            options: [
                { text: "gik", type: "punkt", label: "datid" },
                { text: "er gået", type: "bro", label: "førnutid" }
            ],
            correct: "gik",
            hint: null,
            explanation: 'Barndommen er en lukket periode i fortiden = datid (gik).'
        },
        {
            sentenceBefore: "Hvem",
            sentenceAfter: "denne flotte tegning på tavlen?",
            options: [
                { text: "tegnede", type: "punkt", label: "datid" },
                { text: "har tegnet", type: "bro", label: "førnutid" }
            ],
            correct: "har tegnet",
            hint: null,
            explanation: 'Tegningen ses fysisk på tavlen lige nu som et frisk resultat = førnutid (har tegnet).'
        },
        {
            sentenceBefore: "I morges kl. 8.00",
            sentenceAfter: "vækkeuret højlydt.",
            options: [
                { text: "ringede", type: "punkt", label: "datid" },
                { text: "har ringet", type: "bro", label: "førnutid" }
            ],
            correct: "ringede",
            hint: null,
            explanation: 'Et præcist klokkeslæt i fortiden låser handlingen fast = datid (ringede).'
        }
    ];

    let currentTaskIndex = 0;
    const taskContainer = document.createElement('div');
    taskContainer.className = 'pob-task-container';

    function renderTask() {
        taskContainer.innerHTML = '';
        const task = tasks[currentTaskIndex];

        // Tæller
        const counterRow = document.createElement('div');
        counterRow.className = 'task-counter-row';
        counterRow.innerHTML = `
            <span class="task-counter">Opgave ${currentTaskIndex + 1} af ${tasks.length}</span>
            <span style="font-size: 0.85rem; color: #94a3b8;">Vælg den rigtige form</span>
        `;
        taskContainer.appendChild(counterRow);

        // Sætningsboks
        const sentenceBox = document.createElement('div');
        sentenceBox.className = 'task-sentence-box';
        sentenceBox.innerHTML = `
            <span>${task.sentenceBefore} <span style="text-decoration: underline; color: #38bdf8;">_____</span> ${task.sentenceAfter}</span>
            <button class="task-audio-btn" title="Lyt til sætningen" id="btn-audio-task">🔊</button>
        `;
        taskContainer.appendChild(sentenceBox);

        sentenceBox.querySelector('#btn-audio-task').onclick = () => {
            speakDanish(`${task.sentenceBefore} ${task.correct} ${task.sentenceAfter}`);
        };

        // Hint (kun opgave 1-5, jf. brugerens pædagogiske princip)
        if (task.hint) {
            const hintEl = document.createElement('div');
            hintEl.className = 'task-hint';
            hintEl.innerHTML = `<span>💡 Hint:</span> ${task.hint}`;
            taskContainer.appendChild(hintEl);
        }

        // Svarmuligheder
        const choicesGrid = document.createElement('div');
        choicesGrid.className = 'task-choices-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'task-feedback';
        feedbackBox.style.display = 'none';

        task.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = `
                <span class="choice-text">${opt.text}</span>
                <span class="choice-type">${opt.label}</span>
            `;

            btn.onclick = () => {
                const isCorrect = (opt.text.toLowerCase() === task.correct.toLowerCase());
                choicesGrid.querySelectorAll('.choice-btn').forEach(b => b.style.pointerEvents = 'none');

                if (isCorrect) {
                    btn.classList.add('correct');
                    sentenceBox.querySelector('span').innerHTML = `${task.sentenceBefore} <strong style="color: #4ade80; text-decoration: underline;">${opt.text}</strong> ${task.sentenceAfter}`;
                    feedbackBox.style.display = 'block';
                    feedbackBox.style.background = 'rgba(34, 197, 94, 0.12)';
                    feedbackBox.style.border = '1px solid rgba(34, 197, 94, 0.4)';
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-weight: 700; margin-bottom: 0.3rem;">Korrekt!</div>
                        <div style="color: #cbd5e1; font-size: 0.92rem;">${task.explanation}</div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    choicesGrid.querySelectorAll('.choice-btn').forEach(b => {
                        if (b.querySelector('.choice-text').textContent.toLowerCase() === task.correct.toLowerCase()) {
                            b.classList.add('correct');
                        }
                    });
                    sentenceBox.querySelector('span').innerHTML = `${task.sentenceBefore} <strong style="color: #4ade80; text-decoration: underline;">${task.correct}</strong> ${task.sentenceAfter}`;
                    feedbackBox.style.display = 'block';
                    feedbackBox.style.background = 'rgba(239, 68, 68, 0.12)';
                    feedbackBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-weight: 700; margin-bottom: 0.3rem;">Det rigtige svar er "${task.correct}".</div>
                        <div style="color: #cbd5e1; font-size: 0.92rem;">${task.explanation}</div>
                    `;
                }

                const nextBtn = document.createElement('button');
                nextBtn.className = 'task-next-btn';
                nextBtn.textContent = currentTaskIndex < tasks.length - 1 ? 'Næste opgave ➔' : 'Start forfra 🔄';
                nextBtn.onclick = () => {
                    currentTaskIndex = (currentTaskIndex + 1) % tasks.length;
                    renderTask();
                };
                feedbackBox.appendChild(nextBtn);
            };

            choicesGrid.appendChild(btn);
        });

        taskContainer.appendChild(choicesGrid);
        taskContainer.appendChild(feedbackBox);
    }

    renderTask();
    quizPanel.appendChild(taskContainer);

    // ==========================================================
    // --- FANE 4: SORTÉR TIDSUDTRYK (Enkelt, direkte sortering) ---
    // ==========================================================
    const sorterPanel = document.createElement('div');
    sorterPanel.id = 'panel_sorter';

    const markers = [
        { word: 'i går', target: 'punkt' },
        { word: 'indtil nu', target: 'bro' },
        { word: 'i 2015', target: 'punkt' },
        { word: 'for en uge siden', target: 'punkt' },
        { word: 'allerede', target: 'bro' },
        { word: 'sidste sommer', target: 'punkt' },
        { word: 'aldrig', target: 'bro' },
        { word: 'i morges kl. 7.00', target: 'punkt' },
        { word: 'endnu ikke', target: 'bro' },
        { word: 'dengang', target: 'punkt' },
        { word: 'nogensinde', target: 'bro' },
        { word: 'siden i mandags', target: 'bro' }
    ];

    let remainingMarkers = [...markers].sort(() => Math.random() - 0.5);
    let punktList = [];
    let broList = [];
    let currentMarkerIndex = 0;

    function renderSorter() {
        sorterPanel.innerHTML = '';
        const containerBox = document.createElement('div');
        containerBox.className = 'sorter-container';

        containerBox.innerHTML = `
            <div class="sorter-instruction">
                <h3>Sortér tidsudtrykkene: punkt eller bro?</h3>
                <p>Afgør om tidsudtrykket låser handlingen til et afsluttet tidspunkt (punktet), eller om det forbinder handlingen med nuet (broen).</p>
            </div>
        `;

        if (remainingMarkers.length > 0) {
            const currentItem = remainingMarkers[0];
            const activeArea = document.createElement('div');
            activeArea.className = 'sorter-active-area';
            activeArea.innerHTML = `
                <div style="font-size: 0.85rem; color: #94a3b8; font-weight: 600; margin-bottom: 0.4rem;">
                    Hvor hører dette tidsudtryk til? (${remainingMarkers.length} tilbage)
                </div>
                <div class="sorter-current-word">"${currentItem.word}"</div>
                <div class="sorter-direct-actions">
                    <button class="sorter-pick-btn btn-punkt-pick" id="btn-pick-punkt">
                        📍 Punktet (datid)
                    </button>
                    <button class="sorter-pick-btn btn-bro-pick" id="btn-pick-bro">
                        🌉 Broen (førnutid)
                    </button>
                </div>
                <div id="sorter-feedback" style="display: none; margin-top: 0.8rem; font-size: 0.9rem; font-weight: 600;"></div>
            `;

            const feedbackEl = activeArea.querySelector('#sorter-feedback');

            activeArea.querySelector('#btn-pick-punkt').onclick = () => checkSorterChoice('punkt', currentItem, feedbackEl);
            activeArea.querySelector('#btn-pick-bro').onclick = () => checkSorterChoice('bro', currentItem, feedbackEl);

            containerBox.appendChild(activeArea);
        } else {
            const doneArea = document.createElement('div');
            doneArea.className = 'sorter-active-area';
            doneArea.innerHTML = `
                <div style="color: #4ade80; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">
                    Alle 12 tidsudtryk er placeret korrekt!
                </div>
                <button class="task-next-btn" id="btn-restart-sorter">Prøv igen 🔄</button>
            `;
            doneArea.querySelector('#btn-restart-sorter').onclick = () => {
                remainingMarkers = [...markers].sort(() => Math.random() - 0.5);
                punktList = [];
                broList = [];
                renderSorter();
            };
            containerBox.appendChild(doneArea);
        }

        // Kasserne nederst
        const bucketsGrid = document.createElement('div');
        bucketsGrid.className = 'sorter-buckets-grid';
        bucketsGrid.innerHTML = `
            <div class="sorter-bucket bucket-punkt">
                <div class="bucket-title" style="color: #f87171;">
                    <span>📍</span>
                    <span>Punktet (datid)</span>
                </div>
                <div class="bucket-sub">Afsluttet tidspunkt (i går, for en time siden...)</div>
                <div class="bucket-chips-flow">
                    ${punktList.map(w => `<span class="placed-badge placed-punkt">${w}</span>`).join('')}
                </div>
            </div>

            <div class="sorter-bucket bucket-bro">
                <div class="bucket-title" style="color: #fbbf24;">
                    <span>🌉</span>
                    <span>Broen (førnutid)</span>
                </div>
                <div class="bucket-sub">Forbindelse til nu (indtil nu, allerede, aldrig...)</div>
                <div class="bucket-chips-flow">
                    ${broList.map(w => `<span class="placed-badge placed-bro">${w}</span>`).join('')}
                </div>
            </div>
        `;

        containerBox.appendChild(bucketsGrid);
        sorterPanel.appendChild(containerBox);
    }

    function checkSorterChoice(chosen, item, feedbackEl) {
        if (chosen === item.target) {
            feedbackEl.style.display = 'block';
            feedbackEl.style.color = '#4ade80';
            feedbackEl.textContent = `Korrekt! "${item.word}" hører til ${chosen === 'punkt' ? 'punktet' : 'broen'}.`;

            if (chosen === 'punkt') punktList.push(item.word);
            else broList.push(item.word);

            remainingMarkers.shift();
            setTimeout(() => renderSorter(), 550);
        } else {
            feedbackEl.style.display = 'block';
            feedbackEl.style.color = '#f87171';
            feedbackEl.textContent = `Ikke helt. "${item.word}" ${chosen === 'punkt' ? 'hører til førnutid (broen)' : 'hører til datid (punktet)'}.`;
        }
    }

    renderSorter();

    // Fanestyring
    function switchTab(tabId) {
        activeTabId = tabId;
        navTabs.querySelectorAll('.pob-nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        panelsContainer.innerHTML = '';
        if (tabId === 'tab_concept') {
            panelsContainer.appendChild(conceptPanel);
        } else if (tabId === 'tab_duels') {
            panelsContainer.appendChild(duelsPanel);
        } else if (tabId === 'tab_quiz') {
            panelsContainer.appendChild(quizPanel);
        } else if (tabId === 'tab_sorter') {
            panelsContainer.appendChild(sorterPanel);
        }
    }

    // Interaktive klik fra SVG
    const svgPunkt = timelineCard.querySelector('#svg-punkt');
    if (svgPunkt) {
        svgPunkt.onclick = () => {
            switchTab('tab_concept');
            window.scrollTo({ top: timelineCard.offsetTop + 180, behavior: 'smooth' });
        };
    }
    const svgBro = timelineCard.querySelector('#svg-bro');
    if (svgBro) {
        svgBro.onclick = () => {
            switchTab('tab_concept');
            window.scrollTo({ top: timelineCard.offsetTop + 180, behavior: 'smooth' });
        };
    }

    // Start på fane 1
    switchTab('tab_concept');

    container.appendChild(viewContainer);
}
