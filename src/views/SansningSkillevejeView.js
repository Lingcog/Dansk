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

const SKILLEVEJE_HOTSPOTS = [
    {
        id: 'hvis_kant',
        side: 'left',
        x: 24,
        y: 48,
        badge: 'Hængebroen • Betingelsens første skridt',
        word: 'hvis (springbræt)',
        title: 'Hvis — når du træder forsigtigt ud på betingelsen',
        sentence: 'Hvis stien er tør i morgen, vandrer vi hele vejen over til hytten.',
        translation: {
            en: 'if (hypothetical condition)',
            de: 'wenn / falls',
            es: 'si (condición)',
            ar: 'إذا / لو (شرط افتراضي)'
        },
        mechDesc: 'Du ved endnu ikke med sikkerhed, om det sker — præcis som en vandrer, der mærker efter på det første bræt af hængebroen.',
        contrastDesc: 'Hvis vs. når: "Hvis" = måske sker det (usikkert). "Når" = det sker helt sikkert igen eller på et kendt tidspunkt ("Når bussen kommer...").',
        aha: 'Betingelsen med "Hvis" er en ledsætning: eventuelt "ikke" står FØR verbet ("Hvis det IKKE regner...").'
    },
    {
        id: 'hvis_bro',
        side: 'left',
        x: 52,
        y: 54,
        badge: 'Hængebroen • V2-følge efter kommaet',
        word: 'hvis ..., så ...',
        title: 'Hvis ..., (så) ... — hængebroen der bærer dig over kløften',
        sentence: 'Hvis det bliver koldt i dalen, tænder vi hurtigt et bål ved hytten.',
        translation: {
            en: 'if it gets cold, (then) we light...',
            de: 'wenn es kalt wird, zünden wir...',
            es: 'si hace frío, encendemos...',
            ar: 'إذا برد الجو، نشعل...'
        },
        mechDesc: '"Hvis"-delen spænder broen ud. Den anden del fortæller, hvad der så sker ovre på den anden bred.',
        contrastDesc: 'Når "Hvis..." står forrest, fylder hele sætningen Plads 1! Verbet SKAL derfor komme først efter kommaet: "..., tænder vi" (aldrig *"..., vi tænder").',
        aha: 'Ekstra blødt i tale: Danskere siger ofte "så" efter kommaet ("Hvis bussen er sen, SÅ tager vi metroen") — og efter "så" må subjektet også stå bag verbet eller først: "... så går vi"!'
    },
    {
        id: 'hvis_maal',
        side: 'left',
        x: 85,
        y: 31,
        badge: 'Hængebroen • Betingelsen bagpå',
        word: 'betingelsens mål',
        title: 'Betingelsen bagefter — start på den sikre side',
        sentence: 'Vi når frem til hytten før mørket, hvis vi holder et godt tempo nu.',
        translation: {
            en: 'we will reach the cabin if we keep pace',
            de: 'wir erreichen die Hütte, wenn...',
            es: 'llegaremos a la cabaña si...',
            ar: 'سنصل إلى الكوخ إذا حافظنا على سرعتنا'
        },
        mechDesc: 'Du kan vende hængebroen om: start med målet ("Vi når frem...") og hæng betingelsen på bagefter ("... hvis...").',
        contrastDesc: 'Her bevares helt normal lige-frem ordstilling i første del, fordi "hvis..." ikke sidder på Plads 1.',
        aha: 'I skriftligt dansk bruges præsens (nutid) næsten altid i "hvis"-sætningen, selv om du taler om fremtiden ("Hvis det regner i morgen..." — ikke *"Hvis det vil regne").'
    },
    {
        id: 'hvis_ikke',
        side: 'left',
        x: 50,
        y: 82,
        badge: 'Hængebroen • Negativ betingelse',
        word: 'hvis ikke / medmindre',
        title: 'Hvis ikke & medmindre — undtagelsen over kløften',
        sentence: 'Vi kan ikke krydse floden, medmindre hængebroen holder.',
        translation: {
            en: 'unless / if not',
            de: 'es sei denn / wenn nicht',
            es: 'a menos que / si no',
            ar: 'إلا إذا / ما لم'
        },
        mechDesc: '"Medmindre" betyder præcis "hvis ikke" og fungerer som en sikkerhedsline over kløften.',
        contrastDesc: 'Med "hvis ikke" står "ikke" FØR verbet: "Hvis toget IKKE kommer til tiden...". Med "medmindre" ligger nægtelsen allerede indbygget.',
        aha: 'Kombinér aldrig *"medmindre ikke" — "medmindre" betyder allerede "hvis ikke"!'
    },
    {
        id: 'eller_kyst',
        side: 'right',
        x: 20,
        y: 46,
        badge: 'Skillevejen • Åbent valg',
        word: 'eller (kyststien)',
        title: 'Eller — frit valg mellem to muligheder',
        sentence: 'Vil du have kaffe eller te, før vi går ud langs kysten?',
        translation: {
            en: 'or (open choice)',
            de: 'oder',
            es: 'o',
            ar: 'أو (اختيار مفتوح بين مسارين)'
        },
        mechDesc: 'En blød vejgaffel hvor begge stier er åbne — du kan vælge den ene, den anden, eller spørge frit.',
        contrastDesc: 'Mellem to hele sætninger udløser "eller" IKKE inversion: "Tager vi kyststien, eller går vi ind i skoven?"',
        aha: 'Uden tryk er "eller" let og venligt. Vil du gøre valget skarpt ("kun én af delene!"), lægger du "enten" foran!'
    },
    {
        id: 'eller_skilt',
        side: 'right',
        x: 54,
        y: 48,
        badge: 'Skillevejen • Skarp gaffel',
        word: 'enten ... eller ...',
        title: 'Enten ... eller ... — vælg den ene af to retninger',
        sentence: 'I dag må vi vælge: enten følger vi kysten til venstre, eller også går vi til søen til højre.',
        translation: {
            en: 'either ... or ...',
            de: 'entweder ... oder ...',
            es: 'o bien ... o bien ...',
            ar: 'إما ... أو ... (حصر الاختيار في واحد)'
        },
        mechDesc: 'Vejgaflen låses til præcis ét af de to spor: hvis du går til venstre, vælger du automatisk højre fra.',
        contrastDesc: 'Hvis "Enten" står helt først foran en hel sætning, kommer subjektet normalt først: "Enten cykler vi, eller også tager vi bussen" (her står verbet efter enten i visse faste udtryk, men typisk sættes "enten" foran det led, der vælges!).',
        aha: 'Vil du afvise BEGGE veje på én gang? Så skifter "enten ... eller" til "hverken ... eller": "Jeg tager hverken bus eller tog — jeg går!"'
    },
    {
        id: 'eller_skov',
        side: 'right',
        x: 82,
        y: 48,
        badge: 'Skillevejen • By & skov',
        word: 'eller (skovsø & by)',
        title: 'Eller i bytrafik og hverdagssprog',
        sentence: 'Du kan nå stationen med sporvogn eller cykel på ti minutter.',
        translation: {
            en: 'by tram or bicycle',
            de: 'mit der Straßenbahn oder dem Fahrrad',
            es: 'en tranvía o en bicicleta',
            ar: 'بالترام أو بالدراجة'
        },
        mechDesc: 'Begge transportmidler fører dig frem — vælg den vej, der passer bedst til vejret.',
        contrastDesc: 'Læg mærke til "eller også" mellem to helsætninger: det gør valget ekstra tydeligt i talesprog.',
        aha: 'Efter "eller" behøver du ikke gentage subjektet, hvis det er det samme: "Hun vil drikke te eller (hun vil) hvile sig."'
    },
    {
        id: 'eller_vandrer',
        side: 'right',
        x: 49,
        y: 64,
        badge: 'Skillevejen • Pause med kort',
        word: 'skillevejen',
        title: 'Hverken ... eller ... — når begge veje lukkes',
        sentence: 'Vandreren havde hverken kompas eller paraply i tasken.',
        translation: {
            en: 'neither ... nor ...',
            de: 'weder ... noch ...',
            es: 'ni ... ni ...',
            ar: 'لا ... ولا ... (نفي المسارين معًا)'
        },
        mechDesc: 'En lukket bom på begge sider af vejgaflen: ingen af mulighederne gælder.',
        contrastDesc: 'Brug IKKE "ikke" sammen med "hverken ... eller" — man siger "Jeg har hverken bil eller cykel", aldrig *"Jeg har ikke hverken...".',
        aha: 'Det svarer præcis til "næppe"-reglen fra Flade 3: ordet bærer allerede sin egen nægtelse!'
    }
];

