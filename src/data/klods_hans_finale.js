/**
 * klods_hans_finale.js
 * Afslutningsaktiviteter til H.C. Andersens "Klods-Hans":
 * 1. Karakterernes indre liv (Kortlægning af personlighed med adjektiver, adverbier & faste udtryk)
 * 2. Speeddating-detektiven (Gæt den hemmelige karakter ud fra 10 faste speeddating-spørgsmål)
 */

const indreLivCharacterMeta = [
    {
        id: 'klods_hans',
        name: 'Klods-Hans',
        role: 'Den yngste søn på geden',
        themeColor: '#22c55e',
        avatarIcon: '🐐',
        quote: '»Halli-hallo! Her kommer jeg! Se hvad jeg fandt i grøften!«'
    },
    {
        id: 'broedrene',
        name: 'De to brødre',
        role: 'De lærde og overforberedte bejlere',
        themeColor: '#38bdf8',
        avatarIcon: '📚',
        quote: '»Vi kan hele ordbogen og byens avis på latin udenad!«'
    },
    {
        id: 'prinsessen',
        name: 'Prinsessen',
        role: 'Kongens datter og den skarpe dommer',
        themeColor: '#ec4899',
        avatarIcon: '👑',
        quote: '»Dur ikke! Væk! Jeg vil have en mand, der kan tale for sig!«'
    },
    {
        id: 'faren',
        name: 'Faren',
        role: 'Den gamle herremand på gården',
        themeColor: '#f59e0b',
        avatarIcon: '👴',
        quote: '»Mine to kloge sønner får de bedste heste. Klods-Hans får ingenting!«'
    },
    {
        id: 'kongen',
        name: 'Kongen',
        role: 'Prinsessens far på slottet',
        themeColor: '#a855f7',
        avatarIcon: '🤴',
        quote: '»Vis hvad I kan! Klods-Hans, du har vundet hendes hjerte!«'
    },
    {
        id: 'skriveren',
        name: 'Skriveren i slottet',
        role: 'Den travle sekretær med kridt og blæk',
        themeColor: '#14b8a6',
        avatarIcon: '🪶',
        quote: '»Vent lidt! Jeg skal jo skrive hvert eneste ord ned på tavlen!«'
    }
];

