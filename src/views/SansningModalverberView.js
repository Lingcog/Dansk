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

const MODAL_HOTSPOTS = [
    {
        id: 'vil_kage',
        side: 'left',
        x: 27,
        y: 56,
        badge: 'Indre drivkraft • Egen lyst & vilje',
        word: 'vil',
        title: 'Vil — drivkraften kommer indefra',
        sentence: 'Hun vil så gerne have den varme kanelsnegl i vinduet.',
        translation: {
            en: 'wants to (inner desire / intention)',
            de: 'will / möchte',
            es: 'quiere (deseo interno)',
            ar: 'يريد (رغبة وإرادة داخلية)'
        },
        innerDesc: 'Kraften starter inde i kroppen som lyst, drøm eller fast beslutning. Ingen udefra tvinger hende.',
        outerDesc: 'Engelsk-fælde: Dansk "vil" er IKKE fremtid ("will")! På dansk betyder "Jeg vil købe en bil", at jeg har lyst eller vilje — ren fremtid udtrykkes med "skal" eller nutid.',
        aha: 'Husk altid infinitiv UDEN "at" efter alle modalverber: "Hun vil spise kagen" — aldrig *"Hun vil at spise".'
    },
    {
        id: 'vil_gynger',
        side: 'left',
        x: 61,
        y: 45,
        badge: 'Indre drivkraft • Frit valg',
        word: 'vil (frit valg)',
        title: 'Vil — når man vælger af egen drift',
        sentence: 'Børnene vil hellere gynge højt end at gå hjem endnu.',
        translation: {
            en: 'want to / prefer to',
            de: 'wollen lieber',
            es: 'prefieren / quieren',
            ar: 'يريدون / يفضلون'
        },
        innerDesc: 'Den indre vilje styrer retningen. Man kan skrue på følelsen: "vil gerne" (høflig lyst), "vil hellere" (foretrækker), "vil ikke" (nægter).',
        outerDesc: 'Når nogen siger "Jeg vil ikke!", sætter de hælene i jorden — modsat "Jeg må ikke" (en anden forbyder mig det).',
        aha: 'Forskellen på "vil ikke" (jeg nægter selv) og "må ikke" (forbud udefra) er afgørende i dansk hverdagssprog!'
    },
    {
        id: 'kan_kasse',
        side: 'left',
        x: 80,
        y: 62,
        badge: 'Indre kraft • Muskulær evne',
        word: 'kan',
        title: 'Kan — musklerne og styrken rækker',
        sentence: 'Han kan løfte hele æblekassen uden besvær.',
        translation: {
            en: 'can / is physically able to',
            de: 'kann (physische Kraft)',
            es: 'puede (fuerza física)',
            ar: 'يستطيع (قدرة بدنية)'
        },
        innerDesc: 'Her måler vi ikke lyst eller regler, men rå kapacitet: har du styrken, værktøjet eller pladsen til at gøre det?',
        outerDesc: 'Pas på med at forveksle "kan" (har jeg kræfterne?) med "må" (har jeg lov til det af portvogteren?).',
        aha: 'På engelsk siger mange "Can I sit here?", men på dansk spørger man om tilladelse med "må": "Må jeg sidde her?"'
    },
    {
        id: 'kan_cykel',
        side: 'left',
        x: 91,
        y: 44,
        badge: 'Indre kraft • Tillært færdighed',
        word: 'kan (færdighed)',
        title: 'Kan — når hjernen og kroppen har lært kunsten',
        sentence: 'Hun kan cykle op ad den stejle bakke uden at stå af.',
        translation: {
            en: 'knows how to / can',
            de: 'kann (Fähigkeit)',
            es: 'sabe / puede (habilidad)',
            ar: 'يُجيد / يعرف كيف'
        },
        innerDesc: 'Ud over muskelkraft bruges "kan" om alt, du har øvet dig i: "kan dansk", "kan svømme", "kan spille guitar".',
        outerDesc: 'Her behøver man ikke ordet "hvordan" bagefter — man siger bare "Jeg kan svømme", ikke *"Jeg kan hvordan man svømmer".',
        aha: 'Ved sprog behøver man heller ikke "tale": "Jeg kan godt lidt dansk" er helt naturligt hverdagssprog.'
    },
    {
        id: 'skal_pendler',
        side: 'right',
        x: 19,
        y: 55,
        badge: 'Ydre pres • Uundgåeligt tryk',
        word: 'skal',
        title: 'Skal — vinden og pligten skubber bagfra',
        sentence: 'Han skal nå morgentoget, selv om stormen raser.',
        translation: {
            en: 'must / has to / is going to',
            de: 'muss / soll',
            es: 'tiene que / debe',
            ar: 'يجب / مضطر (ضغط خارجي)'
        },
        innerDesc: 'Et ydre tryk eller en fastlagt plan driver dig fremad: chef, lov, aftale, ur eller nødvendighed.',
        outerDesc: 'Hvor "vil" trækker indefra ("jeg har lyst"), skubber "skal" bagfra ("jeg er nødt til det / vi har aftalt det").',
        aha: 'Fremtidsplaner: Når noget allerede er aftalt eller besluttet, bruger dansk "skal": "Jeg skal til Aarhus i weekenden."'
    },
    {
        id: 'skal_ur',
        side: 'right',
        x: 62,
        y: 18,
        badge: 'Ydre pres • Tid og aftale',
        word: 'skal (aftale)',
        title: 'Skal — når kalenderen og uret bestemmer',
        sentence: 'Uret slår otte; mødet skal starte præcis nu.',
        translation: {
            en: 'is scheduled to / must',
            de: 'soll / muss pünktlich',
            es: 'debe empezar / tiene que',
            ar: 'يجب أن / من المقرر أن'
        },
        innerDesc: 'Uret venter ikke. Tidspunkter, kontrakter og sociale regler lægger et usynligt pres på skuldrene.',
        outerDesc: 'Vigtig nægtelse: "Du skal ikke betale" eller "Du behøver ikke betale" = intet pres (du har frihed), IKKE forbud!' ,
        aha: 'Kæmpe DU2-fælde: Forbud hedder "må ikke" — IKKE "skal ikke"! "You must not smoke" = "Du må ikke ryge" (aldrig *"skal ikke").'
    },
    {
        id: 'maa_laage',
        side: 'right',
        x: 55,
        y: 52,
        badge: 'Portvogter • Åben dør (tilladelse)',
        word: 'må gerne',
        title: 'Må gerne — portvogteren åbner lågen for dig',
        sentence: 'Portvogteren smiler: "Ja, du må gerne gå ind i haven."',
        translation: {
            en: 'may / is allowed to',
            de: 'darf',
            es: 'puede / tiene permiso para',
            ar: 'يُسمح له (باب مفتوح)'
        },
        innerDesc: 'En regel, læge, forælder eller vagt holder nøglen til døren — og giver dig grønt lys.',
        outerDesc: 'Når du lægger "gerne" eller "godt" til ("Du må gerne låne min cykel"), lyder tilladelsen varm og gæstfri.',
        aha: 'Brug "Må jeg...?" når du vil have en åben dør på arbejde eller hos venner: "Må jeg åbne vinduet lidt?"'
    },
    {
        id: 'maa_ikke',
        side: 'right',
        x: 88,
        y: 56,
        badge: 'Portvogter • Låst bom (forbud)',
        word: 'må ikke',
        title: 'Må ikke — bommen går ned foran dig',
        sentence: 'Vagten ryster på hovedet: "Nej, her må I ikke køre ind."',
        translation: {
            en: 'must not / is forbidden to',
            de: 'darf nicht',
            es: 'no puede / está prohibido',
            ar: 'ممنوع / لا يُسمح له'
        },
        innerDesc: 'Døren er smækket i af en ydre autoritet eller lov. Det handler om regler og grænser, ikke om dine muskler.',
        outerDesc: 'Sammenlign tre ting: "Jeg kan ikke" (har ikke styrke), "Jeg vil ikke" (har ikke lyst), "Jeg må ikke" (det er forbudt).',
        aha: 'Huske-tjek: Rød skiltnings-forbud = altid "må ikke". Ingen tvang / valgfrit = "behøver ikke" (eller "skal ikke").'
    }
];

