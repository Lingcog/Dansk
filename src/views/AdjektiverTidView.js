import { getTranslation } from '../utils/i18n.js';
import { formatNounLinks, attachNounLinkListeners } from '../utils/nounQuickPeekModal.js';

/**
 * AdjektiverTidView - Felt 2: Tid, alder og tempo
 * Dækker 20 af de mest almindelige tids- og tempoadjektiver på dansk (10 kontrast-par):
 * 1. Kontrast-studiet (Visuel flade på stationen med 20 hotspots og modpol-kobling)
 * 2. Find modpolen (Antonym-duellen - simple sætninger med kendte substantiver)
 * 3. Synonymer & Nuancer (Hverdagsnuancer)
 * 4. Barometret (Tids- og hastighedsskalaer)
 * 5. Kongruens-byggeren (Fælde-træning: -t og -e + link til bøjningsguiden)
 * 6. Kontekst & Historie (Hverdagssituationer fra stationen og hverdagen)
 */
export function renderAdjektiverTidView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adjektiver-fysik-view adjektiver-tid-view';

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

    // Styles (reusing the high-end design from Felt 1)
    const style = document.createElement('style');
    style.textContent = `
        .adjektiver-tid-view {
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
            background: linear-gradient(135deg, #38bdf8, #818cf8, #c084fc);
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
            background: #38bdf8;
            color: #0f172a;
            font-weight: 700;
            box-shadow: 0 4px 14px rgba(56, 189, 248, 0.4);
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

        /* Tab 1: Single Stage Contrast Canvas */
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
            background: #38bdf8;
            border-color: #38bdf8;
            color: #0f172a;
        }

        .contrast-single-stage {
            position: relative;
            overflow: hidden;
            background: #0f172a;
        }
        .contrast-single-stage img {
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
            background: rgba(56, 189, 248, 0.9);
            border: 2px solid white;
            color: #0f172a;
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
            background: #38bdf8;
            box-shadow: 0 0 18px rgba(56, 189, 248, 0.8);
        }
        .adj-hotspot.active {
            background: #22c55e !important;
            border-color: white !important;
            color: white !important;
            transform: translate(-50%, -50%) scale(1.3);
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.9);
            z-index: 8;
        }
        .adj-hotspot.partner-active {
            background: #f59e0b !important;
            border-color: white !important;
            color: white !important;
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.8);
            animation: pulseAmber 1.6s infinite ease-in-out;
            z-index: 7;
        }
        @keyframes pulseAmber {
            0%, 100% { box-shadow: 0 0 10px rgba(245, 158, 11, 0.6); }
            50% { box-shadow: 0 0 24px rgba(245, 158, 11, 1); }
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
            background: #38bdf8;
            border: none;
            color: #0f172a;
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
            background: #7dd3fc;
            transform: scale(1.05);
        }
        .adj-modpol-pill {
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid #f59e0b;
            color: #fbbf24;
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
            background: rgba(245, 158, 11, 0.25);
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
            color: #38bdf8;
            font-weight: 800;
        }
        .adj-example-box {
            background: rgba(56, 189, 248, 0.1);
            border-left: 4px solid #38bdf8;
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
            color: #38bdf8;
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
            color: #38bdf8;
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
            border-color: #38bdf8;
            transform: translateY(-2px);
            background: rgba(56, 189, 248, 0.1);
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
            background: #38bdf8;
            color: #0f172a;
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
            background: #7dd3fc;
            box-shadow: 0 4px 14px rgba(56, 189, 248, 0.4);
        }

        /* Grammar Guide Link Banner in Tab 5 */
        .adj-grammar-link-box {
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(168, 85, 247, 0.15));
            border: 1px solid rgba(56, 189, 248, 0.4);
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
            background: #38bdf8;
            color: #0f172a;
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
            background: #7dd3fc;
            transform: translateY(-2px);
        }
        .feedback-grammar-link {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            color: #38bdf8;
            font-weight: 700;
            margin-top: 0.6rem;
            text-decoration: underline;
            cursor: pointer;
        }
        .feedback-grammar-link:hover {
            color: #7dd3fc;
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
            border-color: #38bdf8;
            background: rgba(56, 189, 248, 0.15);
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
            border: 2px solid #38bdf8;
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
            background: #38bdf8;
            color: #0f172a;
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
        <h1>Felt 2: Tid, alder og tempo</h1>
        <p>Lær 20 centrale adjektiver om tid, tempo og forandring i hverdagen og på farten.</p>
    `;
    viewContainer.appendChild(heroHeader);

    // 6 Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'adj-tabs-nav';
    const tabs = [
        { id: 'tab_kontrast', label: '1. Kontrast-studiet', icon: '👁️' },
        { id: 'tab_antonym', label: '2. Find modpolen (Duel)', icon: '⚔️' },
        { id: 'tab_synonym', label: '3. Synonymer & Nuancer', icon: '🔄' },
        { id: 'tab_barometer', label: '4. Barometret (Skala)', icon: '⏱️' },
        { id: 'tab_kongruens', label: '5. Kongruens (-t / -e)', icon: '🧩' },
        { id: 'tab_historie', label: '6. Kontekst & Historie', icon: '📖' }
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
        tabsMenu.querySelectorAll('.adj-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.adj-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- DATA: 10 MODPOL-PAR (20 ADJEKTIVER) I FELT 2 ---
    // ========================================================
    const adjektivPar = [
        {
            id: 'par_1',
            wordA: {
                word: 'ny',
                x: 18, y: 72,
                itemLabel: 'Ny cykel 🚲',
                faelles: 'en ny cykel',
                intet: 'et nyt ur',
                flertal: 'de nye sko',
                context: 'Hun cykler på arbejde på en ny cykel.'
            },
            wordB: {
                word: 'gammel',
                x: 32, y: 68,
                itemLabel: 'Gammel cykel 🚲',
                faelles: 'en gammel taske',
                intet: 'et gammelt hus',
                flertal: 'de gamle bøger (bemærk: gamle!)',
                context: 'Den gamle cykel står ved stationen.'
            }
        },
        {
            id: 'par_2',
            wordA: {
                word: 'ung',
                x: 48, y: 65,
                itemLabel: 'Ung studerende 🎒',
                faelles: 'en ung kvinde',
                intet: 'et ungt menneske',
                flertal: 'de unge elever',
                context: 'En ung kvinde venter på bussen.'
            },
            wordB: {
                word: 'gammel',
                x: 62, y: 74,
                itemLabel: 'Gammel mand 👴',
                faelles: 'en gammel mand',
                intet: 'et gammelt træ',
                flertal: 'de gamle naboer',
                context: 'En gammel mand sidder på bænken.'
            }
        },
        {
            id: 'par_3',
            wordA: {
                word: 'tidlig',
                x: 58, y: 22,
                itemLabel: 'Tidlig afgang ⏰',
                faelles: 'en tidlig morgen',
                intet: 'et tidligt tog',
                flertal: 'de tidlige timer',
                context: 'Toget kører af sted på en tidlig morgen.'
            },
            wordB: {
                word: 'sen',
                x: 74, y: 22,
                itemLabel: 'Sen aften 🌙',
                faelles: 'en sen aften',
                intet: 'et sent tog',
                flertal: 'de sene timer',
                context: 'Han ankommer først med bussen en sen aften.'
            }
        },
        {
            id: 'par_4',
            wordA: {
                word: 'hurtig',
                x: 82, y: 55,
                itemLabel: 'Hurtigt tog 🚄',
                faelles: 'en hurtig bus',
                intet: 'et hurtigt tog',
                flertal: 'de hurtige cyklister',
                context: 'Toget til København er meget hurtigt.'
            },
            wordB: {
                word: 'langsom',
                x: 12, y: 52,
                itemLabel: 'Langsom gåtur 🚶',
                faelles: 'en langsom bus',
                intet: 'et langsomt tog',
                flertal: 'de langsomme biler',
                context: 'Bussen kører i langsom fart i myldretiden.'
            }
        },
        {
            id: 'par_5',
            wordA: {
                word: 'kortvarig',
                x: 38, y: 34,
                itemLabel: 'Kortvarig regn 🌦️',
                faelles: 'en kortvarig pause',
                intet: 'et kortvarigt stop',
                flertal: 'de kortvarige pauser',
                context: 'Toget gør kun et kortvarigt stop på stationen.'
            },
            wordB: {
                word: 'langvarig',
                x: 44, y: 45,
                itemLabel: 'Langvarig ventetid ⏳',
                faelles: 'en langvarig uddannelse',
                intet: 'et langvarigt kursus',
                flertal: 'de langvarige samtaler',
                context: 'Der var en langvarig ventetid ved billetkøen.'
            }
        },
        {
            id: 'par_6',
            wordA: {
                word: 'hyppig',
                x: 25, y: 36,
                itemLabel: 'Hyppig afgang 🔄',
                faelles: 'en hyppig gæst',
                intet: 'et hyppigt problem',
                flertal: 'de hyppige togafgange',
                context: 'Metroen har en hyppig afgang hvert andet minut.'
            },
            wordB: {
                word: 'sjælden',
                x: 88, y: 38,
                itemLabel: 'Sjælden bus 🚌',
                faelles: 'en sjælden fugl',
                intet: 'et sjældent syn',
                flertal: 'de sjældne afgange',
                context: 'Bussen til landsbyen har kun en sjælden afgang.'
            }
        },
        {
            id: 'par_7',
            wordA: {
                word: 'nuværende',
                x: 68, y: 48,
                itemLabel: 'Nuværende køreplan 📋',
                faelles: 'den nuværende adresse',
                intet: 'det nuværende arbejde',
                flertal: 'de nuværende regler',
                context: 'Kunderne kigger på den nuværende køreplan.'
            },
            wordB: {
                word: 'tidligere',
                x: 72, y: 62,
                itemLabel: 'Tidligere billet 🎫',
                faelles: 'den tidligere bolig',
                intet: 'det tidligere job',
                flertal: 'de tidligere priser',
                context: 'De tidligere billetter gælder ikke mere.'
            }
        },
        {
            id: 'par_8',
            wordA: {
                word: 'pludselig',
                x: 52, y: 82,
                itemLabel: 'Pludseligt stop 🛑',
                faelles: 'en pludselig lyd',
                intet: 'et pludseligt stop',
                flertal: 'de pludselige ændringer',
                context: 'Bussen lavede et pludseligt stop ved krydset.'
            },
            wordB: {
                word: 'gradvis',
                x: 35, y: 84,
                itemLabel: 'Gradvis fart 📈',
                faelles: 'en gradvis stigning',
                intet: 'et gradvist fald',
                flertal: 'de gradvise forbedringer',
                context: 'Toget sætter farten op i en gradvis bevægelse.'
            }
        },
        {
            id: 'par_9',
            wordA: {
                word: 'travl',
                x: 60, y: 55,
                itemLabel: 'Travl perron 🏃‍♂️',
                faelles: 'en travl dag',
                intet: 'et travlt kontor',
                flertal: 'de travle gader',
                context: 'Perronen er meget travl om morgenen.'
            },
            wordB: {
                word: 'rolig',
                x: 15, y: 26,
                itemLabel: 'Rolig krog ☕',
                faelles: 'en rolig aften',
                intet: 'et roligt sted',
                flertal: 'de rolige stunder',
                context: 'Manden sidder i et roligt hjørne og drikker kaffe.'
            }
        },
        {
            id: 'par_10',
            wordA: {
                word: 'forsinket',
                x: 80, y: 76,
                itemLabel: 'Forsinket bus ⚠️',
                faelles: 'en forsinket bus',
                intet: 'et forsinket tog',
                flertal: 'de forsinkede passagerer',
                context: 'Toget til Odense er 10 minutter forsinket.'
            },
            wordB: {
                word: 'punktlig',
                x: 85, y: 18,
                itemLabel: 'Punktlig afgang 🎯',
                faelles: 'en punktlig chauffør',
                intet: 'et punktligt tog',
                flertal: 'de punktlige afgange',
                context: 'Bussen kører altid på et punktligt minuttal.'
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
    instructionText.innerHTML = `💡 <em>Klik på et punkt for at høre udtale og se dets tids- eller tempomodpol på stationen!</em>`;
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
    stage.className = 'contrast-single-stage';
    stage.innerHTML = `<img src="assets/station_indkoeb_vrimmel.jpg" alt="Station og indkøb - Tid og tempo" />`;

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
                    <span style="font-size: 1.8rem;">⏱️</span>
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
        stage.appendChild(dotA);

        const dotB = document.createElement('div');
        dotB.className = 'adj-hotspot';
        dotB.style.left = `${pair.wordB.x}%`;
        dotB.style.top = `${pair.wordB.y}%`;
        dotB.textContent = '●';
        dotB.title = `${pair.wordB.word} ➔ Modpol: ${pair.wordA.word}`;
        dotB.dataset.word = pair.wordB.word;
        dotB.onclick = () => selectAdjective(pair.wordB.word);
        stage.appendChild(dotB);
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
            stimulus: 'Manden købte en <strong>NY</strong> cykel i butikken 🚲.',
            question: 'Hvad er den cykel, han har haft i 15 år?',
            targetWord: 'ny',
            correct: 'gammel 🚲',
            options: ['gammel 🚲', 'sen 🌙', 'langsom 🚶', 'kortvarig ⏱️'],
            wrongExplanation: 'Når noget er købt for nylig, er det nyt. Det modsatte af nyt er gammelt!',
            congruenceBonus: 'En <strong>ny</strong> cykel ↔ En <strong>gammel</strong> cykel (og et nyt ur ↔ et gammelt ur).'
        },
        {
            stimulus: 'Toget kører klokken 05:30 på en meget <strong>TIDLIG</strong> morgen 🌅.',
            question: 'Hvad er toget, der først kører klokken 23:45?',
            targetWord: 'tidlig',
            correct: 'sen 🌙',
            options: ['sen 🌙', 'langsom 🚶', 'rolig ☕', 'ung 🎒'],
            wrongExplanation: 'Tidlig og sen handler om tidspunktet på døgnet.',
            congruenceBonus: 'En <strong>tidlig</strong> morgen ↔ En <strong>sen</strong> aften (et tidligt tog ↔ et sent tog).'
        },
        {
            stimulus: 'Lyntoget til Odense er meget <strong>HURTIGT 🚄</strong>.',
            question: 'Hvad er bussen, som holder for rødt lys hele tiden?',
            targetWord: 'hurtig',
            correct: 'langsom 🐢',
            options: ['langsom 🐢', 'forsinket ⚠️', 'gammel 👴', 'tidlig 🌅'],
            wrongExplanation: 'Forsinket betyder, at man kommer for sent. Men selve tempoet er langsomt!',
            congruenceBonus: 'En <strong>hurtig</strong> bus ↔ En <strong>langsom</strong> bus (et hurtigt tog ↔ et langsomt tog).'
        },
        {
            stimulus: 'Perronen på stationen er utrolig <strong>TRAVL</strong> klokken otte 🏃.',
            question: 'Hvad er ventesalen, hvor der næsten ingen mennesker er?',
            targetWord: 'travl',
            correct: 'rolig ☕',
            options: ['rolig ☕', 'sjælden 🚌', 'punktlig 🎯', 'kortvarig ⏱️'],
            wrongExplanation: 'Når der ikke er stress og mange mennesker, er der roligt.',
            congruenceBonus: 'En <strong>travl</strong> dag ↔ En <strong>rolig</strong> dag (et travlt kontor ↔ et roligt kontor).'
        },
        {
            stimulus: 'Bussen kom 15 minutter for sent og var <strong>FORSINKET ⚠️</strong>.',
            question: 'Hvad er toget, der ankommer præcis på sekundet?',
            targetWord: 'forsinket',
            correct: 'punktlig 🎯',
            options: ['punktlig 🎯', 'hurtig 🚄', 'ny 🚲', 'tidlig 🌅'],
            wrongExplanation: 'Når man overholder køreplanen præcist til tiden, er man punktlig!',
            congruenceBonus: 'En <strong>forsinket</strong> bus ↔ En <strong>punktlig</strong> bus (et forsinket tog ↔ et punktligt tog).'
        },
        {
            stimulus: 'Der kørte en <strong>UNG</strong> kvinde med bussen 🎒.',
            question: 'Hvad kalder man personen, der er 85 år gammel?',
            targetWord: 'ung',
            correct: 'gammel 👴',
            options: ['gammel 👴', 'sen 🌙', 'travl 🏃', 'tidligere 📋'],
            wrongExplanation: 'Modpolen til ung i alder er gammel.',
            congruenceBonus: 'En <strong>ung</strong> person ↔ En <strong>gammel</strong> person (og de unge ↔ de gamle).'
        },
        {
            stimulus: 'Det var et <strong>KORTVARIGT</strong> stop på to minutter ⏱️.',
            question: 'Hvad kalder man en ventetid på tre timer?',
            targetWord: 'kortvarig',
            correct: 'langvarig ⏳',
            options: ['langvarig ⏳', 'langsom 🐢', 'forsinket ⚠️', 'hyppig 🔄'],
            wrongExplanation: 'Noget, der tager lang tid at gennemføre eller vente på, er langvarigt.',
            congruenceBonus: 'Et <strong>kortvarigt</strong> stop ↔ En <strong>langvarig</strong> ventetid.'
        },
        {
            stimulus: 'Metroen i byen har en <strong>HYPPIG</strong> afgang hvert andet minut 🔄.',
            question: 'Hvad er bussen, der kun kører én gang om dagen?',
            targetWord: 'hyppig',
            correct: 'sjælden 🚌',
            options: ['sjælden 🚌', 'forsinket ⚠️', 'rolig ☕', 'sen 🌙'],
            wrongExplanation: 'Noget, der sker tit, er hyppigt. Noget, der sker sjældent, har modsat frekvens!',
            congruenceBonus: 'En <strong>hyppig</strong> afgang ↔ En <strong>sjælden</strong> afgang.'
        },
        {
            stimulus: 'De kigger på den <strong>NUVÆRENDE</strong> køreplan for i år 📋.',
            question: 'Hvad kalder man køreplanen fra sidste år?',
            targetWord: 'nuværende',
            correct: 'tidligere 📁',
            options: ['tidligere 📁', 'gammel 👴', 'sen 🌙', 'forsinket ⚠️'],
            wrongExplanation: 'Den der gælder nu er nuværende, og den førhenværende er tidligere.',
            congruenceBonus: 'Den <strong>nuværende</strong> adresse ↔ Den <strong>tidligere</strong> adresse.'
        },
        {
            stimulus: 'Toget standsede med et <strong>PLUDSELIGT</strong> ryk 🛑.',
            question: 'Hvad kalder man en forandring, der sker stille og roligt trin for trin?',
            targetWord: 'pludselig',
            correct: 'gradvis 📈',
            options: ['gradvis 📈', 'langsom 🐢', 'rolig ☕', 'forsinket ⚠️'],
            wrongExplanation: 'En gradvis ændring sker lidt efter lidt, modsat en pludselig hændelse.',
            congruenceBonus: 'Et <strong>pludseligt</strong> stop ↔ En <strong>gradvis</strong> opbremsning.'
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
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Flot klaret i Antonym-duellen!</h2>
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
            word: 'hurtig',
            sentence: 'Toget kørte utrolig <strong>HURTIGT</strong>.',
            question: 'Hvilket ord betyder ekstremt hurtigt?',
            correct: 'lynhurtig',
            options: ['lynhurtig', 'langsom', 'forsinket', 'tidlig'],
            explanation: '"Lynhurtig" betyder så hurtig som et lyn.'
        },
        {
            word: 'ny',
            sentence: 'Hun har købt en <strong>NY</strong> jakke i butikken.',
            question: 'Hvilket ord understreger, at den aldrig er brugt før?',
            correct: 'splinterny',
            options: ['splinterny', 'gammeldags', 'pæn', 'sjælden'],
            explanation: '"Splinterny" bruges om ting, der lige er pakket ud af æsken.'
        },
        {
            word: 'gammel',
            sentence: 'Slottet i byen er meget <strong>GAMMELT</strong>.',
            question: 'Hvilket ord betyder flere hundrede år gammelt?',
            correct: 'urgammel / antik',
            options: ['urgammel / antik', 'tidligere', 'langvarig', 'rolig'],
            explanation: '"Urgammel" og "antik" bruges om meget høj alder og historie.'
        },
        {
            word: 'rolig',
            sentence: 'Byen og gaden var helt <strong>ROLIG</strong> om natten.',
            question: 'Hvilket ord betyder næsten det samme som rolig?',
            correct: 'fredelig / stille',
            options: ['fredelig / stille', 'travl', 'hurtig', 'sen'],
            explanation: '"Fredelig" og "stille" beskriver en atmosfære uden støj og stress.'
        },
        {
            word: 'punktlig',
            sentence: 'Chaufføren ankommer altid <strong>PUNKTLIGT</strong> på minuttet.',
            question: 'Hvilket udtryk betyder det samme i daglig tale?',
            correct: 'præcis til tiden',
            options: ['præcis til tiden', 'tidligt om morgenen', 'i god behold', 'med det samme'],
            explanation: 'At være punktlig betyder præcis at overholde det aftalte klokkeslæt.'
        },
        {
            word: 'kortvarig',
            sentence: 'De holdt en <strong>KORTVARIG</strong> pause fra arbejdet.',
            question: 'Hvilket ord beskriver noget, der kun varer et lille øjeblik?',
            correct: 'midlertidig / kort',
            options: ['midlertidig / kort', 'uendelig', 'forsinket', 'travl'],
            explanation: '"Midlertidig" og "kort" betyder, at det kun eksisterer i en begrænset stund.'
        },
        {
            word: 'travl',
            sentence: 'Kontoret havde en meget <strong>TRAVL</strong> uge.',
            question: 'Hvilket ord betyder, at der er masser af pres og gøremål?',
            correct: 'hektisk',
            options: ['hektisk', 'rolig', 'tom', 'sjælden'],
            explanation: '"Hektisk" beskriver høj aktivitet med højt tempo og travlhed.'
        },
        {
            word: 'pludselig',
            sentence: 'Bilen bremsede med en <strong>PLUDSELIG</strong> bevægelse.',
            question: 'Hvilket ord betyder næsten det samme?',
            correct: 'uventet / brat',
            options: ['uventet / brat', 'gradvis', 'langvarig', 'rolig'],
            explanation: 'Et "brat" stop sker helt uden varsel og uventet.'
        },
        {
            word: 'hyppig',
            sentence: 'Der er <strong>HYPPIGE</strong> tog mellem byerne.',
            question: 'Hvilket ord betyder næsten det samme?',
            correct: 'tætte / regelmæssige',
            options: ['tætte / regelmæssige', 'sjældne', 'langsomme', 'enkelte'],
            explanation: 'Når togafgange er tætte og regelmæssige, afgår de hyppigt.'
        },
        {
            word: 'tidligere',
            sentence: 'Han mødte sin <strong>TIDLIGERE</strong> kollega på banegården.',
            question: 'Hvilket ord betyder det samme som tidligere?',
            correct: 'forhenværende',
            options: ['forhenværende', 'nuværende', 'kommende', 'punktlige'],
            explanation: '"Forhenværende" betyder en person eller stilling, man havde før i tiden.'
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
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Godt tidsordforråd!</h2>
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
    // --- TAB 4: BAROMETRET (SKALAER FOR TID OG HASTIGHED) ---
    // ========================================================
    const panelBarometer = document.createElement('div');
    panelBarometer.className = 'adj-panel';
    panelBarometer.dataset.panel = 'tab_barometer';

    const barometerChallenges = [
        {
            title: '🏃 Skala 1: Hastighed & Tempo',
            desc: 'Arranger ordene efter hastighed fra langsomst til hurtigst:',
            lowLabel: '🐢 Langsomst',
            highLabel: '⚡ Hurtigst',
            correctOrder: ['sneglelangsom', 'langsom', 'moderat', 'hurtig', 'lynhurtig']
        },
        {
            title: '🎂 Skala 2: Alder',
            desc: 'Arranger ordene fra yngst til ældst:',
            lowLabel: '👶 Yngst',
            highLabel: '👴 Ældst',
            correctOrder: ['spæd', 'ung', 'midaldrende', 'gammel', 'urgammel']
        },
        {
            title: '⏳ Skala 3: Varighed',
            desc: 'Arranger begivenhederne fra kortest til længst varighed:',
            lowLabel: '⚡ Få sekunder',
            highLabel: '♾️ Meget lang tid',
            correctOrder: ['kortvarig', 'midlertidig', 'langvarig', 'permanent']
        },
        {
            title: '🔄 Skala 4: Hyppighed',
            desc: 'Arranger ordene efter hvor ofte noget sker:',
            lowLabel: '🚫 Næsten aldrig',
            highLabel: '🔁 Hele tiden',
            correctOrder: ['sjælden', 'lejlighedsvis', 'hyppig', 'konstant']
        },
        {
            title: '🎯 Skala 5: Punktlighed & Præcision',
            desc: 'Arranger fra mest forsinket til absolut præcis:',
            lowLabel: '⚠️ Meget for sent',
            highLabel: '🎯 Lige til tiden',
            correctOrder: ['meget forsinket', 'lidt forsinket', 'rettidig', 'punktlig']
        },
        {
            title: '📅 Skala 6: Aktualitet',
            desc: 'Arranger stadierne i en proces fra fortid til nutid:',
            lowLabel: '📜 Fortid',
            highLabel: '📍 Lige nu',
            correctOrder: ['tidligere', 'forhenværende', 'aktuel', 'nuværende']
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
                <span class="task-counter">⏱️ Barometer ${currentBarometerIndex + 1} af ${barometerChallenges.length}</span>
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
                        <strong>🎉 Perfekt sorteret!</strong> Du placerede ordene i helt rigtig rækkefølge:<br>
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
                    nextBtn.textContent = 'Du mestrer tidsbarometret! 🏆';
                    nextBtn.onclick = () => {
                        currentBarometerIndex = 0;
                        renderBarometerChallenge();
                    };
                }
                feedbackBox.appendChild(nextBtn);
            } else {
                feedbackBox.innerHTML = `
                    <div class="task-feedback-box wrong">
                        <strong>Ikke helt i mål endnu.</strong> Nogle af ordene står ikke i rigtig rækkefølge.<br>
                        Tip: Tænk på den laveste grad først og den højeste til sidst!
                    </div>
                `;
            }
        };

        updateUI();
    }

    renderBarometerChallenge();
    panelsHolder.appendChild(panelBarometer);

    // ========================================================
    // --- TAB 5: KONGRUENS-BYGGEREN (-T OG -E I TID) ---
    // ========================================================
    const panelKongruens = document.createElement('div');
    panelKongruens.className = 'adj-panel';
    panelKongruens.dataset.panel = 'tab_kongruens';

    const kongruensTasks = [
        {
            sentence: 'Vi nåede det ______ tog mod Aarhus.',
            correct: 'tidlige',
            options: ['tidlig', 'tidligt', 'tidlige'],
            rule: '<strong>Bestemt form (det ... tog):</strong> Når der står <em>det</em> foran, ender adjektivet altid på <strong>-e</strong>: <em>det tidlige tog</em> (ikke "tidligt"!).'
        },
        {
            sentence: 'Hun har købt et ______ ur i butikken.',
            correct: 'nyt',
            options: ['ny', 'nyt', 'nye'],
            rule: '<strong>Ubestemt intetkøn (et ur):</strong> Får <strong>-t</strong>: <em>et nyt ur</em> (en ny cykel).'
        },
        {
            sentence: 'Manden kørte i det ______ tog.',
            correct: 'hurtige',
            options: ['hurtig', 'hurtigt', 'hurtige'],
            rule: '<strong>Bestemt form (det ... tog):</strong> Får altid <strong>-e</strong>: <em>det hurtige tog</em>.'
        },
        {
            sentence: 'Toget til København var meget ______.',
            correct: 'hurtigt',
            options: ['hurtig', 'hurtigt', 'hurtige'],
            rule: '<strong>Prædikativ form (toget var...):</strong> Tog er intetkøn ("et tog") ➔ <em>toget var hurtigt</em> (bussen var hurtig).'
        },
        {
            sentence: 'Hvor er de ______ sko henne?',
            correct: 'nye',
            options: ['ny', 'nyt', 'nye'],
            rule: '<strong>Flertal (de sko):</strong> I flertal får adjektivet <strong>-e</strong>: <em>de nye sko</em>.'
        },
        {
            sentence: 'Manden boede i et ______ hus på landet.',
            correct: 'gammelt',
            options: ['gammel', 'gammelt', 'gamle'],
            rule: '<strong>Ubestemt intetkøn (et hus):</strong> Gammel hedder <em>gammelt</em> i intetkøn.'
        },
        {
            sentence: 'De to ______ venner gik en tur i parken.',
            correct: 'gamle',
            options: ['gammel', 'gammelt', 'gamle'],
            rule: '<strong>Flertal (to venner):</strong> Hedder <em>gamle</em> i flertal.'
        },
        {
            sentence: 'Vi ventede i en ______ pause.',
            correct: 'kortvarig',
            options: ['kortvarig', 'kortvarigt', 'kortvarige'],
            rule: '<strong>Ubestemt fælleskøn (en pause):</strong> Ingen endelse: <em>en kortvarig pause</em>.'
        },
        {
            sentence: 'Bussen var desværre ______ i morges.',
            correct: 'forsinket',
            options: ['forsinket', 'forsinkede', 'forsinketere'],
            rule: '<strong>Prædikativ ental (bussen var...):</strong> Fælleskøn ental: <em>bussen var forsinket</em> (busserne var forsinkede).'
        },
        {
            sentence: 'Alle togene var ______ på grund af sneen.',
            correct: 'forsinkede',
            options: ['forsinket', 'forsinkede', 'forsinketere'],
            rule: '<strong>Prædikativ flertal (togene var...):</strong> Flertal får altid <strong>-e</strong>: <em>togene var forsinkede</em>.'
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
                            Vil du have det fulde overblik over adjektivers bøjning?
                        </div>
                        <div style="color: #94a3b8; font-size: 0.92rem; margin-top: 0.2rem;">
                            Lær om grundform, -t ved intetkøn, og -e ved flertal og bestemt form.
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
                                    📖 Læs hele reglen i bøjningsguiden her ➔
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
                                    📖 Se bøjningsguiden for hjælp til -t og -e ➔
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
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Stærk tids-kongruens!</h2>
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
            story: 'Klokken er kun 05:00 om morgenen, og gaden er mørk. Det er en meget ______ morgen.',
            correct: 'tidlig',
            options: ['tidlig', 'sen', 'hurtig', 'ung'],
            explanation: 'Fem om morgenen er et meget tidligt tidspunkt på døgnet.'
        },
        {
            story: 'Toget skulle have kørt klokken 14:10, men det kører først 14:40. Toget er ______.',
            correct: 'forsinket',
            options: ['forsinket', 'punktligt', 'tidligt', 'roligt'],
            explanation: 'Når et tog kører en halv time for sent, er det forsinket.'
        },
        {
            story: 'Lyntoget stopper ikke i de små byer. Det er et meget ______ tog.',
            correct: 'hurtigt',
            options: ['hurtigt', 'langsomt', 'gammelt', 'tidligt'],
            explanation: 'Et lyntog kører hurtigt forbi de små stationer.'
        },
        {
            story: 'Han har arbejdet som læge i 40 år. Han er en ______ mand nu.',
            correct: 'gammel',
            options: ['gammel', 'ung', 'ny', 'kortvarig'],
            explanation: 'Efter 40 års arbejde er man en ældre eller gammel mand.'
        },
        {
            story: 'Mange mennesker løber for at nå deres tog på banegården. Der er meget ______.',
            correct: 'travlt',
            options: ['travlt', 'roligt', 'sjældent', 'forsinket'],
            explanation: 'Når folk løber frem og tilbage, er der travlt på stationen.'
        },
        {
            story: 'Kaffen på bordet blev kold under mødet, fordi mødet var meget ______.',
            correct: 'langvarigt',
            options: ['langvarigt', 'kortvarigt', 'hurtigt', 'punktligt'],
            explanation: 'Et langvarigt møde tager mange timer.'
        },
        {
            story: 'Bussen kører hvert femte minut hele dagen. Det er en meget ______ afgang.',
            correct: 'hyppig',
            options: ['hyppig', 'sjælden', 'rolig', 'tidlig'],
            explanation: 'Afgange hvert 5. minut er særdeles hyppige.'
        },
        {
            story: 'Toget standsede med ét stort brag, helt uden varsel. Det var et ______ stop.',
            correct: 'pludseligt',
            options: ['pludseligt', 'gradvist', 'roligt', 'langsomt'],
            explanation: 'Et stop uden varsel kaldes et pludseligt stop.'
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
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Super flot forståelse af tid og tempo!</h2>
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

    container.appendChild(viewContainer);
}
