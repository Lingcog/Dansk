import { getTranslation, getLang } from '../utils/i18n.js';
import { shuffleArray } from '../utils/shuffle.js';
import { createPromptFlowSection } from '../utils/aiPromptHelper.js';
import { samtaleIcons } from '../utils/samtaleIcons.js';
import { mbT, mbSub, isMbRtl } from '../utils/min_bolig_translations.js';

/**
 * MinBoligView — "Min bolig" under hovedfladen "Mit hverdagsliv".
 *
 * Stilladserer DU1, Modul 4 mundtlig test (Opgave 1) på enkelt dansk med
 * oversættelser til alle 18 understøttede sprog i appen.
 */

export const MINDMAP_BOXES = {
    sted_by: {
        id: 'sted_by',
        num: 1,
        title: '1. Sted / by',
        color: '#38bdf8',
        border: 'rgba(56, 189, 248, 0.78)',
        bg: 'rgba(56, 189, 248, 0.16)',
        oralQuestion: 'Hvor bor du?',
        modelSentence: 'Jeg bor i Odense på en stille vej. Jeg har boet her i to år.'
    },
    hus_lejlighed: {
        id: 'hus_lejlighed',
        num: 2,
        title: '2. Hus / lejlighed',
        color: '#f59e0b',
        border: 'rgba(245, 158, 11, 0.78)',
        bg: 'rgba(245, 158, 11, 0.16)',
        oralQuestion: 'Bor du i hus eller lejlighed?',
        modelSentence: 'Jeg bor i en lejlighed på 2. sal. Jeg har en altan.'
    },
    vaerelser_m2: {
        id: 'vaerelser_m2',
        num: 3,
        title: '3. Værelser / m²',
        color: '#10b981',
        border: 'rgba(16, 185, 129, 0.78)',
        bg: 'rgba(16, 185, 129, 0.16)',
        oralQuestion: 'Hvor stor er din bolig?',
        modelSentence: 'Min lejlighed er 75 kvadratmeter. Den har tre værelser, et køkken og et badeværelse.'
    },
    alene_sammen: {
        id: 'alene_sammen',
        num: 4,
        title: '4. Alene / sammen med',
        color: '#ec4899',
        border: 'rgba(236, 72, 153, 0.78)',
        bg: 'rgba(236, 72, 153, 0.16)',
        oralQuestion: 'Hvem bor du sammen med?',
        modelSentence: 'Jeg bor sammen med min mand og mine to børn.'
    },
    naboer: {
        id: 'naboer',
        num: 5,
        title: '5. Naboer',
        color: '#a855f7',
        border: 'rgba(168, 85, 247, 0.78)',
        bg: 'rgba(168, 85, 247, 0.16)',
        oralQuestion: 'Hvordan er dine naboer?',
        modelSentence: 'Mine naboer er søde og rolige. Vi hilser i opgangen.'
    },
    omraade: {
        id: 'omraade',
        num: 6,
        title: '6. Område',
        color: '#22c55e',
        border: 'rgba(34, 197, 94, 0.78)',
        bg: 'rgba(34, 197, 94, 0.16)',
        oralQuestion: 'Hvordan er dit område?',
        modelSentence: 'Mit område er grønt og stille. Jeg bor tæt på indkøb og bus.'
    }
};

// =========================================================================
// 24 BOLIG-ORD I VRIMLEBILLEDET (KORT, ENKELT DU1 MODUL 4 DANSK)
// =========================================================================
export const BOLIG_WORDS = [
    {
        num: 1,
        id: 'b1_forstad_bydel',
        word: 'en bydel / en forstad',
        shortLabel: 'bydel / forstad',
        gender: 'en',
        possessive: 'min bydel',
        forms: 'bydelen · bydele',
        mindmapBox: 'sted_by',
        x: 87,
        y: 16,
        meaning: 'Et kvarter i byen (bydel) eller tæt uden for byen (forstad).',
        sentence: 'Jeg bor i en rolig bydel.',
        stikord: 'Odense · rolig bydel'
    },
    {
        num: 2,
        id: 'b2_stille_vej',
        word: 'en stille vej',
        shortLabel: 'en stille vej',
        gender: 'en',
        possessive: 'min vej',
        forms: 'vejen · veje',
        mindmapBox: 'sted_by',
        x: 11,
        y: 91,
        meaning: 'En vej uden meget trafik og larm.',
        sentence: 'Jeg bor på en stille vej.',
        stikord: 'stille vej · lidt trafik'
    },
    {
        num: 3,
        id: 'b3_flytte_ind',
        word: 'at flytte ind',
        shortLabel: 'at flytte ind',
        gender: '-',
        possessive: '-',
        forms: 'flytter ind · flyttede ind · er flyttet ind',
        mindmapBox: 'sted_by',
        x: 58,
        y: 80,
        meaning: 'At begynde at bo i en ny bolig.',
        sentence: 'Vi flyttede ind for to år siden.',
        stikord: 'flyttede ind 2024 · 2 år'
    },
    {
        num: 4,
        id: 'b4_lejlighed',
        word: 'en lejlighed (til leje)',
        shortLabel: 'en lejlighed',
        gender: 'en',
        possessive: 'min lejlighed',
        forms: 'lejligheden · lejligheder',
        mindmapBox: 'hus_lejlighed',
        x: 24,
        y: 10,
        meaning: 'En bolig i en bygning med flere familier.',
        sentence: 'Jeg bor til leje i en lejlighed.',
        stikord: 'lejlighed · til leje'
    },
    {
        num: 5,
        id: 'b5_raekkehus',
        word: 'et rækkehus',
        shortLabel: 'et rækkehus',
        gender: 'et',
        possessive: 'mit rækkehus',
        forms: 'rækkehuset · rækkehuse',
        mindmapBox: 'hus_lejlighed',
        x: 10,
        y: 44,
        meaning: 'Et hus bygget sammen med nabohusene, tit med en lille have.',
        sentence: 'Min søster bor i et rækkehus.',
        stikord: 'rækkehus · lille have'
    },
    {
        num: 6,
        id: 'b6_etage_2sal',
        word: 'i stueetagen / på 2. sal',
        shortLabel: 'stueetagen / 2. sal',
        gender: 'en',
        possessive: 'min etage',
        forms: 'i stueetagen · på 1. sal · på 2. sal',
        mindmapBox: 'hus_lejlighed',
        x: 19,
        y: 66,
        meaning: 'Nederst hedder i stueetagen. Ovenover hedder på 1. sal og 2. sal.',
        sentence: 'Min lejlighed ligger på 2. sal.',
        stikord: '2. sal (eller: stueetagen)'
    },
    {
        num: 7,
        id: 'b7_altan',
        word: 'en altan',
        shortLabel: 'en altan',
        gender: 'en',
        possessive: 'min altan',
        forms: 'altanen · altaner',
        mindmapBox: 'hus_lejlighed',
        x: 14,
        y: 48,
        meaning: 'En lille plads ude foran en lejlighed, hvor man kan sidde i solen.',
        sentence: 'Vi drikker kaffe på min altan.',
        stikord: 'altan · sol · blomster'
    },
    {
        num: 8,
        id: 'b8_husleje',
        word: 'en husleje',
        shortLabel: 'en husleje',
        gender: 'en',
        possessive: 'min husleje',
        forms: 'huslejen · huslejer',
        mindmapBox: 'hus_lejlighed',
        x: 66,
        y: 14,
        meaning: 'De penge man betaler hver måned for en lejebolig.',
        sentence: 'Min husleje er 6.500 kroner.',
        stikord: 'husleje 6.500 kr.'
    },
    {
        num: 9,
        id: 'b9_kvadratmeter',
        word: 'kvadratmeter (m²) & rummelig',
        shortLabel: 'kvadratmeter (m²)',
        gender: 'en',
        possessive: '-',
        forms: '75 kvadratmeter · rummelig = god plads',
        mindmapBox: 'vaerelser_m2',
        x: 38,
        y: 10,
        meaning: 'Viser hvor stor boligen er. "m²" udtales kvadratmeter.',
        sentence: 'Min bolig er 75 kvadratmeter.',
        stikord: '75 m² · rummelig'
    },
    {
        num: 10,
        id: 'b10_stue_lys',
        word: 'en lys stue',
        shortLabel: 'en lys stue',
        gender: 'en',
        possessive: 'min stue',
        forms: 'stuen · stuer',
        mindmapBox: 'vaerelser_m2',
        x: 23,
        y: 38,
        meaning: 'Rummet med sofa og bord. "Lys" betyder meget dagslys.',
        sentence: 'Min stue er stor og lys.',
        stikord: 'lys stue · sofa'
    },
    {
        num: 11,
        id: 'b11_koekken_opvaskemaskine',
        word: 'et køkken & en opvaskemaskine',
        shortLabel: 'køkken & opvaskemaskine',
        gender: 'et',
        possessive: 'mit køkken',
        forms: 'køkkenet · en opvaskemaskine',
        mindmapBox: 'vaerelser_m2',
        x: 45,
        y: 43,
        meaning: 'Rummet hvor man laver mad og vasker op.',
        sentence: 'Mit køkken har en opvaskemaskine.',
        stikord: 'køkken · opvaskemaskine'
    },
    {
        num: 12,
        id: 'b12_sovevaerelse',
        word: 'et soveværelse',
        shortLabel: 'et soveværelse',
        gender: 'et',
        possessive: 'mit soveværelse',
        forms: 'soveværelset · et børneværelse · flere værelser',
        mindmapBox: 'vaerelser_m2',
        x: 29,
        y: 21,
        meaning: 'Rummet med seng. Alle ord med -værelse er et-ord (mit).',
        sentence: 'Mit soveværelse er stille.',
        stikord: 'soveværelse · børneværelse'
    },
    {
        num: 13,
        id: 'b13_badevaerelse',
        word: 'et badeværelse',
        shortLabel: 'et badeværelse',
        gender: 'et',
        possessive: 'mit badeværelse',
        forms: 'badeværelset · badeværelser',
        mindmapBox: 'vaerelser_m2',
        x: 45,
        y: 20,
        meaning: 'Rummet med toilet, vask og bruser.',
        sentence: 'Mit badeværelse har en bruser.',
        stikord: 'badeværelse · bruser'
    },
    {
        num: 14,
        id: 'b14_entre',
        word: 'en entré',
        shortLabel: 'en entré',
        gender: 'en',
        possessive: 'min entré',
        forms: 'entréen · entréer',
        mindmapBox: 'vaerelser_m2',
        x: 39,
        y: 66,
        meaning: 'Det lille rum ved døren til sko og jakker.',
        sentence: 'Mine sko står i min entré.',
        stikord: 'lille entré'
    },
    {
        num: 15,
        id: 'b15_vaskerum_kaelder',
        word: 'et vaskerum (i kælderen)',
        shortLabel: 'vaskerum (kælder)',
        gender: 'et',
        possessive: 'vores vaskerum',
        forms: 'vaskerummet · kælderen · mit kælderrum',
        mindmapBox: 'vaerelser_m2',
        x: 27,
        y: 88,
        meaning: 'Et fælles rum i kælderen med vaskemaskiner.',
        sentence: 'Vi vasker tøj i vaskerummet.',
        stikord: 'vaskerum · kælder'
    },
    {
        num: 16,
        id: 'b16_sammen_med_familie',
        word: 'at bo sammen med',
        shortLabel: 'bo sammen med',
        gender: '-',
        possessive: 'min familie / mine børn',
        forms: 'jeg bor sammen med...',
        mindmapBox: 'alene_sammen',
        x: 31,
        y: 41,
        meaning: 'At dele bolig med familie, kæreste eller venner.',
        sentence: 'Jeg bor sammen med min familie.',
        stikord: 'mand / kone · 2 børn'
    },
    {
        num: 17,
        id: 'b17_bo_alene',
        word: 'at bo alene',
        shortLabel: 'at bo alene',
        gender: '-',
        possessive: 'min bolig',
        forms: 'jeg bor alene',
        mindmapBox: 'alene_sammen',
        x: 26,
        y: 67,
        meaning: 'At være den eneste person i boligen.',
        sentence: 'Min nabo bor alene i stueetagen.',
        stikord: 'bor alene · stille'
    },
    {
        num: 18,
        id: 'b18_kaeledyr',
        word: 'et kæledyr (kat / hund)',
        shortLabel: 'et kæledyr',
        gender: 'et',
        possessive: 'mit kæledyr / min kat',
        forms: 'kæledyret · en kat · en hund',
        mindmapBox: 'alene_sammen',
        x: 33,
        y: 53,
        meaning: 'Et dyr som bor hjemme hos familien.',
        sentence: 'Vi har en lille kat.',
        stikord: 'kat (eller: ingen dyr)'
    },
    {
        num: 19,
        id: 'b19_opgang_hilse',
        word: 'en opgang & at hilse',
        shortLabel: 'en opgang',
        gender: 'en',
        possessive: 'min opgang',
        forms: 'opgangen · hilser · hilste',
        mindmapBox: 'naboer',
        x: 56,
        y: 35,
        meaning: 'Den fælles trappe i bygningen. Man siger hej til naboerne.',
        sentence: 'Jeg hilser på mine naboer i opgangen.',
        stikord: 'opgang · hilser'
    },
    {
        num: 20,
        id: 'b20_hjaelpsom_soed',
        word: 'sød, hjælpsom & rolig',
        shortLabel: 'søde & rolige naboer',
        gender: '-',
        possessive: 'mine naboer',
        forms: 'søde · hjælpsomme · rolige (flertal)',
        mindmapBox: 'naboer',
        x: 59,
        y: 55,
        meaning: 'Gode ord til at beskrive venlige og stille naboer.',
        sentence: 'Mine naboer er søde og hjælpsomme.',
        stikord: 'søde · hjælpsomme · rolige'
    },
    {
        num: 21,
        id: 'b21_baggaard_nabohygge',
        word: 'en gård / en baggård',
        shortLabel: 'en baggård',
        gender: 'en',
        possessive: 'vores gård',
        forms: 'gården · baggården',
        mindmapBox: 'naboer',
        x: 74,
        y: 55,
        meaning: 'Det grønne udeområde bag bygningen til alle beboere.',
        sentence: 'Vi drikker kaffe med naboer i gården.',
        stikord: 'gård · kaffe om sommeren'
    },
    {
        num: 22,
        id: 'b22_groent_omraade_legeplads',
        word: 'et grønt område & en legeplads',
        shortLabel: 'grønt område & legeplads',
        gender: 'et',
        possessive: 'mit område',
        forms: 'området · en legeplads · legepladsen',
        mindmapBox: 'omraade',
        x: 72,
        y: 38,
        meaning: 'Et kvarter med træer, græs og plads til børn.',
        sentence: 'Mit område er grønt og har en legeplads.',
        stikord: 'grønt område · legeplads'
    },
    {
        num: 23,
        id: 'b23_taet_paa_indkoeb',
        word: 'tæt på indkøb',
        shortLabel: 'tæt på indkøb',
        gender: '-',
        possessive: '-',
        forms: 'tæt på (kort vej) · langt fra (lang vej)',
        mindmapBox: 'omraade',
        x: 75,
        y: 78,
        meaning: 'Der er kort vej til supermarked og butikker.',
        sentence: 'Jeg bor tæt på indkøb.',
        stikord: 'tæt på Netto · 5 min.'
    },
    {
        num: 24,
        id: 'b24_offentlig_transport_bus',
        word: 'et busstoppested',
        shortLabel: 'busstoppested',
        gender: 'et',
        possessive: 'mit busstoppested',
        forms: 'busstoppestedet · en cykelsti',
        mindmapBox: 'omraade',
        x: 88,
        y: 74,
        meaning: 'Stedet hvor bussen stopper. Nemt til arbejde og sprogskole.',
        sentence: 'Der er et busstoppested tæt på.',
        stikord: 'bus · tæt på · cykelsti'
    }
];

