/**
 * H.C. Andersens Eventyr for Danskkursister (A2 / Letlæst B1)
 * Forkortede og forsimplede udgaver af klassiske eventyr.
 * Med ordforklaringer, sprog-spots, opgaver og forståelsesspørgsmål.
 */

export const hcAndersenStories = [
    {
        "id": "klods_hans",
        "title": "Klods-Hans",
        "titleEn": "Clumsy Hans",
        "icon": "🐐",
        "level": "Let (A2)",
        "readingTime": "3 min",
        "quote": "»Hov! Se hvad jeg har fundet: en død krage og en gammel træsko!«",
        "quoteEn": "»Whoa! Look what I found: a dead crow and an old wooden shoe!«",
        "teaser": "Kongens datter skal giftes, og den som taler bedst vinder hende. De to fornemme brødre forbereder store taler, men Klods-Hans rider afsted på sin ged med en død krage, en gammel træsko og mudder fra grøften!",
        "teaserEn": "The king daughter is to marry, and whoever speaks best wins her. The two clever brothers prepare big speeches, but Clumsy Hans rides his goat with a dead crow, an old shoe and mud!",
        "grammarFocus": {
            "title": "Sprog-spot: Pronominer & Ordklasser",
            "desc": "Læg mærke til de pink pronominer (jeg, du, hende, min, hans), som erstatter personer og viser ejerskab. Klik på et hvilket som helst farvet ord for at se dets bøjning, lytte til udtalen og træne det!"
        },
        "hasWimmelbilder": true,
        "sections": [
            {
                "chapter": "Scene 1: På bondegården",
                "chapterEn": "Scene 1: At the Farm",
                "vrimmelImage": "assets/klods_hans_scene1.jpg",
                "audioText": "Ude på landet var der en gammel gård, og i den var der en gammel far, som havde tre sønner, der var så kloge. Kongen har sagt, at hans datter skal finde en mand. Den, som taler bedst, vinder hende. Storebror sagde: Jeg tager til slottet. Jeg kan tale om store og komplicerede ting. Jeg er meget klog! Mellembror sagde: Og jeg vil også gå! Jeg kender mange sange. Ja, jeg er altid glad og god til at synge! Klods-Hans råbte: Jeg prøver også! Jeg har ingen hest, men jeg tager min ged! Faren sagde: Tag du bare geden, Klods-Hans.",
                "text": "Fortæller: »Ude på landet var der en gammel gård, og i den var der en gammel far, som havde tre sønner, der var så kloge.«\n\nFar: »Kongen har sagt, at hans datter skal finde en mand. Den, som taler bedst, vinder hende.«\n\nStorebror: »Jeg tager til slottet. Jeg kan tale om store og komplicerede ting. Jeg er meget klog!«\n\nMellembror: »Og jeg vil også gå! Jeg kender mange sange. Ja, jeg er altid glad og god til at synge!«\n\nKlods-Hans: »Jeg prøver også! Jeg har ingen hest, men jeg tager min ged!«\n\nFar: »Tag du bare geden, Klods-Hans.«",
                "hotspots": [
                    {
                        "x": 38,
                        "y": 50,
                        "type": "vrb",
                        "word": "rider",
                        "label": "rider",
                        "info": "Verbum: at ride"
                    },
                    {
                        "x": 44,
                        "y": 56,
                        "type": "sub",
                        "word": "hest",
                        "label": "en hest",
                        "info": "Substantiv: en hest"
                    },
                    {
                        "x": 80,
                        "y": 28,
                        "type": "sub",
                        "word": "gård",
                        "label": "en gård",
                        "info": "Substantiv: en gård"
                    },
                    {
                        "x": 67,
                        "y": 52,
                        "type": "pro",
                        "word": "jeg",
                        "label": "jeg (subjekt)",
                        "info": "Pronomen: jeg"
                    },
                    {
                        "x": 73,
                        "y": 72,
                        "type": "sub",
                        "word": "ged",
                        "label": "en ged",
                        "info": "Substantiv: en ged"
                    },
                    {
                        "x": 88,
                        "y": 58,
                        "type": "sub",
                        "word": "far",
                        "label": "en far",
                        "info": "Substantiv: en far"
                    },
                    {
                        "x": 36,
                        "y": 38,
                        "type": "adj",
                        "word": "klog",
                        "label": "klog",
                        "info": "Adjektiv: klog"
                    }
                ],
                "dialogue": [
                    {
                        "speaker": "Fortæller",
                        "speakerIcon": "📖",
                        "audioText": "Ude på landet var der en gammel gård, og i den var der en gammel far, som havde tre sønner, der var så kloge.",
                        "tokens": [
                            {
                                "text": "Ude",
                                "type": "adv",
                                "key": "ude"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "på",
                                "type": "prep",
                                "key": "på"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "landet",
                                "type": "sub",
                                "key": "land"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "var",
                                "type": "vrb",
                                "key": "være"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "der",
                                "type": "adv",
                                "key": "der"
                            },
                            {
                                "text": " en ",
                                "type": "plain"
                            },
                            {
                                "text": "gammel",
                                "type": "adj",
                                "key": "gammel"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "gård",
                                "type": "sub",
                                "key": "gård"
                            },
                            {
                                "text": ", ",
                                "type": "plain"
                            },
                            {
                                "text": "og",
                                "type": "konj",
                                "key": "og"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "i",
                                "type": "prep",
                                "key": "i"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "den",
                                "type": "pro",
                                "key": "den"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "var",
                                "type": "vrb",
                                "key": "være"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "der",
                                "type": "adv",
                                "key": "der"
                            },
                            {
                                "text": " en ",
                                "type": "plain"
                            },
                            {
                                "text": "gammel",
                                "type": "adj",
                                "key": "gammel"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "far",
                                "type": "sub",
                                "key": "far"
                            },
                            {
                                "text": ", ",
                                "type": "plain"
                            },
                            {
                                "text": "som",
                                "type": "pro",
                                "key": "som"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "havde",
                                "type": "vrb",
                                "key": "have"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "tre",
                                "type": "adj",
                                "key": "tre"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "sønner",
                                "type": "sub",
                                "key": "søn"
                            },
                            {
                                "text": ", ",
                                "type": "plain"
                            },
                            {
                                "text": "der",
                                "type": "pro",
                                "key": "der"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "var",
                                "type": "vrb",
                                "key": "være"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "så",
                                "type": "adv",
                                "key": "så"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "kloge",
                                "type": "adj",
                                "key": "klog"
                            },
                            {
                                "text": ".",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Far",
                        "speakerIcon": "👨‍🌾",
                        "audioText": "Kongen har sagt, at hans datter skal finde en mand.",
                        "tokens": [
                            {
                                "text": "Kongen",
                                "type": "sub",
                                "key": "konge"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "har sagt",
                                "type": "vrb",
                                "key": "sige"
                            },
                            {
                                "text": ", ",
                                "type": "plain"
                            },
                            {
                                "text": "at",
                                "type": "konj",
                                "key": "at"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "hans",
                                "type": "pro",
                                "key": "hans"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "datter",
                                "type": "sub",
                                "key": "datter"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "skal finde",
                                "type": "vrb",
                                "key": "finde"
                            },
                            {
                                "text": " en ",
                                "type": "plain"
                            },
                            {
                                "text": "mand",
                                "type": "sub",
                                "key": "mand"
                            },
                            {
                                "text": ".",
                                "type": "plain"
                            }
                        ],
                        "challenge": {
                            "type": "ordstilling",
                            "title": "Mesterens replik: Ordstilling",
                            "badge": "👑 Mesterens replik",
                            "prompt": "Hvad siger faren om kongens betingelse? Saml sætningsdelen i rigtig ordstilling:",
                            "targetSentence": "Den, som taler bedst, vinder hende.",
                            "tiles": [
                                "Den,",
                                "som",
                                "taler",
                                "bedst,",
                                "vinder",
                                "hende."
                            ],
                            "completedTokens": [
                                {
                                    "text": "Den",
                                    "type": "pro",
                                    "key": "den"
                                },
                                {
                                    "text": ", ",
                                    "type": "plain"
                                },
                                {
                                    "text": "som",
                                    "type": "pro",
                                    "key": "som"
                                },
                                {
                                    "text": " ",
                                    "type": "plain"
                                },
                                {
                                    "text": "taler",
                                    "type": "vrb",
                                    "key": "tale"
                                },
                                {
                                    "text": " ",
                                    "type": "plain"
                                },
                                {
                                    "text": "bedst",
                                    "type": "adj",
                                    "key": "god"
                                },
                                {
                                    "text": ", ",
                                    "type": "plain"
                                },
                                {
                                    "text": "vinder",
                                    "type": "vrb",
                                    "key": "vinde"
                                },
                                {
                                    "text": " ",
                                    "type": "plain"
                                },
                                {
                                    "text": "hende",
                                    "type": "pro",
                                    "key": "hende"
                                },
                                {
                                    "text": ".",
                                    "type": "plain"
                                }
                            ],
                            "explanation": "Korrekt ordstilling! Læg mærke til V2: Efter ledsætningen ('som taler bedst') kommer verbet 'vinder' lige før objektet 'hende'."
                        }
                    },
                    {
                        "speaker": "Storebror",
                        "speakerIcon": "🎩",
                        "audioText": "Jeg tager til slottet. Jeg kan tale om store og komplicerede ting. Jeg er meget klog!",
                        "tokens": [
                            {
                                "text": "Jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "tager",
                                "type": "vrb",
                                "key": "tage"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "til",
                                "type": "prep",
                                "key": "til"
                            },
                            {
                                "text": " slottet. ",
                                "type": "plain"
                            },
                            {
                                "text": "Jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "kan tale",
                                "type": "vrb",
                                "key": "tale"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "om",
                                "type": "prep",
                                "key": "om"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "store",
                                "type": "adj",
                                "key": "stor"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "og",
                                "type": "konj",
                                "key": "og"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "komplicerede",
                                "type": "adj",
                                "key": "kompliceret"
                            },
                            {
                                "text": " ting. ",
                                "type": "plain"
                            },
                            {
                                "text": "Jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "er",
                                "type": "vrb",
                                "key": "være"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "meget",
                                "type": "adv",
                                "key": "meget"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "klog",
                                "type": "adj",
                                "key": "klog"
                            },
                            {
                                "text": "!",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Mellembror",
                        "speakerIcon": "📜",
                        "audioText": "Og jeg vil også gå! Jeg kender mange sange. Ja, jeg er altid glad og god til at synge!",
                        "tokens": [
                            {
                                "text": "Og",
                                "type": "konj",
                                "key": "og"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "vil",
                                "type": "vrb",
                                "key": "ville"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "også",
                                "type": "adv",
                                "key": "ogsaa"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "gå",
                                "type": "vrb",
                                "key": "gå"
                            },
                            {
                                "text": "! ",
                                "type": "plain"
                            },
                            {
                                "text": "Jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "kender",
                                "type": "vrb",
                                "key": "kende"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "mange",
                                "type": "adj",
                                "key": "mange"
                            },
                            {
                                "text": " sange. Ja, ",
                                "type": "plain"
                            },
                            {
                                "text": "jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "er",
                                "type": "vrb",
                                "key": "være"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "altid",
                                "type": "adv",
                                "key": "altid"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "glad",
                                "type": "adj",
                                "key": "glad"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "og",
                                "type": "konj",
                                "key": "og"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "god",
                                "type": "adj",
                                "key": "god"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "til",
                                "type": "prep",
                                "key": "til"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "at",
                                "type": "konj",
                                "key": "at"
                            },
                            {
                                "text": " synge!",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Klods-Hans",
                        "speakerIcon": "🐐",
                        "audioText": "Jeg prøver også! Jeg har ingen hest, men jeg tager min ged!",
                        "tokens": [
                            {
                                "text": "Jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "prøver",
                                "type": "vrb",
                                "key": "prøve"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "også",
                                "type": "adv",
                                "key": "ogsaa"
                            },
                            {
                                "text": "! ",
                                "type": "plain"
                            },
                            {
                                "text": "Jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "har",
                                "type": "vrb",
                                "key": "have"
                            },
                            {
                                "text": " ingen hest, ",
                                "type": "plain"
                            },
                            {
                                "text": "men",
                                "type": "konj",
                                "key": "men"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "tager",
                                "type": "vrb",
                                "key": "tage"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "min",
                                "type": "pro",
                                "key": "min"
                            },
                            {
                                "text": " ged!",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Far",
                        "speakerIcon": "👨‍🌾",
                        "audioText": "Tag du bare geden, Klods-Hans.",
                        "tokens": [
                            {
                                "text": "Tag",
                                "type": "vrb",
                                "key": "tage"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "du",
                                "type": "pro",
                                "key": "du"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "bare",
                                "type": "adv",
                                "key": "bare"
                            },
                            {
                                "text": " geden, Klods-Hans.",
                                "type": "plain"
                            }
                        ]
                    }
                ],
                "tasks": {
                    "detektiv": {
                        "title": "Visuel detektiv",
                        "badge": "🔍 Visuel detektiv",
                        "icon": "🔍",
                        "desc": "Kig grundigt på vrimlebilledet af bondegården og svar på spørgsmålene om de centrale detaljer:",
                        "questions": [
                            {
                                "id": "s1_d1",
                                "prompt": "Kig på Klods-Hans i midten. Hvilket dyr rider han på i stedet for en hest?",
                                "options": [
                                    "En ged / gedebuk",
                                    "En gris",
                                    "En ko",
                                    "En stor hund"
                                ],
                                "correct": 0,
                                "explanation": "Rigtigt spottet! Klods-Hans rider stolt på gårdens gedebuk med store horn i stedet for en hest!"
                            },
                            {
                                "id": "s1_d2",
                                "prompt": "Hvilket redskab af træ og jern står ved siden af stalddøren på jorden?",
                                "options": [
                                    "En trillebør",
                                    "En stige",
                                    "En plov",
                                    "En rive"
                                ],
                                "correct": 0,
                                "explanation": "Rigtigt observeret! En gammel trillebør af træ står på gårdspladsen ved stalden."
                            },
                            {
                                "id": "s1_d3",
                                "prompt": "Hvad rider de to ældre brødre til venstre på, da de skal til slottet?",
                                "options": [
                                    "Fine, stolte rideheste",
                                    "Trækvogne",
                                    "Små æsler",
                                    "Cykler"
                                ],
                                "correct": 0,
                                "explanation": "Flot observeret! Brødrene har fået fine hvide og brune heste af faderen."
                            },
                            {
                                "id": "s1_d4",
                                "prompt": "Hvem står til højre foran stalddøren og ser sønnerne ride afsted?",
                                "options": [
                                    "Faren / den gamle bonde",
                                    "Kongen",
                                    "Prinsessen",
                                    "En soldat"
                                ],
                                "correct": 0,
                                "explanation": "Korrekt! Faren står ved stalddøren og giver Klods-Hans lov til at tage geden."
                            }
                        ]
                    },
                    "substantiver": {
                        "title": "Substantiver: Over- og underbegreber",
                        "badge": "🟢 Over- & underbegreber",
                        "icon": "🟢",
                        "desc": "Træn kategorisering og semantiske relationer for scenens centrale navneord:",
                        "questions": [
                            {
                                "id": "s1_s1",
                                "badge": "🟢 Overbegreb",
                                "prompt": "Hvad er overbegrebet for **en hest** og **en ged** på bondegården?",
                                "options": [
                                    "Et husdyr (eller pattedyr)",
                                    "Et køretøj",
                                    "En bygning",
                                    "Et møbel"
                                ],
                                "correct": 0,
                                "explanation": "Både en hest og en ged er *husdyr* – dyr som mennesker holder på en gård."
                            },
                            {
                                "id": "s1_s2",
                                "badge": "🟢 Underbegreb",
                                "prompt": "Hvad er et underbegreb til overbegrebet **et familiemedlem**?",
                                "options": [
                                    "En søn (eller en far)",
                                    "En ged",
                                    "En hest",
                                    "En gård"
                                ],
                                "correct": 0,
                                "explanation": "*Familiemedlem* er overbegrebet, og *en søn* eller *en far* er underbegreber (familiemedlemmer)."
                            },
                            {
                                "id": "s1_s3",
                                "badge": "🟢 Overbegreb",
                                "prompt": "Hvad er overbegrebet for **en bondegård**?",
                                "options": [
                                    "Et landbrug (eller en landejendom)",
                                    "En forlystelsespark",
                                    "Et transportmiddel",
                                    "Et musikinstrument"
                                ],
                                "correct": 0,
                                "explanation": "En bondegård er et *landbrug*, hvor man dyrker jorden og holder husdyr."
                            }
                        ]
                    },
                    "verber": {
                        "title": "Verber: Modsætninger og synonymer",
                        "badge": "🔴 Modsætninger & synonymer",
                        "icon": "🔴",
                        "desc": "Træn handlingernes modpoler og synonymer for udsagnsordene i scenen:",
                        "questions": [
                            {
                                "id": "s1_v1",
                                "badge": "🔴 Modsætning (Antonym)",
                                "prompt": "Faren siger: 'Den, som taler bedst, vinder hende.' Hvad er det modsatte af **at vinde**?",
                                "options": [
                                    "at tabe",
                                    "at sejre",
                                    "at råbe",
                                    "at ride"
                                ],
                                "correct": 0,
                                "explanation": "*At vinde* og *at tabe* er modpoler (antonymer). Den, der ikke vinder, taber."
                            },
                            {
                                "id": "s1_v2",
                                "badge": "🔴 Synonym",
                                "prompt": "Storebror vil tale om komplicerede ting. Hvilket verbum er et synonym til **at tale**?",
                                "options": [
                                    "at snakke / samtale",
                                    "at tie stille",
                                    "at lytte",
                                    "at sove"
                                ],
                                "correct": 0,
                                "explanation": "*At tale* og *at snakke* betyder næsten det samme (synonymer)."
                            },
                            {
                                "id": "s1_v3",
                                "badge": "🔴 Modsætning (Antonym)",
                                "prompt": "Mellembror siger: 'Jeg kender mange sange.' Hvad er det modsatte af **at kende** eller huske noget?",
                                "options": [
                                    "at glemme / ikke ane",
                                    "at vide",
                                    "at synge",
                                    "at lære"
                                ],
                                "correct": 0,
                                "explanation": "Hvis du ikke *kender* eller husker sangen, har du *glemt* den eller er uvidende om den."
                            }
                        ]
                    },
                    "adjektiver": {
                        "title": "Adjektiver: Modsætninger og gradbøjning",
                        "badge": "🟠 Modsætninger & gradbøjning",
                        "icon": "🟠",
                        "desc": "Træn tillægsord der beskriver personernes egenskaber og genstande i scenen:",
                        "questions": [
                            {
                                "id": "s1_a1",
                                "badge": "🟠 Modsætning (Antonym)",
                                "prompt": "Storebror siger: 'Jeg er meget klog.' Hvad er det modsatte af **klog**?",
                                "options": [
                                    "dum",
                                    "glad",
                                    "stærk",
                                    "ung"
                                ],
                                "correct": 0,
                                "explanation": "*Klog* (intelligent) har modpolen *dum* (uklog)."
                            },
                            {
                                "id": "s1_a2",
                                "badge": "🟠 Modsætning (Antonym)",
                                "prompt": "Mellembror siger: 'Ja, jeg er altid glad.' Hvad er det modsatte af **glad**?",
                                "options": [
                                    "trist / ked af det",
                                    "klog",
                                    "rig",
                                    "hurtig"
                                ],
                                "correct": 0,
                                "explanation": "Det modsatte af at være *glad* er at være *trist* eller *ked af det*."
                            },
                            {
                                "id": "s1_a3",
                                "badge": "🟠 Gradbøjning",
                                "prompt": "Hvordan gradbøjes det uregelmæssige adjektiv **god** ('Den der taler bedst...')?",
                                "options": [
                                    "god – bedre – bedst",
                                    "god – godere – godest",
                                    "god – mere god – mest god",
                                    "klog – klogere – klogest"
                                ],
                                "correct": 0,
                                "explanation": "*God* er uregelmæssigt: positiv: *god*, komparativ: *bedre*, superlativ: *bedst*!"
                            }
                        ]
                    },
                    "adverbier": {
                        "title": "Adverbier: Gradbøjning og synonymer",
                        "badge": "🔵 Gradbøjning & synonymer",
                        "icon": "🔵",
                        "desc": "Træn de centrale biord der justerer grad, tid og frekvens:",
                        "questions": [
                            {
                                "id": "s1_adv1",
                                "badge": "🔵 Gradbøjning",
                                "prompt": "Hvordan gradbøjes gradsadverbiet **meget** ('Jeg er meget klog')?",
                                "options": [
                                    "meget – mere – mest",
                                    "meget – megest – meger",
                                    "godt – bedre – bedst",
                                    "ofte – oftere – oftest"
                                ],
                                "correct": 0,
                                "explanation": "*Meget* gradbøjes: *meget – mere – mest* (f.eks. 'Han ved meget, men hun ved mest')."
                            },
                            {
                                "id": "s1_adv2",
                                "badge": "🔵 Modsætning (Antonym)",
                                "prompt": "Mellembror siger: 'Jeg er altid glad.' Hvad er det modsatte af tidsadverbiet **altid**?",
                                "options": [
                                    "aldrig",
                                    "ofte",
                                    "nogle gange",
                                    "stadig"
                                ],
                                "correct": 0,
                                "explanation": "*Altid* betyder 100% af tiden. Det modsatte er *aldrig* (0% af tiden)."
                            },
                            {
                                "id": "s1_adv3",
                                "badge": "🔵 Synonym",
                                "prompt": "Klods-Hans råber: 'Jeg prøver også!' Hvilket adverbium kan betyde det samme som **også**?",
                                "options": [
                                    "ligeledes / tillige",
                                    "aldrig",
                                    "måske",
                                    "kun"
                                ],
                                "correct": 0,
                                "explanation": "*Også* og *ligeledes* betyder, at der tilføjes endnu en person eller handling."
                            }
                        ]
                    }
                }
            },
            {
                "chapter": "Scene 2: På landevejen til slottet",
                "chapterEn": "Scene 2: On the Road to the Castle",
                "vrimmelImage": "assets/klods_hans_scene2.jpg",
                "audioText": "De to brødre red foran på deres heste. De talte ikke, for de tænkte over alt det kloge de ville sige. Klods-Hans råbte: Her kommer jeg! Se, hvad jeg har fundet på landevejen: Det er en død krage! Brødrene sagde: Klods! Hvad vil du med en død krage? Klods-Hans svarede: Den vil jeg give til kongedatteren! Brødrene grinede: Haha! Gør du bare det! Klods-Hans råbte: Her er jeg igen! Nu skal I se, hvad jeg har fundet: En gammel træsko! Brødrene sagde: En gammel træsko? Skal kongedatteren også have den? Klods-Hans svarede: Ja, det skal hun da! Klods-Hans råbte: Halehoj! Nu bliver det endnu bedre! Se, hvad jeg har gravet op af grøften! Brødrene sagde: Adr, hvor ulækkert, Klods-Hans! Det er jo mudder fra grøften! Klods-Hans svarede: Ja, og det er den fineste slags! Hvor vil hun blive glad!",
                "text": "Fortæller: »De to brødre red foran på deres heste. De talte ikke, for de tænkte over alt det kloge de ville sige.«\n\nKlods-Hans: »Her kommer jeg! Se, hvad jeg har fundet på landevejen: Det er en død krage!«\n\nBrødrene: »Klods! Hvad vil du med en død krage?«\n\nKlods-Hans: »Den vil jeg give til kongedatteren!«\n\nBrødrene: »Haha! Gør du bare det!« (de ler og rider videre)\n\nKlods-Hans: »Her er jeg igen! Nu skal I se, hvad jeg har fundet: En gammel træsko!«\n\nBrødrene: »En gammel træsko? Skal kongedatteren også have den?«\n\nKlods-Hans: »Ja, det skal hun da!«\n\nKlods-Hans: »Halehoj! Nu bliver det endnu bedre! Se, hvad jeg har gravet op af grøften!«\n\nBrødrene: »Adr, hvor ulækkert, Klods-Hans! Det er jo mudder fra grøften!«\n\nKlods-Hans: »Ja, og det er den fineste slags! Hvor vil hun blive glad!«",
                "hotspots": [
                    {
                        "x": 74,
                        "y": 44,
                        "type": "vrb",
                        "word": "rider",
                        "label": "rider bagefter",
                        "info": "Verbum: at ride"
                    },
                    {
                        "x": 74,
                        "y": 70,
                        "type": "sub",
                        "word": "ged",
                        "label": "en ged",
                        "info": "Substantiv: en ged"
                    },
                    {
                        "x": 81,
                        "y": 20,
                        "type": "sub",
                        "word": "fugl",
                        "label": "en død krage",
                        "info": "Substantiv: en fugl (krage)"
                    },
                    {
                        "x": 34,
                        "y": 45,
                        "type": "sub",
                        "word": "bror",
                        "label": "storebror",
                        "info": "Substantiv: en bror"
                    },
                    {
                        "x": 42,
                        "y": 48,
                        "type": "vrb",
                        "word": "tænker",
                        "label": "at tænke",
                        "info": "Verbum: at tænke"
                    },
                    {
                        "x": 38,
                        "y": 55,
                        "type": "sub",
                        "word": "hest",
                        "label": "to heste",
                        "info": "Substantiv: to heste"
                    },
                    {
                        "x": 19,
                        "y": 88,
                        "type": "sub",
                        "word": "træsko",
                        "label": "en gammel træsko",
                        "info": "Substantiv: en træsko"
                    },
                    {
                        "x": 23,
                        "y": 82,
                        "type": "sub",
                        "word": "mudder",
                        "label": "mudder / pludder",
                        "info": "Substantiv: mudder"
                    },
                    {
                        "x": 50,
                        "y": 50,
                        "type": "sub",
                        "word": "vej",
                        "label": "en landevej",
                        "info": "Substantiv: en landevej"
                    },
                    {
                        "x": 37,
                        "y": 20,
                        "type": "sub",
                        "word": "slot",
                        "label": "et slot",
                        "info": "Substantiv: et slot"
                    }
                ],
                "dialogue": [
                    {
                        "speaker": "Fortæller",
                        "speakerIcon": "📖",
                        "audioText": "De to brødre red foran på deres heste. De talte ikke, for de tænkte over alt det kloge de ville sige.",
                        "tokens": [
                            { "text": "De", "type": "pro", "key": "de" },
                            { "text": " ", "type": "plain" },
                            { "text": "to", "type": "adj", "key": "to" },
                            { "text": " ", "type": "plain" },
                            { "text": "brødre", "type": "sub", "key": "bror" },
                            { "text": " ", "type": "plain" },
                            { "text": "red", "type": "vrb", "key": "ride" },
                            { "text": " ", "type": "plain" },
                            { "text": "foran", "type": "adv", "key": "foran" },
                            { "text": " ", "type": "plain" },
                            { "text": "på", "type": "prep", "key": "på" },
                            { "text": " ", "type": "plain" },
                            { "text": "deres", "type": "pro", "key": "deres" },
                            { "text": " ", "type": "plain" },
                            { "text": "heste", "type": "sub", "key": "hest" },
                            { "text": ". ", "type": "plain" },
                            { "text": "De", "type": "pro", "key": "de" },
                            { "text": " ", "type": "plain" },
                            { "text": "talte", "type": "vrb", "key": "tale" },
                            { "text": " ", "type": "plain" },
                            { "text": "ikke", "type": "adv", "key": "ikke" },
                            { "text": ", ", "type": "plain" },
                            { "text": "for", "type": "konj", "key": "for" },
                            { "text": " ", "type": "plain" },
                            { "text": "de", "type": "pro", "key": "de" },
                            { "text": " ", "type": "plain" },
                            { "text": "tænkte", "type": "vrb", "key": "tænke" },
                            { "text": " ", "type": "plain" },
                            { "text": "over", "type": "prep", "key": "over" },
                            { "text": " alt det ", "type": "plain" },
                            { "text": "kloge", "type": "adj", "key": "klog" },
                            { "text": " ", "type": "plain" },
                            { "text": "de", "type": "pro", "key": "de" },
                            { "text": " ", "type": "plain" },
                            { "text": "ville", "type": "vrb", "key": "ville" },
                            { "text": " ", "type": "plain" },
                            { "text": "sige", "type": "vrb", "key": "sige" },
                            { "text": ".", "type": "plain" }
                        ]
                    },
                    {
                        "speaker": "Klods-Hans",
                        "speakerIcon": "🐐",
                        "audioText": "Her kommer jeg! Se, hvad jeg har fundet på landevejen: Det er en død krage!",
                        "tokens": [
                            { "text": "Her", "type": "adv", "key": "her" },
                            { "text": " ", "type": "plain" },
                            { "text": "kommer", "type": "vrb", "key": "komme" },
                            { "text": " ", "type": "plain" },
                            { "text": "jeg", "type": "pro", "key": "jeg" },
                            { "text": "! ", "type": "plain" },
                            { "text": "Se", "type": "vrb", "key": "se" },
                            { "text": ", hvad ", "type": "plain" },
                            { "text": "jeg", "type": "pro", "key": "jeg" },
                            { "text": " ", "type": "plain" },
                            { "text": "har fundet", "type": "vrb", "key": "finde" },
                            { "text": " ", "type": "plain" },
                            { "text": "på", "type": "prep", "key": "på" },
                            { "text": " ", "type": "plain" },
                            { "text": "landevejen", "type": "sub", "key": "vej" },
                            { "text": ": ", "type": "plain" },
                            { "text": "Det", "type": "pro", "key": "det" },
                            { "text": " ", "type": "plain" },
                            { "text": "er", "type": "vrb", "key": "være" },
                            { "text": " en ", "type": "plain" },
                            { "text": "død", "type": "adj", "key": "død" },
                            { "text": " ", "type": "plain" },
                            { "text": "krage", "type": "sub", "key": "fugl" },
                            { "text": "!", "type": "plain" }
                        ],
                        "challenge": {
                            "type": "cloze_speech",
                            "title": "Mesterens replik: Udfyld & Udtale",
                            "badge": "👑 Mesterens replik",
                            "prompt": "Hvilket tillægsord (adjektiv) råber Klods-Hans om kragen?",
                            "sentenceTemplate": "Her kommer jeg! Se, hvad jeg har fundet: Det er en [ ___ ] krage!",
                            "options": [
                                "død",
                                "levende",
                                "klog",
                                "varm"
                            ],
                            "correct": "død",
                            "speechPrompt": "Udtal Klods-Hans' kække udråb højt: »Det er en død krage!«",
                            "audioText": "Det er en død krage!",
                            "explanation": "Flot! 'Død' beskriver kragens tilstand. Klods-Hans er pavestolt af sit første store fund på vejen!"
                        }
                    },
                    {
                        "speaker": "Brødrene",
                        "speakerIcon": "🎩",
                        "audioText": "Klods! Hvad vil du med en død krage?",
                        "tokens": [
                            { "text": "Klods! ", "type": "plain" },
                            { "text": "Hvad", "type": "pro", "key": "hvad" },
                            { "text": " ", "type": "plain" },
                            { "text": "vil", "type": "vrb", "key": "ville" },
                            { "text": " ", "type": "plain" },
                            { "text": "du", "type": "pro", "key": "du" },
                            { "text": " ", "type": "plain" },
                            { "text": "med", "type": "prep", "key": "med" },
                            { "text": " en ", "type": "plain" },
                            { "text": "død", "type": "adj", "key": "død" },
                            { "text": " ", "type": "plain" },
                            { "text": "krage", "type": "sub", "key": "fugl" },
                            { "text": "?", "type": "plain" }
                        ]
                    },
                    {
                        "speaker": "Klods-Hans",
                        "speakerIcon": "🐐",
                        "audioText": "Den vil jeg give til kongedatteren!",
                        "tokens": [
                            { "text": "Den", "type": "pro", "key": "den" },
                            { "text": " ", "type": "plain" },
                            { "text": "vil", "type": "vrb", "key": "ville" },
                            { "text": " ", "type": "plain" },
                            { "text": "jeg", "type": "pro", "key": "jeg" },
                            { "text": " ", "type": "plain" },
                            { "text": "give", "type": "vrb", "key": "give" },
                            { "text": " ", "type": "plain" },
                            { "text": "til", "type": "prep", "key": "til" },
                            { "text": " ", "type": "plain" },
                            { "text": "kongedatteren", "type": "sub", "key": "prinsesse" },
                            { "text": "!", "type": "plain" }
                        ]
                    },
                    {
                        "speaker": "Brødrene",
                        "speakerIcon": "🎩",
                        "audioText": "Haha! Gør du bare det!",
                        "tokens": [
                            { "text": "Haha! ", "type": "plain" },
                            { "text": "Gør", "type": "vrb", "key": "gøre" },
                            { "text": " ", "type": "plain" },
                            { "text": "du", "type": "pro", "key": "du" },
                            { "text": " ", "type": "plain" },
                            { "text": "bare", "type": "adv", "key": "bare" },
                            { "text": " ", "type": "plain" },
                            { "text": "det", "type": "pro", "key": "det" },
                            { "text": "! (de ler og rider videre)", "type": "plain" }
                        ]
                    },
                    {
                        "speaker": "Klods-Hans",
                        "speakerIcon": "🐐",
                        "audioText": "Her er jeg igen! Nu skal I se, hvad jeg har fundet: En gammel træsko!",
                        "tokens": [
                            { "text": "Her", "type": "adv", "key": "her" },
                            { "text": " ", "type": "plain" },
                            { "text": "er", "type": "vrb", "key": "være" },
                            { "text": " ", "type": "plain" },
                            { "text": "jeg", "type": "pro", "key": "jeg" },
                            { "text": " ", "type": "plain" },
                            { "text": "igen", "type": "adv", "key": "igen" },
                            { "text": "!", "type": "plain" }
                        ],
                        "challenge": {
                            "type": "ordstilling",
                            "title": "Mesterens replik: Inversion efter 'Nu'",
                            "badge": "👑 Mesterens replik",
                            "prompt": "Saml Klods-Hans' udråb med inversion efter tidsadverbiet 'Nu':",
                            "targetSentence": "Nu skal I se, hvad jeg har fundet!",
                            "tiles": [
                                "Nu",
                                "skal",
                                "I",
                                "se,",
                                "hvad",
                                "jeg",
                                "har",
                                "fundet!"
                            ],
                            "completedTokens": [
                                { "text": "Nu", "type": "adv", "key": "nu" },
                                { "text": " ", "type": "plain" },
                                { "text": "skal", "type": "vrb", "key": "skulle" },
                                { "text": " ", "type": "plain" },
                                { "text": "I", "type": "pro", "key": "i" },
                                { "text": " ", "type": "plain" },
                                { "text": "se", "type": "vrb", "key": "se" },
                                { "text": ", hvad ", "type": "plain" },
                                { "text": "jeg", "type": "pro", "key": "jeg" },
                                { "text": " ", "type": "plain" },
                                { "text": "har fundet", "type": "vrb", "key": "finde" },
                                { "text": ": En ", "type": "plain" },
                                { "text": "gammel", "type": "adj", "key": "gammel" },
                                { "text": " ", "type": "plain" },
                                { "text": "træsko", "type": "sub", "key": "træsko" },
                                { "text": "!", "type": "plain" }
                            ],
                            "explanation": "Perfekt! Når tidsadverbiet 'Nu' står forrest i forfeltet, bytter verbet ('skal') og subjektet ('I') plads (inversion)!"
                        }
                    },
                    {
                        "speaker": "Brødrene",
                        "speakerIcon": "🎩",
                        "audioText": "En gammel træsko? Skal kongedatteren også have den?",
                        "tokens": [
                            { "text": "En ", "type": "plain" },
                            { "text": "gammel", "type": "adj", "key": "gammel" },
                            { "text": " ", "type": "plain" },
                            { "text": "træsko", "type": "sub", "key": "træsko" },
                            { "text": "? ", "type": "plain" },
                            { "text": "Skal", "type": "vrb", "key": "skulle" },
                            { "text": " ", "type": "plain" },
                            { "text": "kongedatteren", "type": "sub", "key": "prinsesse" },
                            { "text": " ", "type": "plain" },
                            { "text": "også", "type": "adv", "key": "ogsaa" },
                            { "text": " ", "type": "plain" },
                            { "text": "have", "type": "vrb", "key": "have" },
                            { "text": " ", "type": "plain" },
                            { "text": "den", "type": "pro", "key": "den" },
                            { "text": "?", "type": "plain" }
                        ]
                    },
                    {
                        "speaker": "Klods-Hans",
                        "speakerIcon": "🐐",
                        "audioText": "Ja, det skal hun da!",
                        "tokens": [
                            { "text": "Ja, ", "type": "plain" },
                            { "text": "det", "type": "pro", "key": "det" },
                            { "text": " ", "type": "plain" },
                            { "text": "skal", "type": "vrb", "key": "skulle" },
                            { "text": " ", "type": "plain" },
                            { "text": "hun", "type": "pro", "key": "hun" },
                            { "text": " ", "type": "plain" },
                            { "text": "da", "type": "adv", "key": "da" },
                            { "text": "!", "type": "plain" }
                        ]
                    },
                    {
                        "speaker": "Klods-Hans",
                        "speakerIcon": "🐐",
                        "audioText": "Halehoj! Nu bliver det endnu bedre! Se, hvad jeg har gravet op af grøften!",
                        "tokens": [
                            { "text": "Halehoj! ", "type": "plain" },
                            { "text": "Nu", "type": "adv", "key": "nu" },
                            { "text": " ", "type": "plain" },
                            { "text": "bliver", "type": "vrb", "key": "blive" },
                            { "text": " ", "type": "plain" },
                            { "text": "det", "type": "pro", "key": "det" },
                            { "text": " ", "type": "plain" },
                            { "text": "endnu", "type": "adv", "key": "endnu" },
                            { "text": " ", "type": "plain" },
                            { "text": "bedre", "type": "adj", "key": "god" },
                            { "text": "! ", "type": "plain" },
                            { "text": "Se", "type": "vrb", "key": "se" },
                            { "text": ", hvad ", "type": "plain" },
                            { "text": "jeg", "type": "pro", "key": "jeg" },
                            { "text": " ", "type": "plain" },
                            { "text": "har gravet", "type": "vrb", "key": "grave" },
                            { "text": " ", "type": "plain" },
                            { "text": "op", "type": "adv", "key": "op" },
                            { "text": " ", "type": "plain" },
                            { "text": "af", "type": "prep", "key": "af" },
                            { "text": " ", "type": "plain" },
                            { "text": "grøften", "type": "sub", "key": "grøft" },
                            { "text": "!", "type": "plain" }
                        ]
                    },
                    {
                        "speaker": "Brødrene",
                        "speakerIcon": "🎩",
                        "audioText": "Adr, hvor ulækkert, Klods-Hans! Det er jo mudder fra grøften!",
                        "tokens": [
                            { "text": "Adr, hvor ", "type": "plain" },
                            { "text": "ulækkert", "type": "adj", "key": "ulækker" },
                            { "text": ", Klods-Hans! ", "type": "plain" },
                            { "text": "Det", "type": "pro", "key": "det" },
                            { "text": " ", "type": "plain" },
                            { "text": "er", "type": "vrb", "key": "være" },
                            { "text": " ", "type": "plain" },
                            { "text": "jo", "type": "adv", "key": "jo" },
                            { "text": " ", "type": "plain" },
                            { "text": "mudder", "type": "sub", "key": "mudder" },
                            { "text": " ", "type": "plain" },
                            { "text": "fra", "type": "prep", "key": "fra" },
                            { "text": " ", "type": "plain" },
                            { "text": "grøften", "type": "sub", "key": "grøft" },
                            { "text": "!", "type": "plain" }
                        ]
                    },
                    {
                        "speaker": "Klods-Hans",
                        "speakerIcon": "🐐",
                        "audioText": "Ja, og det er den fineste slags! Hvor vil hun blive glad!",
                        "tokens": [
                            { "text": "Ja, ", "type": "plain" },
                            { "text": "og", "type": "konj", "key": "og" },
                            { "text": " ", "type": "plain" },
                            { "text": "det", "type": "pro", "key": "det" },
                            { "text": " ", "type": "plain" },
                            { "text": "er", "type": "vrb", "key": "være" },
                            { "text": " den ", "type": "plain" },
                            { "text": "fineste", "type": "adj", "key": "fin" },
                            { "text": " ", "type": "plain" },
                            { "text": "slags", "type": "sub", "key": "slags" },
                            { "text": "! ", "type": "plain" },
                            { "text": "Hvor", "type": "adv", "key": "hvor" },
                            { "text": " ", "type": "plain" },
                            { "text": "vil", "type": "vrb", "key": "ville" },
                            { "text": " ", "type": "plain" },
                            { "text": "hun", "type": "pro", "key": "hun" },
                            { "text": " ", "type": "plain" },
                            { "text": "blive", "type": "vrb", "key": "blive" },
                            { "text": " ", "type": "plain" },
                            { "text": "glad", "type": "adj", "key": "glad" },
                            { "text": "!", "type": "plain" }
                        ]
                    }
                ],
                "tasks": {
                    "detektiv": {
                        "title": "Visuel detektiv",
                        "badge": "🔍 Visuel detektiv",
                        "icon": "🔍",
                        "desc": "Kig grundigt på vrimlebilledet af landevejen og find de centrale spor:",
                        "questions": [
                            {
                                "id": "s2_d1",
                                "prompt": "Hvem rider forrest på landevejen mod slottet?",
                                "options": [
                                    "Klods-Hans' to kloge brødre på fine heste",
                                    "Kongens soldater",
                                    "Klods-Hans på sin ged",
                                    "Faren fra bondegården"
                                ],
                                "correct": 0,
                                "explanation": "Rigtigt! De to ældre brødre rider foran på deres stolte heste og tænker over deres taler."
                            },
                            {
                                "id": "s2_d2",
                                "prompt": "Hvor befinder Klods-Hans sig på billedet?",
                                "options": [
                                    "Han rider bagefter brødrene på sin hvide ged",
                                    "Han går til fods ved siden af vejen",
                                    "Han sidder oppe i et træ",
                                    "Han er allerede nået frem til slottet"
                                ],
                                "correct": 0,
                                "explanation": "Præcis! Klods-Hans kommer ridende bagefter brødrene i fuld fart på sin gedebuk!"
                            },
                            {
                                "id": "s2_d3",
                                "prompt": "Hvad løfter Klods-Hans stolt op i hånden, mens han råber 'Halehoj!'?",
                                "options": [
                                    "En død sort krage",
                                    "En guldnøgle",
                                    "Et flag",
                                    "En ridepisk"
                                ],
                                "correct": 0,
                                "explanation": "Flot spottet! Klods-Hans vifter med den døde krage, som han fandt på landevejen."
                            },
                            {
                                "id": "s2_d4",
                                "prompt": "Hvad ligger der nede i vejkanten i det våde mudder / pludder?",
                                "options": [
                                    "En gammel træsko",
                                    "En tabt pung",
                                    "En jernkniv",
                                    "En hestesko"
                                ],
                                "correct": 0,
                                "explanation": "Korrekt! I grøftens mudder ligger en gammel træsko uden overstykke."
                            }
                        ]
                    },
                    "substantiver": {
                        "title": "Substantiver: Over- og underbegreber",
                        "badge": "🟢 Over- & underbegreber",
                        "icon": "🟢",
                        "desc": "Træn overbegreber og underbegreber for tingene langs landevejen:",
                        "questions": [
                            {
                                "id": "s2_s1",
                                "badge": "🟢 Overbegreb",
                                "prompt": "Klods-Hans finder en krage på vejen. Hvilket overbegreb tilhører **en krage**?",
                                "options": [
                                    "En fugl",
                                    "Et pattedyr",
                                    "En fisk",
                                    "Et krybdyr"
                                ],
                                "correct": 0,
                                "explanation": "*Fugl* er overbegrebet, og *en krage* er et specifikt underbegreb."
                            },
                            {
                                "id": "s2_s2",
                                "badge": "🟢 Overbegreb",
                                "prompt": "Klods-Hans finder en gammel træsko. Hvad er overbegrebet for **en træsko**?",
                                "options": [
                                    "Fodtøj (eller sko)",
                                    "Et transportmiddel",
                                    "Et haveværktøj",
                                    "Et musikinstrument"
                                ],
                                "correct": 0,
                                "explanation": "*Fodtøj* er overbegrebet. Underbegreber er f.eks. *træsko*, *støvler*, *sneakers* og *sandaler*."
                            },
                            {
                                "id": "s2_s3",
                                "badge": "🟢 Synonym & Begreb",
                                "prompt": "Brødrene råber: 'Det er jo mudder fra grøften!' Hvilket ord er et synonym for **mudder**?",
                                "options": [
                                    "Pludder (eller pløre)",
                                    "Sand",
                                    "Sten",
                                    "Græs"
                                ],
                                "correct": 0,
                                "explanation": "*Mudder* og *pludder* (eller *pløre*) er synonymer for våd, fedtet jord i en grøft."
                            }
                        ]
                    },
                    "verber": {
                        "title": "Verber: Modsætninger og synonymer",
                        "badge": "🔴 Modsætninger & synonymer",
                        "icon": "🔴",
                        "desc": "Træn verbernes modsætninger og synonymer under rejsen:",
                        "questions": [
                            {
                                "id": "s2_v1",
                                "badge": "🔴 Modsætning (Antonym)",
                                "prompt": "Klods-Hans råber: 'Se hvad jeg har fundet!' Hvad er det modsatte af **at finde**?",
                                "options": [
                                    "at tabe / miste",
                                    "at lede",
                                    "at beholde",
                                    "at købe"
                                ],
                                "correct": 0,
                                "explanation": "Når du *finder* noget, opdager du det. Hvis du *mister* eller *taber* det, har du det ikke længere."
                            },
                            {
                                "id": "s2_v2",
                                "badge": "🔴 Synonym",
                                "prompt": "Brødrene rider stille og tænker over kloge ord. Hvilket verbum er et synonym til **at tænke**?",
                                "options": [
                                    "at overveje / spekulere",
                                    "at sove",
                                    "at råbe",
                                    "at løbe"
                                ],
                                "correct": 0,
                                "explanation": "*At tænke*, *at spekulere* og *at overveje* betyder næsten det samme (synonymer)."
                            },
                            {
                                "id": "s2_v3",
                                "badge": "🔴 Synonym",
                                "prompt": "Brødrene griner og ler af Klods-Hans. Hvilket verbum er et synonym til **at le**?",
                                "options": [
                                    "at grine",
                                    "at græde",
                                    "at råbe",
                                    "at klage"
                                ],
                                "correct": 0,
                                "explanation": "*At le* og *at grine* er synonymer. Det modsatte er *at græde*."
                            }
                        ]
                    },
                    "adjektiver": {
                        "title": "Adjektiver: Modsætninger og gradbøjning",
                        "badge": "🟠 Modsætninger & gradbøjning",
                        "icon": "🟠",
                        "desc": "Træn tillægsord der beskriver fundene og personerne:",
                        "questions": [
                            {
                                "id": "s2_a1",
                                "badge": "🟠 Modsætning (Antonym)",
                                "prompt": "Klods-Hans finder en død krage. Hvad er det modsatte af **død**?",
                                "options": [
                                    "levende",
                                    "gammel",
                                    "våd",
                                    "klog"
                                ],
                                "correct": 0,
                                "explanation": "Det modsatte af *død* er *levende*."
                            },
                            {
                                "id": "s2_a2",
                                "badge": "🟠 Modsætning (Antonym)",
                                "prompt": "Træskoen er gammel. Hvad er det modsatte af **gammel** (om ting)?",
                                "options": [
                                    "ny",
                                    "tung",
                                    "varm",
                                    "hurtig"
                                ],
                                "correct": 0,
                                "explanation": "En ting er enten *gammel* eller *ny* (om personer bruges modpolen *ung*)."
                            },
                            {
                                "id": "s2_a3",
                                "badge": "🟠 Gradbøjning",
                                "prompt": "Klods-Hans siger at mudderet er af den 'fineste slags'. Hvordan gradbøjes **fin**?",
                                "options": [
                                    "fin – finere – finest",
                                    "fin – mere fin – mest fin",
                                    "fin – finere – bedst",
                                    "god – bedre – bedst"
                                ],
                                "correct": 0,
                                "explanation": "*Fin* gradbøjes regelmæssigt med -ere og -est: *fin – finere – finest*."
                            }
                        ]
                    },
                    "adverbier": {
                        "title": "Adverbier: Position og bevægelse",
                        "badge": "🔵 Position & bevægelse",
                        "icon": "🔵",
                        "desc": "Træn steds- og tidsadverbier der beskriver brødrenes og Klods-Hans' ridt:",
                        "questions": [
                            {
                                "id": "s2_adv1",
                                "badge": "🔵 Stedsadverbium & Position",
                                "prompt": "Brødrene rider **foran**, og Klods-Hans rider **bagefter**. Hvad angiver disse to ord?",
                                "options": [
                                    "Position i rummet i forhold til hinanden (stedsadverbier)",
                                    "Tidspunkt på dagen (tidsadverbier)",
                                    "En følelse hos personerne",
                                    "Graden af hastighed"
                                ],
                                "correct": 0,
                                "explanation": "*Foran* og *bagefter* er stedsadverbier, der angiver den indbyrdes placering."
                            },
                            {
                                "id": "s2_adv2",
                                "badge": "🔵 Tidsadverbium",
                                "prompt": "Klods-Hans råber: 'Nu skal I se!' Hvilket udtryk er et synonym til tidsadverbiet **nu**?",
                                "options": [
                                    "i dette øjeblik / straks",
                                    "i går",
                                    "aldrig",
                                    "senere"
                                ],
                                "correct": 0,
                                "explanation": "*Nu* henviser til det præcise nutidige øjeblik (i dette sekund)."
                            },
                            {
                                "id": "s2_adv3",
                                "badge": "🔵 Bevægelsesadverbium",
                                "prompt": "Brødrene ler og rider **videre**. Hvad angiver adverbiet **videre** her?",
                                "options": [
                                    "Fortsættelse af bevægelsen fremad",
                                    "At de vender om",
                                    "At de standser helt op",
                                    "At de rider hurtigere"
                                ],
                                "correct": 0,
                                "explanation": "*Videre* angiver en fortsættelse af en handling eller bevægelse ('at ride videre mod slottet')."
                            }
                        ]
                    }
                }
            },
            {
                "chapter": "Scene 3: I riddersalen ved slottet",
                "chapterEn": "Scene 3: In the Great Hall",
                "vrimmelImage": "assets/klods_hans_scene3.jpg",
                "audioText": "Kongen råbte: Vis hvad I kan! Storebror svedte: Det er så varmt. Jeg kan ikke huske! Mellembror så sig rundt: Jeg har glemt hvad jeg vil sige. Det er alt for varmt! Klods-Hans sagde muntert: Hej! Jeg kom på min ged. Jeg har en død krage og en træsko med mudder! Prinsessen grinede: Fortæl mere, Klods-Hans! Hvordan vil du bruge kragen? Klods-Hans svarede: Jeg tænkte på at stege den og lave god mad! Prinsessen spurgte: Og hvad vil du stege den i? Klods-Hans svarede: I træskoen, selvfølgelig! Prinsessen spurgte: Og sovsen? Hvad med den? Klods-Hans viste mudderet frem: Den er her! Prinsessen grinede højt: Du er virkelig anderledes, Klods-Hans! Du har en sjov måde at se tingene på! Kongen sagde: Det ser ud til, at prinsessen har valgt. Klods-Hans, du har vundet hendes hjerte! Alle råbte: Hurra for Klods-Hans og prinsessen!",
                "text": "Kongen: »Vis, hvad I kan!«\n\nStorebror: (sveder) »Det er så varmt... Jeg kan ikke huske...«\n\nMellembror: (ser rundt) »Jeg har glemt, hvad jeg vil sige... Det er alt for varmt!«\n\nKlods-Hans: »Hej! Jeg kom på en ged. Jeg har en død krage og en træsko med mudder.«\n\nPrinsessen: (griner) »Fortæl mere, Klods-Hans! Hvordan vil du bruge kragen?«\n\nKlods-Hans: »Jeg tænkte på at stege den og lave god mad!«\n\nPrinsessen: »Og hvad vil du stege den i?«\n\nKlods-Hans: »I træskoen, selvfølgelig!«\n\nPrinsessen: »Og sovsen? Hvad med den?«\n\nKlods-Hans: »Den er her!« (viser mudderet frem)\n\nPrinsessen: (griner højt) »Du er virkelig anderledes, Klods-Hans! Du har en sjov måde at se tingene på.«\n\nKongen: »Det ser ud til, at prinsessen har valgt. Klods-Hans, du har vundet hendes hjerte!«\n\nAlle: »Hurra for Klods-Hans og prinsessen!«",
                "hotspots": [
                    {
                        "x": 78,
                        "y": 52,
                        "type": "sub",
                        "word": "prinsesse",
                        "label": "en prinsesse",
                        "info": "Substantiv: en prinsesse"
                    },
                    {
                        "x": 86,
                        "y": 53,
                        "type": "sub",
                        "word": "konge",
                        "label": "en konge",
                        "info": "Substantiv: en konge"
                    },
                    {
                        "x": 74,
                        "y": 55,
                        "type": "adj",
                        "word": "varm",
                        "label": "varm ovn",
                        "info": "Adjektiv: varm"
                    },
                    {
                        "x": 61,
                        "y": 40,
                        "type": "sub",
                        "word": "fugl",
                        "label": "kragen",
                        "info": "Substantiv: en krage"
                    },
                    {
                        "x": 55,
                        "y": 35,
                        "type": "sub",
                        "word": "sko",
                        "label": "træskoen",
                        "info": "Substantiv: en sko"
                    },
                    {
                        "x": 67,
                        "y": 42,
                        "type": "sub",
                        "word": "mudder",
                        "label": "sovs (mudder)",
                        "info": "Substantiv: mudder"
                    },
                    {
                        "x": 64,
                        "y": 69,
                        "type": "sub",
                        "word": "ged",
                        "label": "geden",
                        "info": "Substantiv: en ged"
                    },
                    {
                        "x": 13,
                        "y": 53,
                        "type": "vrb",
                        "word": "huske",
                        "label": "huske",
                        "info": "Verbum: at huske"
                    },
                    {
                        "x": 23,
                        "y": 56,
                        "type": "vrb",
                        "word": "glemme",
                        "label": "glemt",
                        "info": "Verbum: at glemme"
                    }
                ],
                "dialogue": [
                    {
                        "speaker": "Kongen",
                        "speakerIcon": "👑",
                        "audioText": "Vis hvad I kan!",
                        "tokens": [
                            {
                                "text": "Vis",
                                "type": "vrb",
                                "key": "vise"
                            },
                            {
                                "text": ", hvad ",
                                "type": "plain"
                            },
                            {
                                "text": "I",
                                "type": "pro",
                                "key": "i"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "kan",
                                "type": "vrb",
                                "key": "kunne"
                            },
                            {
                                "text": "!",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Storebror",
                        "speakerIcon": "🎩",
                        "audioText": "Det er så varmt. Jeg kan ikke huske.",
                        "tokens": [
                            {
                                "text": "(sveder) ",
                                "type": "plain"
                            },
                            {
                                "text": "Det",
                                "type": "pro",
                                "key": "det"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "er",
                                "type": "vrb",
                                "key": "være"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "så",
                                "type": "adv",
                                "key": "så"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "varmt",
                                "type": "adj",
                                "key": "varm"
                            },
                            {
                                "text": "... ",
                                "type": "plain"
                            },
                            {
                                "text": "Jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "kan",
                                "type": "vrb",
                                "key": "kunne"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "ikke",
                                "type": "adv",
                                "key": "ikke"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "huske",
                                "type": "vrb",
                                "key": "huske"
                            },
                            {
                                "text": "...",
                                "type": "plain"
                            }
                        ],
                        "challenge": {
                            "type": "cloze_speech",
                            "title": "Mesterens replik: Centraladverbiets plads",
                            "badge": "👑 Mesterens replik",
                            "prompt": "Indsæt det vigtige centraladverbium der benægter handlingen:",
                            "sentenceTemplate": "Jeg kan [ ___ ] huske.",
                            "options": [
                                "ikke",
                                "altid",
                                "måske",
                                "gerne"
                            ],
                            "correct": "ikke",
                            "speechPrompt": "Udtal sætningen med sved på panden ligesom Storebror: »Det er så varmt. Jeg kan ikke huske.«",
                            "audioText": "Det er så varmt. Jeg kan ikke huske.",
                            "explanation": "Lige præcis! I en hovedsætning placeres centraladverbiet 'ikke' altid lige efter det bøjede verbum ('kan')."
                        }
                    },
                    {
                        "speaker": "Mellembror",
                        "speakerIcon": "📜",
                        "audioText": "Jeg har glemt hvad jeg vil sige. Det er alt for varmt!",
                        "tokens": [
                            {
                                "text": "(kigger rundt) ",
                                "type": "plain"
                            },
                            {
                                "text": "Jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "har glemt",
                                "type": "vrb",
                                "key": "glemme"
                            },
                            {
                                "text": ", hvad ",
                                "type": "plain"
                            },
                            {
                                "text": "jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "vil",
                                "type": "vrb",
                                "key": "ville"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "sige",
                                "type": "vrb",
                                "key": "sige"
                            },
                            {
                                "text": "... ",
                                "type": "plain"
                            },
                            {
                                "text": "Det",
                                "type": "pro",
                                "key": "det"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "er",
                                "type": "vrb",
                                "key": "være"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "alt for",
                                "type": "adv",
                                "key": "alt_for"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "varmt",
                                "type": "adj",
                                "key": "varm"
                            },
                            {
                                "text": "!",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Klods-Hans",
                        "speakerIcon": "🐐",
                        "audioText": "Hej! Jeg kom på en ged. Jeg har en død krage og en træsko med mudder.",
                        "tokens": [
                            {
                                "text": "Hej! ",
                                "type": "plain"
                            },
                            {
                                "text": "Jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "kom",
                                "type": "vrb",
                                "key": "komme"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "på",
                                "type": "prep",
                                "key": "på"
                            },
                            {
                                "text": " en ",
                                "type": "plain"
                            },
                            {
                                "text": "ged",
                                "type": "sub",
                                "key": "ged"
                            },
                            {
                                "text": ". ",
                                "type": "plain"
                            },
                            {
                                "text": "Jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "har",
                                "type": "vrb",
                                "key": "have"
                            },
                            {
                                "text": " en ",
                                "type": "plain"
                            },
                            {
                                "text": "død",
                                "type": "adj",
                                "key": "død"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "krage",
                                "type": "sub",
                                "key": "fugl"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "og",
                                "type": "konj",
                                "key": "og"
                            },
                            {
                                "text": " en ",
                                "type": "plain"
                            },
                            {
                                "text": "træsko",
                                "type": "sub",
                                "key": "sko"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "med",
                                "type": "prep",
                                "key": "med"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "mudder",
                                "type": "sub",
                                "key": "mudder"
                            },
                            {
                                "text": ".",
                                "type": "plain"
                            }
                        ],
                        "challenge": {
                            "type": "ordstilling",
                            "title": "Mesterens replik: Klods-Hans' kvikke svar",
                            "badge": "👑 Mesterens replik",
                            "prompt": "Saml Klods-Hans' kække replik til prinsessen:",
                            "targetSentence": "Det kan vi koge i træskoen!",
                            "tiles": [
                                "Det",
                                "kan",
                                "vi",
                                "koge",
                                "i",
                                "træskoen!"
                            ],
                            "speechPrompt": "Prøv at gentage replikken med Klods-Hans' glade selvtillid: »Det kan vi koge i træskoen!«",
                            "audioText": "Det kan vi koge i træskoen!",
                            "explanation": "Fremragende! Klods-Hans har svar på alting og mister aldrig mælet i varmen!"
                        }
                    },
                    {
                        "speaker": "Prinsessen",
                        "speakerIcon": "👸",
                        "audioText": "Fortæl mere, Klods-Hans! Hvordan vil du bruge kragen?",
                        "tokens": [
                            {
                                "text": "(griner) ",
                                "type": "plain"
                            },
                            {
                                "text": "Fortæl",
                                "type": "vrb",
                                "key": "fortælle"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "mere",
                                "type": "adv",
                                "key": "mere"
                            },
                            {
                                "text": ", Klods-Hans! Hvordan ",
                                "type": "plain"
                            },
                            {
                                "text": "vil",
                                "type": "vrb",
                                "key": "ville"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "du",
                                "type": "pro",
                                "key": "du"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "bruge",
                                "type": "vrb",
                                "key": "bruge"
                            },
                            {
                                "text": " kragen?",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Klods-Hans",
                        "speakerIcon": "🐐",
                        "audioText": "Jeg tænkte på at stege den og lave god mad!",
                        "tokens": [
                            {
                                "text": "Jeg",
                                "type": "pro",
                                "key": "jeg"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "tænkte",
                                "type": "vrb",
                                "key": "tænke"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "på",
                                "type": "prep",
                                "key": "på"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "at",
                                "type": "konj",
                                "key": "at"
                            },
                            {
                                "text": " stege ",
                                "type": "plain"
                            },
                            {
                                "text": "den",
                                "type": "pro",
                                "key": "den"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "og",
                                "type": "konj",
                                "key": "og"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "lave",
                                "type": "vrb",
                                "key": "gøre"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "god",
                                "type": "adj",
                                "key": "god"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "mad",
                                "type": "sub",
                                "key": "mad"
                            },
                            {
                                "text": "!",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Prinsessen",
                        "speakerIcon": "👸",
                        "audioText": "Og hvad vil du stege den i?",
                        "tokens": [
                            {
                                "text": "Og",
                                "type": "konj",
                                "key": "og"
                            },
                            {
                                "text": " hvad ",
                                "type": "plain"
                            },
                            {
                                "text": "vil",
                                "type": "vrb",
                                "key": "ville"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "du",
                                "type": "pro",
                                "key": "du"
                            },
                            {
                                "text": " stege ",
                                "type": "plain"
                            },
                            {
                                "text": "den",
                                "type": "pro",
                                "key": "den"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "i",
                                "type": "prep",
                                "key": "i"
                            },
                            {
                                "text": "?",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Klods-Hans",
                        "speakerIcon": "🐐",
                        "audioText": "I træskoen, selvfølgelig!",
                        "tokens": [
                            {
                                "text": "I",
                                "type": "prep",
                                "key": "i"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "træskoen",
                                "type": "sub",
                                "key": "sko"
                            },
                            {
                                "text": ", ",
                                "type": "plain"
                            },
                            {
                                "text": "selvfølgelig",
                                "type": "adv",
                                "key": "selvfoelgelig"
                            },
                            {
                                "text": "!",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Prinsessen",
                        "speakerIcon": "👸",
                        "audioText": "Og sovsen? Hvad med den?",
                        "tokens": [
                            {
                                "text": "Og",
                                "type": "konj",
                                "key": "og"
                            },
                            {
                                "text": " sovsen? Hvad ",
                                "type": "plain"
                            },
                            {
                                "text": "med",
                                "type": "prep",
                                "key": "med"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "den",
                                "type": "pro",
                                "key": "den"
                            },
                            {
                                "text": "?",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Klods-Hans",
                        "speakerIcon": "🐐",
                        "audioText": "Den er her!",
                        "tokens": [
                            {
                                "text": "Den",
                                "type": "pro",
                                "key": "den"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "er",
                                "type": "vrb",
                                "key": "være"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "her",
                                "type": "adv",
                                "key": "her"
                            },
                            {
                                "text": "! (viser mudderet frem)",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Prinsessen",
                        "speakerIcon": "👸",
                        "audioText": "Du er virkelig anderledes, Klods-Hans! Du har en sjov måde at se tingene på.",
                        "tokens": [
                            {
                                "text": "(griner højt) ",
                                "type": "plain"
                            },
                            {
                                "text": "Du",
                                "type": "pro",
                                "key": "du"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "er",
                                "type": "vrb",
                                "key": "være"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "virkelig",
                                "type": "adv",
                                "key": "virkelig"
                            },
                            {
                                "text": " anderledes, Klods-Hans! ",
                                "type": "plain"
                            },
                            {
                                "text": "Du",
                                "type": "pro",
                                "key": "du"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "har",
                                "type": "vrb",
                                "key": "have"
                            },
                            {
                                "text": " en sjov måde ",
                                "type": "plain"
                            },
                            {
                                "text": "at",
                                "type": "konj",
                                "key": "at"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "se",
                                "type": "vrb",
                                "key": "se"
                            },
                            {
                                "text": " tingene ",
                                "type": "plain"
                            },
                            {
                                "text": "på",
                                "type": "prep",
                                "key": "på"
                            },
                            {
                                "text": ".",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Kongen",
                        "speakerIcon": "👑",
                        "audioText": "Det ser ud til, at prinsessen har valgt. Klods-Hans, du har vundet hendes hjerte!",
                        "tokens": [
                            {
                                "text": "Det",
                                "type": "pro",
                                "key": "det"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "ser",
                                "type": "vrb",
                                "key": "se"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "ud",
                                "type": "adv",
                                "key": "ud"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "til",
                                "type": "prep",
                                "key": "til"
                            },
                            {
                                "text": ", ",
                                "type": "plain"
                            },
                            {
                                "text": "at",
                                "type": "konj",
                                "key": "at"
                            },
                            {
                                "text": " prinsessen ",
                                "type": "plain"
                            },
                            {
                                "text": "har valgt",
                                "type": "vrb",
                                "key": "vælge"
                            },
                            {
                                "text": ". Klods-Hans, ",
                                "type": "plain"
                            },
                            {
                                "text": "du",
                                "type": "pro",
                                "key": "du"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "har vundet",
                                "type": "vrb",
                                "key": "vinde"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "hendes",
                                "type": "pro",
                                "key": "hendes"
                            },
                            {
                                "text": " ",
                                "type": "plain"
                            },
                            {
                                "text": "hjerte",
                                "type": "sub",
                                "key": "hjerte"
                            },
                            {
                                "text": "!",
                                "type": "plain"
                            }
                        ]
                    },
                    {
                        "speaker": "Alle",
                        "speakerIcon": "🎉",
                        "audioText": "Hurra for Klods-Hans og prinsessen!",
                        "tokens": [
                            {
                                "text": "Hurra ",
                                "type": "plain"
                            },
                            {
                                "text": "for",
                                "type": "prep",
                                "key": "for"
                            },
                            {
                                "text": " Klods-Hans ",
                                "type": "plain"
                            },
                            {
                                "text": "og",
                                "type": "konj",
                                "key": "og"
                            },
                            {
                                "text": " prinsessen!",
                                "type": "plain"
                            }
                        ]
                    }
                ],
                "tasks": {
                    "detektiv": {
                        "title": "Visuel detektiv",
                        "badge": "🔍 Visuel detektiv",
                        "icon": "🔍",
                        "desc": "Kig grundigt på vrimlebilledet af riddersalen og find de afgørende detaljer:",
                        "questions": [
                            {
                                "id": "s3_d1",
                                "prompt": "Hvad står midt i riddersalen og gløder, så brødrene begynder at svede?",
                                "options": [
                                    "En stor brændeovn / kamin med rød ild",
                                    "En fryseboks",
                                    "En lysekrone",
                                    "En fontæne"
                                ],
                                "correct": 0,
                                "explanation": "Rigtigt! Kaminen er fyret helt op med glødende kul, så temperaturen stiger voldsomt!"
                            },
                            {
                                "id": "s3_d2",
                                "prompt": "Hvad gør prinsessen på tronen, da Klods-Hans svarer hende så frisk?",
                                "options": [
                                    "Hun ler højt og morer sig",
                                    "Hun græder af frygt",
                                    "Hun sover",
                                    "Hun forlader salen"
                                ],
                                "correct": 0,
                                "explanation": "Præcis! Prinsessen synes Klods-Hans er herlig og fuld af sjovt, kvikt modspil!"
                            },
                            {
                                "id": "s3_d3",
                                "prompt": "Hvad holder Klods-Hans frem foran ovnen i sin gamle træsko?",
                                "options": [
                                    "Den døde krage med muddersauce",
                                    "En guldring",
                                    "En buket roser",
                                    "En kage"
                                ],
                                "correct": 0,
                                "explanation": "Lige i øjet! Klods-Hans vil stege kragen i træskoen og overhælder den med muddersovs!"
                            },
                            {
                                "id": "s3_d4",
                                "prompt": "Hvordan reagerer de to kloge brødre i baggrunden?",
                                "options": [
                                    "De sveder, måber og har glemt alle ord",
                                    "De synger en sang",
                                    "De danser",
                                    "De hepper på Klods-Hans"
                                ],
                                "correct": 0,
                                "explanation": "Korrekt! Brødrene blev så overvældede af varmen og nervøsiteten, at de mistede mælet helt."
                            }
                        ]
                    },
                    "substantiver": {
                        "title": "Substantiver: Over- og underbegreber",
                        "badge": "🟢 Over- & underbegreber",
                        "icon": "🟢",
                        "desc": "Træn over- og underbegreber for slottets genstande og roller:",
                        "questions": [
                            {
                                "id": "s3_s1",
                                "badge": "🟢 Overbegreb",
                                "prompt": "I riddersalen står en glødende kamin/ovn. Hvad er overbegrebet for **en ovn / kamin**?",
                                "options": [
                                    "En varmekilde (eller et ildsted)",
                                    "Et transportmiddel",
                                    "Et stykke legetøj",
                                    "En drikkevare"
                                ],
                                "correct": 0,
                                "explanation": "Både en ovn, et bål og en kamin er *varmekilder*, der bruges til varme og madlavning."
                            },
                            {
                                "id": "s3_s2",
                                "badge": "🟢 Overbegreb",
                                "prompt": "Kongen og hans datter er til stede. Hvad er overbegrebet for **en konge** og **en prinsesse**?",
                                "options": [
                                    "Kongelige titler / kongelige personer",
                                    "Håndværkere",
                                    "Dyr på landet",
                                    "Musikinstrumenter"
                                ],
                                "correct": 0,
                                "explanation": "Konge, dronning, prins og prinsesse er *kongelige titler og personer*."
                            },
                            {
                                "id": "s3_s3",
                                "badge": "🟢 Underbegreb",
                                "prompt": "Klods-Hans har mudder med i lommen. Hvilket madlavnings-begreb vil han bruge mudderet som?",
                                "options": [
                                    "En sauce / sovs (tilbehør til maden)",
                                    "En dessert",
                                    "En suppe",
                                    "En salat"
                                ],
                                "correct": 0,
                                "explanation": "Klods-Hans kalder kækt mudderet for den fineste sauce/sovs til den stegte krage!"
                            }
                        ]
                    },
                    "verber": {
                        "title": "Verber: Modsætninger og synonymer",
                        "badge": "🔴 Modsætninger & synonymer",
                        "icon": "🔴",
                        "desc": "Træn udsagnsord i den afgørende samtale hos prinsessen:",
                        "questions": [
                            {
                                "id": "s3_v1",
                                "badge": "🔴 Modsætning (Antonym)",
                                "prompt": "Storebror siger: 'Jeg kan ikke huske.' Hvad er det modsatte af **at huske**?",
                                "options": [
                                    "at glemme",
                                    "at vide",
                                    "at lære",
                                    "at tænke"
                                ],
                                "correct": 0,
                                "explanation": "Når du kan genkalde en viden, *husker* du. Hvis det forsvinder, har du *glemt* det."
                            },
                            {
                                "id": "s3_v2",
                                "badge": "🔴 Synonym",
                                "prompt": "Prinsessen siger: 'Det kan vi koge!' Hvilket begreb er et synonym til **at koge** mad i væske?",
                                "options": [
                                    "at tilberede ved 100 grader",
                                    "at fryse ned",
                                    "at spise koldt",
                                    "at kaste væk"
                                ],
                                "correct": 0,
                                "explanation": "*At koge* vil sige at tilberede madvarer i kogende væske."
                            },
                            {
                                "id": "s3_v3",
                                "badge": "🔴 Synonym",
                                "prompt": "Prinsessen siger: 'Du har svar på alting!' Hvilket verbum er et synonym til **at svare**?",
                                "options": [
                                    "at replikere / give gensvar",
                                    "at spørge",
                                    "at tie",
                                    "at græde"
                                ],
                                "correct": 0,
                                "explanation": "*At svare* og *at replikere* vil sige at give et svar tilbage."
                            }
                        ]
                    },
                    "adjektiver": {
                        "title": "Adjektiver: Modsætninger og gradbøjning",
                        "badge": "🟠 Modsætninger & gradbøjning",
                        "icon": "🟠",
                        "desc": "Træn egenskaber og temperatur i den hede riddersal:",
                        "questions": [
                            {
                                "id": "s3_a1",
                                "badge": "🟠 Modsætning (Antonym)",
                                "prompt": "I riddersalen er der meget varmt. Hvad er det modsatte af **varm**?",
                                "options": [
                                    "kold",
                                    "lun",
                                    "våd",
                                    "tung"
                                ],
                                "correct": 0,
                                "explanation": "Modpolen til *varm* er *kold* (*varmt* ↔ *koldt*)."
                            },
                            {
                                "id": "s3_a2",
                                "badge": "🟠 Gradbøjning",
                                "prompt": "Hvordan gradbøjes det regelmæssige adjektiv **varm**?",
                                "options": [
                                    "varm – varmere – varmest",
                                    "varm – mere varm – mest varm",
                                    "varm – hedest – heder",
                                    "varm – varmt – varme"
                                ],
                                "correct": 0,
                                "explanation": "*Varm* gradbøjes regelmæssigt med *-ere* og *-est*: *varm – varmere – varmest*."
                            },
                            {
                                "id": "s3_a3",
                                "badge": "🟠 Modsætning (Antonym)",
                                "prompt": "Prinsessen udbryder: 'Hvor er du sjov!' Hvad er det modsatte af **sjov**?",
                                "options": [
                                    "kedelig (eller trist)",
                                    "glad",
                                    "klog",
                                    "pæn"
                                ],
                                "correct": 0,
                                "explanation": "En person eller ting, der ikke er *sjov*, opfattes ofte som *kedelig*."
                            }
                        ]
                    },
                    "adverbier": {
                        "title": "Adverbier: Gradbøjning og synonymer",
                        "badge": "🔵 Gradbøjning & synonymer",
                        "icon": "🔵",
                        "desc": "Træn centraladverbier og gradsadverbier i replikkerne:",
                        "questions": [
                            {
                                "id": "s3_adv1",
                                "badge": "🔵 Centraladverbium",
                                "prompt": "Storebror siger: 'Jeg kan ikke huske.' Hvilken grammatisk funktion har ordet **ikke**?",
                                "options": [
                                    "Centraladverbium der benægter handlingen",
                                    "Tidsadverbium der viser klokken",
                                    "Stedadverbium der viser retning",
                                    "Gradsadverbium der viser størrelse"
                                ],
                                "correct": 0,
                                "explanation": "*Ikke* er det vigtigste danske centraladverbium. Det ændrer sætningens betydning til det negative."
                            },
                            {
                                "id": "s3_adv2",
                                "badge": "🔵 Gradsadverbium",
                                "prompt": "Storebror klager: 'Det er så varmt!' Hvilket ord er et synonym til gradsadverbiet **så** her?",
                                "options": [
                                    "virkelig / meget",
                                    "aldrig",
                                    "måske",
                                    "ikke"
                                ],
                                "correct": 0,
                                "explanation": "Når man siger 'så varmt', betyder *så* det samme som *meget* eller *virkelig* varmt."
                            },
                            {
                                "id": "s3_adv3",
                                "badge": "🔵 Stedsadverbium",
                                "prompt": "Mellembror siger: 'Det er alt for varmt herinde.' Hvad betyder **herinde**?",
                                "options": [
                                    "Inde i dette rum / slottet",
                                    "Ude i haven",
                                    "Oppe på taget",
                                    "Nede i grøften"
                                ],
                                "correct": 0,
                                "explanation": "*Herinde* angiver, at taleren befinder sig inde i rummet eller bygningen."
                            }
                        ]
                    }
                }
            }
        ],
        "vocabulary": [
            {
                "word": "en ged",
                "type": "substantiv",
                "meaningDa": "et muntert husdyr med horn og skæg",
                "meaningEn": "a goat"
            },
            {
                "word": "en krage",
                "type": "substantiv",
                "meaningDa": "en klog, sort fugl",
                "meaningEn": "a crow"
            },
            {
                "word": "en træsko",
                "type": "substantiv",
                "meaningDa": "en gammeldags sko udskåret af træ",
                "meaningEn": "a wooden shoe / clog"
            },
            {
                "word": "mudder",
                "type": "substantiv",
                "meaningDa": "våd, blød jord fra grøften",
                "meaningEn": "mud"
            },
            {
                "word": "kompliceret",
                "type": "adjektiv",
                "meaningDa": "svær og med mange dele",
                "meaningEn": "complicated"
            },
            {
                "word": "selvfølgelig",
                "type": "adverbium",
                "meaningDa": "helt naturligt og indlysende",
                "meaningEn": "of course / obviously"
            },
            {
                "word": "et hjerte",
                "type": "substantiv",
                "meaningDa": "kærlighed og følelser (vinde hendes hjerte)",
                "meaningEn": "a heart"
            }
        ],
        "quiz": [
            {
                "question": "Hvad rider Klods-Hans på til slottet?",
                "options": [
                    "En stor sort hest",
                    "En munter hvid ged",
                    "En hurtig cykel"
                ],
                "correctIndex": 1,
                "explanation": "Klods-Hans har ingen hest, men tager stolt sin hvide ged!"
            },
            {
                "question": "Hvilke tre ting finder Klods-Hans på vejen?",
                "options": [
                    "Guld, en ring og et sværd",
                    "En død krage, en gammel træsko og mudder",
                    "Et æble, en bog og en hat"
                ],
                "correctIndex": 1,
                "explanation": "Han finder en død krage, en gammel træsko i grøften og en håndfuld mudder til sovs."
            },
            {
                "question": "Hvorfor vælger prinsessen Klods-Hans som sin mand?",
                "options": [
                    "Fordi han har de fineste klæder",
                    "Fordi han kan svare for sig, er sjov og ikke mister mælet i varmen",
                    "Fordi han er den bedste til at synge sange"
                ],
                "correctIndex": 1,
                "explanation": "Prinsessen elsker hans kvikke svar, hans munterhed og hans sjove måde at se tingene på!"
            }
        ],
        "talemaaderChallenge": {
            "title": "Eventyrets talemåder",
            "titleEn": "Fairy Tale Idioms",
            "subtitle": "Valgfri udfordring for avancerede kursister (B1/B2)",
            "subtitleEn": "Optional challenge for advanced learners (B1/B2)",
            "desc": "H.C. Andersens eventyr er fulde af situationer, som danskere i dag beskriver med faste talemåder. Kan du gætte, hvilken betydning talemåden har i denne scene?",
            "descEn": "H.C. Andersen's fairy tales are full of situations that Danes describe today with fixed idioms. Can you guess the meaning of the idiom for each scene?",
            "items": [
                {
                    "id": "blind_hoene",
                    "sceneTitle": "Scene 1: På bondegården",
                    "sceneTitleEn": "Scene 1: At the Farm",
                    "sceneContext": "Faren og brødrene griner ad Klods-Hans og siger: »Du kan jo ingenting! Du kan ikke tale med fine folk!« Men Klods-Hans ender alligevel med at vinde prinsessen.",
                    "sceneContextEn": "The father and brothers laugh at Clumsy Hans and say: 'You can't do anything! You can't speak with fine people!' Yet Hans ends up winning the princess.",
                    "idiom": "En blind høne kan også finde et korn",
                    "idiomEn": "Even a blind hen finds a grain",
                    "idiomIcon": "🐔",
                    "question": "Denne scene passer med talemåden: »En blind høne kan også finde et korn«. Hvad betyder talemåden?",
                    "questionEn": "This scene fits the idiom: 'En blind høne kan også finde et korn'. What does it mean?",
                    "correct": "At man kan være heldig at lykkes med noget, selvom man egentlig ikke er særligt dygtig eller har forberedt sig.",
                    "options": [
                        "At man kan være heldig at lykkes med noget, selvom man egentlig ikke er særligt dygtig eller har forberedt sig.",
                        "At en person, der arbejder i det stille, altid ender med at finde den største belønning.",
                        "At man er så stædig, at man stjæler andres hårdt tjente resultater.",
                        "At et dårligt syn ofte gør, at man lægger mærke til de helt små detaljer på jorden."
                    ],
                    "explanation": "Rigtigt! Klods-Hans var hverken lærd eller forberedt som sine brødre, men han lykkedes alligevel med at vinde kongedatteren og det halve rige.",
                    "packageId": "pkg1",
                    "packageName": "Livets omveje 1",
                    "moduleName": "At lykkes & Målrettet flid"
                },
                {
                    "id": "gaa_i_baglaas",
                    "sceneTitle": "Scene 3: Foran kongedatteren",
                    "sceneTitleEn": "Scene 3: In Front of the Princess",
                    "sceneContext": "De to lærde brødre har øvet sig i tre år. Men da de står foran kongedatteren og rådsherrerne, bliver de overvældede af nervøsitet og kan ikke få et eneste ord frem!",
                    "sceneContextEn": "The two learned brothers practiced for three years. But standing before the princess and councilors, they are overwhelmed by nervousness, unable to speak a single word!",
                    "idiom": "At gå i baglås",
                    "idiomEn": "To seize up / freeze completely",
                    "idiomIcon": "🔒",
                    "question": "Denne scene passer med talemåden: »At gå i baglås«. Hvad betyder talemåden?",
                    "questionEn": "This scene fits the idiom: 'At gå i baglås'. What does it mean?",
                    "correct": "At man fuldstændig mister evnen til at tænke klart eller handle, ofte fordi man er stresset eller presset.",
                    "options": [
                        "At man fuldstændig mister evnen til at tænke klart eller handle, ofte fordi man er stresset eller presset.",
                        "At man sikrer sit hus så godt, at ingen tyve nogensinde kan bryde ind.",
                        "At man låser en anden person inde på et værelse for at straffe dem.",
                        "At man glemmer sin nøgle og må vente på at en låsesmed kommer og hjælper."
                    ],
                    "explanation": "Lige præcis! Brødrene blev så pressede og mundlamme foran prinsessen, at deres hjerne og tale gik fuldstændig i baglås.",
                    "packageId": "pkg1",
                    "packageName": "Livets omveje 1",
                    "moduleName": "Fejltrin & Kollaps"
                },
                {
                    "id": "kaste_haandklaedet",
                    "sceneTitle": "Scene 3: Brødrenes nederlag",
                    "sceneTitleEn": "Scene 3: The Brothers' Defeat",
                    "sceneContext": "Da brødrene kun kan fremstamme »Det dur ikke!«, må de opgive deres drøm om kongedatteren og forlade slottet med bøjede hoveder.",
                    "sceneContextEn": "When the brothers can only stammer 'It's no good!', they have to give up their dream of the princess and leave the castle in defeat.",
                    "idiom": "At kaste håndklædet i ringen",
                    "idiomEn": "To throw in the towel",
                    "idiomIcon": "🥊",
                    "question": "Denne scene passer med talemåden: »At kaste håndklædet i ringen«. Hvad betyder talemåden?",
                    "questionEn": "This scene fits the idiom: 'At kaste håndklædet i ringen'. What does it mean?",
                    "correct": "At man giver helt op og erkender sit nederlag, fordi situationen er blevet for svær at klare.",
                    "options": [
                        "At man giver helt op og erkender sit nederlag, fordi situationen er blevet for svær at klare.",
                        "At man smider sine bekymringer væk og endelig begynder at nyde livet i fulde drag.",
                        "At man kaster sit skrald i naturen i stedet for at rydde ordentligt op efter sig selv.",
                        "At man er færdig med at tage bad og lægger håndklædet til vask."
                    ],
                    "explanation": "Helt rigtigt! Udtrykket stammer fra boksning, hvor træneren kaster et håndklæde i ringen for at stoppe kampen. Brødrene opgav alt og erkendte deres nederlag.",
                    "packageId": "pkg1",
                    "packageName": "Livets omveje 1",
                    "moduleName": "Mental & Handlingsretræte"
                },
                {
                    "id": "ramme_plet",
                    "sceneTitle": "Scene 4: Klods-Hans taler med prinsessen",
                    "sceneTitleEn": "Scene 4: Clumsy Hans Speaks with the Princess",
                    "sceneContext": "Prinsessen driller: »Her er en varme! Jeg steger hanekyllinger!« Klods-Hans svarer lynhurtigt: »Så kan jeg vel få stegt min krage!« og viser kragen, træskoen og plørefarven. Hvert svar er perfekt!",
                    "sceneContextEn": "The princess teases: 'It is so hot here! I am roasting cockerels!' Hans replies immediately: 'Then I can roast my crow!' showing the crow, shoe, and mud. Every reply is spot on!",
                    "idiom": "At ramme plet",
                    "idiomEn": "To hit the bullseye / nail it",
                    "idiomIcon": "🎯",
                    "question": "Denne scene passer med talemåden: »At ramme plet«. Hvad betyder talemåden?",
                    "questionEn": "This scene fits the idiom: 'At ramme plet'. What does it mean?",
                    "correct": "At man siger eller gør noget, der er fuldstændig rigtigt og præcist i den givne situation.",
                    "options": [
                        "At man siger eller gør noget, der er fuldstændig rigtigt og præcist i den givne situation.",
                        "At man vinder en stor sum penge i et meget svært og kompliceret spil.",
                        "At man ved et uheld rammer et ømt punkt hos en anden og gør dem meget kede af det.",
                        "At man skyder til måls og formår at træffe midten af skiven."
                    ],
                    "explanation": "Korrekt! Klods-Hans havde svar på rede hånd og ramte plet i enhver ordveksling med kongedatteren.",
                    "packageId": "pkg1",
                    "packageName": "Livets omveje 1",
                    "moduleName": "At lykkes & Målrettet flid"
                },
                {
                    "id": "skyde_papegoejen",
                    "sceneTitle": "Scene 5: Slutningen",
                    "sceneTitleEn": "Scene 5: The Ending",
                    "sceneContext": "Klods-Hans fik kongedatteren til kone, fik det halve kongerige og blev kronet til konge!",
                    "sceneContextEn": "Clumsy Hans won the king's daughter as his wife, received half the kingdom, and was crowned king!",
                    "idiom": "At skyde papegøjen",
                    "idiomEn": "To hit the jackpot / win big",
                    "idiomIcon": "🦜",
                    "question": "Denne scene passer med talemåden: »At skyde papegøjen«. Hvad betyder talemåden?",
                    "questionEn": "This scene fits the idiom: 'At skyde papegøjen'. What does it mean?",
                    "correct": "At man er usædvanligt heldig og vinder den helt store gevinst (oftest et godt ægteskab eller drømmejobbet).",
                    "options": [
                        "At man er usædvanligt heldig og vinder den helt store gevinst (oftest et godt ægteskab eller drømmejobbet).",
                        "At man er så utroligt præcis i sit arbejde, at man kan ramme et meget lille mål.",
                        "At man ødelægger noget smukt og sjældent, bare fordi man vil vise sig frem for andre.",
                        "At man tager på en lang jagt for at finde den eneste løsning på et svært problem."
                    ],
                    "explanation": "Præcis! Udtrykket stammer fra historiske fugleskydninger, hvor træpapegøjen var hovedpræmien. Klods-Hans vandt den ultimative gevinst: både et lykkeligt ægteskab og et helt kongerige!",
                    "packageId": "pkg1",
                    "packageName": "Livets omveje 1",
                    "moduleName": "At lykkes & Målrettet flid"
                }
            ]
        }
    },
    {
        "id": "den_grimme_aelling",
        "title": "Den grimme ælling",
        "titleEn": "The Ugly Duckling",
        "icon": "🦢",
        "level": "Let (A2)",
        "readingTime": "3 min",
        "quote": "Det gør ikke noget at være født i en andegård, når man kun har ligget i et svaneæg!",
        "quoteEn": "It doesn't matter being born in a duck yard when you have lain in a swan's egg!",
        "teaser": "En lille ælling ser anderledes ud end sine søskende. Alle driller ham, men en dag opdager han, hvem han i virkeligheden er.",
        "teaserEn": "A little duckling looks different from his siblings. Everyone teases him, but one day he discovers who he truly is.",
        "grammarFocus": {
            "title": "Sprog-spot: Datid og tidsadverbialer",
            "desc": "Læg mærke til de mange verber i datid (*var, lå, svømmede, så*) og hvordan tidsudtryk (*Der var engang, En kold vinter, Næste forår*) skaber fremdrift i historien."
        },
        "sections": [
            {
                "chapter": "1. Reden i det grønne korn",
                "chapterEn": "1. The Nest in the Green Corn",
                "text": "Der var så dejligt ude på landet! Det var sommer. Kornet var gult, og græsset var grønt. Nede ved vandet sad en andemor på sin rede. Hun ventede på, at hendes små ællinger skulle komme ud af æggene.\n\nEndelig knagede det i æggene: »Pip! Pip!« sagde de små ællinger. Men det største æg lå der endnu. Det ville ikke gå i stykker. Til sidst knækkede skallen alligevel. Ud kom en stor, grå og grim unge.",
                "audioText": "Der var så dejligt ude på landet! Det var sommer. Kornet var gult, og græsset var grønt. Nede ved vandet sad en andemor på sin rede. Hun ventede på, at hendes små ællinger skulle komme ud af æggene. Endelig knagede det i æggene: Pip! Pip! sagde de små ællinger. Men det største æg lå der endnu. Det ville ikke gå i stykker. Til sidst knækkede skallen alligevel. Ud kom en stor, grå og grim unge."
            },
            {
                "chapter": "2. Drillerierne i andegården",
                "chapterEn": "2. The Teasing in the Duck Yard",
                "text": "Dagen efter svømmede andemoren ud i vandet med alle sine unger. Den store, grå ælling svømmede også med. Han svømmede faktisk rigtig godt!\n\nMen da de kom ind i andegården, begyndte de andre ænder og høns at grine. »Se den store, mærkelige unge! Hvor er han grim!« råbte de. De bed ham i nakken og skubbede til ham. Selv hans egne søskende sagde: »Hvis bare katten ville tage dig!« Den stakkels ælling blev så ked af det, at han løb væk.",
                "audioText": "Dagen efter svømmede andemoren ud i vandet med alle sine unger. Den store, grå ælling svømmede også med. Han svømmede faktisk rigtig godt! Men da de kom ind i andegården, begyndte de andre ænder og høns at grine. Se den store, mærkelige unge! Hvor er han grim! råbte de. De bed ham i nakken og skubbede til ham. Selv hans egne søskende sagde: Hvis bare katten ville tage dig! Den stakkels ælling blev så ked af det, at han løb væk."
            },
            {
                "chapter": "3. Den kolde, ensomme vinter",
                "chapterEn": "3. The Cold, Lonely Winter",
                "text": "Vinteren kom, og det blev frygtelig koldt. Søen frøs til is, og den lille ælling måtte svømme hele tiden for at holde vandet åbent. Til sidst blev han træt og frøs fast i isen.\n\nHeldigvis kom en venlig bonde forbi. Han slog isen i stykker med sin træsko og bar den lille ælling hjem til sin varme stue. Men ællingen blev bange for børnene og flygtede ud i kulden igen. Det blev en lang og hård vinter alene i mosen.",
                "audioText": "Vinteren kom, og det blev frygtelig koldt. Søen frøs til is, og den lille ælling måtte svømme hele tiden for at holde vandet åbent. Til sidst blev han træt og frøs fast i isen. Heldigvis kom en venlig bonde forbi. Han slog isen i stykker med sin træsko og bar den lille ælling hjem til sin varme stue. Men ællingen blev bange for børnene og flygtede ud i kulden igen. Det blev en lang og hård vinter alene i mosen."
            },
            {
                "chapter": "4. De smukke svaner",
                "chapterEn": "4. The Beautiful Swans",
                "text": "En forårsdag varmede solen igen. Lærken sang, og træerne fik grønne blade. Ællingen bredte sine vinger ud – de var blevet store og stærke! Han fløj op i luften og landede i en stor have med en smuk sø.\n\nUd på vandet kom tre prægtige, hvide svaner. »De vil sikkert også dræbe mig, fordi jeg er så grim,« tænkte han og bøjede sit hoved mod vandet.\n\nMen hvad så han i det klare vand? Det var hans eget spejlbillede! Han var ikke længere en klodset, mørkegrå ælling – han var selv en svane! De andre svaner svømmede hen til ham og bøjede næbbet for ham. Børnene i haven råbte: »Se, der er kommet en ny svane! Den er den allersmukkeste!« Da følte han sig uendelig lykkelig.",
                "audioText": "En forårsdag varmede solen igen. Lærken sang, og træerne fik grønne blade. Ællingen bredte sine vinger ud, de var blevet store og stærke! Han fløj op i luften og landede i en stor have med en smuk sø. Ud på vandet kom tre prægtige, hvide svaner. De vil sikkert også dræbe mig, fordi jeg er så grim, tænkte han og bøjede sit hoved mod vandet. Men hvad så han i det klare vand? Det var hans eget spejlbillede! Han var ikke længere en klodset, mørkegrå ælling, han var selv en svane! De andre svaner svømmede hen til ham og bøjede næbbet for ham. Børnene i haven råbte: Se, der er kommet en ny svane! Den er den allersmukkeste! Da følte han sig uendelig lykkelig."
            }
        ],
        "vocabulary": [
            {
                "word": "en ælling",
                "type": "substantiv",
                "meaningDa": "en baby-and (ung fugl)",
                "meaningEn": "a duckling"
            },
            {
                "word": "en rede",
                "type": "substantiv",
                "meaningDa": "fuglens 'seng' af strå og grene",
                "meaningEn": "a nest"
            },
            {
                "word": "at drille",
                "type": "verbum",
                "meaningDa": "at gøre grin med eller genere nogen",
                "meaningEn": "to tease / bully"
            },
            {
                "word": "stakkels",
                "type": "adjektiv",
                "meaningDa": "noget man har medfølelse med",
                "meaningEn": "poor (unfortunate)"
            },
            {
                "word": "en mose",
                "type": "substantiv",
                "meaningDa": "et vådt naturområde med mudder og planter",
                "meaningEn": "a marsh / bog"
            },
            {
                "word": "en svane",
                "type": "substantiv",
                "meaningDa": "en stor, hvid og elegant fugl",
                "meaningEn": "a swan"
            },
            {
                "word": "et spejlbillede",
                "type": "substantiv",
                "meaningDa": "det billede man ser af sig selv i vand eller spejl",
                "meaningEn": "a reflection"
            }
        ],
        "quiz": [
            {
                "question": "Hvorfor drillede de andre fugle den store ælling?",
                "options": [
                    "Fordi han ikke kunne svømme",
                    "Fordi han var stor, grå og så anderledes ud",
                    "Fordi han spiste al maden"
                ],
                "correctIndex": 1,
                "explanation": "De andre dyr i andegården syntes, at han var stor, grå og mærkelig."
            },
            {
                "question": "Hvem hjalp den frosne ælling om vinteren?",
                "options": [
                    "En venlig bonde",
                    "En kat",
                    "En anden and"
                ],
                "correctIndex": 0,
                "explanation": "En bonde slog isen i stykker og bar ællingen ind i sin varme stue."
            },
            {
                "question": "Hvad opdagede han til sidst i vandets spejlbillede?",
                "options": [
                    "At han var blevet en stor and",
                    "At han var blevet en smuk svane",
                    "At han var blevet en ørn"
                ],
                "correctIndex": 1,
                "explanation": "Han var ikke en and, men en rigtig svane!"
            }
        ]
    },
    {
        "id": "kejserens_nye_klaeder",
        "title": "Kejserens nye klæder",
        "titleEn": "The Emperor's New Clothes",
        "icon": "👑",
        "level": "Let (A2)",
        "readingTime": "3 min",
        "quote": "»Men han har jo ikke noget tøj på!« sagde et lille barn.",
        "quoteEn": "»But he has nothing on!« said a little child.",
        "teaser": "En kejser bruger alle sine penge på nyt tøj. To bedragere lover ham en dragt, som kun kloge mennesker kan se.",
        "teaserEn": "An emperor spends all his money on new clothes. Two swindlers promise him an outfit that only clever people can see.",
        "grammarFocus": {
            "title": "Sprog-spot: Negation med 'ikke' og 'ingenting'",
            "desc": "Bemærk placeringen af *ikke*: »Han har *ikke* noget tøj på« og »De så *ingenting*« – helt centralt for dansk ordstilling!"
        },
        "sections": [
            {
                "chapter": "1. Kejseren der elskede tøj",
                "chapterEn": "1. The Emperor Who Loved Clothes",
                "text": "For mange år siden levede en kejser, som holdt så uhyre meget af nyt, smukt tøj. Han brugte alle sine penge på at være fin. Han bekymrede sig ikke om sine soldater, og han gik kun i teatret for at vise sit nye tøj frem. Han havde en ny frakke for hver time på dagen!\n\nI den store by kom der mange fremmede på besøg. En dag ankom to bedragere. De sagde, at de var vævere, og at de kunne lave det mest fantastiske stof i verden.",
                "audioText": "For mange år siden levede en kejser, som holdt så uhyre meget af nyt, smukt tøj. Han brugte alle sine penge på at være fin. Han bekymrede sig ikke om sine soldater, og han gik kun i teatret for at vise sit nye tøj frem. Han havde en ny frakke for hver time på dagen! I den store by kom der mange fremmede på besøg. En dag ankom to bedragere. De sagde, at de var vævere, og at de kunne lave det mest fantastiske stof i verden."
            },
            {
                "chapter": "2. Det usynlige stof",
                "chapterEn": "2. The Invisible Cloth",
                "text": "»Vores tøj har en magisk egenskab,« sagde de to bedragere. »Det er usynligt for ethvert menneske, som er dumt eller ikke duer til sit arbejde.«\n\n»Det må være en vidunderlig dragt!« tænkte kejseren. »Når jeg tager det tøj på, kan jeg finde ud af, hvem i mit rige der er kloge, og hvem der er dumme!« Han gav bedragerne en masse guld for at begynde arbejdet straks.\n\nBedragerne satte to vævestole op og lod som om, de arbejdede hårdt. Men der var ingenting på vævene!",
                "audioText": "Vores tøj har en magisk egenskab, sagde de to bedragere. Det er usynligt for ethvert menneske, som er dumt eller ikke duer til sit arbejde. Det må være en vidunderlig dragt! tænkte kejseren. Når jeg tager det tøj på, kan jeg finde ud af, hvem i mit rige der er kloge, og hvem der er dumme! Han gav bedragerne en masse guld for at begynde arbejdet straks. Bedragerne satte to vævestole op og lod som om, de arbejdede hårdt. Men der var ingenting på vævene!"
            },
            {
                "chapter": "3. Den gamle ministers besøg",
                "chapterEn": "3. The Old Minister's Visit",
                "text": "Kejseren sendte sin ældste og klogeste minister hen for at se stoffet. Da den gamle mand kiggede på væven, spærrede han øjnene op. Han kunne overhovedet ingenting se!\n\n»Gud bevares!« tænkte ministeren. »Er jeg dum? Duer jeg ikke til mit embede? Det må ingen vide!« Så han roste stoffet: »Åh, farverne er vidunderlige! Mønstret er enestående!«\n\nSenere kom kejseren selv sammen med sit hof. Alle var bange for at virke dumme, så alle råbte i kor: »Det er mageløst! Det er fantastisk!«",
                "audioText": "Kejseren sendte sin ældste og klogeste minister hen for at se stoffet. Da den gamle mand kiggede på væven, spærrede han øjnene op. Han kunne overhovedet ingenting se! Gud bevares! tænkte ministeren. Er jeg dum? Duer jeg ikke til mit embede? Det må ingen vide! Så han roste stoffet: Åh, farverne er vidunderlige! Mønstret er enestående! Senere kom kejseren selv sammen med sit hof. Alle var bange for at virke dumme, så alle råbte i kor: Det er mageløst! Det er fantastisk!"
            },
            {
                "chapter": "4. Den store procession",
                "chapterEn": "4. The Grand Procession",
                "text": "Den næste dag tog kejseren sit nye »tøj« på foran spejlet. Bedragerne løftede hænderne og sagde: »Se, her er bukserne! Her er kappen! De er så lette som spindelvæv!« Kejseren vendte og drejede sig og sagde: »Hvor sidder det godt!«\n\nSå gik kejseren ud i procession under den store baldakin. Folk på gaden og i vinduerne råbte: »Gud, hvor er kejserens nye tøj uforligneligt!« Ingen ville indrømme, at de intet så.\n\nMen pludselig sagde et lille barn: »Men han har jo ikke noget tøj på!«\n\nFaderen sagde: »Hør den uskyldiges røst!« Og folk hviskede det videre til hinanden: »Han har ikke noget tøj på!« Til sidst råbte hele folket: »Han har jo ikke noget tøj på!«\n\nKejseren gøs, for han vidste, at de havde ret. Men han tænkte: »Nu må jeg holde ud til paraden er slut!« Og så gik han endnu mere stolt videre, mens kammerherrerne bar på slæbet, som slet ikke var der.",
                "audioText": "Den næste dag tog kejseren sit nye tøj på foran spejlet. Bedragerne løftede hænderne og sagde: Se, her er bukserne! Her er kappen! De er så lette som spindelvæv! Kejseren vendte og drejede sig og sagde: Hvor sidder det godt! Så gik kejseren ud i procession under den store baldakin. Folk på gaden og i vinduerne råbte: Gud, hvor er kejserens nye tøj uforligneligt! Ingen ville indrømme, at de intet så. Men pludselig sagde et lille barn: Men han har jo ikke noget tøj på! Faderen sagde: Hør den uskyldiges røst! Og folk hviskede det videre til hinanden: Han har ikke noget tøj på! Til sidst råbte hele folket: Han har jo ikke noget tøj på! Kejseren gøs, for han vidste, at de havde ret. Men han tænkte: Nu må jeg holde ud til paraden er slut! Og så gik han endnu mere stolt videre, mens kammerherrerne bar på slæbet, som slet ikke var der."
            }
        ],
        "vocabulary": [
            {
                "word": "en kejser",
                "type": "substantiv",
                "meaningDa": "den øverste hersker i et rige (over en konge)",
                "meaningEn": "an emperor"
            },
            {
                "word": "en bedrager",
                "type": "substantiv",
                "meaningDa": "en person der snyder og lyver for at få penge",
                "meaningEn": "a swindler / fraud"
            },
            {
                "word": "usynlig",
                "type": "adjektiv",
                "meaningDa": "noget som øjet ikke kan se",
                "meaningEn": "invisible"
            },
            {
                "word": "en minister",
                "type": "substantiv",
                "meaningDa": "en vigtig rådgiver for landets leder",
                "meaningEn": "a government minister"
            },
            {
                "word": "at lade som om",
                "type": "talemåde",
                "meaningDa": "at opføre sig som om noget er sandt, selvom det er falsk",
                "meaningEn": "to pretend"
            },
            {
                "word": "en procession",
                "type": "substantiv",
                "meaningDa": "et højtideligt optog gennem byen",
                "meaningEn": "a procession / parade"
            }
        ],
        "quiz": [
            {
                "question": "Hvad sagde bedragerne, at stoffet kunne?",
                "options": [
                    "Det kunne gøre kejseren usårlig i krig",
                    "Det var usynligt for dumme mennesker",
                    "Det kunne skifte farve om natten"
                ],
                "correctIndex": 1,
                "explanation": "De påstod, at kun kloge og dygtige mennesker kunne se stoffet."
            },
            {
                "question": "Hvorfor sagde ministeren ikke, at han ingenting kunne se?",
                "options": [
                    "Fordi han sov",
                    "Fordi han var bange for at blive regnet for dum",
                    "Fordi han kunne lide bedragerne"
                ],
                "correctIndex": 1,
                "explanation": "Han var bange for, at folk ville tro, han var dum eller uegnet til sit arbejde."
            },
            {
                "question": "Hvem sagde sandheden til sidst?",
                "options": [
                    "Et lille barn",
                    "Dronningen",
                    "En klog hund"
                ],
                "correctIndex": 0,
                "explanation": "Et uskyldigt barn råbte: »Men han har jo ikke noget tøj på!«"
            }
        ]
    },
    {
        "id": "prinsessen_paa_aerten",
        "title": "Prinsessen på ærten",
        "titleEn": "The Princess and the Pea",
        "icon": "🪡",
        "level": "Meget let (A1-A2)",
        "readingTime": "2 min",
        "quote": "»Det er ganske vist!«",
        "quoteEn": "»And this is a true story!«",
        "teaser": "En stormfuld aften banker en våd pige på slottets dør og påstår, at hun er en rigtig prinsesse. Dronningen finder en lille grøn ært frem.",
        "teaserEn": "One stormy night, a soaked girl knocks on the palace door claiming to be a true princess. The queen finds a small green pea.",
        "grammarFocus": {
            "title": "Sprog-spot: Adjektiver og 'Der var engang'",
            "desc": "Bemærk brugen af præpositionsled (*på ærten, under tyve madrasser*) og sammensatte tillægsord (*gennemblødt, frygtelig*)."
        },
        "sections": [
            {
                "chapter": "1. Prinsen der søgte en rigtig prinsesse",
                "chapterEn": "1. The Prince Seeking a True Princess",
                "text": "Der var engang en prins. Han ville så gerne have en prinsesse, men det skulle være en rigtig prinsesse! Han rejste hele verden rundt for at finde en, men overalt var der noget i vejen.\n\nPrinsesser var der nok af, men om de var rigtige prinsesser, kunne han ikke vide med sikkerhed. Der var altid noget, som ikke var helt rigtigt. Så kom han hjem igen og var så bedrøvet, for han ville så frygtelig gerne have en ægte prinsesse.",
                "audioText": "Der var engang en prins. Han ville så gerne have en prinsesse, men det skulle være en rigtig prinsesse! Han rejste hele verden rundt for at finde en, men overalt var der noget i vejen. Prinsesser var der nok af, men om de var rigtige prinsesser, kunne han ikke vide med sikkerhed. Der var altid noget, som ikke var helt rigtigt. Så kom han hjem igen og var så bedrøvet, for han ville så frygtelig gerne have en ægte prinsesse."
            },
            {
                "chapter": "2. Uvejret og den mystiske gæst",
                "chapterEn": "2. The Storm and the Mysterious Guest",
                "text": "En aften blev det et frygteligt vejr. Det lynede og tordnede, og regnen skyllede ned. Det var ganske forskrækkeligt!\n\nPludselig bankede det på byens port. Den gamle konge gik hen og lukkede op.\n\nUdenfor stod en prinsesse. Men Gud, hvor så hun ud af regnen og det onde vejr! Vandet løb ned ad hendes hår og hendes klæder. Det løb ind ad næsen på hendes sko og ud ad hælen. Alligevel sagde hun, at hun var en rigtig prinsesse.\n\n»Ja, det skal vi snart få at vide!« tænkte den gamle dronning. Hun sagde ikke noget, men gik ind i sovekammeret. Hun tog alt sengetøjet af og lagde en lille ært på bunden af sengen. Oven på ærten lagde hun tyve madrasser og tyve store dundyner. Der skulle prinsessen sove i nat.",
                "audioText": "En aften blev det et frygteligt vejr. Det lynede og tordnede, og regnen skyllede ned. Det var ganske forskrækkeligt! Pludselig bankede det på byens port. Den gamle konge gik hen og lukkede op. Udenfor stod en prinsesse. Men Gud, hvor så hun ud af regnen og det onde vejr! Vandet løb ned ad hendes hår og hendes klæder. Det løb ind ad næsen på hendes sko og ud ad hælen. Alligevel sagde hun, at hun var en rigtig prinsesse. Ja, det skal vi snart få at vide! tænkte den gamle dronning. Hun sagde ikke noget, men gik ind i sovekammeret. Hun tog alt sengetøjet af og lagde en lille ært på bunden af sengen. Oven på ærten lagde hun tyve madrasser og tyve store dundyner. Der skulle prinsessen sove i nat."
            },
            {
                "chapter": "3. Den ømme ryg og det kongelige bryllup",
                "chapterEn": "3. The Sore Back and the Royal Wedding",
                "text": "Næste morgen spurgte de hende ved morgenbordet, hvordan hun havde sovet.\n\n»Åh, ganske forfærdeligt!« sagde prinsessen. »Jeg har næsten ikke lukket et øje i hele nat! Gud må vide, hvad der har ligget i den seng? Jeg har ligget på noget hårdt, så jeg er ganske brun og blå over hele kroppen! Det er ganske frygteligt!«\n\nNu vidste de, at hun var en rigtig prinsesse! Kun en ægte prinsesse kunne have så fin og følsom en hud, at hun mærkede en lille ært igennem tyve madrasser og tyve dundyner!\n\nPrinsen tog hende til kone, for nu vidste han, at han havde fundet en rigtig prinsesse. Og ærten kom på museum, hvor man stadig kan se den, hvis ingen har stjålet den. Se, det var en rigtig historie!",
                "audioText": "Næste morgen spurgte de hende ved morgenbordet, hvordan hun havde sovet. Åh, ganske forfærdeligt! sagde prinsessen. Jeg har næsten ikke lukket et øje i hele nat! Gud må vide, hvad der har ligget i den seng? Jeg har ligget på noget hårdt, så jeg er ganske brun og blå over hele kroppen! Det er ganske frygteligt! Nu vidste de, at hun var en rigtig prinsesse! Kun en ægte prinsesse kunne have så fin og følsom en hud, at hun mærkede en lille ært igennem tyve madrasser og tyve dundyner! Prinsen tog hende til kone, for nu vidste han, at han havde fundet en rigtig prinsesse. Og ærten kom på museum, hvor man stadig kan se den, hvis ingen har stjålet den. Se, det var en rigtig historie!"
            }
        ],
        "vocabulary": [
            {
                "word": "et uvejr",
                "type": "substantiv",
                "meaningDa": "voldsomt regnvejr med blæst og torden",
                "meaningEn": "a violent storm"
            },
            {
                "word": "en ært",
                "type": "substantiv",
                "meaningDa": "en lille, rund og grøn grøntsag",
                "meaningEn": "a pea"
            },
            {
                "word": "en madras",
                "type": "substantiv",
                "meaningDa": "en blød pude man sover på i sengen",
                "meaningEn": "a mattress"
            },
            {
                "word": "en dundyne",
                "type": "substantiv",
                "meaningDa": "en varm dyne fyldt med bløde fuglefjer",
                "meaningEn": "a feather duvet"
            },
            {
                "word": "følsom",
                "type": "adjektiv",
                "meaningDa": "som nemt mærker og reagerer på sanseindtryk",
                "meaningEn": "sensitive / delicate"
            },
            {
                "word": "ganske vist",
                "type": "talemåde",
                "meaningDa": "helt sikkert, sandt",
                "meaningEn": "quite true / indeed"
            }
        ],
        "quiz": [
            {
                "question": "Hvad lagde dronningen under de tyve madrasser?",
                "options": [
                    "En guldring",
                    "En lille grøn ært",
                    "En nøgle"
                ],
                "correctIndex": 1,
                "explanation": "Hun lagde en lille ært helt i bunden af sengen for at teste pigen."
            },
            {
                "question": "Hvordan havde pigen sovet?",
                "options": [
                    "Rigtig godt og tungt",
                    "Ganske forfærdeligt, fordi noget hårdt trykkede på hendes ryg",
                    "Hun sov slet ikke i sengen"
                ],
                "correctIndex": 1,
                "explanation": "Hun havde ligget på noget hårdt og var helt øm over kroppen."
            },
            {
                "question": "Hvor kom ærten hen til sidst?",
                "options": [
                    "Den blev spist til aftensmad",
                    "Den kom på et museum",
                    "Den blev plantet i haven"
                ],
                "correctIndex": 1,
                "explanation": "Ærten blev udstillet på et museum som bevis på historien."
            }
        ]
    },
    {
        "id": "fyrtoejet",
        "title": "Fyrtøjet",
        "titleEn": "The Tinderbox",
        "icon": "🐕",
        "level": "Let-mellem (A2-B1)",
        "readingTime": "4 min",
        "quote": "»Hund med øjne så store som tekopper, møllehjul og Rundetårn!«",
        "quoteEn": "»A dog with eyes as big as teacups, millwheels, and the Round Tower!«",
        "teaser": "En modig soldat møder en heks på landevejen. Han klatrer ned i et hult træ for at hente et magisk fyrtøj og tre kister med penge.",
        "teaserEn": "A brave soldier meets a witch on the road. He climbs down a hollow tree to fetch a magic tinderbox and three chests of money.",
        "grammarFocus": {
            "title": "Sprog-spot: Sammenligninger med 'så ... som'",
            "desc": "H.C. Andersen elsker fantasifulde sammenligninger: *»øjne så store som tekopper«* (ligesom *»så hurtig som en hest«*)."
        },
        "sections": [
            {
                "chapter": "1. Soldaten og heksen",
                "chapterEn": "1. The Soldier and the Witch",
                "text": "Der kom en soldat marcherende hen ad landevejen: »En, to! En, to!« Han havde sin tornyster på ryggen og en sabel ved siden, for han havde været i krig, og nu ville han hjem.\n\nSå mødte han en gammel heks på vejen. Hun var så fæl, hendes underlæbe hang helt ned på brystet. »God aften, tapre soldat!« sagde hun. »Hvor du har et flot sværd og en stor taske! Du er en rigtig soldat. Du skal få så mange penge, du overhovedet orker at bære!«\n\n»Mange tak, gamle heks!« sagde soldaten.",
                "audioText": "Der kom en soldat marcherende hen ad landevejen: En, to! En, to! Han havde sin tornyster på ryggen og en sabel ved siden, for han havde været i krig, og nu ville han hjem. Så mødte han en gammel heks på vejen. Hun var så fæl, hendes underlæbe hang helt ned på brystet. God aften, tapre soldat! sagde hun. Hvor du har et flot sværd og en stor taske! Du er en rigtig soldat. Du skal få så mange penge, du overhovedet orker at bære! Mange tak, gamle heks! sagde soldaten."
            },
            {
                "chapter": "2. Det hule træ og de tre hunde",
                "chapterEn": "2. The Hollow Tree and the Three Dogs",
                "text": "Heksen pegede på et stort, hult træ: »Kravl op i toppen af træet og lad dig dumpe ned i hullet. Jeg binder et reb om din mave, så jeg kan hejse dig op igen. Nede i bunden er der en stor gang med hundredvis af lamper. Der er tre døre:\n\nBag den første dør sidder en hund med øjne så store som tekopper. Sæt den på mit forklæde, så gør den dig ingenting, og tag så mange kobbermønter, du vil!\n\nBag den anden dør sidder en hund med øjne så store som møllehjul. Sæt den på forklædet og fyld lommerne med sølvmønter!\n\nBag den tredje dør sidder en hund med øjne så store som Rundetårn! Tag den op, og du kan tage guld i store mængder!\n\nAlt hvad jeg vil have, er et gammelt fyrtøj, som min bedstemor glemte dernede.«",
                "audioText": "Heksen pegede på et stort, hult træ: Kravl op i toppen af træet og lad dig dumpe ned i hullet. Jeg binder et reb om din mave, så jeg kan hejse dig op igen. Nede i bunden er der en stor gang med hundredvis af lamper. Der er tre døre: Bag den første dør sidder en hund med øjne så store som tekopper. Sæt den på mit forklæde, så gør den dig ingenting, og tag så mange kobbermønter, du vil! Bag den anden dør sidder en hund med øjne så store som møllehjul. Sæt den på forklædet og fyld lommerne med sølvmønter! Bag den tredje dør sidder en hund med øjne så store som Rundetårn! Tag den op, og du kan tage guld i store mængder! Alt hvad jeg vil have, er et gammelt fyrtøj, som min bedstemor glemte dernede."
            },
            {
                "chapter": "3. Rigdom og det magiske lys",
                "chapterEn": "3. Wealth and the Magic Light",
                "text": "Soldaten krøb ned i træet. Alt var præcis, som heksen havde sagt. Han fyldte sine lommer, sin støvler og sin taske med skinnende guld! Så tog han fyrtøjet og råbte: »Hejs mig op, heks!«\n\nMen da heksen ikke ville forklare, hvad hun skulle bruge fyrtøjet til, huggede soldaten hovedet af hende og gik ind til byen.\n\nNu levede han som en rig herre! Han boede i de fineste værelser, gav gaver til de fattige og fik mange »venner«. Men da pengene slap op, forsvandt vennerne. Han måtte flytte op på et lille, mørkt loftskammer. En aften ville han tænde et lille lys med det gamle fyrtøj. Han slog ild: Én gang – to gange – tre gange!",
                "audioText": "Soldaten krøb ned i træet. Alt var præcis, som heksen havde sagt. Han fyldte sine lommer, sin støvler og sin taske med skinnende guld! Så tog han fyrtøjet og råbte: Hejs mig op, heks! Men da heksen ikke ville forklare, hvad hun skulle bruge fyrtøjet til, huggede soldaten hovedet af hende og gik ind til byen. Nu levede han som en rig herre! Han boede i de fineste værelser, gav gaver til de fattige og fik mange venner. Men da pengene slap op, forsvandt vennerne. Han måtte flytte op på et lille, mørkt loftskammer. En aften ville han tænde et lille lys med det gamle fyrtøj. Han slog ild: Én gang – to gange – tre gange!"
            },
            {
                "chapter": "4. Hundene hjælper soldaten",
                "chapterEn": "4. The Dogs Help the Soldier",
                "text": "Pludselig sprang døren op! Foran ham stod hunden med øjne så store som tekopper. »Hvad befaler min herre?« spurgte hunden.\n\n»Skaf mig penge!« sagde soldaten, og vupti – et øjeblik efter kom hunden tilbage med en stor pose mønter!\n\nNu forstod han hemmeligheden: Slog han én gang, kom hunden med kobberpenge. Slog han to gange, kom hunden med sølvpenge. Og slog han tre gange, kom den store hund med guld!\n\nSenere hjalp de magiske hunde ham med at befri den smukke prinsesse fra kongens fængsel. Soldaten og prinsessen blev gift, og ved den store fest sad alle tre hunde med ved bordet og spærrede øjnene op!",
                "audioText": "Pludselig sprang døren op! Foran ham stod hunden med øjne så store som tekopper. Hvad befaler min herre? spurgte hunden. Skaf mig penge! sagde soldaten, og vupti – et øjeblik efter kom hunden tilbage med en stor pose mønter! Nu forstod han hemmeligheden: Slog han én gang, kom hunden med kobberpenge. Slog han to gange, kom hunden med sølvpenge. Og slog han tre gange, kom den store hund med guld! Senere hjalp de magiske hunde ham med at befri den smukke prinsesse fra kongens fængsel. Soldaten og prinsessen blev gift, og ved den store fest sad alle tre hunde med ved bordet og spærrede øjnene op!"
            }
        ],
        "vocabulary": [
            {
                "word": "en sabel",
                "type": "substantiv",
                "meaningDa": "et langt, buet sværd som soldater bar",
                "meaningEn": "a sabre / sword"
            },
            {
                "word": "et fyrtøj",
                "type": "substantiv",
                "meaningDa": "et gammelt redskab til at slå gnister og tænde ild",
                "meaningEn": "a tinderbox"
            },
            {
                "word": "fæl",
                "type": "adjektiv",
                "meaningDa": "grim og ubehagelig",
                "meaningEn": "hideous / foul"
            },
            {
                "word": "et møllehjul",
                "type": "substantiv",
                "meaningDa": "det store, tunge hjul i en vind- eller vandmølle",
                "meaningEn": "a millwheel"
            },
            {
                "word": "Rundetårn",
                "type": "egenavn",
                "meaningDa": "et berømt, højt rundt tårn i København",
                "meaningEn": "The Round Tower (in Copenhagen)"
            },
            {
                "word": "at befale",
                "type": "verbum",
                "meaningDa": "at give ordre til nogen",
                "meaningEn": "to command / order"
            }
        ],
        "quiz": [
            {
                "question": "Hvor store øjne havde den tredje hund?",
                "options": [
                    "Så store som tekopper",
                    "Så store som møllehjul",
                    "Så store som Rundetårn"
                ],
                "correctIndex": 2,
                "explanation": "Den tredje og største hund havde øjne så store som Rundetårn."
            },
            {
                "question": "Hvad skete der, når soldaten slog ild med fyrtøjet?",
                "options": [
                    "Der kom røg ud af vinduet",
                    "Hundene dukkede op og udførte hans ønsker",
                    "Han blev usynlig"
                ],
                "correctIndex": 1,
                "explanation": "Hundene kom straks og bragte ham penge og hjalp ham."
            },
            {
                "question": "Hvordan ender eventyret?",
                "options": [
                    "Soldaten mister alt sit guld",
                    "Soldaten gifter sig med prinsessen",
                    "Heksen vender tilbage og tager fyrtøjet"
                ],
                "correctIndex": 1,
                "explanation": "Soldaten og prinsessen bliver gift, og hundene fejrer med ved brylluppet!"
            }
        ]
    }
];
