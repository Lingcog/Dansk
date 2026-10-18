import { getTranslation, getLang } from '../utils/i18n.js';
import { getAdverbWordTranslation } from '../utils/top100_adverbier_translations.js';

/**
 * AdverbierKonnektionView - Felt 7: Konnektion & Tekstbindere (Konnektive Adverbier)
 *
 * 20 højfrekvente konnektive adverbier (100% fri for ægte konjunktioner):
 * Gruppe 1 (Årsag, Følge & Begrundelse):
 *  1. derfor (følge / resultat)
 *  2. nemlig (begrundelse / forklaring – står altid inde i sætningen)
 *  3. altså (logisk konklusion / opsamling)
 *  4. således (formel følge eller måde)
 *  5. dermed (direkte konsekvens af det foregående)
 *
 * Gruppe 2 (Modsætning, Kontrast & Indrømmelse):
 *  6. alligevel (på trods af forhindring)
 *  7. dog (blød kontrast inde i sætningen)
 *  8. derimod (direkte kontrast mellem A og B)
 *  9. til gengæld (kompensation / positiv modvægt)
 * 10. tværtimod (180 graders modsigelse af noget negativt)
 *
 * Gruppe 3 (Tilføjelse & Emneskift):
 * 11. desuden (ekstra argument oveni)
 * 12. også (simpel tilføjelse)
 * 13. endda (overraskende / ekstrem tilføjelse - "even")
 * 14. i øvrigt (sidebemærkning eller emneskift)
 * 15. for resten (uformelt tankespring - "by the way")
 *
 * Gruppe 4 (Alternativ, Forbehold & Opsamling):
 * 16. ellers (konsekvens hvis ikke)
 * 17. i stedet (erstatning / alternativt valg)
 * 18. i hvert fald (minimumsgaranti / sikkerhed)
 * 19. i det mindste (trøst / minimumskrav)
 * 20. kort sagt (opsamling / konklusion)
 *
 * 8 didaktiske tabs:
 * 1. Byens Knudepunkt (Vrimlebilledet - 20 hotspots, filtre & målordspræsentation)
 * 2. Brobygger-Værkstedet (Inversions-Motoren vs. Midterpladsen, De 4 Bro-typer & Pas på Tvillingen)
 * 3. Logik-Detektiven (10 gåder om logiske sammenhænge mellem sætninger)
 * 4. Sætningsbyggeren & Puslespillet (Træner både Inversion med adverbium i front og Centralplads)
 * 5. Kontekst-testen (14 autentiske hverdagsdialoger)
 * 6. Årsag & Følge: Derfor, nemlig, altså & dermed ⚡ (8 øvelser)
 * 7. Kontrast-Mesteren: Alligevel, derimod, til gengæld & tværtimod ⚖️ (8 øvelser)
 * 8. Alternativ & Forbehold: Ellers, i stedet, i hvert fald & i det mindste 🛡️ (10 øvelser)
 */
