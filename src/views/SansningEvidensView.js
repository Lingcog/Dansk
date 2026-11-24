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

const EVIDENS_HOTSPOTS = [
    {
        id: 'nok',
        side: 'left',
        x: 24,
        y: 53,
        badge: 'Indre mave • Beroligende tillid',
        word: 'nok',
        title: 'Nok — min egen mave siger, det skal gå',
        sentence: 'Bare rolig, det klarer han nok!',
        translation: {
            en: 'I expect / don’t worry, it’ll work out (subjective reassurance)',
            de: 'schon / wohl (beruhigend: Das schafft er schon)',
            es: 'seguro que sí / ya verás que sí',
            ar: 'أعتقد أنه سينجح (تطمين نابع من الحدس)'
        },
        sourceDesc: 'Kilden er din egen indre mavefornemmelse og tillid. Du lover intet bevis, men beroliger den anden.',
        contrastDesc: 'Modsat "jo" (som begge allerede ved) kommer "nok" indefra taleren selv ("stoler på mig? Det skal nok gå").',
        aha: 'Utrykstærkt "nok" i midten = varm beroligelse ("Han kommer nok snart"). Trykstærkt "NOK" betyder mængde ("Jeg har kaffe nok!").'
    },
    {
        id: 'sgu',
        side: 'left',
        x: 22,
        y: 82,
        badge: 'Indre mave • Rå overbevisning (uformelt)',
        word: 'sgu',
        title: 'Sgu — rå kraft fra maven',
        sentence: 'Det var sgu koldt udenfor, men det gik da fint!',
        translation: {
            en: 'honestly / really / bloody (emphatic, informal)',
            de: 'echt / verdammt (umgangssprachlich)',
            es: 'de verdad / la verdad es que (coloquial)',
            ar: 'بصراحة تامة / حقًا (تعبير عامي قوي)'
        },
        sourceDesc: 'Du slår næsten hånden i bordet med ærlig, umiddelbar følelse. Kommer direkte fra maven uden filter.',
        contrastDesc: 'Bruges mellem venner, kolleger og i hverdagstale — aldrig i officielle ansøgninger, eksamensstile eller formelle mails.',
        aha: 'Tone-advarsel (DU2/DU3): "Sgu" er et mildt, hverdagsagtigt kraftudtryk, som danskere ofte bruger varmt eller selvironisk, fx "Det smager sgu godt!" eller "Jeg har sgu glemt mine nøgler!"'
    },
    {
        id: 'jo',
        side: 'left',
        x: 54,
        y: 41,
        badge: 'Fælles grund • Delt viden',
        word: 'jo',
        title: 'Jo — vi ved det begge to allerede!',
        sentence: 'Kom med på café, det er jo fredag!',
        translation: {
            en: 'as we both know / after all (shared knowledge)',
            de: 'ja / doch (bekanntes Wissen)',
            es: 'como sabes / al fin y al cabo',
            ar: 'كما تعلم / ففي النهاية (معلومة مشتركة)'
        },
        sourceDesc: 'Kilden ligger imellem os to. Jeg minder dig blidt om noget, du allerede ved eller kan se lige nu.',
        contrastDesc: 'Hvis du brugte "vist" i stedet ("Det er vist fredag"), ville du lyde forvirret og usikker på ugedagen!',
        aha: '"Jo" fungerer som social lim på dansk: det signalerer "vi står på den samme fælles grund". Brug det IKKE om helt nye nyheder, som modtageren aldrig har hørt før.'
    },
    {
        id: 'vel',
        side: 'left',
        x: 68,
        y: 55,
        badge: 'Fælles grund • Forsigtig appel',
        word: 'vel',
        title: 'Vel — vi er vel enige, ikke?',
        sentence: 'Du kommer vel også til festen i aften?',
        translation: {
            en: 'I suppose / you are coming, aren’t you?',
            de: 'wohl / doch sicher, oder?',
            es: 'supongo que / ¿verdad que...?',
            ar: 'أليس كذلك؟ / على ما أظن (بحث عن تأكيد مشترك)'
        },
        sourceDesc: 'Du rækker hånden frem mod den anden og beder om et blidt "ja" eller en bekræftelse på jeres fælles forventning.',
        contrastDesc: 'Modsat "jo" (som slår fakta fast) lader "vel" en lille sprække åben: "Du har vel ikke glemt det?"',
        aha: 'I spørgsmål uden spørgeord gør "vel" sætningen blød og søgende ("Du fryser vel ikke?"). Ved ja/nej-forhandling: "Tja, det er vel okay."'
    },
    {
        id: 'vist',
        side: 'right',
        x: 62,
        y: 56,
        badge: 'Ydre kilde • Uvis rygte/hukommelse',
        word: 'vist',
        title: 'Vist — jeg mener at have hørt det, men er ikke sikker',
        sentence: 'Bageren lukker vist tidligt i dag, sagde min nabo.',
        translation: {
            en: 'apparently / I think so (hearsay / fuzzy memory)',
            de: 'anscheinend / glaube ich',
            es: 'por lo visto / creo que',
            ar: 'على ما يبدو / سمعت أن (غير متأكد)'
        },
        sourceDesc: 'Informationen kommer udefra — fra et rygte, en halvglemt besked eller et løst indtryk. Du garanterer ikke selv.',
        contrastDesc: 'Hvis det var din indre mavefornemmelse af fremtiden, brugte du "nok". Hvis det var noget I begge vidste, brugte du "jo".',
        aha: 'DU2/DU3-guld: Utrykstærkt "vist" = "jeg tror / har hørt" ("Han er vist syg"). Stærkt tryk på "VIST" betyder noget helt andet: "Jo VIST kan vi det!" (= selvfølgelig!).'
    },
    {
        id: 'efter_sigende',
        side: 'right',
        x: 17,
        y: 63,
        badge: 'Ydre rygte • Fra mund til mund',
        word: 'efter sigende',
        title: 'Efter sigende — folk siger det i gaden',
        sentence: 'Efter sigende åbner der en ny boghandel på hjørnet til maj.',
        translation: {
            en: 'reportedly / rumor has it',
            de: 'angeblich / dem Vernehmen nach',
            es: 'según se dice / al parecer',
            ar: 'بحسب ما يُقال / يُشاع أن'
        },
        sourceDesc: 'Viden strømmer rent udefra via andre menneskers ord eller medier ("man siger det"). Du lægger tydelig distance til påstanden.',
        contrastDesc: '"Efter sigende" lyder lidt mere journalistisk og eksplicit end "vist", som er kortere og mere hverdagsmundtligt.',
        aha: 'Ordstilling: Når du starter sætningen med "Efter sigende", kommer verbet som nummer to (V2): "Efter sigende bor han i Aarhus nu."'
    },
    {
        id: 'vist_post',
        side: 'right',
        x: 87,
        y: 64,
        badge: 'Ydre kilde • Observation udefra',
        word: 'vist (et tegn udefra)',
        title: 'Vist — når nogen har sagt eller antydet noget',
        sentence: 'Kontoret er tomt, så Maja er vist gået hjem for i dag.',
        translation: {
            en: 'seems to have / I gather',
            de: 'offenbar / wie es scheint',
            es: 'parece que / por lo visto',
            ar: 'يبدو أنها / حسب الظاهر'
        },
        sourceDesc: 'Du står udenfor og gætter ud fra et løst ydre indtryk uden at have talt direkte med hende.',
        contrastDesc: 'Sammenlign med "tydeligvis" (station 3.1): ved "vist" er du meget mere usikker og trækker let på skuldrene.',
        aha: 'Brug "vist" i daglig tale, når du vil undgå at lyde påståelig — det beskytter dig mod at love for meget!'
    }
];

