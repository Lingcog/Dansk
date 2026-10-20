import { getTranslation, getLang } from '../utils/i18n.js';
import { getConjunctionWordTranslation } from '../utils/top100_konjunktioner_translations.js';

/**
 * KonjunktionerAtView - Felt 4 (Særskilt Fokusfelt): Ordet "AT" i alle sætningskonstruktioner
 *
 * Hvorfor er "at" så svært på dansk? Fordi de to bogstaver "at" indgår i 5 vidt forskellige
 * grammatiske konstruktioner, som hver har deres egne regler for ordstilling:
 *
 * 1. Konjunktionen "at" (Ledsætnings-at efter udsagns-/tankeverber):
 *    - sige, at / tro, at / synes, at / vide, at + SUBJEKT + (IKKE) + VERBUM
 * 2. Infinitivmærket "at" (foran et verbum i infinitiv) vs. Modalverber UDEN "at":
 *    - elsker at svømme / husker at vande / plejer at drikke (+ INFINITIV uden subjekt)
 *    - KONTRAST: kan / skal / vil / må / bør svømme (ALDRIG "at" efter modalverber!)
 * 3. Præposition + "at" + Infinitiv (Når subjektet er det samme!):
 *    - god til at bage / glæder sig til at rejse / kom til at spilde (uheld!) / træt af at vente
 * 4. Præposition + ", at" + Ledsætning (Når der kommer et nyt subjekt!):
 *    - glad for, at du kom / sikker på, at det virker
 * 5. Sammensatte bindeord med "at" (Formål, Metode, Fravær & Konsekvens):
 *    - for at (+ infinitiv = formål)
 *    - ved at (+ infinitiv = metode/måde)
 *    - uden at (+ infinitiv = fravær)
 *    - så [adjektiv], at (+ ledsætning = konsekvens)
 */
