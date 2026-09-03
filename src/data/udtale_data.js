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
                    { text: "Den dør er dyr.", targetWords: ["Den", "dør", "dyr."], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" },
                    { text: "Din dans er dum.", targetWords: ["Din", "dans", "dum."], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" },
                    { text: "En dyb dal.", targetWords: ["dyb", "dal."], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" },
                    { text: "Du drikker af din dåse.", targetWords: ["Du", "drikker", "din", "dåse."], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" },
                    { text: "De deler en dej.", targetWords: ["De", "deler", "dej."], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" }
                ]
            },
            {
                id: "bloedt_d",
                title: "Blødt 'd'",
                explanation: "<strong>Sådan udtales blødt d:</strong><br/>Lyder lidt som engelsk 'the'. Kommer altid efter en vokal.",
                exercises: [
                    { text: "En bred gade.", targetWords: ["bred", "gade."], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "De vil bade.", targetWords: ["bade."], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "Han spiser mad.", targetWords: ["mad."], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "En rød flod.", targetWords: ["rød", "flod."], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "En blød klud.", targetWords: ["blød", "klud."], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "En flad båd.", targetWords: ["flad", "båd."], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" }
                ]
            },
            {
                id: "stumt_d",
                title: "Stumt 'd'",
                explanation: "<strong>Stumt d:</strong><br/>Udtales slet ikke (ofte efter n, l eller før t).",
                exercises: [
                    { text: "En stor rund mund.", targetWords: ["rund", "mund."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter n)" },
                    { text: "Vandet er koldt.", targetWords: ["Vandet", "koldt."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter l)" },
                    { text: "Han er meget kendt.", targetWords: ["kendt."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (før t)" },
                    { text: "En ond hund.", targetWords: ["ond", "hund."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter n)" },
                    { text: "Sand og vand.", targetWords: ["Sand", "vand."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter n)" },
                    { text: "En mand på en spand.", targetWords: ["mand", "spand."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter n)" }
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
                    { text: "Et groft brød.", targetWords: ["brød."], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" },
                    { text: "Rå ris.", targetWords: ["Rå", "ris."], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" },
                    { text: "Rig og ren.", targetWords: ["Rig", "ren."], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" },
                    { text: "Rund rust.", targetWords: ["Rund", "rust."], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" }
                ]
            },
            {
                id: "vokalisk_r",
                title: "Vokalisk 'r'",
                explanation: "<strong>Vokalisk r:</strong><br/>Lyder næsten bare som et 'a' (eller 'å') dybt inde i munden. Bruges i slutningen af ord. F.eks. lyder 'spis-er' som 'spis-a'.",
                exercises: [
                    { text: "To sure bær.", targetWords: ["sure", "bær."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Han læser og skriver.", targetWords: ["læser", "skriver."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Fire store biler.", targetWords: ["Fire", "store", "biler."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Han køber bøger.", targetWords: ["køber", "bøger."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Der er et par.", targetWords: ["Der", "par."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Mor får et bor.", targetWords: ["Mor", "får", "bor."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a' eller 'å'" }
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
                    { text: "Den gode gås.", targetWords: ["gode", "gås."], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" },
                    { text: "Gå en god gang.", targetWords: ["Gå", "god", "gang."], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" },
                    { text: "Giv en gul gave.", targetWords: ["Giv", "gul", "gave."], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" },
                    { text: "Gro et grønt græs.", targetWords: ["Gro", "grønt", "græs."], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" },
                    { text: "En gal ged.", targetWords: ["gal", "ged."], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" }
                ]
            },
            {
                id: "j_lyd",
                title: "G som j-lyd",
                explanation: "<strong>J-lyd:</strong><br/>G lyder ofte som et 'j' efter visse vokaler (f.eks. 'kage' -> 'kaje').",
                exercises: [
                    { text: "Pigen leger med løg.", targetWords: ["leger", "løg."], category: "G som J-lyd", hint: "Løg udtales som 'løj'" },
                    { text: "En lille nøgle.", targetWords: ["nøgle."], category: "G som J-lyd", hint: "Nøgle udtales som 'nøjle'" },
                    { text: "Leg en leg.", targetWords: ["Leg", "leg."], category: "G som J-lyd", hint: "Udtales som 'lej en lej'" },
                    { text: "Mig og dig.", targetWords: ["Mig", "dig."], category: "G som J-lyd", hint: "Udtales 'maj' og 'daj'" },
                    { text: "Et løg og lidt røg.", targetWords: ["løg", "røg."], category: "G som J-lyd", hint: "Udtales 'løj' og 'røj'" },
                    { text: "Han er bleg.", targetWords: ["bleg."], category: "G som J-lyd", hint: "Udtales 'blaj'" }
                ]
            },
            {
                id: "stumt_g",
                title: "Stumt 'g'",
                explanation: "<strong>Stumt g:</strong><br/>Nogle gange udtales det slet ikke, især i bløde overgange (f.eks. 'nogle' eller 'bage').",
                exercises: [
                    { text: "En pige bager.", targetWords: ["pige", "bager."], category: "Stumt 'g'", hint: "G'et er stort set stumt: 'pi-e', 'ba-er'" },
                    { text: "Nogle syge fugle.", targetWords: ["Nogle", "syge", "fugle."], category: "Stumt 'g'", hint: "Udtales næsten uden 'g', mere som 'no-en' og 'fuwle'" },
                    { text: "Bag en kage.", targetWords: ["kage."], category: "Stumt 'g'", hint: "Udtales 'ka-e'" },
                    { text: "Kan du sige det?", targetWords: ["sige"], category: "Stumt 'g'", hint: "Udtales 'si-e'" },
                    { text: "Alle ugens dage.", targetWords: ["ugens", "dage."], category: "Stumt 'g'", hint: "Udtales 'da-e'" },
                    { text: "At tage på ferie.", targetWords: ["tage"], category: "Stumt 'g'", hint: "Udtales 'ta-e'" }
                ]
            },
            {
                id: "ng_lyd",
                title: "NG-lyd",
                explanation: "<strong>NG-lyd:</strong><br/>Når n og g står sammen, smelter de sammen til én lyd nede i halsen (som i 'penge').",
                exercises: [
                    { text: "En lang slange.", targetWords: ["lang", "slange."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "En dreng synger.", targetWords: ["dreng", "synger."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "En tung seng.", targetWords: ["tung", "seng."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "Mange ringe.", targetWords: ["Mange", "ringe."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "At fange en konge.", targetWords: ["fange", "konge."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "En ung dreng.", targetWords: ["ung", "dreng."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" }
                ]
            }
        ]
    }
};
