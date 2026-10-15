import { getTranslation } from '../utils/i18n.js';

/**
 * AdverbierTidView - Felt 2: Tid & Frekvens (Hvornår, hvor længe, hvor tit)
 * 19 højfrekvente tidsadverbier trænet i 5 didaktiske tabs:
 * 1. Det Interaktive Torv & Vrimlebillede (19 hotspots, Frekvens vs Tidspunkt, pure mode, audio)
 * 2. Tids-Detektiven (8 dynamiske zoom-missioner i byen)
 * 3. Frekvens-Barometret & Tidslinjen (100% til 0% skala & før/nu/bagefter)
 * 4. Sætningsbyggeren (Centraladverbium & inversion ved tid på 1. plads)
 * 5. Tids-Nuancen (Model B: Cloze med forvekslingspar f.eks. allerede/endnu/stadig)
 */
export function renderAdverbierTidView(container, navigateFn) {
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

    // 19 Words Data for Felt 2 (Tid & Frekvens)
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
            sceneDesc: 'Manden i jakkesæt kigger på sit armbåndsur lige i dette øjeblik og løber hurtigt.',
            meaning: 'Lige i dette øjeblik / i nutiden',
            sentence: 'Manden kigger på sit ur lige nu.',
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
            sceneDesc: 'Bageren i sin hvide uniform smiler altid til kunder og naboer.',
            meaning: '100% af gangene / hver evig eneste dag uden undtagelse',
            sentence: 'Bageren smiler altid til sine naboer om morgenen.',
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
            sceneDesc: 'Familien på ladcyklen tager aldrig bilen i byens tætte myldretid.',
            meaning: '0% af gangene / på intet tidspunkt',
            sentence: 'Familien kører aldrig i bil i den travle bymidte.',
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
            sceneDesc: 'Cyklisten i neongul jakke cykler ofte meget hurtigt gennem gaderne.',
            meaning: 'Mange gange / med kort tidsinterval',
            sentence: 'Han cykler ofte meget hurtigt gennem byen.',
            ruleHint: 'Angiver høj hyppighed. Er fuldstændig synonym med "tit".'
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
            sceneDesc: 'Postbuddet på sin røde budcykel standser tit foran bageriet.',
            meaning: 'Ofte / mange gange i hverdagen',
            sentence: 'Postbuddet kommer tit forbi med friske breve.',
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
            sceneDesc: 'Den gule bybus på kørebanen kommer sjældent for sent.',
            meaning: 'Få gange / næsten aldrig',
            sentence: 'Den gule bybus kommer sjældent for sent.',
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
            sceneDesc: 'DSB-toget oppe på viadukten er tæt på og ankommer snart til perronen.',
            meaning: 'Om kort tid / inden længe',
            sentence: 'Toget ankommer snart til stationens perron.',
            ruleHint: 'Viser at noget vil ske om kort tid ud i fremtiden (inden for få minutter eller dage).'
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
            sceneDesc: 'Studinen har siddet med sine bøger og mange kaffekopper i længe.',
            meaning: 'I lang tid / med stor varighed',
            sentence: 'Hun har siddet og læst på bænken i længe.',
            ruleHint: 'Beskriver tidsrummets længde (varighed): "Hvor længe varer det? – Det varer længe."'
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
            sceneDesc: 'Bageriet har allerede friskbagte rundstykker klar, selvom det er tidlig morgen.',
            meaning: 'Tidligere end forventet',
            sentence: 'Bageriet har allerede friskbagt brød klar.',
            ruleHint: 'Vigtig didaktisk nuance! Viser overraskelse over, at noget sker FØR man forventede det.'
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
            sceneDesc: 'Butikken med det lukkede skilt er ikke åbnet endnu.',
            meaning: 'Indtil dette tidspunkt (især: "ikke endnu")',
            sentence: 'Butikken er ikke åbnet endnu, men åbner kl. 9.',
            ruleHint: '"Ikke endnu" = handlingen er ikke sket på nuværende tidspunkt, men forventes snart.'
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
            sceneDesc: 'Den flittige studerende sidder stadig dybt fordybet i sine noter.',
            meaning: 'Fortsat / uændret uden stop',
            sentence: 'Hun sidder stadig og forbereder sig til eksamen.',
            ruleHint: 'Viser kontinuitet: En handling startede i fortiden og fortsætter uafbrudt i nutiden.'
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
            sceneDesc: 'Kvinden slår sin paraply op, da det begynder at dryppe igen.',
            meaning: 'En gang til / fornyet gentagelse',
            sentence: 'Nu begynder det at regne igen over torvet.',
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
            sceneDesc: 'Den travle pendler må af sted straks for ikke at misse sit tog.',
            meaning: 'Lige med det samme / i dette sekund',
            sentence: 'Han må løbe til toget straks for at nå det.',
            ruleHint: 'Hurtigere og mere øjeblikkeligt end "snart". Betyder "uden forsinkelse".'
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
            sceneDesc: 'Manden på bænken ser på et gammelt fotografi af, hvordan byen så ud før i tiden.',
            meaning: 'Tidligere i fortiden / førhen',
            sentence: 'Sådan så torvet ud før i tiden.',
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
            sceneDesc: 'Det høje tårnur på rådhuset har vist tiden i byen i mere end 100 år siden 1900.',
            meaning: 'Fra et startpunkt i fortiden indtil nu / derefter',
            sentence: 'Uret på tårnet har gået trofast siden år 1900.',
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
            sceneDesc: 'Personen henter morgenbrød først, og bagefter cykler han videre til arbejdet.',
            meaning: 'Efter at noget andet er afsluttet',
            sentence: 'Først henter han brød, og bagefter cykler han videre.',
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
            sceneDesc: 'De historiske byhuse med teglsten minder om, hvordan byen var engang.',
            meaning: 'På et ubestemt tidspunkt i fortiden (eller fremtiden)',
            sentence: 'Engang kørte der hestevogne og sporvogne i denne gade.',
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
            sceneDesc: 'Skyerne og solstrålerne over byen: Sommetider er det solrigt, og sommetider regner det.',
            meaning: 'Nogle gange / af og til (ca. 50% af tilfældene)',
            sentence: 'Sommetider skinner solen, og sommetider regner det.',
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
            sceneDesc: 'Kiosken under viadukten holder foreløbig åbent indtil renoveringen begynder.',
            meaning: 'Indtil videre / for nuværende',
            sentence: 'Kiosken holder foreløbig åbent i formiddagstimerne.',
            ruleHint: 'Betyder "for nuværende, men kan ændre sig senere": "Foreløbig ved vi ikke mere."'
        }
    ];

    // State
    let currentTab = 'tab_vrimmel';
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

        /* Tab 3: Frekvens-Barometret */
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
        .frequency-ladder {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            margin-bottom: 2rem;
        }
        .ladder-step {
            background: #0f172a;
            border-radius: 14px;
            padding: 1rem 1.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 2px dashed rgba(255, 255, 255, 0.15);
            transition: all 0.2s ease;
        }
        .ladder-step.filled {
            border-style: solid;
            border-color: #f59e0b;
            background: rgba(245, 158, 11, 0.1);
        }
        .ladder-percent {
            font-size: 1.1rem;
            font-weight: 900;
            color: #fbbf24;
            min-width: 70px;
        }
        .ladder-label {
            font-size: 0.95rem;
            color: #94a3b8;
            flex-grow: 1;
            padding: 0 1rem;
        }
        .ladder-target-slot {
            min-width: 130px;
            min-height: 40px;
            background: #1e293b;
            border-radius: 10px;
            border: 1px dashed rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1rem;
            color: white;
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
        .saetning-challenge-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.8rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 1.5rem;
        }
        .saetning-focus-badge {
            display: inline-block;
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid #f59e0b;
            color: #fbbf24;
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
            border-color: #fbbf24;
            transform: translateY(-2px);
        }
        .saetning-chip.slot-chip {
            background: #d97706;
            border-color: #fbbf24;
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
            background: #f59e0b;
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
            background: #d97706;
            transform: translateY(-2px);
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
        <h1>2. Tid & Frekvens</h1>
        <p>Lær at udtrykke hvornår noget sker, hvor tit det gentager sig (100% til 0%), samt mestr de svære tids-nuancer som <em>allerede</em>, <em>endnu</em> og <em>stadig</em>.</p>
        <div class="adv-rule-banner">
            <div class="rule-card-mini rule-frekvens">
                <span>⏳</span>
                <span><strong>Frekvens (Hvor tit?):</strong> altid (100%) ➔ ofte/tit ➔ sommetider (50%) ➔ sjældent ➔ aldrig (0%)</span>
            </div>
            <div class="rule-card-mini rule-tidspunkt">
                <span>⏰</span>
                <span><strong>Tidsforløb & Nuance:</strong> før ➔ nu ➔ bagefter • allerede (før forventet) • stadig (fortsat) • endnu ikke</span>
            </div>
        </div>
    `;
    viewContainer.appendChild(hero);

    // Tabs Navigation
    const tabsNav = document.createElement('div');
    tabsNav.className = 'adv-tabs-nav';

    const tabsConfig = [
        { id: 'tab_vrimmel', label: '1. Vrimlebillede (19 ord)', icon: '🖼️' },
        { id: 'tab_detektiv', label: '2. Tids-Detektiven', icon: '🔍' },
        { id: 'tab_barometer', label: '3. Frekvens-Barometret', icon: '📊' },
        { id: 'tab_saetning', label: '4. Sætningsbyggeren', icon: '🧱' },
        { id: 'tab_kontekst', label: '5. Tids-Nuancen (Opgave 5)', icon: '🎯' }
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
        const inspector = document.createElement('div');
        inspector.className = 'inspector-card';

        // Left column
        const leftCol = document.createElement('div');
        leftCol.className = 'inspector-left';

        const wordHeader = document.createElement('div');
        wordHeader.className = 'inspector-word-header';
        wordHeader.innerHTML = `
            <div class="inspector-word-title">${currentWordData.word}</div>
            <div class="adv-type-badge ${currentWordData.type === 'frekvens' ? 'badge-frekvens' : 'badge-tidspunkt'}">
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
        sceneDesc.innerHTML = `<strong>På torvet:</strong> ${currentWordData.sceneDesc}`;
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
    // TAB 3: FREKVENS-BAROMETRET (100% TIL 0% SKALA)
    // ==========================================
    const FREQUENCY_STEPS = [
        { percent: '100%', word: 'altid', label: 'Hver evig eneste gang uden undtagelse' },
        { percent: '75%', word: 'ofte / tit', label: 'Mange gange / stor hyppighed' },
        { percent: '50%', word: 'sommetider', label: 'Nogle gange / af og til' },
        { percent: '20%', word: 'sjældent', label: 'Få gange / næsten aldrig' },
        { percent: '0%', word: 'aldrig', label: 'På intet tidspunkt overhovedet' }
    ];

    function renderTabBarometer(parent) {
        const container = document.createElement('div');
        container.className = 'barometer-container';

        const intro = document.createElement('div');
        intro.className = 'barometer-intro';
        intro.innerHTML = `
            <h2>📊 Frekvens-Barometret</h2>
            <p>I dansk samtale er det afgørende at kende de 5 klassiske frekvenstrin fra 100% (altid) til 0% (aldrig):</p>
        `;
        container.appendChild(intro);

        const ladder = document.createElement('div');
        ladder.className = 'frequency-ladder';

        FREQUENCY_STEPS.forEach(step => {
            const row = document.createElement('div');
            row.className = 'ladder-step filled';
            row.innerHTML = `
                <div class="ladder-percent">${step.percent}</div>
                <div class="ladder-label">${step.label}</div>
                <div class="ladder-target-slot" style="background: rgba(245, 158, 11, 0.2); border-color: #fbbf24; cursor: pointer;">
                    ${step.word} 🔊
                </div>
            `;
            row.querySelector('.ladder-target-slot').onclick = () => {
                speakDanish(step.word);
            };
            ladder.appendChild(row);
        });
        container.appendChild(ladder);

        // Tidslinje-kort: Før ➔ Nu ➔ Bagefter
        const timelineCard = document.createElement('div');
        timelineCard.style.background = '#0f172a';
        timelineCard.style.borderRadius = '16px';
        timelineCard.style.padding = '1.5rem';
        timelineCard.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        timelineCard.style.textAlign = 'center';
        timelineCard.innerHTML = `
            <h3 style="font-size: 1.3rem; margin-bottom: 0.8rem; color: #38bdf8;">⏰ Tidslinjen: Kronologisk rækkefølge</h3>
            <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
                <div style="background: #334155; padding: 0.6rem 1.2rem; border-radius: 12px; font-weight: 800; border: 1.5px solid #64748b; color: #94a3b8;">
                    1. FØR (Fortid)
                </div>
                <span style="font-size: 1.5rem; color: #fbbf24;">➔</span>
                <div style="background: #0284c7; padding: 0.6rem 1.2rem; border-radius: 12px; font-weight: 800; border: 1.5px solid #38bdf8; color: white;">
                    2. NU (Nutid)
                </div>
                <span style="font-size: 1.5rem; color: #fbbf24;">➔</span>
                <div style="background: #d97706; padding: 0.6rem 1.2rem; border-radius: 12px; font-weight: 800; border: 1.5px solid #fbbf24; color: white;">
                    3. BAGEFTER (Fremtid / Næste skridt)
                </div>
            </div>
            <p style="color: #94a3b8; font-size: 0.95rem; max-width: 600px; margin: 0 auto;">
                <em>"<strong>Før</strong> spiste vi morgenmad. Lige <strong>nu</strong> cykler vi, og <strong>bagefter</strong> skal vi arbejde."</em>
            </p>
        `;
        container.appendChild(timelineCard);

        parent.innerHTML = '';
        parent.appendChild(container);
    }

    // ==========================================
    // TAB 4: SÆTNINGSBYGGEREN (ORDSTILLING & INVERSION)
    // ==========================================
    let saetningIdx = 0;

    const SAETNING_CHALLENGES = [
        {
            focus: 'Centraladverbium i fremsættende hovedsætning (altid)',
            slots: ['Subjekt', 'Verbum', 'Centraladverbium', 'Præposition'],
            chips: ['Bageren', 'smiler', 'altid', 'til naboerne'],
            correct: ['Bageren', 'smiler', 'altid', 'til naboerne'],
            explanation: 'Perfekt! I en almindelig fremsættende hovedsætning placeres centraladverbiet "altid" lige efter verbet: Subjekt ➔ Verbum ➔ Centraladverbium.'
        },
        {
            focus: 'Centraladverbium med benægtelse (aldrig)',
            slots: ['Subjekt', 'Verbum', 'Centraladverbium', 'Præposition'],
            chips: ['De', 'kører', 'aldrig', 'i bil'],
            correct: ['De', 'kører', 'aldrig', 'i bil'],
            explanation: 'Helt rigtigt! "Aldrig" følger præcis samme faste plads som "ikke" (centraladverbiets plads).'
        },
        {
            focus: 'Inversion med tid på 1. plads (Nu)',
            slots: ['Tid (1. plads)', 'Verbum (2. plads)', 'Subjekt (3. plads)', 'Adjektiv'],
            chips: ['Nu', 'har', 'manden', 'travlt'],
            correct: ['Nu', 'har', 'manden', 'travlt'],
            explanation: 'Fremragende inversion! Når tidsadverbiet "Nu" sættes forrest for at give fokus, bytter subjekt og verbum plads: "Nu har manden travlt!"'
        },
        {
            focus: 'Inversion med tid på 1. plads (Bagefter)',
            slots: ['Tid (1. plads)', 'Verbum (2. plads)', 'Subjekt (3. plads)', 'Sted'],
            chips: ['Bagefter', 'cykler', 'hun', 'hjem'],
            correct: ['Bagefter', 'cykler', 'hun', 'hjem'],
            explanation: 'Flot! "Bagefter cykler hun hjem." Verbet "cykler" står fast på plads 2.'
        },
        {
            focus: 'Centraladverbium med nær fremtid (snart)',
            slots: ['Subjekt', 'Verbum', 'Centraladverbium', 'Præposition'],
            chips: ['Toget', 'ankommer', 'snart', 'til stationen'],
            correct: ['Toget', 'ankommer', 'snart', 'til stationen'],
            explanation: 'Korrekt! Tidsadverbiet "snart" placeres naturligt mellem verbet og præpositionsleddet.'
        },
        {
            focus: 'Inversion med mellemliggende frekvens (Sommetider)',
            slots: ['Tid (1. plads)', 'Verbum (2. plads)', 'Subjekt (3. plads)', 'Objekt'],
            chips: ['Sommetider', 'drikker', 'vi', 'en kop kaffe'],
            correct: ['Sommetider', 'drikker', 'vi', 'en kop kaffe'],
            explanation: 'Perfekt! "Sommetider drikker vi en kop kaffe." V2-reglen overholdes fejlfrit!'
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
            <p>Træn tidsadverbiets faste placering: som centraladverbium (efter verbet) eller forrest med inversion!</p>
        `;
        container.appendChild(header);

        // Card
        const card = document.createElement('div');
        card.className = 'saetning-challenge-card';

        const focusBadge = document.createElement('div');
        focusBadge.className = 'saetning-focus-badge';
        focusBadge.textContent = `Opgave ${saetningIdx + 1} af ${SAETNING_CHALLENGES.length}: ${challenge.focus}`;
        card.appendChild(focusBadge);

        // Drop Area
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
                    <p>Husk V2-reglen: Hvis tidsadverbiet står forrest, skal verbet være på plads 2!</p>
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
    // TAB 5: TIDS-NUANCEN (MODEL B: CLOZE MED FORVEKSLINGSPAR)
    // ==========================================
    let clozeIdx = 0;
    let clozeScore = 0;
    let clozeAnswered = false;

    const CLOZE_QUESTIONS = [
        {
            sentenceBefore: 'Klokken er kun 6 om morgenen, men Peter er',
            sentenceAfter: 'vågen og spiser morgenmad.',
            options: ['allerede', 'endnu', 'før'],
            correct: 'allerede',
            feedback: 'Korrekt! "Allerede" bruges om noget, der sker før forventet tid (tidligere end normalt).'
        },
        {
            sentenceBefore: 'Klokken er 11, men butikken er ikke åbnet',
            sentenceAfter: 'i dag.',
            options: ['allerede', 'endnu', 'stadig'],
            correct: 'endnu',
            feedback: 'Korrekt! Sammen med benægtelse ("ikke") hedder det altid "ikke endnu".'
        },
        {
            sentenceBefore: 'Er du på kontoret',
            sentenceAfter: '? Skulle du ikke være gået hjem for to timer siden?',
            options: ['snart', 'stadig', 'endnu'],
            correct: 'stadig',
            feedback: 'Rigtigt! "Stadig" viser, at en tilstand fra før fortsætter uafbrudt.'
        },
        {
            sentenceBefore: 'Vent lige to sekunder på mig, jeg kommer',
            sentenceAfter: '!',
            options: ['straks', 'længe', 'før'],
            correct: 'straks',
            feedback: 'Flot! "Straks" betyder lige i dette øjeblik / med det samme uden forsinkelse.'
        },
        {
            sentenceBefore: 'Bussen var meget forsinket, så vi måtte vente',
            sentenceAfter: 'ude i kulden.',
            options: ['snart', 'længe', 'straks'],
            correct: 'længe',
            feedback: 'Korrekt! "Længe" angiver tidsmæssig varighed (at vente i lang tid).'
        },
        {
            sentenceBefore: 'Jeg drikker',
            sentenceAfter: 'kaffe om morgenen, hver eneste dag uden undtagelse.',
            options: ['sommetider', 'altid', 'sjældent'],
            correct: 'altid',
            feedback: 'Korrekt! 100% af gangene hedder "altid".'
        },
        {
            sentenceBefore: 'Han spiser',
            sentenceAfter: 'svinekød, for det kan han slet ikke lide.',
            options: ['aldrig', 'ofte', 'tit'],
            correct: 'aldrig',
            feedback: 'Korrekt! 0% af gangene hedder "aldrig".'
        },
        {
            sentenceBefore: 'Først spiser vi aftensmad, og',
            sentenceAfter: 'går vi en tur i skoven.',
            options: ['før', 'bagefter', 'siden'],
            correct: 'bagefter',
            feedback: 'Rigtigt! "Bagefter" angiver det efterfølgende trin i rækkefølgen.'
        },
        {
            sentenceBefore: 'Toget kommer',
            sentenceAfter: ', det er allerede ved at køre ind på sporet.',
            options: ['snart', 'længe', 'før'],
            correct: 'snart',
            feedback: 'Korrekt! "Snart" viser, at handlingen indtræffer om kort tid i fremtiden.'
        },
        {
            sentenceBefore: 'Vi spiser for det meste pasta, men',
            sentenceAfter: 'laver vi også suppe.',
            options: ['altid', 'sommetider', 'aldrig'],
            correct: 'sommetider',
            feedback: 'Korrekt! "Sommetider" viser en mellemliggende frekvens (af og til / 50%).'
        },
        {
            sentenceBefore: 'Uret på rådhuset har gået pålideligt',
            sentenceAfter: 'år 1920.',
            options: ['siden', 'før', 'bagefter'],
            correct: 'siden',
            feedback: 'Flot! "Siden" angiver et startpunkt i fortiden, der fortsætter ind i nutiden.'
        },
        {
            sentenceBefore: 'Øv, nu tabte jeg mine nøgler',
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
    renderActiveTab();
    container.appendChild(viewContainer);
}
