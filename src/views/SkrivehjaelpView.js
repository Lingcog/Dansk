import { getTranslation, getLang } from '../utils/i18n.js';
import { swT, isSwRtl } from '../utils/mb_skrive_translations.js';
import {
    ORDSTILLING_COLORS,
    getColorCodesEnabled,
    setColorCodesEnabled,
    getStartCategoryColor,
    classifyObjectColor,
    chipColorStyle,
    buildColoredPreviewHtml,
    renderColorLegendHtml,
    ensureOrdstillingColorStyles
} from '../utils/ordstillingColorCodes.js';

export const SKRIVEHJAELP_SYSTEM_PROMPT = `Du er en tålmodig og pædagogisk dansklærer. Din opgave er at hjælpe brugeren med at blive bedre til at skrive dansk.

Når brugeren har skrevet "Hej", skal du først spørge brugeren på hvilket sprog vedkommende vil have feedback. Spørg kort.

På brugerens sprog beder du vedkommende om at skrive sin tekst.

SPROGREGEL: Hele samtalen, inklusive alle spørgsmål, instruktioner, grænsefladetekster og opfølgninger, skal altid ske på det sprog, som brugeren vælger som sit feedbacksprog i starten (f.eks. svensk, engelsk eller arabisk). Dansk må udelukkende forekomme i selve citaterne fra brugerens tekst samt i de links, der skal stilles til rådighed.

I samme øjeblik brugeren har skrevet sin tekst og trykker send, går du i gang med at analysere.

Du skal gøre brugeren opmærksom på de fejl, der er i den indtastede tekst, i punktform PÅ FEEDBACKSPROGET.
VIGTIGSTE REGEL: Du må ALDRIG skrive det rigtige svar, og dine hints må ALDRIG indeholde selve den sproglige løsning. Du skal udelukkende hjælpe brugeren til selv at finde frem til det rigtige svar ved at stille ledende spørgsmål. Du skal svare så kort som muligt.

Her er nogle eksempler på, hvordan du skal give feedback og stille ledende spørgsmål. Undgå grammatiske termer:
Små ord og fraser: "det er nogle god ide" – Tænk efter, hvordan det lyder, når man sætter de små ords bestemmelser sammen i begyndelsen. Hvordan plejer man at forbinde dem i denne type frase? Hvis du vil læse mere om, hvordan man binder ord sammen, kan du kigge her: https://lingcog.github.io/Dansk/#/da/top_konjunktioner
Ordvalg og stavning: "penger" – Hvordan plejer dette ord at blive stavet, når man skriver det i hverdagen? Og lyder det som om, det handler om én eller flere? Hvis du vil træne ordforråd, kan du finde hjælp her: https://lingcog.github.io/Dansk/#/da/word_learning
Ordenes samspil: "en kortsigtede løsning" – Hvordan ændrer det ord sig, der beskriver tingen (dens endelse), afhængigt af om det handler om én enkelt ting eller flere? Lyt til, hvordan det lyder sammen med ordet foran. Du kan læse mere om, hvordan ord beskriver ting her: https://lingcog.github.io/Dansk/#/da/adjective_comparison
Udtryk og naturligt sprog: "tapper sig" – Dette udtryk føles lidt uvant i denne situation. Findes der et andet ord, som du hellere ville bruge til at fortælle, at man gør en indsats? Du kan kigge på, hvordan man sætter sætninger og ordvalg sammen her: https://lingcog.github.io/Dansk/#/da/ordstilling
Følge med tiden: "Hvad nu de ikke får nogle mere penger" – Passer tidsformen her sammen med resten af det, du har skrevet, eller hopper vi i tid? For at kigge nærmere på, hvordan tider hænger sammen, kan du kigge her: https://lingcog.github.io/Dansk/#/da/punktet_og_broen

VIGTIGE RETNINGSLINJER:
- Al din feedback skal udelukkende være på det sprog, som brugeren valgte, da du spørgte om feedbacksprog i starten af samtalen (f.eks. arabisk, hvis brugeren bad om det).
- Når brugeren indsætter en tekst, svarer du kun med feedback i punktform, hvis der er fejl.
- Citer altid den specifikke del af teksten med fejlen i gåseøjne (" "), før du stiller dit ledende spørgsmål.
- Det er VIGTIGT, inden du præsenterer et hint, at du kører en verificeringscyklus, så du sikrer dig, at du ikke giver forkerte hints eller hints, som ikke er grammatisk rigtige.

BRUG AF HJÆLPEMATERIALER OG RESSOURCER (Lingcog Dansk):
Når du opdager specifikke fejltyper, skal du altid henvise til det præcise link fra platformen:

1. TIDSUDTRYK OG TIDSPUNKTER:
- Tidsudtryk og tidsadverbialer: https://lingcog.github.io/Dansk/#/da/traen_tidsudtryk

2. ORDFORRÅD OG INTERAKTIV LÆRING:
- Ordforråd og ordklasser (oversigt): https://lingcog.github.io/Dansk/#/da/word_learning

3. ORDSTILLING OG SÆTNINGSSTRUKTUR:
- Ordstilling (grundlæggende og avanceret placering): https://lingcog.github.io/Dansk/#/da/ordstilling

4. PRONOMINER (Stedord):
- Generelt om pronominer: https://lingcog.github.io/Dansk/#/da/pronomen/p
- Subjekt-pronominer: https://lingcog.github.io/Dansk/#/da/pronomen/p/subjekt
- Objekt-pronominer: https://lingcog.github.io/Dansk/#/da/pronomen/p/objekt
- Possessive pronominer (ejestedord som sin/sit/hans): https://lingcog.github.io/Dansk/#/da/pronomen/p/possessiv
- Refleksive pronominer: https://lingcog.github.io/Dansk/#/da/pronomen/p/refleksiv

5. VERBER OG TIDSFORMER:
- De vigtigste verber (nutid, datid og førnutid): https://lingcog.github.io/Dansk/#/da/top100_verber
- Datid vs. førnutid (punktet & broen): https://lingcog.github.io/Dansk/#/da/punktet_og_broen

6. ORDKLASSER OG ØVRIG GRAMMATIK:
- Konjunktioner (bindeord): https://lingcog.github.io/Dansk/#/da/top_konjunktioner
- Adjektiver (tillægsord / bøjning og endelser): https://lingcog.github.io/Dansk/#/da/adjective_comparison
- Adverbier (biord: tid, sted, måde & holdning): https://lingcog.github.io/Dansk/#/da/top100_adverbier

Eksempel på din feedback med link:
"Du er rigtig godt på vej! Kig dog lige en ekstra gang på dit valg af stedord i anden sætning. Hvem ejer egentlig bilen? Hvis du har brug for at genopfriske reglerne for stedord, kan du finde hjælp her: https://lingcog.github.io/Dansk/#/da/pronomen/p. Prøv at skrive sætningen igen!"

Hvis den indsendte tekst er helt fejlfri eller blot handler om præferencer, så spild ikke tiden med rettelser, men giv blot stor og motiverende ros.`;

// ============================================================================
// MONOKROME SVG-IKONER (Kølig nordisk stil — nul emojis)
// ============================================================================
const SVG_PEN = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`;
const SVG_HINT = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`;
const SVG_COPY = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const SVG_ARROW_UP = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`;
const SVG_TRASH = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;
const SVG_FLOW = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="5" rx="1"/><rect x="14" y="16" width="7" height="5" rx="1"/><path d="M6.5 8v4a2 2 0 0 0 2 2h7a2 2 0 0 1 2 2"/></svg>`;
const SVG_CHECK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

// ============================================================================
// GENNEMLÆSNINGS-SPØRGSMÅL (5 lokale selvkorrektur-spørgsmål uden AI)
// ============================================================================
const REVIEW_QUESTIONS = [
    { id: 'v2', titleKey: 'sh_rev_q1_title', questionKey: 'sh_rev_q1_text' },
    { id: 'tense', titleKey: 'sh_rev_q2_title', questionKey: 'sh_rev_q2_text' },
    { id: 'connectors', titleKey: 'sh_rev_q3_title', questionKey: 'sh_rev_q3_text' },
    { id: 'nouns', titleKey: 'sh_rev_q4_title', questionKey: 'sh_rev_q4_text' },
    { id: 'whole', titleKey: 'sh_rev_q5_title', questionKey: 'sh_rev_q5_text' }
];

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatSentenceForReviewFocus(sentence, focusId) {
    const safe = escapeHtml(sentence);
    if (!focusId) return safe;

    if (focusId === 'v2') {
        const startsWithPerson = /^(jeg|vi|du|han|hun|de|min|mit|mine|mange)\b/i.test(sentence.trim());
        if (!startsWithPerson) {
            return `<mark class="sh-rev-mark">${safe}</mark>`;
        }
        return safe;
    }
    if (focusId === 'connectors') {
        return safe.replace(/\b(fordi|men|selvom|derfor|derefter|bagefter|alligevel|desuden|heldigvis|samtidig|og|så|som|der|at)\b/gi, '<mark class="sh-rev-mark">$1</mark>');
    }
    if (focusId === 'nouns') {
        return safe.replace(/\b(en|et|den|det|de|min|mit|mine|nogle)\s+([a-zæøå]+)/gi, '<mark class="sh-rev-mark">$1 $2</mark>');
    }
    if (focusId === 'whole') {
        return `<mark class="sh-rev-mark-soft">${safe}</mark>`;
    }
    return safe;
}

