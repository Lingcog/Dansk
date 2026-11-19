import { getTranslation, getLang } from '../utils/i18n.js';
import { shuffleArray } from '../utils/shuffle.js';
import { samtaleIcons, samtaleRoleIcon } from '../utils/samtaleIcons.js';

/**
 * SamtaleSmaaordView — "Små ord og lyde der får en samtale til at fungere"
 * Placeret under hovedfladen "Samtaletræning".
 *
 * Overordnet grafisk & pædagogisk linje:
 * TALER-SIGNALER (8 ord & lyde — når du tager, holder, blødgør eller afleverer taleturen)
 * LYTTER-SIGNALER (7 ord & lyde — når du viser aktiv lytning og reagerer uden at stjæle ordet)
 *
 * Indeholder:
 * 1. Vrimlebillede med 15 grafiske pegefelter (Taler vs. Lytter) + Rolle-sortering
 * 2. Vælg det rigtige element (15 autentiske dialog-opgaver)
 * 3. Taler eller Lytter? (12 turtagnings-dueller: tag, hold, aflevér eller støt)
 * 4. Tonefalds-laboratoriet (10 opgaver med visuelle tonekurver: kort "Nå!" vs. langt "Nååå..." m.fl.)
 * 5. Hold samtalen i live! (3 interaktive samtale-simulatorer i flere trin)
 * 6. Fra Robot-dansk til Levende dansk (8 dialog-opgraderinger med samtale-smøremiddel)
 * 7. Samtale-detektiven i vrimlebilledet (12 billedjagt-missioner)
 */

const ROLE_META = {
    taler: {
        id: 'taler',
        label: 'Taler',
        short: 'TALER',
        subtitle: 'Når du tager, holder eller afleverer ordet',
        color: '#f59e0b',
        border: 'rgba(245, 158, 11, 0.75)',
        bg: 'rgba(245, 158, 11, 0.16)',
        chipBg: 'linear-gradient(135deg, rgba(180, 83, 9, 0.94), rgba(120, 53, 15, 0.96))',
        glow: 'rgba(245, 158, 11, 0.4)'
    },
    lytter: {
        id: 'lytter',
        label: 'Lytter',
        short: 'LYTTER',
        subtitle: 'Når du støtter og reagerer uden at afbryde',
        color: '#06b6d4',
        border: 'rgba(6, 182, 212, 0.8)',
        bg: 'rgba(6, 182, 212, 0.16)',
        chipBg: 'linear-gradient(135deg, rgba(14, 116, 144, 0.94), rgba(15, 23, 42, 0.96))',
        glow: 'rgba(6, 182, 212, 0.42)'
    }
};

const SAMTALE_SIGNALS = [
    // =========================================================================
    // 8 TALER-SIGNALER (Når man har, tager, holder eller afleverer ordet)
    // =========================================================================
    {
        id: 'oehm',
        num: 1,
        word: 'Øh... / Øhm...',
        shortLabel: 'Øhm...',
        role: 'taler',
        turnAction: 'Holde ordet (tænkepause)',
        intonation: '→ Jævn, svævende tone (munden lukkes på -m)',
        ttsText: 'Øhm, jeg tror vi mødes klokken ti.',
        ttsRate: 0.85,
        ttsPitch: 0.98,
        x: 9,
        y: 27,
        pointerDir: 'down',
        bodyCue: 'Kigger skråt op med en finger ved hagen, mens hun tænker.',
        definition: 'Danskernes vigtigste "ventelyd" som taler. Når du siger "øh" eller "øhm", viser du lytteren: "Jeg er ikke færdig med at tale – jeg leder bare lige efter den næste tanke!"',
        whenToUse: 'Brug det midt i din taletur i stedet for helt tavshed, så den anden ikke tror, at du er færdig.',
        dialogueA: 'Hvornår går toget egentlig?',
        dialogueB: '<strong>Øhm...</strong> jeg tror først det går kvart over fire.',
        trapTip: 'Helt tavshed midt i en sætning får danskere til at tro, at du har givet ordet videre!'
    },
    {
        id: 'altsaa',
        num: 2,
        word: 'Altså...',
        shortLabel: 'Altså...',
        role: 'taler',
        turnAction: 'Tage ordet & forklare/præcisere',
        intonation: '↘ Let vægt på første stavelse (AL-så)',
        ttsText: 'Altså, det handler mest om, at vi får en god start.',
        ttsRate: 0.9,
        ttsPitch: 1.02,
        x: 19.5,
        y: 21,
        pointerDir: 'down',
        bodyCue: 'Læner sig frem ved kaffebaren med åben håndflade for at uddybe sin pointe.',
        definition: 'Et klassisk start- og forklaringsord for taleren. Bruges når du tager ordet for at opsummere, præcisere hvad du mener, eller rette en lille misforståelse på en blød måde.',
        whenToUse: 'Start din sætning med "Altså...", når du vil forklare sammenhængen eller sige din ærlige mening.',
        dialogueA: 'Synes du ikke, opgaven er lidt svær?',
        dialogueB: '<strong>Altså...</strong> den tager lidt tid, men vi kan sagtens løse den sammen.',
        trapTip: 'Bemærk udtalen: "t" er stumt på dansk, så det udtales [alså].'
    },
    {
        id: 'naa_men',
        num: 3,
        word: 'Nå, men...',
        shortLabel: 'Nå, men...',
        role: 'taler',
        turnAction: 'Skifte emne eller runde af',
        intonation: '↘ Kort "nå" efterfulgt af hurtigt "men..."',
        ttsText: 'Nå, men jeg må også hellere komme videre!',
        ttsRate: 0.92,
        ttsPitch: 1.05,
        x: 85,
        y: 52,
        pointerDir: 'down',
        bodyCue: 'Kigger venligt på sit armbåndsur ved døren med skuldertasken klar.',
        definition: 'Det danske "gear-skifte" i en samtale! Når en lille pause opstår, bruger taleren "Nå, men..." til enten at skifte til et nyt emne eller runde samtalen hyggeligt af.',
        whenToUse: 'Sig "Nå, men..." når I er færdige med ét emne, eller når du høfligt skal videre på arbejde eller hjem.',
        dialogueA: 'Ja, det var virkelig en hyggelig weekend.',
        dialogueB: '<strong>Nå, men...</strong> vi må hellere komme i gang med dagens møde!',
        trapTip: 'Uden "Nå, men..." kan et pludseligt farvel eller emneskift føles brat på dansk.'
    },
    {
        id: 'hvad_hedder_det',
        num: 4,
        word: 'Hvad hedder det...',
        shortLabel: 'Hvad hedder det...',
        role: 'taler',
        turnAction: 'Holde ordet (ordsøger)',
        intonation: '→ Hurtigt og lavt, mens man leder efter ordet',
        ttsText: 'Jeg skal lige hente en, hvad hedder det, en hæftemaskine.',
        ttsRate: 0.92,
        ttsPitch: 0.98,
        x: 31,
        y: 49,
        pointerDir: 'down',
        bodyCue: 'Knipser let med fingrene i sofaen, mens han leder efter det helt rigtige danske ord.',
        definition: 'En uundværlig redningskrans når du taler dansk! Selv indfødte danskere siger "hvad hedder det..." mange gange om dagen, når et bestemt ord lige ligger på tungen.',
        whenToUse: 'Skyd det ind midt i sætningen, når du mangler en glose – så beholder du taleturen og inviterer evt. lytteren til at hjælpe med ordet.',
        dialogueA: 'Hvad skulle du købe i byggemarkedet?',
        dialogueB: 'Jeg manglede sådan en... <strong>hvad hedder det...</strong> en svensknøgle!',
        trapTip: 'Udtales i hurtigt talesprog næsten som ét blødt ord: [va-heð-ɔ-de].'
    },
    {
        id: 'ikke_vel',
        num: 5,
        word: '...ikke? / ...vel?',
        shortLabel: '...ikke? / vel?',
        role: 'taler',
        turnAction: 'Aflevere taleturen & søge enighed',
        intonation: '↗ Stigende spørgetone allerbagerst i sætningen',
        ttsText: 'Vi ses i morgen klokken ni, ikke?',
        ttsRate: 0.9,
        ttsPitch: 1.08,
        x: 57.5,
        y: 48,
        pointerDir: 'down',
        bodyCue: 'Rækker begge åbne håndflader frem mod kollegaen ved rundbordet for at give ordet videre.',
        definition: 'Talerens venlige stafet-aflevering i slutningen af en sætning. "...ikke?" bruges efter en positiv sætning, og "...vel?" bruges efter en negativ sætning (med "ikke").',
        whenToUse: 'Sæt det i slutningen af din sætning for at sige: "Er du enig med mig? Nu er det din tur til at svare!"',
        dialogueA: 'Det er et rigtig godt tilbud, <strong>ikke?</strong> (Positiv sætning → ikke?)',
        dialogueB: 'Du har ikke glemt nøglerne, <strong>vel?</strong> (Negativ sætning → vel?)',
        trapTip: 'I daglig tale udtales "...ikke?" ofte kort som [ik’]. Husk: positiv + ikke?, negativ + vel?'
    },
    {
        id: 'jo_taler',
        num: 6,
        word: 'jo',
        shortLabel: 'jo (fælles viden)',
        role: 'taler',
        turnAction: 'Skabe fælles bånd med lytteren',
        intonation: '→ Tryksvagt inde i sætningen (eller trykstærkt "Jo!" som svar)',
        ttsText: 'Det regner jo altid lidt i november, men vi hygger os.',
        ttsRate: 0.9,
        ttsPitch: 1.0,
        x: 65.5,
        y: 29,
        pointerDir: 'down',
        bodyCue: 'Smiler indforstået ved vinduet og peger ud mod vejret, som begge kender til.',
        definition: 'På dansk har "jo" to nøglefunktioner for taleren: 1) Inde i sætningen betyder det "som vi begge to godt ved" (socialt lim). 2) Forrest som svar ("Jo!") modbeviser det et spørgsmål med "ikke".',
        whenToUse: 'Brug tryksvagt "jo" efter verbet for at inddrage lytteren ("Du ved jo godt..."), og brug "Jo!" når du svarer ja til et negativt spørgsmål.',
        dialogueA: 'Kommer du ikke med til kaffe?',
        dialogueB: '<strong>Jo</strong>, selvfølgelig! Vi plejer <strong>jo</strong> altid at drikke fredagskaffe sammen.',
        trapTip: 'Svar aldrig "Ja" på et spørgsmål med "ikke" ("Er du ikke klar?") – sig altid "Jo!".'
    },
    {
        id: 'lige',
        num: 7,
        word: 'lige',
        shortLabel: 'lige',
        role: 'taler',
        turnAction: 'Blødgøre ønske eller hurtigt indskud',
        intonation: '→ Blødt og hurtigt [liː] eller [li]',
        ttsText: 'Må jeg lige spørge dig om noget?',
        ttsRate: 0.92,
        ttsPitch: 1.03,
        x: 51,
        y: 30,
        pointerDir: 'down',
        bodyCue: 'Løfter hånden høfligt ved bordet for at stille et lille, hurtigt spørgsmål.',
        definition: 'Danskernes foretrukne høfligheds-smøremiddel. Når du som taler tager ordet eller beder om noget, får "lige" det til at lyde ubesværet, venligt og slet ikke krævende.',
        whenToUse: 'Sæt "lige" ind når du tager en kort taletur ("Jeg siger lige noget", "Må jeg lige spørge...") eller blødgør en opfordring ("Prøv lige at høre!").',
        dialogueA: 'Undskyld jeg afbryder – må jeg <strong>lige</strong> låne sukkeret?',
        dialogueB: 'Ja da, jeg rækker dig den <strong>lige</strong> her!',
        trapTip: 'På dansk bruger man næsten aldrig et direkte "please" – man bruger "lige" (ofte sammen med "Vil du...?").'
    },
    {
        id: 'faktisk',
        num: 8,
        word: 'Faktisk / Egentlig',
        shortLabel: 'Faktisk...',
        role: 'taler',
        turnAction: 'Tilføje overraskende nuance eller blød uenighed',
        intonation: '↘ Tydeligt tryk på FAK-tisk / E-gentlig',
        ttsText: 'Faktisk tror jeg, at bussen kører fra den anden side.',
        ttsRate: 0.9,
        ttsPitch: 1.0,
        x: 94,
        y: 48,
        pointerDir: 'down',
        bodyCue: 'Står ved bogreolen og løfter pegefingeren venligt med en ny oplysning.',
        definition: 'Talerens værktøj til at bringe en ny vinkel, en lille overraskelse eller en høflig korrektion ind i samtalen uden at virke bedrevidende.',
        whenToUse: 'Brug "Faktisk..." eller "Egentlig..." når du tager ordet og vil sige noget, der nuancerer det, den anden lige har sagt.',
        dialogueA: 'Det er vist helt umuligt at få billetter i dag.',
        dialogueB: '<strong>Faktisk</strong> så jeg lige, at der stadig er fem ledige pladser!',
        trapTip: '"Egentlig" udtales med stumt g og t i midten: ca. [ɑjnli].'
    },

    // =========================================================================
    // 7 LYTTER-SIGNALER (Når man støtter, kvitterer og reagerer som lytter)
    // =========================================================================
    {
        id: 'mmm',
        num: 9,
        word: 'Mmm / Mm-hm',
        shortLabel: 'Mmm / Mm-hm',
        role: 'lytter',
        turnAction: 'Aktivt lyttesignal ("fortsæt bare!")',
        intonation: '↗ Let stigende på anden stavelse (mm-HM) med lukket mund',
        ttsText: 'Mm-hm, jeg hører hvad du siger.',
        ttsRate: 0.88,
        ttsPitch: 1.05,
        x: 30,
        y: 25,
        pointerDir: 'down',
        bodyCue: 'Nikker roligt med lukket mund og kaffekop i hånden, mens hun lytter opmærksomt.',
        definition: 'Det mest brugte danske lyttesignal ("backchanneling"). Fordi munden er lukket, signalerer du tydeligt til taleren: "Jeg lytter 100 % til dig, og jeg har IKKE tænkt mig at afbryde dig!"',
        whenToUse: 'Giv et blødt "Mmm" eller "Mm-hm" sammen med et nik for hver 1–2 sætninger, mens den anden fortæller.',
        dialogueA: 'Og så måtte jeg cykle hele vejen hjem i modvind...',
        dialogueB: '<strong>Mm-hm...</strong> (nikker medfølende, så taleren trygt fortsætter)',
        trapTip: 'Hvis en lytter er helt tavs og ubevægelig på dansk, bliver taleren usikker og stopper op!'
    },
    {
        id: 'ja_lytter',
        num: 10,
        word: 'Ja / Ja-ja',
        shortLabel: 'Ja / Ja-ja',
        role: 'lytter',
        turnAction: 'Løbende bekræftelse undervejs',
        intonation: '→ Kort og let ("ja") – eller hurtigt dobbelt ("ja-ja" = jeg har forstået)',
        ttsText: 'Ja, præcis, ja.',
        ttsRate: 0.95,
        ttsPitch: 1.05,
        x: 74.5,
        y: 32,
        pointerDir: 'down',
        bodyCue: 'Sidder på vinduesbænken og nikker bekræftende med et lille smil.',
        definition: 'Små hurtige "ja"-dryp, som lytteren lægger ind i talerens små pauser for at vise, at man følger tråden. På dansk trækker man endda nogle gange et kort "ja" ind på en indånding!',
        whenToUse: 'Brug et enkelt blødt "Ja" for at støtte taleren. Pas lidt på med for hurtigt "Ja-ja!", som kan betyde "Jeg HAR forstået det, kom videre".',
        dialogueA: 'Så drejer du bare til venstre nede ved bageren...',
        dialogueB: '<strong>Ja...</strong> (viser at vejvisningen er forstået indtil nu)',
        trapTip: 'Et roligt "Ja" = jeg følger med. Et utålmodigt "Ja-ja-ja" = stop med at gentage det!'
    },
    {
        id: 'naa_kort',
        num: 11,
        word: 'Nå! (kort)',
        shortLabel: 'Nå! (kort)',
        role: 'lytter',
        turnAction: 'Reaktion på ny eller overraskende info',
        intonation: '↗ Kort, vågent og stigende [nʌ!]',
        ttsText: 'Nå! Det vidste jeg slet ikke!',
        ttsRate: 0.92,
        ttsPitch: 1.18,
        x: 42,
        y: 47,
        pointerDir: 'down',
        bodyCue: 'Løfter øjenbrynene overrasket i lænestolen over en uventet nyhed.',
        definition: 'Lytterens lynhurtige kvittering når taleren fortæller noget NYT eller uventet! Et kort, friskt "Nå!" betyder: "Hov, det var ny viden for mig – hvor interessant!"',
        whenToUse: 'Sig et kort "Nå!" (ofte efterfulgt af "Okay!" eller "Virkelig?"), når taleren giver dig en ny oplysning.',
        dialogueA: 'Vidste du, at vores nye kollega har boet fem år i Spanien?',
        dialogueB: '<strong>Nå!</strong> Det anede jeg ikke – hvor spændende!',
        trapTip: 'Pas på tonefaldet: Et livligt, stigende "Nå!" er interesseret. Et helt fladt, kort "Nå." kan lyde koldt eller ligeglad!'
    },
    {
        id: 'naaaa_langt',
        num: 12,
        word: 'Nååå... (langt)',
        shortLabel: 'Nååå... (langt)',
        role: 'lytter',
        turnAction: 'Aha-forståelse eller varm medfølelse',
        intonation: '↘ Langtrukkent, blødt og faldende [nʌːː]',
        ttsText: 'Nååå, nu forstår jeg hvad du mener!',
        ttsRate: 0.82,
        ttsPitch: 0.92,
        x: 20.5,
        y: 51,
        pointerDir: 'down',
        bodyCue: 'Lægger hånden varmt på brystet i sofaen, da brikkerne pludselig falder på plads.',
        definition: 'Når du trækker "Nå" langt ud til "Nååå...", skifter ordet totalt betydning! Som lytter betyder det enten: 1) "Aha, NU faldt tiøren, nu forstår jeg sammenhængen!" eller 2) "Årh, hvor er det synd / sødt!"',
        whenToUse: 'Brug langt "Nååå...", når en forklaring pludselig giver mening for dig, eller når du viser medfølelse med taleren.',
        dialogueA: 'Jeg kom for sent, fordi min cykel punkterede midt på broen.',
        dialogueB: '<strong>Nååå...</strong> det var derfor! Årh, hvor uheldigt!',
        trapTip: 'Sammenlign: Kort "Nå!" = Ny fakta. Langt "Nååå..." = Nu forstår jeg hvorfor / jeg føler med dig.'
    },
    {
        id: 'aha_okay',
        num: 13,
        word: 'Aha / Okay',
        shortLabel: 'Aha / Okay',
        role: 'lytter',
        turnAction: 'Tydelig kvittering ("modtaget!")',
        intonation: '↘ Roligt og bekræftende (O-kay / a-HA)',
        ttsText: 'Aha, okay, så gør vi det på den måde.',
        ttsRate: 0.9,
        ttsPitch: 1.0,
        x: 64,
        y: 74,
        pointerDir: 'up',
        bodyCue: 'Nikker tydeligt ved vinduesbordet for at kvittere for en praktisk besked.',
        definition: 'Lytterens klare kvitteringsstempel. Viser taleren, at en instruktion, en aftale eller et svar er modtaget og forstået, så samtalen trygt kan gå videre.',
        whenToUse: 'Brug "Okay" eller "Aha", når taleren har svaret på dit spørgsmål eller givet dig en praktisk forklaring.',
        dialogueA: 'Mødet er flyttet til lokale 3 på anden sal.',
        dialogueB: '<strong>Aha, okay!</strong> Tak fordi du sagde det.',
        trapTip: '"Okay" bruges på dansk i alle aldersgrupper som det mest naturlige kvitteringsord i hverdagen.'
    },
    {
        id: 'virkelig',
        num: 14,
        word: 'Virkelig? / Seriøst?',
        shortLabel: 'Virkelig?!',
        role: 'lytter',
        turnAction: 'Engageret medspil der giver taleren energi',
        intonation: '↗ Tydeligt stigende spørgetone med stor interesse',
        ttsText: 'Virkelig? Fortæl lige noget mere om det!',
        ttsRate: 0.92,
        ttsPitch: 1.15,
        x: 81.5,
        y: 43,
        pointerDir: 'up',
        bodyCue: 'Læner sig nysgerrigt frem med store øjne for at høre resten af historien.',
        definition: 'Aktivt medspil fra lytteren! Når du siger "Virkelig?", "Seriøst?" eller "Ej, hvor vildt!", stjæler du IKKE ordet – tværtimod giver du taleren brændstof til at fortælle videre med endnu mere entusiasme.',
        whenToUse: 'Skyd det ind, når taleren fortæller noget dramatisk, sjovt eller imponerende.',
        dialogueA: 'Jeg vandt to fribilletter til koncerten i går!',
        dialogueB: '<strong>Virkelig?!</strong> Ej, hvor er det fedt – hvem tager du med?',
        trapTip: '"Virkelig?" passer til både formelle og uformelle samtaler; "Seriøst?" er lidt mere uformelt.'
    },
    {
        id: 'praecis',
        num: 15,
        word: 'Præcis! / Nemlig!',
        shortLabel: 'Præcis! / Nemlig!',
        role: 'lytter',
        turnAction: 'Stærk opbakning & 100 % enighed',
        intonation: '↘ Energisk tryk på præ-CIS / NEM-lig!',
        ttsText: 'Præcis! Det er nemlig helt rigtigt!',
        ttsRate: 0.94,
        ttsPitch: 1.08,
        x: 70.5,
        y: 51,
        pointerDir: 'down',
        bodyCue: 'Peger begejstret over bordet og nikker som tegn på fuld enighed.',
        definition: 'Lytterens stærkeste opbakningssignal. Hvor "Mmm" og "Ja" blot betyder "jeg hører dig", betyder "Præcis!" og "Nemlig!": "Du ramte hovedet på sømmet – jeg er 100 % enig med dig!"',
        whenToUse: 'Brug det som lytter, når taleren sætter ord på noget, du selv mener eller har oplevet.',
        dialogueA: 'Man lærer altså bedst et sprog ved at turde bruge det i hverdagen.',
        dialogueB: '<strong>Præcis!</strong> Det er <strong>nemlig</strong> det vigtigste!',
        trapTip: 'Giver en fantastisk varme i samtalen, fordi taleren mærker fuld opbakning.'
    }
];

