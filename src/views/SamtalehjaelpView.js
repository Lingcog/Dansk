import { getTranslation, getLang } from '../utils/i18n.js';
import { swT } from '../utils/mb_skrive_translations.js';
import { shT, isShRtl } from '../utils/samtalehjaelp_translations.js';
import { injectSkrivehjaelpStyles } from './SkrivehjaelpView.js';
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
const SVG_SPEAK = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
const SVG_MSG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
const SVG_HINT = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`;
const SVG_COPY = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const SVG_ARROW_UP = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`;
const SVG_TRASH = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;
const SVG_FLOW = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="5" rx="1"/><rect x="14" y="16" width="7" height="5" rx="1"/><path d="M6.5 8v4a2 2 0 0 0 2 2h7a2 2 0 0 1 2 2"/></svg>`;
const SVG_CHECK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
const SVG_STOP = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`;

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function speakDanish(text) {
    if (!text || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'da-DK';
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
}

function copyTextWithFeedback(text, btn, defaultHtml, copiedText) {
    const done = () => {
        btn.textContent = copiedText;
        setTimeout(() => { btn.innerHTML = defaultHtml; }, 2000);
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

// ============================================================================
// PD2 MUNDTLIG — DE 3 GENRER (FRA EKSAMINATORARK) + SPROGHANDLINGER
// ============================================================================
const ORAL_GENRES = {
    beskriv: {
        id: 'beskriv',
        labelKey: 'genre_beskriv_label',
        promptTipKey: 'genre_beskriv_tip',
        starts: {
            sted: {
                labelKey: 'cat_overblik',
                mode: 'inversion',
                options: ['På billedet', 'I forgrunden', 'I baggrunden', 'Til venstre', 'Til højre', 'I midten']
            },
            person: {
                labelKey: 'cat_personer',
                mode: 'normal',
                options: ['Nogle børn', 'Drengene', 'Pigerne', 'De', 'En dreng', 'Billedet']
            },
            sammenhaeng: {
                labelKey: 'cat_sammenhaeng',
                mode: 'inversion',
                options: ['Samtidig', 'Desuden', 'Her', 'Bagved']
            },
            at_clause: {
                labelKey: 'cat_stemning',
                mode: 'at_clause',
                options: ['Det ser ud til, at', 'Jeg kan se, at', 'Jeg tror, at', 'Det virker som om, at']
            },
            kan_lide: {
                labelKey: 'cat_kan_lide',
                mode: 'kan_lide',
                options: ['Børnene', 'De', 'Drengene']
            }
        },
        verbs: ['ser', 'er', 'spiller', 'dyrker', 'sidder', 'står', 'viser', 'laver'],
        kanLideInfinitives: ['lide at spille', 'lide at dyrke sport', 'lide at være sammen', 'lide at konkurrere', 'lide at hygge sig'],
        atSubjects: ['de', 'børnene', 'drengene', 'stemningen', 'det'],
        atVerbs: ['er', 'har', 'hygger sig', 'koncentrerer sig', 'glæder sig'],
        invertedSubjects: ['jeg', 'man', 'der', 'nogle børn', 'de'],
        objects: [
            'nogle børn, der spiller fodbold',
            'nogle børn, der spiller computerspil',
            'en flok unge i en stue',
            'forældre, der hepper på sidelinjen',
            'glade og meget koncentrerede',
            'sammen på en grøn fodboldbane',
            'foran en stor skærm'
        ],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', og de ser meget glade ud', text: ', og de ser meget glade ud' },
            { label: ', mens andre kigger på', text: ', mens andre kigger på' },
            { label: ', fordi de har det sjovt sammen', text: ', fordi de har det sjovt sammen' },
            { label: ', selvom det ser lidt hektisk ud', text: ', selvom det ser lidt hektisk ud' }
        ],
        extensionsRel: [
            { label: ', som smiler og jubler', text: ', som smiler og jubler' },
            { label: ', der løber efter bolden', text: ', der løber efter bolden' },
            { label: ', som sidder tæt sammen', text: ', som sidder tæt sammen' },
            { label: ', der foregår i fritiden', text: ', der foregår i fritiden' }
        ]
    },

    mening: {
        id: 'mening',
        labelKey: 'genre_mening_label',
        promptTipKey: 'genre_mening_tip',
        starts: {
            at_clause: {
                labelKey: 'cat_min_mening',
                mode: 'at_clause',
                options: ['Jeg synes, at', 'Jeg mener, at', 'Jeg tror, at', 'Det er en god idé, at', 'Det er vigtigt, at']
            },
            person: {
                labelKey: 'cat_generelt',
                mode: 'normal',
                options: ['Man', 'Børn og unge', 'Forældre', 'Mange familier', 'Det']
            },
            sammenhaeng: {
                labelKey: 'cat_argument',
                mode: 'inversion',
                options: ['På den ene side', 'På den anden side', 'Derfor', 'Alligevel', 'Samtidig', 'Alt i alt']
            },
            sted: {
                labelKey: 'cat_kontekst',
                mode: 'inversion',
                options: ['I fritiden', 'I Danmark', 'I skolen', 'Derhjemme', 'I en forening']
            },
            tid: {
                labelKey: 'cat_tid_idag',
                mode: 'inversion',
                options: ['I dag', 'I hverdagen', 'Ofte', 'Nogle gange']
            },
            kan_lide: {
                labelKey: 'cat_kan_lide',
                mode: 'kan_lide',
                options: ['Mange børn', 'De fleste unge', 'Jeg', 'Man']
            }
        },
        verbs: ['giver', 'er', 'lærer', 'har brug for', 'skal', 'kan', 'skaber'],
        kanLideInfinitives: ['lide at dyrke sport', 'lide at spille computerspil', 'lide at være sammen med venner', 'lide at slappe af', 'lide at bevæge sig'],
        atSubjects: ['børn', 'unge', 'man', 'forældre', 'det'],
        atVerbs: ['har brug for', 'får', 'skal have', 'lærer meget af', 'er vigtigt med', 'er en god idé med'],
        invertedSubjects: ['det', 'man', 'børn', 'jeg', 'forældre'],
        objects: [
            'en god balance mellem sport og skærm',
            'energi og godt helbred',
            'stærke venskaber og samarbejde',
            'for meget tid foran skærmen',
            'faste rammer i hverdagen',
            'både bevægelse og afslapning'
        ],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi det er sundt for kroppen', text: ', fordi det er sundt for kroppen' },
            { label: ', fordi man lærer at samarbejde', text: ', fordi man lærer at samarbejde' },
            { label: ', men det må ikke tage al tiden', text: ', men det må ikke tage al tiden' },
            { label: ', selvom det også kan være socialt', text: ', selvom det også kan være socialt' },
            { label: ', så børnene også får frisk luft', text: ', så børnene også får frisk luft' }
        ],
        extensionsRel: [
            { label: ', som styrker fællesskabet', text: ', som styrker fællesskabet' },
            { label: ', der giver gode vaner', text: ', der giver gode vaner' },
            { label: ', som hjælper dem senere i livet', text: ', som hjælper dem senere i livet' },
            { label: ', der kan være svært at styre', text: ', der kan være svært at styre' }
        ]
    },

    erfaring: {
        id: 'erfaring',
        labelKey: 'genre_erfaring_label',
        promptTipKey: 'genre_erfaring_tip',
        starts: {
            person: {
                labelKey: 'cat_person',
                mode: 'normal',
                options: ['Jeg', 'Mine børn', 'Vi', 'Min søn', 'Min datter', 'Min familie']
            },
            tid: {
                labelKey: 'cat_tid_barn',
                mode: 'inversion',
                options: ['Da jeg var barn', 'I min fritid', 'I weekenden', 'Før i tiden', 'Nu om dage', 'Hver uge']
            },
            sted: {
                labelKey: 'cat_sted',
                mode: 'inversion',
                options: ['I mit hjemland', 'I Danmark', 'Udenfor', 'Derhjemme', 'I en sportsklub']
            },
            sammenhaeng: {
                labelKey: 'cat_sammenhaeng',
                mode: 'inversion',
                options: ['Derfor', 'Bagefter', 'Ofte', 'Heldigvis', 'Desuden']
            },
            at_clause: {
                labelKey: 'cat_erfaring_minde',
                mode: 'at_clause',
                options: ['Jeg husker, at', 'Jeg oplever, at', 'Jeg synes, at', 'Jeg håber, at']
            },
            kan_lide: {
                labelKey: 'cat_kan_lide',
                mode: 'kan_lide',
                options: ['Jeg', 'Mine børn', 'Vi']
            }
        },
        verbs: ['spillede', 'lavede', 'gik til', 'var', 'har', 'spiller', 'dyrker', 'bruger'],
        kanLideInfinitives: ['lide at spille fodbold', 'lide at lege udenfor', 'lide at svømme', 'lide at cykle', 'lide at spille spil'],
        atSubjects: ['vi', 'jeg', 'mine børn', 'det', 'mine venner og jeg'],
        atVerbs: ['altid var', 'spillede', 'hyggede os', 'havde det sjovt', 'lærte meget'],
        invertedSubjects: ['jeg', 'vi', 'mine børn', 'min familie'],
        objects: [
            'fodbold med mine venner',
            'svømning to gange om ugen',
            'meget tid udenfor i gården',
            'computerspil i weekenden',
            'forskellige fritidsaktiviteter',
            'gode minder fra min barndom'
        ],
        extensionsConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi det var rigtig sjovt', text: ', fordi det var rigtig sjovt' },
            { label: ', når vi havde fri fra skole', text: ', når vi havde fri fra skole' },
            { label: ', men i dag har vi mere travlt', text: ', men i dag har vi mere travlt' },
            { label: ', og vi lærte mange nye mennesker at kende', text: ', og vi lærte mange nye mennesker at kende' }
        ],
        extensionsRel: [
            { label: ', som jeg stadig husker tydeligt', text: ', som jeg stadig husker tydeligt' },
            { label: ', der gav mig mange gode venner', text: ', der gav mig mange gode venner' },
            { label: ', som ligger tæt på hvor vi bor', text: ', som ligger tæt på hvor vi bor' }
        ]
    }
};