// =========================================================================
// FANE 2: 12 ENKLE DU1-PUSLEØVELSER
// =========================================================================
const BOLIG_PUZZLES = [
    { num: 1, boxId: 'sted_by', q: 'Hvor bor du?', correct: ['Jeg', 'bor', 'i en lejlighed', 'i Odense.'], scrambled: ['i Odense.', 'bor', 'Jeg', 'i en lejlighed'] },
    { num: 2, boxId: 'sted_by', q: 'Hvor længe har I boet her?', correct: ['Vi', 'har boet', 'på en stille vej', 'i to år.'], scrambled: ['i to år.', 'på en stille vej', 'Vi', 'har boet'] },
    { num: 3, boxId: 'hus_lejlighed', q: 'Hvilken etage bor du på?', correct: ['Min lejlighed', 'ligger', 'på 2. sal', 'i byen.'], scrambled: ['i byen.', 'ligger', 'på 2. sal', 'Min lejlighed'] },
    { num: 4, boxId: 'hus_lejlighed', q: 'Hvad laver I på altanen?', correct: ['Vi', 'drikker', 'kaffe', 'på altanen.'], scrambled: ['på altanen.', 'kaffe', 'Vi', 'drikker'] },
    { num: 5, boxId: 'vaerelser_m2', q: 'Hvor stor er din bolig?', correct: ['Min bolig', 'er', '75 kvadratmeter', 'og lys.'], scrambled: ['og lys.', '75 kvadratmeter', 'Min bolig', 'er'] },
    { num: 6, boxId: 'vaerelser_m2', q: 'Hvor vasker I tøj?', correct: ['Vi', 'vasker', 'tøj', 'i kælderen.'], scrambled: ['i kælderen.', 'Vi', 'vasker', 'tøj'] },
    { num: 7, boxId: 'alene_sammen', q: 'Hvem bor du sammen med?', correct: ['Jeg', 'bor', 'med min familie', 'i Odense.'], scrambled: ['i Odense.', 'med min familie', 'bor', 'Jeg'] },
    { num: 8, boxId: 'alene_sammen', q: 'Hvordan bor din nabo?', correct: ['Min nabo', 'bor', 'alene', 'i stueetagen.'], scrambled: ['i stueetagen.', 'alene', 'Min nabo', 'bor'] },
    { num: 9, boxId: 'naboer', q: 'Hvad gør du i opgangen?', correct: ['Jeg', 'hilser', 'på mine naboer', 'i opgangen.'], scrambled: ['i opgangen.', 'hilser', 'på mine naboer', 'Jeg'] },
    { num: 10, boxId: 'naboer', q: 'Hvordan er dine naboer?', correct: ['Mine naboer', 'er', 'søde og rolige', 'hver dag.'], scrambled: ['hver dag.', 'søde og rolige', 'er', 'Mine naboer'] },
    { num: 11, boxId: 'omraade', q: 'Hvor leger børnene?', correct: ['Børnene', 'leger', 'sammen', 'på legepladsen.'], scrambled: ['på legepladsen.', 'sammen', 'Børnene', 'leger'] },
    { num: 12, boxId: 'omraade', q: 'Hvad ligger tæt på?', correct: ['Mit område', 'ligger', 'tæt på indkøb', 'og bus.'], scrambled: ['og bus.', 'Mit område', 'tæt på indkøb', 'ligger'] }
];

// =========================================================================
// FANE 3: POSSESSIVE PRONOMINER (MIN, MIT, MINE & VORES)
// =========================================================================
const POSSESSIVE_DUELS = [
    { num: 1, noun: 'lejlighed', answer: 'min', ruleKey: 'pd_en', sentence: 'Jeg er glad for ___ lejlighed.' },
    { num: 2, noun: 'hus', answer: 'mit', ruleKey: 'pd_et', sentence: '___ hus har en lille have.' },
    { num: 3, noun: 'rækkehus', answer: 'mit', ruleKey: 'pd_et', sentence: '___ rækkehus er nyt.' },
    { num: 4, noun: 'stue', answer: 'min', ruleKey: 'pd_en', sentence: '___ stue er stor og lys.' },
    { num: 5, noun: 'køkken', answer: 'mit', ruleKey: 'pd_et', sentence: 'Jeg laver mad i ___ køkken.' },
    { num: 6, noun: 'soveværelse', answer: 'mit', ruleKey: 'pd_et', sentence: '___ soveværelse er stille.' },
    { num: 7, noun: 'badeværelse', answer: 'mit', ruleKey: 'pd_et', sentence: '___ badeværelse har en bruser.' },
    { num: 8, noun: 'værelser', answer: 'mine', ruleKey: 'pd_pl', sentence: '___ tre værelser er lyse.' },
    { num: 9, noun: 'altan', answer: 'min', ruleKey: 'pd_en', sentence: 'Jeg drikker kaffe på ___ altan.' },
    { num: 10, noun: 'husleje', answer: 'min', ruleKey: 'pd_en', sentence: '___ husleje er 6.500 kroner.' },
    { num: 11, noun: 'opgang', answer: 'min', ruleKey: 'pd_en', sentence: 'Jeg hilser i ___ opgang.' },
    { num: 12, noun: 'naboer', answer: 'mine', ruleKey: 'pd_pl', sentence: '___ naboer er søde og rolige.' },
    { num: 13, noun: 'område', answer: 'mit', ruleKey: 'pd_et', sentence: '___ område er grønt og stille.' },
    { num: 14, noun: 'entré', answer: 'min', ruleKey: 'pd_en', sentence: 'Mine sko står i ___ entré.' },
    { num: 15, noun: 'børn', answer: 'mine', ruleKey: 'pd_pl', sentence: 'Jeg bor sammen med ___ børn.' },
    { num: 16, noun: 'kælderrum', answer: 'mit', ruleKey: 'pd_et', sentence: 'Min cykel står i ___ kælderrum.' }
];