const LAB_SCENARIOS = [
    {
        id: 'hytte',
        label: 'Hængebro & fjeldhytte',
        hvisCond: 'det bliver koldt i aften',
        hvisCondNeg: 'vi ikke når frem før solen går ned',
        hvisResultV2: 'tænder vi brændeovnen i hytten',
        hvisResultSVO: 'vi tænder brændeovnen i hytten',
        naarSentence: 'Når solen går ned om aftenen, tænder vi altid brændeovnen.',
        choiceOptA: 'vi tager stien langs kysten',
        choiceOptB: 'vi følger vejen gennem skoven',
        neitherText: 'Vi har hverken lommelygte eller tændstikker i rygsækken.'
    },
    {
        id: 'trafik',
        label: 'Bytrafik & myldretid',
        hvisCond: 'bussen sidder fast i trafikken',
        hvisCondNeg: 'trafikken ikke letter inden ti minutter',
        hvisResultV2: 'stiger jeg af og går resten af vejen',
        hvisResultSVO: 'jeg stiger af og går resten af vejen',
        naarSentence: 'Når klokken slår otte hver morgen, fyldes broen med cyklister.',
        choiceOptA: 'du kan tage S-toget direkte til Nørreport',
        choiceOptB: 'du kan låne min cykel ved stationen',
        neitherText: 'I dag kører der hverken sporvogne eller bybusser gennem gaden.'
    }
];

