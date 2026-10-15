import { getLang } from './i18n.js';

// TTS Helper
function speakDanish(text) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'da-DK';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

// 23 Verber for Byrummet & Gaden
export const byrumVerbsRegistry = {
    "køre": {
        "clean": "køre",
        "word": "at køre",
        "nutid": "kører",
        "datid": "kørte",
        "icon": "🚗",
        "x": 82,
        "y": 28,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Bussen kører gennem byen.",
        "meaning": "Bevæge sig fremad i et køretøj (bil, bus, tog).",
        "translations": {
            "en": "to drive / ride", "de": "fahren", "es": "conducir / ir en coche", "ar": "يقود", "fa": "رانندگی کردن", "ku": "ajotin", "tr": "sürmek / gitmek", "uk": "їхати / водити", "ru": "ехать / водить", "vi": "lái xe", "zh": "驾驶 / 开车", "th": "ขับรถ", "pt": "dirigir", "ur": "گاڑی چلانا", "ne": "गाडी चलाउनु", "ps": "موټر چلول"
        }
    },
    "gå": {
        "clean": "gå",
        "word": "at gå",
        "nutid": "går",
        "datid": "gik",
        "icon": "🚶",
        "x": 60,
        "y": 48,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Folk går på den hyggelige gågade.",
        "meaning": "Bevæge sig fremad på fødderne i et roligt tempo.",
        "translations": {
            "en": "to walk", "de": "gehen / zu Fuß gehen", "es": "caminar / andar", "ar": "يمشي", "fa": "راه رفتن", "ku": "meşîn", "tr": "yürümek", "uk": "ходити / йти", "ru": "ходить / идти", "vi": "đi bộ", "zh": "步行 / 走路", "th": "เดิน", "pt": "andar / caminhar", "ur": "چلنا", "ne": "हिँड्नु", "ps": "پلي تلل"
        }
    },
    "møde": {
        "clean": "møde",
        "word": "at møde",
        "nutid": "møder",
        "datid": "mødte",
        "icon": "🤝",
        "x": 47,
        "y": 46,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "De to venner møder hinanden på gaden.",
        "meaning": "Træffe eller hilse på en anden person i byen.",
        "translations": {
            "en": "to meet", "de": "treffen / begegnen", "es": "encontrarse con", "ar": "يلتقي", "fa": "ملاقات کردن", "ku": "dîtin", "tr": "buluşmak / karşılaşmak", "uk": "зустрічати", "ru": "встречать", "vi": "gặp gỡ", "zh": "遇见 / 会面", "th": "พบ / เจอ", "pt": "encontrar", "ur": "ملنا", "ne": "भेट्नु", "ps": "ملاقات کول"
        }
    },
    "kigge": {
        "clean": "kigge",
        "word": "at kigge",
        "nutid": "kigger",
        "datid": "kiggede",
        "icon": "👀",
        "x": 27,
        "y": 48,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Kvinden kigger ind ad butiksvinduet.",
        "meaning": "Rette blikket mod noget interessant.",
        "translations": {
            "en": "to look", "de": "schauen / gucken", "es": "mirar", "ar": "ينظر", "fa": "نگاه کردن", "ku": "nihêrîn", "tr": "bakmak", "uk": "дивитися", "ru": "смотреть / глядеть", "vi": "nhìn", "zh": "看 / 瞧", "th": "มอง / ดู", "pt": "olhar", "ur": "دیکھنا", "ne": "हेर्नु", "ps": "کتل"
        }
    },
    "vente": {
        "clean": "vente",
        "word": "at vente",
        "nutid": "venter",
        "datid": "ventede",
        "icon": "⏱️",
        "x": 67,
        "y": 72,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Kvinden venter tålmodigt på bænken.",
        "meaning": "Blive stående eller siddende indtil nogen kommer.",
        "translations": {
            "en": "to wait", "de": "warten", "es": "esperar", "ar": "ينتظر", "fa": "منتظر ماندن", "ku": "bendeman", "tr": "beklemek", "uk": "чекати", "ru": "ждать", "vi": "chờ đợi", "zh": "等待", "th": "รอ", "pt": "esperar", "ur": "انتظار کرنا", "ne": "पर्खनु", "ps": "انتظار کول"
        }
    },
    "betale": {
        "clean": "betale",
        "word": "at betale",
        "nutid": "betaler",
        "datid": "betalte",
        "icon": "💳",
        "x": 8,
        "y": 60,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Manden betaler med penge på caféen.",
        "meaning": "Give penge for en vare, kaffe eller service.",
        "translations": {
            "en": "to pay", "de": "bezahlen", "es": "pagar", "ar": "يدفع", "fa": "پرداخت کردن", "ku": "pere dan", "tr": "ödemek", "uk": "платити", "ru": "платить", "vi": "thanh toán", "zh": "支付 / 付钱", "th": "จ่ายเงิน", "pt": "pagar", "ur": "ادائیگی کرنا", "ne": "तिर्नु", "ps": "پیسې ورکول"
        }
    },
    "åbne": {
        "clean": "åbne",
        "word": "at åbne",
        "nutid": "åbner",
        "datid": "åbnede",
        "icon": "🚪",
        "x": 12,
        "y": 46,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Drengen åbner døren foran skolen.",
        "meaning": "Gøre en dør eller et vindue åbent så man kan gå ind.",
        "translations": {
            "en": "to open", "de": "öffnen", "es": "abrir", "ar": "يفتح", "fa": "باز کردن", "ku": "vekirin", "tr": "açmak", "uk": "відкривати", "ru": "открывать", "vi": "mở", "zh": "打开", "th": "เปิด", "pt": "abrir", "ur": "کھولنا", "ne": "खोल्नु", "ps": "خلاصول"
        }
    },
    "have": {
        "clean": "have",
        "word": "at have",
        "nutid": "har",
        "datid": "havde",
        "icon": "🎒",
        "x": 50,
        "y": 40,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Chaufføren har et problem ved lyskrydset.",
        "meaning": "Være i besiddelse af en genstand eller befinde sig i en situation.",
        "translations": {
            "en": "to have", "de": "haben", "es": "tener", "ar": "يملك / لديه", "fa": "داشتن", "ku": "hebûn", "tr": "sahip olmak", "uk": "мати", "ru": "иметь", "vi": "có", "zh": "有 / 拥有", "th": "มี", "pt": "ter", "ur": "رکھنا", "ne": "हुनु", "ps": "لرل"
        }
    },
    "cykle": {
        "clean": "cykle",
        "word": "at cykle",
        "nutid": "cykler",
        "datid": "cyklede",
        "icon": "🚲",
        "x": 35,
        "y": 68,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Manden cykler sikkert på cykelstien.",
        "meaning": "Køre afsted på to hjul med pedaler.",
        "translations": {
            "en": "to cycle / bike", "de": "radfahren", "es": "ir en bicicleta", "ar": "يركب دراجة", "fa": "دوچرخه‌سواری کردن", "ku": "duçerxe ajotin", "tr": "bisiklete binmek", "uk": "їздити на велосипеді", "ru": "ездить на велосипеде", "vi": "đi xe đạp", "zh": "骑自行车", "th": "ขี่จักรยาน", "pt": "andar de bicicleta", "ur": "سائیکل چلانا", "ne": "साइकल चलाउनु", "ps": "بايسکل چلول"
        }
    },
    "stoppe": {
        "clean": "stoppe",
        "word": "at stoppe",
        "nutid": "stopper",
        "datid": "stoppede",
        "icon": "🛑",
        "x": 78,
        "y": 44,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Manden stopper ved fodgængerfeltet.",
        "meaning": "Bremse eller standse op i trafikken.",
        "translations": {
            "en": "to stop", "de": "anhalten / stoppen", "es": "parar / detenerse", "ar": "يتوقف", "fa": "ایستادن", "ku": "sekinandin", "tr": "durmak", "uk": "зупинятися", "ru": "останавливаться", "vi": "dừng lại", "zh": "停下", "th": "หยุด", "pt": "parar", "ur": "رکنا", "ne": "रोकिनु", "ps": "درېدل"
        }
    },
    "komme": {
        "clean": "komme",
        "word": "at komme",
        "nutid": "kommer",
        "datid": "kom",
        "icon": "🚌",
        "x": 85,
        "y": 26,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Den blå bybus kommer kørende.",
        "meaning": "Nå frem eller ankomme til stoppestedet.",
        "translations": {
            "en": "to come / arrive", "de": "kommen", "es": "venir / llegar", "ar": "يأتي", "fa": "آمدن", "ku": "hatin", "tr": "gelmek", "uk": "приходити", "ru": "приходить", "vi": "đến", "zh": "来 / 到来", "th": "มา", "pt": "vir / chegar", "ur": "آنا", "ne": "आउनु", "ps": "راغلل"
        }
    },
    "se": {
        "clean": "se",
        "word": "at se",
        "nutid": "ser",
        "datid": "så",
        "icon": "🌻",
        "x": 85,
        "y": 76,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Hun ser de flotte farverige blomster.",
        "meaning": "Opfatte noget med øjnene i bybilledet.",
        "translations": {
            "en": "to see", "de": "sehen", "es": "ver", "ar": "يرى", "fa": "دیدن", "ku": "dîtin", "tr": "görmek", "uk": "бачити", "ru": "видеть", "vi": "thấy", "zh": "看见", "th": "เห็น", "pt": "ver", "ur": "دیکھنا", "ne": "देख्नु", "ps": "لیدل"
        }
    },
    "finde": {
        "clean": "finde",
        "word": "at finde",
        "nutid": "finder",
        "datid": "fandt",
        "icon": "🔍",
        "x": 88,
        "y": 82,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Pigen finder en flot buket blomster.",
        "meaning": "Opdage eller lokalisere en genstand.",
        "translations": {
            "en": "to find", "de": "finden", "es": "encontrar", "ar": "يجد", "fa": "پیدا کردن", "ku": "peydakirin", "tr": "bulmak", "uk": "знаходити", "ru": "находить", "vi": "tìm thấy", "zh": "找到", "th": "พบ", "pt": "encontrar", "ur": "تلاش کرنا", "ne": "फेला पार्नु", "ps": "موندل"
        }
    },
    "handle": {
        "clean": "handle",
        "word": "at handle",
        "nutid": "handler",
        "datid": "handlede",
        "icon": "🛍️",
        "x": 6,
        "y": 52,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Mange mennesker handler i de små butikker.",
        "meaning": "Købe ind i byens forretninger.",
        "translations": {
            "en": "to shop", "de": "einkaufen", "es": "ir de compras", "ar": "يتسوق", "fa": "خرید کردن", "ku": "kirîn kirin", "tr": "alışveriş yapmak", "uk": "робити покупки", "ru": "делать покупки", "vi": "mua sắm", "zh": "购物", "th": "ซื้อของ", "pt": "fazer compras", "ur": "خریداری کرنا", "ne": "किनमेल गर्नु", "ps": "خریداره کول"
        }
    },
    "hjælpe": {
        "clean": "hjælpe",
        "word": "at hjælpe",
        "nutid": "hjælper",
        "datid": "hjalp",
        "icon": "🤝",
        "x": 8,
        "y": 60,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Ekspedienten hjælper kunden i butikken.",
        "meaning": "Give en håndsrækning eller vejlede en person.",
        "translations": {
            "en": "to help", "de": "helfen", "es": "ayudar", "ar": "يساعد", "fa": "کمک کردن", "ku": "alîkarî kirin", "tr": "yardım etmek", "uk": "допомагати", "ru": "помогать", "vi": "giúp đỡ", "zh": "帮助", "th": "ช่วย", "pt": "ajudar", "ur": "مدد کرنا", "ne": "मद्दत गर्नु", "ps": "مرسته کول"
        }
    },
    "bo": {
        "clean": "bo",
        "word": "at bo",
        "nutid": "bor",
        "datid": "boede",
        "icon": "🏡",
        "x": 60,
        "y": 15,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Mange familier bor i de smukke byhuse.",
        "meaning": "Have fast bopæl eller hjem i et hus eller lejlighed.",
        "translations": {
            "en": "to live / reside", "de": "wohnen", "es": "vivir", "ar": "يسكن", "fa": "زندگی کردن", "ku": "man", "tr": "yaşamak", "uk": "жити", "ru": "жить", "vi": "sống", "zh": "居住", "th": "อาศัยอยู่", "pt": "morar", "ur": "رہنا", "ne": "बस्नु", "ps": "اوسېدل"
        }
    },
    "skinne": {
        "clean": "skinne",
        "word": "at skinne",
        "nutid": "skinner",
        "datid": "skinnede",
        "icon": "☀️",
        "x": 65, "y": 8,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Solen skinner over byen.",
        "meaning": "Lyser varmt og klart fra himlen.",
        "translations": {
            "en": "to shine", "de": "scheinen", "es": "brillar", "ar": "يشرق / يلمع", "fa": "درخشیدن", "ku": "biriqîn", "tr": "parlamak", "uk": "світити", "ru": "светить", "vi": "tỏa sáng", "zh": "照耀 / 发光", "th": "ส่องแสง", "pt": "brilhar", "ur": "چمکنا", "ne": "चम्कनु", "ps": "ځلېدل"
        }
    },
    "vise": {
        "clean": "vise",
        "word": "at vise",
        "nutid": "viser",
        "datid": "viste",
        "icon": "⏰",
        "x": 56, "y": 17,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Uret viser tiden.",
        "meaning": "Peger på eller demonstrerer noget for øjet.",
        "translations": {
            "en": "to show", "de": "zeigen", "es": "mostrar", "ar": "يُظهر / يُبين", "fa": "نشان دادن", "ku": "nîşandan", "tr": "göstermek", "uk": "показувати", "ru": "показывать", "vi": "chỉ / hiển thị", "zh": "显示 / 展示", "th": "แสดง / ชี้บอก", "pt": "mostrar", "ur": "دکھانا", "ne": "देखाउनु", "ps": "ښودل"
        }
    },
    "sidde": {
        "clean": "sidde",
        "word": "at sidde",
        "nutid": "sidder",
        "datid": "sad",
        "icon": "☕",
        "x": 21, "y": 32,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "De sidder på en café.",
        "meaning": "Hvile kroppen på en stol eller bænk.",
        "translations": {
            "en": "to sit", "de": "sitzen", "es": "sentarse", "ar": "يجلس", "fa": "نشستن", "ku": "rûniştin", "tr": "oturmak", "uk": "сидіти", "ru": "сидеть", "vi": "ngồi", "zh": "坐", "th": "นั่ง", "pt": "sentar", "ur": "بیٹھنا", "ne": "बस्नु", "ps": "کښېناستل"
        }
    },
    "bruge": {
        "clean": "bruge",
        "word": "at bruge",
        "nutid": "bruger",
        "datid": "brugte",
        "icon": "🪙",
        "x": 8.5, "y": 63,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Kunden bruger penge.",
        "meaning": "Anvende penge, tid eller genstande.",
        "translations": {
            "en": "to use / spend", "de": "benutzen / ausgeben", "es": "usar / gastar", "ar": "يستخدم / ينفق", "fa": "استفاده کردن / خرج کردن", "ku": "bikar anîn", "tr": "kullanmak / harcamak", "uk": "використовувати / витрачати", "ru": "использовать / тратить", "vi": "dùng / tiêu", "zh": "使用 / 花费", "th": "ใช้ / จ่าย", "pt": "usar / gastar", "ur": "استعمال کرنا / خرچ کرنا", "ne": "प्रयोग गर्नु", "ps": "کارول / لګول"
        }
    },
    "koste": {
        "clean": "koste",
        "word": "at koste",
        "nutid": "koster",
        "datid": "kostede",
        "icon": "🏷️",
        "x": 5.5, "y": 55,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Brødet koster tyve kroner.",
        "meaning": "Have en bestemt salgspris i kroner.",
        "translations": {
            "en": "to cost", "de": "kosten", "es": "costar", "ar": "يكلف", "fa": "قیمت داشتن / ارزیدن", "ku": "bihabûn", "tr": "tutmak / mal olmak", "uk": "коштувати", "ru": "стоить", "vi": "có giá", "zh": "价值 / 售价", "th": "ราคา", "pt": "custar", "ur": "قیمت ہونا", "ne": "मूल्य पर्नु", "ps": "بیه لرل"
        }
    },
    "stå": {
        "clean": "stå",
        "word": "at stå",
        "nutid": "står",
        "datid": "stod",
        "icon": "🌳",
        "x": 78.5, "y": 71,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Der står et stort træ og en mand på gaden.",
        "meaning": "Være placeret oprejst på fødderne eller jorden.",
        "translations": {
            "en": "to stand", "de": "stehen", "es": "estar de pie / estar", "ar": "يقف", "fa": "ایستادن", "ku": "rawestîn", "tr": "ayakta durmak", "uk": "стояти", "ru": "стоять", "vi": "đứng", "zh": "站立 / 位于", "th": "ยืน / ตั้งอยู่", "pt": "ficar de pé / estar", "ur": "کھڑا ہونا", "ne": "उभिनु", "ps": "درېدل"
        }
    },
    "smile": {
        "clean": "smile",
        "word": "at smile",
        "nutid": "smiler",
        "datid": "smilede",
        "icon": "😊",
        "x": 55.5, "y": 63,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Barnet smiler glad.",
        "meaning": "Vise glæde med munden og ansigtet.",
        "translations": {
            "en": "to smile", "de": "lächeln", "es": "sonreír", "ar": "يبتسم", "fa": "لبخند زدن", "ku": "bişirîn", "tr": "gülümsemek", "uk": "усміхатися", "ru": "улыбаться", "vi": "mỉm cười", "zh": "微笑", "th": "ยิ้ม", "pt": "sorrir", "ur": "مسکرانا", "ne": "मुस्कुराउनु", "ps": "مسکېدل"
        }
    },
    "lege": {
        "clean": "lege",
        "word": "at lege",
        "nutid": "leger",
        "datid": "legede",
        "icon": "👦",
        "x": 62.5, "y": 58,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "En dreng leger i solen på pladsen.",
        "meaning": "Have det sjovt og lege med venner eller legetøj.",
        "translations": {
            "en": "to play (for children)", "de": "spielen", "es": "jugar", "ar": "يلعب", "fa": "بازی کردن", "ku": "lîstin", "tr": "oynamak", "uk": "гратися", "ru": "играть", "vi": "chơi đùa", "zh": "玩耍", "th": "เล่น", "pt": "brincar", "ur": "کھیلنا", "ne": "खेल्नु", "ps": "لوبې کول"
        }
    },
    "tale": {
        "clean": "tale",
        "word": "at tale",
        "nutid": "taler",
        "datid": "talte",
        "icon": "🗣️",
        "x": 93, "y": 60,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Hun taler venligt med en ven.",
        "meaning": "Bruge stemmen og ord til at samtale.",
        "translations": {
            "en": "to speak / talk", "de": "sprechen / reden", "es": "hablar", "ar": "يتكلم / يتحدث", "fa": "صحبت کردن", "ku": "axaftin", "tr": "konuşmak", "uk": "говорити", "ru": "говорить", "vi": "nói chuyện", "zh": "说话 / 交谈", "th": "พูดคุย", "pt": "falar / conversar", "ur": "بات کرنا", "ne": "बोल्नु", "ps": "خبرې کول"
        }
    },
    "holde": {
        "clean": "holde",
        "word": "at holde",
        "nutid": "holder",
        "datid": "holdt",
        "icon": "🛑",
        "x": 71, "y": 76,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "En bil holder ved vejen.",
        "meaning": "Stå stille eller parkere med et køretøj.",
        "translations": {
            "en": "to stop / park (vehicle)", "de": "halten / anhalten", "es": "parar / estacionar", "ar": "يقف (مركبة)", "fa": "توقف کردن (خودرو)", "ku": "sekinandin", "tr": "durmak (araç)", "uk": "зупинятися (авто)", "ru": "останавливаться (авто)", "vi": "đỗ xe / dừng lại", "zh": "停放 / 停下", "th": "จอด", "pt": "parar / estacionar", "ur": "گاڑی روکنا", "ne": "रोकिनु", "ps": "موټر درول"
        }
    },
    "drikke": {
        "clean": "drikke",
        "word": "at drikke",
        "nutid": "drikker",
        "datid": "drak",
        "icon": "☕",
        "x": 21, "y": 32,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "De drikker varm kaffe.",
        "meaning": "Indtage kaffe eller anden væske.",
        "translations": {
            "en": "to drink", "de": "trinken", "es": "beber", "ar": "يشرب", "fa": "نوشیدن", "ku": "vexwarin", "tr": "içmek", "uk": "пити", "ru": "пить", "vi": "uống", "zh": "喝", "th": "ดื่ม", "pt": "beber", "ur": "پینا", "ne": "पिउनु", "ps": "څښل"
        }
    },
    "krydse": {
        "clean": "krydse",
        "word": "at krydse",
        "nutid": "krydser",
        "datid": "krydsede",
        "icon": "🚶",
        "x": 78, "y": 44,
        "sceneImage": "assets/byrum_vrimmel.jpg",
        "sentence": "Manden krydser gaden ved fodgængerfeltet.",
        "meaning": "Gå tværs over vejen.",
        "translations": {
            "en": "to cross", "de": "überqueren", "es": "cruzar", "ar": "يعبر", "fa": "عبور کردن", "ku": "derbasbûn", "tr": "karşıya geçmek", "uk": "переходити", "ru": "переходить", "vi": "băng qua", "zh": "穿过 / 过马路", "th": "ข้าม", "pt": "cruzar / atravessar", "ur": "پار کرنا", "ne": "पार गर्नु", "ps": "پورې وتل"
        }
    }
};

