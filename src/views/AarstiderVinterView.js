import { getTranslation, getLang } from '../utils/i18n.js';
import { shuffleArray } from '../utils/shuffle.js';
import { createPromptFlowSection } from '../utils/aiPromptHelper.js';
import { VINTER_DA } from '../utils/vinter_da.js';
import { avT, avSub, isAvRtl } from '../utils/vinter_translations.js';
import { attachVrimmelControls } from '../utils/vrimmelPegefeltStandard.js';

/**
 * AarstiderVinterView - Scenarie: "Årstider: Vinter i Danmark" under "Mit hverdagsliv".
 *
 * 20 interaktive målord fordelt på alle 4 ordklasser (Substantiver, Verber, Adjektiver, Adverbier),
 * koblet til 7 interaktive træningsbaner UDEN oplæsning (TTS/lyd):
 *   1. 🔍 Vrimlebillede & Ordklassesortering
 *   2. 🕵️ Ord-detektiv (10 billedjagt-missioner)
 *   3. 🔄 Synonymer, Antonymer & Vinter-vejrskala
 *   4. 📖 Hverdagshistorier om dansk vinter (med klikbare gloser & quiz)
 *   5. ✍️ Pusleopgaver & Sætningsbygning (Subjekt først + "hvor?" til sidst)
 *   6. 💬 Hverdagsdialoger i rigtig rækkefølge
 *   7. 🎯 Tryk, stavelser & Fri AI-øvelse (med synligt kopiér-prompt)
 */

const VINTER_WORDS = [
    // --- 8 SUBSTANTIVER (grøn) ---
    {
        id: 'hue', num: 1, word: 'en hue', clean: 'hue', wordClass: 'substantiv', gender: 'en',
        forms: 'Bestemt: huen | Flertal: huer', x: 13.5, y: 39, icon: '🧢',
        definition: 'En varm strikket hovedbeklædning, som man tager på om vinteren, så ørerne ikke fryser.',
        fixedTerms: 'at tage hue på • en varm strikhue',
        sentence: 'Manden har en varm, gul hue på, mens han skovler sne.'
    },
    {
        id: 'vinterjakke', num: 2, word: 'en vinterjakke', clean: 'vinterjakke', wordClass: 'substantiv', gender: 'en',
        forms: 'Bestemt: vinterjakken | Flertal: vinterjakker', x: 10, y: 53, icon: '🧥',
        definition: 'En tyk, foret jakke, der beskytter kroppen mod frost, vind og sne.',
        fixedTerms: 'at lyne sin vinterjakke • en vandtæt vinterjakke',
        sentence: 'Hun lyner sin tykke vinterjakke helt op til hagen, før hun går ud.'
    },
    {
        id: 'sneskovl', num: 3, word: 'en sneskovl', clean: 'sneskovl', wordClass: 'substantiv', gender: 'en',
        forms: 'Bestemt: sneskovlen | Flertal: sneskovle', x: 16, y: 81, icon: '🌨️',
        definition: 'Et bredt redskab med langt skaft til at skubbe og løfte sne væk fra fortove og indkørsler.',
        fixedTerms: 'at rydde fortovet med en sneskovl • at tage sneskovlen frem',
        sentence: 'Han bruger en bred sneskovl til at fjerne nattens sne fra fortovet.'
    },
    {
        id: 'glat_is', num: 4, word: 'glat is', clean: 'is', wordClass: 'substantiv', gender: 'et/utælleligt',
        forms: 'Bestemt: isen (utælleligt navneord)', x: 28, y: 86, icon: '🧊',
        definition: 'Frossent vand på veje, stier og søer. På cykelstien bliver isen ofte spejlblank og farlig.',
        fixedTerms: 'at glide på glat is • der ligger sort is på vejen',
        sentence: 'Der ligger glat is på cykelstien her til morgen.'
    },
    {
        id: 'kaelk', num: 5, word: 'en kælk', clean: 'kælk', wordClass: 'substantiv', gender: 'en',
        forms: 'Bestemt: kælken | Flertal: kælke', x: 45, y: 58, icon: '🛷',
        definition: 'Et lille træ- eller plastikkøretøj med meder, som børn (og voksne) bruger til at glide ned ad snedækkede bakker.',
        fixedTerms: 'at køre på kælk • en træ-kælk ned ad bakken',
        sentence: 'De to børn sidder tæt sammen på kælken i parken.'
    },
    {
        id: 'snemand', num: 6, word: 'en snemand', clean: 'snemand', wordClass: 'substantiv', gender: 'en',
        forms: 'Bestemt: snemanden | Flertal: snemænd', x: 56, y: 73, icon: '⛄',
        definition: 'En figur lavet af store snekugler – traditionelt med gulerodsnæse, tørklæde og knapper.',
        fixedTerms: 'at bygge en snemand • en snemand med halstørklæde',
        sentence: 'Børnene har bygget en stor snemand med hue og halstørklæde i sneen.'
    },
    {
        id: 'termokande', num: 7, word: 'en termokande', clean: 'termokande', wordClass: 'substantiv', gender: 'en',
        forms: 'Bestemt: termokanden | Flertal: termokander', x: 67.5, y: 65, icon: '🫖',
        definition: 'En isoleret flaske eller kande, der holder kaffe, te eller kakao rygende varm udendørs.',
        fixedTerms: 'at have varm te i en termokande • at skænke fra termokanden',
        sentence: 'Han har taget en rød termokande med varm te med ud til vennerne.'
    },
    {
        id: 'stearinlys', num: 8, word: 'et stearinlys', clean: 'stearinlys', wordClass: 'substantiv', gender: 'et',
        forms: 'Bestemt: stearinlyset | Flertal: stearinlys', x: 79, y: 57, icon: '🕯️',
        definition: 'Levende lys af voks/stearin – et af de vigtigste symboler på dansk hygge i de mørke vintermåneder.',
        fixedTerms: 'at tænde stearinlys • levende lys i vindueskarmen',
        sentence: 'Inde i stuen står der tændte stearinlys i vindueskarmen.'
    },

    // --- 6 VERBER (rød) ---
    {
        id: 'skovle', num: 9, word: 'at skovle sne', clean: 'skovle', wordClass: 'verbum', gender: '-',
        forms: 'Nutid: skovler | Datid: skovlede | Førnutid: har skovlet', x: 11.5, y: 69, icon: '❄️',
        definition: 'At fjerne sne fra fortovet eller indkørslen med en skovl – i Danmark ofte lovpligtigt inden kl. 7–8.',
        fixedTerms: 'at skovle fortovet • at skovle sne væk før arbejde',
        sentence: 'Naboen skovler sne foran rækkehusene, før dagen rigtigt starter.'
    },
    {
        id: 'kaelke', num: 10, word: 'at kælke', clean: 'kælke', wordClass: 'verbum', gender: '-',
        forms: 'Nutid: kælker | Datid: kælkede | Førnutid: har kælket', x: 43, y: 43, icon: '⛷️',
        definition: 'At glide hurtigt ned ad en sneklædt bakke siddende på en kælk.',
        fixedTerms: 'at tage ud at kælke • at kælke ned ad bakken',
        sentence: 'Børnene elsker at kælke ned ad bakken efter skole.'
    },
    {
        id: 'skoejte', num: 11, word: 'at skøjte', clean: 'skøjte', wordClass: 'verbum', gender: '-',
        forms: 'Nutid: skøjter | Datid: skøjtede | Førnutid: har skøjtet', x: 60.5, y: 44, icon: '⛸️',
        definition: 'At glide hen over isen med skøjter på fødderne på en skøjtebane eller en sikker, frossen sø.',
        fixedTerms: 'at gå ud at skøjte • at skøjte hånd i hånd',
        sentence: 'To voksne skøjter hånd i hånd på den frosne sø i parken.'
    },
    {
        id: 'skaenke', num: 12, word: 'at skænke', clean: 'skænke', wordClass: 'verbum', gender: '-',
        forms: 'Nutid: skænker | Datid: skænkede | Førnutid: har skænket', x: 73, y: 71, icon: '☕',
        definition: 'At hælde en drik (f.eks. varm kaffe, te eller kakao) op i et krus eller en kop.',
        fixedTerms: 'at skænke en varm kop te • må jeg skænke dig noget varmt?',
        sentence: 'Han skænker en dampende varm drik op i et krus ude i kulden.'
    },
    {
        id: 'fryse', num: 13, word: 'at fryse', clean: 'fryse', wordClass: 'verbum', gender: '-',
        forms: 'Nutid: fryser | Datid: frøs | Førnutid: har frosset', x: 81.5, y: 74, icon: '🥶',
        definition: 'At mærke ubehagelig kulde i kroppen (eller når vand bliver til is ved 0 °C og derunder).',
        fixedTerms: 'jeg fryser om fingrene • det fryser fem grader udenfor',
        sentence: 'Drengen til højre ryster og fryser, fordi vinden er iskold.'
    },
    {
        id: 'taende', num: 14, word: 'at tænde lys', clean: 'tænde', wordClass: 'verbum', gender: '-',
        forms: 'Nutid: tænder | Datid: tændte | Førnutid: har tændt', x: 85, y: 47, icon: '🔥',
        definition: 'At sætte ild til vægen på et stearinlys eller tænde lamper, når vintermørket falder på.',
        fixedTerms: 'at tænde et stearinlys • at tænde cykellygterne',
        sentence: 'Kvinden inde i stuen tænder stearinlys med en tændstik.'
    },

    // --- 3 ADJEKTIVER (orange) ---
    {
        id: 'moerk', num: 15, word: 'mørk', clean: 'mørk', wordClass: 'adjektiv', gender: '-',
        forms: 'Intetkøn: mørkt | Flertal/bestemt: mørke | Grad: mørkere, mørkest', x: 24, y: 12, icon: '🌑',
        definition: 'Uden dagslys. Om vinteren i Danmark er det ofte mørkt både klokken 8 om morgenen og fra klokken 16 om eftermiddagen.',
        fixedTerms: 'en mørk vintermorgen • det bliver tidligt mørkt',
        sentence: 'Himlen er dybt mørk, selvom folk allerede er på vej ud ad døren.'
    },
    {
        id: 'glat', num: 16, word: 'glat', clean: 'glat', wordClass: 'adjektiv', gender: '-',
        forms: 'Intetkøn: glat | Flertal/bestemt: glatte | Grad: glattere, glattest', x: 32, y: 75, icon: '⚠️',
        definition: 'En overflade uden modstand, hvor man let kan vælte eller skride ud – typisk når regn fryser til is.',
        fixedTerms: 'vejen er spejlglat • advarsel om glat føre',
        sentence: 'Cykelstien er meget glat under hjulene denne frostklare morgen.'
    },
    {
        id: 'hyggelig', num: 17, word: 'hyggelig', clean: 'hyggelig', wordClass: 'adjektiv', gender: '-',
        forms: 'Intetkøn: hyggeligt | Flertal/bestemt: hyggelige | Grad: hyggeligere, hyggeligst', x: 90, y: 60, icon: '✨',
        definition: 'Tryg, varm og rar stemning sammen med andre eller i rolige omgivelser med lys og varme.',
        fixedTerms: 'en hyggelig stue • vinteraftener er ekstra hyggelige indendørs',
        sentence: 'Kontrasten til kulden udenfor er den hyggelige stue med gyldent lys.'
    },

    // --- 3 ADVERBIER (blå) ---
    {
        id: 'tidligt', num: 18, word: 'tidligt', clean: 'tidligt', wordClass: 'adverbium', gender: '-',
        forms: 'Grad: tidligere, tidligst (tidsadverbium)', x: 22.5, y: 20, icon: '⏰',
        definition: 'I begyndelsen af dagen – eller tidligere end normalt (om vinteren tændes gadelamperne både tidligt og sent).',
        fixedTerms: 'tidligt om morgenen • det bliver tidligt mørkt i december',
        sentence: 'Gadelamperne brænder stadig tidligt om morgenen i januar.'
    },
    {
        id: 'forsigtigt', num: 19, word: 'forsigtigt', clean: 'forsigtigt', wordClass: 'adverbium', gender: '-',
        forms: 'Mådesadverbium (beskriver hvordan man bevæger sig)', x: 31, y: 46, icon: '🚲',
        definition: 'Langsomt, roligt og med stor opmærksomhed, så man undgår ulykker på glatte stier.',
        fixedTerms: 'at cykle forsigtigt i frostvejr • at træde forsigtigt på isen',
        sentence: 'Cyklisten holder fast i styret og cykler meget forsigtigt på isen.'
    },
    {
        id: 'indendoers', num: 20, word: 'indendørs', clean: 'indendørs', wordClass: 'adverbium', gender: '-',
        forms: 'Stedsadverbium (modsætning til udendørs)', x: 89, y: 33, icon: '🏠',
        definition: 'Inde i et hus eller en bygning i læ for kulde, vind og sne.',
        fixedTerms: 'at holde sig indendørs • hygge sig indendørs med te',
        sentence: 'Manden i striktrøje nyder en varm kop te indendørs.'
    },

    // --- 8 EKSTRA VINTERORD FORDELT PÅ DE 4 ORDKLASSER ---
    // +2 Substantiver
    {
        id: 'halstoerklaede', num: 21, word: 'et halstørklæde', clean: 'halstørklæde', wordClass: 'substantiv', gender: 'et',
        forms: 'Bestemt: halstørklædet | Flertal: halstørklæder', x: 56, y: 61, icon: '🧣',
        definition: 'Et langt stykke strikket stof eller uld, man vikler om halsen mod kold blæst.',
        fixedTerms: 'at binde et halstørklæde om halsen • et varmt uldhalstørklæde',
        sentence: 'Selv snemanden midt i billedet har fået et fint halstørklæde på.'
    },
    {
        id: 'cykellygte', num: 22, word: 'en cykellygte', clean: 'cykellygte', wordClass: 'substantiv', gender: 'en',
        forms: 'Bestemt: cykellygten | Flertal: cykellygter', x: 37.5, y: 58, icon: '💡',
        definition: 'En lygte foran og bagpå cyklen – lovpligtig i Danmark fra solnedgang til solopgang i vintermørket.',
        fixedTerms: 'at tænde sine cykellygter • huske lygter i mørket',
        sentence: 'Cyklisten har tændt sin klare cykellygte i den mørke vintermorgen.'
    },
    // +2 Verber
    {
        id: 'glide', num: 23, word: 'at glide', clean: 'glide', wordClass: 'verbum', gender: '-',
        forms: 'Nutid: glider | Datid: gled | Førnutid: er/har gledet', x: 23.5, y: 78, icon: '⛸️',
        definition: 'At miste fodfæstet på is eller sne – eller bevæge sig jævnt og hurtigt hen over en glat flade.',
        fixedTerms: 'at glide på den glatte is • pas på ikke at glide!',
        sentence: 'Pas på – her på den blanke is kan cyklen eller fødderne let glide ud.'
    },
    {
        id: 'varme_sig', num: 24, word: 'at varme sig', clean: 'varme', wordClass: 'verbum', gender: '-',
        forms: 'Nutid: varmer sig | Datid: varmede sig | Førnutid: har varmet sig', x: 89, y: 44, icon: '🫖',
        definition: 'At få varmen tilbage i kolde hænder og krop ved at gå indendørs eller holde om et varmt krus.',
        fixedTerms: 'at varme sig med en kop te • komme ind og varme sig',
        sentence: 'Manden i den varme sweater varmer sig med et krus te inde i stuen.'
    },
    // +2 Adjektiver
    {
        id: 'kold', num: 25, word: 'kold', clean: 'kold', wordClass: 'adjektiv', gender: '-',
        forms: 'Intetkøn: koldt | Flertal/bestemt: kolde | Grad: koldere, koldest', x: 49, y: 84, icon: '❄️',
        definition: 'Med lav temperatur (ofte omkring eller under frysepunktet om vinteren).',
        fixedTerms: 'en kold vinterdag • det er bidende koldt i dag',
        sentence: 'Sneen på jorden er kold, så man skal have varme støvler på.'
    },
    {
        id: 'varm', num: 26, word: 'varm', clean: 'varm', wordClass: 'adjektiv', gender: '-',
        forms: 'Intetkøn: varmt | Flertal/bestemt: varme | Grad: varmere, varmest', x: 95, y: 45, icon: '🔥',
        definition: 'Behagelig høj temperatur – f.eks. i en uldtrøje, en opvarmet stue eller nybrygget te.',
        fixedTerms: 'en varm sweater • inde i den varme stue',
        sentence: 'Uldsweateren og koppen i hans hænder holder ham dejlig varm.'
    },
    // +2 Adverbier
    {
        id: 'udendoers', num: 27, word: 'udendørs', clean: 'udendørs', wordClass: 'adverbium', gender: '-',
        forms: 'Stedsadverbium (modsætning til indendørs)', x: 48, y: 31, icon: '🌲',
        definition: 'Ude under åben himmel – f.eks. i parken, på vejen eller på kælkebakken.',
        fixedTerms: 'at lege udendørs i sneen • udendørs aktiviteter om vinteren',
        sentence: 'Selvom det fryser, er børnene og naboerne aktive udendørs.'
    },
    {
        id: 'langsomt', num: 28, word: 'langsomt', clean: 'langsomt', wordClass: 'adverbium', gender: '-',
        forms: 'Grad: langsommere, langsomst (mådesadverbium)', x: 27, y: 64, icon: '🐢',
        definition: 'Med lav fart – vigtigt når man cykler eller går på glatte vinterveje.',
        fixedTerms: 'at køre langsomt i glat føre • gå langsomt hen over isen',
        sentence: 'Cyklisten kører langsomt for ikke at vælte på den isede cykelsti.'
    }
];

