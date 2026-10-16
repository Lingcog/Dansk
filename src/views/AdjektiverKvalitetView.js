import { getTranslation, getLang } from '../utils/i18n.js';
import { formatNounLinks, attachNounLinkListeners } from '../utils/nounQuickPeekModal.js';

/**
 * AdjektiverKvalitetView - Felt 3: Kvalitet, sværhedsgrad og økonomi
 * Dækker 20 af de mest almindelige vurderings- og økonomiadjektiver på dansk (10 kontrast-par):
 * 1. Kontrast-studiet (Visuel flade i byrummet med 20 hotspots og modpol-kobling)
 * 2. Find modpolen (Antonym-duellen - simple sætninger med kendte substantiver)
 * 3. Synonymer & Nuancer (Hverdagsnuancer)
 * 4. Barometret (Vurderings-, pris- og sværhedsgradsskalaer)
 * 5. Kongruens-byggeren (Fælde-træning: -t, -e og ubøjelige adjektiver som "gratis")
 * 6. Kontekst & Historie (Hverdagssituationer fra butikker, arbejde og hverdagsøkonomi)
 */
export function renderAdjektiverKvalitetView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adjektiver-fysik-view adjektiver-kvalitet-view';

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
        .adjektiver-kvalitet-view {
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
            background: linear-gradient(135deg, #10b981, #06b6d4, #3b82f6);
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
            background: #10b981;
            color: #064e3b;
            font-weight: 700;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
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
            background: #10b981;
            border-color: #10b981;
            color: #064e3b;
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
        .stage-half-header.warm { color: #10b981; border-color: rgba(16, 185, 129, 0.4); }
        .stage-half-header.cool { color: #f43f5e; border-color: rgba(244, 63, 94, 0.4); }

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
            background: rgba(16, 185, 129, 0.9);
            border: 2px solid white;
            color: #064e3b;
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
            background: #10b981;
            box-shadow: 0 0 18px rgba(16, 185, 129, 0.8);
        }
        .adj-hotspot.active {
            background: #3b82f6 !important;
            border-color: white !important;
            color: white !important;
            transform: translate(-50%, -50%) scale(1.3);
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.9);
            z-index: 8;
        }
        .adj-hotspot.partner-active {
            background: #ec4899 !important;
            border-color: white !important;
            color: white !important;
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.8);
            animation: pulsePink 1.6s infinite ease-in-out;
            z-index: 7;
        }
        @keyframes pulsePink {
            0%, 100% { box-shadow: 0 0 10px rgba(236, 72, 153, 0.6); }
            50% { box-shadow: 0 0 24px rgba(236, 72, 153, 1); }
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
            background: #10b981;
            border: none;
            color: #064e3b;
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
            background: #34d399;
            transform: scale(1.05);
        }
        .adj-modpol-pill {
            background: rgba(236, 72, 153, 0.15);
            border: 1px solid #ec4899;
            color: #f472b6;
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
            background: rgba(236, 72, 153, 0.25);
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
            color: #10b981;
            font-weight: 800;
        }
        .adj-example-box {
            background: rgba(16, 185, 129, 0.1);
            border-left: 4px solid #10b981;
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
            color: #10b981;
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
            color: #10b981;
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
            border-color: #10b981;
            transform: translateY(-2px);
            background: rgba(16, 185, 129, 0.1);
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
            background: #10b981;
            color: #064e3b;
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
            background: #34d399;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
        }

        /* Grammar Guide Link Banner in Tab 5 */
        .adj-grammar-link-box {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(56, 189, 248, 0.15));
            border: 1px solid rgba(16, 185, 129, 0.4);
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
            background: #10b981;
            color: #064e3b;
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
            background: #34d399;
            transform: translateY(-2px);
        }
        .feedback-grammar-link {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            color: #10b981;
            font-weight: 700;
            margin-top: 0.6rem;
            text-decoration: underline;
            cursor: pointer;
        }
        .feedback-grammar-link:hover {
            color: #34d399;
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
            border-color: #10b981;
            background: rgba(16, 185, 129, 0.15);
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
            border: 2px solid #10b981;
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
            background: #10b981;
            color: #064e3b;
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
        <h1>Felt 3: Kvalitet, sværhedsgrad og økonomi</h1>
        <p>Lær 20 uundværlige adjektiver til at vurdere værdi, priser, rigtighed og sværhedsgrad.</p>
    `;
    viewContainer.appendChild(heroHeader);

    // 6 Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'adj-tabs-nav';
    const tabs = [
        { id: 'tab_kontrast', label: '1. Kontrast-studiet', icon: '👁️' },
        { id: 'tab_antonym', label: '2. Find modpolen (Duel)', icon: '⚔️' },
        { id: 'tab_synonym', label: '3. Synonymer & Nuancer', icon: '🔄' },
        { id: 'tab_barometer', label: '4. Barometret (Skala)', icon: '💎' },
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
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/adjektiver_kvalitet/' + tabId);
        tabsMenu.querySelectorAll('.adj-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.adj-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- DATA: 10 MODPOL-PAR (20 ADJEKTIVER) I FELT 3 ---
    // ========================================================
    const adjektivPar = [
        {
            id: 'par_1',
            wordA: {
                word: 'god',
                side: 'left',
                x: 58, y: 73,
                itemLabel: 'God kaffe ☕',
                faelles: 'en god kaffe',
                intet: 'et godt måltid',
                flertal: 'de gode croissanter',
                context: 'Kaffen på cafébordet smager rigtig godt.'
            },
            wordB: {
                word: 'dårlig',
                side: 'right',
                x: 32, y: 72,
                itemLabel: 'Dårlig kaffe ☕',
                faelles: 'en dårlig kaffe',
                intet: 'et dårligt måltid',
                flertal: 'de dårlige kopper',
                context: 'Kaffen i den skårede kop smagte brændt og dårligt.'
            }
        },
        {
            id: 'par_2',
            wordA: {
                word: 'let',
                side: 'left',
                x: 70, y: 42,
                itemLabel: 'Let adgang 🚪',
                faelles: 'en let lektie',
                intet: 'et let spil',
                flertal: 'de lette opgaver',
                context: 'Det er let at gå ind i den åbne butik.'
            },
            wordB: {
                word: 'svær',
                side: 'right',
                x: 36, y: 32,
                itemLabel: 'Svær reparation 📻',
                faelles: 'en svær opgave',
                intet: 'et svært spørgsmål',
                flertal: 'de svære værktøjer',
                context: 'Det er en svær opgave at reparere den gamle radio.'
            }
        },
        {
            id: 'par_3',
            wordA: {
                word: 'dyr',
                side: 'left',
                x: 32, y: 48,
                itemLabel: 'Dyrt guldur ⌚',
                faelles: 'en dyr jakke',
                intet: 'et dyrt ur',
                flertal: 'de dyre butikker',
                context: 'Gulduret i butiksvinduet er meget dyrt.'
            },
            wordB: {
                word: 'billig',
                side: 'right',
                x: 23, y: 53,
                itemLabel: 'Billigt legetøj 🧸',
                faelles: 'en billig kasse',
                intet: 'et billigt stykke legetøj',
                flertal: 'de billige varer',
                context: 'I papkassen sælger de billige sager for få kroner.'
            }
        },
        {
            id: 'par_4',
            wordA: {
                word: 'vigtig',
                side: 'left',
                x: 21, y: 38,
                itemLabel: 'Vigtig aftale 📜',
                faelles: 'en vigtig besked',
                intet: 'et vigtigt brev',
                flertal: 'de vigtige papirer',
                context: 'Butikkens varer står ordnet i vigtig rækkefølge.'
            },
            wordB: {
                word: 'ligegyldig',
                side: 'right',
                x: 58, y: 45,
                itemLabel: 'Ligegyldigt skab 🗄️',
                faelles: 'en ligegyldig snak',
                intet: 'et ligegyldigt rygte',
                flertal: 'de ligegyldige ting',
                context: 'Det gamle skab står tomt med ligegyldige sager.'
            }
        },
        {
            id: 'par_5',
            wordA: {
                word: 'nødvendig',
                side: 'left',
                x: 50, y: 8,
                itemLabel: 'Nødvendig markise ⛱️',
                faelles: 'en nødvendig pause',
                intet: 'et nødvendigt tag',
                flertal: 'de nødvendige ting',
                context: 'Markisen over caféen er nødvendig for at give skygge.'
            },
            wordB: {
                word: 'unødvendig',
                side: 'right',
                x: 8, y: 35,
                itemLabel: 'Unødvendigt ragelse 📦',
                faelles: 'en unødvendig udgift',
                intet: 'et unødvendigt køb',
                flertal: 'de unødvendige ting',
                context: 'I baggården står der mange unødvendige kasser.'
            }
        },
        {
            id: 'par_6',
            wordA: {
                word: 'rigtig',
                side: 'left',
                x: 92, y: 46,
                itemLabel: 'Rigtig vej 🧭',
                faelles: 'en rigtig vej',
                intet: 'et rigtigt svar',
                flertal: 'de rigtige adresser',
                context: 'Den rene gade viser den helt rigtige vej til torvet.'
            },
            wordB: {
                word: 'forkert',
                side: 'right',
                x: 12, y: 74,
                itemLabel: 'Forkert vej 🕳️',
                faelles: 'en forkert vej',
                intet: 'et forkert svar',
                flertal: 'de forkerte veje',
                context: 'Det revnede fortov førte den forkerte vej ind i baggården.'
            }
        },
        {
            id: 'par_7',
            wordA: {
                word: 'perfekt',
                side: 'left',
                x: 72, y: 71,
                itemLabel: 'Perfekt croissant 🥐',
                faelles: 'en perfekt dag',
                intet: 'et perfekt bagværk',
                flertal: 'de perfekte rammer',
                context: 'Croissanten er bagt med et helt perfekt gyldent resultat.'
            },
            wordB: {
                word: 'mangelfuld',
                side: 'right',
                x: 76, y: 48,
                itemLabel: 'Mangelfuld cykel 🚲',
                faelles: 'en mangelfuld cykel',
                intet: 'et mangelfuldt hjul',
                flertal: 'de mangelfulde dele',
                context: 'Cyklen mangler sit forhjul og er helt mangelfuld.'
            }
        },
        {
            id: 'par_8',
            wordA: {
                word: 'nyttig',
                side: 'left',
                x: 66, y: 84,
                itemLabel: 'Nyttig app 📱',
                faelles: 'en nyttig app',
                intet: 'et nyttigt råd',
                flertal: 'de nyttige apps',
                context: 'Telefonen på bordet er et yderst nyttigt redskab.'
            },
            wordB: {
                word: 'ubrugelig',
                side: 'right',
                x: 42, y: 83,
                itemLabel: 'Ubrugelig nøgle 🗝️',
                faelles: 'en ubrugelig nøgle',
                intet: 'et ubrugeligt værktøj',
                flertal: 'de ubrugelige nøgler',
                context: 'Den bøjede nøgle passer ikke til låsen og er ubrugelig.'
            }
        },
        {
            id: 'par_9',
            wordA: {
                word: 'gratis',
                side: 'left',
                x: 84, y: 74,
                itemLabel: 'Gratis gave 🎁',
                faelles: 'en gratis gave',
                intet: 'et gratis måltid (aldrig -t!)',
                flertal: 'de gratis gaver (aldrig -e!)',
                context: 'Gaveæsken på bordet var en helt gratis velkomstgave.'
            },
            wordB: {
                word: 'betalt',
                side: 'right',
                x: 88, y: 78,
                itemLabel: 'Betalte penge 💵',
                faelles: 'en betalt regning',
                intet: 'et betalt arbejde',
                flertal: 'de betalte sedler',
                context: 'Der ligger en stak betalte pengesedler på træbordet.'
            }
        },
        {
            id: 'par_10',
            wordA: {
                word: 'simpel',
                side: 'left',
                x: 3, y: 72,
                itemLabel: 'Simpel krukke 🪴',
                faelles: 'en simpel krukke',
                intet: 'et simpelt design',
                flertal: 'de simple krukker',
                context: 'Blomsterkrukken har et smukt og helt simpelt design.'
            },
            wordB: {
                word: 'kompliceret',
                side: 'right',
                x: 67, y: 73,
                itemLabel: 'Kompliceret kabelrod 🔌',
                faelles: 'en kompliceret sag',
                intet: 'et kompliceret kabelnet',
                flertal: 'de komplicerede ledninger',
                context: 'Ledningerne ligger i et meget kompliceret virvar.'
            }
        }
    ];

    const alleOrdMap = {};
    adjektivPar.forEach(pair => {
        alleOrdMap[pair.wordA.word] = { me: pair.wordA, other: pair.wordB, pairId: pair.id };
        alleOrdMap[pair.wordB.word] = { me: pair.wordB, other: pair.wordA, pairId: pair.id };
    });

    // ========================================================
    // --- TAB 1: KONTRAST-STUDIET (SPLIT-SCREEN MODPOL-FLADE)
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
    instructionText.innerHTML = `💡 <em>Klik på et punkt for at høre udtale og se dets modpol i den modsatte scene!</em>`;
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
        <div class="stage-half-header warm">💎 Høj kvalitet & luksus (10 egenskaber)</div>
        <img src="assets/adjektiver_kvalitet_venstre.jpg" alt="Høj kvalitet og orden" />
    `;

    const rightHalf = document.createElement('div');
    rightHalf.className = 'stage-half';
    rightHalf.innerHTML = `
        <div class="stage-half-header cool">⚙️ Mangler, slid & besvær (10 modpoler)</div>
        <img src="assets/adjektiver_kvalitet_hoejre.jpg" alt="Mangler og slid" />
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
                    <span style="font-size: 1.8rem;">${item.me.side === 'left' ? '💎' : '⚙️'}</span>
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
            stimulus: 'Maden på restauranten var rigtig <strong>GOD 🍽️</strong>.',
            question: 'Hvad var maden, hvis den smagte brændt og uspiseligt?',
            targetWord: 'god',
            correct: 'dårlig 🤢',
            options: ['dårlig 🤢', 'svær 📚', 'dyr 🏬', 'forkert 🚌'],
            wrongExplanation: 'Modpolen til god kvalitet er dårlig.',
            congruenceBonus: 'En <strong>god</strong> ven ↔ En <strong>dårlig</strong> ven (et godt måltid ↔ et dårligt måltid).'
        },
        {
            stimulus: 'Opgaven i skolen var meget <strong>SVÆR 📚</strong>.',
            question: 'Hvad er opgaven, som eleven kan løse på to minutter?',
            targetWord: 'svær',
            correct: 'let ✏️',
            options: ['let ✏️', 'billig 🍎', 'gratis 📰', 'simpel 📌'],
            wrongExplanation: 'Når vi taler om sværhedsgrad, er modpolen til svær let!',
            congruenceBonus: 'En <strong>svær</strong> opgave ↔ En <strong>let</strong> opgave (et svært spørgsmål ↔ et let spørgsmål).'
        },
        {
            stimulus: 'Jakken i butikken koster 3.000 kroner – den er <strong>DYR 🏬</strong>.',
            question: 'Hvad er jakken, der kun koster 100 kroner?',
            targetWord: 'dyr',
            correct: 'billig 🏷️',
            options: ['billig 🏷️', 'let ✏️', 'gratis 📰', 'dårlig 🌧️'],
            wrongExplanation: 'Om priser og økonomi hedder modpolerne dyr og billig.',
            congruenceBonus: 'En <strong>dyr</strong> jakke ↔ En <strong>billig</strong> jakke (et dyrt ur ↔ et billigt ur).'
        },
        {
            stimulus: 'Det var en meget <strong>VIGTIG</strong> besked fra lægen ✉️.',
            question: 'Hvad er et rygte, som ingen behøver at bekymre sig om?',
            targetWord: 'vigtig',
            correct: 'ligegyldig 💬',
            options: ['ligegyldig 💬', 'forkert 🚌', 'mangelfuld 📝', 'ubrugelig 🗝️'],
            wrongExplanation: 'Noget, der har stor betydning, er vigtigt. Det modsatte er ligegyldigt.',
            congruenceBonus: 'En <strong>vigtig</strong> aftale ↔ En <strong>ligegyldig</strong> detalje.'
        },
        {
            stimulus: 'Et pas er <strong>NØDVENDIGT</strong> for at rejse til udlandet 🛂.',
            question: 'Hvad er en ekstra udgift, man sagtens kan undvære?',
            targetWord: 'nødvendig',
            correct: 'unødvendig 🛍️',
            options: ['unødvendig 🛍️', 'billig 🏷️', 'forkert 🚌', 'simpel 📌'],
            wrongExplanation: 'Det man ikke behøver, er unødvendigt.',
            congruenceBonus: 'En <strong>nødvendig</strong> ting ↔ En <strong>unødvendig</strong> ting.'
        },
        {
            stimulus: 'Eleven gav det helt <strong>RIGTIGE</strong> svar til læreren ✔️.',
            question: 'Hvad kalder man et svar, der indeholder en fejl?',
            targetWord: 'rigtig',
            correct: 'forkert ❌',
            options: ['forkert ❌', 'dårlig 🌧️', 'ubrugelig 🗝️', 'svær 📚'],
            wrongExplanation: 'Korrekt hedder rigtig på dansk, og med fejl hedder forkert.',
            congruenceBonus: 'Et <strong>rigtigt</strong> svar ↔ Et <strong>forkert</strong> svar.'
        },
        {
            stimulus: 'Kagen var bagt med et <strong>PERFEKT</strong> resultat 🎂.',
            question: 'Hvad kalder man et resultat, hvor halvdelen af ingredienserne mangler?',
            targetWord: 'perfekt',
            correct: 'mangelfuld 📝',
            options: ['mangelfuld 📝', 'svær 📚', 'kompliceret ⚖️', 'dyr 🏬'],
            wrongExplanation: 'Når noget mangler vigtige dele, er det mangelfuldt.',
            congruenceBonus: 'En <strong>perfekt</strong> dag ↔ En <strong>mangelfuld</strong> rapport.'
        },
        {
            stimulus: 'Kortet på telefonen var yderst <strong>NYTTIGT</strong> i den fremmede by 📱.',
            question: 'Hvad er nøglen, der er knækket og ikke kan åbne døren?',
            targetWord: 'nyttig',
            correct: 'ubrugelig 🗝️',
            options: ['ubrugelig 🗝️', 'billig 🏷️', 'forkert ❌', 'unødvendig 🛍️'],
            wrongExplanation: 'Når noget ikke kan bruges til sit formål, er det ubrugeligt.',
            congruenceBonus: 'Et <strong>nyttigt</strong> råd ↔ En <strong>ubrugelig</strong> nøgle.'
        },
        {
            stimulus: 'Avisen koster 0 kroner – den er helt <strong>GRATIS 📰</strong>.',
            question: 'Hvad kalder man en vare eller ydelse, man skal betale for?',
            targetWord: 'gratis',
            correct: 'betalt 💳',
            options: ['betalt 💳', 'dyr 🏬', 'nødvendig 🛂', 'svær 📚'],
            wrongExplanation: 'Modpolen til gratis er betalt.',
            congruenceBonus: 'En <strong>gratis</strong> avis ↔ En <strong>betalt</strong> regning.'
        },
        {
            stimulus: 'Opskriften var helt <strong>SIMPEL</strong> med kun tre ingredienser 📌.',
            question: 'Hvad kalder man en lovtekst, der er svær at forstå med 50 paragraffer?',
            targetWord: 'simpel',
            correct: 'kompliceret ⚖️',
            options: ['kompliceret ⚖️', 'mangelfuld 📝', 'ubrugelig 🗝️', 'dårlig 🌧️'],
            wrongExplanation: 'Noget med mange indviklede dele er kompliceret.',
            congruenceBonus: 'En <strong>simpel</strong> regel ↔ En <strong>kompliceret</strong> regel.'
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
            word: 'god',
            sentence: 'Maden på bordet smagte <strong>GODT</strong>.',
            question: 'Hvilket ord betyder usædvanlig god?',
            correct: 'fremragende / lækker',
            options: ['fremragende / lækker', 'dyr', 'let', 'simpel'],
            explanation: '"Fremragende" bruges om noget, der er i særklasse godt.'
        },
        {
            word: 'dårlig',
            sentence: 'Filmen i biografen var utrolig <strong>DÅRLIG</strong>.',
            question: 'Hvilket ord betyder helt forfærdelig dårlig?',
            correct: 'elendig',
            options: ['elendig', 'billig', 'svær', 'ubrugelig'],
            explanation: '"Elendig" udtrykker meget ringe kvalitet.'
        },
        {
            word: 'svær',
            sentence: 'Eksamen var meget <strong>SVÆR</strong> for eleverne.',
            question: 'Hvilket ord betyder det samme som svær?',
            correct: 'vanskelig',
            options: ['vanskelig', 'tung', 'kompliceret', 'umulig'],
            explanation: '"Vanskelig" er et meget almindeligt synonym for svær.'
        },
        {
            word: 'let',
            sentence: 'Det var en meget <strong>LET</strong> opgave.',
            question: 'Hvilket hverdagsudtryk betyder, at det er let som en leg?',
            correct: 'nem',
            options: ['nem', 'billig', 'rolig', 'lille'],
            explanation: '"Nem" bruges hver eneste dag i talesprog om opgaver, der er lette.'
        },
        {
            word: 'dyr',
            sentence: 'Bilen koster en formue – den er <strong>DYR</strong>.',
            question: 'Hvilket udtryk beskriver en meget høj pris?',
            correct: 'pebret / kostbar',
            options: ['pebret / kostbar', 'svær', 'vigtig', 'betalt'],
            explanation: 'Man siger ofte i folkemunde: "Det var godt nok en pebret pris!"'
        },
        {
            word: 'billig',
            sentence: 'Trøjen var sat ned til halv pris og var <strong>BILLIG</strong>.',
            question: 'Hvilket ord beskriver et godt økonomisk tilbud?',
            correct: 'prisvenlig',
            options: ['prisvenlig', 'gratis', 'enkel', 'mangelfuld'],
            explanation: '"Prisvenlig" bruges om varer, som de fleste har råd til.'
        },
        {
            word: 'vigtig',
            sentence: 'Mødet med chefen er af <strong>VIGTIG</strong> betydning.',
            question: 'Hvilket ord betyder afgørende vigtig?',
            correct: 'betydningsfuld / essentiel',
            options: ['betydningsfuld / essentiel', 'ligegyldig', 'simpel', 'punktlig'],
            explanation: '"Betydningsfuld" og "essentiel" understreger sagens store vægt.'
        },
        {
            word: 'rigtig',
            sentence: 'Kunden indtastede den <strong>RIGTIGE</strong> kode.',
            question: 'Hvilket fremmedord bruges ofte på dansk for rigtig?',
            correct: 'korrekt',
            options: ['korrekt', 'perfekt', 'nyttig', 'enkel'],
            explanation: '"Korrekt" betyder fri for fejl og helt i overensstemmelse med facit.'
        },
        {
            word: 'nyttig',
            sentence: 'Rådene fra studievejlederen var meget <strong>NYTTIGE</strong>.',
            question: 'Hvilket ord betyder det samme?',
            correct: 'gavnlig / brugbar',
            options: ['gavnlig / brugbar', 'billig', 'svær', 'rolig'],
            explanation: 'Noget, man har gavn af i praksis, er gavnligt eller brugbart.'
        },
        {
            word: 'simpel',
            sentence: 'Vejledningen til maskinen var meget <strong>SIMPEL</strong>.',
            question: 'Hvilket ord betyder overskuelig og let at forstå?',
            correct: 'enkel',
            options: ['enkel', 'kort', 'ubrugelig', 'gratis'],
            explanation: '"Enkel" er det mest naturlige danske synonym for simpel.'
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
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Flot ordforråd i vurdering!</h2>
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
    // --- TAB 4: BAROMETRET (SKALAER FOR KVALITET OG VÆRDI) ---
    // ========================================================
    const panelBarometer = document.createElement('div');
    panelBarometer.className = 'adj-panel';
    panelBarometer.dataset.panel = 'tab_barometer';

    const barometerChallenges = [
        {
            title: '⭐ Skala 1: Kvalitet',
            desc: 'Arranger vurderingerne fra dårligst til bedst:',
            lowLabel: '🗑️ Dårligst',
            highLabel: '🏆 Bedst',
            correctOrder: ['elendig', 'dårlig', 'jævn', 'god', 'fremragende']
        },
        {
            title: '🧠 Skala 2: Sværhedsgrad',
            desc: 'Arranger opgaverne fra lettest til sværest:',
            lowLabel: '👶 Lettest',
            highLabel: '🧩 Sværest',
            correctOrder: ['børnelet', 'let', 'overkommelig', 'svær', 'umulig']
        },
        {
            title: '💰 Skala 3: Prisniveau',
            desc: 'Arranger efter pris fra koster intet til ekstremt dyr:',
            lowLabel: '🪙 0 kr.',
            highLabel: '💎 Formue',
            correctOrder: ['gratis', 'billig', 'rimelig', 'dyr', 'ubetalelig']
        },
        {
            title: '📌 Skala 4: Vigtighed & Prioritet',
            desc: 'Arranger informationer fra helt ligegyldig til uundværlig:',
            lowLabel: '💤 Ligegyldig',
            highLabel: '🚨 Uundværlig',
            correctOrder: ['ligegyldig', 'mindre vigtig', 'vigtig', 'uundværlig']
        },
        {
            title: '🔍 Skala 5: Fuldstændighed',
            desc: 'Arranger rapportens kvalitet fra ubrugelig til perfekt:',
            lowLabel: '❌ Ubrugelig',
            highLabel: '💯 Perfekt',
            correctOrder: ['ubrugelig', 'mangelfuld', 'godkendt', 'perfekt']
        },
        {
            title: '⚙️ Skala 6: Kompleksitet',
            desc: 'Arranger reglerne fra simpleste til mest komplicerede:',
            lowLabel: '🔹 Simplest',
            highLabel: '🌀 Mest kompliceret',
            correctOrder: ['ultrasimpel', 'simpel', 'detaljeret', 'kompliceret']
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
                <span class="task-counter">💎 Barometer ${currentBarometerIndex + 1} af ${barometerChallenges.length}</span>
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
                    nextBtn.textContent = 'Du mestrer vurderingsbarometret! 🏆';
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
                        Tip: Tænk på det svageste udtryk først og det mest markante til sidst!
                    </div>
                `;
            }
        };

        updateUI();
    }

    renderBarometerChallenge();
    panelsHolder.appendChild(panelBarometer);

    // ========================================================
    // --- TAB 5: KONGRUENS-BYGGEREN (-T, -E OG GRATIS-FÆLDEN) ---
    // ========================================================
    const panelKongruens = document.createElement('div');
    panelKongruens.className = 'adj-panel';
    panelKongruens.dataset.panel = 'tab_kongruens';

    const kongruensTasks = [
        {
            sentence: 'Maden smagte helt fantastisk, det var et ______ måltid.',
            correct: 'godt',
            options: ['god', 'godt', 'gode'],
            rule: '<strong>Ubestemt intetkøn (et måltid):</strong> God får <strong>-t</strong> i intetkøn: <em>et godt måltid</em>.'
        },
        {
            sentence: 'Hun læste de ______ bøger på biblioteket.',
            correct: 'gode',
            options: ['god', 'godt', 'gode'],
            rule: '<strong>Flertal (de bøger):</strong> Får altid <strong>-e</strong>: <em>de gode bøger</em>.'
        },
        {
            sentence: 'Læreren stillede et meget ______ spørgsmål.',
            correct: 'svært',
            options: ['svær', 'svært', 'svære'],
            rule: '<strong>Ubestemt intetkøn (et spørgsmål):</strong> Svær får <strong>-t</strong>: <em>et svært spørgsmål</em>.'
        },
        {
            sentence: 'Uret i butikken er alt for ______.',
            correct: 'dyrt',
            options: ['dyr', 'dyrt', 'dyre'],
            rule: '<strong>Prædikativ form (uret er...):</strong> Ur er intetkøn ("et ur") ➔ <em>uret er dyrt</em> (jakken er dyr).'
        },
        {
            sentence: 'Postbuddet havde et ______ brev med til familien.',
            correct: 'vigtigt',
            options: ['vigtig', 'vigtigt', 'vigtige'],
            rule: '<strong>Ubestemt intetkøn (et brev):</strong> Får <strong>-t</strong>: <em>et vigtigt brev</em>.'
        },
        {
            sentence: 'De to studerende tog det ______ tog mod Odense.',
            correct: 'rigtige',
            options: ['rigtig', 'rigtigt', 'rigtige'],
            rule: '<strong>Bestemt form (det ... tog):</strong> Når der står <em>det</em> foran, ender adjektivet altid på <strong>-e</strong>: <em>det rigtige tog</em>.'
        },
        {
            sentence: 'Skolen tilbyder et ______ kursus i dansk for alle borgere.',
            correct: 'gratis',
            options: ['gratis', 'gratist', 'gratise'],
            rule: '<strong>⚠️ Stor bøjningsfælde (gratis):</strong> Adjektivet "gratis" bøjes <strong>ALDRIG</strong>! Det hedder <em>en gratis avis</em>, <em>et gratis kursus</em> og <em>to gratis billetter</em>.'
        },
        {
            sentence: 'Vi fik to ______ billetter til biografen.',
            correct: 'gratis',
            options: ['gratis', 'gratise', 'gratisere'],
            rule: '<strong>⚠️ Flertal af gratis:</strong> Får heller ikke -e! Det hedder altid bare <em>gratis billetter</em>.'
        },
        {
            sentence: 'Spillet har nogle meget ______ regler, som alle kan forstå.',
            correct: 'simple',
            options: ['simpel', 'simpelt', 'simple'],
            rule: '<strong>Flertal af simpel:</strong> Simpel mister midterste -e- og får -e til sidst: <em>simple regler</em> (ikke "simpele").'
        },
        {
            sentence: 'Regningen blev betalt, så den er ______ nu.',
            correct: 'betalt',
            options: ['betalt', 'betalte', 'betaltede'],
            rule: '<strong>Ental fælleskøn:</strong> En regning er <em>betalt</em> (regningerne er <em>betalte</em>).'
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
                            Vil du lære bøjning af uregelmæssige adjektiver?
                        </div>
                        <div style="color: #94a3b8; font-size: 0.92rem; margin-top: 0.2rem;">
                            Se hvordan "god/godt/gode", "simpel/simple" og ubøjelige ord som "gratis" fungerer.
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
                                    📖 Læs hele bøjningsreglen her ➔
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
                                    📖 Se bøjningsguiden for hjælp til reglerne ➔
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
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Stærk bøjningsindsigt!</h2>
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
            story: 'Bogen koster 0 kroner, fordi biblioteket låner den ud. Det er helt ______.',
            correct: 'gratis',
            options: ['gratis', 'dyrt', 'svært', 'vigtigt'],
            explanation: 'Når noget koster 0 kroner, er det gratis.'
        },
        {
            story: 'Manden steg ind i linje 5A i stedet for 2A og endte i den forkerte bydel. Han tog den ______ bus.',
            correct: 'forkerte',
            options: ['forkerte', 'rigtige', 'dyre', 'simple'],
            explanation: 'Når man tager den bus, der kører et andet sted hen, er det den forkerte bus.'
        },
        {
            story: 'Hun har glemt koden til sit dankort og kan ikke betale. Det er et meget ______ problem.',
            correct: 'stort',
            options: ['stort', 'ligegyldigt', 'billigt', 'nemt'],
            explanation: 'Ikke at kunne betale i et supermarked er et stort og vigtigt problem.'
        },
        {
            story: 'En cykel til 15.000 kroner koster rigtig mange penge. Den er meget ______.',
            correct: 'dyr',
            options: ['dyr', 'billig', 'gratis', 'ubrugelig'],
            explanation: 'En cykel til så mange penge er en dyr cykel.'
        },
        {
            story: 'Kollegaen hjalp ham med at finde den bedste løsning på computeren. Det var et meget ______ råd.',
            correct: 'nyttigt',
            options: ['nyttigt', 'ubrugeligt', 'forkert', 'dyrt'],
            explanation: 'Et råd, der hjælper én videre, er nyttigt og gavnligt.'
        },
        {
            story: 'Kagen smagte helt vidunderligt, og alle gæsterne tog to stykker. Kagen var ______.',
            correct: 'god',
            options: ['god', 'dårlig', 'svær', 'mangelfuld'],
            explanation: 'Når kagen smager vidunderligt, er den god.'
        },
        {
            story: 'Vejledningen havde kun to simple trin: tryk på den grønne knap. Det var en ______ vejledning.',
            correct: 'simpel',
            options: ['simpel', 'kompliceret', 'svær', 'dyr'],
            explanation: 'To enkle trin gør en vejledning simpel.'
        },
        {
            story: 'Han manglede sit pas og sit ID, så han kunne ikke komme ind i banken. Papirerne var ______.',
            correct: 'mangelfulde',
            options: ['mangelfulde', 'perfekte', 'gratis', 'lette'],
            explanation: 'Når vigtige dokumenter mangler, er papirerne mangelfulde.'
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
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Super flot forståelse af kvalitet og økonomi!</h2>
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
