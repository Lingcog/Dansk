import { getTranslation, getLang } from '../utils/i18n.js';
import { shuffleArray } from '../utils/shuffle.js';

/**
 * ArbejdeBilvaerkstedView - Scenarie: "Arbejde – På bilværkstedet" under "Mit hverdagsliv"
 *
 * Indeholder 32 målord med præcis fordeling på de 4 ordklasser:
 * - 16 Substantiver (50 %) - kombination af kerneord og faste værkstedstermer
 * - 8 Verber (25 %) - kombination af kerneord og faste værkstedshandlinger
 * - 4 Adjektiver (12,5 %) - tilstand og egenskaber på værkstedet
 * - 4 Adverbier (12,5 %) - måde og holdning på værkstedet
 *
 * 6 didaktiske faner:
 * 1. 🔍 Vrimlebillede (32 kompakte, farvekodede pegefelter, ordklasse-filter, zoom, målordsdefinitioner, faste termer + 4-kategoris sortering & en/et-sortering)
 * 2. 🕵️ Ord-detektiv (10 missioner på tværs af alle 4 ordklasser og faste termer)
 * 3. 🔄 Synonymer & Antonymer (Modsætninger og synonymer/faste fagudtryk for alle ordklasser)
 * 4. 📖 Historier (4 realistiske værkstedshistorier med interaktive spørgsmål)
 * 5. ✍️ Sætningsbygning (Farvekodet sætningsbygger med alle 4 ordklasser + 10 sætnings-puslespil)
 * 6. 💬 Mundtlige dialoger (NY OPGAVE TIL SIDST: 5 realistiske mundtlige værkstedsdialoger i blandet rækkefølge, som skal sættes i rigtig rækkefølge)
 */
