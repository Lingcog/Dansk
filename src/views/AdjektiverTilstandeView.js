import { getTranslation, getLang } from '../utils/i18n.js';
import { formatNounLinks, attachNounLinkListeners } from '../utils/nounQuickPeekModal.js';

/**
 * AdjektiverTilstandeView - Felt 5: Farver, mængder og tilstande
 * Dækker 20 af de mest almindelige tilstands-, mængde- og farveadjektiver på dansk (10 kontrast-par):
 * 1. Kontrast-studiet (Visuel flade i klasselokalet og kontoret med 20 hotspots og modpol-kobling)
 * 2. Find modpolen (Antonym-duellen - tilstande i hverdagen)
 * 3. Synonymer & Nuancer (Tilstandsnuancer)
 * 4. Barometret (Skalaer for renhed, helbred, fugtighed, lys, mængde og sikkerhed)
 * 5. Kongruens-byggeren (Fælde-træning: "sikker/sikre", -t ved intetkøn og flertal med -e)
 * 6. Kontekst & Historie (Hverdagssituationer fra sundhed, rengøring, vejr og dagligdag)
 */
export function renderAdjektiverTilstandeView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adjektiver-fysik-view adjektiver-tilstande-view';

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
        .adjektiver-tilstande-view {
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
            background: linear-gradient(135deg, #eab308, #f97316, #ef4444);
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
            background: #f97316;
            color: white;
            font-weight: 700;
            box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);
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
            background: #f97316;
            border-color: #f97316;
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
        .stage-half-header.warm { color: #10b981; border-color: rgba(16, 185, 129, 0.4); }
        .stage-half-header.cool { color: #ef4444; border-color: rgba(239, 68, 68, 0.4); }

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
            background: rgba(249, 115, 22, 0.9);
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
            background: #f97316;
            box-shadow: 0 0 18px rgba(249, 115, 22, 0.8);
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
            background: #8b5cf6 !important;
            border-color: white !important;
            color: white !important;
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
            animation: pulseViolet 1.6s infinite ease-in-out;
            z-index: 7;
        }
        @keyframes pulseViolet {
            0%, 100% { box-shadow: 0 0 10px rgba(139, 92, 246, 0.6); }
            50% { box-shadow: 0 0 24px rgba(139, 92, 246, 1); }
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
            background: #f97316;
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
            background: #fb923c;
            transform: scale(1.05);
        }
        .adj-modpol-pill {
            background: rgba(139, 92, 246, 0.15);
            border: 1px solid #8b5cf6;
            color: #a78bfa;
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
            background: rgba(139, 92, 246, 0.25);
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
            color: #f97316;
            font-weight: 800;
        }
        .adj-example-box {
            background: rgba(249, 115, 22, 0.1);
            border-left: 4px solid #f97316;
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
            color: #f97316;
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
            color: #f97316;
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
            border-color: #f97316;
            transform: translateY(-2px);
            background: rgba(249, 115, 22, 0.1);
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
            background: #f97316;
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
            background: #fb923c;
            box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);
        }

        /* Grammar Guide Link Banner in Tab 5 */
        .adj-grammar-link-box {
            background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(59, 130, 246, 0.15));
            border: 1px solid rgba(249, 115, 22, 0.4);
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
            background: #f97316;
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
            background: #fb923c;
            transform: translateY(-2px);
        }
        .feedback-grammar-link {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            color: #f97316;
            font-weight: 700;
            margin-top: 0.6rem;
            text-decoration: underline;
            cursor: pointer;
        }
        .feedback-grammar-link:hover {
            color: #fb923c;
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
            border-color: #f97316;
            background: rgba(249, 115, 22, 0.15);
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
            border: 2px solid #f97316;
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
            background: #f97316;
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
        <h1>Felt 5: Farver, mængder og tilstande</h1>
        <p>Lær 20 uundværlige adjektiver til at beskrive tilstande, renhed, mængder, lys og farver.</p>
    `;
    viewContainer.appendChild(heroHeader);

    // 6 Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'adj-tabs-nav';
    const tabs = [
        { id: 'tab_kontrast', label: '1. Kontrast-studiet', icon: '👁️' },
        { id: 'tab_antonym', label: '2. Find modpolen (duel)', icon: '⚔️' },
        { id: 'tab_synonym', label: '3. Synonymer og nuancer', icon: '🔄' },
        { id: 'tab_barometer', label: '4. Barometret (skala)', icon: '🎨' },
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
        history.pushState(null, '', '#/' + lang + '/adjektiver_tilstande/' + tabId);
        tabsMenu.querySelectorAll('.adj-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.adj-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- DATA: 10 MODPOL-PAR (20 ADJEKTIVER) I FELT 5 ---
    // ========================================================
    const adjektivPar = [
        {
            id: 'par_1',
            wordA: {
                word: 'ren',
                side: 'left',
                x: 55, y: 62,
                itemLabel: 'Rent træbord 🧽',
                faelles: 'en ren skjorte',
                intet: 'et rent gulv',
                flertal: 'de rene tallerkener',
                context: 'Spisebordet i det lyse køkken er helt rent og pænt.'
            },
            wordB: {
                word: 'beskidt',
                side: 'right',
                x: 56, y: 52,
                itemLabel: 'Beskidt bordplade 👞',
                faelles: 'en beskidt jakke',
                intet: 'et beskidt glas',
                flertal: 'de beskidte sko',
                context: 'Tallerkenen på bordet er meget beskidt.'
            }
        },
        {
            id: 'par_2',
            wordA: {
                word: 'sund',
                side: 'left',
                x: 68, y: 56,
                itemLabel: 'Sund frugt & grønt 🥗',
                faelles: 'en sund krop',
                intet: 'et sundt måltid',
                flertal: 'de sunde vaner',
                context: 'Grøntsager og frugt er meget sund mad.'
            },
            wordB: {
                word: 'syg',
                side: 'right',
                x: 88, y: 80,
                itemLabel: 'Syg plante 🥀',
                faelles: 'en syg patient',
                intet: 'et sygt barn',
                flertal: 'de syge dage',
                context: 'Barnet har feber og er sygt i dag.'
            }
        },
        {
            id: 'par_3',
            wordA: {
                word: 'hel',
                side: 'left',
                x: 55, y: 58,
                itemLabel: 'Hel tærte 🥧',
                faelles: 'en hel uge',
                intet: 'et helt år',
                flertal: 'de hele stykker',
                context: 'Familien spiste en hel pizza til aften.'
            },
            wordB: {
                word: 'halv',
                side: 'right',
                x: 64, y: 43,
                itemLabel: 'Halv mad 🥪',
                faelles: 'en halv time',
                intet: 'et halvt æble',
                flertal: 'de halve sandheder',
                context: 'Han spiser et halvt æble i pausen.'
            }
        },
        {
            id: 'par_4',
            wordA: {
                word: 'mange',
                side: 'left',
                x: 16, y: 31,
                itemLabel: 'Mange urtepotter 🪴',
                faelles: 'mange stole',
                intet: 'mange penge',
                flertal: 'de mange elever',
                context: 'Der er mange elever i klassen i dag.'
            },
            wordB: {
                word: 'få',
                side: 'right',
                x: 78, y: 48,
                itemLabel: 'Få krummer 🪚',
                faelles: 'få stole',
                intet: 'få minutter',
                flertal: 'de få elever',
                context: 'Der er kun få ledige pladser i bussen.'
            }
        },
        {
            id: 'par_5',
            wordA: {
                word: 'sikker',
                side: 'left',
                x: 19, y: 64,
                itemLabel: 'Sikker skammel 🪜',
                faelles: 'en sikker vej',
                intet: 'et sikkert sted',
                flertal: 'de sikre rammer (bemærk: sikre!)',
                context: 'Den nye cykelhjelm er helt sikker.'
            },
            wordB: {
                word: 'usikker',
                side: 'right',
                x: 28, y: 42,
                itemLabel: 'Usikker knækket stige 🪜',
                faelles: 'en usikker trappe',
                intet: 'et usikkert svar',
                flertal: 'de usikre tider',
                context: 'Den gamle stige er meget usikker at stå på.'
            }
        },
        {
            id: 'par_6',
            wordA: {
                word: 'klar',
                side: 'left',
                x: 77, y: 58,
                itemLabel: 'Klart vand 💧',
                faelles: 'en klar besked',
                intet: 'et klart svar',
                flertal: 'de klare regler',
                context: 'Vandet i glasset er helt klart og rent.'
            },
            wordB: {
                word: 'uklar',
                side: 'right',
                x: 90, y: 45,
                itemLabel: 'Uklart vand 🌫️',
                faelles: 'en uklar melding',
                intet: 'et uklart billede',
                flertal: 'de uklare regler',
                context: 'Teksten på tavlen er meget uklar.'
            }
        },
        {
            id: 'par_7',
            wordA: {
                word: 'tør',
                side: 'left',
                x: 40, y: 61,
                itemLabel: 'Tørt viskestykke 🧺',
                faelles: 'en tør trøje',
                intet: 'et tørt håndklæde',
                flertal: 'de tørre sko',
                context: 'Det hvide viskestykke er helt tørt og rent.'
            },
            wordB: {
                word: 'våd',
                side: 'right',
                x: 22, y: 86,
                itemLabel: 'Vådt kældergulv 💧',
                faelles: 'en våd paraply',
                intet: 'et vådt gulv',
                flertal: 'de våde frakker',
                context: 'Gulvet på badeværelset er meget vådt.'
            }
        },
        {
            id: 'par_8',
            wordA: {
                word: 'lys',
                side: 'left',
                x: 86, y: 32,
                itemLabel: 'Lyst vindue ☀️',
                faelles: 'en lys stue',
                intet: 'et lyst værelse',
                flertal: 'de lyse dage',
                context: 'Dagslyset strømmer ind gennem det store, lyse vindue.'
            },
            wordB: {
                word: 'mørk',
                side: 'right',
                x: 39, y: 31,
                itemLabel: 'Mørk krog 🌑',
                faelles: 'en mørk aften',
                intet: 'et mørkt rum',
                flertal: 'de mørke gader',
                context: 'Gaden uden lamper er meget mørk om natten.'
            }
        },
        {
            id: 'par_9',
            wordA: {
                word: 'grøn',
                side: 'left',
                x: 23, y: 44,
                itemLabel: 'Grønne krydderurter 🌿',
                faelles: 'en grøn plante',
                intet: 'et grønt lys',
                flertal: 'de grønne træer',
                context: 'I urtepotterne gror friske grønne urter.'
            },
            wordB: {
                word: 'rød',
                side: 'right',
                x: 76, y: 79,
                itemLabel: 'Rød spand 🪣',
                faelles: 'en rød mappe',
                intet: 'et rødt æble',
                flertal: 'de røde stole',
                context: 'Bilen foran huset er flot og rød.'
            }
        },
        {
            id: 'par_10',
            wordA: {
                word: 'levende',
                side: 'left',
                x: 82, y: 88,
                itemLabel: 'Levende kat 🐈',
                faelles: 'en levende hund',
                intet: 'et levende menneske',
                flertal: 'de levende planter (aldrig -t / -e!)',
                context: 'I en zoologisk have kan man se mange levende dyr.'
            },
            wordB: {
                word: 'død',
                side: 'right',
                x: 91, y: 68,
                itemLabel: 'Død gren 🍂',
                faelles: 'en død fugl',
                intet: 'et dødt træ',
                flertal: 'de døde blade',
                context: 'Blomsten i vinduet fik ikke vand og er helt død.'
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
        <div class="stage-half-header warm">🌿 Renhed, sundhed, lys & liv (10 egenskaber)</div>
        <img src="assets/adjektiver_tilstande_venstre.jpg" alt="Renhed, sundhed og lys i væksthuskøkkenet" />
    `;

    const rightHalf = document.createElement('div');
    rightHalf.className = 'stage-half';
    rightHalf.innerHTML = `
        <div class="stage-half-header cool">🌑 Snavs, forfald, mørke & fugt (10 modpoler)</div>
        <img src="assets/adjektiver_tilstande_hoejre.jpg" alt="Snavs, forfald og mørke i kælderen" />
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
                    <span style="font-size: 1.8rem;">${item.me.side === 'left' ? '🌿' : '🌑'}</span>
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
            stimulus: 'Tallerkenen blev vasket i opvaskemaskinen og er helt <strong>REN 🍽️</strong>.',
            question: 'Hvad er tallerkenen, før den bliver vasket?',
            targetWord: 'ren',
            correct: 'beskidt 👞',
            options: ['beskidt 👞', 'syg 🤒', 'usikker 🪜', 'våd ☔'],
            wrongExplanation: 'Modpolen til ren er beskidt.',
            congruenceBonus: 'En <strong>ren</strong> skjorte ↔ En <strong>beskidt</strong> jakke (et rent bord ↔ et beskidt glas).'
        },
        {
            stimulus: 'Pigen spiser grøntsager og dyrker motion – hun er sund og <strong>RASK 🥗</strong>.',
            question: 'Hvad er barnet, der ligger i sengen med 39 i feber?',
            targetWord: 'sund',
            correct: 'syg 🤒',
            options: ['syg 🤒', 'død 🍂', 'træt 🥱', 'uklar 🌫️'],
            wrongExplanation: 'Når kroppen rammes af feber og virus, er man syg.',
            congruenceBonus: 'En <strong>sund</strong> krop ↔ En <strong>syg</strong> patient (et sundt æble ↔ et sygt barn).'
        },
        {
            stimulus: 'Familien spiste en <strong>HEL</strong> pizza til aftensmad 🍕.',
            question: 'Hvad kalder man den del, hvis man kun spiser 50% af pizzaen?',
            targetWord: 'hel',
            correct: 'halv 🍎',
            options: ['halv 🍎', 'få ✏️', 'lille 🏠', 'kort ⏱️'],
            wrongExplanation: 'Modpolen til en helhed (100%) i to lige dele er halv (50%).',
            congruenceBonus: 'En <strong>hel</strong> uge ↔ En <strong>halv</strong> time (et helt år ↔ et halvt æble).'
        },
        {
            stimulus: 'Der var <strong>MANGE</strong> elever i skolegården i frikvarteret 📚.',
            question: 'Hvad siger man, hvis der kun er to eller tre elever?',
            targetWord: 'mange',
            correct: 'få ✏️',
            options: ['få ✏️', 'små 🏡', 'halve 🍎', 'tomme 🥛'],
            wrongExplanation: 'Om antal hedder modpolerne mange og få.',
            congruenceBonus: '<strong>Mange</strong> stole ↔ <strong>Få</strong> stole.'
        },
        {
            stimulus: 'Lås døren, så computeren står på et <strong>SIKKERT</strong> sted 🔐.',
            question: 'Hvad kalder man en vakkelvorn stige, som nemt kan vælte?',
            targetWord: 'sikker',
            correct: 'usikker 🪜',
            options: ['usikker 🪜', 'uklar 🌫️', 'beskidt 👞', 'farlig ⚠️'],
            wrongExplanation: 'Noget, der ikke står fast og trygt, er usikkert.',
            congruenceBonus: 'Et <strong>sikkert</strong> sted ↔ Et <strong>usikkert</strong> sted (de sikre rammer).'
        },
        {
            stimulus: 'Læreren gav en helt <strong>KLAR</strong> besked til klassen 📢.',
            question: 'Hvad kalder man en besked, der er forvirrende og svær at tyde?',
            targetWord: 'klar',
            correct: 'uklar 🌫️',
            options: ['uklar 🌫️', 'mørk 🌑', 'død 🍂', 'få ✏️'],
            wrongExplanation: 'Når noget er tåget, uforståeligt eller utydeligt, er det uklart.',
            congruenceBonus: 'En <strong>klar</strong> melding ↔ En <strong>uklar</strong> melding.'
        },
        {
            stimulus: 'Tøjet hang i solen og blev helt <strong>TØRT 👕</strong>.',
            question: 'Hvad bliver tøjet, hvis der pludselig falder et regnskyl?',
            targetWord: 'tør',
            correct: 'vådt ☔',
            options: ['vådt ☔', 'koldt 🧊', 'beskidt 👞', 'mørkt 🌑'],
            wrongExplanation: 'Når noget suger vand til sig, bliver det vådt!',
            congruenceBonus: 'En <strong>tør</strong> trøje ↔ En <strong>våd</strong> trøje (et tørt gulv ↔ et vådt gulv).'
        },
        {
            stimulus: 'Stuen har store vinduer og er dejlig <strong>LYS 💡</strong>.',
            question: 'Hvad er kælderen, hvor der slet ikke er nogen vinduer?',
            targetWord: 'lys',
            correct: 'mørk 🌑',
            options: ['mørk 🌑', 'uklar 🌫️', 'kold 🧊', 'lukket 🔒'],
            wrongExplanation: 'Modpolen til lys i belysning er mørk.',
            congruenceBonus: 'Et <strong>lyst</strong> værelse ↔ Et <strong>mørkt</strong> værelse.'
        },
        {
            stimulus: 'Bilen holder stille for det <strong>RØDE</strong> lyskryds 🛑.',
            question: 'Hvilken farve bliver lyset, når man må køre frem?',
            targetWord: 'rød',
            correct: 'grøn 🟢',
            options: ['grøn 🟢', 'blå 🔵', 'hvid ⚪', 'gul 🟡'],
            wrongExplanation: 'I trafikken er rød (stop) og grøn (kør) det velkendte signalpar.',
            congruenceBonus: 'Et <strong>rødt</strong> lys ↔ Et <strong>grønt</strong> lys.'
        },
        {
            stimulus: 'I haven svømmede der en <strong>LEVENDE</strong> guldfisk 🐠.',
            question: 'Hvad kalder man et blad, der er visnet og faldet af træet?',
            targetWord: 'levende',
            correct: 'dødt 🍂',
            options: ['dødt 🍂', 'tørt 👕', 'sygt 🤒', 'gammelt 👴'],
            wrongExplanation: 'Når liv er ophørt, er det dødt.',
            congruenceBonus: 'En <strong>levende</strong> plante ↔ Et <strong>dødt</strong> blad.'
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
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Flot klaret i Tilstands-duellen!</h2>
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
            word: 'ren',
            sentence: 'Bordet var så <strong>RENT</strong>, at det spejlede lyset.',
            question: 'Hvilket ord betyder fuldstændig funklende rent?',
            correct: 'skinnende ren',
            options: ['skinnende ren', 'våd', 'klar', 'tør'],
            explanation: '"Skinnende ren" bruges om noget, der er vasket til perfektion.'
        },
        {
            word: 'beskidt',
            sentence: 'Bilen kørte i mudder og blev utrolig <strong>BESKIDT</strong>.',
            question: 'Hvilket ord betyder dækket af snavs?',
            correct: 'snavset / pløret',
            options: ['snavset / pløret', 'mørk', 'usikker', 'død'],
            explanation: '"Snavset" er det mest almindelige hverdagsord for beskidt.'
        },
        {
            word: 'sund',
            sentence: 'Atleten var i en utrolig <strong>SUND</strong> og god form.',
            question: 'Hvilket ord betyder fri for enhver sygdom?',
            correct: 'rask / karsk',
            options: ['rask / karsk', 'ren', 'hel', 'sikker'],
            explanation: 'At være "rask" betyder at være fri for sygdom.'
        },
        {
            word: 'våd',
            sentence: 'Han glemte sin paraply og kom hjem helt <strong>VÅD</strong>.',
            question: 'Hvilket ord betyder gennemblødt af regn?',
            correct: 'plaskvåd / gennemblødt',
            options: ['plaskvåd / gennemblødt', 'kold', 'ren', 'beskidt'],
            explanation: '"Plaskvåd" bruges, når tøjet drypper af vand.'
        },
        {
            word: 'tør',
            sentence: 'Jorden i haven var helt <strong>TØR</strong> efter hedebølgen.',
            question: 'Hvilket ord betyder udtørret som kiks?',
            correct: 'knastør',
            options: ['knastør', 'hård', 'sikker', 'klar'],
            explanation: '"Knastør" er et klassisk dansk udtryk for absolut intet fugt.'
        },
        {
            word: 'lys',
            sentence: 'Stuen var <strong>LYS</strong> og behagelig at opholde sig i.',
            question: 'Hvilket ord betyder fyldt med solskin og lys?',
            correct: 'oplyst / solrig',
            options: ['oplyst / solrig', 'klar', 'ren', 'hel'],
            explanation: '"Solrig" og "oplyst" beskriver rum med masser af dagslys.'
        },
        {
            word: 'mørk',
            sentence: 'Det var en kold og <strong>MØRK</strong> nat i december.',
            question: 'Hvilket ord betyder kulsort mørke?',
            correct: 'bælgmørk / kulsort',
            options: ['bælgmørk / kulsort', 'uklar', 'død', 'kold'],
            explanation: '"Bælgmørk" betyder så mørkt, at man overhovedet intet kan se.'
        },
        {
            word: 'sikker',
            sentence: 'Hun gav et <strong>SIKKERT</strong> håndtryk og svarede uden tøven.',
            question: 'Hvilket ord betyder fuld af overbevisning?',
            correct: 'overbevist / tryg',
            options: ['overbevist / tryg', 'klar', 'rask', 'hel'],
            explanation: 'At være "overbevist" betyder, at man ikke tvivler overhovedet.'
        },
        {
            word: 'klar',
            sentence: 'Lærerens forklaring var <strong>KLAR</strong> som kildevand.',
            question: 'Hvilket ord betyder fuldstændig gennemskuelig?',
            correct: 'tydelig / gennemskuelig',
            options: ['tydelig / gennemskuelig', 'ren', 'let', 'simpel'],
            explanation: '"Tydelig" betyder let at se og forstå.'
        },
        {
            word: 'hel',
            sentence: 'Hun spiste et <strong>HELT</strong> stykke kage alene.',
            question: 'Hvilket ord betyder uden manglende bider?',
            correct: 'komplet / fuldstændig',
            options: ['komplet / fuldstændig', 'sikker', 'mange', 'stor'],
            explanation: '"Komplet" og "fuldstændig" beskriver en hel enhed.'
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
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Flot ordforråd i tilstande!</h2>
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
    // --- TAB 4: BAROMETRET (SKALAER FOR RENHED, HELBRED OG LYS) ---
    // ========================================================
    const panelBarometer = document.createElement('div');
    panelBarometer.className = 'adj-panel';
    panelBarometer.dataset.panel = 'tab_barometer';

    const barometerChallenges = [
        {
            title: '🧽 Skala 1: Renlighed',
            desc: 'Arranger fra mest beskidt til skinnende ren:',
            lowLabel: '👞 Ulækker / snavset',
            highLabel: '✨ Skinnende ren',
            correctOrder: ['ulækker', 'beskidt', 'støvet', 'ren', 'skinnende ren']
        },
        {
            title: '🍎 Skala 2: Helbred og form',
            desc: 'Arranger fra alvorligt syg til sprudlende sund:',
            lowLabel: '🤒 Alvorligt syg',
            highLabel: '💪 Sprudlende sund',
            correctOrder: ['alvorligt syg', 'syg', 'utilpas', 'rask', 'sprudlende sund']
        },
        {
            title: '💧 Skala 3: Fugtighed',
            desc: 'Arranger fra knastør til gennemblødt:',
            lowLabel: '🏜️ Knastør',
            highLabel: '🌊 Gennemblødt',
            correctOrder: ['knastør', 'tør', 'fugtig', 'våd', 'gennemblødt']
        },
        {
            title: '💡 Skala 4: Lysniveau',
            desc: 'Arranger fra bælgmørk til blændende lys:',
            lowLabel: '🌑 Bælgmørk',
            highLabel: '☀️ Blændende lys',
            correctOrder: ['bælgmørk', 'mørk', 'dæmpet', 'lys', 'blændende lys']
        },
        {
            title: '📊 Skala 5: Mængde',
            desc: 'Arranger mængderne fra ingen til utallige:',
            lowLabel: '0️⃣ Ingen',
            highLabel: '♾️ Utallige',
            correctOrder: ['ingen', 'få', 'nogle', 'mange', 'utallige']
        },
        {
            title: '🧭 Skala 6: Vished og sikkerhed',
            desc: 'Arranger fra helt usikker til klokkeklar vished:',
            lowLabel: '❓ Tvivlsom',
            highLabel: '✔️ Klokkeklar',
            correctOrder: ['tvivlsom', 'usikker', 'sandsynlig', 'sikker', 'klokkeklar']
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
                <span class="task-counter">🎨 Barometer ${currentBarometerIndex + 1} af ${barometerChallenges.length}</span>
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
                        <strong>🎉 Perfekt sorteret!</strong> Du placerede tilstandene i helt rigtig rækkefølge:<br>
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
                    nextBtn.textContent = 'Du mestrer tilstandsbarometret! 🏆';
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
                        Tip: Tænk på den laveste grad først og den mest markante til sidst!
                    </div>
                `;
            }
        };

        updateUI();
    }

    renderBarometerChallenge();
    panelsHolder.appendChild(panelBarometer);

    // ========================================================
    // --- TAB 5: KONGRUENS-BYGGEREN (SIKKER/SIKRE, -T OG -E) ---
    // ========================================================
    const panelKongruens = document.createElement('div');
    panelKongruens.className = 'adj-panel';
    panelKongruens.dataset.panel = 'tab_kongruens';

    const kongruensTasks = [
        {
            sentence: 'Eleverne vaskede det ______ gulv i klassen.',
            correct: 'beskidte',
            options: ['beskidt', 'beskidte', 'beskidtt'],
            rule: '<strong>Bestemt form (det ... gulv):</strong> Får altid <strong>-e</strong> foran substantivet: <em>det beskidte gulv</em>.'
        },
        {
            sentence: 'Bordet er tørret af, så det er helt ______ nu.',
            correct: 'rent',
            options: ['ren', 'rent', 'rene'],
            rule: '<strong>Prædikativ intetkøn (det er...):</strong> Bord er intetkøn ("et bord") ➔ <em>bordet er rent</em>.'
        },
        {
            sentence: 'Familien spiser et ______ måltid hver dag.',
            correct: 'sundt',
            options: ['sund', 'sundt', 'sunde'],
            rule: '<strong>Ubestemt intetkøn (et måltid):</strong> Sund får <strong>-t</strong>: <em>et sundt måltid</em>.'
        },
        {
            sentence: 'Lægen undersøgte de to ______ børn.',
            correct: 'syge',
            options: ['syg', 'sygt', 'syge'],
            rule: '<strong>Flertal (to børn):</strong> Får <strong>-e</strong>: <em>to syge børn</em>.'
        },
        {
            sentence: 'Vi boede i Odense et ______ år.',
            correct: 'helt',
            options: ['hel', 'helt', 'hele'],
            rule: '<strong>Ubestemt intetkøn (et år):</strong> Hel får <strong>-t</strong>: <em>et helt år</em>.'
        },
        {
            sentence: 'Hun spiste et ______ æble i pausen.',
            correct: 'halvt',
            options: ['halv', 'halvt', 'halve'],
            rule: '<strong>Ubestemt intetkøn (et æble):</strong> Halv får <strong>-t</strong>: <em>et halvt æble</em>.'
        },
        {
            sentence: 'Børnene leger under de ______ rammer på skolen.',
            correct: 'sikre',
            options: ['sikker', 'sikkert', 'sikre'],
            rule: '<strong>⚠️ Bøjningsfælde (sikker):</strong> Mister midterste -e- i flertal og bestemt: <em>sikre rammer</em> (ikke "sikkere").'
        },
        {
            sentence: 'Værdigenstandene blev lagt på et ______ sted.',
            correct: 'sikkert',
            options: ['sikker', 'sikkert', 'sikre'],
            rule: '<strong>Ubestemt intetkøn (et sted):</strong> Får <strong>-t</strong>: <em>et sikkert sted</em>.'
        },
        {
            sentence: 'Efter svømmeturen tog han et ______ håndklæde.',
            correct: 'tørt',
            options: ['tør', 'tørt', 'tørre'],
            rule: '<strong>Ubestemt intetkøn (et håndklæde):</strong> Får <strong>-t</strong>: <em>et tørt håndklæde</em>.'
        },
        {
            sentence: 'Solen oplyste det store og ______ værelse.',
            correct: 'lyse',
            options: ['lys', 'lyst', 'lyse'],
            rule: '<strong>Bestemt form (det ... værelse):</strong> Får altid <strong>-e</strong>: <em>det lyse værelse</em>.'
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
                            Vil du lære alle bøjningsregler og undtagelser for adjektiver?
                        </div>
                        <div style="color: #94a3b8; font-size: 0.92rem; margin-top: 0.2rem;">
                            Lær om grundform, -t for intetkøn, -e for flertal og sammentrækning i ord som "sikker/sikre".
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
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Super flot tilstandskongruens!</h2>
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
            story: 'Regnen væltede ned, og manden glemte sin jakke. Han blev fuldstændig ______.',
            correct: 'våd',
            options: ['våd', 'tør', 'ren', 'lys'],
            explanation: 'Når regnen vælter ned uden overtøj, bliver man våd.'
        },
        {
            story: 'Eleverne fejede sand og snavs ud af lokalet. Bagefter var gulvet helt ______.',
            correct: 'rent',
            options: ['rent', 'beskidt', 'sygt', 'usikkert'],
            explanation: 'Efter en grundig fejning og vask er gulvet rent.'
        },
        {
            story: 'Drengen spiste grøntsager og drak masser af vand. Han følte sig stærk og ______.',
            correct: 'sund',
            options: ['sund', 'syg', 'død', 'mørk'],
            explanation: 'Grøntsager og vand gør kroppen sund.'
        },
        {
            story: 'Lyset gik ud i hele opgangen, og der var ingen lamper. Trappen var helt ______.',
            correct: 'mørk',
            options: ['mørk', 'lys', 'våd', 'halv'],
            explanation: 'Når strømmen går og der ingen lamper er, er der mørkt.'
        },
        {
            story: 'Brandmændene sørgede for, at alle kom ud af huset og stod et ______ sted på gaden.',
            correct: 'sikkert',
            options: ['sikkert', 'usikkert', 'beskidt', 'dødt'],
            explanation: 'Brandmænd hjælper folk hen på et sikkert sted.'
        },
        {
            story: 'Bilen kørte frem over krydset, fordi lyskurven skiftede og lyste ______.',
            correct: 'grønt',
            options: ['grønt', 'rødt', 'mørkt', 'tørt'],
            explanation: 'Biler må køre frem, når lyskurven lyser grønt.'
        },
        {
            story: 'De delte kagen lige over på midten og fik hver et ______ stykke.',
            correct: 'halvt',
            options: ['halvt', 'helt', 'få', 'sikkert'],
            explanation: 'At dele lige over på midten giver to halve stykker.'
        },
        {
            story: 'Skiltet var skrevet med store, sorte bogstaver. Det gav en helt ______ instruktion.',
            correct: 'klar',
            options: ['klar', 'uklar', 'død', 'våd'],
            explanation: 'Store, tydelige bogstaver giver en klar instruktion.'
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
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Super flot forståelse af farver, mængder og tilstande!</h2>
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
