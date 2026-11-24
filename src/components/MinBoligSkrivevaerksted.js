import { SKRIVEHJAELP_SYSTEM_PROMPT } from '../views/SkrivehjaelpView.js';
import { getLang } from '../utils/i18n.js';
import { mbT } from '../utils/min_bolig_translations.js';
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
const SVG_STOP = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`;

// ============================================================================
// DE 6 MINDMAP-BOKSE SOM STILLADSEREDE SKRIVE-SCENARIER (DU1 MODUL 4)
// ============================================================================
const BOLIG_SCENARIOS = {
    sted_by: {
        id: 'sted_by',
        num: 1,
        shortTitle: '1. Sted / by',
        labelKey: 'box_q_sted_by',
        color: '#38bdf8',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Jeg', 'Vi', 'Min familie'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['I dag', 'For to år siden', 'Nu'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['Her', 'I Odense', 'På min vej'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Derfor', 'Heldigvis'] },
            at_clause: { labelKey: 'cat_at_mening', mode: 'at_clause', options: ['Jeg er glad for, at', 'Jeg synes, at', 'Det er dejligt, at'] }
        },
        verbs: ['bor', 'har boet', 'flyttede ind', 'trives'],
        atSubjects: ['vi', 'jeg', 'min vej', 'bydelen'],
        atVerbs: ['bor', 'er', 'ligger', 'har boet'],
        invertedSubjects: ['jeg', 'vi', 'min familie'],
        objects: [
            'i Odense på en stille vej',
            'i en rolig bydel',
            'her i to år',
            'i en forstad tæt på byen',
            'for to år siden'
        ],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi her er roligt', text: ', fordi her er roligt' },
            { label: ', men der er lidt trafik', text: ', men der er lidt trafik' },
            { label: ', og jeg trives godt her', text: ', og jeg trives godt her' }
        ],
        extensionsRel: [
            { label: ', som ligger tæt på centrum', text: ', som ligger tæt på centrum' },
            { label: ', der er stille og tryg', text: ', der er stille og tryg' },
            { label: ', som vi hurtigt blev glade for', text: ', som vi hurtigt blev glade for' }
        ]
    },
    hus_lejlighed: {
        id: 'hus_lejlighed',
        num: 2,
        shortTitle: '2. Hus / lejlighed',
        labelKey: 'box_q_hus_lejlighed',
        color: '#f59e0b',
        starts: {
            person: { labelKey: 'cat_bolig_person', mode: 'normal', options: ['Jeg', 'Min lejlighed', 'Mit rækkehus', 'Min husleje'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['Om sommeren', 'Hver måned', 'Nu'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['På 2. sal', 'I stueetagen', 'På altanen'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Desuden', 'Derfor', 'Heldigvis'] },
            at_clause: { labelKey: 'cat_at_mening', mode: 'at_clause', options: ['Jeg er glad for, at', 'Jeg synes, at', 'Jeg håber, at'] }
        },
        verbs: ['bor', 'ligger', 'har', 'er', 'betaler'],
        atSubjects: ['min lejlighed', 'mit hus', 'vi', 'jeg'],
        atVerbs: ['har', 'ligger', 'er', 'kan sidde'],
        invertedSubjects: ['jeg', 'vi', 'min lejlighed'],
        objects: [
            'til leje i en lejlighed på 2. sal',
            'i et rækkehus med en lille have',
            'på 2. sal med en solrig altan',
            '6.500 kroner om måneden',
            'en altan, hvor vi drikker kaffe'
        ],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi huslejen er rimelig', text: ', fordi huslejen er rimelig' },
            { label: ', men der er ingen elevator', text: ', men der er ingen elevator' },
            { label: ', og vi sidder ofte på altanen', text: ', og vi sidder ofte på altanen' }
        ],
        extensionsRel: [
            { label: ', som vender mod solen', text: ', som vender mod solen' },
            { label: ', der er nem at holde', text: ', der er nem at holde' },
            { label: ', som passer godt til os', text: ', som passer godt til os' }
        ]
    },
    vaerelser_m2: {
        id: 'vaerelser_m2',
        num: 3,
        shortTitle: '3. Værelser / m²',
        labelKey: 'box_q_vaerelser_m2',
        color: '#10b981',
        starts: {
            person: { labelKey: 'cat_rum_bolig', mode: 'normal', options: ['Min bolig', 'Min stue', 'Mit køkken', 'Mit soveværelse', 'Vi'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['Om aftenen', 'Hver uge', 'I hverdagen'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['I stuen', 'I køkkenet', 'I kælderen', 'I min entré'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Desuden', 'Derudover', 'Derfor'] },
            at_clause: { labelKey: 'cat_at_mening', mode: 'at_clause', options: ['Jeg kan godt lide, at', 'Det er dejligt, at', 'Jeg synes, at'] }
        },
        verbs: ['er', 'har', 'vasker', 'laver'],
        atSubjects: ['stuen', 'køkkenet', 'boligen', 'mit soveværelse'],
        atVerbs: ['er', 'har', 'giver'],
        invertedSubjects: ['vi', 'jeg', 'der'],
        objects: [
            '75 kvadratmeter og rummelig',
            'tre værelser, et køkken og et badeværelse',
            'stor og lys',
            'en opvaskemaskine',
            'tøj i vaskerummet i kælderen'
        ],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi der kommer meget dagslys ind', text: ', fordi der kommer meget dagslys ind' },
            { label: ', men min entré er lidt lille', text: ', men min entré er lidt lille' },
            { label: ', og der er god plads til os', text: ', og der er god plads til os' }
        ],
        extensionsRel: [
            { label: ', som er lys og hyggelig', text: ', som er lys og hyggelig' },
            { label: ', der har bruser og god plads', text: ', der har bruser og god plads' },
            { label: ', som gør hverdagen nem', text: ', som gør hverdagen nem' }
        ]
    },
    alene_sammen: {
        id: 'alene_sammen',
        num: 4,
        shortTitle: '4. Alene / sammen med',
        labelKey: 'box_q_alene_sammen',
        color: '#ec4899',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Jeg', 'Vi', 'Min familie', 'Min mand og jeg'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['Om aftenen', 'I weekenden', 'Hver dag'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['Herhjemme', 'I stuen', 'I min lejlighed'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Desuden', 'Heldigvis', 'Derfor'] },
            at_clause: { labelKey: 'cat_at_foelelse', mode: 'at_clause', options: ['Jeg er glad for, at', 'Jeg synes, at', 'Det er hyggeligt, at'] }
        },
        verbs: ['bor', 'har', 'spiser', 'hygger os'],
        atSubjects: ['vi', 'jeg', 'børnene', 'vores kat'],
        atVerbs: ['bor', 'har', 'kan være', 'er'],
        invertedSubjects: ['vi', 'jeg'],
        objects: [
            'sammen med min mand og mine to børn',
            'alene i min lejlighed',
            'sammen med min familie',
            'også en lille kat',
            'aftensmad sammen i stuen'
        ],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi vi godt kan lide at være sammen', text: ', fordi vi godt kan lide at være sammen' },
            { label: ', selvom der nogle gange er larm', text: ', selvom der nogle gange er larm' },
            { label: ', og det er meget hyggeligt', text: ', og det er meget hyggeligt' }
        ],
        extensionsRel: [
            { label: ', som giver liv i hjemmet', text: ', som giver liv i hjemmet' },
            { label: ', der elsker at ligge i sofaen', text: ', der elsker at ligge i sofaen' },
            { label: ', som jeg trives rigtig godt med', text: ', som jeg trives rigtig godt med' }
        ]
    },
    naboer: {
        id: 'naboer',
        num: 5,
        shortTitle: '5. Naboer',
        labelKey: 'box_q_naboer',
        color: '#a855f7',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Mine naboer', 'Jeg', 'Vi', 'Min nabo'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['Om sommeren', 'Hver dag', 'I weekenden'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['I opgangen', 'I gården', 'I stueetagen'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Derfor', 'Heldigvis', 'Desuden'] },
            at_clause: { labelKey: 'cat_at_mening', mode: 'at_clause', options: ['Jeg er glad for, at', 'Jeg synes, at', 'Det er rart, at'] }
        },
        verbs: ['er', 'hilser på', 'drikker', 'hjælper', 'bor'],
        atSubjects: ['mine naboer', 'vi', 'opgangen'],
        atVerbs: ['er', 'hilser på', 'hjælper'],
        invertedSubjects: ['vi', 'jeg', 'mine naboer'],
        objects: [
            'søde, rolige og hjælpsomme',
            'mine naboer i opgangen',
            'kaffe sammen i baggården',
            'hinanden i hverdagen',
            'alene i stueetagen'
        ],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi alle tager hensyn', text: ', fordi alle tager hensyn' },
            { label: ', men vi snakker ikke så tit', text: ', men vi snakker ikke så tit' },
            { label: ', og vi siger altid hej', text: ', og vi siger altid hej' }
        ],
        extensionsRel: [
            { label: ', som altid smiler i opgangen', text: ', som altid smiler i opgangen' },
            { label: ', der er stille om aftenen', text: ', der er stille om aftenen' },
            { label: ', som vi kan låne sukker af', text: ', som vi kan låne sukker af' }
        ]
    },
    omraade: {
        id: 'omraade',
        num: 6,
        shortTitle: '6. Område',
        labelKey: 'box_q_omraade',
        color: '#22c55e',
        starts: {
            person: { labelKey: 'cat_omraade_person', mode: 'normal', options: ['Mit område', 'Jeg', 'Børnene', 'Der'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['Hver dag', 'Om sommeren', 'Til sidst'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['Tæt på min bolig', 'I nærheden', 'På legepladsen'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Derfor', 'Alt i alt', 'Samtidig'] },
            at_clause: { labelKey: 'cat_at_afrunding', mode: 'at_clause', options: ['Jeg er glad for, at', 'Jeg synes, at', 'Alt i alt føler jeg, at'] }
        },
        verbs: ['er', 'ligger', 'bor', 'leger', 'er glad for'],
        atSubjects: ['mit område', 'der', 'jeg', 'vi'],
        atVerbs: ['er', 'ligger', 'har', 'bor'],
        invertedSubjects: ['jeg', 'vi', 'der'],
        objects: [
            'grønt og stille',
            'tæt på indkøb og et busstoppested',
            'en legeplads og gode cykelstier',
            'på legepladsen',
            'at bo i mit område'
        ],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi det er nemt til arbejde og sprogskole', text: ', fordi det er nemt til arbejde og sprogskole' },
            { label: ', men der er lidt langt til centrum', text: ', men der er lidt langt til centrum' },
            { label: ', og der er trygt for børn', text: ', og der er trygt for børn' }
        ],
        extensionsRel: [
            { label: ', som ligger fem minutter væk', text: ', som ligger fem minutter væk' },
            { label: ', der gør hverdagen meget nem', text: ', der gør hverdagen meget nem' },
            { label: ', som jeg er rigtig glad for', text: ', som jeg er rigtig glad for' }
        ]
    }
};

// ============================================================================
// GENNEMLÆSNINGS-SPØRGSMÅL (Tilpasset Min bolig — 5 lokale tjekspørgsmål)
// ============================================================================
const BOLIG_REVIEW_QUESTIONS = [
    { id: 'possessive', titleKey: 'rev_q1_title', questionKey: 'rev_q1_text' },
    { id: 'v2', titleKey: 'rev_q2_title', questionKey: 'rev_q2_text' },
    { id: 'connectors', titleKey: 'rev_q3_title', questionKey: 'rev_q3_text' },
    { id: 'mindmap', titleKey: 'rev_q4_title', questionKey: 'rev_q4_text' },
    { id: 'whole', titleKey: 'rev_q5_title', questionKey: 'rev_q5_text' }
];

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatSentenceForBoligReview(sentence, focusId) {
    const safe = escapeHtml(sentence);
    if (!focusId) return safe;

    if (focusId === 'possessive') {
        return safe.replace(/\b(min|mit|mine|vores)\s+([a-zæøå]+)/gi, '<mark class="sh-rev-mark">$1 $2</mark>');
    }
    if (focusId === 'v2') {
        const startsWithSubject = /^(jeg|vi|min|mit|mine|børnene|der)\b/i.test(sentence.trim());
        return !startsWithSubject ? `<mark class="sh-rev-mark">${safe}</mark>` : safe;
    }
    if (focusId === 'connectors') {
        return safe.replace(/\b(fordi|men|selvom|derfor|desuden|derudover|heldigvis|samtidig|og|så|som|der|at)\b/gi, '<mark class="sh-rev-mark">$1</mark>');
    }
    if (focusId === 'whole' || focusId === 'mindmap') {
        return `<mark class="sh-rev-mark-soft">${safe}</mark>`;
    }
    return safe;
}

// ============================================================================
// ÆRLIGE, ROSFRI SPØRGSMÅLS-HINTS MED INTERNE LINKS (0 netværkskald)
// ============================================================================
function analyzeBoligHints(items, lang) {
    const observations = [];
    const prompts = [];
    const sentences = items.map(it => it.text);
    const count = sentences.length;

    if (count === 0) {
        return [{
            title: swT('hint_start_title', lang),
            text: swT('hint_start_text', lang),
            link: { label: swT('hint_start_link', lang), localTab: 'tab_mindmap' }
        }];
    }

    const fullText = sentences.join(' ');
    const lowerText = fullText.toLowerCase();

    // 1. Kendte min/mit-forvekslinger på boligord (objektivt tjek!)
    const possSuspect = sentences.find(s =>
        /\bmit\s+(lejlighed|stue|altan|husleje|opgang|entré|vej|bydel|familie|kat|hund)\b/i.test(s) ||
        /\bmin\s+(hus|rækkehus|køkken|soveværelse|badeværelse|område|kælderrum|vaskerum|kæledyr)\b/i.test(s) ||
        /\b(min|mit)\s+(naboer|værelser|børn)\b/i.test(s)
    );
    if (possSuspect) {
        observations.push({
            title: swT('hint_poss_title', lang),
            text: swT('hint_poss_text', lang),
            link: { label: swT('hint_poss_link', lang), localTab: 'tab_possessiv' }
        });
    }

    // 2. V2-tjek i fritekst
    const v2Suspect = sentences.find(s =>
        /^(i dag|her|for to år siden|på 2\. sal|i stueetagen|om sommeren|i stuen|i køkkenet|i kælderen|i opgangen|i gården|tæt på min bolig|derfor|desuden|alt i alt)\s+(jeg|vi|min|mit|mine)\b/i.test(s.trim())
    );
    if (v2Suspect) {
        observations.push({
            title: swT('hint_v2_title', lang),
            text: swT('hint_v2_text', lang),
            link: { label: swT('hint_v2_link', lang), route: 'ordstilling' }
        });
    }

    // 3. Gentaget bindeord i træk
    const connectors = ['fordi', 'men', 'selvom', 'derfor', 'desuden'];
    for (let i = 1; i < sentences.length; i++) {
        const prevTokens = sentences[i - 1].toLowerCase().match(/[a-zæøå]+/g) || [];
        const currTokens = sentences[i].toLowerCase().match(/[a-zæøå]+/g) || [];
        const shared = connectors.find(c => prevTokens.includes(c) && currTokens.includes(c));
        if (shared) {
            const alts = ['men', 'selvom', 'og', 'som / der'].filter(a => a !== shared).slice(0, 3).join('«, »');
            observations.push({
                title: swT('hint_repconn_title', lang, { conn: shared }),
                text: swT('hint_repconn_text', lang, { conn: shared, alts }),
                link: { label: swT('hint_repconn_link', lang), route: 'top_konjunktioner' }
            });
            break;
        }
    }

    // 4. Gentagne starter med "Jeg"
    if (count >= 2 && sentences.slice(-2).every(s => /^jeg\b/i.test(s.trim()))) {
        observations.push({
            title: swT('hint_jeg_title', lang),
            text: swT('hint_jeg_text', lang),
            link: { label: swT('hint_jeg_link', lang), route: 'ordstilling' }
        });
    }

    if (observations.length > 0) {
        return observations.slice(0, 3);
    }

    // 5. Gradvis sproglig variation uden vurderende ros
    const hasConj = /\b(fordi|men|selvom|og|så)\b/i.test(lowerText);
    const hasRel = /\b(som|der)\b/i.test(lowerText);
    const hasAt = /,\s*at\b/i.test(lowerText);

    if (count >= 2 && !hasConj && prompts.length < 2) {
        prompts.push({
            title: swT('hint_conj_title', lang),
            text: swT('hint_conj_text', lang),
            link: { label: swT('hint_conj_link', lang), route: 'top_konjunktioner' }
        });
    } else if (count >= 3 && !hasRel && prompts.length < 2) {
        prompts.push({
            title: swT('hint_rel_title', lang),
            text: swT('hint_rel_text', lang),
            link: { label: swT('hint_rel_link', lang), route: 'ordstilling' }
        });
    } else if (count >= 3 && !hasAt && prompts.length < 2) {
        prompts.push({
            title: swT('hint_at_title', lang),
            text: swT('hint_at_text', lang),
            link: { label: swT('hint_at_link', lang), route: 'top_konjunktioner' }
        });
    }

    // 6. Altid et ærligt selvtjek-spørgsmål når der er plads
    if (prompts.length < 2) {
        prompts.push({
            title: swT('hint_self_title', lang),
            text: swT('hint_self_text', lang),
            link: { label: swT('hint_self_link', lang), localTab: 'tab_possessiv' }
        });
    }

    return prompts.slice(0, 2);
}

// ============================================================================
// STYLES (Genbruger præcis samme kølige nordiske stil som SkrivehjaelpView)
// ============================================================================
function ensureNordicWorkshopStyles() {
    if (document.getElementById('mb-skrivevaerksted-styles')) return;
    const style = document.createElement('style');
    style.id = 'mb-skrivevaerksted-styles';
    style.textContent = `
        .mb-sw-root { color: #f1f5f9; }
        .mb-sw-main-tabs {
            display: inline-flex;
            flex-wrap: wrap;
            max-width: 100%;
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 12px;
            padding: 3px;
            gap: 4px;
            margin-bottom: 1.1rem;
        }
        .mb-sw-main-tab {
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.52rem 1.05rem;
            border-radius: 9px;
            font-size: 0.86rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            transition: all 0.18s ease;
        }
        .mb-sw-main-tab:hover { color: #f1f5f9; }
        .mb-sw-main-tab.active {
            background: #2b6e78;
            color: #ffffff;
        }

        .mb-sw-card {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.12);
            border-radius: 16px;
            padding: 1.2rem 1.3rem;
            margin-bottom: 1.1rem;
        }
        .mb-sw-card-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.65rem;
            margin-bottom: 0.85rem;
        }
        .mb-sw-card-title {
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #94a3b8;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            margin: 0;
        }
        .mb-sw-meta-pill {
            font-size: 0.78rem;
            font-weight: 600;
            color: #94a3b8;
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.12);
            padding: 0.25rem 0.65rem;
            border-radius: 999px;
        }

        .mb-sw-progress-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-bottom: 0.85rem;
        }
        .mb-sw-box-pill {
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.16);
            color: #94a3b8;
            padding: 0.28rem 0.65rem;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            transition: all 0.15s ease;
        }
        .mb-sw-box-pill:hover { border-color: rgba(203, 213, 225, 0.4); color: #f1f5f9; }
        .mb-sw-box-pill.covered {
            background: rgba(43, 110, 120, 0.26);
            border-color: rgba(76, 155, 166, 0.7);
            color: #e2f5f7;
        }
        .mb-sw-box-pill.current {
            box-shadow: 0 0 0 2px rgba(76, 155, 166, 0.5);
            color: #ffffff;
        }
        .mb-sw-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            display: inline-block;
        }

        .mb-sw-keywords-strip {
            background: #101419;
            border: 1px solid rgba(76, 155, 166, 0.35);
            border-radius: 10px;
            padding: 0.55rem 0.85rem;
            margin-bottom: 0.9rem;
            font-size: 0.84rem;
            color: #cbd5e1;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.45rem;
        }
        .mb-sw-keywords-label {
            font-size: 0.74rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #7ec4ce;
        }

        .mb-sw-doc-surface {
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 12px;
            padding: 1.05rem 1.2rem;
            min-height: 82px;
            font-size: 1.06rem;
            line-height: 1.72;
            color: #f1f5f9;
        }
        .mb-sw-doc-empty { color: #64748b; font-style: italic; font-size: 0.94rem; }
        .mb-sw-doc-sentence {
            display: inline;
            padding: 0.08rem 0.2rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.15s ease;
        }
        .mb-sw-doc-sentence:hover { background: rgba(76, 155, 166, 0.22); }

        .sh-rev-mark {
            background: rgba(76, 155, 166, 0.32);
            color: #ffffff;
            padding: 0.06rem 0.28rem;
            border-radius: 4px;
            border-bottom: 1.5px solid #7ec4ce;
        }
        .sh-rev-mark-soft {
            background: rgba(76, 155, 166, 0.14);
            border-radius: 4px;
            padding: 0.04rem 0.16rem;
        }

        .mb-sw-inline-edit {
            margin-top: 0.75rem;
            background: #12171e;
            border: 1px solid rgba(76, 155, 166, 0.5);
            border-radius: 11px;
            padding: 0.7rem 0.85rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
        }
        .mb-sw-hints-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 0.7rem;
            margin-top: 0.85rem;
        }
        .mb-sw-hint-box {
            background: #12171e;
            border: 1px solid rgba(76, 155, 166, 0.42);
            border-left: 3px solid #4c9ba6;
            border-radius: 10px;
            padding: 0.7rem 0.9rem;
            display: flex;
            gap: 0.55rem;
            align-items: flex-start;
        }
        .mb-sw-hint-icon { color: #7ec4ce; margin-top: 2px; flex-shrink: 0; }
        .mb-sw-hint-title { font-size: 0.8rem; font-weight: 800; color: #7ec4ce; margin-bottom: 0.18rem; }
        .mb-sw-hint-text { font-size: 0.82rem; color: #cbd5e1; line-height: 1.45; }
        .mb-sw-hint-link {
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
        }
        .mb-sw-hint-link:hover { color: #bae6ed; text-decoration: underline; }

        .mb-sw-review-panel {
            margin-top: 0.9rem;
            background: #101419;
            border: 1px solid rgba(76, 155, 166, 0.48);
            border-radius: 13px;
            padding: 1rem 1.1rem;
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
        }
        .mb-sw-review-item {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.12);
            border-radius: 10px;
            padding: 0.7rem 0.85rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 0.75rem;
            cursor: pointer;
        }
        .mb-sw-review-item.focused { border-color: #4c9ba6; background: #172029; }
        .mb-sw-review-item.checked { opacity: 0.84; }
        .mb-sw-review-check-btn {
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
        .mb-sw-review-check-btn.done {
            background: rgba(43, 110, 120, 0.35);
            border-color: #4c9ba6;
            color: #e2f5f7;
        }

        .mb-sw-doc-actions {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 0.6rem;
            margin-top: 0.85rem;
        }
        .mb-sw-topic-select {
            background: #101419;
            border: 1px solid rgba(76, 155, 166, 0.45);
            color: #f1f5f9;
            padding: 0.45rem 0.85rem;
            border-radius: 10px;
            font-size: 0.84rem;
            font-weight: 700;
            cursor: pointer;
            max-width: 100%;
        }
        .mb-sw-flow-steps { display: flex; flex-direction: column; gap: 0.75rem; }
        .mb-sw-step {
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.12);
            border-radius: 13px;
            padding: 0.9rem 1rem;
        }
        .mb-sw-step-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-bottom: 0.65rem;
        }
        .mb-sw-step-num {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            font-size: 0.82rem;
            font-weight: 800;
            color: #f1f5f9;
        }
        .mb-sw-step-badge {
            width: 22px;
            height: 22px;
            border-radius: 6px;
            background: rgba(43, 110, 120, 0.35);
            border: 1px solid rgba(76, 155, 166, 0.55);
            color: #7ec4ce;
            font-size: 0.75rem;
            font-weight: 800;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .mb-sw-v2-tag {
            font-size: 0.73rem;
            font-weight: 700;
            color: #7ec4ce;
            background: rgba(43, 110, 120, 0.22);
            border: 1px solid rgba(76, 155, 166, 0.4);
            padding: 0.18rem 0.55rem;
            border-radius: 6px;
        }
        .mb-sw-subtabs { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem; }
        .mb-sw-subtab {
            background: transparent;
            border: 1px solid rgba(203, 213, 225, 0.18);
            color: #94a3b8;
            padding: 0.28rem 0.65rem;
            border-radius: 8px;
            font-size: 0.77rem;
            font-weight: 700;
            cursor: pointer;
        }
        .mb-sw-subtab.active {
            background: rgba(43, 110, 120, 0.3);
            border-color: #4c9ba6;
            color: #f1f5f9;
        }
        .mb-sw-options { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
        .mb-sw-chip {
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.16);
            color: #e2e8f0;
            padding: 0.42rem 0.8rem;
            border-radius: 999px;
            font-size: 0.83rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .mb-sw-chip:hover { border-color: #4c9ba6; color: #ffffff; }
        .mb-sw-chip.active { background: #2b6e78; border-color: #4c9ba6; color: #ffffff; }
        .mb-sw-input {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.2);
            border-radius: 9px;
            padding: 0.42rem 0.75rem;
            color: #f1f5f9;
            font-size: 0.84rem;
            min-width: 190px;
            flex: 1 1 200px;
            max-width: 340px;
        }
        .mb-sw-input:focus { outline: none; border-color: #4c9ba6; }
        .mb-sw-preview-bar {
            margin-top: 0.95rem;
            background: #12171e;
            border: 1.5px solid rgba(76, 155, 166, 0.55);
            border-radius: 13px;
            padding: 0.9rem 1.05rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 0.85rem;
        }
        .mb-sw-preview-text { font-size: 1.02rem; font-weight: 700; color: #f1f5f9; }
        .mb-sw-btn-primary {
            background: #2b6e78;
            border: 1px solid #3d8b96;
            color: #ffffff;
            padding: 0.54rem 1.05rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .mb-sw-btn-primary:hover { background: #35838f; }
        .mb-sw-btn-ghost {
            background: transparent;
            border: 1px solid rgba(203, 213, 225, 0.2);
            color: #cbd5e1;
            padding: 0.46rem 0.85rem;
            border-radius: 9px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            text-decoration: none;
        }
        .mb-sw-btn-ghost:hover { border-color: rgba(203, 213, 225, 0.45); color: #ffffff; }
        .mb-sw-btn-ghost:disabled { opacity: 0.4; cursor: not-allowed; }
        .mb-sw-prompt-box {
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 12px;
            padding: 0.95rem 1.1rem;
            max-height: 220px;
            overflow-y: auto;
            font-size: 0.82rem;
            line-height: 1.55;
            color: #cbd5e1;
            white-space: pre-wrap;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
    `;
    document.head.appendChild(style);
}

// ============================================================================
// KOMPONENT: FANE 7 — SKRIVEHJÆLP TIL MIN BOLIG
// ============================================================================
export function createMinBoligSkrivevaerksted({ userKeywords, navigateFn, switchTab }) {
    ensureNordicWorkshopStyles();
    ensureOrdstillingColorStyles();

    const STORAGE_KEY = 'lingcog_min_bolig_skrivevaerksted_v1';
    let items = []; // [{ text, boxId }]
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (Array.isArray(saved)) {
            items = saved.map(it => (typeof it === 'string' ? { text: it, boxId: null } : it));
        }
    } catch {}

    function persist() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
    }

    let activeSubTab = 'workshop'; // 'workshop' | 'prompt'
    let activeBoxId = 'sted_by';
    let startCategory = 'person';
    let extTab = 'conj';
    let isReviewOpen = false;
    let activeReviewFocus = null;
    let checkedReviewIds = {};
    let editingIdx = null;
    let colorCodesEnabled = getColorCodesEnabled();
    let draft = {};

    function resetDraftForBox(boxId, keepCat = false) {
        const sc = BOLIG_SCENARIOS[boxId];
        if (!keepCat || !sc.starts[startCategory]) {
            startCategory = 'person';
        }
        extTab = 'conj';
        draft = {
            start: sc.starts[startCategory].options[0],
            verb: sc.verbs[0],
            invSubj: sc.invertedSubjects[0],
            atSubj: sc.atSubjects[0],
            atVerb: sc.atVerbs[0],
            object: sc.objects[0],
            skipStep3: false,
            ext: ''
        };
    }
    resetDraftForBox(activeBoxId);

    function buildDraftSentence() {
        const sc = BOLIG_SCENARIOS[activeBoxId];
        const mode = sc.starts[startCategory]?.mode || 'normal';
        const parts = [];
        if (mode === 'at_clause') {
            if (draft.start.trim()) parts.push(draft.start.trim());
            if (draft.atSubj.trim()) parts.push(draft.atSubj.trim());
            if (draft.atVerb.trim()) parts.push(draft.atVerb.trim());
            if (draft.object.trim()) parts.push(draft.object.trim());
        } else {
            if (draft.start.trim()) parts.push(draft.start.trim());
            if (draft.verb.trim()) parts.push(draft.verb.trim());
            if (mode === 'inversion' && draft.invSubj.trim()) parts.push(draft.invSubj.trim());
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

    function copyTextWithFeedback(text, btn, defaultHtml, lang) {
        if (!text) return;
        const done = () => {
            btn.innerHTML = `${SVG_CHECK}<span>${swT('btn_copied', lang)}</span>`;
            setTimeout(() => { btn.innerHTML = defaultHtml; }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(() => {});
        }
    }

    const root = document.createElement('div');
    root.className = 'mb-sw-root';

    function render() {
        const lang = getLang() || 'da';
        const rtl = isSwRtl(lang);
        const rtlAttr = rtl ? ' dir="rtl"' : '';
        root.innerHTML = '';

        // Underfaner: Skriveværksted | AI-Skriveprompt
        const tabsBar = document.createElement('div');
        tabsBar.className = 'mb-sw-main-tabs';
        tabsBar.innerHTML = `
            <button type="button" class="mb-sw-main-tab ${activeSubTab === 'workshop' ? 'active' : ''}" data-swtab="workshop"${rtlAttr}>
                ${SVG_FLOW}<span>${swT('subtab_workshop', lang)}</span>
            </button>
            <button type="button" class="mb-sw-main-tab ${activeSubTab === 'prompt' ? 'active' : ''}" data-swtab="prompt"${rtlAttr}>
                ${SVG_PEN}<span>${swT('subtab_prompt', lang)}</span>
            </button>
        `;
        tabsBar.querySelectorAll('[data-swtab]').forEach(b => {
            b.onclick = () => { activeSubTab = b.dataset.swtab; render(); };
        });
        root.appendChild(tabsBar);

        if (activeSubTab === 'workshop') {
            renderWorkshop(lang, rtlAttr);
        } else {
            renderPromptSubtab(lang, rtlAttr);
        }
    }

    function renderWorkshop(lang, rtlAttr) {
        const sc = BOLIG_SCENARIOS[activeBoxId];
        const mode = sc.starts[startCategory]?.mode || 'normal';
        const sentences = items.map(it => it.text);
        const totalWords = sentences.join(' ').trim() ? sentences.join(' ').trim().split(/\s+/).length : 0;
        const hints = analyzeBoligHints(items, lang);
        const coveredBoxIds = new Set(items.map(it => it.boxId).filter(Boolean));
        const checkedCount = BOLIG_REVIEW_QUESTIONS.filter(q => checkedReviewIds[q.id]).length;

        // 1. BRUGERENS PRÆSENTATION ØVERST + MINDMAP-FREMSKRIDT + SPØRGSMÅLS-HINTS
        const docCard = document.createElement('div');
        docCard.className = 'mb-sw-card';
        docCard.innerHTML = `
            <div class="mb-sw-card-head">
                <h3 class="mb-sw-card-title"${rtlAttr}>${SVG_PEN}<span>${swT('doc_title', lang)}</span></h3>
                <span class="mb-sw-meta-pill"${rtlAttr}>${coveredBoxIds.size} ${swT('doc_meta_boxes', lang)} · ${sentences.length} ${sentences.length === 1 ? swT('doc_meta_sent_one', lang) : swT('doc_meta_sent_many', lang)} · ${totalWords} ${swT('doc_meta_words', lang)}</span>
            </div>

            <div class="mb-sw-progress-row">
                ${Object.values(BOLIG_SCENARIOS).map(b => `
                    <button type="button" class="mb-sw-box-pill ${coveredBoxIds.has(b.id) ? 'covered' : ''} ${b.id === activeBoxId ? 'current' : ''}" data-pick-box="${b.id}"${rtlAttr}>
                        <span class="mb-sw-dot" style="background:${b.color};"></span>
                        <span>${mbT('box_' + b.id, lang)}</span>
                        ${coveredBoxIds.has(b.id) ? SVG_CHECK : ''}
                    </button>
                `).join('')}
            </div>

            <div class="mb-sw-doc-surface" dir="ltr">
                ${items.length === 0
                    ? `<span class="mb-sw-doc-empty"${rtlAttr}>${swT('doc_empty', lang)}</span>`
                    : items.map((it, idx) => `<span class="mb-sw-doc-sentence" data-edit-idx="${idx}" title="${escapeHtml(swT('doc_edit_title', lang))}">${formatSentenceForBoligReview(it.text, isReviewOpen ? activeReviewFocus : null)}</span>`).join(' ')
                }
            </div>

            ${editingIdx !== null && items[editingIdx] !== undefined ? `
                <div class="mb-sw-inline-edit">
                    <input type="text" class="mb-sw-input" id="mb-sw-inline-inp" dir="ltr" value="${escapeHtml(items[editingIdx].text)}" style="flex:1; max-width:none;" />
                    <button type="button" class="mb-sw-btn-primary" id="mb-sw-inline-save" style="padding:0.4rem 0.8rem; font-size:0.78rem;">${swT('btn_save_edit', lang)}</button>
                    <button type="button" class="mb-sw-btn-ghost" id="mb-sw-inline-del" style="padding:0.38rem 0.7rem; font-size:0.76rem;">${SVG_TRASH}<span>${swT('btn_remove', lang)}</span></button>
                    <button type="button" class="mb-sw-btn-ghost" id="mb-sw-inline-cancel" style="padding:0.38rem 0.7rem; font-size:0.76rem;">${swT('btn_cancel', lang)}</button>
                </div>
            ` : ''}

            ${!isReviewOpen ? `
                <div class="mb-sw-hints-grid">
                    ${hints.map(h => `
                        <div class="mb-sw-hint-box"${rtlAttr}>
                            <span class="mb-sw-hint-icon">${SVG_HINT}</span>
                            <div>
                                <div class="mb-sw-hint-title">${h.title}</div>
                                <div class="mb-sw-hint-text">${h.text}</div>
                                ${h.link ? `<button type="button" class="mb-sw-hint-link" data-hint-route="${h.link.route || ''}" data-hint-tab="${h.link.localTab || ''}">${h.link.label}</button>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="mb-sw-review-panel"${rtlAttr}>
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                        <div>
                            <div style="font-size:0.88rem; font-weight:800; color:#f1f5f9;">${swT('rev_title', lang)}</div>
                            <div style="font-size:0.77rem; color:#94a3b8;">${swT('rev_subtitle', lang)}</div>
                        </div>
                        <span class="mb-sw-meta-pill">${checkedCount} ${swT('rev_checked_of', lang)}</span>
                    </div>
                    ${BOLIG_REVIEW_QUESTIONS.map(rq => {
                        const isDone = !!checkedReviewIds[rq.id];
                        const isFocused = activeReviewFocus === rq.id;
                        return `
                            <div class="mb-sw-review-item ${isFocused ? 'focused' : ''} ${isDone ? 'checked' : ''}" data-rev-focus="${rq.id}">
                                <div>
                                    <div style="font-size:0.83rem; font-weight:800; color:${isFocused ? '#7ec4ce' : '#f1f5f9'}; margin-bottom:0.18rem;">${swT(rq.titleKey, lang)}</div>
                                    <div style="font-size:0.81rem; color:#cbd5e1; line-height:1.45;">${swT(rq.questionKey, lang)}</div>
                                </div>
                                <button type="button" class="mb-sw-review-check-btn ${isDone ? 'done' : ''}" data-rev-check="${rq.id}">
                                    ${SVG_CHECK}<span>${isDone ? swT('rev_btn_checked', lang) : swT('rev_btn_check', lang)}</span>
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            `}

            <div class="mb-sw-doc-actions">
                <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                    <button type="button" class="mb-sw-btn-ghost" id="mb-sw-copy-btn" ${items.length === 0 ? 'disabled' : ''}>
                        ${SVG_COPY}<span>${swT('btn_copy_text', lang)}</span>
                    </button>
                    <button type="button" class="mb-sw-btn-ghost" id="mb-sw-clear-btn" ${items.length === 0 ? 'disabled' : ''}>
                        ${SVG_TRASH}<span>${swT('btn_clear_text', lang)}</span>
                    </button>
                </div>
                ${items.length > 0 ? `
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <button type="button" class="${isReviewOpen ? 'mb-sw-btn-ghost' : 'mb-sw-btn-primary'}" id="mb-sw-toggle-rev">
                            ${SVG_CHECK}<span>${isReviewOpen ? swT('btn_review_close', lang) : swT('btn_review_open', lang)}</span>
                        </button>
                        <button type="button" class="mb-sw-btn-primary" id="mb-sw-to-mindmap">
                            <span>${swT('btn_to_mindmap', lang)}</span><span>→</span>
                        </button>
                        <button type="button" class="mb-sw-btn-ghost" id="mb-sw-to-prompt">
                            <span>${swT('btn_to_prompt', lang)}</span><span>→</span>
                        </button>
                    </div>
                ` : ''}
            </div>
        `;

        docCard.querySelectorAll('[data-pick-box]').forEach(btn => {
            btn.onclick = () => {
                activeBoxId = btn.dataset.pickBox;
                resetDraftForBox(activeBoxId);
                render();
            };
        });
        docCard.querySelectorAll('[data-edit-idx]').forEach(el => {
            el.onclick = () => { editingIdx = parseInt(el.dataset.editIdx, 10); render(); };
        });
        docCard.querySelectorAll('[data-hint-route], [data-hint-tab]').forEach(btn => {
            btn.onclick = () => {
                if (btn.dataset.hintTab && typeof switchTab === 'function') {
                    switchTab(btn.dataset.hintTab);
                } else if (btn.dataset.hintRoute && typeof navigateFn === 'function') {
                    navigateFn(btn.dataset.hintRoute);
                }
            };
        });
        const saveBtn = docCard.querySelector('#mb-sw-inline-save');
        if (saveBtn) {
            const doSave = () => {
                const val = (docCard.querySelector('#mb-sw-inline-inp')?.value || '').trim();
                if (val) items[editingIdx].text = /[.!?]$/.test(val) ? val : val + '.';
                else items.splice(editingIdx, 1);
                editingIdx = null;
                persist();
                render();
            };
            saveBtn.onclick = doSave;
            docCard.querySelector('#mb-sw-inline-inp').onkeydown = (e) => { if (e.key === 'Enter') doSave(); };
        }
        const delBtn = docCard.querySelector('#mb-sw-inline-del');
        if (delBtn) delBtn.onclick = () => { items.splice(editingIdx, 1); editingIdx = null; if (items.length === 0) isReviewOpen = false; persist(); render(); };
        const cancelBtn = docCard.querySelector('#mb-sw-inline-cancel');
        if (cancelBtn) cancelBtn.onclick = () => { editingIdx = null; render(); };
        const revToggle = docCard.querySelector('#mb-sw-toggle-rev');
        if (revToggle) revToggle.onclick = () => { isReviewOpen = !isReviewOpen; activeReviewFocus = isReviewOpen ? 'possessive' : null; render(); };
        docCard.querySelectorAll('[data-rev-focus]').forEach(el => {
            el.onclick = () => { activeReviewFocus = el.dataset.revFocus; render(); };
        });
        docCard.querySelectorAll('[data-rev-check]').forEach(btn => {
            btn.onclick = (e) => { e.stopPropagation(); checkedReviewIds[btn.dataset.revCheck] = !checkedReviewIds[btn.dataset.revCheck]; activeReviewFocus = btn.dataset.revCheck; render(); };
        });
        const copyBtn = docCard.querySelector('#mb-sw-copy-btn');
        if (copyBtn && items.length > 0) copyBtn.onclick = () => copyTextWithFeedback(sentences.join(' '), copyBtn, `${SVG_COPY}<span>${swT('btn_copy_text', lang)}</span>`, lang);
        const clearBtn = docCard.querySelector('#mb-sw-clear-btn');
        if (clearBtn) clearBtn.onclick = () => { items = []; isReviewOpen = false; activeReviewFocus = null; checkedReviewIds = {}; editingIdx = null; persist(); render(); };
        const toMindmapBtn = docCard.querySelector('#mb-sw-to-mindmap');
        if (toMindmapBtn) toMindmapBtn.onclick = () => { if (typeof switchTab === 'function') switchTab('tab_mindmap'); };
        const toPromptBtn = docCard.querySelector('#mb-sw-to-prompt');
        if (toPromptBtn) toPromptBtn.onclick = () => { activeSubTab = 'prompt'; render(); };

        root.appendChild(docCard);

        // 2. FLOWCHART-SÆTNINGSBYGGER (KOBLET TIL DE 6 MINDMAP-BOKSE + STIKORD FRA FANE 6)
        const flowCard = document.createElement('div');
        flowCard.className = 'mb-sw-card';
        const previewStr = buildDraftSentence();
        const previewHtml = buildColoredPreviewHtml({ mode, startCategory, draft, enabled: colorCodesEnabled });
        const activeExtList = extTab === 'rel' ? sc.extensionsRel : sc.extensionsConj;
        const currentKeywords = (userKeywords && userKeywords[activeBoxId]) ? userKeywords[activeBoxId] : '';
        const boxKeys = Object.keys(BOLIG_SCENARIOS);
        const currBoxIdx = boxKeys.indexOf(activeBoxId);
        const nextBox = (currBoxIdx >= 0 && currBoxIdx < boxKeys.length - 1) ? BOLIG_SCENARIOS[boxKeys[currBoxIdx + 1]] : null;
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

        flowCard.innerHTML = `
            <div class="mb-sw-card-head">
                <h3 class="mb-sw-card-title"${rtlAttr}>${SVG_FLOW}<span>${swT('flow_title', lang)}</span></h3>
                <select class="mb-sw-topic-select" id="mb-sw-box-select"${rtlAttr}>
                    ${Object.values(BOLIG_SCENARIOS).map(b => `
                        <option value="${b.id}" ${b.id === activeBoxId ? 'selected' : ''}>${swT(b.labelKey, lang)}</option>
                    `).join('')}
                </select>
            </div>

            ${currentKeywords ? `
                <div class="mb-sw-keywords-strip"${rtlAttr}>
                    <span class="mb-sw-keywords-label">${swT('flow_kw_label', lang)}</span>
                    <strong dir="ltr" style="color:#f1f5f9;">${escapeHtml(currentKeywords)}</strong>
                </div>
            ` : ''}

            ${renderColorLegendHtml(colorCodesEnabled, colorLabels)}

            <div class="mb-sw-flow-steps">
                <!-- TRIN 1 -->
                <div class="mb-sw-step" style="${step1BorderStyle}">
                    <div class="mb-sw-step-head"${rtlAttr}>
                        <span class="mb-sw-step-num"><span class="mb-sw-step-badge">1</span> ${swT('step1_title', lang)}</span>
                        ${mode === 'inversion' ? `<span class="mb-sw-v2-tag">${swT('step1_v2_tag', lang)}</span>` : ''}
                        ${mode === 'at_clause' ? `<span class="mb-sw-v2-tag">${swT('step1_at_tag', lang)}</span>` : ''}
                    </div>
                    <div class="mb-sw-subtabs">
                        ${Object.entries(sc.starts).map(([key, cat]) => {
                            const cObj = getStartCategoryColor(key);
                            const dotHtml = (colorCodesEnabled && cObj) ? `<span class="ord-col-dot" style="background:${cObj.dot}; margin-right:0.3rem;"></span>` : '';
                            return `<button type="button" class="mb-sw-subtab ${startCategory === key ? 'active' : ''}" data-scat="${key}"${rtlAttr} style="display:inline-flex; align-items:center;">${dotHtml}${swT(cat.labelKey, lang)}</button>`;
                        }).join('')}
                    </div>
                    <div class="mb-sw-options" dir="ltr">
                        ${sc.starts[startCategory].options.map(opt => `
                            <button type="button" class="mb-sw-chip ${draft.start === opt ? 'active' : ''}" data-start-opt="${opt}" style="${chipColorStyle(startColor, draft.start === opt, colorCodesEnabled)}">${opt}</button>
                        `).join('')}
                        <input type="text" class="mb-sw-input" id="mb-sw-start-inp" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" placeholder="${escapeHtml(swT('ph_start', lang))}" value="${sc.starts[startCategory].options.includes(draft.start) ? '' : escapeHtml(draft.start)}" />
                    </div>
                </div>

                <!-- TRIN 2 -->
                <div class="mb-sw-step" style="${step2BorderStyle}">
                    <div class="mb-sw-step-head"${rtlAttr}>
                        <span class="mb-sw-step-num">
                            <span class="mb-sw-step-badge">2</span>
                            ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.verb.dot};"></span>` : ''}
                            ${mode === 'at_clause' ? swT('step2_at', lang) : mode === 'inversion' ? swT('step2_inv', lang) : swT('step2_normal', lang)}
                        </span>
                    </div>
                    ${mode === 'at_clause' ? `
                        <div class="mb-sw-options" dir="ltr" style="margin-bottom:0.5rem;">
                            <span${rtlAttr} style="font-size:0.75rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.noun.text : '#94a3b8'}; font-weight:700; margin-right:0.2rem; display:inline-flex; align-items:center; gap:0.28rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.noun.dot};"></span>` : ''}${swT('lbl_who_what', lang)}
                            </span>
                            ${sc.atSubjects.map(sub => `
                                <button type="button" class="mb-sw-chip ${draft.atSubj === sub ? 'active' : ''}" data-atsubj="${sub}" style="${chipColorStyle(ORDSTILLING_COLORS.noun, draft.atSubj === sub, colorCodesEnabled)}">${sub}</button>
                            `).join('')}
                        </div>
                        <div class="mb-sw-options" dir="ltr">
                            <span${rtlAttr} style="font-size:0.75rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.verb.text : '#94a3b8'}; font-weight:700; margin-right:0.2rem; display:inline-flex; align-items:center; gap:0.28rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.verb.dot};"></span>` : ''}${swT('lbl_verb', lang)}
                            </span>
                            ${sc.atVerbs.map(v => `
                                <button type="button" class="mb-sw-chip ${draft.atVerb === v ? 'active' : ''}" data-atverb="${v}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.atVerb === v, colorCodesEnabled)}">${v}</button>
                            `).join('')}
                            <input type="text" class="mb-sw-input" id="mb-sw-atverb-inp" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" placeholder="${escapeHtml(swT('ph_verb', lang))}" value="${sc.atVerbs.includes(draft.atVerb) ? '' : escapeHtml(draft.atVerb)}" />
                        </div>
                    ` : `
                        <div class="mb-sw-options" dir="ltr">
                            ${sc.verbs.map(v => `
                                <button type="button" class="mb-sw-chip ${draft.verb === v ? 'active' : ''}" data-verb-opt="${v}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.verb === v, colorCodesEnabled)}">${v}</button>
                            `).join('')}
                            <input type="text" class="mb-sw-input" id="mb-sw-verb-inp" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" placeholder="${escapeHtml(swT('ph_verb', lang))}" value="${sc.verbs.includes(draft.verb) ? '' : escapeHtml(draft.verb)}" />
                        </div>
                        ${mode === 'inversion' ? `
                            <div dir="ltr" style="margin-top:0.65rem; padding-top:0.65rem; border-top:1px dashed rgba(203,213,225,0.12); display:flex; flex-wrap:wrap; align-items:center; gap:0.4rem;">
                                <span${rtlAttr} style="font-size:0.75rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.noun.text : '#94a3b8'}; font-weight:700; display:inline-flex; align-items:center; gap:0.28rem;">
                                    ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.noun.dot};"></span>` : ''}${swT('lbl_place3_subj', lang)}
                                </span>
                                ${sc.invertedSubjects.map(sub => `
                                    <button type="button" class="mb-sw-chip ${draft.invSubj === sub ? 'active' : ''}" data-invsubj="${sub}" style="${chipColorStyle(ORDSTILLING_COLORS.noun, draft.invSubj === sub, colorCodesEnabled)}">${sub}</button>
                                `).join('')}
                            </div>
                        ` : ''}
                    `}
                </div>

                <!-- TRIN 3 -->
                <div class="mb-sw-step" style="${mode === 'normal' && draft.skipStep3 ? 'opacity:0.65;' : ''}">
                    <div class="mb-sw-step-head"${rtlAttr}>
                        <span class="mb-sw-step-num"><span class="mb-sw-step-badge">3</span> ${swT('step3_title', lang)}</span>
                        ${mode === 'normal' ? `
                            <button type="button" class="mb-sw-chip" id="mb-sw-toggle-skip-step3" aria-pressed="${draft.skipStep3 ? 'true' : 'false'}" style="display:inline-flex; align-items:center; gap:0.35rem; padding:0.26rem 0.65rem; font-size:0.75rem; ${draft.skipStep3 ? 'border-color:#ef4444; background:rgba(239,68,68,0.18); color:#fecaca;' : ''}">
                                ${SVG_STOP}<span>${draft.skipStep3 ? (lang === 'en' ? 'Step 3 off' : 'Trin 3 slået fra') : (lang === 'en' ? 'Skip step 3' : 'Slå trin 3 fra')}</span>
                            </button>
                        ` : ''}
                    </div>
                    ${!(mode === 'normal' && draft.skipStep3) ? `
                        <div class="mb-sw-options" dir="ltr">
                            ${sc.objects.map(obj => {
                                const objColor = classifyObjectColor(obj);
                                return `<button type="button" class="mb-sw-chip ${draft.object === obj ? 'active' : ''}" data-obj-opt="${obj}" style="${chipColorStyle(objColor, draft.object === obj, colorCodesEnabled)}">${obj}</button>`;
                            }).join('')}
                            <input type="text" class="mb-sw-input" id="mb-sw-obj-inp" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" placeholder="${escapeHtml(swT('ph_obj', lang))}" value="${sc.objects.includes(draft.object) ? '' : escapeHtml(draft.object)}" />
                        </div>
                    ` : ''}
                </div>

                <!-- TRIN 4 -->
                <div class="mb-sw-step">
                    <div class="mb-sw-step-head"${rtlAttr}>
                        <span class="mb-sw-step-num"><span class="mb-sw-step-badge">4</span> ${swT('step4_title', lang)}</span>
                    </div>
                    <div class="mb-sw-subtabs">
                        <button type="button" class="mb-sw-subtab ${extTab === 'conj' ? 'active' : ''}" data-exttab="conj"${rtlAttr}>${swT('ext_tab_conj', lang)}</button>
                        <button type="button" class="mb-sw-subtab ${extTab === 'rel' ? 'active' : ''}" data-exttab="rel"${rtlAttr}>${swT('ext_tab_rel', lang)}</button>
                    </div>
                    <div class="mb-sw-options" dir="ltr">
                        ${activeExtList.map(ext => `
                            <button type="button" class="mb-sw-chip ${draft.ext === ext.text ? 'active' : ''}" data-ext-opt="${ext.text}">${ext.text === '' ? swT('ext_none', lang) : ext.label}</button>
                        `).join('')}
                        <input type="text" class="mb-sw-input" id="mb-sw-ext-inp" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" placeholder="${escapeHtml(swT('ph_ext', lang))}" value="${activeExtList.some(e => e.text === draft.ext) ? '' : escapeHtml(draft.ext)}" />
                    </div>
                </div>
            </div>

            <div class="mb-sw-preview-bar">
                <div>
                    <div${rtlAttr} style="font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#7ec4ce; margin-bottom:0.2rem;">${swT('preview_label', lang)} (${mbT('box_' + sc.id, lang)})</div>
                    <div class="mb-sw-preview-text" id="mb-sw-preview-text" dir="ltr">${previewHtml || swT('preview_empty', lang)}</div>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem; align-items:center;">
                    <button type="button" class="mb-sw-btn-primary" id="mb-sw-add-btn" ${previewStr ? '' : 'disabled'}>
                        ${SVG_ARROW_UP}<span>${swT('btn_add_sentence', lang)}</span>
                    </button>
                    ${nextBox ? `
                        <button type="button" class="mb-sw-btn-ghost" id="mb-sw-next-box-btn" title="${escapeHtml(mbT('box_' + nextBox.id, lang))}">
                            <span>${swT('btn_next_point', lang)}</span><span>→</span>
                        </button>
                    ` : ''}
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

        const syncPreview = () => {
            const p = buildDraftSentence();
            const html = buildColoredPreviewHtml({ mode, startCategory, draft, enabled: colorCodesEnabled });
            const el = flowCard.querySelector('#mb-sw-preview-text');
            const btn = flowCard.querySelector('#mb-sw-add-btn');
            if (el) el.innerHTML = html || swT('preview_empty', lang);
            if (btn) btn.disabled = !p;
        };

        flowCard.querySelector('#mb-sw-box-select').onchange = (e) => {
            activeBoxId = e.target.value;
            resetDraftForBox(activeBoxId);
            render();
        };
        flowCard.querySelectorAll('[data-scat]').forEach(b => {
            b.onclick = () => {
                startCategory = b.dataset.scat;
                draft.start = sc.starts[startCategory].options[0];
                render();
            };
        });
        flowCard.querySelectorAll('[data-start-opt]').forEach(b => { b.onclick = () => { draft.start = b.dataset.startOpt; render(); }; });
        const startInp = flowCard.querySelector('#mb-sw-start-inp');
        if (startInp) startInp.oninput = (e) => { draft.start = e.target.value; syncPreview(); };
        flowCard.querySelectorAll('[data-verb-opt]').forEach(b => { b.onclick = () => { draft.verb = b.dataset.verbOpt; render(); }; });
        const verbInp = flowCard.querySelector('#mb-sw-verb-inp');
        if (verbInp) verbInp.oninput = (e) => { draft.verb = e.target.value; syncPreview(); };
        flowCard.querySelectorAll('[data-invsubj]').forEach(b => { b.onclick = () => { draft.invSubj = b.dataset.invsubj; render(); }; });
        flowCard.querySelectorAll('[data-atsubj]').forEach(b => { b.onclick = () => { draft.atSubj = b.dataset.atsubj; render(); }; });
        flowCard.querySelectorAll('[data-atverb]').forEach(b => { b.onclick = () => { draft.atVerb = b.dataset.atverb; render(); }; });
        const atVerbInp = flowCard.querySelector('#mb-sw-atverb-inp');
        if (atVerbInp) atVerbInp.oninput = (e) => { draft.atVerb = e.target.value; syncPreview(); };
        flowCard.querySelectorAll('[data-obj-opt]').forEach(b => { b.onclick = () => { draft.object = b.dataset.objOpt; render(); }; });
        const objInp = flowCard.querySelector('#mb-sw-obj-inp');
        if (objInp) objInp.oninput = (e) => { draft.object = e.target.value; syncPreview(); };
        flowCard.querySelectorAll('[data-exttab]').forEach(b => { b.onclick = () => { extTab = b.dataset.exttab; render(); }; });
        flowCard.querySelectorAll('[data-ext-opt]').forEach(b => { b.onclick = () => { draft.ext = b.dataset.extOpt; render(); }; });
        const extInp = flowCard.querySelector('#mb-sw-ext-inp');
        if (extInp) extInp.oninput = (e) => { draft.ext = e.target.value; syncPreview(); };

        const skipStep3Btn = flowCard.querySelector('#mb-sw-toggle-skip-step3');
        if (skipStep3Btn) {
            skipStep3Btn.onclick = () => {
                draft.skipStep3 = !draft.skipStep3;
                render();
            };
        }

        flowCard.querySelector('#mb-sw-add-btn').onclick = () => {
            const finalSentence = buildDraftSentence();
            if (!finalSentence) return;
            items.push({ text: finalSentence, boxId: activeBoxId });
            persist();
            // Nulstil alle alternative tekstbokse ved indsættelse (bliv på samme boks)
            resetDraftForBox(activeBoxId, true);
            render();
        };

        const nextBoxBtn = flowCard.querySelector('#mb-sw-next-box-btn');
        if (nextBoxBtn && nextBox) {
            nextBoxBtn.onclick = () => {
                activeBoxId = nextBox.id;
                resetDraftForBox(activeBoxId);
                render();
            };
        }

        root.appendChild(flowCard);
    }

    function renderPromptSubtab(lang, rtlAttr) {
        const userText = items.map(it => it.text).join(' ').trim();
        const promptCard = document.createElement('div');
        promptCard.className = 'mb-sw-card';
        promptCard.innerHTML = `
            <div class="mb-sw-card-head">
                <h3 class="mb-sw-card-title"${rtlAttr}>${SVG_PEN}<span>${swT('prompt_title', lang)}</span></h3>
            </div>
            ${userText ? `
                <div style="background:#101419; border:1px solid rgba(76,155,166,0.45); border-radius:12px; padding:0.9rem 1rem; margin-bottom:0.95rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.45rem;">
                        <span${rtlAttr} style="font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#7ec4ce;">${swT('prompt_draft_label', lang)}</span>
                        <button type="button" class="mb-sw-btn-ghost" id="mb-sw-copy-draft" style="padding:0.3rem 0.65rem; font-size:0.76rem;">
                            ${SVG_COPY}<span>${swT('btn_copy_my_text', lang)}</span>
                        </button>
                    </div>
                    <div dir="ltr" style="font-size:0.95rem; color:#f1f5f9; line-height:1.6;">${escapeHtml(userText)}</div>
                </div>
            ` : `
                <p${rtlAttr} style="margin:0 0 0.9rem; font-size:0.86rem; color:#94a3b8;">${swT('prompt_empty', lang)}</p>
            `}
            <p${rtlAttr} style="margin:0 0 0.7rem; font-size:0.85rem; color:#cbd5e1; line-height:1.5;">
                ${escapeHtml(swT('prompt_step1', lang))}<br/>
                ${escapeHtml(swT('prompt_step2', lang))}
            </p>
            <div class="mb-sw-prompt-box" dir="ltr">${escapeHtml(SKRIVEHJAELP_SYSTEM_PROMPT)}</div>
            <div style="display:flex; flex-wrap:wrap; gap:0.55rem; margin-top:0.9rem;">
                <button type="button" class="mb-sw-btn-primary" id="mb-sw-copy-prompt">${SVG_COPY}<span>${swT('btn_copy_prompt', lang)}</span></button>
                <a class="mb-sw-btn-ghost" href="https://chat.openai.com/" target="_blank" rel="noopener">${swT('btn_open_chatgpt', lang)}</a>
                <a class="mb-sw-btn-ghost" href="https://gemini.google.com/" target="_blank" rel="noopener">${swT('btn_open_gemini', lang)}</a>
                <a class="mb-sw-btn-ghost" href="https://claude.ai/" target="_blank" rel="noopener">${swT('btn_open_claude', lang)}</a>
            </div>
        `;
        const copyDraftBtn = promptCard.querySelector('#mb-sw-copy-draft');
        if (copyDraftBtn) copyDraftBtn.onclick = () => copyTextWithFeedback(userText, copyDraftBtn, `${SVG_COPY}<span>${swT('btn_copy_my_text', lang)}</span>`, lang);
        const copyPromptBtn = promptCard.querySelector('#mb-sw-copy-prompt');
        if (copyPromptBtn) copyPromptBtn.onclick = () => copyTextWithFeedback(SKRIVEHJAELP_SYSTEM_PROMPT, copyPromptBtn, `${SVG_COPY}<span>${swT('btn_copy_prompt', lang)}</span>`, lang);
        root.appendChild(promptCard);
    }

    // Eksponér en refresh-metode så opdaterede stikord fra Fane 4 slår igennem live når man klikker til Fane 7
    render();
    root.refreshFromMindmap = () => render();
    return root;
}
