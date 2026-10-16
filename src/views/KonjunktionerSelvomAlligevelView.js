import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

/**
 * KonjunktionerSelvomAlligevelView - Særskilt Flade: "SELVOM" og "ALLIGEVEL"
 *
 * Kombinerer:
 *  1. Interaktivt Vrimlebillede (assets/selvom_alligevel_vrimmel.jpg) med 10 parrede hotspots:
 *     - 🧱 SELVOM (Muren / Forhindringen): Ledsætningskonjunktion (Subjekt + IKKE + Verbum)
 *     - ☄️ ALLIGEVEL (Bolden der bryder gennem muren): Konnektivt adverbium (Inversion i front eller på midterpladsen)
 *  2. Den kognitive illustration fra Træning 2 (selvom_alligevel_guide.png) integreret direkte i fladen
 *  3. Ordstillings-røntgen & Sætnings-Transformeren (Omskriv "Selvom det regner, går vi en tur" ↔ "Det regner, men vi går alligevel en tur" / "Det regner. Alligevel går vi en tur")
 */
export function renderKonjunktionerSelvomAlligevelView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container selvom-alligevel-view';

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

    const toFordiBtn = document.createElement('button');
    toFordiBtn.className = 'back-btn';
    toFordiBtn.style.background = 'rgba(56, 189, 248, 0.15)';
    toFordiBtn.style.borderColor = '#38bdf8';
    toFordiBtn.style.color = '#7dd3fc';
    toFordiBtn.innerHTML = `➡️ Fordi / Derfor ➔`;
    toFordiBtn.onclick = () => navigateFn('konjunktioner_fordi_derfor', { from: 'top_konjunktioner' });
    otherPairsDiv.appendChild(toFordiBtn);

    const toTekstflowBtn = document.createElement('button');
    toTekstflowBtn.className = 'back-btn';
    toTekstflowBtn.style.background = 'rgba(99, 102, 241, 0.15)';
    toTekstflowBtn.style.borderColor = '#6366f1';
    toTekstflowBtn.style.color = '#a5b4fc';
    toTekstflowBtn.innerHTML = `📖 Tekstflow & Historier ➔`;
    toTekstflowBtn.onclick = () => navigateFn('konjunktioner_all', { tab: 'tekstflow', from: 'konjunktioner_selvom_alligevel' });
    otherPairsDiv.appendChild(toTekstflowBtn);

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

    // 10 Hotspots on assets/selvom_alligevel_vrimmel.jpg
    const SELVOM_ALLIGEVEL_DATA = [
        {
            id: 'selvom_regn',
            word: 'selvom (forhindringen = regnen)',
            shortLabel: '🧱 selvom (det regner)',
            category: 'selvom',
            cognitiveIcon: '🧱 Muren / Forhindringen (Ledsætning)',
            x: 16,
            y: 12,
            meaning: 'Bygger muren/forhindringen op i en ledsætning ("although / even though")',
            sceneDesc: 'De mørke skyer øsregner ned over parken – regnen er den forhindring (muren), man normalt ville blive stoppet af.',
            sentence: 'Selvom det regner, går vi en tur.',
            contextSentence: 'Selvom det øsregner og blæser i parken, lufter parret glade deres hund.',
            ruleHint: '🧱 SELVOM = MUREN: "Selvom" står altid foran selve FORHINDRINGEN ("det regner"). Og fordi "selvom"-sætningen står forrest her, kommer der INVERSION efter kommaet: "... GÅR VI en tur"!',
            translations: {
                en: { word: 'although / even though (+ obstacle clause)', sentence: 'Even though it is pouring rain and windy in the park, the couple happily walks their dog.' },
                de: { word: 'obwohl (+ Nebensatz = Hindernis)', sentence: 'Obwohl es im Park in Strömen regnet, geht das Paar fröhlich mit dem Hund spazieren.' },
                es: { word: 'aunque (+ obstáculo)', sentence: 'Aunque llueve a cántaros en el parque, la pareja pasea felizmente a su perro.' },
                ar: { word: 'عَلَى الرَّغْمِ مِنْ أَنَّ (العائق / الجدار)', sentence: 'على الرغم من أنها تمطر بغزارة في الحديقة، يتمشى الزوجان بسعادة مع كلبهما.' },
                tr: { word: '-mesine rağmen ("selvom" = engel/duvar)', sentence: 'Parkta bardaktan boşanırcasına yağmur yağmasına rağmen çift köpeklerini neşeyle gezdiriyor.' },
                uk: { word: 'хоча / незважаючи на те що (перешкода)', sentence: 'Хоча в парку ллє дощ, пара радісно вигулює свого собаку.' }
            }
        },
        {
            id: 'alligevel_regn',
            word: 'alligevel (gennembruddet trods regn)',
            shortLabel: '☄️ alligevel (går en tur)',
            category: 'alligevel',
            cognitiveIcon: '☄️ Bolden gennem muren (Trods-handling)',
            x: 18,
            y: 34,
            meaning: 'Viser at handlingen gennemføres PÅ TRODS af forhindringen ("anyway / nevertheless")',
            sceneDesc: 'Parret i gult og rødt regntøj lader sig ikke stoppe af regnen – de går tur alligevel!',
            sentence: 'Det regner, men vi går alligevel en tur.',
            contextSentence: 'Vejret er vådt og gråt i dag. Alligevel tager de regntøj på og går ud i parken.',
            ruleHint: '☄️ ALLIGEVEL = GENNEMBRUDDET: Muren ("Det regner") er allerede nævnt først. Nu bryder handlingen igennem muren med "alligevel"!',
            translations: {
                en: { word: 'anyway / nevertheless (breaking through the obstacle)', sentence: 'It is raining, but we are going for a walk anyway.' },
                de: { word: 'trotzdem / dennoch (Durchbruch)', sentence: 'Es regnet, aber wir machen trotzdem einen Spaziergang.' },
                es: { word: 'de todos modos / aun así', sentence: 'Está lloviendo, pero vamos a dar un paseo de todos modos.' },
                ar: { word: 'مَعَ ذَلِكَ / رَغْمَ ذَلِكَ (اختراق الجدار)', sentence: 'إنها تمطر، لكننا سنذهب في نزهة على الأقدام مع ذلك.' },
                tr: { word: 'yine de / buna rağmen ("alligevel")', sentence: 'Yağmur yağıyor ama yine de yürüyüşe çıkıyoruz.' },
                uk: { word: 'все одно / проте ("alligevel")', sentence: 'Йде дощ, але ми все одно йдемо на прогулянку.' }
            }
        },
        {
            id: 'selvom_sne_bud',
            word: 'selvom (sne og kulde)',
            shortLabel: '🧱 selvom (det sner)',
            category: 'selvom',
            cognitiveIcon: '🧱 Muren / Forhindringen',
            x: 10,
            y: 62,
            meaning: 'Introducerer den svære situation i en ledsætning',
            sceneDesc: 'Sneen ligger tykt på den stejle bakke, hvor cykelbuddet kører op med pakker.',
            sentence: 'Selvom han fryser i sneen, smiler han til kunderne.',
            contextSentence: 'Cykelbuddet bringer varm mad ud til tiden, selvom vejene er dækket af sne.',
            ruleHint: '🧱 SELVOM kan både stå FORREST ("Selvom han fryser, smiler han") og BAGERST efter komma ("Han smiler, selvom han fryser") – men det står ALTID lige foran selve forhindringen!',
            translations: {
                en: { word: 'even though (snow and cold)', sentence: 'Even though he is freezing in the snow, he smiles at the customers.' },
                de: { word: 'obwohl (Schnee und Kälte)', sentence: 'Obwohl er im Schnee friert, lächelt er die Kunden an.' },
                es: { word: 'aunque (nieve y frío)', sentence: 'Aunque tiene frío en la nieve, sonríe a los clientes.' },
                ar: { word: 'رَغْمَ أَنَّ (الثلج والبرد)', sentence: 'على الرغم من أنه يشعر بالبرد في الثلج، فإنه يبتسم للزبائن.' },
                tr: { word: 'karda üşümesine rağmen ("selvom")', sentence: 'Karda üşümesine rağmen müşterilere gülümsüyor.' },
                uk: { word: 'хоча (сніг і холод)', sentence: 'Хоча він мерзне на снігу, він усміхається клієнтам.' }
            }
        },
        {
            id: 'alligevel_sne_bud',
            word: 'alligevel (fortsætter på trods)',
            shortLabel: '☄️ fortsætter alligevel',
            category: 'alligevel',
            cognitiveIcon: '☄️ Bolden gennem muren (Sidst/Midt i helsætning)',
            x: 16,
            y: 80,
            meaning: 'Står i den sætning, der gennemføres på trods af problemet',
            sceneDesc: 'Cykelbuddet træder hårdt i pedalerne og gennemfører sin vagt trods snevejret.',
            sentence: 'Det er en hård vagt, men han fortsætter alligevel.',
            contextSentence: 'Bakken er stejl og glat, men cykelbuddet gennemfører alligevel hele sin rute.',
            ruleHint: '☄️ PLACERING AF ALLIGEVEL: Efter "men" står "alligevel" inde i helsætningen efter verbet ("... men han fortsætter ALLIGEVEL").',
            translations: {
                en: { word: 'continues anyway', sentence: 'It is a tough shift, but he continues anyway.' },
                de: { word: 'macht trotzdem weiter', sentence: 'Es ist eine harte Schicht, aber er macht trotzdem weiter.' },
                es: { word: 'continúa de todos modos', sentence: 'Es un turno duro, pero continúa de todos modos.' },
                ar: { word: 'يستمر مع ذلك', sentence: 'إنها مناوبة صعبة، لكنه يستمر مع ذلك.' },
                tr: { word: 'yine de devam ediyor ("alligevel")', sentence: 'Zor bir vardiya ama yine de devam ediyor.' },
                uk: { word: 'все одно продовжує', sentence: 'Це важка зміна, але він все одно продовжує.' }
            }
        },
        {
            id: 'selvom_muren_midte',
            word: 'selvom (selve muren i parken)',
            shortLabel: '🧱 Muren = SELVOM',
            category: 'selvom',
            cognitiveIcon: '🧱 Den Visuelle Mur-Metafor',
            x: 48,
            y: 47,
            meaning: 'Visuelt symbol: "Selvom" bygger muren op!',
            sceneDesc: 'Midt i parken står murstensmuren som en forhindring på løbebanen, men løberen springer over den.',
            sentence: 'Selvom muren står i vejen, stopper løberen ikke.',
            contextSentence: 'Hun gennemfører forhindringsløbet i parken, selvom muren ikke er nem at hoppe over.',
            ruleHint: '🧲 HUSK "IKKE"-MAGNETEN: I en "selvom"-ledsætning står "ikke" altid FØR verbet ("... selvom muren IKKE er nem")!',
            translations: {
                en: { word: 'although (the brick wall obstacle)', sentence: 'Even though the wall is in the way, the runner does not stop.' },
                de: { word: 'obwohl (die Mauer als Hindernis)', sentence: 'Obwohl die Mauer im Weg steht, hält die Läuferin nicht an.' },
                es: { word: 'aunque (el muro como obstáculo)', sentence: 'Aunque el muro está en el camino, la corredora no se detiene.' },
                ar: { word: 'عَلَى الرَّغْمِ مِنْ (الجدار كعائق)', sentence: 'على الرغم من أن الجدار يقف في الطريق، لا تتوقف العداءة.' },
                tr: { word: 'duvar engel olsa da ("selvom")', sentence: 'Duvar yolun ortasında dursa da koşucu durmuyor.' },
                uk: { word: 'хоча (стіна як перешкода)', sentence: 'Хоча стіна стоїть на шляху, бігунка не зупиняється.' }
            }
        },
        {
            id: 'alligevel_bolden_midte',
            word: 'alligevel (bolden gennem muren!)',
            shortLabel: '☄️ Bolden = ALLIGEVEL',
            category: 'alligevel',
            cognitiveIcon: '☄️ Den Visuelle Bold-Metafor',
            x: 58,
            y: 50,
            meaning: 'Visuelt symbol: "Alligevel" er bolden, der brager lige gennem muren!',
            sceneDesc: 'Den blå kugle brager direkte igennem murstensmuren, så stenene flyver til alle sider!',
            sentence: 'Muren er tyk, men bolden bryder alligevel igennem!',
            contextSentence: 'Forhindringen så umulig ud. Alligevel fløj den blå bold direkte igennem muren!',
            ruleHint: '☄️ DEN KOGNITIVE HUSKEREGEL: Spørg dig selv: Er jeg ved at beskrive MUREN/PROBLEMET (➔ selvom), eller er jeg ved at beskrive GENNEMBRUDDET/HANDLINGEN PÅ TRODS (➔ alligevel)?',
            translations: {
                en: { word: 'nevertheless / anyway (the ball smashing through)', sentence: 'The wall is thick, but the ball breaks through anyway!' },
                de: { word: 'trotzdem (der Ball durchbricht die Mauer)', sentence: 'Die Mauer ist dick, aber der Ball bricht trotzdem durch!' },
                es: { word: 'aun así (la bola rompe el muro)', sentence: '¡El muro es grueso, pero la bola lo atraviesa de todos modos!' },
                ar: { word: 'مَعَ ذَلِكَ (الكرة تخترق الجدار)', sentence: 'الجدار سميك، لكن الكرة تخترقه مع ذلك!' },
                tr: { word: 'yine de (top duvarı delip geçiyor)', sentence: 'Duvar kalın ama top yine de delip geçiyor!' },
                uk: { word: 'все одно (куля пробиває стіну)', sentence: 'Стіна товста, але куля все одно пробивається крізь неї!' }
            }
        },
        {
            id: 'selvom_syg',
            word: 'selvom (han er syg)',
            shortLabel: '🧱 selvom (han er syg)',
            category: 'selvom',
            cognitiveIcon: '🧱 Muren / Forhindringen (Sygdom)',
            x: 88,
            y: 19,
            meaning: 'Sygdommen er forhindringen, som indledes med "selvom"',
            sceneDesc: 'Manden på værelset har halstørklæde på og feber på termometeret.',
            sentence: 'Selvom han er syg, arbejder han ved computeren.',
            contextSentence: 'Han besvarer de vigtigste mails hjemmefra, selvom han ikke føler sig rask.',
            ruleHint: '🧱 BEMÆRK: Hvis du sætter "Selvom" foran "han er syg", er selve sygdommen muren. Du må ALDRIG bruge både "selvom" og "men" i samme sætning!',
            translations: {
                en: { word: 'even though (he is sick)', sentence: 'Even though he is sick, he works at the computer.' },
                de: { word: 'obwohl (er krank ist)', sentence: 'Obwohl er krank ist, arbeitet er am Computer.' },
                es: { word: 'aunque (está enfermo)', sentence: 'Aunque está enfermo, trabaja en la computadora.' },
                ar: { word: 'عَلَى الرَّغْمِ مِنْ أَنَّهُ مَرِيضٌ', sentence: 'على الرغم من أنه مريض، فإنه يعمل على الحاسوب.' },
                tr: { word: 'hasta olmasına rağmen ("selvom")', sentence: 'Hasta olmasına rağmen bilgisayarda çalışıyor.' },
                uk: { word: 'хоча (він хворий)', sentence: 'Хоча він хворий, він працює за комп\'ютером.' }
            }
        },
        {
            id: 'alligevel_syg',
            word: 'alligevel (arbejder på trods af feber)',
            shortLabel: '☄️ arbejder alligevel',
            category: 'alligevel',
            cognitiveIcon: '☄️ Gennembruddet (Inversion i front / midt)',
            x: 82,
            y: 34,
            meaning: 'Arbejdet gennemføres på trods af feberen',
            sceneDesc: 'Manden drikker varm te og skriver videre på sin laptop trods feberen.',
            sentence: 'Han er syg, men han tager alligevel på arbejde.',
            contextSentence: 'Han har lidt feber i dag. Alligevel gør han rapporten færdig før mødet.',
            ruleHint: '🔄 INVERSION NÅR ALLIGEVEL STÅR FORREST: "Han har feber. ALLIGEVEL GØR HAN rapporten færdig" (Verbum FØR Subjekt!).',
            translations: {
                en: { word: 'works anyway / nevertheless', sentence: 'He is sick, but he goes to work anyway.' },
                de: { word: 'arbeitet trotzdem', sentence: 'Er ist krank, aber er geht trotzdem zur Arbeit.' },
                es: { word: 'trabaja de todos modos', sentence: 'Está enfermo, pero va a trabajar de todos modos.' },
                ar: { word: 'يعمل مع ذلك', sentence: 'إنه مريض، لكنه يذهب إلى العمل مع ذلك.' },
                tr: { word: 'yine de işe gidiyor ("alligevel")', sentence: 'Hasta ama yine de işe gidiyor.' },
                uk: { word: 'все одно працює', sentence: 'Він хворий, але все одно йде на роботу.' }
            }
        },
        {
            id: 'alligevel_gammel_bil',
            word: 'alligevel (bilen kører godt)',
            shortLabel: '☄️ kører alligevel godt',
            category: 'alligevel',
            cognitiveIcon: '☄️ Gennembruddet (Den gamle bil)',
            x: 75,
            y: 63,
            meaning: 'Bilen præsterer godt mod forventning',
            sceneDesc: 'Den lille gamle orange bil drøner friskt op ad bakken i snevejret.',
            sentence: 'Bilen er gammel, men den kører alligevel godt.',
            contextSentence: 'Den lille orange bil har kørt mange tusinde kilometer. Alligevel starter den hver eneste morgen.',
            ruleHint: '☄️ SAMMENLIGN DE TO MÅDER AT SIGE DET PÅ: 1) "Selvom bilen er gammel [🧱 muren], kører den godt." ↔ 2) "Bilen er gammel, men den kører alligevel godt [☄️ bolden]!"',
            translations: {
                en: { word: 'drives well anyway', sentence: 'The car is old, but it drives well anyway.' },
                de: { word: 'fährt trotzdem gut', sentence: 'Das Auto ist alt, aber es fährt trotzdem gut.' },
                es: { word: 'funciona bien de todos modos', sentence: 'El coche es viejo, pero funciona bien de todos modos.' },
                ar: { word: 'تسير بشكل جيد مع ذلك', sentence: 'السيارة قديمة، لكنها تسير بشكل جيد مع ذلك.' },
                tr: { word: 'yine de iyi gidiyor ("alligevel")', sentence: 'Araba eski ama yine de iyi çalışıyor.' },
                uk: { word: 'все одно добре їздить', sentence: 'Машина стара, але все одно їздить добре.' }
            }
        },
        {
            id: 'selvom_drivhus',
            word: 'selvom (koldt udenfor drivhuset)',
            shortLabel: '🧱 selvom (det er koldt ude)',
            category: 'selvom',
            cognitiveIcon: '🧱 Muren / Kontrasten',
            x: 89,
            y: 83,
            meaning: 'Kontrast mellem kulden udenfor og varmen i drivhuset',
            sceneDesc: 'Gartneren står i grønne planter inde i det lune drivhus, mens sneen ligger udenfor.',
            sentence: 'Selvom det er vinter udenfor, gror blomsterne i drivhuset.',
            contextSentence: 'Blomsterne spirer flot i det lune drivhus, selvom der ligger sne på jorden udenfor.',
            ruleHint: '🧱 HUSK: "Selvom" binder to sætninger sammen uden brug af "men" eller "alligevel" (eller man kan sige det ekstra tydeligt i talesprog, men i skriftsprog er "Selvom X, så Y" klarest!).',
            translations: {
                en: { word: 'even though (it is winter outside)', sentence: 'Even though it is winter outside, the flowers grow in the greenhouse.' },
                de: { word: 'obwohl (es draußen Winter ist)', sentence: 'Obwohl draußen Winter ist, wachsen die Blumen im Gewächshaus.' },
                es: { word: 'aunque (es invierno afuera)', sentence: 'Aunque es invierno afuera, las flores crecen en el invernadero.' },
                ar: { word: 'رَغْمَ أَنَّ (الشتاء في الخارج)', sentence: 'على الرغم من أن الفصل شتاء في الخارج، تنمو الأزهار في الدفيئة.' },
                tr: { word: 'dışarıda kış olmasına rağmen ("selvom")', sentence: 'Dışarıda kış olmasına rağmen çiçekler serada büyüyor.' },
                uk: { word: 'хоча (надворі зима)', sentence: 'Хоча надворі зима, квіти ростуть у теплиці.' }
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
        .selvom-alligevel-view {
            max-width: 1240px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .sa-hero { text-align: center; margin-bottom: 1.8rem; }
        .sa-hero-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(249, 115, 22, 0.2);
            border: 1px solid #f97316;
            color: #fdba74;
            padding: 0.45rem 1.1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 0.8rem;
        }
        .sa-hero h1 {
            font-size: 2.5rem;
            font-weight: 900;
            margin: 0 0 0.7rem;
            background: linear-gradient(135deg, #fdba74, #f97316, #38bdf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .sa-hero p { color: #cbd5e1; font-size: 1.1rem; max-width: 850px; margin: 0 auto; line-height: 1.6; }

        .cognitive-guide-banner {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
            border: 2px solid #f97316;
            border-radius: 22px;
            padding: 1.5rem 1.8rem;
            margin-bottom: 2rem;
            display: grid;
            grid-template-columns: 380px 1fr;
            gap: 1.8rem;
            align-items: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        @media (max-width: 850px) { .cognitive-guide-banner { grid-template-columns: 1fr; text-align: center; } }
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
            background: #ea580c;
            color: white;
            box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
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
        .filter-btn.active { background: #ea580c; color: white; border-color: #f97316; }
        .pure-toggle-btn {
            background: rgba(249, 115, 22, 0.15);
            border: 1px solid #f97316;
            color: #fdba74;
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
        .hotspot-pin.pin-selvom { background: #f97316; }
        .hotspot-pin.pin-alligevel { background: #0ea5e9; }
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
            border: 2px solid #f97316;
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
            background: rgba(249, 115, 22, 0.2);
            border: 1px solid #f97316;
            color: #fdba74;
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
            border-left: 4px solid #f97316;
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
            border: 1.5px solid rgba(249, 115, 22, 0.35);
        }
        .inspector-speak-btn {
            background: rgba(249, 115, 22, 0.15);
            border: 1px solid #f97316;
            color: #fdba74;
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
        .detektiv-opt-btn:hover { border-color: #f97316; background: #334155; }
        .detektiv-opt-btn.correct { background: rgba(34, 197, 94, 0.25) !important; border-color: #22c55e !important; color: #4ade80 !important; }
        .detektiv-opt-btn.wrong { background: rgba(239, 68, 68, 0.25) !important; border-color: #ef4444 !important; color: #fca5a5 !important; }
    `;
    viewContainer.appendChild(style);

    // Hero
    const hero = document.createElement('div');
    hero.className = 'sa-hero';
    hero.innerHTML = `
        <div class="sa-hero-tag">
            <span>🧱☄️</span> Særskilt Flade • Modstand & Gennembrud
        </div>
        <h1>"SELVOM" eller "ALLIGEVEL"?</h1>
        <p>Begge ord handler om at gøre noget <strong>på trods af en forhindring</strong> – men kognitivt og grammatisk står de to forskellige steder: <strong>🧱 <em>Selvom</em> bygger muren (forhindringen i en ledsætning)</strong>, mens <strong>☄️ <em>Alligevel</em> er bolden, der bryder igennem muren (i hovedsætningen)!</strong></p>
    `;
    viewContainer.appendChild(hero);

    // Cognitive Guide Banner with selvom_alligevel_guide.png
    const guideBanner = document.createElement('div');
    guideBanner.className = 'cognitive-guide-banner';
    guideBanner.innerHTML = `
        <div>
            <img src="${baseUrl}selvom_alligevel_guide.png" alt="Selvom vs Alligevel kognitiv guide" class="guide-img-thumb" />
        </div>
        <div>
            <h3 style="margin:0 0 0.4rem; color:#fdba74; font-size:1.35rem;">🧱 Muren (Selvom) vs. ☄️ Bolden gennem Muren (Alligevel)</h3>
            <p style="margin:0; color:#cbd5e1; line-height:1.55;">
                Illustrationen fra Træning 2 gør det krystalklart, hvornår du skal vælge hvilket ord:
            </p>
            <div class="guide-symbols-grid">
                <div class="guide-sym-card" style="border-color:#f97316;">
                    <div style="font-weight:900; color:#fdba74; font-size:1.05rem;">🧱 SELVOM = Forhindringen (Muren)</div>
                    <div style="font-size:0.86rem; color:#cbd5e1; margin-top:0.3rem;">
                        Står <strong>altid foran selve problemet/muren</strong> i en ledsætning (<em>Subjekt + ikke + Verbum</em>):<br>
                        <em style="color:#fde68a;">"<strong>Selvom</strong> det regner [muren], går vi en tur."</em>
                    </div>
                </div>
                <div class="guide-sym-card" style="border-color:#38bdf8;">
                    <div style="font-weight:900; color:#7dd3fc; font-size:1.05rem;">☄️ ALLIGEVEL = Gennembruddet (Bolden)</div>
                    <div style="font-size:0.86rem; color:#cbd5e1; margin-top:0.3rem;">
                        Står <strong>i den sætning, der bryder igennem muren</strong> (efter at muren allerede er nævnt):<br>
                        <em style="color:#fde68a;">"Det regner [muren], men vi går <strong>alligevel</strong> en tur [bolden]!"</em>
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
        { id: 'vrimmel', label: '1. Vrimlebilledet: Selvom & Alligevel (10 scener)', icon: '🖼️' },
        { id: 'kognitiv', label: '2. Muren & Bolden + Ordstilling', icon: '🔬' },
        { id: 'traening2', label: '3. Klassisk Træning 2 (med Illustration)', icon: '🧱' },
        { id: 'detektiv', label: '4. Mur- eller Bold-Detektiven (8 gåder)', icon: '🔍' },
        { id: 'transformer', label: '5. Sætnings-Transformeren (Selvom ↔ Alligevel)', icon: '🔄' },
        { id: 'builder', label: '6. Sætningsbyggeren & Puslespillet', icon: '🧩' }
    ];

    let currentTab = (extraData && (extraData.subPath || extraData.tab)) ? (extraData.subPath || extraData.tab) : 'vrimmel';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `adv-tab-btn ${currentTab === t.id ? 'active' : ''}`;
        btn.id = `sa-tab-${t.id}`;
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
        history.pushState(null, '', '#/' + lang + '/konjunktioner_selvom_alligevel/' + tabId);
        nav.querySelectorAll('.adv-tab-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = nav.querySelector(`#sa-tab-${tabId}`);
        if (activeBtn) activeBtn.classList.add('active');

        tabContent.innerHTML = '';
        if (tabId === 'vrimmel') renderTabVrimmel(tabContent);
        else if (tabId === 'kognitiv') renderTabKognitiv(tabContent);
        else if (tabId === 'traening2') renderTabTraening2(tabContent);
        else if (tabId === 'detektiv') renderTabDetektiv(tabContent);
        else if (tabId === 'transformer') renderTabTransformer(tabContent);
        else if (tabId === 'builder') renderTabBuilder(tabContent);
    }

    // ==========================================
    // TAB 1: VRIMLEBILLEDET
    // ==========================================
    let activeFilter = 'alle';
    let isPureMode = false;
    let selectedWord = SELVOM_ALLIGEVEL_DATA[0];

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
            { id: 'selvom', label: '🧱 SELVOM: Muren / Forhindringen (5)' },
            { id: 'alligevel', label: '☄️ ALLIGEVEL: Bolden / Gennembruddet (5)' }
        ].forEach(f => {
            const b = document.createElement('button');
            b.className = `filter-btn ${activeFilter === f.id ? 'active' : ''}`;
            b.textContent = f.label;
            b.onclick = () => {
                activeFilter = f.id;
                const vis = SELVOM_ALLIGEVEL_DATA.filter(x => activeFilter === 'alle' || x.category === activeFilter);
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
        stage.innerHTML = `<img src="${baseUrl}assets/selvom_alligevel_vrimmel.jpg" alt="Selvom og Alligevel Vrimlebillede" class="vrimmel-img" />`;

        const visibleWords = SELVOM_ALLIGEVEL_DATA.filter(item => activeFilter === 'alle' || item.category === activeFilter);

        visibleWords.forEach((item, idx) => {
            const pin = document.createElement('div');
            const pinColorClass = item.category === 'selvom' ? 'pin-selvom' : 'pin-alligevel';
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
                        <div style="font-size:0.75rem; font-weight:800; color:#fdba74; text-transform:uppercase;">🌍 MÅLORDSPRÆSENTATION (${currentLang})</div>
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
                        <div style="font-size:0.75rem; font-weight:800; color:#fdba74; margin-bottom:0.3rem;">💬 EKSEMPELSÆTNINGER</div>
                        <div style="font-size:1.25rem; font-weight:800; color:white; margin-bottom:0.4rem;">"${item.sentence}"</div>
                        <div style="font-size:1rem; color:#cbd5e1; font-style:italic; margin-bottom:0.5rem;">"${item.contextSentence}"</div>
                        ${trans.sentence ? `<div style="color:#fde68a; font-size:0.92rem; margin-bottom:0.7rem;">🌍 "${trans.sentence}"</div>` : ''}
                        <button class="inspector-speak-btn" id="sa-speak-btn">🔊 Lyt til udtale</button>
                    </div>
                    <div class="inspector-scene-box" style="border-left:3px solid #38bdf8;">
                        <div style="font-size:0.8rem; font-weight:800; color:#7dd3fc;">🧭 Kognitiv & Grammatisk Regel</div>
                        <p style="color:#cbd5e1; margin:0.3rem 0 0;">${item.ruleHint}</p>
                    </div>
                    <div style="display:flex; gap:0.8rem;">
                        <button class="inspector-btn-action" id="sa-prev">⬅ Forrige</button>
                        <button class="inspector-btn-action" id="sa-next" style="background:#ea580c;">Næste ➔</button>
                    </div>
                </div>
            `;

            inspector.querySelector('#sa-speak-btn').onclick = () => speakDanish(item.contextSentence);
            inspector.querySelector('#sa-prev').onclick = () => {
                const i = visibleWords.findIndex(w => w.id === item.id);
                const prev = visibleWords[(i - 1 + visibleWords.length) % visibleWords.length];
                updateInspector(prev, false);
                speakDanish(prev.sentence);
            };
            inspector.querySelector('#sa-next').onclick = () => {
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
    // TAB 2: MUREN & BOLDEN + ORDSTILLING
    // ==========================================
    function renderTabKognitiv(parent) {
        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#fdba74; margin-top:0;">🔬 Muren (Selvom) vs. Bolden (Alligevel) – Kognitivt & Grammatisk</h2>
            <div style="text-align:center; margin:1.2rem 0;">
                <img src="${baseUrl}selvom_alligevel_guide.png" alt="Selvom vs Alligevel" style="max-width:650px; width:100%; border-radius:18px; border:2px solid #f97316; background:white;" />
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.3rem; margin:1.8rem 0;">
                <div style="background:#0f172a; padding:1.5rem; border-radius:16px; border:2px solid #f97316;">
                    <h4 style="color:#fdba74; margin-top:0;">🧱 SELVOM = Ledsætningskonjunktion (Muren)</h4>
                    <p style="color:#cbd5e1; line-height:1.55;">
                        <strong>Selvom</strong> hører sammen med <strong>selve forhindringen</strong> (regnen, sygdommen, trætheden).
                    </p>
                    <ul style="color:#cbd5e1; line-height:1.6; padding-left:1.2rem;">
                        <li><strong>"Ikke"-magneten:</strong> <em>"... selvom han <span style="color:#22d3ee;">ikke</span> <span style="color:#fca5a5;">er</span> rask."</em></li>
                        <li><strong>Ledsætning i front = Inversion:</strong> <em>"[<strong>Selvom</strong> det regner], <span style="color:#fca5a5;">går</span> <span style="color:#86efac;">vi</span> en tur."</em></li>
                    </ul>
                </div>

                <div style="background:#0f172a; padding:1.5rem; border-radius:16px; border:2px solid #38bdf8;">
                    <h4 style="color:#7dd3fc; margin-top:0;">☄️ ALLIGEVEL = Konnektivt Adverbium (Bolden)</h4>
                    <p style="color:#cbd5e1; line-height:1.55;">
                        <strong>Alligevel</strong> hører sammen med <strong>den handling, der gennemføres på trods</strong>, efter at forhindringen er nævnt!
                    </p>
                    <ul style="color:#cbd5e1; line-height:1.6; padding-left:1.2rem;">
                        <li><strong>Midterplads (efter men + subjekt + verbum):</strong> <em>"Det regner, men vi <span style="color:#fca5a5;">går</span> <strong>alligevel</strong> en tur."</em></li>
                        <li><strong>Frontplads = Inversion:</strong> <em>"Det regner. <strong>Alligevel</strong> <span style="color:#fca5a5;">går</span> <span style="color:#86efac;">vi</span> en tur."</em></li>
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
            quote: '"Det regner, men vi går ______ en tur."',
            options: ['alligevel', 'selvom'],
            correct: 'alligevel',
            explanation: '☄️ Korrekt! Regnen (muren) kender vi allerede – nu bryder bolden igennem muren med "alligevel"!'
        },
        {
            quote: '"______ det regner, går vi en tur."',
            options: ['Selvom', 'Alligevel'],
            correct: 'Selvom',
            explanation: '🧱 Korrekt! Før bolden kan bryde igennem, bygger vi muren/forhindringen ("det regner") op med "Selvom"!'
        },
        {
            quote: '"Han er syg, men han tager ______ på arbejde."',
            options: ['alligevel', 'selvom'],
            correct: 'alligevel',
            explanation: '☄️ Korrekt! Sygdommen er muren, og han bryder igennem den og tager på arbejde "alligevel".'
        },
        {
            quote: '"______ han er syg, tager han på arbejde."',
            options: ['Selvom', 'Alligevel'],
            correct: 'Selvom',
            explanation: '🧱 Korrekt! Her præsenterer vi selve forhindringen ("han er syg") først – det kræver muren "Selvom".'
        },
        {
            quote: '"Bilen er gammel, men den kører ______ godt."',
            options: ['alligevel', 'selvom'],
            correct: 'alligevel',
            explanation: '☄️ Korrekt! Bilen kører godt PÅ TRODS AF alderen (bolden bryder gennem muren = alligevel).'
        },
        {
            quote: '"______ bilen er meget gammel, kører den rigtig godt."',
            options: ['Selvom', 'Alligevel'],
            correct: 'Selvom',
            explanation: '🧱 Korrekt! Her står forhindringen ("bilen er meget gammel") lige efter hullet ➔ "Selvom".'
        },
        {
            quote: '"______ Peter fryser i snevejret, smiler han til kunderne."',
            options: ['Selvom', 'Alligevel'],
            correct: 'Selvom',
            explanation: '🧱 Korrekt! Kulden ("Peter fryser") er muren, som vi starter med at bygge op.'
        },
        {
            quote: '"Det er en hård vagt i snevejret, men Peter fortsætter ______."',
            options: ['alligevel', 'selvom'],
            correct: 'alligevel',
            explanation: '☄️ Korrekt! Han bryder igennem den hårde vagt og fortsætter "alligevel".'
        }
    ];

    function renderTabTraening2(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `
            <div style="text-align:center; margin-bottom:1.5rem;">
                <h2 style="color:#fdba74; margin:0 0 0.5rem;">🧱 Træning 2: Selvom eller Alligevel? (Med Kognitiv Illustration)</h2>
                <img src="${baseUrl}selvom_alligevel_guide.png" alt="Selvom vs Alligevel guide" style="max-width:560px; width:100%; border-radius:16px; border:2px solid #f97316; margin:0.6rem auto; display:block; background:white;" />
                <p style="color:#cbd5e1; max-width:720px; margin:0.5rem auto 0;">
                    <em>🧱 <strong>'Selvom'</strong> er muren / forhindringen. ☄️ <strong>'Alligevel'</strong> er bolden, der kommer igennem muren (handlingen gennemføres trods forhindringen).</em>
                </p>
            </div>
            <div id="sa-t2-list"></div>
        `;
        parent.appendChild(box);
        const list = box.querySelector('#sa-t2-list');

        T2_QUESTIONS.forEach((q, idx) => {
            const card = document.createElement('div');
            card.className = 'detektiv-card';
            card.innerHTML = `
                <div style="font-size:0.82rem; font-weight:800; color:#fdba74; margin-bottom:0.4rem;">OPGAVE ${idx + 1} AF ${T2_QUESTIONS.length}</div>
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
                    fb.textContent = ok ? q.explanation : '⚠️ Tænk på illustrationen: Bygger vi 🧱 muren/forhindringen op (selvom), eller bryder ☄️ bolden igennem muren (alligevel)?';
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
            tag: 'Gåde 1 • Ordstilling efter "selvom"',
            quote: '"Vi hyggede os rigtig meget til havefesten, selvom solen ______."',
            options: ['ikke skinnede', 'skinnede ikke'],
            correct: 'ikke skinnede',
            explanation: '🌟 Præcis! "Selvom" er en ledsætningskonjunktion, så "ikke" står FØR verbet ("ikke skinnede")!'
        },
        {
            tag: 'Gåde 2 • Ordstilling når "Alligevel" står forrest efter punktum',
            quote: '"Solen skinnede slet ikke til havefesten. Alligevel ______ rigtig meget!"',
            options: ['hyggede vi os', 'vi hyggede os'],
            correct: 'hyggede vi os',
            explanation: '🌟 Fuldstændig rigtigt! "Alligevel" er et konnektivt adverbium. Når det står på Plads 1 efter punktum, udløser det INVERSION: "Alligevel hyggede vi os"!'
        },
        {
            tag: 'Gåde 3 • Mur eller Bold?',
            quote: '"Jakken var egentlig alt for dyr. ______ købte han den, fordi han elskede farven."',
            options: ['Alligevel (☄️ Bolden)', 'Selvom (🧱 Muren)'],
            correct: 'Alligevel (☄️ Bolden)',
            explanation: '🌟 Rigtigt! Muren ("Jakken var alt for dyr") er allerede nævnt i første sætning. Nu bryder han igennem og køber den "Alligevel"!'
        },
        {
            tag: 'Gåde 4 • Mur eller Bold?',
            quote: '"Han købte jakken, ______ den egentlig var alt for dyr."',
            options: ['selvom (🧱 Muren)', 'alligevel (☄️ Bolden)'],
            correct: 'selvom (🧱 Muren)',
            explanation: '🌟 Lige i øjet! Her kommer selve forhindringen ("den var alt for dyr") efter kommaet ➔ muren "selvom"!'
        },
        {
            tag: 'Gåde 5 • Ledsætning med "Selvom" i front',
            quote: '"Selvom kaffen er blevet lunken, ______ med et smil."',
            options: ['drikker hun den', 'hun drikker den'],
            correct: 'drikker hun den',
            explanation: '🌟 Perfekt! Hele "Selvom"-ledsætningen fylder Forfeltet (Plads 1), så der kommer inversion i hovedsætningen: "drikker hun den"!'
        },
        {
            tag: 'Gåde 6 • Pas på dobbelt-konjunktion!',
            quote: '"Selvom jeg var meget træt efter rejsen, ______."',
            options: ['gik jeg ud at spise med mine venner', 'men jeg gik ud at spise med mine venner'],
            correct: 'gik jeg ud at spise med mine venner',
            explanation: '🌟 Vigtig regel! Når du allerede har brugt "Selvom", må du IKKE sætte "men" foran hovedsætningen – hovedsætningen starter direkte med verbet ("gik jeg...")!'
        }
    ];

    function renderTabDetektiv(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `<h2 style="text-align:center; color:#fdba74; margin-top:0;">🔍 Mur- eller Bold-Detektiven & Ordstilling</h2><div id="sa-det-list"></div>`;
        parent.appendChild(box);
        const list = box.querySelector('#sa-det-list');

        DETEKTIV_QUESTIONS.forEach(q => {
            const card = document.createElement('div');
            card.className = 'detektiv-card';
            card.innerHTML = `
                <div style="font-size:0.8rem; font-weight:800; color:#7dd3fc; margin-bottom:0.4rem;">${q.tag}</div>
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
    // TAB 5: SÆTNINGS-TRANSFORMEREN (SELVOM ↔ ALLIGEVEL)
    // ==========================================
    const TRANSFORM_QUESTIONS = [
        {
            original: '🧱 Original med SELVOM: "Selvom det regner, går vi en tur."',
            prompt: 'Omskriv nu den samme situation til en sætning med ALLIGEVEL:',
            options: [
                'Det regner, men vi går alligevel en tur.',
                'Alligevel det regner, går vi en tur.',
                'Det regner, selvom vi går alligevel en tur.'
            ],
            correct: 'Det regner, men vi går alligevel en tur.',
            explanation: '🌟 Perfekt! Først nævnes regnen ("Det regner"), og i næste sætning bryder vi igennem med "... men vi går alligevel en tur"!'
        },
        {
            original: '☄️ Original med ALLIGEVEL: "Han er ikke rask, men han tager alligevel på arbejde."',
            prompt: 'Omskriv nu sætningen, så den bruger SELVOM (og pas på placeringen af "ikke"!):',
            options: [
                'Han tager på arbejde, selvom han ikke er rask.',
                'Han tager på arbejde, selvom han er ikke rask.',
                'Selvom han tager på arbejde, er han ikke rask.'
            ],
            correct: 'Han tager på arbejde, selvom han ikke er rask.',
            explanation: '🌟 Skarpt! Forhindringen ("han ikke er rask") skal stå efter "selvom", og i ledsætningen rykker "ikke" frem FØR verbet ("ikke er")!'
        },
        {
            original: '🧱 Original med SELVOM: "Bilen kører godt, selvom den er meget gammel."',
            prompt: 'Omskriv til to sætninger, hvor ALLIGEVEL står allerforrest i sætning 2 (Husk Inversion!):',
            options: [
                'Bilen er meget gammel. Alligevel kører den godt.',
                'Bilen er meget gammel. Alligevel den kører godt.',
                'Alligevel bilen er meget gammel, kører den godt.'
            ],
            correct: 'Bilen er meget gammel. Alligevel kører den godt.',
            explanation: '🌟 Mesterligt! Først muren ("Bilen er meget gammel."), og derefter "Alligevel kører den godt" med INVERSION (kører den)!'
        }
    ];

    function renderTabTransformer(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `
            <h2 style="text-align:center; color:#7dd3fc; margin-top:0;">🔄 Sætnings-Transformeren: Omskriv mellem Selvom og Alligevel</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:740px; margin:0 auto 1.5rem;">
                Når du kan omskrive en <strong><em>selvom</em></strong>-sætning til en <strong><em>alligevel</em></strong>-sætning (og omvendt), mestrer du både den kognitive forskel og ordstillingen!
            </p>
            <div id="tr-list"></div>
        `;
        parent.appendChild(box);
        const list = box.querySelector('#tr-list');

        TRANSFORM_QUESTIONS.forEach(q => {
            const card = document.createElement('div');
            card.className = 'detektiv-card';
            card.innerHTML = `
                <div style="font-size:1.1rem; font-weight:800; color:#fde68a; margin-bottom:0.5rem;">${q.original}</div>
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
                    fb.textContent = ok ? q.explanation : '⚠️ Tjek både hvem der er muren/bolden OG ordstillingen!';
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
            title: 'Puslespil 1 • 🧱 Selvom-ledsætning i front med Inversion',
            hint: 'Start med muren ("Selvom det regner,"), og husk at sætte verbet FØR subjektet i hovedsætningen:',
            correct: ['Selvom det regner,', 'går', 'vi', 'en tur.']
        },
        {
            title: 'Puslespil 2 • ☄️ Alligevel efter "men" i hovedsætning',
            hint: 'Start med muren ("Det regner, men"), og sæt derefter "alligevel" efter verbet:',
            correct: ['Det regner, men', 'vi', 'går', 'alligevel en tur.']
        },
        {
            title: 'Puslespil 3 • ☄️ Alligevel i front med Inversion',
            hint: 'Start med "Det regner. Alligevel", og husk at bytte om på verbum og subjekt:',
            correct: ['Det regner.', 'Alligevel', 'går', 'vi en tur.']
        }
    ];

    function renderTabBuilder(parent) {
        const box = document.createElement('div');
        box.className = 'detektiv-container';
        box.innerHTML = `<h2 style="text-align:center; color:#fdba74; margin-top:0;">🧩 Sætningsbyggeren: Selvom vs. Alligevel</h2><div id="sa-puz-list"></div>`;
        parent.appendChild(box);
        const list = box.querySelector('#sa-puz-list');

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
                    <div style="min-height:56px; background:#1e293b; border:2px dashed #f97316; border-radius:12px; padding:0.8rem; display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center; margin-bottom:1rem;">
                        ${placed.length === 0 ? '<span style="color:#64748b;">Klik på brikkerne herunder i den rigtige rækkefølge...</span>' : placed.map((w, idx) => `<button class="detektiv-opt-btn" data-rm="${idx}" style="padding:0.5rem 0.9rem; font-size:1rem; background:#ea580c;">${w}</button>`).join('')}
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