// =========================================================================
// BANE 2: 15 "VÆLG DET RIGTIGE ELEMENT"-OPGAVER (1 til hvert af de 15 signaler)
// =========================================================================
const CHOOSE_EXERCISES = [
    {
        num: 1,
        role: 'taler',
        context: 'Du bliver spurgt om et telefonnummer, og du skal bruge 2 sekunder på at huske de sidste cifre uden at miste taleturen.',
        speakerA: 'Kollega: "Hvad er lokalnummeret til IT-supporten?"',
        speakerB: 'Dig (Taler): "Det er 45, ___ ... 82!"',
        answerId: 'oehm',
        options: ['oehm', 'naa_kort', 'praecis', 'ikke_vel'],
        explanation: 'Som taler bruger du "Øhm..." til at fylde tænkepausen ud, så kollegaen ved, at resten af nummeret er på vej.'
    },
    {
        num: 2,
        role: 'lytter',
        context: 'Din nabo fortæller en længere historie om sin hund. Du vil vise, at du lytter opmærksomt uden at afbryde.',
        speakerA: 'Nabo: "...og så løb hunden hele vejen ned i baghaven med min hjemmesko i munden..."',
        speakerB: 'Dig (Lytter): "___" (nikker med lukket mund, så naboen fortsætter)',
        answerId: 'mmm',
        options: ['mmm', 'naa_men', 'altsaa', 'hvad_hedder_det'],
        explanation: '"Mmm / Mm-hm" med lukket mund er det reneste lyttesignal på dansk: det viser opmærksomhed uden at tage ordet.'
    },
    {
        num: 3,
        role: 'taler',
        context: 'Du vil tage ordet og forklare, hvad du egentlig mener om en plan, så det ikke bliver misforstået.',
        speakerA: 'Ven: "Så du har slet ikke lyst til at tage med i biografen?"',
        speakerB: 'Dig (Taler): "___ jeg vil rigtig gerne med, jeg er bare først fri klokken 19."',
        answerId: 'altsaa',
        options: ['altsaa', 'naa_kort', 'virkelig', 'mmm'],
        explanation: '"Altså..." i starten af en taletur er perfekt til at præcisere og rydde en misforståelse af vejen.'
    },
    {
        num: 4,
        role: 'lytter',
        context: 'Du har undret dig over, hvorfor bussen ikke kom, og en anden passager forklarer nu årsagen. Pludselig giver det hele mening!',
        speakerA: 'Passager: "Alle busser kører ad Nørregade i dag på grund af vejarbejde."',
        speakerB: 'Dig (Lytter): "___! Det er derfor, vi har ventet forgæves!"',
        answerId: 'naaaa_langt',
        options: ['naaaa_langt', 'naa_men', 'ikke_vel', 'hvad_hedder_det'],
        explanation: 'Et langt, blødt "Nååå..." viser lytterens aha-oplevelse: "Nu forstår jeg sammenhængen!"'
    },
    {
        num: 5,
        role: 'taler',
        context: 'I har talt om vejret i fem minutter ved kaffemaskinen, og nu vil du venligt skifte emne eller vende tilbage til arbejdet.',
        speakerA: 'Kollega: "Ja, man må håbe solen kommer frem i weekenden."',
        speakerB: 'Dig (Taler): "___ jeg må også hellere komme tilbage til skrivebordet!"',
        answerId: 'naa_men',
        options: ['naa_men', 'virkelig', 'mmm', 'naaaa_langt'],
        explanation: '"Nå, men..." er danskernes faste signal som taler, når man runder et emne af eller skal videre.'
    },
    {
        num: 6,
        role: 'lytter',
        context: 'En klassekammerat fortæller en helt ny og lidt overraskende fakta, som du slet ikke kendte til.',
        speakerA: 'Klassekammerat: "Biblioteket har faktisk åbent helt til klokken 22 om torsdagen."',
        speakerB: 'Dig (Lytter): "___ Det vidste jeg slet ikke!"',
        answerId: 'naa_kort',
        options: ['naa_kort', 'hvad_hedder_det', 'lige', 'ikke_vel'],
        explanation: 'Et kort, stigende "Nå!" er lytterens hurtige reaktion på ny, uventet information.'
    },
    {
        num: 7,
        role: 'taler',
        context: 'Midt i din sætning glemmer du det danske ord for "piskeris", men du vil gerne beholde taleturen, mens du kommer i tanke om det.',
        speakerA: 'Dig (Taler): "Kan du række mig det der... ___ ... et piskeris!"',
        speakerB: 'Ven: "Værsgo, det ligger lige her i skuffen."',
        answerId: 'hvad_hedder_det',
        options: ['hvad_hedder_det', 'praecis', 'aha_okay', 'naa_kort'],
        explanation: '"Hvad hedder det..." holder din taletur åben, mens hjernen leder efter det rigtige ord.'
    },
    {
        num: 8,
        role: 'taler',
        context: 'Du har sagt en positiv sætning og vil nu aflevere taleturen til din samtalepartner for at høre, om vedkommende er enig.',
        speakerA: 'Dig (Taler): "Det gik da rigtig godt til præsentationen i dag, ___"',
        speakerB: 'Kollega: "Jo, helt vildt godt!"',
        answerId: 'ikke_vel',
        options: ['ikke_vel', 'oehm', 'naaaa_langt', 'mmm'],
        explanation: '"...ikke?" (eller "...vel?" efter negativ sætning) inviterer lytteren til at tage ordet og bekræfte.'
    },
    {
        num: 9,
        role: 'lytter',
        context: 'Din kollega siger en pointe, som du er 100 % enig i, og du vil give stærk, entusiastisk opbakning som lytter.',
        speakerA: 'Kollega: "Det vigtigste i en samtale er, at man tør prøve sig frem uden at være bange for fejl."',
        speakerB: 'Dig (Lytter): "___ Det har du helt ret i!"',
        answerId: 'praecis',
        options: ['praecis', 'hvad_hedder_det', 'oehm', 'naa_men'],
        explanation: '"Præcis!" og "Nemlig!" viser som lytter, at du er 100 % enig i talerens pointe.'
    },
    {
        num: 10,
        role: 'taler',
        context: 'Du vil stille et hurtigt spørgsmål til en travl medarbejder og blødgøre henvendelsen, så den lyder ekstra høflig.',
        speakerA: 'Dig (Taler): "Undskyld, må jeg ___ spørge dig om vej til mødelokale B?"',
        speakerB: 'Medarbejder: "Selvfølgelig, det er lige ned ad gangen!"',
        answerId: 'lige',
        options: ['lige', 'naa_kort', 'aha_okay', 'virkelig'],
        explanation: 'Ordet "lige" gør et spørgsmål eller en anmodning blød, uformel og høflig på dansk.'
    },
    {
        num: 11,
        role: 'lytter',
        context: 'Din ven fortæller noget helt utroligt fra sin rejse, og du vil give engageret medspil, så vennen fortæller mere.',
        speakerA: 'Ven: "Da vi sad på færgen, svømmede der pludselig tre delfiner lige ved siden af os!"',
        speakerB: 'Dig (Lytter): "___ Ej, hvor fantastisk – fik du taget et billede?"',
        answerId: 'virkelig',
        options: ['virkelig', 'naa_men', 'lige', 'hvad_hedder_det'],
        explanation: '"Virkelig?!" / "Seriøst?!" giver taleren positiv energi og viser, at du er oprigtigt optaget af historien.'
    },
    {
        num: 12,
        role: 'taler',
        context: 'Du refererer til noget, som både du og lytteren allerede godt ved i forvejen ("fælles viden").',
        speakerA: 'Dig (Taler): "Vi skal huske paraplyen – det regner ___ næsten hele eftermiddagen i dag."',
        speakerB: 'Ven: "Ja, jeg så godt vejrudsigten i morges!"',
        answerId: 'jo_taler',
        options: ['jo_taler', 'naa_kort', 'virkelig', 'aha_okay'],
        explanation: 'Tryksvagt "jo" midt i sætningen bygger bro til lytteren ved at markere: "som vi begge to godt ved".'
    },
    {
        num: 13,
        role: 'lytter',
        context: 'En receptionist har lige forklaret dig, hvilken sal lægen bor på. Du vil kvittere tydeligt for, at beskeden er modtaget.',
        speakerA: 'Receptionist: "Du tager bare elevatoren op på 3. sal og drejer til højre."',
        speakerB: 'Dig (Lytter): "___ Mange tak for hjælpen!"',
        answerId: 'aha_okay',
        options: ['aha_okay', 'oehm', 'ikke_vel', 'hvad_hedder_det'],
        explanation: '"Aha, okay!" kvitterer klart og tydeligt for, at den praktiske information er forstået.'
    },
    {
        num: 14,
        role: 'taler',
        context: 'En kollega tror, at bageren har lukket om mandagen, men du har lige set, at de har åbent, og vil sige det på en pæn måde.',
        speakerA: 'Kollega: "Øv, bageren på hjørnet har vist lukket om mandagen."',
        speakerB: 'Dig (Taler): "___ har de lige ændret åbningstider, så de har åbent nu!"',
        answerId: 'faktisk',
        options: ['faktisk', 'mmm', 'naaaa_langt', 'ikke_vel'],
        explanation: '"Faktisk..." (eller "Egentlig...") bruges af taleren til at tilføje en ny nuance eller venlig korrektion.'
    },
    {
        num: 15,
        role: 'lytter',
        context: 'Din kollega forklarer trin for trin, hvordan kaffemaskinen virker. Efter første trin giver du et kort bekræftende ord.',
        speakerA: 'Kollega: "Først fylder du vand i beholderen her på siden..."',
        speakerB: 'Dig (Lytter): "___" (kort nik, så kollegaen går videre til trin 2)',
        answerId: 'ja_lytter',
        options: ['ja_lytter', 'naa_men', 'hvad_hedder_det', 'faktisk'],
        explanation: 'Et kort, roligt "Ja" undervejs viser taleren, at du er med på trin 1 og klar til trin 2.'
    }
];

// =========================================================================
// BANE 3: 12 "TALER ELLER LYTTER?" TURTAGNINGS-DUELLER
// =========================================================================
const TURN_DUELS = [
    {
        quote: '"Øhm... lad mig lige tjekke kalenderen et øjeblik."',
        signal: 'Øhm... + lige',
        correctAction: 'hold',
        role: 'taler',
        explanation: 'Taleren bruger "Øhm..." og "lige" til at HOLDE taleturen, mens kalenderen tjekkes, så samtalen ikke går i stå.'
    },
    {
        quote: '"Mm-hm... (nikker roligt, mens øjnene følger fortælleren)"',
        signal: 'Mm-hm',
        correctAction: 'backchannel',
        role: 'lytter',
        explanation: 'Lytteren støtter aktivt med lukket mund ("backchanneling") uden at tage ordet fra taleren.'
    },
    {
        quote: '"Det var en rigtig god idé at flytte mødet, ikke?"',
        signal: '...ikke?',
        correctAction: 'give',
        role: 'taler',
        explanation: 'Med "...ikke?" til sidst AFLEVERER taleren stafetten til lytteren og inviterer til svar.'
    },
    {
        quote: '"Altså, hvis du spørger mig, bør vi starte med kapitel 2."',
        signal: 'Altså...',
        correctAction: 'take',
        role: 'taler',
        explanation: 'Med "Altså..." TAGER taleren ordet og markerer, at der nu kommer en forklaring eller vurdering.'
    },
    {
        quote: '"Nååå... det var derfor, toget holdt stille på broen!"',
        signal: 'Nååå... (langt)',
        correctAction: 'backchannel',
        role: 'lytter',
        explanation: 'Lytteren kvitterer med et langt "Nååå...", der viser, at forklaringen nu giver fuld mening.'
    },
    {
        quote: '"Vi har brug for en... hvad hedder det... en forlængerledning!"',
        signal: 'hvad hedder det...',
        correctAction: 'hold',
        role: 'taler',
        explanation: 'Taleren HOLDER sin taletur åben midt i sætningen, mens hjernen finder ordet "forlængerledning".'
    },
    {
        quote: '"Præcis! Det er nemlig lige sådan, det hænger sammen."',
        signal: 'Præcis! / Nemlig!',
        correctAction: 'backchannel',
        role: 'lytter',
        explanation: 'Lytteren giver stærk opbakning og viser 100 % enighed med talerens pointe.'
    },
    {
        quote: '"Nå, men... skulle vi se at bestille noget mad?"',
        signal: 'Nå, men...',
        correctAction: 'take',
        role: 'taler',
        explanation: 'Taleren TAGER initiativet med "Nå, men..." for at skifte emne og bringe samtalen videre.'
    },
    {
        quote: '"Du arbejder ikke på fredag, vel?"',
        signal: '...vel?',
        correctAction: 'give',
        role: 'taler',
        explanation: 'Efter en negativ sætning ("ikke") bruger taleren "...vel?" til at AFLEVERE ordet og bede om bekræftelse.'
    },
    {
        quote: '"Virkelig?! Fortæl lige, hvad der skete bagefter!"',
        signal: 'Virkelig?!',
        correctAction: 'backchannel',
        role: 'lytter',
        explanation: 'Lytteren viser begejstret overraskelse og opmuntrer taleren til at beholde ordet og fortælle mere.'
    },
    {
        quote: '"Faktisk kan man godt betale med MobilePay i boden derovre."',
        signal: 'Faktisk...',
        correctAction: 'take',
        role: 'taler',
        explanation: 'Taleren TAGER ordet med "Faktisk..." for at bidrage med en ny, nyttig oplysning.'
    },
    {
        quote: '"Nå! Det anede jeg slet ikke – tak for tippet."',
        signal: 'Nå! (kort)',
        correctAction: 'backchannel',
        role: 'lytter',
        explanation: 'Lytteren reagerer med et kort, stigende "Nå!" som kvittering for en helt ny oplysning.'
    }
];

const DUEL_CHOICES = [
    { id: 'take', icon: '', label: 'Taler TAGER ordet / skifter retning', role: 'taler' },
    { id: 'hold', icon: '', label: 'Taler HOLDER ordet (tænkepause / ordsøgning)', role: 'taler' },
    { id: 'give', icon: '', label: 'Taler AFLEVERER ordet til den anden', role: 'taler' },
    { id: 'backchannel', icon: '', label: 'Lytter STØTTER & REAGERER (uden at stjæle turen)', role: 'lytter' }
];

// =========================================================================
// BANE 4: YOUTUBE-ANALYSE AF "NÅ… PÅ DANSK" (10 VARIANTER) + TONEFALDS-LABORATORIET
// Video: https://youtu.be/GIUuCmSt5uI (@klartilstartidanmark)
// =========================================================================
const NAA_YOUTUBE_ID = 'GIUuCmSt5uI';

const NAA_VIDEO_VARIANTS = [
    {
        num: 1,
        id: 'naa_1_aha',
        label: '1. Nåååh! (okay)',
        badgeText: 'Nåååh! (okay) = når man pludselig forstår noget',
        role: 'lytter',
        startSec: 20,
        endSec: 41,
        timeLabel: '0:20',
        curve: 'M10,10 Q42,8 90,30',
        color: '#06b6d4',
        quoteFromVideo: '"Nåååh, okay! Nu forstår jeg! Ah, nu giver det mening!"',
        bodyLanguage: 'Øjnene lyser op, hovedet vipper bagover i et stort anerkendende nik.',
        meaning: 'Lytteren får en pludselig aha-oplevelse (fx læreren der pludselig forstår, hvad du mente på dansk).',
        ttsSample: 'Nåååh, okay! Nu forstår jeg dig!'
    },
    {
        num: 2,
        id: 'naa_2_soed',
        label: '2. Nåårh! (hvor er den sød)',
        badgeText: 'Nåårh! (hvor er den sød)',
        role: 'lytter',
        startSec: 41,
        endSec: 55,
        timeLabel: '0:41',
        curve: 'M10,14 Q45,28 90,33',
        color: '#f472b6',
        quoteFromVideo: '"Nåårh, hvor er den sød! Nåårh..."',
        bodyLanguage: 'Hovedet lægges blødt på skrå med et varmt, smeltende ansigtsudtryk.',
        meaning: 'Varm følelses- og lytterreaktion når man ser en baby, en lille hundehvalp eller noget rørende.',
        ttsSample: 'Nåårh, hvor er den sød!'
    },
    {
        num: 3,
        id: 'naa_3_skeptisk',
        label: '3. Nårrh... (skeptisk / uenig)',
        badgeText: 'Nårrh = hvis man er meget uenig med en person / hvis han siger noget mærkeligt',
        role: 'lytter',
        startSec: 56,
        endSec: 71,
        timeLabel: '0:56',
        curve: 'M10,22 Q35,14 60,26 T90,22',
        color: '#f87171',
        quoteFromVideo: '"Nårrh... nåh... Ej, det lyder mærkeligt. Nåh, ej, det kan ikke passe!"',
        bodyLanguage: 'Rynkede øjenbryn, sammenknebent blik og skeptisk hovedrysten.',
        meaning: 'Lytteren tvivler stærkt eller er uenig i det, den anden lige har påstået.',
        ttsSample: 'Nårrh, ej, det lyder mærkeligt, det kan ikke passe.'
    },
    {
        num: 4,
        id: 'naa_4_husker',
        label: '4. Nåå ja! (kommer i tanke om noget)',
        badgeText: 'Nå (ja) = kommer i tanke om noget vigtigt',
        role: 'taler',
        startSec: 71,
        endSec: 81,
        timeLabel: '1:11',
        curve: 'M10,30 L35,8 L90,26',
        color: '#f59e0b',
        quoteFromVideo: '"(Gisp!) Nååå ja! Ej! Nååå ja, øj!"',
        bodyLanguage: 'Begge hænder ryger op til hovedet/tindingerne med store øjne.',
        meaning: 'Taleren kommer pludselig i tanke om noget vigtigt, man havde glemt.',
        ttsSample: 'Nååå ja! Ej, det havde jeg helt glemt!'
    },
    {
        num: 5,
        id: 'naa_5_overrasket',
        label: '5. Nå! (da) (overrasket & interesseret)',
        badgeText: 'Nå! (da) = overrasket over noget',
        role: 'lytter',
        startSec: 82,
        endSec: 97,
        timeLabel: '1:22',
        curve: 'M10,32 Q48,28 88,7',
        color: '#38bdf8',
        quoteFromVideo: '"Nå! Ej! Nå! (når de er overraskede eller interesserede)"',
        bodyLanguage: 'Højt løftede øjenbryn, åben mund og vågent, nysgerrigt blik.',
        meaning: 'Lytteren reagerer spontant på en spændende eller helt ny oplysning.',
        ttsSample: 'Nå! Ej, hvor spændende!'
    },
    {
        num: 6,
        id: 'naa_6_kom_nu',
        label: '6. Nå! (kom nu / utålmodig)',
        badgeText: 'Nå (kom nu) = når man vil gå / er utålmodig',
        role: 'taler',
        startSec: 98,
        endSec: 107,
        timeLabel: '1:38',
        curve: 'M10,14 L65,32',
        color: '#fb923c',
        quoteFromVideo: '"Nå... øh, kom nu! Nå, skal vi gå? Nå!"',
        bodyLanguage: 'Kigger utålmodigt til siden, vinker med hånden og sætter hænderne i siden.',
        meaning: 'Taleren vil videre, gider ikke vente længere og sætter handling i gang.',
        ttsSample: 'Nå, kom nu! Skal vi gå?'
    },
    {
        num: 7,
        id: 'naa_7_hvassaa',
        label: '7. Nå, hvad så? (hvasså)',
        badgeText: 'Nå (hvasså)? = er der sket noget nyt / hvordan går det?',
        role: 'taler',
        startSec: 108,
        endSec: 121,
        timeLabel: '1:48',
        curve: 'M10,24 L45,22 L88,10',
        color: '#facc15',
        quoteFromVideo: '"Nå, hvad så? (= Hvordan går det? Er der sket noget nyt?)"',
        bodyLanguage: 'Sætter sig frisk ved frokostbordet med et stort, åbent smil.',
        meaning: 'Talerens klassiske danske samtale-åbner ved frokostbordet eller når man mødes.',
        ttsSample: 'Nå, hvad så? Hvordan går det?'
    },
    {
        num: 8,
        id: 'naa_8_lytter',
        label: '8. Nåå... (aktiv lytter-snak)',
        badgeText: 'Nåå... = når en dansker lytter til din snak',
        role: 'lytter',
        startSec: 121,
        endSec: 140,
        timeLabel: '2:01',
        curve: 'M10,22 Q35,17 60,22 T90,19',
        color: '#22d3ee',
        quoteFromVideo: '"Nå... mm, nå... nå, ja (= Ja, jeg lytter! Jeg er interesseret i, hvad du siger)"',
        bodyLanguage: 'Rolig øjenkontakt og bløde, rytmiske nik uden at afbryde.',
        meaning: 'Ren aktiv lytning (backchanneling), der holder taleren trygt i gang.',
        ttsSample: 'Nå... mm, nå... ja, jeg lytter.'
    },
    {
        num: 9,
        id: 'naa_9_rolig_nu',
        label: '9. Nå nå (rolig nu / stop diskussion)',
        badgeText: 'Nå nå (rolig nu)... : uenig eller hvis du synes, den anden skal stoppe diskussionen',
        role: 'lytter',
        startSec: 141,
        endSec: 153,
        timeLabel: '2:21',
        curve: 'M10,16 L40,28 M52,16 L85,28',
        color: '#a78bfa',
        quoteFromVideo: '"Nå, nå-nå... nå-nå, mm, okay... nå-nå."',
        bodyLanguage: 'Kigger lidt væk, puster roligt ud og dæmper gemytterne.',
        meaning: 'Dobbelt "Nå nå" bruges til at nedtrappe en uenighed eller lukke en skør påstand ned.',
        ttsSample: 'Nå nå, rolig nu, okay, nå nå.'
    },
    {
        num: 10,
        id: 'naa_10_taget_fejl',
        label: '10. Nå (nej)... (vi har taget fejl!)',
        badgeText: 'Nå (nej)... = når vi godt kan se, at vi har taget fejl',
        role: 'taler',
        startSec: 154,
        endSec: 168,
        timeLabel: '2:34',
        curve: 'M10,12 Q45,24 90,32',
        color: '#4ade80',
        quoteFromVideo: '"Nåå nej, nej, det er jo rigtigt, undskyld! Du har ret – nå nej."',
        bodyLanguage: 'Hånden på brystet og panden med et varmt, undskyldende smil.',
        meaning: 'Taleren indrømmer sin fejl i en diskussion og giver samtalepartneren ret.',
        ttsSample: 'Nåå nej, det er jo rigtigt, undskyld! Du har ret.'
    }
];

