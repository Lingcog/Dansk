import { getTranslation, getLang } from '../utils/i18n.js';
import { getAdverbWordTranslation } from '../utils/top100_adverbier_translations.js';

/**
 * AdverbierTidView - Felt 2: Tid & Frekvens (Hvornår, hvor længe, hvor tit)
 * 19 højfrekvente tidsadverbier trænet i 5 didaktiske tabs:
 * 1. Det Interaktive Torv & Vrimlebillede (19 hotspots, Frekvens vs Tidspunkt, pure mode, audio)
 * 2. Tids-Detektiven (8 dynamiske zoom-missioner i byen)
 * 3. Frekvens-Barometret & Tidslinjen (100% til 0% skala & før/nu/bagefter)
 * 4. Sætningsbyggeren (Centraladverbium & inversion ved tid på 1. plads)
 * 5. Tids-Nuancen (Model B: Cloze med forvekslingspar f.eks. allerede/endnu/stadig)
 */
export function renderAdverbierTidView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adverbier-tid-view';

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

    // 19 Words Data for Felt 2 (Tid & Frekvens) - Simple A1/A2 sentences
    const ADVERBIER_TID_DATA = [
        {
            id: 'nu',
            word: 'nu',
            type: 'tidspunkt',
            typeLabel: 'Tidspunkt (lige nu)',
            pairId: 'bagefter',
            pairWord: 'bagefter',
            pairType: 'tidspunkt',
            x: 44,
            y: 64,
            sceneDesc: 'Manden kigger på sit ur lige i dette øjeblik.',
            meaning: 'Lige i dette øjeblik / i nutiden',
            sentence: 'Manden kigger på sit ur nu.',
            ruleHint: '"Nu" angiver nutid. Bruges ofte som 1. led i en sætning med inversion: "Nu har jeg travlt!"'
        },
        {
            id: 'altid',
            word: 'altid',
            type: 'frekvens',
            typeLabel: 'Frekvens (100%)',
            pairId: 'aldrig',
            pairWord: 'aldrig',
            pairType: 'frekvens',
            x: 17,
            y: 53,
            sceneDesc: 'Bageren smiler altid til kunderne.',
            meaning: '100% af gangene / hver evig eneste dag uden undtagelse',
            sentence: 'Han smiler altid til mig.',
            ruleHint: 'Det højeste frekvensadverbium (100%). Modsat "aldrig". Står ofte som centraladverbium efter verbet.'
        },
        {
            id: 'aldrig',
            word: 'aldrig',
            type: 'frekvens',
            typeLabel: 'Frekvens (0%)',
            pairId: 'altid',
            pairWord: 'altid',
            pairType: 'frekvens',
            x: 92,
            y: 58,
            sceneDesc: 'Familien på cyklen tager aldrig bilen.',
            meaning: '0% af gangene / på intet tidspunkt',
            sentence: 'De kører aldrig i bil.',
            ruleHint: 'Det laveste frekvensadverbium (0%). Fungerer som benægtelse på samme plads som "ikke".'
        },
        {
            id: 'ofte',
            word: 'ofte',
            type: 'frekvens',
            typeLabel: 'Frekvens (høj, ca. 70-80%)',
            pairId: 'sjældent',
            pairWord: 'sjældent',
            pairType: 'frekvens',
            x: 80,
            y: 66,
            sceneDesc: 'Manden cykler ofte gennem byen.',
            meaning: 'Mange gange / med kort tidsinterval',
            sentence: 'Vi cykler ofte på arbejde.',
            ruleHint: 'Angiver høj hyppighed. Er synonym med "tit".'
        },
        {
            id: 'tit',
            word: 'tit',
            type: 'frekvens',
            typeLabel: 'Frekvens (høj, hverdagsdansk)',
            pairId: 'sjældent',
            pairWord: 'sjældent',
            pairType: 'frekvens',
            x: 28,
            y: 62,
            sceneDesc: 'Postbuddet kommer tit forbi her.',
            meaning: 'Ofte / mange gange i hverdagen',
            sentence: 'Bussen kommer tit forbi.',
            ruleHint: 'Kort hverdagsord for "ofte". Bruges ekstremt meget i mundtligt dansk.'
        },
        {
            id: 'sjældent',
            word: 'sjældent',
            type: 'frekvens',
            typeLabel: 'Frekvens (lav, ca. 10-20%)',
            pairId: 'ofte',
            pairWord: 'ofte',
            pairType: 'frekvens',
            x: 62,
            y: 48,
            sceneDesc: 'Den gule bybus kommer sjældent for sent.',
            meaning: 'Få gange / næsten aldrig',
            sentence: 'Han kommer sjældent for sent.',
            ruleHint: 'Angiver lav hyppighed (ca. 10-20%). Det modsatte af "ofte" og "tit".'
        },
        {
            id: 'snart',
            word: 'snart',
            type: 'tidspunkt',
            typeLabel: 'Tidspunkt (nær fremtid)',
            pairId: 'straks',
            pairWord: 'straks',
            pairType: 'tidspunkt',
            x: 71,
            y: 31,
            sceneDesc: 'Toget er tæt på og kommer snart.',
            meaning: 'Om kort tid / inden længe',
            sentence: 'Toget kommer snart.',
            ruleHint: 'Viser at noget vil ske om kort tid ud i fremtiden.'
        },
        {
            id: 'længe',
            word: 'længe',
            type: 'tidspunkt',
            typeLabel: 'Varighed (lang tid)',
            pairId: 'snart',
            pairWord: 'snart',
            pairType: 'tidspunkt',
            x: 65,
            y: 81,
            sceneDesc: 'Kvinden har siddet på bænken længe.',
            meaning: 'I lang tid / med stor varighed',
            sentence: 'Hun har ventet længe på bænken.',
            ruleHint: 'Beskriver tidsrummets længde (varighed): "Hvor længe venter du? – Jeg venter længe."'
        },
        {
            id: 'allerede',
            word: 'allerede',
            type: 'tidspunkt',
            typeLabel: 'Tidspunkt (før forventet)',
            pairId: 'endnu',
            pairWord: 'endnu',
            pairType: 'tidspunkt',
            x: 34,
            y: 46,
            sceneDesc: 'Bageren har allerede frisk brød klar.',
            meaning: 'Tidligere end forventet',
            sentence: 'Bageren åbner allerede klokken 6.',
            ruleHint: 'Vigtig didaktisk nuance! Viser at noget sker FØR man forventede det.'
        },
        {
            id: 'endnu',
            word: 'endnu',
            type: 'tidspunkt',
            typeLabel: 'Tidspunkt (forventes senere)',
            pairId: 'allerede',
            pairWord: 'allerede',
            pairType: 'tidspunkt',
            x: 96,
            y: 47,
            sceneDesc: 'Butikken er ikke åbnet endnu.',
            meaning: 'Indtil dette tidspunkt (især: "ikke endnu")',
            sentence: 'Butikken er ikke åben endnu.',
            ruleHint: '"Ikke endnu" = handlingen er ikke sket lige nu, men forventes snart.'
        },
        {
            id: 'stadig',
            word: 'stadig',
            type: 'tidspunkt',
            typeLabel: 'Tidspunkt (fortsat tilstand)',
            pairId: 'allerede',
            pairWord: 'allerede',
            pairType: 'tidspunkt',
            x: 59,
            y: 77,
            sceneDesc: 'Kvinden sidder stadig og læser.',
            meaning: 'Fortsat / uændret uden stop',
            sentence: 'Hun læser stadig i bogen.',
            ruleHint: 'Viser kontinuitet: En handling startede før og fortsætter lige nu.'
        },
        {
            id: 'igen',
            word: 'igen',
            type: 'frekvens',
            typeLabel: 'Gentagelse',
            pairId: null,
            pairWord: null,
            pairType: null,
            x: 54,
            y: 56,
            sceneDesc: 'Kvinden tager paraplyen frem igen.',
            meaning: 'En gang til / fornyet gentagelse',
            sentence: 'Nu regner det igen.',
            ruleHint: 'Viser gentagelse af noget, der allerede er sket før: "Prøv igen", "Det regner igen".'
        },
        {
            id: 'straks',
            word: 'straks',
            type: 'tidspunkt',
            typeLabel: 'Tidspunkt (med det samme)',
            pairId: 'snart',
            pairWord: 'snart',
            pairType: 'tidspunkt',
            x: 42,
            y: 70,
            sceneDesc: 'Manden skynder sig af sted straks.',
            meaning: 'Lige med det samme / i dette sekund',
            sentence: 'Jeg kommer straks!',
            ruleHint: 'Hurtigere end "snart". Betyder "lige nu med det samme".'
        },
        {
            id: 'før',
            word: 'før',
            type: 'tidspunkt',
            typeLabel: 'Tidspunkt (fortid)',
            pairId: 'bagefter',
            pairWord: 'bagefter',
            pairType: 'tidspunkt',
            x: 88,
            y: 84,
            sceneDesc: 'Manden ser på et billede fra før.',
            meaning: 'Tidligere i fortiden / førhen',
            sentence: 'Jeg boede i Aarhus før.',
            ruleHint: 'Henviser til et tidligere tidspunkt i fortiden. Modsat "bagefter" og "nu".'
        },
        {
            id: 'siden',
            word: 'siden',
            type: 'tidspunkt',
            typeLabel: 'Tidsforløb / Startpunkt',
            pairId: null,
            pairWord: null,
            pairType: null,
            x: 49,
            y: 22,
            sceneDesc: 'Tårnuret har gået siden år 1900.',
            meaning: 'Fra et startpunkt i fortiden indtil nu',
            sentence: 'Uret har gået siden 1900.',
            ruleHint: 'Angiver startpunkt: "siden i morges", "siden 1900", eller tidsrum: "for længe siden".'
        },
        {
            id: 'bagefter',
            word: 'bagefter',
            type: 'tidspunkt',
            typeLabel: 'Tidspunkt (efterfølgende)',
            pairId: 'før',
            pairWord: 'før',
            pairType: 'tidspunkt',
            x: 9,
            y: 74,
            sceneDesc: 'Først køber han brød, og bagefter går han.',
            meaning: 'Efter at noget andet er afsluttet',
            sentence: 'Først spiser vi, og bagefter sover vi.',
            ruleHint: 'Kronologisk rækkefølge: Trin 1 sker først, og trin 2 sker bagefter.'
        },
        {
            id: 'engang',
            word: 'engang',
            type: 'tidspunkt',
            typeLabel: 'Tidspunkt (ubestemt tid)',
            pairId: null,
            pairWord: null,
            pairType: null,
            x: 34,
            y: 31,
            sceneDesc: 'Byens huse viser, hvordan her var engang.',
            meaning: 'På et ubestemt tidspunkt i fortiden',
            sentence: 'Der var engang et gammelt slot her.',
            ruleHint: 'Klassisk historisk tidsmarkør: "Der var engang...", "Det var engang i 90\'erne".'
        },
        {
            id: 'sommetider',
            word: 'sommetider',
            type: 'frekvens',
            typeLabel: 'Frekvens (50%)',
            pairId: null,
            pairWord: null,
            pairType: null,
            x: 67,
            y: 13,
            sceneDesc: 'Sommetider skinner solen over byen.',
            meaning: 'Nogle gange / af og til (ca. 50% af tilfældene)',
            sentence: 'Sommetider skinner solen.',
            ruleHint: 'Mellemfrekvens (ca. 50%). Synonym med "nogle gange".'
        },
        {
            id: 'foreløbig',
            word: 'foreløbig',
            type: 'tidspunkt',
            typeLabel: 'Tidspunkt (indtil videre)',
            pairId: null,
            pairWord: null,
            pairType: null,
            x: 79,
            y: 46,
            sceneDesc: 'Kiosken holder foreløbig åbent.',
            meaning: 'Indtil videre / for nuværende',
            sentence: 'Foreløbig bor jeg i København.',
            ruleHint: 'Betyder "for nuværende, men det kan ændre sig senere".'
        }
    ];

    // State
    let currentTab = (extraData && (extraData.subPath || extraData.tab)) ? (extraData.subPath || extraData.tab) : 'tab_vrimmel';
    let selectedWordId = 'nu';
    let filterMode = 'all'; // 'all', 'frekvens', 'tidspunkt'
    let showPins = true;

    // View Styles
    const style = document.createElement('style');
    style.textContent = `
        .adverbier-tid-view {
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
            background: linear-gradient(135deg, #f59e0b, #fbbf24, #f97316);
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
        .rule-frekvens {
            background: rgba(245, 158, 11, 0.15);
            border: 1.5px solid #f59e0b;
            color: #fbbf24;
        }
        .rule-tidspunkt {
            background: rgba(14, 165, 233, 0.15);
            border: 1.5px solid #0ea5e9;
            color: #38bdf8;
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
            background: #f59e0b;
            color: white;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
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
            background: #f59e0b;
            color: white;
            border-color: #fbbf24;
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

        /* Slanke, proportionelle pins (samme som rettet i Felt 1) */
        .hotspot-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0.18rem 0.45rem;
            border-radius: 12px;
            font-size: 0.72rem;
            font-weight: 700;
            cursor: pointer;
            border: 1.5px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
            transition: all 0.2s ease;
            z-index: 10;
            white-space: nowrap;
            letter-spacing: 0.2px;
            backdrop-filter: blur(4px);
        }
        .hotspot-pin .pin-icon {
            font-size: 0.65rem;
            line-height: 1;
            display: inline-flex;
            align-items: center;
        }
        .hotspot-pin .pin-text {
            line-height: 1.1;
        }
        .hotspot-pin:hover {
            transform: translate(-50%, -50%) scale(1.1);
            z-index: 20;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.65);
        }
        .hotspot-pin.active {
            transform: translate(-50%, -50%) scale(1.15);
            z-index: 30;
            box-shadow: 0 0 16px #fbbf24, 0 4px 12px rgba(0, 0, 0, 0.8);
            border-color: #fbbf24;
        }
        .pin-frekvens {
            background: rgba(217, 119, 6, 0.92);
            color: white;
        }
        .pin-tidspunkt {
            background: rgba(2, 132, 199, 0.92);
            color: white;
        }

        @media (max-width: 768px) {
            .hotspot-pin {
                padding: 0.12rem 0.35rem;
                font-size: 0.62rem;
                border-radius: 9px;
                border-width: 1px;
                gap: 0.18rem;
            }
            .hotspot-pin .pin-icon {
                font-size: 0.55rem;
            }
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
        .badge-frekvens {
            background: rgba(245, 158, 11, 0.2);
            border: 1.5px solid #f59e0b;
            color: #fbbf24;
        }
        .badge-tidspunkt {
            background: rgba(14, 165, 233, 0.2);
            border: 1.5px solid #38bdf8;
            color: #38bdf8;
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
            background: #f59e0b;
            transform: scale(1.1);
        }
        .inspector-scene-desc {
            background: rgba(15, 23, 42, 0.6);
            border-left: 4px solid #f59e0b;
            padding: 0.8rem 1rem;
            border-radius: 0 12px 12px 0;
            font-size: 0.95rem;
            color: #cbd5e1;
            line-height: 1.5;
        }
        .inspector-sentence-box {
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(251, 191, 36, 0.25);
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
            color: #fbbf24;
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
            background: linear-gradient(135deg, #d97706, #b45309);
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
            background: linear-gradient(135deg, #b45309, #92400e);
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
            color: #38bdf8;
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
            background: #f59e0b;
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
            border: 3px solid #fbbf24;
            box-shadow: 0 0 30px rgba(245, 158, 11, 0.3), inset 0 0 30px rgba(0,0,0,0.8);
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
            border: 2px dashed rgba(251, 191, 36, 0.8);
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
            background: #fbbf24;
            box-shadow: 0 0 10px #fbbf24;
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
            color: #fbbf24;
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
            border-color: #fbbf24;
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
            background: #f59e0b;
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
            background: #d97706;
            transform: translateY(-2px);
        }

        /* Tab 3: Frekvens-Barometret & Tidslinjen (Interaktive øvelser) */
        .barometer-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 950px;
            margin: 0 auto;
        }
        .barometer-intro {
            text-align: center;
            margin-bottom: 2rem;
        }
        .barometer-intro h2 {
            font-size: 1.8rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.5rem;
        }
        .barometer-intro p {
            color: #94a3b8;
            font-size: 1.05rem;
        }
        .barometer-exercise-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.6rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 2rem;
        }
        .barometer-card-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #fbbf24;
            margin-bottom: 0.4rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .barometer-card-desc {
            font-size: 0.95rem;
            color: #94a3b8;
            margin-bottom: 1.2rem;
        }
        .frequency-ladder {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            margin-bottom: 1.5rem;
        }
        .ladder-step {
            background: #1e293b;
            border-radius: 14px;
            padding: 0.9rem 1.3rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 2px dashed rgba(255, 255, 255, 0.15);
            transition: all 0.2s ease;
            gap: 1rem;
        }
        .ladder-step.filled {
            border-style: solid;
            border-color: #f59e0b;
            background: rgba(245, 158, 11, 0.1);
        }
        .ladder-percent {
            font-size: 1.15rem;
            font-weight: 900;
            color: #fbbf24;
            min-width: 65px;
        }
        .ladder-label {
            font-size: 0.95rem;
            color: #cbd5e1;
            flex-grow: 1;
        }
        .ladder-target-slot {
            min-width: 140px;
            min-height: 42px;
            background: #0f172a;
            border-radius: 10px;
            border: 1.5px dashed rgba(255, 255, 255, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            padding: 0.4rem 0.8rem;
        }
        .ladder-target-slot.empty {
            color: #64748b;
            font-style: italic;
            font-size: 0.85rem;
        }
        .ladder-target-slot.empty:hover {
            border-color: #fbbf24;
            background: rgba(245, 158, 11, 0.08);
            color: #cbd5e1;
        }
        .ladder-target-slot.filled {
            border-style: solid;
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.18);
            color: #4ade80;
        }
        .barometer-pool-box {
            background: #1e293b;
            border-radius: 12px;
            padding: 1.2rem;
            margin-bottom: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .barometer-pool-title {
            font-size: 0.85rem;
            color: #94a3b8;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.8rem;
        }
        .barometer-chips-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            justify-content: center;
        }
        .barometer-chip-btn {
            background: #334155;
            color: white;
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            padding: 0.6rem 1.1rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
        }
        .barometer-chip-btn:hover {
            background: #475569;
            border-color: #fbbf24;
            transform: translateY(-2px);
        }
        .barometer-chip-btn.selected {
            background: #d97706;
            border-color: #fbbf24;
            color: white;
            box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);
            transform: scale(1.05);
        }
        .barometer-chip-btn.used {
            opacity: 0.3;
            pointer-events: none;
        }
        .barometer-feedback-box {
            min-height: 44px;
            padding: 0.8rem 1.2rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 600;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .barometer-feedback-box.correct {
            background: rgba(34, 197, 94, 0.15);
            border: 1.5px solid #22c55e;
            color: #dcfce7;
        }
        .barometer-feedback-box.wrong {
            background: rgba(239, 68, 68, 0.15);
            border: 1.5px solid #ef4444;
            color: #fee2e2;
        }

        /* Timeline exercise */
        .timeline-slots-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        @media (max-width: 700px) {
            .timeline-slots-grid { grid-template-columns: 1fr; }
        }
        .timeline-slot-box {
            background: #1e293b;
            border-radius: 14px;
            padding: 1.2rem 1rem;
            text-align: center;
            border: 2px dashed rgba(255, 255, 255, 0.2);
            cursor: pointer;
            transition: all 0.2s ease;
            min-height: 90px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .timeline-slot-box.filled {
            border-style: solid;
            border-color: #38bdf8;
            background: rgba(14, 165, 233, 0.15);
        }
        .timeline-slot-role {
            font-size: 0.8rem;
            color: #94a3b8;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 0.3rem;
        }
        .timeline-slot-value {
            font-size: 1.2rem;
            font-weight: 800;
            color: white;
        }

        /* Tab 4: Sætningsbyggeren (Fuld to-trins model som i verberne og Felt 1) */
        .sentence-builder-card {
            max-width: 960px;
            margin: 0 auto;
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .sb-sub-nav {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 1rem;
            flex-wrap: wrap;
        }
        .sb-sub-btn {
            background: rgba(15, 23, 42, 0.6);
            color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.75rem 1.4rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-sub-btn:hover {
            color: white;
            border-color: #fbbf24;
            background: rgba(245, 158, 11, 0.1);
        }
        .sb-sub-btn.active {
            background: linear-gradient(135deg, #d97706, #f59e0b);
            color: white;
            border-color: #fbbf24;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
        }
        .grammar-legend-bar {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.2rem;
            margin-bottom: 1.5rem;
            padding: 0.6rem 1rem;
            background: rgba(15, 23, 42, 0.7);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 0.85rem;
        }
        .grammar-legend-item { display: flex; align-items: center; gap: 0.4rem; }
        .legend-chip { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
        .chip-substantiv { background: #22c55e; box-shadow: 0 0 6px rgba(34, 197, 94, 0.6); }
        .chip-verbum { background: #ef4444; box-shadow: 0 0 6px rgba(239, 68, 68, 0.6); }
        .chip-tid { background: #f59e0b; box-shadow: 0 0 6px rgba(245, 158, 11, 0.6); }
        .chip-rest { background: #a855f7; box-shadow: 0 0 6px rgba(168, 85, 247, 0.6); }

        .sb-category-row {
            margin-bottom: 1.3rem;
            background: rgba(15, 23, 42, 0.45);
            border-radius: 14px;
            padding: 1rem 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-left: 4px solid #64748b;
        }
        .sb-cat-subjekt { border-left-color: #22c55e; }
        .sb-cat-verbum { border-left-color: #ef4444; }
        .sb-cat-tid { border-left-color: #f59e0b; }
        .sb-cat-rest { border-left-color: #a855f7; }

        .sb-category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.7rem;
            flex-wrap: wrap;
            gap: 0.4rem;
        }
        .sb-category-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: #e2e8f0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-category-badge {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
        }
        .badge-cat-subjekt { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .badge-cat-verbum { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
        .badge-cat-tid { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
        .badge-cat-rest { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }

        .sb-chips-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .sb-chip-btn {
            background: #1e293b;
            color: #cbd5e1;
            border: 1px solid #475569;
            padding: 0.55rem 1rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sb-chip-btn:hover {
            color: white;
            border-color: #94a3b8;
            transform: translateY(-2px);
        }
        .sb-chip-btn.selected {
            font-weight: 800;
            transform: translateY(-2px);
        }
        .sb-cat-subjekt .sb-chip-btn.selected {
            background: rgba(34, 197, 94, 0.25);
            color: #4ade80;
            border-color: #22c55e;
            box-shadow: 0 0 12px rgba(34, 197, 94, 0.4);
        }
        .sb-cat-verbum .sb-chip-btn.selected {
            background: rgba(239, 68, 68, 0.25);
            color: #fca5a5;
            border-color: #ef4444;
            box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
        }
        .sb-cat-tid .sb-chip-btn.selected {
            background: rgba(245, 158, 11, 0.25);
            color: #fde68a;
            border-color: #f59e0b;
            box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
        }
        .sb-cat-rest .sb-chip-btn.selected {
            background: rgba(168, 85, 247, 0.25);
            color: #d8b4fe;
            border-color: #a855f7;
            box-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
        }

        .sb-live-box {
            background: #0f172a;
            border: 2px solid #334155;
            border-radius: 16px;
            padding: 1.4rem;
            margin-top: 1.5rem;
            text-align: center;
        }
        .sb-live-label {
            font-size: 0.8rem;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.6rem;
            font-weight: 700;
        }
        .sb-live-sentence {
            font-size: 1.35rem;
            font-weight: 800;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .grammar-word { font-weight: 800; }
        .word-substantiv { color: #4ade80; }
        .word-verbum { color: #f87171; }
        .word-tid { color: #fbbf24; }
        .word-rest { color: #c084fc; }

        .sb-listen-btn {
            background: #1e293b;
            color: #f8fafc;
            border: 1px solid #f59e0b;
            padding: 0.65rem 1.4rem;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-listen-btn:hover {
            background: rgba(245, 158, 11, 0.15);
            box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);
            transform: scale(1.03);
        }

        /* Task & Puzzle Mode */
        .sb-task-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .sb-task-pills {
            display: flex;
            gap: 0.35rem;
            flex-wrap: wrap;
        }
        .sb-task-pill {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #1e293b;
            color: #94a3b8;
            border: 1px solid #475569;
            font-size: 0.85rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        .sb-task-pill.active {
            border-color: #fbbf24;
            color: white;
            background: #d97706;
        }
        .sb-task-pill.done {
            background: #22c55e;
            color: #0f172a;
            border-color: #22c55e;
        }

        .sb-context-card {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
        }
        .sb-context-title {
            font-size: 1.05rem;
            color: #e2e8f0;
            margin-bottom: 0.8rem;
        }
        .sb-context-elements {
            display: flex;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin-bottom: 0.5rem;
        }
        .sb-context-chip {
            padding: 0.5rem 0.9rem;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.95rem;
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
        }
        .sb-context-chip.subjekt { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .sb-context-chip.verbum { background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); }
        .sb-context-chip.tid { background: rgba(245, 158, 11, 0.15); color: #fde68a; border: 1px solid rgba(245, 158, 11, 0.3); }
        .sb-context-chip.rest { background: rgba(168, 85, 247, 0.15); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.3); }
        .sb-context-chip.target-placeholder {
            background: rgba(251, 191, 36, 0.15);
            border: 2px dashed #fbbf24;
            color: #fbbf24;
            box-shadow: 0 0 12px rgba(251, 191, 36, 0.25);
        }
        .sb-context-chip.target-placeholder.chip-filled {
            background: rgba(34, 197, 94, 0.2);
            border: 2px solid #22c55e;
            color: #4ade80;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.35);
        }
        .sb-chip-role { font-size: 0.72rem; text-transform: uppercase; opacity: 0.85; }

        .sb-target-sentence-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
            border: 2px solid rgba(251, 191, 36, 0.45);
            border-radius: 14px;
            padding: 1.1rem 1.4rem;
            margin: 0.9rem 0 1.2rem 0;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .sb-target-sentence-label {
            font-size: 0.82rem;
            font-weight: 800;
            color: #fbbf24;
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
            min-width: 130px;
            padding: 0.2rem 1rem;
            border: 2px dashed #fbbf24;
            background: rgba(251, 191, 36, 0.16);
            border-radius: 8px;
            color: #fbbf24;
            font-weight: 800;
            letter-spacing: 2px;
            transition: all 0.3s ease;
            box-shadow: 0 0 14px rgba(251, 191, 36, 0.3);
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
            background: rgba(245, 158, 11, 0.08);
            border: 1px solid rgba(245, 158, 11, 0.25);
            border-radius: 12px;
            padding: 1rem 1.3rem;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .sb-question-text {
            font-size: 1.25rem;
            font-weight: 800;
            color: white;
        }
        .sb-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 0.8rem;
            margin-bottom: 1.5rem;
        }
        .sb-option-btn {
            background: #1e293b;
            color: white;
            border: 2px solid #475569;
            padding: 0.9rem 1.2rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .sb-option-btn:hover {
            border-color: #fbbf24;
            background: #334155;
            transform: translateY(-2px);
        }
        .sb-option-btn.correct {
            background: rgba(34, 197, 94, 0.25);
            border-color: #22c55e;
            color: #4ade80;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
        }
        .sb-option-btn.incorrect {
            background: rgba(239, 68, 68, 0.2);
            border-color: #ef4444;
            color: #f87171;
        }

        .sb-puzzle-section {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            animation: fadeIn 0.35s ease;
        }
        .sb-puzzle-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.4rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-puzzle-desc {
            font-size: 0.95rem;
            color: #cbd5e1;
            margin-bottom: 1.3rem;
            line-height: 1.5;
        }

        /* Ordstillings-diagram: Grafisk visning af hvor adverbiet skal stå */
        .sb-structure-diagram {
            background: rgba(15, 23, 42, 0.9);
            border-radius: 14px;
            padding: 1.1rem 1.3rem;
            margin-bottom: 1.6rem;
            border: 1.5px solid rgba(251, 191, 36, 0.3);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .structure-diagram-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 0.8rem;
            margin-bottom: 1rem;
            padding-bottom: 0.7rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .structure-diagram-badge {
            font-size: 0.82rem;
            font-weight: 800;
            padding: 0.3rem 0.85rem;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .badge-central {
            background: rgba(14, 165, 233, 0.15);
            color: #38bdf8;
            border: 1.5px solid #0ea5e9;
        }
        .badge-inversion {
            background: rgba(245, 158, 11, 0.15);
            color: #fbbf24;
            border: 1.5px solid #f59e0b;
        }
        .structure-diagram-hint {
            font-size: 0.92rem;
            color: #cbd5e1;
            font-weight: 500;
        }
        .structure-diagram-flow {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .flow-step {
            flex: 1;
            min-width: 140px;
            background: #1e293b;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 12px;
            padding: 0.7rem 0.8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.2rem;
            transition: all 0.2s ease;
        }
        .flow-step.step-subjekt { border-color: rgba(34, 197, 94, 0.4); }
        .flow-step.step-verbum { border-color: rgba(239, 68, 68, 0.4); }
        .flow-step.step-rest { border-color: rgba(168, 85, 247, 0.4); }
        .flow-step.active-target {
            background: rgba(245, 158, 11, 0.18);
            border: 2px solid #fbbf24;
            box-shadow: 0 0 18px rgba(245, 158, 11, 0.45);
            transform: scale(1.03);
        }
        .flow-num {
            font-size: 0.72rem;
            text-transform: uppercase;
            color: #94a3b8;
            font-weight: 700;
        }
        .flow-title {
            font-size: 0.95rem;
            font-weight: 800;
            color: white;
        }
        .flow-step.active-target .flow-title {
            color: #fbbf24;
        }
        .flow-target-tag {
            background: linear-gradient(135deg, #d97706, #f59e0b);
            color: #0f172a;
            font-size: 0.65rem;
            font-weight: 900;
            padding: 0.15rem 0.5rem;
            border-radius: 6px;
            margin-top: 0.25rem;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }
        .flow-arrow {
            font-size: 1.3rem;
            color: #64748b;
            font-weight: 900;
        }

        .sb-puzzle-slots {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 0.9rem;
            margin-bottom: 1.5rem;
            padding-top: 0.6rem;
        }
        .sb-puzzle-slot {
            background: #0f172a;
            border: 2px dashed #475569;
            border-radius: 14px;
            padding: 1.1rem 0.8rem 0.8rem;
            min-height: 82px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            position: relative;
        }
        .sb-puzzle-slot.slot-subjekt { border-color: rgba(34, 197, 94, 0.4); }
        .sb-puzzle-slot.slot-verbum { border-color: rgba(239, 68, 68, 0.4); }
        .sb-puzzle-slot.slot-rest { border-color: rgba(168, 85, 247, 0.4); }

        /* Tydeligt fremhævet adverbium-slot */
        .sb-puzzle-slot.target-adverbium-slot {
            border: 2.5px dashed #fbbf24;
            background: rgba(245, 158, 11, 0.12);
            box-shadow: 0 0 16px rgba(245, 158, 11, 0.35);
        }
        .sb-puzzle-slot.target-adverbium-slot.filled {
            border-style: solid;
            border-color: #fbbf24;
            background: rgba(245, 158, 11, 0.25);
            box-shadow: 0 0 22px rgba(245, 158, 11, 0.55);
        }
        .slot-target-callout {
            position: absolute;
            top: -12px;
            background: linear-gradient(135deg, #d97706, #f59e0b);
            color: #0f172a;
            font-size: 0.65rem;
            font-weight: 900;
            padding: 0.2rem 0.65rem;
            border-radius: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
            white-space: nowrap;
            z-index: 2;
        }

        .sb-puzzle-slot .slot-hint {
            font-size: 0.85rem;
            color: #cbd5e1;
            font-weight: 700;
        }
        .sb-puzzle-slot .slot-role {
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 0.2rem;
            opacity: 0.85;
            color: #94a3b8;
        }
        .sb-puzzle-slot.filled {
            border-style: solid;
            background: rgba(30, 41, 59, 0.9);
            border-color: #38bdf8;
            color: white;
            font-size: 1.15rem;
            font-weight: 800;
        }

        .sb-puzzle-chips {
            display: flex;
            gap: 0.7rem;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 1.5rem;
        }
        .sb-puzzle-chip {
            background: #1e293b;
            color: white;
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            padding: 0.65rem 1.2rem;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .sb-puzzle-chip:hover {
            background: #334155;
            border-color: #38bdf8;
            transform: translateY(-2px);
        }
        .sb-puzzle-chip.chip-is-adv {
            background: rgba(245, 158, 11, 0.18);
            border-color: #fbbf24;
            color: #fef08a;
            box-shadow: 0 0 12px rgba(245, 158, 11, 0.35);
        }
        .sb-puzzle-chip.chip-is-adv:hover {
            background: #d97706;
            color: white;
        }
        .sb-puzzle-chip.used {
            opacity: 0.25;
            pointer-events: none;
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

        /* Tab 5: Kontekst-testen (Model B) */
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
            border-bottom: 3px solid #fbbf24;
            color: #fbbf24;
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
            border-color: #fbbf24;
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
            background: rgba(245, 158, 11, 0.1);
            border: 1.5px solid #f59e0b;
            padding: 1.2rem 1.5rem;
            border-radius: 14px;
            font-size: 1.05rem;
            line-height: 1.6;
            color: #fef3c7;
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
        <h1>${getTranslation('adv_f2_hero_title')}</h1>
        <p>${getTranslation('adv_f2_hero_desc')}</p>
        <div class="adv-rule-banner">
            <div class="rule-card-mini rule-frekvens">
                <span>⏳</span>
                <span><strong>${getTranslation('adv_filter_frequency')}:</strong> ${getTranslation('adv_f2_rule_frekvens')}</span>
            </div>
            <div class="rule-card-mini rule-tidspunkt">
                <span>⏰</span>
                <span><strong>${getTranslation('adv_filter_time')}:</strong> ${getTranslation('adv_f2_rule_nuance')}</span>
            </div>
        </div>
    `;
    viewContainer.appendChild(hero);

    // Tabs Navigation
    const tabsNav = document.createElement('div');
    tabsNav.className = 'adv-tabs-nav';

    const tabsConfig = [
        { id: 'tab_vrimmel', label: `1. ${getTranslation('adv_tab_vrimmel')} (19)`, icon: '🖼️' },
        { id: 'tab_detektiv', label: `2. ${getTranslation('adv_tab_detektiv')}`, icon: '🔍' },
        { id: 'tab_barometer', label: `3. ${getTranslation('adv_tab_barometer')}`, icon: '📊' },
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
        history.pushState(null, '', '#/' + lang + '/adverbier_tid/' + tabId);
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
        } else if (currentTab === 'tab_barometer') {
            renderTabBarometer(tabContentContainer);
        } else if (currentTab === 'tab_saetning') {
            renderTabSaetning(tabContentContainer);
        } else if (currentTab === 'tab_kontekst') {
            renderTabKontekst(tabContentContainer);
        }
    }

    // ==========================================
    // TAB 1: DET INTERAKTIVE TORV & VRIMLEBILLEDE
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
            { id: 'all', label: 'Vis alle (19)' },
            { id: 'frekvens', label: '⏳ Kun Frekvens (7)' },
            { id: 'tidspunkt', label: '⏰ Kun Tidspunkt & Forløb (12)' }
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
        img.src = 'assets/adverbier_tid_vrimmel.jpg';
        img.alt = 'Livligt dansk stationstorv med tidsadverbier i aktion';
        stage.appendChild(img);

        // Pins med slankt, proportionelt format
        if (showPins) {
            ADVERBIER_TID_DATA.forEach(item => {
                if (filterMode === 'frekvens' && item.type !== 'frekvens') return;
                if (filterMode === 'tidspunkt' && item.type !== 'tidspunkt') return;

                const pin = document.createElement('div');
                pin.className = `hotspot-pin ${item.type === 'frekvens' ? 'pin-frekvens' : 'pin-tidspunkt'} ${item.id === selectedWordId ? 'active' : ''}`;
                pin.style.left = `${item.x}%`;
                pin.style.top = `${item.y}%`;

                const icon = item.type === 'frekvens' ? '⏳' : '⏰';
                pin.innerHTML = `<span class="pin-icon">${icon}</span><span class="pin-text">${item.word}</span>`;

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
        const currentWordData = ADVERBIER_TID_DATA.find(w => w.id === selectedWordId) || ADVERBIER_TID_DATA[0];
        const trans = getAdverbWordTranslation(currentWordData.id, 2);
        const transMeaning = trans?.meaning;
        const transSentence = trans?.sentence;

        const inspector = document.createElement('div');
        inspector.className = 'inspector-card';

        // Left column
        const leftCol = document.createElement('div');
        leftCol.className = 'inspector-left';

        const wordHeader = document.createElement('div');
        wordHeader.className = 'inspector-word-header';
        wordHeader.innerHTML = `
            <div class="inspector-word-title" style="display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap;">
                <span>${currentWordData.word}</span>
                ${transMeaning ? `<span class="inspector-trans-meaning" style="font-size: 1.15rem; color: #cbd5e1; font-weight: 600;">(${transMeaning})</span>` : ''}
            </div>
            <div class="adv-type-badge ${currentWordData.type === 'frekvens' ? 'badge-frekvens' : 'badge-tidspunkt'}">
                ${currentWordData.typeLabel}
            </div>
        `;
        const speakBtn = document.createElement('button');
        speakBtn.className = 'inspector-speak-btn';
        speakBtn.title = getTranslation('adv_listen_word');
        speakBtn.innerHTML = '🔊';
        speakBtn.onclick = () => speakDanish(currentWordData.word);
        wordHeader.appendChild(speakBtn);
        leftCol.appendChild(wordHeader);

        const sceneDesc = document.createElement('div');
        sceneDesc.className = 'inspector-scene-desc';
        sceneDesc.innerHTML = `<strong>På torvet:</strong> ${currentWordData.sceneDesc}`;
        leftCol.appendChild(sceneDesc);

        const sentBox = document.createElement('div');
        sentBox.className = 'inspector-sentence-box';
        sentBox.innerHTML = `
            <div class="inspector-sentence-text">
                "${currentWordData.sentence.replace(new RegExp(`\\b${currentWordData.word}\\b`, 'gi'), `<strong>${currentWordData.word}</strong>`)}"
                ${transSentence ? `<div class="inspector-trans-sentence" style="font-size: 0.95rem; color: #94a3b8; font-style: italic; margin-top: 0.35rem;">"${transSentence}"</div>` : ''}
            </div>
        `;
        const sentSpeakBtn = document.createElement('button');
        sentSpeakBtn.className = 'inspector-speak-btn';
        sentSpeakBtn.title = getTranslation('adv_listen_sentence');
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
                <div class="pair-switch-header">🔄 Tids-modpol / Sammenlign med:</div>
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
            <div style="font-weight: 800; margin-bottom: 0.4rem; color: #fbbf24;">💡 Betydning & Grammatik:</div>
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
    // TAB 2: TIDS-DETEKTIVEN (VIEWFINDER ZOOM)
    // ==========================================
    let detektivIdx = 0;
    let detektivScore = 0;
    let detektivAnswered = false;

    const DETEKTIV_MISSIONS = [
        {
            x: 44, y: 64,
            scale: 2.5,
            prompt: 'Manden i jakkesættet løber febrilsk over brostenene og kigger i panik på sit ur. Hvornår sker handlingen?',
            tag: 'Den travle mand i jakkesæt',
            options: [
                { text: 'A) Han har travlt nu', correct: true, explain: 'Korrekt! Det sker i dette præcise sekund: "nu".' },
                { text: 'B) Han har travlt før', correct: false, explain: '"Før" refererer til fortiden. Manden løber og sveder lige i dette øjeblik!' }
            ]
        },
        {
            x: 34, y: 46,
            scale: 2.6,
            prompt: 'Klokken er kun 6 om morgenen, men bagerens hylder bugner af lune rundstykker. Hvad er overraskende?',
            tag: 'Bageriets vindue',
            options: [
                { text: 'A) Bageren har allerede frisk brød klar', correct: true, explain: 'Helt rigtigt! "Allerede" bruges om noget, der sker før forventet tid.' },
                { text: 'B) Bageren har endnu frisk brød klar', correct: false, explain: '"Endnu" bruges primært med benægtelse ("ikke endnu") eller om noget der varer ved.' }
            ]
        },
        {
            x: 96, y: 47,
            scale: 2.5,
            prompt: 'Butikken på hjørnet har et skilt med "Åbner kl. 9", og døren er låst. Hvad gælder for butikken?',
            tag: 'Den lukkede butiksdør',
            options: [
                { text: 'A) Butikken er ikke åbnet endnu', correct: true, explain: 'Lige præcis! "Ikke endnu" viser, at åbningen forventes lidt senere.' },
                { text: 'B) Butikken er ikke åbnet allerede', correct: false, explain: 'På dansk siger man "ikke endnu" om det, man venter på.' }
            ]
        },
        {
            x: 59, y: 77,
            scale: 2.5,
            prompt: 'Studinen har siddet over bøgerne siden den tidlige morgen, og hun fordyber sig fortsat. Hvad gør hun?',
            tag: 'Studinen på bænken',
            options: [
                { text: 'A) Hun læser stadig på bænken', correct: true, explain: 'Korrekt! "Stadig" udtrykker kontinuitet – handlingen fortsætter uden ophør.' },
                { text: 'B) Hun læser snart på bænken', correct: false, explain: '"Snart" peger frem i tiden mod noget, der ikke er begyndt endnu.' }
            ]
        },
        {
            x: 54, y: 56,
            scale: 2.6,
            prompt: 'Vejret har lige været tørt, men nu mærker kvinden regndråber og slår paraplyen op. Hvad sker der?',
            tag: 'Kvinden med paraplyen',
            options: [
                { text: 'A) Det regner igen', correct: true, explain: 'Korrekt! En gentagelse af noget, der også skete tidligere: "igen".' },
                { text: 'B) Det regner aldrig', correct: false, explain: '"Aldrig" betyder 0% af gangene – og det regner jo lige nu!' }
            ]
        },
        {
            x: 71, y: 31,
            scale: 2.3,
            prompt: 'DSB-toget ruller frem over viadukten og nærmer sig perronen. Hvornår stopper det?',
            tag: 'Toget på viadukten',
            options: [
                { text: 'A) Toget ankommer snart', correct: true, explain: 'Flot! "Snart" viser, at toget når perronen om ganske få øjeblikke.' },
                { text: 'B) Toget ankommer længe', correct: false, explain: '"Længe" angiver en tidslængde/varighed, ikke et tidspunkt.' }
            ]
        },
        {
            x: 88, y: 84,
            scale: 2.4,
            prompt: 'Den ældre herre sidder roligt og mindes torvets udseende i 1950 med et gammelt foto. Hvad viser billedet?',
            tag: 'Manden med fotografiet',
            options: [
                { text: 'A) Billedet viser torvet, som det så ud før', correct: true, explain: 'Rigtigt! "Før" refererer til et tidligere tidspunkt i fortiden.' },
                { text: 'B) Billedet viser torvet, som det ser ud bagefter', correct: false, explain: '"Bagefter" peger frem mod efterfølgende trin i en rækkefølge.' }
            ]
        },
        {
            x: 80, y: 66,
            scale: 2.4,
            prompt: 'Cyklisten i neontøj pendler på denne rute 4 ud af 5 hverdage hver uge. Hvor tit cykler han?',
            tag: 'Cyklisten i neongul jakke',
            options: [
                { text: 'A) Han cykler ofte på denne rute', correct: true, explain: 'Korrekt! 4 ud af 5 dage er høj hyppighed: "ofte" (eller "tit").' },
                { text: 'B) Han cykler sjældent på denne rute', correct: false, explain: '"Sjældent" ville betyde f.eks. kun én gang om måneden.' }
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
        img.src = 'assets/adverbier_tid_vrimmel.jpg';
        img.style.transformOrigin = `${mission.x}% ${mission.y}%`;
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
                <h2 style="font-size: 2.2rem; margin-bottom: 0.8rem; color: white;">Fremragende tids-detektiv!</h2>
                <p style="font-size: 1.2rem; color: #94a3b8; margin-bottom: 1.5rem;">
                    Du gennemførte alle 8 missioner og opnåede <strong>${detektivScore} af ${DETEKTIV_MISSIONS.length * 10} point</strong>!
                </p>
                <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; border-radius: 14px; padding: 1.2rem; max-width: 600px; margin: 0 auto 2rem; color: #fef3c7; text-align: left; line-height: 1.6;">
                    <strong>Hovedpointer du har trænet:</strong><br>
                    • <em>Allerede</em> bruges om noget uventet tidligt.<br>
                    • <em>Ikke endnu</em> bruges når man stadig venter på handlingen.<br>
                    • <em>Stadig</em> viser at en handling fortsætter uden stop.<br>
                    • <em>Før</em> ser bagud i tiden, mens <em>bagefter</em> ser fremad i rækkefølgen.
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
    // TAB 3: FREKVENS-BAROMETRET & TIDSLINJEN (INTERAKTIVE ØVELSER)
    // ==========================================
    const FREQUENCY_STEPS = [
        { percent: '100%', word: 'altid', label: 'Hver evig eneste gang uden undtagelse' },
        { percent: '75%', word: 'ofte / tit', label: 'Mange gange / stor hyppighed' },
        { percent: '50%', word: 'sommetider', label: 'Nogle gange / af og til' },
        { percent: '20%', word: 'sjældent', label: 'Få gange / næsten aldrig' },
        { percent: '0%', word: 'aldrig', label: 'På intet tidspunkt overhovedet' }
    ];

    // Tab 3 State
    let ladderPlaced = { '100%': null, '75%': null, '50%': null, '20%': null, '0%': null };
    let selectedLadderWord = null;

    let timelinePlaced = [null, null, null]; // 0: Før, 1: Nu, 2: Bagefter
    let selectedTimelineWord = null;
    const TIMELINE_WORDS = ['Før', 'Nu', 'Bagefter'];

    function renderTabBarometer(parent) {
        const container = document.createElement('div');
        container.className = 'barometer-container';

        const intro = document.createElement('div');
        intro.className = 'barometer-intro';
        intro.innerHTML = `
            <h2>📊 Frekvens-Trappen & Tidslinjen</h2>
            <p>Træn dine tidsadverbier med to interaktive øvelser: Frekvensskalaen fra 100% til 0% og den kronologiske tidslinje!</p>
        `;
        container.appendChild(intro);

        // ==========================================
        // ØVELSE 1: FREKVENS-TRAPPEN (100% - 0%)
        // ==========================================
        const ladderCard = document.createElement('div');
        ladderCard.className = 'barometer-exercise-card';
        ladderCard.innerHTML = `
            <div class="barometer-card-title">
                <span>🪜</span> Øvelse 1: Frekvens-Trappen (100% til 0%)
            </div>
            <div class="barometer-card-desc">
                Klik på et ord i puljen nedenfor, og klik derefter på det matchende trin på trappen:
            </div>
        `;

        const ladder = document.createElement('div');
        ladder.className = 'frequency-ladder';

        FREQUENCY_STEPS.forEach(step => {
            const row = document.createElement('div');
            const isFilled = ladderPlaced[step.percent] !== null;
            row.className = `ladder-step ${isFilled ? 'filled' : ''}`;

            const percentEl = document.createElement('div');
            percentEl.className = 'ladder-percent';
            percentEl.textContent = step.percent;
            row.appendChild(percentEl);

            const labelEl = document.createElement('div');
            labelEl.className = 'ladder-label';
            labelEl.textContent = step.label;
            row.appendChild(labelEl);

            const slotEl = document.createElement('div');
            slotEl.className = `ladder-target-slot ${isFilled ? 'filled' : 'empty'}`;
            slotEl.innerHTML = isFilled ? `${ladderPlaced[step.percent]} 🔊` : 'Klik for at placere';

            slotEl.onclick = () => {
                if (isFilled) {
                    // Click filled slot to remove back to pool
                    ladderPlaced[step.percent] = null;
                    renderTabBarometer(parent);
                } else if (selectedLadderWord) {
                    // Try to place selected word
                    handleLadderPlacement(step, ladderFeedback);
                }
            };

            row.appendChild(slotEl);
            ladder.appendChild(row);
        });
        ladderCard.appendChild(ladder);

        // Ladder Chips Pool
        const ladderPoolBox = document.createElement('div');
        ladderPoolBox.className = 'barometer-pool-box';

        const placedWords = Object.values(ladderPlaced).filter(Boolean);
        const ladderRemaining = FREQUENCY_STEPS.map(s => s.word).filter(w => !placedWords.includes(w));

        ladderPoolBox.innerHTML = `
            <div class="barometer-pool-title">
                Ord der skal placeres (${ladderRemaining.length} tilbage):
            </div>
            <div class="barometer-chips-grid" id="ladder-chips-grid"></div>
        `;

        const ladderChipsGrid = ladderPoolBox.querySelector('#ladder-chips-grid');
        FREQUENCY_STEPS.forEach(s => {
            const btn = document.createElement('button');
            const isUsed = placedWords.includes(s.word);
            const isSelected = selectedLadderWord === s.word;
            btn.className = `barometer-chip-btn ${isUsed ? 'used' : ''} ${isSelected ? 'selected' : ''}`;
            btn.textContent = s.word;

            btn.onclick = () => {
                if (isUsed) return;
                selectedLadderWord = s.word;
                speakDanish(s.word);
                renderTabBarometer(parent);
            };

            ladderChipsGrid.appendChild(btn);
        });
        ladderCard.appendChild(ladderPoolBox);

        // Ladder Feedback & Reset
        const ladderFeedback = document.createElement('div');
        ladderFeedback.className = 'barometer-feedback-box';
        const allLadderDone = Object.values(ladderPlaced).every(Boolean);

        if (allLadderDone) {
            ladderFeedback.className = 'barometer-feedback-box correct';
            ladderFeedback.innerHTML = `
                <span>🎉 Fantastisk! Du har placeret alle 5 frekvenstrin 100% korrekt!</span>
                <button class="reset-slots-btn" id="reset-ladder-btn" style="color: white; border-color: white;">↺ Start forfra</button>
            `;
        } else if (selectedLadderWord) {
            ladderFeedback.innerHTML = `
                <span style="color: #fbbf24;">Valgt ord: <strong>"${selectedLadderWord}"</strong>. Klik nu på det rigtige procent-trin ovenfor!</span>
            `;
        } else {
            ladderFeedback.innerHTML = `
                <span style="color: #94a3b8;">Vælg et ord i puljen for at komme i gang.</span>
            `;
        }
        ladderCard.appendChild(ladderFeedback);

        if (ladderFeedback.querySelector('#reset-ladder-btn')) {
            ladderFeedback.querySelector('#reset-ladder-btn').onclick = () => {
                ladderPlaced = { '100%': null, '75%': null, '50%': null, '20%': null, '0%': null };
                selectedLadderWord = null;
                renderTabBarometer(parent);
            };
        }

        container.appendChild(ladderCard);

        function handleLadderPlacement(targetStep, feedbackEl) {
            if (selectedLadderWord === targetStep.word) {
                ladderPlaced[targetStep.percent] = selectedLadderWord;
                speakDanish(selectedLadderWord);
                selectedLadderWord = null;
                renderTabBarometer(parent);
            } else {
                feedbackEl.className = 'barometer-feedback-box wrong';
                feedbackEl.innerHTML = `
                    <span>💡 Prøv igen: <strong>"${selectedLadderWord}"</strong> passer ikke til ${targetStep.percent}. Læs beskrivelsen!</span>
                `;
            }
        }

        // ==========================================
        // ØVELSE 2: TIDSLINJEN (FØR ➔ NU ➔ BAGEFTER)
        // ==========================================
        const timelineCard = document.createElement('div');
        timelineCard.className = 'barometer-exercise-card';
        timelineCard.innerHTML = `
            <div class="barometer-card-title">
                <span>⏰</span> Øvelse 2: Tidslinjen – Kronologisk rækkefølge
            </div>
            <div class="barometer-card-desc">
                Sortér de tre tidsmarkører i den rigtige rækkefølge fra fortid til fremtid:
            </div>
            <div style="background: rgba(15, 23, 42, 0.6); padding: 0.9rem 1.2rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #38bdf8; font-size: 1rem; color: #cbd5e1;">
                <em>"<strong>_____</strong> spiste vi morgenmad. Lige <strong>_____</strong> cykler vi, og <strong>_____</strong> skal vi arbejde."</em>
            </div>
        `;

        const timelineSlots = document.createElement('div');
        timelineSlots.className = 'timeline-slots-grid';

        const TIMELINE_SLOT_CONFIG = [
            { idx: 0, target: 'Før', label: '1. Fortid (hvad skete tidligere?)' },
            { idx: 1, target: 'Nu', label: '2. Nutid (lige i dette øjeblik)' },
            { idx: 2, target: 'Bagefter', label: '3. Næste skridt (efterfølgende)' }
        ];

        TIMELINE_SLOT_CONFIG.forEach(slotConf => {
            const slotBox = document.createElement('div');
            const val = timelinePlaced[slotConf.idx];
            slotBox.className = `timeline-slot-box ${val ? 'filled' : ''}`;
            slotBox.innerHTML = `
                <div class="timeline-slot-role">${slotConf.label}</div>
                <div class="timeline-slot-value">${val ? `${val} 🔊` : '<span style="color: #64748b; font-style: italic; font-size: 0.9rem;">Klik for at placere</span>'}</div>
            `;

            slotBox.onclick = () => {
                if (val) {
                    timelinePlaced[slotConf.idx] = null;
                    renderTabBarometer(parent);
                } else if (selectedTimelineWord) {
                    if (selectedTimelineWord === slotConf.target) {
                        timelinePlaced[slotConf.idx] = selectedTimelineWord;
                        speakDanish(selectedTimelineWord);
                        selectedTimelineWord = null;
                        renderTabBarometer(parent);
                    } else {
                        timelineFeedback.className = 'barometer-feedback-box wrong';
                        timelineFeedback.innerHTML = `
                            <span>💡 Prøv igen: <strong>"${selectedTimelineWord}"</strong> passer ikke til ${slotConf.label}.</span>
                        `;
                    }
                }
            };

            timelineSlots.appendChild(slotBox);
        });
        timelineCard.appendChild(timelineSlots);

        // Timeline Chips Pool
        const timelinePoolBox = document.createElement('div');
        timelinePoolBox.className = 'barometer-pool-box';

        const timelineRemaining = TIMELINE_WORDS.filter(w => !timelinePlaced.includes(w));
        timelinePoolBox.innerHTML = `
            <div class="barometer-pool-title">
                Tidsbrikker (${timelineRemaining.length} tilbage):
            </div>
            <div class="barometer-chips-grid" id="timeline-chips-grid"></div>
        `;

        const timelineGrid = timelinePoolBox.querySelector('#timeline-chips-grid');
        TIMELINE_WORDS.forEach(word => {
            const btn = document.createElement('button');
            const isUsed = timelinePlaced.includes(word);
            const isSelected = selectedTimelineWord === word;
            btn.className = `barometer-chip-btn ${isUsed ? 'used' : ''} ${isSelected ? 'selected' : ''}`;
            btn.textContent = word;

            btn.onclick = () => {
                if (isUsed) return;
                selectedTimelineWord = word;
                speakDanish(word);
                renderTabBarometer(parent);
            };

            timelineGrid.appendChild(btn);
        });
        timelineCard.appendChild(timelinePoolBox);

        // Timeline Feedback
        const timelineFeedback = document.createElement('div');
        timelineFeedback.className = 'barometer-feedback-box';
        const allTimelineDone = timelinePlaced.every(Boolean);

        if (allTimelineDone) {
            timelineFeedback.className = 'barometer-feedback-box correct';
            timelineFeedback.innerHTML = `
                <span>🎉 Rigtigt! "Før spiste vi morgenmad. Lige nu cykler vi, og bagefter skal vi arbejde."</span>
                <button class="reset-slots-btn" id="reset-timeline-btn" style="color: white; border-color: white;">↺ Start forfra</button>
            `;
            speakDanish("Før spiste vi morgenmad. Lige nu cykler vi, og bagefter skal vi arbejde.");
        } else if (selectedTimelineWord) {
            timelineFeedback.innerHTML = `
                <span style="color: #38bdf8;">Valgt ord: <strong>"${selectedTimelineWord}"</strong>. Klik på det rigtige trin på tidslinjen ovenfor!</span>
            `;
        } else {
            timelineFeedback.innerHTML = `
                <span style="color: #94a3b8;">Vælg en tidsbrik for at placere den i kronologisk orden.</span>
            `;
        }
        timelineCard.appendChild(timelineFeedback);

        if (timelineFeedback.querySelector('#reset-timeline-btn')) {
            timelineFeedback.querySelector('#reset-timeline-btn').onclick = () => {
                timelinePlaced = [null, null, null];
                selectedTimelineWord = null;
                renderTabBarometer(parent);
            };
        }

        container.appendChild(timelineCard);

        parent.innerHTML = '';
        parent.appendChild(container);
    }

    // ==========================================
    // TAB 4: SÆTNINGSBYGGEREN (UDFORSK & OPGAVE/PUSLESPIL)
    // ==========================================
    let currentTidSubTab = 'free'; // 'free' or 'challenge'
    let currentTidChallengeIdx = 0;
    const completedTidChallenges = new Set();

    const TID_FREE_CATEGORIES = [
        {
            id: 'subjekt',
            title: '1. Hvem eller hvad taler vi om?',
            role: 'Subjekt',
            catClass: 'sb-cat-subjekt',
            badgeClass: 'badge-cat-subjekt',
            icon: '👤',
            options: ['Peter', 'Bussen', 'Toget', 'Vi', 'Manden', 'Hun', 'Bageren', 'Familien']
        },
        {
            id: 'verbum',
            title: '2. Hvad laver personen eller tingen?',
            role: 'Verbum (Handling)',
            catClass: 'sb-cat-verbum',
            badgeClass: 'badge-cat-verbum',
            icon: '⚡',
            options: ['spiser', 'ankommer', 'cykler', 'drikker kaffe', 'kører', 'arbejder', 'venter', 'smiler']
        },
        {
            id: 'tid',
            title: '3. Hvor tit eller hvornår sker det?',
            role: 'Tidsadverbium',
            catClass: 'sb-cat-tid',
            badgeClass: 'badge-cat-tid',
            icon: '⏰',
            options: ['nu', 'altid', 'aldrig', 'ofte', 'tit', 'snart', 'stadig', 'igen', 'straks', 'bagefter']
        },
        {
            id: 'rest',
            title: '4. Hvad er resten af situationen?',
            role: 'Restled / Objekt',
            catClass: 'sb-cat-rest',
            badgeClass: 'badge-cat-rest',
            icon: '📍',
            options: ['frokost', 'til stationen', 'på arbejde', 'om morgenen', 'i byen', 'på bænken', 'i dag', 'med venner']
        }
    ];

    const TID_CHALLENGE_TASKS = [
        {
            context: 'Bageren er glad og hilser på alle naboer hver evig eneste morgen.',
            subjekt: 'Bageren',
            verbum: 'smiler',
            rest: 'til naboerne',
            questionPrompt: 'Hvilket tidsadverbium betyder 100% af gangene (hver dag uden undtagelse)?',
            correctAdv: 'altid',
            distractors: ['aldrig', 'sjældent', 'nu'],
            pedagogyNote: '"Altid" angiver 100% frekvens og står lige efter verbet som centraladverbium.',
            advWord: 'altid',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Normal ordstilling: Adverbiet står som centraladverbium',
            structureNote: 'I en almindelig sætning står tidsadverbiet "altid" som centraladverbium på plads 3 lige efter verbet.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Tidsadverbium', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'Her skal adverbiet stå!' },
                { num: '4. plads', title: 'Restled', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem?', '2. Handling?', '3. Hvor tit? ⭐', '4. Til hvem?'],
            roles: ['[Subjekt]', '[Verbum]', '[Tidsadverbium]', '[Restled]'],
            chips: ['Bageren', 'smiler', 'altid', 'til naboerne'],
            correctSentence: ['Bageren', 'smiler', 'altid', 'til naboerne']
        },
        {
            context: 'Klokken er 12, og Peter skal have mad i en fart.',
            subjekt: 'Peter',
            verbum: 'spiser',
            rest: 'frokost',
            questionPrompt: 'Hvilket tidsadverbium angiver "lige i dette øjeblik" og starter sætningen med fokus?',
            correctAdv: 'Nu',
            distractors: ['Aldrig', 'I går', 'Sjældent'],
            pedagogyNote: 'Inversion (V2-reglen): Når tidsadverbiet "Nu" står forrest på 1. plads, rykker verbet "spiser" ind på 2. pladsen før subjektet "Peter"!',
            advWord: 'Nu',
            advSlotIndex: 0,
            structureType: 'inversion',
            structureTitle: 'Inversion: Tidsadverbiet "Nu" står forrest på 1. plads',
            structureNote: 'Når tidsadverbiet "Nu" står på 1. plads, skal verbet stå på 2. pladsen før subjektet (V2-reglen)!',
            flowSteps: [
                { num: '1. plads', title: 'Tidsadverbium (Fokus)', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'Her skal adverbiet stå!' },
                { num: '2. plads', title: 'Verbum (V2)', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '4. plads', title: 'Objekt', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvornår (Fokus) ⭐', '2. Handling (V2)', '3. Hvem?', '4. Hvad?'],
            roles: ['[Tidsadverbium]', '[Verbum - V2]', '[Subjekt]', '[Objekt]'],
            chips: ['Nu', 'spiser', 'Peter', 'frokost'],
            correctSentence: ['Nu', 'spiser', 'Peter', 'frokost']
        },
        {
            context: 'Familien elsker at cykle og har slet ikke nogen bil.',
            subjekt: 'De',
            verbum: 'kører',
            rest: 'i bil',
            questionPrompt: 'Hvilket tidsadverbium angiver 0% af gangene (på intet tidspunkt)?',
            correctAdv: 'aldrig',
            distractors: ['altid', 'ofte', 'snart'],
            pedagogyNote: '"Aldrig" angiver 0% frekvens og fungerer som benægtelse på centraladverbiets plads.',
            advWord: 'aldrig',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Normal ordstilling: "Aldrig" på centraladverbiets plads',
            structureNote: '"Aldrig" angiver 0% og har præcis samme faste plads som "ikke" (plads 3 lige efter verbet).',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Tidsadverbium', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'Her skal adverbiet stå!' },
                { num: '4. plads', title: 'Præposition', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem?', '2. Handling?', '3. Hvor tit? ⭐', '4. Hvordan?'],
            roles: ['[Subjekt]', '[Verbum]', '[Tidsadverbium]', '[Præposition]'],
            chips: ['De', 'kører', 'aldrig', 'i bil'],
            correctSentence: ['De', 'kører', 'aldrig', 'i bil']
        },
        {
            context: 'Passagererne står på perronen, og toget ruller ind om et øjeblik.',
            subjekt: 'Toget',
            verbum: 'ankommer',
            rest: 'til stationen',
            questionPrompt: 'Hvilket tidsadverbium viser, at noget sker om ganske kort tid (nær fremtid)?',
            correctAdv: 'snart',
            distractors: ['længe', 'før', 'aldrig'],
            pedagogyNote: '"Snart" angiver nær fremtid (inden for kort tid).',
            advWord: 'snart',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Normal ordstilling: Tidsadverbiet "snart" på plads 3',
            structureNote: '"Snart" placeres som centraladverbium mellem verbet og præpositionsleddet.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Tidsadverbium', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'Her skal adverbiet stå!' },
                { num: '4. plads', title: 'Hvorhen?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvad?', '2. Handling?', '3. Hvornår? ⭐', '4. Hvorhen?'],
            roles: ['[Subjekt]', '[Verbum]', '[Tidsadverbium]', '[Præposition]'],
            chips: ['Toget', 'ankommer', 'snart', 'til stationen'],
            correctSentence: ['Toget', 'ankommer', 'snart', 'til stationen']
        },
        {
            context: 'Mette drikker kaffe først, og derefter skal hun cykle på arbejde.',
            subjekt: 'Mette',
            verbum: 'cykler',
            rest: 'på arbejde',
            questionPrompt: 'Hvilket tidsadverbium viser rækkefølgen ("efter kaffen") og starter sætningen med fokus?',
            correctAdv: 'Bagefter',
            distractors: ['Før', 'Aldrig', 'Altid'],
            pedagogyNote: 'V2-reglen! Med tidsadverbiet "Bagefter" forrest på 1. plads SKAL verbet "cykler" stå på 2. pladsen før subjektet "Mette".',
            advWord: 'Bagefter',
            advSlotIndex: 0,
            structureType: 'inversion',
            structureTitle: 'Inversion: Tidsadverbiet "Bagefter" står forrest på 1. plads',
            structureNote: 'Når tidsadverbiet "Bagefter" starter sætningen, rykker verbet "cykler" frem på 2. pladsen!',
            flowSteps: [
                { num: '1. plads', title: 'Tidsadverbium (Fokus)', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'Her skal adverbiet stå!' },
                { num: '2. plads', title: 'Verbum (V2)', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '4. plads', title: 'Præposition', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvornår (Fokus) ⭐', '2. Handling (V2)', '3. Hvem?', '4. Hvorhen?'],
            roles: ['[Tidsadverbium]', '[Verbum - V2]', '[Subjekt]', '[Præposition]'],
            chips: ['Bagefter', 'cykler', 'Mette', 'på arbejde'],
            correctSentence: ['Bagefter', 'cykler', 'Mette', 'på arbejde']
        },
        {
            context: 'Klokken er 18, og Sara sidder ufortrødent med sin spændende bog.',
            subjekt: 'Sara',
            verbum: 'læser',
            rest: 'i bogen',
            questionPrompt: 'Hvilket tidsadverbium viser, at handlingen fortsætter uafbrudt fra før?',
            correctAdv: 'stadig',
            distractors: ['snart', 'før', 'endnu'],
            pedagogyNote: '"Stadig" udtrykker kontinuitet – handlingen startede i fortiden og fortsætter lige nu.',
            advWord: 'stadig',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Normal ordstilling: Tidsadverbiet "stadig" på plads 3',
            structureNote: '"Stadig" udtrykker fortsat handling og placeres som centraladverbium lige efter verbet.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Tidsadverbium', icon: '⭐', type: 'adverbium', isTarget: true, tag: 'Her skal adverbiet stå!' },
                { num: '4. plads', title: 'Hvad?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem?', '2. Handling?', '3. Tidsnuance? ⭐', '4. Hvad?'],
            roles: ['[Subjekt]', '[Verbum]', '[Tidsadverbium]', '[Præposition]'],
            chips: ['Sara', 'læser', 'stadig', 'i bogen'],
            correctSentence: ['Sara', 'læser', 'stadig', 'i bogen']
        }
    ];

    let currentTidFreeSelected = ['Peter', 'spiser', 'nu', 'frokost'];

    function renderTabSaetning(parent) {
        const container = document.createElement('div');
        container.className = 'sentence-builder-card';

        // Sub Navigation: 1. Udforsk & Byg selv vs 2. Opgave & Puslespil
        const subNav = document.createElement('div');
        subNav.className = 'sb-sub-nav';

        const subTab1Btn = document.createElement('button');
        subTab1Btn.className = `sb-sub-btn ${currentTidSubTab === 'free' ? 'active' : ''}`;
        subTab1Btn.innerHTML = `<span>🎨</span> 1. Udforsk & Byg selv`;

        const subTab2Btn = document.createElement('button');
        subTab2Btn.className = `sb-sub-btn ${currentTidSubTab === 'challenge' ? 'active' : ''}`;
        subTab2Btn.innerHTML = `<span>🧩</span> 2. Opgave & Puslespil`;

        subNav.appendChild(subTab1Btn);
        subNav.appendChild(subTab2Btn);
        container.appendChild(subNav);

        const freeContainer = document.createElement('div');
        freeContainer.style.display = currentTidSubTab === 'free' ? 'block' : 'none';

        const challengeContainer = document.createElement('div');
        challengeContainer.style.display = currentTidSubTab === 'challenge' ? 'block' : 'none';

        container.appendChild(freeContainer);
        container.appendChild(challengeContainer);

        subTab1Btn.onclick = () => {
            currentTidSubTab = 'free';
            subTab1Btn.classList.add('active');
            subTab2Btn.classList.remove('active');
            freeContainer.style.display = 'block';
            challengeContainer.style.display = 'none';
        };

        subTab2Btn.onclick = () => {
            currentTidSubTab = 'challenge';
            subTab2Btn.classList.add('active');
            subTab1Btn.classList.remove('active');
            freeContainer.style.display = 'none';
            challengeContainer.style.display = 'block';
            setupChallengeSection();
        };

        // ==========================================
        // SUB-TAB 1: UDFORSK & BYG SELV
        // ==========================================
        function setupFreeBuilder() {
            freeContainer.innerHTML = `
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.7rem; color: white; margin-bottom: 0.4rem;">Byg dine egne sætninger med tidsadverbier</h3>
                    <p style="color: #94a3b8; font-size: 1.05rem; max-width: 650px; margin: 0 auto;">
                        Vælg ét element fra hver række herunder. Læg mærke til hjælpespørgsmålene, og lyt til hvordan sætningen lyder!
                    </p>
                </div>

                <div class="grammar-legend-bar">
                    <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> 1. Hvem (Subjekt)</div>
                    <div class="grammar-legend-item"><span class="legend-chip chip-verbum"></span> 2. Handling (Verbum)</div>
                    <div class="grammar-legend-item"><span class="legend-chip chip-tid"></span> 3. Hvornår / Hvor tit (Tid)</div>
                    <div class="grammar-legend-item"><span class="legend-chip chip-rest"></span> 4. Resten (Objekt / Præposition)</div>
                </div>

                <div id="tid-free-builder-rows"></div>

                <div class="sb-live-box">
                    <div class="sb-live-label">Din samlede sætning</div>
                    <div class="sb-live-sentence" id="tid-free-live-sentence"></div>
                    <button class="sb-listen-btn" id="tid-free-listen-btn">
                        <span>🔊</span> Hør udtale
                    </button>
                </div>
            `;

            const rowsContainer = freeContainer.querySelector('#tid-free-builder-rows');
            const liveSentenceEl = freeContainer.querySelector('#tid-free-live-sentence');
            const listenBtn = freeContainer.querySelector('#tid-free-listen-btn');

            function updateLiveSentence() {
                liveSentenceEl.innerHTML = `
                    <span class="grammar-word word-substantiv">${currentTidFreeSelected[0]}</span>
                    <span class="grammar-word word-verbum">${currentTidFreeSelected[1]}</span>
                    <span class="grammar-word word-tid">${currentTidFreeSelected[2]}</span>
                    <span class="grammar-word word-rest">${currentTidFreeSelected[3]}</span>.
                `;
            }

            listenBtn.onclick = () => {
                speakDanish(`${currentTidFreeSelected[0]} ${currentTidFreeSelected[1]} ${currentTidFreeSelected[2]} ${currentTidFreeSelected[3]}`);
            };

            TID_FREE_CATEGORIES.forEach((cat, catIdx) => {
                const row = document.createElement('div');
                row.className = `sb-category-row ${cat.catClass}`;
                row.innerHTML = `
                    <div class="sb-category-header">
                        <div class="sb-category-title">
                            <span>${cat.icon}</span> ${cat.title}
                        </div>
                        <span class="sb-category-badge ${cat.badgeClass}">${cat.role}</span>
                    </div>
                    <div class="sb-chips-grid"></div>
                `;

                const grid = row.querySelector('.sb-chips-grid');
                cat.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = `sb-chip-btn ${currentTidFreeSelected[catIdx] === opt ? 'selected' : ''}`;
                    btn.textContent = opt;

                    btn.onclick = () => {
                        currentTidFreeSelected[catIdx] = opt;
                        grid.querySelectorAll('.sb-chip-btn').forEach(b => b.classList.remove('selected'));
                        btn.classList.add('selected');
                        updateLiveSentence();
                        speakDanish(opt);
                    };
                    grid.appendChild(btn);
                });

                rowsContainer.appendChild(row);
            });

            updateLiveSentence();
        }

        // ==========================================
        // SUB-TAB 2: OPGAVE & PUSLESPIL
        // ==========================================
        function setupChallengeSection() {
            challengeContainer.innerHTML = '';
            const task = TID_CHALLENGE_TASKS[currentTidChallengeIdx];

            // Task header with numbered navigation pills
            const header = document.createElement('div');
            header.className = 'sb-task-header';

            const titleDiv = document.createElement('div');
            titleDiv.innerHTML = `
                <div style="font-size: 0.85rem; color: #fbbf24; font-weight: 800; text-transform: uppercase;">
                    Udfordring ${currentTidChallengeIdx + 1} af ${TID_CHALLENGE_TASKS.length}
                </div>
                <h3 style="font-size: 1.5rem; color: white; margin: 0.2rem 0;">Vælg adverbiet & saml puslespillet</h3>
            `;
            header.appendChild(titleDiv);

            const pills = document.createElement('div');
            pills.className = 'sb-task-pills';
            TID_CHALLENGE_TASKS.forEach((_, idx) => {
                const pill = document.createElement('div');
                pill.className = `sb-task-pill ${idx === currentTidChallengeIdx ? 'active' : ''} ${completedTidChallenges.has(idx) ? 'done' : ''}`;
                pill.textContent = idx + 1;
                pill.onclick = () => {
                    currentTidChallengeIdx = idx;
                    setupChallengeSection();
                };
                pills.appendChild(pill);
            });
            header.appendChild(pills);
            challengeContainer.appendChild(header);

            // Step 1: Context card with visual sentence preview (with target blank) and 4 question chips
            const contextCard = document.createElement('div');
            contextCard.className = 'sb-context-card';

            // Build target sentence preview with highlighted blank slot for the adverb
            const sentenceHtml = task.correctSentence.map((word, idx) => {
                if (idx === task.advSlotIndex) {
                    return `<span class="sb-sentence-blank" id="sb-live-adv-blank">________</span>`;
                }
                const isLast = (idx === task.correctSentence.length - 1);
                return `<span class="sb-sentence-word">${word}${isLast ? '.' : ''}</span>`;
            }).join(' ');

            // Build helper question chips (all 4 elements including the target adverb slot!)
            const chipsHtml = task.correctSentence.map((word, idx) => {
                const step = task.flowSteps[idx];
                const slotLabel = task.slots[idx];
                if (idx === task.advSlotIndex) {
                    return `
                        <div class="sb-context-chip tid target-placeholder" id="sb-context-chip-adv">
                            <span class="sb-chip-role">${slotLabel}</span>
                            <span id="sb-chip-adv-val" style="font-weight: 800; letter-spacing: 2px;">________</span>
                        </div>
                    `;
                }
                const chipType = (step.type === 'adverbium') ? 'tid' : step.type;
                return `
                    <div class="sb-context-chip ${chipType}">
                        <span class="sb-chip-role">${slotLabel}</span>
                        <span>${word}</span>
                    </div>
                `;
            }).join('');

            contextCard.innerHTML = `
                <div class="sb-context-title">📍 <em>${task.context}</em></div>
                <div class="sb-context-elements" style="margin-bottom: 1rem;">
                    ${chipsHtml}
                </div>
                <div class="sb-target-sentence-card">
                    <div class="sb-target-sentence-label">Sætning med tom plads til tidsadverbiet:</div>
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
                <div style="font-size: 0.85rem; color: #fbbf24; font-weight: 700; text-transform: uppercase; margin-bottom: 0.3rem;">
                    Trin 1: Vælg det rigtige tidsadverbium
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
                                    <strong style="color: #4ade80; font-size: 1.15rem;">🎉 Rigtigt tidsadverbium!</strong>
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
                        renderTidPuzzleStep(puzzleContainer, task);
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
        function renderTidPuzzleStep(puzContainer, task) {
            const isInv = task.structureType === 'inversion';

            puzContainer.innerHTML = `
                <div class="sb-puzzle-title">
                    <span>🧩</span> Trin 2: Puslespillet – Saml hele sætningen!
                </div>
                <div class="sb-puzzle-desc">
                    Læg mærke til den fremhævede plads med <strong>⭐</strong> – der skal adverbiet placeres. Klik på brikkerne i den rigtige rækkefølge:
                </div>

                <!-- Grafisk ordstillings-guide: Viser præcis hvor i sætningen adverbiet står -->
                <div class="sb-structure-diagram">
                    <div class="structure-diagram-header">
                        <span class="structure-diagram-badge ${isInv ? 'badge-inversion' : 'badge-central'}">
                            ${isInv ? '⚡ INVERSION (Tidsadverbium forrest på 1. plads)' : '📌 NORMAL ORDSTILLING (Centraladverbium på 3. plads)'}
                        </span>
                        <span class="structure-diagram-hint">${task.structureNote}</span>
                    </div>
                    <div class="structure-diagram-flow">
                        ${task.flowSteps.map((step, sIdx) => `
                            <div class="flow-step ${step.isTarget ? 'active-target' : 'step-' + step.type}">
                                <div style="font-size: 1.25rem;">${step.icon}</div>
                                <div class="flow-num">${step.num}</div>
                                <div class="flow-title">${step.title}</div>
                                ${step.isTarget ? '<div class="flow-target-tag">HER STÅR ADVERBIET!</div>' : ''}
                            </div>
                            ${sIdx < task.flowSteps.length - 1 ? '<div class="flow-arrow">➔</div>' : ''}
                        `).join('')}
                    </div>
                </div>

                <div class="sb-puzzle-slots" id="tid-puzzle-slots-grid"></div>
                <div class="sb-puzzle-chips" id="tid-puzzle-chips-pool"></div>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <button class="reset-slots-btn" id="tid-puzzle-reset-btn">↺ Nulstil brikker</button>
                    <div id="tid-puzzle-status" style="font-weight: 700; color: #22c55e;"></div>
                </div>
            `;

            const slotsGrid = puzContainer.querySelector('#tid-puzzle-slots-grid');
            const chipsPool = puzContainer.querySelector('#tid-puzzle-chips-pool');
            const resetBtn = puzContainer.querySelector('#tid-puzzle-reset-btn');
            const statusEl = puzContainer.querySelector('#tid-puzzle-status');

            let placedWords = [];
            const shuffledChips = [...task.chips].sort(() => Math.random() - 0.5);

            function updatePuzzleUI() {
                slotsGrid.innerHTML = '';
                task.slots.forEach((slotLabel, idx) => {
                    const slot = document.createElement('div');
                    const isAdvSlot = (idx === task.advSlotIndex);
                    const isFilled = Boolean(placedWords[idx]);
                    const roleType = task.flowSteps[idx].type;

                    slot.className = `sb-puzzle-slot ${isFilled ? 'filled' : ''} ${isAdvSlot ? 'target-adverbium-slot' : 'slot-' + roleType}`;

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
                        if (isAdvSlot) wordSpan.style.color = '#fbbf24';
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
                        if (isAdvSlot) hintSpan.style.color = '#fbbf24';
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
                        completedTidChallenges.add(currentTidChallengeIdx);
                        statusEl.innerHTML = `
                            <span style="color: #22c55e; margin-right: 1rem;">🎉 Perfekt samlet!</span>
                            <button class="detektiv-next-btn" style="display: inline-block; padding: 0.6rem 1.4rem;" id="tid-task-next-btn">
                                ${currentTidChallengeIdx < TID_CHALLENGE_TASKS.length - 1 ? 'Næste opgave ➔' : 'Afslut puslespil 🏆'}
                            </button>
                        `;
                        speakDanish(placedWords.join(' '));

                        puzContainer.querySelector('#tid-task-next-btn').onclick = () => {
                            if (currentTidChallengeIdx < TID_CHALLENGE_TASKS.length - 1) {
                                currentTidChallengeIdx++;
                                setupChallengeSection();
                            } else {
                                statusEl.innerHTML = `<span style="color: #fbbf24;">Alle 6 tids-udfordringer gennemført flot! 🌟</span>`;
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
        parent.innerHTML = '';
        parent.appendChild(container);
    }

    // ==========================================
    // TAB 5: TIDS-NUANCEN (MODEL B: CLOZE MED FORVEKSLINGSPAR)
    // ==========================================
    let clozeIdx = 0;
    let clozeScore = 0;
    let clozeAnswered = false;

    // Simple A1/A2 context sentences
    const CLOZE_QUESTIONS = [
        {
            sentenceBefore: 'Klokken er kun 6, men Peter er',
            sentenceAfter: 'vågen og spiser morgenmad.',
            options: ['allerede', 'endnu', 'før'],
            correct: 'allerede',
            feedback: 'Korrekt! "Allerede" bruges om noget, der sker før forventet tid.'
        },
        {
            sentenceBefore: 'Butikken er ikke åben',
            sentenceAfter: 'i dag.',
            options: ['allerede', 'endnu', 'stadig'],
            correct: 'endnu',
            feedback: 'Korrekt! Sammen med "ikke" hedder det altid "ikke endnu".'
        },
        {
            sentenceBefore: 'Er du',
            sentenceAfter: 'på arbejde? Klokken er mange!',
            options: ['stadig', 'snart', 'endnu'],
            correct: 'stadig',
            feedback: 'Rigtigt! "Stadig" viser, at en tilstand fortsætter uden stop.'
        },
        {
            sentenceBefore: 'Vent lige på mig, jeg kommer',
            sentenceAfter: '!',
            options: ['straks', 'længe', 'før'],
            correct: 'straks',
            feedback: 'Flot! "Straks" betyder lige med det samme uden forsinkelse.'
        },
        {
            sentenceBefore: 'Vi ventede',
            sentenceAfter: 'på bussen i regnvejret.',
            options: ['længe', 'snart', 'straks'],
            correct: 'længe',
            feedback: 'Korrekt! "Længe" angiver en lang tidsmæssig varighed.'
        },
        {
            sentenceBefore: 'Jeg drikker',
            sentenceAfter: 'kaffe om morgenen, hver dag.',
            options: ['altid', 'sommetider', 'sjældent'],
            correct: 'altid',
            feedback: 'Korrekt! 100% af gangene hedder "altid".'
        },
        {
            sentenceBefore: 'Han spiser',
            sentenceAfter: 'fisk, for han kan slet ikke lide det.',
            options: ['aldrig', 'ofte', 'tit'],
            correct: 'aldrig',
            feedback: 'Korrekt! 0% af gangene hedder "aldrig".'
        },
        {
            sentenceBefore: 'Først spiser vi, og',
            sentenceAfter: 'går vi en tur.',
            options: ['bagefter', 'før', 'siden'],
            correct: 'bagefter',
            feedback: 'Rigtigt! "Bagefter" viser det efterfølgende trin i rækkefølgen.'
        },
        {
            sentenceBefore: 'Toget kommer',
            sentenceAfter: ', se ud på sporet!',
            options: ['snart', 'længe', 'før'],
            correct: 'snart',
            feedback: 'Korrekt! "Snart" viser at det sker om kort tid i fremtiden.'
        },
        {
            sentenceBefore: 'Sommetider cykler jeg, og',
            sentenceAfter: 'tager jeg bussen.',
            options: ['sommetider', 'altid', 'aldrig'],
            correct: 'sommetider',
            feedback: 'Korrekt! "Sommetider" viser 50% frekvens (nogle gange).'
        },
        {
            sentenceBefore: 'Uret har gået trofast',
            sentenceAfter: 'år 1900.',
            options: ['siden', 'før', 'bagefter'],
            correct: 'siden',
            feedback: 'Flot! "Siden" angiver et startpunkt i fortiden indtil nu.'
        },
        {
            sentenceBefore: 'Nej, nu tabte jeg nøglerne',
            sentenceAfter: '! Det er anden gang i dag.',
            options: ['igen', 'snart', 'endnu'],
            correct: 'igen',
            feedback: 'Korrekt! "Igen" bruges om gentagelse af en handling.'
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
                <h2 style="font-size: 2.2rem; margin-bottom: 0.8rem; color: white;">Fantastisk klaret!</h2>
                <p style="font-size: 1.2rem; color: #94a3b8; margin-bottom: 1.5rem;">
                    Du gennemførte tids-nuancen med <strong>${clozeScore} af ${CLOZE_QUESTIONS.length * 10} point</strong>!
                </p>
                <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; border-radius: 14px; padding: 1.4rem; max-width: 650px; margin: 0 auto 2rem; color: #fef3c7; text-align: left; line-height: 1.6;">
                    <strong>Husk de 3 vigtigste tids-regler:</strong><br>
                    1. <strong>Allerede vs. Endnu:</strong> <em>Allerede</em> er tidligere end forventet. <em>Ikke endnu</em> er forventet lidt senere.<br>
                    2. <strong>Stadig:</strong> Viser at noget fortsætter uafbrudt fra fortiden ind i nuet.<br>
                    3. <strong>V2-inversion:</strong> Sætter du tidsadverbiets ord forrest (<em>Nu, Bagefter, Sommetider</em>), SKAL verbet stå på 2. pladsen!
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
    switchTab(currentTab);
    container.appendChild(viewContainer);
}
