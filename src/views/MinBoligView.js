import { getTranslation, getLang } from '../utils/i18n.js';
import { shuffleArray } from '../utils/shuffle.js';
import { createPromptFlowSection } from '../utils/aiPromptHelper.js';

/**
 * MinBoligView — "Min bolig" under hovedfladen "Mit hverdagsliv" (Lær nye ord).
 *
 * Designet til to hovedformål:
 *   1. At lære kursisten centrale bolig-ord og faste udtryk, som ligger ud over de
 *      600 mest almindelige danske ord (fx en opgang, i stueetagen, på 2. sal, en altan,
 *      et rækkehus, kvadratmeter (m²), en husleje, en entré, et soveværelse, et badeværelse,
 *      en opvaskemaskine, et vaskerum, en baggård, en legeplads, en overbo/nabo, rummelig,
 *      hjælpsom, stille og rolig, tæt på indkøb).
 *   2. At stilladsere DU1 · Modul 4 mundtlig test (Opgave 1) ud fra SIRI's officielle
 *      Mindmap "Min bolig" med de 6 bokse:
 *        Boks 1: sted / by
 *        Boks 2: hus / lejlighed
 *        Boks 3: værelser / m²
 *        Boks 4: alene / sammen med
 *        Boks 5: naboer
 *        Boks 6: område
 *
 * Indeholder 6 interaktive træningsbaner:
 *   1. 🖼️ Vrimlebillede (24 bolig-ord) + De 6 Mindmap-bokse + 6-Boks Mindmap-sortering
 *   2. 🧩 Pusleøvelser & Sætningsbygning (Hvad tales om? → Hvad sker der? → Hvad/Hvordan? → Hvor/Hvornår?)
 *   3. 🔑 Possessive pronominer i boligen: min, mit, mine & vores (3 del-øvelser)
 *   4. 🗺️ Mindmap-værksted (Kun stikord! → 1–2 min. mundtlig præsentation til Del 1)
 *   5. 🎙️ Del 2: Testerens uddybende spørgsmål ("Kan du godt lide...? Hvorfor?") + AI-Testsimulator
 *   6. 🕵️ Bolig-detektiven i vrimlebilledet (12 billedjagt-missioner)
 */

export const MINDMAP_BOXES = {
    sted_by: {
        id: 'sted_by',
        num: 1,
        title: '1. sted / by',
        icon: '📍',
        color: '#38bdf8',
        border: 'rgba(56, 189, 248, 0.78)',
        bg: 'rgba(56, 189, 248, 0.16)',
        keywordsExample: 'Odense C • Nørregade • midt i byen • 2 år',
        oralQuestion: 'Hvor bor du – og hvor længe har du boet der?',
        modelSentence: 'Jeg bor i Odense på en stille vej, og jeg har boet der i to år.'
    },
    hus_lejlighed: {
        id: 'hus_lejlighed',
        num: 2,
        title: '2. hus / lejlighed',
        icon: '🏢',
        color: '#f59e0b',
        border: 'rgba(245, 158, 11, 0.78)',
        bg: 'rgba(245, 158, 11, 0.16)',
        keywordsExample: 'lejlighed • 2. sal • altan • til leje • husleje 6.500 kr.',
        oralQuestion: 'Bor du i hus eller i lejlighed – og hvilken etage bor du på?',
        modelSentence: 'Jeg bor til leje i en lejlighed på 2. sal med en solrig altan.'
    },
    vaerelser_m2: {
        id: 'vaerelser_m2',
        num: 3,
        title: '3. værelser / m²',
        icon: '📐',
        color: '#10b981',
        border: 'rgba(16, 185, 129, 0.78)',
        bg: 'rgba(16, 185, 129, 0.16)',
        keywordsExample: '78 m² • 3 værelser • lys stue • køkken • badeværelse • vaskerum',
        oralQuestion: 'Hvor stor er din bolig, og hvilke rum har den?',
        modelSentence: 'Min lejlighed er 78 kvadratmeter stor og har tre værelser, et køkken og et badeværelse.'
    },
    alene_sammen: {
        id: 'alene_sammen',
        num: 4,
        title: '4. alene / sammen med',
        icon: '👨‍👩‍👧‍👦',
        color: '#ec4899',
        border: 'rgba(236, 72, 153, 0.78)',
        bg: 'rgba(236, 72, 153, 0.16)',
        keywordsExample: 'sammen med min mand/kone • 2 børn • kat • (eller: bor alene)',
        oralQuestion: 'Bor du alene, eller hvem bor du sammen med?',
        modelSentence: 'Jeg bor sammen med min mand, vores to børn og vores lille kat.'
    },
    naboer: {
        id: 'naboer',
        num: 5,
        title: '5. naboer',
        icon: '🤝',
        color: '#a855f7',
        border: 'rgba(168, 85, 247, 0.78)',
        bg: 'rgba(168, 85, 247, 0.16)',
        keywordsExample: 'søde & hjælpsomme • hilser i opgangen • kaffe i gården • rolige',
        oralQuestion: 'Hvordan er dine naboer, og taler du med dem?',
        modelSentence: 'Mine naboer er meget søde og hjælpsomme, og vi hilser altid på hinanden i opgangen.'
    },
    omraade: {
        id: 'omraade',
        num: 6,
        title: '6. område',
        icon: '🌳',
        color: '#22c55e',
        border: 'rgba(34, 197, 94, 0.78)',
        bg: 'rgba(34, 197, 94, 0.16)',
        keywordsExample: 'stille & grønt • baggård med legeplads • tæt på indkøb, skole & bus',
        oralQuestion: 'Hvordan er dit område – og hvad ligger tæt på din bolig?',
        modelSentence: 'Mit område er grønt og roligt, og det ligger tæt på både supermarked og busstoppested.'
    }
};

const WORD_CLASS_META = {
    substantiv: { label: 'Substantiver (Navneord)', short: 'Substantiv', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.16)' },
    verbum: { label: 'Verber (Udsagnsord)', short: 'Verbum', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.16)' },
    adjektiv: { label: 'Adjektiver (Tillægsord)', short: 'Adjektiv', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.16)' },
    udtryk: { label: 'Adverbier & Faste udtryk', short: 'Fast udtryk', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.16)' }
};