const INTONATION_LAB_ITEMS = [
    {
        isNaaVideo: true,
        videoStart: 20,
        videoEnd: 41,
        videoTimeLabel: '0:20–0:41',
        role: 'lytter',
        title: '1. Video-case (0:20): Når læreren pludselig forstår dig',
        situation: 'Du prøver at forklare din dansklærer noget på dansk. Lige pludselig falder tiøren for læreren, og det hele giver mening! Hvilket "Nå" bruger hun i videoen?',
        ttsSample: 'Nåååh, okay! Nu forstår jeg dig!',
        correctIdx: 0,
        variants: [
            { label: 'Nåååh! (okay) — langt & åbent ⌒↘', curve: 'M10,10 Q42,8 90,30', color: '#4ade80', meaning: 'Pludselig aha-forståelse: "Ah, nu giver det mening!"' },
            { label: 'Nårrh... — lavt & skeptisk ~', curve: 'M10,22 Q35,14 60,26 T90,22', color: '#f87171', meaning: 'Uenig / tvivlende: "Det kan ikke passe"' },
            { label: 'Nå! (kom nu) — kort & bestemt ↓', curve: 'M10,14 L65,32', color: '#f59e0b', meaning: 'Utålmodig: "Vi skal gå nu"' },
            { label: 'Nå nå... — dobbelt & dæmpende ↘↘', curve: 'M10,16 L40,28 M52,16 L85,28', color: '#a78bfa', meaning: '"Rolig nu, stop diskussionen"' }
        ],
        explanation: 'I videoen (0:20) trækker hun vokalen langt ud med åben mund: "Nåååh, okay! Nu forstår jeg!" – det klassiske danske lytter-signal for pludselig forståelse.'
    },
    {
        isNaaVideo: true,
        videoStart: 41,
        videoEnd: 55,
        videoTimeLabel: '0:41–0:55',
        role: 'lytter',
        title: '2. Video-case (0:41): Når danskere ser en lille hund eller en baby',
        situation: 'En kollega viser et billede af sin nyfødte baby eller en lille hundehvalp. Hvordan lyder danskerens "Nå" her ifølge videoen?',
        ttsSample: 'Nåårh, hvor er den sød!',
        correctIdx: 1,
        variants: [
            { label: 'Nå! (da) — kort & brat stigende ↗', curve: 'M10,32 Q48,28 88,7', color: '#38bdf8', meaning: 'Fakta-overraskelse over noget nyt' },
            { label: 'Nåårh! — blødt, langt & r-farvet faldende ↘', curve: 'M10,14 Q45,28 90,33', color: '#4ade80', meaning: 'Varme & nuttethed: "Hvor er den sød!"' },
            { label: 'Nå, hvad så? — frisk & åbent →↗', curve: 'M10,24 L45,22 L88,10', color: '#f59e0b', meaning: 'Samtale-åbner ved frokostbordet' },
            { label: 'Nårrh... — rynkede bryn ~', curve: 'M10,22 Q35,14 60,26 T90,22', color: '#f87171', meaning: 'Skepsis og uenighed' }
        ],
        explanation: 'I videoen (0:41) lægger hun hovedet på skrå og siger med blød, dybt faldende stemme: "Nåårh, hvor er den sød!"'
    },
    {
        isNaaVideo: true,
        videoStart: 56,
        videoEnd: 71,
        videoTimeLabel: '0:56–1:11',
        role: 'lytter',
        title: '3. Video-case (0:56): Når nogen siger noget mærkeligt eller usandt',
        situation: 'En bekendt påstår noget helt usandsynligt, og du er slet ikke sikker på, at det kan passe. Hvilket "Nå" viser denne skepsis i videoen?',
        ttsSample: 'Nårrh, ej, det lyder mærkeligt. Det kan ikke passe.',
        correctIdx: 2,
        variants: [
            { label: 'Nåå... (mm, nå) — bløde lytter-nik →', curve: 'M10,22 Q35,17 60,22 T90,19', color: '#38bdf8', meaning: 'Stille aktiv lytning' },
            { label: 'Nåå ja! — højt gisp ↗↘', curve: 'M10,30 L35,8 L90,26', color: '#f59e0b', meaning: 'Kommer pludselig i tanke om noget glemt' },
            { label: 'Nårrh... / Nåh? — sammenknebent & tvivlende ~', curve: 'M10,22 Q35,14 60,26 T90,22', color: '#4ade80', meaning: 'Uenig / skeptisk: "Ej, det lyder mærkeligt!"' },
            { label: 'Nåå nej... — hånden på brystet ↘', curve: 'M10,12 Q45,24 90,32', color: '#a78bfa', meaning: 'Indrømmer at man selv tog fejl' }
        ],
        explanation: 'I videoen (0:56) rynker hun brynene og siger et tvivlende "Nårrh... nåh... ej, det lyder mærkeligt, det kan ikke passe!"'
    },
    {
        isNaaVideo: true,
        videoStart: 71,
        videoEnd: 81,
        videoTimeLabel: '1:11–1:21',
        role: 'taler',
        title: '4. Video-case (1:11): Når du pludselig kommer i tanke om noget vigtigt!',
        situation: 'Midt i samtalen slår det dig pludselig, at du har glemt en vigtig aftale! Hvad udbryder du med hænderne op til hovedet?',
        ttsSample: 'Nååå ja! Ej, nåå ja!',
        correctIdx: 0,
        variants: [
            { label: 'Nåå ja! — pludseligt gisp + højt udbrud ↗↘', curve: 'M10,30 L35,8 L90,26', color: '#4ade80', meaning: 'Pludselig erindring: "Det havde jeg glemt!"' },
            { label: 'Nå nå... — roligt dæmpende ↘↘', curve: 'M10,16 L40,28 M52,16 L85,28', color: '#a78bfa', meaning: 'Dæmper en diskussion' },
            { label: 'Nåårh! — blødt smeltende ↘', curve: 'M10,14 Q45,28 90,33', color: '#f472b6', meaning: '"Hvor er den sød"' },
            { label: 'Nå! (kom nu) — kort & utålmodigt ↓', curve: 'M10,14 L65,32', color: '#f87171', meaning: 'Vil have de andre med ud ad døren' }
        ],
        explanation: 'I videoen (1:11) gisper hun og tager hænderne op til hovedet: "Nååå ja! Ej! Nåå ja!" – signalet når man pludselig husker noget vigtigt.'
    },
    {
        isNaaVideo: true,
        videoStart: 82,
        videoEnd: 97,
        videoTimeLabel: '1:22–1:37',
        role: 'lytter',
        title: '5. Video-case (1:22): Når du fortæller noget spændende eller helt nyt',
        situation: 'Du fortæller en dansk kollega en helt ny og spændende nyhed. Hvordan reagerer danskeren for at vise overraskelse og interesse?',
        ttsSample: 'Nå! Ej! Nå!',
        correctIdx: 1,
        variants: [
            { label: 'Nå (kom nu) — kort & faldende med suk ↓', curve: 'M10,14 L65,32', color: '#f87171', meaning: 'Utålmodighed' },
            { label: 'Nå! (da) — kort, brat stigende & store øjne ↗', curve: 'M10,32 Q48,28 88,7', color: '#4ade80', meaning: 'Spontan overraskelse & vågen interesse' },
            { label: 'Nåå nej... — undskyldende faldende ↘', curve: 'M10,12 Q45,24 90,32', color: '#f59e0b', meaning: 'Erkender egen fejl' },
            { label: 'Nå nå... — dobbelt afvæbnende ↘↘', curve: 'M10,16 L40,28 M52,16 L85,28', color: '#a78bfa', meaning: 'Stop diskussionen' }
        ],
        explanation: 'I videoen (1:22) spærrer hun øjnene op med et kort, stigende "Nå! Ej! Nå!" – det viser taleren, at nyheden er spændende.'
    },
    {
        isNaaVideo: true,
        videoStart: 98,
        videoEnd: 107,
        videoTimeLabel: '1:38–1:47',
        role: 'taler',
        title: '6. Video-case (1:38): Når man ikke vil vente mere og vil afsted',
        situation: 'Familien står i entréen, bussen kører lige om lidt, og de andre nøler stadig. Hvilket "Nå" bruger taleren i videoen?',
        ttsSample: 'Nå, kom nu! Nå, skal vi gå?',
        correctIdx: 3,
        variants: [
            { label: 'Nåååh! (okay) — lang aha-lyd ⌒↘', curve: 'M10,10 Q42,8 90,30', color: '#38bdf8', meaning: 'Pludselig forståelse' },
            { label: 'Nåårh! — varmt & blødt ↘', curve: 'M10,14 Q45,28 90,33', color: '#f472b6', meaning: 'Når man ser en hundehvalp' },
            { label: 'Nåå... (mm, nå) — stille lytter-nik →', curve: 'M10,22 Q35,17 60,22 T90,19', color: '#22d3ee', meaning: 'Aktiv lytning' },
            { label: 'Nå! (kom nu / skal vi gå?) — kort & bestemt ↓', curve: 'M10,14 L65,32', color: '#4ade80', meaning: 'Utålmodig igangsætter: "Vi skal afsted nu!"' }
        ],
        explanation: 'I videoen (1:38) sætter hun hænderne i siden og vinker: "Nå... kom nu! Nå, skal vi gå?" – et kort, handlekraftigt taler-signal.'
    },
    {
        isNaaVideo: true,
        videoStart: 108,
        videoEnd: 121,
        videoTimeLabel: '1:48–2:01',
        role: 'taler',
        title: '7. Video-case (1:48): Når en dansker sætter sig ved frokostbordet',
        situation: 'Din kollega sætter sig ned ved frokostbordet med sin madpakke og vil starte en hyggelig snak ("Hvordan går det? Er der sket noget nyt?"). Hvad siger hun?',
        ttsSample: 'Nå, hvad så? Hvordan går det?',
        correctIdx: 0,
        variants: [
            { label: 'Nå, hvad så? (hvasså) — frisk & åbent →↗', curve: 'M10,24 L45,22 L88,10', color: '#4ade80', meaning: 'Samtale-åbner: "Er der sket noget nyt / hvordan går det?"' },
            { label: 'Nårrh... — skeptisk & lavt ~', curve: 'M10,22 Q35,14 60,26 T90,22', color: '#f87171', meaning: 'Tvivl og uenighed' },
            { label: 'Nåå nej... — undskyldende ↘', curve: 'M10,12 Q45,24 90,32', color: '#f59e0b', meaning: 'Indrømmer fejl' },
            { label: 'Nå nå... — dæmpende ↘↘', curve: 'M10,16 L40,28 M52,16 L85,28', color: '#a78bfa', meaning: 'Stopper en diskussion' }
        ],
        explanation: 'I videoen (1:48) smiler hun stort ved frokostbordet: "Nå, hvad så?" (udtalt "Nå, hvasså?") – danskernes foretrukne uformelle samtale-starter.'
    },
    {
        isNaaVideo: true,
        videoStart: 121,
        videoEnd: 140,
        videoTimeLabel: '2:01–2:20',
        role: 'lytter',
        title: '8. Video-case (2:01): Når en dansker bare lytter interesseret til din snak',
        situation: 'Du er i gang med at fortælle en længere historie, og danskeren over for dig nikker roligt og siger små, bløde lyde undervejs uden at afbryde dig.',
        ttsSample: 'Nå... mm, nå... nå, ja.',
        correctIdx: 2,
        variants: [
            { label: 'Nå! (kom nu) — kort & utålmodigt ↓', curve: 'M10,14 L65,32', color: '#f87171', meaning: 'Vil afbryde og gå' },
            { label: 'Nåå ja! — højt gisp ↗↘', curve: 'M10,30 L35,8 L90,26', color: '#f59e0b', meaning: 'Kommer i tanke om noget glemt' },
            { label: 'Nåå... (mm, nå... ja) — stille, rytmisk & blødt →', curve: 'M10,22 Q35,17 60,22 T90,19', color: '#4ade80', meaning: 'Aktiv lytning: "Jeg lytter og er interesseret i, hvad du siger"' },
            { label: 'Nårrh... — rynkede bryn ~', curve: 'M10,22 Q35,14 60,26 T90,22', color: '#a78bfa', meaning: 'Tro ikke på dig' }
        ],
        explanation: 'I videoen (2:01) viser hun, hvordan "Nå... mm, nå... ja" med rolige nik betyder: "Jeg lytter! Fortsæt bare din historie."'
    },
    {
        isNaaVideo: true,
        videoStart: 141,
        videoEnd: 153,
        videoTimeLabel: '2:21–2:33',
        role: 'lytter',
        title: '9. Video-case (2:21): Når en diskussion skal dæmpes ("rolig nu")',
        situation: 'To personer er uenige, eller nogen siger noget ret vildt, og du vil gerne dæmpe temperaturen og lukke diskussionen ned.',
        ttsSample: 'Nå, nå-nå... okay, nå-nå.',
        correctIdx: 1,
        variants: [
            { label: 'Nå! (da) — brat stigende ↗', curve: 'M10,32 Q48,28 88,7', color: '#38bdf8', meaning: 'Opmuntrer til at fortælle mere' },
            { label: 'Nå nå (rolig nu)... — dobbelt & dæmpende ↘↘', curve: 'M10,16 L40,28 M52,16 L85,28', color: '#4ade80', meaning: 'Afvæbnende: "Tag det roligt / lad os stoppe diskussionen her"' },
            { label: 'Nåårh! — smeltende ↘', curve: 'M10,14 Q45,28 90,33', color: '#f472b6', meaning: '"Hvor er den sød"' },
            { label: 'Nå, hvad så? — frisk åbner →↗', curve: 'M10,24 L45,22 L88,10', color: '#f59e0b', meaning: 'Starter ny frokostsnak' }
        ],
        explanation: 'I videoen (2:21) siger hun dobbelt "Nå, nå-nå... okay, nå-nå" for at signalere "rolig nu – lad os stoppe diskussionen".'
    },
    {
        isNaaVideo: true,
        videoStart: 154,
        videoEnd: 168,
        videoTimeLabel: '2:34–2:48',
        role: 'taler',
        title: '10. Video-case (2:34): Når du opdager, at du selv har taget fejl!',
        situation: 'I diskuterer noget, og pludselig går det op for dig, at det var DIG, der huskede forkert, og at den anden har helt ret!',
        ttsSample: 'Nåå nej, det er jo rigtigt, undskyld! Du har ret.',
        correctIdx: 3,
        variants: [
            { label: 'Nårrh... — skeptisk & afvisende ~', curve: 'M10,22 Q35,14 60,26 T90,22', color: '#f87171', meaning: 'Fastholder at den anden tager fejl' },
            { label: 'Nå! (kom nu) — utålmodigt ↓', curve: 'M10,14 L65,32', color: '#f59e0b', meaning: 'Vil gå med det samme' },
            { label: 'Nå, hvad så? — frisk →↗', curve: 'M10,24 L45,22 L88,10', color: '#38bdf8', meaning: 'Samtale-åbner' },
            { label: 'Nå (nej)... — blødt, selverkendende & faldende ↘', curve: 'M10,12 Q45,24 90,32', color: '#4ade80', meaning: 'Indrømmer fejl: "Nåå nej, det er jo rigtigt, undskyld!"' }
        ],
        explanation: 'I videoen (2:34) tager hun hånden til brystet og panden og smiler undskyldende: "Nåå nej, nej, det er jo rigtigt, undskyld! Nå nej."'
    },
    {
        isNaaVideo: false,
        role: 'lytter',
        title: '11. Familie "JA" — Rolig lytter vs. utålmodig lytter',
        situation: 'En kollega forklarer dig venligt en arbejdsopgave. Hvordan viser du som lytter, at du følger roligt med (uden at virke irriteret)?',
        ttsSample: 'Ja... mm-hm... det giver god mening.',
        correctIdx: 0,
        variants: [
            { label: 'Ja... (ét roligt nik ad gangen →)', curve: 'M10,22 Q50,20 90,22', color: '#4ade80', meaning: 'Roligt lyttesignal: "Jeg følger med, fortsæt"' },
            { label: 'Ja-ja-ja! (hurtigt 3 gange i træk)', curve: 'M10,28 L25,10 L40,28 L55,10 L70,28', color: '#f87171', meaning: 'Utålmodigt: "Jeg HAR forstået det, stop nu!"' },
            { label: 'Jaaa... (tvivlende & svævende ~)', curve: 'M10,20 Q35,8 60,28 T90,18', color: '#f59e0b', meaning: 'Tøvende: "Tja, jeg er nu ikke helt sikker..."' }
        ],
        explanation: 'Pas på med at sige "Ja-ja-ja!" hurtigt i træk på dansk – det lyder som om du er utålmodig! Ét roligt "Ja..." eller "Mm-hm" ad gangen er meget bedre.'
    },
    {
        isNaaVideo: false,
        role: 'taler',
        title: '12. Familie "JA / JO" — Spørgsmål med "ikke"',
        situation: 'Din ven spørger: "Kommer du ikke med til fodbold i aften?" Du VIL gerne med! Hvad svarer du?',
        ttsSample: 'Jo, selvfølgelig kommer jeg med!',
        correctIdx: 1,
        variants: [
            { label: 'Ja! (almindeligt ja)', curve: 'M10,24 L85,18', color: '#f87171', meaning: 'Forvirrende efter "ikke" på dansk!' },
            { label: 'Jo! (tydeligt & varmt ↘)', curve: 'M10,10 Q50,18 90,28', color: '#4ade80', meaning: 'Tvunget positivt svar når spørgsmålet har "ikke"' },
            { label: 'Tja... (svævende →)', curve: 'M10,22 Q50,28 90,20', color: '#f59e0b', meaning: 'Måske / jeg ved det ikke rigtigt' }
        ],
        explanation: 'Når spørgsmålet indeholder "ikke" ("Kommer du ikke...?"), SKAL man bruge "Jo!" for at svare bekræftende på dansk.'
    },
    {
        isNaaVideo: false,
        role: 'lytter',
        title: '13. Familie "MMM" — Lukket mund i samtalen',
        situation: 'Du sidder til kaffe hos en ven, der fortæller om sin ferie. Hvilken "mm"-lyd viser, at hun trygt skal fortælle videre?',
        ttsSample: 'Mm-hm! Hvor lyder det dejligt.',
        correctIdx: 0,
        variants: [
            { label: 'Mm-hm (to toner, let stigende ↗)', curve: 'M10,26 L42,26 L55,26 L88,12', color: '#4ade80', meaning: 'Aktiv lytning: "Jeg hører dig, fortsæt bare"' },
            { label: 'Øhm... (lang flad tænkelyd →)', curve: 'M10,22 L90,22', color: '#f59e0b', meaning: 'Taler-lyd: "Jeg vil selv sige noget og tænker lige"' },
            { label: 'Hm? (kort, skarpt stigende ↗)', curve: 'M20,32 L80,6', color: '#38bdf8', meaning: '"Hvad sagde du? Jeg hørte det ikke"' }
        ],
        explanation: '"Mm-hm" med let stigende slut-tone viser aktiv lytning, mens "Øhm..." viser at du selv er ved at tage eller holde taleturen.'
    },
    {
        isNaaVideo: false,
        role: 'taler',
        title: '14. "...ikke?" vs. "...vel?" i slutningen af sætningen',
        situation: 'Du siger til din makker: "Det er ___ ikke for sent at tilmelde sig kurset, ___?" Hvilket hale-ord afleverer taleturen rigtigt her?',
        ttsSample: 'Det er ikke for sent at tilmelde sig kurset, vel?',
        correctIdx: 1,
        variants: [
            { label: '...ikke? (efter positiv sætning ↗)', curve: 'M10,28 Q55,22 90,10', color: '#38bdf8', meaning: 'Bruges når sætningen IKKE indeholder "ikke/aldrig"' },
            { label: '...vel? (efter negativ sætning ↗)', curve: 'M10,28 Q55,22 90,10', color: '#4ade80', meaning: 'Bruges når sætningen indeholder "ikke" eller "aldrig"' }
        ],
        explanation: 'Fordi sætningen indeholder "ikke" ("Det er ikke for sent..."), skal halen være "...vel?". Positiv sætning → "...ikke?", negativ sætning → "...vel?".'
    },
    {
        isNaaVideo: false,
        role: 'taler',
        title: '15. Når du leder efter et ord midt i sætningen',
        situation: 'Du er midt i en forklaring hos lægen og kan ikke lige huske ordet "henvisning". Hvad siger du for ikke at miste taleturen?',
        ttsSample: 'Jeg skulle bede om en, hvad hedder det, en henvisning.',
        correctIdx: 0,
        variants: [
            { label: '"...hvad hedder det..." (hurtigt indskud →)', curve: 'M10,22 L90,22', color: '#4ade80', meaning: 'Holder din taletur åben, mens du finder ordet' },
            { label: '"Nå, men..." (emneskift →)', curve: 'M10,22 L50,22 L90,14', color: '#f59e0b', meaning: 'Skifter helt emne' },
            { label: '3 sekunders helt tavshed (—)', curve: 'M10,30 L90,30', color: '#f87171', meaning: 'Lytteren tror du er færdig og tager ordet!' }
        ],
        explanation: '"Hvad hedder det..." (eller "øhm...") viser tydeligt lægen, at du stadig er midt i din sætning.'
    },
    {
        isNaaVideo: false,
        role: 'taler',
        title: '16. Blød opstart vs. hård korrektion',
        situation: 'Din kollega foreslår at holde mødet onsdag, men du ved, at halvdelen af teamet er på kursus onsdag. Hvordan starter du blødest din taletur?',
        ttsSample: 'Altså, faktisk er halvdelen af teamet på kursus på onsdag.',
        correctIdx: 0,
        variants: [
            { label: '"Altså, faktisk er halvdelen på kursus..."', curve: 'M10,18 Q50,22 90,20', color: '#4ade80', meaning: 'Blød, samarbejdende dansk nuancering' },
            { label: '"Nej! Det er forkert, de er på kursus."', curve: 'M10,10 L85,32', color: '#f87171', meaning: 'Meget hårdt og konfronterende på dansk' }
        ],
        explanation: 'Kombinationen af "Altså..." og "faktisk..." gør en rettelse venlig og konstruktiv på en dansk arbejdsplads.'
    },
    {
        isNaaVideo: false,
        role: 'lytter',
        title: '17. Lytterens opbakning: "Nå." vs. "Præcis!"',
        situation: 'En medkursist siger: "Jeg synes dansk udtale bliver meget lettere, når man kender de små samtalelyde!" Du er 100 % enig. Hvad giver mest varme?',
        ttsSample: 'Præcis! Det gør nemlig en kæmpe forskel!',
        correctIdx: 1,
        variants: [
            { label: '"Nå." (kort og fladt)', curve: 'M10,20 L60,30', color: '#f87171', meaning: 'Virker uinteresseret' },
            { label: '"Præcis! / Nemlig!" (varmt og energisk ↘)', curve: 'M10,10 Q45,16 90,28', color: '#4ade80', meaning: '100 % opbakning og fælles begejstring' },
            { label: '"Øhm..." (tænkelyd)', curve: 'M10,22 L90,22', color: '#f59e0b', meaning: 'Signalerer tvivl eller tøven' }
        ],
        explanation: '"Præcis!" og "Nemlig!" viser stærk enighed og giver taleren følelsen af, at I er helt på bølgelængde.'
    }
];

// =========================================================================
// BANE 4B: YOUTUBE-VIDEO "SVAR MED JA ELLER JO PÅ DANSK" (Ja, Jo, Nej & ikke)
// Video: https://www.youtube.com/watch?v=8eQWa52te8I (@klartilstartidanmark – 2:38)
// Match i vores lister: Ord #6 (jo), Ord #10 (Ja / Ja-ja), Ord #5 (...ikke? / ...vel?), Lyd #5 (Ja) & Lyd #8 (Nej)
// =========================================================================
const JAJO_YOUTUBE_ID = '8eQWa52te8I';

const JAJO_VIDEO_VARIANTS = [
    {
        num: 1,
        id: 'jajo_1_intro',
        label: '1. Hovedreglen: Uden vs. med "ikke"',
        badgeText: 'Hovedreglen: Spørgsmål UDEN "ikke" → Ja/Nej • MED "ikke" → Jo/Nej',
        part: 'uden_ikke',
        partLabel: 'Del 1: Uden "ikke"',
        matchTag: 'Match: Ord #10 (Ja), Ord #6 (jo) & Ord #5 (ikke)',
        role: 'taler',
        startSec: 0,
        endSec: 25,
        timeLabel: '0:00',
        curve: 'M10,22 L45,12 L90,26',
        color: '#38bdf8',
        quoteFromVideo: '"Hvornår svarer vi JA, og hvornår svarer vi JO på dansk?"',
        bodyLanguage: 'Peger tydeligt på forskellen mellem et neutralt spørgsmål og et spørgsmål med "ikke".',
        meaning: 'Det er ordet "ikke" i spørgsmålet, der afgør, om et positivt svar hedder JA (uden "ikke") eller JO (med "ikke"). Et negativt svar hedder altid NEJ.',
        ttsSample: 'Spørgsmål uden ikke får svaret ja eller nej. Spørgsmål med ikke får svaret jo eller nej.'
    },
    {
        num: 2,
        id: 'jajo_2_kommer_du',
        label: '2. "Kommer du i aften?" → Ja / Nej',
        badgeText: 'Del 1 (Uden ikke): "Kommer du i aften?" → Ja / Nej',
        part: 'uden_ikke',
        partLabel: 'Del 1: Uden "ikke"',
        matchTag: 'Match: Ord #10 (Ja) & Lyd #8 (Nej)',
        role: 'taler',
        startSec: 25,
        endSec: 44,
        timeLabel: '0:25',
        curve: 'M10,28 Q50,20 90,10',
        color: '#4ade80',
        quoteFromVideo: '"Kommer du i aften?" → "Ja (jeg kommer)" eller "Nej (jeg kommer ikke)".',
        bodyLanguage: 'Åbent spørgende ansigt med stigende slut-intonation, efterfulgt af nik ("Ja") eller hovedrysten ("Nej").',
        meaning: 'Spørgsmålet har IKKE ordet "ikke". Derfor svarer du "Ja" (positivt) eller "Nej" (negativt).',
        ttsSample: 'Kommer du i aften? Ja, jeg kommer. Nej, jeg kommer ikke.'
    },
    {
        num: 3,
        id: 'jajo_3_har_du_koebt_ind',
        label: '3. "Har du købt ind?" → Ja / Nej',
        badgeText: 'Del 1 (Uden ikke): "Har du købt ind?" → Ja / Nej',
        part: 'uden_ikke',
        partLabel: 'Del 1: Uden "ikke"',
        matchTag: 'Match: Ord #10 (Ja) & Lyd #8 (Nej)',
        role: 'taler',
        startSec: 45,
        endSec: 57,
        timeLabel: '0:45',
        curve: 'M10,26 Q50,20 90,12',
        color: '#22d3ee',
        quoteFromVideo: '"Har du købt ind?" → "Ja, jeg har købt ind" / "Nej, jeg har ikke købt ind".',
        bodyLanguage: 'Tydeligt nik ved "Ja" og hovedrysten ved "Nej".',
        meaning: 'Neutralt spørgsmål uden "ikke" → Positivt svar = Ja, negativt svar = Nej.',
        ttsSample: 'Har du købt ind? Ja, jeg har købt ind.'
    },
    {
        num: 4,
        id: 'jajo_4_skal_du_arbejde',
        label: '4. "Skal du arbejde i weekenden?" → Ja / Nej',
        badgeText: 'Del 1 (Uden ikke): "Skal du arbejde i weekenden?" → Ja / Nej',
        part: 'uden_ikke',
        partLabel: 'Del 1: Uden "ikke"',
        matchTag: 'Match: Ord #10 (Ja) & Lyd #8 (Nej)',
        role: 'taler',
        startSec: 58,
        endSec: 72,
        timeLabel: '0:58',
        curve: 'M10,26 Q50,20 90,12',
        color: '#a78bfa',
        quoteFromVideo: '"Skal du arbejde i weekenden?" → "Ja (jeg skal arbejde)" / "Nej (jeg skal ikke arbejde)".',
        bodyLanguage: 'Rolig, neutral spørgemelodi uden negation.',
        meaning: 'Tredje eksempel i Del 1 uden "ikke": Her bruges aldrig "Jo".',
        ttsSample: 'Skal du arbejde i weekenden? Ja, jeg skal arbejde.'
    },
    {
        num: 5,
        id: 'jajo_5_overgang_ikke',
        label: '5. Del 2 (1:13): Nu kommer "IKKE" ind i spørgsmålet!',
        badgeText: 'Del 2 (Med ikke): Når spørgsmålet har "ikke", SKAL positivt svar være JO!',
        part: 'med_ikke',
        partLabel: 'Del 2: Med "ikke"',
        matchTag: 'Match: Ord #6 (jo) & Ord #5 (ikke)',
        role: 'taler',
        startSec: 73,
        endSec: 98,
        timeLabel: '1:13',
        curve: 'M10,10 Q45,18 90,30',
        color: '#f59e0b',
        quoteFromVideo: '"Når der er IKKE i spørgsmålet, kan vi IKKE svare ja – så svarer vi JO eller NEJ!"',
        bodyLanguage: 'Løfter pegefingeren ved 1:13 for at markere skiftet fra Ja til Jo.',
        meaning: 'På dansk bryder "Jo!" negationen "ikke" i spørgsmålet og gør det 100 % klart, at svaret er positivt.',
        ttsSample: ' når der er ikke i spørgsmålet, svarer vi jo eller nej.'
    },
    {
        num: 6,
        id: 'jajo_6_kommer_du_ikke',
        label: '6. "Kommer du ikke i aften?" → Jo / Nej',
        badgeText: 'Del 2 (Med ikke): "Kommer du ikke i aften?" → Jo, jeg kommer / Nej, jeg kommer ikke',
        part: 'med_ikke',
        partLabel: 'Del 2: Med "ikke"',
        matchTag: 'Match: Ord #6 (jo) + Lyd #8 (Nej)',
        role: 'taler',
        startSec: 99,
        endSec: 121,
        timeLabel: '1:39',
        curve: 'M10,10 Q48,18 90,28',
        color: '#fb923c',
        quoteFromVideo: '"Kommer du ikke i aften?" → "Jo, jeg kommer!" eller "Nej, jeg kommer ikke."',
        bodyLanguage: 'Tydeligt, varmt eftertryk på "JO, jeg kommer!" så misforståelsen fjernes.',
        meaning: 'Hvis du gerne VIL komme, men spørgsmålet har "ikke", SKAL du svare "Jo, jeg kommer!". Hvis du ikke kommer, svarer du "Nej, jeg kommer ikke".',
        ttsSample: 'Kommer du ikke i aften? Jo, jeg kommer!'
    },
    {
        num: 7,
        id: 'jajo_7_har_du_ikke_koebt',
        label: '7. "Har du ikke købt ind?" → Jo / Nej',
        badgeText: 'Del 2 (Med ikke): "Har du ikke købt ind?" → Jo / Nej',
        part: 'med_ikke',
        partLabel: 'Del 2: Med "ikke"',
        matchTag: 'Match: Ord #6 (jo) + Lyd #8 (Nej)',
        role: 'taler',
        startSec: 122,
        endSec: 138,
        timeLabel: '2:02',
        curve: 'M10,10 Q48,18 90,28',
        color: '#f472b6',
        quoteFromVideo: '"Har du ikke købt ind?" → "Jo, jeg har købt ind!" / "Nej, jeg har ikke købt ind."',
        bodyLanguage: 'Bekræftende nik på "Jo!" vs. benægtende hovedrysten på "Nej".',
        meaning: 'Har du købt varerne? Så sig "Jo!". Har du glemt at købe ind? Så sig "Nej!".',
        ttsSample: 'Har du ikke købt ind? Jo, jeg har købt ind!'
    },
    {
        num: 8,
        id: 'jajo_8_skal_du_ikke_arbejde',
        label: '8. "Skal du ikke arbejde i weekenden?" → Jo / Nej',
        badgeText: 'Del 2 (Med ikke): "Skal du ikke arbejde i weekenden?" → Jo / Nej',
        part: 'med_ikke',
        partLabel: 'Del 2: Med "ikke"',
        matchTag: 'Match: Ord #6 (jo) + Lyd #8 (Nej)',
        role: 'taler',
        startSec: 139,
        endSec: 158,
        timeLabel: '2:19',
        curve: 'M10,10 Q48,18 90,28',
        color: '#e879f9',
        quoteFromVideo: '"Skal du ikke arbejde i weekenden?" → "Jo, jeg skal arbejde" / "Nej, jeg skal ikke arbejde".',
        bodyLanguage: 'Opsummerer hele kontrasten mellem Ja/Nej og Jo/Nej.',
        meaning: 'Hvis du faktisk SKAL på arbejde i weekenden, svarer du "Jo, jeg skal arbejde". Hvis du har fri, svarer du "Nej, jeg skal ikke arbejde".',
        ttsSample: 'Skal du ikke arbejde i weekenden? Jo, jeg skal arbejde.'
    }
];