const FORCE_MODELS = [
    {
        id: 'skal',
        present: 'skal',
        past: 'skulle',
        label: 'Skal (ydre pres)',
        icon: '💨',
        color: '#fb923c',
        forceTitle: 'Vinden skubber dig fremad bagfra',
        forceDesc: 'Pligt, nødvendighed, aftale eller skæbne udefra. Du slipper ikke udenom.',
        presentEx: 'Jeg skal aflevere rapporten inden klokken fire.',
        pastEx: 'Jeg skulle lige høre, om I stadig har ledige pladser?',
        pastNote: 'Brug "skulle" høfligt ved telefonopkald eller i receptioner: "Jeg skulle hilse fra..." eller "Skulle det være en kop kaffe?"',
        extraTip: 'Intet pres (modsat forbud): "Du behøver ikke møde op" — pas på ikke at sige "må ikke", hvis du mener valgfrit!'
    },
    {
        id: 'vil',
        present: 'vil',
        past: 'ville',
        label: 'Vil (indre lyst)',
        icon: '🔥',
        color: '#38bdf8',
        forceTitle: 'Motoren brænder inde i dig selv',
        forceDesc: 'Egen vilje, ønske, ambition eller stædighed. Kraften kommer indefra.',
        presentEx: 'Jeg vil gerne lære at tale flydende dansk.',
        pastEx: 'Jeg ville egentlig høre, om vi kan rykke mødet til i morgen.',
        pastNote: 'Datid "ville" fungerer som blødgører, når du ønsker noget uden at presse den anden.',
        extraTip: 'Engelsk-fælde: Brug aldrig "vil" om rent vejr eller objektive ting uden vilje! Sig "Det bliver nok regn" eller "Toget kører kl. 8", ikke *"Toget vil køre".'
    },
    {
        id: 'maa',
        present: 'må',
        past: 'måtte',
        label: 'Må / må ikke (portvogter)',
        icon: '🚪',
        color: '#f472b6',
        forceTitle: 'En portvogter åbner eller lukker døren',
        forceDesc: 'Tilladelse ("må gerne") eller forbud ("må ikke"). Kan i svag form også betyde logisk tvang ("Det må være koldt!").',
        presentEx: 'Man må ikke cykle på fortovet, men man må gerne trække cyklen.',
        pastEx: 'Måtte jeg lige låne din kuglepen et øjeblik?',
        pastNote: 'Datid "måtte" kan både være fortids-tvang ("Vi måtte vente i regnen") og super høflig bøn ("Måtte jeg spørge om...?").',
        extraTip: 'Nægtelse af "må": "Du må ikke" = forbud (rødt lys). "Du behøver ikke" = grønt lys uden tvang!'
    },
    {
        id: 'kan',
        present: 'kan',
        past: 'kunne',
        label: 'Kan (muskulær evne)',
        icon: '💪',
        color: '#34d399',
        forceTitle: 'Din krop og viden løfter vægten',
        forceDesc: 'Fysisk kraft, tillært færdighed eller praktisk mulighed i situationen.',
        presentEx: 'Jeg kan bære begge poser op til tredje sal.',
        pastEx: 'Kunne du eventuelt hjælpe mig med at flytte bordet?',
        pastNote: 'Datid "kunne" er danskernes absolutte favorit til høflige spørgsmål: "Kunne jeg få regningen?"',
        extraTip: 'Husk altid infinitiv UDEN "at": "Kan du hjælpe mig?" — aldrig *"Kan du at hjælpe mig?"'
    }
];