const basisTraitsByCharacter = {
    klods_hans: [
        {
            id: 'kh_basis_glad',
            word: 'glad',
            adv: 'altid glad',
            type: 'adj',
            hintDa: 'Er i godt humør og smiler på hele turen til slottet.',
            hintEn: 'Always cheerful and in a good mood on his ride to the castle.'
        },
        {
            id: 'kh_basis_ikke_bange',
            word: 'slet ikke bange',
            adv: 'slet ikke bange',
            type: 'adj',
            hintDa: 'Tør ride lige ind i salen på sin ged og svare med det samme.',
            hintEn: 'Not afraid at all; rides straight into the hall on his goat.'
        },
        {
            id: 'kh_basis_rammer_plet',
            word: 'rammer plet',
            adv: 'rammer altid plet',
            type: 'idiom',
            hintDa: 'Siger præcis det rigtige svar på det rigtige tidspunkt (eventyrets talemåde).',
            hintEn: 'Hits the bullseye every time with the right answer (story idiom).'
        },
        {
            id: 'kh_basis_skyder_papegoejen',
            word: 'skyder papegøjen',
            adv: 'skyder papegøjen til sidst',
            type: 'idiom',
            hintDa: 'Har heldet med sig og vinder prinsessen til sidst (eventyrets talemåde).',
            hintEn: 'Hits the jackpot and wins the princess in the end (story idiom).'
        }
    ],
    broedrene: [
        {
            id: 'br_basis_kloge',
            word: 'kloge',
            adv: 'meget kloge',
            type: 'adj',
            hintDa: 'Har læst mange bøger og kan hele byens avis og ordbogen udenad.',
            hintEn: 'Very book-smart; they memorized dictionaries and the town newspaper.'
        },
        {
            id: 'br_basis_stolte',
            word: 'stolte',
            adv: 'alt for stolte',
            type: 'adj',
            hintDa: 'Føler sig finere og vigtigere end deres yngste bror.',
            hintEn: 'Far too proud; they feel superior to their youngest brother.'
        },
        {
            id: 'br_basis_komplicerede',
            word: 'komplicerede',
            adv: 'alt for komplicerede',
            type: 'adj',
            hintDa: 'Bruger svære og fine ord i stedet for at tale simpelt og naturligt.',
            hintEn: 'Way too complicated; they rely on stiff, difficult words.'
        },
        {
            id: 'br_basis_baglaas',
            word: 'går i baglås',
            adv: 'går helt i baglås',
            type: 'idiom',
            hintDa: 'Glemmer alle deres ord og kan slet ikke få sagt noget (eventyrets talemåde).',
            hintEn: 'Freeze up completely and forget every word they prepared (story idiom).'
        }
    ],
    prinsessen: [
        {
            id: 'pr_basis_utilfreds',
            word: 'utilfreds',
            adv: 'ofte utilfreds',
            type: 'adj',
            hintDa: 'Siger »Dur ikke!« til alle dem, der bare snakker løs uden mening.',
            hintEn: 'Often dissatisfied; she rejects anyone who just recites empty lines.'
        },
        {
            id: 'pr_basis_hurtig',
            word: 'hurtig',
            adv: 'virkelig hurtig',
            type: 'adj',
            hintDa: 'Tænker hurtigt og giver skarpe svar tilbage med det samme.',
            hintEn: 'Really quick-witted; she responds sharply right away.'
        },
        {
            id: 'pr_basis_tomme_ord',
            word: 'træt af tomme ord',
            adv: 'helt træt af tomme ord',
            type: 'idiom',
            hintDa: 'Vil ikke høre flere udenadlærte taler uden ægte følelser.',
            hintEn: 'Completely fed up with empty words learned by heart.'
        },
        {
            id: 'pr_basis_bestemmer_selv',
            word: 'bestemmer selv',
            adv: 'helt sikker og bestemmer selv',
            type: 'phrase',
            hintDa: 'Vælger selv den mand, hun bedst kan lide, uden at lytte til andre.',
            hintEn: 'Decides for herself whom she likes best without pressure from others.'
        }
    ],
    faren: [
        {
            id: 'fa_basis_gammel',
            word: 'gammel',
            adv: 'meget gammel',
            type: 'adj',
            hintDa: 'Den gamle herremand på gården, som holder fast i gamle regler.',
            hintEn: 'The old squire on the estate who sticks to old traditions.'
        },
        {
            id: 'fa_basis_uvenlig',
            word: 'uvenlig mod Klods-Hans',
            adv: 'ret uvenlig mod Klods-Hans',
            type: 'adj',
            hintDa: 'Giver de ældste brødre fine heste, men giver ingenting til Klods-Hans.',
            hintEn: 'Rather unfriendly to Clumsy Hans; gives horses only to his older sons.'
        },
        {
            id: 'fa_basis_usikker',
            word: 'usikker på Klods-Hans',
            adv: 'helt usikker på ham',
            type: 'adj',
            hintDa: 'Tror slet ikke, at hans yngste søn kan klare sig hos prinsessen.',
            hintEn: 'Completely doubtful about Clumsy Hans and does not believe in him.'
        },
        {
            id: 'fa_basis_sur',
            word: 'sur',
            adv: 'ret sur',
            type: 'adj',
            hintDa: 'Bliver irriteret, når Klods-Hans også vil ride af sted på sin ged.',
            hintEn: 'Quite grumpy when Clumsy Hans insists on riding off on his goat.'
        }
    ],
    kongen: [
        {
            id: 'ko_basis_venlig',
            word: 'venlig',
            adv: 'virkelig venlig',
            type: 'adj',
            hintDa: 'Tager pænt imod alle i salen og ønsker, at datteren finder en god mand.',
            hintEn: 'Warm and welcoming to everyone in the hall, wishing his daughter happiness.'
        },
        {
            id: 'ko_basis_rolig',
            word: 'rolig',
            adv: 'helt rolig',
            type: 'adj',
            hintDa: 'Lader prinsessen teste bejlerne i fred og giver alle chancen: »Vis hvad I kan!«',
            hintEn: 'Calmly lets the princess test every suitor fairly.'
        },
        {
            id: 'ko_basis_retfaerdig',
            word: 'retfærdig',
            adv: 'helt retfærdig',
            type: 'adj',
            hintDa: 'Respekterer datterens valg og lader den bedste vinde — også på en ged.',
            hintEn: 'Fair-minded; respects his daughter’s choice regardless of status.'
        },
        {
            id: 'ko_basis_imponeret',
            word: 'imponeret til sidst',
            adv: 'meget imponeret til sidst',
            type: 'phrase',
            hintDa: 'Glæder sig over Klods-Hans og siger, at han har vundet prinsessens hjerte.',
            hintEn: 'Genuinely impressed in the end when Clumsy Hans wins her heart.'
        }
    ],
    skriveren: [
        {
            id: 'sk_basis_travlt',
            word: 'har alt for travlt',
            adv: 'har altid alt for travlt',
            type: 'phrase',
            hintDa: 'Skal skrive hvert eneste ord ned i en kæmpe fart ved sin pult.',
            hintEn: 'Always way too busy trying to write down every single word spoken.'
        },
        {
            id: 'sk_basis_nervoes',
            word: 'nervøs',
            adv: 'lidt nervøs',
            type: 'adj',
            hintDa: 'Er bange for at skrive forkert eller misse et ord fra prinsessen.',
            hintEn: 'Nervous about making a mistake or missing a word from the princess.'
        },
        {
            id: 'sk_basis_traet_haand',
            word: 'træt i hånden',
            adv: 'helt træt i hånden',
            type: 'adj',
            hintDa: 'Skriver »Dur ikke! Væk!« så mange gange, at fingrene gør ondt.',
            hintEn: 'Hand completely worn out from writing down rejections all day.'
        },
        {
            id: 'sk_basis_skriver_ned',
            word: 'skriver alt ned',
            adv: 'skriver alt helt nøjagtigt ned',
            type: 'phrase',
            hintDa: 'Noterer hvert eneste ord ordret på tavlen eller papiret med blæk.',
            hintEn: 'Writes everything down verbatim in ink or chalk.'
        }
    ]
};