// =========================================================================
// 24 MÅLORD & BOLIG-UDTRYK I VRIMLEBILLEDET (FORDELT PÅ DE 6 MINDMAP-BOKSE)
// =========================================================================
export const BOLIG_WORDS = [
    // --- BOKS 1: STED / BY (3) ---
    {
        num: 1,
        id: 'b1_forstad_bydel',
        word: 'en bydel / en forstad',
        shortLabel: 'en bydel / forstad',
        wordClass: 'substantiv',
        gender: 'en',
        possessive: 'min bydel / vores bydel',
        forms: 'Bestemt: bydelen / forstaden | Flertal: bydele / forstæder',
        mindmapBox: 'sted_by',
        x: 89,
        y: 16,
        icon: '🏙️',
        definition: 'Et bestemt kvarter i en by (en bydel) eller et boligområde lige uden for centrum (en forstad).',
        fixedTerms: 'i en rolig bydel • i en forstad til København / Aarhus',
        sentence: 'Jeg bor i en hyggelig bydel lidt uden for centrum.',
        stikordTip: 'På mindmappet under "sted / by" skriver du kun stikord som fx: "Aarhus V • rolig forstad".'
    },
    {
        num: 2,
        id: 'b2_stille_vej',
        word: 'en stille vej / gade',
        shortLabel: 'en stille vej',
        wordClass: 'substantiv',
        gender: 'en',
        possessive: 'min vej / min gade',
        forms: 'Bestemt: vejen / gaden | Flertal: veje / gader',
        mindmapBox: 'sted_by',
        x: 8,
        y: 91,
        icon: '🛣️',
        definition: 'En vej med meget lidt biltrafik og larm, hvor det er trygt og rart at bo.',
        fixedTerms: 'at bo på en stille vej • på en lukket villavej',
        sentence: 'Vores bolig ligger på en stille vej uden meget trafik.',
        stikordTip: 'Husk præpositionen "på" ved vej- og gadenavne: "Jeg bor PÅ Nørregade / PÅ en stille vej".'
    },
    {
        num: 3,
        id: 'b3_flytte_ind',
        word: 'at flytte ind (har boet der i...)',
        shortLabel: 'at flytte ind',
        wordClass: 'verbum',
        gender: '-',
        possessive: '-',
        forms: 'Nutid: flytter ind | Datid: flyttede ind | Førnutid: er flyttet ind',
        mindmapBox: 'sted_by',
        x: 58,
        y: 80,
        icon: '📦',
        definition: 'At tage en ny bolig i brug. Til testen fortæller man ofte, hvornår man flyttede ind, eller hvor længe man har boet der.',
        fixedTerms: 'vi flyttede ind for to år siden • jeg har boet her i tre år',
        sentence: 'Vi flyttede ind i lejligheden for to år siden.',
        stikordTip: 'Stikord på mindmappet: "2024 • 2 år".'
    },

    // --- BOKS 2: HUS / LEJLIGHED (5) ---
    {
        num: 4,
        id: 'b4_lejlighed',
        word: 'en lejlighed (til leje)',
        shortLabel: 'en lejlighed',
        wordClass: 'substantiv',
        gender: 'en',
        possessive: 'min lejlighed / vores lejlighed',
        forms: 'Bestemt: lejligheden | Flertal: lejligheder',
        mindmapBox: 'hus_lejlighed',
        x: 24,
        y: 8,
        icon: '🏢',
        definition: 'En bolig i en etageejendom med flere beboere. De fleste bor enten "til leje" (betaler husleje) eller i en ejer-/andelslejlighed.',
        fixedTerms: 'at bo i en lejlighed • at bo til leje • en 3-værelses lejlighed',
        sentence: 'Jeg bor til leje i en lys lejlighed i en gul murstensbygning.',
        stikordTip: 'Da "en lejlighed" er et n-ord, hedder det altid "MIN lejlighed"!'
    },
    {
        num: 5,
        id: 'b5_raekkehus',
        word: 'et rækkehus / et hus',
        shortLabel: 'et rækkehus',
        wordClass: 'substantiv',
        gender: 'et',
        possessive: 'mit rækkehus / mit hus / vores hus',
        forms: 'Bestemt: rækkehuset | Flertal: rækkehuse',
        mindmapBox: 'hus_lejlighed',
        x: 6,
        y: 44,
        icon: '🏡',
        definition: 'Et hus der er bygget sammen med nabohusene i en række, ofte med en lille forhave og baghave.',
        fixedTerms: 'at bo i et rækkehus • et rækkehus i to etager med lille have',
        sentence: 'Min søster bor i et hyggeligt rækkehus med en lille have.',
        stikordTip: 'Da "et hus / et rækkehus" er et t-ord, hedder det altid "MIT hus / MIT rækkehus"!'
    },
    {
        num: 6,
        id: 'b6_etage_2sal',
        word: 'i stueetagen / på 1. eller 2. sal',
        shortLabel: 'stueetagen / 2. sal',
        wordClass: 'udtryk',
        gender: 'en',
        possessive: 'min etage',
        forms: 'i stueetagen (nederst) • på 1. sal • på 2. sal',
        mindmapBox: 'hus_lejlighed',
        x: 19,
        y: 66,
        icon: '🪜',
        definition: 'Den nederste etage i Danmark hedder "stueetagen" (man siger I stueetagen). Etagerne ovenover hedder 1. sal, 2. sal osv. (man siger PÅ 2. sal).',
        fixedTerms: 'jeg bor i stueetagen • lejligheden ligger på 2. sal til højre',
        sentence: 'Min lejlighed ligger på anden sal, så der kommer masser af lys ind.',
        stikordTip: 'Husk forskellen: I stueetagen – men PÅ 1. sal / PÅ 2. sal!'
    },
    {
        num: 7,
        id: 'b7_altan',
        word: 'en altan',
        shortLabel: 'en altan',
        wordClass: 'substantiv',
        gender: 'en',
        possessive: 'min altan / vores altan',
        forms: 'Bestemt: altanen | Flertal: altaner',
        mindmapBox: 'hus_lejlighed',
        x: 14,
        y: 47,
        icon: '🪴',
        definition: 'En udendørs platform med gelænder ud fra en lejlighed på 1. sal eller højere, hvor man kan sidde i solen og have blomster.',
        fixedTerms: 'en solrig altan • at drikke kaffe ude på altanen',
        sentence: 'Vi har en dejlig altan med blomster, hvor vi drikker kaffe om sommeren.',
        stikordTip: 'På dansk siger man "ude PÅ altanen" og "MIN altan" (n-ord).'
    },
    {
        num: 8,
        id: 'b8_husleje',
        word: 'en husleje (inkl. vand og varme)',
        shortLabel: 'en husleje',
        wordClass: 'substantiv',
        gender: 'en',
        possessive: 'min husleje / vores husleje',
        forms: 'Bestemt: huslejen | Flertal: huslejer',
        mindmapBox: 'hus_lejlighed',
        x: 66,
        y: 14,
        icon: '💳',
        definition: 'Det beløb man betaler hver måned til udlejeren eller boligforeningen for at bo i en lejebolig.',
        fixedTerms: 'at betale husleje • en rimelig husleje • huslejen er 6.800 kr. om måneden',
        sentence: 'Min husleje er ikke så dyr, og den er inklusive varme.',
        stikordTip: 'Testeren spørger tit i Del 2: "Hvad giver du i husleje?" eller "Er det en dyr husleje?".'
    },

    // --- BOKS 3: VÆRELSER / M² (7) ---
    {
        num: 9,
        id: 'b9_kvadratmeter',
        word: 'kvadratmeter (m²) & rummelig',
        shortLabel: 'kvadratmeter (m²)',
        wordClass: 'substantiv',
        gender: 'en',
        possessive: '-',
        forms: '1 kvadratmeter • 75 kvadratmeter (m²) • adjektiv: rummelig / rummeligt',
        mindmapBox: 'vaerelser_m2',
        x: 38,
        y: 8,
        icon: '📏',
        definition: 'Måleenheden for, hvor stor en bolig er ("m²" udtales altid [kvadrat-meter]). Hvis der er god plads, kalder man boligen "rummelig".',
        fixedTerms: 'lejligheden er 75 kvadratmeter stor • en rummelig bolig med god plads',
        sentence: 'Vores lejlighed er 75 kvadratmeter stor og meget rummelig.',
        stikordTip: 'Når der står "m²" på mindmappet, skal du til den mundtlige test sige ordet "kvadratmeter" højt!'
    },
    {
        num: 10,
        id: 'b10_stue_lys',
        word: 'en lys stue',
        shortLabel: 'en lys stue',
        wordClass: 'substantiv',
        gender: 'en',
        possessive: 'min stue / vores stue',
        forms: 'Bestemt: stuen | Flertal: stuer • adjektiv: lys / lyst / lyse',
        mindmapBox: 'vaerelser_m2',
        x: 23,
        y: 38,
        icon: '🛋️',
        definition: 'Det største opholdsrum i boligen med sofa, fjernsyn og ofte spisebord. Et "lyst" rum har store vinduer med masser af dagslys.',
        fixedTerms: 'en stor og lys stue • at slappe af i sofaen i stuen',
        sentence: 'Vi har en stor, lys stue med sofa og spisebord.',
        stikordTip: '"En stue" er et n-ord → "MIN stue er lys og hyggelig".'
    },
    {
        num: 11,
        id: 'b11_koekken_opvaskemaskine',
        word: 'et køkken (med opvaskemaskine)',
        shortLabel: 'et køkken & opvaskemaskine',
        wordClass: 'substantiv',
        gender: 'et',
        possessive: 'mit køkken / vores køkken',
        forms: 'Bestemt: køkkenet | Flertal: køkkener • en opvaskemaskine',
        mindmapBox: 'vaerelser_m2',
        x: 45,
        y: 43,
        icon: '🍳',
        definition: 'Rummet hvor man laver mad, med komfur, køleskab og ofte en opvaskemaskine. Nogle boliger har "åbent køkken-alrum" sammen med stuen.',
        fixedTerms: 'et nyt køkken med opvaskemaskine • at lave aftensmad i køkkenet',
        sentence: 'Mit køkken er ikke så stort, men vi har heldigvis en opvaskemaskine.',
        stikordTip: 'Pas på kønnet: "ET køkken → MIT køkken", men "EN opvaskemaskine → MIN opvaskemaskine".'
    },
    {
        num: 12,
        id: 'b12_sovevaerelse',
        word: 'et soveværelse (& et børneværelse)',
        shortLabel: 'et soveværelse',
        wordClass: 'substantiv',
        gender: 'et',
        possessive: 'mit soveværelse / mine værelser',
        forms: 'Bestemt: soveværelset | Flertal: soveværelser (et værelse → mit værelse)',
        mindmapBox: 'vaerelser_m2',
        x: 29,
        y: 20,
        icon: '🛏️',
        definition: 'Værelset med seng og klædeskab, hvor man sover. Alle ord der slutter på "-værelse" er t-ord (et værelse, et soveværelse, et børneværelse).',
        fixedTerms: 'et roligt soveværelse mod gården • to børneværelser',
        sentence: 'Mit soveværelse vender ud mod den stille gård, så jeg sover godt om natten.',
        stikordTip: 'Husk reglen: ET værelse → MIT værelse (ental), men MINE værelser (flertal)!'
    },
    {
        num: 13,
        id: 'b13_badevaerelse',
        word: 'et badeværelse (med bruser)',
        shortLabel: 'et badeværelse',
        wordClass: 'substantiv',
        gender: 'et',
        possessive: 'mit badeværelse / vores badeværelse',
        forms: 'Bestemt: badeværelset | Flertal: badeværelser',
        mindmapBox: 'vaerelser_m2',
        x: 45,
        y: 19,
        icon: '🚿',
        definition: 'Rummet med toilet, håndvask og bruser (eller badekar). Også et t-ord, fordi det slutter på "-værelse".',
        fixedTerms: 'et lille badeværelse med bruser • gulvvarme på badeværelset',
        sentence: 'Vores badeværelse har lyse fliser og en god bruser.',
        stikordTip: 'ET badeværelse → MIT badeværelse.'
    },
    {
        num: 14,
        id: 'b14_entre',
        word: 'en entré / en gang',
        shortLabel: 'en entré',
        wordClass: 'substantiv',
        gender: 'en',
        possessive: 'min entré / vores entré',
        forms: 'Bestemt: entréen | Flertal: entréer',
        mindmapBox: 'vaerelser_m2',
        x: 39,
        y: 66,
        icon: '🧥',
        definition: 'Det første lille rum lige inden for hoveddøren, hvor man stiller skoene og hænger overtøjet.',
        fixedTerms: 'at hænge jakken i entréen • en lille entré med skohylde',
        sentence: 'Når man kommer ind ad døren, står man i min entré.',
        stikordTip: 'En entré (n-ord) → MIN entré.'
    },
    {
        num: 15,
        id: 'b15_vaskerum_kaelder',
        word: 'et vaskerum i kælderen',
        shortLabel: 'et vaskerum (kælder)',
        wordClass: 'substantiv',
        gender: 'et',
        possessive: 'vores vaskerum / mit kælderrum',
        forms: 'Bestemt: vaskerummet | en kælder (bestemt: kælderen)',
        mindmapBox: 'vaerelser_m2',
        x: 26,
        y: 88,
        icon: '🧺',
        definition: 'Et fælles rum i ejendommens kælder med vaskemaskiner og tørretumblere (og ofte et tørrerum eller kælderrum ved siden af).',
        fixedTerms: 'at vaske tøj i vaskerummet • et fælles vaskerum nede i kælderen',
        sentence: 'Nede i kælderen har vi et fælles vaskerum med gode vaskemaskiner.',
        stikordTip: 'Et rum / et vaskerum er et t-ord → MIT kælderrum / VORES vaskerum.'
    },

    // --- BOKS 4: ALENE / SAMMEN MED (3) ---
    {
        num: 16,
        id: 'b16_sammen_med_familie',
        word: 'at bo sammen med (ægtefælle & børn)',
        shortLabel: 'bo sammen med familie',
        wordClass: 'udtryk',
        gender: '-',
        possessive: 'min mand / min kone / mine børn',
        forms: 'jeg bor sammen med... • vi bor fire personer sammen',
        mindmapBox: 'alene_sammen',
        x: 31,
        y: 41,
        icon: '👨‍👩‍👧‍👦',
        definition: 'Bruges i boks 4 på mindmappet til at fortælle, hvem der deler boligen med dig (din partner, dine børn, en roomie eller et kæledyr).',
        fixedTerms: 'jeg bor sammen med min mand og mine to børn • vi har også en kat',
        sentence: 'Jeg bor sammen med min mand, vores to børn og en sød kat.',
        stikordTip: 'Her skifter pronominerne ofte fra "jeg / min / mit" til "vi / vores"!'
    },
    {
        num: 17,
        id: 'b17_bo_alene',
        word: 'at bo alene (for sig selv)',
        shortLabel: 'at bo alene',
        wordClass: 'udtryk',
        gender: '-',
        possessive: 'min egen lejlighed',
        forms: 'jeg bor alene • at nyde roen i sin egen bolig',
        mindmapBox: 'alene_sammen',
        x: 26,
        y: 67,
        icon: '🧑',
        definition: 'Når man er den eneste beboer i boligen og har sin egen fred og ro.',
        fixedTerms: 'jeg bor alene i en lejlighed i stueetagen • at bo for sig selv',
        sentence: 'Min nabo i stueetagen bor alene og nyder roen i sin lejlighed.',
        stikordTip: 'Hvis du bor alene, spørger testeren tit i Del 2: "Kan du godt lide at bo alene? Hvorfor?".'
    },
    {
        num: 18,
        id: 'b18_kaeledyr',
        word: 'et kæledyr (en hund / en kat)',
        shortLabel: 'et kæledyr (kat/hund)',
        wordClass: 'substantiv',
        gender: 'et',
        possessive: 'mit kæledyr / min kat / vores hund',
        forms: 'Bestemt: kæledyret | Flertal: kæledyr',
        mindmapBox: 'alene_sammen',
        x: 32.5,
        y: 53,
        icon: '🐱',
        definition: 'Et tamt dyr, der bor inde i boligen sammen med familien. I nogle lejeboliger må man gerne have husdyr, i andre ikke.',
        fixedTerms: 'det er tilladt at have kæledyr • at bo sammen med sin kat',
        sentence: 'Det er heldigvis tilladt at have kæledyr i vores ejendom.',
        stikordTip: 'ET kæledyr → MIT kæledyr, men EN kat / EN hund → MIN kat / MIN hund.'
    },

    // --- BOKS 5: NABOER (3) ---
    {
        num: 19,
        id: 'b19_opgang_hilse',
        word: 'en opgang (& at hilse på naboerne)',
        shortLabel: 'en opgang (hilse på)',
        wordClass: 'substantiv',
        gender: 'en',
        possessive: 'min opgang / vores opgang / mine naboer',
        forms: 'Bestemt: opgangen | Flertal: opgange • at hilse (hilser, hilste)',
        mindmapBox: 'naboer',
        x: 56,
        y: 35,
        icon: '👋',
        definition: 'Den fælles trappe i en etageejendom, der fører op til lejlighederne. I Danmark er det god skik altid at sige "Hej!" og hilse på sine naboer i opgangen.',
        fixedTerms: 'at møde sin overbo i opgangen • vi hilser altid på hinanden på trappen',
        sentence: 'Der bor seks familier i min opgang, og vi hilser altid på hinanden.',
        stikordTip: 'En opgang (n-ord) → MIN opgang. Naboer i flertal → MINE naboer.'
    },
    {
        num: 20,
        id: 'b20_hjaelpsom_soed',
        word: 'hjælpsom, sød & stille og rolig',
        shortLabel: 'hjælpsomme & søde naboer',
        wordClass: 'adjektiv',
        gender: '-',
        possessive: 'mine søde naboer',
        forms: 'en hjælpsom nabo • hjælpsomme naboer • stille og rolige',
        mindmapBox: 'naboer',
        x: 59,
        y: 55,
        icon: '💛',
        definition: 'De vigtigste tillægsord, når man beskriver gode naboer på dansk: "søde" (venlige), "hjælpsomme" (klar til at hjælpe med pakker eller blomster) og "stille og rolige" (larmer ikke om natten).',
        fixedTerms: 'søde og hjælpsomme naboer • vores overbo er meget stille og rolig',
        sentence: 'Mine naboer er både søde, hjælpsomme og meget stille og rolige.',
        stikordTip: 'Når substantivet er i flertal ("mine naboer"), får adjektivet -e/-me på: "søde og hjælpsomme".'
    },
    {
        num: 21,
        id: 'b21_baggaard_nabohygge',
        word: 'en gård / en baggård (med bord og bænke)',
        shortLabel: 'en baggård / gård',
        wordClass: 'substantiv',
        gender: 'en',
        possessive: 'vores gård / min baggård',
        forms: 'Bestemt: gården / baggården | Flertal: gårde',
        mindmapBox: 'naboer',
        x: 74,
        y: 55,
        icon: '☕',
        definition: 'Det fælles udendørs areal mellem boligblokkene, hvor naboerne kan mødes, drikke kaffe, grille og snakke sammen om sommeren.',
        fixedTerms: 'at drikke kaffe med naboerne nede i gården • en hyggelig grøn baggård',
        sentence: 'Om sommeren sidder vi tit nede i vores gård og drikker kaffe med naboerne.',
        stikordTip: 'Man siger altid "nede I gården".'
    },

    // --- BOKS 6: OMRÅDE (3) ---
    {
        num: 22,
        id: 'b22_groent_omraade_legeplads',
        word: 'et grønt område & en legeplads',
        shortLabel: 'grønt område & legeplads',
        wordClass: 'substantiv',
        gender: 'et',
        possessive: 'mit område / vores område',
        forms: 'et område (bestemt: området) • en legeplads (bestemt: legepladsen)',
        mindmapBox: 'omraade',
        x: 72,
        y: 38,
        icon: '🌳',
        definition: 'Et kvarter med træer, græs, park og en legeplads til børnene, så det føles trygt og rart at gå tur.',
        fixedTerms: 'et trygt og grønt område • en god legeplads til børnene',
        sentence: 'Mit område er meget grønt og børnevenligt med en god legeplads.',
        stikordTip: 'Pas på kønnet i boks 6: "ET område" er et t-ord → det hedder altid "MIT område"!'
    },
    {
        num: 23,
        id: 'b23_taet_paa_indkoeb',
        word: 'tæt på indkøb / supermarked',
        shortLabel: 'tæt på indkøb',
        wordClass: 'udtryk',
        gender: '-',
        possessive: '-',
        forms: 'tæt på + indkøb / skole / daginstitution / apotek (modsat: langt fra)',
        mindmapBox: 'omraade',
        x: 75,
        y: 78,
        icon: '🛒',
        definition: 'Det faste danske udtryk for kort afstand fra boligen til hverdagens vigtigste steder. "Indkøb" bruges som samleord for supermarkeder og butikker.',
        fixedTerms: 'boligen ligger tæt på indkøb • kun fem minutter fra et supermarked',
        sentence: 'Det bedste ved mit område er, at vi bor helt tæt på gode indkøbsmuligheder.',
        stikordTip: 'Brug parret "tæt på..." og "langt fra..." til at beskrive beliggenheden i boks 6.'
    },
    {
        num: 24,
        id: 'b24_offentlig_transport_bus',
        word: 'offentlig transport & et busstoppested',
        shortLabel: 'busstoppested & transport',
        wordClass: 'substantiv',
        gender: 'et',
        possessive: 'mit busstoppested',
        forms: 'et busstoppested (bestemt: busstoppestedet) • en cykelsti',
        mindmapBox: 'omraade',
        x: 92,
        y: 74,
        icon: '🚌',
        definition: 'Bus, tog, letbane eller metro samt gode cykelstier, der gør det nemt at komme fra boligen til arbejde og sprogskole.',
        fixedTerms: 'tæt på offentlig transport • bussen holder lige nede på hjørnet',
        sentence: 'Der ligger et busstoppested lige rundt om hjørnet, så det er nemt at komme til sprogskolen.',
        stikordTip: 'ET busstoppested → MIT busstoppested, EN cykelsti → MIN cykelsti.'
    }
];

// =========================================================================
// FANE 2: 12 PUSLEØVELSER OVER DE MEST ALMINDELIGE BOLIG-SÆTNINGER
// Struktur: 1. Hvad/Hvem tales om? -> 2. Hvad sker der? -> 3. Hvad/Hvordan? -> 4. Hvor/Hvornår?
// =========================================================================
const BOLIG_PUZZLES = [
    {
        boxId: 'sted_by',
        q: '1. [sted / by] Hvor bor du henne?',
        correct: ['Jeg', 'bor', 'i en hyggelig bydel', 'i Odense.'],
        scrambled: ['i Odense.', 'bor', 'Jeg', 'i en hyggelig bydel'],
        tip: '1. Jeg (Hvem tales om?) + 2. bor (Hvad sker der?) + 3. i en hyggelig bydel (Hvad/Hvordan?) + 4. i Odense (Hvor?).'
    },
    {
        boxId: 'sted_by',
        q: '2. [sted / by] Hvor længe har I boet på vejen?',
        correct: ['Vi', 'har boet', 'på en stille vej', 'i snart to år.'],
        scrambled: ['i snart to år.', 'på en stille vej', 'Vi', 'har boet'],
        tip: '1. Vi (Hvem tales om?) + 2. har boet (Hvad sker der?) + 3. på en stille vej (Hvor?) + 4. i snart to år (Hvornår / Hvor længe?).'
    },
    {
        boxId: 'hus_lejlighed',
        q: '3. [hus / lejlighed] Hvilken slags bolig og etage bor du i?',
        correct: ['Min lejlighed', 'ligger', 'på anden sal', 'i en gul bygning.'],
        scrambled: ['i en gul bygning.', 'ligger', 'på anden sal', 'Min lejlighed'],
        tip: '1. Min lejlighed (Hvad tales om?) + 2. ligger (Tilstand) + 3. på anden sal (Hvor højt?) + 4. i en gul bygning (Hvor?).'
    },
    {
        boxId: 'hus_lejlighed',
        q: '4. [hus / lejlighed] Hvad bruger I altanen til?',
        correct: ['Vi', 'drikker', 'varm kaffe', 'ude på vores altan om sommeren.'],
        scrambled: ['ude på vores altan om sommeren.', 'varm kaffe', 'Vi', 'drikker'],
        tip: '1. Vi (Hvem tales om?) + 2. drikker (Hvad sker der?) + 3. varm kaffe (Hvad?) + 4. ude på vores altan om sommeren (Hvor & hvornår?).'
    },
    {
        boxId: 'vaerelser_m2',
        q: '5. [værelser / m²] Hvor stor er boligen, og hvor mange værelser har den?',
        correct: ['Vores bolig', 'er', '78 kvadratmeter stor', 'og har tre lyse værelser.'],
        scrambled: ['og har tre lyse værelser.', '78 kvadratmeter stor', 'Vores bolig', 'er'],
        tip: '1. Vores bolig (Hvad tales om?) + 2. er (Tilstand) + 3. 78 kvadratmeter stor (Størrelse) + 4. og har tre lyse værelser (Indretning).'
    },
    {
        boxId: 'vaerelser_m2',
        q: '6. [værelser / m²] Hvor vasker beboerne deres tøj?',
        correct: ['Beboerne', 'vasker', 'deres tøj', 'i vaskerummet nede i kælderen.'],
        scrambled: ['i vaskerummet nede i kælderen.', 'Beboerne', 'vasker', 'deres tøj'],
        tip: '1. Beboerne (Hvem tales om?) + 2. vasker (Hvad sker der?) + 3. deres tøj (Hvad?) + 4. i vaskerummet nede i kælderen (Hvor?).'
    },
    {
        boxId: 'alene_sammen',
        q: '7. [alene / sammen med] Hvem bor du sammen med til daglig?',
        correct: ['Jeg', 'bor', 'sammen med min mand og mine to børn', 'i lejligheden.'],
        scrambled: ['i lejligheden.', 'sammen med min mand og mine to børn', 'bor', 'Jeg'],
        tip: '1. Jeg (Hvem tales om?) + 2. bor (Hvad sker der?) + 3. sammen med min mand og mine to børn (Med hvem?) + 4. i lejligheden (Hvor?).'
    },
    {
        boxId: 'alene_sammen',
        q: '8. [alene / sammen med] Hvordan bor din unge nabo?',
        correct: ['Min nabo', 'bor', 'helt alene', 'i en lille lejlighed i stueetagen.'],
        scrambled: ['i en lille lejlighed i stueetagen.', 'helt alene', 'Min nabo', 'bor'],
        tip: '1. Min nabo (Hvem tales om?) + 2. bor (Hvad sker der?) + 3. helt alene (Hvordan?) + 4. i en lille lejlighed i stueetagen (Hvor?).'
    },
    {
        boxId: 'naboer',
        q: '9. [naboer] Hvordan er forholdet til naboerne i ejendommen?',
        correct: ['Vi', 'hilser', 'altid venligt på mine naboer', 'ude i opgangen.'],
        scrambled: ['ude i opgangen.', 'hilser', 'altid venligt på mine naboer', 'Vi'],
        tip: '1. Vi (Hvem tales om?) + 2. hilser (Hvad sker der?) + 3. altid venligt på mine naboer (På hvem?) + 4. ude i opgangen (Hvor?).'
    },
    {
        boxId: 'naboer',
        q: '10. [naboer] Hvordan beskriver du dine naboer?',
        correct: ['Mine naboer', 'er', 'meget søde og hjælpsomme', 'i hverdagen.'],
        scrambled: ['i hverdagen.', 'meget søde og hjælpsomme', 'er', 'Mine naboer'],
        tip: '1. Mine naboer (Hvem tales om?) + 2. er (Tilstand) + 3. meget søde og hjælpsomme (Hvordan?) + 4. i hverdagen (Hvornår?).'
    },
    {
        boxId: 'omraade',
        q: '11. [område] Hvad ligger der tæt på dit område?',
        correct: ['Mit område', 'ligger', 'helt tæt på indkøb og bus', 'i gåafstand.'],
        scrambled: ['i gåafstand.', 'Mit område', 'helt tæt på indkøb og bus', 'ligger'],
        tip: '1. Mit område (Hvad tales om?) + 2. ligger (Tilstand) + 3. helt tæt på indkøb og bus (Hvor?) + 4. i gåafstand (Hvordan?).'
    },
    {
        boxId: 'omraade',
        q: '12. [område] Hvor leger børnene efter skole?',
        correct: ['Børnene', 'leger', 'trygt sammen', 'på legepladsen nede i gården.'],
        scrambled: ['på legepladsen nede i gården.', 'trygt sammen', 'Børnene', 'leger'],
        tip: '1. Børnene (Hvem tales om?) + 2. leger (Hvad sker der?) + 3. trygt sammen (Hvordan?) + 4. på legepladsen nede i gården (Hvor?).'
    }
];