const JAJO_LAB_ITEMS = [
    {
        part: 'uden_ikke',
        videoStart: 25,
        videoEnd: 44,
        videoTimeLabel: '0:25–0:44',
        role: 'taler',
        title: '1. Video-case (0:25): "Kommer du i aften?" (Spørgsmål UDEN "ikke")',
        situation: 'Din ven spørger neutralt: "Kommer du i aften?" Du vil rigtig gerne komme! Hvad skal du svare ifølge Del 1 i videoen?',
        ttsSample: 'Kommer du i aften? Ja, jeg kommer!',
        correctIdx: 0,
        variants: [
            { label: '"Ja, jeg kommer!" (neutralt spørgsmål uden "ikke" → Ja ↘)', curve: 'M10,16 Q50,22 90,28', color: '#4ade80', meaning: 'Korrekt positivt svar på spørgsmål UDEN "ikke"' },
            { label: '"Jo, jeg kommer!" (bruges kun efter "ikke" ↘)', curve: 'M10,10 Q48,18 90,28', color: '#f87171', meaning: 'Forkert her, fordi spørgsmålet ikke indeholder "ikke"' },
            { label: '"Nej, jeg kommer!" (selvmodsigende)', curve: 'M10,28 L50,10 L90,28', color: '#f59e0b', meaning: 'Forvirrende kombination' }
        ],
        explanation: 'I videoen (0:25) viser hun, at når spørgsmålet IKKE indeholder ordet "ikke" ("Kommer du i aften?"), hedder det positive svar altid "Ja!".'
    },
    {
        part: 'med_ikke',
        videoStart: 99,
        videoEnd: 121,
        videoTimeLabel: '1:39–2:01',
        role: 'taler',
        title: '2. Video-case (1:39): "Kommer du IKKE i aften?" (Du VIL gerne komme!)',
        situation: 'Nu spørger din ven med ordet "ikke": "Kommer du ikke i aften?" Du ER på vej og kommer til festen! Hvad SKAL du svare ifølge Del 2 i videoen?',
        ttsSample: 'Kommer du ikke i aften? Jo, jeg kommer!',
        correctIdx: 1,
        variants: [
            { label: '"Ja, jeg kommer!" (forvirrende efter "ikke")', curve: 'M10,22 L90,22', color: '#f87171', meaning: 'Efter "ikke" må vi ikke bruge "Ja" på dansk!' },
            { label: '"Jo, jeg kommer!" (Ord #6 Jo bryder "ikke" ↘)', curve: 'M10,10 Q48,18 90,28', color: '#4ade80', meaning: 'Tvunget positivt svar når spørgsmålet indeholder "ikke"' },
            { label: '"Nej, jeg kommer ikke." (negativt svar ↘)', curve: 'M10,18 L90,30', color: '#38bdf8', meaning: 'Betyder at du IKKE kommer i aften' }
        ],
        explanation: 'I videoen (1:39) understreger hun: Fordi spørgsmålet har "ikke" ("Kommer du ikke i aften?"), SKAL du svare "Jo, jeg kommer!", når svaret er positivt.'
    },
    {
        part: 'med_ikke',
        videoStart: 99,
        videoEnd: 121,
        videoTimeLabel: '1:39–2:01',
        role: 'taler',
        title: '3. Video-case (1:39): "Kommer du IKKE i aften?" (Du bliver hjemme)',
        situation: 'Din ven spørger: "Kommer du ikke i aften?" Desværre er du blevet forkølet og kommer IKKE. Hvad svarer du ifølge videoen?',
        ttsSample: 'Nej, jeg kommer ikke.',
        correctIdx: 2,
        variants: [
            { label: '"Ja, jeg kommer ikke." (forkert på dansk)', curve: 'M10,26 L50,12 L90,26', color: '#f87171', meaning: 'På dansk siger man aldrig "Ja" for at bekræfte en negation!' },
            { label: '"Jo, jeg kommer ikke." (selvmodsigende)', curve: 'M10,12 L50,28 L90,12', color: '#f59e0b', meaning: '"Jo" betyder altid at du GØR det' },
            { label: '"Nej, jeg kommer ikke." (Lyd #8 Nej bruges altid ved negativt svar ↘)', curve: 'M10,16 Q50,24 90,30', color: '#4ade80', meaning: 'Uanset om spørgsmålet har "ikke" eller ej, hedder et negativt svar altid "Nej!"' }
        ],
        explanation: 'Vigtig pointe fra videoen (1:39): Når du IKKE kommer, hedder svaret "Nej, jeg kommer ikke" – både i Del 1 og Del 2!'
    },
    {
        part: 'uden_ikke',
        videoStart: 45,
        videoEnd: 57,
        videoTimeLabel: '0:45–0:57',
        role: 'taler',
        title: '4. Video-case (0:45): "Har du købt ind?" vs. (2:02) "Har du IKKE købt ind?"',
        situation: 'Du står i køkkenet med to fyldte indkøbsposer. Din kæreste kigger ind og spørger: "Har du ikke købt ind?" Hvad svarer du?',
        ttsSample: 'Jo, jeg har købt ind!',
        correctIdx: 0,
        variants: [
            { label: '"Jo, jeg har købt ind!" (fordi der er "ikke" i spørgsmålet ↘)', curve: 'M10,10 Q48,18 90,28', color: '#4ade80', meaning: 'Korrekt svar på "Har du ikke købt ind?" når poserne er fyldte!' },
            { label: '"Ja, jeg har købt ind!" (kun hvis der spørges UDEN "ikke")', curve: 'M10,18 L90,24', color: '#f87171', meaning: 'Ville kun passe til "Har du købt ind?" uden "ikke"' },
            { label: '"Nej, jeg har ikke købt ind."', curve: 'M10,20 L90,30', color: '#38bdf8', meaning: 'Passer kun hvis du IKKE har købt ind' }
        ],
        explanation: 'I videoen sammenligner hun direkte "Har du købt ind? → Ja" (0:45) med "Har du ikke købt ind? → Jo!" (2:02).'
    },
    {
        part: 'uden_ikke',
        videoStart: 58,
        videoEnd: 72,
        videoTimeLabel: '0:58–1:12',
        role: 'taler',
        title: '5. Video-case (0:58): "Skal du arbejde i weekenden?" (Uden "ikke")',
        situation: 'En kollega spørger fredag eftermiddag: "Skal du arbejde i weekenden?" Du har en vagt lørdag formiddag. Hvad svarer du?',
        ttsSample: 'Ja, jeg skal arbejde i weekenden.',
        correctIdx: 1,
        variants: [
            { label: '"Jo, jeg skal arbejde."', curve: 'M10,10 Q48,18 90,28', color: '#f87171', meaning: 'Spørgsmålet har ikke ordet "ikke", så brug "Ja" i stedet for "Jo"' },
            { label: '"Ja, jeg skal arbejde." (spørgsmål uden "ikke" → Ja ↘)', curve: 'M10,16 Q50,22 90,28', color: '#4ade80', meaning: 'Korrekt positivt svar i Del 1' },
            { label: '"Nej, jeg har fri."', curve: 'M10,20 L90,30', color: '#38bdf8', meaning: 'Passer kun hvis du ikke skal arbejde' }
        ],
        explanation: 'I videoen (0:58) er spørgsmålet "Skal du arbejde i weekenden?" helt uden negation – derfor svarer du "Ja" (eller "Nej").'
    },
    {
        part: 'med_ikke',
        videoStart: 139,
        videoEnd: 158,
        videoTimeLabel: '2:19–2:38',
        role: 'taler',
        title: '6. Video-case (2:19): "Skal du IKKE arbejde i weekenden?" (Med "ikke")',
        situation: 'Din nabo tror, du har fri, og spørger: "Skal du ikke arbejde i weekenden?" Men du SKAL faktisk på arbejde lørdag! Hvad svarer du ifølge videoens sidste eksempel?',
        ttsSample: 'Jo, jeg skal arbejde i weekenden.',
        correctIdx: 2,
        variants: [
            { label: '"Ja, jeg skal arbejde."', curve: 'M10,18 L90,24', color: '#f87171', meaning: 'Forvirrende efter "Skal du ikke...?"' },
            { label: '"Nej, jeg skal arbejde."', curve: 'M10,22 L90,30', color: '#f59e0b', meaning: 'Selvmodsigende på dansk' },
            { label: '"Jo, jeg skal arbejde!" (Ord #6 Jo ↘)', curve: 'M10,10 Q48,18 90,28', color: '#4ade80', meaning: 'Bryder naboens antagelse ("ikke") og bekræfter, at du skal arbejde' }
        ],
        explanation: 'I videoen (2:19) viser hun netop: "Skal du ikke arbejde i weekenden?" → "Jo, jeg skal arbejde!" (hvis du skal) eller "Nej, jeg skal ikke arbejde" (hvis du har fri).'
    },
    {
        part: 'med_ikke',
        videoStart: 73,
        videoEnd: 121,
        videoTimeLabel: '1:13–2:01',
        role: 'taler',
        title: '7. Kobling til småord #5 ("...ikke?" vs. "...vel?"): Spørgsmål med "...vel?"',
        situation: 'En kollega spørger dig ved frokostbordet: "Du spiser ikke svinekød, vel?" – men du spiser faktisk gerne svinekød! Hvilket svarord fra videoen SKAL du bruge her?',
        ttsSample: 'Jo, det gør jeg faktisk gerne!',
        correctIdx: 0,
        variants: [
            { label: '"Jo, det gør jeg faktisk!" (fordi sætningen har "ikke... vel?" ↘)', curve: 'M10,10 Q48,18 90,28', color: '#4ade80', meaning: 'Negativ sætning ("ikke... vel?") kræver "Jo!" ved positivt svar' },
            { label: '"Ja!"', curve: 'M10,20 L90,22', color: '#f87171', meaning: 'Et "Ja" efter "ikke... vel?" skaber tvivl om, hvad du mener' },
            { label: '"Mm-hm."', curve: 'M10,26 L90,14', color: '#38bdf8', meaning: 'Alt for uklart efter en negation' }
        ],
        explanation: 'Når en sætning indeholder "ikke" (og evt. slutter på "...vel?"), fungerer præcis samme regel som i videoens Del 2: Vil du sige, at du GØR det, skal du bruge "Jo!".'
    },
    {
        part: 'uden_ikke',
        videoStart: 0,
        videoEnd: 98,
        videoTimeLabel: '0:00–1:38',
        role: 'taler',
        title: '8. Hurtigt overblik: De to betydninger af småordet "jo" (#6 i vores tabel)',
        situation: 'I vores tabel over de 15 småord har #6 "jo" to funktioner i dansk samtale. Hvilken funktion træner denne YouTube-video, og hvad er den anden?',
        ttsSample: 'Kommer du ikke? Jo, det ved du jo godt!',
        correctIdx: 1,
        variants: [
            { label: 'At "jo" betyder "nej tak" og "farvel"', curve: 'M10,22 L90,22', color: '#f87171', meaning: 'Forkert' },
            { label: '1) Svarordet "Jo!" på spørgsmål med "ikke" (i videoen) • 2) Indskudsordet "jo" for fælles viden ("Det er jo koldt i dag")', curve: 'M10,10 Q48,18 90,28', color: '#4ade80', meaning: 'Begge funktioner af småord #6 "jo" i dansk samtale!' },
            { label: 'At "jo" kun bruges, når man leder efter et ord midt i en sætning', curve: 'M10,22 L90,22', color: '#38bdf8', meaning: 'Det er "øhm" og "hvad hedder det"' }
        ],
        explanation: 'Helt rigtigt! "Jo" står først i sætningen som positivt svar efter "ikke" ("Kommer du ikke? → Jo!"), og midt i sætningen som hyggeligt fælles-viden ord ("Det ved du jo godt!").'
    }
];

// =========================================================================
// BANE 4C: YOUTUBE-VIDEO "AT VÆRE ENIG I NOGET" (Præcis! & Lige – 100 % enighed)
// Video: https://www.youtube.com/watch?v=HMX7B2X2dIA (@klartilstartidanmark – 1:31)
// Match i vores lister: Ord #15 (Præcis! / Nemlig!) og Ord #7 (lige)
// =========================================================================
const ENIG_YOUTUBE_ID = 'HMX7B2X2dIA';

const ENIG_VIDEO_VARIANTS = [
    {
        num: 1,
        id: 'enig_1_helt_enig',
        label: '1. Det er jeg helt enig i',
        badgeText: '1) Det er jeg helt enig i (0:23)',
        matchTag: 'Lytter-opbakning (formel & uformel)',
        role: 'lytter',
        startSec: 23,
        endSec: 33,
        timeLabel: '0:23',
        curve: 'M10,14 Q50,20 90,26',
        color: '#4ade80',
        quoteFromVideo: '"Det er jeg helt enig i."',
        bodyLanguage: 'Anerkendende nik og varm, åben øjenkontakt.',
        meaning: 'Den klassiske, trygge måde at give taleren 100 % opbakning i både møder, undervisning og hverdagssamtaler.',
        ttsSample: 'Det er jeg helt enig i.'
    },
    {
        num: 2,
        id: 'enig_2_helt_ret',
        label: '2. Du har helt ret',
        badgeText: '2) Du har helt ret (0:34)',
        matchTag: 'Lytter-opbakning (bekræfter taleren)',
        role: 'lytter',
        startSec: 34,
        endSec: 43,
        timeLabel: '0:34',
        curve: 'M10,12 Q48,20 90,28',
        color: '#22d3ee',
        quoteFromVideo: '"Du har helt ret."',
        bodyLanguage: 'Tydeligt bekræftende nik med tryk på "helt ret".',
        meaning: 'Viser samtalepartneren, at deres observation eller vurdering rammer plet.',
        ttsSample: 'Du har helt ret.'
    },
    {
        num: 3,
        id: 'enig_3_lige_mine_ord',
        label: '3. Lige mine ord',
        badgeText: '3) Lige mine ord (0:44) — Match: Ord #7 (lige)',
        matchTag: 'Match: Ord #7 (lige) som præciserende opbakning',
        role: 'lytter',
        startSec: 44,
        endSec: 53,
        timeLabel: '0:44',
        curve: 'M10,10 Q45,18 90,28',
        color: '#f59e0b',
        quoteFromVideo: '"Lige mine ord!"',
        bodyLanguage: 'Smilende og begejstret – som om den anden sagde præcis det, man selv sad og tænkte.',
        meaning: 'Her bruges vores udvalgte småord #7 "lige" i betydningen "nøjagtig / præcis": "Det var lige nøjagtig de ord, jeg selv ville have sagt!".',
        ttsSample: 'Lige mine ord!'
    },
    {
        num: 4,
        id: 'enig_4_praecis_det_samme',
        label: '4. Jeg tænker præcis det samme',
        badgeText: '4) Jeg tænker præcis det samme (0:54) — Match: Ord #15 (Præcis!)',
        matchTag: 'Match: Ord #15 (Præcis! / Nemlig!)',
        role: 'lytter',
        startSec: 54,
        endSec: 64,
        timeLabel: '0:54',
        curve: 'M10,10 Q45,16 90,28',
        color: '#38bdf8',
        quoteFromVideo: '"Jeg tænker præcis det samme."',
        bodyLanguage: 'Varmt, indforstået nik med tydeligt tryk på vores nøgleord "præcis".',
        meaning: 'Direkte match med vores lytter-signal #15 ("Præcis!"): Skaber øjeblikkelig bølgelængde mellem taler og lytter.',
        ttsSample: 'Jeg tænker præcis det samme.'
    },
    {
        num: 5,
        id: 'enig_5_ikke_sige_det_bedre',
        label: '5. Jeg kunne ikke sige det bedre selv',
        badgeText: '5) Jeg kunne ikke sige det bedre selv (1:05)',
        matchTag: 'Stærk anerkendelse af talerens formulering',
        role: 'lytter',
        startSec: 65,
        endSec: 76,
        timeLabel: '1:05',
        curve: 'M10,14 Q50,20 90,28',
        color: '#a78bfa',
        quoteFromVideo: '"Jeg kunne ikke sige det bedre selv."',
        bodyLanguage: 'Imponeret, anerkendende smil og nik.',
        meaning: 'Rosende lytter-reaktion, når samtalepartneren har formuleret en pointe helt skarpt.',
        ttsSample: 'Jeg kunne ikke sige det bedre selv.'
    },
    {
        num: 6,
        id: 'enig_6_taget_ud_af_min_mund',
        label: '6. Det er som taget ud af min mund',
        badgeText: '6) Det er som taget ud af min mund (1:17)',
        matchTag: 'Dansk samtale-idiom for 100 % enighed',
        role: 'lytter',
        startSec: 77,
        endSec: 91,
        timeLabel: '1:17',
        curve: 'M10,12 Q48,20 90,28',
        color: '#f472b6',
        quoteFromVideo: '"Det er som taget ud af min mund."',
        bodyLanguage: 'Hånden bevæger sig let fra munden ud mod samtalepartneren med et stort smil.',
        meaning: 'Billedligt dansk udtryk der betyder: "Du sagde præcis den sætning, der lå klar inde i min mund!"',
        ttsSample: 'Det er som taget ud af min mund.'
    }
];

const ENIG_LAB_ITEMS = [
    {
        videoStart: 44,
        videoEnd: 53,
        videoTimeLabel: '0:44–0:53',
        role: 'lytter',
        title: '1. Video-case (0:44): Småord #7 "Lige" som hurtig, varm opbakning',
        situation: 'Din kollega siger i frokostpausen: "Vi trænger altså til noget mere solskin snart!" Det var nøjagtig de ord, du selv sad og tænkte på. Hvilket kort 3-ords udtryk med "lige" bruger hun ved 0:44?',
        ttsSample: 'Lige mine ord!',
        correctIdx: 0,
        variants: [
            { label: '"Lige mine ord!" (Ord #7 Lige = nøjagtig de ord, jeg selv ville sige ↘)', curve: 'M10,10 Q45,18 90,28', color: '#4ade80', meaning: 'Kort, energisk dansk lytter-reaktion for 100 % enighed' },
            { label: '"Hvad hedder det..." (ordsøgnings-signal →)', curve: 'M10,22 L90,22', color: '#f59e0b', meaning: 'Bruges når taleren leder efter et ord' },
            { label: '"Nå, men..." (emneskift →↗)', curve: 'M10,22 L50,22 L90,14', color: '#f87171', meaning: 'Skifter emne eller runder samtalen af' }
        ],
        explanation: 'I videoen (0:44) siger hun "Lige mine ord!" – et super naturligt dansk udtryk, hvor småordet "lige" betyder "nøjagtig / præcis".'
    },
    {
        videoStart: 54,
        videoEnd: 64,
        videoTimeLabel: '0:54–1:04',
        role: 'lytter',
        title: '2. Video-case (0:54): Småord #15 "Præcis" når I tænker 100 % ens',
        situation: 'En medkursist foreslår, at I deler opgaven op i to mindre dele, og du sad lige og tænkte nøjagtig den samme tanke! Hvilken sætning med nøgleordet "præcis" viser hun ved 0:54?',
        ttsSample: 'Jeg tænker præcis det samme.',
        correctIdx: 1,
        variants: [
            { label: '"Øhm... det ved jeg ikke rigtigt." (tvivl →)', curve: 'M10,22 L90,22', color: '#f87171', meaning: 'Usikkerhed' },
            { label: '"Jeg tænker præcis det samme!" (Ord #15 Præcis ↘)', curve: 'M10,10 Q45,16 90,28', color: '#4ade80', meaning: 'Stærk lytter-opbakning der viser, at I er helt på bølgelængde' },
            { label: '"Du tænker ikke det samme, vel?" (spørgende hale ↗)', curve: 'M10,28 Q55,22 90,10', color: '#38bdf8', meaning: 'Spørgsmål med "...vel?"' }
        ],
        explanation: 'I videoen (0:54) gennemgår hun "Jeg tænker præcis det samme" – eller bare et kort "Præcis!" (#15 i vores vrimlebillede).'
    },
    {
        videoStart: 23,
        videoEnd: 43,
        videoTimeLabel: '0:23–0:43',
        role: 'lytter',
        title: '3. Video-case (0:23 & 0:34): De to klassiske enigheds-svar med "helt"',
        situation: 'Til et møde på arbejdet kommer din kollega med et rigtig godt forslag. Hvilke to klassiske sætninger (nr. 1 og nr. 2 i videoen) bruger småordet "helt" til at bakke kollegaen op?',
        ttsSample: 'Det er jeg helt enig i. Du har helt ret.',
        correctIdx: 2,
        variants: [
            { label: '"Nå." / "Okay." (helt fladt og kort ↓)', curve: 'M10,20 L60,30', color: '#f87171', meaning: 'Lyder uengageret på et møde' },
            { label: '"Virkelig? Seriøst?" (overraskelse ↗)', curve: 'M10,30 Q50,18 90,8', color: '#f59e0b', meaning: 'Udtrykker forbløffelse over en nyhed, ikke enighed' },
            { label: '"Det er jeg helt enig i" & "Du har helt ret" (varmt og klart ↘)', curve: 'M10,14 Q50,20 90,26', color: '#4ade80', meaning: 'De to mest brugte danske opbaknings-sætninger i både formel og uformel tale' }
        ],
        explanation: 'I videoen (0:23–0:43) starter hun med de to vigtigste grundsætninger: "Det er jeg helt enig i" og "Du har helt ret".'
    },
    {
        videoStart: 65,
        videoEnd: 76,
        videoTimeLabel: '1:05–1:16',
        role: 'lytter',
        title: '4. Video-case (1:05): Når den anden har formuleret pointen perfekt',
        situation: 'Din makker har lige opsummeret hele gruppens idé på en super skarp og klar måde. Hvordan roser og støtter du formuleringen ifølge eksempel 5 i videoen?',
        ttsSample: 'Jeg kunne ikke sige det bedre selv.',
        correctIdx: 0,
        variants: [
            { label: '"Jeg kunne ikke sige det bedre selv!" (1:05 ↘)', curve: 'M10,14 Q50,20 90,28', color: '#4ade80', meaning: 'Anerkender både indholdet og den gode måde, det blev sagt på' },
            { label: '"Altså, faktisk..." (indleder korrektion →)', curve: 'M10,18 Q50,22 90,20', color: '#f59e0b', meaning: 'Signalerer at du vil rette eller tilføje en nuance' },
            { label: '"Nååå..." (langsomt forståelses-signal ⌒↘)', curve: 'M10,10 Q42,8 90,30', color: '#38bdf8', meaning: 'Bruges når noget nyt pludselig går op for dig' }
        ],
        explanation: 'I videoen (1:05) viser hun "Jeg kunne ikke sige det bedre selv" – en varm og anerkendende lytter-reaktion.'
    },
    {
        videoStart: 77,
        videoEnd: 91,
        videoTimeLabel: '1:17–1:31',
        role: 'lytter',
        title: '5. Video-case (1:17): Dansk idiom for 100 % enighed ("...ud af min mund")',
        situation: 'Du sidder lige og åbner munden for at sige en pointe, og i samme sekund siger din ven nøjagtig den samme sætning! Hvilket billedligt dansk udtryk afslutter hun videoen med ved 1:17?',
        ttsSample: 'Det er som taget ud af min mund!',
        correctIdx: 1,
        variants: [
            { label: '"Hvad hedder det..." (ordsøgning →)', curve: 'M10,22 L90,22', color: '#38bdf8', meaning: 'Holder taleturen åben' },
            { label: '"Det er som taget ud af min mund!" (1:17 ↘)', curve: 'M10,12 Q48,20 90,28', color: '#4ade80', meaning: 'Idiom: "Du sagde præcis de ord, jeg selv var lige ved at sige!"' },
            { label: '"Nå, men jeg må også videre." (opbrud →)', curve: 'M10,22 L50,22 L90,14', color: '#f87171', meaning: 'Afslutter samtalen' }
        ],
        explanation: 'I videoen (1:17) slutter hun af med talemåden "Det er som taget ud af min mund" – et levende udtryk for total enighed.'
    },
    {
        videoStart: 23,
        videoEnd: 91,
        videoTimeLabel: '0:23–1:31',
        role: 'lytter',
        title: '6. Overblik: De to betydninger af småord #7 "lige" i dansk samtale',
        situation: 'I vores vrimlebillede er #7 "lige" et af danskernes mest brugte småord. Hvordan bruges "lige" i videoen ("Lige mine ord!") sammenlignet med "Kan du lige hjælpe mig?"',
        ttsSample: 'Lige mine ord! Kan du lige hjælpe mig?',
        correctIdx: 0,
        variants: [
            { label: '1) Som høflig blødgører ("Kan du lige hjælpe?") • 2) Som "nøjagtig/præcis" i lytter-opbakning ("Lige mine ord!" / "Lige præcis!")', curve: 'M10,10 Q45,18 90,28', color: '#4ade80', meaning: 'Småordet "lige" mestrer både høflig blødgøring og 100 % enighed!' },
            { label: 'At "lige" kun bruges til at afbryde folk uhøfligt', curve: 'M10,10 L90,34', color: '#f87171', meaning: 'Forkert!' },
            { label: 'At "lige" betyder "nej"', curve: 'M10,22 L90,22', color: '#f59e0b', meaning: 'Forkert!' }
        ],
        explanation: 'Nemlig! Småordet "lige" gør både anmodninger bløde ("Jeg henter lige kaffe") og forstærker 100 % enighed som lytter ("Lige mine ord!" / "Lige præcis!").'
    }
];