// Aliases matching verbs in different sentence builder forms
export const verbAliasMap = {
    "kører": "køre", "kører i": "køre", "køre": "køre", "kørte": "køre", "kørt": "køre",
    "går": "gå", "går en tur på": "gå", "går en tur": "gå", "går med": "gå", "går på": "gå", "gå": "gå", "gik": "gå", "gået": "gå",
    "møder": "møde", "møde": "møde", "mødte": "møde", "mødt": "møde", "mødes": "møde",
    "kigger": "kigge", "kigger på": "kigge", "kigge": "kigge", "kiggede": "kigge", "kigget": "kigge",
    "venter": "vente", "venter på": "vente", "vente": "vente", "ventede": "vente", "ventet": "vente",
    "betaler": "betale", "betaler med": "betale", "betale": "betale", "betalte": "betale", "betalt": "betale",
    "åbner": "åbne", "åbne": "åbne", "åbnede": "åbne", "åbnet": "åbne",
    "har": "have", "have": "have", "havde": "have", "haft": "have",
    "cykler": "cykle", "cykle": "cykle", "cyklede": "cykle", "cyklet": "cykle", "cykler på": "cykle",
    "stopper": "stoppe", "stoppe": "stoppe", "stoppede": "stoppe", "stoppet": "stoppe",
    "kommer": "komme", "komme": "komme", "kom": "komme", "kommet": "komme",
    "ser": "se", "se": "se", "så": "se", "set": "se",
    "finder": "finde", "finde": "finde", "fandt": "finde", "fundet": "finde",
    "handler": "handle", "handle": "handle", "handlede": "handle", "handlet": "handle",
    "hjælper": "hjælpe", "hjælpe": "hjælpe", "hjalp": "hjælpe", "hjulpet": "hjælpe",
    "bor": "bo", "bo": "bo", "boede": "bo", "boet": "bo",
    "skinner": "skinne", "skinne": "skinne", "skinnede": "skinne",
    "viser": "vise", "vise": "vise", "viste": "vise", "vist": "vise",
    "sidder": "sidde", "sidde": "sidde", "sad": "sidde", "siddet": "sidde",
    "bruger": "bruge", "bruge": "bruge", "brugte": "bruge", "brugt": "bruge",
    "koster": "koste", "koste": "koste", "kostede": "koste", "kostet": "koste",
    "står": "stå", "stå": "stå", "stod": "stå", "stået": "stå",
    "smiler": "smile", "smile": "smile", "smilede": "smile", "smilet": "smile",
    "leger": "lege", "lege": "lege", "legede": "lege", "leget": "lege",
    "taler": "tale", "tale": "tale", "talte": "tale", "talt": "tale",
    "holder": "holde", "holde": "holde", "holdt": "holde", "holder på": "holde", "holder ved": "holde",
    "drikker": "drikke", "drikke": "drikke", "drak": "drikke", "drukket": "drikke",
    "krydser": "krydse", "krydse": "krydse", "krydsede": "krydse", "krydset": "krydse"
};