const QUIZ_QUESTIONS = [
    {
        prompt: 'Et skilt ved indgangen til hospitalet viser en overstreget cigaret. Hvad siger vagten?',
        sentencePrefix: 'Du',
        sentenceSuffix: 'ryge her på området.',
        options: ['må ikke', 'behøver ikke', 'vil ikke', 'kan ikke'],
        correct: 'må ikke',
        explanation: 'Et forbud udefra ("portvogteren lukker bommen") hedder altid "må ikke" på dansk.'
    },
    {
        prompt: 'Din ven tilbyder at tage opvasken, men der står allerede en opvaskemaskine. Der er ingen tvang.',
        sentencePrefix: 'Tak, men du',
        sentenceSuffix: 'vaske op i hånden!',
        options: ['behøver ikke', 'må ikke', 'kan ikke', 'vil ikke'],
        correct: 'behøver ikke',
        explanation: 'Når der ikke er noget pres eller tvang (du har frit valg), bruger vi "behøver ikke" — aldrig "må ikke" (som ville betyde forbud).'
    },
    {
        prompt: 'Du sidder i et mødelokale og fryser en lille smule. Du spørger kollegaerne høfligt om tilladelse.',
        sentencePrefix: '',
        sentenceSuffix: 'jeg lukke vinduet et øjeblik?',
        options: ['Må', 'Kan', 'Skal', 'Vil'],
        correct: 'Må',
        explanation: 'Når man beder andre om lov / tilladelse til noget, åbner man døren med "Må jeg...?" (høfligere og mere præcist end "Kan jeg...?").'
    },
    {
        prompt: 'Kassen vejer 45 kilo, og din ryg gør ondt. Det handler om muskelstyrke.',
        sentencePrefix: 'Jeg',
        sentenceSuffix: 'desværre ikke løfte den alene.',
        options: ['kan', 'må', 'vil', 'skal'],
        correct: 'kan',
        explanation: '"Kan" handler om fysisk styrke, færdighed eller reel mulighed — her mangler styrken til at løfte kassen.'
    },
    {
        prompt: 'Din chef har givet dig en stram deadline i dag, så presset kommer udefra.',
        sentencePrefix: 'Jeg',
        sentenceSuffix: 'blive på kontoret til klokken seks.',
        options: ['skal', 'vil', 'kan', 'må'],
        correct: 'skal',
        explanation: 'Ydre pres og pligt ("vinden skubber bagfra") udtrykkes med "skal".'
    },
    {
        prompt: 'Ingen presser dig overhovedet, men du har en stærk personlig drøm om at flytte til Bornholm.',
        sentencePrefix: 'Jeg',
        sentenceSuffix: 'bo tæt på havet en dag.',
        options: ['vil gerne', 'skal helst', 'må ikke', 'behøver'],
        correct: 'vil gerne',
        explanation: 'Indre lyst og personligt ønske kommer indefra: "vil gerne".'
    },
    {
        prompt: 'Hvilken sætning er grammatisk KORREKT på dansk?',
        sentencePrefix: 'Vælg sætningen uden modal-fejl:',
        sentenceSuffix: '',
        options: [
            'Hun kan tale tre sprog flydende.',
            'Hun kan at tale tre sprog flydende.',
            'Hun kan taler tre sprog flydende.',
            'Hun at kan tale tre sprog flydende.'
        ],
        correct: 'Hun kan tale tre sprog flydende.',
        explanation: 'Efter modalverber (skal, vil, må, kan) står næste verbum altid i infinitiv UDEN "at": "kan tale".'
    },
    {
        prompt: 'Du står på en travl café og vil bede tjeneren om regningen på en ekstra venlig og blød måde.',
        sentencePrefix: 'Undskyld,',
        sentenceSuffix: 'jeg måske få regningen?',
        options: ['kunne', 'skal', 'måtte ikke', 'vil'],
        correct: 'kunne',
        explanation: 'Datidsformen "kunne" bruges hele tiden på dansk som høflig nutids-bøn ("Kunne jeg...?").'
    },
    {
        prompt: 'Vær opmærksom på forskellen mellem lyst og forbud: Barnet har fået lov til at spise slik, men kan ikke lide lakrids.',
        sentencePrefix: 'Hun må gerne spise den, men hun',
        sentenceSuffix: 'have lakrids.',
        options: ['vil ikke', 'må ikke', 'skal ikke', 'behøver ikke'],
        correct: 'vil ikke',
        explanation: 'Døren er åben (hun må gerne), men hendes egen indre lyst siger nej: "hun vil ikke".'
    },
    {
        prompt: 'Pas på engelsk-oversættelsen ("The train will leave at 14:10"). Hvordan siger man det naturligt på dansk?',
        sentencePrefix: 'Toget',
        sentenceSuffix: 'klokken 14:10 fra spor 4.',
        options: ['kører', 'vil køre', 'skal at køre', 'må køre'],
        correct: 'kører',
        explanation: 'En togkøreplan har ingen egen indre vilje! Til faste køreplaner og neutral fremtid bruger dansk bare nutid ("kører") eller "skal".'
    }
];