const POSSESSIVE_TRANSFORM_CHALLENGES = [
    {
        num: 1,
        options: [
            { text: 'Min lejlighed ligger på 2. sal.', correct: true },
            { text: 'Min lejligheden ligger på 2. sal.', correct: false },
            { text: 'Mit lejlighed ligger på 2. sal.', correct: false }
        ]
    },
    {
        num: 2,
        options: [
            { text: 'Vi er glade for vores lejlighed og vores hus.', correct: true },
            { text: 'Vi er glade for vores lejligheden og vores huset.', correct: false },
            { text: 'Vi er glade for min lejlighed og mit naboer.', correct: false }
        ]
    },
    {
        num: 3,
        options: [
            { text: 'mit værelse → mine værelser', correct: true },
            { text: 'mit værelse → mit værelser', correct: false },
            { text: 'min værelse → mine værelserne', correct: false }
        ]
    },
    {
        num: 4,
        options: [
            { text: 'Mit køkken er lille. Min stue er lys. Mit område er stille.', correct: true },
            { text: 'Min køkken er lille. Mit stue er lys. Min område er stille.', correct: false },
            { text: 'Mine køkken er lille. Min stue er lys. Mit området er stille.', correct: false }
        ]
    },
    {
        num: 5,
        options: [
            { text: 'Mine naboer er søde.', correct: true },
            { text: 'Min naboer er søde.', correct: false },
            { text: 'Mine naboerne er søde.', correct: false }
        ]
    },
    {
        num: 6,
        options: [
            { text: 'Jeg kan godt lide mit område.', correct: true },
            { text: 'Jeg kan godt lide min område.', correct: false },
            { text: 'Jeg kan godt lide mit området.', correct: false }
        ]
    }
];

const POSSESSIVE_CLOZE_STORY = [
    { id: 'c1', trKey: 'pc1', before: 'Jeg vil fortælle om ', after: ' bolig. (en bolig)', options: ['min', 'mit', 'mine'], answer: 'min' },
    { id: 'c2', trKey: 'pc2', before: 'Jeg bor i ', after: ' lejlighed i Odense. (en lejlighed)', options: ['min', 'mit', 'mine'], answer: 'min' },
    { id: 'c3', trKey: 'pc3', before: 'Vi sidder tit på ', after: ' altan. (en altan)', options: ['min', 'mit', 'mine'], answer: 'min' },
    { id: 'c4', trKey: 'pc4', before: '', after: ' stue er stor og lys. (en stue)', options: ['Min', 'Mit', 'Mine'], answer: 'Min' },
    { id: 'c5', trKey: 'pc5', before: '', after: ' køkken er lille. (et køkken)', options: ['Min', 'Mit', 'Mine'], answer: 'Mit' },
    { id: 'c6', trKey: 'pc6', before: '', after: ' soveværelse er stille. (et soveværelse)', options: ['Min', 'Mit', 'Mine'], answer: 'Mit' },
    { id: 'c7', trKey: 'pc7', before: '', after: ' tre værelser er gode. (flertal)', options: ['Min', 'Mit', 'Mine'], answer: 'Mine' },
    { id: 'c8', trKey: 'pc8', before: 'Jeg bor med ', after: ' mand. (en mand)', options: ['min', 'mit', 'mine'], answer: 'min' },
    { id: 'c9', trKey: 'pc9', before: 'Jeg bor også med ', after: ' to børn. (flertal)', options: ['min', 'mit', 'mine'], answer: 'mine' },
    { id: 'c10', trKey: 'pc10', before: '', after: ' område er grønt og roligt. (et område)', options: ['Min', 'Mit', 'Mine'], answer: 'Mit' }
];

// =========================================================================
// FANE 4: MINDMAP-VÆRKSTED (KUN STIKORD -> ENKEL DEL 1-PRÆSENTATION)
// =========================================================================
const STIKORD_VS_SAETNING_QUIZ = [
    {
        num: 1,
        boxId: 'sted_by',
        options: [
            { text: 'Odense · stille vej · 2 år', correct: true },
            { text: 'Jeg bor i Odense på en stille vej, og jeg har boet her i to år.', correct: false }
        ],
        oralExpansionDa: 'Du siger til testeren: »Jeg bor i Odense på en stille vej. Jeg har boet her i to år.«'
    },
    {
        num: 2,
        boxId: 'hus_lejlighed',
        options: [
            { text: 'Lejlighed · 2. sal · altan · til leje', correct: true },
            { text: 'Jeg bor til leje i en lejlighed på 2. sal med altan.', correct: false }
        ],
        oralExpansionDa: 'Du siger til testeren: »Jeg bor til leje i en lejlighed på 2. sal. Jeg har en altan.«'
    },
    {
        num: 3,
        boxId: 'vaerelser_m2',
        options: [
            { text: '75 m² · 3 værelser · lys stue · køkken', correct: true },
            { text: 'Min lejlighed er 75 kvadratmeter og har tre værelser og et køkken.', correct: false }
        ],
        oralExpansionDa: 'Du siger til testeren: »Min lejlighed er 75 kvadratmeter. Den har tre værelser, et køkken og et badeværelse.«'
    },
    {
        num: 4,
        boxId: 'alene_sammen',
        options: [
            { text: 'Mand · 2 børn · kat', correct: true },
            { text: 'Jeg bor sammen med min mand, mine to børn og vores kat.', correct: false }
        ],
        oralExpansionDa: 'Du siger til testeren: »Jeg bor sammen med min mand og mine to børn. Vi har også en kat.«'
    },
    {
        num: 5,
        boxId: 'naboer',
        options: [
            { text: 'Søde · rolige · hilser i opgangen', correct: true },
            { text: 'Mine naboer er søde og rolige, og vi hilser i opgangen.', correct: false }
        ],
        oralExpansionDa: 'Du siger til testeren: »Mine naboer er søde og rolige. Vi hilser på hinanden i opgangen.«'
    },
    {
        num: 6,
        boxId: 'omraade',
        options: [
            { text: 'Grønt · legeplads · tæt på indkøb og bus', correct: true },
            { text: 'Mit område er grønt med en legeplads, og det ligger tæt på indkøb og bus.', correct: false }
        ],
        oralExpansionDa: 'Du siger til testeren: »Mit område er grønt og roligt. Jeg bor tæt på indkøb og bus.«'
    }
];

// =========================================================================
// FANE 5: DEL 2 — TESTERENS SPØRGSMÅL
// =========================================================================
const EXAMINER_FOLLOWUP_QUESTIONS = [
    {
        num: 1,
        examinerQ: 'Tester: »Er du glad for din lejlighed? Hvorfor?«',
        options: [
            { text: 'Ja, jeg er glad for min lejlighed. Den er lys, og vi har en altan.', correct: true },
            { text: 'Ja.', correct: false },
            { text: 'Tak for besøget.', correct: false }
        ]
    },
    {
        num: 2,
        examinerQ: 'Tester: »Hvilket rum kan du bedst lide?«',
        options: [
            { text: 'Jeg kan bedst lide min stue. Den er stor og lys.', correct: true },
            { text: 'Stue.', correct: false },
            { text: 'Jeg bor i Odense.', correct: false }
        ]
    },
    {
        num: 3,
        examinerQ: 'Tester: »Taler du med dine naboer?«',
        options: [
            { text: 'Ja, vi hilser i opgangen. Nogle gange drikker vi kaffe i gården.', correct: true },
            { text: 'Lidt.', correct: false },
            { text: 'Velbekomme.', correct: false }
        ]
    },
    {
        num: 4,
        examinerQ: 'Tester: »Kan du godt lide dit område? Hvorfor?«',
        options: [
            { text: 'Ja, jeg kan godt lide mit område. Det er stille og tæt på indkøb.', correct: true },
            { text: 'Fint område.', correct: false },
            { text: 'Min husleje er 6.500.', correct: false }
        ]
    },
    {
        num: 5,
        examinerQ: 'Tester: »Er der noget, du ikke er så glad for?«',
        options: [
            { text: 'Jeg er glad for min bolig, men mit køkken er lidt lille.', correct: true },
            { text: 'Nej.', correct: false },
            { text: 'Jeg har to børn.', correct: false }
        ]
    },
    {
        num: 6,
        examinerQ: 'Tester: »Vil du blive boende her?«',
        options: [
            { text: 'Ja, nu er jeg glad for min lejlighed. Senere vil jeg gerne have et hus.', correct: true },
            { text: 'Måske.', correct: false },
            { text: 'På 2. sal.', correct: false }
        ]
    }
];

