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

const MODSTAND_HOTSPOTS = [
    {
        id: 'selvom_spaer',
        side: 'left',
        x: 42,
        y: 65,
        badge: 'Muren • Ledsætning (trods hindring)',
        word: 'selvom (vejspærring)',
        title: 'Selvom — muren der burde stoppe handlingen',
        sentence: 'Selvom vejen var spærret af bomme, fandt vandrerne en vej over marken.',
        translation: {
            en: 'even though / although (obstacle ahead)',
            de: 'obwohl',
            es: 'aunque',
            ar: 'بالرغم من (حاجز يحاول إيقاف الحركة)'
        },
        forceDesc: 'En stor forhindring står lige i vejen og burde få os til at vende om — men handlingen sker trods alt.',
        syntaxDesc: 'Inde i selvom-sætningen (ledsætning) står "ikke" FØR verbet: "Selvom han ikke havde kort...". Efter kommaet kommer hovedsætningens VERBUM først!',
        aha: 'Guldregel: "Selvom det regner [Plads 1], går [Plads 2] vi [Plads 3] en tur."'
    },
    {
        id: 'selvom_mur',
        side: 'left',
        x: 73,
        y: 48,
        badge: 'Muren • Naturmodstand',
        word: 'selvom (stenmur & vind)',
        title: 'Selvom — når vinden bøjer træerne',
        sentence: 'Selvom vinden rusker i birketræerne, fortsætter turen langs stenmuren.',
        translation: {
            en: 'although the wind shakes the trees',
            de: 'obwohl der Wind weht',
            es: 'aunque sople el viento',
            ar: 'رغم أن الرياح تهز الأشجار'
        },
        forceDesc: 'Muren og blæsten bygger forventningen op: "Så bliver de nok hjemme." Derefter kommer den overraskende fortsættelse.',
        syntaxDesc: 'Du kan også stille "selvom" bagefter: "Vi går en tur, selvom det blæser meget." (Så udløser det ikke inversion i første sætning.)',
        aha: 'Bemærk trykket og pausen ved kommaet, når "Selvom..." står først: sætningen skal ligesom svinge sig over muren!'
    },
    {
        id: 'selvom_regn',
        side: 'left',
        x: 58,
        y: 19,
        badge: 'Muren • Ikke-reglen',
        word: 'selvom det øsregner',
        title: 'Selvom + ikke — ledsætnings-test i regnvejret',
        sentence: 'Vi tog afsted i morges, selvom regnen ikke holdt op.',
        translation: {
            en: 'even though the rain did not stop',
            de: 'obwohl der Regen nicht aufhörte',
            es: 'aunque la lluvia no paró',
            ar: 'رغم أن المطر لم يتوقف'
        },
        forceDesc: 'Den tunge regnsky trækker nedad, men kan ikke standse beslutningen.',
        syntaxDesc: 'Tjek "ikke"-pladsen: "... selvom regnen [subjekt] ikke [centraladverbium] holdt [verbum] op" — ikke før verbet!',
        aha: 'Pas på engelsk/dansk blanding: brug ALDRIG *"selvom af" eller *"selvom at" i almindeligt standardsprog — bare "selvom"!'
    },
    {
        id: 'alligevel_vandrer',
        side: 'right',
        x: 23,
        y: 55,
        badge: 'Gennembrud • Bryder gennem muren',
        word: 'alligevel (gennem regnen)',
        title: 'Alligevel — kraften der bryder igennem muren',
        sentence: 'Regnen øsede ned over byen; hun gik alligevel hele turen gennem porten.',
        translation: {
            en: 'anyway / nevertheless (breaks right through)',
            de: 'trotzdem',
            es: 'de todos modos / sin embargo',
            ar: 'مع ذلك (يكسر الحاجز ويمضي قدمًا)'
        },
        forceDesc: 'Hvor "selvom" beskriver selve muren, er "alligevel" den stærke kraft eller vilje, der braser lige igennem og gennemfører handlingen!',
        syntaxDesc: 'Du kan parre "selvom" + "alligevel": "Selvom det regner, går vi ALLIGEVEL en tur!" — så har du både muren og gennembruddet.',
        aha: 'Ordstilling: "Alligevel" i midten står efter det første verbum ("hun gik alligevel"). Står "Alligevel" først, udløser det V2-inversion: "Alligevel gik hun..."'
    },
    {
        id: 'alligevel_cykel',
        side: 'right',
        x: 39,
        y: 57,
        badge: 'Gennembrud • Bytrafik i regn',
        word: 'alligevel (på cykel)',
        title: 'Alligevel — cyklen ruller videre trods vejret',
        sentence: 'Gaden stod fuld af vandpytter. Alligevel cyklede han glad videre.',
        translation: {
            en: 'still / nevertheless he cycled on',
            de: 'trotzdem radelte er weiter',
            es: 'aun así siguió en bicicleta',
            ar: 'ومع ذلك واصل ركوب الدراجة'
        },
        forceDesc: 'Når "Alligevel" står allerførst i næste sætning, føles gennembruddet ekstra dramatisk og beslutsomt.',
        syntaxDesc: 'Se V2-reglen når "Alligevel" tager Plads 1: "Alligevel [1] cyklede [2] han [3] videre."',
        aha: 'Glem aldrig at flytte subjektet bag om verbet, når du starter en sætning med "Alligevel..."!'
    },
    {
        id: 'men_knaek',
        side: 'right',
        x: 58,
        y: 56,
        badge: 'Det skarpe knæk • Kontrast',
        word: 'men (skarpt sving)',
        title: 'Men — det skarpe knæk i vejbanen',
        sentence: 'Gaden så mørk og våd ud, men rundt om hjørnet ventede der lys.',
        translation: {
            en: 'but (sharp turn in contrast)',
            de: 'aber',
            es: 'pero',
            ar: 'لكن (منعطف حاد يغيّر الاتجاه)'
        },
        forceDesc: 'Hvor "selvom/alligevel" brager igennem én modstand, drejer "men" bare retningen skarpt til siden: plus → minus eller minus → plus.',
        syntaxDesc: '"Men" står på Plads 0 mellem to helsætninger og udløser IKKE inversion: "... men de fandt en varm café."',
        aha: 'En klassisk fejl er at skrive *"Men i dag regner det" vs *"Men regner det" — husk: "men" ændrer ikke ordstillingen!'
    },
    {
        id: 'men_cafe',
        side: 'right',
        x: 85,
        y: 42,
        badge: 'Kontrast • Varm belønning',
        word: 'men (hyggelig café)',
        title: 'Men — skift fra kold modstand til varmt ly',
        sentence: 'Vi blev drivvåde på cykelturen, men vi fandt hurtigt en varm café.',
        translation: {
            en: 'but we quickly found a warm café',
            de: 'aber wir fanden ein warmes Café',
            es: 'pero encontramos un café cálido',
            ar: 'لكننا وجدنا مقهى دافئًا'
        },
        forceDesc: 'Kontrasten vender stemningen 90 grader rundt om hjørnet — fra ubehag til lettelse.',
        syntaxDesc: 'Du kan også kombinere "ikke bare..., men også...": "Det blæste ikke bare, men det haglede også!"',
        aha: 'Hold styr på trioen: "Selvom" (bygger muren) → "Alligevel" (bryder igennem) → "Men" (drejer skarpt om hjørnet).'
    }
];