const SOURCE_ZONES = [
    {
        id: 'indre',
        label: '1. Indre mave',
        particles: ['nok', 'sgu'],
        color: '#38bdf8',
        tagline: 'Viden og tryghed strømmer indefra mig selv.',
        desc: 'Her bruger du din egen mavefornemmelse. Med "nok" beroliger og trøster du ("Det går nok"); med "sgu" giver du rå, uformel kraft fra maven.'
    },
    {
        id: 'faelles',
        label: '2. Fælles grund',
        particles: ['jo', 'vel'],
        color: '#a78bfa',
        tagline: 'Viden ligger som en bro imellem os begge.',
        desc: 'Med "jo" minder du om noget, I begge allerede ved ("Du bor jo her i byen"). Med "vel" søger du venlig enighed ("Du har vel fået min besked?").'
    },
    {
        id: 'ydre',
        label: '3. Ydre rygte & kilde',
        particles: ['vist', 'efter sigende'],
        color: '#fb923c',
        tagline: 'Viden kommer udefra — jeg står ikke selv inde for den.',
        desc: 'Med "vist" refererer du løst til noget, du har hørt eller husker svagt. Med "efter sigende" peger du direkte på, at "folk siger det".'
    }
];

const LAB_SCENARIOS = [
    {
        id: 'hjemme',
        label: 'Jonas hjemme',
        variants: {
            nok: {
                sentence: 'Jonas er nok hjemme om ti minutter.',
                zone: 'indre',
                meaning: 'Beroligelse fra din mave: "Bare rolig, jeg tror og stoler på, at han snart dukker op."'
            },
            sgu: {
                sentence: 'Jonas er sgu hjemme allerede!',
                zone: 'indre',
                meaning: 'Overrasket eller eftertrykkelig tale mellem venner: rå, direkte mave-reaktion (uformelt).'
            },
            jo: {
                sentence: 'Jonas er jo hjemme hele torsdagen.',
                zone: 'faelles',
                meaning: 'Fælles grund: "Husk nu, vi ved jo begge to, at han har hjemmearbejdsdag om torsdagen."'
            },
            vel: {
                sentence: 'Jonas er vel hjemme nu?',
                zone: 'faelles',
                meaning: 'Forsigtig søgen efter fælles svar: "Jeg regner med, at han er hjemme — er du ikke enig?"'
            },
            vist: {
                sentence: 'Jonas er vist hjemme, sagde hans bror.',
                zone: 'ydre',
                meaning: 'Ydre/usikker kilde: "Jeg har hørt det eller mener at huske det, men tør ikke love det."'
            },
            efter_sigende: {
                sentence: 'Efter sigende er Jonas hjemme fra ferien nu.',
                zone: 'ydre',
                meaning: 'Ydre rygte: "Folk fortæller, at han er kommet hjem — jeg har det kun på anden hånd."'
            }
        }
    },
    {
        id: 'opgave',
        label: 'Danskprøven',
        variants: {
            nok: {
                sentence: 'Du består nok prøven uden problemer!',
                zone: 'indre',
                meaning: 'Støttende og varm forventning: "Min mave siger mig, at du sagtens klarer det."'
            },
            sgu: {
                sentence: 'Du består sgu den prøve med glans!',
                zone: 'indre',
                meaning: 'Stærk, kammeratlig opbakning fra hjertet/maven (kun til venner i uformel tale!).'
            },
            jo: {
                sentence: 'Du har jo øvet dig hele vinteren.',
                zone: 'faelles',
                meaning: 'Fælles kendsgerning: "Det ved du og jeg begge to — derfor har du et godt fundament."'
            },
            vel: {
                sentence: 'Du har vel læst op på modalverberne?',
                zone: 'faelles',
                meaning: 'Spørgende appel: "Jeg håber og forventer et ja — har du ikke gjort det?"'
            },
            vist: {
                sentence: 'Den nye prøve varer vist to timer.',
                zone: 'ydre',
                meaning: 'Løst ydre indtryk: "Sådan hørte jeg det i pausen, men tjek lige skemaet."'
            },
            efter_sigende: {
                sentence: 'Efter sigende bliver prøven lidt lettere i år.',
                zone: 'ydre',
                meaning: 'Rygte udefra: "De andre kursister siger det, men intet er bekræftet officielt."'
            }
        }
    }
];

