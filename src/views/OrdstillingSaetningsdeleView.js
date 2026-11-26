import { baseUrl } from '../utils/config.js';
import { getTranslation, getLang } from '../utils/i18n.js';
import { swT } from '../utils/mb_skrive_translations.js';
import {
    getColorCodesEnabled,
    setColorCodesEnabled,
    renderColorLegendHtml,
    ensureOrdstillingColorStyles
} from '../utils/ordstillingColorCodes.js';

// ============================================================================
// MONOKROME SVG-IKONER (Kølig nordisk stil — nul emojis)
// ============================================================================
const SVG_CAMERA = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
const SVG_ZOOM_IN = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`;
const SVG_ZOOM_OUT = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`;
const SVG_LAYERS = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
const SVG_SPEAK = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
const SVG_SWAP = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`;
const SVG_CHECK = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

function speakDanish(text) {
    if (!text || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'da-DK';
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
}

// ============================================================================
// DATA: FANE 1 (ZOOM IND PÅ DET KENDTE CYKELBILLEDE)
// ============================================================================
const ZOOM_TRACKS = {
    hvem: {
        id: 'hvem',
        label: 'Hvem? (Grøn · Plads 1)',
        color: '#22c55e',
        levels: [
            {
                zoom: '1×',
                scale: 1,
                origin: '50% 45%',
                chunk: 'En kvinde',
                parts: [
                    { label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green', active: true },
                    { label: 'Plads 2 (Handling)', text: 'cykler', color: 'red' },
                    { label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Grundbilledet fra Ordstilling: 1 enkel grøn brik på Plads 1 — og handlingen "cykler" står på Plads 2.'
            },
            {
                zoom: '2×',
                scale: 1.45,
                origin: '49% 38%',
                chunk: 'En smilende kvinde',
                parts: [
                    { label: 'Plads 1 (Hvem?)', text: 'En smilende kvinde', color: 'green', active: true },
                    { label: 'Plads 2 (Handling)', text: 'cykler', color: 'red' },
                    { label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Kameraet zoomer ind: Vi sætter et beskrivende ord foran ("smilende"). Hele den grønne brik er stadig kun Plads 1!'
            },
            {
                zoom: '3×',
                scale: 1.85,
                origin: '50% 40%',
                chunk: 'En smilende kvinde med orange hue og blå jakke',
                parts: [
                    { label: 'Plads 1 (Hvem?)', text: 'En smilende kvinde med orange hue og blå jakke', color: 'green', active: true },
                    { label: 'Plads 2 (Handling)', text: 'cykler', color: 'red' },
                    { label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Endnu flere detaljer bagefter ("med orange hue og blå jakke"). Nu er Plads 1 på 9 ord — men "cykler" står stadig fast på Plads 2!'
            },
            {
                zoom: '4×',
                scale: 2.05,
                origin: '53% 46%',
                chunk: 'En smilende kvinde, som har en papirpose i kurven,',
                parts: [
                    { label: 'Plads 1 (Hvem? + som-del)', text: 'En smilende kvinde, som har en papirpose i kurven,', color: 'green', active: true },
                    { label: 'Plads 2 (Handling)', text: 'cykler', color: 'red' },
                    { label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Maksimal zoom: En hel "som"-del bor inde i den grønne brik! Alt sammen tæller stadig som Plads 1, og "cykler" kommer lige efter kommaet.'
            }
        ]
    },
    hvor: {
        id: 'hvor',
        label: 'Hvor? (Blå · Sted)',
        color: '#0284c7',
        levels: [
            {
                zoom: '1×',
                scale: 1,
                origin: '50% 60%',
                chunk: 'på gaden',
                parts: [
                    { label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { label: 'Plads 2 (Handling)', text: 'cykler', color: 'red' },
                    { label: 'Hvor?', text: 'på gaden', color: 'blue', active: true },
                    { label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Stedet er i grundformen bare 2 ord: "på gaden".'
            },
            {
                zoom: '2×',
                scale: 1.5,
                origin: '40% 78%',
                chunk: 'på den sneklædte cykelsti',
                parts: [
                    { label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { label: 'Plads 2 (Handling)', text: 'cykler', color: 'red' },
                    { label: 'Hvor?', text: 'på den sneklædte cykelsti', color: 'blue', active: true },
                    { label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Vi zoomer ind på stedet: Det lille ord "på" får selskab af et mere præcist sted ("den sneklædte cykelsti").'
            },
            {
                zoom: '3×',
                scale: 1.85,
                origin: '18% 54%',
                chunk: 'på cykelstien foran den lille café og den grønne bus',
                parts: [
                    { label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { label: 'Plads 2 (Handling)', text: 'cykler', color: 'red' },
                    { label: 'Hvor?', text: 'på cykelstien foran den lille café og den grønne bus', color: 'blue', active: true },
                    { label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Hele den blå brik besvarer stadig ét eneste spørgsmål — "Hvor?" — selvom den nu maler et helt gadebillede.'
            }
        ]
    },
    hvornaar: {
        id: 'hvornaar',
        label: 'Hvornår? (Lilla · Tid)',
        color: '#8b5cf6',
        levels: [
            {
                zoom: '1×',
                scale: 1,
                origin: '50% 35%',
                chunk: 'om morgenen',
                parts: [
                    { label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { label: 'Plads 2 (Handling)', text: 'cykler', color: 'red' },
                    { label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { label: 'Hvornår?', text: 'om morgenen', color: 'purple', active: true }
                ],
                note: 'Et enkelt tidsudtryk: "om morgenen".'
            },
            {
                zoom: '2×',
                scale: 1.4,
                origin: '50% 25%',
                chunk: 'en kold vintermorgen i snevejr',
                parts: [
                    { label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { label: 'Plads 2 (Handling)', text: 'cykler', color: 'red' },
                    { label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { label: 'Hvornår?', text: 'en kold vintermorgen i snevejr', color: 'purple', active: true }
                ],
                note: 'Tidsbrikken vokser med flere detaljer — og hvis du flytter hele den lilla brik til Plads 1, kommer "cykler" lige efter!'
            },
            {
                zoom: '3×',
                scale: 1.55,
                origin: '25% 48%',
                chunk: 'mens det sner stille, og bussen kører forbi',
                parts: [
                    { label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { label: 'Plads 2 (Handling)', text: 'cykler', color: 'red' },
                    { label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { label: 'Hvornår? (Baggrunds-del)', text: 'mens det sner stille, og bussen kører forbi', color: 'purple', active: true }
                ],
                note: 'Her bliver tidsbrikken til en hel baggrunds-del! Det leder direkte videre til Fane 3 (Zoom ud: Forgrund og baggrund).'
            }
        ]
    }
};

// ============================================================================
// DATA: FANE 3 (ZOOM UD — DEN CYKLENDE KVINDE I STØRRE OMGIVELSER)
// ============================================================================
const ZOOM_OUT_SCENES = [
    {
        id: 'fordi',
        question: 'Hvorfor?',
        conj: 'fordi',
        fgLabel: 'Forgrund (Hoved-del)',
        bgLabel: 'Baggrund · Årsag (fordi)',
        fgFirst: {
            fg: 'Kvinden har en varm vinterjakke og hue på',
            bg: ', fordi det sner og er koldt i dag.',
            full: 'Kvinden har en varm vinterjakke og hue på, fordi det sner og er koldt i dag.'
        },
        bgFirst: {
            bg: 'Fordi det sner og er koldt i dag,',
            v2Verb: 'har',
            fgRest: 'kvinden en varm vinterjakke og hue på.',
            full: 'Fordi det sner og er koldt i dag, har kvinden en varm vinterjakke og hue på.'
        },
        ikkeDemo: {
            main: 'Hun <strong>tager ikke</strong> bussen i dag.',
            sub: 'Hun cykler gennem sneen, fordi hun <strong>ikke tager</strong> bussen i dag.'
        },
        tip: 'Når baggrunden ("Fordi det sner og er koldt i dag,") står på Plads 1, tæller hele baggrunds-delen som én stor brik — derfor står handlingen "har" straks på Plads 2!'
    },
    {
        id: 'selvom',
        question: 'Modstand?',
        conj: 'selvom',
        fgLabel: 'Forgrund (Hoved-del)',
        bgLabel: 'Baggrund · Modstand (selvom)',
        fgFirst: {
            fg: 'Hun cykler roligt og smiler',
            bg: ', selvom det ikke er varmt i vejret.',
            full: 'Hun cykler roligt og smiler, selvom det ikke er varmt i vejret.'
        },
        bgFirst: {
            bg: 'Selvom det ikke er varmt i vejret,',
            v2Verb: 'cykler',
            fgRest: 'hun roligt og smiler.',
            full: 'Selvom det ikke er varmt i vejret, cykler hun roligt og smiler.'
        },
        ikkeDemo: {
            main: 'Det <strong>er ikke</strong> varmt i vejret.',
            sub: 'Hun cykler gennem byen, selvom det <strong>ikke er</strong> varmt i vejret.'
        },
        tip: 'Læg mærke til "ikke": I forgrunden står "ikke" efter handlingen ("er ikke"), men inde i baggrunden efter "selvom" flytter "ikke" foran handlingen ("ikke er").'
    },
    {
        id: 'mens',
        question: 'Hvornår?',
        conj: 'mens',
        fgLabel: 'Forgrund (Hoved-del)',
        bgLabel: 'Baggrund · Samtidig (mens)',
        fgFirst: {
            fg: 'Den grønne bus kører forbi den varme café',
            bg: ', mens kvinden cykler på cykelstien.',
            full: 'Den grønne bus kører forbi den varme café, mens kvinden cykler på cykelstien.'
        },
        bgFirst: {
            bg: 'Mens kvinden cykler på cykelstien,',
            v2Verb: 'kører',
            fgRest: 'den grønne bus forbi den varme café.',
            full: 'Mens kvinden cykler på cykelstien, kører den grønne bus forbi den varme café.'
        },
        ikkeDemo: {
            main: 'Hun <strong>har ikke</strong> travlt i morges.',
            sub: 'Bussen kører forbi, mens hun <strong>ikke har</strong> travlt.'
        },
        tip: 'Med "mens" viser baggrunden, hvad der sker omkring hende i byen. Flyttes baggrunden forrest, kommer handlingen "kører" direkte efter kommaet.'
    },
    {
        id: 'hvis',
        question: 'Betingelse?',
        conj: 'hvis',
        fgLabel: 'Forgrund (Hoved-del)',
        bgLabel: 'Baggrund · Betingelse (hvis)',
        fgFirst: {
            fg: 'Hun går ind på den varme café',
            bg: ', hvis sneen ikke stopper snart.',
            full: 'Hun går ind på den varme café, hvis sneen ikke stopper snart.'
        },
        bgFirst: {
            bg: 'Hvis sneen ikke stopper snart,',
            v2Verb: 'går',
            fgRest: 'hun ind på den varme café.',
            full: 'Hvis sneen ikke stopper snart, går hun ind på den varme café.'
        },
        ikkeDemo: {
            main: 'Sneen <strong>stopper ikke</strong> endnu.',
            sub: 'Hun tager en pause på caféen, hvis sneen <strong>ikke stopper</strong> snart.'
        },
        tip: 'Betingelsen ("Hvis sneen ikke stopper snart,") sætter rammen for hele sætningen — og inde i baggrunden står "ikke" foran "stopper".'
    }
];

// ============================================================================
// DATA: FANE 4 — DEL 1: ZOOM IND (6 FARVEKODEDE BYGGEOPGAVER INDE I ÉN BRIK)
// ============================================================================
const ZOOM_IN_TASKS = [
    {
        id: 'zi1',
        tag: 'Hvem?-brikken · Før + Kerne + Efter',
        instruction: 'Udvid den grønne Plads 1-brik ved at sætte delene i rigtig rækkefølge foran handlingen:',
        fixedBefore: null,
        fixedAfter: { text: 'cykler på gaden.', color: 'red' },
        targetLabel: 'Plads 1 (Hvem?)',
        correctSeq: ['Den', 'smilende', 'kvinde', 'med den orange hue'],
        pool: [
            { text: 'med den orange hue', color: 'blue' },
            { text: 'kvinde', color: 'green' },
            { text: 'Den', color: 'green' },
            { text: 'smilende', color: 'orange' }
        ],
        fullSentence: 'Den smilende kvinde med den orange hue cykler på gaden.',
        expl: 'En udvidet Hvem?-brik bygges som: lille ord ("Den") + beskrivelse ("smilende") + kerne ("kvinde") + ekstra detalje ("med den orange hue"). Alt sammen fylder kun Plads 1!'
    },
    {
        id: 'zi2',
        tag: 'Hvem?-brikken + som-del (Pas på lokkebrik!)',
        instruction: 'Byg hele Plads 1-brikken med en "som"-del indeni — og sæt handlingen på Plads 2 (lad lokkebrikken ligge!):',
        fixedBefore: null,
        fixedAfter: { text: 'roligt forbi.', color: 'purple' },
        targetLabel: 'Plads 1 + Plads 2',
        correctSeq: ['Kvinden,', 'som har en papirpose i kurven,', 'cykler'],
        pool: [
            { text: 'cykler', color: 'red' },
            { text: 'hun', color: 'green' },
            { text: 'Kvinden,', color: 'green' },
            { text: 'som har en papirpose i kurven,', color: 'purple' }
        ],
        decoyNote: 'Lokkebrikken "hun" skal IKKE med.',
        fullSentence: 'Kvinden, som har en papirpose i kurven, cykler roligt forbi.',
        expl: 'Hele "Kvinden, som har en papirpose i kurven," er Plads 1. Der må ikke snige sig et ekstra "hun" ind før handlingen "cykler"!'
    },
    {
        id: 'zi3',
        tag: 'Hvor?-brikken · Sted med detaljer',
        instruction: 'Zoom ind på stedet ("Hvor?") og byg hele den blå brik efter "En kvinde cykler":',
        fixedBefore: { text: 'En kvinde cykler', color: 'green' },
        fixedAfter: { text: 'om morgenen.', color: 'purple' },
        targetLabel: 'Hvor? (Sted-brik)',
        correctSeq: ['på', 'den sneklædte cykelsti', 'foran den varme café'],
        pool: [
            { text: 'foran den varme café', color: 'blue' },
            { text: 'på', color: 'blue' },
            { text: 'den sneklædte cykelsti', color: 'blue' }
        ],
        fullSentence: 'En kvinde cykler på den sneklædte cykelsti foran den varme café om morgenen.',
        expl: 'Den blå sted-brik starter med det lille stedsord ("på"), derefter selve stedet ("den sneklædte cykelsti") og til sidst ekstra præcisering ("foran den varme café").'
    },
    {
        id: 'zi4',
        tag: 'Handlings-brikken · 2 udsagnsord som ramme',
        instruction: 'Start med "Om morgenen" (Plads 1) og placer de to røde handlingsord rigtigt rundt om personen:',
        fixedBefore: { text: 'Om morgenen', color: 'purple' },
        fixedAfter: { text: 'gennem byen.', color: 'blue' },
        targetLabel: 'Plads 2 + Person + Rest af handling',
        correctSeq: ['vil', 'hun', 'gerne', 'cykle'],
        pool: [
            { text: 'cykle', color: 'red' },
            { text: 'hun', color: 'green' },
            { text: 'vil', color: 'red' },
            { text: 'gerne', color: 'purple' }
        ],
        fullSentence: 'Om morgenen vil hun gerne cykle gennem byen.',
        expl: 'Når handlingen har to udsagnsord, står det første ("vil") på Plads 2, mens det andet ("cykle") lukker rammen efter personen og småordet ("hun gerne").'
    },
    {
        id: 'zi5',
        tag: 'Hvad?-brikken · Før + Kerne + Efter',
        instruction: 'Udvid det, hun har med ("Hvad?"), med alle detaljerne i rigtig rækkefølge:',
        fixedBefore: { text: 'Hun køber', color: 'green' },
        fixedAfter: { text: 'før arbejde.', color: 'purple' },
        targetLabel: 'Hvad?-brikken',
        correctSeq: ['en varm', 'kop kaffe', 'fra den lille café', 'på hjørnet'],
        pool: [
            { text: 'på hjørnet', color: 'blue' },
            { text: 'kop kaffe', color: 'green' },
            { text: 'fra den lille café', color: 'blue' },
            { text: 'en varm', color: 'orange' }
        ],
        fullSentence: 'Hun køber en varm kop kaffe fra den lille café på hjørnet før arbejde.',
        expl: 'Hvad?-brikken vokser fra kernen ("kop kaffe") med beskrivelse foran ("en varm") og stedsdetaljer bagefter ("fra den lille café på hjørnet").'
    },
    {
        id: 'zi6',
        tag: 'Årsags-brik på Plads 1 (V2)',
        instruction: 'Byg hele årsags-brikken ("På grund af...") på Plads 1, og sæt handlingen på Plads 2:',
        fixedBefore: null,
        fixedAfter: { text: 'den orange hue på.', color: 'orange' },
        targetLabel: 'Plads 1 (Årsag) + Plads 2 (Handling)',
        correctSeq: ['På grund af', 'den kolde sne', 'tager', 'hun'],
        pool: [
            { text: 'hun', color: 'green' },
            { text: 'den kolde sne', color: 'purple' },
            { text: 'tager', color: 'red' },
            { text: 'På grund af', color: 'purple' }
        ],
        fullSentence: 'På grund af den kolde sne tager hun den orange hue på.',
        expl: 'Hele årsags-brikken "På grund af den kolde sne" tæller som Plads 1 — derfor kommer handlingen "tager" straks på Plads 2 før "hun".'
    }
];

// ============================================================================
// DATA: FANE 4 — DEL 2: ZOOM UD (6 FARVEKODEDE SÆTNINGSDELS-MANIPULATIONER)
// ============================================================================
const ZOOM_OUT_TASKS = [
    {
        id: 'zo1',
        tag: 'Flyt baggrunden forrest (fordi + Plads 2)',
        instruction: 'Start med baggrunden ("Fordi det sner i dag,") på Plads 1 — og byg forgrunden i rigtig rækkefølge:',
        fixedBefore: null,
        fixedAfter: { text: '.', color: 'neutral' },
        targetLabel: 'Baggrund (Plads 1) + Forgrund (Plads 2)',
        correctSeq: ['Fordi det sner i dag,', 'tager', 'kvinden', 'sin varme vinterjakke på'],
        pool: [
            { text: 'kvinden', color: 'green' },
            { text: 'sin varme vinterjakke på', color: 'orange' },
            { text: 'Fordi det sner i dag,', color: 'purple' },
            { text: 'tager', color: 'red' }
        ],
        fullSentence: 'Fordi det sner i dag, tager kvinden sin varme vinterjakke på.',
        expl: 'Hele baggrunden "Fordi det sner i dag," fylder Plads 1. Derfor springer handlingen "tager" frem på Plads 2 lige efter kommaet!'
    },
    {
        id: 'zo2',
        tag: '"ikke" inde i baggrunden (fordi + ikke)',
        instruction: 'Byg baggrunds-delen efter "Hun cykler på cykelstien," — husk hvor "ikke" står i baggrunden:',
        fixedBefore: { text: 'Hun cykler på cykelstien,', color: 'green' },
        fixedAfter: { text: '.', color: 'neutral' },
        targetLabel: 'Baggrund med "ikke"',
        correctSeq: ['fordi', 'hun', 'ikke', 'vil', 'tage bussen'],
        pool: [
            { text: 'vil', color: 'red' },
            { text: 'fordi', color: 'purple' },
            { text: 'tage bussen', color: 'red' },
            { text: 'ikke', color: 'purple' },
            { text: 'hun', color: 'green' }
        ],
        fullSentence: 'Hun cykler på cykelstien, fordi hun ikke vil tage bussen.',
        expl: 'Inde i baggrunden sniger "ikke" sig altid ind FORAN handlingen: "fordi hun ikke vil tage bussen".'
    },
    {
        id: 'zo3',
        tag: 'Modstand forrest (selvom + ikke + Plads 2)',
        instruction: 'Kombinér begge regler: "ikke" foran handlingen i baggrunden OG handlingen på Plads 2 i forgrunden:',
        fixedBefore: null,
        fixedAfter: { text: '.', color: 'neutral' },
        targetLabel: 'Baggrund (selvom + ikke) + Forgrund (Plads 2)',
        correctSeq: ['Selvom', 'det', 'ikke er varmt,', 'cykler', 'hun', 'gennem byen'],
        pool: [
            { text: 'cykler', color: 'red' },
            { text: 'gennem byen', color: 'blue' },
            { text: 'Selvom', color: 'purple' },
            { text: 'hun', color: 'green' },
            { text: 'ikke er varmt,', color: 'purple' },
            { text: 'det', color: 'green' }
        ],
        fullSentence: 'Selvom det ikke er varmt, cykler hun gennem byen.',
        expl: 'I baggrunden står "ikke" foran handlingen ("ikke er varmt"), og i forgrunden efter kommaet står handlingen først ("cykler hun").'
    },
    {
        id: 'zo4',
        tag: 'Tid som baggrund på Plads 1 (mens + Plads 2)',
        instruction: 'Sæt baggrunden forrest for at ramme scenen ind, og byg forgrunden rigtigt efter kommaet:',
        fixedBefore: null,
        fixedAfter: { text: '.', color: 'neutral' },
        targetLabel: 'Baggrund (Plads 1) + Forgrund (Plads 2)',
        correctSeq: ['Mens kvinden cykler forbi,', 'kører', 'den grønne bus', 'forbi caféen'],
        pool: [
            { text: 'forbi caféen', color: 'blue' },
            { text: 'den grønne bus', color: 'green' },
            { text: 'Mens kvinden cykler forbi,', color: 'purple' },
            { text: 'kører', color: 'red' }
        ],
        fullSentence: 'Mens kvinden cykler forbi, kører den grønne bus forbi caféen.',
        expl: 'Baggrunden ("Mens kvinden cykler forbi,") tæller som én brik på Plads 1, så handlingen "kører" kommer direkte på Plads 2.'
    },
    {
        id: 'zo5',
        tag: 'Betingelse med "ikke" (hvis + ikke + Plads 2)',
        instruction: 'Byg hele betingelses-sætningen med "hvis" forrest — husk både "ikke" før handlingen og Plads 2 efter kommaet:',
        fixedBefore: null,
        fixedAfter: { text: '.', color: 'neutral' },
        targetLabel: 'Betingelse (Plads 1) + Forgrund (Plads 2)',
        correctSeq: ['Hvis sneen', 'ikke', 'stopper snart,', 'går', 'hun', 'ind på caféen'],
        pool: [
            { text: 'hun', color: 'green' },
            { text: 'stopper snart,', color: 'red' },
            { text: 'går', color: 'red' },
            { text: 'Hvis sneen', color: 'purple' },
            { text: 'ind på caféen', color: 'blue' },
            { text: 'ikke', color: 'purple' }
        ],
        fullSentence: 'Hvis sneen ikke stopper snart, går hun ind på caféen.',
        expl: 'Perfekt lang sætning: "ikke" foran "stopper" inde i hvis-delen, og "går hun" lige efter kommaet.'
    },
    {
        id: 'zo6',
        tag: 'Dobbelt zoom · Stor Hvem?-brik + baggrund',
        instruction: 'Saml en rig sætning, hvor både Plads 1 er zoomet ind OG baggrunden forklarer årsagen:',
        fixedBefore: null,
        fixedAfter: { text: '.', color: 'neutral' },
        targetLabel: 'Udvidet Forgrund + Baggrund (fordi)',
        correctSeq: ['Den smilende kvinde på cyklen', 'skynder sig,', 'fordi', 'det', 'allerede', 'sner kraftigt'],
        pool: [
            { text: 'allerede', color: 'purple' },
            { text: 'skynder sig,', color: 'red' },
            { text: 'sner kraftigt', color: 'red' },
            { text: 'fordi', color: 'purple' },
            { text: 'Den smilende kvinde på cyklen', color: 'green' },
            { text: 'det', color: 'green' }
        ],
        fullSentence: 'Den smilende kvinde på cyklen skynder sig, fordi det allerede sner kraftigt.',
        expl: 'Her bruger du begge kamera-greb: en udvidet grøn Hvem?-brik i forgrunden + en baggrunds-del, hvor småordet "allerede" står foran handlingen "sner"!'
    }
];

// ============================================================================
// DATA: FANE 4 — DEL 3: HURTIG-QUIZ (8 KONTROLSPØRGSMÅL)
// ============================================================================
const WORKSHOP_QUIZ = [
    {
        type: 'Zoom ind · Plads 1 & Plads 2',
        prompt: 'Du zoomer ind på "En kvinde" → "Den smilende kvinde med orange hue". Hvilken sætning har handlingen på Plads 2?',
        options: [
            'Den smilende kvinde med orange hue cykler på gaden.',
            'Den smilende kvinde cykler med orange hue på gaden i går.'
        ],
        correct: 'Den smilende kvinde med orange hue cykler på gaden.',
        expl: 'Hele den udvidede grønne brik ("Den smilende kvinde med orange hue") er Plads 1 — og handlingen "cykler" står samlet lige bagefter på Plads 2.'
    },
    {
        type: 'Zoom ind · som-del i Plads 1',
        prompt: 'Vi pakker en "som"-del ind i Plads 1. Hvor skal handlingen "cykler" stå?',
        options: [
            'Kvinden, som har en papirpose i kurven, cykler roligt forbi.',
            'Kvinden, som har en papirpose i kurven, hun cykler roligt forbi.'
        ],
        correct: 'Kvinden, som har en papirpose i kurven, cykler roligt forbi.',
        expl: 'Hele "Kvinden, som har en papirpose i kurven," er stadig én samlet Plads 1-brik. Der skal ikke et ekstra "hun" ind — handlingen "cykler" kommer direkte efter kommaet.'
    },
    {
        type: 'Zoom ind · 2 handlingsord som ramme',
        prompt: 'Når handlings-brikken har to udsagnsord ("vil" + "cykle") og starter med "Om morgenen", hvor står delene så?',
        options: [
            'Om morgenen vil hun gerne cykle gennem byen.',
            'Om morgenen hun vil gerne cykle gennem byen.'
        ],
        correct: 'Om morgenen vil hun gerne cykle gennem byen.',
        expl: 'Det første udsagnsord ("vil") står fast på Plads 2, mens det andet ("cykle") lukker rammen senere i sætningen.'
    },
    {
        type: 'Zoom ud · Baggrund først (Plads 2)',
        prompt: 'Du flytter baggrunden ("Fordi det sner kraftigt") forrest i sætningen. Hvad kommer lige efter kommaet?',
        options: [
            'Fordi det sner kraftigt, tager hun sin varme hue på.',
            'Fordi det sner kraftigt, hun tager sin varme hue på.'
        ],
        correct: 'Fordi det sner kraftigt, tager hun sin varme hue på.',
        expl: 'Hele baggrunden "Fordi det sner kraftigt" fungerer som én samlet Plads 1-brik — så forgrundens handling ("tager") står på Plads 2!'
    },
    {
        type: 'Zoom ud · "ikke" i baggrunden',
        prompt: 'Hvor står "ikke" inde i baggrunds-brikken efter "fordi"?',
        options: [
            'Hun cykler i sneen, fordi hun ikke vil vente på bussen.',
            'Hun cykler i sneen, fordi hun vil ikke vente på bussen.'
        ],
        correct: 'Hun cykler i sneen, fordi hun ikke vil vente på bussen.',
        expl: 'Inde i en baggrunds-del sniger "ikke" sig altid ind FORAN handlingen: "fordi hun ikke vil...".'
    },
    {
        type: 'Zoom ud · Modstand med "selvom"',
        prompt: 'Vælg den sætning, hvor både Plads 2 og "ikke"-reglen er helt rigtige:',
        options: [
            'Selvom det ikke er varmt, cykler hun en lang tur.',
            'Selvom det er ikke varmt, hun cykler en lang tur.'
        ],
        correct: 'Selvom det ikke er varmt, cykler hun en lang tur.',
        expl: 'I baggrunden står "ikke" foran handlingen ("ikke er"), og i forgrunden efter kommaet står handlingen først ("cykler hun").'
    },
    {
        type: 'Zoom ud · Betingelse med "hvis"',
        prompt: 'Vi sætter en betingelse på Plads 1. Hvilken sætning er korrekt dansk?',
        options: [
            'Hvis sneen ikke stopper snart, går hun ind på den varme café.',
            'Hvis sneen stopper ikke snart, hun går ind på den varme café.'
        ],
        correct: 'Hvis sneen ikke stopper snart, går hun ind på den varme café.',
        expl: 'Baggrunden har "ikke" før handlingen ("ikke stopper"), og forgrunden starter med handlingen ("går hun") på Plads 2.'
    },
    {
        type: 'Zoom ind · Størrelse på samme spørgsmål',
        prompt: 'Hvilken af disse to besvarer spørgsmålet "Hvorfor?" med en hel baggrunds-del (med egen handling)?',
        options: [
            'Fordi det sner og er glat på vejen.',
            'På grund af sneen.'
        ],
        correct: 'Fordi det sner og er glat på vejen.',
        expl: '"På grund af sneen" er en kortere brik uden udsagnsord, mens "Fordi det sner og er glat på vejen" er en hel baggrunds-del med sin egen handling ("sner / er").'
    }
];

function brickColorClass(color, enabled) {
    if (!enabled || !color || color === 'neutral') return '';
    return `osd-c-${color}`;
}

function injectSaetningsdeleStyles() {
    if (document.getElementById('ordstilling-saetningsdele-styles')) return;
    const style = document.createElement('style');
    style.id = 'ordstilling-saetningsdele-styles';
    style.textContent = `
        .osd-view {
            max-width: 980px;
            width: 100%;
            margin: 0 auto;
            padding: 0.75rem 1rem 4.5rem;
            color: #f1f5f9;
            box-sizing: border-box;
            overflow-x: hidden;
        }
        .osd-view *, .osd-view *::before, .osd-view *::after { box-sizing: border-box; }
        .osd-header { margin: 0.6rem 0 1.15rem; }
        .osd-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(43, 110, 120, 0.22);
            border: 1px solid rgba(76, 155, 166, 0.45);
            color: #7ec4ce;
            font-size: 0.78rem;
            font-weight: 800;
            padding: 0.26rem 0.75rem;
            border-radius: 999px;
            margin-bottom: 0.55rem;
        }
        .osd-header h1 {
            margin: 0 0 0.4rem;
            font-size: clamp(1.55rem, 3.2vw, 2.1rem);
            font-weight: 800;
            color: #f1f5f9;
            letter-spacing: -0.02em;
        }
        .osd-header p {
            margin: 0;
            color: #94a3b8;
            font-size: 0.96rem;
            line-height: 1.55;
            max-width: 780px;
        }
        .osd-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 13px;
            padding: 4px;
            margin-bottom: 1.35rem;
        }
        .osd-tab {
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.56rem 0.95rem;
            border-radius: 9px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.16s ease;
        }
        .osd-tab:hover { color: #f1f5f9; }
        .osd-tab.active { background: #e2e8f0; color: #0f172a; }
        .osd-card {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.13);
            border-radius: 16px;
            padding: 1.25rem 1.35rem;
            margin-bottom: 1.15rem;
        }
        .osd-card-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.65rem;
            margin-bottom: 0.95rem;
        }
        .osd-card-title {
            margin: 0;
            font-size: 1.02rem;
            font-weight: 800;
            color: #f1f5f9;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
        }
        .osd-chip-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            align-items: center;
        }
        .osd-chip {
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.16);
            color: #cbd5e1;
            padding: 0.42rem 0.82rem;
            border-radius: 9px;
            font-size: 0.83rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            transition: all 0.15s ease;
        }
        .osd-chip:hover { border-color: rgba(203, 213, 225, 0.42); color: #ffffff; }
        .osd-chip.active { background: #2b6e78; border-color: #4c9ba6; color: #ffffff; }
        .osd-chip.light-active { background: #e2e8f0; border-color: #e2e8f0; color: #0f172a; }
        .osd-camera-frame {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            max-height: 360px;
            border-radius: 14px;
            overflow: hidden;
            background: #0b1017;
            border: 1px solid rgba(203, 213, 225, 0.18);
            margin-bottom: 1rem;
        }
        .osd-camera-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform-origin 0.5s ease;
        }
        .osd-viewfinder-badge {
            position: absolute;
            top: 12px;
            left: 12px;
            background: rgba(15, 23, 42, 0.82);
            border: 1px solid rgba(203, 213, 225, 0.3);
            color: #f8fafc;
            font-size: 0.76rem;
            font-weight: 800;
            padding: 0.28rem 0.65rem;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            backdrop-filter: blur(4px);
        }
        .osd-sentence-blocks {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
            align-items: stretch;
            margin: 0.9rem 0;
        }
        .osd-block {
            border-radius: 12px;
            padding: 0.6rem 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.22rem;
            border: 1.5px solid rgba(203, 213, 225, 0.2);
            background: #101419;
            transition: all 0.2s ease;
        }
        .osd-block.green { background: rgba(34, 197, 94, 0.12); border-color: rgba(34, 197, 94, 0.45); }
        .osd-block.red { background: rgba(239, 68, 68, 0.14); border-color: rgba(239, 68, 68, 0.55); }
        .osd-block.blue { background: rgba(2, 132, 199, 0.14); border-color: rgba(56, 189, 248, 0.48); }
        .osd-block.purple { background: rgba(139, 92, 246, 0.14); border-color: rgba(167, 139, 250, 0.48); }
        .osd-block.orange { background: rgba(249, 115, 22, 0.14); border-color: rgba(249, 115, 22, 0.5); }
        .osd-block.zoomed { box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.28); transform: translateY(-1px); }
        .osd-block-lbl { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #94a3b8; }
        .osd-block.green .osd-block-lbl { color: #4ade80; }
        .osd-block.red .osd-block-lbl { color: #f87171; }
        .osd-block.blue .osd-block-lbl { color: #60a5fa; }
        .osd-block.purple .osd-block-lbl { color: #c084fc; }
        .osd-block.orange .osd-block-lbl { color: #fb923c; }
        .osd-block-txt { font-size: 1.02rem; font-weight: 800; color: #ffffff; line-height: 1.35; }
        .osd-note-box {
            background: #101419;
            border: 1px solid rgba(76, 155, 166, 0.4);
            border-left: 3px solid #4c9ba6;
            border-radius: 10px;
            padding: 0.78rem 0.95rem;
            font-size: 0.88rem;
            color: #cbd5e1;
            line-height: 1.55;
        }
        .osd-grid-3 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 0.9rem;
        }
        .osd-mini-card {
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 14px;
            padding: 1rem 1.05rem;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
        }
        .osd-mini-card h3 { margin: 0; font-size: 0.96rem; font-weight: 800; color: #f1f5f9; }
        .osd-mini-card p { margin: 0; font-size: 0.84rem; color: #94a3b8; line-height: 1.5; }
        .osd-clause-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
            margin: 0.9rem 0;
        }
        .osd-clause-fg {
            flex: 1 1 260px;
            background: rgba(34, 197, 94, 0.12);
            border: 1.5px solid rgba(34, 197, 94, 0.5);
            border-radius: 12px;
            padding: 0.8rem 0.95rem;
        }
        .osd-clause-bg {
            flex: 1 1 260px;
            background: rgba(139, 92, 246, 0.12);
            border: 1.5px dashed rgba(167, 139, 250, 0.55);
            border-radius: 12px;
            padding: 0.8rem 0.95rem;
        }
        .osd-v2-pill {
            display: inline-block;
            background: rgba(239, 68, 68, 0.25);
            border: 1px solid #ef4444;
            color: #fecaca;
            padding: 0.05rem 0.42rem;
            border-radius: 6px;
            font-weight: 800;
        }
        .osd-btn-primary {
            background: #2b6e78;
            border: 1px solid #3d8b96;
            color: #ffffff;
            padding: 0.52rem 1.05rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .osd-btn-primary:hover { background: #35838f; }
        .osd-btn-ghost {
            background: transparent;
            border: 1px solid rgba(203, 213, 225, 0.22);
            color: #cbd5e1;
            padding: 0.48rem 0.88rem;
            border-radius: 9px;
            font-size: 0.82rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.38rem;
        }
        .osd-btn-ghost:hover { border-color: rgba(203, 213, 225, 0.45); color: #ffffff; }
        .osd-quiz-opt {
            width: 100%;
            text-align: left;
            background: #101419;
            border: 1.5px solid rgba(203, 213, 225, 0.18);
            color: #f1f5f9;
            padding: 0.82rem 1rem;
            border-radius: 11px;
            font-size: 0.94rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .osd-quiz-opt:hover:not(:disabled) { border-color: #4c9ba6; background: #1a212b; }
        .osd-quiz-opt.correct { border-color: #22c55e; background: rgba(34, 197, 94, 0.18); }
        .osd-quiz-opt.wrong { border-color: #ef4444; background: rgba(239, 68, 68, 0.18); }
        .osd-subtrack-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-bottom: 1.1rem;
        }
        .osd-dropzone {
            min-height: 64px;
            background: #101419;
            border: 1.5px dashed rgba(76, 155, 166, 0.55);
            border-radius: 12px;
            padding: 0.72rem 0.85rem;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.45rem;
            margin-bottom: 0.9rem;
        }
        .osd-dropzone.correct { border-style: solid; border-color: #22c55e; background: rgba(34, 197, 94, 0.1); }
        .osd-dropzone.wrong { border-style: solid; border-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .osd-fixed-anchor {
            font-size: 0.94rem;
            font-weight: 700;
            color: #cbd5e1;
            padding: 0.34rem 0.58rem;
            background: rgba(148, 163, 184, 0.1);
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 8px;
        }
        .osd-placed-brick, .osd-pool-brick {
            padding: 0.46rem 0.86rem;
            border-radius: 9px;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
            color: #f8fafc;
        }
        .osd-placed-brick {
            background: #2b6e78;
            border: 1.5px solid #4c9ba6;
        }
        .osd-pool-brick {
            background: #1a212b;
            border: 1.5px solid rgba(203, 213, 225, 0.24);
        }
        .osd-pool-brick:hover:not(:disabled), .osd-placed-brick:hover { filter: brightness(1.14); transform: translateY(-1px); }
        .osd-pool-brick:disabled { opacity: 0.28; cursor: not-allowed; transform: none; }

        /* Farvekodede manipulations-brikker (deler Ordstilling-systemet) */
        .osd-c-green {
            background: rgba(34, 197, 94, 0.18) !important;
            border-color: rgba(34, 197, 94, 0.68) !important;
            color: #dcfce7 !important;
        }
        .osd-c-red {
            background: rgba(239, 68, 68, 0.2) !important;
            border-color: rgba(239, 68, 68, 0.72) !important;
            color: #fee2e2 !important;
        }
        .osd-c-orange {
            background: rgba(249, 115, 22, 0.2) !important;
            border-color: rgba(249, 115, 22, 0.7) !important;
            color: #ffedd5 !important;
        }
        .osd-c-blue {
            background: rgba(2, 132, 199, 0.22) !important;
            border-color: rgba(56, 189, 248, 0.7) !important;
            color: #e0f2fe !important;
        }
        .osd-c-purple {
            background: rgba(139, 92, 246, 0.2) !important;
            border-color: rgba(167, 139, 250, 0.7) !important;
            color: #f3e8ff !important;
        }
        @media (max-width: 640px) {
            .osd-view { padding: 0.55rem 0.65rem 3.5rem; }
            .osd-card { padding: 0.95rem 0.85rem; }
            .osd-tab { flex: 1 1 auto; justify-content: center; font-size: 0.8rem; padding: 0.5rem 0.65rem; }
            .osd-block { flex: 1 1 100%; }
            .osd-chip, .osd-pool-brick, .osd-placed-brick { white-space: normal; text-align: left; }
        }
    `;
    document.head.appendChild(style);
}

export function renderOrdstillingSaetningsdeleView(container, navigateFn, extraData = {}) {
    injectSaetningsdeleStyles();
    ensureOrdstillingColorStyles();
    container.innerHTML = '';

    const VALID_TABS = new Set(['zoom_in', 'inside', 'zoom_out', 'workshop']);
    const VALID_ZOOM_TRACKS = new Set(Object.keys(ZOOM_TRACKS));
    const VALID_SCENES = new Set(HYPOTAXIS_SCENES.map(s => s.id));
    const VALID_WORKSHOP_TRACKS = new Set(['zoom_in_build', 'zoom_out_build', 'quick_quiz']);

    let colorCodesEnabled = getColorCodesEnabled();
    let activeTab = 'zoom_in';
    let activeTrackId = 'hvem';
    let zoomIdx = 0;

    // Fane 2 interactive toggles
    let nomBefore = true;
    let nomAfter = true;
    let nomRel = false;
    let verbSplit = true;

    // Fane 3 interactive state
    let activeSceneId = 'fordi';
    let bgFirst = false;
    let showIkke = false;

    // Fane 4 workshop state (3 tracks: zoom_in_build, zoom_out_build, quick_quiz)
    let workshopTrack = 'zoom_in_build';

    // Parse initial URL subPath (e.g. "zoom_in/hvor", "inside", "zoom_out/selvom", "workshop/quick_quiz")
    const rawSubPath = String(extraData?.subPath || '').trim().toLowerCase();
    if (rawSubPath) {
        const parts = rawSubPath.split('/').filter(Boolean);
        const seg1 = parts[0];
        const seg2 = parts[1];
        if (VALID_TABS.has(seg1)) {
            activeTab = seg1;
            if (activeTab === 'zoom_in' && seg2 && VALID_ZOOM_TRACKS.has(seg2)) {
                activeTrackId = seg2;
            } else if (activeTab === 'zoom_out' && seg2 && VALID_SCENES.has(seg2)) {
                activeSceneId = seg2;
            } else if (activeTab === 'workshop' && seg2 && VALID_WORKSHOP_TRACKS.has(seg2)) {
                workshopTrack = seg2;
            }
        }
    }

    function getCurrentSubPath() {
        if (activeTab === 'zoom_in') return `zoom_in/${activeTrackId}`;
        if (activeTab === 'inside') return 'inside';
        if (activeTab === 'zoom_out') return `zoom_out/${activeSceneId}`;
        return `workshop/${workshopTrack}`;
    }

    function syncUrl(push = true) {
        const lang = getLang() || 'da';
        const targetHash = `#/${lang}/ordstilling_saetningsdele/${getCurrentSubPath()}`;
        if (window.location.hash !== targetHash) {
            if (push) {
                history.pushState(null, '', targetHash);
            } else {
                history.replaceState(null, '', targetHash);
            }
        }
    }

    // Ensure address bar reflects canonical sub-page URL on initial load
    syncUrl(false);
    let buildState = {
        zoom_in_build: { idx: 0, score: 0, placed: [], status: null },
        zoom_out_build: { idx: 0, score: 0, placed: [], status: null }
    };
    let quizIdx = 0;
    let quizScore = 0;
    let quizAnswered = false;
    let quizPicked = null;

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container osd-view';

    function render() {
        viewContainer.innerHTML = '';

        // Top bar
        const topBar = document.createElement('div');
        topBar.className = 'top-bar';
        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn';
        backBtn.textContent = '← ' + (getTranslation('back') || 'Tilbage');
        backBtn.onclick = () => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            navigateFn('ordstilling');
        };
        topBar.appendChild(backBtn);

        const toWriteBtn = document.createElement('button');
        toWriteBtn.type = 'button';
        toWriteBtn.className = 'osd-btn-ghost';
        toWriteBtn.textContent = 'Prøv selv i Skrivehjælp →';
        toWriteBtn.onclick = () => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            navigateFn('skrive_hjaelp');
        };
        topBar.appendChild(toWriteBtn);
        viewContainer.appendChild(topBar);

        // Header
        const header = document.createElement('div');
        header.className = 'osd-header';
        header.innerHTML = `
            <div class="osd-badge">${SVG_CAMERA}<span>Ordstilling · Sætningsdele (Kamera: Zoom ind &amp; Zoom ud)</span></div>
            <h1>Sætningsdele: Fra enkeltord til rige sætninger</h1>
            <p>
                <strong>Zoom ind</strong> på én farvet brik for at få flere detaljer i samme sætningsdel — og <strong>zoom ud</strong> for at se hele billedet med <strong>forgrund</strong> (hoved-del) og <strong>baggrund</strong> (årsag, tid, modstand).
            </p>
        `;
        viewContainer.appendChild(header);

        // Fælles 1-linjes farvekode-bjælke fra ordstillingColorCodes.js
        const lang = getLang() || 'da';
        const legendWrap = document.createElement('div');
        legendWrap.innerHTML = renderColorLegendHtml(colorCodesEnabled, {
            noun: swT('col_noun', lang),
            verb: swT('col_verb', lang),
            adj: swT('col_adj', lang),
            sted: swT('col_sted', lang),
            tid: swT('col_tid', lang),
            toggleOn: swT('col_toggle_on', lang),
            toggleOff: swT('col_toggle_off', lang)
        });
        const colToggle = legendWrap.querySelector('[data-toggle-color-codes]');
        if (colToggle) {
            colToggle.onclick = () => {
                colorCodesEnabled = !colorCodesEnabled;
                setColorCodesEnabled(colorCodesEnabled);
                render();
            };
        }
        viewContainer.appendChild(legendWrap);

        // Tabs
        const tabs = document.createElement('div');
        tabs.className = 'osd-tabs';
        const tabDefs = [
            { id: 'zoom_in', icon: SVG_ZOOM_IN, label: '1. Zoom ind (Udvid brikken)' },
            { id: 'inside', icon: SVG_LAYERS, label: '2. Inde i brikken' },
            { id: 'zoom_out', icon: SVG_ZOOM_OUT, label: '3. Zoom ud (Forgrund & baggrund)' },
            { id: 'workshop', icon: SVG_CHECK, label: '4. Zoom-værkstedet (20 opgaver)' }
        ];
        tabs.innerHTML = tabDefs.map(t => `
            <button type="button" class="osd-tab ${activeTab === t.id ? 'active' : ''}" data-tab="${t.id}">
                ${t.icon}<span>${t.label}</span>
            </button>
        `).join('');
        tabs.querySelectorAll('[data-tab]').forEach(btn => {
            btn.onclick = () => {
                activeTab = btn.dataset.tab;
                syncUrl(true);
                render();
            };
        });
        viewContainer.appendChild(tabs);

        if (activeTab === 'zoom_in') renderZoomInTab();
        else if (activeTab === 'inside') renderInsideTab();
        else if (activeTab === 'zoom_out') renderZoomOutTab();
        else renderWorkshopTab();
    }

    // ========================================================================
    // FANE 1: ZOOM IND (DET KENDTE CYKELBILLEDE MED RIGTIG KAMERA-ZOOM)
    // ========================================================================
    function renderZoomInTab() {
        const track = ZOOM_TRACKS[activeTrackId];
        const safeIdx = Math.min(zoomIdx, track.levels.length - 1);
        const lv = track.levels[safeIdx];
        const fullSentence = lv.parts.map(p => p.text).join(' ') + '.';

        const card = document.createElement('div');
        card.className = 'osd-card';
        card.innerHTML = `
            <div class="osd-card-head">
                <h2 class="osd-card-title">${SVG_ZOOM_IN}<span>Zoom ind på ét spørgsmål — handlingen bliver på Plads 2</span></h2>
                <div class="osd-chip-row">
                    ${Object.values(ZOOM_TRACKS).map(tr => `
                        <button type="button" class="osd-chip ${tr.id === activeTrackId ? 'active' : ''}" data-track="${tr.id}">
                            <span style="width:9px; height:9px; border-radius:999px; background:${tr.color}; display:inline-block;"></span>
                            <span>${tr.label}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="osd-camera-frame">
                <img class="osd-camera-img" src="${baseUrl}assets/foto_metafor_clean.jpg" alt="Kvinde cykler på gaden i snevejr"
                     style="transform: scale(${lv.scale}); transform-origin: ${lv.origin};" />
                <div class="osd-viewfinder-badge">${SVG_CAMERA}<span>Kamera-zoom: ${lv.zoom}</span></div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.75rem;">
                <div class="osd-chip-row">
                    <span style="font-size:0.8rem; font-weight:700; color:#94a3b8;">Vælg zoom-trin:</span>
                    ${track.levels.map((l, idx) => `
                        <button type="button" class="osd-chip ${idx === safeIdx ? 'light-active' : ''}" data-zoom-idx="${idx}">
                            ${l.zoom} (${l.chunk.split(/\s+/).length} ord)
                        </button>
                    `).join('')}
                </div>
                <button type="button" class="osd-btn-primary" id="osd-listen-zoom">${SVG_SPEAK}<span>Lyt til sætningen</span></button>
            </div>

            <div class="osd-sentence-blocks">
                ${lv.parts.map(p => `
                    <div class="osd-block ${colorCodesEnabled ? p.color : ''} ${p.active ? 'zoomed' : ''}">
                        <span class="osd-block-lbl">${p.label}</span>
                        <span class="osd-block-txt">${p.text}</span>
                    </div>
                `).join('')}
            </div>

            <div class="osd-note-box">
                <strong>Kamera-indsigt:</strong> ${lv.note}
            </div>
        `;

        card.querySelectorAll('[data-track]').forEach(btn => {
            btn.onclick = () => {
                activeTrackId = btn.dataset.track;
                zoomIdx = 0;
                syncUrl(true);
                render();
            };
        });
        card.querySelectorAll('[data-zoom-idx]').forEach(btn => {
            btn.onclick = () => {
                zoomIdx = parseInt(btn.dataset.zoomIdx, 10);
                render();
            };
        });
        card.querySelector('#osd-listen-zoom').onclick = () => speakDanish(fullSentence);
        viewContainer.appendChild(card);
    }

    // ========================================================================
    // FANE 2: INDE I BRIKKEN (DE 3 BYGGEMØNSTRE UDEN TUNGE FAGORD)
    // ========================================================================
    function renderInsideTab() {
        const nomParts = [];
        if (nomBefore) nomParts.push('<span style="color:#fb923c;">Den smilende</span>');
        else nomParts.push('<span style="color:#4ade80;">En</span>');
        nomParts.push('<strong style="color:#4ade80;">kvinde</strong>');
        if (nomAfter) nomParts.push('<span style="color:#60a5fa;">med den orange hue</span>');
        if (nomRel) nomParts.push('<span style="color:#c084fc;">, som cykler på gaden,</span>');
        const nomPlain = `${nomBefore ? 'Den smilende' : 'En'} kvinde${nomAfter ? ' med den orange hue' : ''}${nomRel ? ', som cykler på gaden,' : ''} køber frisk kaffe.`;

        const card = document.createElement('div');
        card.className = 'osd-card';
        card.innerHTML = `
            <div class="osd-card-head">
                <h2 class="osd-card-title">${SVG_LAYERS}<span>Inde i de 3 vigtigste brikker</span></h2>
            </div>
            <p style="margin:0 0 1rem; font-size:0.9rem; color:#94a3b8; line-height:1.55;">
                Hver sætningsdel har sit eget enkle byggemønster indeni — men udefra fungerer den stadig som <strong>én samlet brik</strong> i sætningen.
            </p>

            <div class="osd-grid-3">
                <!-- 1. HVEM/HVAD-BRIKKEN -->
                <div class="osd-mini-card" style="border-top: 3px solid #22c55e;">
                    <h3>1. Hvem/Hvad-brikken</h3>
                    <p>En kerne (<strong>kvinde</strong>) kan få detaljer både <em>før</em> og <em>efter</em> sig. Slå lagene til og fra:</p>
                    <div class="osd-chip-row">
                        <button type="button" class="osd-chip ${nomBefore ? 'active' : ''}" id="tog-nom-before">+ Før-detalje</button>
                        <button type="button" class="osd-chip ${nomAfter ? 'active' : ''}" id="tog-nom-after">+ Efter-detalje</button>
                        <button type="button" class="osd-chip ${nomRel ? 'active' : ''}" id="tog-nom-rel">+ som-del</button>
                    </div>
                    <div style="background:#151a21; border:1px solid rgba(34,197,94,0.4); border-radius:10px; padding:0.75rem 0.85rem; font-size:0.95rem; line-height:1.55;">
                        ${nomParts.join(' ')} <span class="osd-v2-pill">køber</span> frisk kaffe.
                    </div>
                    <button type="button" class="osd-btn-ghost" id="btn-speak-nom" style="align-self:flex-start;">${SVG_SPEAK}<span>Lyt</span></button>
                </div>

                <!-- 2. HANDLINGS-BRIKKEN -->
                <div class="osd-mini-card" style="border-top: 3px solid #ef4444;">
                    <h3>2. Handlings-brikken (1 eller 2 udsagnsord)</h3>
                    <p>Med to udsagnsord (fx <em>vil + cykle</em> eller <em>har + cyklet</em>) åbner brikken sig som en ramme omkring personen:</p>
                    <div class="osd-chip-row">
                        <button type="button" class="osd-chip ${!verbSplit ? 'active' : ''}" id="tog-verb-1">1 ord</button>
                        <button type="button" class="osd-chip ${verbSplit ? 'active' : ''}" id="tog-verb-2">2 ord (ramme)</button>
                    </div>
                    <div style="background:#151a21; border:1px solid rgba(239,68,68,0.45); border-radius:10px; padding:0.75rem 0.85rem; font-size:0.95rem; line-height:1.55;">
                        ${verbSplit
                            ? `Om morgenen <span class="osd-v2-pill">vil</span> hun gerne <span class="osd-v2-pill">cykle</span> gennem byen.`
                            : `Om morgenen <span class="osd-v2-pill">cykler</span> hun gennem byen.`
                        }
                    </div>
                    <p style="font-size:0.8rem; color:#cbd5e1;">Det første handlingsord står altid fast på Plads 2 — det andet lukker rammen længere henne i sætningen.</p>
                </div>

                <!-- 3. RAMME-BRIKKEN (3 STØRRELSER) -->
                <div class="osd-mini-card" style="border-top: 3px solid #8b5cf6;">
                    <h3>3. Ramme-brikken (3 størrelser)</h3>
                    <p>Det samme spørgsmål — fx <strong>Hvorfor?</strong> eller <strong>Hvornår?</strong> — kan besvares i tre størrelser:</p>
                    <div style="display:flex; flex-direction:column; gap:0.45rem; font-size:0.86rem;">
                        <div style="background:#151a21; border-left:3px solid #8b5cf6; padding:0.5rem 0.7rem; border-radius:8px;">
                            <div style="font-size:0.7rem; color:#c084fc; font-weight:800;">1 ORD</div>
                            <strong>Derfor</strong> <span style="color:#f87171; font-weight:800;">tager</span> hun huen på.
                        </div>
                        <div style="background:#151a21; border-left:3px solid #38bdf8; padding:0.5rem 0.7rem; border-radius:8px;">
                            <div style="font-size:0.7rem; color:#60a5fa; font-weight:800;">LILLE GRUPPE AF ORD</div>
                            <strong>På grund af sneen</strong> <span style="color:#f87171; font-weight:800;">tager</span> hun huen på.
                        </div>
                        <div style="background:#151a21; border-left:3px solid #fb923c; padding:0.5rem 0.7rem; border-radius:8px;">
                            <div style="font-size:0.7rem; color:#fb923c; font-weight:800;">HEL BAGGRUNDS-DEL</div>
                            <strong>Fordi det sner kraftigt,</strong> <span style="color:#f87171; font-weight:800;">tager</span> hun huen på.
                        </div>
                    </div>
                </div>
            </div>
        `;

        card.querySelector('#tog-nom-before').onclick = () => { nomBefore = !nomBefore; render(); };
        card.querySelector('#tog-nom-after').onclick = () => { nomAfter = !nomAfter; render(); };
        card.querySelector('#tog-nom-rel').onclick = () => { nomRel = !nomRel; render(); };
        card.querySelector('#btn-speak-nom').onclick = () => speakDanish(nomPlain);
        card.querySelector('#tog-verb-1').onclick = () => { verbSplit = false; render(); };
        card.querySelector('#tog-verb-2').onclick = () => { verbSplit = true; render(); };
        viewContainer.appendChild(card);
    }

    // ========================================================================
    // FANE 3: ZOOM UD — FORGRUND & BAGGRUND (DEN CYKLENDE KVINDE I OMGIVELSERNE)
    // ========================================================================
    function renderZoomOutTab() {
        const sc = ZOOM_OUT_SCENES.find(x => x.id === activeSceneId) || ZOOM_OUT_SCENES[0];
        const spokenText = bgFirst ? sc.bgFirst.full : sc.fgFirst.full;

        const card = document.createElement('div');
        card.className = 'osd-card';
        card.innerHTML = `
            <div class="osd-card-head">
                <h2 class="osd-card-title">${SVG_ZOOM_OUT}<span>Zoom ud: Skarp forgrund + baggrund omkring hende</span></h2>
                <div class="osd-chip-row">
                    ${ZOOM_OUT_SCENES.map(item => `
                        <button type="button" class="osd-chip ${item.id === activeSceneId ? 'active' : ''}" data-scene="${item.id}">
                            ${item.question} (${item.conj})
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="osd-camera-frame">
                <img class="osd-camera-img" src="${baseUrl}assets/saetningsdele_zoom_ud.jpg" alt="Kvinden cykler i et bredt vintergadebillede med café, grøn bus og snevejr omkring hende" />
                <div class="osd-viewfinder-badge">${SVG_CAMERA}<span>Kamera zoomet ud · Kvinden + omgivelserne</span></div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.6rem;">
                <div class="osd-chip-row">
                    <button type="button" class="osd-chip ${bgFirst ? 'light-active' : ''}" id="osd-toggle-bg-first">
                        ${SVG_SWAP}<span>${bgFirst ? 'Baggrund står forrest (Plads 1 · Plads 2!)' : 'Flyt baggrunden til Plads 1'}</span>
                    </button>
                    <button type="button" class="osd-chip ${showIkke ? 'active' : ''}" id="osd-toggle-ikke">
                        <span>${showIkke ? 'Skjul "ikke"-reglen' : 'Vis "ikke"-reglen i baggrunden'}</span>
                    </button>
                </div>
                <button type="button" class="osd-btn-primary" id="osd-listen-hyp">${SVG_SPEAK}<span>Lyt</span></button>
            </div>

            <div class="osd-clause-bar">
                ${!bgFirst ? `
                    <div class="osd-clause-fg">
                        <div class="osd-block-lbl" style="color:#4ade80; margin-bottom:0.25rem;">${sc.fgLabel}</div>
                        <div class="osd-block-txt">${sc.fgFirst.fg}</div>
                    </div>
                    <div class="osd-clause-bg">
                        <div class="osd-block-lbl" style="color:#c084fc; margin-bottom:0.25rem;">${sc.bgLabel}</div>
                        <div class="osd-block-txt">${sc.fgFirst.bg}</div>
                    </div>
                ` : `
                    <div class="osd-clause-bg">
                        <div class="osd-block-lbl" style="color:#c084fc; margin-bottom:0.25rem;">Plads 1 · ${sc.bgLabel}</div>
                        <div class="osd-block-txt">${sc.bgFirst.bg}</div>
                    </div>
                    <div class="osd-clause-fg">
                        <div class="osd-block-lbl" style="color:#4ade80; margin-bottom:0.25rem;">Plads 2 · ${sc.fgLabel}</div>
                        <div class="osd-block-txt"><span class="osd-v2-pill">${sc.bgFirst.v2Verb}</span> ${sc.bgFirst.fgRest}</div>
                    </div>
                `}
            </div>

            ${showIkke ? `
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.75rem; margin-bottom:0.9rem;">
                    <div style="background:#101419; border:1px solid rgba(34,197,94,0.4); border-radius:11px; padding:0.75rem 0.9rem; font-size:0.88rem;">
                        <div style="font-size:0.72rem; font-weight:800; color:#4ade80; margin-bottom:0.25rem;">FORGRUND (HOVED-DEL): HANDLING + IKKE</div>
                        <div>${sc.ikkeDemo.main}</div>
                    </div>
                    <div style="background:#101419; border:1px dashed rgba(167,139,250,0.55); border-radius:11px; padding:0.75rem 0.9rem; font-size:0.88rem;">
                        <div style="font-size:0.72rem; font-weight:800; color:#c084fc; margin-bottom:0.25rem;">BAGGRUND: IKKE + HANDLING</div>
                        <div>${sc.ikkeDemo.sub}</div>
                    </div>
                </div>
            ` : ''}

            <div class="osd-note-box">
                <strong>Kamera-indsigt:</strong> ${sc.tip}
            </div>
            <div style="display:flex; justify-content:flex-end; margin-top:0.85rem;">
                <button type="button" class="osd-btn-ghost" id="osd-bridge-write-zout">Brug mønstret i Skrivehjælp →</button>
            </div>
        `;

        card.querySelectorAll('[data-scene]').forEach(btn => {
            btn.onclick = () => {
                activeSceneId = btn.dataset.scene;
                syncUrl(true);
                render();
            };
        });
        card.querySelector('#osd-toggle-bg-first').onclick = () => { bgFirst = !bgFirst; render(); };
        card.querySelector('#osd-toggle-ikke').onclick = () => { showIkke = !showIkke; render(); };
        card.querySelector('#osd-listen-hyp').onclick = () => speakDanish(spokenText);
        card.querySelector('#osd-bridge-write-zout').onclick = () => navigateFn('skrive_hjaelp');
        viewContainer.appendChild(card);
    }

    // ========================================================================
    // FANE 4: ZOOM-VÆRKSTEDET (20 FARVEKODEDE OPGAVER)
    // ========================================================================
    function renderWorkshopTab() {
        const trackBar = document.createElement('div');
        trackBar.className = 'osd-subtrack-bar';
        const tracks = [
            { id: 'zoom_in_build', icon: SVG_ZOOM_IN, label: `1. Zoom ind · Udvid én brik (${ZOOM_IN_TASKS.length})` },
            { id: 'zoom_out_build', icon: SVG_ZOOM_OUT, label: `2. Zoom ud · Flyt sætningsdele (${ZOOM_OUT_TASKS.length})` },
            { id: 'quick_quiz', icon: SVG_CHECK, label: `3. Hurtig-quiz (${WORKSHOP_QUIZ.length})` }
        ];
        trackBar.innerHTML = tracks.map(t => `
            <button type="button" class="osd-chip ${workshopTrack === t.id ? 'active' : ''}" data-wtrack="${t.id}">
                ${t.icon}<span>${t.label}</span>
            </button>
        `).join('');
        trackBar.querySelectorAll('[data-wtrack]').forEach(btn => {
            btn.onclick = () => {
                workshopTrack = btn.dataset.wtrack;
                syncUrl(true);
                render();
            };
        });
        viewContainer.appendChild(trackBar);

        if (workshopTrack === 'zoom_in_build' || workshopTrack === 'zoom_out_build') {
            renderBuilderTrack(workshopTrack);
            return;
        }

        // Spor 3: Hurtig-quiz (8 opgaver)
        const card = document.createElement('div');
        card.className = 'osd-card';

        if (quizIdx >= WORKSHOP_QUIZ.length) {
            card.style.textAlign = 'center';
            card.innerHTML = `
                <h2 style="margin:0.4rem 0 0.7rem; color:#f1f5f9;">Hurtig-quiz gennemført</h2>
                <p style="color:#94a3b8; font-size:1rem; margin-bottom:1.25rem;">
                    Du fik <strong style="color:#4ade80;">${quizScore} af ${WORKSHOP_QUIZ.length}</strong> rigtige.
                </p>
                <div style="display:flex; justify-content:center; gap:0.6rem; flex-wrap:wrap;">
                    <button type="button" class="osd-btn-ghost" id="osd-quiz-restart">Prøv igen</button>
                    <button type="button" class="osd-btn-primary" id="osd-quiz-to-write">Prøv selv i Skrivehjælp →</button>
                </div>
            `;
            card.querySelector('#osd-quiz-restart').onclick = () => {
                quizIdx = 0;
                quizScore = 0;
                quizAnswered = false;
                quizPicked = null;
                render();
            };
            card.querySelector('#osd-quiz-to-write').onclick = () => navigateFn('skrive_hjaelp');
            viewContainer.appendChild(card);
            return;
        }

        const q = WORKSHOP_QUIZ[quizIdx];
        card.innerHTML = `
            <div class="osd-card-head">
                <span class="osd-badge" style="margin:0;">${q.type}</span>
                <span style="font-size:0.82rem; font-weight:700; color:#94a3b8;">Opgave ${quizIdx + 1} af ${WORKSHOP_QUIZ.length} · Score: ${quizScore}</span>
            </div>
            <div style="background:#101419; border:1px solid rgba(203,213,225,0.14); border-radius:12px; padding:1rem 1.1rem; font-size:1rem; font-weight:700; color:#f8fafc; line-height:1.5; margin-bottom:0.9rem;">
                ${q.prompt}
            </div>
            <div style="display:flex; flex-direction:column; gap:0.6rem; margin-bottom:0.9rem;">
                ${q.options.map(opt => {
                    let cls = 'osd-quiz-opt';
                    if (quizAnswered) {
                        if (opt === q.correct) cls += ' correct';
                        else if (opt === quizPicked) cls += ' wrong';
                    }
                    return `<button type="button" class="${cls}" data-opt="${opt.replace(/"/g, '&quot;')}" ${quizAnswered ? 'disabled' : ''}>${opt}</button>`;
                }).join('')}
            </div>
            ${quizAnswered ? `
                <div class="osd-note-box" style="margin-bottom:0.9rem; border-left-color:${quizPicked === q.correct ? '#22c55e' : '#f97316'};">
                    <strong>${quizPicked === q.correct ? 'Rigtigt!' : 'Se strukturen:'}</strong> ${q.expl}
                </div>
                <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                    <button type="button" class="osd-btn-ghost" id="osd-quiz-listen">${SVG_SPEAK}<span>Lyt til rigtigt svar</span></button>
                    <button type="button" class="osd-btn-primary" id="osd-quiz-next">Næste opgave →</button>
                </div>
            ` : ''}
        `;

        card.querySelectorAll('[data-opt]').forEach(btn => {
            btn.onclick = () => {
                if (quizAnswered) return;
                quizPicked = btn.dataset.opt;
                quizAnswered = true;
                if (quizPicked === q.correct) quizScore++;
                render();
            };
        });
        const listenBtn = card.querySelector('#osd-quiz-listen');
        if (listenBtn) listenBtn.onclick = () => speakDanish(q.correct);
        const nextBtn = card.querySelector('#osd-quiz-next');
        if (nextBtn) {
            nextBtn.onclick = () => {
                quizIdx++;
                quizAnswered = false;
                quizPicked = null;
                render();
            };
        }

        viewContainer.appendChild(card);
    }

    function renderBuilderTrack(trackKey) {
        const tasks = trackKey === 'zoom_in_build' ? ZOOM_IN_TASKS : ZOOM_OUT_TASKS;
        const st = buildState[trackKey];
        const card = document.createElement('div');
        card.className = 'osd-card';

        if (st.idx >= tasks.length) {
            const isZoomIn = trackKey === 'zoom_in_build';
            card.style.textAlign = 'center';
            card.innerHTML = `
                <h2 style="margin:0.4rem 0 0.7rem; color:#f1f5f9;">${isZoomIn ? 'Zoom ind-værksted gennemført' : 'Zoom ud-værksted gennemført'}</h2>
                <p style="color:#94a3b8; font-size:1rem; margin-bottom:1.25rem;">
                    Du løste <strong style="color:#4ade80;">${st.score} af ${tasks.length}</strong> opgaver rigtigt i første forsøg.
                </p>
                <div style="display:flex; justify-content:center; gap:0.6rem; flex-wrap:wrap;">
                    <button type="button" class="osd-btn-ghost" id="osd-build-restart">Øv dette spor igen</button>
                    <button type="button" class="osd-btn-primary" id="osd-build-next-track">
                        ${isZoomIn ? 'Videre til 2. Zoom ud →' : 'Videre til 3. Hurtig-quiz →'}
                    </button>
                </div>
            `;
            card.querySelector('#osd-build-restart').onclick = () => {
                buildState[trackKey] = { idx: 0, score: 0, placed: [], status: null };
                render();
            };
            card.querySelector('#osd-build-next-track').onclick = () => {
                workshopTrack = isZoomIn ? 'zoom_out_build' : 'quick_quiz';
                render();
            };
            viewContainer.appendChild(card);
            return;
        }

        const task = tasks[st.idx];
        const placedIndices = st.placed;
        const placedTexts = placedIndices.map(i => task.pool[i].text);

        card.innerHTML = `
            <div class="osd-card-head">
                <span class="osd-badge" style="margin:0;">${task.tag}</span>
                <span style="font-size:0.82rem; font-weight:700; color:#94a3b8;">Opgave ${st.idx + 1} af ${tasks.length} · Første-forsøg score: ${st.score}</span>
            </div>

            <div style="font-size:0.96rem; font-weight:700; color:#f1f5f9; margin-bottom:0.8rem; line-height:1.5;">
                ${task.instruction}
                ${task.decoyNote ? `<span style="display:inline-block; margin-left:0.4rem; font-size:0.8rem; color:#fb923c;">(${task.decoyNote})</span>` : ''}
            </div>

            <div style="font-size:0.74rem; font-weight:800; text-transform:uppercase; letter-spacing:0.04em; color:#7ec4ce; margin-bottom:0.35rem;">
                Byg her · ${task.targetLabel} (klik på en placeret brik for at fjerne den)
            </div>
            <div class="osd-dropzone ${st.status === 'correct' ? 'correct' : st.status === 'wrong' ? 'wrong' : ''}" id="osd-dropzone">
                ${task.fixedBefore ? `<span class="osd-fixed-anchor ${brickColorClass(task.fixedBefore.color, colorCodesEnabled)}">${task.fixedBefore.text}</span>` : ''}
                ${placedIndices.length === 0
                    ? `<span style="color:#64748b; font-size:0.86rem; font-style:italic;">Klik på de farvede brikker nedenfor i den rigtige rækkefølge...</span>`
                    : placedIndices.map((poolIdx, pos) => {
                        const item = task.pool[poolIdx];
                        return `<button type="button" class="osd-placed-brick ${brickColorClass(item.color, colorCodesEnabled)}" data-remove-pos="${pos}">${item.text}</button>`;
                    }).join('')
                }
                ${task.fixedAfter ? `<span class="osd-fixed-anchor ${brickColorClass(task.fixedAfter.color, colorCodesEnabled)}">${task.fixedAfter.text}</span>` : ''}
            </div>

            <div class="osd-chip-row" style="margin-bottom:1rem;">
                ${task.pool.map((item, poolIdx) => `
                    <button type="button" class="osd-pool-brick ${brickColorClass(item.color, colorCodesEnabled)}" data-pool-idx="${poolIdx}" ${placedIndices.includes(poolIdx) || st.status === 'correct' ? 'disabled' : ''}>
                        ${item.text}
                    </button>
                `).join('')}
            </div>

            <div style="display:flex; gap:0.55rem; flex-wrap:wrap; margin-bottom:0.9rem;">
                ${st.status !== 'correct' ? `
                    <button type="button" class="osd-btn-primary" id="osd-check-build" ${placedIndices.length === 0 ? 'disabled' : ''}>
                        ${SVG_CHECK}<span>Tjek svar</span>
                    </button>
                    <button type="button" class="osd-btn-ghost" id="osd-clear-build" ${placedIndices.length === 0 ? 'disabled' : ''}>Ryd</button>
                ` : `
                    <button type="button" class="osd-btn-ghost" id="osd-listen-build">${SVG_SPEAK}<span>Lyt til sætningen</span></button>
                    <button type="button" class="osd-btn-primary" id="osd-next-build">Næste opgave →</button>
                `}
            </div>

            ${st.status === 'correct' ? `
                <div class="osd-note-box" style="border-left-color:#22c55e;">
                    <strong style="color:#4ade80;">Flot bygget!</strong> ${task.expl}
                </div>
            ` : st.status === 'wrong' ? `
                <div class="osd-note-box" style="border-left-color:#ef4444;">
                    <strong style="color:#f87171;">Ikke helt endnu.</strong> Klik på en placeret brik for at fjerne den, og tjek farverne — husk at det røde handlingsord står på Plads 2!
                </div>
            ` : ''}
        `;

        card.querySelectorAll('[data-pool-idx]').forEach(btn => {
            btn.onclick = () => {
                if (st.status === 'correct') return;
                const pIdx = parseInt(btn.dataset.poolIdx, 10);
                if (!st.placed.includes(pIdx)) {
                    st.placed.push(pIdx);
                    if (st.status === 'wrong') st.status = null;
                    render();
                }
            };
        });
        card.querySelectorAll('[data-remove-pos]').forEach(btn => {
            btn.onclick = () => {
                if (st.status === 'correct') return;
                const pos = parseInt(btn.dataset.removePos, 10);
                st.placed.splice(pos, 1);
                st.status = null;
                render();
            };
        });

        const checkBtn = card.querySelector('#osd-check-build');
        if (checkBtn) {
            checkBtn.onclick = () => {
                const isRight = placedTexts.length === task.correctSeq.length
                    && placedTexts.every((t, i) => t === task.correctSeq[i]);
                if (isRight) {
                    if (st.status === null) st.score++;
                    st.status = 'correct';
                } else {
                    st.status = 'wrong';
                }
                render();
            };
        }
        const clearBtn = card.querySelector('#osd-clear-build');
        if (clearBtn) {
            clearBtn.onclick = () => {
                st.placed = [];
                st.status = null;
                render();
            };
        }
        const listenBtn = card.querySelector('#osd-listen-build');
        if (listenBtn) listenBtn.onclick = () => speakDanish(task.fullSentence);
        const nextBtn = card.querySelector('#osd-next-build');
        if (nextBtn) {
            nextBtn.onclick = () => {
                st.idx++;
                st.placed = [];
                st.status = null;
                render();
            };
        }

        viewContainer.appendChild(card);
    }

    render();
    container.appendChild(viewContainer);
}
