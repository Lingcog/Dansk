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

export function renderPuzzleSlotFilledHtml(word, role, number = null) {
    const numHtml = number ? `<span class="slot-number">${number}</span>` : '';
    return `
        ${numHtml}
        <span class="slot-remove" title="Fjern">✕</span>
        <span class="slot-filled-word">${word}</span>
        <span class="slot-role">${role || ''}</span>
    `;
}

export const ORDSTILLING_SLOT_DEFINITIONS = {
    hvem_hvad: {
        da: "Hvem / hvad?",
        defaultRole: "[Subjekt]",
        translations: {
            da: "Who / what?",
            en: "Who / what?",
            de: "Wer / Was?",
            ar: "من / ماذا؟",
            es: "¿Quién / qué?",
            fa: "چه کسی / چه چیزی؟",
            ku: "Kî / çi?",
            ne: "को / के?",
            ps: "څوک / څه؟",
            pt: "Quem / o quê?",
            ru: "Кто / что?",
            th: "ใคร / อะไร?",
            tr: "Kim / ne?",
            uk: "Хто / що?",
            ur: "کون / کیا؟",
            vi: "Ai / cái gì?",
            zh: "谁 / 什么？",
            sq: "Kush / çfarë?"
        }
    },
    hvad_laver: {
        da: "Hvad laver?",
        defaultRole: "[Verbum - V2]",
        translations: {
            da: "Action?",
            en: "Action?",
            de: "Handlung?",
            ar: "الحدث / الفعل؟",
            es: "¿Acción?",
            fa: "عمل / فعل؟",
            ku: "Çi dike?",
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
    hvor: {
        da: "Hvor?",
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
    },
    hvornaar: {
        da: "Hvornår?",
        defaultRole: "[Tid]",
        translations: {
            da: "When?",
            en: "When?",
            de: "Wann?",
            ar: "متى؟",
            es: "¿Cuándo?",
            fa: "چه زمانی؟",
            ku: "Kengî?",
            ne: "कहिले?",
            ps: "کله؟",
            pt: "Quando?",
            ru: "Когда?",
            th: "เมื่อไหร่?",
            tr: "Ne zaman?",
            uk: "Коли?",
            ur: "کب؟",
            vi: "Khi nào?",
            zh: "什么时候？",
            sq: "Kur?"
        }
    },
    centraladverbium: {
        da: "Centraladverbium",
        defaultRole: "[Centraladverbium]",
        translations: {
            da: "Central adverb (not, always...)?",
            en: "Central adverb (not, always...)?",
            de: "Zentraladverb (nicht, immer...)?",
            ar: "الظرف المركزي؟",
            es: "¿Adverbio central (no, siempre...)?",
            fa: "قید مرکزی؟",
            ku: "Ndajfolja qendrore?",
            ne: "केन्द्रीय क्रियाविशेषण?",
            ps: "مرکزي قید؟",
            pt: "Advérbio central?",
            ru: "Центральное наречие?",
            th: "คำกริยาวิเศษณ์กลาง?",
            tr: "Merkezi zarf?",
            uk: "Центральний прислівник?",
            ur: "مرکزی متعلق فعل؟",
            vi: "Trạng từ trung tâm?",
            zh: "中心副词？",
            sq: "Ndajfolja qendrore?"
        }
    },
    objekt: {
        da: "Hvilken ting?",
        defaultRole: "[Objekt]",
        translations: {
            da: "Which thing / Object?",
            en: "Which thing / Object?",
            de: "Welche Sache / Objekt?",
            ar: "أي شيء؟ (مفعول به)",
            es: "¿Qué cosa? (Objeto)",
            fa: "کدام چیز؟ (مفعول)",
            ku: "Kîjan tişt? (Bercer)",
            ne: "कुन कुरा? (कर्म)",
            ps: "کوم شی؟ (مفعول)",
            pt: "Qual coisa? (Objeto)",
            ru: "Какая вещь? (Объект)",
            th: "สิ่งไหน? (กรรม)",
            tr: "Hangi şey? (Nesne)",
            uk: "Яка річ? (Додаток)",
            ur: "کون سی چیز؟ (مفعول)",
            vi: "Vật gì? (Tân ngữ)",
            zh: "什么事物？（宾语）",
            sq: "Cila gjë? (Kundrina)"
        }
    },
    hjaelpeverbum: {
        da: "Hjælpeverbum",
        defaultRole: "[Hjælpeverbum - V1]",
        translations: {
            da: "Modal verb (V1)?",
            en: "Modal verb (V1)?",
            de: "Hilfsverb / Modalverb?",
            ar: "فعل مساعد؟",
            es: "¿Verbo modal / auxiliar?",
            fa: "فعل کمکی؟",
            ku: "Lêkera alîkar?",
            ne: "सहायक क्रिया?",
            ps: "مرستندویه فعل؟",
            pt: "Verbo auxiliar?",
            ru: "Вспомогательный глагол?",
            th: "กริยาช่วย?",
            tr: "Yardımcı fiil?",
            uk: "Допоміжне дієслово?",
            ur: "امدادی فعل؟",
            vi: "Trợ động từ?",
            zh: "助动词？",
            sq: "Folje ndihmëse?"
        }
    },
    hovedverbum: {
        da: "Hovedverbum",
        defaultRole: "[Hovedverbum - V2]",
        translations: {
            da: "Main verb?",
            en: "Main verb?",
            de: "Hauptverb?",
            ar: "الفعل الرئيسي؟",
            es: "¿Verbo principal?",
            fa: "فعل اصلی؟",
            ku: "Lêkera sereke?",
            ne: "मुख्य क्रिया?",
            ps: "اصلي فعل؟",
            pt: "Verbo principal?",
            ru: "Основной глагол?",
            th: "กริยาหลัก?",
            tr: "Ana fiil?",
            uk: "Основне дієслово?",
            ur: "اہم فعل؟",
            vi: "Động từ chính?",
            zh: "主要动词？",
            sq: "Folja kryesore?"
        }
    },
    holdning: {
        da: "Hvad mener du?",
        defaultRole: "[Holdningsadverbium]",
        translations: {
            da: "Opinion / Attitude?",
            en: "Opinion / Attitude?",
            de: "Meinung / Haltung?",
            ar: "ما رأيك؟",
            es: "¿Qué opinas?",
            fa: "نظر شما چیست؟",
            ku: "Nêrîna te çi ye?",
            ne: "तपाईंको विचार?",
            ps: "ستاسو نظر؟",
            pt: "Qual sua opinião?",
            ru: "Каково ваше мнение?",
            th: "คุณคิดอย่างไร?",
            tr: "Ne düşünüyorsun?",
            uk: "Яка ваша думка?",
            ur: "آپ کی کیا رائے ہے؟",
            vi: "Ý kiến của bạn?",
            zh: "你的看法？",
            sq: "Çfarë mendoni?"
        }
    },
    ledsaetning: {
        da: "Ledsætning",
        defaultRole: "[Konjunktion / Bindeord]",
        translations: {
            da: "Subordinate clause?",
            en: "Subordinate clause?",
            de: "Nebensatz (Konjunktion)?",
            ar: "جملة فرعية؟",
            es: "¿Oración subordinada?",
            fa: "جمله پیرو؟",
            ku: "Hevoka alîkar?",
            ne: "उपवाक्य?",
            ps: "فرعي جمله؟",
            pt: "Oração subordinada?",
            ru: "Придаточное предложение?",
            th: "อนุประโยค?",
            tr: "Yan cümle?",
            uk: "Підрядне речення?",
            ur: "ذیلی جملہ؟",
            vi: "Mệnh đề phụ?",
            zh: "从句？",
            sq: "Fjali e varur?"
        }
    },
    forfelt: {
        da: "Forfelt",
        defaultRole: "[Forfelt - 1. plads]",
        translations: {
            da: "Front field (1st position)",
            en: "Front field (1st position)",
            de: "Vorfeld (1. Stelle)",
            ar: "الحقل الأمامي (الموقع الأول)",
            es: "Campo inicial (1ª posición)",
            fa: "موقعیت اول",
            ku: "Qada pêşî",
            ne: "अगाडिको स्थान",
            ps: "لومړی ځای",
            pt: "Posição inicial",
            ru: "Начальная позиция",
            th: "ตำแหน่งหน้า (ที่ 1)",
            tr: "Ön pozisyon (1. yer)",
            uk: "Початкова позиція (1-е місце)",
            ur: "پہلی جگہ",
            vi: "Vị trí đầu",
            zh: "前位（第1位）",
            sq: "Fusha e parë"
        }
    },
    slutfelt: {
        da: "Slutfelt",
        defaultRole: "[Slutfelt]",
        translations: {
            da: "End field (place / time)",
            en: "End field (place / time)",
            de: "Endfeld (Ort / Zeit)",
            ar: "الحقل النهائي (المكان / الزمان)",
            es: "Campo final (lugar / tiempo)",
            fa: "موقعیت نهایی (مکان / زمان)",
            ku: "Qada dawî",
            ne: "अन्तिम स्थान",
            ps: "وروستی ځای",
            pt: "Posição final (lugar / tempo)",
            ru: "Конечная позиция (место / время)",
            th: "ตำแหน่งท้าย (สถานที่ / เวลา)",
            tr: "Son pozisyon (yer / zaman)",
            uk: "Кінцева позиція (місце / час)",
            ur: "آخری جگہ",
            vi: "Vị trí cuối (nơi chốn / thời gian)",
            zh: "末位（地点 / 时间）",
            sq: "Fusha përfundimtare"
        }
    }
};

export function getOrdstillingSlotHint(key, numPrefix = '', customRole = null, lang = null) {
    const l = lang || getLang() || 'da';
    const def = ORDSTILLING_SLOT_DEFINITIONS[key] || ORDSTILLING_SLOT_DEFINITIONS['hvem_hvad'];
    const trans = def.translations[l] || def.translations['en'] || def.translations['da'];
    const daText = numPrefix ? `${numPrefix} ${def.da}` : def.da;
    return {
        danish: daText,
        translation: trans,
        role: customRole || def.defaultRole
    };
}

export function renderOrdstillingSlotInnerHtml(key, numPrefix = '', customRole = null, lang = null) {
    const hint = getOrdstillingSlotHint(key, numPrefix, customRole, lang);
    return `
        <span class="slot-hint">${hint.danish}</span>
        <span class="slot-trans">${hint.translation}</span>
        <span class="slot-role">${hint.role}</span>
    `;
}

export function renderCustomSlotInnerHtml(danishText, transText, roleText) {
    return `
        <span class="slot-hint">${danishText}</span>
        <span class="slot-trans">${transText}</span>
        <span class="slot-role">${roleText}</span>
    `;
}