const LAB_HINGES = [
    {
        id: 'hvis_front',
        label: 'HVIS forrest (+ V2)',
        badge: 'Hypotetisk hængebro • Usikker betingelse • V2 efter komma!',
        build: (sc) => `Hvis ${sc.hvisCond}, ${sc.hvisResultV2}.`,
        explain: 'Hele hvis-sætningen fylder Plads 1. Derfor skubbes verbet straks frem på Plads 2 efter kommaet! Bruges når noget er usikkert / betinget.'
    },
    {
        id: 'hvis_ikke',
        label: 'HVIS IKKE (ledsætning)',
        badge: 'Negativ betingelse • "ikke" står FØR verbet!',
        build: (sc) => `Hvis ${sc.hvisCondNeg}, ${sc.hvisResultV2}.`,
        explain: 'I en hvis-ledsætning hopper "ikke" altid FØR verbet! Du kan også sige "medmindre..." for at udtrykke det modsatte.'
    },
    {
        id: 'hvis_back',
        label: '... HVIS ... (bagpå)',
        badge: 'Resultat først • Betingelse bagefter',
        build: (sc) => `${cap(sc.hvisResultSVO)}, hvis ${sc.hvisCond}.`,
        explain: 'Når resultatet står først, har første del helt almindelig subjekt-først ordstilling.'
    },
    {
        id: 'naar_fast',
        label: 'NÅR (sikker / gentaget)',
        badge: 'Kontrast: NÅR = helt sikkert eller hver gang',
        build: (sc) => sc.naarSentence,
        explain: 'Klassisk dansk kontrast mod engelsk "when/if" og tysk "wenn": brug HVIS om usikre muligheder, men NÅR om faste tidspunkter og vaner!'
    },
    {
        id: 'enten_eller',
        label: 'ENTEN ... ELLER ...',
        badge: 'Skillevej • Kun én af de to stier',
        build: (sc) => `Enten ${sc.choiceOptA}, eller også ${sc.choiceOptB}.`,
        explain: '"Enten ... eller (også)" låser vejgaflen til ét af de to spor. Med blot "eller" holder du valget blødt og åbent.'
    },
    {
        id: 'hverken_eller',
        label: 'HVERKEN ... ELLER',
        badge: 'Begge veje lukket • Ingen "ikke"!',
        build: (sc) => sc.neitherText,
        explain: '"Hverken ... eller" udelukker begge muligheder på én gang — og man sætter aldrig et ekstra "ikke" ind!'
    }
];

