import { getLang } from './i18n.js';

export const PUZZLE_SLOT_QUESTIONS = [
    {
        idx: 0,
        da: "1. Hvem?",
        defaultRole: "[Subjekt]",
        translations: {
            da: "Who?",
            en: "Who?",
            de: "Wer?",
            ar: "من؟",
            es: "¿Quién?",
            fa: "چه کسی؟",
            ku: "Kî?",
            ne: "को?",
            ps: "څوک؟",
            pt: "Quem?",
            ru: "Кто?",
            th: "ใคร?",
            tr: "Kim?",
            uk: "Хто?",
            ur: "کون؟",
            vi: "Ai?",
            zh: "谁？",
            sq: "Kush?"
        }
    },
    {
        idx: 1,
        da: "2. Handling?",
        defaultRole: "[Verbum]",
        translations: {
            da: "Action?",
            en: "Action?",
            de: "Handlung?",
            ar: "الحدث / الفعل؟",
            es: "¿Acción?",
            fa: "عمل / فعل؟",
            ku: "Çalakî?",
            ne: "काम / क्रिया?",
            ps: "کړنه؟",
            pt: "Ação?",
            ru: "Действие?",
            th: "การกระทำ?",
            tr: "Eylem?",
            uk: "Дія?",
            ur: "عمل؟",
            vi: "Hành động?",
            zh: "动作？",
            sq: "Veprimi?"
        }
    },
    {
        idx: 2,
        da: "3. Hvilken ting?",
        defaultRole: "[Objekt]",
        translations: {
            da: "Which thing?",
            en: "Which thing?",
            de: "Welche Sache?",
            ar: "أي شيء؟",
            es: "¿Qué cosa?",
            fa: "کدام چیز؟",
            ku: "Kîjan tişt?",
            ne: "कुन कुरा?",
            ps: "کوم شی؟",
            pt: "Qual coisa?",
            ru: "Какая вещь?",
            th: "สิ่งไหน?",
            tr: "Hangi şey?",
            uk: "Яка річ?",
            ur: "کون سی چیز؟",
            vi: "Vật gì?",
            zh: "什么事物？",
            sq: "Cila gjë?"
        }
    },
    {
        idx: 3,
        da: "4. Hvor?",
        defaultRole: "[Sted]",
        translations: {
            da: "Where?",
            en: "Where?",
            de: "Wo?",
            ar: "أين؟",
            es: "¿Dónde?",
            fa: "کجا؟",
            ku: "Li ku?",
            ne: "कहाँ?",
            ps: "چېرته؟",
            pt: "Onde?",
            ru: "Где?",
            th: "ที่ไหน?",
            tr: "Nerede?",
            uk: "Де?",
            ur: "کہاں؟",
            vi: "Ở đâu?",
            zh: "在哪里？",
            sq: "Ku?"
        }
    }
];

export function getGrammarSlotHint(idx, lang = null, customRole = null) {
    const l = lang || getLang() || 'da';
    const item = PUZZLE_SLOT_QUESTIONS[idx] || PUZZLE_SLOT_QUESTIONS[0];
    const trans = item.translations[l] || item.translations['en'] || item.translations['da'];
    return {
        danish: item.da,
        translation: trans,
        role: customRole || item.defaultRole
    };
}

export function renderPuzzleSlotInnerHtml(idx, lang = null, customRole = null) {
    const hint = getGrammarSlotHint(idx, lang, customRole);
    return `
        <span class="slot-hint">${hint.danish}</span>
        <span class="slot-trans">${hint.translation}</span>
        <span class="slot-role">${hint.role}</span>
    `;
}

export function renderPuzzleSlotFilledHtml(word, role) {
    return `
        <span class="slot-remove" title="Fjern">✕</span>
        <span class="slot-filled-word">${word}</span>
        <span class="slot-role">${role}</span>
    `;
}
