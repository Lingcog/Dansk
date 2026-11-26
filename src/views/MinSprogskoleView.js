import { baseUrl } from '../utils/config.js';
import { getLang } from '../utils/i18n.js';
import { msT, msSub, isMsRtl } from '../utils/min_sprogskole_translations.js';
import { swT } from '../utils/mb_skrive_translations.js';
import { attachVrimmelControls } from '../utils/vrimmelPegefeltStandard.js';
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
// MONOKROME SVG-IKONER (Nul emoji-clutter i Skrivehjælp og Træn udtale)
// ============================================================================
const SVG_SPEAK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
const SVG_MIC = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`;
const SVG_COPY = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const SVG_STOP = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`;
const SVG_CHECK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
const SVG_HINT = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`;

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function speakDanish(text, rate = 0.88) {
    if (!text || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'da-DK';
    u.rate = rate;
    window.speechSynthesis.speak(u);
}

function normalizeDa(str) {
    return (str || '')
        .toLowerCase()
        .replace(/[.,!?;:»«"()–—-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function scoreSentencePronunciation(targetSentence, spokenTranscript) {
    const rawWords = targetSentence.trim().split(/\s+/).filter(Boolean);
    const spokenList = normalizeDa(spokenTranscript).split(/\s+/).filter(Boolean);
    const targetClean = normalizeDa(targetSentence);
    const transcriptClean = normalizeDa(spokenTranscript);

    const wordData = rawWords.map(rawWord => {
        const cleanWord = normalizeDa(rawWord);
        if (!cleanWord) return { word: rawWord, score: 100 };
        let wordScore = 0;
        for (const spk of spokenList) {
            if (spk === cleanWord) {
                wordScore = 100;
                break;
            } else if (cleanWord.length > 2 && (spk.includes(cleanWord) || cleanWord.includes(spk))) {
                const ratio = Math.min(spk.length, cleanWord.length) / Math.max(spk.length, cleanWord.length);
                wordScore = Math.max(wordScore, Math.round(ratio * 90));
            }
        }
        return { word: rawWord, score: wordScore };
    });

    let overallScore = wordData.length > 0
        ? Math.round(wordData.reduce((acc, w) => acc + w.score, 0) / wordData.length)
        : 0;

    if (transcriptClean && (transcriptClean.includes(targetClean) || (targetClean.includes(transcriptClean) && transcriptClean.length >= Math.max(4, targetClean.length - 3)))) {
        overallScore = 100;
        wordData.forEach(w => { w.score = 100; });
    }
    return { overallScore, wordData, transcript: spokenTranscript };
}

function copyText(text, btn, defaultHtml, copiedLbl) {
    const done = () => {
        btn.textContent = copiedLbl;
        setTimeout(() => { btn.innerHTML = defaultHtml; }, 1800);
    };
    if (navigator.clipboard?.writeText) {
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
// 1. DE 6 FARVEKODEDE MINDMAP-BOKSE (RYGRAD PÅ TVÆRS AF ALLE 8 FANER)
// ============================================================================
const MINDMAP_BOXES = [
    { id: 'sprogskole_by', num: 1, titleKey: 'box_1_title', qKey: 'box_1_q', modelKey: 'box_1_model', color: '#38bdf8', border: 'rgba(56, 189, 248, 0.5)', bg: 'rgba(56, 189, 248, 0.13)' },
    { id: 'dage_tid', num: 2, titleKey: 'box_2_title', qKey: 'box_2_q', modelKey: 'box_2_model', color: '#f59e0b', border: 'rgba(245, 158, 11, 0.5)', bg: 'rgba(245, 158, 11, 0.13)' },
    { id: 'kursister_laerer', num: 3, titleKey: 'box_3_title', qKey: 'box_3_q', modelKey: 'box_3_model', color: '#10b981', border: 'rgba(16, 185, 129, 0.5)', bg: 'rgba(16, 185, 129, 0.13)' },
    { id: 'aktiviteter', num: 4, titleKey: 'box_4_title', qKey: 'box_4_q', modelKey: 'box_4_model', color: '#ec4899', border: 'rgba(236, 72, 153, 0.5)', bg: 'rgba(236, 72, 153, 0.13)' },
    { id: 'pauser', num: 5, titleKey: 'box_5_title', qKey: 'box_5_q', modelKey: 'box_5_model', color: '#a855f7', border: 'rgba(168, 85, 247, 0.5)', bg: 'rgba(168, 85, 247, 0.13)' },
    { id: 'transport', num: 6, titleKey: 'box_6_title', qKey: 'box_6_q', modelKey: 'box_6_model', color: '#22c55e', border: 'rgba(34, 197, 94, 0.5)', bg: 'rgba(34, 197, 94, 0.13)' }
];

const BOX_MAP = Object.fromEntries(MINDMAP_BOXES.map(b => [b.id, b]));

// ============================================================================
// 2. DE 20 MÅLORD (6 MINDMAP-BOKSE) MED PRÆCISE (X, Y) PINS
// ============================================================================
const WORDS = [
    // Boks 1: sprogskole / by
    { num: 1, id: 'sprogskole', word: 'en sprogskole', gender: 'en', forms: 'en sprogskole · sprogskolen · sprogskoler', mindmapBox: 'sprogskole_by', x: 29, y: 78, stikord: 'sprogskole · 3 gange/uge' },
    { num: 2, id: 'by', word: 'en by', gender: 'en', forms: 'en by · byen · byer', mindmapBox: 'sprogskole_by', x: 4, y: 45, stikord: 'stor by · centrum' },
    { num: 3, id: 'klassevaerelse', word: 'et klasseværelse', gender: 'et', forms: 'et klasseværelse · klasseværelset · klasseværelser', mindmapBox: 'sprogskole_by', x: 38, y: 45, stikord: 'lyst klasseværelse' },

    // Boks 2: dage / tid
    { num: 4, id: 'ur', word: 'et ur', gender: 'et', forms: 'et ur · uret · ure', mindmapBox: 'dage_tid', x: 28, y: 7, stikord: 'kl. 9 · undervisning' },
    { num: 5, id: 'morgen', word: 'en morgen', gender: 'en', forms: 'en morgen · morgenen · morgener', mindmapBox: 'dage_tid', x: 14, y: 19, stikord: 'om morgenen · kl. 9' },
    { num: 6, id: 'kalender', word: 'en kalender', gender: 'en', forms: 'en kalender · kalenderen · kalendere', mindmapBox: 'dage_tid', x: 40, y: 18, stikord: 'kalender · prøvedato' },

    // Boks 3: kursister / lærer
    { num: 7, id: 'laerer', word: 'en lærer', gender: 'en', forms: 'en lærer · læreren · lærere', mindmapBox: 'kursister_laerer', x: 35, y: 27, stikord: 'sjov og venlig lærer' },
    { num: 8, id: 'kursist', word: 'en kursist', gender: 'en', forms: 'en kursist · kursisten · kursister', mindmapBox: 'kursister_laerer', x: 52, y: 61, stikord: 'hold med 12 personer' },
    { num: 9, id: 'klassekammerat', word: 'en klassekammerat', gender: 'en', forms: 'en klassekammerat · klassekammeraten · klassekammerater', mindmapBox: 'kursister_laerer', x: 52, y: 33, stikord: 'klassekammerat · dialoger' },
    { num: 10, id: 'gruppe', word: 'en gruppe', gender: 'en', forms: 'en gruppe · gruppen · grupper', mindmapBox: 'kursister_laerer', x: 69, y: 46, stikord: 'lille gruppe · tale dansk' },

    // Boks 4: aktiviteter
    { num: 11, id: 'tavle', word: 'en tavle', gender: 'en', forms: 'en tavle · tavlen · tavler', mindmapBox: 'aktiviteter', x: 25, y: 23, stikord: 'nye ord · tavlen' },
    { num: 12, id: 'telefon', word: 'en telefon', gender: 'en', forms: 'en telefon · telefonen · telefoner', mindmapBox: 'aktiviteter', x: 30, y: 47, stikord: 'nye ord · telefonen' },
    { num: 13, id: 'computer', word: 'en computer', gender: 'en', forms: 'en computer · computeren · computere', mindmapBox: 'aktiviteter', x: 67, y: 51, stikord: 'skrive · computer' },
    { num: 14, id: 'haefte', word: 'et hæfte', gender: 'et', forms: 'et hæfte · hæftet · hæfter', mindmapBox: 'aktiviteter', x: 46, y: 60, stikord: 'hæfte · nye ord' },

    // Boks 5: pauser
    { num: 15, id: 'kaffe', word: 'en kop kaffe', gender: 'en', forms: 'kaffe · en kop kaffe', mindmapBox: 'pauser', x: 84, y: 28, stikord: 'kaffe · klassekammerater' },
    { num: 16, id: 'pause', word: 'en pause', gender: 'en', forms: 'en pause · pausen · pauser', mindmapBox: 'pauser', x: 76, y: 24, stikord: '15 min. pause · formiddag' },

    // Boks 6: transport til sprogskolen
    { num: 17, id: 'cykel', word: 'en cykel', gender: 'en', forms: 'en cykel · cyklen · cykler', mindmapBox: 'transport', x: 77, y: 89, stikord: 'cykel · til sprogskolen' },
    { num: 18, id: 'bus', word: 'en bus', gender: 'en', forms: 'en bus · bussen · busser', mindmapBox: 'transport', x: 94, y: 80, stikord: 'bus · om vinteren' },
    { num: 19, id: 'tog', word: 'et tog', gender: 'et', forms: 'et tog · toget · tog', mindmapBox: 'transport', x: 96, y: 41, stikord: 'tog · fra nabobyen' },
    { num: 20, id: 'bil', word: 'en bil', gender: 'en', forms: 'en bil · bilen · biler', mindmapBox: 'transport', x: 7, y: 88, stikord: 'bil · til sprogskolen' }
];

// ============================================================================
// 3. DETEKTIV-MISSIONER (FANE 2)
// ============================================================================
const DETECTIVE_MISSIONS = [
    { wordId: 'sprogskole', box: 'sprogskole_by', prompt: 'Find indgangen til den bygning, hvor voksne lærer dansk.', hint: 'Kig nederst til venstre ved hoveddøren.' },
    { wordId: 'ur', box: 'dage_tid', prompt: 'Find det runde ur, der viser hvad klokken er.', hint: 'Hænger helt oppe over tavlen.' },
    { wordId: 'kalender', box: 'dage_tid', prompt: 'Find den lille grønne kalender på væggen ved siden af tavlen.', hint: 'Hænger lige til højre for den grønne tavle.' },
    { wordId: 'laerer', box: 'kursister_laerer', prompt: 'Find den sjove og venlige lærer, der står ved tavlen.', hint: 'Hun står til venstre i klasseværelset.' },
    { wordId: 'gruppe', box: 'kursister_laerer', prompt: 'Find de fire kursister, der sidder sammen om ét bord.', hint: 'Kig i midten til højre.' },
    { wordId: 'telefon', box: 'aktiviteter', prompt: 'Find telefonen på bordet, hvor man kan lære nye ord.', hint: 'Ligger på det lille bord forrest til venstre under tavlen.' },
    { wordId: 'computer', box: 'aktiviteter', prompt: 'Find den bærbare computer på gruppebordet.', hint: 'Den står åben på bordet hos de fire kursister.' },
    { wordId: 'kaffe', box: 'pauser', prompt: 'Find den dampende kop kaffe på pausebordet.', hint: 'Står på bordet øverst til højre.' },
    { wordId: 'pause', box: 'pauser', prompt: 'Find de tre kursister, der hygger sig sammen i pausen.', hint: 'Kig øverst til højre i rummet.' },
    { wordId: 'cykel', box: 'transport', prompt: 'Find cyklen på den grønne cykelsti foran skolen.', hint: 'Kig nederst på vejen.' },
    { wordId: 'bus', box: 'transport', prompt: 'Find den gule bybus, der kører forbi stoppestedet.', hint: 'Kig helt nederst til højre.' },
    { wordId: 'tog', box: 'transport', prompt: 'Find toget, der kører på skinner i baggrunden.', hint: 'Kig til højre uden for bygningen.' }
];

// ============================================================================
// 4. FANE 3: PRÆPOSITIONER I SKOLEHVERDAGEN (3 TRIN: A, B, C)
// ============================================================================
const GRAMMAR_DUEL = [
    { q: 'Jeg går ___ sprogskole tre gange om ugen.', opts: ['på', 'i'], ans: 'på', exp: 'På dansk siger man altid "gå på sprogskole".' },
    { q: 'Jeg tager ___ bus, når det regner.', opts: ['med', 'på'], ans: 'med', exp: 'Man kører "med bus" eller "med tog".' },
    { q: 'Vi drikker kaffe ___ pausen.', opts: ['i', 'på'], ans: 'i', exp: 'Om et tidsrum man er inde i: "i pausen".' },
    { q: 'Jeg kører ___ cykel til skolen.', opts: ['på', 'med'], ans: 'på', exp: 'Man sidder ovenpå cyklen: "på cykel".' },
    { q: 'Jeg går i skole ___ mandagen og onsdagen.', opts: ['om', 'i'], ans: 'om', exp: 'Ved faste ugedage bruger dansk "om mandagen".' },
    { q: 'Vores hold sidder ___ et lyst klasseværelse.', opts: ['i', 'på'], ans: 'i', exp: 'Et rum der omslutter os: "i et klasseværelse".' }
];

const GRAMMAR_REWRITE = [
    { base: 'sprogskole (gå ___ sprogskole)', opts: ['på', 'i', 'om'], ans: 'på', exp: '"gå på sprogskole".' },
    { base: 'morgenen (___ morgenen kl. 9)', opts: ['om', 'i', 'på'], ans: 'om', exp: 'Tid på dagen som vane: "om morgenen".' },
    { base: 'fods (gå ___ fods)', opts: ['til', 'med', 'på'], ans: 'til', exp: 'Fast udtryk: "gå til fods".' },
    { base: 'gruppe (tale ___ en lille gruppe)', opts: ['i', 'på', 'til'], ans: 'i', exp: 'Inde i fællesskabet: "i en lille gruppe".' },
    { base: 'computer (skrive ___ computer)', opts: ['på', 'i', 'med'], ans: 'på', exp: 'Skærm/flade: "skrive på computer".' }
];

const GRAMMAR_CONTEXT = [
    { before: 'Jeg går ', after: ' sprogskole tre gange om ugen.', opts: ['på', 'i', 'om'], ans: 'på', exp: 'Altid "på sprogskole".' },
    { before: 'Undervisningen starter kl. 9 ', after: ' morgenen.', opts: ['om', 'på', 'til'], ans: 'om', exp: 'Vane om morgenen: "om morgenen".' },
    { before: 'Vi lærer nye ord ', after: ' telefonen.', opts: ['på', 'i', 'om'], ans: 'på', exp: 'Skærm/app: "på telefonen".' },
    { before: 'Om vinteren tager jeg ', after: ' bus til skolen.', opts: ['med', 'på', 'i'], ans: 'med', exp: 'Offentlig transport: "med bus".' },
    { before: 'Læreren skriver de nye ord ', after: ' tavlen.', opts: ['på', 'i', 'om'], ans: 'på', exp: 'Flade: "på tavlen".' }
];

// ============================================================================
// 5. FANE 4: BYG SÆTNINGER (PUSLEOPGAVER + TRIN-FOR-TRIN)
// ============================================================================
const PUZZLES = [
    { target: ['Jeg', 'går', 'på sprogskole', 'tre gange om ugen'], pool: ['tre gange om ugen', 'går', 'Jeg', 'på sprogskole'] },
    { target: ['Undervisningen', 'starter', 'klokken ni', 'om morgenen'], pool: ['om morgenen', 'Undervisningen', 'klokken ni', 'starter'] },
    { target: ['Vores lærer', 'er', 'sjov og venlig', 'i klassen'], pool: ['i klassen', 'Vores lærer', 'sjov og venlig', 'er'] },
    { target: ['Vi', 'lærer', 'nye ord', 'på telefonen'], pool: ['på telefonen', 'Vi', 'nye ord', 'lærer'] },
    { target: ['Jeg', 'drikker', 'en kop kaffe', 'med mine klassekammerater'], pool: ['med mine klassekammerater', 'en kop kaffe', 'Jeg', 'drikker'] },
    { target: ['Jeg', 'kører', 'på cykel', 'til sprogskolen'], pool: ['til sprogskolen', 'kører', 'Jeg', 'på cykel'] }
];

const STEP_BUILDER = {
    s1: ['Jeg', 'Vi', 'Vores lærer', 'Min klassekammerat'],
    s2: ['går', 'lærer', 'skriver', 'drikker', 'taler', 'kører'],
    s3: ['på sprogskole', 'nye ord', 'en kop kaffe', 'dansk', 'på cykel', 'en tekst'],
    s4: ['på telefonen', 'i pausen', 'på tavlen', 'i en lille gruppe', 'til sprogskolen', 'om morgenen']
};

// ============================================================================
// 6. FANE 5: SKRIVEHJÆLP — 6 MINDMAP-SCENARIER (MED ORDSTILLING-FARVEKODER)
// ============================================================================
const SKRIVE_SCENARIOS = {
    sprogskole_by: {
        id: 'sprogskole_by',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Jeg', 'Min sprogskole', 'Vores klasseværelse'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['I en stor by', 'Tæt på centrum', 'På skolen'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['Nu', 'I dag', 'Siden august'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Derfor', 'Desuden', 'Heldigvis'] },
            at_clause: { labelKey: 'cat_at_mening', mode: 'at_clause', options: ['Jeg er glad for, at', 'Jeg synes, at'] }
        },
        verbs: ['går', 'ligger', 'er', 'har'],
        atSubjects: ['min sprogskole', 'jeg', 'vores klasseværelse'],
        atVerbs: ['ligger', 'er', 'har'],
        invertedSubjects: ['jeg', 'min sprogskole', 'vi'],
        objects: ['på sprogskole tre gange om ugen', 'i en stor by', 'lyst og pænt', 'tæt på centrum'],
        extConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi det er tæt på min bolig', text: ', fordi det er tæt på min bolig' },
            { label: ', og der er en god stemning', text: ', og der er en god stemning' }
        ],
        extRel: [
            { label: ', som ligger tæt på stationen', text: ', som ligger tæt på stationen' },
            { label: ', der er meget lyst og pænt', text: ', der er meget lyst og pænt' }
        ]
    },
    dage_tid: {
        id: 'dage_tid',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Jeg', 'Vi', 'Undervisningen'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['Om morgenen', 'Mandag og onsdag', 'Tre gange om ugen', 'Klokken ni'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['På sprogskolen', 'På mit hold'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Derfor', 'Derefter', 'Bagefter'] },
            at_clause: { labelKey: 'cat_at_mening', mode: 'at_clause', options: ['Jeg synes, at', 'Det er godt, at'] }
        },
        verbs: ['går', 'har', 'starter', 'møder', 'skriver'],
        atSubjects: ['vi', 'jeg', 'undervisningen'],
        atVerbs: ['starter', 'passer godt', 'har tid'],
        invertedSubjects: ['jeg', 'vi', 'undervisningen'],
        objects: ['på skolen klokken ni', 'klokken ni om morgenen', 'prøvedatoen i min kalender', 'undervisning tre dage om ugen'],
        extConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', så jeg har tid til lektier', text: ', så jeg har tid til lektier' },
            { label: ', men om aftenen læser jeg hjemme', text: ', men om aftenen læser jeg hjemme' }
        ],
        extRel: [
            { label: ', som passer godt til min hverdag', text: ', som passer godt til min hverdag' },
            { label: ', der giver mig en god rytme', text: ', der giver mig en god rytme' }
        ]
    },
    kursister_laerer: {
        id: 'kursister_laerer',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Vores lærer', 'Jeg', 'Vi', 'Mine klassekammerater'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['På mit hold', 'I klassen', 'I en lille gruppe'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Desuden', 'Derfor', 'Heldigvis'] },
            at_clause: { labelKey: 'cat_at_mening', mode: 'at_clause', options: ['Jeg er glad for, at', 'Jeg synes, at'] }
        },
        verbs: ['er', 'øver', 'taler', 'hjælper', 'kommer'],
        atSubjects: ['vores lærer', 'vi', 'kursisterne'],
        atVerbs: ['er sjov og venlig', 'hjælper hinanden', 'taler dansk'],
        invertedSubjects: ['vi', 'jeg', 'kursisterne'],
        objects: ['sjov og venlig', 'kursist på et hold med tolv personer', 'dialoger med min klassekammerat', 'dansk i en lille gruppe'],
        extConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi alle hjælper hinanden', text: ', fordi alle hjælper hinanden' },
            { label: ', og vi griner meget sammen', text: ', og vi griner meget sammen' }
        ],
        extRel: [
            { label: ', som er sjov og venlig', text: ', som er sjov og venlig' },
            { label: ', der kommer fra hele verden', text: ', der kommer fra hele verden' }
        ]
    },
    aktiviteter: {
        id: 'aktiviteter',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Vi', 'Jeg', 'Læreren'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['I undervisningen', 'Hver dag', 'Først', 'Bagefter'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['På tavlen', 'På telefonen', 'I en lille gruppe'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Desuden', 'Derefter', 'Også'] },
            at_clause: { labelKey: 'cat_at_mening', mode: 'at_clause', options: ['Jeg synes, at', 'Jeg kan godt lide, at'] }
        },
        verbs: ['lærer', 'skriver', 'taler', 'øver', 'laver'],
        atSubjects: ['vi', 'jeg'],
        atVerbs: ['lærer nye ord', 'taler dansk', 'øver udtale'],
        invertedSubjects: ['vi', 'jeg', 'læreren'],
        objects: ['nye ord på telefonen', 'de nye ord på tavlen', 'en tekst på min computer', 'nye danske ord i mit hæfte', 'dialoger med min klassekammerat'],
        extConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi jeg lærer meget af at tale', text: ', fordi jeg lærer meget af at tale' },
            { label: ', og vi øver udtale sammen', text: ', og vi øver udtale sammen' }
        ],
        extRel: [
            { label: ', som handler om hverdagen i Danmark', text: ', som handler om hverdagen i Danmark' },
            { label: ', der gør mig mere sikker', text: ', der gør mig mere sikker' }
        ]
    },
    pauser: {
        id: 'pauser',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Jeg', 'Vi', 'Mine klassekammerater og jeg'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['I pausen', 'Midt på formiddagen', 'Klokken halv elleve'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['På skolen', 'Udenfor', 'Ved bordet'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Derfor', 'Bagefter', 'Samtidig'] },
            at_clause: { labelKey: 'cat_at_mening', mode: 'at_clause', options: ['Jeg synes, at', 'Det er hyggeligt, at'] }
        },
        verbs: ['drikker', 'har', 'snakker', 'sidder'],
        atSubjects: ['vi', 'jeg'],
        atVerbs: ['kan slappe af', 'snakker dansk', 'hygger os'],
        invertedSubjects: ['jeg', 'vi'],
        objects: ['en kop kaffe med mine klassekammerater', 'femten minutters pause midt på formiddagen', 'en kop te i pausen', 'med mine venner'],
        extConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi vi trænger til frisk energi', text: ', fordi vi trænger til frisk energi' },
            { label: ', og vi øver dansk samtidig', text: ', og vi øver dansk samtidig' }
        ],
        extRel: [
            { label: ', som altid er meget hyggelig', text: ', som altid er meget hyggelig' },
            { label: ', der giver ny energi til resten af timen', text: ', der giver ny energi til resten af timen' }
        ]
    },
    transport: {
        id: 'transport',
        starts: {
            person: { labelKey: 'cat_person', mode: 'normal', options: ['Jeg', 'Min klassekammerat', 'Nogle kursister', 'Det'] },
            tid: { labelKey: 'cat_tid', mode: 'inversion', options: ['Om morgenen', 'Om vinteren', 'Når det regner', 'Hver dag'] },
            sted: { labelKey: 'cat_sted', mode: 'inversion', options: ['På cykelstien', 'Fra nabobyen'] },
            sammenhaeng: { labelKey: 'cat_sammenhaeng', mode: 'inversion', options: ['Derfor', 'Heldigvis', 'Men'] },
            at_clause: { labelKey: 'cat_at_mening', mode: 'at_clause', options: ['Jeg er glad for, at', 'Jeg synes, at'] }
        },
        verbs: ['kører', 'tager', 'cykler', 'går'],
        atSubjects: ['det', 'jeg', 'bussen'],
        atVerbs: ['er hurtigt', 'kan cykle', 'stopper tæt på'],
        invertedSubjects: ['jeg', 'min klassekammerat', 'det'],
        objects: ['på cykel til sprogskolen', 'med bus til skolen', 'toget fra nabobyen', 'i bil til sprogskolen', 'kun femten minutter'],
        extConj: [
            { label: 'Ingen udvidelse', text: '' },
            { label: ', fordi det giver frisk luft', text: ', fordi det giver frisk luft' },
            { label: ', men om vinteren tager jeg med bus', text: ', men om vinteren tager jeg med bus' }
        ],
        extRel: [
            { label: ', som stopper lige foran skolen', text: ', som stopper lige foran skolen' },
            { label: ', der kun tager femten minutter', text: ', der kun tager femten minutter' }
        ]
    }
};

const STOP_WORDS = new Set(['jeg', 'vi', 'du', 'han', 'hun', 'de', 'det', 'den', 'der', 'som', 'og', 'men', 'fordi', 'så', 'at', 'er', 'var', 'har', 'kan', 'vil', 'en', 'et', 'i', 'på', 'til', 'fra', 'med', 'om', 'min', 'mit', 'mine', 'vores', 'sig', 'også', 'meget', 'lidt', 'godt', 'her']);

function extractKeywordsFromSentences(list) {
    const words = [];
    list.forEach(s => {
        s.replace(/[.,!?;:]/g, '').split(/\s+/).forEach(w => {
            const clean = w.trim();
            if (clean.length >= 3 && !STOP_WORDS.has(clean.toLowerCase()) && !words.some(x => x.toLowerCase() === clean.toLowerCase())) {
                words.push(clean);
            }
        });
    });
    return words.slice(0, 4).join(' · ');
}

const STIKORD_QUIZ = [
    {
        q: 'Hvad er bedst at skrive i boksen "sprogskole / by" på dit mindmap?',
        opts: ['Odense · centrum · lyst klasseværelse', 'Jeg går på sprogskole i Odense, og den ligger tæt på centrum.'],
        ans: 'Odense · centrum · lyst klasseværelse',
        exp: 'Korte stikord hjælper dig med at tale frit i stedet for at læse op.'
    },
    {
        q: 'Hvad er et godt stikord til boksen "transport til sprogskolen"?',
        opts: ['cykel 15 min. · bus i regnvejr', 'Jeg cykler til sprogskolen på 15 minutter, men når det regner tager jeg bussen.'],
        ans: 'cykel 15 min. · bus i regnvejr',
        exp: '2–4 korte stikord er nok til at huske hele din fortælling.'
    }
];

const DEL2_QUESTIONS = [
    {
        examinerQ: 'Hvor går du på sprogskole?',
        options: [
            { text: 'Jeg går på sprogskole i Odense tre dage om ugen.', correct: true },
            { text: 'Jeg køber på sprogskole i Odense tre dage om ugen.', correct: false },
            { text: 'Jeg sover på sprogskole i Odense tre dage om ugen.', correct: false }
        ],
        tip: 'På dansk bruger vi verbet "går" sammen med skole: "Jeg går på sprogskole".'
    },
    {
        examinerQ: 'Hvornår starter undervisningen?',
        options: [
            { text: 'Undervisningen starter kl. 9 på morgenen.', correct: false },
            { text: 'Undervisningen starter kl. 9 om morgenen.', correct: true },
            { text: 'Undervisningen starter kl. 9 i morgenen.', correct: false }
        ],
        tip: 'Om faste tidspunkter på dagen bruger dansk "om": "om morgenen", "om aftenen".'
    },
    {
        examinerQ: 'Hvad laver I sammen i en lille gruppe?',
        options: [
            { text: 'Vi taler dansk sammen i en lille gruppe.', correct: true },
            { text: 'Vi sover dansk sammen i en lille gruppe.', correct: false },
            { text: 'Vi betaler dansk sammen i en lille gruppe.', correct: false }
        ],
        tip: 'Om sprog bruger vi verbet "taler": "Vi taler dansk sammen".'
    },
    {
        examinerQ: 'Hvad laver du med dit hæfte i undervisningen?',
        options: [
            { text: 'Jeg drikker nye danske ord i mit hæfte.', correct: false },
            { text: 'Jeg skriver nye danske ord i mit hæfte.', correct: true },
            { text: 'Jeg cykler nye danske ord i mit hæfte.', correct: false }
        ],
        tip: 'I et hæfte "skriver" man nye ord og noter.'
    },
    {
        examinerQ: 'Hvad drikker du i pausen?',
        options: [
            { text: 'I pausen spiser jeg te.', correct: false },
            { text: 'I pausen kører jeg te.', correct: false },
            { text: 'I pausen drikker jeg te.', correct: true }
        ],
        tip: 'Til te, kaffe og vand bruger vi verbet "drikker" — ikke "spiser".'
    },
    {
        examinerQ: 'Hvem drikker du kaffe med i pausen?',
        options: [
            { text: 'Jeg drikker en kop kaffe med dine venner.', correct: false },
            { text: 'Jeg drikker en kop kaffe med mine venner.', correct: true },
            { text: 'Jeg drikker en kop kaffe med hans venner.', correct: false }
        ],
        tip: 'Når "Jeg" er personen, passer ejestedordet "mine" til flertal ("mine venner").'
    },
    {
        examinerQ: 'Hvordan kommer du til sprogskolen?',
        options: [
            { text: 'Jeg cykler i sprogskole.', correct: false },
            { text: 'Jeg cykler på sprogskole.', correct: false },
            { text: 'Jeg cykler til sprogskole.', correct: true }
        ],
        tip: 'Når man bevæger sig hen mod et sted, bruger vi "til": "Jeg cykler til sprogskole".'
    },
    {
        examinerQ: 'Hvor lang tid tager det?',
        options: [
            { text: 'Det tager 15 min.', correct: true },
            { text: 'Det siger 15 min.', correct: false },
            { text: 'Det spiser 15 min.', correct: false }
        ],
        tip: 'Om varighed af en tur bruger dansk altid verbet "tager": "Det tager 15 min.".'
    },
    {
        examinerQ: 'Hvad vil du gerne lave, når du er færdig med sprogskolen?',
        options: [
            { text: 'Jeg vil gerne glemme et godt arbejde i Danmark.', correct: false },
            { text: 'Jeg vil gerne lukke et godt arbejde i Danmark.', correct: false },
            { text: 'Jeg vil gerne finde et godt arbejde i Danmark.', correct: true }
        ],
        tip: 'Efter sprogskolen vil mange "finde et godt arbejde" eller tage en uddannelse.'
    }
];

const AI_EXAM_PROMPT = `Du er en venlig og tålmodig dansk-eksaminator til mundtlig prøve (A1/A2 — DU1/DU2).
Emnet er "Min sprogskole" med de 6 punkter: 1) sprogskole / by, 2) dage / tid, 3) kursister / lærer, 4) aktiviteter, 5) pauser, 6) transport til sprogskolen.

