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

const FREMDRIFT_HOTSPOTS = [
    {
        id: 'og_by',
        side: 'left',
        x: 37,
        y: 48,
        badge: 'Fremad • Jævn sideordning',
        word: 'og (grøn bølge)',
        title: 'Og — grønt lys og jævn fremadskriden',
        sentence: 'Lyset var grønt på boulevarden, og cyklisterne trillede roligt videre.',
        translation: {
            en: 'and (smooth forward addition)',
            de: 'und',
            es: 'y',
            ar: 'و (استمرار متدفق دون انقطاع)'
        },
        mechDesc: 'Som en grøn trafikbølge: sætning A og sætning B ruller i samme retning uden at ændre ordstilling eller tryk.',
        contrastDesc: 'Ingen inversion efter "og": "og cyklisterne [subjekt] trillede [verbum]" bevarer rolig lige-frem ordstilling.',
        aha: '"Og" sidder på plads 0 mellem to hele sætninger. Husk at sætte subjektet lige efter "og", medmindre det er præcis samme person som før!'
    },
    {
        id: 'og_natur',
        side: 'left',
        x: 54,
        y: 67,
        badge: 'Fremad • Vandring i natur',
        word: 'og (vandresti)',
        title: 'Og — skridt for skridt ad samme sti',
        sentence: 'Solen skinnede langs bækken, og vi gik en lang tur i skoven.',
        translation: {
            en: 'and (side by side along the trail)',
            de: 'und',
            es: 'y',
            ar: 'و (خطوة تلو الأخرى في نفس الاتجاه)'
        },
        mechDesc: 'To ligeværdige billeder lægges efter hinanden: først solskinnet, så vandreturen.',
        contrastDesc: 'Hvis solskinnet var selve ÅRSAGEN til turen, ville man i stedet skubbe kraften frem med "så" eller "derfor".',
        aha: 'Brug "og", når du bare lægger næste naturlige scene på stien til.'
    },
    {
        id: 'derfor_bus',
        side: 'left',
        x: 83,
        y: 55,
        badge: 'Trykbølge fremad • Årsag → følge',
        word: 'derfor',
        title: 'Derfor — trykbølgen der skubber næste handling frem',
        sentence: 'Bybussen punkterede på broen. Derfor kom Jonas ti minutter for sent.',
        translation: {
            en: 'therefore / that is why (pushes into result + V2)',
            de: 'deshalb / darum',
            es: 'por eso / por lo tanto',
            ar: 'لذلك (يدفع النتيجة للأمام مع قلب الفعل والفاعل)'
        },
        mechDesc: 'Årsagen rammer først (punkteringen), og energien skyder næste sætning frem i konsekvensen.',
        contrastDesc: 'Vigtigt skifte: "Derfor" er et adverbium (ikke bare et passivt bindeord), så verbet SKAL stå lige efter: "Derfor kom Jonas..."',
        aha: 'Lægge-mærke-regel: "Derfor + verbum + subjekt"! Man siger aldrig *"Derfor Jonas kom for sent".'
    },
    {
        id: 'saa_kryds',
        side: 'left',
        x: 91,
        y: 71,
        badge: 'Fremad • Blød konsekvens',
        word: 'så',
        title: 'Så — let skridt ind i resultatet (uden inversion)',
        sentence: 'Trafikken holdt stille ved overgangen, så hun gik rask over vejen.',
        translation: {
            en: 'so (result without inversion)',
            de: 'so dass / also',
            es: 'así que / entonces',
            ar: 'لذا / فـ (نتيجة طبيعية بدون قلب)'
        },
        mechDesc: 'Ligesom "derfor" peger "så" frem mod følgen — men med meget blødere hverdagsflow.',
        contrastDesc: 'Kæmpe forskel på "så" og "derfor": Efter bindeordet "så" står subjektet FØRST ("... så hun gik"), aldrig omvendt!',
        aha: 'Sammenlign: "Bussen punkterede, SÅ jeg gik." (ingen inversion) vs. "Bussen punkterede. DERFOR gik jeg." (inversion!).'
    },
    {
        id: 'fordi_spejl',
        side: 'right',
        x: 27,
        y: 19,
        badge: 'Bakspejlet • Årsag (ledsætning)',
        word: 'fordi (bakspejlet)',
        title: 'Fordi — kig i bakspejlet efter hvorfor',
        sentence: 'Bilisten kigger i bakspejlet, fordi han vil forstå køen bag sig.',
        translation: {
            en: 'because (looking back at the cause)',
            de: 'weil',
            es: 'porque',
            ar: 'لأن (النظر في المرآة الخلفية لمعرفة السبب)'
        },
        mechDesc: 'Hvor "derfor" skubber fremad (Årsag → Følge), ser "fordi" bagud (Følge ← Årsag).',
        contrastDesc: 'Fordi åbner en ledsætning: eventuelle småord som "ikke", "altid" eller "aldrig" hopper FØR verbet!',
        aha: 'Husk ledsætnings-reglen: "Vi kørte langsomt, fordi bussen IKKE holdt ind til siden."'
    },
    {
        id: 'fordi_bus',
        side: 'right',
        x: 40,
        y: 56,
        badge: 'Bakspejlet • Trafik-årsag',
        word: 'fordi (punkteret dæk)',
        title: 'Fordi — forklaringen bag forsinkelsen',
        sentence: 'Vi måtte gå resten af ruten, fordi linje 42 punkterede ved kantstenen.',
        translation: {
            en: 'because (subordinate clause cause)',
            de: 'weil der Bus eine Panne hatte',
            es: 'porque el autobús pinchó',
            ar: 'لأن الحافلة تعطلت'
        },
        mechDesc: 'Vi starter med resultatet (vi måtte gå) og peger bagefter tilbage på årsagen bag os.',
        contrastDesc: '"Fordi" kan også starte hele sætningen, hvis du spænder bakspejlet forrest: "Fordi bussen punkterede, måtte vi gå."',
        aha: 'Start-regel: Når du sætter "Fordi..." forrest, bliver hele fordi-sætningen til Plads 1 — og så kommer hovedsætningens verbum lige efter kommaet!'
    },
    {
        id: 'for_sti',
        side: 'right',
        x: 61,
        y: 75,
        badge: 'Bakspejlet • Hverdagstale (helsætning)',
        word: 'for (mudret sti)',
        title: 'For — let forklaring bagefter i tale',
        sentence: 'Vandreren tog gummistøvler på, for stien i skoven var helt mudret.',
        translation: {
            en: 'for / because (coordinating explanation)',
            de: 'denn',
            es: 'pues / ya que',
            ar: 'فإن / لأن (جملة رئيسية تشرح السبب)'
        },
        mechDesc: 'Også et blik bagud, men "for" forbinder to ligeværdige helsætninger i stedet for en ledsætning.',
        contrastDesc: 'To forskelle fra "fordi": 1) "For" kan ALDRIG stå først i en sætning. 2) "Ikke" bliver stående EFTER verbet ("for han så ikke pytterne").',
        aha: 'Prøv spørgsmålstesten: Svarer du på "Hvorfor?" — sig altid "Fordi...", aldrig *"For..."!'
    },
    {
        id: 'for_baenk',
        side: 'right',
        x: 85,
        y: 58,
        badge: 'Bakspejlet • Pause efter årsag',
        word: 'fordi / for',
        title: 'Fordi vs. for — mærk forskellen på farten',
        sentence: 'Han hviler benene på bænken, for han har gået langt, fordi bussen ikke kørte.',
        translation: {
            en: 'for (main clause) vs. because (subordinate clause)',
            de: 'denn vs. weil',
            es: 'pues vs. porque',
            ar: 'الفرق بين جملة السبب الرئيسية والثانوية'
        },
        mechDesc: 'Begge peger bagud i tid/årsag, men "for" føles som en ekstra kommentar undervejs, mens "fordi" låser svaret stramt fast.',
        contrastDesc: 'I "for" -> ikke EFTER verbet. I "fordi" -> ikke FØR verbet.',
        aha: 'Det er den sikreste genvej til at skelne dem på skrift og i tale!'
    }
];