const udvidetTraitsByCharacter = {
    klods_hans: [
        {
            id: 'kh_ubekymret',
            word: 'ubekymret',
            adv: 'helt ubekymret',
            type: 'adj',
            hintDa: 'Tager tingene let og bekymrer sig ikke om problemer eller hvad andre tænker.',
            hintEn: 'Carefree, untroubled by worries or expectations.'
        },
        {
            id: 'kh_selvsikker',
            word: 'selvsikker',
            adv: 'fuldstændig selvsikker',
            type: 'adj',
            hintDa: 'Tror fuldt og fast på sig selv, selvom han ikke har en fin hest.',
            hintEn: 'Confident, believing in oneself.'
        },
        {
            id: 'kh_spontan',
            word: 'spontan',
            adv: 'herligt spontan',
            type: 'adj',
            hintDa: 'Handler på et øjeblik ud fra situationen frem for at læse udenad.',
            hintEn: 'Spontaneous, acting on impulse and in the moment.'
        },
        {
            id: 'kh_spilopper',
            word: 'fuld af spilopper',
            adv: 'altid fuld af spilopper',
            type: 'idiom',
            hintDa: 'Laver skarnsstreger, sjov og ballade med et glimt i øjet.',
            hintEn: 'Full of playful mischief and fun.'
        }
    ],
    broedrene: [
        {
            id: 'br_arrogante',
            word: 'arrogante',
            adv: 'ekstremt arrogante',
            type: 'adj',
            hintDa: 'Ser ned på Klods-Hans og tror, de er klogere end alle andre.',
            hintEn: 'Arrogant, feeling superior to others.'
        },
        {
            id: 'br_laerde',
            word: 'lærde',
            adv: 'ualmindeligt lærde',
            type: 'adj',
            hintDa: 'Har læst mange bøger, kan latin og byens love udenad.',
            hintEn: 'Scholarly, learned and book-smart.'
        },
        {
            id: 'br_overformelle',
            word: 'overformelle',
            adv: 'pinligt overformelle',
            type: 'adj',
            hintDa: 'Alt for stive, korrekte og højtidelige i deres sprog og optræden.',
            hintEn: 'Overly formal, stiff and lacking natural charm.'
        },
        {
            id: 'br_stive',
            word: 'stive som brædder',
            adv: 'fuldstændig stive som brædder',
            type: 'idiom',
            hintDa: 'Helt ufleksible; kan ikke improvisere, når tingene ændrer sig.',
            hintEn: 'Stiff as wooden boards, completely inflexible.'
        }
    ],
    prinsessen: [
        {
            id: 'pr_keder_sig',
            word: 'keder sig bravt',
            adv: 'keder sig bravt',
            type: 'idiom',
            hintDa: 'Keder sig voldsomt over de mange kedelige bejlere, der siger det samme.',
            hintEn: 'Bored to tears, thoroughly unimpressed.'
        },
        {
            id: 'pr_aegthed',
            word: 'søger ægthed og modspil',
            adv: 'oprigtigt søgende efter ægthed',
            type: 'phrase',
            hintDa: 'Leder efter en ærlig person, der tør svare hende igen og ikke bare smigrer.',
            hintEn: 'Seeking authenticity and someone who dares to challenge her.'
        },
        {
            id: 'pr_traet_papegoejer',
            word: 'træt af papegøjer',
            adv: 'dødeligt træt af papegøjer',
            type: 'idiom',
            hintDa: 'Har fået nok af folk, der bare gentager hvad andre har lært dem udenad.',
            hintEn: 'Sick and tired of copycats and people who just mimic others.'
        },
        {
            id: 'pr_skarp',
            word: 'skarp i mælet',
            adv: 'frygtindgydende skarp',
            type: 'adj',
            hintDa: 'Hurtig og kontant med kvikke, ironiske svar, der tester modparten.',
            hintEn: 'Sharp-tongued, biting and quick-witted.'
        }
    ],
    faren: [
        {
            id: 'fa_gammeldags',
            word: 'gammeldags',
            adv: 'håbløst gammeldags',
            type: 'adj',
            hintDa: 'Holder stædigt fast i gamle traditioner og rangordener.',
            hintEn: 'Old-fashioned, deeply traditional.'
        },
        {
            id: 'fa_partisk',
            word: 'partisk',
            adv: 'åbenlyst partisk',
            type: 'adj',
            hintDa: 'Forskelsbehandler sine sønner og holder kun med de to ældste.',
            hintEn: 'Biased, partial and unfair.'
        },
        {
            id: 'fa_skeptisk',
            word: 'skeptisk over for Klods-Hans',
            adv: 'stærkt skeptisk',
            type: 'phrase',
            hintDa: 'Tror overhovedet ikke på den yngste søns evner og giver ham ingen hest.',
            hintEn: 'Deeply skeptical of Clumsy Hans.'
        },
        {
            id: 'fa_autoritaer',
            word: 'autoritær',
            adv: 'ganske autoritær',
            type: 'adj',
            hintDa: 'Bestemmer alt på gården og forventer blind respekt fra sine sønner.',
            hintEn: 'Authoritarian, strict in wielding family authority.'
        }
    ],
    kongen: [
        {
            id: 'ko_storsindet',
            word: 'storsindet',
            adv: 'bemærkelsesværdigt storsindet',
            type: 'adj',
            hintDa: 'Giver også den ukendte søn på geden en fair mulighed ved hoffet.',
            hintEn: 'Generous and magnanimous, giving everyone a fair chance at court.'
        },
        {
            id: 'ko_diplomatisk',
            word: 'diplomatisk',
            adv: 'kløgtigt diplomatisk',
            type: 'adj',
            hintDa: 'Holder ro og balance i riddersalen og lader datteren træffe den endelige afgørelse.',
            hintEn: 'Diplomatic, keeping balance in court while honoring his daughter’s verdict.'
        },
        {
            id: 'ko_aaben',
            word: 'åben for det uventede',
            adv: 'overraskende åben',
            type: 'phrase',
            hintDa: 'Accepterer uden tøven, at vinderen kommer på en ged i stedet for en fin hest.',
            hintEn: 'Open-minded toward the unexpected winner arriving on a goat.'
        },
        {
            id: 'ko_respekt',
            word: 'respekterer datterens vilje',
            adv: 'respekterer fuldt ud datterens vilje',
            type: 'phrase',
            hintDa: 'Anerkender øjeblikkeligt prinsessens valg og lykønsker Klods-Hans.',
            hintEn: 'Fully respects the princess’s independent decision.'
        }
    ],
    skriveren: [
        {
            id: 'sk_omhyggelig',
            word: 'omhyggelig',
            adv: 'næsten overdrevent omhyggelig',
            type: 'adj',
            hintDa: 'Går op i at hvert eneste ord fra tronen bliver skrevet ordret ned.',
            hintEn: 'Meticulous, insisting on recording every single word verbatim.'
        },
        {
            id: 'sk_forjaget',
            word: 'forjaget',
            adv: 'konstant forjaget',
            type: 'adj',
            hintDa: 'Sveder over blækhuset og kæmper for at følge med talestrømmen.',
            hintEn: 'Flustered and rushed, struggling to keep up with the pace.'
        },
        {
            id: 'sk_iagttager',
            word: 'tavshedens iagttager',
            adv: 'salens stille iagttager',
            type: 'phrase',
            hintDa: 'Blander sig aldrig i samtalen, men hører og dokumenterer alt fra sidelinjen.',
            hintEn: 'The silent observer in the hall who records everything from the sidelines.'
        },
        {
            id: 'sk_akkord',
            word: 'skriver på akkord',
            adv: 'skriver nærmest på akkord',
            type: 'idiom',
            hintDa: 'Pennen flyver hen over papiret hele dagen uden pause.',
            hintEn: 'Writes furiously nonstop as if paid by the line.'
        }
    ]
};