const ORAL_REVIEW_QUESTIONS = [
    { id: 'v2', titleKey: 'rev_q1_title', textKey: 'rev_q1_text' },
    { id: 'reason', titleKey: 'rev_q2_title', textKey: 'rev_q2_text' },
    { id: 'nuance', titleKey: 'rev_q3_title', textKey: 'rev_q3_text' },
    { id: 'tense', titleKey: 'rev_q4_title', textKey: 'rev_q4_text' },
    { id: 'speak', titleKey: 'rev_q5_title', textKey: 'rev_q5_text' }
];

function analyzeOralHints(sentences, genreId, lang) {
    const joined = sentences.join(' ').trim();
    const lower = joined.toLowerCase();
    const hints = [];

    if (sentences.length === 0) {
        if (genreId === 'beskriv') {
            hints.push({
                title: shT('hint_beskriv_1_title', lang),
                text: shT('hint_beskriv_1_text', lang)
            });
            hints.push({
                title: shT('hint_beskriv_2_title', lang),
                text: shT('hint_beskriv_2_text', lang),
                link: { label: shT('hint_beskriv_2_link', lang), route: 'ordstilling' }
            });
        } else if (genreId === 'mening') {
            hints.push({
                title: shT('hint_mening_1_title', lang),
                text: shT('hint_mening_1_text', lang)
            });
            hints.push({
                title: shT('hint_mening_2_title', lang),
                text: shT('hint_mening_2_text', lang),
                link: { label: shT('hint_mening_2_link', lang), route: 'top_konjunktioner' }
            });
        } else {
            hints.push({
                title: shT('hint_erfaring_1_title', lang),
                text: shT('hint_erfaring_1_text', lang),
                link: { label: shT('hint_erfaring_1_link', lang), route: 'punktet_og_broen' }
            });
            hints.push({
                title: shT('hint_erfaring_2_title', lang),
                text: shT('hint_erfaring_2_text', lang)
            });
        }
        return hints;
    }

    const hasBecause = /\b(fordi|men|selvom|så)\b/i.test(lower);
    if (!hasBecause) {
        hints.push({
            title: shT('hint_dyn_reason_title', lang),
            text: shT('hint_dyn_reason_text', lang),
            link: { label: shT('hint_dyn_reason_link', lang), route: 'top_konjunktioner' }
        });
    }

    const lastTwo = sentences.slice(-2);
    if (lastTwo.length >= 2 && lastTwo.every(s => /^jeg\b/i.test(s.trim()))) {
        hints.push({
            title: shT('hint_dyn_jeg_title', lang),
            text: shT('hint_dyn_jeg_text', lang),
            link: { label: shT('hint_dyn_jeg_link', lang), route: 'ordstilling' }
        });
    }

    const hasRel = /\b(som|der)\b/i.test(lower);
    if (sentences.length >= 2 && !hasRel && hints.length < 2) {
        hints.push({
            title: shT('hint_dyn_rel_title', lang),
            text: shT('hint_dyn_rel_text', lang)
        });
    }

    if (hints.length < 2) {
        hints.push({
            title: shT('hint_dyn_rhythm_title', lang),
            text: shT('hint_dyn_rhythm_text', lang)
        });
    }

    return hints.slice(0, 2);
}

