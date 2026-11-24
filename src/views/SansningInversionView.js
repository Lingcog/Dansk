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

const INVERSION_HOTSPOTS = [
    {
        id: 'svo_subjekt',
        side: 'left',
        x: 22,
        y: 60,
        badge: 'Lige frem (SVO) • Plads 1: Subjekt',
        word: 'Plads 1: Subjekt (Jeg)',
        title: 'Plads 1 — subjektet går roligt forrest',
        sentence: 'Jeg cykler gennem parken hver morgen klokken otte.',
        translation: {
            en: 'I cycle through the park every morning (standard SVO)',
            de: 'Ich radle jeden Morgen durch den Park',
            es: 'Voy en bicicleta por el parque cada mañana',
            ar: 'أركب الدراجة عبر الحديقة كل صباح (ترتيب مباشر)'
        },
        mechDesc: 'Når subjektet (personen der handler) starter på Plads 1, følger verbet naturligt lige bagved på Plads 2.',
        contrastDesc: 'Ligesom en rolig promenade ved søen: 1. Jeg → 2. cykler → 3. gennem parken i dag.',
        aha: 'Det kaldes ligefrem ordstilling (Subjekt – Verbum – Resten).'
    },
    {
        id: 'svo_verbum',
        side: 'left',
        x: 50,
        y: 62,
        badge: 'Lige frem • Plads 2: Låst verbum',
        word: 'Plads 2: Verbum (cykler)',
        title: 'Plads 2 — verbet står altid på sin faste trone!',
        sentence: 'Cyklen ruller lige efter vandreren i rolig takt.',
        translation: {
            en: 'Position 2 belongs to the finite verb',
            de: 'Position 2 gehört immer dem Verb (V2)',
            es: 'El verbo conjugado siempre ocupa el lugar 2',
            ar: 'الموقع الثاني محجوز دائمًا للفعل المصرف'
        },
        mechDesc: 'Dansk er et V2-sprog (Verb-Second): uanset hvad du sætter på Plads 1 i en normal påstandssætning, sidder det nutids-/datidsbøjede verbum fast på Plads 2.',
        contrastDesc: 'Hvis der er to verber (f.eks. "skal cykle" eller "har gået"), er det KUN det første verbum ("skal" / "har"), der står på Plads 2!',
        aha: 'Husk tronen: Plads 2 tilhører altid det første (finitte) verbum!'
    },
    {
        id: 'svo_rest',
        side: 'left',
        x: 79,
        y: 56,
        badge: 'Lige frem • Bagfelt: Sted & tid',
        word: 'Plads 3+: Sted & tid',
        title: 'Når tid og sted venter roligt i bagfeltet',
        sentence: 'Vi vandrer langs søen klokken ni på lørdag.',
        translation: {
            en: 'We hike along the lake at nine on Saturday',
            de: 'Wir wandern am See um neun Uhr',
            es: 'Caminamos junto al lago a las nueve',
            ar: 'نتنزه بجانب البحيرة الساعة التاسعة'
        },
        mechDesc: 'Når tid ("klokken ni") og sted ("langs søen") bliver stående bagved, behøver ingen at bytte plads.',
        contrastDesc: 'Men så snart du vil fremhæve "På lørdag..." eller "Langs søen..." ved at flytte det helt frem på Plads 1, spænder V2-fjederen!',
        aha: 'Forskellen på dansk og engelsk: Engelsk siger "On Saturday we hike", men dansk MÅ bytte og sige "På lørdag vandrer vi"!'
    },
    {
        id: 'v2_fjeder',
        side: 'right',
        x: 20,
        y: 58,
        badge: 'V2-dans • Plads 1: Forfeltet',
        word: 'Plads 1: Tid / sted / årsag',
        title: 'Fjederen spændes — et andet led tager Plads 1!',
        sentence: 'I dag cykler jeg hurtigt gennem parken.',
        translation: {
            en: 'Today, cycle I quickly (Today I cycle...)',
            de: 'Heute fahre ich schnell durch den Park',
            es: 'Hoy voy en bici rápidamente (inversión V2)',
            ar: 'اليوم أركب أنا (الظرف في الأول يدفع الفعل للموقع الثاني)'
        },
        mechDesc: 'Tid ("I dag"), sted ("På stien") eller en hel ledsætning ("Hvis det regner,") hopper ind på Plads 1 og trykker på messingspiralen.',
        contrastDesc: 'Spiralen skyder hele sætningens tyngdepunkt én plads mod højre — undtagen verbet, der holder fast i Plads 2!',
        aha: 'Det er helt mekanisk: når ét led tager Plads 1, er der simpelthen ikke plads til både subjektet og verbet før Plads 3!'
    },
    {
        id: 'v2_verbum',
        side: 'right',
        x: 50,
        y: 52,
        badge: 'V2-dans • Plads 2: Verbet danser frem!',
        word: 'Plads 2: Verbum (cykler!)',
        title: 'Verbet springer ind i spotlightet på Plads 2',
        sentence: 'Efter morgenmaden tager Jonas straks bussen til byen.',
        translation: {
            en: 'After breakfast, Jonas takes the bus (takes Jonas)',
            de: 'Nach dem Frühstück nimmt Jonas den Bus',
            es: 'Después del desayuno, Jonas toma el autobús',
            ar: 'بعد الإفطار يأخذ يوناس الحافلة'
        },
        mechDesc: 'Danseren i midten er det bøjede verbum ("tager", "går", "er", "har", "skal"). Det viger aldrig fra Plads 2!',
        contrastDesc: 'Selv en lang ledsætning som "Selvom bussen punkterede på broen," fylder kun ÉN plads (Plads 1), så verbet kommer lige efter kommaet!',
        aha: 'Komma-test: Når du sætter "Da...", "Når...", "Hvis...", "Fordi..." eller "Selvom..." forrest -> første ord efter kommaet = VERBUM!'
    },
    {
        id: 'v2_subjekt',
        side: 'right',
        x: 79,
        y: 60,
        badge: 'V2-dans • Plads 3: Subjektet følger efter',
        word: 'Plads 3: Subjekt (jeg / vi)',
        title: 'Sætningsdansen — subjektet valser ind bag verbet',
        sentence: 'Gennem den grønne skov vandrer vi helt til solnedgang.',
        translation: {
            en: 'Through the green forest hike we until sunset',
            de: 'Durch den Wald wandern wir bis Sonnenuntergang',
            es: 'Por el bosque caminamos nosotros hasta el atardecer',
            ar: 'عبر الغابة نتنزه نحن (الفاعل يرقص خلف الفعل)'
        },
        mechDesc: 'Subjektet ("vi", "jeg", "Jonas", "bussen") træder høfligt et skridt tilbage på Plads 3, lige efter verbet.',
        contrastDesc: 'Pas på med bro-ord på Plads 0 ("og", "men", "for", "eller", "så"): de tæller IKKE som Plads 1 og giver derfor ikke inversion alene ("Og vi vandrer...").',
        aha: 'Plads 0 ("Og", "Men") rører ikke fjederen. Plads 1 ("I dag", "Derfor", "Alligevel", "Her", "Hvis...") udløser altid dansen!'
    }
];