// =========================================================================
// FANE 3: POSSESSIVE PRONOMINER I BOLIGEN (MIN, MIT, MINE & VORES)
// =========================================================================
const POSSESSIVE_DUELS = [
    { noun: 'lejlighed', article: 'en lejlighed (n-ord, ental)', answer: 'min', sentence: 'Jeg er rigtig glad for ___ lejlighed på 2. sal.', expl: '"En lejlighed" er fælleskøn (n-ord) i ental → derfor hedder det "min lejlighed".' },
    { noun: 'hus', article: 'et hus (t-ord, ental)', answer: 'mit', sentence: '___ hus har en lille grøn have.', expl: '"Et hus" er intetkøn (t-ord) i ental → derfor hedder det "mit hus".' },
    { noun: 'rækkehus', article: 'et rækkehus (t-ord, ental)', answer: 'mit', sentence: 'Jeg flyttede ind i ___ rækkehus sidste år.', expl: '"Et rækkehus" slutter på "-hus" (t-ord) → "mit rækkehus".' },
    { noun: 'stue', article: 'en stue (n-ord, ental)', answer: 'min', sentence: '___ stue er stor og har store vinduer.', expl: '"En stue" er et n-ord i ental → "min stue".' },
    { noun: 'køkken', article: 'et køkken (t-ord, ental)', answer: 'mit', sentence: 'Jeg laver mad i ___ køkken hver aften.', expl: '"Et køkken" er et t-ord i ental → "mit køkken".' },
    { noun: 'soveværelse', article: 'et soveværelse (t-ord, ental)', answer: 'mit', sentence: '___ soveværelse vender ud mod den stille gård.', expl: 'Alle ord der slutter på "-værelse" er t-ord i ental → "mit soveværelse".' },
    { noun: 'badeværelse', article: 'et badeværelse (t-ord, ental)', answer: 'mit', sentence: 'Der er gulvvarme på ___ badeværelse.', expl: '"Et badeværelse" er et t-ord i ental → "mit badeværelse".' },
    { noun: 'værelser (flertal)', article: 'tre værelser (flertal)', answer: 'mine', sentence: 'Alle ___ værelser i lejligheden er meget lyse.', expl: 'Selvom "et værelse" er et t-ord i ental, hedder ALLE ord i flertal "mine" → "mine værelser"!' },
    { noun: 'altan', article: 'en altan (n-ord, ental)', answer: 'min', sentence: 'Om sommeren sidder jeg tit ude på ___ altan.', expl: '"En altan" er et n-ord i ental → "min altan".' },
    { noun: 'husleje', article: 'en husleje (n-ord, ental)', answer: 'min', sentence: '___ husleje er 6.500 kroner om måneden.', expl: '"En husleje" er et n-ord i ental → "min husleje".' },
    { noun: 'opgang', article: 'en opgang (n-ord, ental)', answer: 'min', sentence: 'Der bor seks familier i ___ opgang.', expl: '"En opgang" er et n-ord i ental → "min opgang".' },
    { noun: 'naboer (flertal)', article: 'søde naboer (flertal)', answer: 'mine', sentence: '___ naboer er altid meget søde og hjælpsomme.', expl: '"Naboer" er flertal → i flertal bruger man altid "mine" ("mine naboer").' },
    { noun: 'område', article: 'et område (t-ord, ental)', answer: 'mit', sentence: '___ område er stille, grønt og tæt på indkøb.', expl: 'Vigtigt ord til boks 6 på mindmappet: "Et område" er et t-ord → "mit område"!' },
    { noun: 'entré', article: 'en entré (n-ord, ental)', answer: 'min', sentence: 'Jeg stiller skoene og hænger jakken i ___ entré.', expl: '"En entré" er et n-ord i ental → "min entré".' },
    { noun: 'børn (flertal)', article: 'to børn (flertal)', answer: 'mine', sentence: 'Jeg bor sammen med ___ to børn.', expl: '"Børn" er flertal (af "et barn") → i flertal hedder det "mine børn".' },
    { noun: 'kælderrum', article: 'et kælderrum (t-ord, ental)', answer: 'mit', sentence: 'Jeg har min cykel stående nede i ___ kælderrum.', expl: '"Et rum / et kælderrum" er et t-ord i ental → "mit kælderrum".' }
];

const POSSESSIVE_TRANSFORM_CHALLENGES = [
    {
        prompt: '1. Pas på bestemtheds-fælden! Hvilken sætning er grammatisk KORREKT på dansk?',
        options: [
            { text: 'Min lejlighed ligger på anden sal.', correct: true },
            { text: 'Min lejligheden ligger på anden sal.', correct: false },
            { text: 'Mit lejlighed ligger på anden sal.', correct: false }
        ],
        explanation: 'Efter "min / mit / mine / vores" står substantivet ALTID i ubestemt form (uden -en/-et til sidst): "min lejlighed" (aldrig "min lejligheden").'
    },
    {
        prompt: '2. Når du fortæller om HELE familien ("vi"), hvilket ejestedord bruger man så på dansk?',
        options: [
            { text: 'Vi er meget glade for vores lejlighed, vores køkken og vores naboer.', correct: true },
            { text: 'Vi er meget glade for mine lejlighed, mit køkken og vores naboerne.', correct: false },
            { text: 'Vi er meget glade for vores lejligheden.', correct: false }
        ],
        explanation: 'Når ejeren er "vi", hedder det "vores" foran BÅDE n-ord ("vores lejlighed"), t-ord ("vores køkken") og flertal ("vores naboer")!'
    },
    {
        prompt: '3. Hvad sker der med "et værelse" (t-ord), når du taler om flere værelser i flertal?',
        options: [
            { text: 'Ental: mit værelse → Flertal: mine værelser', correct: true },
            { text: 'Ental: mit værelse → Flertal: mit værelser', correct: false },
            { text: 'Ental: min værelse → Flertal: mine værelserne', correct: false }
        ],
        explanation: 'I ental følger vi kønnet ("mit værelse"), men i flertal skifter både n-ord og t-ord til "mine" ("mine værelser").'
    },
    {
        prompt: '4. Vælg den sætning, hvor både "køkken" (t-ord), "stue" (n-ord) og "område" (t-ord) har det rigtige pronomen:',
        options: [
            { text: 'Mit køkken er nyt, min stue er lys, og mit område er roligt.', correct: true },
            { text: 'Min køkken er nyt, mit stue er lys, og min område er roligt.', correct: false },
            { text: 'Mine køkken er nyt, min stue er lys, og mit området er roligt.', correct: false }
        ],
        explanation: 'Et køkken → mit køkken; en stue → min stue; et område → mit område.'
    },
    {
        prompt: '5. I boks 4 ("alene / sammen med") fortæller du om din nabo Jonas (3. person: han). Hvad hedder det på dansk?',
        options: [
            { text: 'Jonas bor alene i sin lejlighed, og han elsker sin altan.', correct: true },
            { text: 'Jonas bor alene i sit lejlighed, og han elsker hans altanen.', correct: false },
            { text: 'Jonas bor alene i min lejlighed.', correct: false }
        ],
        explanation: 'Når subjektet ("Jonas / han") ejer noget i samme sætning, bruger man refleksivt "sin / sit / sine" efter ordets køn: "sin lejlighed" (n-ord) og "sit hus" (t-ord).'
    },
    {
        prompt: '6. Vælg den rigtige sætning om naboer og børn i flertal:',
        options: [
            { text: 'Mine børn leger tit i gården med mine naboers børn.', correct: true },
            { text: 'Mit børn leger tit i gården med min naboer.', correct: false },
            { text: 'Mine børnene leger tit i gården.', correct: false }
        ],
        explanation: '"Børn" og "naboer" er flertal → "mine børn" og "mine naboer" (uden -ene).'
    }
];

const POSSESSIVE_CLOZE_STORY = [
    { id: 'c1', before: 'Hej! Jeg vil gerne fortælle om ', after: ' bolig (en bolig).', options: ['min', 'mit', 'mine'], answer: 'min' },
    { id: 'c2', before: 'Jeg bor til leje i ', after: ' lejlighed på 2. sal i Aarhus (en lejlighed).', options: ['min', 'mit', 'mine'], answer: 'min' },
    { id: 'c3', before: 'Jeg bor ikke i hus, men ', after: ' bror bor i et rækkehus (en bror).', options: ['min', 'mit', 'mine'], answer: 'min' },
    { id: 'c4', before: 'I lejligheden er ', after: ' stue stor og lys (en stue).', options: ['min', 'mit', 'mine'], answer: 'min' },
    { id: 'c5', before: 'Jeg er også meget glad for ', after: ' køkken, fordi der er opvaskemaskine (et køkken).', options: ['min', 'mit', 'mine'], answer: 'mit' },
    { id: 'c6', before: 'Derudover vender ', after: ' soveværelse ud mod en stille gård (et soveværelse).', options: ['min', 'mit', 'mine'], answer: 'mit' },
    { id: 'c7', before: 'Alle ', after: ' tre værelser har store vinduer (flertal: værelser).', options: ['min', 'mit', 'mine'], answer: 'mine' },
    { id: 'c8', before: 'Til daglig bor jeg sammen med ', after: ' kone og ', options: ['min', 'mit', 'mine'], answer: 'min' },
    { id: 'c9', before: '...og ', after: ' to børn (flertal: børn).', options: ['min', 'mit', 'mine'], answer: 'mine' },
    { id: 'c10', before: 'Vi elsker at bo i ', after: ' område (et område – set fra "jeg"-form: mit område).', options: ['min', 'mit', 'mine'], answer: 'mit' }
];

// =========================================================================
// FANE 4: MINDMAP-VÆRKSTED (KUN STIKORD! -> MUNDTLIG PRÆSENTATION DEL 1)
// =========================================================================
const STIKORD_VS_SAETNING_QUIZ = [
    {
        boxTitle: 'Boks 1: sted / by',
        question: 'Til DU1 Modul 4-testen må du IKKE skrive hele sætninger på dit mindmap – kun stikord! Hvilket notat er TILLADT på dit mindmap?',
        options: [
            { text: '✅ Odense C • Nørregade • 2 år', correct: true },
            { text: '❌ Jeg bor i Odense på Nørregade, og jeg har boet der i to år.', correct: false }
        ],
        oralExpansion: 'Når du sidder til testen og kigger på stikordene »Odense C • Nørregade • 2 år«, siger du højt: »Jeg bor i Odense C på Nørregade. Jeg flyttede ind for to år siden.«'
    },
    {
        boxTitle: 'Boks 2: hus / lejlighed',
        question: 'Hvilket notat må stå i boksen »hus / lejlighed« på dit mindmap – og hvordan folder du det ud mundtligt?',
        options: [
            { text: '✅ Lejlighed • 2. sal • altan • til leje (6.500 kr.)', correct: true },
            { text: '❌ Jeg bor til leje i en lejlighed på 2. sal med en lille altan.', correct: false }
        ],
        oralExpansion: 'Mundtligt til testeren: »Jeg bor til leje i en lejlighed på anden sal. Jeg har også en dejlig altan, og min husleje er 6.500 kroner om måneden.«'
    },
    {
        boxTitle: 'Boks 3: værelser / m²',
        question: 'Hvilke stikord passer til boksen »værelser / m²«?',
        options: [
            { text: '✅ 78 m² • 3 værelser • lys stue • køkken (opvaskemaskine) • badeværelse', correct: true },
            { text: '❌ Min lejlighed er 78 kvadratmeter stor og har tre værelser og et køkken.', correct: false }
        ],
        oralExpansion: 'Mundtligt til testeren (husk at udtale m² som "kvadratmeter"): »Min lejlighed er 78 kvadratmeter stor. Den har tre værelser: en lys stue, to soveværelser, et køkken med opvaskemaskine og et badeværelse med bruser.«'
    },
    {
        boxTitle: 'Boks 4: alene / sammen med',
        question: 'Hvilke stikord må stå i boksen »alene / sammen med«?',
        options: [
            { text: '✅ Mand (Ali) • 2 børn (6 og 9 år) • kat', correct: true },
            { text: '❌ Jeg bor sammen med min mand Ali og vores to børn på 6 og 9 år.', correct: false }
        ],
        oralExpansion: 'Mundtligt til testeren: »Jeg bor ikke alene. Jeg bor sammen med min mand Ali, vores to børn på 6 og 9 år og vores lille kat.«'
    },
    {
        boxTitle: 'Boks 5: naboer',
        question: 'Hvilke stikord må stå i boksen »naboer«?',
        options: [
            { text: '✅ Søde & hjælpsomme • hilser i opgangen • kaffe i gården • rolige', correct: true },
            { text: '❌ Mine naboer er meget søde, og vi drikker kaffe i gården.', correct: false }
        ],
        oralExpansion: 'Mundtligt til testeren: »Mine naboer er rigtig søde og hjælpsomme. De er stille og rolige, og vi hilser altid på hinanden i opgangen. Om sommeren drikker vi nogle gange kaffe nede i gården.«'
    },
    {
        boxTitle: 'Boks 6: område',
        question: 'Hvilke stikord må stå i boksen »område«?',
        options: [
            { text: '✅ Grønt & roligt • legeplads • tæt på Netto, skole & bus (5 min.)', correct: true },
            { text: '❌ Mit område er meget grønt og ligger fem minutter fra Netto og bussen.', correct: false }
        ],
        oralExpansion: 'Mundtligt til testeren: »Jeg er meget glad for mit område. Det er grønt og roligt med en god legeplads til børnene, og vi bor kun fem minutter fra supermarked, skole og busstoppested.«'
    }
];

