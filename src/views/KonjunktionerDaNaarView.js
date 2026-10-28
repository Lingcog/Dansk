import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';
import { getConjunctionWordTranslation } from '../utils/top100_konjunktioner_translations.js';

/**
 * KonjunktionerDaNaarView - Særskilt Flade: "DA" og "NÅR"
 *
 * Kombinerer:
 *  1. Interaktivt Vrimlebillede (assets/da_naar_vrimmel.jpg) med 12 hotspots opdelt i:
 *     - 📌 DA (Tegnestiften): Én bestemt gang / afsluttet periode i fortiden
 *     - 🔁 NÅR (Cirklen / Rundkørslen): Gentagne vaner ("hver gang" – både i nutid og fortid!)
 *     - 🏹 NÅR (Fremtidspilen): Begivenheder i fremtiden
 *  2. Den kognitive illustration fra Træning 2 (da_naar_guide_future.jpg) integreret direkte i fladen
 *  3. Ordstillings-røntgen ("IKKE"-magneten i da/når-ledsætninger + Inversion når da/når står forrest)
 *  4. 6 interaktive faner inkl. Træning 2-opgaverne, Da/Når-Detektiven, Sætningsbyggeren og Fortids-Duellen
 */
export function renderKonjunktionerDaNaarView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container da-naar-view';

    // Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.flexWrap = 'wrap';
    topBar.style.gap = '0.8rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← Tilbage til Konjunktioner-fladen`;
    backBtn.onclick = () => navigateFn(extraData.from || 'top_konjunktioner');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // TTS Audio Helper (disabled)
    function speakDanish(text) {
        return;
    }

    // 12 Hotspots on assets/da_naar_vrimmel.jpg
    const DA_NAAR_DATA = [
        // 📌 DA: Tegnestiften (Fortid 1 gang / specifik periode)
        {
            id: 'da_cykel',
            word: 'da (fortid • 1 gang)',
            shortLabel: '📌 da (lærte at cykle)',
            targetWord: 'da',
            category: 'da_fortid',
            cognitiveIcon: '📌 Tegnestiften (Én gang i fortiden)',
            x: 9,
            y: 20,
            meaning: 'Peger på en specifik, afsluttet begivenhed i fortiden ("when" in the past)',
            sceneDesc: 'På væggen hænger billedet af drengen på den røde cykel, da han lærte at cykle som 5-årig.',
            sentence: 'Jeg var meget stolt, da jeg lærte at cykle.',
            contextSentence: 'Da jeg var fem år gammel, fik jeg min første røde cykel i fødselsdagsgave.',
            ruleHint: '📌 TEGNESTIFTEN: At lære at cykle eller være 5 år gammel skete kun ÉN gang i fortiden ➔ Derfor bruger vi altid "da"!',
            translations: {
                en: { word: 'when (single event/period in the past)', sentence: 'When I was five years old, I got my first red bicycle as a birthday present.' },
                de: { word: 'als (einmalig in der Vergangenheit)', sentence: 'Als ich fünf Jahre alt war, bekam ich mein erstes rotes Fahrrad.' },
                es: { word: 'cuando (una vez en el pasado)', sentence: 'Cuando tenía cinco años, recibí mi primera bicicleta roja.' },
                ar: { word: 'عِنْدَمَا / لَمَّا (لمرة واحدة في الماضي)', sentence: 'عندما كنت في الخامسة من عمري، حصلت على دراجتي الحمراء الأولى.' },
                tr: { word: '-diğinde / zaman (geçmişte tek sefer: "da")', sentence: 'Beş yaşındayken doğum günü hediyesi olarak ilk kırmızı bisikletimi aldım.' },
                uk: { word: 'коли (одноразово в минулому: "da")', sentence: 'Коли мені було п\'ять років, я отримав свій перший червоний велосипед.' }
            }
        },
        {
            id: 'da_italien',
            word: 'da (ferieminde i fortiden)',
            shortLabel: '📌 da (i Italien)',
            targetWord: 'da',
            category: 'da_fortid',
            cognitiveIcon: '📌 Tegnestiften (Afsluttet periode i fortiden)',
            x: 23,
            y: 24,
            meaning: 'Sætter en tegnestift i en bestemt ferie eller barndomsperiode i fortiden',
            sceneDesc: 'Familiebilledet fra stranden viser den sommer, da familien var i Italien og spiste is.',
            sentence: 'Jeg var i Italien, da jeg var barn.',
            contextSentence: 'Vi spiste store vaffelis på stranden, da vi var på sommerferie i Italien.',
            ruleHint: '📌 TEGNESTIFTEN: Barndommen og ferien i Italien er afsluttede kapitler i fortiden ➔ "da jeg var barn".',
            translations: {
                en: { word: 'when (in the past)', sentence: 'We ate big ice cream cones on the beach when we were on summer holiday in Italy.' },
                de: { word: 'als (in der Vergangenheit)', sentence: 'Wir aßen großes Eis am Strand, als wir im Sommerurlaub in Italien waren.' },
                es: { word: 'cuando (en el pasado)', sentence: 'Comimos helados en la playa cuando estábamos de vacaciones en Italia.' },
                ar: { word: 'عِنْدَمَا (في الماضي)', sentence: 'أكلنا المثلجات على الشاطئ عندما كنا في عطلة صيفية في إيطاليا.' },
                tr: { word: 'çocukken / gittiğimizde ("da")', sentence: 'İtalya\'da yaz tatilindeyken sahilde büyük dondurmalar yedik.' },
                uk: { word: 'коли (в минулому)', sentence: 'Ми їли морозиво на пляжі, коли були у відпустці в Італії.' }
            }
        },
        {
            id: 'da_karakter',
            word: 'da (bestemt øjeblik i fortiden)',
            shortLabel: '📌 da (så karakter)',
            targetWord: 'da',
            category: 'da_fortid',
            cognitiveIcon: '📌 Tegnestiften (Konkret øjeblik i fortiden)',
            x: 20,
            y: 42,
            meaning: 'Ét konkret øjeblik i fortiden, hvor noget skete',
            sceneDesc: 'På billedet står studenten med sit eksamensbevis i hånden i det øjeblik, han bestod.',
            sentence: 'Jeg blev meget glad, da jeg så min karakter.',
            contextSentence: 'Da han endelig bestod sin sidste eksamen, krammede han sin kæreste i solen.',
            ruleHint: '📌 TEGNESTIFTEN: At se sin eksamenskarakter skete på ét bestemt tidspunkt i fortiden. Bemærk også inversion når "Da..." står forrest: "Da han bestod, KRAMMEDE HAN..."!',
            translations: {
                en: { word: 'when (specific moment in the past)', sentence: 'When he finally passed his final exam, he hugged his girlfriend in the sun.' },
                de: { word: 'als (bestimmter Moment in der Vergangenheit)', sentence: 'Als er endlich seine letzte Prüfung bestand, umarmte er seine Freundin.' },
                es: { word: 'cuando (momento específico en el pasado)', sentence: 'Cuando finalmente aprobó su último examen, abrazó a su novia.' },
                ar: { word: 'عِنْدَمَا (لحظة محددة في الماضي)', sentence: 'عندما نجح أخيرًا في امتحانه الأخير، عانق صديقته في الشمس.' },
                tr: { word: 'notumu gördüğümde ("da")', sentence: 'Son sınavını nihayet geçtiğinde güneşin altında kız arkadaşına sarıldı.' },
                uk: { word: 'коли (конкретна мить у минулому)', sentence: 'Коли він нарешті склав останній іспит, він обійняв свою дівчину.' }
            }
        },
        {
            id: 'da_huen',
            word: 'da (+ "ikke" før verbet)',
            shortLabel: '📌 da (fik huen på)',
            targetWord: 'da',
            category: 'da_fortid',
            cognitiveIcon: '📌 Tegnestiften + Ledsætnings-ordstilling',
            x: 7,
            y: 54,
            meaning: 'Ledsætning med "da" har altid "ikke/aldrig" FØR verbet',
            sceneDesc: 'Pigen på billedet kaster studenterhuen i luften af glæde.',
            sentence: 'Hun græd af glæde, da hun fik studenterhuen på.',
            contextSentence: 'Hun troede næsten ikke sine egne øjne, da hun ikke længere havde flere eksamener tilbage.',
            ruleHint: '🧲 HUSK: Både "da" og "når" er LEDSÆTNINGSKONJUNKTIONER! Derfor står "ikke" altid FØR verbet efter "da" og "når" ("... da hun IKKE havde...").',
            translations: {
                en: { word: 'when (+ subclause word order)', sentence: 'She cried with joy when she put on her graduation cap.' },
                de: { word: 'als (+ Nebensatz-Wortstellung)', sentence: 'Sie weinte vor Freude, als sie die Studentenmütze aufsetzte.' },
                es: { word: 'cuando (+ orden de oración subordinada)', sentence: 'Lloró de alegría cuando se puso el gorro de graduación.' },
                ar: { word: 'عِنْدَمَا (+ ترتيب الجملة الفرعية)', sentence: 'بكت من الفرح عندما ارتدت قبعة التخرج.' },
                tr: { word: 'mezuniyet kepini taktığında ("da")', sentence: 'Mezuniyet kepini taktığında mutluluktan ağladı.' },
                uk: { word: 'коли (+ порядок слів підрядного речення)', sentence: 'Вона плакала від радості, коли одягла студентський кашкет.' }
            }
        },
        {
            id: 'da_igaar_bus',
            word: 'da (i går / i morges)',
            shortLabel: '📌 da (det regnede i går)',
            targetWord: 'da',
            category: 'da_fortid',
            cognitiveIcon: '📌 Tegnestiften ("i går / i morges / sidste uge")',
            x: 25,
            y: 55,
            meaning: 'Tidsudtryk som "i går", "i morges", "i søndags" udløser "da"',
            sceneDesc: 'På billedet står pigen ved busstoppestedet i regnvejret i går eftermiddags.',
            sentence: 'Det øsregnede, da jeg ventede på bussen i går.',
            contextSentence: 'Da jeg gik ud ad døren i morges klokken otte, begyndte det pludselig at regne.',
            ruleHint: '📌 SIGNALORD FOR "DA": Ord som "i går", "i morges", "i 2020", "sidste år", "pludselig" viser, at det kun skete én bestemt gang i fortiden ➔ brug "da"!',
            translations: {
                en: { word: 'when (yesterday / this morning)', sentence: 'It was pouring rain when I waited for the bus yesterday.' },
                de: { word: 'als (gestern / heute Morgen)', sentence: 'Es goss in Strömen, als ich gestern auf den Bus wartete.' },
                es: { word: 'cuando (ayer / esta mañana)', sentence: 'Llovía a cántaros cuando esperé el autobús ayer.' },
                ar: { word: 'عِنْدَمَا (أمس / هذا الصباح)', sentence: 'كانت تمطر بغزارة عندما انتظرت الحافلة أمس.' },
                tr: { word: 'dün otobüsü beklerken ("da")', sentence: 'Dün otobüsü beklediğim sırada bardaktan boşanırcasına yağmur yağıyordu.' },
                uk: { word: 'коли (вчора / сьогодні вранці)', sentence: 'Лila злива, коли я чекав на автобус учора.' }
            }
        },

        // 🔁 NÅR: Cirklen / Rundkørslen (Gentagen vane - "hver gang")
        {
            id: 'naar_kaffe',
            word: 'når (fast vane • hver morgen)',
            shortLabel: '🔁 når (morgenkaffe)',
            targetWord: 'når',
            category: 'naar_vane',
            cognitiveIcon: '🔁 Cirklen (Gentagen vane: "hver gang")',
            x: 45,
            y: 24,
            meaning: 'Bruges om faste rutiner og vaner, der gentager sig ("whenever / every time")',
            sceneDesc: 'Hver morgen klokken 7 brygger manden i køkkenet en kop varm kaffe.',
            sentence: 'Jeg drikker altid kaffe, når jeg står op om morgenen.',
            contextSentence: 'Når vækkeuret ringer klokken syv, går han straks ud i køkkenet og tænder kaffemaskinen.',
            ruleHint: '🔁 CIRKLEN (RUNDKØRSLEN): Når noget sker IGEN OG IGEN (hver morgen, altid, plejer), bruger vi altid "når"!',
            translations: {
                en: { word: 'when / whenever (repeated habit)', sentence: 'I always drink coffee when I get up in the morning.' },
                de: { word: 'wenn / jedes Mal wenn (Gewohnheit)', sentence: 'Ich trinke immer Kaffee, wenn ich morgens aufstehe.' },
                es: { word: 'cuando / cada vez que (hábito)', sentence: 'Siempre tomo café cuando me levanto por la mañana.' },
                ar: { word: 'عِنْدَمَا / كُلَّمَا (عادة متكررة)', sentence: 'أشرب القهوة دائمًا عندما أستيقظ في الصباح.' },
                tr: { word: '-diğinde / her sabah ("når" = alışkanlık)', sentence: 'Sabahları kalktığımda her zaman kahve içerim.' },
                uk: { word: 'коли / щоразу як (звичка: "når")', sentence: 'Я завжди п\'ю каву, коли прокидаюся вранці.' }
            }
        },
        {
            id: 'naar_paraply',
            word: 'når (hver gang det regner)',
            shortLabel: '🔁 når (det regner)',
            targetWord: 'når',
            category: 'naar_vane',
            cognitiveIcon: '🔁 Cirklen (Altid / hver gang)',
            x: 55,
            y: 42,
            meaning: 'Generel regel eller vane i hverdagen ("whenever it rains")',
            sceneDesc: 'Kvinden i midten slår sin gule paraply op og har gummistøvler på, hver gang det regner.',
            sentence: 'Når det regner, tager jeg altid paraply med.',
            contextSentence: 'Hun tager altid sine gule gummistøvler på, når det regner og er vådt udenfor.',
            ruleHint: '🔁 SE FORSKELLEN: "DA det regnede i går, blev jeg våd" (📌 1 gang i fortiden) ↔ "NÅR det regner, tager jeg altid paraply med" (🔁 Cirklen: hver gang)!',
            translations: {
                en: { word: 'when / whenever (general truth/habit)', sentence: 'When it rains, I always bring an umbrella.' },
                de: { word: 'wenn (immer wenn es regnet)', sentence: 'Wenn es regnet, nehme ich immer einen Regenschirm mit.' },
                es: { word: 'cuando (siempre que llueve)', sentence: 'Cuando llueve, siempre llevo paraguas.' },
                ar: { word: 'عِنْدَمَا / كُلَّمَا تُمْطِرُ', sentence: 'عندما تمطر، آخذ معي مظلة دائمًا.' },
                tr: { word: 'yağmur yağdığında (her seferinde: "når")', sentence: 'Yağmur yağdığında her zaman yanıma şemsiye alırım.' },
                uk: { word: 'коли (щоразу коли йде дощ: "når")', sentence: 'Коли йде дощ, я завжди беру з собою парасольку.' }
            }
        },
        {
            id: 'naar_hund',
            word: 'når (gentagen glæde)',
            shortLabel: '🔁 når (ser min hund)',
            targetWord: 'når',
            category: 'naar_vane',
            cognitiveIcon: '🔁 Cirklen (Gentagen hændelse)',
            x: 43,
            y: 74,
            meaning: 'Noget der udløser det samme resultat hver gang',
            sceneDesc: 'Hunden ved hoveddøren logrer glad med halen, hver gang kvinden kommer hjem.',
            sentence: 'Jeg bliver meget glad, når jeg ser min hund.',
            contextSentence: 'Hunden logrer vildt med halen, når familien kommer hjem om eftermiddagen.',
            ruleHint: '🔁 PRØV "HVER GANG"-TESTEN: Hvis du kan erstatte ordet med "hver gang" ("Jeg bliver glad, HVER GANG jeg ser min hund"), skal det ALTID være "når"!',
            translations: {
                en: { word: 'when / every time', sentence: 'I get very happy when I see my dog.' },
                de: { word: 'wenn / jedes Mal wenn', sentence: 'Ich werde sehr froh, wenn ich meinen Hund sehe.' },
                es: { word: 'cuando / cada vez que', sentence: 'Me pongo muy feliz cuando veo a mi perro.' },
                ar: { word: 'عِنْدَمَا / كُلَّمَا', sentence: 'أشعر بسعادة كبيرة عندما أرى كلبي.' },
                tr: { word: 'köpeğimi her gördüğümde ("når")', sentence: 'Köpeğimi gördüğümde çok mutlu oluyorum.' },
                uk: { word: 'коли / щоразу коли', sentence: 'Я дуже радію, коли бачу свого собаку.' }
            }
        },
        {
            id: 'naar_gartner',
            word: 'når (betingelse i tid)',
            shortLabel: '🔁 når (det er tørvejr)',
            targetWord: 'når',
            category: 'naar_vane',
            cognitiveIcon: '🔁 Cirklen (Fast arbejdsrutine)',
            x: 64,
            y: 74,
            meaning: 'Beskriver hvornår en fast handling plejer at finde sted',
            sceneDesc: 'Gartneren i de grønne overalls slår græsplænen i solskinnet.',
            sentence: 'Gartneren klipper kun græsset, når det er tørvejr.',
            contextSentence: 'Når solen skinner over parken, slår gartneren græsset og vander blomsterne.',
            ruleHint: '🔁 OGSÅ VANE I FORTIDEN! Selv i datid bruger man "når", hvis det skete MANGE GANGE ("Da jeg var barn [1 periode], legede vi altid ude, NÅR solen skinnede [hver gang]!").',
            translations: {
                en: { word: 'when (whenever weather is dry)', sentence: 'The gardener only mows the grass when the weather is dry.' },
                de: { word: 'wenn (immer bei trockenem Wetter)', sentence: 'Der Gärtner mäht das Gras nur, wenn es trocken ist.' },
                es: { word: 'cuando (siempre que hace buen tiempo)', sentence: 'El jardinero solo corta el césped cuando el tiempo está seco.' },
                ar: { word: 'عِنْدَمَا (كلما كان الطقس جافًا)', sentence: 'لا يقص البستاني العشب إلا عندما يكون الطقس جافًا.' },
                tr: { word: 'hava kuru olduğunda ("når")', sentence: 'Bahçıvan çimleri yalnızca hava kuru olduğunda biçer.' },
                uk: { word: 'коли (щоразу за сухої погоди)', sentence: 'Садівник косить траву лише тоді, коли погода суха.' }
            }
        },

        // 🏹 NÅR: Fremtidspilen (Fremtidige begivenheder)
        {
            id: 'naar_fremtid_rejse',
            word: 'når (fremtid • rejse)',
            shortLabel: '🏹 når (vi rejser)',
            targetWord: 'når',
            category: 'naar_fremtid',
            cognitiveIcon: '🏹 Fremtidspilen (Endnu ikke sket!)',
            x: 76,
            y: 27,
            meaning: 'Bruges om alt i fremtiden – selv hvis det kun sker én gang i fremtiden!',
            sceneDesc: 'Drengen kigger i kikkerten ud mod flyet og palmestranden, som venter i fremtiden.',
            sentence: 'Vi skal bade hver dag, når vi kommer ned til varmen.',
            contextSentence: 'Når flyet lander på ferieøen i næste uge, løber vi direkte ned på stranden.',
            ruleHint: '🏹 FREMTIDSPILEN: På dansk kan man ALDRIG bruge "da" om fremtiden! Selv hvis rejsen kun sker én enkelt gang i morgen eller næste år, hedder det ALTID "når"!',
            translations: {
                en: { word: 'when (in the future)', sentence: 'When the plane lands on the holiday island next week, we will run straight to the beach.' },
                de: { word: 'wenn (in der Zukunft – NIEMALS "da"!)', sentence: 'Wenn das Flugzeug nächste Woche landet, laufen wir direkt zum Strand.' },
                es: { word: 'cuando (en el futuro)', sentence: 'Cuando el avión aterrice la próxima semana, correremos directamente a la playa.' },
                ar: { word: 'عِنْدَمَا (في المستقبل – دائمًا "når"!)', sentence: 'عندما تهبط الطائرة الأسبوع المقبل، سنركض مباشرة إلى الشاطئ.' },
                tr: { word: 'gelecekte -diğinde (her zaman "når"!)', sentence: 'Gelecek hafta uçak tatil adasına indiğinde doğrudan sahile koşacağız.' },
                uk: { word: 'коли (в майбутньому – завжди "når"!)', sentence: 'Коли літак приземлиться наступного тижня, ми одразу побіжимо на пляж.' }
            }
        },
        {
            id: 'naar_kalender',
            word: 'når (fremtidsplan i kalenderen)',
            shortLabel: '🏹 når (bliver færdig)',
            targetWord: 'når',
            category: 'naar_fremtid',
            cognitiveIcon: '🏹 Fremtidspilen (Plan i kalenderen)',
            x: 84,
            y: 53,
            meaning: 'Peger fremad i kalenderen mod et kommende tidspunkt',
            sceneDesc: 'Kalenderbladene bladrer fremad mod næste måned og nye fremtidsplaner.',
            sentence: 'Når jeg bliver 18 år i næste måned, vil jeg tage kørekort.',
            contextSentence: 'Når sommerferien starter om to uger, tager vi i sommerhus ved Vesterhavet.',
            ruleHint: '🏹 PAS PÅ FÆLDEN: "DA jeg blev 10 år [i fortiden]" ↔ "NÅR jeg bliver 18 år [i fremtiden]". Fremtid = ALTID "når"!',
            translations: {
                en: { word: 'when (future milestone)', sentence: 'When I turn 18 next month, I want to get a driver\'s license.' },
                de: { word: 'wenn (zukünftiger Zeitpunkt)', sentence: 'Wenn ich nächsten Monat 18 werde, mache ich den Führerschein.' },
                es: { word: 'cuando (en el futuro)', sentence: 'Cuando cumpla 18 años el próximo mes, sacaré el carné de conducir.' },
                ar: { word: 'عِنْدَمَا (حدث مستقبلي)', sentence: 'عندما أبلغ الثامنة عشرة الشهر المقبل، سأحصل على رخصة قيادة.' },
                tr: { word: 'gelecek ay 18 yaşına girdiğimde ("når")', sentence: 'Gelecek ay 18 yaşına girdiğimde ehliyet almak istiyorum.' },
                uk: { word: 'коли (подія в майбутньому)', sentence: 'Коли мені виповниться 18 наступного місяця, я отримаю водійські права.' }
            }
        },
        {
            id: 'naar_ringer',
            word: 'når (kommer hjem om lidt)',
            shortLabel: '🏹 når (kommer hjem)',
            targetWord: 'når',
            category: 'naar_fremtid',
            cognitiveIcon: '🏹 Fremtidspilen + Inversion',
            x: 92,
            y: 76,
            meaning: 'Handling der sker lige om lidt eller senere i dag',
            sceneDesc: 'Den unge mand står klar med mobilen foran opgangen for at ringe, når han kommer hjem.',
            sentence: 'Når jeg kommer hjem, ringer jeg til dig.',
            contextSentence: 'Jeg sender en besked og ringer til dig, når jeg kommer hjem fra skole i eftermiddag.',
            ruleHint: '🔄 INVERSION VED LEDSÆTNING I FRONT: Når sætningen starter med "Når jeg kommer hjem," fylder hele ledsætningen Plads 1 (Forfeltet) – derfor bytter Verbum og Subjekt plads efter kommaet: "... RINGER JEG til dig"!',
            translations: {
                en: { word: 'when (later today / soon)', sentence: 'When I get home, I will call you.' },
                de: { word: 'wenn (später heute / bald)', sentence: 'Wenn ich nach Hause komme, rufe ich dich an.' },
                es: { word: 'cuando (llegue a casa)', sentence: 'Cuando llegue a casa, te llamo.' },
                ar: { word: 'عِنْدَمَا (أعود إلى المنزل)', sentence: 'عندما أعود إلى المنزل، سأتصل بك.' },
                tr: { word: 'eve geldiğimde ("når")', sentence: 'Eve geldiğimde seni arayacağım.' },
                uk: { word: 'коли (прийду додому)', sentence: 'Коли я прийду додому, я зателефоную тобі.' }
            }
        }
    ];

    function getItemTrans(item) {
        const lang = getLang();
        const trans = getConjunctionWordTranslation(item.id, lang);
        if (trans) return trans;
        if (item.translations && item.translations[lang]) return item.translations[lang];
        if (item.translations && item.translations.en) return item.translations.en;
        return { word: item.meaning, sentence: '' };
    }

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .da-naar-view {
            max-width: 960px;
            margin: 0 auto;
            padding: 1rem 1rem 3.5rem;
            color: #f8fafc;
        }
        .dn-hero {
            text-align: center;
            margin-bottom: 1.8rem;
        }
        .dn-hero-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(16, 185, 129, 0.2);
            border: 1px solid #10b981;
            color: #6ee7b7;
            padding: 0.45rem 1.1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 0.8rem;
        }
        .dn-hero h1 {
            font-size: 1.85rem;
            font-weight: 900;
            margin: 0 0 0.7rem;
            background: linear-gradient(135deg, #fca5a5, #6ee7b7, #fde68a);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .dn-hero p {
            color: #cbd5e1;
            font-size: 1.1rem;
            max-width: 850px;
            margin: 0 auto;
            line-height: 1.6;
        }

        /* Visual Guide Card (da_naar_guide_future.jpg) */
        .cognitive-guide-banner {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
            border: 2px solid #10b981;
            border-radius: 22px;
            padding: 1.5rem 1.8rem;
            margin-bottom: 2rem;
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 1.8rem;
            align-items: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        @media (max-width: 820px) {
            .cognitive-guide-banner { grid-template-columns: 1fr; text-align: center; }
        }
        .guide-img-thumb {
            width: 100%;
            border-radius: 16px;
            border: 2px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
            background: white;
        }
        .guide-symbols-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.9rem;
            margin-top: 1rem;
        }
        @media (max-width: 650px) {
            .guide-symbols-grid { grid-template-columns: 1fr; }
        }
        .guide-sym-card {
            background: #0f172a;
            border-radius: 14px;
            padding: 0.9rem 1rem;
            border-top: 4px solid;
        }

        /* Tabs */
        .adv-tabs-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            justify-content: center;
            margin-bottom: 2rem;
            background: rgba(15, 23, 42, 0.6);
            padding: 0.6rem;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .adv-tab-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 0.75rem 1.2rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .adv-tab-btn:hover { color: #f1f5f9; background: rgba(255, 255, 255, 0.05); }
        .adv-tab-btn.active {
            background: #059669;
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        /* Vrimmel */
        .vrimmel-layout { max-width: 860px; margin: 0 auto; }
        .vrimmel-stage-card {
            background: #1e293b;
            border-radius: 20px;
            overflow: hidden;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .vrimmel-controls-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            background: rgba(15, 23, 42, 0.85);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-wrap: wrap;
            gap: 1rem;
        }
        .vrimmel-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .filter-btn {
            background: #334155;
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.45rem 0.9rem;
            border-radius: 10px;
            font-size: 0.86rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }
        .filter-btn.active {
            background: #059669;
            color: white;
            border-color: #10b981;
        }
        .pure-toggle-btn {
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid #10b981;
            color: #6ee7b7;
            padding: 0.45rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
        }
        .vrimmel-stage { position: relative; width: 100%; line-height: 0; overflow: hidden; background: #0f172a; }
        .vrimmel-img { width: 100%; height: auto; display: block; }
        .hotspot-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #059669;
            border: 2.5px solid #ffffff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 0.85rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
            transition: all 0.25s ease;
            z-index: 10;
        }
        .hotspot-pin.pin-da { background: #ef4444; }
        .hotspot-pin.pin-vane { background: #10b981; }
        .hotspot-pin.pin-fremtid { background: #f59e0b; }
        .hotspot-pin:hover, .hotspot-pin.active {
            transform: translate(-50%, -50%) scale(1.35);
            z-index: 30;
            box-shadow: 0 0 25px #38bdf8;
        }
        .hotspot-label {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            color: #f8fafc;
            border: 1px solid rgba(255,255,255,0.3);
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 800;
            white-space: nowrap;
            margin-top: 4px;
            pointer-events: none;
        }

        /* Inspector */
        .vrimmel-inspector {
            background: #1e293b;
            border: 2px solid #10b981;
            border-radius: 20px;
            margin-top: 1.5rem;
            padding: 1.8rem;
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 2rem;
            align-items: start;
        }
        @media (max-width: 850px) { .vrimmel-inspector { grid-template-columns: 1fr; } }
        .inspector-left, .inspector-right { display: flex; flex-direction: column; gap: 1rem; }
        .inspector-badge {
            background: rgba(16, 185, 129, 0.2);
            border: 1px solid #10b981;
            color: #6ee7b7;
            padding: 0.25rem 0.75rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 800;
        }
        .inspector-word-title { font-size: 2rem; font-weight: 900; color: white; margin: 0; }
        .inspector-trans-box {
            background: #0f172a;
            border-radius: 12px;
            padding: 1rem 1.2rem;
            border-left: 4px solid #10b981;
        }
        .inspector-scene-box {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 12px;
            padding: 1rem 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .inspector-sentence-card {
            background: #0f172a;
            border-radius: 14px;
            padding: 1.2rem;
            border: 1.5px solid rgba(16, 185, 129, 0.35);
        }
        .inspector-speak-btn {
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid #10b981;
            color: #6ee7b7;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .inspector-btn-action {
            flex: 1;
            background: #334155;
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
        }

        /* Cards & Quiz */
        .vaerksted-card, .detektiv-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 960px;
            margin: 0 auto 2rem;
        }
        .detektiv-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.8rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 1.2rem;
        }
        .detektiv-opt-btn {
            background: #1e293b;
            color: #f8fafc;
            border: 2px solid rgba(255, 255, 255, 0.15);
            padding: 1rem 1.4rem;
            border-radius: 14px;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
        }
        .detektiv-opt-btn:hover { border-color: #10b981; background: #334155; }
        .detektiv-opt-btn.correct { background: rgba(34, 197, 94, 0.25) !important; border-color: #22c55e !important; color: #4ade80 !important; }
        .detektiv-opt-btn.wrong { background: rgba(239, 68, 68, 0.25) !important; border-color: #ef4444 !important; color: #fca5a5 !important; }
        .action-btn-primary {
            background: #059669;
            color: white;
            border: none;
            padding: 0.9rem 1.8rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'dn-hero';
    hero.innerHTML = `
        <h1>${getTranslation('danaar_hero_title')}</h1>
        <p>${getTranslation('danaar_hero_desc')}</p>
    `;
    viewContainer.appendChild(hero);

    // Cognitive Guide Banner with da_naar_guide_future.jpg
    const guideBanner = document.createElement('div');
    guideBanner.className = 'cognitive-guide-banner';
    guideBanner.innerHTML = `
        <div>
            <img src="${baseUrl}da_naar_guide_future.jpg" alt="Da vs. Når kognitiv guide" class="guide-img-thumb" />
        </div>
        <div>
            <h3 style="margin:0 0 0.4rem; color:#6ee7b7; font-size:1.35rem;">${getTranslation('danaar_guide_title')}</h3>
            <p style="margin:0; color:#cbd5e1; line-height:1.55;">
                ${getTranslation('danaar_guide_desc')}
            </p>
            <div class="guide-symbols-grid">
                <div class="guide-sym-card" style="border-color:#ef4444;">
                    <div style="font-weight:900; color:#fca5a5; font-size:1.05rem;">${getTranslation('danaar_sym1_title')}</div>
                    <div style="font-size:0.84rem; color:#cbd5e1; margin-top:0.25rem;">
                        ${getTranslation('danaar_sym1_desc')}
                    </div>
                </div>
                <div class="guide-sym-card" style="border-color:#10b981;">
                    <div style="font-weight:900; color:#6ee7b7; font-size:1.05rem;">${getTranslation('danaar_sym2_title')}</div>
                    <div style="font-size:0.84rem; color:#cbd5e1; margin-top:0.25rem;">
                        ${getTranslation('danaar_sym2_desc')}
                    </div>
                </div>
                <div class="guide-sym-card" style="border-color:#f59e0b;">
                    <div style="font-weight:900; color:#fde68a; font-size:1.05rem;">${getTranslation('danaar_sym3_title')}</div>
                    <div style="font-size:0.84rem; color:#cbd5e1; margin-top:0.25rem;">
                        ${getTranslation('danaar_sym3_desc')}
                    </div>
                </div>
            </div>
        </div>
    `;
    viewContainer.appendChild(guideBanner);

    // Tabs Navigation
    const nav = document.createElement('div');
    nav.className = 'adv-tabs-nav';

    const tabs = [
        { id: 'vrimmel', label: getTranslation('danaar_tab_vrimmel'), icon: '🖼️' },
        { id: 'kognitiv', label: getTranslation('danaar_tab_kognitiv'), icon: '🔬' },
        { id: 'traening2', label: getTranslation('danaar_tab_traening'), icon: '📅' },
        { id: 'detektiv', label: getTranslation('danaar_tab_detektiv'), icon: '🔍' },
        { id: 'fortidsduel', label: getTranslation('danaar_tab_duel'), icon: '⚔️' },
        { id: 'builder', label: getTranslation('danaar_tab_builder'), icon: '🧩' }
    ];

    let currentTab = (extraData && (extraData.subPath || extraData.tab)) ? (extraData.subPath || extraData.tab) : 'vrimmel';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `adv-tab-btn ${currentTab === t.id ? 'active' : ''}`;
        btn.id = `dn-tab-${t.id}`;
        btn.innerHTML = `<span>${t.icon}</span> ${t.label}`;
        btn.onclick = () => switchTab(t.id);
        nav.appendChild(btn);
    });
    viewContainer.appendChild(nav);

    const tabContent = document.createElement('div');
    viewContainer.appendChild(tabContent);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/konjunktioner_da_naar/' + tabId);
        nav.querySelectorAll('.adv-tab-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = nav.querySelector(`#dn-tab-${tabId}`);
        if (activeBtn) activeBtn.classList.add('active');

        tabContent.innerHTML = '';
        if (tabId === 'vrimmel') renderTabVrimmel(tabContent);
        else if (tabId === 'kognitiv') renderTabKognitiv(tabContent);
        else if (tabId === 'traening2') renderTabTraening2(tabContent);
        else if (tabId === 'detektiv') renderTabDetektiv(tabContent);
        else if (tabId === 'fortidsduel') renderTabFortidsDuel(tabContent);
        else if (tabId === 'builder') renderTabBuilder(tabContent);
    }

    // ==========================================
    // TAB 1: VRIMLEBILLEDET
    // ==========================================
    let activeFilter = 'alle';
    let isPureMode = false;
    let selectedWord = DA_NAAR_DATA[0];

    function renderTabVrimmel(parent) {
        parent.innerHTML = '';
        const layout = document.createElement('div');
        layout.className = 'vrimmel-layout';

        const stageCard = document.createElement('div');
        stageCard.className = 'vrimmel-stage-card';

        const controls = document.createElement('div');
        controls.className = 'vrimmel-controls-bar';

        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'vrimmel-filters';
        [
            { id: 'alle', label: 'Alle scener (12)' },
            { id: 'da_fortid', label: '📌 Da: fortid 1 gang (5)' },
            { id: 'naar_vane', label: '🔁 Når: gentagen vane (4)' },
            { id: 'naar_fremtid', label: '🏹 Når: fremtid (3)' }
        ].forEach(f => {
            const b = document.createElement('button');
            b.className = `filter-btn ${activeFilter === f.id ? 'active' : ''}`;
            b.textContent = f.label;
            b.onclick = () => {
                activeFilter = f.id;
                const vis = DA_NAAR_DATA.filter(x => activeFilter === 'alle' || x.category === activeFilter);
                selectedWord = vis[0];
                renderTabVrimmel(parent);
            };
            filtersDiv.appendChild(b);
        });

        const pureBtn = document.createElement('button');
        pureBtn.className = 'pure-toggle-btn';
        pureBtn.innerHTML = `${isPureMode ? '👁️ Skjul mærker' : '🏷️ Vis mærker'}`;
        pureBtn.onclick = () => {
            isPureMode = !isPureMode;
            renderTabVrimmel(parent);
        };

        controls.appendChild(filtersDiv);
        controls.appendChild(pureBtn);
        stageCard.appendChild(controls);

        const stage = document.createElement('div');
        stage.className = 'vrimmel-stage';
        stage.innerHTML = `<img src="${baseUrl}assets/da_naar_vrimmel.jpg" alt="Da og Når Vrimlebillede" class="vrimmel-img" />`;

        const visibleWords = DA_NAAR_DATA.filter(item => activeFilter === 'alle' || item.category === activeFilter);

        visibleWords.forEach((item, idx) => {
            const pin = document.createElement('div');
            const pinColorClass = item.category === 'da_fortid' ? 'pin-da' : (item.category === 'naar_vane' ? 'pin-vane' : 'pin-fremtid');
            pin.className = `hotspot-pin ${pinColorClass} ${selectedWord && selectedWord.id === item.id ? 'active' : ''}`;
            pin.style.left = `${item.x}%`;
            pin.style.top = `${item.y}%`;
            pin.dataset.id = item.id;
            pin.innerHTML = `
                <span>${idx + 1}</span>
                ${!isPureMode ? `<span class="hotspot-label">${item.shortLabel}</span>` : ''}
            `;
            pin.onclick = () => {
                updateInspector(item, true);
            };
            stage.appendChild(pin);
        });

        stageCard.appendChild(stage);
        layout.appendChild(stageCard);

        const inspector = document.createElement('div');
        inspector.className = 'vrimmel-inspector';
        layout.appendChild(inspector);
        parent.appendChild(layout);

        function updateInspector(item, scroll = false) {
            selectedWord = item;
            stage.querySelectorAll('.hotspot-pin').forEach(p => p.classList.toggle('active', p.dataset.id === item.id));
            const trans = getItemTrans(item);
            const currentLang = getLang().toUpperCase();

            inspector.innerHTML = `
                <div class="inspector-left">
                    <div>
                        <span class="inspector-badge">${item.cognitiveIcon}</span>
                    </div>
                    <h2 class="inspector-word-title">${item.word}</h2>
                    <div class="inspector-trans-box">
                        <div style="font-size:0.75rem; font-weight:800; color:#6ee7b7; text-transform:uppercase;">🌍 ${getTranslation('konj_inspector_target_word').replace('{lang}', currentLang)}</div>
                        <div style="font-size:1.3rem; font-weight:800; color:white; margin-top:0.2rem;">${trans.word}</div>
                        <div style="color:#94a3b8; font-size:0.9rem; margin-top:0.2rem;">${item.meaning}</div>
                    </div>
                    <div class="inspector-scene-box">
                        <div style="font-size:0.8rem; font-weight:800; color:#94a3b8; text-transform:uppercase;">${getTranslation('konj_inspector_in_scene')}</div>
                        <p style="color:#cbd5e1; margin:0.3rem 0 0;">${item.sceneDesc}</p>
                    </div>
                </div>
                <div class="inspector-right">
                    <div class="inspector-sentence-card">
                        <div style="font-size:0.75rem; font-weight:800; color:#6ee7b7; margin-bottom:0.3rem;">${getTranslation('konj_inspector_example_bridge')}</div>
                        <div style="font-size:1.25rem; font-weight:800; color:white; margin-bottom:0.4rem;">"${item.sentence}"</div>
                        ${trans.sentence ? `<div style="color:#fde68a; font-size:0.92rem; margin-bottom:0.7rem;">🌍 "${trans.sentence}"</div>` : ''}
                    </div>
                    <div class="inspector-scene-box" style="border-left:3px solid #f59e0b;">
                        <div style="font-size:0.8rem; font-weight:800; color:#fde68a;">🧭 Kognitiv & Grammatisk Regel</div>
                        <p style="color:#cbd5e1; margin:0.3rem 0 0;">${item.ruleHint}</p>
                    </div>
                    <div style="display:flex; gap:0.8rem;">
                        <button class="inspector-btn-action" id="dn-prev">${getTranslation('konj_btn_prev_word')}</button>
                        <button class="inspector-btn-action" id="dn-next" style="background:#059669;">${getTranslation('konj_btn_next_word')}</button>
                    </div>
                </div>
            `;

            inspector.querySelector('#dn-prev').onclick = () => {
                const i = visibleWords.findIndex(w => w.id === item.id);
                const prev = visibleWords[(i - 1 + visibleWords.length) % visibleWords.length];
                updateInspector(prev, false);
            };
            inspector.querySelector('#dn-next').onclick = () => {
                const i = visibleWords.findIndex(w => w.id === item.id);
                const next = visibleWords[(i + 1) % visibleWords.length];
                updateInspector(next, false);
            };
            if (scroll) inspector.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        updateInspector(selectedWord, false);
    }

    // ==========================================
    // TAB 2: KOGNITIVT VÆRKSTED & ORDSTILLING
    // ==========================================
    function renderTabKognitiv(parent) {
        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#6ee7b7; margin-top:0;">${getTranslation('danaar_kognitiv_title')}</h2>
            <div style="text-align:center; margin:1.2rem 0;">
                <img src="${baseUrl}da_naar_guide_future.jpg" alt="Da vs Når illustration" style="max-width:560px; width:100%; border-radius:18px; border:2px solid #10b981; background:white;" />
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.2rem; margin:1.8rem 0;">
                <div style="background:#0f172a; padding:1.4rem; border-radius:16px; border:2px solid #ef4444;">
                    <h4 style="color:#fca5a5; margin-top:0;">${getTranslation('danaar_kognitiv_when_da_title')}</h4>
                    <ul style="color:#cbd5e1; line-height:1.6; padding-left:1.2rem;">
                        <li>${getTranslation('danaar_kognitiv_when_da_p1')}</li>
                        <li>${getTranslation('danaar_kognitiv_when_da_p2')}</li>
                        <li>${getTranslation('danaar_kognitiv_when_da_p3')}</li>
                    </ul>
                    <div style="background:#1e293b; padding:0.8rem; border-radius:10px; color:white; font-weight:700;">
                        "<strong>Da</strong> jeg kom hjem i går, lavede jeg mad."
                    </div>
                </div>

                <div style="background:#0f172a; padding:1.4rem; border-radius:16px; border:2px solid #10b981;">
                    <h4 style="color:#6ee7b7; margin-top:0;">${getTranslation('danaar_kognitiv_when_naar_title')}</h4>
                    <ul style="color:#cbd5e1; line-height:1.6; padding-left:1.2rem;">
                        <li>${getTranslation('danaar_kognitiv_when_naar_p1')}</li>
                        <li>${getTranslation('danaar_kognitiv_when_naar_p2')}</li>
                    </ul>
                    <div style="background:#1e293b; padding:0.8rem; border-radius:10px; color:white; font-weight:700;">
                        "<strong>Når</strong> det regner, tager jeg altid bussen."
                    </div>
                </div>
            </div>

            <div style="background:#0f172a; padding:1.6rem; border-radius:16px; border-left:5px solid #06b6d4;">
                <h3 style="color:#67e8f9; margin-top:0;">${getTranslation('danaar_rules_title')}</h3>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
                    <div style="background:#1e293b; padding:1.1rem; border-radius:12px;">
                        <div style="color:#fde68a; font-weight:800; margin-bottom:0.4rem;">${getTranslation('danaar_rule1_title')}</div>
                        <div style="color:white; font-size:1.1rem; font-weight:800;">"... <strong>da / når</strong> han <span style="color:#22d3ee;">ikke</span> <span style="color:#fca5a5;">kommer</span>"</div>
                        <div style="color:#94a3b8; font-size:0.86rem; margin-top:0.3rem;">${getTranslation('danaar_rule1_desc')}</div>
                    </div>
                    <div style="background:#1e293b; padding:1.1rem; border-radius:12px;">
                        <div style="color:#fde68a; font-weight:800; margin-bottom:0.4rem;">${getTranslation('danaar_rule2_title')}</div>
                        <div style="color:white; font-size:1.1rem; font-weight:800;">"[<strong>Når</strong> jeg kommer hjem], <span style="color:#fca5a5;">ringer</span> <span style="color:#86efac;">jeg</span>."</div>
                        <div style="color:#94a3b8; font-size:0.86rem; margin-top:0.3rem;">${getTranslation('danaar_rule2_desc')}</div>
                    </div>
                </div>
            </div>
        `;
        parent.appendChild(card);
    }

    // ==========================================
    // TAB 3: KLASSISK TRÆNING 2 (MED ILLUSTRATION)
    // ==========================================
    const T2_QUESTIONS = [
        {
            quote: '"Jeg var i Italien, ______ jeg var barn."',
            options: ['da', 'når'],
            correct: 'da',
            explanation: '📌 Korrekt! Vi sætter tegnestiften "da" i en specifik, afsluttet periode i fortiden ("da jeg var barn").'
        },
        {
            quote: '"______ jeg kommer hjem, ringer jeg til dig."',
            options: ['Når', 'Da'],
            correct: 'Når',
            explanation: '🏹 Korrekt! "Når" bruges, fordi vi kigger fremad i tiden (den lysende fremtidspil).'
        },
        {
            quote: '"Jeg blev meget glad, ______ jeg så min karakter."',
            options: ['da', 'når'],
            correct: 'da',
            explanation: '📌 Korrekt! At se sin karakter skete på ét bestemt tidspunkt i fortiden – det kræver tegnestiften "da".'
        },
        {
            quote: '"______ det regner, tager jeg altid paraply med."',
            options: ['Når', 'Da'],
            correct: 'Når',
            explanation: '🔁 Korrekt! Ordet "altid" viser, at det er en vane, der gentager sig igen og igen (den grønne cirkel).'
        },
        {
            quote: '"Vi spiste is, ______ vi var på stranden i går."',
            options: ['da', 'når'],
            correct: 'da',
            explanation: '📌 Korrekt! Strandturen skete "i går", som er en enkeltstående, afsluttet begivenhed i fortiden (tegnestiften).'
        },
        {
            quote: '"Peter bringer mad ud på cykel. ______ det sner, er det svært at cykle."',
            options: ['Når', 'Da'],
            correct: 'Når',
            explanation: '🔁 Korrekt! Det sner flere gange om vinteren – en tilbagevendende situation kræver cirklen "Når".'
        },
        {
            quote: '"______ Peter kørte hjemmefra klokken 16 i går, var det stadig lyst."',
            options: ['Da', 'Når'],
            correct: 'Da',
            explanation: '📌 Korrekt! Klokken 16 i går er ét præcist punktnedslag i fortiden (tegnestiften).'
        },
        {
            quote: '"Anna er gartner i parken. Hun klipper kun græsset, ______ det er tørvejr."',
            options: ['når', 'da'],
            correct: 'når',
            explanation: '🔁 Korrekt! En fast arbejdsrutine (hver gang det er tørvejr) kræver "når".'
        }
    ];

    function renderTabTraening2(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `
            <div style="text-align:center; margin-bottom:1.5rem;">
                <h2 style="color:#6ee7b7; margin:0 0 0.5rem;">📅 Træning 2: Da eller Når? (Med Kognitiv Illustration)</h2>
                <img src="${baseUrl}da_naar_guide_future.jpg" alt="Da eller Når guide" style="max-width:460px; width:100%; border-radius:16px; border:2px solid #10b981; margin:0.6rem auto; display:block; background:white;" />
                <p style="color:#cbd5e1; max-width:700px; margin:0.5rem auto 0;">
                    <em>📌 <strong>'Da'</strong> peger på et enkeltstående punkt i fortiden (tegnestiften). 🔁 <strong>'Når'</strong> bruges om gentagne vaner (cirklen) eller 🏹 begivenheder i fremtiden (pilen).</em>
                </p>
            </div>
            <div id="t2-list"></div>
        `;
        parent.appendChild(box);

        const list = box.querySelector('#t2-list');
        T2_QUESTIONS.forEach((q, idx) => {
            const item = document.createElement('div');
            item.className = 'detektiv-card';
            item.innerHTML = `
                <div style="font-size:0.82rem; font-weight:800; color:#6ee7b7; margin-bottom:0.4rem;">OPGAVE ${idx + 1} AF ${T2_QUESTIONS.length}</div>
                <div style="font-size:1.3rem; font-weight:800; color:white; margin-bottom:1rem;">${q.quote}</div>
                <div style="display:flex; gap:0.8rem; flex-wrap:wrap;">
                    ${q.options.map(opt => `<button class="detektiv-opt-btn" data-opt="${opt}">${opt}</button>`).join('')}
                </div>
                <div class="feedback-msg" style="display:none; margin-top:1rem; padding:0.9rem 1.2rem; border-radius:12px; font-weight:700;"></div>
            `;
            const fb = item.querySelector('.feedback-msg');
            item.querySelectorAll('.detektiv-opt-btn').forEach(btn => {
                btn.onclick = () => {
                    const chosen = btn.dataset.opt;
                    const isRight = chosen === q.correct;
                    item.querySelectorAll('.detektiv-opt-btn').forEach(b => b.classList.remove('correct', 'wrong'));
                    btn.classList.add(isRight ? 'correct' : 'wrong');
                    fb.style.display = 'block';
                    fb.style.background = isRight ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)';
                    fb.style.border = `1px solid ${isRight ? '#22c55e' : '#ef4444'}`;
                    fb.style.color = isRight ? '#86efac' : '#fca5a5';
                    fb.innerHTML = isRight
                        ? `${q.explanation}`
                        : `⚠️ Ikke helt – tænk på om det er 📌 Tegnestiften (1 gang i fortiden = da), 🔁 Cirklen (vane = når) eller 🏹 Pilen (fremtid = når).`;
                };
            });
            list.appendChild(item);
        });
    }

    // ==========================================
    // TAB 4: DA/NÅR-DETEKTIVEN (10 GÅDER)
    // ==========================================
    const DETEKTIV_QUESTIONS = [
        {
            tag: 'Gåde 1 • 📌 Tegnestift, 🔁 Cirkel eller 🏹 Pil?',
            quote: '"______ jeg fyldte 25 år i 2022, holdt vi en stor fest i haven."',
            options: ['Da (📌 Tegnestift i fortid)', 'Når (🔁 Cirkel / Vane)', 'Når (🏹 Fremtidspil)'],
            correct: 'Da (📌 Tegnestift i fortid)',
            explanation: '🌟 Lige i øjet! Man fylder kun 25 år én gang, og 2022 er i fortiden ➔ 📌 Tegnestiften "Da"!'
        },
        {
            tag: 'Gåde 2 • 📌 Tegnestift, 🔁 Cirkel eller 🏹 Pil?',
            quote: '"______ jeg fylder 30 år til næste år, vil jeg invitere alle mine venner."',
            options: ['Når (🏹 Fremtidspil)', 'Da (📌 Tegnestift i fortid)', 'Når (🔁 Cirkel / Vane)'],
            correct: 'Når (🏹 Fremtidspil)',
            explanation: '🌟 Præcis! Selvom man kun fylder 30 år én gang, ligger det i FREMTIDEN ("til næste år") – og i fremtiden bruger man ALTID "Når"!'
        },
        {
            tag: 'Gåde 3 • Hverdags-rutine',
            quote: '"Jeg hører altid dansk podcast i toget, ______ jeg kører på arbejde om morgenen."',
            options: ['når (🔁 Cirkel / Vane)', 'da (📌 Tegnestift i fortid)'],
            correct: 'når (🔁 Cirkel / Vane)',
            explanation: '🌟 Rigtigt! "Altid" og "om morgenen" viser en fast gentagen rutine ➔ 🔁 Cirklen "når".'
        },
        {
            tag: 'Gåde 4 • Pludselig hændelse i morges',
            quote: '"Jeg tabte desværre min kaffekop på gulvet, ______ telefonen pludselig ringede i morges."',
            options: ['da (📌 Tegnestift i fortid)', 'når (🔁 Cirkel / Vane)'],
            correct: 'da (📌 Tegnestift i fortid)',
            explanation: '🌟 Korrekt! "Pludselig" og "i morges" udpeger én konkret episode i fortiden ➔ 📌 "da".'
        },
        {
            tag: 'Gåde 5 • Ordstilling efter "da"',
            quote: '"Vi gik ind på en hyggelig café, da det ______ at regne mere."',
            options: ['ikke så ud til', 'så ikke ud til'],
            correct: 'ikke så ud til',
            explanation: '🌟 Skarpt! Efter ledsætningskonjunktionen "da" står "ikke" FØR verbet ("da det ikke så...").'
        },
        {
            tag: 'Gåde 6 • Ordstilling efter "Når"-ledsætning i front',
            quote: '"Når undervisningen slutter klokken 12, ______ sammen i kantinen."',
            options: ['spiser vi frokost', 'vi spiser frokost'],
            correct: 'spiser vi frokost',
            explanation: '🌟 Perfekt! Når ledsætningen ("Når undervisningen slutter kl. 12,") står forrest, kommer der INVERSION i hovedsætningen: "spiser vi"!'
        }
    ];

    function renderTabDetektiv(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `<h2 style="text-align:center; color:#6ee7b7; margin-top:0;">🔍 Da/Når-Detektiven: Symboler & Ordstilling</h2><div id="det-list"></div>`;
        parent.appendChild(box);
        const list = box.querySelector('#det-list');

        DETEKTIV_QUESTIONS.forEach(q => {
            const card = document.createElement('div');
            card.className = 'detektiv-card';
            card.innerHTML = `
                <div style="font-size:0.8rem; font-weight:800; color:#fde68a; margin-bottom:0.4rem;">${q.tag}</div>
                <div style="font-size:1.25rem; font-weight:800; color:white; margin-bottom:1rem;">${q.quote}</div>
                <div style="display:flex; gap:0.8rem; flex-wrap:wrap;">
                    ${q.options.map(o => `<button class="detektiv-opt-btn" data-o="${o}">${o}</button>`).join('')}
                </div>
                <div class="fb" style="display:none; margin-top:1rem; padding:0.9rem; border-radius:12px; font-weight:700;"></div>
            `;
            const fb = card.querySelector('.fb');
            card.querySelectorAll('.detektiv-opt-btn').forEach(btn => {
                btn.onclick = () => {
                    const ok = btn.dataset.o === q.correct;
                    card.querySelectorAll('.detektiv-opt-btn').forEach(b => b.classList.remove('correct', 'wrong'));
                    btn.classList.add(ok ? 'correct' : 'wrong');
                    fb.style.display = 'block';
                    fb.style.background = ok ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)';
                    fb.style.color = ok ? '#86efac' : '#fca5a5';
                    fb.textContent = ok ? q.explanation : '⚠️ Prøv igen!';
                };
            });
            list.appendChild(card);
        });
    }

    // ==========================================
    // TAB 5: FORTIDS-DUELLEN (DA vs. NÅR I DATID!)
    // ==========================================
    const DUEL_QUESTIONS = [
        {
            context: '1/6 • Barndommens sommerhus (Mange gange i fortiden!)',
            quote: '"Da jeg var barn, badede vi altid ved stranden, ______ solen skinnede."',
            options: ['når', 'da'],
            correct: 'når',
            explanation: '🔁 MESTER-DETALJEN: Selvom verbet er i datid ("skinnede"), skete det HVER GANG solen skinnede ("altid")! Gentagne vaner i fortiden bruger cirklen "når"!'
        },
        {
            context: '2/6 • En konkret dag sidste sommer (1 gang i fortiden)',
            quote: '"Vi badede ved stranden i går, ______ solen endelig kom frem kl. 14."',
            options: ['da', 'når'],
            correct: 'da',
            explanation: '📌 Her handler det om én bestemt gang i går kl. 14 ➔ tegnestiften "da"!'
        },
        {
            context: '3/6 • Bedstefars besøg (Hver søndag i gamle dage)',
            quote: '"I gamle dage fik vi altid varm kakao, ______ vi besøgte vores bedsteforældre om søndagen."',
            options: ['når', 'da'],
            correct: 'når',
            explanation: '🔁 "Altid" og "om søndagen" = en gentagen vane i fortiden ("hver gang vi besøgte dem") ➔ "når"!'
        },
        {
            context: '4/6 • Første møde (Kun én gang!)',
            quote: '"Jeg boede i Aarhus, ______ jeg mødte min mand for første gang."',
            options: ['da', 'når'],
            correct: 'da',
            explanation: '📌 Man møder kun nogen "for første gang" én gang i fortiden ➔ "da"!'
        },
        {
            context: '5/6 • Vane på det gamle arbejde',
            quote: '"På mit gamle arbejde holdt vi altid en kort kaffepause, ______ klokken blev ti."',
            options: ['når', 'da'],
            correct: 'når',
            explanation: '🔁 "Altid" viser, at kaffepausen gentog sig hver eneste dag kl. 10 ➔ "når"!'
        },
        {
            context: '6/6 • Strømafbrydelsen i fredags',
            quote: '"Vi sad midt i aftensmaden i fredags, ______ lyset pludselig gik ud."',
            options: ['da', 'når'],
            correct: 'da',
            explanation: '📌 "I fredags" og "pludselig" = én enkeltstående hændelse i fortiden ➔ "da"!'
        }
    ];

    function renderTabFortidsDuel(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `
            <h2 style="text-align:center; color:#fde68a; margin-top:0;">⚔️ Fortids-Duellen: Én gang i fortiden (da) vs. Vane i fortiden (når)</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:760px; margin:0 auto 1.5rem;">
                Mange tror, at al datid hedder <em>da</em>. Men husk <strong>Cirklen 🔁</strong>: Hvis noget skete <strong>mange gange som en vane i fortiden</strong> (<em>"Hver gang det regnede..."</em>), skal du stadig bruge <strong><em>når</em></strong>!
            </p>
            <div id="duel-list"></div>
        `;
        parent.appendChild(box);
        const list = box.querySelector('#duel-list');

        DUEL_QUESTIONS.forEach(q => {
            const card = document.createElement('div');
            card.className = 'detektiv-card';
            card.innerHTML = `
                <div style="font-size:0.8rem; font-weight:800; color:#6ee7b7; margin-bottom:0.4rem;">${q.context}</div>
                <div style="font-size:1.25rem; font-weight:800; color:white; margin-bottom:1rem;">${q.quote}</div>
                <div style="display:flex; gap:0.8rem;">
                    ${q.options.map(o => `<button class="detektiv-opt-btn" data-o="${o}">${o}</button>`).join('')}
                </div>
                <div class="fb" style="display:none; margin-top:1rem; padding:0.9rem; border-radius:12px; font-weight:700;"></div>
            `;
            const fb = card.querySelector('.fb');
            card.querySelectorAll('.detektiv-opt-btn').forEach(btn => {
                btn.onclick = () => {
                    const ok = btn.dataset.o === q.correct;
                    card.querySelectorAll('.detektiv-opt-btn').forEach(b => b.classList.remove('correct', 'wrong'));
                    btn.classList.add(ok ? 'correct' : 'wrong');
                    fb.style.display = 'block';
                    fb.style.background = ok ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)';
                    fb.style.color = ok ? '#86efac' : '#fca5a5';
                    fb.textContent = ok ? q.explanation : '⚠️ Prøv igen: Skete det kun ÉN gang (📌 da) eller HVER gang som en vane (🔁 når)?';
                };
            });
            list.appendChild(card);
        });
    }

    // ==========================================
    // TAB 6: SÆTNINGSBYGGEREN
    // ==========================================
    const PUZZLES = [
        {
            title: 'Puslespil 1 • 📌 Da-ledsætning med "ikke" før verbet',
            hint: 'Start med hovedsætningen "Vi blev hjemme,", og sæt derefter "da"-ledsætningen sammen (Husk: Subjekt + ikke + Verbum!):',
            correct: ['Vi blev hjemme,', 'da', 'bussen', 'ikke kom.']
        },
        {
            title: 'Puslespil 2 • 🏹 Når-ledsætning i front udløser inversion!',
            hint: 'Start med ledsætningen "Når jeg kommer hjem,", og husk at bytte om på verbum og subjekt i hovedsætningen:',
            correct: ['Når jeg kommer hjem,', 'ringer', 'jeg', 'til dig.']
        },
        {
            title: 'Puslespil 3 • 🔁 Når-vane i front med inversion',
            hint: 'Start med "Når det regner,", og sæt derefter verbet FØR subjektet:',
            correct: ['Når det regner,', 'tager', 'jeg altid', 'paraply med.']
        }
    ];

    function renderTabBuilder(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `<h2 style="text-align:center; color:#6ee7b7; margin-top:0;">🧩 Sætningsbyggeren: Ordstilling med Da & Når</h2><div id="puz-list"></div>`;
        parent.appendChild(box);
        const list = box.querySelector('#puz-list');

        PUZZLES.forEach(p => {
            let placed = [];
            const pool = [...p.correct].sort(() => Math.random() - 0.5);
            const card = document.createElement('div');
            card.className = 'detektiv-card';

            function draw() {
                const isDone = placed.length === p.correct.length && placed.every((w, i) => w === p.correct[i]);
                card.innerHTML = `
                    <div style="font-weight:800; color:#fde68a; margin-bottom:0.3rem;">${p.title}</div>
                    <p style="color:#cbd5e1; font-size:0.95rem; margin:0 0 1rem;">${p.hint}</p>
                    <div style="min-height:56px; background:#1e293b; border:2px dashed #10b981; border-radius:12px; padding:0.8rem; display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center; margin-bottom:1rem;">
                        ${placed.length === 0 ? '<span style="color:#64748b;">Klik på brikkerne herunder i den rigtige rækkefølge...</span>' : placed.map((w, idx) => `<button class="detektiv-opt-btn" data-rm="${idx}" style="padding:0.5rem 0.9rem; font-size:1rem; background:#059669;">${w}</button>`).join('')}
                    </div>
                    <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
                        ${pool.map((w, idx) => {
                            const used = placed.includes(w);
                            return `<button class="detektiv-opt-btn" data-add="${idx}" ${used ? 'disabled style="opacity:0.3;"' : 'style="padding:0.55rem 1rem; font-size:1rem;"'}>${w}</button>`;
                        }).join('')}
                        <button class="detektiv-opt-btn" id="reset-puz" style="padding:0.55rem 1rem; font-size:0.9rem; background:#334155;">🔄 Nulstil</button>
                    </div>
                    ${isDone ? `<div style="margin-top:1rem; color:#4ade80; font-weight:800;">🌟 Perfekt ordstilling! "${p.correct.join(' ')}"</div>` : ''}
                `;
                card.querySelectorAll('[data-add]').forEach(b => {
                    b.onclick = () => {
                        placed.push(pool[Number(b.dataset.add)]);
                        draw();
                    };
                });
                card.querySelectorAll('[data-rm]').forEach(b => {
                    b.onclick = () => {
                        placed.splice(Number(b.dataset.rm), 1);
                        draw();
                    };
                });
                card.querySelector('#reset-puz').onclick = () => {
                    placed = [];
                    draw();
                };
            }
            draw();
            list.appendChild(card);
        });
    }

    switchTab(currentTab);
    container.appendChild(viewContainer);
}