function buildIndreLivCharacters(traitsByCharacter) {
    return indreLivCharacterMeta.map(meta => ({
        ...meta,
        traits: traitsByCharacter[meta.id] || []
    }));
}

const basisCharacters = buildIndreLivCharacters(basisTraitsByCharacter);
const udvidetCharacters = buildIndreLivCharacters(udvidetTraitsByCharacter);

export const klodsHansIndreLivData = {
    characters: basisCharacters,
    levels: {
        basis: basisCharacters,
        udvidet: udvidetCharacters
    }
};

const udvidetSpeeddatingQuestions = [
    {
        id: 'q1',
        icon: '💬',
        category: 'Fritid & interesser',
        text: 'Hvad laver du i din fritid?'
    },
    {
        id: 'q2',
        icon: '🎒',
        category: 'Genstande & lommer',
        text: 'Hvad har du medbragt i lommen i dag?'
    },
    {
        id: 'q3',
        icon: '❤️',
        category: 'Kærlighed & relationer',
        text: 'Hvad kigger du efter hos en partner?'
    },
    {
        id: 'q4',
        icon: '🔥',
        category: 'Reaktion på hede & pres',
        text: 'Hvad gør du, hvis det bliver alt for varmt i lokalet?'
    },
    {
        id: 'q5',
        icon: '🌟',
        category: 'Selvopfattelse',
        text: 'Hvordan ville dine venner beskrive dig?'
    },
    {
        id: 'q6',
        icon: '🐎',
        category: 'Transport & stil',
        text: 'Hvilket transportmiddel foretrækker du?'
    },
    {
        id: 'q7',
        icon: '📜',
        category: 'Regler & pli',
        text: 'Hvad er din holdning til regler og etikette?'
    },
    {
        id: 'q8',
        icon: '🍽️',
        category: 'Middag & smag',
        text: 'Hvad ville du servere på vores første date?'
    },
    {
        id: 'q9',
        icon: '😱',
        category: 'Frygt & sårbarhed',
        text: 'Hvad er din allerstørste frygt?'
    },
    {
        id: 'q10',
        icon: '🎭',
        category: 'Latterliggørelse',
        text: 'Hvad gør du, når folk griner ad dig på gaden?'
    }
];

