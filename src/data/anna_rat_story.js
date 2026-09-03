export const annaRatStory = {
    startNode: 'node_1',
    nodes: {
        'node_1': {
            narrative: "Anna er i Netto.",
            tasks: [
                {
                    type: "semantics",
                    instruction: "Udfyld historien",
                    textSegments: [
                        "",
                        " er i frugtafdelingen. Hun vil købe et æble. Pludselig ser hun en stor ",
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
                    words: ["Hvad", "er", "det?"]
                },
                {
                    type: "syntax",
                    instruction: "Hvad tænker Anna videre?",
                    words: ["Er", "det", "en", "rotte?"]
                },
                {
                    type: "phonetics",
                    instruction: "Udtal Annas chokerede tanker højt!",
                    target: "Hvad er det? Er det en rotte?"
                }
            ],
            choices: [
                { text: "Anna løber skrigende væk.", nextNode: "node_2a" },
                { text: "Anna kaster et æble efter rotten.", nextNode: "node_2b" }
            ]
        },
        'node_2a': {
            narrative: "Anna løber hurtigt væk. Hun kigger ikke fremad. Hun støder ind i butikschefen! Chefen taber sin kaffe på gulvet.",
            task: {
                type: "syntax",
                instruction: "Hvad siger Anna?",
                words: ["Undskyld,", "jeg", "løb,", "fordi", "jeg", "så", "en", "rotte."]
            },
            choices: [
                { text: "Anna viser chefen rotten.", nextNode: "node_3a" },
                { text: "Anna lader som om, hun har slået hovedet.", nextNode: "node_3b" }
            ]
        },
        'node_2b': {
            narrative: "Anna kaster æblet. Det rammer ikke rotten, men det rammer en stor pyramide af dåsetomater. Det hele vælter med et kæmpe brag. En kunde råber:",
            tasks: [
                {
                    type: "syntax",
                    instruction: "Hvad råber kunden?",
                    words: ["Hvad", "laver", "du?"]
                },
                {
                    type: "syntax",
                    instruction: "Kunden fortsætter...",
                    words: ["Du", "ødelægger", "det", "hele!"]
                }
            ],
            choices: [
                { text: "Anna peger på rotten for at forsvare sig.", nextNode: "node_3a" },
                { text: "Anna prøver at gribe dåserne i luften.", nextNode: "node_3c" }
            ]
        },
        'node_3a': {
            narrative: "Chefen ser rotten. Han skriger. Rotten hopper op på kassen.",
            task: {
                type: "semantics",
                instruction: "Hvad sker der nu?",
                textSegments: [
                    "Alle kunder løber ",
                    ". Chefen beder Anna om ",
                    "."
                ],
                blanks: [
                    { correct: "ud", options: ["ud", "ind", "væk"] },
                    { correct: "hjælp", options: ["hjælp", "penge", "mad"] }
                ]
            },
            choices: [
                { text: "Anna fanger rotten i en kurv.", nextNode: "ending_1" },
                { text: "Anna løber ud af butikken.", nextNode: "ending_2" }
            ]
        },
        'node_3b': {
            narrative: "Anna falder på gulvet. Hun lukker øjnene.",
            task: {
                type: "semantics",
                instruction: "Hvad sker der nu?",
                textSegments: [
                    "Chefen kigger ",
                    " på hende. Han glemmer sin ",
                    "."
                ],
                blanks: [
                    { correct: "bange", options: ["bange", "glad", "sur"] },
                    { correct: "kaffe", options: ["kaffe", "bil", "taske"] }
                ]
            },
            choices: [
                { text: "Anna rejser sig op og går hjem.", nextNode: "ending_3" }
            ]
        },
        'node_3c': {
            narrative: "Anna prøver at gribe dåserne. Det ligner en mærkelig dans.",
            task: {
                type: "semantics",
                instruction: "Hvad sker der nu?",
                textSegments: [
                    "Kunderne griner og ",
                    ". De synes, det er meget ",
                    "."
                ],
                blanks: [
                    { correct: "klapper", options: ["klapper", "græder", "sover"] },
                    { correct: "sjovt", options: ["sjovt", "trist", "farligt"] }
                ]
            },
            choices: [
                { text: "Anna bukker og smiler.", nextNode: "ending_4" }
            ]
        },
        'ending_1': {
            narrative: "Helten! Anna fangede rotten. Chefen blev så imponeret, at hun fik æblet gratis. En lidt underlig præmie, men hun overlevede dagen.",
            task: null,
            choices: []
        },
        'ending_2': {
            narrative: "Flugten! Anna låste chefen, kunderne og rotten inde i butikken. Hun køber nok ikke ind i den Netto igen foreløbig.",
            task: null,
            choices: []
        },
        'ending_3': {
            narrative: "Den pinlige udvej! Anna gik hjem med stoltheden i behold (næsten), og rotten overtog højst sandsynligt butikken.",
            task: null,
            choices: []
        },
        'ending_4': {
            narrative: "Stjernen! Annas dåse-jonglørti-nummer gik viralt på TikTok. Hun er nu kendt som 'Tomat-Anna'.",
            task: null,
            choices: []
        }
    }
};