// Anvend de lettere A1/A2-danske forklaringer og eksempelsætninger fra VINTER_DA
VINTER_WORDS.forEach(w => {
    if (VINTER_DA[`w${w.num}_def`]) w.definition = VINTER_DA[`w${w.num}_def`];
    if (VINTER_DA[`w${w.num}_sent`]) w.sentence = VINTER_DA[`w${w.num}_sent`];
});

const VINTER_DETECTIVE_MISSIONS = [
    {
        prompt: 'Klik på det redskab, man bruger til at fjerne sne fra fortovet.',
        answerId: 'sneskovl',
        hint: 'Kig nederst til venstre foran rækkehusene.'
    },
    {
        prompt: 'Hvor på billedet er det farligt for cyklisten at køre hurtigt?',
        answerId: 'glat_is',
        hint: 'Se på den blanke overflade under og foran cyklen.'
    },
    {
        prompt: 'Klik på den person, der tyder på, at det er isende koldt udenfor.',
        answerId: 'fryse',
        hint: 'Find personen med armene tæt omkring kroppen og hvid damp fra munden.'
    },
    {
        prompt: 'Klik på det, der holder drikkevaren varm ude i vinterkulden.',
        answerId: 'termokande',
        hint: 'Kig efter den røde flaske midtfor-højre.'
    },
    {
        prompt: 'Hvor kan man se skøjteløbere på billedet?',
        answerId: 'skoejte',
        hint: 'Kig længere tilbage i parken mod højre side af den frosne sø.'
    },
    {
        prompt: 'Klik på de to børn, der bruger en kælk ned ad bakken.',
        answerId: 'kaelk',
        hint: 'Se på skråningen mellem cykelstien og den frosne sø.'
    },
    {
        prompt: 'Find figuren af sne med gulerodsnæse og halstørklæde.',
        answerId: 'snemand',
        hint: 'Lige midt i forgrunden!'
    },
    {
        prompt: 'Klik på stedet, hvor en person skaber dansk hygge i stuen med en tændstik.',
        answerId: 'taende',
        hint: 'Kig ind gennem det store oplyste vindue til højre.'
    },
    {
        prompt: 'Klik på et tydeligt tegn på, at det stadig er vintermørke.',
        answerId: 'moerk',
        hint: 'Se op mod natte-/morgenhimlen over tagene.'
    },
    {
        prompt: 'Find det varme hovedtøj på manden, der rydder sne.',
        answerId: 'hue',
        hint: 'Helt øverst på manden til venstre.'
    }
];

const VINTER_OPP_DUELS = [
    {
        word: 'kold',
        wordClass: 'Adjektiv',
        correct: 'varm',
        options: ['varm', 'glat', 'våd', 'mørk'],
        tip: '"Kold" og "varm" er modsætninger. En vinterdag kan være kold, mens stuen er varm.'
    },
    {
        word: 'mørk',
        wordClass: 'Adjektiv',
        correct: 'lys',
        options: ['lys', 'tyk', 'tung', 'hurtig'],
        tip: 'Om vinteren er morgenen mørk, mens sommernætter og tændte rum er lyse.'
    },
    {
        word: 'indendørs',
        wordClass: 'Adverbium',
        correct: 'udendørs',
        options: ['udendørs', 'forsigtigt', 'tidligt', 'pludselig'],
        tip: '"Indendørs" betyder inde i huset; "udendørs" betyder ude i det fri.'
    },
    {
        word: 'at fryse',
        wordClass: 'Verbum',
        correct: 'at svede / have det varmt',
        options: ['at svede / have det varmt', 'at glide', 'at skovle', 'at tænde'],
        tip: 'Når kroppen mangler varme, fryser man. Når kroppen bliver for varm, sveder man.'
    },
    {
        word: 'glat',
        wordClass: 'Adjektiv',
        correct: 'sikker / ru',
        options: ['sikker / ru', 'skarp', 'træt', 'smal'],
        tip: 'Is gør cykelstien glat; grus eller salt gør overfladen ru og mere sikker at gå på.'
    },
    {
        word: 'forsigtigt (synonym)',
        wordClass: 'Adverbium',
        correct: 'varsomt & opmærksomt',
        options: ['varsomt & opmærksomt', 'vildt & stærkt', 'højt & larmende', 'tilfældigt'],
        tip: 'At cykle forsigtigt betyder at køre varsomt, roligt og opmærksomt i trafikken.'
    }
];