const QUIZ_QUESTIONS = [
    {
        prompt: 'Din ven glemte nøglen og går lidt i panik. Du vil berolige ham ud fra din egen tillid.',
        sentencePrefix: 'Slap helt af — din kone kommer',
        sentenceSuffix: 'hjem lige om lidt!',
        options: ['nok', 'vist', 'jo', 'efter sigende'],
        correct: 'nok',
        explanation: 'Utrykstærkt "nok" kommer fra din egen mave og beroliger den anden: "Det skal nok gå."'
    },
    {
        prompt: 'Din ven glemte halstørklædet i december og undrer sig over, at hun fryser. I kan begge se sneen udenfor.',
        sentencePrefix: 'Det er',
        sentenceSuffix: 'minus fem grader i dag!',
        options: ['jo', 'nok', 'vist', 'efter sigende'],
        correct: 'jo',
        explanation: '"Jo" peger på fælles grund — noget både du og hun allerede ved eller kan se lige nu.'
    },
    {
        prompt: 'Du møder en kollega på gangen og vil lige bekræfte en aftale, du regner med står fast.',
        sentencePrefix: 'Vi har',
        sentenceSuffix: 'møde klokken ti, ikke?',
        options: ['vel', 'nok', 'sgu', 'efter sigende'],
        correct: 'vel',
        explanation: '"Vel" rækker ud mod den anden for at få en fælles bekræftelse på det, man forventer.'
    },
    {
        prompt: 'En kollega spørger, hvorfor Peter ikke er her. Du hørte én sige i morges, at han havde feber, men du ved det ikke selv.',
        sentencePrefix: 'Han er',
        sentenceSuffix: 'syg i dag.',
        options: ['vist', 'jo', 'nok', 'vel'],
        correct: 'vist',
        explanation: '"Vist" markerer en usikker, ydre kilde eller svag hukommelse ("jeg mener at have hørt...").'
    },
    {
        prompt: 'Du starter en sætning om et rygte i kvarteret om en ny svømmehal.',
        sentencePrefix: '',
        sentenceSuffix: 'begynder de at bygge til foråret.',
        options: ['Efter sigende', 'Jo', 'Vel', 'Sgu'],
        correct: 'Efter sigende',
        explanation: '"Efter sigende" står ofte først (med V2-inversion: begynder de) og viser tydeligt, at det er et rygte fra andre.'
    },
    {
        prompt: 'Du sidder med din gode ven over en varm suppe efter en hård dag i regnen. Helt uformelt fra hjertet:',
        sentencePrefix: 'Den her suppe smager',
        sentenceSuffix: 'godt!',
        options: ['sgu', 'efter sigende', 'vist', 'vel'],
        correct: 'sgu',
        explanation: '"Sgu" kommer direkte fra maven med rå, hjertelig kraft i uformel hverdagstale mellem venner.'
    },
    {
        prompt: 'Hvor bør du IKKE skrive ordet "sgu"?',
        sentencePrefix: 'Vælg den situation, hvor "sgu" er upassende:',
        sentenceSuffix: '',
        options: [
            'I en formel jobansøgning til en kommune.',
            'Til en god ven, når du har tabt din is.',
            'I en munter besked til din søster.',
            'Når du griner af regnvejret på cykelturen.'
        ],
        correct: 'I en formel jobansøgning til en kommune.',
        explanation: '"Sgu" er et mildt hverdagsbandeord. Det hører hjemme i uformel tale, ikke i officielle tekster eller eksamensopgaver.'
    },
    {
        prompt: 'Du gætter forsigtigt på, at den lukkede café måske skyldes ferie, fordi du syntes du så et skilt i går.',
        sentencePrefix: 'De holder',
        sentenceSuffix: 'vinterferie i denne uge.',
        options: ['vist', 'jo', 'vel', 'sgu'],
        correct: 'vist',
        explanation: '"Vist" er perfekt, når din viden bygger på et usikkert ydre indtryk, som du ikke vil garantere 100%.'
    },
    {
        prompt: 'Din lillebror er bange for, at ingen kan lide hans tegning. Du smiler varmt til ham.',
        sentencePrefix: 'De bliver',
        sentenceSuffix: 'super glade for den!',
        options: ['nok', 'efter sigende', 'vist', 'vel'],
        correct: 'nok',
        explanation: 'Når man trøster og giver en varm, personlig forventning fra maven, er "nok" den klassiske danske partikel.'
    },
    {
        prompt: 'Hvad er forskellen på "Hun kommer jo" og "Hun kommer vist"?',
        sentencePrefix: 'Vælg den rigtige forklaring:',
        sentenceSuffix: '',
        options: [
            '"Jo" = det ved vi begge to; "vist" = jeg har hørt det / er ikke helt sikker.',
            '"Jo" = et ydre rygte; "vist" = 100% sikkert bevis.',
            '"Jo" bruges kun i spørgsmål; "vist" bruges kun om fremtiden.',
            'De betyder præcis det samme på dansk.'
        ],
        correct: '"Jo" = det ved vi begge to; "vist" = jeg har hørt det / er ikke helt sikker.',
        explanation: 'Forskellen ligger i kilden: "jo" bygger på fælles grund mellem jer, mens "vist" bygger på en usikker, ydre kilde.'
    }
];