const LAB_SCENARIOS = [
    {
        id: 'bus',
        label: 'Bybussen punkterede',
        causePos: 'bussen punkterede i myldretiden',
        causeNeg: 'bussen ikke kørte videre',
        effectPos: 'vi gik gennem byen til fods',
        effectNeg: 'vi ikke nåede mødet klokken ni'
    },
    {
        id: 'skov',
        label: 'Mudret skovsti',
        causePos: 'regnen gjorde stien helt glat',
        causeNeg: 'stien ikke var tørret efter regnen',
        effectPos: 'vandrerne gik forsigtigt langs bækken',
        effectNeg: 'de ikke løb ned ad bakken'
    },
    {
        id: 'lys',
        label: 'Grøn bølge på cykelstien',
        causePos: 'alle lyskryds viste grønt i træk',
        causeNeg: 'trafikken ikke bremsede cyklisterne',
        effectPos: 'hun fløj ubesværet hele vejen til havnen',
        effectNeg: 'hun ikke behøvede at sætte foden på jorden'
    }
];

const HINGE_MODES = [
    {
        id: 'og',
        label: 'OG (fremad)',
        ruleBadge: 'Sideordning • Ingen inversion • "ikke" efter verbet',
        build: (sc, neg) => neg
            ? `Først stod det klart, at ${sc.causeNeg}, og ${sc.effectNeg}.`
            : `${cap(sc.causePos)}, og ${sc.effectPos}.`,
        explain: 'Jævn fremadskriden som to cyklister på samme lige cykelsti. Subjektet står lige efter "og", og et "ikke" bliver efter verbet.'
    },
    {
        id: 'saa',
        label: 'SÅ (let følge)',
        ruleBadge: 'Sideordning • Ingen inversion • "ikke" efter verbet',
        build: (sc, neg) => neg
            ? `Sagen var, at ${sc.causeNeg}, så ${sc.effectNeg}.`
            : `${cap(sc.causePos)}, så ${sc.effectPos}.`,
        explain: 'Trykbølgen ruller blødt frem mod resultatet: efter bindeordet "så" kommer subjektet først (ikke inversion).'
    },
    {
        id: 'derfor',
        label: 'DERFOR (trykbølge + V2)',
        ruleBadge: 'Adverbium forrest • Udløser V2-inversion!',
        build: (sc, neg) => {
            if (sc.id === 'bus') {
                return neg
                    ? 'Bussen kørte ikke videre. Derfor nåede vi ikke mødet klokken ni.'
                    : 'Bussen punkterede i myldretiden. Derfor gik vi gennem byen til fods.';
            }
            if (sc.id === 'skov') {
                return neg
                    ? 'Stien var ikke tørret efter regnen. Derfor løb de ikke ned ad bakken.'
                    : 'Regnen gjorde stien helt glat. Derfor gik vandrerne forsigtigt langs bækken.';
            }
            return neg
                ? 'Trafikken bremsede ikke cyklisterne. Derfor behøvede hun ikke sætte foden på jorden.'
                : 'Alle lyskryds viste grønt i træk. Derfor fløj hun ubesværet hele vejen til havnen.';
        },
        explain: 'Når punktummets eller kommaets kraft rammer "Derfor", står verbet straks på plads 2: "Derfor + verbum + subjekt"!'
    },
    {
        id: 'fordi',
        label: 'FORDI (bakspejl)',
        ruleBadge: 'Ledsætning • "ikke" hopper FØR verbet!',
        build: (sc, neg) => {
            if (sc.id === 'bus') {
                return neg
                    ? 'Vi nåede ikke mødet klokken ni, fordi bussen ikke kørte videre.'
                    : 'Vi gik gennem byen til fods, fordi bussen punkterede i myldretiden.';
            }
            if (sc.id === 'skov') {
                return neg
                    ? 'De løb ikke ned ad bakken, fordi stien ikke var tørret efter regnen.'
                    : 'Vandrerne gik forsigtigt langs bækken, fordi regnen gjorde stien helt glat.';
            }
            return neg
                ? 'Hun behøvede ikke sætte foden på jorden, fordi trafikken ikke bremsede cyklisterne.'
                : 'Hun fløj ubesværet hele vejen til havnen, fordi alle lyskryds viste grønt i træk.';
        },
        explain: 'Bakspejlet: Resultatet står først, og "fordi" åbner ledsætningen med årsagen. Læg mærke til "ikke" FØR verbet ved nægtelse!'
    },
    {
        id: 'for',
        label: 'FOR (forklaring i tale)',
        ruleBadge: 'Helsætning • Kan ikke stå først • "ikke" EFTER verbet',
        build: (sc, neg) => {
            if (sc.id === 'bus') {
                return neg
                    ? 'Vi nåede ikke mødet klokken ni, for bussen kørte ikke videre.'
                    : 'Vi gik gennem byen til fods, for bussen punkterede i myldretiden.';
            }
            if (sc.id === 'skov') {
                return neg
                    ? 'De løb ikke ned ad bakken, for stien var ikke tørret efter regnen.'
                    : 'Vandrerne gik forsigtigt langs bækken, for regnen gjorde stien helt glat.';
            }
            return neg
                ? 'Hun behøvede ikke sætte foden på jorden, for trafikken bremsede ikke cyklisterne.'
                : 'Hun fløj ubesværet hele vejen til havnen, for alle lyskryds viste grønt i træk.';
        },
        explain: 'Samme bakspejls-retning som "fordi", men "for" laver en helsætning — så "ikke" står EFTER verbet ("bussen kørte ikke")!'
    }
];

