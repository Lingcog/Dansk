import { getTranslation, getLang } from '../utils/i18n.js';
import { shuffleArray } from '../utils/shuffle.js';

/**
 * ArbejdeKoekkenView - Scenarie 2 under "Arbejde" i "Mit hverdagsliv":
 * "Som køkkenassistent – I storkøkkenet og kantinen"
 *
 * Indeholder 32 målord fordelt på alle 4 ordklasser (16 substantiver, 8 verber, 4 adjektiver, 4 adverbier)
 * og 7 didaktiske faner målrettet en kursist i de første 3 måneder som køkkenassistent:
 * 1. 🔍 Vrimlebillede (32 kompakte pegefelter, ordklasse-filter, zoom, oversættelse + sortering)
 * 2. 🕵️ Ord-detektiv (10 missioner i køkkenet)
 * 3. 🔄 Synonymer & Antonymer (Modsætninger og faste køkkenudtryk)
 * 4. 📖 Historier (4 køkkenhistorier med klikbare målord og oversættelse på 16 sprog)
 * 5. ✍️ Sætningsbygning (Mundrette hverdagssætninger + 8 sætnings-puslespil)
 * 6. 💬 Mundtlige dialoger (5 køkkendialoger i blandet rækkefølge + valgfri ordliste med selvstændigheds-point)
 * 7. 🎙️ Sig det højt – Betoning & Udtalefeedback (10 automatiserede sætninger til de første 3 måneder med understregede betoningsord)
 */