// =========================================================================
// BANE 5: 3 INTERAKTIVE SAMTALE-SIMULATORER ("HOLD SAMTALEN I LIVE!")
// =========================================================================
const LIVE_CONVERSATIONS = [
    {
        id: 'kaffemaskinen',
        title: '1. Ved kaffemaskinen mandag morgen',
        partner: 'Mette (kollega)',
        scene: 'Mette står ved kaffemaskinen og begynder at fortælle om sin weekend. Hold samtalen varm som lytter – og tag ordet til sidst!',
        turns: [
            {
                partnerLine: 'Mette: "Puha, vi havde den vildeste søndag hjemme hos os i går..."',
                targetRole: 'lytter',
                instruction: 'Trin 1 (Lytter): Vis Mette at du lytter interesseret, så hun fortæller videre!',
                options: [
                    { text: 'Mm-hm? Hvad skete der?', ok: true, feedback: 'Perfekt lytter-signal! Dit "Mm-hm?" åbner døren for hendes historie.' },
                    { text: 'Nå, men jeg skal også til møde nu.', ok: false, feedback: 'Hov! "Nå, men..." lukker samtalen ned, lige før hun overhovedet er gået i gang.' },
                    { text: '(Sig ingenting og kig ned i gulvet)', ok: false, feedback: 'Hvis du er helt tavs, går Mette i stå og tror, du ikke har tid.' }
                ]
            },
            {
                partnerLine: 'Mette: "Jo, vi skulle holde fødselsdag i haven for 15 gæster, og ti minutter før de kom, begyndte det at styrtregne!"',
                targetRole: 'lytter',
                instruction: 'Trin 2 (Lytter): Reagér med empati og overraskelse uden at stjæle historien!',
                options: [
                    { text: 'Nååå nej dog! Virkelig?!', ok: true, feedback: 'Stærkt! Langt "Nååå" viser medfølelse, og "Virkelig?!" giver hende energi til at fortælle slutningen.' },
                    { text: 'Hvad hedder det... regnjakke.', ok: false, feedback: '"Hvad hedder det..." er en taler-lyd til ordsøgning – her er du lytter.' },
                    { text: 'Ja-ja-ja.', ok: false, feedback: 'Et hurtigt "Ja-ja-ja" lyder utålmodigt, som om du er ligeglad med hendes fødselsdag!' }
                ]
            },
            {
                partnerLine: 'Mette: "Heldigvis hjalp alle naboerne med at rykke bordene ind i garagen, så det endte faktisk med at blive den hyggeligste fest!"',
                targetRole: 'lytter',
                instruction: 'Trin 3 (Lytter): Bak op om hendes pointe med varme!',
                options: [
                    { text: 'Aha, nå! Ej hvor godt – nogle gange bliver de uplanlagte fester jo de bedste!', ok: true, feedback: 'Flot! Du kvitterer med "Aha, nå!" og bruger fælles-viden "jo".' },
                    { text: 'Øhm... hvad klok er det?', ok: false, feedback: 'Det ignorerer helt hendes pointe.' },
                    { text: 'Vel?', ok: false, feedback: '"...vel?" kan ikke stå alene som svar på en positiv historie.' }
                ]
            },
            {
                partnerLine: 'Mette: "Ja, præcis! Nå, men nu er kaffen vist klar. Hvordan var din weekend egentlig?"',
                targetRole: 'taler',
                instruction: 'Trin 4 (Taler): Nu gav Mette taleturen til dig! Tag ordet naturligt og aflevér det venligt tilbage til sidst.',
                options: [
                    { text: 'Altså, min weekend var faktisk dejlig stille og rolig. Vi ses til mødet kl. 10, ikke?', ok: true, feedback: 'Topklasse! Du tog ordet med "Altså... faktisk" og afleverede turen med "...ikke?".' },
                    { text: 'Mm-hm.', ok: false, feedback: 'Hun stillede dig et åbent spørgsmål – så nu skal du skifte fra lytter ("Mm-hm") til taler!' },
                    { text: 'Nå!', ok: false, feedback: 'Et kort "Nå!" svarer ikke på, hvordan din weekend var.' }
                ]
            }
        ]
    },
    {
        id: 'toget',
        title: '2. På perronen når toget er forsinket',
        partner: 'Anders (pendler)',
        scene: 'Du står på stationen. Anders ved siden af dig kigger op på skærmen og starter en lille snak.',
        turns: [
            {
                partnerLine: 'Anders: "Toget mod København er da ikke aflyst, vel?"',
                targetRole: 'taler',
                instruction: 'Trin 1 (Taler): Anders spurgte med "ikke... vel?". Du ved, at toget KØRER (det er bare 5 minutter forsinket). Hvordan svarer du?',
                options: [
                    { text: 'Jo, det kører skam! Det er faktisk bare fem minutter forsinket.', ok: true, feedback: 'Helt rigtigt! Efter et negativt spørgsmål bruger du "Jo" + "faktisk" til at berolige ham.' },
                    { text: 'Ja.', ok: false, feedback: 'Et tørt "Ja" efter "Er det ikke aflyst?" gør danskere i tvivl om, hvorvidt det ER aflyst eller ej!' },
                    { text: 'Nååå...', ok: false, feedback: 'Her spørger han dig om hjælp, så du skal tage taleturen.' }
                ]
            },
            {
                partnerLine: 'Anders: "Årh, pyha! Jeg skal nemlig nå en vigtig jobsamtale inde ved Nørreport."',
                targetRole: 'lytter',
                instruction: 'Trin 2 (Lytter): Kvittér for den nye oplysning og vis opbakning!',
                options: [
                    { text: 'Nå! Virkelig? Ej, hvor spændende – held og lykke med den!', ok: true, feedback: 'Super! Kort "Nå!" + "Virkelig?" viser straks ægte interesse for hans nye oplysning.' },
                    { text: 'Hvad hedder det...', ok: false, feedback: 'Du leder ikke efter et ord her – du reagerer som lytter.' },
                    { text: 'Nå, men farvel.', ok: false, feedback: 'I venter stadig på samme tog på perronen!' }
                ]
            },
            {
                partnerLine: 'Anders: "Tusind tak! Man bliver jo altid lidt nervøs lige inden sådan en samtale, ikke?"',
                targetRole: 'lytter',
                instruction: 'Trin 3 (Lytter): Han sluttede med "...ikke?" og søger opbakning. Giv ham 100 % enighed!',
                options: [
                    { text: 'Præcis! Det gør man nemlig altid.', ok: true, feedback: 'Rammer plet! "Præcis!" og "nemlig" giver ham præcis den opbakning, han bad om med "...ikke?".' },
                    { text: 'Øhm... måske.', ok: false, feedback: 'Det giver ingen opbakning til en nervøs medpassager.' },
                    { text: 'Aha.', ok: false, feedback: 'Kun "Aha" er lidt for tørt, når han appellerer med "jo... ikke?".' }
                ]
            },
            {
                partnerLine: 'Anders: "Se, nu kommer toget vist kørende derhenne!"',
                targetRole: 'taler',
                instruction: 'Trin 4 (Taler): Brug et høfligt småord, mens I går hen til døren.',
                options: [
                    { text: 'Ja! Lad os lige gå hen til midtervognen, der er ofte bedst plads.', ok: true, feedback: 'Flot! "Lige" gør dit forslag uformelt og venligt.' },
                    { text: 'Nååå...', ok: false, feedback: 'Langt "Nååå..." passer til en forklaring, ikke til at stige på toget.' },
                    { text: 'Vel?', ok: false, feedback: 'Passer ikke her.' }
                ]
            }
        ]
    },
    {
        id: 'sprogcafe',
        title: '3. I sprogcaféen: Find det rigtige ord i samtalen',
        partner: 'Sofie (frivillig i sprogcaféen)',
        scene: 'Du sidder i sprogcaféen med Sofie. Øv dig i både at holde din taletur, når et ord driller, og give gode lyttesignaler!',
        turns: [
            {
                partnerLine: 'Sofie: "Hvad har du lavet i dag inden sprogcaféen?"',
                targetRole: 'taler',
                instruction: 'Trin 1 (Taler): Du vil fortælle, at du var på borgerservice for at forny dit pas, men du skal lige tænke og finde ordet "borgerservice"!',
                options: [
                    { text: 'Øhm... jeg var nede på, hvad hedder det... Borgerservice for at forny mit pas!', ok: true, feedback: 'Fremragende! Med "Øhm..." og "hvad hedder det..." beholder du taleturen helt naturligt, til ordet kommer.' },
                    { text: 'Mm-hm!', ok: false, feedback: '"Mm-hm" er et lyttesignal – nu er det DIG, der har taleturen!' },
                    { text: 'Nå! Borgerservice.', ok: false, feedback: 'Kort "Nå!" er en lytter-reaktion på ny info.' }
                ]
            },
            {
                partnerLine: 'Sofie: "Ej hvor godt du fik det ordnet! Da jeg skulle forny mit pas sidste år, havde jeg glemt mit gamle pas derhjemme..."',
                targetRole: 'lytter',
                instruction: 'Trin 2 (Lytter): Vis at du følger med og forstår hendes uheld!',
                options: [
                    { text: 'Nååå, hvor ærgerligt! Måtte du så hele vejen hjem igen?', ok: true, feedback: 'Lige i øjet! Det lange "Nååå" viser medfølelse med hendes uheld.' },
                    { text: 'Altså, faktisk...', ok: false, feedback: 'Lad hende fortælle sin lille historie færdig først.' },
                    { text: 'Nå, men vi ses!', ok: false, feedback: 'Afbryder samtalen midt i det hele.' }
                ]
            },
            {
                partnerLine: 'Sofie: "Ja, jeg måtte cykle 6 kilometer hjem og tilbage igen! Men man glemmer det i hvert fald aldrig bagefter."',
                targetRole: 'lytter',
                instruction: 'Trin 3 (Lytter): Bekræft hendes pointe med et varmt lyttersignal!',
                options: [
                    { text: 'Ja, præcis! Så husker man det nemlig næste gang.', ok: true, feedback: 'Perfekt! "Ja, præcis!" + "nemlig" skaber varm kontakt.' },
                    { text: 'Øhm...', ok: false, feedback: 'Virker tøvende i stedet for opbakkende.' },
                    { text: 'Ikke?', ok: false, feedback: '"Ikke?" er en spørgende hale for taleren.' }
                ]
            },
            {
                partnerLine: 'Sofie: "Vi har ti minutter tilbage i caféen i dag – skal vi tage en kop te mere?"',
                targetRole: 'taler',
                instruction: 'Trin 4 (Taler): Tag imod tilbuddet og brug et blødgørende småord!',
                options: [
                    { text: 'Ja tak! Jeg henter lige to kopper til os ved disken.', ok: true, feedback: 'Flot afsluttet! "Lige" får dit tilbud om at hente te til at lyde let og venligt.' },
                    { text: 'Nå.', ok: false, feedback: 'Et fladt "Nå." virker afvisende på et venligt tilbud.' },
                    { text: 'Mm-hm.', ok: false, feedback: 'På et direkte tilbud skal man svare rigtigt, ikke bare brumme "Mm-hm".' }
                ]
            }
        ]
    }
];

// =========================================================================
// BANE 6: 8 "FRA ROBOT-DANSK TIL LEVENDE DANSK"-OPGRADERINGER
// =========================================================================
const ROBOT_UPGRADES = [
    {
        title: '1. Spørge om hjælp på kontoret',
        robotText: 'Robot-dansk: "Hjælp mig med printeren. Den virker ikke."',
        slotsText: 'Levende dansk: "Undskyld, kan du [1] hjælpe mig med printeren? Den virker [2] ikke i dag."',
        slot1Options: ['lige', 'nå', 'mm-hm'],
        slot1Answer: 'lige',
        slot2Options: ['jo', 'vel', 'hvad hedder det'],
        slot2Answer: 'jo',
        explanation: '"Lige" blødgør bønnen, og "jo" (eller "vist") gør konstateringen blødere og mere samarbejdende.'
    },
    {
        title: '2. Når man ikke kan huske et ord i butikken',
        robotText: 'Robot-dansk: "Jeg vil købe en... [stille i 4 sekunder] ... stegepande."',
        slotsText: 'Levende dansk: "[1], jeg leder efter sådan en... [2]... en stegepande!"',
        slot1Options: ['Øhm', 'Nå!', 'Præcis'],
        slot1Answer: 'Øhm',
        slot2Options: ['hvad hedder det', 'ikke?', 'mm-hm'],
        slot2Answer: 'hvad hedder det',
        explanation: 'Med "Øhm..." og "hvad hedder det..." ved ekspedienten hele tiden, at du er i gang med at finde ordet.'
    },
    {
        title: '3. Svare ja til et negativt spørgsmål',
        robotText: 'Robot-dansk: A: "Er du ikke sulten?" — B: "Ja."',
        slotsText: 'Levende dansk: A: "Er du ikke sulten?" — B: "[1], jeg er [2] ret sulten!"',
        slot1Options: ['Jo', 'Ja', 'Nå'],
        slot1Answer: 'Jo',
        slot2Options: ['faktisk', 'vel', 'mm-hm'],
        slot2Answer: 'faktisk',
        explanation: 'Efter "ikke" SKAL man svare "Jo!", og "faktisk" gør svaret levende og naturligt.'
    },
    {
        title: '4. Være en god lytter når nogen forklarer en årsag',
        robotText: 'Robot-dansk: A: "Jeg kom for sent, fordi bussen punkterede." — B: "Okay."',
        slotsText: 'Levende dansk: A: "Jeg kom for sent, fordi bussen punkterede." — B: "[1], det var derfor! [2], hvor uheldigt!"',
        slot1Options: ['Nååå...', 'Nå, men...', 'Øhm...'],
        slot1Answer: 'Nååå...',
        slot2Options: ['Virkelig', 'Ej', 'Vel'],
        slot2Answer: 'Ej',
        explanation: 'Det lange "Nååå..." viser straks, at du forstår sammenhængen og føler med taleren.'
    },
    {
        title: '5. Invitere den anden ind i samtalen',
        robotText: 'Robot-dansk: "Vejret er dejligt i dag. Er du enig?"',
        slotsText: 'Levende dansk: "[1], vejret er da helt fantastisk i dag, [2]"',
        slot1Options: ['Altså', 'Mm-hm', 'Nå!'],
        slot1Answer: 'Altså',
        slot2Options: ['ikke?', 'vel?', 'hvad hedder det'],
        slot2Answer: 'ikke?',
        explanation: '"Altså" åbner taleturen varmt, og "...ikke?" afleverer ordet direkte til lytteren.'
    },
    {
        title: '6. Reagere på en overraskende nyhed',
        robotText: 'Robot-dansk: A: "Jeg har fået nyt job i Aarhus!" — B: "Det er ny information. Tillykke."',
        slotsText: 'Levende dansk: A: "Jeg har fået nyt job i Aarhus!" — B: "[1] [2]?! Kæmpe tillykke!"',
        slot1Options: ['Nå!', 'Nå, men...', 'Øhm...'],
        slot1Answer: 'Nå!',
        slot2Options: ['Virkelig', 'Vel', 'Lige'],
        slot2Answer: 'Virkelig',
        explanation: 'Kort "Nå!" + "Virkelig?!" viser ægte, spontan glæde og overraskelse som lytter.'
    },
    {
        title: '7. Runde en hyggelig snak af',
        robotText: 'Robot-dansk: "Samtalen slutter nu. Jeg går."',
        slotsText: 'Levende dansk: "[1] det var hyggeligt at snakke – jeg må [2] løbe videre til bussen!"',
        slot1Options: ['Nå, men...', 'Nååå...', 'Mm-hm'],
        slot1Answer: 'Nå, men...',
        slot2Options: ['lige', 'vel', 'præcis'],
        slot2Answer: 'lige',
        explanation: '"Nå, men..." signalerer venligt opbrud, og "lige" blødgør det, at du skal videre.'
    },
    {
        title: '8. Vise 100 % enighed i en diskussion',
        robotText: 'Robot-dansk: A: "Det er vigtigt at lytte i en samtale." — B: "Jeg har samme mening."',
        slotsText: 'Levende dansk: A: "Det er vigtigt at lytte i en samtale." — B: "[1]! Det er [2] lige så vigtigt som at tale!"',
        slot1Options: ['Præcis', 'Øhm', 'Nå'],
        slot1Answer: 'Præcis',
        slot2Options: ['nemlig', 'vel', 'hvad hedder det'],
        slot2Answer: 'nemlig',
        explanation: '"Præcis!" og "nemlig" er danskernes varmeste makkerpar til at vise fuld enighed.'
    }
];

// =========================================================================
// BANE 7: 12 SAMTALE-DETEKTIV MISSIONER I VRIMLEBILLEDET
// =========================================================================
const DETECTIVE_MISSIONS = [
    {
        prompt: '1. Find TALEREN længst til venstre, der kigger tænksomt op med en finger ved hagen for at HOLDE ordet i en tænkepause.',
        answerId: 'oehm',
        hint: 'Kig ved kaffebaren helt til venstre (pegefelt #1).'
    },
    {
        prompt: '2. Find LYTTEREN ved kaffebaren, der nikker roligt med lukket mund og kaffekop i hånden ("fortsæt bare!").',
        answerId: 'mmm',
        hint: 'Kig på kvinden til højre for manden ved kaffebaren (pegefelt #9).'
    },
    {
        prompt: '3. Find TALEREN i sofaen, der knipser med fingrene i luften, fordi et bestemt dansk ord lige ligger på tungen.',
        answerId: 'hvad_hedder_det',
        hint: 'Kig i sofa-området til venstre for midten (pegefelt #4).'
    },
    {
        prompt: '4. Find LYTTEREN i lænestolen, der løfter øjenbrynene i frisk overraskelse over en ny oplysning (kort, stigende lyd).',
        answerId: 'naa_kort',
        hint: 'Kig på kvinden i lænestolen midt-venstre (pegefelt #11).'
    },
    {
        prompt: '5. Find LYTTEREN i sofaen med hånden på hjertet, der lige har forstået sammenhængen eller viser varm medfølelse (lang, blød lyd).',
        answerId: 'naaaa_langt',
        hint: 'Kig til venstre i sofaen (pegefelt #12).'
    },
    {
        prompt: '6. Find TALEREN ved rundbordet, der løfter hånden høfligt for at skyde et hurtigt, blødt spørgsmål ind ("Må jeg ... spørge?").',
        answerId: 'lige',
        hint: 'Kig på den stående person ved det runde bord i midten (pegefelt #7).'
    },
    {
        prompt: '7. Find TALEREN ved rundbordet, der rækker begge åbne hænder frem for at AFLEVERE taleturen og søge enighed.',
        answerId: 'ikke_vel',
        hint: 'Kig på den siddende mand ved rundbordet i midten (pegefelt #5).'
    },
    {
        prompt: '8. Find LYTTEREN ved rundbordet, der peger begejstret og viser 100 % enighed med taleren.',
        answerId: 'praecis',
        hint: 'Kig på kvinden til højre ved det runde bord (pegefelt #15).'
    },
    {
        prompt: '9. Find TALEREN ved vinduet, der smiler indforstået og henviser til noget, som begge parter allerede godt ved.',
        answerId: 'jo_taler',
        hint: 'Kig ved vinduesområdet til højre for midten (pegefelt #6).'
    },
    {
        prompt: '10. Find LYTTEREN ved vinduet, der læner sig nysgerrigt frem med store øjne for at opmuntre taleren til at fortælle mere.',
        answerId: 'virkelig',
        hint: 'Kig til højre i vinduesgruppen (pegefelt #14).'
    },
    {
        prompt: '11. Find TALEREN med skuldertasken ved døren, der kigger på sit ur og venligt runder samtalen af eller skifter emne.',
        answerId: 'naa_men',
        hint: 'Kig til højre nær døren (pegefelt #3).'
    },
    {
        prompt: '12. Find TALEREN helt til højre ved bogreolen, der løfter en finger for at tilføje en interessant nuance eller blød korrektion.',
        answerId: 'faktisk',
        hint: 'Kig helt til højre ved reolen (pegefelt #8).'
    }
];

function speakSignal(text, rate = 0.9, pitch = 1.0) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'da-DK';
    u.rate = rate;
    u.pitch = pitch;
    window.speechSynthesis.speak(u);
}

function injectSamtaleSmaaordStyles() {
    if (document.getElementById('samtale-smaaord-styles')) return;
    const style = document.createElement('style');
    style.id = 'samtale-smaaord-styles';
    style.textContent = `
        #app:has(.samtale-smaaord-view) {
            max-width: 1200px;
        }
        .samtale-smaaord-view {
            max-width: 1160px;
            margin: 0 auto;
            padding: 1rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        .ss-hero {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.97) 0%, rgba(30, 41, 59, 0.96) 50%, rgba(14, 116, 144, 0.35) 100%);
            border: 1.5px solid rgba(56, 189, 248, 0.4);
            border-radius: 22px;
            padding: 1.35rem 1.5rem;
            margin-bottom: 1.15rem;
            box-shadow: 0 16px 38px rgba(0, 0, 0, 0.42);
        }
        .ss-hero-kicker {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.28rem 0.85rem;
            border-radius: 999px;
            background: rgba(245, 158, 11, 0.16);
            border: 1px solid rgba(245, 158, 11, 0.5);
            color: #fde68a;
            font-size: 0.76rem;
            font-weight: 900;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 0.55rem;
        }
        .ss-hero h1 {
            margin: 0 0 0.4rem;
            font-size: clamp(1.4rem, 2.5vw, 2.05rem);
            font-weight: 900;
            color: #ffffff;
        }
        .ss-hero p {
            margin: 0 0 0.9rem;
            color: #cbd5e1;
            font-size: 0.96rem;
            line-height: 1.55;
            max-width: 920px;
        }
        .ss-dual-line-banner {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 0.85rem;
        }
        .ss-role-pillar {
            border-radius: 16px;
            padding: 0.85rem 1.05rem;
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }
        .ss-role-pillar.taler {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(15, 23, 42, 0.9));
            border: 1.5px solid rgba(245, 158, 11, 0.65);
        }
        .ss-role-pillar.lytter {
            background: linear-gradient(135deg, rgba(6, 182, 212, 0.18), rgba(15, 23, 42, 0.9));
            border: 1.5px solid rgba(6, 182, 212, 0.65);
        }
        .ss-role-pillar-icon {
            font-size: 1.7rem;
            line-height: 1;
            flex-shrink: 0;
        }
        .ss-role-pillar-title {
            font-weight: 900;
            font-size: 0.95rem;
            margin-bottom: 0.18rem;
        }
        .ss-role-pillar-desc {
            font-size: 0.83rem;
            color: #cbd5e1;
            line-height: 1.42;
        }

        /* Tabs */
        .ss-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-bottom: 1.15rem;
        }
        .ss-tab-btn {
            background: rgba(15, 23, 42, 0.88);
            border: 1.5px solid rgba(148, 163, 184, 0.28);
            color: #cbd5e1;
            padding: 0.58rem 0.95rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.84rem;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .ss-tab-btn:hover {
            border-color: #38bdf8;
            color: #ffffff;
            transform: translateY(-1px);
        }
        .ss-tab-btn.active {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border-color: #7dd3fc;
            color: #ffffff;
            box-shadow: 0 6px 18px rgba(2, 132, 199, 0.35);
        }
        .ss-panel {
            display: none;
        }
        .ss-panel.active {
            display: block;
        }

        .ss-card {
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(148, 163, 184, 0.24);
            border-radius: 20px;
            padding: 1.25rem;
            margin-bottom: 1.15rem;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
        .ss-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.65rem;
            margin-bottom: 0.9rem;
        }
        .ss-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
        }
        .ss-filter-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.32);
            color: #e2e8f0;
            padding: 0.45rem 0.85rem;
            border-radius: 999px;
            font-weight: 800;
            font-size: 0.82rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .ss-filter-btn.active {
            background: rgba(56, 189, 248, 0.24);
            border-color: #38bdf8;
            color: #ffffff;
            box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.22);
        }

        /* Vrimlebillede Stage & Graphic Pointer Fields (Pegefelter) */
        .ss-stage-wrap {
            position: relative;
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            border: 2px solid rgba(148, 163, 184, 0.32);
            background: #090d16;
            margin-bottom: 1rem;
        }
        .ss-stage-inner {
            position: relative;
            width: 100%;
            transform-origin: center center;
            transition: transform 0.25s ease;
        }
        .ss-stage-img {
            width: 100%;
            height: auto;
            display: block;
            user-select: none;
        }
        .ss-pegefelt {
            position: absolute;
            transform: translate(-50%, -100%);
            padding: 0.26rem 0.56rem;
            border-radius: 10px;
            color: #ffffff;
            font-weight: 900;
            font-size: 0.75rem;
            line-height: 1.15;
            white-space: nowrap;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.28rem;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.55);
            transition: transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;
            z-index: 3;
        }
        .ss-pegefelt::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -7px;
            transform: translateX(-50%);
            border-width: 7px 6px 0 6px;
            border-style: solid;
        }
        .ss-pegefelt.dir-up {
            transform: translate(-50%, 0%);
        }
        .ss-pegefelt.dir-up::after {
            bottom: auto;
            top: -7px;
            border-width: 0 6px 7px 6px;
        }
        .ss-pegefelt.role-taler {
            background: linear-gradient(135deg, #d97706, #b45309);
            border: 1.5px solid #fde68a;
        }
        .ss-pegefelt.role-taler::after {
            border-color: #b45309 transparent transparent transparent;
        }
        .ss-pegefelt.role-taler.dir-up::after {
            border-color: transparent transparent #d97706 transparent;
        }
        .ss-pegefelt.role-lytter {
            background: linear-gradient(135deg, #0891b2, #0e7490);
            border: 1.5px solid #a5f3fc;
        }
        .ss-pegefelt.role-lytter::after {
            border-color: #0e7490 transparent transparent transparent;
        }
        .ss-pegefelt.role-lytter.dir-up::after {
            border-color: transparent transparent #0891b2 transparent;
        }
        .ss-pegefelt:hover {
            transform: translate(-50%, -106%) scale(1.07);
            z-index: 10;
        }
        .ss-pegefelt.dir-up:hover {
            transform: translate(-50%, 4%) scale(1.07);
        }
        .ss-pegefelt.active {
            box-shadow: 0 0 0 3px #ffffff, 0 8px 22px rgba(0, 0, 0, 0.75);
            transform: translate(-50%, -106%) scale(1.1);
            z-index: 12;
        }
        .ss-pegefelt.dir-up.active {
            transform: translate(-50%, 4%) scale(1.1);
        }
        .ss-pegefelt.compact-mode {
            padding: 0.24rem 0.45rem;
            border-radius: 999px;
            font-size: 0.74rem;
        }
        .ss-pegefelt.hidden-pin {
            opacity: 0.14;
            pointer-events: none;
        }
        .ss-pegefelt-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 18px;
            height: 18px;
            padding: 0 4px;
            border-radius: 999px;
            background: rgba(0, 0, 0, 0.35);
            font-size: 0.68rem;
            font-weight: 900;
        }

        /* Detail inspector under vrimlebillede */
        .ss-detail-box {
            border-radius: 16px;
            padding: 1.1rem 1.25rem;
            background: rgba(9, 14, 26, 0.92);
            border: 1.5px solid rgba(148, 163, 184, 0.3);
        }
        .ss-pill-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.25rem 0.7rem;
            border-radius: 999px;
            font-size: 0.76rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .ss-btn-primary {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: 1px solid #7dd3fc;
            color: #ffffff;
            padding: 0.55rem 1.05rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.86rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .ss-btn-primary:hover {
            filter: brightness(1.1);
        }
        .ss-btn-secondary {
            background: rgba(30, 41, 59, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.35);
            color: #e2e8f0;
            padding: 0.5rem 0.95rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.83rem;
            cursor: pointer;
        }
        .ss-btn-secondary:hover {
            border-color: #fde68a;
            color: #ffffff;
        }

        /* Grid & Options */
        .ss-two-cols {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
            gap: 0.95rem;
        }
        .ss-option-btn {
            width: 100%;
            text-align: left;
            background: rgba(30, 41, 59, 0.82);
            border: 1.5px solid rgba(148, 163, 184, 0.3);
            color: #f8fafc;
            padding: 0.75rem 1rem;
            border-radius: 13px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.15s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.6rem;
        }
        .ss-option-btn:hover:not(:disabled) {
            border-color: #38bdf8;
            background: rgba(56, 189, 248, 0.14);
        }
        .ss-option-btn.correct {
            background: rgba(34, 197, 94, 0.22);
            border-color: #4ade80;
            color: #bbf7d0;
        }
        .ss-option-btn.wrong {
            background: rgba(239, 68, 68, 0.2);
            border-color: #f87171;
            color: #fecaca;
        }
        .ss-feedback {
            margin-top: 0.8rem;
            padding: 0.8rem 1rem;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 700;
            line-height: 1.5;
        }
        .ss-feedback.ok {
            background: rgba(34, 197, 94, 0.16);
            border: 1.5px solid rgba(74, 222, 128, 0.55);
            color: #bbf7d0;
        }
        .ss-feedback.err {
            background: rgba(239, 68, 68, 0.16);
            border: 1.5px solid rgba(248, 113, 113, 0.55);
            color: #fecaca;
        }

        @media (max-width: 720px) {
            .ss-pegefelt {
                padding: 0.18rem 0.38rem;
                font-size: 0.64rem;
            }
            .ss-pegefelt-label {
                display: none;
            }
            .ss-pegefelt.show-mobile-label .ss-pegefelt-label {
                display: inline;
            }
            .ss-card {
                padding: 0.95rem;
            }
        }
    `;
    document.head.appendChild(style);
}

