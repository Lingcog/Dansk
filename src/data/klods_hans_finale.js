/**
 * klods_hans_finale.js
 * Afslutningsaktiviteter til H.C. Andersens "Klods-Hans":
 * 1. Karakterernes indre liv (Kortlægning af personlighed med adjektiver, adverbier & faste udtryk)
 * 2. Speeddating-detektiven (Gæt den hemmelige karakter ud fra 10 faste speeddating-spørgsmål)
 */

export const klodsHansIndreLivData = {
    characters: [
        {
            id: 'klods_hans',
            name: 'Klods-Hans',
            role: 'Den yngste søn på geden',
            themeColor: '#22c55e',
            avatarIcon: '🐐',
            quote: '»Halli-hallo! Her kommer jeg! Se hvad jeg fandt i grøften!«',
            traits: [
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
                    id: 'kh_modig',
                    word: 'modig',
                    adv: 'utrolig modig',
                    type: 'adj',
                    hintDa: 'Tør gå ind til prinsessen uden forberedte taler og sige hvad han tænker.',
                    hintEn: 'Brave, courageous.'
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
            ]
        },
        {
            id: 'broedrene',
            name: 'De to brødre',
            role: 'De lærde og overforberedte bejlere',
            themeColor: '#38bdf8',
            avatarIcon: '📚',
            quote: '»Vi kan hele ordbogen og byens avis på latin udenad!«',
            traits: [
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
                    id: 'br_nervoese',
                    word: 'nervøse',
                    adv: 'frygteligt nervøse',
                    type: 'adj',
                    hintDa: 'Bliver stumme og glemmer alt, så snart de står over for prinsessen.',
                    hintEn: 'Nervous, easily panicked under pressure.'
                },
                {
                    id: 'br_stive',
                    word: 'stive som brædder',
                    adv: 'fuldstændig stive som brædder',
                    type: 'idiom',
                    hintDa: 'Helt ufleksible; kan ikke improvisere, når tingene ændrer sig.',
                    hintEn: 'Stiff as wooden boards, completely inflexible.'
                }
            ]
        },
        {
            id: 'prinsessen',
            name: 'Prinsessen',
            role: 'Kongens datter og den skarpe dommer',
            themeColor: '#ec4899',
            avatarIcon: '👑',
            quote: '»Dur ikke! Væk! Jeg vil have en mand, der kan tale for sig!«',
            traits: [
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
                },
                {
                    id: 'pr_selvstaendig',
                    word: 'selvstændig',
                    adv: 'meget selvstændig',
                    type: 'adj',
                    hintDa: 'Bestemmer suverænt selv hvem hun vil giftes med, uden at lade sig presse.',
                    hintEn: 'Independent, self-determined and strong-minded.'
                }
            ]
        },
        {
            id: 'faren',
            name: 'Faren',
            role: 'Den gamle herremand på gården',
            themeColor: '#f59e0b',
            avatarIcon: '👴',
            quote: '»Mine to kloge sønner får de bedste heste. Klods-Hans får ingenting!«',
            traits: [
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
            ]
        }
    ]
};

export const klodsHansSpeeddatingData = {
    questions: [
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
    ],

    characters: [
        {
            id: 'klods_hans',
            name: 'Klods-Hans',
            title: 'Den yngste søn på geden',
            themeColor: '#22c55e',
            avatarIcon: '🐐',
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
        {
            id: 'storebror',
            name: 'De to brødre',
            title: 'De lærde og overforberedte bejlere',
            themeColor: '#38bdf8',
            avatarIcon: '📚',
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
        {
            id: 'prinsessen',
            name: 'Prinsessen',
            role: 'Kongens datter',
            title: 'Den kritiske kongedatter på tronen',
            themeColor: '#ec4899',
            avatarIcon: '👑',
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
        {
            id: 'faren',
            name: 'Faren',
            role: 'Herremanden',
            title: 'Den gamle herremand på gården',
            themeColor: '#f59e0b',
            avatarIcon: '👴',
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
        }
    ]
};