// =========================================================================
// FANE 5: DEL 2 — TESTERENS UDDYBENDE SPØRGSMÅL (3 MINUTTER)
// =========================================================================
const EXAMINER_FOLLOWUP_QUESTIONS = [
    {
        examinerQ: '1. Tester: »Du siger, at du bor i en lejlighed på 2. sal. Er du glad for at bo i din lejlighed? Hvorfor / hvorfor ikke?«',
        badReply: '»Ja, det er godt.« (For kort – i Del 2 skal du give en sammenhængende begrundelse med "fordi"!).',
        options: [
            {
                text: 'Ja, jeg er rigtig glad for min lejlighed, fordi den er meget lys og rummelig, og vi har en dejlig altan, hvor vi kan sidde i solen.',
                correct: true
            },
            {
                text: 'Ja.',
                correct: false
            },
            {
                text: 'Tak for besøget i min lejlighed.',
                correct: false
            }
        ],
        tip: 'Brug formlen: [Ja, jeg er rigtig glad for min/mit...] + [fordi...] + [konkret detalje fra boligen]!'
    },
    {
        examinerQ: '2. Tester: »Vil du fortælle lidt mere om dit yndlingsrum i din bolig? Hvilket rum kan du bedst lide?«',
        badReply: '»Stuen.«',
        options: [
            {
                text: 'Mit yndlingsrum er helt klart vores stue, fordi der er store vinduer og masser af lys. Det er der, familien samles om aftenen, når vi spiser og slapper af i sofaen.',
                correct: true
            },
            {
                text: 'Stue og køkken.',
                correct: false
            },
            {
                text: 'Jeg vil gerne bede om to værelser.',
                correct: false
            }
        ],
        tip: 'Start med: »Mit yndlingsrum er min stue / mit køkken, fordi...« og fortæl, hvad du laver i rummet!'
    },
    {
        examinerQ: '3. Tester: »Du nævnte dine naboer. Taler du meget med dine naboer i hverdagen?«',
        badReply: '»Lidt.«',
        options: [
            {
                text: 'Ja, vi har et rigtig godt naboskab. Vi hilser altid på hinanden i opgangen, og hvis vi er på ferie, hjælper min nabo gerne med at vande mine blomster.',
                correct: true
            },
            {
                text: 'Nej, nabo.',
                correct: false
            },
            {
                text: 'Velbekomme i opgangen.',
                correct: false
            }
        ],
        tip: 'Giv et konkret eksempel fra hverdagen (fx hilse i opgangen, tage imod en pakke, vande blomster eller drikke kaffe i gården).'
    },
    {
        examinerQ: '4. Tester: »Kan du godt lide dit område? Hvad er det bedste ved at bo der?«',
        badReply: '»Ja, fint område.«',
        options: [
            {
                text: 'Ja, jeg kan rigtig godt lide mit område, fordi det er stille og børnevenligt, og samtidig ligger det helt tæt på både supermarked, skole og busstoppested.',
                correct: true
            },
            {
                text: 'Mit området er god.',
                correct: false
            },
            {
                text: 'Der springer jeg lige over.',
                correct: false
            }
        ],
        tip: 'Kombinér gerne to fordele med "både... og...": fx at området er roligt/grønt, OG at det ligger tæt på indkøb og transport.'
    },
    {
        examinerQ: '5. Tester: »Er der noget ved din bolig, du IKKE er så glad for – eller noget du savner?«',
        badReply: '»Nej.«',
        options: [
            {
                text: 'Jeg er glad for lejligheden, men mit køkken er lidt lille, og nogle gange savner jeg en lille have, hvor børnene kan spille bold.',
                correct: true
            },
            {
                text: 'Husleje.',
                correct: false
            },
            {
                text: 'Tak for lån af køkkenet.',
                correct: false
            }
        ],
        tip: 'Det viser stort sprogligt overskud i Del 2, hvis du kan nævne en lille nuance med "men": »Jeg er glad for..., men mit køkken er lidt lille / huslejen er lidt høj / jeg savner en altan«.'
    },
    {
        examinerQ: '6. Tester: »Vil du blive boende i din bolig i fremtiden, eller drømmer du om at flytte?«',
        badReply: '»Måske flytte.«',
        options: [
            {
                text: 'Lige nu er vi rigtig glade for at bo i vores lejlighed, men om et par år vil vi gerne flytte i et rækkehus med en lille have og et ekstra værelse.',
                correct: true
            },
            {
                text: 'Flytte hus.',
                correct: false
            },
            {
                text: 'Undskyld, jeg er 5 minutter forsinket.',
                correct: false
            }
        ],
        tip: 'Kontrast mellem "Lige nu..." og "I fremtiden / Om et par år vil jeg gerne..." giver en super flot afslutning på Del 2!'
    }
];

const DU1_MODUL4_BOLIG_AI_PROMPT = `Rolle:
Du er en venlig, støttende og eksamensvant tester til Danskuddannelse 1 (DU1), Modul 4 mundtlig test – Opgave 1, med emnet "Min bolig".

Formål:
At træne kursisten i både:
- Del 1 (ca. 1–2 minutter): Kursistens sammenhængende præsentation af sin bolig ud fra de 6 mindmap-kategorier: 1) sted / by, 2) hus / lejlighed, 3) værelser / m², 4) alene / sammen med, 5) naboer, 6) område.
- Del 2 (ca. 3 minutter): Dine uddybende spørgsmål til kursistens bolig ("Du siger, at... Vil du fortælle lidt mere om...?", "Kan du godt lide...? / Er du glad for...? Hvorfor / hvorfor ikke?").

Sådan gennemfører du samtalen trin for trin:
Fase 1: Sprogvalg & Start på Del 1
Når kursisten skriver "hej" eller starter, spørger du først venligt:
"Hvilket sprog vil du gerne have mine små sproglige tips på undervejs? (f.eks. engelsk, arabisk, ukrainsk, vietnamesisk, farsi, urdu, spansk eller kun dansk)". Gem dette som [Støttesprog].

Når [Støttesprog] er valgt, sætter du scenen for Del 1:
"Velkommen til øvelsen til DU1 Modul 4 mundtlig test om **Min bolig**!
I **Del 1** skal du fortælle sammenhængende om din bolig ud fra dit mindmap:
1. 📍 sted / by
2. 🏢 hus / lejlighed
3. 📐 værelser / m² (kvadratmeter)
4. 👨‍👩‍👧‍👦 alene / sammen med
5. 🤝 naboer
6. 🌳 område
Skriv (eller indtal) din præsentation af din bolig på dansk herunder – så lytter jeg og giver dig feedback, før vi går til Del 2!"

Fase 2: Feedback på Del 1 + Overgang til Del 2
Når kursisten har skrevet sin præsentation i Del 1:
1. Ros kursisten varmt på dansk og nævn, hvilke af de 6 mindmap-bokse kursisten kom flot omkring.
2. Giv 2–3 korte, konstruktive sprogtips på [Støttesprog] med særligt fokus på:
   - Possessive pronominer: min (n-ord: min lejlighed, min stue, min altan) vs. mit (t-ord: mit hus, mit køkken, mit værelse, mit område) vs. mine (flertal: mine værelser, mine naboer) vs. vores.
   - Ordstilling og præpositioner (i stueetagen vs. på 2. sal, på en stille vej, tæt på indkøb).
3. Start derefter **Del 2 (De uddybende spørgsmål)**:
   Stil KUN ÉT uddybende spørgsmål ad gangen på enkelt, tydeligt dansk, der tager direkte udgangspunkt i noget, kursisten lige har fortalt (f.eks. "Du siger, at du bor i... Er du glad for dit køkken/område? Hvorfor / hvorfor ikke?" eller "Vil du fortælle lidt mere om dine naboer?").

Fase 3: Dialog i Del 2 (3–4 spørgsmål i alt)
For hvert svar kursisten giver i Del 2:
- Bekræft og anerkend svaret på dansk.
- Hvis svaret er meget kort (fx kun "Ja"), så hjælp venligt kursisten med at udvide svaret med "...fordi...".
- Giv ét lille sprogtip på [Støttesprog], hvis der er en fejl i min/mit/mine eller ordstilling.
- Stil det næste uddybende spørgsmål, indtil I har været igennem 4 gode opfølgende spørgsmål.
- Afslut med en samlet vurdering i forhold til DU1 Modul 4-kravene (Del 1 + Del 2) og en liste over de bedste bolig-ord, kursisten brugte!`;

// =========================================================================
// FANE 6: 12 BOLIG-DETEKTIV MISSIONER I VRIMLEBILLEDET
// =========================================================================
const BOLIG_DETECTIVE_MISSIONS = [
    {
        prompt: '1. [sted / by] Find den stille vej nederst til venstre, hvor familien flyttede ind for to år siden (»på en stille vej«).',
        answerId: 'b2_stille_vej',
        hint: 'Kig nederst til venstre på gaden (pegefelt #2).'
    },
    {
        prompt: '2. [hus / lejlighed] Find den solrige altan med blomsterkasser på 1. sal til venstre (»min altan«).',
        answerId: 'b7_altan',
        hint: 'Kig til venstre på etageejendommen ved glasdøren ud til altanen (pegefelt #7).'
    },
    {
        prompt: '3. [hus / lejlighed] Find det hyggelige røde murstens-rækkehus helt til venstre (»mit rækkehus«).',
        answerId: 'b5_raekkehus',
        hint: 'Kig helt til venstre på rækkehuset med rødt tegltag (pegefelt #5).'
    },
    {
        prompt: '4. [værelser / m²] Find den store, lyse stue med den blå sofa, hvor familien sidder sammen (»min stue«).',
        answerId: 'b10_stue_lys',
        hint: 'Kig inde i lejlighedens stue på 1. sal til venstre (pegefelt #10).'
    },
    {
        prompt: '5. [værelser / m²] Find køkkenet med komfur, spisebord og åben opvaskemaskine (»mit køkken«).',
        answerId: 'b11_koekken_opvaskemaskine',
        hint: 'Kig til højre for stuen på 1. sal (pegefelt #11).'
    },
    {
        prompt: '6. [værelser / m²] Find soveværelset på 2. sal med dobbeltsengen og natlamperne (»mit soveværelse«).',
        answerId: 'b12_sovevaerelse',
        hint: 'Kig på øverste etage (2. sal) til venstre (pegefelt #12).'
    },
    {
        prompt: '7. [værelser / m²] Find badeværelset på 2. sal med brusekabine, håndvask og spejl (»mit badeværelse«).',
        answerId: 'b13_badevaerelse',
        hint: 'Kig til højre for soveværelset på øverste etage (pegefelt #13).'
    },
    {
        prompt: '8. [værelser / m²] Find det fælles vaskerum nede i kælderen med de to vaskemaskiner (»vores vaskerum«).',
        answerId: 'b15_vaskerum_kaelder',
        hint: 'Kig helt nederst i bygningens kælder til venstre (pegefelt #15).'
    },
    {
        prompt: '9. [alene / sammen med] Find den unge mand i stueetagen, der bor helt alene og læser i lænestolen (»at bo alene«).',
        answerId: 'b17_bo_alene',
        hint: 'Kig i stueetagen til venstre for entréen (pegefelt #17).'
    },
    {
        prompt: '10. [naboer] Find trappeopgangen, hvor naboerne smiler, vinker og hilser på hinanden på trappen (»min opgang«).',
        answerId: 'b19_opgang_hilse',
        hint: 'Kig på trappen til højre i etageejendommen (pegefelt #19).'
    },
    {
        prompt: '11. [naboer] Find den hyggelige grønne baggård / gård, hvor tre naboer drikker kaffe ved træbordet (»vores gård«).',
        answerId: 'b21_baggaard_nabohygge',
        hint: 'Kig nede i den grønne gård til højre for bygningen (pegefelt #21).'
    },
    {
        prompt: '12. [område] Find butikken med frugt og grønt til højre, der viser at boligen ligger »tæt på indkøb / supermarked«.',
        answerId: 'b23_taet_paa_indkoeb',
        hint: 'Kig til højre under gården ved butiksmarkisen (pegefelt #23).'
    }
];

function speakBolig(text, rate = 0.9, pitch = 1.02) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'da-DK';
    u.rate = rate;
    u.pitch = pitch;
    window.speechSynthesis.speak(u);
}

function injectMinBoligStyles() {
    if (document.getElementById('min-bolig-view-styles')) return;
    const style = document.createElement('style');
    style.id = 'min-bolig-view-styles';
    style.textContent = `
        #app:has(.min-bolig-view) {
            max-width: 1200px;
        }
        .min-bolig-view {
            max-width: 1160px;
            margin: 0 auto;
            padding: 1rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        .mb-hero {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.97) 0%, rgba(30, 41, 59, 0.96) 52%, rgba(20, 184, 166, 0.28) 100%);
            border: 1.5px solid rgba(45, 212, 191, 0.45);
            border-radius: 22px;
            padding: 1.35rem 1.5rem;
            margin-bottom: 1.15rem;
            box-shadow: 0 16px 38px rgba(0, 0, 0, 0.42);
        }
        .mb-hero-kicker {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.28rem 0.85rem;
            border-radius: 999px;
            background: rgba(20, 184, 166, 0.18);
            border: 1px solid rgba(45, 212, 191, 0.55);
            color: #5eead4;
            font-size: 0.76rem;
            font-weight: 900;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 0.55rem;
        }
        .mb-hero h1 {
            margin: 0 0 0.4rem;
            font-size: clamp(1.45rem, 2.6vw, 2.1rem);
            font-weight: 900;
            color: #ffffff;
        }
        .mb-hero p {
            margin: 0 0 0.95rem;
            color: #cbd5e1;
            font-size: 0.95rem;
            line-height: 1.55;
            max-width: 960px;
        }
        .mb-mindmap-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
            gap: 0.65rem;
        }
        .mb-mindmap-box {
            border-radius: 14px;
            padding: 0.7rem 0.9rem;
            background: rgba(15, 23, 42, 0.88);
            transition: transform 0.15s ease;
        }
        .mb-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-bottom: 1.15rem;
        }
        .mb-tab-btn {
            background: rgba(15, 23, 42, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.3);
            color: #cbd5e1;
            padding: 0.58rem 0.92rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.83rem;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .mb-tab-btn:hover {
            border-color: #2dd4bf;
            color: #ffffff;
            transform: translateY(-1px);
        }
        .mb-tab-btn.active {
            background: linear-gradient(135deg, #0d9488, #0284c7);
            border-color: #5eead4;
            color: #ffffff;
            box-shadow: 0 6px 18px rgba(13, 148, 136, 0.38);
        }
        .mb-panel { display: none; }
        .mb-panel.active { display: block; }
        .mb-card {
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(148, 163, 184, 0.24);
            border-radius: 20px;
            padding: 1.25rem;
            margin-bottom: 1.15rem;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
        .mb-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.65rem;
            margin-bottom: 0.9rem;
        }
        .mb-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
        }
        .mb-filter-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.32);
            color: #e2e8f0;
            padding: 0.42rem 0.78rem;
            border-radius: 999px;
            font-weight: 800;
            font-size: 0.78rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .mb-filter-btn.active {
            background: rgba(20, 184, 166, 0.24);
            border-color: #2dd4bf;
            color: #ffffff;
            box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.22);
        }
        .mb-stage-wrap {
            position: relative;
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            border: 2px solid rgba(148, 163, 184, 0.35);
            background: #090d16;
            margin-bottom: 1rem;
        }
        .mb-stage-inner {
            position: relative;
            width: 100%;
            transform-origin: center center;
            transition: transform 0.25s ease;
        }
        .mb-stage-img {
            width: 100%;
            height: auto;
            display: block;
            user-select: none;
        }
        .mb-pegefelt {
            position: absolute;
            transform: translate(-50%, -100%);
            padding: 0.24rem 0.52rem;
            border-radius: 10px;
            color: #ffffff;
            font-weight: 900;
            font-size: 0.72rem;
            line-height: 1.15;
            white-space: nowrap;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.65);
            transition: transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;
            z-index: 4;
        }
        .mb-pegefelt::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -7px;
            transform: translateX(-50%);
            border-width: 7px 6px 0 6px;
            border-style: solid;
            border-color: rgba(15, 23, 42, 0.95) transparent transparent transparent;
        }
        .mb-pegefelt:hover,
        .mb-pegefelt.active {
            transform: translate(-50%, -107%) scale(1.08);
            box-shadow: 0 0 0 3px #ffffff, 0 8px 22px rgba(0, 0, 0, 0.82);
            z-index: 15;
        }
        .mb-pegefelt.compact-mode .mb-pegefelt-label {
            display: none;
        }
        .mb-pegefelt.hidden-pin {
            opacity: 0.13;
            pointer-events: none;
        }
        .mb-pegefelt-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 18px;
            height: 18px;
            padding: 0 4px;
            border-radius: 999px;
            background: rgba(0, 0, 0, 0.42);
            font-size: 0.68rem;
            font-weight: 900;
        }
        .mb-detail-box {
            border-radius: 16px;
            padding: 1.15rem 1.25rem;
            background: rgba(9, 14, 26, 0.94);
            border: 1.5px solid rgba(148, 163, 184, 0.32);
        }
        .mb-pill-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.25rem 0.7rem;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .mb-btn-primary {
            background: linear-gradient(135deg, #0d9488, #0284c7);
            border: 1px solid #5eead4;
            color: #ffffff;
            padding: 0.55rem 1.05rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .mb-btn-primary:hover { filter: brightness(1.1); }
        .mb-btn-secondary {
            background: rgba(30, 41, 59, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.35);
            color: #e2e8f0;
            padding: 0.5rem 0.92rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.82rem;
            cursor: pointer;
        }
        .mb-btn-secondary:hover {
            border-color: #5eead4;
            color: #ffffff;
        }
        .mb-slots-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 0.65rem;
            margin-bottom: 0.9rem;
        }
        .mb-slot {
            border-radius: 14px;
            padding: 0.75rem 0.9rem;
            background: rgba(9, 14, 26, 0.88);
            border: 2px dashed rgba(148, 163, 184, 0.38);
            cursor: pointer;
            min-height: 62px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .mb-slot.filled {
            border-style: solid;
            background: rgba(30, 41, 59, 0.92);
        }
        .mb-chips-pool {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-bottom: 0.85rem;
        }
        .mb-chip {
            background: rgba(30, 41, 59, 0.92);
            border: 1.5px solid rgba(148, 163, 184, 0.35);
            color: #f8fafc;
            padding: 0.5rem 0.9rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.86rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .mb-chip:hover:not(:disabled) {
            border-color: #2dd4bf;
            transform: translateY(-1px);
        }
        .mb-chip.selected {
            background: linear-gradient(135deg, #0d9488, #0284c7);
            border-color: #5eead4;
            color: #ffffff;
        }
        .mb-chip:disabled {
            opacity: 0.32;
            text-decoration: line-through;
            cursor: default;
        }
        .mb-option-btn {
            width: 100%;
            text-align: left;
            background: rgba(30, 41, 59, 0.82);
            border: 1.5px solid rgba(148, 163, 184, 0.3);
            color: #f8fafc;
            padding: 0.78rem 1rem;
            border-radius: 13px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.15s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.6rem;
        }
        .mb-option-btn:hover:not(:disabled) {
            border-color: #2dd4bf;
            background: rgba(20, 184, 166, 0.14);
        }
        .mb-option-btn.correct {
            background: rgba(34, 197, 94, 0.22);
            border-color: #4ade80;
            color: #bbf7d0;
        }
        .mb-option-btn.wrong {
            background: rgba(239, 68, 68, 0.2);
            border-color: #f87171;
            color: #fecaca;
        }
        .mb-feedback {
            margin-top: 0.8rem;
            padding: 0.85rem 1rem;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 700;
            line-height: 1.5;
        }
        .mb-feedback.ok {
            background: rgba(34, 197, 94, 0.16);
            border: 1.5px solid rgba(74, 222, 128, 0.55);
            color: #bbf7d0;
        }
        .mb-feedback.err {
            background: rgba(239, 68, 68, 0.16);
            border: 1.5px solid rgba(248, 113, 113, 0.55);
            color: #fecaca;
        }
        @media (max-width: 720px) {
            .mb-pegefelt {
                padding: 0.18rem 0.38rem;
                font-size: 0.64rem;
            }
            .mb-pegefelt-label { display: none; }
            .mb-pegefelt.show-mobile-label .mb-pegefelt-label { display: inline; }
        }
    `;
    document.head.appendChild(style);
}