const QUIZ_QUESTIONS = [
    {
        prompt: 'Du ser årsagen i bakspejlet: først punkteringen, så resultatet. Vælg den rigtige trykbølge fremad med V2-inversion:',
        sentencePrefix: 'Cykelstien var spærret af vejarbejde.',
        sentenceSuffix: 'måtte vi køre en omvej gennem parken.',
        options: ['Derfor', 'Fordi', 'For', 'Og'],
        correct: 'Derfor',
        explanation: 'Når årsagen står i den første sætning, driver "Derfor" konsekvensen frem og skubber verbet ("måtte") på plads 2.'
    },
    {
        prompt: 'Du vil bruge det bløde hverdagsord "så" efter en årsag i bytrafikken (uden inversion):',
        sentencePrefix: 'Bussen holdt i kø på broen,',
        sentenceSuffix: 'af bussen og gik langs vandet.',
        options: ['så hun steg', 'derfor hun steg', 'fordi hun steg', 'for hun steg'],
        correct: 'så hun steg',
        explanation: 'Efter bindeordet "så" kommer subjektet først ("så hun steg"). Efter "Derfor" skulle verbet stå først ("Derfor steg hun").'
    },
    {
        prompt: 'En ven spørger: "Hvorfor har du mudder på støvlerne?" Hvordan starter du dit svar?',
        sentencePrefix: '',
        sentenceSuffix: 'stien gennem mosen var helt oversvømmet!',
        options: ['Fordi', 'For', 'Derfor', 'Så'],
        correct: 'Fordi',
        explanation: 'Man svarer altid på "Hvorfor?" med "Fordi..." — aldrig med *"For..."!'
    },
    {
        prompt: 'Test "ikke"-reglen i ledsætningen med "fordi" på vandreturen:',
        sentencePrefix: 'Vi gik tilbage til bilen,',
        sentenceSuffix: 'med på ruten.',
        options: [
            'fordi solen ikke skinnede',
            'fordi solen skinnede ikke',
            'for solen ikke skinnede',
            'derfor solen ikke skinnede'
        ],
        correct: 'fordi solen ikke skinnede',
        explanation: 'I en ledsætning efter "fordi" står centraladverbiet "ikke" FØR verbet: "fordi solen ikke skinnede".'
    },
    {
        prompt: 'Nu samme betydning med "for" (helsætning): Hvor står "ikke"?',
        sentencePrefix: 'Vi blev indenfor ved søen,',
        sentenceSuffix: 'til at bade.',
        options: [
            'for vandet var ikke varmt nok',
            'for vandet ikke var varmt nok',
            'derfor vandet var ikke varmt nok',
            'og vandet ikke var varmt nok'
        ],
        correct: 'for vandet var ikke varmt nok',
        explanation: '"For" forbinder to helsætninger, så i almindelig helsætnings-ordstilling bliver "ikke" stående EFTER verbet ("var ikke").'
    },
    {
        prompt: 'Vælg det bindeord der bare lægger næste naturlige scene på stien til i jævn fart:',
        sentencePrefix: 'Fuglene sang i bøgetræerne,',
        sentenceSuffix: 'vi spiste vores madpakke ved bækken.',
        options: ['og', 'derfor', 'fordi', 'for'],
        correct: 'og',
        explanation: '"Og" skaber rolig, ubesværet fremadskriden fra det ene billede til det næste uden årsags- eller modsætningspres.'
    },
    {
        prompt: 'Du starter hele sætningen med årsagen ("Fordi...") som forfelt. Hvad skal komme lige efter kommaet?',
        sentencePrefix: 'Fordi toget var forsinket,',
        sentenceSuffix: 'hele vejen til skolen.',
        options: [
            'løb Maya',
            'Maya løb',
            'så løb Maya',
            'fordi Maya løb'
        ],
        correct: 'løb Maya',
        explanation: 'Hele fordi-ledsætningen fylder Plads 1! Derfor skal hovedsætningens verbum ("løb") ind på Plads 2 lige efter kommaet.'
    },
    {
        prompt: 'Find sætningen med korrekt ordstilling efter "Derfor":',
        sentencePrefix: 'Broen var lukket for biler.',
        sentenceSuffix: '',
        options: [
            'Derfor valgte pendlerne cyklen i dag.',
            'Derfor pendlerne valgte cyklen i dag.',
            'Derfor cyklen valgte pendlerne i dag.',
            'Derfor ikke pendlerne valgte cyklen i dag.'
        ],
        correct: 'Derfor valgte pendlerne cyklen i dag.',
        explanation: '"Derfor" på plads 1 tvinger verbet ("valgte") på plads 2 og subjektet ("pendlerne") på plads 3.'
    },
    {
        prompt: 'Hvilken forskel beskriver "derfor" og "fordi" bedst?',
        sentencePrefix: 'Vælg den præcise sammenhæng:',
        sentenceSuffix: '',
        options: [
            '"Derfor" peger fremad mod resultatet; "fordi" ser i bakspejlet på årsagen.',
            '"Derfor" ser tilbage på årsagen; "fordi" peger frem mod resultatet.',
            'Begge bruges kun om fremtiden i bytrafikken.',
            'Begge kræver altid, at "ikke" står efter verbet.'
        ],
        correct: '"Derfor" peger fremad mod resultatet; "fordi" ser i bakspejlet på årsagen.',
        explanation: 'Årsag → Derfor + resultat. Resultat ← fordi + årsag.'
    }
];

