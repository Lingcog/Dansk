import { baseUrl } from '../utils/config.js';

function speakDanish(text, rate = 0.92) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'da-DK';
    utter.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const daVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('da'));
    if (daVoice) utter.voice = daVoice;
    window.speechSynthesis.speak(utter);
}

const FUNDAMENT_HOTSPOTS = [
    {
        id: 'tydeligvis',
        side: 'left',
        x: 38,
        y: 30,
        badge: 'Klippegrund • 95%',
        word: 'tydeligvis',
        title: 'Tydeligvis — synligt bevis lige foran dig',
        sentence: 'Fyret lyser stadig, så strømmen er tydeligvis ikke gået.',
        translation: {
            en: 'evidently / clearly (visible proof)',
            de: 'offensichtlich',
            es: 'evidentemente',
            ar: 'من الواضح (بدليل مرئي)'
        },
        klippeDesc: 'Du kan bogstaveligt talt se tegnene med dine egne øjne (våde sko, lys i vinduet, smil).',
        isDesc: 'Uden synlige tegn falder du tilbage på gæt som "formentlig" eller "måske".',
        aha: 'Brug "tydeligvis", når du peger på konkrete spor i virkeligheden. Ordet står normalt i centralfeltet lige efter det første verbum: "Han har tydeligvis sovet godt."'
    },
    {
        id: 'sikkert',
        side: 'left',
        x: 40,
        y: 50,
        badge: 'Klippegrund • 85%',
        word: 'sikkert',
        title: 'Sikkert — rolig og fast overbevisning',
        sentence: 'Stien er bred og tør, så vi når sikkert frem før mørket.',
        translation: {
            en: 'surely / probably (very confident)',
            de: 'sicherlich / bestimmt',
            es: 'seguramente',
            ar: 'بالتأكيد / على الأرجح بقوة'
        },
        klippeDesc: 'Som adverbium betyder "sikkert", at du føler dig tryg og overbevist (ca. 85–90% sikker).',
        isDesc: 'Pas på en klassisk fælde: "Det er sikkert" = 100% garanti, men "Han kommer sikkert" = stærk tillid ("probably / surely").',
        aha: 'Lyt til trykket: "Han kommer sikkert" (tryk på kommer) = beroligende forventning. "Det er helt sikkert!" (tryk på sikkert) = 100% klippegrund uden tvivl.'
    },
    {
        id: 'selvfoelgelig',
        side: 'left',
        x: 59,
        y: 56,
        badge: 'Klippegrund • 100%',
        word: 'selvfølgelig',
        title: 'Selvfølgelig — så indlysende at det giver sig selv',
        sentence: 'Der står et klart skilt her, så vi følger selvfølgelig pilen.',
        translation: {
            en: 'of course / naturally',
            de: 'selbstverständlich / natürlich',
            es: 'por supuesto',
            ar: 'بالطبع / من البديهي'
        },
        klippeDesc: 'Følger automatisk af logik, aftale eller almindelig høflighed. Svaret siger sig selv.',
        isDesc: 'Hvis noget skal forklares eller forhandles først, er det ikke "selvfølgelig" — så er grunden mere usikker.',
        aha: '"Selvfølgelig!" som enstavelses-svar betyder et varmt og imødekommende "ja, det siger sig selv". Som adverbium kan det stå først med V2: "Selvfølgelig hjælper jeg dig."'
    },
    {
        id: 'enighed',
        side: 'left',
        x: 79,
        y: 58,
        badge: 'Klippegrund • 90%',
        word: 'helt sikkert',
        title: 'Helt sikkert — fælles fast grund under fødderne',
        sentence: 'De to venner nikker; de husker helt sikkert aftalen fra i går.',
        translation: {
            en: 'definitely / for sure',
            de: 'ganz sicher',
            es: 'sin duda / seguro',
            ar: 'بكل تأكيد'
        },
        klippeDesc: 'Når du lægger "helt" foran "sikkert", fjerner du den lille usikkerhed i ordet "sikkert".',
        isDesc: 'Modsætningen er "måske" eller "næppe", hvor skuldrene trækkes op.',
        aha: 'Vil du give 100% garanti i daglig tale, så sig "helt sikkert" eller "bestemt" frem for bare "sikkert".'
    },
    {
        id: 'formentlig',
        side: 'right',
        x: 61,
        y: 38,
        badge: 'Gyngende grund • 65%',
        word: 'formentlig',
        title: 'Formentlig — broen gynger, men bærer nok',
        sentence: 'Hængebroen knirker lidt, men den holder formentlig også i dag.',
        translation: {
            en: 'presumably / supposedly',
            de: 'vermutlich',
            es: 'presumiblemente / seguramente',
            ar: 'على ما يبدو / يُفترض'
        },
        klippeDesc: 'Modsat klippegrund mangler du endegyldigt bevis, men du danner et kvalificeret skøn.',
        isDesc: '"Formentlig" ligger lidt lavere i sikkerhed end "sandsynligvis" og bruges meget i nyheder, vejrmeldinger og arbejde.',
        aha: 'Tænk på "formode / mene": du danner en forsigtig mening. I avisdansk ser du ofte "formentlig" foran det sidste fakta, der mangler.'
    },
    {
        id: 'sandsynligvis',
        side: 'right',
        x: 48,
        y: 36,
        badge: 'Gyngende grund • 75%',
        word: 'sandsynligvis / antagelig',
        title: 'Sandsynligvis & antagelig — overvægt for ja',
        sentence: 'Skyerne trækker sammen over kløften, så det regner sandsynligvis snart.',
        translation: {
            en: 'probably / most likely',
            de: 'wahrscheinlich / voraussichtlich',
            es: 'probablemente',
            ar: 'على الأرجح / من المحتمل جدًا'
        },
        klippeDesc: 'På klippen siger man "tydeligvis". I den gyngende tåge siger man "sandsynligvis" (stærk sandsynlighed) eller mere formelt "antagelig".',
        isDesc: 'Du kan ikke udelukke det modsatte, så du holder lidt fast i rækværket.',
        aha: '"Sandsynligvis" (hverdag og medier) og "antagelig" (lidt mere formelt/skriftligt) peger begge på ca. 60–75% chance for, at noget sker.'
    },
    {
        id: 'maaske',
        side: 'right',
        x: 36,
        y: 72,
        badge: 'Tynd is • 40%',
        word: 'måske / muligvis',
        title: 'Måske & muligvis — et forsigtigt skridt på revnet is',
        sentence: 'Isen knager under staven; måske kan vi gå over, eller muligvis må vi vende om.',
        translation: {
            en: 'maybe / possibly',
            de: 'vielleicht / möglicherweise',
            es: 'quizás / posiblemente',
            ar: 'ربما / من المحتمل'
        },
        klippeDesc: 'Ingen garanti overhovedet — vægten er næsten 50/50.',
        isDesc: '"Måske" er det mest almindelige mundtlige ord for åben tvivl. "Muligvis" lyder lidt mere forsigtigt og formelt.',
        aha: 'Vigtig ordstillings-regel (DU2/DU3): "Måske" kan stå først uden at bytte subjekt og verbum ("Måske kommer hun"), men ofte bruger danskere alligevel V2 ("Måske er hun syg"). "Muligvis" kræver altid V2 efter forfelt!'
    },
    {
        id: 'naeppe',
        side: 'right',
        x: 89,
        y: 64,
        badge: 'Tynd is • 15%',
        word: 'næppe',
        title: 'Næppe — isen er for tynd til at bære',
        sentence: 'Tågen er tæt og paraplyen lukket; han når næppe frem før solnedgang.',
        translation: {
            en: 'hardly / unlikely to',
            de: 'kaum / wohl kaum',
            es: 'difícilmente / es poco probable',
            ar: 'بالكاد / من غير المرجح أبدًا'
        },
        klippeDesc: 'Modpol til klippegrunden: "næppe" indeholder allerede et indbygget "nej" i sig.',
        isDesc: 'Betyder "sandsynligvis ikke" (kun ca. 10–15% chance). Man bruger IKKE "ikke" sammen med "næppe"!',
        aha: 'Kæmpe aha-regel: Sig "Han kommer næppe" — aldrig *"Han kommer næppe ikke"! Ordet "næppe" gør allerede sætningen negativ.'
    }
];