export function renderKonjunktionerAtView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container konjunktioner-at-view';

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

    // TTS Audio Helper
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // 18 "AT"-Constructions Data
    const AT_KONSTRUKTIONER_DATA = [
        // 1. Konjunktionen "at" (Ledsætning: Subjekt + ikke + Verbum)
        {
            id: 'siger_at',
            word: 'siger, at (+ ledsætning)',
            shortLabel: 'siger, at...',
            category: 'konjunktion',
            formula: 'Verbum + , at + Subjekt + (ikke) + Finit Verbum',
            x: 9,
            y: 20,
            meaning: 'Gengiver et udsagn i en ledsætning ("says that...")',
            sceneDesc: 'Kvinden i sofaen fortæller sin veninde, at hun ikke kommer for sent i morgen.',
            sentence: 'Hun siger, at hun ikke kommer for sent.',
            contextSentence: 'Kvinden i den gule trøje siger til sin veninde, at hun ikke har glemt deres aftale.',
            ruleHint: 'Her er "at" en LEDSÆTNINGSKONJUNKTION. Efter "at" SKAL der stå et Subjekt ("hun"), og "ikke" står FØR verbet ("ikke kommer")!',
            translations: {
                en: { word: 'says that (+ clause)', sentence: 'The woman in the yellow sweater tells her friend that she has not forgotten their appointment.' },
                de: { word: 'sagt, dass (+ Nebensatz)', sentence: 'Die Frau im gelben Pullover sagt ihrer Freundin, dass sie den Termin nicht vergessen hat.' },
                es: { word: 'dice que (+ oración)', sentence: 'La mujer del suéter amarillo le dice a su amiga que no ha olvidado su cita.' },
                ar: { word: 'تقول إنَّ (+ جملة فرعية)', sentence: 'تقول المرأة ذات السترة الصفراء لصديقتها إنها لم تنسَ موعدهما.' },
                tr: { word: '...-diğini söylüyor (yan cümle)', sentence: 'Sarı kazaklı kadın arkadaşına randevularını unutmadığını söylüyor.' },
                uk: { word: 'каже, що (+ підрядне речення)', sentence: 'Жінка в жовтому светрі каже подрузі, що вона не забула про їхню зустріч.' }
            }
        },
        {
            id: 'tror_at',
            word: 'tror, at (+ ledsætning)',
            shortLabel: 'tror, at...',
            category: 'konjunktion',
            formula: 'tror/mener + , at + Subjekt + (ikke) + Verbum',
            x: 25,
            y: 18,
            meaning: 'Udtrykker en formodning eller tanke ("thinks/believes that...")',
            sceneDesc: 'Manden ved laptoppen har en idé-pære over hovedet: Han tror, at han har fundet løsningen.',
            sentence: 'Han tror, at mødet starter klokken ti.',
            contextSentence: 'Manden ved computeren tror, at han snart kan løse den svære opgave.',
            ruleHint: 'Efter tankeverber ("tro, mene, håbe, frygte") indleder "at" en ledsætning. I mundtligt dansk kan "at" ofte udelades her ("Han tror (at) mødet starter kl. 10").',
            translations: {
                en: { word: 'thinks / believes that', sentence: 'The man at the computer believes that he can soon solve the difficult task.' },
                de: { word: 'glaubt, dass', sentence: 'Der Mann am Computer glaubt, dass er die schwierige Aufgabe bald lösen kann.' },
                es: { word: 'cree que', sentence: 'El hombre en la computadora cree que pronto podrá resolver la difícil tarea.' },
                ar: { word: 'يعتقد أنَّ', sentence: 'يعتقد الرجل الجالس أمام الحاسوب أنه يستطيع حل المهمة الصعبة قريبًا.' },
                tr: { word: '...-diğini sanıyor / düşünüyor', sentence: 'Bilgisayar başındaki adam zor görevi yakında çözebileceğini düşünüyor.' },
                uk: { word: 'думає / вважає, що', sentence: 'Чоловік за комп\'ютером вважає, що скоро зможе вирішити складне завдання.' }
            }
        },
        {
            id: 'synes_at',
            word: 'synes, at (+ ledsætning)',
            shortLabel: 'synes, at...',
            category: 'konjunktion',
            formula: 'synes + , at + Subjekt + (ikke) + Verbum',
            x: 16,
            y: 21,
            meaning: 'Udtrykker personlig mening baseret på erfaring ("thinks/finds that...")',
            sceneDesc: 'Veninden i den grønne bluse nikker: "Jeg synes, at det er en rigtig god idé!"',
            sentence: 'Jeg synes, at dansk er spændende.',
            contextSentence: 'Veninden i sofaen smiler og synes, at forslaget lyder rigtig spændende.',
            ruleHint: 'Efter "Jeg synes..." følger en ledsætning med subjekt og verbum ("... at det er svært"). PAS PÅ: Man kan aldrig sige *"Jeg synes at gøre"* – der SKAL være et subjekt efter "synes, at"!',
            translations: {
                en: { word: 'thinks / feels that (personal opinion)', sentence: 'The friend on the sofa smiles and thinks that the proposal sounds really exciting.' },
                de: { word: 'findet, dass', sentence: 'Die Freundin auf dem Sofa lächelt und findet, dass der Vorschlag sehr spannend klingt.' },
                es: { word: 'opina / le parece que', sentence: 'La amiga en el sofá sonríe y le parece que la propuesta suena muy emocionante.' },
                ar: { word: 'يرى أنَّ (رأي شخصي)', sentence: 'تبتسم الصديقة على الأريكة وترى أن الاقتراح يبدو مثيرًا للاهتمام حقًا.' },
                tr: { word: 'bence / ...-diğini düşünüyor (kişisel görüş)', sentence: 'Kanepedeki arkadaş gülümsüyor ve önerinin kulağa çok heyecan verici geldiğini düşünüyor.' },
                uk: { word: 'вважає, що (особиста думка)', sentence: 'Подруга на дивані усміхається і вважає, що пропозиція звучить дуже цікаво.' }
            }
        },
        {
            id: 'ved_at_konj',
            word: 'ved, at (+ ledsætning)',
            shortLabel: 'ved, at...',
            category: 'konjunktion',
            formula: 'ved + , at + Subjekt + (ikke) + Verbum',
            x: 44,
            y: 27,
            meaning: 'Konstaterer sikker viden ("knows that...")',
            sceneDesc: 'De to studerende i gården taler sammen: De ved godt, at eksamen ligger i næste uge.',
            sentence: 'Jeg ved, at bussen kommer om fem minutter.',
            contextSentence: 'De to kursister i skolegården ved godt, at undervisningen starter lige om lidt.',
            ruleHint: 'KONTRAST TIL "OM": Når man VED noget med sikkerhed, bruger man "at" ("Jeg ved, at han kommer"). Når man IKKE ved det (tvivl), bruger man "om" ("Jeg ved ikke, om han kommer")!',
            translations: {
                en: { word: 'knows that', sentence: 'The two students in the courtyard know well that the lesson starts in a moment.' },
                de: { word: 'weiß, dass', sentence: 'Die beiden Kursteilnehmer im Hof wissen gut, dass der Unterricht gleich beginnt.' },
                es: { word: 'sabe que', sentence: 'Los dos estudiantes en el patio saben bien que la clase empieza enseguida.' },
                ar: { word: 'يعلم أنَّ', sentence: 'يعلم الطالبان في الساحة جيدًا أن الدرس سيبدأ بعد قليل.' },
                tr: { word: '...-diğini biliyor', sentence: 'Avludaki iki kursiyer dersin birazdan başlayacağını iyi biliyor.' },
                uk: { word: 'знає, що', sentence: 'Двоє студентів на подвір\'ї добре знають, що заняття почнеться за хвилину.' }
            }
        },

        // 2. Infinitivmærket "at" vs. Modalverber UDEN "at"
        {
            id: 'elsker_at',
            word: 'elsker at (+ infinitiv)',
            shortLabel: 'elsker at...',
            category: 'infinitiv',
            formula: 'Følelses-/ønskeverbum + AT + Infinitiv (uden subjekt!)',
            x: 16,
            y: 42,
            meaning: 'Infinitivmærket "at" før et handlingsverbum ("loves to...")',
            sceneDesc: 'Drengen springer med armene i vejret ned i vandet – han elsker at svømme!',
            sentence: 'Drengen elsker at svømme i bassinet.',
            contextSentence: 'Så snart solen skinner, elsker børnene at hoppe i det varme svømmebassin.',
            ruleHint: 'Her er "at" et INFINITIVMÆRKE (ligesom engelsk "to swim" / tysk "zu schwimmen"). Der er INTET subjekt efter "at" – kun verbet i infinitiv ("at svømme")!',
            translations: {
                en: { word: 'loves to (+ infinitive)', sentence: 'As soon as the sun shines, the children love to jump into the warm swimming pool.' },
                de: { word: 'liebt es zu (+ Infinitiv)', sentence: 'Sobald die Sonne scheint, lieben es die Kinder, ins warme Schwimmbecken zu springen.' },
                es: { word: 'le encanta (+ infinitivo)', sentence: 'En cuanto brilla el sol, a los niños les encanta saltar a la piscina.' },
                ar: { word: 'يحب أن (+ المصدر)', sentence: 'بمجرد أن تشرق الشمس، يحب الأطفال القفز في حوض السباحة الدافئ.' },
                tr: { word: '-meyi seviyor (mastar)', sentence: 'Güneş açar açmaz çocuklar sıcak yüzme havuzuna atlamayı çok seviyor.' },
                uk: { word: 'обожнює (+ інфінітив)', sentence: 'Щойно світить сонце, діти обожнюють стрибати в теплий басейн.' }
            }
        },
        {
            id: 'kan_uden_at',
            word: 'kan / skal / vil (UDEN at!)',
            shortLabel: 'kan svømme (UDEN at!)',
            category: 'infinitiv',
            formula: 'Modalverbum (kan/skal/vil/må/bør/tør) + REN INFINITIV (INGEN "at"!)',
            x: 7,
            y: 49,
            meaning: 'DEN KLASSISKE FÆLDE: Efter modalverber er "at" 100% forbudt!',
            sceneDesc: 'Børnene i vandet kan svømme helt uden hjælp (Bemærk: "kan svømme" – aldrig *"kan at svømme"!).',
            sentence: 'Han kan svømme hurtigt. (ALDRIG "kan at"!)',
            contextSentence: 'Alle børnene i bassinet kan svømme, og bagefter vil de spise is sammen.',
            ruleHint: '🔥 VIGTIGSTE REGEL: Efter de 6 modalverber (KAN, SKAL, VIL, MÅ, BØR, TØR) må man ALDRIG bruge "at"! Det hedder: "Jeg kan svømme", "Jeg vil lære dansk", "Jeg skal gå nu".',
            translations: {
                en: { word: 'can / must / will (NO "at"!)', sentence: 'All the children in the pool can swim, and afterwards they will eat ice cream.' },
                de: { word: 'kann / muss / will (OHNE "at"!)', sentence: 'Alle Kinder im Becken können schwimmen, und danach wollen sie Eis essen.' },
                es: { word: 'puede / debe / quiere (¡SIN "at"!)', sentence: 'Todos los niños de la piscina saben nadar y después quieren comer helado.' },
                ar: { word: 'يستطيع / يجب / يريد (بدون "at" دائمًا!)', sentence: 'جميع الأطفال في المسبح يستطيعون السباحة، وبعد ذلك يريدون تناول المثلجات.' },
                tr: { word: '-ebilir / -meli / -ecek ("at" KULLANILMAZ!)', sentence: 'Havuzdaki tüm çocuklar yüzebiliyor ve sonrasında birlikte dondurma yemek istiyorlar.' },
                uk: { word: 'може / мусить / хоче (БЕЗ "at"!)', sentence: 'Усі діти в басейні вміють плавати, а потім вони хочуть поїсти морозива.' }
            }
        },
        {
            id: 'husker_at',
            word: 'husker at / glemmer at (+ infinitiv)',
            shortLabel: 'husker at...',
            category: 'infinitiv',
            formula: 'husker / glemmer / prøver / begynder + AT + Infinitiv',
            x: 76,
            y: 80,
            meaning: 'Almindelige verber kræver infinitivmærket "at" før næste verbum',
            sceneDesc: 'Kvinden med tjeklisten krydser af: Hun husker at vande alle de grønne planter.',
            sentence: 'Hun husker altid at vande planterne.',
            contextSentence: 'Inden hun går på weekend, husker hun altid at vande alle blomsterne i vindueskarmen.',
            ruleHint: 'Modsat modalverberne er "huske, glemme, prøve, forsøge, begynde, fortsætte" almindelige verber – derfor SKAL der stå "at" foran næste verbum!',
            translations: {
                en: { word: 'remembers to / forgets to (+ infinitive)', sentence: 'Before going for the weekend, she always remembers to water all the plants.' },
                de: { word: 'denkt daran zu / vergisst zu (+ Infinitiv)', sentence: 'Vor dem Wochenende denkt sie immer daran, alle Pflanzen zu gießen.' },
                es: { word: 'recuerda / olvida (+ infinitivo)', sentence: 'Antes del fin de semana, siempre recuerda regar todas las plantas.' },
                ar: { word: 'يتذكر أن / ينسى أن (+ المصدر)', sentence: 'قبل الذهاب في عطلة نهاية الأسبوع، تتذكر دائمًا أن تسقي جميع النباتات.' },
                tr: { word: '-meyi hatırlıyor / unutuyor', sentence: 'Hafta sonu tatiline çıkmadan önce tüm çiçekleri sulamayı her zaman hatırlıyor.' },
                uk: { word: 'пам\'ятає / забуває (+ інфінітив)', sentence: 'Перед вихідними вона завжди пам\'ятає полити всі вазони.' }
            }
        },
        {
            id: 'plejer_at',
            word: 'plejer at (+ infinitiv)',
            shortLabel: 'plejer at...',
            category: 'infinitiv',
            formula: 'plejer + AT + Infinitiv (Vane)',
            x: 88,
            y: 54,
            meaning: 'Udtrykker en fast vane ("usually does...") – kræver altid "at"!',
            sceneDesc: 'Vennerne ved cafébordet i gårdhaven plejer at mødes til en kop kaffe hver fredag.',
            sentence: 'Vi plejer at drikke kaffe her om fredagen.',
            contextSentence: 'Når vejret er godt, plejer vennerne at sidde ved de runde borde ude i gårdhaven.',
            ruleHint: 'Mange kursister glemmer "at" efter "plejer", fordi det føles som et modalverbum – men "plejer" SKAL altid have "at": "Jeg plejer AT stå op kl. 7"!',
            translations: {
                en: { word: 'usually (+ verb) / tends to', sentence: 'When the weather is nice, the friends usually sit at the round tables in the courtyard.' },
                de: { word: 'pflegt zu / macht gewöhnlich', sentence: 'Wenn das Wetter gut ist, sitzen die Freunde gewöhnlich draußen im Innenhof.' },
                es: { word: 'suele (+ infinitivo)', sentence: 'Cuando hace buen tiempo, los amigos suelen sentarse en las mesas del patio.' },
                ar: { word: 'يعتاد أن (+ المصدر)', sentence: 'عندما يكون الطقس جيدًا، يعتاد الأصدقاء الجلوس حول الطاولات في الفناء.' },
                tr: { word: 'genellikle ... yapar ("plejer at")', sentence: 'Hava güzel olduğunda arkadaşlar genellikle avludaki yuvarlak masalarda otururlar.' },
                uk: { word: 'має звичку / зазвичай робить ("plejer at")', sentence: 'Коли погода гарна, друзі зазвичай сидять за круглими столиками у дворику.' }
            }
        },

        // 3. Præposition + "at" + Infinitiv (Samme subjekt!)
        {
            id: 'god_til_at',
            word: 'god til at (+ infinitiv)',
            shortLabel: 'god til at...',
            category: 'praep_inf',
            formula: 'Adjektiv + Præposition (til/for/af/om) + AT + Infinitiv',
            x: 58,
            y: 53,
            meaning: 'Dygtig til en færdighed ("good at doing...")',
            sceneDesc: 'Kokken med den høje hvide hat ælter dejen – han er rigtig god til at bage brød!',
            sentence: 'Kokken er god til at bage brød.',
            contextSentence: 'Vores lærer i køkkenværkstedet er utrolig god til at bage sprødt surdejsbrød.',
            ruleHint: 'På dansk kan en præposition ("til, for, af, om, på") følges direkte af "at + infinitiv"! Sammenlign engelsk "good at baking" ➔ dansk "god TIL AT bage".',
            translations: {
                en: { word: 'good at (+ -ing)', sentence: 'Our teacher in the kitchen workshop is incredibly good at baking crispy sourdough bread.' },
                de: { word: 'gut darin zu (+ Infinitiv)', sentence: 'Unser Lehrer in der Küchenwerkstatt ist unglaublich gut darin, Brot zu backen.' },
                es: { word: 'bueno para (+ infinitivo)', sentence: 'Nuestro profesor del taller de cocina es muy bueno para hornear pan crujiente.' },
                ar: { word: 'ماهر في أن (+ المصدر)', sentence: 'معلمنا في ورشة المطبخ ماهر للغاية في خبز الخبز المقرمش.' },
                tr: { word: '...-mekte iyi / başarılı', sentence: 'Mutfak atölyesindeki öğretmenimiz çıtır ekmek pişirmekte inanılmaz derecede iyi.' },
                uk: { word: 'вправний у тому, щоб (+ інфінітив)', sentence: 'Наш викладач у кулінарній майстерні неймовірно добре пече хрусткий хліб.' }
            }
        },
        {
            id: 'glaeder_sig_til_at',
            word: 'glæder sig til at (+ infinitiv)',
            shortLabel: 'glæder sig til at...',
            category: 'praep_inf',
            formula: 'glæder sig til + AT + Infinitiv (Samme subjekt!)',
            x: 90,
            y: 76,
            meaning: 'Ser frem til noget med glæde ("looks forward to doing...")',
            sceneDesc: 'Familien står klar med pas, flybilletter og kufferter: De glæder sig til at rejse!',
            sentence: 'Vi glæder os til at rejse på ferie.',
            contextSentence: 'Hele familien har pakket kufferterne og glæder sig til at flyve sydpå i morgen.',
            ruleHint: 'Når det er DE SAMME personer, der både glæder sig og skal rejse, bruger man "til at + infinitiv" ("Vi glæder os til at rejse").',
            translations: {
                en: { word: 'looks forward to (+ -ing)', sentence: 'The whole family has packed their suitcases and looks forward to flying south tomorrow.' },
                de: { word: 'freut sich darauf zu (+ Infinitiv)', sentence: 'Die ganze Familie hat die Koffer gepackt und freut sich darauf, morgen in den Süden zu fliegen.' },
                es: { word: 'tiene muchas ganas de (+ infinitivo)', sentence: 'Toda la familia ha hecho las maletas y tiene muchas ganas de volar al sur mañana.' },
                ar: { word: 'يتطلع بشوق إلى أن (+ المصدر)', sentence: 'حزمت العائلة بأكملها الحقائب وتتطلع بشوق للسفر جنوبًا غدًا.' },
                tr: { word: '...-meyi dört gözle bekliyor', sentence: 'Tüm aile bavullarını topladı veพรุ่งนี้ güneye uçmayı dört gözle bekliyor.' },
                uk: { word: 'з нетерпінням чекає (+ інфінітив)', sentence: 'Уся родина спакувала валізи і з нетерпінням чекає на завтрашній переліт.' }
            }
        },
        {
            id: 'kom_til_at',
            word: 'kom til at (+ infinitiv = Uheld!)',
            shortLabel: 'kom til at...',
            category: 'praep_inf',
            formula: 'komme til + AT + Infinitiv (Utilsigtet handling / uheld)',
            x: 48,
            y: 89,
            meaning: 'Gjorde noget ved et uheld / uden vilje ("accidentally did...")',
            sceneDesc: 'Ups! Drengen på gulvet kom til at vælte melposen ud over sig selv.',
            sentence: 'Undskyld, jeg kom til at spilde mel på gulvet!',
            contextSentence: 'Det var slet ikke med vilje, men han kom desværre til at vælte posen med mel.',
            ruleHint: 'GULD-UDTRYK I HVERDAGEN: "At komme til at + infinitiv" betyder, at noget skete ved et UHELD ("Jeg kom til at slette filen", "Jeg kom til at sige noget dumt").',
            translations: {
                en: { word: 'accidentally / happened to (+ verb)', sentence: 'It was not on purpose at all, but unfortunately he accidentally knocked over the bag of flour.' },
                de: { word: 'ist aus Versehen passiert zu (+ Infinitiv)', sentence: 'Es war keine Absicht, aber er hat leider aus Versehen die Mehltüte umgeworfen.' },
                es: { word: 'sin querer (+ verbo)', sentence: 'No fue a propósito, pero desafortunadamente tiró la bolsa de harina sin querer.' },
                ar: { word: 'فعل عن غير قصد / بالخطأ ("kom til at")', sentence: 'لم يكن ذلك عن قصد على الإطلاق، لكنه أوقع كيس الدقيق بالخطأ للأسف.' },
                tr: { word: 'yanlışlıkla / istemeden yaptı ("kom til at")', sentence: 'Hiç bilerek olmadı ama maalesef yanlışlıkla un torbasını devirdi.' },
                uk: { word: 'випадково / ненароком зробив ("kom til at")', sentence: 'Це було зовсім не навмисно, але він, на жаль, випадково перекинув пакет із борошном.' }
            }
        },
        {
            id: 'traet_af_at',
            word: 'træt af at (+ infinitiv)',
            shortLabel: 'træt af at...',
            category: 'praep_inf',
            formula: 'træt af / bange for / vild med + AT + Infinitiv',
            x: 8,
            y: 58,
            meaning: 'Har fået nok af en handling ("tired of doing...")',
            sceneDesc: 'Drengen på bassinkanten sukker lidt – han er træt af at vente på sin tur.',
            sentence: 'Jeg er træt af at vente på bussen.',
            contextSentence: 'Efter tyve minutter på kanten blev han træt af at sidde stille og hoppede i vandet.',
            ruleHint: 'Efter følelsesudtryk med præposition ("træt af, bange for, ked af, vild med") følger "at + infinitiv", når det handler om én selv.',
            translations: {
                en: { word: 'tired of (+ -ing)', sentence: 'After twenty minutes on the edge, he got tired of sitting still and jumped into the water.' },
                de: { word: 'müde / es leid zu (+ Infinitiv)', sentence: 'Nach zwanzig Minuten am Rand war er es leid, stillzusitzen, und sprang ins Wasser.' },
                es: { word: 'cansado de (+ infinitivo)', sentence: 'Después de veinte minutos en el borde, se cansó de estar sentado y saltó al agua.' },
                ar: { word: 'سئم من أن / تعب من (+ المصدر)', sentence: 'بعد عشرين دقيقة على الحافة، ملّ من الجلوس ساكنًا وقفز في الماء.' },
                tr: { word: '...-mekten sıkıldı / yoruldu', sentence: 'Kenarda yirmi dakika bekledikten sonra hareketsiz oturmaktan sıkıldı ve suya atladı.' },
                uk: { word: 'втомився від того, щоб (+ інфінітив)', sentence: 'Через двадцять хвилин на бортику йому набридло сидіти тихо, і він стрибнув у воду.' }
            }
        },

        // 4. Præposition + ", at" + Ledsætning (Nyt subjekt!)
        {
            id: 'glad_for_at',
            word: 'glad for, at (+ ledsætning)',
            shortLabel: 'glad for, at...',
            category: 'praep_led',
            formula: 'glad for / ked af / overrasket over + , AT + Nyt Subjekt + (ikke) + Verbum',
            x: 37,
            y: 55,
            meaning: 'Præposition efterfulgt af en hel "at"-ledsætning med nyt subjekt!',
            sceneDesc: 'De to veninder krammer hinanden i døren: "Jeg er så glad for, at du kunne komme!"',
            sentence: 'Jeg er glad for, at du kunne komme i dag.',
            contextSentence: 'Veninden ved køkkendøren giver et stort kram og siger: "Jeg er så glad for, at du er her!"',
            ruleHint: 'SE FORSKELLEN: 1 person = "Jeg er glad for AT VÆRE her" (infinitiv). 2 forskellige personer (Jeg + du) = "Jeg er glad for, AT DU ER her" (ledsætning)! På dansk bliver præpositionen "for" stående foran ", at"!',
            translations: {
                en: { word: 'happy that (+ clause)', sentence: 'The friend by the kitchen door gives a big hug and says: "I am so happy that you are here!"' },
                de: { word: 'froh (darüber), dass (+ Nebensatz)', sentence: 'Die Freundin an der Küchentür umarmt sie und sagt: "Ich bin so froh, dass du da bist!"' },
                es: { word: 'contenta de que (+ oración)', sentence: 'La amiga en la puerta da un gran abrazo y dice: "¡Estoy tan contenta de que estés aquí!"' },
                ar: { word: 'سعيدة بأنَّ (+ جملة فرعية)', sentence: 'تعانق الصديقة عند باب المطبخ بحرارة وتقول: "أنا سعيدة جدًا لأنكِ هنا!"' },
                tr: { word: '...-diği için mutlu (yan cümle)', sentence: 'Mutfak kapısındaki arkadaş kocaman sarılıyor ve "Burada olduğun için çok mutluyum!" diyor.' },
                uk: { word: 'радий тому, що (+ підрядне речення)', sentence: 'Подруга біля дверей кухні міцно обіймає її та каже: "Я така рада, що ти тут!"' }
            }
        },
        {
            id: 'sikker_paa_at',
            word: 'sikker på, at (+ ledsætning)',
            shortLabel: 'sikker på, at...',
            category: 'praep_led',
            formula: 'sikker på / i tvivl om / grunden til + , AT + Subjekt + (ikke) + Verbum',
            x: 69,
            y: 54,
            meaning: 'Overbevist om et faktum i en ledsætning ("sure that...")',
            sceneDesc: 'Kvinden ved komfuret smager på gryden – hun er helt sikker på, at maden ikke brænder på.',
            sentence: 'Hun er sikker på, at suppen ikke brænder på.',
            contextSentence: 'Hun rører roligt i gryden og er helt sikker på, at maden nok skal blive klar til tiden.',
            ruleHint: 'Efter faste forbindelser med præposition ("sikker på, overbevist om, grunden til, idéen med") kan man IKKE udelade "at" – og i ledsætningen står "ikke" FØR verbet!',
            translations: {
                en: { word: 'sure / certain that (+ clause)', sentence: 'She calmly stirs the pot and is completely sure that the food will be ready on time.' },
                de: { word: 'sicher, dass (+ Nebensatz)', sentence: 'Sie rührt ruhig im Topf und ist ganz sicher, dass das Essen rechtzeitig fertig wird.' },
                es: { word: 'segura de que (+ oración)', sentence: 'Remueve la olla con calma y está completamente segura de que la comida estará lista a tiempo.' },
                ar: { word: 'متأكدة من أنَّ (+ جملة فرعية)', sentence: 'تحرك القدر بهدوء وهي متأكدة تمامًا من أن الطعام سيكون جاهزًا في الوقت المحدد.' },
                tr: { word: '...-diğinden emin (yan cümle)', sentence: 'Tencereyi sakin bir şekilde karıştırıyor ve yemeğin zamanında hazır olacağından tamamen emin.' },
                uk: { word: 'впевнена в тому, що (+ підрядне речення)', sentence: 'Вона спокійно помішує в каструлі і цілком упевнена, що їжа буде готова вчасно.' }
            }
        },

        // 5. Sammensatte bindeord med "at" (for at, ved at, uden at, så ... at)
        {
            id: 'for_at',
            word: 'for at (+ infinitiv = Formål)',
            shortLabel: 'for at...',
            category: 'sammensat',
            formula: 'Handling + FOR AT + Infinitiv (Hensigt / Formål = "in order to")',
            x: 11,
            y: 78,
            meaning: 'Udtrykker FORMÅL og HENSIGT ("in order to")',
            sceneDesc: 'Pigen lægger guldmønter i sin sparegris for at købe en ny rød cykel.',
            sentence: 'Hun sparer op for at købe en ny cykel.',
            contextSentence: 'Hver måned lægger hun lidt lommepenge i sparegrisen for at få råd til sin drømmecykel.',
            ruleHint: 'KEND FORSKELLEN PÅ "FOR AT" OG "FORDI": "For at" udtrykker et FORMÅL/MÅL og følges af INFINITIV ("for at købe"). "Fordi" udtrykker en ÅRSAG og følges af SUBJEKT + VERBUM ("fordi hun vil købe")!',
            translations: {
                en: { word: 'in order to / to (purpose)', sentence: 'Every month she puts pocket money into her piggy bank in order to afford her dream bike.' },
                de: { word: 'um ... zu (+ Infinitiv = Zweck)', sentence: 'Jeden Monat legt sie Geld ins Sparschwein, um sich ihr Traumfahrrad leisten zu können.' },
                es: { word: 'para (+ infinitivo = propósito)', sentence: 'Cada mes mete dinero en su alcancía para poder comprarse la bicicleta de sus sueños.' },
                ar: { word: 'لِكَيْ / مِنْ أَجْلِ أَنْ (+ المصدر = الغرض)', sentence: 'تضع كل شهر بعض النقود في حصالتها لكي تتمكن من شراء دراجة أحلامها.' },
                tr: { word: '...-mek için / amacıyla ("for at")', sentence: 'Hayalindeki bisikleti alabilmek için her ay kumbarasına biraz harçlık atıyor.' },
                uk: { word: 'для того щоб (+ інфінітив = мета)', sentence: 'Щомісяця вона кладе кишенькові гроші у скарбничку, щоб купити велосипед своєї мрії.' }
            }
        },
        {
            id: 'ved_at',
            word: 'ved at (+ infinitiv = Metode)',
            shortLabel: 'ved at...',
            category: 'sammensat',
            formula: 'Handling + VED AT + Infinitiv (Måde / Middel = "by doing")',
            x: 24,
            y: 76,
            meaning: 'Viser METODEN eller HVORDAN man opnår noget ("by doing...")',
            sceneDesc: 'Den unge mand med høretelefoner forbedrer sin udtale ved at tale ind i mikrofonen.',
            sentence: 'Han lærer udtale ved at øve sig hver dag.',
            contextSentence: 'Man bliver hurtigt meget bedre til dansk ved at lytte og gentage ordene højt i mikrofonen.',
            ruleHint: '"Ved at + infinitiv" svarer på spørgsmålet "HVORDAN / PÅ HVILKEN MÅDE?" (engelsk: "by + -ing").',
            translations: {
                en: { word: 'by (+ -ing = method/means)', sentence: 'You quickly get much better at Danish by listening and repeating the words aloud.' },
                de: { word: 'indem / dadurch, dass (Methode)', sentence: 'Man wird schnell besser in Dänisch, indem man zuhört und die Wörter laut wiederholt.' },
                es: { word: 'al (+ infinitivo) / mediante', sentence: 'Uno mejora rápidamente en danés al escuchar y repetir las palabras en voz alta.' },
                ar: { word: 'عَنْ طَرِيقِ / بِوَاسِطَةِ (+ المصدر)', sentence: 'يتحسن المرء بسرعة في اللغة الدنماركية عن طريق الاستماع وتكرار الكلمات بصوت عالٍ.' },
                tr: { word: '...-erek / -arak (yöntem: "ved at")', sentence: 'Kelimeleri dinleyerek ve yüksek sesle tekrar ederek Dancada hızla gelişirsiniz.' },
                uk: { word: 'шляхом / завдяки тому що ("ved at")', sentence: 'Можна швидко покращити данську, слухаючи та повторюючи слова вголос.' }
            }
        },
        {
            id: 'uden_at',
            word: 'uden at (+ infinitiv = Fravær)',
            shortLabel: 'uden at...',
            category: 'sammensat',
            formula: 'Handling + UDEN AT + Infinitiv ("without doing...")',
            x: 76,
            y: 20,
            meaning: 'Noget sker UDEN en ledsagende handling ("without doing...")',
            sceneDesc: 'Manden i den grønne trøje lister stille ud ad døren på tæer uden at sige et ord.',
            sentence: 'Han gik ud ad døren uden at sige farvel.',
            contextSentence: 'Han listede helt stille ud af lokalet på tåspidser uden at forstyrre de andre.',
            ruleHint: 'Efter "uden at" følger typisk en infinitiv ("uden at sige farvel"). Hvis der skiftes subjekt, bruges ledsætning ("uden at nogen så ham").',
            translations: {
                en: { word: 'without (+ -ing)', sentence: 'He tiptoed quietly out of the room without disturbing the others.' },
                de: { word: 'ohne ... zu (+ Infinitiv)', sentence: 'Er schlich ganz leise auf Zehenspitzen aus dem Raum, ohne die anderen zu stören.' },
                es: { word: 'sin (+ infinitivo)', sentence: 'Salió de puntillas muy silenciosamente de la habitación sin molestar a los demás.' },
                ar: { word: 'دُونَ أَنْ / بِدُونِ (+ المصدر)', sentence: 'تسلل بهدوء تام على أطراف أصابعه خارج الغرفة دون أن يزعج الآخرين.' },
                tr: { word: '...-meden / -madan ("uden at")', sentence: 'Diğerlerini rahatsız etmeden parmak uçlarında sessizce odadan çıktı.' },
                uk: { word: 'не (+ дієприслівник) / без того щоб ("uden at")', sentence: 'Він тихо вийшов із кімнати навшпиньках, не турбуючи інших.' }
            }
        },
        {
            id: 'saa_at',
            word: 'så ... at (+ ledsætning = Konsekvens)',
            shortLabel: 'så varm, at...',
            category: 'sammensat',
            formula: 'så + Adjektiv/Adverbium + , AT + Subjekt + (ikke) + Verbum',
            x: 92,
            y: 28,
            meaning: 'Graden er så høj, at det udløser en konsekvens ("so ... that")',
            sceneDesc: 'Kvinden puster på sin dampende kaffekop: Kaffen er så varm, at hun ikke kan drikke den endnu.',
            sentence: 'Kaffen er så varm, at hun ikke kan drikke den.',
            contextSentence: 'Den friskbryggede kaffe i koppen er så varm, at hun må puste på den først.',
            ruleHint: 'Når "så" står foran et adjektiv ("så varm, så dyrt, så træt"), kommer konsekvensen i en "at"-LEDSÆTNING – og i ledsætningen står "ikke" FØR verbet ("... at hun ikke kan drikke den")!',
            translations: {
                en: { word: 'so [adj.] that (+ clause)', sentence: 'The freshly brewed coffee in the cup is so hot that she has to blow on it first.' },
                de: { word: 'so [Adj.], dass (+ Nebensatz)', sentence: 'Der frisch gebrühte Kaffee in der Tasse ist so heiß, dass sie erst pusten muss.' },
                es: { word: 'tan [adj.] que (+ oración)', sentence: 'El café recién hecho está tan caliente que tiene que soplar primero.' },
                ar: { word: 'جدًّا لِدَرَجَةِ أَنَّ ("så ... at")', sentence: 'القهوة الطازجة في الفنجان ساخنة جدًا لدرجة أنها تضطر للنفخ فيها أولًا.' },
                tr: { word: 'o kadar [sıfat] ki ("så ... at")', sentence: 'Fincandaki taze kahve o kadar sıcak ki önce üflemesi gerekiyor.' },
                uk: { word: 'настільки [прикм.], що ("så ... at")', sentence: 'Свіжозварена кава в чашці настільки гаряча, що їй доводиться спершу подути на неї.' }
            }
        }
    ];

    function getAtTranslation(item) {
        const lang = getLang();
        const trans = getConjunctionWordTranslation(item.id, lang);
        if (trans) return trans;
        if (item.translations && item.translations[lang]) {
            return item.translations[lang];
        }
        if (item.translations && item.translations['en']) {
            return item.translations['en'];
        }
        return { word: item.meaning, sentence: '' };
    }

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .konjunktioner-at-view {
            max-width: 960px;
            margin: 0 auto;
            padding: 1rem 1rem 3.5rem;
            color: #f8fafc;
        }

        .at-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .at-hero-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid #f59e0b;
            color: #fde68a;
            padding: 0.4rem 1.2rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.8rem;
        }
        .at-hero h1 {
            font-size: 1.85rem;
            font-weight: 900;
            margin-bottom: 0.6rem;
            background: linear-gradient(135deg, #fde68a, #f59e0b, #ea580c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .at-hero p {
            color: #94a3b8;
            font-size: 1.15rem;
            max-width: 850px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }

        .golden-rule-banner-at {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.9));
            border: 2px solid #f59e0b;
            border-radius: 20px;
            padding: 1.4rem 2rem;
            max-width: 1000px;
            margin: 0 auto 2.5rem;
            box-shadow: 0 10px 30px rgba(245, 158, 11, 0.2);
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        .rule-icon-at {
            font-size: 2.8rem;
            flex-shrink: 0;
        }
        .rule-content-at h4 {
            color: #fde68a;
            font-size: 1.2rem;
            font-weight: 800;
            margin-bottom: 0.35rem;
        }
        .rule-content-at p {
            color: #cbd5e1;
            font-size: 0.98rem;
            line-height: 1.5;
            margin: 0;
        }
        .rule-pills-row-at {
            display: flex;
            gap: 0.6rem;
            margin-top: 0.8rem;
            flex-wrap: wrap;
        }
        .rule-pill-at {
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            font-size: 0.84rem;
            font-weight: 800;
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid #f59e0b;
            color: #fde68a;
        }

        .adv-tabs-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            justify-content: center;
            margin-bottom: 2.2rem;
            background: rgba(15, 23, 42, 0.6);
            padding: 0.6rem;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .adv-tab-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 0.8rem 1.3rem;
            border-radius: 12px;
            font-size: 0.96rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .adv-tab-btn:hover {
            color: #f1f5f9;
            background: rgba(255, 255, 255, 0.05);
        }
        .adv-tab-btn.active {
            background: #d97706;
            color: white;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
        }

        /* Vrimmel Layout */
        .vrimmel-layout { max-width: 860px;
            margin: 0 auto;
        }
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
        .vrimmel-filters {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
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
        .filter-btn:hover {
            background: #475569;
            color: white;
        }
        .filter-btn.active {
            background: #d97706;
            color: white;
            border-color: #f59e0b;
            box-shadow: 0 2px 8px rgba(245, 158, 11, 0.35);
        }
        .pure-toggle-btn {
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid #f59e0b;
            color: #fde68a;
            padding: 0.45rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .pure-toggle-btn.active {
            background: #b45309;
            color: white;
        }

        .vrimmel-stage {
            position: relative;
            width: 100%;
            line-height: 0;
            user-select: none;
            overflow: hidden;
            background: #0f172a;
        }
        .vrimmel-img {
            width: 100%;
            height: auto;
            display: block;
        }

        .hotspot-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #d97706;
            border: 2.5px solid #ffffff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 0.85rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6), 0 0 15px rgba(245, 158, 11, 0.6);
            transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10;
        }
        .hotspot-pin:hover {
            transform: translate(-50%, -50%) scale(1.3);
            background: #f59e0b;
            box-shadow: 0 0 25px #f59e0b;
            z-index: 25;
        }
        .hotspot-pin.active {
            transform: translate(-50%, -50%) scale(1.35);
            background: #06b6d4;
            border-color: #ffffff;
            box-shadow: 0 0 30px #06b6d4;
            z-index: 30;
        }
        .hotspot-label {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            color: #fde68a;
            border: 1px solid #f59e0b;
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 800;
            white-space: nowrap;
            margin-top: 4px;
            pointer-events: none;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        /* Målords Præsentationsboks */
        .vrimmel-inspector {
            background: #1e293b;
            border: 2px solid #f59e0b;
            border-radius: 20px;
            margin-top: 1.5rem;
            padding: 1.8rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 2rem;
            align-items: start;
            animation: fadeIn 0.3s ease;
        }
        @media (max-width: 850px) {
            .vrimmel-inspector { grid-template-columns: 1fr; gap: 1.5rem; }
        }
        .inspector-left, .inspector-right {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .inspector-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .inspector-badge-row {
            display: flex;
            gap: 0.6rem;
            align-items: center;
            flex-wrap: wrap;
        }
        .inspector-badge {
            background: rgba(245, 158, 11, 0.2);
            border: 1px solid #f59e0b;
            color: #fde68a;
            padding: 0.25rem 0.75rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
        }
        .inspector-audio-btn {
            background: #d97706;
            color: white;
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
        }
        .inspector-audio-btn:hover {
            background: #f59e0b;
            transform: scale(1.1);
        }
        .inspector-word-title {
            font-size: 2rem;
            font-weight: 900;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            margin: 0;
        }
        .inspector-trans-box {
            background: #0f172a;
            border-radius: 12px;
            padding: 1rem 1.2rem;
            border-left: 4px solid #f59e0b;
        }
        .trans-badge-label {
            font-size: 0.75rem;
            font-weight: 800;
            color: #fde68a;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.25rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .trans-word-val {
            font-size: 1.35rem;
            font-weight: 800;
            color: #f8fafc;
        }
        .inspector-scene-box {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 12px;
            padding: 1rem 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .scene-heading {
            font-size: 0.85rem;
            font-weight: 800;
            color: #94a3b8;
            margin-bottom: 0.4rem;
            text-transform: uppercase;
        }
        .scene-text {
            color: #cbd5e1;
            font-size: 0.98rem;
            line-height: 1.5;
            margin: 0;
        }
        .inspector-sentence-card {
            background: #0f172a;
            border-radius: 14px;
            padding: 1.2rem;
            border: 1.5px solid rgba(245, 158, 11, 0.35);
        }
        .sentence-quote-text {
            font-size: 1.2rem;
            font-weight: 700;
            color: white;
            line-height: 1.5;
            margin-bottom: 0.5rem;
        }
        .sentence-trans-text {
            font-size: 0.95rem;
            color: #94a3b8;
            font-style: italic;
            margin-bottom: 0.8rem;
        }
        .inspector-speak-btn {
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid #f59e0b;
            color: #fde68a;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;
        }
        .inspector-speak-btn:hover {
            background: #f59e0b;
            color: #0f172a;
        }
        .inspector-actions {
            display: flex;
            gap: 0.8rem;
            margin-top: 0.5rem;
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
            transition: all 0.2s;
            text-align: center;
        }
        .inspector-btn-action:hover {
            background: #475569;
        }

        /* Tab 2: Røntgenmaskinen */
        .vaerksted-container {
            max-width: 980px;
            margin: 0 auto;
        }
        .vaerksted-subtabs {
            display: flex;
            gap: 0.8rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .vaerksted-subtab-btn {
            background: #1e293b;
            color: #cbd5e1;
            border: 2px solid rgba(255, 255, 255, 0.1);
            padding: 0.75rem 1.4rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
        }
        .vaerksted-subtab-btn:hover {
            border-color: #f59e0b;
            color: white;
        }
        .vaerksted-subtab-btn.active {
            background: #d97706;
            border-color: #fde68a;
            color: white;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
        }

        .vaerksted-card {
            background: #1e293b;
            border-radius: 20px;
            padding: 2.2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            margin-bottom: 2rem;
        }

        .word-selector-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
            gap: 0.8rem;
            margin: 1.5rem 0;
        }
        .word-sel-btn {
            background: #0f172a;
            color: #cbd5e1;
            border: 2px solid rgba(255, 255, 255, 0.1);
            padding: 0.85rem 1rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.98rem;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .word-sel-btn:hover {
            border-color: #f59e0b;
            color: white;
        }
        .word-sel-btn.active {
            border-color: #fde68a;
            background: rgba(245, 158, 11, 0.2);
            color: #fde68a;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
        }

        .syntax-boxes-row {
            display: flex;
            gap: 0.7rem;
            justify-content: center;
            align-items: stretch;
            flex-wrap: wrap;
            margin: 1.5rem 0;
        }
        .syntax-token-box {
            background: #0f172a;
            border: 2.5px solid;
            border-radius: 14px;
            padding: 0.9rem 1.2rem;
            min-width: 110px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.3rem;
        }
        .syntax-token-role {
            font-size: 0.72rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .syntax-token-word {
            font-size: 1.3rem;
            font-weight: 900;
            color: white;
        }

        /* Detektiven & Quizzer */
        .detektiv-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 880px;
            margin: 0 auto;
        }
        .detektiv-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 1.5rem;
        }
        .detektiv-context-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(245, 158, 11, 0.2);
            border: 1px solid #f59e0b;
            color: #fde68a;
            padding: 0.35rem 0.9rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 800;
            margin-bottom: 1.2rem;
            text-transform: uppercase;
        }
        .detektiv-prompt-text {
            font-size: 1.2rem;
            color: #f8fafc;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            font-weight: 600;
        }
        .detektiv-sentence-quote {
            font-size: 1.4rem;
            font-weight: 800;
            color: white;
            background: rgba(15, 23, 42, 0.7);
            padding: 1.3rem;
            border-radius: 14px;
            border-left: 5px solid #f59e0b;
            margin-bottom: 2rem;
            text-align: center;
            line-height: 1.6;
        }
        .detektiv-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .detektiv-opt-btn {
            background: #1e293b;
            color: #f8fafc;
            border: 2px solid rgba(255, 255, 255, 0.12);
            padding: 1.1rem 1.4rem;
            border-radius: 14px;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .detektiv-opt-btn:hover {
            border-color: #f59e0b;
            background: #334155;
            transform: translateY(-2px);
        }
        .detektiv-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .detektiv-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #fca5a5 !important;
        }
        .detektiv-feedback-box {
            border-radius: 14px;
            padding: 1.4rem;
            margin-top: 1.5rem;
            line-height: 1.6;
            font-size: 1.05rem;
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .detektiv-feedback-box.show { display: block; }
        .detektiv-feedback-box.correct {
            background: rgba(34, 197, 94, 0.12);
            border: 2px solid #22c55e;
            color: #86efac;
        }
        .detektiv-feedback-box.wrong {
            background: rgba(239, 68, 68, 0.12);
            border: 2px solid #ef4444;
            color: #fca5a5;
        }

        /* Sætningsbyggeren */
        .builder-container {
            max-width: 980px;
            margin: 0 auto;
        }
        .builder-card {
            background: #1e293b;
            border-radius: 20px;
            padding: 2.2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .builder-step-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(245, 158, 11, 0.2);
            border: 1px solid #f59e0b;
            color: #fde68a;
            padding: 0.4rem 1rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.85rem;
            text-transform: uppercase;
            margin-bottom: 1.2rem;
        }
        .flow-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.8rem;
            margin-bottom: 2rem;
        }
        @media (max-width: 750px) {
            .flow-container { grid-template-columns: 1fr 1fr; }
        }
        .flow-step {
            background: #0f172a;
            border-radius: 12px;
            padding: 0.9rem;
            text-align: center;
            border: 2px solid;
        }
        .flow-step.flow-subjekt { border-color: #22c55e; }
        .flow-step.flow-verbum { border-color: #ef4444; }
        .flow-step.flow-adverbium { border-color: #06b6d4; }
        .flow-step.flow-rest { border-color: #0ea5e9; }
        .flow-step.flow-konj { border-color: #f59e0b; }
        .flow-step-num { font-size: 0.75rem; font-weight: 800; margin-bottom: 0.2rem; color: #cbd5e1; }
        .flow-step-title { font-size: 0.95rem; font-weight: 800; color: white; }

        .sb-sentence-display {
            font-size: 1.4rem;
            font-weight: 800;
            color: white;
            background: #0f172a;
            padding: 1.4rem;
            border-radius: 16px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            margin-bottom: 1.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.6rem;
        }
        .sb-blank-slot {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 110px;
            padding: 0.2rem 1rem;
            border: 2.5px dashed #f59e0b;
            background: rgba(245, 158, 11, 0.15);
            border-radius: 10px;
            color: #fde68a;
            font-weight: 900;
            letter-spacing: 2px;
            transition: all 0.3s;
        }
        .sb-blank-slot.filled {
            border: 2px solid #22c55e;
            background: rgba(34, 197, 94, 0.22);
            color: #4ade80;
            letter-spacing: normal;
        }

        .sb-puzzle-slots {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.8rem;
            margin-bottom: 2rem;
        }
        @media (max-width: 750px) {
            .sb-puzzle-slots { grid-template-columns: 1fr 1fr; }
        }
        .sb-puzzle-slot {
            background: #0f172a;
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 14px;
            padding: 1.2rem 0.8rem;
            min-height: 95px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: all 0.2s;
        }
        .sb-puzzle-slot.slot-subjekt { border-color: #22c55e; }
        .sb-puzzle-slot.slot-verbum { border-color: #ef4444; }
        .sb-puzzle-slot.slot-adverbium { border-color: #06b6d4; }
        .sb-puzzle-slot.slot-rest { border-color: #0ea5e9; }
        .sb-puzzle-slot.slot-konj { border-color: #f59e0b; }
        .sb-puzzle-slot.filled {
            border-style: solid;
            background: rgba(15, 23, 42, 0.9);
        }
        .slot-badge-callout {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 0.4rem;
        }
        .callout-subjekt { color: #86efac; }
        .callout-verbum { color: #fca5a5; }
        .callout-adverbium { color: #22d3ee; }
        .callout-rest { color: #7dd3fc; }
        .callout-konj { color: #fde68a; }

        .sb-puzzle-chips {
            display: flex;
            gap: 0.8rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 2rem;
        }
        .sb-puzzle-chip {
            background: #334155;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.2);
            padding: 0.8rem 1.4rem;
            border-radius: 12px;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
        }
        .sb-puzzle-chip:hover {
            border-color: #f59e0b;
            transform: translateY(-2px);
        }
        .sb-puzzle-chip.used {
            opacity: 0.25;
            pointer-events: none;
        }

        /* Special Tabs */
        .special-tab-container {
            max-width: 960px;
            margin: 0 auto;
        }
        .special-intro-box {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 2rem;
            text-align: center;
        }
        .special-intro-box h2 {
            font-size: 2.1rem;
            color: #fde68a;
            margin-bottom: 0.6rem;
        }
        .special-intro-box p {
            color: #cbd5e1;
            font-size: 1.08rem;
            max-width: 780px;
            margin: 0 auto;
            line-height: 1.6;
        }
        .special-rule-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 1.2rem;
            margin-bottom: 2.5rem;
        }
        .special-rule-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.4rem;
            border: 2px solid;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }
        .special-rule-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.4rem;
            flex-wrap: wrap;
        }
        .special-rule-word {
            font-size: 1.3rem;
            font-weight: 900;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .special-rule-role {
            font-size: 0.72rem;
            font-weight: 800;
            padding: 0.2rem 0.6rem;
            border-radius: 6px;
            text-transform: uppercase;
        }
        .special-rule-desc {
            font-size: 0.92rem;
            color: #cbd5e1;
            line-height: 1.5;
            flex-grow: 1;
        }
        .special-rule-example {
            background: rgba(15, 23, 42, 0.8);
            padding: 0.8rem;
            border-radius: 10px;
            border-left: 3px solid;
            font-size: 0.95rem;
            color: #f8fafc;
        }

        .exercise-action-card {
            background: #1e293b;
            border-radius: 20px;
            padding: 2.2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
        }
        .progress-header {
            display: flex;
            justify-content: space-between;
            color: #94a3b8;
            font-weight: 800;
            font-size: 0.95rem;
            margin-bottom: 0.8rem;
        }
        .progress-bar-wrap {
            height: 8px;
            background: #334155;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 2rem;
        }
        .progress-bar-fill {
            height: 100%;
            background: #f59e0b;
            transition: width 0.3s ease;
        }
        .exercise-dialog-quote {
            font-size: 1.35rem;
            color: white;
            line-height: 1.75;
            background: #0f172a;
            padding: 1.5rem;
            border-radius: 14px;
            border-left: 5px solid #f59e0b;
            margin-bottom: 1.8rem;
        }

        .action-btn-primary {
            background: #d97706;
            color: white;
            border: none;
            padding: 0.85rem 1.6rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35);
        }
        .action-btn-primary:hover {
            background: #f59e0b;
            color: #0f172a;
            transform: translateY(-2px);
        }

        .score-celebration-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95));
            border: 2px solid #f59e0b;
            border-radius: 20px;
            padding: 2.5rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(245, 158, 11, 0.35);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'at-hero';
    hero.innerHTML = `
        <h1>Ordet "at" i alle sætningskonstruktioner</h1>
        <p>Lær at kende forskel på ledsætning, infinitiv og faste vendinger.</p>
    `;
    viewContainer.appendChild(hero);

    // Tabs Navigation
    const nav = document.createElement('div');
    nav.className = 'adv-tabs-nav';

    const tabs = [
        { id: 'vrimmel', label: getTranslation('at_tab_vrimmel'), icon: '🖼️' },
        { id: 'roentgen', label: getTranslation('at_tab_roentgen'), icon: '🔬' },
        { id: 'detektiv', label: getTranslation('at_tab_detektiv'), icon: '🔍' },
        { id: 'builder', label: getTranslation('at_tab_builder'), icon: '🧩' },
        { id: 'kontekst', label: getTranslation('at_tab_kontekst'), icon: '🎯' },
        { id: 'modal', label: getTranslation('at_tab_modal'), icon: '🚦' },
        { id: 'sammensat', label: getTranslation('at_tab_sammensat'), icon: '🛠️' },
        { id: 'praep', label: getTranslation('at_tab_praep'), icon: '🔗' }
    ];

    let currentTab = 'vrimmel';

    tabs.forEach(tab => {
        const btn = document.createElement('button');
        btn.className = `adv-tab-btn ${currentTab === tab.id ? 'active' : ''}`;
        btn.id = `tab-btn-${tab.id}`;
        btn.innerHTML = `<span>${tab.icon}</span> ${tab.label}`;
        btn.onclick = () => switchTab(tab.id);
        nav.appendChild(btn);
    });
    viewContainer.appendChild(nav);

    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content-area';
    viewContainer.appendChild(tabContent);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/konjunktioner_at/' + tabId);
        nav.querySelectorAll('.adv-tab-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = nav.querySelector(`#tab-btn-${tabId}`);
        if (activeBtn) activeBtn.classList.add('active');

        tabContent.innerHTML = '';
        if (tabId === 'vrimmel') {
            renderTabVrimmel(tabContent);
        } else if (tabId === 'roentgen') {
            renderTabRoentgen(tabContent);
        } else if (tabId === 'detektiv') {
            renderTabDetektiv(tabContent);
        } else if (tabId === 'builder') {
            renderTabBuilder(tabContent);
        } else if (tabId === 'kontekst') {
            renderTabKontekst(tabContent);
        } else if (tabId === 'modal') {
            renderTabModal(tabContent);
        } else if (tabId === 'sammensat') {
            renderTabSammensat(tabContent);
        } else if (tabId === 'praep') {
            renderTabPraep(tabContent);
        }
    }

    // ==========================================
    // TAB 1: VRIMLEBILLEDET
    // ==========================================
    let activeFilter = 'alle';
    let isPureMode = false;
    let selectedWord = null;

    function renderTabVrimmel(parent) {
        parent.innerHTML = '';

        if (!selectedWord) {
            selectedWord = AT_KONSTRUKTIONER_DATA[0];
        }

        const layout = document.createElement('div');
        layout.className = 'vrimmel-layout';

        const stageCard = document.createElement('div');
        stageCard.className = 'vrimmel-stage-card';

        const controls = document.createElement('div');
        controls.className = 'vrimmel-controls-bar';

        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'vrimmel-filters';

        const filters = [
            { id: 'alle', label: 'Alle (18)' },
            { id: 'konjunktion', label: '1. Ledsætning (4)' },
            { id: 'infinitiv', label: '2. Infinitiv (4)' },
            { id: 'praep_inf', label: '3. Præp. + infinitiv (4)' },
            { id: 'praep_led', label: '4. Præp. + ledsætning (2)' },
            { id: 'sammensat', label: '5. Sammensatte (4)' }
        ];

        filters.forEach(f => {
            const fBtn = document.createElement('button');
            fBtn.className = `filter-btn ${activeFilter === f.id ? 'active' : ''}`;
            fBtn.textContent = f.label;
            fBtn.onclick = () => {
                activeFilter = f.id;
                renderTabVrimmel(parent);
            };
            filtersDiv.appendChild(fBtn);
        });

        const pureBtn = document.createElement('button');
        pureBtn.className = `pure-toggle-btn ${isPureMode ? 'active' : ''}`;
        pureBtn.innerHTML = `<span>${isPureMode ? '👁️' : '🏷️'}</span> ${isPureMode ? 'Skjul ordmærker' : 'Vis ordmærker'}`;
        pureBtn.onclick = () => {
            isPureMode = !isPureMode;
            renderTabVrimmel(parent);
        };

        controls.appendChild(filtersDiv);
        controls.appendChild(pureBtn);
        stageCard.appendChild(controls);

        const stage = document.createElement('div');
        stage.className = 'vrimmel-stage';

        const img = document.createElement('img');
        img.src = 'assets/konjunktioner_at_vrimmel.jpg';
        img.alt = 'Ordet AT i alle sætningskonstruktioner';
        img.className = 'vrimmel-img';
        stage.appendChild(img);

        const visibleWords = AT_KONSTRUKTIONER_DATA.filter(item => {
            if (activeFilter === 'alle') return true;
            return item.category === activeFilter;
        });

        visibleWords.forEach((item, idx) => {
            const pin = document.createElement('div');
            pin.className = `hotspot-pin ${selectedWord && selectedWord.id === item.id ? 'active' : ''}`;
            pin.style.left = `${item.x}%`;
            pin.style.top = `${item.y}%`;
            pin.dataset.id = item.id;
            pin.innerHTML = `
                <span>${idx + 1}</span>
                ${!isPureMode ? `<span class="hotspot-label">${item.shortLabel}</span>` : ''}
            `;

            pin.onclick = (e) => {
                e.stopPropagation();
                updateInspector(item, true);
                speakDanish(item.sentence);
            };

            stage.appendChild(pin);
        });

        stageCard.appendChild(stage);
        layout.appendChild(stageCard);

        const inspector = document.createElement('div');
        inspector.className = 'vrimmel-inspector';
        layout.appendChild(inspector);
        parent.appendChild(layout);

        function updateInspector(item, shouldScroll = false) {
            selectedWord = item;

            stage.querySelectorAll('.hotspot-pin').forEach(p => {
                p.classList.toggle('active', p.dataset.id === item.id);
            });

            const trans = getAtTranslation(item);
            const isDanish = getLang() === 'da';
            const showWordTrans = !isDanish && trans && trans.word && trans.word !== item.word;
            const showSentenceTrans = !isDanish && trans && trans.sentence && trans.sentence !== item.sentence;

            inspector.innerHTML = `
                <div class="inspector-left">
                    <div class="inspector-header">
                        <div class="inspector-badge-row">
                            <span class="inspector-badge">📐 ${item.formula}</span>
                        </div>
                        <button class="inspector-audio-btn" id="insp-speak-word" title="Lyt til udtale">🔊</button>
                    </div>

                    <h2 class="inspector-word-title">
                        <span>🌟</span> ${item.word}
                    </h2>
                    ${showWordTrans ? `<div class="trans-word-val" style="color:#6ee7b7; font-size:1.15rem; font-weight:700;">🌍 ${trans.word}</div>` : ''}

                    <div class="inspector-sentence-card" style="margin-top:0.4rem;">
                        <div class="sentence-quote-text">"${item.sentence}"</div>
                        ${showSentenceTrans ? `<div class="sentence-trans-text" style="color:#fde68a;">🌍 "${trans.sentence}"</div>` : ''}
                        <button class="inspector-speak-btn" id="insp-speak-sent" style="margin-top:0.3rem;">
                            <span>🔊</span> ${getTranslation('konj_btn_listen_sentence')}
                        </button>
                    </div>
                </div>

                <div class="inspector-right">
                    <div class="inspector-scene-box" style="border-left: 3px solid #f59e0b; background:#0f172a; padding:1.2rem; border-radius:14px;">
                        <div style="font-size:0.85rem; font-weight:800; color:#f59e0b; margin-bottom:0.4rem;">
                            💡 ${item.meaning}
                        </div>
                        <p style="color:#cbd5e1; font-size:0.95rem; line-height:1.55; margin:0;">
                            ${item.ruleHint}
                        </p>
                    </div>

                    <div class="inspector-actions" style="margin-top:auto; display:flex; gap:0.8rem;">
                        <button class="inspector-btn-action" id="insp-prev-btn">${getTranslation('konj_btn_prev_word')}</button>
                        <button class="inspector-btn-action" id="insp-next-btn" style="background:#d97706;">${getTranslation('konj_btn_next_word')}</button>
                    </div>
                </div>
            `;

            inspector.querySelector('#insp-speak-word').onclick = () => speakDanish(item.sentence);
            inspector.querySelector('#insp-speak-sent').onclick = () => speakDanish(item.sentence);

            inspector.querySelector('#insp-prev-btn').onclick = () => {
                const idx = visibleWords.findIndex(w => w.id === item.id);
                const prevItem = visibleWords[(idx - 1 + visibleWords.length) % visibleWords.length];
                updateInspector(prevItem, false);
                speakDanish(prevItem.sentence);
            };
            inspector.querySelector('#insp-next-btn').onclick = () => {
                const idx = visibleWords.findIndex(w => w.id === item.id);
                const nextItem = visibleWords[(idx + 1) % visibleWords.length];
                updateInspector(nextItem, false);
                speakDanish(nextItem.sentence);
            };

            if (shouldScroll) {
                inspector.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        updateInspector(selectedWord, false);
    }

    // ==========================================
    // TAB 2: "AT"-RØNTGENMASKINEN & KOGNITIV RAMME
    // ==========================================
    let activeRoentgenSub = 'kognitiv_ramme';
    let selectedVerbDemo = 'haaber';
    let selectedSubjMode = 'samme'; // 'samme' (infinitiv) | 'nyt' (ledsætning)
    let selectedModalDemo = 'kan';

    function renderTabRoentgen(parent) {
        parent.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.className = 'vaerksted-container';

        const subtabs = document.createElement('div');
        subtabs.className = 'vaerksted-subtabs';

        const subList = [
            { id: 'kognitiv_ramme', label: '💭 1. Den Kognitive Nøgle: Tankeboblen & Billedrammen ("Jeg tror, at...")' },
            { id: 'konj_vs_inf', label: '🔍 2. Samme Person (Infinitiv-at) vs. Ny Person (Ledsætnings-at)' },
            { id: 'modal_faelde', label: '🚫 3. Modalverbum-Fælden: Hvornår er "at" FORBUDT?' },
            { id: 'fem_overblik', label: '📐 4. De 5 "AT"-Konstruktioner på ét ark' }
        ];

        subList.forEach(st => {
            const btn = document.createElement('button');
            btn.className = `vaerksted-subtab-btn ${activeRoentgenSub === st.id ? 'active' : ''}`;
            btn.textContent = st.label;
            btn.onclick = () => {
                activeRoentgenSub = st.id;
                renderTabRoentgen(parent);
            };
            subtabs.appendChild(btn);
        });
        wrap.appendChild(subtabs);

        const body = document.createElement('div');
        wrap.appendChild(body);
        parent.appendChild(wrap);

        if (activeRoentgenSub === 'kognitiv_ramme') {
            renderRoentgenKognitiv(body);
        } else if (activeRoentgenSub === 'konj_vs_inf') {
            renderRoentgenSub1(body);
        } else if (activeRoentgenSub === 'modal_faelde') {
            renderRoentgenSub2(body);
        } else {
            renderRoentgenSub3(body);
        }
    }

    function renderRoentgenKognitiv(container) {
        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#fde68a; margin-bottom:0.6rem;">${getTranslation('at_cog_title')}</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:820px; margin:0 auto 1.8rem; line-height:1.6;">
                ${getTranslation('at_cog_lead')}
            </p>

            <!-- VISUEL KONTRAST: 2 SEPARATE BILLEDER VS. BILLEDE-I-BILLEDE -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
                <!-- Kort A: To separate billeder -->
                <div style="background:#0f172a; border:2px solid #38bdf8; border-radius:18px; padding:1.5rem;">
                    <div style="display:inline-block; background:rgba(56,189,248,0.15); color:#7dd3fc; border:1px solid #38bdf8; padding:0.25rem 0.75rem; border-radius:8px; font-size:0.8rem; font-weight:800; margin-bottom:0.8rem;">
                        ${getTranslation('at_cog_card_a_badge')}
                    </div>
                    <h4 style="color:white; margin:0 0 1rem; font-size:1.15rem;">${getTranslation('at_cog_card_a_title')}</h4>
                    <div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem; margin-bottom:1rem; flex-wrap:wrap;">
                        <div style="flex:1; background:#1e293b; border:2px solid #22c55e; border-radius:12px; padding:0.9rem; text-align:center;">
                            <div style="font-size:1.4rem;">🌧️🖼️ 1</div>
                            <div style="font-weight:800; color:#86efac; font-size:0.95rem;">"Jeg har travlt onsdag"</div>
                            <div style="font-size:0.75rem; color:#94a3b8;">${getTranslation('at_cog_card_a_img1_label')}</div>
                        </div>
                        <div style="background:#0284c7; color:white; font-weight:900; padding:0.5rem 0.8rem; border-radius:10px; font-size:0.95rem;">
                            ➔ SÅ / DERFOR ➔
                        </div>
                        <div style="flex:1; background:#1e293b; border:2px solid #22c55e; border-radius:12px; padding:0.9rem; text-align:center;">
                            <div style="font-size:1.4rem;">🎬🖼️ 2</div>
                            <div style="font-weight:800; color:#86efac; font-size:0.95rem;">"jeg tager i biografen torsdag"</div>
                            <div style="font-size:0.75rem; color:#94a3b8;">${getTranslation('at_cog_card_a_img2_label')}</div>
                        </div>
                    </div>
                    <p style="color:#94a3b8; font-size:0.92rem; line-height:1.5; margin:0;">
                        ${getTranslation('at_cog_card_a_desc')}
                    </p>
                </div>

                <!-- Kort B: Billede-i-billede (AT = Tankeboblen / Billedrammen) -->
                <div style="background:#0f172a; border:2px solid #f59e0b; border-radius:18px; padding:1.5rem; box-shadow:0 0 25px rgba(245,158,11,0.18);">
                    <div style="display:inline-block; background:rgba(245,158,11,0.2); color:#fde68a; border:1px solid #f59e0b; padding:0.25rem 0.75rem; border-radius:8px; font-size:0.8rem; font-weight:800; margin-bottom:0.8rem;">
                        ${getTranslation('at_cog_card_b_badge')}
                    </div>
                    <h4 style="color:white; margin:0 0 1rem; font-size:1.15rem;">${getTranslation('at_cog_card_b_title')}</h4>
                    <!-- Ydre ramme: Billede 1 -->
                    <div style="background:#1e293b; border:2px solid #22c55e; border-radius:16px; padding:1rem; position:relative;">
                        <div style="display:flex; align-items:center; gap:0.8rem; flex-wrap:wrap;">
                            <div style="text-align:center; min-width:110px;">
                                <div style="font-size:1.6rem;">🧑💭</div>
                                <div style="font-weight:900; color:#86efac; font-size:1.05rem;">"Jeg tror, ..."</div>
                                <div style="font-size:0.73rem; color:#94a3b8;">${getTranslation('at_cog_card_b_frame_label')}</div>
                            </div>
                            <!-- Indre Tankeboble med AT som selve rammen -->
                            <div style="flex:1; background:rgba(245,158,11,0.12); border:3px dashed #f59e0b; border-radius:18px; padding:0.9rem; position:relative;">
                                <div style="position:absolute; top:-12px; left:14px; background:#d97706; color:white; font-weight:900; font-size:0.78rem; padding:0.15rem 0.6rem; border-radius:6px;">
                                    ${getTranslation('at_cog_card_b_bubble_badge')}
                                </div>
                                <div style="font-weight:800; color:#fde68a; font-size:1rem; margin-top:0.3rem; text-align:center;">
                                    "... <span style="text-decoration:underline; color:#fbbf24;">at</span> [jeg <span style="color:#22d3ee;">hellere</span> <span style="color:#fca5a5;">vil</span> i biografen på torsdag]"
                                </div>
                                <div style="font-size:0.76rem; color:#cbd5e1; text-align:center; margin-top:0.3rem;">
                                    ${getTranslation('at_cog_card_b_bubble_note')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p style="color:#fde68a; font-size:0.92rem; line-height:1.5; margin:0.9rem 0 0;">
                        ${getTranslation('at_cog_card_b_aha')}
                    </p>
                </div>
            </div>

            <!-- DET-TESTEN & HVORFOR "HELLERE / IKKE" FLYTTER PLADS -->
            <div style="background:#0f172a; border-radius:18px; padding:1.6rem; border-left:5px solid #06b6d4; margin-bottom:1.8rem;">
                <h3 style="color:#67e8f9; margin:0 0 0.8rem; font-size:1.25rem;">${getTranslation('at_cog_det_title')}</h3>
                <p style="color:#cbd5e1; line-height:1.6; margin-bottom:1rem;">
                    ${getTranslation('at_cog_det_desc')}
                </p>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr)); gap:1rem; margin-bottom:1rem;">
                    <div style="background:#1e293b; padding:1.1rem; border-radius:12px; border:1px solid rgba(255,255,255,0.1);">
                        <div style="color:#94a3b8; font-size:0.8rem; font-weight:800; text-transform:uppercase;">${getTranslation('at_cog_det_box1_title')}</div>
                        <div style="font-size:1.15rem; font-weight:800; color:white; margin:0.5rem 0;">
                            "Jeg <span style="color:#fca5a5;">vil</span> <span style="color:#22d3ee;">hellere</span> i biografen på torsdag."
                        </div>
                        <div style="font-size:0.85rem; color:#cbd5e1;">${getTranslation('at_cog_det_box1_desc')}</div>
                    </div>
                    <div style="background:#1e293b; padding:1.1rem; border-radius:12px; border:2px solid #f59e0b;">
                        <div style="color:#fde68a; font-size:0.8rem; font-weight:800; text-transform:uppercase;">${getTranslation('at_cog_det_box2_title')}</div>
                        <div style="font-size:1.15rem; font-weight:800; color:white; margin:0.5rem 0;">
                            "Jeg tror, <span style="color:#fbbf24; text-decoration:underline;">at</span> [jeg <span style="color:#22d3ee;">hellere</span> <span style="color:#fca5a5;">vil</span> i biografen på torsdag]."
                        </div>
                        <div style="font-size:0.85rem; color:#fde68a;">${getTranslation('at_cog_det_box2_desc')}</div>
                    </div>
                </div>
                <button class="inspector-speak-btn" id="speak-bio-cognitive">
                    <span>🔊</span> Lyt til eksemplet: "Jeg tror, at jeg hellere vil i biografen på torsdag"
                </button>
            </div>

            <!-- DE 4 KOGNITIVE BILLEDER FOR ALLE TYPER "AT" -->
            <h3 style="text-align:center; color:#fde68a; margin:1.5rem 0 1rem;">${getTranslation('at_cog_4types_title')}</h3>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem;">
                <div style="background:#0f172a; border-top:4px solid #22c55e; border-radius:14px; padding:1.1rem;">
                    <div style="font-size:1.6rem; margin-bottom:0.3rem;">💭📦</div>
                    <div style="font-weight:900; color:#86efac; margin-bottom:0.3rem;">${getTranslation('at_cog_type1_title')}</div>
                    <div style="font-size:0.85rem; color:#cbd5e1; line-height:1.45;">
                        ${getTranslation('at_cog_type1_desc')}
                    </div>
                </div>
                <div style="background:#0f172a; border-top:4px solid #f59e0b; border-radius:14px; padding:1.1rem;">
                    <div style="font-size:1.6rem; margin-bottom:0.3rem;">🏹🎯</div>
                    <div style="font-weight:900; color:#fde68a; margin-bottom:0.3rem;">${getTranslation('at_cog_type2_title')}</div>
                    <div style="font-size:0.85rem; color:#cbd5e1; line-height:1.45;">
                        ${getTranslation('at_cog_type2_desc')}
                    </div>
                </div>
                <div style="background:#0f172a; border-top:4px solid #ef4444; border-radius:14px; padding:1.1rem;">
                    <div style="font-size:1.6rem; margin-bottom:0.3rem;">⚡🚗</div>
                    <div style="font-weight:900; color:#fca5a5; margin-bottom:0.3rem;">3. Den Indre Motor (Ingen "at"!)</div>
                    <div style="font-size:0.85rem; color:#cbd5e1; line-height:1.45;">
                        <strong>Modalverber (kan, vil, skal)</strong> sidder direkte på motoren uden afstand – derfor ingen pil:<br>
                        <em style="color:#fca5a5;">"Jeg <strong>vil gå</strong> i biografen."</em>
                    </div>
                </div>
                <div style="background:#0f172a; border-top:4px solid #a855f7; border-radius:14px; padding:1.1rem;">
                    <div style="font-size:1.6rem; margin-bottom:0.3rem;">🧭🔗</div>
                    <div style="font-weight:900; color:#d8b4fe; margin-bottom:0.3rem;">${getTranslation('at_cog_type3_title')}</div>
                    <div style="font-size:0.85rem; color:#cbd5e1; line-height:1.45;">
                        ${getTranslation('at_cog_type3_desc')}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = '';
        container.appendChild(card);

        const speakBioBtn = card.querySelector('#speak-bio-cognitive');
        if (speakBioBtn) {
            speakBioBtn.onclick = () => speakDanish('Jeg tror, at jeg hellere vil i biografen på torsdag.');
        }
    }

    function renderRoentgenSub1(container) {
        const demos = {
            haaber: {
                label: 'Jeg håber...',
                samme: {
                    title: '1️⃣ SAMME PERSON (Kun "Jeg") ➔ Infinitivmærket "at" + Infinitiv!',
                    tokens: [
                        { role: 'Subjekt + Verbum', word: 'Jeg håber', color: '#22c55e' },
                        { role: 'Infinitivmærke', word: 'at', color: '#f59e0b' },
                        { role: 'Infinitiv (Uden subjekt!)', word: 'komme', color: '#ef4444' },
                        { role: 'Restled', word: 'til festen.', color: '#0ea5e9' }
                    ],
                    note: 'Når det er "Jeg", der både håber og kommer, behøver vi intet nyt subjekt: "at" + infinitiv ("at komme").'
                },
                nyt: {
                    title: '2️⃣ NY PERSON ("Jeg" + "du") ➔ Konjunktionen "at" + Ledsætning!',
                    tokens: [
                        { role: 'Hovedsætning', word: 'Jeg håber,', color: '#22c55e' },
                        { role: 'Ledsætningskonj.', word: 'at', color: '#f59e0b' },
                        { role: 'Nyt Subjekt + (ikke)', word: 'du ikke', color: '#06b6d4' },
                        { role: 'Finit Verbum', word: 'kommer for sent.', color: '#ef4444' }
                    ],
                    note: 'Når person 1 ("Jeg") håber noget om person 2 ("du"), bliver "at" en ledsætningskonjunktion med Subjekt + (ikke) + Verbum!'
                }
            },
            glad_for: {
                label: 'Jeg er glad for...',
                samme: {
                    title: '1️⃣ SAMME PERSON (Kun "Jeg") ➔ glad for at + Infinitiv!',
                    tokens: [
                        { role: 'Subjekt + Præp.', word: 'Jeg er glad for', color: '#22c55e' },
                        { role: 'Infinitivmærke', word: 'at', color: '#f59e0b' },
                        { role: 'Infinitiv', word: 'bo', color: '#ef4444' },
                        { role: 'Sted', word: 'i Danmark.', color: '#0ea5e9' }
                    ],
                    note: 'Jeg er glad + jeg bor i Danmark ➔ "glad for at bo i Danmark" (Infinitiv).'
                },
                nyt: {
                    title: '2️⃣ NY PERSON ("Jeg" + "du") ➔ glad for, at + Ledsætning!',
                    tokens: [
                        { role: 'Subjekt + Præp.', word: 'Jeg er glad for,', color: '#22c55e' },
                        { role: 'Ledsætningskonj.', word: 'at', color: '#f59e0b' },
                        { role: 'Nyt Subjekt', word: 'du', color: '#22c55e' },
                        { role: 'Finit Verbum', word: 'bor i Danmark.', color: '#ef4444' }
                    ],
                    note: 'Jeg er glad + du bor i Danmark ➔ "glad for, at du bor i Danmark" (Ledsætning).'
                }
            },
            for_at_fordi: {
                label: 'Formål (for at) vs. Årsag (fordi)...',
                samme: {
                    title: '1️⃣ FORMÅL med samme person ➔ "for at" + Infinitiv!',
                    tokens: [
                        { role: 'Hovedsætning', word: 'Hun sparer op', color: '#22c55e' },
                        { role: 'Formåls-bindeord', word: 'for at', color: '#f59e0b' },
                        { role: 'Infinitiv', word: 'købe', color: '#ef4444' },
                        { role: 'Objekt', word: 'en ny cykel.', color: '#0ea5e9' }
                    ],
                    note: 'Efter "for at" kommer der ALTID en infinitiv ("købe") uden subjekt!'
                },
                nyt: {
                    title: '2️⃣ ÅRSAG med subjekt og modalverbum ➔ "fordi" + Ledsætning!',
                    tokens: [
                        { role: 'Hovedsætning', word: 'Hun sparer op,', color: '#22c55e' },
                        { role: 'Ledsætningskonj.', word: 'fordi', color: '#06b6d4' },
                        { role: 'Subjekt', word: 'hun', color: '#22c55e' },
                        { role: 'Finit Verbum', word: 'vil købe en ny cykel.', color: '#ef4444' }
                    ],
                    note: 'Hvis du nævner subjektet ("hun vil købe"), skal du bruge "fordi" – man kan ikke sige *"for at hun køber" i hverdagsdansk!'
                }
            }
        };

        const cur = demos[selectedVerbDemo];
        const side = cur[selectedSubjMode];

        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#fde68a; margin-bottom:0.5rem;">🔍 Samme Person (Infinitiv) vs. Ny Person (Ledsætning)</h2>
            <h2 style="text-align:center; color:#fde68a; margin-bottom:0.5rem;">${getTranslation('at_sub1_title')}</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:780px; margin:0 auto 1.2rem;">
                ${getTranslation('at_sub1_desc')}
            </p>
            <div class="word-selector-grid">
                ${Object.keys(demos).map(k => `
                    <button class="word-sel-btn ${selectedVerbDemo === k ? 'active' : ''}" data-vdemo="${k}">
                        ${demos[k].label}
                    </button>
                `).join('')}
            </div>

            <div style="display:flex; gap:1rem; justify-content:center; margin:1.5rem 0; flex-wrap:wrap;">
                <button class="word-sel-btn ${selectedSubjMode === 'samme' ? 'active' : ''}" id="btn-subj-samme" style="min-width:260px;">
                    1️⃣ Samme person (AT + Infinitiv)
                </button>
                <button class="word-sel-btn ${selectedSubjMode === 'nyt' ? 'active' : ''}" id="btn-subj-nyt" style="min-width:260px;">
                    2️⃣ Ny person / Ledsætning (AT + Subjekt + Verbum)
                </button>
            </div>

            <div style="background:#0f172a; border-radius:16px; padding:1.8rem; border:2px solid #f59e0b; text-align:center;">
                <h4 style="color:#fde68a; margin:0 0 1rem;">${side.title}</h4>
                <div class="syntax-boxes-row">
                    ${side.tokens.map(t => `
                        <div class="syntax-token-box" style="border-color:${t.color};">
                            <span class="syntax-token-role" style="color:${t.color};">${t.role}</span>
                            <span class="syntax-token-word">${t.word}</span>
                        </div>
                    `).join('')}
                </div>
                <p style="color:#cbd5e1; font-weight:700; margin:1rem auto; max-width:700px;">💡 ${side.note}</p>
                <button class="inspector-speak-btn" id="speak-sub1-btn">
                    <span>🔊</span> Lyt: "${side.tokens.map(t => t.word).join(' ')}"
                </button>
            </div>
        `;

        container.innerHTML = '';
        container.appendChild(card);

        card.querySelectorAll('[data-vdemo]').forEach(b => {
            b.onclick = () => {
                selectedVerbDemo = b.dataset.vdemo;
                renderRoentgenSub1(container);
            };
        });
        card.querySelector('#btn-subj-samme').onclick = () => {
            selectedSubjMode = 'samme';
            renderRoentgenSub1(container);
        };
        card.querySelector('#btn-subj-nyt').onclick = () => {
            selectedSubjMode = 'nyt';
            renderRoentgenSub1(container);
        };
        card.querySelector('#speak-sub1-btn').onclick = () => {
            speakDanish(side.tokens.map(t => t.word).join(' '));
        };
    }

    function renderRoentgenSub2(container) {
        const pairs = {
            kan: {
                modal: { title: '🚫 Modalverbum: KAN (Ingen "at"!)', sent: 'Jeg kan svømme 500 meter.', wrong: '❌ *Jeg kan at svømme' },
                alm: { title: '✅ Almindeligt verbum: ELSKER / PLEJER (Skal have "at"!)', sent: 'Jeg plejer at svømme 500 meter.', wrong: '❌ *Jeg plejer svømme' }
            },
            vil: {
                modal: { title: '🚫 Modalverbum: VIL (Ingen "at"!)', sent: 'Hun vil rejse til Spanien.', wrong: '❌ *Hun vil at rejse' },
                alm: { title: '✅ Almindeligt verbum: ØNSKER / HÅBER (Skal have "at"!)', sent: 'Hun ønsker at rejse til Spanien.', wrong: '❌ *Hun ønsker rejse' }
            },
            skal: {
                modal: { title: '🚫 Modalverbum: SKAL / MÅ (Ingen "at"!)', sent: 'Vi skal købe mælk på vejen hjem.', wrong: '❌ *Vi skal at købe' },
                alm: { title: '✅ Almindeligt verbum: HUSKER / BLIVER NØDT TIL (Skal have "at"!)', sent: 'Vi bliver nødt til at købe mælk.', wrong: '❌ *Vi husker købe' }
            }
        };

        const cur = pairs[selectedModalDemo];

        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#fde68a; margin-bottom:0.5rem;">${getTranslation('at_sub2_title')}</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:780px; margin:0 auto 1.2rem;">
                ${getTranslation('at_sub2_desc')}
            </p>
            <div class="word-selector-grid">
                <button class="word-sel-btn ${selectedModalDemo === 'kan' ? 'active' : ''}" data-md="kan">kan svømme ↔ plejer at svømme</button>
                <button class="word-sel-btn ${selectedModalDemo === 'vil' ? 'active' : ''}" data-md="vil">vil rejse ↔ ønsker at rejse</button>
                <button class="word-sel-btn ${selectedModalDemo === 'skal' ? 'active' : ''}" data-md="skal">skal købe ↔ bliver nødt til at købe</button>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.2rem; margin-top:1.5rem;">
                <div style="background:#0f172a; border-radius:16px; padding:1.6rem; border:2px solid #ef4444;">
                    <h4 style="color:#fca5a5; margin-top:0;">${cur.modal.title}</h4>
                    <div style="font-size:1.35rem; font-weight:900; color:white; margin:1rem 0;">"${cur.modal.sent}"</div>
                    <div style="color:#f87171; font-weight:700; margin-bottom:1rem;">${cur.modal.wrong}</div>
                    <button class="inspector-speak-btn" data-sp="${cur.modal.sent}">🔊 Lyt</button>
                </div>
                <div style="background:#0f172a; border-radius:16px; padding:1.6rem; border:2px solid #22c55e;">
                    <h4 style="color:#86efac; margin-top:0;">${cur.alm.title}</h4>
                    <div style="font-size:1.35rem; font-weight:900; color:white; margin:1rem 0;">"${cur.alm.sent}"</div>
                    <div style="color:#f87171; font-weight:700; margin-bottom:1rem;">${cur.alm.wrong}</div>
                    <button class="inspector-speak-btn" data-sp="${cur.alm.sent}">🔊 Lyt</button>
                </div>
            </div>
        `;

        container.innerHTML = '';
        container.appendChild(card);

        card.querySelectorAll('[data-md]').forEach(b => {
            b.onclick = () => {
                selectedModalDemo = b.dataset.md;
                renderRoentgenSub2(container);
            };
        });
        card.querySelectorAll('[data-sp]').forEach(b => {
            b.onclick = () => speakDanish(b.dataset.sp);
        });
    }

    function renderRoentgenSub3(container) {
        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#fde68a; margin-bottom:0.5rem;">${getTranslation('at_sub3_title')}</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:800px; margin:0 auto 1.5rem;">
                Her er de 5 mønstre, som gør det let at forklare og genkende ethvert <strong><em>at</em></strong> i en dansk tekst:
            </p>
            <div style="display:grid; gap:1rem;">
                <div style="background:#0f172a; padding:1.2rem 1.5rem; border-radius:14px; border-left:5px solid #22c55e;">
                    <strong style="color:#86efac; font-size:1.1rem;">${getTranslation('at_sub3_c1_title')}</strong>
                    <div style="color:#cbd5e1; margin-top:0.3rem;">${getTranslation('at_sub3_c1_desc')}</div>
                </div>
                <div style="background:#0f172a; padding:1.2rem 1.5rem; border-radius:14px; border-left:5px solid #f59e0b;">
                    <strong style="color:#fde68a; font-size:1.1rem;">${getTranslation('at_sub3_c2_title')}</strong>
                    <div style="color:#cbd5e1; margin-top:0.3rem;">${getTranslation('at_sub3_c2_desc')}</div>
                </div>
                <div style="background:#0f172a; padding:1.2rem 1.5rem; border-radius:14px; border-left:5px solid #06b6d4;">
                    <strong style="color:#67e8f9; font-size:1.1rem;">${getTranslation('at_sub3_c3_title')}</strong>
                    <div style="color:#cbd5e1; margin-top:0.3rem;">${getTranslation('at_sub3_c3_desc')}</div>
                </div>
                <div style="background:#0f172a; padding:1.2rem 1.5rem; border-radius:14px; border-left:5px solid #a855f7;">
                    <strong style="color:#d8b4fe; font-size:1.1rem;">${getTranslation('at_sub3_c4_title')}</strong>
                    <div style="color:#cbd5e1; margin-top:0.3rem;">${getTranslation('at_sub3_c4_desc')}</div>
                </div>
                <div style="background:#0f172a; padding:1.2rem 1.5rem; border-radius:14px; border-left:5px solid #ec4899;">
                    <strong style="color:#f472b6; font-size:1.1rem;">${getTranslation('at_sub3_c5_title')}</strong>
                    <div style="color:#cbd5e1; margin-top:0.3rem;">${getTranslation('at_sub3_c5_desc')}</div>
                </div>
            </div>
        `;
        container.innerHTML = '';
        container.appendChild(card);
    }

    // ==========================================
    // TAB 3: "AT"-DETEKTIVEN (10 GÅDER)
    // ==========================================
    const DETEKTIV_RIDDLES = [
        {
            tag: 'Gåde 1 • Ledsætnings-at vs. Infinitiv-at',
            prompt: 'Kig på ordene efter hullet: Der står "du allerede har" (Subjekt + Adverbium + Verbum). Hvilken konstruktion passer?',
            quote: '"Jeg er virkelig glad ______, at du allerede har fundet en ny lejlighed!"',
            options: ['for', 'til', 'ved'],
            correct: 'for',
            explanations: {
                'for': '🌟 Præcis! Det faste udtryk hedder "glad for, at + ledsætning".',
                'til': '"Til" bruges i "god til at" eller "glæder mig til at", ikke efter "glad".',
                'ved': '"Ved at" beskriver en metode.'
            }
        },
        {
            tag: 'Gåde 2 • Modalverbum-fælden!',
            prompt: 'Her står modalverbet "kan" lige før hovedverbet. Hvordan skal sætningen fortsætte?',
            quote: '"Jonas har gået til svømning i tre år, så nu kan han ______ 1.000 meter uden pause."',
            options: ['svømme', 'at svømme', 'svømmer'],
            correct: 'svømme',
            explanations: {
                'svømme': '🌟 Fuldstændig rigtigt! Efter modalverber (kan, skal, vil, må, bør, tør) må man ALDRIG bruge "at"!',
                'at svømme': 'Pas på! Efter "kan" er "at" forbudt på dansk.',
                'svømmer': 'Efter et modalverbum står næste verbum altid i infinitiv ("svømme"), ikke nutid.'
            }
        },
        {
            tag: 'Gåde 3 • "Plejer" kræver altid "at"!',
            prompt: 'Nu skifter vi modalverbet ud med vane-verbet "plejer". Hvad er rigtigt nu?',
            quote: '"Om søndagen plejer vi altid ______ rundstykker hos bageren."',
            options: ['at købe', 'købe', 'køber'],
            correct: 'at købe',
            explanations: {
                'at købe': '🌟 Lige i øjet! "Plejer" er ikke et modalverbum, så det SKAL altid følges af "at + infinitiv"!',
                'købe': 'Man kan ikke udelade "at" efter "plejer".',
                'køber': 'Efter "plejer at" står verbet i infinitiv.'
            }
        },
        {
            tag: 'Gåde 4 • Formål (for at) vs. Årsag (fordi)',
            prompt: 'Kig på det, der kommer efter hullet: Der står kun en infinitiv ("forbedre") uden subjekt! Hvad skal vi vælge?',
            quote: '"Maria ser danske film med undertekster ______ forbedre sit ordforråd."',
            options: ['for at', 'fordi', 'så at'],
            correct: 'for at',
            explanations: {
                'for at': '🌟 Skarpt set! Når vi udtrykker et FORMÅL efterfulgt af en infinitiv uden subjekt ("forbedre"), bruger vi altid "for at"!',
                'fordi': '"Fordi" kræver en hel ledsætning med subjekt og finit verbum ("... fordi hun vil forbedre...").',
                'så at': '"Så at" kræver også subjekt og finit verbum.'
            }
        },
        {
            tag: 'Gåde 5 • Formål med "fordi" + Ledsætning',
            prompt: 'Nu står der "hun gerne vil forbedre" (Subjekt + Adverbium + Verbum) efter hullet! Hvad vælger vi så?',
            quote: '"Maria ser danske film med undertekster, ______ hun gerne vil forbedre sit ordforråd."',
            options: ['fordi', 'for at', 'ved at'],
            correct: 'fordi',
            explanations: {
                'fordi': '🌟 Korrekt! Så snart der følger et subjekt og et bøjet verbum ("hun gerne vil..."), bruger vi ledsætningskonjunktionen "fordi"!',
                'for at': '"For at" bruges kun foran infinitiv uden subjekt ("for at forbedre").',
                'ved at': '"Ved at" bruges kun foran infinitiv ("ved at se film").'
            }
        },
        {
            tag: 'Gåde 6 • Et uheld i køkkenet!',
            prompt: 'Det var slet ikke med vilje, men drengen tabte skålen på gulvet ved et uheld:',
            quote: '"Undskyld! Jeg ______ tabe skålen på køkkengulvet – det var ikke med vilje!"',
            options: ['kom til at', 'gik til at', 'fik til at'],
            correct: 'kom til at',
            explanations: {
                'kom til at': '🌟 Perfekt! "At komme til at + infinitiv" er det faste danske udtryk for at gøre noget ved et uheld.',
                'gik til at': 'Dette udtryk findes ikke på dansk.',
                'fik til at': '"Få nogen til at gøre noget" betyder at overtale eller påvirke en anden.'
            }
        },
        {
            tag: 'Gåde 7 • Metode og middel ("by doing")',
            prompt: 'Hvordan lærte han at bage så godt brød? Gennem hvilken metode?',
            quote: '"Han lærte at bage surdejsbrød ______ følge kokkens opskrift trin for trin."',
            options: ['ved at', 'uden at', 'for at'],
            correct: 'ved at',
            explanations: {
                'ved at': '🌟 Rigtigt! "Ved at + infinitiv" forklarer metoden eller midlet ("by following the recipe").',
                'uden at': '"Uden at" ville betyde, at han slet ikke brugte opskriften.',
                'for at': '"For at" udtrykker målet, ikke metoden.'
            }
        },
        {
            tag: 'Gåde 8 • Ordstilling i en "at"-ledsætning!',
            prompt: 'Husk reglen for ledsætninger! Hvordan skal ordene stå efter "Han siger, at..."?',
            quote: '"Han har lige ringet og sagt, at ______ i dag."',
            options: ['han ikke kan komme', 'han kan ikke komme', 'kan han ikke komme'],
            correct: 'han ikke kan komme',
            explanations: {
                'han ikke kan komme': '🌟 Lige i skabet! Konjunktionen "at" indleder en ledsætning, så "ikke" SKAL stå FØR verbet ("han ikke kan komme")!',
                'han kan ikke komme': 'Det er helsætningsordstilling ("kan ikke"). I en "at"-ledsætning rykker "ikke" frem foran verbet.',
                'kan han ikke komme': 'Der er aldrig spørgende inversion inde i en "at"-ledsætning.'
            }
        },
        {
            tag: 'Gåde 9 • Grad & Konsekvens ("så ... at")',
            prompt: 'Kaffen er meget varm, og konsekvensen er, at hun må vente lidt:',
            quote: '"Kaffen er ______ varm, at jeg ikke kan drikke den endnu."',
            options: ['så', 'for', 'meget'],
            correct: 'så',
            explanations: {
                'så': '🌟 Præcis! Konstruktionen hedder "så + adjektiv + , at + ledsætning" ("så varm, at...").',
                'for': '"For varm" bruges med "til at" ("Kaffen er for varm til at drikke"), ikke med ", at".',
                'meget': '"Meget varm" kan ikke binde en "at"-ledsætning på uden "så".'
            }
        },
        {
            tag: 'Gåde 10 • "For varm til at..." vs. "Så varm, at..."',
            prompt: 'Se forskellen! Her står der "for varm" i stedet for "så varm", og bagefter følger en infinitiv ("drikke"):',
            quote: '"Kaffen er desværre alt for varm ______ drikke lige nu."',
            options: ['til at', 'for at', 'om at'],
            correct: 'til at',
            explanations: {
                'til at': '🌟 Super vigtig detalje! Efter "for + adjektiv" ("for varm, for dyr, for tung") bruger man altid "til at + infinitiv" ("for varm til at drikke")!',
                'for at': '"For at" bruges ikke efter "alt for + adjektiv".',
                'om at': '"Om at" bruges efter verber som "drømme om at" eller "aftale om at".'
            }
        }
    ];

    let detektivIdx = 0;
    let detektivScore = 0;

    function renderTabDetektiv(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'detektiv-container';

        if (detektivIdx >= DETEKTIV_RIDDLES.length) {
            container.innerHTML = `
                <div class="score-celebration-card">
                    <div style="font-size:3.5rem; margin-bottom:1rem;">🕵️‍♂️🌟</div>
                    <h2 style="color:#fde68a; font-size:2rem; margin-bottom:0.5rem;">"AT"-Detektiven Gennemført!</h2>
                    <p style="font-size:1.2rem; color:#cbd5e1; margin-bottom:1.5rem;">
                        Du løste <strong>${detektivScore} ud af ${DETEKTIV_RIDDLES.length}</strong> gåder om "at"-konstruktionerne!
                    </p>
                    <button class="action-btn-primary" id="restart-detektiv">🔄 Prøv gåderne igen</button>
                </div>
            `;
            parent.appendChild(container);
            container.querySelector('#restart-detektiv').onclick = () => {
                detektivIdx = 0;
                detektivScore = 0;
                renderTabDetektiv(parent);
            };
            return;
        }

        const r = DETEKTIV_RIDDLES[detektivIdx];
        const pct = Math.round((detektivIdx / DETEKTIV_RIDDLES.length) * 100);

        container.innerHTML = `
            <div class="progress-header">
                <span>🔍 "AT"-DETEKTIVEN: GÅDE ${detektivIdx + 1} AF ${DETEKTIV_RIDDLES.length}</span>
                <span>Score: ${detektivScore} / ${detektivIdx}</span>
            </div>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width:${pct}%;"></div>
            </div>

            <div class="detektiv-card">
                <div class="detektiv-context-tag">${r.tag}</div>
                <div class="detektiv-prompt-text">${r.prompt}</div>
                <div class="detektiv-sentence-quote" id="det-quote">${r.quote}</div>

                <div class="detektiv-options-grid" id="det-opts"></div>
                <div class="detektiv-feedback-box" id="det-feedback"></div>

                <div style="text-align:right; margin-top:1.5rem; display:none;" id="det-next-wrap">
                    <button class="action-btn-primary" id="det-next-btn">Næste gåde ➔</button>
                </div>
            </div>
        `;

        const optsGrid = container.querySelector('#det-opts');
        const fbBox = container.querySelector('#det-feedback');
        const nextWrap = container.querySelector('#det-next-wrap');
        let answered = false;

        r.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'detektiv-opt-btn';
            btn.textContent = opt;
            btn.onclick = () => {
                if (answered) return;
                const isCorrect = opt === r.correct;
                if (isCorrect) {
                    answered = true;
                    detektivScore++;
                    btn.classList.add('correct');
                    const filledQuote = r.quote.replace('______', `<span style="color:#4ade80; text-decoration:underline;">${opt}</span>`);
                    container.querySelector('#det-quote').innerHTML = filledQuote;
                    fbBox.className = 'detektiv-feedback-box show correct';
                    fbBox.innerHTML = `<strong>${r.explanations[opt]}</strong>`;
                    nextWrap.style.display = 'block';
                    speakDanish(r.quote.replace('______', opt).replace(/"/g, ''));
                } else {
                    btn.classList.add('wrong');
                    fbBox.className = 'detektiv-feedback-box show wrong';
                    fbBox.innerHTML = `<strong>Prøv igen:</strong> ${r.explanations[opt]}`;
                }
            };
            optsGrid.appendChild(btn);
        });

        container.querySelector('#det-next-btn').onclick = () => {
            detektivIdx++;
            renderTabDetektiv(parent);
        };

        parent.appendChild(container);
    }

    // ==========================================
    // TAB 4: SÆTNINGSBYGGEREN & PUSLESPILLET
    // ==========================================
    const BUILDER_EXERCISES = [
        {
            modeLabel: '1️⃣ Ledsætnings-at: subjekt + ikke + verbum',
            context: 'Byg ledsætningen efter "Hun siger," (Husk: i en "at"-ledsætning står "ikke" FØR verbet!)',
            displayTemplate: 'Hun siger, [BLANK] hun ikke kommer for sent.',
            options: ['at', 'for at', 'til at'],
            correctWord: 'at',
            step1Explain: 'Rigtigt! Efter "siger" kommer konjunktionen "at" efterfulgt af Subjekt ("hun") + "ikke" + Verbum ("kommer")!',
            slots: [
                { role: 'konj', label: '1. Konjunktion', expected: 'at' },
                { role: 'subjekt', label: '2. Subjekt', expected: 'hun' },
                { role: 'adverbium', label: '3. Adverbium (FØR!)', expected: 'ikke' },
                { role: 'verbum', label: '4. Verbum + Rest', expected: 'kommer for sent.' }
            ]
        },
        {
            modeLabel: '2️⃣ Præposition + at + infinitiv (samme person)',
            context: 'Byg sætningen: Kokken er dygtig til en færdighed ("god til at bage")',
            displayTemplate: 'Kokken er [BLANK] bage frisk brød.',
            options: ['god til at', 'god for at', 'god om at'],
            correctWord: 'god til at',
            step1Explain: 'Flot! Udtrykket hedder "god til at" + Infinitiv ("bage")!',
            slots: [
                { role: 'subjekt', label: '1. Subjekt + Verbum', expected: 'Kokken er' },
                { role: 'konj', label: '2. Adjektiv + Præp. + at', expected: 'god til at' },
                { role: 'verbum', label: '3. Infinitiv', expected: 'bage' },
                { role: 'rest', label: '4. Objekt', expected: 'frisk brød.' }
            ]
        },
        {
            modeLabel: '3️⃣ Præposition + , at + ledsætning (ny person)',
            context: 'Byg sætningen: Jeg er glad + du ikke gik tidligt ("glad for, at du ikke gik")',
            displayTemplate: 'Jeg er [BLANK] du ikke gik tidligt.',
            options: ['glad for, at', 'glad til, at', 'glad ved, at'],
            correctWord: 'glad for, at',
            step1Explain: 'Præcis! Når der kommer et nyt subjekt ("du"), bruger vi "glad for, at" + Subjekt ("du") + "ikke" + Verbum!',
            slots: [
                { role: 'konj', label: '1. Præp. + , at', expected: 'glad for, at' },
                { role: 'subjekt', label: '2. Nyt Subjekt', expected: 'du' },
                { role: 'adverbium', label: '3. Adverbium (FØR!)', expected: 'ikke' },
                { role: 'verbum', label: '4. Verbum + Rest', expected: 'gik tidligt.' }
            ]
        },
        {
            modeLabel: '4️⃣ Formål: "for at" + infinitiv (uden subjekt!)',
            context: 'Byg formålet: Hvorfor sparer pigen penge op?',
            displayTemplate: 'Hun sparer op [BLANK] købe en ny cykel.',
            options: ['for at', 'fordi', 'ved at'],
            correctWord: 'for at',
            step1Explain: 'Korrekt! "For at" udtrykker formål og følges direkte af infinitiv ("købe")!',
            slots: [
                { role: 'subjekt', label: '1. Hovedsætning', expected: 'Hun sparer op' },
                { role: 'konj', label: '2. Formåls-bindeord', expected: 'for at' },
                { role: 'verbum', label: '3. Infinitiv', expected: 'købe' },
                { role: 'rest', label: '4. Objekt', expected: 'en ny cykel.' }
            ]
        },
        {
            modeLabel: '5️⃣ Metode: "ved at" + infinitiv',
            context: 'Byg metoden: Hvordan træner han sin udtale?',
            displayTemplate: 'Han træner udtale [BLANK] tale i mikrofonen.',
            options: ['ved at', 'for at', 'uden at'],
            correctWord: 'ved at',
            step1Explain: 'Super! "Ved at" ("by doing") viser metoden efterfulgt af infinitiv ("tale")!',
            slots: [
                { role: 'subjekt', label: '1. Hovedsætning', expected: 'Han træner udtale' },
                { role: 'konj', label: '2. Metode-bindeord', expected: 'ved at' },
                { role: 'verbum', label: '3. Infinitiv', expected: 'tale' },
                { role: 'rest', label: '4. Sted', expected: 'i mikrofonen.' }
            ]
        },
        {
            modeLabel: '6️⃣ Uheld i hverdagen: "kom til at" + infinitiv',
            context: 'Byg uheldet: Han væltede melet uden vilje',
            displayTemplate: 'Han [BLANK] spilde mel på gulvet.',
            options: ['kom til at', 'gik til at', 'var til at'],
            correctWord: 'kom til at',
            step1Explain: 'Lige i øjet! "Kom til at" + infinitiv beskriver et uheld!',
            slots: [
                { role: 'subjekt', label: '1. Subjekt', expected: 'Han' },
                { role: 'konj', label: '2. Uhelds-konstruktion', expected: 'kom til at' },
                { role: 'verbum', label: '3. Infinitiv', expected: 'spilde' },
                { role: 'rest', label: '4. Objekt + Sted', expected: 'mel på gulvet.' }
            ]
        },
        {
            modeLabel: '7️⃣ Konsekvens: "så varm, at" + ledsætning',
            context: 'Byg konsekvens-ledsætningen efter "Kaffen er så varm," (Husk: "ikke" FØR verbet!)',
            displayTemplate: 'Kaffen er [BLANK] hun ikke kan drikke den.',
            options: ['så varm, at', 'for varm, at', 'meget varm, at'],
            correctWord: 'så varm, at',
            step1Explain: 'Rigtigt! Efter "så varm, at" følger en ledsætning med Subjekt ("hun") + "ikke" + Verbum ("kan drikke")!',
            slots: [
                { role: 'konj', label: '1. Grad + , at', expected: 'så varm, at' },
                { role: 'subjekt', label: '2. Subjekt', expected: 'hun' },
                { role: 'adverbium', label: '3. Adverbium (FØR!)', expected: 'ikke' },
                { role: 'verbum', label: '4. Verbum + Objekt', expected: 'kan drikke den.' }
            ]
        },
        {
            modeLabel: '8️⃣ Fravær: "uden at" + infinitiv',
            context: 'Byg sætningen: Han listede ud ad døren uden en lyd',
            displayTemplate: 'Han gik [BLANK] sige farvel til nogen.',
            options: ['uden at', 'ved at', 'for at'],
            correctWord: 'uden at',
            step1Explain: 'Perfekt! "Uden at" + infinitiv ("sige")!',
            slots: [
                { role: 'subjekt', label: '1. Hovedsætning', expected: 'Han gik' },
                { role: 'konj', label: '2. Fraværs-bindeord', expected: 'uden at' },
                { role: 'verbum', label: '3. Infinitiv', expected: 'sige' },
                { role: 'rest', label: '4. Restled', expected: 'farvel til nogen.' }
            ]
        }
    ];

    let builderIdx = 0;
    let builderPhase = 1;
    let placedSlots = [];

    function renderTabBuilder(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'builder-container';

        if (builderIdx >= BUILDER_EXERCISES.length) {
            container.innerHTML = `
                <div class="score-celebration-card">
                    <div style="font-size:3.5rem; margin-bottom:1rem;">🧩🌟</div>
                    <h2 style="color:#fde68a; font-size:2rem; margin-bottom:0.5rem;">"AT"-Sætningsbyggeren Gennemført!</h2>
                    <p style="font-size:1.15rem; color:#cbd5e1; margin-bottom:1.5rem;">
                        Du har bygget alle typer af sætninger med <strong><em>at</em></strong> – både med infinitiv og med ledsætningsordstilling!
                    </p>
                    <button class="action-btn-primary" id="restart-builder">🔄 Byg sætningerne igen</button>
                </div>
            `;
            parent.appendChild(container);
            container.querySelector('#restart-builder').onclick = () => {
                builderIdx = 0;
                builderPhase = 1;
                placedSlots = [];
                renderTabBuilder(parent);
            };
            return;
        }

        const ex = BUILDER_EXERCISES[builderIdx];
        const pct = Math.round((builderIdx / BUILDER_EXERCISES.length) * 100);

        const card = document.createElement('div');
        card.className = 'builder-card';

        const flowHtml = ex.slots.map((s, i) => `
            <div class="flow-step flow-${s.role}">
                <div class="flow-step-num">LED ${i + 1}</div>
                <div class="flow-step-title">${s.label.replace(/^\d+\.\s*/, '')}</div>
            </div>
        `).join('');

        const displaySentenceHtml = ex.displayTemplate.replace(
            '[BLANK]',
            builderPhase === 1
                ? `<span class="sb-blank-slot">?</span>`
                : `<span class="sb-blank-slot filled">${ex.correctWord}</span>`
        );

        card.innerHTML = `
            <div class="progress-header">
                <span>🧩 "AT"-SÆTNINGSBYGGEREN: OPGAVE ${builderIdx + 1} AF ${BUILDER_EXERCISES.length}</span>
                <span>${ex.modeLabel}</span>
            </div>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width:${pct}%;"></div>
            </div>

            <div class="flow-container">${flowHtml}</div>

            <div style="color:#fde68a; font-weight:700; margin-bottom:0.8rem; text-align:center;">
                ${ex.context}
            </div>

            <div class="sb-sentence-display">${displaySentenceHtml}</div>

            <div id="builder-interactive-stage"></div>
        `;

        const stage = card.querySelector('#builder-interactive-stage');

        if (builderPhase === 1) {
            stage.innerHTML = `
                <div style="text-align:center; margin-bottom:1rem;">
                    <span class="builder-step-badge">TRIN 1: VÆLG DEN RIGTIGE "AT"-KONSTRUKTION</span>
                </div>
                <div class="detektiv-options-grid" id="sb-step1-opts"></div>
                <div class="detektiv-feedback-box" id="sb-step1-fb"></div>
            `;

            const optsDiv = stage.querySelector('#sb-step1-opts');
            const fbDiv = stage.querySelector('#sb-step1-fb');

            ex.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'detektiv-opt-btn';
                btn.textContent = opt;
                btn.onclick = () => {
                    if (opt === ex.correctWord) {
                        btn.classList.add('correct');
                        fbDiv.className = 'detektiv-feedback-box show correct';
                        fbDiv.innerHTML = `
                            <strong>🌟 ${ex.step1Explain}</strong>
                            <div style="margin-top:1rem;">
                                <button class="action-btn-primary" id="go-step-2">Gå til Trin 2: Saml sætningsleddene 🧩 ➔</button>
                            </div>
                        `;
                        fbDiv.querySelector('#go-step-2').onclick = () => {
                            builderPhase = 2;
                            placedSlots = [];
                            renderTabBuilder(parent);
                        };
                    } else {
                        btn.classList.add('wrong');
                        fbDiv.className = 'detektiv-feedback-box show wrong';
                        fbDiv.innerHTML = `<strong>Prøv igen:</strong> Se på hvilke ord der kommer efter hullet.`;
                    }
                };
                optsDiv.appendChild(btn);
            });
        } else {
            const currentSlotIdx = placedSlots.length;
            const isComplete = currentSlotIdx >= ex.slots.length;

            stage.innerHTML = `
                <div style="text-align:center; margin-bottom:1rem;">
                    <span class="builder-step-badge">TRIN 2: BYG SÆTNINGEN LED FOR LED</span>
                </div>
                <div class="sb-puzzle-slots" id="sb-slots-row"></div>
                <div class="sb-puzzle-chips" id="sb-chips-row"></div>
                <div class="detektiv-feedback-box" id="sb-step2-fb"></div>
            `;

            const slotsRow = stage.querySelector('#sb-slots-row');
            ex.slots.forEach((slotDef, idx) => {
                const filledVal = placedSlots[idx];
                const slotEl = document.createElement('div');
                slotEl.className = `sb-puzzle-slot slot-${slotDef.role} ${filledVal ? 'filled' : ''}`;
                slotEl.innerHTML = `
                    <div class="slot-badge-callout callout-${slotDef.role}">${slotDef.label}</div>
                    <div style="font-size:1.15rem; font-weight:900; color:${filledVal ? 'white' : '#64748b'};">
                        ${filledVal || (idx === currentSlotIdx ? 'Klik på brik 👇' : '...')}
                    </div>
                `;
                slotsRow.appendChild(slotEl);
            });

            const chipsRow = stage.querySelector('#sb-chips-row');
            const fbDiv = stage.querySelector('#sb-step2-fb');

            if (!isComplete) {
                const indices = [2, 0, 3, 1];
                indices.forEach(i => {
                    const chipWord = ex.slots[i].expected;
                    const alreadyUsed = placedSlots.includes(chipWord);
                    const chip = document.createElement('button');
                    chip.className = `sb-puzzle-chip ${alreadyUsed ? 'used' : ''}`;
                    chip.textContent = chipWord;
                    chip.onclick = () => {
                        const targetSlot = ex.slots[currentSlotIdx];
                        if (chipWord === targetSlot.expected) {
                            placedSlots.push(chipWord);
                            renderTabBuilder(parent);
                        } else {
                            fbDiv.className = 'detektiv-feedback-box show wrong';
                            fbDiv.innerHTML = `<strong>Pas på ordstillingen!</strong> På plads ${currentSlotIdx + 1} skal vi bruge <strong>${targetSlot.label}</strong>.`;
                        }
                    };
                    chipsRow.appendChild(chip);
                });
            } else {
                const fullBuilt = ex.slots.map(s => s.expected).join(' ');
                speakDanish(fullBuilt);
                fbDiv.className = 'detektiv-feedback-box show correct';
                fbDiv.innerHTML = `
                    <div style="font-size:1.2rem; font-weight:900; margin-bottom:0.4rem;">🎉 Perfekt: "${fullBuilt}"</div>
                    <p style="margin:0 0 1rem;">Du samlede "at"-konstruktionen i helt rigtig rækkefølge!</p>
                    <button class="action-btn-primary" id="next-builder-btn">Næste opgave ➔</button>
                `;
                fbDiv.querySelector('#next-builder-btn').onclick = () => {
                    builderIdx++;
                    builderPhase = 1;
                    placedSlots = [];
                    renderTabBuilder(parent);
                };
            }
        }

        container.appendChild(card);
        parent.appendChild(container);
    }

    // ==========================================
    // HELPER FOR QUIZ TABS (5, 6, 7, 8)
    // ==========================================
    function renderQuizEngine(parent, config) {
        parent.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.className = 'special-tab-container';

        if (config.introHtml) {
            const intro = document.createElement('div');
            intro.innerHTML = config.introHtml;
            wrap.appendChild(intro);
        }

        const state = config.state;
        const questions = config.questions;

        if (state.idx >= questions.length) {
            const doneCard = document.createElement('div');
            doneCard.className = 'score-celebration-card';
            doneCard.innerHTML = `
                <div style="font-size:3.5rem; margin-bottom:1rem;">🏆🌟</div>
                <h2 style="color:#fde68a; font-size:2rem; margin-bottom:0.5rem;">${config.doneTitle}</h2>
                <p style="font-size:1.2rem; color:#cbd5e1; margin-bottom:1.5rem;">
                    Du fik <strong>${state.score} ud af ${questions.length}</strong> rigtige i første forsøg!
                </p>
                <button class="action-btn-primary" id="quiz-restart-btn">🔄 Tag opgaven igen</button>
            `;
            wrap.appendChild(doneCard);
            parent.appendChild(wrap);
            doneCard.querySelector('#quiz-restart-btn').onclick = () => {
                state.idx = 0;
                state.score = 0;
                renderQuizEngine(parent, config);
            };
            return;
        }

        const q = questions[state.idx];
        const pct = Math.round((state.idx / questions.length) * 100);

        const card = document.createElement('div');
        card.className = 'exercise-action-card';
        card.innerHTML = `
            <div class="progress-header">
                <span>${config.progressLabel}: ${state.idx + 1} AF ${questions.length}</span>
                <span>Score: ${state.score} / ${state.idx}</span>
            </div>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width:${pct}%;"></div>
            </div>

            ${q.context ? `<div class="detektiv-context-tag">${q.context}</div>` : ''}
            <div class="exercise-dialog-quote" id="quiz-quote-box">${q.quote}</div>

            <div class="detektiv-options-grid" id="quiz-opts-grid"></div>
            <div class="detektiv-feedback-box" id="quiz-fb-box"></div>

            <div style="text-align:right; margin-top:1.5rem; display:none;" id="quiz-next-wrap">
                <button class="action-btn-primary" id="quiz-next-btn">Næste opgave ➔</button>
            </div>
        `;

        const optsGrid = card.querySelector('#quiz-opts-grid');
        const fbBox = card.querySelector('#quiz-fb-box');
        const nextWrap = card.querySelector('#quiz-next-wrap');
        let firstAttempt = true;
        let solved = false;

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'detektiv-opt-btn';
            btn.textContent = opt;
            btn.onclick = () => {
                if (solved) return;
                if (opt === q.correct) {
                    solved = true;
                    if (firstAttempt) state.score++;
                    btn.classList.add('correct');
                    card.querySelector('#quiz-quote-box').innerHTML = q.quote.replace(
                        '______',
                        `<span style="color:#4ade80; text-decoration:underline; font-weight:900;">${opt}</span>`
                    );
                    fbBox.className = 'detektiv-feedback-box show correct';
                    fbBox.innerHTML = `<strong>🌟 Korrekt!</strong> ${q.explanation}`;
                    nextWrap.style.display = 'block';
                    const spoken = q.quote.replace('______', opt).replace(/<[^>]+>/g, '');
                    speakDanish(spoken);
                } else {
                    firstAttempt = false;
                    btn.className = 'detektiv-opt-btn wrong';
                    fbBox.className = 'detektiv-feedback-box show wrong';
                    fbBox.innerHTML = `<strong>Prøv igen:</strong> ${q.wrongHint || q.explanation}`;
                }
            };
            optsGrid.appendChild(btn);
        });

        card.querySelector('#quiz-next-btn').onclick = () => {
            state.idx++;
            renderQuizEngine(parent, config);
        };

        wrap.appendChild(card);
        parent.appendChild(wrap);
    }

    // ==========================================
    // TAB 5: KONTEKST-TESTEN (14 DIALOGER MED "AT")
    // ==========================================
    const kontekstState = { idx: 0, score: 0 };
    const KONTEKST_QUESTIONS = [
        {
            context: '1/14 • Udsagns-ledsætning',
            quote: '<strong>A:</strong> "Har du talt med lægen?"<br><strong>B:</strong> "Ja, han siger, ______ prøverne ser helt normale ud."',
            options: ['at', 'om', 'til at'],
            correct: 'at',
            explanation: 'Efter "siger" følger en udsagns-ledsætning med konjunktionen "at".'
        },
        {
            context: '2/14 • Modalverbum (UDEN at!)',
            quote: '<strong>A:</strong> "Har du tid i eftermiddag?"<br><strong>B:</strong> "Nej, jeg skal ______ min datter i børnehaven klokken 15."',
            options: ['hente', 'at hente', 'henter'],
            correct: 'hente',
            explanation: 'Efter modalverbet "skal" bruger man ALDRIG "at" – kun ren infinitiv ("skal hente")!'
        },
        {
            context: '3/14 • Vane med "plejer"',
            quote: '<strong>A:</strong> "Hvordan kommer du på arbejde?"<br><strong>B:</strong> "Jeg plejer ______ med S-toget hver morgen."',
            options: ['at køre', 'køre', 'kører'],
            correct: 'at køre',
            explanation: '"Plejer" kræver altid infinitivmærket "at" ("plejer at køre").'
        },
        {
            context: '4/14 • Færdighed med præposition',
            quote: '<strong>A:</strong> "Hvem laver maden hjemme hos jer?"<br><strong>B:</strong> "Det gør min mand, for han er virkelig god ______ lave thailandsk mad!"',
            options: ['til at', 'for at', 'med at'],
            correct: 'til at',
            explanation: 'Det faste danske udtryk for en færdighed er "god til at + infinitiv".'
        },
        {
            context: '5/14 • Glæde over en anden persons handling',
            quote: '<strong>A:</strong> "Tak fordi jeg måtte kigge forbi!"<br><strong>B:</strong> "Selv tak! Jeg er så glad ______, at du havde tid til at besøge os."',
            options: ['for', 'til', 'på'],
            correct: 'for',
            explanation: 'Det hedder "glad for, at + ledsætning".'
        },
        {
            context: '6/14 • Ser frem til ferie (samme subjekt)',
            quote: '<strong>A:</strong> "Hvornår har I sommerferie?"<br><strong>B:</strong> "Om en uge! Vi glæder os helt vildt ______ slappe af ved stranden."',
            options: ['til at', 'for at', 'på at'],
            correct: 'til at',
            explanation: 'Det hedder "at glæde sig til at + infinitiv".'
        },
        {
            context: '7/14 • Et lille uheld på kontoret',
            quote: '<strong>A:</strong> "Hvor blev udkastet til mailen af?"<br><strong>B:</strong> "Åh nej, jeg ______ slette den ved en fejl!"',
            options: ['kom til at', 'gik til at', 'blev til at'],
            correct: 'kom til at',
            explanation: '"Kom til at + infinitiv" bruges, når man gør noget ved et uheld.'
        },
        {
            context: '8/14 • Formål og hensigt',
            quote: '<strong>A:</strong> "Hvorfor er du taget på biblioteket?"<br><strong>B:</strong> "Jeg er taget herhen ______ læse i fred og ro til eksamen."',
            options: ['for at', 'fordi', 'ved at'],
            correct: 'for at',
            explanation: '"For at + infinitiv" udtrykker formålet med handlingen ("in order to").'
        },
        {
            context: '9/14 • Metode og middel',
            quote: '<strong>A:</strong> "Hvordan fandt du så billige flybilletter?"<br><strong>B:</strong> "Jeg fandt dem ______ bestille tre måneder i forvejen."',
            options: ['ved at', 'for at', 'uden at'],
            correct: 'ved at',
            explanation: '"Ved at + infinitiv" forklarer metoden ("by booking three months in advance").'
        },
        {
            context: '10/14 • Fravær af handling',
            quote: '<strong>A:</strong> "Lagde du mærke til, hvornår Peter gik?"<br><strong>B:</strong> "Nej, han smuttede ______ sige farvel."',
            options: ['uden at', 'ved at', 'for at'],
            correct: 'uden at',
            explanation: '"Uden at + infinitiv" betyder "without saying goodbye".'
        },
        {
            context: '11/14 • Grad og konsekvens',
            quote: '<strong>A:</strong> "Kunne I høre, hvad han sagde?"<br><strong>B:</strong> "Nej, musikken var ______ høj, at vi ikke kunne høre et eneste ord."',
            options: ['så', 'for', 'meget'],
            correct: 'så',
            explanation: 'Konstruktionen hedder "så + adjektiv + , at + ledsætning" ("så høj, at...").'
        },
        {
            context: '12/14 • For tung til at...',
            quote: '<strong>A:</strong> "Kan du bære flyttekassen alene?"<br><strong>B:</strong> "Nej, den er alt for tung ______ løfte for én person."',
            options: ['til at', 'for at', 'så at'],
            correct: 'til at',
            explanation: 'Efter "for + adjektiv" ("for tung") bruger man "til at + infinitiv"!'
        },
        {
            context: '13/14 • Ledsætningsordstilling efter "at"',
            quote: '<strong>A:</strong> "Kommer chefen i dag?"<br><strong>B:</strong> "Nej, hun skrev en sms om, at ______ i dag."',
            options: ['hun ikke kommer', 'hun kommer ikke', 'kommer hun ikke'],
            correct: 'hun ikke kommer',
            explanation: 'I en "at"-ledsætning skal "ikke" stå FØR verbet ("at hun ikke kommer").'
        },
        {
            context: '14/14 • Træt af en gentagen situation',
            quote: '<strong>A:</strong> "Hvorfor køber du en elcykel?"<br><strong>B:</strong> "Fordi jeg er træt ______ cykle i modvind hver eneste morgen!"',
            options: ['af at', 'for at', 'til at'],
            correct: 'af at',
            explanation: 'Det faste udtryk hedder "træt af at + infinitiv".'
        }
    ];

    function renderTabKontekst(parent) {
        renderQuizEngine(parent, {
            state: kontekstState,
            questions: KONTEKST_QUESTIONS,
            progressLabel: '🎯 Kontekst-testen ("at")',
            doneTitle: 'Kontekst-testen med "at" gennemført!'
        });
    }

    // ==========================================
    // TAB 6: MED "AT" ELLER UDEN "AT"? (MODAL-FÆLDEN - 8 ØVELSER)
    // ==========================================
    const modalState = { idx: 0, score: 0 };
    const MODAL_QUESTIONS = [
        {
            context: '1/8 • Modalverbum (vil) vs. Almindeligt verbum',
            quote: '"Næste år vil jeg ______ dansk på Prøve i Dansk 3."',
            options: ['tale', 'at tale'],
            correct: 'tale',
            explanation: '"Vil" er et modalverbum ➔ derfor må der ALDRIG stå "at" foran infinitiven ("vil tale")!'
        },
        {
            context: '2/8 • Almindeligt verbum (håber)',
            quote: '"Næste år håber jeg ______ Prøve i Dansk 3 med et flot resultat."',
            options: ['at bestå', 'bestå'],
            correct: 'at bestå',
            explanation: '"Håber" er et almindeligt verbum ➔ derfor SKAL der stå "at" foran infinitiven ("håber at bestå")!'
        },
        {
            context: '3/8 • Modalverbum (bør)',
            quote: '"Du bør ______ en varm jakke på, for det blæser udenfor."',
            options: ['tage', 'at tage'],
            correct: 'tage',
            explanation: '"Bør" er et modalverbum ➔ ingen "at" ("bør tage")!'
        },
        {
            context: '4/8 • Almindeligt verbum (glemmer)',
            quote: '"Han glemmer desværre ofte ______ lyset, når han går."',
            options: ['at slukke', 'slukke'],
            correct: 'at slukke',
            explanation: '"Glemmer" er et almindeligt verbum ➔ kræver "at" ("glemmer at slukke")!'
        },
        {
            context: '5/8 • Modalverbum (må) vs. "bliver nødt til"',
            quote: '"Vi må desværre ______ mødet til på torsdag."',
            options: ['udsætte', 'at udsætte'],
            correct: 'udsætte',
            explanation: '"Må" er et modalverbum ➔ ingen "at" ("må udsætte")!'
        },
        {
            context: '6/8 • Udtrykket "bliver nødt til"',
            quote: '"Vi bliver desværre nødt til ______ mødet til på torsdag."',
            options: ['at udsætte', 'udsætte'],
            correct: 'at udsætte',
            explanation: 'Efter "bliver nødt til" SKAL der stå "at + infinitiv" ("nødt til at udsætte")!'
        },
        {
            context: '7/8 • Modalverbum (tør)',
            quote: '"Lille Emil tør ikke ______ fra tremetervippen endnu."',
            options: ['springe', 'at springe'],
            correct: 'springe',
            explanation: '"Tør" hører til gruppen af modalverber ➔ ingen "at" ("tør ikke springe")!'
        },
        {
            context: '8/8 • Vane-verbet (plejer)',
            quote: '"Vi plejer altid ______ kaffe i pausen klokken ti."',
            options: ['at drikke', 'drikke'],
            correct: 'at drikke',
            explanation: '"Plejer" kræver ALTID "at + infinitiv" ("plejer at drikke")!'
        }
    ];

    function renderTabModal(parent) {
        const introHtml = `
            <div class="special-intro-box">
                <h2>🚦 Med "at" eller Uden "at"? (Modalverbum-Fælden)</h2>
                <p>Træn rygmarvsrefleksen: De 6 modalverber (<strong>kan, skal, vil, må, bør, tør</strong>) afviser <em>at</em>, mens almindelige verber (<strong>plejer, håber, ønsker, husker, glemmer, prøver</strong>) kræver <em>at</em>!</p>
            </div>
        `;
        renderQuizEngine(parent, {
            introHtml,
            state: modalState,
            questions: MODAL_QUESTIONS,
            progressLabel: '🚦 MED ELLER UDEN "AT"',
            doneTitle: 'Modalverbum-fælden mestret!'
        });
    }

    // ==========================================
    // TAB 7: FOR AT, VED AT, UDEN AT ELLER FORDI? (8 ØVELSER)
    // ==========================================
    const sammensatState = { idx: 0, score: 0 };
    const SAMMENSAT_QUESTIONS = [
        {
            context: '1/8 • Formål (+ infinitiv) vs. Årsag (+ ledsætning)',
            quote: '"Jeg tager på sprogskole tre gange om ugen ______ lære flydende dansk."',
            options: ['for at', 'fordi', 'ved at', 'uden at'],
            correct: 'for at',
            explanation: 'Der står en ren infinitiv ("lære") uden subjekt, og det udtrykker dit FORMÅL ➔ "for at"!'
        },
        {
            context: '2/8 • Formål (+ infinitiv) vs. Årsag (+ ledsætning)',
            quote: '"Jeg tager på sprogskole tre gange om ugen, ______ jeg gerne vil lære flydende dansk."',
            options: ['fordi', 'for at', 'ved at', 'uden at'],
            correct: 'fordi',
            explanation: 'Der følger subjekt + verbum ("jeg gerne vil lære") i en ledsætning ➔ "fordi"!'
        },
        {
            context: '3/8 • Metode ("by doing")',
            quote: '"Du kan nemt nulstille computeren ______ holde tænd-knappen nede i fem sekunder."',
            options: ['ved at', 'for at', 'uden at', 'fordi'],
            correct: 'ved at',
            explanation: '"Ved at + infinitiv" beskriver metoden / hvordan man gør det!'
        },
        {
            context: '4/8 • Fravær ("without doing")',
            quote: '"Han underskrev desværre kontrakten ______ læse det med småt først."',
            options: ['uden at', 'ved at', 'for at', 'fordi'],
            correct: 'uden at',
            explanation: 'Han læste IKKE det med småt, før han skrev under ➔ "uden at"!'
        },
        {
            context: '5/8 • Formål i hverdagen',
            quote: '"Hun gik ned i supermarkedet ______ købe frisk mælk og brød til morgenmaden."',
            options: ['for at', 'ved at', 'uden at', 'fordi'],
            correct: 'for at',
            explanation: 'Formålet med gåturen til supermarkedet var at købe ind ➔ "for at købe".'
        },
        {
            context: '6/8 • Metode til energibesparelse',
            quote: '"Familien sparede mange penge på elregningen ______ skifte til LED-pærer i hele huset."',
            options: ['ved at', 'for at', 'uden at', 'fordi'],
            correct: 'ved at',
            explanation: 'Skiftet til LED-pærer var METODEN, hvormed de sparede penge ➔ "ved at".'
        },
        {
            context: '7/8 • Imponerende præstation uden hjælp',
            quote: '"Den lille pige samlede hele puslespillet selv ______ få hjælp af sine forældre."',
            options: ['uden at', 'ved at', 'for at', 'fordi'],
            correct: 'uden at',
            explanation: 'Hun fik ingen hjælp ➔ "uden at få hjælp".'
        },
        {
            context: '8/8 • Årsag med subjekt efter kommaet',
            quote: '"Han tog bussen på arbejde i morges, ______ hans cykel var punkteret."',
            options: ['fordi', 'for at', 'ved at', 'uden at'],
            correct: 'fordi',
            explanation: 'Efter kommaet kommer subjekt ("hans cykel") + verbum ("var") ➔ ledsætning med "fordi"!'
        }
    ];

    function renderTabSammensat(parent) {
        const introHtml = `
            <div class="special-intro-box">
                <h2>🛠️ For at, ved at, uden at eller fordi?</h2>
                <p>Lær hvornår man bruger de sammensatte bindeord med <strong>at + infinitiv</strong> (<em>for at</em> = formål, <em>ved at</em> = metode, <em>uden at</em> = fravær) i modsætning til <strong>fordi + subjekt + verbum</strong>.</p>
            </div>
        `;
        renderQuizEngine(parent, {
            introHtml,
            state: sammensatState,
            questions: SAMMENSAT_QUESTIONS,
            progressLabel: '🛠️ SAMMENSATTE "AT"-UDTRYK',
            doneTitle: 'For at, ved at, uden at og fordi mestret!'
        });
    }

    // ==========================================
    // TAB 8: PRÆPOSITION + AT (10 ØVELSER)
    // ==========================================
    const praepState = { idx: 0, score: 0 };
    const PRAEP_QUESTIONS = [
        {
            context: '1/10 • Dygtig til noget',
            quote: '"Min søster har altid været utrolig god ______ tegne portrætter."',
            options: ['til at', 'for at', 'på at'],
            correct: 'til at',
            explanation: 'Det hedder altid "god / dygtig / dårlig TIL AT + infinitiv".'
        },
        {
            context: '2/10 • At se frem til noget',
            quote: '"Vi glæder os rigtig meget ______ flytte ind i vores nye hus til maj!"',
            options: ['til at', 'for at', 'om at'],
            correct: 'til at',
            explanation: 'Det hedder altid "at glæde sig TIL AT + infinitiv".'
        },
        {
            context: '3/10 • Taknemmelig / glad over noget',
            quote: '"Tusind tak for hjælpen! Jeg er virkelig glad ______, at du ville give en hånd med."',
            options: ['for', 'til', 'over'],
            correct: 'for',
            explanation: 'Det hedder "glad FOR, at + ledsætning" (eller "glad for at + infinitiv").'
        },
        {
            context: '4/10 • Træt af noget',
            quote: '"Nu er jeg altså træt ______ høre på den larm fra gaden!"',
            options: ['af at', 'for at', 'til at'],
            correct: 'af at',
            explanation: 'Det hedder altid "træt AF AT + infinitiv".'
        },
        {
            context: '5/10 • Sikker på et faktum',
            quote: '"Jeg er næsten 100 procent sikker ______, at jeg låste hoveddøren i morges."',
            options: ['på', 'om', 'for'],
            correct: 'på',
            explanation: 'Det hedder altid "sikker PÅ, at + ledsætning".'
        },
        {
            context: '6/10 • Bange for noget',
            quote: '"Hunden er lidt bange ______ køre i elevator."',
            options: ['for at', 'til at', 'af at'],
            correct: 'for at',
            explanation: 'Det hedder altid "bange FOR AT + infinitiv".'
        },
        {
            context: '7/10 • Drømme om / tale om',
            quote: '"De drømmer ______, at de en dag kan købe et lille sommerhus ved kysten."',
            options: ['om', 'på', 'til'],
            correct: 'om',
            explanation: 'Det hedder "at drømme OM, at..." (og med infinitiv: "drømme om at købe").'
        },
        {
            context: '8/10 • Et uheld ("accidentally")',
            quote: '"Hov, undskyld! Jeg ______ træde dig over tæerne i bussen."',
            options: ['kom til at', 'gik til at', 'stod til at'],
            correct: 'kom til at',
            explanation: '"At komme til at + infinitiv" betyder, at det skete ved et uheld.'
        },
        {
            context: '9/10 • Alt for dyr til at...',
            quote: '"Den sportsvogn er alt for dyr ______ købe på en almindelig løn."',
            options: ['til at', 'for at', 'med at'],
            correct: 'til at',
            explanation: 'Efter "for + adjektiv" ("for dyr") bruger man "til at + infinitiv".'
        },
        {
            context: '10/10 • Brug for / trænge til',
            quote: '"Efter den lange arbejdsuge trænger jeg virkelig ______ sove længe i morgen!"',
            options: ['til at', 'for at', 'på at'],
            correct: 'til at',
            explanation: 'Det hedder "at trænge TIL AT + infinitiv" ("need to").'
        }
    ];

    function renderTabPraep(parent) {
        const introHtml = `
            <div class="special-intro-box">
                <h2>🔗 Præposition + AT (Faste forbindelser)</h2>
                <p>På dansk elsker vi at sætte en præposition foran <strong>at</strong> – både foran infinitiv (<em>god til at, træt af at, bange for at, kom til at</em>) og foran ledsætninger (<em>glad for, at / sikker på, at / drømmer om, at</em>).</p>
            </div>
        `;
        renderQuizEngine(parent, {
            introHtml,
            state: praepState,
            questions: PRAEP_QUESTIONS,
            progressLabel: '🔗 PRÆPOSITION + AT',
            doneTitle: 'Præposition + "at" mestret!'
        });
    }

    // Initial render
    switchTab((extraData && (extraData.subPath || extraData.tab)) ? (extraData.subPath || extraData.tab) : 'vrimmel');
    container.appendChild(viewContainer);
}
