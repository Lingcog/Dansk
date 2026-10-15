import { getTranslation } from '../utils/i18n.js';

/**
 * AdverbierStedView - Felt 1: Sted (Retning vs. Hvile)
 * 18 højfrekvente stedsadverbier trænet i 5 didaktiske tabs:
 * 1. Det Interaktive Hus & Vrimlebillede (18 hotspots, Retning vs Hvile, pure mode, audio)
 * 2. Adverbie-Detektiven (8 dynamiske zoom-missioner i huset)
 * 3. Retnings-Vippen (Interaktivt sorteringsspil om -e reglen)
 * 4. Sætningsbyggeren (Stedsadverbiets faste placering og inversion)
 * 5. Kontekst-testen (Model C: Retnings-testen med cloze & didaktisk feedback)
 */
export function renderAdverbierStedView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adverbier-sted-view';

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

    // 18 Words Data for Felt 1 (Sted: Retning vs Hvile)
    const ADVERBIER_STED_DATA = [
        {
            id: 'hjem',
            word: 'hjem',
            type: 'retning',
            typeLabel: 'Retning (bevægelse)',
            pairId: 'hjemme',
            pairWord: 'hjemme',
            pairType: 'hvile',
            x: 15,
            y: 57,
            sceneDesc: 'Cyklisten på stien er på vej hjemad mod huset.',
            meaning: 'Bevægelse mod sit eget hjem / bolig',
            sentence: 'Mette cykler hurtigt hjem efter arbejde.',
            ruleHint: 'Kort form uden -e: bruges ved bevægelse mod hjemmet (gå hjem, køre hjem, tage hjem).'
        },
        {
            id: 'hjemme',
            word: 'hjemme',
            type: 'hvile',
            typeLabel: 'Hvile (placering / ro)',
            pairId: 'hjem',
            pairWord: 'hjem',
            pairType: 'retning',
            x: 58,
            y: 66,
            sceneDesc: 'Manden sidder i lænestolen i stuen og slapper af med kaffe.',
            meaning: 'Placering i sit eget hjem i ro',
            sentence: 'Far sidder hjemme i stuen og læser en god bog.',
            ruleHint: 'Lang form med -e: bruges når man befinder sig i hjemmet i ro (være hjemme, blive hjemme).'
        },
        {
            id: 'ind',
            word: 'ind',
            type: 'retning',
            typeLabel: 'Retning (bevægelse)',
            pairId: 'inde',
            pairWord: 'inde',
            pairType: 'hvile',
            x: 47,
            y: 64,
            sceneDesc: 'Børnene løber ind gennem hoveddøren i entreen.',
            meaning: 'Bevægelse ind i et rum eller bygning',
            sentence: 'Børnene skynder sig ind, fordi det begynder at regne.',
            ruleHint: 'Kort form uden -e: bevægelse ind i et afgrænset rum (komme ind, gå ind).'
        },
        {
            id: 'inde',
            word: 'inde',
            type: 'hvile',
            typeLabel: 'Hvile (placering / ro)',
            pairId: 'ind',
            pairWord: 'ind',
            pairType: 'retning',
            x: 58,
            y: 62,
            sceneDesc: 'Katten ligger trygt og sover inde i den varme stue.',
            meaning: 'Placering indendørs på ét sted',
            sentence: 'Katten sover trygt inde i den varme stue.',
            ruleHint: 'Lang form med -e: placering indendørs uden bevægelse mod nyt rum (være inde, sidde inde).'
        },
        {
            id: 'ud',
            word: 'ud',
            type: 'retning',
            typeLabel: 'Retning (bevægelse)',
            pairId: 'ude',
            pairWord: 'ude',
            pairType: 'hvile',
            x: 81,
            y: 64,
            sceneDesc: 'Hunden springer ivrigt ud ad terrassedøren mod haven.',
            meaning: 'Bevægelse ud i det fri eller ud af et rum',
            sentence: 'Hunden løber glad ud i den grønne have.',
            ruleHint: 'Kort form uden -e: bevægelse udad (gå ud, kigge ud, løbe ud).'
        },
        {
            id: 'ude',
            word: 'ude',
            type: 'hvile',
            typeLabel: 'Hvile (placering / ro)',
            pairId: 'ud',
            pairWord: 'ud',
            pairType: 'retning',
            x: 93,
            y: 72,
            sceneDesc: 'Kvinden solbader i liggestolen ude på græsplænen.',
            meaning: 'Placering udendørs på ét sted',
            sentence: 'Mor solbader og slapper af ude på græsplænen.',
            ruleHint: 'Lang form med -e: placering udendørs i ro (være ude, ligge ude, sidde ude).'
        },
        {
            id: 'op',
            word: 'op',
            type: 'retning',
            typeLabel: 'Retning (bevægelse)',
            pairId: 'oppe',
            pairWord: 'oppe',
            pairType: 'hvile',
            x: 63,
            y: 55,
            sceneDesc: 'Drengen går op ad trappen mod første sal.',
            meaning: 'Bevægelse opad mod en højere etage / position',
            sentence: 'Lucas går op ad trappen til sit værelse.',
            ruleHint: 'Kort form uden -e: bevægelse opad (gå op, kravle op, kigge op).'
        },
        {
            id: 'oppe',
            word: 'oppe',
            type: 'hvile',
            typeLabel: 'Hvile (placering / ro)',
            pairId: 'op',
            pairWord: 'op',
            pairType: 'retning',
            x: 39,
            y: 29,
            sceneDesc: 'Pigen står oppe ved kvistvinduet og vinker glad.',
            meaning: 'Placering i en høj position / overetage',
            sentence: 'Emma kigger ud af vinduet oppe på førstesalen.',
            ruleHint: 'Lang form med -e: stilstand på en høj plads (være oppe, stå oppe, sove oppe).'
        },
        {
            id: 'ned',
            word: 'ned',
            type: 'retning',
            typeLabel: 'Retning (bevægelse)',
            pairId: 'nede',
            pairWord: 'nede',
            pairType: 'hvile',
            x: 72,
            y: 73,
            sceneDesc: 'Kvinden bærer vasketøjskurven ned ad kældertrappen.',
            meaning: 'Bevægelse nedad mod et lavere niveau',
            sentence: 'Hun bærer vasketøjet ned i den kølige kælder.',
            ruleHint: 'Kort form uden -e: bevægelse nedad (gå ned, falde ned, kigge ned).'
        },
        {
            id: 'nede',
            word: 'nede',
            type: 'hvile',
            typeLabel: 'Hvile (placering / ro)',
            pairId: 'ned',
            pairWord: 'ned',
            pairType: 'retning',
            x: 73,
            y: 85,
            sceneDesc: 'Vaskemaskinen og værktøjet nede i det kølige kælderrum.',
            meaning: 'Placering på et lavt niveau / i kælderen',
            sentence: 'Vaskemaskinen står nede i kælderen og vasker tøj.',
            ruleHint: 'Lang form med -e: placering på et lavt niveau i ro (være nede, ligge nede).'
        },
        {
            id: 'frem',
            word: 'frem',
            type: 'retning',
            typeLabel: 'Retning (bevægelse)',
            pairId: 'fremme',
            pairWord: 'fremme',
            pairType: 'hvile',
            x: 16,
            y: 79,
            sceneDesc: 'Postbuddet cykler frem mod havelågen for at aflevere et brev.',
            meaning: 'Bevægelse fremad mod et mål eller synligt sted',
            sentence: 'Postbuddet cykler frem mod husets havelåge.',
            ruleHint: 'Kort form uden -e: bevægelse fremad mod målet (køre frem, træde frem, gå frem).'
        },
        {
            id: 'fremme',
            word: 'fremme',
            type: 'hvile',
            typeLabel: 'Hvile (placering / ro)',
            pairId: 'frem',
            pairWord: 'frem',
            pairType: 'retning',
            x: 37,
            y: 62,
            sceneDesc: 'Gæsten i den grønne frakke er fremme og trykker på dørklokken.',
            meaning: 'At have nået sit mål / ankommet til stedet',
            sentence: 'Gæsten er endelig fremme ved huset og ringer på.',
            ruleHint: 'Lang form med -e: målet er nået, stilstand ved ankomst (være fremme).'
        },
        {
            id: 'hen',
            word: 'hen',
            type: 'retning',
            typeLabel: 'Retning (bevægelse)',
            pairId: 'henne',
            pairWord: 'henne',
            pairType: 'hvile',
            x: 88,
            y: 61,
            sceneDesc: 'Børnene løber hen over græsset mod gyngestativet.',
            meaning: 'Vandret bevægelse mod en genstand eller person',
            sentence: 'Børnene løber hen til det store gyngestativ.',
            ruleHint: 'Kort form uden -e: bevægelse hen mod noget i nærheden (gå hen, kigge hen).'
        },
        {
            id: 'henne',
            word: 'henne',
            type: 'hvile',
            typeLabel: 'Hvile (placering / ro)',
            pairId: 'hen',
            pairWord: 'hen',
            pairType: 'retning',
            x: 91,
            y: 54,
            sceneDesc: 'Det røde gyngestativ henne i det bagerste havehjørne.',
            meaning: 'Placering i en vis afstand på stedet',
            sentence: 'Gyngestativet står henne i det bagerste hjørne.',
            ruleHint: 'Lang form med -e: stilstand i en vis afstand (være henne, stå henne).'
        },
        {
            id: 'tilbage',
            word: 'tilbage',
            type: 'retning',
            typeLabel: 'Retning (bevægelse)',
            pairId: null,
            pairWord: null,
            pairType: null,
            x: 6,
            y: 71,
            sceneDesc: 'Løberen på fortovet vender om og løber tilbage.',
            meaning: 'Bevægelse tilbage mod udgangspunktet',
            sentence: 'Løberen vender om og løber hurtigt tilbage.',
            ruleHint: 'Viser bevægelse mod det oprindelige udgangspunkt (køre tilbage, vende tilbage).'
        },
        {
            id: 'væk',
            word: 'væk',
            type: 'retning',
            typeLabel: 'Retning (bevægelse)',
            pairId: null,
            pairWord: null,
            pairType: null,
            x: 81,
            y: 9,
            sceneDesc: 'En fugl letter fra taget og flyver hurtigt væk mod himlen.',
            meaning: 'Bevægelse bort fra et sted / forsvinde',
            sentence: 'Fuglen letter fra taget og flyver hurtigt væk.',
            ruleHint: 'Viser fjernelse fra stedet (flyve væk, køre væk, gå væk).'
        },
        {
            id: 'her',
            word: 'her',
            type: 'hvile',
            typeLabel: 'Hvile (placering)',
            pairId: 'der',
            pairWord: 'der',
            pairType: 'hvile',
            x: 27,
            y: 76,
            sceneDesc: 'Postkassen og havelågen lige her tæt ved indkørslen.',
            meaning: 'Tæt på taleren (på dette sted / hos mig)',
            sentence: 'Postkassen står lige her ved havelågen.',
            ruleHint: 'Angiver et sted tæt på taleren eller her i nutiden (her hos mig).'
        },
        {
            id: 'der',
            word: 'der',
            type: 'hvile',
            typeLabel: 'Hvile (placering)',
            pairId: 'her',
            pairWord: 'her',
            pairType: 'hvile',
            x: 6,
            y: 44,
            sceneDesc: 'Nabohuset derovre på den modsatte side af villavejen.',
            meaning: 'Længere væk fra taleren (på det sted / derovre)',
            sentence: 'Nabohuset ligger derovre på den anden side.',
            ruleHint: 'Angiver et sted længere væk fra taleren (derovre, derinde, derude).'
        }
    ];

    // State management
    let currentTab = 'tab_vrimmel';
    let selectedWordId = 'hjem';
    let filterMode = 'all'; // 'all', 'retning', 'hvile'
    let showPins = true;

    // View Styles
    const style = document.createElement('style');
    style.textContent = `
        .adverbier-sted-view {
            max-width: 1240px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .adv-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .adv-hero h1 {
            font-size: 2.3rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #38bdf8, #0ea5e9, #0284c7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .adv-hero p {
            color: #94a3b8;
            font-size: 1.1rem;
            max-width: 820px;
            margin: 0 auto 1.2rem;
            line-height: 1.5;
        }
        .adv-rule-banner {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
        }
        .rule-card-mini {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 0.6rem 1.2rem;
            border-radius: 14px;
            font-size: 0.95rem;
            font-weight: 600;
        }
        .rule-retning {
            background: rgba(14, 165, 233, 0.15);
            border: 1.5px solid #0ea5e9;
            color: #38bdf8;
        }
        .rule-hvile {
            background: rgba(245, 158, 11, 0.15);
            border: 1.5px solid #f59e0b;
            color: #fbbf24;
        }

        /* Tabs Nav */
        .adv-tabs-nav {
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
        .adv-tab-btn {
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
        .adv-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.06);
        }
        .adv-tab-btn.active {
            background: #0ea5e9;
            color: white;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
        }

        /* Tab 1: Vrimmel Styling */
        .vrimmel-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 1rem;
            background: #1e293b;
            padding: 0.8rem 1.2rem;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .filter-group {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .filter-btn {
            background: #334155;
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.4rem 0.9rem;
            border-radius: 20px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .filter-btn:hover {
            background: #475569;
            color: white;
        }
        .filter-btn.active {
            background: #0ea5e9;
            color: white;
            border-color: #38bdf8;
            font-weight: 700;
        }
        .toggle-pins-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #e2e8f0;
            padding: 0.4rem 0.9rem;
            border-radius: 20px;
            font-size: 0.85rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .toggle-pins-btn:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        .vrimmel-stage-container {
            position: relative;
            width: 100%;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            border: 2px solid rgba(255, 255, 255, 0.12);
            background: #090d16;
            margin-bottom: 2rem;
        }
        .vrimmel-bg-img {
            width: 100%;
            height: auto;
            display: block;
            user-select: none;
            transition: transform 0.5s ease;
        }
        .hotspot-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.35rem 0.7rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.6);
            transition: all 0.25s ease;
            z-index: 10;
            white-space: nowrap;
        }
        .hotspot-pin:hover {
            transform: translate(-50%, -50%) scale(1.15);
            z-index: 20;
            box-shadow: 0 6px 20px rgba(0,0,0,0.8);
        }
        .hotspot-pin.active {
            transform: translate(-50%, -50%) scale(1.22);
            z-index: 30;
            box-shadow: 0 0 25px #38bdf8, 0 6px 20px rgba(0,0,0,0.9);
            border-color: #38bdf8;
        }
        .pin-retning {
            background: #0284c7;
            color: white;
        }
        .pin-hvile {
            background: #d97706;
            color: white;
        }

        /* Inspector Card */
        .inspector-card {
            background: #1e293b;
            border-radius: 20px;
            padding: 1.8rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            margin-bottom: 2rem;
        }
        @media (max-width: 800px) {
            .inspector-card {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
        }
        .inspector-left {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .inspector-word-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .inspector-word-title {
            font-size: 2.2rem;
            font-weight: 900;
            color: white;
        }
        .adv-type-badge {
            padding: 0.35rem 0.85rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .badge-retning {
            background: rgba(14, 165, 233, 0.2);
            border: 1.5px solid #38bdf8;
            color: #38bdf8;
        }
        .badge-hvile {
            background: rgba(245, 158, 11, 0.2);
            border: 1.5px solid #f59e0b;
            color: #fbbf24;
        }
        .inspector-speak-btn {
            background: #334155;
            color: white;
            border: 1px solid rgba(255,255,255,0.2);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        .inspector-speak-btn:hover {
            background: #0ea5e9;
            transform: scale(1.1);
        }
        .inspector-scene-desc {
            background: rgba(15, 23, 42, 0.6);
            border-left: 4px solid #0ea5e9;
            padding: 0.8rem 1rem;
            border-radius: 0 12px 12px 0;
            font-size: 0.95rem;
            color: #cbd5e1;
            line-height: 1.5;
        }
        .inspector-sentence-box {
            background: rgba(2, 132, 199, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.25);
            padding: 1rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        .inspector-sentence-text {
            font-size: 1.05rem;
            color: #f8fafc;
            line-height: 1.4;
        }
        .inspector-sentence-text strong {
            color: #38bdf8;
        }
        .inspector-right {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            background: #0f172a;
            padding: 1.4rem;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .pair-switch-card {
            background: #1e293b;
            border-radius: 12px;
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
        }
        .pair-switch-header {
            font-size: 0.85rem;
            color: #94a3b8;
            font-weight: 700;
            text-transform: uppercase;
        }
        .pair-action-btn {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: none;
            color: white;
            padding: 0.7rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.2s;
        }
        .pair-action-btn:hover {
            background: linear-gradient(135deg, #0369a1, #075985);
            transform: translateY(-2px);
        }
        .rule-explanation-box {
            font-size: 0.95rem;
            color: #e2e8f0;
            line-height: 1.5;
            background: rgba(255, 255, 255, 0.03);
            padding: 0.9rem;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .rule-explanation-box strong {
            color: #f59e0b;
        }

        /* Tab 2: Detektiv Viewfinder */
        .detektiv-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
            max-width: 900px;
            margin: 0 auto;
        }
        .detektiv-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .detektiv-progress-badge {
            background: #0ea5e9;
            color: white;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.9rem;
        }
        .detektiv-score-badge {
            background: rgba(245, 158, 11, 0.2);
            border: 1px solid #f59e0b;
            color: #fbbf24;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.9rem;
        }
        .viewfinder-frame {
            position: relative;
            width: 100%;
            height: 380px;
            border-radius: 16px;
            overflow: hidden;
            border: 3px solid #38bdf8;
            box-shadow: 0 0 30px rgba(56, 189, 248, 0.3), inset 0 0 30px rgba(0,0,0,0.8);
            margin-bottom: 1.5rem;
            background: #0f172a;
        }
        .viewfinder-inner-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .viewfinder-crosshair {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90px;
            height: 90px;
            border: 2px dashed rgba(56, 189, 248, 0.8);
            border-radius: 50%;
            pointer-events: none;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .viewfinder-crosshair::before {
            content: '';
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #38bdf8;
            box-shadow: 0 0 10px #38bdf8;
        }
        .viewfinder-tag {
            position: absolute;
            bottom: 1rem;
            left: 1rem;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(8px);
            padding: 0.4rem 0.9rem;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 0.85rem;
            color: #38bdf8;
            font-weight: 700;
        }
        .detektiv-prompt-box {
            background: #0f172a;
            padding: 1.3rem;
            border-radius: 14px;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .detektiv-prompt-text {
            font-size: 1.15rem;
            color: #f8fafc;
            line-height: 1.5;
            font-weight: 500;
        }
        .detektiv-choices {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        @media (max-width: 600px) {
            .detektiv-choices { grid-template-columns: 1fr; }
        }
        .detektiv-choice-btn {
            background: #334155;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.12);
            padding: 1rem 1.4rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
        }
        .detektiv-choice-btn:hover:not(:disabled) {
            background: #475569;
            border-color: #38bdf8;
            transform: translateY(-2px);
        }
        .detektiv-choice-btn.correct {
            background: #15803d !important;
            border-color: #22c55e !important;
            color: white !important;
        }
        .detektiv-choice-btn.wrong {
            background: #b91c1c !important;
            border-color: #ef4444 !important;
            color: white !important;
            opacity: 0.7;
        }
        .detektiv-feedback-box {
            padding: 1.2rem;
            border-radius: 14px;
            font-size: 1rem;
            line-height: 1.5;
            animation: fadeIn 0.3s ease;
            margin-bottom: 1.5rem;
        }
        .detektiv-feedback-box.correct {
            background: rgba(34, 197, 94, 0.15);
            border: 1.5px solid #22c55e;
            color: #dcfce7;
        }
        .detektiv-feedback-box.wrong {
            background: rgba(239, 68, 68, 0.15);
            border: 1.5px solid #ef4444;
            color: #fee2e2;
        }
        .detektiv-next-btn {
            background: #0ea5e9;
            color: white;
            border: none;
            padding: 0.9rem 2rem;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: block;
            margin-left: auto;
        }
        .detektiv-next-btn:hover {
            background: #0284c7;
            transform: translateY(-2px);
        }

        /* Tab 3: Retnings-Vippen (Sorteringsspil) */
        .vippe-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 1000px;
            margin: 0 auto;
        }
        .vippe-intro {
            text-align: center;
            margin-bottom: 2rem;
        }
        .vippe-intro h2 {
            font-size: 1.8rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.5rem;
        }
        .vippe-intro p {
            color: #94a3b8;
            font-size: 1.05rem;
        }
        .vippe-zones-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        @media (max-width: 700px) {
            .vippe-zones-grid { grid-template-columns: 1fr; }
        }
        .vippe-drop-zone {
            background: #0f172a;
            border-radius: 18px;
            padding: 1.5rem;
            min-height: 240px;
            display: flex;
            flex-direction: column;
            border: 2px dashed rgba(255, 255, 255, 0.15);
            transition: all 0.3s ease;
        }
        .zone-retning {
            border-color: rgba(14, 165, 233, 0.5);
        }
        .zone-retning.highlight {
            border-color: #38bdf8;
            background: rgba(14, 165, 233, 0.08);
        }
        .zone-hvile {
            border-color: rgba(245, 158, 11, 0.5);
        }
        .zone-hvile.highlight {
            border-color: #fbbf24;
            background: rgba(245, 158, 11, 0.08);
        }
        .zone-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
            padding-bottom: 0.8rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .zone-title {
            font-size: 1.2rem;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .zone-chips-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            flex-grow: 1;
            align-content: flex-start;
        }
        .vippe-unassigned-pool {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.4rem;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .pool-header {
            font-size: 0.95rem;
            color: #94a3b8;
            font-weight: 700;
            margin-bottom: 1rem;
            text-transform: uppercase;
        }
        .pool-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.7rem;
            justify-content: center;
        }
        .vippe-chip {
            background: #334155;
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.6rem 1.1rem;
            border-radius: 20px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            user-select: none;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .vippe-chip:hover {
            transform: translateY(-2px);
            background: #475569;
            border-color: #38bdf8;
        }
        .vippe-chip.selected {
            background: #0ea5e9;
            border-color: white;
            box-shadow: 0 0 15px rgba(14, 165, 233, 0.6);
            transform: scale(1.08);
        }
        .vippe-feedback {
            text-align: center;
            min-height: 48px;
            font-size: 1.05rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.8rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
        }

        /* Tab 4: Sætningsbyggeren */
        .saetning-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 900px;
            margin: 0 auto;
        }
        .saetning-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .saetning-header h2 {
            font-size: 1.8rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.5rem;
        }
        .saetning-header p {
            color: #94a3b8;
            font-size: 1.05rem;
        }
        .saetning-challenge-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.8rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 1.5rem;
        }
        .saetning-focus-badge {
            display: inline-block;
            background: rgba(14, 165, 233, 0.15);
            border: 1px solid #38bdf8;
            color: #38bdf8;
            padding: 0.35rem 0.85rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            margin-bottom: 1rem;
        }
        .slots-drop-area {
            display: flex;
            gap: 0.8rem;
            flex-wrap: wrap;
            min-height: 70px;
            background: #1e293b;
            padding: 0.8rem;
            border-radius: 14px;
            border: 2px dashed rgba(255, 255, 255, 0.2);
            margin-bottom: 1.5rem;
            align-items: center;
        }
        .slot-placeholder {
            color: #64748b;
            font-size: 0.95rem;
            margin: auto;
            font-style: italic;
        }
        .chips-pool {
            display: flex;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
            justify-content: center;
        }
        .saetning-chip {
            background: #334155;
            color: white;
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            padding: 0.7rem 1.2rem;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            user-select: none;
        }
        .saetning-chip:hover {
            background: #475569;
            border-color: #38bdf8;
            transform: translateY(-2px);
        }
        .saetning-chip.slot-chip {
            background: #0284c7;
            border-color: #38bdf8;
        }
        .saetning-feedback-box {
            padding: 1rem 1.4rem;
            border-radius: 12px;
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 1.5rem;
            display: none;
        }
        .saetning-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .reset-slots-btn {
            background: transparent;
            color: #94a3b8;
            border: 1px solid #475569;
            padding: 0.7rem 1.2rem;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .reset-slots-btn:hover {
            color: white;
            border-color: white;
        }
        .check-saetning-btn {
            background: #0ea5e9;
            color: white;
            border: none;
            padding: 0.8rem 1.8rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }
        .check-saetning-btn:hover {
            background: #0284c7;
            transform: translateY(-2px);
        }

        /* Tab 5: Kontekst-testen (Model C Cloze) */
        .kontekst-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 900px;
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
            border-bottom: 3px solid #38bdf8;
            color: #38bdf8;
            font-weight: 800;
            text-align: center;
        }
        .cloze-options-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
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
            border-color: #38bdf8;
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
            background: rgba(14, 165, 233, 0.1);
            border: 1.5px solid #0ea5e9;
            padding: 1.2rem 1.5rem;
            border-radius: 14px;
            font-size: 1.05rem;
            line-height: 1.6;
            color: #e0f2fe;
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
        <h1>1. Sted: Retning vs. Hvile</h1>
        <p>Forstå og mestr den klassiske forskel på dansk mellem bevægelse hen mod et mål (kort form) og stilstand på ét sted (lang form med -e).</p>
        <div class="adv-rule-banner">
            <div class="rule-card-mini rule-retning">
                <span>🚀</span>
                <span><strong>Retning:</strong> Bevægelse mod mål = KORT FORM (hjem, ind, ud, op, ned, frem, hen)</span>
            </div>
            <div class="rule-card-mini rule-hvile">
                <span>🏡</span>
                <span><strong>Hvile:</strong> Stilstand på stedet = LANG FORM med -E (hjemme, inde, ude, oppe, nede, fremme, henne)</span>
            </div>
        </div>
    `;
    viewContainer.appendChild(hero);

    // Tabs Navigation
    const tabsNav = document.createElement('div');
    tabsNav.className = 'adv-tabs-nav';

    const tabsConfig = [
        { id: 'tab_vrimmel', label: '1. Vrimlebillede (18 ord)', icon: '🖼️' },
        { id: 'tab_detektiv', label: '2. Adverbie-Detektiven', icon: '🔍' },
        { id: 'tab_vippe', label: '3. Retnings-Vippen (-e reglen)', icon: '⚖️' },
        { id: 'tab_saetning', label: '4. Sætningsbyggeren', icon: '🧱' },
        { id: 'tab_kontekst', label: '5. Kontekst-testen', icon: '🎯' }
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
        Object.keys(tabButtons).forEach(id => {
            tabButtons[id].classList.toggle('active', id === tabId);
        });
        renderActiveTab();
    }

    function renderActiveTab() {
        tabContentContainer.innerHTML = '';
        if (currentTab === 'tab_vrimmel') {
            renderTabVrimmel(tabContentContainer);
        } else if (currentTab === 'tab_detektiv') {
            renderTabDetektiv(tabContentContainer);
        } else if (currentTab === 'tab_vippe') {
            renderTabVippe(tabContentContainer);
        } else if (currentTab === 'tab_saetning') {
            renderTabSaetning(tabContentContainer);
        } else if (currentTab === 'tab_kontekst') {
            renderTabKontekst(tabContentContainer);
        }
    }

    // ==========================================
    // TAB 1: DET INTERAKTIVE HUS & VRIMLEBILLEDE
    // ==========================================
    function renderTabVrimmel(parent) {
        const container = document.createElement('div');
        container.className = 'tab-vrimmel-wrapper';

        // Toolbar
        const toolbar = document.createElement('div');
        toolbar.className = 'vrimmel-toolbar';

        const filterGroup = document.createElement('div');
        filterGroup.className = 'filter-group';

        const filterButtons = [
            { id: 'all', label: 'Vis alle (18)' },
            { id: 'retning', label: '🚀 Kun Retning (10)' },
            { id: 'hvile', label: '🏡 Kun Hvile (8)' }
        ];

        filterButtons.forEach(fb => {
            const b = document.createElement('button');
            b.className = `filter-btn ${filterMode === fb.id ? 'active' : ''}`;
            b.textContent = fb.label;
            b.onclick = () => {
                filterMode = fb.id;
                renderTabVrimmel(parent);
            };
            filterGroup.appendChild(b);
        });
        toolbar.appendChild(filterGroup);

        const togglePinsBtn = document.createElement('button');
        togglePinsBtn.className = 'toggle-pins-btn';
        togglePinsBtn.innerHTML = `<span>${showPins ? '👁️ Skjul markører' : '👁️ Vis markører'}</span>`;
        togglePinsBtn.onclick = () => {
            showPins = !showPins;
            renderTabVrimmel(parent);
        };
        toolbar.appendChild(togglePinsBtn);
        container.appendChild(toolbar);

        // Stage Container
        const stage = document.createElement('div');
        stage.className = 'vrimmel-stage-container';

        const img = document.createElement('img');
        img.className = 'vrimmel-bg-img';
        img.src = 'assets/adverbier_sted_vrimmel.jpg';
        img.alt = 'Tværsnit af dansk hus med stedsadverbier i aktion';
        stage.appendChild(img);

        // Pins
        if (showPins) {
            ADVERBIER_STED_DATA.forEach(item => {
                if (filterMode === 'retning' && item.type !== 'retning') return;
                if (filterMode === 'hvile' && item.type !== 'hvile') return;

                const pin = document.createElement('div');
                pin.className = `hotspot-pin ${item.type === 'retning' ? 'pin-retning' : 'pin-hvile'} ${item.id === selectedWordId ? 'active' : ''}`;
                pin.style.left = `${item.x}%`;
                pin.style.top = `${item.y}%`;

                const icon = item.type === 'retning' ? '➔' : '📍';
                pin.innerHTML = `<span>${icon}</span> <span>${item.word}</span>`;

                pin.onclick = (e) => {
                    e.stopPropagation();
                    selectedWordId = item.id;
                    speakDanish(item.word);
                    renderTabVrimmel(parent);
                };

                stage.appendChild(pin);
            });
        }

        container.appendChild(stage);

        // Inspector Card
        const currentWordData = ADVERBIER_STED_DATA.find(w => w.id === selectedWordId) || ADVERBIER_STED_DATA[0];
        const inspector = document.createElement('div');
        inspector.className = 'inspector-card';

        // Left column
        const leftCol = document.createElement('div');
        leftCol.className = 'inspector-left';

        const wordHeader = document.createElement('div');
        wordHeader.className = 'inspector-word-header';
        wordHeader.innerHTML = `
            <div class="inspector-word-title">${currentWordData.word}</div>
            <div class="adv-type-badge ${currentWordData.type === 'retning' ? 'badge-retning' : 'badge-hvile'}">
                ${currentWordData.typeLabel}
            </div>
        `;
        const speakBtn = document.createElement('button');
        speakBtn.className = 'inspector-speak-btn';
        speakBtn.title = 'Hør udtale';
        speakBtn.innerHTML = '🔊';
        speakBtn.onclick = () => speakDanish(currentWordData.word);
        wordHeader.appendChild(speakBtn);
        leftCol.appendChild(wordHeader);

        const sceneDesc = document.createElement('div');
        sceneDesc.className = 'inspector-scene-desc';
        sceneDesc.innerHTML = `<strong>I huset:</strong> ${currentWordData.sceneDesc}`;
        leftCol.appendChild(sceneDesc);

        const sentBox = document.createElement('div');
        sentBox.className = 'inspector-sentence-box';
        sentBox.innerHTML = `
            <div class="inspector-sentence-text">
                "${currentWordData.sentence.replace(new RegExp(`\\b${currentWordData.word}\\b`, 'gi'), `<strong>${currentWordData.word}</strong>`)}"
            </div>
        `;
        const sentSpeakBtn = document.createElement('button');
        sentSpeakBtn.className = 'inspector-speak-btn';
        sentSpeakBtn.title = 'Hør sætning';
        sentSpeakBtn.innerHTML = '🗣️';
        sentSpeakBtn.onclick = () => speakDanish(currentWordData.sentence);
        sentBox.appendChild(sentSpeakBtn);
        leftCol.appendChild(sentBox);

        inspector.appendChild(leftCol);

        // Right column
        const rightCol = document.createElement('div');
        rightCol.className = 'inspector-right';

        if (currentWordData.pairId) {
            const pairSwitch = document.createElement('div');
            pairSwitch.className = 'pair-switch-card';
            pairSwitch.innerHTML = `
                <div class="pair-switch-header">🔄 Modstykke (${currentWordData.pairType === 'hvile' ? 'Hvile' : 'Retning'}):</div>
            `;
            const pairBtn = document.createElement('button');
            pairBtn.className = 'pair-action-btn';
            pairBtn.innerHTML = `
                <span>Se og sammenlign med: <strong>"${currentWordData.pairWord}"</strong></span>
                <span>➔</span>
            `;
            pairBtn.onclick = () => {
                selectedWordId = currentWordData.pairId;
                speakDanish(currentWordData.pairWord);
                renderTabVrimmel(parent);
            };
            pairSwitch.appendChild(pairBtn);
            rightCol.appendChild(pairSwitch);
        }

        const ruleBox = document.createElement('div');
        ruleBox.className = 'rule-explanation-box';
        ruleBox.innerHTML = `
            <div style="font-weight: 800; margin-bottom: 0.4rem; color: #38bdf8;">💡 Betydning & Regel:</div>
            <p style="margin-bottom: 0.5rem;">${currentWordData.meaning}.</p>
            <p>${currentWordData.ruleHint}</p>
        `;
        rightCol.appendChild(ruleBox);

        inspector.appendChild(rightCol);
        container.appendChild(inspector);

        parent.innerHTML = '';
        parent.appendChild(container);
    }

    // ==========================================
    // TAB 2: ADVERBIE-DETEKTIVEN (VIEWFINDER ZOOM)
    // ==========================================
    let detektivIdx = 0;
    let detektivScore = 0;
    let detektivAnswered = false;

    const DETEKTIV_MISSIONS = [
        {
            x: 15, y: 57,
            scale: 2.4,
            prompt: 'Mette tramper i pedalerne på stien mod sit eget hus. Hvad gør hun?',
            tag: 'Cyklisten på stien',
            options: [
                { text: 'A) Hun cykler hjem', correct: true, explain: 'Korrekt! Mette er på vej mod huset (i bevægelse), så vi bruger den korte retningsform "hjem".' },
                { text: 'B) Hun cykler hjemme', correct: false, explain: 'Ikke helt. "Hjemme" bruges kun, når man allerede er i huset i ro (f.eks. "Hun arbejder hjemme").' }
            ]
        },
        {
            x: 81, y: 64,
            scale: 2.5,
            prompt: 'Hunden ser en kat i græsset og springer gennem terrassedøren. Hvor løber den hen?',
            tag: 'Hunden ved terrassedøren',
            options: [
                { text: 'A) Den løber ude i haven', correct: false, explain: 'Husk reglen: Hunden krydser dørtærsklen i bevægelse mod det fri. Derfor er det retning!' },
                { text: 'B) Den løber ud i haven', correct: true, explain: 'Rigtigt! Der er bevægelse ud af stuen mod haven, så vi bruger den korte form "ud".' }
            ]
        },
        {
            x: 58, y: 66,
            scale: 2.6,
            prompt: 'Manden sidder mageligt i lænestolen med sin kaffe og avis. Hvor slapper han af?',
            tag: 'Manden i lænestolen',
            options: [
                { text: 'A) Han slapper af hjem', correct: false, explain: '"Hjem" er kun til bevægelse (gå hjem, køre hjem). I lænestolen sidder han stille.' },
                { text: 'B) Han slapper af hjemme', correct: true, explain: 'Korrekt! Manden befinder sig allerede inde i sin bolig i ro, så vi bruger formen med -e: "hjemme".' }
            ]
        },
        {
            x: 39, y: 29,
            scale: 2.6,
            prompt: 'Emma står ved kvistvinduet på øverste etage og vinker ned til gæsterne. Hvor står hun?',
            tag: 'Pigen i kvistvinduet',
            options: [
                { text: 'A) Hun står oppe på værelset', correct: true, explain: 'Flot! Emma står stille på den øverste etage i ro, så vi tilføjer -e: "oppe".' },
                { text: 'B) Hun står op på værelset', correct: false, explain: '"Op" viser bevægelse opad (f.eks. gå op). Når hun befinder sig deroppe, hedder det "oppe".' }
            ]
        },
        {
            x: 63, y: 55,
            scale: 2.5,
            prompt: 'Lucas tager trappetrinnene to ad gangen for at nå sit værelse. Hvad gør han?',
            tag: 'Drengen på trappen',
            options: [
                { text: 'A) Han går oppe ad trappen', correct: false, explain: 'Han er i fuld gang med at flytte sig mod en højere etage. Det er bevægelse!' },
                { text: 'B) Han går op ad trappen', correct: true, explain: 'Rigtigt! Lucas bevæger sig opad mod sit værelse, så det er den korte form "op".' }
            ]
        },
        {
            x: 73, y: 85,
            scale: 2.4,
            prompt: 'Vaskemaskinen centrifugerer håndklæder i det nederste kælderrum. Hvor står maskinen?',
            tag: 'Kælderen og vaskemaskinen',
            options: [
                { text: 'A) Den står nede i kælderen', correct: true, explain: 'Korrekt! Vaskemaskinen har sin faste plads i kælderen og flytter sig ikke. Derfor form med -e: "nede".' },
                { text: 'B) Den står ned i kælderen', correct: false, explain: '"Ned" bruges ved bevægelse (f.eks. bære vasketøjet ned). Fast placering hedder "nede".' }
            ]
        },
        {
            x: 37, y: 62,
            scale: 2.5,
            prompt: 'Gæsten i den grønne frakke har gået hele vejen og står nu ved ringeklokken. Hvad siger han?',
            tag: 'Gæsten foran hoveddøren',
            options: [
                { text: 'A) "Jeg er fremme nu!"', correct: true, explain: 'Lige præcis! Turen er slut, målet er nået, og han venter ved døren: "fremme".' },
                { text: 'B) "Jeg er frem nu!"', correct: false, explain: '"Frem" bruges om bevægelsen hen mod målet (f.eks. cykle frem mod lågen).' }
            ]
        },
        {
            x: 81, y: 9,
            scale: 2.3,
            prompt: 'Fuglen spreder vingerne, forlader tagryggen og flyver mod skyerne. Hvad gør den?',
            tag: 'Fuglen på tagryggen',
            options: [
                { text: 'A) Den flyver væk fra taget', correct: true, explain: 'Korrekt! Fuglen fjerner sig fra huset og flyver bort: "væk".' },
                { text: 'B) Den flyver tilbage til taget', correct: false, explain: '"Tilbage" ville betyde, at den vendte om til det sted, den kom fra.' }
            ]
        }
    ];

    function renderTabDetektiv(parent) {
        const container = document.createElement('div');
        container.className = 'detektiv-container';

        const mission = DETEKTIV_MISSIONS[detektivIdx];

        // Header
        const header = document.createElement('div');
        header.className = 'detektiv-header';
        header.innerHTML = `
            <div class="detektiv-progress-badge">Mission ${detektivIdx + 1} af ${DETEKTIV_MISSIONS.length}</div>
            <div class="detektiv-score-badge">⭐ Score: ${detektivScore} point</div>
        `;
        container.appendChild(header);

        // Viewfinder
        const frame = document.createElement('div');
        frame.className = 'viewfinder-frame';

        const img = document.createElement('img');
        img.className = 'viewfinder-inner-img';
        img.src = 'assets/adverbier_sted_vrimmel.jpg';
        // Compute pan transform to focus on the target hotspot
        const originX = mission.x;
        const originY = mission.y;
        img.style.transformOrigin = `${originX}% ${originY}%`;
        img.style.transform = `scale(${mission.scale})`;

        frame.appendChild(img);

        const crosshair = document.createElement('div');
        crosshair.className = 'viewfinder-crosshair';
        frame.appendChild(crosshair);

        const tag = document.createElement('div');
        tag.className = 'viewfinder-tag';
        tag.textContent = `🎯 ${mission.tag}`;
        frame.appendChild(tag);

        container.appendChild(frame);

        // Prompt
        const promptBox = document.createElement('div');
        promptBox.className = 'detektiv-prompt-box';
        promptBox.innerHTML = `
            <div class="detektiv-prompt-text">🔍 <strong>Situation:</strong> ${mission.prompt}</div>
        `;
        container.appendChild(promptBox);

        // Choices
        const choicesGrid = document.createElement('div');
        choicesGrid.className = 'detektiv-choices';

        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'detektiv-feedback-box';
        feedbackBox.style.display = 'none';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'detektiv-next-btn';
        nextBtn.textContent = detektivIdx < DETEKTIV_MISSIONS.length - 1 ? 'Næste mission ➔' : 'Se resultat 🎉';
        nextBtn.style.display = 'none';

        mission.options.forEach((opt) => {
            const btn = document.createElement('button');
            btn.className = 'detektiv-choice-btn';
            btn.textContent = opt.text;

            btn.onclick = () => {
                if (detektivAnswered) return;
                detektivAnswered = true;

                // Disable all choice buttons
                const allBtns = choicesGrid.querySelectorAll('.detektiv-choice-btn');
                allBtns.forEach(b => b.disabled = true);

                if (opt.correct) {
                    btn.classList.add('correct');
                    detektivScore += 10;
                    feedbackBox.className = 'detektiv-feedback-box correct';
                    feedbackBox.innerHTML = `<strong>✨ Rigtigt!</strong> ${opt.explain}`;
                    speakDanish(opt.text.replace(/^[A-B]\)\s*/, ''));
                } else {
                    btn.classList.add('wrong');
                    // Find and mark correct
                    mission.options.forEach((o, i) => {
                        if (o.correct) allBtns[i].classList.add('correct');
                    });
                    feedbackBox.className = 'detektiv-feedback-box wrong';
                    feedbackBox.innerHTML = `<strong>💡 Pædagogisk forklaring:</strong> ${opt.explain}`;
                }

                feedbackBox.style.display = 'block';
                nextBtn.style.display = 'block';
                header.querySelector('.detektiv-score-badge').textContent = `⭐ Score: ${detektivScore} point`;
            };

            choicesGrid.appendChild(btn);
        });
        container.appendChild(choicesGrid);
        container.appendChild(feedbackBox);

        nextBtn.onclick = () => {
            detektivAnswered = false;
            if (detektivIdx < DETEKTIV_MISSIONS.length - 1) {
                detektivIdx++;
                renderTabDetektiv(parent);
            } else {
                // Summary
                renderDetektivSummary(container, parent);
            }
        };
        container.appendChild(nextBtn);

        parent.innerHTML = '';
        parent.appendChild(container);
    }

    function renderDetektivSummary(container, parent) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🏆</div>
                <h2 style="font-size: 2.2rem; margin-bottom: 0.8rem; color: white;">Fantastisk detektiv-arbejde!</h2>
                <p style="font-size: 1.2rem; color: #94a3b8; margin-bottom: 1.5rem;">
                    Du gennemførte alle 8 missioner og opnåede <strong>${detektivScore} af ${DETEKTIV_MISSIONS.length * 10} point</strong>!
                </p>
                <div style="background: rgba(14, 165, 233, 0.15); border: 1px solid #0ea5e9; border-radius: 14px; padding: 1.2rem; max-width: 600px; margin: 0 auto 2rem; color: #e0f2fe; text-align: left; line-height: 1.6;">
                    <strong>Hovedregel du har mestret:</strong><br>
                    • Bevægelse mod mål bruger kort form: <em>hjem, ind, ud, op, ned, frem, hen, væk</em>.<br>
                    • Stilstand på stedet tilføjer <strong>-e</strong>: <em>hjemme, inde, ude, oppe, nede, fremme, henne</em>.
                </div>
                <button class="detektiv-next-btn" style="margin: 0 auto; display: inline-block;" id="restart-detektiv">
                    🔄 Prøv igen
                </button>
            </div>
        `;
        container.querySelector('#restart-detektiv').onclick = () => {
            detektivIdx = 0;
            detektivScore = 0;
            detektivAnswered = false;
            renderTabDetektiv(parent);
        };
    }

    // ==========================================
    // TAB 3: RETNINGS-VIPPEN (SORTERINGSSPIL OM -E REGLEN)
    // ==========================================
    const VIPPE_WORDS = [
        { word: 'hjem', type: 'retning', hint: 'Gå hjem' },
        { word: 'hjemme', type: 'hvile', hint: 'Være hjemme' },
        { word: 'ind', type: 'retning', hint: 'Løbe ind' },
        { word: 'inde', type: 'hvile', hint: 'Sidde inde' },
        { word: 'ud', type: 'retning', hint: 'Gå ud' },
        { word: 'ude', type: 'hvile', hint: 'Solbade ude' },
        { word: 'op', type: 'retning', hint: 'Klatre op' },
        { word: 'oppe', type: 'hvile', hint: 'Stå oppe' },
        { word: 'ned', type: 'retning', hint: 'Gå ned' },
        { word: 'nede', type: 'hvile', hint: 'Være nede' },
        { word: 'frem', type: 'retning', hint: 'Cykle frem' },
        { word: 'fremme', type: 'hvile', hint: 'Være fremme' },
        { word: 'hen', type: 'retning', hint: 'Løbe hen' },
        { word: 'henne', type: 'hvile', hint: 'Stå henne' },
        { word: 'tilbage', type: 'retning', hint: 'Løbe tilbage' },
        { word: 'væk', type: 'retning', hint: 'Flyve væk' }
    ];

    let vippePool = [...VIPPE_WORDS];
    let vippeRetningList = [];
    let vippeHvileList = [];
    let selectedVippeWord = null;

    function renderTabVippe(parent) {
        const container = document.createElement('div');
        container.className = 'vippe-container';

        // Intro
        const intro = document.createElement('div');
        intro.className = 'vippe-intro';
        intro.innerHTML = `
            <h2>⚖️ Retnings-Vippen</h2>
            <p>Klik på et adverbium nedenfor og vælg den rigtige kurv: Er ordet en <strong>Retning</strong> (kort form) eller <strong>Hvile</strong> (lang form med -e)?</p>
        `;
        container.appendChild(intro);

        // Zones Grid
        const zonesGrid = document.createElement('div');
        zonesGrid.className = 'vippe-zones-grid';

        // Zone: Retning
        const zoneRetning = document.createElement('div');
        zoneRetning.className = `vippe-drop-zone zone-retning ${selectedVippeWord ? 'highlight' : ''}`;
        zoneRetning.innerHTML = `
            <div class="zone-header">
                <span class="zone-title" style="color: #38bdf8;">🚀 Retning (Kort form)</span>
                <span style="font-weight: 800; font-size: 0.9rem; color: #38bdf8;">${vippeRetningList.length} ord</span>
            </div>
        `;
        const chipsRetning = document.createElement('div');
        chipsRetning.className = 'zone-chips-container';
        vippeRetningList.forEach(w => {
            const chip = document.createElement('div');
            chip.className = 'vippe-chip';
            chip.style.borderColor = '#38bdf8';
            chip.style.background = 'rgba(14, 165, 233, 0.2)';
            chip.innerHTML = `<span>🚀</span> <span>${w.word}</span>`;
            chipsRetning.appendChild(chip);
        });
        zoneRetning.appendChild(chipsRetning);

        zoneRetning.onclick = () => {
            if (!selectedVippeWord) return;
            handleVippePlacement('retning', feedbackBox);
        };
        zonesGrid.appendChild(zoneRetning);

        // Zone: Hvile
        const zoneHvile = document.createElement('div');
        zoneHvile.className = `vippe-drop-zone zone-hvile ${selectedVippeWord ? 'highlight' : ''}`;
        zoneHvile.innerHTML = `
            <div class="zone-header">
                <span class="zone-title" style="color: #fbbf24;">🏡 Hvile (Lang form med -e)</span>
                <span style="font-weight: 800; font-size: 0.9rem; color: #fbbf24;">${vippeHvileList.length} ord</span>
            </div>
        `;
        const chipsHvile = document.createElement('div');
        chipsHvile.className = 'zone-chips-container';
        vippeHvileList.forEach(w => {
            const chip = document.createElement('div');
            chip.className = 'vippe-chip';
            chip.style.borderColor = '#f59e0b';
            chip.style.background = 'rgba(245, 158, 11, 0.2)';
            chip.innerHTML = `<span>🏡</span> <span>${w.word}</span>`;
            chipsHvile.appendChild(chip);
        });
        zoneHvile.appendChild(chipsHvile);

        zoneHvile.onclick = () => {
            if (!selectedVippeWord) return;
            handleVippePlacement('hvile', feedbackBox);
        };
        zonesGrid.appendChild(zoneHvile);

        container.appendChild(zonesGrid);

        // Feedback box
        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'vippe-feedback';
        feedbackBox.innerHTML = selectedVippeWord
            ? `<span style="color: #38bdf8;">Valgt ord: <strong>"${selectedVippeWord.word}"</strong>. Klik nu på Retning eller Hvile ovenfor!</span>`
            : `<span style="color: #94a3b8;">Vælg et ord i puljen nedenfor for at placere det.</span>`;
        container.appendChild(feedbackBox);

        // Unassigned Pool
        const pool = document.createElement('div');
        pool.className = 'vippe-unassigned-pool';

        if (vippePool.length > 0) {
            pool.innerHTML = `<div class="pool-header">Ord der skal sorteres (${vippePool.length} tilbage):</div>`;
            const poolChips = document.createElement('div');
            poolChips.className = 'pool-chips';

            vippePool.forEach(item => {
                const c = document.createElement('div');
                c.className = `vippe-chip ${selectedVippeWord?.word === item.word ? 'selected' : ''}`;
                c.textContent = item.word;
                c.onclick = () => {
                    selectedVippeWord = item;
                    speakDanish(item.word);
                    renderTabVippe(parent);
                };
                poolChips.appendChild(c);
            });
            pool.appendChild(poolChips);
        } else {
            pool.innerHTML = `
                <div style="text-align: center; padding: 1.5rem;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉</div>
                    <h3 style="color: #22c55e; font-size: 1.5rem; margin-bottom: 0.5rem;">Perfekt sorteret!</h3>
                    <p style="color: #cbd5e1; margin-bottom: 1rem;">Du har mestret alle 16 stedsadverbier og deres retnings-/hvile-former!</p>
                    <button class="detektiv-next-btn" style="margin: 0 auto; display: inline-block;" id="reset-vippe-btn">
                        🔄 Start forfra
                    </button>
                </div>
            `;
            setTimeout(() => {
                const rBtn = pool.querySelector('#reset-vippe-btn');
                if (rBtn) {
                    rBtn.onclick = () => {
                        vippePool = [...VIPPE_WORDS];
                        vippeRetningList = [];
                        vippeHvileList = [];
                        selectedVippeWord = null;
                        renderTabVippe(parent);
                    };
                }
            }, 50);
        }
        container.appendChild(pool);

        function handleVippePlacement(targetType) {
            if (selectedVippeWord.type === targetType) {
                // Correct
                if (targetType === 'retning') {
                    vippeRetningList.push(selectedVippeWord);
                } else {
                    vippeHvileList.push(selectedVippeWord);
                }
                const removedWord = selectedVippeWord;
                vippePool = vippePool.filter(w => w.word !== removedWord.word);
                selectedVippeWord = null;

                feedbackBox.style.background = 'rgba(34, 197, 94, 0.15)';
                feedbackBox.style.color = '#22c55e';
                feedbackBox.innerHTML = `✨ Rigtigt! <strong>"${removedWord.word}"</strong> er ${targetType === 'retning' ? 'retning (f.eks. ' + removedWord.hint + ')' : 'hvile (f.eks. ' + removedWord.hint + ')'}.`;
                renderTabVippe(parent);
            } else {
                // Incorrect
                feedbackBox.style.background = 'rgba(239, 68, 68, 0.15)';
                feedbackBox.style.color = '#ef4444';
                feedbackBox.innerHTML = `💡 Prøv igen: <strong>"${selectedVippeWord.word}"</strong> ${selectedVippeWord.word.endsWith('e') ? 'har -e og angiver ro på stedet (hvile)!' : 'er kort form uden -e og angiver bevægelse mod mål (retning)!'}`;
            }
        }

        parent.innerHTML = '';
        parent.appendChild(container);
    }

    // ==========================================
    // TAB 4: SÆTNINGSBYGGEREN (ORDSTILLING & INVERSION)
    // ==========================================
    let saetningIdx = 0;

    const SAETNING_CHALLENGES = [
        {
            focus: 'Standard-rækkefølge (Subjekt - Verbum - Adverbium - Præp)',
            slots: ['Subjekt', 'Verbum', 'Stedsadverbium', 'Præposition'],
            chips: ['Hunden', 'hopper', 'ud', 'i haven'],
            correct: ['Hunden', 'hopper', 'ud', 'i haven'],
            explanation: 'Perfekt! I en almindelig fremsættende sætning kommer subjektet forrest, derefter verbet, og stedsadverbiets retning ("ud") før præpositionsleddet ("i haven").'
        },
        {
            focus: 'Standard-rækkefølge med hvileadverbium',
            slots: ['Subjekt', 'Verbum', 'Stedsadverbium', 'Præposition'],
            chips: ['Vaskemaskinen', 'står', 'nede', 'i kælderen'],
            correct: ['Vaskemaskinen', 'står', 'nede', 'i kælderen'],
            explanation: 'Rigtigt! Hvileadverbiets placering ("nede") præciserer det præcise niveau før præpositionsleddet.'
        },
        {
            focus: 'Inversion (Stedsadverbium på 1. plads skaber inversion!)',
            slots: ['Sted (1. plads)', 'Verbum (2. plads)', 'Subjekt (3. plads)', 'Restled'],
            chips: ['Ude', 'leger', 'børnene', 'i haven'],
            correct: ['Ude', 'leger', 'børnene', 'i haven'],
            explanation: 'Fantastisk! Når stedsadverbiets hvileform "Ude" sættes forrest for at skabe fokus, gælder den gyldne regel: Verbet rykker altid ind på 2. pladsen (Inversion: Ude leger børnene)!'
        },
        {
            focus: 'Standard-rækkefølge med bevægelse hjem',
            slots: ['Subjekt', 'Verbum', 'Stedsadverbium', 'Tid'],
            chips: ['Mette', 'cykler', 'hjem', 'nu'],
            correct: ['Mette', 'cykler', 'hjem', 'nu'],
            explanation: 'Korrekt! "Mette cykler hjem nu." Retningsadverbiet "hjem" står før tidsadverbiets "nu".'
        },
        {
            focus: 'Inversion med overetage (Oppe)',
            slots: ['Sted (1. plads)', 'Verbum (2. plads)', 'Subjekt (3. plads)', 'Præposition'],
            chips: ['Oppe', 'vinker', 'pigen', 'fra vinduet'],
            correct: ['Oppe', 'vinker', 'pigen', 'fra vinduet'],
            explanation: 'Flot inversion! "Oppe vinker pigen fra vinduet." Verbet "vinker" står fast på plads 2.'
        },
        {
            focus: 'Inversion med indendørs ro (Inde)',
            slots: ['Sted (1. plads)', 'Verbum (2. plads)', 'Subjekt (3. plads)', 'Objekt'],
            chips: ['Inde', 'drikker', 'far', 'en kop kaffe'],
            correct: ['Inde', 'drikker', 'far', 'en kop kaffe'],
            explanation: 'Fremragende! "Inde drikker far en kop kaffe." Stedet er i fokus, så subjektet ("far") bytter plads med verbet.'
        }
    ];

    let currentPlacedSlots = [];

    function renderTabSaetning(parent) {
        const container = document.createElement('div');
        container.className = 'saetning-container';

        const challenge = SAETNING_CHALLENGES[saetningIdx];

        // Header
        const header = document.createElement('div');
        header.className = 'saetning-header';
        header.innerHTML = `
            <h2>🧱 Sætningsbyggeren</h2>
            <p>Træn hvordan stedsadverbier placeres i danske sætninger – både i standard rækkefølge og ved inversion!</p>
        `;
        container.appendChild(header);

        // Card
        const card = document.createElement('div');
        card.className = 'saetning-challenge-card';

        const focusBadge = document.createElement('div');
        focusBadge.className = 'saetning-focus-badge';
        focusBadge.textContent = `Opgave ${saetningIdx + 1} af ${SAETNING_CHALLENGES.length}: ${challenge.focus}`;
        card.appendChild(focusBadge);

        // Drop Area / Slots
        const dropArea = document.createElement('div');
        dropArea.className = 'slots-drop-area';

        if (currentPlacedSlots.length === 0) {
            dropArea.innerHTML = `<span class="slot-placeholder">Klik på ordene nedenfor i den rigtige rækkefølge...</span>`;
        } else {
            currentPlacedSlots.forEach((word, idx) => {
                const chip = document.createElement('div');
                chip.className = 'saetning-chip slot-chip';
                chip.innerHTML = `<span>${word}</span> <span style="font-size: 0.8rem; opacity: 0.7;">✕</span>`;
                chip.onclick = () => {
                    currentPlacedSlots.splice(idx, 1);
                    renderTabSaetning(parent);
                };
                dropArea.appendChild(chip);
            });
        }
        card.appendChild(dropArea);

        // Chips Pool
        const remainingChips = challenge.chips.filter(c => !currentPlacedSlots.includes(c));
        const pool = document.createElement('div');
        pool.className = 'chips-pool';

        remainingChips.forEach(word => {
            const chip = document.createElement('div');
            chip.className = 'saetning-chip';
            chip.textContent = word;
            chip.onclick = () => {
                currentPlacedSlots.push(word);
                speakDanish(word);
                renderTabSaetning(parent);
            };
            pool.appendChild(chip);
        });
        card.appendChild(pool);

        // Feedback
        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'saetning-feedback-box';
        card.appendChild(feedbackBox);

        // Controls
        const controls = document.createElement('div');
        controls.className = 'saetning-controls';

        const resetBtn = document.createElement('button');
        resetBtn.className = 'reset-slots-btn';
        resetBtn.textContent = '↺ Nulstil brikker';
        resetBtn.onclick = () => {
            currentPlacedSlots = [];
            renderTabSaetning(parent);
        };
        controls.appendChild(resetBtn);

        const checkBtn = document.createElement('button');
        checkBtn.className = 'check-saetning-btn';
        checkBtn.textContent = currentPlacedSlots.length === challenge.correct.length ? 'Tjek sætning ✓' : 'Udfyld alle pladser';
        checkBtn.disabled = currentPlacedSlots.length !== challenge.correct.length;

        checkBtn.onclick = () => {
            const isCorrect = currentPlacedSlots.every((w, i) => w === challenge.correct[i]);
            feedbackBox.style.display = 'block';

            if (isCorrect) {
                feedbackBox.style.background = 'rgba(34, 197, 94, 0.15)';
                feedbackBox.style.border = '1.5px solid #22c55e';
                feedbackBox.style.color = '#dcfce7';
                feedbackBox.innerHTML = `
                    <div style="font-weight: 800; margin-bottom: 0.4rem;">🎉 Fuldstændig rigtigt!</div>
                    <p style="margin-bottom: 0.8rem;">${challenge.explanation}</p>
                    <button class="detektiv-next-btn" id="next-saetning-btn">
                        ${saetningIdx < SAETNING_CHALLENGES.length - 1 ? 'Næste sætning ➔' : 'Gennemfør 🏆'}
                    </button>
                `;
                speakDanish(currentPlacedSlots.join(' '));
                feedbackBox.querySelector('#next-saetning-btn').onclick = () => {
                    currentPlacedSlots = [];
                    if (saetningIdx < SAETNING_CHALLENGES.length - 1) {
                        saetningIdx++;
                        renderTabSaetning(parent);
                    } else {
                        saetningIdx = 0;
                        switchTab('tab_kontekst');
                    }
                };
            } else {
                feedbackBox.style.background = 'rgba(239, 68, 68, 0.15)';
                feedbackBox.style.border = '1.5px solid #ef4444';
                feedbackBox.style.color = '#fee2e2';
                feedbackBox.innerHTML = `
                    <div style="font-weight: 800; margin-bottom: 0.4rem;">💡 Prøv igen:</div>
                    <p>Husk på: Hvis stedsadverbiet står først, SKAL verbet være på 2. pladsen! Klik på et ord i sætningen for at fjerne det, eller tryk 'Nulstil'.</p>
                `;
            }
        };
        controls.appendChild(checkBtn);
        card.appendChild(controls);

        container.appendChild(card);
        parent.innerHTML = '';
        parent.appendChild(container);
    }

    // ==========================================
    // TAB 5: KONTEKST-TESTEN (MODEL C: RETNINGS-TESTEN CLOZE)
    // ==========================================
    let clozeIdx = 0;
    let clozeScore = 0;
    let clozeAnswered = false;

    const CLOZE_QUESTIONS = [
        {
            sentenceBefore: 'Klokken er 17, og jeg er træt. Jeg tager',
            sentenceAfter: 'nu.',
            options: ['hjem', 'hjemme'],
            correct: 'hjem',
            feedback: 'Korrekt! Verbet "tager" udtrykker bevægelse mod boligen. Derfor bruger vi den korte retningsform "hjem" (og ikke "hjemme").'
        },
        {
            sentenceBefore: 'Er du på kontoret i dag? – Nej, jeg arbejder',
            sentenceAfter: 'i dag.',
            options: ['hjem', 'hjemme'],
            correct: 'hjemme',
            feedback: 'Korrekt! Man befinder sig i huset i ro, mens man arbejder. Derfor bruger vi formen med -e: "hjemme".'
        },
        {
            sentenceBefore: 'Det begynder pludselig at hagle! Kom hurtigt',
            sentenceAfter: 'i stuen!',
            options: ['ind', 'inde'],
            correct: 'ind',
            feedback: 'Rigtigt! "Kom" er en bevægelse ind i huset. Derfor kort retningsform "ind".'
        },
        {
            sentenceBefore: 'Hvor har du lagt nøglerne? – De ligger',
            sentenceAfter: 'på spisebordet.',
            options: ['ind', 'inde'],
            correct: 'inde',
            feedback: 'Korrekt! Nøglerne ligger stille på bordet indendørs i ro. Derfor form med -e: "inde".'
        },
        {
            sentenceBefore: 'Solen skinner fantastisk, vi vil gerne',
            sentenceAfter: 'og gå en tur.',
            options: ['ud', 'ude'],
            correct: 'ud',
            feedback: 'Korrekt! "Vil gerne ud" udtrykker et ønske om bevægelse ud i det fri: "ud".'
        },
        {
            sentenceBefore: 'Det er for koldt til at spise frokost',
            sentenceAfter: 'på terrassen.',
            options: ['ud', 'ude'],
            correct: 'ude',
            feedback: 'Korrekt! Man sidder stille på terrassen og spiser. Derfor hvileform med -e: "ude".'
        },
        {
            sentenceBefore: 'Jeg henter lige en varm trøje, jeg går',
            sentenceAfter: 'på værelset.',
            options: ['op', 'oppe'],
            correct: 'op',
            feedback: 'Rigtigt! "Går" er en bevægelse op ad trappen mod første sal: "op".'
        },
        {
            sentenceBefore: 'Hvor er far? – Han står',
            sentenceAfter: 'på stigen og maler huset.',
            options: ['op', 'oppe'],
            correct: 'oppe',
            feedback: 'Korrekt! Far står stille på stigen i en høj position. Derfor: "oppe".'
        },
        {
            sentenceBefore: 'Toget var meget forsinket, men nu er vi endelig',
            sentenceAfter: 'ved hotellet.',
            options: ['frem', 'fremme'],
            correct: 'fremme',
            feedback: 'Flot! Rejsen er slut, målet er nået, og man er ankommet: "fremme".'
        },
        {
            sentenceBefore: 'Gider du lige gå',
            sentenceAfter: 'til bageren og købe kaffe?',
            options: ['hen', 'henne'],
            correct: 'hen',
            feedback: 'Korrekt! "Gå hen til" udtrykker bevægelse hen mod butikken: "hen".'
        },
        {
            sentenceBefore: 'Apoteket ligger lige',
            sentenceAfter: 'om hjørnet på venstre hånd.',
            options: ['hen', 'henne'],
            correct: 'henne',
            feedback: 'Korrekt! Butikken har sin faste placering og flytter sig ikke: "henne".'
        },
        {
            sentenceBefore: 'Bussen kører stærkt forbi, tag lige et skridt',
            sentenceAfter: 'fra kantstenen!',
            options: ['tilbage', 'væk'],
            correct: 'tilbage',
            feedback: 'Korrekt! "Et skridt tilbage" viser bevægelse mod udgangspunktet væk fra kanten.'
        }
    ];

    function renderTabKontekst(parent) {
        const container = document.createElement('div');
        container.className = 'kontekst-container';

        const q = CLOZE_QUESTIONS[clozeIdx];

        // Header
        const header = document.createElement('div');
        header.className = 'detektiv-header';
        header.innerHTML = `
            <div class="detektiv-progress-badge">Spørgsmål ${clozeIdx + 1} af ${CLOZE_QUESTIONS.length}</div>
            <div class="detektiv-score-badge">⭐ Score: ${clozeScore} point</div>
        `;
        container.appendChild(header);

        // Card
        const card = document.createElement('div');
        card.className = 'cloze-card';

        const display = document.createElement('div');
        display.className = 'cloze-sentence-display';
        display.innerHTML = `
            ${q.sentenceBefore} <span class="cloze-blank" id="cloze-target-blank">_____</span> ${q.sentenceAfter}
        `;
        card.appendChild(display);

        // Options Grid
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'cloze-options-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'cloze-didactic-feedback';
        feedbackBox.style.display = 'none';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'detektiv-next-btn';
        nextBtn.textContent = clozeIdx < CLOZE_QUESTIONS.length - 1 ? 'Næste sætning ➔' : 'Afslut opgaven 🎉';
        nextBtn.style.display = 'none';

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'cloze-option-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                if (clozeAnswered) return;
                clozeAnswered = true;

                const allBtns = optionsGrid.querySelectorAll('.cloze-option-btn');
                allBtns.forEach(b => b.disabled = true);

                const blank = display.querySelector('#cloze-target-blank');
                blank.textContent = opt;

                if (opt === q.correct) {
                    btn.classList.add('correct');
                    clozeScore += 10;
                    feedbackBox.innerHTML = `<strong>✨ Rigtigt!</strong> ${q.feedback}`;
                    speakDanish(`${q.sentenceBefore} ${opt} ${q.sentenceAfter}`);
                } else {
                    btn.classList.add('wrong');
                    q.options.forEach((o, i) => {
                        if (o === q.correct) allBtns[i].classList.add('correct');
                    });
                    feedbackBox.innerHTML = `<strong>💡 Pædagogisk forklaring:</strong> ${q.feedback}`;
                }

                feedbackBox.style.display = 'block';
                nextBtn.style.display = 'block';
                header.querySelector('.detektiv-score-badge').textContent = `⭐ Score: ${clozeScore} point`;
            };

            optionsGrid.appendChild(btn);
        });
        card.appendChild(optionsGrid);
        card.appendChild(feedbackBox);

        nextBtn.onclick = () => {
            clozeAnswered = false;
            if (clozeIdx < CLOZE_QUESTIONS.length - 1) {
                clozeIdx++;
                renderTabKontekst(parent);
            } else {
                renderClozeSummary(container, parent);
            }
        };
        card.appendChild(nextBtn);

        container.appendChild(card);
        parent.innerHTML = '';
        parent.appendChild(container);
    }

    function renderClozeSummary(container, parent) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2.5rem;">
                <div style="font-size: 4.5rem; margin-bottom: 1rem;">🌟</div>
                <h2 style="font-size: 2.2rem; margin-bottom: 0.8rem; color: white;">Superflot klaret!</h2>
                <p style="font-size: 1.2rem; color: #94a3b8; margin-bottom: 1.5rem;">
                    Du gennemførte kontekst-testen med <strong>${clozeScore} af ${CLOZE_QUESTIONS.length * 10} point</strong>!
                </p>
                <div style="background: rgba(14, 165, 233, 0.15); border: 1px solid #0ea5e9; border-radius: 14px; padding: 1.4rem; max-width: 650px; margin: 0 auto 2rem; color: #e0f2fe; text-align: left; line-height: 1.6;">
                    <strong>Husk de 3 gyldne huskeregler:</strong><br>
                    1. <strong>Tjek verbet:</strong> Bevæger subjektet sig (gå, cykle, køre, løbe, flyve)? ➔ Kort form (<em>hjem, ind, ud, op, ned</em>).<br>
                    2. <strong>Er der ro på stedet?</strong> (sidde, stå, ligge, være, sove)? ➔ Lang form med <strong>-e</strong> (<em>hjemme, inde, ude, oppe, nede</em>).<br>
                    3. <strong>Målet nået:</strong> Når rejsen er slut og du er ankommet, er du <em>fremme</em>!
                </div>
                <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                    <button class="detektiv-next-btn" id="restart-cloze-btn">
                        🔄 Tag testen igen
                    </button>
                    <button class="detektiv-next-btn" style="background: #334155;" id="back-to-hub-btn">
                        🧭 Tilbage til Adverbier-oversigten
                    </button>
                </div>
            </div>
        `;
        container.querySelector('#restart-cloze-btn').onclick = () => {
            clozeIdx = 0;
            clozeScore = 0;
            clozeAnswered = false;
            renderTabKontekst(parent);
        };
        container.querySelector('#back-to-hub-btn').onclick = () => {
            navigateFn('top100_adverbier');
        };
    }

    // Initialize with Tab 1
    renderActiveTab();
    container.appendChild(viewContainer);
}
