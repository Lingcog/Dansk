import { getTranslation, getLang } from '../utils/i18n.js';
import { formatNounLinks, attachNounLinkListeners } from '../utils/nounQuickPeekModal.js';

/**
 * AdjektiverFolelserView - Felt 4: Følelser, personlighed & relationer
 * Dækker 20 af de mest almindelige følelses- og personlighedsadjektiver på dansk (10 kontrast-par):
 * 1. Kontrast-studiet (Visuel flade i natur og fritid med 20 hotspots og modpol-kobling)
 * 2. Find modpolen (Antonym-duellen - følelser og stemninger i hverdagen)
 * 3. Synonymer & Nuancer (Følelsesmæssige nuancer)
 * 4. Barometret (Skalaer for glæde, energi, frygt, ro og venlighed)
 * 5. Kongruens-byggeren (Fælde-træning: "glad" uden -t, "træt" med -tte, og ubøjelige "bange")
 * 6. Kontekst & Historie (Hverdagssituationer fra familien, venskaber og fritid)
 */
export function renderAdjektiverFolelserView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adjektiver-fysik-view adjektiver-folelser-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('top100_adjektiver');
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
        .adjektiver-folelser-view {
            max-width: 1240px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .adj-hero-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .adj-hero-header h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #f43f5e, #ec4899, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .adj-hero-header p {
            color: #94a3b8;
            font-size: 1.1rem;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.5;
        }

        /* Tabs Navigation */
        .adj-tabs-nav {
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
        .adj-tab-btn {
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
        .adj-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.06);
        }
        .adj-tab-btn.active {
            background: #f43f5e;
            color: white;
            font-weight: 700;
            box-shadow: 0 4px 14px rgba(244, 63, 94, 0.4);
        }

        /* Panels */
        .adj-panel {
            display: none;
        }
        .adj-panel.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Canvas Stage */
        .contrast-canvas-card {
            background: #1e293b;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            margin-bottom: 2rem;
        }
        .contrast-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.9rem 1.4rem;
            background: #0f172a;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .contrast-instruction {
            color: #cbd5e1;
            font-size: 0.95rem;
            font-weight: 600;
        }
        .pure-toggle-btn {
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
        .pure-toggle-btn:hover {
            background: rgba(255, 255, 255, 0.15);
            color: white;
        }
        .pure-toggle-btn.active {
            background: #f43f5e;
            border-color: #f43f5e;
            color: white;
        }

        .contrast-split-stage {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2px;
            background: #0f172a;
            position: relative;
        }
        @media (max-width: 820px) {
            .contrast-split-stage {
                grid-template-columns: 1fr;
            }
        }
        .stage-half {
            position: relative;
            overflow: hidden;
            background: #0f172a;
        }
        .stage-half-header {
            position: absolute;
            top: 12px;
            left: 12px;
            z-index: 10;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(8px);
            padding: 0.35rem 0.85rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 700;
            border: 1px solid rgba(255, 255, 255, 0.15);
            pointer-events: none;
        }
        .stage-half-header.warm { color: #f43f5e; border-color: rgba(244, 63, 94, 0.4); }
        .stage-half-header.cool { color: #38bdf8; border-color: rgba(56, 189, 248, 0.4); }

        .stage-half img {
            width: 100%;
            height: auto;
            display: block;
            user-select: none;
        }

        /* Hotspots */
        .adj-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: rgba(244, 63, 94, 0.9);
            border: 2px solid white;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            z-index: 5;
        }
        .adj-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.22);
            background: #f43f5e;
            box-shadow: 0 0 18px rgba(244, 63, 94, 0.8);
        }
        .adj-hotspot.active {
            background: #10b981 !important;
            border-color: white !important;
            color: white !important;
            transform: translate(-50%, -50%) scale(1.3);
            box-shadow: 0 0 25px rgba(16, 185, 129, 0.9);
            z-index: 8;
        }
        .adj-hotspot.partner-active {
            background: #3b82f6 !important;
            border-color: white !important;
            color: white !important;
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
            animation: pulseBlueSky 1.6s infinite ease-in-out;
            z-index: 7;
        }
        @keyframes pulseBlueSky {
            0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.6); }
            50% { box-shadow: 0 0 24px rgba(59, 130, 246, 1); }
        }
        .pure-mode .adj-hotspot {
            display: none !important;
        }

        /* Detail Card */
        .adj-detail-card {
            background: #1e293b;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 1.8rem;
            margin-top: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
        }
        .adj-detail-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 1rem;
        }
        .adj-title-group {
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }
        .adj-main-word {
            font-size: 2rem;
            font-weight: 800;
            color: #f8fafc;
        }
        .adj-tts-btn {
            background: #f43f5e;
            border: none;
            color: white;
            padding: 0.5rem 0.9rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s ease;
        }
        .adj-tts-btn:hover {
            background: #fb7185;
            transform: scale(1.05);
        }
        .adj-modpol-pill {
            background: rgba(59, 130, 246, 0.15);
            border: 1px solid #3b82f6;
            color: #60a5fa;
            padding: 0.5rem 1.1rem;
            border-radius: 20px;
            font-size: 1rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .adj-modpol-pill:hover {
            background: rgba(59, 130, 246, 0.25);
            transform: translateY(-2px);
        }

        .adj-congruence-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
        }
        .adj-congruence-box {
            background: #0f172a;
            border: 1px solid #334155;
            padding: 1rem;
            border-radius: 14px;
        }
        .adj-congruence-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            font-weight: 800;
            color: #94a3b8;
            letter-spacing: 0.5px;
            margin-bottom: 0.4rem;
        }
        .adj-congruence-val {
            font-size: 1.15rem;
            font-weight: 700;
            color: #f8fafc;
        }
        .adj-congruence-val mark {
            background: transparent;
            color: #f43f5e;
            font-weight: 800;
        }
        .adj-example-box {
            background: rgba(244, 63, 94, 0.1);
            border-left: 4px solid #f43f5e;
            padding: 1.2rem;
            border-radius: 10px;
            font-size: 1.15rem;
            color: #e2e8f0;
            line-height: 1.5;
        }

        /* Generic Interactive Task Layouts */
        .task-card {
            max-width: 850px;
            margin: 0 auto;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 2.2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .task-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 1rem;
        }
        .task-counter {
            font-size: 0.95rem;
            font-weight: 700;
            color: #f43f5e;
        }
        .task-score {
            font-size: 0.95rem;
            color: #94a3b8;
            font-weight: 600;
        }
        .task-prompt-box {
            background: #0f172a;
            border: 1px solid #334155;
            padding: 1.4rem;
            border-radius: 16px;
            margin-bottom: 1.6rem;
            font-size: 1.3rem;
            line-height: 1.5;
            color: #f8fafc;
            text-align: center;
        }
        .task-prompt-box strong {
            color: #f43f5e;
            font-size: 1.4rem;
        }
        .task-subprompt {
            font-size: 1.1rem;
            color: #94a3b8;
            margin-top: 0.6rem;
        }
        .task-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .task-opt-btn {
            background: #0f172a;
            border: 2px solid #334155;
            color: white;
            padding: 1.1rem;
            border-radius: 14px;
            font-size: 1.15rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .task-opt-btn:hover:not(:disabled) {
            border-color: #f43f5e;
            transform: translateY(-2px);
            background: rgba(244, 63, 94, 0.1);
        }
        .task-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .task-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
        }
        .task-feedback-box {
            background: #0f172a;
            border: 1px solid #334155;
            padding: 1.3rem;
            border-radius: 14px;
            margin-top: 1.2rem;
            font-size: 1.05rem;
            line-height: 1.5;
        }
        .task-feedback-box.correct {
            border-color: #22c55e;
            color: #86efac;
        }
        .task-feedback-box.wrong {
            border-color: #ef4444;
            color: #fca5a5;
        }
        .task-next-btn {
            background: #f43f5e;
            color: white;
            border: none;
            padding: 0.85rem 1.8rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            margin-top: 1.5rem;
            display: inline-block;
            transition: all 0.2s ease;
        }
        .task-next-btn:hover {
            background: #fb7185;
            box-shadow: 0 4px 14px rgba(244, 63, 94, 0.4);
        }

        /* Grammar Guide Link Banner in Tab 5 */
        .adj-grammar-link-box {
            background: linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(168, 85, 247, 0.15));
            border: 1px solid rgba(244, 63, 94, 0.4);
            border-radius: 16px;
            padding: 1.2rem 1.5rem;
            margin-bottom: 1.8rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .adj-go-grammar-btn {
            background: #f43f5e;
            color: white;
            border: none;
            padding: 0.65rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .adj-go-grammar-btn:hover {
            background: #fb7185;
            transform: translateY(-2px);
        }
        .feedback-grammar-link {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            color: #f43f5e;
            font-weight: 700;
            margin-top: 0.6rem;
            text-decoration: underline;
            cursor: pointer;
        }
        .feedback-grammar-link:hover {
            color: #fb7185;
        }

        /* Tab 4: Barometret Specific Styles */
        .barometer-track {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #0f172a;
            border: 2px dashed #475569;
            padding: 1rem;
            border-radius: 16px;
            min-height: 80px;
            gap: 0.8rem;
            overflow-x: auto;
        }
        .barometer-slot {
            flex: 1;
            min-width: 120px;
            height: 60px;
            border: 2px solid #334155;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: #94a3b8;
            font-size: 0.95rem;
            position: relative;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .barometer-slot.filled {
            border-color: #f43f5e;
            background: rgba(244, 63, 94, 0.15);
            color: white;
            font-size: 1.05rem;
        }
        .barometer-pool {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
            justify-content: center;
            margin: 1.2rem 0;
        }
        .barometer-chip {
            background: #0f172a;
            border: 2px solid #f43f5e;
            color: white;
            padding: 0.75rem 1.3rem;
            border-radius: 20px;
            font-weight: 700;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .barometer-chip:hover {
            transform: scale(1.06);
            background: #f43f5e;
            color: white;
        }
        .barometer-chip.used {
            opacity: 0.3;
            pointer-events: none;
            border-color: #475569;
        }
        .scale-indicators {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            padding: 0 0.5rem;
        }
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const heroHeader = document.createElement('div');
    heroHeader.className = 'adj-hero-header';
    heroHeader.innerHTML = `
        <h1>Felt 4: Følelser, personlighed & relationer</h1>
        <p>Lær 20 essentielle adjektiver til at beskrive menneskers humør, sindstilstande og sociale relationer.</p>
    `;
    viewContainer.appendChild(heroHeader);

    // 6 Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'adj-tabs-nav';
    const tabs = [
        { id: 'tab_kontrast', label: '1. Kontrast-studiet', icon: '👁️' },
        { id: 'tab_antonym', label: '2. Find modpolen (duel)', icon: '⚔️' },
        { id: 'tab_synonym', label: '3. Synonymer og nuancer', icon: '🔄' },
        { id: 'tab_barometer', label: '4. Barometret (skala)', icon: '❤️' },
        { id: 'tab_kongruens', label: '5. Kongruens (-t / -e)', icon: '🧩' },
        { id: 'tab_historie', label: '6. Kontekst og historie', icon: '📖' }
    ];

    let currentTab = 'tab_kontrast';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `adj-tab-btn ${t.id === currentTab ? 'active' : ''}`;
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
        history.pushState(null, '', '#/' + lang + '/adjektiver_folelser/' + tabId);
        tabsMenu.querySelectorAll('.adj-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.adj-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- DATA: 10 MODPOL-PAR (20 ADJEKTIVER) I FELT 4 ---
    // ========================================================
    const adjektivPar = [
        {
            id: 'par_1',
            wordA: {
                word: 'glad',
                side: 'left',
                x: 48, y: 46,
                itemLabel: 'Glad mor 🎈',
                faelles: 'en glad kvinde',
                intet: 'et glad barn (aldrig -t!)',
                flertal: 'de glade venner',
                context: 'Barnet smiler og er meget glad.'
            },
            wordB: {
                word: 'trist',
                side: 'right',
                x: 16, y: 58,
                itemLabel: 'Trist dreng 🌧️',
                faelles: 'en trist mand',
                intet: 'et trist syn',
                flertal: 'de triste dage',
                context: 'Manden ser trist ud i dag.'
            }
        },
        {
            id: 'par_2',
            wordA: {
                word: 'venlig',
                side: 'left',
                x: 62, y: 44,
                itemLabel: 'Venlig mand 👋',
                faelles: 'en venlig nabo',
                intet: 'et venligt smil',
                flertal: 'de venlige kolleger',
                context: 'Læreren er altid meget venlig over for eleverne.'
            },
            wordB: {
                word: 'uvenlig',
                side: 'right',
                x: 94, y: 37,
                itemLabel: 'Uvenlig chauffør 😠',
                faelles: 'en uvenlig mand',
                intet: 'et uvenligt svar',
                flertal: 'de uvenlige blikke',
                context: 'Manden i butikken var meget uvenlig.'
            }
        },
        {
            id: 'par_3',
            wordA: {
                word: 'frisk',
                side: 'left',
                x: 33, y: 55,
                itemLabel: 'Frisk cyklist 🚴',
                faelles: 'en frisk pige',
                intet: 'et friskt æble',
                flertal: 'de friske løbere',
                context: 'Hun drikker et glas koldt og friskt vand.'
            },
            wordB: {
                word: 'træt',
                side: 'right',
                x: 51, y: 56,
                itemLabel: 'Træt studerende 🥱',
                faelles: 'en træt elev',
                intet: 'et træt barn',
                flertal: 'de trætte ben (bemærk: trætte!)',
                context: 'Kursisten er meget træt efter en lang dag.'
            }
        },
        {
            id: 'par_4',
            wordA: {
                word: 'tryg',
                side: 'left',
                x: 13, y: 53,
                itemLabel: 'Trygt barn 🧸',
                faelles: 'en tryg barndom',
                intet: 'et trygt hjem',
                flertal: 'de trygge rammer',
                context: 'Lejligheden er et rart og trygt hjem.'
            },
            wordB: {
                word: 'bange',
                side: 'right',
                x: 32, y: 61,
                itemLabel: 'Bange hundehvalp 🐕',
                faelles: 'en bange dreng',
                intet: 'et bange dyr (aldrig -t!)',
                flertal: 'de bange børn (aldrig -e!)',
                context: 'Den lille hund er bange for tordenvejr.'
            }
        },
        {
            id: 'par_5',
            wordA: {
                word: 'sød',
                side: 'left',
                x: 56, y: 56,
                itemLabel: 'Sød pige 🍰',
                faelles: 'en sød pige',
                intet: 'et sødt smil',
                flertal: 'de søde børn',
                context: 'Pigen deler kage og er meget sød.'
            },
            wordB: {
                word: 'sur',
                side: 'right',
                x: 71, y: 45,
                itemLabel: 'Sur mand 😒',
                faelles: 'en sur chef',
                intet: 'et surt æble',
                flertal: 'de sure miner',
                context: 'Manden står i regnen og ser sur ud.'
            }
        },
        {
            id: 'par_6',
            wordA: {
                word: 'rolig',
                side: 'left',
                x: 27, y: 84,
                itemLabel: 'Rolig hund 🐕',
                faelles: 'en rolig lærer',
                intet: 'et roligt sind',
                flertal: 'de rolige gæster',
                context: 'Læreren i klassen er altid rolig.'
            },
            wordB: {
                word: 'nervøs',
                side: 'right',
                x: 79, y: 45,
                itemLabel: 'Nervøs kvinde ⌚',
                faelles: 'en nervøs ansøger',
                intet: 'et nervøst hjerte',
                flertal: 'de nervøse elever',
                context: 'Eleven er nervøs før den mundtlige prøve.'
            }
        },
        {
            id: 'par_7',
            wordA: {
                word: 'stolt',
                side: 'left',
                x: 66, y: 54,
                itemLabel: 'Stolt dreng 🥇',
                faelles: 'en stolt far',
                intet: 'et stolt øjeblik',
                flertal: 'de stolte forældre',
                context: 'Faren er meget stolt af sin datter.'
            },
            wordB: {
                word: 'flov',
                side: 'right',
                x: 66, y: 67,
                itemLabel: 'Flov pige 😳',
                faelles: 'en flov dreng',
                intet: 'et flovt smil',
                flertal: 'de flove ansigter',
                context: 'Pigen spildte kaffe på jakken og ser meget flov ud.'
            }
        },
        {
            id: 'par_8',
            wordA: {
                word: 'hjælpsom',
                side: 'left',
                x: 92, y: 57,
                itemLabel: 'Hjælpsom dreng 🧺',
                faelles: 'en hjælpsom nabo',
                intet: 'et hjælpsomt menneske',
                flertal: 'de hjælpsomme venner',
                context: 'Drengen er hjælpsom og bærer den tunge frugtkurv.'
            },
            wordB: {
                word: 'egoistisk',
                side: 'right',
                x: 73, y: 52,
                itemLabel: 'Egoistisk passager 🚷',
                faelles: 'en egoistisk person',
                intet: 'et egoistisk valg',
                flertal: 'de egoistiske handlinger',
                context: 'Manden er egoistisk og vil ikke dele.'
            }
        },
        {
            id: 'par_9',
            wordA: {
                word: 'social',
                side: 'left',
                x: 76, y: 62,
                itemLabel: 'Social vennegruppe ☕',
                faelles: 'en social person',
                intet: 'et socialt samvær',
                flertal: 'de sociale aktiviteter',
                context: 'Pigen har mange venner og er meget social.'
            },
            wordB: {
                word: 'ensom',
                side: 'right',
                x: 33, y: 41,
                itemLabel: 'Ensom skikkelse 🍂',
                faelles: 'en ensom mand',
                intet: 'et ensomt hjerte',
                flertal: 'de ensomme stunder',
                context: 'Den gamle mand føler sig ofte ensom.'
            }
        },
        {
            id: 'par_10',
            wordA: {
                word: 'tilfreds',
                side: 'left',
                x: 84, y: 61,
                itemLabel: 'Tilfreds pige 👍',
                faelles: 'en tilfreds kunde',
                intet: 'et tilfreds smil',
                flertal: 'de tilfredse gæster',
                context: 'Kunden er meget tilfreds med maden.'
            },
            wordB: {
                word: 'utilfreds',
                side: 'right',
                x: 91, y: 56,
                itemLabel: 'Utilfreds mand 👎',
                faelles: 'en utilfreds borger',
                intet: 'et utilfreds svar',
                flertal: 'de utilfredse kunder',
                context: 'Passageren er utilfreds med den forsinkede bus.'
            }
        }
    ];

    const alleOrdMap = {};
    adjektivPar.forEach(pair => {
        alleOrdMap[pair.wordA.word] = { me: pair.wordA, other: pair.wordB, pairId: pair.id };
        alleOrdMap[pair.wordB.word] = { me: pair.wordB, other: pair.wordA, pairId: pair.id };
    });

    // ========================================================
    // --- TAB 1: KONTRAST-STUDIET (VISUEL FLADE MED 20 HOTSPOTS)
    // ========================================================
    const panelKontrast = document.createElement('div');
    panelKontrast.className = 'adj-panel active';
    panelKontrast.dataset.panel = 'tab_kontrast';

    const contrastCard = document.createElement('div');
    contrastCard.className = 'contrast-canvas-card';

    const ctrlBar = document.createElement('div');
    ctrlBar.className = 'contrast-control-bar';

        const instructionText = document.createElement('div');
    instructionText.className = 'contrast-instruction';
    instructionText.innerHTML = `💡 <em>Klik på et punkt for at høre udtale og se dets følelsesmæssige modpol i den modsatte scene!</em>`;
    ctrlBar.appendChild(instructionText);

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-toggle-btn';
    pureBtn.innerHTML = `<span>🖼️</span> Se rent billede: <strong id="pure-status-label">FRA</strong>`;
    let isPureMode = false;
    pureBtn.onclick = () => {
        isPureMode = !isPureMode;
        stage.classList.toggle('pure-mode', isPureMode);
        pureBtn.classList.toggle('active', isPureMode);
        pureBtn.querySelector('#pure-status-label').textContent = isPureMode ? 'TIL 🖼️' : 'FRA';
    };
    ctrlBar.appendChild(pureBtn);
    contrastCard.appendChild(ctrlBar);

    const stage = document.createElement('div');
    stage.className = 'contrast-split-stage';

    const leftHalf = document.createElement('div');
    leftHalf.className = 'stage-half';
    leftHalf.innerHTML = `
        <div class="stage-half-header warm">❤️ Glæde, tryghed & fællesskab (10 egenskaber)</div>
        <img src="assets/adjektiver_folelser_venstre.jpg" alt="Glæde og fællesskab i parken" />
    `;

    const rightHalf = document.createElement('div');
    rightHalf.className = 'stage-half';
    rightHalf.innerHTML = `
        <div class="stage-half-header cool">🌧️ Modgang, tristhed & uro (10 modpoler)</div>
        <img src="assets/adjektiver_folelser_hoejre.jpg" alt="Modgang og uro i regnvejret" />
    `;

    stage.appendChild(leftHalf);
    stage.appendChild(rightHalf);
    contrastCard.appendChild(stage);
    panelKontrast.appendChild(contrastCard);

    const detailCard = document.createElement('div');
    detailCard.className = 'adj-detail-card';
    detailCard.style.display = 'none';
    panelKontrast.appendChild(detailCard);

    function selectAdjective(wordKey) {
        const item = alleOrdMap[wordKey];
        if (!item) return;

        speakDanish(item.me.word);

        stage.querySelectorAll('.adj-hotspot').forEach(dot => {
            dot.classList.remove('active', 'partner-active');
            if (dot.dataset.word === item.me.word) {
                dot.classList.add('active');
            } else if (dot.dataset.word === item.other.word) {
                dot.classList.add('partner-active');
            }
        });

        detailCard.style.display = 'flex';
        detailCard.innerHTML = `
            <div class="adj-detail-header">
                <div class="adj-title-group">
                    <span style="font-size: 1.8rem;">${item.me.side === 'left' ? '❤️' : '🌧️'}</span>
                    <span class="adj-main-word">${item.me.word}</span>
                    <button class="adj-tts-btn" id="card-tts-btn">🔊 Hør udtale</button>
                    <span style="color: #94a3b8; font-size: 0.95rem; margin-left: 0.5rem;">(${item.me.itemLabel})</span>
                </div>
                <div class="adj-modpol-pill" id="card-swap-btn" title="Klik for at se modpolen">
                    <span>⚔️ Modpol:</span>
                    <strong>${item.other.word}</strong>
                    <span>➔</span>
                </div>
            </div>

            <div class="adj-congruence-grid">
                <div class="adj-congruence-box">
                    <div class="adj-congruence-label">Fælleskøn (en ...)</div>
                    <div class="adj-congruence-val">${formatNounLinks(item.me.faelles)}</div>
                </div>
                <div class="adj-congruence-box">
                    <div class="adj-congruence-label">Intetkøn (et ... / +t)</div>
                    <div class="adj-congruence-val"><mark>${formatNounLinks(item.me.intet)}</mark></div>
                </div>
                <div class="adj-congruence-box">
                    <div class="adj-congruence-label">Bestemt / Flertal (+e)</div>
                    <div class="adj-congruence-val">${formatNounLinks(item.me.flertal)}</div>
                </div>
            </div>

            <div class="adj-example-box">
                <strong>💬 Enkel sætning:</strong><br>
                "${formatNounLinks(item.me.context)}"
            </div>
        `;

        attachNounLinkListeners(detailCard);
        detailCard.querySelector('#card-tts-btn').onclick = () => speakDanish(item.me.word);
        detailCard.querySelector('#card-swap-btn').onclick = () => selectAdjective(item.other.word);
    }

    adjektivPar.forEach(pair => {
        const dotA = document.createElement('div');
        dotA.className = 'adj-hotspot';
        dotA.style.left = `${pair.wordA.x}%`;
        dotA.style.top = `${pair.wordA.y}%`;
        dotA.textContent = '●';
        dotA.title = `${pair.wordA.word} ➔ Modpol: ${pair.wordB.word}`;
        dotA.dataset.word = pair.wordA.word;
        dotA.onclick = () => selectAdjective(pair.wordA.word);
        (pair.wordA.side === 'left' ? leftHalf : rightHalf).appendChild(dotA);

        const dotB = document.createElement('div');
        dotB.className = 'adj-hotspot';
        dotB.style.left = `${pair.wordB.x}%`;
        dotB.style.top = `${pair.wordB.y}%`;
        dotB.textContent = '●';
        dotB.title = `${pair.wordB.word} ➔ Modpol: ${pair.wordA.word}`;
        dotB.dataset.word = pair.wordB.word;
        dotB.onclick = () => selectAdjective(pair.wordB.word);
        (pair.wordB.side === 'left' ? leftHalf : rightHalf).appendChild(dotB);
    });

    panelsHolder.appendChild(panelKontrast);

    // ========================================================
    // --- TAB 2: FIND MODPOLEN (ANTONYM-DUELLEN) ---
    // ========================================================
    const panelAntonym = document.createElement('div');
    panelAntonym.className = 'adj-panel';
    panelAntonym.dataset.panel = 'tab_antonym';

    const antonymDuels = [
        {
            stimulus: 'Pigen smiler og griner – hun er meget <strong>GLAD 😊</strong>.',
            question: 'Hvad er drengen, der græder over sit tabte legetøj?',
            targetWord: 'glad',
            correct: 'trist 😢',
            options: ['trist 😢', 'træt 🥱', 'bange 🐕', 'nervøs 😰'],
            wrongExplanation: 'Modpolen til glad er trist.',
            congruenceBonus: 'En <strong>glad</strong> pige ↔ En <strong>trist</strong> dreng (et glad barn ↔ et trist barn).'
        },
        {
            stimulus: 'Naboen sagde godmorgen med et <strong>VENLIGT</strong> smil 👋.',
            question: 'Hvad er personen, der smækker døren i hovedet på dig?',
            targetWord: 'venlig',
            correct: 'uvenlig 😠',
            options: ['uvenlig 😠', 'egoistisk 🚷', 'ensom 🍂', 'sur 😒'],
            wrongExplanation: 'Når man opfører sig uhøfligt og afvisende, er man uvenlig.',
            congruenceBonus: 'En <strong>venlig</strong> nabo ↔ En <strong>uvenlig</strong> nabo.'
        },
        {
            stimulus: 'Barnet gaber efter en lang skoledag og er meget <strong>TRÆT 🥱</strong>.',
            question: 'Hvad er eleven, der vågner veludhvilet klokken syv?',
            targetWord: 'træt',
            correct: 'frisk ⚡',
            options: ['frisk ⚡', 'glad 😊', 'rolig 🧘', 'stolt 🥇'],
            wrongExplanation: 'Når man har masser af energi efter en god nats søvn, er man frisk!',
            congruenceBonus: 'En <strong>træt</strong> elev ↔ En <strong>frisk</strong> elev.'
        },
        {
            stimulus: 'Hunden føler sig <strong>TRYG</strong> sammen med sin familie 🧸.',
            question: 'Hvad er hunden under et højt tordenvejr med lyn?',
            targetWord: 'tryg',
            correct: 'bange 🐕',
            options: ['bange 🐕', 'sur 😒', 'træt 🥱', 'flov 😳'],
            wrongExplanation: 'Når man føler frygt og usikkerhed, er man bange.',
            congruenceBonus: 'Et <strong>trygt</strong> hjem ↔ Et <strong>bange</strong> barn (bange bøjes aldrig!).'
        },
        {
            stimulus: 'Manden kiggede vredt ned i jorden og var rigtig <strong>SUR 😒</strong>.',
            question: 'Hvad er den rare veninde, der deler sine boller med dig?',
            targetWord: 'sur',
            correct: 'sød 🥰',
            options: ['sød 🥰', 'glad 😊', 'rolig 🧘', 'frisk ⚡'],
            wrongExplanation: 'På dansk er sur og sød direkte modpoler om personlighed og humør!',
            congruenceBonus: 'En <strong>sur</strong> mand ↔ En <strong>sød</strong> veninde.'
        },
        {
            stimulus: 'Læreren tog det helt <strong>ROLIGT</strong> og talte med dæmpet stemme 🧘.',
            question: 'Hvad er eleven, hvis hjerte banker hurtigt før eksamen?',
            targetWord: 'rolig',
            correct: 'nervøs 😰',
            options: ['nervøs 😰', 'bange 🐕', 'uvenlig 😠', 'ensom 🍂'],
            wrongExplanation: 'Når man er urolig og spændt før en præstation, er man nervøs.',
            congruenceBonus: 'Et <strong>roligt</strong> sind ↔ Et <strong>nervøst</strong> hjerte.'
        },
        {
            stimulus: 'Faren var utrolig <strong>STOLT</strong>, da sønnen fik sit eksamensbevis 🥇.',
            question: 'Hvad var eleven, der kom til at vælte lærerens kaffekop foran alle?',
            targetWord: 'stolt',
            correct: 'flov 😳',
            options: ['flov 😳', 'trist 😢', 'bange 🐕', 'sur 😒'],
            wrongExplanation: 'Når man skammer sig over en pinlig situation, er man flov.',
            congruenceBonus: 'En <strong>stolt</strong> far ↔ En <strong>flov</strong> elev.'
        },
        {
            stimulus: 'Naboen er meget <strong>HJÆLPSOM</strong> og hjælper alle i opgangen 🤝.',
            question: 'Hvad er personen, der kun tænker på sig selv og sine egne fordele?',
            targetWord: 'hjælpsom',
            correct: 'egoistisk 🚷',
            options: ['egoistisk 🚷', 'ensom 🍂', 'uvenlig 😠', 'utilfreds 👎'],
            wrongExplanation: 'En person, der kun tænker på sig selv, er egoistisk.',
            congruenceBonus: 'Et <strong>hjælpsomt</strong> menneske ↔ Et <strong>egoistisk</strong> menneske.'
        },
        {
            stimulus: 'Manden boede alene i skoven og følte sig ofte <strong>ENSOM 🍂</strong>.',
            question: 'Hvad er personen, der elsker at være sammen med venner til fester?',
            targetWord: 'ensom',
            correct: 'social ☕',
            options: ['social ☕', 'glad 😊', 'venlig 👋', 'frisk ⚡'],
            wrongExplanation: 'Når man søger selskab og fællesskab med andre, er man social.',
            congruenceBonus: 'Et <strong>ensomt</strong> hjerte ↔ Et <strong>socialt</strong> samvær.'
        },
        {
            stimulus: 'Kunden fik en fantastisk service og gik <strong>TILFREDS</strong> hjem 👍.',
            question: 'Hvad er borgeren, der klager over en dårlig behandling?',
            targetWord: 'tilfreds',
            correct: 'utilfreds 👎',
            options: ['utilfreds 👎', 'sur 😒', 'trist 😢', 'uvenlig 😠'],
            wrongExplanation: 'Modpolen til tilfreds er utilfreds.',
            congruenceBonus: 'En <strong>tilfreds</strong> kunde ↔ En <strong>utilfreds</strong> kunde.'
        }
    ];

    let currentDuelIndex = 0;
    let duelScore = 0;

    const antonymCard = document.createElement('div');
    antonymCard.className = 'task-card';
    panelAntonym.appendChild(antonymCard);

    function renderDuel() {
        const item = antonymDuels[currentDuelIndex];
        antonymCard.innerHTML = `
            <div class="task-top-bar">
                <span class="task-counter">⚔️ Duel ${currentDuelIndex + 1} af ${antonymDuels.length}</span>
                <span class="task-score">Point: <strong>${duelScore}</strong></span>
            </div>
            <div class="task-prompt-box">
                ${formatNounLinks(item.stimulus)}
                <div class="task-subprompt">${formatNounLinks(item.question)}</div>
            </div>
            <div class="task-options-grid" id="duel-options"></div>
            <div id="duel-feedback"></div>
        `;

        attachNounLinkListeners(antonymCard);

        const optionsGrid = antonymCard.querySelector('#duel-options');
        const feedbackContainer = antonymCard.querySelector('#duel-feedback');

        const shuffled = [...item.options].sort(() => 0.5 - Math.random());

        shuffled.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'task-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => b.disabled = true);
                const isCorrect = opt === item.correct;

                if (isCorrect) {
                    btn.classList.add('correct');
                    duelScore++;
                    antonymCard.querySelector('.task-score strong').textContent = duelScore;
                    speakDanish(item.correct.split(' ')[0]);

                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box correct">
                            <strong>🎉 Rigtigt!</strong> Modpolen til <em>${item.targetWord}</em> er <strong>${item.correct}</strong>.<br>
                            <span style="display:inline-block; margin-top:0.5rem; color:#f8fafc;">✨ <strong>Sætnings-par:</strong> ${formatNounLinks(item.congruenceBonus)}</span>
                        </div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => {
                        if (b.textContent === item.correct) b.classList.add('correct');
                    });
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box wrong">
                            <strong>Ikke helt:</strong> ${item.wrongExplanation}<br>
                            Det rigtige svar er <strong>${item.correct}</strong>.
                        </div>
                    `;
                }

                attachNounLinkListeners(feedbackContainer);

                const nextBtn = document.createElement('button');
                nextBtn.className = 'task-next-btn';
                if (currentDuelIndex + 1 < antonymDuels.length) {
                    nextBtn.textContent = 'Næste duel ➔';
                    nextBtn.onclick = () => {
                        currentDuelIndex++;
                        renderDuel();
                    };
                } else {
                    nextBtn.textContent = `Se resultat (${duelScore}/${antonymDuels.length}) 🏆`;
                    nextBtn.onclick = () => {
                        antonymCard.innerHTML = `
                            <div style="text-align:center; padding: 2rem;">
                                <div style="font-size: 3.5rem; margin-bottom: 1rem;">🏆</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Flot klaret i Følelses-duellen!</h2>
                                <p style="font-size: 1.15rem; color: #94a3b8; margin-bottom: 2rem;">Du fik <strong>${duelScore}</strong> ud af <strong>${antonymDuels.length}</strong> rigtige modpoler.</p>
                                <button class="task-next-btn" id="restart-duel-btn">Prøv igen 🔄</button>
                            </div>
                        `;
                        antonymCard.querySelector('#restart-duel-btn').onclick = () => {
                            currentDuelIndex = 0;
                            duelScore = 0;
                            renderDuel();
                        };
                    };
                }
                feedbackContainer.appendChild(nextBtn);
            };

            optionsGrid.appendChild(btn);
        });
    }

    renderDuel();
    panelsHolder.appendChild(panelAntonym);

    // ========================================================
    // --- TAB 3: SYNONYMER & NUANCER ---
    // ========================================================
    const panelSynonym = document.createElement('div');
    panelSynonym.className = 'adj-panel';
    panelSynonym.dataset.panel = 'tab_synonym';

    const synonymTasks = [
        {
            word: 'glad',
            sentence: 'Børnene var jublende <strong>GLADE</strong> over turen til stranden.',
            question: 'Hvilket ord betyder overstrømmende glad?',
            correct: 'lykkelig / begejstret',
            options: ['lykkelig / begejstret', 'rolig', 'træt', 'venlig'],
            explanation: '"Lykkelig" og "begejstret" udtrykker intens og dyb glæde.'
        },
        {
            word: 'trist',
            sentence: 'Han følte sig <strong>TRIST</strong> efter samtalen.',
            question: 'Hvilket ord betyder næsten det samme som trist?',
            correct: 'ked af det / modløs',
            options: ['ked af det / modløs', 'sur', 'bange', 'flov'],
            explanation: '"Ked af det" er det mest almindelige hverdagsudtryk for trist.'
        },
        {
            word: 'venlig',
            sentence: 'Lægen talte med en <strong>VENLIG</strong> og varm stemme.',
            question: 'Hvilket ord beskriver en meget omsorgsfuld person?',
            correct: 'hjertevarm / imødekommende',
            options: ['hjertevarm / imødekommende', 'stolt', 'frisk', 'rolig'],
            explanation: '"Imødekommende" bruges om folk, der møder andre med smil og åbenhed.'
        },
        {
            word: 'træt',
            sentence: 'Efter løbeturen var han helt <strong>TRÆT</strong> i kroppen.',
            question: 'Hvilket ord betyder fuldstændig uden kræfter?',
            correct: 'udmattet',
            options: ['udmattet', 'ked af det', 'bange', 'ensom'],
            explanation: '"Udmattet" betyder så træt, at man slet ikke kan mere.'
        },
        {
            word: 'rolig',
            sentence: 'Barnet sov i en <strong>ROLIG</strong> søvn.',
            question: 'Hvilket ord betyder fredfyldt uden bekymringer?',
            correct: 'afslappet / fredelig',
            options: ['afslappet / fredelig', 'nervøs', 'frisk', 'social'],
            explanation: '"Afslappet" beskriver en krop og et sind uden spændinger.'
        },
        {
            word: 'bange',
            sentence: 'Drengen var <strong>BANGE</strong> for mørket på værelset.',
            question: 'Hvilket ord betyder meget bange?',
            correct: 'bangebuks / skræmt',
            options: ['bangebuks / skræmt', 'sur', 'træt', 'utilfreds'],
            explanation: '"Skræmt" betyder grebet af frygt.'
        },
        {
            word: 'sur',
            sentence: 'Chefen var rigtig <strong>SUR</strong> over forsinkelsen.',
            question: 'Hvilket ord betyder vred og irriteret?',
            correct: 'gnaven / vred',
            options: ['gnaven / vred', 'ked af det', 'egoistisk', 'stolt'],
            explanation: '"Gnaven" og "vred" bruges om folk i dårligt humør.'
        },
        {
            word: 'stolt',
            sentence: 'Moren var <strong>STOLT</strong> over sin datters tegning.',
            question: 'Hvilket udtryk betyder næsten det samme?',
            correct: 'ærefuld / kry',
            options: ['ærefuld / kry', 'flov', 'rolig', 'sød'],
            explanation: 'At være "kry" er et klassisk dansk udtryk for at være sundt stolt.'
        },
        {
            word: 'hjælpsom',
            sentence: 'Kollegaen er altid meget <strong>HJÆLPSOM</strong>.',
            question: 'Hvilket ord betyder altid parat til at træde til?',
            correct: 'tjenstvillig',
            options: ['tjenstvillig', 'social', 'tilfreds', 'venlig'],
            explanation: '"Tjenstvillig" beskriver én, der med glæde yder en indsats for andre.'
        },
        {
            word: 'ensom',
            sentence: 'Den gamle mand følte sig <strong>ENSOM</strong> i weekenderne.',
            question: 'Hvilket ord betyder forladt af andre?',
            correct: 'forladt / alene',
            options: ['forladt / alene', 'træt', 'sur', 'bange'],
            explanation: '"Forladt" og "alene" udtrykker fraværet af andre mennesker.'
        }
    ];

    let currentSynonymIndex = 0;
    let synonymScore = 0;

    const synonymCard = document.createElement('div');
    synonymCard.className = 'task-card';
    panelSynonym.appendChild(synonymCard);

    function renderSynonymTask() {
        const item = synonymTasks[currentSynonymIndex];
        synonymCard.innerHTML = `
            <div class="task-top-bar">
                <span class="task-counter">🔄 Nuance ${currentSynonymIndex + 1} af ${synonymTasks.length}</span>
                <span class="task-score">Point: <strong>${synonymScore}</strong></span>
            </div>
            <div class="task-prompt-box">
                ${formatNounLinks(item.sentence)}
                <div class="task-subprompt">${formatNounLinks(item.question)}</div>
            </div>
            <div class="task-options-grid" id="synonym-options"></div>
            <div id="synonym-feedback"></div>
        `;

        attachNounLinkListeners(synonymCard);

        const optionsGrid = synonymCard.querySelector('#synonym-options');
        const feedbackContainer = synonymCard.querySelector('#synonym-feedback');

        const shuffled = [...item.options].sort(() => 0.5 - Math.random());

        shuffled.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'task-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => b.disabled = true);
                const isCorrect = opt === item.correct;

                if (isCorrect) {
                    btn.classList.add('correct');
                    synonymScore++;
                    synonymCard.querySelector('.task-score strong').textContent = synonymScore;
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box correct">
                            <strong>🎯 Rigtigt!</strong> ${item.explanation}
                        </div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => {
                        if (b.textContent === item.correct) b.classList.add('correct');
                    });
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box wrong">
                            <strong>Svaret er:</strong> ${item.correct}.<br>${item.explanation}
                        </div>
                    `;
                }

                const nextBtn = document.createElement('button');
                nextBtn.className = 'task-next-btn';
                if (currentSynonymIndex + 1 < synonymTasks.length) {
                    nextBtn.textContent = 'Næste nuance ➔';
                    nextBtn.onclick = () => {
                        currentSynonymIndex++;
                        renderSynonymTask();
                    };
                } else {
                    nextBtn.textContent = `Afslut synonymer (${synonymScore}/${synonymTasks.length}) 🌟`;
                    nextBtn.onclick = () => {
                        synonymCard.innerHTML = `
                            <div style="text-align:center; padding: 2rem;">
                                <div style="font-size: 3.5rem; margin-bottom: 1rem;">🌟</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Flot følelsesforståelse!</h2>
                                <p style="font-size: 1.15rem; color: #94a3b8; margin-bottom: 2rem;">Du fik <strong>${synonymScore}</strong> ud af <strong>${synonymTasks.length}</strong> rigtige nuancer.</p>
                                <button class="task-next-btn" id="restart-syn-btn">Prøv igen 🔄</button>
                            </div>
                        `;
                        synonymCard.querySelector('#restart-syn-btn').onclick = () => {
                            currentSynonymIndex = 0;
                            synonymScore = 0;
                            renderSynonymTask();
                        };
                    };
                }
                feedbackContainer.appendChild(nextBtn);
            };

            optionsGrid.appendChild(btn);
        });
    }

    renderSynonymTask();
    panelsHolder.appendChild(panelSynonym);

    // ========================================================
    // --- TAB 4: BAROMETRET (FØLELSESSKALAER) ---
    // ========================================================
    const panelBarometer = document.createElement('div');
    panelBarometer.className = 'adj-panel';
    panelBarometer.dataset.panel = 'tab_barometer';

    const barometerChallenges = [
        {
            title: '😊 Skala 1: Glæde og humør',
            desc: 'Arranger følelserne fra mest trist til mest lykkelig:',
            lowLabel: '😢 Sønderknust',
            highLabel: '🎉 Lykkelig',
            correctOrder: ['sønderknust', 'trist', 'tilfreds', 'glad', 'lykkelig']
        },
        {
            title: '⚡ Skala 2: Energi og oplagthed',
            desc: 'Arranger energiniveauet fra helt udkørt til sprængfyldt:',
            lowLabel: '🪫 Udmattet',
            highLabel: '🔋 Sprængfyldt',
            correctOrder: ['udmattet', 'træt', 'moderat vågen', 'frisk', 'sprængfyldt med energi']
        },
        {
            title: '🧘 Skala 3: Ro vs. nervøsitet',
            desc: 'Arranger fra roligst til mest bange/panisk:',
            lowLabel: '🕊️ Helt rolig',
            highLabel: '😱 Panisk',
            correctOrder: ['helt rolig', 'afslappet', 'spændt', 'nervøs', 'panisk']
        },
        {
            title: '🧸 Skala 4: Tryghed og frygt',
            desc: 'Arranger fra fuldstændig tryg til rædselsslagen:',
            lowLabel: '🛡️ Helt tryg',
            highLabel: '😨 Rædselsslagen',
            correctOrder: ['fuldstændig tryg', 'tryg', 'urolig', 'bange', 'rædselsslagen']
        },
        {
            title: '💖 Skala 5: Venlighed',
            desc: 'Arranger adfærden fra mest uvenlig til mest hjertevarm:',
            lowLabel: '🧊 Uvenlig / kold',
            highLabel: '☀️ Hjertevarm',
            correctOrder: ['fjendtlig', 'uvenlig', 'neutral', 'venlig', 'hjertevarm']
        },
        {
            title: '👍 Skala 6: Tilfredshed',
            desc: 'Arranger kundens reaktion fra rasende til begejstret:',
            lowLabel: '😡 Rasende',
            highLabel: '🤩 Begejstret',
            correctOrder: ['rasende', 'utilfreds', 'neutral', 'tilfreds', 'begejstret']
        }
    ];

    let currentBarometerIndex = 0;
    const barometerCard = document.createElement('div');
    barometerCard.className = 'task-card';
    panelBarometer.appendChild(barometerCard);

    function renderBarometerChallenge() {
        const item = barometerChallenges[currentBarometerIndex];
        const totalSlots = item.correctOrder.length;
        let placed = [];
        let pool = [...item.correctOrder].sort(() => 0.5 - Math.random());

        barometerCard.innerHTML = `
            <div class="task-top-bar">
                <span class="task-counter">❤️ Barometer ${currentBarometerIndex + 1} af ${barometerChallenges.length}</span>
                <span class="task-score">${item.title}</span>
            </div>
            <div class="task-prompt-box">
                <div style="font-size:1.3rem; font-weight:700; margin-bottom:0.4rem;">${item.title}</div>
                <div class="task-subprompt">${item.desc}</div>
            </div>

            <div class="scale-indicators">
                <span>${item.lowLabel}</span>
                <span>${item.highLabel}</span>
            </div>

            <div class="barometer-track" id="barometer-slots"></div>
            <div class="barometer-pool" id="barometer-chips"></div>

            <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.5rem;">
                <button class="task-next-btn" style="background:#475569;" id="reset-scale-btn">Nulstil skala 🔄</button>
                <button class="task-next-btn" id="check-scale-btn" disabled>Tjek rækkefølge ✔️</button>
            </div>
            <div id="barometer-feedback" style="margin-top:1.2rem;"></div>
        `;

        const slotsContainer = barometerCard.querySelector('#barometer-slots');
        const chipsContainer = barometerCard.querySelector('#barometer-chips');
        const checkBtn = barometerCard.querySelector('#check-scale-btn');
        const resetBtn = barometerCard.querySelector('#reset-scale-btn');
        const feedbackBox = barometerCard.querySelector('#barometer-feedback');

        function updateUI() {
            slotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlots; i++) {
                const slot = document.createElement('div');
                slot.className = `barometer-slot ${placed[i] ? 'filled' : ''}`;
                slot.textContent = placed[i] ? `${i + 1}. ${placed[i]}` : `[ Trin ${i + 1} ]`;
                if (placed[i]) {
                    slot.title = 'Klik for at fjerne dette ord';
                    slot.onclick = () => {
                        placed.splice(i, 1);
                        updateUI();
                    };
                }
                slotsContainer.appendChild(slot);
            }

            chipsContainer.innerHTML = '';
            pool.forEach(word => {
                const chip = document.createElement('button');
                chip.className = `barometer-chip ${placed.includes(word) ? 'used' : ''}`;
                chip.textContent = word;
                chip.onclick = () => {
                    if (placed.length < totalSlots && !placed.includes(word)) {
                        placed.push(word);
                        updateUI();
                    }
                };
                chipsContainer.appendChild(chip);
            });

            checkBtn.disabled = placed.length !== totalSlots;
        }

        resetBtn.onclick = () => {
            placed = [];
            feedbackBox.innerHTML = '';
            updateUI();
        };

        checkBtn.onclick = () => {
            const isAllCorrect = placed.every((w, idx) => w === item.correctOrder[idx]);
            if (isAllCorrect) {
                feedbackBox.innerHTML = `
                    <div class="task-feedback-box correct">
                        <strong>🎉 Perfekt sorteret!</strong> Du placerede følelserne i helt rigtig rækkefølge:<br>
                        <em>${item.correctOrder.join(' ➔ ')}</em>
                    </div>
                `;
                checkBtn.style.display = 'none';

                const nextBtn = document.createElement('button');
                nextBtn.className = 'task-next-btn';
                if (currentBarometerIndex + 1 < barometerChallenges.length) {
                    nextBtn.textContent = 'Næste skala ➔';
                    nextBtn.onclick = () => {
                        currentBarometerIndex++;
                        renderBarometerChallenge();
                    };
                } else {
                    nextBtn.textContent = 'Du mestrer følelsesbarometret! 🏆';
                    nextBtn.onclick = () => {
                        currentBarometerIndex = 0;
                        renderBarometerChallenge();
                    };
                }
                feedbackBox.appendChild(nextBtn);
            } else {
                feedbackBox.innerHTML = `
                    <div class="task-feedback-box wrong">
                        <strong>Ikke helt i mål endnu.</strong> Nogle af følelserne står ikke i rigtig rækkefølge.<br>
                        Tip: Tænk på den mildeste tilstand først og den mest intense til sidst!
                    </div>
                `;
            }
        };

        updateUI();
    }

    renderBarometerChallenge();
    panelsHolder.appendChild(panelBarometer);

    // ========================================================
    // --- TAB 5: KONGRUENS-BYGGEREN (FÆLDER: GLAD, TRÆT, BANGE) ---
    // ========================================================
    const panelKongruens = document.createElement('div');
    panelKongruens.className = 'adj-panel';
    panelKongruens.dataset.panel = 'tab_kongruens';

    const kongruensTasks = [
        {
            sentence: 'Barnet leger og er et meget ______ barn.',
            correct: 'glad',
            options: ['glad', 'gladt', 'glade'],
            rule: '<strong>⚠️ Stor bøjningsfælde (glad):</strong> Adjektivet "glad" får <strong>ALDRIG -t</strong> i intetkøn! Man siger <em>et glad barn</em> (aldrig "gladt").'
        },
        {
            sentence: 'Forældrene kiggede på de to ______ børn.',
            correct: 'glade',
            options: ['glad', 'gladt', 'glade'],
            rule: '<strong>Flertal (to børn):</strong> I flertal får glad normalt <strong>-e</strong>: <em>glade børn</em>.'
        },
        {
            sentence: 'Efter turen i skoven lagde det ______ barn sig til at sove.',
            correct: 'trætte',
            options: ['træt', 'trætt', 'trætte'],
            rule: '<strong>Bestemt form (det ... barn):</strong> Bestemt form får <strong>-e</strong> og fordobler t: <em>det trætte barn</em>.'
        },
        {
            sentence: 'Hunden var meget ______ for de høje brag fra fyrværkeriet.',
            correct: 'bange',
            options: ['bange', 'banget', 'bangee'],
            rule: '<strong>⚠️ Ubøjeligt adjektiv (bange):</strong> "Bange" ender allerede på -e og bøjes <strong>ALDRIG</strong>! Det hedder <em>en bange hund</em>, <em>et bange barn</em> og <em>de bange børn</em>.'
        },
        {
            sentence: 'Læreren mødte eleverne med et ______ smil.',
            correct: 'venligt',
            options: ['venlig', 'venligt', 'venlige'],
            rule: '<strong>Ubestemt intetkøn (et smil):</strong> Venlig får normalt <strong>-t</strong>: <em>et venligt smil</em>.'
        },
        {
            sentence: 'Pigen gav ham et ______ æble fra haven.',
            correct: 'surt',
            options: ['sur', 'surt', 'sure'],
            rule: '<strong>Ubestemt intetkøn (et æble):</strong> Får <strong>-t</strong>: <em>et surt æble</em>.'
        },
        {
            sentence: 'Babyen kiggede på moren med et ______ smil.',
            correct: 'sødt',
            options: ['sød', 'sødt', 'søde'],
            rule: '<strong>Ubestemt intetkøn (et smil):</strong> Får <strong>-t</strong>: <em>et sødt smil</em>.'
        },
        {
            sentence: 'Faren oplevede et meget ______ øjeblik ved eksamen.',
            correct: 'stolt',
            options: ['stolt', 'stoltt', 'stolte'],
            rule: '<strong>Ubestemt intetkøn (et øjeblik):</strong> Stolt ender allerede på -t, så det forbliver uændret: <em>et stolt øjeblik</em>.'
        },
        {
            sentence: 'Han følte sig som et ______ menneske i den fremmede by.',
            correct: 'ensomt',
            options: ['ensom', 'ensomt', 'ensomme'],
            rule: '<strong>Ubestemt intetkøn (et menneske):</strong> Får <strong>-t</strong>: <em>et ensomt menneske</em>.'
        },
        {
            sentence: 'Familien boede i et meget ______ hjem.',
            correct: 'trygt',
            options: ['tryg', 'trygt', 'trygge'],
            rule: '<strong>Ubestemt intetkøn (et hjem):</strong> Tryg får <strong>-t</strong>: <em>et trygt hjem</em>.'
        }
    ];

    let currentKongruensIndex = 0;
    let kongruensScore = 0;

    const kongruensCard = document.createElement('div');
    kongruensCard.className = 'task-card';
    panelKongruens.appendChild(kongruensCard);

    function renderKongruensTask() {
        const item = kongruensTasks[currentKongruensIndex];
        kongruensCard.innerHTML = `
            <div class="adj-grammar-link-box">
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <span style="font-size: 1.8rem;">📖</span>
                    <div>
                        <div style="font-weight: 700; color: #f8fafc; font-size: 1.05rem;">
                            Vil du have styr på fælderne ved "glad" og "bange"?
                        </div>
                        <div style="color: #94a3b8; font-size: 0.92rem; margin-top: 0.2rem;">
                            Se listen over adjektiver, der aldrig tager -t eller aldrig bøjes, i bøjningsguiden.
                        </div>
                    </div>
                </div>
                <button class="adj-go-grammar-btn" id="go-comparison-guide-btn">
                    Gå til bøjningsguiden ➔
                </button>
            </div>

            <div class="task-top-bar">
                <span class="task-counter">🧩 Kongruens ${currentKongruensIndex + 1} af ${kongruensTasks.length}</span>
                <span class="task-score">Point: <strong>${kongruensScore}</strong></span>
            </div>
            <div class="task-prompt-box">
                ${formatNounLinks(item.sentence)}
                <div class="task-subprompt">Vælg den rigtige form af adjektivet:</div>
            </div>
            <div class="task-options-grid" id="kongruens-options"></div>
            <div id="kongruens-feedback"></div>
        `;

        attachNounLinkListeners(kongruensCard);

        kongruensCard.querySelector('#go-comparison-guide-btn').onclick = () => {
            navigateFn('adjective_comparison');
        };

        const optionsGrid = kongruensCard.querySelector('#kongruens-options');
        const feedbackContainer = kongruensCard.querySelector('#kongruens-feedback');

        item.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'task-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => b.disabled = true);
                const isCorrect = opt === item.correct;

                if (isCorrect) {
                    btn.classList.add('correct');
                    kongruensScore++;
                    kongruensCard.querySelector('.task-score strong').textContent = kongruensScore;
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box correct">
                            <strong>🎉 Helt rigtigt!</strong><br>
                            ${item.rule}
                            <div>
                                <a class="feedback-grammar-link" id="feedback-link-grammar">
                                    📖 Læs mere i bøjningsguiden her ➔
                                </a>
                            </div>
                        </div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => {
                        if (b.textContent === item.correct) b.classList.add('correct');
                    });
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box wrong">
                            <strong>Forkert form:</strong> Rigtigt er <strong>${item.correct}</strong>.<br>
                            ${item.rule}
                            <div>
                                <a class="feedback-grammar-link" id="feedback-link-grammar">
                                    📖 Se bøjningsguiden for hjælp til undtagelserne ➔
                                </a>
                            </div>
                        </div>
                    `;
                }

                const linkEl = feedbackContainer.querySelector('#feedback-link-grammar');
                if (linkEl) {
                    linkEl.onclick = () => navigateFn('adjective_comparison');
                }

                const nextBtn = document.createElement('button');
                nextBtn.className = 'task-next-btn';
                if (currentKongruensIndex + 1 < kongruensTasks.length) {
                    nextBtn.textContent = 'Næste sætning ➔';
                    nextBtn.onclick = () => {
                        currentKongruensIndex++;
                        renderKongruensTask();
                    };
                } else {
                    nextBtn.textContent = `Se bøjningsresultat (${kongruensScore}/${kongruensTasks.length}) 🏆`;
                    nextBtn.onclick = () => {
                        kongruensCard.innerHTML = `
                            <div style="text-align:center; padding: 2rem;">
                                <div style="font-size: 3.5rem; margin-bottom: 1rem;">🧩</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Stærk kongruens i følelser!</h2>
                                <p style="font-size: 1.15rem; color: #94a3b8; margin-bottom: 1.5rem;">Du fik <strong>${kongruensScore}</strong> ud af <strong>${kongruensTasks.length}</strong> rigtige endelser.</p>
                                <div style="margin-bottom: 2rem;">
                                    <button class="adj-go-grammar-btn" id="finish-guide-link-btn" style="margin: 0 auto;">
                                        📖 Gå til den store bøjningsguide ➔
                                    </button>
                                </div>
                                <button class="task-next-btn" id="restart-kong-btn">Prøv igen 🔄</button>
                            </div>
                        `;
                        kongruensCard.querySelector('#finish-guide-link-btn').onclick = () => navigateFn('adjective_comparison');
                        kongruensCard.querySelector('#restart-kong-btn').onclick = () => {
                            currentKongruensIndex = 0;
                            kongruensScore = 0;
                            renderKongruensTask();
                        };
                    };
                }
                feedbackContainer.appendChild(nextBtn);
            };

            optionsGrid.appendChild(btn);
        });
    }

    renderKongruensTask();
    panelsHolder.appendChild(panelKongruens);

    // ========================================================
    // --- TAB 6: KONTEKST & HISTORIE ---
    // ========================================================
    const panelHistorie = document.createElement('div');
    panelHistorie.className = 'adj-panel';
    panelHistorie.dataset.panel = 'tab_historie';

    const historieTasks = [
        {
            story: 'Datteren kom hjem med et 12-tal i matematik. Hendes forældre var utrolig ______.',
            correct: 'stolte',
            options: ['stolte', 'flove', 'trætte', 'sure'],
            explanation: 'Når ens barn klarer sig godt, bliver man stolt (og forældre er flertal: stolte).'
        },
        {
            story: 'Det lille barn gemte sig bag morens ben, da den store hund gøede. Barnet var ______.',
            correct: 'bange',
            options: ['bange', 'stolt', 'frisk', 'sur'],
            explanation: 'En gøende hund gør et lille barn bange.'
        },
        {
            story: 'Kollegaen hjalp ham med det samme, da hans computer gik ned. Han var meget ______.',
            correct: 'hjælpsom',
            options: ['hjælpsom', 'egoistisk', 'ensom', 'nervøs'],
            explanation: 'At hjælpe en kollega i nød er hjælpsomt.'
        },
        {
            story: 'Katten ligger i solskinnet på sofaen og spinder blidt. Den er helt ______.',
            correct: 'rolig',
            options: ['rolig', 'nervøs', 'bange', 'uvenlig'],
            explanation: 'En spindende kat i solen er rolig og afslappet.'
        },
        {
            story: 'Han har løbet 10 kilometer i regnvejr og kan næsten ikke gå. Han er fuldstændig ______.',
            correct: 'træt',
            options: ['træt', 'frisk', 'sød', 'glad'],
            explanation: 'Efter 10 kilometer i regnen er kroppen meget træt.'
        },
        {
            story: 'Manden smilede varmt og bød de nye naboer velkommen med kaffe. Han var meget ______.',
            correct: 'venlig',
            options: ['venlig', 'uvenlig', 'sur', 'flov'],
            explanation: 'At byde nye naboer velkommen med kaffe er en venlig handling.'
        },
        {
            story: 'Maden på restauranten var kold, og tjeneren ignorerede dem. Gæsterne var meget ______.',
            correct: 'utilfredse',
            options: ['utilfredse', 'tilfredse', 'stolte', 'rolige'],
            explanation: 'Kold mad og dårlig service gør restaurantgæster utilfredse.'
        },
        {
            story: 'Hun tabte kagen på gulvet midt foran alle gæsterne. Hun blev rød i hovedet og var ______.',
            correct: 'flov',
            options: ['flov', 'stolt', 'frisk', 'social'],
            explanation: 'At tabe kagen foran gæsterne gør én flov.'
        }
    ];

    let currentStoryIndex = 0;
    let storyScore = 0;

    const storyCard = document.createElement('div');
    storyCard.className = 'task-card';
    panelHistorie.appendChild(storyCard);

    function renderStoryTask() {
        const item = historieTasks[currentStoryIndex];
        storyCard.innerHTML = `
            <div class="task-top-bar">
                <span class="task-counter">📖 Situation ${currentStoryIndex + 1} af ${historieTasks.length}</span>
                <span class="task-score">Point: <strong>${storyScore}</strong></span>
            </div>
            <div class="task-prompt-box">
                "${formatNounLinks(item.story)}"
                <div class="task-subprompt">Hvilket adjektiv passer bedst i situationen?</div>
            </div>
            <div class="task-options-grid" id="story-options"></div>
            <div id="story-feedback"></div>
        `;

        attachNounLinkListeners(storyCard);

        const optionsGrid = storyCard.querySelector('#story-options');
        const feedbackContainer = storyCard.querySelector('#story-feedback');

        item.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'task-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => b.disabled = true);
                const isCorrect = opt === item.correct;

                if (isCorrect) {
                    btn.classList.add('correct');
                    storyScore++;
                    storyCard.querySelector('.task-score strong').textContent = storyScore;
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box correct">
                            <strong>👏 Helt rigtigt!</strong> ${item.explanation}
                        </div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => {
                        if (b.textContent === item.correct) b.classList.add('correct');
                    });
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box wrong">
                            <strong>Svaret er "${item.correct}":</strong> ${item.explanation}
                        </div>
                    `;
                }

                const nextBtn = document.createElement('button');
                nextBtn.className = 'task-next-btn';
                if (currentStoryIndex + 1 < historieTasks.length) {
                    nextBtn.textContent = 'Næste situation ➔';
                    nextBtn.onclick = () => {
                        currentStoryIndex++;
                        renderStoryTask();
                    };
                } else {
                    nextBtn.textContent = `Se resultat (${storyScore}/${historieTasks.length}) 🌟`;
                    nextBtn.onclick = () => {
                        storyCard.innerHTML = `
                            <div style="text-align:center; padding: 2rem;">
                                <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎉</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Super flot forståelse af følelser og relationer!</h2>
                                <p style="font-size: 1.15rem; color: #94a3b8; margin-bottom: 2rem;">Du fik <strong>${storyScore}</strong> ud af <strong>${historieTasks.length}</strong> rigtige svar.</p>
                                <button class="task-next-btn" id="restart-story-btn">Prøv igen 🔄</button>
                            </div>
                        `;
                        storyCard.querySelector('#restart-story-btn').onclick = () => {
                            currentStoryIndex = 0;
                            storyScore = 0;
                            renderStoryTask();
                        };
                    };
                }
                feedbackContainer.appendChild(nextBtn);
            };

            optionsGrid.appendChild(btn);
        });
    }

    renderStoryTask();
    panelsHolder.appendChild(panelHistorie);

    const initialTab = (extraData && (extraData.subPath || extraData.activeTab || extraData.tab)) || 'tab_kontrast';
    switchTab(initialTab);

    container.appendChild(viewContainer);
}
