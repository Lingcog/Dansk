export const udtaleDataSvaer = {
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
                    { text: "Jeg hedder Jens.", targetWords: ["hedder"], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
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
                    { text: "Han er rigtig frisk.", targetWords: ["rigtig", "frisk."], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" }
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
                    { text: "Mor har et får.", targetWords: ["Mor", "har", "får."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a' eller 'å'" }
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
                    { text: "Gå en god tur.", targetWords: ["Gå", "god"], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" },
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
                    { text: "Der er lidt røg i køkkenet.", targetWords: ["røg"], category: "G som J-lyd", hint: "Udtales 'røj'" },
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
                    { text: "Jeg fanger en slange.", targetWords: ["fanger", "slange."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "Han er en ung dreng.", targetWords: ["ung", "dreng."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" }
                ]
            }
        ]
    }
};


export const udtaleDataLet = {
    D: {
        title: "Bogstavet D (Let)",
        description: "Lette sætninger til D (hårdt, blødt, stumt).",
        subCategories: [
            {
                id: "haardt_d",
                title: "Hårdt 'd'",
                explanation: "<strong>Sådan udtales hårdt d:</strong><br/>Som på engelsk. Bruges i starten af ord.",
                exercises: [
                    { text: "Du må se.", targetWords: ["Du"], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" },
                    { text: "De må bo.", targetWords: ["De"], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" },
                    { text: "Din mor lo.", targetWords: ["Din"], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" },
                    { text: "Du får ti.", targetWords: ["Du"], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" },
                    { text: "Det er din.", targetWords: ["Det", "din."], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" },
                    { text: "Din by nu.", targetWords: ["Din"], category: "Hårdt 'd'", hint: "Lyd som 'd' i starten af ord" }
                ]
            },
            {
                id: "bloedt_d",
                title: "Blødt 'd'",
                explanation: "<strong>Sådan udtales blødt d:</strong><br/>Lyder lidt som engelsk 'the'. Kommer altid efter en vokal.",
                exercises: [
                    { text: "En rød by.", targetWords: ["rød"], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "Din mad nu.", targetWords: ["mad"], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "En god mor.", targetWords: ["god"], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "En sød ko.", targetWords: ["sød"], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "Gå ud nu.", targetWords: ["ud"], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" },
                    { text: "Se et bad.", targetWords: ["bad."], category: "Blødt 'd'", hint: "Lyd som engelsk 'the' (efter vokal)" }
                ]
            },
            {
                id: "stumt_d",
                title: "Stumt 'd'",
                explanation: "<strong>Stumt d:</strong><br/>Udtales slet ikke (ofte efter n, l eller før t).",
                exercises: [
                    { text: "En ren hund.", targetWords: ["hund."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter n)" },
                    { text: "En fin mand.", targetWords: ["mand."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter n)" },
                    { text: "Se min mund.", targetWords: ["mund."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter n)" },
                    { text: "Giv ham vand.", targetWords: ["vand."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter n)" },
                    { text: "Et nyt land.", targetWords: ["land."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter n)" },
                    { text: "En god hund.", targetWords: ["hund."], category: "Stumt 'd'", hint: "D'et udtales slet ikke (efter n)" }
                ]
            }
        ]
    },
    R: {
        title: "Bogstavet R (Let)",
        description: "Lette sætninger til R (hårdt og vokalisk).",
        subCategories: [
            {
                id: "haardt_r",
                title: "Hårdt 'r'",
                explanation: "<strong>Hårdt r:</strong><br/>En halslyd. Forestil dig, at du gurgler lidt vand nede bag i halsen. Bruges typisk i starten af ord.",
                exercises: [
                    { text: "En rød bil.", targetWords: ["rød"], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" },
                    { text: "Du får ris.", targetWords: ["ris."], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" },
                    { text: "En ren ko.", targetWords: ["ren"], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" },
                    { text: "Se min ræv.", targetWords: ["ræv."], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" },
                    { text: "En rå ko.", targetWords: ["rå"], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" },
                    { text: "Din nye ros.", targetWords: ["ros."], category: "Hårdt 'r'", hint: "Gurgle-lyd i halsen" }
                ]
            },
            {
                id: "vokalisk_r",
                title: "Vokalisk 'r'",
                explanation: "<strong>Vokalisk r:</strong><br/>Lyder næsten bare som et 'a' (eller 'å') dybt inde i munden. Bruges i slutningen af ord. F.eks. lyder 'spis-er' som 'spis-a'.",
                exercises: [
                    { text: "Min mor ler.", targetWords: ["mor", "ler."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Min far ser.", targetWords: ["far", "ser."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Han har bær.", targetWords: ["har", "bær."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Hun er her.", targetWords: ["er", "her."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Vi ser bær.", targetWords: ["ser", "bær."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a'" },
                    { text: "Din mor har.", targetWords: ["mor", "har."], category: "Vokalisk 'r'", hint: "Lyder næsten som et 'a' eller 'å'" }
                ]
            }
        ]
    },
    G: {
        title: "Bogstavet G (Let)",
        description: "Lette sætninger til G.",
        subCategories: [
            {
                id: "haardt_g",
                title: "Hårdt 'g'",
                explanation: "<strong>Hårdt g:</strong><br/>Som et almindeligt g (f.eks. 'gå'). Bruges i starten af ord.",
                exercises: [
                    { text: "En gul bil.", targetWords: ["gul"], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" },
                    { text: "En god mor.", targetWords: ["god"], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" },
                    { text: "Du må gå.", targetWords: ["gå."], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" },
                    { text: "En ny ged.", targetWords: ["ged."], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" },
                    { text: "Giv min mad.", targetWords: ["Giv"], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" },
                    { text: "En god dag.", targetWords: ["god"], category: "Hårdt 'g'", hint: "Almindelig 'g' lyd i starten" }
                ]
            },
            {
                id: "j_lyd",
                title: "G som j-lyd",
                explanation: "<strong>J-lyd:</strong><br/>G lyder ofte som et 'j' efter visse vokaler (f.eks. 'kage' -> 'kaje').",
                exercises: [
                    { text: "Se på mig.", targetWords: ["mig."], category: "G som J-lyd", hint: "Udtales 'maj'" },
                    { text: "Se på dig.", targetWords: ["dig."], category: "G som J-lyd", hint: "Udtales 'daj'" },
                    { text: "Se mit løg.", targetWords: ["løg."], category: "G som J-lyd", hint: "Løg udtales som 'løj'" },
                    { text: "Det er røg.", targetWords: ["røg."], category: "G som J-lyd", hint: "Udtales 'røj'" },
                    { text: "De ser mig.", targetWords: ["mig."], category: "G som J-lyd", hint: "Udtales 'maj'" },
                    { text: "Giv det mig.", targetWords: ["mig."], category: "G som J-lyd", hint: "Udtales 'maj'" }
                ]
            },
            {
                id: "stumt_g",
                title: "Stumt 'g'",
                explanation: "<strong>Stumt g:</strong><br/>Nogle gange udtales det slet ikke, især i bløde overgange (f.eks. 'nogle' eller 'bage').",
                exercises: [
                    { text: "Se min pige.", targetWords: ["pige."], category: "Stumt 'g'", hint: "G'et er stumt: 'pi-e'" },
                    { text: "Bag en kage.", targetWords: ["kage."], category: "Stumt 'g'", hint: "Udtales 'ka-e'" },
                    { text: "Du må bage.", targetWords: ["bage."], category: "Stumt 'g'", hint: "Udtales 'ba-e'" },
                    { text: "En ny uge.", targetWords: ["uge."], category: "Stumt 'g'", hint: "Udtales 'u-e'" },
                    { text: "Du må sige.", targetWords: ["sige."], category: "Stumt 'g'", hint: "Udtales 'si-e'" },
                    { text: "En god pige.", targetWords: ["pige."], category: "Stumt 'g'", hint: "Udtales 'pi-e'" }
                ]
            },
            {
                id: "ng_lyd",
                title: "NG-lyd",
                explanation: "<strong>NG-lyd:</strong><br/>Når n og g står sammen, smelter de sammen til én lyd nede i halsen (som i 'penge').",
                exercises: [
                    { text: "En ung ko.", targetWords: ["ung"], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "En tung bil.", targetWords: ["tung"], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "En lang bil.", targetWords: ["lang"], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "Syng en sang.", targetWords: ["Syng", "sang."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "Gå en gang.", targetWords: ["gang."], category: "NG-lyd", hint: "n og g smelter sammen i halsen" },
                    { text: "Fang en bi.", targetWords: ["Fang"], category: "NG-lyd", hint: "n og g smelter sammen i halsen" }
                ]
            }
        ]
    }
};