// ============================================================================
// EMNE-KATALOG (6 prøvenære emner i rulle-ned-menu)
// ============================================================================
const SCENARIOS = {
    dag: {
        id: 'dag',
        labelKey: 'sh_sc_dag',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Jeg', 'Vi', 'Min ven og jeg', 'Min familie'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['I går', 'I weekenden', 'Om morgenen', 'Om aftenen'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['I parken', 'Ved vandet', 'Derhjemme', 'På café'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Derefter', 'Bagefter', 'Derfor', 'Til sidst'] },
            baggrund: { labelKey: 'sh_cat_baggrund', labelFallback: 'Baggrund først (V2)', mode: 'inversion', options: ['Fordi vejret var godt,', 'Da vi kom hjem,', 'Selvom jeg var træt,', 'Når jeg har fri,'] },
            to_verber: { labelKey: 'sh_cat_to_verber', labelFallback: 'To verber (Ramme)', mode: 'two_verbs', options: ['Jeg', 'Vi', 'I går', 'I morgen'] },
            at_clause: { labelKey: 'sh_cat_at_dag', mode: 'at_clause', options: ['Jeg synes, at', 'Jeg håber, at', 'Jeg følte, at', 'Det var dejligt, at'] },
            kan_lide: { labelKey: 'sh_cat_kan_lide', mode: 'kan_lide', options: ['Jeg', 'Vi', 'Min ven og jeg', 'Min familie'] }
        },
        verbs: ['gik', 'var', 'spiste', 'mødte', 'cyklede', 'lavede', 'slappede af'],
        twoVerb2Options: ['gå', 'spise', 'møde', 'cykle', 'lave', 'slappe af'],
        kanLideInfinitives: ['lide at spise', 'lide at gå', 'lide at cykle', 'lide at møde', 'lide at lave', 'lide at slappe af'],
        atSubjects: ['dagen', 'weekenden', 'det', 'vi', 'vejret'],
        atVerbs: ['var', 'blev', 'gik', 'gav os'],
        invertedSubjects: ['jeg', 'vi', 'min ven og jeg', 'min familie'],
        objects: ['en lang tur ved vandet', 'god mad derhjemme', 'nogle venner på café', 'en spændende film', 'en rigtig hyggelig aften', 'en god pause'],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi det var hyggeligt', text: ', fordi det var hyggeligt' },
            { label: ', men det regnede lidt', text: ', men det regnede lidt' },
            { label: ', og vi snakkede længe', text: ', og vi snakkede længe' },
            { label: ', selvom jeg var træt', text: ', selvom jeg var træt' }
        ],
        extensionsRel: [
            { label: ', som lå lige ved vandet', text: ', som lå lige ved vandet' },
            { label: ', som jeg havde glædet mig til', text: ', som jeg havde glædet mig til' },
            { label: ', der smagte fantastisk', text: ', der smagte fantastisk' },
            { label: ', som gav mig ny energi', text: ', som gav mig ny energi' }
        ]
    },
    mail: {
        id: 'mail',
        labelKey: 'sh_sc_mail',
        starts: {
            hilsen: { labelKey: 'sh_cat_hilsen', labelFallback: 'Hilsen (Kære ...)', mode: 'greeting', options: ['Kære ven', 'Kære lærer', 'Kære chef', 'Kære kollega', 'Kære nabo'] },
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Jeg', 'Vi', 'Mit navn'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['I dag', 'I morgen', 'På fredag', 'Næste uge'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['På sprogskolen', 'På arbejdet', 'Derhjemme'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Desværre', 'Derfor', 'Heldigvis', 'Til sidst'] },
            baggrund: { labelKey: 'sh_cat_baggrund', labelFallback: 'Baggrund først (V2)', mode: 'inversion', options: ['Fordi jeg har feber,', 'Hvis det passer dig,', 'Selvom jeg er syg,', 'Når jeg er rask,'] },
            to_verber: { labelKey: 'sh_cat_to_verber', labelFallback: 'To verber (Ramme)', mode: 'two_verbs', options: ['Jeg', 'Vi', 'I morgen', 'På fredag'] },
            at_clause: { labelKey: 'sh_cat_at_mail', mode: 'at_clause', options: ['Jeg håber, at', 'Jeg vil gerne fortælle, at', 'Jeg tror, at', 'Det er vigtigt, at'] },
            kan_lide: { labelKey: 'sh_cat_kan_lide', mode: 'kan_lide', options: ['Jeg', 'Vi'] }
        },
        verbs: ['skriver', 'vil gerne', 'kan desværre ikke', 'har', 'kommer', 'sender'],
        twoVerb2Options: ['møde', 'komme', 'sende', 'spørge om', 'læse', 'aftale'],
        kanLideInfinitives: ['lide at lære', 'lide at komme', 'lide at samarbejde', 'lide at skrive', 'lide at tale'],
        atSubjects: ['vi', 'jeg', 'det', 'mødet'],
        atVerbs: ['kan finde', 'er tilbage', 'passer', 'bliver'],
        invertedSubjects: ['jeg', 'vi'],
        objects: ['for at melde mig syg', 'spørge om mødet i morgen', 'komme til undervisning', 'et spørgsmål om opgaven', 'en ny tid næste uge', 'mandag morgen'],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi jeg har feber', text: ', fordi jeg har feber' },
            { label: ', men jeg læser opgaven hjemme', text: ', men jeg læser opgaven hjemme' },
            { label: ', og jeg glæder mig til svar', text: ', og jeg glæder mig til svar' },
            { label: '. Venlig hilsen', text: '. Venlig hilsen' }
        ],
        extensionsRel: [
            { label: ', som vi aftalte i sidste uge', text: ', som vi aftalte i sidste uge' },
            { label: ', der passer os begge', text: ', der passer os begge' },
            { label: ', som jeg sender her', text: ', som jeg sender her' }
        ]
    },
    mening: {
        id: 'mening',
        labelKey: 'sh_sc_mening',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Jeg', 'Mange mennesker', 'Vi'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['I hverdagen', 'I dag', 'Ofte'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['I Danmark', 'I skolen', 'På arbejdet'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['På den ene side', 'På den anden side', 'Derfor', 'Alt i alt'] },
            baggrund: { labelKey: 'sh_cat_baggrund', labelFallback: 'Baggrund først (V2)', mode: 'inversion', options: ['Fordi det er vigtigt,', 'Selvom det kræver tid,', 'Hvis vi samarbejder,', 'Når alle hjælper hinanden,'] },
            droem_ramme: { labelKey: 'sh_cat_droem', labelFallback: 'Plan vs. Drøm (nutid/datid)', mode: 'inversion', options: ['Hvis vi har tid,', 'Hvis vi havde mere tid,', 'Hvis det var muligt,', 'Hvis alle hjalp til,'] },
            to_verber: { labelKey: 'sh_cat_to_verber', labelFallback: 'To verber (Ramme)', mode: 'two_verbs', options: ['Vi', 'Mange mennesker', 'I hverdagen', 'I Danmark'] },
            at_clause: { labelKey: 'cat_at_mening', mode: 'at_clause', options: ['Jeg synes, at', 'Jeg mener, at', 'Jeg ville ønske, at', 'Det er vigtigt, at'] },
            kan_lide: { labelKey: 'sh_cat_kan_lide', mode: 'kan_lide', options: ['Jeg', 'Mange mennesker', 'Vi'] }
        },
        verbs: ['mener', 'oplever', 'ser', 'bruger', 'foretrækker', 'støtter', 'ville', 'kunne'],
        twoVerb2Options: ['bruge', 'støtte', 'finde', 'skabe', 'vælge', 'prioritere'],
        kanLideInfinitives: ['lide at spise', 'lide at bruge', 'lide at cykle', 'lide at have', 'lide at støtte'],
        atSubjects: ['man', 'vi', 'alle', 'det', 'børn og unge'],
        atVerbs: ['skal have', 'lærer bedst', 'har brug for', 'er vigtigt for'],
        invertedSubjects: ['jeg', 'vi', 'mange'],
        objects: ['mere tid til familien', 'cyklen hver dag', 'gode rammer i skolen', 'et stærkt fællesskab', 'sund mad i hverdagen', 'balance mellem arbejde og fritid'],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi det giver ro i hverdagen', text: ', fordi det giver ro i hverdagen' },
            { label: ', men det kræver også tid', text: ', men det kræver også tid' },
            { label: ', selvom det ikke altid er let', text: ', selvom det ikke altid er let' }
        ],
        extensionsRel: [
            { label: ', som styrker fællesskabet', text: ', som styrker fællesskabet' },
            { label: ', der gør en forskel i hverdagen', text: ', der gør en forskel i hverdagen' },
            { label: ', som alle kan have glæde af', text: ', som alle kan have glæde af' }
        ]
    },
    person: {
        id: 'person',
        labelKey: 'sh_sc_person',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Hun', 'Han', 'Min bedste ven', 'Vi'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['Hver uge', 'Når vi mødes', 'Altid'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['På arbejdet', 'På café', 'Hjemme hos os'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Derfor', 'Desuden', 'Heldigvis'] },
            baggrund: { labelKey: 'sh_cat_baggrund', labelFallback: 'Baggrund først (V2)', mode: 'inversion', options: ['Fordi vi forstår hinanden,', 'Selvom vi har travlt,', 'Når vi mødes,'] },
            to_verber: { labelKey: 'sh_cat_to_verber', labelFallback: 'To verber (Ramme)', mode: 'two_verbs', options: ['Vi', 'Hun', 'Han', 'Hver uge'] },
            at_clause: { labelKey: 'cat_at_foelelse', mode: 'at_clause', options: ['Jeg sætter pris på, at', 'Jeg synes, at', 'Jeg er glad for, at'] },
            kan_lide: { labelKey: 'sh_cat_kan_lide', mode: 'kan_lide', options: ['Jeg', 'Hun', 'Han', 'Vi'] }
        },
        verbs: ['er', 'har', 'hjælper', 'laver', 'fortæller', 'lytter'],
        twoVerb2Options: ['møde', 'hjælpe', 'tale med', 'lave', 'besøge'],
        kanLideInfinitives: ['lide at drikke', 'lide at snakke med', 'lide at lave', 'lide at lytte til', 'lide at møde'],
        atSubjects: ['hun', 'han', 'vi', 'min ven'],
        atVerbs: ['altid er', 'har tid til', 'kan tale om', 'får mig til at'],
        invertedSubjects: ['vi', 'hun', 'han', 'jeg'],
        objects: ['et varmt og åbent menneske', 'et spændende arbejde', 'en god humor', 'tid til en kop kaffe', 'gode historier', 'mig, når noget er svært'],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi vi forstår hinanden', text: ', fordi vi forstår hinanden' },
            { label: ', og vi griner altid meget', text: ', og vi griner altid meget' },
            { label: ', selvom vi har travlt', text: ', selvom vi har travlt' }
        ],
        extensionsRel: [
            { label: ', som altid lytter og hjælper', text: ', som altid lytter og hjælper' },
            { label: ', som bor tæt på mig', text: ', som bor tæt på mig' },
            { label: ', der skaber god stemning', text: ', der skaber god stemning' },
            { label: ', som jeg har kendt i mange år', text: ', som jeg har kendt i mange år' }
        ]
    },
    arbejde: {
        id: 'arbejde',
        labelKey: 'sh_sc_arbejde',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Jeg', 'Min plan', 'Vi'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['Lige nu', 'Næste år', 'I fremtiden'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['På mit arbejde', 'På sprogskolen', 'I Danmark'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Derfor', 'Derefter', 'Samtidig'] },
            baggrund: { labelKey: 'sh_cat_baggrund', labelFallback: 'Baggrund først (V2)', mode: 'inversion', options: ['Når jeg er færdig,', 'Hvis jeg får chancen,', 'Fordi jeg vil udvikle mig,', 'Selvom det er svært,'] },
            droem_ramme: { labelKey: 'sh_cat_droem', labelFallback: 'Plan vs. Drøm (nutid/datid)', mode: 'inversion', options: ['Hvis jeg har tid,', 'Hvis jeg havde mere tid,', 'Hvis jeg fik drømmejobbet,', 'Hvis det var muligt,'] },
            to_verber: { labelKey: 'sh_cat_to_verber', labelFallback: 'To verber (Ramme)', mode: 'two_verbs', options: ['Jeg', 'Vi', 'Næste år', 'I fremtiden'] },
            at_clause: { labelKey: 'sh_cat_at_arbejde', mode: 'at_clause', options: ['Jeg håber, at', 'Jeg ville ønske, at', 'Jeg drømmer om, at', 'Det er mit mål, at'] },
            kan_lide: { labelKey: 'sh_cat_kan_lide', mode: 'kan_lide', options: ['Jeg', 'Vi'] }
        },
        verbs: ['arbejder', 'søger', 'lærer', 'drømmer om', 'planlægger', 'ville', 'kunne'],
        twoVerb2Options: ['møde', 'finde', 'lære', 'arbejde med', 'bruge', 'søge'],
        kanLideInfinitives: ['lide at arbejde med', 'lide at lære', 'lide at bruge', 'lide at hjælpe', 'lide at udvikle'],
        atSubjects: ['jeg', 'min uddannelse', 'fremtiden'],
        atVerbs: ['kan finde', 'giver mig', 'bliver', 'åbner for'],
        invertedSubjects: ['jeg', 'vi'],
        objects: ['en spændende uddannelse', 'et godt job i Danmark', 'bedre dansk hver uge', 'nye kolleger og opgaver', 'en fast stilling', 'at bruge mine erfaringer'],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi jeg gerne vil udvikle mig', text: ', fordi jeg gerne vil udvikle mig' },
            { label: ', selvom det kræver hårdt arbejde', text: ', selvom det kræver hårdt arbejde' },
            { label: ', og jeg øver mig hver dag', text: ', og jeg øver mig hver dag' }
        ],
        extensionsRel: [
            { label: ', som giver mig ansvar', text: ', som giver mig ansvar' },
            { label: ', der passer til mine styrker', text: ', der passer til mine styrker' },
            { label: ', som jeg kan være stolt af', text: ', som jeg kan være stolt af' }
        ]
    },
    rejse: {
        id: 'rejse',
        labelKey: 'sh_sc_rejse',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Jeg', 'Vi', 'Min familie'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['Sidste sommer', 'Første dag', 'Om aftenen'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['Ved kysten', 'På stranden', 'I bjergene'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Derefter', 'Pludselig', 'Til sidst'] },
            baggrund: { labelKey: 'sh_cat_baggrund', labelFallback: 'Baggrund først (V2)', mode: 'inversion', options: ['Da vi ankom,', 'Fordi vejret var varmt,', 'Selvom turen var lang,'] },
            to_verber: { labelKey: 'sh_cat_to_verber', labelFallback: 'To verber (Ramme)', mode: 'two_verbs', options: ['Jeg', 'Vi', 'Sidste sommer', 'Næste sommer'] },
            at_clause: { labelKey: 'sh_cat_at_rejse', mode: 'at_clause', options: ['Jeg opdagede, at', 'Vi syntes, at', 'Jeg glemmer aldrig, at'] },
            kan_lide: { labelKey: 'sh_cat_kan_lide', mode: 'kan_lide', options: ['Jeg', 'Vi', 'Min familie'] }
        },
        verbs: ['rejste', 'besøgte', 'oplevede', 'smagte', 'så', 'boede'],
        twoVerb2Options: ['rejse til', 'besøge', 'opleve', 'smage', 'se'],
        kanLideInfinitives: ['lide at rejse til', 'lide at smage', 'lide at besøge', 'lide at opleve', 'lide at se'],
        atSubjects: ['stedet', 'naturen', 'menneskerne', 'turen'],
        atVerbs: ['var', 'føltes', 'gav os', 'blev'],
        invertedSubjects: ['vi', 'jeg', 'min familie'],
        objects: ['en lille by ved havet', 'en smuk nationalpark', 'lokal mad på markedet', 'solnedgangen fra stranden', 'et uforglemmeligt minde', 'en stille og venlig stemning'],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi vejret var helt klart', text: ', fordi vejret var helt klart' },
            { label: ', men turen gik alt for hurtigt', text: ', men turen gik alt for hurtigt' },
            { label: ', og vi tog mange billeder', text: ', og vi tog mange billeder' }
        ],
        extensionsRel: [
            { label: ', som jeg aldrig glemmer', text: ', som jeg aldrig glemmer' },
            { label: ', der lå gemt mellem bakkerne', text: ', der lå gemt mellem bakkerne' },
            { label: ', som var helt anderledes end derhjemme', text: ', som var helt anderledes end derhjemme' }
        ]
    }
};

