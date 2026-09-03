export const udtaleData = {
    D: {
        title: "Bogstavet D",
        description: "Træn det danske D (hårdt, blødt og stumt).",
        subCategories: [
            {
                id: "haardt_d",
                title: "Hårdt 'd'",
                explanation: "<strong>Sådan udtales hårdt d:</strong><br/>Som på engelsk. Bruges i starten af ord.",
                exercises: [
                    { text: "I dag er det torsdag.", targetWords: ["dag", "torsdag."], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" },
                    { text: "Den dør er dyr.", targetWords: ["Den", "dør", "dyr."], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" }
                ]
            },
            {
                id: "bloedt_d",
                title: "Blødt 'd'",
                explanation: "<strong>Sådan udtales blødt d:</strong><br/>Lyder lidt som engelsk 'the'. Kommer altid efter en vokal.",
                exercises: [
                    { text: "En bred gade.", targetWords: ["bred", "gade."], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "De vil bade.", targetWords: ["bade."], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "Han spiser mad.", targetWords: ["mad."], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" }
                ]
            },
            {
                id: "stumt_d",
                title: "Stumt 'd'",
                explanation: "<strong>Stumt d:</strong><br/>Udtales slet ikke (ofte efter n, l eller før t).",
                exercises: [
                    { text: "En stor rund mund.", targetWords: ["rund", "mund."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter n)" },
                    { text: "Vandet er koldt.", targetWords: ["Vandet", "koldt."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter l)" },
                    { text: "Han er meget kendt.", targetWords: ["kendt."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (før t)" }
                ]
            }
        ]
    },
    R: {
        title: "Bogstavet R",
        description: "Træn det danske R (hårdt og vokalisk).",
        subCategories: [
            {
                id: "haardt_r",
                title: "Hårdt 'r'",
                explanation: "<strong>Hårdt r:</strong><br/>En halslyd. Forestil dig, at du gurgler lidt vand nede bag i halsen. Bruges typisk i starten af ord.",
                exercises: [
                    { text: "En rigtig rød rose.", targetWords: ["rigtig", "rød", "rose."], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" },
                    { text: "Et bredt træ.", targetWords: ["træ."], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" },
                    { text: "Et groft brød.", targetWords: ["brød."], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" }
                ]
            },
            {
                id: "vokalisk_r",
                title: "Vokalisk 'r'",
                explanation: "<strong>Vokalisk r:</strong><br/>Lyder næsten bare som et 'a' (eller 'å') dybt inde i munden. Bruges i slutningen af ord. F.eks. lyder 'spis-er' som 'spis-a'.",
                exercises: [
                    { text: "To sure bær.", targetWords: ["sure", "bær."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Han læser og skriver.", targetWords: ["læser", "skriver."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Fire store biler.", targetWords: ["Fire", "store", "biler."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" }
                ]
            }
        ]
    },
    G: {
        title: "Bogstavet G",
        description: "Træn det danske G, der ofte skifter form afhængigt af ordet.",
        subCategories: [
            {
                id: "haardt_g",
                title: "Hårdt 'g'",
                explanation: "<strong>Hårdt g:</strong><br/>Som et almindeligt g (f.eks. 'gå'). Bruges i starten af ord.",
                exercises: [
                    { text: "En gul gris.", targetWords: ["gul", "gris."], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" },
                    { text: "Den gode gås.", targetWords: ["gode", "gås."], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" }
                ]
            },
            {
                id: "j_lyd",
                title: "G som j-lyd",
                explanation: "<strong>J-lyd:</strong><br/>G lyder ofte som et 'j' efter visse vokaler (f.eks. 'kage' -> 'kaje').",
                exercises: [
                    { text: "Pigen leger med løg.", targetWords: ["leger", "løg."], category: "G som J-lyd", hint: "Løg udtales som 'løj'" },
                    { text: "En lille nøgle.", targetWords: ["nøgle."], category: "G som J-lyd", hint: "Nøgle udtales som 'nøjle'" }
                ]
            },
            {
                id: "stumt_g",
                title: "Stumt 'g'",
                explanation: "<strong>Stumt g:</strong><br/>Nogle gange udtales det slet ikke, især i bløde overgange (f.eks. 'nogle' eller 'bage').",
                exercises: [
                    { text: "En pige bager.", targetWords: ["pige", "bager."], category: "Stumt 'g'", hint: "G'et er stort set stumt: 'pi-e', 'ba-er'" },
                    { text: "Nogle syge fugle.", targetWords: ["Nogle", "syge", "fugle."], category: "Stumt 'g'", hint: "Udtales næsten uden 'g', mere som 'no-en' og 'fuwle'" }
                ]
            },
            {
                id: "ng_lyd",
                title: "NG-lyd",
                explanation: "<strong>NG-lyd:</strong><br/>Når n og g står sammen, smelter de sammen til én lyd nede i halsen (som i 'penge').",
                exercises: [
                    { text: "En lang slange.", targetWords: ["lang", "slange."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "En dreng synger.", targetWords: ["dreng", "synger."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" }
                ]
            }
        ]
    }
};
