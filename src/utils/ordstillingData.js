export const ordstillingData = {
    hovedsaetninger: {
        title: "Adverbier i Hovedsætninger",
        illustration: "v2_master_diagram.png", // Genbruger en illustration midlertidigt
        explanation: "<strong>Reglen for hovedsætninger:</strong> I en hovedsætning står centraladverbiet (fx 'ikke', 'altid', 'aldrig') <strong>efter</strong> verbet.<br><em>Husk: Subjekt (S) + Verbum (V) + Adverbium (a)</em>",
        sentences: [
            {
                lockedPrefix: "Det regner, så vi",
                lockedSuffix: ".",
                draggable: ["bliver", "ikke", "ude"],
                correct: "bliver ikke ude",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Bilen er lille, men den",
                lockedSuffix: "meget hurtigt.",
                draggable: ["kører", "faktisk"],
                correct: "kører faktisk",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Jeg vil gerne sove, for jeg",
                lockedSuffix: "før klokken seks.",
                draggable: ["møder", "altid", "på", "arbejde"],
                correct: "møder altid på arbejde",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Han spiser et æble, for han",
                lockedSuffix: "om morgenen.",
                draggable: ["er", "ofte", "sulten"],
                correct: "er ofte sulten",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Vi køber ind, og vi",
                lockedSuffix: "aftensmad bagefter.",
                draggable: ["laver", "nok"],
                correct: "laver nok",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            }
        ]
    },
    ledsaetninger: {
        title: "Adverbier i Ledsætninger",
        illustration: "v2_master_diagram.png",
        explanation: "<strong>Reglen for ledsætninger:</strong> I en ledsætning står centraladverbiet (fx 'ikke', 'altid', 'aldrig') <strong>før</strong> verbet.<br><em>Husk: Konjunktion + Subjekt (S) + Adverbium (a) + Verbum (V)</em>",
        sentences: [
            {
                lockedPrefix: "Han er sur, fordi han",
                lockedSuffix: ".",
                draggable: ["ikke", "har", "sovet"],
                correct: "ikke har sovet",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Vi bliver hjemme, når det",
                lockedSuffix: "så meget.",
                draggable: ["allerede", "regner"],
                correct: "allerede regner",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Jeg kører bil, selvom jeg",
                lockedSuffix: "kørekort.",
                draggable: ["ikke", "har"],
                correct: "ikke har",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Hun tager paraply med, da hun",
                lockedSuffix: "våd.",
                draggable: ["aldrig", "vil", "være"],
                correct: "aldrig vil være",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Han spiser æblet, hvis han",
                lockedSuffix: "sulten.",
                draggable: ["stadig", "er"],
                correct: "stadig er",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            }
        ]
    },
    inversion: {
        title: "Inversion",
        illustration: "v2_master_diagram.png",
        explanation: "<strong>Reglen for inversion:</strong> Når en sætning starter med noget andet end subjektet (fx en ledsætning), bytter subjekt og verbum plads i hovedsætningen.<br><em>Husk: [Ledsætning] + Verbum (V) + Subjekt (S)</em>",
        sentences: [
            {
                lockedPrefix: "Da det regnede,",
                lockedSuffix: ".",
                draggable: ["blev", "vi", "hjemme"],
                correct: "blev vi hjemme",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Fordi han er sulten,",
                lockedSuffix: ".",
                draggable: ["spiser", "han", "et", "æble"],
                correct: "spiser han et æble",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Når jeg ser min hund,",
                lockedSuffix: ".",
                draggable: ["bliver", "jeg", "meget", "glad"],
                correct: "bliver jeg meget glad",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Da jeg var 10 år gammel,",
                lockedSuffix: ".",
                draggable: ["flyttede", "vi", "til", "Aarhus"],
                correct: "flyttede vi til Aarhus",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            },
            {
                lockedPrefix: "Selvom bilen er lille,",
                lockedSuffix: ".",
                draggable: ["kører", "den", "meget", "hurtigt"],
                correct: "kører den meget hurtigt",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i den del af sætningen, du bygger?"
            }
        ]
    },
    master: {
        title: "Master: Inversion + Adverbium",
        illustration: "v2_master_diagram.png",
        explanation: "<strong>Master-udfordringen:</strong> Kombiner alt det du har lært. Ledsætningen har adverbiet <em>før</em> verbet. Hovedsætningen bagefter har inversion (V + S) og adverbiet står <em>efter</em> subjektet.",
        sentences: [
            {
                lockedPrefix: "Fordi det",
                lockedSuffix: "inde.",
                draggable: ["ofte", "regner,", "bliver", "vi", "ofte"],
                correct: "ofte regner, bliver vi ofte",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i de to dele af sætningen?"
            },
            {
                lockedPrefix: "Selvom han",
                lockedSuffix: "til festen.",
                draggable: ["aldrig", "har", "tid,", "kommer", "han", "altid"],
                correct: "aldrig har tid, kommer han altid",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i de to dele af sætningen?"
            },
            {
                lockedPrefix: "Når jeg",
                lockedSuffix: "til ham.",
                draggable: ["ikke", "kan", "sove,", "ringer", "jeg", "ofte"],
                correct: "ikke kan sove, ringer jeg ofte",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i de to dele af sætningen?"
            },
            {
                lockedPrefix: "Hvis vi",
                lockedSuffix: "vi nok i byen.",
                draggable: ["ikke", "spiser", "nu,", "tager"],
                correct: "ikke spiser nu, tager",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i de to dele af sætningen?"
            },
            {
                lockedPrefix: "Da han",
                lockedSuffix: "han den alligevel.",
                draggable: ["ikke", "havde", "råd,", "købte"],
                correct: "ikke havde råd, købte",
                hint: "Se rammen ovenfor: Hvad er subjekt og verbum i de to dele af sætningen?"
            }
        ]
    }
};
