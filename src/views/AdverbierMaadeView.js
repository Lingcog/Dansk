import { getTranslation, getLang } from '../utils/i18n.js';
import { getAdverbWordTranslation } from '../utils/top100_adverbier_translations.js';

/**
 * AdverbierMaadeView - Felt 3: Måde (-t reglen)
 * Hvordan foregår handlingen?
 * Den gyldne didaktiske regel:
 * Ting (Adjektiv): "Bussen er hurtig."
 * Handling (Adverbium): "Bussen kører hurtigt."
 * 
 * 20 mådesadverbier trænet i 5 didaktiske tabs:
 * 1. Det Interaktive Byrum & Vrimlebillede (20 hotspots, -t reglen, audio, pure mode)
 * 2. Aha-værkstedet (-t Transformeren & Mådes-kontraster)
 * 3. -t Detektiven (Ting vs. Handling / Adjektiv vs. Adverbium)
 * 4. Sætningsbyggeren (To-trins model: Hvem? Hvad laver? Hvordan? Hvor? + Puslespil med tydelig ⭐ markering)
 * 5. Kontekst-testen (14 varierede A1/A2 hverdagssituationer)
 */
export function renderAdverbierMaadeView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adverbier-maade-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('top100_adverbier');
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

    // 20 Words Data for Felt 3 (Måde -t reglen)
    const ADVERBIER_MAADE_DATA = [
        {
            id: 'hurtigt',
            word: 'hurtigt',
            baseAdj: 'hurtig',
            hasTRule: true,
            x: 15,
            y: 43,
            sceneDesc: 'Løberen i blåt tøj løber hurtigt gennem gaden.',
            meaning: 'Med høj fart / hurtigt tempo',
            sentence: 'Løberen løber hurtigt.',
            tingExample: 'Han er en hurtig løber.',
            handlingExample: 'Han løber hurtigt.',
            ruleHint: 'Hurtig + T = hurtigt. Ordet beskriver verbet "løber" (handlingen), så vi sætter -t på!'
        },
        {
            id: 'langsomt',
            word: 'langsomt',
            baseAdj: 'langsom',
            hasTRule: true,
            x: 23,
            y: 46,
            sceneDesc: 'Den ældre kvinde med stok går langsomt over fodgængerfeltet.',
            meaning: 'Med lav fart / tager god tid',
            sentence: 'Hun går langsomt.',
            tingExample: 'Det er en langsom gåtur.',
            handlingExample: 'Hun går langsomt.',
            ruleHint: 'Langsom + T = langsomt. Modsat "hurtigt". Beskriver måden hun går på.'
        },
        {
            id: 'højt',
            word: 'højt',
            baseAdj: 'høj',
            hasTRule: true,
            x: 15,
            y: 62,
            sceneDesc: 'Musikeren blæser højt i den gyldne trompet.',
            meaning: 'Med kraftig lyd / høj volumen',
            sentence: 'Musikeren spiller højt.',
            tingExample: 'Trompeten giver en høj lyd.',
            handlingExample: 'Han spiller højt på trompet.',
            ruleHint: 'Høj + T = højt. Beskriver hvordan trompeten lyder.'
        },
        {
            id: 'stille',
            word: 'stille',
            baseAdj: 'stille',
            hasTRule: false,
            x: 4,
            y: 57,
            sceneDesc: 'Gæsten sidder på caféen og læser stille i sin bog.',
            meaning: 'Uden larm / roligt og hviskende',
            sentence: 'Han læser stille i bogen.',
            tingExample: 'Caféen er et stille sted.',
            handlingExample: 'Han læser stille.',
            ruleHint: '⚠️ Særregel: "Stille" ender allerede på -e, så det får IKKE noget ekstra -t!'
        },
        {
            id: 'pænt',
            word: 'pænt',
            baseAdj: 'pæn',
            hasTRule: true,
            x: 6,
            y: 84,
            sceneDesc: 'Konditoren pynter kagen utroligt pænt.',
            meaning: 'Flot, nydeligt og ordentligt',
            sentence: 'Hun pynter kagen pænt.',
            tingExample: 'Det er en pæn kage.',
            handlingExample: 'Hun pynter kagen pænt.',
            ruleHint: 'Pæn + T = pænt. Modsat "grimt". Beskriver handlingen "pynter".'
        },
        {
            id: 'godt',
            word: 'godt',
            baseAdj: 'god',
            hasTRule: true,
            x: 10,
            y: 92,
            sceneDesc: 'Konditoren bager godt, og kagerne smager fantastisk.',
            meaning: 'Med høj kvalitet / velsmagende',
            sentence: 'Hun bager virkelig godt.',
            tingExample: 'Det er en god kage.',
            handlingExample: 'Hun bager godt.',
            ruleHint: 'God + T = godt. Bruges ved alle handlinger: "arbejder godt", "sover godt", "taler godt".'
        },
        {
            id: 'dårligt',
            word: 'dårligt',
            baseAdj: 'dårlig',
            hasTRule: true,
            x: 19,
            y: 78,
            sceneDesc: 'Maleren sjusker og maler dårligt på lærredet.',
            meaning: 'Med lav kvalitet / utilfredsstillende',
            sentence: 'Han maler dårligt i dag.',
            tingExample: 'Det er en dårlig idé.',
            handlingExample: 'Han maler dårligt.',
            ruleHint: 'Dårlig + T = dårligt. Det direkte modsatte af "godt".'
        },
        {
            id: 'grimt',
            word: 'grimt',
            baseAdj: 'grim',
            hasTRule: true,
            x: 21,
            y: 73,
            sceneDesc: 'Farverne er smurt grimt ud på staffeliet.',
            meaning: 'Uæstetisk / sjusket udført',
            sentence: 'Billedet er malet grimt.',
            tingExample: 'Det er et grimt billede.',
            handlingExample: 'Han maler grimt.',
            ruleHint: 'Grim + T = grimt. Modsat "pænt". Beskriver udseendet af handlingen.'
        },
        {
            id: 'hårdt',
            word: 'hårdt',
            baseAdj: 'hård',
            hasTRule: true,
            x: 33,
            y: 58,
            sceneDesc: 'Vejarbejderen slår hårdt med hammeren på brostenene.',
            meaning: 'Med stor fysisk kraft og styrke',
            sentence: 'Han slår hårdt med hammeren.',
            tingExample: 'Brostenen er hård.',
            handlingExample: 'Han slår hårdt.',
            ruleHint: 'Hård + T = hårdt. Beskriver styrken i handlingen: "arbejder hårdt", "sparker hårdt".'
        },
        {
            id: 'blødt',
            word: 'blødt',
            baseAdj: 'blød',
            hasTRule: true,
            x: 54,
            y: 88,
            sceneDesc: 'Katten lander blødt og let på den lyserøde havepude.',
            meaning: 'Skånsomt, fjedrende og uden stød',
            sentence: 'Katten lander blødt på puden.',
            tingExample: 'Puden er dejlig blød.',
            handlingExample: 'Katten lander blødt.',
            ruleHint: 'Blød + T = blødt. Modsat "hårdt". Beskriver en blid berøring eller landing.'
        },
        {
            id: 'forsigtigt',
            word: 'forsigtigt',
            baseAdj: 'forsigtig',
            hasTRule: true,
            x: 45,
            y: 60,
            sceneDesc: 'Drengen bærer den høje is forsigtigt for ikke at tabe den.',
            meaning: 'Med omtanke og varsomhed',
            sentence: 'Han bærer isen forsigtigt.',
            tingExample: 'Han er en forsigtig dreng.',
            handlingExample: 'Han bærer isen forsigtigt.',
            ruleHint: 'Forsigtig + T = forsigtigt. Vigtigt hverdagsord når man passer på noget skrøbeligt.'
        },
        {
            id: 'rigtigt',
            word: 'rigtigt',
            baseAdj: 'rigtig',
            hasTRule: true,
            x: 56,
            y: 56,
            sceneDesc: 'Cyklisten rækker armen ud og drejer rigtigt til højre.',
            meaning: 'Korrekt / efter reglerne',
            sentence: 'Han drejer rigtigt i krydset.',
            tingExample: 'Det var et rigtigt svar.',
            handlingExample: 'Han drejer rigtigt.',
            ruleHint: 'Rigtig + T = rigtigt. Modsat "forkert". Viser at handlingen udføres korrekt.'
        },
        {
            id: 'forkert',
            word: 'forkert',
            baseAdj: 'forkert',
            hasTRule: false,
            x: 74,
            y: 48,
            sceneDesc: 'Scooterkøreren kigger forvirret og drejer forkert i krydset.',
            meaning: 'Fejlagtigt / i modstrid med reglerne',
            sentence: 'Han drejede forkert.',
            tingExample: 'Det var den forkerte vej.',
            handlingExample: 'Han kørte forkert.',
            ruleHint: '⚠️ "Forkert" har allerede -t i grundform både som adjektiv og adverbium!'
        },
        {
            id: 'tydeligt',
            word: 'tydeligt',
            baseAdj: 'tydelig',
            hasTRule: true,
            x: 28,
            y: 76,
            sceneDesc: 'Læreren taler med klare fagter og taler tydeligt til børnene.',
            meaning: 'Letforståeligt, klart og præcist',
            sentence: 'Læreren taler tydeligt.',
            tingExample: 'Hun har en tydelig stemme.',
            handlingExample: 'Hun taler tydeligt.',
            ruleHint: 'Tydelig + T = tydeligt. Gør sproget let at forstå for tilhørerne.'
        },
        {
            id: 'nemt',
            word: 'nemt',
            baseAdj: 'nem',
            hasTRule: true,
            x: 38,
            y: 75,
            sceneDesc: 'Drengen holder den lette ballon nemt i én hånd.',
            meaning: 'Uden besvær / simpelt',
            sentence: 'Han holder ballonen nemt.',
            tingExample: 'Det er en nem opgave.',
            handlingExample: 'Han klarer det nemt.',
            ruleHint: 'Nem + T = nemt. Modsat "svært". Beskriver lethed i udførelsen.'
        },
        {
            id: 'svært',
            word: 'svært',
            baseAdj: 'svær',
            hasTRule: true,
            x: 44,
            y: 80,
            sceneDesc: 'Manden sveder og bærer den tunge trækasse svært.',
            meaning: 'Med stort besvær og anstrengelse',
            sentence: 'Han bærer kassen svært.',
            tingExample: 'Kassen er en svær byrde.',
            handlingExample: 'Han løfter den svært.',
            ruleHint: 'Svær + T = svært. Modsat "nemt". Beskriver hård modstand eller vanskelighed.'
        },
        {
            id: 'let',
            word: 'let',
            baseAdj: 'let',
            hasTRule: false,
            x: 38,
            y: 71,
            sceneDesc: 'Ballonen svæver let og ubesværet op i luften.',
            meaning: 'Uden vægt eller besvær',
            sentence: 'Ballonen svæver let.',
            tingExample: 'Det er en let ballon.',
            handlingExample: 'Ballonen stiger let til vejrs.',
            ruleHint: '⚠️ "Let" ender allerede på -t i grundform: en let taske / løfter den let.'
        },
        {
            id: 'lavt',
            word: 'lavt',
            baseAdj: 'lav',
            hasTRule: true,
            x: 86,
            y: 68,
            sceneDesc: 'Fuglen glider lavt hen over springvandet.',
            meaning: 'Tæt ved jorden eller vandet',
            sentence: 'Fuglen flyver lavt.',
            tingExample: 'Et lavt hegn.',
            handlingExample: 'Fuglen flyver lavt.',
            ruleHint: 'Lav + T = lavt. Modsat "højt". Angiver højde for bevægelsen.'
        },
        {
            id: 'sammen',
            word: 'sammen',
            baseAdj: 'sammen',
            hasTRule: false,
            x: 73,
            y: 67,
            sceneDesc: 'De tre glade børn løber og spiller fodbold sammen.',
            meaning: 'I fællesskab med hinanden',
            sentence: 'Børnene spiller bold sammen.',
            tingExample: 'En fælles leg.',
            handlingExample: 'Børnene leger sammen.',
            ruleHint: 'Mådesadverbium for social tilstand. Modsat "alene". Ingen -t endelse.'
        },
        {
            id: 'alene',
            word: 'alene',
            baseAdj: 'alene',
            hasTRule: false,
            x: 72,
            y: 87,
            sceneDesc: 'Drengen med høretelefoner sidder alene og fordyber sig i en tegning.',
            meaning: 'Uden andre mennesker / for sig selv',
            sentence: 'Han sidder alene og tegner.',
            tingExample: 'En person for sig selv.',
            handlingExample: 'Han sidder alene.',
            ruleHint: 'Mådesadverbium for ensomhed eller selvstændighed. Modsat "sammen".'
        }
    ];

    // State
    let currentTab = (extraData && (extraData.subPath || extraData.tab)) ? (extraData.subPath || extraData.tab) : 'tab_vrimmel';
    let selectedWordId = 'hurtigt';
    let isPureMode = false;
    let wordFilter = 'all'; // 'all', 't_rule', 'special'

    // Component Styles
    const style = document.createElement('style');
    style.textContent = `
        .adverbier-maade-view {
            max-width: 1250px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .adv-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .adv-hero h1 {
            font-size: 2.4rem;
            font-weight: 800;
            margin-bottom: 0.6rem;
            background: linear-gradient(135deg, #f472b6, #ec4899, #db2777);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .adv-hero p {
            color: #94a3b8;
            font-size: 1.15rem;
            max-width: 820px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }
        .adv-rule-banner {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
            gap: 1rem;
            max-width: 980px;
            margin: 0 auto;
        }
        .rule-card-mini {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1rem 1.3rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 0.95rem;
            line-height: 1.45;
            text-align: left;
        }
        .rule-ting {
            border-left: 5px solid #38bdf8;
            background: rgba(56, 189, 248, 0.08);
        }
        .rule-handling {
            border-left: 5px solid #ec4899;
            background: rgba(236, 72, 153, 0.08);
        }

        /* Tabs Navigation */
        .adv-tabs-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            justify-content: center;
            margin-bottom: 2.2rem;
            background: rgba(15, 23, 42, 0.6);
            padding: 0.6rem;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .adv-tab-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 0.8rem 1.4rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .adv-tab-btn:hover {
            color: #f1f5f9;
            background: rgba(255, 255, 255, 0.05);
        }
        .adv-tab-btn.active {
            background: #ec4899;
            color: white;
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
        }

        /* Tab 1: Vrimmel Layout */
        .vrimmel-layout {
            display: grid;
            grid-template-columns: 1.6fr 1fr;
            gap: 1.8rem;
            align-items: start;
        }
        @media (max-width: 950px) {
            .vrimmel-layout { grid-template-columns: 1fr; }
        }

        .vrimmel-stage-card {
            background: #1e293b;
            border-radius: 20px;
            overflow: hidden;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .vrimmel-controls-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem 1.2rem;
            background: #0f172a;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .vrimmel-filters {
            display: flex;
            gap: 0.5rem;
        }
        .filter-btn {
            background: #334155;
            color: #cbd5e1;
            border: none;
            padding: 0.4rem 0.85rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .filter-btn.active {
            background: #ec4899;
            color: white;
        }
        .pure-toggle-btn {
            background: rgba(255, 255, 255, 0.08);
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.4rem 0.85rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .pure-toggle-btn.active {
            background: #3b82f6;
            color: white;
            border-color: #60a5fa;
        }

        .vrimmel-canvas-wrapper {
            position: relative;
            width: 100%;
            background: #090d16;
            line-height: 0;
            user-select: none;
        }
        .vrimmel-main-img {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Hotspot Pins */
        .hotspot-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            cursor: pointer;
            z-index: 10;
            transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            line-height: normal;
        }
        .hotspot-pin:hover {
            transform: translate(-50%, -50%) scale(1.15);
            z-index: 30;
        }
        .hotspot-pin.selected {
            transform: translate(-50%, -50%) scale(1.25);
            z-index: 40;
        }
        .pin-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.25rem 0.6rem;
            border-radius: 14px;
            font-size: 0.78rem;
            font-weight: 800;
            color: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6), 0 0 0 1.5px rgba(255, 255, 255, 0.3);
            white-space: nowrap;
            backdrop-filter: blur(4px);
        }
        .pin-has-t {
            background: linear-gradient(135deg, #ec4899, #be185d);
            border: 1.5px solid #f472b6;
        }
        .pin-special {
            background: linear-gradient(135deg, #8b5cf6, #6d28d9);
            border: 1.5px solid #a78bfa;
        }
        .hotspot-pin.selected .pin-pill {
            box-shadow: 0 0 0 3px #ffffff, 0 8px 20px rgba(236, 72, 153, 0.8);
            transform: translateY(-2px);
        }

        /* Inspector Card */
        .vrimmel-inspector-card {
            background: #1e293b;
            border-radius: 20px;
            padding: 1.8rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            position: sticky;
            top: 2rem;
        }
        .inspector-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 1rem;
        }
        .inspector-title-wrap h2 {
            font-size: 2rem;
            font-weight: 800;
            color: #f472b6;
            margin: 0 0 0.3rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .inspector-badge {
            display: inline-block;
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.2rem 0.6rem;
            border-radius: 8px;
            background: rgba(236, 72, 153, 0.15);
            color: #f472b6;
            border: 1px solid rgba(236, 72, 153, 0.4);
        }
        .inspector-audio-btn {
            background: #ec4899;
            color: white;
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
        }
        .inspector-audio-btn:hover {
            transform: scale(1.1);
            background: #db2777;
        }

        /* Aha Golden Box */
        .aha-golden-box {
            background: linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(15, 23, 42, 0.8));
            border: 2px solid #ec4899;
            border-radius: 16px;
            padding: 1.2rem;
            margin-bottom: 1.4rem;
        }
        .aha-header {
            font-size: 0.95rem;
            font-weight: 800;
            color: #f472b6;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .aha-contrast-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.8rem;
            margin-bottom: 0.8rem;
        }
        .aha-contrast-card {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 12px;
            padding: 0.8rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .aha-tag {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 0.3rem;
        }
        .tag-ting { color: #38bdf8; }
        .tag-handling { color: #f472b6; }
        .aha-sentence {
            font-size: 0.95rem;
            font-weight: 600;
            color: #f8fafc;
        }

        .inspector-scene-box {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 14px;
            padding: 1rem 1.2rem;
            margin-bottom: 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .scene-heading {
            font-size: 0.85rem;
            color: #94a3b8;
            font-weight: 700;
            margin-bottom: 0.4rem;
            text-transform: uppercase;
        }
        .scene-text {
            font-size: 1.05rem;
            color: #f8fafc;
            line-height: 1.5;
            margin: 0;
        }

        .inspector-actions {
            display: flex;
            gap: 0.8rem;
        }
        .inspector-btn-action {
            flex: 1;
            background: #334155;
            color: white;
            border: none;
            padding: 0.8rem;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        .inspector-btn-action:hover {
            background: #475569;
        }

        /* Tab 2: Aha-værkstedet (-t Transformeren & Parringer) */
        .vaerksted-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 950px;
            margin: 0 auto;
        }
        .vaerksted-tabs {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
        }
        .vaerksted-subtab-btn {
            background: #334155;
            color: #cbd5e1;
            border: 2px solid transparent;
            padding: 0.8rem 1.6rem;
            border-radius: 14px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }
        .vaerksted-subtab-btn.active {
            background: rgba(236, 72, 153, 0.2);
            border-color: #ec4899;
            color: #f472b6;
        }

        /* Transformer Lab */
        .transformer-card {
            background: #0f172a;
            border-radius: 18px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .transformer-word-picker {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            justify-content: center;
            margin-bottom: 2rem;
        }
        .trans-word-chip {
            background: #334155;
            color: #cbd5e1;
            border: none;
            padding: 0.6rem 1.1rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }
        .trans-word-chip.active {
            background: #ec4899;
            color: white;
            box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
        }
        .trans-stage {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .trans-box {
            background: #1e293b;
            border-radius: 14px;
            padding: 1.4rem;
            min-width: 260px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            text-align: center;
        }
        .trans-box.ting { border-color: #38bdf8; }
        .trans-box.handling { border-color: #ec4899; }
        .trans-box-tag {
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 0.6rem;
        }
        .trans-box-word {
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }
        .trans-box-sentence {
            font-size: 1rem;
            color: #94a3b8;
            font-style: italic;
        }
        .trans-action-button {
            background: linear-gradient(135deg, #ec4899, #be185d);
            color: white;
            border: none;
            padding: 1.1rem 2rem;
            border-radius: 16px;
            font-size: 1.2rem;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(236, 72, 153, 0.45);
            transition: all 0.25s;
            display: inline-flex;
            align-items: center;
            gap: 0.8rem;
        }
        .trans-action-button:hover {
            transform: scale(1.04);
            box-shadow: 0 12px 30px rgba(236, 72, 153, 0.6);
        }

        /* Match Pairs */
        .match-pairs-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        @media (max-width: 650px) {
            .match-pairs-grid { grid-template-columns: 1fr; }
        }
        .pairs-col {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }
        .pairs-heading {
            font-size: 1.1rem;
            font-weight: 800;
            color: #94a3b8;
            text-align: center;
            margin-bottom: 0.5rem;
        }
        .pair-card-btn {
            background: #334155;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.12);
            padding: 1rem 1.4rem;
            border-radius: 12px;
            font-size: 1.15rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .pair-card-btn:hover {
            background: #475569;
            border-color: #ec4899;
        }
        .pair-card-btn.selected {
            border-color: #ec4899;
            background: rgba(236, 72, 153, 0.25);
        }
        .pair-card-btn.matched {
            background: rgba(34, 197, 94, 0.2) !important;
            border-color: #22c55e !important;
            color: #86efac !important;
            cursor: default;
        }

        /* Tab 3: Detektiv (-t reglen) */
        .detektiv-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 850px;
            margin: 0 auto;
        }
        .detektiv-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .detektiv-header h2 {
            font-size: 1.8rem;
            color: #f472b6;
            margin-bottom: 0.5rem;
        }
        .detektiv-progress {
            display: flex;
            justify-content: space-between;
            color: #94a3b8;
            font-size: 0.95rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }
        .detektiv-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.8rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 1.5rem;
        }
        .detektiv-context-tag {
            display: inline-block;
            background: rgba(236, 72, 153, 0.15);
            color: #f472b6;
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.85rem;
            margin-bottom: 1rem;
        }
        .detektiv-prompt-sentence {
            font-size: 1.35rem;
            color: #f8fafc;
            line-height: 1.7;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .detektiv-blank {
            display: inline-block;
            min-width: 120px;
            border-bottom: 3px solid #ec4899;
            color: #f472b6;
            font-weight: 800;
            text-align: center;
            padding: 0 0.5rem;
        }
        .detektiv-question-hint {
            background: rgba(30, 41, 59, 0.7);
            border-left: 4px solid #38bdf8;
            padding: 0.8rem 1rem;
            border-radius: 8px;
            font-size: 0.95rem;
            color: #bae6fd;
            margin-bottom: 1.5rem;
        }
        .detektiv-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.2rem;
            margin-bottom: 1.5rem;
        }
        @media (max-width: 600px) {
            .detektiv-options { grid-template-columns: 1fr; }
        }
        .detektiv-opt-btn {
            background: #334155;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.15);
            padding: 1.2rem;
            border-radius: 14px;
            font-size: 1.2rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.3rem;
        }
        .detektiv-opt-btn:hover:not(:disabled) {
            background: #475569;
            border-color: #ec4899;
            transform: translateY(-2px);
        }
        .detektiv-opt-sub {
            font-size: 0.8rem;
            color: #94a3b8;
            font-weight: 500;
        }
        .detektiv-opt-btn.correct {
            background: #15803d !important;
            border-color: #22c55e !important;
        }
        .detektiv-opt-btn.wrong {
            background: #b91c1c !important;
            border-color: #ef4444 !important;
            opacity: 0.6;
        }
        .detektiv-feedback {
            padding: 1.2rem 1.4rem;
            border-radius: 14px;
            font-size: 1.05rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            animation: fadeIn 0.3s ease;
        }
        .detektiv-feedback.correct {
            background: rgba(34, 197, 94, 0.15);
            border: 1.5px solid #22c55e;
            color: #dcfce7;
        }
        .detektiv-feedback.wrong {
            background: rgba(239, 68, 68, 0.15);
            border: 1.5px solid #ef4444;
            color: #fee2e2;
        }
        .detektiv-next-btn {
            background: #ec4899;
            color: white;
            border: none;
            padding: 0.9rem 2.2rem;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            display: block;
            margin-left: auto;
            transition: all 0.2s;
        }
        .detektiv-next-btn:hover {
            background: #db2777;
            transform: translateY(-2px);
        }

        /* Tab 4: Sætningsbyggeren */
        .saetning-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 1000px;
            margin: 0 auto;
        }
        .sb-sub-nav {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
        }
        .sb-sub-btn {
            background: #334155;
            color: #cbd5e1;
            border: 2px solid transparent;
            padding: 0.8rem 1.6rem;
            border-radius: 14px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-sub-btn.active {
            background: rgba(236, 72, 153, 0.2);
            border-color: #ec4899;
            color: #f472b6;
        }

        /* Grammar Legend Bar */
        .grammar-legend-bar {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.2rem;
            margin-bottom: 1.8rem;
            padding: 0.7rem 1.2rem;
            background: rgba(15, 23, 42, 0.7);
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 0.88rem;
        }
        .grammar-legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #cbd5e1;
            font-weight: 600;
        }
        .legend-chip {
            width: 12px;
            height: 12px;
            border-radius: 3px;
            display: inline-block;
        }
        .chip-legend-subjekt { background: #22c55e; box-shadow: 0 0 6px rgba(34, 197, 94, 0.6); }
        .chip-legend-verbum { background: #ef4444; box-shadow: 0 0 6px rgba(239, 68, 68, 0.6); }
        .chip-legend-maade { background: #ec4899; box-shadow: 0 0 6px rgba(236, 72, 153, 0.6); }
        .chip-legend-rest { background: #0ea5e9; box-shadow: 0 0 6px rgba(14, 165, 233, 0.6); }

        /* Sektion 1 Category Rows */
        .category-builder-rows {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 2.5rem;
        }
        .category-row-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.4rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-left: 4px solid #64748b;
        }
        .category-row-card.cat-row-subjekt { border-left-color: #22c55e; }
        .category-row-card.cat-row-verbum { border-left-color: #ef4444; }
        .category-row-card.cat-row-maade { border-left-color: #ec4899; }
        .category-row-card.cat-row-rest { border-left-color: #0ea5e9; }

        .category-row-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
        }
        .cat-badge-title {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            font-size: 1.1rem;
            font-weight: 800;
        }
        .cat-title-subjekt { color: #4ade80; }
        .cat-title-verbum { color: #f87171; }
        .cat-title-maade { color: #f472b6; }
        .cat-title-rest { color: #38bdf8; }
        .cat-grammar-role {
            font-size: 0.8rem;
            font-weight: 700;
            color: #94a3b8;
            background: rgba(255, 255, 255, 0.08);
            padding: 0.2rem 0.6rem;
            border-radius: 6px;
        }
        .cat-grammar-role.badge-subjekt { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .cat-grammar-role.badge-verbum { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
        .cat-grammar-role.badge-maade { background: rgba(236, 72, 153, 0.15); color: #f472b6; border: 1px solid rgba(236, 72, 153, 0.3); }
        .cat-grammar-role.badge-rest { background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3); }

        .category-options-flex {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
        }
        .cat-option-chip {
            background: #1e293b;
            color: #e2e8f0;
            border: 2px solid rgba(255, 255, 255, 0.1);
            padding: 0.6rem 1.1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .cat-option-chip:hover {
            transform: translateY(-2px);
        }
        .cat-option-chip.chip-subjekt:hover { border-color: #22c55e; }
        .cat-option-chip.chip-verbum:hover { border-color: #ef4444; }
        .cat-option-chip.chip-maade:hover { border-color: #ec4899; }
        .cat-option-chip.chip-rest:hover { border-color: #0ea5e9; }

        .cat-option-chip.chip-subjekt.selected {
            background: rgba(34, 197, 94, 0.25) !important;
            color: #4ade80 !important;
            border-color: #22c55e !important;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.4) !important;
        }
        .cat-option-chip.chip-verbum.selected {
            background: rgba(239, 68, 68, 0.25) !important;
            color: #fca5a5 !important;
            border-color: #ef4444 !important;
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.4) !important;
        }
        .cat-option-chip.chip-maade.selected {
            background: rgba(236, 72, 153, 0.25) !important;
            color: #f472b6 !important;
            border-color: #ec4899 !important;
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.4) !important;
        }
        .cat-option-chip.chip-rest.selected {
            background: rgba(14, 165, 233, 0.25) !important;
            color: #7dd3fc !important;
            border-color: #0ea5e9 !important;
            box-shadow: 0 0 15px rgba(14, 165, 233, 0.4) !important;
        }

        /* Live Sentence Showcase */
        .live-sentence-showcase {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95));
            border: 2px solid rgba(255, 255, 255, 0.15);
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .live-sentence-label {
            font-size: 0.85rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin-bottom: 0.8rem;
        }
        .live-sentence-text {
            font-size: 2rem;
            font-weight: 800;
            color: white;
            margin-bottom: 1.5rem;
            line-height: 1.4;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.6rem;
        }
        .live-word-subjekt { color: #4ade80; }
        .live-word-verbum { color: #f87171; }
        .live-word-maade { color: #f472b6; text-decoration: underline; }
        .live-word-rest { color: #38bdf8; }

        .live-sentence-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }
        .live-audio-btn {
            background: #ec4899;
            color: white;
            border: none;
            padding: 0.8rem 1.6rem;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .live-audio-btn:hover {
            background: #db2777;
            transform: scale(1.05);
        }

        /* Sektion 2 Challenge & Puslespil */
        .sb-task-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .sb-task-pills {
            display: flex;
            gap: 0.5rem;
        }
        .sb-task-pill {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #334155;
            color: #cbd5e1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s;
            border: 2px solid transparent;
        }
        .sb-task-pill:hover {
            background: #475569;
            transform: scale(1.08);
        }
        .sb-task-pill.active {
            background: #ec4899;
            color: white;
            border-color: #f472b6;
            box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
        }
        .sb-task-pill.done {
            border-color: #22c55e;
            color: #86efac;
        }
        .sb-context-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.3rem 1.5rem;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .sb-context-title {
            font-size: 1.1rem;
            color: #fce7f3;
            margin-bottom: 1rem;
            line-height: 1.5;
        }
        .sb-context-elements {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .sb-context-chip {
            background: #1e293b;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-size: 0.9rem;
            font-weight: 600;
            display: inline-flex;
            gap: 0.5rem;
            align-items: center;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .sb-context-chip.subjekt { border-left: 3px solid #22c55e; color: #4ade80; }
        .sb-context-chip.verbum { border-left: 3px solid #ef4444; color: #f87171; }
        .sb-context-chip.maade { border-left: 3px solid #ec4899; color: #f472b6; }
        .sb-context-chip.rest { border-left: 3px solid #0ea5e9; color: #38bdf8; }
        .sb-context-chip.target-placeholder {
            background: rgba(236, 72, 153, 0.18) !important;
            border: 2px dashed #ec4899 !important;
            border-left: 4px solid #ec4899 !important;
            color: #f472b6 !important;
            box-shadow: 0 0 16px rgba(236, 72, 153, 0.35) !important;
            animation: pulse-pink-slot 2s infinite ease-in-out;
        }
        @keyframes pulse-pink-slot {
            0%, 100% { border-color: rgba(236, 72, 153, 0.5); box-shadow: 0 0 10px rgba(236, 72, 153, 0.2); }
            50% { border-color: #ec4899; box-shadow: 0 0 22px rgba(236, 72, 153, 0.55); }
        }
        .sb-context-chip.target-placeholder.chip-filled {
            background: rgba(34, 197, 94, 0.2) !important;
            border: 2px solid #22c55e !important;
            border-left: 4px solid #22c55e !important;
            color: #4ade80 !important;
            box-shadow: 0 0 16px rgba(34, 197, 94, 0.35) !important;
            animation: none !important;
        }
        .sb-chip-role {
            font-size: 0.75rem;
            color: #94a3b8;
            text-transform: uppercase;
            font-weight: 800;
        }

        .sb-target-sentence-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
            border: 2px solid rgba(236, 72, 153, 0.45);
            border-radius: 14px;
            padding: 1.1rem 1.4rem;
            margin: 0.9rem 0 1.2rem 0;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .sb-target-sentence-label {
            font-size: 0.82rem;
            font-weight: 800;
            color: #f472b6;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
        }
        .sb-target-sentence-display {
            font-size: 1.4rem;
            font-weight: 700;
            color: #f8fafc;
            line-height: 1.6;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .sb-sentence-word {
            color: #f8fafc;
        }
        .sb-sentence-blank {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 110px;
            padding: 0.2rem 1rem;
            border: 2px dashed #ec4899;
            background: rgba(236, 72, 153, 0.16);
            border-radius: 8px;
            color: #f472b6;
            font-weight: 800;
            letter-spacing: 2px;
            transition: all 0.3s ease;
            box-shadow: 0 0 14px rgba(236, 72, 153, 0.3);
        }
        .sb-sentence-blank.filled {
            border: 2px solid #22c55e;
            background: rgba(34, 197, 94, 0.22);
            color: #4ade80;
            letter-spacing: normal;
            box-shadow: 0 0 16px rgba(34, 197, 94, 0.45);
            transform: scale(1.04);
        }
        .sb-question-box {
            background: rgba(236, 72, 153, 0.1);
            border: 1.5px solid #ec4899;
            border-radius: 14px;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
        }
        .sb-question-text {
            font-size: 1.25rem;
            font-weight: 800;
            color: white;
        }
        .sb-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .sb-option-btn {
            background: #334155;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.12);
            padding: 1rem;
            border-radius: 14px;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .sb-option-btn:hover {
            background: #475569;
            border-color: #ec4899;
            transform: translateY(-2px);
        }
        .sb-option-btn.correct {
            background: #15803d !important;
            border-color: #22c55e !important;
            color: white !important;
        }
        .sb-option-btn.incorrect {
            background: #b91c1c !important;
            border-color: #ef4444 !important;
        }

        /* Puzzle Section */
        .sb-puzzle-section {
            background: #0f172a;
            border-radius: 18px;
            padding: 2rem;
            border: 2px solid #ec4899;
            margin-top: 1.5rem;
            animation: fadeIn 0.35s ease;
        }
        .sb-puzzle-title {
            font-size: 1.35rem;
            font-weight: 800;
            color: #f472b6;
            margin-bottom: 0.4rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-puzzle-desc {
            color: #cbd5e1;
            font-size: 0.95rem;
            margin-bottom: 1.5rem;
            line-height: 1.5;
        }

        /* Architecture Flow Diagram */
        .sb-structure-diagram {
            background: #1e293b;
            border: 2px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
            padding: 1.4rem;
            margin-bottom: 1.8rem;
        }
        .structure-diagram-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .structure-diagram-badge {
            background: rgba(236, 72, 153, 0.2);
            border: 1.5px solid #ec4899;
            color: #f472b6;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.9rem;
        }
        .structure-diagram-hint {
            color: #94a3b8;
            font-size: 0.92rem;
            font-style: italic;
        }
        .structure-diagram-flow {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.6rem;
            overflow-x: auto;
            padding: 0.5rem 0;
        }
        .flow-step {
            flex: 1;
            min-width: 130px;
            background: #0f172a;
            border: 2px solid rgba(255, 255, 255, 0.15);
            border-radius: 14px;
            padding: 0.9rem 0.5rem;
            text-align: center;
            position: relative;
        }
        .flow-step.active-target {
            border: 2.5px solid #ec4899;
            background: linear-gradient(135deg, rgba(236, 72, 153, 0.25), rgba(15, 23, 42, 0.9));
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
        }
        .flow-step.flow-subjekt { border-color: rgba(34, 197, 94, 0.4); }
        .flow-step.flow-subjekt .flow-num { color: #4ade80; }
        .flow-step.flow-verbum { border-color: rgba(239, 68, 68, 0.4); }
        .flow-step.flow-verbum .flow-num { color: #f87171; }
        .flow-step.flow-adverbium { border-color: rgba(236, 72, 153, 0.6); }
        .flow-step.flow-adverbium .flow-num { color: #f472b6; }
        .flow-step.flow-rest { border-color: rgba(14, 165, 233, 0.4); }
        .flow-step.flow-rest .flow-num { color: #38bdf8; }
        .flow-num {
            font-size: 0.78rem;
            font-weight: 800;
            color: #94a3b8;
            margin-bottom: 0.25rem;
        }
        .flow-step.active-target .flow-num { color: #f472b6; }
        .flow-title {
            font-size: 0.95rem;
            font-weight: 800;
            color: white;
        }
        .flow-target-tag {
            background: #ec4899;
            color: white;
            font-size: 0.7rem;
            font-weight: 800;
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
            margin-top: 0.4rem;
            display: inline-block;
            box-shadow: 0 2px 8px rgba(236, 72, 153, 0.5);
        }
        .flow-arrow {
            font-size: 1.3rem;
            color: #475569;
            font-weight: 800;
        }

        /* Puzzle Slots Grid */
        .sb-puzzle-slots {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin-bottom: 1.8rem;
        }
        @media (max-width: 750px) {
            .sb-puzzle-slots { grid-template-columns: 1fr 1fr; }
        }
        .sb-puzzle-slot {
            background: #1e293b;
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 14px;
            padding: 1.2rem 0.8rem;
            min-height: 90px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: all 0.2s;
            position: relative;
            cursor: pointer;
        }
        .sb-puzzle-slot.target-adverbium-slot {
            border: 2.5px dashed #ec4899;
            background: rgba(236, 72, 153, 0.08);
            box-shadow: inset 0 0 15px rgba(236, 72, 153, 0.2);
        }
        .sb-puzzle-slot.filled {
            border-style: solid;
            border-color: #38bdf8;
            background: #0f172a;
        }
        .sb-puzzle-slot.slot-type-subjekt.filled {
            border-color: #22c55e !important;
            color: #4ade80 !important;
            background: rgba(34, 197, 94, 0.12) !important;
        }
        .sb-puzzle-slot.slot-type-verbum.filled {
            border-color: #ef4444 !important;
            color: #fca5a5 !important;
            background: rgba(239, 68, 68, 0.12) !important;
        }
        .sb-puzzle-slot.slot-type-adverbium.filled,
        .sb-puzzle-slot.target-adverbium-slot.filled {
            border-color: #ec4899 !important;
            color: #f472b6 !important;
            background: linear-gradient(135deg, rgba(236, 72, 153, 0.25), #0f172a) !important;
        }
        .sb-puzzle-slot.slot-type-rest.filled {
            border-color: #0ea5e9 !important;
            color: #7dd3fc !important;
            background: rgba(14, 165, 233, 0.12) !important;
        }
        .slot-target-callout {
            position: absolute;
            top: -12px;
            background: #ec4899;
            color: white;
            font-size: 0.72rem;
            font-weight: 800;
            padding: 0.15rem 0.6rem;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            white-space: nowrap;
        }
        .slot-hint {
            font-size: 0.85rem;
            font-weight: 700;
            color: #94a3b8;
            margin-bottom: 0.3rem;
        }
        .slot-role {
            font-size: 0.75rem;
            color: #64748b;
        }

        /* Puzzle Chips Pool */
        .sb-puzzle-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
            justify-content: center;
            margin-bottom: 1.8rem;
        }
        .sb-puzzle-chip {
            background: #334155;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.15);
            padding: 0.9rem 1.6rem;
            border-radius: 14px;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-puzzle-chip:hover {
            background: #475569;
            border-color: #ec4899;
            transform: translateY(-2px);
        }
        .sb-puzzle-chip.chip-is-adv {
            border-color: #ec4899;
            background: linear-gradient(135deg, rgba(236, 72, 153, 0.25), #334155);
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.35);
        }
        .sb-puzzle-chip.used {
            opacity: 0.25;
            pointer-events: none;
        }
        .reset-slots-btn {
            background: transparent;
            color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.55rem 1.2rem;
            border-radius: 10px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .reset-slots-btn:hover {
            background: rgba(255, 255, 255, 0.08);
            color: white;
        }

        /* Tab 5: Kontekst Testen */
        .kontekst-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 850px;
            margin: 0 auto;
        }
        .cloze-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 1.5rem;
        }
        .cloze-sentence-display {
            font-size: 1.4rem;
            line-height: 1.8;
            color: #f8fafc;
            margin-bottom: 2rem;
            text-align: center;
        }
        .cloze-blank {
            display: inline-block;
            min-width: 130px;
            padding: 0.2rem 1rem;
            border-bottom: 3px solid #ec4899;
            color: #f472b6;
            font-weight: 800;
            text-align: center;
        }
        .cloze-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
            gap: 1.2rem;
            margin-bottom: 2rem;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        .cloze-option-btn {
            background: #334155;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.15);
            padding: 1.1rem;
            border-radius: 14px;
            font-size: 1.2rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .cloze-option-btn:hover:not(:disabled) {
            background: #475569;
            border-color: #ec4899;
            transform: translateY(-3px);
        }
        .cloze-option-btn.correct {
            background: #15803d !important;
            border-color: #22c55e !important;
        }
        .cloze-option-btn.wrong {
            background: #b91c1c !important;
            border-color: #ef4444 !important;
            opacity: 0.6;
        }
        .cloze-didactic-feedback {
            background: rgba(236, 72, 153, 0.12);
            border: 1.5px solid #ec4899;
            padding: 1.2rem 1.5rem;
            border-radius: 14px;
            font-size: 1.05rem;
            line-height: 1.6;
            color: #fce7f3;
            margin-bottom: 1.5rem;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'adv-hero';
    hero.innerHTML = `
        <h1>${getTranslation('adv_f3_hero_title')}</h1>
        <p>${getTranslation('adv_f3_hero_desc')}</p>
        <div class="adv-rule-banner">
            <div class="rule-card-mini rule-ting">
                <span style="font-size: 1.5rem;">🚗</span>
                <div>
                    ${getTranslation('adv_f3_rule_adjektiv')}
                </div>
            </div>
            <div class="rule-card-mini rule-handling">
                <span style="font-size: 1.5rem;">🏃</span>
                <div>
                    ${getTranslation('adv_f3_rule_adverbium')}
                </div>
            </div>
        </div>
    `;
    viewContainer.appendChild(hero);

    // Tabs Navigation (Re-ordered: Aha-værkstedet as Tab 2, -t Detektiven as Tab 3)
    const tabsNav = document.createElement('div');
    tabsNav.className = 'adv-tabs-nav';

    const tabsConfig = [
        { id: 'tab_vrimmel', label: `1. ${getTranslation('adv_tab_vrimmel')} (20)`, icon: '🖼️' },
        { id: 'tab_vaerksted', label: `2. ${getTranslation('adv_tab_vaerksted')}`, icon: '💡' },
        { id: 'tab_detektiv', label: `3. ${getTranslation('adv_tab_detektiv')}`, icon: '🔍' },
        { id: 'tab_saetning', label: `4. ${getTranslation('adv_tab_saetning')}`, icon: '🧱' },
        { id: 'tab_kontekst', label: `5. ${getTranslation('adv_tab_kontekst')}`, icon: '🎯' }
    ];

    const tabButtons = {};
    tabsConfig.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `adv-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.innerHTML = `<span>${t.icon}</span> <span>${t.label}</span>`;
        btn.onclick = () => switchTab(t.id);
        tabButtons[t.id] = btn;
        tabsNav.appendChild(btn);
    });
    viewContainer.appendChild(tabsNav);

    // Content Container
    const tabContentContainer = document.createElement('div');
    tabContentContainer.className = 'adv-tab-content';
    viewContainer.appendChild(tabContentContainer);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/adverbier_maade/' + tabId);
        Object.keys(tabButtons).forEach(id => {
            tabButtons[id].classList.toggle('active', id === tabId);
        });
        renderActiveTab();
    }

    function renderActiveTab() {
        tabContentContainer.innerHTML = '';
        if (currentTab === 'tab_vrimmel') {
            renderTabVrimmel(tabContentContainer);
        } else if (currentTab === 'tab_vaerksted') {
            renderTabVaerksted(tabContentContainer);
        } else if (currentTab === 'tab_detektiv') {
            renderTabDetektiv(tabContentContainer);
        } else if (currentTab === 'tab_saetning') {
            renderTabSaetning(tabContentContainer);
        } else if (currentTab === 'tab_kontekst') {
            renderTabKontekst(tabContentContainer);
        }
    }

    // ==========================================
    // TAB 1: DET INTERAKTIVE BYRUM & VRIMLEBILLEDE
    // ==========================================
    function renderTabVrimmel(container) {
        // Clear container completely to avoid any duplicate rendering
        container.innerHTML = '';

        const layout = document.createElement('div');
        layout.className = 'vrimmel-layout';

        // Stage
        const stageCard = document.createElement('div');
        stageCard.className = 'vrimmel-stage-card';

        // Controls Bar
        const controlsBar = document.createElement('div');
        controlsBar.className = 'vrimmel-controls-bar';

        const filterGroup = document.createElement('div');
        filterGroup.className = 'vrimmel-filters';
        const filterBtns = [
            { id: 'all', label: 'Alle (20)' },
            { id: 't_rule', label: 'Med -t reglen (15)' },
            { id: 'special', label: 'Uforanderlige / Andre (5)' }
        ];
        filterBtns.forEach(fb => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${wordFilter === fb.id ? 'active' : ''}`;
            btn.textContent = fb.label;
            btn.onclick = () => {
                wordFilter = fb.id;
                renderTabVrimmel(container);
            };
            filterGroup.appendChild(btn);
        });
        controlsBar.appendChild(filterGroup);

        const pureToggle = document.createElement('button');
        pureToggle.className = `pure-toggle-btn ${isPureMode ? 'active' : ''}`;
        pureToggle.innerHTML = isPureMode ? '👁️ Vis hotspots' : '✨ Skjul hotspots (ren kunst)';
        pureToggle.onclick = () => {
            isPureMode = !isPureMode;
            renderTabVrimmel(container);
        };
        controlsBar.appendChild(pureToggle);
        stageCard.appendChild(controlsBar);

        // Canvas Wrapper
        const canvasWrapper = document.createElement('div');
        canvasWrapper.className = 'vrimmel-canvas-wrapper';

        const img = document.createElement('img');
        img.src = 'assets/adverbier_maade_vrimmel.jpg';
        img.alt = 'Vrimlebillede for mådesadverbier (-t reglen)';
        img.className = 'vrimmel-main-img';
        canvasWrapper.appendChild(img);

        // Render Hotspots
        if (!isPureMode) {
            ADVERBIER_MAADE_DATA.forEach(item => {
                if (wordFilter === 't_rule' && !item.hasTRule) return;
                if (wordFilter === 'special' && item.hasTRule) return;

                const pin = document.createElement('div');
                pin.className = `hotspot-pin ${item.id === selectedWordId ? 'selected' : ''}`;
                pin.style.left = `${item.x}%`;
                pin.style.top = `${item.y}%`;

                pin.innerHTML = `
                    <div class="pin-pill ${item.hasTRule ? 'pin-has-t' : 'pin-special'}">
                        <span>${item.hasTRule ? '⚡' : '✨'}</span>
                        <span>${item.word}</span>
                    </div>
                `;

                pin.onclick = (e) => {
                    e.stopPropagation();
                    selectedWordId = item.id;
                    updatePins();
                    updateInspector();
                    speakDanish(item.word);
                };

                canvasWrapper.appendChild(pin);
            });
        }
        stageCard.appendChild(canvasWrapper);
        layout.appendChild(stageCard);

        // Inspector Card
        const inspectorCard = document.createElement('div');
        inspectorCard.className = 'vrimmel-inspector-card';
        layout.appendChild(inspectorCard);

        function updatePins() {
            const allPins = canvasWrapper.querySelectorAll('.hotspot-pin');
            allPins.forEach(p => {
                const isMatch = p.textContent.includes(selectedWordId);
                p.classList.toggle('selected', isMatch);
            });
        }

        function updateInspector() {
            const word = ADVERBIER_MAADE_DATA.find(w => w.id === selectedWordId) || ADVERBIER_MAADE_DATA[0];
            const trans = getAdverbWordTranslation(word.id, 3);
            const transMeaning = trans?.meaning;
            const transSentence = trans?.sentence;

            inspectorCard.innerHTML = `
                <div class="inspector-header">
                    <div class="inspector-title-wrap">
                        <h2>
                            ${word.word}
                            ${transMeaning ? `<span class="inspector-trans-meaning" style="font-size: 1.15rem; color: #cbd5e1; font-weight: 600; margin-left: 0.5rem;">(${transMeaning})</span>` : ''}
                            <span class="inspector-badge">${word.hasTRule ? '⚡ -t regel' : '✨ Særord'}</span>
                        </h2>
                        <div style="color: #94a3b8; font-size: 0.95rem;">${word.meaning}</div>
                    </div>
                    <button class="inspector-audio-btn" id="inspector-play-btn" title="${getTranslation('adv_listen_word')}">🔊</button>
                </div>

                <!-- Aha Contrast Box -->
                <div class="aha-golden-box">
                    <div class="aha-header">
                        <span>💡</span> Den Gyldne Aha-Regel
                    </div>
                    <div class="aha-contrast-row">
                        <div class="aha-contrast-card">
                            <div class="aha-tag tag-ting">🚗 Ting (Adjektiv)</div>
                            <div class="aha-sentence">${word.tingExample}</div>
                        </div>
                        <div class="aha-contrast-card">
                            <div class="aha-tag tag-handling">🏃 Handling (Adverbium)</div>
                            <div class="aha-sentence">${word.handlingExample}</div>
                        </div>
                    </div>
                    <div style="font-size: 0.88rem; color: #fce7f3; line-height: 1.45;">
                        ${word.ruleHint}
                    </div>
                </div>

                <!-- Example Sentence Box -->
                <div class="inspector-sentence-box" style="margin-top: 1rem; background: rgba(0, 0, 0, 0.25); border-radius: 12px; padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.08);">
                    <div style="font-weight: 700; color: #38bdf8; margin-bottom: 0.3rem;">💬 ${getTranslation('adv_example_title')}:</div>
                    <div style="font-size: 1.05rem; color: #f8fafc;">
                        "${word.sentence.replace(new RegExp(`\\b${word.word}\\b`, 'gi'), `<strong>${word.word}</strong>`)}"
                    </div>
                    ${transSentence ? `<div class="inspector-trans-sentence" style="font-size: 0.95rem; color: #94a3b8; font-style: italic; margin-top: 0.35rem;">"${transSentence}"</div>` : ''}
                </div>

                <div class="inspector-scene-box" style="margin-top: 1rem;">
                    <div class="scene-heading">I vrimlebilledet:</div>
                    <p class="scene-text">${word.sceneDesc}</p>
                </div>

                <div class="inspector-actions">
                    <button class="inspector-btn-action" id="insp-speak-sentence">
                        <span>🗣️</span> ${getTranslation('adv_listen_sentence')}
                    </button>
                    <button class="inspector-btn-action" id="insp-go-vaerksted">
                        <span>💡</span> Træn i Aha-værkstedet
                    </button>
                </div>
            `;

            inspectorCard.querySelector('#inspector-play-btn').onclick = () => speakDanish(word.word);
            inspectorCard.querySelector('#insp-speak-sentence').onclick = () => speakDanish(word.sentence);
            inspectorCard.querySelector('#insp-go-vaerksted').onclick = () => switchTab('tab_vaerksted');
        }

        updateInspector();
        container.appendChild(layout);
    }

    // ==========================================
    // TAB 2: AHA-VÆRKSTEDET (-t Transformeren & Mådes-kontraster)
    // ==========================================
    let vaerkstedSubTab = 'transformer'; // 'transformer' or 'pairs'

    const TRANSFORMER_PAIRS = [
        {
            adj: 'hurtig',
            adv: 'hurtigt',
            subjekt: 'Bilen',
            tingSentence: 'Bilen er hurtig.',
            handlingSentence: 'Bilen kører hurtigt.',
            explanation: 'Når vi taler om måden bilen kører på (handlingen), sætter vi -t på: hurtig + t = hurtigt!'
        },
        {
            adj: 'langsom',
            adv: 'langsomt',
            subjekt: 'Cykelrytteren',
            tingSentence: 'Cykelrytteren er langsom.',
            handlingSentence: 'Cykelrytteren cykler langsomt.',
            explanation: 'Handlingen at cykle foregår med lav fart: langsom + t = langsomt.'
        },
        {
            adj: 'pæn',
            adv: 'pænt',
            subjekt: 'Konditoren',
            tingSentence: 'Konditorens kage er pæn.',
            handlingSentence: 'Konditoren pynter kagen pænt.',
            explanation: 'Handlingen at pynte udføres med stor elegance: pæn + t = pænt.'
        },
        {
            adj: 'hård',
            adv: 'hårdt',
            subjekt: 'Håndværkeren',
            tingSentence: 'Hammeren er hård.',
            handlingSentence: 'Håndværkeren slår hårdt.',
            explanation: 'Handlingen at slå udføres med kraft: hård + t = hårdt.'
        },
        {
            adj: 'god',
            adv: 'godt',
            subjekt: 'Kokken',
            tingSentence: 'Maden er god.',
            handlingSentence: 'Kokken laver mad godt.',
            explanation: 'God forvandles til godt, når det beskriver handlingen at lave mad.'
        },
        {
            adj: 'høj',
            adv: 'højt',
            subjekt: 'Sangeren',
            tingSentence: 'Stemmen er høj.',
            handlingSentence: 'Sangeren synger højt.',
            explanation: 'Handlingen at synge foregår med høj volumen: høj + t = højt.'
        }
    ];

    let selectedTransformerIndex = 0;
    let transformerIsTransformed = false;

    // Contrast Pairs Data
    const CONTRAST_PAIRS = [
        { id: 1, left: 'hurtigt', right: 'langsomt', emoji: '🏃' },
        { id: 2, left: 'højt', right: 'stille / lavt', emoji: '🎺' },
        { id: 3, left: 'godt', right: 'dårligt', emoji: '🍰' },
        { id: 4, left: 'nemt', right: 'svært', emoji: '🎈' },
        { id: 5, left: 'pænt', right: 'grimt', emoji: '🎨' },
        { id: 6, left: 'sammen', right: 'alene', emoji: '⚽' }
    ];

    let matchedPairIds = [];
    let selectedLeftId = null;
    let selectedRightId = null;

    function renderTabVaerksted(container) {
        container.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.className = 'vaerksted-container';

        wrap.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 2rem; color: #f472b6; margin-bottom: 0.5rem;">💡 Aha-værkstedet</h2>
                <p style="color: #94a3b8; margin: 0;">Mærk forvandlingen for dine egne øjne og træn mådernes modsætninger.</p>
            </div>

            <div class="vaerksted-tabs">
                <button class="vaerksted-subtab-btn ${vaerkstedSubTab === 'transformer' ? 'active' : ''}" id="v-tab-trans">
                    ⚡ 1. Den Magiske -t Knap (Transformeren)
                </button>
                <button class="vaerksted-subtab-btn ${vaerkstedSubTab === 'pairs' ? 'active' : ''}" id="v-tab-pairs">
                    🔄 2. Modsat-måder (Parrings-øvelse)
                </button>
            </div>

            <div id="vaerksted-subcontent"></div>
        `;

        wrap.querySelector('#v-tab-trans').onclick = () => {
            vaerkstedSubTab = 'transformer';
            renderTabVaerksted(container);
        };
        wrap.querySelector('#v-tab-pairs').onclick = () => {
            vaerkstedSubTab = 'pairs';
            renderTabVaerksted(container);
        };

        const subContent = wrap.querySelector('#vaerksted-subcontent');

        if (vaerkstedSubTab === 'transformer') {
            renderTransformerSub(subContent);
        } else {
            renderPairsSub(subContent);
        }

        container.appendChild(wrap);
    }

    function renderTransformerSub(subContainer) {
        const cur = TRANSFORMER_PAIRS[selectedTransformerIndex];

        subContainer.innerHTML = `
            <div class="transformer-card">
                <div class="transformer-word-picker" id="trans-picker"></div>

                <div class="trans-stage">
                    <!-- Left: Ting Box -->
                    <div class="trans-box ting">
                        <div class="trans-box-tag" style="color: #38bdf8;">🚗 Ting (Adjektiv)</div>
                        <div class="trans-box-word" style="color: #38bdf8;">${cur.adj}</div>
                        <div class="trans-box-sentence">"${cur.tingSentence}"</div>
                        <button class="filter-btn" style="margin-top: 0.8rem; background: #0369a1;" id="audio-ting-btn">🔊 Hør sætning</button>
                    </div>

                    <div style="font-size: 2rem; color: #ec4899; font-weight: 800;">➔</div>

                    <!-- Right: Handling Box -->
                    <div class="trans-box handling" style="${transformerIsTransformed ? 'box-shadow: 0 0 25px rgba(236, 72, 153, 0.5);' : 'opacity: 0.4; filter: grayscale(80%);'}">
                        <div class="trans-box-tag" style="color: #f472b6;">🏃 Handling (Adverbium)</div>
                        <div class="trans-box-word" style="color: #f472b6;">
                            ${transformerIsTransformed ? cur.adv : `${cur.adj} + ?`}
                        </div>
                        <div class="trans-box-sentence">
                            ${transformerIsTransformed ? `"${cur.handlingSentence}"` : '(Tryk på knappen herunder!)'}
                        </div>
                        ${transformerIsTransformed ? '<button class="filter-btn" style="margin-top: 0.8rem; background: #be185d;" id="audio-handling-btn">🔊 Hør sætning</button>' : ''}
                    </div>
                </div>

                <button class="trans-action-button" id="trans-trigger-btn">
                    <span>⚡</span> ${transformerIsTransformed ? '✓ -t er sat på! (Prøv næste ord)' : 'Sæt -t på for handling!'}
                </button>

                <div style="margin-top: 1.5rem; background: rgba(30, 41, 59, 0.7); padding: 1.2rem; border-radius: 14px; color: #e2e8f0; font-size: 1.05rem; line-height: 1.5;">
                    💡 <strong>Aha!</strong> ${cur.explanation}
                </div>
            </div>
        `;

        const picker = subContainer.querySelector('#trans-picker');
        TRANSFORMER_PAIRS.forEach((p, idx) => {
            const chip = document.createElement('button');
            chip.className = `trans-word-chip ${selectedTransformerIndex === idx ? 'active' : ''}`;
            chip.textContent = `${p.adj} ➔ ${p.adv}`;
            chip.onclick = () => {
                selectedTransformerIndex = idx;
                transformerIsTransformed = false;
                renderTransformerSub(subContainer);
            };
            picker.appendChild(chip);
        });

        subContainer.querySelector('#trans-trigger-btn').onclick = () => {
            transformerIsTransformed = true;
            renderTransformerSub(subContainer);
            speakDanish(cur.handlingSentence);
        };

        subContainer.querySelector('#audio-ting-btn').onclick = () => speakDanish(cur.tingSentence);
        const handlingBtn = subContainer.querySelector('#audio-handling-btn');
        if (handlingBtn) handlingBtn.onclick = () => speakDanish(cur.handlingSentence);
    }

    function renderPairsSub(subContainer) {
        subContainer.innerHTML = `
            <div style="background: #0f172a; border-radius: 18px; padding: 2rem; border: 1px solid rgba(255, 255, 255, 0.08);">
                <div style="text-align: center; margin-bottom: 1.5rem; color: #94a3b8; font-size: 1rem;">
                    Forbind måderne med deres direkte modsætninger. Klik på et ord til venstre og derefter på dets modstykke til højre:
                </div>

                <div class="match-pairs-grid">
                    <div class="pairs-col" id="pairs-left-col">
                        <div class="pairs-heading">Måde A</div>
                    </div>
                    <div class="pairs-col" id="pairs-right-col">
                        <div class="pairs-heading">Modsat Måde B</div>
                    </div>
                </div>

                <div id="pairs-progress-status" style="text-align: center; font-weight: 800; color: #f472b6; font-size: 1.1rem;">
                    Matchet: ${matchedPairIds.length} af ${CONTRAST_PAIRS.length} par
                </div>
            </div>
        `;

        const leftCol = subContainer.querySelector('#pairs-left-col');
        const rightCol = subContainer.querySelector('#pairs-right-col');

        // Left items
        CONTRAST_PAIRS.forEach(pair => {
            const isMatched = matchedPairIds.includes(pair.id);
            const isSelected = selectedLeftId === pair.id;

            const btn = document.createElement('button');
            btn.className = `pair-card-btn ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`;
            btn.innerHTML = `<span>${pair.emoji} ${pair.left}</span> <span>${isMatched ? '✓' : '➔'}</span>`;

            btn.onclick = () => {
                if (isMatched) return;
                selectedLeftId = pair.id;
                checkPairMatch();
                renderPairsSub(subContainer);
            };

            leftCol.appendChild(btn);
        });

        // Right items (shuffled)
        const rightList = [...CONTRAST_PAIRS].sort((a, b) => (a.id * 3) % 7 - (b.id * 3) % 7);
        rightList.forEach(pair => {
            const isMatched = matchedPairIds.includes(pair.id);
            const isSelected = selectedRightId === pair.id;

            const btn = document.createElement('button');
            btn.className = `pair-card-btn ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`;
            btn.innerHTML = `<span>${isMatched ? '✓' : '➔'}</span> <span>${pair.right}</span>`;

            btn.onclick = () => {
                if (isMatched) return;
                selectedRightId = pair.id;
                checkPairMatch();
                renderPairsSub(subContainer);
            };

            rightCol.appendChild(btn);
        });

        function checkPairMatch() {
            if (selectedLeftId && selectedRightId) {
                if (selectedLeftId === selectedRightId) {
                    matchedPairIds.push(selectedLeftId);
                    speakDanish(CONTRAST_PAIRS.find(p => p.id === selectedLeftId).left);
                }
                selectedLeftId = null;
                selectedRightId = null;
            }
        }
    }

    // ==========================================
    // TAB 3: DETEKTIVEN (-t reglen: Ting vs. Handling)
    // ==========================================
    const DETEKTIV_TASKS = [
        {
            id: 1,
            sceneContext: 'Motorvejen og byen',
            sentenceParts: ['Bussen kører meget ', ' på motorvejen.'],
            correctWord: 'hurtigt',
            distractorWord: 'hurtig',
            targetType: 'handling',
            hint: 'Spørg dig selv: Beskriver ordet bussen (en ting) eller måden den kører på (en handling)?',
            feedbackCorrect: '💡 Fantastisk! Ordet beskriver verbet "kører" (handlingen) – derfor skal vi sætte -t på: hurtig + t = hurtigt!',
            feedbackWrong: '⚠️ Prøv igen! Hvis det beskriver en handling (kører), skal vi sætte -t på ordet.'
        },
        {
            id: 2,
            sceneContext: 'Busstoppestedet',
            sentenceParts: ['Det er en virkelig ', ' bus.'],
            correctWord: 'hurtig',
            distractorWord: 'hurtigt',
            targetType: 'ting',
            hint: 'Beskriver ordet bussen selv, eller hvordan den kører?',
            feedbackCorrect: '💡 Præcis! Her beskriver ordet selve bussen (substantivet/tingen). Derfor er det et adjektiv UDEN adverbie-t: en hurtig bus!',
            feedbackWrong: '⚠️ Pas på! Her taler vi om tingen (bussen), ikke handlingen at køre. Så skal der ikke -t på.'
        },
        {
            id: 3,
            sceneContext: 'Koncerten i parken',
            sentenceParts: ['Anna synger utrolig ', ' foran publikum.'],
            correctWord: 'smukt',
            distractorWord: 'smuk',
            targetType: 'handling',
            hint: 'Beskriver ordet sangstemmen/handlingen at synge, eller Anna selv?',
            feedbackCorrect: '💡 Lige i øjet! Ordet beskriver verbet "synger" (handlingen). Smuk + t = smukt!',
            feedbackWrong: '⚠️ Ikke helt. Ordet knytter sig til verbet "synger", så vi skal have -t på.'
        },
        {
            id: 4,
            sceneContext: 'Køkkenet og middagen',
            sentenceParts: ['Suppen smager virkelig ', ' i dag.'],
            correctWord: 'godt',
            distractorWord: 'god',
            targetType: 'handling',
            hint: 'Hvordan smager den? Beskriver fornemmelsen/handlingen.',
            feedbackCorrect: '💡 Rigtigt! "Godt" beskriver måden noget smager eller udføres på: "smager godt", "laver mad godt"!',
            feedbackWrong: '⚠️ Husk: "En god suppe" (ting), men "suppen smager godt" (handling/sansning).'
        },
        {
            id: 5,
            sceneContext: 'Biblioteket og caféen',
            sentenceParts: ['Gæsterne sidder og læser ', ' ved bordet.'],
            correctWord: 'stille',
            distractorWord: 'stillet',
            targetType: 'special',
            hint: 'Læg mærke til ordets endelse – ender det allerede på -e?',
            feedbackCorrect: '💡 Brilliant! "Stille" ender allerede på -e og får aldrig et ekstra -t: "at sidde stille".',
            feedbackWrong: '⚠️ Pas på særreglen: "Stille" ender på -e og får IKKE ekstra -t.'
        },
        {
            id: 6,
            sceneContext: 'Byggepladsen',
            sentenceParts: ['Håndværkeren slår ', ' med hammeren.'],
            correctWord: 'hårdt',
            distractorWord: 'hård',
            targetType: 'handling',
            hint: 'Beskriver ordet hammerens kraft (handlingen at slå), eller stenen?',
            feedbackCorrect: '💡 Helt rigtigt! Det beskriver handlingen "slår". Hård + t = hårdt!',
            feedbackWrong: '⚠️ Prøv igen. Det er måden han slår på, så vi skal have -t på.'
        },
        {
            id: 7,
            sceneContext: 'Klassen',
            sentenceParts: ['Læreren forklarer lektien meget ', '.'],
            correctWord: 'tydeligt',
            distractorWord: 'tydelig',
            targetType: 'handling',
            hint: 'Hvordan forklarer hun? Beskriver handlingen "forklarer".',
            feedbackCorrect: '💡 Korrekt! Ordet beskriver måden hun forklarer på (verbum). Tydelig + t = tydeligt!',
            feedbackWrong: '⚠️ Hun forklarer på en tydelig måde: forklare tydeligt!'
        },
        {
            id: 8,
            sceneContext: 'Stuen med glas og kopper',
            sentenceParts: ['Drengen bar koppen meget ', ' hen til bordet.'],
            correctWord: 'forsigtigt',
            distractorWord: 'forsigtig',
            targetType: 'handling',
            hint: 'Hvordan bar han den? Han passede på under handlingen.',
            feedbackCorrect: '💡 Super flot! Han bar den forsigtigt. Ordet beskriver verbet "bar".',
            feedbackWrong: '⚠️ Han udførte handlingen med stor omhu: bar forsigtigt!'
        }
    ];

    let detektivIndex = 0;
    let detektivScore = 0;
    let detektivAnswered = false;

    function renderTabDetektiv(container) {
        container.innerHTML = '';

        const detektivWrap = document.createElement('div');
        detektivWrap.className = 'detektiv-container';

        const task = DETEKTIV_TASKS[detektivIndex];

        detektivWrap.innerHTML = `
            <div class="detektiv-header">
                <h2>🔍 -t Detektiven: Ting eller Handling?</h2>
                <p style="color: #94a3b8; margin: 0;">Træn den gyldne regel: Beskriver ordet en <strong>ting</strong> eller en <strong>handling</strong>?</p>
            </div>

            <div class="detektiv-progress">
                <span>Opgave ${detektivIndex + 1} af ${DETEKTIV_TASKS.length}</span>
                <span>Score: ${detektivScore} point ⭐</span>
            </div>

            <div class="detektiv-card">
                <div class="detektiv-context-tag">📍 Kontekst: ${task.sceneContext}</div>
                <div class="detektiv-prompt-sentence">
                    ${task.sentenceParts[0]}<span class="detektiv-blank" id="detektiv-blank">_____</span>${task.sentenceParts[1]}
                </div>
                <div class="detektiv-question-hint">
                    💡 <strong>Detektivens ledetråd:</strong> ${task.hint}
                </div>

                <div class="detektiv-options" id="detektiv-options-grid"></div>
                <div id="detektiv-feedback-box"></div>
                <button class="detektiv-next-btn" id="detektiv-next-btn" style="display: none;">
                    ${detektivIndex < DETEKTIV_TASKS.length - 1 ? 'Næste opgave ➔' : 'Se samlet resultat 🏆'}
                </button>
            </div>
        `;

        const optionsGrid = detektivWrap.querySelector('#detektiv-options-grid');
        const feedbackBox = detektivWrap.querySelector('#detektiv-feedback-box');
        const nextBtn = detektivWrap.querySelector('#detektiv-next-btn');
        const blankSpan = detektivWrap.querySelector('#detektiv-blank');

        const choices = [
            { word: task.correctWord, isCorrect: true, sub: task.correctWord.endsWith('t') ? 'Handling (+t)' : 'Særform' },
            { word: task.distractorWord, isCorrect: false, sub: task.distractorWord.endsWith('t') ? 'Handling (+t)' : 'Ting (grundform)' }
        ];
        // Stable alternation
        choices.sort(() => (task.id % 2 === 0 ? 1 : -1));

        choices.forEach(ch => {
            const btn = document.createElement('button');
            btn.className = 'detektiv-opt-btn';
            btn.innerHTML = `
                <span>${ch.word}</span>
                <span class="detektiv-opt-sub">${ch.sub}</span>
            `;

            btn.onclick = () => {
                if (detektivAnswered) return;
                detektivAnswered = true;

                blankSpan.textContent = ch.word;

                if (ch.isCorrect) {
                    btn.classList.add('correct');
                    detektivScore += 10;
                    feedbackBox.className = 'detektiv-feedback correct';
                    feedbackBox.innerHTML = task.feedbackCorrect;
                    speakDanish(ch.word);
                } else {
                    btn.classList.add('wrong');
                    feedbackBox.className = 'detektiv-feedback wrong';
                    feedbackBox.innerHTML = task.feedbackWrong;
                    optionsGrid.querySelectorAll('.detektiv-opt-btn').forEach(b => {
                        if (b.textContent.includes(task.correctWord)) b.classList.add('correct');
                    });
                }

                nextBtn.style.display = 'block';
            };

            optionsGrid.appendChild(btn);
        });

        nextBtn.onclick = () => {
            detektivAnswered = false;
            if (detektivIndex < DETEKTIV_TASKS.length - 1) {
                detektivIndex++;
                renderTabDetektiv(container);
            } else {
                renderDetektivSummary(container);
            }
        };

        container.appendChild(detektivWrap);
    }

    function renderDetektivSummary(container) {
        const wrap = document.createElement('div');
        wrap.className = 'detektiv-container';
        wrap.style.textAlign = 'center';

        const maxScore = DETEKTIV_TASKS.length * 10;
        const pct = Math.round((detektivScore / maxScore) * 100);

        wrap.innerHTML = `
            <div style="font-size: 3.5rem; margin-bottom: 1rem;">🏆</div>
            <h2 style="font-size: 2.2rem; color: #f472b6; margin-bottom: 0.5rem;">Flot klaret i Detektiven!</h2>
            <p style="font-size: 1.2rem; color: #cbd5e1; margin-bottom: 1.5rem;">
                Du fik <strong>${detektivScore}</strong> ud af <strong>${maxScore}</strong> point (${pct}%).
            </p>
            <div style="background: rgba(15, 23, 42, 0.7); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                ${pct >= 80 ? '🌟 Fantastisk! Du har fuldstændig knækket koden til hvornår danskerne sætter -t på handlinger.' : 'God indsats! Prøv igen for at få 100% styr på -t reglen.'}
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="detektiv-next-btn" style="margin: 0;" id="detektiv-retry-btn">🔄 Prøv igen</button>
                <button class="detektiv-next-btn" style="margin: 0; background: #3b82f6;" id="detektiv-go-saetning">Gå til Sætningsbyggeren ➔</button>
            </div>
        `;

        wrap.querySelector('#detektiv-retry-btn').onclick = () => {
            detektivIndex = 0;
            detektivScore = 0;
            detektivAnswered = false;
            renderTabDetektiv(container);
        };
        wrap.querySelector('#detektiv-go-saetning').onclick = () => switchTab('tab_saetning');

        container.appendChild(wrap);
    }

    // ==========================================
    // TAB 4: SÆTNINGSBYGGEREN (To-trins modellen)
    // ==========================================
    let saetningSubTab = 'builder'; // 'builder' or 'puzzle'
    let currentMaadeChallengeIdx = 0;
    const completedMaadeChallenges = new Set();

    // Sektion 1 Category Choices
    const BUILDER_CATEGORIES = {
        subjekt: [
            { text: 'Bussen', role: 'Subjekt (køretøj)' },
            { text: 'Konditoren', role: 'Subjekt (person)' },
            { text: 'Løberen', role: 'Subjekt (person)' },
            { text: 'Håndværkeren', role: 'Subjekt (person)' },
            { text: 'Musikeren', role: 'Subjekt (person)' },
            { text: 'Katten', role: 'Subjekt (dyr)' },
            { text: 'Læreren', role: 'Subjekt (person)' },
            { text: 'Drengen', role: 'Subjekt (barn)' }
        ],
        verbum: [
            { text: 'kører', role: 'Verbum (handling)' },
            { text: 'bager', role: 'Verbum (handling)' },
            { text: 'løber', role: 'Verbum (handling)' },
            { text: 'slår', role: 'Verbum (handling)' },
            { text: 'spiller', role: 'Verbum (handling)' },
            { text: 'lander', role: 'Verbum (handling)' },
            { text: 'taler', role: 'Verbum (handling)' },
            { text: 'bærer', role: 'Verbum (handling)' }
        ],
        maade: [
            { text: 'hurtigt', role: 'Mådesadverbium (-t)' },
            { text: 'langsomt', role: 'Mådesadverbium (-t)' },
            { text: 'pænt', role: 'Mådesadverbium (-t)' },
            { text: 'hårdt', role: 'Mådesadverbium (-t)' },
            { text: 'højt', role: 'Mådesadverbium (-t)' },
            { text: 'blødt', role: 'Mådesadverbium (-t)' },
            { text: 'tydeligt', role: 'Mådesadverbium (-t)' },
            { text: 'forsigtigt', role: 'Mådesadverbium (-t)' }
        ],
        rest: [
            { text: 'på vejen', role: 'Stedsangivelse' },
            { text: 'i køkkenet', role: 'Stedsangivelse' },
            { text: 'gennem byen', role: 'Stedsangivelse' },
            { text: 'med hammeren', role: 'Redskab' },
            { text: 'for publikum', role: 'Målgruppe' },
            { text: 'på havepuden', role: 'Stedsangivelse' },
            { text: 'foran klassen', role: 'Stedsangivelse' },
            { text: 'med begge hænder', role: 'Redskab' }
        ]
    };

    let selectedBuilderWords = {
        subjekt: 'Bussen',
        verbum: 'kører',
        maade: 'hurtigt',
        rest: 'på vejen'
    };

    // Sektion 2 Challenge Tasks with Puzzle Flow
    const MAADE_CHALLENGE_TASKS = [
        {
            id: 1,
            context: 'Løberen deltager i et byløb og har masser af energi.',
            subjekt: 'Løberen',
            verbum: 'løber',
            rest: 'gennem parken',
            questionPrompt: 'Hvordan løber han gennem parken?',
            correctAdv: 'hurtigt',
            distractors: ['langsomt', 'stille', 'grimt'],
            pedagogyNote: 'Verbet "løber" beskriver en handling i højt tempo: hurtig + t = hurtigt!',
            advWord: 'hurtigt',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Normal ordstilling: Mådesadverbiet "hurtigt" på 3. plads',
            structureNote: 'Mådesadverbiet placeres naturligt efter verbet for at beskrive handlingen.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Mådesadverbium', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'HER STÅR ADVERBIET!' },
                { num: '4. plads', title: 'Hvorhen?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem?', '2. Handling?', '3. Hvordan? ⭐', '4. Hvorhen?'],
            roles: ['[Subjekt]', '[Verbum]', '[Mådesadverbium]', '[Præpositionsled]'],
            chips: ['Løberen', 'løber', 'hurtigt', 'gennem parken'],
            correctSentence: ['Løberen', 'løber', 'hurtigt', 'gennem parken']
        },
        {
            id: 2,
            context: 'Konditoren bruger mange timer på at dekorere bryllupskagen.',
            subjekt: 'Konditoren',
            verbum: 'pynter',
            rest: 'den store kage',
            questionPrompt: 'Hvordan pynter hun kagen til gæsterne?',
            correctAdv: 'pænt',
            distractors: ['grimt', 'hårdt', 'forkert'],
            pedagogyNote: 'Pynte er en æstetisk handling: pæn + t = pænt!',
            advWord: 'pænt',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Normal ordstilling: Mådesadverbiet "pænt" på 3. plads',
            structureNote: 'Ordet knytter sig direkte til verbet "pynter" og placeres på 3. plads.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Mådesadverbium', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'HER STÅR ADVERBIET!' },
                { num: '4. plads', title: 'Hvad?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem?', '2. Handling?', '3. Hvordan? ⭐', '4. Hvad?'],
            roles: ['[Subjekt]', '[Verbum]', '[Mådesadverbium]', '[Objekt]'],
            chips: ['Konditoren', 'pynter', 'pænt', 'den store kage'],
            correctSentence: ['Konditoren', 'pynter', 'pænt', 'den store kage']
        },
        {
            id: 3,
            context: 'Brostenene sidder fast i jorden og kræver store kræfter.',
            subjekt: 'Manden',
            verbum: 'slår',
            rest: 'på de faste sten',
            questionPrompt: 'Hvordan slår han med den tunge hammer?',
            correctAdv: 'hårdt',
            distractors: ['blødt', 'stille', 'langsomt'],
            pedagogyNote: 'Slå kræver kraft: hård + t = hårdt!',
            advWord: 'hårdt',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Normal ordstilling: Mådesadverbiet "hårdt" på 3. plads',
            structureNote: 'Hårdt angiver styrken i slaget og placeres lige efter verbet.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Mådesadverbium', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'HER STÅR ADVERBIET!' },
                { num: '4. plads', title: 'Hvorpå?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem?', '2. Handling?', '3. Hvordan? ⭐', '4. Hvorpå?'],
            roles: ['[Subjekt]', '[Verbum]', '[Mådesadverbium]', '[Præpositionsled]'],
            chips: ['Manden', 'slår', 'hårdt', 'på de faste sten'],
            correctSentence: ['Manden', 'slår', 'hårdt', 'på de faste sten']
        },
        {
            id: 4,
            context: 'Eleverne skal lære de nye ord og lytter opmærksomt.',
            subjekt: 'Læreren',
            verbum: 'taler',
            rest: 'foran alle eleverne',
            questionPrompt: 'Hvordan taler læreren foran klassen?',
            correctAdv: 'tydeligt',
            distractors: ['svært', 'stille', 'dårligt'],
            pedagogyNote: 'Læreren gør udtalen letforståelig: tydelig + t = tydeligt!',
            advWord: 'tydeligt',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Normal ordstilling: Mådesadverbiet "tydeligt" på 3. plads',
            structureNote: 'Tydeligt beskriver måden der tales på og følger verbet.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Mådesadverbium', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'HER STÅR ADVERBIET!' },
                { num: '4. plads', title: 'For hvem?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem?', '2. Handling?', '3. Hvordan? ⭐', '4. For hvem?'],
            roles: ['[Subjekt]', '[Verbum]', '[Mådesadverbium]', '[Præpositionsled]'],
            chips: ['Læreren', 'taler', 'tydeligt', 'foran alle eleverne'],
            correctSentence: ['Læreren', 'taler', 'tydeligt', 'foran alle eleverne']
        },
        {
            id: 5,
            context: 'Katten hopper ned fra stakittet og rammer puden.',
            subjekt: 'Katten',
            verbum: 'lander',
            rest: 'på den bløde pude',
            questionPrompt: 'Hvordan lander katten på puden?',
            correctAdv: 'blødt',
            distractors: ['hårdt', 'grimt', 'højt'],
            pedagogyNote: 'En fjedrende og skånsom landing: blød + t = blødt!',
            advWord: 'blødt',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Normal ordstilling: Mådesadverbiet "blødt" på 3. plads',
            structureNote: 'Blødt knytter sig til landingen og står på plads 3.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Mådesadverbium', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'HER STÅR ADVERBIET!' },
                { num: '4. plads', title: 'Hvor?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem?', '2. Handling?', '3. Hvordan? ⭐', '4. Hvor?'],
            roles: ['[Subjekt]', '[Verbum]', '[Mådesadverbium]', '[Præpositionsled]'],
            chips: ['Katten', 'lander', 'blødt', 'på den bløde pude'],
            correctSentence: ['Katten', 'lander', 'blødt', 'på den bløde pude']
        },
        {
            id: 6,
            context: 'Isen har fire store kugler og må ikke falde på jorden.',
            subjekt: 'Drengen',
            verbum: 'bærer',
            rest: 'den store isvaffel',
            questionPrompt: 'Hvordan bærer drengen isen?',
            correctAdv: 'forsigtigt',
            distractors: ['hurtigt', 'hårdt', 'forkert'],
            pedagogyNote: 'Drengen passer meget på: forsigtig + t = forsigtigt!',
            advWord: 'forsigtigt',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Normal ordstilling: Mådesadverbiet "forsigtigt" på 3. plads',
            structureNote: 'Forsigtigt beskriver håndteringen af isen og står på 3. plads.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Mådesadverbium', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'HER STÅR ADVERBIET!' },
                { num: '4. plads', title: 'Hvad?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem?', '2. Handling?', '3. Hvordan? ⭐', '4. Hvad?'],
            roles: ['[Subjekt]', '[Verbum]', '[Mådesadverbium]', '[Objekt]'],
            chips: ['Drengen', 'bærer', 'forsigtigt', 'den store isvaffel'],
            correctSentence: ['Drengen', 'bærer', 'forsigtigt', 'den store isvaffel']
        }
    ];

    function renderTabSaetning(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'saetning-container';

        // Sub Navigation: 1. Udforsk sætningen vs 2. Pusleopgaven
        const subNav = document.createElement('div');
        subNav.className = 'sb-sub-nav';

        const subTab1Btn = document.createElement('button');
        subTab1Btn.className = `sb-sub-btn ${saetningSubTab === 'builder' ? 'active' : ''}`;
        subTab1Btn.innerHTML = `<span>🎨</span> 1. Udforsk sætningen (Hjælpespørgsmål)`;

        const subTab2Btn = document.createElement('button');
        subTab2Btn.className = `sb-sub-btn ${saetningSubTab === 'puzzle' ? 'active' : ''}`;
        subTab2Btn.innerHTML = `<span>🧩</span> 2. Pusleopgaven (Udfordring)`;

        subNav.appendChild(subTab1Btn);
        subNav.appendChild(subTab2Btn);
        container.appendChild(subNav);

        const freeContainer = document.createElement('div');
        freeContainer.style.display = saetningSubTab === 'builder' ? 'block' : 'none';

        const challengeContainer = document.createElement('div');
        challengeContainer.style.display = saetningSubTab === 'puzzle' ? 'block' : 'none';

        container.appendChild(freeContainer);
        container.appendChild(challengeContainer);

        subTab1Btn.onclick = () => {
            saetningSubTab = 'builder';
            subTab1Btn.classList.add('active');
            subTab2Btn.classList.remove('active');
            freeContainer.style.display = 'block';
            challengeContainer.style.display = 'none';
        };

        subTab2Btn.onclick = () => {
            saetningSubTab = 'puzzle';
            subTab2Btn.classList.add('active');
            subTab1Btn.classList.remove('active');
            freeContainer.style.display = 'none';
            challengeContainer.style.display = 'block';
            setupChallengeSection();
        };

        // ==========================================
        // SEKTION 1: UDFORSK SÆTNINGEN
        // ==========================================
        function setupFreeBuilder() {
            freeContainer.innerHTML = `
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h3 style="font-size: 1.7rem; color: white; margin-bottom: 0.4rem;">Byg dine egne sætninger med mådesadverbier</h3>
                    <p style="color: #94a3b8; font-size: 1.05rem; max-width: 650px; margin: 0 auto;">
                        Vælg ét element fra hver række herunder. Læg mærke til hjælpespørgsmålene, og lyt til hvordan sætningen lyder!
                    </p>
                </div>

                <div class="grammar-legend-bar">
                    <div class="grammar-legend-item"><span class="legend-chip chip-legend-subjekt"></span> <span>1. Subjekt (Grøn)</span></div>
                    <div class="grammar-legend-item"><span class="legend-chip chip-legend-verbum"></span> <span>2. Verbum (Rød)</span></div>
                    <div class="grammar-legend-item"><span class="legend-chip chip-legend-maade"></span> <span>3. Mådesadverbium (Pink)</span></div>
                    <div class="grammar-legend-item"><span class="legend-chip chip-legend-rest"></span> <span>4. Restled (Blå)</span></div>
                </div>

                <div class="category-builder-rows">
                    <!-- Row 1: Hvem taler vi om? -->
                    <div class="category-row-card cat-row-subjekt">
                        <div class="category-row-header">
                            <div class="cat-badge-title cat-title-subjekt">
                                <span>👤</span> 1. Hvem eller hvad taler vi om?
                            </div>
                            <span class="cat-grammar-role badge-subjekt">[Subjekt / Grundled]</span>
                        </div>
                        <div class="category-options-flex" id="chips-subjekt"></div>
                    </div>

                    <!-- Row 2: Hvad laver personen? -->
                    <div class="category-row-card cat-row-verbum">
                        <div class="category-row-header">
                            <div class="cat-badge-title cat-title-verbum">
                                <span>⚡</span> 2. Hvad laver personen eller tingen?
                            </div>
                            <span class="cat-grammar-role badge-verbum">[Verbum / Udsagnsled]</span>
                        </div>
                        <div class="category-options-flex" id="chips-verbum"></div>
                    </div>

                    <!-- Row 3: Hvordan foregår handlingen? -->
                    <div class="category-row-card cat-row-maade">
                        <div class="category-row-header">
                            <div class="cat-badge-title cat-title-maade">
                                <span>⭐</span> 3. Hvordan foregår handlingen? (Mådesadverbium)
                            </div>
                            <span class="cat-grammar-role badge-maade">[Mådesadverbium med -t]</span>
                        </div>
                        <div class="category-options-flex" id="chips-maade"></div>
                    </div>

                    <!-- Row 4: Hvor eller hvad? -->
                    <div class="category-row-card cat-row-rest">
                        <div class="category-row-header">
                            <div class="cat-badge-title cat-title-rest">
                                <span>📍</span> 4. Hvor, hvad eller hvordan ellers?
                            </div>
                            <span class="cat-grammar-role badge-rest">[Restled / Præpositionsled / Objekt]</span>
                        </div>
                        <div class="category-options-flex" id="chips-rest"></div>
                    </div>
                </div>

                <!-- Live Showcase -->
                <div class="live-sentence-showcase">
                    <div class="live-sentence-label">Din sammensatte sætning:</div>
                    <div class="live-sentence-text" id="live-sentence-text"></div>
                    <div class="live-sentence-actions">
                        <button class="live-audio-btn" id="live-audio-speak-btn">
                            <span>🔊</span> Hør sætning
                        </button>
                    </div>
                </div>
            `;

            const categories = ['subjekt', 'verbum', 'maade', 'rest'];
            categories.forEach(cat => {
                const row = freeContainer.querySelector(`#chips-${cat}`);
                BUILDER_CATEGORIES[cat].forEach(item => {
                    const btn = document.createElement('button');
                    const isSelected = (selectedBuilderWords[cat] === item.text);
                    btn.className = `cat-option-chip chip-${cat}${isSelected ? ' selected' : ''}`;
                    btn.textContent = item.text;
                    btn.onclick = () => {
                        selectedBuilderWords[cat] = item.text;
                        updateLiveSentence();
                        setupFreeBuilder();
                    };
                    row.appendChild(btn);
                });
            });

            function updateLiveSentence() {
                const display = freeContainer.querySelector('#live-sentence-text');
                if (display) {
                    display.innerHTML = `
                        <span class="live-word-subjekt">${selectedBuilderWords.subjekt}</span>
                        <span class="live-word-verbum">${selectedBuilderWords.verbum}</span>
                        <span class="live-word-maade">${selectedBuilderWords.maade}</span>
                        <span class="live-word-rest">${selectedBuilderWords.rest}.</span>
                    `;
                }
            }

            updateLiveSentence();

            freeContainer.querySelector('#live-audio-speak-btn').onclick = () => {
                const full = `${selectedBuilderWords.subjekt} ${selectedBuilderWords.verbum} ${selectedBuilderWords.maade} ${selectedBuilderWords.rest}.`;
                speakDanish(full);
            };
        }

        // ==========================================
        // SEKTION 2: PUSLEOPGAVEN (UD FORDRING)
        // ==========================================
        function setupChallengeSection() {
            challengeContainer.innerHTML = '';

            const task = MAADE_CHALLENGE_TASKS[currentMaadeChallengeIdx];

            // Header with pills
            const header = document.createElement('div');
            header.className = 'sb-task-header';

            const titleDiv = document.createElement('div');
            titleDiv.innerHTML = `
                <div style="font-size: 0.85rem; color: #f472b6; font-weight: 800; text-transform: uppercase;">
                    Udfordring ${currentMaadeChallengeIdx + 1} af ${MAADE_CHALLENGE_TASKS.length}
                </div>
                <h3 style="font-size: 1.5rem; color: white; margin: 0.2rem 0;">Vælg adverbiet & saml puslespillet</h3>
            `;
            header.appendChild(titleDiv);

            const pills = document.createElement('div');
            pills.className = 'sb-task-pills';
            MAADE_CHALLENGE_TASKS.forEach((_, idx) => {
                const pill = document.createElement('div');
                pill.className = `sb-task-pill ${idx === currentMaadeChallengeIdx ? 'active' : ''} ${completedMaadeChallenges.has(idx) ? 'done' : ''}`;
                pill.textContent = idx + 1;
                pill.onclick = () => {
                    currentMaadeChallengeIdx = idx;
                    setupChallengeSection();
                };
                pills.appendChild(pill);
            });
            header.appendChild(pills);
            challengeContainer.appendChild(header);

            // Step 1: Context card with visual sentence preview (with target blank) and 4 question chips
            const contextCard = document.createElement('div');
            contextCard.className = 'sb-context-card';

            const advIdx = (typeof task.advSlotIndex === 'number') ? task.advSlotIndex : 2;

            // Build target sentence preview with highlighted blank slot for the adverb
            const sentenceHtml = task.correctSentence.map((word, idx) => {
                if (idx === advIdx) {
                    return `<span class="sb-sentence-blank" id="sb-live-adv-blank">________</span>`;
                }
                const isLast = (idx === task.correctSentence.length - 1);
                return `<span class="sb-sentence-word">${word}${isLast ? '.' : ''}</span>`;
            }).join(' ');

            // Build helper question chips (all 4 elements including the target adverb slot!)
            const chipsHtml = task.correctSentence.map((word, idx) => {
                if (idx === advIdx) {
                    return `
                        <div class="sb-context-chip maade target-placeholder" id="sb-context-chip-adv" title="Her skal mådesadverbiet stå!">
                            <span class="sb-chip-role">3. HVORDAN? (MÅDE) ⭐</span>
                            <span id="sb-chip-adv-val" style="font-weight: 800; letter-spacing: 2px;">________</span>
                        </div>
                    `;
                }
                const chipType = (idx === 0) ? 'subjekt' : (idx === 1) ? 'verbum' : 'rest';
                const roleUpper = (idx === 0) ? '1. HVEM?' : (idx === 1) ? '2. HANDLING?' : '4. HVOR/HVAD?';
                return `
                    <div class="sb-context-chip ${chipType}">
                        <span class="sb-chip-role">${roleUpper}</span>
                        <span style="font-weight: 700;">${word}</span>
                    </div>
                `;
            }).join('');

            contextCard.innerHTML = `
                <div class="sb-context-title">📍 <em>${task.context}</em></div>
                <div class="sb-context-elements" style="margin-bottom: 1rem;">
                    ${chipsHtml}
                </div>
                <div class="sb-target-sentence-card">
                    <div class="sb-target-sentence-label">Sætning med tom plads til mådesadverbiet:</div>
                    <div class="sb-target-sentence-display" id="sb-target-sentence-display">
                        ${sentenceHtml}
                    </div>
                </div>
            `;
            challengeContainer.appendChild(contextCard);

            // Question box
            const qBox = document.createElement('div');
            qBox.className = 'sb-question-box';
            qBox.innerHTML = `
                <div style="font-size: 0.85rem; color: #f472b6; font-weight: 700; text-transform: uppercase; margin-bottom: 0.3rem;">
                    Trin 1: Vælg det rigtige mådesadverbium
                </div>
                <div class="sb-question-text">${task.questionPrompt}</div>
            `;
            challengeContainer.appendChild(qBox);

            // Options grid
            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'sb-options-grid';

            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'sb-pedagogy-feedback-container';
            feedbackDiv.style.display = 'none';

            const puzzleContainer = document.createElement('div');
            puzzleContainer.className = 'sb-puzzle-section';
            puzzleContainer.style.display = 'none';

            const allOptions = [task.correctAdv, ...task.distractors].sort(() => Math.random() - 0.5);

            allOptions.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'sb-option-btn';
                btn.textContent = opt;

                btn.onclick = () => {
                    if (btn.classList.contains('correct')) return;

                    if (opt === task.correctAdv) {
                        btn.classList.add('correct');
                        optionsGrid.querySelectorAll('.sb-option-btn').forEach(b => {
                            if (b !== btn) b.style.opacity = '0.4';
                            b.style.pointerEvents = 'none';
                        });

                        // 1. Fill live blank in sentence banner
                        const liveBlank = contextCard.querySelector('#sb-live-adv-blank');
                        if (liveBlank) {
                            liveBlank.textContent = task.correctAdv;
                            liveBlank.classList.add('filled');
                        }

                        // 2. Fill adverb chip in context elements
                        const advChipVal = contextCard.querySelector('#sb-chip-adv-val');
                        if (advChipVal) {
                            advChipVal.innerHTML = `${task.correctAdv} <span style="color: #4ade80;">✓</span>`;
                        }
                        const advChip = contextCard.querySelector('#sb-context-chip-adv');
                        if (advChip) {
                            advChip.classList.add('chip-filled');
                        }

                        // 3. Show didactic feedback
                        feedbackDiv.innerHTML = `
                            <div class="sb-pedagogy-alert" style="margin-bottom: 1.2rem; padding: 1rem 1.4rem; background: rgba(34, 197, 94, 0.15); border: 2px solid #22c55e; border-radius: 12px; color: #f8fafc; font-size: 1.05rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.8rem;">
                                <div>
                                    <strong style="color: #4ade80; font-size: 1.15rem;">🎉 Rigtigt mådesadverbium!</strong>
                                    <div style="margin-top: 0.25rem; color: #cbd5e1;">${task.pedagogyNote}</div>
                                </div>
                                <button class="sb-listen-btn" style="padding: 0.5rem 1rem; font-size: 0.9rem;" id="sb-speak-target-btn">
                                    <span>🔊</span> Hør sætning
                                </button>
                            </div>
                        `;
                        feedbackDiv.style.display = 'block';
                        const speakBtn = feedbackDiv.querySelector('#sb-speak-target-btn');
                        if (speakBtn) {
                            speakBtn.onclick = () => speakDanish(task.correctSentence.join(' '));
                        }

                        speakDanish(opt);

                        // 4. Trigger Step 2: Puslespillet
                        renderMaadePuzzleStep(puzzleContainer, task);
                        puzzleContainer.style.display = 'block';
                        setTimeout(() => {
                            if (typeof puzzleContainer.scrollIntoView === 'function') {
                                puzzleContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                        }, 150);
                    } else {
                        btn.classList.add('incorrect');
                        speakDanish("Prøv igen");
                        setTimeout(() => btn.classList.remove('incorrect'), 600);
                    }
                };

                optionsGrid.appendChild(btn);
            });

            challengeContainer.appendChild(optionsGrid);
            challengeContainer.appendChild(feedbackDiv);
            challengeContainer.appendChild(puzzleContainer);
        }

        // Step 2: Puslespil i udfordringen med tydelig grafisk visning af adverbiets placering
        function renderMaadePuzzleStep(puzContainer, task) {
            puzContainer.innerHTML = `
                <div class="sb-puzzle-title">
                    <span>🧩</span> Trin 2: Puslespillet – Saml hele sætningen!
                </div>
                <div class="sb-puzzle-desc">
                    Læg mærke til den fremhævede plads med <strong>⭐</strong> – der skal mådesadverbiet placeres. Klik på brikkerne i den rigtige rækkefølge:
                </div>

                <!-- Grafisk ordstillings-guide: Viser præcis hvor i sætningen adverbiet står -->
                <div class="sb-structure-diagram">
                    <div class="structure-diagram-header">
                        <span class="structure-diagram-badge">
                            📌 ${task.structureTitle}
                        </span>
                        <span class="structure-diagram-hint">${task.structureNote}</span>
                    </div>
                    <div class="structure-diagram-flow">
                        ${task.flowSteps.map((step, sIdx) => `
                            <div class="flow-step flow-${step.type} ${step.isTarget ? 'active-target' : ''}">
                                <div style="font-size: 1.25rem;">${step.icon}</div>
                                <div class="flow-num">${step.num}</div>
                                <div class="flow-title">${step.title}</div>
                                ${step.isTarget ? '<div class="flow-target-tag">HER STÅR ADVERBIET!</div>' : ''}
                            </div>
                            ${sIdx < task.flowSteps.length - 1 ? '<div class="flow-arrow">➔</div>' : ''}
                        `).join('')}
                    </div>
                </div>

                <div class="sb-puzzle-slots" id="maade-puzzle-slots-grid"></div>
                <div class="sb-puzzle-chips" id="maade-puzzle-chips-pool"></div>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <button class="reset-slots-btn" id="maade-puzzle-reset-btn">↺ Nulstil brikker</button>
                    <div id="maade-puzzle-status" style="font-weight: 700; color: #22c55e;"></div>
                </div>
            `;

            const slotsGrid = puzContainer.querySelector('#maade-puzzle-slots-grid');
            const chipsPool = puzContainer.querySelector('#maade-puzzle-chips-pool');
            const resetBtn = puzContainer.querySelector('#maade-puzzle-reset-btn');
            const statusEl = puzContainer.querySelector('#maade-puzzle-status');

            let placedWords = [];
            const shuffledChips = [...task.chips].sort(() => Math.random() - 0.5);

            function updatePuzzleUI() {
                slotsGrid.innerHTML = '';
                task.slots.forEach((slotLabel, idx) => {
                    const slot = document.createElement('div');
                    const isAdvSlot = (idx === task.advSlotIndex);
                    const isFilled = Boolean(placedWords[idx]);
                    const stepType = (task.flowSteps && task.flowSteps[idx]) ? task.flowSteps[idx].type : (idx === 0 ? 'subjekt' : idx === 1 ? 'verbum' : isAdvSlot ? 'adverbium' : 'rest');

                    slot.className = `sb-puzzle-slot slot-type-${stepType} ${isFilled ? 'filled' : ''} ${isAdvSlot ? 'target-adverbium-slot' : ''}`;

                    if (isAdvSlot) {
                        const callout = document.createElement('div');
                        callout.className = 'slot-target-callout';
                        callout.innerHTML = isFilled ? '✓ Adverbium' : '⭐ Adverbiets plads ⭐';
                        slot.appendChild(callout);
                    }

                    if (isFilled) {
                        const wordSpan = document.createElement('span');
                        wordSpan.style.marginTop = isAdvSlot ? '0.45rem' : '0';
                        wordSpan.style.fontWeight = '800';
                        if (isAdvSlot) wordSpan.style.color = '#f472b6';
                        wordSpan.textContent = placedWords[idx];
                        slot.appendChild(wordSpan);

                        slot.onclick = () => {
                            placedWords.splice(idx, 1);
                            updatePuzzleUI();
                        };
                    } else {
                        const hintSpan = document.createElement('span');
                        hintSpan.className = 'slot-hint';
                        hintSpan.style.marginTop = isAdvSlot ? '0.45rem' : '0';
                        if (isAdvSlot) hintSpan.style.color = '#f472b6';
                        hintSpan.textContent = slotLabel;
                        slot.appendChild(hintSpan);

                        const roleSpan = document.createElement('span');
                        roleSpan.className = 'slot-role';
                        roleSpan.textContent = task.roles[idx];
                        slot.appendChild(roleSpan);
                    }
                    slotsGrid.appendChild(slot);
                });

                chipsPool.innerHTML = '';
                shuffledChips.forEach(word => {
                    const chip = document.createElement('button');
                    const isAdvChip = (word === task.advWord);
                    chip.className = `sb-puzzle-chip ${isAdvChip ? 'chip-is-adv' : ''} ${placedWords.includes(word) ? 'used' : ''}`;
                    chip.innerHTML = isAdvChip
                        ? `<span>⭐</span> <span>${word}</span>`
                        : `<span>${word}</span>`;

                    chip.onclick = () => {
                        if (placedWords.length < task.slots.length && !placedWords.includes(word)) {
                            placedWords.push(word);
                            speakDanish(word);
                            updatePuzzleUI();
                        }
                    };
                    chipsPool.appendChild(chip);
                });

                if (placedWords.length === task.correctSentence.length) {
                    const isCorrect = placedWords.every((w, i) => w === task.correctSentence[i]);
                    if (isCorrect) {
                        completedMaadeChallenges.add(currentMaadeChallengeIdx);
                        statusEl.innerHTML = `
                            <span style="color: #22c55e; margin-right: 1rem;">🎉 Perfekt samlet!</span>
                            <button class="detektiv-next-btn" style="display: inline-block; padding: 0.6rem 1.4rem;" id="maade-task-next-btn">
                                ${currentMaadeChallengeIdx < MAADE_CHALLENGE_TASKS.length - 1 ? 'Næste opgave ➔' : 'Gå til Kontekst-testen 🏆'}
                            </button>
                        `;
                        speakDanish(placedWords.join(' '));

                        puzContainer.querySelector('#maade-task-next-btn').onclick = () => {
                            if (currentMaadeChallengeIdx < MAADE_CHALLENGE_TASKS.length - 1) {
                                currentMaadeChallengeIdx++;
                                setupChallengeSection();
                            } else {
                                switchTab('tab_kontekst');
                            }
                        };
                    } else {
                        statusEl.innerHTML = `<span style="color: #ef4444;">Ikke helt rigtig rækkefølge – prøv igen!</span>`;
                    }
                } else {
                    statusEl.innerHTML = '';
                }
            }

            resetBtn.onclick = () => {
                placedWords = [];
                updatePuzzleUI();
            };

            updatePuzzleUI();
        }

        setupFreeBuilder();
        parent.appendChild(container);
    }

    // ==========================================
    // TAB 5: KONTEKST-TESTEN (14 Varierede Hverdagssituationer)
    // ==========================================
    const KONTEKST_TASKS = [
        {
            id: 1,
            scene: 'Glat føre på vejen',
            sentence: 'Der er glat på vejen i dag, så bilisterne kører meget _____.',
            blank: '_____',
            correct: 'langsomt',
            options: ['langsomt', 'hurtigt', 'højt'],
            feedback: '💡 Rigtigt! Når vejen er glat, må man sætte farten ned og køre langsomt for ikke at glide!'
        },
        {
            id: 2,
            scene: 'På biblioteket',
            sentence: 'Vi sidder på biblioteket og læser, så vi skal tale _____.',
            blank: '_____',
            correct: 'stille',
            options: ['stille', 'højt', 'grimt'],
            feedback: '💡 Rigtigt! På biblioteket må man ikke larme – man skal tale stille!'
        },
        {
            id: 3,
            scene: 'Festmåltidet',
            sentence: 'Kagen smager fantastisk, konditoren bager virkelig _____.',
            blank: '_____',
            correct: 'godt',
            options: ['godt', 'dårligt', 'hårdt'],
            feedback: '💡 Rigtigt! Når kagen smager fantastisk, har konditoren bagt godt!'
        },
        {
            id: 4,
            scene: 'Byløbet',
            sentence: 'Løberen er i super god form og løber utrolig _____.',
            blank: '_____',
            correct: 'hurtigt',
            options: ['hurtigt', 'langsomt', 'blødt'],
            feedback: '💡 Rigtigt! En person i god form løber i højt tempo: hurtigt!'
        },
        {
            id: 5,
            scene: 'Flyttekassen med porcelæn',
            sentence: 'Hun passede meget på kopperne og bar kassen _____.',
            blank: '_____',
            correct: 'forsigtigt',
            options: ['forsigtigt', 'forkert', 'hårdt'],
            feedback: '💡 Rigtigt! Man bærer skrøbelige ting forsigtigt, så de ikke går i stykker.'
        },
        {
            id: 6,
            scene: 'Danskundervisningen',
            sentence: 'Læreren har en klar stemme og taler meget _____ til eleverne.',
            blank: '_____',
            correct: 'tydeligt',
            options: ['tydeligt', 'stille', 'svært'],
            feedback: '💡 Rigtigt! En klar stemme gør, at læreren taler tydeligt og er nem at forstå.'
        },
        {
            id: 7,
            scene: 'Den lette opgave',
            sentence: 'Opgaven var slet ikke svær, vi løste den _____.',
            blank: '_____',
            correct: 'nemt',
            options: ['nemt', 'svært', 'grimt'],
            feedback: '💡 Rigtigt! Når opgaven er let, klarer man den nemt.'
        },
        {
            id: 8,
            scene: 'Fodbold i haven',
            sentence: 'De tre gode venner har det sjovest, når de leger _____.',
            blank: '_____',
            correct: 'sammen',
            options: ['sammen', 'alene', 'forkert'],
            feedback: '💡 Rigtigt! Gode venner hygger sig bedst, når de leger sammen.'
        },
        {
            id: 9,
            scene: 'Tømrerarbejdet',
            sentence: 'Sømmet sidder meget fast, så tømreren må slå _____ med hammeren.',
            blank: '_____',
            correct: 'hårdt',
            options: ['hårdt', 'blødt', 'stille'],
            feedback: '💡 Rigtigt! Et genstridigt søm kræver stor fysisk kraft: at slå hårdt!'
        },
        {
            id: 10,
            scene: 'Kattens hop',
            sentence: 'Katten hoppede ned fra havebordet og landede helt _____ på havepuden.',
            blank: '_____',
            correct: 'blødt',
            options: ['blødt', 'hårdt', 'højt'],
            feedback: '💡 Rigtigt! Katte lander lydløst og skånsomt: at lande blødt.'
        },
        {
            id: 11,
            scene: 'Trompetisten om aftenen',
            sentence: 'Naboerne klagede, fordi musikeren spillede for _____ om aftenen.',
            blank: '_____',
            correct: 'højt',
            options: ['højt', 'lavt', 'pænt'],
            feedback: '💡 Rigtigt! Naboerne klagede over larmen, fordi han spillede med høj volumen: for højt!'
        },
        {
            id: 12,
            scene: 'Konditorens bryllupskage',
            sentence: 'Konditoren brugte mange timer på at pynte kagen utroligt _____.',
            blank: '_____',
            correct: 'pænt',
            options: ['pænt', 'grimt', 'svært'],
            feedback: '💡 Rigtigt! Kagen blev pyntet med stor elegance og omhu: pænt!'
        },
        {
            id: 13,
            scene: 'Vejvisning i krydset',
            sentence: 'Turisten kiggede på kortet og drejede heldigvis _____ i lyskrydset.',
            blank: '_____',
            correct: 'rigtigt',
            options: ['rigtigt', 'forkert', 'dårligt'],
            feedback: '💡 Rigtigt! Han fulgte kortet og fandt den rigtige vej: han drejede rigtigt!'
        },
        {
            id: 14,
            scene: 'Fred og ro i skoven',
            sentence: 'Mads havde brug for ro og gik en lang tur i skoven helt _____.',
            blank: '_____',
            correct: 'alene',
            options: ['alene', 'sammen', 'hårdt'],
            feedback: '💡 Rigtigt! Han ville gerne være for sig selv i fred og ro: at gå alene.'
        }
    ];

    let kontekstIndex = 0;
    let kontekstScore = 0;
    let kontekstAnswered = false;

    function renderTabKontekst(container) {
        container.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.className = 'kontekst-container';

        const task = KONTEKST_TASKS[kontekstIndex];

        wrap.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 2rem; color: #f472b6; margin-bottom: 0.5rem;">🎯 Kontekst-testen</h2>
                <p style="color: #94a3b8; margin: 0;">Vælg det rigtige mådesadverbium ud fra sætningens mening og logik.</p>
            </div>

            <div class="detektiv-progress">
                <span>Opgave ${kontekstIndex + 1} af ${KONTEKST_TASKS.length}</span>
                <span>Score: ${kontekstScore} point ⭐</span>
            </div>

            <div class="cloze-card">
                <div class="detektiv-context-tag">📍 Situation: ${task.scene}</div>
                <div class="cloze-sentence-display" id="cloze-display">
                    ${task.sentence.replace('_____', '<span class="cloze-blank" id="cloze-blank-slot">_____</span>')}
                </div>

                <div class="cloze-options-grid" id="cloze-options"></div>
                <div id="cloze-feedback"></div>

                <button class="detektiv-next-btn" id="cloze-next-btn" style="display: none;">
                    ${kontekstIndex < KONTEKST_TASKS.length - 1 ? 'Næste sætning ➔' : 'Afslut testen 🏆'}
                </button>
            </div>
        `;

        const optionsGrid = wrap.querySelector('#cloze-options');
        const feedbackBox = wrap.querySelector('#cloze-feedback');
        const nextBtn = wrap.querySelector('#cloze-next-btn');
        const blankSlot = wrap.querySelector('#cloze-blank-slot');

        task.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'cloze-option-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                if (kontekstAnswered) return;
                kontekstAnswered = true;

                blankSlot.textContent = opt;

                if (opt === task.correct) {
                    btn.classList.add('correct');
                    kontekstScore += 10;
                    speakDanish(opt);
                    feedbackBox.className = 'cloze-didactic-feedback';
                    feedbackBox.innerHTML = `<strong>✓ Rigtigt!</strong> ${task.feedback}`;
                } else {
                    btn.classList.add('wrong');
                    feedbackBox.className = 'cloze-didactic-feedback';
                    feedbackBox.style.borderColor = '#ef4444';
                    feedbackBox.style.color = '#fee2e2';
                    feedbackBox.innerHTML = `<strong>Prøv at tænke på situationen:</strong> ${task.feedback}`;

                    optionsGrid.querySelectorAll('.cloze-option-btn').forEach(b => {
                        if (b.textContent === task.correct) b.classList.add('correct');
                    });
                }

                nextBtn.style.display = 'block';
            };

            optionsGrid.appendChild(btn);
        });

        nextBtn.onclick = () => {
            kontekstAnswered = false;
            if (kontekstIndex < KONTEKST_TASKS.length - 1) {
                kontekstIndex++;
                renderTabKontekst(container);
            } else {
                renderKontekstSummary(container);
            }
        };

        container.appendChild(wrap);
    }

    function renderKontekstSummary(container) {
        const wrap = document.createElement('div');
        wrap.className = 'kontekst-container';
        wrap.style.textAlign = 'center';

        const maxScore = KONTEKST_TASKS.length * 10;
        const pct = Math.round((kontekstScore / maxScore) * 100);

        wrap.innerHTML = `
            <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="font-size: 2.2rem; color: #f472b6; margin-bottom: 0.5rem;">Kontekst-testen er gennemført!</h2>
            <p style="font-size: 1.2rem; color: #cbd5e1; margin-bottom: 1.5rem;">
                Du opnåede <strong>${kontekstScore}</strong> ud af <strong>${maxScore}</strong> point (${pct}%).
            </p>
            <div style="background: rgba(15, 23, 42, 0.7); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                ${pct >= 80 ? '🌟 Suverænt! Du forstår nu præcis, hvordan de danske mådesadverbier bruges i praksis i forskellige hverdagssituationer.' : 'Godt forsøgt! Tag testen en gang til for at få fuldt udbytte.'}
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="detektiv-next-btn" style="margin: 0;" id="kontekst-retry-btn">🔄 Prøv igen</button>
                <button class="detektiv-next-btn" style="margin: 0; background: #3b82f6;" id="kontekst-back-menu">Tilbage til Adverbie-Oversigten ➔</button>
            </div>
        `;

        wrap.querySelector('#kontekst-retry-btn').onclick = () => {
            kontekstIndex = 0;
            kontekstScore = 0;
            kontekstAnswered = false;
            renderTabKontekst(container);
        };
        wrap.querySelector('#kontekst-back-menu').onclick = () => navigateFn('top100_adverbier');

        container.appendChild(wrap);
    }

    // Initialize first tab
    switchTab(currentTab);
    container.appendChild(viewContainer);
}