export function renderMinBoligView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    injectMinBoligStyles();

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container min-bolig-view';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + (getTranslation('back') || 'Tilbage til Mit hverdagsliv');
    backBtn.onclick = () => navigateFn('mit_hverdagsliv');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Hero med de 6 officielle DU1 Modul 4 Mindmap-bokse ("Min bolig")
    const hero = document.createElement('div');
    hero.className = 'mb-hero';
    hero.innerHTML = `
        <div class="mb-hero-kicker">🏠 Mit hverdagsliv • DU1 Modul 4 Mundtlig Test-Stilladsering (Opgave 1)</div>
        <h1>Min bolig — Vrimlebillede, Mindmap & Præsentation</h1>
        <p>
            Lær de vigtigste danske bolig-ord (ud over de 600 mest almindelige ord) og træn skridt for skridt hen imod
            <strong>DU1, Modul 4 mundtlig test</strong>: Fra det officielle <strong>Mindmap med 6 bokse</strong> (kun stikord!),
            <strong>pusleøvelser</strong> (<em>Hvad tales om → Hvad sker der → Hvad/Hvordan → Hvor/Hvornår</em>) og
            <strong>possessive pronominer</strong> (<em>min lejlighed, mit hus, mine naboer, vores område</em>) til
            <strong>1–2 minutters præsentation (Del 1)</strong> og <strong>testerens uddybende spørgsmål (Del 2)</strong>.
        </p>
        <div class="mb-mindmap-grid">
            ${Object.values(MINDMAP_BOXES).map(b => `
                <div class="mb-mindmap-box" style="border:1.5px solid ${b.border}; background:${b.bg};">
                    <div style="font-size:0.88rem; font-weight:900; color:${b.color}; margin-bottom:0.18rem;">
                        ${b.icon} ${b.title}
                    </div>
                    <div style="font-size:0.77rem; color:#fde68a; font-weight:800; margin-bottom:0.18rem;">
                        Stikord: ${b.keywordsExample}
                    </div>
                    <div style="font-size:0.78rem; color:#e2e8f0; line-height:1.35;">
                        »${b.modelSentence}«
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    viewContainer.appendChild(hero);

    const tabs = [
        { id: 'tab_vrimmel', icon: '🖼️', label: '1. Vrimlebillede & Mindmap (24 ord)' },
        { id: 'tab_pusle', icon: '🧩', label: '2. Pusleøvelser & Sætningsbygning' },
        { id: 'tab_possessiv', icon: '🔑', label: '3. Min, Mit, Mine & Vores' },
        { id: 'tab_mindmap', icon: '🗺️', label: '4. Mindmap → 1–2 min. Præsentation (Del 1)' },
        { id: 'tab_del2_dialog', icon: '🎙️', label: '5. Testerens spørgsmål (Del 2) & AI-Test' },
        { id: 'tab_detektiv', icon: '🕵️', label: '6. Bolig-detektiven' }
    ];

    let currentTab = extraData?.subPath && tabs.some(t => t.id === extraData.subPath)
        ? extraData.subPath
        : 'tab_vrimmel';

    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'mb-tabs';
    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `mb-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.textContent = `${t.icon} ${t.label}`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang() || 'da';
        history.pushState(null, '', `#/${lang}/mit_hverdagsliv_bolig/${tabId}`);
        tabsMenu.querySelectorAll('.mb-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.mb-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    function makePanel(id) {
        const p = document.createElement('div');
        p.className = `mb-panel ${currentTab === id ? 'active' : ''}`;
        p.dataset.panel = id;
        return p;
    }

    // =========================================================================
    // FANE 1: VRIMLEBILLEDE (24 BOLIG-ORD) + 6 MINDMAP-BOKS SORTERING
    // =========================================================================
    const panel1 = makePanel('tab_vrimmel');
    let activeBoxFilter = 'alle';
    let selectedWord = BOLIG_WORDS[0];
    let compactPins = false;
    let zoomed = false;

    const card1 = document.createElement('div');
    card1.className = 'mb-card';
    card1.innerHTML = `
        <div class="mb-toolbar">
            <div class="mb-filters">
                <button type="button" class="mb-filter-btn active" data-bfilter="alle">Alle 24 bolig-ord</button>
                ${Object.values(MINDMAP_BOXES).map(b => `
                    <button type="button" class="mb-filter-btn" data-bfilter="${b.id}" style="border-color:${b.border}; color:${b.color};">
                        ${b.icon} ${b.title}
                    </button>
                `).join('')}
            </div>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <button type="button" class="mb-btn-secondary" id="mb-toggle-pinmode">🏷️ Vis kun tal / fulde pegefelter</button>
                <button type="button" class="mb-btn-secondary" id="mb-zoom-btn">🔍 Zoom ind (135%)</button>
            </div>
        </div>

        <div class="mb-stage-wrap">
            <div class="mb-stage-inner" id="mb-stage-inner">
                <img src="assets/min_bolig_vrimmel.jpg" onerror="this.src='assets/koekken_vrimmel.jpg'" alt="Min bolig vrimlebillede med de 6 mindmap-kategorier" class="mb-stage-img" />
                <div id="mb-pegefelter-layer"></div>
            </div>
        </div>

        <div class="mb-detail-box" id="mb-detail-box"></div>
    `;

    const pegefelterLayer = card1.querySelector('#mb-pegefelter-layer');
    const detailBox = card1.querySelector('#mb-detail-box');
    const stageInner = card1.querySelector('#mb-stage-inner');

    card1.querySelector('#mb-zoom-btn').onclick = (e) => {
        zoomed = !zoomed;
        stageInner.style.transform = zoomed ? 'scale(1.35)' : 'scale(1)';
        e.currentTarget.textContent = zoomed ? '🔍 Nulstil zoom (100%)' : '🔍 Zoom ind (135%)';
    };

    card1.querySelector('#mb-toggle-pinmode').onclick = () => {
        compactPins = !compactPins;
        renderPegefelter();
    };

    function renderWordDetail(w) {
        const boxMeta = MINDMAP_BOXES[w.mindmapBox];
        const wcMeta = WORD_CLASS_META[w.wordClass];
        detailBox.style.borderColor = boxMeta.border;
        detailBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.65rem;">
                <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                    <span class="mb-pill-tag" style="background:${boxMeta.bg}; color:${boxMeta.color}; border:1.5px solid ${boxMeta.border};">
                        Mindmap-boks: ${boxMeta.icon} ${boxMeta.title}
                    </span>
                    <span class="mb-pill-tag" style="background:${wcMeta.bg}; color:${wcMeta.color}; border:1px solid ${wcMeta.color};">
                        ${wcMeta.short}${w.gender !== '-' ? ` (${w.gender}-ord)` : ''}
                    </span>
                    ${w.possessive !== '-' ? `
                        <span class="mb-pill-tag" style="background:rgba(245,158,11,0.16); color:#fde68a; border:1px solid rgba(245,158,11,0.5);">
                            🔑 Ejestedord: ${w.possessive}
                        </span>
                    ` : ''}
                </div>
                <button type="button" class="mb-btn-primary" id="mb-play-word-audio">
                    🔊 Lyt til ordet & sætningen
                </button>
            </div>

            <div style="font-size:1.32rem; font-weight:900; color:#ffffff; margin-bottom:0.3rem;">
                ${w.icon} #${w.num}. ${w.word}
            </div>

            <div style="font-size:0.84rem; color:#94a3b8; margin-bottom:0.6rem;">
                <strong>Bøjning & former:</strong> ${w.forms}
            </div>

            <p style="margin:0 0 0.65rem; color:#e2e8f0; font-size:0.95rem; line-height:1.55;">
                ${w.definition}
            </p>

            <div style="font-size:0.88rem; color:#5eead4; margin-bottom:0.65rem;">
                <strong>🔗 Faste udtryk (kollokationer):</strong> ${w.fixedTerms}
            </div>

            <div style="background:rgba(15,23,42,0.95); border-left:4px solid ${boxMeta.color}; border-radius:12px; padding:0.75rem 1rem; margin-bottom:0.6rem;">
                <div style="font-size:0.75rem; font-weight:900; color:${boxMeta.color}; text-transform:uppercase; margin-bottom:0.2rem;">
                    Sætning til din DU1 Modul 4-præsentation:
                </div>
                <div style="font-size:0.98rem; color:#ffffff; font-weight:800;">»${w.sentence}«</div>
            </div>

            <div style="font-size:0.83rem; color:#fde68a; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.32); border-radius:10px; padding:0.5rem 0.85rem;">
                <strong>💡 Tip til mindmap & mundtlig test:</strong> ${w.stikordTip}
            </div>
        `;
        const playBtn = detailBox.querySelector('#mb-play-word-audio');
        if (playBtn) {
            playBtn.onclick = () => speakBolig(`${w.word}. ${w.sentence}`);
        }
    }

    function renderPegefelter() {
        pegefelterLayer.innerHTML = '';
        BOLIG_WORDS.forEach(w => {
            const boxMeta = MINDMAP_BOXES[w.mindmapBox];
            const isHidden = activeBoxFilter !== 'alle' && w.mindmapBox !== activeBoxFilter;
            const isSelected = w.id === selectedWord.id;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `mb-pegefelt ${isSelected ? 'active show-mobile-label' : ''} ${compactPins ? 'compact-mode' : ''} ${isHidden ? 'hidden-pin' : ''}`;
            btn.style.left = `${w.x}%`;
            btn.style.top = `${w.y}%`;
            btn.style.background = `linear-gradient(135deg, rgba(15,23,42,0.94), rgba(30,41,59,0.95))`;
            btn.style.border = `2px solid ${boxMeta.color}`;
            btn.title = `#${w.num} ${w.word} (${boxMeta.title})`;
            btn.innerHTML = compactPins
                ? `<span>${w.icon}</span><span>${w.num}</span>`
                : `<span class="mb-pegefelt-num" style="background:${boxMeta.color}; color:#0f172a;">${w.num}</span><span>${w.icon}</span><span class="mb-pegefelt-label">${w.shortLabel}</span>`;
            btn.onclick = () => {
                selectedWord = w;
                renderWordDetail(w);
                renderPegefelter();
            };
            pegefelterLayer.appendChild(btn);
        });
    }

    card1.querySelectorAll('.mb-filter-btn').forEach(btn => {
        btn.onclick = () => {
            activeBoxFilter = btn.dataset.bfilter;
            card1.querySelectorAll('.mb-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPegefelter();
        };
    });

    renderWordDetail(selectedWord);
    renderPegefelter();
    panel1.appendChild(card1);

    // 6-Boks Mindmap-sortering nederst i Fane 1
    const sortCard = document.createElement('div');
    sortCard.className = 'mb-card';
    const sortPool = shuffleArray([...BOLIG_WORDS]);
    const sortedBuckets = {
        sted_by: [],
        hus_lejlighed: [],
        vaerelser_m2: [],
        alene_sammen: [],
        naboer: [],
        omraade: []
    };
    let activeSortIdx = 0;
    let sortFeedback = '';

    function renderMindmapSorting() {
        const placedSet = new Set(Object.values(sortedBuckets).flat());
        if (placedSet.has(activeSortIdx)) {
            activeSortIdx = sortPool.findIndex((_, i) => !placedSet.has(i));
        }
        const activeItem = activeSortIdx >= 0 ? sortPool[activeSortIdx] : null;

        sortCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.5rem;">
                <h3 style="margin:0; font-size:1.12rem; font-weight:900;">🗺️ Placér de 24 bolig-ord i de 6 officielle Mindmap-bokse (${placedSet.size}/${sortPool.length})</h3>
                <button type="button" class="mb-btn-secondary" id="mb-sort-reset">🔄 Nulstil mindmap-sortering</button>
            </div>
            <p style="margin:0 0 0.8rem; color:#cbd5e1; font-size:0.89rem;">
                Hvilken af de 6 kategorier på DU1 Modul 4-mindmappet hører ordet til? Klik på et ord og derefter på den rigtige mindmap-boks:
            </p>
            <div class="mb-chips-pool" style="padding:0.8rem; border-radius:14px; background:rgba(9,14,26,0.85); border:1px solid rgba(148,163,184,0.22);">
                ${sortPool.map((item, idx) => {
                    const isPlaced = placedSet.has(idx);
                    const isActive = idx === activeSortIdx;
                    return `
                        <button type="button" class="mb-chip ${isActive ? 'selected' : ''}" data-msort-item="${idx}" ${isPlaced ? 'disabled' : ''}>
                            ${item.icon} ${item.shortLabel}
                        </button>
                    `;
                }).join('')}
            </div>

            ${activeItem ? `
                <div style="margin-bottom:0.85rem; padding:0.75rem 1rem; border-radius:12px; background:rgba(20,184,166,0.14); border:1.5px solid #2dd4bf;">
                    <span style="font-size:0.76rem; font-weight:900; color:#5eead4; text-transform:uppercase;">Valgt bolig-ord:</span>
                    <strong style="font-size:1.05rem; color:#ffffff; margin-left:0.4rem;">${activeItem.icon} ${activeItem.word}</strong>
                    <span style="font-size:0.84rem; color:#cbd5e1; margin-left:0.5rem;">— »${activeItem.sentence}«</span>
                </div>
            ` : `
                <div class="mb-feedback ok" style="margin-bottom:0.85rem;">
                    🏆 Fantastisk! Du har placeret alle 24 bolig-ord i de 6 mindmap-bokse til DU1 Modul 4!
                </div>
            `}

            <div class="mb-mindmap-grid">
                ${Object.values(MINDMAP_BOXES).map(b => {
                    const items = sortedBuckets[b.id].map(i => sortPool[i]);
                    return `
                        <button type="button" data-msort-bucket="${b.id}" style="text-align:left; padding:0.9rem; border-radius:16px; background:${b.bg}; border:2px dashed ${b.border}; color:#ffffff; cursor:pointer;">
                            <div style="font-size:0.95rem; font-weight:900; color:${b.color}; margin-bottom:0.2rem;">
                                ${b.icon} ${b.title} (${items.length})
                            </div>
                            <div style="font-size:0.77rem; color:#cbd5e1; margin-bottom:0.5rem;">${b.oralQuestion}</div>
                            <div style="display:flex; flex-wrap:wrap; gap:0.3rem;">
                                ${items.length
                                    ? items.map(it => `<span style="padding:0.18rem 0.48rem; border-radius:999px; background:rgba(15,23,42,0.9); border:1px solid ${b.border}; font-size:0.75rem; font-weight:800;">${it.icon} ${it.shortLabel}</span>`).join('')
                                    : `<span style="font-size:0.78rem; color:#94a3b8;">Klik her for at lægge ordet i denne boks...</span>`}
                            </div>
                        </button>
                    `;
                }).join('')}
            </div>
            ${sortFeedback ? `<div class="mb-feedback ${sortFeedback.startsWith('✓') ? 'ok' : 'err'}">${sortFeedback}</div>` : ''}
        `;

        sortCard.querySelector('#mb-sort-reset').onclick = () => {
            Object.keys(sortedBuckets).forEach(k => { sortedBuckets[k] = []; });
            activeSortIdx = 0;
            sortFeedback = '';
            renderMindmapSorting();
        };

        sortCard.querySelectorAll('[data-msort-item]').forEach(btn => {
            btn.onclick = () => {
                activeSortIdx = Number(btn.dataset.msortItem);
                sortFeedback = '';
                renderMindmapSorting();
            };
        });

        sortCard.querySelectorAll('[data-msort-bucket]').forEach(bucket => {
            bucket.onclick = () => {
                if (activeSortIdx < 0) return;
                const targetBox = bucket.dataset.msortBucket;
                const item = sortPool[activeSortIdx];
                if (item.mindmapBox === targetBox) {
                    sortedBuckets[targetBox].push(activeSortIdx);
                    sortFeedback = `✓ Rigtigt! »${item.word}« hører til i mindmap-boksen »${MINDMAP_BOXES[targetBox].title}«.`;
                } else {
                    const correctBox = MINDMAP_BOXES[item.mindmapBox];
                    sortFeedback = `✗ Ikke helt – »${item.word}« passer bedst i boksen »${correctBox.title}« (${correctBox.oralQuestion}).`;
                }
                renderMindmapSorting();
            };
        });
    }

    renderMindmapSorting();
    panel1.appendChild(sortCard);
    panelsHolder.appendChild(panel1);

    // =========================================================================
    // FANE 2: PUSLEØVELSER & SÆTNINGSBYGNING (HVAD TALES OM -> HVAD SKER DER -> HVAD/HVORDAN -> HVOR/HVORNÅR)
    // =========================================================================
    const panel2 = makePanel('tab_pusle');
    const puzzleCard = document.createElement('div');
    puzzleCard.className = 'mb-card';
    let pzIdx = 0;
    const pzDone = new Set();
    let pzSlots = [null, null, null, null];

    const slotDefs = [
        { label: 'Hvad / Hvem tales der om?', grammar: '1. Hvad tales om? (Subjekt)', color: '#22c55e' },
        { label: 'Hvad sker der? / Tilstand', grammar: '2. Hvad sker der? (Verbum)', color: '#ef4444' },
        { label: 'Hvad / Hvordan / Med hvem?', grammar: '3. Hvad / Hvordan? (Indhold)', color: '#f59e0b' },
        { label: 'Hvor / Hvornår?', grammar: '4. Hvor / Hvornår? (Sted & Tid)', color: '#38bdf8' }
    ];

    function renderPuzzle() {
        const task = BOLIG_PUZZLES[pzIdx];
        const boxMeta = MINDMAP_BOXES[task.boxId];

        puzzleCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.65rem;">
                <span class="mb-pill-tag" style="background:${boxMeta.bg}; color:${boxMeta.color}; border:1px solid ${boxMeta.border};">
                    Mindmap-boks: ${boxMeta.icon} ${boxMeta.title}
                </span>
                <span style="font-size:0.84rem; color:#94a3b8; font-weight:800;">
                    Pusleøvelse ${pzIdx + 1} af ${BOLIG_PUZZLES.length} • Løst: ${pzDone.size}/${BOLIG_PUZZLES.length}
                </span>
            </div>

            <div class="mb-chips-pool">
                ${BOLIG_PUZZLES.map((_, i) => `
                    <button type="button" class="mb-chip ${i === pzIdx ? 'selected' : ''}" data-pz-idx="${i}" style="${pzDone.has(i) ? 'border-color:#22c55e;' : ''}">
                        ${pzDone.has(i) ? `✓ ${i + 1}` : i + 1}
                    </button>
                `).join('')}
            </div>

            <h3 style="margin:0.35rem 0 0.75rem; font-size:1.14rem; font-weight:900;">${task.q}</h3>
            <p style="margin:0 0 0.75rem; font-size:0.87rem; color:#cbd5e1;">
                Klik på brikkerne i den rigtige rækkefølge: <strong>1. Hvad tales om?</strong> → <strong>2. Hvad sker der?</strong> → <strong>3. Hvad/Hvordan?</strong> → <strong>4. Hvor/Hvornår?</strong>
            </p>

            <div class="mb-slots-row" id="mb-pz-slots"></div>
            <div class="mb-chips-pool" id="mb-pz-bank"></div>
            <div id="mb-pz-fb"></div>
        `;

        puzzleCard.querySelectorAll('[data-pz-idx]').forEach(b => {
            b.onclick = () => {
                pzIdx = Number(b.dataset.pzIdx);
                pzSlots = [null, null, null, null];
                renderPuzzle();
            };
        });

        const slotsEl = puzzleCard.querySelector('#mb-pz-slots');
        const bankEl = puzzleCard.querySelector('#mb-pz-bank');
        const fbEl = puzzleCard.querySelector('#mb-pz-fb');

        function updatePuzzleUI() {
            slotsEl.innerHTML = '';
            slotDefs.forEach((def, idx) => {
                const s = document.createElement('div');
                s.className = `mb-slot ${pzSlots[idx] ? 'filled' : ''}`;
                s.style.borderColor = def.color;
                s.innerHTML = `
                    <div style="font-size:0.72rem; font-weight:900; color:${def.color}; margin-bottom:0.2rem;">${def.grammar}</div>
                    <div style="font-weight:800; font-size:0.95rem; color:${pzSlots[idx] ? '#ffffff' : '#64748b'};">${pzSlots[idx] || def.label}</div>
                `;
                s.onclick = () => {
                    if (pzSlots[idx]) {
                        pzSlots[idx] = null;
                        fbEl.innerHTML = '';
                        updatePuzzleUI();
                    }
                };
                slotsEl.appendChild(s);
            });

            bankEl.innerHTML = '';
            task.scrambled.forEach(w => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'mb-chip';
                btn.textContent = w;
                btn.disabled = pzSlots.includes(w);
                btn.onclick = () => {
                    const empty = pzSlots.indexOf(null);
                    if (empty === -1) return;
                    pzSlots[empty] = w;
                    updatePuzzleUI();
                    if (!pzSlots.includes(null)) {
                        const ok = pzSlots.every((val, i) => val === task.correct[i]);
                        if (ok) {
                            pzDone.add(pzIdx);
                            const fullSent = pzSlots.join(' ');
                            speakBolig(fullSent);
                            fbEl.innerHTML = `
                                <div class="mb-feedback ok">
                                    <strong>✓ Helt rigtigt!</strong> »${fullSent}«<br>
                                    <span style="font-size:0.84rem; color:#d1fae5;">${task.tip}</span>
                                </div>
                                <div style="margin-top:0.65rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                                    <button type="button" class="mb-btn-secondary" id="mb-pz-speak">🔊 Lyt til sætningen</button>
                                    <button type="button" class="mb-btn-primary" id="mb-pz-next">Næste pusleøvelse →</button>
                                </div>
                            `;
                            fbEl.querySelector('#mb-pz-speak').onclick = () => speakBolig(fullSent);
                            fbEl.querySelector('#mb-pz-next').onclick = () => {
                                pzIdx = (pzIdx + 1) % BOLIG_PUZZLES.length;
                                pzSlots = [null, null, null, null];
                                renderPuzzle();
                            };
                        } else {
                            fbEl.innerHTML = `
                                <div class="mb-feedback err">
                                    Prøv igen! Husk rækkefølgen: 1. Hvad tales om? (Subjekt) → 2. Hvad sker der? (Verbum) → 3. Hvad/Hvordan? → 4. Hvor/Hvornår?
                                </div>
                                <div style="margin-top:0.55rem;">
                                    <button type="button" class="mb-btn-secondary" id="mb-pz-reset">🔄 Nulstil brikker</button>
                                </div>
                            `;
                            fbEl.querySelector('#mb-pz-reset').onclick = () => {
                                pzSlots = [null, null, null, null];
                                fbEl.innerHTML = '';
                                updatePuzzleUI();
                            };
                        }
                    }
                };
                bankEl.appendChild(btn);
            });
        }

        updatePuzzleUI();
    }

    renderPuzzle();
    panel2.appendChild(puzzleCard);

    // Del B i Fane 2: Trin-for-trin Præsentations-Sætningsbygger
    const builderCard = document.createElement('div');
    builderCard.className = 'mb-card';
    const builderRows = [
        { q: '1. Hvad / Hvem tales der om? (Subjekt på 1. plads)', color: '#22c55e', opts: ['Jeg', 'Vi', 'Min lejlighed', 'Mit rækkehus', 'Mine naboer', 'Mit område'] },
        { q: '2. Hvad sker der? / Tilstand (Verbum på 2. plads)', color: '#ef4444', opts: ['bor', 'ligger', 'er', 'har', 'hilser på hinanden'] },
        { q: '3. Hvad / Hvordan? (Beskrivelse eller indhold på 3. plads)', color: '#f59e0b', opts: ['i en lys 3-værelses lejlighed', '78 kvadratmeter stor og rummelig', 'sammen med min familie', 'meget søde og hjælpsomme', 'helt tæt på indkøb og bus'] },
        { q: '4. Hvor / Hvornår? (Sted eller tid til sidst)', color: '#38bdf8', opts: ['på anden sal i Odense', 'på en stille og grøn vej', 'ude i vores opgang', 'nede i den hyggelige baggård', 'i hverdagen'] }
    ];
    const bSelections = ['Jeg', 'bor', 'i en lys 3-værelses lejlighed', 'på anden sal i Odense'];

    function renderStepBuilder() {
        const currentSent = `${bSelections[0]} ${bSelections[1]} ${bSelections[2]} ${bSelections[3]}.`;
        builderCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem;">
                <span class="mb-pill-tag" style="background:rgba(34,197,94,0.16); color:#4ade80; border:1px solid #22c55e;">
                    🏗️ Del B: Trin-for-trin Præsentations-Sætningsbygger
                </span>
                <button type="button" class="mb-btn-secondary" id="mb-builder-speak">🔊 Lyt til din sætning</button>
            </div>
            <p style="margin:0.2rem 0 0.85rem; color:#cbd5e1; font-size:0.9rem;">
                Klik på én brik i hver af de 4 rækker for at sammensætte dine egne sætninger til prøven:
            </p>
            <div id="mb-b-rows"></div>
            <div style="margin-top:1rem; padding:1rem 1.2rem; border-radius:14px; background:rgba(7,13,25,0.92); border:1.5px solid rgba(45,212,191,0.45); font-size:1.12rem; font-weight:800; line-height:1.6;">
                <span style="color:#4ade80;">${bSelections[0]}</span>
                <span style="color:#f87171;">${bSelections[1]}</span>
                <span style="color:#fbbf24;">${bSelections[2]}</span>
                <span style="color:#7dd3fc;">${bSelections[3]}</span>.
            </div>
        `;
        builderCard.querySelector('#mb-builder-speak').onclick = () => speakBolig(currentSent);
        const rowsEl = builderCard.querySelector('#mb-b-rows');
        builderRows.forEach((row, rIdx) => {
            const rDiv = document.createElement('div');
            rDiv.style.cssText = `margin-bottom:0.8rem; padding-left:0.75rem; border-left:3px solid ${row.color};`;
            rDiv.innerHTML = `<div style="font-size:0.85rem; font-weight:900; color:${row.color}; margin-bottom:0.35rem;">${row.q}</div>`;
            const pool = document.createElement('div');
            pool.className = 'mb-chips-pool';
            pool.style.margin = '0';
            row.opts.forEach(opt => {
                const c = document.createElement('button');
                c.type = 'button';
                c.className = `mb-chip ${bSelections[rIdx] === opt ? 'selected' : ''}`;
                c.textContent = opt;
                c.onclick = () => {
                    bSelections[rIdx] = opt;
                    renderStepBuilder();
                };
                pool.appendChild(c);
            });
            rDiv.appendChild(pool);
            rowsEl.appendChild(rDiv);
        });
    }

    renderStepBuilder();
    panel2.appendChild(builderCard);
    panelsHolder.appendChild(panel2);

    // =========================================================================
    // FANE 3: POSSESSIVE PRONOMINER — MIN, MIT, MINE & VORES I BOLIGEN
    // =========================================================================
    const panel3 = makePanel('tab_possessiv');

    // Grammatik-overblikskort
    const posGuideCard = document.createElement('div');
    posGuideCard.className = 'mb-card';
    posGuideCard.innerHTML = `
        <span class="mb-pill-tag" style="background:rgba(245,158,11,0.16); color:#fde68a; border:1px solid rgba(245,158,11,0.5); margin-bottom:0.4rem;">
            🔑 Nøglen til »Min bolig« • Possessive pronominer (Ejestedord)
        </span>
        <h3 style="margin:0.2rem 0 0.45rem; font-size:1.2rem; font-weight:900;">Hvornår hedder det »min«, »mit«, »mine« og »vores«?</h3>
        <p style="margin:0 0 0.9rem; color:#cbd5e1; font-size:0.92rem; line-height:1.5;">
            Når du fortæller om din bolig til DU1 Modul 4-testen, styrer <strong>substantivets køn (en/et) og tal (ental/flertal)</strong>, om du skal sige <strong>min</strong>, <strong>mit</strong> eller <strong>mine</strong>:
        </p>
        <div class="mb-mindmap-grid" style="margin-bottom:0.75rem;">
            <div class="mb-mindmap-box" style="border:1.5px solid #22c55e; background:rgba(34,197,94,0.14);">
                <div style="font-weight:900; color:#4ade80; font-size:0.95rem; margin-bottom:0.25rem;">🟢 N-ord (en) → MIN</div>
                <div style="font-size:0.84rem; color:#f8fafc; line-height:1.45;">
                    • en bolig → <strong>min bolig</strong><br>
                    • en lejlighed → <strong>min lejlighed</strong><br>
                    • en stue → <strong>min stue</strong><br>
                    • en altan → <strong>min altan</strong><br>
                    • en husleje → <strong>min husleje</strong><br>
                    • en opgang → <strong>min opgang</strong>
                </div>
            </div>
            <div class="mb-mindmap-box" style="border:1.5px solid #38bdf8; background:rgba(56,189,248,0.14);">
                <div style="font-weight:900; color:#7dd3fc; font-size:0.95rem; margin-bottom:0.25rem;">🔵 T-ord (et) → MIT</div>
                <div style="font-size:0.84rem; color:#f8fafc; line-height:1.45;">
                    • et hus → <strong>mit hus</strong><br>
                    • et rækkehus → <strong>mit rækkehus</strong><br>
                    • et køkken → <strong>mit køkken</strong><br>
                    • et værelse → <strong>mit værelse</strong><br>
                    • et soveværelse → <strong>mit soveværelse</strong><br>
                    • et område → <strong>mit område</strong>
                </div>
            </div>
            <div class="mb-mindmap-box" style="border:1.5px solid #f59e0b; background:rgba(245,158,11,0.14);">
                <div style="font-weight:900; color:#fde68a; font-size:0.95rem; margin-bottom:0.25rem;">🟡 Flertal (både en & et) → MINE</div>
                <div style="font-size:0.84rem; color:#f8fafc; line-height:1.45;">
                    • tre værelser → <strong>mine værelser</strong><br>
                    • søde naboer → <strong>mine naboer</strong><br>
                    • to børn → <strong>mine børn</strong><br>
                    • store vinduer → <strong>mine vinduer</strong>
                </div>
            </div>
            <div class="mb-mindmap-box" style="border:1.5px solid #c084fc; background:rgba(168,85,247,0.14);">
                <div style="font-weight:900; color:#e9d5ff; font-size:0.95rem; margin-bottom:0.25rem;">🟣 Flere ejere (vi) → VORES</div>
                <div style="font-size:0.84rem; color:#f8fafc; line-height:1.45;">
                    Uanset en, et eller flertal:<br>
                    • <strong>vores lejlighed</strong> (en)<br>
                    • <strong>vores hus / område</strong> (et)<br>
                    • <strong>vores værelser / naboer</strong> (flertal)
                </div>
            </div>
        </div>
        <div style="font-size:0.85rem; color:#fca5a5; background:rgba(239,68,68,0.12); border:1px solid rgba(239,68,68,0.35); border-radius:11px; padding:0.55rem 0.9rem;">
            <strong>⚠️ Vigtigste regel:</strong> Efter <em>min / mit / mine / vores</em> står substantivet <strong>altid i ubestemt form</strong>:
            Det hedder <strong>min lejlighed</strong> (ALDRIG <em>"min lejligheden"</em>) og <strong>mit område</strong> (ALDRIG <em>"mit området"</em>)!
        </div>
    `;
    panel3.appendChild(posGuideCard);

    // Øvelse 3A: 16 Hurtig-dueller (min, mit eller mine?)
    const posDuelCard = document.createElement('div');
    posDuelCard.className = 'mb-card';
    let pDuelIdx = 0;
    let pDuelAns = null;
    const pDuelSolved = new Set();

    function renderPosDuel() {
        const d = POSSESSIVE_DUELS[pDuelIdx];
        posDuelCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <div>
                    <span class="mb-pill-tag" style="background:rgba(20,184,166,0.16); color:#5eead4; border:1px solid rgba(45,212,191,0.5);">
                        🎯 Øvelse 3A: Min, Mit eller Mine? (${pDuelIdx + 1}/${POSSESSIVE_DUELS.length})
                    </span>
                    <span style="font-size:0.84rem; color:#94a3b8; font-weight:800; margin-left:0.5rem;">
                        Score: ${pDuelSolved.size}/${POSSESSIVE_DUELS.length}
                    </span>
                </div>
                <div style="display:flex; gap:0.45rem;">
                    <button type="button" class="mb-btn-secondary" id="mb-pd-prev" ${pDuelIdx === 0 ? 'disabled' : ''}>← Forrige</button>
                    <button type="button" class="mb-btn-secondary" id="mb-pd-next" ${pDuelIdx === POSSESSIVE_DUELS.length - 1 ? 'disabled' : ''}>Næste →</button>
                </div>
            </div>

            <div style="padding:1rem 1.15rem; border-radius:15px; background:rgba(9,14,26,0.95); border-left:4px solid #2dd4bf; margin-bottom:0.9rem;">
                <div style="font-size:0.8rem; color:#94a3b8; font-weight:800; margin-bottom:0.25rem;">Substantiv: <strong style="color:#fde68a;">${d.noun}</strong></div>
                <div style="font-size:1.08rem; font-weight:900; color:#ffffff;">
                    »${d.sentence.replace('___', pDuelAns ? `<span style="color:#5eead4; text-decoration:underline;">${pDuelAns}</span>` : '[ ___ ]')}«
                </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr)); gap:0.6rem;">
                ${[
                    { val: 'min', label: 'min (n-ord, ental)' },
                    { val: 'mit', label: 'mit (t-ord, ental)' },
                    { val: 'mine', label: 'mine (flertal)' }
                ].map(opt => {
                    let cls = 'mb-option-btn';
                    if (pDuelAns !== null) {
                        if (opt.val === d.answer) cls += ' correct';
                        else if (opt.val === pDuelAns) cls += ' wrong';
                    }
                    return `
                        <button type="button" class="${cls}" data-pd-opt="${opt.val}">
                            <span><strong>${opt.val}</strong> ${d.noun.split(' ')[0]}</span>
                            <span style="font-size:0.75rem; color:#94a3b8;">${opt.label}</span>
                        </button>
                    `;
                }).join('')}
            </div>

            ${pDuelAns !== null ? `
                <div class="mb-feedback ${pDuelAns === d.answer ? 'ok' : 'err'}">
                    <div><strong>${pDuelAns === d.answer ? '✓ Rigtigt!' : `✗ Det rigtige svar er "${d.answer}":`}</strong> ${d.expl}</div>
                    ${pDuelIdx < POSSESSIVE_DUELS.length - 1 ? `
                        <button type="button" class="mb-btn-primary" id="mb-pd-adv" style="margin-top:0.55rem;">Næste bolig-ord →</button>
                    ` : ''}
                </div>
            ` : ''}
        `;

        const prev = posDuelCard.querySelector('#mb-pd-prev');
        if (prev) prev.onclick = () => { if (pDuelIdx > 0) { pDuelIdx--; pDuelAns = null; renderPosDuel(); } };
        const next = posDuelCard.querySelector('#mb-pd-next');
        if (next) next.onclick = () => { if (pDuelIdx < POSSESSIVE_DUELS.length - 1) { pDuelIdx++; pDuelAns = null; renderPosDuel(); } };

        posDuelCard.querySelectorAll('[data-pd-opt]').forEach(btn => {
            btn.onclick = () => {
                pDuelAns = btn.dataset.pdOpt;
                if (pDuelAns === d.answer) {
                    pDuelSolved.add(pDuelIdx);
                    speakBolig(d.sentence.replace('___', d.answer));
                }
                renderPosDuel();
            };
        });

        const adv = posDuelCard.querySelector('#mb-pd-adv');
        if (adv) adv.onclick = () => { pDuelIdx++; pDuelAns = null; renderPosDuel(); };
    }

    renderPosDuel();
    panel3.appendChild(posDuelCard);

    // Øvelse 3B: 6 Grammatiske fælder & transformationer
    const posTransCard = document.createElement('div');
    posTransCard.className = 'mb-card';
    let ptIdx = 0;
    let ptAns = null;
    const ptSolved = new Set();

    function renderPosTransform() {
        const q = POSSESSIVE_TRANSFORM_CHALLENGES[ptIdx];
        posTransCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <div>
                    <span class="mb-pill-tag" style="background:rgba(168,85,247,0.16); color:#e9d5ff; border:1px solid rgba(192,132,252,0.5);">
                        🛡️ Øvelse 3B: Undgå de typiske fælder (${ptIdx + 1}/${POSSESSIVE_TRANSFORM_CHALLENGES.length})
                    </span>
                    <span style="font-size:0.84rem; color:#94a3b8; font-weight:800; margin-left:0.5rem;">
                        Løst: ${ptSolved.size}/${POSSESSIVE_TRANSFORM_CHALLENGES.length}
                    </span>
                </div>
                <div style="display:flex; gap:0.45rem;">
                    <button type="button" class="mb-btn-secondary" id="mb-pt-prev" ${ptIdx === 0 ? 'disabled' : ''}>← Forrige</button>
                    <button type="button" class="mb-btn-secondary" id="mb-pt-next" ${ptIdx === POSSESSIVE_TRANSFORM_CHALLENGES.length - 1 ? 'disabled' : ''}>Næste →</button>
                </div>
            </div>

            <div style="font-size:1rem; font-weight:900; color:#ffffff; margin-bottom:0.8rem;">${q.prompt}</div>

            <div style="display:grid; gap:0.5rem;">
                ${q.options.map((opt, idx) => {
                    let cls = 'mb-option-btn';
                    if (ptAns !== null) {
                        if (opt.correct) cls += ' correct';
                        else if (idx === ptAns) cls += ' wrong';
                    }
                    return `
                        <button type="button" class="${cls}" data-pt-opt="${idx}">
                            <span>»${opt.text}«</span>
                            <span>${ptAns !== null && opt.correct ? '✓' : ''}</span>
                        </button>
                    `;
                }).join('')}
            </div>

            ${ptAns !== null ? `
                <div class="mb-feedback ${q.options[ptAns]?.correct ? 'ok' : 'err'}">
                    <strong>${q.options[ptAns]?.correct ? '✓ Helt rigtigt!' : '✗ Husk reglen:'}</strong> ${q.explanation}
                </div>
            ` : ''}
        `;

        const prev = posTransCard.querySelector('#mb-pt-prev');
        if (prev) prev.onclick = () => { if (ptIdx > 0) { ptIdx--; ptAns = null; renderPosTransform(); } };
        const next = posTransCard.querySelector('#mb-pt-next');
        if (next) next.onclick = () => { if (ptIdx < POSSESSIVE_TRANSFORM_CHALLENGES.length - 1) { ptIdx++; ptAns = null; renderPosTransform(); } };

        posTransCard.querySelectorAll('[data-pt-opt]').forEach(btn => {
            btn.onclick = () => {
                ptAns = Number(btn.dataset.ptOpt);
                if (q.options[ptAns]?.correct) {
                    ptSolved.add(ptIdx);
                    speakBolig(q.options[ptAns].text);
                }
                renderPosTransform();
            };
        });
    }

    renderPosTransform();
    panel3.appendChild(posTransCard);

    // Øvelse 3C: Sammenhængende Præsentation med 10 huller (min / mit / mine)
    const clozeCard = document.createElement('div');
    clozeCard.className = 'mb-card';
    const clozePicks = {};
    let clozeChecked = false;

    function renderPossessiveCloze() {
        const totalCorrect = POSSESSIVE_CLOZE_STORY.filter(item => clozePicks[item.id] === item.answer).length;
        clozeCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.65rem;">
                <span class="mb-pill-tag" style="background:rgba(56,189,248,0.16); color:#7dd3fc; border:1px solid rgba(56,189,248,0.45);">
                    📝 Øvelse 3C: Indsæt min, mit eller mine i en hel bolig-præsentation (10 huller)
                </span>
                <button type="button" class="mb-btn-secondary" id="mb-cloze-reset">🔄 Nulstil tekst</button>
            </div>
            <p style="margin:0 0 0.85rem; color:#cbd5e1; font-size:0.9rem;">
                Vælg <strong>min</strong>, <strong>mit</strong> eller <strong>mine</strong> i hver sætning, så hele præsentationen hænger rigtigt sammen:
            </p>
            <div style="display:grid; gap:0.55rem; margin-bottom:0.95rem;">
                ${POSSESSIVE_CLOZE_STORY.map((item, idx) => {
                    const picked = clozePicks[item.id];
                    const isOk = clozeChecked && picked === item.answer;
                    const isErr = clozeChecked && picked && picked !== item.answer;
                    return `
                        <div style="padding:0.7rem 0.95rem; border-radius:12px; background:rgba(9,14,26,0.9); border:1.5px solid ${isOk ? '#4ade80' : isErr ? '#f87171' : 'rgba(148,163,184,0.25)'}; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
                            <div style="font-size:0.93rem; color:#f8fafc;">
                                <span style="color:#94a3b8; font-weight:800; margin-right:0.35rem;">${idx + 1}.</span>
                                ${item.before}
                                <strong style="padding:0.15rem 0.5rem; border-radius:6px; background:rgba(20,184,166,0.2); border:1px solid #2dd4bf; color:#5eead4;">
                                    ${picked || '___'}
                                </strong>
                                ${item.after}
                            </div>
                            <div style="display:flex; gap:0.35rem;">
                                ${item.options.map(opt => `
                                    <button type="button" class="mb-btn-secondary" data-cloze-id="${item.id}" data-cloze-val="${opt}" style="padding:0.28rem 0.65rem; font-size:0.8rem; ${picked === opt ? 'background:#0d9488; color:#ffffff; border-color:#5eead4;' : ''}">
                                        ${opt}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <button type="button" class="mb-btn-primary" id="mb-cloze-check">✓ Tjek alle 10 ejestedord</button>
            ${clozeChecked ? `
                <div class="mb-feedback ${totalCorrect === POSSESSIVE_CLOZE_STORY.length ? 'ok' : 'err'}">
                    <strong>Resultat: ${totalCorrect} af ${POSSESSIVE_CLOZE_STORY.length} rigtige!</strong>
                    ${totalCorrect === POSSESSIVE_CLOZE_STORY.length
                        ? ' Du har helt styr på min (n-ord), mit (t-ord) og mine (flertal) i en sammenhængende boligpræsentation!'
                        : ' De røde felter viser, hvor kønnet (en/et) eller flertal kræver et andet pronomen. Prøv at rette dem!'}
                </div>
            ` : ''}
        `;

        clozeCard.querySelectorAll('[data-cloze-id]').forEach(btn => {
            btn.onclick = () => {
                clozePicks[btn.dataset.clozeId] = btn.dataset.clozeVal;
                clozeChecked = false;
                renderPossessiveCloze();
            };
        });

        clozeCard.querySelector('#mb-cloze-check').onclick = () => {
            clozeChecked = true;
            renderPossessiveCloze();
        };

        clozeCard.querySelector('#mb-cloze-reset').onclick = () => {
            Object.keys(clozePicks).forEach(k => delete clozePicks[k]);
            clozeChecked = false;
            renderPossessiveCloze();
        };
    }

    renderPossessiveCloze();
    panel3.appendChild(clozeCard);
    panelsHolder.appendChild(panel3);

    // =========================================================================
    // FANE 4: MINDMAP-VÆRKSTED (STIKORD -> 1-2 MIN. PRÆSENTATION DEL 1)
    // =========================================================================
    const panel4 = makePanel('tab_mindmap');

    // Øvelse 4A: Stikord (Tilladt ✅) vs. Hele sætninger (Forbudt ❌)
    const stikordCard = document.createElement('div');
    stikordCard.className = 'mb-card';
    let stIdx = 0;
    let stAns = null;
    const stSolved = new Set();

    function renderStikordQuiz() {
        const q = STIKORD_VS_SAETNING_QUIZ[stIdx];
        stikordCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <div>
                    <span class="mb-pill-tag" style="background:rgba(245,158,11,0.16); color:#fde68a; border:1px solid rgba(245,158,11,0.5);">
                        🗺️ Øvelse 4A: Fra Stikord på Mindmappet til Mundtlig Sætning (Boks ${stIdx + 1}/6)
                    </span>
                </div>
                <div style="display:flex; gap:0.45rem;">
                    <button type="button" class="mb-btn-secondary" id="mb-st-prev" ${stIdx === 0 ? 'disabled' : ''}>← Forrige boks</button>
                    <button type="button" class="mb-btn-secondary" id="mb-st-next" ${stIdx === STIKORD_VS_SAETNING_QUIZ.length - 1 ? 'disabled' : ''}>Næste boks →</button>
                </div>
            </div>

            <h3 style="margin:0 0 0.35rem; font-size:1.12rem; font-weight:900; color:#5eead4;">${q.boxTitle}</h3>
            <p style="margin:0 0 0.85rem; color:#e2e8f0; font-size:0.93rem;">${q.question}</p>

            <div style="display:grid; gap:0.55rem;">
                ${q.options.map((opt, idx) => {
                    let cls = 'mb-option-btn';
                    if (stAns !== null) {
                        if (opt.correct) cls += ' correct';
                        else if (idx === stAns) cls += ' wrong';
                    }
                    return `
                        <button type="button" class="${cls}" data-st-opt="${idx}">
                            <span>${opt.text}</span>
                            <span>${stAns !== null && opt.correct ? '✓' : ''}</span>
                        </button>
                    `;
                }).join('')}
            </div>

            ${stAns !== null ? `
                <div class="mb-feedback ${q.options[stAns]?.correct ? 'ok' : 'err'}">
                    <div><strong>🎤 Sådan folder du stikordene ud mundtligt til prøven (Del 1):</strong></div>
                    <div style="margin-top:0.35rem; color:#ffffff;">${q.oralExpansion}</div>
                </div>
            ` : ''}
        `;

        const prev = stikordCard.querySelector('#mb-st-prev');
        if (prev) prev.onclick = () => { if (stIdx > 0) { stIdx--; stAns = null; renderStikordQuiz(); } };
        const next = stikordCard.querySelector('#mb-st-next');
        if (next) next.onclick = () => { if (stIdx < STIKORD_VS_SAETNING_QUIZ.length - 1) { stIdx++; stAns = null; renderStikordQuiz(); } };

        stikordCard.querySelectorAll('[data-st-opt]').forEach(btn => {
            btn.onclick = () => {
                stAns = Number(btn.dataset.stOpt);
                if (q.options[stAns]?.correct) stSolved.add(stIdx);
                renderStikordQuiz();
            };
        });
    }

    renderStikordQuiz();
    panel4.appendChild(stikordCard);

    // Øvelse 4B: Interaktivt Personligt Mindmap-Værksted (6 bokse som på SIRI-skemaet) -> Færdig 1-2 min. Tale-skabelon
    const myMindmapCard = document.createElement('div');
    myMindmapCard.className = 'mb-card';

    const userKeywords = {
        sted_by: 'Odense • stille vej • 2 år',
        hus_lejlighed: 'lejlighed • 2. sal • altan • til leje',
        vaerelser_m2: '78 m² • 3 værelser • lys stue • køkken • badeværelse',
        alene_sammen: 'mand / kone • 2 børn • kat',
        naboer: 'søde & hjælpsomme • hilser i opgangen • rolige',
        omraade: 'grønt område • legeplads • tæt på indkøb & bus'
    };

    const presetOptions = {
        sted_by: ['Odense • stille vej • 2 år', 'Aarhus • tæt på centrum • 1 år', 'København • hyggelig bydel • 3 år'],
        hus_lejlighed: ['lejlighed • 2. sal • altan • til leje', 'rækkehus • 2 etager • lille have', 'lejlighed • i stueetagen • rimelig husleje'],
        vaerelser_m2: ['78 m² • 3 værelser • lys stue • køkken', '60 m² • 2 værelser • nyt køkken • vaskerum', '95 m² • 4 værelser • 2 børneværelser'],
        alene_sammen: ['mand / kone • 2 børn • kat', 'bor alene • roligt', 'sammen med min kæreste • hund'],
        naboer: ['søde & hjælpsomme • hilser i opgangen', 'stille og rolige • kaffe i gården', 'venlige naboer • hjælper med pakker'],
        omraade: ['grønt område • legeplads • tæt på indkøb & bus', 'roligt kvarter • tæt på skole og park', 'centralt område • gode cykelstier']
    };

    function renderMyMindmapBuilder() {
        myMindmapCard.innerHTML = `
            <span class="mb-pill-tag" style="background:rgba(20,184,166,0.18); color:#5eead4; border:1px solid rgba(45,212,191,0.5); margin-bottom:0.4rem;">
                ✍️ Øvelse 4B: Byg dit eget personlige »Min bolig«-Mindmap (Kun stikord!)
            </span>
            <h3 style="margin:0.2rem 0 0.4rem; font-size:1.18rem; font-weight:900;">Udfyld de 6 bokse med dine egne stikord – og træn din 1–2 minutters præsentation</h3>
            <p style="margin:0 0 0.9rem; color:#cbd5e1; font-size:0.9rem;">
                Klik på et forslag eller skriv dine egne stikord i de 6 bokse (præcis som på det officielle A3-mindmap til testen):
            </p>

            <!-- Top-boks: Min bolig -->
            <div style="max-width:340px; margin:0 auto 0.9rem; padding:0.75rem 1.2rem; border-radius:12px; background:rgba(56,189,248,0.18); border:2px solid #38bdf8; text-align:center; font-weight:900; font-size:1.1rem; color:#ffffff;">
                🏠 Min bolig
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr)); gap:0.85rem; margin-bottom:1.1rem;">
                ${Object.values(MINDMAP_BOXES).map(b => `
                    <div style="padding:0.9rem 1rem; border-radius:16px; background:rgba(9,14,26,0.92); border:2px solid ${b.border};">
                        <div style="font-weight:900; font-size:0.98rem; color:${b.color}; text-align:center; margin-bottom:0.45rem;">
                            ${b.icon} ${b.title}
                        </div>
                        <input
                            type="text"
                            data-mm-input="${b.id}"
                            value="${userKeywords[b.id].replace(/"/g, '&quot;')}"
                            placeholder="Skriv kun stikord her..."
                            style="width:100%; box-sizing:border-box; padding:0.55rem 0.75rem; border-radius:10px; border:1.5px solid rgba(148,163,184,0.35); background:rgba(30,41,59,0.9); color:#ffffff; font-weight:800; font-size:0.86rem; margin-bottom:0.45rem;"
                        />
                        <div style="display:flex; flex-wrap:wrap; gap:0.3rem;">
                            ${presetOptions[b.id].map(p => `
                                <button type="button" class="mb-btn-secondary" data-mm-preset="${b.id}" data-mm-val="${p}" style="padding:0.22rem 0.5rem; font-size:0.73rem;">
                                    ${p}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="padding:1.1rem 1.25rem; border-radius:16px; background:linear-gradient(135deg, rgba(13,148,136,0.18), rgba(15,23,42,0.95)); border:1.5px solid #2dd4bf;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.55rem;">
                    <div style="font-size:0.85rem; font-weight:900; color:#5eead4; text-transform:uppercase;">
                        🎤 Din sammenhængende mundtlige præsentation (Del 1 – ca. 1–2 minutter) med tekstbroer:
                    </div>
                    <button type="button" class="mb-btn-primary" id="mb-speak-full-presentation">
                        🔊 Lyt til model-præsentationen
                    </button>
                </div>
                <div style="font-size:0.95rem; color:#f8fafc; line-height:1.7;" id="mb-oral-guide-text">
                    1️⃣ <strong>Start (sted / by):</strong> »Jeg vil gerne fortælle om <strong>min bolig</strong>. Til at starte med bor jeg i <em>[${userKeywords.sted_by}]</em>.«<br>
                    2️⃣ <strong>Boligtype (hus / lejlighed):</strong> »Jeg bor i <em>[${userKeywords.hus_lejlighed}]</em>, og jeg er rigtig glad for at bo der.«<br>
                    3️⃣ <strong>Størrelse & rum (værelser / m²):</strong> »Selve <strong>min bolig</strong> har <em>[${userKeywords.vaerelser_m2}]</em>, så der er god plads i hverdagen.«<br>
                    4️⃣ <strong>Hvem bor der (alene / sammen med):</strong> »Til daglig bor jeg <em>[${userKeywords.alene_sammen}]</em>, og vi hygger os meget derhjemme.«<br>
                    5️⃣ <strong>Naboskab (naboer):</strong> »<strong>Mine naboer</strong> er <em>[${userKeywords.naboer}]</em>.«<br>
                    6️⃣ <strong>Omgivelser (område):</strong> »Til sidst vil jeg sige, at <strong>mit område</strong> er <em>[${userKeywords.omraade}]</em>.«
                </div>
            </div>
        `;

        myMindmapCard.querySelectorAll('[data-mm-input]').forEach(inp => {
            inp.oninput = () => {
                userKeywords[inp.dataset.mmInput] = inp.value;
            };
            inp.onchange = () => renderMyMindmapBuilder();
        });

        myMindmapCard.querySelectorAll('[data-mm-preset]').forEach(btn => {
            btn.onclick = () => {
                userKeywords[btn.dataset.mmPreset] = btn.dataset.mmVal;
                renderMyMindmapBuilder();
            };
        });

        myMindmapCard.querySelector('#mb-speak-full-presentation').onclick = () => {
            speakBolig(
                'Jeg vil gerne fortælle om min bolig. Jeg bor i Odense på en stille vej, og jeg har boet der i to år. ' +
                'Jeg bor til leje i en lejlighed på anden sal med en dejlig altan. ' +
                'Min lejlighed er 78 kvadratmeter stor og har tre værelser: en lys stue, et soveværelse, et børneværelse, et køkken med opvaskemaskine og et badeværelse. ' +
                'Til daglig bor jeg sammen med min familie og vores kat. ' +
                'Mine naboer er meget søde, rolige og hjælpsomme, og vi hilser altid på hinanden i opgangen. ' +
                'Jeg er rigtig glad for mit område, fordi det er grønt og ligger tæt på både indkøb og busstoppested.'
            );
        };
    }

    renderMyMindmapBuilder();
    panel4.appendChild(myMindmapCard);
    panelsHolder.appendChild(panel4);

    // =========================================================================
    // FANE 5: DEL 2 — TESTERENS UDDYBENDE SPØRGSMÅL (3 MIN.) + AI-TESTSIMULATOR
    // =========================================================================
    const panel5 = makePanel('tab_del2_dialog');
    let exQIdx = 0;
    let exQAns = null;
    const exQSolved = new Set();

    const del2Card = document.createElement('div');
    del2Card.className = 'mb-card';

    function renderDel2Questions() {
        const q = EXAMINER_FOLLOWUP_QUESTIONS[exQIdx];
        del2Card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <div>
                    <span class="mb-pill-tag" style="background:rgba(236,72,153,0.16); color:#f9a8d4; border:1px solid rgba(236,72,153,0.5);">
                        🎙️ Del 2 af testen (ca. 3 min.) • Testerens spørgsmål ${exQIdx + 1}/${EXAMINER_FOLLOWUP_QUESTIONS.length}
                    </span>
                    <span style="font-size:0.84rem; color:#94a3b8; font-weight:800; margin-left:0.5rem;">
                        Løst: ${exQSolved.size}/${EXAMINER_FOLLOWUP_QUESTIONS.length}
                    </span>
                </div>
                <div style="display:flex; gap:0.45rem;">
                    <button type="button" class="mb-btn-secondary" id="mb-d2-prev" ${exQIdx === 0 ? 'disabled' : ''}>← Forrige</button>
                    <button type="button" class="mb-btn-secondary" id="mb-d2-next" ${exQIdx === EXAMINER_FOLLOWUP_QUESTIONS.length - 1 ? 'disabled' : ''}>Næste →</button>
                </div>
            </div>

            <div style="padding:1rem 1.15rem; border-radius:15px; background:rgba(9,14,26,0.95); border-left:4px solid #ec4899; margin-bottom:0.8rem;">
                <div style="font-size:0.98rem; font-weight:900; color:#ffffff; margin-bottom:0.35rem;">${q.examinerQ}</div>
                <div style="font-size:0.82rem; color:#fca5a5;">⚠️ Undgå for korte svar som: ${q.badReply}</div>
            </div>

            <div style="font-size:0.86rem; font-weight:800; color:#cbd5e1; margin-bottom:0.5rem;">
                Vælg det svar, der opfylder kravene til Del 2 (sammenhængende svar + begrundelse med »fordi«):
            </div>

            <div style="display:grid; gap:0.55rem;">
                ${q.options.map((opt, idx) => {
                    let cls = 'mb-option-btn';
                    if (exQAns !== null) {
                        if (opt.correct) cls += ' correct';
                        else if (idx === exQAns) cls += ' wrong';
                    }
                    return `
                        <button type="button" class="${cls}" data-d2-opt="${idx}">
                            <span>»${opt.text}«</span>
                            <span>${exQAns !== null && opt.correct ? '✓' : ''}</span>
                        </button>
                    `;
                }).join('')}
            </div>

            ${exQAns !== null ? `
                <div class="mb-feedback ${q.options[exQAns]?.correct ? 'ok' : 'err'}">
                    <strong>${q.options[exQAns]?.correct ? '✓ Super flot Del 2-svar!' : '✗ Tip til prøven:'}</strong> ${q.tip}
                </div>
            ` : ''}
        `;

        const prev = del2Card.querySelector('#mb-d2-prev');
        if (prev) prev.onclick = () => { if (exQIdx > 0) { exQIdx--; exQAns = null; renderDel2Questions(); } };
        const next = del2Card.querySelector('#mb-d2-next');
        if (next) next.onclick = () => { if (exQIdx < EXAMINER_FOLLOWUP_QUESTIONS.length - 1) { exQIdx++; exQAns = null; renderDel2Questions(); } };

        del2Card.querySelectorAll('[data-d2-opt]').forEach(btn => {
            btn.onclick = () => {
                exQAns = Number(btn.dataset.d2Opt);
                if (q.options[exQAns]?.correct) {
                    exQSolved.add(exQIdx);
                    speakBolig(q.options[exQAns].text);
                }
                renderDel2Questions();
            };
        });
    }

    renderDel2Questions();
    panel5.appendChild(del2Card);

    // Interaktiv AI-Testsimulator (DU1 Modul 4: Del 1 + Del 2)
    const aiCard = document.createElement('div');
    aiCard.className = 'mb-card';
    aiCard.innerHTML = `
        <span class="mb-pill-tag" style="background:rgba(20,184,166,0.18); color:#5eead4; border:1px solid rgba(45,212,191,0.5); margin-bottom:0.4rem;">
            🤖 AI-Testsimulator • DU1 Modul 4 (Del 1: Præsentation + Del 2: Testerens spørgsmål)
        </span>
        <h3 style="margin:0.2rem 0 0.45rem; font-size:1.18rem; font-weight:900;">Afprøv hele den mundtlige test om »Min bolig« med en AI-tester</h3>
        <p style="margin:0 0 0.85rem; color:#cbd5e1; font-size:0.9rem; line-height:1.5;">
            Kopiér promptet herunder ind i ChatGPT, Claude eller Gemini. AI-testeren lader dig først holde din <strong>1–2 minutters præsentation (Del 1)</strong> ud fra de 6 mindmap-bokse, giver dig venlig feedback på <em>min / mit / mine / vores</em> og stiller dig derefter <strong>4 uddybende spørgsmål (Del 2)</strong> ét ad gangen!
        </p>
        <div id="mb-ai-prompt-holder"></div>
    `;
    const promptSection = createPromptFlowSection(DU1_MODUL4_BOLIG_AI_PROMPT);
    aiCard.querySelector('#mb-ai-prompt-holder').appendChild(promptSection);
    panel5.appendChild(aiCard);
    panelsHolder.appendChild(panel5);

    // =========================================================================
    // FANE 6: BOLIG-DETEKTIVEN I VRIMLEBILLEDET (12 MISSIONER)
    // =========================================================================
    const panel6 = makePanel('tab_detektiv');
    let detIdx = 0;
    let detFeedback = null;
    let detShowHint = false;
    const detSolved = new Set();

    const detCard = document.createElement('div');
    detCard.className = 'mb-card';

    function renderDetective() {
        const m = BOLIG_DETECTIVE_MISSIONS[detIdx];
        detCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                <div>
                    <span class="mb-pill-tag" style="background:rgba(20,184,166,0.18); color:#5eead4; border:1px solid rgba(45,212,191,0.5);">
                        🕵️ Bolig-detektiven • Mission ${detIdx + 1} af ${BOLIG_DETECTIVE_MISSIONS.length}
                    </span>
                    <span style="font-size:0.85rem; color:#94a3b8; font-weight:800; margin-left:0.5rem;">
                        Fundet: ${detSolved.size}/${BOLIG_DETECTIVE_MISSIONS.length}
                    </span>
                </div>
                <div style="display:flex; gap:0.45rem;">
                    <button type="button" class="mb-btn-secondary" id="mb-det-hint">💡 Vis ledetråd</button>
                    <button type="button" class="mb-btn-secondary" id="mb-det-prev" ${detIdx === 0 ? 'disabled' : ''}>← Forrige</button>
                    <button type="button" class="mb-btn-secondary" id="mb-det-next" ${detIdx === BOLIG_DETECTIVE_MISSIONS.length - 1 ? 'disabled' : ''}>Næste →</button>
                </div>
            </div>

            <div style="padding:0.95rem 1.1rem; border-radius:14px; background:rgba(30,41,59,0.85); border-left:4px solid #14b8a6; margin-bottom:0.85rem;">
                <div style="font-size:1rem; font-weight:900; color:#ffffff;">${m.prompt}</div>
                ${detShowHint ? `<div style="margin-top:0.4rem; font-size:0.86rem; color:#fde68a;">💡 Ledetråd: ${m.hint}</div>` : ''}
            </div>

            ${detFeedback ? `
                <div class="mb-feedback ${detFeedback.ok ? 'ok' : 'err'}" style="margin-bottom:0.85rem;">
                    <div>${detFeedback.text}</div>
                    ${detFeedback.ok && detIdx < BOLIG_DETECTIVE_MISSIONS.length - 1 ? `
                        <button type="button" class="mb-btn-primary" id="mb-det-advance" style="margin-top:0.5rem;">Næste detektiv-mission →</button>
                    ` : ''}
                </div>
            ` : ''}

            <div class="mb-stage-wrap">
                <div class="mb-stage-inner">
                    <img src="assets/min_bolig_vrimmel.jpg" onerror="this.src='assets/koekken_vrimmel.jpg'" alt="Min bolig detektiv-vrimlebillede" class="mb-stage-img" />
                    <div id="mb-det-layer"></div>
                </div>
            </div>
        `;

        const detLayer = detCard.querySelector('#mb-det-layer');
        BOLIG_WORDS.forEach(w => {
            const boxMeta = MINDMAP_BOXES[w.mindmapBox];
            const isCorrectPick = detFeedback?.ok && w.id === m.answerId;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `mb-pegefelt ${isCorrectPick ? 'active show-mobile-label' : 'compact-mode'}`;
            btn.style.left = `${w.x}%`;
            btn.style.top = `${w.y}%`;
            btn.style.background = `linear-gradient(135deg, rgba(15,23,42,0.94), rgba(30,41,59,0.95))`;
            btn.style.border = `2px solid ${boxMeta.color}`;
            btn.innerHTML = isCorrectPick
                ? `<span class="mb-pegefelt-num" style="background:${boxMeta.color}; color:#0f172a;">${w.num}</span><span>${w.icon}</span><span class="mb-pegefelt-label">${w.shortLabel}</span>`
                : `<span>${w.icon}</span><span>#${w.num}</span>`;
            btn.onclick = () => {
                if (w.id === m.answerId) {
                    detSolved.add(detIdx);
                    detFeedback = {
                        ok: true,
                        text: `✓ Fundet! Pegefelt #${w.num} er »${w.word}« (${w.possessive !== '-' ? `ejestedord: ${w.possessive}` : boxMeta.title}) — »${w.sentence}«`
                    };
                    speakBolig(`${w.word}. ${w.sentence}`);
                } else {
                    detFeedback = {
                        ok: false,
                        text: `✗ Du klikkede på #${w.num} (»${w.shortLabel}«). Prøv et andet sted i boligen – eller klik på "Vis ledetråd"!`
                    };
                }
                renderDetective();
            };
            detLayer.appendChild(btn);
        });

        const hintBtn = detCard.querySelector('#mb-det-hint');
        if (hintBtn) hintBtn.onclick = () => { detShowHint = !detShowHint; renderDetective(); };
        const prevBtn = detCard.querySelector('#mb-det-prev');
        if (prevBtn) prevBtn.onclick = () => { if (detIdx > 0) { detIdx--; detFeedback = null; detShowHint = false; renderDetective(); } };
        const nextBtn = detCard.querySelector('#mb-det-next');
        if (nextBtn) nextBtn.onclick = () => { if (detIdx < BOLIG_DETECTIVE_MISSIONS.length - 1) { detIdx++; detFeedback = null; detShowHint = false; renderDetective(); } };
        const advBtn = detCard.querySelector('#mb-det-advance');
        if (advBtn) advBtn.onclick = () => { detIdx++; detFeedback = null; detShowHint = false; renderDetective(); };
    }

    renderDetective();
    panel6.appendChild(detCard);
    panelsHolder.appendChild(panel6);

    container.appendChild(viewContainer);
}