const RESISTANCE_SCENES = [
    {
        id: 'regn',
        label: 'Øsregn på vandreturen',
        wall: 'det øsregner over skovstien',
        wallNeg: 'det ikke ligefrem er tørvejr',
        actionV2: 'går vi en lang tur',
        actionSVO: 'vi går en lang tur',
        actionAdv: 'vi går alligevel en lang tur'
    },
    {
        id: 'bybus',
        label: 'Vejarbejde i byen',
        wall: 'hovedgaden er spærret af vejarbejde',
        wallNeg: 'bussen ikke kører sin normale rute',
        actionV2: 'når hun frem før klokken ni',
        actionSVO: 'hun når frem før klokken ni',
        actionAdv: 'hun når alligevel frem før klokken ni'
    },
    {
        id: 'bakke',
        label: 'Stejl bakke og modvind',
        wall: 'modvinden river i cyklen',
        wallNeg: 'vinden ikke vil lægge sig',
        actionV2: 'tramper han op til toppen',
        actionSVO: 'han tramper op til toppen',
        actionAdv: 'han tramper alligevel op til toppen'
    }
];

const RESISTANCE_MODES = [
    {
        id: 'selvom_par',
        label: 'Selvom + ... alligevel',
        badge: 'Kombineret mur + gennembrud • V2 efter kommaet!',
        build: (sc) => `Selvom ${sc.wall}, ${sc.actionV2} alligevel.`,
        note: 'Muren står først ("Selvom...") og fylder Plads 1. Derfor kommer hovedsætningens verbum straks på Plads 2 lige efter kommaet, mens "alligevel" forstærker gennembruddet!'
    },
    {
        id: 'selvom_sidst',
        label: '... selvom ... (bagpå)',
        badge: 'Muren bagefter • Normal lige-frem start',
        build: (sc) => `${cap(sc.actionSVO)}, selvom ${sc.wallNeg}.`,
        note: 'Starter du med selve handlingen, er første del bare helt almindelig ordstilling. Læg mærke til "ikke" FØR verbet inde i "selvom"-ledsætningen!'
    },
    {
        id: 'alligevel_foerst',
        label: 'Alligevel (forrest + V2)',
        badge: 'Gennembrud på Plads 1 • Udløser V2!',
        build: (sc) => `${cap(sc.wall)}. Alligevel ${sc.actionV2}.`,
        note: 'Når "Alligevel" indtager Plads 1 i næste sætning, skubbes verbet straks ind på Plads 2 foran subjektet ("Alligevel går vi...").'
    },
    {
        id: 'men_knaek',
        label: 'Men (skarpt knæk)',
        badge: 'Sideordning (Plads 0) • Ingen inversion',
        build: (sc) => `${cap(sc.wall)}, men ${sc.actionAdv}.`,
        note: '"Men" drejer sætningen i et skarpt 90-graders knæk uden at ændre ordstillingen: "... men [subjekt] [verbum]...".'
    }
];