export function renderArbejdeKoekkenView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container koekken-view';

    // Top Bar with back button + Workplace Switcher
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = getTranslation('arbejde_back_to_hub', '← Tilbage til Arbejde');
    backBtn.onclick = () => navigateFn('mit_hverdagsliv_arbejde');
    topBar.appendChild(backBtn);

    const workplaceSwitch = document.createElement('div');
    workplaceSwitch.style.cssText = 'display:flex; gap:0.45rem; flex-wrap:wrap;';
    workplaceSwitch.innerHTML = `
        <button type="button" id="kk-switch-bil" style="background:#1e293b; color:#cbd5e1; border:1.5px solid #475569; padding:0.45rem 0.95rem; border-radius:20px; font-weight:800; font-size:0.84rem; cursor:pointer;">
            ${getTranslation('arbejde_switch_to_bil', '🔧 Skift til Bilværksted ➔')}
        </button>
        <button type="button" id="kk-switch-koekken" style="background:#16a34a; color:white; border:1.5px solid #4ade80; padding:0.45rem 0.95rem; border-radius:20px; font-weight:800; font-size:0.84rem; cursor:pointer;">
            👩‍🍳 ${getTranslation('arbejde_koekken_title', 'Som køkkenassistent')} ${getTranslation('arbejde_active_label', '(Aktiv)')}
        </button>
    `;
    workplaceSwitch.querySelector('#kk-switch-bil').onclick = () => navigateFn('mit_hverdagsliv_arbejde_bilvaerksted');
    topBar.appendChild(workplaceSwitch);
    viewContainer.appendChild(topBar);

    // TTS Audio Helper
    function speakDanish(text, rate = 0.9) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
    }

    // ========================================================
    // --- 32 MÅLORD I STORKØKKENET & KANTINEN ---
    // ========================================================
    const KITCHEN_WORDS = [
        // --- 16 SUBSTANTIVER ---
        {
            id: 'koekkenassistent',
            num: 1,
            word: 'en køkkenassistent',
            clean: 'køkkenassistent',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en køkkenassistent • køkkenassistenten • køkkenassistenter • køkkenassistenterne',
            x: 34,
            y: 48,
            icon: '👩‍🍳',
            isCore: false,
            definition: 'Medarbejder i et storkøkken eller en kantine, som forbereder råvarer, snitter salat, bager brød, anretter buffet og holder køkkenet rent.',
            fixedTerms: 'at arbejde som køkkenassistent • at hjælpe i kantinen',
            sentence: 'Køkkenassistenten snitter friske grøntsager på det grønne skærebræt.'
        },
        {
            id: 'kok',
            num: 2,
            word: 'en kok / køkkenchef',
            clean: 'kok',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en kok • kokken • kokke • kokkene',
            x: 54,
            y: 44,
            icon: '👨‍🍳',
            isCore: true,
            definition: 'Faglært person i køkkenet, som planlægger dagens menu, laver varme retter og leder arbejdet i køkkenet.',
            fixedTerms: 'at spørge kokken • køkkenchefens menuplan',
            sentence: 'Kokken står ved komfuret og smager den varme suppe til.'
        },
        {
            id: 'skaerebraet',
            num: 3,
            word: 'et skærebræt',
            clean: 'skærebræt',
            wordClass: 'substantiv',
            gender: 'et',
            forms: 'et skærebræt • skærebrættet • skærebrætter • skærebrætterne',
            x: 31,
            y: 63,
            icon: '🟩',
            isCore: false,
            definition: 'Plast- eller træplade, man skærer madvarer på. I storkøkkener bruger man bestemte farver (f.eks. grønt til grøntsager og rødt til råt kød).',
            fixedTerms: 'et grønt skærebræt til grønt • at skifte skærebræt mellem råvarer',
            sentence: 'Husk altid at bruge et rent, grønt skærebræt, når du snitter salat.'
        },
        {
            id: 'kokkekniv',
            num: 4,
            word: 'en kokkekniv',
            clean: 'kokkekniv',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en kokkekniv • kokkekniven • kokkeknive • kokkeknivene',
            x: 37,
            y: 64,
            icon: '🔪',
            isCore: true,
            definition: 'Stor, skarp køkkenkniv, som bruges til at hakke og snitte grøntsager, urter og kød.',
            fixedTerms: 'en skarp kokkekniv • læg aldrig en skarp kniv i opvaskevandet',
            sentence: 'Køkkenassistenten holder godt fast om skæftet på den skarpe kokkekniv.'
        },
        {
            id: 'gryde',
            num: 5,
            word: 'en gryde',
            clean: 'gryde',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en gryde • gryden • gryder • gryderne',
            x: 52,
            y: 57,
            icon: '🍲',
            isCore: true,
            definition: 'Stor beholder af rustfrit stål med to håndtag, som bruges til at koge suppe, kartofler eller sovs på komfuret.',
            fixedTerms: 'en stor suppegryde • at sætte gryden i blød',
            sentence: 'Den varme tomatsuppe simrer stille i den store gryde på komfuret.'
        },
        {
            id: 'industriovn',
            num: 6,
            word: 'en industriovn',
            clean: 'industriovn',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en industriovn • industriovnen • industriovne • industriovnene',
            x: 78,
            y: 45,
            icon: '♨️',
            isCore: true,
            definition: 'Stor professionel ovn med damp og varmluft, hvor man kan bage mange bageplader med brød eller stege kød på én gang.',
            fixedTerms: 'at forvarme ovnen til 200 grader • pas på dampen fra industriovnen',
            sentence: 'Industriovnen bipper, når grovbollerne er færdigbagte.'
        },
        {
            id: 'bageplade',
            num: 7,
            word: 'en bageplade (stikvogn)',
            clean: 'bageplade',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en bageplade • bagepladen • bageplader • bagepladerne',
            x: 74,
            y: 58,
            icon: '🍞',
            isCore: false,
            definition: 'Flad metalplade med bagepapir, som sættes ind i ovnen eller på en høj rulle-stikvogn.',
            fixedTerms: 'en rygende varm bageplade • bagepapir på bagepladen',
            sentence: 'Han tager den varme bageplade med friskbagte boller ud med ovnhandsker.'
        },
        {
            id: 'koelerum',
            num: 8,
            word: 'et kølerum',
            clean: 'kølerum',
            wordClass: 'substantiv',
            gender: 'et',
            forms: 'et kølerum • kølerummet • kølerum • kølerummene',
            x: 14,
            y: 42,
            icon: '❄️',
            isCore: true,
            definition: 'Stort køleskab, man kan gå ind i, hvor mælk, kød, pålæg og grøntsager opbevares koldt (højst 5 grader).',
            fixedTerms: 'at tjekke temperaturen i kølerummet • sæt varerne på køl med det samme',
            sentence: 'Inde i kølerummet står mælk, smør og friske grøntsager på hylderne.'
        },
        {
            id: 'opvaskemaskine',
            num: 9,
            word: 'en opvaskemaskine (industriopvasker)',
            clean: 'opvaskemaskine',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en opvaskemaskine • opvaskemaskinen • opvaskemaskiner • opvaskemaskinerne',
            x: 16,
            y: 68,
            icon: '🍽️',
            isCore: true,
            definition: 'Hurtig professionel hætte-opvaskemaskine, der vasker og desinficerer en hel bakke tallerkener og bestik på 2 minutter.',
            fixedTerms: 'at spule tallerkenerne af • at køre en bakke gennem opvaskemaskinen',
            sentence: 'I opvasken kører opvaskemaskinen på højtryk efter frokostpausen.'
        },
        {
            id: 'roeremaskine',
            num: 10,
            word: 'en røremaskine',
            clean: 'røremaskine',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en røremaskine • røremaskinen • røremaskiner • røremaskinerne',
            x: 64,
            y: 66,
            icon: '🥣',
            isCore: false,
            definition: 'Stor elektrisk køkkenmaskine på gulvet eller bordet, som ælter rugbrødsdej, rører fars eller pisker dressinger.',
            fixedTerms: 'at ælte dej i røremaskinen • sluk røremaskinen før rengøring',
            sentence: 'Den store røremaskine ælter ti kilo dej til dagens friske grovboller.'
        },
        {
            id: 'forklaede',
            num: 11,
            word: 'et forklæde',
            clean: 'forklæde',
            wordClass: 'substantiv',
            gender: 'et',
            forms: 'et forklæde • forklædet • forklæder • forklæderne',
            x: 34,
            y: 55,
            icon: '🎽',
            isCore: false,
            definition: 'Arbejdsklæde, man binder foran kroppen for at beskytte tøjet og holde god køkkenhygiejne.',
            fixedTerms: 'at tage et rent forklæde på • arbejdstøj og forklæde',
            sentence: 'Hver morgen tager køkkenassistenten et helt rent forklæde på.'
        },
        {
            id: 'engangshandske',
            num: 12,
            word: 'en engangshandske',
            clean: 'engangshandske',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en engangshandske • engangshandsken • engangshandsker • engangshandskerne',
            x: 43,
            y: 58,
            icon: '🧤',
            isCore: false,
            definition: 'Tynde, blå plasthandsker, som bruges til hygiejnisk håndtering af pålæg, salat og spiseklar mad.',
            fixedTerms: 'at skifte engangshandsker ofte • vask hænder før du tager handsker på',
            sentence: 'Hun har blå engangshandsker på, mens hun anretter fadet med laks og salat.'
        },
        {
            id: 'raavare',
            num: 13,
            word: 'en råvare (grøntsager)',
            clean: 'råvare',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en råvare • råvaren • råvarer • råvarerne',
            x: 25,
            y: 74,
            icon: '🥕',
            isCore: true,
            definition: 'Friske ingredienser som grøntsager, frugt, kød, fisk, æg og mel, som bruges til at lave maden fra bunden.',
            fixedTerms: 'friske økologiske råvarer • varemodtagelse af råvarer',
            sentence: 'Om morgenen modtager køkkenet kasser med friske råvarer som gulerødder og porrer.'
        },
        {
            id: 'datomaerkning',
            num: 14,
            word: 'en datomærkning (label)',
            clean: 'datomærkning',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en datomærkning • datomærkningen • datomærkninger • datomærkningerne',
            x: 20,
            y: 30,
            icon: '🏷️',
            isCore: false,
            definition: 'Klistermærke (label) på bøtter i kølerummet med indhold og dato for, hvornår maden er lavet og senest skal bruges.',
            fixedTerms: 'husk datomærkning på alle bøtter • først ind, først ud (FIFO)',
            sentence: 'Fødevarestyrelsen tjekker, at alle bøtter i kølerummet har tydelig datomærkning.'
        },
        {
            id: 'affaldsspand',
            num: 15,
            word: 'en affaldsspand (madaffald)',
            clean: 'affaldsspand',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en affaldsspand • affaldsspanden • affaldsspande • affaldsspandene',
            x: 10,
            y: 82,
            icon: '🗑️',
            isCore: true,
            definition: 'Beholder med låg og fodpedal til sortering af grøntsagsskræller, madaffald og plast i køkkenet.',
            fixedTerms: 'at sortere madaffald • at tømme affaldsspanden og skifte pose',
            sentence: 'Kartoffelskrællerne smides direkte i den grønne affaldsspand til madaffald.'
        },
        {
            id: 'buffet',
            num: 16,
            word: 'en buffet (kantine)',
            clean: 'buffet',
            wordClass: 'substantiv',
            gender: 'en',
            forms: 'en buffet • buffeten • buffeter • buffeterne',
            x: 88,
            y: 68,
            icon: '🥗',
            isCore: false,
            definition: 'Langt serveringsbord i kantinen, hvor medarbejdere og gæster selv tager salat, brød, pålæg og dagens varme ret.',
            fixedTerms: 'at fylde buffeten op • frokostbuffeten åbner klokken 11.30',
            sentence: 'Klokken 11.30 står hele kantinens buffet klar med salatbar og varm mad.'
        },

        // --- 8 VERBER ---
        {
            id: 'skraelle',
            num: 17,
            word: 'at skrælle',
            clean: 'skrælle',
            wordClass: 'verbum',
            forms: 'at skrælle • skræller • skrællede • har skrællet',
            x: 26,
            y: 56,
            icon: '🥔',
            isCore: false,
            definition: 'At fjerne den yderste skræl på f.eks. kartofler, gulerødder, løg eller æbler med en skrællekniv.',
            fixedTerms: 'at skrælle fem kilo kartofler • at skrælle gulerødder ved vasken',
            sentence: 'Om morgenen skræller køkkenassistenten kartofler og gulerødder til dagens suppe.'
        },
        {
            id: 'snitte',
            num: 18,
            word: 'at snitte / hakke',
            clean: 'snitte',
            wordClass: 'verbum',
            forms: 'at snitte • snitter • snittede • har snittet',
            x: 35,
            y: 60,
            icon: '🥬',
            isCore: true,
            definition: 'At skære grøntsager, kål eller krydderurter i fine strimler eller små tern med en kniv.',
            fixedTerms: 'at snitte spidskål fint • at hakke løg og persille',
            sentence: 'Hun snitter kål og peberfrugt i helt fine strimler til salatbaren.'
        },
        {
            id: 'roere',
            num: 19,
            word: 'at røre (rundt)',
            clean: 'røre',
            wordClass: 'verbum',
            forms: 'at røre • rører • rørte • har rørt',
            x: 50,
            y: 53,
            icon: '🥄',
            isCore: true,
            definition: 'At bevæge en grydeske eller et piskeris rundt i gryden, så suppen eller sovsen ikke brænder på.',
            fixedTerms: 'at røre rundt i gryden • at røre en dressing sammen',
            sentence: 'Husk at røre jævnligt rundt i gryden, så mælkesovsen ikke brænder på i bunden.'
        },
        {
            id: 'bage',
            num: 20,
            word: 'at bage / stege',
            clean: 'bage',
            wordClass: 'verbum',
            forms: 'at bage • bager • bagte • har bagt',
            x: 80,
            y: 52,
            icon: '🥐',
            isCore: true,
            definition: 'At tilberede brød, boller, kager eller ovnretter ved høj varme inde i industriovnen.',
            fixedTerms: 'at bage friske grovboller • at stege kylling i ovnen',
            sentence: 'Hver morgen bager vi frisk rugbrød og lune boller i industriovnen.'
        },
        {
            id: 'vaske_op',
            num: 21,
            word: 'at vaske op',
            clean: 'vaske op',
            wordClass: 'verbum',
            forms: 'at vaske op • vasker op • vaskede op • har vasket op',
            x: 19,
            y: 63,
            icon: '🫧',
            isCore: true,
            definition: 'At skylle snavset service, gryder og fade af og vaske dem rene i industriopvaskeren.',
            fixedTerms: 'at tage opvasken • at vaske gryder og kantiner op',
            sentence: 'Vi hjælper hinanden med at vaske hurtigt op, når frokosten er slut.'
        },
        {
            id: 'spritte_af',
            num: 22,
            word: 'at spritte af / rengøre',
            clean: 'spritte af',
            wordClass: 'verbum',
            forms: 'at spritte af • spritter af • sprittede af • har sprittet af',
            x: 46,
            y: 76,
            icon: '🧴',
            isCore: false,
            definition: 'At vaske stålborde, håndtag og skærebrætter med sæbe og bagefter desinficere dem med fødevaregodkendt sprit.',
            fixedTerms: 'at spritte stålbordet af • at rengøre alle overflader efter brug',
            sentence: 'Efter snittearbejdet vasker og spritter han hele stålbordet grundigt af.'
        },
        {
            id: 'anrette',
            num: 23,
            word: 'at anrette',
            clean: 'anrette',
            wordClass: 'verbum',
            forms: 'at anrette • anretter • anrettede • har anrettet',
            x: 85,
            y: 62,
            icon: '🍱',
            isCore: false,
            definition: 'At lægge maden pænt og indbydende op på fade, i skåle eller på tallerkener med friske krydderurter på toppen.',
            fixedTerms: 'at anrette salaten pænt • at anrette på store fade til buffeten',
            sentence: 'Køkkenassistenten anretter salaten i store skåle og pynter med frisk persille.'
        },
        {
            id: 'smage_til',
            num: 24,
            word: 'at smage til',
            clean: 'smage til',
            wordClass: 'verbum',
            forms: 'at smage til • smager til • smagte til • har smagt til',
            x: 57,
            y: 50,
            icon: '🧂',
            isCore: true,
            definition: 'At smage på maden med en ren ske og tilsætte salt, peber, citron eller krydderier, indtil smagen er helt rigtig.',
            fixedTerms: 'at smage suppen til med salt og peber • brug altid en ren smageske',
            sentence: 'Inden servering smager kokken suppen til med lidt salt og friskkværnet peber.'
        },

        // --- 4 ADJEKTIVER ---
        {
            id: 'frisk',
            num: 25,
            word: 'frisk',
            clean: 'frisk',
            wordClass: 'adjektiv',
            forms: 'frisk (en) • friskt (et) • friske (flertal/bestemt)',
            x: 28,
            y: 70,
            icon: '🌿',
            isCore: true,
            definition: 'Helt nyhøstet, nybagt eller nylavet – med god duft, farve og sprødhed (det modsatte af gammel eller slatten).',
            fixedTerms: 'friske grøntsager • friskbagt brød • friske krydderurter',
            sentence: 'Gæsterne i kantinen elsker sprød salat lavet af helt friske råvarer.'
        },
        {
            id: 'ren',
            num: 26,
            word: 'ren / hygiejnisk',
            clean: 'ren',
            wordClass: 'adjektiv',
            forms: 'ren (en) • rent (et) • rene (flertal/bestemt)',
            x: 42,
            y: 79,
            icon: '✨',
            isCore: true,
            definition: 'Fri for snavs og bakterier (det modsatte af beskidt/snavset). God køkkenhygiejne kræver rene hænder og rene borde.',
            fixedTerms: 'et rent skærebræt • rene hænder og rent forklæde',
            sentence: 'Stålbordet er helt rent og klar til næste opgave.'
        },
        {
            id: 'skarp',
            num: 27,
            word: 'skarp',
            clean: 'skarp',
            wordClass: 'adjektiv',
            forms: 'skarp (en) • skarpt (et) • skarpe (flertal/bestemt)',
            x: 40,
            y: 34,
            icon: '⚡',
            isCore: true,
            definition: 'En kniv, der skærer let og præcist gennem grøntsager og kød (det modsatte af en sløv kniv).',
            fixedTerms: 'pas på, kniven er meget skarp! • en skarp kokkekniv',
            sentence: 'En skarp kokkekniv gør snittearbejdet både hurtigere og mere sikkert.'
        },
        {
            id: 'serveringsklar',
            num: 28,
            word: 'klar / serveringsklar',
            clean: 'serveringsklar',
            wordClass: 'adjektiv',
            forms: 'serveringsklar (en) • serveringsklart (et) • serveringsklare (flertal/bestemt)',
            x: 90,
            y: 60,
            icon: '✅',
            isCore: false,
            definition: 'Helt færdiglavet, smagt til og anrettet, så maden kan sættes direkte ind på buffeten til gæsterne.',
            fixedTerms: 'maden er serveringsklar • buffeten står klar til gæsterne',
            sentence: 'Alle fade med salat og varm mad er nu serveringsklare til klokken 11.30.'
        },

        // --- 4 ADVERBIER ---
        {
            id: 'grundigt',
            num: 29,
            word: 'grundigt',
            clean: 'grundigt',
            wordClass: 'adverbium',
            forms: 'Mådesadverbium (beskriver hvordan rengøring og vask udføres)',
            x: 23,
            y: 48,
            icon: '🧼',
            isCore: true,
            definition: 'Nøje og omhyggeligt, så al jord på grøntsagerne og alle bakterier på hænder og borde fjernes.',
            fixedTerms: 'at vaske hænder grundigt • at skylle porrerne grundigt for jord',
            sentence: 'Før du rører ved maden, skal du vaske dine hænder grundigt med vand og sæbe.'
        },
        {
            id: 'forsigtigt',
            num: 30,
            word: 'forsigtigt',
            clean: 'forsigtigt',
            wordClass: 'adverbium',
            forms: 'Mådesadverbium (beskriver sikkerhed ved varme ovne og skarpe knive)',
            x: 72,
            y: 54,
            icon: '🧤',
            isCore: true,
            definition: 'Stille og opmærksomt, så man ikke brænder sig på varme plader eller skærer sig på kniven.',
            fixedTerms: 'at tage den varme plade forsigtigt ud • at gå forsigtigt med varm suppe',
            sentence: 'Hun løfter forsigtigt den varme bageplade ud af industriovnen med tykke handsker.'
        },
        {
            id: 'hurtigt',
            num: 31,
            word: 'hurtigt',
            clean: 'hurtigt',
            wordClass: 'adverbium',
            forms: 'Mådesadverbium (beskriver tempo, når der er travlt ved frokosttid)',
            x: 83,
            y: 74,
            icon: '⚡',
            isCore: true,
            definition: 'I et rask tempo uden ventetid – især når køen ved buffeten er lang, eller varer skal på køl.',
            fixedTerms: 'at fylde buffeten hurtigt op • at sætte mælk og fisk hurtigt på køl',
            sentence: 'Når fadet på buffeten er tomt, henter køkkenassistenten hurtigt et nyt fad inde fra køkkenet.'
        },
        {
            id: 'heldigvis',
            num: 32,
            word: 'heldigvis',
            clean: 'heldigvis',
            wordClass: 'adverbium',
            forms: 'Holdningsadverbium (udtrykker lettelse i en travl køkkenhverdag)',
            x: 92,
            y: 48,
            icon: '🍀',
            isCore: true,
            definition: 'Viser lettelse over, at maden nåede at blive klar til tiden, eller at alle råvarer er på lager.',
            fixedTerms: 'maden blev heldigvis klar til tiden • vi har heldigvis mere brød i ovnen',
            sentence: 'Der kom mange gæster i kantinen i dag, men vi havde heldigvis bagt ekstra boller!'
        }
    ];

    const CLASS_META = {
        substantiv: { label: '🟢 Substantiv', short: 'Substantiv', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.18)' },
        verbum: { label: '🔴 Verbum', short: 'Verbum', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.18)' },
        adjektiv: { label: '🟠 Adjektiv', short: 'Adjektiv', color: '#f97316', bg: 'rgba(249, 115, 22, 0.18)' },
        adverbium: { label: '🔵 Adverbium', short: 'Adverbium', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.18)' }
    };

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

    // Oversættelser for de 32 målord i storkøkkenet
    const KITCHEN_TRANSLATIONS = {
        koekkenassistent: {
            en: 'a kitchen assistant / catering assistant', de: 'ein Küchenhelfer / Küchenassistent', es: 'un ayudante de cocina', pt: 'um auxiliar de cozinha', tr: 'bir mutfak asistanı / aşçı yardımcısı',
            ar: 'مساعد مطبخ', fa: 'کمک‌آشپز / دستیار آشپزخانه', ku: 'alîkarê metbexê', ur: 'کچن اسسٹنٹ (باورچی خانے کا مددگار)', ru: 'кухонный работник / помощник повара', uk: 'кухонний працівник / помічник кухаря',
            zh: '厨房助手 / 帮厨', vi: 'phụ bếp / nhân viên hỗ trợ bếp', th: 'ผู้ช่วยกุ๊ก / พนักงานช่วยงานครัว', ne: 'भान्सा सहायक (किचन असिस्टेन्ट)', ps: 'د پخلنځي مرستیال'
        },
        kok: {
            en: 'a chef / head cook', de: 'ein Koch / Küchenchef', es: 'un cocinero / chef', pt: 'um cozinheiro / chef', tr: 'bir aşçı / mutfak şefi',
            ar: 'طاهٍ / رئيس الطهاة (شيف)', fa: 'آشپز / سرآشپز', ku: 'aşpêj / serokê metbexê', ur: 'باورچی / شیف', ru: 'повар / шеф-повар', uk: 'кухар / шеф-кухар',
            zh: '厨师 / 主厨', vi: 'đầu bếp / bếp trưởng', th: 'เชฟ / หัวหน้าพ่อครัว', ne: 'भान्से / मुख्य कुक (सेफ)', ps: 'اشپز / سر اشپز'
        },
        skaerebraet: {
            en: 'a cutting board / chopping board', de: 'ein Schneidebrett', es: 'una tabla de cortar', pt: 'uma tábua de corte', tr: 'bir kesme tahtası',
            ar: 'لوح تقطيع', fa: 'تخته گوشت / تخته برش', ku: 'texteyê hûrkirinê', ur: 'سبزی کاٹنے والا تختہ (چاپنگ بورڈ)', ru: 'разделочная доска', uk: 'обробна дошка',
            zh: '砧板 / 切菜板', vi: 'thớt切 (thớt nhựa màu theo quy chuẩn)', th: 'เขียงหั่นผัก/เนื้อ', ne: 'अचानो / काट्ने बोर्ड (चपिङ बोर्ड)', ps: 'د ترکاري پرې کولو تخته'
        },
        kokkekniv: {
            en: 'a chef’s knife', de: 'ein Kochmesser', es: 'un cuchillo de cocinero', pt: 'uma faca de chef', tr: 'bir şef bıçağı',
            ar: 'سكين الطاهي الكبير', fa: 'چاقوی سرآشپز', ku: 'kêra aşpêj', ur: 'باورچی کی بڑی چھری', ru: 'поварской нож (шеф-нож)', uk: 'кухарський ніж',
            zh: '厨师刀 / 菜刀', vi: 'dao đầu bếp', th: 'มีดเชฟ / มีดทำครัว', ne: 'भान्साको ठूलो चक्कु', ps: 'د اشپزۍ لویه چاړه'
        },
        gryde: {
            en: 'a cooking pot / stockpot', de: 'ein Kochtopf', es: 'una olla / cacerola', pt: 'uma panela / caldeirão', tr: 'bir tencere',
            ar: 'قدر طبخ كبير (حلة)', fa: 'قابلمه / دیگ بزرگ', ku: 'beroş / quşxane', ur: 'پتیلا / دیگچی', ru: 'кастрюля / котёл', uk: 'каструля / казан',
            zh: '汤锅 / 大锅', vi: 'nồi nấu lớn', th: 'หม้อต้มขนาดใหญ่', ne: 'कसौंडी / ठूलो भाँडो', ps: 'دیګ / کټوه'
        },
        industriovn: {
            en: 'a commercial oven / combi-steamer oven', de: 'ein Industrieofen / Kombidämpfer', es: 'un horno industrial', pt: 'um forno industrial', tr: 'bir endüstriyel fırın',
            ar: 'فرن صناعي كبير (فرن بخاري)', fa: 'فر صنعتی آشپزخانه', ku: 'firina pîşesaziyê ya metbexê', ur: 'بڑا کمرشل اوون (بھٹی)', ru: 'промышленная печь (пароконвектомат)', uk: 'промислова піч (пароконвектомат)',
            zh: '商用大烤箱 / 蒸烤箱', vi: 'lò nướng công nghiệp', th: 'เตาอบอุตสาหกรรม', ne: 'ठूलो व्यावसायिक ओभन', ps: 'لوی صنعتي داش (اوون)'
        },
        bageplade: {
            en: 'a baking tray / sheet pan', de: 'ein Backblech', es: 'una bandeja de horno', pt: 'uma assadeira / tabuleiro', tr: 'bir fırın tepsisi',
            ar: 'صينية خبز للفرن', fa: 'سینی فر', ku: 'sîniya firinê', ur: 'بیکنگ ٹرے (اوون کی ٹرے)', ru: 'противень для выпечки', uk: 'деко для випікання',
            zh: '烤盘', vi: 'khay nướng bánh', th: 'ถาดอบขนมปัง', ne: 'बेकिङ ट्रे (ओभनको ट्रे)', ps: 'د داش پتنوس (بیکنګ ټرې)'
        },
        koelerum: {
            en: 'a walk-in cold room / refrigerator room', de: 'ein Kühlraum / Kühlhaus', es: 'una cámara frigorífica', pt: 'uma câmara frigorífica', tr: 'bir soğuk hava deposu / soğuk oda',
            ar: 'غرفة تبريد (ثلاجة كبيرة)', fa: 'سردخانه آشپزخانه', ku: 'odeya sarincê (sarker)', ur: 'کولڈ روم (بڑا فریج کمرہ)', ru: 'холодильная камера', uk: 'холодильна камера',
            zh: '步入式冷藏室 / 冷库', vi: 'phòng lạnh bảo quản thực phẩm', th: 'ห้องเย็นเก็บอาหาร', ne: 'चिस्यान कोठा (कोल्ड रुम)', ps: 'سړه خونه (یخچال خونه)'
        },
        opvaskemaskine: {
            en: 'a commercial dishwasher', de: 'eine Gewerbespülmaschine / Haubenspülmaschine', es: 'un lavavajillas industrial', pt: 'uma máquina de lavar louça industrial', tr: 'bir endüstriyel bulaşık makinesi',
            ar: 'غسالة صحون صناعية', fa: 'ماشین ظرف‌شویی صنعتی', ku: 'makîneya şûştina firaxan', ur: 'برتن دھونے والی بڑی مشین (ڈش واشر)', ru: 'промышленная посудомоечная машина', uk: 'промислова посудомийна машина',
            zh: '商用洗碗机', vi: 'máy rửa bát công nghiệp', th: 'เครื่องล้างจานอุตสาหกรรม', ne: 'भाँडा माझ्ने मेसिन (डिसवासर)', ps: 'د لوښو مینځلو ماشین'
        },
        roeremaskine: {
            en: 'a commercial stand mixer / dough mixer', de: 'eine Rührmaschine / Knetmaschine', es: 'una batidora amasadora industrial', pt: 'uma batedeira / masseira industrial', tr: 'bir hamur yoğurma / karıştırma makinesi',
            ar: 'عجّانة / خلاط مطبخ كبير', fa: 'همزن صنعتی / خمیرگیر', ku: 'makîneya hevîr û têkelkirinê', ur: 'آٹا گوندھنے اور مکس کرنے والی مشین', ru: 'тестомес / кухонный миксер', uk: 'тістоміс / промисловий міксер',
            zh: '商用搅拌机 / 和面机', vi: 'máy trộn bột công nghiệp', th: 'เครื่องผสมอาหาร / เครื่องนวดแป้ง', ne: 'पीठो मुछ्ने र फिट्ने मेसिन (मिक्सर)', ps: 'د اوړو اخښلو او ګډولو ماشین'
        },
        forklaede: {
            en: 'an apron', de: 'eine Schürze', es: 'un delantal', pt: 'um avental', tr: 'bir mutfak önlüğü',
            ar: 'مئزر مطبخ (مريلة)', fa: 'پیش‌بند آشپزی', ku: 'pêşmal / berdilk', ur: 'ایپرن (پیش بند)', ru: 'фартук', uk: 'фартух',
            zh: '围裙', vi: 'tạp dề', th: 'ผ้ากันเปื้อน', ne: 'एप्रोन (अगाडि लगाउने कपडा)', ps: 'پیش بند (اپرون)'
        },
        engangshandske: {
            en: 'a disposable glove', de: 'ein Einweghandschuh', es: 'un guante desechable', pt: 'uma luva descartável', tr: 'bir tek kullanımlık eldiven',
            ar: 'قفاز يُستخدم لمرة واحدة', fa: 'دستکش یک‌بارمصرف', ku: 'lepikê yekcarî', ur: 'ایک بار استعمال ہونے والا دستانہ', ru: 'одноразовая перчатка', uk: 'одноразова рукавичка',
            zh: '一次性手套', vi: 'găng tay dùng một lần', th: 'ถุงมือยางใช้แล้วทิ้ง', ne: 'एकपटक प्रयोग गरिने पञ्जा (ग्लोभ्स)', ps: 'یو ځل کارېدونکې دستکشې'
        },
        raavare: {
            en: 'a raw ingredient / fresh produce', de: 'eine Rohware / frische Zutat', es: 'una materia prima / ingrediente fresco', pt: 'uma matéria-prima / ingrediente fresco', tr: 'bir hammadde / taze malzeme',
            ar: 'مادة غذائية خام (خضروات طازجة)', fa: 'ماده اولیه غذایی (سبزیجات تازه)', ku: 'madeya xav a xwarinê', ur: 'خام مال / تازہ سبزیاں اور اجزاء', ru: 'сырьё / свежие продукты (ингредиенты)', uk: 'сировина / свіжі продукти (інгредієнти)',
            zh: '食材原料（生鲜蔬果）', vi: 'nguyên liệu thực phẩm tươi sống', th: 'วัตถุดิบสด (ผัก/เนื้อสัตว์)', ne: 'कच्चा पदार्थ (ताजा तरकारी र सामग्री)', ps: 'خام توکي (تازه ترکاري او مواد)'
        },
        datomaerkning: {
            en: 'a date label (shelf-life sticker)', de: 'eine Datumsbeschriftung / Haltbarkeitsetikett', es: 'una etiqueta de fecha y caducidad', pt: 'uma etiqueta de data de validade', tr: 'bir tarih etiketi (son kullanma etiketi)',
            ar: 'ملصق تاريخ الإنتاج والصلاحية', fa: 'برچسب تاریخ و ماندگاری', ku: 'etîketa dîrokê', ur: 'تاریخ کا لیبل (میعاد کی پرچی)', ru: 'маркировка даты (этикетка срока годности)', uk: 'маркування дати (етикетка терміну придатності)',
            zh: '日期标签（保质期贴纸）', vi: 'nhãn ghi ngày tháng (hạn sử dụng)', th: 'ป้ายระบุวันที่ผลิตและวันหมดอายุ', ne: 'मिति लेखिएको स्टिकर (लेबल)', ps: 'د نېټې نښه (لیبل)'
        },
        affaldsspand: {
            en: 'a waste bin / food waste container', de: 'ein Abfalleimer (Biomüll)', es: 'un cubo de basura orgánica', pt: 'uma lixeira de resíduos orgânicos', tr: 'bir çöp kutusu (organik atık kovası)',
            ar: 'سلة مهملات (نفايات الطعام)', fa: 'سطل زباله (پسماند غذایی)', ku: 'سطla çopê (paşmayiyên xwarinê)', ur: 'کچرے کا ڈبہ (کھانے کا فضلہ)', ru: 'мусорный бак (для пищевых отходов)', uk: 'сміттєвий бак (для харчових відходів)',
            zh: '垃圾桶（厨余垃圾桶）', vi: 'thùng rác (rác thực phẩm)', th: 'ถังขยะเศษอาหาร', ne: 'फोहोर फाल्ने डस्टबिन', ps: 'د کثافاتو سطل (د خوړو پاتې شوني)'
        },
        buffet: {
            en: 'a buffet counter (canteen buffet)', de: 'ein Buffet / eine Kantinentheke', es: 'un bufé de comedor', pt: 'um buffet de refeitório', tr: 'bir açık büfe (kantin büfesi)',
            ar: 'بوفيه تقديم الطعام (في الكافتيريا)', fa: 'بوفه سلف‌سرویس غذاخوری', ku: 'bûfeya xwaringehê', ur: 'بوفے کاؤنٹر (کینٹین کی میز)', ru: 'шведский стол / линия раздачи в столовой', uk: 'шведський стіл / лінія роздачі в їдальні',
            zh: '自助餐台（食堂餐台）', vi: 'quầy buffet (quầy thức ăn căng tin)', th: 'เคาน์เตอร์บุฟเฟต์ในโรงอาหาร', ne: 'बफे काउन्टर (क्यान्टिनको खाना राख्ने ठाउँ)', ps: 'د خوړو مېز (بوفې)'
        },
        skraelle: {
            en: 'to peel (potatoes, carrots)', de: 'schälen (Kartoffeln, Karotten)', es: 'pelar (patatas, zanahorias)', pt: 'descascar (batatas, cenouras)', tr: 'soymak (patates, havuç)',
            ar: 'يُقشّر (البطاطس والجزر)', fa: 'پوست کندن (سیب‌زمینی، هویج)', ku: 'qelandin / qalik jê kirin', ur: 'چھیلنا (آلو، گاجر کا چھلکا اتارنا)', ru: 'чистить от кожуры (картофель, морковь)', uk: 'чистити від шкірки (картоплю, моркву)',
            zh: '削皮（削土豆、胡萝卜皮）', vi: 'gọt vỏ (khoai tây, cà rốt)', th: 'ปอกเปลือก (มันฝรั่ง, แครอท)', ne: 'ताछ्नु / बोक्रा फाल्नु (आलु, गाजर)', ps: 'پوستول (کچالو او ګازرې سپینول)'
        },
        snitte: {
            en: 'to slice finely / to chop', de: 'fein schneiden / schnippeln / hacken', es: 'cortar en juliana / picar fino', pt: 'fatiar fino / picar', tr: 'ince doğramak / kıymak',
            ar: 'يُقطّع إلى شرائح دقيقة / يفرم', fa: 'خرد کردن / خلالی بریدن سبزیجات', ku: 'hûr kirin (sebzeyan)', ur: 'باریک کاٹنا (سلاد اور سبزیاں)', ru: 'шинковать / мелко нарезать', uk: 'шинкувати / дрібно нарізати',
            zh: '切丝 / 切碎（切蔬菜）', vi: 'thái nhỏ / băm nhỏ', th: 'ซอย / หั่นเป็นชิ้นเล็กๆ', ne: 'मसिना गरी काट्नु (सलाद/तरकारी)', ps: 'میده پرې کول (ترکاري او سلاد)'
        },
        roere: {
            en: 'to stir (the pot)', de: 'umrühren (im Topf)', es: 'remover (la olla)', pt: 'mexer (a panela)', tr: 'karıştırmak (tencereyi)',
            ar: 'يُحرّك / يُقلّب (في القدر)', fa: 'هم زدن (در قابلمه)', ku: 'têkel kirin / لêxistin', ur: 'ہلانا / چمچ چلانا (پتیلے میں)', ru: 'помешивать (в кастрюле)', uk: 'помішувати (у каструлі)',
            zh: '搅拌（搅动锅里的汤）', vi: 'khuấy đều (trong nồi)', th: 'คน (อาหารในหม้อ)', ne: 'चलाउनु (डाडुले भाँडोमा चलाउनु)', ps: 'لړل (په دیګ کې کاچوغه وهل)'
        },
        bage: {
            en: 'to bake / to roast in the oven', de: 'backen / im Ofen braten', es: 'hornear / cocer al horno', pt: 'assar (pão, bolo no forno)', tr: 'fırında pişirmek (ekmek, poğaça)',
            ar: 'يَخبز (في الفرن)', fa: 'پختن نان در فر', ku: 'patin (nan di firinê de)', ur: 'بیک کرنا (اوون میں روٹی/ڈبل روٹی پکانا)', ru: 'печь / выпекать в духовке', uk: 'пекти / випікати в печі',
            zh: '烘焙 / 烤制（面包）', vi: 'nướng bánh (trong lò)', th: 'อบ (ขนมปังในเตาอบ)', ne: 'पकाउनु / बेक गर्नु (ओभनमा रोटी पकाउनु)', ps: 'پخول (په داش کې ډوډۍ پخول)'
        },
        vaske_op: {
            en: 'to wash the dishes / do the dishwashing', de: 'abwaschen / Geschirr spülen', es: 'fregar los platos / lavar la vajilla', pt: 'lavar a louça', tr: 'bulaşık yıkamak',
            ar: 'يغسل الصحون والأواني', fa: 'ظرف شستن', ku: 'firax şûştin', ur: 'برتن دھونا', ru: 'мыть посуду', uk: 'мити посуд',
            zh: '洗碗 / 清洗餐具', vi: 'rửa bát đĩa', th: 'ล้างจานและภาชนะ', ne: 'भाँडा माझ्नु', ps: 'لوښي مینځل'
        },
        spritte_af: {
            en: 'to sanitize / disinfect and wipe down', de: 'desinfizieren / abwischen', es: 'desinfectar / limpiar con alcohol', pt: 'higienizar / desinfetar com álcool', tr: 'dezenfekte etmek / silip temizlemek',
            ar: 'يُعقّم ويمسح الأسطح بالكحول الطبي', fa: 'ضدعفونی کردن و تمیز کردن میز کار', ku: 'dezenfekte kirin û پaqij kirin', ur: 'سینیٹائز کرنا / جراثیم کش اسپرے سے صاف کرنا', ru: 'дезинфицировать / протирать антисептиком', uk: 'дезінфікувати / протирати антисептиком',
            zh: '消毒擦拭（工作台面）', vi: 'khử trùng / lau sạch bằng cồn sát khuẩn', th: 'เช็ดทำความสะอาดและฆ่าเชื้อด้วยแอลกอฮอล์', ne: 'सेनिटाइज गर्नु / कीटाणुनाशकले पुछ्नु', ps: 'ضدعفوني کول او پاکول'
        },
        anrette: {
            en: 'to plate / to arrange food nicely on platters', de: 'anrichten (Speisen auf Platten)', es: 'emplatar / presentar la comida', pt: 'impiatar / arrumar a comida nas travessas', tr: 'tabağa / servis tepsisine özenle dizmek',
            ar: 'يُرتّب ويُقدّم الطعام بشكل جميل', fa: 'چیدن و تزئین کردن غذا در دیس', ku: 'xwarinê bi xweşikî li ser sîniyê rêz kirin', ur: 'کھانے کو خوبصورتی سے ٹرے/پلیٹ میں سجانا', ru: 'сервировать / красиво выкладывать блюда', uk: 'сервірувати / красиво викладати страви',
            zh: '摆盘 / 装盘陈列', vi: 'bày trí món ăn ra đĩa/khay', th: 'จัดจาน / จัดวางอาหารใส่ถาดเสิร์ฟอย่างสวยงาม', ne: 'खानालाई आकर्षक ढंगले पस्कनु / सजाउनु', ps: 'خواړه په ښکلي ډول په غوري کې برابرول'
        },
        smage_til: {
            en: 'to taste and season (with salt & pepper)', de: 'abschmecken (mit Salz und Pfeffer)', es: 'probar y rectificar de sal y pimienta', pt: 'provar e acertar o tempero', tr: 'tadına bakıp tuzunu biberini ayarlamak',
            ar: 'يتذوق الطعام ويضبط الملح والتوابل', fa: 'چشیدن و اندازه کردن نمک و ادویه غذا', ku: 'tam kirin û xwê û biharatê eyar kirin', ur: 'چکھ کر نمک مرچ برابر کرنا', ru: 'пробовать на вкус и доводить до вкуса специями', uk: 'куштувати і доводити до смаку спеціями',
            zh: '尝味并调味（加盐和胡椒）', vi: 'nếm thử và nêm nếm gia vị', th: 'ชิมและปรุงรสให้กลมกล่อม', ne: 'चाखेर नुन-मसला मिलाउनु', ps: 'خوند کتل او مالګه او مصالحه برابرول'
        },
        frisk: {
            en: 'fresh (fresh vegetables, freshly baked)', de: 'frisch (frisches Gemüse, frisch gebacken)', es: 'fresco (verduras frescas)', pt: 'fresco (legumes frescos)', tr: 'taze (taze sebzeler, taze pişmiş)',
            ar: 'طازج (خضروات طازجة / خبز طازج)', fa: 'تازه (سبزیجات تازه / نان تازه)', ku: 'taze / nû', ur: 'تازہ (تازہ سبزیاں / تازہ پکی ہوئی روٹی)', ru: 'свежий (свежие овощи / свежая выпечка)', uk: 'свіжий (свіжі овочі / свіжа випічка)',
            zh: '新鲜的（新鲜蔬菜、刚出炉的）', vi: 'tươi mới (rau củ tươi, bánh mới nướng)', th: 'สดใหม่ (ผักสด / ขนมปังอบใหม่)', ne: 'ताजा (ताजा तरकारी / भर्खरै पाकेको)', ps: 'تازه (تازه ترکاري / تازه پخه شوې ډوډۍ)'
        },
        ren: {
            en: 'clean / hygienic', de: 'sauber / hygienisch', es: 'limpio / higiénico', pt: 'limpo / higiênico', tr: 'temiz / hijyenik',
            ar: 'نظيف / صحي ومعقّم', fa: 'تمیز / بهداشتی', ku: 'paqij / hîjyenîk', ur: 'صاف ستھرا / حفظانِ صحت کے مطابق', ru: 'чистый / гигиеничный', uk: 'чистий / гігієнічний',
            zh: '干净的 / 卫生的', vi: 'sạch sẽ / hợp vệ sinh', th: 'สะอาด / ถูกสุขอนามัย', ne: 'सफा / स्वच्छ', ps: 'پاک / صحي'
        },
        skarp: {
            en: 'sharp (a sharp knife)', de: 'scharf (ein scharfes Messer)', es: 'afilado (un cuchillo afilado)', pt: 'afiado (uma faca afiada)', tr: 'keskin (keskin bir bıçak)',
            ar: 'حادّ (سكين حاد)', fa: 'تیز (چاقوی تیز)', ku: 'tûj (kêra tûj)', ur: 'تیز دھار (تیز چھری)', ru: 'острый (острый нож)', uk: 'гострий (гострий ніж)',
            zh: '锋利的（锋利的菜刀）', vi: 'sắc bén (con dao sắc)', th: 'คม (มีดที่คมมาก)', ne: 'धारिलो (तिखो चक्कु)', ps: 'تېره (تېره چاړه)'
        },
        serveringsklar: {
            en: 'ready to serve', de: 'servierfertig / bereit zum Servieren', es: 'listo para servir', pt: 'pronto para servir', tr: 'servise hazır',
            ar: 'جاهز للتقديم', fa: 'آماده سرو و پذیرایی', ku: 'amade ji bo servîsê', ur: 'پیش کرنے (سرو کرنے) کے لیے تیار', ru: 'готовый к подаче на стол', uk: 'готовий до подачі на стіл',
            zh: '准备好可以上菜/供应的', vi: 'sẵn sàng để phục vụ', th: 'พร้อมเสิร์ฟ', ne: 'पस्कनका लागि तयार', ps: 'د خوړلو او وړاندې کولو لپاره چمتو'
        },
        grundigt: {
            en: 'thoroughly / carefully in detail', de: 'gründlich / sorgfältig', es: 'a fondo / minuciosamente', pt: 'minuciosamente / bem lavado', tr: 'iyice / titizlikle',
            ar: 'بدقة وعناية تامة', fa: 'به‌طور کامل و بادقت', ku: 'bi باشî û bi hûrgilî', ur: 'مکمل طور پر / اچھی طرح سے', ru: 'тщательно / основательно', uk: 'ретельно / ґрунтовно',
            zh: '彻底地 / 仔细地', vi: 'một cách kỹ lưỡng', th: 'อย่างละเอียดสะอาดหมดจด', ne: 'राम्रोसँग / मिहिनेतसाथ', ps: 'په بشپړ غور او دقت سره'
        },
        forsigtigt: {
            en: 'carefully / cautiously', de: 'vorsichtig', es: 'con cuidado', pt: 'com cuidado', tr: 'dikkatlice',
            ar: 'بحذر وانتباه', fa: 'با احتیاط', ku: 'bi baldarî', ur: 'احتیاط سے', ru: 'осторожно / аккуратно', uk: 'обережно / акуратно',
            zh: '小心地 / 谨慎地', vi: 'một cách cẩn thận', th: 'อย่างระมัดระวัง', ne: 'सावधानीपूर्वक / होसियारीसाथ', ps: 'په احتیاط سره'
        },
        hurtigt: {
            en: 'quickly / fast', de: 'schnell / zügig', es: 'rápidamente / rápido', pt: 'rapidamente / rápido', tr: 'hızlıca / çabuk',
            ar: 'بسرعة', fa: 'به‌سرعت / سریع', ku: 'bi lez / zû', ur: 'تیزی سے / جلدی سے', ru: 'быстро', uk: 'швидко',
            zh: '快速地 / 迅速地', vi: 'một cách nhanh chóng', th: 'อย่างรวดเร็ว', ne: 'छिटो / चाँडो', ps: 'په چټکۍ سره / ژر'
        },
        heldigvis: {
            en: 'fortunately / luckily', de: 'glücklicherweise / zum Glück', es: 'afortunadamente / por suerte', pt: 'felizmente / por sorte', tr: 'neyse ki / şans eseri',
            ar: 'لحسن الحظ', fa: 'خوشبختانه', ku: 'bi xêrê / baş e ku', ur: 'خوش قسمتی سے', ru: 'к счастью', uk: 'на щастя',
            zh: '幸运的是 / 幸好', vi: 'may mắn thay', th: 'โชคดีที่...', ne: 'भाग्यवश / धन्न', ps: 'له نېکه مرغه'
        }
    };

    KITCHEN_WORDS.forEach(item => {
        item.translations = KITCHEN_TRANSLATIONS[item.id] || {};
    });

    // Målord fra de ANDRE flader i "Lær nye ord", som optræder i køkkenhistorierne
    const OTHER_LNO_WORDS = {
        morgen: {
            id: 'morgen',
            word: 'en morgen',
            wordClass: 'substantiv',
            surface: 'De 100 substantiver – Hjemmet & Hverdagen',
            targetView: 'hjemmet_vrimmel',
            icon: '🌅',
            forms: 'en morgen • morgenen • morgener • morgenerne',
            definition: 'Den første del af dagen, når arbejdet i køkkenet begynder.',
            sentence: 'Hver morgen klokken 7 møder Sara ind i storkøkkenet.',
            translations: {
                en: 'a morning', de: 'ein Morgen', es: 'una mañana', pt: 'uma manhã', tr: 'bir sabah',
                ar: 'صباح', fa: 'صبح', ku: 'sibeh', ur: 'صبح', ru: 'утро', uk: 'ранок',
                zh: '早晨 / 早上', vi: 'buổi sáng', th: 'ตอนเช้า', ne: 'बिहान', ps: 'سهار'
            }
        },
        haand: {
            id: 'haand',
            word: 'en hånd (hænder)',
            wordClass: 'substantiv',
            surface: 'De 100 substantiver – Kroppen & Hverdagen',
            targetView: 'hjemmet_vrimmel',
            icon: '👐',
            forms: 'en hånd • hånden • hænder • hænderne',
            definition: 'I et køkken vasker man altid hænder grundigt med vand og sæbe før madlavning.',
            sentence: 'Sara vasker sine hænder grundigt ved håndvasken.',
            translations: {
                en: 'a hand (hands)', de: 'eine Hand (Hände)', es: 'una mano (manos)', pt: 'uma mão (mãos)', tr: 'bir el (eller)',
                ar: 'يد (أيدٍ)', fa: 'دست (دست‌ها)', ku: 'dest', ur: 'ہاتھ', ru: 'рука (руки)', uk: 'рука (руки)',
                zh: '手（双手）', vi: 'bàn tay (đôi tay)', th: 'มือ (ล้างมือ)', ne: 'हात (हातहरू)', ps: 'لاس (لاسونه)'
            }
        },
        vand: {
            id: 'vand',
            word: 'et vand (koldt/varmt vand)',
            wordClass: 'substantiv',
            surface: 'De 100 substantiver – Hjemmet & Køkkenet',
            targetView: 'hjemmet_vrimmel',
            icon: '💧',
            forms: 'vand • vandet (utælleligt et-ord)',
            definition: 'Klar væske fra vandhanen, der bruges til madlavning, skylning af grøntsager og rengøring.',
            sentence: 'Hun skyller porrerne i koldt vand i vasken.',
            translations: {
                en: 'water', de: 'Wasser', es: 'agua', pt: 'água', tr: 'su',
                ar: 'ماء', fa: 'آب', ku: 'av', ur: 'پانی', ru: 'вода', uk: 'вода',
                zh: '水', vi: 'nước', th: 'น้ำสะอาด', ne: 'पानी', ps: 'اوبه'
            }
        },
        bord: {
            id: 'bord',
            word: 'et bord (stålbord)',
            wordClass: 'substantiv',
            surface: 'De 100 substantiver – Hjemmet & Klasse/Kontor',
            targetView: 'hjemmet_vrimmel',
            icon: '🪑',
            forms: 'et bord • bordet • borde • bordene',
            definition: 'Møbel med vandret plade. I et storkøkken arbejder man ved rengøringsvenlige stålborde.',
            sentence: 'Køkkenassistenten spritter stålbordet grundigt af.',
            translations: {
                en: 'a table (stainless worktable)', de: 'ein Tisch (Edelstahltisch)', es: 'una mesa de trabajo', pt: 'uma mesa / bancada', tr: 'bir masa (çelik tezgâh)',
                ar: 'طاولة عمل', fa: 'میز کار استیل', ku: 'mase (maseya pola)', ur: 'میز (اسٹیل کی میز)', ru: 'стол (рабочий стол)', uk: 'стіл (робочий стіл)',
                zh: '桌子（不锈钢工作台）', vi: 'bàn (bàn inox)', th: 'โต๊ะเตรียมอาหารสแตนเลส', ne: 'टेबल (स्टिलको टेबल)', ps: 'مېز (د کار مېز)'
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
            definition: 'Vandret plade i kølerummet eller på lageret, hvor bøtter og råvarer står.',
            sentence: 'De nye varer sættes bagerst på hylden i kølerummet.',
            translations: {
                en: 'a shelf', de: 'ein Regalbrett', es: 'un estante', pt: 'uma prateleira', tr: 'bir raf',
                ar: 'رفّ', fa: 'قفسه', ku: 'ref', ur: 'شیلف / طاق', ru: 'полка', uk: 'полиця',
                zh: '架子 / 搁板', vi: 'cái kệ', th: 'ชั้นวางของ', ne: 'दराजको तख्ता / र्याक', ps: 'المارۍ / تاخچه'
            }
        },
        broed: {
            id: 'broed',
            word: 'et brød',
            wordClass: 'substantiv',
            surface: 'De 100 substantiver – Hjemmet & Mad',
            targetView: 'hjemmet_vrimmel',
            icon: '🍞',
            forms: 'et brød • brødet • brød • brødene',
            definition: 'Bagværk af mel, vand og gær eller surdej – f.eks. rugbrød og grovboller til kantinen.',
            sentence: 'Duften af friskbagt brød breder sig i hele køkkenet.',
            translations: {
                en: 'bread / a loaf of bread', de: 'ein Brot', es: 'un pan', pt: 'um pão', tr: 'ekmek',
                ar: 'خبز', fa: 'نان', ku: 'nan', ur: 'روٹی / ڈبل روٹی', ru: 'хлеб', uk: 'хліб',
                zh: '面包', vi: 'bánh mì', th: 'ขนมปัง', ne: 'रोटी / पाउरोटी', ps: 'ډوډۍ'
            }
        },
        vaske: {
            id: 'vaske',
            word: 'at vaske',
            wordClass: 'verbum',
            surface: 'De 100 verber – Hjemmet & Hverdagen',
            targetView: 'word_learning',
            icon: '🧼',
            forms: 'at vaske • vasker • vaskede • har vasket',
            definition: 'At gøre noget rent med vand og sæbe (f.eks. vaske hænder eller vaske skærebræt).',
            sentence: 'Sara vasker hænder grundigt, før hun tager engangshandsker på.',
            translations: {
                en: 'to wash', de: 'waschen', es: 'lavar', pt: 'lavar', tr: 'yıkamak',
                ar: 'يغسل', fa: 'شستن', ku: 'şûştin', ur: 'دھونا', ru: 'мыть', uk: 'мити',
                zh: '洗 / 清洗', vi: 'rửa / giặt', th: 'ล้างทำความสะอาด', ne: 'धुनु', ps: 'مینځل'
            }
        },
        hente: {
            id: 'hente',
            word: 'at hente',
            wordClass: 'verbum',
            surface: 'De 100 verber – Hverdagens handlinger',
            targetView: 'verber_byrum',
            icon: '🚶‍♀️',
            forms: 'at hente • henter • hentede • har hentet',
            definition: 'At gå ind i kølerummet eller køkkenet for at tage råvarer eller et nyt fad med tilbage.',
            sentence: 'Hun henter hurtigt et nyt fad med salat til buffeten.',
            translations: {
                en: 'to fetch / to get', de: 'holen', es: 'traer / ir a buscar', pt: 'buscar / pegar', tr: 'gidip getirmek / almak',
                ar: 'يُحضر / يجلب', fa: 'آوردن', ku: 'anîn', ur: 'لے کر آنا', ru: 'приносить / забирать', uk: 'приносити / забирати',
                zh: '去取 / 拿来', vi: 'đi lấy / mang ra', th: 'ไปหยิบมา / ไปเอามา', ne: 'लिन जानु / ल्याउनु', ps: 'راوړل'
            }
        },
        varm: {
            id: 'varm',
            word: 'varm',
            wordClass: 'adjektiv',
            surface: 'De 100 adjektiver – Temperatur & Tilstand',
            targetView: 'adjektiver_intro',
            icon: '🔥',
            forms: 'varm (en) • varmt (et) • varme (flertal/bestemt)',
            definition: 'Med høj temperatur (f.eks. varm suppe eller en varm bageplade fra ovnen).',
            sentence: 'Pas på! Bagepladen fra industriovnen er meget varm.',
            translations: {
                en: 'hot / warm', de: 'heiß / warm', es: 'caliente', pt: 'quente', tr: 'sıcak',
                ar: 'ساخن / دافئ', fa: 'داغ / گرم', ku: 'germ', ur: 'گرم', ru: 'горячий / тёплый', uk: 'гарячий / теплий',
                zh: '热的 / 烫的', vi: 'nóng / ấm', th: 'ร้อน / อุ่น', ne: 'तातो', ps: 'تود / ګرم'
            }
        },
        kold: {
            id: 'kold',
            word: 'kold',
            wordClass: 'adjektiv',
            surface: 'De 100 adjektiver – Temperatur & Tilstand',
            targetView: 'adjektiver_intro',
            icon: '🧊',
            forms: 'kold (en) • koldt (et) • kolde (flertal/bestemt)',
            definition: 'Med lav temperatur – mælk, fisk og kød skal altid holdes kolde i kølerummet.',
            sentence: 'I kølerummet er der altid koldt (under 5 grader).',
            translations: {
                en: 'cold', de: 'kalt', es: 'frío', pt: 'frio', tr: 'soğuk',
                ar: 'بارد', fa: 'سرد', ku: 'sar', ur: 'ٹھنڈا', ru: 'холодный', uk: 'холодний',
                zh: '冷的 / 冰凉的', vi: 'lạnh', th: 'เย็น', ne: 'चिसो', ps: 'سوړ / یخ'
            }
        }
    };
    // Finjuster koordinater så alle 32 pegefelter sidder præcist på illustrationen
    const EXACT_COORDS = {
        koekkenassistent: { x: 40, y: 36 },
        kok: { x: 60, y: 26 },
        skaerebraet: { x: 38, y: 56 },
        kokkekniv: { x: 43, y: 53 },
        gryde: { x: 59, y: 50 },
        industriovn: { x: 76, y: 28 },
        bageplade: { x: 82, y: 38 },
        koelerum: { x: 10, y: 28 },
        opvaskemaskine: { x: 17, y: 67 },
        roeremaskine: { x: 70, y: 60 },
        forklaede: { x: 40, y: 44 },
        engangshandske: { x: 39, y: 49 },
        raavare: { x: 29, y: 88 },
        datomaerkning: { x: 28, y: 12 },
        affaldsspand: { x: 6, y: 84 },
        buffet: { x: 89, y: 76 },
        skraelle: { x: 20, y: 46 },
        snitte: { x: 45, y: 55 },
        roere: { x: 56, y: 43 },
        bage: { x: 82, y: 29 },
        vaske_op: { x: 15, y: 62 },
        spritte_af: { x: 46, y: 64 },
        anrette: { x: 82, y: 83 },
        smage_til: { x: 62, y: 31 },
        frisk: { x: 24, y: 85 },
        ren: { x: 39, y: 69 },
        skarp: { x: 48, y: 29 },
        serveringsklar: { x: 93, y: 70 },
        grundigt: { x: 6, y: 58 },
        forsigtigt: { x: 84, y: 42 },
        hurtigt: { x: 96, y: 81 },
        heldigvis: { x: 96, y: 28 }
    };
    KITCHEN_WORDS.forEach(w => {
        if (EXACT_COORDS[w.id]) {
            w.x = EXACT_COORDS[w.id].x;
            w.y = EXACT_COORDS[w.id].y;
        }
    });

    // Quick-Peek & Oversættelses-modal til målord fra "Køkkenassistent" og "Lær nye ord"
    function openKitchenWordModal(item, isFromOtherLno = false) {
        const existing = document.querySelector('.kk-word-modal-overlay');
        if (existing) existing.remove();

        const meta = CLASS_META[item.wordClass] || CLASS_META.substantiv;
        let currentLang = getPreferredTransLang();
        const transMap = item.translations || {};

        const overlay = document.createElement('div');
        overlay.className = 'kk-word-modal-overlay';
        overlay.style.cssText = 'position:fixed; inset:0; background:rgba(2,6,23,0.82); backdrop-filter:blur(6px); z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:#0f172a; border:1.5px solid rgba(34,197,94,0.45); border-radius:22px; max-width:540px; width:100%; overflow:hidden; box-shadow:0 24px 50px rgba(0,0,0,0.65); color:#f8fafc;';

        const sourceBadgeText = isFromOtherLno
            ? `📚 Målord fra "${item.surface}"`
            : `👩‍🍳 Målord #${item.num} fra Storkøkkenet • ${meta.label}`;

        const cropHtml = !isFromOtherLno && item.x !== undefined
            ? `<div style="height:155px; width:100%; background-image:url('assets/koekkenassistent_vrimmel.jpg'); background-size:280%; background-position:${item.x}% ${item.y}%; position:relative; border-bottom:1px solid rgba(255,255,255,0.1);">
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
                <span style="font-size:0.8rem; font-weight:800; color:#4ade80;">${sourceBadgeText}</span>
                <button id="kk-modal-close" style="background:rgba(255,255,255,0.1); color:white; border:none; width:30px; height:30px; border-radius:50%; font-weight:800; cursor:pointer;">✕</button>
            </div>
            ${cropHtml}
            <div style="padding:1.25rem 1.35rem 1.4rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.3rem;">
                    <div style="font-size:1.55rem; font-weight:800; color:white;">${item.icon || '🔹'} ${item.word}</div>
                    <button id="kk-modal-speak" style="background:#2563eb; color:white; border:none; padding:0.45rem 0.95rem; border-radius:20px; font-weight:700; font-size:0.85rem; cursor:pointer;">🔊 Lyt til udtale</button>
                </div>
                <div style="font-size:0.85rem; color:#94a3b8; margin-bottom:0.85rem;">${item.forms || ''}</div>

                <div style="background:rgba(34,197,94,0.12); border:1.5px solid #16a34a; border-radius:14px; padding:0.9rem 1rem; margin-bottom:0.9rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.45rem;">
                        <span style="font-size:0.78rem; font-weight:800; color:#4ade80; text-transform:uppercase;">🌍 Oversættelse (Hjælp til betydning):</span>
                        <select id="kk-modal-lang-select" style="background:#0f172a; color:#f8fafc; border:1px solid #22c55e; border-radius:8px; padding:0.25rem 0.55rem; font-size:0.8rem; font-weight:700; cursor:pointer;">
                            ${langOptionsHtml}
                        </select>
                    </div>
                    <div id="kk-modal-trans-text" style="font-size:1.25rem; font-weight:800; color:#f8fafc;">
                        ${transMap[currentLang] || transMap.en || item.word}
                    </div>
                </div>

                <div style="background:rgba(15,23,42,0.85); border-left:4px solid #22c55e; padding:0.75rem 0.95rem; border-radius:8px; margin-bottom:0.65rem; font-size:0.94rem; color:#e2e8f0; line-height:1.45;">
                    <strong>📖 Dansk forklaring:</strong> ${item.definition}
                </div>

                ${item.fixedTerms ? `
                <div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); padding:0.6rem 0.9rem; border-radius:8px; margin-bottom:0.65rem; font-size:0.85rem; color:#fde68a;">
                    <strong>👩‍🍳 Faste køkkenudtryk:</strong> ${item.fixedTerms}
                </div>` : ''}

                <div style="font-style:italic; color:#cbd5e1; font-size:0.92rem; margin-bottom:1.1rem;">
                    "💬 ${item.sentence}"
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem; flex-wrap:wrap;">
                    ${!isFromOtherLno ? `
                        <button id="kk-modal-goto-vrimmel" style="background:#1e293b; color:#4ade80; border:1px solid #22c55e; padding:0.6rem 1rem; border-radius:10px; font-weight:700; font-size:0.85rem; cursor:pointer;">
                            🔍 Se på vrimlebilledet (Forsiden)
                        </button>
                    ` : `
                        <button id="kk-modal-goto-lno" style="background:#1e293b; color:#c084fc; border:1px solid #a855f7; padding:0.6rem 1rem; border-radius:10px; font-weight:700; font-size:0.85rem; cursor:pointer;">
                            ↗️ Åbn "${item.surface}"
                        </button>
                    `}
                    <button id="kk-modal-continue" style="background:#22c55e; color:#0f172a; border:none; padding:0.65rem 1.25rem; border-radius:10px; font-weight:800; font-size:0.9rem; cursor:pointer;">
                        Fortsæt læsningen ➔
                    </button>
                </div>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const close = () => overlay.remove();
        modal.querySelector('#kk-modal-close').onclick = close;
        modal.querySelector('#kk-modal-continue').onclick = close;
        overlay.onclick = (e) => { if (e.target === overlay) close(); };
        modal.querySelector('#kk-modal-speak').onclick = () => speakDanish(item.word);

        const langSel = modal.querySelector('#kk-modal-lang-select');
        const transOut = modal.querySelector('#kk-modal-trans-text');
        langSel.onchange = () => {
            currentLang = langSel.value;
            setPreferredTransLang(currentLang);
            transOut.textContent = transMap[currentLang] || transMap.en || item.word;
        };

        const gotoVrimmelBtn = modal.querySelector('#kk-modal-goto-vrimmel');
        if (gotoVrimmelBtn) {
            gotoVrimmelBtn.onclick = () => {
                close();
                switchTab('tab_vrimmel');
                selectWordItem(item);
            };
        }

        const gotoLnoBtn = modal.querySelector('#kk-modal-goto-lno');
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
        .koekken-view {
            max-width: 1220px;
            margin: 0 auto;
            padding: 1rem 1.2rem 4rem;
            color: #f8fafc;
        }
        .kk-hero-header {
            text-align: center;
            margin-bottom: 1.6rem;
        }
        .kk-hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #4ade80;
            padding: 0.35rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            margin-bottom: 0.6rem;
        }
        .kk-hero-header h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #4ade80, #38bdf8, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .kk-hero-header p {
            color: #94a3b8;
            font-size: 1.05rem;
            max-width: 780px;
            margin: 0 auto;
            line-height: 1.5;
        }
        .kk-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
            justify-content: center;
            margin-bottom: 1.8rem;
        }
        .kk-tab-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1.5px solid rgba(255, 255, 255, 0.14);
            color: #cbd5e1;
            padding: 0.7rem 1.15rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .kk-tab-btn:hover {
            border-color: #22c55e;
            color: white;
            transform: translateY(-2px);
        }
        .kk-tab-btn.active {
            background: linear-gradient(135deg, #16a34a, #15803d);
            border-color: #4ade80;
            color: white;
            box-shadow: 0 8px 20px rgba(22, 163, 74, 0.35);
        }
        .kk-panel {
            display: none;
            animation: kkFadeIn 0.3s ease;
        }
        .kk-panel.active {
            display: block;
        }
        @keyframes kkFadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .kk-vrimmel-card {
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 22px;
            padding: 1.2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }
        .kk-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-bottom: 1rem;
            padding-bottom: 0.85rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .kk-filter-group {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
        }
        .kk-filter-btn {
            background: #1e293b;
            color: #cbd5e1;
            border: 1.5px solid #475569;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
        }
        .kk-filter-btn.active {
            background: #0f172a;
            color: white;
            border-color: #4ade80;
            box-shadow: 0 0 10px rgba(74, 222, 128, 0.35);
        }
        .kk-tools-right {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            flex-wrap: wrap;
        }
        .kk-zoom-btn, .kk-pure-btn {
            background: #1e293b;
            color: #f1f5f9;
            border: 1.5px solid #64748b;
            padding: 0.42rem 0.85rem;
            border-radius: 20px;
            font-weight: 700;
            font-size: 0.82rem;
            cursor: pointer;
        }
        .kk-zoom-btn.active, .kk-pure-btn.active {
            background: #16a34a;
            border-color: #4ade80;
            color: white;
        }
        .kk-stage-viewport {
            width: 100%;
            overflow: auto;
            border-radius: 16px;
            border: 2px solid rgba(255, 255, 255, 0.14);
            background: #090d16;
            max-height: 72vh;
            position: relative;
        }
        .kk-stage {
            position: relative;
            width: 100%;
            transform-origin: top left;
            transition: width 0.25s ease;
        }
        .kk-stage.zoom-15x { width: 150%; }
        .kk-stage.zoom-2x { width: 200%; }
        .kk-img {
            width: 100%;
            display: block;
            border-radius: 14px;
            user-select: none;
        }
        .kk-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            color: #ffffff;
            font-weight: 800;
            font-size: 0.72rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.65);
            transition: transform 0.18s ease, box-shadow 0.18s ease;
            z-index: 5;
            padding: 0;
        }
        .kk-hotspot.hs-substantiv { background: rgba(22, 163, 74, 0.92); }
        .kk-hotspot.hs-verbum { background: rgba(220, 38, 38, 0.92); }
        .kk-hotspot.hs-adjektiv { background: rgba(234, 88, 12, 0.92); }
        .kk-hotspot.hs-adverbium { background: rgba(2, 132, 199, 0.92); }
        .kk-hotspot:hover, .kk-hotspot.active {
            transform: translate(-50%, -50%) scale(1.38);
            z-index: 20;
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.35), 0 6px 14px rgba(0,0,0,0.8);
        }
        .kk-stage.pure-mode .kk-hotspot {
            opacity: 0;
            pointer-events: none;
        }
        @media (max-width: 680px) {
            .kk-hotspot {
                width: 19px;
                height: 19px;
                font-size: 0.6rem;
                border-width: 1.5px;
            }
        }
        .kk-detail-card {
            margin-top: 1.1rem;
            background: linear-gradient(145deg, #1e293b, #0f172a);
            border: 1.5px solid rgba(74, 222, 128, 0.35);
            border-radius: 18px;
            padding: 1.25rem 1.4rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        .kk-badge-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            align-items: center;
            margin-bottom: 0.45rem;
        }
        .kk-class-badge {
            padding: 0.22rem 0.65rem;
            border-radius: 12px;
            font-size: 0.76rem;
            font-weight: 800;
            text-transform: uppercase;
        }
        .kk-def-box {
            background: rgba(15, 23, 42, 0.7);
            border-left: 3px solid #22c55e;
            padding: 0.65rem 0.9rem;
            border-radius: 8px;
            margin: 0.55rem 0;
            color: #e2e8f0;
            font-size: 0.95rem;
            line-height: 1.45;
        }
        .kk-terms-box {
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.3);
            padding: 0.5rem 0.85rem;
            border-radius: 8px;
            font-size: 0.88rem;
            color: #fde68a;
            margin-bottom: 0.5rem;
        }
        .kk-quick-words-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-top: 1rem;
            max-height: 170px;
            overflow-y: auto;
            padding: 0.5rem;
            background: rgba(15, 23, 42, 0.6);
            border-radius: 12px;
        }
        .kk-word-pill {
            background: #1e293b;
            border: 1px solid #334155;
            color: #cbd5e1;
            padding: 0.32rem 0.7rem;
            border-radius: 14px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
        }
        .kk-word-pill.active {
            background: #16a34a;
            color: white;
            border-color: #4ade80;
        }
        .kk-sorting-box {
            margin-top: 2rem;
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1.5rem;
        }
        .kk-bins-4 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 1rem;
            margin-bottom: 1.2rem;
        }
        .kk-sort-bin {
            border-radius: 14px;
            padding: 1rem;
            min-height: 145px;
            cursor: pointer;
            transition: all 0.2s;
            border: 2px dashed rgba(255,255,255,0.25);
        }
        .kk-dialog-card {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(30, 41, 59, 0.72);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            padding: 1.8rem;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
        .kk-dialog-slot {
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
        }
        .kk-dialog-slot.filled {
            border-style: solid;
            border-color: #38bdf8;
            background: #1e293b;
        }
        .kk-dialog-slot.correct-slot {
            border-color: #22c55e !important;
            background: rgba(34, 197, 94, 0.14) !important;
        }
        .kk-dialog-slot.wrong-slot {
            border-color: #ef4444 !important;
            background: rgba(239, 68, 68, 0.14) !important;
        }
        .kk-dialog-line-btn {
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
            font-size: 0.98rem;
            line-height: 1.45;
        }
        .kk-dialog-line-btn.placed {
            opacity: 0.3;
            pointer-events: none;
        }
        .kk-speaker-tag {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            margin-right: 0.5rem;
            white-space: nowrap;
        }
        .speaker-assistent { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); }
        .speaker-kok { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
        .speaker-kollega { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }
        .speaker-gaest { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
    `;
    viewContainer.appendChild(style);

    // Hero Header (uden procent-angivelser)
    const heroHeader = document.createElement('div');
    heroHeader.className = 'kk-hero-header';
    heroHeader.innerHTML = `
        <div class="kk-hero-badge">${getTranslation('arbejde_koekken_badge', '👩‍🍳 Mit hverdagsliv • Arbejde: Storkøkken & Kantine')}</div>
        <h1>${getTranslation('arbejde_koekken_title', '🥗 Som køkkenassistent')}</h1>
        <p>${getTranslation('arbejde_koekken_desc', 'Udforsk hverdagen i et dansk storkøkken og kantine med 32 målord, hygiejneudtryk, historier, dialoger og taletræning til dine første 3 måneder.')}</p>
    `;
    viewContainer.appendChild(heroHeader);

    // 7 Tabs Navigation
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'kk-tabs';
    const tabs = [
        { id: 'tab_vrimmel', label: getTranslation('arbejde_tab_vrimmel', '1. Vrimlebillede'), icon: '🔍' },
        { id: 'tab_detektiv', label: getTranslation('arbejde_tab_detektiv', '2. Ord-detektiv'), icon: '🕵️' },
        { id: 'tab_syn_ant', label: getTranslation('arbejde_tab_synonymer', '3. Synonymer & Antonymer'), icon: '🔄' },
        { id: 'tab_historie', label: getTranslation('arbejde_tab_historier', '4. Historier'), icon: '📖' },
        { id: 'tab_saetning', label: getTranslation('arbejde_tab_saetninger', '5. Sætningsbygning'), icon: '✍️' },
        { id: 'tab_dialog', label: getTranslation('arbejde_tab_dialoger', '6. Mundtlige dialoger'), icon: '💬' },
        { id: 'tab_udtale', label: getTranslation('arbejde_tab_betoning', '7. Sig det højt (Betoning)'), icon: '🎙️' }
    ];

    let currentTab = extraData?.subPath && tabs.some(t => t.id === extraData.subPath)
        ? extraData.subPath
        : 'tab_vrimmel';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `kk-tab-btn ${t.id === currentTab ? 'active' : ''}`;
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
        history.pushState(null, '', `#/${lang}/mit_hverdagsliv_arbejde_koekken/${tabId}`);
        tabsMenu.querySelectorAll('.kk-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.kk-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ========================================================
    // --- TAB 1: VRIMLEBILLEDE + SORTERING ---
    // ========================================================
    const vrimmelPanel = document.createElement('div');
    vrimmelPanel.className = `kk-panel ${currentTab === 'tab_vrimmel' ? 'active' : ''}`;
    vrimmelPanel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'kk-vrimmel-card';

    const toolbar = document.createElement('div');
    toolbar.className = 'kk-toolbar';

    const filterGroup = document.createElement('div');
    filterGroup.className = 'kk-filter-group';
    const filters = [
        { key: 'all', label: getTranslation('arbejde_filter_all', 'Alle 32 målord') },
        { key: 'substantiv', label: `${getTranslation('arbejde_filter_sub', '🟢 Substantiver')} (16)` },
        { key: 'verbum', label: `${getTranslation('arbejde_filter_vrb', '🔴 Verber')} (8)` },
        { key: 'adjektiv', label: `${getTranslation('arbejde_filter_adj', '🟠 Adjektiver')} (4)` },
        { key: 'adverbium', label: `${getTranslation('arbejde_filter_adv', '🔵 Adverbier')} (4)` }
    ];

    let activeWordClassFilter = 'all';

    filters.forEach(f => {
        const fb = document.createElement('button');
        fb.className = `kk-filter-btn ${f.key === 'all' ? 'active' : ''}`;
        fb.textContent = f.label;
        fb.onclick = () => {
            activeWordClassFilter = f.key;
            filterGroup.querySelectorAll('.kk-filter-btn').forEach(b => b.classList.remove('active'));
            fb.classList.add('active');
            stage.querySelectorAll('.kk-hotspot').forEach(hs => {
                const match = f.key === 'all' || hs.dataset.wordclass === f.key;
                hs.style.display = match ? 'flex' : 'none';
            });
        };
        filterGroup.appendChild(fb);
    });
    toolbar.appendChild(filterGroup);

    const toolsRight = document.createElement('div');
    toolsRight.className = 'kk-tools-right';

    [
        { label: getTranslation('arbejde_zoom_1', '🔍 1x'), cls: '' },
        { label: getTranslation('arbejde_zoom_15', '🔍 1.5x'), cls: 'zoom-15x' },
        { label: getTranslation('arbejde_zoom_2', '🔍 2x (Mobil)'), cls: 'zoom-2x' }
    ].forEach((z, idx) => {
        const zb = document.createElement('button');
        zb.className = `kk-zoom-btn ${idx === 0 ? 'active' : ''}`;
        zb.textContent = z.label;
        zb.onclick = () => {
            toolsRight.querySelectorAll('.kk-zoom-btn').forEach(b => b.classList.remove('active'));
            zb.classList.add('active');
            stage.classList.remove('zoom-15x', 'zoom-2x');
            if (z.cls) stage.classList.add(z.cls);
        };
        toolsRight.appendChild(zb);
    });

    const pureBtn = document.createElement('button');
    pureBtn.className = 'kk-pure-btn';
    let isPure = false;
    pureBtn.innerHTML = getTranslation('arbejde_pure_btn_show', '🖼️ Vis rent billede');
    pureBtn.onclick = () => {
        isPure = !isPure;
        stage.classList.toggle('pure-mode', isPure);
        pureBtn.classList.toggle('active', isPure);
        pureBtn.innerHTML = isPure
            ? getTranslation('arbejde_pure_btn_hide', '🔢 Vis alle 32 tal')
            : getTranslation('arbejde_pure_btn_show', '🖼️ Vis rent billede');
    };
    toolsRight.appendChild(pureBtn);
    toolbar.appendChild(toolsRight);
    vrimmelCard.appendChild(toolbar);

    const viewport = document.createElement('div');
    viewport.className = 'kk-stage-viewport';

    const stage = document.createElement('div');
    stage.className = 'kk-stage';

    const img = document.createElement('img');
    img.src = 'assets/koekkenassistent_vrimmel.jpg';
    img.alt = 'Som køkkenassistent i storkøkkenet vrimlebillede';
    img.className = 'kk-img';
    stage.appendChild(img);

    const detailBox = document.createElement('div');
    detailBox.className = 'kk-detail-card';

    const quickBar = document.createElement('div');
    quickBar.className = 'kk-quick-words-bar';

    function selectWordItem(item) {
        stage.querySelectorAll('.kk-hotspot').forEach(h => {
            h.classList.toggle('active', h.dataset.id === item.id);
        });
        quickBar.querySelectorAll('.kk-word-pill').forEach(p => {
            p.classList.toggle('active', p.dataset.id === item.id);
        });

        const meta = CLASS_META[item.wordClass];
        const genderBadge = item.gender
            ? `<span class="kk-class-badge" style="background:${item.gender === 'en' ? 'rgba(56,189,248,0.2)' : 'rgba(249,115,22,0.2)'}; color:${item.gender === 'en' ? '#38bdf8' : '#fb923c'}; border:1px solid ${item.gender === 'en' ? '#0284c7' : '#ea580c'};">${item.gender === 'en' ? getTranslation('arbejde_gender_en', 'EN-ORD') : getTranslation('arbejde_gender_et', 'ET-ORD')}</span>`
            : '';
        const coreBadge = item.isCore
            ? `<span class="kk-class-badge" style="background:rgba(168,85,247,0.2); color:#d8b4fe; border:1px solid #a855f7;">${getTranslation('arbejde_core_badge', '⭐ Kerneord')}</span>`
            : `<span class="kk-class-badge" style="background:rgba(20,184,166,0.2); color:#5eead4; border:1px solid #14b8a6;">${getTranslation('arbejde_pro_badge', '👩‍🍳 Fagterm i køkkenet')}</span>`;

        detailBox.innerHTML = `
            <div style="flex: 1; min-width: 260px;">
                <div class="kk-badge-row">
                    <span class="kk-class-badge" style="background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.color};">#${item.num} • ${meta.label}</span>
                    ${genderBadge}
                    ${coreBadge}
                </div>
                <div style="font-size: 1.65rem; font-weight: 800; color: white; margin-bottom: 0.25rem;">
                    ${item.icon} ${item.word}
                </div>
                <div style="font-size: 0.9rem; color: #94a3b8; margin-bottom: 0.4rem;">
                    ${item.forms}
                </div>
                <div class="kk-def-box">
                    <strong>${getTranslation('arbejde_meaning_label', '📖 Betydning:')}</strong> ${item.definition}
                </div>
                <div class="kk-terms-box">
                    <strong>${getTranslation('arbejde_fixed_terms_label', '👩‍🍳 Faste køkkenudtryk:')}</strong> ${item.fixedTerms}
                </div>
                <div style="font-size: 1.05rem; color: #f8fafc; font-style: italic; margin-top: 0.4rem;">
                    "💬 ${item.sentence}"
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-start;">
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button class="listen-word-btn" id="kk-listen-word" style="background:#2563eb; color:white; border:none; padding:0.7rem 1.2rem; border-radius:12px; font-weight:700; cursor:pointer;">
                        ${getTranslation('arbejde_listen_word', '🔊 Lyt til ordet')}
                    </button>
                    <button class="listen-word-btn" id="kk-listen-sentence" style="background:#0f172a; color:#38bdf8; border:1.5px solid #0284c7; padding:0.7rem 1.2rem; border-radius:12px; font-weight:700; cursor:pointer;">
                        ${getTranslation('arbejde_listen_sentence', '🔊 Lyt til sætning')}
                    </button>
                    <button class="listen-word-btn" id="kk-show-trans" style="background:rgba(34,197,94,0.16); color:#4ade80; border:1.5px solid #22c55e; padding:0.7rem 1.1rem; border-radius:12px; font-weight:700; cursor:pointer;">
                        ${getTranslation('arbejde_show_translation', '🌍 Vis oversættelse')}
                    </button>
                </div>
            </div>
        `;

        detailBox.querySelector('#kk-listen-word').onclick = () => speakDanish(item.word);
        detailBox.querySelector('#kk-listen-sentence').onclick = () => speakDanish(item.sentence);
        detailBox.querySelector('#kk-show-trans').onclick = () => openKitchenWordModal(item, false);
    }

    KITCHEN_WORDS.forEach(item => {
        const spot = document.createElement('button');
        spot.type = 'button';
        spot.className = `kk-hotspot hs-${item.wordClass}`;
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
        pill.className = 'kk-word-pill';
        pill.dataset.id = item.id;
        pill.style.borderLeft = `3px solid ${CLASS_META[item.wordClass].color}`;
        pill.textContent = `${item.num}. ${item.word}`;
        pill.onclick = () => {
            selectWordItem(item);
            speakDanish(item.word);
        };
        quickBar.appendChild(pill);
    });

    selectWordItem(KITCHEN_WORDS[0]);

    viewport.appendChild(stage);
    vrimmelCard.appendChild(viewport);
    vrimmelCard.appendChild(detailBox);
    vrimmelCard.appendChild(quickBar);
    vrimmelPanel.appendChild(vrimmelCard);

    // --- 4-KATEGORIS ORDKLASSE-SORTERING ---
    const sortingBox = document.createElement('div');
    sortingBox.className = 'kk-sorting-box';

    let sortPlacedCount = 0;
    let selectedSortItem = null;

    const sortHeader = document.createElement('div');
    sortHeader.style.cssText = 'display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;';
    sortHeader.innerHTML = `
        <div>
            <h3 style="margin:0; font-size:1.25rem;">📦 Sorter køkkenets 32 målord i de 4 ordklasser</h3>
            <p style="margin:0.25rem 0 0; color:#94a3b8; font-size:0.92rem;">Klik på et ord i banken og læg det i den rigtige ordklasse-kasse.</p>
        </div>
        <div style="display:flex; gap:0.6rem; align-items:center;">
            <span id="kk-sort-progress" style="background:rgba(34,197,94,0.2); color:#4ade80; border:1px solid #16a34a; padding:0.4rem 0.9rem; border-radius:20px; font-weight:800; font-size:0.88rem;">0 / ${KITCHEN_WORDS.length} placeret</span>
            <button id="kk-sort-reset" style="background:#334155; color:white; border:none; padding:0.45rem 0.9rem; border-radius:10px; font-weight:700; cursor:pointer;">🔄 Nulstil</button>
        </div>
    `;
    sortingBox.appendChild(sortHeader);

    const binsGrid = document.createElement('div');
    binsGrid.className = 'kk-bins-4';

    const binDefs = [
        { key: 'substantiv', title: '🟢 Substantiver (16)', sub: 'Redskaber, personer & steder (en/et)', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { key: 'verbum', title: '🔴 Verber (8)', sub: 'Handlinger i køkkenet (at...)', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
        { key: 'adjektiv', title: '🟠 Adjektiver (4)', sub: 'Hvordan er råvaren/udstyret?', color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)' },
        { key: 'adverbium', title: '🔵 Adverbier (4)', sub: 'Hvordan foregår arbejdet? / Holdning', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.1)' }
    ];

    const binListEls = {};
    binDefs.forEach(bd => {
        const bin = document.createElement('div');
        bin.className = 'kk-sort-bin';
        bin.style.background = bd.bg;
        bin.style.borderColor = bd.color;
        bin.innerHTML = `
            <div style="font-weight:800; font-size:1.05rem; color:${bd.color}; margin-bottom:0.2rem;">${bd.title}</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin-bottom:0.7rem;">${bd.sub}</div>
            <div class="kk-bin-items" style="display:flex; flex-wrap:wrap; gap:0.4rem;"></div>
        `;
        binListEls[bd.key] = bin.querySelector('.kk-bin-items');

        bin.onclick = () => {
            if (!selectedSortItem) return;
            if (selectedSortItem.wordClass === bd.key) {
                const chip = document.createElement('span');
                chip.style.cssText = `background:#0f172a; color:white; border:1px solid ${bd.color}; padding:0.25rem 0.6rem; border-radius:8px; font-size:0.82rem; font-weight:700;`;
                chip.textContent = selectedSortItem.word;
                binListEls[bd.key].appendChild(chip);

                sortPlacedCount++;
                sortingBox.querySelector('#kk-sort-progress').textContent = `${sortPlacedCount} / ${KITCHEN_WORDS.length} placeret`;
                const btnEl = sortBank.querySelector(`[data-sort-id="${selectedSortItem.id}"]`);
                if (btnEl) {
                    btnEl.style.opacity = '0.25';
                    btnEl.style.pointerEvents = 'none';
                }
                speakDanish(selectedSortItem.word);
                selectedSortItem = null;
            } else {
                bin.style.transform = 'scale(0.97)';
                setTimeout(() => { bin.style.transform = ''; }, 200);
            }
        };
        binsGrid.appendChild(bin);
    });
    sortingBox.appendChild(binsGrid);

    const sortBank = document.createElement('div');
    sortBank.style.cssText = 'display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center; padding:1rem; background:#0f172a; border-radius:14px;';

    function buildSortBank() {
        sortBank.innerHTML = '';
        sortPlacedCount = 0;
        selectedSortItem = null;
        Object.values(binListEls).forEach(el => { el.innerHTML = ''; });
        sortingBox.querySelector('#kk-sort-progress').textContent = `0 / ${KITCHEN_WORDS.length} placeret`;

        shuffleArray([...KITCHEN_WORDS]).forEach(w => {
            const wb = document.createElement('button');
            wb.type = 'button';
            wb.dataset.sortId = w.id;
            wb.style.cssText = 'background:#1e293b; color:#f1f5f9; border:1.5px solid #475569; padding:0.45rem 0.85rem; border-radius:10px; font-weight:700; font-size:0.88rem; cursor:pointer;';
            wb.textContent = `${w.icon} ${w.word}`;
            wb.onclick = () => {
                selectedSortItem = w;
                sortBank.querySelectorAll('button').forEach(b => {
                    b.style.borderColor = '#475569';
                    b.style.background = '#1e293b';
                });
                wb.style.borderColor = '#4ade80';
                wb.style.background = '#16a34a';
            };
            sortBank.appendChild(wb);
        });
    }
    buildSortBank();
    sortingBox.querySelector('#kk-sort-reset').onclick = buildSortBank;
    sortingBox.appendChild(sortBank);
    vrimmelPanel.appendChild(sortingBox);
    panelsHolder.appendChild(vrimmelPanel);

    // ========================================================
    // --- TAB 2: ORD-DETEKTIV (10 MISSIONER I KØKKENET) ---
    // ========================================================
    const detektivPanel = document.createElement('div');
    detektivPanel.className = `kk-panel ${currentTab === 'tab_detektiv' ? 'active' : ''}`;
    detektivPanel.dataset.panel = 'tab_detektiv';

    const DETEKTIV_MISSIONS = [
        {
            targetId: 'skaerebraet',
            clue: '🕵️ Mission 1 (🟢 Substantiv): Find den grønne plade på stålbordet, som køkkenassistenten snitter friske grøntsager på!'
        },
        {
            targetId: 'spritte_af',
            clue: '🕵️ Mission 2 (🔴 Verbum): Hvor bliver stålbordet i forgrunden vasket og sprittet af med spray og blå klud?'
        },
        {
            targetId: 'skarp',
            clue: '🕵️ Mission 3 (🟠 Adjektiv): Find knivene på magnetlisten på væggen, som altid er meget skarpe!'
        },
        {
            targetId: 'forsigtigt',
            clue: '🕵️ Mission 4 (🔵 Adverbium): Hvor tager en medarbejder den varme bageplade forsigtigt ud af industriovnen med handsker?'
        },
        {
            targetId: 'koelerum',
            clue: '🕵️ Mission 5 (🟢 Substantiv): Find det store kølerum med glasrude til venstre, hvor varerne står koldt!'
        },
        {
            targetId: 'smage_til',
            clue: '🕵️ Mission 6 (🔴 Verbum): Hvor står kokken med kokkehue og smager suppen til med en ren ske?'
        },
        {
            targetId: 'datomaerkning',
            clue: '🕵️ Mission 7 (🟢 Fagterm): Find bøtterne på hylden øverst til venstre, som har hvid datomærkning (label) på!'
        },
        {
            targetId: 'vaske_op',
            clue: '🕵️ Mission 8 (🔴 Verbum): Hvor bliver de hvide tallerkener vasket op i industri-opvaskemaskinen?'
        },
        {
            targetId: 'serveringsklar',
            clue: '🕵️ Mission 9 (🟠 Adjektiv): Find de lune retter i kantinens buffet, som står helt serveringsklare til gæsterne!'
        },
        {
            targetId: 'grundigt',
            clue: '🕵️ Mission 10 (🔵 Adverbium): Find håndvasken med sæbe til venstre, hvor man vasker sine hænder grundigt!'
        }
    ];

    let detIdx = 0;
    let detScore = 0;

    const detCard = document.createElement('div');
    detCard.className = 'kk-vrimmel-card';

    const detTop = document.createElement('div');
    detTop.style.cssText = 'background:#1e293b; border:1.5px solid #22c55e; border-radius:16px; padding:1.1rem 1.3rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;';

    const detClueEl = document.createElement('div');
    detClueEl.style.cssText = 'font-size:1.12rem; font-weight:700; color:white; flex:1; min-width:240px;';

    const detStatusEl = document.createElement('div');
    detStatusEl.style.cssText = 'background:rgba(34,197,94,0.18); color:#4ade80; border:1px solid #22c55e; padding:0.4rem 0.95rem; border-radius:20px; font-weight:800;';

    detTop.appendChild(detClueEl);
    detTop.appendChild(detStatusEl);
    detCard.appendChild(detTop);

    const detFeedback = document.createElement('div');
    detFeedback.style.cssText = 'min-height:36px; margin-bottom:0.8rem; font-weight:800; text-align:center; font-size:1.05rem;';
    detCard.appendChild(detFeedback);

    const detViewport = document.createElement('div');
    detViewport.className = 'kk-stage-viewport';
    const detStage = document.createElement('div');
    detStage.className = 'kk-stage';

    const detImg = document.createElement('img');
    detImg.src = 'assets/koekkenassistent_vrimmel.jpg';
    detImg.alt = 'Ord-detektiv i storkøkkenet';
    detImg.className = 'kk-img';
    detStage.appendChild(detImg);

    function renderDetektivState() {
        const m = DETEKTIV_MISSIONS[detIdx];
        detClueEl.textContent = m.clue;
        detStatusEl.textContent = `Mission ${detIdx + 1} / ${DETEKTIV_MISSIONS.length} • Point: ${detScore}`;
        detFeedback.innerHTML = '';
    }

    KITCHEN_WORDS.forEach(item => {
        const spot = document.createElement('button');
        spot.type = 'button';
        spot.className = `kk-hotspot hs-${item.wordClass}`;
        spot.style.left = `${item.x}%`;
        spot.style.top = `${item.y}%`;
        spot.textContent = '?';
        spot.onclick = () => {
            const currentMission = DETEKTIV_MISSIONS[detIdx];
            if (item.id === currentMission.targetId) {
                detScore++;
                speakDanish(item.word);
                detFeedback.innerHTML = `<span style="color:#4ade80;">✓ Flot fundet! Det var #${item.num} "${item.word}" (${CLASS_META[item.wordClass].short}).</span>`;
                setTimeout(() => {
                    detIdx = (detIdx + 1) % DETEKTIV_MISSIONS.length;
                    renderDetektivState();
                }, 1500);
            } else {
                detFeedback.innerHTML = `<span style="color:#f87171;">✗ Det var "${item.word}" – prøv et andet pegefelt i køkkenet!</span>`;
            }
        };
        detStage.appendChild(spot);
    });

    renderDetektivState();
    detViewport.appendChild(detStage);
    detCard.appendChild(detViewport);
    detektivPanel.appendChild(detCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- TAB 3: SYNONYMER & ANTONYMER I KØKKENET ---
    // ========================================================
    const synAntPanel = document.createElement('div');
    synAntPanel.className = `kk-panel ${currentTab === 'tab_syn_ant' ? 'active' : ''}`;
    synAntPanel.dataset.panel = 'tab_syn_ant';

    const SYN_ANT_QUESTIONS = [
        {
            type: 'Antonym (Det modsatte)',
            wordClass: '🟠 Adjektiv',
            prompt: 'Køkkenassistenten bruger en meget <strong>skarp</strong> kokkekniv. Hvad er det modsatte af en <em>skarp</em> kniv?',
            correct: 'en sløv kniv',
            options: ['en sløv kniv', 'en frisk råvare', 'et rent forklæde', 'en varm gryde'],
            explanation: 'Det modsatte af "skarp" er "sløv" (en sløv kniv glider let på tomaten).'
        },
        {
            type: 'Antonym (Det modsatte)',
            wordClass: '🟠 Adjektiv',
            prompt: 'Stålbordet og skærebrættet skal være helt <strong>rene</strong>. Hvad er det modsatte af <em>ren</em>?',
            correct: 'beskidt / snavset',
            options: ['beskidt / snavset', 'friskbagt', 'serveringsklar', 'hurtigt'],
            explanation: 'Det modsatte af "ren" (hygiejnisk) er "beskidt" eller "snavset".'
        },
        {
            type: 'Antonym (Det modsatte)',
            wordClass: '🟠 Adjektiv',
            prompt: 'Vi laver salat af helt <strong>friske</strong> grøntsager. Hvad er det modsatte af <em>friske</em> råvarer?',
            correct: 'gamle / slatne eller fordærvede',
            options: ['gamle / slatne eller fordærvede', 'varme og nybagte', 'skarpe og rene', 'hurtige'],
            explanation: 'Det modsatte af "frisk" om madvarer er "gammel", "slatten" eller "fordærvet".'
        },
        {
            type: 'Antonym (Det modsatte)',
            wordClass: '🔵 Adverbium',
            prompt: 'Ved frokosttid fylder hun buffeten <strong>hurtigt</strong> op. Hvad er det modsatte af <em>hurtigt</em>?',
            correct: 'langsomt',
            options: ['langsomt', 'grundigt', 'heldigvis', 'friskt'],
            explanation: 'Mådesadverbiet "hurtigt" har modpolen "langsomt".'
        },
        {
            type: 'Antonym (Det modsatte)',
            wordClass: '🔵 Holdningsadverbium',
            prompt: 'Vi havde <strong>heldigvis</strong> bagt ekstra brød til gæsterne. Hvad siger man, hvis der ikke er mere brød tilbage?',
            correct: 'desværre',
            options: ['desværre', 'forsigtigt', 'hurtigt', 'grundigt'],
            explanation: '"Heldigvis" (lettelse) har modpolen "desværre" (beklagelse).'
        },
        {
            type: 'Synonym (Samme betydning)',
            wordClass: '🔴 Verbum',
            prompt: 'Køkkenassistenten <strong>snitter</strong> spidskål og peberfrugt til salaten. Hvad betyder <em>at snitte</em>?',
            correct: 'at skære i fine strimler eller små stykker',
            options: ['at skære i fine strimler eller små stykker', 'at vaske tallerkener i opvaskemaskinen', 'at tjekke temperaturen i kølerummet', 'at tømme affaldsspanden'],
            explanation: 'I et køkken betyder "at snitte" (og "at hakke") at skære grøntsager fint med en kniv.'
        },
        {
            type: 'Synonym (Samme betydning)',
            wordClass: '🔴 Verbum',
            prompt: 'Efter arbejdet <strong>spritter</strong> hun stålbordet <strong>af</strong>. Hvilket udtryk betyder det samme?',
            correct: 'at desinficere og tørre bordet rent for bakterier',
            options: ['at desinficere og tørre bordet rent for bakterier', 'at smage suppen til med salt', 'at skrælle fem kilo kartofler', 'at ælte dej i røremaskinen'],
            explanation: '"At spritte af" betyder at desinficere overfladen med sprit for god køkkenhygiejne.'
        },
        {
            type: 'Synonym / Fast fagterm',
            wordClass: '🟢 Substantiv',
            prompt: 'På alle bøtter i kølerummet sætter vi en <strong>datomærkning</strong>. Hvad fortæller en datomærkning?',
            correct: 'Hvad der er i bøtten, og hvornår maden er lavet / udløber',
            options: [
                'Hvad der er i bøtten, og hvornår maden er lavet / udløber',
                'Hvor mange tallerkener der er i opvaskemaskinen',
                'Hvor skarp kokkekniven er',
                'Hvad kunden skal betale ved kassen'
            ],
            explanation: 'En datomærkning (label) sikrer fødevaresikkerhed og sporbarhed i kølerummet.'
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
                <span style="background:rgba(34,197,94,0.2); color:#4ade80; border:1px solid #22c55e; padding:0.3rem 0.85rem; border-radius:20px; font-weight:800; font-size:0.82rem;">
                    🔄 Opgave ${synIdx + 1} / ${SYN_ANT_QUESTIONS.length} • ${q.type}
                </span>
                <span style="background:rgba(15,23,42,0.8); color:#cbd5e1; padding:0.3rem 0.8rem; border-radius:20px; font-size:0.82rem; font-weight:700;">
                    Ordklasse: ${q.wordClass}
                </span>
            </div>
            <div style="font-size:1.35rem; color:white; line-height:1.5; margin-bottom:1.5rem;">
                ${q.prompt}
            </div>
            <div id="kk-syn-opts" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.9rem; margin-bottom:1.2rem;"></div>
            <div id="kk-syn-feedback" style="min-height:56px; text-align:center;"></div>
        `;

        const optsWrap = synCard.querySelector('#kk-syn-opts');
        const fbWrap = synCard.querySelector('#kk-syn-feedback');

        shuffleArray([...q.options]).forEach(opt => {
            const b = document.createElement('button');
            b.type = 'button';
            b.style.cssText = 'background:#1e293b; border:2px solid #475569; color:white; padding:1rem 1.2rem; border-radius:14px; font-size:1.05rem; font-weight:700; cursor:pointer; text-align:center;';
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
                        <button id="kk-syn-next" style="background:#22c55e; color:#0f172a; border:none; padding:0.75rem 1.5rem; border-radius:12px; font-weight:800; cursor:pointer;">
                            ${synIdx < SYN_ANT_QUESTIONS.length - 1 ? 'Næste opgave ➔' : 'Prøv igen fra start 🔄'}
                        </button>
                    `;
                    fbWrap.querySelector('#kk-syn-next').onclick = () => {
                        synIdx = (synIdx + 1) % SYN_ANT_QUESTIONS.length;
                        renderSynAntQuestion();
                    };
                } else {
                    b.style.background = 'rgba(239, 68, 68, 0.25)';
                    b.style.borderColor = '#ef4444';
                    b.style.color = '#f87171';
                    fbWrap.innerHTML = `<div style="color:#f87171; font-weight:700;">✗ Prøv igen – tænk på betydningen i køkkenet!</div>`;
                }
            };
            optsWrap.appendChild(b);
        });
    }
    renderSynAntQuestion();
    synAntPanel.appendChild(synCard);
    panelsHolder.appendChild(synAntPanel);

    // ========================================================
    // --- TAB 4: HISTORIER MED KLIKBARE MÅLORD & OVERSÆTTELSE ---
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = `kk-panel ${currentTab === 'tab_historie' ? 'active' : ''}`;
    historiePanel.dataset.panel = 'tab_historie';

    const STORIES = [
        {
            title: '1. Morgenforberedelse ved snittebordet',
            storyText: 'Mandag morgen møder Sara ind som køkkenassistent. Først vasker hun sine hænder grundigt med vand og sæbe og tager et rent forklæde på. Hun henter en kasse med friske råvarer i kølerummet. Derefter skræller hun kartofler og gulerødder ved vasken og snitter grøntsagerne på det grønne skærebræt med en skarp kokkekniv. Skrællerne smider hun i affaldsspanden til madaffald.',
            questions: [
                {
                    q: '1. Hvad gør Sara allerførst, når hun møder ind i køkkenet?',
                    options: [
                        { text: 'Hun vasker hænder grundigt og tager et rent forklæde på 🧼🎽', correct: true },
                        { text: 'Hun slukker industriovnen ♨️', correct: false },
                        { text: 'Hun spiser frokost ved buffeten 🥗', correct: false }
                    ]
                },
                {
                    q: '2. Hvor henter hun de friske råvarer?',
                    options: [
                        { text: 'Inde i kølerummet ❄️🥕', correct: true },
                        { text: 'Inde i opvaskemaskinen 🍽️', correct: false },
                        { text: 'Nede i affaldsspanden 🗑️', correct: false }
                    ]
                },
                {
                    q: '3. Hvad bruger hun til at snitte grøntsagerne på?',
                    options: [
                        { text: 'Et grønt skærebræt og en skarp kokkekniv 🟩🔪', correct: true },
                        { text: 'En varm bageplade 🍞', correct: false },
                        { text: 'En røremaskine 🥣', correct: false }
                    ]
                }
            ]
        },
        {
            title: '2. De varme bageplader og dagens suppe',
            storyText: 'I røremaskinen har Sara æltet dej til friske grovboller, som nu bager i den store industriovn. Samtidig står kokken ved komfuret og rører rundt i en stor gryde med varm suppe. Kokken smager suppen til med salt og peber. Da industriovnen bipper, tager Sara handsker på og løfter forsigtigt den varme bageplade ud, så brødet kan køle af.',
            questions: [
                {
                    q: '1. Hvilken maskine har æltet dejen til grovbollerne?',
                    options: [
                        { text: 'Den store røremaskine 🥣', correct: true },
                        { text: 'Opvaskemaskinen 🍽️', correct: false },
                        { text: 'Kølerummet ❄️', correct: false }
                    ]
                },
                {
                    q: '2. Hvad gør kokken ved den store gryde på komfuret?',
                    options: [
                        { text: 'Han rører rundt i suppen og smager den til 🥄🧂', correct: true },
                        { text: 'Han skræller kartofler i gryden 🥔', correct: false },
                        { text: 'Han spritter gryden af 🧴', correct: false }
                    ]
                },
                {
                    q: '3. Hvordan tager Sara den varme bageplade ud af industriovnen?',
                    options: [
                        { text: 'Forsigtigt og med handsker på 🧤🍞', correct: true },
                        { text: 'Med en skarp kokkekniv 🔪', correct: false },
                        { text: 'Med bare hænder uden handsker ✋', correct: false }
                    ]
                }
            ]
        },
        {
            title: '3. Hygiejne, datomærkning og kølerummet',
            storyText: 'God hygiejne er det vigtigste i et storkøkken. Når Sara er færdig ved stålbordet, vasker hun skærebrættet og spritter bordet grundigt af. De snittede grøntsager lægger hun i rene bøtter med låg. Hun sætter en tydelig datomærkning på hver bøtte og stiller dem ind på hylden i det kolde kølerum.',
            questions: [
                {
                    q: '1. Hvad gør Sara ved stålbordet, når hun er færdig med at snitte?',
                    options: [
                        { text: 'Hun vasker skærebrættet og spritter bordet grundigt af 🧴✨', correct: true },
                        { text: 'Hun lader kniven og skrællerne ligge til i morgen 🔪', correct: false },
                        { text: 'Hun hælder varm suppe ud på bordet 🍲', correct: false }
                    ]
                },
                {
                    q: '2. Hvad sætter hun uden på bøtterne, før de kommer i kølerummet?',
                    options: [
                        { text: 'En tydelig datomærkning (label med indhold og dato) 🏷️', correct: true },
                        { text: 'En engangshandske 🧤', correct: false },
                        { text: 'Et forklæde 🎽', correct: false }
                    ]
                }
            ]
        },
        {
            title: '4. Travlhed ved frokostbuffeten klokken 11.30',
            storyText: 'Før frokost tager Sara blå engangshandsker på og anretter salaten pænt i store skåle. Heldigvis bliver både det friske brød, salaten og den varme suppe serveringsklar præcis til tiden. Når gæsterne spiser ved buffeten, fylder Sara hurtigt nye fade op, og bagefter vasker hun tallerkener og bestik op i opvaskemaskinen.',
            questions: [
                {
                    q: '1. Hvad tager Sara på hænderne, når hun anretter den spiseklare salat?',
                    options: [
                        { text: 'Blå engangshandsker 🧤🥗', correct: true },
                        { text: 'En bageplade 🍞', correct: false },
                        { text: 'En affaldsspand 🗑️', correct: false }
                    ]
                },
                {
                    q: '2. Hvad gør Sara, når fadene på buffeten bliver tomme, og når gæsterne har spist?',
                    options: [
                        { text: 'Hun fylder hurtigt buffeten op og vasker op i opvaskemaskinen ⚡🍽️', correct: true },
                        { text: 'Hun slukker lyset og går hjem kl. 11.30 🚪', correct: false },
                        { text: 'Hun gemmer tallerkenerne i røremaskinen 🥣', correct: false }
                    ]
                }
            ]
        }
    ];

    const STORY_WORD_LINKS = {
        'køkkenassistent': 'kk:koekkenassistent',
        'køkkenassistenten': 'kk:koekkenassistent',
        'kok': 'kk:kok',
        'kokken': 'kk:kok',
        'skærebræt': 'kk:skaerebraet',
        'skærebrættet': 'kk:skaerebraet',
        'kokkekniv': 'kk:kokkekniv',
        'kniven': 'kk:kokkekniv',
        'gryde': 'kk:gryde',
        'gryden': 'kk:gryde',
        'industriovn': 'kk:industriovn',
        'industriovnen': 'kk:industriovn',
        'bageplade': 'kk:bageplade',
        'bagepladen': 'kk:bageplade',
        'kølerum': 'kk:koelerum',
        'kølerummet': 'kk:koelerum',
        'opvaskemaskine': 'kk:opvaskemaskine',
        'opvaskemaskinen': 'kk:opvaskemaskine',
        'røremaskine': 'kk:roeremaskine',
        'røremaskinen': 'kk:roeremaskine',
        'forklæde': 'kk:forklaede',
        'engangshandsker': 'kk:engangshandske',
        'engangshandske': 'kk:engangshandske',
        'råvarer': 'kk:raavare',
        'grøntsager': 'kk:raavare',
        'grøntsagerne': 'kk:raavare',
        'kartofler': 'kk:raavare',
        'gulerødder': 'kk:raavare',
        'datomærkning': 'kk:datomaerkning',
        'affaldsspanden': 'kk:affaldsspand',
        'madaffald': 'kk:affaldsspand',
        'buffet': 'kk:buffet',
        'buffeten': 'kk:buffet',
        'skræller': 'kk:skraelle',
        'snitter': 'kk:snitte',
        'snittede': 'kk:snitte',
        'rører': 'kk:roere',
        'bager': 'kk:bage',
        'vasker op': 'kk:vaske_op',
        'spritter': 'kk:spritte_af',
        'hygiejne': 'kk:ren',
        'anretter': 'kk:anrette',
        'smager': 'kk:smage_til',
        'friske': 'kk:frisk',
        'rent': 'kk:ren',
        'rene': 'kk:ren',
        'skarp': 'kk:skarp',
        'serveringsklar': 'kk:serveringsklar',
        'grundigt': 'kk:grundigt',
        'forsigtigt': 'kk:forsigtigt',
        'hurtigt': 'kk:hurtigt',
        'heldigvis': 'kk:heldigvis',

        // Øvrige målord fra "Lær nye ord"
        'morgen': 'lno:morgen',
        'hænder': 'lno:haand',
        'vand': 'lno:vand',
        'stålbordet': 'lno:bord',
        'bordet': 'lno:bord',
        'hylden': 'lno:hylde',
        'brød': 'lno:broed',
        'brødet': 'lno:broed',
        'grovboller': 'lno:broed',
        'vasker': 'lno:vaske',
        'henter': 'lno:hente',
        'varm': 'kk:industriovn',
        'varme': 'lno:varm',
        'kolde': 'lno:kold'
    };

    const sortedStoryAliases = Object.keys(STORY_WORD_LINKS).sort((a, b) => b.length - a.length);
    const storyWordRegex = new RegExp(`(?<![\\wæøåÆØÅ])(${sortedStoryAliases.join('|')})(?![\\wæøåÆØÅ])`, 'gi');

    function formatStoryTextWithWordLinks(rawText) {
        return rawText.replace(storyWordRegex, (matchedWord) => {
            const target = STORY_WORD_LINKS[matchedWord.toLowerCase()];
            if (!target) return matchedWord;
            const [prefix, id] = target.split(':');
            if (prefix === 'kk') {
                const wObj = KITCHEN_WORDS.find(w => w.id === id);
                const titleAttr = wObj ? `Klik for forklaring & oversættelse af '${wObj.word}' (Målord i Storkøkkenet)` : 'Klik for oversættelse';
                return `<span class="kk-story-word-link" data-link-type="kk" data-word-id="${id}" title="${titleAttr}" style="background:rgba(34,197,94,0.16); color:#86efac; border-bottom:2px dashed #22c55e; padding:0.05rem 0.35rem; border-radius:6px; font-weight:700; cursor:pointer; white-space:nowrap;">${matchedWord} <small style="font-size:0.72em;">👩‍🍳</small></span>`;
            } else {
                const lnoObj = OTHER_LNO_WORDS[id];
                const titleAttr = lnoObj ? `Klik for forklaring & oversættelse af '${lnoObj.word}' (${lnoObj.surface})` : 'Klik for oversættelse';
                return `<span class="kk-story-word-link" data-link-type="lno" data-word-id="${id}" title="${titleAttr}" style="background:rgba(168,85,247,0.16); color:#d8b4fe; border-bottom:2px dashed #a855f7; padding:0.05rem 0.35rem; border-radius:6px; font-weight:700; cursor:pointer; white-space:nowrap;">${matchedWord} <small style="font-size:0.72em;">📚</small></span>`;
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
            b.style.cssText = `padding:0.55rem 1rem; border-radius:12px; font-weight:700; font-size:0.9rem; cursor:pointer; border:2px solid ${idx === activeStoryIdx ? '#4ade80' : '#334155'}; background:${idx === activeStoryIdx ? '#16a34a' : '#1e293b'}; color:white;`;
            b.textContent = s.title;
            b.onclick = () => {
                activeStoryIdx = idx;
                renderStory();
            };
            navRow.appendChild(b);
        });
        storyCard.appendChild(navRow);

        const linkLegend = document.createElement('div');
        linkLegend.style.cssText = 'background:rgba(15,23,42,0.85); border:1px solid rgba(34,197,94,0.35); border-radius:12px; padding:0.75rem 1rem; margin-bottom:1.1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; font-size:0.86rem;';
        const currTransLang = getPreferredTransLang();
        linkLegend.innerHTML = `
            <div style="display:flex; flex-wrap:wrap; gap:0.8rem; align-items:center; color:#cbd5e1;">
                <span>💡 <strong>Klik på de markerede ord i historien for oversættelse & forklaring:</strong></span>
                <span style="background:rgba(34,197,94,0.16); color:#86efac; border-bottom:2px dashed #22c55e; padding:0.1rem 0.45rem; border-radius:6px; font-weight:700;">Målord fra Køkkenet 👩‍🍳</span>
                <span style="background:rgba(168,85,247,0.16); color:#d8b4fe; border-bottom:2px dashed #a855f7; padding:0.1rem 0.45rem; border-radius:6px; font-weight:700;">Øvrige ord fra "Lær nye ord" 📚</span>
            </div>
            <div style="display:flex; align-items:center; gap:0.4rem;">
                <span style="color:#94a3b8; font-weight:700;">🌍 Sprog:</span>
                <select id="kk-story-trans-lang" style="background:#1e293b; color:white; border:1px solid #22c55e; border-radius:8px; padding:0.25rem 0.5rem; font-size:0.8rem; font-weight:700; cursor:pointer;">
                    ${SUPPORTED_TRANS_LANGS.map(l => `<option value="${l.code}" ${l.code === currTransLang ? 'selected' : ''}>${l.label}</option>`).join('')}
                </select>
            </div>
        `;
        linkLegend.querySelector('#kk-story-trans-lang').onchange = (e) => {
            setPreferredTransLang(e.target.value);
        };
        storyCard.appendChild(linkLegend);

        const textBox = document.createElement('div');
        textBox.style.cssText = 'background:#0f172a; border-left:4px solid #22c55e; padding:1.3rem; border-radius:14px; margin-bottom:1.5rem;';
        textBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.8rem;">
                <h3 style="margin:0; color:#4ade80; font-size:1.25rem;">📖 ${st.title}</h3>
                <button id="kk-listen-story" style="background:#2563eb; color:white; border:none; padding:0.45rem 1rem; border-radius:20px; font-weight:700; cursor:pointer;">🔊 Lyt til historien</button>
            </div>
            <p style="margin:0; font-size:1.12rem; line-height:1.95; color:#f1f5f9;">${formatStoryTextWithWordLinks(st.storyText)}</p>
        `;
        textBox.querySelector('#kk-listen-story').onclick = () => speakDanish(st.storyText);

        textBox.querySelectorAll('.kk-story-word-link').forEach(linkEl => {
            linkEl.onclick = (e) => {
                e.stopPropagation();
                const linkType = linkEl.dataset.linkType;
                const wordId = linkEl.dataset.wordId;
                if (linkType === 'kk') {
                    const item = KITCHEN_WORDS.find(w => w.id === wordId);
                    if (item) openKitchenWordModal(item, false);
                } else if (linkType === 'lno') {
                    const lnoItem = OTHER_LNO_WORDS[wordId];
                    if (lnoItem) openKitchenWordModal(lnoItem, true);
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
                ob.style.cssText = 'background:#334155; color:white; border:none; padding:0.6rem 1.1rem; border-radius:10px; font-weight:700; cursor:pointer;';
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
    saetningPanel.className = `kk-panel ${currentTab === 'tab_saetning' ? 'active' : ''}`;
    saetningPanel.dataset.panel = 'tab_saetning';

    const sbCard = document.createElement('div');
    sbCard.style.cssText = 'max-width:940px; margin:0 auto; background:rgba(30,41,59,0.7); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:1.8rem;';

    const sbSubNav = document.createElement('div');
    sbSubNav.style.cssText = 'display:flex; justify-content:center; gap:0.8rem; margin-bottom:1.5rem; flex-wrap:wrap;';
    const sbBtnFree = document.createElement('button');
    sbBtnFree.style.cssText = 'background:#16a34a; color:white; border:none; padding:0.7rem 1.3rem; border-radius:12px; font-weight:800; cursor:pointer;';
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
        sbBtnFree.style.background = '#16a34a';
        sbBtnFree.style.color = 'white';
        sbBtnPuzzle.style.background = '#1e293b';
        sbBtnPuzzle.style.color = '#cbd5e1';
    };
    sbBtnPuzzle.onclick = () => {
        freeWrap.style.display = 'none';
        puzzleWrap.style.display = 'block';
        sbBtnPuzzle.style.background = '#16a34a';
        sbBtnPuzzle.style.color = 'white';
        sbBtnFree.style.background = '#1e293b';
        sbBtnFree.style.color = '#cbd5e1';
    };

    const builderRows = [
        {
            label: '1. Hvem? (🟢 Person i køkkenet)',
            color: '#22c55e',
            options: ['Jeg', 'Køkkenassistenten', 'Kokken', 'Vi']
        },
        {
            label: '2. Handling (🔴 Verbum)',
            color: '#ef4444',
            options: ['snitter', 'skræller', 'vasker', 'anretter', 'bager']
        },
        {
            label: '3. Hvordan / Holdning? (🔵 Adverbium)',
            color: '#38bdf8',
            options: ['grundigt', 'forsigtigt', 'hurtigt', 'heldigvis']
        },
        {
            label: '4. Hvad? (🟠 Adjektiv + 🟢 Substantiv)',
            color: '#f97316',
            options: ['de friske grøntsager', 'det rene skærebræt', 'de varme grovboller', 'den serveringsklare salat']
        },
        {
            label: '5. Hvor / Med hvad? (🟢 Køkkenudtryk)',
            color: '#a855f7',
            options: ['på stålbordet', 'med en skarp kokkekniv', 'i industriovnen', 'til frokostbuffeten']
        }
    ];

    const currentSelections = builderRows.map(r => r.options[0]);
    const liveSentenceBox = document.createElement('div');
    liveSentenceBox.style.cssText = 'background:#0f172a; border:2px solid #334155; border-radius:16px; padding:1.3rem; text-align:center; margin-bottom:1.4rem;';

    function updateFreeBuilder() {
        const full = `${currentSelections[0]} ${currentSelections[1]} ${currentSelections[2]} ${currentSelections[3]} ${currentSelections[4]}.`;
        liveSentenceBox.innerHTML = `
            <div style="font-size:0.8rem; color:#94a3b8; text-transform:uppercase; font-weight:800; margin-bottom:0.4rem;">DIN HVERDAGSSÆTNING I KØKKENET (ALLE 4 ORDKLASSER):</div>
            <div style="font-size:1.35rem; font-weight:800; margin-bottom:0.9rem; line-height:1.45;">
                <span style="color:#4ade80;">${currentSelections[0]}</span>
                <span style="color:#f87171;">${currentSelections[1]}</span>
                <span style="color:#38bdf8;">${currentSelections[2]}</span>
                <span style="color:#fb923c;">${currentSelections[3]}</span>
                <span style="color:#c084fc;">${currentSelections[4]}</span>.
            </div>
            <button id="kk-free-listen" style="background:#2563eb; color:white; border:none; padding:0.6rem 1.3rem; border-radius:20px; font-weight:700; cursor:pointer;">🔊 Lyt til sætningen</button>
        `;
        liveSentenceBox.querySelector('#kk-free-listen').onclick = () => speakDanish(full);
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

    const PUZZLES = [
        {
            hint: '1. Saml sætningen om håndvask og forklæde om morgenen:',
            parts: ['Først', 'vasker', 'jeg', 'hænder', 'grundigt']
        },
        {
            hint: '2. Saml sætningen om at snitte grøntsager på skærebrættet:',
            parts: ['Jeg', 'snitter', 'de friske grøntsager', 'på det grønne', 'skærebræt']
        },
        {
            hint: '3. Saml sætningen om den varme bageplade fra ovnen:',
            parts: ['Jeg', 'tager', 'forsigtigt', 'den varme bageplade', 'ud af ovnen']
        },
        {
            hint: '4. Saml sætningen om rengøring af stålbordet:',
            parts: ['Bagefter', 'spritter', 'jeg', 'stålbordet', 'grundigt af']
        },
        {
            hint: '5. Saml sætningen om datomærkning og kølerummet:',
            parts: ['Til sidst', 'sætter', 'jeg', 'datomærkning', 'på alle bøtter']
        },
        {
            hint: '6. Saml sætningen om at smage suppen til:',
            parts: ['Kokken', 'smager', 'suppen', 'til med salt', 'og peber']
        },
        {
            hint: '7. Saml sætningen om at fylde buffeten op:',
            parts: ['Nu', 'er', 'salaten', 'heldigvis', 'klar til buffeten']
        },
        {
            hint: '8. Saml sætningen om at hente kokken til en gæst:',
            parts: ['Lige', 'to minutter', 'jeg', 'spørger', 'lige kokken']
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
                <span style="color:#4ade80; font-weight:800;">🧩 Puslespil ${puzzleIdx + 1} / ${PUZZLES.length}</span>
                <button id="kk-pz-reset" style="background:#334155; color:white; border:none; padding:0.4rem 0.85rem; border-radius:8px; font-weight:700; cursor:pointer;">🔄 Nulstil</button>
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
                sl.style.cssText = `background:${val ? '#1e293b' : '#0f172a'}; border:2px ${val ? 'solid #4ade80' : 'dashed #475569'}; border-radius:12px; padding:0.8rem; min-height:60px; display:flex; align-items:center; justify-content:center; font-weight:800; color:white; cursor:pointer; text-align:center;`;
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
                                    <button id="kk-pz-next" style="background:#22c55e; color:#0f172a; border:none; padding:0.65rem 1.3rem; border-radius:10px; font-weight:800; cursor:pointer;">Næste puslespil ➔</button>
                                `;
                                fbRow.querySelector('#kk-pz-next').onclick = () => {
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

        header.querySelector('#kk-pz-reset').onclick = () => {
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
    // --- TAB 6: MUNDTLIGE DIALOGER + VALGFRI ORDLISTE MED POINT
    // ========================================================
    const dialogPanel = document.createElement('div');
    dialogPanel.className = `kk-panel ${currentTab === 'tab_dialog' ? 'active' : ''}`;
    dialogPanel.dataset.panel = 'tab_dialog';

    const KITCHEN_DIALOGUES = [
        {
            title: 'Dialog 1: Morgenmøde med kokken om dagens opgaver',
            context: 'Klokken er 7.30 om morgenen, og kokken gennemgår dagens opgaver med køkkenassistenten.',
            lines: [
                { speaker: 'Kok', roleClass: 'speaker-kok', text: 'Godmorgen Sara! I dag skal vi lave tomatsuppe med friske grovboller og stor salatbar.' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Godmorgen! Skal jeg starte med at skrælle kartofler og gulerødder til suppen?' },
                { speaker: 'Kok', roleClass: 'speaker-kok', text: 'Ja tak, skræl fem kilo gulerødder og tre kilo kartofler ved vasken først.' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Modtaget! Bagefter snitter jeg spidskål og peberfrugt på det grønne skærebræt.' },
                { speaker: 'Kok', roleClass: 'speaker-kok', text: 'Super. Når du er færdig med salaten, må du også gerne tjekke grovbollerne i industriovnen.' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Det gør jeg – så er både brød og salat klar inden klokken 11.30!' }
            ],
            difficultWords: [
                {
                    id: 'kd1_grovboller',
                    word: 'friske grovboller',
                    da: 'Nybagte boller bagt med fuldkornsmel og kerner.',
                    trans: {
                        en: 'fresh wholegrain rolls', de: 'frische Vollkornbrötchen', es: 'panecillos integrales frescos', pt: 'pãezinhos integrais frescos', tr: 'taze tam tahıllı ekmekler (sandviç ekmeği)',
                        ar: 'خبز صامولي طازج بالحبوب الكاملة', fa: 'نان‌های سبوس‌دار تازه', ku: 'nanikên nû yên bi danên tevahî', ur: 'تازہ چکی کے آٹے کے بن (روٹیاں)', ru: 'свежие цельнозерновые булочки', uk: 'свіжі цільнозернові булочки',
                        zh: '新鲜出炉的全麦小餐包', vi: 'bánh mì nguyên cám tươi mới', th: 'ขนมปังโฮลเกรนอบใหม่', ne: 'ताजा गहुँको आँटाको बन (रोटी)', ps: 'تازه وربشو او غنمو ډوډۍ'
                    }
                },
                {
                    id: 'kd1_skraelle',
                    word: 'at skrælle kartofler og gulerødder',
                    da: 'At fjerne skrællen på kartofler og gulerødder med en skrællekniv.',
                    trans: {
                        en: 'to peel potatoes and carrots', de: 'Kartoffeln und Karotten schälen', es: 'pelar patatas y zanahorias', pt: 'descascar batatas e cenouras', tr: 'patates ve havuçları soymak',
                        ar: 'تقشير البطاطس والجزر', fa: 'پوست کندن سیب‌زمینی و هویج', ku: 'qelandina kartol û gêzeran', ur: 'آلو اور گاجریں چھیلنا', ru: 'чистить картофель и морковь', uk: 'чистити картоплю та моркву',
                        zh: '削土豆和胡萝卜皮', vi: 'gọt vỏ khoai tây và cà rốt', th: 'ปอกเปลือกมันฝรั่งและแครอท', ne: 'आलु र गाजर ताछ्नु', ps: 'کچالو او ګازرې سپینول (پوستول)'
                    }
                },
                {
                    id: 'kd1_spidskaal',
                    word: 'snitter spidskål og peberfrugt',
                    da: 'Skærer kål og peberfrugt i tynde, fine strimler med en skarp kniv.',
                    trans: {
                        en: 'slices pointed cabbage and bell pepper finely', de: 'schneidet Spitzkohl und Paprika fein', es: 'corta fino el repollo y el pimiento', pt: 'fatia finamente o repolho e o pimentão', tr: 'sivri lahana ve tatlı biberi incecik doğruyor',
                        ar: 'يُقطّع الملفوف والفلفل الحلو إلى شرائح رفيعة', fa: 'کلم و فلفل دلمه‌ای را ریز خرد می‌کند', ku: 'kelem û îsota şîrîn hûr dike', ur: 'بند گوبھی اور شملہ مرچ باریک کاٹتا ہے', ru: 'тонко шинкует капусту и сладкий перец', uk: 'тонко шинкує капусту та солодкий перець',
                        zh: '把牛心甘蓝和甜椒切成细丝', vi: 'thái nhỏ bắp cải và ớt chuông', th: 'ซอยกะหล่ำปลีและพริกหวานเป็นเส้นบางๆ', ne: 'बन्दागोभी र भेडेखुर्सानी मसिना गरी काट्छ', ps: 'کرم او شنه مرچک میده پرې کوي'
                    }
                },
                {
                    id: 'kd1_skaerebraet',
                    word: 'det grønne skærebræt',
                    da: 'Skærebræt i grøn plast, som kun bruges til frugt og grøntsager (for god hygiejne).',
                    trans: {
                        en: 'the green cutting board (for vegetables)', de: 'das grüne Schneidebrett (für Gemüse)', es: 'la tabla de cortar verde (para verduras)', pt: 'a tábua de corte verde (para legumes)', tr: 'yeşil kesme tahtası (sebzeler için)',
                        ar: 'لوح التقطيع الأخضر (المخصص للخضروات)', fa: 'تخته برش سبز (مخصوص سبزیجات)', ku: 'texteyê hûrkirinê yê kesk (ji bo sebzeyan)', ur: 'سبز رنگ کا چاپنگ بورڈ (سبزیوں کے لیے)', ru: 'зелёная разделочная доска (для овощей)', uk: 'зелена обробна дошка (для овочів)',
                        zh: '绿色砧板（蔬菜专用切菜板）', vi: 'thớt màu xanh lá (dùng riêng cho rau củ)', th: 'เขียงสีเขียว (สำหรับหั่นผัก)', ne: 'हरियो चपिङ बोर्ड (तरकारी काट्ने अचानो)', ps: 'شنه تخته (د ترکاري پرې کولو لپاره)'
                    }
                },
                {
                    id: 'kd1_industriovnen',
                    word: 'industriovnen',
                    da: 'Den store professionelle damp- og varmluftsovn i køkkenet.',
                    trans: {
                        en: 'the commercial oven', de: 'der Industrieofen / Kombidämpfer', es: 'el horno industrial', pt: 'o forno industrial', tr: 'endüstriyel fırın',
                        ar: 'الفرن الصناعي الكبير', fa: 'فر صنعتی آشپزخانه', ku: 'firina pîşesaziyê', ur: 'بڑا کمرشل اوون', ru: 'промышленная печь (пароконвектомат)', uk: 'промислова піч',
                        zh: '商用大烤箱', vi: 'lò nướng công nghiệp', th: 'เตาอบอุตสาหกรรม', ne: 'ठूलो व्यावसायिक ओभन', ps: 'لوی صنعتي داش'
                    }
                }
            ]
        },
        {
            title: 'Dialog 2: Hygiejne, skærebrætter og engangshandsker',
            context: 'To kollegaer taler om god køkkenhygiejne ved stålbordet mellem to opgaver.',
            lines: [
                { speaker: 'Kollega', roleClass: 'speaker-kollega', text: 'Er du færdig med at skære rå kylling på det røde skærebræt?' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Ja, jeg har lige lagt kyllingen på en bageplade og sat den ind i industriovnen.' },
                { speaker: 'Kollega', roleClass: 'speaker-kollega', text: 'Godt! Husk at bære det røde skærebræt og kniven ud i opvasken med det samme.' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Selvfølgelig – og jeg vasker og spritter hele stålbordet grundigt af nu.' },
                { speaker: 'Kollega', roleClass: 'speaker-kollega', text: 'Perfekt. Når du har vasket hænder, kan du tage blå engangshandsker på og anrette salaten.' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Modtaget! Jeg henter et rent, grønt skærebræt til de friske krydderurter.' }
            ],
            difficultWords: [
                {
                    id: 'kd2_raa_kylling',
                    word: 'rå kylling på det røde skærebræt',
                    da: 'Ukogt/ustegt kyllingekød skæres altid på et rødt bræt for at undgå bakterier (salmonella/campylobacter).',
                    trans: {
                        en: 'raw chicken on the red cutting board', de: 'rohes Hähnchen auf dem roten Schneidebrett', es: 'pollo crudo en la tabla de cortar roja', pt: 'frango cru na tábua de corte vermelha', tr: 'kırmızı kesme tahtasında çiğ tavuk',
                        ar: 'دجاج نيء على لوح التقطيع الأحمر', fa: 'مرغ خام روی تخته برش قرمز', ku: 'mirîşka xav li ser texteyê sor', ur: 'سرخ تختے پر کچا چکن (مرغی کا گوشت)', ru: 'сырая курица на красной разделочной доске', uk: 'сира курка на червоній обробній дошці',
                        zh: '红色砧板上的生鸡肉', vi: 'thịt gà sống trên thớt màu đỏ', th: 'เนื้อไก่ดิบบนเขียงสีแดง', ne: 'रातो चपिङ बोर्डमा काँचो कुखुराको मासु', ps: 'په سره تخته باندې اومه د چرګ غوښه'
                    }
                },
                {
                    id: 'kd2_spritter_af',
                    word: 'spritter stålbordet grundigt af',
                    da: 'Tørrer bordet over med desinficerende sprit, så alle bakterier dræbes.',
                    trans: {
                        en: 'sanitizes the stainless table thoroughly', de: 'desinfiziert den Edelstahltisch gründlich', es: 'desinfecta a fondo la mesa de acero', pt: 'higieniza bem a bancada de inox', tr: 'çelik tezgâhı iyice dezenfekte ediyor',
                        ar: 'يُعقّم طاولة الفولاذ بدقة وعناية', fa: 'میز استیل را کاملاً ضدعفونی می‌کند', ku: 'maseya pola bi باشî dezenfekte dike', ur: 'اسٹیل کی میز کو اچھی طرح سینیٹائز کرتا ہے', ru: 'тщательно дезинфицирует стальной стол', uk: 'ретельно дезінфікує сталевий стіл',
                        zh: '彻底消毒擦拭不锈钢工作台', vi: 'khử trùng kỹ bàn inox', th: 'เช็ดฆ่าเชื้อโต๊ะสแตนเลสอย่างสะอาดหมดจด', ne: 'स्टिलको टेबललाई राम्रोसँग सेनिटाइज गर्छ', ps: 'د فولادو مېز په بشپړ غور سره ضدعفوني کوي'
                    }
                },
                {
                    id: 'kd2_engangshandsker',
                    word: 'blå engangshandsker',
                    da: 'Hygiejniske plasthandsker, som smides ud efter én opgave.',
                    trans: {
                        en: 'blue disposable gloves', de: 'blaue Einweghandschuhe', es: 'guantes desechables azules', pt: 'luvas descartáveis azuis', tr: 'mavi tek kullanımlık eldivenler',
                        ar: 'قفازات زرقاء تُستخدم لمرة واحدة', fa: 'دستکش‌های یک‌بارمصرف آبی', ku: 'lepikên şîn ên yekcarî', ur: 'نیلے رنگ کے ایک بار استعمال ہونے والے دستانے', ru: 'синие одноразовые перчатки', uk: 'сині одноразові рукавички',
                        zh: '蓝色一次性手套', vi: 'găng tay dùng một lần màu xanh', th: 'ถุงมือยางสีฟ้าแบบใช้แล้วทิ้ง', ne: 'नीलो एकपटक प्रयोग गरिने पञ्जा', ps: 'شنې یو ځل کارېدونکې دستکشې'
                    }
                },
                {
                    id: 'kd2_krydderurter',
                    word: 'friske krydderurter',
                    da: 'Friske grønne urter som persille, dild, purløg eller basilikum.',
                    trans: {
                        en: 'fresh herbs (parsley, dill, chives)', de: 'frische Kräuter (Petersilie, Dill, Schnittlauch)', es: 'hierbas aromáticas frescas', pt: 'ervas frescas (salsa, cebolinha)', tr: 'taze yeşillikler /香 otlar (maydanoz, dereotu)',
                        ar: 'أعشاب عطرية طازجة (بقدونس، شبت)', fa: 'سبزیجات معطر تازه (جعفری، شوید)', ku: 'giyayên bîhnxweş ên taze (bexdenûs, pîvaza kesk)', ur: 'تازہ ہرا دھنیا اور جڑی بوٹیاں', ru: 'свежая зелень (петрушка, укроп)', uk: 'свіжа зелень (петрушка, кріп)',
                        zh: '新鲜香草（欧芹、莳萝、香葱）', vi: 'rau thơm tươi (mùi tây, thì là)', th: 'สมุนไพรสด (พาร์สลีย์, ผักชีฝรั่ง)', ne: 'ताजा हरियो धनियाँ र जडीबुटी', ps: 'تازه شنه بوټي (دڼیا او نور)'
                    }
                }
            ]
        },
        {
            title: 'Dialog 3: Samarbejde ved industriovnen og opvasken',
            context: 'Der er travlt før frokost: varme plader skal ud af ovnen, og opvaskemaskinen kører.',
            lines: [
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Pas på bag dig! Jeg kommer med en meget varm bageplade fra industriovnen.' },
                { speaker: 'Kollega', roleClass: 'speaker-kollega', text: 'Tak fordi du siger til! Jeg træder lige til side, så du kan sætte pladen på bordet.' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Tusind tak. Kan du lige hjælpe mig med at løfte den tunge suppegryde bagefter?' },
                { speaker: 'Kollega', roleClass: 'speaker-kollega', text: 'Ja, selvfølgelig – vi løfter den sammen i begge håndtag, så vi passer på ryggen.' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'God idé. Bagefter tager jeg opvasken og kører bakkerne gennem opvaskemaskinen.' },
                { speaker: 'Kollega', roleClass: 'speaker-kollega', text: 'Perfekt, så anretter jeg imens de lune boller i kurvene til buffeten.' }
            ],
            difficultWords: [
                {
                    id: 'kd3_pas_paa_bag_dig',
                    word: 'pas på bag dig!',
                    da: 'Vigtigt sikkerhedsudtryk i køkkenet, når man går bag en kollega med noget varmt eller skarpt.',
                    trans: {
                        en: 'watch out behind you! / hot behind!', de: 'Vorsicht hinter dir!', es: '¡cuidado detrás de ti!', pt: 'cuidado atrás de você!', tr: 'arkana dikkat et!',
                        ar: 'انتبه خلفك! (احذر وراءك)', fa: 'مواظب پشت سرت باش!', ku: 'hay ji pişt xwe هەbe!', ur: 'اپنے پیچھے دھیان رکھیں!', ru: 'осторожно сзади!', uk: 'обережно позаду!',
                        zh: '小心身后！（注意后面）', vi: 'cẩn thận phía sau bạn!', th: 'ระวังข้างหลังด้วยครับ!', ne: 'तपाईंको पछाडि होसियार हुनुहोस्!', ps: 'شاته مو پام کوئ!'
                    }
                },
                {
                    id: 'kd3_traeder_til_side',
                    word: 'træder lige til side',
                    da: 'Flytter sig et skridt til siden, så der er fri passage.',
                    trans: {
                        en: 'just steps aside', de: 'tritt kurz zur Seite', es: 'se aparta a un lado', pt: 'dá um passo para o lado', tr: 'kenara çekiliyor',
                        ar: 'يتنحى جانباً لإفساح الطريق', fa: 'کنار می‌رود تا راه باز شود', ku: 'dide aliyekî', ur: 'ایک طرف ہٹ جاتا ہے', ru: 'отходит в сторону', uk: 'відходить убік',
                        zh: '让到一旁（闪开让路）', vi: 'bước sang một bên nhường đường', th: 'หลบไปด้านข้างเพื่อเปิดทางให้', ne: 'छेउमा सर्छ (बाटो छोड्छ)', ps: 'یوې خواته کېږي (لاره ورکوي)'
                    }
                },
                {
                    id: 'kd3_passer_paa_ryggen',
                    word: 'så vi passer på ryggen',
                    da: 'God arbejdsmiljø-skik: man løfter tunge gryder to personer sammen, så man ikke får ondt i ryggen.',
                    trans: {
                        en: 'so we protect our backs (safe lifting)', de: 'damit wir unseren Rücken schonen', es: 'para cuidar la espalda', pt: 'para protegermos as costas', tr: 'sırtımızı/belimizi korumak için',
                        ar: 'لكي نحمي ظهورنا عند الرفع', fa: 'تا مراقب کمرمان باشیم', ku: 'da ku em pişta xwe biparêzin', ur: 'تاکہ ہماری کمر محفوظ رہے', ru: 'чтобы поберечь спину', uk: 'щоб поберегти спину',
                        zh: '这样能保护我们的腰背', vi: 'để bảo vệ lưng khi bê nặng', th: 'เพื่อป้องกันไม่ให้ปวดหลังเวลาออกแรงยก', ne: 'ताकि हाम्रो ढाड सुरक्षित रहोस्', ps: 'ترڅو خپله ملا خوندي وساتو'
                    }
                },
                {
                    id: 'kd3_bakkerne',
                    word: 'kører bakkerne gennem opvaskemaskinen',
                    da: 'Skubber opvaskebakkerne med tallerkener ind i industriopvaskeren og lukker hætten ned.',
                    trans: {
                        en: 'runs the racks through the commercial dishwasher', de: 'schiebt die Spülkörbe durch die Spülmaschine', es: 'pasa las bandejas por el lavavajillas', pt: 'passa as gavetas pela máquina de lavar louça', tr: 'bulaşık sepetlerini makineden geçiriyor',
                        ar: 'يُمرّر صواني الصحون عبر غسالة الصحون', fa: 'سبدهای ظرف را داخل ماشین ظرف‌شویی می‌گذارد', ku: 'sebetên firaxan di makîneyê re derbas dike', ur: 'برتنوں والی ٹرے ڈش واشر سے گزارتا ہے', ru: 'пропускает кассеты с посудой через посудомоечную машину', uk: 'пропускає касети з посудом через посудомийну машину',
                        zh: '把洗碗篮推进商用洗碗机清洗', vi: 'đẩy các khay bát đĩa qua máy rửa bát', th: 'เลื่อนแร็คจานเข้าเครื่องล้างจานอุตสาหกรรม', ne: 'भाँडाको र्याकलाई डिसवासर मेसिनमा हालेर धुन्छ', ps: 'د لوښو ټرې د مینځلو په ماشین کې تېروي'
                    }
                }
            ]
        },
        {
            title: 'Dialog 4: Datomærkning og oprydning i kølerummet',
            context: 'Efter frokost skal overskydende råvarer og snittet grønt sættes på køl med korrekt dato.',
            lines: [
                { speaker: 'Kok', roleClass: 'speaker-kok', text: 'Sara, vil du hjælpe med at sætte de snittede grøntsager og dressingen ind i kølerummet?' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Ja, jeg hælder dem over i rene plastbøtter med tætsluttende låg nu.' },
                { speaker: 'Kok', roleClass: 'speaker-kok', text: 'Husk at skrive både indhold og dagens dato på en label og sætte den på hver bøtte.' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Det gør jeg! Skal de nye bøtter stå forrest eller bagerst på hylden i kølerummet?' },
                { speaker: 'Kok', roleClass: 'speaker-kok', text: 'Sæt altid de nyeste bøtter bagerst, så vi bruger de ældste varer først.' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Modtaget! Jeg tjekker også lige, at termometeret i kølerummet viser under 5 grader.' }
            ],
            difficultWords: [
                {
                    id: 'kd4_taetsluttende_laag',
                    word: 'rene plastbøtter med tætsluttende låg',
                    da: 'Bøtter af fødevaregodkendt plast med låg, der lukker helt tæt.',
                    trans: {
                        en: 'clean plastic containers with tight-fitting lids', de: 'saubere Plastikbehälter mit dicht schließendem Deckel', es: 'recipientes limpios con tapa hermética', pt: 'potes limpos com tampa hermética', tr: 'sıkı kapaklı temiz plastik kaplar',
                        ar: 'علب بلاستيكية نظيفة بأغطية محكمة الإغلاق', fa: 'ظرف‌های پلاستیکی تمیز با درِ کاملاً کیپ', ku: 'qutiyên پlastîk ên پaqij bi qapaxên girtî', ur: 'مضبوط ڈھکن والے صاف پلاسٹک کے ڈبے', ru: 'чистые пластиковые контейнеры с плотной крышкой', uk: 'чисті пластикові контейнери зі щільною кришкою',
                        zh: '带密封盖的干净塑料保鲜盒', vi: 'hộp nhựa sạch có nắp đậy kín', th: 'กล่องพลาสติกสะอาดที่มีฝาปิดมิดชิด', ne: 'कसिएको बिर्को भएको सफा प्लास्टिकको बट्टा', ps: 'پاک پلاستیکي لوښي چې کلک سرپوښ لري'
                    }
                },
                {
                    id: 'kd4_aeldste_foerst',
                    word: 'bruger de ældste varer først (FIFO)',
                    da: 'Fast køkkenregel ("Først ind, først ud"): varer med kortest holdbarhed sættes forrest, så intet går til spilde.',
                    trans: {
                        en: 'use the oldest items first (First In, First Out)', de: 'die ältesten Waren zuerst verbrauchen (FIFO)', es: 'usar primero los productos más antiguos', pt: 'usar os produtos mais antigos primeiro', tr: 'en eski ürünleri ilk önce kullanmak (ilk giren ilk çıkar)',
                        ar: 'استخدام المواد الأقدم أولاً (ما يدخل أولاً يخرج أولاً)', fa: 'استفاده از مواد قدیمی‌تر در اولویت اول', ku: 'pêşî bikaranîna tiştên kevintir', ur: 'پہلے رکھی ہوئی چیزیں پہلے استعمال کرنا', ru: 'использовать более старые продукты первыми', uk: 'використовувати старіші продукти першими',
                        zh: '先使用较早存放的食材（先进先出原则）', vi: 'dùng nguyên liệu cũ trước (nhập trước, xuất trước)', th: 'ของที่เก็บไว้ก่อนให้นำมาใช้ก่อน (FIFO)', ne: 'पहिले राखिएको सामान पहिले प्रयोग गर्नु', ps: 'پخواني توکي لومړی کارول'
                    }
                },
                {
                    id: 'kd4_under_5_grader',
                    word: 'viser under 5 grader',
                    da: 'Lovkrav i Danmark: et kølerum til fødevarer må højst være 5 °C varmt.',
                    trans: {
                        en: 'shows below 5 degrees Celsius', de: 'zeigt unter 5 Grad an', es: 'marca menos de 5 grados', pt: 'marca abaixo de 5 graus', tr: '5 derecenin altını gösteriyor',
                        ar: 'يُظهر أقل من 5 درجات مئوية', fa: 'کمتر از ۵ درجه سانتی‌گراد را نشان می‌دهد', ku: 'di bin 5 pileyî de nîşan dide', ur: 'پانچ ڈگری سے کم درجہ حرارت دکھاتا ہے', ru: 'показывает ниже 5 градусов', uk: 'показує нижче 5 градусів',
                        zh: '显示温度低于5摄氏度', vi: 'hiển thị dưới 5 độ C', th: 'แสดงอุณหภูมิต่ำกว่า 5 องศาเซลเซียس', ne: '५ डिग्रीभन्दा कम तापक्रम देखाउँछ', ps: 'تر ۵ درجو کمه تودوخه ښیي'
                    }
                }
            ]
        },
        {
            title: 'Dialog 5: Ved frokostbuffeten – En gæst spørger om allergener',
            context: 'Køkkenassistenten fylder buffeten op i kantinen, da en gæst stiller et spørgsmål om suppen.',
            lines: [
                { speaker: 'Gæst', roleClass: 'speaker-gaest', text: 'Undskyld, suppen dufter virkelig dejligt! Ved du, om der er mælk eller fløde i den?' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Mange tak! Jeg er ikke helt sikker – lige to minutter, så spørger jeg kokken.' },
                { speaker: 'Kok', roleClass: 'speaker-kok', text: 'Du gør det helt rigtige ved at spørge! Tomatsuppen er lavet helt uden mælk og gluten.' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Tusind tak! Jeg går straks ud til buffeten og giver gæsten besked.' },
                { speaker: 'Gæst', roleClass: 'speaker-gaest', text: 'Hvor er det bare god service – og kommer der også flere af de friske grovboller?' },
                { speaker: 'Køkkenassistent', roleClass: 'speaker-assistent', text: 'Ja, vi har heldigvis en ny bageplade klar i ovnen – jeg henter et nyt fad med det samme!' }
            ],
            difficultWords: [
                {
                    id: 'kd5_maelk_eller_floede',
                    word: 'om der er mælk eller fløde i (allergener)',
                    da: 'Gæster med mælkeallergi eller laktoseintolerans spørger ofte om mælk, fløde, nødder eller gluten.',
                    trans: {
                        en: 'whether there is milk or cream in it (allergens)', de: 'ob Milch oder Sahne darin ist (Allergene)', es: 'si lleva leche o nata (alérgenos)', pt: 'se tem leite ou creme de leite (alergênicos)', tr: 'içinde süt veya krema olup olmadığı (alerjenler)',
                        ar: 'ما إذا كان يحتوي على حليب أو كريمة (مسببات الحساسية)', fa: 'این‌که آیا شیر یا خامه داخل آن هست (حساسیت غذایی)', ku: 'ka şîr an qeymax تێda هەیە (alerjen)', ur: 'کیا اس میں دودھ یا کریم شامل ہے (الرجی)', ru: 'есть ли в нём молоко или сливки (аллергены)', uk: 'чи є в ньому молоко або вершки (алергени)',
                        zh: '里面是否含有牛奶或奶油（过敏原询问）', vi: 'có sữa hay kem tươi trong đó không (chất gây dị ứng)', th: 'มีส่วนผสมของนมหรือครีมไหม (สารก่อภูมิแพ้)', ne: 'यसमा दूध वा क्रिम छ कि छैन (एलर्जी सम्बन्धी)', ps: 'آیا په دې کې شیدې یا قیماق شته (حساسیت)'
                    }
                },
                {
                    id: 'kd5_spoerger_kokken',
                    word: 'jeg spørger lige kokken',
                    da: 'Den vigtigste regel ved allergispørgsmål: gæt aldrig selv – spørg altid kokken først!',
                    trans: {
                        en: 'I will just ask the chef', de: 'ich frage kurz den Koch', es: 'voy a preguntarle al cocinero', pt: 'vou perguntar ao chef', tr: 'hemen aşçıya (şefe) sorayım',
                        ar: 'سأسأل الطاهي (الشيف) فوراً', fa: 'الان از سرآشپز می‌پرسم', ku: 'ez ê niha ji aşpêj bipirsim', ur: 'میں ابھی شیف سے پوچھتا ہوں', ru: 'я сейчас спрошу у повара', uk: 'я зараз запитаю у кухаря',
                        zh: '我这就去问一下主厨', vi: 'tôi sẽ hỏi bếp trưởng ngay', th: 'เดี๋ยวผมไปถามเชฟให้สักครู่นะครับ', ne: 'म एकैछिनमा मुख्य कुकलाई सोध्छु', ps: 'زه به اوس له اشپز څخه وپوښتم'
                    }
                },
                {
                    id: 'kd5_uden_gluten',
                    word: 'helt uden mælk og gluten',
                    da: 'Fri for både mælkeprodukter og hvedemel/gluten.',
                    trans: {
                        en: 'completely dairy-free and gluten-free', de: 'komplett laktosefrei (ohne Milch) und glutenfrei', es: 'totalmente sin leche y sin gluten', pt: 'totalmente sem leite e sem glúten', tr: 'tamamen sütsüz ve glütensiz',
                        ar: 'خالٍ تماماً من الحليب والغلوتين', fa: 'کاملاً بدون شیر و بدون گلوتن', ku: 'bi temamî bê şîr û bê glûten', ur: 'دودھ اور گلوٹین سے بالکل پاک', ru: 'полностью без молока и глютена', uk: 'повністю без молока та глютену',
                        zh: '完全不含乳制品和麸质（无麸质）', vi: 'hoàn toàn không chứa sữa và gluten', th: 'ปราศจากนมและกลูเตน 100%', ne: 'दूध र ग्लुटेन बिल्कुलै नभएको', ps: 'په بشپړ ډول بې له شیدو او ګلوټین څخه'
                    }
                }
            ]
        }
    ];

    const DIALOG_SCORES_STORAGE_KEY = 'koekken_dialog_scores_v1';
    let savedDialogScores = {};
    try {
        savedDialogScores = JSON.parse(localStorage.getItem(DIALOG_SCORES_STORAGE_KEY) || '{}') || {};
    } catch (_) {
        savedDialogScores = {};
    }
    const unlockedWordsPerDialog = {};

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
        for (let i = 0; i < KITCHEN_DIALOGUES.length; i++) {
            sum += (savedDialogScores[i] !== undefined ? savedDialogScores[i] : 100);
        }
        return sum;
    }

    let currDialogIdx = 0;
    const dialogCard = document.createElement('div');
    dialogCard.className = 'kk-dialog-card';

    function renderDialogueOrderingTask() {
        dialogCard.innerHTML = '';
        const dlg = KITCHEN_DIALOGUES[currDialogIdx];
        const totalLines = dlg.lines.length;
        let placedLines = new Array(totalLines).fill(null);
        const scrambledLines = shuffleArray(dlg.lines.map((line, origIdx) => ({ ...line, origIdx })));

        if (scrambledLines.every((l, i) => l.origIdx === i) && scrambledLines.length > 1) {
            const tmp = scrambledLines[0];
            scrambledLines[0] = scrambledLines[1];
            scrambledLines[1] = tmp;
        }

        const navRow = document.createElement('div');
        navRow.style.cssText = 'display:flex; gap:0.5rem; flex-wrap:wrap; justify-content:center; margin-bottom:1.2rem;';
        KITCHEN_DIALOGUES.forEach((d, idx) => {
            const pill = document.createElement('button');
            pill.type = 'button';
            const savedScore = savedDialogScores[idx];
            const scoreBadge = savedScore !== undefined ? ` • 🏆 ${savedScore}p` : '';
            pill.style.cssText = `padding:0.45rem 0.95rem; border-radius:20px; font-weight:800; font-size:0.85rem; cursor:pointer; border:1.5px solid ${idx === currDialogIdx ? '#4ade80' : '#475569'}; background:${idx === currDialogIdx ? '#16a34a' : '#1e293b'}; color:white;`;
            pill.textContent = `💬 Dialog ${idx + 1}${scoreBadge}`;
            pill.onclick = () => {
                currDialogIdx = idx;
                renderDialogueOrderingTask();
            };
            navRow.appendChild(pill);
        });
        dialogCard.appendChild(navRow);

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
                <div style="background:rgba(34,197,94,0.15); color:#4ade80; border:1px solid rgba(34,197,94,0.35); padding:0.3rem 0.8rem; border-radius:12px; font-weight:800; font-size:0.82rem;">
                    ⭐ Samlet score (5 dialoger): ${getTotalSavedPoints()} / 500 p
                </div>
            `;
        }
        updateScoreBannerUI();
        dialogCard.appendChild(scoreBanner);

        const header = document.createElement('div');
        header.style.cssText = 'margin-bottom:1.4rem;';
        header.innerHTML = `
            <div style="display:inline-block; background:rgba(34,197,94,0.18); color:#4ade80; border:1px solid #16a34a; padding:0.3rem 0.85rem; border-radius:20px; font-size:0.82rem; font-weight:800; margin-bottom:0.5rem;">
                💬 Mundtlig køkkendialog i rigtig rækkefølge (${currDialogIdx + 1} / ${KITCHEN_DIALOGUES.length})
            </div>
            <h2 style="margin:0 0 0.4rem; font-size:1.5rem; color:white;">${dlg.title}</h2>
            <p style="margin:0; color:#94a3b8; font-size:0.98rem;">
                <strong>Situation:</strong> ${dlg.context}<br>
                <em>Replikkerne herunder er kommet i tilfældig rækkefølge. Klik på replikkerne i den rigtige rækkefølge (1 til ${totalLines}), så samtalen giver mening!</em>
            </p>
        `;
        dialogCard.appendChild(header);

        const slotsWrap = document.createElement('div');
        slotsWrap.style.marginBottom = '1.5rem';

        const bankTitle = document.createElement('div');
        bankTitle.style.cssText = 'font-weight:800; font-size:0.95rem; color:#cbd5e1; margin-bottom:0.6rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;';
        bankTitle.innerHTML = `
            <span>🔀 Replikker i tilfældig rækkefølge (klik for at placere i næste ledige felt):</span>
            <button id="kk-dlg-reset" style="background:#334155; color:white; border:none; padding:0.4rem 0.9rem; border-radius:8px; font-weight:700; cursor:pointer;">🔄 Nulstil dialog</button>
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
                slotEl.className = `kk-dialog-slot ${lineObj ? 'filled' : ''} ${statusCls}`;

                if (lineObj) {
                    slotEl.innerHTML = `
                        <div style="display:flex; align-items:center; gap:0.6rem; flex:1;">
                            <span style="background:#0f172a; color:#4ade80; font-weight:800; width:28px; height:28px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">${slotIdx + 1}</span>
                            <span class="kk-speaker-tag ${lineObj.roleClass}">${lineObj.speaker}</span>
                            <span style="color:#f8fafc; font-weight:600; font-size:0.96rem;">"${lineObj.text}"</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:0.45rem;">
                            <button type="button" class="kk-slot-listen" style="background:#334155; color:white; border:none; padding:0.35rem 0.6rem; border-radius:8px; cursor:pointer;" title="Lyt til replik">🔊</button>
                            <span style="color:#94a3b8; font-size:0.85rem; padding:0 0.3rem;" title="Fjern replik">✕</span>
                        </div>
                    `;
                    slotEl.querySelector('.kk-slot-listen').onclick = (e) => {
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
                btn.className = `kk-dialog-line-btn ${isUsed ? 'placed' : ''}`;
                btn.innerHTML = `
                    <div style="flex:1;">
                        <span class="kk-speaker-tag ${sLine.roleClass}">${sLine.speaker}</span>
                        <span>"${sLine.text}"</span>
                    </div>
                    <button type="button" class="kk-bank-listen" style="background:#0f172a; color:#4ade80; border:1px solid #16a34a; padding:0.35rem 0.7rem; border-radius:8px; font-weight:700; cursor:pointer; flex-shrink:0;">🔊 Lyt</button>
                `;
                btn.querySelector('.kk-bank-listen').onclick = (e) => {
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
                                        🎉 Perfekt! Du har sat hele den mundtlige køkkendialog i den rigtige rækkefølge!<br>
                                        <span style="display:inline-block; margin-top:0.45rem; background:rgba(15,23,42,0.85); color:#fbbf24; border:1px solid #f59e0b; padding:0.35rem 0.9rem; border-radius:20px; font-size:0.95rem;">
                                            🏆 Din score: ${earnedPoints} / 100 point (${usedCount} hjælpeord åbnet) • ${medalLabel}
                                        </span>
                                    </div>
                                    <div style="display:flex; justify-content:center; gap:0.8rem; flex-wrap:wrap;">
                                        <button id="kk-play-full-dlg" style="background:#2563eb; color:white; border:none; padding:0.75rem 1.3rem; border-radius:12px; font-weight:800; cursor:pointer;">🔊 Afspil hele dialogen</button>
                                        ${usedCount > 0 ? `<button id="kk-retry-100" style="background:#f59e0b; color:#0f172a; border:none; padding:0.75rem 1.3rem; border-radius:12px; font-weight:800; cursor:pointer;">🔄 Prøv igen uden ordhjælp (100 p)</button>` : ''}
                                        <button id="kk-next-dlg" style="background:#22c55e; color:#0f172a; border:none; padding:0.75rem 1.3rem; border-radius:12px; font-weight:800; cursor:pointer;">
                                            ${currDialogIdx < KITCHEN_DIALOGUES.length - 1 ? 'Næste dialog ➔' : 'Prøv dialog 1 igen 🔄'}
                                        </button>
                                    </div>
                                `;
                                feedbackWrap.querySelector('#kk-play-full-dlg').onclick = () => {
                                    const allText = dlg.lines.map(l => l.text).join(' ');
                                    speakDanish(allText);
                                };
                                const retry100Btn = feedbackWrap.querySelector('#kk-retry-100');
                                if (retry100Btn) {
                                    retry100Btn.onclick = () => {
                                        unlockedWordsPerDialog[currDialogIdx] = new Set();
                                        renderDialogueOrderingTask();
                                    };
                                }
                                feedbackWrap.querySelector('#kk-next-dlg').onclick = () => {
                                    currDialogIdx = (currDialogIdx + 1) % KITCHEN_DIALOGUES.length;
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

        bankTitle.querySelector('#kk-dlg-reset').onclick = () => {
            placedLines = new Array(totalLines).fill(null);
            feedbackWrap.innerHTML = '';
            updateDialogUI(false);
        };

        // Valgfri ordliste nedenunder med Selvstændigheds-point
        const glossarySection = document.createElement('div');
        glossarySection.style.cssText = 'margin-top:1.8rem; background:rgba(15,23,42,0.85); border:1.5px solid rgba(34,197,94,0.35); border-radius:18px; padding:1.3rem;';

        let glossaryTransLang = getPreferredTransLang();

        function renderGlossarySection() {
            const unlockedSet = getDialogUnlockedSet(currDialogIdx);
            const wordsList = dlg.difficultWords || [];

            glossarySection.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.8rem; margin-bottom:1rem; padding-bottom:0.8rem; border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div>
                        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                            <h3 style="margin:0; font-size:1.15rem; color:#4ade80;">💡 Valgfri ordliste – Hjælp til svære udtryk i køkkendialogen</h3>
                            <span style="background:rgba(245,158,11,0.18); color:#fbbf24; border:1px solid rgba(245,158,11,0.4); padding:0.2rem 0.65rem; border-radius:12px; font-size:0.78rem; font-weight:800;">
                                Jo færre ord du åbner, jo flere point får du! (-10 point pr. ord)
                            </span>
                        </div>
                        <p style="margin:0.3rem 0 0; color:#94a3b8; font-size:0.88rem;">
                            Prøv først at forstå samtalen ud fra sammenhængen. Klik kun på de ord, du har brug for hjælp til.
                        </p>
                    </div>
                    <div style="display:flex; align-items:center; gap:0.45rem;">
                        <span style="font-size:0.82rem; font-weight:700; color:#cbd5e1;">🌍 Oversæt til:</span>
                        <select id="kk-dlg-glossary-lang" style="background:#1e293b; color:white; border:1px solid #22c55e; border-radius:8px; padding:0.3rem 0.6rem; font-size:0.82rem; font-weight:700; cursor:pointer;">
                            ${SUPPORTED_TRANS_LANGS.map(l => `<option value="${l.code}" ${l.code === glossaryTransLang ? 'selected' : ''}>${l.label}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div id="kk-dlg-glossary-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:0.75rem;"></div>
            `;

            glossarySection.querySelector('#kk-dlg-glossary-lang').onchange = (e) => {
                glossaryTransLang = e.target.value;
                setPreferredTransLang(glossaryTransLang);
                renderGlossarySection();
            };

            const gridEl = glossarySection.querySelector('#kk-dlg-glossary-grid');
            wordsList.forEach(wItem => {
                const isUnlocked = unlockedSet.has(wItem.id);
                const card = document.createElement('div');
                card.style.cssText = `background:${isUnlocked ? '#1e293b' : 'rgba(30,41,59,0.55)'}; border:1.5px ${isUnlocked ? 'solid #22c55e' : 'dashed #475569'}; border-radius:12px; padding:0.85rem 1rem; display:flex; flex-direction:column; justify-content:space-between; gap:0.5rem;`;

                if (!isUnlocked) {
                    card.style.cursor = 'pointer';
                    card.innerHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                            <span style="font-weight:800; color:#f8fafc; font-size:0.98rem;">🔹 "${wItem.word}"</span>
                            <button type="button" class="kk-gl-listen" style="background:#0f172a; color:#4ade80; border:1px solid #334155; padding:0.25rem 0.5rem; border-radius:6px; cursor:pointer; font-size:0.8rem;" title="Lyt til udtrykket (gratis)">🔊</button>
                        </div>
                        <div style="background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#fbbf24; border-radius:8px; padding:0.45rem 0.65rem; font-size:0.8rem; font-weight:700; text-align:center;">
                            🔒 Klik for at se oversættelse & forklaring (-10 point)
                        </div>
                    `;
                    card.querySelector('.kk-gl-listen').onclick = (e) => {
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
                            <span style="font-weight:800; color:#4ade80; font-size:1rem;">🔓 "${wItem.word}"</span>
                            <button type="button" class="kk-gl-listen" style="background:#2563eb; color:white; border:none; padding:0.25rem 0.6rem; border-radius:6px; cursor:pointer; font-size:0.8rem; font-weight:700;">🔊 Lyt</button>
                        </div>
                        <div style="background:rgba(34,197,94,0.14); border-left:3px solid #22c55e; padding:0.45rem 0.65rem; border-radius:6px; color:white; font-weight:800; font-size:0.95rem;">
                            🌍 ${transStr}
                        </div>
                        <div style="font-size:0.84rem; color:#cbd5e1; line-height:1.4;">
                            📖 <strong>Dansk:</strong> ${wItem.da}
                        </div>
                    `;
                    card.querySelector('.kk-gl-listen').onclick = (e) => {
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
    // --- TAB 7: SIG DET HØJT – DINE FØRSTE 3 MÅNEDER SOM KØKKENASSISTENT (BETONING & UDTALE)
    // ========================================================
    const udtalePanel = document.createElement('div');
    udtalePanel.className = `kk-panel ${currentTab === 'tab_udtale' ? 'active' : ''}`;
    udtalePanel.dataset.panel = 'tab_udtale';

    const STRESS_RULES_META = {
        ny_info: {
            label: '🟢 Ny information',
            short: 'Ny info',
            color: '#4ade80',
            borderColor: '#22c55e',
            bg: 'rgba(34, 197, 94, 0.16)',
            desc: 'Vigtige navneord og kerneord, som giver ny viden (f.eks. kokken, gulerødder, bageplade, kølerummet).'
        },
        tal: {
            label: '🔢 Tal',
            short: 'Tal',
            color: '#fbbf24',
            borderColor: '#f59e0b',
            bg: 'rgba(245, 158, 11, 0.16)',
            desc: 'Antal, kilo, minutter og grader (f.eks. én, to, fire, fem).'
        },
        beskrivende: {
            label: '🟠 Beskrivende ord',
            short: 'Beskrivende ord',
            color: '#fb923c',
            borderColor: '#f97316',
            bg: 'rgba(249, 115, 22, 0.16)',
            desc: 'Adjektiver og mådes-/holdningsadverbier (f.eks. varm, tunge, friske, grundigt, heldigvis).'
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

    const KITCHEN_SPEECH_ITEMS = [
        {
            id: 'ksp_1',
            category: '🗣️ Til en gæst ved buffeten (Allergi)',
            situation: 'En gæst i kantinen spørger dig, om der er mælk eller nødder i dagens suppe.',
            speakerLabel: 'En gæst siger:',
            speakerQuote: 'Undskyld, jeg tåler ikke mælk. Ved du, om der er fløde i tomatsuppen?',
            correctText: 'Lige to minutter – jeg spørger lige kokken.',
            options: [
                'Lige to minutter – jeg spørger lige kokken.',
                'Opvaskemaskinen er desværre gået i stykker i dag.',
                'Jeg har allerede skrællet fem kilo kartofler.'
            ],
            tokens: [
                { word: 'Lige' },
                { word: 'to', stress: 'tal', altMatch: ['2', 'to'] },
                { word: 'minutter', stress: 'ny_info' },
                { word: '–' },
                { word: 'jeg' },
                { word: 'spørger', stress: 'ny_info' },
                { word: 'lige' },
                { word: 'kokken.', stress: 'ny_info' }
            ],
            whyTip: 'Ved spørgsmål om allergi må man aldrig gætte! Køkkenchefen bliver tryg ved dig, når du altid spørger kokken først.',
            translations: {
                en: 'Just two minutes – I will just ask the chef.',
                de: 'Nur zwei Minuten – ich frage kurz den Koch.',
                es: 'Solo dos minutos – voy a preguntarle al cocinero.',
                pt: 'Só dois minutos – vou perguntar ao chef.',
                tr: 'Sadece iki dakika – hemen aşçıya soruyorum.',
                ar: 'دقيقتين فقط – سأسأل الطاهي (الشيف) حالاً.',
                fa: 'فقط دو دقیقه – الان از سرآشپز می‌پرسم.',
                ku: 'Tenê du deqe – ez ê niha ji aşpêj bipirsim.',
                ur: 'بس دو منٹ – میں ابھی شیف سے پوچھتا ہوں۔',
                ru: 'Буквально две минуты – я сейчас спрошу у повара.',
                uk: 'Буквально дві хвилини – я зараз запитаю у кухаря.',
                zh: '请等两分钟——我这就去问一下主厨。',
                vi: 'Chỉ hai phút thôi – tôi sẽ hỏi bếp trưởng ngay.',
                th: 'รอสักสองนาทีนะครับ – เดี๋ยวผมไปถามเชฟให้ครับ',
                ne: 'खाली दुई मिनेट – म मुख्य कुकलाई सोध्छु।',
                ps: 'یوازې دوه دقیقې – زه به اوس له اشپز څخه وپوښتم.'
            }
        },
        {
            id: 'ksp_2',
            category: '🗣️ Til en gæst ved buffeten (Opfyldning)',
            situation: 'Fadet med salat på frokostbuffeten er næsten tomt.',
            speakerLabel: 'En gæst siger:',
            speakerQuote: 'Undskyld, kommer der mere af den gode kålsalat på buffeten?',
            correctText: 'Ja, jeg henter hurtigt et nyt fad i køkkenet.',
            options: [
                'Ja, jeg henter hurtigt et nyt fad i køkkenet.',
                'Nej, skærebrættet ligger ude i opvasken.',
                'Jeg vasker mine hænder med koldt vand.'
            ],
            tokens: [
                { word: 'Ja,' },
                { word: 'jeg' },
                { word: 'henter' },
                { word: 'hurtigt', stress: 'beskrivende' },
                { word: 'et' },
                { word: 'nyt', stress: 'beskrivende' },
                { word: 'fad', stress: 'ny_info' },
                { word: 'i' },
                { word: 'køkkenet.', stress: 'ny_info' }
            ],
            whyTip: 'Venligt og effektivt svar til gæsterne i kantinen.',
            translations: {
                en: 'Yes, I will quickly fetch a new platter from the kitchen.',
                de: 'Ja, ich hole schnell eine neue Platte aus der Küche.',
                es: 'Sí, traigo rápidamente una bandeja nueva de la cocina.',
                pt: 'Sim, vou buscar rapidamente uma travessa nova na cozinha.',
                tr: 'Evet, mutfaktan hızlıca yeni bir servis tabağı getiriyorum.',
                ar: 'نعم، سأحضر بسرعة طبق تقديم جديد من المطبخ.',
                fa: 'بله، سریع یک دیس جدید از آشپزخانه می‌آورم.',
                ku: 'Erê, ez ê bi lez sîniyeke nû ji metbexê bînim.',
                ur: 'جی ہاں، میں جلدی سے کچن سے نئی ڈش لے کر آتا ہوں۔',
                ru: 'Да, я быстро принесу новое блюдо из кухни.',
                uk: 'Так, я швидко принесу нове блюдо з кухні.',
                zh: '有的，我马上从厨房拿一盘新的出来。',
                vi: 'Vâng, tôi sẽ nhanh chóng lấy một khay mới từ trong bếp ra.',
                th: 'มีครับ เดี๋ยวผมรีบไปหยิบถาดใหม่จากในครัวมาให้ครับ',
                ne: 'हजुर, म भान्साबाट छिट्टै नयाँ किस्ती (ट्रे) ल्याउँछु।',
                ps: 'هو، زه به ژر له پخلنځي څخه نوی غوری راوړم.'
            }
        },
        {
            id: 'ksp_3',
            category: '🤝 Til kokken (fra Historie 1)',
            situation: 'Kokken beder dig gå i gang med grøntsagerne til dagens suppe.',
            speakerLabel: 'Kokken siger:',
            speakerQuote: 'Sara, starter du med gulerødderne og kartoflerne til suppen nu?',
            correctText: 'Modtaget – først skræller jeg fem kilo gulerødder.',
            options: [
                'Modtaget – først skræller jeg fem kilo gulerødder.',
                'Industriovnen er allerede slukket for i dag.',
                'Gæsterne spiser frokost klokken tolv.'
            ],
            tokens: [
                { word: 'Modtaget', stress: 'ny_info' },
                { word: '–' },
                { word: 'først', stress: 'raekkefoelge' },
                { word: 'skræller' },
                { word: 'jeg' },
                { word: 'fem', stress: 'tal', altMatch: ['5', 'fem'] },
                { word: 'kilo' },
                { word: 'gulerødder.', stress: 'ny_info' }
            ],
            whyTip: 'Kort og klar bekræftelse med rækkefølgeord (først), tal (fem) og ny info (gulerødder).',
            translations: {
                en: 'Understood – first I will peel five kilos of carrots.',
                de: 'Verstanden – zuerst schäle ich fünf Kilo Karotten.',
                es: 'Recibido – primero pelo cinco kilos de zanahorias.',
                pt: 'Entendido – primeiro vou descascar cinco quilos de cenouras.',
                tr: 'Anlaşıldı – önce beş kilo havuç soyuyorum.',
                ar: 'عُلِم – أولاً سأقشّر خمسة كيلوغرامات من الجزر.',
                fa: 'چشم (دریافت شد) – اول پنج کیلو هویج پوست می‌کنم.',
                ku: 'Fêhm kir – pêşî ez پênc kîlo gêzeran diqelînim.',
                ur: 'سمجھ گیا – سب سے پہلے میں پانچ کلو گاجریں چھیلتا ہوں۔',
                ru: 'Принято – сначала я почищу пять килограммов моркови.',
                uk: 'Прийнято – спочатку я почищу п’ять кілограмів моркви.',
                zh: '收到——我先削五公斤胡萝卜。',
                vi: 'Đã rõ – trước tiên tôi sẽ gọt năm cân cà rốt.',
                th: 'รับทราบครับ – อย่างแรกผมจะปอกแครอทห้ากิโลกรัมก่อน',
                ne: 'बुझें – पहिले म पाँच किलो गाजर ताछ्छु।',
                ps: 'پوه شوم – لومړی زه پنځه کیلو ګازرې سپینوم.'
            }
        },
        {
            id: 'ksp_4',
            category: '⚠️ Sikkerhed i køkkenet (fra Historie 2)',
            situation: 'Du tager en rygende varm bageplade ud af industriovnen, og en kollega står lige bag dig.',
            speakerLabel: 'Situation ved ovnen:',
            speakerQuote: 'Du står med en 200 grader varm plade og skal forbi din kollega.',
            correctText: 'Pas på – jeg kommer med en varm bageplade!',
            options: [
                'Pas på – jeg kommer med en varm bageplade!',
                'Mælken står inde på hylden i kølerummet.',
                'Jeg har taget et rent forklæde på i morges.'
            ],
            tokens: [
                { word: 'Pas', stress: 'ny_info' },
                { word: 'på', stress: 'ny_info' },
                { word: '–' },
                { word: 'jeg' },
                { word: 'kommer' },
                { word: 'med' },
                { word: 'en' },
                { word: 'varm', stress: 'beskrivende' },
                { word: 'bageplade!', stress: 'ny_info' }
            ],
            whyTip: 'Sikkerhedsfraser som "Pas på – varm plade!" eller "Pas på – skarp kniv!" forhindrer ulykker i et travlt køkken.',
            translations: {
                en: 'Watch out – I am coming through with a hot baking tray!',
                de: 'Vorsicht – ich komme mit einem heißen Backblech!',
                es: '¡Cuidado, voy con una bandeja de horno caliente!',
                pt: 'Cuidado – estou passando com uma assadeira quente!',
                tr: 'Dikkat et – sıcak fırın tepsisiyle geliyorum!',
                ar: 'انتبه – أنا قادم بصينية فرن ساخنة!',
                fa: 'مواظب باش – دارم با یک سینی فر داغ می‌آیم!',
                ku: 'Hay jê هەbe – ez bi sîniyeke firinê ya germ têm!',
                ur: 'دھیان سے – میں اوون کی گرم ٹرے لے کر آ رہا ہوں!',
                ru: 'Осторожно – я иду с горячим противнем!',
                uk: 'Обережно – я йду з гарячим деком!',
                zh: '小心——我端着烫烤盘过来了！',
                vi: 'Cẩn thận nhé – tôi đang bưng khay nướng rất nóng!',
                th: 'ระวังนะครับ – ผมกำลังถือถาดอบร้อนๆ มาครับ!',
                ne: 'होसियार – म तातो बेकिङ ट्रे लिएर आउँदैछु!',
                ps: 'پام کوئ – زه له تود پتنوس (ټرې) سره راځم!'
            }
        },
        {
            id: 'ksp_5',
            category: '🤝 Til en kollega (Bed om hjælp)',
            situation: 'Suppegryden med 20 liter suppe er alt for tung til at løfte alene.',
            speakerLabel: 'Situation ved komfuret:',
            speakerQuote: 'Du skal have den store gryde over på bordet uden at skade ryggen.',
            correctText: 'Undskyld, kan du lige hjælpe mig med den tunge gryde?',
            options: [
                'Undskyld, kan du lige hjælpe mig med den tunge gryde?',
                'Jeg har sat datomærkning på alle bøtterne.',
                'Kokkekniven hænger oppe på magnetlisten.'
            ],
            tokens: [
                { word: 'Undskyld,' },
                { word: 'kan' },
                { word: 'du' },
                { word: 'lige' },
                { word: 'hjælpe', stress: 'ny_info' },
                { word: 'mig' },
                { word: 'med' },
                { word: 'den' },
                { word: 'tunge', stress: 'beskrivende' },
                { word: 'gryde?', stress: 'ny_info' }
            ],
            whyTip: 'Løft aldrig en tung gryde alene – spørg altid en kollega om hjælp!',
            translations: {
                en: 'Excuse me, can you just help me with the heavy pot?',
                de: 'Entschuldigung, kannst du mir kurz mit dem schweren Topf helfen?',
                es: 'Disculpa, ¿puedes ayudarme un momento con la olla pesada?',
                pt: 'Com licença, pode me ajudar aqui com a panela pesada?',
                tr: 'Affedersin, şu ağır tencere için bana biraz yardım edebilir misin?',
                ar: 'عفواً، هل يمكنك مساعدتي في حمل هذا القدر الثقيل؟',
                fa: 'ببخشید، می‌توانی برای بلند کردن این دیگ سنگین به من کمک کنی؟',
                ku: 'Bibore, tu dikarî ji bo vê beroşa گران alîkariya min bikî?',
                ur: 'معاف کیجیے، کیا آپ اس بھاری پتیلے کو اٹھانے میں میری مدد کر سکتے ہیں؟',
                ru: 'Извини, поможешь мне с этой тяжёлой кастрюлей?',
                uk: 'Вибач, допоможеш мені з цією важкою каструлею?',
                zh: '打扰一下，你能帮我一起端这口重汤锅吗？',
                vi: 'Xin lỗi, bạn có thể giúp tôi bê nồi súp nặng này một chút được không?',
                th: 'ขอโทษนะครับ ช่วยผมยกหม้อใบหนักนี้หน่อยได้ไหมครับ?',
                ne: 'माफ गर्नुहोस्, के तपाईं मलाई यो गह्रौं भाँडो उचाल्न मद्दत गर्न सक्नुहुन्छ?',
                ps: 'بښنه غواړم، آیا کولی شئ د دې درانه دیګ په پورته کولو کې راسره مرسته وکړئ؟'
            }
        },
        {
            id: 'ksp_6',
            category: '🤝 Til en kollega (Maskiner i køkkenet)',
            situation: 'Det er din første uge, og du skal tænde den store røremaskine eller industriopvasker.',
            speakerLabel: 'Situation i køkkenet:',
            speakerQuote: 'Du vil være helt sikker på, hvordan røremaskinen startes sikkert.',
            correctText: 'Vil du lige vise mig røremaskinen én gang?',
            options: [
                'Vil du lige vise mig røremaskinen én gang?',
                'Salaten står allerede ude på buffeten.',
                'Affaldsspanden er tømt og har fået ny pose.'
            ],
            tokens: [
                { word: 'Vil' },
                { word: 'du' },
                { word: 'lige' },
                { word: 'vise', stress: 'ny_info' },
                { word: 'mig' },
                { word: 'røremaskinen', stress: 'ny_info' },
                { word: 'én', stress: 'tal', altMatch: ['1', 'en', 'én', 'et'] },
                { word: 'gang?' }
            ],
            whyTip: 'Chefen sætter stor pris på, at du beder om at få vist maskinerne én gang frem for at gætte.',
            translations: {
                en: 'Will you just show me the stand mixer once?',
                de: 'Würdest du mir die Rührmaschine einmal kurz zeigen?',
                es: '¿Me enseñas cómo funciona la amasadora una vez?',
                pt: 'Você pode me mostrar a batedeira industrial uma vez?',
                tr: 'Bana karıştırma makinesini bir kez gösterir misin?',
                ar: 'هل يمكنك أن تريني كيفية تشغيل العجّانة مرة واحدة؟',
                fa: 'می‌شود کار با همزن صنعتی را یک بار به من نشان بدهی؟',
                ku: 'Tu dikarî makîneya têkelkirinê carekê nîşanî min bidî?',
                ur: 'کیا آپ مجھے ایک بار مکسنگ مشین چلا کر دکھا دیں گے؟',
                ru: 'Покажешь мне тестомес один раз?',
                uk: 'Покажеш мені тістоміс один раз?',
                zh: '你能给我演示一遍这台搅拌机怎么用吗？',
                vi: 'Bạn có thể chỉ cho tôi cách dùng máy trộn một lần được không?',
                th: 'ช่วยสอนวิธีใช้เครื่องผสมอาหารให้ผมดูสักครั้งได้ไหมครับ?',
                ne: 'के तपाईं मलाई यो मिक्सर मेसिन एक पटक चलाएर देखाउन सक्नुहुन्छ?',
                ps: 'آیا کولی شئ ماته یو ځل د اوړو ماشین وښایاست؟'
            }
        },
        {
            id: 'ksp_7',
            category: '🤝 Til kokken (Hygiejne – fra Historie 3)',
            situation: 'Kokken spørger, om stålbordet snart er klar til at anrette på.',
            speakerLabel: 'Kokken spørger:',
            speakerQuote: 'Er du snart færdig ved stålbordet, så vi kan anrette fadene?',
            correctText: 'Ja, først vasker jeg skærebrættet, og bagefter spritter jeg bordet af.',
            options: [
                'Ja, først vasker jeg skærebrættet, og bagefter spritter jeg bordet af.',
                'Nej, jeg har glemt mit forklæde derhjemme.',
                'Kølerummet er femten grader varmt.'
            ],
            tokens: [
                { word: 'Ja,' },
                { word: 'først', stress: 'raekkefoelge' },
                { word: 'vasker' },
                { word: 'jeg' },
                { word: 'skærebrættet,', stress: 'ny_info' },
                { word: 'og' },
                { word: 'bagefter', stress: 'raekkefoelge' },
                { word: 'spritter', stress: 'ny_info' },
                { word: 'jeg' },
                { word: 'bordet', stress: 'ny_info' },
                { word: 'af.' }
            ],
            whyTip: 'Viser at du har helt styr på rækkefølgen i god køkkenhygiejne.',
            translations: {
                en: 'Yes, first I will wash the cutting board, and afterwards I will sanitize the table.',
                de: 'Ja, zuerst wasche ich das Schneidebrett ab, und danach desinfiziere ich den Tisch.',
                es: 'Sí, primero lavo la tabla de cortar y después desinfecto la mesa.',
                pt: 'Sim, primeiro lavo a tábua de corte e depois higienizo a bancada.',
                tr: 'Evet, önce kesme tahtasını yıkıyorum, sonra da masayı dezenfekte edeceğim.',
                ar: 'نعم، أولاً أغسل لوح التقطيع، وبعد ذلك أعقّم الطاولة.',
                fa: 'بله، اول تخته برش را می‌شویم و بعد میز را ضدعفونی می‌کنم.',
                ku: 'Erê, pêşî ez texteyê hûrkirinê dişom, û paşê ez maseyê dezenfekte dikim.',
                ur: 'جی ہاں، پہلے میں چاپنگ بورڈ دھوتا ہوں، اور اس کے بعد میز کو سینیٹائز کروں گا۔',
                ru: 'Да, сначала я помою разделочную доску, а потом продезинфицирую стол.',
                uk: 'Так, спочатку я помию обробну дошку, а потім продезінфікую стіл.',
                zh: '好的，我先把砧板洗干净，接着把工作台消毒擦拭一遍。',
                vi: 'Vâng, trước tiên tôi rửa thớt, và sau đó tôi sẽ khử trùng mặt bàn.',
                th: 'ครับ อย่างแรกผมจะล้างเขียงก่อน และหลังจากนั้นจะเช็ดฆ่าเชื้อโต๊ะครับ',
                ne: 'हजुर, पहिले म चपिङ बोर्ड धुन्छु, र त्यसपछि टेबल सेनिटाइज गर्छु।',
                ps: 'هو، لومړی زه د پرې کولو تخته مینځم، او وروسته مېز ضدعفوني کوم.'
            }
        },
        {
            id: 'ksp_8',
            category: '🤝 Til kokken (Råvarer i kølerummet)',
            situation: 'Du er inde i kølerummet og opdager, at der næsten ikke er flere tomater tilbage.',
            speakerLabel: 'Kokken spørger:',
            speakerQuote: 'Har vi alle råvarer til salaten inde i kølerummet?',
            correctText: 'Vi mangler friske tomater inde i kølerummet.',
            options: [
                'Vi mangler friske tomater inde i kølerummet.',
                'Grovbollerne står inde i opvaskemaskinen.',
                'Jeg snitter kartoflerne med en sløv ske.'
            ],
            tokens: [
                { word: 'Vi' },
                { word: 'mangler', stress: 'ny_info' },
                { word: 'friske', stress: 'beskrivende' },
                { word: 'tomater', stress: 'ny_info' },
                { word: 'inde' },
                { word: 'i' },
                { word: 'kølerummet.', stress: 'ny_info' }
            ],
            whyTip: 'At give besked i god tid, når en råvare er ved at slippe op, er guld værd for kokken.',
            translations: {
                en: 'We are out of / missing fresh tomatoes in the cold room.',
                de: 'Uns fehlen frische Tomaten im Kühlraum.',
                es: 'Nos faltan tomates frescos en la cámara frigorífica.',
                pt: 'Estamos sem tomates frescos na câmara fria.',
                tr: 'Soğuk hava deposunda taze domatesimiz kalmamış (eksik).',
                ar: 'ينقصنا طماطم طازجة داخل غرفة التبريد.',
                fa: 'داخل سردخانه گوجه‌فرنگی تازه کم داریم.',
                ku: 'Di odeya sarincê de bacanên sor ên taze kêm in.',
                ur: 'کولڈ روم میں تازہ ٹماٹر کم ہیں (ختم ہو رہے ہیں)۔',
                ru: 'У нас не хватает свежих помидоров в холодильной камере.',
                uk: 'У нас бракує свіжих помідорів у холодильній камері.',
                zh: '冷藏室里缺新鲜番茄了。',
                vi: 'Chúng ta đang thiếu cà chua tươi trong phòng lạnh.',
                th: 'ในห้องเย็นของเรามะเขือเทศสดหมดครับ',
                ne: 'चिस्यान कोठा (कोल्ड रुम) मा ताजा गोलभेडा अपुग छ।',
                ps: 'په سړه خونه کې تازه رومیان کم دي.'
            }
        },
        {
            id: 'ksp_9',
            category: '🤝 Til kokken (Datomærkning – fra Historie 3)',
            situation: 'Du har pakket de snittede grøntsager i bøtter til i morgen.',
            speakerLabel: 'Kokken spørger:',
            speakerQuote: 'Huskede du at sætte dato-label på bøtterne i kølerummet?',
            correctText: 'Ja, til sidst satte jeg datomærkning på alle fire bøtter.',
            options: [
                'Ja, til sidst satte jeg datomærkning på alle fire bøtter.',
                'Nej, jeg smed alle bøtterne i affaldsspanden.',
                'Suppen koger stadig på komfuret.'
            ],
            tokens: [
                { word: 'Ja,' },
                { word: 'til' },
                { word: 'sidst', stress: 'raekkefoelge' },
                { word: 'satte' },
                { word: 'jeg' },
                { word: 'datomærkning', stress: 'ny_info' },
                { word: 'på' },
                { word: 'alle' },
                { word: 'fire', stress: 'tal', altMatch: ['4', 'fire'] },
                { word: 'bøtter.', stress: 'ny_info' }
            ],
            whyTip: 'Her bruger du rækkefølgeord (til sidst), ny info (datomærkning/bøtter) og tal (fire).',
            translations: {
                en: 'Yes, finally I put date labels on all four containers.',
                de: 'Ja, zum Schluss habe ich auf alle vier Behälter ein Datumsetikett geklebt.',
                es: 'Sí, al final puse la etiqueta de fecha en los cuatro recipientes.',
                pt: 'Sim, por fim coloquei etiqueta de data em todos os quatro potes.',
                tr: 'Evet, son olarak dört kabın hepsine tarih etiketi yapıştırdım.',
                ar: 'نعم، في النهاية وضعت ملصق التاريخ على جميع العلب الأربع.',
                fa: 'بله، در آخر روی هر چهار ظرف برچسب تاریخ زدم.',
                ku: 'Erê, di dawiyê de min etîketa dîrokê li her çar qutiyan xist.',
                ur: 'جی ہاں، آخر میں میں نے چاروں ڈبوں پر تاریخ کا لیبل لگا دیا۔',
                ru: 'Да, в конце я наклеил маркировку с датой на все четыре контейнера.',
                uk: 'Так, насамкінець я наклеїв маркування з датою на всі чотири контейнери.',
                zh: '是的，最后我在四个保鲜盒上都贴了日期标签。',
                vi: 'Vâng, cuối cùng tôi đã dán nhãn ngày tháng lên cả bốn hộp.',
                th: 'ครับ สุดท้ายผมติดป้ายระบุวันที่บนกล่องทั้งสี่ใบเรียบร้อยแล้วครับ',
                ne: 'हजुर, अन्त्यमा मैले चारवटै बट्टामा मितिको स्टिकर टाँसें।',
                ps: 'هو، په پای کې مې په څلورو واړو لوښو د نېټې نښه ولګوله.'
            }
        },
        {
            id: 'ksp_10',
            category: '🤝 Til kokken (Klar til frokost – fra Historie 4)',
            situation: 'Klokken er 11.28, og du har lige stillet de sidste skåle ud i kantinen.',
            speakerLabel: 'Kokken spørger:',
            speakerQuote: 'Er vi klar til at åbne frokostbuffeten for gæsterne nu?',
            correctText: 'Ja, salaten og brødet er heldigvis helt serveringsklare nu.',
            options: [
                'Ja, salaten og brødet er heldigvis helt serveringsklare nu.',
                'Først skal jeg skrælle ti kilo kartofler.',
                'Røremaskinen står nede i kølerummet.'
            ],
            tokens: [
                { word: 'Ja,' },
                { word: 'salaten', stress: 'ny_info' },
                { word: 'og' },
                { word: 'brødet', stress: 'ny_info' },
                { word: 'er' },
                { word: 'heldigvis', stress: 'beskrivende' },
                { word: 'helt' },
                { word: 'serveringsklare', stress: 'beskrivende' },
                { word: 'nu.' }
            ],
            whyTip: 'En skøn sætning at kunne sige hver dag kl. 11.30, når buffeten står skarpt!',
            translations: {
                en: 'Yes, fortunately the salad and the bread are completely ready to serve now.',
                de: 'Ja, der Salat und das Brot sind zum Glück jetzt komplett servierfertig.',
                es: 'Sí, afortunadamente la ensalada y el pan ya están listos para servir.',
                pt: 'Sim, felizmente a salada e o pão já estão totalmente prontos para servir.',
                tr: 'Evet, neyse ki salata ve ekmek şimdi tamamen servise hazır.',
                ar: 'نعم، لحسن الحظ السلطة والخبز جاهزان تماماً للتقديم الآن.',
                fa: 'بله، خوشبختانه سالاد و نان الان کاملاً آماده سرو هستند.',
                ku: 'Erê, bi xêrê selete û nan niha bi temamî amade ne ji bo servîsê.',
                ur: 'جی ہاں، خوش قسمتی سے سلاد اور روٹی اب پیش کرنے کے لیے بالکل تیار ہیں۔',
                ru: 'Да, к счастью, салат и хлеб уже полностью готовы к подаче.',
                uk: 'Так, на щастя, салат і хліб уже повністю готові до подачі.',
                zh: '是的，幸好沙拉和面包现在都完全准备好可以供应了。',
                vi: 'Vâng, may mắn là món salad và bánh mì hiện đã hoàn toàn sẵn sàng để phục vụ.',
                th: 'ครับ โชคดีที่ตอนนี้สลัดและขนมปังพร้อมเสิร์ฟเรียบร้อยแล้วครับ',
                ne: 'हजुर, धन्न सलाद र रोटी अब पस्कनका लागि पूर्ण रूपमा तयार छन्।',
                ps: 'هو، له نېکه مرغه سلاد او ډوډۍ اوس د وړاندې کولو لپاره بالکل چمتو دي.'
            }
        }
    ];

    let currSpeechIdx = 0;
    let speechStepAnswered = false;
    const udtaleCard = document.createElement('div');
    udtaleCard.style.cssText = 'max-width:920px; margin:0 auto; background:rgba(30,41,59,0.72); border:1px solid rgba(255,255,255,0.12); border-radius:20px; padding:1.8rem; box-shadow:0 12px 30px rgba(0,0,0,0.35);';

    function renderKitchenSpeechTask() {
        udtaleCard.innerHTML = '';
        const item = KITCHEN_SPEECH_ITEMS[currSpeechIdx];
        let transLang = getPreferredTransLang();

        const rulesBox = document.createElement('div');
        rulesBox.style.cssText = 'background:rgba(15,23,42,0.92); border:1.5px solid rgba(34,197,94,0.35); border-radius:16px; padding:1.1rem 1.25rem; margin-bottom:1.4rem;';
        rulesBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
                <div style="font-weight:800; font-size:1.05rem; color:#4ade80;">
                    🎯 Regler for dansk betoning (tryk) – Dine første 3 måneder som køkkenassistent
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

        const navPills = document.createElement('div');
        navPills.style.cssText = 'display:flex; gap:0.4rem; flex-wrap:wrap; justify-content:center; margin-bottom:1.3rem;';
        KITCHEN_SPEECH_ITEMS.forEach((sp, idx) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.style.cssText = `padding:0.4rem 0.8rem; border-radius:16px; font-weight:800; font-size:0.82rem; cursor:pointer; border:1.5px solid ${idx === currSpeechIdx ? '#4ade80' : '#475569'}; background:${idx === currSpeechIdx ? '#16a34a' : '#1e293b'}; color:white;`;
            b.textContent = `${idx + 1}`;
            b.title = sp.category;
            b.onclick = () => {
                currSpeechIdx = idx;
                speechStepAnswered = false;
                renderKitchenSpeechTask();
            };
            navPills.appendChild(b);
        });
        udtaleCard.appendChild(navPills);

        const sitBox = document.createElement('div');
        sitBox.style.cssText = 'background:#0f172a; border-left:4px solid #22c55e; border-radius:14px; padding:1.25rem; margin-bottom:1.3rem;';
        sitBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem;">
                <span style="background:rgba(34,197,94,0.18); color:#4ade80; border:1px solid rgba(34,197,94,0.4); padding:0.25rem 0.75rem; border-radius:20px; font-size:0.8rem; font-weight:800;">
                    Situation ${currSpeechIdx + 1} / ${KITCHEN_SPEECH_ITEMS.length} • ${item.category}
                </span>
                <button type="button" id="kk-sp-listen-prompt" style="background:#1e293b; color:#4ade80; border:1px solid #16a34a; padding:0.35rem 0.85rem; border-radius:16px; font-weight:700; font-size:0.82rem; cursor:pointer;">
                    🔊 Lyt til replikken
                </button>
            </div>
            <p style="margin:0 0 0.6rem; color:#94a3b8; font-size:0.94rem;"><strong>📍 Situation:</strong> ${item.situation}</p>
            <div style="background:#1e293b; border-radius:12px; padding:0.9rem 1.1rem; border:1px solid rgba(255,255,255,0.08);">
                <div style="font-size:0.8rem; font-weight:800; color:#4ade80; text-transform:uppercase; margin-bottom:0.25rem;">${item.speakerLabel}</div>
                <div style="font-size:1.2rem; font-weight:700; color:white;">"${item.speakerQuote}"</div>
            </div>
        `;
        sitBox.querySelector('#kk-sp-listen-prompt').onclick = () => speakDanish(item.speakerQuote, 0.92);
        udtaleCard.appendChild(sitBox);

        const step1Box = document.createElement('div');
        step1Box.style.cssText = 'margin-bottom:1.4rem;';
        step1Box.innerHTML = `<h3 style="margin:0 0 0.75rem; font-size:1.15rem; color:white;">1️⃣ Hvad siger du? (Vælg den rigtige sætning):</h3>`;

        const optsList = document.createElement('div');
        optsList.style.cssText = 'display:flex; flex-direction:column; gap:0.65rem;';
        const step1Feedback = document.createElement('div');
        step1Feedback.style.cssText = 'margin-top:0.75rem; font-weight:700;';

        const step2Box = document.createElement('div');
        step2Box.style.display = speechStepAnswered ? 'block' : 'none';

        shuffleArray([...item.options]).forEach(optText => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const isCorrect = optText === item.correctText;
            btn.style.cssText = `text-align:left; background:${speechStepAnswered && isCorrect ? 'rgba(34,197,94,0.22)' : '#1e293b'}; border:2px solid ${speechStepAnswered && isCorrect ? '#22c55e' : '#475569'}; color:white; padding:0.95rem 1.2rem; border-radius:12px; font-size:1.05rem; font-weight:700; cursor:pointer;`;
            btn.textContent = `"${optText}"`;

            btn.onclick = () => {
                if (isCorrect) {
                    speechStepAnswered = true;
                    Array.from(optsList.children).forEach(c => { c.style.opacity = '0.55'; });
                    btn.style.opacity = '1';
                    btn.style.background = 'rgba(34, 197, 94, 0.22)';
                    btn.style.borderColor = '#22c55e';
                    btn.style.color = '#4ade80';
                    step1Feedback.innerHTML = `<span style="color:#4ade80;">✓ Helt rigtigt! 💡 ${item.whyTip}</span>`;
                    step2Box.style.display = 'block';
                    speakDanish(item.correctText, 0.9);
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

        const tokensHtml = item.tokens.map((t, tIdx) => {
            if (!t.stress) {
                return `<span class="kk-sp-token" data-tidx="${tIdx}" style="display:inline-flex; flex-direction:column; align-items:center; margin:0 0.22rem; padding:0.2rem 0.15rem; font-size:1.45rem; font-weight:600; color:#cbd5e1;">
                    <span>${t.word}</span>
                    <span style="font-size:0.68rem; color:transparent; user-select:none; margin-top:0.25rem;">•</span>
                </span>`;
            }
            const rMeta = STRESS_RULES_META[t.stress];
            return `<span class="kk-sp-token kk-sp-stressed" data-tidx="${tIdx}" style="display:inline-flex; flex-direction:column; align-items:center; margin:0 0.28rem; padding:0.2rem 0.3rem; background:${rMeta.bg}; border-radius:10px;">
                <span style="font-size:1.52rem; font-weight:900; color:white; border-bottom:4px solid ${rMeta.borderColor}; padding-bottom:2px;">
                    ${t.word}
                </span>
                <span style="font-size:0.7rem; font-weight:800; color:${rMeta.color}; margin-top:0.3rem; white-space:nowrap;">
                    ${rMeta.short}
                </span>
            </span>`;
        }).join(' ');

        step2Box.innerHTML = `
            <div style="background:#0f172a; border:2px solid #22c55e; border-radius:18px; padding:1.5rem; margin-top:1rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.9rem;">
                    <h3 style="margin:0; font-size:1.18rem; color:#4ade80;">
                        2️⃣ Sig sætningen højt – læg ekstra tryk på de <u>understregede</u> ord:
                    </h3>
                    <div style="display:flex; align-items:center; gap:0.4rem;">
                        <span style="font-size:0.8rem; color:#94a3b8; font-weight:700;">🌍 Oversættelse:</span>
                        <select id="kk-sp-trans-lang" style="background:#1e293b; color:white; border:1px solid #22c55e; border-radius:8px; padding:0.25rem 0.55rem; font-size:0.8rem; font-weight:700; cursor:pointer;">
                            ${SUPPORTED_TRANS_LANGS.map(l => `<option value="${l.code}" ${l.code === transLang ? 'selected' : ''}>${l.label}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <div style="background:#1e293b; border-radius:14px; padding:1.35rem 1rem; text-align:center; line-height:2.1; margin-bottom:0.9rem; border:1px solid rgba(255,255,255,0.08);">
                    ${tokensHtml}
                </div>

                <div style="background:rgba(34,197,94,0.1); border-left:3px solid #22c55e; padding:0.6rem 0.95rem; border-radius:8px; margin-bottom:1.2rem; color:#e2e8f0; font-size:0.96rem;">
                    🌍 <strong id="kk-sp-trans-out">${item.translations[transLang] || item.translations.en}</strong>
                </div>

                <div style="display:flex; justify-content:center; gap:0.75rem; flex-wrap:wrap; margin-bottom:1.1rem;">
                    <button type="button" id="kk-sp-listen-normal" style="background:#2563eb; color:white; border:none; padding:0.75rem 1.25rem; border-radius:12px; font-weight:800; font-size:0.95rem; cursor:pointer;">
                        🔊 Lyt i naturligt tempo
                    </button>
                    <button type="button" id="kk-sp-listen-slow" style="background:#1e293b; color:#4ade80; border:1.5px solid #16a34a; padding:0.75rem 1.25rem; border-radius:12px; font-weight:800; font-size:0.95rem; cursor:pointer;">
                        🐢 Lyt langsomt (hør betoningen)
                    </button>
                    <button type="button" id="kk-sp-record-btn" style="background:linear-gradient(135deg, #ef4444, #dc2626); color:white; border:none; padding:0.75rem 1.4rem; border-radius:12px; font-weight:800; font-size:0.98rem; cursor:pointer; box-shadow:0 4px 15px rgba(239,68,68,0.35);">
                        🎙️ Indtal sætningen (Udtalefeedback)
                    </button>
                </div>

                <div id="kk-sp-speech-feedback" style="min-height:48px; text-align:center;"></div>

                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.2rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.08);">
                    <button type="button" id="kk-sp-prev" style="background:#334155; color:white; border:none; padding:0.6rem 1.1rem; border-radius:10px; font-weight:700; cursor:pointer;">
                        ← Forrige
                    </button>
                    <button type="button" id="kk-sp-next" style="background:#22c55e; color:#0f172a; border:none; padding:0.65rem 1.35rem; border-radius:10px; font-weight:800; cursor:pointer;">
                        ${currSpeechIdx < KITCHEN_SPEECH_ITEMS.length - 1 ? 'Næste situation ➔' : 'Start forfra (Situation 1) 🔄'}
                    </button>
                </div>
            </div>
        `;

        step2Box.querySelector('#kk-sp-trans-lang').onchange = (e) => {
            transLang = e.target.value;
            setPreferredTransLang(transLang);
            step2Box.querySelector('#kk-sp-trans-out').textContent = item.translations[transLang] || item.translations.en;
        };

        step2Box.querySelector('#kk-sp-listen-normal').onclick = () => speakDanish(item.correctText, 0.92);
        step2Box.querySelector('#kk-sp-listen-slow').onclick = () => speakDanish(item.correctText, 0.68);

        step2Box.querySelector('#kk-sp-prev').onclick = () => {
            currSpeechIdx = (currSpeechIdx - 1 + KITCHEN_SPEECH_ITEMS.length) % KITCHEN_SPEECH_ITEMS.length;
            speechStepAnswered = false;
            renderKitchenSpeechTask();
        };
        step2Box.querySelector('#kk-sp-next').onclick = () => {
            currSpeechIdx = (currSpeechIdx + 1) % KITCHEN_SPEECH_ITEMS.length;
            speechStepAnswered = false;
            renderKitchenSpeechTask();
        };

        const recordBtn = step2Box.querySelector('#kk-sp-record-btn');
        const speechFb = step2Box.querySelector('#kk-sp-speech-feedback');

        function normalizeWord(str) {
            return (str || '').toLowerCase().replace(/[.,!?–\-:;"'()]/g, '').trim();
        }

        function evaluateSpokenTranscript(transcript) {
            const spokenWords = transcript.toLowerCase().replace(/[.,!?–\-:;"'()]/g, ' ').split(/\s+/).filter(Boolean);
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
                            <button type="button" id="kk-sp-self-ok" style="background:#22c55e; color:#0f172a; border:none; padding:0.5rem 1.1rem; border-radius:8px; font-weight:800; cursor:pointer;">
                                ✓ Jeg har sagt sætningen højt med betoning!
                            </button>
                        </div>
                    </div>
                `;
                const selfOk = speechFb.querySelector('#kk-sp-self-ok');
                if (selfOk) selfOk.onclick = () => evaluateSpokenTranscript(item.correctText);
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

    renderKitchenSpeechTask();
    udtalePanel.appendChild(udtaleCard);
    panelsHolder.appendChild(udtalePanel);

    container.appendChild(viewContainer);
}
