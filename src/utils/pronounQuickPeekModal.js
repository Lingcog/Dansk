import { getLang } from './i18n.js';

// TTS Helper
function speakDanish(text) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/»|«|“|”/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'da-DK';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

// Pronoun Registry with linguistic and pedagogical properties
export const allPronounsRegistry = {
    // 1. person ental
    "jeg": {
        word: "jeg",
        type: "subjekt",
        person: "1. person ental",
        subjekt: "jeg",
        objekt: "mig",
        possessiv: "min / mit / mine",
        roleDesc: "Subjektsform: Den der taler og udfører handlingen.",
        example: "Jeg tager til slottet.",
        navTarget: "p/subjekt",
        translations: {
            en: "I", de: "ich", ar: "أنا", es: "yo", fa: "من",
            ku: "ez", ne: "म", ps: "زه", pt: "eu", ru: "я",
            th: "ฉัน", tr: "ben", uk: "я", ur: "میں", vi: "tôi", zh: "我"
        }
    },
    "mig": {
        word: "mig",
        type: "objekt",
        person: "1. person ental",
        subjekt: "jeg",
        objekt: "mig",
        possessiv: "min / mit / mine",
        roleDesc: "Objektsform: Den som handlingen retter sig mod, eller efter præposition.",
        example: "Prinsessen kigger på mig.",
        navTarget: "p/objekt",
        translations: {
            en: "me", de: "mich / mir", ar: "لي / إياي", es: "me / mí", fa: "مرا / به من",
            ku: "min", ne: "मलाई", ps: "ما / ماته", pt: "me / mim", ru: "меня / мне",
            th: "ฉัน (กรรม)", tr: "beni / bana", uk: "мене / мені", ur: "مجھے", vi: "tôi (tân ngữ)", zh: "我（宾格）"
        }
    },
    "min": {
        word: "min (mit / mine)",
        type: "possessiv",
        person: "1. person ental",
        subjekt: "jeg",
        objekt: "mig",
        possessiv: "min (fælleskøn) / mit (intetkøn) / mine (flertal)",
        roleDesc: "Possessivt pronomen: Viser ejerskab (hvem der ejer tingen).",
        example: "Jeg tager min ged.",
        navTarget: "p/possessiv",
        translations: {
            en: "my / mine", de: "mein / meine", ar: "لي / خاصتي", es: "mi / mío", fa: "مال من",
            ku: "ya min", ne: "मेरो", ps: "زما", pt: "meu / minha", ru: "мой / моя / моё",
            th: "ของฉัน", tr: "benim", uk: "мій / моя / моє", ur: "میرا", vi: "của tôi", zh: "我的"
        }
    },

    // 2. person ental
    "du": {
        word: "du",
        type: "subjekt",
        person: "2. person ental",
        subjekt: "du",
        objekt: "dig",
        possessiv: "din / dit / dine",
        roleDesc: "Subjektsform: Den person man taler direkte til.",
        example: "Hvor er du på vej hen?",
        navTarget: "p/subjekt",
        translations: {
            en: "you", de: "du", ar: "أنتَ / أنتِ", es: "tú", fa: "تو",
            ku: "tu", ne: "तपाईं / तँ", ps: "تاسو / ته", pt: "você / tu", ru: "ты",
            th: "คุณ", tr: "sen", uk: "ти", ur: "تم / آپ", vi: "bạn", zh: "你"
        }
    },
    "dig": {
        word: "dig",
        type: "objekt",
        person: "2. person ental",
        subjekt: "du",
        objekt: "dig",
        possessiv: "din / dit / dine",
        roleDesc: "Objektsform: Den person man taler til, når personen er objekt eller efter præposition.",
        example: "Jeg hjælper dig på vejen.",
        navTarget: "p/objekt",
        translations: {
            en: "you (object)", de: "dich / dir", ar: "لكَ / إياك", es: "te / ti", fa: "تو را / به تو",
            ku: "te", ne: "तपाईंलाई", ps: "تاته", pt: "te / você", ru: "тебя / тебе",
            th: "คุณ (กรรม)", tr: "seni / sana", uk: "тебе / тобі", ur: "تمہیں", vi: "bạn (tân ngữ)", zh: "你（宾格）"
        }
    },
    "din": {
        word: "din (dit / dine)",
        type: "possessiv",
        person: "2. person ental",
        subjekt: "du",
        objekt: "dig",
        possessiv: "din (fælleskøn) / dit (intetkøn) / dine (flertal)",
        roleDesc: "Possessivt pronomen: Viser hvad den anden person ejer.",
        example: "Hvor er din træsko?",
        navTarget: "p/possessiv",
        translations: {
            en: "your / yours", de: "dein / deine", ar: "لكَ / خاصتك", es: "tu / tuyo", fa: "مال تو",
            ku: "ya te", ne: "तपाईंको", ps: "ستا", pt: "seu / sua", ru: "твой / твоя",
            th: "ของคุณ", tr: "senin", uk: "твій / твоя", ur: "تمہارا", vi: "của bạn", zh: "你的"
        }
    },

    // 3. person ental maskulin
    "han": {
        word: "han",
        type: "subjekt",
        person: "3. person ental (hankøn)",
        subjekt: "han",
        objekt: "ham",
        possessiv: "hans",
        roleDesc: "Subjektsform: En mand eller dreng der omtales.",
        example: "Han rider på en hvid ged.",
        navTarget: "p/subjekt",
        translations: {
            en: "he", de: "er", ar: "هو", es: "él", fa: "او (مرد)",
            ku: "ew (nêr)", ne: "उनी / ऊ", ps: "هغه (نارینه)", pt: "ele", ru: "он",
            th: "เขา (ผู้ชาย)", tr: "o (erkek)", uk: "він", ur: "وہ (مرد)", vi: "anh ấy", zh: "他"
        }
    },
    "ham": {
        word: "ham",
        type: "objekt",
        person: "3. person ental (hankøn)",
        subjekt: "han",
        objekt: "ham",
        possessiv: "hans",
        roleDesc: "Objektsform: En mand/dreng der er genstand for handlingen eller efter præposition.",
        example: "Prinsessen taler med ham.",
        navTarget: "p/objekt",
        translations: {
            en: "him", de: "ihn / ihm", ar: "إياه / له", es: "le / lo / a él", fa: "او را / به او",
            ku: "wî", ne: "उनलाई", ps: "هغه ته", pt: "o / lhe / a ele", ru: "его / ему",
            th: "เขา (ผู้ชาย - กรรม)", tr: "onu / ona", uk: "його / йому", ur: "اسے (مرد)", vi: "anh ấy (tân ngữ)", zh: "他（宾格）"
        }
    },
    "hans": {
        word: "hans",
        type: "possessiv",
        person: "3. person ental (hankøn)",
        subjekt: "han",
        objekt: "ham",
        possessiv: "hans (uforanderlig form)",
        roleDesc: "Possessivt pronomen: Viser hvad manden eller drengen ejer.",
        example: "Kongen har sagt, at hans datter skal finde en mand.",
        navTarget: "p/possessiv",
        translations: {
            en: "his", de: "sein / seine", ar: "له / خاصته", es: "su / suyo (de él)", fa: "مال او (مرد)",
            ku: "yê wî", ne: "उसको", ps: "د هغه", pt: "dele / seu", ru: "его",
            th: "ของเขา", tr: "onun (erkek)", uk: "його", ur: "اس کا", vi: "của anh ấy", zh: "他的"
        }
    },

    // 3. person ental feminin
    "hun": {
        word: "hun",
        type: "subjekt",
        person: "3. person ental (hunkøn)",
        subjekt: "hun",
        objekt: "hende",
        possessiv: "hendes",
        roleDesc: "Subjektsform: En kvinde eller pige der omtales som grundled.",
        example: "Hun bor på det store slot.",
        navTarget: "p/subjekt",
        translations: {
            en: "she", de: "sie", ar: "هي", es: "ella", fa: "او (زن)",
            ku: "ew (mê)", ne: "उनी (महिला)", ps: "هغه (ښځینه)", pt: "ela", ru: "она",
            th: "เธอ (ผู้หญิง)", tr: "o (kadın)", uk: "вона", ur: "وہ (عورت)", vi: "cô ấy", zh: "她"
        }
    },
    "hende": {
        word: "hende",
        type: "objekt",
        person: "3. person ental (hunkøn)",
        subjekt: "hun",
        objekt: "hende",
        possessiv: "hendes",
        roleDesc: "Objektsform: En kvinde/pige der er genstandsled eller styrelse for præposition.",
        example: "Den, der taler bedst, vinder hende.",
        navTarget: "p/objekt",
        translations: {
            en: "her (object)", de: "sie / ihr", ar: "إياها / لها", es: "la / le / a ella", fa: "او را / به او (زن)",
            ku: "wê", ne: "उनलाई (महिला)", ps: "هغې ته", pt: "a / lhe / a ela", ru: "её / ей",
            th: "เธอ (ผู้หญิง - กรรม)", tr: "onu / ona (kadın)", uk: "її / їй", ur: "اسے (عورت)", vi: "cô ấy (tân ngữ)", zh: "她（宾格）"
        }
    },
    "hendes": {
        word: "hendes",
        type: "possessiv",
        person: "3. person ental (hunkøn)",
        subjekt: "hun",
        objekt: "hende",
        possessiv: "hendes (uforanderlig form)",
        roleDesc: "Possessivt pronomen: Viser hvad kvinden eller pigen ejer.",
        example: "Klods-Hans har vundet hendes hjerte.",
        navTarget: "p/possessiv",
        translations: {
            en: "her / hers", de: "ihr / ihre", ar: "لها / خاصتها", es: "su / suyo (de ella)", fa: "مال او (زن)",
            ku: "ya wê", ne: "उनको (महिला)", ps: "د هغې", pt: "dela / seu", ru: "её",
            th: "ของเธอ", tr: "onun (kadın)", uk: "її", ur: "اس کی", vi: "của cô ấy", zh: "她的"
        }
    },

    // 3. person fælles- og intetkøn (den / det)
    "den": {
        word: "den",
        type: "subjekt/objekt",
        person: "3. person ental (fælleskøn)",
        subjekt: "den",
        objekt: "den",
        possessiv: "dens",
        roleDesc: "Henviser til et en-ord (ting eller dyr som 'en krage', 'en ged', 'en datter').",
        example: "Jeg vil stege den i træskoen.",
        navTarget: "p/objekt",
        translations: {
            en: "it (common gender)", de: "es / ihn / sie", ar: "هو / هي (للجماد)", es: "él / ella / ello", fa: "آن",
            ku: "ew", ne: "त्यो", ps: "هغه", pt: "ele / ela", ru: "он / она / оно",
            th: "มัน", tr: "o (nesne)", uk: "він / вона / воно", ur: "وہ", vi: "nó", zh: "它"
        }
    },
    "det": {
        word: "det",
        type: "subjekt/objekt",
        person: "3. person ental (intetkøn / formelt)",
        subjekt: "det",
        objekt: "det",
        possessiv: "dets",
        roleDesc: "Henviser til et et-ord ('et slot') eller fungerer som formelt subjekt ('Det er varmt').",
        example: "Det er så varmt i stuen.",
        navTarget: "p/subjekt",
        translations: {
            en: "it", de: "es", ar: "هو / ذلك", es: "eso / ello", fa: "آن",
            ku: "ew", ne: "त्यो", ps: "دا / هغه", pt: "isso / ele", ru: "это / оно",
            th: "มัน / สิ่งนั้น", tr: "o / bu", uk: "це / воно", ur: "یہ / وہ", vi: "nó / điều đó", zh: "它 / 这"
        }
    },

    // 2. person flertal
    "i": {
        word: "I",
        type: "subjekt",
        person: "2. person flertal",
        subjekt: "I",
        objekt: "jer",
        possessiv: "jeres",
        roleDesc: "Subjektsform: Flere personer som man taler direkte til (staves altid med stort I).",
        example: "Kongen sagde: »Vis hvad I kan!«",
        navTarget: "p/subjekt",
        translations: {
            en: "you (plural)", de: "ihr", ar: "أنتم / أنتن", es: "vosotros / ustedes", fa: "شما (جمع)",
            ku: "hûn", ne: "तपाईंहरू", ps: "تاسو (جمع)", pt: "vocês", ru: "вы",
            th: "พวกคุณ", tr: "siz (çoğul)", uk: "ви", ur: "آپ لوگ", vi: "các bạn", zh: "你们"
        }
    },
    "vi": {
        word: "vi",
        type: "subjekt",
        person: "1. person flertal",
        subjekt: "vi",
        objekt: "os",
        possessiv: "vores",
        roleDesc: "Subjektsform: Gruppen inklusive den talende selv.",
        example: "Nu rider vi til slottet.",
        navTarget: "p/subjekt",
        translations: {
            en: "we", de: "wir", ar: "نحن", es: "nosotros", fa: "ما",
            ku: "em", ne: "हामी", ps: "موږ", pt: "nós", ru: "мы",
            th: "พวกเรา", tr: "biz", uk: "ми", ur: "ہم", vi: "chúng tôi", zh: "我们"
        }
    },
    "de": {
        word: "de",
        type: "subjekt",
        person: "3. person flertal",
        subjekt: "de",
        objekt: "dem",
        possessiv: "deres",
        roleDesc: "Subjektsform: Flere personer eller ting der omtales.",
        example: "De to brødre kunne ikke tale.",
        navTarget: "p/subjekt",
        translations: {
            en: "they", de: "sie (Plural)", ar: "هم / هن", es: "ellos / ellas", fa: "آنها",
            ku: "ew (pirjimar)", ne: "उनीहरू", ps: "دوی", pt: "eles / elas", ru: "они",
            th: "พวกเขา", tr: "onlar", uk: "вони", ur: "وہ (جمع)", vi: "họ", zh: "他们"
        }
    }
};