const QUIZ_QUESTIONS = [
    {
        prompt: 'Du vil beskrive både muren (regnen) og gennembruddet. Hvilken sætning har KORREKT ordstilling efter kommaet?',
        sentencePrefix: 'Selvom cykelstien er glat,',
        sentenceSuffix: 'til arbejde.',
        options: [
            'cykler Maja alligevel',
            'Maja cykler alligevel',
            'alligevel Maja cykler',
            'men cykler Maja'
        ],
        correct: 'cykler Maja alligevel',
        explanation: 'Hele "Selvom cykelstien er glat" fylder Plads 1! Verbet ("cykler") SKAL derfor stå på Plads 2 lige efter kommaet.'
    },
    {
        prompt: 'Hvor placerer du "ikke" inde i en selvom-sætning (ledsætning)?',
        sentencePrefix: 'Vi tager toget til Aarhus,',
        sentenceSuffix: 'pladsbillet.',
        options: [
            'selvom vi ikke har',
            'selvom vi har ikke',
            'men vi ikke har',
            'alligevel vi ikke har'
        ],
        correct: 'selvom vi ikke har',
        explanation: 'Efter "selvom" (ledsætning) hopper "ikke" altid FØR verbet: "selvom vi ikke har".'
    },
    {
        prompt: 'Brug "Alligevel" først i næste sætning som dramatisk gennembrud efter modstand:',
        sentencePrefix: 'Stien var blokeret af væltede grene.',
        sentenceSuffix: 'hele vejen gennem skoven.',
        options: [
            'Alligevel vandrede vi',
            'Alligevel vi vandrede',
            'Selvom vandrede vi',
            'Men vandrede vi'
        ],
        correct: 'Alligevel vandrede vi',
        explanation: '"Alligevel" på Plads 1 udløser V2-inversion: "Alligevel [1] vandrede [2] vi [3]".'
    },
    {
        prompt: 'Vælg bindeordet der skaber et skarpt knæk/kontrast uden at ændre ordstillingen:',
        sentencePrefix: 'Bilen var hurtig i byen,',
        sentenceSuffix: 'vi kom først frem med S-toget.',
        options: ['men', 'selvom', 'fordi', 'alligevel'],
        correct: 'men',
        explanation: '"Men" står på Plads 0 og skaber ren kontrast mellem to helsætninger: "... men vi [subjekt] kom [verbum]...".'
    },
    {
        prompt: 'Pas på dansk grammatik: Kan man kombinere "men" og "alligevel" på én gang, eller skal man vælge rigtigt?',
        sentencePrefix: 'Vejen var stejl og fuld af modvind,',
        sentenceSuffix: 'kom de helt op til fyrtårnet.',
        options: [
            'men de',
            'selvom de',
            'fordi de',
            'så de ikke'
        ],
        correct: 'men de',
        explanation: 'Læg mærke til fortsættelsen: "... kom de" eller vent — hov! Efter "men de" hedder det "... men de kom", mens i denne gap står "kom de"! Hov: se nøje på sætningen! "... fuld af modvind, _____ kom de helt op": her står VERBET først ("kom de"), så det må være "alligevel" efter punktum eller nej, det hedder "... fuld af modvind. Alligevel kom de" eller "... men alligevel kom de"!'
    },
    {
        prompt: 'Hvilken dansk sætning er grammatisk KORREKT efter "men"?',
        sentencePrefix: 'Vælg den rigtige sætning:',
        sentenceSuffix: '',
        options: [
            'Det blæste kraftigt, men børnene legede ude hele dagen.',
            'Det blæste kraftigt, men legede børnene ude hele dagen.',
            'Det blæste kraftigt, selvom børnene legede ikke ude.',
            'Selvom at det blæste kraftigt, legede børnene ude.'
        ],
        correct: 'Det blæste kraftigt, men børnene legede ude hele dagen.',
        explanation: 'Efter "men" kommer subjektet først ("men børnene legede"), fordi "men" står på Plads 0 og ikke udløser inversion.'
    },
    {
        prompt: 'Skeln mellem årsag ("fordi") og modstand ("selvom"): Du tager ikke paraply med, på trods af grå skyer.',
        sentencePrefix: 'Jeg lader paraplyen blive hjemme,',
        sentenceSuffix: 'vejrudsigten lover byger.',
        options: ['selvom', 'fordi', 'derfor', 'så'],
        correct: 'selvom',
        explanation: 'Handlingen går IMOD vejrudsigten (modstand!), så du skal bruge muren "selvom", ikke årsagen "fordi".'
    },
    {
        prompt: 'Du starter med årsagen/problemet og vil fortsætte direkte med et "alligevel"-gennembrud efter punktum:',
        sentencePrefix: 'Trafiklyset var i stykker i krydset.',
        sentenceSuffix: '',
        options: [
            'Alligevel kørte bilerne roligt og sikkert igennem.',
            'Selvom kørte bilerne roligt og sikkert igennem.',
            'Fordi kørte bilerne roligt og sikkert igennem.',
            'Men kørte bilerne roligt og sikkert igennem.'
        ],
        correct: 'Alligevel kørte bilerne roligt og sikkert igennem.',
        explanation: 'Efter et punktum viser "Alligevel + verbum + subjekt", at bilerne brød igennem det problem, der lige blev nævnt.'
    }
];