export function renderAdverbierKonnektionView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adverbier-konnektion-view';

    // Top Bar with back button & bridge to Konjunktioner
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.flexWrap = 'wrap';
    topBar.style.gap = '0.8rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('top100_adverbier');
    topBar.appendChild(backBtn);

    const konjBtn = document.createElement('button');
    konjBtn.className = 'back-btn';
    konjBtn.style.background = 'rgba(16, 185, 129, 0.18)';
    konjBtn.style.borderColor = '#10b981';
    konjBtn.style.color = '#6ee7b7';
    konjBtn.innerHTML = `🌉 Gå til Konjunktioner-fladen (og, men, fordi, når/da & ordet "AT") ➔`;
    konjBtn.onclick = () => navigateFn('top_konjunktioner');
    topBar.appendChild(konjBtn);

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

    // 20 Words Data for Felt 7
    const ADVERBIER_KONNEKTION_DATA = [
        // GRUPPE 1: Årsag, Følge & Begrundelse
        {
            id: 'derfor',
            word: 'derfor',
            category: 'aarsag',
            x: 10,
            y: 36,
            meaning: 'Af den grund / som følge heraf (Resultat)',
            sceneDesc: 'Det styrter ned fra de mørke skyer. Derfor slår manden sin gule paraply op og går ind i busskuret.',
            sentence: 'Det regner. Derfor tager jeg bussen.',
            contextSentence: 'Det begyndte pludselig at øsregne over torvet. Derfor slog han paraplyen op og søgte læ.',
            ruleHint: 'Peger frem på RESULTATET. Står ofte forrest i sætningen og udløser INVERSION (Derfor + Verbum + Subjekt), eller inde efter verbet ("Jeg tager derfor bussen").',
            translations: {
                en: { word: 'therefore / for that reason', sentence: 'It suddenly started pouring rain. Therefore, he opened his umbrella and sought shelter.' },
                de: { word: 'deshalb / daher / darum', sentence: 'Es begann plötzlich stark zu regnen. Deshalb spannte er seinen Schirm auf.' },
                es: { word: 'por eso / por lo tanto', sentence: 'De repente empezó a llover a cántaros. Por eso abrió el paraguas.' },
                ar: { word: 'لذلك / لهذا السبب', sentence: 'بدأت تمطر بغزارة فجأة. لذلك فتح مظلته واحتمى في الموقف.' },
                tr: { word: 'bu yüzden / dolayısıyla', sentence: 'Aniden bardaktan boşanırcasına yağmur başladı. Bu yüzden şemsiyesini açtı.' },
                uk: { word: 'тому / через це', sentence: 'Раптом почалася сильна злива. Тому він розкрив парасольку і сховався.' }
            }
        },
        {
            id: 'nemlig',
            word: 'nemlig',
            category: 'aarsag',
            x: 37,
            y: 63,
            meaning: 'Forklaring / årsag (Står ALTID inde i sætningen)',
            sceneDesc: 'Kvinden i caféen peger på kollegaens skærm: "Han drikker stærk kaffe. Han skal nemlig aflevere rapporten i morgen."',
            sentence: 'Jeg bliver hjemme. Jeg er nemlig syg.',
            contextSentence: 'Jeg kan ikke gå med i biografen i aften. Jeg skal nemlig arbejde på et vigtigt projekt.',
            ruleHint: 'Giver ÅRSAGEN i en ny helsætning. VIGTIGT: "Nemlig" kan ALDRIG stå forrest! Det står altid inde i sætningen lige efter verbet.',
            translations: {
                en: { word: 'because / you see / namely', sentence: 'I cannot go to the cinema tonight. You see, I have to work on an important project.' },
                de: { word: 'nämlich', sentence: 'Ich kann heute Abend nicht mit ins Kino kommen. Ich muss nämlich an einem Projekt arbeiten.' },
                es: { word: 'es que / pues / a saber', sentence: 'No puedo ir al cine esta noche. Es que tengo que trabajar en un proyecto importante.' },
                ar: { word: 'لأنني في الواقع / إذ إن', sentence: 'لا أستطيع الذهاب إلى السينما الليلة. فأنا في الواقع مضطر للعمل على مشروع مهم.' },
                tr: { word: 'çünkü (cümle içinde) / zira', sentence: 'Bu akşam sinemaya gelemem. Zira önemli bir proje üzerinde çalışmam gerekiyor.' },
                uk: { word: 'адже / бо (всередині речення)', sentence: 'Я не можу піти в кіно сьогодні ввечері. Адже я маю працювати над важливим проєктом.' }
            }
        },
        {
            id: 'altsaa',
            word: 'altså',
            category: 'aarsag',
            x: 25,
            y: 58,
            meaning: 'Logisk konklusion / med andre ord',
            sceneDesc: 'Stationsuret viser over otte, og toget ruller ud. Vi er altså kommet for sent!',
            sentence: 'Klokken er otte. Vi er altså for sent på den.',
            contextSentence: 'Toget kører klokken otte, og uret viser ti minutter over. Vi er altså kommet for sent.',
            ruleHint: 'Drager en logisk konklusion ud fra de fakta, vi lige har set eller hørt.',
            translations: {
                en: { word: 'so / thus / in other words', sentence: 'The train leaves at eight, and the clock shows ten past. So we are late.' },
                de: { word: 'also / folglich', sentence: 'Der Zug fährt um acht, und es ist zehn nach. Wir sind also zu spät.' },
                es: { word: 'así que / por consiguiente', sentence: 'El tren sale a las ocho y el reloj marca las ocho y diez. Así que llegamos tarde.' },
                ar: { word: 'إذن / وبالتالي', sentence: 'يغادر القطار الساعة الثامنة، والساعة الآن الثامنة وعشر دقائق. نحن إذن متأخرون.' },
                tr: { word: 'yani / demek ki', sentence: 'Tren sekizde kalkıyor ve saat sekizi on geçiyor. Demek ki geç kaldık.' },
                uk: { word: 'отже / тобто', sentence: 'Потяг вирушає о восьмій, а на годиннику десята хвилина дев\'ятої. Отже, ми запізнилися.' }
            }
        },
        {
            id: 'saaledes',
            word: 'således',
            category: 'aarsag',
            x: 89,
            y: 53,
            meaning: 'På denne måde / som følge heraf (Formelt)',
            sceneDesc: 'Kontrakten ligger underskrevet på skrivebordet, og således er aftalen nu juridisk gældende.',
            sentence: 'Begge skrev under, og således blev aftalen indgået.',
            contextSentence: 'Begge parter underskrev dokumentet på kontoret, og således faldt alle detaljer på plads.',
            ruleHint: 'Betyder "på den måde" eller "derfor". Bruges især i skriftsprog, nyheder og formelle præsentationer.',
            translations: {
                en: { word: 'thus / in this way', sentence: 'Both parties signed the document at the office, and thus all details fell into place.' },
                de: { word: 'somit / auf diese Weise', sentence: 'Beide Parteien unterschrieben das Dokument, und somit war alles geregelt.' },
                es: { word: 'así / de este modo', sentence: 'Ambas partes firmaron el documento y de este modo quedaron cerrados todos los detalles.' },
                ar: { word: 'وهكذا / وبهذه الطريقة', sentence: 'وقّع الطرفان الوثيقة في المكتب، وهكذا استقرت جميع التفاصيل.' },
                tr: { word: 'böylece / bu şekilde', sentence: 'Her iki taraf da ofiste belgeyi imzaladı ve böylece tüm detaylar netleşti.' },
                uk: { word: 'таким чином / отже', sentence: 'Обидві сторони підписали документ в офісі, і таким чином усі деталі стали на свої місця.' }
            }
        },
        {
            id: 'dermed',
            word: 'dermed',
            category: 'aarsag',
            x: 88,
            y: 42,
            meaning: 'Med det / som direkte konsekvens',
            sceneDesc: 'De to kolleger giver håndslag efter underskriften, og projektet er dermed officielt godkendt.',
            sentence: 'Han skrev under og er dermed bundet af aftalen.',
            contextSentence: 'Direktøren gav håndslag på mødet, og projektet er dermed endeligt godkendt.',
            ruleHint: 'Viser at handling A automatisk udløser resultat B ("med denne handling sker følgende").',
            translations: {
                en: { word: 'thereby / with that', sentence: 'The director shook hands at the meeting, and the project is thereby finally approved.' },
                de: { word: 'damit / hierdurch', sentence: 'Der Direktor gab in der Sitzung die Hand, und das Projekt ist damit genehmigt.' },
                es: { word: 'con ello / de esa forma', sentence: 'El director estrechó la mano en la reunión y el proyecto queda con ello aprobado.' },
                ar: { word: 'وبذلك / ومن ثَمَّ', sentence: 'تصافح المدير في الاجتماع، وبذلك تمت الموافقة النهائية على المشروع.' },
                tr: { word: 'böylelikle / bununla birlikte', sentence: 'Müdür toplantıda el sıkıştı ve proje böylelikle kesin olarak onaylandı.' },
                uk: { word: 'тим самим / отже', sentence: 'Директор потиснув руку на зустрічі, і проєкт тим самим остаточно затверджено.' }
            }
        },

        // GRUPPE 2: Modsætning, Kontrast & Indrømmelse
        {
            id: 'alligevel',
            word: 'alligevel',
            category: 'kontrast',
            x: 26,
            y: 38,
            meaning: 'På trods af det / trods forhindringen',
            sceneDesc: 'Regnen siler ned, men kvinden i den røde regnjakke cykler glad afsted alligevel!',
            sentence: 'Det regner. Alligevel tager hun cyklen.',
            contextSentence: 'Det øsregner og blæser kraftigt, men hun cykler alligevel på arbejde med et smil.',
            ruleHint: 'Bruges når man gør noget PÅ TRODS AF en forhindring. Kan stå forrest med inversion ("Alligevel cykler hun") eller efter verbet ("Hun cykler alligevel").',
            translations: {
                en: { word: 'anyway / nevertheless / still', sentence: 'It is pouring rain and windy, but she cycles to work anyway with a smile.' },
                de: { word: 'trotzdem / dennoch', sentence: 'Es gießt in Strömen, aber sie fährt trotzdem mit einem Lächeln zur Arbeit.' },
                es: { word: 'de todos modos / aun así', sentence: 'Llueve a cántaros y hace viento, pero aun así ella va al trabajo en bicicleta.' },
                ar: { word: 'ومع ذلك / على أي حال', sentence: 'إنها تمطر بغزارة والرياح قوية، ومع ذلك تذهب إلى العمل بالدراجة مبتسمة.' },
                tr: { word: 'yine de / buna rağmen', sentence: 'Şiddetli yağmur ve rüzgar var ama o yine de gülümseyerek bisikletle işe gidiyor.' },
                uk: { word: 'все одно / попри це', sentence: 'Ллє дощ і дме сильний вітер, але вона все одно їде на роботу велосипедом.' }
            }
        },
        {
            id: 'dog',
            word: 'dog',
            category: 'kontrast',
            x: 48,
            y: 20,
            meaning: 'Alligevel / men (Blød kontrast inde i sætningen)',
            sceneDesc: 'Til venstre hænger regnskyerne, men over torvet bryder solen dog igennem skyerne.',
            sentence: 'Vejret var koldt. Solen skinnede dog.',
            contextSentence: 'Morgenen startede med mørke regnskyer, men op ad formiddagen kom solen dog frem over torvet.',
            ruleHint: 'Et elegant kontrast-adverbium ("however/though"). Står næsten altid INDE i sætningen efter verbet – aldrig forrest som tekstbinder.',
            translations: {
                en: { word: 'however / though / yet', sentence: 'The morning started with dark rainclouds, but later the sun came out though.' },
                de: { word: 'jedoch / allerdings / doch', sentence: 'Der Morgen begann mit dunklen Wolken, später kam jedoch die Sonne heraus.' },
                es: { word: 'sin embargo / no obstante', sentence: 'La mañana empezó con nubes oscuras, pero más tarde salió sin embargo el sol.' },
                ar: { word: 'إلا أن / غير أن', sentence: 'بدأ الصباح بغيوم ممطرة داكنة، غير أن الشمس أشرقت لاحقًا فوق الساحة.' },
                tr: { word: 'ancak / bununla birlikte', sentence: 'Sabah kara yağmur bulutlarıyla başladı, ancak öğleye doğru güneş yüzünü gösterdi.' },
                uk: { word: 'проте / однак', sentence: 'Ранок почався з темних хмар, проте згодом над площею вийшло сонце.' }
            }
        },
        {
            id: 'derimod',
            word: 'derimod',
            category: 'kontrast',
            x: 66,
            y: 54,
            meaning: 'I modsætning hertil (Sammenligning A vs. B)',
            sceneDesc: 'Manden til venstre drikker sort kaffe ved sin laptop. Kvinden til højre drikker derimod grøn te med en bog.',
            sentence: 'Peter drikker kaffe. Maria drikker derimod te.',
            contextSentence: 'I caféens venstre side arbejder folk med sort kaffe. I højre side nyder gæsterne derimod rolig te og bøger.',
            ruleHint: 'Stiller to forskellige ting eller personer op mod hinanden (A gør X ↔ B gør derimod Y).',
            translations: {
                en: { word: 'on the other hand / by contrast', sentence: 'Peter drinks coffee. Maria, on the other hand, drinks green tea.' },
                de: { word: 'hingegen / dagegen', sentence: 'Peter trinkt Kaffee. Maria trinkt hingegen grünen Tee.' },
                es: { word: 'en cambio / por el contrario', sentence: 'Peter bebe café. María, en cambio, bebe té verde.' },
                ar: { word: 'في المقابل / على العكس من ذلك', sentence: 'يشرب بيتر القهوة. أما ماريا فتشرب في المقابل الشاي الأخضر.' },
                tr: { word: 'buna karşılık / ise', sentence: 'Peter kahve içer. Maria ise buna karşılık yeşil çay içer.' },
                uk: { word: 'натомість / з іншого боку', sentence: 'Петер п\'є каву. Марія натомість п\'є зелений чай.' }
            }
        },
        {
            id: 'til_gengaeld',
            word: 'til gengæld',
            category: 'kontrast',
            x: 81,
            y: 16,
            meaning: 'Som kompensation / som positiv modvægt',
            sceneDesc: 'På ejendomsmæglerens skilt er værelset til venstre meget lille. Til gengæld er prisen helt i bund!',
            sentence: 'Lejligheden er lille. Til gengæld er den billig.',
            contextSentence: 'Studielejligheden har kun ét lille værelse. Til gengæld er huslejen virkelig lav, så du sparer mange penge.',
            ruleHint: 'Bruges når en fordel (et lyspunkt) kompenserer og vejer op for en ulempe (eller omvendt).',
            translations: {
                en: { word: 'on the bright side / in return / to make up for it', sentence: 'The studio apartment only has one small room. In return, the rent is really low.' },
                de: { word: 'dafür / im Gegenzug', sentence: 'Die Wohnung hat nur ein kleines Zimmer. Dafür ist die Miete aber wirklich niedrig.' },
                es: { word: 'en compensación / a cambio', sentence: 'El apartamento solo tiene una habitación pequeña. A cambio, el alquiler es muy bajo.' },
                ar: { word: 'في المقابل (كتعويض إيجابي)', sentence: 'تتكون الشقة من غرفة صغيرة واحدة فقط. وفي المقابل، فإن الإيجار منخفض جدًا.' },
                tr: { word: 'buna karşılık (telafi olarak)', sentence: 'Dairenin sadece tek bir küçük odası var. Buna karşılık kirası gerçekten çok düşük.' },
                uk: { word: 'зате / натомість (як компенсація)', sentence: 'Квартира має лише одну маленьку кімнату. Зате орендна плата дуже низька.' }
            }
        },
        {
            id: 'tvaertimod',
            word: 'tværtimod',
            category: 'kontrast',
            x: 58,
            y: 78,
            meaning: 'Lige det modsatte! (180 graders afvisning)',
            sceneDesc: 'Er gæsterne ved bordet kede af regnvejret? Nej, tværtimod – de fejrer fødselsdag med stor lagkage!',
            sentence: 'Er du træt? Nej, tværtimod!',
            contextSentence: 'Mange troede at regnvejret ville ødelægge festen. Tværtimod blev stemningen i caféen endnu mere hyggelig!',
            ruleHint: 'Bruges til at afvise en (ofte negativ) påstand og sige, at det stik modsatte (180 grader modsat) er sandt.',
            translations: {
                en: { word: 'on the contrary / quite the opposite', sentence: 'Many thought the rain would ruin the party. On the contrary, the atmosphere became even cozier!' },
                de: { word: 'im Gegenteil', sentence: 'Viele dachten, der Regen würde das Fest verderben. Im Gegenteil, es wurde noch gemütlicher!' },
                es: { word: 'al contrario / todo lo contrario', sentence: 'Muchos pensaron que la lluvia arruinaría la fiesta. ¡Al contrario, el ambiente fue más acogedor!' },
                ar: { word: 'على العكس تمامًا', sentence: 'ظن الكثيرون أن المطر سيفسد الحفل. على العكس تمامًا، أصبحت الأجواء أكثر دفئًا!' },
                tr: { word: 'tam aksine / bilakis', sentence: 'Birçoğu yağmurun partiyi mahvedeceğini düşündü. Tam aksine, ortam daha da keyifli oldu!' },
                uk: { word: 'навпаки / зовсім навпаки', sentence: 'Багато хто думав, що дощ зіпсує свято. Навпаки, атмосфера стала ще затишнішою!' }
            }
        },

        // GRUPPE 3: Tilføjelse & Emneskift
        {
            id: 'desuden',
            word: 'desuden',
            category: 'tilfoejelse',
            x: 67,
            y: 26,
            meaning: 'Derudover / ovenikøbet (Ekstra argument)',
            sceneDesc: 'Torvet har gode transportforbindelser. Desuden er der en bod med frisk frugt og grønt.',
            sentence: 'Kvarteret er roligt. Desuden ligger det tæt på stationen.',
            contextSentence: 'Den nye lejlighed er lys og moderne. Desuden ligger der et hyggeligt grøntmarked lige nede på torvet.',
            ruleHint: 'Tilføjer ekstra stærke argumenter på en saglig måde ("furthermore / besides"). Giver inversion i forfeltet!',
            translations: {
                en: { word: 'furthermore / besides / moreover', sentence: 'The new apartment is bright and modern. Furthermore, there is a cozy market right on the square.' },
                de: { word: 'außerdem / zudem', sentence: 'Die neue Wohnung ist hell und modern. Außerdem gibt es einen Markt direkt am Platz.' },
                es: { word: 'además / asimismo', sentence: 'El nuevo apartamento es luminoso y moderno. Además, hay un mercado justo en la plaza.' },
                ar: { word: 'علاوة على ذلك / بالإضافة إلى ذلك', sentence: 'الشقة الجديدة مشرقة وحديثة. علاوة على ذلك، يوجد سوق لطيف في الساحة مباشرة.' },
                tr: { word: 'ayrıca / üstelik / bunun yanı sıra', sentence: 'Yeni daire aydınlık ve modern. Ayrıca hemen meydanda şirin bir pazar yeri var.' },
                uk: { word: 'крім того / до того ж', sentence: 'Нова квартира світла й сучасна. Крім того, прямо на площі є затишний ринок.' }
            }
        },
        {
            id: 'ogsaa',
            word: 'også',
            category: 'tilfoejelse',
            x: 41,
            y: 32,
            meaning: 'Tillige / med i gruppen ("also / too")',
            sceneDesc: 'Bussen kører, sporvognen kører, og cyklisterne kører også gennem byen.',
            sentence: 'Jeg drikker kaffe, og jeg vil også gerne have vand.',
            contextSentence: 'Man kan tage bussen til centrum, men man kan også tage den hurtige letbane over torvet.',
            ruleHint: 'Det mest almindelige ord for tilføjelse i hverdagsdansk. Står typisk inde i sætningen lige efter verbet.',
            translations: {
                en: { word: 'also / too / as well', sentence: 'You can take the bus to the center, but you can also take the light rail across the square.' },
                de: { word: 'auch / ebenfalls', sentence: 'Man kann den Bus ins Zentrum nehmen, aber man kann auch die Straßenbahn nehmen.' },
                es: { word: 'también', sentence: 'Puedes tomar el autobús al centro, pero también puedes tomar el tranvía por la plaza.' },
                ar: { word: 'أيضًا / كذلك', sentence: 'يمكنك ركوب الحافلة إلى المركز، ولكن يمكنك أيضًا ركوب الترام السريع عبر الساحة.' },
                tr: { word: 'da / de / ayrıca', sentence: 'Merkeze otobüsle gidebilirsiniz ama meydandan geçen tramvayı da kullanabilirsiniz.' },
                uk: { word: 'також / теж', sentence: 'Можна поїхати автобусом до центру, але можна також скористатися трамваєм.' }
            }
        },
        {
            id: 'endda',
            word: 'endda',
            category: 'tilfoejelse',
            x: 51,
            y: 63,
            meaning: 'Ovenikøbet / helt op til (Overraskende bonus)',
            sceneDesc: 'Kokken serverer ikke bare en lækker fiskeret – han har endda bagt en kæmpe lagkage med lys!',
            sentence: 'Han lavede middag og bagte endda en kage!',
            contextSentence: 'Kokken i Café Station lavede en fantastisk hovedret, og han kom endda ind med en gratis fødselsdagslagkage!',
            ruleHint: 'Fremhæver noget overraskende eller ekstraordinært, der overgår forventningerne ("even").',
            translations: {
                en: { word: 'even (surprising addition)', sentence: 'The chef made a fantastic main course, and he even brought out a birthday cake!' },
                de: { word: 'sogar', sentence: 'Der Koch machte ein tolles Hauptgericht, und er brachte sogar eine Geburtstagstorte herein!' },
                es: { word: 'incluso / hasta', sentence: 'El chef preparó un plato principal fantástico, ¡e incluso trajo un pastel de cumpleaños!' },
                ar: { word: 'حتى إنه / بل وحتى', sentence: 'أعدّ الطاهي طبقًا رئيسيًا رائعًا، بل وحتى أحضر كعكة عيد ميلاد مجانية!' },
                tr: { word: 'hatta / bile', sentence: 'Şef harika bir ana yemek yaptı, hatta ücretsiz bir doğum günü pastası bile getirdi!' },
                uk: { word: 'навіть', sentence: 'Шеф-кухар приготував чудову основну страву і навіть виніс святковий торт!' }
            }
        },
        {
            id: 'i_oevrigt',
            word: 'i øvrigt',
            category: 'tilfoejelse',
            x: 71,
            y: 74,
            meaning: 'For øvrigt / som ekstra bemærkning',
            sceneDesc: 'Manden i døren tilføjer i forbifarten: "I øvrigt var mødet på 1. sal en stor succes."',
            sentence: 'I øvrigt skal jeg hilse fra din bror.',
            contextSentence: 'Tak for kaffen i dag! I øvrigt må du endelig sige til, hvis du får brug for hjælp til flytningen.',
            ruleHint: 'Bruges til at skifte emne blødt eller tilføje en sidebemærkning, inden man slutter samtalen.',
            translations: {
                en: { word: 'by the way / incidentally / besides', sentence: 'Thanks for coffee today! Incidentally, let me know if you need help moving.' },
                de: { word: 'übrigens / im Übrigen', sentence: 'Danke für den Kaffee heute! Übrigens, sag Bescheid, wenn du Hilfe beim Umzug brauchst.' },
                es: { word: 'por cierto / además', sentence: '¡Gracias por el café de hoy! Por cierto, avísame si necesitas ayuda con la mudanza.' },
                ar: { word: 'بالمناسبة / فضلًا عن ذلك', sentence: 'شكرًا على القهوة اليوم! بالمناسبة، أخبرني إذا كنت بحاجة إلى مساعدة في الانتقال.' },
                tr: { word: 'bu arada / ayrıca', sentence: 'Bugünkü kahve için teşekkürler! Bu arada, taşınma için yardıma ihtiyacın olursa haber ver.' },
                uk: { word: 'до речі / між іншим', sentence: 'Дякую за каву сьогодні! Між іншим, обов\'язково кажи, якщо потрібна допомога з переїздом.' }
            }
        },
        {
            id: 'for_resten',
            word: 'for resten',
            category: 'tilfoejelse',
            x: 78,
            y: 74,
            meaning: 'Hov, jeg kom lige i tanke om! (Uformelt emneskift)',
            sceneDesc: 'Kvinden ved døren vender sig pludselig om med løftet finger: "For resten, har du set mine bilnøgler?"',
            sentence: 'For resten, hvornår starter mødet i morgen?',
            contextSentence: 'Vi ses i morgen tidlig! Hov, for resten – husker du at tage projektoplægget med?',
            ruleHint: 'Meget almindeligt i mundtlig dialog, når man pludselig kommer i tanke om noget nyt på falderebet.',
            translations: {
                en: { word: 'by the way / oh, before I forget', sentence: 'See you tomorrow morning! Oh, by the way – will you remember to bring the project draft?' },
                de: { word: 'übrigens / apropos', sentence: 'Bis morgen früh! Ach, übrigens – denkst du daran, den Projektentwurf mitzubringen?' },
                es: { word: 'por cierto / a propósito', sentence: '¡Nos vemos mañana! Ah, por cierto, ¿recuerdas traer el borrador del proyecto?' },
                ar: { word: 'على فكرة / بالمناسبة', sentence: 'أراك غدًا صباحًا! آه، على فكرة – هل ستتذكر إحضار مسودة المشروع؟' },
                tr: { word: 'ha bu arada / aklıma gelmişken', sentence: 'Yarın sabah görüşürüz! Ha bu arada, proje taslağını getirmeyi unutmazsın değil mi?' },
                uk: { word: 'до речі / згадав', sentence: 'До завтрашнього ранку! Ой, до речі – не забудеш взяти чернетку проєкту?' }
            }
        },

        // GRUPPE 4: Alternativ, Forbehold & Opsamling
        {
            id: 'ellers',
            word: 'ellers',
            category: 'alternativ',
            x: 28,
            y: 73,
            meaning: 'Hvis ikke, så... (Advarsel om konsekvens)',
            sceneDesc: 'Manden i jakkesæt løber alt hvad han kan mod toget: "Jeg må løbe! Ellers når jeg ikke toget!"',
            sentence: 'Skynd dig! Ellers kommer vi for sent.',
            contextSentence: 'Du bliver nødt til at løbe ned mod perronen nu. Ellers kører morgentoget uden dig!',
            ruleHint: 'Betyder "hvis det ikke sker, så...". Udløser altid INVERSION, når det står forrest: "Ellers + kommer + vi for sent."',
            translations: {
                en: { word: 'otherwise / or else', sentence: 'You have to run toward the platform now. Otherwise, the morning train will leave without you!' },
                de: { word: 'sonst / andernfalls', sentence: 'Du musst jetzt zum Bahnsteig rennen. Sonst fährt der Morgenzug ohne dich ab!' },
                es: { word: 'de lo contrario / si no', sentence: 'Tienes que correr hacia el andén ahora. ¡De lo contrario, el tren se irá sin ti!' },
                ar: { word: 'وإلا / غير ذلك', sentence: 'عليك أن تركض نحو الرصيف الآن. وإلا سيغادر قطار الصباح بدونك!' },
                tr: { word: 'yoksa / aksi takdirde', sentence: 'Şimdi perona doğru koşmalısın. Yoksa sabah treni sensiz kalkacak!' },
                uk: { word: 'інакше / а то', sentence: 'Тобі треба бігти до платформи зараз. Інакше ранковий потяг поїде без тебе!' }
            }
        },
        {
            id: 'i_stedet',
            word: 'i stedet',
            category: 'alternativ',
            x: 11,
            y: 74,
            meaning: 'Som erstatning / Plan B ("instead")',
            sceneDesc: 'Den unge mands cykeldæk er fladt. Han trækker cyklen og tager den blå bybus i stedet.',
            sentence: 'Cyklen er flad. Jeg tager bussen i stedet.',
            contextSentence: 'Mit baghjul punkterede på vej hjem. I stedet måtte jeg gå hen til stoppestedet og tage bussen.',
            ruleHint: 'Viser at Plan A blev opgivet og erstattet af Plan B. Kan stå forrest med inversion eller til sidst i sætningen.',
            translations: {
                en: { word: 'instead', sentence: 'My rear tire went flat on the way home. Instead, I had to walk to the bus stop and take the bus.' },
                de: { word: 'stattdessen', sentence: 'Mein Hinterreifen war platt. Stattdessen musste ich zur Haltestelle gehen und den Bus nehmen.' },
                es: { word: 'en su lugar / en vez de eso', sentence: 'Se me pinchó la rueda de camino a casa. En su lugar, tuve que tomar el autobús.' },
                ar: { word: 'بدلًا من ذلك', sentence: 'ثُقب إطار دراجتي في طريقي إلى المنزل. وبدلًا من ذلك، اضطررت لركوب الحافلة.' },
                tr: { word: 'bunun yerine / onun yerine', sentence: 'Eve giderken arka lastiğim patladı. Bunun yerine durağa yürüyüp otobüse binmek zorunda kaldım.' },
                uk: { word: 'замість цього / натомість', sentence: 'Моє заднє колесо пробилося дорогою додому. Замість цього довелося сісти на автобус.' }
            }
        },
        {
            id: 'i_hvert_fald',
            word: 'i hvert fald',
            category: 'alternativ',
            x: 44,
            y: 79,
            meaning: 'Under alle omstændigheder / som sikkerhed',
            sceneDesc: 'Gæsterne ved bordet har både fisk og kage: "Vi ved ikke hvornår festen slutter, men vi bliver i hvert fald mætte!"',
            sentence: 'Jeg ved ikke om vi vinder, men vi prøver i hvert fald.',
            contextSentence: 'Jeg kender ikke hele menuen i Café Station, men kagen smager i hvert fald helt fantastisk!',
            ruleHint: 'Sætter en sikker bundgrænse: Selvom man er usikker på resten, er DENNE ene ting 100% sikker.',
            translations: {
                en: { word: 'at any rate / in any case / definitely', sentence: 'I don\'t know the whole menu, but the cake at any rate tastes amazing!' },
                de: { word: 'jedenfalls / auf jeden Fall', sentence: 'Ich kenne nicht die ganze Speisekarte, aber der Kuchen schmeckt jedenfalls fantastisch!' },
                es: { word: 'en cualquier caso / de todos modos', sentence: 'No conozco todo el menú, ¡pero el pastel en cualquier caso sabe increíble!' },
                ar: { word: 'على أي حال / بكل تأكيد', sentence: 'لا أعرف القائمة بأكملها، لكن الكعكة على أي حال طعمها رائع للغاية!' },
                tr: { word: 'her halükarda / en azından kesin olarak', sentence: 'Tüm menüyü bilmiyorum ama pasta her halükarda harika görünüyor!' },
                uk: { word: 'принаймні / у будь-якому разі', sentence: 'Я не знаю всього меню, але торт у будь-якому разі смакує просто чудово!' }
            }
        },
        {
            id: 'i_det_mindste',
            word: 'i det mindste',
            category: 'alternativ',
            x: 16,
            y: 35,
            meaning: 'Som trøst / et positivt minimum',
            sceneDesc: 'Passagererne venter i regnvejret, men inde i busskuret sidder de i det mindste i tørvejr.',
            sentence: 'Det regner, men her er i det mindste tørt.',
            contextSentence: 'Bussen er desværre forsinket på grund af uvejr, men vi sidder i det mindste i læ under taget.',
            ruleHint: 'Bruges som trøst i en dårlig situation: "Alt er ikke perfekt, men vi har da dette lille lyspunkt."',
            translations: {
                en: { word: 'at least (consolation)', sentence: 'The bus is delayed due to bad weather, but at least we are sitting sheltered under the roof.' },
                de: { word: 'wenigstens / zumindest', sentence: 'Der Bus hat leider Verspätung, aber wir sitzen wenigstens im Trockenen unter dem Dach.' },
                es: { word: 'al menos / por lo menos', sentence: 'El autobús se retrasa por el mal tiempo, pero al menos estamos resguardados bajo techo.' },
                ar: { word: 'على الأقل (كمواساة)', sentence: 'الحافلة متأخرة للأسف بسبب الطقس، لكننا على الأقل نجلس تحت السقف محميين من المطر.' },
                tr: { word: 'en azından / hiç olmazsa', sentence: 'Otobüs kötü hava nedeniyle gecikti ama en azından çatının altında kuru bir yerdeyiz.' },
                uk: { word: 'щонайменше / принаймні (як втіха)', sentence: 'Автобус запізнюється через негоду, але ми принаймні сидимо під дахом у сухості.' }
            }
        },
        {
            id: 'kort_sagt',
            word: 'kort sagt',
            category: 'alternativ',
            x: 92,
            y: 76,
            meaning: 'Sammenfattende / konkluderende ("in short")',
            sceneDesc: 'Oplægsholderen ved whiteboardet peger på bro-diagrammet: "Kort sagt skaber tekstbindere sammenhæng!"',
            sentence: 'Kort sagt var kurset en stor succes.',
            contextSentence: 'Maden var god, selskabet var sjovt og musikken spillede. Kort sagt havde vi en uforglemmelig aften!',
            ruleHint: 'Opsummerer en lang forklaring i én skarp konklusion. Udløser inversion, når det står forrest!',
            translations: {
                en: { word: 'in short / briefly put', sentence: 'The food was good, the company was fun, and the music played. In short, we had an unforgettable evening!' },
                de: { word: 'kurz gesagt', sentence: 'Das Essen war gut und die Gesellschaft toll. Kurz gesagt hatten wir einen unvergesslichen Abend!' },
                es: { word: 'en resumen / en pocas palabras', sentence: 'La comida estuvo buena y la compañía divertida. ¡En resumen, tuvimos una velada inolvidable!' },
                ar: { word: 'باختصار / خلاصة القول', sentence: 'كان الطعام جيدًا والرفقة ممتعة. باختصار، قضينا أمسية لا تُنسى!' },
                tr: { word: 'kısacası / özetle', sentence: 'Yemekler güzeldi, sohbet eğlenceliydi. Kısacası unutulmaz bir akşam geçirdik!' },
                uk: { word: 'коротше кажучи / одним словом', sentence: 'Їжа була смачною, а компанія веселою. Коротше кажучи, ми провели незабутній вечір!' }
            }
        }
    ];

    // Helper for translations
    function getKonnektionTranslation(item) {
        const lang = getLang();
        const trans = getAdverbWordTranslation(item.id, 7, lang);
        if (trans && trans.meaning) {
            return { word: trans.meaning, sentence: trans.sentence || '' };
        }
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
        .adverbier-konnektion-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 5rem;
            color: #f8fafc;
        }

        /* Hero Header */
        .konnektion-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .konnektion-hero-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(234, 179, 8, 0.15);
            border: 1px solid #eab308;
            color: #fde047;
            padding: 0.4rem 1.2rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.8rem;
        }
        .konnektion-hero h1 {
            font-size: 2.6rem;
            font-weight: 900;
            margin-bottom: 0.6rem;
            background: linear-gradient(135deg, #fef08a, #eab308, #ca8a04);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .konnektion-hero p {
            color: #94a3b8;
            font-size: 1.15rem;
            max-width: 820px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }

        /* Golden Rule Banner */
        .golden-rule-banner-konnektion {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.9));
            border: 2px solid #eab308;
            border-radius: 20px;
            padding: 1.4rem 2rem;
            max-width: 980px;
            margin: 0 auto 2.5rem;
            box-shadow: 0 10px 30px rgba(234, 179, 8, 0.2);
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        .rule-icon-konnektion {
            font-size: 2.8rem;
            flex-shrink: 0;
        }
        .rule-content-konnektion h4 {
            color: #fde047;
            font-size: 1.2rem;
            font-weight: 800;
            margin-bottom: 0.35rem;
        }
        .rule-content-konnektion p {
            color: #cbd5e1;
            font-size: 0.98rem;
            line-height: 1.5;
            margin: 0;
        }
        .rule-pills-row-konnektion {
            display: flex;
            gap: 0.6rem;
            margin-top: 0.8rem;
            flex-wrap: wrap;
        }
        .rule-pill-konnektion {
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 800;
            background: rgba(234, 179, 8, 0.15);
            border: 1px solid #eab308;
            color: #fef08a;
        }

        /* Tabs Navigation */
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
            background: #ca8a04;
            color: white;
            box-shadow: 0 4px 15px rgba(234, 179, 8, 0.4);
        }

        /* Tab 1: Vrimmel Layout */
        .vrimmel-layout {
            max-width: 1050px;
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
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }
        .filter-btn:hover {
            background: #475569;
            color: white;
        }
        .filter-btn.active {
            background: #ca8a04;
            color: white;
            border-color: #eab308;
            box-shadow: 0 2px 8px rgba(234, 179, 8, 0.35);
        }
        .pure-toggle-btn {
            background: rgba(234, 179, 8, 0.15);
            border: 1px solid #eab308;
            color: #fef08a;
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
            background: #a16207;
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
            background: #ca8a04;
            border: 2.5px solid #ffffff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 0.85rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6), 0 0 15px rgba(234, 179, 8, 0.6);
            transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10;
        }
        .hotspot-pin:hover {
            transform: translate(-50%, -50%) scale(1.3);
            background: #eab308;
            box-shadow: 0 0 25px #eab308;
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
            color: #fef08a;
            border: 1px solid #eab308;
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 800;
            white-space: nowrap;
            margin-top: 4px;
            pointer-events: none;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        /* Målords Præsentationsboks under vrimlebilledet */
        .vrimmel-inspector {
            background: #1e293b;
            border: 2px solid #eab308;
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
            background: rgba(234, 179, 8, 0.2);
            border: 1px solid #eab308;
            color: #fef08a;
            padding: 0.25rem 0.75rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
        }
        .inspector-audio-btn {
            background: #ca8a04;
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
            box-shadow: 0 4px 10px rgba(234, 179, 8, 0.3);
        }
        .inspector-audio-btn:hover {
            background: #eab308;
            transform: scale(1.1);
        }
        .inspector-word-title {
            font-size: 2.2rem;
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
            border-left: 4px solid #eab308;
        }
        .trans-badge-label {
            font-size: 0.75rem;
            font-weight: 800;
            color: #fef08a;
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
            border: 1.5px solid rgba(234, 179, 8, 0.35);
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
            background: rgba(234, 179, 8, 0.15);
            border: 1px solid #eab308;
            color: #fef08a;
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
            background: #eab308;
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

        /* Tab 2: Brobygger-Værkstedet */
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
            border-color: #eab308;
            color: white;
        }
        .vaerksted-subtab-btn.active {
            background: #ca8a04;
            border-color: #fde047;
            color: white;
            box-shadow: 0 4px 15px rgba(234, 179, 8, 0.4);
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
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .word-sel-btn:hover {
            border-color: #eab308;
            color: white;
        }
        .word-sel-btn.active {
            border-color: #fde047;
            background: rgba(234, 179, 8, 0.2);
            color: #fef08a;
            box-shadow: 0 4px 15px rgba(234, 179, 8, 0.3);
        }

        .pos-toggle-row {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin: 1.5rem 0;
            flex-wrap: wrap;
        }
        .pos-toggle-btn {
            background: #0f172a;
            color: #cbd5e1;
            border: 2px solid rgba(255, 255, 255, 0.15);
            padding: 0.9rem 1.5rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .pos-toggle-btn.active {
            background: rgba(6, 182, 212, 0.2);
            border-color: #06b6d4;
            color: #22d3ee;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
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
            padding: 0.9rem 1.3rem;
            min-width: 120px;
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
            font-size: 1.35rem;
            font-weight: 900;
            color: white;
        }

        /* Tab 3: Detektiven & Quizzer */
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
            background: rgba(234, 179, 8, 0.2);
            border: 1px solid #eab308;
            color: #fef08a;
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
            border-left: 5px solid #eab308;
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
            border-color: #eab308;
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

        /* Tab 4: Sætningsbyggeren */
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
            background: rgba(234, 179, 8, 0.2);
            border: 1px solid #eab308;
            color: #fef08a;
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
        .flow-step-num { font-size: 0.75rem; font-weight: 800; margin-bottom: 0.2rem; }
        .flow-step.flow-subjekt .flow-step-num { color: #86efac; }
        .flow-step.flow-verbum .flow-step-num { color: #fca5a5; }
        .flow-step.flow-adverbium .flow-step-num { color: #22d3ee; }
        .flow-step.flow-rest .flow-step-num { color: #7dd3fc; }
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
            min-width: 120px;
            padding: 0.2rem 1rem;
            border: 2.5px dashed #06b6d4;
            background: rgba(6, 182, 212, 0.15);
            border-radius: 10px;
            color: #22d3ee;
            font-weight: 900;
            letter-spacing: 2px;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
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
            border-color: #eab308;
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
            color: #fde047;
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
            font-size: 1.35rem;
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
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.4rem;
        }
        .rule-speak-btn {
            background: transparent;
            border: none;
            color: #cbd5e1;
            cursor: pointer;
            font-size: 1.1rem;
            padding: 0 0.3rem;
            transition: transform 0.2s;
        }
        .rule-speak-btn:hover {
            transform: scale(1.2);
            color: white;
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
            background: #eab308;
            transition: width 0.3s ease;
        }
        .exercise-dialog-quote {
            font-size: 1.35rem;
            color: white;
            line-height: 1.75;
            background: #0f172a;
            padding: 1.5rem;
            border-radius: 14px;
            border-left: 5px solid #eab308;
            margin-bottom: 1.8rem;
        }

        .action-btn-primary {
            background: #ca8a04;
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
            box-shadow: 0 4px 15px rgba(234, 179, 8, 0.35);
        }
        .action-btn-primary:hover {
            background: #eab308;
            color: #0f172a;
            transform: translateY(-2px);
        }

        .score-celebration-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95));
            border: 2px solid #eab308;
            border-radius: 20px;
            padding: 2.5rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(234, 179, 8, 0.35);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'konnektion-hero';
    hero.innerHTML = `
        <div class="konnektion-hero-tag">
            ${getTranslation('top100_adv_f7_badge')}
        </div>
        <h1>${getTranslation('adv_f7_hero_title')}</h1>
        <p>${getTranslation('adv_f7_hero_desc')}</p>
    `;
    viewContainer.appendChild(hero);

    // Golden Rule Banner
    const goldenBanner = document.createElement('div');
    goldenBanner.className = 'golden-rule-banner-konnektion';
    goldenBanner.innerHTML = `
        <div class="rule-icon-konnektion">🌉</div>
        <div class="rule-content-konnektion">
            <h4>${getTranslation('adv_rule_title')}</h4>
            <p>${getTranslation('adv_f7_rule_broer')}</p>
        </div>
    `;
    viewContainer.appendChild(goldenBanner);

    // Tabs Navigation
    const nav = document.createElement('div');
    nav.className = 'adv-tabs-nav';

    const tabs = [
        { id: 'vrimmel', label: '1. Byens knudepunkt (vrimlebilledet)', icon: '🖼️' },
        { id: 'vaerksted', label: '2. Brobygger-værkstedet (ordstilling og logik)', icon: '🌉' },
        { id: 'detektiv', label: '3. Logik-Detektiven (10 gåder)', icon: '🔍' },
        { id: 'builder', label: '4. Sætningsbyggeren og puslespillet', icon: '🧩' },
        { id: 'kontekst', label: '5. Kontekst-testen (14 opgaver)', icon: '🎯' },
        { id: 'aarsag', label: '6. Derfor, nemlig, altså & dermed ⚡', icon: '⚡' },
        { id: 'kontrast', label: '7. Alligevel, derimod, til gengæld & tværtimod ⚖️', icon: '⚖️' },
        { id: 'alternativ', label: '8. Ellers, i stedet, i hvert fald & i det mindste 🛡️', icon: '🛡️' }
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

    // Tab Content Container
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content-area';
    viewContainer.appendChild(tabContent);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/adverbier_konnektion/' + tabId);
        nav.querySelectorAll('.adv-tab-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = nav.querySelector(`#tab-btn-${tabId}`);
        if (activeBtn) activeBtn.classList.add('active');

        tabContent.innerHTML = '';
        if (tabId === 'vrimmel') {
            renderTabVrimmel(tabContent);
        } else if (tabId === 'vaerksted') {
            renderTabVaerksted(tabContent);
        } else if (tabId === 'detektiv') {
            renderTabDetektiv(tabContent);
        } else if (tabId === 'builder') {
            renderTabBuilder(tabContent);
        } else if (tabId === 'kontekst') {
            renderTabKontekst(tabContent);
        } else if (tabId === 'aarsag') {
            renderTabAarsag(tabContent);
        } else if (tabId === 'kontrast') {
            renderTabKontrast(tabContent);
        } else if (tabId === 'alternativ') {
            renderTabAlternativ(tabContent);
        }
    }

    // ==========================================
    // TAB 1: VRIMLEBILLEDET (Byens Knudepunkt)
    // ==========================================
    let activeFilter = 'alle';
    let isPureMode = false;
    let selectedWord = null;

    function renderTabVrimmel(parent) {
        parent.innerHTML = '';

        if (!selectedWord) {
            selectedWord = ADVERBIER_KONNEKTION_DATA[0];
        }

        const layout = document.createElement('div');
        layout.className = 'vrimmel-layout';

        const stageCard = document.createElement('div');
        stageCard.className = 'vrimmel-stage-card';

        // Controls bar
        const controls = document.createElement('div');
        controls.className = 'vrimmel-controls-bar';

        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'vrimmel-filters';

        const filters = [
            { id: 'alle', label: 'Alle (20)' },
            { id: 'aarsag', label: '🟢 Årsag og følge (5)' },
            { id: 'kontrast', label: '🔴 Modsætning og kontrast (5)' },
            { id: 'tilfoejelse', label: '🔵 Tilføjelse og emneskift (5)' },
            { id: 'alternativ', label: '🟣 Alternativ, forbehold og opsamling (5)' }
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

        // Stage with Wimmelbild image
        const stage = document.createElement('div');
        stage.className = 'vrimmel-stage';

        const img = document.createElement('img');
        img.src = 'assets/adverbier_konnektion_vrimmel.jpg';
        img.alt = 'Konnektion og tekstbindere i Byens Knudepunkt';
        img.className = 'vrimmel-img';
        stage.appendChild(img);

        // Filter words
        const visibleWords = ADVERBIER_KONNEKTION_DATA.filter(item => {
            if (activeFilter === 'alle') return true;
            return item.category === activeFilter;
        });

        // Place Hotspot Pins
        visibleWords.forEach((item, idx) => {
            const pin = document.createElement('div');
            pin.className = `hotspot-pin ${selectedWord && selectedWord.id === item.id ? 'active' : ''}`;
            pin.style.left = `${item.x}%`;
            pin.style.top = `${item.y}%`;
            pin.dataset.id = item.id;
            pin.innerHTML = `
                <span>${idx + 1}</span>
                ${!isPureMode ? `<span class="hotspot-label">${item.word}</span>` : ''}
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

        // Målords præsentationsboks under vrimlebilledet
        const inspector = document.createElement('div');
        inspector.className = 'vrimmel-inspector';
        inspector.id = 'konnektion-inspector-box';
        layout.appendChild(inspector);
        parent.appendChild(layout);

        function updateInspector(item, shouldScroll = false) {
            selectedWord = item;

            stage.querySelectorAll('.hotspot-pin').forEach(p => {
                p.classList.toggle('active', p.dataset.id === item.id);
            });

            const catNames = {
                aarsag: '🟢 Årsag, Følge & Begrundelse',
                kontrast: '🔴 Modsætning & Kontrast',
                tilfoejelse: '🔵 Tilføjelse & Emneskift',
                alternativ: '🟣 Alternativ, Forbehold & Opsamling'
            };

            const trans = getKonnektionTranslation(item);
            const currentLang = getLang().toUpperCase();

            const highlightedSentence = item.sentence.replace(
                new RegExp(`(${item.word})`, 'i'),
                `<span style="color: #fde047; text-decoration: underline;">$1</span>`
            );

            inspector.innerHTML = `
                <div class="inspector-left">
                    <div class="inspector-header">
                        <div class="inspector-badge-row">
                            <span class="inspector-badge">${catNames[item.category] || 'Tekstbinder'}</span>
                            <span class="inspector-badge" style="background: rgba(6, 182, 212, 0.2); border-color: #06b6d4; color: #22d3ee;">${item.meaning}</span>
                        </div>
                        <button class="inspector-audio-btn" id="insp-speak-word" title="Lyt til udtale">🔊</button>
                    </div>

                    <h2 class="inspector-word-title">
                        <span>🔗</span> ${item.word}
                    </h2>

                    <div class="inspector-trans-box">
                        <div class="trans-badge-label">
                            <span>🌍</span> MÅLORDSPRÆSENTATION & OVERSÆTTELSE (${currentLang})
                        </div>
                        <div class="trans-word-val">${trans.word}</div>
                    </div>

                    <div class="inspector-scene-box">
                        <div class="scene-heading">📍 I Vrimlebilledet</div>
                        <p class="scene-text">${item.sceneDesc}</p>
                    </div>
                </div>

                <div class="inspector-right">
                    <div class="inspector-sentence-card">
                        <div class="trans-badge-label" style="margin-bottom:0.4rem;">💬 EKSEMPEL PÅ SAMMENHÆNG</div>
                        <div class="sentence-quote-text">"${highlightedSentence}"</div>
                        <div class="sentence-trans-text">"${item.contextSentence}"</div>
                        ${trans.sentence ? `<div class="sentence-trans-text" style="color:#fef08a;">🌍 "${trans.sentence}"</div>` : ''}
                        <button class="inspector-speak-btn" id="insp-speak-sent">
                            <span>🔊</span> Lyt til helsætningen
                        </button>
                    </div>

                    <div class="inspector-scene-box" style="border-left: 3px solid #06b6d4;">
                        <div class="scene-heading" style="color: #22d3ee;">🧭 Ordstilling & Brug</div>
                        <p class="scene-text">${item.ruleHint}</p>
                    </div>

                    <div class="inspector-actions">
                        <button class="inspector-btn-action" id="insp-prev-btn">⬅ Forrige ord</button>
                        <button class="inspector-btn-action" id="insp-next-btn" style="background:#ca8a04;">Næste ord ➔</button>
                    </div>
                </div>
            `;

            inspector.querySelector('#insp-speak-word').onclick = () => speakDanish(item.word);
            inspector.querySelector('#insp-speak-sent').onclick = () => speakDanish(item.contextSentence);

            inspector.querySelector('#insp-prev-btn').onclick = () => {
                const idx = visibleWords.findIndex(w => w.id === item.id);
                const prevItem = visibleWords[(idx - 1 + visibleWords.length) % visibleWords.length];
                updateInspector(prevItem, false);
                speakDanish(prevItem.word);
            };
            inspector.querySelector('#insp-next-btn').onclick = () => {
                const idx = visibleWords.findIndex(w => w.id === item.id);
                const nextItem = visibleWords[(idx + 1) % visibleWords.length];
                updateInspector(nextItem, false);
                speakDanish(nextItem.word);
            };

            if (shouldScroll) {
                inspector.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        updateInspector(selectedWord, false);
    }

    // ==========================================
    // TAB 2: BROBYGGER-VÆRKSTEDET
    // ==========================================
    let activeSubTab = 'ordstilling';
    let selectedSyntaxWordId = 'derfor';
    let selectedPosMode = 'front'; // 'front' | 'mid'
    let selectedBridgeType = 'aarsag';

    function renderTabVaerksted(parent) {
        parent.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.className = 'vaerksted-container';

        const subtabs = document.createElement('div');
        subtabs.className = 'vaerksted-subtabs';

        const subList = [
            { id: 'ordstilling', label: '🔄 1. Inversions-motoren vs. midterpladsen' },
            { id: 'brotyper', label: '🧭 2. De 4 logiske bro-typer' },
            { id: 'tvilling', label: '⚠️ 3. Pas på tvillingen! (adverbium vs. konjunktion)' }
        ];

        subList.forEach(st => {
            const btn = document.createElement('button');
            btn.className = `vaerksted-subtab-btn ${activeSubTab === st.id ? 'active' : ''}`;
            btn.textContent = st.label;
            btn.onclick = () => {
                activeSubTab = st.id;
                renderTabVaerksted(parent);
            };
            subtabs.appendChild(btn);
        });
        wrap.appendChild(subtabs);

        const body = document.createElement('div');
        wrap.appendChild(body);
        parent.appendChild(wrap);

        if (activeSubTab === 'ordstilling') {
            renderSubOrdstilling(body);
        } else if (activeSubTab === 'brotyper') {
            renderSubBrotyper(body);
        } else {
            renderSubTvilling(body);
        }
    }

    function renderSubOrdstilling(container) {
        const syntaxExamples = {
            derfor: {
                word: 'derfor',
                context: 'Det øsregner udenfor.',
                canFront: true,
                frontTokens: [
                    { role: '1. Forfelt (Adverbium)', word: 'Derfor', color: '#06b6d4' },
                    { role: '2. Verbum (Inversion!)', word: 'tager', color: '#ef4444' },
                    { role: '3. Subjekt', word: 'jeg', color: '#22c55e' },
                    { role: '4. Restled', word: 'bussen i dag.', color: '#0ea5e9' }
                ],
                midTokens: [
                    { role: '1. Subjekt', word: 'Jeg', color: '#22c55e' },
                    { role: '2. Verbum', word: 'tager', color: '#ef4444' },
                    { role: '3. Centraladverbium', word: 'derfor', color: '#06b6d4' },
                    { role: '4. Restled', word: 'bussen i dag.', color: '#0ea5e9' }
                ],
                note: 'Både forfelt (med inversion) og midterplads (efter verbet) er 100% naturligt dansk!'
            },
            alligevel: {
                word: 'alligevel',
                context: 'Det regner og blæser kraftigt.',
                canFront: true,
                frontTokens: [
                    { role: '1. Forfelt (Adverbium)', word: 'Alligevel', color: '#06b6d4' },
                    { role: '2. Verbum (Inversion!)', word: 'cykler', color: '#ef4444' },
                    { role: '3. Subjekt', word: 'hun', color: '#22c55e' },
                    { role: '4. Restled', word: 'på arbejde.', color: '#0ea5e9' }
                ],
                midTokens: [
                    { role: '1. Subjekt', word: 'Hun', color: '#22c55e' },
                    { role: '2. Verbum', word: 'cykler', color: '#ef4444' },
                    { role: '3. Centraladverbium', word: 'alligevel', color: '#06b6d4' },
                    { role: '4. Restled', word: 'på arbejde.', color: '#0ea5e9' }
                ],
                note: 'Står "Alligevel" forrest, SKAL verbet ("cykler") stå før subjektet ("hun")!'
            },
            nemlig: {
                word: 'nemlig (KUN i midten!)',
                context: 'Jeg kan ikke komme til festen.',
                canFront: false,
                frontError: '🚫 STOP! "Nemlig" kan ALDRIG stå forrest i en dansk sætning! Man kan ikke sige: *"Nemlig er jeg syg."',
                midTokens: [
                    { role: '1. Subjekt', word: 'Jeg', color: '#22c55e' },
                    { role: '2. Verbum', word: 'er', color: '#ef4444' },
                    { role: '3. Centraladverbium', word: 'nemlig', color: '#06b6d4' },
                    { role: '4. Restled', word: 'blevet syg.', color: '#0ea5e9' }
                ],
                note: 'Huskeregel: "Nemlig" bor fast inde i sætningen lige efter verbet!'
            },
            dog: {
                word: 'dog (KUN i midten!)',
                context: 'Filmen var meget lang.',
                canFront: false,
                frontError: '🚫 STOP! "Dog" bruges ikke forrest i moderne dansk! Det står altid inde i sætningen efter verbet.',
                midTokens: [
                    { role: '1. Subjekt', word: 'Den', color: '#22c55e' },
                    { role: '2. Verbum', word: 'var', color: '#ef4444' },
                    { role: '3. Centraladverbium', word: 'dog', color: '#06b6d4' },
                    { role: '4. Restled', word: 'utrolig spændende.', color: '#0ea5e9' }
                ],
                note: '"Dog" fungerer som en elegant blød kontrast inde midt i sætningen.'
            },
            desuden: {
                word: 'desuden',
                context: 'Lejligheden er lys og nyistandsat.',
                canFront: true,
                frontTokens: [
                    { role: '1. Forfelt (Adverbium)', word: 'Desuden', color: '#06b6d4' },
                    { role: '2. Verbum (Inversion!)', word: 'ligger', color: '#ef4444' },
                    { role: '3. Subjekt', word: 'den', color: '#22c55e' },
                    { role: '4. Restled', word: 'tæt på metroen.', color: '#0ea5e9' }
                ],
                midTokens: [
                    { role: '1. Subjekt', word: 'Den', color: '#22c55e' },
                    { role: '2. Verbum', word: 'ligger', color: '#ef4444' },
                    { role: '3. Centraladverbium', word: 'desuden', color: '#06b6d4' },
                    { role: '4. Restled', word: 'tæt på metroen.', color: '#0ea5e9' }
                ],
                note: '"Desuden" tilføjer et ekstra argument og giver straks inversion i forfeltet.'
            },
            ellers: {
                word: 'ellers',
                context: 'Du må skynde dig ud ad døren nu!',
                canFront: true,
                frontTokens: [
                    { role: '1. Forfelt (Adverbium)', word: 'Ellers', color: '#06b6d4' },
                    { role: '2. Verbum (Inversion!)', word: 'kommer', color: '#ef4444' },
                    { role: '3. Subjekt', word: 'du', color: '#22c55e' },
                    { role: '4. Restled', word: 'for sent til toget.', color: '#0ea5e9' }
                ],
                midTokens: [
                    { role: '1. Subjekt', word: 'Du', color: '#22c55e' },
                    { role: '2. Verbum', word: 'kommer', color: '#ef4444' },
                    { role: '3. Centraladverbium', word: 'ellers', color: '#06b6d4' },
                    { role: '4. Restled', word: 'for sent til toget.', color: '#0ea5e9' }
                ],
                note: 'Når "Ellers" starter sætningen, bytter subjekt og verbum altid plads!'
            }
        };

        const current = syntaxExamples[selectedSyntaxWordId];
        if (!current.canFront && selectedPosMode === 'front') {
            // Keep selectedPosMode so user can see the warning or switch
        }

        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#fde047; margin-bottom:0.5rem;">🔄 Inversions-Motoren vs. Midterpladsen</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:750px; margin:0 auto 1.2rem;">
                Klik på en tekstbinder herunder og prøv at flytte den mellem <strong>Plads 1 (Forfeltet)</strong> og <strong>Plads 3 (Centralpladsen efter verbet)</strong>. Læg mærke til, hvordan <span style="color:#ef4444; font-weight:800;">Verbum</span> og <span style="color:#22c55e; font-weight:800;">Subjekt</span> bytter plads!
            </p>
        `;

        const wordGrid = document.createElement('div');
        wordGrid.className = 'word-selector-grid';
        Object.keys(syntaxExamples).forEach(k => {
            const btn = document.createElement('button');
            btn.className = `word-sel-btn ${selectedSyntaxWordId === k ? 'active' : ''}`;
            btn.textContent = syntaxExamples[k].word;
            btn.onclick = () => {
                selectedSyntaxWordId = k;
                if (!syntaxExamples[k].canFront) {
                    selectedPosMode = 'mid';
                }
                renderSubOrdstilling(container);
            };
            wordGrid.appendChild(btn);
        });
        card.appendChild(wordGrid);

        const posRow = document.createElement('div');
        posRow.className = 'pos-toggle-row';
        posRow.innerHTML = `
            <button class="pos-toggle-btn ${selectedPosMode === 'front' ? 'active' : ''}" id="pos-front-btn">
                🚀 Plads 1: Forrest i sætningen (Udløser INVERSION!)
            </button>
            <button class="pos-toggle-btn ${selectedPosMode === 'mid' ? 'active' : ''}" id="pos-mid-btn">
                🎯 Plads 3: Inde i sætningen (Lige efter Verbet)
            </button>
        `;
        card.appendChild(posRow);

        const demoBox = document.createElement('div');
        demoBox.style.cssText = 'background:#0f172a; border-radius:16px; padding:1.8rem; border:2px solid rgba(234, 179, 8, 0.35); text-align:center;';

        if (selectedPosMode === 'front' && !current.canFront) {
            demoBox.innerHTML = `
                <div style="font-size:1.1rem; color:#94a3b8; margin-bottom:0.8rem;">Første sætning: <em>"${current.context}"</em></div>
                <div style="background:rgba(239,68,68,0.15); border:2px solid #ef4444; color:#fca5a5; padding:1.5rem; border-radius:14px; font-size:1.2rem; font-weight:800; margin:1rem 0;">
                    ${current.frontError}
                </div>
                <button class="action-btn-primary" id="switch-to-mid-btn" style="margin-top:0.8rem;">
                    Flyt ind efter verbet (Korrekt plads) ➔
                </button>
            `;
        } else {
            const tokens = selectedPosMode === 'front' ? current.frontTokens : current.midTokens;
            const fullSentence = `${current.context} ${tokens.map(t => t.word).join(' ')}`;

            demoBox.innerHTML = `
                <div style="font-size:1.1rem; color:#94a3b8; margin-bottom:0.8rem;">Første sætning: <strong style="color:white;">"${current.context}"</strong></div>
                <div class="syntax-boxes-row">
                    ${tokens.map(t => `
                        <div class="syntax-token-box" style="border-color:${t.color};">
                            <span class="syntax-token-role" style="color:${t.color};">${t.role}</span>
                            <span class="syntax-token-word">${t.word}</span>
                        </div>
                    `).join('')}
                </div>
                <div style="color:#fef08a; font-weight:700; margin:1rem 0;">💡 ${current.note}</div>
                <button class="inspector-speak-btn" id="speak-syntax-demo">
                    <span>🔊</span> Lyt: "${fullSentence}"
                </button>
            `;
        }

        card.appendChild(demoBox);
        container.innerHTML = '';
        container.appendChild(card);

        card.querySelector('#pos-front-btn').onclick = () => {
            selectedPosMode = 'front';
            renderSubOrdstilling(container);
        };
        card.querySelector('#pos-mid-btn').onclick = () => {
            selectedPosMode = 'mid';
            renderSubOrdstilling(container);
        };
        const switchMid = card.querySelector('#switch-to-mid-btn');
        if (switchMid) {
            switchMid.onclick = () => {
                selectedPosMode = 'mid';
                renderSubOrdstilling(container);
            };
        }
        const speakBtn = card.querySelector('#speak-syntax-demo');
        if (speakBtn) {
            const tokens = selectedPosMode === 'front' ? current.frontTokens : current.midTokens;
            speakBtn.onclick = () => speakDanish(`${current.context} ${tokens.map(t => t.word).join(' ')}`);
        }
    }

    function renderSubBrotyper(container) {
        const bridges = {
            aarsag: {
                title: '🟢 1. Årsag, følge og konklusion',
                subtitle: 'Når sætning 1 og sætning 2 hænger logisk sammen som årsag og resultat',
                items: [
                    { word: 'derfor', role: 'Peger FREM på resultatet', ex: 'Det regner. Derfor tager jeg bussen.' },
                    { word: 'nemlig', role: 'Peger TILBAGE på årsagen (står i midten!)', ex: 'Jeg tager bussen. Det regner nemlig.' },
                    { word: 'altså', role: 'Drager en logisk konklusion', ex: 'Toget er kørt. Vi er altså for sent på den.' },
                    { word: 'dermed', role: 'Direkte konsekvens af en handling', ex: 'Han skrev under og er dermed bundet af aftalen.' },
                    { word: 'således', role: 'Formel/skriftlig følge ("på den måde")', ex: 'Priserne faldt, og således steg salget.' }
                ]
            },
            kontrast: {
                title: '🔴 2. Modsætning, kontrast og kompensation',
                subtitle: 'Når sætning 2 overrasker, sammenligner modsætninger eller giver et lyspunkt',
                items: [
                    { word: 'alligevel', role: 'På trods af forhindringen', ex: 'Det regner kraftigt. Alligevel cykler hun.' },
                    { word: 'dog', role: 'Blød indrømmelse (står i midten!)', ex: 'Filmen var lang. Den var dog spændende.' },
                    { word: 'derimod', role: 'Sammenligner to modsætninger (A vs. B)', ex: 'Peter drikker kaffe. Maria drikker derimod te.' },
                    { word: 'til gengæld', role: 'Kompensation / lyspunkt der vejer op', ex: 'Værelset er lille. Til gengæld er huslejen lav.' },
                    { word: 'tværtimod', role: '180 graders afvisning af noget negativt', ex: 'Er du sur? Nej, tværtimod – jeg er glad!' }
                ]
            },
            tilfoejelse: {
                title: '🔵 3. Tilføjelse, bonus og emneskift',
                subtitle: 'Når du bygger ovenpå med flere argumenter eller skifter spor i samtalen',
                items: [
                    { word: 'desuden', role: 'Ekstra sagligt argument oveni', ex: 'Bilen er gammel. Desuden er den dyr i benzin.' },
                    { word: 'også', role: 'Almindelig tilføjelse', ex: 'Vi købte brød, og vi købte også mælk.' },
                    { word: 'endda', role: 'Overraskende bonus over forventning ("even")', ex: 'Han lavede middag og bagte endda en kage!' },
                    { word: 'i øvrigt', role: 'Sidebemærkning / blødt emneskift', ex: 'I øvrigt skal jeg hilse mange gange fra din bror.' },
                    { word: 'for resten', role: 'Hov, jeg kom lige i tanke om! ("by the way")', ex: 'For resten, har du set mine nøgler?' }
                ]
            },
            alternativ: {
                title: '🟣 4. Alternativ, forbehold og opsamling',
                subtitle: 'Når du advarer om konsekvensen, vælger Plan B eller sætter en bundgrænse',
                items: [
                    { word: 'ellers', role: 'Konsekvens hvis man IKKE gør det', ex: 'Skynd dig! Ellers kommer vi for sent.' },
                    { word: 'i stedet', role: 'Erstatning / valg af Plan B', ex: 'Kaffen var udsolgt. Jeg købte te i stedet.' },
                    { word: 'i hvert fald', role: 'Sikker bundgrænse trods tvivl', ex: 'Jeg ved ikke om vi vinder, men vi prøver i hvert fald.' },
                    { word: 'i det mindste', role: 'Trøst / positivt minimum', ex: 'Det regner, men her i skuret er der i det mindste tørt.' },
                    { word: 'kort sagt', role: 'Samler det hele i én konklusion', ex: 'Kort sagt var hele turen en kæmpe succes.' }
                ]
            }
        };

        const cur = bridges[selectedBridgeType];
        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#fde047; margin-bottom:0.5rem;">🧭 De 4 Logiske Bro-typer (20 målord)</h2>
            <p style="text-align:center; color:#cbd5e1; margin-bottom:1.5rem;">Vælg en logisk familie for at sammenligne de 5 tekstbindere og høre dem i kontekst:</p>
            <div class="word-selector-grid">
                <button class="word-sel-btn ${selectedBridgeType === 'aarsag' ? 'active' : ''}" data-bt="aarsag">🟢 Årsag & Følge (5)</button>
                <button class="word-sel-btn ${selectedBridgeType === 'kontrast' ? 'active' : ''}" data-bt="kontrast">🔴 Kontrast (5)</button>
                <button class="word-sel-btn ${selectedBridgeType === 'tilfoejelse' ? 'active' : ''}" data-bt="tilfoejelse">🔵 Tilføjelse (5)</button>
                <button class="word-sel-btn ${selectedBridgeType === 'alternativ' ? 'active' : ''}" data-bt="alternativ">🟣 Alternativ & Forbehold (5)</button>
            </div>
            <div style="background:#0f172a; border-radius:16px; padding:1.6rem; border:1px solid rgba(255,255,255,0.1); margin-top:1rem;">
                <h3 style="color:#fef08a; margin-bottom:0.3rem;">${cur.title}</h3>
                <p style="color:#94a3b8; margin-bottom:1.4rem;">${cur.subtitle}</p>
                <div style="display:grid; gap:0.9rem;">
                    ${cur.items.map(it => `
                        <div style="background:#1e293b; border-radius:12px; padding:1rem 1.2rem; display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap; border-left:4px solid #eab308;">
                            <div>
                                <span style="font-size:1.25rem; font-weight:900; color:#fde047; margin-right:0.8rem;">${it.word}</span>
                                <span style="font-size:0.85rem; background:rgba(234,179,8,0.15); color:#fef08a; padding:0.2rem 0.6rem; border-radius:6px; font-weight:700;">${it.role}</span>
                                <div style="color:white; font-weight:600; margin-top:0.4rem; font-size:1.05rem;">"${it.ex}"</div>
                            </div>
                            <button class="inspector-speak-btn" data-speak="${it.ex}">🔊 Lyt</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.innerHTML = '';
        container.appendChild(card);

        card.querySelectorAll('[data-bt]').forEach(btn => {
            btn.onclick = () => {
                selectedBridgeType = btn.dataset.bt;
                renderSubBrotyper(container);
            };
        });
        card.querySelectorAll('[data-speak]').forEach(btn => {
            btn.onclick = () => speakDanish(btn.dataset.speak);
        });
    }

    function renderSubTvilling(container) {
        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#fde047; margin-bottom:0.5rem;">⚠️ Pas på Tvillingen! (Konnektivt Adverbium vs. Konjunktion)</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:800px; margin:0 auto 1.8rem;">
                Mange ord i Felt 7 har en "betydnings-tvilling" blandt konjunktionerne (som du møder på konjunktionsfladen). De betyder næsten det samme, men deres <strong>ordstilling</strong> er vidt forskellig!
            </p>
            <div style="display:grid; gap:1.2rem;">
                <div style="background:#0f172a; border-radius:14px; padding:1.3rem; border-left:5px solid #06b6d4;">
                    <div style="color:#22d3ee; font-weight:900; font-size:0.9rem; text-transform:uppercase; margin-bottom:0.5rem;">1. Årsag & Følge</div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                        <div style="background:#1e293b; padding:1rem; border-radius:10px; border:1px solid rgba(6,182,212,0.4);">
                            <strong style="color:#fde047;">Konnektivt Adverbium (Felt 7):</strong><br>
                            • "Det regner. <strong>Derfor</strong> <span style="color:#ef4444;">tager</span> <span style="color:#22c55e;">jeg</span> bussen." <em>(Inversion!)</em><br>
                            • "Jeg tager bussen. Det <span style="color:#ef4444;">regner</span> <strong>nemlig</strong>." <em>(Efter verbet!)</em>
                        </div>
                        <div style="background:rgba(15,23,42,0.6); padding:1rem; border-radius:10px; border:1px dashed rgba(255,255,255,0.15); color:#94a3b8;">
                            <strong>Konjunktions-tvilling (Konjunktionsfladen):</strong><br>
                            • "Det regner, <em>så</em> jeg tager bussen."<br>
                            • "Jeg tager bussen, <em>fordi</em> det regner."
                        </div>
                    </div>
                </div>

                <div style="background:#0f172a; border-radius:14px; padding:1.3rem; border-left:5px solid #eab308;">
                    <div style="color:#fde047; font-weight:900; font-size:0.9rem; text-transform:uppercase; margin-bottom:0.5rem;">2. Modsætning & Indrømmelse</div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                        <div style="background:#1e293b; padding:1rem; border-radius:10px; border:1px solid rgba(234,179,8,0.4);">
                            <strong style="color:#fde047;">Konnektivt Adverbium (Felt 7):</strong><br>
                            • "Det regner. <strong>Alligevel</strong> <span style="color:#ef4444;">cykler</span> <span style="color:#22c55e;">hun</span>." <em>(Inversion!)</em><br>
                            • "Værelset er lille. <strong>Til gengæld</strong> <span style="color:#ef4444;">er</span> <span style="color:#22c55e;">det</span> billigt."
                        </div>
                        <div style="background:rgba(15,23,42,0.6); padding:1rem; border-radius:10px; border:1px dashed rgba(255,255,255,0.15); color:#94a3b8;">
                            <strong>Konjunktions-tvilling (Konjunktionsfladen):</strong><br>
                            • "Hun cykler, <em>selvom</em> det regner."<br>
                            • "Værelset er lille, <em>men</em> det er billigt."
                        </div>
                    </div>
                </div>

                <div style="background:#0f172a; border-radius:14px; padding:1.3rem; border-left:5px solid #a855f7;">
                    <div style="color:#c084fc; font-weight:900; font-size:0.9rem; text-transform:uppercase; margin-bottom:0.5rem;">3. Betingelse & Alternativ</div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                        <div style="background:#1e293b; padding:1rem; border-radius:10px; border:1px solid rgba(168,85,247,0.4);">
                            <strong style="color:#fde047;">Konnektivt Adverbium (Felt 7):</strong><br>
                            • "Skynd dig! <strong>Ellers</strong> <span style="color:#ef4444;">kommer</span> <span style="color:#22c55e;">vi</span> for sent." <em>(Inversion!)</em>
                        </div>
                        <div style="background:rgba(15,23,42,0.6); padding:1rem; border-radius:10px; border:1px dashed rgba(255,255,255,0.15); color:#94a3b8;">
                            <strong>Konjunktions-tvilling (Konjunktionsfladen):</strong><br>
                            • "Vi kommer for sent, <em>hvis</em> du <em>ikke</em> skynder dig."
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = '';
        container.appendChild(card);
    }

    // ==========================================
    // TAB 3: LOGIK-DETEKTIVEN (10 GÅDER)
    // ==========================================
    const DETEKTIV_RIDDLES = [
        {
            tag: 'Gåde 1 • Årsag vs. Resultat',
            prompt: 'Sætning 2 forklarer ÅRSAGEN til sætning 1, og ordet står inde i sætningen lige efter verbet ("er"). Hvilket ord passer?',
            quote: '"Jeg kan desværre ikke komme til mødet i dag. Jeg er ______ blevet syg med feber."',
            options: ['nemlig', 'derfor', 'ellers'],
            correct: 'nemlig',
            explanations: {
                'nemlig': '🌟 Præcis! "Nemlig" giver årsagen/forklaringen på det, du lige har sagt, og det står altid inde i sætningen efter verbet.',
                'derfor': 'Ikke her! Hvis du brugte "derfor", ville feberen være resultatet af, at du ikke kom til mødet (den omvendte logik).',
                'ellers': '"Ellers" udtrykker en advarsel ("hvis ikke"), ikke en årsag.'
            }
        },
        {
            tag: 'Gåde 2 • Kompensation (Lyspunktet)',
            prompt: 'Sætning 1 nævner en ulempe ved lejligheden, men sætning 2 nævner en stor fordel, der vejer op for ulempen:',
            quote: '"Vores nye lejlighed ligger lidt langt fra centrum. ______ er huslejen utrolig billig!"',
            options: ['Til gengæld', 'Tværtimod', 'Desuden'],
            correct: 'Til gengæld',
            explanations: {
                'Til gengæld': '🌟 Lige i øjet! "Til gengæld" bruges, når en positiv ting kompenserer for en ulempe.',
                'Tværtimod': '"Tværtimod" afviser sætning 1 100% (det ville betyde, at lejligheden slet ikke lå langt fra centrum).',
                'Desuden': '"Desuden" tilføjer endnu et argument i samme retning (ulempe + ulempe eller fordel + fordel), ikke en kontrast.'
            }
        },
        {
            tag: 'Gåde 3 • På trods af forhindring',
            prompt: 'Peter er meget træt efter en lang arbejdsuge, men på trods af trætheden tager han med til fredagsbar:',
            quote: '"Peter var helt udkørt efter ugens arbejde. ______ tog han med kollegerne på café."',
            options: ['Alligevel', 'Derfor', 'I stedet'],
            correct: 'Alligevel',
            explanations: {
                'Alligevel': '🌟 Korrekt! "Alligevel" viser, at handlingen sker PÅ TRODS AF en forhindring eller forventning.',
                'Derfor': 'Man tager normalt ikke på café, *fordi* man er helt udkørt – det sker på trods af det.',
                'I stedet': '"I stedet" kræver, at han opgav én plan til fordel for en anden.'
            }
        },
        {
            tag: 'Gåde 4 • 180 Graders Modsigelse',
            prompt: 'En kollega spørger, om du blev sur over kritikken, men du vil afvise det 100% og sige, at du faktisk blev rigtig glad for hjælpen:',
            quote: '"Blev du sur over hans rettelser? Nej, ______ – jeg lærte rigtig meget af dem!"',
            options: ['tværtimod', 'alligevel', 'desuden'],
            correct: 'tværtimod',
            explanations: {
                'tværtimod': '🌟 Fuldstændig rigtigt! Efter et "Nej" bruger man "tværtimod" til at vende påstanden 180 grader rundt (sur ➔ glad).',
                'alligevel': '"Alligevel" betyder "på trods af det", ikke "det stik modsatte".',
                'desuden': '"Desuden" tilføjer bare et ekstra punkt uden at afvise spørgsmålet.'
            }
        },
        {
            tag: 'Gåde 5 • Advarsel om konsekvens',
            prompt: 'Du minder din ven om at huske paraplyen, for hvis han ikke gør det, bliver han gennemblødt:',
            quote: '"Husk at tage en paraply med ud i dag! ______ bliver du fuldstændig gennemblødt."',
            options: ['Ellers', 'I stedet', 'Derfor'],
            correct: 'Ellers',
            explanations: {
                'Ellers': '🌟 Præcis! "Ellers" betyder "hvis du ikke gør det, så sker denne konsekvens".',
                'I stedet': '"I stedet" bruges om et bevidst alternativt valg (Plan B), ikke en uønsket konsekvens.',
                'Derfor': '"Derfor" ville betyde, at paraplyen gør dig gennemblødt!'
            }
        },
        {
            tag: 'Gåde 6 • Sammenligning af to modsætninger (A vs. B)',
            prompt: 'Vi sammenligner to søskende med helt forskellig smag: Emil elsker actionfilm, mens hans søster foretrækker dokumentarer:',
            quote: '"Emil elsker hurtige actionfilm. Hans søster ser ______ næsten kun dokumentarfilm."',
            options: ['derimod', 'alligevel', 'ellers'],
            correct: 'derimod',
            explanations: {
                'derimod': '🌟 Nemlig! "Derimod" er det perfekte ord, når vi sammenligner to personer eller ting, der gør noget modsat (A gør X ↔ B gør derimod Y).',
                'alligevel': 'Søsterens smag er ikke en forhindring for Emil, men en neutral kontrast mellem to personer.',
                'ellers': '"Ellers" passer slet ikke til sammenligning af to personer.'
            }
        },
        {
            tag: 'Gåde 7 • Ekstra argument i samme retning',
            prompt: 'Du anbefaler en jobansøger: Hun har 5 års erfaring, og OVENI DET taler hun fire sprog flydende:',
            quote: '"Ansøgeren har fem års relevant erfaring. ______ taler hun fire sprog flydende."',
            options: ['Desuden', 'Derimod', 'I stedet'],
            correct: 'Desuden',
            explanations: {
                'Desuden': '🌟 Korrekt! "Desuden" bygger videre i samme positive retning med endnu et stærkt argument.',
                'Derimod': '"Derimod" bruges kun ved modsætninger, ikke når man lægger to fordele sammen.',
                'I stedet': 'Hun taler ikke sprog *i stedet for* sin erfaring, men *oveni* sin erfaring.'
            }
        },
        {
            tag: 'Gåde 8 • Overraskende bonus ("even")',
            prompt: 'Naboen hjalp ikke bare med at bære sofaen op – han lavede ovenikøbet varm kaffe til alle bagefter!',
            quote: '"Vores søde nabo hjalp med at bære alle flyttekasserne, og han lavede ______ frisk kaffe til os!"',
            options: ['endda', 'ellers', 'dog'],
            correct: 'endda',
            explanations: {
                'endda': '🌟 Lige præcis! "Endda" fremhæver en overraskende og imponerende bonus, der overgår hvad man kunne forvente.',
                'ellers': '"Ellers" betyder "hvis ikke".',
                'dog': '"Dog" udtrykker en begrænsning eller modsætning, ikke en ekstra bonus.'
            }
        },
        {
            tag: 'Gåde 9 • Trøst og positivt minimum',
            prompt: 'Fodboldholdet tabte desværre kampen 3-1, men som en lille trøst spillede de meget bedre end i sidste uge:',
            quote: '"Vi tabte desværre kampen i går, men vi kæmpede ______ rigtig godt hele vejen."',
            options: ['i det mindste', 'dermed', 'for resten'],
            correct: 'i det mindste',
            explanations: {
                'i det mindste': '🌟 Rigtigt! "I det mindste" ("at least") bruges som et trøstende lyspunkt midt i et negativt resultat.',
                'dermed': '"Dermed" udtrykker en direkte logisk følge.',
                'for resten': '"For resten" bruges til pludseligt emneskift ("by the way").'
            }
        },
        {
            tag: 'Gåde 10 • Logisk konklusion ud fra fakta',
            prompt: 'Butikken lukker kl. 18:00, og klokken er nu 18:30. Du drager den logiske konklusion:',
            quote: '"Supermarkedet lukkede klokken 18, og nu er den 18:30. Der er ______ lukket nu."',
            options: ['altså', 'alligevel', 'i stedet'],
            correct: 'altså',
            explanations: {
                'altså': '🌟 Perfekt! "Altså" opsummerer fakta og drager den logiske konklusion ("med andre ord / så").',
                'alligevel': '"Alligevel" ville betyde på trods af lukketiden.',
                'i stedet': '"I stedet" kræver et alternativ.'
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
                    <div style="font-size:3.5rem; margin-bottom:1rem;">🕵️‍♂️🏆</div>
                    <h2 style="color:#fde047; font-size:2rem; margin-bottom:0.5rem;">Logik-Detektiven Gennemført!</h2>
                    <p style="font-size:1.2rem; color:#cbd5e1; margin-bottom:1.5rem;">
                        Du løste <strong>${detektivScore} ud af ${DETEKTIV_RIDDLES.length}</strong> logiske gåder!
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
                <span>🔍 LOGIK-DETEKTIVEN: GÅDE ${detektivIdx + 1} AF ${DETEKTIV_RIDDLES.length}</span>
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
            mode: 'inversion', // Adverbium (1) + Verbum (2) + Subjekt (3) + Rest (4)
            context: 'Første sætning: "Det regner kraftigt i dag." (Vælg følgen i Forfeltet ➔ udløser INVERSION!)',
            displayTemplate: 'Det regner kraftigt i dag. [BLANK] tager jeg bussen.',
            options: ['Derfor', 'Nemlig', 'Tværtimod'],
            correctWord: 'Derfor',
            step1Explain: 'Rigtigt! "Derfor" viser følgen og står her forrest i sætningen (Forfeltet) – nu skal vi huske INVERSION (Verbum før Subjekt)!',
            slots: [
                { role: 'adverbium', label: '1. Forfelt (Adverbium)', expected: 'Derfor' },
                { role: 'verbum', label: '2. Verbum (Inversion!)', expected: 'tager' },
                { role: 'subjekt', label: '3. Subjekt', expected: 'jeg' },
                { role: 'rest', label: '4. Restled', expected: 'bussen.' }
            ]
        },
        {
            mode: 'central', // Subjekt (1) + Verbum (2) + Adverbium (3) + Rest (4)
            context: 'Første sætning: "Jeg kan ikke komme til mødet." (Vælg forklaringen, der ALTID står inde efter verbet!)',
            displayTemplate: 'Jeg kan ikke komme til mødet. Jeg er [BLANK] blevet syg.',
            options: ['nemlig', 'derfor', 'ellers'],
            correctWord: 'nemlig',
            step1Explain: 'Præcis! "Nemlig" kan aldrig stå forrest, men står inde i sætningen på plads 3 lige efter verbet ("er").',
            slots: [
                { role: 'subjekt', label: '1. Subjekt', expected: 'Jeg' },
                { role: 'verbum', label: '2. Verbum', expected: 'er' },
                { role: 'adverbium', label: '3. Centraladverbium', expected: 'nemlig' },
                { role: 'rest', label: '4. Restled', expected: 'blevet syg.' }
            ]
        },
        {
            mode: 'inversion',
            context: 'Første sætning: "Det blæser og er koldt." (Vælg ordet for "på trods af det" i Forfeltet ➔ INVERSION!)',
            displayTemplate: 'Det blæser og er koldt. [BLANK] cykler hun på arbejde.',
            options: ['Alligevel', 'Derimod', 'Nemlig'],
            correctWord: 'Alligevel',
            step1Explain: 'Flot! Når "Alligevel" starter sætningen i Forfeltet, kommer verbet ("cykler") før subjektet ("hun")!',
            slots: [
                { role: 'adverbium', label: '1. Forfelt (Adverbium)', expected: 'Alligevel' },
                { role: 'verbum', label: '2. Verbum (Inversion!)', expected: 'cykler' },
                { role: 'subjekt', label: '3. Subjekt', expected: 'hun' },
                { role: 'rest', label: '4. Restled', expected: 'på arbejde.' }
            ]
        },
        {
            mode: 'inversion',
            context: 'Første sætning: "Du må skynde dig nu!" (Vælg advarslen "hvis ikke" i Forfeltet ➔ INVERSION!)',
            displayTemplate: 'Du må skynde dig nu! [BLANK] kommer vi for sent.',
            options: ['Ellers', 'Endda', 'Dog'],
            correctWord: 'Ellers',
            step1Explain: 'Korrekt! "Ellers" i front udløser straks inversion: Ellers (1) + kommer (2) + vi (3) + for sent (4).',
            slots: [
                { role: 'adverbium', label: '1. Forfelt (Adverbium)', expected: 'Ellers' },
                { role: 'verbum', label: '2. Verbum (Inversion!)', expected: 'kommer' },
                { role: 'subjekt', label: '3. Subjekt', expected: 'vi' },
                { role: 'rest', label: '4. Restled', expected: 'for sent.' }
            ]
        },
        {
            mode: 'central',
            context: 'Første sætning: "Peter drikker altid sort kaffe." (Vælg ordet der sammenligner Peter med Maria inde i sætningen)',
            displayTemplate: 'Peter drikker altid sort kaffe. Maria drikker [BLANK] grøn te.',
            options: ['derimod', 'derfor', 'ellers'],
            correctWord: 'derimod',
            step1Explain: 'Super! Her står subjektet ("Maria") forrest, så "derimod" placeres inde i sætningen lige efter verbet ("drikker").',
            slots: [
                { role: 'subjekt', label: '1. Subjekt', expected: 'Maria' },
                { role: 'verbum', label: '2. Verbum', expected: 'drikker' },
                { role: 'adverbium', label: '3. Centraladverbium', expected: 'derimod' },
                { role: 'rest', label: '4. Restled', expected: 'grøn te.' }
            ]
        },
        {
            mode: 'inversion',
            context: 'Første sætning: "Lejligheden er meget lille." (Vælg ordet for kompensation i Forfeltet ➔ INVERSION!)',
            displayTemplate: 'Lejligheden er meget lille. [BLANK] er huslejen lav.',
            options: ['Til gengæld', 'Derfor', 'For resten'],
            correctWord: 'Til gengæld',
            step1Explain: 'Lige i skabet! "Til gengæld" står i Forfeltet, så verbet ("er") kommer før subjektet ("huslejen").',
            slots: [
                { role: 'adverbium', label: '1. Forfelt (Adverbium)', expected: 'Til gengæld' },
                { role: 'verbum', label: '2. Verbum (Inversion!)', expected: 'er' },
                { role: 'subjekt', label: '3. Subjekt', expected: 'huslejen' },
                { role: 'rest', label: '4. Restled', expected: 'lav.' }
            ]
        },
        {
            mode: 'inversion',
            context: 'Første sætning: "Bilen er alt for gammel." (Tilføj et ekstra argument i Forfeltet ➔ INVERSION!)',
            displayTemplate: 'Bilen er alt for gammel. [BLANK] bruger den meget benzin.',
            options: ['Desuden', 'I stedet', 'Tværtimod'],
            correctWord: 'Desuden',
            step1Explain: 'Rigtigt! "Desuden" fylder plads 1 i Forfeltet og trækker verbet ("bruger") frem foran subjektet ("den").',
            slots: [
                { role: 'adverbium', label: '1. Forfelt (Adverbium)', expected: 'Desuden' },
                { role: 'verbum', label: '2. Verbum (Inversion!)', expected: 'bruger' },
                { role: 'subjekt', label: '3. Subjekt', expected: 'den' },
                { role: 'rest', label: '4. Restled', expected: 'meget benzin.' }
            ]
        },
        {
            mode: 'central',
            context: 'Første sætning: "Filmen var ret lang." (Vælg den bløde kontrast, der ALTID står inde efter verbet)',
            displayTemplate: 'Filmen var ret lang. Den var [BLANK] meget spændende.',
            options: ['dog', 'ellers', 'derfor'],
            correctWord: 'dog',
            step1Explain: 'Præcis! "Dog" står altid inde i sætningen på plads 3 lige efter verbet ("var").',
            slots: [
                { role: 'subjekt', label: '1. Subjekt', expected: 'Den' },
                { role: 'verbum', label: '2. Verbum', expected: 'var' },
                { role: 'adverbium', label: '3. Centraladverbium', expected: 'dog' },
                { role: 'rest', label: '4. Restled', expected: 'meget spændende.' }
            ]
        },
        {
            mode: 'inversion',
            context: 'Første sætning: "Maden var god og musikken spillede." (Opsummer i én konklusion i Forfeltet ➔ INVERSION!)',
            displayTemplate: 'Maden var god og musikken spillede. [BLANK] havde vi en dejlig aften.',
            options: ['Kort sagt', 'Ellers', 'Derimod'],
            correctWord: 'Kort sagt',
            step1Explain: 'Flot! "Kort sagt" i Forfeltet udløser inversion: Kort sagt (1) + havde (2) + vi (3) + en dejlig aften (4).',
            slots: [
                { role: 'adverbium', label: '1. Forfelt (Adverbium)', expected: 'Kort sagt' },
                { role: 'verbum', label: '2. Verbum (Inversion!)', expected: 'havde' },
                { role: 'subjekt', label: '3. Subjekt', expected: 'vi' },
                { role: 'rest', label: '4. Restled', expected: 'en dejlig aften.' }
            ]
        },
        {
            mode: 'central',
            context: 'Første sætning: "Toget er kørt for ti minutter siden." (Drag den logiske konklusion inde i sætningen)',
            displayTemplate: 'Toget er kørt for ti minutter siden. Vi er [BLANK] kommet for sent.',
            options: ['altså', 'alligevel', 'i stedet'],
            correctWord: 'altså',
            step1Explain: 'Super! Her starter sætningen med subjektet ("Vi"), så "altså" står på plads 3 lige efter verbet ("er").',
            slots: [
                { role: 'subjekt', label: '1. Subjekt', expected: 'Vi' },
                { role: 'verbum', label: '2. Verbum', expected: 'er' },
                { role: 'adverbium', label: '3. Centraladverbium', expected: 'altså' },
                { role: 'rest', label: '4. Restled', expected: 'kommet for sent.' }
            ]
        }
    ];

    let builderIdx = 0;
    let builderPhase = 1; // 1 = pick word, 2 = puzzle order
    let placedSlots = [];

    function renderTabBuilder(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'builder-container';

        if (builderIdx >= BUILDER_EXERCISES.length) {
            container.innerHTML = `
                <div class="score-celebration-card">
                    <div style="font-size:3.5rem; margin-bottom:1rem;">🧩🏆</div>
                    <h2 style="color:#fde047; font-size:2rem; margin-bottom:0.5rem;">Sætningsbyggeren Mester!</h2>
                    <p style="font-size:1.15rem; color:#cbd5e1; margin-bottom:1.5rem;">
                        Du har mestret både <strong>Inversion i Forfeltet</strong> (Adverbium + Verbum + Subjekt) og <strong>Centralpladsen</strong> (Subjekt + Verbum + Adverbium)!
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

        // Flow header showing current sentence pattern
        const flowHtml = ex.slots.map((s, i) => `
            <div class="flow-step flow-${s.role}">
                <div class="flow-step-num">PLADS ${i + 1}</div>
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
                <span>🧩 SÆTNINGSBYGGEREN: OPGAVE ${builderIdx + 1} AF ${BUILDER_EXERCISES.length}</span>
                <span>${ex.mode === 'inversion' ? '⚡ Model A: Adverbium i Forfeltet (INVERSION)' : '🎯 Model B: Adverbium på Centralpladsen'}</span>
            </div>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width:${pct}%;"></div>
            </div>

            <div class="flow-container">${flowHtml}</div>

            <div style="color:#fef08a; font-weight:700; margin-bottom:0.8rem; text-align:center;">
                ${ex.context}
            </div>

            <div class="sb-sentence-display">${displaySentenceHtml}</div>

            <div id="builder-interactive-stage"></div>
        `;

        const stage = card.querySelector('#builder-interactive-stage');

        if (builderPhase === 1) {
            stage.innerHTML = `
                <div style="text-align:center; margin-bottom:1rem;">
                    <span class="builder-step-badge">TRIN 1: VÆLG DET RIGTIGE KONNEKTIVE ADVERBIUM</span>
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
                                <button class="action-btn-primary" id="go-step-2">Gå til Trin 2: Saml sætnings-puslespillet 🧩 ➔</button>
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
                        fbDiv.innerHTML = `<strong>Ikke helt:</strong> Tænk over den logiske sammenhæng og hvor i sætningen ordet står.`;
                    }
                };
                optsDiv.appendChild(btn);
            });
        } else {
            // Phase 2: Puzzle assembly
            const currentSlotIdx = placedSlots.length;
            const isComplete = currentSlotIdx >= ex.slots.length;

            stage.innerHTML = `
                <div style="text-align:center; margin-bottom:1rem;">
                    <span class="builder-step-badge">TRIN 2: BYG SÆTNINGEN LED FOR LED (${ex.mode === 'inversion' ? 'HUSK INVERSION!' : 'SUBJEKT FØRST'})</span>
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
                    <div style="font-size:1.25rem; font-weight:900; color:${filledVal ? 'white' : '#64748b'};">
                        ${filledVal || (idx === currentSlotIdx ? 'Klik på brik 👇' : '...')}
                    </div>
                `;
                slotsRow.appendChild(slotEl);
            });

            const chipsRow = stage.querySelector('#sb-chips-row');
            const fbDiv = stage.querySelector('#sb-step2-fb');

            if (!isComplete) {
                // Deterministic shuffled order
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
                    <div style="font-size:1.2rem; font-weight:900; margin-bottom:0.4rem;">🎉 Perfekt ordstilling: "${fullBuilt}"</div>
                    <p style="margin:0 0 1rem;">Du satte alle 4 farvekodede sætningsled i helt rigtig rækkefølge!</p>
                    <button class="action-btn-primary" id="next-builder-btn">Næste sætning ➔</button>
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
                <div style="font-size:3.5rem; margin-bottom:1rem;">🏆✨</div>
                <h2 style="color:#fde047; font-size:2rem; margin-bottom:0.5rem;">${config.doneTitle}</h2>
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
                    btn.classList.add('wrong');
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
    // TAB 5: KONTEKST-TESTEN (14 DIALOGER)
    // ==========================================
    const kontekstState = { idx: 0, score: 0 };
    const KONTEKST_QUESTIONS = [
        {
            context: '1/14 • Transport i regnvejr',
            quote: '<strong>A:</strong> "Cykler du hjem i det her frygtelige regnvejr?"<br><strong>B:</strong> "Nej, det styrter ned. ______ tager jeg bussen i dag."',
            options: ['Derfor', 'Alligevel', 'Ellers'],
            correct: 'Derfor',
            explanation: '"Derfor" peger frem på den logiske følge af regnvejret (og giver inversion: Derfor tager jeg...).'
        },
        {
            context: '2/14 • Afbud med forklaring',
            quote: '<strong>A:</strong> "Kommer du med til fodboldtræning i aften?"<br><strong>B:</strong> "Nej, jeg bliver hjemme. Jeg har ______ vrikket om på anklen."',
            options: ['nemlig', 'derfor', 'ellers'],
            correct: 'nemlig',
            explanation: '"Nemlig" forklarer årsagen inde i sætningen lige efter hjælpeverbet ("har").'
        },
        {
            context: '3/14 • På trods af vejrudsigten',
            quote: '<strong>A:</strong> "Vandet ved stranden er kun 14 grader varmt!"<br><strong>B:</strong> "Det gør ikke noget. Jeg hopper ______ i vandet!"',
            options: ['alligevel', 'derfor', 'altså'],
            correct: 'alligevel',
            explanation: '"Alligevel" viser, at B bader på trods af det kolde vand.'
        },
        {
            context: '4/14 • To kollegers forskellige vaner',
            quote: '<strong>A:</strong> "Møder I altid på samme tid?"<br><strong>B:</strong> "Nej, Jonas møder klokken 7. Jeg møder ______ først klokken 9."',
            options: ['derimod', 'desuden', 'endda'],
            correct: 'derimod',
            explanation: '"Derimod" stiller Jonas og taleren op som to klare modsætninger (A gør X ↔ B gør derimod Y).'
        },
        {
            context: '5/14 • Boligjagt & Kompensation',
            quote: '<strong>A:</strong> "Er det nye rækkehus ikke lidt dyrt?"<br><strong>B:</strong> "Jo, huslejen er høj. ______ sparer vi mange penge på transport, fordi det ligger lige ved arbejdet."',
            options: ['Til gengæld', 'Tværtimod', 'Ellers'],
            correct: 'Til gengæld',
            explanation: '"Til gengæld" introducerer den fordel, der kompenserer for den høje husleje.'
        },
        {
            context: '6/14 • Afvisning af rygte',
            quote: '<strong>A:</strong> "Jeg hørte, at chefen var utilfreds med vores præsentation?"<br><strong>B:</strong> "Nej, ______! Hun roste os foran hele afdelingen!"',
            options: ['tværtimod', 'i det mindste', 'for resten'],
            correct: 'tværtimod',
            explanation: 'Efter "Nej" vender "tværtimod" udsagnet 180 grader rundt (utilfreds ➔ roste os).'
        },
        {
            context: '7/14 • Ekstra argument ved jobsamtale',
            quote: '<strong>A:</strong> "Hvorfor skal vi vælge dig til stillingen?"<br><strong>B:</strong> "Jeg kender branchen ud og ind. ______ har jeg ledet tre lignende projekter før."',
            options: ['Desuden', 'I stedet', 'Dog'],
            correct: 'Desuden',
            explanation: '"Desuden" bygger videre med endnu et sagligt argument oveni det første.'
        },
        {
            context: '8/14 • Overraskende ekstraservice',
            quote: '<strong>A:</strong> "Var mekanikeren god?"<br><strong>B:</strong> "Ja, han skiftede bremserne på en time, og han vaskede ______ hele bilen gratis!"',
            options: ['endda', 'ellers', 'nemlig'],
            correct: 'endda',
            explanation: '"Endda" ("even") fremhæver noget overraskende ekstra, som man slet ikke havde forventet.'
        },
        {
            context: '9/14 • På falderebet ved døren',
            quote: '<strong>A:</strong> "Vi ses på mandag! God weekend!"<br><strong>B:</strong> "Tak i lige måde! Hov, ______ – har du nøglen til postkassen?"',
            options: ['for resten', 'således', 'dermed'],
            correct: 'for resten',
            explanation: '"For resten" bruges mundtligt, når man lige kommer i tanke om et nyt spørgsmål på falderebet.'
        },
        {
            context: '10/14 • Advarsel i køkkenet',
            quote: '<strong>A:</strong> "Skal jeg skrue ned for gryden?"<br><strong>B:</strong> "Ja, gør det med det samme! ______ brænder sovsen på!"',
            options: ['Ellers', 'Alligevel', 'I stedet'],
            correct: 'Ellers',
            explanation: '"Ellers" udtrykker hvad der sker, hvis man IKKE skruer ned.'
        },
        {
            context: '11/14 • Plan B i restauranten',
            quote: '<strong>A:</strong> "De havde desværre udsolgt af laksen."<br><strong>B:</strong> "Nå, hvad bestilte du så?"<br><strong>A:</strong> "Jeg bestilte en bøf ______."',
            options: ['i stedet', 'ellers', 'altså'],
            correct: 'i stedet',
            explanation: '"I stedet" viser, at bøffen blev valgt som erstatning (Plan B) for den udsolgte laks.'
        },
        {
            context: '12/14 • Sikker bundgrænse',
            quote: '<strong>A:</strong> "Tror du, at Mads er kommet hjem?"<br><strong>B:</strong> "Jeg ved det ikke helt, men hans bil holder ______ i indkørslen."',
            options: ['i hvert fald', 'tværtimod', 'kort sagt'],
            correct: 'i hvert fald',
            explanation: '"I hvert fald" fastslår det ene faktum, vi med 100% sikkerhed kan se, selvom vi er usikre på resten.'
        },
        {
            context: '13/14 • En lille trøst',
            quote: '<strong>A:</strong> "Øv, flyet er to timer forsinket."<br><strong>B:</strong> "Ja, det er irriterende, men det er ______ ikke aflyst!"',
            options: ['i det mindste', 'derfor', 'således'],
            correct: 'i det mindste',
            explanation: '"I det mindste" giver et trøstende lyspunkt midt i en træls situation.'
        },
        {
            context: '14/14 • Opsummering af ferien',
            quote: '<strong>A:</strong> "Hvordan var jeres ferie i Italien?"<br><strong>B:</strong> "Solen skinnede, maden var fantastisk og hotellet lå lige ved vandet. ______ var det årets bedste uge!"',
            options: ['Kort sagt', 'Ellers', 'Derimod'],
            correct: 'Kort sagt',
            explanation: '"Kort sagt" samler alle de gode detaljer i én skarp konklusion.'
        }
    ];

    function renderTabKontekst(parent) {
        renderQuizEngine(parent, {
            state: kontekstState,
            questions: KONTEKST_QUESTIONS,
            progressLabel: '🎯 KONTEKST-TESTEN',
            doneTitle: 'Kontekst-testen gennemført!'
        });
    }

    // ==========================================
    // TAB 6: ÅRSAG & FØLGE (DERFOR, NEMLIG, ALTSÅ, DERMED)
    // ==========================================
    const aarsagState = { idx: 0, score: 0 };
    const AARSAG_QUESTIONS = [
        {
            context: '1/8 • Årsag (tilbage) vs. Følge (frem)',
            quote: '"Mit vækkeur ringede ikke i morges. ______ kom jeg en halv time for sent på arbejde."',
            options: ['Derfor', 'Nemlig', 'Således'],
            correct: 'Derfor',
            explanation: 'Sætning 2 er RESULTATET af sætning 1, og ordet står forrest med inversion: "Derfor kom jeg...".'
        },
        {
            context: '2/8 • Årsag (tilbage) vs. Følge (frem)',
            quote: '"Jeg kom en halv time for sent på arbejde i morges. Mit vækkeur ringede ______ ikke."',
            options: ['nemlig', 'derfor', 'dermed'],
            correct: 'nemlig',
            explanation: 'Nu er rækkefølgen vendt om! Sætning 2 forklarer ÅRSAGEN til forsinkelsen, og "nemlig" står inde efter verbet ("ringede").'
        },
        {
            context: '3/8 • Logisk konklusion ud fra spor',
            quote: '"Der er lys i vinduerne, og musikken spiller derinde. De er ______ hjemme nu."',
            options: ['altså', 'derfor', 'således'],
            correct: 'altså',
            explanation: 'Lyset er ikke årsagen til at de er hjemme – det er et bevis, hvorfra vi drager den logiske konklusion med "altså"!'
        },
        {
            context: '4/8 • Direkte konsekvens af en handling',
            quote: '"Holdet vandt finalen med 3-0 og sikrede sig ______ guldet for tredje år i træk."',
            options: ['dermed', 'nemlig', 'ellers'],
            correct: 'dermed',
            explanation: '"Dermed" ("med denne sejr") viser, at sejren på 3-0 automatisk udløste guldmedaljen.'
        },
        {
            context: '5/8 • Forklaring på et afslag',
            quote: '"Du behøver ikke at købe mælk med hjem. Jeg har ______ lige købt to liter i Netto."',
            options: ['nemlig', 'derfor', 'altså'],
            correct: 'nemlig',
            explanation: 'Sætning 2 giver begrundelsen for, hvorfor du ikke behøver købe mælk, og "nemlig" står lige efter hjælpeverbet ("har").'
        },
        {
            context: '6/8 • Resultat af at have købt mælk',
            quote: '"Jeg har lige købt to liter mælk i Netto. ______ behøver du ikke at købe mere."',
            options: ['Derfor', 'Nemlig', 'Dog'],
            correct: 'Derfor',
            explanation: 'Når købet nævnes først, peger "Derfor" frem på konsekvensen (og står forrest med inversion).'
        },
        {
            context: '7/8 • Formel/skriftlig sammenfatning',
            quote: '"Alle sikkerhedskrav blev opfyldt til punkt og prikke, og ______ kunne fabrikken åbne til tiden."',
            options: ['således', 'nemlig', 'for resten'],
            correct: 'således',
            explanation: '"Således" ("på denne måde / derfor") passer perfekt i formelt og skriftligt sprog.'
        },
        {
            context: '8/8 • Opsummerende matematik i hverdagen',
            quote: '"Vi er fire voksne og to børn til middag. Vi bliver ______ seks personer i alt."',
            options: ['altså', 'nemlig', 'dermed'],
            correct: 'altså',
            explanation: '"Altså" summerer tallene op ("4 + 2 = vi bliver altså 6 i alt").'
        }
    ];

    function renderTabAarsag(parent) {
        const introHtml = `
            <div class="special-intro-box">
                <h2>⚡ Årsag, følge og konklusion</h2>
                <p>Lær den afgørende forskel på at pege <strong>frem mod resultatet</strong> (<em>derfor, dermed, således</em>), pege <strong>tilbage på årsagen</strong> (<em>nemlig</em>) og drage en <strong>logisk konklusion</strong> (<em>altså</em>).</p>
            </div>
            <div class="special-rule-cards-grid">
                <div class="special-rule-card" style="border-color:#22c55e;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#4ade80;">➡️ derfor</span>
                        <span class="special-rule-role" style="background:rgba(34,197,94,0.2); color:#86efac;">Peger FREM (Resultat)</span>
                    </div>
                    <div class="special-rule-desc">Sætning 1 er årsagen ➔ <strong>Derfor</strong> + sætning 2 (resultatet). Udløser inversion i front!</div>
                    <div class="special-rule-example" style="border-color:#22c55e;">
                        <span>"Jeg er syg. <strong>Derfor</strong> bliver jeg hjemme."</span>
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#06b6d4;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#22d3ee;">⬅️ nemlig</span>
                        <span class="special-rule-role" style="background:rgba(6,182,212,0.2); color:#67e8f9;">Peger TILBAGE (Årsag)</span>
                    </div>
                    <div class="special-rule-desc">Sætning 1 er resultatet ⬅ Sætning 2 med <strong>nemlig</strong> giver årsagen. Står ALTID efter verbet!</div>
                    <div class="special-rule-example" style="border-color:#06b6d4;">
                        <span>"Jeg bliver hjemme. Jeg er <strong>nemlig</strong> syg."</span>
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#eab308;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#fde047;">🧮 altså</span>
                        <span class="special-rule-role" style="background:rgba(234,179,8,0.2); color:#fef08a;">Logisk konklusion</span>
                    </div>
                    <div class="special-rule-desc">Drager en konklusion ud fra spor eller tal ("med andre ord / så").</div>
                    <div class="special-rule-example" style="border-color:#eab308;">
                        <span>"Klokken er 8:10. Vi er <strong>altså</strong> for sent på den."</span>
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#a855f7;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#c084fc;">🔗 dermed / således</span>
                        <span class="special-rule-role" style="background:rgba(168,85,247,0.2); color:#d8b4fe;">Direkte følge</span>
                    </div>
                    <div class="special-rule-desc"><strong>Dermed</strong> = gennem denne handling. <strong>Således</strong> = på denne måde (formelt).</div>
                    <div class="special-rule-example" style="border-color:#a855f7;">
                        <span>"Han skrev under og er <strong>dermed</strong> bundet."</span>
                    </div>
                </div>
            </div>
        `;

        renderQuizEngine(parent, {
            introHtml,
            state: aarsagState,
            questions: AARSAG_QUESTIONS,
            progressLabel: '⚡ ÅRSAG & FØLGE',
            doneTitle: 'Årsag og følge mestret!'
        });
    }

    // ==========================================
    // TAB 7: KONTRAST-MESTEREN (ALLIGEVEL, DERIMOD, TIL GENGÆLD, TVÆRTIMOD)
    // ==========================================
    const kontrastState = { idx: 0, score: 0 };
    const KONTRAST_QUESTIONS = [
        {
            context: '1/8 • Forhindring overvindes',
            quote: '"Billetten til koncerten kostede 800 kroner. ______ købte han den uden at tøve."',
            options: ['Alligevel', 'Derimod', 'Tværtimod'],
            correct: 'Alligevel',
            explanation: 'Den høje pris er en forhindring, men han køber billetten PÅ TRODS AF prisen ➔ "Alligevel".'
        },
        {
            context: '2/8 • Sammenligning af to byer (A vs. B)',
            quote: '"København har mange gamle tårne og slotte. Aarhus er ______ kendt for sit unge universitetsmiljø."',
            options: ['derimod', 'alligevel', 'tværtimod'],
            correct: 'derimod',
            explanation: 'Vi sammenligner to forskellige byer (A vs. B) ➔ "derimod".'
        },
        {
            context: '3/8 • Kompensation (Ulempe + Fordel)',
            quote: '"Hotelværelset havde ingen udsigt over havet. ______ var morgenmadsbuffeten helt fantastisk!"',
            options: ['Til gengæld', 'Tværtimod', 'Derimod'],
            correct: 'Til gengæld',
            explanation: 'Den gode morgenmad kompenserer og vejer op for den manglende udsigt ➔ "Til gengæld".'
        },
        {
            context: '4/8 • 180 Graders afvisning efter "Nej"',
            quote: '"Troede du, at kurset var kedeligt? Nej, ______ – det var det mest spændende kursus i år!"',
            options: ['tværtimod', 'til gengæld', 'alligevel'],
            correct: 'tværtimod',
            explanation: 'Påstanden "kedeligt" afvises 100% og vendes til det stik modsatte ("mest spændende") ➔ "tværtimod".'
        },
        {
            context: '5/8 • Blød indrømmelse inde i sætningen',
            quote: '"Bogen er ret svær at læse i starten. Den bliver ______ meget lettere efter kapitel tre."',
            options: ['dog', 'tværtimod', 'ellers'],
            correct: 'dog',
            explanation: '"Dog" står inde i sætningen efter verbet ("bliver") og giver en blød, nuanceret kontrast.'
        },
        {
            context: '6/8 • To brødres modsatte interesser',
            quote: '"Min storebror elsker at stå på ski i Norge. Jeg foretrækker ______ en varm solferie i Spanien."',
            options: ['derimod', 'alligevel', 'dog'],
            correct: 'derimod',
            explanation: 'Storebror (Norge/ski) sættes op som kontrast mod "jeg" (Spanien/sol) ➔ "derimod".'
        },
        {
            context: '7/8 • Fordel der opvejes af en ulempe',
            quote: '"Den nye telefon har et virkelig godt kamera. ______ løber batteriet desværre ret hurtigt tør."',
            options: ['Til gengæld', 'Tværtimod', 'Alligevel'],
            correct: 'Til gengæld',
            explanation: '"Til gengæld" bruges også, når en fordel i sætning 1 modsvares af en ulempe i sætning 2 ("on the other hand / as a trade-off").'
        },
        {
            context: '8/8 • På trods af god forberedelse',
            quote: '"Vi øvede os i flere uger op til turneringen. Vi tabte ______ den første kamp."',
            options: ['alligevel', 'derimod', 'tværtimod'],
            correct: 'alligevel',
            explanation: 'Nederlaget skete på trods af flere ugers træning ➔ "alligevel".'
        }
    ];

    function renderTabKontrast(parent) {
        const introHtml = `
            <div class="special-intro-box">
                <h2>⚖️ Kontrast-Mesteren: 4 typer modsætning på dansk</h2>
                <p>På dansk kan man ikke bare bruge ét ord for kontrast. Vælg præcis det ord, der passer til <strong>typen af modsætning</strong>:</p>
            </div>
            <div class="special-rule-cards-grid">
                <div class="special-rule-card" style="border-color:#f97316;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#fb923c;">🌧️ alligevel / dog</span>
                        <span class="special-rule-role" style="background:rgba(249,115,22,0.2); color:#fdba74;">Trods forhindring</span>
                    </div>
                    <div class="special-rule-desc">Handlingen sker <strong>på trods af</strong> en forhindring eller forventning.</div>
                    <div class="special-rule-example" style="border-color:#f97316;">
                        <span>"Det regner. <strong>Alligevel</strong> cykler hun."</span>
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#06b6d4;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#22d3ee;">👥 derimod</span>
                        <span class="special-rule-role" style="background:rgba(6,182,212,0.2); color:#67e8f9;">Person A vs. Person B</span>
                    </div>
                    <div class="special-rule-desc">Sammenligner to forskellige personer, byer eller ting, der er modsatte.</div>
                    <div class="special-rule-example" style="border-color:#06b6d4;">
                        <span>"Han drikker kaffe. Hun drikker <strong>derimod</strong> te."</span>
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#22c55e;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#4ade80;">⚖️ til gengæld</span>
                        <span class="special-rule-role" style="background:rgba(34,197,94,0.2); color:#86efac;">Kompensation</span>
                    </div>
                    <div class="special-rule-desc">En fordel i sætning 2 vejer op for en ulempe i sætning 1 (balance på vægten).</div>
                    <div class="special-rule-example" style="border-color:#22c55e;">
                        <span>"Værelset er lille. <strong>Til gengæld</strong> er det billigt."</span>
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#ef4444;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#f87171;">🔄 tværtimod</span>
                        <span class="special-rule-role" style="background:rgba(239,68,68,0.2); color:#fca5a5;">180° Afvisning</span>
                    </div>
                    <div class="special-rule-desc">Afviser en påstand (ofte efter <em>Nej</em>) og siger, at det stik modsatte er sandt!</div>
                    <div class="special-rule-example" style="border-color:#ef4444;">
                        <span>"Er du sur? Nej, <strong>tværtimod</strong>!"</span>
                    </div>
                </div>
            </div>
        `;

        renderQuizEngine(parent, {
            introHtml,
            state: kontrastState,
            questions: KONTRAST_QUESTIONS,
            progressLabel: '⚖️ KONTRAST-MESTEREN',
            doneTitle: 'Kontrast-mesteren gennemført!'
        });
    }

    // ==========================================
    // TAB 8: ALTERNATIV & FORBEHOLD (10 ØVELSER)
    // ==========================================
    const alternativState = { idx: 0, score: 0 };
    const ALTERNATIV_QUESTIONS = [
        {
            context: '1/10 • Advarsel vs. Plan B',
            quote: '"Husk at gemme dokumentet hvert tiende minut! ______ risikerer du at miste hele dit arbejde."',
            options: ['Ellers', 'I stedet', 'I det mindste'],
            correct: 'Ellers',
            explanation: '"Ellers" advarer om den negative konsekvens, hvis du IKKE gemmer dokumentet.'
        },
        {
            context: '2/10 • Advarsel vs. Plan B',
            quote: '"Biografen havde udsolgt til filmen klokken 20. Vi gik ud og spiste pizza ______."',
            options: ['i stedet', 'ellers', 'kort sagt'],
            correct: 'i stedet',
            explanation: 'Pizzaen var jeres aktive valg af Plan B som erstatning for biografturen ➔ "i stedet".'
        },
        {
            context: '3/10 • Sikker bundgrænse vs. Trøst',
            quote: '"Jeg ved ikke præcis hvad uret koster, men det koster ______ over 2.000 kroner."',
            options: ['i hvert fald', 'i stedet', 'ellers'],
            correct: 'i hvert fald',
            explanation: '"I hvert fald" sætter en sikker bundgrænse: Jeg kender ikke det præcise tal, men 2.000 kr. er 100% sikkert minimum.'
        },
        {
            context: '4/10 • Trøst i en uheldig situation',
            quote: '"Jeg tabte min telefon på gaden og fik en ridse, men skærmen gik ______ ikke i stykker!"',
            options: ['i det mindste', 'ellers', 'derimod'],
            correct: 'i det mindste',
            explanation: '"I det mindste" ("at least") udtrykker lettelse og trøst over, at skærmen trods alt overlevede.'
        },
        {
            context: '5/10 • Overraskende ekstra bonus',
            quote: '"Kurset er fuldstændig gratis, og man får ______ gratis frokost og kaffe med!"',
            options: ['endda', 'ellers', 'i stedet'],
            correct: 'endda',
            explanation: '"Endda" fremhæver en overraskende ekstra bonus oveni, at kurset allerede er gratis.'
        },
        {
            context: '6/10 • Uformelt emneskift i samtale',
            quote: '"Det var hyggeligt at snakke med dig! Hov, ______ – skal du med til sommerfesten på fredag?"',
            options: ['for resten', 'kort sagt', 'ellers'],
            correct: 'for resten',
            explanation: '"For resten" bruges, når man pludselig kommer i tanke om et nyt emne i samtalen.'
        },
        {
            context: '7/10 • Konkluderende opsamling',
            quote: '"Leveringen var forsinket, varen var i stykker og kundeservice svarede ikke. ______ var det en elendig oplevelse."',
            options: ['Kort sagt', 'I stedet', 'For resten'],
            correct: 'Kort sagt',
            explanation: '"Kort sagt" opsummerer alle de tre dårlige oplevelser i én samlet dom.'
        },
        {
            context: '8/10 • Valg af sundere alternativ',
            quote: '"Lægen sagde, at jeg skulle drikke mindre sodavand. ______ drikker jeg nu danskvand med citron."',
            options: ['I stedet', 'Ellers', 'Endda'],
            correct: 'I stedet',
            explanation: 'Danskvand erstatter sodavand som et nyt, aktivt valg ➔ "I stedet" (med inversion i forfeltet!).'
        },
        {
            context: '9/10 • Krav for at bestå',
            quote: '"Du skal besvare mindst 70% af spørgsmålene rigtigt. ______ består du ikke prøven."',
            options: ['Ellers', 'I stedet', 'I øvrigt'],
            correct: 'Ellers',
            explanation: '"Ellers" = "hvis du ikke opnår 70%, så består du ikke".'
        },
        {
            context: '10/10 • Sikkerhed trods manglende viden',
            quote: '"Jeg ved ikke om hun tager telefonen nu, men jeg kan ______ sende hende en sms."',
            options: ['i hvert fald', 'ellers', 'kort sagt'],
            correct: 'i hvert fald',
            explanation: '"I hvert fald" viser hvad man med sikkerhed altid kan gøre, uanset om hun svarer eller ej.'
        }
    ];

    function renderTabAlternativ(parent) {
        const introHtml = `
            <div class="special-intro-box">
                <h2>🛡️ Alternativ, forbehold og opsamling</h2>
                <p>Træn de nuancerede tekstbindere, der advarer om konsekvenser (<em>ellers</em>), vælger Plan B (<em>i stedet</em>), sætter en sikker grænse (<em>i hvert fald</em>) eller giver trøst (<em>i det mindste</em>).</p>
            </div>
            <div class="special-rule-cards-grid">
                <div class="special-rule-card" style="border-color:#ef4444;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#f87171;">⚠️ ellers</span>
                        <span class="special-rule-role" style="background:rgba(239,68,68,0.2); color:#fca5a5;">Hvis ikke...</span>
                    </div>
                    <div class="special-rule-desc">Advarer om den negative konsekvens, hvis man <strong>ikke</strong> handler.</div>
                    <div class="special-rule-example" style="border-color:#ef4444;">
                        <span>"Skynd dig! <strong>Ellers</strong> kører toget."</span>
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#06b6d4;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#22d3ee;">🔄 i stedet</span>
                        <span class="special-rule-role" style="background:rgba(6,182,212,0.2); color:#67e8f9;">Plan B (Erstatning)</span>
                    </div>
                    <div class="special-rule-desc">Man opgiver Plan A og vælger aktivt et <strong>alternativ</strong> (Plan B).</div>
                    <div class="special-rule-example" style="border-color:#06b6d4;">
                        <span>"Cyklen er flad. Jeg tager bussen <strong>i stedet</strong>."</span>
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#22c55e;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#4ade80;">🛡️ i hvert fald</span>
                        <span class="special-rule-role" style="background:rgba(34,197,94,0.2); color:#86efac;">100% Bundgrænse</span>
                    </div>
                    <div class="special-rule-desc">Selvom vi er usikre på helheden, er <strong>denne ene ting</strong> helt sikker.</div>
                    <div class="special-rule-example" style="border-color:#22c55e;">
                        <span>"Vi prøver <strong>i hvert fald</strong> så godt vi kan!"</span>
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#eab308;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#fde047;">🌤️ i det mindste</span>
                        <span class="special-rule-role" style="background:rgba(234,179,8,0.2); color:#fef08a;">Trøst / Minimum</span>
                    </div>
                    <div class="special-rule-desc">Et trøstende lyspunkt midt i noget uheldigt ("trods alt").</div>
                    <div class="special-rule-example" style="border-color:#eab308;">
                        <span>"Det regner, men her er <strong>i det mindste</strong> tørt."</span>
                    </div>
                </div>
            </div>
        `;

        renderQuizEngine(parent, {
            introHtml,
            state: alternativState,
            questions: ALTERNATIV_QUESTIONS,
            progressLabel: '🛡️ ALTERNATIV & FORBEHOLD',
            doneTitle: 'Alternativ og forbehold mestret!'
        });
    }

    // Initial render
    switchTab((extraData && (extraData.subPath || extraData.tab)) ? (extraData.subPath || extraData.tab) : 'vrimmel');
    container.appendChild(viewContainer);
}