const basisSpeeddatingQuestions = [
    {
        id: 'q1',
        icon: '💬',
        category: 'Fritid',
        text: 'Hvad laver du i din fritid?'
    },
    {
        id: 'q2',
        icon: '🎒',
        category: 'I lommen',
        text: 'Hvad har du med i lommen i dag?'
    },
    {
        id: 'q3',
        icon: '❤️',
        category: 'Kæreste',
        text: 'Hvad kigger du efter hos en kæreste?'
    },
    {
        id: 'q4',
        icon: '🔥',
        category: 'Varme & pres',
        text: 'Hvad gør du, hvis det bliver alt for varmt herinde?'
    },
    {
        id: 'q5',
        icon: '🌟',
        category: 'Personlighed',
        text: 'Hvordan beskriver dine venner dig?'
    },
    {
        id: 'q6',
        icon: '🐎',
        category: 'På vej hertil',
        text: 'Hvordan kommer du helst frem?'
    },
    {
        id: 'q7',
        icon: '📜',
        category: 'Regler',
        text: 'Hvad synes du om faste regler og fine ord?'
    },
    {
        id: 'q8',
        icon: '🍽️',
        category: 'Middag',
        text: 'Hvad ville du lave til vores første middag?'
    },
    {
        id: 'q9',
        icon: '😱',
        category: 'Bange for',
        text: 'Hvad er du mest bange for?'
    },
    {
        id: 'q10',
        icon: '🎭',
        category: 'Når folk griner',
        text: 'Hvad gør du, hvis folk griner ad dig?'
    }
];

const speeddatingCharacterMeta = [
    {
        id: 'klods_hans',
        name: 'Klods-Hans',
        title: 'Den yngste søn på geden',
        themeColor: '#22c55e',
        avatarIcon: '🐐'
    },
    {
        id: 'storebror',
        name: 'De to brødre',
        title: 'De lærde og overforberedte bejlere',
        themeColor: '#38bdf8',
        avatarIcon: '📚'
    },
    {
        id: 'prinsessen',
        name: 'Prinsessen',
        role: 'Kongens datter',
        title: 'Den kritiske kongedatter på tronen',
        themeColor: '#ec4899',
        avatarIcon: '👑'
    },
    {
        id: 'faren',
        name: 'Faren',
        role: 'Herremanden',
        title: 'Den gamle herremand på gården',
        themeColor: '#f59e0b',
        avatarIcon: '👴'
    },
    {
        id: 'kongen',
        name: 'Kongen',
        role: 'Kongen',
        title: 'Prinsessens far på slottet',
        themeColor: '#a855f7',
        avatarIcon: '🤴'
    },
    {
        id: 'skriveren',
        name: 'Skriveren i slottet',
        role: 'Skriveren',
        title: 'Den travle skriver ved pulten',
        themeColor: '#14b8a6',
        avatarIcon: '🪶'
    }
];

