import { getTranslation } from '../utils/i18n.js';

/**
 * PunktetOgBroenView - Nytænkt flade til:
 * "Datid vs. Førnutid (Punktet & Broen)"
 * 
 * Bevarer den klassiske pædagogiske metafor, men illustrerer den med:
 *  1. 🧭 Interaktiv SVG Tidslinje (Punktet vs. Broen)
 *  2. ⚖️ Direkte Dueller (Sammenlign Punkt vs. Bro i samme situation)
 *  3. 🎯 Tids-Detektiven (10 interaktive opgaver med pædagogisk feedback og TTS)
 *  4. ⏱️ Tidsmarkør-Sortereren (Punkt-ord vs. Bro-ord)
 */
export function renderPunktetOgBroenView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container punktet-broen-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.flexWrap = 'wrap';
    topBar.style.gap = '0.8rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    const returnTarget = extraData.from || 'dagens_opgave';
    backBtn.onclick = () => navigateFn(returnTarget);
    topBar.appendChild(backBtn);

    const verbHubBtn = document.createElement('button');
    verbHubBtn.className = 'back-btn';
    verbHubBtn.style.background = 'rgba(239, 68, 68, 0.15)';
    verbHubBtn.style.borderColor = '#ef4444';
    verbHubBtn.style.color = '#f87171';
    verbHubBtn.innerHTML = `🏃 Se Top 100 Verber ➔`;
    verbHubBtn.onclick = () => navigateFn('top100_verber');
    topBar.appendChild(verbHubBtn);

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
        .punktet-broen-view {
            max-width: 1150px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .pob-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .pob-hero h1 {
            font-size: 2.5rem;
            font-weight: 900;
            margin-bottom: 0.8rem;
            background: linear-gradient(135deg, #ef4444, #f59e0b, #38bdf8, #10b981);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .pob-hero p {
            color: #cbd5e1;
            font-size: 1.15rem;
            max-width: 800px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }
        .pob-badges {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .pob-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1.2rem;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.95rem;
            border-width: 1.5px;
            border-style: solid;
        }
        .pill-punkt { background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #f87171; }
        .pill-bro { background: rgba(245, 158, 11, 0.15); border-color: #f59e0b; color: #fbbf24; }

        /* SVG Timeline Visual Stage */
        .timeline-stage {
            background: #0f172a;
            border: 2px solid rgba(255, 255, 255, 0.12);
            border-radius: 24px;
            padding: 1.5rem;
            margin-bottom: 2.2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            position: relative;
            overflow: hidden;
        }
        .stage-caption {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
            font-size: 0.85rem;
            color: #94a3b8;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 0.8rem;
            flex-wrap: wrap;
            gap: 0.8rem;
        }

        /* Tabs Menu */
        .pob-tabs-menu {
            display: flex;
            gap: 0.6rem;
            margin: 2rem 0;
            flex-wrap: wrap;
            background: rgba(30, 41, 59, 0.7);
            padding: 0.5rem;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .pob-tab-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 0.75rem 1.3rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .pob-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.06);
        }
        .pob-tab-btn.active {
            background: #f59e0b;
            color: #0f172a;
            font-weight: 900;
            box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);
        }

        /* Compass / Concept Cards */
        .pob-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            margin-bottom: 2.5rem;
        }
        .concept-card {
            background: var(--card-bg, #1e293b);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
        }
        .concept-card:hover {
            transform: translateY(-4px);
        }
        .card-punkt { border-color: rgba(239, 68, 68, 0.4); }
        .card-punkt:hover { border-color: #ef4444; box-shadow: 0 15px 35px rgba(239, 68, 68, 0.25); }
        .card-bro { border-color: rgba(245, 158, 11, 0.4); }
        .card-bro:hover { border-color: #f59e0b; box-shadow: 0 15px 35px rgba(245, 158, 11, 0.25); }

        .concept-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .concept-icon-wrap {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.2rem;
            background: rgba(255, 255, 255, 0.05);
        }
        .concept-title h3 {
            font-size: 1.6rem;
            font-weight: 800;
            margin: 0 0 0.2rem;
        }
        .concept-title span {
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .formula-box {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.8rem 1rem;
            margin-bottom: 1.2rem;
            font-family: monospace;
            font-size: 1.05rem;
            color: #38bdf8;
            font-weight: 700;
        }
        .concept-text {
            color: #e2e8f0;
            font-size: 0.98rem;
            line-height: 1.6;
            margin-bottom: 1.2rem;
        }
        .concept-bullets {
            list-style: none;
            padding: 0;
            margin: 0 0 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.7rem;
            flex-grow: 1;
        }
        .concept-bullets li {
            font-size: 0.92rem;
            color: #cbd5e1;
            display: flex;
            align-items: flex-start;
            gap: 0.6rem;
            line-height: 1.45;
        }
        .marker-tag-list {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-top: 0.5rem;
        }
        .marker-tag {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.25rem 0.6rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 700;
            color: #f1f5f9;
        }

        /* Duels Section */
        .duels-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 2.5rem;
        }
        .duel-card {
            background: var(--card-bg, #1e293b);
            border: 1.5px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1.8rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        }
        .duel-title {
            font-size: 1.3rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 1.2rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .duel-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.2rem;
        }
        .duel-side {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.2rem;
            border-left: 4px solid #ef4444;
        }
        .duel-side.side-bro {
            border-left-color: #f59e0b;
        }
        .duel-side-badge {
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.4rem;
        }
        .duel-sentence {
            font-size: 1.15rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.5rem;
            line-height: 1.4;
        }
        .duel-meaning {
            font-size: 0.9rem;
            color: #94a3b8;
            line-height: 1.5;
        }

        /* Quiz / Detective Section */
        .detective-card {
            background: var(--card-bg, #1e293b);
            border: 2px solid rgba(255, 255, 255, 0.12);
            border-radius: 24px;
            padding: 2.2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
        }
        .det-counter {
            display: inline-block;
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid #f59e0b;
            color: #fbbf24;
            padding: 0.35rem 0.9rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            margin-bottom: 1.2rem;
        }
        .det-sentence-box {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 18px;
            padding: 1.6rem 1.8rem;
            font-size: 1.35rem;
            font-weight: 600;
            line-height: 1.6;
            margin-bottom: 1.2rem;
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .det-audio-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #38bdf8;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all 0.2s ease;
        }
        .det-audio-btn:hover {
            background: rgba(56, 189, 248, 0.25);
            transform: scale(1.1);
        }
        .det-hint-box {
            color: #38bdf8;
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .det-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.2rem;
            margin-bottom: 1.5rem;
        }
        .det-opt-btn {
            background: rgba(15, 23, 42, 0.85);
            border: 2px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            padding: 1.2rem;
            color: white;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.35rem;
            text-align: center;
        }
        .det-opt-btn:hover {
            border-color: #38bdf8;
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }
        .det-opt-title {
            font-size: 1.35rem;
            font-weight: 900;
        }
        .det-opt-meta {
            font-size: 0.82rem;
            color: #94a3b8;
            font-weight: 700;
        }
        .det-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.5) !important;
        }
        .det-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.2) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
            opacity: 0.6;
        }
        .det-feedback-box {
            margin-top: 1.2rem;
            padding: 1.4rem;
            border-radius: 16px;
            animation: fadeIn 0.3s ease;
        }
        .det-next-btn {
            background: linear-gradient(135deg, #f59e0b, #ef4444);
            color: white;
            border: none;
            padding: 0.9rem 2.2rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 800;
            cursor: pointer;
            margin-top: 1.2rem;
            transition: all 0.25s ease;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
        }
        .det-next-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(245, 158, 11, 0.6);
        }

        /* Marker Sorter Section */
        .sorter-stage {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-bottom: 1.8rem;
        }
        .sorter-bucket {
            background: #0f172a;
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 1.5rem;
            min-height: 220px;
            display: flex;
            flex-direction: column;
        }
        .bucket-punkt { border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.05); }
        .bucket-bro { border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.05); }
        .bucket-header {
            font-size: 1.2rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .bucket-items {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            flex-grow: 1;
            align-content: flex-start;
        }
        .marker-pool {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            justify-content: center;
        }
        .pool-chip {
            background: #1e293b;
            border: 1.5px solid rgba(255, 255, 255, 0.2);
            color: #f8fafc;
            padding: 0.5rem 1rem;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
        }
        .pool-chip:hover {
            border-color: #38bdf8;
            transform: scale(1.05);
            background: #334155;
        }
        .placed-chip {
            padding: 0.4rem 0.8rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 700;
            color: white;
            animation: fadeIn 0.2s ease;
        }
        .placed-punkt { background: #ef4444; }
        .placed-bro { background: #f59e0b; color: #0f172a; }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'pob-hero';
    hero.innerHTML = `
        <h1>🌉 Datid vs. Førnutid: Punktet & Broen</h1>
        <p>Hvornår slutter fortiden, og hvornår rækker den ind i nutiden? Lær den gyldne regel om det lukkede punkt i datid over for broen, der forbinder fortid og nu.</p>
        <div class="pob-badges">
            <span class="pob-pill pill-punkt">📍 PUNKTET (Datid) = Afsluttet tid • Lukkede begivenheder</span>
            <span class="pob-pill pill-bro">🌉 BROEN (Førnutid) = Forbinder til nu • Erfaring & resultat</span>
        </div>
    `;
    viewContainer.appendChild(hero);

    // ==========================================================
    // --- INTERAKTIV SVG TIDSLINJE (Visuelt fundament) ---
    // ==========================================================
    const timelineStage = document.createElement('div');
    timelineStage.className = 'timeline-stage';
    timelineStage.innerHTML = `
        <svg viewBox="0 0 950 320" width="100%" height="auto" style="display: block; max-height: 380px;" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Gradients -->
                <linearGradient id="timeAxisGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#475569" />
                    <stop offset="70%" stop-color="#64748b" />
                    <stop offset="100%" stop-color="#38bdf8" />
                </linearGradient>
                <linearGradient id="bridgeArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8" />
                    <stop offset="50%" stop-color="#fbbf24" stop-opacity="1" />
                    <stop offset="100%" stop-color="#34d399" stop-opacity="0.9" />
                </linearGradient>
                <linearGradient id="bridgeFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25" />
                    <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.0" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            <!-- Bagtæppe / Zone-opdeling -->
            <rect x="20" y="20" width="600" height="280" rx="16" fill="rgba(255,255,255,0.02)" />
            <text x="40" y="50" fill="#64748b" font-size="13" font-weight="800" letter-spacing="1">FORTIDEN (TIDSLINJE)</text>
            
            <rect x="640" y="20" width="290" height="280" rx="16" fill="rgba(56,189,248,0.04)" stroke="rgba(56,189,248,0.2)" stroke-dasharray="4" />
            <text x="660" y="50" fill="#38bdf8" font-size="13" font-weight="800" letter-spacing="1">NUTIDEN (DET LEVENDE NU)</text>

            <!-- Tidsaksen -->
            <line x1="50" y1="210" x2="890" y2="210" stroke="url(#timeAxisGrad)" stroke-width="4" stroke-linecap="round" />
            <polygon points="895,210 880,203 880,217" fill="#38bdf8" />
            
            <!-- Tidslinje markeringer -->
            <text x="60" y="235" fill="#94a3b8" font-size="12">Flere år siden</text>
            <text x="250" y="235" fill="#94a3b8" font-size="12">Sidste år</text>
            <text x="450" y="235" fill="#94a3b8" font-size="12">I går</text>

            <!-- ================= PUNKTET (DATID) ================= -->
            <g id="svg-point-group" style="cursor: pointer;">
                <!-- Afspærring / STOP linje til nutiden -->
                <line x1="520" y1="140" x2="520" y2="250" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" opacity="0.6" />
                <rect x="495" y="115" width="50" height="22" rx="6" fill="#ef4444" opacity="0.2" />
                <text x="520" y="130" fill="#f87171" font-size="10" font-weight="800" text-anchor="middle">LUKKET</text>

                <!-- Nål og punkt på tidslinjen -->
                <circle cx="280" cy="210" r="14" fill="#ef4444" filter="url(#glow)" />
                <circle cx="280" cy="210" r="7" fill="#ffffff" />
                
                <!-- Punkt label -->
                <rect x="180" y="120" width="200" height="55" rx="12" fill="#1e293b" stroke="#ef4444" stroke-width="2" />
                <text x="280" y="142" fill="#f87171" font-size="14" font-weight="900" text-anchor="middle">📍 PUNKTET (Datid)</text>
                <text x="280" y="162" fill="#cbd5e1" font-size="11" text-anchor="middle">Afsluttet tid • f.eks. "boede", "gik"</text>
                <line x1="280" y1="175" x2="280" y2="196" stroke="#ef4444" stroke-width="2" />

                <!-- Tidsmarkører for punktet -->
                <text x="280" y="265" fill="#fca5a5" font-size="11" font-weight="700" text-anchor="middle">"I 2018" • "I går" • "For en time siden"</text>
            </g>

            <!-- ================= BROEN (FØRNUTID) ================= -->
            <g id="svg-bridge-group" style="cursor: pointer;">
                <!-- Broens bue fra fortid (x=380) til nutid (x=770) -->
                <path d="M 380,210 Q 575,60 770,210" fill="url(#bridgeFillGrad)" />
                <path d="M 380,210 Q 575,60 770,210" fill="none" stroke="url(#bridgeArcGrad)" stroke-width="6" stroke-linecap="round" filter="url(#glow)" />
                
                <!-- Broens pyloner / kabler -->
                <line x1="480" y1="140" x2="480" y2="210" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.7" />
                <line x1="575" y1="110" x2="575" y2="210" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,3" opacity="0.8" />
                <line x1="670" y1="140" x2="670" y2="210" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.7" />

                <!-- Bro start-anker i fortiden -->
                <circle cx="380" cy="210" r="8" fill="#f59e0b" />
                <text x="380" y="235" fill="#f59e0b" font-size="11" font-weight="800" text-anchor="middle">Begyndte dengang</text>

                <!-- Bro slut-anker i NUTIDEN -->
                <circle cx="770" cy="210" r="14" fill="#38bdf8" filter="url(#glow)" />
                <circle cx="770" cy="210" r="7" fill="#ffffff" />
                <text x="770" y="240" fill="#38bdf8" font-size="14" font-weight="900" text-anchor="middle">NU 📍</text>
                <text x="770" y="258" fill="#94a3b8" font-size="11" text-anchor="middle">Gælder lige nu</text>

                <!-- Bro Banner / Titel -->
                <rect x="475" y="70" width="200" height="50" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
                <text x="575" y="92" fill="#fbbf24" font-size="14" font-weight="900" text-anchor="middle">🌉 BROEN (Førnutid)</text>
                <text x="575" y="110" fill="#cbd5e1" font-size="11" text-anchor="middle">har boet • er kommet • har set</text>
            </g>
        </svg>

        <div class="stage-caption">
            <span>💡 <strong>Tip:</strong> Tryk på <em>Punktet</em> eller <em>Broen</em> i tegningen ovenfor for at læse forskellen.</span>
            <span>📍 Datid = Lukket tidspunkt | 🌉 Førnutid = Har forbindelse til NU</span>
        </div>
    `;
    viewContainer.appendChild(timelineStage);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'pob-tabs-menu';
    const tabs = [
        { id: 'tab_concept', label: '🧭 Hovedreglen & De 3 Bropiller' },
        { id: 'tab_duels', label: '⚖️ Direkte Dueller (Sammenlign)' },
        { id: 'tab_quiz', label: '🎯 Tids-Detektiven (10 opgaver)' },
        { id: 'tab_sorter', label: '⏱️ Tidsmarkør-Sortereren' }
    ];

    let activeTab = 'tab_concept';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `pob-tab-btn ${t.id === activeTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.textContent = t.label;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    // ==========================================================
    // --- FANE 1: 🧭 HOVEDREGLEN & DE 3 BROPILLER ---
    // ==========================================================
    const conceptPanel = document.createElement('div');
    conceptPanel.id = 'panel_concept';
    conceptPanel.innerHTML = `
        <div class="pob-cards-grid">
            <!-- 1. PUNKTET -->
            <div class="concept-card card-punkt">
                <div class="concept-header">
                    <div class="concept-icon-wrap" style="color: #f87171;">📍</div>
                    <div class="concept-title">
                        <h3 style="color: #f87171;">PUNKTET</h3>
                        <span style="color: #ef4444;">Datid (Præteritum)</span>
                    </div>
                </div>
                <div class="formula-box" style="border-color: rgba(239, 68, 68, 0.4); color: #fca5a5;">
                    FORMEL: Datidsform (gik, boede, drak, var, kom)
                </div>
                <div class="concept-text">
                    Punktet bruges, når handlingen skete på et <strong>bestemt, afsluttet tidspunkt</strong> i fortiden. Tidsvinduet er smækket i, og handlingen har sluppet nuet.
                </div>
                <ul class="concept-bullets">
                    <li>📅 <strong>Tiden er lukket:</strong> Dagen eller perioden er overstået (i går, sidste år).</li>
                    <li>🕰️ <strong>Præcist tidspunkt:</strong> "Hvornår skete det?" – Kl. 8, i 2015, for to timer siden.</li>
                    <li>🎬 <strong>Lukket historie:</strong> Handlinger i en fortælling, der følger hinanden i fortiden.</li>
                </ul>
                <div style="margin-top: auto;">
                    <div style="font-size: 0.82rem; font-weight: 800; color: #f87171; text-transform: uppercase; margin-bottom: 0.4rem;">
                        📍 Typiske Punkt-markører (kræver datid):
                    </div>
                    <div class="marker-tag-list">
                        <span class="marker-tag">i går</span>
                        <span class="marker-tag">i 2018</span>
                        <span class="marker-tag">sidste uge</span>
                        <span class="marker-tag">for ... siden</span>
                        <span class="marker-tag">dengang</span>
                        <span class="marker-tag">da jeg var barn</span>
                    </div>
                </div>
            </div>

            <!-- 2. BROEN -->
            <div class="concept-card card-bro">
                <div class="concept-header">
                    <div class="concept-icon-wrap" style="color: #fbbf24;">🌉</div>
                    <div class="concept-title">
                        <h3 style="color: #fbbf24;">BROEN</h3>
                        <span style="color: #f59e0b;">Førnutid (Perfektum)</span>
                    </div>
                </div>
                <div class="formula-box" style="border-color: rgba(245, 158, 11, 0.4); color: #fde68a;">
                    FORMEL: har / er + kort tillægsform (har boet, er kommet)
                </div>
                <div class="concept-text">
                    Broen spænder fra fortiden og hviler <strong>lige midt i nutiden</strong>. Vi bruger den, når der er en direkte forbindelse mellem fortiden og NU.
                </div>
                <ul class="concept-bullets">
                    <li>🌟 <strong>1. Erfaring indtil nu:</strong> "Jeg har set den film 3 gange (i mit liv indtil nu)."</li>
                    <li>⏳ <strong>2. Stadig i gang:</strong> "Jeg har boet her i 5 år (og jeg bor her stadig i dag)."</li>
                    <li>⚡ <strong>3. Friskt resultat i nuet:</strong> "Han er lige kommet (han står foran mig nu)."</li>
                </ul>
                <div style="margin-top: auto;">
                    <div style="font-size: 0.82rem; font-weight: 800; color: #fbbf24; text-transform: uppercase; margin-bottom: 0.4rem;">
                        🌉 Typiske Bro-markører (kræver førnutid):
                    </div>
                    <div class="marker-tag-list">
                        <span class="marker-tag">lige</span>
                        <span class="marker-tag">allerede</span>
                        <span class="marker-tag">endnu (ikke)</span>
                        <span class="marker-tag">nogensinde</span>
                        <span class="marker-tag">aldrig</span>
                        <span class="marker-tag">i dag / i år</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // ==========================================================
    // --- FANE 2: ⚖️ DIREKTE DUELLER ---
    // ==========================================================
    const duelsPanel = document.createElement('div');
    duelsPanel.id = 'panel_duels';

    const duels = [
        {
            topic: '🇪🇸 Hvor bor du? (Spanien)',
            icon: '🏠',
            punkt: {
                sentence: 'Jeg boede i Spanien i to år.',
                meaning: '📍 PUNKTET: Det er afsluttet fortid. Jeg bor IKKE i Spanien i dag (jeg bor måske i Danmark nu).'
            },
            bro: {
                sentence: 'Jeg har boet i Spanien i to år.',
                meaning: '🌉 BROEN: Handlingen startede for 2 år siden og fortsætter i dag – jeg bor stadig i Spanien!'
            }
        },
        {
            topic: '☕ Kaffepausen (Koffein i blodet)',
            icon: '☕',
            punkt: {
                sentence: 'Vi drak kaffe for en time siden.',
                meaning: '📍 PUNKTET: "For en time siden" låser handlingen fast til et bestemt tidspunkt i fortiden.'
            },
            bro: {
                sentence: 'Vi har drukket tre kopper kaffe i dag.',
                meaning: '🌉 BROEN: Dagen i dag er ikke slut endnu, og vi er stadig fulde af energi lige nu!'
            }
        },
        {
            topic: '🔑 Hoveddøren (Hvor er nøglen?)',
            icon: '🔑',
            punkt: {
                sentence: 'I går tabte jeg mine nøgler (men naboen fandt dem).',
                meaning: '📍 PUNKTET: Handlingen skete i går, og problemet blev løst. Ingen konsekvens i nuet.'
            },
            bro: {
                sentence: 'Hjælp, jeg har tabt mine nøgler!',
                meaning: '🌉 BROEN: Handlingen skete for lidt siden, og konsekvensen gælder NU: Jeg kan ikke komme ind ad døren!'
            }
        },
        {
            topic: '🎬 Biografen (Oplevelse)',
            icon: '🍿',
            punkt: {
                sentence: 'I fredags var jeg i biografen.',
                meaning: '📍 PUNKTET: I fredags er et afsluttet tidspunkt. Fokus er på hvornår det skete.'
            },
            bro: {
                sentence: 'Jeg har været i biografen mange gange.',
                meaning: '🌉 BROEN: Min samlede livserfaring frem til dette øjeblik.'
            }
        }
    ];

    duelsPanel.innerHTML = `
        <div class="duels-container">
            ${duels.map(d => `
                <div class="duel-card">
                    <div class="duel-title">
                        <span>${d.icon}</span>
                        <span>${d.topic}</span>
                    </div>
                    <div class="duel-grid">
                        <div class="duel-side">
                            <div class="duel-side-badge" style="color: #f87171;">📍 Punktet (Datid)</div>
                            <div class="duel-sentence">"${d.punkt.sentence}"</div>
                            <div class="duel-meaning">${d.punkt.meaning}</div>
                        </div>
                        <div class="duel-side side-bro">
                            <div class="duel-side-badge" style="color: #fbbf24;">🌉 Broen (Førnutid)</div>
                            <div class="duel-sentence">"${d.bro.sentence}"</div>
                            <div class="duel-meaning">${d.bro.meaning}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // ==========================================================
    // --- FANE 3: 🎯 TIDS-DETEKTIVEN (Quiz) ---
    // ==========================================================
    const quizPanel = document.createElement('div');
    quizPanel.id = 'panel_quiz';

    const detectiveTasks = [
        {
            sentenceBefore: "I 2012",
            sentenceAfter: "familien til Danmark.",
            options: [
                { text: "flyttede", type: "punkt", label: "📍 Punktet (Datid)" },
                { text: "er flyttet", type: "bro", label: "🌉 Broen (Førnutid)" }
            ],
            correct: "flyttede",
            hint: '"I 2012" er et bestemt årstal/tidspunkt i fortiden.',
            expl: '"I 2012" er et lukket tidspunkt i fortiden. Når vi har et præcist årstal, skal vi ALTID bruge Punktet (datid = flyttede).'
        },
        {
            sentenceBefore: "Hvor er Mads? – Han",
            sentenceAfter: "lige ind ad døren.",
            options: [
                { text: "kom", type: "punkt", label: "📍 Punktet (Datid)" },
                { text: "er kommet", type: "bro", label: "🌉 Broen (Førnutid)" }
            ],
            correct: "er kommet",
            hint: '"Lige" viser, at handlingen er frisk og har direkte betydning nu.',
            expl: '"Lige" bygger en direkte bro til nuet (han står her nu). Derfor bruges Broen (førnutid = er kommet).'
        },
        {
            sentenceBefore: "Jeg",
            sentenceAfter: "tre kopper kaffe for en time siden.",
            options: [
                { text: "drak", type: "punkt", label: "📍 Punktet (Datid)" },
                { text: "har drukket", type: "bro", label: "🌉 Broen (Førnutid)" }
            ],
            correct: "drak",
            hint: 'Tidsudtryk med "for ... siden" peger altid på et afsluttet punkt.',
            expl: '"For en time siden" afslutter handlingen på et specifikt tidspunkt. Derfor skal det være Punktet (datid = drak).'
        },
        {
            sentenceBefore: "Sofie",
            sentenceAfter: "i denne lejlighed i fem år, og hun elsker stadig at bo her.",
            options: [
                { text: "boede", type: "punkt", label: "📍 Punktet (Datid)" },
                { text: "har boet", type: "bro", label: "🌉 Broen (Førnutid)" }
            ],
            correct: "har boet",
            hint: 'Handlingen fortsætter stadig lige nu.',
            expl: 'Da hun stadig bor i lejligheden i dag, skal vi bygge Broen til nutiden (førnutid = har boet).'
        },
        {
            sentenceBefore: "I går",
            sentenceAfter: "jeg min gamle ven ved bussen.",
            options: [
                { text: "mødte", type: "punkt", label: "📍 Punktet (Datid)" },
                { text: "har mødt", type: "bro", label: "🌉 Broen (Førnutid)" }
            ],
            correct: "mødte",
            hint: '"I går" er en afsluttet dag i fortiden.',
            expl: '"I går" er et afsluttet tidsrum. Punktet (datid = mødte) er det eneste rigtige.'
        },
        {
            sentenceBefore: "Jeg",
            sentenceAfter: "aldrig prøvet at køre i metroen i København.",
            options: [
                { text: "har", type: "bro", label: "🌉 Broen (Førnutid)" },
                { text: "havde", type: "punkt", label: "📍 Punktet (Datid)" }
            ],
            correct: "har",
            hint: '"Aldrig" handler om hele din livserfaring frem til i dag.',
            expl: '"Aldrig" og "nogensinde" beskriver erfaringer i hele dit liv indtil nu. Derfor bygges Broen (førnutid = har aldrig prøvet).'
        },
        {
            sentenceBefore: "Toget",
            sentenceAfter: "allerede stationen, så vi må vente på det næste.",
            options: [
                { text: "forlod", type: "punkt", label: "📍 Punktet (Datid)" },
                { text: "har forladt", type: "bro", label: "🌉 Broen (Førnutid)" }
            ],
            correct: "har forladt",
            hint: '"Allerede" viser konsekvensen for os i dette øjeblik.',
            expl: '"Allerede" kobler togstationens afgang med vores situation lige nu. Derfor bruges Broen (førnutid = har forladt).'
        },
        {
            sentenceBefore: "Da jeg var barn,",
            sentenceAfter: "jeg altid til fodbold om onsdagen.",
            options: [
                { text: "gik", type: "punkt", label: "📍 Punktet (Datid)" },
                { text: "er gået", type: "bro", label: "🌉 Broen (Førnutid)" }
            ],
            correct: "gik",
            hint: '"Da jeg var barn" er en helt afsluttet periode i fortiden.',
            expl: 'Barndommen er forbi og lukket = Punktet (datid = gik).'
        },
        {
            sentenceBefore: "Hvem",
            sentenceAfter: "denne flotte tegning på tavlen?",
            options: [
                { text: "tegnede", type: "punkt", label: "📍 Punktet (Datid)" },
                { text: "har tegnet", type: "bro", label: "🌉 Broen (Førnutid)" }
            ],
            correct: "har tegnet",
            hint: 'Tegningen er synlig på tavlen lige her og nu.',
            expl: 'Tegningen ses fysisk på tavlen lige nu som et friskt resultat = Broen (førnutid = har tegnet).'
        },
        {
            sentenceBefore: "I morges kl. 8:00",
            sentenceAfter: "vækkeuret højlydt.",
            options: [
                { text: "ringede", type: "punkt", label: "📍 Punktet (Datid)" },
                { text: "har ringet", type: "bro", label: "🌉 Broen (Førnutid)" }
            ],
            correct: "ringede",
            hint: 'Et helt specifikt klokkeslæt i morges.',
            expl: 'Et præcist klokkeslæt i fortiden låser handlingen til Punktet (datid = ringede).'
        }
    ];

    let currDetIdx = 0;
    const detectiveCard = document.createElement('div');
    detectiveCard.className = 'detective-card';

    function renderDetectiveTask() {
        detectiveCard.innerHTML = '';
        const task = detectiveTasks[currDetIdx];

        const counter = document.createElement('div');
        counter.className = 'det-counter';
        counter.textContent = `Opgave ${currDetIdx + 1} af ${detectiveTasks.length}`;
        detectiveCard.appendChild(counter);

        const sentenceBox = document.createElement('div');
        sentenceBox.className = 'det-sentence-box';
        sentenceBox.innerHTML = `
            <span>${task.sentenceBefore} ________ ${task.sentenceAfter}</span>
            <button class="det-audio-btn" title="Lyt til sætningen" id="btn-audio-det">🔊</button>
        `;
        detectiveCard.appendChild(sentenceBox);

        sentenceBox.querySelector('#btn-audio-det').onclick = () => {
            speakDanish(`${task.sentenceBefore} ${task.correct} ${task.sentenceAfter}`);
        };

        const hintBox = document.createElement('div');
        hintBox.className = 'det-hint-box';
        hintBox.innerHTML = `<span>💡 Ledetråd:</span> ${task.hint}`;
        detectiveCard.appendChild(hintBox);

        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'det-options-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'det-feedback-box';
        feedbackBox.style.display = 'none';

        task.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'det-opt-btn';
            btn.innerHTML = `
                <span class="det-opt-title">${opt.text}</span>
                <span class="det-opt-meta">${opt.label}</span>
            `;

            btn.onclick = () => {
                const isCorrect = (opt.text.toLowerCase() === task.correct.toLowerCase());
                optionsGrid.querySelectorAll('.det-opt-btn').forEach(b => b.style.pointerEvents = 'none');

                if (isCorrect) {
                    btn.classList.add('correct');
                    sentenceBox.querySelector('span').innerHTML = `${task.sentenceBefore} <strong style="color: #4ade80; text-decoration: underline;">${opt.text}</strong> ${task.sentenceAfter}`;
                    feedbackBox.style.display = 'block';
                    feedbackBox.style.background = 'rgba(34, 197, 94, 0.15)';
                    feedbackBox.style.border = '1px solid #22c55e';
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.4rem;">
                            🎉 Rigtigt svar!
                        </div>
                        <div style="color: #cbd5e1; font-size: 1rem; line-height: 1.5;">
                            ${task.expl}
                        </div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optionsGrid.querySelectorAll('.det-opt-btn').forEach(b => {
                        if (b.querySelector('.det-opt-title').textContent.toLowerCase() === task.correct.toLowerCase()) {
                            b.classList.add('correct');
                        }
                    });
                    sentenceBox.querySelector('span').innerHTML = `${task.sentenceBefore} <strong style="color: #4ade80; text-decoration: underline;">${task.correct}</strong> ${task.sentenceAfter}`;
                    feedbackBox.style.display = 'block';
                    feedbackBox.style.background = 'rgba(239, 68, 68, 0.15)';
                    feedbackBox.style.border = '1px solid #ef4444';
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.4rem;">
                            Ikke helt – det rigtige valg er "${task.correct}"
                        </div>
                        <div style="color: #cbd5e1; font-size: 1rem; line-height: 1.5;">
                            ${task.expl}
                        </div>
                    `;
                }

                const nextBtn = document.createElement('button');
                nextBtn.className = 'det-next-btn';
                nextBtn.textContent = currDetIdx < detectiveTasks.length - 1 ? 'Næste opgave ➔' : 'Prøv forfra 🔄';
                nextBtn.onclick = () => {
                    currDetIdx = (currDetIdx + 1) % detectiveTasks.length;
                    renderDetectiveTask();
                };
                feedbackBox.appendChild(nextBtn);
            };

            optionsGrid.appendChild(btn);
        });

        detectiveCard.appendChild(optionsGrid);
        detectiveCard.appendChild(feedbackBox);
    }

    renderDetectiveTask();
    quizPanel.appendChild(detectiveCard);

    // ==========================================================
    // --- FANE 4: ⏱️ TIDSMARKØR-SORTEREREN ---
    // ==========================================================
    const sorterPanel = document.createElement('div');
    sorterPanel.id = 'panel_sorter';

    const markersToCategorize = [
        { word: 'i går', target: 'punkt' },
        { word: 'lige', target: 'bro' },
        { word: 'i 2015', target: 'punkt' },
        { word: 'for en uge siden', target: 'punkt' },
        { word: 'allerede', target: 'bro' },
        { word: 'sidste sommer', target: 'punkt' },
        { word: 'aldrig', target: 'bro' },
        { word: 'i morges kl. 7', target: 'punkt' },
        { word: 'endnu ikke', target: 'bro' },
        { word: 'dengang', target: 'punkt' },
        { word: 'nogensinde', target: 'bro' },
        { word: 'siden i mandags', target: 'bro' }
    ];

    let remainingMarkers = [...markersToCategorize].sort(() => Math.random() - 0.5);
    let punktItems = [];
    let broItems = [];

    function renderSorterContent() {
        sorterPanel.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <h2 style="font-size: 1.5rem; margin-bottom: 0.4rem;">⏱️ Tidsmarkør-Sortereren: Punkt-ord eller Bro-ord?</h2>
                <p style="color: #94a3b8;">Tryk på en tidsmarkør i puljen, og vælg hvilken kasse den hører til. Så mestrer du hurtigt sprogets ledetråde!</p>
            </div>

            <div class="marker-pool" id="sorter-pool">
                ${remainingMarkers.length === 0 ? `
                    <div style="color: #4ade80; font-weight: 800; font-size: 1.2rem; padding: 0.5rem 1rem;">
                        🎉 Fantastisk! Alle tidsmarkører er korrekt sorteret!
                    </div>
                ` : remainingMarkers.map((m, idx) => `
                    <button class="pool-chip" data-idx="${idx}">${m.word}</button>
                `).join('')}
            </div>

            <div class="sorter-stage">
                <!-- Punktet Kasse -->
                <div class="sorter-bucket bucket-punkt" id="bucket-punkt-zone">
                    <div class="bucket-header" style="color: #f87171;">
                        <span>📍</span>
                        <span>Punkt-markører (Datid)</span>
                    </div>
                    <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 0.8rem;">
                        Kræver afsluttet datid (gik, så, drak...)
                    </div>
                    <div class="bucket-items" id="bucket-punkt-items">
                        ${punktItems.map(item => `
                            <span class="placed-chip placed-punkt">📍 ${item}</span>
                        `).join('')}
                    </div>
                </div>

                <!-- Broen Kasse -->
                <div class="sorter-bucket bucket-bro" id="bucket-bro-zone">
                    <div class="bucket-header" style="color: #fbbf24;">
                        <span>🌉</span>
                        <span>Bro-markører (Førnutid)</span>
                    </div>
                    <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 0.8rem;">
                        Kræver førnutid med forbindelse til nu (har set, er kommet...)
                    </div>
                    <div class="bucket-items" id="bucket-bro-items">
                        ${broItems.map(item => `
                            <span class="placed-chip placed-bro">🌉 ${item}</span>
                        `).join('')}
                    </div>
                </div>
            </div>

            ${remainingMarkers.length === 0 ? `
                <div style="text-align: center; margin-top: 1rem;">
                    <button class="det-next-btn" id="btn-reset-sorter">Prøv sorteringen igen 🔄</button>
                </div>
            ` : ''}
        `;

        if (remainingMarkers.length === 0) {
            const resetBtn = sorterPanel.querySelector('#btn-reset-sorter');
            if (resetBtn) {
                resetBtn.onclick = () => {
                    remainingMarkers = [...markersToCategorize].sort(() => Math.random() - 0.5);
                    punktItems = [];
                    broItems = [];
                    renderSorterContent();
                };
            }
        }

        // Chip click handling
        sorterPanel.querySelectorAll('.pool-chip').forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.dataset.idx, 10);
                const marker = remainingMarkers[idx];
                openSorterModal(marker, idx);
            };
        });
    }

    function openSorterModal(marker, idx) {
        // Quick modal / selection prompt
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.background = 'rgba(0, 0, 0, 0.75)';
        modal.style.backdropFilter = 'blur(6px)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.style.padding = '1.5rem';

        modal.innerHTML = `
            <div style="background: #1e293b; border: 2px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 2rem; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
                <div style="font-size: 0.85rem; color: #94a3b8; font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem;">Hvor hører tidsmarkøren til?</div>
                <div style="font-size: 1.8rem; font-weight: 900; color: #38bdf8; margin-bottom: 1.5rem;">"${marker.word}"</div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                    <button id="modal-btn-punkt" style="background: rgba(239,68,68,0.2); border: 2px solid #ef4444; color: #f87171; padding: 1.2rem; border-radius: 16px; font-weight: 800; font-size: 1rem; cursor: pointer; transition: all 0.2s;">
                        📍 PUNKTET<br><span style="font-size: 0.75rem; font-weight: 600; opacity: 0.8;">(Afsluttet Datid)</span>
                    </button>
                    <button id="modal-btn-bro" style="background: rgba(245,158,11,0.2); border: 2px solid #f59e0b; color: #fbbf24; padding: 1.2rem; border-radius: 16px; font-weight: 800; font-size: 1rem; cursor: pointer; transition: all 0.2s;">
                        🌉 BROEN<br><span style="font-size: 0.75rem; font-weight: 600; opacity: 0.8;">(Førnutid til NU)</span>
                    </button>
                </div>

                <div id="modal-feedback" style="display: none; padding: 0.8rem; border-radius: 12px; margin-bottom: 1rem; font-size: 0.95rem; font-weight: 700;"></div>
                <button id="modal-btn-close" style="background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 0.9rem;">Fortryd</button>
            </div>
        `;

        document.body.appendChild(modal);

        const feedback = modal.querySelector('#modal-feedback');
        const btnClose = modal.querySelector('#modal-btn-close');

        modal.querySelector('#modal-btn-punkt').onclick = () => submitChoice('punkt');
        modal.querySelector('#modal-btn-bro').onclick = () => submitChoice('bro');
        btnClose.onclick = () => document.body.removeChild(modal);

        function submitChoice(chosen) {
            const isCorrect = (chosen === marker.target);
            if (isCorrect) {
                feedback.style.display = 'block';
                feedback.style.background = 'rgba(34,197,94,0.2)';
                feedback.style.color = '#4ade80';
                feedback.textContent = `🎉 Korrekt! "${marker.word}" er en ${chosen === 'punkt' ? 'Punkt' : 'Bro'}-markør!`;
                
                setTimeout(() => {
                    if (chosen === 'punkt') punktItems.push(marker.word);
                    else broItems.push(marker.word);
                    remainingMarkers.splice(idx, 1);
                    document.body.removeChild(modal);
                    renderSorterContent();
                }, 700);
            } else {
                feedback.style.display = 'block';
                feedback.style.background = 'rgba(239,68,68,0.2)';
                feedback.style.color = '#f87171';
                feedback.textContent = `Ikke helt – tænk over om tiden er lukket i fortiden, eller rækker ind i nuet!`;
            }
        }
    }

    renderSorterContent();

    // Tab Switcher
    function switchTab(tabId) {
        activeTab = tabId;
        tabsMenu.querySelectorAll('.pob-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        panelsHolder.innerHTML = '';
        if (tabId === 'tab_concept') {
            panelsHolder.appendChild(conceptPanel);
        } else if (tabId === 'tab_duels') {
            panelsHolder.appendChild(duelsPanel);
        } else if (tabId === 'tab_quiz') {
            panelsHolder.appendChild(quizPanel);
        } else if (tabId === 'tab_sorter') {
            panelsHolder.appendChild(sorterPanel);
        }
    }

    // Interactive hooks from SVG
    timelineStage.querySelector('#svg-point-group').onclick = () => {
        switchTab('tab_concept');
        window.scrollTo({ top: timelineStage.offsetTop + 200, behavior: 'smooth' });
    };
    timelineStage.querySelector('#svg-bridge-group').onclick = () => {
        switchTab('tab_concept');
        window.scrollTo({ top: timelineStage.offsetTop + 200, behavior: 'smooth' });
    };

    // Initial render
    switchTab('tab_concept');

    container.appendChild(viewContainer);
}