const QUIZ_QUESTIONS = [
    {
        prompt: 'Du ved endnu ikke, om solen skinner i morgen, så grunden er usikker. Hvad vælger du?',
        sentencePrefix: '',
        sentenceSuffix: 'vejret bliver godt i morgen, cykler vi ud til stranden.',
        options: ['Hvis', 'Når', 'Fordi', 'Alligevel'],
        correct: 'Hvis',
        explanation: 'Når det er usikkert, om betingelsen bliver opfyldt ("måske skinner solen"), bruger dansk "Hvis".'
    },
    {
        prompt: 'Nu taler du om noget, der sker HELT SIKKERT hver morgen (eller i kalenderen):',
        sentencePrefix: '',
        sentenceSuffix: 'klokken slår halv otte, går vi ud ad døren.',
        options: ['Når', 'Hvis', 'Eller', 'Medmindre'],
        correct: 'Når',
        explanation: 'Ved sikre tidspunkter og faste vaner ("hver gang") bruger man altid "Når" på dansk — aldrig "Hvis".'
    },
    {
        prompt: 'Du starter med "Hvis det regner i aften,". Hvilken fortsættelse har KORREKT ordstilling?',
        sentencePrefix: 'Hvis det regner i aften,',
        sentenceSuffix: 'en god bog indendørs.',
        options: [
            'læser vi',
            'vi læser',
            'så vi ikke læser',
            'fordi læser vi'
        ],
        correct: 'læser vi',
        explanation: 'Hvis-ledsætningen står på Plads 1! Derfor skal hovedsætningens verbum ("læser") ind på Plads 2 lige efter kommaet.'
    },
    {
        prompt: 'Hvor skal "ikke" stå i en "hvis"-ledsætning?',
        sentencePrefix: 'Vi tager bussen til centrum,',
        sentenceSuffix: 'i tide.',
        options: [
            'hvis toget ikke kommer',
            'hvis toget kommer ikke',
            'hvis kommer toget ikke',
            'når toget kommer ikke'
        ],
        correct: 'hvis toget ikke kommer',
        explanation: '"Hvis" åbner en ledsætning, så "ikke" hopper FØR verbet: "hvis toget ikke kommer".'
    },
    {
        prompt: 'Du står ved skillevejen i skoven: kaffe, te eller to stier. Hvad forbinder valget?',
        sentencePrefix: 'Vil du følge kysten langs vandet',
        sentenceSuffix: 'gå ind gennem bøgeskoven?',
        options: ['eller', 'hvis', 'fordi', 'derfor'],
        correct: 'eller',
        explanation: '"Eller" stiller de to muligheder op som et frit valg ved skillevejen.'
    },
    {
        prompt: 'Du har slet ingen kontanter og slet intet kort med på turen. Vælg den korrekte "hverken ... eller"-sætning:',
        sentencePrefix: 'Find den rigtige sætning:',
        sentenceSuffix: '',
        options: [
            'Jeg har hverken kontanter eller rejsekort på mig.',
            'Jeg har ikke hverken kontanter eller rejsekort på mig.',
            'Jeg har hverken kontanter ikke eller rejsekort på mig.',
            'Jeg har enten kontanter eller ikke rejsekort på mig.'
        ],
        correct: 'Jeg har hverken kontanter eller rejsekort på mig.',
        explanation: '"Hverken ... eller" indeholder allerede nægtelsen i sig — så man sætter ALDRIG "ikke" sammen med det.'
    },
    {
        prompt: 'Hvilken sætning bruger fremtid med "hvis" på naturligt dansk?',
        sentencePrefix: 'Vælg det naturligste dansk:',
        sentenceSuffix: '',
        options: [
            'Hvis bussen kommer til tiden, når vi færgen.',
            'Hvis bussen vil komme til tiden, når vi færgen.',
            'Hvis bussen kommer til tiden, vi når færgen.',
            'Hvis bussen at komme til tiden, når vi færgen.'
        ],
        correct: 'Hvis bussen kommer til tiden, når vi færgen.',
        explanation: 'Dansk bruger nutid ("kommer") efter "hvis" om fremtidige betingelser (ikke engelsk *"will come") og V2-inversion ("når vi") efter kommaet.'
    },
    {
        prompt: 'Test ordet "medmindre" (som betyder "hvis ikke"): Hvilken sætning er rigtig?',
        sentencePrefix: 'Vi spiser frokost ude på terrassen,',
        sentenceSuffix: 'begynder at øsregne.',
        options: [
            'medmindre det',
            'medmindre det ikke',
            'eller det ikke',
            'hvis det'
        ],
        correct: 'medmindre det',
        explanation: '"Medmindre" betyder allerede "hvis ikke", så "medmindre det begynder at øsregne" = "hvis det ikke begynder at øsregne".'
    }
];

