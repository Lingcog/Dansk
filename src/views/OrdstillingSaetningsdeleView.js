import { baseUrl } from '../utils/config.js';
import { getTranslation } from '../utils/i18n.js';

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
        bg: 'rgba(34, 197, 94, 0.14)',
        border: 'rgba(34, 197, 94, 0.5)',
        levels: [
            {
                zoom: '1×',
                scale: 1,
                origin: '50% 45%',
                chunk: 'En kvinde',
                parts: [
                    { role: 'hvem', label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green', active: true },
                    { role: 'verb', label: 'Plads 2 (Verbum)', text: 'cykler', color: 'red' },
                    { role: 'hvor', label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { role: 'hvornaar', label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Grundbilledet fra Ordstilling: 1 enkel brik på Plads 1 (2 ord) — og verbet "cykler" står på Plads 2.'
            },
            {
                zoom: '2×',
                scale: 1.45,
                origin: '49% 38%',
                chunk: 'En smilende kvinde',
                parts: [
                    { role: 'hvem', label: 'Plads 1 (Hvem?)', text: 'En smilende kvinde', color: 'green', active: true },
                    { role: 'verb', label: 'Plads 2 (Verbum)', text: 'cykler', color: 'red' },
                    { role: 'hvor', label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { role: 'hvornaar', label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Kameraet zoomer ind: Vi ser et tillægsord foran kernen ("smilende"). Hele den grønne brik er stadig kun Plads 1!'
            },
            {
                zoom: '3×',
                scale: 1.85,
                origin: '50% 40%',
                chunk: 'En smilende kvinde med orange hue og blå jakke',
                parts: [
                    { role: 'hvem', label: 'Plads 1 (Hvem?)', text: 'En smilende kvinde med orange hue og blå jakke', color: 'green', active: true },
                    { role: 'verb', label: 'Plads 2 (Verbum)', text: 'cykler', color: 'red' },
                    { role: 'hvor', label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { role: 'hvornaar', label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Endnu flere detaljer efter kernen ("med orange hue og blå jakke"). Nu er Plads 1 på 9 ord — men verbet "cykler" står stadig urokkeligt på Plads 2!'
            },
            {
                zoom: '4×',
                scale: 2.05,
                origin: '53% 46%',
                chunk: 'En smilende kvinde, som har en papirpose i kurven,',
                parts: [
                    { role: 'hvem', label: 'Plads 1 (Hvem? + som-sætning)', text: 'En smilende kvinde, som har en papirpose i kurven,', color: 'green', active: true },
                    { role: 'verb', label: 'Plads 2 (Verbum)', text: 'cykler', color: 'red' },
                    { role: 'hvor', label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { role: 'hvornaar', label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Maksimal zoom: En hel "som"-ledsætning bor inde i den grønne brik! Alt sammen tæller stadig som Plads 1, og verbet "cykler" kommer lige efter kommaet.'
            }
        ]
    },
    hvor: {
        id: 'hvor',
        label: 'Hvor? (Blå · Sted)',
        color: '#0284c7',
        bg: 'rgba(2, 132, 199, 0.14)',
        border: 'rgba(56, 189, 248, 0.5)',
        levels: [
            {
                zoom: '1×',
                scale: 1,
                origin: '50% 60%',
                chunk: 'på gaden',
                parts: [
                    { role: 'hvem', label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { role: 'verb', label: 'Plads 2 (Verbum)', text: 'cykler', color: 'red' },
                    { role: 'hvor', label: 'Hvor?', text: 'på gaden', color: 'blue', active: true },
                    { role: 'hvornaar', label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Stedet er i grundformen bare 2 ord: "på gaden".'
            },
            {
                zoom: '2×',
                scale: 1.5,
                origin: '40% 78%',
                chunk: 'på den sneklædte cykelsti',
                parts: [
                    { role: 'hvem', label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { role: 'verb', label: 'Plads 2 (Verbum)', text: 'cykler', color: 'red' },
                    { role: 'hvor', label: 'Hvor?', text: 'på den sneklædte cykelsti', color: 'blue', active: true },
                    { role: 'hvornaar', label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Vi zoomer ind på stedet: Præpositionen "på" rummer nu en hel beskrevet ting ("den sneklædte cykelsti").'
            },
            {
                zoom: '3×',
                scale: 1.85,
                origin: '18% 54%',
                chunk: 'på cykelstien foran den lille café og den grønne bus',
                parts: [
                    { role: 'hvem', label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { role: 'verb', label: 'Plads 2 (Verbum)', text: 'cykler', color: 'red' },
                    { role: 'hvor', label: 'Hvor?', text: 'på cykelstien foran den lille café og den grønne bus', color: 'blue', active: true },
                    { role: 'hvornaar', label: 'Hvornår?', text: 'om morgenen', color: 'purple' }
                ],
                note: 'Hele den blå brik besvarer stadig ét eneste spørgsmål — "Hvor?" — selvom den nu maler et helt gadebillede.'
            }
        ]
    },
    hvornaar: {
        id: 'hvornaar',
        label: 'Hvornår? (Lilla · Tid)',
        color: '#8b5cf6',
        bg: 'rgba(139, 92, 246, 0.14)',
        border: 'rgba(167, 139, 250, 0.5)',
        levels: [
            {
                zoom: '1×',
                scale: 1,
                origin: '50% 35%',
                chunk: 'om morgenen',
                parts: [
                    { role: 'hvem', label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { role: 'verb', label: 'Plads 2 (Verbum)', text: 'cykler', color: 'red' },
                    { role: 'hvor', label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { role: 'hvornaar', label: 'Hvornår?', text: 'om morgenen', color: 'purple', active: true }
                ],
                note: 'Et enkelt tidsudtryk: "om morgenen".'
            },
            {
                zoom: '2×',
                scale: 1.4,
                origin: '50% 25%',
                chunk: 'en kold vintermorgen i snevejr',
                parts: [
                    { role: 'hvem', label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { role: 'verb', label: 'Plads 2 (Verbum)', text: 'cykler', color: 'red' },
                    { role: 'hvor', label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { role: 'hvornaar', label: 'Hvornår?', text: 'en kold vintermorgen i snevejr', color: 'purple', active: true }
                ],
                note: 'Tidsbrikken vokser med flere detaljer — og hvis du flytter hele den lilla brik til Plads 1, kommer "cykler" lige efter!'
            },
            {
                zoom: '3×',
                scale: 1.55,
                origin: '25% 48%',
                chunk: 'mens det sner stille, og bussen kører forbi',
                parts: [
                    { role: 'hvem', label: 'Plads 1 (Hvem?)', text: 'En kvinde', color: 'green' },
                    { role: 'verb', label: 'Plads 2 (Verbum)', text: 'cykler', color: 'red' },
                    { role: 'hvor', label: 'Hvor?', text: 'på gaden', color: 'blue' },
                    { role: 'hvornaar', label: 'Hvornår? (Ledsætning)', text: 'mens det sner stille, og bussen kører forbi', color: 'purple', active: true }
                ],
                note: 'Her bliver tidsbrikken til en hel ledsætning! Det leder direkte videre til Fane 3 (Zoom ud: Forgrund og baggrund).'
            }
        ]
    }
};

// ============================================================================
// DATA: FANE 3 (ZOOM UD — FORGRUND & BAGGRUND / HYPOTAKSE)
// ============================================================================
const HYPOTAKSE_SCENES = [
    {
        id: 'fordi',
        question: 'Hvorfor?',
        conj: 'fordi',
        fgLabel: 'Forgrund (Hovedsætning)',
        bgLabel: 'Baggrund · Årsag (Ledsætning)',
        fgFirst: {
            fg: 'Han tager sin gule regnjakke på',
            bg: ', fordi det regner i dag.',
            full: 'Han tager sin gule regnjakke på, fordi det regner i dag.'
        },
        bgFirst: {
            bg: 'Fordi det regner i dag,',
            v2Verb: 'tager',
            fgRest: 'han sin gule regnjakke på.',
            full: 'Fordi det regner i dag, tager han sin gule regnjakke på.'
        },
        ikkeDemo: {
            main: 'Han <strong>tager ikke</strong> cyklen i dag.',
            sub: 'Han går til fods, fordi han <strong>ikke tager</strong> cyklen i dag.'
        },
        tip: 'Når baggrunden ("Fordi det regner i dag") står på Plads 1, tæller hele ledsætningen som én brik — derfor står verbet "tager" straks på Plads 2!'
    },
    {
        id: 'selvom',
        question: 'Modstand?',
        conj: 'selvom',
        fgLabel: 'Forgrund (Hovedsætning)',
        bgLabel: 'Baggrund · Modstand (Ledsætning)',
        fgFirst: {
            fg: 'Han smiler og går hurtigt',
            bg: ', selvom det ikke er godt vejr.',
            full: 'Han smiler og går hurtigt, selvom det ikke er godt vejr.'
        },
        bgFirst: {
            bg: 'Selvom det ikke er godt vejr,',
            v2Verb: 'smiler',
            fgRest: 'han og går hurtigt.',
            full: 'Selvom det ikke er godt vejr, smiler han og går hurtigt.'
        },
        ikkeDemo: {
            main: 'Det <strong>er ikke</strong> godt vejr i dag.',
            sub: 'Han smiler, selvom det <strong>ikke er</strong> godt vejr i dag.'
        },
        tip: 'Læg mærke til "ikke": I forgrunden står "ikke" efter verbet ("er ikke"), men inde i baggrunds-brikken efter "selvom" flytter "ikke" foran verbet ("ikke er").'
    },
    {
        id: 'mens',
        question: 'Hvornår?',
        conj: 'mens',
        fgLabel: 'Forgrund (Hovedsætning)',
        bgLabel: 'Baggrund · Tid (Ledsætning)',
        fgFirst: {
            fg: 'Den gule bus standser ved stoppestedet',
            bg: ', mens han går forbi det varme bageri.',
            full: 'Den gule bus standser ved stoppestedet, mens han går forbi det varme bageri.'
        },
        bgFirst: {
            bg: 'Mens han går forbi det varme bageri,',
            v2Verb: 'standser',
            fgRest: 'den gule bus ved stoppestedet.',
            full: 'Mens han går forbi det varme bageri, standser den gule bus ved stoppestedet.'
        },
        ikkeDemo: {
            main: 'Han <strong>har ikke</strong> travlt i morges.',
            sub: 'Bussen kører forbi, mens han <strong>ikke har</strong> travlt.'
        },
        tip: 'Med "mens" rammer baggrunden tidsmæssigt ind, hvad der sker i forgrunden. Flyttes baggrunden forrest, kommer verbet "standser" direkte efter kommaet.'
    },
    {
        id: 'hvis',
        question: 'Betingelse?',
        conj: 'hvis',
        fgLabel: 'Forgrund (Hovedsætning)',
        bgLabel: 'Baggrund · Betingelse (Ledsætning)',
        fgFirst: {
            fg: 'Vi drikker en varm kop kaffe på caféen',
            bg: ', hvis regnen ikke stopper snart.',
            full: 'Vi drikker en varm kop kaffe på caféen, hvis regnen ikke stopper snart.'
        },
        bgFirst: {
            bg: 'Hvis regnen ikke stopper snart,',
            v2Verb: 'drikker',
            fgRest: 'vi en varm kop kaffe på caféen.',
            full: 'Hvis regnen ikke stopper snart, drikker vi en varm kop kaffe på caféen.'
        },
        ikkeDemo: {
            main: 'Regnen <strong>stopper ikke</strong> endnu.',
            sub: 'Vi går ind på caféen, hvis regnen <strong>ikke stopper</strong> snart.'
        },
        tip: 'Betingelsen ("Hvis regnen ikke stopper snart") sætter rammen for hele sætningen — og inde i ledsætningen står "ikke" foran "stopper".'
    }
];

// ============================================================================
// DATA: FANE 4 — DEL 1: ZOOM IND (6 INTERAKTIVE SYNTAGME-MANIPULATIONER)
// ============================================================================
const ZOOM_IN_TASKS = [
    {
        id: 'zi1',
        tag: 'Nominalsyntagme · Før + Kerne + Efter',
        instruction: 'Udvid den grønne Plads 1-brik ved at sætte delene i rigtig rækkefølge foran verbet:',
        fixedBefore: '',
        fixedAfter: 'cykler på gaden.',
        targetColor: 'green',
        targetLabel: 'Plads 1 (Hvem?)',
        correctSeq: ['Den', 'smilende', 'kvinde', 'med den orange hue'],
        pool: ['med den orange hue', 'kvinde', 'Den', 'smilende'],
        fullSentence: 'Den smilende kvinde med den orange hue cykler på gaden.',
        expl: 'Et nominalsyntagme bygges som: Artikel ("Den") + før-detalje ("smilende") + kerne ("kvinde") + efter-detalje ("med den orange hue"). Alt sammen fylder kun Plads 1!'
    },
    {
        id: 'zi2',
        tag: 'Nominalsyntagme + som-sætning (Pas på lokkebrik!)',
        instruction: 'Byg hele Plads 1-brikken med en "som"-sætning indeni — og sæt hovedverbet på Plads 2 (lad lokkebrikken ligge!):',
        fixedBefore: '',
        fixedAfter: 'roligt forbi.',
        targetColor: 'green',
        targetLabel: 'Plads 1 + Plads 2',
        correctSeq: ['Kvinden,', 'som har en papirpose i kurven,', 'cykler'],
        pool: ['cykler', 'hun', 'Kvinden,', 'som har en papirpose i kurven,'],
        decoyNote: 'Lokkebrikken "hun" skal IKKE med.',
        fullSentence: 'Kvinden, som har en papirpose i kurven, cykler roligt forbi.',
        expl: 'Hele "Kvinden, som har en papirpose i kurven," er Plads 1. Der må ikke snige sig et ekstra "hun" ind før hovedverbet "cykler"!'
    },
    {
        id: 'zi3',
        tag: 'Sted-syntagme · Præposition + beskrevet sted',
        instruction: 'Zoom ind på stedet ("Hvor?") og byg hele den blå brik efter "En kvinde cykler":',
        fixedBefore: 'En kvinde cykler',
        fixedAfter: 'om morgenen.',
        targetColor: 'blue',
        targetLabel: 'Hvor? (Sted-syntagme)',
        correctSeq: ['på', 'den sneklædte cykelsti', 'foran den lille café'],
        pool: ['foran den lille café', 'på', 'den sneklædte cykelsti'],
        fullSentence: 'En kvinde cykler på den sneklædte cykelsti foran den lille café om morgenen.',
        expl: 'Den blå sted-brik starter med præpositionen ("på"), derefter selve stedet ("den sneklædte cykelsti") og til sidst ekstra præcisering ("foran den lille café").'
    },
    {
        id: 'zi4',
        tag: 'Verbal-kæde · Spaltning af 2 verber',
        instruction: 'Start med "Om morgenen" (Plads 1) og spalt handlings-brikken ("vil" + "cykle") rigtigt rundt om subjektet:',
        fixedBefore: 'Om morgenen',
        fixedAfter: 'gennem byen.',
        targetColor: 'red',
        targetLabel: 'Plads 2 + Subjekt + Rest af handling',
        correctSeq: ['vil', 'hun', 'gerne', 'cykle'],
        pool: ['cykle', 'hun', 'vil', 'gerne'],
        fullSentence: 'Om morgenen vil hun gerne cykle gennem byen.',
        expl: 'Når handlings-brikken har to verber, står modalverbet ("vil") på Plads 2, mens hovedverbet ("cykle") lukker rammen efter subjekt og småord ("hun gerne").'
    },
    {
        id: 'zi5',
        tag: 'Objekt-syntagme · Før + Kerne + Efter',
        instruction: 'Udvid det, han drikker ("Hvad?"), med alle detaljerne i rigtig rækkefølge:',
        fixedBefore: 'Han drikker',
        fixedAfter: 'hver morgen.',
        targetColor: 'orange',
        targetLabel: 'Hvad? (Objekt-syntagme)',
        correctSeq: ['en varm', 'kop kaffe', 'fra det lille bageri', 'på hjørnet'],
        pool: ['på hjørnet', 'kop kaffe', 'fra det lille bageri', 'en varm'],
        fullSentence: 'Han drikker en varm kop kaffe fra det lille bageri på hjørnet hver morgen.',
        expl: 'Objektet vokser fra kernen ("kop kaffe") med tillægsord foran ("en varm") og stedsdetaljer bagefter ("fra det lille bageri på hjørnet").'
    },
    {
        id: 'zi6',
        tag: 'Årsags-syntagme på Plads 1 (V2)',
        instruction: 'Byg hele årsags-brikken ("På grund af...") på Plads 1, og sæt verbet på Plads 2:',
        fixedBefore: '',
        fixedAfter: 'den varme hue på.',
        targetColor: 'purple',
        targetLabel: 'Plads 1 (Årsag) + Plads 2 (Verbum)',
        correctSeq: ['På grund af', 'den kraftige sne', 'tager', 'hun'],
        pool: ['hun', 'den kraftige sne', 'tager', 'På grund af'],
        fullSentence: 'På grund af den kraftige sne tager hun den varme hue på.',
        expl: 'Hele præpositionsleddet "På grund af den kraftige sne" tæller som Plads 1 — derfor kommer verbet "tager" straks på Plads 2 før "hun".'
    }
];

// ============================================================================
// DATA: FANE 4 — DEL 2: ZOOM UD (6 INTERAKTIVE SÆTNINGSDELS-MANIPULATIONER)
// ============================================================================
const ZOOM_OUT_TASKS = [
    {
        id: 'zo1',
        tag: 'Flyt baggrunden forrest (fordi + V2)',
        instruction: 'Start med baggrunden ("Fordi det regner i dag,") på Plads 1 — og sæt hovedsætningen i rigtig V2-rækkefølge:',
        fixedBefore: '',
        fixedAfter: '.',
        targetColor: 'purple',
        targetLabel: 'Baggrund (Plads 1) + Forgrund (V2)',
        correctSeq: ['Fordi det regner i dag,', 'tager', 'han', 'sin gule regnjakke på'],
        pool: ['han', 'sin gule regnjakke på', 'Fordi det regner i dag,', 'tager'],
        fullSentence: 'Fordi det regner i dag, tager han sin gule regnjakke på.',
        expl: 'Hele ledsætningen "Fordi det regner i dag," fylder Plads 1. Derfor springer verbet "tager" frem på Plads 2 lige efter kommaet!'
    },
    {
        id: 'zo2',
        tag: '"ikke" inde i baggrunden (fordi + ikke)',
        instruction: 'Byg baggrunds-brikken efter "Han tager bussen," — husk hvor "ikke" står i en ledsætning:',
        fixedBefore: 'Han tager bussen,',
        fixedAfter: '.',
        targetColor: 'purple',
        targetLabel: 'Baggrund (Ledsætning med "ikke")',
        correctSeq: ['fordi', 'han', 'ikke', 'vil', 'blive våd'],
        pool: ['vil', 'fordi', 'blive våd', 'ikke', 'han'],
        fullSentence: 'Han tager bussen, fordi han ikke vil blive våd.',
        expl: 'Inde i en ledsætning (baggrunden) sniger "ikke" sig altid ind FORAN verbet: "fordi han ikke vil blive våd".'
    },
    {
        id: 'zo3',
        tag: 'Modstand forrest (selvom + ikke + V2)',
        instruction: 'Kombinér begge regler: "ikke" foran verbet i baggrunden OG verbet på Plads 2 i forgrunden:',
        fixedBefore: '',
        fixedAfter: '.',
        targetColor: 'purple',
        targetLabel: 'Baggrund (selvom + ikke) + Forgrund (V2)',
        correctSeq: ['Selvom', 'det', 'ikke er varmt,', 'går', 'hun', 'en lang tur'],
        pool: ['går', 'en lang tur', 'Selvom', 'hun', 'ikke er varmt,', 'det'],
        fullSentence: 'Selvom det ikke er varmt, går hun en lang tur.',
        expl: 'I baggrunden står "ikke" foran verbet ("ikke er varmt"), og i forgrunden efter kommaet står verbet først ("går hun").'
    },
    {
        id: 'zo4',
        tag: 'Tid som baggrund på Plads 1 (mens + V2)',
        instruction: 'Sæt tids-baggrunden forrest for at ramme scenen ind, og byg forgrunden rigtigt efter kommaet:',
        fixedBefore: '',
        fixedAfter: '.',
        targetColor: 'blue',
        targetLabel: 'Tid-baggrund (Plads 1) + Forgrund (V2)',
        correctSeq: ['Mens han går forbi bageriet,', 'standser', 'den gule bus', 'ved stoppestedet'],
        pool: ['ved stoppestedet', 'den gule bus', 'Mens han går forbi bageriet,', 'standser'],
        fullSentence: 'Mens han går forbi bageriet, standser den gule bus ved stoppestedet.',
        expl: 'Baggrunden ("Mens han går forbi bageriet,") tæller som én brik på Plads 1, så hovedverbet "standser" kommer direkte på Plads 2.'
    },
    {
        id: 'zo5',
        tag: 'Betingelse med "ikke" (hvis + ikke + V2)',
        instruction: 'Byg hele betingelses-sætningen med "hvis" forrest — husk både "ikke" før verbet og V2 efter kommaet:',
        fixedBefore: '',
        fixedAfter: '.',
        targetColor: 'purple',
        targetLabel: 'Betingelse (Plads 1) + Forgrund (V2)',
        correctSeq: ['Hvis regnen', 'ikke', 'stopper snart,', 'går', 'vi', 'ind på caféen'],
        pool: ['vi', 'stopper snart,', 'går', 'Hvis regnen', 'ind på caféen', 'ikke'],
        fullSentence: 'Hvis regnen ikke stopper snart, går vi ind på caféen.',
        expl: 'Perfekt hypotakse: "ikke" foran "stopper" inde i hvis-sætningen, og "går vi" (V2) lige efter kommaet.'
    },
    {
        id: 'zo6',
        tag: 'Dobbelt zoom · Udvidet subjekt + baggrund',
        instruction: 'Saml en rig sætning, hvor både Plads 1 er zoomet ind OG baggrunden forklarer årsagen:',
        fixedBefore: '',
        fixedAfter: '.',
        targetColor: 'green',
        targetLabel: 'Udvidet Forgrund + Baggrund (fordi)',
        correctSeq: ['Den unge kvinde med paraplyen', 'skynder sig,', 'fordi', 'bussen', 'allerede', 'holder ved stoppestedet'],
        pool: ['allerede', 'skynder sig,', 'holder ved stoppestedet', 'fordi', 'Den unge kvinde med paraplyen', 'bussen'],
        fullSentence: 'Den unge kvinde med paraplyen skynder sig, fordi bussen allerede holder ved stoppestedet.',
        expl: 'Her kombinerer du begge kamera-greb: et udvidet nominalsyntagme i forgrunden + en baggrunds-ledsætning, hvor centraladverbiet "allerede" står foran verbet "holder"!'
    }
];

// ============================================================================
// DATA: FANE 4 — DEL 3: HURTIG-QUIZ (8 KONTROLSPØRGSMÅL)
// ============================================================================
const WORKSHOP_QUIZ = [
    {
        type: 'Zoom ind · Plads 1 & V2',
        prompt: 'Du zoomer ind på "En kvinde" → "Den smilende kvinde med orange hue". Hvilken sætning har verbet på Plads 2?',
        options: [
            'Den smilende kvinde med orange hue cykler på gaden.',
            'Den smilende kvinde cykler med orange hue på gaden i går.'
        ],
        correct: 'Den smilende kvinde med orange hue cykler på gaden.',
        expl: 'Hele den udvidede grønne brik ("Den smilende kvinde med orange hue") er Plads 1 — og verbet "cykler" står samlet lige bagefter på Plads 2.'
    },
    {
        type: 'Zoom ind · Relativsætning i Plads 1',
        prompt: 'Vi pakker en "som"-sætning ind i Plads 1. Hvor skal hovedverbet "cykler" stå?',
        options: [
            'Kvinden, som har en papirpose i kurven, cykler roligt forbi.',
            'Kvinden, som har en papirpose i kurven, hun cykler roligt forbi.'
        ],
        correct: 'Kvinden, som har en papirpose i kurven, cykler roligt forbi.',
        expl: 'Hele "Kvinden, som har en papirpose i kurven," er stadig én samlet Plads 1-brik. Der skal ikke et ekstra "hun" ind — verbet "cykler" kommer direkte efter kommaet.'
    },
    {
        type: 'Zoom ind · Handlings-rammen',
        prompt: 'Når handlings-brikken har to verber ("vil" + "cykle") og starter med "Om morgenen", hvor står delene så?',
        options: [
            'Om morgenen vil hun gerne cykle gennem byen.',
            'Om morgenen hun vil gerne cykle gennem byen.'
        ],
        correct: 'Om morgenen vil hun gerne cykle gennem byen.',
        expl: 'Det første verbum ("vil") står fast på Plads 2, mens det andet verbum ("cykle") lukker rammen senere i sætningen.'
    },
    {
        type: 'Zoom ud · Baggrund først (V2)',
        prompt: 'Du flytter baggrunden ("Fordi det regner kraftigt") forrest i sætningen. Hvad kommer lige efter kommaet?',
        options: [
            'Fordi det regner kraftigt, tager han sin paraply med.',
            'Fordi det regner kraftigt, han tager sin paraply med.'
        ],
        correct: 'Fordi det regner kraftigt, tager han sin paraply med.',
        expl: 'Hele ledsætningen "Fordi det regner kraftigt" fungerer som én samlet Plads 1-brik — så hovedsætningens verbum ("tager") står på Plads 2!'
    },
    {
        type: 'Zoom ud · "ikke" i baggrunden',
        prompt: 'Hvor står "ikke" inde i baggrunds-brikken efter "fordi"?',
        options: [
            'Han tager bussen, fordi han ikke vil blive våd.',
            'Han tager bussen, fordi han vil ikke blive våd.'
        ],
        correct: 'Han tager bussen, fordi han ikke vil blive våd.',
        expl: 'Inde i en ledsætning (baggrunden) sniger "ikke" sig altid ind FORAN verbet: "fordi han ikke vil...".'
    },
    {
        type: 'Zoom ud · Modstand med "selvom"',
        prompt: 'Vælg den sætning, hvor både V2 og "ikke"-reglen er helt rigtige:',
        options: [
            'Selvom det ikke er varmt, går hun en lang tur.',
            'Selvom det er ikke varmt, hun går en lang tur.'
        ],
        correct: 'Selvom det ikke er varmt, går hun en lang tur.',
        expl: 'I baggrunden står "ikke" foran verbet ("ikke er"), og i forgrunden efter kommaet står verbet først ("går hun").'
    },
    {
        type: 'Zoom ud · Betingelse med "hvis"',
        prompt: 'Vi sætter en betingelse på Plads 1. Hvilken sætning er korrekt dansk?',
        options: [
            'Hvis bussen ikke kommer om to minutter, går vi ned på caféen.',
            'Hvis bussen kommer ikke om to minutter, vi går ned på caféen.'
        ],
        correct: 'Hvis bussen ikke kommer om to minutter, går vi ned på caféen.',
        expl: 'Baggrunden har "ikke" før verbet ("ikke kommer"), og forgrunden starter med verbet ("går vi") på Plads 2.'
    },
    {
        type: 'Zoom ind · Størrelse på samme spørgsmål',
        prompt: 'Hvilken af disse tre besvarer spørgsmålet "Hvorfor?" med en hel ledsætning (hypotakse)?',
        options: [
            'Fordi det sner og er glat på vejen.',
            'På grund af sneen.'
        ],
        correct: 'Fordi det sner og er glat på vejen.',
        expl: '"På grund af sneen" er et præpositionsled (uden verbum), mens "Fordi det sner og er glat på vejen" er en hel ledsætning med eget subjekt og verbum.'
    }
];

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
        .osd-header { margin: 0.6rem 0 1.25rem; }
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
            border: 1.5px solid transparent;
            transition: all 0.2s ease;
        }
        .osd-block.green { background: rgba(34, 197, 94, 0.12); border-color: rgba(34, 197, 94, 0.45); }
        .osd-block.red { background: rgba(239, 68, 68, 0.14); border-color: rgba(239, 68, 68, 0.55); }
        .osd-block.blue { background: rgba(2, 132, 199, 0.14); border-color: rgba(56, 189, 248, 0.48); }
        .osd-block.purple { background: rgba(139, 92, 246, 0.14); border-color: rgba(167, 139, 250, 0.48); }
        .osd-block.orange { background: rgba(249, 115, 22, 0.14); border-color: rgba(249, 115, 22, 0.5); }
        .osd-block.zoomed { box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.28); transform: translateY(-1px); }
        .osd-block-lbl { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.85; }
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
            min-height: 62px;
            background: #101419;
            border: 1.5px dashed rgba(76, 155, 166, 0.55);
            border-radius: 12px;
            padding: 0.7rem 0.85rem;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.45rem;
            margin-bottom: 0.85rem;
        }
        .osd-dropzone.correct { border-style: solid; border-color: #22c55e; background: rgba(34, 197, 94, 0.1); }
        .osd-dropzone.wrong { border-style: solid; border-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .osd-fixed-anchor {
            font-size: 0.94rem;
            font-weight: 700;
            color: #94a3b8;
            padding: 0.3rem 0.45rem;
            background: rgba(148, 163, 184, 0.08);
            border-radius: 7px;
        }
        .osd-placed-brick {
            background: #2b6e78;
            border: 1px solid #4c9ba6;
            color: #ffffff;
            padding: 0.42rem 0.78rem;
            border-radius: 9px;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .osd-placed-brick:hover { background: #35838f; }
        .osd-pool-brick {
            background: #1a212b;
            border: 1.5px solid rgba(203, 213, 225, 0.22);
            color: #f1f5f9;
            padding: 0.46rem 0.85rem;
            border-radius: 9px;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .osd-pool-brick:hover:not(:disabled) { border-color: #4c9ba6; background: #222c38; }
        .osd-pool-brick:disabled { opacity: 0.3; cursor: not-allowed; }
        @media (max-width: 640px) {
            .osd-view { padding: 0.55rem 0.65rem 3.5rem; }
            .osd-card { padding: 0.95rem 0.85rem; }
            .osd-tab { flex: 1 1 auto; justify-content: center; font-size: 0.8rem; padding: 0.5rem 0.65rem; }
            .osd-block { flex: 1 1 100%; }
            .osd-chip { white-space: normal; text-align: left; }
        }
    `;
    document.head.appendChild(style);
}

export function renderOrdstillingSaetningsdeleView(container, navigateFn) {
    injectSaetningsdeleStyles();
    container.innerHTML = '';

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
        viewContainer.appendChild(topBar);

        // Header
        const header = document.createElement('div');
        header.className = 'osd-header';
        header.innerHTML = `
            <div class="osd-badge">${SVG_CAMERA}<span>Ordstilling · Sætningsdele (Kamera: Zoom ind &amp; Zoom ud)</span></div>
            <h1>Sætningsdele: Fra enkeltord til rige sætninger</h1>
            <p>
                <strong>Zoom ind</strong> på én farvet brik for at få flere detaljer i samme sætningsdel — og <strong>zoom ud</strong> for at se hele billedet med <strong>forgrund</strong> (hovedsætning) og <strong>baggrund</strong> (ledsætning).
            </p>
        `;
        viewContainer.appendChild(header);

        // Tabs
        const tabs = document.createElement('div');
        tabs.className = 'osd-tabs';
        const tabDefs = [
            { id: 'zoom_in', icon: SVG_ZOOM_IN, label: '1. Zoom ind (Sætningsdele)' },
            { id: 'inside', icon: SVG_LAYERS, label: '2. Inde i brikken' },
            { id: 'zoom_out', icon: SVG_ZOOM_OUT, label: '3. Zoom ud (Hypotakse)' },
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
                <h2 class="osd-card-title">${SVG_ZOOM_IN}<span>Zoom ind på ét spørgsmål — verbet bliver på Plads 2</span></h2>
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
                    <div class="osd-block ${p.color} ${p.active ? 'zoomed' : ''}">
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
    // FANE 2: INDE I BRIKKEN (DE 3 BYGGEMØNSTRE PÅ SAMME SIDE)
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
                <h2 class="osd-card-title">${SVG_LAYERS}<span>Inde i de 3 vigtigste sætningsdele</span></h2>
            </div>
            <p style="margin:0 0 1rem; font-size:0.9rem; color:#94a3b8; line-height:1.55;">
                Hver sætningsdel har sit eget lille byggemønster indeni — men udefra fungerer den stadig som <strong>én samlet brik</strong> i sætningen.
            </p>

            <div class="osd-grid-3">
                <!-- 1. NOMINALSYNTAGME -->
                <div class="osd-mini-card" style="border-top: 3px solid #22c55e;">
                    <h3>1. Hvem/Hvad-brikken (Nominalsyntagme)</h3>
                    <p>En kerne (<strong>kvinde</strong>) kan få detaljer både <em>før</em> og <em>efter</em> sig. Slå lagene til og fra:</p>
                    <div class="osd-chip-row">
                        <button type="button" class="osd-chip ${nomBefore ? 'active' : ''}" id="tog-nom-before">+ Før-detalje</button>
                        <button type="button" class="osd-chip ${nomAfter ? 'active' : ''}" id="tog-nom-after">+ Efter-detalje</button>
                        <button type="button" class="osd-chip ${nomRel ? 'active' : ''}" id="tog-nom-rel">+ som-sætning</button>
                    </div>
                    <div style="background:#151a21; border:1px solid rgba(34,197,94,0.4); border-radius:10px; padding:0.75rem 0.85rem; font-size:0.95rem; line-height:1.55;">
                        ${nomParts.join(' ')} <span class="osd-v2-pill">køber</span> frisk kaffe.
                    </div>
                    <button type="button" class="osd-btn-ghost" id="btn-speak-nom" style="align-self:flex-start;">${SVG_SPEAK}<span>Lyt</span></button>
                </div>

                <!-- 2. VERBAL-KÆDE -->
                <div class="osd-mini-card" style="border-top: 3px solid #ef4444;">
                    <h3>2. Handlings-brikken (Verbal-kæde)</h3>
                    <p>Med to verber (fx <em>vil + cykle</em> eller <em>har + cyklet</em>) åbner brikken sig som en ramme omkring personen:</p>
                    <div class="osd-chip-row">
                        <button type="button" class="osd-chip ${!verbSplit ? 'active' : ''}" id="tog-verb-1">1 verbum</button>
                        <button type="button" class="osd-chip ${verbSplit ? 'active' : ''}" id="tog-verb-2">2 verber (ramme)</button>
                    </div>
                    <div style="background:#151a21; border:1px solid rgba(239,68,68,0.45); border-radius:10px; padding:0.75rem 0.85rem; font-size:0.95rem; line-height:1.55;">
                        ${verbSplit
                            ? `Om morgenen <span class="osd-v2-pill">vil</span> hun gerne <span class="osd-v2-pill">cykle</span> gennem byen.`
                            : `Om morgenen <span class="osd-v2-pill">cykler</span> hun gennem byen.`
                        }
                    </div>
                    <p style="font-size:0.8rem; color:#cbd5e1;">Det første verbum (Plads 2) bøjes i tid — det andet verbum står i navneform eller kort tillægsform senere i sætningen.</p>
                </div>

                <!-- 3. RAMME-BRIKKEN (1 ORD -> SYNTAGME -> LEDSÆTNING) -->
                <div class="osd-mini-card" style="border-top: 3px solid #8b5cf6;">
                    <h3>3. Ramme-brikken (3 størrelser)</h3>
                    <p>Det samme spørgsmål — fx <strong>Hvorfor?</strong> eller <strong>Hvornår?</strong> — kan besvares i tre størrelser:</p>
                    <div style="display:flex; flex-direction:column; gap:0.45rem; font-size:0.86rem;">
                        <div style="background:#151a21; border-left:3px solid #8b5cf6; padding:0.5rem 0.7rem; border-radius:8px;">
                            <div style="font-size:0.7rem; color:#c084fc; font-weight:800;">1 ORD</div>
                            <strong>Derfor</strong> <span style="color:#f87171; font-weight:800;">tager</span> hun huen på.
                        </div>
                        <div style="background:#151a21; border-left:3px solid #38bdf8; padding:0.5rem 0.7rem; border-radius:8px;">
                            <div style="font-size:0.7rem; color:#60a5fa; font-weight:800;">PRÆPOSITIONSLED</div>
                            <strong>På grund af sneen</strong> <span style="color:#f87171; font-weight:800;">tager</span> hun huen på.
                        </div>
                        <div style="background:#151a21; border-left:3px solid #fb923c; padding:0.5rem 0.7rem; border-radius:8px;">
                            <div style="font-size:0.7rem; color:#fb923c; font-weight:800;">HEL LEDSÆTNING (HYPOTAKSE)</div>
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
    // FANE 3: ZOOM UD — FORGRUND & BAGGRUND (HYPOTAKSE)
    // ========================================================================
    function renderZoomOutTab() {
        const sc = HYPOTAKSE_SCENES.find(x => x.id === activeSceneId) || HYPOTAKSE_SCENES[0];
        const spokenText = bgFirst ? sc.bgFirst.full : sc.fgFirst.full;

        const card = document.createElement('div');
        card.className = 'osd-card';
        card.innerHTML = `
            <div class="osd-card-head">
                <h2 class="osd-card-title">${SVG_ZOOM_OUT}<span>Zoom ud: Skarp forgrund (hovedsætning) + baggrund (ledsætning)</span></h2>
                <div class="osd-chip-row">
                    ${HYPOTAKSE_SCENES.map(item => `
                        <button type="button" class="osd-chip ${item.id === activeSceneId ? 'active' : ''}" data-scene="${item.id}">
                            ${item.question} (${item.conj})
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="osd-camera-frame">
                <img class="osd-camera-img" src="${baseUrl}assets/saetningsdele_zoom_ud.jpg" alt="Person i gul regnjakke i forgrunden med café og bus i baggrunden" />
                <div class="osd-viewfinder-badge">${SVG_CAMERA}<span>Kamera zoomet ud · Forgrund + Baggrund</span></div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.6rem;">
                <div class="osd-chip-row">
                    <button type="button" class="osd-chip ${bgFirst ? 'light-active' : ''}" id="osd-toggle-bg-first">
                        ${SVG_SWAP}<span>${bgFirst ? 'Baggrund står forrest (Plads 1 · V2!)' : 'Flyt baggrunden til Plads 1'}</span>
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
                        <div class="osd-block-lbl" style="color:#4ade80; margin-bottom:0.25rem;">Plads 2 (V2) · ${sc.fgLabel}</div>
                        <div class="osd-block-txt"><span class="osd-v2-pill">${sc.bgFirst.v2Verb}</span> ${sc.bgFirst.fgRest}</div>
                    </div>
                `}
            </div>

            ${showIkke ? `
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.75rem; margin-bottom:0.9rem;">
                    <div style="background:#101419; border:1px solid rgba(34,197,94,0.4); border-radius:11px; padding:0.75rem 0.9rem; font-size:0.88rem;">
                        <div style="font-size:0.72rem; font-weight:800; color:#4ade80; margin-bottom:0.25rem;">FORGRUND (HOVEDSÆTNING): VERBUM + IKKE</div>
                        <div>${sc.ikkeDemo.main}</div>
                    </div>
                    <div style="background:#101419; border:1px dashed rgba(167,139,250,0.55); border-radius:11px; padding:0.75rem 0.9rem; font-size:0.88rem;">
                        <div style="font-size:0.72rem; font-weight:800; color:#c084fc; margin-bottom:0.25rem;">BAGGRUND (LEDSÆTNING): IKKE + VERBUM</div>
                        <div>${sc.ikkeDemo.sub}</div>
                    </div>
                </div>
            ` : ''}

            <div class="osd-note-box">
                <strong>Kamera-indsigt:</strong> ${sc.tip}
            </div>
        `;

        card.querySelectorAll('[data-scene]').forEach(btn => {
            btn.onclick = () => {
                activeSceneId = btn.dataset.scene;
                render();
            };
        });
        card.querySelector('#osd-toggle-bg-first').onclick = () => { bgFirst = !bgFirst; render(); };
        card.querySelector('#osd-toggle-ikke').onclick = () => { showIkke = !showIkke; render(); };
        card.querySelector('#osd-listen-hyp').onclick = () => speakDanish(spokenText);
        viewContainer.appendChild(card);
    }

    // ========================================================================
    // FANE 4: ZOOM-VÆRKSTEDET (20 OPGAVER: ZOOM IND + ZOOM UD + HURTIG-QUIZ)
    // ========================================================================
    function renderWorkshopTab() {
        const trackBar = document.createElement('div');
        trackBar.className = 'osd-subtrack-bar';
        const tracks = [
            { id: 'zoom_in_build', icon: SVG_ZOOM_IN, label: `1. Zoom ind · Manipulér syntagmer (${ZOOM_IN_TASKS.length})` },
            { id: 'zoom_out_build', icon: SVG_ZOOM_OUT, label: `2. Zoom ud · Manipulér sætningsdele (${ZOOM_OUT_TASKS.length})` },
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
                <button type="button" class="osd-btn-primary" id="osd-quiz-restart">Prøv igen</button>
            `;
            card.querySelector('#osd-quiz-restart').onclick = () => {
                quizIdx = 0;
                quizScore = 0;
                quizAnswered = false;
                quizPicked = null;
                render();
            };
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
        const placedIndices = st.placed; // array of indices into task.pool
        const placedTexts = placedIndices.map(i => task.pool[i]);

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
                ${task.fixedBefore ? `<span class="osd-fixed-anchor">${task.fixedBefore}</span>` : ''}
                ${placedIndices.length === 0
                    ? `<span style="color:#64748b; font-size:0.86rem; font-style:italic;">Klik på brikkerne nedenfor i den rigtige rækkefølge...</span>`
                    : placedIndices.map((poolIdx, pos) => `
                        <button type="button" class="osd-placed-brick" data-remove-pos="${pos}">${task.pool[poolIdx]}</button>
                    `).join('')
                }
                ${task.fixedAfter ? `<span class="osd-fixed-anchor">${task.fixedAfter}</span>` : ''}
            </div>

            <div class="osd-chip-row" style="margin-bottom:1rem;">
                ${task.pool.map((txt, poolIdx) => `
                    <button type="button" class="osd-pool-brick" data-pool-idx="${poolIdx}" ${placedIndices.includes(poolIdx) || st.status === 'correct' ? 'disabled' : ''}>
                        ${txt}
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
                    <strong style="color:#f87171;">Ikke helt endnu.</strong> Prøv at flytte brikkerne (klik på en placeret brik for at fjerne den) — tænk på, hvad der står på Plads 1 og Plads 2!
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