const THERMOMETER_LEVELS = [
    {
        id: 'selvfoelgelig',
        word: 'selvfølgelig',
        percent: 100,
        zone: 'klippe',
        zoneLabel: 'Klippegrund (fast vished)',
        groundIcon: '🪨',
        color: '#38bdf8',
        nuance: '100% — Det siger sig selv. Helt naturligt, logisk eller allerede aftalt.',
        canFrontNoInversion: false,
        canFrontV2: true,
        translations: 'EN: of course • DE: selbstverständlich • ES: por supuesto'
    },
    {
        id: 'tydeligvis',
        word: 'tydeligvis',
        percent: 95,
        zone: 'klippe',
        zoneLabel: 'Klippegrund (synligt bevis)',
        groundIcon: '🗼',
        color: '#38bdf8',
        nuance: '95% — Du slutter dig til det ud fra klare, synlige tegn lige foran dig.',
        canFrontNoInversion: false,
        canFrontV2: true,
        translations: 'EN: evidently / clearly • DE: offensichtlich • ES: evidentemente'
    },
    {
        id: 'sikkert',
        word: 'sikkert',
        percent: 85,
        zone: 'klippe',
        zoneLabel: 'Klippegrund (tryg forventning)',
        groundIcon: '🥾',
        color: '#67e8f9',
        nuance: '85% — Stærk indre ro og tillid til, at det holder ("det går nok").',
        canFrontNoInversion: false,
        canFrontV2: false,
        frontNote: '"Sikkert" står næsten altid i midten af sætningen ("Jonas når sikkert toget"). Vil man starte med det, siger man hellere "Helt sikkert når...".',
        translations: 'EN: surely / very likely • DE: bestimmt • ES: seguramente'
    },
    {
        id: 'sandsynligvis',
        word: 'sandsynligvis',
        percent: 75,
        zone: 'gyngende',
        zoneLabel: 'Gyngende grund (overvejende ja)',
        groundIcon: '🌉',
        color: '#fcd34d',
        nuance: '75% — Det taler de fleste argumenter for, men der er stadig en lille risiko.',
        canFrontNoInversion: false,
        canFrontV2: true,
        translations: 'EN: probably • DE: wahrscheinlich • ES: probablemente'
    },
    {
        id: 'formentlig',
        word: 'formentlig',
        percent: 65,
        zone: 'gyngende',
        zoneLabel: 'Gyngende grund (kvalificeret skøn)',
        groundIcon: '🌫️',
        color: '#fbbf24',
        nuance: '65% — Du formoder det ud fra din viden, men har ikke set beviset endnu.',
        canFrontNoInversion: false,
        canFrontV2: true,
        translations: 'EN: presumably • DE: vermutlich • ES: presumiblemente'
    },
    {
        id: 'antagelig',
        word: 'antagelig',
        percent: 60,
        zone: 'gyngende',
        zoneLabel: 'Gyngende grund (antagelse)',
        groundIcon: '🧭',
        color: '#f59e0b',
        nuance: '60% — Man går ud fra det som et rimeligt skøn (lidt mere formelt end formentlig).',
        canFrontNoInversion: false,
        canFrontV2: true,
        translations: 'EN: supposedly / most likely • DE: voraussichtlich • ES: supuestamente'
    },
    {
        id: 'maaske',
        word: 'måske',
        percent: 45,
        zone: 'tyndis',
        zoneLabel: 'Tynd is (åben tvivl)',
        groundIcon: '❄️',
        color: '#fb923c',
        nuance: '45% — Vægten vipper frit mellem ja og nej. Alt er åbent.',
        canFrontNoInversion: true,
        canFrontV2: true,
        frontNote: 'Særregel for "måske": Når "måske" står først, må man både bruge V2 ("Måske når Jonas...") og ligefrem ordstilling ("Måske Jonas når...").',
        translations: 'EN: maybe • DE: vielleicht • ES: quizás'
    },
    {
        id: 'muligvis',
        word: 'muligvis',
        percent: 35,
        zone: 'tyndis',
        zoneLabel: 'Tynd is (svag mulighed)',
        groundIcon: '🧊',
        color: '#f97316',
        nuance: '35% — Det kan ikke udelukkes, men det føles lidt mere usikkert end "måske".',
        canFrontNoInversion: false,
        canFrontV2: true,
        translations: 'EN: possibly • DE: möglicherweise • ES: posiblemente'
    },
    {
        id: 'naeppe',
        word: 'næppe',
        percent: 15,
        zone: 'tyndis',
        zoneLabel: 'Tynd is (tæt på nej)',
        groundIcon: '⚠️',
        color: '#f87171',
        nuance: '15% — Meget lille chance ("sandsynligvis ikke"). Indeholder allerede en nægtelse!',
        canFrontNoInversion: false,
        canFrontV2: true,
        frontNote: 'Husk: Ingen "ikke" efter "næppe"! Hvis "næppe" står først med V2, lyder det dramatisk eller formelt ("Næppe når Jonas toget...").',
        translations: 'EN: hardly / unlikely • DE: kaum • ES: difícilmente'
    }
];

