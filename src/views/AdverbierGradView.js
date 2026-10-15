import { getTranslation } from '../utils/i18n.js';

/**
 * AdverbierGradView - Felt 4: Grad & Intensitet (Hvor meget? Hvor kraftigt?)
 * 
 * 20 højfrekvente gradsadverbier på skalaen fra 0% til over 100%:
 * 1. slet ikke (0%)
 * 2. overhovedet ikke (0%)
 * 3. næsten ikke (5%)
 * 4. en smule (15%)
 * 5. lidt (25%)
 * 6. noget (40%)
 * 7. nogenlunde (50%)
 * 8. ganske (60%)
 * 9. temmelig (70%)
 * 10. ret (75%)
 * 11. meget (85%)
 * 12. virkelig (90%)
 * 13. utroligt (95%)
 * 14. uhyre (95%)
 * 15. helt (100%)
 * 16. fuldstændig (100%)
 * 17. totalt (100%)
 * 18. næsten (90%)
 * 19. for (>100% problem/grænse overskredet)
 * 20. alt for (>>100% kraftig overskridelse)
 * 
 * 5 didaktiske tabs:
 * 1. Det Interaktive Torv & Vrimlebillede (20 hotspots, filter, pure mode, audio)
 * 2. Aha-værkstedet (Intensitetsskalaen & Meget vs. For)
 * 3. Grads-Detektiven (8 nuancerede udfordringer)
 * 4. Sætningsbyggeren (To-trins model med faste grammatiske farver: Grøn, Rød, Lilla, Blå)
 * 5. Kontekst-testen (14 varierede A1/A2 hverdagssituationer)
 */