const DANCE_SCENARIOS = [
    {
        id: 'cykel',
        label: 'Cykeltur gennem parken',
        subj: 'jeg',
        verb: 'cykler',
        objPlace: 'gennem parken',
        time: 'klokken otte',
        condition: 'Hvis solen skinner,',
        adverb: 'Derfor'
    },
    {
        id: 'skov',
        label: 'Vandring ved kysten',
        subj: 'vi',
        verb: 'vandrer',
        objPlace: 'langs den hvide kyst',
        time: 'på lørdag',
        condition: 'Selvom vinden blæser,',
        adverb: 'Alligevel'
    },
    {
        id: 'bus',
        label: 'Bybus til arbejde',
        subj: 'Maja',
        verb: 'tager',
        objPlace: 'linje 42 mod centrum',
        time: 'hver morgen',
        condition: 'Når regnen siler ned,',
        adverb: 'Heldigvis'
    }
];

const DANCE_FRONT_MODES = [
    {
        id: 'svo',
        label: '1. Subjekt forrest (lige frem)',
        usesBridge: false,
        inversion: false,
        slots: (sc) => ({
            f0: null,
            f1: cap(sc.subj),
            f2: sc.verb,
            f3: null,
            f4: `${sc.objPlace} ${sc.time}`
        }),
        explain: 'Subjektet står selv på Plads 1, og verbet følger roligt på Plads 2. Fjederen er ikke spændt (SVO).'
    },
    {
        id: 'tid',
        label: '2. Tid forrest → V2-fjeder!',
        usesBridge: false,
        inversion: true,
        slots: (sc) => ({
            f0: null,
            f1: cap(sc.time),
            f2: sc.verb,
            f3: sc.subj,
            f4: sc.objPlace
        }),
        explain: 'Tidsudtrykket tager Plads 1! V2-fjederen holder verbet på Plads 2 og skubber subjektet ind i dansen på Plads 3.'
    },
    {
        id: 'sted',
        label: '3. Sted forrest → V2-fjeder!',
        usesBridge: false,
        inversion: true,
        slots: (sc) => ({
            f0: null,
            f1: cap(sc.objPlace),
            f2: sc.verb,
            f3: sc.subj,
            f4: sc.time
        }),
        explain: 'Stedet tager Plads 1. Øjeblikkeligt står verbet på Plads 2 foran subjektet på Plads 3!'
    },
    {
        id: 'ledsaetning',
        label: '4. Hel ledsætning forrest → V2!',
        usesBridge: false,
        inversion: true,
        slots: (sc) => ({
            f0: null,
            f1: sc.condition,
            f2: sc.verb,
            f3: sc.subj,
            f4: `${sc.objPlace} ${sc.time}`
        }),
        explain: 'En hel "Hvis / Selvom / Når"-sætning tæller kun som Plads 1! Verbet står derfor lige efter kommaet.'
    },
    {
        id: 'adverbium',
        label: '5. Derfor / Alligevel forrest → V2!',
        usesBridge: false,
        inversion: true,
        slots: (sc) => ({
            f0: null,
            f1: sc.adverb,
            f2: sc.verb,
            f3: sc.subj,
            f4: `${sc.objPlace} ${sc.time}`
        }),
        explain: 'Stærke sætningsadverbier som "Derfor", "Alligevel" og "Heldigvis" tager Plads 1 og udløser altid V2-inversion.'
    },
    {
        id: 'bro_svo',
        label: '6. Bro-ord (Og / Men) på Plads 0',
        usesBridge: true,
        inversion: false,
        slots: (sc) => ({
            f0: 'Og',
            f1: sc.subj,
            f2: sc.verb,
            f3: null,
            f4: `${sc.objPlace} ${sc.time}`
        }),
        explain: 'Pas på forskellen! Sideordnende bindeord ("og", "men", "for", "eller", "så") sidder på Plads 0 — udenfor selve fjederen. Så subjektet kan blive på Plads 1!'
    }
];