const DU1_MODUL4_BOLIG_AI_PROMPT = `Rolle:
Du er en venlig tester til Danskuddannelse 1 (DU1), Modul 4 mundtlig test (Opgave 1: "Min bolig").

Sprogniveau (VIGTIGT):
Brug altid MEGET ENKELT, KORT dansk (DU1 Modul 4 / A1+–A2). Brug korte hovedsætninger og almindelige hverdagsord. Forvent korte, enkle sætninger fra kursisten — ikke lange komplekse sætninger.

Trin 1: Start & Del 1 (1–2 minutter)
Spørg først kursisten, hvilket støttesprog de ønsker til korte tips (fx engelsk, arabisk, ukrainsk, vietnamesisk, farsi, urdu eller kun dansk).
Bed derefter kursisten om at fortælle kort om sin bolig ud fra de 6 bokse på mindmappet:
1. sted / by
2. hus / lejlighed
3. værelser / m²
4. alene / sammen med
5. naboer
6. område

Trin 2: Kort feedback + Del 2 (3 minutter)
Når kursisten har fortalt om sin bolig:
1. Ros kursisten på enkelt dansk.
2. Giv kun 1–2 korte, venlige tips på støttesproget (især om min/mit/mine/vores eller ordstilling).
3. Stil derefter ÉT kort uddybende spørgsmål ad gangen (i alt 4 spørgsmål), fx:
   - "Er du glad for din bolig? Hvorfor?"
   - "Hvilket rum kan du bedst lide?"
   - "Taler du med dine naboer?"
   - "Kan du godt lide dit område?"
Hvis kursisten svarer med kun ét ord ("Ja"), så hjælp venligt med at lave en hel kort sætning. Slut af med ros og de bedste bolig-ord, kursisten brugte.`;

// =========================================================================
// FANE 6: 12 BOLIG-DETEKTIV MISSIONER
// =========================================================================
const BOLIG_DETECTIVE_MISSIONS = [
    { num: 1, prompt: 'Find den stille vej.', answerId: 'b2_stille_vej', hint: 'Nederst til venstre (#2).' },
    { num: 2, prompt: 'Find altanen med blomster.', answerId: 'b7_altan', hint: 'Til venstre på 1. sal (#7).' },
    { num: 3, prompt: 'Find det røde rækkehus.', answerId: 'b5_raekkehus', hint: 'Helt til venstre (#5).' },
    { num: 4, prompt: 'Find den lyse stue med sofaen.', answerId: 'b10_stue_lys', hint: 'Inde i lejligheden på 1. sal til venstre (#10).' },
    { num: 5, prompt: 'Find køkkenet med opvaskemaskine.', answerId: 'b11_koekken_opvaskemaskine', hint: 'Til højre for stuen (#11).' },
    { num: 6, prompt: 'Find soveværelset på 2. sal.', answerId: 'b12_sovevaerelse', hint: 'Øverst til venstre i huset (#12).' },
    { num: 7, prompt: 'Find badeværelset med bruser.', answerId: 'b13_badevaerelse', hint: 'Øverst til højre for soveværelset (#13).' },
    { num: 8, prompt: 'Find vaskerummet i kælderen.', answerId: 'b15_vaskerum_kaelder', hint: 'Nederst i kælderen (#15).' },
    { num: 9, prompt: 'Find manden der bor alene i stueetagen.', answerId: 'b17_bo_alene', hint: 'I stueetagen til venstre (#17).' },
    { num: 10, prompt: 'Find opgangen hvor naboerne hilser.', answerId: 'b19_opgang_hilse', hint: 'På trappen til højre i huset (#19).' },
    { num: 11, prompt: 'Find baggården hvor naboerne drikker kaffe.', answerId: 'b21_baggaard_nabohygge', hint: 'I gården til højre (#21).' },
    { num: 12, prompt: 'Find butikken tæt på (indkøb).', answerId: 'b23_taet_paa_indkoeb', hint: 'Nederst til højre (#23).' }
];