export function renderAdverbierGradView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adverbier-grad-view';

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

    // 20 Words Data for Felt 4 (Grad & Intensitet)
    const ADVERBIER_GRAD_DATA = [
        {
            id: 'slet_ikke',
            word: 'slet ikke',
            tier: '0%',
            category: 'nul',
            x: 64,
            y: 83,
            sceneDesc: 'Drengen i den tynde trøje smiler og fryser slet ikke i det milde vejr.',
            meaning: '0% / overhovedet intet',
            sentence: 'Han fryser slet ikke.',
            contextSentence: 'Det er lunt udenfor, så han fryser slet ikke.',
            ruleHint: '"Slet ikke" forstærker benægtelsen 100% (absolut 0%).',
            levelPercent: 0
        },
        {
            id: 'overhovedet_ikke',
            word: 'overhovedet ikke',
            tier: '0%',
            category: 'nul',
            x: 29,
            y: 57,
            sceneDesc: 'Den lille dreng bærer sin lette rygsæk uden besvær – den er overhovedet ikke tung.',
            meaning: 'Absolut 0% / under ingen omstændigheder',
            sentence: 'Tasken er overhovedet ikke tung.',
            contextSentence: 'Han er stærk, og rygsækken er overhovedet ikke tung.',
            ruleHint: 'Bruges til at understrege, at der er nul tvivl eller modstand.',
            levelPercent: 0
        },
        {
            id: 'naesten_ikke',
            word: 'næsten ikke',
            tier: '5%',
            category: 'lav',
            x: 18,
            y: 92,
            sceneDesc: 'Tallerkenen er tømt, og der er næsten ikke flere jordbær tilbage.',
            meaning: 'Minimal grad / kun en mikroskopisk mængde',
            sentence: 'Der er næsten ikke noget tilbage.',
            contextSentence: 'Kagen var god, så der er næsten ikke noget tilbage.',
            ruleHint: 'Betyder at der kun mangler en brøkdel for at være helt tomt.',
            levelPercent: 5
        },
        {
            id: 'en_smule',
            word: 'en smule',
            tier: '15%',
            category: 'lav',
            x: 14,
            y: 69,
            sceneDesc: 'Cafégæsten venter lidt, da kaffen kun er en smule varm.',
            meaning: 'En anelse / meget lille grad',
            sentence: 'Kaffen er en smule kold.',
            contextSentence: 'Han har siddet længe, så kaffen er en smule kold.',
            ruleHint: '"En smule" bruges ofte om små afvigelser eller fine nuancer.',
            levelPercent: 15
        },
        {
            id: 'lidt',
            word: 'lidt',
            tier: '25%',
            category: 'lav',
            x: 34,
            y: 81,
            sceneDesc: 'Kvinden med koppen nyder sin te – den er lidt varm, men lige til at drikke.',
            meaning: 'Svag grad / behersket mængde',
            sentence: 'Teen er lidt varm.',
            contextSentence: 'Hun drikker i rolige slurke, fordi teen er lidt varm.',
            ruleHint: 'Et af de mest brugte danske ord. Beskriver en lille, behagelig eller moderat grad.',
            levelPercent: 25
        },
        {
            id: 'noget',
            word: 'noget',
            tier: '40%',
            category: 'mellem',
            x: 58,
            y: 53,
            sceneDesc: 'Cyklen med de store flyttekasser er noget tung at styre.',
            meaning: 'En vis grad / i nogen grad',
            sentence: 'Cyklen er noget tung.',
            contextSentence: 'Der er mange kasser på ladet, så cyklen er noget tung.',
            ruleHint: '"Noget" foran et adjektiv svarer til "en del" eller "moderat".',
            levelPercent: 40
        },
        {
            id: 'nogenlunde',
            word: 'nogenlunde',
            tier: '50%',
            category: 'mellem',
            x: 54,
            y: 77,
            sceneDesc: 'Drengen i jakken har det nogenlunde trods den kølige vind.',
            meaning: 'Middelmådigt / tilfredsstillende / okay',
            sentence: 'Han har det nogenlunde.',
            contextSentence: 'Vinden blæser, men med jakken på har han det nogenlunde.',
            ruleHint: 'Betyder ca. 50%. Hverken fantastisk eller elendigt, men acceptabelt.',
            levelPercent: 50
        },
        {
            id: 'ganske',
            word: 'ganske',
            tier: '60%',
            category: 'mellem',
            x: 74,
            y: 43,
            sceneDesc: 'Bageren viser sit brød frem – det er ganske sprødt og friskt.',
            meaning: 'Pæn grad / ret / absolut acceptabelt',
            sentence: 'Brødet er ganske sprødt.',
            contextSentence: 'Bageren er stolt, for brødet er ganske sprødt.',
            ruleHint: '"Ganske" bruges ofte i høfligt eller nuanceret dansk som "ganske udmærket".',
            levelPercent: 60
        },
        {
            id: 'temmelig',
            word: 'temmelig',
            tier: '70%',
            category: 'mellem',
            x: 79,
            y: 37,
            sceneDesc: 'Termometret viser +5 grader – det er temmelig koldt for årstiden.',
            meaning: 'Mere end middel / mærkbar grad',
            sentence: 'Vejret er temmelig koldt.',
            contextSentence: 'Måleren viser kun 5 grader, så vejret er temmelig koldt.',
            ruleHint: '"Temmelig" angiver, at det overstiger det sædvanlige, uden at være ekstremt.',
            levelPercent: 70
        },
        {
            id: 'ret',
            word: 'ret',
            tier: '75%',
            category: 'mellem',
            x: 85,
            y: 49,
            sceneDesc: 'Musikeren med harmonikaen er dygtig og spiller ret godt.',
            meaning: 'I høj grad / temmelig / pænt meget',
            sentence: 'Musikeren spiller ret godt.',
            contextSentence: 'Folk stopper op og lytter, fordi han spiller ret godt.',
            ruleHint: 'Danskerne elsker "ret": "ret godt", "ret dyrt", "ret spændende".',
            levelPercent: 75
        },
        {
            id: 'meget',
            word: 'meget',
            tier: '85%',
            category: 'hoej',
            x: 72,
            y: 77,
            sceneDesc: 'Manden smiler bredt med sin isvaffel – han er meget glad for is.',
            meaning: 'Høj intensitet (positiv eller neutral)',
            sentence: 'Han er meget glad.',
            contextSentence: 'Det er sommer, og han er meget glad for sin store is.',
            ruleHint: '⚠️ VIGTIGT: "Meget" er neutralt eller positivt. Hvis der opstår et problem, bruger vi "for"!',
            levelPercent: 85
        },
        {
            id: 'virkelig',
            word: 'virkelig',
            tier: '90%',
            category: 'hoej',
            x: 54,
            y: 84,
            sceneDesc: 'Drengen med det store halstørklæde ryster – han fryser virkelig meget.',
            meaning: 'Oprigtigt / med stor styrke',
            sentence: 'Han fryser virkelig meget.',
            contextSentence: 'Kindernes farve er bleg, for han fryser virkelig meget.',
            ruleHint: 'Understreger at udsagnet er 100% sandt og intenst følt.',
            levelPercent: 90
        },
        {
            id: 'utroligt',
            word: 'utroligt',
            tier: '95%',
            category: 'hoej',
            x: 78,
            y: 73,
            sceneDesc: 'Isvaflen har tre kæmpe kugler – den er utroligt stor!',
            meaning: 'Ekstraordinært / så meget at det næsten ikke er til at tro',
            sentence: 'Isvaflen er utroligt stor.',
            contextSentence: 'Kuglerne tårner sig op, så isvaflen er utroligt stor.',
            ruleHint: 'Bruges som stærk forstærker foran adjektiver: "utroligt smuk", "utroligt billig".',
            levelPercent: 95
        },
        {
            id: 'uhyre',
            word: 'uhyre',
            tier: '95%',
            category: 'hoej',
            x: 43,
            y: 49,
            sceneDesc: 'Rejsende sveder og stønner – den store kuffert er uhyre tung.',
            meaning: 'Yderst / ekstremt kraftigt',
            sentence: 'Kufferten er uhyre tung.',
            contextSentence: 'Han kan knap gå fremad, for kufferten er uhyre tung.',
            ruleHint: 'Et stærkt forstærkende ord, der lægger vægt på enorm intensitet.',
            levelPercent: 95
        },
        {
            id: 'naesten',
            word: 'næsten',
            tier: '90%',
            category: 'hoej',
            x: 77,
            y: 83,
            sceneDesc: 'Den øverste iskugle hælder til siden og er næsten smeltet.',
            meaning: 'Lige ved / mangler kun en lille smule',
            sentence: 'Isen er næsten smeltet.',
            contextSentence: 'Solen varmer, så isen er næsten smeltet.',
            ruleHint: 'Viser at tilstanden er 90-95% opnået.',
            levelPercent: 90
        },
        {
            id: 'helt',
            word: 'helt',
            tier: '100%',
            category: 'fuld',
            x: 7,
            y: 88,
            sceneDesc: 'Kagen i bagerens vindue er helt dækket af friske jordbær.',
            meaning: '100% / fuldstændig / totalt',
            sentence: 'Kagen er helt dækket.',
            contextSentence: 'Man kan slet ikke se bunden, for kagen er helt dækket af bær.',
            ruleHint: '"Helt" bruges foran adjektiver: "helt ny", "helt sikker", "helt færdig".',
            levelPercent: 100
        },
        {
            id: 'fuldstaendig',
            word: 'fuldstændig',
            tier: '100%',
            category: 'fuld',
            x: 19,
            y: 93,
            sceneDesc: 'Kagetallerkenen er slikket ren – den er fuldstændig tom.',
            meaning: 'Uden undtagelse / totalt dækkende',
            sentence: 'Tallerkenen er fuldstændig tom.',
            contextSentence: 'Gæsten spiste alt op, så tallerkenen er fuldstændig tom.',
            ruleHint: 'Et stærkt adverbium for absolut 100% fuldkommenhed.',
            levelPercent: 100
        },
        {
            id: 'totalt',
            word: 'totalt',
            tier: '100%',
            category: 'fuld',
            x: 58,
            y: 43,
            sceneDesc: 'Cykelladets kasser er stablet højt op – det er totalt overfyldt.',
            meaning: 'Gennemført / absolut 100%',
            sentence: 'Ladet er totalt overfyldt.',
            contextSentence: 'Der kan ikke være én æske mere, for ladet er totalt overfyldt.',
            ruleHint: 'Meget udbredt i moderne dansk til at udtrykke fuld styrke.',
            levelPercent: 100
        },
        {
            id: 'for',
            word: 'for',
            tier: '>100%',
            category: 'overskud',
            x: 14,
            y: 77,
            sceneDesc: 'Manden puster desperat på kaffen – den er for varm til at drikke nu!',
            meaning: 'Over grænsen / skaber et problem',
            sentence: 'Kaffen er for varm.',
            contextSentence: 'Han brænder tungen, fordi kaffen er for varm.',
            ruleHint: '⚠️ NØGLEREGEL: "For" betyder at en grænse er overskredet med negativ følge (kan ikke drikkes).',
            levelPercent: 110
        },
        {
            id: 'alt_for',
            word: 'alt for',
            tier: '>>100%',
            category: 'overskud',
            x: 91,
            y: 86,
            sceneDesc: 'Børnene åbner munden med tårer i øjnene – chilien er alt for stærk!',
            meaning: 'Kraftigt overskud / uacceptabel eller uløselig situation',
            sentence: 'Maden er alt for stærk.',
            contextSentence: 'De skal have mælk med det samme, for chilien er alt for stærk.',
            ruleHint: '"Alt for" forstærker problemet: "alt for dyr", "alt for tung", "alt for hurtigt".',
            levelPercent: 130
        }
    ];

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .adverbier-grad-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 5rem;
            color: #f8fafc;
        }

        /* Hero Header */
        .grad-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .grad-hero-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(168, 85, 247, 0.15);
            border: 1px solid #c084fc;
            color: #c084fc;
            padding: 0.4rem 1.2rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.8rem;
        }
        .grad-hero h1 {
            font-size: 2.6rem;
            font-weight: 900;
            margin-bottom: 0.6rem;
            background: linear-gradient(135deg, #e9d5ff, #c084fc, #9333ea);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .grad-hero p {
            color: #94a3b8;
            font-size: 1.15rem;
            max-width: 780px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }

        /* Golden Didactic Rule Banner */
        .golden-rule-banner {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.9));
            border: 2px solid #a855f7;
            border-radius: 20px;
            padding: 1.3rem 2rem;
            max-width: 860px;
            margin: 0 auto 2.5rem;
            box-shadow: 0 10px 30px rgba(168, 85, 247, 0.25);
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        .rule-icon {
            font-size: 2.6rem;
            flex-shrink: 0;
        }
        .rule-content h4 {
            color: #e9d5ff;
            font-size: 1.15rem;
            font-weight: 800;
            margin-bottom: 0.3rem;
        }
        .rule-content p {
            color: #cbd5e1;
            font-size: 0.98rem;
            line-height: 1.5;
            margin: 0;
        }
        .rule-pills-row {
            display: flex;
            gap: 0.8rem;
            margin-top: 0.7rem;
            flex-wrap: wrap;
        }
        .rule-pill {
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
        }
        .pill-meget {
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #86efac;
        }
        .pill-for {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid #ef4444;
            color: #fca5a5;
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
            background: #9333ea;
            color: white;
            box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
        }

        /* Tab 1: Vrimmel Layout */
        .vrimmel-layout {
            max-width: 1050px;
            margin: 0 auto;
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
            flex-wrap: wrap;
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
            background: #9333ea;
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
            transition: all 0.2s;
        }
        .pure-toggle-btn.active {
            background: #c084fc;
            color: #0f172a;
            font-weight: 800;
        }

        .vrimmel-stage {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            background: #020617;
            overflow: hidden;
        }
        .vrimmel-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            user-select: none;
        }

        /* Hotspot Pins */
        .hotspot-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: #9333ea;
            border: 3px solid #ffffff;
            color: white;
            font-weight: 900;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5), 0 0 12px rgba(168, 85, 247, 0.7);
            transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10;
        }
        .hotspot-pin:hover {
            transform: translate(-50%, -50%) scale(1.3);
            background: #c084fc;
            box-shadow: 0 6px 20px rgba(192, 132, 252, 0.9);
            z-index: 20;
        }
        .hotspot-pin.active {
            background: #ec4899;
            transform: translate(-50%, -50%) scale(1.4);
            box-shadow: 0 0 25px rgba(236, 72, 153, 0.95);
            z-index: 30;
        }
        .hotspot-label {
            position: absolute;
            top: 105%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.9);
            color: white;
            font-size: 0.72rem;
            font-weight: 800;
            padding: 0.15rem 0.5rem;
            border-radius: 6px;
            white-space: nowrap;
            border: 1px solid rgba(255, 255, 255, 0.2);
            pointer-events: none;
            box-shadow: 0 2px 6px rgba(0,0,0,0.5);
        }

        /* Inspector Card */
        .vrimmel-inspector {
            background: #1e293b;
            border-radius: 20px;
            padding: 1.8rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .inspector-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 0.8rem;
        }
        .inspector-badge {
            background: rgba(168, 85, 247, 0.2);
            border: 1px solid #c084fc;
            color: #c084fc;
            padding: 0.3rem 0.8rem;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 800;
        }
        .inspector-word-title {
            font-size: 2rem;
            font-weight: 900;
            color: white;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .inspector-audio-btn {
            background: #334155;
            color: #cbd5e1;
            border: none;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 1.1rem;
        }
        .inspector-audio-btn:hover {
            background: #9333ea;
            color: white;
            transform: scale(1.1);
        }

        /* Thermometer Meter Box */
        .grad-meter-box {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 14px;
            padding: 1rem 1.2rem;
            margin-bottom: 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .meter-label-row {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            font-weight: 700;
            color: #94a3b8;
            margin-bottom: 0.5rem;
        }
        .meter-track {
            width: 100%;
            height: 12px;
            background: #0f172a;
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
        }
        .meter-fill {
            height: 100%;
            border-radius: 6px;
            transition: width 0.4s ease;
            background: linear-gradient(90deg, #38bdf8, #a855f7, #ef4444);
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

        /* Tab 2: Aha-værkstedet (Intensitetsskalaen & Meget vs. For) */
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
            flex-wrap: wrap;
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
            background: rgba(168, 85, 247, 0.2);
            border-color: #a855f7;
            color: #c084fc;
        }

        /* Termometer Skala Simulator */
        .termometer-lab-card {
            background: #0f172a;
            border-radius: 18px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .termometer-ladder {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            max-width: 650px;
            margin: 0 auto 2rem;
        }
        .ladder-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #1e293b;
            padding: 0.8rem 1.2rem;
            border-radius: 12px;
            border: 2px solid rgba(255, 255, 255, 0.08);
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ladder-row:hover {
            transform: scale(1.02);
            border-color: #c084fc;
        }
        .ladder-row.selected {
            background: rgba(168, 85, 247, 0.2);
            border-color: #a855f7;
            box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
        }
        .ladder-pct {
            font-size: 1rem;
            font-weight: 900;
            min-width: 60px;
            text-align: left;
        }
        .ladder-word {
            font-size: 1.15rem;
            font-weight: 800;
            color: #e9d5ff;
        }
        .ladder-example {
            font-size: 0.95rem;
            color: #94a3b8;
            font-style: italic;
        }

        /* Meget vs. For Showcase */
        .contrast-showcase-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        @media (max-width: 700px) {
            .contrast-showcase-grid { grid-template-columns: 1fr; }
        }
        .contrast-box {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.5rem;
            border: 2px solid;
            text-align: center;
        }
        .contrast-box.meget {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.06);
        }
        .contrast-box.for {
            border-color: #ef4444;
            background: rgba(239, 68, 68, 0.06);
        }
        .contrast-header {
            font-size: 1.35rem;
            font-weight: 900;
            margin-bottom: 0.5rem;
        }
        .contrast-box.meget .contrast-header { color: #4ade80; }
        .contrast-box.for .contrast-header { color: #f87171; }
        .contrast-sentence {
            font-size: 1.15rem;
            font-weight: 700;
            color: white;
            margin-bottom: 0.8rem;
            line-height: 1.5;
        }
        .contrast-desc {
            font-size: 0.95rem;
            color: #cbd5e1;
            line-height: 1.5;
        }

        /* Tab 3: Grads-Detektiven */
        .detektiv-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 850px;
            margin: 0 auto;
        }
        .detektiv-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 1.5rem;
        }
        .detektiv-context-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(168, 85, 247, 0.2);
            border: 1px solid #c084fc;
            color: #c084fc;
            padding: 0.35rem 0.9rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 800;
            margin-bottom: 1.2rem;
            text-transform: uppercase;
        }
        .detektiv-prompt-text {
            font-size: 1.3rem;
            color: #f8fafc;
            line-height: 1.6;
            margin-bottom: 1.8rem;
            font-weight: 600;
        }
        .detektiv-sentence-quote {
            font-size: 1.45rem;
            font-weight: 800;
            color: white;
            background: rgba(15, 23, 42, 0.7);
            padding: 1.2rem;
            border-radius: 14px;
            border-left: 5px solid #a855f7;
            margin-bottom: 2rem;
            text-align: center;
        }
        .detektiv-options-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        @media (max-width: 600px) {
            .detektiv-options-grid { grid-template-columns: 1fr; }
        }
        .detektiv-opt-btn {
            background: #1e293b;
            color: #f8fafc;
            border: 2px solid rgba(255, 255, 255, 0.12);
            padding: 1.1rem 1.4rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .detektiv-opt-btn:hover {
            border-color: #c084fc;
            background: #334155;
            transform: translateY(-2px);
        }
        .detektiv-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .detektiv-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #fca5a5 !important;
        }
        .detektiv-feedback {
            padding: 1.2rem;
            border-radius: 12px;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            display: none;
        }
        .detektiv-feedback.correct {
            background: rgba(34, 197, 94, 0.15);
            border: 1.5px solid #22c55e;
            color: #dcfce7;
            display: block;
        }
        .detektiv-feedback.wrong {
            background: rgba(239, 68, 68, 0.15);
            border: 1.5px solid #ef4444;
            color: #fee2e2;
            display: block;
        }
        .detektiv-next-btn {
            background: #9333ea;
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
            background: #7e22ce;
            transform: translateY(-2px);
        }

        /* Tab 4: Sætningsbyggeren (Faste grammatiske farver: Grøn, Rød, Lilla, Blå) */
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
            background: rgba(168, 85, 247, 0.2);
            border-color: #a855f7;
            color: #c084fc;
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
        .chip-legend-grad { background: #a855f7; box-shadow: 0 0 6px rgba(168, 85, 247, 0.6); }
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
        .category-row-card.cat-row-grad { border-left-color: #a855f7; }
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
        .cat-title-grad { color: #c084fc; }
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
        .cat-grammar-role.badge-grad { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }
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
        .cat-option-chip.chip-grad:hover { border-color: #a855f7; }
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
        .cat-option-chip.chip-grad.selected {
            background: rgba(168, 85, 247, 0.25) !important;
            color: #e9d5ff !important;
            border-color: #a855f7 !important;
            box-shadow: 0 0 15px rgba(168, 85, 247, 0.4) !important;
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
            letter-spacing: 0.05em;
            margin-bottom: 0.8rem;
        }
        .live-sentence-text {
            font-size: 1.85rem;
            font-weight: 900;
            color: white;
            line-height: 1.5;
            margin-bottom: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.8rem;
            flex-wrap: wrap;
        }
        .live-word-subjekt { color: #4ade80; text-decoration: underline 3px #22c55e; }
        .live-word-verbum { color: #f87171; text-decoration: underline 3px #ef4444; }
        .live-word-grad { color: #c084fc; text-decoration: underline 3px #a855f7; }
        .live-word-rest { color: #38bdf8; text-decoration: underline 3px #0ea5e9; }

        .live-sentence-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }
        .live-audio-btn {
            background: #9333ea;
            color: white;
            border: none;
            padding: 0.7rem 1.6rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .live-audio-btn:hover {
            background: #7e22ce;
            transform: scale(1.04);
        }

        /* Sektion 2: Pusleopgaven */
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
            flex-wrap: wrap;
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
            background: #9333ea;
            color: white;
            border-color: #c084fc;
            box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
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
            color: #e9d5ff;
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
        .sb-context-chip.grad { border-left: 3px solid #a855f7; color: #c084fc; }
        .sb-context-chip.rest { border-left: 3px solid #0ea5e9; color: #38bdf8; }
        .sb-context-chip.target-placeholder {
            background: rgba(168, 85, 247, 0.18) !important;
            border: 2px dashed #a855f7 !important;
            border-left: 4px solid #a855f7 !important;
            color: #c084fc !important;
            box-shadow: 0 0 16px rgba(168, 85, 247, 0.35) !important;
            animation: pulse-purple-slot 2s infinite ease-in-out;
        }
        @keyframes pulse-purple-slot {
            0%, 100% { border-color: rgba(168, 85, 247, 0.5); box-shadow: 0 0 10px rgba(168, 85, 247, 0.2); }
            50% { border-color: #c084fc; box-shadow: 0 0 22px rgba(168, 85, 247, 0.55); }
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
            border: 2px solid rgba(168, 85, 247, 0.45);
            border-radius: 14px;
            padding: 1.1rem 1.4rem;
            margin: 0.9rem 0 1.2rem 0;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .sb-target-sentence-label {
            font-size: 0.82rem;
            font-weight: 800;
            color: #c084fc;
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
            border: 2px dashed #a855f7;
            background: rgba(168, 85, 247, 0.16);
            border-radius: 8px;
            color: #c084fc;
            font-weight: 800;
            letter-spacing: 2px;
            transition: all 0.3s ease;
            box-shadow: 0 0 14px rgba(168, 85, 247, 0.3);
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
            background: rgba(168, 85, 247, 0.1);
            border: 1.5px solid #a855f7;
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
            border-color: #a855f7;
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
            border: 2px solid #a855f7;
            margin-top: 1.5rem;
            animation: fadeIn 0.35s ease;
        }
        .sb-puzzle-title {
            font-size: 1.35rem;
            font-weight: 800;
            color: #c084fc;
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
            background: rgba(168, 85, 247, 0.2);
            border: 1.5px solid #a855f7;
            color: #c084fc;
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
            border: 2.5px solid #a855f7;
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(15, 23, 42, 0.9));
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
        }
        .flow-step.flow-subjekt { border-color: rgba(34, 197, 94, 0.4); }
        .flow-step.flow-subjekt .flow-num { color: #4ade80; }
        .flow-step.flow-verbum { border-color: rgba(239, 68, 68, 0.4); }
        .flow-step.flow-verbum .flow-num { color: #f87171; }
        .flow-step.flow-grad,
        .flow-step.flow-adverbium { border-color: rgba(168, 85, 247, 0.6); }
        .flow-step.flow-grad .flow-num,
        .flow-step.flow-adverbium .flow-num { color: #c084fc; }
        .flow-step.flow-rest { border-color: rgba(14, 165, 233, 0.4); }
        .flow-step.flow-rest .flow-num { color: #38bdf8; }

        .flow-num {
            font-size: 0.78rem;
            font-weight: 800;
            color: #94a3b8;
            margin-bottom: 0.25rem;
        }
        .flow-step.active-target .flow-num { color: #c084fc; }
        .flow-title {
            font-size: 0.95rem;
            font-weight: 800;
            color: white;
        }
        .flow-target-tag {
            background: #9333ea;
            color: white;
            font-size: 0.7rem;
            font-weight: 800;
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
            margin-top: 0.4rem;
            display: inline-block;
            box-shadow: 0 2px 8px rgba(168, 85, 247, 0.5);
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
            border: 2.5px dashed #a855f7;
            background: rgba(168, 85, 247, 0.08);
            box-shadow: inset 0 0 15px rgba(168, 85, 247, 0.2);
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
        .sb-puzzle-slot.slot-type-grad.filled,
        .sb-puzzle-slot.slot-type-adverbium.filled,
        .sb-puzzle-slot.target-adverbium-slot.filled {
            border-color: #a855f7 !important;
            color: #e9d5ff !important;
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.25), #0f172a) !important;
        }
        .sb-puzzle-slot.slot-type-rest.filled {
            border-color: #0ea5e9 !important;
            color: #7dd3fc !important;
            background: rgba(14, 165, 233, 0.12) !important;
        }

        .slot-target-callout {
            position: absolute;
            top: -12px;
            background: #9333ea;
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
            border-color: #c084fc;
            transform: translateY(-2px);
        }
        .sb-puzzle-chip.chip-is-adv {
            border-color: #a855f7;
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.25), #334155);
            box-shadow: 0 4px 15px rgba(168, 85, 247, 0.35);
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
            border-bottom: 3px solid #a855f7;
            color: #c084fc;
            font-weight: 800;
            padding: 0 0.5rem;
            text-align: center;
        }
        .cloze-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .cloze-option-btn {
            background: #1e293b;
            color: #f8fafc;
            border: 2px solid rgba(255, 255, 255, 0.12);
            padding: 1.1rem;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .cloze-option-btn:hover {
            border-color: #c084fc;
            background: #334155;
            transform: translateY(-2px);
        }
        .cloze-option-btn.correct {
            background: #15803d !important;
            border-color: #22c55e !important;
            color: white !important;
        }
        .cloze-option-btn.wrong {
            background: #b91c1c !important;
            border-color: #ef4444 !important;
        }
        .cloze-didactic-feedback {
            background: rgba(15, 23, 42, 0.8);
            border-radius: 12px;
            padding: 1.2rem;
            font-size: 1.05rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            border-left: 4px solid #a855f7;
            color: #e2e8f0;
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'grad-hero';
    hero.innerHTML = `
        <div class="grad-hero-tag">🌡️ Felt 4 • 20 Gradsadverbier</div>
        <h1>Grad & Intensitet</h1>
        <p>Hvor meget gælder det? Lær at styre styrken og intensiteten fra <strong>0% (slet ikke)</strong> op over <strong>100% (alt for meget)</strong>, og forstå forskellen på det positive <em>meget</em> og det problematiske <em>for</em>.</p>
    `;
    viewContainer.appendChild(hero);

    // Golden Rule Banner
    const goldenBanner = document.createElement('div');
    goldenBanner.className = 'golden-rule-banner';
    goldenBanner.innerHTML = `
        <div class="rule-icon">⚖️</div>
        <div class="rule-content">
            <h4>Den afgørende forskel: "Meget" vs. "For"</h4>
            <p>
                <strong>Meget</strong> angiver høj grad (positivt eller neutralt): <em>"Kaffen er meget varm"</em> (dejlig).<br>
                <strong>For / Alt for</strong> angiver en overskredet grænse (et problem!): <em>"Kaffen er for varm"</em> (av, jeg brænder tungen!).
            </p>
            <div class="rule-pills-row">
                <span class="rule-pill pill-meget">✓ Meget = høj intensitet (ingen problem)</span>
                <span class="rule-pill pill-for">⚠️ For / Alt for = skaber et problem</span>
            </div>
        </div>
    `;
    viewContainer.appendChild(goldenBanner);

    // Navigation Tabs
    const tabsNav = document.createElement('div');
    tabsNav.className = 'adv-tabs-nav';

    const tabsConfig = [
        { id: 'tab_vrimmel', label: '1. Vrimlebilledet', icon: '🖼️' },
        { id: 'tab_vaerksted', label: '2. Aha-værkstedet', icon: '🌡️' },
        { id: 'tab_detektiv', label: '3. Grads-Detektiven', icon: '🔍' },
        { id: 'tab_saetning', label: '4. Sætningsbyggeren', icon: '🏗️' },
        { id: 'tab_kontekst', label: '5. Kontekst-testen', icon: '📝' }
    ];

    let currentTab = 'tab_vrimmel';
    const tabButtons = {};

    tabsConfig.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `adv-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.innerHTML = `<span>${t.icon}</span> ${t.label}`;
        btn.onclick = () => switchTab(t.id);
        tabButtons[t.id] = btn;
        tabsNav.appendChild(btn);
    });
    viewContainer.appendChild(tabsNav);

    // Dynamic Tab Container
    const tabContentContainer = document.createElement('div');
    tabContentContainer.className = 'tab-content-area';
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
    // TAB 1: VRIMLEBILLEDET & DET INTERAKTIVE TORV
    // ==========================================
    let activeFilter = 'alle';
    let isPureMode = false;
    let selectedWord = ADVERBIER_GRAD_DATA[18]; // Default 'for'

    function renderTabVrimmel(parent) {
        parent.innerHTML = '';

        const layout = document.createElement('div');
        layout.className = 'vrimmel-layout';

        // Left: Stage Card
        const stageCard = document.createElement('div');
        stageCard.className = 'vrimmel-stage-card';

        const controlsBar = document.createElement('div');
        controlsBar.className = 'vrimmel-controls-bar';

        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'vrimmel-filters';

        const filterOptions = [
            { id: 'alle', label: 'Alle 20' },
            { id: 'nul', label: '0% (slet ikke)' },
            { id: 'lav', label: 'Lav (10-25%)' },
            { id: 'mellem', label: 'Mellem (40-75%)' },
            { id: 'hoej', label: 'Høj (85-100%)' },
            { id: 'overskud', label: 'For meget (>100%)' }
        ];

        filterOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${activeFilter === opt.id ? 'active' : ''}`;
            btn.textContent = opt.label;
            btn.onclick = () => {
                activeFilter = opt.id;
                renderTabVrimmel(parent);
            };
            filtersDiv.appendChild(btn);
        });

        const pureBtn = document.createElement('button');
        pureBtn.className = `pure-toggle-btn ${isPureMode ? 'active' : ''}`;
        pureBtn.innerHTML = `<span>👁️</span> ${isPureMode ? 'Vis hotspots' : 'Ren illustration'}`;
        pureBtn.onclick = () => {
            isPureMode = !isPureMode;
            renderTabVrimmel(parent);
        };

        controlsBar.appendChild(filtersDiv);
        controlsBar.appendChild(pureBtn);
        stageCard.appendChild(controlsBar);

        // Stage Container
        const stage = document.createElement('div');
        stage.className = 'vrimmel-stage';

        const img = document.createElement('img');
        img.src = 'assets/adverbier_grad_vrimmel.jpg';
        img.alt = 'Grad & Intensitet Torv';
        img.className = 'vrimmel-img';
        stage.appendChild(img);

        // Hotspots
        if (!isPureMode) {
            ADVERBIER_GRAD_DATA.forEach((item, idx) => {
                if (activeFilter !== 'alle' && item.category !== activeFilter) return;

                const pin = document.createElement('div');
                pin.className = `hotspot-pin ${selectedWord.id === item.id ? 'active' : ''}`;
                pin.style.left = `${item.x}%`;
                pin.style.top = `${item.y}%`;
                pin.innerHTML = `
                    <span>${idx + 1}</span>
                    <span class="hotspot-label">${item.word}</span>
                `;

                pin.onclick = (e) => {
                    e.stopPropagation();
                    selectedWord = item;
                    speakDanish(item.word);
                    stage.querySelectorAll('.hotspot-pin').forEach(p => p.classList.remove('active'));
                    pin.classList.add('active');
                };

                stage.appendChild(pin);
            });
        }

        stageCard.appendChild(stage);
        layout.appendChild(stageCard);
        parent.appendChild(layout);
    }

    // ==========================================
    // TAB 2: AHA-VÆRKSTEDET (Skalaen & Meget vs. For)
    // ==========================================
    let vaerkstedSubTab = 'skala'; // 'skala' or 'contrast'
    let selectedLadderIdx = 6; // default: ret (75%)

    const LADDER_STEPS = [
        { pct: '0%', word: 'slet ikke', ex: 'Kaffen er slet ikke varm.', note: 'Helt kold som isvand.' },
        { pct: '15%', word: 'en smule', ex: 'Kaffen er en smule varm.', note: 'Lige akkurat lunken.' },
        { pct: '25%', word: 'lidt', ex: 'Kaffen er lidt varm.', note: 'Behageligt mild temperatur.' },
        { pct: '50%', word: 'nogenlunde', ex: 'Kaffen er nogenlunde varm.', note: 'Helt okay at drikke.' },
        { pct: '60%', word: 'ganske', ex: 'Kaffen er ganske varm.', note: 'Pæn god temperatur.' },
        { pct: '70%', word: 'temmelig', ex: 'Kaffen er temmelig varm.', note: 'Mærkbart varmere end normalt.' },
        { pct: '75%', word: 'ret', ex: 'Kaffen er ret varm.', note: 'Dejlig varm hverdagskaffe.' },
        { pct: '85%', word: 'meget', ex: 'Kaffen er meget varm.', note: 'Rigtig varm, perfekt til kaffetørsten.' },
        { pct: '95%', word: 'utroligt', ex: 'Kaffen er utroligt varm.', note: 'Damper voldsomt fra koppen.' },
        { pct: '100%', word: 'helt', ex: 'Koppen er helt fuld.', note: 'Fyldt helt til kanten.' },
        { pct: '>100%', word: 'for / alt for', ex: 'Kaffen er alt for varm!', note: '⚠️ Man kan ikke drikke den – man brænder sig!' }
    ];

    function renderTabVaerksted(parent) {
        parent.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.className = 'vaerksted-container';

        wrap.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 2.2rem; color: #e9d5ff; margin-bottom: 0.5rem;">Aha-værkstedet: Skala & Kontraster</h2>
                <p style="color: #cbd5e1; font-size: 1.1rem; max-width: 700px; margin: 0 auto;">
                    Få 100% styr på hvordan ordene skruer op og ned for styrken, og forstå den afgørende forskel på <em>meget</em> og <em>for</em>.
                </p>
            </div>

            <div class="vaerksted-tabs">
                <button class="vaerksted-subtab-btn ${vaerkstedSubTab === 'skala' ? 'active' : ''}" id="v-subtab-skala">
                    🌡️ 1. Intensitetsskalaen (0% ➔ >100%)
                </button>
                <button class="vaerksted-subtab-btn ${vaerkstedSubTab === 'contrast' ? 'active' : ''}" id="v-subtab-contrast">
                    ⚖️ 2. "Meget" vs. "For" (Det gyldne skel)
                </button>
            </div>

            <div id="vaerksted-content-slot"></div>
        `;

        const contentSlot = wrap.querySelector('#vaerksted-content-slot');

        wrap.querySelector('#v-subtab-skala').onclick = () => {
            vaerkstedSubTab = 'skala';
            renderTabVaerksted(parent);
        };
        wrap.querySelector('#v-subtab-contrast').onclick = () => {
            vaerkstedSubTab = 'contrast';
            renderTabVaerksted(parent);
        };

        if (vaerkstedSubTab === 'skala') {
            renderSkalaSubtab(contentSlot);
        } else {
            renderContrastSubtab(contentSlot);
        }

        parent.appendChild(wrap);
    }

    function renderSkalaSubtab(slot) {
        const card = document.createElement('div');
        card.className = 'termometer-lab-card';

        const step = LADDER_STEPS[selectedLadderIdx];

        card.innerHTML = `
            <h3 style="font-size: 1.45rem; color: #c084fc; margin-bottom: 0.6rem;">
                Klik på et niveau på termometret:
            </h3>
            <p style="color: #94a3b8; font-size: 1rem; margin-bottom: 1.5rem;">
                Se hvordan den samme sætning forandrer styrke og betydning:
            </p>

            <div class="termometer-ladder" id="ladder-container"></div>

            <div style="background: rgba(15, 23, 42, 0.9); border: 2px solid #a855f7; border-radius: 16px; padding: 1.5rem; max-width: 650px; margin: 0 auto; text-align: center;">
                <div style="font-size: 0.85rem; color: #c084fc; font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem;">
                    Niveau: ${step.pct} styrke
                </div>
                <div style="font-size: 1.6rem; font-weight: 900; color: white; margin-bottom: 0.8rem;" id="step-live-sentence">
                    "${step.ex}"
                </div>
                <div style="font-size: 1.05rem; color: #cbd5e1; margin-bottom: 1.2rem;">
                    ${step.note}
                </div>
                <button class="live-audio-btn" style="margin: 0 auto;" id="step-speak-btn">
                    <span>🔊</span> Hør udtale
                </button>
            </div>
        `;

        const ladderDiv = card.querySelector('#ladder-container');
        LADDER_STEPS.forEach((item, idx) => {
            const row = document.createElement('div');
            row.className = `ladder-row ${selectedLadderIdx === idx ? 'selected' : ''}`;
            row.innerHTML = `
                <span class="ladder-pct" style="color: ${idx >= 9 ? '#f87171' : idx >= 7 ? '#c084fc' : '#38bdf8'};">${item.pct}</span>
                <span class="ladder-word">${item.word}</span>
                <span class="ladder-example">"${item.ex}"</span>
            `;
            row.onclick = () => {
                selectedLadderIdx = idx;
                speakDanish(item.word);
                renderSkalaSubtab(slot);
            };
            ladderDiv.appendChild(row);
        });

        card.querySelector('#step-speak-btn').onclick = () => speakDanish(step.ex);

        slot.innerHTML = '';
        slot.appendChild(card);
    }

    function renderContrastSubtab(slot) {
        const wrap = document.createElement('div');

        wrap.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h3 style="font-size: 1.6rem; color: white; margin-bottom: 0.4rem;">Lær den store forskel, som mange tager fejl af</h3>
                <p style="color: #94a3b8; font-size: 1.05rem; max-width: 650px; margin: 0 auto;">
                    På mange sprog bruger man samme ord, men på dansk skelner vi skarpt mellem positiv overflod og et ubehageligt problem!
                </p>
            </div>

            <div class="contrast-showcase-grid">
                <!-- Case 1: Kaffen -->
                <div class="contrast-box meget">
                    <div class="contrast-header">🟢 "Meget varm"</div>
                    <div class="contrast-sentence">"Kaffen er meget varm, og jeg nyder den!"</div>
                    <div class="contrast-desc">
                        Det er en <strong>positiv eller neutral</strong> konstatering. Kaffen er varm som kaffe skal være, og man glæder sig til at drikke den.
                    </div>
                </div>
                <div class="contrast-box for">
                    <div class="contrast-header">🔴 "For varm"</div>
                    <div class="contrast-sentence">"Kaffen er for varm, så jeg brænder tungen!"</div>
                    <div class="contrast-desc">
                        En grænse er overskredet! Der er opstået et <strong>problem</strong>, og handlingen kan ikke gennemføres uden ubehag.
                    </div>
                </div>

                <!-- Case 2: Kufferten -->
                <div class="contrast-box meget">
                    <div class="contrast-header">🟢 "Meget tung"</div>
                    <div class="contrast-sentence">"Kufferten er meget tung, men jeg kan godt bære den."</div>
                    <div class="contrast-desc">
                        Høj vægt, men manden er stærk nok til at klare opgaven.
                    </div>
                </div>
                <div class="contrast-box for">
                    <div class="contrast-header">🔴 "Alt for tung"</div>
                    <div class="contrast-sentence">"Kufferten er alt for tung – hjulene knækker!"</div>
                    <div class="contrast-desc">
                        Vægten er uacceptabel og skaber en umulig situation.
                    </div>
                </div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.8); border: 2px solid #38bdf8; border-radius: 16px; padding: 1.5rem; text-align: center; max-width: 650px; margin: 0 auto;">
                <div style="font-size: 1.15rem; font-weight: 800; color: #38bdf8; margin-bottom: 0.4rem;">
                    🎯 Tommelfingerregel til hverdagen:
                </div>
                <div style="color: #e2e8f0; line-height: 1.6;">
                    Spørg dig selv: <em>"Er det et problem, eller kan det ikke lade sig gøre?"</em><br>
                    ➔ Hvis <strong>JA</strong>: Brug <strong>for</strong> eller <strong>alt for</strong>.<br>
                    ➔ Hvis <strong>NEJ</strong> (det er bare kraftigt eller dejligt): Brug <strong>meget</strong> eller <strong>virkelig</strong>.
                </div>
            </div>
        `;

        slot.innerHTML = '';
        slot.appendChild(wrap);
    }

    // ==========================================
    // TAB 3: GRADS-DETEKTIVEN
    // ==========================================
    let detektivIndex = 0;
    let detektivScore = 0;
    let detektivAnswered = false;

    const DETEKTIV_TASKS = [
        {
            id: 1,
            scene: 'Caféen • Dampende kop',
            context: 'Manden tager en slurk kaffe og råber: "Av, min tunge!"',
            prompt: 'Hvilket gradsadverbium passer bedst til mandens reaktion?',
            sentence: 'Kaffen er _____ varm, så han brænder sig.',
            options: [
                { word: 'for', hint: 'Korrekt! Der opstår en smerte/problem, så grænsen er overskredet.', isCorrect: true },
                { word: 'meget', hint: 'Ikke helt. "Meget" er neutralt. Når han brænder tungen, er den FOR varm!', isCorrect: false },
                { word: 'lidt', hint: 'Forkert. Hvis den kun var "lidt" varm, ville han slet ikke brænde sig.', isCorrect: false },
                { word: 'slet ikke', hint: 'Forkert. "Slet ikke" betyder 0% varm.', isCorrect: false }
            ],
            correctWord: 'for',
            feedbackCorrect: '✓ Lige præcis! Når det gør ondt eller ikke kan drikkes, er kaffen <strong>for</strong> varm.',
            feedbackWrong: 'Husk reglen: Når man brænder tungen, er der et problem. Derfor hedder det <strong>for</strong> varm!'
        },
        {
            id: 2,
            scene: 'Bageriet • Kagetallerkenen',
            context: 'Gæsten elskede kagen og spiste hver eneste krumme op.',
            prompt: 'Hvor tom er tallerkenen nu?',
            sentence: 'Tallerkenen er _____ tom – der er intet tilbage.',
            options: [
                { word: 'fuldstændig', hint: 'Helt rigtigt! 100% tom uden en eneste krumme.', isCorrect: true },
                { word: 'noget', hint: 'Forkert. "Noget tom" giver ikke mening, når der slet intet er tilbage.', isCorrect: false },
                { word: 'for', hint: 'Forkert. "For tom" er ulogisk i denne situation.', isCorrect: false },
                { word: 'næsten', hint: 'Næsten betyder 90%, men her er alt spist op!', isCorrect: false }
            ],
            correctWord: 'fuldstændig',
            feedbackCorrect: '✓ Flot! Når der intet er tilbage, er tallerkenen <strong>fuldstændig</strong> tom (100%).',
            feedbackWrong: 'Når alt er spist op til sidste krumme, bruger man <strong>fuldstændig</strong> tom.'
        },
        {
            id: 3,
            scene: 'Gaden • Rejsende med kuffert',
            context: 'Kufferten vejer 45 kg. Manden kan slet ikke rokke den af pletten.',
            prompt: 'Hvilket ord udtrykker den umulige vægt?',
            sentence: 'Kufferten er _____ tung til at han kan løfte den.',
            options: [
                { word: 'alt for', hint: 'Præcis! Et massivt overskud, der gør handlingen umulig.', isCorrect: true },
                { word: 'ganske', hint: 'Forkert. "Ganske" betyder pæn middel grad.', isCorrect: false },
                { word: 'lidt', hint: 'Forkert. Så ville han sagtens kunne løfte den.', isCorrect: false },
                { word: 'slet ikke', hint: 'Forkert. 0% tung passer ikke på 45 kg!', isCorrect: false }
            ],
            correctWord: 'alt for',
            feedbackCorrect: '✓ Suverænt! Når noget ikke kan løftes, er det <strong>alt for</strong> tungt.',
            feedbackWrong: 'Prøv at tænke på problemet: Han kan slet ikke løfte den, så den er <strong>alt for</strong> tung.'
        },
        {
            id: 4,
            scene: 'Terrassen • Sommerdag',
            context: 'Solen skinner mildt, og temperaturen er 22 grader. Alle smiler.',
            prompt: 'Hvordan er vejret på terrassen?',
            sentence: 'Det er _____ dejligt vejr i dag.',
            options: [
                { word: 'virkelig', hint: 'Korrekt! En stærk og positiv forstærkning: virkelig dejligt!', isCorrect: true },
                { word: 'for', hint: 'Forkert. "For dejligt" er en fejl – der er intet problem ved godt vejr!', isCorrect: false },
                { word: 'alt for', hint: 'Forkert. Samme som ovenfor – ikke et problem.', isCorrect: false },
                { word: 'slet ikke', hint: 'Forkert. Modsat hvad der sker.', isCorrect: false }
            ],
            correctWord: 'virkelig',
            feedbackCorrect: '✓ Nemlig! Når noget er skønt, bruger vi <strong>virkelig</strong> eller <strong>meget</strong>, aldrig "for".',
            feedbackWrong: 'Pas på! "For" bruges kun ved problemer. Godt vejr er <strong>virkelig</strong> dejligt!'
        },
        {
            id: 5,
            scene: 'Gaden • Kølig vind',
            context: 'Drengen i den lette sweater ryster ikke og har ingen kuldegysninger overhovedet.',
            prompt: 'Hvor meget fryser han?',
            sentence: 'Drengen fryser _____ i det milde vejr.',
            options: [
                { word: 'slet ikke', hint: 'Korrekt! 0% kulde fornemmes hos ham.', isCorrect: true },
                { word: 'temmelig', hint: 'Forkert. Temmelig betyder 70%.', isCorrect: false },
                { word: 'for meget', hint: 'Forkert. Han fryser jo overhovedet intet.', isCorrect: false },
                { word: 'en smule', hint: 'Forkert. Han har overhovedet ingen kuldefornemmelse.', isCorrect: false }
            ],
            correctWord: 'slet ikke',
            feedbackCorrect: '✓ Helt rigtigt! <strong>Slet ikke</strong> betyder absolut 0%.',
            feedbackWrong: 'Når der slet ingen kulde er, bruger vi <strong>slet ikke</strong>.'
        },
        {
            id: 6,
            scene: 'Frokost • Stærk chili',
            context: 'Børnene tager én bid og skriger efter vand med rød tunge.',
            prompt: 'Hvorfor græder børnene?',
            sentence: 'Chilien er _____ stærk for små børn.',
            options: [
                { word: 'alt for', hint: 'Lige i øjet! Børnene kan ikke tåle det.', isCorrect: true },
                { word: 'nogenlunde', hint: 'Forkert. "Nogenlunde" skaber ikke tårer og skrig.', isCorrect: false },
                { word: 'lidt', hint: 'Forkert. Lidt stærk er harmløst.', isCorrect: false },
                { word: 'ganske', hint: 'Forkert.', isCorrect: false }
            ],
            correctWord: 'alt for',
            feedbackCorrect: '✓ Rigtigt! Chilien overstiger børnenes grænse og er <strong>alt for</strong> stærk.',
            feedbackWrong: 'Børnene kan ikke spise det uden tårer, så chilien er <strong>alt for</strong> stærk.'
        },
        {
            id: 7,
            scene: 'Cykelsti • Hurtig racer',
            context: 'Landevejsrytteren træner til et løb og træder hårdt i pedalerne.',
            prompt: 'Beskriv cyklistens fart:',
            sentence: 'Han cykler _____ hurtigt på landevejen.',
            options: [
                { word: 'meget', hint: 'Korrekt! Høj fart på en kontrolleret, positiv måde.', isCorrect: true },
                { word: 'for', hint: 'Kun hvis han var ved at styrte ind i en mur! Her træner han bare godt.', isCorrect: false },
                { word: 'slet ikke', hint: 'Forkert.', isCorrect: false },
                { word: 'en smule', hint: 'Forkert.', isCorrect: false }
            ],
            correctWord: 'meget',
            feedbackCorrect: '✓ Godt spottet! Han cykler hurtigt med vilje, så han cykler <strong>meget</strong> hurtigt.',
            feedbackWrong: 'Han har fuld kontrol over cyklen, så han cykler <strong>meget</strong> hurtigt.'
        },
        {
            id: 8,
            scene: 'Torvet • Musikantens højttaler',
            context: 'Højttaleren er skruet helt op på 10. Hunden holder poterne for ørerne, og vinduerne klirrer.',
            prompt: 'Hvad er der galt med musikken?',
            sentence: 'Musikken spiller _____ højt til at man kan tale sammen.',
            options: [
                { word: 'alt for', hint: 'Korrekt! Det larmer så meget, at man ikke kan tale sammen.', isCorrect: true },
                { word: 'ret', hint: 'Forkert. "Ret" forhindrer ikke almindelig samtale.', isCorrect: false },
                { word: 'lidt', hint: 'Forkert.', isCorrect: false },
                { word: 'overhovedet ikke', hint: 'Forkert.', isCorrect: false }
            ],
            correctWord: 'alt for',
            feedbackCorrect: '✓ Perfekt! Når samtalen blokeres, er musikken <strong>alt for</strong> høj.',
            feedbackWrong: 'Det er umuligt at snakke sammen, så musikken spiller <strong>alt for</strong> højt.'
        }
    ];

    function renderTabDetektiv(container) {
        container.innerHTML = '';

        const detektivWrap = document.createElement('div');
        detektivWrap.className = 'detektiv-container';

        const task = DETEKTIV_TASKS[detektivIndex];

        detektivWrap.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <div style="font-size: 0.95rem; font-weight: 800; color: #c084fc; text-transform: uppercase;">
                    🔍 Grads-Detektiven • Opgave ${detektivIndex + 1} af ${DETEKTIV_TASKS.length}
                </div>
                <div style="font-size: 1.1rem; font-weight: 800; color: #4ade80;">
                    Score: ${detektivScore} point
                </div>
            </div>

            <div class="detektiv-card">
                <div class="detektiv-context-tag">📍 ${task.scene}</div>
                <div class="detektiv-prompt-text">${task.context}</div>
                <div class="detektiv-sentence-quote">${task.sentence.replace('_____', '<span style="color: #c084fc; text-decoration: underline;">_____</span>')}</div>

                <div class="detektiv-options-grid" id="detektiv-options"></div>
                <div class="detektiv-feedback" id="detektiv-feedback-box"></div>

                <button class="detektiv-next-btn" id="detektiv-next-btn" style="display: none;">
                    ${detektivIndex < DETEKTIV_TASKS.length - 1 ? 'Næste opgave ➔' : 'Se dit resultat 🏆'}
                </button>
            </div>
        `;

        const optionsGrid = detektivWrap.querySelector('#detektiv-options');
        const feedbackBox = detektivWrap.querySelector('#detektiv-feedback-box');
        const nextBtn = detektivWrap.querySelector('#detektiv-next-btn');

        task.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'detektiv-opt-btn';
            btn.innerHTML = `<span>${opt.word}</span> <span style="font-size: 0.85rem; color: #94a3b8;">➔</span>`;

            btn.onclick = () => {
                if (detektivAnswered) return;
                detektivAnswered = true;

                if (opt.isCorrect) {
                    btn.classList.add('correct');
                    detektivScore += 10;
                    feedbackBox.className = 'detektiv-feedback correct';
                    feedbackBox.innerHTML = task.feedbackCorrect;
                    speakDanish(opt.word);
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
            <h2 style="font-size: 2.2rem; color: #c084fc; margin-bottom: 0.5rem;">Flot klaret i Detektiven!</h2>
            <p style="font-size: 1.2rem; color: #cbd5e1; margin-bottom: 1.5rem;">
                Du fik <strong>${detektivScore}</strong> ud af <strong>${maxScore}</strong> point (${pct}%).
            </p>
            <div style="background: rgba(15, 23, 42, 0.7); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                ${pct >= 80 ? '🌟 Suverænt! Du har fuldstændig styr på forskellen mellem "meget" og "for" samt de andre gradsadverbier.' : 'God indsats! Prøv igen for at få 100% styr på nuancerne.'}
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
    // TAB 4: SÆTNINGSBYGGEREN (Faste farver: Grøn, Rød, Lilla, Blå)
    // ==========================================
    let saetningSubTab = 'builder'; // 'builder' or 'puzzle'
    let currentGradChallengeIdx = 0;
    const completedGradChallenges = new Set();

    // Sektion 1 Category Choices
    const BUILDER_CATEGORIES = {
        subjekt: [
            { text: 'Kaffen', role: 'Subjekt (drik)' },
            { text: 'Suppen', role: 'Subjekt (mad)' },
            { text: 'Kufferten', role: 'Subjekt (ting)' },
            { text: 'Chilien', role: 'Subjekt (mad)' },
            { text: 'Musikeren', role: 'Subjekt (person)' },
            { text: 'Cyklen', role: 'Subjekt (køretøj)' },
            { text: 'Løberen', role: 'Subjekt (person)' },
            { text: 'Vejret', role: 'Subjekt (fænomen)' }
        ],
        verbum: [
            { text: 'er', role: 'Verbum (tilstand)' },
            { text: 'smager', role: 'Verbum (sansning)' },
            { text: 'bliver', role: 'Verbum (forandring)' },
            { text: 'virker', role: 'Verbum (indtryk)' },
            { text: 'føles', role: 'Verbum (sansning)' },
            { text: 'kører', role: 'Verbum (handling)' },
            { text: 'spiller', role: 'Verbum (handling)' },
            { text: 'løber', role: 'Verbum (handling)' }
        ],
        grad: [
            { text: 'slet ikke', role: 'Grad (0%)' },
            { text: 'en smule', role: 'Grad (15%)' },
            { text: 'lidt', role: 'Grad (25%)' },
            { text: 'noget', role: 'Grad (40%)' },
            { text: 'ret', role: 'Grad (75%)' },
            { text: 'meget', role: 'Grad (85%)' },
            { text: 'virkelig', role: 'Grad (90%)' },
            { text: 'alt for', role: 'Grad (>100% problem)' }
        ],
        rest: [
            { text: 'varm på caféen', role: 'Adjektiv + Sted' },
            { text: 'stærk i gryden', role: 'Adjektiv + Sted' },
            { text: 'tung at bære', role: 'Adjektiv + Infinitiv' },
            { text: 'god i dag', role: 'Adjektiv + Tid' },
            { text: 'kold udenfor', role: 'Adjektiv + Sted' },
            { text: 'hurtigt på vejen', role: 'Adverbium + Sted' },
            { text: 'dyr i butikken', role: 'Adjektiv + Sted' },
            { text: 'skøn på terrassen', role: 'Adjektiv + Sted' }
        ]
    };

    let selectedBuilderWords = {
        subjekt: 'Kaffen',
        verbum: 'er',
        grad: 'alt for',
        rest: 'varm på caféen'
    };

    // Sektion 2 Challenge Tasks (6 varierede opgaver)
    const GRAD_CHALLENGE_TASKS = [
        {
            id: 1,
            context: 'Manden brænder sin tunge på den rygende kaffe på caféen.',
            subjekt: 'Kaffen',
            verbum: 'er',
            rest: 'varm at drikke',
            questionPrompt: 'Hvilket gradsadverbium passer til, at kaffen brænder tungen?',
            correctAdv: 'alt for',
            distractors: ['slet ikke', 'en smule', 'ganske'],
            pedagogyNote: 'Kaffen brænder tungen, så det skaber et problem: "alt for varm"!',
            advWord: 'alt for',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Gradsadverbiets placering: Direkte foran adjektivet "varm"',
            structureNote: 'Gradsadverbiet modificerer adjektivet og står på plads 3.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '☕', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Gradsadverbium', icon: '🌡️', type: 'grad', isTarget: true, tag: 'HER STÅR GRADEN!' },
                { num: '4. plads', title: 'Hvad/Hvordan?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem/Hvad?', '2. Handling/Er?', '3. Hvor meget? ⭐', '4. Hvordan ellers?'],
            roles: ['[Subjekt]', '[Verbum]', '[Gradsadverbium]', '[Adjektivled]'],
            chips: ['Kaffen', 'er', 'alt for', 'varm at drikke'],
            correctSentence: ['Kaffen', 'er', 'alt for', 'varm at drikke']
        },
        {
            id: 2,
            context: 'Gæsten spiste hele jordbærkagen op, så intet er tilbage på fadet.',
            subjekt: 'Kagefadet',
            verbum: 'er',
            rest: 'tomt efter festen',
            questionPrompt: 'Hvor tomt er fadet, når absolut intet er tilbage?',
            correctAdv: 'fuldstændig',
            distractors: ['lidt', 'for', 'næsten ikke'],
            pedagogyNote: 'Når 100% er spist, er fadet fuldstændig tomt!',
            advWord: 'fuldstændig',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Gradsadverbiets placering: Direkte foran adjektivet "tomt"',
            structureNote: '"Fuldstændig" angiver 100% tilstand foran adjektivet.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '🍰', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Gradsadverbium', icon: '🌡️', type: 'grad', isTarget: true, tag: 'HER STÅR GRADEN!' },
                { num: '4. plads', title: 'Hvordan?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvad?', '2. Handling/Er?', '3. Hvor meget? ⭐', '4. Hvordan?'],
            roles: ['[Subjekt]', '[Verbum]', '[Gradsadverbium]', '[Adjektivled]'],
            chips: ['Kagefadet', 'er', 'fuldstændig', 'tomt efter festen'],
            correctSentence: ['Kagefadet', 'er', 'fuldstændig', 'tomt efter festen']
        },
        {
            id: 3,
            context: 'Den rejsende sveder med den gigantiske kuffert på 40 kilo.',
            subjekt: 'Kufferten',
            verbum: 'er',
            rest: 'tung for ham',
            questionPrompt: 'Kufferten kan næsten ikke løftes. Hvor tung er den?',
            correctAdv: 'uhyre',
            distractors: ['slet ikke', 'lidt', 'nogenlunde'],
            pedagogyNote: 'Voldsomt tung: "uhyre tung" udtrykker den enorme vægt!',
            advWord: 'uhyre',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Gradsadverbiets placering: Direkte foran adjektivet "tung"',
            structureNote: '"Uhyre" forstærker adjektivet kraftigt.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '🧳', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Gradsadverbium', icon: '🌡️', type: 'grad', isTarget: true, tag: 'HER STÅR GRADEN!' },
                { num: '4. plads', title: 'For hvem?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvad?', '2. Er?', '3. Hvor meget? ⭐', '4. For hvem?'],
            roles: ['[Subjekt]', '[Verbum]', '[Gradsadverbium]', '[Præpositionsled]'],
            chips: ['Kufferten', 'er', 'uhyre', 'tung for ham'],
            correctSentence: ['Kufferten', 'er', 'uhyre', 'tung for ham']
        },
        {
            id: 4,
            context: 'Musikeren spiller rigtig dejlig jazz, og gæsterne klapper med.',
            subjekt: 'Musikeren',
            verbum: 'spiller',
            rest: 'godt på torvet',
            questionPrompt: 'Musikeren er dygtig. Hvordan spiller han?',
            correctAdv: 'ret',
            distractors: ['alt for', 'slet ikke', 'for'],
            pedagogyNote: 'En positiv og hverdagsagtig forstærker: "spiller ret godt"!',
            advWord: 'ret',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Gradsadverbium foran et mådesadverbium ("godt")',
            structureNote: '"Ret" modificerer adverbiet "godt" og står på 3. plads.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '🎷', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Gradsadverbium', icon: '🌡️', type: 'grad', isTarget: true, tag: 'HER STÅR GRADEN!' },
                { num: '4. plads', title: 'Hvor?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem?', '2. Handling?', '3. Hvor meget? ⭐', '4. Hvordan og hvor?'],
            roles: ['[Subjekt]', '[Verbum]', '[Gradsadverbium]', '[Adverbium + Sted]'],
            chips: ['Musikeren', 'spiller', 'ret', 'godt på torvet'],
            correctSentence: ['Musikeren', 'spiller', 'ret', 'godt på torvet']
        },
        {
            id: 5,
            context: 'Drengen har en god trøje på og har det behageligt i den milde brise.',
            subjekt: 'Drengen',
            verbum: 'fryser',
            rest: 'i det milde vejr',
            questionPrompt: 'Han har det varmt og rart. Hvor meget fryser han?',
            correctAdv: 'slet ikke',
            distractors: ['for meget', 'alt for', 'temmelig'],
            pedagogyNote: 'Absolut 0% kulde: "fryser slet ikke"!',
            advWord: 'slet ikke',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Benægtende gradsadverbium efter verbet',
            structureNote: '"Slet ikke" står lige efter det finitte verbum som centraladverbium.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '👤', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Gradsadverbium', icon: '🌡️', type: 'grad', isTarget: true, tag: 'HER STÅR GRADEN!' },
                { num: '4. plads', title: 'Hvor/Hvornår?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvem?', '2. Handling?', '3. Hvor meget? ⭐', '4. I hvilket vejr?'],
            roles: ['[Subjekt]', '[Verbum]', '[Gradsadverbium]', '[Præpositionsled]'],
            chips: ['Drengen', 'fryser', 'slet ikke', 'i det milde vejr'],
            correctSentence: ['Drengen', 'fryser', 'slet ikke', 'i det milde vejr']
        },
        {
            id: 6,
            context: 'Børnene fik chili på tungen, og de skriger efter et glas koldt mælk.',
            subjekt: 'Maden',
            verbum: 'smager',
            rest: 'stærkt for børnene',
            questionPrompt: 'Chilien overskrider grænsen. Hvor stærkt smager maden?',
            correctAdv: 'for',
            distractors: ['lidt', 'ganske', 'slet ikke'],
            pedagogyNote: 'Det er for meget for børnene: "smager for stærkt"!',
            advWord: 'for',
            advSlotIndex: 2,
            structureType: 'central',
            structureTitle: 'Gradsadverbiet "for" foran adverbiet "stærkt"',
            structureNote: '"For" angiver det problematiske overskud.',
            flowSteps: [
                { num: '1. plads', title: 'Subjekt', icon: '🍲', type: 'subjekt', isTarget: false },
                { num: '2. plads', title: 'Verbum', icon: '⚡', type: 'verbum', isTarget: false },
                { num: '3. plads', title: 'Gradsadverbium', icon: '🌡️', type: 'grad', isTarget: true, tag: 'HER STÅR GRADEN!' },
                { num: '4. plads', title: 'For hvem?', icon: '📍', type: 'rest', isTarget: false }
            ],
            slots: ['1. Hvad?', '2. Sansning?', '3. Hvor meget? ⭐', '4. For hvem?'],
            roles: ['[Subjekt]', '[Verbum]', '[Gradsadverbium]', '[Adverbium + Restled]'],
            chips: ['Maden', 'smager', 'for', 'stærkt for børnene'],
            correctSentence: ['Maden', 'smager', 'for', 'stærkt for børnene']
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
        subTab1Btn.innerHTML = `<span>🏗️</span> 1. Udforsk sætningen (Byg selv)`;

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
                    <h3 style="font-size: 1.7rem; color: white; margin-bottom: 0.4rem;">Byg dine egne sætninger med gradsadverbier</h3>
                    <p style="color: #94a3b8; font-size: 1.05rem; max-width: 650px; margin: 0 auto;">
                        Vælg ét element fra hver række herunder. Læg mærke til hjælpespørgsmålene, og lyt til hvordan styrken ændrer sig!
                    </p>
                </div>

                <div class="grammar-legend-bar">
                    <div class="grammar-legend-item"><span class="legend-chip chip-legend-subjekt"></span> <span>1. Subjekt (Grøn)</span></div>
                    <div class="grammar-legend-item"><span class="legend-chip chip-legend-verbum"></span> <span>2. Verbum (Rød)</span></div>
                    <div class="grammar-legend-item"><span class="legend-chip chip-legend-grad"></span> <span>3. Gradsadverbium (Lilla)</span></div>
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

                    <!-- Row 2: Hvad laver/er personen? -->
                    <div class="category-row-card cat-row-verbum">
                        <div class="category-row-header">
                            <div class="cat-badge-title cat-title-verbum">
                                <span>⚡</span> 2. Hvad laver eller er personen eller tingen?
                            </div>
                            <span class="cat-grammar-role badge-verbum">[Verbum / Udsagnsled]</span>
                        </div>
                        <div class="category-options-flex" id="chips-verbum"></div>
                    </div>

                    <!-- Row 3: Hvor meget? -->
                    <div class="category-row-card cat-row-grad">
                        <div class="category-row-header">
                            <div class="cat-badge-title cat-title-grad">
                                <span>🌡️</span> 3. Hvor meget eller i hvor høj grad? (Gradsadverbium)
                            </div>
                            <span class="cat-grammar-role badge-grad">[Gradsadverbium]</span>
                        </div>
                        <div class="category-options-flex" id="chips-grad"></div>
                    </div>

                    <!-- Row 4: Hvad eller hvordan ellers? -->
                    <div class="category-row-card cat-row-rest">
                        <div class="category-row-header">
                            <div class="cat-badge-title cat-title-rest">
                                <span>📍</span> 4. Hvad, hvordan eller hvor ellers?
                            </div>
                            <span class="cat-grammar-role badge-rest">[Adjektivled / Restled]</span>
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

            const categories = ['subjekt', 'verbum', 'grad', 'rest'];
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
                        <span class="live-word-grad">${selectedBuilderWords.grad}</span>
                        <span class="live-word-rest">${selectedBuilderWords.rest}.</span>
                    `;
                }
            }

            updateLiveSentence();

            freeContainer.querySelector('#live-audio-speak-btn').onclick = () => {
                const full = `${selectedBuilderWords.subjekt} ${selectedBuilderWords.verbum} ${selectedBuilderWords.grad} ${selectedBuilderWords.rest}.`;
                speakDanish(full);
            };
        }

        // ==========================================
        // SEKTION 2: PUSLEOPGAVEN (UD FORDRING)
        // ==========================================
        function setupChallengeSection() {
            challengeContainer.innerHTML = '';

            const task = GRAD_CHALLENGE_TASKS[currentGradChallengeIdx];

            // Header with pills
            const header = document.createElement('div');
            header.className = 'sb-task-header';

            const titleDiv = document.createElement('div');
            titleDiv.innerHTML = `
                <div style="font-size: 0.85rem; color: #c084fc; font-weight: 800; text-transform: uppercase;">
                    Udfordring ${currentGradChallengeIdx + 1} af ${GRAD_CHALLENGE_TASKS.length}
                </div>
                <h3 style="font-size: 1.5rem; color: white; margin: 0.2rem 0;">Vælg gradsadverbiet & saml puslespillet</h3>
            `;
            header.appendChild(titleDiv);

            const pills = document.createElement('div');
            pills.className = 'sb-task-pills';
            GRAD_CHALLENGE_TASKS.forEach((_, idx) => {
                const pill = document.createElement('div');
                pill.className = `sb-task-pill ${idx === currentGradChallengeIdx ? 'active' : ''} ${completedGradChallenges.has(idx) ? 'done' : ''}`;
                pill.textContent = idx + 1;
                pill.onclick = () => {
                    currentGradChallengeIdx = idx;
                    setupChallengeSection();
                };
                pills.appendChild(pill);
            });
            header.appendChild(pills);
            challengeContainer.appendChild(header);

            // Context card with visual sentence preview and 4 question chips
            const contextCard = document.createElement('div');
            contextCard.className = 'sb-context-card';

            const advIdx = (typeof task.advSlotIndex === 'number') ? task.advSlotIndex : 2;

            // Target sentence preview
            const sentenceHtml = task.correctSentence.map((word, idx) => {
                if (idx === advIdx) {
                    return `<span class="sb-sentence-blank" id="sb-live-adv-blank">________</span>`;
                }
                const isLast = (idx === task.correctSentence.length - 1);
                return `<span class="sb-sentence-word">${word}${isLast ? '.' : ''}</span>`;
            }).join(' ');

            // Helper question chips
            const chipsHtml = task.correctSentence.map((word, idx) => {
                if (idx === advIdx) {
                    return `
                        <div class="sb-context-chip grad target-placeholder" id="sb-context-chip-adv" title="Her skal gradsadverbiet stå!">
                            <span class="sb-chip-role">3. HVOR MEGET? (GRAD) ⭐</span>
                            <span id="sb-chip-adv-val" style="font-weight: 800; letter-spacing: 2px;">________</span>
                        </div>
                    `;
                }
                const chipType = (idx === 0) ? 'subjekt' : (idx === 1) ? 'verbum' : 'rest';
                const roleUpper = (idx === 0) ? '1. HVEM/HVAD?' : (idx === 1) ? '2. ER/HANDLING?' : '4. HVORDAN/HVOR?';
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
                    <div class="sb-target-sentence-label">Sætning med tom plads til gradsadverbiet:</div>
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
                <div style="font-size: 0.85rem; color: #c084fc; font-weight: 700; text-transform: uppercase; margin-bottom: 0.3rem;">
                    Trin 1: Vælg det rigtige gradsadverbium
                </div>
                <div class="sb-question-text">${task.questionPrompt}</div>
            `;
            challengeContainer.appendChild(qBox);

            // Options grid
            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'sb-options-grid';

            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'cloze-didactic-feedback';
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
                    if (opt === task.correctAdv) {
                        optionsGrid.querySelectorAll('.sb-option-btn').forEach(b => {
                            b.disabled = true;
                            if (b.textContent === opt) b.classList.add('correct');
                        });

                        // Update blank slot
                        const blankSpan = challengeContainer.querySelector('#sb-live-adv-blank');
                        if (blankSpan) {
                            blankSpan.textContent = opt;
                            blankSpan.classList.add('filled');
                        }

                        // Update context chip
                        const advChipVal = challengeContainer.querySelector('#sb-chip-adv-val');
                        if (advChipVal) {
                            advChipVal.textContent = opt;
                            advChipVal.style.letterSpacing = 'normal';
                        }
                        const advChip = challengeContainer.querySelector('#sb-context-chip-adv');
                        if (advChip) {
                            advChip.classList.add('chip-filled');
                        }

                        // Feedback
                        feedbackDiv.style.display = 'block';
                        feedbackDiv.style.borderLeftColor = '#22c55e';
                        feedbackDiv.innerHTML = `
                            <strong style="color: #4ade80;">✓ Rigtigt valgt!</strong>
                            <p style="margin: 0.4rem 0 0 0;">${task.pedagogyNote}</p>
                        `;
                        speakDanish(opt);

                        // Trigger Step 2: Puslespillet
                        renderGradPuzzleStep(puzzleContainer, task);
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

        // Step 2: Puslespil i udfordringen
        function renderGradPuzzleStep(puzContainer, task) {
            puzContainer.innerHTML = `
                <div class="sb-puzzle-title">
                    <span>🧩</span> Trin 2: Puslespillet – Saml hele sætningen!
                </div>
                <div class="sb-puzzle-desc">
                    Læg mærke til den fremhævede plads med <strong>⭐</strong> – der skal gradsadverbiet placeres. Klik på brikkerne i den rigtige rækkefølge:
                </div>

                <!-- Grafisk ordstillings-guide -->
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
                                ${step.isTarget ? '<div class="flow-target-tag">HER STÅR GRADEN!</div>' : ''}
                            </div>
                            ${sIdx < task.flowSteps.length - 1 ? '<div class="flow-arrow">➔</div>' : ''}
                        `).join('')}
                    </div>
                </div>

                <div class="sb-puzzle-slots" id="grad-puzzle-slots-grid"></div>
                <div class="sb-puzzle-chips" id="grad-puzzle-chips-pool"></div>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <button class="reset-slots-btn" id="grad-puzzle-reset-btn">↺ Nulstil brikker</button>
                    <div id="grad-puzzle-status" style="font-weight: 700; color: #22c55e;"></div>
                </div>
            `;

            const slotsGrid = puzContainer.querySelector('#grad-puzzle-slots-grid');
            const chipsPool = puzContainer.querySelector('#grad-puzzle-chips-pool');
            const resetBtn = puzContainer.querySelector('#grad-puzzle-reset-btn');
            const statusEl = puzContainer.querySelector('#grad-puzzle-status');

            let placedWords = [];
            const shuffledChips = [...task.chips].sort(() => Math.random() - 0.5);

            function updatePuzzleUI() {
                slotsGrid.innerHTML = '';
                task.slots.forEach((slotLabel, idx) => {
                    const slot = document.createElement('div');
                    const isAdvSlot = (idx === task.advSlotIndex);
                    const isFilled = Boolean(placedWords[idx]);
                    const stepType = (task.flowSteps && task.flowSteps[idx]) ? task.flowSteps[idx].type : (idx === 0 ? 'subjekt' : idx === 1 ? 'verbum' : isAdvSlot ? 'grad' : 'rest');

                    slot.className = `sb-puzzle-slot slot-type-${stepType} ${isFilled ? 'filled' : ''} ${isAdvSlot ? 'target-adverbium-slot' : ''}`;

                    if (isAdvSlot) {
                        const callout = document.createElement('div');
                        callout.className = 'slot-target-callout';
                        callout.innerHTML = isFilled ? '✓ Gradsadverbium' : '⭐ Gradens plads ⭐';
                        slot.appendChild(callout);
                    }

                    if (isFilled) {
                        const wordSpan = document.createElement('span');
                        wordSpan.style.marginTop = isAdvSlot ? '0.45rem' : '0';
                        wordSpan.style.fontWeight = '800';
                        if (isAdvSlot) wordSpan.style.color = '#c084fc';
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
                        if (isAdvSlot) hintSpan.style.color = '#c084fc';
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
                        completedGradChallenges.add(currentGradChallengeIdx);
                        statusEl.innerHTML = `
                            <span style="color: #22c55e; margin-right: 1rem;">🎉 Perfekt samlet!</span>
                            <button class="detektiv-next-btn" style="display: inline-block; padding: 0.6rem 1.4rem;" id="grad-task-next-btn">
                                ${currentGradChallengeIdx < GRAD_CHALLENGE_TASKS.length - 1 ? 'Næste opgave ➔' : 'Gå til Kontekst-testen 🏆'}
                            </button>
                        `;
                        speakDanish(placedWords.join(' '));

                        puzContainer.querySelector('#grad-task-next-btn').onclick = () => {
                            if (currentGradChallengeIdx < GRAD_CHALLENGE_TASKS.length - 1) {
                                currentGradChallengeIdx++;
                                setupChallengeSection();
                            } else {
                                switchTab('tab_kontekst');
                            }
                        };
                    } else {
                        statusEl.innerHTML = `<span style="color: #ef4444;">Næsten rigtigt! Prøv at bytte rundt på brikkerne.</span>`;
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

        // Initialize default
        if (saetningSubTab === 'builder') {
            setupFreeBuilder();
        } else {
            setupChallengeSection();
        }

        parent.appendChild(container);
    }

    // ==========================================
    // TAB 5: KONTEKST TESTEN (14 Varierede hverdagssituationer)
    // ==========================================
    let kontekstIndex = 0;
    let kontekstScore = 0;
    let kontekstAnswered = false;

    const KONTEKST_TASKS = [
        {
            id: 1,
            scene: 'Køkkenet • Madlavning',
            sentence: 'Pas på med chilien! Hvis du putter for meget i, bliver saucen _____ stærk til børnene.',
            options: ['alt for', 'slet ikke', 'en smule', 'ganske'],
            correct: 'alt for',
            feedback: '"Alt for" udtrykker at grænsen er overskredet og gør maden uspiselig for børnene.'
        },
        {
            id: 2,
            scene: 'Tøjbutikken • Prøverum',
            sentence: 'Disse bukser strammer over maven og kan ikke lynes. De er desværre _____ små.',
            options: ['for', 'meget', 'ret', 'ganske'],
            correct: 'for',
            feedback: 'Når tøjet ikke kan lukkes, er der et problem. Derfor hedder det "for små"!'
        },
        {
            id: 3,
            scene: 'Fødselsdag • Kagen',
            sentence: 'Konditoren har gjort sig umage. Kagen smager _____ godt, og alle roser den.',
            options: ['virkelig', 'for', 'alt for', 'næsten ikke'],
            correct: 'virkelig',
            feedback: '"Virkelig godt" er den ægte positive forstærker. "For godt" ville være forkert her.'
        },
        {
            id: 4,
            scene: 'Biografen • Lydniveau',
            sentence: 'Vi kan ikke høre hvad de siger på lærredet. Lyden er skruet _____ lavt ned.',
            options: ['alt for', 'meget', 'nogenlunde', 'ganske'],
            correct: 'alt for',
            feedback: 'Når man slet ikke kan høre skuespillerne, er lyden "alt for" lav.'
        },
        {
            id: 5,
            scene: 'Vejret • Forårsdag',
            sentence: 'Vejret er mildt, og solen titter frem. Det blæser kun _____ i dag.',
            options: ['en smule', 'alt for', 'fuldstændig', 'totalt'],
            correct: 'en smule',
            feedback: '"En smule" angiver en svag, ubetydelig vindstyrke.'
        },
        {
            id: 6,
            scene: 'Bussen • Morgentrafik',
            sentence: 'Der er ikke ét eneste ledigt sæde, og folk står tæt. Bussen er _____ fyldt.',
            options: ['fuldstændig', 'lidt', 'en smule', 'for'],
            correct: 'fuldstændig',
            feedback: '"Fuldstændig fyldt" angiver 100% belægning i bussen.'
        },
        {
            id: 7,
            scene: 'Sprogskolen • Lektier',
            sentence: 'Teksten var overkommelig, og jeg forstod næsten alle ord. Den var _____ let.',
            options: ['ret', 'alt for', 'slet ikke', 'for'],
            correct: 'ret',
            feedback: '"Ret let" er en naturlig hverdagsforstærker for noget, der går godt.'
        },
        {
            id: 8,
            scene: 'Supermarkedet • Tilbud',
            sentence: 'En liter mælk koster kun 4 kroner i dag. Det er _____ billigt!',
            options: ['utroligt', 'for', 'slet ikke', 'næsten ikke'],
            correct: 'utroligt',
            feedback: '"Utroligt billigt" udtrykker stor overraskelse og begejstring over den lave pris.'
        },
        {
            id: 9,
            scene: 'Lægen • Ventesal',
            sentence: 'Lægen var forsinket, så jeg kom _____ for sent på arbejde i morges.',
            options: ['temmelig', 'slet ikke', 'en smule', 'overhovedet ikke'],
            correct: 'temmelig',
            feedback: '"Temmelig meget for sent" angiver en mærkbar forsinkelse.'
        },
        {
            id: 10,
            scene: 'Caféen • Sukker i teen',
            sentence: 'Tjeneren kom 5 teskefulde sukker i koppen. Teen er nu _____ sød og klam.',
            options: ['alt for', 'lidt', 'ganske', 'nogenlunde'],
            correct: 'alt for',
            feedback: 'Fem teskefulde er alt for meget og ødelægger smagen.'
        },
        {
            id: 11,
            scene: 'Træning • Fodbold',
            sentence: 'Målmanden reddede bolden på målstregen. Bolden var _____ inde!',
            options: ['næsten', 'alt for', 'slet ikke', 'for'],
            correct: 'næsten',
            feedback: '"Næsten inde" betyder at den manglede få centimeter (ca. 95%).'
        },
        {
            id: 12,
            scene: 'Lejligheden • Rengøring',
            sentence: 'Vi har vasket gulv og støvet af i tre timer. Stuen er nu _____ ren.',
            options: ['helt', 'for', 'alt for', 'næsten ikke'],
            correct: 'helt',
            feedback: '"Helt ren" betyder 100% ren uden støv eller snavs.'
        },
        {
            id: 13,
            scene: 'Mødet • Tidsfornemmelse',
            sentence: 'Mødet trak ud, så jeg nåede _____ mit tog hjem.',
            options: ['knap / næsten ikke', 'alt for', 'fuldstændig', 'meget'],
            correct: 'knap / næsten ikke',
            feedback: '"Næsten ikke" / "knap" angiver, at det lige akkurat lykkedes med nød og næppe.'
        },
        {
            id: 14,
            scene: 'Vinterdag • Frakke',
            sentence: 'Jeg har min varme uldfrakke på, så jeg fryser _____ på cykelturen.',
            options: ['slet ikke', 'alt for', 'for', 'temmelig'],
            correct: 'slet ikke',
            feedback: 'Uldfrakken holder kulden 100% væk, så han fryser "slet ikke" (0%).'
        }
    ];

    function renderTabKontekst(container) {
        container.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.className = 'kontekst-container';

        const task = KONTEKST_TASKS[kontekstIndex];

        wrap.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <div style="font-size: 0.95rem; font-weight: 800; color: #c084fc; text-transform: uppercase;">
                    📝 Kontekst-testen • Opgave ${kontekstIndex + 1} af ${KONTEKST_TASKS.length}
                </div>
                <div style="font-size: 1.1rem; font-weight: 800; color: #4ade80;">
                    Score: ${kontekstScore} point
                </div>
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
            <h2 style="font-size: 2.2rem; color: #c084fc; margin-bottom: 0.5rem;">Kontekst-testen er gennemført!</h2>
            <p style="font-size: 1.2rem; color: #cbd5e1; margin-bottom: 1.5rem;">
                Du opnåede <strong>${kontekstScore}</strong> ud af <strong>${maxScore}</strong> point (${pct}%).
            </p>
            <div style="background: rgba(15, 23, 42, 0.7); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                ${pct >= 80 ? '🌟 Suverænt! Du mestrer nu gradsadverbierne og ved præcis, hvornår noget er for meget, helt perfekt eller bare en smule.' : 'Godt forsøgt! Tag testen en gang til for at få fuldt udbytte af nuancerne.'}
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
    renderActiveTab();
    container.appendChild(viewContainer);
}