export function renderSansningModalverberView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const backTarget = extraData.from === 'flade3' ? 'sansning_flade3' : 'grammatik_sansning';
    const backLabel = extraData.from === 'flade3' ? '← Tilbage til hovedflade 3' : '← Tilbage til oversigt';

    let activeTab = 'kraftfelt';
    let pureMode = false;
    let selectedHotspotId = MODAL_HOTSPOTS[0].id;
    let activeForceId = FORCE_MODELS[0].id;
    let politePastMode = false;
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
        /* Force simulator */
        .force-card {
            background: rgba(34, 4, 8, 0.76); border: 1px solid rgba(255,190,198,0.24);
            border-radius: 22px; padding: 1.6rem;
        }
        .force-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; margin-bottom: 1.25rem; }
        @media (max-width: 780px) { .force-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        .force-btn {
            background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.18);
            border-radius: 14px; padding: 0.9rem; color: #FFF; text-align: left; cursor: pointer;
        }
        .force-btn.active { background: rgba(255,77,94,0.24); border-color: #FF8A95; box-shadow: 0 0 0 1px #FF8A95; }
        .force-panel {
            background: rgba(0,0,0,0.34); border: 1px solid rgba(255,255,255,0.16);
            border-radius: 18px; padding: 1.35rem;
        }
        .tense-toggle {
            background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.24);
            color: #FFF; padding: 0.45rem 0.95rem; border-radius: 999px; font-size: 0.84rem; font-weight: 700; cursor: pointer;
        }
        .tense-toggle.active { background: #38bdf8; border-color: #7dd3fc; color: #082f49; }
        .forbud-banner {
            margin-top: 1rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.9rem;
        }
        @media (max-width: 680px) { .forbud-banner { grid-template-columns: 1fr; } }
        .forbud-box {
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.14);
            border-radius: 14px; padding: 0.95rem 1.05rem; font-size: 0.9rem; line-height: 1.5;
        }
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
        const selectedHotspot = MODAL_HOTSPOTS.find((h) => h.id === selectedHotspotId) || MODAL_HOTSPOTS[0];
        const activeForce = FORCE_MODELS.find((f) => f.id === activeForceId) || FORCE_MODELS[0];

        let mainPanelHtml = '';
        if (activeTab === 'vrimmel') {
            const leftSpots = MODAL_HOTSPOTS.filter((h) => h.side === 'left');
            const rightSpots = MODAL_HOTSPOTS.filter((h) => h.side === 'right');

            mainPanelHtml = `
                <div class="contrast-canvas-card">
                    <div class="contrast-control-bar">
                        <span class="contrast-hint">Klik i billedet for at mærke, om kraften kommer indefra dig (vil/kan) eller presser dig udefra (skal/må).</span>
                        <button type="button" class="pure-toggle-btn ${pureMode ? 'active' : ''}" id="btn-pure-mode">
                            ${pureMode ? 'Vis ledetråde' : 'Kun billeder (ren sansning)'}
                        </button>
                    </div>
                    <div class="contrast-split-stage">
                        <div class="stage-half">
                            <div class="stage-half-header cool">
                                <span>Indre drivkraft & evne</span>
                                <span>vil, kan</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_modalverber_venstre.jpg" alt="Bagervindue, gynger, stærk mand med æblekasse og cyklist" />
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
                                <span>Ydre pres & portvogter</span>
                                <span>skal, må / må ikke</span>
                            </div>
                            <div class="stage-img-wrap">
                                <img src="${baseUrl}assets/sansning_modalverber_hoejre.jpg" alt="Pendler under uret, åben havelåge og vagt ved rød-hvid bom" />
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
                        ${MODAL_HOTSPOTS.map((h) => `
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
                            <strong>Kraftretning</strong>
                            ${selectedHotspot.innerDesc}
                        </div>
                        <div class="ss-contrast-box afstand">
                            <strong>Kontrast & typisk fælde</strong>
                            ${selectedHotspot.outerDesc}
                        </div>
                    </div>
                    <div class="ss-insp-aha">
                        <strong>Grammatisk aha-regel:</strong> ${selectedHotspot.aha}
                    </div>
                    <div class="ss-insp-languages">
                        <span class="ss-lang-pill">🇬🇧 ${selectedHotspot.translation.en}</span>
                        <span class="ss-lang-pill">🇩🇪 ${selectedHotspot.translation.de}</span>
                        <span class="ss-lang-pill">🇪🇸 ${selectedHotspot.translation.es}</span>
                        <span class="ss-lang-pill">🇸🇦 ${selectedHotspot.translation.ar}</span>
                    </div>
                </div>
            `;
        } else if (activeTab === 'kraftfelt') {
            const shownSentence = politePastMode ? activeForce.pastEx : activeForce.presentEx;
            mainPanelHtml = `
                <div class="force-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1.1rem;">
                        <div>
                            <h2 style="margin:0 0 0.25rem;font-size:1.4rem;font-weight:900;">Kraftfelt-simulatoren</h2>
                            <p style="margin:0;color:#FBD5D9;font-size:0.93rem;">Vælg en kraft for at se retningen — og slå høflig datid til for at mærke, hvordan tonen bliver blødere.</p>
                        </div>
                        <button type="button" class="tense-toggle ${politePastMode ? 'active' : ''}" id="btn-toggle-tense">
                            ${politePastMode ? 'Form: Datid / høflighed (skulle, ville, måtte, kunne)' : 'Form: Nutid / direkte kraft (skal, vil, må, kan)'}
                        </button>
                    </div>

                    <div class="force-grid">
                        ${FORCE_MODELS.map((f) => `
                            <button type="button" class="force-btn ${f.id === activeForceId ? 'active' : ''}" data-force="${f.id}">
                                <div style="font-size:1.45rem;margin-bottom:0.25rem;">${f.icon}</div>
                                <div style="font-weight:900;font-size:1.05rem;">${politePastMode ? f.past : f.present}</div>
                                <div style="font-size:0.8rem;color:#FBD5D9;">${f.label}</div>
                            </button>
                        `).join('')}
                    </div>

                    <div class="force-panel">
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:0.65rem;">
                            <span class="ss-detail-badge" style="border-color:${activeForce.color};color:#FFF;">
                                ${activeForce.icon} ${activeForce.forceTitle}
                            </span>
                            <button type="button" class="ss-tts-btn" id="btn-tts-force" data-say="${shownSentence.replace(/"/g, '&quot;')}">🔊 Lyt til eksemplet</button>
                        </div>
                        <div style="font-size:1.25rem;font-weight:800;color:#FFF;margin:0.5rem 0 0.75rem;">
                            "${shownSentence}"
                        </div>
                        <p style="margin:0 0 0.55rem;color:#FFE4E6;font-size:0.95rem;line-height:1.5;">
                            ${politePastMode ? activeForce.pastNote : activeForce.forceDesc}
                        </p>
                        <p style="margin:0;color:#FED7AA;font-size:0.88rem;">
                            <strong>Vigtig skelnen:</strong> ${activeForce.extraTip}
                        </p>
                    </div>

                    <div class="forbud-banner">
                        <div class="forbud-box" style="border-color:rgba(248,113,113,0.4);">
                            <strong style="color:#FCA5A5;">⛔ Forbud: må ikke</strong><br/>
                            Portvogteren smækker bommen ned: <em>"Du må ikke tage billeder her."</em><br/>
                            (Engelsk: must not / may not)
                        </div>
                        <div class="forbud-box" style="border-color:rgba(56,189,248,0.4);">
                            <strong style="color:#BAE6FD;">🕊️ Frit valg / ingen tvang: behøver ikke (skal ikke)</strong><br/>
                            Vinden lægger sig: <em>"Du behøver ikke betale nu — du kan vente til i morgen."</em><br/>
                            (Engelsk: don't have to / don't need to)
                        </div>
                    </div>
                </div>
            `;
        } else {
            if (quizIndex >= QUIZ_QUESTIONS.length) {
                mainPanelHtml = `
                    <div class="ss-quiz-card" style="text-align:center;">
                        <h2 style="margin:0 0 0.6rem;font-size:1.7rem;font-weight:900;">Modal-træningen fuldført!</h2>
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
                                <strong>${selectedOption === q.correct ? '✅ Helt rigtig kraft!' : '💡 Kig på kraftretningen:'}</strong>
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
                <button type="button" class="ss-back-btn" id="btn-back-modal">${backLabel}</button>
                <span class="ss-station-badge">Station 3.4 • Modalverbernes pres</span>
            </div>

            <div class="ss-hero">
                <h1>Modalverbernes pres</h1>
                <p>Mærk forskellen på ydre pres (<em>skal</em>), indre lyst (<em>vil</em>), åben dør eller forbud (<em>må / må ikke</em>) og muskulær evne (<em>kan</em>) — altid efterfulgt af infinitiv uden <em>at</em>.</p>
            </div>

            <div class="ss-tabs-nav">
                
                <button type="button" class="ss-tab-btn ${activeTab === 'kraftfelt' ? 'active' : ''}" data-tab="kraftfelt">2. Kraftfelt-simulator</button>
                <button type="button" class="ss-tab-btn ${activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">3. Modal-træner</button>
            </div>

            ${mainPanelHtml}
        `;

        inner.querySelector('#btn-back-modal').onclick = () => navigateFn(backTarget);

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

        inner.querySelectorAll('[data-force]').forEach((btn) => {
            btn.onclick = () => {
                activeForceId = btn.dataset.force;
                render();
            };
        });

        const tenseBtn = inner.querySelector('#btn-toggle-tense');
        if (tenseBtn) {
            tenseBtn.onclick = () => {
                politePastMode = !politePastMode;
                render();
            };
        }

        const ttsForceBtn = inner.querySelector('#btn-tts-force');
        if (ttsForceBtn) {
            ttsForceBtn.onclick = () => speakDanish(ttsForceBtn.dataset.say);
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