export function renderArbejdeBilvaerkstedView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container bilvaerksted-view';

    // Top Bar with back button + workplace switcher
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.cssText = 'display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || 'Tilbage til Arbejde'}`;
    backBtn.onclick = () => navigateFn('mit_hverdagsliv_arbejde');
    topBar.appendChild(backBtn);

    const workplaceSwitch = document.createElement('div');
    workplaceSwitch.style.cssText = 'display: flex; gap: 0.5rem; align-items: center;';
    workplaceSwitch.innerHTML = `
        <span style="background: rgba(56, 189, 248, 0.2); border: 1px solid #38bdf8; color: #38bdf8; padding: 0.45rem 0.9rem; border-radius: 10px; font-weight: 800; font-size: 0.85rem;">🔧 Bilværksted (Aktiv)</span>
        <button id="switch-to-koekken-btn" style="background: rgba(249, 115, 22, 0.15); border: 1px solid rgba(249, 115, 22, 0.45); color: #fb923c; padding: 0.45rem 0.9rem; border-radius: 10px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">👩‍🍳 Skift til Køkkenassistent ➔</button>
    `;
    workplaceSwitch.querySelector('#switch-to-koekken-btn').onclick = () => navigateFn('mit_hverdagsliv_arbejde_koekken');
    topBar.appendChild(workplaceSwitch);

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

    // ========================================================
    // --- 32 MÅLORD PÅ BILVÆRKSTEDET (50% Sub, 25% Verb, 12.5% Adj, 12.5% Adv)
    // ========================================================
    const WORKSHOP_WORDS = [
        // --- 16 SUBSTANTIVER (50%) ---
        {
            id: 'mekaniker',
            num: 1,
            word: 'en mekaniker',
            clean: 'mekaniker',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: mekanikeren | Flertal: mekanikere',
            x: 40,
            y: 48,
            icon: '👨‍🔧',
            isCore: false,
            definition: 'En fagperson på et bilværksted, som undersøger, servicerer og reparerer biler.',
            fixedTerms: 'at køre bilen til mekanikeren • en udlært automekaniker • en dygtig mekaniker',
            sentence: 'Mekanikeren står under bilen og tjekker undervognen med sin lampe.'
        },
        {
            id: 'autovaerksted',
            num: 2,
            word: 'et autoværksted',
            clean: 'autoværksted',
            wordClass: 'substantiv',
            gender: 'et',
            forms: 'Bestemt: autoværkstedet | Flertal: autoværksteder',
            x: 48,
            y: 7,
            icon: '🏢',
            isCore: false,
            definition: 'Et værksted med lift og specialværktøj, hvor biler bliver repareret og serviceret.',
            fixedTerms: 'bilen er på værksted • at bestille tid på et autoværksted',
            sentence: 'Der er travlt på det lokale autoværksted i dag.'
        },
        {
            id: 'bil',
            num: 3,
            word: 'en bil',
            clean: 'bil',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: bilen | Flertal: biler',
            x: 35,
            y: 20,
            icon: '🚗',
            isCore: true,
            definition: 'Køretøj med motor og fire hjul (kerneord fra Lær nye ord).',
            fixedTerms: 'at indlevere bilen • en lånebil • bilen skal til serviceeftersyn',
            sentence: 'Den blå bil hænger højt oppe på liften.'
        },
        {
            id: 'autolift',
            num: 4,
            word: 'en autolift',
            clean: 'autolift',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: autoliften | Flertal: autolifte',
            x: 23.5,
            y: 42,
            icon: '🏗️',
            isCore: false,
            definition: 'Hydraulisk løfteapparat på værkstedet, der løfter hele bilen op i luften.',
            fixedTerms: 'at køre bilen på liften • at hæve og sænke autoliften',
            sentence: 'Autoliften løfter bilen, så mekanikeren kan se ind under bunden.'
        },
        {
            id: 'motor',
            num: 5,
            word: 'en motor',
            clean: 'motor',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: motoren | Flertal: motorer',
            x: 63,
            y: 72,
            icon: '⚙️',
            isCore: true,
            definition: 'Maskinen under motorhjelmen, der får bilen til at køre.',
            fixedTerms: 'at åbne motorhjelmen • motoren hakker • motorlampen lyser',
            sentence: 'Mekanikeren kigger ned i bilens åbne motor.'
        },
        {
            id: 'daek',
            num: 6,
            word: 'et dæk',
            clean: 'dæk',
            wordClass: 'substantiv',
            gender: 'et',
            forms: 'Bestemt: dækket | Flertal: dæk',
            x: 10,
            y: 23,
            icon: '🛞',
            isCore: false,
            definition: 'Den sorte gummiring omkring bilens hjul, der rører ved vejen.',
            fixedTerms: 'sommerdæk og vinterdæk • dæktryk • lovpligtigt dækmønster',
            sentence: 'På reolen til venstre står der både sommerdæk og vinterdæk.'
        },
        {
            id: 'bremse',
            num: 7,
            word: 'en bremse',
            clean: 'bremse',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: bremsen | Flertal: bremser',
            x: 55,
            y: 21,
            icon: '🛑',
            isCore: false,
            definition: 'Den vigtige sikkerhedsdel ved hjulene, der får bilen til at sætte farten ned og standse.',
            fixedTerms: 'bremseklodser og bremseskiver • bremserne hyler • håndbremse',
            sentence: 'Hvis bremserne piber, når du træder på pedalen, bør bremseklodserne skiftes.'
        },
        {
            id: 'batteri',
            num: 8,
            word: 'et batteri',
            clean: 'batteri',
            wordClass: 'substantiv',
            gender: 'et',
            forms: 'Bestemt: batteriet | Flertal: batterier',
            x: 68,
            y: 74,
            icon: '🔋',
            isCore: false,
            definition: 'Strømkilde under motorhjelmen, der giver strøm til at starte bilen og tænde lyset.',
            fixedTerms: 'at oplade batteriet • startkabler • et fladt bilbatteri',
            sentence: 'I hård frost kan et gammelt batteri miste strømmen.'
        },
        {
            id: 'motorolie',
            num: 9,
            word: 'en motorolie',
            clean: 'motorolie',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: motorolien | Flertal: motorolier',
            x: 59,
            y: 63,
            icon: '🛢️',
            isCore: false,
            definition: 'Smørevæske i dunken, der beskytter motorens bevægelige dele mod varme og slitage.',
            fixedTerms: 'at måle oliestanden med oliepinden • olieskift og nyt oliefilter',
            sentence: 'Mekanikeren hælder frisk motorolie fra den gule dunk ned i motoren.'
        },
        {
            id: 'udstoedning',
            num: 10,
            word: 'en udstødning',
            clean: 'udstødning',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: udstødningen | Flertal: udstødninger',
            x: 35,
            y: 33,
            icon: '💨',
            isCore: false,
            definition: 'Rørsystemet under bilens bund, som leder røggasser væk og dæmper motorlarmen.',
            fixedTerms: 'et hul i udstødningen • en rusten lydpotte • udstødningsrør',
            sentence: 'Under den blå bil kan man tydeligt se udstødningen og lydpotten.'
        },
        {
            id: 'forrude',
            num: 11,
            word: 'en forrude',
            clean: 'forrude',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: forruden | Flertal: forruder',
            x: 75,
            y: 56,
            icon: '🪟',
            isCore: false,
            definition: 'Det store glasvindue forrest på bilen, som føreren kigger ud igennem.',
            fixedTerms: 'et stenslag i forruden • en revnet forrude • vinduesviskere og sprinklervæske',
            sentence: 'En lille sten på motorvejen har lavet et stenslag i forruden.'
        },
        {
            id: 'vaerktoej',
            num: 12,
            word: 'et værktøj',
            clean: 'værktøj',
            wordClass: 'substantiv',
            gender: 'et',
            forms: 'Bestemt: værktøjet | Flertal: værktøjer',
            x: 32,
            y: 84,
            icon: '🧰',
            isCore: true,
            definition: 'Redskaber i den røde værktøjsvogn, som bruges til reparationer.',
            fixedTerms: 'en rullende værktøjsvogn • håndværktøj og trykluftværktøj',
            sentence: 'Alt værktøjet ligger klar i den røde værktøjsvogn på hjul.'
        },
        {
            id: 'skruenoegle',
            num: 13,
            word: 'en skruenøgle',
            clean: 'skruenøgle',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: skruenøglen | Flertal: skruenøgler',
            x: 40.5,
            y: 56.5,
            icon: '🔧',
            isCore: false,
            definition: 'Stålredskab til at løsne eller spænde møtrikker og bolte på bilen.',
            fixedTerms: 'en fastnøgle • en momentnøgle • at løsne en rusten møtrik',
            sentence: 'Mekanikeren holder en skruenøgle i hånden under liften.'
        },
        {
            id: 'donkraft',
            num: 14,
            word: 'en donkraft',
            clean: 'donkraft',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: donkraften | Flertal: donkrafte',
            x: 24,
            y: 93,
            icon: '⚙️',
            isCore: false,
            definition: 'Lavt løfteredskab på hjul, man skubber ind under bilen for at løfte ét hjul ad gangen.',
            fixedTerms: 'at pumpe donkraften op • løftepunkt under bilens panel',
            sentence: 'Den blå donkraft står på gulvet lige ved siden af lærlingen.'
        },
        {
            id: 'reservedel',
            num: 15,
            word: 'en reservedel',
            clean: 'reservedel',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: reservedelen | Flertal: reservedele',
            x: 69,
            y: 21,
            icon: '📦',
            isCore: false,
            definition: 'En ny bil-del fra lagerreolen, som sættes ind i stedet for en slidt eller defekt del.',
            fixedTerms: 'originale reservedele • at bestille en reservedel hjem',
            sentence: 'På reolen bagved står der nye reservedele som oliefiltre, slanger og remme.'
        },
        {
            id: 'regning',
            num: 16,
            word: 'en regning',
            clean: 'regning',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'Bestemt: regningen | Flertal: regninger',
            x: 88,
            y: 83,
            icon: '🧾',
            isCore: true,
            definition: 'Dokument på disken, der viser prisen for arbejdstimer, reservedele og moms.',
            fixedTerms: 'et uforpligtende pristilbud • arbejdsløn inkl. moms • at betale regningen',
            sentence: 'Ved skranken gennemgår medarbejderen regningen med kunden.'
        },

        // --- 8 VERBER (25%) ---
        {
            id: 'reparere',
            num: 17,
            word: 'at reparere',
            clean: 'reparerer',
            wordClass: 'verbum',
            forms: 'Nutid: reparerer | Datid: reparerede | Førnutid: har repareret',
            x: 33,
            y: 41,
            icon: '🛠️',
            isCore: false,
            definition: 'At sætte noget i stand, som er gået i stykker, så det fungerer igen.',
            fixedTerms: 'at reparere en skade • at reparere et stenslag • kan det betale sig at reparere?',
            sentence: 'Mekanikeren reparerer den utætte udstødning under bilen.'
        },
        {
            id: 'skifte',
            num: 18,
            word: 'at skifte',
            clean: 'skifter',
            wordClass: 'verbum',
            forms: 'Nutid: skifter | Datid: skiftede | Førnutid: har skiftet',
            x: 4,
            y: 84,
            icon: '🔄',
            isCore: true,
            definition: 'At fjerne en gammel eller slidt del og sætte en ny del på plads.',
            fixedTerms: 'at skifte fra sommerdæk til vinterdæk • at skifte olie • at skifte en pære',
            sentence: 'Lærlingen skifter dækkene på den røde bil.'
        },
        {
            id: 'tjekke',
            num: 19,
            word: 'at tjekke',
            clean: 'tjekker',
            wordClass: 'verbum',
            forms: 'Nutid: tjekker | Datid: tjekkede | Førnutid: har tjekket',
            x: 36.5,
            y: 39,
            icon: '🔎',
            isCore: true,
            definition: 'At kontrollere og efterse grundigt, om alt på bilen er sikkert og i orden.',
            fixedTerms: 'at tjekke dæktryk • at tjekke oliestanden • et 30-punkts sikkerhedstjek',
            sentence: 'Mekanikeren lyser med lampen for at tjekke bremser og rør under bilen.'
        },
        {
            id: 'loefte',
            num: 20,
            word: 'at løfte',
            clean: 'løfter',
            wordClass: 'verbum',
            forms: 'Nutid: løfter | Datid: løftede | Førnutid: har løftet',
            x: 48,
            y: 35,
            icon: '⬆️',
            isCore: true,
            definition: 'At hæve noget tungt op fra gulvet ved hjælp af en autolift eller donkraft.',
            fixedTerms: 'at løfte bilen på liften • pas på ryggen, når du løfter tunge dæk',
            sentence: 'De gule bærearme på autoliften løfter bilen sikkert op.'
        },
        {
            id: 'spaende',
            num: 21,
            word: 'at spænde',
            clean: 'spænder',
            wordClass: 'verbum',
            forms: 'Nutid: spænder | Datid: spændte | Førnutid: har spændt',
            x: 15,
            y: 77,
            icon: '🔩',
            isCore: false,
            definition: 'At stramme hjulbolte og møtrikker godt fast med det rigtige tryk.',
            fixedTerms: 'at efterspænde hjulboltene efter 100 km • at spænde med hjulnøgle',
            sentence: 'Lærlingen spænder hjulboltene fast på den røde bils baghjul.'
        },
        {
            id: 'paafylde',
            num: 22,
            word: 'at påfylde',
            clean: 'påfylder',
            wordClass: 'verbum',
            forms: 'Nutid: påfylder | Datid: påfyldte | Førnutid: har påfyldt',
            x: 62.5,
            y: 66,
            icon: '🫗',
            isCore: false,
            definition: 'At hælde ny væske (olie, kølervæske eller sprinklervæske) på bilens beholdere.',
            fixedTerms: 'at påfylde frisk motorolie • at efterfylde blå sprinklervæske',
            sentence: 'Mekanikeren i blåt arbejdstøj påfylder ny olie direkte i motoren.'
        },
        {
            id: 'fejlsoege',
            num: 23,
            word: 'at fejlsøge',
            clean: 'fejlsøger',
            wordClass: 'verbum',
            forms: 'Nutid: fejlsøger | Datid: fejlsøgte | Førnutid: har fejlsøgt',
            x: 45.5,
            y: 74,
            icon: '💻',
            isCore: false,
            definition: 'At tilslutte en diagnosetester for at finde ud af, hvorfor en advarselslampe lyser.',
            fixedTerms: 'elektronisk fejlsøgning • at udlæse fejlkoder på bilens computer',
            sentence: 'På rullebordet ligger diagnosetesteren klar til at fejlsøge bilen.'
        },
        {
            id: 'syne',
            num: 24,
            word: 'at syne',
            clean: 'syner',
            wordClass: 'verbum',
            forms: 'Nutid: syner | Datid: synede | Førnutid: har synet',
            x: 84,
            y: 66,
            icon: '📋',
            isCore: false,
            definition: 'At foretage den lovpligtige kontrol af, om bilen er sikker at køre i.',
            fixedTerms: 'periodisk bilsyn • bilen gik glat gennem syn • klargøring til syn',
            sentence: 'Værkstedet klargør og tjekker hele bilen, før den skal synes.'
        },

        // --- 4 ADJEKTIVER (12.5%) ---
        {
            id: 'slidt',
            num: 25,
            word: 'slidt',
            clean: 'slidt',
            wordClass: 'adjektiv',
            forms: 'En-ord: slidt | Et-ord: slidt | Bestemt/Flertal: slidte',
            x: 43,
            y: 34,
            icon: '⚠️',
            isCore: false,
            definition: 'Brugt så længe, at materialet er blevet tyndt og trænger til udskiftning.',
            fixedTerms: 'slidte bremseklodser • et slidt dækmønster • sliddele på bilen',
            sentence: 'Bremseskiverne og dækkene kontrolleres for, om de er slidte.'
        },
        {
            id: 'flad',
            num: 26,
            word: 'flad',
            clean: 'flad',
            wordClass: 'adjektiv',
            forms: 'En-ord: flad | Et-ord: fladt | Bestemt/Flertal: flade',
            x: 12,
            y: 83,
            icon: '🛞',
            isCore: true,
            definition: 'Et dæk der har tabt luften (punkteret), eller et batteri der er løbet tør for strøm.',
            fixedTerms: 'et fladt dæk • et fladt batteri • dækket er helt fladt',
            sentence: 'Kunden kom ind med et fladt dæk, som lærlingen nu har skiftet.'
        },
        {
            id: 'defekt',
            num: 27,
            word: 'defekt',
            clean: 'defekt',
            wordClass: 'adjektiv',
            forms: 'En-ord: defekt | Et-ord: defekt | Bestemt/Flertal: defekte',
            x: 59,
            y: 74,
            icon: '🚨',
            isCore: false,
            definition: 'I stykker; en teknisk del på bilen som ikke længere virker.',
            fixedTerms: 'en defekt pære • en defekt føler i motoren • udskiftning af defekte dele',
            sentence: 'En defekt del i motoren eller en revnet forrude skal udbedres på værkstedet.'
        },
        {
            id: 'koereklar',
            num: 28,
            word: 'køreklar',
            clean: 'køreklar',
            wordClass: 'adjektiv',
            forms: 'En-ord: køreklar | Et-ord: køreklart | Bestemt/Flertal: køreklare',
            x: 89,
            y: 35,
            icon: '✅',
            isCore: false,
            definition: 'Færdigrepareret, sikker og helt klar til at køre ud på vejen igen.',
            fixedTerms: 'bilen er synet og køreklar • vi ringer, når bilen er køreklar',
            sentence: 'Ude foran porten holder den grønne bil helt køreklar efter eftersynet.'
        },

        // --- 4 ADVERBIER (12.5%) ---
        {
            id: 'grundigt',
            num: 29,
            word: 'grundigt',
            clean: 'grundigt',
            wordClass: 'adverbium',
            forms: 'Mådesadverbium (-t form af adjektivet "grundig")',
            x: 40,
            y: 66,
            icon: '🔍',
            isCore: false,
            definition: 'På en meget omhyggelig og nøjagtig måde, hvor alle detaljer bliver tjekket.',
            fixedTerms: 'at undersøge bilen grundigt • at rense bremserne grundigt',
            sentence: 'Mekanikeren gennemgår undervognen grundigt med sin arbejdslampe.'
        },
        {
            id: 'forsigtigt',
            num: 30,
            word: 'forsigtigt',
            clean: 'forsigtigt',
            wordClass: 'adverbium',
            forms: 'Mådesadverbium (-t form af adjektivet "forsigtig")',
            x: 53,
            y: 58,
            icon: '🧤',
            isCore: true,
            definition: 'Roligt og med stor omtanke, så man ikke spilder olie eller laver skader.',
            fixedTerms: 'at sænke liften forsigtigt • at hælde olie på forsigtigt',
            sentence: 'Han hælder olien forsigtigt ned i motoren uden at spilde.'
        },
        {
            id: 'hurtigt',
            num: 31,
            word: 'hurtigt',
            clean: 'hurtigt',
            wordClass: 'adverbium',
            forms: 'Mådesadverbium (-t form af adjektivet "hurtig" – kerneord)',
            x: 18,
            y: 63,
            icon: '⚡',
            isCore: true,
            definition: 'På kort tid og med høj arbejdshastighed.',
            fixedTerms: 'at klare et hjulskift hurtigt • vi finder fejlen hurtigt',
            sentence: 'Den unge lærling arbejder hurtigt og effektivt med hjulskiftet.'
        },
        {
            id: 'heldigvis',
            num: 32,
            word: 'heldigvis',
            clean: 'heldigvis',
            wordClass: 'adverbium',
            forms: 'Holdningsadverbium (udtrykker lettelse – kerneord)',
            x: 92,
            y: 73,
            icon: '🍀',
            isCore: true,
            definition: 'Viser talerens lettelse over, at problemet ikke var så slemt eller dyrt som frygtet.',
            fixedTerms: 'det er heldigvis kun en sikring • garantien dækker heldigvis',
            sentence: 'Kunden smiler ved skranken, for regningen blev heldigvis ikke dyr!'
        }
    ];

    const CLASS_META = {
        substantiv: { label: '🟢 Substantiv', short: 'Substantiv', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.18)' },
        verbum: { label: '🔴 Verbum', short: 'Verbum', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.18)' },
        adjektiv: { label: '🟠 Adjektiv', short: 'Adjektiv', color: '#f97316', bg: 'rgba(249, 115, 22, 0.18)' },
        adverbium: { label: '🔵 Adverbium', short: 'Adverbium', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.18)' }
    };

    // Sprogvalg til oversættelseshjælp i historier, vrimlebillede og dialoger
    const SUPPORTED_TRANS_LANGS = [
        { code: 'en', label: '🇬🇧 English (Engelsk)' },
        { code: 'de', label: '🇩🇪 Deutsch (Tysk)' },
        { code: 'es', label: '🇪🇸 Español (Spansk)' },
        { code: 'pt', label: '🇵🇹 Português (Portugisisk)' },
        { code: 'tr', label: '🇹🇷 Türkçe (Tyrkisk)' },
        { code: 'ar', label: '🇸🇦 العربية (Arabisk)' },
        { code: 'fa', label: '🇮🇷 فارسی (Farsi)' },
        { code: 'ku', label: '☀️ Kurdî (Kurdisk)' },
        { code: 'ur', label: '🇵🇰 اردو (Urdu)' },
        { code: 'ru', label: '🇷🇺 Русский (Russisk)' },
        { code: 'uk', label: '🇺🇦 Українська (Ukrainsk)' },
        { code: 'zh', label: '🇨🇳 中文 (Kinesisk)' },
        { code: 'vi', label: '🇻🇳 Tiếng Việt (Vietnamesisk)' },
        { code: 'th', label: '🇹🇭 ไทย (Thai)' },
        { code: 'ne', label: '🇳🇵 नेपाली (Nepalesisk)' },
        { code: 'ps', label: '🇦🇫 پښتو (Pashto)' }
    ];

    function getPreferredTransLang() {
        const appLang = getLang ? getLang() : 'da';
        if (appLang && appLang !== 'da') return appLang;
        return localStorage.getItem('bv_preferred_trans_lang') || 'en';
    }

    function setPreferredTransLang(code) {
        localStorage.setItem('bv_preferred_trans_lang', code);
    }

    // Oversættelser for de 32 målord på forsiden af Bilværksted
    const WORKSHOP_TRANSLATIONS = {
        mekaniker: {
            en: 'a car mechanic', de: 'ein Automechaniker / Kfz-Mechatroniker', es: 'un mecánico', pt: 'um mecânico', tr: 'bir oto tamircisi / makinist',
            ar: 'ميكانيكي سيارات', fa: 'مکانیک خودرو', ku: 'mekanîkê erebeyan', ur: 'گاڑیوں کا مکینک', ru: 'автомеханик', uk: 'автомеханік',
            zh: '汽车技工 / 机械师', vi: 'thợ sửa xe / thợ máy', th: 'ช่างซ่อมรถยนต์', ne: 'गाडीको मिस्त्री (मेकानिक)', ps: 'د موټرو مستري'
        },
        laerling: {
            en: 'an apprentice / trainee mechanic', de: 'ein Lehrling / Auszubildender', es: 'un aprendiz', pt: 'um aprendiz', tr: 'bir çırak',
            ar: 'متدرب مهني', fa: 'کارآموز / شاگرد مکانیک', ku: 'şagirt / fêrxwaz', ur: 'شاگرد / زیرِ تربیت مکینک', ru: 'ученик мастера / стажёр', uk: 'учень майстра / стажер',
            zh: '学徒', vi: 'thợ học việc', th: 'ช่างฝึกหัด', ne: 'प्रशिक्षार्थी (सिकारु)', ps: 'شاګرد / زده کوونکی'
        },
        autolift: {
            en: 'a car lift / vehicle hoist', de: 'eine Hebebühne', es: 'un elevador de coches', pt: 'um elevador automotivo', tr: 'bir araç kaldırma lifti',
            ar: 'رافعة سيارات هيدروليكية', fa: 'جک بالابر خودرو', ku: 'lîfta erebeyan', ur: 'گاڑی اٹھانے والی لفٹ', ru: 'автомобильный подъёмник', uk: 'автомобільний підйомник',
            zh: '汽车举升机', vi: 'cầu nâng ô tô', th: 'ลิฟต์ยกรถ', ne: 'गाडी उठाउने लिफ्ट', ps: 'د موټر پورته کولو لفټ'
        },
        motor: {
            en: 'an engine / motor', de: 'ein Motor', es: 'un motor', pt: 'um motor', tr: 'bir motor',
            ar: 'محرك السيارة', fa: 'موتور خودرو', ku: 'motor', ur: 'انجن / موٹر', ru: 'двигатель / мотор', uk: 'двигун / мотор',
            zh: '发动机 / 引擎', vi: 'động cơ', th: 'เครื่องยนต์', ne: 'इन्जिन / मोटर', ps: 'انجن / موټر'
        },
        daek: {
            en: 'a tire / tyre', de: 'ein Reifen', es: 'un neumático', pt: 'um pneu', tr: 'bir lastik',
            ar: 'إطار سيارة (كفر)', fa: 'لاستیک / تایر', ku: 'teker / lastîk', ur: 'ٹائر', ru: 'шина / покрышка', uk: 'шина / покришка',
            zh: '轮胎', vi: 'lốp xe', th: 'ยางรถยนต์', ne: 'टायर', ps: 'ټایر'
        },
        bremse: {
            en: 'a brake (brake disc & brake pads)', de: 'eine Bremse (Bremsscheibe & Bremsbeläge)', es: 'un freno', pt: 'um freio / travão', tr: 'bir fren (fren balatası)',
            ar: 'فرامل / مكابح', fa: 'ترمز (لنت و دیسک ترمز)', ku: 'fren', ur: 'بریک', ru: 'тормоз (тормозные колодки)', uk: 'гальмо (гальмівні колодки)',
            zh: '刹车 / 制动器', vi: 'phanh xe / thắng xe', th: 'เบรก', ne: 'ब्रेक', ps: 'بریک'
        },
        motorolie: {
            en: 'engine oil / motor oil', de: 'Motoröl', es: 'aceite de motor', pt: 'óleo do motor', tr: 'motor yağı',
            ar: 'زيت المحرك', fa: 'روغن موتور', ku: 'rûnê motorê', ur: 'انجن آئل (موٹر آئل)', ru: 'моторное масло', uk: 'моторне мастило (олива)',
            zh: '机油 / 发动机油', vi: 'dầu nhớt động cơ', th: 'น้ำมันเครื่อง', ne: 'इन्जिन तेल (मोबिल)', ps: 'د انجن تېل (مبلایل)'
        },
        vaerktoejskasse: {
            en: 'a toolbox / tool trolley', de: 'ein Werkzeugkasten / Werkzeugwagen', es: 'una caja de herramientas', pt: 'uma caixa de ferramentas', tr: 'bir takım çantası',
            ar: 'صندوق أدوات (عدة)', fa: 'جعبه ابزار', ku: 'qutiya amûran', ur: 'اوزاروں کا ڈبہ (ٹول باکس)', ru: 'ящик для инструментов', uk: 'ящик для інструментів',
            zh: '工具箱', vi: 'hộp đựng dụng cụ', th: 'กล่องเครื่องมือ', ne: 'औजार बाकस (टुलबक्स)', ps: 'د سامانونو بکس'
        },
        skruenoegle: {
            en: 'a wrench / spanner', de: 'ein Schraubenschlüssel', es: 'una llave inglesa', pt: 'uma chave inglesa / de boca', tr: 'bir ingiliz anahtarı / somun anahtarı',
            ar: 'مفتاح ربط (صواميل)', fa: 'آچار', ku: ' mifteya بورiyan / açar', ur: 'رینچ / پانہ', ru: 'гаечный ключ', uk: 'гайковий ключ',
            zh: '扳手', vi: 'cờ lê', th: 'ประแจ', ne: 'रेन्च / पाना', ps: 'رنچ / پانه'
        },
        donkraft: {
            en: 'a car jack', de: 'ein Wagenheber', es: 'un gato hidráulico', pt: 'um macaco hidráulico', tr: 'bir kriko',
            ar: 'رافعة يدوية (عفريتة السيارة)', fa: 'جک دستی خودرو', ku: 'krîko / ceka erebeyê', ur: 'گاڑی اٹھانے والا جیک', ru: 'домкрат', uk: 'домкрат',
            zh: '千斤顶', vi: 'con đội / kích nâng xe', th: 'แม่แรงยกรถ', ne: 'ज्याक (गाडी उठाउने औजार)', ps: 'جک (د موټر پورته کولو وسیله)'
        },
        batteri: {
            en: 'a car battery', de: 'eine Autobatterie', es: 'una batería de coche', pt: 'uma bateria', tr: 'bir akü',
            ar: 'بطارية السيارة', fa: 'باتری خودرو', ku: 'bateriya erebeyê (akû)', ur: 'گاڑی کی بیٹری', ru: 'аккумулятор', uk: 'акумулятор',
            zh: '汽车电瓶 / 蓄电池', vi: 'ắc quy ô tô', th: 'แบตเตอรี่รถยนต์', ne: 'ब्याट्री', ps: 'بطرۍ'
        },
        udstoedning: {
            en: 'an exhaust pipe / exhaust system', de: 'ein Auspuff', es: 'un tubo de escape', pt: 'um escapamento / tubo de escape', tr: 'bir egzoz',
            ar: 'عادم السيارة (شكمان)', fa: 'اگزوز خودرو', ku: 'egzoz', ur: 'سائلنسر / ایگزاسٹ پائپ', ru: 'выхлопная труба / глушитель', uk: 'вихлопна труба / глушник',
            zh: '排气管', vi: 'ống xả', th: 'ท่อไอเสีย', ne: 'साइलेन्सर / धुवाँ निस्कने पाइप', ps: 'سلنسر / د لوګي نل'
        },
        forrude: {
            en: 'a windshield / windscreen', de: 'eine Windschutzscheibe / Frontscheibe', es: 'un parabrisas', pt: 'um para-brisa', tr: 'bir ön cam',
            ar: 'الزجاج الأمامي للسيارة', fa: 'شیشه جلو خودرو', ku: 'cama pêşiyê', ur: 'گاڑی کا اگلا شیشہ (ونڈ سکرین)', ru: 'лобовое стекло', uk: 'лобове скло',
            zh: '挡风玻璃', vi: 'kính chắn gió trước', th: 'กระจกหน้ารถ', ne: 'अगाडिको सिसा (विन्डस्क्रिन)', ps: 'د موټر مخکینۍ ښیښه'
        },
        reservedel: {
            en: 'a spare part / replacement part', de: 'ein Ersatzteil', es: 'un repuesto / pieza de recambio', pt: 'uma peça sobressalente', tr: 'bir yedek parça',
            ar: 'قطعة غيار', fa: 'قطعه یدکی', ku: 'parçeyê yedek', ur: 'اضافی پرزہ (اسپیئر پارٹ)', ru: 'запчасть (запасная часть)', uk: 'запчастина',
            zh: '备件 / 零配件', vi: 'phụ tùng thay thế', th: 'อะไหล่รถยนต์', ne: 'जगेडा पार्टपुर्जा (स्पेयर पार्ट)', ps: 'پرزه (اضافي پرزه)'
        },
        pristilbud: {
            en: 'a price quote / cost estimate', de: 'ein Preisangebot / Kostenvoranschlag', es: 'un presupuesto', pt: 'um orçamento', tr: 'bir fiyat teklifi',
            ar: 'عرض سعر / تقدير التكلفة', fa: 'پیشنهاد قیمت / برآورد هزینه', ku: 'pêşniyara bihayê', ur: 'قیمت کا تخمینہ (پرائس کوٹیشن)', ru: 'ценовое предложение / смета', uk: 'цінова пропозиція / кошторис',
            zh: '报价单 / 估价', vi: 'báo giá', th: 'ใบเสนอราคา / ประเมินราคา', ne: 'मूल्य प्रस्ताव (अनुमानित खर्च)', ps: 'د بیې وړاندیز (اټکل)'
        },
        regning: {
            en: 'a bill / invoice', de: 'eine Rechnung', es: 'una factura / cuenta', pt: 'uma fatura / conta', tr: 'bir fatura / hesap',
            ar: 'فاتورة', fa: 'صورت‌حساب / فاکتور', ku: 'fatûre / hesab', ur: 'بل / رسید', ru: 'счёт (фактура)', uk: 'рахунок (фактура)',
            zh: '账单 / 发票', vi: 'hóa đơn', th: 'ใบเสร็จ / บิลค่าซ่อม', ne: 'बिल', ps: 'بل / رسید'
        },
        reparere: {
            en: 'to repair / to fix', de: 'reparieren', es: 'reparar / arreglar', pt: 'reparar / consertar', tr: 'tamir etmek / onarmak',
            ar: 'يُصلح', fa: 'تعمیر کردن', ku: 'tamîr kirin / çêkirin', ur: 'مرمت کرنا', ru: 'ремонтировать / чинить', uk: 'ремонтувати / лагодити',
            zh: '修理 / 维修', vi: 'sửa chữa', th: 'ซ่อมแซม', ne: 'मर्मत गर्नु / बनाउनु', ps: 'جوړول / ترمیمول'
        },
        skifte: {
            en: 'to change / to replace', de: 'wechseln / austauschen', es: 'cambiar / reemplazar', pt: 'trocar / substituir', tr: 'değiştirmek',
            ar: 'يُبدّل / يُغيّر', fa: 'تعویض کردن', ku: 'guherandin', ur: 'تبدیل کرنا / بدلنا', ru: 'менять / заменять', uk: 'міняти / замінювати',
            zh: '更换', vi: 'thay thế', th: 'เปลี่ยน (เช่น เปลี่ยนยาง)', ne: 'फेर्नु / बदल्नु', ps: 'بدلول'
        },
        tjekke: {
            en: 'to check / to inspect', de: 'prüfen / kontrollieren', es: 'revisar / comprobar', pt: 'verificar / checar', tr: 'kontrol etmek',
            ar: 'يفحص / يتحقق من', fa: 'بررسی کردن / چک کردن', ku: 'kontrol kirin', ur: 'چیک کرنا / معائنہ کرنا', ru: 'проверять', uk: 'перевіряти',
            zh: '检查', vi: 'kiểm tra', th: 'ตรวจสอบ / เช็ก', ne: 'जाँच गर्नु (चेक गर्नु)', ps: 'چک کول / کتل'
        },
        loefte: {
            en: 'to lift / to raise', de: 'heben / anheben', es: 'levantar / elevar', pt: 'levantar / erguer', tr: 'kaldırmak',
            ar: 'يرفع', fa: 'بلند کردن / بالا بردن', ku: 'bilind kirin / rakirin', ur: 'اٹھانا / اوپر کرنا', ru: 'поднимать', uk: 'піднімати',
            zh: '举起 / 抬起', vi: 'nâng lên', th: 'ยกขึ้น', ne: 'उठाउनु / उचाल्नु', ps: 'پورته کول'
        },
        spaende: {
            en: 'to tighten / to fasten (bolts)', de: 'festziehen / anziehen', es: 'apretar (tornillos/tuercas)', pt: 'apertar', tr: 'sıkmak (somunları)',
            ar: 'يَشدّ / يربط بإحكام', fa: 'سفت کردن (پیچ‌ها)', ku: 'şidandin', ur: 'کسنا (قابلے مضبوط کرنا)', ru: 'затягивать (болты)', uk: 'затягувати (болти)',
            zh: '拧紧', vi: 'siết chặt (ốc vít)', th: 'ขันให้แน่น', ne: 'कस्नु (नट-बोल्ट कस्नु)', ps: 'ټینګول (پیچونه)'
        },
        paafylde: {
            en: 'to fill up / to top up (oil, fluid)', de: 'nachfüllen / auffüllen', es: 'rellenar / añadir líquido', pt: 'reabastecer / completar o nível', tr: 'doldurmak / eklemek (yağ, su)',
            ar: 'يملأ / يضيف (زيت أو سائل)', fa: 'ریختن / پر کردن (روغن یا مایع)', ku: 'dagirtin / تێkirin', ur: 'بھرنا / ڈالنا (تیل یا پانی)', ru: 'доливать / заливать', uk: 'доливати / заливати',
            zh: '加注 / 添满', vi: 'châm thêm / đổ đầy', th: 'เติม (น้ำมันเครื่อง / น้ำยา)', ne: 'थप्नु / भर्नु (तेल वा पानी)', ps: 'اچول / ډکول (تېل یا اوبه)'
        },
        fejlsoege: {
            en: 'to troubleshoot / run diagnostics', de: 'Fehlersuche durchführen / diagnostizieren', es: 'diagnosticar fallos', pt: 'fazer diagnóstico de falhas', tr: 'arıza tespiti yapmak',
            ar: 'يشخّص الأعطال بالكمبيوتر', fa: 'عیب‌یابی کردن (با دستگاه دیاگ)', ku: 'lêgerîna çewtiyan / arîzeyê dîtin', ur: 'خرابی تلاش کرنا (کمپیوٹر چیکنگ)', ru: 'проводить диагностику неисправностей', uk: 'проводити діагностику несправностей',
            zh: '故障排查 / 电脑诊断', vi: 'chẩn đoán lỗi', th: 'ตรวจหาจุดเสีย / วิเคราะห์ปัญหา', ne: 'खराबी पत्ता लगाउनु', ps: 'عوارض لټول (د کمپیوټر په وسیله)'
        },
        syne: {
            en: 'to pass mandatory vehicle inspection (MOT)', de: 'zum TÜV / zur Hauptuntersuchung bringen', es: 'pasar la inspección técnica (ITV)', pt: 'fazer a inspeção periódica', tr: 'araç muayenesinden geçirmek (TÜV)',
            ar: 'يجري الفحص الفني الدوري للسيارة', fa: 'معاینه فنی کردن خودرو', ku: 'muayeneya fermî ya erebeyê kirin', ur: 'گاڑی کا سرکاری معائنہ (پاسنگ) کروانا', ru: 'проходить техосмотр', uk: 'проходити техогляд',
            zh: '车辆年检', vi: 'đăng kiểm xe', th: 'ตรวจสภาพรถยนต์ตามกำหนด', ne: 'सवारी जाँचपास (प्रदूषण/प्राविधिक जाँच) गर्नु', ps: 'د موټر تخنیکي معاینه کول'
        },
        defekt: {
            en: 'defective / broken / out of order', de: 'defekt / kaputt', es: 'defectuoso / averiado', pt: 'defeituoso / avariado', tr: 'arızalı / bozuk',
            ar: 'معطّل / تالف', fa: 'خراب / معیوب', ku: 'xerabe / şikestî', ur: 'خراب / ناکارہ', ru: 'неисправный / сломанный', uk: 'несправний / зламаний',
            zh: '损坏的 / 有故障的', vi: 'bị hỏng / bị lỗi', th: 'ชำรุด / เสีย', ne: 'बिग्रिएको / काम नगर्ने', ps: 'خراب / زیانمن شوی'
        },
        slidt: {
            en: 'worn out / worn down', de: 'abgenutzt / verschlissen', es: 'desgastado', pt: 'gasto / desgastado', tr: 'aşınmış / yıpranmış',
            ar: 'مستهلك / متآكل', fa: 'فرسوده / ساییده‌شده', ku: 'kevn / mehîyayî', ur: 'گھسا ہوا / پرانا', ru: 'изношенный / стёртый', uk: 'зношений / стертий',
            zh: '磨损的', vi: 'bị mòn', th: 'สึกหรอ / เสื่อมสภาพ', ne: 'खिएर पुरानो भएको', ps: 'سولېدلی / زوړ شوی'
        },
        flad: {
            en: 'flat (a flat tire / a dead battery)', de: 'platt (Reifen) / leer (Batterie)', es: 'pinchado / desinflado / descargado', pt: 'furado / vazio / descarregado', tr: 'patlak / inik (lastik) / bitmiş (akü)',
            ar: 'مفرغ من الهواء (إطار) / فارغ الشحن (بطارية)', fa: 'پنچر / خوابیده (باتری خالی)', ku: 'teqiyayî / vala', ur: 'پنچر (ٹائر) / ختم (بیٹری)', ru: 'спущенный (о колесе) / разряженный', uk: 'спущений (про колесо) / розряджений',
            zh: '瘪了的（轮胎）/ 没电的（电瓶）', vi: 'bị xẹp (lốp) / hết điện (ắc quy)', th: 'แบน (ยางแบน) / ไฟหมด (แบตหมด)', ne: 'हावा खुस्किएको (पन्चर) / चार्ज सकिएको', ps: 'پنچر شوی (ټایر) / خالي شوی (بطرۍ)'
        },
        koereklar: {
            en: 'roadworthy / ready to drive', de: 'fahrbereit', es: 'listo para circular / conducir', pt: 'pronto para rodar / dirigir', tr: 'sürüşe hazır / trafiğe çıkmaya hazır',
            ar: 'جاهز للقيادة والسير', fa: 'آماده حرکت و رانندگی', ku: 'amade ji bo ajotinê', ur: 'چلنے کے لیے بالکل تیار', ru: 'готовый к поездке (на ходу)', uk: 'готовий до поїздки (на ходу)',
            zh: '修好可随时上路的', vi: 'sẵn sàng lăn bánh', th: 'พร้อมใช้งาน / พร้อมขับขี่', ne: 'चलाउन तयार (गुड्न तयार)', ps: 'د چلولو لپاره چمتو'
        },
        grundigt: {
            en: 'thoroughly / carefully in detail', de: 'gründlich / sorgfältig', es: 'a fondo / minuciosamente', pt: 'minuciosamente / a fundo', tr: 'titizlikle / detaylıca',
            ar: 'بدقة وعناية شاملة', fa: 'به‌طور کامل و دقیق', ku: 'bi hûrgilî / bi باشî', ur: 'مکمل تفصیل اور احتیاط سے', ru: 'тщательно / основательно', uk: 'ретельно / ґрунтовно',
            zh: '彻底地 / 仔细地', vi: 'một cách kỹ lưỡng', th: 'อย่างละเอียดถี่ถ้วน', ne: 'राम्रोसँग / विस्तृत रूपमा', ps: 'په بشپړ غور او دقت سره'
        },
        forsigtigt: {
            en: 'carefully / cautiously', de: 'vorsichtig / behutsam', es: 'con cuidado / cuidadosamente', pt: 'com cuidado / cuidadosamente', tr: 'dikkatlice',
            ar: 'بحذر وعناية', fa: 'با احتیاط', ku: 'bi baldarî', ur: 'احتیاط سے', ru: 'осторожно / аккуратно', uk: 'обережно / акуратно',
            zh: '小心地 / 谨慎地', vi: 'một cách cẩn thận', th: 'อย่างระมัดระวัง', ne: 'सावधानीपूर्वक / होसियारीसाथ', ps: 'په احتیاط سره'
        },
        hurtigt: {
            en: 'quickly / fast', de: 'schnell / zügig', es: 'rápidamente / rápido', pt: 'rapidamente / rápido', tr: 'hızlıca / çabuk',
            ar: 'بسرعة', fa: 'به‌سرعت / سریع', ku: 'bi lez / zû', ur: 'تیزی سے / جلدی سے', ru: 'быстро', uk: 'швидко',
            zh: '快速地', vi: 'một cách nhanh chóng', th: 'อย่างรวดเร็ว', ne: 'छिटो / चाँडो', ps: 'په چټکۍ سره / ژر'
        },
        heldigvis: {
            en: 'fortunately / luckily', de: 'glücklicherweise / zum Glück', es: 'afortunadamente / por suerte', pt: 'felizmente / por sorte', tr: 'neyse ki / şans eseri',
            ar: 'لحسن الحظ', fa: 'خوشبختانه', ku: 'bi xêrê / baş e ku', ur: 'خوش قسمتی سے', ru: 'к счастью', uk: 'на щастя',
            zh: '幸运的是 / 幸好', vi: 'may mắn thay', th: 'โชคดีที่...', ne: 'भाग्यवश / धन्न', ps: 'له نېکه مرغه'
        }
    };

    // Attach translations to each item in WORKSHOP_WORDS
    WORKSHOP_WORDS.forEach(item => {
        item.translations = WORKSHOP_TRANSLATIONS[item.id] || {};
    });

    // Målord fra de ANDRE flader i "Lær nye ord" (Substantiver, Verber, Adjektiver, Adverbier), som optræder i historierne
    const OTHER_LNO_WORDS = {
        bil: {
            id: 'bil',
            word: 'en bil',
            wordClass: 'substantiv',
            surface: 'De 100 substantiver – Byrummet & Gaden',
            targetView: 'byrummet_vrimmel',
            icon: '🚗',
            forms: 'en bil • bilen • biler • bilerne',
            definition: 'Et motorkøretøj med fire hjul, som bruges til transport på vejene.',
            sentence: 'Jonas kører sin bil hen til det lokale autoværksted.',
            translations: {
                en: 'a car', de: 'ein Auto / Wagen', es: 'un coche / carro', pt: 'um carro', tr: 'bir araba',
                ar: 'سيارة', fa: 'خودرو / ماشین', ku: 'erebe / ترومبêl', ur: 'گاڑی / کار', ru: 'автомобиль / машина', uk: 'автомобіль / машина',
                zh: '汽车', vi: 'xe ô tô', th: 'รถยนต์', ne: 'गाडी / कार', ps: 'موټر'
            }
        },
        morgen: {
            id: 'morgen',
            word: 'en morgen',
            wordClass: 'substantiv',
            surface: 'De 100 substantiver – Hjemmet & Hverdagen',
            targetView: 'hjemmet_vrimmel',
            icon: '🌅',
            forms: 'en morgen • morgenen • morgener • morgenerne',
            definition: 'Den første del af dagen, når man står op og skal på arbejde.',
            sentence: 'Mandag morgen opdager Jonas, at dækket er fladt.',
            translations: {
                en: 'a morning', de: 'ein Morgen', es: 'una mañana', pt: 'uma manhã', tr: 'bir sabah',
                ar: 'صباح', fa: 'صبح', ku: 'sibeh', ur: 'صبح', ru: 'утро', uk: 'ранок',
                zh: '早晨 / 早上', vi: 'buổi sáng', th: 'ตอนเช้า', ne: 'बिहान', ps: 'سهار'
            }
        },
        uge: {
            id: 'uge',
            word: 'en uge',
            wordClass: 'substantiv',
            surface: 'De 100 substantiver – Klasse & Kontor',
            targetView: 'klasse_kontor_vrimmel',
            icon: '📅',
            forms: 'en uge • ugen • uger • ugerne',
            definition: 'En tidsperiode på syv dage fra mandag til søndag.',
            sentence: 'Marias bil skal synes i næste uge.',
            translations: {
                en: 'a week', de: 'eine Woche', es: 'una semana', pt: 'uma semana', tr: 'bir hafta',
                ar: 'أسبوع', fa: 'هفته', ku: 'hefte', ur: 'ہفتہ (سات دن)', ru: 'неделя', uk: 'тиждень',
                zh: '星期 / 周', vi: 'tuần lễ', th: 'สัปดาห์', ne: 'हप्ता', ps: 'اونۍ'
            }
        },
        computer: {
            id: 'computer',
            word: 'en computer',
            wordClass: 'substantiv',
            surface: 'De 100 substantiver – Klasse & Kontor',
            targetView: 'klasse_kontor_vrimmel',
            icon: '💻',
            forms: 'en computer • computeren • computere • computerne',
            definition: 'Elektronisk maskine til at behandle data – bruges også til fejlsøgning på moderne biler.',
            sentence: 'Mekanikeren fejlsøger på bilens computer.',
            translations: {
                en: 'a computer', de: 'ein Computer / Rechner', es: 'un ordenador / computadora', pt: 'um computador', tr: 'bir bilgisayar',
                ar: 'حاسوب / كمبيوتر', fa: 'رایانه / کامپیوتر', ku: 'kompîtur', ur: 'کمپیوٹر', ru: 'компьютер', uk: 'комп’ютер',
                zh: '电脑 / 计算机', vi: 'máy tính', th: 'คอมพิวเตอร์', ne: 'कम्प्युटर', ps: 'کمپیوټر'
            }
        },
        hylde: {
            id: 'hylde',
            word: 'en hylde',
            wordClass: 'substantiv',
            surface: 'De 100 substantiver – Hjemmet & Kontoret',
            targetView: 'hjemmet_vrimmel',
            icon: '🗄️',
            forms: 'en hylde • hylden • hylder • hylderne',
            definition: 'Vandret plade i et skab eller på en væg, hvor man opbevarer ting eller reservedele.',
            sentence: 'Værkstedet har den rigtige reservedel på hylden.',
            translations: {
                en: 'a shelf', de: 'ein Regal / Regalbrett', es: 'un estante / repisa', pt: 'uma prateleira', tr: 'bir raf',
                ar: 'رفّ', fa: 'قفسه / طاقچه', ku: 'ref', ur: 'شیلف / طاق', ru: 'полка', uk: 'полиця',
                zh: '架子 / 搁板', vi: 'cái kệ / giá đỡ', th: 'ชั้นวางของ', ne: 'दराजको तख्ता / र्याक', ps: 'المارۍ / تاخچه'
            }
        },
        motorvej: {
            id: 'motorvej',
            word: 'en motorvej',
            wordClass: 'substantiv',
            surface: 'De 100 substantiver – Byrummet & Gaden',
            targetView: 'byrummet_vrimmel',
            icon: '🛣️',
            forms: 'en motorvej • motorvejen • motorveje • motorvejene',
            definition: 'Bred vej med flere spor til hurtig biltrafik mellem byer.',
            sentence: 'Midt på motorvejen begynder en gul advarselslampe at lyse.',
            translations: {
                en: 'a highway / motorway', de: 'eine Autobahn', es: 'una autopista', pt: 'uma autoestrada / rodovia', tr: 'bir otoyol / otoban',
                ar: 'طريق سريع (أوتوستراد)', fa: 'بزرگراه / اتوبان', ku: 'otoban / rêya mezin', ur: 'موٹروے / شاہراہ', ru: 'автомагистраль / шоссе', uk: 'автомагістраль / шосе',
                zh: '高速公路', vi: 'đường cao tốc', th: 'ทางด่วน / มอเตอร์เวย์', ne: 'राजमार्ग / द्रुतमार्ग', ps: 'لویه لاره (موټروې)'
            }
        },
        koere: {
            id: 'koere',
            word: 'at køre',
            wordClass: 'verbum',
            surface: 'De 100 verber – Byrummet & Gaden',
            targetView: 'verber_byrum',
            icon: '🚙',
            forms: 'at køre • kører • kørte • har kørt',
            definition: 'At bevæge sig fremad i et køretøj eller styre en bil.',
            sentence: 'Han kører forsigtigt hen til det lokale autoværksted.',
            translations: {
                en: 'to drive', de: 'fahren', es: 'conducir / manejar', pt: 'dirigir / conduzir', tr: 'sürmek (araba)',
                ar: 'يقود (السيارة)', fa: 'رانندگی کردن', ku: 'ajotin', ur: 'گاڑی چلانا', ru: 'ехать / водить машину', uk: 'їхати / водити авто',
                zh: '开车 / 驾驶', vi: 'lái xe', th: 'ขับรถ', ne: 'गाडी चलाउनु', ps: 'موټر چلول'
            }
        },
        aabne: {
            id: 'aabne',
            word: 'at åbne',
            wordClass: 'verbum',
            surface: 'De 100 verber – Hjemmet & Hverdagen',
            targetView: 'word_learning',
            icon: '🔓',
            forms: 'at åbne • åbner • åbnede • har åbnet',
            definition: 'At lukke noget op (f.eks. en dør, et vindue eller en motorhjelm).',
            sentence: 'På autoværkstedet åbner mekanikeren motorhjelmen.',
            translations: {
                en: 'to open', de: 'öffnen / aufmachen', es: 'abrir', pt: 'abrir', tr: 'açmak',
                ar: 'يفتح', fa: 'باز کردن', ku: 'vekirin', ur: 'کھولنا', ru: 'открывать', uk: 'відчиняти / відкривати',
                zh: '打开', vi: 'mở ra', th: 'เปิด', ne: 'खोल्नु', ps: 'خلاصول'
            }
        },
        tage: {
            id: 'tage',
            word: 'at tage (af)',
            wordClass: 'verbum',
            surface: 'De 100 verber – Hverdagens handlinger',
            targetView: 'word_learning',
            icon: '✋',
            forms: 'at tage • tager • tog • har taget',
            definition: 'At gribe fat i noget eller fjerne noget (f.eks. tage et punkteret dæk af).',
            sentence: 'Lærlingen tager det punkterede dæk af.',
            translations: {
                en: 'to take (off / remove)', de: 'nehmen / abnehmen', es: 'tomar / quitar', pt: 'pegar / tirar', tr: 'almak / çıkarmak',
                ar: 'يأخذ / ينزع', fa: 'گرفتن / برداشتن', ku: 'girtin / derxistin', ur: 'لینا / اتارنا', ru: 'брать / снимать', uk: 'брати / знімати',
                zh: '拿 / 拆下', vi: 'lấy / tháo ra', th: 'หยิบ / ถอดออก', ne: 'लिनु / निकाल्नु', ps: 'اخیستل / لرې کول'
            }
        },
        hente: {
            id: 'hente',
            word: 'at hente',
            wordClass: 'verbum',
            surface: 'De 100 verber – Byrummet & Hverdagen',
            targetView: 'verber_byrum',
            icon: '🚶‍♂️',
            forms: 'at hente • henter • hentede • har hentet',
            definition: 'At gå eller køre hen til et sted for at tage noget eller nogen med tilbage.',
            sentence: 'Peter henter sin køreklare bil på værkstedet.',
            translations: {
                en: 'to pick up / to fetch', de: 'abholen / holen', es: 'recoger / buscar', pt: 'buscar / pegar', tr: 'gidip almak / teslim almak',
                ar: 'يستلم / يحضر', fa: 'تحویل گرفتن / آوردن', ku: 'anîn / wergirtin', ur: 'لینے جانا / وصول کرنا', ru: 'забирать', uk: 'забирати',
                zh: '取回 / 接', vi: 'đón / lấy về', th: 'ไปรับ (รถ/ของ)', ne: 'लिन जानु', ps: 'راوړل / ترلاسه کول'
            }
        },
        starte: {
            id: 'starte',
            word: 'at starte',
            wordClass: 'verbum',
            surface: 'De 100 verber – Hverdagens handlinger',
            targetView: 'word_learning',
            icon: '🔑',
            forms: 'at starte • starter • startede • har startet',
            definition: 'At gå i gang eller få en motor til at køre.',
            sentence: 'En kold vintermorgen vil Peters bil ikke starte.',
            translations: {
                en: 'to start', de: 'starten / anspringen', es: 'arrancar / empezar', pt: 'dar partida / começar', tr: 'çalıştırmak / başlamak',
                ar: 'يبدأ / يشتغل (المحرك)', fa: 'روشن شدن / شروع کردن', ku: 'dest pê kirin / xebitîn', ur: 'اسٹارٹ ہونا / شروع کرنا', ru: 'заводиться / начинать', uk: 'заводитися / починати',
                zh: '启动 / 开始', vi: 'khởi động / bắt đầu', th: 'สตาร์ท (รถ) / เริ่มต้น', ne: 'स्टार्ट हुनु / सुरु गर्नु', ps: 'چالانېدل / پیل کول'
            }
        },
        gul: {
            id: 'gul',
            word: 'gul',
            wordClass: 'adjektiv',
            surface: 'De 100 adjektiver – Farver & Udseende',
            targetView: 'adjektiver_intro',
            icon: '🟡',
            forms: 'gul (en) • gult (et) • gule (flertal/bestemt)',
            definition: 'Farve som solen eller en advarselslampe i bilens instrumentbræt.',
            sentence: 'En gul advarselslampe begynder at lyse.',
            translations: {
                en: 'yellow', de: 'gelb', es: 'amarillo', pt: 'amarelo', tr: 'sarı',
                ar: 'أصفر', fa: 'زرد', ku: 'zer', ur: 'پیلا / زرد', ru: 'жёлтый', uk: 'жовтий',
                zh: '黄色的', vi: 'màu vàng', th: 'สีเหลือง', ne: 'पहेंलो', ps: 'ژېړ'
            }
        },
        lille: {
            id: 'lille',
            word: 'lille',
            wordClass: 'adjektiv',
            surface: 'De 100 adjektiver – Størrelse & Form',
            targetView: 'adjektiver_intro',
            icon: '🤏',
            forms: 'lille (en/et) • små (flertal)',
            definition: 'Ikke stor; af begrænset størrelse eller omfang.',
            sentence: 'Der er et lille hul i udstødningen.',
            translations: {
                en: 'small / little', de: 'klein', es: 'pequeño', pt: 'pequeno', tr: 'küçük',
                ar: 'صغير', fa: 'کوچک', ku: 'biçûk', ur: 'چھوٹا', ru: 'маленький / небольшой', uk: 'маленький / невеликий',
                zh: '小的', vi: 'nhỏ / bé', th: 'เล็ก', ne: 'सानो', ps: 'کوچنی / وړوکی'
            }
        },
        kold: {
            id: 'kold',
            word: 'kold',
            wordClass: 'adjektiv',
            surface: 'De 100 adjektiver – Vejr & Temperatur',
            targetView: 'adjektiver_intro',
            icon: '🥶',
            forms: 'kold (en) • koldt (et) • kolde (flertal/bestemt)',
            definition: 'Med lav temperatur; det modsatte af varm.',
            sentence: 'En kold vintermorgen vil Peters bil ikke starte.',
            translations: {
                en: 'cold', de: 'kalt', es: 'frío', pt: 'frio', tr: 'soğuk',
                ar: 'بارد', fa: 'سرد', ku: 'sar', ur: 'ٹھنڈا / سرد', ru: 'холодный', uk: 'холодний',
                zh: '寒冷的', vi: 'lạnh', th: 'หนาว / เย็น', ne: 'चिसो', ps: 'سوړ / یخ'
            }
        },
        ny: {
            id: 'ny',
            word: 'ny / frisk',
            wordClass: 'adjektiv',
            surface: 'De 100 adjektiver – Tilstand & Kvalitet',
            targetView: 'adjektiver_intro',
            icon: '✨',
            forms: 'ny (en) • nyt (et) • nye (flertal/bestemt)',
            definition: 'Ikke brugt før; lige taget i brug eller helt frisk.',
            sentence: 'Mekanikeren sætter et nyt batteri i og påfylder frisk motorolie.',
            translations: {
                en: 'new / fresh', de: 'neu / frisch', es: 'nuevo / fresco', pt: 'novo / fresco', tr: 'yeni / taze',
                ar: 'جديد / طازج (نقي)', fa: 'نو / تازه', ku: 'nû / taze', ur: 'نیا / تازہ', ru: 'новый / свежий', uk: 'новий / свіжий',
                zh: '新的 / 新鲜的', vi: 'mới', th: 'ใหม่', ne: 'नयाँ / ताजा', ps: 'نوی / تازه'
            }
        }
    };

    // Quick-Peek & Oversættelses-modal til målord fra "Bilværksted" og "Lær nye ord"
    function openWorkshopWordModal(item, isFromOtherLno = false) {
        const existing = document.querySelector('.bv-word-modal-overlay');
        if (existing) existing.remove();

        const meta = CLASS_META[item.wordClass] || CLASS_META.substantiv;
        let currentLang = getPreferredTransLang();
        const transMap = item.translations || {};

        const overlay = document.createElement('div');
        overlay.className = 'bv-word-modal-overlay';
        overlay.style.cssText = 'position:fixed; inset:0; background:rgba(2,6,23,0.82); backdrop-filter:blur(6px); z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem; animation:bvFadeIn 0.2s ease;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:#0f172a; border:1.5px solid rgba(56,189,248,0.4); border-radius:22px; max-width:540px; width:100%; overflow:hidden; box-shadow:0 24px 50px rgba(0,0,0,0.65); color:#f8fafc;';

        const sourceBadgeText = isFromOtherLno
            ? `📚 Målord fra "${item.surface}"`
            : `🔧 Målord #${item.num} fra Bilværkstedet • ${meta.label}`;

        const cropHtml = !isFromOtherLno && item.x !== undefined
            ? `<div style="height:155px; width:100%; background-image:url('assets/bilvaerksted_vrimmel.jpg'); background-size:280%; background-position:${item.x}% ${item.y}%; position:relative; border-bottom:1px solid rgba(255,255,255,0.1);">
                <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(15,23,42,0.92), transparent 65%);"></div>
                <span style="position:absolute; bottom:10px; left:14px; background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.color}; padding:0.25rem 0.7rem; border-radius:16px; font-weight:800; font-size:0.78rem;">${meta.label}</span>
               </div>`
            : `<div style="padding:0.9rem 1.3rem 0; display:flex; gap:0.5rem; flex-wrap:wrap;">
                <span style="background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.color}; padding:0.25rem 0.7rem; border-radius:16px; font-weight:800; font-size:0.78rem;">${meta.label}</span>
               </div>`;

        const langOptionsHtml = SUPPORTED_TRANS_LANGS.map(l =>
            `<option value="${l.code}" ${l.code === currentLang ? 'selected' : ''}>${l.label}</option>`
        ).join('');

        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.85rem 1.2rem; background:#1e293b; border-bottom:1px solid rgba(255,255,255,0.08);">
                <span style="font-size:0.8rem; font-weight:800; color:#38bdf8;">${sourceBadgeText}</span>
                <button id="bv-modal-close" style="background:rgba(255,255,255,0.1); color:white; border:none; width:30px; height:30px; border-radius:50%; font-weight:800; cursor:pointer;">✕</button>
            </div>
            ${cropHtml}
            <div style="padding:1.25rem 1.35rem 1.4rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.3rem;">
                    <div style="font-size:1.55rem; font-weight:800; color:white;">${item.icon || '🔹'} ${item.word}</div>
                    <button id="bv-modal-speak" style="background:#2563eb; color:white; border:none; padding:0.45rem 0.95rem; border-radius:20px; font-weight:700; font-size:0.85rem; cursor:pointer;">🔊 Lyt til udtale</button>
                </div>
                <div style="font-size:0.85rem; color:#94a3b8; margin-bottom:0.85rem;">${item.forms || ''}</div>

                <!-- Oversættelses-boks med sprogvælger -->
                <div style="background:rgba(56,189,248,0.12); border:1.5px solid #0284c7; border-radius:14px; padding:0.9rem 1rem; margin-bottom:0.9rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.45rem;">
                        <span style="font-size:0.78rem; font-weight:800; color:#38bdf8; text-transform:uppercase;">🌍 Oversættelse (Hjælp til betydning):</span>
                        <select id="bv-modal-lang-select" style="background:#0f172a; color:#f8fafc; border:1px solid #38bdf8; border-radius:8px; padding:0.25rem 0.55rem; font-size:0.8rem; font-weight:700; cursor:pointer;">
                            ${langOptionsHtml}
                        </select>
                    </div>
                    <div id="bv-modal-trans-text" style="font-size:1.25rem; font-weight:800; color:#f8fafc;">
                        ${transMap[currentLang] || transMap.en || item.word}
                    </div>
                </div>

                <div style="background:rgba(15,23,42,0.85); border-left:4px solid #38bdf8; padding:0.75rem 0.95rem; border-radius:8px; margin-bottom:0.65rem; font-size:0.94rem; color:#e2e8f0; line-height:1.45;">
                    <strong>📖 Dansk forklaring:</strong> ${item.definition}
                </div>

                ${item.fixedTerms ? `
                <div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); padding:0.6rem 0.9rem; border-radius:8px; margin-bottom:0.65rem; font-size:0.85rem; color:#fde68a;">
                    <strong>🔩 Faste udtryk:</strong> ${item.fixedTerms}
                </div>` : ''}

                <div style="font-style:italic; color:#cbd5e1; font-size:0.92rem; margin-bottom:1.1rem;">
                    "💬 ${item.sentence}"
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem; flex-wrap:wrap;">
                    ${!isFromOtherLno ? `
                        <button id="bv-modal-goto-vrimmel" style="background:#1e293b; color:#38bdf8; border:1px solid #38bdf8; padding:0.6rem 1rem; border-radius:10px; font-weight:700; font-size:0.85rem; cursor:pointer;">
                            🔍 Se på vrimlebilledet (Forsiden)
                        </button>
                    ` : `
                        <button id="bv-modal-goto-lno" style="background:#1e293b; color:#c084fc; border:1px solid #a855f7; padding:0.6rem 1rem; border-radius:10px; font-weight:700; font-size:0.85rem; cursor:pointer;">
                            ↗️ Åbn "${item.surface}"
                        </button>
                    `}
                    <button id="bv-modal-continue" style="background:#22c55e; color:#0f172a; border:none; padding:0.65rem 1.25rem; border-radius:10px; font-weight:800; font-size:0.9rem; cursor:pointer;">
                        Fortsæt læsningen ➔
                    </button>
                </div>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const close = () => overlay.remove();
        modal.querySelector('#bv-modal-close').onclick = close;
        modal.querySelector('#bv-modal-continue').onclick = close;
        overlay.onclick = (e) => { if (e.target === overlay) close(); };

        modal.querySelector('#bv-modal-speak').onclick = () => speakDanish(item.word);

        const langSel = modal.querySelector('#bv-modal-lang-select');
        const transOut = modal.querySelector('#bv-modal-trans-text');
        langSel.onchange = () => {
            currentLang = langSel.value;
            setPreferredTransLang(currentLang);
            transOut.textContent = transMap[currentLang] || transMap.en || item.word;
        };

        const gotoVrimmelBtn = modal.querySelector('#bv-modal-goto-vrimmel');
        if (gotoVrimmelBtn) {
            gotoVrimmelBtn.onclick = () => {
                close();
                switchTab('tab_vrimmel');
                selectWordItem(item);
            };
        }

        const gotoLnoBtn = modal.querySelector('#bv-modal-goto-lno');
        if (gotoLnoBtn && item.targetView) {
            gotoLnoBtn.onclick = () => {
                close();
                navigateFn(item.targetView);
            };
        }

        speakDanish(item.word);
    }

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .bilvaerksted-view {
            max-width: 1220px;
            margin: 0 auto;
            padding: 1rem 1.2rem 4rem;
            color: #f8fafc;
        }
        .bv-hero-header {
            text-align: center;
            margin-bottom: 1.6rem;
        }
        .bv-hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid #38bdf8;
            color: #38bdf8;
            padding: 0.35rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            margin-bottom: 0.6rem;
        }
        .bv-hero-header h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #38bdf8, #22c55e, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .bv-hero-header p {
            color: #94a3b8;
            font-size: 1.05rem;
            max-width: 820px;
            margin: 0 auto 1rem;
            line-height: 1.5;
        }
        .bv-ratio-strip {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 1.5rem;
        }
        .bv-ratio-pill {
            font-size: 0.82rem;
            font-weight: 700;
            padding: 0.3rem 0.8rem;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.15);
            background: rgba(15, 23, 42, 0.75);
        }

        /* Tabs Navigation */
        .bv-tabs {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.8rem;
            background: rgba(30, 41, 59, 0.75);
            padding: 0.5rem;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .bv-tab-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 0.65rem 1.05rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.22s ease;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .bv-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.06);
        }
        .bv-tab-btn.active {
            background: linear-gradient(135deg, #0284c7, #2563eb);
            color: white;
            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
        }

        .bv-panel {
            display: none;
            animation: bvFadeIn 0.28s ease;
        }
        .bv-panel.active {
            display: block;
        }
        @keyframes bvFadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Vrimlebillede Card */
        .bv-vrimmel-card {
            background: rgba(30, 41, 59, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1.25rem;
            margin-bottom: 2rem;
        }
        .bv-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-bottom: 1rem;
            padding-bottom: 0.85rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .bv-filter-group {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
        }
        .bv-filter-btn {
            background: #1e293b;
            color: #cbd5e1;
            border: 1.5px solid #475569;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }
        .bv-filter-btn:hover {
            border-color: #94a3b8;
            color: white;
        }
        .bv-filter-btn.active {
            background: #0f172a;
            color: white;
            border-color: #38bdf8;
            box-shadow: 0 0 10px rgba(56, 189, 248, 0.35);
        }
        .bv-tools-right {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            flex-wrap: wrap;
        }
        .bv-zoom-btn, .bv-pure-btn {
            background: #1e293b;
            color: #f1f5f9;
            border: 1.5px solid #64748b;
            padding: 0.42rem 0.85rem;
            border-radius: 20px;
            font-weight: 700;
            font-size: 0.82rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .bv-zoom-btn.active, .bv-pure-btn.active {
            background: #0284c7;
            border-color: #38bdf8;
            color: white;
        }

        /* Scroll/Zoom Viewport & Stage */
        .bv-stage-viewport {
            width: 100%;
            overflow: auto;
            border-radius: 16px;
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            background: #0f172a;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            -webkit-overflow-scrolling: touch;
        }
        .bv-stage {
            position: relative;
            width: 100%;
            line-height: 0;
            transform-origin: top left;
            transition: width 0.25s ease;
        }
        .bv-stage.zoom-15 {
            width: 150%;
        }
        .bv-stage.zoom-20 {
            width: 200%;
        }
        .bv-stage.pure-mode .bv-hotspot {
            display: none !important;
        }
        .bv-img {
            width: 100%;
            height: auto;
            display: block;
            user-select: none;
        }

        /* Compact Hotspots (optimized for both desktop & mobile phones) */
        .bv-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 22px;
            height: 22px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 0.65rem;
            border: 1.8px solid #ffffff;
            color: #ffffff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.75);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            z-index: 10;
            padding: 0;
            line-height: 1;
        }
        .bv-hotspot.hs-substantiv { background: rgba(22, 163, 74, 0.92); }
        .bv-hotspot.hs-verbum { background: rgba(220, 38, 38, 0.92); }
        .bv-hotspot.hs-adjektiv { background: rgba(234, 88, 12, 0.92); }
        .bv-hotspot.hs-adverbium { background: rgba(2, 132, 199, 0.92); }

        .bv-hotspot:hover, .bv-hotspot.active {
            transform: translate(-50%, -50%) scale(1.38);
            z-index: 25;
            box-shadow: 0 0 12px #ffffff, 0 0 8px currentColor;
        }
        .bv-hotspot.filtered-out {
            opacity: 0.15;
            pointer-events: none;
        }

        @media (max-width: 640px) {
            .bv-hotspot {
                width: 15px;
                height: 15px;
                font-size: 0.5rem;
                border-width: 1.2px;
            }
            .bv-vrimmel-card {
                padding: 0.85rem;
            }
        }

        /* Detail Card */
        .bv-detail-card {
            background: #1e293b;
            border: 1.5px solid #475569;
            border-radius: 16px;
            padding: 1.35rem;
            margin-top: 1.2rem;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 1.2rem;
            flex-wrap: wrap;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .bv-badge-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-bottom: 0.5rem;
        }
        .bv-class-badge {
            padding: 0.28rem 0.7rem;
            border-radius: 8px;
            font-size: 0.78rem;
            font-weight: 800;
            text-transform: uppercase;
        }
        .bv-def-box {
            background: rgba(15, 23, 42, 0.65);
            border-left: 3px solid #38bdf8;
            padding: 0.6rem 0.9rem;
            border-radius: 8px;
            margin: 0.55rem 0;
            font-size: 0.95rem;
            color: #e2e8f0;
            line-height: 1.45;
        }
        .bv-terms-box {
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.3);
            padding: 0.5rem 0.85rem;
            border-radius: 8px;
            margin-bottom: 0.55rem;
            font-size: 0.88rem;
            color: #fde68a;
        }

        /* Quick Word Chip Bar below Detail Card */
        .bv-quick-words-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-top: 1rem;
            padding-top: 0.9rem;
            border-top: 1px solid rgba(255,255,255,0.08);
        }
        .bv-word-pill {
            background: #0f172a;
            border: 1px solid rgba(255,255,255,0.15);
            color: #e2e8f0;
            padding: 0.3rem 0.65rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s;
        }
        .bv-word-pill:hover, .bv-word-pill.active {
            transform: translateY(-1px);
            border-color: white;
            background: #334155;
        }

        /* 4-Category Sorting Box */
        .bv-sorting-box {
            background: rgba(15, 23, 42, 0.82);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.4rem;
            margin-top: 1.5rem;
        }
        .bv-bins-4 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 1rem;
            margin-bottom: 1.2rem;
        }
        .bv-sort-bin {
            border-radius: 14px;
            padding: 1rem;
            min-height: 145px;
            cursor: pointer;
            transition: all 0.2s;
            border: 2px dashed rgba(255,255,255,0.25);
        }
        .bv-sort-bin:hover {
            filter: brightness(1.15);
        }

        /* Dialogue Ordering Exercise (Tab 6) */
        .bv-dialog-card {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(30, 41, 59, 0.72);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            padding: 1.8rem;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
        .bv-dialog-slot {
            background: #0f172a;
            border: 2px dashed #475569;
            border-radius: 12px;
            padding: 0.85rem 1.1rem;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.8rem;
            margin-bottom: 0.65rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .bv-dialog-slot.filled {
            border-style: solid;
            border-color: #38bdf8;
            background: #1e293b;
        }
        .bv-dialog-slot.correct-slot {
            border-color: #22c55e !important;
            background: rgba(34, 197, 94, 0.14) !important;
        }
        .bv-dialog-slot.wrong-slot {
            border-color: #ef4444 !important;
            background: rgba(239, 68, 68, 0.14) !important;
        }
        .bv-dialog-line-btn {
            width: 100%;
            text-align: left;
            background: #1e293b;
            border: 1.5px solid #475569;
            color: #f8fafc;
            padding: 0.85rem 1.1rem;
            border-radius: 12px;
            margin-bottom: 0.6rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.8rem;
            transition: all 0.2s;
            font-size: 0.98rem;
            line-height: 1.45;
        }
        .bv-dialog-line-btn:hover {
            border-color: #38bdf8;
            background: #334155;
            transform: translateY(-1px);
        }
        .bv-dialog-line-btn.placed {
            opacity: 0.3;
            pointer-events: none;
        }
        .bv-speaker-tag {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            margin-right: 0.5rem;
            white-space: nowrap;
        }
        .speaker-kunde { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
        .speaker-mekaniker { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); }
        .speaker-mester { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
        .speaker-laerling { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const heroHeader = document.createElement('div');
    heroHeader.className = 'bv-hero-header';
    heroHeader.innerHTML = `
        <div class="bv-hero-badge">💼 Mit hverdagsliv • Scenarie 1: Arbejde</div>
        <h1>🔧 På bilværkstedet</h1>
        <p>Udforsk hverdagen på et dansk autoværksted med 32 målord og faste fagtermer fordelt på alle fire ordklasser.</p>
    `;
    viewContainer.appendChild(heroHeader);

    // 7 Tabs Navigation
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'bv-tabs';
    const tabs = [
        { id: 'tab_vrimmel', label: '1. Vrimlebillede', icon: '🔍' },
        { id: 'tab_detektiv', label: '2. Ord-detektiv', icon: '🕵️' },
        { id: 'tab_syn_ant', label: '3. Synonymer & Antonymer', icon: '🔄' },
        { id: 'tab_historie', label: '4. Historier', icon: '📖' },
        { id: 'tab_saetning', label: '5. Sætningsbygning', icon: '✍️' },
        { id: 'tab_dialog', label: '6. Mundtlige dialoger', icon: '💬' },
        { id: 'tab_udtale', label: '7. Sig det højt (Betoning)', icon: '🎙️' }
    ];

    let currentTab = extraData?.subPath && tabs.some(t => t.id === extraData.subPath)
        ? extraData.subPath
        : 'tab_vrimmel';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `bv-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.innerHTML = `<span>${t.icon}</span> <span>${t.label}</span>`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', `#/${lang}/mit_hverdagsliv_arbejde/${tabId}`);
        tabsMenu.querySelectorAll('.bv-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.bv-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- TAB 1: VRIMLEBILLEDE + ORDKLASSE-SORTERING
    // ========================================================
    const vrimmelPanel = document.createElement('div');
    vrimmelPanel.className = `bv-panel ${currentTab === 'tab_vrimmel' ? 'active' : ''}`;
    vrimmelPanel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'bv-vrimmel-card';

    // Toolbar: Word Class Filter + Zoom + Pure Image
    const toolbar = document.createElement('div');
    toolbar.className = 'bv-toolbar';

    const filterGroup = document.createElement('div');
    filterGroup.className = 'bv-filter-group';
    const filters = [
        { id: 'all', label: 'Alle (32)' },
        { id: 'substantiv', label: '🟢 Substantiver (16)' },
        { id: 'verbum', label: '🔴 Verber (8)' },
        { id: 'adjektiv', label: '🟠 Adjektiver (4)' },
        { id: 'adverbium', label: '🔵 Adverbier (4)' }
    ];
    let activeFilter = 'all';

    filters.forEach(f => {
        const fb = document.createElement('button');
        fb.className = `bv-filter-btn ${f.id === activeFilter ? 'active' : ''}`;
        fb.textContent = f.label;
        fb.onclick = () => {
            activeFilter = f.id;
            filterGroup.querySelectorAll('.bv-filter-btn').forEach(b => b.classList.remove('active'));
            fb.classList.add('active');
            stage.querySelectorAll('.bv-hotspot').forEach(hs => {
                const wc = hs.dataset.wordclass;
                hs.classList.toggle('filtered-out', activeFilter !== 'all' && wc !== activeFilter);
            });
        };
        filterGroup.appendChild(fb);
    });

    const toolsRight = document.createElement('div');
    toolsRight.className = 'bv-tools-right';

    const zoomLevels = [
        { id: '10', label: '🔍 1x', cls: '' },
        { id: '15', label: '🔍 1.5x', cls: 'zoom-15' },
        { id: '20', label: '🔍 2x', cls: 'zoom-20' }
    ];
    let activeZoom = '10';
    zoomLevels.forEach(z => {
        const zb = document.createElement('button');
        zb.className = `bv-zoom-btn ${z.id === activeZoom ? 'active' : ''}`;
        zb.textContent = z.label;
        zb.onclick = () => {
            activeZoom = z.id;
            toolsRight.querySelectorAll('.bv-zoom-btn').forEach(b => b.classList.remove('active'));
            zb.classList.add('active');
            stage.classList.remove('zoom-15', 'zoom-20');
            if (z.cls) stage.classList.add(z.cls);
        };
        toolsRight.appendChild(zb);
    });

    const pureBtn = document.createElement('button');
    pureBtn.className = 'bv-pure-btn';
    pureBtn.innerHTML = `🖼️ Rent billede`;
    let pureMode = false;
    pureBtn.onclick = () => {
        pureMode = !pureMode;
        stage.classList.toggle('pure-mode', pureMode);
        pureBtn.classList.toggle('active', pureMode);
    };
    toolsRight.appendChild(pureBtn);

    toolbar.appendChild(filterGroup);
    toolbar.appendChild(toolsRight);
    vrimmelCard.appendChild(toolbar);

    // Viewport & Stage
    const viewport = document.createElement('div');
    viewport.className = 'bv-stage-viewport';

    const stage = document.createElement('div');
    stage.className = 'bv-stage';

    const img = document.createElement('img');
    img.src = 'assets/bilvaerksted_vrimmel.jpg';
    img.onerror = () => { img.src = 'assets/klasse_kontor_vrimmel.jpg'; };
    img.alt = 'På bilværkstedet vrimlebillede';
    img.className = 'bv-img';
    stage.appendChild(img);

    // Detail Card
    const detailBox = document.createElement('div');
    detailBox.className = 'bv-detail-card';

    // Quick Word Chips Bar
    const quickBar = document.createElement('div');
    quickBar.className = 'bv-quick-words-bar';

    function selectWordItem(item) {
        stage.querySelectorAll('.bv-hotspot').forEach(h => {
            h.classList.toggle('active', h.dataset.id === item.id);
        });
        quickBar.querySelectorAll('.bv-word-pill').forEach(p => {
            p.classList.toggle('active', p.dataset.id === item.id);
        });

        const meta = CLASS_META[item.wordClass];
        const genderBadge = item.gender
            ? `<span class="bv-class-badge" style="background:${item.gender === 'en' ? 'rgba(56,189,248,0.2)' : 'rgba(249,115,22,0.2)'}; color:${item.gender === 'en' ? '#38bdf8' : '#fb923c'}; border:1px solid ${item.gender === 'en' ? '#0284c7' : '#ea580c'};">${item.gender.toUpperCase()}-ORD</span>`
            : '';
        const coreBadge = item.isCore
            ? `<span class="bv-class-badge" style="background:rgba(168,85,247,0.2); color:#d8b4fe; border:1px solid #a855f7;">⭐ Kerneord</span>`
            : `<span class="bv-class-badge" style="background:rgba(20,184,166,0.2); color:#5eead4; border:1px solid #14b8a6;">🔧 Fagterm / Nyt ord</span>`;

        detailBox.innerHTML = `
            <div style="flex: 1; min-width: 260px;">
                <div class="bv-badge-row">
                    <span class="bv-class-badge" style="background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.color};">#${item.num} • ${meta.label}</span>
                    ${genderBadge}
                    ${coreBadge}
                </div>
                <div style="font-size: 1.65rem; font-weight: 800; color: white; margin-bottom: 0.25rem;">
                    ${item.icon} ${item.word}
                </div>
                <div style="font-size: 0.9rem; color: #94a3b8; margin-bottom: 0.4rem;">
                    ${item.forms}
                </div>
                <div class="bv-def-box">
                    <strong>📖 Betydning:</strong> ${item.definition}
                </div>
                <div class="bv-terms-box">
                    <strong>🔩 Faste termer & vendinger:</strong> ${item.fixedTerms}
                </div>
                <div style="font-size: 1.05rem; color: #f8fafc; font-style: italic; margin-top: 0.4rem;">
                    "💬 ${item.sentence}"
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-start;">
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button class="listen-word-btn" id="bv-listen-word" style="background:#2563eb; color:white; border:none; padding:0.7rem 1.2rem; border-radius:12px; font-weight:700; cursor:pointer;">
                        🔊 Lyt til ordet
                    </button>
                    <button class="listen-word-btn" id="bv-listen-sentence" style="background:#0f172a; color:#38bdf8; border:1.5px solid #0284c7; padding:0.7rem 1.2rem; border-radius:12px; font-weight:700; cursor:pointer;">
                        🔊 Lyt til sætning
                    </button>
                    <button class="listen-word-btn" id="bv-show-trans" style="background:rgba(56,189,248,0.16); color:#7dd3fc; border:1.5px solid #38bdf8; padding:0.7rem 1.1rem; border-radius:12px; font-weight:700; cursor:pointer;">
                        🌍 Vis oversættelse
                    </button>
                </div>
            </div>
        `;

        detailBox.querySelector('#bv-listen-word').onclick = () => speakDanish(item.word);
        detailBox.querySelector('#bv-listen-sentence').onclick = () => speakDanish(item.sentence);
        detailBox.querySelector('#bv-show-trans').onclick = () => openWorkshopWordModal(item, false);
    }

    WORKSHOP_WORDS.forEach(item => {
        const spot = document.createElement('button');
        spot.type = 'button';
        spot.className = `bv-hotspot hs-${item.wordClass}`;
        spot.style.left = `${item.x}%`;
        spot.style.top = `${item.y}%`;
        spot.dataset.id = item.id;
        spot.dataset.wordclass = item.wordClass;
        spot.textContent = item.num;
        spot.title = `${item.num}. ${item.word} (${CLASS_META[item.wordClass].short})`;
        spot.onclick = () => {
            selectWordItem(item);
            speakDanish(item.word);
        };
        stage.appendChild(spot);

        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'bv-word-pill';
        pill.dataset.id = item.id;
        pill.style.borderLeft = `3px solid ${CLASS_META[item.wordClass].color}`;
        pill.textContent = `${item.num}. ${item.word}`;
        pill.onclick = () => {
            selectWordItem(item);
            speakDanish(item.word);
        };
        quickBar.appendChild(pill);
    });

    // Initialize detail card with word #1
    selectWordItem(WORKSHOP_WORDS[0]);

    viewport.appendChild(stage);
    vrimmelCard.appendChild(viewport);
    vrimmelCard.appendChild(detailBox);
    vrimmelCard.appendChild(quickBar);
    vrimmelPanel.appendChild(vrimmelCard);

    // --- 4-KATEGORIS ORDKLASSE-SORTERING UNDER VRIMLEBILLEDET ---
    const sortingBox = document.createElement('div');
    sortingBox.className = 'bv-sorting-box';

    let sortPlacedCount = 0;
    let selectedSortItem = null;

    const sortHeader = document.createElement('div');
    sortHeader.style.cssText = 'display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;';
    sortHeader.innerHTML = `
        <div>
            <h3 style="margin:0; font-size:1.25rem;">📦 Sorter værkstedets 32 målord i de 4 ordklasser</h3>
            <p style="margin:0.25rem 0 0; color:#94a3b8; font-size:0.92rem;">Klik på et ord i banken og læg det i den rigtige ordklasse-kasse.</p>
        </div>
        <div style="display:flex; gap:0.6rem; align-items:center;">
            <span id="bv-sort-progress" style="background:rgba(56,189,248,0.2); color:#38bdf8; border:1px solid #0284c7; padding:0.4rem 0.9rem; border-radius:20px; font-weight:800; font-size:0.88rem;">0 / ${WORKSHOP_WORDS.length} placeret</span>
            <button id="bv-sort-reset" style="background:#334155; color:white; border:none; padding:0.45rem 0.9rem; border-radius:10px; font-weight:700; cursor:pointer;">🔄 Nulstil</button>
        </div>
    `;
    sortingBox.appendChild(sortHeader);

    const binsGrid = document.createElement('div');
    binsGrid.className = 'bv-bins-4';

    const binDefs = [
        { key: 'substantiv', title: '🟢 Substantiver (16)', sub: 'Ting, personer & steder (en/et)', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { key: 'verbum', title: '🔴 Verber (8)', sub: 'Handlinger på værkstedet (at...)', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
        { key: 'adjektiv', title: '🟠 Adjektiver (4)', sub: 'Hvordan er tingen/bilen?', color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)' },
        { key: 'adverbium', title: '🔵 Adverbier (4)', sub: 'Hvordan foregår handlingen? / Holdning', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.1)' }
    ];

    const binListEls = {};
    binDefs.forEach(bd => {
        const bin = document.createElement('div');
        bin.className = 'bv-sort-bin';
        bin.style.background = bd.bg;
        bin.style.borderColor = bd.color;
        bin.innerHTML = `
            <div style="font-weight:800; font-size:1.05rem; color:${bd.color}; margin-bottom:0.2rem;">${bd.title}</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin-bottom:0.7rem;">${bd.sub}</div>
            <div class="bv-bin-items" style="display:flex; flex-wrap:wrap; gap:0.4rem;"></div>
        `;
        binListEls[bd.key] = bin.querySelector('.bv-bin-items');

        bin.onclick = () => {
            if (!selectedSortItem) return;
            if (selectedSortItem.wordClass === bd.key) {
                const chip = document.createElement('span');
                chip.style.cssText = `background:#0f172a; color:white; border:1px solid ${bd.color}; padding:0.25rem 0.6rem; border-radius:8px; font-size:0.82rem; font-weight:700;`;
                chip.textContent = selectedSortItem.word;
                binListEls[bd.key].appendChild(chip);

                sortPlacedCount++;
                const progEl = sortHeader.querySelector('#bv-sort-progress');
                progEl.textContent = sortPlacedCount === WORKSHOP_WORDS.length
                    ? '🏆 Alle 32 ord sorteret korrekt!'
                    : `${sortPlacedCount} / ${WORKSHOP_WORDS.length} placeret`;

                sortBank.querySelectorAll('.bv-sort-chip').forEach(btn => {
                    if (btn.dataset.id === selectedSortItem.id) {
                        btn.style.opacity = '0.28';
                        btn.style.pointerEvents = 'none';
                        btn.style.textDecoration = 'line-through';
                        btn.style.borderColor = 'transparent';
                    }
                });
                speakDanish(selectedSortItem.word);
                selectedSortItem = null;
            } else {
                bin.style.transform = 'translateX(-6px)';
                setTimeout(() => { bin.style.transform = 'translateX(6px)'; }, 80);
                setTimeout(() => { bin.style.transform = ''; }, 160);
            }
        };
        binsGrid.appendChild(bin);
    });
    sortingBox.appendChild(binsGrid);

    const sortBank = document.createElement('div');
    sortBank.style.cssText = 'display:flex; flex-wrap:wrap; gap:0.45rem; justify-content:center; background:rgba(30,41,59,0.55); padding:1rem; border-radius:14px;';

    function renderSortBank() {
        sortBank.innerHTML = '';
        shuffleArray([...WORKSHOP_WORDS]).forEach(item => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'bv-sort-chip';
            btn.dataset.id = item.id;
            btn.style.cssText = 'background:#334155; color:white; border:2px solid transparent; padding:0.45rem 0.85rem; border-radius:10px; font-weight:700; font-size:0.88rem; cursor:pointer; transition:all 0.18s;';
            btn.textContent = item.word;
            btn.onclick = () => {
                selectedSortItem = item;
                sortBank.querySelectorAll('.bv-sort-chip').forEach(b => { b.style.borderColor = 'transparent'; b.style.background = '#334155'; });
                btn.style.borderColor = '#38bdf8';
                btn.style.background = '#1e293b';
            };
            sortBank.appendChild(btn);
        });
    }
    renderSortBank();

    sortHeader.querySelector('#bv-sort-reset').onclick = () => {
        sortPlacedCount = 0;
        selectedSortItem = null;
        Object.values(binListEls).forEach(el => { el.innerHTML = ''; });
        sortHeader.querySelector('#bv-sort-progress').textContent = `0 / ${WORKSHOP_WORDS.length} placeret`;
        renderSortBank();
    };

    sortingBox.appendChild(sortBank);
    vrimmelPanel.appendChild(sortingBox);
    panelsHolder.appendChild(vrimmelPanel);

    // ========================================================
    // --- TAB 2: ORD-DETEKTIV (TRÆNER ALLE 4 KATEGORIER & DEFINITIONER)
    // ========================================================
    const detektivPanel = document.createElement('div');
    detektivPanel.className = `bv-panel ${currentTab === 'tab_detektiv' ? 'active' : ''}`;
    detektivPanel.dataset.panel = 'tab_detektiv';

    const DETEKTIV_MISSIONS = [
        {
            badge: '🟢 Substantiver • Værktøj & Maskiner',
            title: 'Find 3 redskaber eller maskiner, som mekanikeren bruger til at løfte og skrue med 🔧🏗️',
            targetCount: 3,
            options: [
                { text: 'en autolift', correct: true },
                { text: 'en donkraft', correct: true },
                { text: 'en skruenøgle', correct: true },
                { text: 'en forrude', correct: false },
                { text: 'en regning', correct: false },
                { text: 'heldigvis', correct: false }
            ]
        },
        {
            badge: '🔴 Verber • Handlinger på liften',
            title: 'Find 3 verber (handlinger), som mekanikeren udfører på selve bilen 🛠️🔎',
            targetCount: 3,
            options: [
                { text: 'at reparere', correct: true },
                { text: 'at fejlsøge', correct: true },
                { text: 'at spænde', correct: true },
                { text: 'et batteri', correct: false },
                { text: 'slidt', correct: false },
                { text: 'en reservedel', correct: false }
            ]
        },
        {
            badge: '🟠 Adjektiver • Bilens tilstand',
            title: 'Find de 3 adjektiver, der beskriver at noget på bilen er i stykker, tyndt eller uden luft ⚠️🚨',
            targetCount: 3,
            options: [
                { text: 'slidt', correct: true },
                { text: 'flad', correct: true },
                { text: 'defekt', correct: true },
                { text: 'køreklar', correct: false },
                { text: 'hurtigt', correct: false },
                { text: 'en bremse', correct: false }
            ]
        },
        {
            badge: '🔵 Adverbier • Måde & Holdning',
            title: 'Find 3 adverbier, der beskriver HVORDAN mekanikeren arbejder (måde) eller vores holdning 🧤⚡',
            targetCount: 3,
            options: [
                { text: 'grundigt', correct: true },
                { text: 'forsigtigt', correct: true },
                { text: 'heldigvis', correct: true },
                { text: 'en motor', correct: false },
                { text: 'at syne', correct: false },
                { text: 'defekt', correct: false }
            ]
        },
        {
            badge: '🟢 Substantiver • Bilens vigtige dele',
            title: 'Find 3 dele, der sidder på eller under selve bilen 🚗⚙️',
            targetCount: 3,
            options: [
                { text: 'en udstødning', correct: true },
                { text: 'en bremse', correct: true },
                { text: 'en forrude', correct: true },
                { text: 'en regning', correct: false },
                { text: 'at påfylde', correct: false },
                { text: 'hurtigt', correct: false }
            ]
        },
        {
            badge: '📖 Målordsdefinition • Forstå ud fra sammenhængen',
            title: 'Find de 3 ord der passer til: 1) Væske der smører motoren, 2) Ny del fra lageret, 3) At hælde væske på 🛢️📦',
            targetCount: 3,
            options: [
                { text: 'en motorolie', correct: true },
                { text: 'en reservedel', correct: true },
                { text: 'at påfylde', correct: true },
                { text: 'en donkraft', correct: false },
                { text: 'flad', correct: false },
                { text: 'en forrude', correct: false }
            ]
        },
        {
            badge: '📋 Bilsyn & Afhentning • Tværs over ordklasser',
            title: 'Find 3 ord der hører til, når bilen er færdig, godkendt og skal betales ved skranken ✅🧾',
            targetCount: 3,
            options: [
                { text: 'at syne', correct: true },
                { text: 'køreklar', correct: true },
                { text: 'en regning', correct: true },
                { text: 'et fladt dæk', correct: false },
                { text: 'en donkraft', correct: false },
                { text: 'defekt', correct: false }
            ]
        },
        {
            badge: '🛞 Hjulskift • Faste termer i praksis',
            title: 'Find de 3 ord fra forskellige ordklasser, man bruger ved et hjulskift: tingen, handlingen og måden 🛞🔩',
            targetCount: 3,
            options: [
                { text: 'et dæk (substantiv)', correct: true },
                { text: 'at skifte (verbum)', correct: true },
                { text: 'hurtigt (adverbium)', correct: true },
                { text: 'en forrude (substantiv)', correct: false },
                { text: 'at påfylde (verbum)', correct: false },
                { text: 'en udstødning (substantiv)', correct: false }
            ]
        }
    ];

    let currMissionIdx = 0;
    const missionCard = document.createElement('div');
    missionCard.style.cssText = 'background:rgba(30,41,59,0.65); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:2rem; max-width:840px; margin:0 auto;';

    function renderMission() {
        missionCard.innerHTML = '';
        const m = DETEKTIV_MISSIONS[currMissionIdx];
        let found = 0;

        const header = document.createElement('div');
        header.innerHTML = `
            <div style="display:inline-block; background:#f59e0b; color:#0f172a; font-weight:800; font-size:0.82rem; padding:0.3rem 0.85rem; border-radius:20px; margin-bottom:0.6rem;">
                🕵️ Mission ${currMissionIdx + 1} / ${DETEKTIV_MISSIONS.length} • ${m.badge}
            </div>
            <h2 style="font-size:1.45rem; color:white; margin:0 0 0.5rem;">${m.title}</h2>
            <p style="color:#94a3b8; margin:0 0 1.5rem;">Vælg alle ${m.targetCount} rigtige svar.</p>
        `;
        missionCard.appendChild(header);

        const grid = document.createElement('div');
        grid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:0.9rem; margin-bottom:1.5rem;';

        const feedback = document.createElement('div');
        feedback.style.cssText = 'text-align:center; min-height:48px;';

        shuffleArray([...m.options]).forEach(opt => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.style.cssText = 'background:#1e293b; border:2px solid #334155; color:white; padding:1.1rem; border-radius:14px; font-size:1.05rem; font-weight:700; cursor:pointer; transition:all 0.2s;';
            btn.textContent = opt.text;

            btn.onclick = () => {
                if (btn.dataset.done) return;
                if (opt.correct) {
                    btn.dataset.done = '1';
                    btn.style.background = 'rgba(34, 197, 94, 0.25)';
                    btn.style.borderColor = '#22c55e';
                    btn.style.color = '#4ade80';
                    found++;
                    speakDanish(opt.text.replace(/\s*\(.*?\)/, ''));
                    if (found === m.targetCount) {
                        feedback.innerHTML = `
                            <div style="color:#4ade80; font-size:1.2rem; font-weight:800; margin-bottom:0.8rem;">✓ Flot klaret! Du fandt alle ${m.targetCount} målord!</div>
                            <button id="bv-next-mission" style="background:#22c55e; color:#0f172a; border:none; padding:0.75rem 1.5rem; border-radius:12px; font-weight:800; font-size:1rem; cursor:pointer;">
                                ${currMissionIdx < DETEKTIV_MISSIONS.length - 1 ? 'Næste mission ➔' : 'Start forfra 🔄'}
                            </button>
                        `;
                        feedback.querySelector('#bv-next-mission').onclick = () => {
                            currMissionIdx = (currMissionIdx + 1) % DETEKTIV_MISSIONS.length;
                            renderMission();
                        };
                    } else {
                        feedback.innerHTML = `<div style="color:#4ade80; font-weight:700;">✓ Rigtigt! (${found} af ${m.targetCount} fundet)</div>`;
                    }
                } else {
                    btn.style.background = 'rgba(239, 68, 68, 0.25)';
                    btn.style.borderColor = '#ef4444';
                    btn.style.color = '#f87171';
                    feedback.innerHTML = `<div style="color:#f87171; font-weight:700;">✗ Ikke helt – prøv et andet ord fra værkstedet!</div>`;
                    setTimeout(() => {
                        btn.style.background = '#1e293b';
                        btn.style.borderColor = '#334155';
                        btn.style.color = 'white';
                    }, 700);
                }
            };
            grid.appendChild(btn);
        });

        missionCard.appendChild(grid);
        missionCard.appendChild(feedback);
    }
    renderMission();
    detektivPanel.appendChild(missionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- TAB 3: SYNONYMER & ANTONYMER (ALLE ORDKLASSER)
    // ========================================================
    const synAntPanel = document.createElement('div');
    synAntPanel.className = `bv-panel ${currentTab === 'tab_syn_ant' ? 'active' : ''}`;
    synAntPanel.dataset.panel = 'tab_syn_ant';

    const SYN_ANT_QUESTIONS = [
        {
            type: 'Antonym (Det modsatte)',
            wordClass: '🟠 Adjektiv',
            prompt: 'Bremseklodserne på bilen er helt <strong>slidte</strong>. Hvad er det modsatte af <em>slidte</em>?',
            correct: 'nye og friske',
            options: ['nye og friske', 'flade og tomme', 'defekte og rustne', 'dyre at syne'],
            explanation: '"Slidt" betyder brugt ned gennem lang tid – det modsatte er "ny".'
        },
        {
            type: 'Antonym (Det modsatte)',
            wordClass: '🟠 Adjektiv',
            prompt: 'Motoren har en <strong>defekt</strong> del og kan ikke starte. Hvad er bilen, når fejlen er repareret?',
            correct: 'køreklar',
            options: ['køreklar', 'flad', 'slidt', 'punkteret'],
            explanation: 'Når en "defekt" bil er blevet repareret på værkstedet, er den "køreklar" igen.'
        },
        {
            type: 'Antonym (Det modsatte)',
            wordClass: '🔴 Verbum',
            prompt: 'Autoliften <strong>løfter</strong> bilen højt op i luften. Hvad er det modsatte af <em>at løfte</em>?',
            correct: 'at sænke (ned)',
            options: ['at sænke (ned)', 'at påfylde', 'at fejlsøge', 'at syne'],
            explanation: 'Man "løfter" bilen op på liften og "sænker" den forsigtigt ned igen.'
        },
        {
            type: 'Antonym (Det modsatte)',
            wordClass: '🔴 Verbum',
            prompt: 'Mekanikeren <strong>spænder</strong> hjulboltene fast med skruenøglen. Hvad gør han, når hjulet skal af?',
            correct: 'løsner dem',
            options: ['løsner dem', 'påfylder dem', 'syner dem', 'polerer dem'],
            explanation: '"At spænde" (stramme) og "at løsne" er faste modsætninger, når man arbejder med værktøj.'
        },
        {
            type: 'Antonym (Det modsatte)',
            wordClass: '🔵 Adverbium',
            prompt: 'Lærlingen skifter de fire vinterdæk <strong>hurtigt</strong>. Hvad er det modsatte af <em>hurtigt</em>?',
            correct: 'langsomt',
            options: ['langsomt', 'grundigt', 'heldigvis', 'forsigtigt'],
            explanation: '"Hurtigt" og "langsomt" er de klassiske mådesadverbier for tempo.'
        },
        {
            type: 'Antonym (Det modsatte)',
            wordClass: '🔵 Holdningsadverbium',
            prompt: 'Skaden på udstødningen er <strong>heldigvis</strong> billig at reparere. Hvad siger man, hvis den er meget dyr?',
            correct: 'desværre',
            options: ['desværre', 'forsigtigt', 'hurtigt', 'grundigt'],
            explanation: '"Heldigvis" (positiv lettelse) har modpolen "desværre" (beklagelse).'
        },
        {
            type: 'Synonym (Samme betydning)',
            wordClass: '🔴 Verbum',
            prompt: 'Mekanikeren <strong>tjekker</strong> bremser, lygter og dæktryk. Hvilket ord betyder det samme som <em>at tjekke</em>?',
            correct: 'at kontrollere / efterse',
            options: ['at kontrollere / efterse', 'at punktere', 'at afbestille', 'at ødelægge'],
            explanation: 'På et værksted bruges "at tjekke", "at kontrollere" og "at efterse" som synonymer.'
        },
        {
            type: 'Synonym (Samme betydning)',
            wordClass: '🟢 Substantiv',
            prompt: 'Kunden beder om et <strong>pristilbud</strong>, før mekanikeren går i gang. Hvad kalder man også et pristilbud?',
            correct: 'et prisoverslag på reparationen',
            options: ['et prisoverslag på reparationen', 'en donkraft på hjul', 'en defekt forrude', 'en slidt bremseklods'],
            explanation: 'Et "pristilbud" eller "prisoverslag" fortæller kunden, hvad regningen cirka vil lyde på.'
        },
        {
            type: 'Synonym (Samme betydning)',
            wordClass: '🔵 Adverbium',
            prompt: 'Mekanikeren undersøger motoren <strong>grundigt</strong>. Hvilket ord betyder det samme som <em>grundigt</em>?',
            correct: 'nøje / omhyggeligt',
            options: ['nøje / omhyggeligt', 'tilfældigt', 'sjusket', 'fladt'],
            explanation: '"Grundigt", "nøje" og "omhyggeligt" betyder, at man tjekker alle detaljer.'
        },
        {
            type: 'Synonym / Fast fagterm',
            wordClass: '🟠 Adjektiv + 🟢 Substantiv',
            prompt: 'Hvad betyder den faste vending, at en bil har fået <strong>et fladt dæk</strong>?',
            correct: 'Dækket er punkteret og har tabt luften',
            options: [
                'Dækket er punkteret og har tabt luften',
                'Dækket er helt nyt og klar til vinter',
                'Bilen har fået ny motorolie på',
                'Forruden har fået et lille stenslag'
            ],
            explanation: 'Et "fladt dæk" betyder, at dækket er punkteret og mangler luft.'
        }
    ];

    let synIdx = 0;
    const synCard = document.createElement('div');
    synCard.style.cssText = 'background:rgba(30,41,59,0.65); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:2rem; max-width:840px; margin:0 auto;';

    function renderSynAntQuestion() {
        synCard.innerHTML = '';
        const q = SYN_ANT_QUESTIONS[synIdx];

        synCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
                <span style="background:rgba(168,85,247,0.2); color:#d8b4fe; border:1px solid #a855f7; padding:0.3rem 0.85rem; border-radius:20px; font-weight:800; font-size:0.82rem;">
                    🔄 Opgave ${synIdx + 1} / ${SYN_ANT_QUESTIONS.length} • ${q.type}
                </span>
                <span style="background:rgba(15,23,42,0.8); color:#cbd5e1; padding:0.3rem 0.8rem; border-radius:20px; font-size:0.82rem; font-weight:700;">
                    Ordklasse: ${q.wordClass}
                </span>
            </div>
            <div style="font-size:1.35rem; color:white; line-height:1.5; margin-bottom:1.5rem;">
                ${q.prompt}
            </div>
            <div id="bv-syn-opts" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.9rem; margin-bottom:1.2rem;"></div>
            <div id="bv-syn-feedback" style="min-height:56px; text-align:center;"></div>
        `;

        const optsWrap = synCard.querySelector('#bv-syn-opts');
        const fbWrap = synCard.querySelector('#bv-syn-feedback');

        shuffleArray([...q.options]).forEach(opt => {
            const b = document.createElement('button');
            b.type = 'button';
            b.style.cssText = 'background:#1e293b; border:2px solid #475569; color:white; padding:1rem 1.2rem; border-radius:14px; font-size:1.05rem; font-weight:700; cursor:pointer; transition:all 0.2s; text-align:center;';
            b.textContent = opt;
            b.onclick = () => {
                if (opt === q.correct) {
                    b.style.background = 'rgba(34, 197, 94, 0.25)';
                    b.style.borderColor = '#22c55e';
                    b.style.color = '#4ade80';
                    speakDanish(opt);
                    fbWrap.innerHTML = `
                        <div style="background:rgba(34,197,94,0.15); border:1px solid #22c55e; color:#4ade80; padding:0.9rem; border-radius:12px; margin-bottom:0.8rem; font-weight:600;">
                            ✓ Rigtigt! ${q.explanation}
                        </div>
                        <button id="bv-syn-next" style="background:#22c55e; color:#0f172a; border:none; padding:0.75rem 1.5rem; border-radius:12px; font-weight:800; cursor:pointer;">
                            ${synIdx < SYN_ANT_QUESTIONS.length - 1 ? 'Næste opgave ➔' : 'Prøv igen fra start 🔄'}
                        </button>
                    `;
                    fbWrap.querySelector('#bv-syn-next').onclick = () => {
                        synIdx = (synIdx + 1) % SYN_ANT_QUESTIONS.length;
                        renderSynAntQuestion();
                    };
                } else {
                    b.style.background = 'rgba(239, 68, 68, 0.25)';
                    b.style.borderColor = '#ef4444';
                    b.style.color = '#f87171';
                    fbWrap.innerHTML = `<div style="color:#f87171; font-weight:700;">✗ Prøv igen – tænk på betydningen i værkstedet!</div>`;
                }
            };
            optsWrap.appendChild(b);
        });
    }
    renderSynAntQuestion();
    synAntPanel.appendChild(synCard);
    panelsHolder.appendChild(synAntPanel);

    // ========================================================
    // --- TAB 4: HISTORIER (4 VÆRKSTEDSHISTORIER MED SPØRGSMÅL)
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = `bv-panel ${currentTab === 'tab_historie' ? 'active' : ''}`;
    historiePanel.dataset.panel = 'tab_historie';

    const STORIES = [
        {
            title: '1. Et fladt dæk på vej til arbejde',
            storyText: 'Mandag morgen opdager Jonas, at bilens ene bagdæk er helt fladt. Han kører forsigtigt hen til det lokale autoværksted. Lærlingen løfter bilen med en donkraft, tager det punkterede dæk af og skifter hurtigt til fire vinterdæk. Til sidst spænder han hjulboltene grundigt med en skruenøgle, så bilen igen er køreklar.',
            questions: [
                {
                    q: '1. Hvad var problemet med Jonas’ bil mandag morgen?',
                    options: [
                        { text: 'Det ene dæk var fladt (punkteret) 🛞', correct: true },
                        { text: 'Forruden var taget ud 🪟', correct: false },
                        { text: 'Regningen var blevet væk 🧾', correct: false }
                    ]
                },
                {
                    q: '2. Hvordan kørte Jonas hen til autoværkstedet?',
                    options: [
                        { text: 'Forsigtigt (mådesadverbium) 🧤', correct: true },
                        { text: 'Defekt (adjektiv) 🚨', correct: false },
                        { text: 'Med en autolift 🏗️', correct: false }
                    ]
                },
                {
                    q: '3. Hvad gør lærlingen til sidst med skruenøglen?',
                    options: [
                        { text: 'Han spænder hjulboltene grundigt 🔩', correct: true },
                        { text: 'Han påfylder sprinklervæske på dækket 🫗', correct: false },
                        { text: 'Han skifter forruden 🪟', correct: false }
                    ]
                }
            ]
        },
        {
            title: '2. Den gule motorlampe lyser',
            storyText: 'Midt på motorvejen begynder en gul advarselslampe at lyse, og motoren hakker. På autoværkstedet åbner mekanikeren motorhjelmen og fejlsøger på bilens computer. Testeren viser, at en lille elektrisk føler er defekt. Heldigvis har værkstedet den rigtige reservedel på hylden, og mekanikeren påfylder også frisk motorolie.',
            questions: [
                {
                    q: '1. Hvad gør mekanikeren for at finde årsagen til, at motorlampen lyser?',
                    options: [
                        { text: 'Han fejlsøger med en computer/tester 💻', correct: true },
                        { text: 'Han pumper dækkene op 🛞', correct: false },
                        { text: 'Han vasker forruden 🪟', correct: false }
                    ]
                },
                {
                    q: '2. Hvorfor er kunden heldig (heldigvis)?',
                    options: [
                        { text: 'Fordi værkstedet har den nødvendige reservedel på lager 📦', correct: true },
                        { text: 'Fordi hele motoren skal smides ud ⚙️', correct: false },
                        { text: 'Fordi batteriet er helt fladt 🔋', correct: false }
                    ]
                },
                {
                    q: '3. Hvad påfylder mekanikeren til sidst?',
                    options: [
                        { text: 'Frisk motorolie 🛢️', correct: true },
                        { text: 'En ny udstødning 💨', correct: false },
                        { text: 'En donkraft ⚙️', correct: false }
                    ]
                }
            ]
        },
        {
            title: '3. Klargøring til bilsyn',
            storyText: 'Marias bil skal synes i næste uge. Mekanikeren løfter bilen op på autoliften og gennemgår undervognen grundigt. Han ser, at de forreste bremser er meget slidte, og at der er et lille hul i udstødningen. Han reparerer udstødningen og skifter bremseklodserne, så bilen kan gå glat gennem syn.',
            questions: [
                {
                    q: '1. Hvorfor løfter mekanikeren bilen op på autoliften?',
                    options: [
                        { text: 'For at tjekke undervognen grundigt før bilsyn 🔍', correct: true },
                        { text: 'For at skrive en regning under bilen 🧾', correct: false },
                        { text: 'For at lade batteriet op i loftet 🔋', correct: false }
                    ]
                },
                {
                    q: '2. Hvilke to ting under bilen trænger til at blive lavet?',
                    options: [
                        { text: 'De slidte bremser og den utætte udstødning 🛑💨', correct: true },
                        { text: 'Forruden og rattet 🪟', correct: false },
                        { text: 'Værktøjskassen og donkraften 🧰', correct: false }
                    ]
                }
            ]
        },
        {
            title: '4. Stenslag i forruden og et pristilbud',
            storyText: 'En kold vintermorgen vil Peters bil ikke starte, fordi batteriet er fladt, og der er også kommet et stenslag i forruden. Værkstedet giver først Peter et pristilbud. Mekanikeren reparerer stenslaget i forruden og sætter et nyt batteri i. Da Peter henter sin køreklare bil, stemmer regningen præcis med tilbuddet.',
            questions: [
                {
                    q: '1. Hvorfor ville Peters bil ikke starte om morgenen?',
                    options: [
                        { text: 'Fordi batteriet var fladt (uden strøm) 🔋', correct: true },
                        { text: 'Fordi skruenøglen var slidt 🔧', correct: false },
                        { text: 'Fordi dækkene var nye 🛞', correct: false }
                    ]
                },
                {
                    q: '2. Hvad fik Peter, inden mekanikeren gik i gang med arbejdet?',
                    options: [
                        { text: 'Et pristilbud (prisoverslag) på arbejdet 🧾', correct: true },
                        { text: 'En ny autolift med hjem 🏗️', correct: false },
                        { text: 'En defekt udstødning 💨', correct: false }
                    ]
                }
            ]
        }
    ];

    // Map bøjningsformer i historierne til:
    // 1) "bv:<id>" -> De 32 målord på forsiden af Bilværksted
    // 2) "lno:<id>" -> Målord fra de andre flader i "Lær nye ord"
    const STORY_WORD_LINKS = {
        // Målord fra forsiden af Bilværksted (32 målord + faste sammensætninger i historierne)
        'mekaniker': 'bv:mekaniker',
        'mekanikeren': 'bv:mekaniker',
        'lærling': 'bv:laerling',
        'lærlingen': 'bv:laerling',
        'autolift': 'bv:autolift',
        'autoliften': 'bv:autolift',
        'motor': 'bv:motor',
        'motoren': 'bv:motor',
        'motorhjelmen': 'bv:motor',
        'dæk': 'bv:daek',
        'dækket': 'bv:daek',
        'bagdæk': 'bv:daek',
        'vinterdæk': 'bv:daek',
        'punkterede': 'bv:daek',
        'bremser': 'bv:bremse',
        'bremseklodserne': 'bv:bremse',
        'motorolie': 'bv:motorolie',
        'værktøjskassen': 'bv:vaerktoejskasse',
        'skruenøgle': 'bv:skruenoegle',
        'skruenøglen': 'bv:skruenoegle',
        'donkraft': 'bv:donkraft',
        'donkraften': 'bv:donkraft',
        'batteri': 'bv:batteri',
        'batteriet': 'bv:batteri',
        'udstødningen': 'bv:udstoedning',
        'forruden': 'bv:forrude',
        'stenslag': 'bv:forrude',
        'stenslaget': 'bv:forrude',
        'reservedel': 'bv:reservedel',
        'pristilbud': 'bv:pristilbud',
        'tilbuddet': 'bv:pristilbud',
        'regningen': 'bv:regning',
        'autoværksted': 'bv:mekaniker',
        'autoværkstedet': 'bv:mekaniker',
        'værkstedet': 'bv:mekaniker',
        'reparerer': 'bv:reparere',
        'skifter': 'bv:skifte',
        'tjekker': 'bv:tjekke',
        'gennemgår': 'bv:tjekke',
        'løfter': 'bv:loefte',
        'spænder': 'bv:spaende',
        'hjulboltene': 'bv:spaende',
        'påfylder': 'bv:paafylde',
        'fejlsøger': 'bv:fejlsoege',
        'testeren': 'bv:fejlsoege',
        'synes': 'bv:syne',
        'bilsyn': 'bv:syne',
        'syn': 'bv:syne',
        'defekt': 'bv:defekt',
        'slidte': 'bv:slidt',
        'fladt': 'bv:flad',
        'køreklar': 'bv:koereklar',
        'køreklare': 'bv:koereklar',
        'grundigt': 'bv:grundigt',
        'forsigtigt': 'bv:forsigtigt',
        'hurtigt': 'bv:hurtigt',
        'heldigvis': 'bv:heldigvis',

        // Målord fra de andre flader i "Lær nye ord" (Substantiver, Verber, Adjektiver)
        'morgen': 'lno:morgen',
        'vintermorgen': 'lno:morgen',
        'bil': 'lno:bil',
        'bilen': 'lno:bil',
        'bilens': 'lno:bil',
        'motorvejen': 'lno:motorvej',
        'computer': 'lno:computer',
        'hylden': 'lno:hylde',
        'uge': 'lno:uge',
        'kører': 'lno:koere',
        'tager': 'lno:tage',
        'åbner': 'lno:aabne',
        'starte': 'lno:starte',
        'henter': 'lno:hente',
        'gul': 'lno:gul',
        'lille': 'lno:lille',
        'kold': 'lno:kold',
        'nyt': 'lno:ny',
        'frisk': 'lno:ny'
    };

    const sortedStoryAliases = Object.keys(STORY_WORD_LINKS).sort((a, b) => b.length - a.length);
    const storyWordRegex = new RegExp(`(?<![\\wæøåÆØÅ])(${sortedStoryAliases.join('|')})(?![\\wæøåÆØÅ])`, 'gi');

    function formatStoryTextWithWordLinks(rawText) {
        return rawText.replace(storyWordRegex, (matchedWord) => {
            const target = STORY_WORD_LINKS[matchedWord.toLowerCase()];
            if (!target) return matchedWord;
            const [prefix, id] = target.split(':');
            if (prefix === 'bv') {
                const wObj = WORKSHOP_WORDS.find(w => w.id === id);
                const titleAttr = wObj ? `Klik for forklaring & oversættelse af '${wObj.word}' (Målord på Bilværkstedet)` : 'Klik for oversættelse';
                return `<span class="bv-story-word-link bv-link-workshop" data-link-type="bv" data-word-id="${id}" title="${titleAttr}" style="background:rgba(56,189,248,0.16); color:#7dd3fc; border-bottom:2px dashed #38bdf8; padding:0.05rem 0.35rem; border-radius:6px; font-weight:700; cursor:pointer; transition:all 0.15s; white-space:nowrap;">${matchedWord} <small style="font-size:0.72em;">🔧</small></span>`;
            } else {
                const lnoObj = OTHER_LNO_WORDS[id];
                const titleAttr = lnoObj ? `Klik for forklaring & oversættelse af '${lnoObj.word}' (${lnoObj.surface})` : 'Klik for oversættelse';
                return `<span class="bv-story-word-link bv-link-lno" data-link-type="lno" data-word-id="${id}" title="${titleAttr}" style="background:rgba(168,85,247,0.16); color:#d8b4fe; border-bottom:2px dashed #a855f7; padding:0.05rem 0.35rem; border-radius:6px; font-weight:700; cursor:pointer; transition:all 0.15s; white-space:nowrap;">${matchedWord} <small style="font-size:0.72em;">📚</small></span>`;
            }
        });
    }

    let activeStoryIdx = 0;
    const storyCard = document.createElement('div');
    storyCard.style.cssText = 'max-width:860px; margin:0 auto; background:rgba(30,41,59,0.65); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:1.8rem;';

    function renderStory() {
        storyCard.innerHTML = '';
        const st = STORIES[activeStoryIdx];

        const navRow = document.createElement('div');
        navRow.style.cssText = 'display:flex; gap:0.5rem; flex-wrap:wrap; justify-content:center; margin-bottom:1.2rem;';
        STORIES.forEach((s, idx) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.style.cssText = `padding:0.55rem 1rem; border-radius:12px; font-weight:700; font-size:0.9rem; cursor:pointer; border:2px solid ${idx === activeStoryIdx ? '#38bdf8' : '#334155'}; background:${idx === activeStoryIdx ? '#0284c7' : '#1e293b'}; color:white;`;
            b.textContent = s.title;
            b.onclick = () => {
                activeStoryIdx = idx;
                renderStory();
            };
            navRow.appendChild(b);
        });
        storyCard.appendChild(navRow);

        // Info-boks om klikbare ordlinks til både Bilværksted og de andre flader i "Lær nye ord"
        const linkLegend = document.createElement('div');
        linkLegend.style.cssText = 'background:rgba(15,23,42,0.85); border:1px solid rgba(56,189,248,0.3); border-radius:12px; padding:0.75rem 1rem; margin-bottom:1.1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; font-size:0.86rem;';
        const currTransLang = getPreferredTransLang();
        linkLegend.innerHTML = `
            <div style="display:flex; flex-wrap:wrap; gap:0.8rem; align-items:center; color:#cbd5e1;">
                <span>💡 <strong>Klik på de markerede ord i historien for oversættelse & forklaring:</strong></span>
                <span style="background:rgba(56,189,248,0.16); color:#7dd3fc; border-bottom:2px dashed #38bdf8; padding:0.1rem 0.45rem; border-radius:6px; font-weight:700;">Målord fra Bilværksted 🔧</span>
                <span style="background:rgba(168,85,247,0.16); color:#d8b4fe; border-bottom:2px dashed #a855f7; padding:0.1rem 0.45rem; border-radius:6px; font-weight:700;">Øvrige ord fra "Lær nye ord" 📚</span>
            </div>
            <div style="display:flex; align-items:center; gap:0.4rem;">
                <span style="color:#94a3b8; font-weight:700;">🌍 Sprog:</span>
                <select id="bv-story-trans-lang" style="background:#1e293b; color:white; border:1px solid #38bdf8; border-radius:8px; padding:0.25rem 0.5rem; font-size:0.8rem; font-weight:700; cursor:pointer;">
                    ${SUPPORTED_TRANS_LANGS.map(l => `<option value="${l.code}" ${l.code === currTransLang ? 'selected' : ''}>${l.label}</option>`).join('')}
                </select>
            </div>
        `;
        linkLegend.querySelector('#bv-story-trans-lang').onchange = (e) => {
            setPreferredTransLang(e.target.value);
        };
        storyCard.appendChild(linkLegend);

        const textBox = document.createElement('div');
        textBox.style.cssText = 'background:#0f172a; border-left:4px solid #38bdf8; padding:1.3rem; border-radius:14px; margin-bottom:1.5rem;';
        textBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.8rem;">
                <h3 style="margin:0; color:#38bdf8; font-size:1.25rem;">📖 ${st.title}</h3>
                <button id="bv-listen-story" style="background:#2563eb; color:white; border:none; padding:0.45rem 1rem; border-radius:20px; font-weight:700; cursor:pointer;">🔊 Lyt til historien</button>
            </div>
            <p id="bv-story-paragraph" style="margin:0; font-size:1.12rem; line-height:1.95; color:#f1f5f9;">${formatStoryTextWithWordLinks(st.storyText)}</p>
        `;
        textBox.querySelector('#bv-listen-story').onclick = () => speakDanish(st.storyText);

        // Attach click listeners to all word links in the story
        textBox.querySelectorAll('.bv-story-word-link').forEach(linkEl => {
            linkEl.onclick = (e) => {
                e.stopPropagation();
                const linkType = linkEl.dataset.linkType;
                const wordId = linkEl.dataset.wordId;
                if (linkType === 'bv') {
                    const item = WORKSHOP_WORDS.find(w => w.id === wordId);
                    if (item) openWorkshopWordModal(item, false);
                } else if (linkType === 'lno') {
                    const lnoItem = OTHER_LNO_WORDS[wordId];
                    if (lnoItem) openWorkshopWordModal(lnoItem, true);
                }
            };
        });

        storyCard.appendChild(textBox);

        st.questions.forEach(qItem => {
            const qBox = document.createElement('div');
            qBox.style.cssText = 'background:#1e293b; border-radius:14px; padding:1.2rem; margin-bottom:1rem; border:1px solid rgba(255,255,255,0.08);';
            qBox.innerHTML = `<div style="font-weight:800; font-size:1.05rem; margin-bottom:0.8rem; color:white;">${qItem.q}</div>`;

            const optRow = document.createElement('div');
            optRow.style.cssText = 'display:flex; flex-wrap:wrap; gap:0.6rem;';

            qItem.options.forEach(o => {
                const ob = document.createElement('button');
                ob.type = 'button';
                ob.style.cssText = 'background:#334155; color:white; border:none; padding:0.6rem 1.1rem; border-radius:10px; font-weight:700; cursor:pointer; transition:all 0.2s;';
                ob.textContent = o.text;
                ob.onclick = () => {
                    if (o.correct) {
                        ob.style.background = '#22c55e';
                        ob.style.color = '#0f172a';
                        speakDanish(o.text.replace(/[^\w\sæøåÆØÅ()-]/g, ''));
                    } else {
                        ob.style.background = '#ef4444';
                    }
                };
                optRow.appendChild(ob);
            });
            qBox.appendChild(optRow);
            storyCard.appendChild(qBox);
        });
    }
    renderStory();
    historiePanel.appendChild(storyCard);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- TAB 5: SÆTNINGSBYGNING (ALLE 4 KATEGORIER + PUSLESPIL)
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = `bv-panel ${currentTab === 'tab_saetning' ? 'active' : ''}`;
    saetningPanel.dataset.panel = 'tab_saetning';

    const sbCard = document.createElement('div');
    sbCard.style.cssText = 'max-width:940px; margin:0 auto; background:rgba(30,41,59,0.7); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:1.8rem;';

    // Sub-tabs: 1) Fri Sætningsbygger (med alle 4 ordklasser) 2) 8 Sætnings-puslespil
    const sbSubNav = document.createElement('div');
    sbSubNav.style.cssText = 'display:flex; justify-content:center; gap:0.8rem; margin-bottom:1.5rem; flex-wrap:wrap;';
    const sbBtnFree = document.createElement('button');
    sbBtnFree.style.cssText = 'background:#0284c7; color:white; border:none; padding:0.7rem 1.3rem; border-radius:12px; font-weight:800; cursor:pointer;';
    sbBtnFree.textContent = '🛠️ Byg sætninger med alle 4 ordklasser';

    const sbBtnPuzzle = document.createElement('button');
    sbBtnPuzzle.style.cssText = 'background:#1e293b; color:#cbd5e1; border:1px solid #475569; padding:0.7rem 1.3rem; border-radius:12px; font-weight:800; cursor:pointer;';
    sbBtnPuzzle.textContent = '🧩 Sætnings-puslespil (8 opgaver)';

    sbSubNav.appendChild(sbBtnFree);
    sbSubNav.appendChild(sbBtnPuzzle);
    sbCard.appendChild(sbSubNav);

    const freeWrap = document.createElement('div');
    const puzzleWrap = document.createElement('div');
    puzzleWrap.style.display = 'none';

    sbBtnFree.onclick = () => {
        freeWrap.style.display = 'block';
        puzzleWrap.style.display = 'none';
        sbBtnFree.style.background = '#0284c7';
        sbBtnFree.style.color = 'white';
        sbBtnPuzzle.style.background = '#1e293b';
        sbBtnPuzzle.style.color = '#cbd5e1';
    };
    sbBtnPuzzle.onclick = () => {
        freeWrap.style.display = 'none';
        puzzleWrap.style.display = 'block';
        sbBtnPuzzle.style.background = '#0284c7';
        sbBtnPuzzle.style.color = 'white';
        sbBtnFree.style.background = '#1e293b';
        sbBtnFree.style.color = '#cbd5e1';
    };

    // Free Sentence Builder rows covering all 4 word classes – mundrette sætninger til de første 3 måneder
    const builderRows = [
        {
            label: '1. Hvem? (🟢 Person på værkstedet)',
            color: '#22c55e',
            options: ['Jeg', 'Mekanikeren', 'Lærlingen', 'Vi']
        },
        {
            label: '2. Handling (🔴 Verbum)',
            color: '#ef4444',
            options: ['tjekker', 'skifter', 'reparerer', 'spænder', 'løfter']
        },
        {
            label: '3. Hvordan / Holdning? (🔵 Adverbium)',
            color: '#38bdf8',
            options: ['hurtigt', 'grundigt', 'forsigtigt', 'heldigvis']
        },
        {
            label: '4. Hvad? (🟠 Adjektiv + 🟢 Substantiv)',
            color: '#f97316',
            options: ['det flade dæk', 'de slidte bremser', 'de fire hjul', 'det nye batteri', 'den defekte udstødning']
        },
        {
            label: '5. Hvor / Med hvad? (🟢 Værkstedsudtryk)',
            color: '#a855f7',
            options: ['på liften', 'med en skruenøgle', 'i hal to', 'før bilsyn']
        }
    ];

    const currentSelections = builderRows.map(r => r.options[0]);
    const liveSentenceBox = document.createElement('div');
    liveSentenceBox.style.cssText = 'background:#0f172a; border:2px solid #334155; border-radius:16px; padding:1.3rem; text-align:center; margin-bottom:1.4rem;';

    function updateFreeBuilder() {
        const full = `${currentSelections[0]} ${currentSelections[1]} ${currentSelections[2]} ${currentSelections[3]} ${currentSelections[4]}.`;
        liveSentenceBox.innerHTML = `
            <div style="font-size:0.8rem; color:#94a3b8; text-transform:uppercase; font-weight:800; margin-bottom:0.4rem;">DIN HVERDAGSSÆTNING PÅ VÆRKSTEDET (ALLE 4 ORDKLASSER):</div>
            <div style="font-size:1.35rem; font-weight:800; margin-bottom:0.9rem; line-height:1.45;">
                <span style="color:#4ade80;">${currentSelections[0]}</span>
                <span style="color:#f87171;">${currentSelections[1]}</span>
                <span style="color:#38bdf8;">${currentSelections[2]}</span>
                <span style="color:#fb923c;">${currentSelections[3]}</span>
                <span style="color:#c084fc;">${currentSelections[4]}</span>.
            </div>
            <button id="bv-free-listen" style="background:#2563eb; color:white; border:none; padding:0.6rem 1.3rem; border-radius:20px; font-weight:700; cursor:pointer;">🔊 Lyt til sætningen</button>
        `;
        liveSentenceBox.querySelector('#bv-free-listen').onclick = () => speakDanish(full);
    }

    freeWrap.appendChild(liveSentenceBox);

    builderRows.forEach((row, rIdx) => {
        const rowEl = document.createElement('div');
        rowEl.style.cssText = `background:rgba(15,23,42,0.55); border-left:4px solid ${row.color}; border-radius:12px; padding:0.9rem 1.1rem; margin-bottom:0.85rem;`;
        rowEl.innerHTML = `<div style="font-weight:800; font-size:0.92rem; color:${row.color}; margin-bottom:0.55rem;">${row.label}</div>`;

        const chipsWrap = document.createElement('div');
        chipsWrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:0.45rem;';

        row.options.forEach(opt => {
            const cb = document.createElement('button');
            cb.type = 'button';
            cb.style.cssText = `background:${currentSelections[rIdx] === opt ? row.color : '#1e293b'}; color:${currentSelections[rIdx] === opt ? '#0f172a' : '#e2e8f0'}; border:1px solid ${row.color}; padding:0.45rem 0.9rem; border-radius:10px; font-weight:700; font-size:0.9rem; cursor:pointer;`;
            cb.textContent = opt;
            cb.onclick = () => {
                currentSelections[rIdx] = opt;
                Array.from(chipsWrap.children).forEach(c => {
                    c.style.background = '#1e293b';
                    c.style.color = '#e2e8f0';
                });
                cb.style.background = row.color;
                cb.style.color = '#0f172a';
                updateFreeBuilder();
            };
            chipsWrap.appendChild(cb);
        });
        rowEl.appendChild(chipsWrap);
        freeWrap.appendChild(rowEl);
    });
    updateFreeBuilder();

    // 8 Sentence Puzzles – praksisnære sætninger fra de første 3 måneder på værkstedet
    const PUZZLES = [
        {
            hint: '1. Saml sætningen om at tjekke de slidte bremser:',
            parts: ['Først', 'tjekker', 'jeg', 'de slidte bremser', 'på liften']
        },
        {
            hint: '2. Saml sætningen om at skifte det flade dæk hurtigt:',
            parts: ['Jeg', 'skifter', 'hurtigt', 'det flade dæk', 'med en donkraft']
        },
        {
            hint: '3. Saml sætningen om at fylde motorolie på:',
            parts: ['Jeg', 'påfylder', 'forsigtigt', 'fire liter motorolie', 'på motoren']
        },
        {
            hint: '4. Saml sætningen om at spænde hjulboltene til sidst:',
            parts: ['Til sidst', 'spænder', 'jeg', 'hjulboltene', 'grundigt']
        },
        {
            hint: '5. Saml sætningen om et fladt batteri:',
            parts: ['Batteriet', 'er', 'helt fladt', 'så jeg skifter', 'det nu']
        },
        {
            hint: '6. Saml sætningen om reservedelen på hylden:',
            parts: ['Vi', 'har', 'heldigvis', 'den rigtige reservedel', 'på hylden']
        },
        {
            hint: '7. Saml sætningen om en køreklar bil:',
            parts: ['Nu', 'er', 'bilen', 'helt køreklar', 'til bilsyn']
        },
        {
            hint: '8. Saml sætningen om at hente mester til kunden:',
            parts: ['Lige', 'to minutter', 'jeg', 'henter', 'mester nu']
        }
    ];

    let puzzleIdx = 0;
    let puzzleSlots = [];

    function renderPuzzle() {
        puzzleWrap.innerHTML = '';
        const pz = PUZZLES[puzzleIdx];
        puzzleSlots = new Array(pz.parts.length).fill(null);

        const header = document.createElement('div');
        header.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
                <span style="color:#38bdf8; font-weight:800;">🧩 Puslespil ${puzzleIdx + 1} / ${PUZZLES.length}</span>
                <button id="bv-pz-reset" style="background:#334155; color:white; border:none; padding:0.4rem 0.85rem; border-radius:8px; font-weight:700; cursor:pointer;">🔄 Nulstil</button>
            </div>
            <div style="font-size:1.15rem; font-weight:700; color:white; margin-bottom:1rem;">${pz.hint}</div>
        `;
        puzzleWrap.appendChild(header);

        const slotsRow = document.createElement('div');
        slotsRow.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:0.65rem; margin-bottom:1.2rem;';

        const bankRow = document.createElement('div');
        bankRow.style.cssText = 'display:flex; flex-wrap:wrap; gap:0.55rem; justify-content:center; background:#0f172a; padding:1rem; border-radius:12px; margin-bottom:1rem;';

        const fbRow = document.createElement('div');
        fbRow.style.cssText = 'text-align:center; min-height:48px;';

        const shuffledParts = shuffleArray([...pz.parts]);

        function updatePuzzleUI() {
            slotsRow.innerHTML = '';
            puzzleSlots.forEach((val, idx) => {
                const sl = document.createElement('div');
                sl.style.cssText = `background:${val ? '#1e293b' : '#0f172a'}; border:2px ${val ? 'solid #38bdf8' : 'dashed #475569'}; border-radius:12px; padding:0.8rem; min-height:60px; display:flex; align-items:center; justify-content:center; font-weight:800; color:white; cursor:pointer; text-align:center;`;
                sl.innerHTML = val ? `${val} <span style="margin-left:0.4rem; color:#94a3b8; font-size:0.75rem;">✕</span>` : `<span style="color:#64748b; font-size:0.82rem;">Led ${idx + 1}</span>`;
                sl.onclick = () => {
                    if (puzzleSlots[idx]) {
                        puzzleSlots[idx] = null;
                        fbRow.innerHTML = '';
                        updatePuzzleUI();
                    }
                };
                slotsRow.appendChild(sl);
            });

            bankRow.innerHTML = '';
            shuffledParts.forEach(part => {
                const isUsed = puzzleSlots.includes(part);
                const b = document.createElement('button');
                b.type = 'button';
                b.style.cssText = `background:#334155; color:white; border:1.5px solid #64748b; padding:0.6rem 1rem; border-radius:10px; font-weight:700; cursor:pointer; opacity:${isUsed ? '0.25' : '1'}; pointer-events:${isUsed ? 'none' : 'auto'};`;
                b.textContent = part;
                b.onclick = () => {
                    const emptyIdx = puzzleSlots.indexOf(null);
                    if (emptyIdx !== -1) {
                        puzzleSlots[emptyIdx] = part;
                        updatePuzzleUI();
                        if (!puzzleSlots.includes(null)) {
                            const isCorrect = puzzleSlots.every((w, i) => w === pz.parts[i]);
                            const fullSent = pz.parts.join(' ') + '.';
                            if (isCorrect) {
                                speakDanish(fullSent);
                                fbRow.innerHTML = `
                                    <div style="color:#4ade80; font-weight:800; font-size:1.1rem; margin-bottom:0.6rem;">✓ Helt rigtigt! "${fullSent}"</div>
                                    <button id="bv-pz-next" style="background:#22c55e; color:#0f172a; border:none; padding:0.65rem 1.3rem; border-radius:10px; font-weight:800; cursor:pointer;">Næste puslespil ➔</button>
                                `;
                                fbRow.querySelector('#bv-pz-next').onclick = () => {
                                    puzzleIdx = (puzzleIdx + 1) % PUZZLES.length;
                                    renderPuzzle();
                                };
                            } else {
                                fbRow.innerHTML = `<div style="color:#f87171; font-weight:700;">✗ Ordstillingen passer ikke helt endnu – klik på et led for at flytte det!</div>`;
                            }
                        }
                    }
                };
                bankRow.appendChild(b);
            });
        }

        header.querySelector('#bv-pz-reset').onclick = () => {
            puzzleSlots = new Array(pz.parts.length).fill(null);
            fbRow.innerHTML = '';
            updatePuzzleUI();
        };

        updatePuzzleUI();
        puzzleWrap.appendChild(slotsRow);
        puzzleWrap.appendChild(bankRow);
        puzzleWrap.appendChild(fbRow);
    }
    renderPuzzle();

    sbCard.appendChild(freeWrap);
    sbCard.appendChild(puzzleWrap);
    saetningPanel.appendChild(sbCard);
    panelsHolder.appendChild(saetningPanel);

    // ========================================================
    // --- TAB 6: MUNDTLIGE DIALOGER I RIGTIG RÆKKEFØLGE (NY OPGAVE TIL SIDST)
    // ========================================================
    const dialogPanel = document.createElement('div');
    dialogPanel.className = `bv-panel ${currentTab === 'tab_dialog' ? 'active' : ''}`;
    dialogPanel.dataset.panel = 'tab_dialog';

    const WORKSHOP_DIALOGUES = [
        {
            title: 'Dialog 1: Indlevering af bil med slidte bremser',
            context: 'En kunde kommer ind på autoværkstedet om morgenen, fordi bremserne siger en mærkelig lyd.',
            lines: [
                { speaker: 'Kunde', roleClass: 'speaker-kunde', text: 'Godmorgen! Min bil siger en høj, skrabende lyd, hver gang jeg træder på bremsen.' },
                { speaker: 'Mekaniker', roleClass: 'speaker-mekaniker', text: 'Godmorgen! Det lyder som om, at dine bremseklodser er slidte. Lad os løfte bilen op på autoliften og tjekke det.' },
                { speaker: 'Kunde', roleClass: 'speaker-kunde', text: 'Tak! Kan I også tjekke motorolien og dæktrykket, nu hvor bilen alligevel er på værksted?' },
                { speaker: 'Mekaniker', roleClass: 'speaker-mekaniker', text: 'Selvfølgelig, vi gennemgår hele bilen grundigt og ringer til dig med et pristilbud, før vi skifter nogen reservedele.' },
                { speaker: 'Kunde', roleClass: 'speaker-kunde', text: 'Super, her er bilnøglen og mit telefonnummer. Hvornår tror du, at bilen er køreklar?' },
                { speaker: 'Mekaniker', roleClass: 'speaker-mekaniker', text: 'Hvis vi har bremseklodserne på lager, er den heldigvis køreklar allerede inden klokken 15 i eftermiddag.' }
            ],
            difficultWords: [
                {
                    id: 'd1_skrabende',
                    word: 'en skrabende lyd',
                    da: 'En ru, skurrende lyd, når metal gnider mod metal.',
                    trans: {
                        en: 'a scraping / grinding sound', de: 'ein kratzendes / schleifendes Geräusch', es: 'un ruido chirriante / de roce', pt: 'um barulho de raspagem', tr: 'sürtünme / kazıma sesi',
                        ar: 'صوت احتكاك / كشط معدني', fa: 'صدای سایش / خراشیدگی', ku: 'dengê xirxirê / lêketinê', ur: 'رگڑنے کی آواز', ru: 'скрежещущий звук', uk: 'скреготливий звук',
                        zh: '刺耳的摩擦声 / 刮擦声', vi: 'tiếng cọ xát / tiếng ken két', th: 'เสียงเสียดสี / เสียงครูด', ne: 'घोटिएको / करकर आवाज', ps: 'د سولېدو / خرخر غږ'
                    }
                },
                {
                    id: 'd1_traeder',
                    word: 'træder på bremsen',
                    da: 'Trykker foden ned på bremsepedalen for at bremse bilen.',
                    trans: {
                        en: 'steps on the brake pedal', de: 'auf die Bremse tritt', es: 'pisa el freno', pt: 'pisa no freio', tr: 'frene basıyor',
                        ar: 'يضغط على دواسة الفرامل', fa: 'پدال ترمز را فشار می‌دهد', ku: 'pê li frenê dike', ur: 'بریک پر پاؤں رکھتا ہے', ru: 'нажимает на тормоз', uk: 'натискає на гальма',
                        zh: '踩刹车', vi: 'đạp phanh', th: 'เหยียบเบรก', ne: 'ब्रेक थिच्छ (पाउले)', ps: 'بریک وهي (پښه پرې ږدي)'
                    }
                },
                {
                    id: 'd1_bremseklodser',
                    word: 'slidte bremseklodser',
                    da: 'Bremsebelægninger, der er blevet tynde efter lang tids brug og skal skiftes.',
                    trans: {
                        en: 'worn-out brake pads', de: 'abgenutzte Bremsbeläge', es: 'pastillas de freno desgastadas', pt: 'pastilhas de freio gastas', tr: 'aşınmış fren balataları',
                        ar: 'تيل / فحمات فرامل متآكلة', fa: 'لنت‌های ترمز فرسوده', ku: 'balatayên frenê yên mehîyayî', ur: 'گھسے ہوئے بریک پیڈز', ru: 'изношенные тормозные колодки', uk: 'зношені гальмівні колодки',
                        zh: '磨损的刹车片', vi: 'má phanh bị mòn', th: 'ผ้าเบรกที่สึกหรอ', ne: 'खिएको ब्रेक प्याड', ps: 'سولېدلي بریک پیډونه'
                    }
                },
                {
                    id: 'd1_autolift',
                    word: 'en autolift',
                    da: 'Hydraulisk lift, der løfter bilen op, så mekanikeren kan arbejde under den.',
                    trans: {
                        en: 'a car lift / vehicle hoist', de: 'eine Hebebühne', es: 'un elevador de coches', pt: 'um elevador automotivo', tr: 'araç kaldırma lifti',
                        ar: 'رافعة سيارات هيدروليكية', fa: 'جک بالابر خودرو', ku: 'lîfta erebeyan', ur: 'گاڑی اٹھانے والی لفٹ', ru: 'автомобильный подъёмник', uk: 'автомобільний підйомник',
                        zh: '汽车举升机', vi: 'cầu nâng ô tô', th: 'ลิฟต์ยกรถ', ne: 'गाडी उठाउने लिफ्ट', ps: 'د موټر پورته کولو لفټ'
                    }
                },
                {
                    id: 'd1_daektryk',
                    word: 'dæktrykket',
                    da: 'Mængden af lufttryk inde i bilens dæk.',
                    trans: {
                        en: 'the tire pressure', de: 'der Reifendruck', es: 'la presión de los neumáticos', pt: 'a pressão dos pneus', tr: 'lastik basıncı',
                        ar: 'ضغط الهواء في الإطارات', fa: 'فشار باد لاستیک‌ها', ku: 'pestana hewayê ya tekeran', ur: 'ٹائروں میں ہوا کا دباؤ', ru: 'давление в шинах', uk: 'тиск у шинах',
                        zh: '胎压（轮胎气压）', vi: 'áp suất lốp xe', th: 'ลมยาง / ความดันลมยาง', ne: 'टायरको हावाको चाप', ps: 'د ټایرونو د هوا فشار'
                    }
                },
                {
                    id: 'd1_pristilbud',
                    word: 'et pristilbud',
                    da: 'Et overslag over, hvad reparationen vil koste, før arbejdet starter.',
                    trans: {
                        en: 'a price quote / cost estimate', de: 'ein Preisangebot / Kostenvoranschlag', es: 'un presupuesto', pt: 'um orçamento', tr: 'fiyat teklifi',
                        ar: 'عرض سعر / تقدير التكلفة', fa: 'پیشنهاد قیمت / برآورد هزینه', ku: 'pêşniyara bihayê', ur: 'قیمت کا تخمینہ', ru: 'ценовое предложение / смета', uk: 'цінова пропозиція / кошторис',
                        zh: '报价 / 维修估价', vi: 'báo giá sửa chữa', th: 'ใบเสนอราคา / ประเมินราคา', ne: 'मूल्य प्रस्ताव (अनुमानित खर्च)', ps: 'د بیې وړاندیز (اټکل)'
                    }
                },
                {
                    id: 'd1_reservedele',
                    word: 'reservedele',
                    da: 'Nye bildele, som sættes i bilen i stedet for de ødelagte dele.',
                    trans: {
                        en: 'spare parts / replacement parts', de: 'Ersatzteile', es: 'repuestos / piezas de recambio', pt: 'peças de reposição', tr: 'yedek parçalar',
                        ar: 'قطع غيار', fa: 'قطعات یدکی', ku: 'parçeyên yedek', ur: 'اضافی پرزے (اسپیئر پارٹس)', ru: 'запчасти', uk: 'запчастини',
                        zh: '备用零件 / 配件', vi: 'phụ tùng thay thế', th: 'อะไหล่รถยนต์', ne: 'स्पेयर पार्ट्स (पार्टपुर्जा)', ps: 'پرزې (اضافي پرزې)'
                    }
                },
                {
                    id: 'd1_paa_lager',
                    word: 'på lager / køreklar',
                    da: 'Hjemme på værkstedets hylde / klar og sikker til at køre på vejen igen.',
                    trans: {
                        en: 'in stock / ready to drive', de: 'auf Lager / fahrbereit', es: 'en stock / listo para conducir', pt: 'em estoque / pronto para rodar', tr: 'stokta (depoda) / sürüşe hazır',
                        ar: 'متوفر في المخزن / جاهز للقيادة', fa: 'موجود در انبار / آماده حرکت', ku: 'li embarê هەیە / amade ji bo ajotinê', ur: 'اسٹاک میں موجود / چلنے کے لیے تیار', ru: 'в наличии на складе / готовый к поездке', uk: 'в наявності на складі / готовий до поїздки',
                        zh: '有现货 / 修好可上路', vi: 'có sẵn trong kho / sẵn sàng lăn bánh', th: 'มีของในสต็อก / พร้อมใช้งาน', ne: 'स्टकमा छ / चलाउन तयार', ps: 'په ګودام کې شته / د چلولو لپاره چمتو'
                    }
                }
            ]
        },
        {
            title: 'Dialog 2: Telefonopkald om pristilbud og defekt udstødning',
            context: 'Mekanikeren ringer til kunden efter at have fejlsøgt bilen på autoliften.',
            lines: [
                { speaker: 'Mekaniker', roleClass: 'speaker-mekaniker', text: 'Hej Sofie, det er Anders fra autoværkstedet. Vi har nu haft din bil oppe på liften og fejlsøgt den.' },
                { speaker: 'Kunde', roleClass: 'speaker-kunde', text: 'Hej Anders! Hvad fandt I ud af? Er det noget alvorligt med motoren?' },
                { speaker: 'Mekaniker', roleClass: 'speaker-mekaniker', text: 'Motoren fejler heldigvis ingenting, men der er gået hul på den bagerste del af udstødningen, og batteriet er næsten fladt.' },
                { speaker: 'Kunde', roleClass: 'speaker-kunde', text: 'Nå for søren, det forklarer jo, hvorfor bilen larmede! Hvad vil det koste at reparere?' },
                { speaker: 'Mekaniker', roleClass: 'speaker-mekaniker', text: 'En ny udstødning og et nyt batteri inklusive arbejdsløn og moms bliver 3.400 kroner i alt.' },
                { speaker: 'Kunde', roleClass: 'speaker-kunde', text: 'Det lyder rimeligt. I må meget gerne skifte begge dele, så bilen bliver klar til bilsyn.' }
            ],
            difficultWords: [
                {
                    id: 'd2_fejlsoegt',
                    word: 'har fejlsøgt den',
                    da: 'Har undersøgt bilen systematisk for at finde ud af, hvad der er galt.',
                    trans: {
                        en: 'have diagnosed / troubleshot it', de: 'haben die Fehlersuche durchgeführt', es: 'lo hemos diagnosticado', pt: 'fizemos o diagnóstico de falhas', tr: 'arıza tespitini yaptık',
                        ar: 'قمنا بفحص وتشخيص الأعطال', fa: 'آن را عیب‌یابی کرده‌ایم', ku: 'me lêgerîna arîzeyê kir', ur: 'اس کی خرابی تلاش کر لی ہے', ru: 'провели диагностику неисправностей', uk: 'провели діагностику несправностей',
                        zh: '已经进行了故障排查', vi: 'đã chẩn đoán lỗi', th: 'ได้ตรวจหาจุดเสียแล้ว', ne: 'खराबी पत्ता लगायौं', ps: 'موږ یې عوارض ولټول'
                    }
                },
                {
                    id: 'd2_alvorligt',
                    word: 'noget alvorligt',
                    da: 'Et stort, farligt eller dyrt problem.',
                    trans: {
                        en: 'something serious', de: 'etwas Ernstes', es: 'algo grave / serio', pt: 'algo grave / sério', tr: 'ciddi bir şey',
                        ar: 'شيء خطير / جدي', fa: 'مشکل جدی', ku: 'tiştekî cidî / گران', ur: 'کوئی سنگین (بڑا) مسئلہ', ru: 'что-то серьёзное', uk: 'щось серйозне',
                        zh: '严重的问题', vi: 'điều gì đó nghiêm trọng', th: 'เรื่องร้ายแรง / ปัญหาใหญ่', ne: 'केही गम्भीर समस्या', ps: 'کومه جدي ستونزه'
                    }
                },
                {
                    id: 'd2_fejler_ingenting',
                    word: 'fejler ingenting',
                    da: 'Virker helt som den skal; har ingen fejl.',
                    trans: {
                        en: 'has nothing wrong with it', de: 'hat keinerlei Fehler / ist völlig in Ordnung', es: 'no tiene ningún fallo', pt: 'não tem nada de errado', tr: 'hiçbir sorunu yok',
                        ar: 'لا يعاني من أي عطل (سليم تماماً)', fa: 'هیچ ایرادی ندارد', ku: 'ti kêmasî تێda tune', ur: 'بالکل ٹھیک ہے (کوئی خرابی نہیں)', ru: 'полностью исправен', uk: 'повністю справний',
                        zh: '没有任何毛病', vi: 'không bị sao cả (hoàn toàn tốt)', th: 'ไม่ได้เสียเลย / ปกติดีทุกอย่าง', ne: 'केही पनि बिग्रिएको छैन', ps: 'هیڅ عوارض نه لري'
                    }
                },
                {
                    id: 'd2_udstoedning',
                    word: 'hul på udstødningen',
                    da: 'Utæthed i røret under bilen, så bilen larmer meget, når man kører.',
                    trans: {
                        en: 'a hole in the exhaust pipe', de: 'ein Loch im Auspuff', es: 'un agujero en el tubo de escape', pt: 'um furo no escapamento', tr: 'egzozda delik',
                        ar: 'ثقب في عادم السيارة (الشكمان)', fa: 'سوراخ در اگزوز', ku: 'qul di egzozê de', ur: 'سائلنسر (ایگزاسٹ) میں سوراخ', ru: 'дыра в глушителе (выхлопной трубе)', uk: 'дірка у вихлопній трубі (глушнику)',
                        zh: '排气管破了个洞', vi: 'thủng ống xả', th: 'ท่อไอเสียรั่ว / เป็นรู', ne: 'साइलेन्सरमा प्वाल परेको', ps: 'په سلنسر کې سوری شوی'
                    }
                },
                {
                    id: 'd2_fladt_batteri',
                    word: 'batteriet er næsten fladt',
                    da: 'Bilens batteri har næsten ikke mere strøm tilbage.',
                    trans: {
                        en: 'the battery is almost dead / flat', de: 'die Batterie ist fast leer', es: 'la batería está casi descargada', pt: 'a bateria está quase arriada / sem carga', tr: 'akü neredeyse bitmiş',
                        ar: 'البطارية شبه فارغة من الشحن', fa: 'باتری تقریباً خوابیده (خالی) است', ku: 'baterî hema hema vala bûye', ur: 'بیٹری تقریباً ختم (ڈاؤن) ہے', ru: 'аккумулятор почти разряжен', uk: 'акумулятор майже розряджений',
                        zh: '电瓶快没电了', vi: 'ắc quy gần hết điện', th: 'แบตเตอรี่เกือบหมดไฟ', ne: 'ब्याट्रीको चार्ज झन्डै सकिएको छ', ps: 'بطرۍ نږدې خالي شوې ده'
                    }
                },
                {
                    id: 'd2_larmede',
                    word: 'bilen larmede',
                    da: 'Bilen lavede en meget høj støj.',
                    trans: {
                        en: 'the car made a loud noise', de: 'das Auto hat Lärm gemacht', es: 'el coche hacía mucho ruido', pt: 'o carro estava fazendo barulho', tr: 'araba gürültü yapıyordu',
                        ar: 'كانت السيارة تصدر ضجيجاً عالياً', fa: 'ماشین صدای بلندی می‌داد', ku: 'erebeyê dengê bilind derdixist', ur: 'گاڑی بہت شور کر رہی تھی', ru: 'машина сильно шумела', uk: 'машина сильно шуміла',
                        zh: '车子发出很大的噪音', vi: 'xe phát ra tiếng ồn lớn', th: 'รถส่งเสียงดังมาก', ne: 'गाडीले ठूलो आवाज निकाल्यो', ps: 'موټر ډېر شور کاوه'
                    }
                },
                {
                    id: 'd2_arbejdsloen_moms',
                    word: 'inklusive arbejdsløn og moms',
                    da: 'Prisen er med både mekanikerens arbejdstimer og 25% skat (moms) indregnet.',
                    trans: {
                        en: 'including labor cost and VAT (tax)', de: 'inklusive Arbeitslohn und Mehrwertsteuer', es: 'incluyendo mano de obra e IVA', pt: 'incluindo mão de obra e impostos (IVA)', tr: 'işçilik ücreti ve KDV dahil',
                        ar: 'شاملاً أجور العمل وضريبة القيمة المضافة', fa: 'به همراه اجرت کار و مالیات بر ارزش افزوده', ku: 'bi heqdestê kar û باجê (KDV) ve', ur: 'مزدوری اور ٹیکس (مومس) سمیت', ru: 'включая стоимость работы и НДС', uk: 'включаючи вартість роботи та ПДВ',
                        zh: '包含人工费和增值税', vi: 'bao gồm tiền công thợ và thuế VAT', th: 'รวมค่าแรงช่างและภาษีมูลค่าเพิ่มแล้ว', ne: 'ज्याला र भ्याट (कर) सहित', ps: 'د مزدورۍ او مالیې په ګډون'
                    }
                },
                {
                    id: 'd2_bilsyn',
                    word: 'klar til bilsyn',
                    da: 'Klar til den lovpligtige sikkerhedskontrol i synshallen.',
                    trans: {
                        en: 'ready for mandatory vehicle inspection (MOT)', de: 'bereit für den TÜV / die Hauptuntersuchung', es: 'listo para la inspección técnica (ITV)', pt: 'pronto para a inspeção veicular', tr: 'araç muayenesine (TÜV) hazır',
                        ar: 'جاهز للفحص الفني الدوري', fa: 'آماده برای معاینه فنی خودرو', ku: 'amade ji bo muayeneya erebeyê', ur: 'گاڑی کے سرکاری معائنے (پاسنگ) کے لیے تیار', ru: 'готов к техосмотру', uk: 'готовий до техогляду',
                        zh: '准备好通过车辆年检', vi: 'sẵn sàng cho kỳ đăng kiểm xe', th: 'พร้อมสำหรับการตรวจสภาพรถ', ne: 'सवारी जाँचपासका लागि तयार', ps: 'د موټر تخنیکي معاینې ته چمتو'
                    }
                }
            ]
        },
        {
            title: 'Dialog 3: Hurtigt hjulskift ved punktering',
            context: 'En bilist kommer ind med et fladt dæk, og mester og lærling hjælper med det samme.',
            lines: [
                { speaker: 'Kunde', roleClass: 'speaker-kunde', text: 'Undskyld, har I tid til at hjælpe mig? Mit højre forhjul er næsten helt fladt!' },
                { speaker: 'Mester', roleClass: 'speaker-mester', text: 'Ja, kør bare bilen forsigtigt ind i hal 2, så kigger vores lærling på dækket med det samme.' },
                { speaker: 'Lærling', roleClass: 'speaker-laerling', text: 'Jeg har løftet bilen med donkraften. Der sidder desværre en stor skrue midt i dækket.' },
                { speaker: 'Kunde', roleClass: 'speaker-kunde', text: 'Kan dækket lappes, eller er jeg nødt til at få skiftet til mine vinterdæk nu?' },
                { speaker: 'Mester', roleClass: 'speaker-mester', text: 'Dækmønstret på dine sommerdæk er alligevel ret slidt, så det bedste er at skifte til vinterdæk nu.' },
                { speaker: 'Lærling', roleClass: 'speaker-laerling', text: 'Jeg skifter alle fire hjul hurtigt og spænder boltene efter med skruenøglen, så er du videre om 20 minutter!' }
            ],
            difficultWords: [
                {
                    id: 'd3_forhjul',
                    word: 'højre forhjul er fladt',
                    da: 'Hjulet foran i højre side har tabt luften (er punkteret).',
                    trans: {
                        en: 'the front right tire is flat', de: 'das rechte Vorderrad ist platt', es: 'la rueda delantera derecha está pinchada', pt: 'o pneu dianteiro direito está furado', tr: 'sağ ön tekerlek patlak (inik)',
                        ar: 'الإطار الأمامي الأيمن مفرغ من الهواء', fa: 'چرخ جلوی سمت راست پنچر است', ku: 'tekerê pêşiyê yê rastê teqiyaye', ur: 'دائیں طرف کا اگلا ٹائر پنچر ہے', ru: 'правое переднее колесо спущено', uk: 'праве переднє колесо спущене',
                        zh: '右前轮瘪了（漏气了）', vi: 'bánh trước bên phải bị xẹp', th: 'ล้อหน้าขวาแบน', ne: 'दायाँतिरको अगाडिको पाङ्ग्रा पन्चर छ', ps: 'ښی مخکینی ټایر پنچر شوی دی'
                    }
                },
                {
                    id: 'd3_donkraft',
                    word: 'løftet bilen med donkraften',
                    da: 'Hævet bilen fra gulvet med en lille mekanisk/hydraulisk løfter.',
                    trans: {
                        en: 'lifted the car with the jack', de: 'das Auto mit dem Wagenheber angehoben', es: 'levantado el coche con el gato', pt: 'levantado o carro com o macaco', tr: 'arabayı krikoyla kaldırdım',
                        ar: 'رفعت السيارة بالرافعة اليدوية (العفريتة)', fa: 'ماشین را با جک دستی بلند کردم', ku: 'min erebe bi krîkoyê bilind kir', ur: 'گاڑی کو جیک سے اٹھایا ہے', ru: 'поднял машину домкратом', uk: 'підняв машину домкратом',
                        zh: '用千斤顶把车升起来了', vi: 'đã nâng xe lên bằng con đội (kích)', th: 'ยกรถขึ้นด้วยแม่แรงแล้ว', ne: 'ज्याकले गाडी उठाएको छु', ps: 'موټر مې په جک پورته کړی دی'
                    }
                },
                {
                    id: 'd3_lappes',
                    word: 'kan dækket lappes?',
                    da: 'Kan hullet i det punkterede dæk tætnes/repareres, så dækket kan bruges igen?',
                    trans: {
                        en: 'can the tire be patched / repaired?', de: 'kann der Reifen geflickt werden?', es: '¿se puede reparar el pinchazo del neumático?', pt: 'o pneu pode ser remendado?', tr: 'lastik yamanabilir mi?',
                        ar: 'هل يمكن ترقيع (إصلاح) الإطار؟', fa: 'آیا لاستیک پنچرگیری (وصله) می‌شود؟', ku: 'ma teker dikare bê پîne kirin?', ur: 'کیا ٹائر کو پنکچر لگایا جا سکتا ہے؟', ru: 'можно ли заклеить (залатать) шину?', uk: 'чи можна залатати (заклеїти) шину?',
                        zh: '轮胎可以补吗？', vi: 'lốp xe có vá được không?', th: 'ปะยางได้ไหม?', ne: 'के टायरमा टालो हाल्न (पन्चर टाल्न) मिल्छ?', ps: 'آیا ټایر پینه کېدای شي؟'
                    }
                },
                {
                    id: 'd3_daekmoenster',
                    word: 'dækmønstret er slidt',
                    da: 'Rillerne i dækkets gummi er blevet for lave til at stå godt fast på vejen.',
                    trans: {
                        en: 'the tire tread is worn down', de: 'das Reifenprofil ist abgefahren', es: 'el dibujo del neumático está desgastado', pt: 'os sulcos do pneu estão gastos', tr: 'lastik diş derinliği (deseni) aşınmış',
                        ar: 'نقشة الإطار متآكلة (ممسوحة)', fa: 'عاج لاستیک ساییده شده است', ku: 'nexşê (xêzên) tekerê mehîyaye', ur: 'ٹائر کی گُڈی (نمونہ) گھس چکی ہے', ru: 'протектор шины изношен', uk: 'протектор шини зношений',
                        zh: '轮胎花纹已经磨平了', vi: 'gai lốp (vân lốp) đã bị mòn', th: 'ดอกยางสึกหรอมากแล้ว', ne: 'टायरको गोटी (बुट्यान) खिइसकेको छ', ps: 'د ټایر نقشه (ګل) سولېدلی دی'
                    }
                },
                {
                    id: 'd3_vinterdaek',
                    word: 'skifte til vinterdæk',
                    da: 'Sætte dæk på, som er lavet til sne, frost og glatte vinterveje.',
                    trans: {
                        en: 'change to winter tires', de: 'auf Winterreifen wechseln', es: 'cambiar a neumáticos de invierno', pt: 'trocar para pneus de inverno', tr: 'kış lastiklerine geçmek',
                        ar: 'التبديل إلى الإطارات الشتوية', fa: 'تعویض به لاستیک‌های زمستانی', ku: 'guherandina ser tekerên zivistanê', ur: 'سردیوں کے ٹائر لگوانا', ru: 'поменять на зимнюю резину', uk: 'перейти на зимову гуму (шини)',
                        zh: '换上冬季轮胎', vi: 'thay sang lốp mùa đông', th: 'เปลี่ยนเป็นยางสำหรับฤดูหนาว', ne: 'जाडोयामको टायर फेर्नु', ps: 'د ژمي ټایرونه تړل'
                    }
                },
                {
                    id: 'd3_spaender_boltene',
                    word: 'spænder boltene efter med skruenøglen',
                    da: 'Strammer hjulboltene grundigt med en nøgle, så hjulene sidder helt fast.',
                    trans: {
                        en: 'tightens the wheel bolts with the wrench', de: 'zieht die Radbolzen mit dem Schraubenschlüssel nach', es: 'aprieta los tornillos con la llave inglesa', pt: 'aperta os parafusos com a chave de roda', tr: 'bijonları (somunları) anahtarla sıkıyor',
                        ar: 'يشد صواميل العجلات بمفتاح الربط', fa: 'پیچ‌های چرخ را با آچار سفت می‌کند', ku: 'bûlên tekerê bi açarê dişidîne', ur: 'رینچ (پانے) سے پہیے کے قابلے کستا ہے', ru: 'затягивает колёсные болты гаечным ключом', uk: 'затягує колісні болти гайковим ключем',
                        zh: '用扳手拧紧车轮螺栓', vi: 'siết chặt các ốc bánh xe bằng cờ lê', th: 'ขันน็อตล้อให้แน่นด้วยประแจ', ne: 'पानाले पाङ्ग्राको नट-बोल्ट कस्छ', ps: 'په رنچ سره د ټایر پیچونه کلکوي'
                    }
                }
            ]
        },
        {
            title: 'Dialog 4: Mester og lærling samarbejder på værkstedet',
            context: 'På værkstedsgulvet taler mester og lærling om dagens opgaver.',
            lines: [
                { speaker: 'Mester', roleClass: 'speaker-mester', text: 'Mikkel, er du færdig med at skifte motorolie og oliefilter på den sorte stationcar?' },
                { speaker: 'Lærling', roleClass: 'speaker-laerling', text: 'Ja, jeg har lige påfyldt fire liter ny motorolie og tjekket oliestanden med oliepinden.' },
                { speaker: 'Mester', roleClass: 'speaker-mester', text: 'Godt arbejde! Husk også at tjekke forruden og påfylde blå sprinklervæske, før du sænker autoliften.' },
                { speaker: 'Lærling', roleClass: 'speaker-laerling', text: 'Det gør jeg. Jeg så faktisk et lille stenslag nederst i forruden – skal jeg reparere det?' },
                { speaker: 'Mester', roleClass: 'speaker-mester', text: 'Ja, gør det grundigt med det samme, så forruden ikke revner, når bilen skal synes i morgen.' },
                { speaker: 'Lærling', roleClass: 'speaker-laerling', text: 'Modtaget! Bagefter kører jeg bilen ud på parkeringspladsen og lægger nøglen ind ved kassen.' }
            ],
            difficultWords: [
                {
                    id: 'd4_oliefilter',
                    word: 'skifte motorolie og oliefilter',
                    da: 'Tappe den gamle olie af motoren, sætte et nyt filter i og hælde ny olie på.',
                    trans: {
                        en: 'change engine oil and oil filter', de: 'Motoröl und Ölfilter wechseln', es: 'cambiar el aceite de motor y el filtro de aceite', pt: 'trocar o óleo do motor e o filtro de óleo', tr: 'motor yağını ve yağ filtresini değiştirmek',
                        ar: 'تغيير زيت المحرك وفلتر الزيت', fa: 'تعویض روغن موتور و فیلتر روغن', ku: 'guherandina rûnê motorê û fîltreya rûn', ur: 'انجن آئل اور آئل فلٹر تبدیل کرنا', ru: 'поменять моторное масло и масляный фильтр', uk: 'замінити моторну оливу та масляний фільтр',
                        zh: '更换机油和机油滤清器', vi: 'thay dầu động cơ và lọc dầu', th: 'เปลี่ยนน้ำมันเครื่องและไส้กรองน้ำมันเครื่อง', ne: 'इन्जिन तेल र आयल फिल्टर फेर्नु', ps: 'د انجن تېل او د تېلو فلټر بدلول'
                    }
                },
                {
                    id: 'd4_oliestand',
                    word: 'tjekket oliestanden med oliepinden',
                    da: 'Målt med metalpinden i motoren, at der er præcis nok olie på.',
                    trans: {
                        en: 'checked the oil level with the dipstick', de: 'den Ölstand mit dem Ölmessstab geprüft', es: 'comprobado el nivel de aceite con la varilla', pt: 'verificado o nível do óleo com a vareta', tr: 'yağ çubuğuyla yağ seviyesini kontrol ettim',
                        ar: 'فحصت مستوى الزيت بواسطة سيخ القياس', fa: 'سطح روغن را با گیج روغن چک کردم', ku: 'min asta rûn bi شîşa pîvanê kontrol kir', ur: 'آئل گيج (سلاخ) سے تیل کی سطح چیک کی', ru: 'проверил уровень масла масляным щупом', uk: 'перевірив рівень оливи масляним щупом',
                        zh: '用机油尺检查了油位', vi: 'đã kiểm tra mức dầu bằng que thăm dầu', th: 'เช็กระดับน้ำมันเครื่องด้วยก้านวัดน้ำมันแล้ว', ne: 'गेज डन्डीले तेलको मात्रा जाँच गरें', ps: 'د تېلو د ګیج په وسیله مې د تېلو کچه وکتله'
                    }
                },
                {
                    id: 'd4_sprinklervaeske',
                    word: 'påfylde sprinklervæske',
                    da: 'Hælde rensevæske på beholderen, så føreren kan vaske forruden under kørsel.',
                    trans: {
                        en: 'fill up windshield washer fluid', de: 'Scheibenwischwasser nachfüllen', es: 'rellenar el líquido limpiaparabrisas', pt: 'completar o fluido do limpador de para-brisa', tr: 'cam suyu doldurmak',
                        ar: 'تعبئة سائل غسيل الزجاج الأمامي', fa: 'ریختن مایع شیشه‌شوی', ku: 'dagirtina ava şûştina camê', ur: 'شیشہ صاف کرنے والا پانی بھرنا', ru: 'долить жидкость стеклоомывателя', uk: 'долити рідину омивача скла',
                        zh: '加注玻璃水（雨刮水）', vi: 'châm thêm nước rửa kính', th: 'เติมน้ำยาฉีดกระจก', ne: 'सिसा सफा गर्ने पानी भर्नु', ps: 'د ښیښې مینځلو اوبه اچول'
                    }
                },
                {
                    id: 'd4_saenker_autoliften',
                    word: 'sænker autoliften',
                    da: 'Kører liften ned igen, så bilen står nede på gulvet.',
                    trans: {
                        en: 'lowers the car lift', de: 'die Hebebühne absenkt', es: 'baja el elevador', pt: 'abaixa o elevador', tr: 'lifti indiriyor',
                        ar: 'يُنزِل رافعة السيارة', fa: 'جک بالابر را پایین می‌آورد', ku: 'lîftê dadixe خوارê', ur: 'لفٹ کو نیچے کرتا ہے', ru: 'опускает подъёмник', uk: 'опускає підйомник',
                        zh: '降下举升机', vi: 'hạ cầu nâng xuống', th: 'ลดลิฟต์ยกรถลง', ne: 'लिफ्ट तल झार्छ', ps: 'لفټ ښکته کوي'
                    }
                },
                {
                    id: 'd4_stenslag',
                    word: 'et stenslag i forruden',
                    da: 'Et lille mærke eller stjerne i bilens forrude fra en lille sten på vejen.',
                    trans: {
                        en: 'a stone chip in the windshield', de: 'ein Steinschlag in der Windschutzscheibe', es: 'un impacto de piedra en el parabrisas', pt: 'uma lasca de pedra no para-brisa', tr: 'ön camda taş izi (çatlağı)',
                        ar: 'نقرة حصى في الزجاج الأمامي', fa: 'سنگ‌خوردگی روی شیشه جلو', ku: 'şopa kevir li cama pêşiyê', ur: 'اگلے شیشے پر پتھر لگنے کا نشان', ru: 'скол от камня на лобовом стекле', uk: 'скол від каменя на лобовому склі',
                        zh: '挡风玻璃上的石击小裂痕', vi: 'vết đá văng trên kính chắn gió', th: 'รอยหินดีดใส่กระจกหน้ารถ', ne: 'अगाडिको सिसामा ढुङ्गाले लागेको दाग', ps: 'په مخکینۍ ښیښه کې د ډبرې لګېدو نښه'
                    }
                },
                {
                    id: 'd4_revner',
                    word: 'så forruden ikke revner',
                    da: 'Så glasset ikke flækker i en lang revne på tværs af ruden.',
                    trans: {
                        en: 'so the windshield does not crack', de: 'damit die Frontscheibe nicht reißt', es: 'para que el parabrisas no se agriete', pt: 'para que o para-brisa não rache', tr: 'ön cam çatlamasın diye',
                        ar: 'حتى لا يتشقق الزجاج الأمامي', fa: 'تا شیشه جلو ترک نخورد', ku: 'da ku cama pêşiyê نەqelişe', ur: 'تاکہ اگلے شیشے میں دراڑ نہ پڑے', ru: 'чтобы лобовое стекло не треснуло', uk: 'щоб лобове скло не тріснуло',
                        zh: '以免挡风玻璃裂开', vi: 'để kính chắn gió không bị nứt lan ra', th: 'เพื่อไม่ให้กระจกหน้ารถร้าว', ne: 'अगाडिको सिसा नचर्कियोस् भनेर', ps: 'ترڅو مخکینۍ ښیښه درز ونه کړي'
                    }
                }
            ]
        },
        {
            title: 'Dialog 5: Afhentning af køreklar bil og gennemgang af regningen',
            context: 'Kunden kommer tilbage sidst på eftermiddagen for at hente sin bil og betale regningen.',
            lines: [
                { speaker: 'Kunde', roleClass: 'speaker-kunde', text: 'Hej igen! Jeg fik en sms om, at min bil er færdig og køreklar.' },
                { speaker: 'Mekaniker', roleClass: 'speaker-mekaniker', text: 'Ja, velkommen tilbage! Alt gik efter planen, og bilen er nu helt klar til bilsyn.' },
                { speaker: 'Kunde', roleClass: 'speaker-kunde', text: 'Hvor er det dejligt! Vil du gennemgå regningen med mig, så jeg kan se, hvad I har lavet?' },
                { speaker: 'Mekaniker', roleClass: 'speaker-mekaniker', text: 'Selvfølgelig. Her står reservedelene øverst: nye bremseklodser, en ny pære og to liter motorolie.' },
                { speaker: 'Kunde', roleClass: 'speaker-kunde', text: 'Og prisen passer heldigvis præcis med det pristilbud, vi aftalte i morges. Jeg betaler med kort.' },
                { speaker: 'Mekaniker', roleClass: 'speaker-mekaniker', text: 'Tusind tak! Husk at få efterspændt hjulboltene om 100 kilometer – god køretur!' }
            ],
            difficultWords: [
                {
                    id: 'd5_efter_planen',
                    word: 'alt gik efter planen',
                    da: 'Alt lykkedes som aftalt uden uventede problemer.',
                    trans: {
                        en: 'everything went according to plan', de: 'alles lief nach Plan', es: 'todo salió según lo planeado', pt: 'tudo correu conforme o planejado', tr: 'her şey plana uygun gitti',
                        ar: 'سار كل شيء حسب الخطة', fa: 'همه‌چیز طبق برنامه پیش رفت', ku: 'her tişt li gorî planê çû', ur: 'سب کچھ منصوبے کے مطابق ہوا', ru: 'всё прошло по плану', uk: 'все пройшло за планом',
                        zh: '一切都按计划顺利进行', vi: 'mọi thứ đều diễn ra đúng kế hoạch', th: 'ทุกอย่างเป็นไปตามแผนที่วางไว้', ne: 'सबै कुरा योजना अनुसार नै भयो', ps: 'هر څه د پلان له مخې ترسره شول'
                    }
                },
                {
                    id: 'd5_gennemgaa_regningen',
                    word: 'gennemgå regningen',
                    da: 'Kigge punkterne på fakturaen igennem sammen og forklare, hvad man betaler for.',
                    trans: {
                        en: 'go through / review the bill', de: 'die Rechnung durchgehen', es: 'revisar la factura', pt: 'revisar a fatura / conta', tr: 'faturayı birlikte gözden geçirmek',
                        ar: 'مراجعة تفاصيل الفاتورة معاً', fa: 'بررسی کردن فاکتور با هم', ku: 'fatûreyê bi hev re derbas kirin', ur: 'بل کی تفصیلات ایک ساتھ دیکھنا', ru: 'просмотреть (разобрать) счёт', uk: 'переглянути (розібрати) рахунок',
                        zh: '核对并讲解账单明细', vi: 'xem qua chi tiết hóa đơn', th: 'ตรวจสอบรายละเอียดในใบเสร็จร่วมกัน', ne: 'बिलको विवरण सँगै हेर्नु', ps: 'د بل جزئیات په ګډه کتل'
                    }
                },
                {
                    id: 'd5_ny_paere',
                    word: 'en ny pære (forlygtepære)',
                    da: 'En ny lyspære til bilens lygte, så lyset på bilen virker.',
                    trans: {
                        en: 'a new light bulb (headlight bulb)', de: 'eine neue Glühbirne (Scheinwerferlampe)', es: 'una bombilla nueva (de faro)', pt: 'uma lâmpada nova (do farol)', tr: 'yeni bir ampul (far ampulü)',
                        ar: 'لمبة (مصباح) جديدة لسيارة', fa: 'یک لامپ جدید (لامپ چراغ خودرو)', ku: 'ampûleke nû ya çiraya erebeyê', ur: 'گاڑی کی لائٹ کا نیا بلب', ru: 'новая лампочка (для фары)', uk: 'нова лампочка (для фари)',
                        zh: '一个新灯泡（车灯灯泡）', vi: 'một bóng đèn xe mới', th: 'หลอดไฟหน้ารถดวงใหม่', ne: 'नयाँ चिम (गाडीको बत्तीको बल्ब)', ps: 'نوی ګروپ (د موټر د څراغ ګروپ)'
                    }
                },
                {
                    id: 'd5_passer_praecis',
                    word: 'passer præcis med pristilbuddet',
                    da: 'Beløbet på regningen er nøjagtig det samme som den pris, værkstedet lovede.',
                    trans: {
                        en: 'matches the price quote exactly', de: 'stimmt genau mit dem Preisangebot überein', es: 'coincide exactamente con el presupuesto', pt: 'corresponde exatamente ao orçamento', tr: 'fiyat teklifiyle birebir uyuşuyor',
                        ar: 'يطابق عرض السعر المتفق عليه تماماً', fa: 'دقیقاً با پیشنهاد قیمت مطابقت دارد', ku: 'bi تەمamî li پêşniyara bihayê tê', ur: 'بالکل قیمت کے تخمینے کے مطابق ہے', ru: 'точно совпадает со сметой', uk: 'точно збігається з ціновою пропозицією',
                        zh: '与之前的报价完全一致', vi: 'khớp chính xác với báo giá', th: 'ตรงกับใบเสนอราคาที่ตกลงกันไว้เป๊ะ', ne: 'मूल्य प्रस्तावसँग ठ्याक्कै मिल्छ', ps: 'د بیې له وړاندیز سره کټ مټ سمون خوري'
                    }
                },
                {
                    id: 'd5_efterspaendt',
                    word: 'få efterspændt hjulboltene',
                    da: 'Kontrollere og stramme boltene på hjulene igen efter 100 km kørsel for sikkerhedens skyld.',
                    trans: {
                        en: 'have the wheel bolts retightened', de: 'die Radbolzen nachziehen lassen', es: 'volver a apretar los tornillos de las ruedas', pt: 'reapertar os parafusos das rodas', tr: 'tekerlek bijonlarını tekrar sıktırmak',
                        ar: 'إعادة شد صواميل العجلات للتأكيد', fa: 'دوباره سفت کردن پیچ‌های چرخ (آچارکشی)', ku: 'ji nû ve şidandina bûlên tekeran', ur: 'پہیے کے قابلے دوبارہ کسوانا', ru: 'повторно подтянуть колёсные болты', uk: 'повторно підтягнути колісні болти',
                        zh: '再次复紧车轮螺栓', vi: 'siết lại ốc bánh xe lần nữa', th: 'ขันน็อตล้อซ้ำอีกครั้งเพื่อความปลอดภัย', ne: 'पाङ्ग्राको नट-बोल्ट फेरि कसाउनु', ps: 'د ټایر پیچونه بیا ځلي کلکول'
                    }
                }
            ]
        }
    ];

    // Selvstændigheds-point og oplåste hjælpeord pr. dialog
    const DIALOG_SCORES_STORAGE_KEY = 'bilvaerksted_dialog_scores_v1';
    let savedDialogScores = {};
    try {
        savedDialogScores = JSON.parse(localStorage.getItem(DIALOG_SCORES_STORAGE_KEY) || '{}') || {};
    } catch (_) {
        savedDialogScores = {};
    }
    const unlockedWordsPerDialog = {}; // { [dialogIdx]: Set<wordId> }

    function getDialogUnlockedSet(idx) {
        if (!unlockedWordsPerDialog[idx]) unlockedWordsPerDialog[idx] = new Set();
        return unlockedWordsPerDialog[idx];
    }

    function calcDialogLivePoints(idx) {
        const usedCount = getDialogUnlockedSet(idx).size;
        return Math.max(20, 100 - usedCount * 10);
    }

    function getTotalSavedPoints() {
        let sum = 0;
        for (let i = 0; i < WORKSHOP_DIALOGUES.length; i++) {
            sum += (savedDialogScores[i] !== undefined ? savedDialogScores[i] : 100);
        }
        return sum;
    }

    let currDialogIdx = 0;
    const dialogCard = document.createElement('div');
    dialogCard.className = 'bv-dialog-card';

    function renderDialogueOrderingTask() {
        dialogCard.innerHTML = '';
        const dlg = WORKSHOP_DIALOGUES[currDialogIdx];
        const totalLines = dlg.lines.length;
        let placedLines = new Array(totalLines).fill(null);
        const scrambledLines = shuffleArray(dlg.lines.map((line, origIdx) => ({ ...line, origIdx })));

        // Ensure scrambled order is not accidentally identical to original order
        if (scrambledLines.every((l, i) => l.origIdx === i) && scrambledLines.length > 1) {
            const tmp = scrambledLines[0];
            scrambledLines[0] = scrambledLines[1];
            scrambledLines[1] = tmp;
        }

        // Top nav pills for the 5 dialogues with earned badge
        const navRow = document.createElement('div');
        navRow.style.cssText = 'display:flex; gap:0.5rem; flex-wrap:wrap; justify-content:center; margin-bottom:1.2rem;';
        WORKSHOP_DIALOGUES.forEach((d, idx) => {
            const pill = document.createElement('button');
            pill.type = 'button';
            const savedScore = savedDialogScores[idx];
            const scoreBadge = savedScore !== undefined ? ` • 🏆 ${savedScore}p` : '';
            pill.style.cssText = `padding:0.45rem 0.95rem; border-radius:20px; font-weight:800; font-size:0.85rem; cursor:pointer; border:1.5px solid ${idx === currDialogIdx ? '#38bdf8' : '#475569'}; background:${idx === currDialogIdx ? '#0284c7' : '#1e293b'}; color:white;`;
            pill.textContent = `💬 Dialog ${idx + 1}${scoreBadge}`;
            pill.onclick = () => {
                currDialogIdx = idx;
                renderDialogueOrderingTask();
            };
            navRow.appendChild(pill);
        });
        dialogCard.appendChild(navRow);

        // Live Scoreboard Banner
        const scoreBanner = document.createElement('div');
        scoreBanner.style.cssText = 'background:linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95)); border:1.5px solid rgba(245,158,11,0.45); border-radius:16px; padding:0.9rem 1.2rem; margin-bottom:1.3rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem;';

        function updateScoreBannerUI() {
            const livePts = calcDialogLivePoints(currDialogIdx);
            const usedWords = getDialogUnlockedSet(currDialogIdx).size;
            const medalIcon = livePts >= 90 ? '🥇 Guld-kurs' : (livePts >= 70 ? '🥈 Sølv-kurs' : '🥉 Bronze-kurs');
            scoreBanner.innerHTML = `
                <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
                    <span style="background:rgba(245,158,11,0.2); color:#fbbf24; border:1px solid #f59e0b; padding:0.35rem 0.85rem; border-radius:20px; font-weight:800; font-size:0.9rem;">
                        🏆 Selvstændigheds-point i denne dialog: <strong style="font-size:1.05rem; color:white;">${livePts} / 100</strong> (${medalIcon})
                    </span>
                    <span style="color:#94a3b8; font-size:0.84rem;">
                        💡 Åbnede hjælpeord i ordlisten nedenunder: <strong>${usedWords}</strong> (-${usedWords * 10} p)
                    </span>
                </div>
                <div style="background:rgba(56,189,248,0.15); color:#38bdf8; border:1px solid rgba(56,189,248,0.35); padding:0.3rem 0.8rem; border-radius:12px; font-weight:800; font-size:0.82rem;">
                    ⭐ Samlet score (5 dialoger): ${getTotalSavedPoints()} / 500 p
                </div>
            `;
        }
        updateScoreBannerUI();
        dialogCard.appendChild(scoreBanner);

        const header = document.createElement('div');
        header.style.cssText = 'margin-bottom:1.4rem;';
        header.innerHTML = `
            <div style="display:inline-block; background:rgba(56,189,248,0.18); color:#38bdf8; border:1px solid #0284c7; padding:0.3rem 0.85rem; border-radius:20px; font-size:0.82rem; font-weight:800; margin-bottom:0.5rem;">
                💬 Mundtlig dialog i rigtig rækkefølge (${currDialogIdx + 1} / ${WORKSHOP_DIALOGUES.length})
            </div>
            <h2 style="margin:0 0 0.4rem; font-size:1.5rem; color:white;">${dlg.title}</h2>
            <p style="margin:0; color:#94a3b8; font-size:0.98rem;">
                <strong>Situation:</strong> ${dlg.context}<br>
                <em>Replikkerne herunder er kommet i tilfældig rækkefølge. Klik på replikkerne i den rigtige rækkefølge (1 til ${totalLines}), så samtalen giver mening! Har du brug for hjælp til svære ord, kan du åbne dem i den valgfrie ordliste nederst.</em>
            </p>
        `;
        dialogCard.appendChild(header);

        // Ordered Slots Container
        const slotsWrap = document.createElement('div');
        slotsWrap.style.marginBottom = '1.5rem';

        // Scrambled Bank Header + Container
        const bankTitle = document.createElement('div');
        bankTitle.style.cssText = 'font-weight:800; font-size:0.95rem; color:#cbd5e1; margin-bottom:0.6rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;';
        bankTitle.innerHTML = `
            <span>🔀 Replikker i tilfældig rækkefølge (klik for at placere i næste ledige felt):</span>
            <button id="bv-dlg-reset" style="background:#334155; color:white; border:none; padding:0.4rem 0.9rem; border-radius:8px; font-weight:700; cursor:pointer;">🔄 Nulstil dialog</button>
        `;

        const bankWrap = document.createElement('div');
        const feedbackWrap = document.createElement('div');
        feedbackWrap.style.cssText = 'margin-top:1.2rem; text-align:center; min-height:56px;';

        function updateDialogUI(checkMode = false) {
            slotsWrap.innerHTML = '';
            placedLines.forEach((lineObj, slotIdx) => {
                const slotEl = document.createElement('div');
                let statusCls = '';
                if (checkMode && lineObj) {
                    statusCls = lineObj.origIdx === slotIdx ? 'correct-slot' : 'wrong-slot';
                }
                slotEl.className = `bv-dialog-slot ${lineObj ? 'filled' : ''} ${statusCls}`;

                if (lineObj) {
                    slotEl.innerHTML = `
                        <div style="display:flex; align-items:center; gap:0.6rem; flex:1;">
                            <span style="background:#0f172a; color:#38bdf8; font-weight:800; width:28px; height:28px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">${slotIdx + 1}</span>
                            <span class="bv-speaker-tag ${lineObj.roleClass}">${lineObj.speaker}</span>
                            <span style="color:#f8fafc; font-weight:600; font-size:0.96rem;">"${lineObj.text}"</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:0.45rem;">
                            <button type="button" class="bv-slot-listen" style="background:#334155; color:white; border:none; padding:0.35rem 0.6rem; border-radius:8px; cursor:pointer;" title="Lyt til replik">🔊</button>
                            <span style="color:#94a3b8; font-size:0.85rem; padding:0 0.3rem;" title="Fjern replik">✕</span>
                        </div>
                    `;
                    slotEl.querySelector('.bv-slot-listen').onclick = (e) => {
                        e.stopPropagation();
                        speakDanish(lineObj.text);
                    };
                    slotEl.onclick = () => {
                        placedLines[slotIdx] = null;
                        feedbackWrap.innerHTML = '';
                        updateDialogUI(false);
                    };
                } else {
                    slotEl.innerHTML = `
                        <div style="display:flex; align-items:center; gap:0.6rem; color:#64748b; font-weight:700;">
                            <span style="background:#1e293b; color:#64748b; width:28px; height:28px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center;">${slotIdx + 1}</span>
                            <span>Klik på replik nr. ${slotIdx + 1} herunder...</span>
                        </div>
                    `;
                }
                slotsWrap.appendChild(slotEl);
            });

            bankWrap.innerHTML = '';
            scrambledLines.forEach(sLine => {
                const isUsed = placedLines.some(p => p && p.origIdx === sLine.origIdx);
                const btn = document.createElement('div');
                btn.className = `bv-dialog-line-btn ${isUsed ? 'placed' : ''}`;
                btn.innerHTML = `
                    <div style="flex:1;">
                        <span class="bv-speaker-tag ${sLine.roleClass}">${sLine.speaker}</span>
                        <span>"${sLine.text}"</span>
                    </div>
                    <button type="button" class="bv-bank-listen" style="background:#0f172a; color:#38bdf8; border:1px solid #0284c7; padding:0.35rem 0.7rem; border-radius:8px; font-weight:700; cursor:pointer; flex-shrink:0;">🔊 Lyt</button>
                `;
                btn.querySelector('.bv-bank-listen').onclick = (e) => {
                    e.stopPropagation();
                    speakDanish(sLine.text);
                };
                btn.onclick = () => {
                    const emptyIdx = placedLines.indexOf(null);
                    if (emptyIdx !== -1) {
                        placedLines[emptyIdx] = sLine;
                        const allFilled = !placedLines.includes(null);
                        updateDialogUI(allFilled);
                        if (allFilled) {
                            const isAllCorrect = placedLines.every((l, idx) => l.origIdx === idx);
                            if (isAllCorrect) {
                                const earnedPoints = calcDialogLivePoints(currDialogIdx);
                                const usedCount = getDialogUnlockedSet(currDialogIdx).size;
                                // Save best or current score
                                savedDialogScores[currDialogIdx] = Math.max(savedDialogScores[currDialogIdx] || 0, earnedPoints);
                                try {
                                    localStorage.setItem(DIALOG_SCORES_STORAGE_KEY, JSON.stringify(savedDialogScores));
                                } catch (_) {}
                                updateScoreBannerUI();

                                const medalLabel = earnedPoints >= 90
                                    ? '🥇 GULD-MEDALJE (Klaret næsten helt uden ordhjælp!)'
                                    : (earnedPoints >= 70 ? '🥈 SØLV-MEDALJE (Flot klaret med lidt ordhjælp!)' : '🥉 BRONZE-MEDALJE (Godt gennemført!)');

                                feedbackWrap.innerHTML = `
                                    <div style="background:rgba(34,197,94,0.18); border:1.5px solid #22c55e; color:#4ade80; padding:1.15rem; border-radius:16px; font-weight:800; font-size:1.08rem; margin-bottom:0.9rem;">
                                        🎉 Perfekt! Du har sat hele den mundtlige værkstedsdialog i den rigtige rækkefølge!<br>
                                        <span style="display:inline-block; margin-top:0.45rem; background:rgba(15,23,42,0.85); color:#fbbf24; border:1px solid #f59e0b; padding:0.35rem 0.9rem; border-radius:20px; font-size:0.95rem;">
                                            🏆 Din score: ${earnedPoints} / 100 point (${usedCount} hjælpeord åbnet) • ${medalLabel}
                                        </span>
                                    </div>
                                    <div style="display:flex; justify-content:center; gap:0.8rem; flex-wrap:wrap;">
                                        <button id="bv-play-full-dlg" style="background:#2563eb; color:white; border:none; padding:0.75rem 1.3rem; border-radius:12px; font-weight:800; cursor:pointer;">🔊 Afspil hele dialogen</button>
                                        ${usedCount > 0 ? `<button id="bv-retry-100" style="background:#f59e0b; color:#0f172a; border:none; padding:0.75rem 1.3rem; border-radius:12px; font-weight:800; cursor:pointer;">🔄 Prøv igen uden ordhjælp (100 p)</button>` : ''}
                                        <button id="bv-next-dlg" style="background:#22c55e; color:#0f172a; border:none; padding:0.75rem 1.3rem; border-radius:12px; font-weight:800; cursor:pointer;">
                                            ${currDialogIdx < WORKSHOP_DIALOGUES.length - 1 ? 'Næste dialog ➔' : 'Prøv dialog 1 igen 🔄'}
                                        </button>
                                    </div>
                                `;
                                feedbackWrap.querySelector('#bv-play-full-dlg').onclick = () => {
                                    const allText = dlg.lines.map(l => l.text).join(' ');
                                    speakDanish(allText);
                                };
                                const retry100Btn = feedbackWrap.querySelector('#bv-retry-100');
                                if (retry100Btn) {
                                    retry100Btn.onclick = () => {
                                        unlockedWordsPerDialog[currDialogIdx] = new Set();
                                        renderDialogueOrderingTask();
                                    };
                                }
                                feedbackWrap.querySelector('#bv-next-dlg').onclick = () => {
                                    currDialogIdx = (currDialogIdx + 1) % WORKSHOP_DIALOGUES.length;
                                    renderDialogueOrderingTask();
                                };
                            } else {
                                feedbackWrap.innerHTML = `
                                    <div style="background:rgba(239,68,68,0.18); border:1.5px solid #ef4444; color:#f87171; padding:0.9rem; border-radius:12px; font-weight:700;">
                                        ⚠️ Nogle af replikkerne (markeret med rød kant) står ikke på den rigtige plads i samtalen. Klik på de røde felter for at tage dem ud og bytte rundt!
                                    </div>
                                `;
                            }
                        }
                    }
                };
                bankWrap.appendChild(btn);
            });
        }

        bankTitle.querySelector('#bv-dlg-reset').onclick = () => {
            placedLines = new Array(totalLines).fill(null);
            feedbackWrap.innerHTML = '';
            updateDialogUI(false);
        };

        // ========================================================
        // --- VALGFRI ORDLISTE NEDENUNDER MED SELVSTÆNDIGHEDS-POINT ---
        // ========================================================
        const glossarySection = document.createElement('div');
        glossarySection.style.cssText = 'margin-top:1.8rem; background:rgba(15,23,42,0.85); border:1.5px solid rgba(56,189,248,0.3); border-radius:18px; padding:1.3rem;';

        let glossaryTransLang = getPreferredTransLang();

        function renderGlossarySection() {
            const unlockedSet = getDialogUnlockedSet(currDialogIdx);
            const wordsList = dlg.difficultWords || [];

            glossarySection.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.8rem; margin-bottom:1rem; padding-bottom:0.8rem; border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div>
                        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                            <h3 style="margin:0; font-size:1.15rem; color:#38bdf8;">💡 Valgfri ordliste – Hjælp til svære ord i dialogen</h3>
                            <span style="background:rgba(245,158,11,0.18); color:#fbbf24; border:1px solid rgba(245,158,11,0.4); padding:0.2rem 0.65rem; border-radius:12px; font-size:0.78rem; font-weight:800;">
                                Jo færre ord du åbner, jo flere point får du! (-10 point pr. ord)
                            </span>
                        </div>
                        <p style="margin:0.3rem 0 0; color:#94a3b8; font-size:0.88rem;">
                            Prøv først at forstå samtalen ud fra sammenhængen. Hvis et udtryk er svært, kan du klikke på det herunder for at se oversættelse og dansk forklaring.
                        </p>
                    </div>
                    <div style="display:flex; align-items:center; gap:0.45rem;">
                        <span style="font-size:0.82rem; font-weight:700; color:#cbd5e1;">🌍 Oversæt til:</span>
                        <select id="bv-dlg-glossary-lang" style="background:#1e293b; color:white; border:1px solid #38bdf8; border-radius:8px; padding:0.3rem 0.6rem; font-size:0.82rem; font-weight:700; cursor:pointer;">
                            ${SUPPORTED_TRANS_LANGS.map(l => `<option value="${l.code}" ${l.code === glossaryTransLang ? 'selected' : ''}>${l.label}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div id="bv-dlg-glossary-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:0.75rem;"></div>
            `;

            glossarySection.querySelector('#bv-dlg-glossary-lang').onchange = (e) => {
                glossaryTransLang = e.target.value;
                setPreferredTransLang(glossaryTransLang);
                renderGlossarySection();
            };

            const gridEl = glossarySection.querySelector('#bv-dlg-glossary-grid');
            wordsList.forEach(wItem => {
                const isUnlocked = unlockedSet.has(wItem.id);
                const card = document.createElement('div');
                card.style.cssText = `background:${isUnlocked ? '#1e293b' : 'rgba(30,41,59,0.55)'}; border:1.5px ${isUnlocked ? 'solid #38bdf8' : 'dashed #475569'}; border-radius:12px; padding:0.85rem 1rem; transition:all 0.2s; display:flex; flex-direction:column; justify-content:space-between; gap:0.5rem;`;

                if (!isUnlocked) {
                    card.style.cursor = 'pointer';
                    card.innerHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                            <span style="font-weight:800; color:#f8fafc; font-size:0.98rem;">🔹 "${wItem.word}"</span>
                            <button type="button" class="bv-gl-listen" style="background:#0f172a; color:#38bdf8; border:1px solid #334155; padding:0.25rem 0.5rem; border-radius:6px; cursor:pointer; font-size:0.8rem;" title="Lyt til udtrykket (gratis)">🔊</button>
                        </div>
                        <div style="background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#fbbf24; border-radius:8px; padding:0.45rem 0.65rem; font-size:0.8rem; font-weight:700; text-align:center;">
                            🔒 Klik for at se oversættelse & forklaring (-10 point)
                        </div>
                    `;
                    card.querySelector('.bv-gl-listen').onclick = (e) => {
                        e.stopPropagation();
                        speakDanish(wItem.word);
                    };
                    card.onclick = () => {
                        unlockedSet.add(wItem.id);
                        speakDanish(wItem.word);
                        updateScoreBannerUI();
                        renderGlossarySection();
                    };
                } else {
                    const transStr = (wItem.trans && (wItem.trans[glossaryTransLang] || wItem.trans.en)) || wItem.word;
                    card.innerHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                            <span style="font-weight:800; color:#38bdf8; font-size:1rem;">🔓 "${wItem.word}"</span>
                            <button type="button" class="bv-gl-listen" style="background:#2563eb; color:white; border:none; padding:0.25rem 0.6rem; border-radius:6px; cursor:pointer; font-size:0.8rem; font-weight:700;">🔊 Lyt</button>
                        </div>
                        <div style="background:rgba(56,189,248,0.14); border-left:3px solid #38bdf8; padding:0.45rem 0.65rem; border-radius:6px; color:white; font-weight:800; font-size:0.95rem;">
                            🌍 ${transStr}
                        </div>
                        <div style="font-size:0.84rem; color:#cbd5e1; line-height:1.4;">
                            📖 <strong>Dansk:</strong> ${wItem.da}
                        </div>
                    `;
                    card.querySelector('.bv-gl-listen').onclick = (e) => {
                        e.stopPropagation();
                        speakDanish(wItem.word);
                    };
                }

                gridEl.appendChild(card);
            });
        }

        renderGlossarySection();

        updateDialogUI(false);
        dialogCard.appendChild(slotsWrap);
        dialogCard.appendChild(bankTitle);
        dialogCard.appendChild(bankWrap);
        dialogCard.appendChild(feedbackWrap);
        dialogCard.appendChild(glossarySection);
    }

    renderDialogueOrderingTask();
    dialogPanel.appendChild(dialogCard);
    panelsHolder.appendChild(dialogPanel);

    // ========================================================
    // --- TAB 7: SIG DET HØJT – DINE FØRSTE 3 MÅNEDER (BETONING & UDTALEFEEDBACK)
    // ========================================================
    const udtalePanel = document.createElement('div');
    udtalePanel.className = `bv-panel ${currentTab === 'tab_udtale' ? 'active' : ''}`;
    udtalePanel.dataset.panel = 'tab_udtale';

    // De 4 regler for dansk betoning (tryk)
    const STRESS_RULES_META = {
        ny_info: {
            label: '🟢 Ny information',
            short: 'Ny info',
            color: '#4ade80',
            borderColor: '#22c55e',
            bg: 'rgba(34, 197, 94, 0.16)',
            desc: 'Vigtige navneord og kerneord, som giver ny viden (f.eks. mester, bremserne, olie, nøglen).'
        },
        tal: {
            label: '🔢 Tal',
            short: 'Tal',
            color: '#fbbf24',
            borderColor: '#f59e0b',
            bg: 'rgba(245, 158, 11, 0.16)',
            desc: 'Antal, liter, minutter og hal-numre (f.eks. én, to, fire).'
        },
        beskrivende: {
            label: '🟠 Beskrivende ord',
            short: 'Beskrivende ord',
            color: '#fb923c',
            borderColor: '#f97316',
            bg: 'rgba(249, 115, 22, 0.16)',
            desc: 'Adjektiver og mådes-/holdningsadverbier, der beskriver tilstand eller måde (f.eks. slidte, fladt, forsigtigt, grundigt, køreklar).'
        },
        raekkefoelge: {
            label: '🔵 Rækkefølgeord',
            short: 'Rækkefølgeord',
            color: '#38bdf8',
            borderColor: '#0284c7',
            bg: 'rgba(56, 189, 248, 0.16)',
            desc: 'Ord der styrer rækkefølgen i arbejdet (f.eks. først, bagefter, til sidst).'
        }
    };

    // 10 automatiserede hverdagsfraser til de første 3 måneder på værkstedet
    const WORKPLACE_SPEECH_ITEMS = [
        {
            id: 'sp_1',
            category: '🗣️ Til en kunde på gulvet',
            situation: 'En kunde kommer ind på værkstedet og spørger om pris og tid på en svær reparation.',
            speakerLabel: 'En kunde siger:',
            speakerQuote: 'Undskyld, hvad koster det at få lavet min udstødning, og hvornår er bilen klar?',
            correctText: 'Det kigger vi på – lige to minutter, jeg henter mester.',
            options: [
                'Det kigger vi på – lige to minutter, jeg henter mester.',
                'Din forrude er desværre revnet og kan ikke lappes.',
                'Jeg arbejder slet ikke med biler på dette værksted.'
            ],
            tokens: [
                { word: 'Det' },
                { word: 'kigger', stress: 'ny_info' },
                { word: 'vi' },
                { word: 'på' },
                { word: '–' },
                { word: 'lige' },
                { word: 'to', stress: 'tal', altMatch: ['2', 'to'] },
                { word: 'minutter,', stress: 'ny_info' },
                { word: 'jeg' },
                { word: 'henter' },
                { word: 'mester.', stress: 'ny_info' }
            ],
            whyTip: 'Som ny medarbejder skal du ikke gætte på priser. Chefen bliver glad, når du tager venligt imod kunden og henter mester.',
            translations: {
                en: 'We will look at that – just two minutes, I will get the master mechanic.',
                de: 'Das schauen wir uns an – nur zwei Minuten, ich hole den Meister.',
                es: 'Lo miraremos – solo dos minutos, voy a buscar al jefe de taller.',
                pt: 'Vamos dar uma olhada – só dois minutos, vou chamar o mestre.',
                tr: 'Buna bakacağız – sadece iki dakika, ustayı çağırıyorum.',
                ar: 'سنلقي نظرة على ذلك – دقيقتين فقط، سأحضر رئيس الورشة (المعلّم).',
                fa: 'نگاهی به آن می‌اندازیم – فقط دو دقیقه، الان اوستا (رئیس) را صدا می‌زنم.',
                ku: 'Em ê lê binêrin – tenê du deqe, ez ê hosteyî gazî bikim.',
                ur: 'ہم اسے دیکھتے ہیں – بس دو منٹ، میں استاد (ماسٹر) کو بلاتا ہوں۔',
                ru: 'Мы это посмотрим – буквально две минуты, я позову мастера.',
                uk: 'Ми це подивимося – буквально дві хвилини, я покличу майстра.',
                zh: '我们来看看——请等两分钟，我去叫师傅（车间主任）。',
                vi: 'Chúng tôi sẽ xem xét – chỉ hai phút thôi, tôi đi gọi quản đốc.',
                th: 'เดี๋ยวเราดูให้ครับ – รอสองนาทีนะ เดี๋ยวผมไปตามหัวหน้าช่างมาให้',
                ne: 'हामी यो हेर्छौं – खाली दुई मिनेट, म मुख्य मिस्त्रीलाई बोलाउँछु।',
                ps: 'موږ به ورته وګورو – یوازې دوه دقیقې، زه استاد راغواړم.'
            }
        },
        {
            id: 'sp_2',
            category: '🗣️ Til en kunde (fra Historie 1)',
            situation: 'En kunde kommer ind mandag morgen med et punkteret bagdæk.',
            speakerLabel: 'En kunde siger:',
            speakerQuote: 'Mit ene bagdæk er næsten helt fladt! Hvor skal jeg køre bilen hen?',
            correctText: 'Kør bare bilen forsigtigt ind i hal to.',
            options: [
                'Kør bare bilen forsigtigt ind i hal to.',
                'Du skal selv påfylde fire liter motorolie først.',
                'Batteriet er desværre helt fladt i dag.'
            ],
            tokens: [
                { word: 'Kør' },
                { word: 'bare' },
                { word: 'bilen', stress: 'ny_info' },
                { word: 'forsigtigt', stress: 'beskrivende' },
                { word: 'ind' },
                { word: 'i' },
                { word: 'hal' },
                { word: 'to.', stress: 'tal', altMatch: ['2', 'to'] }
            ],
            whyTip: 'Kort og tydelig vejledning til kunden med betoning på genstanden (bilen), måden (forsigtigt) og tallet (to).',
            translations: {
                en: 'Just drive the car carefully into hall two.',
                de: 'Fahren Sie das Auto einfach vorsichtig in Halle zwei.',
                es: 'Simplemente conduzca el coche con cuidado hacia la nave dos.',
                pt: 'Basta dirigir o carro com cuidado para o galpão dois.',
                tr: 'Arabayı dikkatlice iki numaralı salona sürün.',
                ar: 'فقط قُد السيارة بحذر إلى الصالة رقم اثنين.',
                fa: 'فقط ماشین را با احتیاط به داخل سالن دو برانید.',
                ku: 'Tenê erebeyê bi baldarî bajo hundirê salona diduyan.',
                ur: 'بس گاڑی کو احتیاط سے ہال نمبر دو میں لے آئیں۔',
                ru: 'Просто осторожно загоняйте машину во второй бокс (зал два).',
                uk: 'Просто обережно заганяйте машину в другий бокс (зал два).',
                zh: '请小心地把车开进二号车间。',
                vi: 'Cứ lái xe cẩn thận vào xưởng số hai.',
                th: 'ขับรถเข้ามาในโรงซ่อมที่สองอย่างระมัดระวังได้เลยครับ',
                ne: 'गाडीलाई सावधानीपूर्वक हल नम्बर दुईमा लैजानुहोस्।',
                ps: 'یوازې موټر په احتیاط سره دوهم تالار ته ننباسئ.'
            }
        },
        {
            id: 'sp_3',
            category: '🤝 Til mester (fra Historie 1)',
            situation: 'Din mester giver dig dagens første opgave med Jonas’ bil.',
            speakerLabel: 'Din mester siger:',
            speakerQuote: 'Jonas’ bil står klar derovre. Går du i gang med hjulskiftet nu?',
            correctText: 'Modtaget – først skifter jeg de fire vinterdæk.',
            options: [
                'Modtaget – først skifter jeg de fire vinterdæk.',
                'Nej, regningen stemmer ikke med pristilbuddet.',
                'Forruden har fået et stort stenslag på motorvejen.'
            ],
            tokens: [
                { word: 'Modtaget', stress: 'ny_info' },
                { word: '–' },
                { word: 'først', stress: 'raekkefoelge' },
                { word: 'skifter' },
                { word: 'jeg' },
                { word: 'de' },
                { word: 'fire', stress: 'tal', altMatch: ['4', 'fire'] },
                { word: 'vinterdæk.', stress: 'ny_info' }
            ],
            whyTip: '"Modtaget" viser straks din chef, at du har forstået opgaven, og "først" + "fire vinterdæk" bekræfter præcis, hvad du gør.',
            translations: {
                en: 'Copy that / Understood – first I will change the four winter tires.',
                de: 'Verstanden – zuerst wechsle ich die vier Winterreifen.',
                es: 'Recibido – primero cambio los cuatro neumáticos de invierno.',
                pt: 'Entendido – primeiro vou trocar os quatro pneus de inverno.',
                tr: 'Anlaşıldı – önce dört kış lastiğini değiştiriyorum.',
                ar: 'عُلِم – أولاً سأقوم بتبديل الإطارات الشتوية الأربعة.',
                fa: 'دریافت شد (چشم) – اول چهار لاستیک زمستانی را عوض می‌کنم.',
                ku: 'Fêhm kir – pêşî ez her çar tekerên zivistanê diguherînim.',
                ur: 'سمجھ گیا – سب سے پہلے میں چاروں ونٹر ٹائر بدلتا ہوں۔',
                ru: 'Принято – сначала я поменяю четыре зимние шины.',
                uk: 'Прийнято – спочатку я заміню чотири зимові шини.',
                zh: '收到——首先我来更换那四条冬季轮胎。',
                vi: 'Đã rõ – trước tiên tôi sẽ thay bốn lốp mùa đông.',
                th: 'รับทราบครับ – อย่างแรกผมจะเปลี่ยนยางฤดูหนาวทั้งสี่เส้นก่อน',
                ne: 'बुझें – पहिले म चारवटा जाडोयामका टायरहरू फेर्छु।',
                ps: 'پوه شوم – لومړی زه څلور واړه ژمني ټایرونه بدلوم.'
            }
        },
        {
            id: 'sp_4',
            category: '🤝 Til en kollega (Bed om hjælp)',
            situation: 'En tung del driller, og du har brug for en kollegas hjælp et kort øjeblik.',
            speakerLabel: 'Situation på værkstedet:',
            speakerQuote: 'Du står ved autoliften og har brug for en ekstra hånd fra din kollega.',
            correctText: 'Undskyld, kan du lige hjælpe mig i to minutter?',
            options: [
                'Undskyld, kan du lige hjælpe mig i to minutter?',
                'Bilen er allerede synet og køreklar.',
                'Kunden betaler regningen ved kassen.'
            ],
            tokens: [
                { word: 'Undskyld,' },
                { word: 'kan' },
                { word: 'du' },
                { word: 'lige' },
                { word: 'hjælpe', stress: 'ny_info' },
                { word: 'mig' },
                { word: 'i' },
                { word: 'to', stress: 'tal', altMatch: ['2', 'to'] },
                { word: 'minutter?', stress: 'ny_info' }
            ],
            whyTip: 'En af de vigtigste sætninger de første 3 måneder: sig til i god tid, når du har brug for hjælp!',
            translations: {
                en: 'Excuse me, can you just help me for two minutes?',
                de: 'Entschuldigung, kannst du mir kurz zwei Minuten helfen?',
                es: 'Disculpa, ¿puedes ayudarme dos minutos?',
                pt: 'Com licença, pode me ajudar por dois minutos?',
                tr: 'Affedersin, bana iki dakika yardım edebilir misin?',
                ar: 'عفواً، هل يمكنك مساعدتي لمدة دقيقتين؟',
                fa: 'ببخشید، می‌توانی دو دقیقه به من کمک کنی؟',
                ku: 'Bibore, tu dikarî du deqeyan alîkariya min bikî?',
                ur: 'معاف کیجیے، کیا آپ دو منٹ کے لیے میری مدد کر سکتے ہیں؟',
                ru: 'Извини, можешь помочь мне буквально на две минуты?',
                uk: 'Вибач, можеш допомогти мені буквально на дві хвилини?',
                zh: '打扰一下，你能帮我两分钟吗？',
                vi: 'Xin lỗi, bạn có thể giúp tôi hai phút được không?',
                th: 'ขอโทษนะครับ ช่วยผมสักสองนาทีได้ไหมครับ?',
                ne: 'माफ गर्नुहोस्, के तपाईं मलाई दुई मिनेट मद्दत गर्न सक्नुहुन्छ?',
                ps: 'بښنه غواړم، آیا کولی شئ دوه دقیقې زما سره مرسته وکړئ؟'
            }
        },
        {
            id: 'sp_5',
            category: '🤝 Til mester (fra Historie 3)',
            situation: 'Du har løftet Marias bil op på autoliften for at tjekke den før bilsyn.',
            speakerLabel: 'Din mester spørger:',
            speakerQuote: 'Hvordan ser bremserne ud under Marias bil?',
            correctText: 'De forreste bremser er meget slidte.',
            options: [
                'De forreste bremser er meget slidte.',
                'Motoren mangler fire nye vinterdæk.',
                'Skruenøglen ligger i værktøjskassen.'
            ],
            tokens: [
                { word: 'De' },
                { word: 'forreste', stress: 'beskrivende' },
                { word: 'bremser', stress: 'ny_info' },
                { word: 'er' },
                { word: 'meget' },
                { word: 'slidte.', stress: 'beskrivende' }
            ],
            whyTip: 'Kort, præcis fejlmelding: du fortæller præcis hvilke dele (forreste bremser) og hvordan deres tilstand er (slidte).',
            translations: {
                en: 'The front brakes are very worn.',
                de: 'Die vorderen Bremsen sind sehr abgenutzt.',
                es: 'Los frenos delanteros están muy desgastados.',
                pt: 'Os freios dianteiros estão muito gastos.',
                tr: 'Ön frenler çok aşınmış.',
                ar: 'الفرامل الأمامية متآكلة جداً.',
                fa: 'ترمزهای جلو خیلی فرسوده (ساییده) هستند.',
                ku: 'Frenên pêşiyê gelekî mehîyayî ne.',
                ur: 'اگلے بریک بہت زیادہ گھسے ہوئے ہیں۔',
                ru: 'Передние тормоза сильно изношены.',
                uk: 'Передні гальма сильно зношені.',
                zh: '前刹车片磨损得很厉害。',
                vi: 'Phanh trước đã bị mòn rất nhiều.',
                th: 'เบรกคู่หน้าสึกหรอมากแล้วครับ',
                ne: 'अगाडिका ब्रेकहरू धेरै खिइएका छन्।',
                ps: 'مخکیني بریکونه ډېر سولېدلي دي.'
            }
        },
        {
            id: 'sp_6',
            category: '🤝 Til mester (fra Historie 4)',
            situation: 'En kold morgen vil Peters bil ikke starte ude på pladsen.',
            speakerLabel: 'Din mester spørger:',
            speakerQuote: 'Hvad er der galt med Peters bil, siden den ikke vil starte?',
            correctText: 'Batteriet er helt fladt, så jeg sætter et nyt batteri i.',
            options: [
                'Batteriet er helt fladt, så jeg sætter et nyt batteri i.',
                'Jeg vasker forruden hurtigt med sprinklervæske.',
                'Donkraften står ovre i hal to.'
            ],
            tokens: [
                { word: 'Batteriet', stress: 'ny_info' },
                { word: 'er' },
                { word: 'helt' },
                { word: 'fladt,', stress: 'beskrivende' },
                { word: 'så' },
                { word: 'jeg' },
                { word: 'sætter' },
                { word: 'et' },
                { word: 'nyt', stress: 'beskrivende' },
                { word: 'batteri', stress: 'ny_info' },
                { word: 'i.' }
            ],
            whyTip: 'Her bruger du de faste værkstedsudtryk "et fladt batteri" og "sætter et nyt batteri i".',
            translations: {
                en: 'The battery is completely flat, so I am putting a new battery in.',
                de: 'Die Batterie ist komplett leer, also baue ich eine neue Batterie ein.',
                es: 'La batería está completamente descargada, así que le pongo una batería nueva.',
                pt: 'A bateria está totalmente sem carga, então vou colocar uma bateria nova.',
                tr: 'Akü tamamen bitmiş, bu yüzden yeni bir akü takıyorum.',
                ar: 'البطارية فارغة تماماً، لذا سأركب بطارية جديدة.',
                fa: 'باتری کاملاً خوابیده است، بنابراین یک باتری نو می‌گذارم.',
                ku: 'Baterî bi temamî vala ye, lewma ez bateriyeke nû dixinê.',
                ur: 'بیٹری بالکل ختم ہے، اس لیے میں نئی بیٹری لگا رہا ہوں۔',
                ru: 'Аккумулятор полностью разряжен, поэтому я ставлю новый аккумулятор.',
                uk: 'Акумулятор повністю розряджений, тому я ставлю новий акумулятор.',
                zh: '电瓶完全没电了，所以我正在换一个新电瓶。',
                vi: 'Ắc quy đã hết sạch điện nên tôi đang lắp một bình ắc quy mới.',
                th: 'แบตเตอรี่ไฟหมดเกลี้ยงเลยครับ ผมเลยกำลังใส่แบตเตอรี่ลูกใหม่เข้าไป',
                ne: 'ब्याट्रीको चार्ज पूरै सकिएको छ, त्यसैले म नयाँ ब्याट्री हाल्दैछु।',
                ps: 'بطرۍ بالکل خالي ده، نو ځکه زه نوې بطرۍ پکې تړم.'
            }
        },
        {
            id: 'sp_7',
            category: '🤝 Til mester (fra Historie 2 & Dialog 4)',
            situation: 'Mester spørger, hvor langt du er nået med servicet på bilen.',
            speakerLabel: 'Din mester spørger:',
            speakerQuote: 'Hvordan går det med olieskiftet og tjekket af den sorte bil?',
            correctText: 'Først fyldte jeg fire liter olie på, og bagefter tjekker jeg forruden.',
            options: [
                'Først fyldte jeg fire liter olie på, og bagefter tjekker jeg forruden.',
                'Bilen har desværre fået et fladt bagdæk på motorvejen.',
                'Kunden har glemt sin bilnøgle derhjemme.'
            ],
            tokens: [
                { word: 'Først', stress: 'raekkefoelge' },
                { word: 'fyldte' },
                { word: 'jeg' },
                { word: 'fire', stress: 'tal', altMatch: ['4', 'fire'] },
                { word: 'liter' },
                { word: 'olie', stress: 'ny_info' },
                { word: 'på,' },
                { word: 'og' },
                { word: 'bagefter', stress: 'raekkefoelge' },
                { word: 'tjekker' },
                { word: 'jeg' },
                { word: 'forruden.', stress: 'ny_info' }
            ],
            whyTip: 'Med rækkefølgeordene "Først" og "bagefter" giver du et super klart overblik over dit arbejde.',
            translations: {
                en: 'First I topped up four liters of oil, and afterwards I will check the windshield.',
                de: 'Zuerst habe ich vier Liter Öl nachgefüllt, und danach prüfe ich die Frontscheibe.',
                es: 'Primero rellené cuatro litros de aceite y después reviso el parabrisas.',
                pt: 'Primeiro coloquei quatro litros de óleo e depois vou verificar o para-brisa.',
                tr: 'Önce dört litre yağ doldurdum, sonra da ön camı kontrol edeceğim.',
                ar: 'أولاً قمت بتعبئة أربعة لترات من الزيت، وبعد ذلك سأفحص الزجاج الأمامي.',
                fa: 'اول چهار لیتر روغن ریختم و بعد شیشه جلو را چک می‌کنم.',
                ku: 'Pêşî min çar lître rûn تێkir, û paşê ez ê cama pêşiyê kontrol bikim.',
                ur: 'پہلے میں نے چار لیٹر تیل ڈالا، اور اس کے بعد میں اگلا شیشہ چیک کروں گا۔',
                ru: 'Сначала я залил четыре литра масла, а затем проверю лобовое стекло.',
                uk: 'Спочатку я залив чотири літри оливи, а потім перевірю лобове скло.',
                zh: '我先加了四升机油，接下来我检查挡风玻璃。',
                vi: 'Trước tiên tôi đã đổ bốn lít dầu, và sau đó tôi sẽ kiểm tra kính chắn gió.',
                th: 'อย่างแรกผมเติมน้ำมันเครื่องไปสี่ลิตรแล้ว และหลังจากนั้นผมจะตรวจเช็กกระจกหน้ารถครับ',
                ne: 'पहिले मैले चार लिटर तेल भरें, र त्यसपछि म अगाडिको सिसा जाँच गर्छु।',
                ps: 'لومړی مې څلور لیتره تېل واچول، او وروسته به مخکینۍ ښیښه وګورم.'
            }
        },
        {
            id: 'sp_8',
            category: '🤝 Til en kollega (fra Historie 2)',
            situation: 'Du skal bruge værkstedets computer-tester for første gang og vil gerne se, hvordan man gør.',
            speakerLabel: 'Situation på værkstedet:',
            speakerQuote: 'En gul motorlampe lyser, og du er i tvivl om, hvordan testeren sættes til.',
            correctText: 'Vil du lige vise mig testeren én gang?',
            options: [
                'Vil du lige vise mig testeren én gang?',
                'Udstødningen larmer meget under bilen.',
                'Jeg har allerede skiftet alle fire vinterdæk.'
            ],
            tokens: [
                { word: 'Vil' },
                { word: 'du' },
                { word: 'lige' },
                { word: 'vise', stress: 'ny_info' },
                { word: 'mig' },
                { word: 'testeren', stress: 'ny_info' },
                { word: 'én', stress: 'tal', altMatch: ['1', 'en', 'én', 'et'] },
                { word: 'gang?' }
            ],
            whyTip: 'En klog og sikker sætning på en ny arbejdsplads: bed en kollega vise dig maskinen én gang, før du selv prøver.',
            translations: {
                en: 'Will you just show me the diagnostic tester once?',
                de: 'Würdest du mir das Diagnosegerät einmal kurz zeigen?',
                es: '¿Me enseñas el comprobador de diagnóstico una vez?',
                pt: 'Você pode me mostrar o aparelho de teste uma vez?',
                tr: 'Bana test cihazını bir kez gösterir misin?',
                ar: 'هل يمكنك أن تريني جهاز الفحص مرة واحدة؟',
                fa: 'می‌شود دستگاه تستر (دیاگ) را یک بار به من نشان بدهی؟',
                ku: 'Tu dikarî cîhaza testerê carekê nîşanî min bidî?',
                ur: 'کیا آپ مجھے ایک بار ٹیسٹر (کمپیوٹر) دکھا دیں گے؟',
                ru: 'Покажешь мне тестер один раз?',
                uk: 'Покажеш мені тестер один раз?',
                zh: '你能给我演示一下这个检测仪怎么用吗？',
                vi: 'Bạn có thể chỉ cho tôi cách dùng máy chẩn đoán một lần được không?',
                th: 'ช่วยสาธิตวิธีใช้เครื่องตรวจเช็กให้ผมดูสักครั้งได้ไหมครับ?',
                ne: 'के तपाईं मलाई यो टेस्टर एक पटक देखाउन सक्नुहुन्छ?',
                ps: 'آیا کولی شئ ماته یو ځل د معاینې ماشین (ټیسټر) وښایاست؟'
            }
        },
        {
            id: 'sp_9',
            category: '🤝 Til mester (fra Historie 1)',
            situation: 'Du er færdig med hjulskiftet, og mester tjekker sikkerheden.',
            speakerLabel: 'Din mester spørger:',
            speakerQuote: 'Huskede du at spænde hjulboltene efter med skruenøglen?',
            correctText: 'Ja, til sidst spændte jeg alle fire hjul grundigt.',
            options: [
                'Ja, til sidst spændte jeg alle fire hjul grundigt.',
                'Nej, batteriet var desværre helt fladt.',
                'Pristilbuddet ligger inde på kontoret.'
            ],
            tokens: [
                { word: 'Ja,' },
                { word: 'til' },
                { word: 'sidst', stress: 'raekkefoelge' },
                { word: 'spændte' },
                { word: 'jeg' },
                { word: 'alle' },
                { word: 'fire', stress: 'tal', altMatch: ['4', 'fire'] },
                { word: 'hjul', stress: 'ny_info' },
                { word: 'grundigt.', stress: 'beskrivende' }
            ],
            whyTip: 'Her rammer du alle 4 betoningsregler: rækkefølge (til sidst), tal (fire), ny info (hjul) og beskrivende ord (grundigt)!',
            translations: {
                en: 'Yes, finally I tightened all four wheels thoroughly.',
                de: 'Ja, zum Schluss habe ich alle vier Räder gründlich festgezogen.',
                es: 'Sí, al final apreté las cuatro ruedas a fondo.',
                pt: 'Sim, por fim apertei muito bem todas as quatro rodas.',
                tr: 'Evet, son olarak dört tekerleğin hepsini iyice sıktım.',
                ar: 'نعم، في النهاية قمت بشد جميع العجلات الأربع بإحكام.',
                fa: 'بله، در آخر هر چهار چرخ را کاملاً محکم بستم.',
                ku: 'Erê, di dawiyê de min her çar teker bi باشî şidandin.',
                ur: 'جی ہاں، آخر میں میں نے چاروں پہیے اچھی طرح کس دیے۔',
                ru: 'Да, в конце я тщательно затянул все четыре колеса.',
                uk: 'Так, насамкінець я ретельно затягнув усі чотири колеса.',
                zh: '是的，最后我把四个车轮都彻底拧紧了。',
                vi: 'Vâng, cuối cùng tôi đã siết chặt cả bốn bánh xe một cách kỹ lưỡng.',
                th: 'ครับ สุดท้ายผมขันล้อทั้งสี่ล้อให้แน่นอย่างละเอียดเรียบร้อยแล้วครับ',
                ne: 'हजुर, अन्त्यमा मैले चारवटै पाङ्ग्राहरू राम्रोसँग कसें।',
                ps: 'هو، په پای کې مې څلور واړه ټایرونه په بشپړ غور سره کلک کړل.'
            }
        },
        {
            id: 'sp_10',
            category: '🤝 Til mester / kunde (fra Historie 4)',
            situation: 'Peters bil er færdiglavet og klar til at blive hentet.',
            speakerLabel: 'Din mester spørger:',
            speakerQuote: 'Er Peters bil færdig, så han kan få den med hjem nu?',
            correctText: 'Ja, bilen er heldigvis helt køreklar nu – her er nøglen.',
            options: [
                'Ja, bilen er heldigvis helt køreklar nu – her er nøglen.',
                'Først løfter jeg bilen op på autoliften.',
                'Der sidder en stor skrue midt i dækket.'
            ],
            tokens: [
                { word: 'Ja,' },
                { word: 'bilen', stress: 'ny_info' },
                { word: 'er' },
                { word: 'heldigvis', stress: 'beskrivende' },
                { word: 'helt' },
                { word: 'køreklar', stress: 'beskrivende' },
                { word: 'nu' },
                { word: '–' },
                { word: 'her' },
                { word: 'er' },
                { word: 'nøglen.', stress: 'ny_info' }
            ],
            whyTip: 'En perfekt afslutningsfrase når du afleverer nøglen til mester eller kunden.',
            translations: {
                en: 'Yes, fortunately the car is completely ready to drive now – here is the key.',
                de: 'Ja, das Auto ist zum Glück jetzt komplett fahrbereit – hier ist der Schlüssel.',
                es: 'Sí, afortunadamente el coche ya está listo para conducir – aquí está la llave.',
                pt: 'Sim, felizmente o carro já está totalmente pronto para rodar – aqui está a chave.',
                tr: 'Evet, neyse ki araba şimdi tamamen sürüşe hazır – işte anahtar.',
                ar: 'نعم، لحسن الحظ السيارة جاهزة تماماً للقيادة الآن – تفضل المفتاح.',
                fa: 'بله، خوشبختانه ماشین الان کاملاً آماده حرکت است – بفرمایید کلید.',
                ku: 'Erê, bi xêrê erebe niha bi temamî amade ye ji bo ajotinê – kerem bike kilît.',
                ur: 'جی ہاں، خوش قسمتی سے گاڑی اب چلنے کے لیے بالکل تیار ہے – یہ رہی چابی۔',
                ru: 'Да, к счастью, машина уже полностью готова к поездке – вот ключ.',
                uk: 'Так, на щастя, машина вже повністю готова до поїздки – ось ключ.',
                zh: '是的，幸好车子现在完全修好可以上路了——这是车钥匙。',
                vi: 'Vâng, may mắn là xe hiện đã hoàn toàn sẵn sàng lăn bánh – chìa khóa đây ạ.',
                th: 'ครับ โชคดีที่ตอนนี้รถพร้อมใช้งานเรียบร้อยแล้ว – นี่กุญแจรถครับ',
                ne: 'हजुर, धन्न गाडी अब चलाउनका लागि पूर्ण रूपमा तयार छ – यी लिनुहोस् साँचो।',
                ps: 'هو، له نېکه مرغه موټر اوس د چلولو لپاره بالکل چمتو دی – دا دی کیلي.'
            }
        }
    ];

    function speakDanishWithRate(text, rate = 0.9) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'da-DK';
        u.rate = rate;
        window.speechSynthesis.speak(u);
    }

    let currSpeechIdx = 0;
    let speechStepAnswered = false;
    const udtaleCard = document.createElement('div');
    udtaleCard.style.cssText = 'max-width:920px; margin:0 auto; background:rgba(30,41,59,0.72); border:1px solid rgba(255,255,255,0.12); border-radius:20px; padding:1.8rem; box-shadow:0 12px 30px rgba(0,0,0,0.35);';

    function renderWorkplaceSpeechTask() {
        udtaleCard.innerHTML = '';
        const item = WORKPLACE_SPEECH_ITEMS[currSpeechIdx];
        let transLang = getPreferredTransLang();

        // Top Rule Banner: De 4 regler for dansk betoning
        const rulesBox = document.createElement('div');
        rulesBox.style.cssText = 'background:rgba(15,23,42,0.92); border:1.5px solid rgba(56,189,248,0.35); border-radius:16px; padding:1.1rem 1.25rem; margin-bottom:1.4rem;';
        rulesBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
                <div style="font-weight:800; font-size:1.05rem; color:#38bdf8;">
                    🎯 Regler for dansk betoning (tryk) – Dine første 3 måneder på værkstedet
                </div>
                <span style="font-size:0.8rem; color:#94a3b8;">Ord med <u style="text-decoration-thickness:2px; text-underline-offset:3px; color:white;">understregning</u> skal siges med ekstra tryk!</span>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(195px, 1fr)); gap:0.65rem;">
                ${Object.values(STRESS_RULES_META).map(r => `
                    <div style="background:${r.bg}; border-left:4px solid ${r.borderColor}; padding:0.55rem 0.75rem; border-radius:10px;">
                        <div style="font-weight:800; font-size:0.88rem; color:${r.color}; margin-bottom:0.2rem;">${r.label}</div>
                        <div style="font-size:0.78rem; color:#cbd5e1; line-height:1.35;">${r.desc}</div>
                    </div>
                `).join('')}
            </div>
        `;
        udtaleCard.appendChild(rulesBox);

        // Progress pills (1 to 10)
        const navPills = document.createElement('div');
        navPills.style.cssText = 'display:flex; gap:0.4rem; flex-wrap:wrap; justify-content:center; margin-bottom:1.3rem;';
        WORKPLACE_SPEECH_ITEMS.forEach((sp, idx) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.style.cssText = `padding:0.4rem 0.8rem; border-radius:16px; font-weight:800; font-size:0.82rem; cursor:pointer; border:1.5px solid ${idx === currSpeechIdx ? '#38bdf8' : '#475569'}; background:${idx === currSpeechIdx ? '#0284c7' : '#1e293b'}; color:white;`;
            b.textContent = `${idx + 1}`;
            b.title = sp.category;
            b.onclick = () => {
                currSpeechIdx = idx;
                speechStepAnswered = false;
                renderWorkplaceSpeechTask();
            };
            navPills.appendChild(b);
        });
        udtaleCard.appendChild(navPills);

        // Situation & Prompt Card
        const sitBox = document.createElement('div');
        sitBox.style.cssText = 'background:#0f172a; border-left:4px solid #f59e0b; border-radius:14px; padding:1.25rem; margin-bottom:1.3rem;';
        sitBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem;">
                <span style="background:rgba(245,158,11,0.18); color:#fbbf24; border:1px solid rgba(245,158,11,0.4); padding:0.25rem 0.75rem; border-radius:20px; font-size:0.8rem; font-weight:800;">
                    Situation ${currSpeechIdx + 1} / ${WORKPLACE_SPEECH_ITEMS.length} • ${item.category}
                </span>
                <button type="button" id="bv-sp-listen-prompt" style="background:#1e293b; color:#38bdf8; border:1px solid #0284c7; padding:0.35rem 0.85rem; border-radius:16px; font-weight:700; font-size:0.82rem; cursor:pointer;">
                    🔊 Lyt til replikken
                </button>
            </div>
            <p style="margin:0 0 0.6rem; color:#94a3b8; font-size:0.94rem;"><strong>📍 Situation:</strong> ${item.situation}</p>
            <div style="background:#1e293b; border-radius:12px; padding:0.9rem 1.1rem; border:1px solid rgba(255,255,255,0.08);">
                <div style="font-size:0.8rem; font-weight:800; color:#38bdf8; text-transform:uppercase; margin-bottom:0.25rem;">${item.speakerLabel}</div>
                <div style="font-size:1.2rem; font-weight:700; color:white;">"${item.speakerQuote}"</div>
            </div>
        `;
        sitBox.querySelector('#bv-sp-listen-prompt').onclick = () => speakDanishWithRate(item.speakerQuote, 0.92);
        udtaleCard.appendChild(sitBox);

        // Step 1: Hvad siger du? (3 valgmuligheder)
        const step1Box = document.createElement('div');
        step1Box.style.cssText = 'margin-bottom:1.4rem;';
        step1Box.innerHTML = `<h3 style="margin:0 0 0.75rem; font-size:1.15rem; color:white;">1️⃣ Hvad siger du? (Vælg den rigtige sætning):</h3>`;

        const optsList = document.createElement('div');
        optsList.style.cssText = 'display:flex; flex-direction:column; gap:0.65rem;';
        const step1Feedback = document.createElement('div');
        step1Feedback.style.cssText = 'margin-top:0.75rem; font-weight:700;';

        // Step 2 container (Pronunciation & Stress trainer – shown once correct option is picked)
        const step2Box = document.createElement('div');
        step2Box.style.display = speechStepAnswered ? 'block' : 'none';

        const shuffledOpts = shuffleArray([...item.options]);
        shuffledOpts.forEach(optText => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const isCorrect = optText === item.correctText;
            btn.style.cssText = `text-align:left; background:${speechStepAnswered && isCorrect ? 'rgba(34,197,94,0.22)' : '#1e293b'}; border:2px solid ${speechStepAnswered && isCorrect ? '#22c55e' : '#475569'}; color:white; padding:0.95rem 1.2rem; border-radius:12px; font-size:1.05rem; font-weight:700; cursor:pointer; transition:all 0.2s;`;
            btn.textContent = `"${optText}"`;

            btn.onclick = () => {
                if (isCorrect) {
                    speechStepAnswered = true;
                    Array.from(optsList.children).forEach(c => {
                        c.style.opacity = '0.55';
                    });
                    btn.style.opacity = '1';
                    btn.style.background = 'rgba(34, 197, 94, 0.22)';
                    btn.style.borderColor = '#22c55e';
                    btn.style.color = '#4ade80';
                    step1Feedback.innerHTML = `<span style="color:#4ade80;">✓ Helt rigtigt! 💡 ${item.whyTip}</span>`;
                    step2Box.style.display = 'block';
                    speakDanishWithRate(item.correctText, 0.9);
                    step2Box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    btn.style.background = 'rgba(239, 68, 68, 0.22)';
                    btn.style.borderColor = '#ef4444';
                    btn.style.color = '#f87171';
                    step1Feedback.innerHTML = `<span style="color:#f87171;">✗ Den sætning passer ikke til situationen – prøv en anden!</span>`;
                }
            };
            optsList.appendChild(btn);
        });

        step1Box.appendChild(optsList);
        step1Box.appendChild(step1Feedback);
        udtaleCard.appendChild(step1Box);

        // Build Step 2: Underlined stressed words + Translation + Speech Recognition Feedback
        const tokensHtml = item.tokens.map((t, tIdx) => {
            if (!t.stress) {
                return `<span class="bv-sp-token" data-tidx="${tIdx}" style="display:inline-flex; flex-direction:column; align-items:center; margin:0 0.22rem; padding:0.2rem 0.15rem; font-size:1.45rem; font-weight:600; color:#cbd5e1;">
                    <span>${t.word}</span>
                    <span style="font-size:0.68rem; color:transparent; user-select:none; margin-top:0.25rem;">•</span>
                </span>`;
            }
            const rMeta = STRESS_RULES_META[t.stress];
            return `<span class="bv-sp-token bv-sp-stressed" data-tidx="${tIdx}" style="display:inline-flex; flex-direction:column; align-items:center; margin:0 0.28rem; padding:0.2rem 0.3rem; background:${rMeta.bg}; border-radius:10px;">
                <span style="font-size:1.52rem; font-weight:900; color:white; border-bottom:4px solid ${rMeta.borderColor}; padding-bottom:2px;">
                    ${t.word}
                </span>
                <span style="font-size:0.7rem; font-weight:800; color:${rMeta.color}; margin-top:0.3rem; white-space:nowrap;">
                    ${rMeta.short}
                </span>
            </span>`;
        }).join(' ');

        step2Box.innerHTML = `
            <div style="background:#0f172a; border:2px solid #38bdf8; border-radius:18px; padding:1.5rem; margin-top:1rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.9rem;">
                    <h3 style="margin:0; font-size:1.18rem; color:#38bdf8;">
                        2️⃣ Sig sætningen højt – læg ekstra tryk på de <u>understregede</u> ord:
                    </h3>
                    <div style="display:flex; align-items:center; gap:0.4rem;">
                        <span style="font-size:0.8rem; color:#94a3b8; font-weight:700;">🌍 Oversættelse:</span>
                        <select id="bv-sp-trans-lang" style="background:#1e293b; color:white; border:1px solid #38bdf8; border-radius:8px; padding:0.25rem 0.55rem; font-size:0.8rem; font-weight:700; cursor:pointer;">
                            ${SUPPORTED_TRANS_LANGS.map(l => `<option value="${l.code}" ${l.code === transLang ? 'selected' : ''}>${l.label}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <!-- Sætning med understregede betoningsord -->
                <div id="bv-sp-sentence-display" style="background:#1e293b; border-radius:14px; padding:1.35rem 1rem; text-align:center; line-height:2.1; margin-bottom:0.9rem; border:1px solid rgba(255,255,255,0.08);">
                    ${tokensHtml}
                </div>

                <!-- Oversættelse på valgt sprog -->
                <div style="background:rgba(56,189,248,0.1); border-left:3px solid #38bdf8; padding:0.6rem 0.95rem; border-radius:8px; margin-bottom:1.2rem; color:#e2e8f0; font-size:0.96rem;">
                    🌍 <strong id="bv-sp-trans-out">${item.translations[transLang] || item.translations.en}</strong>
                </div>

                <!-- Knapper til lytning og indtaling (Udtalefeedback) -->
                <div style="display:flex; justify-content:center; gap:0.75rem; flex-wrap:wrap; margin-bottom:1.1rem;">
                    <button type="button" id="bv-sp-listen-normal" style="background:#2563eb; color:white; border:none; padding:0.75rem 1.25rem; border-radius:12px; font-weight:800; font-size:0.95rem; cursor:pointer;">
                        🔊 Lyt i naturligt tempo
                    </button>
                    <button type="button" id="bv-sp-listen-slow" style="background:#1e293b; color:#38bdf8; border:1.5px solid #0284c7; padding:0.75rem 1.25rem; border-radius:12px; font-weight:800; font-size:0.95rem; cursor:pointer;">
                        🐢 Lyt langsomt (hør betoningen)
                    </button>
                    <button type="button" id="bv-sp-record-btn" style="background:linear-gradient(135deg, #ef4444, #dc2626); color:white; border:none; padding:0.75rem 1.4rem; border-radius:12px; font-weight:800; font-size:0.98rem; cursor:pointer; box-shadow:0 4px 15px rgba(239,68,68,0.35);">
                        🎙️ Indtal sætningen (Udtalefeedback)
                    </button>
                </div>

                <!-- Udtalefeedback resultat-boks -->
                <div id="bv-sp-speech-feedback" style="min-height:48px; text-align:center;"></div>

                <!-- Navigation til næste opgave -->
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.2rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.08);">
                    <button type="button" id="bv-sp-prev" style="background:#334155; color:white; border:none; padding:0.6rem 1.1rem; border-radius:10px; font-weight:700; cursor:pointer;">
                        ← Forrige
                    </button>
                    <button type="button" id="bv-sp-next" style="background:#22c55e; color:#0f172a; border:none; padding:0.65rem 1.35rem; border-radius:10px; font-weight:800; cursor:pointer;">
                        ${currSpeechIdx < WORKPLACE_SPEECH_ITEMS.length - 1 ? 'Næste situation ➔' : 'Start forfra (Situation 1) 🔄'}
                    </button>
                </div>
            </div>
        `;

        step2Box.querySelector('#bv-sp-trans-lang').onchange = (e) => {
            transLang = e.target.value;
            setPreferredTransLang(transLang);
            step2Box.querySelector('#bv-sp-trans-out').textContent = item.translations[transLang] || item.translations.en;
        };

        step2Box.querySelector('#bv-sp-listen-normal').onclick = () => speakDanishWithRate(item.correctText, 0.92);
        step2Box.querySelector('#bv-sp-listen-slow').onclick = () => speakDanishWithRate(item.correctText, 0.68);

        step2Box.querySelector('#bv-sp-prev').onclick = () => {
            currSpeechIdx = (currSpeechIdx - 1 + WORKPLACE_SPEECH_ITEMS.length) % WORKPLACE_SPEECH_ITEMS.length;
            speechStepAnswered = false;
            renderWorkplaceSpeechTask();
        };
        step2Box.querySelector('#bv-sp-next').onclick = () => {
            currSpeechIdx = (currSpeechIdx + 1) % WORKPLACE_SPEECH_ITEMS.length;
            speechStepAnswered = false;
            renderWorkplaceSpeechTask();
        };

        // Speech Recognition (Udtalefeedback)
        const recordBtn = step2Box.querySelector('#bv-sp-record-btn');
        const speechFb = step2Box.querySelector('#bv-sp-speech-feedback');

        function normalizeWord(str) {
            return (str || '')
                .toLowerCase()
                .replace(/[.,!?–\-:;"'()]/g, '')
                .trim();
        }

        function evaluateSpokenTranscript(transcript) {
            const spokenWords = transcript
                .toLowerCase()
                .replace(/[.,!?–\-:;"'()]/g, ' ')
                .split(/\s+/)
                .filter(Boolean);

            let totalRealTokens = 0;
            let matchedTokens = 0;
            let totalStressed = 0;
            let matchedStressed = 0;

            const wordCheckChips = [];

            item.tokens.forEach(tok => {
                const cleanTarget = normalizeWord(tok.word);
                if (!cleanTarget) return;
                totalRealTokens++;
                const acceptedList = [cleanTarget, ...(tok.altMatch || []).map(a => a.toLowerCase())];
                const isHit = spokenWords.some(sw => acceptedList.includes(sw) || (cleanTarget.length >= 5 && sw.startsWith(cleanTarget.slice(0, 4))));

                if (isHit) matchedTokens++;
                if (tok.stress) {
                    totalStressed++;
                    if (isHit) matchedStressed++;
                }

                const isStress = !!tok.stress;
                wordCheckChips.push(`
                    <span style="display:inline-block; margin:0.2rem; padding:0.25rem 0.6rem; border-radius:8px; font-weight:${isStress ? '900' : '700'}; font-size:0.95rem; background:${isHit ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${isHit ? '#4ade80' : '#f87171'}; border:1.5px solid ${isHit ? '#22c55e' : '#ef4444'}; ${isStress ? 'text-decoration:underline; text-underline-offset:3px;' : ''}">
                        ${isHit ? '✓' : '✗'} ${tok.word}
                    </span>
                `);
            });

            const pct = totalRealTokens > 0 ? Math.round((matchedTokens / totalRealTokens) * 100) : 0;
            const stressPct = totalStressed > 0 ? Math.round((matchedStressed / totalStressed) * 100) : 100;

            const headerColor = pct >= 75 ? '#4ade80' : (pct >= 45 ? '#fbbf24' : '#f87171');
            const statusMsg = pct >= 75
                ? `🎉 Flot udtale! Du ramte ${matchedStressed} af ${totalStressed} betonede nøgleord tydeligt!`
                : `👍 Godt forsøg! Du fik ${matchedStressed} af ${totalStressed} betonede ord med – prøv gerne igen og læg ekstra tryk på de understregede ord.`;

            speechFb.innerHTML = `
                <div style="background:rgba(15,23,42,0.9); border:1.5px solid ${headerColor}; border-radius:14px; padding:1rem; margin-top:0.5rem;">
                    <div style="font-weight:800; font-size:1.05rem; color:${headerColor}; margin-bottom:0.4rem;">
                        ${statusMsg} (Score: ${pct}% • Betoning: ${stressPct}%)
                    </div>
                    <div style="font-size:0.88rem; color:#94a3b8; margin-bottom:0.65rem;">
                        🎤 Vi hørte dig sige: <strong style="color:white;">"${transcript}"</strong>
                    </div>
                    <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:0.25rem;">
                        ${wordCheckChips.join('')}
                    </div>
                </div>
            `;
        }

        recordBtn.onclick = () => {
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRec) {
                speechFb.innerHTML = `
                    <div style="background:rgba(245,158,11,0.16); border:1px solid #f59e0b; color:#fde68a; padding:0.95rem; border-radius:12px; font-weight:700;">
                        ℹ️ Din browser understøtter ikke direkte mikrofon-genkendelse. Klik på <strong>🔊 Lyt i naturligt tempo</strong> og sig sætningen højt med tydeligt tryk på de <u>understregede</u> ord!
                        <div style="margin-top:0.6rem;">
                            <button type="button" id="bv-sp-self-ok" style="background:#22c55e; color:#0f172a; border:none; padding:0.5rem 1.1rem; border-radius:8px; font-weight:800; cursor:pointer;">
                                ✓ Jeg har sagt sætningen højt med betoning!
                            </button>
                        </div>
                    </div>
                `;
                const selfOk = speechFb.querySelector('#bv-sp-self-ok');
                if (selfOk) {
                    selfOk.onclick = () => evaluateSpokenTranscript(item.correctText);
                }
                return;
            }

            try {
                const rec = new SpeechRec();
                rec.lang = 'da-DK';
                rec.interimResults = false;
                rec.maxAlternatives = 1;

                recordBtn.textContent = '🔴 Lytter... Sig sætningen nu!';
                recordBtn.style.background = '#f59e0b';
                recordBtn.style.color = '#0f172a';
                speechFb.innerHTML = `<div style="color:#fbbf24; font-weight:700;">🎤 Mikrofonen er åben – sig: <em>"${item.correctText}"</em></div>`;

                rec.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    evaluateSpokenTranscript(transcript);
                };

                rec.onerror = () => {
                    speechFb.innerHTML = `
                        <div style="background:rgba(239,68,68,0.15); border:1px solid #ef4444; color:#f87171; padding:0.85rem; border-radius:12px; font-weight:700;">
                            ⚠️ Kunne ikke fange lyden fra mikrofonen. Tjek at mikrofon er tilladt, eller prøv igen!
                        </div>
                    `;
                };

                rec.onend = () => {
                    recordBtn.textContent = '🎙️ Indtal sætningen igen (Udtalefeedback)';
                    recordBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                    recordBtn.style.color = 'white';
                };

                rec.start();
            } catch (_) {
                evaluateSpokenTranscript(item.correctText);
            }
        };

        udtaleCard.appendChild(step2Box);
    }

    renderWorkplaceSpeechTask();
    udtalePanel.appendChild(udtaleCard);
    panelsHolder.appendChild(udtalePanel);

    container.appendChild(viewContainer);
}