function cap(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function renderSansningFremdriftView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const backTarget = extraData.from === 'flade4' ? 'sansning_flade4' : 'grammatik_sansning';
    const backLabel = extraData.from === 'flade4' ? '← Tilbage til hovedflade 4' : '← Tilbage til oversigt';

    let activeTab = 'lab';
    let pureMode = false;
    let selectedHotspotId = FREMDRIFT_HOTSPOTS[0].id;
    let activeScenarioId = LAB_SCENARIOS[0].id;
    let activeHingeId = HINGE_MODES[0].id;
    let negativeMode = false;
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
        .ss-inner { max-width: 1120px; margin: 0 auto; }
        .ss-top-bar { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.75rem; margin-bottom:1.5rem; }
        .ss-back-btn {
            background: rgba(255,255,255,0.08); border: 1px solid rgba(255,190,198,0.28);
            color: #FFE4E6; padding: 0.5rem 1rem; border-radius: 999px; font-size: 0.88rem; font-weight: 700; cursor: pointer;
        }
        .ss-back-btn:hover { background: rgba(255,255,255,0.16); transform: translateX(-2px); }
        .ss-station-badge {
            background: rgba(56,189,248,0.16); border: 1px solid rgba(56,189,248,0.4);
            color: #BAE6FD; padding: 0.42rem 0.95rem; border-radius: 999px; font-size: 0.82rem; font-weight: 800;
        }
        .ss-hero { text-align: center; margin-bottom: 1.75rem; }
        .ss-hero h1 { margin: 0 0 0.5rem; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 900; color: #FFF; }
        .ss-hero p { margin: 0 auto; max-width: 720px; color: #FBD5D9; font-size: 1rem; line-height: 1.55; }
        .ss-tabs-nav { display: flex; justify-content: center; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.75rem; }
        .ss-tab-btn {
            background: rgba(255,255,255,0.07); border: 1px solid rgba(255,190,198,0.2);
            color: #FBD5D9; padding: 0.65rem 1.2rem; border-radius: 12px; font-size: 0.92rem; font-weight: 800; cursor: pointer;
        }
        .ss-tab-btn.active { background: #FF4D5E; border-color: #FF8A95; color: #FFF; box-shadow: 0 8px 20px rgba(255,77,94,0.3); }
        .contrast-canvas-card {
            background: rgba(34, 4, 8, 0.72); border: 1px solid rgba(255,190,198,0.2);
            border-radius: 22px; padding: 1.25rem; margin-bottom: 1.25rem;
        }
        .contrast-control-bar { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-bottom:1rem; }
        .contrast-hint { font-size: 0.9rem; color: #FBD5D9; font-weight: 600; }
        .pure-toggle-btn {
            background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25);
            color: #FFF; padding: 0.45rem 0.95rem; border-radius: 999px; font-size: 0.84rem; font-weight: 700; cursor: pointer;
        }
        .pure-toggle-btn.active { background: rgba(56,189,248,0.25); border-color: #38bdf8; color: #BAE6FD; }
        .contrast-split-stage { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
        @media (max-width: 820px) { .contrast-split-stage { grid-template-columns: 1fr; } }
        .stage-half { border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.14); background: #1A0306; }
        .stage-half-header { padding: 0.65rem 1rem; font-size: 0.88rem; font-weight: 800; display:flex; justify-content:space-between; }
        .stage-half-header.cool { background: rgba(56,189,248,0.18); color: #BAE6FD; border-bottom: 1px solid rgba(56,189,248,0.3); }
        .stage-half-header.warm { background: rgba(251,146,60,0.18); color: #FED7AA; border-bottom: 1px solid rgba(251,146,60,0.3); }
        .stage-img-wrap { position: relative; aspect-ratio: 4 / 3; width: 100%; overflow: hidden; }
        .stage-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ss-hotspot {
            position: absolute; transform: translate(-50%, -50%); background: rgba(34,4,8,0.9); color: #FFF;
            border: 2px solid #FFF; border-radius: 999px; padding: 0.32rem 0.72rem; font-size: 0.78rem;
            font-weight: 800; cursor: pointer; white-space: nowrap; box-shadow: 0 6px 16px rgba(0,0,0,0.45);
        }
        .ss-hotspot.cool { border-color: #38bdf8; }
        .ss-hotspot.warm { border-color: #fb923c; }
        .ss-hotspot.selected, .ss-hotspot:hover { transform: translate(-50%, -50%) scale(1.1); background: #FF4D5E; border-color: #FFF; z-index: 4; }
        .ss-hotspots-strip { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
        .ss-strip-btn {
            background: rgba(255,255,255,0.08); border: 1px solid rgba(255,190,198,0.22);
            color: #FFE4E6; padding: 0.42rem 0.85rem; border-radius: 999px; font-size: 0.83rem; font-weight: 700; cursor: pointer;
        }
        .ss-strip-btn.selected { background: #FF4D5E; border-color: #FF8A95; color: #FFF; }
        .ss-detail-card {
            background: rgba(255,255,255,0.06); border: 1px solid rgba(255,190,198,0.22);
            border-radius: 20px; padding: 1.5rem; margin-bottom: 1.5rem;
        }
        .ss-detail-top { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.75rem; margin-bottom:0.75rem; }
        .ss-detail-badge {
            font-size: 0.78rem; font-weight: 800; padding: 0.3rem 0.75rem; border-radius: 999px;
            background: rgba(56,189,248,0.18); color: #BAE6FD; border: 1px solid rgba(56,189,248,0.35);
        }
        .ss-detail-badge.warm { background: rgba(251,146,60,0.18); color: #FED7AA; border-color: rgba(251,146,60,0.35); }
        .ss-tts-btn {
            background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.28);
            color: #FFF; padding: 0.42rem 0.9rem; border-radius: 999px; font-size: 0.84rem; font-weight: 700; cursor: pointer;
        }
        .ss-detail-sentence {
            font-size: 1.15rem; font-weight: 700; color: #FFF; background: rgba(0,0,0,0.24);
            padding: 0.9rem 1.1rem; border-radius: 12px; margin: 0.75rem 0 1rem; border-left: 4px solid #38bdf8;
        }
        .ss-detail-sentence.warm { border-left-color: #fb923c; }
        .ss-congruence-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; margin-bottom: 1rem; }
        @media (max-width: 720px) { .ss-congruence-grid { grid-template-columns: 1fr; } }
        .ss-contrast-box { border-radius: 14px; padding: 1rem; font-size: 0.92rem; line-height: 1.5; }
        .ss-contrast-box.naerhed { background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.28); }
        .ss-contrast-box.afstand { background: rgba(251,146,60,0.1); border: 1px solid rgba(251,146,60,0.28); }
        .ss-contrast-box strong { display:block; margin-bottom:0.35rem; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.04em; }
        .ss-insp-aha {
            background: rgba(255,77,94,0.14); border: 1px solid rgba(255,138,149,0.35);
            border-radius: 14px; padding: 0.95rem 1.1rem; color: #FFE4E6; font-size: 0.93rem; line-height: 1.5; margin-bottom: 0.9rem;
        }
        .ss-insp-languages { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .ss-lang-pill {
            background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14);
            border-radius: 8px; padding: 0.35rem 0.7rem; font-size: 0.82rem; color: #FBD5D9;
        }
        /* Lab */
        .flow-lab-card {
            background: rgba(34, 4, 8, 0.76); border: 1px solid rgba(255,190,198,0.24);
            border-radius: 22px; padding: 1.6rem;
        }
        .flow-chip-row { display:flex; flex-wrap:wrap; gap:0.55rem; margin-bottom:1rem; }
        .flow-chip {
            background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2);
            color: #FFE4E6; padding: 0.45rem 0.95rem; border-radius: 999px; font-size: 0.86rem; font-weight: 700; cursor: pointer;
        }
        .flow-chip.active { background: #38bdf8; border-color: #7dd3fc; color: #082f49; }
        .flow-hinge-btn {
            background: rgba(255,255,255,0.08); border: 1px solid rgba(255,190,198,0.25);
            color: #FFF; padding: 0.65rem 1rem; border-radius: 12px; font-size: 0.9rem; font-weight: 800; cursor: pointer;
        }
        .flow-hinge-btn.active { background: #FF4D5E; border-color: #FF8A95; }
        .flow-result-box {
            background: rgba(0,0,0,0.34); border: 1px solid rgba(255,255,255,0.16);
            border-radius: 16px; padding: 1.3rem; margin-top: 0.75rem;
        }
        .flow-sentence { font-size: 1.25rem; font-weight: 800; color: #FFF; margin: 0.65rem 0; line-height: 1.45; }
        /* Quiz */
        .ss-quiz-card {
            background: rgba(34, 4, 8, 0.78); border: 1px solid rgba(255,190,198,0.24);
            border-radius: 22px; padding: 1.75rem; max-width: 780px; margin: 0 auto;
        }
        .ss-quiz-progress { display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; color:#FBD5D9; margin-bottom:1rem; }
        .ss-quiz-prompt { font-size: 1.05rem; color: #FFE4E6; margin-bottom: 0.85rem; line-height: 1.5; }
        .ss-quiz-target { font-size: 1.2rem; font-weight: 800; background: rgba(0,0,0,0.3); padding: 0.95rem 1.1rem; border-radius: 12px; margin-bottom: 1.1rem; color: #FFF; }
        .ss-quiz-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 600px) { .ss-quiz-options { grid-template-columns: 1fr; } }
        .ss-quiz-opt-btn {
            background: rgba(255,255,255,0.08); border: 1px solid rgba(255,190,198,0.25); color: #FFF;
            padding: 0.85rem 1rem; border-radius: 12px; font-size: 0.98rem; font-weight: 700; cursor: pointer; text-align: left;
        }
        .ss-quiz-opt-btn.correct { background: rgba(34,197,94,0.25); border-color: #4ade80; color: #dcfce7; }
        .ss-quiz-opt-btn.wrong { background: rgba(239,68,68,0.28); border-color: #f87171; color: #fee2e2; }
        .ss-quiz-feedback {
            margin-top: 1.1rem; padding: 1rem 1.1rem; border-radius: 12px;
            background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.18); font-size: 0.94rem; line-height: 1.5;
        }
        .ss-quiz-next-btn {
            margin-top: 1rem; background: #FF4D5E; border: none; color: #FFF;
            padding: 0.72rem 1.35rem; border-radius: 10px; font-size: 0.92rem; font-weight: 800; cursor: pointer;
        }
    `;
    wrapper.appendChild(styleEl);

    const inner = document.createElement('div');
    inner.className = 'ss-inner';
    wrapper.appendChild(inner);
    container.appendChild(wrapper);

    function render() {
        const selectedHotspot = FREMDRIFT_HOTSPOTS.find((h) => h.id === selectedHotspotId) || FREMDRIFT_HOTSPOTS[0];
        const scenario = LAB_SCENARIOS.find((s) => s.id === activeScenarioId) || LAB_SCENARIOS[0];
        const hinge = HINGE_MODES.find((m) => m.id === activeHingeId) || HINGE_MODES[0];

        let mainPanelHtml = '';
        if (activeTab === 'vrimmel') {
            const leftSpots = FREMDRIFT_HOTSPOTS.filter((h) => h.side === 'left');
            const rightSpots = FREMDRIFT_HOTSPOTS.filter((h) => h.side === 'right');

            mainPanelHtml = `
                <div class="contrast-canvas-card">
                    <div class="contrast-control-bar">
                        <span class="contrast-hint">Klik i bytrafikken eller på vandrestien for at mærke bevægelsen fremad mod blikket i bakspejlet.</span>
                        <button type="button" class="pure-toggle-btn ${pureMode ? 'active' : ''}" id="btn-pure-mode">
                            ${pureMode ? 'Vis ledetråde' : 'Kun billeder (ren sansning)'}
                        </button>
                    </div>
                    <div class="contrast-split-stage">
                        <div class="stage-half">
                            <div class="stage-half-header cool">
                                <span>Fri fremdrift (grøn bølge & følge)</span>
                                <span>og, derfor, så</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_fremdrift_venstre.jpg" alt="Grøn bølge på cykelsti, vandrere langs bækken og gul bybus" />
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
                                <span>Blikket i bakspejlet (årsag bagud)</span>
                                <span>fordi, for</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_fremdrift_hoejre.jpg" alt="Bilist der kigger i bakspejlet mod punkteret bybus og mudret skovsti" />
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
                        ${FREMDRIFT_HOTSPOTS.map((h) => `
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
                            <strong>Mekanisk kraft</strong>
                            ${selectedHotspot.mechDesc}
                        </div>
                        <div class="ss-contrast-box afstand">
                            <strong>Ordstilling & kontrast</strong>
                            ${selectedHotspot.contrastDesc}
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
        } else if (activeTab === 'lab') {
            const generatedSentence = hinge.build(scenario, negativeMode);
            mainPanelHtml = `
                <div class="flow-lab-card">
                    <h2 style="margin:0 0 0.35rem; font-size:1.4rem; font-weight:900;">Kæde- og ordstillings-lab</h2>
                    <p style="margin:0 0 1rem; color:#FBD5D9; font-size:0.94rem;">
                        Skift hængsel mellem trafik- og vandrescenarierne — og slå <strong>"ikke"-testen</strong> til for at se, om <em>ikke</em> står før eller efter verbet!
                    </p>

                    <div class="flow-chip-row">
                        ${LAB_SCENARIOS.map((sc) => `
                            <button type="button" class="flow-chip ${sc.id === activeScenarioId ? 'active' : ''}" data-sc="${sc.id}">
                                ${sc.label}
                            </button>
                        `).join('')}
                        <button type="button" class="flow-chip ${negativeMode ? 'active' : ''}" id="btn-toggle-neg">
                            ${negativeMode ? 'Test med "ikke": Til' : 'Test med "ikke": Fra'}
                        </button>
                    </div>

                    <div class="flow-chip-row">
                        ${HINGE_MODES.map((m) => `
                            <button type="button" class="flow-hinge-btn ${m.id === activeHingeId ? 'active' : ''}" data-hinge="${m.id}">
                                ${m.label}
                            </button>
                        `).join('')}
                    </div>

                    <div class="flow-result-box">
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;">
                            <span class="ss-detail-badge ${hinge.id === 'fordi' || hinge.id === 'for' ? 'warm' : ''}">${hinge.ruleBadge}</span>
                            <button type="button" class="ss-tts-btn" id="btn-tts-lab" data-say="${generatedSentence.replace(/"/g, '&quot;')}">🔊 Lyt til sætningen</button>
                        </div>
                        <div class="flow-sentence">"${generatedSentence}"</div>
                        <p style="margin:0;color:#FFE4E6;font-size:0.95rem;line-height:1.5;">${hinge.explain}</p>
                    </div>
                </div>
            `;
        } else {
            if (quizIndex >= QUIZ_QUESTIONS.length) {
                mainPanelHtml = `
                    <div class="ss-quiz-card" style="text-align:center;">
                        <h2 style="margin:0 0 0.6rem;font-size:1.7rem;font-weight:900;">Fremdrifts-træningen fuldført!</h2>
                        <p style="font-size:1.15rem;color:#FFE4E6;margin:0 0 1.2rem;">
                            Du fik <strong>${quizScore} ud af ${QUIZ_QUESTIONS.length}</strong> rigtige.
                        </p>
                        <button type="button" class="ss-quiz-next-btn" id="btn-quiz-restart">Prøv igen</button>
                    </div>
                `;
            } else {
                const q = QUIZ_QUESTIONS[quizIndex];
                const completedText = q.sentenceSuffix
                    ? `${q.sentencePrefix ? q.sentencePrefix + ' ' : ''}${q.correct} ${q.sentenceSuffix}`.trim()
                    : `${q.sentencePrefix} ${q.correct}`.trim();

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
                                <strong>${selectedOption === q.correct ? '✅ Grøn bølge!' : '💡 Kig i bakspejlet:'}</strong>
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
                <button type="button" class="ss-back-btn" id="btn-back-fremdrift">${backLabel}</button>
                <span class="ss-station-badge">Station 4.1 • Uhindret fremdrift</span>
            </div>

            <div class="ss-hero">
                <h1>Uhindret fremdrift</h1>
                <p>Fri bane i bytrafik og vandring i natur: mærk forskellen på grøn fremadskriden (<em>og</em>), trykbølgen mod følgen (<em>derfor / så</em>) og blikket i bakspejlet mod årsagen (<em>fordi / for</em>).</p>
            </div>

            <div class="ss-tabs-nav">
                
                <button type="button" class="ss-tab-btn ${activeTab === 'lab' ? 'active' : ''}" data-tab="lab">2. Kæde- & ikke-lab</button>
                <button type="button" class="ss-tab-btn ${activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">3. Fremdrifts-træner</button>
            </div>

            ${mainPanelHtml}
        `;

        inner.querySelector('#btn-back-fremdrift').onclick = () => navigateFn(backTarget);

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

        inner.querySelectorAll('[data-sc]').forEach((btn) => {
            btn.onclick = () => {
                activeScenarioId = btn.dataset.sc;
                render();
            };
        });

        inner.querySelectorAll('[data-hinge]').forEach((btn) => {
            btn.onclick = () => {
                activeHingeId = btn.dataset.hinge;
                render();
            };
        });

        const negBtn = inner.querySelector('#btn-toggle-neg');
        if (negBtn) {
            negBtn.onclick = () => {
                negativeMode = !negativeMode;
                render();
            };
        }

        const ttsLabBtn = inner.querySelector('#btn-tts-lab');
        if (ttsLabBtn) {
            ttsLabBtn.onclick = () => speakDanish(ttsLabBtn.dataset.say);
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