export function renderSansningEvidensView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const backTarget = extraData.from === 'flade3' ? 'sansning_flade3' : 'grammatik_sansning';
    const backLabel = extraData.from === 'flade3' ? '← Tilbage til hovedflade 3' : '← Tilbage til oversigt';

    let activeTab = 'kompas';
    let pureMode = false;
    let selectedHotspotId = EVIDENS_HOTSPOTS[0].id;
    let activeLabScenario = LAB_SCENARIOS[0].id;
    let activeParticle = 'nok';
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
        /* Compass & particle lab */
        .compass-card {
            background: rgba(34, 4, 8, 0.76); border: 1px solid rgba(255,190,198,0.24);
            border-radius: 22px; padding: 1.6rem;
        }
        .compass-zones { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; margin-bottom: 1.35rem; }
        @media (max-width: 760px) { .compass-zones { grid-template-columns: 1fr; } }
        .compass-zone-box {
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.14);
            border-radius: 16px; padding: 1rem;
        }
        .compass-zone-box.active { border-color: #FF8A95; background: rgba(255,77,94,0.14); }
        .compass-p-row { display:flex; flex-wrap:wrap; gap:0.45rem; margin-top:0.75rem; }
        .compass-p-btn {
            background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.22);
            color: #FFF; padding: 0.42rem 0.85rem; border-radius: 999px; font-weight: 800; font-size: 0.88rem; cursor: pointer;
        }
        .compass-p-btn.active { background: #38bdf8; border-color: #7dd3fc; color: #082f49; }
        .lab-result-box {
            background: rgba(0,0,0,0.34); border: 1px solid rgba(255,255,255,0.16);
            border-radius: 16px; padding: 1.25rem;
        }
        .lab-sentence { font-size: 1.3rem; font-weight: 800; color: #FFF; margin: 0.5rem 0; }
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
        const selectedHotspot = EVIDENS_HOTSPOTS.find((h) => h.id === selectedHotspotId) || EVIDENS_HOTSPOTS[0];
        const scenario = LAB_SCENARIOS.find((s) => s.id === activeLabScenario) || LAB_SCENARIOS[0];
        const activeVariant = scenario.variants[activeParticle];
        const activeZoneObj = SOURCE_ZONES.find((z) => z.id === activeVariant.zone) || SOURCE_ZONES[0];

        let mainPanelHtml = '';
        if (activeTab === 'vrimmel') {
            const leftSpots = EVIDENS_HOTSPOTS.filter((h) => h.side === 'left');
            const rightSpots = EVIDENS_HOTSPOTS.filter((h) => h.side === 'right');

            mainPanelHtml = `
                <div class="contrast-canvas-card">
                    <div class="contrast-control-bar">
                        <span class="contrast-hint">De små danske tryksvage ord fortæller, hvorfra din viden strømmer: maven, os begge eller et rygte.</span>
                        <button type="button" class="pure-toggle-btn ${pureMode ? 'active' : ''}" id="btn-pure-mode">
                            ${pureMode ? 'Vis ledetråde' : 'Kun billeder (ren sansning)'}
                        </button>
                    </div>
                    <div class="contrast-split-stage">
                        <div class="stage-half">
                            <div class="stage-half-header cool">
                                <span>Indre mave & fælles grund</span>
                                <span>nok, sgu, jo, vel</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_evidens_venstre.jpg" alt="Venner ved kaffebord, indre tryghed og fælles grund" />
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
                                <span>Ydre kilde & rygte</span>
                                <span>vist, efter sigende</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_evidens_hoejre.jpg" alt="Naboer over hækken og usikre meldinger ved bageriet" />
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
                        ${EVIDENS_HOTSPOTS.map((h) => `
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
                            <strong>Hvorfra strømmer viden?</strong>
                            ${selectedHotspot.sourceDesc}
                        </div>
                        <div class="ss-contrast-box afstand">
                            <strong>Kontrast & stil</strong>
                            ${selectedHotspot.contrastDesc}
                        </div>
                    </div>
                    <div class="ss-insp-aha">
                        <strong>DU2/DU3 aha-regel:</strong> ${selectedHotspot.aha}
                    </div>
                    <div class="ss-insp-languages">
                        <span class="ss-lang-pill">🇬🇧 ${selectedHotspot.translation.en}</span>
                        <span class="ss-lang-pill">🇩🇪 ${selectedHotspot.translation.de}</span>
                        <span class="ss-lang-pill">🇪🇸 ${selectedHotspot.translation.es}</span>
                        <span class="ss-lang-pill">🇸🇦 ${selectedHotspot.translation.ar}</span>
                    </div>
                </div>
            `;
        } else if (activeTab === 'kompas') {
            mainPanelHtml = `
                <div class="compass-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1.1rem;">
                        <div>
                            <h2 style="margin:0 0 0.25rem;font-size:1.4rem;font-weight:900;">Kilde-kompasset & partikel-omformer</h2>
                            <p style="margin:0;color:#FBD5D9;font-size:0.93rem;">Skift mellem de seks partikler og hør, hvordan kilden skifter mellem indre mave, fælles grund og ydre rygte.</p>
                        </div>
                        <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
                            ${LAB_SCENARIOS.map((sc) => `
                                <button type="button" class="compass-p-btn ${sc.id === activeLabScenario ? 'active' : ''}" data-lab-sc="${sc.id}">
                                    ${sc.label}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="compass-zones">
                        ${SOURCE_ZONES.map((z) => {
                            const isZoneActive = activeZoneObj.id === z.id;
                            return `
                                <div class="compass-zone-box ${isZoneActive ? 'active' : ''}">
                                    <div style="font-weight:900;font-size:1.02rem;color:#FFF;margin-bottom:0.25rem;">${z.label}</div>
                                    <div style="font-size:0.84rem;color:#FBD5D9;line-height:1.4;">${z.tagline}</div>
                                    <div class="compass-p-row">
                                        ${z.particles.map((p) => {
                                            const key = p === 'efter sigende' ? 'efter_sigende' : p;
                                            return `<button type="button" class="compass-p-btn ${activeParticle === key ? 'active' : ''}" data-lab-p="${key}">${p}</button>`;
                                        }).join('')}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <div class="lab-result-box">
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;">
                            <span class="ss-detail-badge ${activeZoneObj.id === 'ydre' ? 'warm' : ''}">${activeZoneObj.label}</span>
                            <button type="button" class="ss-tts-btn" id="btn-tts-lab" data-say="${activeVariant.sentence.replace(/"/g, '&quot;')}">🔊 Lyt til udtale & tryk</button>
                        </div>
                        <div class="lab-sentence">"${activeVariant.sentence}"</div>
                        <p style="margin:0 0 0.65rem;color:#FFE4E6;font-size:0.96rem;line-height:1.5;">${activeVariant.meaning}</p>
                        <p style="margin:0;color:#FBD5D9;font-size:0.87rem;"><strong>Kilde-logik:</strong> ${activeZoneObj.desc}</p>
                    </div>
                </div>
            `;
        } else {
            if (quizIndex >= QUIZ_QUESTIONS.length) {
                mainPanelHtml = `
                    <div class="ss-quiz-card" style="text-align:center;">
                        <h2 style="margin:0 0 0.6rem;font-size:1.7rem;font-weight:900;">Partikel-træningen fuldført!</h2>
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
                                <strong>${selectedOption === q.correct ? '✅ Præcis kilde!' : '💡 Kig på kilden:'}</strong>
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
                <button type="button" class="ss-back-btn" id="btn-back-evidens">${backLabel}</button>
                <span class="ss-station-badge">Station 3.2 • Evidensens kilde</span>
            </div>

            <div class="ss-hero">
                <h1>Evidensens kilde (partikler)</h1>
                <p>Hvorfra strømmer din viden? På dansk afslører seks små hverdagsord (<em>nok, sgu, jo, vel, vist, efter sigende</em>), om noget kommer fra din egen mave, fra jeres fælles grund eller fra et rygte udefra.</p>
            </div>

            <div class="ss-tabs-nav">
                
                <button type="button" class="ss-tab-btn ${activeTab === 'kompas' ? 'active' : ''}" data-tab="kompas">2. Kilde-kompas & omformer</button>
                <button type="button" class="ss-tab-btn ${activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">3. DU2/DU3 partikel-træner</button>
            </div>

            ${mainPanelHtml}
        `;

        inner.querySelector('#btn-back-evidens').onclick = () => navigateFn(backTarget);

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

        inner.querySelectorAll('[data-lab-sc]').forEach((btn) => {
            btn.onclick = () => {
                activeLabScenario = btn.dataset.labSc;
                render();
            };
        });

        inner.querySelectorAll('[data-lab-p]').forEach((btn) => {
            btn.onclick = () => {
                activeParticle = btn.dataset.labP;
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