function speakBolig(text, rate = 0.88, pitch = 1.02) {
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
            width: 100%;
            max-width: 1160px;
            margin: 0 auto;
            padding: 1rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        .mb-tr {
            font-size: 0.83rem;
            color: #94a3b8;
            font-weight: 600;
            margin-top: 0.18rem;
            line-height: 1.4;
            text-align: left;
        }
        .mb-tr-sent {
            font-size: 0.86rem;
            color: #99f6e4;
            font-weight: 600;
            margin-top: 0.25rem;
            line-height: 1.4;
            text-align: left;
        }
        .mb-tr-slot {
            font-size: 0.72rem;
            color: #cbd5e1;
            font-weight: 600;
            margin-top: 0.08rem;
            line-height: 1.3;
            text-align: left;
        }
        .mb-hero {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.97) 0%, rgba(30, 41, 59, 0.96) 55%, rgba(20, 184, 166, 0.24) 100%);
            border: 1.5px solid rgba(45, 212, 191, 0.42);
            border-radius: 20px;
            padding: 1rem 1.35rem;
            margin-bottom: 1rem;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.36);
        }
        .mb-hero h1 {
            margin: 0 0 0.25rem;
            font-size: clamp(1.35rem, 2.4vw, 1.85rem);
            font-weight: 900;
            color: #ffffff;
            text-align: start;
        }
        .mb-hero p {
            margin: 0;
            color: #cbd5e1;
            font-size: 0.92rem;
            line-height: 1.45;
        }
        .mb-mindmap-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
            gap: 0.65rem;
        }
        .mb-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-bottom: 1.05rem;
        }
        .mb-tab-btn {
            background: rgba(15, 23, 42, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.3);
            color: #cbd5e1;
            padding: 0.56rem 0.92rem;
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
            border-radius: 18px;
            padding: 1.15rem;
            margin-bottom: 1rem;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.32);
        }
        .mb-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 0.85rem;
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
            padding: 0.4rem 0.76rem;
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
            margin-bottom: 0.95rem;
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
            padding: 0.22rem 0.5rem;
            border-radius: 10px;
            color: #ffffff;
            font-weight: 900;
            font-size: 0.72rem;
            line-height: 1.15;
            white-space: nowrap;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.28rem;
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
            border-radius: 15px;
            padding: 1rem 1.15rem;
            background: rgba(9, 14, 26, 0.94);
            border: 1.5px solid rgba(148, 163, 184, 0.32);
        }
        .mb-pill-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.22rem 0.65rem;
            border-radius: 999px;
            font-size: 0.74rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .mb-btn-primary {
            background: linear-gradient(135deg, #0d9488, #0284c7);
            border: 1px solid #5eead4;
            color: #ffffff;
            padding: 0.5rem 0.95rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.84rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .mb-btn-primary:hover { filter: brightness(1.1); }
        .mb-btn-secondary {
            background: rgba(30, 41, 59, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.35);
            color: #e2e8f0;
            padding: 0.46rem 0.85rem;
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
            grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
            gap: 0.6rem;
            margin-bottom: 0.85rem;
        }
        .mb-slot {
            border-radius: 13px;
            padding: 0.7rem 0.85rem;
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
            margin-bottom: 0.8rem;
        }
        .mb-chip {
            background: rgba(30, 41, 59, 0.92);
            border: 1.5px solid rgba(148, 163, 184, 0.35);
            color: #f8fafc;
            padding: 0.46rem 0.85rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.85rem;
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
            padding: 0.72rem 0.95rem;
            border-radius: 12px;
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
            margin-top: 0.75rem;
            padding: 0.8rem 0.95rem;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 700;
            line-height: 1.45;
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

    const lang = getLang() || 'da';
    const isDa = lang === 'da';
    const rtlAttr = isMbRtl(lang) ? ' dir="rtl"' : '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container min-bolig-view';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + (getTranslation('back') || mbT('btn_back', lang));
    backBtn.onclick = () => navigateFn('mit_hverdagsliv');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Kompakt Hero med oversættelse
    const hero = document.createElement('div');
    hero.className = 'mb-hero';
    hero.innerHTML = `
        <h1${rtlAttr}>${mbT('hero_title', lang)}</h1>
        <p${rtlAttr}>${mbT('hero_desc', lang)}</p>
    `;
    viewContainer.appendChild(hero);

    const tabs = [
        { id: 'tab_vrimmel', label: mbT('tab_1', lang) },
        { id: 'tab_pusle', label: mbT('tab_2', lang) },
        { id: 'tab_possessiv', label: mbT('tab_3', lang) },
        { id: 'tab_mindmap', label: mbT('tab_4', lang) },
        { id: 'tab_del2_dialog', label: mbT('tab_5', lang) },
        { id: 'tab_detektiv', label: mbT('tab_6', lang) }
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
        btn.textContent = t.label;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        const activeLang = getLang() || 'da';
        history.pushState(null, '', `#/${activeLang}/mit_hverdagsliv_bolig/${tabId}`);
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
    // FANE 1: VRIMLEBILLEDE (24 BOLIG-ORD) + VALGFRI MINDMAP-SORTERING
    // =========================================================================
    const panel1 = makePanel('tab_vrimmel');
    let activeBoxFilter = 'alle';
    let selectedWord = BOLIG_WORDS[0];
    let compactPins = false;
    let zoomed = false;
    let showSortDrill = false;

    const card1 = document.createElement('div');
    card1.className = 'mb-card';
    card1.innerHTML = `
        <div class="mb-toolbar">
            <div class="mb-filters">
                <button type="button" class="mb-filter-btn active" data-bfilter="alle">${mbT('btn_all_24', lang)}</button>
                ${Object.values(MINDMAP_BOXES).map(b => `
                    <button type="button" class="mb-filter-btn" data-bfilter="${b.id}" style="border-color:${b.border}; color:${b.color};">
                        ${mbT('box_' + b.id, lang)}
                    </button>
                `).join('')}
            </div>
            <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                <button type="button" class="mb-btn-secondary" id="mb-toggle-pinmode">${mbT('btn_only_nums', lang)}</button>
                <button type="button" class="mb-btn-secondary" id="mb-zoom-btn">${mbT('btn_zoom_in', lang)}</button>
            </div>
        </div>

        <div class="mb-stage-wrap">
            <div class="mb-stage-inner" id="mb-stage-inner">
                <img src="assets/min_bolig_vrimmel.jpg" onerror="this.src='assets/koekken_vrimmel.jpg'" alt="Min bolig vrimlebillede" class="mb-stage-img" />
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
        e.currentTarget.textContent = zoomed ? mbT('btn_zoom_out', lang) : mbT('btn_zoom_in', lang);
    };

    card1.querySelector('#mb-toggle-pinmode').onclick = (e) => {
        compactPins = !compactPins;
        e.currentTarget.textContent = compactPins ? mbT('btn_show_words', lang) : mbT('btn_only_nums', lang);
        renderPegefelter();
    };

    function renderWordDetail(w) {
        const boxMeta = MINDMAP_BOXES[w.mindmapBox];
        detailBox.style.borderColor = boxMeta.border;
        detailBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.5rem;">
                <div>
                    <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                        <span style="font-size:1.25rem; font-weight:900; color:#ffffff;">#${w.num}. ${w.word}</span>
                        <span class="mb-pill-tag" style="background:${boxMeta.bg}; color:${boxMeta.color}; border:1px solid ${boxMeta.border};">
                            ${mbT('box_' + w.mindmapBox, lang)}
                        </span>
                        ${w.possessive !== '-' ? `
                            <span class="mb-pill-tag" style="background:rgba(245,158,11,0.14); color:#fde68a; border:1px solid rgba(245,158,11,0.45);">
                                ${w.possessive}
                            </span>
                        ` : ''}
                    </div>
                    ${mbSub(`w${w.num}_word`, 'mb-tr-sent', lang)}
                </div>
                <button type="button" class="mb-btn-primary" id="mb-play-word-audio" style="display:inline-flex; align-items:center; gap:0.38rem;">
                    ${samtaleIcons.audio(15)} ${mbT('btn_listen', lang)}
                </button>
            </div>

            <div style="font-size:0.93rem; color:#e2e8f0; margin-bottom:0.55rem; line-height:1.45;">
                <div>${w.meaning}</div>
                ${mbSub(`w${w.num}_mean`, 'mb-tr', lang)}
            </div>

            <div style="background:rgba(15,23,42,0.95); border-left:4px solid ${boxMeta.color}; border-radius:11px; padding:0.65rem 0.9rem; margin-bottom:0.55rem;">
                <div style="font-size:0.98rem; color:#ffffff; font-weight:800;">»${w.sentence}«</div>
                ${mbSub(`w${w.num}_sent`, 'mb-tr-sent', lang)}
            </div>

            <div style="font-size:0.82rem; color:#94a3b8; display:flex; flex-wrap:wrap; gap:0.85rem;">
                <span><strong>${mbT('lbl_forms', lang)}</strong> ${w.forms}</span>
                <span><strong>${mbT('lbl_keywords', lang)}</strong> ${w.stikord}</span>
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
            btn.style.background = 'linear-gradient(135deg, rgba(15,23,42,0.94), rgba(30,41,59,0.95))';
            btn.style.border = `2px solid ${boxMeta.color}`;
            btn.title = `#${w.num} ${w.word}`;
            btn.innerHTML = compactPins
                ? `<span class="mb-pegefelt-num" style="background:${boxMeta.color}; color:#0f172a;">${w.num}</span>`
                : `<span class="mb-pegefelt-num" style="background:${boxMeta.color}; color:#0f172a;">${w.num}</span><span class="mb-pegefelt-label">${w.shortLabel}</span>`;
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

    // Valgfri 6-Boks Mindmap-sortering (sammenklappet som standard)
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
    let sortFeedback = null;

    function renderMindmapSorting() {
        const placedSet = new Set(Object.values(sortedBuckets).flat());
        if (placedSet.has(activeSortIdx)) {
            activeSortIdx = sortPool.findIndex((_, i) => !placedSet.has(i));
        }
        const activeItem = activeSortIdx >= 0 ? sortPool[activeSortIdx] : null;

        if (!showSortDrill) {
            sortCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
                    <div style="font-size:0.95rem; font-weight:800; color:#e2e8f0;"${rtlAttr}>
                        ${mbT('sort_collapsed', lang)} (${placedSet.size}/${sortPool.length})
                    </div>
                    <button type="button" class="mb-btn-secondary" id="mb-sort-toggle">${mbT('btn_open_ex', lang)}</button>
                </div>
            `;
            sortCard.querySelector('#mb-sort-toggle').onclick = () => {
                showSortDrill = true;
                renderMindmapSorting();
            };
            return;
        }

        sortCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <h3 style="margin:0; font-size:1.05rem; font-weight:900;"${rtlAttr}>${mbT('sort_title', lang)} (${placedSet.size}/${sortPool.length})</h3>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="mb-btn-secondary" id="mb-sort-reset">${mbT('btn_reset', lang)}</button>
                    <button type="button" class="mb-btn-secondary" id="mb-sort-toggle">${mbT('btn_hide', lang)}</button>
                </div>
            </div>
            <div class="mb-chips-pool" style="padding:0.75rem; border-radius:14px; background:rgba(9,14,26,0.85); border:1px solid rgba(148,163,184,0.22);">
                ${sortPool.map((item, idx) => {
                    const isPlaced = placedSet.has(idx);
                    const isActive = idx === activeSortIdx;
                    return `
                        <button type="button" class="mb-chip ${isActive ? 'selected' : ''}" data-msort-item="${idx}" ${isPlaced ? 'disabled' : ''}>
                            ${item.shortLabel}
                        </button>
                    `;
                }).join('')}
            </div>

            ${activeItem ? `
                <div style="margin-bottom:0.75rem; padding:0.65rem 0.9rem; border-radius:12px; background:rgba(20,184,166,0.12); border:1px solid #2dd4bf; font-size:0.9rem;">
                    <div><strong style="color:#ffffff;">${activeItem.word}</strong> <span style="color:#cbd5e1;">— »${activeItem.sentence}«</span></div>
                    ${mbSub(`w${activeItem.num}_sent`, 'mb-tr-sent', lang)}
                </div>
            ` : `
                <div class="mb-feedback ok" style="margin-bottom:0.75rem;"${rtlAttr}>
                    ${mbT('sort_done', lang)}
                </div>
            `}

            <div class="mb-mindmap-grid">
                ${Object.values(MINDMAP_BOXES).map(b => {
                    const items = sortedBuckets[b.id].map(i => sortPool[i]);
                    return `
                        <button type="button" data-msort-bucket="${b.id}" style="text-align:left; padding:0.8rem; border-radius:14px; background:${b.bg}; border:2px dashed ${b.border}; color:#ffffff; cursor:pointer;">
                            <div style="font-size:0.92rem; font-weight:900; color:${b.color}; margin-bottom:0.4rem;"${rtlAttr}>
                                ${mbT('box_' + b.id, lang)} (${items.length})
                            </div>
                            <div style="display:flex; flex-wrap:wrap; gap:0.28rem;">
                                ${items.length
                                    ? items.map(it => `<span style="padding:0.16rem 0.46rem; border-radius:999px; background:rgba(15,23,42,0.9); border:1px solid ${b.border}; font-size:0.74rem; font-weight:800;">${it.shortLabel}</span>`).join('')
                                    : `<span style="font-size:0.78rem; color:#94a3b8;">${mbT('sort_click_place', lang)}</span>`}
                            </div>
                        </button>
                    `;
                }).join('')}
            </div>
            ${sortFeedback ? `<div class="mb-feedback ${sortFeedback.ok ? 'ok' : 'err'}"${rtlAttr}>${sortFeedback.text}</div>` : ''}
        `;

        sortCard.querySelector('#mb-sort-toggle').onclick = () => {
            showSortDrill = false;
            renderMindmapSorting();
        };
        sortCard.querySelector('#mb-sort-reset').onclick = () => {
            Object.keys(sortedBuckets).forEach(k => { sortedBuckets[k] = []; });
            activeSortIdx = 0;
            sortFeedback = null;
            renderMindmapSorting();
        };

        sortCard.querySelectorAll('[data-msort-item]').forEach(btn => {
            btn.onclick = () => {
                activeSortIdx = Number(btn.dataset.msortItem);
                sortFeedback = null;
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
                    sortFeedback = { ok: true, text: `✓ ${mbT('sort_ok', lang)} ${mbT('box_' + targetBox, lang)} («${item.word}»).` };
                } else {
                    sortFeedback = { ok: false, text: `✗ ${mbT('sort_err', lang)} ${mbT('box_' + item.mindmapBox, lang)}.` };
                }
                renderMindmapSorting();
            };
        });
    }

    renderMindmapSorting();
    panel1.appendChild(sortCard);
    panelsHolder.appendChild(panel1);

    // =========================================================================
    // FANE 2: BYG SÆTNINGER (PUSLESPIL & BYG SELV — OVERSATTE HJÆLPESPØRGSMÅL!)
    // =========================================================================
    const panel2 = makePanel('tab_pusle');
    let pusleMode = 'puzzle';
    const pusleModeBar = document.createElement('div');
    pusleModeBar.className = 'mb-filters';
    pusleModeBar.style.marginBottom = '0.9rem';

    const puzzleCard = document.createElement('div');
    puzzleCard.className = 'mb-card';
    const builderCard = document.createElement('div');
    builderCard.className = 'mb-card';

    function syncPusleMode() {
        pusleModeBar.innerHTML = `
            <button type="button" class="mb-filter-btn ${pusleMode === 'puzzle' ? 'active' : ''}" data-pmode="puzzle">${mbT('pusle_tab_puzzle', lang)}</button>
            <button type="button" class="mb-filter-btn ${pusleMode === 'builder' ? 'active' : ''}" data-pmode="builder">${mbT('pusle_tab_builder', lang)}</button>
        `;
        pusleModeBar.querySelectorAll('[data-pmode]').forEach(b => {
            b.onclick = () => {
                pusleMode = b.dataset.pmode;
                syncPusleMode();
            };
        });
        puzzleCard.style.display = pusleMode === 'puzzle' ? 'block' : 'none';
        builderCard.style.display = pusleMode === 'builder' ? 'block' : 'none';
    }

    let pzIdx = 0;
    const pzDone = new Set();
    let pzSlots = [null, null, null, null];

    const slotDefs = [
        { key: 'slot_1', da: '1. Hvem / hvad?', color: '#22c55e' },
        { key: 'slot_2', da: '2. Hvad sker der?', color: '#ef4444' },
        { key: 'slot_3', da: '3. Hvad / hvordan?', color: '#f59e0b' },
        { key: 'slot_4', da: '4. Hvor / hvornår?', color: '#38bdf8' }
    ];

    function renderPuzzle() {
        const task = BOLIG_PUZZLES[pzIdx];
        const boxMeta = MINDMAP_BOXES[task.boxId];

        puzzleCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.65rem;">
                <span class="mb-pill-tag" style="background:${boxMeta.bg}; color:${boxMeta.color}; border:1px solid ${boxMeta.border};">
                    ${mbT('box_' + task.boxId, lang)}
                </span>
                <span style="font-size:0.84rem; color:#94a3b8; font-weight:800;">
                    ${mbT('lbl_task', lang)} ${pzIdx + 1}/${BOLIG_PUZZLES.length} • ${mbT('lbl_solved', lang)}: ${pzDone.size}/${BOLIG_PUZZLES.length}
                </span>
            </div>

            <div class="mb-chips-pool">
                ${BOLIG_PUZZLES.map((_, i) => `
                    <button type="button" class="mb-chip ${i === pzIdx ? 'selected' : ''}" data-pz-idx="${i}" style="padding:0.35rem 0.65rem; ${pzDone.has(i) ? 'border-color:#22c55e;' : ''}">
                        ${pzDone.has(i) ? `✓ ${i + 1}` : i + 1}
                    </button>
                `).join('')}
            </div>

            <div style="margin:0.35rem 0 0.8rem;">
                <h3 style="margin:0; font-size:1.12rem; font-weight:900; color:#ffffff;">${task.q}</h3>
                ${mbSub(`pz${task.num}_q`, 'mb-tr-sent', lang)}
            </div>

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
                    <div style="font-size:0.74rem; font-weight:900; color:${def.color};">${def.da}</div>
                    ${!isDa ? `<div class="mb-tr-slot"${rtlAttr}>${mbT(def.key, lang)}</div>` : ''}
                    <div${!pzSlots[idx] ? rtlAttr : ''} style="font-weight:800; font-size:0.95rem; margin-top:0.2rem; text-align:left; color:${pzSlots[idx] ? '#ffffff' : '#64748b'};">${pzSlots[idx] || mbT('slot_click_chip', lang)}</div>
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
                                    <div><strong>✓ ${mbT('pz_ok', lang)}</strong> »${fullSent}«</div>
                                    ${mbSub(`pz${task.num}_ans`, 'mb-tr-sent', lang)}
                                </div>
                                <div style="margin-top:0.6rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                                    <button type="button" class="mb-btn-secondary" id="mb-pz-speak" style="display:inline-flex; align-items:center; gap:0.35rem;">${samtaleIcons.audio(14)} ${mbT('btn_listen', lang)}</button>
                                    <button type="button" class="mb-btn-primary" id="mb-pz-next">${mbT('btn_next', lang)}</button>
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
                                <div class="mb-feedback err"${rtlAttr}>
                                    ${mbT('pz_err', lang)}
                                </div>
                                <div style="margin-top:0.5rem;">
                                    <button type="button" class="mb-btn-secondary" id="mb-pz-reset">${mbT('btn_reset', lang)}</button>
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

    const builderRows = [
        { key: 'slot_1', da: '1. Hvem / hvad?', color: '#22c55e', opts: ['Jeg', 'Vi', 'Min lejlighed', 'Mit hus', 'Mine naboer', 'Mit område'] },
        { key: 'slot_2', da: '2. Hvad sker der?', color: '#ef4444', opts: ['bor', 'ligger', 'er', 'har', 'hilser'] },
        { key: 'slot_3', da: '3. Hvad / hvordan?', color: '#f59e0b', opts: ['i en lejlighed', '75 kvadratmeter', 'med min familie', 'søde og rolige', 'tæt på indkøb'] },
        { key: 'slot_4', da: '4. Hvor / hvornår?', color: '#38bdf8', opts: ['i Odense', 'på 2. sal', 'på en stille vej', 'i opgangen', 'i gården'] }
    ];
    const bSelections = ['Jeg', 'bor', 'i en lejlighed', 'i Odense'];

    function renderStepBuilder() {
        const currentSent = `${bSelections[0]} ${bSelections[1]} ${bSelections[2]} ${bSelections[3]}.`;
        builderCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.8rem;">
                <h3 style="margin:0; font-size:1.08rem; font-weight:900;"${rtlAttr}>${mbT('builder_title', lang)}</h3>
                <button type="button" class="mb-btn-primary" id="mb-builder-speak" style="display:inline-flex; align-items:center; gap:0.35rem;">${samtaleIcons.audio(14)} ${mbT('btn_listen', lang)}</button>
            </div>
            <div id="mb-b-rows"></div>
            <div style="margin-top:0.9rem; padding:0.95rem 1.15rem; border-radius:14px; background:rgba(7,13,25,0.92); border:1.5px solid rgba(45,212,191,0.45); font-size:1.1rem; font-weight:800;">
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
            rDiv.style.cssText = `margin-bottom:0.75rem; padding-left:0.7rem; border-left:3px solid ${row.color};`;
            rDiv.innerHTML = `
                <div style="font-size:0.84rem; font-weight:900; color:${row.color};">${row.da}</div>
                ${!isDa ? `<div class="mb-tr-slot" style="margin-bottom:0.3rem;"${rtlAttr}>${mbT(row.key, lang)}</div>` : '<div style="height:0.25rem;"></div>'}
            `;
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

    renderPuzzle();
    renderStepBuilder();
    panel2.appendChild(pusleModeBar);
    panel2.appendChild(puzzleCard);
    panel2.appendChild(builderCard);
    syncPusleMode();
    panelsHolder.appendChild(panel2);

    // =========================================================================
    // FANE 3: MIN, MIT, MINE & VORES
    // =========================================================================
    const panel3 = makePanel('tab_possessiv');

    const posRuleBar = document.createElement('div');
    posRuleBar.className = 'mb-card';
    posRuleBar.style.padding = '0.8rem 1rem';
    posRuleBar.innerHTML = `
        <div style="display:flex; flex-wrap:wrap; gap:0.65rem; align-items:center; font-size:0.85rem; line-height:1.45;"${rtlAttr}>
            <span style="color:#4ade80; font-weight:800;">${mbT('pos_rule_1', lang)}</span>
            <span>·</span>
            <span style="color:#7dd3fc; font-weight:800;">${mbT('pos_rule_2', lang)}</span>
            <span>·</span>
            <span style="color:#fde68a; font-weight:800;">${mbT('pos_rule_3', lang)}</span>
            <span>·</span>
            <span style="color:#e9d5ff; font-weight:800;">${mbT('pos_rule_4', lang)}</span>
            <span>·</span>
            <span style="color:#fca5a5; font-weight:800;">${mbT('pos_rule_5', lang)}</span>
        </div>
    `;
    panel3.appendChild(posRuleBar);

    let posMode = 'duel';
    const posModeBar = document.createElement('div');
    posModeBar.className = 'mb-filters';
    posModeBar.style.marginBottom = '0.9rem';

    const posDuelCard = document.createElement('div');
    posDuelCard.className = 'mb-card';
    const posTransCard = document.createElement('div');
    posTransCard.className = 'mb-card';
    const clozeCard = document.createElement('div');
    clozeCard.className = 'mb-card';

    function syncPosMode() {
        posModeBar.innerHTML = `
            <button type="button" class="mb-filter-btn ${posMode === 'duel' ? 'active' : ''}" data-posm="duel">${mbT('pos_tab_1', lang)}</button>
            <button type="button" class="mb-filter-btn ${posMode === 'trans' ? 'active' : ''}" data-posm="trans">${mbT('pos_tab_2', lang)}</button>
            <button type="button" class="mb-filter-btn ${posMode === 'cloze' ? 'active' : ''}" data-posm="cloze">${mbT('pos_tab_3', lang)}</button>
        `;
        posModeBar.querySelectorAll('[data-posm]').forEach(b => {
            b.onclick = () => {
                posMode = b.dataset.posm;
                syncPosMode();
            };
        });
        posDuelCard.style.display = posMode === 'duel' ? 'block' : 'none';
        posTransCard.style.display = posMode === 'trans' ? 'block' : 'none';
        clozeCard.style.display = posMode === 'cloze' ? 'block' : 'none';
    }

    // 3A: 16 Hurtig-dueller
    let pDuelIdx = 0;
    let pDuelAns = null;
    const pDuelSolved = new Set();

    function renderPosDuel() {
        const d = POSSESSIVE_DUELS[pDuelIdx];
        posDuelCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <span style="font-size:0.85rem; color:#94a3b8; font-weight:800;">
                    ${mbT('lbl_word', lang)} ${pDuelIdx + 1}/${POSSESSIVE_DUELS.length} • ${mbT('lbl_score', lang)}: ${pDuelSolved.size}/${POSSESSIVE_DUELS.length}
                </span>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="mb-btn-secondary" id="mb-pd-prev" ${pDuelIdx === 0 ? 'disabled' : ''}>${mbT('btn_prev', lang)}</button>
                    <button type="button" class="mb-btn-secondary" id="mb-pd-next" ${pDuelIdx === POSSESSIVE_DUELS.length - 1 ? 'disabled' : ''}>${mbT('btn_next', lang)}</button>
                </div>
            </div>

            <div style="padding:0.95rem 1.1rem; border-radius:14px; background:rgba(9,14,26,0.95); border-left:4px solid #2dd4bf; margin-bottom:0.85rem;">
                <div style="font-size:1.1rem; font-weight:900; color:#ffffff;">
                    »${d.sentence.replace('___', pDuelAns ? `<span style="color:#5eead4; text-decoration:underline;">${pDuelAns}</span>` : '[ ___ ]')}«
                </div>
                ${mbSub(`pd${d.num}_s`, 'mb-tr-sent', lang)}
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:0.55rem;">
                ${['min', 'mit', 'mine'].map(val => {
                    let cls = 'mb-option-btn';
                    if (pDuelAns !== null) {
                        if (val === d.answer) cls += ' correct';
                        else if (val === pDuelAns) cls += ' wrong';
                    }
                    return `
                        <button type="button" class="${cls}" data-pd-opt="${val}">
                            <strong>${val} ${d.noun}</strong>
                        </button>
                    `;
                }).join('')}
            </div>

            ${pDuelAns !== null ? `
                <div class="mb-feedback ${pDuelAns === d.answer ? 'ok' : 'err'}"${rtlAttr}>
                    <div><strong>${pDuelAns === d.answer ? `✓ ${mbT('pos_ok', lang)}` : `✗ ${mbT('pos_err_prefix', lang)} "${d.answer}"`}</strong> · ${mbT(d.ruleKey, lang)}</div>
                    ${pDuelIdx < POSSESSIVE_DUELS.length - 1 ? `
                        <button type="button" class="mb-btn-primary" id="mb-pd-adv" style="margin-top:0.5rem;">${mbT('btn_next', lang)}</button>
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

    // 3B: 6 Find den rigtige sætning
    let ptIdx = 0;
    let ptAns = null;
    const ptSolved = new Set();

    function renderPosTransform() {
        const q = POSSESSIVE_TRANSFORM_CHALLENGES[ptIdx];
        posTransCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <span style="font-size:0.85rem; color:#94a3b8; font-weight:800;">
                    ${mbT('lbl_task', lang)} ${ptIdx + 1}/${POSSESSIVE_TRANSFORM_CHALLENGES.length} • ${mbT('lbl_solved', lang)}: ${ptSolved.size}/${POSSESSIVE_TRANSFORM_CHALLENGES.length}
                </span>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="mb-btn-secondary" id="mb-pt-prev" ${ptIdx === 0 ? 'disabled' : ''}>${mbT('btn_prev', lang)}</button>
                    <button type="button" class="mb-btn-secondary" id="mb-pt-next" ${ptIdx === POSSESSIVE_TRANSFORM_CHALLENGES.length - 1 ? 'disabled' : ''}>${mbT('btn_next', lang)}</button>
                </div>
            </div>

            <div style="font-size:1rem; font-weight:900; color:#ffffff; margin-bottom:0.75rem;"${rtlAttr}>${mbT(`pt${q.num}_q`, lang)}</div>

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
                <div class="mb-feedback ${q.options[ptAns]?.correct ? 'ok' : 'err'}"${rtlAttr}>
                    <strong>${q.options[ptAns]?.correct ? `✓ ${mbT('pos_ok', lang)}` : `✗ ${mbT('pos_remember', lang)}`}</strong> ${mbT(`pt${q.num}_e`, lang)}
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

    // 3C: Hel tekst med 10 huller
    const clozePicks = {};
    let clozeChecked = false;

    function renderPossessiveCloze() {
        const totalCorrect = POSSESSIVE_CLOZE_STORY.filter(item => clozePicks[item.id] === item.answer).length;
        clozeCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <h3 style="margin:0; font-size:1.05rem; font-weight:900;"${rtlAttr}>${mbT('pc_title', lang)}</h3>
                <button type="button" class="mb-btn-secondary" id="mb-cloze-reset">${mbT('btn_reset', lang)}</button>
            </div>
            <div style="display:grid; gap:0.48rem; margin-bottom:0.85rem;">
                ${POSSESSIVE_CLOZE_STORY.map((item, idx) => {
                    const picked = clozePicks[item.id];
                    const isOk = clozeChecked && picked === item.answer;
                    const isErr = clozeChecked && picked && picked !== item.answer;
                    return `
                        <div style="padding:0.62rem 0.9rem; border-radius:11px; background:rgba(9,14,26,0.9); border:1.5px solid ${isOk ? '#4ade80' : isErr ? '#f87171' : 'rgba(148,163,184,0.25)'}; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.45rem;">
                            <div>
                                <div style="font-size:0.92rem; color:#f8fafc;">
                                    <span style="color:#94a3b8; font-weight:800; margin-right:0.3rem;">${idx + 1}.</span>
                                    ${item.before}<strong style="padding:0.1rem 0.45rem; border-radius:6px; background:rgba(20,184,166,0.2); border:1px solid #2dd4bf; color:#5eead4;">${picked || '___'}</strong>${item.after}
                                </div>
                                ${mbSub(item.trKey, 'mb-tr', lang)}
                            </div>
                            <div style="display:flex; gap:0.35rem;">
                                ${item.options.map(opt => `
                                    <button type="button" class="mb-btn-secondary" data-cloze-id="${item.id}" data-cloze-val="${opt}" style="padding:0.25rem 0.6rem; font-size:0.8rem; ${picked === opt ? 'background:#0d9488; color:#ffffff; border-color:#5eead4;' : ''}">
                                        ${opt}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <button type="button" class="mb-btn-primary" id="mb-cloze-check">✓ ${mbT('btn_check', lang)}</button>
            ${clozeChecked ? `
                <div class="mb-feedback ${totalCorrect === POSSESSIVE_CLOZE_STORY.length ? 'ok' : 'err'}"${rtlAttr}>
                    <strong>${totalCorrect}/${POSSESSIVE_CLOZE_STORY.length} ${mbT('lbl_correct_word', lang)}.</strong>
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

    renderPosDuel();
    renderPosTransform();
    renderPossessiveCloze();
    panel3.appendChild(posModeBar);
    panel3.appendChild(posDuelCard);
    panel3.appendChild(posTransCard);
    panel3.appendChild(clozeCard);
    syncPosMode();
    panelsHolder.appendChild(panel3);

    // =========================================================================
    // FANE 4: MINDMAP (DEL 1)
    // =========================================================================
    const panel4 = makePanel('tab_mindmap');
    let mmMode = 'builder';
    const mmModeBar = document.createElement('div');
    mmModeBar.className = 'mb-filters';
    mmModeBar.style.marginBottom = '0.9rem';

    const myMindmapCard = document.createElement('div');
    myMindmapCard.className = 'mb-card';
    const stikordCard = document.createElement('div');
    stikordCard.className = 'mb-card';

    function syncMmMode() {
        mmModeBar.innerHTML = `
            <button type="button" class="mb-filter-btn ${mmMode === 'builder' ? 'active' : ''}" data-mmode="builder">${mbT('mm_tab_builder', lang)}</button>
            <button type="button" class="mb-filter-btn ${mmMode === 'quiz' ? 'active' : ''}" data-mmode="quiz">${mbT('mm_tab_quiz', lang)}</button>
        `;
        mmModeBar.querySelectorAll('[data-mmode]').forEach(b => {
            b.onclick = () => {
                mmMode = b.dataset.mmode;
                syncMmMode();
            };
        });
        myMindmapCard.style.display = mmMode === 'builder' ? 'block' : 'none';
        stikordCard.style.display = mmMode === 'quiz' ? 'block' : 'none';
    }

    const userKeywords = {
        sted_by: 'Odense · stille vej · 2 år',
        hus_lejlighed: 'lejlighed · 2. sal · altan',
        vaerelser_m2: '75 m² · 3 værelser · køkken',
        alene_sammen: 'mand · 2 børn · kat',
        naboer: 'søde · rolige · hilser i opgangen',
        omraade: 'grønt · tæt på indkøb og bus'
    };

    const presetOptions = {
        sted_by: ['Odense · stille vej · 2 år', 'Aarhus · tæt på centrum · 1 år', 'København · rolig bydel'],
        hus_lejlighed: ['lejlighed · 2. sal · altan', 'rækkehus · lille have', 'lejlighed · i stueetagen'],
        vaerelser_m2: ['75 m² · 3 værelser · køkken', '60 m² · 2 værelser · lys stue', '90 m² · 4 værelser'],
        alene_sammen: ['mand · 2 børn · kat', 'bor alene', 'kæreste · hund'],
        naboer: ['søde · rolige · hilser i opgangen', 'hjælpsomme · kaffe i gården', 'stille naboer'],
        omraade: ['grønt · tæt på indkøb og bus', 'stille · legeplads · skole', 'tæt på centrum · cykelsti']
    };

    function renderMyMindmapBuilder() {
        myMindmapCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
                <h3 style="margin:0; font-size:1.08rem; font-weight:900;"${rtlAttr}>${mbT('mm_title', lang)}</h3>
                <button type="button" class="mb-btn-primary" id="mb-speak-full-presentation" style="display:inline-flex; align-items:center; gap:0.35rem;">
                    ${samtaleIcons.audio(14)} ${mbT('btn_listen_ex', lang)}
                </button>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.75rem; margin-bottom:0.95rem;">
                ${Object.values(MINDMAP_BOXES).map(b => `
                    <div style="padding:0.8rem 0.9rem; border-radius:14px; background:rgba(9,14,26,0.92); border:1.5px solid ${b.border};">
                        <div style="font-weight:900; font-size:0.92rem; color:${b.color}; margin-bottom:0.4rem;"${rtlAttr}>
                            ${mbT('box_' + b.id, lang)}
                        </div>
                        <input
                            type="text"
                            data-mm-input="${b.id}"
                            value="${userKeywords[b.id].replace(/"/g, '&quot;')}"
                            placeholder="${mbT('mm_placeholder', lang)}"
                            style="width:100%; box-sizing:border-box; padding:0.48rem 0.7rem; border-radius:9px; border:1px solid rgba(148,163,184,0.35); background:rgba(30,41,59,0.9); color:#ffffff; font-weight:800; font-size:0.85rem; margin-bottom:0.4rem;"
                        />
                        <div style="display:flex; flex-wrap:wrap; gap:0.28rem;">
                            ${presetOptions[b.id].map(p => `
                                <button type="button" class="mb-btn-secondary" data-mm-preset="${b.id}" data-mm-val="${p}" style="padding:0.2rem 0.48rem; font-size:0.72rem;">
                                    ${p}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="padding:0.95rem 1.1rem; border-radius:14px; background:linear-gradient(135deg, rgba(13,148,136,0.16), rgba(15,23,42,0.95)); border:1.5px solid #2dd4bf;">
                <div style="font-size:0.8rem; font-weight:900; color:#5eead4; text-transform:uppercase; margin-bottom:0.45rem;"${rtlAttr}>
                    ${mbT('mm_guide_title', lang)}
                </div>
                <div style="display:grid; gap:0.45rem; font-size:0.94rem; color:#f8fafc; line-height:1.5;">
                    <div>1. Jeg bor i <strong>${userKeywords.sted_by}</strong>.${mbSub('mm_line_1', 'mb-tr', lang)}</div>
                    <div>2. Jeg bor i <strong>${userKeywords.hus_lejlighed}</strong>.${mbSub('mm_line_2', 'mb-tr', lang)}</div>
                    <div>3. Min bolig har <strong>${userKeywords.vaerelser_m2}</strong>.${mbSub('mm_line_3', 'mb-tr', lang)}</div>
                    <div>4. Jeg bor med / alene: <strong>${userKeywords.alene_sammen}</strong>.${mbSub('mm_line_4', 'mb-tr', lang)}</div>
                    <div>5. Mine naboer er <strong>${userKeywords.naboer}</strong>.${mbSub('mm_line_5', 'mb-tr', lang)}</div>
                    <div>6. Mit område er <strong>${userKeywords.omraade}</strong>.${mbSub('mm_line_6', 'mb-tr', lang)}</div>
                </div>
            </div>
        `;

        myMindmapCard.querySelectorAll('[data-mm-input]').forEach(inp => {
            inp.oninput = () => { userKeywords[inp.dataset.mmInput] = inp.value; };
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
                'Jeg vil fortælle om min bolig. ' +
                'Jeg bor i Odense på en stille vej. Jeg har boet her i to år. ' +
                'Jeg bor til leje i en lejlighed på anden sal. Jeg har en lille altan. ' +
                'Min lejlighed er 75 kvadratmeter. Den har tre værelser, et køkken og et badeværelse. ' +
                'Jeg bor sammen med min mand og mine to børn. Vi har også en kat. ' +
                'Mine naboer er søde og rolige. Vi hilser i opgangen. ' +
                'Mit område er grønt og stille. Jeg bor tæt på indkøb og bus.'
            );
        };
    }

    let stIdx = 0;
    let stAns = null;

    function renderStikordQuiz() {
        const q = STIKORD_VS_SAETNING_QUIZ[stIdx];
        stikordCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.7rem;">
                <span style="font-size:0.85rem; color:#94a3b8; font-weight:800;">${mbT('lbl_box', lang)} ${stIdx + 1}/6 · ${mbT('box_' + q.boxId, lang)}</span>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="mb-btn-secondary" id="mb-st-prev" ${stIdx === 0 ? 'disabled' : ''}>${mbT('btn_prev', lang)}</button>
                    <button type="button" class="mb-btn-secondary" id="mb-st-next" ${stIdx === STIKORD_VS_SAETNING_QUIZ.length - 1 ? 'disabled' : ''}>${mbT('btn_next', lang)}</button>
                </div>
            </div>

            <p style="margin:0 0 0.8rem; color:#ffffff; font-weight:800; font-size:0.96rem;"${rtlAttr}>${mbT(`st${q.num}_q`, lang)}</p>

            <div style="display:grid; gap:0.5rem;">
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
                    <div>${q.oralExpansionDa}</div>
                    ${mbSub(`st${q.num}_exp`, 'mb-tr-sent', lang)}
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
                renderStikordQuiz();
            };
        });
    }

    renderMyMindmapBuilder();
    renderStikordQuiz();
    panel4.appendChild(mmModeBar);
    panel4.appendChild(myMindmapCard);
    panel4.appendChild(stikordCard);
    syncMmMode();
    panelsHolder.appendChild(panel4);

    // =========================================================================
    // FANE 5: DEL 2 — SPØRGSMÅL & AI-TESTER
    // =========================================================================
    const panel5 = makePanel('tab_del2_dialog');
    let del2Mode = 'quiz';
    const del2ModeBar = document.createElement('div');
    del2ModeBar.className = 'mb-filters';
    del2ModeBar.style.marginBottom = '0.9rem';

    const del2Card = document.createElement('div');
    del2Card.className = 'mb-card';
    const aiCard = document.createElement('div');
    aiCard.className = 'mb-card';

    function syncDel2Mode() {
        del2ModeBar.innerHTML = `
            <button type="button" class="mb-filter-btn ${del2Mode === 'quiz' ? 'active' : ''}" data-d2m="quiz">${mbT('d2_tab_quiz', lang)}</button>
            <button type="button" class="mb-filter-btn ${del2Mode === 'ai' ? 'active' : ''}" data-d2m="ai">${mbT('d2_tab_ai', lang)}</button>
        `;
        del2ModeBar.querySelectorAll('[data-d2m]').forEach(b => {
            b.onclick = () => {
                del2Mode = b.dataset.d2m;
                syncDel2Mode();
            };
        });
        del2Card.style.display = del2Mode === 'quiz' ? 'block' : 'none';
        aiCard.style.display = del2Mode === 'ai' ? 'block' : 'none';
    }

    let exQIdx = 0;
    let exQAns = null;
    const exQSolved = new Set();

    function renderDel2Questions() {
        const q = EXAMINER_FOLLOWUP_QUESTIONS[exQIdx];
        del2Card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <span style="font-size:0.85rem; color:#94a3b8; font-weight:800;">
                    ${mbT('lbl_question', lang)} ${exQIdx + 1}/${EXAMINER_FOLLOWUP_QUESTIONS.length} • ${mbT('lbl_solved', lang)}: ${exQSolved.size}/${EXAMINER_FOLLOWUP_QUESTIONS.length}
                </span>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="mb-btn-secondary" id="mb-d2-prev" ${exQIdx === 0 ? 'disabled' : ''}>${mbT('btn_prev', lang)}</button>
                    <button type="button" class="mb-btn-secondary" id="mb-d2-next" ${exQIdx === EXAMINER_FOLLOWUP_QUESTIONS.length - 1 ? 'disabled' : ''}>${mbT('btn_next', lang)}</button>
                </div>
            </div>

            <div style="padding:0.95rem 1.1rem; border-radius:14px; background:rgba(9,14,26,0.95); border-left:4px solid #ec4899; margin-bottom:0.85rem;">
                <div style="font-size:1rem; font-weight:900; color:#ffffff;">${q.examinerQ}</div>
                ${mbSub(`d2_${q.num}_q`, 'mb-tr-sent', lang)}
            </div>

            <div style="display:grid; gap:0.5rem;">
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
                <div class="mb-feedback ${q.options[exQAns]?.correct ? 'ok' : 'err'}"${rtlAttr}>
                    <div><strong>${q.options[exQAns]?.correct ? `✓ ${mbT('d2_ok', lang)}` : `✗ ${mbT('d2_tip_prefix', lang)}`}</strong> ${mbT(`d2_${q.num}_tip`, lang)}</div>
                    ${mbSub(`d2_${q.num}_a`, 'mb-tr-sent', lang)}
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

    aiCard.innerHTML = `
        <h3 style="margin:0 0 0.35rem; font-size:1.08rem; font-weight:900;"${rtlAttr}>${mbT('ai_title', lang)}</h3>
        <p style="margin:0 0 0.8rem; color:#cbd5e1; font-size:0.88rem;"${rtlAttr}>${mbT('ai_desc', lang)}</p>
        <div id="mb-ai-prompt-holder"></div>
    `;
    const promptSection = createPromptFlowSection(DU1_MODUL4_BOLIG_AI_PROMPT);
    aiCard.querySelector('#mb-ai-prompt-holder').appendChild(promptSection);

    renderDel2Questions();
    panel5.appendChild(del2ModeBar);
    panel5.appendChild(del2Card);
    panel5.appendChild(aiCard);
    syncDel2Mode();
    panelsHolder.appendChild(panel5);

    // =========================================================================
    // FANE 6: BOLIG-DETEKTIVEN (12 MISSIONER)
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
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <div>
                    <h3 style="margin:0; font-size:1.08rem; font-weight:900;"${rtlAttr}>${mbT('det_title', lang)}</h3>
                    <div style="font-size:0.83rem; color:#94a3b8;">${mbT('lbl_mission', lang)} ${detIdx + 1}/${BOLIG_DETECTIVE_MISSIONS.length} • ${mbT('lbl_found', lang)}: ${detSolved.size}/${BOLIG_DETECTIVE_MISSIONS.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                    <button type="button" class="mb-btn-secondary" id="mb-det-hint">${detShowHint ? mbT('btn_hide_hint', lang) : mbT('btn_show_hint', lang)}</button>
                    <button type="button" class="mb-btn-secondary" id="mb-det-prev" ${detIdx === 0 ? 'disabled' : ''}>${mbT('btn_prev', lang)}</button>
                    <button type="button" class="mb-btn-secondary" id="mb-det-next" ${detIdx === BOLIG_DETECTIVE_MISSIONS.length - 1 ? 'disabled' : ''}>${mbT('btn_next', lang)}</button>
                </div>
            </div>

            <div style="padding:0.85rem 1.05rem; border-radius:14px; background:rgba(30,41,59,0.85); border-left:4px solid #14b8a6; margin-bottom:0.8rem;">
                <div style="font-size:0.98rem; font-weight:900; color:#ffffff;">${m.prompt}</div>
                ${mbSub(`det${m.num}_p`, 'mb-tr-sent', lang)}
                ${detShowHint ? `
                    <div style="margin-top:0.35rem; font-size:0.84rem; color:#fde68a;">
                        ${mbT('lbl_hint', lang)} ${m.hint}
                        ${mbSub(`det${m.num}_h`, 'mb-tr', lang)}
                    </div>
                ` : ''}
            </div>

            ${detFeedback ? `
                <div class="mb-feedback ${detFeedback.ok ? 'ok' : 'err'}" style="margin-bottom:0.8rem;">
                    <div>${detFeedback.text}</div>
                    ${detFeedback.subHtml || ''}
                    ${detFeedback.ok && detIdx < BOLIG_DETECTIVE_MISSIONS.length - 1 ? `
                        <button type="button" class="mb-btn-primary" id="mb-det-advance" style="margin-top:0.5rem;">${mbT('btn_next', lang)}</button>
                    ` : ''}
                </div>
            ` : ''}

            <div class="mb-stage-wrap">
                <div class="mb-stage-inner">
                    <img src="assets/min_bolig_vrimmel.jpg" onerror="this.src='assets/koekken_vrimmel.jpg'" alt="Min bolig detektiv" class="mb-stage-img" />
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
            btn.style.background = 'linear-gradient(135deg, rgba(15,23,42,0.94), rgba(30,41,59,0.95))';
            btn.style.border = `2px solid ${boxMeta.color}`;
            btn.innerHTML = isCorrectPick
                ? `<span class="mb-pegefelt-num" style="background:${boxMeta.color}; color:#0f172a;">${w.num}</span><span class="mb-pegefelt-label">${w.shortLabel}</span>`
                : `<span class="mb-pegefelt-num" style="background:${boxMeta.color}; color:#0f172a;">${w.num}</span>`;
            btn.onclick = () => {
                if (w.id === m.answerId) {
                    detSolved.add(detIdx);
                    detFeedback = {
                        ok: true,
                        text: `✓ ${mbT('det_found_prefix', lang)} #${w.num} ${w.word} — »${w.sentence}«`,
                        subHtml: mbSub(`w${w.num}_sent`, 'mb-tr-sent', lang)
                    };
                    speakBolig(`${w.word}. ${w.sentence}`);
                } else {
                    detFeedback = {
                        ok: false,
                        text: `✗ ${mbT('det_wrong_prefix', lang)} #${w.num} (${w.shortLabel}). ${mbT('det_try_again', lang)}`
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