const basisSpeeddatingContent = {
    klods_hans: {
        revealQuote: '»Halli-hallo! Det er mig! Tag du bare geden – jeg kan både ride og stege en krage!«',
        answers: {
            q1: 'Jeg rider ud i skoven på min ged og leder efter sjove ting på vejen!',
            q2: 'En død krage, en gammel træsko og noget mudder – en blind høne kan også finde et korn!',
            q3: 'En glad og sød pige, der kan lide at grine – så rammer vi plet med det samme!',
            q4: 'Det er bare dejligt! Så steger vi straks en krage i ovnen og får varm mad!',
            q5: 'De siger, at jeg altid er glad, helt rolig og slet ikke bange for noget!',
            q6: 'På min stærke ged! Den koster ingenting og kan gå alle steder.',
            q7: 'Regler er alt for komplicerede! Jeg taler bare frit og håber, at jeg skyder papegøjen.',
            q8: 'Varm krage lavet i en gammel træsko med lidt mudder som sovs – det smager godt!',
            q9: 'At min ged bliver træt, eller at jeg ikke finder flere sjove ting i grøften!',
            q10: 'Jeg smiler bare, vinker med min træsko og rider glad videre!'
        }
    },
    storebror: {
        revealQuote: '»Hvor er her varmt! Jeg går helt i baglås... hvad var det nu, jeg skulle sige?!«',
        answers: {
            q1: 'Jeg læser store, tykke bøger og lærer hele byens avis udenad.',
            q2: 'En fin notesbog og lange lister med svære ord, som jeg skal huske.',
            q3: 'En fin og klog kvinde, som forstår svære bøger og altid taler helt rigtigt.',
            q4: 'Hvor er her varmt! Jeg bliver meget nervøs og går helt i baglås... jeg glemmer alle mine ord!',
            q5: 'De siger, at vi er meget kloge, men også alt for stolte og lidt for komplicerede.',
            q6: 'På en stor, hvid hest med en meget dyr sadel!',
            q7: 'Faste regler og fine ord er meget vigtige! Man må aldrig tale simpelt som Klods-Hans.',
            q8: 'En lang, fin middag med seks retter, mens jeg læser højt fra mine svære bøger.',
            q9: 'At sige et forkert ord eller kaste håndklædet i ringen foran prinsessen!',
            q10: 'Det er meget uvenligt! Jeg kigger væk og viser, at jeg er klogere end dem.'
        }
    },
    prinsessen: {
        revealQuote: '»Dur ikke! Væk! ... Hov, du gættede mig! Du har mod og øjne i hovedet!«',
        answers: {
            q1: 'Jeg sidder på slottet og bliver meget træt af alle de kedelige mænd, der besøger mig.',
            q2: 'Ingenting i lommen – men jeg har mine skrivere, som skriver hvert eneste ord ned.',
            q3: 'En sjov og ærlig mand! Jeg er helt træt af tomme ord, der bare er lært udenad.',
            q4: 'Jeg skruer bare endnu mere op for varmen og ser, hvem der bliver alt for nervøs!',
            q5: 'Ofte utilfreds med kedelige svar, men virkelig hurtig og helt sikker på, hvad jeg vil!',
            q6: 'I en kongelig vogn – men en sjov tur på en ged lyder faktisk meget bedre!',
            q7: 'Jeg bestemmer selv! Fine regler dur ikke, hvis man ikke har noget sjovt at sige.',
            q8: 'Stegt kylling – men kun hvis vi har en sjov og levende samtale ved bordet.',
            q9: 'At blive gift med en alt for kedelig mand, der bare siger »ja« til alting.',
            q10: 'Ingen tør grine ad mig – jeg er jo den, der siger: »Dur ikke! Væk!«'
        }
    },
    faren: {
        revealQuote: '»Du kan jo ikke tale pænt! Du får ingen hest af mig, Klods-Hans!«',
        answers: {
            q1: 'Jeg passer min gård og hjælper mine to kloge sønner. Klods-Hans får ingenting!',
            q2: 'En tung pung med penge og nøglerne til mine bedste heste.',
            q3: 'En god og klog pige fra en rig familie til mine to ældste sønner.',
            q4: 'Jeg åbner vinduet og bliver ret sur, hvis folk ikke opfører sig pænt.',
            q5: 'En gammel mand med faste regler – stolt af de ældste sønner, men uvenlig mod Klods-Hans.',
            q6: 'I en stor, tung vogn trukket af to stærke heste.',
            q7: 'Uden gamle regler og respekt for faren går alting helt galt på gården!',
            q8: 'Et stort stykke kød med kartofler og øl ved mit gamle træbord.',
            q9: 'Jeg er helt usikker på Klods-Hans – tænk hvis han gør hele familien til grin!',
            q10: 'Jeg bliver ret sur og sender alle ballademagere tilbage på arbejde med det samme!'
        }
    },
    kongen: {
        revealQuote: '»Vis hvad I kan! Det ser ud til, at min datter har valgt – tillykke, Klods-Hans!«',
        answers: {
            q1: 'Jeg styrer mit land og leder efter en god mand til min datter.',
            q2: 'En lille guld-krone i lommen og nøglen til slottets store sal.',
            q3: 'Jeg leder ikke selv – jeg vil bare have en mand, som kan gøre min datter glad!',
            q4: 'Jeg sidder roligt på min stol og ser, hvem der kan klare varmen!',
            q5: 'De siger, at jeg er venlig, helt rolig og helt retfærdig over for alle gæster.',
            q6: 'I en stor guldvogn gennem byen, når hele folket vinker til mig.',
            q7: 'Gode regler er fine, men det vigtigste er, at man kan tale godt og ærligt for sig.',
            q8: 'En kæmpe festmiddag i slottets sal for hele familien!',
            q9: 'At min datter bliver ulykkelig eller ender med en alt for kedelig mand!',
            q10: 'Ingen griner ad mig, men jeg elsker et godt grin, når nogen siger noget sjovt!'
        }
    },
    skriveren: {
        revealQuote: '»Vent lidt! Tal ikke så hurtigt! Jeg skal skrive hvert eneste ord ned på min tavle!«',
        answers: {
            q1: 'Jeg sidder ved mit bord og skriver hundredvis af ord ned fra morgen til aften!',
            q2: 'Tre blyanter, lidt kridt, sort blæk på fingrene og meget papir.',
            q3: 'En rolig person, der taler langsomt og tydeligt, så jeg kan nå at skrive det hele ned!',
            q4: 'Jeg sveder så meget, at mit blæk løber ud over hele papiret! Hånden ryster!',
            q5: 'De siger, at jeg altid har alt for travlt, er lidt nervøs og ofte træt i hånden.',
            q6: 'Jeg går hurtigt rundt på slottet med ti store bøger under armen!',
            q7: 'Jeg skal skrive hvert eneste ord helt rigtigt ned – ellers bliver prinsessen sur!',
            q8: 'Noget meget hurtigt, måske et stykke brød, mens jeg stadig skriver noter med den anden hånd!',
            q9: 'At min pen knækker, eller at jeg ikke kan nå at skrive, hvad prinsessen siger!',
            q10: 'Jeg kigger hurtigt ned i mit papir og skriver bare videre: »Dur ikke! Væk!«'
        }
    }
};