let stylesInjected = false;
function ensureVerbQuickPeekStyles() {
    if (stylesInjected) return;
    const style = document.createElement('style');
    style.textContent = `
        .verb-quick-peek-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.82);
            backdrop-filter: blur(6px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            animation: vqpFadeIn 0.22s ease-out;
        }
        @keyframes vqpFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .verb-quick-peek-overlay.fade-out {
            animation: vqpFadeOut 0.18s ease-in forwards;
        }
        @keyframes vqpFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }

        .verb-quick-peek-modal {
            background: #1e293b;
            border: 2px solid rgba(239, 68, 68, 0.4);
            border-radius: 22px;
            width: 100%;
            max-width: 480px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(239, 68, 68, 0.25);
            animation: vqpSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            color: #f8fafc;
        }
        @keyframes vqpSlideUp {
            from { transform: translateY(18px) scale(0.96); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .vqp-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.85rem 1.2rem;
            background: #0f172a;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .vqp-modal-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(239, 68, 68, 0.18);
            border: 1px solid #ef4444;
            color: #fca5a5;
            padding: 0.3rem 0.75rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .vqp-close-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            font-size: 1.3rem;
            cursor: pointer;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        .vqp-close-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.1);
        }

        .vqp-viewport {
            width: 100%;
            height: 200px;
            background-size: 320%;
            background-repeat: no-repeat;
            position: relative;
            background-color: #0f172a;
            border-bottom: 2px solid rgba(239, 68, 68, 0.3);
        }

        .vqp-modal-content {
            padding: 1.4rem;
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
        }
        .vqp-word-title-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.6rem;
            flex-wrap: wrap;
        }
        .vqp-word-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .vqp-verb-tag {
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid #ef4444;
            color: #fca5a5;
            padding: 0.25rem 0.65rem;
            border-radius: 8px;
            font-weight: 800;
            font-size: 0.82rem;
        }

        .vqp-forms-row {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 0.6rem 0.9rem;
            font-size: 0.92rem;
            color: #cbd5e1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .vqp-forms-row strong {
            color: #fca5a5;
        }

        .vqp-sentence-quote {
            background: rgba(239, 68, 68, 0.08);
            border-left: 3px solid #ef4444;
            padding: 0.65rem 0.9rem;
            border-radius: 0 10px 10px 0;
            font-size: 0.98rem;
            font-style: italic;
            color: #f1f5f9;
        }

        .vqp-meaning-text {
            color: #cbd5e1;
            font-size: 0.93rem;
            line-height: 1.45;
        }

        /* Translation Toggle */
        .vqp-translation-wrapper {
            margin-top: 0.2rem;
        }
        .vqp-reveal-trans-btn {
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px dashed rgba(255, 255, 255, 0.2);
            color: #cbd5e1;
            padding: 0.6rem;
            border-radius: 10px;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
        }
        .vqp-reveal-trans-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-color: rgba(255, 255, 255, 0.4);
        }
        .vqp-translation-card {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.15));
            border: 1px solid rgba(239, 68, 68, 0.4);
            border-radius: 10px;
            padding: 0.75rem 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            animation: vqpFadeIn 0.2s ease;
        }
        .vqp-trans-lang-label {
            font-size: 0.82rem;
            color: #fca5a5;
            font-weight: 700;
        }
        .vqp-trans-text {
            font-size: 1.05rem;
            color: white;
            font-weight: 800;
        }

        .vqp-actions-row {
            display: flex;
            gap: 0.6rem;
            margin-top: 0.4rem;
            flex-wrap: wrap;
        }
        .vqp-listen-btn, .vqp-resume-btn, .vqp-deep-link-btn {
            padding: 0.65rem 1.1rem;
            border-radius: 12px;
            font-size: 0.92rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            flex: 1;
            min-width: 140px;
        }
        .vqp-listen-btn {
            background: #0f172a;
            border: 1px solid #475569;
            color: #e2e8f0;
        }
        .vqp-listen-btn:hover {
            border-color: #ef4444;
            color: white;
        }
        .vqp-resume-btn {
            background: #ef4444;
            border: none;
            color: white;
            box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
        }
        .vqp-resume-btn:hover {
            background: #dc2626;
            transform: translateY(-1px);
        }
        .vqp-deep-link-btn {
            width: 100%;
            background: rgba(239, 68, 68, 0.12);
            border: 1px solid rgba(239, 68, 68, 0.35);
            color: #fca5a5;
            margin-top: 0.2rem;
            font-size: 0.88rem;
        }
        .vqp-deep-link-btn:hover {
            background: rgba(239, 68, 68, 0.25);
            color: white;
            border-color: #ef4444;
        }

        .verb-cross-link {
            color: #f87171;
            font-weight: 700;
            border-bottom: 1.5px dashed rgba(239, 68, 68, 0.7);
            cursor: pointer;
            padding: 1px 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 2px;
            text-decoration: none;
        }
        .verb-cross-link:hover {
            background: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
            border-bottom-style: solid;
            border-bottom-color: #ef4444;
            transform: translateY(-1px);
        }
        .verb-cross-link .vlink-icon {
            font-size: 0.72rem;
            opacity: 0.85;
            margin-left: 2px;
        }
    `;
    document.head.appendChild(style);
    stylesInjected = true;
}