const THERMO_SCENARIOS = [
    {
        id: 'toget',
        label: 'Jonas og toget',
        subj: 'Jonas',
        verb: 'når',
        rest: 'toget til Aarhus i tide'
    },
    {
        id: 'regn',
        label: 'Vejret i morgen',
        subj: 'det',
        verb: 'regner',
        rest: 'i København hele formiddagen'
    },
    {
        id: 'bageren',
        label: 'Bageren på hjørnet',
        subj: 'bageren',
        verb: 'har',
        rest: 'stadig friske rundstykker'
    }
];

const QUIZ_QUESTIONS = [
    {
        prompt: 'Din ven ryster af kulde, har vådt hår og drypper over hele gulvet. Hvad siger du?',
        sentencePrefix: 'Du har',
        sentenceSuffix: 'glemt din paraply!',
        options: ['tydeligvis', 'formentlig', 'næppe', 'muligvis'],
        correct: 'tydeligvis',
        explanation: 'Der er klare, synlige spor lige foran dine øjne (vådt hår og dryppende tøj), så "tydeligvis" er det præcise valg på klippegrund.'
    },
    {
        prompt: 'Din kollega spørger, om du vil have en kop kaffe efter en lang nattevagt. Svaret giver sig selv.',
        sentencePrefix: 'Ja,',
        sentenceSuffix: 'vil jeg gerne have kaffe!',
        options: ['selvfølgelig', 'antagelig', 'næppe', 'muligvis'],
        correct: 'selvfølgelig',
        explanation: '"Selvfølgelig" markerer, at noget er så indlysende og naturligt, at man ikke engang behøver tænke over det.'
    },
    {
        prompt: 'Klokken er 16:58, og bussen kører kl. 17:00 fra den anden ende af byen. Han er stadig hjemme i sofaen.',
        sentencePrefix: 'Han når',
        sentenceSuffix: 'bussen i dag.',
        options: ['næppe', 'selvfølgelig', 'tydeligvis', 'sikkert'],
        correct: 'næppe',
        explanation: 'Chancen er næsten nul, så isen brister. "Næppe" betyder "sandsynligvis ikke" — uden brug af "ikke".'
    },
    {
        prompt: 'Du skal berolige en ven, der er nervøs før sin køreprøve. Du tror stærkt på hende.',
        sentencePrefix: 'Du består',
        sentenceSuffix: 'prøven i første forsøg!',
        options: ['sikkert', 'næppe', 'muligvis', 'formentlig'],
        correct: 'sikkert',
        explanation: 'Adverbiet "sikkert" med tryk på verbet udtrykker varm, tryg forventning og opmuntring ("det gør du helt bestemt").'
    },
    {
        prompt: 'I en nyhedsudsendelse har politiet endnu ikke bekræftet årsagen, men meget peger på en fejl i signalet.',
        sentencePrefix: 'Forsinkelsen skyldes',
        sentenceSuffix: 'en teknisk fejl.',
        options: ['formentlig', 'selvfølgelig', 'tydeligvis', 'næppe'],
        correct: 'formentlig',
        explanation: '"Formentlig" er et klassisk ord for et kvalificeret skøn på gyngende grund, før det endelige bevis foreligger.'
    },
    {
        prompt: 'I kigger på vejrudsigten: 75% chance for solskin lørdag eftermiddag.',
        sentencePrefix: 'Vi kan',
        sentenceSuffix: 'spise frokost i haven på lørdag.',
        options: ['sandsynligvis', 'næppe', 'tydeligvis', 'umuligt'],
        correct: 'sandsynligvis',
        explanation: 'Ved ca. 70–80% sandsynlighed står man på den gyngende bro og vælger "sandsynligvis".'
    },
    {
        prompt: 'Du har ikke kigget i kalenderen endnu og vil holde muligheden helt åben for din ven.',
        sentencePrefix: '',
        sentenceSuffix: 'har jeg tid til at drikke te i eftermiddag.',
        options: ['Måske', 'Sikkert', 'Tydeligvis', 'Næppe'],
        correct: 'Måske',
        explanation: 'Når døren står helt åben mellem ja og nej (ca. 45–50%), er "måske" det naturlige ord på dansk.'
    },
    {
        prompt: 'Hvilken sætning er grammatisk KORREKT på dansk?',
        sentencePrefix: 'Vælg den rigtige brug af "næppe":',
        sentenceSuffix: '',
        options: [
            'Butikken har næppe flere jordbær tilbage.',
            'Butikken har næppe ikke flere jordbær tilbage.',
            'Butikken har ikke næppe flere jordbær tilbage.',
            'Næppe butikken har flere jordbær tilbage.'
        ],
        correct: 'Butikken har næppe flere jordbær tilbage.',
        explanation: '"Næppe" indeholder allerede en nægtelse ("næsten ikke"), så man sætter aldrig "ikke" sammen med det.'
    },
    {
        prompt: 'En formel projektplan beskriver et forventet resultat baseret på de første tal (~60% vished).',
        sentencePrefix: 'Den nye aftale træder',
        sentenceSuffix: 'i kraft til efteråret.',
        options: ['antagelig', 'selvfølgelig', 'tydeligvis', 'næppe'],
        correct: 'antagelig',
        explanation: '"Antagelig" bruges ofte i rapporter og mere formelle sammenhænge om noget, man går ud fra på gyngende grund.'
    }
];

function capFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function renderSansningFundamentView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const backTarget = extraData.from === 'flade3' ? 'sansning_flade3' : 'grammatik_sansning';
    const backLabel = extraData.from === 'flade3' ? '← Tilbage til hovedflade 3' : '← Tilbage til oversigt';

    let activeTab = 'termometer';
    let pureMode = false;
    let selectedHotspotId = FUNDAMENT_HOTSPOTS[0].id;
    let thermoIndex = 0; // index into THERMOMETER_LEVELS
    let activeScenarioId = THERMO_SCENARIOS[0].id;
    let frontPosition = false;
    let quizIndex = 0;
    let quizScore = 0;
    let quizAnswered = false;
    let selectedOption = null;

    const wrapper = document.createElement('div');
    wrapper.className = 'sansning-station-view';

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .sansning-station-view {
            min-height: 100vh;
            background: radial-gradient(circle at top center, #5C0812 0%, #3E050B 55%, #240206 100%);
            color: #FFF5F5;
            padding: 1.5rem 1.25rem 4rem;
            font-family: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
        }
        .ss-inner {
            max-width: 1120px;
            margin: 0 auto;
        }
        .ss-top-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }
        .ss-back-btn {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,190,198,0.28);
            color: #FFE4E6;
            padding: 0.5rem 1rem;
            border-radius: 999px;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ss-back-btn:hover {
            background: rgba(255,255,255,0.16);
            transform: translateX(-2px);
        }
        .ss-station-badge {
            background: rgba(56,189,248,0.16);
            border: 1px solid rgba(56,189,248,0.4);
            color: #BAE6FD;
            padding: 0.42rem 0.95rem;
            border-radius: 999px;
            font-size: 0.82rem;
            font-weight: 800;
            letter-spacing: 0.03em;
        }
        .ss-hero {
            text-align: center;
            margin-bottom: 1.75rem;
        }
        .ss-hero h1 {
            margin: 0 0 0.5rem;
            font-size: clamp(1.75rem, 4vw, 2.5rem);
            font-weight: 900;
            color: #FFFFFF;
            letter-spacing: -0.02em;
        }
        .ss-hero p {
            margin: 0 auto;
            max-width: 700px;
            color: #FBD5D9;
            font-size: 1rem;
            line-height: 1.55;
        }
        .ss-tabs-nav {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 1.75rem;
        }
        .ss-tab-btn {
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,190,198,0.2);
            color: #FBD5D9;
            padding: 0.65rem 1.2rem;
            border-radius: 12px;
            font-size: 0.92rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ss-tab-btn:hover {
            background: rgba(255,255,255,0.14);
            color: #FFFFFF;
        }
        .ss-tab-btn.active {
            background: #FF4D5E;
            border-color: #FF8A95;
            color: #FFFFFF;
            box-shadow: 0 8px 20px rgba(255,77,94,0.3);
        }
        .contrast-canvas-card {
            background: rgba(34, 4, 8, 0.72);
            border: 1px solid rgba(255,190,198,0.2);
            border-radius: 22px;
            padding: 1.25rem;
            margin-bottom: 1.25rem;
            box-shadow: 0 18px 40px rgba(0,0,0,0.35);
        }
        .contrast-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }
        .contrast-hint {
            font-size: 0.9rem;
            color: #FBD5D9;
            font-weight: 600;
        }
        .pure-toggle-btn {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.25);
            color: #FFF;
            padding: 0.45rem 0.95rem;
            border-radius: 999px;
            font-size: 0.84rem;
            font-weight: 700;
            cursor: pointer;
        }
        .pure-toggle-btn.active {
            background: rgba(56,189,248,0.25);
            border-color: #38bdf8;
            color: #BAE6FD;
        }
        .contrast-split-stage {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
        }
        @media (max-width: 820px) {
            .contrast-split-stage {
                grid-template-columns: 1fr;
            }
        }
        .stage-half {
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.14);
            background: #1A0306;
        }
        .stage-half-header {
            padding: 0.65rem 1rem;
            font-size: 0.88rem;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .stage-half-header.cool {
            background: rgba(56,189,248,0.18);
            color: #BAE6FD;
            border-bottom: 1px solid rgba(56,189,248,0.3);
        }
        .stage-half-header.warm {
            background: rgba(251,146,60,0.18);
            color: #FED7AA;
            border-bottom: 1px solid rgba(251,146,60,0.3);
        }
        .stage-img-wrap {
            position: relative;
            aspect-ratio: 4 / 3;
            width: 100%;
            overflow: hidden;
        }
        .stage-img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .ss-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            background: rgba(34, 4, 8, 0.9);
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            border-radius: 999px;
            padding: 0.32rem 0.72rem;
            font-size: 0.78rem;
            font-weight: 800;
            cursor: pointer;
            white-space: nowrap;
            box-shadow: 0 6px 16px rgba(0,0,0,0.45);
            transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        }
        .ss-hotspot.cool {
            border-color: #38bdf8;
        }
        .ss-hotspot.warm {
            border-color: #fb923c;
        }
        .ss-hotspot:hover,
        .ss-hotspot.selected {
            transform: translate(-50%, -50%) scale(1.1);
            background: #FF4D5E;
            border-color: #FFFFFF;
            z-index: 4;
        }
        .ss-hotspots-strip {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        .ss-strip-btn {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,190,198,0.22);
            color: #FFE4E6;
            padding: 0.42rem 0.85rem;
            border-radius: 999px;
            font-size: 0.83rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.16s ease;
        }
        .ss-strip-btn.selected {
            background: #FF4D5E;
            border-color: #FF8A95;
            color: #FFFFFF;
        }
        .ss-detail-card {
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,190,198,0.22);
            border-radius: 20px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        }
        .ss-detail-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
        }
        .ss-detail-badge {
            font-size: 0.78rem;
            font-weight: 800;
            padding: 0.3rem 0.75rem;
            border-radius: 999px;
            background: rgba(56,189,248,0.18);
            color: #BAE6FD;
            border: 1px solid rgba(56,189,248,0.35);
        }
        .ss-detail-badge.warm {
            background: rgba(251,146,60,0.18);
            color: #FED7AA;
            border-color: rgba(251,146,60,0.35);
        }
        .ss-tts-btn {
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.28);
            color: #FFFFFF;
            padding: 0.42rem 0.9rem;
            border-radius: 999px;
            font-size: 0.84rem;
            font-weight: 700;
            cursor: pointer;
        }
        .ss-tts-btn:hover {
            background: rgba(255,255,255,0.22);
        }
        .ss-detail-sentence {
            font-size: 1.15rem;
            font-weight: 700;
            color: #FFFFFF;
            background: rgba(0,0,0,0.24);
            padding: 0.9rem 1.1rem;
            border-radius: 12px;
            margin: 0.75rem 0 1rem;
            border-left: 4px solid #38bdf8;
        }
        .ss-detail-sentence.warm {
            border-left-color: #fb923c;
        }
        .ss-congruence-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
        }
        @media (max-width: 720px) {
            .ss-congruence-grid {
                grid-template-columns: 1fr;
            }
        }
        .ss-contrast-box {
            border-radius: 14px;
            padding: 1rem;
            font-size: 0.92rem;
            line-height: 1.5;
        }
        .ss-contrast-box.naerhed {
            background: rgba(56,189,248,0.1);
            border: 1px solid rgba(56,189,248,0.28);
        }
        .ss-contrast-box.afstand {
            background: rgba(251,146,60,0.1);
            border: 1px solid rgba(251,146,60,0.28);
        }
        .ss-contrast-box strong {
            display: block;
            margin-bottom: 0.35rem;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .ss-insp-aha {
            background: rgba(255, 77, 94, 0.14);
            border: 1px solid rgba(255, 138, 149, 0.35);
            border-radius: 14px;
            padding: 0.95rem 1.1rem;
            color: #FFE4E6;
            font-size: 0.93rem;
            line-height: 1.5;
            margin-bottom: 0.9rem;
        }
        .ss-insp-languages {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .ss-lang-pill {
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.14);
            border-radius: 8px;
            padding: 0.35rem 0.7rem;
            font-size: 0.82rem;
            color: #FBD5D9;
        }
        /* Thermometer lab */
        .thermo-card {
            background: rgba(34, 4, 8, 0.76);
            border: 1px solid rgba(255,190,198,0.24);
            border-radius: 22px;
            padding: 1.6rem;
        }
        .thermo-layout {
            display: grid;
            grid-template-columns: 160px 1fr;
            gap: 1.6rem;
            align-items: stretch;
        }
        @media (max-width: 760px) {
            .thermo-layout {
                grid-template-columns: 1fr;
            }
        }
        .thermo-column {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            background: rgba(0,0,0,0.28);
            border-radius: 18px;
            padding: 1rem 0.75rem;
            border: 1px solid rgba(255,255,255,0.12);
        }
        .thermo-tube-wrap {
            position: relative;
            width: 34px;
            height: 280px;
            border-radius: 999px;
            background: rgba(255,255,255,0.08);
            border: 2px solid rgba(255,255,255,0.22);
            overflow: hidden;
            margin: 0.75rem 0;
        }
        .thermo-fill {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            transition: height 0.3s ease, background 0.3s ease;
            border-radius: 0 0 999px 999px;
        }
        .thermo-readout {
            font-size: 1.35rem;
            font-weight: 900;
            color: #FFFFFF;
        }
        .thermo-steps-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.55rem;
            margin-bottom: 1.1rem;
        }
        @media (max-width: 640px) {
            .thermo-steps-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
        .thermo-step-btn {
            text-align: left;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.16);
            color: #FFE4E6;
            border-radius: 12px;
            padding: 0.65rem 0.8rem;
            cursor: pointer;
            transition: all 0.16s ease;
        }
        .thermo-step-btn:hover {
            background: rgba(255,255,255,0.14);
        }
        .thermo-step-btn.active {
            background: rgba(255,77,94,0.26);
            border-color: #FF8A95;
            box-shadow: 0 0 0 1px #FF8A95;
        }
        .thermo-step-word {
            display: block;
            font-size: 0.98rem;
            font-weight: 800;
            color: #FFFFFF;
        }
        .thermo-step-meta {
            font-size: 0.75rem;
            color: #FBD5D9;
        }
        .thermo-controls-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
            margin-bottom: 1rem;
            align-items: center;
        }
        .thermo-chip {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.2);
            color: #FBD5D9;
            padding: 0.4rem 0.85rem;
            border-radius: 999px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
        }
        .thermo-chip.active {
            background: #38bdf8;
            border-color: #7dd3fc;
            color: #082f49;
        }
        .thermo-sentence-box {
            background: rgba(0,0,0,0.34);
            border: 1px solid rgba(255,255,255,0.16);
            border-radius: 16px;
            padding: 1.15rem 1.25rem;
            margin-bottom: 0.9rem;
        }
        .thermo-sentence-text {
            font-size: 1.25rem;
            font-weight: 800;
            color: #FFFFFF;
            margin-bottom: 0.65rem;
            line-height: 1.4;
        }
        .thermo-word-hl {
            color: #7dd3fc;
            text-decoration: underline;
            text-underline-offset: 4px;
        }
        .thermo-slider {
            width: 100%;
            accent-color: #FF4D5E;
            margin: 0.5rem 0 1rem;
            cursor: pointer;
        }
        /* Quiz */
        .ss-quiz-card {
            background: rgba(34, 4, 8, 0.78);
            border: 1px solid rgba(255,190,198,0.24);
            border-radius: 22px;
            padding: 1.75rem;
            max-width: 780px;
            margin: 0 auto;
        }
        .ss-quiz-progress {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            font-weight: 700;
            color: #FBD5D9;
            margin-bottom: 1rem;
        }
        .ss-quiz-prompt {
            font-size: 1.05rem;
            color: #FFE4E6;
            margin-bottom: 0.85rem;
            line-height: 1.5;
        }
        .ss-quiz-target {
            font-size: 1.2rem;
            font-weight: 800;
            background: rgba(0,0,0,0.3);
            padding: 0.95rem 1.1rem;
            border-radius: 12px;
            margin-bottom: 1.1rem;
            color: #FFFFFF;
        }
        .ss-quiz-options {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.75rem;
        }
        @media (max-width: 600px) {
            .ss-quiz-options {
                grid-template-columns: 1fr;
            }
        }
        .ss-quiz-opt-btn {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,190,198,0.25);
            color: #FFFFFF;
            padding: 0.85rem 1rem;
            border-radius: 12px;
            font-size: 0.98rem;
            font-weight: 700;
            cursor: pointer;
            text-align: left;
            transition: all 0.16s ease;
        }
        .ss-quiz-opt-btn:hover:not(:disabled) {
            background: rgba(255,255,255,0.16);
        }
        .ss-quiz-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25);
            border-color: #4ade80;
            color: #dcfce7;
        }
        .ss-quiz-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.28);
            border-color: #f87171;
            color: #fee2e2;
        }
        .ss-quiz-feedback {
            margin-top: 1.1rem;
            padding: 1rem 1.1rem;
            border-radius: 12px;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.18);
            font-size: 0.94rem;
            line-height: 1.5;
        }
        .ss-quiz-next-btn {
            margin-top: 1rem;
            background: #FF4D5E;
            border: none;
            color: #FFFFFF;
            padding: 0.72rem 1.35rem;
            border-radius: 10px;
            font-size: 0.92rem;
            font-weight: 800;
            cursor: pointer;
        }
    `;
    wrapper.appendChild(styleEl);

    const inner = document.createElement('div');
    inner.className = 'ss-inner';
    wrapper.appendChild(inner);
    container.appendChild(wrapper);

    function render() {
        const selectedHotspot = FUNDAMENT_HOTSPOTS.find((h) => h.id === selectedHotspotId) || FUNDAMENT_HOTSPOTS[0];
        const level = THERMOMETER_LEVELS[thermoIndex];
        const scenario = THERMO_SCENARIOS.find((s) => s.id === activeScenarioId) || THERMO_SCENARIOS[0];

        let mainPanelHtml = '';
        if (activeTab === 'vrimmel') {
            const leftSpots = FUNDAMENT_HOTSPOTS.filter((h) => h.side === 'left');
            const rightSpots = FUNDAMENT_HOTSPOTS.filter((h) => h.side === 'right');
            mainPanelHtml = `
                <div class="contrast-canvas-card">
                    <div class="contrast-control-bar">
                        <span class="contrast-hint">Klik på et punkt i landskabet for at mærke, om grunden bærer eller gynger.</span>
                        <button type="button" class="pure-toggle-btn ${pureMode ? 'active' : ''}" id="btn-pure-mode">
                            ${pureMode ? 'Vis ledetråde' : 'Kun billeder (ren sansning)'}
                        </button>
                    </div>
                    <div class="contrast-split-stage">
                        <div class="stage-half">
                            <div class="stage-half-header cool">
                                <span>Klippegrund (fast vished)</span>
                                <span>85–100%</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_fundament_venstre.jpg" alt="Klippegrund med fyrtårn, fast sti og trygge vandrere" />
                                ${pureMode ? '' : leftSpots.map((h) => `
                                    <button type="button" class="ss-hotspot cool ${h.id === selectedHotspotId ? 'selected' : ''}"
                                        style="left:${h.x}%; top:${h.y}%;" data-hotspot="${h.id}">
                                        ${h.word}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        <div class="stage-half">
                            <div class="stage-half-header warm">
                                <span>Gyngende grund & tynd is (tvivl)</span>
                                <span>15–75%</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_fundament_hoejre.jpg" alt="Hængebro, tåge og vandrer på revnet tynd is" />
                                ${pureMode ? '' : rightSpots.map((h) => `
                                    <button type="button" class="ss-hotspot warm ${h.id === selectedHotspotId ? 'selected' : ''}"
                                        style="left:${h.x}%; top:${h.y}%;" data-hotspot="${h.id}">
                                        ${h.word}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="ss-hotspots-strip">
                        ${FUNDAMENT_HOTSPOTS.map((h) => `
                            <button type="button" class="ss-strip-btn ${h.id === selectedHotspotId ? 'selected' : ''}" data-hotspot="${h.id}">
                                ${h.word}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="ss-detail-card">
                    <div class="ss-detail-top">
                        <span class="ss-detail-badge ${selectedHotspot.side === 'right' ? 'warm' : ''}">${selectedHotspot.badge}</span>
                        <button type="button" class="ss-tts-btn" id="btn-tts-hotspot">🔊 Lyt til dansk</button>
                    </div>
                    <h2 style="margin:0 0 0.25rem; font-size:1.35rem; font-weight:900;">${selectedHotspot.title}</h2>
                    <div class="ss-detail-sentence ${selectedHotspot.side === 'right' ? 'warm' : ''}">
                        "${selectedHotspot.sentence}"
                    </div>
                    <div class="ss-congruence-grid">
                        <div class="ss-contrast-box naerhed">
                            <strong>Fasthed & betydning</strong>
                            ${selectedHotspot.klippeDesc}
                        </div>
                        <div class="ss-contrast-box afstand">
                            <strong>Grænse & kontrast</strong>
                            ${selectedHotspot.isDesc}
                        </div>
                    </div>
                    <div class="ss-insp-aha">
                        <strong>Aha-regel:</strong> ${selectedHotspot.aha}
                    </div>
                    <div class="ss-insp-languages">
                        <span class="ss-lang-pill">🇬🇧 ${selectedHotspot.translation.en}</span>
                        <span class="ss-lang-pill">🇩🇪 ${selectedHotspot.translation.de}</span>
                        <span class="ss-lang-pill">🇪🇸 ${selectedHotspot.translation.es}</span>
                        <span class="ss-lang-pill">🇸🇦 ${selectedHotspot.translation.ar}</span>
                    </div>
                </div>
            `;
        } else if (activeTab === 'termometer') {
            const frontWord = capFirst(level.word);
            let liveSentence = `${capFirst(scenario.subj)} ${scenario.verb} <span class="thermo-word-hl">${level.word}</span> ${scenario.rest}.`;
            let plainSentence = `${capFirst(scenario.subj)} ${scenario.verb} ${level.word} ${scenario.rest}.`;

            if (frontPosition) {
                if (level.id === 'maaske') {
                    liveSentence = `<span class="thermo-word-hl">${frontWord}</span> ${scenario.verb} ${scenario.subj} ${scenario.rest}. <span style="font-size:0.85rem;color:#FBD5D9;font-weight:500;">(eller uden V2: ${frontWord} ${scenario.subj} ${scenario.verb} ${scenario.rest}.)</span>`;
                    plainSentence = `${frontWord} ${scenario.verb} ${scenario.subj} ${scenario.rest}.`;
                } else if (level.canFrontV2) {
                    liveSentence = `<span class="thermo-word-hl">${frontWord}</span> ${scenario.verb} ${scenario.subj} ${scenario.rest}.`;
                    plainSentence = `${frontWord} ${scenario.verb} ${scenario.subj} ${scenario.rest}.`;
                } else {
                    liveSentence = `${capFirst(scenario.subj)} ${scenario.verb} <span class="thermo-word-hl">${level.word}</span> ${scenario.rest}. <span style="font-size:0.85rem;color:#FED7AA;font-weight:500;">(trives bedst i midten)</span>`;
                }
            }

            mainPanelHtml = `
                <div class="thermo-card">
                    <h2 style="margin:0 0 0.35rem; font-size:1.4rem; font-weight:900;">Interaktivt is/klippe-termometer</h2>
                    <p style="margin:0 0 1.2rem; color:#FBD5D9; font-size:0.95rem;">
                        Træk i termometret fra bundfrossen tvivl (tynd is) op til urokkelig klippegrund, og se hvordan et enkelt ord flytter hele virkeligheden i sætningen.
                    </p>
                    <div class="thermo-layout">
                        <div class="thermo-column">
                            <span style="font-size:0.78rem;font-weight:800;color:#BAE6FD;">🪨 Klippegrund</span>
                            <div class="thermo-tube-wrap">
                                <div class="thermo-fill" style="height:${level.percent}%; background: linear-gradient(180deg, ${level.color} 0%, #FF4D5E 100%);"></div>
                            </div>
                            <div class="thermo-readout">${level.percent}%</div>
                            <span style="font-size:0.78rem;font-weight:800;color:#FCA5A5;">🧊 Tynd is</span>
                        </div>
                        <div>
                            <label for="thermo-range" style="display:block;font-size:0.84rem;font-weight:700;color:#FFE4E6;">
                                Træk fra tynd is (næppe) til klippegrund (selvfølgelig): <strong>${level.groundIcon} ${level.word} (${level.percent}%)</strong>
                            </label>
                            <input id="thermo-range" class="thermo-slider" type="range" min="0" max="${THERMOMETER_LEVELS.length - 1}" step="1" value="${THERMOMETER_LEVELS.length - 1 - thermoIndex}" />

                            <div class="thermo-steps-grid">
                                ${THERMOMETER_LEVELS.map((lvl, idx) => `
                                    <button type="button" class="thermo-step-btn ${idx === thermoIndex ? 'active' : ''}" data-thermo-idx="${idx}">
                                        <span class="thermo-step-word">${lvl.groundIcon} ${lvl.word}</span>
                                        <span class="thermo-step-meta">${lvl.percent}% • ${lvl.zone === 'klippe' ? 'klippegrund' : lvl.zone === 'gyngende' ? 'gyngende grund' : 'tynd is'}</span>
                                    </button>
                                `).join('')}
                            </div>

                            <div class="thermo-controls-row">
                                ${THERMO_SCENARIOS.map((sc) => `
                                    <button type="button" class="thermo-chip ${sc.id === activeScenarioId ? 'active' : ''}" data-scenario="${sc.id}">
                                        ${sc.label}
                                    </button>
                                `).join('')}
                                <button type="button" class="thermo-chip ${frontPosition ? 'active' : ''}" id="btn-toggle-front">
                                    ${frontPosition ? 'Placering: Forfelt (med V2)' : 'Placering: Centralfelt (normal)'}
                                </button>
                            </div>

                            <div class="thermo-sentence-box">
                                <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:0.5rem;">
                                    <span class="ss-detail-badge ${level.zone !== 'klippe' ? 'warm' : ''}">${level.zoneLabel}</span>
                                    <button type="button" class="ss-tts-btn" id="btn-tts-thermo" data-say="${plainSentence.replace(/"/g, '&quot;')}">🔊 Lyt til sætningen</button>
                                </div>
                                <div class="thermo-sentence-text">${liveSentence}</div>
                                <p style="margin:0 0 0.5rem;color:#FFE4E6;font-size:0.93rem;">${level.nuance}</p>
                                ${level.frontNote ? `<p style="margin:0 0 0.5rem;color:#FED7AA;font-size:0.86rem;"><strong>Bemærk:</strong> ${level.frontNote}</p>` : ''}
                                <div style="font-size:0.82rem;color:#FBD5D9;">${level.translations}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            if (quizIndex >= QUIZ_QUESTIONS.length) {
                mainPanelHtml = `
                    <div class="ss-quiz-card" style="text-align:center;">
                        <h2 style="margin:0 0 0.6rem;font-size:1.7rem;font-weight:900;">Fundament-testen fuldført!</h2>
                        <p style="font-size:1.15rem;color:#FFE4E6;margin:0 0 1.2rem;">
                            Du fik <strong>${quizScore} ud af ${QUIZ_QUESTIONS.length}</strong> rigtige.
                        </p>
                        <button type="button" class="ss-quiz-next-btn" id="btn-quiz-restart">Prøv testen igen</button>
                    </div>
                `;
            } else {
                const q = QUIZ_QUESTIONS[quizIndex];
                const completedText = q.sentenceSuffix
                    ? `${q.sentencePrefix ? q.sentencePrefix + ' ' : ''}${q.correct} ${q.sentenceSuffix}`.trim()
                    : q.correct;

                mainPanelHtml = `
                    <div class="ss-quiz-card">
                        <div class="ss-quiz-progress">
                            <span>Spørgsmål ${quizIndex + 1} af ${QUIZ_QUESTIONS.length}</span>
                            <span>Point: ${quizScore}</span>
                        </div>
                        <p class="ss-quiz-prompt">${q.prompt}</p>
                        <div class="ss-quiz-target">
                            ${q.sentencePrefix} <span style="color:#7dd3fc;">[ ${quizAnswered ? selectedOption : '_____'} ]</span> ${q.sentenceSuffix}
                        </div>
                        <div class="ss-quiz-options">
                            ${q.options.map((opt) => {
                                let cls = 'ss-quiz-opt-btn';
                                if (quizAnswered) {
                                    if (opt === q.correct) cls += ' correct';
                                    else if (opt === selectedOption) cls += ' wrong';
                                }
                                return `<button type="button" class="${cls}" data-opt="${opt}" ${quizAnswered ? 'disabled' : ''}>${opt}</button>`;
                            }).join('')}
                        </div>
                        ${quizAnswered ? `
                            <div class="ss-quiz-feedback">
                                <strong>${selectedOption === q.correct ? '✅ Helt fast grund!' : '💡 Se lige en ekstra gang:'}</strong>
                                ${q.explanation}
                                <div style="margin-top:0.75rem;display:flex;gap:0.6rem;flex-wrap:wrap;align-items:center;">
                                    <button type="button" class="ss-tts-btn" id="btn-tts-quiz" data-say="${completedText.replace(/"/g, '&quot;')}">🔊 Hør hele sætningen</button>
                                    <button type="button" class="ss-quiz-next-btn" style="margin-top:0;" id="btn-quiz-next">
                                        ${quizIndex + 1 === QUIZ_QUESTIONS.length ? 'Se resultat →' : 'Næste spørgsmål →'}
                                    </button>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `;
            }
        }

        inner.innerHTML = `
            <div class="ss-top-bar">
                <button type="button" class="ss-back-btn" id="btn-back-fundament">${backLabel}</button>
                <span class="ss-station-badge">Station 3.1 • Fundamentets fasthed</span>
            </div>

            <div class="ss-hero">
                <h1>Fundamentets fasthed</h1>
                <p>Hvor fast er grunden under dine fødder? Lær at vælge mellem klippefast garanti, gyngende sandsynlighed og revnet is, når du vurderer virkeligheden på dansk.</p>
            </div>

            <div class="ss-tabs-nav">
                
                <button type="button" class="ss-tab-btn ${activeTab === 'termometer' ? 'active' : ''}" data-tab="termometer">2. Is/klippe-termometer</button>
                <button type="button" class="ss-tab-btn ${activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">3. Fundament-testen</button>
            </div>

            ${mainPanelHtml}
        `;

        inner.querySelector('#btn-back-fundament').onclick = () => navigateFn(backTarget);

        inner.querySelectorAll('.ss-tab-btn').forEach((btn) => {
            btn.onclick = () => {
                activeTab = btn.dataset.tab;
                render();
            };
        });

        const pureBtn = inner.querySelector('#btn-pure-mode');
        if (pureBtn) {
            pureBtn.onclick = () => {
                pureMode = !pureMode;
                render();
            };
        }

        inner.querySelectorAll('[data-hotspot]').forEach((btn) => {
            btn.onclick = () => {
                selectedHotspotId = btn.dataset.hotspot;
                render();
            };
        });

        const ttsHotspotBtn = inner.querySelector('#btn-tts-hotspot');
        if (ttsHotspotBtn) {
            ttsHotspotBtn.onclick = () => speakDanish(selectedHotspot.sentence);
        }

        const thermoRange = inner.querySelector('#thermo-range');
        if (thermoRange) {
            thermoRange.oninput = (e) => {
                const sliderVal = Number(e.target.value);
                thermoIndex = THERMOMETER_LEVELS.length - 1 - sliderVal;
                render();
            };
        }

        inner.querySelectorAll('[data-thermo-idx]').forEach((btn) => {
            btn.onclick = () => {
                thermoIndex = Number(btn.dataset.thermoIdx);
                render();
            };
        });

        inner.querySelectorAll('[data-scenario]').forEach((btn) => {
            btn.onclick = () => {
                activeScenarioId = btn.dataset.scenario;
                render();
            };
        });

        const frontBtn = inner.querySelector('#btn-toggle-front');
        if (frontBtn) {
            frontBtn.onclick = () => {
                frontPosition = !frontPosition;
                render();
            };
        }

        const ttsThermoBtn = inner.querySelector('#btn-tts-thermo');
        if (ttsThermoBtn) {
            ttsThermoBtn.onclick = () => speakDanish(ttsThermoBtn.dataset.say);
        }

        inner.querySelectorAll('[data-opt]').forEach((btn) => {
            btn.onclick = () => {
                if (quizAnswered) return;
                selectedOption = btn.dataset.opt;
                quizAnswered = true;
                if (selectedOption === QUIZ_QUESTIONS[quizIndex].correct) {
                    quizScore += 1;
                }
                render();
            };
        });

        const ttsQuizBtn = inner.querySelector('#btn-tts-quiz');
        if (ttsQuizBtn) {
            ttsQuizBtn.onclick = () => speakDanish(ttsQuizBtn.dataset.say);
        }

        const nextBtn = inner.querySelector('#btn-quiz-next');
        if (nextBtn) {
            nextBtn.onclick = () => {
                quizIndex += 1;
                quizAnswered = false;
                selectedOption = null;
                render();
            };
        }

        const restartBtn = inner.querySelector('#btn-quiz-restart');
        if (restartBtn) {
            restartBtn.onclick = () => {
                quizIndex = 0;
                quizScore = 0;
                quizAnswered = false;
                selectedOption = null;
                render();
            };
        }
    }

    render();
}