const udvidetSpeeddatingContent = {
    klods_hans: {
        revealQuote: '»Halli-hallo! Det er mig! Tag du bare geden, for jeg kan både ride og stege krager!«',
        answers: {
            q1: 'Jeg rider ud i grøftekanten og leder efter skatte, som andre folk bare går forbi!',
            q2: 'En lille lækkerbisken med vinger, en gammel ting til fødderne og noget dejlig pludder fra grøften!',
            q3: 'En glad pige med mod på livet, der kan lide stegt krage og ikke er bange for lidt mudder på gulvtæppet.',
            q4: 'Det er da herligt! Så smider vi straks en krage ind i ovnen og steger en lækker frokost!',
            q5: 'De siger, jeg er fuld af spilopper, modig, spontan og fuldstændig umulig at slå ud af kurs!',
            q6: 'En stærk, trofast gedebuk! Den behøver ingen dyr sadel, og den kan styre lige ned i grøften uden at vælte.',
            q7: 'Regler? Livet er alt for kort til stive bukser og fine ord. Man skal tale frit fra leveren!',
            q8: 'Friskstegt krage tilberedt direkte i en gammel træsko, toppet med den fineste grøfte-pludder som sovs!',
            q9: 'At geden skulle miste appetitten, eller at grøfterne løber tør for sjove fund!',
            q10: 'Jeg griner bare endnu højere igen, vinker med min træsko og rider videre i fuld galop!'
        }
    },
    storebror: {
        revealQuote: '»Hvor her er en frygtelig varme...! Min tunge klistrer til ganen... hvad var det nu teksten var?!«',
        answers: {
            q1: 'Jeg studerer det latinske leksikon og memorerer byens love fra de sidste tre år.',
            q2: 'En fin notesbog, en kridtpind og et håndskrevet manuskript med de mest lærde taler.',
            q3: 'En kvinde af fornem herkomst, der kan værdsætte højere videnskab, dannelse og korrekt grammatik.',
            q4: 'Jeg... jeg mister helt mælet! Min tunge klistrer til ganen... Hvor her er en frygtelig varme!',
            q5: 'De betragter mig som ualmindelig lærd, overordentlig dannet og altid pinligt korrekt.',
            q6: 'En kridhvid, kongelig ridehest med sadel af det fineste spanske læder.',
            q7: 'Regler, etikette og klassisk dannelse er samfundets urokkelige fundament.',
            q8: 'En seks-retters klassisk middag med fransk vin, mens jeg reciterer romerske taler for dig.',
            q9: 'At begå en grammatisk brøler foran et dannet publikum eller glemme min tale i et afgørende øjeblik.',
            q10: 'Det er højst utilstedeligt og udannet. Jeg ignorerer dem med kølig, akademisk værdighed.'
        }
    },
    prinsessen: {
        revealQuote: '»Dur ikke! Væk! ... Men hov, du gættede mig! Du har i det mindste mod og øjne i hovedet!«',
        answers: {
            q1: 'Jeg sidder på tronen og prøver ihærdigt at lade være med at falde i søvn over kedelige bejlere.',
            q2: 'En skarp tunge og en hel sal fuld af skrivere, der noterer hvert eneste ord på tavlen.',
            q3: 'En mand, der ikke bare gentager hvad han har lært udenad, men som kan svare for sig med ægthed og modspil!',
            q4: 'Jeg skruer bare endnu mere op for kakkelovnen og ser, om bejleren smelter af nervøsitet!',
            q5: 'Kritisk, selvstændig, svær at imponere – og dødeligt træt af papegøjer!',
            q6: 'En kongelig guldkaret – men hvis nogen tilbød mig en vild tur på en ged, ville jeg sige ja på stedet!',
            q7: 'Jeg afskyr stiv etikette, hvis det bare dækker over, at man ikke har noget klogt eller sjovt at sige.',
            q8: 'Hanekyllinger stegt ved åben ild – men kun hvis min date formår at føre en interessant samtale undervejs.',
            q9: 'At ende sammen med en tør kedsommelighed af en mand, der bare bukker og siger: »Ja, Deres Højhed«.',
            q10: 'Ingen vover at grine ad mig – medmindre jeg selv inviterer til morskaben!'
        }
    },
    faren: {
        revealQuote: '»Du kan jo hverken ride eller tale! Du får ingen hest af mig, Klods-Hans!«',
        answers: {
            q1: 'Jeg passer mit gods, inspicerer markerne og sørger for, at mine kloge sønner får de bedste vilkår.',
            q2: 'En god pung rigsdaler og ejerbeviserne på godsets fineste heste.',
            q3: 'En fornuftig svigerdatter fra en agtet familie, som kan føre herregårdens gode navn videre.',
            q4: 'Jeg åbner vinduet, rømmer mig højlydt og forlanger, at folk opfører sig med værdighed.',
            q5: 'Gammeldags, principfast, en smule streng – men altid på de kloge sønners side.',
            q6: 'En solid firehjulet herskabsvogn trukket af velnærede jyske heste.',
            q7: 'Uden orden, hierarki og respekt for slægtens ældste går hele samfundet i opløsning.',
            q8: 'En kraftig oksesteg med kartofler og gammel øl ved det store egetræsbord.',
            q9: 'At min familie bliver gjort til grin foran hele kongeriget af en uduelig søn på en ged!',
            q10: 'Jeg ryster på hovedet, råber af karlene og sender ballademagerne tilbage i kostalden.'
        }
    },
    kongen: {
        revealQuote: '»Vis hvad I kan! ... Det ser ud til, at prinsessen har valgt. Klods-Hans, du har vundet hendes hjerte!«',
        answers: {
            q1: 'Jeg regerer riget og har sendt bud efter landets dygtigste bejlere til min datters hånd.',
            q2: 'Et kongeligt segl og lovteksten om, at den, der taler bedst, vinder prinsessen.',
            q3: 'Jeg søger ikke en mage til mig selv, men en svigersøn med mod, vid og varme til min datter.',
            q4: 'Jeg betragter prøven med ophøjet ro og lader datteren bedømme, hvem der holder hovedet koldt.',
            q5: 'Storsindet, diplomatisk, retfærdig – og altid åben for en overraskende vinder.',
            q6: 'En kongelig guldvogn med livgarde foran og bagved.',
            q7: 'Traditioner skaber rammerne, men et ægte hjerte og skarpt vid vejer tungere end stive titler.',
            q8: 'Et overdådigt taffel med vildt, frugter og musik i den store riddersal.',
            q9: 'At riget går i stå, eller at min datter vælger en bejler uden glød i øjnene.',
            q10: 'En konge lader sig ikke gå på – jeg morer mig gerne, når morskaben er ægte og hjertelig.'
        }
    },
    skriveren: {
        revealQuote: '»Øjeblik! Hold inde! Blækket tørrer jo ikke hurtigt nok, når I taler så stærkt!«',
        answers: {
            q1: 'Jeg fører protokol over samtlige bejleres taler og noterer hvert eneste "Dur ikke!" fra tronen.',
            q2: 'En slidt gåsefjer, et blækhus, en kridttavle og krampe i tommelfingeren.',
            q3: 'Et menneske med ro i stemmen og korte, klare sætninger uden alt for mange fremmedord.',
            q4: 'Sveden drypper ned på protokollen og tværer mine smukke bogstaver helt ud!',
            q5: 'Omhyggelig, forjaget, altid med blæk på ærmet – og en stille iagttager i krogen.',
            q6: 'Til fods gennem slottets korridorer i små, stressede spurt med favnen fuld af protokoller.',
            q7: 'Regler er min hverdag: hvert komma og hvert udråb skal dokumenteres på sekundet!',
            q8: 'En hurtig kop stærk kaffe og en tør bolle ved pulten mellem to bejlere.',
            q9: 'At kridtet knækker midt i en vigtig replik, eller at to bejlere taler i munden på hinanden.',
            q10: 'Jeg dukker nakken bag pulten og lader som om, jeg bare tjekker dagens dato i avisen.'
        }
    }
};

function buildSpeeddatingCharacters(contentByCharacter) {
    return speeddatingCharacterMeta.map(meta => ({
        ...meta,
        revealQuote: contentByCharacter[meta.id].revealQuote,
        answers: contentByCharacter[meta.id].answers
    }));
}

const basisSpeeddatingCharacters = buildSpeeddatingCharacters(basisSpeeddatingContent);
const udvidetSpeeddatingCharacters = buildSpeeddatingCharacters(udvidetSpeeddatingContent);

export const klodsHansSpeeddatingData = {
    questions: basisSpeeddatingQuestions,
    characters: basisSpeeddatingCharacters,
    levels: {
        basis: {
            questions: basisSpeeddatingQuestions,
            characters: basisSpeeddatingCharacters
        },
        udvidet: {
            questions: udvidetSpeeddatingQuestions,
            characters: udvidetSpeeddatingCharacters
        }
    }
};