function cap(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function renderSansningSkillevejeView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const backTarget = extraData.from === 'flade4' ? 'sansning_flade4' : 'grammatik_sansning';
    const backLabel = extraData.from === 'flade4' ? '← Tilbage til hovedflade 4' : '← Tilbage til oversigt';

    let activeTab = 'vrimmel';
    let pureMode = false;
    let selectedHotspotId = SKILLEVEJE_HOTSPOTS[0].id;
    let activeScenarioId = LAB_SCENARIOS[0].id;
    let activeHingeId = LAB_HINGES[0].id;
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
        .fork-lab-card {
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
        const selectedHotspot = SKILLEVEJE_HOTSPOTS.find((h) => h.id === selectedHotspotId) || SKILLEVEJE_HOTSPOTS[0];
        const scenario = LAB_SCENARIOS.find((s) => s.id === activeScenarioId) || LAB_SCENARIOS[0];
        const hinge = LAB_HINGES.find((h) => h.id === activeHingeId) || LAB_HINGES[0];

        let mainPanelHtml = '';
        if (activeTab === 'vrimmel') {
            const leftSpots = SKILLEVEJE_HOTSPOTS.filter((h) => h.side === 'left');
            const rightSpots = SKILLEVEJE_HOTSPOTS.filter((h) => h.side === 'right');

            mainPanelHtml = `
                <div class="contrast-canvas-card">
                    <div class="contrast-control-bar">
                        <span class="contrast-hint">Klik ved hængebroen over fjorden (betingelse med hvis) eller ved skillevejen i skoven (eller).</span>
                        <button type="button" class="pure-toggle-btn ${pureMode ? 'active' : ''}" id="btn-pure-mode">
                            ${pureMode ? 'Vis ledetråde' : 'Kun billeder (ren sansning)'}
                        </button>
                    </div>
                    <div class="contrast-split-stage">
                        <div class="stage-half">
                            <div class="stage-half-header cool">
                                <span>Den hypotetiske hængebro</span>
                                <span>hvis, medmindre</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_skilleveje_venstre.jpg" alt="Vandrer ved hængebro over fjord med hytte på modsatte klippe" />
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
                                <span>Skillevejen i skoven</span>
                                <span>eller, enten/hverken ... eller</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_skilleveje_hoejre.svg" alt="Skillevej i skoven mellem kyststi og skovsø" />
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
                        ${SKILLEVEJE_HOTSPOTS.map((h) => `
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
                            <strong>Mekanisk billede</strong>
                            ${selectedHotspot.mechDesc}
                        </div>
                        <div class="ss-contrast-box afstand">
                            <strong>Kontrast & ordstilling</strong>
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
            const outSentence = hinge.build(scenario);
            mainPanelHtml = `
                <div class="fork-lab-card">
                    <h2 style="margin:0 0 0.35rem; font-size:1.4rem; font-weight:900;">Hængebro- & skillevejs-lab</h2>
                    <p style="margin:0 0 1rem; color:#FBD5D9; font-size:0.94rem;">
                        Sammenlign usikre betingelser (<em>hvis</em>), faste gentagelser (<em>når</em>) og skarpe valg ved skillevejen (<em>enten ... eller</em> / <em>hverken ... eller</em>).
                    </p>
                    <div class="flow-chip-row">
                        ${LAB_SCENARIOS.map((sc) => `
                            <button type="button" class="flow-chip ${sc.id === activeScenarioId ? 'active' : ''}" data-sc="${sc.id}">
                                ${sc.label}
                            </button>
                        `).join('')}
                    </div>
                    <div class="flow-chip-row">
                        ${LAB_HINGES.map((h) => `
                            <button type="button" class="flow-hinge-btn ${h.id === activeHingeId ? 'active' : ''}" data-hinge="${h.id}">
                                ${h.label}
                            </button>
                        `).join('')}
                    </div>
                    <div class="flow-result-box">
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;">
                            <span class="ss-detail-badge ${hinge.id === 'enten_eller' || hinge.id === 'hverken_eller' ? 'warm' : ''}">${hinge.badge}</span>
                            <button type="button" class="ss-tts-btn" id="btn-tts-lab" data-say="${outSentence.replace(/"/g, '&quot;')}">🔊 Lyt til sætningen</button>
                        </div>
                        <div class="flow-sentence">"${outSentence}"</div>
                        <p style="margin:0;color:#FFE4E6;font-size:0.95rem;line-height:1.5;">${hinge.explain}</p>
                    </div>
                </div>
            `;
        } else {
            if (quizIndex >= QUIZ_QUESTIONS.length) {
                mainPanelHtml = `
                    <div class="ss-quiz-card" style="text-align:center;">
                        <h2 style="margin:0 0 0.6rem;font-size:1.7rem;font-weight:900;">Skillevejs-træningen fuldført!</h2>
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
                                <strong>${selectedOption === q.correct ? '✅ Sikkert over broen!' : '💡 Tjek betingelsen:'}</strong>
                                ${q.explanation}
                                <div style="margin-top:0.75rem;display:flex;gap:0.6rem;flex-wrap:wrap;align-items:center;">
                                    <button type="button" class="ss-tts-btn" id="btn-tts-quiz" data-say="${completedText.replace(/"/g, '&quot;')}">🔊 Hør sætningen</button>
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
                <button type="button" class="ss-back-btn" id="btn-back-skilleveje">${backLabel}</button>
                <span class="ss-station-badge">Station 4.3 • Valg & skilleveje</span>
            </div>

            <div class="ss-hero">
                <h1>Valg & skilleveje</h1>
                <p>Den hypotetiske hængebro (<em>hvis / når / medmindre</em>) og skillevejen i skoven eller bykrydset (<em>eller / enten ... eller / hverken ... eller</em>).</p>
            </div>

            <div class="ss-tabs-nav">
                
                <button type="button" class="ss-tab-btn ${activeTab === 'vrimmel' ? 'active' : ''}" data-tab="vrimmel">1. Vrimlebillede &amp; skilleveje</button>
                <button type="button" class="ss-tab-btn ${activeTab === 'lab' ? 'active' : ''}" data-tab="lab">2. Hængebro- & skillevejs-lab</button>
                <button type="button" class="ss-tab-btn ${activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">3. Skillevejs-træner</button>
            </div>

            ${mainPanelHtml}
        `;

        inner.querySelector('#btn-back-skilleveje').onclick = () => navigateFn(backTarget);

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