function ensurePronounStyles() {
    if (document.getElementById('pronoun-quick-peek-styles')) return;

    const style = document.createElement('style');
    style.id = 'pronoun-quick-peek-styles';
    style.textContent = `
        .pronoun-peek-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.78);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            animation: prFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            box-sizing: border-box;
        }
        @keyframes prFadeIn {
            from { opacity: 0; transform: scale(0.96); }
            to { opacity: 1; transform: scale(1); }
        }
        .pronoun-peek-overlay.fade-out {
            animation: prFadeOut 0.16s ease forwards;
        }
        @keyframes prFadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.96); }
        }
        .pronoun-peek-modal {
            background: rgba(15, 23, 42, 0.96);
            border: 2px solid #ec4899;
            border-radius: 20px;
            width: 100%;
            max-width: 520px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(236, 72, 153, 0.35);
            color: #f8fafc;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            animation: prSlideUp 0.22s ease-out;
        }
        @keyframes prSlideUp {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .pr-header {
            background: linear-gradient(135deg, rgba(236, 72, 153, 0.25), rgba(15, 23, 42, 0.9));
            padding: 1.1rem 1.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(236, 72, 153, 0.3);
        }
        .pr-badge {
            background: rgba(236, 72, 153, 0.2);
            border: 1px solid #ec4899;
            color: #f472b6;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .pr-close-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #94a3b8;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            cursor: pointer;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        .pr-close-btn:hover {
            background: rgba(236, 72, 153, 0.3);
            color: white;
            transform: scale(1.1);
        }
        .pr-body {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
        }
        .pr-title-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.8rem;
        }
        .pr-word-title {
            font-size: 1.9rem;
            font-weight: 800;
            color: #f472b6;
            margin: 0;
        }
        .pr-tts-btn {
            background: rgba(236, 72, 153, 0.18);
            border: 1px solid rgba(236, 72, 153, 0.45);
            color: #f472b6;
            padding: 0.4rem 0.85rem;
            border-radius: 10px;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s;
        }
        .pr-tts-btn:hover {
            background: #ec4899;
            color: white;
            transform: scale(1.05);
        }
        .pr-table-card {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 14px;
            padding: 0.9rem 1.1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .pr-table-label {
            font-size: 0.76rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #94a3b8;
        }
        .pr-grid-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 0.5rem;
            text-align: center;
            margin-top: 0.2rem;
        }
        .pr-col {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.5rem 0.3rem;
            border-radius: 8px;
        }
        .pr-col.active {
            border-color: #ec4899;
            background: rgba(236, 72, 153, 0.18);
        }
        .pr-col-head {
            font-size: 0.7rem;
            color: #94a3b8;
            text-transform: uppercase;
            margin-bottom: 0.2rem;
        }
        .pr-col-val {
            font-size: 0.95rem;
            font-weight: 700;
            color: #f8fafc;
        }
        .pr-col.active .pr-col-val {
            color: #f472b6;
            font-weight: 800;
        }
        .pr-role-desc {
            font-size: 0.95rem;
            color: #e2e8f0;
            line-height: 1.45;
            margin: 0;
        }
        .pr-sentence-card {
            background: rgba(236, 72, 153, 0.08);
            border-left: 3px solid #ec4899;
            padding: 0.7rem 1rem;
            border-radius: 0 10px 10px 0;
            color: #fce7f3;
            font-size: 0.95rem;
            font-style: italic;
        }
        .pr-translation-wrapper {
            margin-top: 0.2rem;
        }
        .pr-reveal-btn {
            width: 100%;
            background: rgba(255, 255, 255, 0.06);
            border: 1px dashed rgba(236, 72, 153, 0.4);
            color: #f472b6;
            padding: 0.55rem 1rem;
            border-radius: 10px;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        .pr-reveal-btn:hover {
            background: rgba(236, 72, 153, 0.15);
            border-style: solid;
        }
        .pr-trans-card {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(236, 72, 153, 0.4);
            padding: 0.6rem 1rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.92rem;
        }
        .pr-trans-val {
            color: #f472b6;
            font-weight: 700;
            font-size: 1.05rem;
        }
        .pr-action-btn {
            background: linear-gradient(135deg, #ec4899, #db2777);
            color: white;
            border: none;
            padding: 0.85rem 1.4rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.98rem;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 6px 18px rgba(236, 72, 153, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 0.4rem;
        }
        .pr-action-btn:hover {
            background: linear-gradient(135deg, #f472b6, #ec4899);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(236, 72, 153, 0.6);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Open Pronoun Quick Peek Modal
 * @param {string} rawWord - e.g. "hende", "jeg", "min"
 * @param {string} sentenceContext - optional example sentence or context
 * @param {function} navigateFn - app navigation callback
 */
export function openPronounQuickPeekModal(rawWord, sentenceContext = '', navigateFn = null) {
    ensurePronounStyles();

    const cleanWord = rawWord.toLowerCase().replace(/[.,!?:;»«"']/g, '').trim();
    const entry = allPronounsRegistry[cleanWord] || {
        word: rawWord,
        type: "pronomen",
        person: "Pronomen (stedord)",
        subjekt: cleanWord,
        objekt: "-",
        possessiv: "-",
        roleDesc: "Et pronomen (stedord) der erstatter eller henviser til en person eller ting.",
        example: sentenceContext || "Ordet fungerer som pronomen i sætningen.",
        navTarget: "p",
        translations: {}
    };

    const existing = document.querySelector('.pronoun-peek-overlay');
    if (existing) existing.remove();

    const lang = getLang ? getLang() : 'da';
    const translationText = entry.translations[lang] || entry.translations['en'] || cleanWord;

    const overlay = document.createElement('div');
    overlay.className = 'pronoun-peek-overlay';

    let typeBadgeText = '👤 Subjektspronomen';
    if (entry.type === 'objekt') typeBadgeText = '🎯 Objektspronomen';
    else if (entry.type === 'possessiv') typeBadgeText = '🔑 Possessivt pronomen';
    else if (entry.type.includes('objekt')) typeBadgeText = '🎯 Objektspronomen';

    overlay.innerHTML = `
        <div class="pronoun-peek-modal">
            <div class="pr-header">
                <span class="pr-badge">
                    <span>💗</span>
                    <span>${typeBadgeText}</span>
                </span>
                <button class="pr-close-btn" id="pr-close-x" title="Luk">✕</button>
            </div>
            
            <div class="pr-body">
                <div class="pr-title-row">
                    <h2 class="pr-word-title">${entry.word}</h2>
                    <button class="pr-tts-btn" id="pr-speak-btn" title="Hør udtale">
                        <span>🔊</span> Lyt
                    </button>
                </div>

                <div class="pr-table-card">
                    <span class="pr-table-label">${entry.person} – Bøjningsrække:</span>
                    <div class="pr-grid-row">
                        <div class="pr-col ${entry.type === 'subjekt' || entry.type.includes('subjekt') ? 'active' : ''}">
                            <div class="pr-col-head">Subjekt</div>
                            <div class="pr-col-val">${entry.subjekt}</div>
                        </div>
                        <div class="pr-col ${entry.type === 'objekt' || entry.type.includes('objekt') ? 'active' : ''}">
                            <div class="pr-col-head">Objekt</div>
                            <div class="pr-col-val">${entry.objekt}</div>
                        </div>
                        <div class="pr-col ${entry.type === 'possessiv' ? 'active' : ''}">
                            <div class="pr-col-head">Possessiv</div>
                            <div class="pr-col-val" style="font-size: 0.85rem;">${entry.possessiv}</div>
                        </div>
                    </div>
                </div>

                <p class="pr-role-desc">
                    💡 ${entry.roleDesc}
                </p>

                <div class="pr-sentence-card">
                    💬 "${sentenceContext || entry.example}"
                </div>

                <div class="pr-translation-wrapper">
                    <button class="pr-reveal-btn" id="pr-reveal-btn">
                        <span>🌍</span> Er du i tvivl om ordet? Vis oversættelse
                    </button>
                    <div class="pr-trans-card" id="pr-trans-card" style="display: none;">
                        <span>Oversættelse (${lang.toUpperCase()}):</span>
                        <span class="pr-trans-val">${translationText}</span>
                    </div>
                </div>

                ${navigateFn ? `
                    <button class="pr-action-btn" id="pr-goto-btn">
                        Træn pronominer i Pronomen-fladen ➔
                    </button>
                ` : ''}
            </div>
        </div>
    `;

    function closeModal() {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 160);
    }

    overlay.querySelector('#pr-close-x').onclick = closeModal;
    overlay.onclick = (e) => {
        if (e.target === overlay) closeModal();
    };

    overlay.querySelector('#pr-speak-btn').onclick = () => speakDanish(cleanWord);

    const revealBtn = overlay.querySelector('#pr-reveal-btn');
    const transCard = overlay.querySelector('#pr-trans-card');
    if (revealBtn && transCard) {
        revealBtn.onclick = () => {
            revealBtn.style.display = 'none';
            transCard.style.display = 'flex';
        };
    }

    const gotoBtn = overlay.querySelector('#pr-goto-btn');
    if (gotoBtn && navigateFn) {
        gotoBtn.onclick = () => {
            closeModal();
            navigateFn('pronomen', { subPath: entry.navTarget || 'p' });
        };
    }

    document.body.appendChild(overlay);
    speakDanish(cleanWord);
}