export function openVerbQuickPeekModal(verbTextOrKey, navigateFn = null) {
    ensureVerbQuickPeekStyles();

    if (!verbTextOrKey) return;
    const cleanKey = verbTextOrKey.toLowerCase().trim();
    const resolvedKey = verbAliasMap[cleanKey] || cleanKey;
    const verb = byrumVerbsRegistry[resolvedKey];

    if (!verb) {
        // Fallback: simple speak if not in registry
        speakDanish(verbTextOrKey);
        return;
    }

    const existing = document.querySelector('.verb-quick-peek-overlay');
    if (existing) existing.remove();

    const lang = getLang ? getLang() : 'da';
    const translationText = (verb.translations && verb.translations[lang]) || (verb.translations && verb.translations['en']) || verb.word;

    const overlay = document.createElement('div');
    overlay.className = 'verb-quick-peek-overlay';

    overlay.innerHTML = `
        <div class="verb-quick-peek-modal">
            <div class="vqp-modal-header">
                <span class="vqp-modal-badge">🔴 Verbum (Handling i byrummet)</span>
                <button class="vqp-close-btn" id="vqp-close-x" title="Luk">✕</button>
            </div>
            <div class="vqp-viewport" style="background-image: url('${verb.sceneImage}'); background-position: ${verb.x}% ${verb.y}%;">
            </div>
            <div class="vqp-modal-content">
                <div class="vqp-word-title-row">
                    <div class="vqp-word-title">${verb.icon} ${verb.word}</div>
                    <span class="vqp-verb-tag">Nutid: ${verb.nutid}</span>
                </div>
                <div class="vqp-forms-row">
                    <span>Infinitiv: <strong>${verb.word}</strong></span>
                    <span>Nutid: <strong>${verb.nutid}</strong></span>
                    <span>Datid: <strong>${verb.datid}</strong></span>
                </div>
                <div class="vqp-sentence-quote">
                    "${verb.sentence}"
                </div>
                <div class="vqp-meaning-text">
                    💡 ${verb.meaning}
                </div>

                <!-- Aktiv genkaldelse: Oversættelse skjult som standard -->
                <div class="vqp-translation-wrapper">
                    <button class="vqp-reveal-trans-btn" id="vqp-reveal-btn">
                        <span>💡</span> Er du i tvivl om handlingen? Vis oversættelse
                    </button>
                    <div class="vqp-translation-card" id="vqp-trans-card" style="display: none;">
                        <span class="vqp-trans-lang-label">🌍 Oversættelse (${lang.toUpperCase()}):</span>
                        <strong class="vqp-trans-text">${translationText}</strong>
                    </div>
                </div>

                <div class="vqp-actions-row">
                    <button class="vqp-listen-btn" id="vqp-speak-btn">
                        <span>🔊</span> Lyt til verbet
                    </button>
                    <button class="vqp-resume-btn" id="vqp-resume-btn">
                        Fortsæt opgaven ➔
                    </button>
                </div>

                ${navigateFn ? `
                    <button class="vqp-deep-link-btn" id="vqp-deep-link-btn">
                        <span>↗️</span> Udforsk "${verb.word}" i "De 100 verber – Byrummet"
                    </button>
                ` : ''}
            </div>
        </div>
    `;

    function closeModal() {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 180);
    }

    overlay.querySelector('#vqp-close-x').onclick = closeModal;
    overlay.querySelector('#vqp-resume-btn').onclick = closeModal;
    overlay.querySelector('#vqp-speak-btn').onclick = () => speakDanish(verb.nutid);

    const revealBtn = overlay.querySelector('#vqp-reveal-btn');
    const transCard = overlay.querySelector('#vqp-trans-card');
    revealBtn.onclick = () => {
        revealBtn.style.display = 'none';
        transCard.style.display = 'flex';
    };

    if (navigateFn) {
        const deepBtn = overlay.querySelector('#vqp-deep-link-btn');
        if (deepBtn) {
            deepBtn.onclick = () => {
                closeModal();
                navigateFn('verber_byrum');
            };
        }
    }

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
    speakDanish(verb.nutid);
}