const VINTER_STORIES = [
    {
        title: '1. Morgen på cykelstien i frostvejr',
        level: 'A2',
        summary: 'Om at stå tidligt op i vintermørket og cykle sikkert i glat føre.',
        paragraphs: [
            'Klokken er syv, og det er stadig helt [[mørk|Adjektiv: uden dagslys]] udenfor. Jonas tager sin tykke [[vinterjakke|Substantiv (en): varmt overtøj]] og en varm [[hue|Substantiv (en): strikket hovedbeklædning]] på, før han går ud ad døren.',
            'Ude på vejen møder han naboen, der allerede står og [[skovler|Verbum (at skovle): fjerner sne]] sne fra fortovet. Jonas tjekker lyset på cyklen og kører meget [[forsigtigt|Adverbium: langsomt og opmærksomt]], for der ligger [[glat|Adjektiv: uden fodfæste]] is flere steder på cykelstien.'
        ],
        quiz: [
            {
                q: 'Hvorfor cykler Jonas forsigtigt om morgenen?',
                options: [
                    'Fordi der ligger glat is på cykelstien.',
                    'Fordi det regner så varmt i juni.',
                    'Fordi han har glemt sin termokande hjemme.'
                ],
                correct: 0,
                expl: 'Når temperaturen er under frysepunktet, bliver cykelstien spejlglat af is.'
            },
            {
                q: 'Hvad gør naboen allerede klokken syv?',
                options: [
                    'Han skovler sne væk fra fortovet.',
                    'Han skøjter på søen med børnene.',
                    'Han tænder stearinlys ved spisebordet.'
                ],
                correct: 0,
                expl: 'Naboen bruger sneskovlen til at rydde sneen af vejen for folk på fortovet.'
            }
        ]
    },
    {
        title: '2. Eftermiddag med dansk "hygge" indendørs',
        level: 'A2/B1',
        summary: 'Hvordan man skaber varme og ro i stuen, når vinteren føles lang.',
        paragraphs: [
            'Allerede klokken fire bliver det [[tidligt|Adverbium: før man forventer]] mørkt igen. Efter en lang arbejdsdag i kulden er det dejligt at komme [[indendørs|Adverbium: inde i bygningen]].',
            'Sara [[tænder|Verbum (at tænde): sætter ild til]] tre hvide [[stearinlys|Substantiv (et): levende lys]] i vindueskarmen, og Anders laver en kande te. Det giver en [[hyggelig|Adjektiv: tryg og rar]] stemning i stuen, mens frosten bider udenfor ruden.'
        ],
        quiz: [
            {
                q: 'Hvordan skaber Sara og Anders en hyggelig stemning i stuen?',
                options: [
                    'Ved at tænde stearinlys og drikke varm te indendørs.',
                    'Ved at gå ud og bygge en kæmpe snemand.',
                    'Ved at åbne alle vinduer og lufte ud.'
                ],
                correct: 0,
                expl: 'Levende lys og varme drikke indendørs er kernen i dansk vinterhygge.'
            }
        ]
    },
    {
        title: '3. Weekend på kælkebakken og ved søen',
        level: 'A2/B1',
        summary: 'Fællesskab i parken med varm drik på termokande.',
        paragraphs: [
            'Om søndagen mødes hele familien i parken. Børnene tager deres [[kælk|Substantiv (en): køretøj til sne]] med og elsker at [[kælke|Verbum: glide ned ad bakken på kælk]] om kap ned ad bakken, mens et par voksne [[skøjter|Verbum (at skøjte): glide på is med skøjter]] roligt hen over den frosne sø.',
            'Efter en time begynder lille Mikkel at [[fryse|Verbum: mærke stærk kulde]]. Heldigvis har faren taget en rød [[termokande|Substantiv (en): isoleret kande]] med, så han kan [[skænke|Verbum: hælde op i kop]] varm kakao til alle ved siden af deres nye [[snemand|Substantiv (en): figur af sne]].'
        ],
        quiz: [
            {
                q: 'Hvad hjælper Mikkel, da han begynder at fryse?',
                options: [
                    'En kop varm kakao fra farens røde termokande.',
                    'At tage sin hue af ude i vinden.',
                    'At lægge sig i den kolde sne ved siden af snemanden.'
                ],
                correct: 0,
                expl: 'Termokanden holder kakaoen varm, så man kan varme sig efter leg i sneen.'
            }
        ]
    }
];

const VINTER_PUZZLES = [
    {
        q: 'Hvad bygger børnene i sneen?',
        correct: ['Børnene', 'bygger', 'en stor snemand', 'ude i parken.'],
        scrambled: ['ude i parken.', 'bygger', 'Børnene', 'en stor snemand'],
        tip: 'Børnene (1: Subjekt) + bygger (2: Verbum) + en stor snemand (3) + ude i parken (4: Hvor?).'
    },
    {
        q: 'Hvad drikker vi for at få varmen?',
        correct: ['Vi', 'drikker', 'varm te', 'inde i stuen.'],
        scrambled: ['varm te', 'inde i stuen.', 'Vi', 'drikker'],
        tip: 'Vi (1: Subjekt) + drikker (2: Verbum) + varm te (3) + inde i stuen (4: Hvor?).'
    },
    {
        q: 'Hvad rydder naboen væk tidligt om morgenen?',
        correct: ['Naboen', 'skovler', 'hvid sne', 'på fortovet.'],
        scrambled: ['på fortovet.', 'skovler', 'Naboen', 'hvid sne'],
        tip: 'Naboen (1: Subjekt) + skovler (2: Verbum) + hvid sne (3) + på fortovet (4: Hvor?).'
    },
    {
        q: 'Hvordan cykler man på isen?',
        correct: ['Cyklisten', 'kører', 'meget forsigtigt', 'på den glatte cykelsti.'],
        scrambled: ['på den glatte cykelsti.', 'Cyklisten', 'meget forsigtigt', 'kører'],
        tip: 'Cyklisten (1: Subjekt) + kører (2: Verbum) + meget forsigtigt (3) + på den glatte cykelsti (4: Hvor?).'
    },
    {
        q: 'Hvad gør Sara med stearinlysene?',
        correct: ['Sara', 'tænder', 'tre hvide stearinlys', 'i vindueskarmen.'],
        scrambled: ['i vindueskarmen.', 'tre hvide stearinlys', 'tænder', 'Sara'],
        tip: 'Sara (1: Subjekt) + tænder (2: Verbum) + tre hvide stearinlys (3) + i vindueskarmen (4: Hvor?).'
    },
    {
        q: 'Hvor løber parret på skøjter?',
        correct: ['Parret', 'skøjter', 'hånd i hånd', 'på den frosne sø.'],
        scrambled: ['på den frosne sø.', 'hånd i hånd', 'Parret', 'skøjter'],
        tip: 'Parret (1: Subjekt) + skøjter (2: Verbum) + hånd i hånd (3) + på den frosne sø (4: Hvor?).'
    },
    {
        q: 'Hvad hælder faren op i kruset?',
        correct: ['Faren', 'skænker', 'rygende varm kakao', 'ved siden af snemanden.'],
        scrambled: ['ved siden af snemanden.', 'rygende varm kakao', 'skænker', 'Faren'],
        tip: 'Faren (1: Subjekt) + skænker (2: Verbum) + rygende varm kakao (3) + ved siden af snemanden (4: Hvor?).'
    },
    {
        q: 'Hvad tager man på mod kulden?',
        correct: ['Vi', 'bruger', 'hue og vanter', 'ude i frostvejret.'],
        scrambled: ['ude i frostvejret.', 'hue og vanter', 'Vi', 'bruger'],
        tip: 'Vi (1: Subjekt) + bruger (2: Verbum) + hue og vanter (3) + ude i frostvejret (4: Hvor?).'
    }
];

const VINTER_DIALOGUES = [
    {
        title: 'Dialog 1: Ankomst til sprogskolen en frostklar morgen',
        context: 'To kursister mødes ved indgangen og ryster kulden af sig.',
        lines: [
            { speaker: 'Ali', text: 'Hold da op, hvor er det bidende koldt i dag! Cyklede du hele vejen hertil?' },
            { speaker: 'Maria', text: 'Ja, men jeg måtte køre meget forsigtigt, for der lå glat is på cykelstien.' },
            { speaker: 'Ali', text: 'Godt du kom sikkert frem! Tag en kop varm kaffe inde i kantinen – så tøer fingrene hurtigt op.' },
            { speaker: 'Maria', text: 'Mange tak, det lyder virkelig hyggeligt indendørs i dag!' }
        ]
    },
    {
        title: 'Dialog 2: Besked fra børnehaven om vintertøj',
        context: 'En forælder taler med pædagogen om tøj til udendørs leg i sneen.',
        lines: [
            { speaker: 'Forælder', text: 'Godmorgen! Jeg har lagt ekstra vanter og en varm strikhue i Lærkes kasse.' },
            { speaker: 'Pædagog', text: 'Tusind tak! Det er guld værd, for børnene skal ud at kælke på bakken efter frokost.' },
            { speaker: 'Forælder', text: 'Dejligt – har hun også brug for et par ekstra uldsokker i støvlerne?' },
            { speaker: 'Pædagog', text: 'Ja gerne, så slipper hun for at fryse om fødderne, hvis sneen bliver våd.' }
        ]
    },
    {
        title: 'Dialog 3: Invitation til fredagshygge',
        context: 'En nabo inviterer ind på varm aftensmad efter sne-rydning.',
        lines: [
            { speaker: 'Nabo', text: 'Hej! Sikke et arbejde med at skovle al den sne væk fra fortovet!' },
            { speaker: 'Kursist', text: 'Ja, mine skuldre er godt trætte nu, og mine hænder fryser lidt.' },
            { speaker: 'Nabo', text: 'Vil du ikke kigge ind til varm suppe og tændte stearinlys om en halv time?' },
            { speaker: 'Kursist', text: 'Jo, meget gerne – det trænger jeg virkelig til efter den kolde eftermiddag!' }
        ]
    }
];

const VINTER_STRESS_WORDS = [
    {
        word: 'vinterjakke',
        parts: ['VIN', 'ter', 'jak', 'ke'],
        stressIdx: 0,
        ipa: '[ˈvendɐˌjagə]',
        meaning: 'Tyk jakke til frostvejr',
        tip: 'Trykket ligger skarpt på første stavelse: VIN-ter-jakke.'
    },
    {
        word: 'stearinlys',
        parts: ['ste', 'a', 'RIN', 'lys'],
        stressIdx: 2,
        ipa: '[sd̥eaˈʁiːnˌlyˀs]',
        meaning: 'Levende lys til hygge i mørket',
        tip: 'Læg mærke til, at trykket ligger på "-RIN-": ste-a-RIN-lys!'
    },
    {
        word: 'termokande',
        parts: ['TER', 'mo', 'kan', 'de'],
        stressIdx: 0,
        ipa: '[ˈtæɐ̯moˌkɑnə]',
        meaning: 'Kande der holder drikkevarer varme',
        tip: 'Første stavelse har hovedtrykket: TER-mo-kan-de.'
    },
    {
        word: 'glatføre',
        parts: ['GLAT', 'fø', 're'],
        stressIdx: 0,
        ipa: '[ˈɡ̊lad̥ˌføːɐ]',
        meaning: 'Glatte veje med is eller sne',
        tip: 'Kort, kontant vokal på første led: GLAT-føre.'
    },
    {
        word: 'forsigtigt',
        parts: ['for', 'SIG', 'tigt'],
        stressIdx: 1,
        ipa: '[fɒˈseɡ̊d̥id̥]',
        meaning: 'Langsomt og opmærksomt',
        tip: '"For-" er ubetonet – trykket lander på anden stavelse: for-SIG-tigt.'
    },
    {
        word: 'indendørs',
        parts: ['IN', 'den', 'dørs'],
        stressIdx: 0,
        ipa: '[ˈenənˌd̥ɶɐ̯ˀs]',
        meaning: 'Inde i en varm bygning',
        tip: 'Hovedtryk på "IN-" og stød på sidste stavelse ("-dørs").'
    }
];

