export const conjunctionData = {
    traening1: [
        [
            {
                sentence: ["Jeg fryser,", "det er koldt udenfor."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "fordi",
                hints: {
                    "og": "'Og' lægger bare ting sammen. Her har vi en klar årsag til, at du fryser.",
                    "men": "Der er ikke en modsætning. Kulde gør jo, at man fryser.",
                    "når": "'Når' er ikke så stærk en årsag som 'fordi' i denne sammenhæng.",
                    "da": "'Da' bruges i datid (fortid), men her står der 'fryser' og 'er'."
                },
                feedback: "Korrekt! 'Fordi' viser os grunden til, at du fryser."
            },
            {
                sentence: ["Jeg vil gerne sove,", "jeg skal på arbejde."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "men",
                hints: {
                    "og": "Her er et lille problem: lysten til at sove går imod pligten til at arbejde.",
                    "fordi": "Du vil ikke sove PÅ GRUND AF arbejdet.",
                    "når": "Tid passer ikke ind her.",
                    "da": "Det er nutid."
                },
                feedback: "Korrekt! 'Men' viser meget fint en modsætning mellem ønske og pligt."
            },
            {
                sentence: ["Solen skinner,", "fuglene synger."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "og",
                hints: {
                    "men": "Der er to positive ting uden modsætning.",
                    "fordi": "Solen skinner jo ikke, FORDI fuglene synger (det er ikke fuglenes skyld).",
                    "når": "Man kunne måske, men 'og' binder de to sidestillede udsagn bedst sammen.",
                    "da": "Det er nutid."
                },
                feedback: "Korrekt! 'Og' kobler nemt to ligeværdige fakta sammen."
            },
            {
                sentence: ["Jeg bliver meget glad,", "jeg ser min hund."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "når",
                hints: {
                    "og": "Sætningen viser, at den ene ting udeløser den anden hver gang.",
                    "men": "Hunde plejer ikke at være en dårlig ting (ingen modsætning).",
                    "fordi": "Ordet kan også bruges, men vi vil gerne vise vanen i tiden.",
                    "da": "Vi bruger kun 'da' om én bestemt gang i fortiden."
                },
                feedback: "Korrekt! 'Når' bruges, fordi dette sker mere end én gang (en vane)."
            },
            {
                sentence: ["Jeg boede i København,", "jeg var lille."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "da",
                hints: {
                    "og": "Passer ikke tidsmæssigt sammen.",
                    "men": "Det er bare fakta fra fortiden.",
                    "fordi": "At være lille er ikke nødvendigvis årsagen til, at man bor i København.",
                    "når": "Husk reglen: 'Først da, så når'. Én gang i fortiden = da."
                },
                feedback: "Korrekt! 'Da' peger på en bestemt, enkeltstående periode i fortiden."
            }
        ],
        [
            {
                sentence: ["Bilen er lille,", "den er meget hurtig."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "men",
                hints: {
                    "og": "'Lille' og 'meget hurtig' skaber ofte en uventet kontrast i biler.",
                    "fordi": "En bil er ikke typisk meget hurtig GRUNDET dens lidenhed.",
                    "når": "Det har ikke noget med tid at gøre.",
                    "da": "Nutid."
                },
                feedback: "Korrekt! Hurtighed fra en meget lille bil er oftest en overraskelse (men)."
            },
            {
                sentence: ["Han spiser et æble,", "han er sulten."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "fordi",
                hints: {
                    "og": "Der er en direkte grund her.",
                    "men": "Han er sulten, så det er logisk, at han spiser! Ingen modsætning.",
                    "når": "Tid virker dårligere end at fortælle årsagen klart.",
                    "da": "Nutid."
                },
                feedback: "Korrekt! 'Fordi' er bindeordet for grund og årsag."
            },
            {
                sentence: ["Jeg ringer til dig,", "jeg kommer hjem fra skole."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "når",
                hints: {
                    "og": "Den sidste sætning er en tidsbetingelse for den første.",
                    "men": "Intet forhindrer opkaldet.",
                    "fordi": "Din hjemkomst er betingelsen for opkaldet, ikke begrundelsen for overhovedet at kende dig.",
                    "da": "Dette sker i fremtiden! 'Da' hører hjemme i fortiden."
                },
                feedback: "Korrekt! Ved punktnedslag i fremtiden benytter vi 'når'."
            },
            {
                sentence: ["Jeg var 10 år gammel,", "vi flyttede til Aarhus."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "da",
                hints: {
                    "og": "Vi skal bruge et tidsord for at forbinde alderen med flytningen.",
                    "men": "Alderen forhindrede jer jo ikke.",
                    "fordi": "Din alder var ikke årsagen til familiens flytning.",
                    "når": "Dette skete kun én gang for længe siden. Husk: 'Da'."
                },
                feedback: "Korrekt! En utvetydig handling foretaget i fortiden tager 'da'."
            },
            {
                sentence: ["Vi køber mælk", "brød i supermarkedet."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "og",
                hints: {
                    "men": "I kan sagtens købe begge dele uden modsætning.",
                    "fordi": "Mælk købes ikke fordi 'brød i supermarkedet'.",
                    "når": "Giver ingen grammatisk mening her.",
                    "da": "Giver ingen grammatisk mening her."
                },
                feedback: "Korrekt! 'Og' binder navneordene klassisk og fint sammen."
            }
        ]
    ],
    traening2: {
        'da_naar': {
            title: "Da / når?",
            illustration: "da_naar_guide_future.jpg",
            explanation: "<strong>Da / Når?</strong><br><em>'Da' peger på et enkeltstående punkt i fortiden (tegnestiften). 'Når' bruges om gentagne vaner (cirklen) eller begivenheder i fremtiden (pilen).</em>",
            questions: [
                {
                    sentence: ["Jeg var i Italien,", "jeg var barn."],
                    options: ["da", "når"],
                    correct: "da",
                    hints: {
                        "når": "Husk illustrationen: At være barn er ét bestemt punkt i fortiden (tegnestiften), ikke en tilbagevendende vane (cirklen)."
                    },
                    feedback: "Korrekt! Vi sætter tegnestiften 'da' i en specifik periode i fortiden."
                },
                {
                    sentence: ["", "jeg kommer hjem, ringer jeg til dig."],
                    options: ["Da", "Når"],
                    correct: "Når",
                    hints: {
                        "Da": "Sætningen handler om en handling, der skyder fremad i tid. Husk illustrationen: Fremtiden kræver 'Når' (den fremadrettede pil)."
                    },
                    feedback: "Korrekt! 'Når' bruges, fordi vi kigger fremad i tiden (den lysende pil)."
                },
                {
                    sentence: ["Jeg blev meget glad,", "jeg så min karakter."],
                    options: ["da", "når"],
                    correct: "da",
                    hints: {
                        "når": "At se sin karakter skete på ét bestemt tidspunkt i fortiden. Det er en tegnestift, ikke en cirkel."
                    },
                    feedback: "Korrekt! Enkeltstående handling i fortiden kræver tegnestiften 'da'."
                },
                {
                    sentence: ["", "det regner, tager jeg altid paraply med."],
                    options: ["Da", "Når"],
                    correct: "Når",
                    hints: {
                        "Da": "Ordet 'altid' viser os, at det er en vane, der gentager sig igen og igen. Husk cirklen!"
                    },
                    feedback: "Korrekt! 'Når' bruges til vaner (den grønne cirkel)."
                },
                {
                    sentence: ["Vi spiste is,", "vi var på stranden i går."],
                    options: ["da", "når"],
                    correct: "da",
                    hints: {
                        "når": "Strandturen skete 'i går', hvilket er afsluttet. Den grønne cirkel eller fremtidspilen passer ikke her - du skal bruge tegnestiften!"
                    },
                    feedback: "Korrekt! Fortidens punktnedslag fanges med 'da'."
                }
            ]
        },
        'fordi_derfor': {
            title: "Fordi / derfor",
            illustration: "tekstflow_dynamik.png",
            explanation: "<strong>Fordi / derfor</strong><br><em>'Fordi' peger bagud mod årsagen til det skete. 'Derfor' skubber handlingen frem mod konsekvensen.</em>",
            questions: [
                {
                    sentence: ["Jeg har en paraply med,", "det regner."],
                    options: ["fordi", "derfor"],
                    correct: "fordi",
                    hints: {
                        "derfor": "Prøv at se på illustrationen. 'Derfor' skubber handlingen fremad mod et resultat. Her peger vi bagud på årsagen (regnen)."
                    },
                    feedback: "Korrekt! 'Fordi' rammer bagud på selve grunden."
                },
                {
                    sentence: ["Det regner,", "har jeg en paraply med."],
                    options: ["fordi", "derfor"],
                    correct: "derfor",
                    hints: {
                        "fordi": "Her er regnen allerede sket, og det 'skubber' til din næste handling. Du skal bruge det ord, der skyder fremad!"
                    },
                    feedback: "Korrekt! 'Derfor' skubber konsekvensen af regnen ud."
                },
                {
                    sentence: ["Han er træt,", "han ikke sov i nat."],
                    options: ["fordi", "derfor"],
                    correct: "fordi",
                    hints: {
                        "derfor": "Søvnmanglen er årsagen, som ligger *bag* trætheden. Vi skal bruge ordet, der forbinder os med årsagen."
                    },
                    feedback: "Korrekt! 'Fordi' kigger tilbage på roden til problemet."
                },
                {
                    sentence: ["Han sov ikke i nat,", "er han træt."],
                    options: ["fordi", "derfor"],
                    correct: "derfor",
                    hints: {
                        "fordi": "Søvnmanglen er præsenteret. Nu skal energien skubbes frem mod resultatet: trætheden. Brug ordet, der skyder handlingen afsted."
                    },
                    feedback: "Korrekt! 'Derfor' viser os den logiske konsekvens, der skydes fremad."
                },
                {
                    sentence: ["Vi bliver hjemme,", "vi vil slappe af."],
                    options: ["fordi", "derfor"],
                    correct: "fordi",
                    hints: {
                        "derfor": "Viljen til at slappe af er årsagen til, at vi bliver hjemme. Vi skubber ikke handlingen frem her, vi begrunder den."
                    },
                    feedback: "Korrekt! 'Fordi' præsenterer baggrunden."
                }
            ]
        },
        'selvom_alligevel': {
            title: "Selvom / alligevel",
            illustration: "tekstflow_dynamik.png",
            explanation: "<strong>Selvom / Alligevel</strong><br><em>'Selvom' er muren / forhindringen. 'Alligevel' er bolden, der kommer igennem muren (handlingen gennemføres trods forhindringen).</em>",
            questions: [
                {
                    sentence: ["Det regner, men vi går", "en tur."],
                    options: ["selvom", "alligevel"],
                    correct: "alligevel",
                    hints: {
                        "selvom": "Regnen er muren, og den kender vi allerede. Nu skal vi bruge ordet, der repræsenterer bolden, som slår igennem muren!"
                    },
                    feedback: "Korrekt! 'Alligevel' er gennembruddet - handlingen sker på trods."
                },
                {
                    sentence: ["", "det regner, går vi en tur."],
                    options: ["Selvom", "Alligevel"],
                    correct: "Selvom",
                    hints: {
                        "Alligevel": "Husk illustrationen: Før bolden kan bryde igennem, skal vi bygge muren/forhindringen op."
                    },
                    feedback: "Korrekt! 'Selvom' bygger muren op: 'Det regner'."
                },
                {
                    sentence: ["Han er syg, men han tager", "på arbejde."],
                    options: ["selvom", "alligevel"],
                    correct: "alligevel",
                    hints: {
                        "selvom": "Muren er sygdommen. Nu skal vi bryde igennem den!"
                    },
                    feedback: "Korrekt! Han tager på arbejde på trods af sygdommen (alligevel)."
                },
                {
                    sentence: ["", "han er syg, tager han på arbejde."],
                    options: ["Selvom", "Alligevel"],
                    correct: "Selvom",
                    hints: {
                        "Alligevel": "Her starter vi helt forfra. Før vi kan trodse noget, må vi definere selve forhindringen (muren)."
                    },
                    feedback: "Korrekt! 'Selvom' er muren, vi støder imod i starten."
                },
                {
                    sentence: ["Bilen er gammel, men den kører", "godt."],
                    options: ["selvom", "alligevel"],
                    correct: "alligevel",
                    hints: {
                        "selvom": "Alderdommen er forhindringen. Vælg det ord, der lader bilen køre lige igennem forhindringen."
                    },
                    feedback: "Korrekt! Bilen kører godt PÅ TRODS AF muren (alligevel)."
                }
            ]
        }
    },
    traening3: [
        {
            id: 'historie1',
            text: "Peter bringer mad ud på sin cykel. [blank_0] det sner, er det svært at cykle. I dag sner det meget i byen. [blank_1] cykler han langsomt. Han er meget kold, [blank_2] han har glemt sine varme handsker. [blank_3] han fryser, smiler han til kunderne, der venter på deres mad. Det er en hård vagt, men han fortsætter [blank_4]. [blank_5] han kørte hjemmefra klokken 16, var det lyst. Nu er det helt mørkt.",
            blanks: {
                "0": {
                    options: ["Når", "Da", "Fordi"],
                    answer: "Når",
                    feedback: {
                        "Da": "Husk at det sner flere gange (det er en generel tilstand, han oplever ofte). Derfor bruger vi 'Når'. 'Da' er kun for en enkeltstående begivenhed i fortiden.",
                        "Fordi": "'Fordi' beskriver en årsag. Her vil vi sige, at i de tilfælde hvor det sner, er det svært at cykle. Tiden (når) er bedst."
                    }
                },
                "1": {
                    options: ["Derfor", "Fordi", "Men"],
                    answer: "Derfor",
                    feedback: {
                        "Fordi": "'Fordi' peger bagud mod årsagen. Her peger vi fremad mod konsekvensen af sneen (at han cykler langsomt), så det er 'Derfor'.",
                        "Men": "Der er ikke en modsætning. Det er logisk at man cykler langsomt i sne, så vi skal vise en konsekvens (Derfor)."
                    }
                },
                "2": {
                    options: ["fordi", "derfor", "selvom"],
                    answer: "fordi",
                    feedback: {
                        "derfor": "'Derfor' peger fremad. Her forklarer vi baggrunden for, at han er kold. Vi kigger bagud på årsagen, som er de glemte handsker.",
                        "selvom": "Der er ingen modsætning. Man bliver jo kold af at glemme handskerne."
                    }
                },
                "3": {
                    options: ["Selvom", "Alligevel", "Da"],
                    answer: "Selvom",
                    feedback: {
                        "Alligevel": "'Alligevel' beskriver at man bryder igennem en mur, men her er muren (kulden) lige ved at blive bygget op. Vi starter forhindringen med 'Selvom'.",
                        "Da": "Vi taler ikke om en enkeltstående hændelse i fortiden. Det sker lige nu."
                    }
                },
                "4": {
                    options: ["alligevel", "selvom", "fordi"],
                    answer: "alligevel",
                    feedback: {
                        "selvom": "'Selvom' kræver en ny sætning (muren). Her sker handlingen PÅ TRODS AF det hårde arbejde. Han bryder muren, så vi siger 'alligevel'.",
                        "fordi": "Han fortsætter jo ikke FORDI det er hårdt. Det ville være mærkeligt. Han fortsætter på trods."
                    }
                },
                "5": {
                    options: ["Da", "Når", "Derfor"],
                    answer: "Da",
                    feedback: {
                        "Når": "Dette skete præcis klokken 16 i går. Det er et punktnedslag i fortiden (tegnestiften), så det skal være 'Da'.",
                        "Derfor": "Tidspunktet klokken 16 er ikke en konsekvens af noget. Det er en tidsangivelse i fortiden."
                    }
                }
            }
        },
        {
            id: 'historie2',
            text: "Anna arbejder som gartner i en stor park. Hun klipper kun græsset, [blank_0] det er tørvejr. I går regnede det hele dagen. [blank_1] hun mødte på arbejde, var alting vådt. Hun kunne ikke klippe græsset, [blank_2] jorden var for blød. [blank_3] arbejdede hun inde i det store drivhus i stedet. [blank_4] det regnede og var koldt udenfor, var der meget varmt i drivhuset. Hun svedte, men hun fortsatte [blank_5] med at arbejde.",
            blanks: {
                "0": {
                    options: ["når", "da", "derfor"],
                    answer: "når",
                    feedback: {
                        "da": "At klippe græsset i tørvejr er en vane (noget der sker flere gange). 'Da' bruges kun om fortid.",
                        "derfor": "'Derfor' bruges til en logisk konsekvens i en ny sætning, ikke til at beskrive en betingelse i tiden."
                    }
                },
                "1": {
                    options: ["Da", "Når", "Fordi"],
                    answer: "Da",
                    feedback: {
                        "Når": "Det her handler om en specifik dag (i går). Et punktnedslag i fortiden (tegnestiften) kræver 'Da'.",
                        "Fordi": "Det var ikke *årsagen* til at alt var vådt at hun mødte på arbejde, det skete bare på det tidspunkt."
                    }
                },
                "2": {
                    options: ["fordi", "derfor", "alligevel"],
                    answer: "fordi",
                    feedback: {
                        "derfor": "Den bløde jord er årsagen (peger bagud). 'Derfor' bruges, når vi peger frem mod konsekvensen.",
                        "alligevel": "Der er ikke tale om, at hun ikke kunne klippe græsset på trods af noget. Det var pga. regnen."
                    }
                },
                "3": {
                    options: ["Derfor", "Fordi", "Selvom"],
                    answer: "Derfor",
                    feedback: {
                        "Fordi": "Her kigger vi frem mod handlingen: at arbejde i drivhuset. Det er konsekvensen af regnen. Vi skyder bolden afsted med 'Derfor'.",
                        "Selvom": "At hun ikke klippede græsset, er ikke muren. Drivhusarbejdet var bare hendes anden mulighed."
                    }
                },
                "4": {
                    options: ["Selvom", "Alligevel", "Da"],
                    answer: "Selvom",
                    feedback: {
                        "Alligevel": "Vi er i gang med at beskrive modsætningen mellem vejret ude og inde. Vi bygger muren ('det var koldt udenfor'), så vi starter med 'Selvom'.",
                        "Da": "Det handler om en modsætning (koldt ude vs varmt inde), ikke bare et tidspunkt."
                    }
                },
                "5": {
                    options: ["alligevel", "selvom", "derfor"],
                    answer: "alligevel",
                    feedback: {
                        "selvom": "Sveden (muren) er allerede nævnt, nu bryder hun igennem den og arbejder videre, og det kalder vi 'alligevel'.",
                        "derfor": "Man fortsætter normalt ikke arbejdet FORDI man sveder voldsomt. Man gør det på trods."
                    }
                }
            }
        },
        {
            id: 'historie3',
            text: "Lars er tjener på en populær café. Caféen har mange borde udenfor. [blank_0] solen skinner, vil alle gæsterne sidde ude. I dag er det sommer og meget varmt. [blank_1] har Lars ekstra travlt. Han løber hurtigt, [blank_2] mange gæster venter på deres mad. [blank_3] han er træt i benene, smiler han og er glad. Han tager en ekstra vagt [blank_4]. [blank_5] han endelig fik en kort pause klokken 14, drak han en stor, kold cola.",
            blanks: {
                "0": {
                    options: ["Når", "Da", "Derfor"],
                    answer: "Når",
                    feedback: {
                        "Da": "At solen skinner, sker mere end én gang. Det er en vane for gæsterne, at de sætter sig ud i solen. Brug 'Når'.",
                        "Derfor": "Her beskriver vi hvornår gæsterne vil sidde ude, ikke en konsekvens i sig selv."
                    }
                },
                "1": {
                    options: ["Derfor", "Fordi", "Men"],
                    answer: "Derfor",
                    feedback: {
                        "Fordi": "Vi ved allerede at solen skinner. At han får travlt er konsekvensen (pilen fremad), så vi bruger 'Derfor'.",
                        "Men": "Det er meget logisk at en café får travlt i solskin. Der er ikke nogen modsætning her."
                    }
                },
                "2": {
                    options: ["fordi", "derfor", "alligevel"],
                    answer: "fordi",
                    feedback: {
                        "derfor": "Vi skal give årsagen (pege bagud) til, at han løber hurtigt. Gæsterne der venter er årsagen.",
                        "alligevel": "Han løber ikke hurtigt på trods af gæsterne, men netop på grund af dem."
                    }
                },
                "3": {
                    options: ["Selvom", "Alligevel", "Da"],
                    answer: "Selvom",
                    feedback: {
                        "Alligevel": "Vi er ved at bygge muren/forhindringen op (at han er træt i benene). 'Selvom' starter muren.",
                        "Da": "Sætningen viser, at han smiler på trods af smerten i benene, ikke at det var noget, der skete i fortiden."
                    }
                },
                "4": {
                    options: ["alligevel", "selvom", "fordi"],
                    answer: "alligevel",
                    feedback: {
                        "selvom": "Handlingen udføres på trods (han tager vagten). 'Alligevel' bryder igennem forhindringen i slutningen af sætningen.",
                        "fordi": "Han tager vel ikke vagten FORDI han er træt! Han gør det på trods af, at han er træt."
                    }
                },
                "5": {
                    options: ["Da", "Når", "Fordi"],
                    answer: "Da",
                    feedback: {
                        "Når": "Klokken 14 var et enkeltstående tidspunkt i fortiden. Så husk at sætte tegnestiften og bruge 'Da'.",
                        "Fordi": "Pausen var ikke årsagen til, at han drak cola. Det skete på det specifikke tidspunkt i fortiden."
                    }
                }
            }
        }
    ]
};
