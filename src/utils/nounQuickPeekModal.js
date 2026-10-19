import { getLang } from './i18n.js';
import {
    byrumWordTranslations,
    kitchenWordTranslations,
    klasseWordTranslations,
    naturWordTranslations,
    stationWordTranslations
} from './top100_translations.js';

// Merged translations across all 5 scenes
const sceneWordTranslations = {
    ...byrumWordTranslations,
    ...kitchenWordTranslations,
    ...klasseWordTranslations,
    ...naturWordTranslations,
    ...stationWordTranslations
};

// TTS Helper
function speakDanish(text) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'da-DK';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

// 101 High Frequency Danish Nouns
export const allNounsRegistry = {
    "sol": {
        "clean": "sol",
        "word": "en sol",
        "gender": "en",
        "bestemt": "solen",
        "flertal": "sole",
        "x": 65,
        "y": 8,
        "icon": "☀️",
        "sentence": "Solen skinner.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "tid": {
        "clean": "tid",
        "word": "en tid",
        "gender": "en",
        "bestemt": "tiden",
        "flertal": "tider",
        "x": 56,
        "y": 17,
        "icon": "⏰",
        "sentence": "Uret viser tiden.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "by": {
        "clean": "by",
        "word": "en by",
        "gender": "en",
        "bestemt": "byen",
        "flertal": "byer",
        "x": 35,
        "y": 25,
        "icon": "🏙️",
        "sentence": "Hun bor i en stor by.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "hus": {
        "clean": "hus",
        "word": "et hus",
        "gender": "et",
        "bestemt": "huset",
        "flertal": "huse",
        "x": 10,
        "y": 15,
        "icon": "🏠",
        "sentence": "Hun bor i et gult hus.",
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "translations": {
            "da": "et hus",
            "en": "a house",
            "de": "ein Haus",
            "es": "una casa",
            "ar": "منزل / بيت",
            "fa": "یک خانه",
            "ku": "xaniyek",
            "tr": "bir ev",
            "uk": "будинок",
            "ru": "дом",
            "vi": "một ngôi nhà",
            "zh": "一栋房子",
            "th": "บ้าน",
            "pt": "uma casa",
            "ur": "ایک گھر",
            "ne": "एउटा घर",
            "ps": "یو کور"
        }
    },
    "vindue": {
        "clean": "vindue",
        "word": "et vindue",
        "gender": "et",
        "bestemt": "vinduet",
        "flertal": "vinduer",
        "x": 4,
        "y": 12,
        "icon": "🪟",
        "sentence": "Vinduet er åbent.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "virksomhed": {
        "clean": "virksomhed",
        "word": "en café",
        "gender": "en",
        "bestemt": "caféen",
        "flertal": "caféer",
        "x": 21,
        "y": 32,
        "icon": "☕",
        "sentence": "De sidder på en café.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "penge": {
        "clean": "penge",
        "word": "penge",
        "gender": "en",
        "bestemt": "pengene",
        "flertal": "penge",
        "x": 8.5,
        "y": 63,
        "icon": "🪙",
        "sentence": "Kunden bruger penge.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "krone": {
        "clean": "krone",
        "word": "en krone",
        "gender": "en",
        "bestemt": "kronen",
        "flertal": "kroner",
        "x": 5.5,
        "y": 55,
        "icon": "🏷️",
        "sentence": "Brødet koster tyve kroner.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "arbejde": {
        "clean": "arbejde",
        "word": "et arbejde",
        "gender": "et",
        "bestemt": "arbejdet",
        "flertal": "arbejder",
        "x": 14,
        "y": 56,
        "icon": "💼",
        "sentence": "Hun har et godt arbejde.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "læge": {
        "clean": "læge",
        "word": "en læge",
        "gender": "en",
        "bestemt": "lægen",
        "flertal": "læger",
        "x": 21,
        "y": 74,
        "icon": "🩺",
        "sentence": "Lægen går på gaden.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "hund": {
        "clean": "hund",
        "word": "en hund",
        "gender": "en",
        "bestemt": "hunden",
        "flertal": "hunde",
        "x": 29.5,
        "y": 88,
        "icon": "🐕",
        "sentence": "Manden går med en hund.",
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "translations": {
            "da": "en hund",
            "en": "a dog",
            "de": "ein Hund",
            "es": "un perro",
            "ar": "كلب",
            "fa": "یک سگ",
            "ku": "kûçikek",
            "tr": "bir köpek",
            "uk": "собака / пес",
            "ru": "собака",
            "vi": "một con chó",
            "zh": "一只狗",
            "th": "สุนัข / หมา",
            "pt": "um cão / cachorro",
            "ur": "ایک کتا",
            "ne": "एउटा कुकुर",
            "ps": "یو سپی"
        }
    },
    "træ": {
        "clean": "træ",
        "word": "et træ",
        "gender": "et",
        "bestemt": "træet",
        "flertal": "træer",
        "x": 39,
        "y": 24,
        "icon": "🌳",
        "sentence": "Der står et stort træ.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "kvinde": {
        "clean": "kvinde",
        "word": "en kvinde",
        "gender": "en",
        "bestemt": "kvinden",
        "flertal": "kvinder",
        "x": 42,
        "y": 68,
        "icon": "👩",
        "sentence": "En kvinde cykler på gaden.",
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "translations": {
            "da": "en kvinde",
            "en": "a woman",
            "de": "eine Frau",
            "es": "una mujer",
            "ar": "امرأة",
            "fa": "یک زن",
            "ku": "jinek",
            "tr": "bir kadın",
            "uk": "жінка",
            "ru": "женщина",
            "vi": "một người phụ nữ",
            "zh": "一位女士 / 妇女",
            "th": "ผู้หญิง",
            "pt": "uma mulher",
            "ur": "ایک عورت",
            "ne": "एउटी महिला",
            "ps": "یوه ښځه"
        }
    },
    "tur": {
        "clean": "tur",
        "word": "en tur",
        "gender": "en",
        "bestemt": "turen",
        "flertal": "ture",
        "x": 43.5,
        "y": 82,
        "icon": "🚲",
        "sentence": "Hun går en tur.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "vej": {
        "clean": "vej",
        "word": "en vej",
        "gender": "en",
        "bestemt": "vejen",
        "flertal": "veje",
        "x": 47,
        "y": 74,
        "icon": "🛣️",
        "sentence": "Der er biler og cykler på vejen.",
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "translations": {
            "da": "en vej",
            "en": "a street / road",
            "de": "eine Straße / ein Weg",
            "es": "una calle / carretera",
            "ar": "طريق / شارع",
            "fa": "یک خیابان / جاده",
            "ku": "rêyek",
            "tr": "bir yol / sokak",
            "uk": "дорога / вулиця",
            "ru": "дорога / улица",
            "vi": "một con đường",
            "zh": "一条道路/马路",
            "th": "ถนน",
            "pt": "uma rua / estrada",
            "ur": "ایک سڑک",
            "ne": "एउटा बाटो / सडक",
            "ps": "یوه لاره"
        }
    },
    "familie": {
        "clean": "familie",
        "word": "en familie",
        "gender": "en",
        "bestemt": "familien",
        "flertal": "familier",
        "x": 50,
        "y": 58,
        "icon": "👨‍👩‍👧",
        "sentence": "En familie går en tur.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "barn": {
        "clean": "barn",
        "word": "et barn",
        "gender": "et",
        "bestemt": "barnet",
        "flertal": "børn",
        "x": 55.5,
        "y": 63,
        "icon": "👶",
        "sentence": "Barnet smiler.",
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "translations": {
            "da": "et barn",
            "en": "a child",
            "de": "ein Kind",
            "es": "un niño",
            "ar": "طفل",
            "fa": "یک کودک",
            "ku": "zarokek",
            "tr": "bir çocuk",
            "uk": "дитина",
            "ru": "ребёнок",
            "vi": "một đứa trẻ",
            "zh": "一个小孩",
            "th": "เด็ก",
            "pt": "uma criança",
            "ur": "ایک बच्चा",
            "ne": "एउटा बच्चा",
            "ps": "یو ماشوم"
        }
    },
    "plads": {
        "clean": "plads",
        "word": "en plads",
        "gender": "en",
        "bestemt": "pladsen",
        "flertal": "pladser",
        "x": 63,
        "y": 56,
        "icon": "🏛️",
        "sentence": "Der er mange på pladsen.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "dreng": {
        "clean": "dreng",
        "word": "en dreng",
        "gender": "en",
        "bestemt": "drengen",
        "flertal": "drenge",
        "x": 62.5,
        "y": 58,
        "icon": "👦",
        "sentence": "En dreng leger i solen.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "pige": {
        "clean": "pige",
        "word": "en pige",
        "gender": "en",
        "bestemt": "pigen",
        "flertal": "piger",
        "x": 82,
        "y": 53,
        "icon": "👧",
        "sentence": "En pige går i skole.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "skole": {
        "clean": "skole",
        "word": "en skole",
        "gender": "en",
        "bestemt": "skolen",
        "flertal": "skoler",
        "x": 88,
        "y": 28,
        "icon": "🏫",
        "sentence": "Børnene går i skole.",
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "translations": {
            "da": "en skole",
            "en": "a school",
            "de": "eine Schule",
            "es": "una escuela",
            "ar": "مدرسة",
            "fa": "یک مدرسه",
            "ku": "dibistanek",
            "tr": "bir okul",
            "uk": "школа",
            "ru": "школа",
            "vi": "một trường học",
            "zh": "一所学校",
            "th": "โรงเรียน",
            "pt": "uma escola",
            "ur": "ایک اسکول",
            "ne": "एउटा विद्यालय",
            "ps": "یو ښوونځی"
        }
    },
    "dør": {
        "clean": "dør",
        "word": "en dør",
        "gender": "en",
        "bestemt": "døren",
        "flertal": "døre",
        "x": 88,
        "y": 44,
        "icon": "🚪",
        "sentence": "Døren er åben.",
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "translations": {
            "da": "en dør",
            "en": "a door",
            "de": "eine Tür",
            "es": "una puerta",
            "ar": "باب",
            "fa": "یک در",
            "ku": "deriyek",
            "tr": "bir kapı",
            "uk": "двері",
            "ru": "дверь",
            "vi": "một cánh cửa",
            "zh": "一扇门",
            "th": "ประตู",
            "pt": "uma porta",
            "ur": "ایک دروازہ",
            "ne": "एउटा ढोка",
            "ps": "یوه دروازه"
        }
    },
    "ven": {
        "clean": "ven",
        "word": "en ven",
        "gender": "en",
        "bestemt": "vennen",
        "flertal": "venner",
        "x": 64,
        "y": 56,
        "icon": "🫂",
        "sentence": "Hun taler med en ven.",
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "translations": {
            "da": "en ven",
            "en": "a friend",
            "de": "ein Freund",
            "es": "un amigo",
            "ar": "صديق",
            "fa": "یک دوست",
            "ku": "hevalek",
            "tr": "bir arkadaş / dost",
            "uk": "друг",
            "ru": "друг",
            "vi": "một người bạn",
            "zh": "一位朋友",
            "th": "เพื่อน",
            "pt": "um amigo",
            "ur": "ایک دوست",
            "ne": "एउटा साथी",
            "ps": "یو ملګری"
        }
    },
    "bil": {
        "clean": "bil",
        "word": "en bil",
        "gender": "en",
        "bestemt": "bilen",
        "flertal": "biler",
        "x": 71,
        "y": 76,
        "icon": "🚗",
        "sentence": "En bil holder på vejen.",
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "translations": {
            "da": "en bil",
            "en": "a car",
            "de": "ein Auto",
            "es": "un coche",
            "ar": "سيارة",
            "fa": "یک ماشین",
            "ku": "erebeyek",
            "tr": "bir araba",
            "uk": "автомобіль",
            "ru": "машина",
            "vi": "một chiếc xe hơi",
            "zh": "一辆汽车",
            "th": "รถยนต์",
            "pt": "um carro",
            "ur": "ایک گاڑی",
            "ne": "एउटा कार",
            "ps": "یو موټر"
        }
    },
    "mand": {
        "clean": "mand",
        "word": "en mand",
        "gender": "en",
        "bestemt": "manden",
        "flertal": "mænd",
        "x": 78.5,
        "y": 71,
        "icon": "👨",
        "sentence": "En mand står på gaden.",
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "translations": {
            "da": "en mand",
            "en": "a man",
            "de": "ein Mann",
            "es": "un hombre",
            "ar": "رجل",
            "fa": "یک مرد",
            "ku": "mêrek",
            "tr": "bir adam",
            "uk": "чоловік",
            "ru": "мужчина",
            "vi": "một người đàn ông",
            "zh": "一个男人",
            "th": "ผู้ชาย",
            "pt": "um homem",
            "ur": "ایک آدمی",
            "ne": "एक पुरुष",
            "ps": "یو سړی"
        }
    },
    "problem": {
        "clean": "problem",
        "word": "et problem",
        "gender": "et",
        "bestemt": "problemet",
        "flertal": "problemer",
        "x": 75,
        "y": 68,
        "icon": "⚠️",
        "sentence": "Manden har et problem.",
        "sceneImage": "assets/byrum_vrimmel.jpg"
    },
    "kat": {
        "clean": "kat",
        "word": "en kat",
        "gender": "en",
        "bestemt": "katten",
        "flertal": "katte",
        "x": 18.5,
        "y": 67,
        "icon": "🐈",
        "sentence": "Katten kigger på madskålen.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "mor": {
        "clean": "mor",
        "word": "en mor",
        "gender": "en",
        "bestemt": "moren",
        "flertal": "mødre",
        "x": 34,
        "y": 44,
        "icon": "👩",
        "sentence": "Moren laver mad.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "far": {
        "clean": "far",
        "word": "en far",
        "gender": "en",
        "bestemt": "faren",
        "flertal": "fædre",
        "x": 49,
        "y": 46,
        "icon": "👨",
        "sentence": "Faren taler ved bordet.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "seng": {
        "clean": "seng",
        "word": "en seng",
        "gender": "en",
        "bestemt": "sengen",
        "flertal": "senge",
        "x": 60,
        "y": 38,
        "icon": "🛏️",
        "sentence": "Sengen står inde i soveværelset.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "tøj": {
        "clean": "tøj",
        "word": "et stykke tøj",
        "gender": "et",
        "bestemt": "tøjet",
        "flertal": "tøj",
        "x": 71,
        "y": 32,
        "icon": "🧥",
        "sentence": "Tøjet hænger på en knage.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "sko": {
        "clean": "sko",
        "word": "en sko",
        "gender": "en",
        "bestemt": "skoen",
        "flertal": "sko",
        "x": 71,
        "y": 53,
        "icon": "👟",
        "sentence": "Skoene står på gulvet.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "stol": {
        "clean": "stol",
        "word": "en stol",
        "gender": "en",
        "bestemt": "stolen",
        "flertal": "stole",
        "x": 29,
        "y": 83,
        "icon": "🪑",
        "sentence": "Drengen sidder på en stol.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "mad": {
        "clean": "mad",
        "word": "en mad",
        "gender": "en",
        "bestemt": "maden",
        "flertal": "madder",
        "x": 38,
        "y": 64,
        "icon": "🍞",
        "sentence": "De spiser mad sammen.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "kop": {
        "clean": "kop",
        "word": "en kop",
        "gender": "en",
        "bestemt": "koppen",
        "flertal": "kopper",
        "x": 42,
        "y": 58,
        "icon": "☕",
        "sentence": "Hun drikker en kop kaffe.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "kød": {
        "clean": "kød",
        "word": "et kød",
        "gender": "et",
        "bestemt": "kødet",
        "flertal": "kød",
        "x": 44.5,
        "y": 68,
        "icon": "🥩",
        "sentence": "De spiser kød til aften.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "fisk": {
        "clean": "fisk",
        "word": "en fisk",
        "gender": "en",
        "bestemt": "fisken",
        "flertal": "fisk",
        "x": 47.5,
        "y": 70,
        "icon": "🐟",
        "sentence": "De spiser fisk til frokost.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "glas": {
        "clean": "glas",
        "word": "et glas",
        "gender": "et",
        "bestemt": "glasset",
        "flertal": "glas",
        "x": 54.5,
        "y": 64,
        "icon": "🥛",
        "sentence": "Hun drikker et glas vand.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "bord": {
        "clean": "bord",
        "word": "et bord",
        "gender": "et",
        "bestemt": "bordet",
        "flertal": "borde",
        "x": 57,
        "y": 68,
        "icon": "🪑",
        "sentence": "Familien sidder ved bordet.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "kaffe": {
        "clean": "kaffe",
        "word": "en kaffe",
        "gender": "en",
        "bestemt": "kaffen",
        "flertal": "kaffe",
        "x": 90.5,
        "y": 49,
        "icon": "☕",
        "sentence": "Faren drikker varm kaffe.",
        "sceneImage": "assets/koekken_vrimmel.jpg"
    },
    "billede": {
        "clean": "billede",
        "word": "et billede",
        "gender": "et",
        "bestemt": "billedet",
        "flertal": "billeder",
        "x": 9,
        "y": 35,
        "icon": "🖼️",
        "sentence": "Der hænger et billede på væggen.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "lampe": {
        "clean": "lampe",
        "word": "en lampe",
        "gender": "en",
        "bestemt": "lampen",
        "flertal": "lamper",
        "x": 26,
        "y": 16,
        "icon": "💡",
        "sentence": "Lampen giver lys.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "ur": {
        "clean": "ur",
        "word": "et ur",
        "gender": "et",
        "bestemt": "uret",
        "flertal": "ure",
        "x": 42.5,
        "y": 19,
        "icon": "🕒",
        "sentence": "Uret hænger på væggen.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "tavle": {
        "clean": "tavle",
        "word": "en tavle",
        "gender": "en",
        "bestemt": "tavlen",
        "flertal": "tavler",
        "x": 33,
        "y": 41,
        "icon": "🟩",
        "sentence": "Læreren skriver på tavlen.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "sprog": {
        "clean": "sprog",
        "word": "et sprog",
        "gender": "et",
        "bestemt": "sproget",
        "flertal": "sprog",
        "x": 38,
        "y": 34,
        "icon": "🇩🇰",
        "sentence": "Kursisterne lærer dansk.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "spørgsmål": {
        "clean": "spørgsmål",
        "word": "et spørgsmål",
        "gender": "et",
        "bestemt": "spørgsmålet",
        "flertal": "spørgsmål",
        "x": 23.5,
        "y": 36,
        "icon": "❓",
        "sentence": "Eleven stiller et spørgsmål.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "elev": {
        "clean": "elev",
        "word": "en elev",
        "gender": "en",
        "bestemt": "eleven",
        "flertal": "elever",
        "x": 22,
        "y": 53,
        "icon": "🙋‍♂️",
        "sentence": "En elev rækker hånden op.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "lærer": {
        "clean": "lærer",
        "word": "en lærer",
        "gender": "en",
        "bestemt": "læreren",
        "flertal": "lærere",
        "x": 54.5,
        "y": 45,
        "icon": "👩‍🏫",
        "sentence": "En lærer underviser klassen.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "svar": {
        "clean": "svar",
        "word": "et svar",
        "gender": "et",
        "bestemt": "svaret",
        "flertal": "svar",
        "x": 61,
        "y": 29,
        "icon": "✅",
        "sentence": "Læreren kender svaret.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "bog": {
        "clean": "bog",
        "word": "en bog",
        "gender": "en",
        "bestemt": "bogen",
        "flertal": "bøger",
        "x": 19.5,
        "y": 67,
        "icon": "📖",
        "sentence": "Han læser i en bog.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "papir": {
        "clean": "papir",
        "word": "et papir",
        "gender": "et",
        "bestemt": "papiret",
        "flertal": "papirer",
        "x": 39,
        "y": 70,
        "icon": "📄",
        "sentence": "Hun skriver på et papir.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "opgave": {
        "clean": "opgave",
        "word": "en opgave",
        "gender": "en",
        "bestemt": "opgaven",
        "flertal": "opgaver",
        "x": 34,
        "y": 64,
        "icon": "📝",
        "sentence": "Hun løser en opgave.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "blyant": {
        "clean": "blyant",
        "word": "en blyant",
        "gender": "en",
        "bestemt": "blyanten",
        "flertal": "blyanter",
        "x": 43,
        "y": 71.5,
        "icon": "✏️",
        "sentence": "Han skriver med en blyant.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "telefon": {
        "clean": "telefon",
        "word": "en telefon",
        "gender": "en",
        "bestemt": "telefonen",
        "flertal": "telefoner",
        "x": 46,
        "y": 71,
        "icon": "📱",
        "sentence": "Telefonen ligger på bordet.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "taske": {
        "clean": "taske",
        "word": "en taske",
        "gender": "en",
        "bestemt": "tasken",
        "flertal": "tasker",
        "x": 50,
        "y": 90,
        "icon": "🎒",
        "sentence": "Tasken står på gulvet.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "møde": {
        "clean": "møde",
        "word": "et møde",
        "gender": "et",
        "bestemt": "mødet",
        "flertal": "møder",
        "x": 78.5,
        "y": 44,
        "icon": "🤝",
        "sentence": "De har et møde i dag.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "idé": {
        "clean": "idé",
        "word": "en idé",
        "gender": "en",
        "bestemt": "idéen",
        "flertal": "idéer",
        "x": 84.5,
        "y": 25.5,
        "icon": "💡",
        "sentence": "Han får en god idé.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "brev": {
        "clean": "brev",
        "word": "et brev",
        "gender": "et",
        "bestemt": "brevet",
        "flertal": "breve",
        "x": 83.5,
        "y": 47.5,
        "icon": "✉️",
        "sentence": "Hun åbner et brev.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "computer": {
        "clean": "computer",
        "word": "en computer",
        "gender": "en",
        "bestemt": "computeren",
        "flertal": "computere",
        "x": 82.5,
        "y": 83,
        "icon": "💻",
        "sentence": "Manden arbejder ved en computer.",
        "sceneImage": "assets/klasse_kontor_vrimmel.jpg"
    },
    "fugl": {
        "clean": "fugl",
        "word": "en fugl",
        "gender": "en",
        "bestemt": "fuglen",
        "flertal": "fugle",
        "x": 18,
        "y": 10,
        "icon": "🐦",
        "sentence": "En fugl flyver på himlen.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "luft": {
        "clean": "luft",
        "word": "en luft",
        "gender": "en",
        "bestemt": "luften",
        "flertal": "lufte",
        "x": 25,
        "y": 24,
        "icon": "🌬️",
        "sentence": "Luften er frisk ude ved havet.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "vejr": {
        "clean": "vejr",
        "word": "et vejr",
        "gender": "et",
        "bestemt": "vejret",
        "flertal": "vejr",
        "x": 41,
        "y": 11,
        "icon": "🌤️",
        "sentence": "Det er godt vejr i dag.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "vand": {
        "clean": "vand",
        "word": "et vand",
        "gender": "et",
        "bestemt": "vandet",
        "flertal": "vande",
        "x": 10,
        "y": 41,
        "icon": "🌊",
        "sentence": "Vandet er koldt.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "strand": {
        "clean": "strand",
        "word": "en strand",
        "gender": "en",
        "bestemt": "stranden",
        "flertal": "strande",
        "x": 26,
        "y": 46,
        "icon": "🏖️",
        "sentence": "Børnene leger på en strand.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "bold": {
        "clean": "bold",
        "word": "en bold",
        "gender": "en",
        "bestemt": "bolden",
        "flertal": "bolde",
        "x": 14.5,
        "y": 71,
        "icon": "⚽",
        "sentence": "De spiller med en bold.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "blomst": {
        "clean": "blomst",
        "word": "en blomst",
        "gender": "en",
        "bestemt": "blomsten",
        "flertal": "blomster",
        "x": 21,
        "y": 86,
        "icon": "🌸",
        "sentence": "Hun plukker en blomst.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "skov": {
        "clean": "skov",
        "word": "en skov",
        "gender": "en",
        "bestemt": "skoven",
        "flertal": "skove",
        "x": 73,
        "y": 20,
        "icon": "🌲",
        "sentence": "De går en tur i en skov.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "musik": {
        "clean": "musik",
        "word": "en musik",
        "gender": "en",
        "bestemt": "musikken",
        "flertal": "musik",
        "x": 37,
        "y": 47,
        "icon": "🎵",
        "sentence": "De lytter til musik.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "ferie": {
        "clean": "ferie",
        "word": "en ferie",
        "gender": "en",
        "bestemt": "ferien",
        "flertal": "ferier",
        "x": 48,
        "y": 45,
        "icon": "🏖️",
        "sentence": "Familien holder ferie.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "fest": {
        "clean": "fest",
        "word": "en fest",
        "gender": "en",
        "bestemt": "festen",
        "flertal": "fester",
        "x": 57,
        "y": 48,
        "icon": "🎉",
        "sentence": "De holder en fest.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "hjerte": {
        "clean": "hjerte",
        "word": "et hjerte",
        "gender": "et",
        "bestemt": "hjertet",
        "flertal": "hjerter",
        "x": 60.5,
        "y": 31,
        "icon": "❤️",
        "sentence": "Ballonen ligner et hjerte.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "gave": {
        "clean": "gave",
        "word": "en gave",
        "gender": "en",
        "bestemt": "gaven",
        "flertal": "gaver",
        "x": 51,
        "y": 59,
        "icon": "🎁",
        "sentence": "Hun åbner en gave.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "film": {
        "clean": "film",
        "word": "en film",
        "gender": "en",
        "bestemt": "filmen",
        "flertal": "film",
        "x": 46.5,
        "y": 71.5,
        "icon": "🎬",
        "sentence": "De ser en film.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "spil": {
        "clean": "spil",
        "word": "et spil",
        "gender": "et",
        "bestemt": "spillet",
        "flertal": "spil",
        "x": 53.5,
        "y": 67,
        "icon": "🎲",
        "sentence": "De spiller et spil.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "liv": {
        "clean": "liv",
        "word": "et liv",
        "gender": "et",
        "bestemt": "livet",
        "flertal": "liv",
        "x": 64,
        "y": 55,
        "icon": "🌱",
        "sentence": "Der er liv i parken.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "menneske": {
        "clean": "menneske",
        "word": "et menneske",
        "gender": "et",
        "bestemt": "mennesket",
        "flertal": "mennesker",
        "x": 76.5,
        "y": 53,
        "icon": "🧑",
        "sentence": "Et venligt menneske hjælper.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "hånd": {
        "clean": "hånd",
        "word": "en hånd",
        "gender": "en",
        "bestemt": "hånden",
        "flertal": "hænder",
        "x": 83,
        "y": 61,
        "icon": "🫱",
        "sentence": "Han rækker en hånd frem.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "hoved": {
        "clean": "hoved",
        "word": "et hoved",
        "gender": "et",
        "bestemt": "hovedet",
        "flertal": "hoveder",
        "x": 88.5,
        "y": 50,
        "icon": "🗣️",
        "sentence": "Han har ondt i hovedet.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "øje": {
        "clean": "øje",
        "word": "et øje",
        "gender": "et",
        "bestemt": "øjet",
        "flertal": "øjne",
        "x": 87.5,
        "y": 53.5,
        "icon": "👁️",
        "sentence": "Han lukker et øje.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "fod": {
        "clean": "fod",
        "word": "en fod",
        "gender": "en",
        "bestemt": "foden",
        "flertal": "fødder",
        "x": 83.5,
        "y": 77.5,
        "icon": "🦶",
        "sentence": "Han har ondt i foden.",
        "sceneImage": "assets/natur_fritid_vrimmel.jpg"
    },
    "butik": {
        "clean": "butik",
        "word": "en butik",
        "gender": "en",
        "bestemt": "butikken",
        "flertal": "butikker",
        "x": 20,
        "y": 12,
        "icon": "🏪",
        "sentence": "Manden handler i en butik.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "verden": {
        "clean": "verden",
        "word": "en verden",
        "gender": "en",
        "bestemt": "verdenen",
        "flertal": "verdener",
        "x": 6,
        "y": 24,
        "icon": "🌍",
        "sentence": "Der er mange lande i verden.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "land": {
        "clean": "land",
        "word": "et land",
        "gender": "et",
        "bestemt": "landet",
        "flertal": "lande",
        "x": 9.5,
        "y": 23,
        "icon": "🇩🇰",
        "sentence": "Danmark er et lille land.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "år": {
        "clean": "år",
        "word": "et år",
        "gender": "et",
        "bestemt": "året",
        "flertal": "år",
        "x": 8,
        "y": 33,
        "icon": "📅",
        "sentence": "Et år har tolv måneder.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "måned": {
        "clean": "måned",
        "word": "en måned",
        "gender": "en",
        "bestemt": "måneden",
        "flertal": "måneder",
        "x": 4.5,
        "y": 33,
        "icon": "🗓️",
        "sentence": "Maj er en forårsmåned.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "uge": {
        "clean": "uge",
        "word": "en uge",
        "gender": "en",
        "bestemt": "ugen",
        "flertal": "uger",
        "x": 6,
        "y": 39,
        "icon": "📆",
        "sentence": "En uge har syv dage.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "dag": {
        "clean": "dag",
        "word": "en dag",
        "gender": "en",
        "bestemt": "dagen",
        "flertal": "dage",
        "x": 6.5,
        "y": 36,
        "icon": "☀️",
        "sentence": "Det er tirsdag i dag.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "brød": {
        "clean": "brød",
        "word": "et brød",
        "gender": "et",
        "bestemt": "brødet",
        "flertal": "brød",
        "x": 6.5,
        "y": 81,
        "icon": "🍞",
        "sentence": "Hun køber et frisk brød.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "pris": {
        "clean": "pris",
        "word": "en pris",
        "gender": "en",
        "bestemt": "prisen",
        "flertal": "priser",
        "x": 13.5,
        "y": 91.5,
        "icon": "🏷️",
        "sentence": "Skiltet viser varens pris.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "mælk": {
        "clean": "mælk",
        "word": "en mælk",
        "gender": "en",
        "bestemt": "mælken",
        "flertal": "mælk",
        "x": 15,
        "y": 78,
        "icon": "🥛",
        "sentence": "Hun køber en karton mælk.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "flaske": {
        "clean": "flaske",
        "word": "en flaske",
        "gender": "en",
        "bestemt": "flasken",
        "flertal": "flasker",
        "x": 19.5,
        "y": 71,
        "icon": "🍾",
        "sentence": "Der står en flaske vand.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "æble": {
        "clean": "æble",
        "word": "et æble",
        "gender": "et",
        "bestemt": "æblet",
        "flertal": "æbler",
        "x": 22.5,
        "y": 76,
        "icon": "🍎",
        "sentence": "Drengen spiser et æble.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "pose": {
        "clean": "pose",
        "word": "en pose",
        "gender": "en",
        "bestemt": "posen",
        "flertal": "poser",
        "x": 29,
        "y": 63,
        "icon": "🛍️",
        "sentence": "Hun bærer en pose.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "bus": {
        "clean": "bus",
        "word": "en bus",
        "gender": "en",
        "bestemt": "bussen",
        "flertal": "busser",
        "x": 43.5,
        "y": 47,
        "icon": "🚌",
        "sentence": "Bussen kører ind til byen.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "cykel": {
        "clean": "cykel",
        "word": "en cykel",
        "gender": "en",
        "bestemt": "cyklen",
        "flertal": "cykler",
        "x": 53,
        "y": 63,
        "icon": "🚲",
        "sentence": "En cykel holder ved stationen.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "time": {
        "clean": "time",
        "word": "en time",
        "gender": "en",
        "bestemt": "timen",
        "flertal": "timer",
        "x": 48.5,
        "y": 15.5,
        "icon": "🕐",
        "sentence": "Toget kører om en time.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "morgen": {
        "clean": "morgen",
        "word": "en morgen",
        "gender": "en",
        "bestemt": "morgenen",
        "flertal": "morgener",
        "x": 57,
        "y": 7.5,
        "icon": "🌅",
        "sentence": "Hun rejser tidligt om morgenen.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "aften": {
        "clean": "aften",
        "word": "en aften",
        "gender": "en",
        "bestemt": "aftenen",
        "flertal": "aftener",
        "x": 66.5,
        "y": 7.5,
        "icon": "🌆",
        "sentence": "Toget kører om aftenen.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "nat": {
        "clean": "nat",
        "word": "en nat",
        "gender": "en",
        "bestemt": "natten",
        "flertal": "nætter",
        "x": 71,
        "y": 7.5,
        "icon": "🌙",
        "sentence": "Det er mørkt om natten.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "tog": {
        "clean": "tog",
        "word": "et tog",
        "gender": "et",
        "bestemt": "toget",
        "flertal": "tog",
        "x": 88,
        "y": 46,
        "icon": "🚆",
        "sentence": "Toget holder ved perronen.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    },
    "billet": {
        "clean": "billet",
        "word": "en billet",
        "gender": "en",
        "bestemt": "billetten",
        "flertal": "billetter",
        "x": 81.5,
        "y": 76,
        "icon": "🎫",
        "sentence": "Hun viser sin billet.",
        "sceneImage": "assets/station_indkoeb_vrimmel.jpg"
    }
};

// Mapped word forms to noun keys
export const wordToNounKey = {
    "sol": "sol",
    "solen": "sol",
    "sole": "sol",
    "solene": "sol",
    "tid": "tid",
    "tiden": "tid",
    "tider": "tid",
    "by": "by",
    "byen": "by",
    "byer": "by",
    "byerne": "by",
    "hus": "hus",
    "huset": "hus",
    "huse": "hus",
    "husene": "hus",
    "vindue": "vindue",
    "vinduet": "vindue",
    "vinduer": "vindue",
    "vinduerne": "vindue",
    "vinduesplads": "vindue",
    "vinduespladsen": "vindue",
    "virksomhed": "virksomhed",
    "caféen": "virksomhed",
    "caféer": "virksomhed",
    "penge": "penge",
    "pengene": "penge",
    "småpenge": "penge",
    "krone": "krone",
    "kronen": "krone",
    "kroner": "krone",
    "arbejde": "arbejde",
    "arbejdet": "arbejde",
    "læge": "læge",
    "lægen": "læge",
    "læger": "læge",
    "lægerne": "læge",
    "hund": "hund",
    "hunden": "hund",
    "hunde": "hund",
    "hundene": "hund",
    "træ": "træ",
    "træet": "træ",
    "træer": "træ",
    "kvinde": "kvinde",
    "kvinden": "kvinde",
    "kvinder": "kvinde",
    "kvinderne": "kvinde",
    "tur": "tur",
    "turen": "tur",
    "ture": "tur",
    "turene": "tur",
    "vej": "vej",
    "vejen": "vej",
    "veje": "vej",
    "vejene": "vej",
    "familie": "familie",
    "familien": "familie",
    "familier": "familie",
    "familierne": "familie",
    "barn": "barn",
    "barnet": "barn",
    "børn": "barn",
    "børnene": "barn",
    "plads": "plads",
    "pladsen": "plads",
    "pladser": "plads",
    "pladserne": "plads",
    "græsplæne": "plads",
    "græsplænen": "plads",
    "dreng": "dreng",
    "drengen": "dreng",
    "drenge": "dreng",
    "drengene": "dreng",
    "pige": "pige",
    "pigen": "pige",
    "piger": "pige",
    "pigerne": "pige",
    "skole": "skole",
    "skolen": "skole",
    "skoler": "skole",
    "skolerne": "skole",
    "sprogskole": "skole",
    "sprogskolen": "skole",
    "dør": "dør",
    "døren": "dør",
    "døre": "dør",
    "dørene": "dør",
    "døråbning": "dør",
    "døråbningen": "dør",
    "ven": "ven",
    "vennen": "ven",
    "venner": "ven",
    "vennerne": "ven",
    "bil": "bil",
    "bilen": "bil",
    "biler": "bil",
    "bilerne": "bil",
    "mand": "mand",
    "manden": "mand",
    "mænd": "mand",
    "mændene": "mand",
    "problem": "problem",
    "problemet": "problem",
    "problemer": "problem",
    "problemerne": "problem",
    "kat": "kat",
    "katten": "kat",
    "katte": "kat",
    "kattene": "kat",
    "mor": "mor",
    "moren": "mor",
    "mødre": "mor",
    "mødrene": "mor",
    "moderen": "mor",
    "bedstemor": "mor",
    "far": "far",
    "faren": "far",
    "fædre": "far",
    "fædrene": "far",
    "faderen": "far",
    "bedstefar": "far",
    "seng": "seng",
    "sengen": "seng",
    "senge": "seng",
    "sengene": "seng",
    "tøj": "tøj",
    "tøjet": "tøj",
    "stykke tøj": "tøj",
    "stykket tøj": "tøj",
    "et stykke tøj": "tøj",
    "sportstøj": "tøj",
    "sportstøjet": "tøj",
    "sko": "sko",
    "skoen": "sko",
    "skoene": "sko",
    "løbesko": "sko",
    "løbeskoene": "sko",
    "stol": "stol",
    "stolen": "stol",
    "stole": "stol",
    "stolene": "stol",
    "lænestol": "stol",
    "lænestolen": "stol",
    "mad": "mad",
    "maden": "mad",
    "madder": "mad",
    "morgenmad": "mad",
    "morgenmaden": "mad",
    "kop": "kop",
    "koppen": "kop",
    "kopper": "kop",
    "kød": "kød",
    "kødet": "kød",
    "fisk": "fisk",
    "fisken": "fisk",
    "glas": "glas",
    "glasset": "glas",
    "bord": "bord",
    "bordet": "bord",
    "borde": "bord",
    "bordene": "bord",
    "køkkenbordet": "bord",
    "spisebordet": "bord",
    "skrivebordet": "bord",
    "kaffe": "kaffe",
    "kaffen": "kaffe",
    "kaffemaskinen": "kaffe",
    "kaffekop": "kaffe",
    "billede": "billede",
    "billedet": "billede",
    "billeder": "billede",
    "billederne": "billede",
    "lampe": "lampe",
    "lampen": "lampe",
    "lamper": "lampe",
    "lamperne": "lampe",
    "ur": "ur",
    "uret": "ur",
    "ure": "ur",
    "urene": "ur",
    "tavle": "tavle",
    "tavlen": "tavle",
    "tavler": "tavle",
    "tavlerne": "tavle",
    "sprog": "sprog",
    "sproget": "sprog",
    "spørgsmål": "spørgsmål",
    "spørgsmålet": "spørgsmål",
    "elev": "elev",
    "eleven": "elev",
    "elever": "elev",
    "eleverne": "elev",
    "læreren": "lærer",
    "lærere": "lærer",
    "lærerne": "lærer",
    "svar": "svar",
    "svaret": "svar",
    "bog": "bog",
    "bogen": "bog",
    "bøger": "bog",
    "bøgerne": "bog",
    "ordbog": "bog",
    "ordbogen": "bog",
    "papir": "papir",
    "papiret": "papir",
    "papirer": "papir",
    "papirerne": "papir",
    "opgave": "opgave",
    "opgaven": "opgave",
    "opgaver": "opgave",
    "blyant": "blyant",
    "blyanten": "blyant",
    "blyanter": "blyant",
    "blyanterne": "blyant",
    "telefon": "telefon",
    "telefonen": "telefon",
    "telefoner": "telefon",
    "taske": "taske",
    "tasken": "taske",
    "tasker": "taske",
    "taskerne": "taske",
    "møde": "møde",
    "mødet": "møde",
    "idé": "idé",
    "idéen": "idé",
    "idéer": "idé",
    "idéerne": "idé",
    "ide": "idé",
    "ideer": "idé",
    "ideerne": "idé",
    "ideen": "idé",
    "brev": "brev",
    "brevet": "brev",
    "breve": "brev",
    "brevene": "brev",
    "computer": "computer",
    "computeren": "computer",
    "computere": "computer",
    "computerne": "computer",
    "computerskærmen": "computer",
    "computerskærm": "computer",
    "fugl": "fugl",
    "fuglen": "fugl",
    "fugle": "fugl",
    "luft": "luft",
    "luften": "luft",
    "lufte": "luft",
    "vejr": "vejr",
    "vejret": "vejr",
    "vand": "vand",
    "vandet": "vand",
    "vande": "vand",
    "strand": "strand",
    "stranden": "strand",
    "strande": "strand",
    "bold": "bold",
    "bolden": "bold",
    "bolde": "bold",
    "boldene": "bold",
    "boldspil": "bold",
    "boldspillet": "bold",
    "fodbold": "bold",
    "fodbolden": "bold",
    "fodboldkamp": "bold",
    "blomst": "blomst",
    "blomsten": "blomst",
    "blomster": "blomst",
    "blomsterne": "blomst",
    "blomstervase": "blomst",
    "blomstervasen": "blomst",
    "skov": "skov",
    "skoven": "skov",
    "skove": "skov",
    "musik": "musik",
    "musikken": "musik",
    "ferie": "ferie",
    "ferien": "ferie",
    "ferier": "ferie",
    "ferierne": "ferie",
    "fest": "fest",
    "festen": "fest",
    "fester": "fest",
    "festerne": "fest",
    "hjerte": "hjerte",
    "hjertet": "hjerte",
    "hjerter": "hjerte",
    "hjerterne": "hjerte",
    "gave": "gave",
    "gaven": "gave",
    "gaver": "gave",
    "gaverne": "gave",
    "film": "film",
    "filmen": "film",
    "spil": "spil",
    "spillet": "spil",
    "spillene": "spil",
    "brætspil": "spil",
    "liv": "liv",
    "livet": "liv",
    "menneske": "menneske",
    "mennesket": "menneske",
    "mennesker": "menneske",
    "menneskene": "menneske",
    "hånd": "hånd",
    "hånden": "hånd",
    "hænder": "hånd",
    "hænderne": "hånd",
    "hoved": "hoved",
    "hovedet": "hoved",
    "hoveder": "hoved",
    "hovederne": "hoved",
    "øje": "øje",
    "øjet": "øje",
    "øjne": "øje",
    "øjnene": "øje",
    "fod": "fod",
    "foden": "fod",
    "fødder": "fod",
    "fødderne": "fod",
    "butik": "butik",
    "butikken": "butik",
    "butikker": "butik",
    "butikkerne": "butik",
    "stationskiosken": "butik",
    "kiosken": "butik",
    "kiosk": "butik",
    "verden": "verden",
    "verdenen": "verden",
    "verdener": "verden",
    "land": "land",
    "landet": "land",
    "lande": "land",
    "landene": "land",
    "år": "år",
    "året": "år",
    "måned": "måned",
    "måneden": "måned",
    "måneder": "måned",
    "månederne": "måned",
    "uge": "uge",
    "ugen": "uge",
    "uger": "uge",
    "ugerne": "uge",
    "dag": "dag",
    "dagen": "dag",
    "dage": "dag",
    "dagene": "dag",
    "brød": "brød",
    "brødet": "brød",
    "pris": "pris",
    "prisen": "pris",
    "priser": "pris",
    "mælk": "mælk",
    "mælken": "mælk",
    "flaske": "flaske",
    "flasken": "flaske",
    "flasker": "flaske",
    "æble": "æble",
    "æblet": "æble",
    "æbler": "æble",
    "pose": "pose",
    "posen": "pose",
    "poser": "pose",
    "bus": "bus",
    "bussen": "bus",
    "busser": "bus",
    "busserne": "bus",
    "cykel": "cykel",
    "cyklen": "cykel",
    "cykler": "cykel",
    "cyklerne": "cykel",
    "time": "time",
    "timen": "time",
    "timer": "time",
    "timerne": "time",
    "morgen": "morgen",
    "morgenen": "morgen",
    "morgener": "morgen",
    "aften": "aften",
    "aftenen": "aften",
    "aftener": "aften",
    "aftenerne": "aften",
    "nat": "nat",
    "natten": "nat",
    "nætter": "nat",
    "nætterne": "nat",
    "tog": "tog",
    "toget": "tog",
    "togene": "tog",
    "lyntog": "tog",
    "lyntoget": "tog",
    "togbillet": "billet",
    "togbilletten": "tog",
    "billet": "billet",
    "billetten": "billet",
    "billetter": "billet",
    "billetterne": "billet",
    "billetautomat": "billet",
    "billetautomaten": "billet"
};

// Sorted words for Unicode boundary regex
const sortedNounWords = Object.keys(wordToNounKey).sort((a, b) => b.length - a.length);
const nounRegex = new RegExp(`(?<![\\p{L}\\p{N}])(${sortedNounWords.join('|')})(?![\\p{L}\\p{N}])`, 'giu');

// Ensure Styles are Injected
let stylesInjected = false;
export function ensureQuickPeekStyles() {
    if (stylesInjected || (typeof document !== 'undefined' && document.getElementById('noun-quick-peek-styles'))) return;
    if (typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.id = 'noun-quick-peek-styles';
    style.textContent = `
        /* Diskret ordforklarings-link i opgavetekst */
        .noun-cross-link {
            display: inline;
            cursor: pointer;
            border-bottom: 1.5px dotted rgba(56, 189, 248, 0.65);
            color: inherit;
            font-weight: inherit;
            transition: all 0.2s ease;
            text-decoration: none;
            padding-bottom: 1px;
        }
        .noun-cross-link:hover {
            color: #38bdf8;
            border-bottom-style: solid;
            border-bottom-color: #38bdf8;
        }

        /* Modal Overlay for Aktiv Genkaldelse */
        .quick-peek-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(8px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.25rem;
            animation: qpFadeIn 0.2s ease;
        }
        .quick-peek-overlay.fade-out {
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        .quick-peek-modal {
            background: #1e293b;
            border: 2px solid #38bdf8;
            border-radius: 20px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
            overflow: hidden;
            animation: qpZoomModal 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes qpZoomModal {
            from { opacity: 0; transform: scale(0.92); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes qpFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .qp-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.9rem 1.25rem;
            background: #0f172a;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .qp-modal-badge {
            background: linear-gradient(135deg, #0284c7, #38bdf8);
            color: white;
            font-size: 0.75rem;
            font-weight: 800;
            padding: 0.25rem 0.6rem;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .qp-close-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            font-size: 1.5rem;
            cursor: pointer;
            line-height: 1;
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
            transition: all 0.2s;
        }
        .qp-close-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.1);
        }
        .qp-viewport {
            position: relative;
            width: 100%;
            height: 235px;
            overflow: hidden;
            background-color: #0f172a;
            background-repeat: no-repeat;
            background-size: 320%;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: background-position 0.3s ease;
        }
        .qp-modal-content {
            padding: 1.2rem 1.4rem 1.4rem;
        }
        .qp-word-title-row {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            margin-bottom: 0.4rem;
        }
        .qp-gender-tag {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
        }
        .qp-gender-en { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid #38bdf8; }
        .qp-gender-et { background: rgba(249, 115, 22, 0.2); color: #fb923c; border: 1px solid #f97316; }
        .qp-word-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: white;
        }
        .qp-forms-row {
            color: #94a3b8;
            font-size: 0.95rem;
            margin-bottom: 0.8rem;
        }
        .qp-forms-row strong { color: #f1f5f9; }
        .qp-sentence-quote {
            color: #e2e8f0;
            font-style: italic;
            font-size: 0.95rem;
            border-left: 3px solid #38bdf8;
            padding-left: 0.8rem;
            margin-bottom: 1.15rem;
            line-height: 1.45;
        }
        .qp-translation-wrapper {
            margin-bottom: 1.15rem;
        }
        .qp-reveal-trans-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px dashed rgba(255, 255, 255, 0.25);
            color: #94a3b8;
            padding: 0.6rem 1rem;
            border-radius: 10px;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            width: 100%;
            justify-content: center;
        }
        .qp-reveal-trans-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #f1f5f9;
            border-color: rgba(56, 189, 248, 0.5);
        }
        .qp-translation-card {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 12px;
            padding: 0.75rem 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1rem;
            color: #cbd5e1;
            flex-wrap: wrap;
            animation: qpFadeIn 0.25s ease;
        }
        .qp-translation-card strong {
            color: #4ade80;
            font-size: 1.1rem;
        }
        .qp-actions-row {
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
            flex-wrap: wrap;
        }
        .qp-listen-btn, .qp-resume-btn {
            padding: 0.6rem 1.1rem;
            border-radius: 10px;
            font-size: 0.92rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .qp-listen-btn {
            background: #334155;
            border: 1px solid #64748b;
            color: white;
        }
        .qp-listen-btn:hover {
            background: #475569;
            border-color: #94a3b8;
        }
        .qp-resume-btn {
            background: linear-gradient(135deg, #0284c7, #38bdf8);
            border: none;
            color: white;
            box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
        }
        .qp-resume-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(56, 189, 248, 0.45);
        }
    `;
    document.head.appendChild(style);
    stylesInjected = true;
}

export function openNounQuickPeekModal(nounKeyOrObj) {
    ensureQuickPeekStyles();

    let noun = nounKeyOrObj;
    if (typeof nounKeyOrObj === 'string') {
        const cleanKey = nounKeyOrObj.toLowerCase();
        noun = allNounsRegistry[cleanKey];
    }
    if (!noun) return;

    const existing = document.querySelector('.quick-peek-overlay');
    if (existing) existing.remove();

    const lang = getLang ? getLang() : 'da';

    // Translation lookup: specific translations -> sceneWordTranslations -> English -> danish word
    let translationText = noun.word;
    if (noun.translations && noun.translations[lang]) {
        translationText = noun.translations[lang];
    } else if (sceneWordTranslations[noun.word] && sceneWordTranslations[noun.word][lang]?.meaning) {
        translationText = sceneWordTranslations[noun.word][lang].meaning;
    } else if (noun.translations && noun.translations['en']) {
        translationText = noun.translations['en'];
    } else if (sceneWordTranslations[noun.word] && sceneWordTranslations[noun.word]['en']?.meaning) {
        translationText = sceneWordTranslations[noun.word]['en'].meaning;
    }

    const overlay = document.createElement('div');
    overlay.className = 'quick-peek-overlay';

    overlay.innerHTML = `
        <div class="quick-peek-modal">
            <div class="qp-modal-header">
                <span class="qp-modal-badge">🖼️ Visuel ordforklaring</span>
                <button class="qp-close-btn" id="qp-close-x" title="Luk">✕</button>
            </div>
            <div class="qp-viewport" id="qp-viewport-box" style="background-image: url('${noun.sceneImage}'); background-position: ${noun.x}% ${noun.y}%;">
            </div>
            <div class="qp-modal-content">
                <div class="qp-word-title-row">
                    <span class="qp-gender-tag qp-gender-${noun.gender}">${noun.gender}-ord</span>
                    <div class="qp-word-title">${noun.icon} ${noun.word}</div>
                </div>
                <div class="qp-forms-row">
                    Bestemt: <strong>${noun.bestemt}</strong> &nbsp;|&nbsp; Flertal: <strong>${noun.flertal}</strong>
                </div>
                <div class="qp-sentence-quote">
                    "${noun.sentence}"
                </div>

                <!-- Aktiv genkaldelse: Oversættelse skjult som standard -->
                <div class="qp-translation-wrapper">
                    <button class="qp-reveal-trans-btn" id="qp-reveal-btn">
                        <span>💡</span> Er du i tvivl om ordet? Vis oversættelse
                    </button>
                    <div class="qp-translation-card" id="qp-trans-card" style="display: none;">
                        <span class="qp-trans-lang-label">🌍 Oversættelse (${lang.toUpperCase()}):</span>
                        <strong class="qp-trans-text">${translationText}</strong>
                    </div>
                </div>

                <div class="qp-actions-row">
                    <button class="qp-listen-btn" id="qp-speak-btn">
                        <span>🔊</span> Lyt til ordet
                    </button>
                    <button class="qp-resume-btn" id="qp-resume-btn">
                        Fortsæt opgaven ➔
                    </button>
                </div>
            </div>
        </div>
    `;

    function closeModal() {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 180);
    }

    overlay.querySelector('#qp-close-x').onclick = closeModal;
    overlay.querySelector('#qp-resume-btn').onclick = closeModal;
    overlay.querySelector('#qp-speak-btn').onclick = () => speakDanish(noun.word);

    const revealBtn = overlay.querySelector('#qp-reveal-btn');
    const transCard = overlay.querySelector('#qp-trans-card');
    revealBtn.onclick = () => {
        revealBtn.style.display = 'none';
        transCard.style.display = 'flex';
    };

    overlay.onclick = (e) => {
        if (e.target === overlay) closeModal();
    };

    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            window.removeEventListener('keydown', handleEsc);
        }
    };
    window.addEventListener('keydown', handleEsc);

    document.body.appendChild(overlay);
    speakDanish(noun.word);
}

export function formatNounLinks(text) {
    if (!text || typeof text !== 'string') return text;
    ensureQuickPeekStyles();

    return text.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, textChunk) => {
        if (tag) return tag;
        return textChunk.replace(nounRegex, (m) => {
            const nounKey = wordToNounKey[m.toLowerCase()];
            if (!nounKey) return m;
            return `<span class="noun-cross-link" data-noun="${nounKey}">${m}</span>`;
        });
    });
}

export function attachNounLinkListeners(containerEl) {
    if (!containerEl) return;
    ensureQuickPeekStyles();

    containerEl.querySelectorAll('.noun-cross-link').forEach(el => {
        el.onclick = (e) => {
            e.stopPropagation();
            const nounKey = el.dataset.noun;
            if (nounKey) {
                openNounQuickPeekModal(nounKey);
            }
        };
    });
}