const QUIZ_QUESTIONS = [
    {
        prompt: 'Du starter med tid ("I morgen tidlig"). Skub verbet ind på Plads 2!',
        sentencePrefix: 'I morgen tidlig',
        sentenceSuffix: 'ud langs kysten.',
        options: [
            'vandrer vi',
            'vi vandrer',
            'skal vi ikke vandrer',
            'vandrer ikke vi'
        ],
        correct: 'vandrer vi',
        explanation: 'Tid ("I morgen tidlig") fylder Plads 1, så verbet ("vandrer") SKAL stå på Plads 2 før subjektet ("vi").'
    },
    {
        prompt: 'Stedet hopper frem på Plads 1 ("På cykelstien"). Hvad kommer lige efter?',
        sentencePrefix: 'På cykelstien',
        sentenceSuffix: 'altid pænt i højre side.',
        options: [
            'holder cyklisterne',
            'cyklisterne holder',
            'ikke holder cyklisterne',
            'holder altid cyklisterne'
        ],
        correct: 'holder cyklisterne',
        explanation: '"På cykelstien" er Plads 1 → Plads 2 = verbum ("holder") → Plads 3 = subjekt ("cyklisterne"). Centraladverbiet "altid" kommer efter subjektet.'
    },
    {
        prompt: 'Nu sidder bro-ordet "Men" på Plads 0! Udløser "Men" alene inversion?',
        sentencePrefix: 'Det blæste lidt ved søen, men',
        sentenceSuffix: 'en vidunderlig tur.',
        options: [
            'vi fik alligevel',
            'fik vi alligevel',
            'alligevel fik vi',
            'fik ikke vi'
        ],
        correct: 'vi fik alligevel',
        explanation: '"Men" sidder på Plads 0 (bro-feltet) og skubber ikke på fjederen. Subjektet ("vi") står på Plads 1 før verbet ("fik").'
    },
    {
        prompt: 'En hel ledsætning fylder Plads 1 ("Når bussen kommer til stoppestedet,"). Hvordan danser hovedsætningen efter kommaet?',
        sentencePrefix: 'Når bussen kommer til stoppestedet,',
        sentenceSuffix: 'hurtigt ind ad døren.',
        options: [
            'stiger passagererne',
            'passagererne stiger',
            'så passagererne ikke stiger',
            'og stiger passagererne'
        ],
        correct: 'stiger passagererne',
        explanation: 'Hele ledsætningen er Plads 1. Lige efter kommaet er Plads 2, hvor verbet ("stiger") bor!'
    },
    {
        prompt: 'Hvad sker der, når du sætter BÅDE bro-ordet "Og" (Plads 0) OG tiden "derefter" (Plads 1)?',
        sentencePrefix: 'Først spiste vi frokost, og derefter',
        sentenceSuffix: 'videre gennem skoven.',
        options: [
            'gik vi',
            'vi gik',
            'vi ikke gik',
            'gik ikke vi'
        ],
        correct: 'gik vi',
        explanation: '"Og" = Plads 0. "Derefter" = Plads 1. Fordi "derefter" fylder Plads 1, skubber V2-fjederen verbet ("gik") frem på Plads 2!'
    },
    {
        prompt: 'Du har to verber ("kan nå"). Hvilket verbum danser frem på Plads 2, når du starter med "Måske" eller "I dag"?',
        sentencePrefix: 'I dag',
        sentenceSuffix: 'toget klokken ti.',
        options: [
            'kan vi nå',
            'vi kan nå',
            'nå vi kan',
            'kan nå vi'
        ],
        correct: 'kan vi nå',
        explanation: 'Kun det FØRSTE (finitte) verbum ("kan") står på Plads 2! Hovedverbet ("nå") venter roligt efter subjektet ("vi").'
    },
    {
        prompt: 'Hvor placeres nægtelsen "ikke" under sætningsdansen, når "Derfor" er på Plads 1?',
        sentencePrefix: 'Vejen var lukket af sne. Derfor',
        sentenceSuffix: 'frem til hytten i aften.',
        options: [
            'kører vi ikke',
            'ikke kører vi',
            'kører ikke vi',
            'vi ikke kører'
        ],
        correct: 'kører vi ikke',
        explanation: 'Rækkefølgen i hovedsætning med inversion og let pronomen ("vi"): Plads 1 (Derfor) → Plads 2 (kører) → Plads 3 (vi) → Centraladverbium (ikke)!'
    },
    {
        prompt: 'Vælg den eneste HELT RIGTIGE danske sætning:',
        sentencePrefix: 'Tjek V2-reglen:',
        sentenceSuffix: '',
        options: [
            'Hver fredag mødes vi på caféen ved hjørnet.',
            'Hver fredag vi mødes på caféen ved hjørnet.',
            'Hver fredag på caféen vi mødes ved hjørnet.',
            'Fordi det er fredag, vi mødes på caféen.'
        ],
        correct: 'Hver fredag mødes vi på caféen ved hjørnet.',
        explanation: '"Hver fredag" (Plads 1) + "mødes" (Plads 2) + "vi" (Plads 3) følger den danske V2-fjeder til punkt og prikke!'
    }
];