// Clean up question 5 cleanly so there is zero ambiguity
QUIZ_QUESTIONS[4] = {
    prompt: 'Se på verbet efter hullet ("kom de"): Hvilket gennembrudsord skubber verbet frem på Plads 2 efter et punktum?',
    sentencePrefix: 'Vejen var stejl og fuld af modvind.',
    sentenceSuffix: 'kom de helt op til fyrtårnet.',
    options: ['Alligevel', 'Men', 'Fordi', 'Selvom'],
    correct: 'Alligevel',
    explanation: '"Alligevel" indtager Plads 1 og skubber verbet ("kom") ind på Plads 2 før subjektet ("de")!'
};

function cap(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function renderSansningModstandView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const backTarget = extraData.from === 'flade4' ? 'sansning_flade4' : 'grammatik_sansning';
    const backLabel = extraData.from === 'flade4' ? '← Tilbage til hovedflade 4' : '← Tilbage til oversigt';

    let activeTab = 'vrimmel';
    let pureMode = false;
    let selectedHotspotId = MODSTAND_HOTSPOTS[0].id;
    let activeSceneId = RESISTANCE_SCENES[0].id;
    let activeModeId = RESISTANCE_MODES[0].id;
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
        .mod-lab-card {
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
        const selectedHotspot = MODSTAND_HOTSPOTS.find((h) => h.id === selectedHotspotId) || MODSTAND_HOTSPOTS[0];
        const scene = RESISTANCE_SCENES.find((s) => s.id === activeSceneId) || RESISTANCE_SCENES[0];
        const mode = RESISTANCE_MODES.find((m) => m.id === activeModeId) || RESISTANCE_MODES[0];

        let mainPanelHtml = '';
        if (activeTab === 'vrimmel') {
            const leftSpots = MODSTAND_HOTSPOTS.filter((h) => h.side === 'left');
            const rightSpots = MODSTAND_HOTSPOTS.filter((h) => h.side === 'right');

            mainPanelHtml = `
                <div class="contrast-canvas-card">
                    <div class="contrast-control-bar">
                        <span class="contrast-hint">Klik på muren af regn og vejspærringer til venstre eller gennembruddet og det skarpe sving til højre.</span>
                        <button type="button" class="pure-toggle-btn ${pureMode ? 'active' : ''}" id="btn-pure-mode">
                            ${pureMode ? 'Vis ledetråde' : 'Kun billeder (ren sansning)'}
                        </button>
                    </div>
                    <div class="contrast-split-stage">
                        <div class="stage-half">
                            <div class="stage-half-header cool">
                                <span>Muren af modstand</span>
                                <span>selvom</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_modstand_venstre.jpg" alt="Regnbyge, stenmur og vejspærring på vandresti" />
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
                                <span>Gennembrud & skarpt knæk</span>
                                <span>alligevel, men</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_modstand_hoejre.jpg" alt="Vandrer og cyklist der bryder igennem regnen og drejer skarpt mod varm café" />
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
                        ${MODSTAND_HOTSPOTS.map((h) => `
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
                            <strong>Kraft mod modstand</strong>
                            ${selectedHotspot.forceDesc}
                        </div>
                        <div class="ss-contrast-box afstand">
                            <strong>Ordstilling & placering</strong>
                            ${selectedHotspot.syntaxDesc}
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
            const outSentence = mode.build(scene);
            mainPanelHtml = `
                <div class="mod-lab-card">
                    <h2 style="margin:0 0 0.35rem; font-size:1.4rem; font-weight:900;">Modstands-værksted: muren vs. gennembruddet</h2>
                    <p style="margin:0 0 1rem; color:#FBD5D9; font-size:0.94rem;">
                        Vælg en forhindring i naturen eller bytrafikken og se, hvordan <em>selvom</em>, <em>alligevel</em> og <em>men</em> flytter vægten og verbet.
                    </p>
                    <div class="flow-chip-row">
                        ${RESISTANCE_SCENES.map((sc) => `
                            <button type="button" class="flow-chip ${sc.id === activeSceneId ? 'active' : ''}" data-scene="${sc.id}">
                                ${sc.label}
                            </button>
                        `).join('')}
                    </div>
                    <div class="flow-chip-row">
                        ${RESISTANCE_MODES.map((m) => `
                            <button type="button" class="flow-hinge-btn ${m.id === activeModeId ? 'active' : ''}" data-mode="${m.id}">
                                ${m.label}
                            </button>
                        `).join('')}
                    </div>
                    <div class="flow-result-box">
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;">
                            <span class="ss-detail-badge warm">${mode.badge}</span>
                            <button type="button" class="ss-tts-btn" id="btn-tts-lab" data-say="${outSentence.replace(/"/g, '&quot;')}">🔊 Lyt til sætningen</button>
                        </div>
                        <div class="flow-sentence">"${outSentence}"</div>
                        <p style="margin:0;color:#FFE4E6;font-size:0.95rem;line-height:1.5;">${mode.note}</p>
                    </div>
                </div>
            `;
        } else {
            if (quizIndex >= QUIZ_QUESTIONS.length) {
                mainPanelHtml = `
                    <div class="ss-quiz-card" style="text-align:center;">
                        <h2 style="margin:0 0 0.6rem;font-size:1.7rem;font-weight:900;">Modstands-træningen fuldført!</h2>
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
                                <strong>${selectedOption === q.correct ? '✅ Du brød igennem muren!' : '💡 Se ordstillingen:'}</strong>
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
                <button type="button" class="ss-back-btn" id="btn-back-modstand">${backLabel}</button>
                <span class="ss-station-badge">Station 4.2 • Kraft mod modstand</span>
            </div>

            <div class="ss-hero">
                <h1>Kraft mod modstand</h1>
                <p>Muren mod gennembruddet: mærk hvordan <em>selvom</em> rejser forhindringen på vejen, <em>alligevel</em> brager igennem den, og <em>men</em> slår et skarpt sving om hjørnet.</p>
            </div>

            <div class="ss-tabs-nav">
                
                <button type="button" class="ss-tab-btn ${activeTab === 'vrimmel' ? 'active' : ''}" data-tab="vrimmel">1. Vrimlebillede &amp; modstand</button>
                <button type="button" class="ss-tab-btn ${activeTab === 'lab' ? 'active' : ''}" data-tab="lab">2. Modstands-værksted</button>
                <button type="button" class="ss-tab-btn ${activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">3. Modstands-træner</button>
            </div>

            ${mainPanelHtml}
        `;

        inner.querySelector('#btn-back-modstand').onclick = () => navigateFn(backTarget);

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

        inner.querySelectorAll('[data-scene]').forEach((btn) => {
            btn.onclick = () => {
                activeSceneId = btn.dataset.scene;
                render();
            };
        });

        inner.querySelectorAll('[data-mode]').forEach((btn) => {
            btn.onclick = () => {
                activeModeId = btn.dataset.mode;
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