const VINTER_AI_PROMPT = `Du er en varm og pædagogisk dansklærer, der træner hverdagssamtale og ordforråd om "Vinter i Danmark" (niveau A2/B1).

Når brugeren skriver "hej", skal du først spørge på hvilket sprog brugeren vil have feedback/støttesprog (f.eks. engelsk, arabisk eller dansk). Gem dette som [Støttesprog].

Når [Støttesprog] er valgt, starter du en kort samtale på simpelt hverdagsdansk om vinteren i Danmark, hvor du inviterer brugeren til at bruge vinterord som f.eks.: vinterjakke, hue, sneskovl, glat is, at skovle sne, at fryse, stearinlys, termokande, hyggelig, forsigtigt, indendørs.

REGLER FOR SAMTALEN:
1. Stil kun ÉT simpelt spørgsmål ad gangen om brugerens egne oplevelser med kulde, vintertøj, trafik i sne eller dansk "hygge" (f.eks. "Hvordan holder du varmen, når du går ud en frostkold vintermorgen?" eller "Hvad plejer du at lave indendørs, når det bliver tidligt mørkt?").
2. Når brugeren svarer på dansk:
   - Giv kort, opmuntrende svar på dansk, der fører samtalen naturligt videre.
   - Hvis der er grammatiske fejl eller ordvalg, der kan blive mere naturligt dansk, giv 1–2 korte, blide rettelses-hints på brugerens [Støttesprog] uden tung grammatik.
3. Tilbyd afslutningsvis at opsummere de nye vinterord og faste udtryk, brugeren fik brugt i samtalen.`;

const WORD_CLASS_META = {
    substantiv: { label: 'Substantiver', short: 'Substantiv', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.16)' },
    verbum: { label: 'Verber', short: 'Verbum', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.16)' },
    adjektiv: { label: 'Adjektiver', short: 'Adjektiv', color: '#f97316', bg: 'rgba(249, 115, 22, 0.16)' },
    adverbium: { label: 'Adverbier', short: 'Adverbium', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.16)' }
};

function injectStyles() {
    if (document.getElementById('aarstider-vinter-styles')) return;
    const style = document.createElement('style');
    style.id = 'aarstider-vinter-styles';
    style.textContent = `
        .vinter-view {
            max-width: 1120px;
            margin: 0 auto;
            padding: 1rem 1rem 4rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        .vinter-hero {
            text-align: center;
            margin: 0.75rem 0 1.4rem;
        }
        .vinter-hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.35rem 0.95rem;
            border-radius: 20px;
            background: rgba(56, 189, 248, 0.14);
            border: 1px solid rgba(56, 189, 248, 0.45);
            color: #7dd3fc;
            font-size: 0.82rem;
            font-weight: 800;
            margin-bottom: 0.65rem;
        }
        .vinter-hero h1 {
            margin: 0 0 0.5rem;
            font-size: 2rem;
            font-weight: 800;
            color: #ffffff;
        }
        .vinter-hero p {
            margin: 0 auto;
            max-width: 720px;
            color: #cbd5e1;
            font-size: 0.98rem;
            line-height: 1.55;
        }
        .vinter-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            margin-bottom: 1.4rem;
        }
        .vinter-tab-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.62rem 1rem;
            border-radius: 12px;
            border: 1.5px solid rgba(255, 255, 255, 0.14);
            background: rgba(15, 23, 42, 0.75);
            color: #e2e8f0;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .vinter-tab-btn:hover {
            border-color: #38bdf8;
            transform: translateY(-1px);
        }
        .vinter-tab-btn.active {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border-color: #7dd3fc;
            color: #ffffff;
            box-shadow: 0 6px 18px rgba(56, 189, 248, 0.28);
        }
        .vinter-panel { display: none; }
        .vinter-panel.active { display: block; }
        .vinter-card {
            background: rgba(15, 23, 42, 0.82);
            border: 1.5px solid rgba(255, 255, 255, 0.14);
            border-radius: 22px;
            padding: 1.35rem;
            margin-bottom: 1.4rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.32);
            box-sizing: border-box;
        }
        .vinter-toolbar {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 0.7rem;
            margin-bottom: 1rem;
        }
        .vinter-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
        }
        .vinter-filter-btn {
            padding: 0.42rem 0.85rem;
            border-radius: 999px;
            border: 1.5px solid rgba(255, 255, 255, 0.16);
            background: rgba(30, 41, 59, 0.8);
            color: #e2e8f0;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
        }
        .vinter-filter-btn.active {
            border-color: #ffffff;
            background: #0284c7;
            color: #ffffff;
        }
        .vinter-stage-wrap {
            position: relative;
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            border: 1.5px solid rgba(255, 255, 255, 0.2);
            background: #09111f;
            touch-action: pan-x pan-y pinch-zoom;
        }
        .vinter-stage-inner {
            position: relative;
            width: 100%;
            transition: transform 0.25s ease;
            transform-origin: center center;
        }
        .vinter-stage-img {
            width: 100%;
            height: auto;
            display: block;
            user-select: none;
        }
        .vinter-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 2.5px solid #ffffff;
            color: #ffffff;
            font-size: 0.72rem;
            font-weight: 900;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.65);
            transition: transform 0.18s ease, box-shadow 0.18s ease;
            z-index: 5;
            padding: 0;
        }
        .vinter-pin:hover, .vinter-pin.active {
            transform: translate(-50%, -50%) scale(1.22);
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.4), 0 6px 16px rgba(0, 0, 0, 0.75);
            z-index: 15;
        }
        .vinter-pin.found {
            background: #22c55e !important;
            box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.55);
            z-index: 20;
        }
        .vinter-pin.hidden-pin {
            opacity: 0.14;
            pointer-events: none;
        }
        .vinter-detail-box {
            margin-top: 1rem;
            padding: 1.15rem 1.25rem;
            border-radius: 16px;
            background: rgba(7, 13, 25, 0.85);
            border: 1.5px solid rgba(56, 189, 248, 0.35);
            text-align: left;
        }
        .vinter-pill-tag {
            display: inline-block;
            padding: 0.22rem 0.65rem;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 800;
        }
        .vinter-sort-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 0.85rem;
            margin-top: 1rem;
        }
        .vinter-sort-bucket {
            border-radius: 14px;
            padding: 0.9rem;
            background: rgba(7, 13, 25, 0.72);
            border: 1.5px dashed rgba(255, 255, 255, 0.22);
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
        }
        .vinter-sort-bucket:hover {
            border-style: solid;
            transform: translateY(-2px);
        }
        .vinter-chips-pool {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 0.85rem 0;
        }
        .vinter-chip {
            padding: 0.5rem 0.9rem;
            border-radius: 10px;
            border: 1.5px solid rgba(255, 255, 255, 0.22);
            background: rgba(30, 41, 59, 0.88);
            color: #f8fafc;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .vinter-chip.selected {
            border-color: #fbbf24;
            background: rgba(245, 158, 11, 0.25);
            color: #fde68a;
        }
        .vinter-chip:disabled {
            opacity: 0.42;
            cursor: not-allowed;
        }
        .vinter-opt-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.65rem;
            margin: 0.85rem 0;
        }
        .vinter-opt-btn {
            display: flex;
            align-items: center;
            gap: 0.55rem;
            padding: 0.78rem 1rem;
            border-radius: 12px;
            border: 1.5px solid rgba(255, 255, 255, 0.16);
            background: rgba(30, 41, 59, 0.82);
            color: #f8fafc;
            font-weight: 700;
            font-size: 0.9rem;
            text-align: left;
            cursor: pointer;
            transition: all 0.16s ease;
        }
        .vinter-opt-btn:hover:not(:disabled) {
            border-color: #38bdf8;
            background: rgba(51, 65, 85, 0.9);
        }
        .vinter-opt-btn.correct {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.22);
            color: #bbf7d0;
        }
        .vinter-opt-btn.incorrect {
            border-color: #ef4444;
            background: rgba(239, 68, 68, 0.22);
            color: #fecaca;
        }
        .vinter-glose {
            display: inline-block;
            padding: 0.05rem 0.38rem;
            border-radius: 6px;
            background: rgba(56, 189, 248, 0.18);
            border: 1px solid rgba(56, 189, 248, 0.45);
            color: #7dd3fc;
            font-weight: 700;
            cursor: pointer;
        }
        .vinter-slots-row {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0.65rem;
            margin: 1rem 0;
        }
        .vinter-slot {
            min-height: 76px;
            padding: 0.65rem;
            border-radius: 12px;
            background: rgba(7, 13, 25, 0.82);
            border: 1.5px dashed rgba(255, 255, 255, 0.24);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            cursor: pointer;
            text-align: center;
        }
        .vinter-slot.filled {
            border-style: solid;
            background: rgba(30, 41, 59, 0.92);
        }
        .vinter-dialog-line {
            padding: 0.78rem 1rem;
            border-radius: 12px;
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            background: rgba(30, 41, 59, 0.75);
            color: #f1f5f9;
            text-align: left;
            cursor: pointer;
            margin-bottom: 0.5rem;
            width: 100%;
            box-sizing: border-box;
            font-size: 0.92rem;
            line-height: 1.45;
        }
        .vinter-dialog-line.selected-order {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.16);
        }
        .vinter-syllable-btn {
            padding: 0.65rem 1.05rem;
            border-radius: 12px;
            border: 1.5px solid rgba(255, 255, 255, 0.2);
            background: rgba(30, 41, 59, 0.85);
            color: #f8fafc;
            font-size: 1.05rem;
            font-weight: 800;
            cursor: pointer;
        }
        .vinter-syllable-btn.stressed {
            border-color: #f59e0b;
            background: rgba(245, 158, 11, 0.25);
            color: #fde68a;
        }
        .vinter-msg {
            margin-top: 0.75rem;
            padding: 0.85rem 1rem;
            border-radius: 12px;
            font-size: 0.92rem;
            line-height: 1.5;
        }
        .vinter-msg.ok {
            background: rgba(34, 197, 94, 0.16);
            border: 1px solid rgba(34, 197, 94, 0.5);
            color: #bbf7d0;
        }
        .vinter-msg.err {
            background: rgba(239, 68, 68, 0.16);
            border: 1px solid rgba(239, 68, 68, 0.45);
            color: #fecaca;
        }
        .vinter-primary-btn {
            padding: 0.65rem 1.2rem;
            border-radius: 11px;
            border: none;
            background: #0284c7;
            color: #ffffff;
            font-weight: 800;
            font-size: 0.9rem;
            cursor: pointer;
        }
        .vinter-secondary-btn {
            padding: 0.55rem 1rem;
            border-radius: 10px;
            border: 1.5px solid rgba(255, 255, 255, 0.2);
            background: rgba(30, 41, 59, 0.85);
            color: #e2e8f0;
            font-weight: 700;
            font-size: 0.85rem;
            cursor: pointer;
        }
        .vinter-tr {
            font-size: 0.82rem;
            color: #93c5fd;
            margin-top: 0.22rem;
            line-height: 1.45;
            font-weight: 500;
        }
        .vinter-tr-sent {
            font-size: 0.85rem;
            color: #93c5fd;
            margin-top: 0.3rem;
            line-height: 1.45;
            font-style: italic;
        }
        @media (max-width: 720px) {
            .vinter-slots-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .vinter-hero h1 { font-size: 1.55rem; }
            .vinter-card { padding: 1rem; }
            .vinter-pin { width: 22px; height: 22px; font-size: 0.64rem; }
        }
    `;
    document.head.appendChild(style);
}