export function renderSamtaleSmaaordView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    injectSamtaleSmaaordStyles();

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container samtale-smaaord-view';

    // Top bar med Tilbage + hurtig genvej til søster-fladen "Små LYDE"
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.flexWrap = 'wrap';
    topBar.style.gap = '0.5rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '←' + (getTranslation('back') || 'Tilbage til Samtaletræning');
    backBtn.onclick = () => navigateFn('samtale_traening');
    topBar.appendChild(backBtn);

    const sisterWrap = document.createElement('div');
    sisterWrap.style.display = 'flex';
    sisterWrap.style.flexWrap = 'wrap';
    sisterWrap.style.gap = '0.45rem';

    const sisterBtn = document.createElement('button');
    sisterBtn.type = 'button';
    sisterBtn.className = 'ss-btn-secondary';
    sisterBtn.innerHTML = 'Små lyde →';
    sisterBtn.onclick = () => navigateFn('samtale_smaalyde');
    sisterWrap.appendChild(sisterBtn);

    const politeBtn = document.createElement('button');
    politeBtn.type = 'button';
    politeBtn.className = 'ss-btn-secondary';
    politeBtn.innerHTML = 'Høflighed →';
    politeBtn.onclick = () => navigateFn('samtale_hoeflighed');
    sisterWrap.appendChild(politeBtn);

    topBar.appendChild(sisterWrap);

    viewContainer.appendChild(topBar);

    // Kompakt Hero — ingen gentagelse af ordlister eller rolle-søjler
    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.style.padding = '1rem 1.35rem';
    hero.innerHTML = `
        <h1 style="margin:0 0 0.25rem; font-size:clamp(1.35rem, 2.4vw, 1.85rem); font-weight:900; text-align:left;">Små ord i dansk samtale</h1>
        <p style="margin:0; font-size:0.92rem; line-height:1.45;">
            15 samtalemarkører til at styre taleturen og vise aktiv lytning.
        </p>
    `;
    viewContainer.appendChild(hero);

    const tabs = [
        { id:'tab_vrimmel', label:'1. Vrimlebillede (15)' },
        { id:'tab_vaelg', label:'2. Vælg småord (15)' },
        { id:'tab_duel', label:'3. Taler eller lytter? ' },
        { id:'tab_tonefald', label:'4. Video: "Nå"' },
        { id:'tab_jajo_video', label:'5. Video: Ja / Jo / Nej' },
        { id:'tab_enig_video', label:'6. Video: Enighed' },
        { id:'tab_live', label:'7. Hold samtalen i live' },
        { id:'tab_robot', label:'8. Robot → Levende' },
        { id:'tab_detektiv', label:'9. Detektiv' }
    ];

    let currentTab = extraData?.subPath && tabs.some(t => t.id === extraData.subPath)
        ? extraData.subPath
        :'tab_vrimmel';

    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'ss-tabs';
    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `ss-tab-btn ${t.id === currentTab ? 'active' :''}`;
        btn.dataset.tab = t.id;
        btn.textContent = t.label;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang() || 'da';
        history.pushState(null, '', `#/${lang}/samtale_smaaord/${tabId}`);
        tabsMenu.querySelectorAll('.ss-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.ss-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    function makePanel(id) {
        const p = document.createElement('div');
        p.className = `ss-panel ${currentTab === id ? 'active' :''}`;
        p.dataset.panel = id;
        return p;
    }

    // =========================================================================
    // FANE 1: VRIMLEBILLEDE MED 15 PEGEFELTER + VALGFRI ROLLE-SORTERING
    // =========================================================================
    const panel1 = makePanel('tab_vrimmel');
    let activeRoleFilter = 'alle';
    let selectedSignal = SAMTALE_SIGNALS[0];
    let compactPins = false;
    let zoomed = false;
    let showSortDrill = false;

    const card1 = document.createElement('div');
    card1.className = 'ss-card';
    card1.innerHTML = `
        <div class="ss-toolbar">
            <div class="ss-filters">
                <button type="button" class="ss-filter-btn active" data-rfilter="alle">Alle (15)</button>
                <button type="button" class="ss-filter-btn" data-rfilter="taler" style="border-color:rgba(245,158,11,0.65); color:#fde68a;">${samtaleRoleIcon('taler', 14)} Taler (8)</button>
                <button type="button" class="ss-filter-btn" data-rfilter="lytter" style="border-color:rgba(6,182,212,0.65); color:#67e8f9;">${samtaleRoleIcon('lytter', 14)} Lytter (7)</button>
            </div>
            <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                <button type="button" class="ss-btn-secondary" id="ss-toggle-pinmode">Kun tal</button>
                <button type="button" class="ss-btn-secondary" id="ss-zoom-btn">Zoom 135%</button>
            </div>
        </div>

        <div class="ss-stage-wrap">
            <div class="ss-stage-inner" id="ss-stage-inner">
                <img src="assets/samtale_smaaord_vrimmel.jpg" alt="Samtaletræning vrimlebillede med 15 pegefelter" class="ss-stage-img" />
                <div id="ss-pegefelter-layer"></div>
            </div>
        </div>

        <div class="ss-detail-box" id="ss-detail-box"></div>
    `;

    const pegefelterLayer = card1.querySelector('#ss-pegefelter-layer');
    const detailBox = card1.querySelector('#ss-detail-box');
    const stageInner = card1.querySelector('#ss-stage-inner');

    card1.querySelector('#ss-zoom-btn').onclick = (e) => {
        zoomed = !zoomed;
        stageInner.style.transform = zoomed ? 'scale(1.35)' :'scale(1)';
        e.currentTarget.textContent = zoomed ? 'Zoom 100%' :'Zoom 135%';
    };

    card1.querySelector('#ss-toggle-pinmode').onclick = (e) => {
        compactPins = !compactPins;
        e.currentTarget.textContent = compactPins ? 'Vis ord' :'Kun tal';
        renderPegefelter();
    };

    function renderSignalDetail(sig) {
        const meta = ROLE_META[sig.role];
        detailBox.style.borderColor = meta.border;
        detailBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.55rem;">
                <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
                    <span style="font-size:1.3rem; font-weight:900; color:#ffffff;">#${sig.num}. ${sig.word}</span>
                    <span class="ss-pill-tag" style="background:${meta.bg}; color:${meta.color}; border:1.5px solid ${meta.border};">
                        ${samtaleRoleIcon(sig.role, 13)} ${meta.short}
                    </span>
                </div>
                <button type="button" class="ss-btn-primary" id="ss-play-detail-audio" style="display:inline-flex; align-items:center; gap:0.4rem;">
                    ${samtaleIcons.audio(15)} Lyt
                </button>
            </div>

            <div style="font-size:0.95rem; color:#f1f5f9; font-weight:700; margin-bottom:0.3rem;">
                ${sig.turnAction}
            </div>
            <div style="font-size:0.83rem; color:#94a3b8; margin-bottom:0.65rem;">
                <strong>Tonefald:</strong> ${sig.intonation}
            </div>

            <p style="margin:0 0 0.7rem; color:#e2e8f0; font-size:0.92rem; line-height:1.5;">
                ${sig.definition}
            </p>

            <div style="background:rgba(15,23,42,0.95); border-left:4px solid ${meta.color}; border-radius:12px; padding:0.7rem 0.95rem; margin-bottom:0.6rem;">
                <div style="font-size:0.9rem; color:#cbd5e1; margin-bottom:0.2rem;">A: "${sig.dialogueA}"</div>
                <div style="font-size:0.93rem; color:#ffffff; font-weight:700;">B (${meta.label}): "${sig.dialogueB}"</div>
            </div>

            <div style="font-size:0.83rem; color:#fca5a5; background:rgba(239,68,68,0.09); border:1px solid rgba(239,68,68,0.28); border-radius:10px; padding:0.48rem 0.8rem;">
                <strong>Pas på:</strong> ${sig.trapTip}
            </div>
        `;
        const playBtn = detailBox.querySelector('#ss-play-detail-audio');
        if (playBtn) {
            playBtn.onclick = () => speakSignal(sig.ttsText, sig.ttsRate, sig.ttsPitch);
        }
    }

    function renderPegefelter() {
        pegefelterLayer.innerHTML = '';
        SAMTALE_SIGNALS.forEach(sig => {
            const isHidden = activeRoleFilter !== 'alle' && sig.role !== activeRoleFilter;
            const isSelected = sig.id === selectedSignal.id;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `ss-pegefelt role-${sig.role} ${sig.pointerDir === 'up' ? 'dir-up' :''} ${isSelected ? 'active show-mobile-label' :''} ${compactPins ? 'compact-mode' :''} ${isHidden ? 'hidden-pin' :''}`;
            btn.style.left = `${sig.x}%`;
            btn.style.top = `${sig.y}%`;
            btn.dataset.sigId = sig.id;
            btn.title = `#${sig.num} ${sig.word} (${ROLE_META[sig.role].short})`;
            const rIcon = samtaleRoleIcon(sig.role, 12);
            btn.innerHTML = compactPins
                ? `${rIcon}<span>${sig.num}</span>`
                : `<span class="ss-pegefelt-num">${sig.num}</span>${rIcon}<span class="ss-pegefelt-label">${sig.shortLabel}</span>`;
            btn.onclick = () => {
                selectedSignal = sig;
                renderSignalDetail(sig);
                renderPegefelter();
            };
            pegefelterLayer.appendChild(btn);
        });
    }

    card1.querySelectorAll('.ss-filter-btn').forEach(btn => {
        btn.onclick = () => {
            activeRoleFilter = btn.dataset.rfilter;
            card1.querySelectorAll('.ss-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPegefelter();
        };
    });

    renderSignalDetail(selectedSignal);
    renderPegefelter();
    panel1.appendChild(card1);

    // Valgfri Taler vs. Lytter sorteringsbane (sammenklappet som standard)
    const sortCard = document.createElement('div');
    sortCard.className = 'ss-card';
    const sortPool = shuffleArray([...SAMTALE_SIGNALS]);
    const sortedBuckets = { taler: [], lytter: [] };
    let activeSortIdx = 0;
    let sortFeedback = '';

    function renderRoleSorting() {
        const placedSet = new Set([...sortedBuckets.taler, ...sortedBuckets.lytter]);
        if (placedSet.has(activeSortIdx)) {
            activeSortIdx = sortPool.findIndex((_, i) => !placedSet.has(i));
        }
        const activeItem = activeSortIdx >= 0 ? sortPool[activeSortIdx] : null;

        if (!showSortDrill) {
            sortCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
                    <div style="font-size:0.96rem; font-weight:800; color:#e2e8f0;">
                        Sorteringsøvelse: Placér de 15 småord i Taler eller Lytter (${placedSet.size}/${sortPool.length})
                    </div>
                    <button type="button" class="ss-btn-secondary" id="ss-sort-toggle">Åbn øvelse</button>
                </div>
            `;
            sortCard.querySelector('#ss-sort-toggle').onclick = () => {
                showSortDrill = true;
                renderRoleSorting();
            };
            return;
        }

        sortCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <h3 style="margin:0; font-size:1.05rem; font-weight:900;">Sortér efter rolle (${placedSet.size}/${sortPool.length})</h3>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="ss-btn-secondary" id="ss-sort-reset">Nulstil</button>
                    <button type="button" class="ss-btn-secondary" id="ss-sort-toggle">Skjul</button>
                </div>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:0.4rem; padding:0.75rem; border-radius:14px; background:rgba(9,14,26,0.85); border:1px solid rgba(148,163,184,0.22); margin-bottom:0.75rem;">
                ${sortPool.map((item, idx) => {
                    const isPlaced = placedSet.has(idx);
                    const isActive = idx === activeSortIdx;
                    return `
                        <button type="button" class="ss-btn-secondary" data-sort-item="${idx}" ${isPlaced ? 'disabled' :''} style="${isPlaced ? 'opacity:0.32; text-decoration:line-through;' :''}${isActive ? 'background:#f59e0b; color:#0f172a; border-color:#fef08a; font-weight:900;' :''}">
                            ${item.word}
                        </button>
                    `;
                }).join('')}
            </div>

            ${activeItem ? `
                <div style="margin-bottom:0.75rem; padding:0.6rem 0.9rem; border-radius:12px; background:rgba(56,189,248,0.12); border:1px solid #38bdf8; font-size:0.9rem;">
                    <strong style="color:#ffffff;">${activeItem.word}</strong>
                    <span style="color:#cbd5e1;"> — ${activeItem.turnAction}</span>
                </div>
            ` : `
                <div class="ss-feedback ok" style="margin-bottom:0.75rem;">
                    Flot! Alle 15 småord er sorteret.
                </div>
            `}

            <div class="ss-two-cols">
                ${['taler', 'lytter'].map(roleKey => {
                    const m = ROLE_META[roleKey];
                    const items = sortedBuckets[roleKey].map(i => sortPool[i]);
                    return `
                        <button type="button" data-sort-bucket="${roleKey}" style="text-align:left; padding:0.85rem; border-radius:14px; background:${m.bg}; border:2px dashed ${m.border}; color:#ffffff; cursor:pointer;">
                            <div style="font-size:0.94rem; font-weight:900; color:${m.color}; margin-bottom:0.45rem; display:flex; align-items:center; gap:0.35rem;">
                                ${samtaleRoleIcon(roleKey, 14)} ${m.short} (${items.length}/${roleKey === 'taler' ? 8 : 7})
                            </div>
                            <div style="display:flex; flex-wrap:wrap; gap:0.3rem;">
                                ${items.length
                                    ? items.map(it => `<span style="padding:0.18rem 0.48rem; border-radius:999px; background:rgba(15,23,42,0.85); border:1px solid ${m.border}; font-size:0.76rem; font-weight:800;">${it.shortLabel}</span>`).join('')
                                    : `<span style="font-size:0.8rem; color:#94a3b8;">Klik for at placere</span>`}
                            </div>
                        </button>
                    `;
                }).join('')}
            </div>
            ${sortFeedback ? `<div class="ss-feedback ${sortFeedback.startsWith('✓') ? 'ok' :'err'}">${sortFeedback}</div>` :''}
        `;

        sortCard.querySelector('#ss-sort-toggle').onclick = () => {
            showSortDrill = false;
            renderRoleSorting();
        };
        sortCard.querySelector('#ss-sort-reset').onclick = () => {
            sortedBuckets.taler = [];
            sortedBuckets.lytter = [];
            activeSortIdx = 0;
            sortFeedback = '';
            renderRoleSorting();
        };

        sortCard.querySelectorAll('[data-sort-item]').forEach(btn => {
            btn.onclick = () => {
                activeSortIdx = Number(btn.dataset.sortItem);
                sortFeedback = '';
                renderRoleSorting();
            };
        });

        sortCard.querySelectorAll('[data-sort-bucket]').forEach(bucketBtn => {
            bucketBtn.onclick = () => {
                if (activeSortIdx < 0) return;
                const targetRole = bucketBtn.dataset.sortBucket;
                const item = sortPool[activeSortIdx];
                if (item.role === targetRole) {
                    sortedBuckets[targetRole].push(activeSortIdx);
                    sortFeedback = `✓ Rigtigt! "${item.word}" er ${ROLE_META[targetRole].label}.`;
                } else {
                    sortFeedback = `✗ Ikke helt – "${item.word}" bruges primært som ${ROLE_META[item.role].label}.`;
                }
                renderRoleSorting();
            };
        });
    }

    renderRoleSorting();
    panel1.appendChild(sortCard);
    panelsHolder.appendChild(panel1);

    // =========================================================================
    // FANE 2: VÆLG DET RIGTIGE ELEMENT (15 DIALOG-SITUATIONER)
    // =========================================================================
    const panel2 = makePanel('tab_vaelg');
    let chooseIdx = 0;
    let chooseScore = 0;
    let chooseAnswered = null;
    const chooseSolved = new Set();

    const card2 = document.createElement('div');
    card2.className = 'ss-card';

    function renderChooseTrack() {
        const q = CHOOSE_EXERCISES[chooseIdx];
        const meta = ROLE_META[q.role];
        const sigMap = Object.fromEntries(SAMTALE_SIGNALS.map(s => [s.id, s]));

        card2.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                    <span class="ss-pill-tag" style="background:${meta.bg}; color:${meta.color}; border:1.5px solid ${meta.border};">
                        ${samtaleRoleIcon(q.role, 13)} ${meta.short}
                    </span>
                    <span style="font-size:0.85rem; color:#94a3b8; font-weight:800;">
                        Opgave ${chooseIdx + 1}/${CHOOSE_EXERCISES.length} • Score: ${chooseScore}/${CHOOSE_EXERCISES.length}
                    </span>
                </div>
                <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                    <button type="button" class="ss-btn-secondary" id="ss-choose-prev" ${chooseIdx === 0 ? 'disabled' :''}>← Forrige</button>
                    <button type="button" class="ss-btn-secondary" id="ss-choose-next" ${chooseIdx === CHOOSE_EXERCISES.length - 1 ? 'disabled' :''}>Næste →</button>
                </div>
            </div>

            <div style="font-size:0.9rem; color:#fde68a; background:rgba(245,158,11,0.09); border:1px solid rgba(245,158,11,0.28); border-radius:12px; padding:0.7rem 0.95rem; margin-bottom:0.85rem;">
                <strong>Situation:</strong> ${q.context}
            </div>

            <div style="background:rgba(9,14,26,0.92); border-left:4px solid ${meta.color}; border-radius:14px; padding:0.95rem 1.1rem; margin-bottom:0.95rem;">
                <div style="font-size:0.96rem; color:#cbd5e1; margin-bottom:0.45rem;">${q.speakerA}</div>
                <div style="font-size:1.08rem; font-weight:900; color:#ffffff;">${q.speakerB}</div>
            </div>

            <div class="ss-two-cols">
                ${q.options.map(optId => {
                    const s = sigMap[optId];
                    let cls = '';
                    if (chooseAnswered) {
                        if (optId === q.answerId) cls = 'correct';
                        else if (optId === chooseAnswered) cls = 'wrong';
                    }
                    return `
                        <button type="button" class="ss-option-btn ${cls}" data-choose-opt="${optId}">
                            <strong>${s.word}</strong>
                        </button>
                    `;
                }).join('')}
            </div>

            ${chooseAnswered ? `
                <div class="ss-feedback ${chooseAnswered === q.answerId ? 'ok' :'err'}">
                    <div>${chooseAnswered === q.answerId ? '✓ Rigtigt!' : `✗ Bedste valg: "${sigMap[q.answerId].word}".`} ${q.explanation}</div>
                    <div style="margin-top:0.55rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <button type="button" class="ss-btn-primary" id="ss-choose-audio" style="display:inline-flex; align-items:center; gap:0.35rem;">${samtaleIcons.audio(14)} Lyt</button>
                        ${chooseIdx < CHOOSE_EXERCISES.length - 1 ? `<button type="button" class="ss-btn-secondary" id="ss-choose-advance">Næste →</button>` :''}
                    </div>
                </div>
            ` :''}
        `;

        card2.querySelector('#ss-choose-prev').onclick = () => {
            if (chooseIdx > 0) { chooseIdx--; chooseAnswered = null; renderChooseTrack(); }
        };
        card2.querySelector('#ss-choose-next').onclick = () => {
            if (chooseIdx < CHOOSE_EXERCISES.length - 1) { chooseIdx++; chooseAnswered = null; renderChooseTrack(); }
        };
        card2.querySelectorAll('[data-choose-opt]').forEach(btn => {
            btn.onclick = () => {
                const picked = btn.dataset.chooseOpt;
                chooseAnswered = picked;
                if (picked === q.answerId && !chooseSolved.has(chooseIdx)) {
                    chooseSolved.add(chooseIdx);
                    chooseScore++;
                }
                renderChooseTrack();
            };
        });
        const audioBtn = card2.querySelector('#ss-choose-audio');
        if (audioBtn) {
            const ansSig = sigMap[q.answerId];
            audioBtn.onclick = () => speakSignal(ansSig.ttsText, ansSig.ttsRate, ansSig.ttsPitch);
        }
        const advBtn = card2.querySelector('#ss-choose-advance');
        if (advBtn) {
            advBtn.onclick = () => { chooseIdx++; chooseAnswered = null; renderChooseTrack(); };
        }
    }

    renderChooseTrack();
    panel2.appendChild(card2);
    panelsHolder.appendChild(panel2);

    // =========================================================================
    // FANE 3: TALER ELLER LYTTER? (12 TURTAGNINGS-DUELLER)
    // =========================================================================
    const panel3 = makePanel('tab_duel');
    let duelIdx = 0;
    let duelScore = 0;
    let duelPicked = null;
    const duelSolved = new Set();

    const card3 = document.createElement('div');
    card3.className = 'ss-card';

    function renderDuelTrack() {
        const d = TURN_DUELS[duelIdx];
        card3.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                <div>
                    <h3 style="margin:0; font-size:1.1rem; font-weight:900;">Taler eller lytter?</h3>
                    <div style="font-size:0.84rem; color:#94a3b8;">Duel ${duelIdx + 1}/${TURN_DUELS.length} • Rigtige: ${duelScore}/${TURN_DUELS.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="ss-btn-secondary" id="ss-duel-prev" ${duelIdx === 0 ? 'disabled' :''}>← Forrige</button>
                    <button type="button" class="ss-btn-secondary" id="ss-duel-next" ${duelIdx === TURN_DUELS.length - 1 ? 'disabled' :''}>Næste →</button>
                </div>
            </div>

            <div style="background:rgba(9,14,26,0.92); border:1.5px solid rgba(56,189,248,0.35); border-radius:16px; padding:1rem 1.15rem; margin-bottom:0.95rem;">
                <div style="font-size:0.78rem; font-weight:900; color:#fde68a; text-transform:uppercase; margin-bottom:0.25rem;">
                    Fokus: ${d.signal}
                </div>
                <div style="font-size:1.12rem; font-weight:900; color:#ffffff; line-height:1.45;">
                    ${d.quote}
                </div>
            </div>

            <div class="ss-two-cols">
                ${DUEL_CHOICES.map(ch => {
                    const m = ROLE_META[ch.role];
                    let cls = '';
                    if (duelPicked) {
                        if (ch.id === d.correctAction) cls = 'correct';
                        else if (ch.id === duelPicked) cls = 'wrong';
                    }
                    return `
                        <button type="button" class="ss-option-btn ${cls}" data-duel-opt="${ch.id}">
                            <span style="display:inline-flex; align-items:center; gap:0.5rem;">
                                <span style="color:${m.color};">${samtaleRoleIcon(ch.role, 16)}</span>
                                <span>${ch.label}</span>
                            </span>
                        </button>
                    `;
                }).join('')}
            </div>

            ${duelPicked ? `
                <div class="ss-feedback ${duelPicked === d.correctAction ? 'ok' :'err'}">
                    <div>${duelPicked === d.correctAction ? '✓ Præcis!' :'✗ Se på funktionen i samtalen:'} ${d.explanation}</div>
                    ${duelIdx < TURN_DUELS.length - 1 ? `<button type="button" class="ss-btn-secondary" id="ss-duel-adv" style="margin-top:0.55rem;">Næste →</button>` :''}
                </div>
            ` :''}
        `;

        card3.querySelector('#ss-duel-prev').onclick = () => {
            if (duelIdx > 0) { duelIdx--; duelPicked = null; renderDuelTrack(); }
        };
        card3.querySelector('#ss-duel-next').onclick = () => {
            if (duelIdx < TURN_DUELS.length - 1) { duelIdx++; duelPicked = null; renderDuelTrack(); }
        };
        card3.querySelectorAll('[data-duel-opt]').forEach(btn => {
            btn.onclick = () => {
                duelPicked = btn.dataset.duelOpt;
                if (duelPicked === d.correctAction && !duelSolved.has(duelIdx)) {
                    duelSolved.add(duelIdx);
                    duelScore++;
                }
                renderDuelTrack();
            };
        });
        const advBtn = card3.querySelector('#ss-duel-adv');
        if (advBtn) {
            advBtn.onclick = () => { duelIdx++; duelPicked = null; renderDuelTrack(); };
        }
    }

    renderDuelTrack();
    panel3.appendChild(card3);
    panelsHolder.appendChild(panel3);

    // =========================================================================
    // FANE 4: TONEFALDS-LABORATORIET + YOUTUBE-VIDEO & ANALYSE OM "NÅ… PÅ DANSK"
    // =========================================================================
    const panel4 = makePanel('tab_tonefald');
    let activeNaaVariant = NAA_VIDEO_VARIANTS[0];
    let labFilter = 'naa_video';
    let labIdx = 0;
    let labPicked = null;

    // 1. Videokort med YouTube-embed + interaktiv oversigt over de 10 "Nå"-betydninger fra videoen
    const videoCard4 = document.createElement('div');
    videoCard4.className = 'ss-card';
    videoCard4.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.85rem;">
            <h3 style="margin:0; font-size:1.18rem; font-weight:900; color:#ffffff;">
                "Nå… på dansk" — 10 betydninger
            </h3>
            <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                <button type="button" class="ss-btn-secondary" id="ss-naa-play-start" style="display:inline-flex; align-items:center; gap:0.35rem;">
                    ${samtaleIcons.play(12)} Fra start
                </button>
                <a href="https://youtu.be/${NAA_YOUTUBE_ID}" target="_blank" rel="noopener noreferrer" class="ss-btn-secondary" style="text-decoration:none;">
                    YouTube ↗
                </a>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:1rem; align-items:start;">
            <div style="background:rgba(9,14,26,0.94); border:1.5px solid rgba(56,189,248,0.35); border-radius:16px; overflow:hidden;">
                <div style="position:relative; width:100%; aspect-ratio:16/9; background:#020617;">
                    <iframe
                        id="ss-naa-yt-iframe"
                        src="https://www.youtube.com/embed/${NAA_YOUTUBE_ID}?rel=0"
                        title="Nå… på dansk (YouTube)"
                        style="position:absolute; inset:0; width:100%; height:100%; border:0;"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
                <div id="ss-naa-active-detail" style="padding:0.85rem 1rem;"></div>
            </div>

            <div style="background:rgba(9,14,26,0.9); border:1px solid rgba(148,163,184,0.22); border-radius:16px; padding:0.8rem;">
                <div id="ss-naa-variants-list" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:0.45rem;"></div>
            </div>
        </div>
    `;

    const ytIframe = videoCard4.querySelector('#ss-naa-yt-iframe');
    const activeNaaDetailBox = videoCard4.querySelector('#ss-naa-active-detail');
    const variantsListBox = videoCard4.querySelector('#ss-naa-variants-list');

    function jumpToVideoTimestamp(startSec, endSec) {
        const endParam = endSec ? `&end=${endSec}` :'';
        ytIframe.src = `https://www.youtube.com/embed/${NAA_YOUTUBE_ID}?start=${startSec}${endParam}&autoplay=1&rel=0`;
    }

    function renderNaaVideoDashboard() {
        const meta = ROLE_META[activeNaaVariant.role];
        activeNaaDetailBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.45rem;">
                <span class="ss-pill-tag" style="background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.border};">
                    ${samtaleRoleIcon(activeNaaVariant.role, 12)} ${meta.short}
                </span>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="ss-btn-primary" id="ss-naa-jump-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.play(12)} Klip (${activeNaaVariant.timeLabel})
                    </button>
                    <button type="button" class="ss-btn-secondary" id="ss-naa-tts-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.audio(13)} Lyt
                    </button>
                </div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.65rem; margin-bottom:0.35rem;">
                <div style="font-size:0.98rem; font-weight:900; color:#fde68a;">${activeNaaVariant.quoteFromVideo}</div>
                <svg width="88" height="34" viewBox="0 0 100 38" style="background:rgba(15,23,42,0.9); border-radius:8px; border:1px solid rgba(148,163,184,0.28); flex-shrink:0;">
                    <path d="${activeNaaVariant.curve}" fill="none" stroke="${activeNaaVariant.color}" stroke-width="3.2" stroke-linecap="round"/>
                </svg>
            </div>
            <div style="font-size:0.84rem; color:#cbd5e1; line-height:1.45;">
                ${activeNaaVariant.meaning}
            </div>
        `;

        activeNaaDetailBox.querySelector('#ss-naa-jump-clip').onclick = () => {
            jumpToVideoTimestamp(activeNaaVariant.startSec, activeNaaVariant.endSec);
        };
        activeNaaDetailBox.querySelector('#ss-naa-tts-clip').onclick = () => {
            speakSignal(activeNaaVariant.ttsSample, 0.88, 1.04);
        };

        variantsListBox.innerHTML = NAA_VIDEO_VARIANTS.map(v => {
            const vMeta = ROLE_META[v.role];
            const isSel = v.id === activeNaaVariant.id;
            return `
                <button type="button" data-naa-vid="${v.id}" style="text-align:left; padding:0.5rem 0.68rem; border-radius:11px; background:${isSel ? 'rgba(56,189,248,0.18)' :'rgba(15,23,42,0.85)'}; border:1.5px solid ${isSel ? '#38bdf8' : vMeta.border}; color:#ffffff; cursor:pointer; display:flex; flex-direction:column; gap:0.2rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.35rem;">
                        <span style="font-size:0.83rem; font-weight:900; color:#ffffff;">${v.label}</span>
                        <span style="font-size:0.69rem; font-weight:900; padding:0.1rem 0.4rem; border-radius:999px; background:${vMeta.bg}; color:${vMeta.color}; display:inline-flex; align-items:center; gap:0.22rem;">${samtaleRoleIcon(v.role, 11)} ${v.timeLabel}</span>
                    </div>
                    <div style="font-size:0.74rem; color:#94a3b8; line-height:1.3;">${v.badgeText.split('= ')[1] ? v.badgeText.split('= ')[1].trim() : v.meaning}</div>
                </button>
            `;
        }).join('');

        variantsListBox.querySelectorAll('[data-naa-vid]').forEach(btn => {
            btn.onclick = () => {
                const found = NAA_VIDEO_VARIANTS.find(x => x.id === btn.dataset.naaVid);
                if (found) {
                    activeNaaVariant = found;
                    renderNaaVideoDashboard();
                    jumpToVideoTimestamp(found.startSec, found.endSec);
                }
            };
        });
    }

    videoCard4.querySelector('#ss-naa-play-start').onclick = () => {
        jumpToVideoTimestamp(0, null);
    };

    renderNaaVideoDashboard();
    panel4.appendChild(videoCard4);

    // 2. Øvelseskort: Tonefalds-laboratoriet
    const card4 = document.createElement('div');
    card4.className = 'ss-card';

    function getFilteredLabItems() {
        if (labFilter === 'naa_video') return INTONATION_LAB_ITEMS.filter(x => x.isNaaVideo);
        if (labFilter === 'other') return INTONATION_LAB_ITEMS.filter(x => !x.isNaaVideo);
        return INTONATION_LAB_ITEMS;
    }

    function renderLabTrack() {
        const list = getFilteredLabItems();
        if (labIdx >= list.length) labIdx = 0;
        const item = list[labIdx];
        const roleMeta = ROLE_META[item.role || 'lytter'];

        card4.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.7rem;">
                <div>
                    <h3 style="margin:0; font-size:1.08rem; font-weight:900;">Tonefalds-øvelser</h3>
                    <div style="font-size:0.83rem; color:#94a3b8;">Opgave ${labIdx + 1}/${list.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="ss-btn-secondary" id="ss-lab-prev" ${labIdx === 0 ? 'disabled' :''}>← Forrige</button>
                    <button type="button" class="ss-btn-secondary" id="ss-lab-next" ${labIdx === list.length - 1 ? 'disabled' :''}>Næste →</button>
                </div>
            </div>

            <div class="ss-filters" style="margin-bottom:0.85rem;">
                <button type="button" class="ss-filter-btn ${labFilter === 'naa_video' ? 'active' :''}" data-lfilter="naa_video">"Nå" fra video (10)</button>
                <button type="button" class="ss-filter-btn ${labFilter === 'other' ? 'active' :''}" data-lfilter="other">Andre småord (7)</button>
                <button type="button" class="ss-filter-btn ${labFilter === 'all' ? 'active' :''}" data-lfilter="all">Alle (17)</button>
            </div>

            <div style="background:rgba(9,14,26,0.92); border:1.5px solid ${roleMeta.border}; border-radius:15px; padding:0.95rem 1.1rem; margin-bottom:0.9rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.45rem; margin-bottom:0.45rem;">
                    <span class="ss-pill-tag" style="background:${roleMeta.bg}; color:${roleMeta.color}; border:1px solid ${roleMeta.border};">
                        ${samtaleRoleIcon(item.role || 'lytter', 12)} ${roleMeta.short}
                    </span>
                    <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                        <button type="button" class="ss-btn-primary" id="ss-lab-listen" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">${samtaleIcons.audio(13)} Lyt</button>
                        ${item.isNaaVideo ? `
                            <button type="button" class="ss-btn-secondary" id="ss-lab-watch-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                                ${samtaleIcons.play(12)} Se klip (${item.videoTimeLabel})
                            </button>
                        ` :''}
                    </div>
                </div>
                <div style="font-size:1rem; font-weight:900; color:#fde68a; margin-bottom:0.25rem;">${item.title}</div>
                <div style="font-size:0.93rem; color:#e2e8f0; line-height:1.45;">${item.situation}</div>
            </div>

            <div class="ss-two-cols">
                ${item.variants.map((v, vIdx) => {
                    let cls = '';
                    if (labPicked !== null) {
                        if (vIdx === item.correctIdx) cls = 'correct';
                        else if (vIdx === labPicked) cls = 'wrong';
                    }
                    return `
                        <button type="button" class="ss-option-btn ${cls}" data-lab-opt="${vIdx}" style="flex-direction:column; align-items:flex-start;">
                            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.5rem;">
                                <span style="font-size:0.94rem; font-weight:900; color:#ffffff;">${v.label}</span>
                                <svg width="88" height="34" viewBox="0 0 100 38" style="background:rgba(15,23,42,0.85); border-radius:8px; border:1px solid rgba(148,163,184,0.25); flex-shrink:0;">
                                    <path d="${v.curve}" fill="none" stroke="${v.color}" stroke-width="3.2" stroke-linecap="round"/>
                                </svg>
                            </div>
                            <div style="font-size:0.81rem; color:#cbd5e1; font-weight:600;">${v.meaning}</div>
                        </button>
                    `;
                }).join('')}
            </div>

            ${labPicked !== null ? `
                <div class="ss-feedback ${labPicked === item.correctIdx ? 'ok' :'err'}">
                    <div>${labPicked === item.correctIdx ? '✓ Rigtigt!' :'✗ Bemærk tonefaldet:'} ${item.explanation}</div>
                    ${labIdx < list.length - 1 ? `<button type="button" class="ss-btn-secondary" id="ss-lab-adv" style="margin-top:0.55rem;">Næste →</button>` :''}
                </div>
            ` :''}
        `;

        card4.querySelectorAll('[data-lfilter]').forEach(btn => {
            btn.onclick = () => {
                labFilter = btn.dataset.lfilter;
                labIdx = 0;
                labPicked = null;
                renderLabTrack();
            };
        });

        card4.querySelector('#ss-lab-prev').onclick = () => {
            if (labIdx > 0) { labIdx--; labPicked = null; renderLabTrack(); }
        };
        card4.querySelector('#ss-lab-next').onclick = () => {
            if (labIdx < list.length - 1) { labIdx++; labPicked = null; renderLabTrack(); }
        };
        card4.querySelector('#ss-lab-listen').onclick = () => {
            speakSignal(item.ttsSample, 0.88, 1.04);
        };
        const watchClipBtn = card4.querySelector('#ss-lab-watch-clip');
        if (watchClipBtn) {
            watchClipBtn.onclick = () => {
                jumpToVideoTimestamp(item.videoStart, item.videoEnd);
                ytIframe.scrollIntoView({ behavior:'smooth', block:'center' });
            };
        }
        card4.querySelectorAll('[data-lab-opt]').forEach(btn => {
            btn.onclick = () => {
                labPicked = Number(btn.dataset.labOpt);
                renderLabTrack();
            };
        });
        const advBtn = card4.querySelector('#ss-lab-adv');
        if (advBtn) {
            advBtn.onclick = () => { labIdx++; labPicked = null; renderLabTrack(); };
        }
    }

    renderLabTrack();
    panel4.appendChild(card4);
    panelsHolder.appendChild(panel4);

    // =========================================================================
    // FANE 5: YOUTUBE-VIDEO "SVAR MED JA ELLER JO PÅ DANSK" (Ja, Jo, Nej & ikke)
    // =========================================================================
    const panelJaJo = makePanel('tab_jajo_video');
    let activeJaJoVariant = JAJO_VIDEO_VARIANTS[0];
    let jajoFilter = 'all';
    let jajoIdx = 0;
    let jajoPicked = null;

    const videoCardJaJo = document.createElement('div');
    videoCardJaJo.className = 'ss-card';
    videoCardJaJo.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.85rem;">
            <h3 style="margin:0; font-size:1.18rem; font-weight:900; color:#ffffff;">
                "Svar med ja eller jo på dansk" — 8 klip
            </h3>
            <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                <button type="button" class="ss-btn-secondary" id="ss-jajo-play-start" style="display:inline-flex; align-items:center; gap:0.35rem;">
                    ${samtaleIcons.play(12)} Fra start
                </button>
                <a href="https://www.youtube.com/watch?v=${JAJO_YOUTUBE_ID}" target="_blank" rel="noopener noreferrer" class="ss-btn-secondary" style="text-decoration:none;">
                    YouTube ↗
                </a>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:1rem; align-items:start;">
            <div style="background:rgba(9,14,26,0.94); border:1.5px solid rgba(245,158,11,0.42); border-radius:16px; overflow:hidden;">
                <div style="position:relative; width:100%; aspect-ratio:16/9; background:#020617;">
                    <iframe
                        id="ss-jajo-yt-iframe"
                        src="https://www.youtube.com/embed/${JAJO_YOUTUBE_ID}?rel=0"
                        title="Svar med ja eller jo på dansk (YouTube)"
                        style="position:absolute; inset:0; width:100%; height:100%; border:0;"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
                <div id="ss-jajo-active-detail" style="padding:0.85rem 1rem;"></div>
            </div>

            <div style="background:rgba(9,14,26,0.9); border:1px solid rgba(148,163,184,0.22); border-radius:16px; padding:0.8rem;">
                <div id="ss-jajo-variants-list" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(225px, 1fr)); gap:0.45rem;"></div>
            </div>
        </div>
    `;

    const jajoYtIframe = videoCardJaJo.querySelector('#ss-jajo-yt-iframe');
    const activeJaJoDetailBox = videoCardJaJo.querySelector('#ss-jajo-active-detail');
    const jajoVariantsListBox = videoCardJaJo.querySelector('#ss-jajo-variants-list');

    function jumpToJaJoTimestamp(startSec, endSec) {
        const endParam = endSec ? `&end=${endSec}` :'';
        jajoYtIframe.src = `https://www.youtube.com/embed/${JAJO_YOUTUBE_ID}?start=${startSec}${endParam}&autoplay=1&rel=0`;
    }

    function renderJaJoVideoDashboard() {
        const meta = ROLE_META[activeJaJoVariant.role];
        const partCol = activeJaJoVariant.part === 'uden_ikke' ? '#4ade80' :'#f59e0b';

        activeJaJoDetailBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.45rem; margin-bottom:0.45rem;">
                <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
                    <span class="ss-pill-tag" style="background:rgba(15,23,42,0.9); color:${partCol}; border:1px solid ${partCol};">
                        ${activeJaJoVariant.partLabel}
                    </span>
                    <span class="ss-pill-tag" style="background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.border};">
                        ${samtaleRoleIcon(activeJaJoVariant.role, 12)} ${meta.short}
                    </span>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="ss-btn-primary" id="ss-jajo-jump-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.play(12)} Klip (${activeJaJoVariant.timeLabel})
                    </button>
                    <button type="button" class="ss-btn-secondary" id="ss-jajo-tts-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.audio(13)} Lyt
                    </button>
                </div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.65rem; margin-bottom:0.35rem;">
                <div style="font-size:0.98rem; font-weight:900; color:#fde68a;">${activeJaJoVariant.quoteFromVideo}</div>
                <svg width="88" height="34" viewBox="0 0 100 38" style="background:rgba(15,23,42,0.9); border-radius:8px; border:1px solid rgba(148,163,184,0.28); flex-shrink:0;">
                    <path d="${activeJaJoVariant.curve}" fill="none" stroke="${activeJaJoVariant.color}" stroke-width="3.2" stroke-linecap="round"/>
                </svg>
            </div>
            <div style="font-size:0.84rem; color:#cbd5e1; line-height:1.45;">
                ${activeJaJoVariant.meaning}
            </div>
        `;

        activeJaJoDetailBox.querySelector('#ss-jajo-jump-clip').onclick = () => {
            jumpToJaJoTimestamp(activeJaJoVariant.startSec, activeJaJoVariant.endSec);
        };
        activeJaJoDetailBox.querySelector('#ss-jajo-tts-clip').onclick = () => {
            speakSignal(activeJaJoVariant.ttsSample, 0.9, 1.02);
        };

        jajoVariantsListBox.innerHTML = JAJO_VIDEO_VARIANTS.map(v => {
            const isSel = v.id === activeJaJoVariant.id;
            const pCol = v.part === 'uden_ikke' ? '#4ade80' :'#f59e0b';
            return `
                <button type="button" data-jajo-vid="${v.id}" style="text-align:left; padding:0.5rem 0.68rem; border-radius:11px; background:${isSel ? 'rgba(245,158,11,0.2)' :'rgba(15,23,42,0.85)'}; border:1.5px solid ${isSel ? '#fbbf24' : pCol}; color:#ffffff; cursor:pointer; display:flex; flex-direction:column; gap:0.2rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.35rem;">
                        <span style="font-size:0.82rem; font-weight:900; color:#ffffff;">${v.label}</span>
                        <span style="font-size:0.69rem; font-weight:900; padding:0.1rem 0.4rem; border-radius:999px; background:rgba(15,23,42,0.9); color:${pCol}; border:1px solid ${pCol};">${v.timeLabel}</span>
                    </div>
                    <div style="font-size:0.73rem; color:#94a3b8; font-weight:700;">${v.partLabel}</div>
                </button>
            `;
        }).join('');

        jajoVariantsListBox.querySelectorAll('[data-jajo-vid]').forEach(btn => {
            btn.onclick = () => {
                const found = JAJO_VIDEO_VARIANTS.find(x => x.id === btn.dataset.jajoVid);
                if (found) {
                    activeJaJoVariant = found;
                    renderJaJoVideoDashboard();
                    jumpToJaJoTimestamp(found.startSec, found.endSec);
                }
            };
        });
    }

    videoCardJaJo.querySelector('#ss-jajo-play-start').onclick = () => {
        jumpToJaJoTimestamp(0, null);
    };

    renderJaJoVideoDashboard();
    panelJaJo.appendChild(videoCardJaJo);

    const cardJaJoQuiz = document.createElement('div');
    cardJaJoQuiz.className = 'ss-card';

    function getFilteredJaJoItems() {
        if (jajoFilter === 'uden_ikke') return JAJO_LAB_ITEMS.filter(x => x.part === 'uden_ikke');
        if (jajoFilter === 'med_ikke') return JAJO_LAB_ITEMS.filter(x => x.part === 'med_ikke');
        return JAJO_LAB_ITEMS;
    }

    function renderJaJoLabTrack() {
        const list = getFilteredJaJoItems();
        if (jajoIdx >= list.length) jajoIdx = 0;
        const item = list[jajoIdx];
        const roleMeta = ROLE_META[item.role || 'taler'];

        cardJaJoQuiz.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.7rem;">
                <div>
                    <h3 style="margin:0; font-size:1.08rem; font-weight:900;">Øvelser: Ja, Jo eller Nej?</h3>
                    <div style="font-size:0.83rem; color:#94a3b8;">Opgave ${jajoIdx + 1}/${list.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="ss-btn-secondary" id="ss-jajo-prev" ${jajoIdx === 0 ? 'disabled' :''}>← Forrige</button>
                    <button type="button" class="ss-btn-secondary" id="ss-jajo-next" ${jajoIdx === list.length - 1 ? 'disabled' :''}>Næste →</button>
                </div>
            </div>

            <div class="ss-filters" style="margin-bottom:0.85rem;">
                <button type="button" class="ss-filter-btn ${jajoFilter === 'all' ? 'active' :''}" data-jjfilter="all">Alle (8)</button>
                <button type="button" class="ss-filter-btn ${jajoFilter === 'uden_ikke' ? 'active' :''}" data-jjfilter="uden_ikke">Uden "ikke" (4)</button>
                <button type="button" class="ss-filter-btn ${jajoFilter === 'med_ikke' ? 'active' :''}" data-jjfilter="med_ikke">Med "ikke" (4)</button>
            </div>

            <div style="background:rgba(9,14,26,0.92); border:1.5px solid ${roleMeta.border}; border-radius:15px; padding:0.95rem 1.1rem; margin-bottom:0.9rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.45rem; margin-bottom:0.45rem;">
                    <span class="ss-pill-tag" style="background:${roleMeta.bg}; color:${roleMeta.color}; border:1px solid ${roleMeta.border};">
                        ${samtaleRoleIcon(item.role || 'taler', 12)} ${roleMeta.short}
                    </span>
                    <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                        <button type="button" class="ss-btn-primary" id="ss-jajo-listen" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">${samtaleIcons.audio(13)} Lyt</button>
                        <button type="button" class="ss-btn-secondary" id="ss-jajo-watch-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                            ${samtaleIcons.play(12)} Se klip (${item.videoTimeLabel})
                        </button>
                    </div>
                </div>
                <div style="font-size:1rem; font-weight:900; color:#fde68a; margin-bottom:0.25rem;">${item.title}</div>
                <div style="font-size:0.93rem; color:#e2e8f0; line-height:1.45;">${item.situation}</div>
            </div>

            <div class="ss-two-cols">
                ${item.variants.map((v, vIdx) => {
                    let cls = '';
                    if (jajoPicked !== null) {
                        if (vIdx === item.correctIdx) cls = 'correct';
                        else if (vIdx === jajoPicked) cls = 'wrong';
                    }
                    return `
                        <button type="button" class="ss-option-btn ${cls}" data-jajo-opt="${vIdx}" style="flex-direction:column; align-items:flex-start;">
                            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.5rem;">
                                <span style="font-size:0.94rem; font-weight:900; color:#ffffff;">${v.label}</span>
                                <svg width="88" height="34" viewBox="0 0 100 38" style="background:rgba(15,23,42,0.85); border-radius:8px; border:1px solid rgba(148,163,184,0.25); flex-shrink:0;">
                                    <path d="${v.curve}" fill="none" stroke="${v.color}" stroke-width="3.2" stroke-linecap="round"/>
                                </svg>
                            </div>
                            <div style="font-size:0.81rem; color:#cbd5e1; font-weight:600;">${v.meaning}</div>
                        </button>
                    `;
                }).join('')}
            </div>

            ${jajoPicked !== null ? `
                <div class="ss-feedback ${jajoPicked === item.correctIdx ? 'ok' :'err'}">
                    <div>${jajoPicked === item.correctIdx ? '✓ Rigtigt!' :'✗ Tjek om spørgsmålet indeholder "ikke":'} ${item.explanation}</div>
                    ${jajoIdx < list.length - 1 ? `<button type="button" class="ss-btn-secondary" id="ss-jajo-adv" style="margin-top:0.55rem;">Næste →</button>` :''}
                </div>
            ` :''}
        `;

        cardJaJoQuiz.querySelectorAll('[data-jjfilter]').forEach(btn => {
            btn.onclick = () => {
                jajoFilter = btn.dataset.jjfilter;
                jajoIdx = 0;
                jajoPicked = null;
                renderJaJoLabTrack();
            };
        });
        cardJaJoQuiz.querySelector('#ss-jajo-prev').onclick = () => {
            if (jajoIdx > 0) { jajoIdx--; jajoPicked = null; renderJaJoLabTrack(); }
        };
        cardJaJoQuiz.querySelector('#ss-jajo-next').onclick = () => {
            if (jajoIdx < list.length - 1) { jajoIdx++; jajoPicked = null; renderJaJoLabTrack(); }
        };
        cardJaJoQuiz.querySelector('#ss-jajo-listen').onclick = () => {
            speakSignal(item.ttsSample, 0.9, 1.02);
        };
        cardJaJoQuiz.querySelector('#ss-jajo-watch-clip').onclick = () => {
            jumpToJaJoTimestamp(item.videoStart, item.videoEnd);
            jajoYtIframe.scrollIntoView({ behavior:'smooth', block:'center' });
        };
        cardJaJoQuiz.querySelectorAll('[data-jajo-opt]').forEach(btn => {
            btn.onclick = () => {
                jajoPicked = Number(btn.dataset.jajoOpt);
                renderJaJoLabTrack();
            };
        });
        const advBtn = cardJaJoQuiz.querySelector('#ss-jajo-adv');
        if (advBtn) {
            advBtn.onclick = () => { jajoIdx++; jajoPicked = null; renderJaJoLabTrack(); };
        }
    }

    renderJaJoLabTrack();
    panelJaJo.appendChild(cardJaJoQuiz);
    panelsHolder.appendChild(panelJaJo);

    // =========================================================================
    // FANE 6: YOUTUBE-VIDEO "AT VÆRE ENIG I NOGET"
    // =========================================================================
    const panelEnig = makePanel('tab_enig_video');
    let activeEnigVariant = ENIG_VIDEO_VARIANTS[0];
    let enigIdx = 0;
    let enigPicked = null;

    const videoCardEnig = document.createElement('div');
    videoCardEnig.className = 'ss-card';
    videoCardEnig.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.85rem;">
            <h3 style="margin:0; font-size:1.18rem; font-weight:900; color:#ffffff;">
                "At være enig i noget" — 6 lytter-reaktioner
            </h3>
            <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                <button type="button" class="ss-btn-secondary" id="ss-enig-play-start" style="display:inline-flex; align-items:center; gap:0.35rem;">
                    ${samtaleIcons.play(12)} Fra start
                </button>
                <a href="https://www.youtube.com/watch?v=${ENIG_YOUTUBE_ID}" target="_blank" rel="noopener noreferrer" class="ss-btn-secondary" style="text-decoration:none;">
                    YouTube ↗
                </a>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:1rem; align-items:start;">
            <div style="background:rgba(9,14,26,0.94); border:1.5px solid rgba(6,182,212,0.42); border-radius:16px; overflow:hidden;">
                <div style="position:relative; width:100%; aspect-ratio:16/9; background:#020617;">
                    <iframe
                        id="ss-enig-yt-iframe"
                        src="https://www.youtube.com/embed/${ENIG_YOUTUBE_ID}?rel=0"
                        title="At være enig i noget (YouTube)"
                        style="position:absolute; inset:0; width:100%; height:100%; border:0;"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
                <div id="ss-enig-active-detail" style="padding:0.85rem 1rem;"></div>
            </div>

            <div style="background:rgba(9,14,26,0.9); border:1px solid rgba(148,163,184,0.22); border-radius:16px; padding:0.8rem;">
                <div id="ss-enig-variants-list" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(225px, 1fr)); gap:0.45rem;"></div>
            </div>
        </div>
    `;

    const enigYtIframe = videoCardEnig.querySelector('#ss-enig-yt-iframe');
    const activeEnigDetailBox = videoCardEnig.querySelector('#ss-enig-active-detail');
    const enigVariantsListBox = videoCardEnig.querySelector('#ss-enig-variants-list');

    function jumpToEnigTimestamp(startSec, endSec) {
        const endParam = endSec ? `&end=${endSec}` :'';
        enigYtIframe.src = `https://www.youtube.com/embed/${ENIG_YOUTUBE_ID}?start=${startSec}${endParam}&autoplay=1&rel=0`;
    }

    function renderEnigVideoDashboard() {
        const meta = ROLE_META[activeEnigVariant.role];

        activeEnigDetailBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.45rem; margin-bottom:0.45rem;">
                <span class="ss-pill-tag" style="background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.border};">
                    ${samtaleRoleIcon(activeEnigVariant.role, 12)} ${meta.short}
                </span>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="ss-btn-primary" id="ss-enig-jump-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.play(12)} Klip (${activeEnigVariant.timeLabel})
                    </button>
                    <button type="button" class="ss-btn-secondary" id="ss-enig-tts-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.audio(13)} Lyt
                    </button>
                </div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.65rem; margin-bottom:0.35rem;">
                <div style="font-size:0.98rem; font-weight:900; color:#fde68a;">${activeEnigVariant.quoteFromVideo}</div>
                <svg width="88" height="34" viewBox="0 0 100 38" style="background:rgba(15,23,42,0.9); border-radius:8px; border:1px solid rgba(148,163,184,0.28); flex-shrink:0;">
                    <path d="${activeEnigVariant.curve}" fill="none" stroke="${activeEnigVariant.color}" stroke-width="3.2" stroke-linecap="round"/>
                </svg>
            </div>
            <div style="font-size:0.84rem; color:#cbd5e1; line-height:1.45;">
                ${activeEnigVariant.meaning}
            </div>
        `;

        activeEnigDetailBox.querySelector('#ss-enig-jump-clip').onclick = () => {
            jumpToEnigTimestamp(activeEnigVariant.startSec, activeEnigVariant.endSec);
        };
        activeEnigDetailBox.querySelector('#ss-enig-tts-clip').onclick = () => {
            speakSignal(activeEnigVariant.ttsSample, 0.9, 1.02);
        };

        enigVariantsListBox.innerHTML = ENIG_VIDEO_VARIANTS.map(v => {
            const isSel = v.id === activeEnigVariant.id;
            return `
                <button type="button" data-enig-vid="${v.id}" style="text-align:left; padding:0.5rem 0.68rem; border-radius:11px; background:${isSel ? 'rgba(6,182,212,0.2)' :'rgba(15,23,42,0.85)'}; border:1.5px solid ${isSel ? '#22d3ee' : v.color}; color:#ffffff; cursor:pointer; display:flex; flex-direction:column; gap:0.2rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.35rem;">
                        <span style="font-size:0.83rem; font-weight:900; color:#ffffff;">${v.label}</span>
                        <span style="font-size:0.69rem; font-weight:900; padding:0.1rem 0.4rem; border-radius:999px; background:rgba(6,182,212,0.18); color:#67e8f9; display:inline-flex; align-items:center; gap:0.22rem;">${samtaleRoleIcon('lytter', 11)} ${v.timeLabel}</span>
                    </div>
                    <div style="font-size:0.73rem; color:#94a3b8; font-weight:700;">${v.matchTag}</div>
                </button>
            `;
        }).join('');

        enigVariantsListBox.querySelectorAll('[data-enig-vid]').forEach(btn => {
            btn.onclick = () => {
                const found = ENIG_VIDEO_VARIANTS.find(x => x.id === btn.dataset.enigVid);
                if (found) {
                    activeEnigVariant = found;
                    renderEnigVideoDashboard();
                    jumpToEnigTimestamp(found.startSec, found.endSec);
                }
            };
        });
    }

    videoCardEnig.querySelector('#ss-enig-play-start').onclick = () => {
        jumpToEnigTimestamp(0, null);
    };

    renderEnigVideoDashboard();
    panelEnig.appendChild(videoCardEnig);

    const cardEnigQuiz = document.createElement('div');
    cardEnigQuiz.className = 'ss-card';

    function renderEnigLabTrack() {
        const list = ENIG_LAB_ITEMS;
        if (enigIdx >= list.length) enigIdx = 0;
        const item = list[enigIdx];
        const roleMeta = ROLE_META[item.role || 'lytter'];

        cardEnigQuiz.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.7rem;">
                <div>
                    <h3 style="margin:0; font-size:1.08rem; font-weight:900;">Øvelser: Giv opbakning</h3>
                    <div style="font-size:0.83rem; color:#94a3b8;">Opgave ${enigIdx + 1}/${list.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="ss-btn-secondary" id="ss-enig-prev" ${enigIdx === 0 ? 'disabled' :''}>← Forrige</button>
                    <button type="button" class="ss-btn-secondary" id="ss-enig-next" ${enigIdx === list.length - 1 ? 'disabled' :''}>Næste →</button>
                </div>
            </div>

            <div style="background:rgba(9,14,26,0.92); border:1.5px solid ${roleMeta.border}; border-radius:15px; padding:0.95rem 1.1rem; margin-bottom:0.9rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.45rem; margin-bottom:0.45rem;">
                    <span class="ss-pill-tag" style="background:${roleMeta.bg}; color:${roleMeta.color}; border:1px solid ${roleMeta.border};">
                        ${samtaleRoleIcon(item.role || 'lytter', 12)} ${roleMeta.short}
                    </span>
                    <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                        <button type="button" class="ss-btn-primary" id="ss-enig-listen" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">${samtaleIcons.audio(13)} Lyt</button>
                        <button type="button" class="ss-btn-secondary" id="ss-enig-watch-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                            ${samtaleIcons.play(12)} Se klip (${item.videoTimeLabel})
                        </button>
                    </div>
                </div>
                <div style="font-size:1rem; font-weight:900; color:#fde68a; margin-bottom:0.25rem;">${item.title}</div>
                <div style="font-size:0.93rem; color:#e2e8f0; line-height:1.45;">${item.situation}</div>
            </div>

            <div class="ss-two-cols">
                ${item.variants.map((v, vIdx) => {
                    let cls = '';
                    if (enigPicked !== null) {
                        if (vIdx === item.correctIdx) cls = 'correct';
                        else if (vIdx === enigPicked) cls = 'wrong';
                    }
                    return `
                        <button type="button" class="ss-option-btn ${cls}" data-enig-opt="${vIdx}" style="flex-direction:column; align-items:flex-start;">
                            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.5rem;">
                                <span style="font-size:0.94rem; font-weight:900; color:#ffffff;">${v.label}</span>
                                <svg width="88" height="34" viewBox="0 0 100 38" style="background:rgba(15,23,42,0.85); border-radius:8px; border:1px solid rgba(148,163,184,0.25); flex-shrink:0;">
                                    <path d="${v.curve}" fill="none" stroke="${v.color}" stroke-width="3.2" stroke-linecap="round"/>
                                </svg>
                            </div>
                            <div style="font-size:0.81rem; color:#cbd5e1; font-weight:600;">${v.meaning}</div>
                        </button>
                    `;
                }).join('')}
            </div>

            ${enigPicked !== null ? `
                <div class="ss-feedback ${enigPicked === item.correctIdx ? 'ok' :'err'}">
                    <div>${enigPicked === item.correctIdx ? '✓ Rigtigt!' :'✗ Se videoens eksempel:'} ${item.explanation}</div>
                    ${enigIdx < list.length - 1 ? `<button type="button" class="ss-btn-secondary" id="ss-enig-adv" style="margin-top:0.55rem;">Næste →</button>` :''}
                </div>
            ` :''}
        `;

        cardEnigQuiz.querySelector('#ss-enig-prev').onclick = () => {
            if (enigIdx > 0) { enigIdx--; enigPicked = null; renderEnigLabTrack(); }
        };
        cardEnigQuiz.querySelector('#ss-enig-next').onclick = () => {
            if (enigIdx < list.length - 1) { enigIdx++; enigPicked = null; renderEnigLabTrack(); }
        };
        cardEnigQuiz.querySelector('#ss-enig-listen').onclick = () => {
            speakSignal(item.ttsSample, 0.9, 1.02);
        };
        cardEnigQuiz.querySelector('#ss-enig-watch-clip').onclick = () => {
            jumpToEnigTimestamp(item.videoStart, item.videoEnd);
            enigYtIframe.scrollIntoView({ behavior:'smooth', block:'center' });
        };
        cardEnigQuiz.querySelectorAll('[data-enig-opt]').forEach(btn => {
            btn.onclick = () => {
                enigPicked = Number(btn.dataset.enigOpt);
                renderEnigLabTrack();
            };
        });
        const advBtn = cardEnigQuiz.querySelector('#ss-enig-adv');
        if (advBtn) {
            advBtn.onclick = () => { enigIdx++; enigPicked = null; renderEnigLabTrack(); };
        }
    }

    renderEnigLabTrack();
    panelEnig.appendChild(cardEnigQuiz);
    panelsHolder.appendChild(panelEnig);

    // =========================================================================
    // FANE 7: HOLD SAMTALEN I LIVE! (3 INTERAKTIVE SAMTALE-SIMULATORER)
    // =========================================================================
    const panel5 = makePanel('tab_live');
    let simIdx = 0;
    let simTurnIdx = 0;
    let simPickedOpt = null;
    const simHistory = [];

    const card5 = document.createElement('div');
    card5.className = 'ss-card';

    function renderLiveSim() {
        const sim = LIVE_CONVERSATIONS[simIdx];
        const turn = sim.turns[simTurnIdx];
        const roleMeta = turn ? ROLE_META[turn.targetRole] : null;

        card5.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                <h3 style="margin:0; font-size:1.1rem; font-weight:900;">Hold samtalen i live</h3>
                <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                    ${LIVE_CONVERSATIONS.map((c, idx) => `
                        <button type="button" class="ss-filter-btn ${idx === simIdx ? 'active' :''}" data-sim-pick="${idx}">
                            ${c.title}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div style="font-size:0.88rem; color:#cbd5e1; background:rgba(15,23,42,0.85); border:1px solid rgba(148,163,184,0.22); border-radius:12px; padding:0.65rem 0.95rem; margin-bottom:0.9rem;">
                ${sim.scene}
            </div>

            <div style="display:flex; flex-direction:column; gap:0.55rem; margin-bottom:0.95rem;">
                ${simHistory.map(h => `
                    <div style="background:rgba(30,41,59,0.75); border-radius:12px; padding:0.6rem 0.9rem; font-size:0.88rem; color:#cbd5e1;">
                        ${h.partnerLine}
                    </div>
                    <div style="align-self:flex-end; background:rgba(34,197,94,0.18); border:1px solid rgba(74,222,128,0.45); border-radius:12px; padding:0.55rem 0.9rem; font-size:0.88rem; color:#bbf7d0; font-weight:800;">
                        Dig: "${h.userReply}" ✓
                    </div>
                `).join('')}
            </div>

            ${turn ? `
                <div style="background:rgba(9,14,26,0.94); border-left:4px solid ${roleMeta.color}; border-radius:14px; padding:0.95rem 1.1rem; margin-bottom:0.9rem;">
                    <div style="font-size:1rem; color:#ffffff; font-weight:800; margin-bottom:0.5rem;">
                        ${turn.partnerLine}
                    </div>
                    <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                        <span class="ss-pill-tag" style="background:${roleMeta.bg}; color:${roleMeta.color}; border:1px solid ${roleMeta.border};">
                            ${samtaleRoleIcon(turn.targetRole, 12)} ${roleMeta.short}
                        </span>
                        <span style="font-size:0.86rem; color:#fde68a; font-weight:700;">${turn.instruction}</span>
                    </div>
                </div>

                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                    ${turn.options.map((opt, oIdx) => {
                        let cls = '';
                        if (simPickedOpt !== null) {
                            if (opt.ok) cls = 'correct';
                            else if (oIdx === simPickedOpt) cls = 'wrong';
                        }
                        return `
                            <button type="button" class="ss-option-btn ${cls}" data-sim-opt="${oIdx}">
                                <span>"${opt.text}"</span>
                            </button>
                        `;
                    }).join('')}
                </div>

                ${simPickedOpt !== null ? `
                    <div class="ss-feedback ${turn.options[simPickedOpt].ok ? 'ok' :'err'}">
                        <div>${turn.options[simPickedOpt].feedback}</div>
                        ${turn.options[simPickedOpt].ok ? `
                            <button type="button" class="ss-btn-primary" id="ss-sim-continue" style="margin-top:0.55rem;">
                                ${simTurnIdx < sim.turns.length - 1 ? 'Fortsæt →' :'Afslut'}
                            </button>
                        ` :''}
                    </div>
                ` :''}
            ` : `
                <div class="ss-feedback ok">
                    <div style="font-size:1rem; margin-bottom:0.45rem;">✓ Flot! Du gennemførte samtalen med ${sim.partner}.</div>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <button type="button" class="ss-btn-secondary" id="ss-sim-restart">Prøv igen</button>
                        ${simIdx < LIVE_CONVERSATIONS.length - 1 ? `<button type="button" class="ss-btn-primary" id="ss-sim-next-scene">Næste samtale →</button>` :''}
                    </div>
                </div>
            `}
        `;

        card5.querySelectorAll('[data-sim-pick]').forEach(btn => {
            btn.onclick = () => {
                simIdx = Number(btn.dataset.simPick);
                simTurnIdx = 0;
                simPickedOpt = null;
                simHistory.length = 0;
                renderLiveSim();
            };
        });

        card5.querySelectorAll('[data-sim-opt]').forEach(btn => {
            btn.onclick = () => {
                simPickedOpt = Number(btn.dataset.simOpt);
                renderLiveSim();
            };
        });

        const contBtn = card5.querySelector('#ss-sim-continue');
        if (contBtn) {
            contBtn.onclick = () => {
                const chosen = turn.options[simPickedOpt];
                simHistory.push({ partnerLine: turn.partnerLine, userReply: chosen.text });
                simTurnIdx++;
                simPickedOpt = null;
                renderLiveSim();
            };
        }

        const restartBtn = card5.querySelector('#ss-sim-restart');
        if (restartBtn) {
            restartBtn.onclick = () => {
                simTurnIdx = 0;
                simPickedOpt = null;
                simHistory.length = 0;
                renderLiveSim();
            };
        }

        const nextSceneBtn = card5.querySelector('#ss-sim-next-scene');
        if (nextSceneBtn) {
            nextSceneBtn.onclick = () => {
                simIdx++;
                simTurnIdx = 0;
                simPickedOpt = null;
                simHistory.length = 0;
                renderLiveSim();
            };
        }
    }

    renderLiveSim();
    panel5.appendChild(card5);
    panelsHolder.appendChild(panel5);

    // =========================================================================
    // FANE 6: FRA ROBOT-DANSK TIL LEVENDE DANSK (8 SAMTALE-OPGRADERINGER)
    // =========================================================================
    const panel6 = makePanel('tab_robot');
    let robIdx = 0;
    let pick1 = null;
    let pick2 = null;

    const card6 = document.createElement('div');
    card6.className = 'ss-card';

    function renderRobotTrack() {
        const item = ROBOT_UPGRADES[robIdx];
        const bothDone = pick1 === item.slot1Answer && pick2 === item.slot2Answer;
        const previewHtml = item.slotsText
            .replace('[1]', `<strong style="padding:0.15rem 0.5rem; border-radius:6px; background:${pick1 === item.slot1Answer ? 'rgba(34,197,94,0.28)' :'rgba(245,158,11,0.25)'}; color:#fde68a;">${pick1 || '[ 1 ]'}</strong>`)
            .replace('[2]', `<strong style="padding:0.15rem 0.5rem; border-radius:6px; background:${pick2 === item.slot2Answer ? 'rgba(34,197,94,0.28)' :'rgba(6,182,212,0.25)'}; color:#67e8f9;">${pick2 || '[ 2 ]'}</strong>`);

        card6.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                <div>
                    <h3 style="margin:0; font-size:1.1rem; font-weight:900;">Fra robot-dansk til levende dansk</h3>
                    <div style="font-size:0.84rem; color:#94a3b8;">Dialog ${robIdx + 1}/${ROBOT_UPGRADES.length}: ${item.title}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="ss-btn-secondary" id="ss-rob-prev" ${robIdx === 0 ? 'disabled' :''}>← Forrige</button>
                    <button type="button" class="ss-btn-secondary" id="ss-rob-next" ${robIdx === ROBOT_UPGRADES.length - 1 ? 'disabled' :''}>Næste →</button>
                </div>
            </div>

            <div style="background:rgba(239,68,68,0.12); border:1px solid rgba(248,113,113,0.35); border-radius:12px; padding:0.7rem 0.95rem; margin-bottom:0.7rem; color:#fecaca; font-size:0.93rem;">
                ${item.robotText}
            </div>

            <div style="background:rgba(34,197,94,0.12); border:1.5px solid rgba(74,222,128,0.45); border-radius:14px; padding:0.9rem 1.05rem; margin-bottom:0.95rem; color:#ffffff; font-size:1.03rem; line-height:1.55;">
                ${previewHtml}
            </div>

            <div class="ss-two-cols">
                <div style="background:rgba(9,14,26,0.85); border:1px solid rgba(148,163,184,0.25); border-radius:14px; padding:0.85rem;">
                    <div style="font-size:0.8rem; font-weight:900; color:#fde68a; text-transform:uppercase; margin-bottom:0.45rem;">Plads [ 1 ]</div>
                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        ${item.slot1Options.map(opt => `
                            <button type="button" class="ss-option-btn ${pick1 === opt ? (opt === item.slot1Answer ? 'correct' :'wrong') :''}" data-rob-s1="${opt}">
                                <span>${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div style="background:rgba(9,14,26,0.85); border:1px solid rgba(148,163,184,0.25); border-radius:14px; padding:0.85rem;">
                    <div style="font-size:0.8rem; font-weight:900; color:#67e8f9; text-transform:uppercase; margin-bottom:0.45rem;">Plads [ 2 ]</div>
                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        ${item.slot2Options.map(opt => `
                            <button type="button" class="ss-option-btn ${pick2 === opt ? (opt === item.slot2Answer ? 'correct' :'wrong') :''}" data-rob-s2="${opt}">
                                <span>${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>

            ${bothDone ? `
                <div class="ss-feedback ok">
                    <div>✓ ${item.explanation}</div>
                    ${robIdx < ROBOT_UPGRADES.length - 1 ? `<button type="button" class="ss-btn-secondary" id="ss-rob-adv" style="margin-top:0.55rem;">Næste →</button>` :''}
                </div>
            ` :''}
        `;

        card6.querySelector('#ss-rob-prev').onclick = () => {
            if (robIdx > 0) { robIdx--; pick1 = null; pick2 = null; renderRobotTrack(); }
        };
        card6.querySelector('#ss-rob-next').onclick = () => {
            if (robIdx < ROBOT_UPGRADES.length - 1) { robIdx++; pick1 = null; pick2 = null; renderRobotTrack(); }
        };
        card6.querySelectorAll('[data-rob-s1]').forEach(btn => {
            btn.onclick = () => { pick1 = btn.dataset.robS1; renderRobotTrack(); };
        });
        card6.querySelectorAll('[data-rob-s2]').forEach(btn => {
            btn.onclick = () => { pick2 = btn.dataset.robS2; renderRobotTrack(); };
        });
        const advBtn = card6.querySelector('#ss-rob-adv');
        if (advBtn) {
            advBtn.onclick = () => { robIdx++; pick1 = null; pick2 = null; renderRobotTrack(); };
        }
    }

    renderRobotTrack();
    panel6.appendChild(card6);
    panelsHolder.appendChild(panel6);

    // =========================================================================
    // FANE 7: SAMTALE-DETEKTIVEN I VRIMLEBILLEDET (12 MISSIONER)
    // =========================================================================
    const panel7 = makePanel('tab_detektiv');
    let detIdx = 0;
    let detMsg = '';
    let detSolved = false;
    let detShowHint = false;
    const detDoneSet = new Set();

    const card7 = document.createElement('div');
    card7.className = 'ss-card';

    function renderDetective() {
        const m = DETECTIVE_MISSIONS[detIdx];
        const sigMap = Object.fromEntries(SAMTALE_SIGNALS.map(s => [s.id, s]));
        const targetSig = sigMap[m.answerId];

        card7.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <div>
                    <h3 style="margin:0; font-size:1.1rem; font-weight:900;">Samtale-detektiven</h3>
                    <div style="font-size:0.83rem; color:#94a3b8;">Mission ${detIdx + 1}/${DETECTIVE_MISSIONS.length} • Løst: ${detDoneSet.size}/${DETECTIVE_MISSIONS.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                    <button type="button" class="ss-btn-secondary" id="ss-det-hint">${detShowHint ? 'Skjul spor' :'Vis spor'}</button>
                    <button type="button" class="ss-btn-secondary" id="ss-det-prev" ${detIdx === 0 ? 'disabled' :''}>← Forrige</button>
                    <button type="button" class="ss-btn-secondary" id="ss-det-next" ${detIdx === DETECTIVE_MISSIONS.length - 1 ? 'disabled' :''}>Næste →</button>
                </div>
            </div>

            <div style="background:rgba(56,189,248,0.12); border:1.5px solid #38bdf8; border-radius:14px; padding:0.85rem 1.05rem; margin-bottom:0.8rem;">
                <div style="font-size:0.98rem; font-weight:900; color:#ffffff;">${m.prompt}</div>
                ${detShowHint ? `<div style="font-size:0.83rem; color:#bae6fd; margin-top:0.35rem;">Spor: ${m.hint}</div>` :''}
            </div>

            ${detMsg ? `<div class="ss-feedback ${detSolved ? 'ok' :'err'}" style="margin-top:0; margin-bottom:0.8rem;">${detMsg}</div>` :''}

            <div class="ss-stage-wrap">
                <div class="ss-stage-inner">
                    <img src="assets/samtale_smaaord_vrimmel.jpg" alt="Samtale-detektiv vrimlebillede" class="ss-stage-img" />
                    <div id="ss-det-pins"></div>
                </div>
            </div>
        `;

        const detPinsLayer = card7.querySelector('#ss-det-pins');
        SAMTALE_SIGNALS.forEach(sig => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const isFound = detSolved && sig.id === m.answerId;
            btn.className = `ss-pegefelt role-${sig.role} ${sig.pointerDir === 'up' ? 'dir-up' :''} ${isFound ? 'active show-mobile-label' :'compact-mode'}`;
            btn.style.left = `${sig.x}%`;
            btn.style.top = `${sig.y}%`;
            btn.innerHTML = isFound
                ? `<span class="ss-pegefelt-num">${sig.num}</span>${samtaleRoleIcon(sig.role, 12)}<span class="ss-pegefelt-label">${sig.shortLabel}</span>`
                : `${samtaleRoleIcon(sig.role, 12)}<span>${sig.num}</span>`;
            btn.onclick = () => {
                if (sig.id === m.answerId) {
                    detSolved = true;
                    detDoneSet.add(detIdx);
                    detMsg = `✓ Fundet! #${targetSig.num} "${targetSig.word}" (${ROLE_META[targetSig.role].label}): ${targetSig.turnAction}`;
                    speakSignal(targetSig.ttsText, targetSig.ttsRate, targetSig.ttsPitch);
                } else {
                    detSolved = false;
                    detMsg = `✗ Det var #${sig.num} "${sig.word}". Prøv igen.`;
                }
                renderDetective();
            };
            detPinsLayer.appendChild(btn);
        });

        card7.querySelector('#ss-det-hint').onclick = () => {
            detShowHint = !detShowHint;
            renderDetective();
        };
        card7.querySelector('#ss-det-prev').onclick = () => {
            if (detIdx > 0) { detIdx--; detMsg = ''; detSolved = false; detShowHint = false; renderDetective(); }
        };
        card7.querySelector('#ss-det-next').onclick = () => {
            if (detIdx < DETECTIVE_MISSIONS.length - 1) { detIdx++; detMsg = ''; detSolved = false; detShowHint = false; renderDetective(); }
        };
    }

    renderDetective();
    panel7.appendChild(card7);
    panelsHolder.appendChild(panel7);

    container.appendChild(viewContainer);
}