// ============================================================================
// GRADVIS, LOKAL TEKSTANALYSE (Skarp, ærlig lokal feedback — 0 netværkskald)
// ============================================================================
const STOPWORDS_DA = new Set([
    'ikke', 'fordi', 'selvom', 'derfor', 'derefter', 'bagefter', 'hele', 'aldrig', 'altid',
    'også', 'meget', 'rigtig', 'lidt', 'mere', 'mest', 'alle', 'mange', 'nogle', 'noget',
    'hver', 'hvad', 'hvor', 'hvornår', 'hvordan', 'efter', 'inden', 'under', 'over', 'mellem',
    'uden', 'gennem', 'omkring', 'skal', 'ville', 'kunne', 'måtte', 'burde', 'have', 'havde',
    'være', 'blev', 'bliver', 'blive', 'dette', 'disse', 'mine', 'dine', 'sine', 'vores',
    'deres', 'hans', 'hendes', 'hende', 'eller', 'samt', 'aften', 'aftenen', 'morgen', 'dagen'
]);

const ACTION_VERBS_DA = [
    'råbte', 'råber', 'gik', 'går', 'cyklede', 'cykler', 'spiste', 'spiser', 'mødte', 'møder',
    'lavede', 'laver', 'skriver', 'skrev', 'arbejder', 'arbejdede', 'rejste', 'rejser',
    'besøgte', 'besøger', 'boede', 'bor', 'snakkede', 'snakker', 'kørte', 'kører', 'løb', 'løber',
    'læste', 'læser', 'købte', 'køber', 'sendte', 'sender', 'hørte', 'hører'
];

const BARE_ADJECTIVES_DA = [
    'hyggelig', 'træt', 'glad', 'spændende', 'dejlig', 'god', 'dårlig', 'sur',
    'kedelig', 'rar', 'smuk', 'flot', 'svær', 'nem', 'varm', 'kold', 'travlt', 'travl'
];

function findSameSentenceStemRepetition(sentences) {
    for (const s of sentences) {
        const tokens = (s.toLowerCase().match(/[a-zæøå]+/g) || [])
            .filter(w => w.length >= 4 && !STOPWORDS_DA.has(w));
        for (let i = 0; i < tokens.length; i++) {
            for (let j = i + 1; j < tokens.length; j++) {
                const a = tokens[i];
                const b = tokens[j];
                if (a === b) return [a, b];
                const shorter = a.length <= b.length ? a : b;
                const longer = a.length <= b.length ? b : a;
                if (shorter.length >= 5 && longer.startsWith(shorter) && (longer.length - shorter.length) <= 3) {
                    return [a, b];
                }
            }
        }
    }
    return null;
}

function findRepeatedConnector(sentences) {
    const connectors = ['fordi', 'men', 'selvom', 'derfor', 'derefter', 'bagefter'];
    const perSentence = sentences.map(s => {
        const tokens = s.toLowerCase().match(/[a-zæøå]+/g) || [];
        return connectors.filter(c => tokens.includes(c));
    });

    // 1. Samme bindeord i to sætninger i træk
    for (let i = 1; i < perSentence.length; i++) {
        const shared = perSentence[i].find(c => perSentence[i - 1].includes(c));
        if (shared) return { connector: shared, consecutive: true };
    }

    // 2. Samme bindeord brugt 2+ gange i en kort tekst (<= 3 sætninger) eller 3+ gange i alt
    for (const c of connectors) {
        const usedCount = perSentence.filter(list => list.includes(c)).length;
        if ((sentences.length <= 3 && usedCount >= 2) || usedCount >= 3) {
            return { connector: c, consecutive: false, usedCount };
        }
    }
    return null;
}

function findVerbAdjectiveMismatch(sentences) {
    const verbPart = ACTION_VERBS_DA.join('|');
    const adjPart = BARE_ADJECTIVES_DA.join('|');
    const re = new RegExp(
        `(?:^|[^a-zæøå])((?:${verbPart})(?:\\s+(?:jeg|vi|du|han|hun|de|man))?\\s+(?:rigtig\\s+|meget\\s+|lidt\\s+|helt\\s+)?(?:${adjPart}))(?=$|[,.!?]|\\s+(?:fordi|men|og|selvom|som|der|da|når)\\b)`,
        'i'
    );
    for (const s of sentences) {
        const m = s.match(re);
        if (m && m[1]) return m[1].trim();
    }
    return null;
}

function analyzeLocalHints(sentences, scenarioId, lang) {
    const observations = [];
    const prompts = [];
    const count = sentences.length;

    if (count === 0) {
        return [{
            title: swT('sh_h_empty_title', lang),
            text: swT('sh_h_empty_text', lang),
            link: { label: swT('sh_h_empty_link', lang), route: 'ordstilling' }
        }];
    }

    const fullText = sentences.join(' ');
    const lowerText = fullText.toLowerCase();

    // 1. V2-tjek i fritekst
    const v2Suspect = sentences.find(s => /^(i går|i weekenden|om morgenen|om aftenen|i dag|i morgen|derefter|derfor|desværre|sidste sommer|næste år|lige nu)\s+(jeg|vi|han|hun|de)\b/i.test(s.trim()));
    if (v2Suspect) {
        observations.push({
            title: swT('hint_v2_title', lang),
            text: swT('sh_h_v2_text', lang),
            link: { label: swT('hint_v2_link', lang), route: 'ordstilling' }
        });
    }

    // 2. Handlingsverbum + nøgent tillægsord
    const verbAdjMismatch = findVerbAdjectiveMismatch(sentences);
    if (verbAdjMismatch) {
        observations.push({
            title: swT('sh_h_verbadj_title', lang),
            text: swT('sh_h_verbadj_text', lang, { phrase: verbAdjMismatch }),
            link: { label: swT('sh_h_verbadj_link', lang), route: 'adjective_comparison' }
        });
    }

    // 3. Ordstamme-gentagelse i samme sætning
    const sameSentenceRep = findSameSentenceStemRepetition(sentences);
    if (sameSentenceRep) {
        const [w1, w2] = sameSentenceRep;
        const pairLabel = w1 === w2 ? `»${w1}« × 2` : `»${w1}« / »${w2}«`;
        observations.push({
            title: swT('sh_h_repword_title', lang),
            text: swT('sh_h_repword_text', lang, { pair: pairLabel }),
            link: { label: swT('sh_h_repword_link', lang), route: 'adjective_comparison' }
        });
    }

    // 4. Gentaget bindeord
    const repConn = findRepeatedConnector(sentences);
    if (repConn) {
        const alts = ['men', 'selvom', 'derfor', 'som / der'].filter(a => a !== repConn.connector).slice(0, 3).join('«, »');
        observations.push({
            title: swT('hint_repconn_title', lang, { conn: repConn.connector }),
            text: swT('hint_repconn_text', lang, { conn: repConn.connector, alts }),
            link: { label: swT('hint_repconn_link', lang), route: 'top_konjunktioner' }
        });
    }

    // Efter 1. sætning: spørgsmål om Plads 1 + eget meningstjek
    if (count === 1) {
        prompts.push({
            title: swT('sh_h_s1_title', lang),
            text: swT('sh_h_s1_text', lang),
            link: { label: swT('hint_v2_link', lang), route: 'ordstilling' }
        });
        prompts.push({
            title: swT('sh_h_meaning_title', lang),
            text: swT('sh_h_meaning_text', lang),
            link: { label: swT('sh_h_meaning_link', lang), route: 'top100_verber' }
        });
        return [...observations, ...prompts].slice(0, 2);
    }

    // 5. Gentagne starter med "Jeg"
    const lastTwo = sentences.slice(-2);
    if (lastTwo.every(s => /^jeg\b/i.test(s.trim()))) {
        observations.push({
            title: swT('hint_jeg_title', lang),
            text: swT('hint_jeg_text', lang),
            link: { label: swT('hint_jeg_link', lang), route: 'ordstilling' }
        });
    }

    // 6. Gentaget "god/godt/gode"
    const godMatches = lowerText.match(/(?:^|[^a-zæøå])god(?:t|e)?(?=$|[^a-zæøå])/g) || [];
    if (godMatches.length >= 2) {
        observations.push({
            title: swT('sh_h_god_title', lang),
            text: swT('sh_h_god_text', lang),
            link: { label: swT('sh_h_repword_link', lang), route: 'adjective_comparison' }
        });
    }

    if (observations.length > 0) {
        return observations.slice(0, 3);
    }

    // 7. Ved 2+ sætninger uden bindeord
    const hasConj = /\b(fordi|men|selvom|og|så)\b/i.test(lowerText);
    if (count >= 2 && !hasConj) {
        prompts.push({
            title: swT('hint_conj_title', lang),
            text: swT('hint_conj_text', lang),
            link: { label: swT('hint_conj_link', lang), route: 'top_konjunktioner' }
        });
    }

    // 8. Ved 3+ sætninger: relativsætning (som/der) eller at-sætning
    const hasRel = /\b(som|der)\b/i.test(lowerText);
    const hasAt = /,\s*at\b/i.test(lowerText);
    if (count >= 3 && !hasRel) {
        prompts.push({
            title: swT('hint_rel_title', lang),
            text: swT('hint_rel_text', lang),
            link: { label: swT('hint_rel_link', lang), route: 'ordstilling_saetningsdele' }
        });
    } else if (count >= 3 && !hasAt) {
        prompts.push({
            title: swT('hint_at_title', lang),
            text: swT('hint_at_text', lang),
            link: { label: swT('hint_at_link', lang), route: 'ordstilling_saetningsdele' }
        });
    }

    // 9. Sætningsrytme (mange helt korte sætninger)
    const shortCount = sentences.filter(s => s.trim().split(/\s+/).length <= 5).length;
    if (count >= 3 && shortCount >= 3 && prompts.length < 2) {
        prompts.push({
            title: swT('sh_h_short_title', lang),
            text: swT('sh_h_short_text', lang),
            link: { label: swT('hint_conj_link', lang), route: 'ordstilling_saetningsdele' }
        });
    }

    // 10. Ved 4+ sætninger: tidslinje og eget tjek
    if (count >= 4 && prompts.length < 2) {
        prompts.push({
            title: swT('sh_h_tense_title', lang),
            text: swT('sh_h_tense_text', lang),
            link: { label: swT('sh_h_tense_link', lang), route: 'punktet_og_broen' }
        });
    }

    // 11. Altid ærligt spørgsmål om mening + næste variation (aldrig vurderende ros)
    if (prompts.length < 2) {
        prompts.push({
            title: swT('sh_h_meaning_title', lang),
            text: swT('sh_h_meaning_text', lang),
            link: { label: swT('sh_h_meaning_link', lang), route: 'top100_verber' }
        });
    }

    if (prompts.length < 2) {
        prompts.push({
            title: swT('sh_h_nextvar_title', lang),
            text: swT('sh_h_nextvar_text', lang),
            link: { label: swT('sh_h_nextvar_link', lang), route: 'traen_tidsudtryk' }
        });
    }

    return prompts.slice(0, 2);
}

// ============================================================================
// STYLES (KØLIG SKANDINAVISK MINIMALISME — SAMME PALET SOM KLODS-HANS)
// ============================================================================
export function injectSkrivehjaelpStyles() {
    injectStyles();
}