function formatSentenceFocus(sentence, focusId) {
    const safe = escapeHtml(sentence);
    if (!focusId) return safe;
    if (focusId === 'v2') {
        const startsWithPerson = /^(jeg|vi|du|han|hun|de|min|mit|mine|man|børn|nogle|drengene|pigerne|forældre)\b/i.test(sentence.trim());
        return startsWithPerson ? safe : `<mark class="sh-rev-mark">${safe}</mark>`;
    }
    if (focusId === 'reason' || focusId === 'nuance') {
        return safe.replace(/\b(fordi|men|selvom|derfor|samtidig|alligevel|desuden|på den ene side|på den anden side|og|så|som|der|at)\b/gi, '<mark class="sh-rev-mark">$1</mark>');
    }
    if (focusId === 'speak') {
        return `<mark class="sh-rev-mark-soft">${safe}</mark>`;
    }
    return safe;
}

// ============================================================================
// HOVEDKOMPONENT: SAMTALEHJÆLP (PD2 MUNDTLIG) — 18 SPROG + RTL
// ============================================================================
export function renderSamtalehjaelpView(container, navigateFn) {
    injectSkrivehjaelpStyles();
    ensureOrdstillingColorStyles();

    const STORAGE_KEY = 'lingcog_samtalehjaelp_v1';
    let activeGenreId = 'beskriv';
    let sentences = [];
    let isReviewOpen = false;
    let activeReviewFocus = null;
    let checkedReviewIds = {};
    let editingSentenceIdx = null;
    let colorCodesEnabled = getColorCodesEnabled();

    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        if (Array.isArray(saved.sentences)) sentences = saved.sentences;
        if (saved.genreId && ORAL_GENRES[saved.genreId]) activeGenreId = saved.genreId;
    } catch {}

    function persist() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                genreId: activeGenreId,
                sentences
            }));
        } catch {}
    }

    let startCategory = Object.keys(ORAL_GENRES[activeGenreId].starts)[0];
    let extTab = 'conj';
    let draft = {};

    function resetDraftForGenre(genreId, preferredCat) {
        const g = ORAL_GENRES[genreId];
        const catKeys = Object.keys(g.starts);
        const defaultCat = (preferredCat && g.starts[preferredCat]) ? preferredCat : catKeys[0];
        startCategory = defaultCat;
        extTab = 'conj';
        draft = {
            start: g.starts[defaultCat].options[0],
            verb: g.verbs[0],
            invSubj: g.invertedSubjects[0],
            atSubj: g.atSubjects[0],
            atVerb: g.atVerbs[0],
            kanModal: 'kan',
            kanAdv: 'godt',
            kanInf: (g.kanLideInfinitives && g.kanLideInfinitives[0]) || 'lide at spille',
            object: g.objects[0],
            skipStep3: false,
            ext: ''
        };
    }

    resetDraftForGenre(activeGenreId);

    function buildDraftSentence() {
        const g = ORAL_GENRES[activeGenreId];
        const mode = g.starts[startCategory]?.mode || 'normal';
        const parts = [];

        if (mode === 'at_clause') {
            if (draft.start.trim()) parts.push(draft.start.trim());
            if (draft.atSubj.trim()) parts.push(draft.atSubj.trim());
            if (draft.atVerb.trim()) parts.push(draft.atVerb.trim());
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

        const lang = getLang() || 'da';
        const rtlAttr = isShRtl(lang) ? ' dir="rtl"' : '';

        // Top bar
        const topBar = document.createElement('div');
        topBar.className = 'top-bar';
        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn';
        backBtn.textContent = '← ' + (getTranslation('back') || 'Tilbage');
        backBtn.onclick = () => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            navigateFn('samtale_traening');
        };
        topBar.appendChild(backBtn);
        viewContainer.appendChild(topBar);

        // Header
        const header = document.createElement('div');
        header.className = 'sh-header';
        header.innerHTML = `
            <h1${rtlAttr}>${escapeHtml(shT('page_title', lang))}</h1>
            <p${rtlAttr}>${escapeHtml(shT('page_subtitle', lang))}</p>
        `;
        viewContainer.appendChild(header);

        const g = ORAL_GENRES[activeGenreId];
        const mode = g.starts[startCategory]?.mode || 'normal';
        const isInv = mode === 'inversion';
        const isAt = mode === 'at_clause';
        const isKanLide = mode === 'kan_lide';
        const totalWords = sentences.join(' ').trim().split(/\s+/).filter(Boolean).length;
        const hints = analyzeOralHints(sentences, activeGenreId, lang);
        const checkedCount = ORAL_REVIEW_QUESTIONS.filter(q => checkedReviewIds[q.id]).length;

        // 1. ØVERST: DIT MUNDTLIGE SVAR
        const docCard = document.createElement('div');
        docCard.className = 'sh-card';
        docCard.innerHTML = `
            <div class="sh-card-head">
                <h2 class="sh-card-title"${rtlAttr}>${SVG_MSG}<span>${escapeHtml(shT('doc_title', lang))}</span></h2>
                <span class="sh-meta-pill"${rtlAttr}>${sentences.length} ${escapeHtml(sentences.length === 1 ? shT('meta_sent_one', lang) : shT('meta_sent_many', lang))} · ${totalWords} ${escapeHtml(shT('meta_words', lang))}</span>
            </div>
            <div class="sh-doc-surface" id="sh-doc-surface" dir="ltr">
                ${sentences.length === 0
                    ? `<span class="sh-doc-empty"${rtlAttr}>${escapeHtml(shT('doc_empty', lang))}</span>`
                    : sentences.map((s, idx) => `<span class="sh-doc-sentence" data-edit-idx="${idx}" title="${escapeHtml(shT('doc_edit_title', lang))}">${formatSentenceFocus(s, isReviewOpen ? activeReviewFocus : null)}</span>`).join(' ')
                }
            </div>
            ${editingSentenceIdx !== null && sentences[editingSentenceIdx] !== undefined ? `
                <div class="sh-inline-edit-row">
                    <input type="text" class="sh-custom-input" id="sh-inline-edit-inp" dir="ltr" value="${escapeHtml(sentences[editingSentenceIdx])}" style="flex:1; min-width:220px;" />
                    <button type="button" class="sh-btn-primary" id="sh-inline-save-btn" style="padding:0.42rem 0.85rem; font-size:0.8rem;">${escapeHtml(shT('btn_save', lang))}</button>
                    <button type="button" class="sh-btn-ghost" id="sh-inline-del-btn" style="padding:0.4rem 0.75rem; font-size:0.78rem;">${SVG_TRASH}<span>${escapeHtml(shT('btn_remove', lang))}</span></button>
                    <button type="button" class="sh-btn-ghost" id="sh-inline-cancel-btn" style="padding:0.4rem 0.75rem; font-size:0.78rem;">${escapeHtml(shT('btn_cancel', lang))}</button>
                </div>
            ` : ''}
            ${!isReviewOpen ? `
                <div class="sh-hints-grid">
                    ${hints.map(h => `
                        <div class="sh-hint-box"${rtlAttr}>
                            <span class="sh-hint-icon">${SVG_HINT}</span>
                            <div>
                                <div class="sh-hint-title">${escapeHtml(h.title)}</div>
                                <div class="sh-hint-text">${escapeHtml(h.text)}</div>
                                ${h.link ? `<button type="button" class="sh-hint-link" data-hint-route="${h.link.route}">${escapeHtml(h.link.label)}</button>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="sh-review-panel" id="sh-review-panel"${rtlAttr}>
                    <div class="sh-review-head">
                        <div>
                            <div style="font-size:0.9rem; font-weight:800; color:#f1f5f9;">${escapeHtml(shT('rev_title', lang))}</div>
                            <div style="font-size:0.78rem; color:#94a3b8;">${escapeHtml(shT('rev_subtitle', lang))}</div>
                        </div>
                        <span class="sh-meta-pill">${checkedCount} / ${ORAL_REVIEW_QUESTIONS.length} ${escapeHtml(shT('rev_checked_of', lang))}</span>
                    </div>
                    ${ORAL_REVIEW_QUESTIONS.map(rq => {
                        const isDone = !!checkedReviewIds[rq.id];
                        const isFocused = activeReviewFocus === rq.id;
                        return `
                            <div class="sh-review-item ${isFocused ? 'focused' : ''} ${isDone ? 'checked' : ''}" data-rev-focus="${rq.id}">
                                <div>
                                    <div style="font-size:0.84rem; font-weight:800; color:${isFocused ? '#7ec4ce' : '#f1f5f9'}; margin-bottom:0.2rem;">${escapeHtml(shT(rq.titleKey, lang))}</div>
                                    <div style="font-size:0.82rem; color:#cbd5e1; line-height:1.45;">${escapeHtml(shT(rq.textKey, lang))}</div>
                                </div>
                                <button type="button" class="sh-review-check-btn ${isDone ? 'done' : ''}" data-rev-check="${rq.id}">
                                    ${SVG_CHECK}<span>${escapeHtml(isDone ? shT('rev_btn_checked', lang) : shT('rev_btn_check', lang))}</span>
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            `}
            <div class="sh-doc-actions">
                <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                    <button type="button" class="sh-btn-primary" id="sh-speak-all-btn" ${sentences.length === 0 ? 'disabled' : ''}>
                        ${SVG_SPEAK}<span>${escapeHtml(shT('btn_speak_all', lang))}</span>
                    </button>
                    <button type="button" class="sh-btn-ghost" id="sh-copy-doc-btn" ${sentences.length === 0 ? 'disabled' : ''}>
                        ${SVG_COPY}<span>${escapeHtml(shT('btn_copy', lang))}</span>
                    </button>
                    <button type="button" class="sh-btn-ghost" id="sh-clear-doc-btn" ${sentences.length === 0 ? 'disabled' : ''}>
                        ${SVG_TRASH}<span>${escapeHtml(shT('btn_clear', lang))}</span>
                    </button>
                </div>
                ${sentences.length > 0 ? `
                    <button type="button" class="${isReviewOpen ? 'sh-btn-ghost' : 'sh-btn-primary'}" id="sh-toggle-review-btn">
                        ${SVG_CHECK}<span>${escapeHtml(isReviewOpen ? shT('btn_review_close', lang) : shT('btn_review_open', lang))}</span>
                    </button>
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
        const inlineSaveBtn = docCard.querySelector('#sh-inline-save-btn');
        if (inlineSaveBtn) {
            const saveEdit = () => {
                const val = (docCard.querySelector('#sh-inline-edit-inp')?.value || '').trim();
                if (val) {
                    sentences[editingSentenceIdx] = /[.!?]$/.test(val) ? val : val + '.';
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
            inlineCancelBtn.onclick = () => { editingSentenceIdx = null; render(); };
        }
        const speakAllBtn = docCard.querySelector('#sh-speak-all-btn');
        if (speakAllBtn && sentences.length > 0) {
            speakAllBtn.onclick = () => speakDanish(sentences.join(' '));
        }
        const copyDocBtn = docCard.querySelector('#sh-copy-doc-btn');
        if (copyDocBtn && sentences.length > 0) {
            copyDocBtn.onclick = () => copyTextWithFeedback(
                sentences.join(' '),
                copyDocBtn,
                `${SVG_COPY}<span>${escapeHtml(shT('btn_copy', lang))}</span>`,
                shT('btn_copied', lang)
            );
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
        const toggleRevBtn = docCard.querySelector('#sh-toggle-review-btn');
        if (toggleRevBtn) {
            toggleRevBtn.onclick = () => {
                isReviewOpen = !isReviewOpen;
                activeReviewFocus = isReviewOpen ? 'v2' : null;
                render();
            };
        }
        docCard.querySelectorAll('[data-rev-focus]').forEach(item => {
            item.onclick = () => { activeReviewFocus = item.dataset.revFocus; render(); };
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
        viewContainer.appendChild(docCard);

        // 2. SÆTNINGSBYGGER MED GENRE-RULLENEDMENU + SPROGHANDLINGER
        const flowCard = document.createElement('div');
        flowCard.className = 'sh-card';
        const previewStr = buildDraftSentence();
        const previewHtml = buildColoredPreviewHtml({ mode, startCategory, draft, enabled: colorCodesEnabled });
        const activeExtList = extTab === 'rel' ? g.extensionsRel : g.extensionsConj;
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
            <div class="sh-card-head">
                <h2 class="sh-card-title"${rtlAttr}>${SVG_FLOW}<span>${escapeHtml(shT('flow_title', lang))}</span></h2>
                <label class="sh-topic-picker"${rtlAttr}>
                    <span class="sh-topic-label">${escapeHtml(shT('genre_label', lang))}</span>
                    <select class="sh-topic-select" id="sh-genre-select">
                        ${Object.values(ORAL_GENRES).map(gen => `
                            <option value="${gen.id}" ${gen.id === activeGenreId ? 'selected' : ''}>${escapeHtml(shT(gen.labelKey, lang))}</option>
                        `).join('')}
                    </select>
                </label>
            </div>

            <div${rtlAttr} style="background:#101419; border:1px solid rgba(76, 155, 166, 0.35); border-left:3px solid #4c9ba6; border-radius:10px; padding:0.7rem 0.95rem; margin-bottom:0.95rem; font-size:0.84rem; color:#cbd5e1; line-height:1.5;">
                ${escapeHtml(shT(g.promptTipKey, lang))}
            </div>

            ${renderColorLegendHtml(colorCodesEnabled, colorLabels)}

            <div class="sh-flow-steps">
                <!-- TRIN 1 -->
                <div class="sh-flow-node active-node" style="${step1BorderStyle}">
                    <div class="sh-flow-node-head"${rtlAttr}>
                        <div>
                            <span class="sh-step-num">1</span>
                            <strong>${escapeHtml(shT('step1_q', lang))}</strong>
                        </div>
                        <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
                            ${Object.entries(g.starts).map(([k, cfg]) => {
                                const cObj = getStartCategoryColor(k);
                                const dotHtml = (colorCodesEnabled && cObj) ? `<span class="ord-col-dot" style="background:${cObj.dot}; margin-right:0.32rem;"></span>` : '';
                                return `
                                    <button type="button" class="sh-chip ${startCategory === k ? 'petrol-active' : ''}" data-start-cat="${k}" style="padding:0.28rem 0.65rem; font-size:0.76rem; display:inline-flex; align-items:center;">
                                        ${dotHtml}${escapeHtml(shT(cfg.labelKey, lang))}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    <div class="sh-options-wrap" dir="ltr">
                        ${g.starts[startCategory].options.map(opt => `
                            <button type="button" class="sh-chip ${draft.start === opt ? 'active' : ''}" data-pick-start="${opt}" style="${chipColorStyle(startColor, draft.start === opt, colorCodesEnabled)}">${opt}</button>
                        `).join('')}
                        <input type="text" class="sh-custom-input" id="sh-inp-start" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${g.starts[startCategory].options.includes(draft.start) ? '' : escapeHtml(draft.start)}" placeholder="${escapeHtml(shT('ph_start', lang))}" />
                    </div>
                </div>

                <div class="sh-flow-arrow">↓</div>

                <!-- TRIN 2 -->
                <div class="sh-flow-node active-node" style="${step2BorderStyle}">
                    <div class="sh-flow-node-head"${rtlAttr}>
                        <div style="display:inline-flex; align-items:center; gap:0.35rem;">
                            <span class="sh-step-num">2</span>
                            ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.verb.dot};"></span>` : ''}
                            <strong>${escapeHtml(isAt ? shT('step2_at', lang) : isKanLide ? shT('step2_kan_lide', lang) : shT('step2_normal', lang))}</strong>
                        </div>
                        ${isInv ? `<span class="sh-v2-tag">${escapeHtml(shT('tag_v2', lang))}</span>` : ''}
                        ${isAt ? `<span class="sh-v2-tag">${escapeHtml(shT('tag_at', lang))}</span>` : ''}
                        ${isKanLide ? `<span class="sh-v2-tag">${escapeHtml(shT('tag_kan_lide', lang))}</span>` : ''}
                    </div>
                    ${isAt ? `
                        <div class="sh-options-wrap" dir="ltr" style="margin-bottom:0.55rem;">
                            <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.noun.text : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.noun.dot};"></span>` : ''}${escapeHtml(shT('lbl_at_subj', lang))}
                            </span>
                            ${g.atSubjects.map(sub => `
                                <button type="button" class="sh-chip ${draft.atSubj === sub ? 'petrol-active' : ''}" data-pick-atsubj="${sub}" style="${chipColorStyle(ORDSTILLING_COLORS.noun, draft.atSubj === sub, colorCodesEnabled)}">${sub}</button>
                            `).join('')}
                        </div>
                        <div class="sh-options-wrap" dir="ltr">
                            ${g.atVerbs.map(v => `
                                <button type="button" class="sh-chip ${draft.atVerb === v ? 'active' : ''}" data-pick-atverb="${v}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.atVerb === v, colorCodesEnabled)}">${v}</button>
                            `).join('')}
                            <input type="text" class="sh-custom-input" id="sh-inp-atverb" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${g.atVerbs.includes(draft.atVerb) ? '' : escapeHtml(draft.atVerb)}" placeholder="${escapeHtml(shT('ph_verb', lang))}" />
                        </div>
                    ` : isKanLide ? `
                        <div class="sh-options-wrap" dir="ltr" style="margin-bottom:0.55rem;">
                            <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.verb.text : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.verb.dot};"></span>` : ''}${escapeHtml(shT('lbl_modal', lang))}
                            </span>
                            ${['kan', 'kunne'].map(m => `
                                <button type="button" class="sh-chip ${draft.kanModal === m ? 'active' : ''}" data-pick-kanmodal="${m}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.kanModal === m, colorCodesEnabled)}">${m}</button>
                            `).join('')}
                        </div>
                        <div class="sh-options-wrap" dir="ltr" style="margin-bottom:0.55rem;">
                            <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? '#38bdf8' : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:#38bdf8;"></span>` : ''}${escapeHtml(shT('lbl_mid_adv', lang))}
                            </span>
                            ${['godt', 'rigtig godt', 'virkelig godt', 'ikke', 'bedst'].map(adv => `
                                <button type="button" class="sh-chip ${draft.kanAdv === adv ? 'active' : ''}" data-pick-kanadv="${adv}" style="${chipColorStyle({ dot: '#38bdf8', bg: 'rgba(56, 189, 248, 0.14)', border: 'rgba(56, 189, 248, 0.5)' }, draft.kanAdv === adv, colorCodesEnabled)}">${adv}</button>
                            `).join('')}
                        </div>
                        <div class="sh-options-wrap" dir="ltr">
                            <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.verb.text : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.verb.dot};"></span>` : ''}${escapeHtml(shT('lbl_infinitive', lang))}
                            </span>
                            ${(g.kanLideInfinitives || []).map(inf => `
                                <button type="button" class="sh-chip ${draft.kanInf === inf ? 'active' : ''}" data-pick-kaninf="${inf}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.kanInf === inf, colorCodesEnabled)}">${inf}</button>
                            `).join('')}
                            <input type="text" class="sh-custom-input" id="sh-inp-kaninf" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${(g.kanLideInfinitives || []).includes(draft.kanInf) ? '' : escapeHtml(draft.kanInf)}" placeholder="lide at ..." />
                        </div>
                    ` : `
                        <div class="sh-options-wrap" dir="ltr">
                            ${g.verbs.map(v => `
                                <button type="button" class="sh-chip ${draft.verb === v ? 'active' : ''}" data-pick-verb="${v}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.verb === v, colorCodesEnabled)}">${v}</button>
                            `).join('')}
                            <input type="text" class="sh-custom-input" id="sh-inp-verb" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${g.verbs.includes(draft.verb) ? '' : escapeHtml(draft.verb)}" placeholder="${escapeHtml(shT('ph_verb', lang))}" />
                        </div>
                    `}
                </div>

                <div class="sh-flow-arrow">↓</div>

                <!-- TRIN 3 -->
                <div class="sh-flow-node ${mode === 'normal' && draft.skipStep3 ? '' : 'active-node'}" style="${mode === 'normal' && draft.skipStep3 ? 'opacity:0.65;' : ''}">
                    <div class="sh-flow-node-head"${rtlAttr}>
                        <div><span class="sh-step-num">3</span><strong>${escapeHtml(isInv ? shT('step3_inv', lang) : shT('step3_normal', lang))}</strong></div>
                        ${mode === 'normal' ? `
                            <button type="button" class="sh-chip" id="sh-toggle-skip-step3" aria-pressed="${draft.skipStep3 ? 'true' : 'false'}" style="display:inline-flex; align-items:center; gap:0.35rem; padding:0.26rem 0.65rem; font-size:0.75rem; ${draft.skipStep3 ? 'border-color:#ef4444; background:rgba(239,68,68,0.18); color:#fecaca;' : ''}">
                                ${SVG_STOP}<span>${escapeHtml(draft.skipStep3 ? shT('btn_step3_off', lang) : shT('btn_skip_step3', lang))}</span>
                            </button>
                        ` : ''}
                    </div>
                    ${!(mode === 'normal' && draft.skipStep3) ? `
                        ${isInv ? `
                            <div class="sh-options-wrap" dir="ltr" style="margin-bottom:0.55rem;">
                                <span${rtlAttr} style="font-size:0.78rem; color:${colorCodesEnabled ? ORDSTILLING_COLORS.noun.text : '#7ec4ce'}; font-weight:700; display:inline-flex; align-items:center; gap:0.3rem;">
                                    ${colorCodesEnabled ? `<span class="ord-col-dot" style="background:${ORDSTILLING_COLORS.noun.dot};"></span>` : ''}${escapeHtml(shT('lbl_place3_subj', lang))}
                                </span>
                                ${g.invertedSubjects.map(sub => `
                                    <button type="button" class="sh-chip ${draft.invSubj === sub ? 'petrol-active' : ''}" data-pick-invsubj="${sub}" style="${chipColorStyle(ORDSTILLING_COLORS.noun, draft.invSubj === sub, colorCodesEnabled)}">${sub}</button>
                                `).join('')}
                            </div>
                        ` : ''}
                        <div class="sh-options-wrap" dir="ltr">
                            ${g.objects.map(obj => {
                                const objColor = classifyObjectColor(obj);
                                return `<button type="button" class="sh-chip ${draft.object === obj ? 'active' : ''}" data-pick-obj="${obj}" style="${chipColorStyle(objColor, draft.object === obj, colorCodesEnabled)}">${obj}</button>`;
                            }).join('')}
                            <input type="text" class="sh-custom-input" id="sh-inp-obj" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${g.objects.includes(draft.object) ? '' : escapeHtml(draft.object)}" placeholder="${escapeHtml(shT('ph_obj', lang))}" style="flex:1; min-width:210px;" />
                        </div>
                    ` : ''}
                </div>

                <div class="sh-flow-arrow">↓</div>

                <!-- TRIN 4 -->
                <div class="sh-flow-node">
                    <div class="sh-flow-node-head"${rtlAttr}>
                        <div><span class="sh-step-num">4</span><strong>${escapeHtml(shT('step4_title', lang))}</strong></div>
                        <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
                            <button type="button" class="sh-chip ${extTab === 'conj' ? 'petrol-active' : ''}" data-ext-tab="conj" style="padding:0.26rem 0.62rem; font-size:0.75rem;">
                                ${escapeHtml(shT('ext_tab_conj', lang))}
                            </button>
                            <button type="button" class="sh-chip ${extTab === 'rel' ? 'petrol-active' : ''}" data-ext-tab="rel" style="padding:0.26rem 0.62rem; font-size:0.75rem;">
                                ${escapeHtml(shT('ext_tab_rel', lang))}
                            </button>
                        </div>
                    </div>
                    <div class="sh-options-wrap" dir="ltr">
                        ${activeExtList.map(ex => `
                            <button type="button" class="sh-chip ${draft.ext === ex.text ? 'active' : ''}" data-pick-ext="${ex.text}">${ex.text === '' ? escapeHtml(shT('ext_none', lang)) : ex.label}</button>
                        `).join('')}
                        <input type="text" class="sh-custom-input" id="sh-inp-ext" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${activeExtList.some(e => e.text === draft.ext) ? '' : escapeHtml(draft.ext)}" placeholder="${escapeHtml(shT('ph_ext', lang))}" style="flex:1; min-width:210px;" />
                    </div>
                </div>
            </div>

            <!-- LIVE PREVIEW + LYT + INDSÆT -->
            <div class="sh-preview-bar">
                <div style="flex:1; min-width:240px;">
                    <div${rtlAttr} style="font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#7ec4ce; margin-bottom:0.2rem;">${escapeHtml(shT('preview_title', lang))}</div>
                    <div class="sh-preview-text" id="sh-preview-text" dir="ltr">${previewHtml || escapeHtml(shT('preview_empty', lang))}</div>
                </div>
                <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                    <button type="button" class="sh-btn-ghost" id="sh-speak-draft-btn" ${!previewStr ? 'disabled' : ''}>
                        ${SVG_SPEAK}<span>${escapeHtml(shT('btn_speak_draft', lang))}</span>
                    </button>
                    <button type="button" class="sh-btn-ghost" id="sh-reset-draft-btn">${escapeHtml(shT('btn_reset', lang))}</button>
                    <button type="button" class="sh-btn-primary" id="sh-add-sentence-btn" ${!previewStr ? 'disabled' : ''}>
                        ${SVG_ARROW_UP}<span>${escapeHtml(shT('btn_add', lang))}</span>
                    </button>
                </div>
            </div>
        `;

        // Event wiring
        const colorToggleBtn = flowCard.querySelector('[data-toggle-color-codes]');
        if (colorToggleBtn) {
            colorToggleBtn.onclick = () => {
                colorCodesEnabled = !colorCodesEnabled;
                setColorCodesEnabled(colorCodesEnabled);
                render();
            };
        }

        const genreSel = flowCard.querySelector('#sh-genre-select');
        if (genreSel) {
            genreSel.onchange = (e) => {
                activeGenreId = e.target.value;
                persist();
                resetDraftForGenre(activeGenreId);
                render();
            };
        }

        flowCard.querySelectorAll('[data-start-cat]').forEach(b => {
            b.onclick = () => {
                startCategory = b.dataset.startCat;
                draft.start = g.starts[startCategory].options[0];
                render();
            };
        });
        flowCard.querySelectorAll('[data-ext-tab]').forEach(b => {
            b.onclick = () => { extTab = b.dataset.extTab; render(); };
        });
        flowCard.querySelectorAll('[data-pick-start]').forEach(b => {
            b.onclick = () => { draft.start = b.dataset.pickStart; render(); };
        });
        flowCard.querySelectorAll('[data-pick-verb]').forEach(b => {
            b.onclick = () => { draft.verb = b.dataset.pickVerb; render(); };
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
            const speakBtn = flowCard.querySelector('#sh-speak-draft-btn');
            const s = buildDraftSentence();
            const html = buildColoredPreviewHtml({ mode, startCategory, draft, enabled: colorCodesEnabled });
            if (p) p.innerHTML = html || escapeHtml(shT('preview_empty', lang));
            if (addBtn) addBtn.disabled = !s;
            if (speakBtn) speakBtn.disabled = !s;
        };

        const skipStep3Btn = flowCard.querySelector('#sh-toggle-skip-step3');
        if (skipStep3Btn) {
            skipStep3Btn.onclick = () => {
                draft.skipStep3 = !draft.skipStep3;
                render();
            };
        }

        flowCard.querySelector('#sh-inp-start').oninput = (e) => { draft.start = e.target.value; liveUpdatePreview(); };
        const inpVerb = flowCard.querySelector('#sh-inp-verb');
        if (inpVerb) inpVerb.oninput = (e) => { draft.verb = e.target.value; liveUpdatePreview(); };
        const inpAtVerb = flowCard.querySelector('#sh-inp-atverb');
        if (inpAtVerb) inpAtVerb.oninput = (e) => { draft.atVerb = e.target.value; liveUpdatePreview(); };
        const inpKanInf = flowCard.querySelector('#sh-inp-kaninf');
        if (inpKanInf) inpKanInf.oninput = (e) => { draft.kanInf = e.target.value; liveUpdatePreview(); };
        const inpObj = flowCard.querySelector('#sh-inp-obj');
        if (inpObj) inpObj.oninput = (e) => { draft.object = e.target.value; liveUpdatePreview(); };
        const inpExt = flowCard.querySelector('#sh-inp-ext');
        if (inpExt) inpExt.oninput = (e) => { draft.ext = e.target.value; liveUpdatePreview(); };

        flowCard.querySelector('#sh-speak-draft-btn').onclick = () => {
            const s = buildDraftSentence();
            if (s) speakDanish(s);
        };

        flowCard.querySelector('#sh-reset-draft-btn').onclick = () => {
            resetDraftForGenre(activeGenreId);
            render();
        };

        flowCard.querySelector('#sh-add-sentence-btn').onclick = () => {
            const built = buildDraftSentence();
            if (!built) return;
            sentences.push(built);
            persist();
            let nextCat = startCategory;
            if (activeGenreId === 'beskriv' && startCategory === 'sted' && sentences.length === 1) {
                nextCat = 'person';
            } else if (activeGenreId === 'mening' && startCategory === 'at_clause' && sentences.length === 1) {
                nextCat = 'sammenhaeng';
            } else if (activeGenreId === 'erfaring' && startCategory === 'person' && sentences.length === 1) {
                nextCat = 'tid';
            }
            resetDraftForGenre(activeGenreId, nextCat);
            render();
        };

        viewContainer.appendChild(flowCard);
    }

    render();
    container.appendChild(viewContainer);
}
