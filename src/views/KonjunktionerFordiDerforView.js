import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

/**
 * KonjunktionerFordiDerforView - Særskilt Flade: "FORDI" og "DERFOR"
 *
 * Kombinerer:
 *  1. Interaktivt Vrimlebillede (assets/fordi_derfor_vrimmel.jpg) med 10 parrede hotspots:
 *     - ⛽⬅️ FORDI (Årsagen): Ledsætningskonjunktion (Virkning + fordi + Årsag, med Subjekt + IKKE + Verbum!)
 *     - ➡️ DERFOR (Virkningen / Konsekvensen): Konnektivt adverbium (Årsag. Derfor + Verbum + Subjekt = INVERSION!)
 *  2. Den kognitive illustration fra Træning 2 (fordi_derfor_guide.png) integreret direkte i fladen
 *  3. Ordstillings-røntgen & Sætnings-Vendemaskinen (Vend "Jeg kom for sent, fordi bussen ikke kom" ↔ "Bussen kom ikke. Derfor kom jeg for sent")
 */
export function renderKonjunktionerFordiDerforView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container fordi-derfor-view';

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

    const otherPairsDiv = document.createElement('div');
    otherPairsDiv.style.display = 'flex';
    otherPairsDiv.style.gap = '0.5rem';
    otherPairsDiv.style.flexWrap = 'wrap';

    const toDaNaarBtn = document.createElement('button');
    toDaNaarBtn.className = 'back-btn';
    toDaNaarBtn.style.background = 'rgba(16, 185, 129, 0.15)';
    toDaNaarBtn.style.borderColor = '#10b981';
    toDaNaarBtn.style.color = '#6ee7b7';
    toDaNaarBtn.innerHTML = `📅 Da / Når ➔`;
    toDaNaarBtn.onclick = () => navigateFn('konjunktioner_da_naar', { from: 'top_konjunktioner' });
    otherPairsDiv.appendChild(toDaNaarBtn);

    const toSelvomBtn = document.createElement('button');
    toSelvomBtn.className = 'back-btn';
    toSelvomBtn.style.background = 'rgba(249, 115, 22, 0.15)';
    toSelvomBtn.style.borderColor = '#f97316';
    toSelvomBtn.style.color = '#fdba74';
    toSelvomBtn.innerHTML = `🧱 Selvom / Alligevel ➔`;
    toSelvomBtn.onclick = () => navigateFn('konjunktioner_selvom_alligevel', { from: 'top_konjunktioner' });
    otherPairsDiv.appendChild(toSelvomBtn);

    topBar.appendChild(otherPairsDiv);
    viewContainer.appendChild(topBar);

    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // 10 Hotspots on assets/fordi_derfor_vrimmel.jpg
    const FORDI_DERFOR_DATA = [
        {
            id: 'fordi_bus',
            word: 'fordi (årsagen = bussen var aflyst)',
            shortLabel: '⛽ fordi (bussen var aflyst)',
            category: 'fordi',
            cognitiveIcon: '⛽ FORDI ➔ Introducerer ÅRSAGEN (Ledsætning)',
            x: 11,
            y: 24,
            meaning: 'Peger på selve årsagen/grunden, som kommer LIGE EFTER ordet "fordi"',
            sceneDesc: 'Bussen holder i vejkanten med havariblink og røg fra motoren – den er årsagen til forsinkelsen.',
            sentence: 'Jeg kom for sent, fordi bussen var aflyst.',
            contextSentence: 'Han nåede ikke morgenmødet til tiden, fordi bussen pludselig gik i stykker.',
            ruleHint: '⛽ FORDI + ÅRSAG: Ordet "fordi" står altid LIGE FORAN årsagen ("fordi bussen var aflyst"). I en "fordi"-ledsætning står "ikke" FØR verbet!',
            translations: {
                en: { word: 'because (+ cause/reason)', sentence: 'I arrived late because the bus was cancelled.' },
                de: { word: 'weil (+ Nebensatz = Ursache)', sentence: 'Ich kam zu spät, weil der Bus ausgefallen war.' },
                es: { word: 'porque (+ causa)', sentence: 'Llegué tarde porque el autobús fue cancelado.' },
                ar: { word: 'لِأَنَّ (+ السبب)', sentence: 'وصلت متأخرًا لأن الحافلة أُلغيت.' },
                tr: { word: 'çünkü / -diği için ("fordi" = neden)', sentence: 'Geç kaldım çünkü otobüs iptal edildi.' },
                uk: { word: 'тому що (+ причина)', sentence: 'Я запізнився, тому що автобус скасували.' }
            }
        },
        {
            id: 'derfor_bus',
            word: 'derfor (virkningen = kom for sent)',
            shortLabel: '➡️ derfor (kom jeg for sent)',
            category: 'derfor',
            cognitiveIcon: '➡️ DERFOR ➔ Introducerer VIRKNINGEN (Inversion!)',
            x: 31,
            y: 24,
            meaning: 'Konkluderer og skubber handlingen frem mod virkningen/resultatet ("therefore / so")',
            sceneDesc: 'Manden løber forpustet ind ad kontordøren og kigger nervøst på sit ur.',
            sentence: 'Bussen var aflyst. Derfor kom jeg for sent.',
            contextSentence: 'Bussen gik i stykker på vejen. Derfor måtte han løbe hele vejen hen til kontoret.',
            ruleHint: '➡️ DERFOR + INVERSION: Når "Derfor" starter sætningen, følger VIRKNINGEN – og verbet kommer FØR subjektet ("Derfor KOM JEG for sent" / "Derfor MÅTTE HAN løbe")!',
            translations: {
                en: { word: 'therefore / that is why (+ effect/result)', sentence: 'The bus was cancelled. Therefore I arrived late.' },
                de: { word: 'deshalb / darum (+ Wirkung mit Inversion!)', sentence: 'Der Bus fiel aus. Deshalb kam ich zu spät.' },
                es: { word: 'por eso / por lo tanto (+ consecuencia)', sentence: 'El autobús fue cancelado. Por eso llegué tarde.' },
                ar: { word: 'لِذَلِكَ (+ النتيجة)', sentence: 'أُلغيت الحافلة. لذلك وصلت متأخرًا.' },
                tr: { word: 'bu yüzden / dolayısıyla ("derfor" = sonuç)', sentence: 'Otobüs iptal edildi. Bu yüzden geç kaldım.' },
                uk: { word: 'тому / ось чому (+ наслідок)', sentence: 'Автобус скасували. Тому я запізнився.' }
            }
        },
        {
            id: 'fordi_regn',
            word: 'fordi (årsagen = det regner)',
            shortLabel: '⛽ fordi (det regner)',
            category: 'fordi',
            cognitiveIcon: '⛽ FORDI ➔ Årsagen kommer efter "fordi"',
            x: 16,
            y: 48,
            meaning: 'Forklarer hvorfor man har paraply med',
            sceneDesc: 'Tunge mørke skyer sender regn ned over gaden.',
            sentence: 'Jeg har en paraply med, fordi det regner.',
            contextSentence: 'Hun har taget sine gule gummistøvler på i dag, fordi det øsregner udenfor.',
            ruleHint: '⛽ HUSK FORMELEN: [Virkning: Jeg har en paraply med] + FORDI + [Årsag: det regner].',
            translations: {
                en: { word: 'because (it is raining)', sentence: 'I brought an umbrella because it is raining.' },
                de: { word: 'weil (es regnet)', sentence: 'Ich habe einen Regenschirm dabei, weil es regnet.' },
                es: { word: 'porque (llueve)', sentence: 'Llevo un paraguas porque está lloviendo.' },
                ar: { word: 'لِأَنَّهَا تُمْطِرُ', sentence: 'أحمل مظلة لأنها تمطر.' },
                tr: { word: 'çünkü yağmur yağıyor ("fordi")', sentence: 'Yanımda şemsiye var çünkü yağmur yağıyor.' },
                uk: { word: 'тому що йде дощ ("fordi")', sentence: 'Я взяв парасольку, тому що йде дощ.' }
            }
        },
        {
            id: 'derfor_regn',
            word: 'derfor (virkningen = har paraply med)',
            shortLabel: '➡️ derfor (har jeg paraply med)',
            category: 'derfor',
            cognitiveIcon: '➡️ DERFOR ➔ Virkningen kommer efter "derfor"',
            x: 17,
            y: 76,
            meaning: 'Viser den logiske konsekvens af regnvejret',
            sceneDesc: 'Kvinden går tørskoet gennem vandpytterne under sin røde paraply.',
            sentence: 'Det regner, derfor har jeg en paraply med.',
            contextSentence: 'Det har regnet hele morgenen. Derfor har hun slået sin store røde paraply op.',
            ruleHint: '➡️ HUSK FORMELEN: [Årsag: Det regner]. DERFOR + [Virkning med Inversion: HAR JEG en paraply med]!',
            translations: {
                en: { word: 'therefore (I brought an umbrella)', sentence: 'It is raining, therefore I have an umbrella with me.' },
                de: { word: 'deshalb (habe ich einen Schirm dabei)', sentence: 'Es regnet, deshalb habe ich einen Regenschirm dabei.' },
                es: { word: 'por eso (llevo paraguas)', sentence: 'Está lloviendo, por eso llevo un paraguas.' },
                ar: { word: 'لِذَلِكَ (أحمل مظلة)', sentence: 'إنها تمطر، لذلك أحمل مظلة معي.' },
                tr: { word: 'bu yüzden şemsiyem var ("derfor")', sentence: 'Yağmur yağıyor, bu yüzden yanımda şemsiye var.' },
                uk: { word: 'тому я маю парасольку ("derfor")', sentence: 'Йде дощ, тому я взяв із собою парасольку.' }
            }
        },
        {
            id: 'fordi_koeleskab',
            word: 'fordi (+ "ikke" før verbet!)',
            shortLabel: '⛽ fordi (der ikke er mad)',
            category: 'fordi',
            cognitiveIcon: '⛽ FORDI + "Ikke"-Magneten',
            x: 44,
            y: 50,
            meaning: 'Det tomme køleskab er årsagen til indkøbsturen',
            sceneDesc: 'Hylderne i det åbne køleskab er helt tomme, og han tænker på mælk, brød og æbler.',
            sentence: 'Han køber ind, fordi der ikke er mere mælk.',
            contextSentence: 'Han bliver nødt til at gå i supermarkedet nu, fordi køleskabet er helt tomt.',
            ruleHint: '🧲 "IKKE"-MAGNETEN EFTER FORDI: Efter "fordi" kommer der en ledsætning, så "ikke" står FØR verbet ("... fordi der IKKE er mere mælk")!',
            translations: {
                en: { word: 'because (there is no milk left)', sentence: 'He goes grocery shopping because there is no more milk.' },
                de: { word: 'weil (keine Milch mehr da ist)', sentence: 'Er kauft ein, weil keine Milch mehr da ist.' },
                es: { word: 'porque (no queda leche)', sentence: 'Va a hacer la compra porque ya no queda leche.' },
                ar: { word: 'لِأَنَّهُ لَا يُوجَدُ حَلِيبٌ', sentence: 'يذهب للتسوق لأنه لم يعد هناك حليب.' },
                tr: { word: 'çünkü süt kalmadı ("fordi")', sentence: 'Alışveriş yapıyor çünkü hiç süt kalmadı.' },
                uk: { word: 'тому що більше немає молока', sentence: 'Він купує продукти, тому що більше немає молока.' }
            }
        },
        {
            id: 'derfor_supermarked',
            word: 'derfor (køber han ind)',
            shortLabel: '➡️ derfor (går han i butikken)',
            category: 'derfor',
            cognitiveIcon: '➡️ DERFOR + Inversion',
            x: 58,
            y: 52,
            meaning: 'Indkøbsturen er virkningen af det tomme køleskab',
            sceneDesc: 'Manden går med sin røde indkøbskurv hen mod grøntsagerne i supermarkedet.',
            sentence: 'Køleskabet er tomt. Derfor går han i supermarkedet.',
            contextSentence: 'Der er ikke mere mælk derhjemme. Derfor fylder han kurven med friske varer.',
            ruleHint: '🔄 SE INVERSIONEN: "Derfor GÅR HAN..." / "Derfor FYLDER HAN...". Aldrig *"Derfor han går"!',
            translations: {
                en: { word: 'therefore (he goes to the supermarket)', sentence: 'The fridge is empty. Therefore he goes to the supermarket.' },
                de: { word: 'deshalb (geht er in den Supermarkt)', sentence: 'Der Kühlschrank ist leer. Deshalb geht er in den Supermarkt.' },
                es: { word: 'por eso (va al supermercado)', sentence: 'La nevera está vacía. Por eso va al supermercado.' },
                ar: { word: 'لِذَلِكَ (يذهب إلى السوبرماركت)', sentence: 'الثلاجة فارغة. لذلك يذهب إلى السوبرماركت.' },
                tr: { word: 'bu yüzden markete gidiyor ("derfor")', sentence: 'Buzdolabı boş. Bu yüzden süpermarkete gidiyor.' },
                uk: { word: 'тому він іде в супермаркет', sentence: 'Холодильник порожній. Тому він іде до супермаркету.' }
            }
        },
        {
            id: 'fordi_soeveloes',
            word: 'fordi (han ikke sov i nat)',
            shortLabel: '⛽ fordi (han ikke sov)',
            category: 'fordi',
            cognitiveIcon: '⛽ FORDI + Ledsætning (Subjekt + ikke + Verbum)',
            x: 76,
            y: 27,
            meaning: 'Søvnmanglen om natten er årsagen til trætheden',
            sceneDesc: 'Om natten ligger manden vågen i sengen, mens uglen tuder uden for vinduet.',
            sentence: 'Han er træt, fordi han ikke sov i nat.',
            contextSentence: 'Han gaber hele morgenen, fordi han slet ikke kunne falde i søvn i nat.',
            ruleHint: '🧲 KLASSISK EKSAMENS-SÆTNING: Bemærk hvor "ikke" står: I helsætning hedder det "Han SOV IKKE i nat", men efter "fordi" hedder det "... fordi han IKKE SOV i nat"!',
            translations: {
                en: { word: 'because (he did not sleep last night)', sentence: 'He is tired because he did not sleep last night.' },
                de: { word: 'weil (er heute Nacht nicht geschlafen hat)', sentence: 'Er ist müde, weil er heute Nacht nicht geschlafen hat.' },
                es: { word: 'porque (no durmió anoche)', sentence: 'Está cansado porque no durmió anoche.' },
                ar: { word: 'لِأَنَّهُ لَمْ يَنَمِ اللَّيْلَةَ الْمَاضِيَةَ', sentence: 'إنه متعب لأنه لم ينم الليلة الماضية.' },
                tr: { word: 'çünkü dün gece uyumadı ("fordi")', sentence: 'Yorgun çünkü dün gece uyumadı.' },
                uk: { word: 'тому що він не спав уночі', sentence: 'Він утомлений, тому що не спав цієї ночі.' }
            }
        },
        {
            id: 'derfor_traet',
            word: 'derfor (er han træt)',
            shortLabel: '➡️ derfor (er han træt)',
            category: 'derfor',
            cognitiveIcon: '➡️ DERFOR + Inversion (Verbum før Subjekt)',
            x: 92,
            y: 24,
            meaning: 'Trætheden og de to kopper kaffe er virkningen',
            sceneDesc: 'Ved morgenbordet gaber manden stort foran to kopper stærk kaffe.',
            sentence: 'Han sov ikke i nat, derfor er han træt.',
            contextSentence: 'Han lå vågen hele natten. Derfor drikker han to store kopper kaffe til morgenmad.',
            ruleHint: '➡️ SAMMENLIGN PARRET: 1) "Han er træt [virkning], FORDI han ikke sov [årsag]." ↔ 2) "Han sov ikke [årsag], DERFOR er han træt [virkning]!"',
            translations: {
                en: { word: 'therefore (he is tired)', sentence: 'He did not sleep last night, therefore he is tired.' },
                de: { word: 'deshalb (ist er müde)', sentence: 'Er hat heute Nacht nicht geschlafen, deshalb ist er müde.' },
                es: { word: 'por eso (está cansado)', sentence: 'No durmió anoche, por eso está cansado.' },
                ar: { word: 'لِذَلِكَ (هو متعب)', sentence: 'لم ينم الليلة الماضية، لذلك هو متعب.' },
                tr: { word: 'bu yüzden yorgun ("derfor")', sentence: 'Dün gece uyumadı, bu yüzden yorgun.' },
                uk: { word: 'тому він утомлений', sentence: 'Він не спав уночі, тому він утомлений.' }
            }
        },
        {
            id: 'fordi_cafe_gaester',
            word: 'fordi (mange gæster venter)',
            shortLabel: '⛽ fordi (gæsterne venter)',
            category: 'fordi',
            cognitiveIcon: '⛽ FORDI ➔ Årsagen på caféen',
            x: 72,
            y: 78,
            meaning: 'De mange ventende gæster er årsagen til, at tjeneren løber hurtigt',
            sceneDesc: 'Alle udendørsbordene på caféen er fyldt med glade gæster i solskinnet.',
            sentence: 'Tjeneren løber hurtigt, fordi mange gæster venter.',
            contextSentence: 'Alle gæsterne sidder udenfor på terrassen, fordi solen skinner så dejligt i dag.',
            ruleHint: '⛽ SPØRG MED "HVORFOR?": Svaret på "Hvorfor løber tjeneren hurtigt?" starter altid med FORDI ("Fordi mange gæster venter")!',
            translations: {
                en: { word: 'because (many guests are waiting)', sentence: 'The waiter runs fast because many guests are waiting.' },
                de: { word: 'weil (viele Gäste warten)', sentence: 'Der Kellner läuft schnell, weil viele Gäste warten.' },
                es: { word: 'porque (muchos clientes esperan)', sentence: 'El camarero corre rápido porque muchos clientes esperan.' },
                ar: { word: 'لِأَنَّ الْكَثِيرَ مِنَ الضُّيُوفِ يَنْتَظِرُونَ', sentence: 'يركض النادل بسرعة لأن الكثير من الضيوف ينتظرون.' },
                tr: { word: 'çünkü birçok müşteri bekliyor ("fordi")', sentence: 'Garson hızlı koşuyor çünkü birçok müşteri bekliyor.' },
                uk: { word: 'тому що багато гостей чекають', sentence: 'Офіціант швидко бігає, тому що багато гостей чекають.' }
            }
        },
        {
            id: 'derfor_tjener_travlt',
            word: 'derfor (har tjeneren travlt)',
            shortLabel: '➡️ derfor (har han travlt)',
            category: 'derfor',
            cognitiveIcon: '➡️ DERFOR ➔ Virkningen på caféen',
            x: 89,
            y: 76,
            meaning: 'At tjeneren har ekstra travlt er konsekvensen af det gode vejr',
            sceneDesc: 'Tjeneren spurter afsted med en bakke fuld af kolde drikkevarer.',
            sentence: 'I dag er det solskin. Derfor har tjeneren ekstra travlt.',
            contextSentence: 'Alle bordene på caféen er optaget. Derfor løber tjeneren ekstra hurtigt med bakken.',
            ruleHint: '➡️ KONKLUSION: Når du først fortæller fakta ("Alle bordene er optaget"), konkluderer du bagefter med "Derfor + Verbum + Subjekt"!',
            translations: {
                en: { word: 'therefore (the waiter is extra busy)', sentence: 'Today it is sunny. Therefore the waiter is extra busy.' },
                de: { word: 'deshalb (hat der Kellner viel zu tun)', sentence: 'Heute scheint die Sonne. Deshalb hat der Kellner besonders viel zu tun.' },
                es: { word: 'por eso (el camarero está muy ocupado)', sentence: 'Hoy hace sol. Por eso el camarero está muy ocupado.' },
                ar: { word: 'لِذَلِكَ (النادل مشغول جدًا)', sentence: 'اليوم مشمس. لذلك النادل مشغول للغاية.' },
                tr: { word: 'bu yüzden garson çok meşgul ("derfor")', sentence: 'Bugün hava güneşli. Bu yüzden garson ekstra yoğun.' },
                uk: { word: 'тому офіціант дуже зайнятий', sentence: 'Сьогодні сонячно. Тому офіціант дуже зайнятий.' }
            }
        }
    ];

    function getItemTrans(item) {
        const lang = getLang();
        if (item.translations && item.translations[lang]) return item.translations[lang];
        if (item.translations && item.translations.en) return item.translations.en;
        return { word: item.meaning, sentence: '' };
    }

    const style = document.createElement('style');
    style.textContent = `
        .fordi-derfor-view {
            max-width: 1240px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .fd-hero { text-align: center; margin-bottom: 1.8rem; }
        .fd-hero-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(56, 189, 248, 0.2);
            border: 1px solid #38bdf8;
            color: #7dd3fc;
            padding: 0.45rem 1.1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 0.8rem;
        }
        .fd-hero h1 {
            font-size: 2.5rem;
            font-weight: 900;
            margin: 0 0 0.7rem;
            background: linear-gradient(135deg, #7dd3fc, #38bdf8, #fb923c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .fd-hero p { color: #cbd5e1; font-size: 1.1rem; max-width: 850px; margin: 0 auto; line-height: 1.6; }

        .cognitive-guide-banner {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
            border: 2px solid #38bdf8;
            border-radius: 22px;
            padding: 1.5rem 1.8rem;
            margin-bottom: 2rem;
            display: grid;
            grid-template-columns: 400px 1fr;
            gap: 1.8rem;
            align-items: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        @media (max-width: 860px) { .cognitive-guide-banner { grid-template-columns: 1fr; text-align: center; } }
        .guide-img-thumb {
            width: 100%;
            border-radius: 16px;
            border: 2px solid rgba(255, 255, 255, 0.15);
            background: white;
        }
        .guide-symbols-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-top: 1rem;
        }
        @media (max-width: 650px) { .guide-symbols-grid { grid-template-columns: 1fr; } }
        .guide-sym-card {
            background: #0f172a;
            border-radius: 14px;
            padding: 1rem;
            border-top: 4px solid;
        }

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
            background: #0284c7;
            color: white;
            box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4);
        }

        .vrimmel-layout { max-width: 1050px; margin: 0 auto; }
        .vrimmel-stage-card {
            background: #1e293b;
            border-radius: 20px;
            overflow: hidden;
            border: 2px solid rgba(255, 255, 255, 0.1);
        }
        .vrimmel-controls-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            background: rgba(15, 23, 42, 0.85);
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
        }
        .filter-btn.active { background: #0284c7; color: white; border-color: #38bdf8; }
        .pure-toggle-btn {
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid #38bdf8;
            color: #7dd3fc;
            padding: 0.45rem 1rem;
            border-radius: 10px;
            font-weight: 700;
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
        .hotspot-pin.pin-fordi { background: #0284c7; }
        .hotspot-pin.pin-derfor { background: #ea580c; }
        .hotspot-pin:hover, .hotspot-pin.active {
            transform: translate(-50%, -50%) scale(1.35);
            z-index: 30;
            box-shadow: 0 0 25px #fde047;
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

        .vrimmel-inspector {
            background: #1e293b;
            border: 2px solid #38bdf8;
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
            background: rgba(56, 189, 248, 0.2);
            border: 1px solid #38bdf8;
            color: #7dd3fc;
            padding: 0.25rem 0.75rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 800;
        }
        .inspector-word-title { font-size: 1.9rem; font-weight: 900; color: white; margin: 0; }
        .inspector-trans-box {
            background: #0f172a;
            border-radius: 12px;
            padding: 1rem 1.2rem;
            border-left: 4px solid #38bdf8;
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
            border: 1.5px solid rgba(56, 189, 248, 0.35);
        }
        .inspector-speak-btn {
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid #38bdf8;
            color: #7dd3fc;
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
        .detektiv-opt-btn:hover { border-color: #38bdf8; background: #334155; }
        .detektiv-opt-btn.correct { background: rgba(34, 197, 94, 0.25) !important; border-color: #22c55e !important; color: #4ade80 !important; }
        .detektiv-opt-btn.wrong { background: rgba(239, 68, 68, 0.25) !important; border-color: #ef4444 !important; color: #fca5a5 !important; }
    `;
    viewContainer.appendChild(style);

    // Hero
    const hero = document.createElement('div');
    hero.className = 'fd-hero';
    hero.innerHTML = `
        <div class="fd-hero-tag">
            <span>⛽➡️</span> Særskilt Flade • Årsag & Virkning
        </div>
        <h1>"FORDI" eller "DERFOR"?</h1>
        <p>Kend forskellen på <strong>årsag</strong> og <strong>virkning</strong> – og pas på ordstillingen! <strong>⛽ <em>Fordi</em> introducerer årsagen i en ledsætning (<em>Subjekt + ikke + Verbum</em>)</strong>, mens <strong>➡️ <em>Derfor</em> introducerer virkningen/konsekvensen i en helsætning med Inversion (<em>Verbum + Subjekt</em>)!</strong></p>
    `;
    viewContainer.appendChild(hero);

    // Cognitive Guide Banner with fordi_derfor_guide.png
    const guideBanner = document.createElement('div');
    guideBanner.className = 'cognitive-guide-banner';
    guideBanner.innerHTML = `
        <div>
            <img src="${baseUrl}fordi_derfor_guide.png" alt="Fordi vs Derfor kognitiv guide" class="guide-img-thumb" />
        </div>
        <div>
            <h3 style="margin:0 0 0.4rem; color:#7dd3fc; font-size:1.35rem;">🧭 Virkning + FORDI ➔ Årsag  |  Årsag. DERFOR ➔ Virkning</h3>
            <p style="margin:0; color:#cbd5e1; line-height:1.55;">
                Kig på pilene i illustrationen fra Træning 2 til venstre – rækkefølgen af <strong>Årsag</strong> og <strong>Virkning</strong> afgør alt:
            </p>
            <div class="guide-symbols-grid">
                <div class="guide-sym-card" style="border-color:#0284c7;">
                    <div style="font-weight:900; color:#7dd3fc; font-size:1.05rem;">⛽ Virkning + FORDI ➔ Årsag</div>
                    <div style="font-size:0.86rem; color:#cbd5e1; margin-top:0.3rem;">
                        Ordet <strong><em>fordi</em></strong> står lige foran selve <strong>årsagen</strong>:<br>
                        <em style="color:#fde68a;">"Jeg kom for sent [virkning], <strong>fordi</strong> bussen var aflyst [årsag]."</em>
                    </div>
                </div>
                <div class="guide-sym-card" style="border-color:#ea580c;">
                    <div style="font-weight:900; color:#fdba74; font-size:1.05rem;">➡️ Årsag. DERFOR ➔ Virkning</div>
                    <div style="font-size:0.86rem; color:#cbd5e1; margin-top:0.3rem;">
                        Ordet <strong><em>derfor</em></strong> står lige foran <strong>virkningen/konsekvensen</strong> (med Inversion!):<br>
                        <em style="color:#fde68a;">"Bussen var aflyst [årsag]. <strong>Derfor</strong> kom jeg for sent [virkning]."</em>
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
        { id: 'vrimmel', label: '1. Vrimlebilledet: Fordi & Derfor (10 scener)', icon: '🖼️' },
        { id: 'kognitiv', label: '2. Årsag & Virkning + Ordstilling', icon: '🔬' },
        { id: 'traening2', label: '3. Klassisk Træning 2 (med Illustration)', icon: '➡️' },
        { id: 'detektiv', label: '4. Årsag/Virkning-Detektiven (8 gåder)', icon: '🔍' },
        { id: 'vendemaskine', label: '5. Sætnings-Vendemaskinen (Fordi ↔ Derfor)', icon: '🔄' },
        { id: 'builder', label: '6. Sætningsbyggeren & Puslespillet', icon: '🧩' }
    ];

    let currentTab = (extraData && extraData.tab) ? extraData.tab : 'vrimmel';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `adv-tab-btn ${currentTab === t.id ? 'active' : ''}`;
        btn.id = `fd-tab-${t.id}`;
        btn.innerHTML = `<span>${t.icon}</span> ${t.label}`;
        btn.onclick = () => switchTab(t.id);
        nav.appendChild(btn);
    });
    viewContainer.appendChild(nav);

    const tabContent = document.createElement('div');
    viewContainer.appendChild(tabContent);

    function switchTab(tabId) {
        currentTab = tabId;
        nav.querySelectorAll('.adv-tab-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = nav.querySelector(`#fd-tab-${tabId}`);
        if (activeBtn) activeBtn.classList.add('active');

        tabContent.innerHTML = '';
        if (tabId === 'vrimmel') renderTabVrimmel(tabContent);
        else if (tabId === 'kognitiv') renderTabKognitiv(tabContent);
        else if (tabId === 'traening2') renderTabTraening2(tabContent);
        else if (tabId === 'detektiv') renderTabDetektiv(tabContent);
        else if (tabId === 'vendemaskine') renderTabVendemaskine(tabContent);
        else if (tabId === 'builder') renderTabBuilder(tabContent);
    }

    // ==========================================
    // TAB 1: VRIMLEBILLEDET
    // ==========================================
    let activeFilter = 'alle';
    let isPureMode = false;
    let selectedWord = FORDI_DERFOR_DATA[0];

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
            { id: 'alle', label: 'Alle scener (10)' },
            { id: 'fordi', label: '⛽ FORDI: Årsagen i ledsætning (5)' },
            { id: 'derfor', label: '➡️ DERFOR: Virkningen med Inversion (5)' }
        ].forEach(f => {
            const b = document.createElement('button');
            b.className = `filter-btn ${activeFilter === f.id ? 'active' : ''}`;
            b.textContent = f.label;
            b.onclick = () => {
                activeFilter = f.id;
                const vis = FORDI_DERFOR_DATA.filter(x => activeFilter === 'alle' || x.category === activeFilter);
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
        stage.innerHTML = `<img src="${baseUrl}assets/fordi_derfor_vrimmel.jpg" alt="Fordi og Derfor Vrimlebillede" class="vrimmel-img" />`;

        const visibleWords = FORDI_DERFOR_DATA.filter(item => activeFilter === 'alle' || item.category === activeFilter);

        visibleWords.forEach((item, idx) => {
            const pin = document.createElement('div');
            const pinColorClass = item.category === 'fordi' ? 'pin-fordi' : 'pin-derfor';
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
                        <div style="font-size:0.75rem; font-weight:800; color:#7dd3fc; text-transform:uppercase;">🌍 MÅLORDSPRÆSENTATION (${currentLang})</div>
                        <div style="font-size:1.3rem; font-weight:800; color:white; margin-top:0.2rem;">${trans.word}</div>
                        <div style="color:#94a3b8; font-size:0.9rem; margin-top:0.2rem;">${item.meaning}</div>
                    </div>
                    <div class="inspector-scene-box">
                        <div style="font-size:0.8rem; font-weight:800; color:#94a3b8; text-transform:uppercase;">📍 I Vrimlebilledet</div>
                        <p style="color:#cbd5e1; margin:0.3rem 0 0;">${item.sceneDesc}</p>
                    </div>
                </div>
                <div class="inspector-right">
                    <div class="inspector-sentence-card">
                        <div style="font-size:0.75rem; font-weight:800; color:#7dd3fc; margin-bottom:0.3rem;">💬 EKSEMPELSÆTNINGER</div>
                        <div style="font-size:1.25rem; font-weight:800; color:white; margin-bottom:0.4rem;">"${item.sentence}"</div>
                        <div style="font-size:1rem; color:#cbd5e1; font-style:italic; margin-bottom:0.5rem;">"${item.contextSentence}"</div>
                        ${trans.sentence ? `<div style="color:#fde68a; font-size:0.92rem; margin-bottom:0.7rem;">🌍 "${trans.sentence}"</div>` : ''}
                        <button class="inspector-speak-btn" id="fd-speak-btn">🔊 Lyt til udtale</button>
                    </div>
                    <div class="inspector-scene-box" style="border-left:3px solid #f97316;">
                        <div style="font-size:0.8rem; font-weight:800; color:#fdba74;">🧭 Kognitiv & Grammatisk Regel</div>
                        <p style="color:#cbd5e1; margin:0.3rem 0 0;">${item.ruleHint}</p>
                    </div>
                    <div style="display:flex; gap:0.8rem;">
                        <button class="inspector-btn-action" id="fd-prev">⬅ Forrige</button>
                        <button class="inspector-btn-action" id="fd-next" style="background:#0284c7;">Næste ➔</button>
                    </div>
                </div>
            `;

            inspector.querySelector('#fd-speak-btn').onclick = () => speakDanish(item.contextSentence);
            inspector.querySelector('#fd-prev').onclick = () => {
                const i = visibleWords.findIndex(w => w.id === item.id);
                const prev = visibleWords[(i - 1 + visibleWords.length) % visibleWords.length];
                updateInspector(prev, false);
                speakDanish(prev.sentence);
            };
            inspector.querySelector('#fd-next').onclick = () => {
                const i = visibleWords.findIndex(w => w.id === item.id);
                const next = visibleWords[(i + 1) % visibleWords.length];
                updateInspector(next, false);
                speakDanish(next.sentence);
            };
            if (scroll) inspector.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        updateInspector(selectedWord, false);
    }

    // ==========================================
    // TAB 2: ÅRSAG & VIRKNING + ORDSTILLING
    // ==========================================
    function renderTabKognitiv(parent) {
        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#7dd3fc; margin-top:0;">🔬 Fordi vs. Derfor: Kognitiv Retning & Ordstilling</h2>
            <div style="text-align:center; margin:1.2rem 0;">
                <img src="${baseUrl}fordi_derfor_guide.png" alt="Fordi vs Derfor" style="max-width:680px; width:100%; border-radius:18px; border:2px solid #38bdf8; background:white;" />
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.3rem; margin:1.8rem 0;">
                <div style="background:#0f172a; padding:1.5rem; border-radius:16px; border:2px solid #0284c7;">
                    <h4 style="color:#7dd3fc; margin-top:0;">⛽ FORDI = Ledsætningskonjunktion (Årsagen)</h4>
                    <p style="color:#cbd5e1; line-height:1.55;">
                        <strong>Virkning + FORDI ➔ Årsag:</strong> Ordet <em>fordi</em> introducerer selve årsagen og laver en <strong>ledsætning</strong>:
                    </p>
                    <ul style="color:#cbd5e1; line-height:1.6; padding-left:1.2rem;">
                        <li><strong>Ordstilling:</strong> Subjekt + <span style="color:#22d3ee; font-weight:800;">ikke</span> + Verbum!</li>
                        <li><em>"Han er træt, <strong>fordi</strong> <span style="color:#86efac;">han</span> <span style="color:#22d3ee;">ikke</span> <span style="color:#fca5a5;">sov</span> i nat."</em></li>
                    </ul>
                </div>

                <div style="background:#0f172a; padding:1.5rem; border-radius:16px; border:2px solid #ea580c;">
                    <h4 style="color:#fdba74; margin-top:0;">➡️ DERFOR = Konnektivt Adverbium (Virkningen)</h4>
                    <p style="color:#cbd5e1; line-height:1.55;">
                        <strong>Årsag. DERFOR ➔ Virkning:</strong> Ordet <em>derfor</em> konkluderer på årsagen og skubber frem mod virkningen med <strong>Inversion</strong>:
                    </p>
                    <ul style="color:#cbd5e1; line-height:1.6; padding-left:1.2rem;">
                        <li><strong>Ordstilling i front:</strong> Derfor + <span style="color:#fca5a5; font-weight:800;">Verbum</span> + <span style="color:#86efac; font-weight:800;">Subjekt</span>!</li>
                        <li><em>"Han sov ikke i nat. <strong>Derfor</strong> <span style="color:#fca5a5;">er</span> <span style="color:#86efac;">han</span> træt."</em></li>
                    </ul>
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
            quote: '"Jeg har en paraply med, ______ det regner."',
            options: ['fordi', 'derfor'],
            correct: 'fordi',
            explanation: '⛽ Korrekt! Regnen er selve årsagen til, at du har paraply med (Virkning + FORDI ➔ Årsag).'
        },
        {
            quote: '"Det regner, ______ har jeg en paraply med."',
            options: ['derfor', 'fordi'],
            correct: 'derfor',
            explanation: '➡️ Korrekt! Regnen er årsagen, og "derfor" skubber frem mod virkningen (med inversion: "har jeg")!'
        },
        {
            quote: '"Han er træt, ______ han ikke sov i nat."',
            options: ['fordi', 'derfor'],
            correct: 'fordi',
            explanation: '⛽ Korrekt! Søvnmanglen ("han ikke sov i nat") er årsagen, og "ikke" står før verbet i ledsætningen!'
        },
        {
            quote: '"Han sov ikke i nat, ______ er han træt."',
            options: ['derfor', 'fordi'],
            correct: 'derfor',
            explanation: '➡️ Korrekt! Søvnmanglen er nævnt først – nu følger konsekvensen med "derfor er han træt"!'
        },
        {
            quote: '"Vi bliver hjemme, ______ vi vil slappe af."',
            options: ['fordi', 'derfor'],
            correct: 'fordi',
            explanation: '⛽ Korrekt! Ønsket om at slappe af er årsagen til, at vi bliver hjemme.'
        },
        {
            quote: '"Jeg kom for sent, ______ bussen var aflyst."',
            options: ['fordi', 'derfor'],
            correct: 'fordi',
            explanation: '⛽ Korrekt! At bussen var aflyst er årsagen, der kommer efter "fordi".'
        },
        {
            quote: '"Bussen var aflyst. ______ kom jeg for sent."',
            options: ['Derfor', 'Fordi'],
            correct: 'Derfor',
            explanation: '➡️ Korrekt! "Derfor" konkluderer på det, vi lige har hørt, og udløser inversion ("kom jeg").'
        },
        {
            quote: '"I dag sner det meget i byen. ______ cykler Peter langsomt."',
            options: ['Derfor', 'Fordi'],
            correct: 'Derfor',
            explanation: '➡️ Korrekt! Sneen er årsagen – at han cykler langsomt er virkningen ("Derfor cykler Peter...").'
        }
    ];

    function renderTabTraening2(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `
            <div style="text-align:center; margin-bottom:1.5rem;">
                <h2 style="color:#7dd3fc; margin:0 0 0.5rem;">➡️ Træning 2: Fordi eller Derfor? (Med Kognitiv Illustration)</h2>
                <img src="${baseUrl}fordi_derfor_guide.png" alt="Fordi vs Derfor guide" style="max-width:600px; width:100%; border-radius:16px; border:2px solid #38bdf8; margin:0.6rem auto; display:block; background:white;" />
                <p style="color:#cbd5e1; max-width:720px; margin:0.5rem auto 0;">
                    <em>⛽ <strong>'Fordi'</strong> introducerer årsagen til det skete. ➡️ <strong>'Derfor'</strong> skubber handlingen frem mod virkningen/konsekvensen.</em>
                </p>
            </div>
            <div id="fd-t2-list"></div>
        `;
        parent.appendChild(box);
        const list = box.querySelector('#fd-t2-list');

        T2_QUESTIONS.forEach((q, idx) => {
            const card = document.createElement('div');
            card.className = 'detektiv-card';
            card.innerHTML = `
                <div style="font-size:0.82rem; font-weight:800; color:#7dd3fc; margin-bottom:0.4rem;">OPGAVE ${idx + 1} AF ${T2_QUESTIONS.length}</div>
                <div style="font-size:1.3rem; font-weight:800; color:white; margin-bottom:1rem;">${q.quote}</div>
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
                    fb.textContent = ok ? q.explanation : '⚠️ Se på illustrationen: Kommer ÅRSAGEN efter hullet (➔ fordi), eller kommer VIRKNINGEN efter hullet (➔ derfor)?';
                    if (ok) speakDanish(q.quote.replace('______', q.correct).replace(/"/g, ''));
                };
            });
            list.appendChild(card);
        });
    }

    // ==========================================
    // TAB 4: DETEKTIVEN (8 GÅDER)
    // ==========================================
    const DETEKTIV_QUESTIONS = [
        {
            tag: 'Gåde 1 • Kig på placeringen af "ikke"!',
            quote: '"Hun kunne ikke klippe græsset i parken, ______ jorden ikke var tør endnu."',
            options: ['fordi', 'derfor', 'for'],
            correct: 'fordi',
            explanation: '🌟 Skarpt set! Både betydningen (årsag) og ordstillingen ("jorden ikke var" = "ikke" FØR verbet) viser, at det SKAL være "fordi"!'
        },
        {
            tag: 'Gåde 2 • Kig på Inversionen efter hullet!',
            quote: '"Jorden var alt for blød og våd efter regnen. ______ arbejdede Anna inde i drivhuset."',
            options: ['Derfor', 'Fordi', 'Så'],
            correct: 'Derfor',
            explanation: '🌟 Lige i øjet! Her kommer virkningen, og verbet står FØR subjektet ("arbejdede Anna" = Inversion) ➔ "Derfor"!'
        },
        {
            tag: 'Gåde 3 • Ordstilling efter "fordi"',
            quote: '"Peter er meget kold på cyklen, fordi han ______ sine varme handsker."',
            options: ['ikke har husket', 'har ikke husket'],
            correct: 'ikke har husket',
            explanation: '🌟 Korrekt! I en "fordi"-ledsætning står "ikke" altid FØR det bøjede verbum ("ikke har husket")!'
        },
        {
            tag: 'Gåde 4 • Ordstilling efter "Derfor"',
            quote: '"Det er sommer og solskin i dag. Derfor ______ ekstra travlt på caféen."',
            options: ['har Lars', 'Lars har'],
            correct: 'har Lars',
            explanation: '🌟 Fuldstændig rigtigt! Efter "Derfor" i starten af sætningen kommer verbet FØR subjektet ("Derfor har Lars...")!'
        },
        {
            tag: 'Gåde 5 • Fordi (ledsætning) vs. For (helsætning)',
            quote: '"Jeg tager en tyk trøje på, ______ varmen virker ikke på kontoret i dag."',
            options: ['for (helsætning: virker ikke)', 'fordi (ledsætning: ikke virker)'],
            correct: 'for (helsætning: virker ikke)',
            explanation: '🌟 Mester-detalje! Fordi der står "virker ikke" (verbum FØR ikke), er det en helsætning med "for"! Med "fordi" skulle det hedde "... fordi varmen ikke virker".'
        },
        {
            tag: 'Gåde 6 • Derfor (med inversion) vs. Så (uden inversion)',
            quote: '"Køleskabet var helt tomt, ______ jeg gik ned i supermarkedet."',
            options: ['så (+ Subjekt + Verbum)', 'derfor (+ Verbum + Subjekt)'],
            correct: 'så (+ Subjekt + Verbum)',
            explanation: '🌟 Gennemskuet! Fordi der står "jeg gik" (Subjekt før Verbum), er det helsætningskonjunktionen "så". Med "derfor" skulle det hedde "... derfor gik jeg"!'
        }
    ];

    function renderTabDetektiv(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `<h2 style="text-align:center; color:#7dd3fc; margin-top:0;">🔍 Årsag/Virkning-Detektiven & Ordstillings-Spor</h2><div id="fd-det-list"></div>`;
        parent.appendChild(box);
        const list = box.querySelector('#fd-det-list');

        DETEKTIV_QUESTIONS.forEach(q => {
            const card = document.createElement('div');
            card.className = 'detektiv-card';
            card.innerHTML = `
                <div style="font-size:0.8rem; font-weight:800; color:#fdba74; margin-bottom:0.4rem;">${q.tag}</div>
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
    // TAB 5: SÆTNINGS-VENDEMASKINEN (FORDI ↔ DERFOR)
    // ==========================================
    const FLIP_QUESTIONS = [
        {
            original: '⛽ Original med FORDI: "Jeg kom for sent, fordi bussen var aflyst."',
            prompt: 'Vend nu sætningen om, så vi bruger DERFOR (Årsag først ➔ Derfor + Virkning med Inversion):',
            options: [
                'Bussen var aflyst. Derfor kom jeg for sent.',
                'Bussen var aflyst. Derfor jeg kom for sent.',
                'Jeg kom for sent. Derfor bussen var aflyst.'
            ],
            correct: 'Bussen var aflyst. Derfor kom jeg for sent.',
            explanation: '🌟 Perfekt vendt! Årsagen ("Bussen var aflyst") kommer først, og derefter følger virkningen med inversion ("Derfor kom jeg for sent")!'
        },
        {
            original: '➡️ Original med DERFOR: "Han sov ikke i nat. Derfor er han træt."',
            prompt: 'Vend nu sætningen om til én sætning med FORDI (og pas på placeringen af "ikke"!):',
            options: [
                'Han er træt, fordi han ikke sov i nat.',
                'Han er træt, fordi han sov ikke i nat.',
                'Han sov ikke i nat, fordi han er træt.'
            ],
            correct: 'Han er træt, fordi han ikke sov i nat.',
            explanation: '🌟 Lige i øjet! Virkningen ("Han er træt") står først, og i "fordi"-ledsætningen rykker "ikke" frem FØR verbet ("fordi han ikke sov")!'
        },
        {
            original: '⛽ Original med FORDI: "Vi bliver hjemme i aften, fordi det regner."',
            prompt: 'Vend sætningen om, så den bruger DERFOR:',
            options: [
                'Det regner. Derfor bliver vi hjemme i aften.',
                'Det regner. Derfor vi bliver hjemme i aften.',
                'Vi bliver hjemme i aften. Derfor regner det.'
            ],
            correct: 'Det regner. Derfor bliver vi hjemme i aften.',
            explanation: '🌟 Mesterligt! Regnen er årsagen, og "Derfor bliver vi hjemme" er virkningen med korrekt inversion!'
        }
    ];

    function renderTabVendemaskine(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `
            <h2 style="text-align:center; color:#fdba74; margin-top:0;">🔄 Sætnings-Vendemaskinen: Vend mellem Fordi og Derfor</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:740px; margin:0 auto 1.5rem;">
                Når du vender en <strong><em>fordi</em></strong>-sætning til en <strong><em>derfor</em></strong>-sætning, bytter <strong>Årsag</strong> og <strong>Virkning</strong> plads – og ordstillingen skifter fra ledsætning til inversion!
            </p>
            <div id="flip-list"></div>
        `;
        parent.appendChild(box);
        const list = box.querySelector('#flip-list');

        FLIP_QUESTIONS.forEach(q => {
            const card = document.createElement('div');
            card.className = 'detektiv-card';
            card.innerHTML = `
                <div style="font-size:1.1rem; font-weight:800; color:#7dd3fc; margin-bottom:0.5rem;">${q.original}</div>
                <div style="color:#cbd5e1; margin-bottom:1rem;">${q.prompt}</div>
                <div style="display:grid; gap:0.7rem;">
                    ${q.options.map(o => `<button class="detektiv-opt-btn" data-o="${o}" style="text-align:left;">${o}</button>`).join('')}
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
                    fb.textContent = ok ? q.explanation : '⚠️ Tjek både hvad der er årsag/virkning OG ordstillingen!';
                    if (ok) speakDanish(q.correct);
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
            title: 'Puslespil 1 • ⛽ Fordi-ledsætning med "ikke" FØR verbet',
            hint: 'Start med virkningen ("Han er træt,"), og byg derefter årsagen med "fordi" (Husk: Subjekt + ikke + Verbum!):',
            correct: ['Han er træt,', 'fordi', 'han', 'ikke sov i nat.']
        },
        {
            title: 'Puslespil 2 • ➡️ Derfor-sætning med INVERSION',
            hint: 'Start med årsagen ("Han sov ikke i nat."), og byg derefter virkningen med "Derfor" (Husk: Verbum FØR Subjekt!):',
            correct: ['Han sov ikke i nat.', 'Derfor', 'er', 'han træt.']
        },
        {
            title: 'Puslespil 3 • ➡️ Derfor ved aflyst bus',
            hint: 'Start med "Bussen var aflyst. Derfor", og sæt verbet før subjektet:',
            correct: ['Bussen var aflyst.', 'Derfor', 'kom', 'jeg for sent.']
        }
    ];

    function renderTabBuilder(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `<h2 style="text-align:center; color:#7dd3fc; margin-top:0;">🧩 Sætningsbyggeren: Fordi vs. Derfor</h2><div id="fd-puz-list"></div>`;
        parent.appendChild(box);
        const list = box.querySelector('#fd-puz-list');

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
                    <div style="min-height:56px; background:#1e293b; border:2px dashed #38bdf8; border-radius:12px; padding:0.8rem; display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center; margin-bottom:1rem;">
                        ${placed.length === 0 ? '<span style="color:#64748b;">Klik på brikkerne herunder i den rigtige rækkefølge...</span>' : placed.map((w, idx) => `<button class="detektiv-opt-btn" data-rm="${idx}" style="padding:0.5rem 0.9rem; font-size:1rem; background:#0284c7;">${w}</button>`).join('')}
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
                        if (placed.length === p.correct.length && placed.every((w, i) => w === p.correct[i])) {
                            speakDanish(p.correct.join(' '));
                        }
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
