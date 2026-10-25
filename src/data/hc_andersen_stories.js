/**
 * H.C. Andersens Eventyr for Danskkursister (A2 / Letlæst B1)
 * Forkortede og forsimplede udgaver af klassiske eventyr.
 * Med ordforklaringer, sprog-spots og forståelsesspørgsmål.
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
            "audioText": "Kongen har sagt, at hans datter skal finde en mand. Den, som taler bedst, vinder hende. Storebror sagde: Jeg tager til slottet. Jeg kan tale om store og komplicerede ting. Jeg er meget klog! Mellembror sagde: Og jeg vil også gå! Jeg kender mange sange. Ja, jeg er altid glad og god til at synge! Klods-Hans råbte: Jeg prøver også! Jeg har ingen hest, men jeg tager min ged! Hov, se her: Det er en død krage! Faren sagde: Tag du bare geden, Klods-Hans.",
            "text": "Far: »Kongen har sagt, at hans datter skal finde en mand. Den, som taler bedst, vinder hende.«\n\nStorebror: »Jeg tager til slottet. Jeg kan tale om store og komplicerede ting. Jeg er meget klog!«\n\nMellembror: »Og jeg vil også gå! Jeg kender mange sange. Ja, jeg er altid glad og god til at synge!«\n\nKlods-Hans: »Jeg prøver også! Jeg har ingen hest, men jeg tager min ged. Hov, se her: Det er en død krage!«\n\nFar: »Tag du bare geden, Klods-Hans.«",
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
                    "x": 74,
                    "y": 35,
                    "type": "sub",
                    "word": "fugl",
                    "label": "en krage",
                    "info": "Substantiv: en fugl (krage)"
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
                    "speaker": "Far",
                    "speakerIcon": "👨‍🌾",
                    "audioText": "Kongen har sagt, at hans datter skal finde en mand. Den, som taler bedst, vinder hende.",
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
                            "text": " datter ",
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
                            "text": ". Den, som ",
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
                    ]
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
                    "audioText": "Jeg prøver også! Jeg har ingen hest, men jeg tager min ged! Hov, se her: Det er en død krage!",
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
                            "text": " ged! Hov, ",
                            "type": "plain"
                        },
                        {
                            "text": "se",
                            "type": "vrb",
                            "key": "se"
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
                            "text": ": ",
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
                            "text": "!",
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
            ]
        },
        {
            "chapter": "Scene 2: På landevejen til slottet",
            "chapterEn": "Scene 2: On the Country Road",
            "vrimmelImage": "assets/klods_hans_scene2.jpg",
            "audioText": "Manden på vejen spurgte: Hvor er du på vej hen? Klods-Hans svarede: Jeg er på vej til prinsessen! Manden spurgte: Og har du en gave med til hende? Klods-Hans sagde: Nu skal du se hvad jeg har fundet! En fugl og en gammel beskidt træsko med mudder! Manden grinede: Held og lykke med det!",
            "text": "Mand på vejen: »Hvor er du på vej hen?«\n\nKlods-Hans: »Jeg er på vej til prinsessen!«\n\nMand på vejen: »Og har du en gave med til hende?«\n\nKlods-Hans: »Nu skal du se hvad jeg har fundet! En fugl og en gammel, beskidt træsko med mudder.«\n\nMand på vejen: »Held og lykke med det!« (griner)",
            "hotspots": [
                {
                    "x": 34,
                    "y": 55,
                    "type": "sub",
                    "word": "mand",
                    "label": "en mand",
                    "info": "Substantiv: en mand"
                },
                {
                    "x": 45,
                    "y": 64,
                    "type": "sub",
                    "word": "vej",
                    "label": "en vej",
                    "info": "Substantiv: en vej"
                },
                {
                    "x": 74,
                    "y": 65,
                    "type": "sub",
                    "word": "ged",
                    "label": "en ged",
                    "info": "Substantiv: en ged"
                },
                {
                    "x": 59,
                    "y": 35,
                    "type": "sub",
                    "word": "fugl",
                    "label": "en krage",
                    "info": "Substantiv: en fugl (krage)"
                },
                {
                    "x": 79,
                    "y": 33,
                    "type": "sub",
                    "word": "sko",
                    "label": "en træsko",
                    "info": "Substantiv: en sko"
                },
                {
                    "x": 23,
                    "y": 88,
                    "type": "sub",
                    "word": "mudder",
                    "label": "mudder",
                    "info": "Substantiv: mudder"
                },
                {
                    "x": 86,
                    "y": 18,
                    "type": "sub",
                    "word": "slot",
                    "label": "et slot",
                    "info": "Substantiv: et slot"
                }
            ],
            "dialogue": [
                {
                    "speaker": "Mand på vejen",
                    "speakerIcon": "🧑‍🌾",
                    "audioText": "Hvor er du på vej hen?",
                    "tokens": [
                        {
                            "text": "Hvor",
                            "type": "adv",
                            "key": "hvor"
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
                            "text": "du",
                            "type": "pro",
                            "key": "du"
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
                            "text": "vej",
                            "type": "sub",
                            "key": "vej"
                        },
                        {
                            "text": " ",
                            "type": "plain"
                        },
                        {
                            "text": "hen",
                            "type": "adv",
                            "key": "hen"
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
                    "audioText": "Jeg er på vej til prinsessen!",
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
                            "text": "er",
                            "type": "vrb",
                            "key": "være"
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
                            "text": "vej",
                            "type": "sub",
                            "key": "vej"
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
                            "text": " prinsessen!",
                            "type": "plain"
                        }
                    ]
                },
                {
                    "speaker": "Mand på vejen",
                    "speakerIcon": "🧑‍🌾",
                    "audioText": "Og har du en gave med til hende?",
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
                            "text": "har",
                            "type": "vrb",
                            "key": "have"
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
                            "text": " en ",
                            "type": "plain"
                        },
                        {
                            "text": "gave",
                            "type": "sub",
                            "key": "gave"
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
                            "text": "til",
                            "type": "prep",
                            "key": "til"
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
                            "text": "?",
                            "type": "plain"
                        }
                    ]
                },
                {
                    "speaker": "Klods-Hans",
                    "speakerIcon": "🐐",
                    "audioText": "Nu skal du se hvad jeg har fundet! En fugl og en gammel, beskidt træsko med mudder.",
                    "tokens": [
                        {
                            "text": "Nu",
                            "type": "adv",
                            "key": "nu"
                        },
                        {
                            "text": " ",
                            "type": "plain"
                        },
                        {
                            "text": "skal",
                            "type": "vrb",
                            "key": "skulle"
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
                            "text": "se",
                            "type": "vrb",
                            "key": "se"
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
                            "text": "har fundet",
                            "type": "vrb",
                            "key": "finde"
                        },
                        {
                            "text": "! En ",
                            "type": "plain"
                        },
                        {
                            "text": "fugl",
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
                            "text": "gammel",
                            "type": "adj",
                            "key": "gammel"
                        },
                        {
                            "text": ", ",
                            "type": "plain"
                        },
                        {
                            "text": "beskidt",
                            "type": "adj",
                            "key": "beskidt"
                        },
                        {
                            "text": " ",
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
                    ]
                },
                {
                    "speaker": "Mand på vejen",
                    "speakerIcon": "🧑‍🌾",
                    "audioText": "Held og lykke med det!",
                    "tokens": [
                        {
                            "text": "Held og lykke ",
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
                            "text": "det",
                            "type": "pro",
                            "key": "det"
                        },
                        {
                            "text": "! (griner)",
                            "type": "plain"
                        }
                    ]
                }
            ]
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
                    ]
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
                    ]
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
            ]
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
    ]
},
    {
        id: "den_grimme_aelling",
        title: "Den grimme ælling",
        titleEn: "The Ugly Duckling",
        icon: "🦢",
        level: "Let (A2)",
        readingTime: "3 min",
        quote: "Det gør ikke noget at være født i en andegård, når man kun har ligget i et svaneæg!",
        quoteEn: "It doesn't matter being born in a duck yard when you have lain in a swan's egg!",
        teaser: "En lille ælling ser anderledes ud end sine søskende. Alle driller ham, men en dag opdager han, hvem han i virkeligheden er.",
        teaserEn: "A little duckling looks different from his siblings. Everyone teases him, but one day he discovers who he truly is.",
        grammarFocus: {
            title: "Sprog-spot: Datid og tidsadverbialer",
            desc: "Læg mærke til de mange verber i datid (*var, lå, svømmede, så*) og hvordan tidsudtryk (*Der var engang, En kold vinter, Næste forår*) skaber fremdrift i historien."
        },
        sections: [
            {
                chapter: "1. Reden i det grønne korn",
                chapterEn: "1. The Nest in the Green Corn",
                text: "Der var så dejligt ude på landet! Det var sommer. Kornet var gult, og græsset var grønt. Nede ved vandet sad en andemor på sin rede. Hun ventede på, at hendes små ællinger skulle komme ud af æggene.\n\nEndelig knagede det i æggene: »Pip! Pip!« sagde de små ællinger. Men det største æg lå der endnu. Det ville ikke gå i stykker. Til sidst knækkede skallen alligevel. Ud kom en stor, grå og grim unge.",
                audioText: "Der var så dejligt ude på landet! Det var sommer. Kornet var gult, og græsset var grønt. Nede ved vandet sad en andemor på sin rede. Hun ventede på, at hendes små ællinger skulle komme ud af æggene. Endelig knagede det i æggene: Pip! Pip! sagde de små ællinger. Men det største æg lå der endnu. Det ville ikke gå i stykker. Til sidst knækkede skallen alligevel. Ud kom en stor, grå og grim unge."
            },
            {
                chapter: "2. Drillerierne i andegården",
                chapterEn: "2. The Teasing in the Duck Yard",
                text: "Dagen efter svømmede andemoren ud i vandet med alle sine unger. Den store, grå ælling svømmede også med. Han svømmede faktisk rigtig godt!\n\nMen da de kom ind i andegården, begyndte de andre ænder og høns at grine. »Se den store, mærkelige unge! Hvor er han grim!« råbte de. De bed ham i nakken og skubbede til ham. Selv hans egne søskende sagde: »Hvis bare katten ville tage dig!« Den stakkels ælling blev så ked af det, at han løb væk.",
                audioText: "Dagen efter svømmede andemoren ud i vandet med alle sine unger. Den store, grå ælling svømmede også med. Han svømmede faktisk rigtig godt! Men da de kom ind i andegården, begyndte de andre ænder og høns at grine. Se den store, mærkelige unge! Hvor er han grim! råbte de. De bed ham i nakken og skubbede til ham. Selv hans egne søskende sagde: Hvis bare katten ville tage dig! Den stakkels ælling blev så ked af det, at han løb væk."
            },
            {
                chapter: "3. Den kolde, ensomme vinter",
                chapterEn: "3. The Cold, Lonely Winter",
                text: "Vinteren kom, og det blev frygtelig koldt. Søen frøs til is, og den lille ælling måtte svømme hele tiden for at holde vandet åbent. Til sidst blev han træt og frøs fast i isen.\n\nHeldigvis kom en venlig bonde forbi. Han slog isen i stykker med sin træsko og bar den lille ælling hjem til sin varme stue. Men ællingen blev bange for børnene og flygtede ud i kulden igen. Det blev en lang og hård vinter alene i mosen.",
                audioText: "Vinteren kom, og det blev frygtelig koldt. Søen frøs til is, og den lille ælling måtte svømme hele tiden for at holde vandet åbent. Til sidst blev han træt og frøs fast i isen. Heldigvis kom en venlig bonde forbi. Han slog isen i stykker med sin træsko og bar den lille ælling hjem til sin varme stue. Men ællingen blev bange for børnene og flygtede ud i kulden igen. Det blev en lang og hård vinter alene i mosen."
            },
            {
                chapter: "4. De smukke svaner",
                chapterEn: "4. The Beautiful Swans",
                text: "En forårsdag varmede solen igen. Lærken sang, og træerne fik grønne blade. Ællingen bredte sine vinger ud – de var blevet store og stærke! Han fløj op i luften og landede i en stor have med en smuk sø.\n\nUd på vandet kom tre prægtige, hvide svaner. »De vil sikkert også dræbe mig, fordi jeg er så grim,« tænkte han og bøjede sit hoved mod vandet.\n\nMen hvad så han i det klare vand? Det var hans eget spejlbillede! Han var ikke længere en klodset, mørkegrå ælling – han var selv en svane! De andre svaner svømmede hen til ham og bøjede næbbet for ham. Børnene i haven råbte: »Se, der er kommet en ny svane! Den er den allersmukkeste!« Da følte han sig uendelig lykkelig.",
                audioText: "En forårsdag varmede solen igen. Lærken sang, og træerne fik grønne blade. Ællingen bredte sine vinger ud, de var blevet store og stærke! Han fløj op i luften og landede i en stor have med en smuk sø. Ud på vandet kom tre prægtige, hvide svaner. De vil sikkert også dræbe mig, fordi jeg er så grim, tænkte han og bøjede sit hoved mod vandet. Men hvad så han i det klare vand? Det var hans eget spejlbillede! Han var ikke længere en klodset, mørkegrå ælling, han var selv en svane! De andre svaner svømmede hen til ham og bøjede næbbet for ham. Børnene i haven råbte: Se, der er kommet en ny svane! Den er den allersmukkeste! Da følte han sig uendelig lykkelig."
            }
        ],
        vocabulary: [
            { word: "en ælling", type: "substantiv", meaningDa: "en baby-and (ung fugl)", meaningEn: "a duckling" },
            { word: "en rede", type: "substantiv", meaningDa: "fuglens 'seng' af strå og grene", meaningEn: "a nest" },
            { word: "at drille", type: "verbum", meaningDa: "at gøre grin med eller genere nogen", meaningEn: "to tease / bully" },
            { word: "stakkels", type: "adjektiv", meaningDa: "noget man har medfølelse med", meaningEn: "poor (unfortunate)" },
            { word: "en mose", type: "substantiv", meaningDa: "et vådt naturområde med mudder og planter", meaningEn: "a marsh / bog" },
            { word: "en svane", type: "substantiv", meaningDa: "en stor, hvid og elegant fugl", meaningEn: "a swan" },
            { word: "et spejlbillede", type: "substantiv", meaningDa: "det billede man ser af sig selv i vand eller spejl", meaningEn: "a reflection" }
        ],
        quiz: [
            {
                question: "Hvorfor drillede de andre fugle den store ælling?",
                options: [
                    "Fordi han ikke kunne svømme",
                    "Fordi han var stor, grå og så anderledes ud",
                    "Fordi han spiste al maden"
                ],
                correctIndex: 1,
                explanation: "De andre dyr i andegården syntes, at han var stor, grå og mærkelig."
            },
            {
                question: "Hvem hjalp den frosne ælling om vinteren?",
                options: [
                    "En venlig bonde",
                    "En kat",
                    "En anden and"
                ],
                correctIndex: 0,
                explanation: "En bonde slog isen i stykker og bar ællingen ind i sin varme stue."
            },
            {
                question: "Hvad opdagede han til sidst i vandets spejlbillede?",
                options: [
                    "At han var blevet en stor and",
                    "At han var blevet en smuk svane",
                    "At han var blevet en ørn"
                ],
                correctIndex: 1,
                explanation: "Han var ikke en and, men en rigtig svane!"
            }
        ]
    },

    {
        id: "kejserens_nye_klaeder",
        title: "Kejserens nye klæder",
        titleEn: "The Emperor's New Clothes",
        icon: "👑",
        level: "Let (A2)",
        readingTime: "3 min",
        quote: "»Men han har jo ikke noget tøj på!« sagde et lille barn.",
        quoteEn: "»But he has nothing on!« said a little child.",
        teaser: "En kejser bruger alle sine penge på nyt tøj. To bedragere lover ham en dragt, som kun kloge mennesker kan se.",
        teaserEn: "An emperor spends all his money on new clothes. Two swindlers promise him an outfit that only clever people can see.",
        grammarFocus: {
            title: "Sprog-spot: Negation med 'ikke' og 'ingenting'",
            desc: "Bemærk placeringen af *ikke*: »Han har *ikke* noget tøj på« og »De så *ingenting*« – helt centralt for dansk ordstilling!"
        },
        sections: [
            {
                chapter: "1. Kejseren der elskede tøj",
                chapterEn: "1. The Emperor Who Loved Clothes",
                text: "For mange år siden levede en kejser, som holdt så uhyre meget af nyt, smukt tøj. Han brugte alle sine penge på at være fin. Han bekymrede sig ikke om sine soldater, og han gik kun i teatret for at vise sit nye tøj frem. Han havde en ny frakke for hver time på dagen!\n\nI den store by kom der mange fremmede på besøg. En dag ankom to bedragere. De sagde, at de var vævere, og at de kunne lave det mest fantastiske stof i verden.",
                audioText: "For mange år siden levede en kejser, som holdt så uhyre meget af nyt, smukt tøj. Han brugte alle sine penge på at være fin. Han bekymrede sig ikke om sine soldater, og han gik kun i teatret for at vise sit nye tøj frem. Han havde en ny frakke for hver time på dagen! I den store by kom der mange fremmede på besøg. En dag ankom to bedragere. De sagde, at de var vævere, og at de kunne lave det mest fantastiske stof i verden."
            },
            {
                chapter: "2. Det usynlige stof",
                chapterEn: "2. The Invisible Cloth",
                text: "»Vores tøj har en magisk egenskab,« sagde de to bedragere. »Det er usynligt for ethvert menneske, som er dumt eller ikke duer til sit arbejde.«\n\n»Det må være en vidunderlig dragt!« tænkte kejseren. »Når jeg tager det tøj på, kan jeg finde ud af, hvem i mit rige der er kloge, og hvem der er dumme!« Han gav bedragerne en masse guld for at begynde arbejdet straks.\n\nBedragerne satte to vævestole op og lod som om, de arbejdede hårdt. Men der var ingenting på vævene!",
                audioText: "Vores tøj har en magisk egenskab, sagde de to bedragere. Det er usynligt for ethvert menneske, som er dumt eller ikke duer til sit arbejde. Det må være en vidunderlig dragt! tænkte kejseren. Når jeg tager det tøj på, kan jeg finde ud af, hvem i mit rige der er kloge, og hvem der er dumme! Han gav bedragerne en masse guld for at begynde arbejdet straks. Bedragerne satte to vævestole op og lod som om, de arbejdede hårdt. Men der var ingenting på vævene!"
            },
            {
                chapter: "3. Den gamle ministers besøg",
                chapterEn: "3. The Old Minister's Visit",
                text: "Kejseren sendte sin ældste og klogeste minister hen for at se stoffet. Da den gamle mand kiggede på væven, spærrede han øjnene op. Han kunne overhovedet ingenting se!\n\n»Gud bevares!« tænkte ministeren. »Er jeg dum? Duer jeg ikke til mit embede? Det må ingen vide!« Så han roste stoffet: »Åh, farverne er vidunderlige! Mønstret er enestående!«\n\nSenere kom kejseren selv sammen med sit hof. Alle var bange for at virke dumme, så alle råbte i kor: »Det er mageløst! Det er fantastisk!«",
                audioText: "Kejseren sendte sin ældste og klogeste minister hen for at se stoffet. Da den gamle mand kiggede på væven, spærrede han øjnene op. Han kunne overhovedet ingenting se! Gud bevares! tænkte ministeren. Er jeg dum? Duer jeg ikke til mit embede? Det må ingen vide! Så han roste stoffet: Åh, farverne er vidunderlige! Mønstret er enestående! Senere kom kejseren selv sammen med sit hof. Alle var bange for at virke dumme, så alle råbte i kor: Det er mageløst! Det er fantastisk!"
            },
            {
                chapter: "4. Den store procession",
                chapterEn: "4. The Grand Procession",
                text: "Den næste dag tog kejseren sit nye »tøj« på foran spejlet. Bedragerne løftede hænderne og sagde: »Se, her er bukserne! Her er kappen! De er så lette som spindelvæv!« Kejseren vendte og drejede sig og sagde: »Hvor sidder det godt!«\n\nSå gik kejseren ud i procession under den store baldakin. Folk på gaden og i vinduerne råbte: »Gud, hvor er kejserens nye tøj uforligneligt!« Ingen ville indrømme, at de intet så.\n\nMen pludselig sagde et lille barn: »Men han har jo ikke noget tøj på!«\n\nFaderen sagde: »Hør den uskyldiges røst!« Og folk hviskede det videre til hinanden: »Han har ikke noget tøj på!« Til sidst råbte hele folket: »Han har jo ikke noget tøj på!«\n\nKejseren gøs, for han vidste, at de havde ret. Men han tænkte: »Nu må jeg holde ud til paraden er slut!« Og så gik han endnu mere stolt videre, mens kammerherrerne bar på slæbet, som slet ikke var der.",
                audioText: "Den næste dag tog kejseren sit nye tøj på foran spejlet. Bedragerne løftede hænderne og sagde: Se, her er bukserne! Her er kappen! De er så lette som spindelvæv! Kejseren vendte og drejede sig og sagde: Hvor sidder det godt! Så gik kejseren ud i procession under den store baldakin. Folk på gaden og i vinduerne råbte: Gud, hvor er kejserens nye tøj uforligneligt! Ingen ville indrømme, at de intet så. Men pludselig sagde et lille barn: Men han har jo ikke noget tøj på! Faderen sagde: Hør den uskyldiges røst! Og folk hviskede det videre til hinanden: Han har ikke noget tøj på! Til sidst råbte hele folket: Han har jo ikke noget tøj på! Kejseren gøs, for han vidste, at de havde ret. Men han tænkte: Nu må jeg holde ud til paraden er slut! Og så gik han endnu mere stolt videre, mens kammerherrerne bar på slæbet, som slet ikke var der."
            }
        ],
        vocabulary: [
            { word: "en kejser", type: "substantiv", meaningDa: "den øverste hersker i et rige (over en konge)", meaningEn: "an emperor" },
            { word: "en bedrager", type: "substantiv", meaningDa: "en person der snyder og lyver for at få penge", meaningEn: "a swindler / fraud" },
            { word: "usynlig", type: "adjektiv", meaningDa: "noget som øjet ikke kan se", meaningEn: "invisible" },
            { word: "en minister", type: "substantiv", meaningDa: "en vigtig rådgiver for landets leder", meaningEn: "a government minister" },
            { word: "at lade som om", type: "talemåde", meaningDa: "at opføre sig som om noget er sandt, selvom det er falsk", meaningEn: "to pretend" },
            { word: "en procession", type: "substantiv", meaningDa: "et højtideligt optog gennem byen", meaningEn: "a procession / parade" }
        ],
        quiz: [
            {
                question: "Hvad sagde bedragerne, at stoffet kunne?",
                options: [
                    "Det kunne gøre kejseren usårlig i krig",
                    "Det var usynligt for dumme mennesker",
                    "Det kunne skifte farve om natten"
                ],
                correctIndex: 1,
                explanation: "De påstod, at kun kloge og dygtige mennesker kunne se stoffet."
            },
            {
                question: "Hvorfor sagde ministeren ikke, at han ingenting kunne se?",
                options: [
                    "Fordi han sov",
                    "Fordi han var bange for at blive regnet for dum",
                    "Fordi han kunne lide bedragerne"
                ],
                correctIndex: 1,
                explanation: "Han var bange for, at folk ville tro, han var dum eller uegnet til sit arbejde."
            },
            {
                question: "Hvem sagde sandheden til sidst?",
                options: [
                    "Et lille barn",
                    "Dronningen",
                    "En klog hund"
                ],
                correctIndex: 0,
                explanation: "Et uskyldigt barn råbte: »Men han har jo ikke noget tøj på!«"
            }
        ]
    },

    {
        id: "prinsessen_paa_aerten",
        title: "Prinsessen på ærten",
        titleEn: "The Princess and the Pea",
        icon: "🪡",
        level: "Meget let (A1-A2)",
        readingTime: "2 min",
        quote: "»Det er ganske vist!«",
        quoteEn: "»And this is a true story!«",
        teaser: "En stormfuld aften banker en våd pige på slottets dør og påstår, at hun er en rigtig prinsesse. Dronningen finder en lille grøn ært frem.",
        teaserEn: "One stormy night, a soaked girl knocks on the palace door claiming to be a true princess. The queen finds a small green pea.",
        grammarFocus: {
            title: "Sprog-spot: Adjektiver og 'Der var engang'",
            desc: "Bemærk brugen af præpositionsled (*på ærten, under tyve madrasser*) og sammensatte tillægsord (*gennemblødt, frygtelig*)."
        },
        sections: [
            {
                chapter: "1. Prinsen der søgte en rigtig prinsesse",
                chapterEn: "1. The Prince Seeking a True Princess",
                text: "Der var engang en prins. Han ville så gerne have en prinsesse, men det skulle være en rigtig prinsesse! Han rejste hele verden rundt for at finde en, men overalt var der noget i vejen.\n\nPrinsesser var der nok af, men om de var rigtige prinsesser, kunne han ikke vide med sikkerhed. Der var altid noget, som ikke var helt rigtigt. Så kom han hjem igen og var så bedrøvet, for han ville så frygtelig gerne have en ægte prinsesse.",
                audioText: "Der var engang en prins. Han ville så gerne have en prinsesse, men det skulle være en rigtig prinsesse! Han rejste hele verden rundt for at finde en, men overalt var der noget i vejen. Prinsesser var der nok af, men om de var rigtige prinsesser, kunne han ikke vide med sikkerhed. Der var altid noget, som ikke var helt rigtigt. Så kom han hjem igen og var så bedrøvet, for han ville så frygtelig gerne have en ægte prinsesse."
            },
            {
                chapter: "2. Uvejret og den mystiske gæst",
                chapterEn: "2. The Storm and the Mysterious Guest",
                text: "En aften blev det et frygteligt vejr. Det lynede og tordnede, og regnen skyllede ned. Det var ganske forskrækkeligt!\n\nPludselig bankede det på byens port. Den gamle konge gik hen og lukkede op.\n\nUdenfor stod en prinsesse. Men Gud, hvor så hun ud af regnen og det onde vejr! Vandet løb ned ad hendes hår og hendes klæder. Det løb ind ad næsen på hendes sko og ud ad hælen. Alligevel sagde hun, at hun var en rigtig prinsesse.\n\n»Ja, det skal vi snart få at vide!« tænkte den gamle dronning. Hun sagde ikke noget, men gik ind i sovekammeret. Hun tog alt sengetøjet af og lagde en lille ært på bunden af sengen. Oven på ærten lagde hun tyve madrasser og tyve store dundyner. Der skulle prinsessen sove i nat.",
                audioText: "En aften blev det et frygteligt vejr. Det lynede og tordnede, og regnen skyllede ned. Det var ganske forskrækkeligt! Pludselig bankede det på byens port. Den gamle konge gik hen og lukkede op. Udenfor stod en prinsesse. Men Gud, hvor så hun ud af regnen og det onde vejr! Vandet løb ned ad hendes hår og hendes klæder. Det løb ind ad næsen på hendes sko og ud ad hælen. Alligevel sagde hun, at hun var en rigtig prinsesse. Ja, det skal vi snart få at vide! tænkte den gamle dronning. Hun sagde ikke noget, men gik ind i sovekammeret. Hun tog alt sengetøjet af og lagde en lille ært på bunden af sengen. Oven på ærten lagde hun tyve madrasser og tyve store dundyner. Der skulle prinsessen sove i nat."
            },
            {
                chapter: "3. Den ømme ryg og det kongelige bryllup",
                chapterEn: "3. The Sore Back and the Royal Wedding",
                text: "Næste morgen spurgte de hende ved morgenbordet, hvordan hun havde sovet.\n\n»Åh, ganske forfærdeligt!« sagde prinsessen. »Jeg har næsten ikke lukket et øje i hele nat! Gud må vide, hvad der har ligget i den seng? Jeg har ligget på noget hårdt, så jeg er ganske brun og blå over hele kroppen! Det er ganske frygteligt!«\n\nNu vidste de, at hun var en rigtig prinsesse! Kun en ægte prinsesse kunne have så fin og følsom en hud, at hun mærkede en lille ært igennem tyve madrasser og tyve dundyner!\n\nPrinsen tog hende til kone, for nu vidste han, at han havde fundet en rigtig prinsesse. Og ærten kom på museum, hvor man stadig kan se den, hvis ingen har stjålet den. Se, det var en rigtig historie!",
                audioText: "Næste morgen spurgte de hende ved morgenbordet, hvordan hun havde sovet. Åh, ganske forfærdeligt! sagde prinsessen. Jeg har næsten ikke lukket et øje i hele nat! Gud må vide, hvad der har ligget i den seng? Jeg har ligget på noget hårdt, så jeg er ganske brun og blå over hele kroppen! Det er ganske frygteligt! Nu vidste de, at hun var en rigtig prinsesse! Kun en ægte prinsesse kunne have så fin og følsom en hud, at hun mærkede en lille ært igennem tyve madrasser og tyve dundyner! Prinsen tog hende til kone, for nu vidste han, at han havde fundet en rigtig prinsesse. Og ærten kom på museum, hvor man stadig kan se den, hvis ingen har stjålet den. Se, det var en rigtig historie!"
            }
        ],
        vocabulary: [
            { word: "et uvejr", type: "substantiv", meaningDa: "voldsomt regnvejr med blæst og torden", meaningEn: "a violent storm" },
            { word: "en ært", type: "substantiv", meaningDa: "en lille, rund og grøn grøntsag", meaningEn: "a pea" },
            { word: "en madras", type: "substantiv", meaningDa: "en blød pude man sover på i sengen", meaningEn: "a mattress" },
            { word: "en dundyne", type: "substantiv", meaningDa: "en varm dyne fyldt med bløde fuglefjer", meaningEn: "a feather duvet" },
            { word: "følsom", type: "adjektiv", meaningDa: "som nemt mærker og reagerer på sanseindtryk", meaningEn: "sensitive / delicate" },
            { word: "ganske vist", type: "talemåde", meaningDa: "helt sikkert, sandt", meaningEn: "quite true / indeed" }
        ],
        quiz: [
            {
                question: "Hvad lagde dronningen under de tyve madrasser?",
                options: [
                    "En guldring",
                    "En lille grøn ært",
                    "En nøgle"
                ],
                correctIndex: 1,
                explanation: "Hun lagde en lille ært helt i bunden af sengen for at teste pigen."
            },
            {
                question: "Hvordan havde pigen sovet?",
                options: [
                    "Rigtig godt og tungt",
                    "Ganske forfærdeligt, fordi noget hårdt trykkede på hendes ryg",
                    "Hun sov slet ikke i sengen"
                ],
                correctIndex: 1,
                explanation: "Hun havde ligget på noget hårdt og var helt øm over kroppen."
            },
            {
                question: "Hvor kom ærten hen til sidst?",
                options: [
                    "Den blev spist til aftensmad",
                    "Den kom på et museum",
                    "Den blev plantet i haven"
                ],
                correctIndex: 1,
                explanation: "Ærten blev udstillet på et museum som bevis på historien."
            }
        ]
    },

    {
        id: "fyrtoejet",
        title: "Fyrtøjet",
        titleEn: "The Tinderbox",
        icon: "🐕",
        level: "Let-mellem (A2-B1)",
        readingTime: "4 min",
        quote: "»Hund med øjne så store som tekopper, møllehjul og Rundetårn!«",
        quoteEn: "»A dog with eyes as big as teacups, millwheels, and the Round Tower!«",
        teaser: "En modig soldat møder en heks på landevejen. Han klatrer ned i et hult træ for at hente et magisk fyrtøj og tre kister med penge.",
        teaserEn: "A brave soldier meets a witch on the road. He climbs down a hollow tree to fetch a magic tinderbox and three chests of money.",
        grammarFocus: {
            title: "Sprog-spot: Sammenligninger med 'så ... som'",
            desc: "H.C. Andersen elsker fantasifulde sammenligninger: *»øjne så store som tekopper«* (ligesom *»så hurtig som en hest«*)."
        },
        sections: [
            {
                chapter: "1. Soldaten og heksen",
                chapterEn: "1. The Soldier and the Witch",
                text: "Der kom en soldat marcherende hen ad landevejen: »En, to! En, to!« Han havde sin tornyster på ryggen og en sabel ved siden, for han havde været i krig, og nu ville han hjem.\n\nSå mødte han en gammel heks på vejen. Hun var så fæl, hendes underlæbe hang helt ned på brystet. »God aften, tapre soldat!« sagde hun. »Hvor du har et flot sværd og en stor taske! Du er en rigtig soldat. Du skal få så mange penge, du overhovedet orker at bære!«\n\n»Mange tak, gamle heks!« sagde soldaten.",
                audioText: "Der kom en soldat marcherende hen ad landevejen: En, to! En, to! Han havde sin tornyster på ryggen og en sabel ved siden, for han havde været i krig, og nu ville han hjem. Så mødte han en gammel heks på vejen. Hun var så fæl, hendes underlæbe hang helt ned på brystet. God aften, tapre soldat! sagde hun. Hvor du har et flot sværd og en stor taske! Du er en rigtig soldat. Du skal få så mange penge, du overhovedet orker at bære! Mange tak, gamle heks! sagde soldaten."
            },
            {
                chapter: "2. Det hule træ og de tre hunde",
                chapterEn: "2. The Hollow Tree and the Three Dogs",
                text: "Heksen pegede på et stort, hult træ: »Kravl op i toppen af træet og lad dig dumpe ned i hullet. Jeg binder et reb om din mave, så jeg kan hejse dig op igen. Nede i bunden er der en stor gang med hundredvis af lamper. Der er tre døre:\n\nBag den første dør sidder en hund med øjne så store som tekopper. Sæt den på mit forklæde, så gør den dig ingenting, og tag så mange kobbermønter, du vil!\n\nBag den anden dør sidder en hund med øjne så store som møllehjul. Sæt den på forklædet og fyld lommerne med sølvmønter!\n\nBag den tredje dør sidder en hund med øjne så store som Rundetårn! Tag den op, og du kan tage guld i store mængder!\n\nAlt hvad jeg vil have, er et gammelt fyrtøj, som min bedstemor glemte dernede.«",
                audioText: "Heksen pegede på et stort, hult træ: Kravl op i toppen af træet og lad dig dumpe ned i hullet. Jeg binder et reb om din mave, så jeg kan hejse dig op igen. Nede i bunden er der en stor gang med hundredvis af lamper. Der er tre døre: Bag den første dør sidder en hund med øjne så store som tekopper. Sæt den på mit forklæde, så gør den dig ingenting, og tag så mange kobbermønter, du vil! Bag den anden dør sidder en hund med øjne så store som møllehjul. Sæt den på forklædet og fyld lommerne med sølvmønter! Bag den tredje dør sidder en hund med øjne så store som Rundetårn! Tag den op, og du kan tage guld i store mængder! Alt hvad jeg vil have, er et gammelt fyrtøj, som min bedstemor glemte dernede."
            },
            {
                chapter: "3. Rigdom og det magiske lys",
                chapterEn: "3. Wealth and the Magic Light",
                text: "Soldaten krøb ned i træet. Alt var præcis, som heksen havde sagt. Han fyldte sine lommer, sin støvler og sin taske med skinnende guld! Så tog han fyrtøjet og råbte: »Hejs mig op, heks!«\n\nMen da heksen ikke ville forklare, hvad hun skulle bruge fyrtøjet til, huggede soldaten hovedet af hende og gik ind til byen.\n\nNu levede han som en rig herre! Han boede i de fineste værelser, gav gaver til de fattige og fik mange »venner«. Men da pengene slap op, forsvandt vennerne. Han måtte flytte op på et lille, mørkt loftskammer. En aften ville han tænde et lille lys med det gamle fyrtøj. Han slog ild: Én gang – to gange – tre gange!",
                audioText: "Soldaten krøb ned i træet. Alt var præcis, som heksen havde sagt. Han fyldte sine lommer, sin støvler og sin taske med skinnende guld! Så tog han fyrtøjet og råbte: Hejs mig op, heks! Men da heksen ikke ville forklare, hvad hun skulle bruge fyrtøjet til, huggede soldaten hovedet af hende og gik ind til byen. Nu levede han som en rig herre! Han boede i de fineste værelser, gav gaver til de fattige og fik mange venner. Men da pengene slap op, forsvandt vennerne. Han måtte flytte op på et lille, mørkt loftskammer. En aften ville han tænde et lille lys med det gamle fyrtøj. Han slog ild: Én gang – to gange – tre gange!"
            },
            {
                chapter: "4. Hundene hjælper soldaten",
                chapterEn: "4. The Dogs Help the Soldier",
                text: "Pludselig sprang døren op! Foran ham stod hunden med øjne så store som tekopper. »Hvad befaler min herre?« spurgte hunden.\n\n»Skaf mig penge!« sagde soldaten, og vupti – et øjeblik efter kom hunden tilbage med en stor pose mønter!\n\nNu forstod han hemmeligheden: Slog han én gang, kom hunden med kobberpenge. Slog han to gange, kom hunden med sølvpenge. Og slog han tre gange, kom den store hund med guld!\n\nSenere hjalp de magiske hunde ham med at befri den smukke prinsesse fra kongens fængsel. Soldaten og prinsessen blev gift, og ved den store fest sad alle tre hunde med ved bordet og spærrede øjnene op!",
                audioText: "Pludselig sprang døren op! Foran ham stod hunden med øjne så store som tekopper. Hvad befaler min herre? spurgte hunden. Skaf mig penge! sagde soldaten, og vupti – et øjeblik efter kom hunden tilbage med en stor pose mønter! Nu forstod han hemmeligheden: Slog han én gang, kom hunden med kobberpenge. Slog han to gange, kom hunden med sølvpenge. Og slog han tre gange, kom den store hund med guld! Senere hjalp de magiske hunde ham med at befri den smukke prinsesse fra kongens fængsel. Soldaten og prinsessen blev gift, og ved den store fest sad alle tre hunde med ved bordet og spærrede øjnene op!"
            }
        ],
        vocabulary: [
            { word: "en sabel", type: "substantiv", meaningDa: "et langt, buet sværd som soldater bar", meaningEn: "a sabre / sword" },
            { word: "et fyrtøj", type: "substantiv", meaningDa: "et gammelt redskab til at slå gnister og tænde ild", meaningEn: "a tinderbox" },
            { word: "fæl", type: "adjektiv", meaningDa: "grim og ubehagelig", meaningEn: "hideous / foul" },
            { word: "et møllehjul", type: "substantiv", meaningDa: "det store, tunge hjul i en vind- eller vandmølle", meaningEn: "a millwheel" },
            { word: "Rundetårn", type: "egenavn", meaningDa: "et berømt, højt rundt tårn i København", meaningEn: "The Round Tower (in Copenhagen)" },
            { word: "at befale", type: "verbum", meaningDa: "at give ordre til nogen", meaningEn: "to command / order" }
        ],
        quiz: [
            {
                question: "Hvor store øjne havde den tredje hund?",
                options: [
                    "Så store som tekopper",
                    "Så store som møllehjul",
                    "Så store som Rundetårn"
                ],
                correctIndex: 2,
                explanation: "Den tredje og største hund havde øjne så store som Rundetårn."
            },
            {
                question: "Hvad skete der, når soldaten slog ild med fyrtøjet?",
                options: [
                    "Der kom røg ud af vinduet",
                    "Hundene dukkede op og udførte hans ønsker",
                    "Han blev usynlig"
                ],
                correctIndex: 1,
                explanation: "Hundene kom straks og bragte ham penge og hjalp ham."
            },
            {
                question: "Hvordan ender eventyret?",
                options: [
                    "Soldaten mister alt sit guld",
                    "Soldaten gifter sig med prinsessen",
                    "Heksen vender tilbage og tager fyrtøjet"
                ],
                correctIndex: 1,
                explanation: "Soldaten og prinsessen bliver gift, og hundene fejrer med ved brylluppet!"
            }
        ]
    }
];