function injectStyles() {
    if (document.getElementById('skrivehjaelp-nordic-styles')) return;
    const style = document.createElement('style');
    style.id = 'skrivehjaelp-nordic-styles';
    style.textContent = `
        .skrivehjaelp-container {
            width: 100%;
            max-width: 960px;
            margin: 0 auto;
            padding: 0.75rem 1rem 4rem;
            color: #f1f5f9;
            box-sizing: border-box;
            overflow-x: hidden;
        }
        .skrivehjaelp-container *,
        .skrivehjaelp-container *::before,
        .skrivehjaelp-container *::after {
            box-sizing: border-box;
        }
        .sh-header {
            margin: 0.6rem 0 1.2rem;
        }
        .sh-header h1 {
            margin: 0 0 0.35rem;
            font-size: clamp(1.6rem, 3.2vw, 2.1rem);
            font-weight: 800;
            color: #f1f5f9;
            letter-spacing: -0.02em;
        }
        .sh-header p {
            margin: 0;
            color: #94a3b8;
            font-size: 0.96rem;
            line-height: 1.55;
        }

        .sh-main-tabs {
            display: inline-flex;
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 12px;
            padding: 3px;
            gap: 4px;
            margin-bottom: 1.35rem;
        }
        .sh-main-tab {
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.55rem 1.15rem;
            border-radius: 9px;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            transition: all 0.16s ease;
        }
        .sh-main-tab:hover { color: #f1f5f9; }
        .sh-main-tab.active {
            background: #e2e8f0;
            color: #0f172a;
        }

        .sh-card {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.13);
            border-radius: 16px;
            padding: 1.25rem 1.35rem;
            margin-bottom: 1.15rem;
        }
        .sh-card-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.65rem;
            margin-bottom: 0.9rem;
        }
        .sh-card-title {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            font-size: 0.96rem;
            font-weight: 800;
            color: #f1f5f9;
            margin: 0;
        }
        .sh-meta-pill {
            font-size: 0.76rem;
            font-weight: 600;
            color: #94a3b8;
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.13);
            padding: 0.24rem 0.65rem;
            border-radius: 999px;
        }

        /* Rulle-ned-menu til emne-katalog */
        .sh-topic-picker {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 100%;
            min-width: 0;
        }
        .sh-topic-label {
            font-size: 0.8rem;
            font-weight: 700;
            color: #94a3b8;
            flex-shrink: 0;
        }
        .sh-topic-select {
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.24);
            color: #f1f5f9;
            padding: 0.44rem 0.85rem;
            border-radius: 9px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            min-width: 0;
            max-width: 100%;
            text-overflow: ellipsis;
        }
        .sh-topic-select:focus {
            outline: none;
            border-color: #4c9ba6;
        }

        .sh-doc-surface {
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 12px;
            padding: 1.05rem 1.2rem;
            min-height: 82px;
            line-height: 1.8;
            font-size: 1.04rem;
            color: #f1f5f9;
        }
        .sh-doc-empty {
            color: #64748b;
            font-style: italic;
            font-size: 0.94rem;
        }
        .sh-doc-sentence {
            display: inline;
            padding: 0.1rem 0.25rem;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.15s ease;
        }
        .sh-doc-sentence:hover {
            background: rgba(76, 155, 166, 0.2);
        }
        .sh-rev-mark {
            background: rgba(76, 155, 166, 0.28);
            color: #f1f5f9;
            padding: 0.05rem 0.22rem;
            border-radius: 4px;
            border-bottom: 1.5px solid #7ec4ce;
        }
        .sh-rev-mark-soft {
            background: rgba(203, 213, 225, 0.08);
            color: #f1f5f9;
            padding: 0.05rem 0.18rem;
            border-radius: 4px;
        }
        .sh-inline-edit-row {
            margin-top: 0.7rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            align-items: center;
            background: #12171e;
            border: 1px solid rgba(76, 155, 166, 0.5);
            border-radius: 10px;
            padding: 0.6rem 0.75rem;
        }
        .sh-review-panel {
            margin-top: 0.95rem;
            background: #12171e;
            border: 1px solid rgba(76, 155, 166, 0.48);
            border-radius: 13px;
            padding: 1rem 1.1rem;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
        }
        .sh-review-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .sh-review-item {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.13);
            border-radius: 10px;
            padding: 0.7rem 0.85rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 0.75rem;
            cursor: pointer;
            transition: border-color 0.16s ease, background 0.16s ease;
        }
        .sh-review-item:hover {
            border-color: rgba(76, 155, 166, 0.45);
        }
        .sh-review-item.focused {
            border-color: #4c9ba6;
            background: #1a212b;
        }
        .sh-review-item.checked {
            border-color: rgba(76, 155, 166, 0.55);
            opacity: 0.88;
        }
        .sh-review-check-btn {
            flex-shrink: 0;
            background: transparent;
            border: 1px solid rgba(203, 213, 225, 0.25);
            color: #94a3b8;
            padding: 0.3rem 0.65rem;
            border-radius: 8px;
            font-size: 0.76rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
        }
        .sh-review-check-btn.done {
            background: rgba(43, 110, 120, 0.35);
            border-color: #4c9ba6;
            color: #e2f5f7;
        }
        .sh-review-done-banner {
            background: rgba(43, 110, 120, 0.22);
            border: 1px solid rgba(76, 155, 166, 0.5);
            border-radius: 10px;
            padding: 0.65rem 0.85rem;
            font-size: 0.84rem;
            color: #e2f5f7;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .sh-doc-actions {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 0.6rem;
            margin-top: 0.85rem;
        }

        .sh-hints-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 0.7rem;
            margin-top: 0.85rem;
        }
        .sh-hint-box {
            background: #12171e;
            border: 1px solid rgba(76, 155, 166, 0.42);
            border-left: 3px solid #4c9ba6;
            border-radius: 10px;
            padding: 0.7rem 0.9rem;
            display: flex;
            gap: 0.55rem;
            align-items: flex-start;
        }
        .sh-hint-icon {
            color: #7ec4ce;
            margin-top: 2px;
            flex-shrink: 0;
        }
        .sh-hint-title {
            font-size: 0.8rem;
            font-weight: 800;
            color: #7ec4ce;
            margin-bottom: 0.18rem;
        }
        .sh-hint-text {
            font-size: 0.82rem;
            color: #cbd5e1;
            line-height: 1.45;
        }
        .sh-hint-link {
            margin-top: 0.42rem;
            padding: 0;
            background: transparent;
            border: none;
            color: #7ec4ce;
            font-size: 0.78rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            text-decoration: none;
            transition: color 0.15s ease;
        }
        .sh-hint-link:hover {
            color: #bae6ed;
            text-decoration: underline;
        }

        .sh-chip {
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.15);
            color: #cbd5e1;
            padding: 0.44rem 0.82rem;
            border-radius: 9px;
            font-size: 0.84rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .sh-chip:hover {
            border-color: rgba(203, 213, 225, 0.38);
            color: #ffffff;
        }
        .sh-chip.active {
            background: #e2e8f0;
            border-color: #e2e8f0;
            color: #0f172a;
            font-weight: 700;
        }
        .sh-chip.petrol-active {
            background: rgba(43, 110, 120, 0.3);
            border-color: #4c9ba6;
            color: #e2f5f7;
            font-weight: 700;
        }

        .sh-flow-steps {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .sh-flow-node {
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.13);
            border-radius: 13px;
            padding: 0.95rem 1.05rem;
        }
        .sh-flow-node.active-node {
            border-color: rgba(76, 155, 166, 0.55);
        }
        .sh-flow-node-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            margin-bottom: 0.65rem;
            flex-wrap: wrap;
        }
        .sh-step-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 999px;
            background: #2b6e78;
            color: #ffffff;
            font-size: 0.76rem;
            font-weight: 800;
            margin-right: 0.45rem;
        }
        .sh-v2-tag {
            font-size: 0.72rem;
            font-weight: 700;
            color: #7ec4ce;
            background: rgba(43, 110, 120, 0.22);
            border: 1px solid rgba(76, 155, 166, 0.45);
            padding: 0.18rem 0.55rem;
            border-radius: 999px;
        }
        .sh-options-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 0.42rem;
            align-items: center;
        }
        .sh-custom-input {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.2);
            color: #f1f5f9;
            padding: 0.42rem 0.75rem;
            border-radius: 8px;
            font-size: 0.85rem;
            min-width: 175px;
        }
        .sh-custom-input:focus {
            outline: none;
            border-color: #4c9ba6;
        }
        .sh-flow-arrow {
            display: flex;
            justify-content: center;
            color: #4c9ba6;
            font-size: 0.9rem;
            line-height: 1;
            margin: -0.35rem 0;
        }

        .sh-preview-bar {
            margin-top: 1rem;
            background: #12171e;
            border: 1.5px solid rgba(76, 155, 166, 0.55);
            border-radius: 13px;
            padding: 0.95rem 1.1rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 0.85rem;
        }
        .sh-preview-text {
            font-size: 1.05rem;
            font-weight: 700;
            color: #f1f5f9;
        }

        .sh-btn-primary {
            background: #2b6e78;
            border: 1px solid #3d8b96;
            color: #ffffff;
            padding: 0.58rem 1.15rem;
            border-radius: 10px;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            transition: background 0.16s ease;
        }
        .sh-btn-primary:hover { background: #35838f; }
        .sh-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }
        .sh-btn-ghost {
            background: transparent;
            border: 1px solid rgba(203, 213, 225, 0.2);
            color: #cbd5e1;
            padding: 0.5rem 0.9rem;
            border-radius: 9px;
            font-size: 0.82rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            text-decoration: none;
            transition: all 0.16s ease;
        }
        .sh-btn-ghost:hover {
            border-color: rgba(203, 213, 225, 0.45);
            color: #ffffff;
            background: rgba(255, 255, 255, 0.05);
        }

        .sh-steps {
            margin: 0;
            padding-left: 1.2rem;
            display: grid;
            gap: 0.45rem;
            color: #cbd5e1;
            font-size: 0.92rem;
            line-height: 1.5;
        }
        .sh-prompt-pre {
            margin: 0;
            padding: 1rem 1.15rem;
            max-height: 360px;
            overflow-y: auto;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.84rem;
            line-height: 1.55;
            color: #cbd5e1;
            background: #101419;
            border-radius: 10px;
            border: 1px solid rgba(203, 213, 225, 0.12);
        }

        .sh-doc-br {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 0.72rem;
            color: #7ec4ce;
            background: rgba(76, 155, 166, 0.14);
            border: 1px solid rgba(76, 155, 166, 0.3);
            border-radius: 5px;
            padding: 0 0.3rem;
            margin: 0 0.15rem;
            cursor: pointer;
            vertical-align: baseline;
            line-height: 1.35;
        }
        .sh-doc-br:hover {
            background: rgba(76, 155, 166, 0.3);
            color: #f1f5f9;
        }
        .sh-reorder-btn {
            background: #171d26;
            color: #cbd5e1;
            border: 1px solid rgba(203, 213, 225, 0.22);
            border-radius: 7px;
            padding: 0.36rem 0.56rem;
            font-size: 0.82rem;
            font-weight: 800;
            cursor: pointer;
            line-height: 1;
            transition: background 0.14s ease, border-color 0.14s ease;
        }
        .sh-reorder-btn:hover:not(:disabled) {
            background: rgba(76, 155, 166, 0.2);
            border-color: #4c9ba6;
            color: #f8fafc;
        }
        .sh-reorder-btn:disabled {
            opacity: 0.35;
            cursor: not-allowed;
        }
        .sh-cog-note {
            margin-top: 0.55rem;
            padding: 0.48rem 0.72rem;
            border-radius: 8px;
            background: rgba(76, 155, 166, 0.1);
            border: 1px solid rgba(76, 155, 166, 0.28);
            font-size: 0.78rem;
            color: #cbd5e1;
            line-height: 1.45;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 0.45rem;
        }

        @media (max-width: 640px) {
            .skrivehjaelp-container {
                padding: 0.5rem 0.65rem 4.5rem;
            }
            .sh-header h1 {
                font-size: 1.45rem;
            }
            .sh-header p {
                font-size: 0.88rem;
            }
            .sh-card {
                padding: 0.9rem 0.8rem;
                border-radius: 13px;
            }
            .sh-card-head {
                flex-direction: column;
                align-items: stretch;
                gap: 0.55rem;
            }
            .sh-topic-picker {
                width: 100%;
                flex-direction: column;
                align-items: stretch;
                gap: 0.35rem;
            }
            .sh-topic-select {
                width: 100%;
                max-width: 100%;
                min-width: 0;
                font-size: 0.84rem;
            }
            .sh-hints-grid {
                grid-template-columns: 1fr;
            }
            .sh-flow-node {
                padding: 0.78rem 0.75rem;
            }
            .sh-chip {
                max-width: 100%;
                white-space: normal;
                text-align: left;
                line-height: 1.3;
                padding: 0.4rem 0.68rem;
                font-size: 0.8rem;
            }
            .sh-custom-input {
                width: 100% !important;
                min-width: 0 !important;
                flex: 1 1 100% !important;
                font-size: 16px;
            }
            .sh-preview-bar {
                position: sticky;
                bottom: 0;
                z-index: 25;
                flex-direction: column;
                align-items: stretch;
                padding: 0.72rem 0.8rem;
                background: rgba(16, 20, 25, 0.96);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                border: 1px solid rgba(76, 155, 166, 0.55);
                box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.45);
            }
            .sh-preview-bar > div {
                min-width: 0 !important;
                width: 100%;
            }
            .sh-preview-text {
                font-size: 0.94rem;
                line-height: 1.45;
                overflow-wrap: break-word;
            }
            .sh-doc-surface {
                padding: 0.85rem 0.9rem;
                font-size: 0.95rem;
                overflow-wrap: break-word;
            }
            .sh-doc-actions {
                flex-direction: column;
                align-items: stretch;
            }
            .sh-doc-actions > div {
                width: 100%;
            }
            .sh-btn-primary,
            .sh-btn-ghost {
                justify-content: center;
                font-size: 0.82rem;
                padding: 0.5rem 0.8rem;
            }
            .sh-review-item {
                flex-direction: column;
                align-items: stretch;
            }
        }
    `;
    document.head.appendChild(style);
}