// Build regex for all verb aliases, sorted by length descending so longer multi-word phrases match first
const sortedVerbAliases = Object.keys(verbAliasMap).sort((a, b) => b.length - a.length);
const verbPattern = new RegExp(`\\b(${sortedVerbAliases.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');

export function formatVerbLinks(text) {
    if (!text || typeof text !== 'string') return text;
    ensureVerbQuickPeekStyles();

    return text.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, textChunk) => {
        if (tag) return tag;
        return textChunk.replace(verbPattern, (m) => {
            const clean = m.toLowerCase();
            const verbKey = verbAliasMap[clean];
            if (!verbKey) return m;
            const verbObj = byrumVerbsRegistry[verbKey] || { word: `at ${verbKey}` };
            return `<span class="verb-cross-link" data-verb="${verbKey}" title="Gå til verbumfladen for '${verbObj.word}' ↗️">${m} <small class="vlink-icon">↗️</small></span>`;
        });
    });
}

export function attachVerbLinkListeners(containerEl, navigateFn, currentTab = 'tab_vrimmel') {
    if (!containerEl || !navigateFn) return;
    ensureVerbQuickPeekStyles();

    containerEl.querySelectorAll('.verb-cross-link').forEach(el => {
        el.onclick = (e) => {
            e.stopPropagation();
            const verbKey = el.dataset.verb;
            if (verbKey) {
                navigateFn('verber_byrum', {
                    targetVerb: verbKey,
                    returnView: 'byrummet_vrimmel',
                    returnTab: currentTab,
                    returnLabel: 'Byrummet (Substantiver)'
                });
            }
        };
    });
}

