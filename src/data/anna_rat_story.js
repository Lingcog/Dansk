export const annaRatStory = {
    startNode: 'node_1',
    endings: [
        { id: 'ending_1', icon: '🏆', title: 'Helten!', titleEn: 'The Hero!', image: 'assets/anna_helten_slutning.jpg' },
        { id: 'ending_2', icon: '🏃‍♀️', title: 'Flugten!', titleEn: 'The Escape!', image: 'assets/anna_flugten_slutning.jpg' },
        { id: 'ending_3', icon: '🙈', title: 'Den pinlige udvej!', titleEn: 'The Awkward Exit!', image: 'assets/anna_pinlig_slutning.jpg' },
        { id: 'ending_4', icon: '🌟', title: 'Tomat-Anna!', titleEn: 'Tomato-Anna!', image: 'assets/anna_tomat_stjerne.jpg' }
    ],
    nodes: {
        'node_1': {
            id: 'node_1',
            title: "Frugtafdelingen",
            titleEn: "The Fruit Section",
            image: "assets/anna_netto_rotte.jpg",
            narrative: "Anna er i Netto.",
            narrativeEn: "Anna is in Netto.",
            tasks: [
                {
                    type: "semantics",
                    instruction: "Udfyld historien",
                    instructionEn: "Complete the story",
                    textSegments: [
                        "",
                        " er i frugtafdelingen. Hun vil købe et æble. Pludselig ser hun en stor ",
                        "......"
                    ],
                    textSegmentsEn: [
                        "",
                        " is in the fruit section. She wants to buy an apple. Suddenly she sees a big ",
                        "......"
                    ],
                    blanks: [
                        { correct: "Hun", options: ["Han", "Hun", "Den"] },
                        { correct: "rotte", options: ["rokke", "rotte", "måtte"] }
                    ]
                },
                {
                    type: "syntax",
                    instruction: "Hvad tænker Anna?",
                    instructionEn: "What is Anna thinking?",
                    words: ["Hvad", "er", "det?"],
                    wordsEn: ["What", "is", "that?"]
                },
                {
                    type: "syntax",
                    instruction: "Hvad tænker Anna videre?",
                    instructionEn: "What does Anna think next?",
                    words: ["Er", "det", "en", "rotte?"],
                    wordsEn: ["Is", "it", "a", "rat?"]
                },
                {
                    type: "phonetics",
                    instruction: "Udtal Annas chokerede tanker højt!",
                    instructionEn: "Say Anna's shocked thoughts aloud!",
                    target: "Hvad er det? Er det en rotte?"
                }
            ],
            choices: [
                { 
                    text: "Anna løber skrigende væk.", 
                    textEn: "Anna runs away screaming.", 
                    icon: "🏃‍♀️",
                    nextNode: "node_2a" 
                },
                { 
                    text: "Anna kaster et æble efter rotten.", 
                    textEn: "Anna throws an apple at the rat.", 
                    icon: "🍏",
                    nextNode: "node_2b" 
                }
            ]
        },
        'node_2a': {
            id: 'node_2a',
            title: "Kaffe-kaos",
            titleEn: "Coffee Chaos",
            image: "assets/anna_chefen_kaffe.jpg",
            narrative: "Anna løber hurtigt væk. Hun kigger ikke fremad. Hun støder ind i butikschefen! Chefen taber sin kaffe på gulvet.",
            narrativeEn: "Anna runs fast. She doesn't look ahead. She bumps head-on into the store manager! The manager drops his coffee on the floor.",
            task: {
                type: "syntax",
                instruction: "Hvad siger Anna?",
                instructionEn: "What does Anna say?",
                words: ["Undskyld,", "jeg", "løb,", "fordi", "jeg", "så", "en", "rotte."]
            },
            choices: [
                { 
                    text: "Anna viser chefen rotten.", 
                    textEn: "Anna shows the manager the rat.", 
                    icon: "👉",
                    nextNode: "node_3a" 
                },
                { 
                    text: "Anna lader som om, hun har slået hovedet.", 
                    textEn: "Anna pretends she hit her head.", 
                    icon: "😵",
                    nextNode: "node_3b" 
                }
            ]
        },
        'node_2b': {
            id: 'node_2b',
            title: "Dåsetomat-katastrofen",
            titleEn: "Tomato Can Disaster",
            image: "assets/anna_tomat_pyramide.jpg",
            narrative: "Anna kaster æblet. Det rammer ikke rotten, men det rammer en stor pyramide af dåsetomater. Det hele vælter med et kæmpe brag. En kunde råber:",
            narrativeEn: "Anna throws the apple. It doesn't hit the rat, but it hits a giant pyramid of canned tomatoes. Everything collapses with a massive crash. A customer shouts:",
            tasks: [
                {
                    type: "syntax",
                    instruction: "Hvad råber kunden?",
                    instructionEn: "What does the customer shout?",
                    words: ["Hvad", "laver", "du?"]
                },
                {
                    type: "syntax",
                    instruction: "Kunden fortsætter...",
                    instructionEn: "The customer continues...",
                    words: ["Du", "ødelægger", "det", "hele!"]
                }
            ],
            choices: [
                { 
                    text: "Anna peger på rotten for at forsvare sig.", 
                    textEn: "Anna points at the rat to defend herself.", 
                    icon: "🐀",
                    nextNode: "node_3a" 
                },
                { 
                    text: "Anna prøver at gribe dåserne i luften.", 
                    textEn: "Anna tries to catch the cans in mid-air.", 
                    icon: "🤹‍♀️",
                    nextNode: "node_3c" 
                }
            ]
        },
        'node_3a': {
            id: 'node_3a',
            title: "Panik ved kassen",
            titleEn: "Panic at the Checkout",
            image: "assets/anna_netto_rotte.jpg",
            narrative: "Chefen ser rotten. Han skriger. Rotten hopper op på kassen.",
            narrativeEn: "The manager sees the rat. He screams. The rat jumps up on the cash register.",
            task: {
                type: "semantics",
                instruction: "Hvad sker der nu?",
                instructionEn: "What happens now?",
                textSegments: [
                    "Alle kunder løber ",
                    ". Chefen beder Anna om ",
                    "."
                ],
                textSegmentsEn: [
                    "All customers run ",
                    ". The manager asks Anna for ",
                    "."
                ],
                blanks: [
                    { correct: "ud", options: ["ud", "ind", "væk"] },
                    { correct: "hjælp", options: ["hjælp", "penge", "mad"] }
                ]
            },
            choices: [
                { 
                    text: "Anna fanger rotten i en kurv.", 
                    textEn: "Anna catches the rat in a basket.", 
                    icon: "🧺",
                    nextNode: "ending_1" 
                },
                { 
                    text: "Anna løber ud af butikken.", 
                    textEn: "Anna runs out of the store.", 
                    icon: "🚪",
                    nextNode: "ending_2" 
                }
            ]
        },
        'node_3b': {
            id: 'node_3b',
            title: "Drama på gulvet",
            titleEn: "Drama on the Floor",
            image: "assets/anna_pinlig_slutning.jpg",
            narrative: "Anna falder på gulvet. Hun lukker øjnene og spiller bevidstløs.",
            narrativeEn: "Anna falls on the floor. She closes her eyes and plays unconscious.",
            task: {
                type: "semantics",
                instruction: "Hvad sker der nu?",
                instructionEn: "What happens now?",
                textSegments: [
                    "Chefen kigger ",
                    " på hende. Han glemmer sin ",
                    "."
                ],
                textSegmentsEn: [
                    "The manager looks ",
                    " at her. He forgets his ",
                    "."
                ],
                blanks: [
                    { correct: "bange", options: ["bange", "glad", "sur"] },
                    { correct: "kaffe", options: ["kaffe", "bil", "taske"] }
                ]
            },
            choices: [
                { 
                    text: "Anna rejser sig op og går hjem.", 
                    textEn: "Anna gets up and walks home.", 
                    icon: "🚶‍♀️",
                    nextNode: "ending_3" 
                }
            ]
        },
        'node_3c': {
            id: 'node_3c',
            title: "En usædvanlig dans",
            titleEn: "An Unusual Dance",
            image: "assets/anna_tomat_pyramide.jpg",
            narrative: "Anna prøver at gribe dåserne. Det ligner en mærkelig dans.",
            narrativeEn: "Anna tries to catch the cans. It looks like an eccentric dance.",
            task: {
                type: "semantics",
                instruction: "Hvad sker der nu?",
                instructionEn: "What happens now?",
                textSegments: [
                    "Kunderne griner og ",
                    ". De synes, det er meget ",
                    "."
                ],
                textSegmentsEn: [
                    "The customers laugh and ",
                    ". They think it is very ",
                    "."
                ],
                blanks: [
                    { correct: "klapper", options: ["klapper", "græder", "sover"] },
                    { correct: "sjovt", options: ["sjovt", "trist", "farligt"] }
                ]
            },
            choices: [
                { 
                    text: "Anna bukker og smiler.", 
                    textEn: "Anna bows and smiles.", 
                    icon: "👏",
                    nextNode: "ending_4" 
                }
            ]
        },
        'ending_1': {
            id: 'ending_1',
            isEnding: true,
            badgeId: 'ending_1',
            badgeTitle: 'Helten!',
            badgeTitleEn: 'The Hero!',
            badgeIcon: '🏆',
            image: 'assets/anna_helten_slutning.jpg',
            narrative: "Helten! Anna fangede rotten. Chefen blev så imponeret, at hun fik æblet gratis. En lidt underlig præmie, men hun overlevede dagen.",
            narrativeEn: "The Hero! Anna caught the rat. The manager was so impressed that she got the apple for free. A slightly odd prize, but she survived the day.",
            task: null,
            choices: []
        },
        'ending_2': {
            id: 'ending_2',
            isEnding: true,
            badgeId: 'ending_2',
            badgeTitle: 'Flugten!',
            badgeTitleEn: 'The Escape!',
            badgeIcon: '🏃‍♀️',
            image: 'assets/anna_flugten_slutning.jpg',
            narrative: "Flugten! Anna låste chefen, kunderne og rotten inde i butikken. Hun køber nok ikke ind i den Netto igen foreløbig.",
            narrativeEn: "The Escape! Anna locked the manager, customers, and the rat inside the store. She probably won't shop in that Netto again anytime soon.",
            task: null,
            choices: []
        },
        'ending_3': {
            id: 'ending_3',
            isEnding: true,
            badgeId: 'ending_3',
            badgeTitle: 'Den pinlige udvej!',
            badgeTitleEn: 'The Awkward Exit!',
            badgeIcon: '🙈',
            image: 'assets/anna_pinlig_slutning.jpg',
            narrative: "Den pinlige udvej! Anna gik hjem med stoltheden i behold (næsten), og rotten overtog højst sandsynligt butikken.",
            narrativeEn: "The Awkward Exit! Anna went home with her pride intact (almost), and the rat most likely took over the supermarket.",
            task: null,
            choices: []
        },
        'ending_4': {
            id: 'ending_4',
            isEnding: true,
            badgeId: 'ending_4',
            badgeTitle: 'Tomat-Anna!',
            badgeTitleEn: 'Tomato-Anna!',
            badgeIcon: '🌟',
            image: 'assets/anna_tomat_stjerne.jpg',
            narrative: "Stjernen! Annas dåse-jonglør-nummer gik viralt på TikTok. Hun er nu kendt i hele Danmark som 'Tomat-Anna'.",
            narrativeEn: "The Star! Anna's can-juggling act went viral on TikTok. She is now known all over Denmark as 'Tomato-Anna'.",
            task: null,
            choices: []
        }
    }
};