function copyTextWithFeedback(text, btn, defaultLabel) {
    const done = () => {
        btn.textContent = 'Kopieret';
        setTimeout(() => { btn.innerHTML = defaultLabel; }, 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch {}
        document.body.removeChild(ta);
        done();
    }
}

export function renderSkrivehjaelpView(container, navigateFn) {
    injectStyles();
    ensureOrdstillingColorStyles();

    const STORAGE_KEY = 'lingcog_skrivevaerksted_v1';
    let sentences = [];
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (Array.isArray(saved)) sentences = saved;
    } catch {}

    function persist() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sentences)); } catch {}
    }

    let activeMainTab = 'workshop'; // 'workshop' | 'prompt'
    let activeScenarioId = 'dag';
    let startCategory = 'person';
    let extTab = 'conj'; // 'conj' | 'rel'
    let isReviewOpen = false;
    let activeReviewFocus = null; // 'v2' | 'tense' | 'connectors' | 'nouns' | 'whole' | null
    let checkedReviewIds = {};
    let colorCodesEnabled = getColorCodesEnabled();
    let editingSentenceIdx = null;
    function detectTwoVerbInversion(startStr) {
        const s = (startStr || '').trim().toLowerCase();
        if (!s) return false;
        return /^(i\s|på\s|om\s|næste\s|sidste\s|hver\s|derfor|derefter|bagefter|snart|ofte|normalt|heldigvis|desværre|til\s+sommer|til\s+vinter|efter\s|før\s|først\b|her\b|der\b)/.test(s) || s.endsWith(',');
    }

    function isGreetingSentence(s) {
        if (!s || s === '__BR__') return false;
        const t = s.trim();
        return /^(kære|hej|goddag)\b/i.test(t) || (t.endsWith(',') && t.length < 48);
    }

    function isSignoffSentence(s) {
        if (!s || s === '__BR__') return false;
        return /^(med\s+)?venlig\s+hilsen|^bedste\s+hilsner|^kærlig\s+hilsen|^hilsen\b/i.test(s.trim());
    }

    function formatDocHtml(list, focusId, editTitle) {
        let out = '';
        for (let i = 0; i < list.length; i++) {
            const s = list[i];
            const prev = i > 0 ? list[i - 1] : null;
            if (s === '__BR__') {
                out += `<span class="sh-doc-br" data-edit-idx="${i}" title="${escapeHtml(editTitle)}">¶</span><br/>`;
                continue;
            }
            if (i > 0 && prev !== '__BR__') {
                if (isGreetingSentence(prev)) {
                    out += '<br/><br/>';
                } else if (isSignoffSentence(s)) {
                    out += '<br/><br/>';
                } else {
                    out += ' ';
                }
            }
            out += `<span class="sh-doc-sentence" data-edit-idx="${i}" title="${escapeHtml(editTitle)}">${formatSentenceForReviewFocus(s, focusId)}</span>`;
        }
        return out;
    }

    function formatDocPlain(list) {
        let out = '';
        for (let i = 0; i < list.length; i++) {
            const s = list[i];
            const prev = i > 0 ? list[i - 1] : null;
            if (s === '__BR__') {
                if (!out.endsWith('\n\n')) out += '\n\n';
                continue;
            }
            if (i > 0 && prev !== '__BR__') {
                if (isGreetingSentence(prev) || isSignoffSentence(s)) {
                    out += '\n\n';
                } else {
                    out += ' ';
                }
            }
            out += s;
        }
        return out.trim();
    }

    let draft = {
        start: 'Jeg',
        verb: 'gik',
        invSubj: 'jeg',
        atSubj: 'dagen',
        atVerb: 'var',
        midAdv: '',
        twoVerb1: 'vil',
        twoVerb2: 'møde',
        twoVerbInv: false,
        kanModal: 'kan',
        kanAdv: 'godt',
        kanInf: 'lide at spise',
        object: 'en lang tur ved vandet',
        skipStep3: false,
        ext: ''
    };

    function resetDraftForScenario(scId, preferredCat = null) {
        const sc = SCENARIOS[scId];
        const defaultCat = preferredCat && sc.starts[preferredCat]
            ? preferredCat
            : (sc.starts.hilsen ? 'hilsen' : 'person');
        startCategory = defaultCat;
        extTab = 'conj';
        const firstStart = sc.starts[defaultCat].options[0];
        draft = {
            start: firstStart,
            verb: sc.verbs[0],
            invSubj: sc.invertedSubjects[0],
            atSubj: sc.atSubjects[0],
            atVerb: sc.atVerbs[0],
            midAdv: '',
            twoVerb1: 'vil',
            twoVerb2: (sc.twoVerb2Options && sc.twoVerb2Options[0]) || 'møde',
            twoVerbInv: detectTwoVerbInversion(firstStart),
            kanModal: 'kan',
            kanAdv: 'godt',
            kanInf: (sc.kanLideInfinitives && sc.kanLideInfinitives[0]) || 'lide at spise',
            object: sc.objects[0],
            skipStep3: false,
            ext: ''
        };
    }

    function buildDraftSentence() {
        const sc = SCENARIOS[activeScenarioId];
        const mode = sc.starts[startCategory]?.mode || 'normal';
        const parts = [];
        const midAdv = (draft.midAdv || '').trim();

        if (mode === 'greeting') {
            const g = (draft.start || '').trim();
            if (!g) return '';
            let out = g.charAt(0).toUpperCase() + g.slice(1);
            if (!/[,!.?]$/.test(out)) out += ',';
            return out;
        } else if (mode === 'at_clause') {
            if (draft.start.trim()) parts.push(draft.start.trim());
            if (draft.atSubj.trim()) parts.push(draft.atSubj.trim());
            if (midAdv) parts.push(midAdv);
            if (draft.atVerb.trim()) parts.push(draft.atVerb.trim());
            if (draft.object.trim()) parts.push(draft.object.trim());
        } else if (mode === 'two_verbs') {
            if (draft.start.trim()) parts.push(draft.start.trim());
            if ((draft.twoVerb1 || 'vil').trim()) parts.push((draft.twoVerb1 || 'vil').trim());
            if (draft.twoVerbInv && draft.invSubj.trim()) parts.push(draft.invSubj.trim());
            if (midAdv) parts.push(midAdv);
            if ((draft.twoVerb2 || '').trim()) parts.push(draft.twoVerb2.trim());
            if (draft.object.trim()) parts.push(draft.object.trim());
        } else if (mode === 'kan_lide') {
            if (draft.start.trim()) parts.push(draft.start.trim());
            if ((draft.kanModal || 'kan').trim()) parts.push((draft.kanModal || 'kan').trim());
            if (draft.kanAdv.trim()) parts.push(draft.kanAdv.trim());
            if (draft.kanInf.trim()) parts.push(draft.kanInf.trim());
            if (draft.object.trim()) parts.push(draft.object.trim());
        } else {
            if (draft.start.trim()) parts.push(draft.start.trim());
            if (draft.verb.trim()) parts.push(draft.verb.trim());
            if (mode === 'inversion' && draft.invSubj.trim()) parts.push(draft.invSubj.trim());
            if (midAdv) parts.push(midAdv);
            if (!(mode === 'normal' && draft.skipStep3) && draft.object.trim()) parts.push(draft.object.trim());
        }

        let s = parts.join(' ').replace(/\s+/g, ' ').trim();
        if (!s) return '';
        s = s.charAt(0).toUpperCase() + s.slice(1);
        if (draft.ext.trim()) {
            const ext = draft.ext.trim();
            s += (ext.startsWith(',') || ext.startsWith('.')) ? ext : ' ' + ext;
        }
        if (!/[.!?]$/.test(s)) s += '.';
        return s;
    }

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container skrivehjaelp-container';

    function render() {
        viewContainer.innerHTML = '';

        const topBar = document.createElement('div');
        topBar.className = 'top-bar';
        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn';
        backBtn.textContent = '← ' + getTranslation('back');
        backBtn.onclick = () => navigateFn('main');
        topBar.appendChild(backBtn);
        viewContainer.appendChild(topBar);

        const lang = getLang() || 'da';
        const rtlAttr = isSwRtl(lang) ? ' dir="rtl"' : '';

        const header = document.createElement('div');
        header.className = 'sh-header';
        header.innerHTML = `
            <h1${rtlAttr}>${getTranslation('skriveHjaelp') || 'Skrivehjælp'}</h1>
            <p${rtlAttr}>${swT('sh_subtitle', lang)}</p>
        `;
        viewContainer.appendChild(header);

        const mainTabs = document.createElement('div');
        mainTabs.className = 'sh-main-tabs';
        mainTabs.innerHTML = `
            <button type="button" class="sh-main-tab ${activeMainTab === 'workshop' ? 'active' : ''}" data-mtab="workshop"${rtlAttr}>
                ${SVG_FLOW}<span>${swT('sh_tab_workshop', lang)}</span>
            </button>
            <button type="button" class="sh-main-tab ${activeMainTab === 'prompt' ? 'active' : ''}" data-mtab="prompt"${rtlAttr}>
                ${SVG_PEN}<span>${swT('subtab_prompt', lang)}</span>
            </button>
        `;
        mainTabs.querySelectorAll('[data-mtab]').forEach(b => {
            b.onclick = () => {
                activeMainTab = b.dataset.mtab;
                render();
            };
        });
        viewContainer.appendChild(mainTabs);

        if (activeMainTab === 'workshop') {
            renderWorkshop(lang, rtlAttr);
        } else {
            renderPromptSubView(lang, rtlAttr);
        }
    }

    function renderWorkshop(lang, rtlAttr) {
        const sc = SCENARIOS[activeScenarioId];
        const mode = sc.starts[startCategory]?.mode || 'normal';
        const isGreeting = mode === 'greeting';
        const isInv = mode === 'inversion';
        const isAt = mode === 'at_clause';
        const isTwoVerbs = mode === 'two_verbs';
        const isKanLide = mode === 'kan_lide';
        const SVG_STOP = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`;
        const realSentences = sentences.filter(s => s !== '__BR__');
        const totalWords = realSentences.join(' ').trim().split(/\s+/).filter(Boolean).length;
        const hints = analyzeLocalHints(realSentences, activeScenarioId, lang);

        // 1. ØVERST: DET LEVENDE DOKUMENT ("Din tekst") + GRADVISE HINTS + GENNEMLÆS DIN TEKST
        const docCard = document.createElement('div');
        docCard.className = 'sh-card';
        const checkedCount = REVIEW_QUESTIONS.filter(q => checkedReviewIds[q.id]).length;
        const connectorCount = (realSentences.join(' ').toLowerCase().match(/\b(fordi|men|selvom|derfor|derefter|bagefter|alligevel|desuden|heldigvis|samtidig|og|så|som|der|at)\b/g) || []).length;

        docCard.innerHTML = `
            <div class="sh-card-head">
                <h2 class="sh-card-title"${rtlAttr}>${SVG_PEN}<span>${swT('sh_doc_title', lang)}</span></h2>
                <span class="sh-meta-pill"${rtlAttr}>${realSentences.length} ${realSentences.length === 1 ? swT('doc_meta_sent_one', lang) : swT('doc_meta_sent_many', lang)} · ${totalWords} ${swT('doc_meta_words', lang)}</span>
            </div>
            <div class="sh-doc-surface" id="sh-doc-surface" dir="ltr">
                ${realSentences.length === 0
                    ? `<span class="sh-doc-empty"${rtlAttr}>${swT('sh_doc_empty', lang)}</span>`
                    : formatDocHtml(sentences, isReviewOpen ? activeReviewFocus : null, swT('doc_edit_title', lang))
                }
            </div>
            ${editingSentenceIdx !== null && sentences[editingSentenceIdx] !== undefined ? `
                <div class="sh-inline-edit-row">
                    <button type="button" class="sh-reorder-btn" id="sh-inline-up-btn" title="${lang === 'en' ? 'Move up' : 'Flyt op'}" ${editingSentenceIdx === 0 ? 'disabled' : ''}>↑</button>
                    <button type="button" class="sh-reorder-btn" id="sh-inline-down-btn" title="${lang === 'en' ? 'Move down' : 'Flyt ned'}" ${editingSentenceIdx === sentences.length - 1 ? 'disabled' : ''}>↓</button>
                    ${sentences[editingSentenceIdx] === '__BR__' ? `
                        <span style="flex:1; font-size:0.84rem; color:#94a3b8; font-weight:600;">¶ ${lang === 'en' ? 'Paragraph break' : 'Afsnitsskift'}</span>
                    ` : `
                        <input type="text" class="sh-custom-input" id="sh-inline-edit-inp" dir="ltr" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${escapeHtml(sentences[editingSentenceIdx])}" style="flex:1; min-width:200px;" />
                        <button type="button" class="sh-btn-primary" id="sh-inline-save-btn" style="padding:0.42rem 0.85rem; font-size:0.8rem;">${swT('btn_save_edit', lang)}</button>
                    `}
                    <button type="button" class="sh-btn-ghost" id="sh-inline-del-btn" style="padding:0.4rem 0.75rem; font-size:0.78rem;">${SVG_TRASH}<span>${swT('btn_remove', lang)}</span></button>
                    <button type="button" class="sh-btn-ghost" id="sh-inline-cancel-btn" style="padding:0.4rem 0.75rem; font-size:0.78rem;">${swT('btn_cancel', lang)}</button>
                </div>
            ` : ''}
            ${!isReviewOpen ? `
                <div class="sh-hints-grid">
                    ${hints.map(h => `
                        <div class="sh-hint-box"${rtlAttr}>
                            <span class="sh-hint-icon">${SVG_HINT}</span>
                            <div>
                                <div class="sh-hint-title">${h.title}</div>
                                <div class="sh-hint-text">${h.text}</div>
                                ${h.link ? `<button type="button" class="sh-hint-link" data-hint-route="${h.link.route}">${h.link.label}</button>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="sh-review-panel" id="sh-review-panel"${rtlAttr}>
                    <div class="sh-review-head">
                        <div>
                            <div style="font-size:0.9rem; font-weight:800; color:#f1f5f9;">${swT('rev_title', lang)}</div>
                            <div style="font-size:0.78rem; color:#94a3b8;">${swT('rev_subtitle', lang)}</div>
                        </div>
                        <span class="sh-meta-pill">${checkedCount} ${swT('rev_checked_of', lang)}</span>
                    </div>
                    ${REVIEW_QUESTIONS.map(rq => {
                        const isDone = !!checkedReviewIds[rq.id];
                        const isFocused = activeReviewFocus === rq.id;
                        const extraInfo = (rq.id === 'connectors')
                            ? ` <span style="color:#7ec4ce; font-weight:700;">(${connectorCount} ${swT('sh_rev_conn_found', lang)})</span>`
                            : '';
                        return `
                            <div class="sh-review-item ${isFocused ? 'focused' : ''} ${isDone ? 'checked' : ''}" data-rev-focus="${rq.id}">
                                <div>
                                    <div style="font-size:0.84rem; font-weight:800; color:${isFocused ? '#7ec4ce' : '#f1f5f9'}; margin-bottom:0.2rem;">${swT(rq.titleKey, lang)}${extraInfo}</div>
                                    <div style="font-size:0.82rem; color:#cbd5e1; line-height:1.45;">${swT(rq.questionKey, lang)}</div>
                                </div>
                                <button type="button" class="sh-review-check-btn ${isDone ? 'done' : ''}" data-rev-check="${rq.id}">
                                    ${SVG_CHECK}<span>${isDone ? swT('rev_btn_checked', lang) : swT('rev_btn_check', lang)}</span>
                                </button>
                            </div>
                        `;
                    }).join('')}
                    ${checkedCount === REVIEW_QUESTIONS.length ? `
                        <div class="sh-review-done-banner">
                            <span>${swT('sh_rev_done', lang)}</span>
                        </div>
                    ` : ''}
                </div>
            `}
            <div class="sh-doc-actions">
                <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                    <button type="button" class="sh-btn-ghost" id="sh-add-br-btn" ${realSentences.length === 0 || sentences[sentences.length - 1] === '__BR__' ? 'disabled' : ''}>
                        <span>¶ ${lang === 'en' ? 'New paragraph' : 'Nyt afsnit'}</span>
                    </button>
                    <button type="button" class="sh-btn-ghost" id="sh-copy-doc-btn" ${realSentences.length === 0 ? 'disabled' : ''}>
                        ${SVG_COPY}<span>${swT('btn_copy_text', lang)}</span>
                    </button>
                    <button type="button" class="sh-btn-ghost" id="sh-clear-doc-btn" ${sentences.length === 0 ? 'disabled' : ''}>
                        ${SVG_TRASH}<span>${swT('btn_clear_text', lang)}</span>
                    </button>
                </div>
                ${realSentences.length > 0 ? `
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <button type="button" class="${isReviewOpen ? 'sh-btn-ghost' : 'sh-btn-primary'}" id="sh-toggle-review-btn">
                            ${SVG_CHECK}<span>${isReviewOpen ? swT('btn_review_close', lang) : swT('btn_review_open', lang)}</span>
                        </button>
                        <button type="button" class="${isReviewOpen ? 'sh-btn-primary' : 'sh-btn-ghost'}" id="sh-send-to-prompt-btn">
                            <span>${swT('sh_btn_to_prompt', lang)}</span><span>→</span>
                        </button>
                    </div>
                ` : ''}
            </div>
        `;

        docCard.querySelectorAll('[data-edit-idx]').forEach(el => {
            el.onclick = () => {
                editingSentenceIdx = parseInt(el.dataset.editIdx, 10);
                render();
            };
        });
        docCard.querySelectorAll('[data-hint-route]').forEach(btn => {
            btn.onclick = () => {
                const route = btn.dataset.hintRoute;
                if (route && typeof navigateFn === 'function') navigateFn(route);
            };
        });
        const inlineUpBtn = docCard.querySelector('#sh-inline-up-btn');
        if (inlineUpBtn) {
            inlineUpBtn.onclick = () => {
                if (editingSentenceIdx > 0) {
                    const tmp = sentences[editingSentenceIdx - 1];
                    sentences[editingSentenceIdx - 1] = sentences[editingSentenceIdx];
                    sentences[editingSentenceIdx] = tmp;
                    editingSentenceIdx -= 1;
                    persist();
                    render();
                }
            };
        }
        const inlineDownBtn = docCard.querySelector('#sh-inline-down-btn');
        if (inlineDownBtn) {
            inlineDownBtn.onclick = () => {
                if (editingSentenceIdx < sentences.length - 1) {
                    const tmp = sentences[editingSentenceIdx + 1];
                    sentences[editingSentenceIdx + 1] = sentences[editingSentenceIdx];
                    sentences[editingSentenceIdx] = tmp;
                    editingSentenceIdx += 1;
                    persist();
                    render();
                }
            };
        }
        const inlineSaveBtn = docCard.querySelector('#sh-inline-save-btn');
        if (inlineSaveBtn) {
            const saveEdit = () => {
                const val = (docCard.querySelector('#sh-inline-edit-inp')?.value || '').trim();
                if (val) {
                    sentences[editingSentenceIdx] = /[,!.?]$/.test(val) ? val : val + '.';
                } else {
                    sentences.splice(editingSentenceIdx, 1);
                }
                editingSentenceIdx = null;
                persist();
                render();
            };
            inlineSaveBtn.onclick = saveEdit;
            docCard.querySelector('#sh-inline-edit-inp').onkeydown = (e) => { if (e.key === 'Enter') saveEdit(); };
        }
        const inlineDelBtn = docCard.querySelector('#sh-inline-del-btn');
        if (inlineDelBtn) {
            inlineDelBtn.onclick = () => {
                sentences.splice(editingSentenceIdx, 1);
                editingSentenceIdx = null;
                if (sentences.length === 0) isReviewOpen = false;
                persist();
                render();
            };
        }
        const inlineCancelBtn = docCard.querySelector('#sh-inline-cancel-btn');
        if (inlineCancelBtn) {
            inlineCancelBtn.onclick = () => {
                editingSentenceIdx = null;
                render();
            };
        }
        const addBrBtn = docCard.querySelector('#sh-add-br-btn');
        if (addBrBtn && realSentences.length > 0 && sentences[sentences.length - 1] !== '__BR__') {
            addBrBtn.onclick = () => {
                sentences.push('__BR__');
                persist();
                render();
            };
        }
        const toggleRevBtn = docCard.querySelector('#sh-toggle-review-btn');
        if (toggleRevBtn) {
            toggleRevBtn.onclick = () => {
                isReviewOpen = !isReviewOpen;
                activeReviewFocus = isReviewOpen ? 'v2' : null;
                render();
            };
        }
        docCard.querySelectorAll('[data-rev-focus]').forEach(item => {
            item.onclick = () => {
                activeReviewFocus = item.dataset.revFocus;
                render();
            };
        });
        docCard.querySelectorAll('[data-rev-check]').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const rid = btn.dataset.revCheck;
                checkedReviewIds[rid] = !checkedReviewIds[rid];
                activeReviewFocus = rid;
                render();
            };
        });
        const copyDocBtn = docCard.querySelector('#sh-copy-doc-btn');
        if (copyDocBtn && realSentences.length > 0) {
            copyDocBtn.onclick = () => copyTextWithFeedback(formatDocPlain(sentences), copyDocBtn, `${SVG_COPY}<span>${swT('btn_copy_text', lang)}</span>`);
        }
        const clearDocBtn = docCard.querySelector('#sh-clear-doc-btn');
        if (clearDocBtn) {
            clearDocBtn.onclick = () => {
                sentences = [];
                isReviewOpen = false;
                activeReviewFocus = null;
                checkedReviewIds = {};
                editingSentenceIdx = null;
                persist();
                render();
            };
        }
        const toPromptBtn = docCard.querySelector('#sh-send-to-prompt-btn');
        if (toPromptBtn) {
            toPromptBtn.onclick = () => {
                activeMainTab = 'prompt';
                render();
            };
        }
        viewContainer.appendChild(docCard);

        // 2. FLOWCHART-SÆTNINGSBYGGEREN MED RULLE-NED-MENU
        const flowCard = document.createElement('div');
        flowCard.className = 'sh-card';
        const previewStr = buildDraftSentence();
        const previewHtml = buildColoredPreviewHtml({ mode, startCategory, draft, enabled: colorCodesEnabled });
        const activeExtList = extTab === 'rel' ? sc.extensionsRel : sc.extensionsConj;
        const startColor = getStartCategoryColor(startCategory);
        const step1BorderStyle = (colorCodesEnabled && startColor) ? `border-left: 3px solid ${startColor.dot};` : '';
        const step2BorderStyle = colorCodesEnabled ? `border-left: 3px solid ${ORDSTILLING_COLORS.verb.dot};` : '';
        const colorLabels = {
            noun: swT('col_noun', lang),
            verb: swT('col_verb', lang),
            adj: swT('col_adj', lang),
            sted: swT('col_sted', lang),
            tid: swT('col_tid', lang),
            toggleOn: swT('col_toggle_on', lang),
            toggleOff: swT('col_toggle_off', lang)
        };

        const MID_ADV_OPTIONS = [
            { label: lang === 'en' ? 'None' : 'Ingen', val: '' },
            { label: 'ikke', val: 'ikke' },
            { label: 'gerne', val: 'gerne' },
            { label: 'ofte', val: 'ofte' },
            { label: 'altid', val: 'altid' },
            { label: 'desværre', val: 'desværre' }
        ];
        const midAdvColorObj = { dot: '#38bdf8', bg: 'rgba(56, 189, 248, 0.14)', border: 'rgba(56, 189, 248, 0.5)' };
        const renderMidAdvRow = (labelText) => `
            <div class="sh-options-wrap" dir="ltr" style="margin-top:0.55rem;">
                <span${rtlAttr} style="font-size:0.76rem; color:${colorCodesEnabled ? '#38bdf8' : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                    ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:#38bdf8;"></span>` : ''}${labelText}
                </span>
                ${MID_ADV_OPTIONS.map(o => `
                    <button type="button" class="sh-chip ${draft.midAdv === o.val ? 'active' : ''}" data-pick-midadv="${o.val}" style="${o.val ? chipColorStyle(midAdvColorObj, draft.midAdv === o.val, colorCodesEnabled) : ''}">${o.label}</button>
                `).join('')}
            </div>
        `;
        const isDroemDatid = startCategory === 'droem_ramme' && /\b(havde|var|fik|hjalp)\b/i.test(draft.start || '');

        flowCard.innerHTML = `
            <div class="sh-card-head">
                <h2 class="sh-card-title"${rtlAttr}>${SVG_FLOW}<span>${swT('sh_flow_title', lang)}</span></h2>
                <label class="sh-topic-picker"${rtlAttr}>
                    <span class="sh-topic-label">${swT('sh_topic_label', lang)}</span>
                    <select class="sh-topic-select" id="sh-topic-select">
                        ${Object.values(SCENARIOS).map(s => `
                            <option value="${s.id}" ${s.id === activeScenarioId ? 'selected' : ''}>${swT(s.labelKey, lang)}</option>
                        `).join('')}
                    </select>
                </label>
            </div>

            ${renderColorLegendHtml(colorCodesEnabled, colorLabels)}

            <div class="sh-flow-steps">
                <!-- TRIN 1 -->
                <div class="sh-flow-node active-node" style="${step1BorderStyle}">
                    <div class="sh-flow-node-head"${rtlAttr}>
                        <div>
                            <span class="sh-step-num">1</span>
                            <strong>${swT('sh_step1_q', lang)}</strong>
                        </div>
                        <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
                            ${Object.entries(sc.starts).map(([k, cfg]) => {
                                const cObj = getStartCategoryColor(k);
                                const dotHtml = (colorCodesEnabled && cObj) ? `<span class="ord-col-dot" style="background:${cObj.dot}; margin-right:0.32rem;"></span>` : '';
                                return `
                                    <button type="button" class="sh-chip ${startCategory === k ? 'petrol-active' : ''}" data-start-cat="${k}" style="padding:0.28rem 0.65rem; font-size:0.76rem; display:inline-flex; align-items:center;">
                                        ${dotHtml}${cfg.labelFallback && swT(cfg.labelKey, lang) === cfg.labelKey ? cfg.labelFallback : swT(cfg.labelKey, lang)}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    <div class="sh-options-wrap" dir="ltr">
                        ${sc.starts[startCategory].options.map(opt => `
                            <button type="button" class="sh-chip ${draft.start === opt ? 'active' : ''}" data-pick-start="${opt}" style="${chipColorStyle(startColor, draft.start === opt, colorCodesEnabled)}">${opt}</button>
                        `).join('')}
                        <input type="text" class="sh-custom-input" id="sh-inp-start" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${sc.starts[startCategory].options.includes(draft.start) ? '' : escapeHtml(draft.start)}" placeholder="${escapeHtml(isGreeting ? 'Kære ...' : swT('sh_ph_start', lang))}" />
                    </div>
                    ${startCategory === 'droem_ramme' ? `
                        <div class="sh-cog-note"${rtlAttr}>
                            <span>${isDroemDatid
                                ? (lang === 'en' ? 'Distance (past tense): Imagine/wish — combine with "ville" or "kunne" in step 2.' : 'Afstand (datid): Drøm eller ønske — kombinér gerne med "ville" eller "kunne" i trin 2.')
                                : (lang === 'en' ? 'Closeness (present tense): Real plan — combine with a present-tense verb in step 2.' : 'Nærhed (nutid): Fast plan — kombinér med nutidsverbum i trin 2.')
                            }</span>
                            <button type="button" class="sh-hint-link" data-cog-route="sansning_hypotese_datid" style="margin-top:0;">${lang === 'en' ? 'See Station 3.6 →' : 'Se Station 3.6 (Nutid vs. Datid) →'}</button>
                        </div>
                    ` : ''}
                </div>

                ${!isGreeting ? `
                <div class="sh-flow-arrow">↓</div>

                <!-- TRIN 2 -->
                <div class="sh-flow-node active-node" style="${step2BorderStyle}">
                    <div class="sh-flow-node-head"${rtlAttr}>
                        <div style="display:inline-flex; align-items:center; gap:0.35rem;">
                            <span class="sh-step-num">2</span>
                            ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.verb.dot};"></span>` : ''}
                            <strong>${isAt ? swT('sh_step2_at', lang) : isKanLide ? swT('sh_step2_kan_lide', lang) : isTwoVerbs ? (lang === 'en' ? 'Two verbs (frame): modal + action' : 'To verber (handlings-rammen)') : swT('sh_step2_normal', lang)}</strong>
                        </div>
                        ${isInv ? `<span class="sh-v2-tag">${swT('sh_v2_active', lang)}</span>` : ''}
                        ${isAt ? `<span class="sh-v2-tag">${swT('sh_at_active', lang)}</span>` : ''}
                        ${isTwoVerbs ? `<span class="sh-v2-tag">${draft.twoVerbInv ? (lang === 'en' ? 'V2 split frame' : 'V2-spaltet ramme') : (lang === 'en' ? 'Verb 1 + Verb 2' : 'Verbum 1 + Verbum 2')}</span>` : ''}
                        ${isKanLide ? `<span class="sh-v2-tag">${swT('sh_kan_lide_tag', lang)}</span>` : ''}
                    </div>
                    ${isAt ? `
                        <div class="sh-options-wrap" dir="ltr" style="margin-bottom:0.55rem;">
                            <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.noun.text : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.noun.dot};"></span>` : ''}${swT('sh_at_subj_lbl', lang)}
                            </span>
                            ${sc.atSubjects.map(sub => `
                                <button type="button" class="sh-chip ${draft.atSubj === sub ? 'petrol-active' : ''}" data-pick-atsubj="${sub}" style="${chipColorStyle(ORDSTILLING_COLORS.noun, draft.atSubj === sub, colorCodesEnabled)}">${sub}</button>
                            `).join('')}
                        </div>
                        ${renderMidAdvRow(lang === 'en' ? 'Small word (before verb in at-clause):' : 'Småord (foran verbet i at-sætning):')}
                        <div class="sh-options-wrap" dir="ltr" style="margin-top:0.55rem;">
                            ${sc.atVerbs.map(v => `
                                <button type="button" class="sh-chip ${draft.atVerb === v ? 'active' : ''}" data-pick-atverb="${v}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.atVerb === v, colorCodesEnabled)}">${v}</button>
                            `).join('')}
                            <input type="text" class="sh-custom-input" id="sh-inp-atverb" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${sc.atVerbs.includes(draft.atVerb) ? '' : escapeHtml(draft.atVerb)}" placeholder="${escapeHtml(swT('sh_ph_verb', lang))}" />
                        </div>
                    ` : isTwoVerbs ? `
                        <div class="sh-options-wrap" dir="ltr" style="margin-bottom:0.55rem;">
                            <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.verb.text : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.verb.dot};"></span>` : ''}${lang === 'en' ? '1. verb (place 2):' : '1. verbum (Plads 2):'}
                            </span>
                            ${['vil', 'skal', 'kan', 'har', 'ville', 'kunne'].map(m => `
                                <button type="button" class="sh-chip ${draft.twoVerb1 === m ? 'active' : ''}" data-pick-tv1="${m}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.twoVerb1 === m, colorCodesEnabled)}">${m}</button>
                            `).join('')}
                        </div>
                        ${draft.twoVerbInv ? `
                            <div class="sh-options-wrap" dir="ltr" style="margin-bottom:0.55rem;">
                                <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.noun.text : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                    ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.noun.dot};"></span>` : ''}${swT('lbl_place3_subj', lang)}
                                </span>
                                ${sc.invertedSubjects.map(sub => `
                                    <button type="button" class="sh-chip ${draft.invSubj === sub ? 'petrol-active' : ''}" data-pick-invsubj="${sub}" style="${chipColorStyle(ORDSTILLING_COLORS.noun, draft.invSubj === sub, colorCodesEnabled)}">${sub}</button>
                                `).join('')}
                            </div>
                        ` : ''}
                        ${renderMidAdvRow(lang === 'en' ? 'Small word (between the two verbs):' : 'Småord (mellem de to verber):')}
                        <div class="sh-options-wrap" dir="ltr" style="margin-top:0.55rem;">
                            <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.verb.text : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.verb.dot};"></span>` : ''}${lang === 'en' ? '2. verb (action):' : '2. verbum (handling):'}
                            </span>
                            ${(sc.twoVerb2Options || ['møde', 'finde', 'lave']).map(v2 => `
                                <button type="button" class="sh-chip ${draft.twoVerb2 === v2 ? 'active' : ''}" data-pick-tv2="${v2}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.twoVerb2 === v2, colorCodesEnabled)}">${v2}</button>
                            `).join('')}
                            <input type="text" class="sh-custom-input" id="sh-inp-tv2" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${(sc.twoVerb2Options || []).includes(draft.twoVerb2) ? '' : escapeHtml(draft.twoVerb2)}" placeholder="${lang === 'en' ? '2. verb ...' : '2. verbum ...'}" />
                        </div>
                    ` : isKanLide ? `
                        <div class="sh-options-wrap" dir="ltr" style="margin-bottom:0.55rem;">
                            <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.verb.text : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.verb.dot};"></span>` : ''}${swT('sh_lbl_modal', lang)}
                            </span>
                            ${['kan', 'kunne'].map(m => `
                                <button type="button" class="sh-chip ${draft.kanModal === m ? 'active' : ''}" data-pick-kanmodal="${m}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.kanModal === m, colorCodesEnabled)}">${m}</button>
                            `).join('')}
                        </div>
                        <div class="sh-options-wrap" dir="ltr" style="margin-bottom:0.55rem;">
                            <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? '#38bdf8' : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:#38bdf8;"></span>` : ''}${swT('sh_lbl_mid_adv', lang)}
                            </span>
                            ${['godt', 'rigtig godt', 'virkelig godt', 'ikke', 'bedst'].map(adv => `
                                <button type="button" class="sh-chip ${draft.kanAdv === adv ? 'active' : ''}" data-pick-kanadv="${adv}" style="${chipColorStyle({ dot: '#38bdf8', bg: 'rgba(56, 189, 248, 0.14)', border: 'rgba(56, 189, 248, 0.5)' }, draft.kanAdv === adv, colorCodesEnabled)}">${adv}</button>
                            `).join('')}
                        </div>
                        <div class="sh-options-wrap" dir="ltr">
                            <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.verb.text : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.verb.dot};"></span>` : ''}${swT('sh_lbl_infinitive', lang)}
                            </span>
                            ${(sc.kanLideInfinitives || ['lide at spise']).map(inf => `
                                <button type="button" class="sh-chip ${draft.kanInf === inf ? 'active' : ''}" data-pick-kaninf="${inf}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.kanInf === inf, colorCodesEnabled)}">${inf}</button>
                            `).join('')}
                            <input type="text" class="sh-custom-input" id="sh-inp-kaninf" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${(sc.kanLideInfinitives || []).includes(draft.kanInf) ? '' : escapeHtml(draft.kanInf)}" placeholder="lide at ..." />
                        </div>
                    ` : `
                        <div class="sh-options-wrap" dir="ltr">
                            ${sc.verbs.map(v => `
                                <button type="button" class="sh-chip ${draft.verb === v ? 'active' : ''}" data-pick-verb="${v}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.verb === v, colorCodesEnabled)}">${v}</button>
                            `).join('')}
                            <input type="text" class="sh-custom-input" id="sh-inp-verb" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${sc.verbs.includes(draft.verb) ? '' : escapeHtml(draft.verb)}" placeholder="${escapeHtml(swT('sh_ph_verb', lang))}" />
                        </div>
                        ${renderMidAdvRow(lang === 'en' ? 'Small word (after verb):' : 'Småord (efter verbet):')}
                    `}
                </div>

                <div class="sh-flow-arrow">↓</div>

                <!-- TRIN 3 -->
                <div class="sh-flow-node ${mode === 'normal' && draft.skipStep3 ? '' : 'active-node'}" style="${mode === 'normal' && draft.skipStep3 ? 'opacity:0.65;' : ''}">
                    <div class="sh-flow-node-head"${rtlAttr}>
                        <div><span class="sh-step-num">3</span><strong>${isInv ? swT('sh_step3_inv', lang) : swT('sh_step3_normal', lang)}</strong></div>
                        ${mode === 'normal' ? `
                            <button type="button" class="sh-chip" id="sh-toggle-skip-step3" aria-pressed="${draft.skipStep3 ? 'true' : 'false'}" style="display:inline-flex; align-items:center; gap:0.35rem; padding:0.26rem 0.65rem; font-size:0.75rem; ${draft.skipStep3 ? 'border-color:#ef4444; background:rgba(239,68,68,0.18); color:#fecaca;' : ''}">
                                ${SVG_STOP}<span>${draft.skipStep3 ? (lang === 'en' ? 'Step 3 off' : 'Trin 3 slået fra') : (lang === 'en' ? 'Skip step 3' : 'Slå trin 3 fra')}</span>
                            </button>
                        ` : ''}
                    </div>
                    ${!(mode === 'normal' && draft.skipStep3) ? `
                        ${isInv ? `
                            <div class="sh-options-wrap" dir="ltr" style="margin-bottom:0.55rem;">
                                <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.noun.text : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                    ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.noun.dot};"></span>` : ''}${swT('lbl_place3_subj', lang)}
                                </span>
                                ${sc.invertedSubjects.map(sub => `
                                    <button type="button" class="sh-chip ${draft.invSubj === sub ? 'petrol-active' : ''}" data-pick-invsubj="${sub}" style="${chipColorStyle(ORDSTILLING_COLORS.noun, draft.invSubj === sub, colorCodesEnabled)}">${sub}</button>
                                `).join('')}
                            </div>
                        ` : ''}
                        <div class="sh-options-wrap" dir="ltr">
                            ${sc.objects.map(obj => {
                                const objColor = classifyObjectColor(obj);
                                return `<button type="button" class="sh-chip ${draft.object === obj ? 'active' : ''}" data-pick-obj="${obj}" style="${chipColorStyle(objColor, draft.object === obj, colorCodesEnabled)}">${obj}</button>`;
                            }).join('')}
                            <input type="text" class="sh-custom-input" id="sh-inp-obj" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${sc.objects.includes(draft.object) ? '' : escapeHtml(draft.object)}" placeholder="${escapeHtml(swT('sh_ph_obj', lang))}" style="flex:1; min-width:210px;" />
                        </div>
                    ` : ''}
                </div>

                <div class="sh-flow-arrow">↓</div>

                <!-- TRIN 4: VALGFRI UDVIDELSE (ÅRSAG/KONTRAST ELLER SOM/DER-UDDYBNING) -->
                <div class="sh-flow-node">
                    <div class="sh-flow-node-head"${rtlAttr}>
                        <div><span class="sh-step-num">4</span><strong>${swT('sh_step4_title', lang)}</strong></div>
                        <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
                            <button type="button" class="sh-chip ${extTab === 'conj' ? 'petrol-active' : ''}" data-ext-tab="conj" style="padding:0.26rem 0.62rem; font-size:0.75rem;">
                                ${swT('ext_tab_conj', lang)}
                            </button>
                            <button type="button" class="sh-chip ${extTab === 'rel' ? 'petrol-active' : ''}" data-ext-tab="rel" style="padding:0.26rem 0.62rem; font-size:0.75rem;">
                                ${swT('ext_tab_rel', lang)}
                            </button>
                        </div>
                    </div>
                    <div class="sh-options-wrap" dir="ltr">
                        ${activeExtList.map(ex => `
                            <button type="button" class="sh-chip ${draft.ext === ex.text ? 'active' : ''}" data-pick-ext="${ex.text}">${ex.text === '' ? swT('ext_none', lang) : ex.label}</button>
                        `).join('')}
                        <input type="text" class="sh-custom-input" id="sh-inp-ext" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${activeExtList.some(e => e.text === draft.ext) ? '' : escapeHtml(draft.ext)}" placeholder="${escapeHtml(swT('sh_ph_ext', lang))}" style="flex:1; min-width:210px;" />
                    </div>
                </div>
                ` : ''}
            </div>

            <!-- LIVE PREVIEW + TILFØJ -->
            <div class="sh-preview-bar">
                <div>
                    <div${rtlAttr} style="font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#7ec4ce; margin-bottom:0.2rem;">${swT('sh_preview_title', lang)}</div>
                    <div class="sh-preview-text" id="sh-preview-text" dir="ltr">${previewHtml || swT('sh_preview_empty', lang)}</div>
                </div>
                <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                    <button type="button" class="sh-btn-ghost" id="sh-reset-draft-btn">${swT('sh_btn_reset', lang)}</button>
                    <button type="button" class="sh-btn-primary" id="sh-add-sentence-btn" ${!previewStr ? 'disabled' : ''}>
                        ${SVG_ARROW_UP}<span>${swT('sh_btn_add', lang)}</span>
                    </button>
                </div>
            </div>
        `;

        const colorToggleBtn = flowCard.querySelector('[data-toggle-color-codes]');
        if (colorToggleBtn) {
            colorToggleBtn.onclick = () => {
                colorCodesEnabled = !colorCodesEnabled;
                setColorCodesEnabled(colorCodesEnabled);
                render();
            };
        }

        // Emne-dropdown
        const topicSel = flowCard.querySelector('#sh-topic-select');
        if (topicSel) {
            topicSel.onchange = (e) => {
                activeScenarioId = e.target.value;
                resetDraftForScenario(activeScenarioId);
                render();
            };
        }

        flowCard.querySelectorAll('[data-start-cat]').forEach(b => {
            b.onclick = () => {
                startCategory = b.dataset.startCat;
                draft.start = sc.starts[startCategory].options[0];
                if (sc.starts[startCategory]?.mode === 'two_verbs') {
                    draft.twoVerbInv = detectTwoVerbInversion(draft.start);
                }
                render();
            };
        });
        flowCard.querySelectorAll('[data-cog-route]').forEach(btn => {
            btn.onclick = () => {
                const route = btn.dataset.cogRoute;
                if (route && typeof navigateFn === 'function') navigateFn(route);
            };
        });
        flowCard.querySelectorAll('[data-ext-tab]').forEach(b => {
            b.onclick = () => {
                extTab = b.dataset.extTab;
                render();
            };
        });
        flowCard.querySelectorAll('[data-pick-start]').forEach(b => {
            b.onclick = () => {
                draft.start = b.dataset.pickStart;
                if (mode === 'two_verbs') {
                    draft.twoVerbInv = detectTwoVerbInversion(draft.start);
                }
                if (startCategory === 'droem_ramme') {
                    if (/\b(havde|var|fik|hjalp)\b/i.test(draft.start) && sc.verbs.includes('ville')) {
                        draft.verb = 'ville';
                    } else if (!/\b(havde|var|fik|hjalp)\b/i.test(draft.start) && (draft.verb === 'ville' || draft.verb === 'kunne')) {
                        draft.verb = sc.verbs[0];
                    }
                }
                render();
            };
        });
        flowCard.querySelectorAll('[data-pick-verb]').forEach(b => {
            b.onclick = () => { draft.verb = b.dataset.pickVerb; render(); };
        });
        flowCard.querySelectorAll('[data-pick-midadv]').forEach(b => {
            b.onclick = () => { draft.midAdv = b.dataset.pickMidadv; render(); };
        });
        flowCard.querySelectorAll('[data-pick-tv1]').forEach(b => {
            b.onclick = () => { draft.twoVerb1 = b.dataset.pickTv1; render(); };
        });
        flowCard.querySelectorAll('[data-pick-tv2]').forEach(b => {
            b.onclick = () => { draft.twoVerb2 = b.dataset.pickTv2; render(); };
        });
        flowCard.querySelectorAll('[data-pick-atsubj]').forEach(b => {
            b.onclick = () => { draft.atSubj = b.dataset.pickAtsubj; render(); };
        });
        flowCard.querySelectorAll('[data-pick-atverb]').forEach(b => {
            b.onclick = () => { draft.atVerb = b.dataset.pickAtverb; render(); };
        });
        flowCard.querySelectorAll('[data-pick-kanmodal]').forEach(b => {
            b.onclick = () => { draft.kanModal = b.dataset.pickKanmodal; render(); };
        });
        flowCard.querySelectorAll('[data-pick-kanadv]').forEach(b => {
            b.onclick = () => { draft.kanAdv = b.dataset.pickKanadv; render(); };
        });
        flowCard.querySelectorAll('[data-pick-kaninf]').forEach(b => {
            b.onclick = () => { draft.kanInf = b.dataset.pickKaninf; render(); };
        });
        flowCard.querySelectorAll('[data-pick-invsubj]').forEach(b => {
            b.onclick = () => { draft.invSubj = b.dataset.pickInvsubj; render(); };
        });
        flowCard.querySelectorAll('[data-pick-obj]').forEach(b => {
            b.onclick = () => { draft.object = b.dataset.pickObj; render(); };
        });
        flowCard.querySelectorAll('[data-pick-ext]').forEach(b => {
            b.onclick = () => { draft.ext = b.dataset.pickExt; render(); };
        });

        const liveUpdatePreview = () => {
            const p = flowCard.querySelector('#sh-preview-text');
            const addBtn = flowCard.querySelector('#sh-add-sentence-btn');
            const s = buildDraftSentence();
            const html = buildColoredPreviewHtml({ mode, startCategory, draft, enabled: colorCodesEnabled });
            if (p) p.innerHTML = html || swT('sh_preview_empty', lang);
            if (addBtn) addBtn.disabled = !s;
        };

        const skipStep3Btn = flowCard.querySelector('#sh-toggle-skip-step3');
        if (skipStep3Btn) {
            skipStep3Btn.onclick = () => {
                draft.skipStep3 = !draft.skipStep3;
                render();
            };
        }

        flowCard.querySelector('#sh-inp-start').oninput = (e) => {
            draft.start = e.target.value;
            if (mode === 'two_verbs') {
                draft.twoVerbInv = detectTwoVerbInversion(draft.start);
            }
            liveUpdatePreview();
        };
        const inpVerb = flowCard.querySelector('#sh-inp-verb');
        if (inpVerb) inpVerb.oninput = (e) => { draft.verb = e.target.value; liveUpdatePreview(); };
        const inpAtVerb = flowCard.querySelector('#sh-inp-atverb');
        if (inpAtVerb) inpAtVerb.oninput = (e) => { draft.atVerb = e.target.value; liveUpdatePreview(); };
        const inpTv2 = flowCard.querySelector('#sh-inp-tv2');
        if (inpTv2) inpTv2.oninput = (e) => { draft.twoVerb2 = e.target.value; liveUpdatePreview(); };
        const inpKanInf = flowCard.querySelector('#sh-inp-kaninf');
        if (inpKanInf) inpKanInf.oninput = (e) => { draft.kanInf = e.target.value; liveUpdatePreview(); };
        const inpObj = flowCard.querySelector('#sh-inp-obj');
        if (inpObj) inpObj.oninput = (e) => { draft.object = e.target.value; liveUpdatePreview(); };
        const inpExt = flowCard.querySelector('#sh-inp-ext');
        if (inpExt) inpExt.oninput = (e) => { draft.ext = e.target.value; liveUpdatePreview(); };

        flowCard.querySelector('#sh-reset-draft-btn').onclick = () => {
            resetDraftForScenario(activeScenarioId);
            render();
        };

        flowCard.querySelector('#sh-add-sentence-btn').onclick = () => {
            const built = buildDraftSentence();
            if (!built) return;
            sentences.push(built);
            persist();
            // Nulstil alle alternative tekstbokse ved indsættelse
            let nextCat = startCategory;
            if (startCategory === 'hilsen') {
                nextCat = 'person';
            } else if (startCategory === 'person' && sentences.filter(x => x !== '__BR__').length === 1) {
                nextCat = 'sammenhaeng';
            }
            resetDraftForScenario(activeScenarioId, nextCat);
            render();
        };

        viewContainer.appendChild(flowCard);
    }

    function renderPromptSubView(lang, rtlAttr) {
        const plainUserText = formatDocPlain(sentences);
        if (plainUserText) {
            const draftCarryCard = document.createElement('div');
            draftCarryCard.className = 'sh-card';
            draftCarryCard.style.borderColor = 'rgba(76, 155, 166, 0.5)';
            draftCarryCard.innerHTML = `
                <div class="sh-card-head">
                    <h2 class="sh-card-title"${rtlAttr}>${SVG_PEN}<span>${swT('prompt_draft_label', lang)}</span></h2>
                    <button type="button" class="sh-btn-primary" id="sh-copy-user-text-btn">${SVG_COPY}<span>${swT('btn_copy_my_text', lang)}</span></button>
                </div>
                <div class="sh-doc-surface" dir="ltr" style="min-height:auto; white-space:pre-wrap;">${escapeHtml(plainUserText)}</div>
            `;
            const copyUserBtn = draftCarryCard.querySelector('#sh-copy-user-text-btn');
            copyUserBtn.onclick = () => copyTextWithFeedback(plainUserText, copyUserBtn, `${SVG_COPY}<span>${swT('btn_copy_my_text', lang)}</span>`);
            viewContainer.appendChild(draftCarryCard);
        }

        const guideCard = document.createElement('div');
        guideCard.className = 'sh-card';
        guideCard.innerHTML = `
            <div class="sh-card-head">
                <h2 class="sh-card-title"${rtlAttr}>${swT('subtab_prompt', lang)}</h2>
            </div>
            <p${rtlAttr} style="margin:0 0 0.85rem; font-size:0.88rem; color:#cbd5e1; line-height:1.6;">
                ${escapeHtml(swT('prompt_step1', lang))}<br/>
                ${escapeHtml(swT('prompt_step2', lang))}
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:0.6rem; margin-top:0.8rem;">
                <button type="button" id="copy-skrive-prompt-btn" class="sh-btn-primary">${SVG_COPY}<span>${swT('btn_copy_prompt', lang)}</span></button>
                <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" class="sh-btn-ghost">${swT('btn_open_gemini', lang)}</a>
                <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" class="sh-btn-ghost">${swT('btn_open_chatgpt', lang)}</a>
                <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer" class="sh-btn-ghost">${swT('btn_open_claude', lang)}</a>
            </div>
        `;
        const copyBtn = guideCard.querySelector('#copy-skrive-prompt-btn');
        copyBtn.onclick = () => copyTextWithFeedback(SKRIVEHJAELP_SYSTEM_PROMPT, copyBtn, `${SVG_COPY}<span>${swT('btn_copy_prompt', lang)}</span>`);
        viewContainer.appendChild(guideCard);

        const promptCard = document.createElement('div');
        promptCard.className = 'sh-card';
        promptCard.innerHTML = `
            <div class="sh-card-head">
                <span${rtlAttr} style="font-size:0.84rem; font-weight:700; color:#94a3b8;">${swT('subtab_prompt', lang)}</span>
                <button type="button" class="sh-btn-ghost" id="sh-mini-copy-prompt-btn">${SVG_COPY}<span>${swT('btn_copy_prompt', lang)}</span></button>
            </div>
            <pre class="sh-prompt-pre" dir="ltr"></pre>
        `;
        promptCard.querySelector('.sh-prompt-pre').textContent = SKRIVEHJAELP_SYSTEM_PROMPT;
        const miniCopy = promptCard.querySelector('#sh-mini-copy-prompt-btn');
        miniCopy.onclick = () => copyTextWithFeedback(SKRIVEHJAELP_SYSTEM_PROMPT, miniCopy, `${SVG_COPY}<span>${swT('btn_copy_prompt', lang)}</span>`);
        viewContainer.appendChild(promptCard);
    }

    render();
    container.appendChild(viewContainer);
}