export function renderAarstiderVinterView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    injectStyles();

    const lang = getLang() || 'da';
    const rtlAttr = isAvRtl(lang) ? ' dir="rtl"' : '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container vinter-view';

    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = `← ${getTranslation('back') || 'Tilbage til Mit hverdagsliv'}`;
    backBtn.onclick = () => navigateFn('mit_hverdagsliv');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const hero = document.createElement('div');
    hero.className = 'vinter-hero';
    hero.innerHTML = `
        <div class="vinter-hero-badge"${rtlAttr}>❄️ ${avT('hero_badge', lang)}</div>
        <h1${rtlAttr}>${avT('hero_title', lang)}</h1>
        <p${rtlAttr}>${avT('hero_desc', lang)}</p>
    `;
    viewContainer.appendChild(hero);

    const tabs = [
        { id: 'tab_vrimmel', icon: '🔍', label: avT('tab_1', lang) },
        { id: 'tab_detektiv', icon: '🕵️', label: avT('tab_2', lang) },
        { id: 'tab_syn_ant', icon: '🔄', label: avT('tab_3', lang) },
        { id: 'tab_historie', icon: '📖', label: avT('tab_4', lang) },
        { id: 'tab_saetning', icon: '✍️', label: avT('tab_5', lang) },
        { id: 'tab_dialog', icon: '💬', label: avT('tab_6', lang) },
        { id: 'tab_tryk', icon: '🎯', label: avT('tab_7', lang) }
    ];

    let currentTab = extraData?.subPath && tabs.some(t => t.id === extraData.subPath)
        ? extraData.subPath
        : 'tab_vrimmel';

    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'vinter-tabs';
    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `vinter-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.textContent = `${t.icon} ${t.label}`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', `#/${lang}/mit_hverdagsliv_aarstider/${tabId}`);
        tabsMenu.querySelectorAll('.vinter-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.vinter-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    function makePanel(id) {
        const p = document.createElement('div');
        p.className = `vinter-panel ${currentTab === id ? 'active' : ''}`;
        p.dataset.panel = id;
        return p;
    }

    // =========================================================================
    // TAB 1: VRIMLEBILLEDE + ORDKLASSE-SORTERING
    // =========================================================================
    const panel1 = makePanel('tab_vrimmel');
    let activeFilter = 'alle';
    let selectedWord = VINTER_WORDS[0];

    const card1 = document.createElement('div');
    card1.className = 'vinter-card';
    card1.innerHTML = `
        <div class="vinter-toolbar">
            <div class="vinter-filters">
                <button type="button" class="vinter-filter-btn active" data-filter="alle"${rtlAttr}>${avT('wc_all', lang)}</button>
                <button type="button" class="vinter-filter-btn" data-filter="substantiv" style="border-color:#22c55e66;"${rtlAttr}>🟢 ${avT('wc_sub', lang)} (${VINTER_WORDS.filter(w => w.wordClass === 'substantiv').length})</button>
                <button type="button" class="vinter-filter-btn" data-filter="verbum" style="border-color:#ef444466;"${rtlAttr}>🔴 ${avT('wc_vrb', lang)} (${VINTER_WORDS.filter(w => w.wordClass === 'verbum').length})</button>
                <button type="button" class="vinter-filter-btn" data-filter="adjektiv" style="border-color:#f9731666;"${rtlAttr}>🟠 ${avT('wc_adj', lang)} (${VINTER_WORDS.filter(w => w.wordClass === 'adjektiv').length})</button>
                <button type="button" class="vinter-filter-btn" data-filter="adverbium" style="border-color:#38bdf866;"${rtlAttr}>🔵 ${avT('wc_adv', lang)} (${VINTER_WORDS.filter(w => w.wordClass === 'adverbium').length})</button>
            </div>
        </div>
        <div class="vinter-stage-wrap">
            <div class="vinter-stage-inner" id="vinter-stage-inner">
                <img src="assets/vinter_vrimmel.jpg" alt="Vinter i Danmark vrimlebillede" class="vinter-stage-img" />
                <div id="vinter-pins-layer"></div>
            </div>
        </div>
        <div class="vinter-detail-box" id="vinter-detail-box"></div>
    `;

    const pinsLayer = card1.querySelector('#vinter-pins-layer');
    const detailBox = card1.querySelector('#vinter-detail-box');
    attachVrimmelControls(card1.querySelector('.vinter-stage-wrap'), pinsLayer, { lang });

    function renderWordDetail(w) {
        const meta = WORD_CLASS_META[w.wordClass];
        const clsLabelMap = {
            substantiv: avT('wc_sub', lang),
            verbum: avT('wc_vrb', lang),
            adjektiv: avT('wc_adj', lang),
            adverbium: avT('wc_adv', lang)
        };
        detailBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem;">
                <div style="font-size:1.25rem; font-weight:800; color:#ffffff;">${w.icon} ${w.num}. ${w.word}</div>
                <span class="vinter-pill-tag" style="background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.color};">${clsLabelMap[w.wordClass] || meta.short}</span>
            </div>
            <div style="color:#94a3b8; font-size:0.85rem; margin-bottom:0.45rem;">${w.forms}</div>
            <p style="margin:0 0 0.25rem; color:#e2e8f0; line-height:1.5;">${w.definition}</p>
            ${avSub(`w${w.num}_def`, 'vinter-tr', lang)}
            <div style="font-size:0.86rem; color:#fde68a; margin:0.45rem 0;"><strong>${avT('lbl_fixed', lang)}</strong> ${w.fixedTerms}</div>
            <div style="font-size:0.94rem; color:#bae6fd; background:rgba(56,189,248,0.08); padding:0.55rem 0.8rem; border-radius:10px; border-left:3px solid ${meta.color};">
                <div>"${w.sentence}"</div>
                ${avSub(`w${w.num}_sent`, 'vinter-tr-sent', lang)}
            </div>
        `;
    }

    function renderPins() {
        pinsLayer.innerHTML = '';
        VINTER_WORDS.forEach(w => {
            const meta = WORD_CLASS_META[w.wordClass];
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `vinter-pin ${w.id === selectedWord.id ? 'active' : ''} ${activeFilter !== 'alle' && w.wordClass !== activeFilter ? 'hidden-pin' : ''}`;
            btn.style.left = `${w.x}%`;
            btn.style.top = `${w.y}%`;
            btn.style.background = meta.color;
            btn.textContent = w.num;
            btn.title = `${w.word} (${meta.short})`;
            btn.onclick = () => {
                selectedWord = w;
                renderWordDetail(w);
                renderPins();
            };
            pinsLayer.appendChild(btn);
        });
    }

    card1.querySelectorAll('.vinter-filter-btn').forEach(btn => {
        btn.onclick = () => {
            activeFilter = btn.dataset.filter;
            card1.querySelectorAll('.vinter-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPins();
        };
    });

    renderWordDetail(selectedWord);
    renderPins();
    panel1.appendChild(card1);

    // Ordklasse-sortering i bunden af Fane 1
    const sortCard = document.createElement('div');
    sortCard.className = 'vinter-card';
    sortCard.id = 'vinter-sort-card';
    const sortPool = shuffleArray(VINTER_WORDS);
    const totalSortWords = sortPool.length;
    const sortedMap = { substantiv: [], verbum: [], adjektiv: [], adverbium: [] };
    let activeSortIdx = 0;
    let sortMsg = '';

    function renderSorting() {
        const placedSet = new Set(Object.values(sortedMap).flat());
        const placedCount = placedSet.size;
        if (placedSet.has(activeSortIdx)) {
            const nextAvail = sortPool.findIndex((_, idx) => !placedSet.has(idx));
            activeSortIdx = nextAvail;
        }
        const activeWord = activeSortIdx >= 0 ? sortPool[activeSortIdx] : null;

        const clsLabelMap = {
            substantiv: avT('wc_sub', lang),
            verbum: avT('wc_vrb', lang),
            adjektiv: avT('wc_adj', lang),
            adverbium: avT('wc_adv', lang)
        };

        sortCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.4rem;">
                <h3 style="margin:0; font-size:1.15rem; font-weight:800;"${rtlAttr}>📦 ${avT('fb_sort_title', lang)} (${placedCount}/${totalSortWords})</h3>
                <button type="button" class="vinter-secondary-btn" id="vinter-sort-reset">🔄 ${avT('btn_reset', lang)}</button>
            </div>
            <p style="margin:0 0 0.85rem; color:#cbd5e1; font-size:0.9rem;"${rtlAttr}>${avT('fb_sort_prompt', lang)}</p>
            <div class="vinter-chips-pool" id="vinter-sort-bank" style="padding:0.85rem; border-radius:14px; background:rgba(7,13,25,0.78); border:1px solid rgba(255,255,255,0.12);">
                ${sortPool.map((item, idx) => {
                    const isPlaced = placedSet.has(idx);
                    const isActive = idx === activeSortIdx;
                    return `
                        <button type="button" class="vinter-chip ${isActive ? 'selected' : ''}" data-sidx="${idx}" ${isPlaced ? 'disabled' : ''} style="${isPlaced ? 'text-decoration:line-through; opacity:0.35;' : ''}${isActive ? 'background:#f59e0b; color:#0f172a; border-color:#fef08a; box-shadow:0 0 0 3px rgba(245,158,11,0.35);' : ''}">
                            ${item.icon} ${item.word}
                        </button>
                    `;
                }).join('')}
            </div>
            ${activeWord ? `
                <div style="margin:0.85rem 0; padding:0.75rem 1.1rem; border-radius:12px; background:rgba(245,158,11,0.16); border:1.5px solid #f59e0b; color:#fef3c7; font-size:1rem; font-weight:800; display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                    <span style="font-size:1.12rem; color:#ffffff;">${activeWord.icon} ${activeWord.word}</span>
                </div>
            ` : `
                <div class="vinter-msg ok"${rtlAttr}>🏆 ${avT('fb_sort_done', lang)}</div>
            `}
            <div class="vinter-sort-grid">
                ${Object.entries(WORD_CLASS_META).map(([clsKey, meta]) => `
                    <button type="button" class="vinter-sort-bucket" data-bucket="${clsKey}" style="border-color:${meta.color}88; background:${meta.bg};">
                        <div style="font-weight:800; color:${meta.color}; margin-bottom:0.4rem;"${rtlAttr}>${clsLabelMap[clsKey] || meta.label} (${sortedMap[clsKey].length})</div>
                        <div style="font-size:0.84rem; color:#e2e8f0; line-height:1.45;">
                            ${sortedMap[clsKey].map(i => sortPool[i].word).join(' • ') || `<span${rtlAttr}>${avT('fb_sort_drop', lang)}</span>`}
                        </div>
                    </button>
                `).join('')}
            </div>
            ${sortMsg ? `<div class="vinter-msg ${sortMsg.startsWith('✓') ? 'ok' : 'err'}"${rtlAttr}>${sortMsg}</div>` : ''}
        `;

        sortCard.querySelector('#vinter-sort-reset').onclick = () => {
            sortedMap.substantiv = [];
            sortedMap.verbum = [];
            sortedMap.adjektiv = [];
            sortedMap.adverbium = [];
            activeSortIdx = 0;
            sortMsg = '';
            renderSorting();
        };

        sortCard.querySelectorAll('#vinter-sort-bank .vinter-chip[data-sidx]').forEach(chip => {
            chip.onclick = () => {
                const idx = Number(chip.dataset.sidx);
                if (!placedSet.has(idx)) {
                    activeSortIdx = idx;
                    sortMsg = '';
                    renderSorting();
                }
            };
        });

        if (activeWord) {
            sortCard.querySelectorAll('.vinter-sort-bucket').forEach(b => {
                b.onclick = () => {
                    const chosen = b.dataset.bucket;
                    if (chosen === activeWord.wordClass) {
                        sortedMap[chosen].push(activeSortIdx);
                        sortMsg = `✓ ${avT('fb_sort_ok', lang)} (${activeWord.word})`;
                    } else {
                        sortMsg = `${avT('fb_sort_err', lang)} — ${avT(`w${activeWord.num}_def`, lang)}`;
                    }
                    renderSorting();
                };
            });
        }
    }
    renderSorting();
    panel1.appendChild(sortCard);
    panelsHolder.appendChild(panel1);

    // =========================================================================
    // TAB 2: VISUEL ORD-DETEKTIV (10 BILLEDJAGT-MISSIONER)
    // =========================================================================
    const panel2 = makePanel('tab_detektiv');
    const detCard = document.createElement('div');
    detCard.className = 'vinter-card';
    let detIdx = 0;
    let detScore = 0;
    let detFeedback = null;

    function renderDetective() {
        if (detIdx >= VINTER_DETECTIVE_MISSIONS.length) {
            detCard.innerHTML = `
                <div style="text-align:center; padding:1.5rem 0.5rem;">
                    <h2 style="margin:0 0 0.5rem;">🕵️ Alle 10 vinter-missioner er løst!</h2>
                    <p style="color:#cbd5e1; margin-bottom:1.1rem;">Du fandt <strong>${detScore}</strong> af <strong>${VINTER_DETECTIVE_MISSIONS.length}</strong> rigtige i første forsøg.</p>
                    <button type="button" class="vinter-primary-btn" id="det-restart">Prøv billedjagten igen</button>
                </div>
            `;
            detCard.querySelector('#det-restart').onclick = () => {
                detIdx = 0;
                detScore = 0;
                detFeedback = null;
                renderDetective();
            };
            return;
        }

        const m = VINTER_DETECTIVE_MISSIONS[detIdx];
        const targetWord = VINTER_WORDS.find(w => w.id === m.answerId);
        detCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.8rem;">
                <span class="vinter-pill-tag" style="background:rgba(56,189,248,0.16); color:#7dd3fc; border:1px solid #38bdf8;">Mission ${detIdx + 1} / ${VINTER_DETECTIVE_MISSIONS.length}</span>
                <span style="font-weight:800; color:#fde68a;">Point: ${detScore}</span>
            </div>
            <h3 style="margin:0 0 0.4rem; font-size:1.2rem;"${rtlAttr}>${avT(`det${detIdx + 1}_p`, lang)}</h3>
            <p style="margin:0 0 0.9rem; color:#94a3b8; font-size:0.88rem;"${rtlAttr}>${avT(`det${detIdx + 1}_h`, lang)}</p>
            <div class="vinter-stage-wrap">
                <div class="vinter-stage-inner">
                    <img src="assets/vinter_vrimmel.jpg" alt="Detektiv vinterbillede" class="vinter-stage-img" />
                    <div id="det-pins-layer"></div>
                </div>
            </div>
            <div id="det-feedback-area"></div>
        `;

        const pinsEl = detCard.querySelector('#det-pins-layer');
        attachVrimmelControls(detCard.querySelector('.vinter-stage-wrap'), pinsEl, { lang });
        const fbEl = detCard.querySelector('#det-feedback-area');
        let solvedCurrent = false;
        let missedCurrent = false;

        VINTER_WORDS.forEach(w => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'vinter-pin';
            btn.style.left = `${w.x}%`;
            btn.style.top = `${w.y}%`;
            btn.style.background = '#0284c7';
            btn.textContent = '?';
            btn.title = 'Klik for at gætte';
            btn.onclick = () => {
                if (solvedCurrent) return;
                if (w.id === m.answerId) {
                    solvedCurrent = true;
                    if (!missedCurrent) detScore++;
                    btn.classList.add('found');
                    btn.textContent = '✓';
                    fbEl.innerHTML = `
                        <div class="vinter-msg ok"${rtlAttr}>
                            <strong>${avT('fb_correct', lang)} (${targetWord.word})</strong> – ${avT(`w${targetWord.num}_def`, lang)}
                        </div>
                        <div style="margin-top:0.75rem;">
                            <button type="button" class="vinter-primary-btn" id="det-next">${avT('btn_next', lang)}</button>
                        </div>
                    `;
                    fbEl.querySelector('#det-next').onclick = () => {
                        detIdx++;
                        renderDetective();
                    };
                } else {
                    missedCurrent = true;
                    btn.style.background = '#ef4444';
                    btn.textContent = '✕';
                    fbEl.innerHTML = `
                        <div class="vinter-msg err"${rtlAttr}><strong>${w.word}</strong> (${avT(`w${w.num}_def`, lang)}) — ${avT('det_wrong', lang)}</div>
                    `;
                }
            };
            pinsEl.appendChild(btn);
        });
    }
    renderDetective();
    panel2.appendChild(detCard);
    panelsHolder.appendChild(panel2);

    // =========================================================================
    // TAB 3: SYNONYMER, ANTONYMER & VEJRSKALA
    // =========================================================================
    const panel3 = makePanel('tab_syn_ant');
    const synCard = document.createElement('div');
    synCard.className = 'vinter-card';
    let duelIdx = 0;
    let duelScore = 0;
    let duelOptionsCache = {};

    function getDuelOptions(i) {
        if (!duelOptionsCache[i]) {
            duelOptionsCache[i] = shuffleArray(VINTER_OPP_DUELS[i].options);
        }
        return duelOptionsCache[i];
    }

    function renderDuel() {
        if (duelIdx >= VINTER_OPP_DUELS.length) {
            synCard.innerHTML = `
                <h3 style="margin:0 0 0.5rem;">🔄 Modsætninger & synonymer gennemført!</h3>
                <p style="color:#cbd5e1;">Du fik <strong>${duelScore}</strong> ud af <strong>${VINTER_OPP_DUELS.length}</strong> rigtige.</p>
                <button type="button" class="vinter-primary-btn" id="duel-restart">Prøv runden igen</button>
            `;
            synCard.querySelector('#duel-restart').onclick = () => {
                duelIdx = 0;
                duelScore = 0;
                duelOptionsCache = {};
                renderDuel();
            };
            return;
        }
        const d = VINTER_OPP_DUELS[duelIdx];
        const opts = getDuelOptions(duelIdx);
        synCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                <span class="vinter-pill-tag" style="background:rgba(249,115,22,0.16); color:#fdba74; border:1px solid #f97316;">Ordklasse: ${d.wordClass}</span>
                <span style="font-weight:800; color:#fde68a;">Opgave ${duelIdx + 1}/${VINTER_OPP_DUELS.length} • Point: ${duelScore}</span>
            </div>
            <h3 style="margin:0 0 0.4rem;"${rtlAttr}>${avT('opp_prompt', lang)} <span style="color:#7dd3fc;">"${d.word}"</span></h3>
            <div class="vinter-opt-grid" id="duel-opts"></div>
            <div id="duel-fb"></div>
        `;
        const grid = synCard.querySelector('#duel-opts');
        const fb = synCard.querySelector('#duel-fb');
        let answered = false;

        opts.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'vinter-opt-btn';
            btn.innerHTML = `<span>${String.fromCharCode(65 + i)})</span> <span>${opt}</span>`;
            btn.onclick = () => {
                if (answered) return;
                answered = true;
                const ok = opt === d.correct;
                if (ok) duelScore++;
                grid.querySelectorAll('.vinter-opt-btn').forEach(b => {
                    b.disabled = true;
                    if (b.textContent.includes(d.correct)) b.classList.add('correct');
                });
                if (!ok) btn.classList.add('incorrect');
                fb.innerHTML = `
                    <div class="vinter-msg ${ok ? 'ok' : 'err'}"${rtlAttr}>
                        <strong>${ok ? avT('fb_correct', lang) : `${avT('opp_wrong_prefix', lang)} "${d.correct}".`}</strong> ${avT(`opp${duelIdx + 1}_tip`, lang)}
                    </div>
                    <div style="margin-top:0.7rem;">
                        <button type="button" class="vinter-primary-btn" id="duel-next">${avT('btn_next', lang)}</button>
                    </div>
                `;
                fb.querySelector('#duel-next').onclick = () => {
                    duelIdx++;
                    renderDuel();
                };
            };
            grid.appendChild(btn);
        });
    }
    renderDuel();
    panel3.appendChild(synCard);

    // Temperatur- & Nedbørsskala
    const scaleCard = document.createElement('div');
    scaleCard.className = 'vinter-card';
    const tempSteps = [
        { term: 'kølig (+8° til +4°)', desc: 'Man behøver typisk en efterårsjakke, når vinden blæser.' },
        { term: 'kold (+3° til 0°)', desc: 'Luften bider let – nu skal vinterjakke og måske hue på.' },
        { term: 'frost / iskold (-1° til -7°)', desc: 'Vandpytter og cykelstier fryser til glat is om natten.' },
        { term: 'bidende frost (under -8°)', desc: 'Sjældnere i Danmark, men når blæsten rammer, føles det ekstra koldt – så er vanter og halstørklæde nødvendige!' }
    ];
    let selectedScale = 2;
    function renderScale() {
        scaleCard.innerHTML = `
            <h3 style="margin:0 0 0.4rem;"${rtlAttr}>🌡️ ${avT('scale_title', lang)}</h3>
            <p style="margin:0 0 0.8rem; color:#cbd5e1; font-size:0.9rem;"${rtlAttr}>${avT('scale_instr', lang)}</p>
            <div class="vinter-chips-pool">
                ${tempSteps.map((s, i) => `
                    <button type="button" class="vinter-chip ${i === selectedScale ? 'selected' : ''}" data-step="${i}">${s.term}</button>
                `).join('')}
            </div>
            <div class="vinter-msg ok"${rtlAttr} style="border-color:#38bdf8; background:rgba(56,189,248,0.12); color:#e0f2fe;">
                <strong>${tempSteps[selectedScale].term}:</strong> ${avT(`scale${selectedScale}_desc`, lang)}
            </div>
        `;
        scaleCard.querySelectorAll('.vinter-chip').forEach(c => {
            c.onclick = () => {
                selectedScale = Number(c.dataset.step);
                renderScale();
            };
        });
    }
    renderScale();
    panel3.appendChild(scaleCard);
    panelsHolder.appendChild(panel3);

    // =========================================================================
    // TAB 4: HVERDAGSHISTORIER (KLIKBARE GLOSER + RANDOMISERET QUIZ)
    // =========================================================================
    const panel4 = makePanel('tab_historie');
    let storyIdx = 0;
    const storyCard = document.createElement('div');
    storyCard.className = 'vinter-card';
    let storyQuizCache = {};

    function renderStory() {
        const st = VINTER_STORIES[storyIdx];
        const parsedParagraphs = st.paragraphs.map(p =>
            p.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (_, word, tip) =>
                `<span class="vinter-glose" data-tip="${tip.replace(/"/g, '&quot;')}">${word}</span>`
            )
        );

        storyCard.innerHTML = `
            <div class="vinter-chips-pool" style="margin-top:0;">
                ${VINTER_STORIES.map((s, i) => `
                    <button type="button" class="vinter-chip ${i === storyIdx ? 'selected' : ''}" data-si="${i}">${s.title}</button>
                `).join('')}
            </div>
            <div style="margin:0.5rem 0 0.8rem; display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
                <span class="vinter-pill-tag" style="background:rgba(34,197,94,0.16); color:#4ade80; border:1px solid #22c55e;">Niveau ${st.level}</span>
                <span style="color:#94a3b8; font-size:0.88rem;"${rtlAttr}>${avT(`st${storyIdx + 1}_sum`, lang)} (${avT('story_hint', lang)})</span>
            </div>
            <div style="background:rgba(7,13,25,0.75); padding:1.15rem 1.25rem; border-radius:14px; border:1px solid rgba(255,255,255,0.12); line-height:1.78; font-size:1rem; color:#f1f5f9;">
                ${parsedParagraphs.map(html => `<p style="margin:0 0 0.85rem;">${html}</p>`).join('')}
            </div>
            <div id="story-glose-tip" style="margin-top:0.7rem;"></div>
            <div id="story-quiz-area" style="margin-top:1.2rem;"></div>
        `;

        storyCard.querySelectorAll('.vinter-chip[data-si]').forEach(btn => {
            btn.onclick = () => {
                storyIdx = Number(btn.dataset.si);
                renderStory();
            };
        });

        const tipBox = storyCard.querySelector('#story-glose-tip');
        storyCard.querySelectorAll('.vinter-glose').forEach(el => {
            el.onclick = () => {
                tipBox.innerHTML = `<div class="vinter-msg ok" style="background:rgba(56,189,248,0.14); border-color:#38bdf8; color:#e0f2fe;"><strong>"${el.textContent}":</strong> ${el.dataset.tip}</div>`;
            };
        });

        const quizArea = storyCard.querySelector('#story-quiz-area');
        st.quiz.forEach((qItem, qi) => {
            const cacheKey = `${storyIdx}_${qi}`;
            if (!storyQuizCache[cacheKey]) {
                const indices = shuffleArray(qItem.options.map((_, i) => i));
                storyQuizCache[cacheKey] = {
                    options: indices.map(i => qItem.options[i]),
                    correctIdx: indices.indexOf(qItem.correct)
                };
            }
            const sq = storyQuizCache[cacheKey];
            const qBox = document.createElement('div');
            qBox.style.cssText = 'padding:0.9rem 1rem; border-radius:12px; background:rgba(30,41,59,0.55); margin-bottom:0.75rem; border:1px solid rgba(255,255,255,0.1);';
            qBox.innerHTML = `<div style="font-weight:800; margin-bottom:0.55rem;">Spørgsmål ${qi + 1}: ${qItem.q}</div>`;
            const optGrid = document.createElement('div');
            optGrid.className = 'vinter-opt-grid';
            const fbDiv = document.createElement('div');
            let answered = false;

            sq.options.forEach((optText, optIdx) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 'vinter-opt-btn';
                b.innerHTML = `<span>${String.fromCharCode(65 + optIdx)})</span> <span>${optText}</span>`;
                b.onclick = () => {
                    if (answered) return;
                    answered = true;
                    const ok = optIdx === sq.correctIdx;
                    optGrid.querySelectorAll('.vinter-opt-btn').forEach((btnEl, i) => {
                        btnEl.disabled = true;
                        if (i === sq.correctIdx) btnEl.classList.add('correct');
                    });
                    if (!ok) b.classList.add('incorrect');
                    fbDiv.innerHTML = `<div class="vinter-msg ${ok ? 'ok' : 'err'}"${rtlAttr}><strong>${ok ? avT('fb_correct', lang) : avT('fb_wrong', lang)}</strong> ${avT(`st${storyIdx + 1}_e${qi + 1}`, lang)}</div>`;
                };
                optGrid.appendChild(b);
            });
            qBox.appendChild(optGrid);
            qBox.appendChild(fbDiv);
            quizArea.appendChild(qBox);
        });
    }
    renderStory();
    panel4.appendChild(storyCard);
    panelsHolder.appendChild(panel4);

    // =========================================================================
    // TAB 5: PUSLEOPGAVER & SÆTNINGSBYGNING (SUBJEKT -> VERBUM -> REST -> HVOR)
    // =========================================================================
    const panel5 = makePanel('tab_saetning');
    const puzzleCard = document.createElement('div');
    puzzleCard.className = 'vinter-card';
    let pzIdx = 0;
    const pzDone = new Set();
    let pzSlots = [null, null, null, null];
    const slotDefs = [
        { label: 'Hvem / Hvad?', grammar: 'Subjekt (1)', color: '#22c55e' },
        { label: 'Verbum', grammar: 'Verbum (2)', color: '#ef4444' },
        { label: 'Resten', grammar: 'Objekt / Led (3)', color: '#f97316' },
        { label: 'Hvor?', grammar: 'Hvor? (4)', color: '#38bdf8' }
    ];

    function renderPuzzle() {
        const task = VINTER_PUZZLES[pzIdx];
        puzzleCard.innerHTML = `
            <span class="vinter-pill-tag" style="background:rgba(56,189,248,0.16); color:#7dd3fc; border:1px solid #38bdf8; margin-bottom:0.6rem;"${rtlAttr}>A. ${avT('puz_title', lang)}</span>
            <p style="margin:0 0 0.65rem; color:#94a3b8; font-size:0.86rem;"${rtlAttr}>${avT('puz_instr', lang)}</p>
            <div class="vinter-chips-pool">
                ${VINTER_PUZZLES.map((_, i) => `
                    <button type="button" class="vinter-chip ${i === pzIdx ? 'selected' : ''}" data-pi="${i}" style="${pzDone.has(i) ? 'border-color:#22c55e;' : ''}">
                        ${pzDone.has(i) ? `✓ ${i + 1}` : i + 1}
                    </button>
                `).join('')}
            </div>
            <h3 style="margin:0.3rem 0 0.7rem;"${rtlAttr}>${avT(`puz${pzIdx + 1}_q`, lang)}</h3>
            <div class="vinter-slots-row" id="vpz-slots"></div>
            <div class="vinter-chips-pool" id="vpz-bank"></div>
            <div id="vpz-fb"></div>
        `;

        puzzleCard.querySelectorAll('.vinter-chip[data-pi]').forEach(b => {
            b.onclick = () => {
                pzIdx = Number(b.dataset.pi);
                pzSlots = [null, null, null, null];
                renderPuzzle();
            };
        });

        const slotsEl = puzzleCard.querySelector('#vpz-slots');
        const bankEl = puzzleCard.querySelector('#vpz-bank');
        const fbEl = puzzleCard.querySelector('#vpz-fb');

        function updatePuzzleUI() {
            slotsEl.innerHTML = '';
            slotDefs.forEach((def, idx) => {
                const s = document.createElement('div');
                s.className = `vinter-slot ${pzSlots[idx] ? 'filled' : ''}`;
                s.style.borderColor = def.color;
                s.innerHTML = `
                    <div style="font-size:0.72rem; font-weight:800; color:${def.color};">${idx + 1}. ${def.grammar}</div>
                    <div style="font-weight:800; font-size:0.95rem; color:${pzSlots[idx] ? '#ffffff' : '#64748b'};">${pzSlots[idx] || def.label}</div>
                `;
                s.onclick = () => {
                    if (pzSlots[idx]) {
                        pzSlots[idx] = null;
                        fbEl.innerHTML = '';
                        updatePuzzleUI();
                    }
                };
                slotsEl.appendChild(s);
            });

            bankEl.innerHTML = '';
            task.scrambled.forEach(w => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'vinter-chip';
                btn.textContent = w;
                btn.disabled = pzSlots.includes(w);
                btn.onclick = () => {
                    const empty = pzSlots.indexOf(null);
                    if (empty === -1) return;
                    pzSlots[empty] = w;
                    updatePuzzleUI();
                    if (!pzSlots.includes(null)) {
                        const ok = pzSlots.every((val, i) => val === task.correct[i]);
                        if (ok) {
                            pzDone.add(pzIdx);
                            fbEl.innerHTML = `
                                <div class="vinter-msg ok"${rtlAttr}><strong>${avT('fb_correct', lang)}</strong> "${pzSlots.join(' ')}"<br><span style="font-size:0.86rem; color:#d1fae5;">${avT(`puz${pzIdx + 1}_tip`, lang)}</span></div>
                                <div style="margin-top:0.65rem;"><button type="button" class="vinter-primary-btn" id="vpz-next">${avT('btn_next', lang)}</button></div>
                            `;
                            fbEl.querySelector('#vpz-next').onclick = () => {
                                pzIdx = (pzIdx + 1) % VINTER_PUZZLES.length;
                                pzSlots = [null, null, null, null];
                                renderPuzzle();
                            };
                        } else {
                            fbEl.innerHTML = `
                                <div class="vinter-msg err"${rtlAttr}>${avT('puz_err', lang)}</div>
                                <div style="margin-top:0.55rem;"><button type="button" class="vinter-secondary-btn" id="vpz-reset">${avT('btn_reset', lang)}</button></div>
                            `;
                            fbEl.querySelector('#vpz-reset').onclick = () => {
                                pzSlots = [null, null, null, null];
                                fbEl.innerHTML = '';
                                updatePuzzleUI();
                            };
                        }
                    }
                };
                bankEl.appendChild(btn);
            });
        }
        updatePuzzleUI();
    }
    renderPuzzle();
    panel5.appendChild(puzzleCard);

    // B. Trin-for-trin sætningsbygger (uden lydknapper)
    const builderCard = document.createElement('div');
    builderCard.className = 'vinter-card';
    const builderRows = [
        { q: '1. Hvem eller hvad? (Subjekt på 1. plads)', color: '#22c55e', opts: ['Jeg', 'Vi', 'Naboen', 'Børnene', 'Cyklisten'] },
        { q: '2. Hvad gør man? (Verbum på 2. plads)', color: '#ef4444', opts: ['ser', 'nyder', 'finder', 'husker', 'oplever'] },
        { q: '3. Hvad? (Objekt / Rest på 3. plads)', color: '#f97316', opts: ['den hvide sne', 'de tændte stearinlys', 'den glatte is', 'den store snemand', 'den hyggelige stemning'] },
        { q: '4. Hvor? (Sted på 4. plads til sidst)', color: '#38bdf8', opts: ['på fortovet', 'ude i parken', 'inde i stuen', 'på cykelstien', 'ved den frosne sø'] }
    ];
    const bSelections = ['Vi', 'nyder', 'de tændte stearinlys', 'inde i stuen'];

    function renderStepBuilder() {
        builderCard.innerHTML = `
            <span class="vinter-pill-tag" style="background:rgba(34,197,94,0.16); color:#4ade80; border:1px solid #22c55e; margin-bottom:0.6rem;"${rtlAttr}>B. ${avT('builder_title', lang)}</span>
            <p style="margin:0.2rem 0 0.85rem; color:#cbd5e1; font-size:0.9rem;"${rtlAttr}>${avT('builder_instr', lang)}</p>
            <div id="vb-rows"></div>
            <div style="margin-top:1rem; padding:1rem 1.2rem; border-radius:14px; background:rgba(7,13,25,0.88); border:1.5px solid rgba(56,189,248,0.45); font-size:1.15rem; font-weight:800; line-height:1.6;">
                <span style="color:#4ade80;">${bSelections[0]}</span>
                <span style="color:#f87171;">${bSelections[1]}</span>
                <span style="color:#fb923c;">${bSelections[2]}</span>
                <span style="color:#7dd3fc;">${bSelections[3]}</span>.
            </div>
        `;
        const rowsEl = builderCard.querySelector('#vb-rows');
        builderRows.forEach((row, rIdx) => {
            const rDiv = document.createElement('div');
            rDiv.style.cssText = `margin-bottom:0.8rem; padding-left:0.75rem; border-left:3px solid ${row.color};`;
            rDiv.innerHTML = `<div style="font-size:0.86rem; font-weight:800; color:${row.color}; margin-bottom:0.35rem;">${row.q}</div>`;
            const pool = document.createElement('div');
            pool.className = 'vinter-chips-pool';
            pool.style.margin = '0';
            row.opts.forEach(opt => {
                const c = document.createElement('button');
                c.type = 'button';
                c.className = `vinter-chip ${bSelections[rIdx] === opt ? 'selected' : ''}`;
                c.textContent = opt;
                c.onclick = () => {
                    bSelections[rIdx] = opt;
                    renderStepBuilder();
                };
                pool.appendChild(c);
            });
            rDiv.appendChild(pool);
            rowsEl.appendChild(rDiv);
        });
    }
    renderStepBuilder();
    panel5.appendChild(builderCard);
    panelsHolder.appendChild(panel5);

    // =========================================================================
    // TAB 6: HVERDAGSDIALOGER I RIGTIG RÆKKEFØLGE (UDEN LYD)
    // =========================================================================
    const panel6 = makePanel('tab_dialog');
    const dlgCard = document.createElement('div');
    dlgCard.className = 'vinter-card';
    let dlgIdx = 0;
    let scrambledLines = shuffleArray(VINTER_DIALOGUES[0].lines.map((l, i) => ({ ...l, origIdx: i })));
    let chosenOrder = [];

    function loadDialogue(idx) {
        dlgIdx = idx;
        scrambledLines = shuffleArray(VINTER_DIALOGUES[idx].lines.map((l, i) => ({ ...l, origIdx: i })));
        chosenOrder = [];
        renderDialogue();
    }

    function renderDialogue() {
        const dlg = VINTER_DIALOGUES[dlgIdx];
        const allPicked = chosenOrder.length === dlg.lines.length;
        const isCorrectOrder = allPicked && chosenOrder.every((item, pos) => item.origIdx === pos);

        dlgCard.innerHTML = `
            <div class="vinter-chips-pool" style="margin-top:0;">
                ${VINTER_DIALOGUES.map((d, i) => `
                    <button type="button" class="vinter-chip ${i === dlgIdx ? 'selected' : ''}" data-di="${i}">Dialog ${i + 1}</button>
                `).join('')}
            </div>
            <h3 style="margin:0.35rem 0 0.25rem;">${dlg.title}</h3>
            <p style="margin:0 0 0.9rem; color:#94a3b8; font-size:0.9rem;"${rtlAttr}>${avT(`dlg${dlgIdx + 1}_ctx`, lang)} ${avT('dlg_instr', lang)}</p>
            <div id="dlg-chosen" style="margin-bottom:0.85rem;"></div>
            <div id="dlg-pool"></div>
            <div id="dlg-fb"></div>
        `;

        dlgCard.querySelectorAll('.vinter-chip[data-di]').forEach(b => {
            b.onclick = () => loadDialogue(Number(b.dataset.di));
        });

        const chosenEl = dlgCard.querySelector('#dlg-chosen');
        chosenEl.innerHTML = chosenOrder.length
            ? chosenOrder.map((l, pos) => `
                <div class="vinter-dialog-line selected-order" style="cursor:default;">
                    <strong>${pos + 1}. ${l.speaker}:</strong> "${l.text}"
                </div>
            `).join('')
            : `<div style="color:#64748b; font-size:0.88rem; margin-bottom:0.6rem;"${rtlAttr}>(${avT('dlg_empty', lang)})</div>`;

        const poolEl = dlgCard.querySelector('#dlg-pool');
        scrambledLines.forEach(line => {
            if (chosenOrder.includes(line)) return;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'vinter-dialog-line';
            btn.innerHTML = `<strong>${line.speaker}:</strong> "${line.text}"`;
            btn.onclick = () => {
                chosenOrder.push(line);
                renderDialogue();
            };
            poolEl.appendChild(btn);
        });

        const fbEl = dlgCard.querySelector('#dlg-fb');
        if (allPicked) {
            fbEl.innerHTML = `
                <div class="vinter-msg ${isCorrectOrder ? 'ok' : 'err'}"${rtlAttr}>
                    ${isCorrectOrder ? `✓ ${avT('dlg_ok', lang)}` : avT('dlg_err', lang)}
                </div>
                <div style="margin-top:0.65rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                    <button type="button" class="vinter-secondary-btn" id="dlg-reset">${avT('btn_reset', lang)}</button>
                    ${isCorrectOrder && dlgIdx < VINTER_DIALOGUES.length - 1 ? `<button type="button" class="vinter-primary-btn" id="dlg-next">${avT('btn_next', lang)}</button>` : ''}
                </div>
            `;
            fbEl.querySelector('#dlg-reset').onclick = () => loadDialogue(dlgIdx);
            const nextBtn = fbEl.querySelector('#dlg-next');
            if (nextBtn) nextBtn.onclick = () => loadDialogue(dlgIdx + 1);
        }
    }
    renderDialogue();
    panel6.appendChild(dlgCard);
    panelsHolder.appendChild(panel6);

    // =========================================================================
    // TAB 7: TRYK, STAVELSER (VISUEL) & FRI AI-ØVELSE (KOPIÉR PROMPT)
    // =========================================================================
    const panel7 = makePanel('tab_tryk');
    const stressCard = document.createElement('div');
    stressCard.className = 'vinter-card';
    let stWordIdx = 0;
    let stResult = null;

    function renderStressTrainer() {
        const sw = VINTER_STRESS_WORDS[stWordIdx];
        stressCard.innerHTML = `
            <h3 style="margin:0 0 0.35rem;"${rtlAttr}>🎯 ${avT('stress_title', lang)}</h3>
            <p style="margin:0 0 0.85rem; color:#cbd5e1; font-size:0.9rem;"${rtlAttr}>${avT('stress_instr', lang)}</p>
            <div class="vinter-chips-pool">
                ${VINTER_STRESS_WORDS.map((item, i) => `
                    <button type="button" class="vinter-chip ${i === stWordIdx ? 'selected' : ''}" data-sw="${i}">${item.word}</button>
                `).join('')}
            </div>
            <div style="margin:0.85rem 0 0.45rem; color:#94a3b8; font-size:0.88rem;"${rtlAttr}>${avT('lbl_meaning', lang)} <strong style="color:#f8fafc;">${avT(`str${stWordIdx + 1}_m`, lang)}</strong> • <code>${sw.ipa}</code></div>
            <div class="vinter-chips-pool" id="stress-syllables"></div>
            <div id="stress-fb"></div>
        `;

        stressCard.querySelectorAll('.vinter-chip[data-sw]').forEach(b => {
            b.onclick = () => {
                stWordIdx = Number(b.dataset.sw);
                stResult = null;
                renderStressTrainer();
            };
        });

        const sylWrap = stressCard.querySelector('#stress-syllables');
        const fbWrap = stressCard.querySelector('#stress-fb');
        sw.parts.forEach((part, idx) => {
            const sb = document.createElement('button');
            sb.type = 'button';
            sb.className = `vinter-syllable-btn ${stResult !== null && idx === sw.stressIdx ? 'stressed' : ''}`;
            sb.textContent = part.toLowerCase();
            sb.onclick = () => {
                const ok = idx === sw.stressIdx;
                stResult = ok;
                sylWrap.querySelectorAll('.vinter-syllable-btn').forEach((el, j) => {
                    if (j === sw.stressIdx) el.classList.add('stressed');
                });
                fbWrap.innerHTML = `
                    <div class="vinter-msg ${ok ? 'ok' : 'err'}"${rtlAttr}>
                        <strong>${ok ? avT('fb_correct', lang) : `${avT('stress_wrong_prefix', lang)} "${sw.parts[sw.stressIdx]}".`}</strong> ${avT(`str${stWordIdx + 1}_tip`, lang)}
                    </div>
                `;
            };
            sylWrap.appendChild(sb);
        });
    }
    renderStressTrainer();
    panel7.appendChild(stressCard);

    const aiCard = document.createElement('div');
    aiCard.className = 'vinter-card';
    aiCard.innerHTML = `<h3 style="margin:0 0 0.35rem;">💬 Fri samtale & skriveøvelse om vinteren (med din egen AI)</h3><p style="margin:0; color:#cbd5e1; font-size:0.9rem;">Kopiér instruktionen herunder og øv vinter-samtale på dansk i Google Gemini eller ChatGPT.</p>`;
    aiCard.appendChild(createPromptFlowSection({
        idPrefix: 'vinter-ai',
        guideTitle: 'Sådan træner du vinter-dansk med din gratis AI-lærer',
        stepsHtml: [
            'Klik på <strong>Kopiér AI-instruktion</strong> herunder.',
            'Åbn dit foretrukne gratis AI-værktøj (f.eks. <strong>Google Gemini</strong> eller <strong>ChatGPT</strong>).',
            'Indsæt hele instruktionen i chatten, skriv <strong>"hej"</strong>, vælg støttesprog, og svar på lærerens vinter-spørgsmål!'
        ],
        promptLabel: 'System-prompt: Vinter i Danmark (synlig instruktion)',
        promptText: VINTER_AI_PROMPT
    }));
    panel7.appendChild(aiCard);
    panelsHolder.appendChild(panel7);

    container.appendChild(viewContainer);
}