Start med at byde mig velkommen på enkelt dansk og bed mig fortælle om min sprogskole (Del 1).
Når jeg har fortalt om min sprogskole, skal du stille 4–5 korte, venlige opfølgende spørgsmål ét ad gangen (Del 2) — fx om hvad der er lettest/sværest, hvordan jeg øver dansk hjemme, og hvad mine planer er bagefter.
Brug korte, klare A1/A2-sætninger og giv kun blide sprogtips helt til sidst.`;

function injectStyles() {
    if (document.getElementById('min-sprogskole-styles')) return;
    const style = document.createElement('style');
    style.id = 'min-sprogskole-styles';
    style.textContent = `
        .ms-view {
            max-width: 1080px;
            width: 100%;
            margin: 0 auto;
            padding: 0.75rem 1rem 4.5rem;
            color: #f1f5f9;
            box-sizing: border-box;
            overflow-x: hidden;
        }
        .ms-view *, .ms-view *::before, .ms-view *::after { box-sizing: border-box; }
        .ms-hero { text-align: center; margin: 0.5rem 0 1.4rem; }
        .ms-badge {
            display: inline-flex; align-items: center; gap: 0.45rem;
            background: rgba(20, 184, 166, 0.15); border: 1px solid rgba(45, 212, 191, 0.45);
            color: #5eead4; padding: 0.3rem 0.85rem; border-radius: 999px;
            font-size: 0.8rem; font-weight: 800; margin-bottom: 0.55rem;
        }
        .ms-hero h1 { margin: 0 0 0.4rem; font-size: clamp(1.65rem, 3.4vw, 2.25rem); font-weight: 800; color: #f8fafc; }
        .ms-hero p { margin: 0 auto; max-width: 760px; color: #94a3b8; font-size: 0.96rem; line-height: 1.55; }
        .ms-sub-tr { display: block; font-size: 0.82rem; color: #94a3b8; font-weight: 500; margin-top: 0.22rem; line-height: 1.4; }
        .ms-tabs {
            display: flex; flex-wrap: wrap; gap: 0.35rem; justify-content: center;
            background: #101419; border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 14px; padding: 5px; margin-bottom: 1.35rem;
        }
        .ms-tab {
            background: transparent; border: none; color: #94a3b8;
            padding: 0.52rem 0.82rem; border-radius: 9px; font-size: 0.82rem; font-weight: 700;
            cursor: pointer; transition: all 0.15s ease;
        }
        .ms-tab:hover { color: #f8fafc; }
        .ms-tab.active { background: #e2e8f0; color: #0f172a; }
        .ms-card {
            background: #151a21; border: 1px solid rgba(203, 213, 225, 0.13);
            border-radius: 16px; padding: 1.2rem 1.3rem; margin-bottom: 1.15rem;
        }
        .ms-card h2 { margin: 0 0 0.35rem; font-size: 1.08rem; font-weight: 800; color: #f8fafc; }
        .ms-filter-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.9rem; }
        .ms-pill {
            background: #1a212b; border: 1px solid rgba(203, 213, 225, 0.18);
            color: #cbd5e1; padding: 0.38rem 0.78rem; border-radius: 999px;
            font-size: 0.8rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem;
        }
        .ms-pill:hover { border-color: rgba(203, 213, 225, 0.42); color: #ffffff; }
        .ms-pill.active { background: #2b6e78; border-color: #4c9ba6; color: #ffffff; }
        .ms-stage-wrap {
            position: relative; width: 100%; border-radius: 14px; overflow: hidden;
            border: 1px solid rgba(203, 213, 225, 0.18); background: #0b1017;
        }
        .ms-stage-img { width: 100%; height: auto; display: block; }
        .ms-pins-layer { position: absolute; inset: 0; pointer-events: none; }
        .ms-pin {
            position: absolute; transform: translate(-50%, -50%); pointer-events: auto;
            width: 26px; height: 26px; border-radius: 999px; border: 2px solid #ffffff;
            color: #0f172a; font-size: 0.76rem; font-weight: 900; cursor: pointer;
            display: inline-flex; align-items: center; justify-content: center;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.55); transition: transform 0.15s ease;
        }
        .ms-pin:hover, .ms-pin.selected { transform: translate(-50%, -50%) scale(1.22); z-index: 5; }
        .ms-pin.selected { box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.7), 0 4px 14px rgba(0,0,0,0.6); }
        .ms-detail-box {
            margin-top: 1rem; background: #101419; border: 1px solid rgba(203, 213, 225, 0.16);
            border-radius: 14px; padding: 1.05rem 1.15rem;
        }
        .ms-btn-primary {
            background: #2b6e78; border: 1px solid #3d8b96; color: #ffffff;
            padding: 0.5rem 1rem; border-radius: 10px; font-size: 0.85rem; font-weight: 700;
            cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem;
        }
        .ms-btn-primary:hover { background: #35838f; }
        .ms-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }
        .ms-btn-ghost {
            background: transparent; border: 1px solid rgba(203, 213, 225, 0.22); color: #cbd5e1;
            padding: 0.46rem 0.85rem; border-radius: 9px; font-size: 0.82rem; font-weight: 600;
            cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem;
        }
        .ms-btn-ghost:hover { border-color: rgba(203, 213, 225, 0.45); color: #ffffff; }
        .ms-mm-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 0.9rem; }
        .ms-mm-box {
            background: #101419; border: 1.5px solid rgba(203, 213, 225, 0.16);
            border-radius: 14px; padding: 0.95rem 1rem; display: flex; flex-direction: column; gap: 0.55rem;
        }
        .ms-input {
            background: #151a21; border: 1px solid rgba(203, 213, 225, 0.22); color: #f8fafc;
            padding: 0.45rem 0.75rem; border-radius: 9px; font-size: 0.88rem; width: 100%;
        }
        .ms-input:focus { outline: none; border-color: #4c9ba6; }
        .ms-chip {
            background: #1a212b; border: 1px solid rgba(203, 213, 225, 0.18); color: #cbd5e1;
            padding: 0.38rem 0.72rem; border-radius: 8px; font-size: 0.83rem; font-weight: 600; cursor: pointer;
        }
        .ms-chip:hover { border-color: rgba(203, 213, 225, 0.45); color: #ffffff; }
        .ms-chip.active { background: #e2e8f0; border-color: #e2e8f0; color: #0f172a; font-weight: 700; }
        .ms-chip.petrol { background: rgba(43, 110, 120, 0.32); border-color: #4c9ba6; color: #e2f5f7; font-weight: 700; }
        .ms-opt-btn {
            width: 100%; text-align: left; background: #101419; border: 1.5px solid rgba(203, 213, 225, 0.18);
            color: #f8fafc; padding: 0.75rem 0.95rem; border-radius: 11px; font-size: 0.92rem; font-weight: 700; cursor: pointer;
        }
        .ms-opt-btn.correct { border-color: #22c55e; background: rgba(34, 197, 94, 0.18); }
        .ms-opt-btn.wrong { border-color: #ef4444; background: rgba(239, 68, 68, 0.18); }
        .ms-slot-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 0.85rem; }
        .ms-slot {
            min-height: 58px; background: #101419; border: 1.5px dashed rgba(203, 213, 225, 0.25);
            border-radius: 11px; padding: 0.45rem 0.55rem; display: flex; flex-direction: column; justify-content: center;
            cursor: pointer; text-align: center;
        }
        .ms-ud-ring {
            width: 56px; height: 56px; border-radius: 999px; display: flex; align-items: center; justify-content: center;
            font-weight: 900; font-size: 0.85rem; color: #ffffff; flex-shrink: 0;
        }
        .ms-word-chip { padding: 0.25rem 0.55rem; border-radius: 7px; font-size: 0.82rem; font-weight: 700; border: 1px solid transparent; }
        @media (max-width: 640px) {
            .ms-view { padding: 0.55rem 0.65rem 3.5rem; }
            .ms-card { padding: 0.95rem 0.85rem; }
            .ms-slot-grid { grid-template-columns: repeat(2, 1fr); }
            .ms-input { font-size: 16px; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================================
// HOVEDKOMPONENT: MIN SPROGSKOLE (8 FANER · 6 MINDMAP-BOKSE · 18 SPROG + RTL)
// ============================================================================
export function renderMinSprogskoleView(container, navigateFn) {
    injectStyles();
    ensureOrdstillingColorStyles();
    container.innerHTML = '';

    const SKRIVE_KEY = 'lingcog_min_sprogskole_skrive_v1';
    const MINDMAP_KEY = 'lingcog_min_sprogskole_mm_v1';
    const UDTALE_KEY = 'lingcog_min_sprogskole_udtale_v1';

    let activeTab = 'tab1';

    // Fane 1 state
    let activeFilter = 'all';
    let selectedWordId = WORDS[0].id;
    let sortIdx = 0;
    let sortScore = 0;
    let sortFeedback = null;

    // Fane 2 Detektiv state
    let detIdx = 0;
    let detScore = 0;
    let detShowHint = false;
    let detFeedback = null;

    // Fane 3 Grammatik state
    let gramSub = 'a';
    let gramState = {
        a: { idx: 0, score: 0, picked: null },
        b: { idx: 0, score: 0, picked: null },
        c: { idx: 0, score: 0, picked: null }
    };

    // Fane 4 Byg sætninger state
    let puzIdx = 0;
    let puzPlaced = [];
    let puzStatus = null;
    let sb = { s1: STEP_BUILDER.s1[0], s2: STEP_BUILDER.s2[0], s3: STEP_BUILDER.s3[0], s4: STEP_BUILDER.s4[0] };

    // Fane 5 Skrivehjælp state
    let activeBoxId = MINDMAP_BOXES[0].id;
    let colorCodesEnabled = getColorCodesEnabled();
    let skriveByBox = {};
    try { skriveByBox = JSON.parse(localStorage.getItem(SKRIVE_KEY) || '{}') || {}; } catch { skriveByBox = {}; }
    MINDMAP_BOXES.forEach(b => { if (!Array.isArray(skriveByBox[b.id])) skriveByBox[b.id] = []; });

    let startCategory = 'person';
    let extTab = 'conj';
    let draft = {};
    function resetDraft(boxId, prefCat) {
        const sc = SKRIVE_SCENARIOS[boxId];
        const cat = (prefCat && sc.starts[prefCat]) ? prefCat : 'person';
        startCategory = cat;
        extTab = 'conj';
        draft = {
            start: sc.starts[cat].options[0],
            verb: sc.verbs[0],
            invSubj: sc.invertedSubjects[0],
            atSubj: sc.atSubjects[0],
            atVerb: sc.atVerbs[0],
            object: sc.objects[0],
            skipStep3: false,
            ext: ''
        };
    }
    resetDraft(activeBoxId);

    function saveSkrive() {
        try { localStorage.setItem(SKRIVE_KEY, JSON.stringify(skriveByBox)); } catch {}
    }

    function buildDraftSentence() {
        const sc = SKRIVE_SCENARIOS[activeBoxId];
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

    // Fane 6 Mindmap state
    let mindmapNotes = {};
    try { mindmapNotes = JSON.parse(localStorage.getItem(MINDMAP_KEY) || '{}') || {}; } catch { mindmapNotes = {}; }
    let examHideSentences = false;
    let stikQuizIdx = 0;
    let stikQuizPicked = null;

    function saveMindmap() {
        try { localStorage.setItem(MINDMAP_KEY, JSON.stringify(mindmapNotes)); } catch {}
    }

    // Fane 7 Udtale state
    let udtaleItems = [];
    try { udtaleItems = JSON.parse(localStorage.getItem(UDTALE_KEY) || '[]') || []; } catch { udtaleItems = []; }
    if (!Array.isArray(udtaleItems)) udtaleItems = [];
    let listeningIdx = null;
    let udtaleResults = {};
    let udtaleErr = {};
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRec ? new SpeechRec() : null;
    if (recognition) {
        recognition.lang = 'da-DK';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
    }
    function saveUdtale() {
        try { localStorage.setItem(UDTALE_KEY, JSON.stringify(udtaleItems)); } catch {}
    }
    function importFromSkriveToUdtale() {
        const imported = [];
        MINDMAP_BOXES.forEach(b => {
            (skriveByBox[b.id] || []).forEach(txt => {
                if (txt.trim()) imported.push({ boxId: b.id, text: txt.trim() });
            });
        });
        if (imported.length > 0) {
            udtaleItems = imported;
            udtaleResults = {};
            saveUdtale();
        }
    }

    // Fane 8 Del 2 state (12 verb-kontrast spørgsmål + AI-eksaminator)
    let del2Mode = 'quiz';
    let del2Idx = 0;
    let del2Ans = null;
    const del2Solved = new Set();

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container ms-view';

    function render() {
        viewContainer.innerHTML = '';
        const lang = getLang() || 'da';
        const rtlAttr = isMsRtl(lang) ? ' dir="rtl"' : '';

        // Top bar
        const topBar = document.createElement('div');
        topBar.className = 'top-bar';
        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn';
        backBtn.textContent = '← ' + msT('back_to_hub', lang);
        backBtn.onclick = () => {
            window.speechSynthesis?.cancel();
            navigateFn('mit_hverdagsliv');
        };
        topBar.appendChild(backBtn);
        viewContainer.appendChild(topBar);

        // Hero
        const hero = document.createElement('div');
        hero.className = 'ms-hero';
        hero.innerHTML = `
            <div class="ms-badge"${rtlAttr}>${escapeHtml(msT('page_badge', lang))}</div>
            <h1${rtlAttr}>${escapeHtml(msT('page_title', lang))}</h1>
            <p${rtlAttr}>${escapeHtml(msT('page_subtitle', lang))}</p>
        `;
        viewContainer.appendChild(hero);

        // 8-tab nav
        const tabs = document.createElement('div');
        tabs.className = 'ms-tabs';
        const tabIds = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6', 'tab7', 'tab8'];
        tabs.innerHTML = tabIds.map((id, i) => `
            <button type="button" class="ms-tab ${activeTab === id ? 'active' : ''}" data-mstab="${id}"${rtlAttr}>
                ${escapeHtml(msT('tab_' + (i + 1), lang))}
            </button>
        `).join('');
        tabs.querySelectorAll('[data-mstab]').forEach(btn => {
            btn.onclick = () => { activeTab = btn.dataset.mstab; render(); };
        });
        viewContainer.appendChild(tabs);

        if (activeTab === 'tab1') renderTab1(lang, rtlAttr);
        else if (activeTab === 'tab2') renderTab2(lang, rtlAttr);
        else if (activeTab === 'tab3') renderTab3(lang, rtlAttr);
        else if (activeTab === 'tab4') renderTab4(lang, rtlAttr);
        else if (activeTab === 'tab5') renderTab5(lang, rtlAttr);
        else if (activeTab === 'tab6') renderTab6(lang, rtlAttr);
        else if (activeTab === 'tab7') renderTab7(lang, rtlAttr);
        else renderTab8(lang, rtlAttr);
    }

    // ========================================================================
    // FANE 1: VRIMLEBILLEDE (24) & MINDMAP-SORTERING
    // ========================================================================
    function renderTab1(lang, rtlAttr) {
        const card = document.createElement('div');
        card.className = 'ms-card';

        const filterRow = document.createElement('div');
        filterRow.className = 'ms-filter-row';
        filterRow.innerHTML = `
            <button type="button" class="ms-pill ${activeFilter === 'all' ? 'active' : ''}" data-filt="all">${escapeHtml(msT('f1_all', lang))}</button>
            ${MINDMAP_BOXES.map(b => `
                <button type="button" class="ms-pill ${activeFilter === b.id ? 'active' : ''}" data-filt="${b.id}" style="border-color:${activeFilter === b.id ? b.color : 'rgba(203,213,225,0.18)'};">
                    <span style="width:9px; height:9px; border-radius:999px; background:${b.color}; display:inline-block;"></span>
                    <span>${b.num}. ${escapeHtml(msT(b.titleKey, lang))}</span>
                </button>
            `).join('')}
        `;
        filterRow.querySelectorAll('[data-filt]').forEach(btn => {
            btn.onclick = () => { activeFilter = btn.dataset.filt; render(); };
        });
        card.appendChild(filterRow);

        const stageWrap = document.createElement('div');
        stageWrap.className = 'ms-stage-wrap';
        stageWrap.innerHTML = `<img src="${baseUrl}assets/min_sprogskole_vrimmel.jpg" alt="Min sprogskole vrimlebillede" class="ms-stage-img" />`;
        const pinsLayer = document.createElement('div');
        pinsLayer.className = 'ms-pins-layer';

        WORDS.forEach(w => {
            const box = BOX_MAP[w.mindmapBox];
            const pin = document.createElement('button');
            pin.type = 'button';
            pin.className = `ms-pin ${w.id === selectedWordId ? 'selected' : ''}`;
            pin.style.left = `${w.x}%`;
            pin.style.top = `${w.y}%`;
            pin.style.background = box.color;
            pin.textContent = String(w.num);
            pin.title = w.word;
            if (activeFilter !== 'all' && w.mindmapBox !== activeFilter) {
                pin.style.display = 'none';
            }
            pin.onclick = () => {
                selectedWordId = w.id;
                speakDanish(w.word);
                render();
            };
            pinsLayer.appendChild(pin);
        });
        stageWrap.appendChild(pinsLayer);
        card.appendChild(stageWrap);
        attachVrimmelControls(stageWrap, pinsLayer, { lang });

        // Detaljekort
        const w = WORDS.find(x => x.id === selectedWordId) || WORDS[0];
        const wBox = BOX_MAP[w.mindmapBox];
        const detail = document.createElement('div');
        detail.className = 'ms-detail-box';
        detail.style.borderLeft = `4px solid ${wBox.color}`;
        detail.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.6rem;">
                <div>
                    <span style="display:inline-block; background:${wBox.bg}; border:1px solid ${wBox.border}; color:${wBox.color}; font-size:0.74rem; font-weight:800; padding:0.18rem 0.6rem; border-radius:999px; margin-bottom:0.35rem;">
                        ${wBox.num}. ${escapeHtml(msT(wBox.titleKey, lang))}
                    </span>
                    <div style="font-size:1.35rem; font-weight:900; color:#ffffff;">${w.num}. ${w.word}</div>
                </div>
                <button type="button" class="ms-btn-primary" id="ms-speak-word">${SVG_SPEAK}<span>${escapeHtml(msT('f1_listen', lang))}</span></button>
            </div>
            <div style="font-size:0.86rem; color:#cbd5e1; margin-bottom:0.45rem;">
                <strong${rtlAttr}>${escapeHtml(msT('f1_forms_lbl', lang))}</strong> <span dir="ltr">${w.forms}</span>
            </div>
            <div style="font-size:0.9rem; color:#f1f5f9; margin-bottom:0.45rem;">
                <strong${rtlAttr}>${escapeHtml(msT('f1_meaning_lbl', lang))}</strong> <span dir="ltr">${escapeHtml(msT(`w_${w.id}_m`, 'da'))}</span>
                ${msSub(`w_${w.id}_m`, 'ms-sub-tr', lang)}
            </div>
            <div style="font-size:0.92rem; color:#f8fafc; margin-bottom:0.45rem;">
                <strong${rtlAttr}>${escapeHtml(msT('f1_example_lbl', lang))}</strong> <span dir="ltr">${escapeHtml(msT(`w_${w.id}_s`, 'da'))}</span>
                ${msSub(`w_${w.id}_s`, 'ms-sub-tr', lang)}
            </div>
            <div style="font-size:0.84rem; color:#5eead4; font-weight:700;">
                <strong${rtlAttr}>${escapeHtml(msT('f1_stikord_lbl', lang))}</strong> <span dir="ltr">${w.stikord}</span>
            </div>
        `;
        detail.querySelector('#ms-speak-word').onclick = () => speakDanish(`${w.word}. ${msT(`w_${w.id}_s`, 'da')}`);
        card.appendChild(detail);
        viewContainer.appendChild(card);

        // Mindmap-sortering under billedet
        const sortCard = document.createElement('div');
        sortCard.className = 'ms-card';
        if (sortIdx >= WORDS.length) {
            sortCard.style.textAlign = 'center';
            sortCard.innerHTML = `
                <h2${rtlAttr}>${escapeHtml(msT('f1_sort_done', lang))}</h2>
                <p style="color:#94a3b8;">${sortScore} / ${WORDS.length}</p>
                <button type="button" class="ms-btn-primary" id="ms-sort-restart">${escapeHtml(msT('f1_sort_restart', lang))}</button>
            `;
            sortCard.querySelector('#ms-sort-restart').onclick = () => { sortIdx = 0; sortScore = 0; sortFeedback = null; render(); };
        } else {
            const cur = WORDS[sortIdx];
            sortCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.65rem;">
                    <div>
                        <h2${rtlAttr}>${escapeHtml(msT('f1_sort_title', lang))}</h2>
                        <p${rtlAttr} style="margin:0; font-size:0.85rem; color:#94a3b8;">${escapeHtml(msT('f1_sort_sub', lang))}</p>
                    </div>
                    <span class="ms-pill">${sortIdx + 1} / ${WORDS.length}</span>
                </div>
                <div style="background:#101419; border:1px solid rgba(203,213,225,0.16); border-radius:12px; padding:0.9rem 1.1rem; font-size:1.2rem; font-weight:800; color:#ffffff; margin-bottom:0.8rem; text-align:center;">
                    ${cur.word}
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr)); gap:0.5rem;">
                    ${MINDMAP_BOXES.map(b => `
                        <button type="button" class="ms-chip" data-sort-box="${b.id}" style="border-left:3px solid ${b.color}; text-align:left;">
                            ${b.num}. ${escapeHtml(msT(b.titleKey, lang))}
                        </button>
                    `).join('')}
                </div>
                ${sortFeedback ? `<div style="margin-top:0.75rem; font-size:0.88rem; font-weight:700; color:${sortFeedback.ok ? '#4ade80' : '#f87171'};">${escapeHtml(sortFeedback.msg)}</div>` : ''}
            `;
            sortCard.querySelectorAll('[data-sort-box]').forEach(btn => {
                btn.onclick = () => {
                    if (btn.dataset.sortBox === cur.mindmapBox) {
                        sortScore++;
                        sortFeedback = { ok: true, msg: msT('f1_sort_right', lang) };
                        sortIdx++;
                    } else {
                        sortFeedback = { ok: false, msg: msT('f1_sort_wrong', lang) };
                    }
                    render();
                };
            });
        }
        viewContainer.appendChild(sortCard);
    }

    // ========================================================================
    // FANE 2: DETEKTIV (KUN PEGEFELTER FRA MISSIONENS MINDMAP-KATEGORI)
    // ========================================================================
    function renderTab2(lang, rtlAttr) {
        const card = document.createElement('div');
        card.className = 'ms-card';

        if (detIdx >= DETECTIVE_MISSIONS.length) {
            card.style.textAlign = 'center';
            card.innerHTML = `
                <h2${rtlAttr}>${escapeHtml(msT('f2_done', lang))}</h2>
                <p style="color:#94a3b8; font-size:1rem;">${escapeHtml(msT('f2_score', lang))}: <strong style="color:#4ade80;">${detScore} / ${DETECTIVE_MISSIONS.length}</strong></p>
                <button type="button" class="ms-btn-primary" id="ms-det-restart">${escapeHtml(msT('f2_restart', lang))}</button>
            `;
            card.querySelector('#ms-det-restart').onclick = () => { detIdx = 0; detScore = 0; detShowHint = false; detFeedback = null; render(); };
            viewContainer.appendChild(card);
            return;
        }

        const m = DETECTIVE_MISSIONS[detIdx];
        const mBox = BOX_MAP[m.box];
        const targetWord = WORDS.find(x => x.id === m.wordId);

        const head = document.createElement('div');
        head.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.65rem;">
                <div>
                    <h2${rtlAttr}>${escapeHtml(msT('f2_title', lang))}</h2>
                    <p${rtlAttr} style="margin:0; font-size:0.85rem; color:#94a3b8;">${escapeHtml(msT('f2_sub', lang))}</p>
                </div>
                <span class="ms-pill">${escapeHtml(msT('f2_mission', lang))} ${detIdx + 1}/${DETECTIVE_MISSIONS.length} · ${escapeHtml(msT('f2_score', lang))}: ${detScore}</span>
            </div>
            <div style="background:#101419; border:1px solid ${mBox.border}; border-left:4px solid ${mBox.color}; border-radius:12px; padding:0.85rem 1rem; margin-bottom:0.85rem;">
                <div style="font-size:0.75rem; font-weight:800; color:${mBox.color}; margin-bottom:0.25rem;">${mBox.num}. ${escapeHtml(msT(mBox.titleKey, lang))}</div>
                <div style="font-size:1rem; font-weight:700; color:#ffffff;">${m.prompt}</div>
                ${detShowHint ? `<div style="margin-top:0.4rem; font-size:0.84rem; color:#fbbf24;">${m.hint}</div>` : ''}
            </div>
        `;
        card.appendChild(head);

        const stageWrap = document.createElement('div');
        stageWrap.className = 'ms-stage-wrap';
        stageWrap.innerHTML = `<img src="${baseUrl}assets/min_sprogskole_vrimmel.jpg" alt="Min sprogskole detektiv" class="ms-stage-img" />`;
        const pinsLayer = document.createElement('div');
        pinsLayer.className = 'ms-pins-layer';

        // Kun pegefelter fra den aktive missions mindmap-kategori vises!
        WORDS.filter(w => w.mindmapBox === m.box).forEach(w => {
            const pin = document.createElement('button');
            pin.type = 'button';
            pin.className = 'ms-pin';
            pin.style.left = `${w.x}%`;
            pin.style.top = `${w.y}%`;
            pin.style.background = mBox.color;
            pin.textContent = String(w.num);
            pin.onclick = () => {
                if (detFeedback?.ok) return;
                if (w.id === m.wordId) {
                    detScore++;
                    detFeedback = { ok: true, msg: `${targetWord.word} — ${msT(`w_${targetWord.id}_s`, 'da')}` };
                    speakDanish(targetWord.word);
                } else {
                    detFeedback = { ok: false, msg: `Det var nr. ${w.num} (${w.word}). Prøv et andet tal i samme kategori.` };
                }
                render();
            };
            pinsLayer.appendChild(pin);
        });
        stageWrap.appendChild(pinsLayer);
        card.appendChild(stageWrap);
        attachVrimmelControls(stageWrap, pinsLayer, { lang });

        const controls = document.createElement('div');
        controls.style.cssText = 'margin-top:0.85rem; display:flex; flex-wrap:wrap; gap:0.55rem; align-items:center;';
        controls.innerHTML = `
            ${!detFeedback?.ok ? `<button type="button" class="ms-btn-ghost" id="ms-det-hint">${SVG_HINT}<span>${escapeHtml(msT('f2_hint_btn', lang))}</span></button>` : ''}
            ${detFeedback ? `<span style="font-size:0.9rem; font-weight:700; color:${detFeedback.ok ? '#4ade80' : '#f87171'};">${escapeHtml(detFeedback.msg)}</span>` : ''}
            ${detFeedback?.ok ? `<button type="button" class="ms-btn-primary" id="ms-det-next" style="margin-left:auto;">${escapeHtml(msT('f2_next', lang))}</button>` : ''}
        `;
        const hintBtn = controls.querySelector('#ms-det-hint');
        if (hintBtn) hintBtn.onclick = () => { detShowHint = true; render(); };
        const nextBtn = controls.querySelector('#ms-det-next');
        if (nextBtn) nextBtn.onclick = () => { detIdx++; detShowHint = false; detFeedback = null; render(); };
        card.appendChild(controls);
        viewContainer.appendChild(card);
    }

    // ========================================================================
    // FANE 3: KERNE-GRAMMATIK (PRÆPOSITIONER I SKOLEHVERDAGEN — A, B, C)
    // ========================================================================
    function renderTab3(lang, rtlAttr) {
        const card = document.createElement('div');
        card.className = 'ms-card';

        const list = gramSub === 'a' ? GRAMMAR_DUEL : gramSub === 'b' ? GRAMMAR_REWRITE : GRAMMAR_CONTEXT;
        const st = gramState[gramSub];

        card.innerHTML = `
            <h2${rtlAttr}>${escapeHtml(msT('f3_title', lang))}</h2>
            <p${rtlAttr} style="margin:0 0 0.9rem; font-size:0.88rem; color:#94a3b8;">${escapeHtml(msT('f3_sub', lang))}</p>
            <div class="ms-filter-row">
                <button type="button" class="ms-pill ${gramSub === 'a' ? 'active' : ''}" data-gsub="a">${escapeHtml(msT('f3_step_a', lang))} (${GRAMMAR_DUEL.length})</button>
                <button type="button" class="ms-pill ${gramSub === 'b' ? 'active' : ''}" data-gsub="b">${escapeHtml(msT('f3_step_b', lang))} (${GRAMMAR_REWRITE.length})</button>
                <button type="button" class="ms-pill ${gramSub === 'c' ? 'active' : ''}" data-gsub="c">${escapeHtml(msT('f3_step_c', lang))} (${GRAMMAR_CONTEXT.length})</button>
            </div>
        `;
        card.querySelectorAll('[data-gsub]').forEach(btn => {
            btn.onclick = () => { gramSub = btn.dataset.gsub; render(); };
        });

        const body = document.createElement('div');
        if (st.idx >= list.length) {
            body.style.textAlign = 'center';
            body.innerHTML = `
                <p style="font-size:1.05rem; color:#cbd5e1;">Score: <strong style="color:#4ade80;">${st.score} / ${list.length}</strong></p>
                <button type="button" class="ms-btn-primary" id="ms-g-restart">${escapeHtml(msT('f3_restart', lang))}</button>
            `;
            body.querySelector('#ms-g-restart').onclick = () => { gramState[gramSub] = { idx: 0, score: 0, picked: null }; render(); };
        } else {
            const item = list[st.idx];
            const promptText = gramSub === 'a' ? item.q : gramSub === 'b' ? item.base : `${item.before} ____ ${item.after}`;
            body.innerHTML = `
                <div style="font-size:0.8rem; color:#94a3b8; font-weight:700; margin-bottom:0.45rem;">${st.idx + 1} / ${list.length} · Score: ${st.score}</div>
                <div style="background:#101419; border:1px solid rgba(203,213,225,0.16); border-radius:12px; padding:1rem 1.1rem; font-size:1.05rem; font-weight:700; color:#ffffff; margin-bottom:0.85rem;">
                    ${promptText}
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.55rem; margin-bottom:0.85rem;">
                    ${item.opts.map(opt => {
                        let cls = 'ms-opt-btn';
                        if (st.picked !== null) {
                            if (opt === item.ans) cls += ' correct';
                            else if (opt === st.picked) cls += ' wrong';
                        }
                        return `<button type="button" class="${cls}" style="width:auto; min-width:110px; text-align:center;" data-gopt="${opt}" ${st.picked !== null ? 'disabled' : ''}>${opt}</button>`;
                    }).join('')}
                </div>
                ${st.picked !== null ? `
                    <div style="background:#101419; border-left:3px solid ${st.picked === item.ans ? '#22c55e' : '#f59e0b'}; border-radius:10px; padding:0.75rem 0.95rem; font-size:0.88rem; color:#cbd5e1; margin-bottom:0.85rem;">
                        <strong>${escapeHtml(st.picked === item.ans ? msT('f3_right', lang) : msT('f3_wrong', lang))}</strong> ${item.exp}
                    </div>
                    <button type="button" class="ms-btn-primary" id="ms-g-next">${escapeHtml(msT('f3_next', lang))}</button>
                ` : ''}
            `;
            body.querySelectorAll('[data-gopt]').forEach(btn => {
                btn.onclick = () => {
                    st.picked = btn.dataset.gopt;
                    if (st.picked === item.ans) st.score++;
                    render();
                };
            });
            const nextBtn = body.querySelector('#ms-g-next');
            if (nextBtn) nextBtn.onclick = () => { st.idx++; st.picked = null; render(); };
        }
        card.appendChild(body);
        viewContainer.appendChild(card);
    }

    // ========================================================================
    // FANE 4: BYG SÆTNINGER (A. PUSLEOPGAVER + B. TRIN-FOR-TRIN)
    // ========================================================================
    function renderTab4(lang, rtlAttr) {
        // A. Pusleopgaver
        const cardA = document.createElement('div');
        cardA.className = 'ms-card';
        const puz = PUZZLES[puzIdx % PUZZLES.length];
        const slotColors = ['#22c55e', '#ef4444', '#f97316', '#38bdf8'];
        const slotLabels = [msT('f4_slot_1', lang), msT('f4_slot_2', lang), msT('f4_slot_3', lang), msT('f4_slot_4', lang)];

        cardA.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
                <h2${rtlAttr}>${escapeHtml(msT('f4_part_a', lang))}</h2>
                <span class="ms-pill">${(puzIdx % PUZZLES.length) + 1} / ${PUZZLES.length}</span>
            </div>
            <div class="ms-slot-grid">
                ${[0, 1, 2, 3].map(i => `
                    <div class="ms-slot" data-rm-slot="${i}" style="border-color:${puzPlaced[i] ? slotColors[i] : 'rgba(203,213,225,0.22)'};">
                        <span style="font-size:0.68rem; font-weight:800; color:${slotColors[i]}; margin-bottom:0.18rem;">${escapeHtml(slotLabels[i])}</span>
                        <span style="font-size:0.9rem; font-weight:800; color:#ffffff;">${puzPlaced[i] || '—'}</span>
                    </div>
                `).join('')}
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:0.45rem; margin-bottom:0.85rem;">
                ${puz.pool.map(w => `
                    <button type="button" class="ms-chip" data-puz-w="${w}" ${puzPlaced.includes(w) ? 'disabled style="opacity:0.35;"' : ''}>${w}</button>
                `).join('')}
            </div>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
                <button type="button" class="ms-btn-primary" id="ms-puz-check" ${puzPlaced.length < 4 ? 'disabled' : ''}>${escapeHtml(msT('f4_check', lang))}</button>
                <button type="button" class="ms-btn-ghost" id="ms-puz-clear">${escapeHtml(msT('f4_clear', lang))}</button>
                ${puzStatus === 'ok' ? `<button type="button" class="ms-btn-ghost" id="ms-puz-listen">${SVG_SPEAK}<span>${escapeHtml(msT('f4_listen', lang))}</span></button>` : ''}
                ${puzStatus === 'ok' ? `<button type="button" class="ms-btn-primary" id="ms-puz-next" style="margin-left:auto;">${escapeHtml(msT('f4_next', lang))}</button>` : ''}
            </div>
            ${puzStatus ? `<div style="margin-top:0.7rem; font-size:0.88rem; font-weight:700; color:${puzStatus === 'ok' ? '#4ade80' : '#f87171'};">${puzStatus === 'ok' ? puz.target.join(' ') + '.' : 'Prøv at bytte rundt på brikkerne — husk verbet på Plads 2!'}</div>` : ''}
        `;
        cardA.querySelectorAll('[data-puz-w]').forEach(btn => {
            btn.onclick = () => {
                if (puzPlaced.length < 4 && !puzPlaced.includes(btn.dataset.puzW)) {
                    puzPlaced.push(btn.dataset.puzW);
                    puzStatus = null;
                    render();
                }
            };
        });
        cardA.querySelectorAll('[data-rm-slot]').forEach(slot => {
            slot.onclick = () => {
                const idx = parseInt(slot.dataset.rmSlot, 10);
                if (puzPlaced[idx]) { puzPlaced.splice(idx, 1); puzStatus = null; render(); }
            };
        });
        cardA.querySelector('#ms-puz-check').onclick = () => {
            puzStatus = puzPlaced.every((w, i) => w === puz.target[i]) ? 'ok' : 'wrong';
            render();
        };
        cardA.querySelector('#ms-puz-clear').onclick = () => { puzPlaced = []; puzStatus = null; render(); };
        const pListen = cardA.querySelector('#ms-puz-listen');
        if (pListen) pListen.onclick = () => speakDanish(puz.target.join(' ') + '.');
        const pNext = cardA.querySelector('#ms-puz-next');
        if (pNext) pNext.onclick = () => { puzIdx++; puzPlaced = []; puzStatus = null; render(); };
        viewContainer.appendChild(cardA);

        // B. Trin-for-trin sætningsbygger
        const cardB = document.createElement('div');
        cardB.className = 'ms-card';
        const built = `${sb.s1} ${sb.s2} ${sb.s3} ${sb.s4}.`;
        cardB.innerHTML = `
            <h2${rtlAttr}>${escapeHtml(msT('f4_part_b', lang))}</h2>
            ${[
                { key: 's1', lbl: slotLabels[0], col: slotColors[0], opts: STEP_BUILDER.s1 },
                { key: 's2', lbl: slotLabels[1], col: slotColors[1], opts: STEP_BUILDER.s2 },
                { key: 's3', lbl: slotLabels[2], col: slotColors[2], opts: STEP_BUILDER.s3 },
                { key: 's4', lbl: slotLabels[3], col: slotColors[3], opts: STEP_BUILDER.s4 }
            ].map(row => `
                <div style="margin-bottom:0.65rem;">
                    <div style="font-size:0.75rem; font-weight:800; color:${row.col}; margin-bottom:0.3rem;">${escapeHtml(row.lbl)}</div>
                    <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
                        ${row.opts.map(o => `<button type="button" class="ms-chip ${sb[row.key] === o ? 'active' : ''}" data-sb-k="${row.key}" data-sb-v="${o}">${o}</button>`).join('')}
                    </div>
                </div>
            `).join('')}
            <div style="margin-top:0.9rem; background:#101419; border:1px solid rgba(76,155,166,0.5); border-radius:12px; padding:0.9rem 1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
                <strong style="font-size:1.05rem; color:#ffffff;">${built}</strong>
                <button type="button" class="ms-btn-primary" id="ms-sb-listen">${SVG_SPEAK}<span>${escapeHtml(msT('f4_listen', lang))}</span></button>
            </div>
        `;
        cardB.querySelectorAll('[data-sb-k]').forEach(btn => {
            btn.onclick = () => { sb[btn.dataset.sbK] = btn.dataset.sbV; render(); };
        });
        cardB.querySelector('#ms-sb-listen').onclick = () => speakDanish(built);
        viewContainer.appendChild(cardB);
    }

    // ========================================================================
    // FANE 5: SKRIVEHJÆLP (4-TRINS VÆRKSTED MED ORDSTILLING-FARVEKODER)
    // ========================================================================
    function renderTab5(lang, rtlAttr) {
        const box = BOX_MAP[activeBoxId];
        const sc = SKRIVE_SCENARIOS[activeBoxId];
        const mode = sc.starts[startCategory]?.mode || 'normal';
        const isInv = mode === 'inversion';
        const isAt = mode === 'at_clause';
        const startColor = getStartCategoryColor(startCategory);
        const allUserText = MINDMAP_BOXES.flatMap(b => skriveByBox[b.id] || []).join(' ');

        // Top: Din tekst + 6 mindmap-vælgere
        const docCard = document.createElement('div');
        docCard.className = 'ms-card';
        docCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.7rem;">
                <h2${rtlAttr}>${escapeHtml(msT('f5_doc_title', lang))}</h2>
                <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                    <button type="button" class="ms-btn-ghost" id="ms-copy-all" ${!allUserText ? 'disabled' : ''}>${SVG_COPY}<span>${escapeHtml(msT('f5_btn_copy', lang))}</span></button>
                    <button type="button" class="ms-btn-primary" id="ms-go-mm">${escapeHtml(msT('f5_btn_to_mindmap', lang))}</button>
                </div>
            </div>
            <div style="background:#101419; border:1px solid rgba(203,213,225,0.14); border-radius:12px; padding:0.9rem 1rem; min-height:66px; line-height:1.7; font-size:0.98rem; margin-bottom:0.85rem;">
                ${allUserText ? MINDMAP_BOXES.map(b => {
                    const list = skriveByBox[b.id] || [];
                    if (!list.length) return '';
                    return `<span style="border-bottom:2px solid ${b.color}; padding-bottom:1px; margin-right:6px;">${escapeHtml(list.join(' '))}</span>`;
                }).join(' ') : `<span style="color:#64748b; font-style:italic;"${rtlAttr}>${escapeHtml(msT('f5_doc_empty', lang))}</span>`}
            </div>
            <div style="background:#101419; border-left:3px solid #4c9ba6; border-radius:10px; padding:0.7rem 0.9rem; font-size:0.84rem; color:#cbd5e1; margin-bottom:0.9rem;"${rtlAttr}>
                ${SVG_HINT} <span>Tjek selv: Starter alle dine sætninger med "Jeg", eller har du også prøvet en tid- eller sted-start med verbet på Plads 2?</span>
                <button type="button" class="ms-btn-ghost" id="ms-hint-ord" style="padding:0.2rem 0.55rem; font-size:0.76rem; margin-left:0.5rem;">Ordstilling →</button>
            </div>
            <div class="ms-filter-row" style="margin-bottom:0;">
                ${MINDMAP_BOXES.map(b => {
                    const cnt = (skriveByBox[b.id] || []).length;
                    return `
                        <button type="button" class="ms-pill ${b.id === activeBoxId ? 'active' : ''}" data-sbox="${b.id}" style="border-color:${b.id === activeBoxId ? b.color : 'rgba(203,213,225,0.18)'};">
                            <span style="width:8px; height:8px; border-radius:999px; background:${b.color};"></span>
                            <span>${b.num}. ${escapeHtml(msT(b.titleKey, lang))} (${cnt})</span>
                        </button>
                    `;
                }).join('')}
            </div>
        `;
        docCard.querySelectorAll('[data-sbox]').forEach(btn => {
            btn.onclick = () => { activeBoxId = btn.dataset.sbox; resetDraft(activeBoxId); render(); };
        });
        docCard.querySelector('#ms-copy-all').onclick = (e) => copyText(allUserText, e.currentTarget, `${SVG_COPY}<span>${escapeHtml(msT('f5_btn_copy', lang))}</span>`, msT('f5_btn_copied', lang));
        docCard.querySelector('#ms-go-mm').onclick = () => { activeTab = 'tab6'; render(); };
        docCard.querySelector('#ms-hint-ord').onclick = () => navigateFn('ordstilling');
        viewContainer.appendChild(docCard);

        // 4-trins bygger for aktiv mindmap-boks
        const buildCard = document.createElement('div');
        buildCard.className = 'ms-card';
        buildCard.style.borderTop = `3px solid ${box.color}`;
        const previewStr = buildDraftSentence();
        const previewHtml = buildColoredPreviewHtml({ mode, startCategory, draft, enabled: colorCodesEnabled });
        const extList = extTab === 'rel' ? sc.extRel : sc.extConj;
        const boxIdx = MINDMAP_BOXES.findIndex(x => x.id === activeBoxId);
        const nextBox = MINDMAP_BOXES[(boxIdx + 1) % MINDMAP_BOXES.length];

        buildCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.65rem;">
                <div>
                    <div style="font-size:0.76rem; font-weight:800; color:${box.color};">${box.num}. ${escapeHtml(msT(box.titleKey, lang))}</div>
                    <h2${rtlAttr}>${escapeHtml(msT(box.qKey, lang))}</h2>
                </div>
                <div style="display:flex; gap:0.45rem;">
                    <button type="button" class="ms-btn-ghost" id="ms-clear-box">${escapeHtml(msT('f5_btn_clear_box', lang))}</button>
                    <button type="button" class="ms-btn-ghost" id="ms-next-box">${escapeHtml(msT('f5_next_box', lang))}</button>
                </div>
            </div>

            ${renderColorLegendHtml(colorCodesEnabled, {
                noun: swT('col_noun', lang),
                verb: swT('col_verb', lang),
                adj: swT('col_adj', lang),
                sted: swT('col_sted', lang),
                tid: swT('col_tid', lang),
                toggleOn: swT('col_toggle_on', lang),
                toggleOff: swT('col_toggle_off', lang)
            })}

            <!-- TRIN 1 -->
            <div style="background:#101419; border:1px solid rgba(203,213,225,0.14); border-radius:12px; padding:0.85rem; margin-bottom:0.65rem;">
                <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.55rem;">
                    <strong>1. Start på sætningen</strong>
                    <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
                        ${Object.entries(sc.starts).map(([k, cfg]) => `
                            <button type="button" class="ms-chip ${startCategory === k ? 'petrol' : ''}" data-scat="${k}" style="font-size:0.75rem; padding:0.25rem 0.6rem;">${swT(cfg.labelKey, lang)}</button>
                        `).join('')}
                    </div>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.4rem; align-items:center;" dir="ltr">
                    ${sc.starts[startCategory].options.map(opt => `
                        <button type="button" class="ms-chip ${draft.start === opt ? 'active' : ''}" data-pstart="${opt}" style="${chipColorStyle(startColor, draft.start === opt, colorCodesEnabled)}">${opt}</button>
                    `).join('')}
                    <input type="text" class="ms-input" id="ms-inp-start" style="flex:1; min-width:150px;" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${sc.starts[startCategory].options.includes(draft.start) ? '' : escapeHtml(draft.start)}" placeholder="..." />
                </div>
            </div>

            <!-- TRIN 2 -->
            <div style="background:#101419; border:1px solid rgba(203,213,225,0.14); border-radius:12px; padding:0.85rem; margin-bottom:0.65rem;">
                <div style="margin-bottom:0.5rem;"><strong>2. ${isAt ? 'Subjekt + verbum efter "at"' : 'Verbum (Plads 2)'}</strong></div>
                ${isAt ? `
                    <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.45rem;" dir="ltr">
                        ${sc.atSubjects.map(s => `<button type="button" class="ms-chip ${draft.atSubj === s ? 'petrol' : ''}" data-pats="${s}" style="${chipColorStyle(ORDSTILLING_COLORS.noun, draft.atSubj === s, colorCodesEnabled)}">${s}</button>`).join('')}
                    </div>
                    <div style="display:flex; flex-wrap:wrap; gap:0.4rem;" dir="ltr">
                        ${sc.atVerbs.map(v => `<button type="button" class="ms-chip ${draft.atVerb === v ? 'active' : ''}" data-patv="${v}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.atVerb === v, colorCodesEnabled)}">${v}</button>`).join('')}
                        <input type="text" class="ms-input" id="ms-inp-atverb" style="flex:1; min-width:140px;" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${sc.atVerbs.includes(draft.atVerb) ? '' : escapeHtml(draft.atVerb)}" placeholder="..." />
                    </div>
                ` : `
                    <div style="display:flex; flex-wrap:wrap; gap:0.4rem;" dir="ltr">
                        ${sc.verbs.map(v => `<button type="button" class="ms-chip ${draft.verb === v ? 'active' : ''}" data-pverb="${v}" style="${chipColorStyle(ORDSTILLING_COLORS.verb, draft.verb === v, colorCodesEnabled)}">${v}</button>`).join('')}
                        <input type="text" class="ms-input" id="ms-inp-verb" style="flex:1; min-width:140px;" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${sc.verbs.includes(draft.verb) ? '' : escapeHtml(draft.verb)}" placeholder="..." />
                    </div>
                `}
            </div>

            <!-- TRIN 3 -->
            <div style="background:#101419; border:1px solid rgba(203,213,225,0.14); border-radius:12px; padding:0.85rem; margin-bottom:0.65rem; ${mode === 'normal' && draft.skipStep3 ? 'opacity:0.65;' : ''}">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.5rem;">
                    <strong>3. ${isInv ? 'Subjekt (Plads 3) + indhold' : 'Indhold / detaljer'}</strong>
                    ${mode === 'normal' ? `
                        <button type="button" class="ms-chip" id="ms-skip3" style="display:inline-flex; align-items:center; gap:0.3rem; font-size:0.75rem; ${draft.skipStep3 ? 'border-color:#ef4444; background:rgba(239,68,68,0.2); color:#fecaca;' : ''}">
                            ${SVG_STOP}<span>${draft.skipStep3 ? 'Trin 3 slået fra' : 'Slå trin 3 fra'}</span>
                        </button>
                    ` : ''}
                </div>
                ${!(mode === 'normal' && draft.skipStep3) ? `
                    ${isInv ? `
                        <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.45rem;" dir="ltr">
                            ${sc.invertedSubjects.map(s => `<button type="button" class="ms-chip ${draft.invSubj === s ? 'petrol' : ''}" data-pinv="${s}" style="${chipColorStyle(ORDSTILLING_COLORS.noun, draft.invSubj === s, colorCodesEnabled)}">${s}</button>`).join('')}
                        </div>
                    ` : ''}
                    <div style="display:flex; flex-wrap:wrap; gap:0.4rem;" dir="ltr">
                        ${sc.objects.map(o => `<button type="button" class="ms-chip ${draft.object === o ? 'active' : ''}" data-pobj="${o}" style="${chipColorStyle(classifyObjectColor(o), draft.object === o, colorCodesEnabled)}">${o}</button>`).join('')}
                        <input type="text" class="ms-input" id="ms-inp-obj" style="flex:1; min-width:170px;" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${sc.objects.includes(draft.object) ? '' : escapeHtml(draft.object)}" placeholder="..." />
                    </div>
                ` : ''}
            </div>

            <!-- TRIN 4 -->
            <div style="background:#101419; border:1px solid rgba(203,213,225,0.14); border-radius:12px; padding:0.85rem; margin-bottom:0.85rem;">
                <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.5rem;">
                    <strong>4. Udvidelse (valgfrit)</strong>
                    <div style="display:flex; gap:0.35rem;">
                        <button type="button" class="ms-chip ${extTab === 'conj' ? 'petrol' : ''}" data-etab="conj" style="font-size:0.75rem;">fordi / men / og</button>
                        <button type="button" class="ms-chip ${extTab === 'rel' ? 'petrol' : ''}" data-etab="rel" style="font-size:0.75rem;">som / der</button>
                    </div>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.4rem;" dir="ltr">
                    ${extList.map(ex => `<button type="button" class="ms-chip ${draft.ext === ex.text ? 'active' : ''}" data-pext="${ex.text}">${ex.label}</button>`).join('')}
                    <input type="text" class="ms-input" id="ms-inp-ext" style="flex:1; min-width:160px;" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${extList.some(e => e.text === draft.ext) ? '' : escapeHtml(draft.ext)}" placeholder=", fordi ..." />
                </div>
            </div>

            <!-- LIVE PREVIEW + INDSÆT -->
            <div style="background:#101419; border:1.5px solid rgba(76,155,166,0.55); border-radius:12px; padding:0.9rem 1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem;">
                <div id="ms-preview-txt" style="font-size:1.02rem; font-weight:700; color:#ffffff;" dir="ltr">${previewHtml || '...'}</div>
                <button type="button" class="ms-btn-primary" id="ms-add-sent" ${!previewStr ? 'disabled' : ''}>${escapeHtml(msT('f5_btn_add', lang))}</button>
            </div>
        `;

        const colBtn = buildCard.querySelector('[data-toggle-color-codes]');
        if (colBtn) colBtn.onclick = () => { colorCodesEnabled = !colorCodesEnabled; setColorCodesEnabled(colorCodesEnabled); render(); };
        buildCard.querySelector('#ms-clear-box').onclick = () => { skriveByBox[activeBoxId] = []; saveSkrive(); render(); };
        buildCard.querySelector('#ms-next-box').onclick = () => { activeBoxId = nextBox.id; resetDraft(activeBoxId); render(); };

        buildCard.querySelectorAll('[data-scat]').forEach(b => { b.onclick = () => { startCategory = b.dataset.scat; draft.start = sc.starts[startCategory].options[0]; render(); }; });
        buildCard.querySelectorAll('[data-pstart]').forEach(b => { b.onclick = () => { draft.start = b.dataset.pstart; render(); }; });
        buildCard.querySelectorAll('[data-pverb]').forEach(b => { b.onclick = () => { draft.verb = b.dataset.pverb; render(); }; });
        buildCard.querySelectorAll('[data-pats]').forEach(b => { b.onclick = () => { draft.atSubj = b.dataset.pats; render(); }; });
        buildCard.querySelectorAll('[data-patv]').forEach(b => { b.onclick = () => { draft.atVerb = b.dataset.patv; render(); }; });
        buildCard.querySelectorAll('[data-pinv]').forEach(b => { b.onclick = () => { draft.invSubj = b.dataset.pinv; render(); }; });
        buildCard.querySelectorAll('[data-pobj]').forEach(b => { b.onclick = () => { draft.object = b.dataset.pobj; render(); }; });
        buildCard.querySelectorAll('[data-etab]').forEach(b => { b.onclick = () => { extTab = b.dataset.etab; render(); }; });
        buildCard.querySelectorAll('[data-pext]').forEach(b => { b.onclick = () => { draft.ext = b.dataset.pext; render(); }; });

        const skip3 = buildCard.querySelector('#ms-skip3');
        if (skip3) skip3.onclick = () => { draft.skipStep3 = !draft.skipStep3; render(); };

        const liveUpd = () => {
            const p = buildCard.querySelector('#ms-preview-txt');
            const add = buildCard.querySelector('#ms-add-sent');
            const s = buildDraftSentence();
            if (p) p.innerHTML = buildColoredPreviewHtml({ mode, startCategory, draft, enabled: colorCodesEnabled }) || '...';
            if (add) add.disabled = !s;
        };
        buildCard.querySelector('#ms-inp-start').oninput = (e) => { draft.start = e.target.value; liveUpd(); };
        const iv = buildCard.querySelector('#ms-inp-verb'); if (iv) iv.oninput = (e) => { draft.verb = e.target.value; liveUpd(); };
        const iav = buildCard.querySelector('#ms-inp-atverb'); if (iav) iav.oninput = (e) => { draft.atVerb = e.target.value; liveUpd(); };
        const io = buildCard.querySelector('#ms-inp-obj'); if (io) io.oninput = (e) => { draft.object = e.target.value; liveUpd(); };
        const ie = buildCard.querySelector('#ms-inp-ext'); if (ie) ie.oninput = (e) => { draft.ext = e.target.value; liveUpd(); };

        buildCard.querySelector('#ms-add-sent').onclick = () => {
            const s = buildDraftSentence();
            if (!s) return;
            skriveByBox[activeBoxId].push(s);
            saveSkrive();
            resetDraft(activeBoxId, startCategory);
            render();
        };

        viewContainer.appendChild(buildCard);
    }

    // ========================================================================
    // FANE 6: MINDMAP (DEL 1) — BRO FRA FANE 5 + STIKORD + EKSPORT TIL FANE 7
    // ========================================================================
    function renderTab6(lang, rtlAttr) {
        const card = document.createElement('div');
        card.className = 'ms-card';
        card.innerHTML = `
            <h2${rtlAttr}>${escapeHtml(msT('f6_title', lang))}</h2>
            <p${rtlAttr} style="margin:0 0 0.9rem; font-size:0.88rem; color:#94a3b8;">${escapeHtml(msT('f6_sub', lang))}</p>
            <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
                <button type="button" class="ms-btn-ghost" id="ms-mm-suggest">${escapeHtml(msT('f6_btn_suggest', lang))}</button>
                <button type="button" class="ms-btn-ghost" id="ms-mm-toggle-exam">${escapeHtml(examHideSentences ? msT('f6_btn_exam_show', lang) : msT('f6_btn_exam_hide', lang))}</button>
                <button type="button" class="ms-btn-primary" id="ms-mm-export">${escapeHtml(msT('f6_btn_export', lang))}</button>
            </div>
            <div class="ms-mm-grid">
                ${MINDMAP_BOXES.map(b => {
                    const sents = skriveByBox[b.id] || [];
                    const chips = sents.join(' ').replace(/[.,!?;:]/g, '').split(/\s+/).filter(Boolean);
                    return `
                        <div class="ms-mm-box" style="border-color:${b.border};">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <strong style="color:${b.color}; font-size:0.95rem;">${b.num}. ${escapeHtml(msT(b.titleKey, lang))}</strong>
                            </div>
                            <div style="font-size:0.8rem; color:#94a3b8;"${rtlAttr}>${escapeHtml(msT(b.qKey, lang))}</div>
                            ${!examHideSentences ? `
                                <div style="display:flex; flex-wrap:wrap; gap:0.3rem; min-height:28px;">
                                    ${chips.length > 0
                                        ? chips.map(w => `<button type="button" class="ms-chip" style="padding:0.2rem 0.5rem; font-size:0.76rem;" data-mm-add-box="${b.id}" data-mm-add-w="${escapeHtml(w)}">+ ${escapeHtml(w)}</button>`).join('')
                                        : `<span style="font-size:0.78rem; color:#64748b; font-style:italic;"${rtlAttr}>${escapeHtml(msT('f6_no_text', lang))}</span>`
                                    }
                                </div>
                            ` : ''}
                            <input type="text" class="ms-input" data-mm-inp="${b.id}" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" value="${escapeHtml(mindmapNotes[b.id] || '')}" placeholder="${escapeHtml(msT('f6_stikord_ph', lang))}" />
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        card.querySelector('#ms-mm-suggest').onclick = () => {
            MINDMAP_BOXES.forEach(b => {
                const sents = skriveByBox[b.id] || [];
                if (sents.length > 0) {
                    mindmapNotes[b.id] = extractKeywordsFromSentences(sents);
                } else if (!mindmapNotes[b.id]) {
                    mindmapNotes[b.id] = extractKeywordsFromSentences([msT(b.modelKey, 'da')]);
                }
            });
            saveMindmap();
            render();
        };
        card.querySelector('#ms-mm-toggle-exam').onclick = () => { examHideSentences = !examHideSentences; render(); };
        card.querySelector('#ms-mm-export').onclick = () => {
            importFromSkriveToUdtale();
            activeTab = 'tab7';
            render();
        };
        card.querySelectorAll('[data-mm-add-box]').forEach(btn => {
            btn.onclick = () => {
                const bid = btn.dataset.mmAddBox;
                const word = btn.dataset.mmAddW;
                const cur = (mindmapNotes[bid] || '').trim();
                mindmapNotes[bid] = cur ? `${cur} · ${word}` : word;
                saveMindmap();
                render();
            };
        });
        card.querySelectorAll('[data-mm-inp]').forEach(inp => {
            inp.oninput = (e) => { mindmapNotes[inp.dataset.mmInp] = e.target.value; saveMindmap(); };
        });
        viewContainer.appendChild(card);

        // Stikord vs. hel sætning-quiz
        const qCard = document.createElement('div');
        qCard.className = 'ms-card';
        const q = STIKORD_QUIZ[stikQuizIdx % STIKORD_QUIZ.length];
        qCard.innerHTML = `
            <h2${rtlAttr}>${escapeHtml(msT('f6_quiz_title', lang))}</h2>
            <p${rtlAttr} style="margin:0 0 0.75rem; font-size:0.86rem; color:#94a3b8;">${escapeHtml(msT('f6_quiz_sub', lang))}</p>
            <div style="font-weight:700; margin-bottom:0.65rem;">${q.q}</div>
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
                ${q.opts.map(opt => {
                    let cls = 'ms-opt-btn';
                    if (stikQuizPicked) {
                        if (opt === q.ans) cls += ' correct';
                        else if (opt === stikQuizPicked) cls += ' wrong';
                    }
                    return `<button type="button" class="${cls}" data-sqopt="${escapeHtml(opt)}" ${stikQuizPicked ? 'disabled' : ''}>${escapeHtml(opt)}</button>`;
                }).join('')}
            </div>
            ${stikQuizPicked ? `
                <div style="margin-top:0.75rem; font-size:0.86rem; color:#cbd5e1;">${q.exp}</div>
                <button type="button" class="ms-btn-ghost" id="ms-sq-next" style="margin-top:0.6rem;">${escapeHtml(msT('f3_next', lang))}</button>
            ` : ''}
        `;
        qCard.querySelectorAll('[data-sqopt]').forEach(btn => {
            btn.onclick = () => { stikQuizPicked = btn.dataset.sqopt; render(); };
        });
        const sqNext = qCard.querySelector('#ms-sq-next');
        if (sqNext) sqNext.onclick = () => { stikQuizIdx++; stikQuizPicked = null; render(); };
        viewContainer.appendChild(qCard);
    }

    // ========================================================================
    // FANE 7: TRÆN UDTALE (SCORE-RING + ORD-FOR-ORD CHIPS + PRØV IGEN)
    // ========================================================================
    function startRec(idx) {
        if (!recognition) {
            udtaleErr[idx] = 'Talegenkendelse understøttes ikke i denne browser (prøv Chrome eller Safari).';
            render();
            return;
        }
        if (listeningIdx === idx) {
            try { recognition.stop(); } catch {}
            listeningIdx = null;
            render();
            return;
        }
        window.speechSynthesis?.cancel();
        listeningIdx = idx;
        delete udtaleErr[idx];
        render();

        recognition.onresult = (ev) => {
            const transcript = ev.results?.[0]?.[0]?.transcript || '';
            udtaleResults[idx] = scoreSentencePronunciation(udtaleItems[idx]?.text || '', transcript);
            listeningIdx = null;
            render();
        };
        recognition.onerror = () => {
            listeningIdx = null;
            udtaleErr[idx] = 'Kunne ikke høre noget — prøv at trykke Tal nu igen.';
            render();
        };
        recognition.onend = () => {
            if (listeningIdx === idx) { listeningIdx = null; render(); }
        };
        try { recognition.start(); } catch { listeningIdx = null; render(); }
    }

    function renderTab7(lang, rtlAttr) {
        const headCard = document.createElement('div');
        headCard.className = 'ms-card';
        headCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                <div>
                    <h2${rtlAttr}>${escapeHtml(msT('f7_title', lang))}</h2>
                    <p${rtlAttr} style="margin:0; font-size:0.86rem; color:#94a3b8;">${escapeHtml(msT('f7_sub', lang))}</p>
                </div>
                <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                    <button type="button" class="ms-btn-primary" id="ms-ud-import">${escapeHtml(msT('f7_import_btn', lang))}</button>
                    <button type="button" class="ms-btn-ghost" id="ms-ud-models">${escapeHtml(msT('f7_load_models', lang))}</button>
                </div>
            </div>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <input type="text" class="ms-input" id="ms-ud-new" style="flex:1; min-width:200px;" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" placeholder="${escapeHtml(msT('f7_add_ph', lang))}" />
                <button type="button" class="ms-btn-primary" id="ms-ud-add">${escapeHtml(msT('f7_add_btn', lang))}</button>
            </div>
        `;
        headCard.querySelector('#ms-ud-import').onclick = () => { importFromSkriveToUdtale(); render(); };
        headCard.querySelector('#ms-ud-models').onclick = () => {
            udtaleItems = MINDMAP_BOXES.map(b => ({ boxId: b.id, text: msT(b.modelKey, 'da') }));
            udtaleResults = {};
            saveUdtale();
            render();
        };
        headCard.querySelector('#ms-ud-add').onclick = () => {
            const val = (headCard.querySelector('#ms-ud-new')?.value || '').trim();
            if (!val) return;
            udtaleItems.push({ boxId: 'sprogskole_by', text: val });
            saveUdtale();
            render();
        };
        viewContainer.appendChild(headCard);

        if (udtaleItems.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'ms-card';
            empty.style.textAlign = 'center';
            empty.innerHTML = `<p style="color:#94a3b8;"${rtlAttr}>${escapeHtml(msT('f7_empty', lang))}</p>`;
            viewContainer.appendChild(empty);
            return;
        }

        udtaleItems.forEach((entry, idx) => {
            const b = BOX_MAP[entry.boxId] || MINDMAP_BOXES[0];
            const res = udtaleResults[idx];
            const isRec = listeningIdx === idx;
            const ringColor = !res ? '#334155' : res.overallScore >= 85 ? '#22c55e' : res.overallScore >= 60 ? '#f59e0b' : '#ef4444';

            const box = document.createElement('div');
            box.className = 'ms-card';
            box.style.borderLeft = `4px solid ${b.color}`;
            box.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.8rem; flex-wrap:wrap;">
                    <div style="flex:1; min-width:220px;">
                        <div style="font-size:0.74rem; font-weight:800; color:${b.color}; margin-bottom:0.25rem;">${b.num}. ${escapeHtml(msT(b.titleKey, lang))}</div>
                        <div style="font-size:1.05rem; font-weight:800; color:#ffffff; margin-bottom:0.65rem;">${escapeHtml(entry.text)}</div>
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                            <button type="button" class="ms-btn-ghost" data-ud-spk="${idx}">${SVG_SPEAK}<span>${escapeHtml(msT('f7_speak_btn', lang))}</span></button>
                            <button type="button" class="ms-btn-primary" data-ud-rec="${idx}" style="${isRec ? 'background:#dc2626; border-color:#f87171;' : ''}">
                                ${SVG_MIC}<span>${escapeHtml(isRec ? msT('f7_stop_btn', lang) : msT('f7_rec_btn', lang))}</span>
                            </button>
                            ${res && res.overallScore < 100 ? `
                                <button type="button" class="ms-btn-primary" data-ud-retry="${idx}" style="background:#dc2626; border-color:#fca5a5;">
                                    ${escapeHtml(msT('f7_retry_btn', lang))}
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    ${res ? `
                        <div class="ms-ud-ring" style="background:conic-gradient(${ringColor} ${res.overallScore * 3.6}deg, rgba(255,255,255,0.12) 0deg);">
                            <span style="background:#151a21; width:44px; height:44px; border-radius:999px; display:flex; align-items:center; justify-content:center;">${res.overallScore}%</span>
                        </div>
                    ` : ''}
                </div>
                ${res ? `
                    <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-top:0.75rem;">
                        ${res.wordData.map(wd => {
                            const c = wd.score >= 85 ? 'rgba(34,197,94,0.2); border-color:#22c55e; color:#bbf7d0;' : wd.score >= 50 ? 'rgba(245,158,11,0.2); border-color:#f59e0b; color:#fde68a;' : 'rgba(239,68,68,0.2); border-color:#ef4444; color:#fecaca;';
                            return `<span class="ms-word-chip" style="background:${c}">${escapeHtml(wd.word)} (${wd.score}%)</span>`;
                        }).join('')}
                    </div>
                ` : ''}
                ${udtaleErr[idx] ? `<div style="margin-top:0.55rem; font-size:0.82rem; color:#fca5a5;">${escapeHtml(udtaleErr[idx])}</div>` : ''}
            `;
            box.querySelector('[data-ud-spk]').onclick = () => speakDanish(entry.text, 0.88);
            box.querySelector('[data-ud-rec]').onclick = () => startRec(idx);
            const rBtn = box.querySelector('[data-ud-retry]');
            if (rBtn) rBtn.onclick = () => { delete udtaleResults[idx]; startRec(idx); };
            viewContainer.appendChild(box);
        });
    }

    // ========================================================================
    // FANE 8: SPØRGSMÅL (DEL 2) — 12 VERBUM-KONTRAST OPGAVER + AI-EKSAMINATOR
    // ========================================================================
    function renderTab8(lang, rtlAttr) {
        const modeBar = document.createElement('div');
        modeBar.className = 'ms-filter-row';
        modeBar.innerHTML = `
            <button type="button" class="ms-pill ${del2Mode === 'quiz' ? 'active' : ''}" data-d2m="quiz">Spørgsmål fra eksaminator (${DEL2_QUESTIONS.length})</button>
            <button type="button" class="ms-pill ${del2Mode === 'ai' ? 'active' : ''}" data-d2m="ai">AI-eksaminator</button>
        `;
        modeBar.querySelectorAll('[data-d2m]').forEach(btn => {
            btn.onclick = () => { del2Mode = btn.dataset.d2m; render(); };
        });
        viewContainer.appendChild(modeBar);

        if (del2Mode === 'quiz') {
            const q = DEL2_QUESTIONS[del2Idx];
            const card = document.createElement('div');
            card.className = 'ms-card';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.85rem;">
                    <span style="font-size:0.85rem; color:#94a3b8; font-weight:800;">
                        Spørgsmål ${del2Idx + 1}/${DEL2_QUESTIONS.length} · Løst: ${del2Solved.size}/${DEL2_QUESTIONS.length}
                    </span>
                    <div style="display:flex; gap:0.4rem;">
                        <button type="button" class="ms-btn-ghost" id="ms-d2-prev" ${del2Idx === 0 ? 'disabled' : ''}>← Forrige</button>
                        <button type="button" class="ms-btn-ghost" id="ms-d2-next" ${del2Idx === DEL2_QUESTIONS.length - 1 ? 'disabled' : ''}>Næste →</button>
                    </div>
                </div>

                <div style="padding:0.95rem 1.1rem; border-radius:14px; background:#101419; border-left:4px solid #ec4899; margin-bottom:0.9rem; display:flex; justify-content:space-between; align-items:center; gap:0.6rem; flex-wrap:wrap;">
                    <div style="font-size:1.05rem; font-weight:900; color:#ffffff;">${escapeHtml(q.examinerQ)}</div>
                    <button type="button" class="ms-btn-ghost" id="ms-d2-spk-q">${SVG_SPEAK}</button>
                </div>

                <div style="display:grid; gap:0.55rem;">
                    ${q.options.map((opt, idx) => {
                        let cls = 'ms-opt-btn';
                        if (del2Ans !== null) {
                            if (opt.correct) cls += ' correct';
                            else if (idx === del2Ans) cls += ' wrong';
                        }
                        return `
                            <button type="button" class="${cls}" data-d2-opt="${idx}" style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem;">
                                <span>»${escapeHtml(opt.text)}«</span>
                                <span>${del2Ans !== null && opt.correct ? SVG_CHECK : ''}</span>
                            </button>
                        `;
                    }).join('')}
                </div>

                ${del2Ans !== null ? `
                    <div style="margin-top:0.85rem; background:#101419; border-left:3px solid ${q.options[del2Ans]?.correct ? '#22c55e' : '#f59e0b'}; border-radius:10px; padding:0.75rem 0.95rem; font-size:0.88rem; color:#cbd5e1;">
                        <strong>${q.options[del2Ans]?.correct ? 'Rigtigt svar!' : 'Tip:'}</strong> ${escapeHtml(q.tip)}
                    </div>
                ` : ''}
            `;

            card.querySelector('#ms-d2-prev').onclick = () => { if (del2Idx > 0) { del2Idx--; del2Ans = null; render(); } };
            card.querySelector('#ms-d2-next').onclick = () => { if (del2Idx < DEL2_QUESTIONS.length - 1) { del2Idx++; del2Ans = null; render(); } };
            card.querySelector('#ms-d2-spk-q').onclick = () => speakDanish(q.examinerQ);
            card.querySelectorAll('[data-d2-opt]').forEach(btn => {
                btn.onclick = () => {
                    del2Ans = Number(btn.dataset.d2Opt);
                    if (q.options[del2Ans]?.correct) {
                        del2Solved.add(del2Idx);
                        speakDanish(q.options[del2Ans].text);
                    }
                    render();
                };
            });
            viewContainer.appendChild(card);
            return;
        }

        // AI-eksaminator kort
        const aiCard = document.createElement('div');
        aiCard.className = 'ms-card';
        aiCard.innerHTML = `
            <h2${rtlAttr}>${escapeHtml(msT('f8_ai_title', lang))}</h2>
            <p${rtlAttr} style="margin:0 0 0.85rem; font-size:0.88rem; color:#94a3b8;">${escapeHtml(msT('f8_ai_sub', lang))}</p>
            <div style="display:flex; gap:0.55rem; flex-wrap:wrap; margin-bottom:0.85rem;">
                <button type="button" class="ms-btn-primary" id="ms-copy-ai">${SVG_COPY}<span>Kopiér eksaminator-prompt</span></button>
                <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" class="ms-btn-ghost" style="text-decoration:none;">Åbn Gemini →</a>
                <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" class="ms-btn-ghost" style="text-decoration:none;">Åbn ChatGPT →</a>
            </div>
            <pre style="margin:0; padding:0.85rem 1rem; background:#101419; border:1px solid rgba(203,213,225,0.12); border-radius:10px; white-space:pre-wrap; font-size:0.82rem; color:#cbd5e1; line-height:1.5;">${escapeHtml(AI_EXAM_PROMPT)}</pre>
        `;
        aiCard.querySelector('#ms-copy-ai').onclick = (e) => copyText(AI_EXAM_PROMPT, e.currentTarget, `${SVG_COPY}<span>Kopiér eksaminator-prompt</span>`, msT('f5_btn_copied', lang));
        viewContainer.appendChild(aiCard);
    }

    render();
    container.appendChild(viewContainer);
}