function cap(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function renderSansningInversionView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const backTarget = extraData.from === 'flade4' ? 'sansning_flade4' : 'grammatik_sansning';
    const backLabel = extraData.from === 'flade4' ? '← Tilbage til hovedflade 4' : '← Tilbage til oversigt';

    let activeTab = 'dans';
    let pureMode = false;
    let selectedHotspotId = INVERSION_HOTSPOTS[0].id;
    let activeScenarioId = DANCE_SCENARIOS[0].id;
    let activeFrontId = DANCE_FRONT_MODES[0].id;
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
        /* V2 Dancefloor */
        .dance-card {
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
            color: #FFF; padding: 0.62rem 0.95rem; border-radius: 12px; font-size: 0.88rem; font-weight: 800; cursor: pointer;
        }
        .flow-hinge-btn.active { background: #FF4D5E; border-color: #FF8A95; }
        .dance-stage-slots {
            display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1.15rem 0;
        }
        .dance-slot {
            flex: 1 1 150px; border-radius: 14px; padding: 0.85rem 1rem;
            background: rgba(0,0,0,0.34); border: 2px solid rgba(255,255,255,0.18);
        }
        .dance-slot.s0 { border-color: #94a3b8; }
        .dance-slot.s1 { border-color: #fbbf24; background: rgba(251, 191, 36, 0.12); }
        .dance-slot.s2 { border-color: #FF4D5E; background: rgba(255, 77, 94, 0.16); }
        .dance-slot.s3 { border-color: #38bdf8; background: rgba(56, 189, 248, 0.12); }
        .dance-slot-label {
            display: block; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.04em;
            color: #FBD5D9; text-transform: uppercase; margin-bottom: 0.3rem;
        }
        .dance-slot-word { font-size: 1.18rem; font-weight: 900; color: #FFFFFF; }
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
        const selectedHotspot = INVERSION_HOTSPOTS.find((h) => h.id === selectedHotspotId) || INVERSION_HOTSPOTS[0];
        const scenario = DANCE_SCENARIOS.find((s) => s.id === activeScenarioId) || DANCE_SCENARIOS[0];
        const frontMode = DANCE_FRONT_MODES.find((m) => m.id === activeFrontId) || DANCE_FRONT_MODES[0];

        let mainPanelHtml = '';
        if (activeTab === 'vrimmel') {
            const leftSpots = INVERSION_HOTSPOTS.filter((h) => h.side === 'left');
            const rightSpots = INVERSION_HOTSPOTS.filter((h) => h.side === 'right');

            mainPanelHtml = `
                <div class="contrast-canvas-card">
                    <div class="contrast-control-bar">
                        <span class="contrast-hint">Klik i billederne for at se forskellen på den rolige lige promenade (SVO) og V2-fjederen, der sender verbet på Plads 2.</span>
                        <button type="button" class="pure-toggle-btn ${pureMode ? 'active' : ''}" id="btn-pure-mode">
                            ${pureMode ? 'Vis ledetråde' : 'Kun billeder (ren sansning)'}
                        </button>
                    </div>
                    <div class="contrast-split-stage">
                        <div class="stage-half">
                            <div class="stage-half-header cool">
                                <span>Lige frem (Subjekt + Verbum)</span>
                                <span>Plads 1 → 2 → 3</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_inversion_venstre.svg" alt="Rolig promenade med subjekt forrest og verbum på plads 2" />
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
                                <span>V2-fjederen (Inversionsdans)</span>
                                <span>Forfelt + Verbum + Subjekt</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_inversion_hoejre.svg" alt="Fjeder der skubber verbet ind på plads 2 mens subjektet danser bagved" />
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
                        ${INVERSION_HOTSPOTS.map((h) => `
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
                            <strong>Mekanik i feltet</strong>
                            ${selectedHotspot.mechDesc}
                        </div>
                        <div class="ss-contrast-box afstand">
                            <strong>Kontrast & fælder</strong>
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
        } else if (activeTab === 'dans') {
            const slots = frontMode.slots(scenario);
            const fullSentence = [slots.f0, slots.f1, slots.f2, slots.f3, slots.f4].filter(Boolean).join(' ') + '.';
            mainPanelHtml = `
                <div class="dance-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:0.75rem;">
                        <div>
                            <h2 style="margin:0 0 0.25rem;font-size:1.4rem;font-weight:900;">V2-fjeder-dansegulvet</h2>
                            <p style="margin:0;color:#FBD5D9;font-size:0.93rem;">Sæt et nyt element på <strong>Plads 1 (Forfeltet)</strong> og se fjederen låse verbet fast på <strong>Plads 2</strong>!</p>
                        </div>
                        <button type="button" class="ss-tts-btn" id="btn-tts-dance" data-say="${fullSentence.replace(/"/g, '&quot;')}">🔊 Lyt til sætningen</button>
                    </div>

                    <div class="flow-chip-row">
                        ${DANCE_SCENARIOS.map((sc) => `
                            <button type="button" class="flow-chip ${sc.id === activeScenarioId ? 'active' : ''}" data-sc="${sc.id}">
                                ${sc.label}
                            </button>
                        `).join('')}
                    </div>

                    <div class="flow-chip-row">
                        ${DANCE_FRONT_MODES.map((m) => `
                            <button type="button" class="flow-hinge-btn ${m.id === activeFrontId ? 'active' : ''}" data-front="${m.id}">
                                ${m.label}
                            </button>
                        `).join('')}
                    </div>

                    <div class="dance-stage-slots">
                        ${slots.f0 ? `
                            <div class="dance-slot s0">
                                <span class="dance-slot-label">Plads 0 • Bro-ord</span>
                                <div class="dance-slot-word">${slots.f0}</div>
                            </div>
                        ` : ''}
                        <div class="dance-slot s1">
                            <span class="dance-slot-label">Plads 1 • Forfelt</span>
                            <div class="dance-slot-word">${slots.f1}</div>
                        </div>
                        <div class="dance-slot s2">
                            <span class="dance-slot-label">Plads 2 • VERBUM (låst!)</span>
                            <div class="dance-slot-word">${slots.f2}</div>
                        </div>
                        ${slots.f3 ? `
                            <div class="dance-slot s3">
                                <span class="dance-slot-label">Plads 3 • Subjekt danser</span>
                                <div class="dance-slot-word">${slots.f3}</div>
                            </div>
                        ` : ''}
                        <div class="dance-slot">
                            <span class="dance-slot-label">Bagfelt • Resten</span>
                            <div class="dance-slot-word">${slots.f4}.</div>
                        </div>
                    </div>

                    <div style="background:rgba(0,0,0,0.3);border-radius:14px;padding:1rem 1.15rem;border:1px solid rgba(255,255,255,0.14);">
                        <div style="font-size:1.25rem;font-weight:800;color:#FFF;margin-bottom:0.4rem;">"${fullSentence}"</div>
                        <p style="margin:0;color:#FFE4E6;font-size:0.94rem;line-height:1.5;">
                            <strong>${frontMode.inversion ? '🌀 Inversion aktiv:' : '➡️ Ingen inversion:'}</strong> ${frontMode.explain}
                        </p>
                    </div>
                </div>
            `;
        } else {
            if (quizIndex >= QUIZ_QUESTIONS.length) {
                mainPanelHtml = `
                    <div class="ss-quiz-card" style="text-align:center;">
                        <h2 style="margin:0 0 0.6rem;font-size:1.7rem;font-weight:900;">Sætningsdansen fuldført!</h2>
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
                                <strong>${selectedOption === q.correct ? '✅ Perfekt V2-trin!' : '💡 Se på Plads 1 og Plads 2:'}</strong>
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
                <button type="button" class="ss-back-btn" id="btn-back-inversion">${backLabel}</button>
                <span class="ss-station-badge">Station 4.4 • Sætningsdansen (inversion)</span>
            </div>

            <div class="ss-hero">
                <h1>Sætningsdansen (inversion)</h1>
                <p>Fjederen der skubber det bøjede verbum frem på <strong>Plads 2</strong>: så snart tid, sted, årsag eller ledsætning tager <strong>Plads 1</strong>, må subjektet danse bag om verbet ind på <strong>Plads 3</strong>.</p>
            </div>

            <div class="ss-tabs-nav">
                
                <button type="button" class="ss-tab-btn ${activeTab === 'dans' ? 'active' : ''}" data-tab="dans">2. V2-fjeder-dansegulv</button>
                <button type="button" class="ss-tab-btn ${activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">3. Inversions-træner</button>
            </div>

            ${mainPanelHtml}
        `;

        inner.querySelector('#btn-back-inversion').onclick = () => navigateFn(backTarget);

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

        inner.querySelectorAll('[data-front]').forEach((btn) => {
            btn.onclick = () => {
                activeFrontId = btn.dataset.front;
                render();
            };
        });

        const ttsDanceBtn = inner.querySelector('#btn-tts-dance');
        if (ttsDanceBtn) {
            ttsDanceBtn.onclick = () => speakDanish(ttsDanceBtn.dataset.say);
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
