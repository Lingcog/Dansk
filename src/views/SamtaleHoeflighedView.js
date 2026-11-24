import { getTranslation, getLang } from '../utils/i18n.js';
import { shuffleArray } from '../utils/shuffle.js';
import { samtaleIcons, hoeflighedPillarIcon } from '../utils/samtaleIcons.js';
import { st, stSub, stRtlAttr, isSamtaleLangLoaded, ensureSamtaleLang, SAMTALE_TR_CSS } from '../utils/samtale_translations.js';
import { createSamtalePrincipperTab } from '../components/SamtalePrincipperTab.js';
import { attachVrimmelControls } from '../utils/vrimmelPegefeltStandard.js';

/**
 * SamtaleHoeflighedView — "Høflighed på dansk"
 * Placeret under hovedfladen "Samtaletræning" som 3. søjle sammen med
 * "Små lyde der får en samtale til at fungere" og "Små ord der får en samtale til at fungere".
 *
 * Indeholder:
 * 1. Vrimlebillede med de 20 mest almindelige danske høflighedsudtryk + 4-søjle sortering + Fuld oversigtstabel
 * 2. Indsæt i social kontekst (20 sociale scenarier + 10 A/B dialog-byggere med 2 huller)
 * 3. Video-bane A: Høflig uden "please" (Video 1, 2 & 3: Undskyld, modalverber, gerne/bare/lige) + 2 træningsbaner
 * 4. Video-bane B: Tak, Svar på tak & "Tak for sidst" (Video 4, Tak på dansk & Tak for i aftes) + 2 træningsbaner
 * 5. Video-bane C: Høflige afslag & Dansk aftalekultur ("Nej på forskellige måder" & "Hvad er uhøfligt i Danmark?")
 * 6. Video-bane D: Hverdagens lyn-situationer (6 Shorts: tilbyde hjælp, vælte kaffe, tak for mad, spørge om vej, gave, hilsen)
 * 7. Høfligheds-detektiven i vrimlebilledet (14 sociale billedjagt-missioner)
 */

const PILLAR_META = {
    kontakt: {
        id: 'kontakt',
        label: 'Kontakt & bøn',
        short: 'KONTAKT & BØN',
        subtitle: 'Undskyld (til fremmede), modalverber, gerne & bede om',
        color: '#f59e0b',
        border: 'rgba(245, 158, 11, 0.8)',
        bg: 'rgba(245, 158, 11, 0.16)',
        count: 6
    },
    bloedgoer: {
        id: 'bloedgoer',
        label: 'Blødgør & hjælp',
        short: 'BLØDGØR & HJÆLP',
        subtitle: 'Bare, lige, være sød at, tilbyde hjælp & byde velkommen',
        color: '#06b6d4',
        border: 'rgba(6, 182, 212, 0.82)',
        bg: 'rgba(6, 182, 212, 0.16)',
        count: 5
    },
    tak: {
        id: 'tak',
        label: 'Tak & svar',
        short: 'TAK & SVAR',
        subtitle: 'Tak for..., Mange/Tusind tak, Det var så lidt & Velbekomme',
        color: '#10b981',
        border: 'rgba(16, 185, 129, 0.82)',
        bg: 'rgba(16, 185, 129, 0.16)',
        count: 6
    },
    afslag: {
        id: 'afslag',
        label: 'Afslag & takt',
        short: 'AFSLAG & TAKT',
        subtitle: 'Ellers tak, springe over, undskylde uheld & punktlighed',
        color: '#c084fc',
        border: 'rgba(192, 132, 252, 0.82)',
        bg: 'rgba(168, 85, 247, 0.16)',
        count: 3
    }
};

// =========================================================================
// DE 20 MEST ALMINDELIGE DANSKE HØFLIGHEDSUDTRYK I VRIMLEBILLEDET
// =========================================================================
export const POLITENESS_EXPRESSIONS = [
    // --- SØJLE 1: ÅBNE KONTAKT & BEDE OM NOGET (6) ---
    {
        num: 1,
        id: 'p1_undskyld_fremmed',
        phrase: 'Undskyld, må jeg spørge dig om noget?',
        shortLabel: 'Undskyld, må jeg...',
        pillar: 'kontakt',
        socialContext: 'Til fremmede på gaden, i bussen eller i butikken',
        intonation: 'Blødt, venligt "Undskyld" + stigende spørgetone ↗ og smil',
        x: 11.5,
        y: 36,
        pointerDir: 'down',
        bodyCue: 'Rejsende med blå rygsæk ved busstoppestedet til venstre, der hilser høfligt på en fremmed.',
        definition: 'Når du henvender dig til en person, du IKKE kender, åbner du altid med "Undskyld..." efterfulgt af et høfligt spørgsmål ("...må jeg spørge dig om noget?" / "...ved du hvor bussen holder?").',
        dialogueA: '<strong>Undskyld, må jeg spørge dig om noget?</strong> Ved du, hvor bussen til Aarhus C holder?',
        dialogueB: 'Ja da! Den holder lige rundt om hjørnet derovre.',
        trapTip: 'Brug KUN "Undskyld..." som samtalestarter til fremmede. Til kolleger og venner lyder "Undskyld" for formelt og stift!',
        videoRef: 'Video 1: At være høflig på dansk (7n3b8G1ZeC4 • 00:43–02:00) & Short (souhu5MhU28)',
        videoTab: 'tab_video_please',
        ttsText: 'Undskyld, må jeg spørge dig om noget? Ved du, hvor toilettet er?',
        ttsRate: 0.9,
        ttsPitch: 1.03
    },
    {
        num: 2,
        id: 'p2_forstyrre_kollega',
        phrase: 'Må jeg (lige) forstyrre dig et øjeblik?',
        shortLabel: 'Må jeg forstyrre...?',
        pillar: 'kontakt',
        socialContext: 'Til kolleger, undervisere eller folk du allerede kender',
        intonation: 'Varmt smil + blødt tryk på "forstyrre" og "øjeblik" ↗',
        x: 45,
        y: 13,
        pointerDir: 'down',
        bodyCue: 'Kvinden i orange blazer øverst midt-venstre, der smiler varmt til sin kollega ved laptoppen.',
        definition: 'Når du kender personen (fx en kollega på kontoret eller læreren på sprogskolen), dropper du ordet "Undskyld" og går direkte til et smil + "Må jeg lige forstyrre dig et øjeblik?".',
        dialogueA: '(Smiler ved skrivebordet) <strong>Må jeg lige forstyrre dig et øjeblik?</strong>',
        dialogueB: 'Ja, selvfølgelig! Hvad tænker du på?',
        trapTip: 'Småordet "lige" gør spørgsmålet ekstra blødt og signalerer, at det kun tager kort tid.',
        videoRef: 'Video 1: At være høflig på dansk (7n3b8G1ZeC4 • 02:01–02:47)',
        videoTab: 'tab_video_please',
        ttsText: 'Må jeg lige forstyrre dig et øjeblik?',
        ttsRate: 0.92,
        ttsPitch: 1.04
    },
    {
        num: 3,
        id: 'p3_gerne_bede_om',
        phrase: 'Jeg vil gerne bede om...',
        shortLabel: 'Jeg vil gerne bede om...',
        pillar: 'kontakt',
        socialContext: 'Når du bestiller i bageren, på café eller i en butik',
        intonation: 'Tydeligt tryk på "gerne" og blødt "bede om" [be’ om]',
        x: 21.5,
        y: 18,
        pointerDir: 'down',
        bodyCue: 'Kunden ved bagermontren øverst til venstre, der peger på to croissanter med et smil.',
        definition: 'Danskernes vigtigste erstatning for "please", når man køber eller bestiller noget. Kombinationen af "vil gerne" + "bede om" gør bestillingen varm, respektfuld og 100 % naturlig på dansk.',
        dialogueA: 'Hej! <strong>Jeg vil gerne bede om</strong> to croissanter og en kop filterkaffe.',
        dialogueB: 'Det kan du tro! Skal det være til at tage med?',
        trapTip: 'Sig ALDRIG "Jeg vil have..." i en butik eller café på dansk – det lyder krævende og uhøfligt som et lille barn!',
        videoRef: 'Video 3: At være høflig på dansk (crsbmifVWuU • 00:22)',
        videoTab: 'tab_video_please',
        ttsText: 'Jeg vil gerne bede om to croissanter.',
        ttsRate: 0.9,
        ttsPitch: 1.02
    },
    {
        num: 4,
        id: 'p4_maa_jeg_bede_om',
        phrase: 'Må jeg bede om kvitteringen / bonen?',
        shortLabel: 'Må jeg bede om...?',
        pillar: 'kontakt',
        socialContext: 'Ved kassen i supermarkedet, bageren eller ved middagsbordet ("Må jeg bede om saltet?")',
        intonation: 'Venlig spørgetone ↗ med blødt d i "bede" [må jeg be’ om]',
        x: 30.5,
        y: 31,
        pointerDir: 'down',
        bodyCue: 'Kunden i grøn trøje med bonen i hånden foran kasseapparatet til venstre.',
        definition: '"Må jeg bede om..." bruges både i butikker ("Må jeg bede om bonen/kvitteringen?") og ved spisebordet ("Må jeg bede om vandet?"). Det fungerer præcis som "May I please have...".',
        dialogueA: 'Tak! <strong>Må jeg bede om kvitteringen?</strong>',
        dialogueB: 'Ja, værsgo – den er lige her.',
        trapTip: 'På dansk hedder kvitteringen i supermarkedet og bageren ofte "bonen" [bʌnən].',
        videoRef: 'Video 3: At være høflig på dansk (crsbmifVWuU • 00:45)',
        videoTab: 'tab_video_please',
        ttsText: 'Må jeg bede om kvitteringen?',
        ttsRate: 0.9,
        ttsPitch: 1.03
    },
    {
        num: 5,
        id: 'p5_skulle_tilfaeldigvis',
        phrase: 'Skulle du tilfældigvis have en..., jeg må låne?',
        shortLabel: 'Skulle du tilfældigvis...',
        pillar: 'kontakt',
        socialContext: 'Når du ekstra høfligt vil låne noget af en kollega, klassekammerat eller nabo',
        intonation: '"Skulle" udtales i talesprog kort som [sku’] + venligt stigende tone ↗',
        x: 37.5,
        y: 37,
        pointerDir: 'down',
        bodyCue: 'Manden i blå trøje ved arbejdsbordet i midten, der rækker hånden høfligt frem mod kuglepennene.',
        definition: 'Når danskere vil gøre et spørgsmål ekstra høfligt, bruger vi datids-modalverbet "skulle" (udtalt "sku\'") sammen med "tilfældigvis". Det giver modtageren en nem udvej, hvis de ikke har tingen.',
        dialogueA: '<strong>Skulle du tilfældigvis have en kuglepen, jeg må låne?</strong>',
        dialogueB: 'Ja da, du kan bare tage den blå her på bordet!',
        trapTip: 'Almindeligt høfligt: "Må jeg låne din kuglepen?" — Ekstra høfligt: "Skulle du tilfældigvis have en kuglepen, jeg må låne?".',
        videoRef: 'Video 2: At være høflig på dansk (oOC-HES6Hk4 • 01:14–01:45)',
        videoTab: 'tab_video_please',
        ttsText: 'Skulle du tilfældigvis have en kuglepen, jeg må låne?',
        ttsRate: 0.9,
        ttsPitch: 1.02
    },
    {
        num: 6,
        id: 'p6_skulle_vel_ikke',
        phrase: 'Du skulle vel ikke have set mine briller?',
        shortLabel: 'Du skulle vel ikke...?',
        pillar: 'kontakt',
        socialContext: 'Når du høfligt spørger efter noget, du leder efter eller håber, den anden ved',
        intonation: 'Blødt "sku\' vel ik\'" med spørgende slutning ↗',
        x: 48.5,
        y: 39,
        pointerDir: 'down',
        bodyCue: 'Kollegaen ved bordet i midten, der klapper sine lommer og leder efter brillerne på bordet.',
        definition: 'En ægte dansk høflighedsklassiker! Ved at spørge negativt med "skulle + vel ikke" lægger du nul pres på den anden. Fordi spørgsmålet indeholder "ikke", svarer man "Nej" eller "Jo!" (aldrig "Ja").',
        dialogueA: '<strong>Du skulle vel ikke have set mine briller?</strong>',
        dialogueB: '<strong>Jo!</strong> De ligger lige der på bordet foran dig.',
        trapTip: 'Husk reglen fra Ja/Jo-videoen: Fordi der er "ikke" i "Du skulle vel ikke...", skal et positivt svar altid starte med "Jo!".',
        videoRef: 'Video 2: At være høflig på dansk (oOC-HES6Hk4 • 01:46–02:06)',
        videoTab: 'tab_video_please',
        ttsText: 'Du skulle vel ikke have set mine briller?',
        ttsRate: 0.9,
        ttsPitch: 1.03
    },

    // --- SØJLE 2: BLØDGØRE, HJÆLPE & INVITERE (5) ---
    {
        num: 7,
        id: 'p7_vaere_soed_at',
        phrase: 'Vil du være sød at hjælpe mig med...?',
        shortLabel: 'Vil du være sød at...?',
        pillar: 'bloedgoer',
        socialContext: 'Når du beder en kollega, ven eller medarbejder om en konkret tjeneste',
        intonation: 'Varmt tonefald med tryk på "sød" og "hjælpe" ↗',
        x: 50.5,
        y: 24,
        pointerDir: 'up',
        bodyCue: 'Kollegaen ved den bærbare computer øverst midt-venstre, der hjælper med et dokument.',
        definition: '"Vil du være sød at..." (eller lidt kortere: "Vil du hjælpe mig med en ting?") er en varm og anerkendende måde at bede om hjælp på – både på arbejdspladsen og derhjemme.',
        dialogueA: '<strong>Vil du være sød at hjælpe mig med</strong> at tjekke den her mail på dansk?',
        dialogueB: 'Ja, selvfølgelig! Lad mig lige se på den.',
        trapTip: 'Til tætte venner og familie kan du også bare sige "Kan du lukke vinduet?", men på jobbet er "Vil du..." eller "Vil du være sød at..." meget bedre.',
        videoRef: 'Video 2: At være høflig på dansk (oOC-HES6Hk4 • 00:48 & 02:07)',
        videoTab: 'tab_video_please',
        ttsText: 'Vil du være sød at hjælpe mig med en ting?',
        ttsRate: 0.9,
        ttsPitch: 1.04
    },
    {
        num: 8,
        id: 'p8_bare_lige_spoergsmaal',
        phrase: 'Jeg har bare / lige et spørgsmål til',
        shortLabel: 'Bare / lige et spørgsmål',
        pillar: 'bloedgoer',
        socialContext: 'Til møder, i undervisningen eller hos lægen/kommunen, når du vil spørge om én ting mere',
        intonation: 'Blødt, afdæmpet tonefald hvor "bare" eller "lige" beroliger lytteren →',
        x: 44.5,
        y: 61,
        pointerDir: 'down',
        bodyCue: 'Kvinden i hvid skjorte ved flipover-tavlen i midten, der løfter én finger venligt.',
        definition: 'Småordene "bare" og "lige" fungerer som dansk høfligheds-balsam: De viser, at du ikke vil tage hele mødet, men kun har et hurtigt, lille ekstraspørgsmål.',
        dialogueA: 'Inden vi slutter – <strong>jeg har bare lige et spørgsmål til!</strong>',
        dialogueB: 'Ja, endelig! Spørg bare.',
        trapTip: 'Du kan bruge enten "bare", "lige" eller begge to sammen ("bare lige") til at gøre sætningen ubesværet.',
        videoRef: 'Video 3: At være høflig på dansk (crsbmifVWuU • 01:33)',
        videoTab: 'tab_video_please',
        ttsText: 'Jeg har bare lige et spørgsmål til.',
        ttsRate: 0.92,
        ttsPitch: 1.02
    },
    {
        num: 9,
        id: 'p9_hvad_kan_jeg_hjaelpe',
        phrase: 'Hvad kan jeg hjælpe dig med? / Hvad kan jeg gøre for dig?',
        shortLabel: 'Hvad kan jeg hjælpe med?',
        pillar: 'bloedgoer',
        socialContext: 'Når du arbejder i service/butik, tager telefonen eller tager imod en kollega ved dit bord',
        intonation: 'Åbent, imødekommende tonefald med tryk på "hjælpe" eller "gøre" ↘',
        x: 29.5,
        y: 8,
        pointerDir: 'down',
        bodyCue: 'Bageren i forklæde bag disken øverst til venstre, der tager smilende imod kunden.',
        definition: 'Den klassiske høflige åbning, når nogen henvender sig til dig i en butik, i receptionen eller på kontoret. Viser med det samme, at du er klar og imødekommende.',
        dialogueA: 'Hej og velkommen! <strong>Hvad kan jeg hjælpe dig med i dag?</strong>',
        dialogueB: 'Hej! Jeg vil gerne bede om to rundstykker med ost.',
        trapTip: 'Både "Hvad kan jeg hjælpe (dig) med?" og "Hvad kan jeg gøre for dig?" er lige høflige og almindelige.',
        videoRef: 'Video 3: At være høflig på dansk (crsbmifVWuU • 01:03–01:32)',
        videoTab: 'tab_video_please',
        ttsText: 'Hvad kan jeg hjælpe dig med?',
        ttsRate: 0.92,
        ttsPitch: 1.05
    },
    {
        num: 10,
        id: 'p10_du_siger_bare_til',
        phrase: 'Du siger bare til, hvis du har brug for hjælp (en hånd)!',
        shortLabel: 'Du siger bare til!',
        pillar: 'bloedgoer',
        socialContext: 'Når du tilbyder din hjælp til en ven (fx ved flytning) eller en ny kollega',
        intonation: 'Varmt, uformelt og opmuntrende med tryk på "siger bare til" ↗',
        x: 88,
        y: 64,
        pointerDir: 'down',
        bodyCue: 'Vennen i orange trøje nederst til højre, der rækker hænderne frem for at hjælpe med flyttekassen.',
        definition: 'På dansk elsker vi at tilbyde hjælp med udtrykket "Du siger bare til..." eller "Sig til, hvis du har brug for en hånd!". Det viser omsorg uden at presse hjælpen ned over hovedet på den anden.',
        dialogueA: 'Jeg skal flytte i ny lejlighed på lørdag.',
        dialogueB: 'Fedt! <strong>Du siger bare til, hvis du har brug for en ekstra hånd med flytningen!</strong>',
        trapTip: '"En hånd" eller "en ekstra hånd" er det mest brugte hverdagsudtryk for praktisk hjælp på dansk.',
        videoRef: 'Video 3 (crsbmifVWuU • 02:13) & Short: At tilbyde sin hjælp (OsSuUzENs4U)',
        videoTab: 'tab_video_shorts',
        ttsText: 'Du siger bare til, hvis du har brug for en ekstra hånd!',
        ttsRate: 0.92,
        ttsPitch: 1.04
    },
    {
        num: 11,
        id: 'p11_kom_bare_ind',
        phrase: 'Kom bare ind, det er jo koldt!',
        shortLabel: 'Kom bare ind!',
        pillar: 'bloedgoer',
        socialContext: 'Når du byder gæster velkommen ved hoveddøren eller inviterer en kollega ind på kontoret',
        intonation: 'Varmt og gæstfrit med tryk på "Kom bare ind"',
        x: 87.5,
        y: 11,
        pointerDir: 'down',
        bodyCue: 'Værten i gul trøje ved den åbne hoveddør øverst til højre, der byder den frysende gæst indenfor.',
        definition: 'Når man giver lov eller inviterer nogen indenfor på dansk, gør småordet "bare" invitationen varm og afslappet ("Kom bare ind!", "Sæt dig bare ned!"), mens "jo" skaber fælles forståelse.',
        dialogueA: '(Ringer på døren i blæsevejr) Hej!',
        dialogueB: 'Hej! <strong>Kom bare ind, det er jo koldt derude!</strong>',
        trapTip: 'Uden "bare" kan bydeformen ("Kom ind!") lyde som en ordre – med "bare" ("Kom bare ind!") bliver det en varm invitation!',
        videoRef: 'Video 3: At være høflig på dansk (crsbmifVWuU • 01:51)',
        videoTab: 'tab_video_please',
        ttsText: 'Kom bare ind, det er jo koldt!',
        ttsRate: 0.92,
        ttsPitch: 1.05
    },

    // --- SØJLE 3: TAKKE & SVARE PÅ TAK (6) ---
    {
        num: 12,
        id: 'p12_tusind_tak_hjaelpen',
        phrase: 'Tusind tak for hjælpen! (Mange tak for din tid / oplysningen)',
        shortLabel: 'Tusind tak for hjælpen!',
        pillar: 'tak',
        socialContext: 'Når nogen har hjulpet dig, givet dig svar i telefonen eller brugt tid på et møde',
        intonation: 'Begejstret tryk på "Tusind" (eller "Mange") + "hjælpen"',
        x: 43,
        y: 92,
        pointerDir: 'up',
        bodyCue: 'Kollegaen i mørkeblå trøje nederst midt-venstre, der modtager mappen med et taknemmeligt smil.',
        definition: 'Danskere siger sjældent kun et kort "Tak" – vi sætter næsten altid "for + det vi takker for" bagefter (fx "Tak for hjælpen", "Tak for oplysningen", "Tak for din tid") og forstærker med "Mange tak" eller "Tusind tak".',
        dialogueA: 'Værsgo, nu har jeg rettet tallene i rapporten for dig.',
        dialogueB: '<strong>Tusind tak for hjælpen!</strong> Det reddede virkelig min dag.',
        trapTip: 'I telefonen med kundeservice eller receptionen siger danskere næsten altid: "Tak for oplysningen!" eller "Tak for hjælpen!".',
        videoRef: 'Video 4: At være høflig på dansk (vuepGzOIN9M • 00:55–02:15)',
        videoTab: 'tab_video_tak',
        ttsText: 'Tusind tak for hjælpen!',
        ttsRate: 0.92,
        ttsPitch: 1.06
    },
    {
        num: 13,
        id: 'p13_det_var_saa_lidt',
        phrase: 'Det var så lidt! / Selv tak! (Ingen årsag)',
        shortLabel: 'Det var så lidt! / Selv tak!',
        pillar: 'tak',
        socialContext: 'Dit høflige svar, hver gang nogen siger "Tak for hjælpen" til dig',
        intonation: 'Venligt, let og afvæbnende tonefald ↗',
        x: 13.5,
        y: 29,
        pointerDir: 'down',
        bodyCue: 'Den lokale i brun jakke ved busstoppestedet til venstre, der smilende har vist vej.',
        definition: 'En samtale fungerer først, når man også kan svare på et tak! Når du har hjulpet nogen, svarer du "Det var så lidt" (eller kort: "Så lidt"), "Selv tak", "Det var ikke noget" eller lidt mere formelt "Ingen årsag".',
        dialogueA: 'Mange tak for hjælpen med at finde bussen!',
        dialogueB: '<strong>Det var så lidt!</strong> God tur til Aarhus.',
        trapTip: '"Selv tak" bruges især, når begge parter har haft glæde af samtalen eller mødet!',
        videoRef: 'Video 5: Tak på dansk (CgTKqch-38c • 00:02–00:43 & 02:19–02:59)',
        videoTab: 'tab_video_tak',
        ttsText: 'Det var så lidt! Selv tak!',
        ttsRate: 0.92,
        ttsPitch: 1.05
    },
    {
        num: 14,
        id: 'p14_tak_for_mad',
        phrase: 'Tak for mad! ↔ Velbekomme!',
        shortLabel: 'Tak for mad! ↔ Velbekomme!',
        pillar: 'tak',
        socialContext: 'Efter hvert fælles måltid i Danmark (hjemme, hos venner og i kantinen)',
        intonation: 'Varmt "Tak for mad!" efterfulgt af værtens "Velbekomme!"',
        x: 61,
        y: 20,
        pointerDir: 'down',
        bodyCue: 'Gæsterne ved det opdækkede middagsbord med stearinlys øverst midt-højre.',
        definition: 'En fast dansk høflighedstradition efter måltidet: Gæsterne (eller familien) siger altid "Tak for mad – det smagte rigtig godt!", og den, der har lavet eller serveret maden, svarer "Velbekomme!".',
        dialogueA: '<strong>Tak for mad!</strong> Det smagte virkelig dejligt.',
        dialogueB: '<strong>Velbekomme!</strong> Hvor er jeg glad for, at I kunne lide det.',
        trapTip: 'Glemmer man at sige "Tak for mad", når man rejser sig fra bordet i et dansk hjem, bemærkes det med det samme!',
        videoRef: 'Video 4 (vuepGzOIN9M • 00:38) & Short: Tak for mad (MIRp8lGdOgc)',
        videoTab: 'tab_video_tak',
        ttsText: 'Tak for mad, det smagte rigtig godt! Velbekomme!',
        ttsRate: 0.9,
        ttsPitch: 1.04
    },
    {
        num: 15,
        id: 'p15_tak_for_i_aften',
        phrase: 'Tak for i aften! ↔ Tak for besøget! (Tak fordi I kunne komme)',
        shortLabel: 'Tak for i aften / besøget',
        pillar: 'tak',
        socialContext: 'I entréen ved hoveddøren, når gæsterne tager hjem fra middag eller besøg',
        intonation: 'Hjerteligt afskedstonefald med gensidig tak ↗',
        x: 88,
        y: 39,
        pointerDir: 'down',
        bodyCue: 'Gæsterne i frakker ved stumtjeneren i entréen til højre, der vinker farvel.',
        definition: 'Den danske afskeds-duet i døren! GÆSTEN siger "Tak for i aften!" (eller om dagen: "Tak for i dag!"), og VÆRTEN svarer "Tak for besøget!" eller "Tak fordi du/I kunne komme!".',
        dialogueA: 'Gæst: <strong>Tusind tak for i aften!</strong> Det har været så hyggeligt.',
        dialogueB: 'Vært: <strong>Selv tak – og tak for besøget!</strong> Kom godt hjem.',
        trapTip: 'Husk rollefordelingen: Gæsten siger "Tak for i aften", og værten siger "Tak for besøget"!',
        videoRef: 'Video 4 (vuepGzOIN9M • 00:17–00:37) & Tak på dansk (CgTKqch-38c • 00:44–01:20)',
        videoTab: 'tab_video_tak',
        ttsText: 'Tusind tak for i aften! Tak for besøget, og tak fordi I kunne komme!',
        ttsRate: 0.9,
        ttsPitch: 1.04
    },
    {
        num: 16,
        id: 'p16_tak_for_i_aftes_sidst',
        phrase: 'Tak for i aftes! / Tak for sidst! (ALDRIG "Tak for i nat!")',
        shortLabel: 'Tak for i aftes / sidst!',
        pillar: 'tak',
        socialContext: 'Når du møder en kollega eller ven dagen efter en fest – eller næste gang I ses',
        intonation: 'Glædeligt gensyns-tonefald ved kaffemaskinen ↗',
        x: 36,
        y: 70,
        pointerDir: 'down',
        bodyCue: 'Kollegaen med den gule kaffekop ved espressomaskinen nederst midt-venstre.',
        definition: 'En unik dansk høflighedsskik: Når du ser eller skriver til folk dagen efter en fest eller middag, siger du "Tak for i aftes!" eller "Tak for i går!". Og næste gang I mødes (efter dage, uger eller måneder), indleder man altid med "Tak for sidst!".',
        dialogueA: 'Godmorgen! <strong>Tak for i aftes (Tak for sidst)!</strong> Det var en rigtig sjov fest.',
        dialogueB: '<strong>Selv tak!</strong> Ja, det var super hyggeligt.',
        trapTip: 'KÆMPE FÆLDE: Sig ALDRIG "Tak for i nat!" til en kollega! På dansk betyder "Tak for i nat" kun, at man har sovet sammen i samme seng!',
        videoRef: 'Video 6: Tak for i aftes - ikke tak for i nat! (2mamV0pAl1c • 00:00–01:49)',
        videoTab: 'tab_video_tak',
        ttsText: 'Godmorgen og tak for i aftes! Tak for sidst, det var rigtig hyggeligt!',
        ttsRate: 0.9,
        ttsPitch: 1.05
    },
    {
        num: 17,
        id: 'p17_tak_for_laan_skal_du_have',
        phrase: 'Tak for lån! / Tak skal du have! (Ej, hvor er du sød!)',
        shortLabel: 'Tak for lån / skal du have',
        pillar: 'tak',
        socialContext: 'Når du afleverer noget lånt tilbage, modtager en ting/gave eller får en kompliment',
        intonation: 'Varmt tryk på "lån" eller "Tak skal du have" [tak ska’ du ha’]',
        x: 64,
        y: 67,
        pointerDir: 'down',
        bodyCue: 'De to venner i den grønne sofa nederst midt-højre, der afleverer en lånt bog tilbage.',
        definition: 'Når du afleverer en bog, kuglepen eller cykel tilbage, siger du altid "Tak for lån!". Når nogen rækker dig noget, giver dig en gave eller en kompliment, siger du "Tak skal du have!" eller "Ej, tusind tak – hvor er du sød!".',
        dialogueA: 'Her er din bog tilbage – <strong>tusind tak for lån!</strong>',
        dialogueB: 'Selv tak! Håber du kunne bruge den.',
        trapTip: 'Ved en kompliment ("Sikke en flot trøje!") er "Tak skal du have!" eller "Ej, tusind tak – hvor er du sød!" det mest naturlige svar.',
        videoRef: 'Video 4 (vuepGzOIN9M • 00:45 & 01:18), Tak på dansk (CgTKqch-38c • 01:58) & Short (rg1F1LrX4Og)',
        videoTab: 'tab_video_tak',
        ttsText: 'Her er bogen tilbage, tusind tak for lån! Tak skal du have!',
        ttsRate: 0.9,
        ttsPitch: 1.04
    },

    // --- SØJLE 4: HØFLIGE AFSLAG, UNDSKYLD & AFTALER (3) ---
    {
        num: 18,
        id: 'p18_ellers_tak_springer_over',
        phrase: 'Nej tak / Ellers tak! (Uformelt: Der springer jeg lige over!)',
        shortLabel: 'Ellers tak! / Springer over',
        pillar: 'afslag',
        socialContext: 'Når du høfligt siger nej tak til mere kaffe/mad eller afslår et forslag blandt venner/kolleger',
        intonation: 'Varmt, venligt "Ellers tak!" med smil og flad hånd over koppen',
        x: 74,
        y: 31,
        pointerDir: 'down',
        bodyCue: 'Gæsten i grøn trøje til højre ved middagsbordet, der løfter hånden venligt, da værten tilbyder mere kaffe.',
        definition: '"Ellers tak" er danskernes ekstra høflige måde at sige "Nej tak" på, når nogen tilbyder noget godt ("Vil du have en kop kaffe mere?" → "Ellers tak, jeg har fint!"). Blandt kolleger og venner bruges også de lune afslag "Der springer jeg lige over!" eller "Den melder jeg lige pas på!".',
        dialogueA: 'Skal du have en kop kaffe mere – eller måske en snaps?',
        dialogueB: '<strong>Ellers tak!</strong> (Eller med et grin:) <strong>Der springer jeg lige over</strong> i dag!',
        trapTip: '"Ellers tak" betyder "Nej tak, men tak fordi du spurgte!" – et nøgent "Nej" uden "tak" lyder meget hårdt ved et dansk bord.',
        videoRef: 'Video 7: Nej på forskellige måder på dansk (KMxHfOnstys • 00:05–00:54)',
        videoTab: 'tab_video_afslag',
        ttsText: 'Ellers tak, jeg har fint! Der springer jeg lige over i dag.',
        ttsRate: 0.9,
        ttsPitch: 1.03
    },
    {
        num: 19,
        id: 'p19_det_maa_du_undskylde',
        phrase: 'Årh nej, undskyld! Det må du undskylde – skal jeg ikke hente en ny?',
        shortLabel: 'Det må du undskylde!',
        pillar: 'afslag',
        socialContext: 'Når du kommer til at vælte noget, støde ind i nogen eller lave en fejl',
        intonation: 'Medfølende "Årh nej!" + opreklamerende "Skal jeg ikke...?" ↗',
        x: 13.5,
        y: 63,
        pointerDir: 'down',
        bodyCue: 'Personen ved det runde cafébord nederst til venstre, der er kommet til at vælte den gule kaffekop.',
        definition: 'Når der sker et uheld (fx du vælter en vens kaffekop), kombinerer danskere dialoglyden "Årh nej, undskyld!" med den helhjertede undskyldning "Det må du undskylde!" og tilbyder straks at gøre det godt igen: "Skal jeg ikke købe/hente noget nyt til dig?".',
        dialogueA: '<strong>Årh nej, undskyld! Det må du virkelig undskylde! Skal jeg ikke hente en ny kop kaffe til dig?</strong>',
        dialogueB: 'Det gør slet ikke noget – bare rolig, vi tørrer det lige op.',
        trapTip: 'Læg mærke til konstruktionen "Skal jeg ikke hente...?" – på dansk bruges "Skal jeg ikke...?" som et ekstra høfligt tilbud!',
        videoRef: 'Short: At vælte nogens ting (Ao5qVV11oRw • 00:00–00:35)',
        videoTab: 'tab_video_shorts',
        ttsText: 'Årh nej, undskyld! Det må du undskylde. Skal jeg ikke hente noget nyt til dig?',
        ttsRate: 0.92,
        ttsPitch: 1.04
    },
    {
        num: 20,
        id: 'p20_forsinket_du_maa_hilse',
        phrase: 'Undskyld, jeg bliver 5 minutter forsinket! (+ Afsked: Du må hilse!)',
        shortLabel: 'Forsinket & Du må hilse!',
        pillar: 'afslag',
        socialContext: 'Dansk tid- og aftalehøflighed (giv altid besked ved forsinkelse!) samt varm hilsen ved afsked',
        intonation: 'Respektfuld besked ved forsinkelse + varmt "Du må hilse derhjemme!" ved farvel',
        x: 86.5,
        y: 77,
        pointerDir: 'down',
        bodyCue: 'Pendleren i blå jakke nederst til højre, der kigger på sit armbåndsur og sender en hurtig besked.',
        definition: 'I Danmark er punktlighed en grundpille i høflighed: Kommer du bare 5–10 minutter for sent, forventes det altid, at du skriver eller ringer ("Undskyld, jeg er 5 minutter forsinket!"). Og når man skilles, slutter man ofte varmt med "Du må hilse (derhjemme)!".',
        dialogueA: '(På SMS kl. 13:58 til en kl. 14:00-aftale) <strong>Undskyld, bussen driller – jeg bliver 5 minutter forsinket!</strong>',
        dialogueB: 'Helt i orden, tak fordi du giver besked! Vi ses lige om lidt.',
        trapTip: 'I Danmark dukker man heller ikke uanmeldt op ved folks hoveddør – det er høflig skik altid at lave en aftale på forhånd.',
        videoRef: 'Video 8: Hvad er uhøfligt i Danmark? (TsJvoWA6AdU) & Short: At sende en hilsen (UFjPoZKgJR0)',
        videoTab: 'tab_video_afslag',
        ttsText: 'Undskyld, jeg bliver fem minutter forsinket! Og du må hilse derhjemme!',
        ttsRate: 0.9,
        ttsPitch: 1.03
    }
];

// =========================================================================
// FANE 2 (DEL 1): 20 SOCIALE KONTEKST-OPGAVER ("INDSÆT DET RIGTIGE UDTRYK")
// =========================================================================
const SOCIAL_CONTEXT_CHALLENGES = [
    {
        num: 1,
        pillar: 'kontakt',
        setting: 'På gaden i en ny by (Til en fremmed)',
        contextDesc: 'Du står ved busstoppestedet og er i tvivl om, hvor bussen til Aarhus C holder. Du henvender dig til en fremmed person, du aldrig har mødt før.',
        speakerA: 'Dig (til fremmed): "[ ___ ] Ved du, hvor bussen til Aarhus C holder?"',
        speakerB: 'Fremmed: "Ja, den holder lige derovre på den anden side af gaden!"',
        answerId: 'p1_undskyld_fremmed',
        options: [
            { id: 'p1_undskyld_fremmed', text: 'Undskyld, må jeg spørge dig om noget?' },
            { id: 'p2_forstyrre_kollega', text: 'Du siger bare til, hvis du har brug for en hånd!' },
            { id: 'p18_ellers_tak_springer_over', text: 'Der springer jeg lige over!' },
            { id: 'p16_tak_for_i_aftes_sidst', text: 'Tak for i aftes!' }
        ],
        explanation: 'Til en fremmed person på gaden åbner man altid høfligt med "Undskyld..." efterfulgt af et spørgsmål med modalverbum ("...må jeg spørge dig om noget?").'
    },
    {
        num: 2,
        pillar: 'kontakt',
        setting: 'På kontoret / sprogskolen (Til en kollega du kender)',
        contextDesc: 'Din kollega Mette sidder ved sin computer. I kender hinanden godt, og du vil høfligt stille hende et hurtigt fagligt spørgsmål.',
        speakerA: 'Dig (smiler til kollega): "[ ___ ]"',
        speakerB: 'Mette: "Ja, selvfølgelig! Hvad kan jeg hjælpe med?"',
        answerId: 'p2_forstyrre_kollega',
        options: [
            { id: 'p2_forstyrre_kollega', text: 'Må jeg lige forstyrre dig et øjeblik?' },
            { id: 'p1_undskyld_fremmed', text: 'Undskyld, ved du hvor toilettet er?' },
            { id: 'p14_tak_for_mad', text: 'Tak for mad!' },
            { id: 'p13_det_var_saa_lidt', text: 'Ingen årsag!' }
        ],
        explanation: 'Som Mette forklarer i Video 1: Til kolleger og folk, du kender, bruger man IKKE "Undskyld" først (det lyder for stift/formelt). Man smiler og går direkte til "Må jeg lige forstyrre dig et øjeblik?".'
    },
    {
        num: 3,
        pillar: 'kontakt',
        setting: 'Hos bageren søndag morgen',
        contextDesc: 'Det er din tur ved disken hos bageren, og du vil bestille to croissanter på naturligt, høfligt dansk (i stedet for engelsk "please").',
        speakerA: 'Bageren: "Godmorgen! Hvad skulle det være?"',
        speakerB: 'Dig: "Godmorgen! [ ___ ] to croissanter."',
        answerId: 'p3_gerne_bede_om',
        options: [
            { id: 'p3_gerne_bede_om', text: 'Jeg vil gerne bede om' },
            { id: 'w_vil_have', text: 'Jeg vil have' },
            { id: 'p6_skulle_vel_ikke', text: 'Du skulle vel ikke have set' },
            { id: 'p18_ellers_tak_springer_over', text: 'Ellers tak til' }
        ],
        explanation: '"Jeg vil gerne bede om..." er danskernes faste, høflige bestillingsfrase i bageren og caféen. "Jeg vil have..." opleves som uhøfligt og krævende!'
    },
    {
        num: 4,
        pillar: 'kontakt',
        setting: 'Ved kassen i supermarkedet',
        contextDesc: 'Du har lige betalt med kort i butikken, og du har brug for bonen til dit regnskab.',
        speakerA: 'Ekspedienten: "Så er betalingen gået igennem."',
        speakerB: 'Dig: "Tak! [ ___ ]"',
        answerId: 'p4_maa_jeg_bede_om',
        options: [
            { id: 'p4_maa_jeg_bede_om', text: 'Må jeg bede om kvitteringen / bonen?' },
            { id: 'p11_kom_bare_ind', text: 'Kom bare ind, det er jo koldt!' },
            { id: 'p15_tak_for_i_aften', text: 'Tak for besøget!' },
            { id: 'p10_du_siger_bare_til', text: 'Du siger bare til!' }
        ],
        explanation: '"Må jeg bede om kvitteringen (eller bonen)?" bruger det høflige udtryk "bede om" som dansk ækvivalent til "May I please have the receipt?".'
    },
    {
        num: 5,
        pillar: 'kontakt',
        setting: 'Til møde med nye samarbejdspartnere (Ekstra høfligt lån)',
        contextDesc: 'Du sidder til et møde og opdager, at du har glemt en kuglepen. Du vil spørge personen ved siden af dig på en ekstra høflig og blød måde.',
        speakerA: 'Dig: "[ ___ ]"',
        speakerB: 'Sidemand: "Ja da, værsgo – jeg har to i tasken!"',
        answerId: 'p5_skulle_tilfaeldigvis',
        options: [
            { id: 'p5_skulle_tilfaeldigvis', text: 'Skulle du tilfældigvis have en kuglepen, jeg må låne?' },
            { id: 'w_giv_mig', text: 'Giv mig lige din kuglepen nu.' },
            { id: 'p14_tak_for_mad', text: 'Velbekomme med kuglepennen!' },
            { id: 'p16_tak_for_i_aftes_sidst', text: 'Tak for i nat!' }
        ],
        explanation: 'Datidsformen "Skulle du..." [sku’ du] kombineret med "tilfældigvis" gør låne-spørgsmålet ekstra høfligt og uforpligtende.'
    },
    {
        num: 6,
        pillar: 'kontakt',
        setting: 'I frokoststuen – når du leder efter noget',
        contextDesc: 'Du leder efter dine briller på fællesbordet og vil høfligt høre, om din kollega måske har lagt mærke til dem.',
        speakerA: 'Dig: "[ ___ ]"',
        speakerB: 'Kollega: "Jo! De ligger lige ved siden af kaffemaskinen."',
        answerId: 'p6_skulle_vel_ikke',
        options: [
            { id: 'p6_skulle_vel_ikke', text: 'Du skulle vel ikke have set mine briller?' },
            { id: 'p3_gerne_bede_om', text: 'Jeg vil gerne bede om dine briller.' },
            { id: 'p12_tusind_tak_hjaelpen', text: 'Tak for oplysningen om mine briller!' },
            { id: 'p18_ellers_tak_springer_over', text: 'Den melder jeg lige pas på!' }
        ],
        explanation: '"Du skulle vel ikke have set...?" er den klassiske ekstra høflige spørgeform på dansk (og læg mærke til, at kollegaen svarer "Jo!", fordi spørgsmålet indeholder "ikke").'
    },
    {
        num: 7,
        pillar: 'bloedgoer',
        setting: 'På arbejdspladsen – når du beder om en tjeneste',
        contextDesc: 'Du har brug for, at din kollega Anders hjælper dig i 2 minutter med at løfte en tung kasse printerpapir.',
        speakerA: 'Dig: "Hej Anders! [ ___ ] at flytte den her kasse?"',
        speakerB: 'Anders: "Ja, selvfølgelig – jeg tager fat i den ene ende!"',
        answerId: 'p7_vaere_soed_at',
        options: [
            { id: 'p7_vaere_soed_at', text: 'Vil du være sød at hjælpe mig med' },
            { id: 'p17_tak_for_laan_skal_du_have', text: 'Tusind tak for lån af' },
            { id: 'p18_ellers_tak_springer_over', text: 'Ellers tak til' },
            { id: 'p13_det_var_saa_lidt', text: 'Det var så lidt med' }
        ],
        explanation: '"Vil du være sød at hjælpe mig med..." er en varm, anerkendende og høflig måde at bede om en tjeneste på.'
    },
    {
        num: 8,
        pillar: 'bloedgoer',
        setting: 'Ved slutningen af en samtale eller et møde',
        contextDesc: 'Underviseren eller mødelederen er næsten færdig med at forklare noget, og du vil blødt skyde ét sidste lille spørgsmål ind.',
        speakerA: 'Dig (løfter en finger med et smil): "[ ___ ]"',
        speakerB: 'Underviser: "Ja, endelig – hvad tænker du på?"',
        answerId: 'p8_bare_lige_spoergsmaal',
        options: [
            { id: 'p8_bare_lige_spoergsmaal', text: 'Jeg har bare / lige et spørgsmål til.' },
            { id: 'p14_tak_for_mad', text: 'Tak for mad, det smagte godt!' },
            { id: 'p15_tak_for_i_aften', text: 'Tak for besøget i dag!' },
            { id: 'p18_ellers_tak_springer_over', text: 'Der springer jeg lige over!' }
        ],
        explanation: 'Småordene "bare" og "lige" nedtoner spørgsmålet, så det lyder venligt, hurtigt og ubesværet.'
    },
    {
        num: 9,
        pillar: 'bloedgoer',
        setting: 'I receptionen eller butikken (Når du tilbyder service)',
        contextDesc: 'En kunde eller gæst træder hen til din skranke på arbejdet. Hvad siger du høfligt for at tage imod personen?',
        speakerA: 'Dig: "Hej og velkommen! [ ___ ]"',
        speakerB: 'Gæst: "Hej! Jeg har en aftale med Henrik klokken 10."',
        answerId: 'p9_hvad_kan_jeg_hjaelpe',
        options: [
            { id: 'p9_hvad_kan_jeg_hjaelpe', text: 'Hvad kan jeg hjælpe dig med? (Hvad kan jeg gøre for dig?)' },
            { id: 'p6_skulle_vel_ikke', text: 'Du skulle vel ikke have set mine briller?' },
            { id: 'p17_tak_for_laan_skal_du_have', text: 'Tak for lån!' },
            { id: 'p18_ellers_tak_springer_over', text: 'Ellers tak!' }
        ],
        explanation: '"Hvad kan jeg hjælpe (dig) med?" eller "Hvad kan jeg gøre for dig?" er de to faste høflige åbninger i dansk service- og arbejdskultur.'
    },
    {
        num: 10,
        pillar: 'bloedgoer',
        setting: 'En god ven fortæller, at han skal flytte',
        contextDesc: 'Din ven fortæller på parkeringspladsen, at han skal flytte i næste weekend. Du vil gerne tilbyde din hjælp på ægte dansk manér.',
        speakerA: 'Din ven: "Puha, vi skal flytte alle kasserne på lørdag."',
        speakerB: 'Dig: "[ ___ ]"',
        answerId: 'p10_du_siger_bare_til',
        options: [
            { id: 'p10_du_siger_bare_til', text: 'Du siger bare til, hvis du har brug for en ekstra hånd med flytningen!' },
            { id: 'p4_maa_jeg_bede_om', text: 'Må jeg bede om kvitteringen på flytningen?' },
            { id: 'p14_tak_for_mad', text: 'Velbekomme med flytningen!' },
            { id: 'p16_tak_for_i_aftes_sidst', text: 'Tak for i aftes!' }
        ],
        explanation: '"Du siger bare til, hvis du har brug for hjælp / en ekstra hånd!" (eller "Skal jeg hjælpe dig med at flytte?") er den mest naturlige måde at tilbyde sin hjælp på.'
    },
    {
        num: 11,
        pillar: 'bloedgoer',
        setting: 'Ved hoveddøren en kold efterårsaften',
        contextDesc: 'Din gæst ringer på døren og står ude i kulden med halstørklæde på. Du åbner døren på vid gab.',
        speakerA: 'Gæst: "Hej! Dejligt at se dig."',
        speakerB: 'Dig (holder døren åben): "Hej! [ ___ ]"',
        answerId: 'p11_kom_bare_ind',
        options: [
            { id: 'p11_kom_bare_ind', text: 'Kom bare ind, det er jo koldt!' },
            { id: 'p18_ellers_tak_springer_over', text: 'Ellers tak, jeg springer lige over!' },
            { id: 'p4_maa_jeg_bede_om', text: 'Må jeg bede om bonen?' },
            { id: 'p20_forsinket_du_maa_hilse', text: 'Undskyld, jeg bliver 5 minutter forsinket!' }
        ],
        explanation: 'Småordet "bare" forvandler bydeformen "Kom ind" til en varm, gæstfri invitation, og "jo" skaber fælles bånd om, at det er koldt udenfor.'
    },
    {
        num: 12,
        pillar: 'tak',
        setting: 'Når en kollega eller kundeservice har hjulpet dig',
        contextDesc: 'Du har ringet til borgerservice eller spurgt en kollega til råds, og personen har lige brugt 5 minutter på at give dig et grundigt svar.',
        speakerA: 'Medarbejder: "...så du skal bare uploade skemaet inden fredag."',
        speakerB: 'Dig: "[ ___ ]"',
        answerId: 'p12_tusind_tak_hjaelpen',
        options: [
            { id: 'p12_tusind_tak_hjaelpen', text: 'Tusind tak for hjælpen! (Mange tak for oplysningen / din tid!)' },
            { id: 'p14_tak_for_mad', text: 'Tak for mad!' },
            { id: 'p17_tak_for_laan_skal_du_have', text: 'Tak for lån!' },
            { id: 'p13_det_var_saa_lidt', text: 'Det var så lidt!' }
        ],
        explanation: 'Som Video 4 viser, tilføjer danskere næsten altid HVAD de takker for efter "tak": "Tusind tak for hjælpen!", "Tak for oplysningen!" eller "Tak for din tid!".'
    },
    {
        num: 13,
        pillar: 'tak',
        setting: 'Når nogen takker DIG for hjælpen',
        contextDesc: 'Du har lige hjulpet en ny kollega med at finde det rigtige mødelokale. Kollegaen siger: "Tusind tak for hjælpen!". Hvad svarer du?',
        speakerA: 'Kollega: "Tusind tak for hjælpen!"',
        speakerB: 'Dig: "[ ___ ]"',
        answerId: 'p13_det_var_saa_lidt',
        options: [
            { id: 'p13_det_var_saa_lidt', text: 'Det var så lidt! / Selv tak! (Du siger bare til en anden gang)' },
            { id: 'p14_tak_for_mad', text: 'Velbekomme!' },
            { id: 'p17_tak_for_laan_skal_du_have', text: 'Tak for lån!' },
            { id: 'p3_gerne_bede_om', text: 'Jeg vil gerne bede om det!' }
        ],
        explanation: 'Når nogen takker dig for hjælp, fuldender du høflighedsudvekslingen ved at svare "Det var så lidt!", "Selv tak!", "Det var ikke noget" eller "Ingen årsag".'
    },
    {
        num: 14,
        pillar: 'tak',
        setting: 'Ved middagsbordet hos danske venner',
        contextDesc: 'I er lige blevet færdige med at spise aftensmad hjemme hos en dansk ven. Hvad siger du som gæst – og hvad svarer værten?',
        speakerA: 'Dig (som gæst): "[ ___ ]"',
        speakerB: 'Værten: "Velbekomme! Dejligt at det smagte."',
        answerId: 'p14_tak_for_mad',
        options: [
            { id: 'p14_tak_for_mad', text: 'Tak for mad, det smagte rigtig godt!' },
            { id: 'p16_tak_for_i_aftes_sidst', text: 'Tak for sidst!' },
            { id: 'p17_tak_for_laan_skal_du_have', text: 'Tak for lån af maden!' },
            { id: 'p12_tusind_tak_hjaelpen', text: 'Tak for oplysningen!' }
        ],
        explanation: '"Tak for mad!" (fra gæsten) og "Velbekomme!" (fra værten) er et uundværligt makkerpar ved ethvert dansk måltid.'
    },
    {
        num: 15,
        pillar: 'tak',
        setting: 'I entréen når gæsterne tager hjem (Værtens replik)',
        contextDesc: 'Du har haft gæster til middag. Nu står de i entréen med overtøjet på og siger: "Tusind tak for i aften!". Hvad svarer du som VÆRT?',
        speakerA: 'Gæsterne: "Tusind tak for i aften! Det har været så hyggeligt."',
        speakerB: 'Dig (som vært): "[ ___ ]"',
        answerId: 'p15_tak_for_i_aften',
        options: [
            { id: 'p15_tak_for_i_aften', text: 'Tak for besøget! Og tak fordi I kunne komme!' },
            { id: 'p14_tak_for_mad', text: 'Tak for mad!' },
            { id: 'p19_det_maa_du_undskylde', text: 'Det må I virkelig undskylde!' },
            { id: 'p4_maa_jeg_bede_om', text: 'Må jeg bede om kvitteringen?' }
        ],
        explanation: 'Husk rollefordelingen i Video 4 & 5: Gæsten siger "Tak for i aften", og værten svarer "Tak for besøget!" eller "Tak fordi du/I kunne komme!".'
    },
    {
        num: 16,
        pillar: 'tak',
        setting: 'Ved kaffemaskinen på jobbet dagen efter firmafesten',
        contextDesc: 'I går aftes var du til middag og fest med dine kolleger. Nu møder du din kollega Søren ved kaffemaskinen næste morgen. Pas på den berømte danske fælde!',
        speakerA: 'Dig (smiler med kaffekoppen): "Godmorgen Søren! [ ___ ]"',
        speakerB: 'Søren: "Selv tak! Ja, det var en rigtig sjov aften."',
        answerId: 'p16_tak_for_i_aftes_sidst',
        options: [
            { id: 'p16_tak_for_i_aftes_sidst', text: 'Tak for i aftes! / Tak for i går! (Eller senere: Tak for sidst!)' },
            { id: 'w_tak_for_i_nat', text: 'Tak for i nat!' },
            { id: 'p14_tak_for_mad', text: 'Velbekomme i nat!' },
            { id: 'p18_ellers_tak_springer_over', text: 'Ellers tak for i går!' }
        ],
        explanation: 'Dagen efter en aften sammen siger man "Tak for i aftes!" eller "Tak for i går!" (og næste gang man ses: "Tak for sidst!"). Sig ALDRIG "Tak for i nat!" til en kollega!'
    },
    {
        num: 17,
        pillar: 'tak',
        setting: 'Når du afleverer noget tilbage, du har lånt',
        contextDesc: 'Du har lånt en dansk roman af din veninde i en uge. Nu sidder I i sofaen, og du rækker bogen tilbage til hende.',
        speakerA: 'Dig (rækker bogen frem): "Værsgo, her er din bog – [ ___ ]"',
        speakerB: 'Veninde: "Det var så lidt! Hvad syntes du om den?"',
        answerId: 'p17_tak_for_laan_skal_du_have',
        options: [
            { id: 'p17_tak_for_laan_skal_du_have', text: 'tusind tak for lån!' },
            { id: 'p15_tak_for_i_aften', text: 'tak for besøget!' },
            { id: 'p12_tusind_tak_hjaelpen', text: 'tak for oplysningen!' },
            { id: 'p14_tak_for_mad', text: 'tak for mad!' }
        ],
        explanation: 'På dansk har vi det faste udtryk "Tak for lån!", som bruges hver eneste gang man afleverer en lånt ting (en bog, en kuglepen, en trailer) tilbage.'
    },
    {
        num: 18,
        pillar: 'afslag',
        setting: 'Når værten tilbyder dig en tredje kop kaffe (Høfligt afslag)',
        contextDesc: 'I sidder omkring bordet efter middagen. Værten kommer med termokanden og spørger: "Skal du have en kop kaffe mere?". Du har allerede drukket to kopper og vil høfligt sige nej.',
        speakerA: 'Værten: "Skal du have en lille tår kaffe mere?"',
        speakerB: 'Dig (smiler og holder en flad hånd let over koppen): "[ ___ ]"',
        answerId: 'p18_ellers_tak_springer_over',
        options: [
            { id: 'p18_ellers_tak_springer_over', text: 'Ellers tak! (Eller kollegialt: Der springer jeg lige over!)' },
            { id: 'w_aldrig', text: 'Nej, jeg vil ikke have din kaffe.' },
            { id: 'p3_gerne_bede_om', text: 'Jeg vil gerne bede om to croissanter.' },
            { id: 'p17_tak_for_laan_skal_du_have', text: 'Tak for lån!' }
        ],
        explanation: '"Ellers tak!" er danskernes varmeste og mest høflige afslag ved bordet. Til uformelle forslag blandt kolleger/venner er "Der springer jeg lige over!" eller "Den melder jeg lige pas på!" også super naturligt.'
    },
    {
        num: 19,
        pillar: 'afslag',
        setting: 'Uheld ved cafébordet – du vælter din vens kaffe!',
        contextDesc: 'Du rækker ud efter en serviet og kommer ved et uheld til at vælte din vens gule kaffekop ud over bordet. Hvad siger du med det samme?',
        speakerA: 'Dig (tager en klud med det samme): "[ ___ ]"',
        speakerB: 'Din ven: "Ej, bare rolig – det kan ske for alle!"',
        answerId: 'p19_det_maa_du_undskylde',
        options: [
            { id: 'p19_det_maa_du_undskylde', text: 'Årh nej, undskyld! Det må du undskylde – skal jeg ikke hente en ny til dig?' },
            { id: 'p13_det_var_saa_lidt', text: 'Det var så lidt! Ingen årsag!' },
            { id: 'p14_tak_for_mad', text: 'Tak for mad og velbekomme!' },
            { id: 'p6_skulle_vel_ikke', text: 'Du skulle vel ikke have set min kaffe?' }
        ],
        explanation: 'Ved uheld kombinerer man udbruddet "Årh nej, undskyld!" med "Det må du undskylde!" og det høflige tilbud "Skal jeg ikke købe/hente noget nyt til dig?".'
    },
    {
        num: 20,
        pillar: 'afslag',
        setting: 'Du er på vej til en aftale kl. 14:00, men bliver 6 minutter forsinket',
        contextDesc: 'Du har en kaffeaftale med en dansk ven eller et møde på jobbet kl. 14:00. Klokken er 13:55, og du kan se, at du først er fremme kl. 14:06. Hvad kræver dansk høflighedskultur?',
        speakerA: 'Dig (sender straks en SMS): "[ ___ ]"',
        speakerB: 'Modtager: "Helt i orden – tusind tak fordi du lige giver besked!"',
        answerId: 'p20_forsinket_du_maa_hilse',
        options: [
            { id: 'p20_forsinket_du_maa_hilse', text: 'Undskyld, jeg bliver 5–6 minutter forsinket!' },
            { id: 'w_intet', text: 'Jeg skriver ingenting – 6 minutter betyder jo ikke noget i Danmark.' },
            { id: 'p18_ellers_tak_springer_over', text: 'Ellers tak, jeg springer lige over!' },
            { id: 'p17_tak_for_laan_skal_du_have', text: 'Tak for lån af tiden!' }
        ],
        explanation: 'Som Mette understreger i videoen "Hvad er uhøfligt i Danmark?": I Danmark går man meget op i tid. Selv ved 5–10 minutters forsinkelse er det god skik altid at sende en kort besked og sige "Undskyld, jeg er lidt forsinket!".'
    }
];

// =========================================================================
// FANE 2 (DEL 2): 10 SOCIALE A↔B DIALOG-BYGGERE MED 2 HULLER ([1] og [2])
// =========================================================================
const DUAL_SLOT_DIALOGUES = [
    {
        title: '1. Hos bageren: Bestilling + Kvittering',
        setting: 'I bagerbutikken',
        rawHint: 'Fra rå tanke: "Giv mig 2 croissanter" + "Giv mig bonen"',
        slotsText: 'Kunde: "Hej! [1] to croissanter." — Bager: "Værsgo!" — Kunde: "Tak, [2]?"',
        slot1Options: ['Jeg vil gerne bede om', 'Jeg vil have', 'Du skulle vel ikke'],
        slot1Answer: 'Jeg vil gerne bede om',
        slot2Options: ['må jeg bede om bonen', 'tak for besøget', 'ellers tak'],
        slot2Answer: 'må jeg bede om bonen',
        explanation: '"Jeg vil gerne bede om..." og "Må jeg bede om bonen/kvitteringen?" er de to vigtigste høflighedsfraser i danske butikker.'
    },
    {
        title: '2. Afsked i døren efter middag: Gæst ↔ Vært',
        setting: 'I entréen kl. 22:30',
        rawHint: 'Begge parter takker hinanden i døren',
        slotsText: 'Gæst: "Tusind [1]! Det var så hyggeligt." — Vært: "Selv tak, og [2]!"',
        slot1Options: ['tak for i aften', 'tak for besøget', 'tak for i nat'],
        slot1Answer: 'tak for i aften',
        slot2Options: ['tak for besøget', 'tak for lån', 'velbekomme'],
        slot2Answer: 'tak for besøget',
        explanation: 'Gæsten siger altid "Tak for i aften!", og værten svarer "Tak for besøget!" (eller "Tak fordi I kunne komme!").'
    },
    {
        title: '3. Efter måltidet: Gæst ↔ Vært',
        setting: 'Ved spisebordet',
        rawHint: 'Når alle er færdige med at spise',
        slotsText: 'Gæst: "[1], det smagte rigtig godt!" — Vært: "[2]!"',
        slot1Options: ['Tak for mad', 'Tak for sidst', 'Tak for lån'],
        slot1Answer: 'Tak for mad',
        slot2Options: ['Velbekomme', 'Ingen årsag', 'Ellers tak'],
        slot2Answer: 'Velbekomme',
        explanation: '"Tak for mad!" besvares altid med "Velbekomme!" på dansk.'
    },
    {
        title: '4. Ekstra høfligt spørgsmål + Svar på negativt spørgsmål',
        setting: 'På kontoret',
        rawHint: 'Spørgsmål med "skulle + vel ikke" kræver "Jo!" ved positivt svar',
        slotsText: 'Kollega A: "Du [1] have set mine briller?" — Kollega B: "[2], de ligger lige her på printeren!"',
        slot1Options: ['skulle vel ikke', 'vil gerne bede om', 'springer lige over'],
        slot1Answer: 'skulle vel ikke',
        slot2Options: ['Jo', 'Ja', 'Ellers tak'],
        slot2Answer: 'Jo',
        explanation: '"Du skulle vel ikke have set...?" er ekstra høfligt – og fordi der er "ikke" i spørgsmålet, svarer B med "Jo!".'
    },
    {
        title: '5. Dagen efter firmafesten + Næste gang man ses',
        setting: 'Ved kaffemaskinen',
        rawHint: 'Pas på "i nat"-fælden!',
        slotsText: 'Dagen efter festen: "Godmorgen og [1]!" — To uger senere på gangen: "Hej igen, og [2]!"',
        slot1Options: ['tak for i aftes', 'tak for i nat', 'tak for lån'],
        slot1Answer: 'tak for i aftes',
        slot2Options: ['tak for sidst', 'velbekomme', 'ellers tak'],
        slot2Answer: 'tak for sidst',
        explanation: 'Dagen efter siger man "Tak for i aftes / Tak for i går", og næste gang man mødes senere, siger man "Tak for sidst!".'
    },
    {
        title: '6. Hjælp mellem kolleger: Tak ↔ Svar på tak',
        setting: 'Ved skrivebordet',
        rawHint: 'Begge sider af en høflig tak-udveksling',
        slotsText: 'Kollega A: "Tusind [1] med rapporten!" — Kollega B: "[2]! Du siger bare til en anden gang."',
        slot1Options: ['tak for hjælpen', 'tak for mad', 'tak for besøget'],
        slot1Answer: 'tak for hjælpen',
        slot2Options: ['Det var så lidt', 'Velbekomme', 'Ellers tak'],
        slot2Answer: 'Det var så lidt',
        explanation: '"Tusind tak for hjælpen!" besvares naturligt med "Det var så lidt!" eller "Selv tak!".'
    },
    {
        title: '7. Fremmed på gaden vs. Kollega på kontoret',
        setting: 'vs. Kontrast mellem fremmed og kendt',
        rawHint: 'Hvornår bruger man "Undskyld" som døråbner?',
        slotsText: 'Til fremmed på gaden: "[1], må jeg spørge dig om noget?" — Til kollega du kender: "(Smiler) [2] forstyrre dig et øjeblik?"',
        slot1Options: ['Undskyld', 'Velbekomme', 'Ellers tak'],
        slot1Answer: 'Undskyld',
        slot2Options: ['Må jeg lige', 'Undskyld, jeg vil have', 'Tak for sidst'],
        slot2Answer: 'Må jeg lige',
        explanation: 'Til fremmede åbner man med "Undskyld...", mens man til folk, man kender, smiler og spørger direkte: "Må jeg lige forstyrre dig et øjeblik?".'
    },
    {
        title: '8. To typer høflige afslag: Ved kaffebordet vs. Frisk løbetur',
        setting: '& Høfligt nej i to forskellige registre',
        rawHint: 'Klassisk ved bordet vs. lunt blandt kolleger',
        slotsText: 'Værten tilbyder en 3. kop kaffe: "[1], jeg har fint!" — Kollegaen spørger, om du vil med ud at vinterbade kl. 06: "Haha, [2]!"',
        slot1Options: ['Ellers tak', 'Aldrig i livet', 'Tak for lån'],
        slot1Answer: ['Ellers tak'][0],
        slot2Options: ['der springer jeg lige over', 'velbekomme', 'må jeg bede om bonen'],
        slot2Answer: 'der springer jeg lige over',
        explanation: '"Ellers tak" er det klassiske høflige afslag ved bordet, mens "Der springer jeg lige over!" (eller "Den melder jeg lige pas på!") er perfekt og lunt blandt kolleger og venner.'
    },
    {
        title: '9. Uheld ved bordet: Undskyldning + Høfligt tilbud',
        setting: 'Når du vælter en vens kaffekop',
        rawHint: 'Fra Short-videoen "At vælte nogens ting"',
        slotsText: 'Dig: "Årh nej, [1]! [2] hente en ny kop kaffe til dig?"',
        slot1Options: ['det må du undskylde', 'det var så lidt', 'ellers tak'],
        slot1Answer: 'det må du undskylde',
        slot2Options: ['Skal jeg ikke', 'Du skulle vel ikke', 'Tak for lån'],
        slot2Answer: 'Skal jeg ikke',
        explanation: '"Det må du undskylde!" efterfulgt af "Skal jeg ikke købe/hente noget nyt til dig?" viser ægte omtanke.'
    },
    {
        title: '10. Låne en bog + Sende en hilsen ved afsked',
        setting: '& Hos en god ven',
        rawHint: 'Aflevering af lånt bog + afskedshilsen til familien',
        slotsText: 'Dig: "Her er din bog tilbage – tusind [1]! Vi ses i næste uge, og [2] derhjemme!"',
        slot1Options: ['tak for lån', 'tak for mad', 'tak for oplysningen'],
        slot1Answer: 'tak for lån',
        slot2Options: ['du må hilse', 'ellers tak', 'det var så lidt'],
        slot2Answer: 'du må hilse',
        explanation: '"Tak for lån!" bruges ved aflevering af lånte ting, og "Du må hilse (derhjemme)!" er en varm dansk afskedshilsen.'
    }
];

// =========================================================================
// FANE 3: VIDEO-BANE A — HØFLIG UDEN "PLEASE" (VIDEO 1, 2 & 3) + ØVELSER
// =========================================================================
const VIDEO_LANE_A_VIDEOS = [
    {
        id: '7n3b8G1ZeC4',
        badge: 'Video 1 af 4 • 2:47',
        title: 'At være høflig på dansk (Video 1): »Undskyld« & kontakt til fremmede vs. kendte',
        summary: 'Forklarer hvorfor dansk ikke har et ord som "please", hvornår du åbner med "Undskyld..." (til fremmede), og hvorfor du IKKE siger "Undskyld" først til kolleger og folk, du kender.',
        phrases: [
            { time: '00:54', text: 'Undskyld, må jeg forstyrre dig et øjeblik?', note: 'Til fremmede – høflig døråbner' },
            { time: '01:13', text: 'Undskyld, må jeg spørge dig om noget?', note: 'Til fremmede på gaden/i bussen' },
            { time: '01:28', text: 'Undskyld, må jeg bede om lidt hjælp?', note: 'Til fremmede / personale' },
            { time: '01:44', text: 'Undskyld, ved du hvor toilettet er?', note: 'Konkret spørgsmål til fremmed' },
            { time: '02:05', text: '(Smil) Må jeg forstyrre dig et øjeblik?', note: 'Til kolleger/kendte – UDEN "undskyld"!' }
        ]
    },
    {
        id: 'oOC-HES6Hk4',
        badge: 'Video 2 af 4 • 2:56',
        title: 'At være høflig på dansk (Video 2): Høflige spørgsmål med modalverber (må, vil, kan, skulle)',
        summary: 'Gennemgår 8 høflige spørgsmål fra almindeligt høfligt ("Må jeg...", "Vil du...") til ekstra høfligt med datidsformen "skulle" [sku\'] + "tilfældigvis" og "vel ikke".',
        phrases: [
            { time: '00:30', text: 'Må jeg spørge dig om noget?', note: 'Høfligt med "må"' },
            { time: '00:48', text: 'Vil du hjælpe mig med en ting?', note: 'Høfligt med "vil"' },
            { time: '01:02', text: 'Kan du sige mig, hvad klokken er?', note: 'Høfligt med "kan"' },
            { time: '01:14', text: 'Må jeg låne din kuglepen?', note: 'Almindeligt høfligt lån' },
            { time: '01:26', text: 'Skulle du tilfældigvis have en kuglepen, jeg må låne?', note: 'Ekstra høfligt (skulle → [sku\'])' },
            { time: '01:46', text: 'Du skulle vel ikke have set mine briller?', note: 'Ekstra høfligt (Svar: Nej / Jo!)' },
            { time: '02:07', text: 'Vil du være sød at hjælpe mig med...', note: 'Varmt & høfligt ønske' },
            { time: '02:24', text: 'Kan du lukke vinduet?', note: 'Uformelt til venner & familie' }
        ]
    },
    {
        id: 'crsbmifVWuU',
        badge: 'Video 3 af 4 • 2:39',
        title: 'At være høflig på dansk (Video 3): Småordene »gerne«, »bede om«, »bare« & »lige«',
        summary: 'Viser de 7 nøglefraser der erstatter "please" i bageren, ved kassen, på kontoret og ved hoveddøren.',
        phrases: [
            { time: '00:22', text: 'Jeg vil gerne bede om 2 croissanter', note: 'I bageren/caféen (aldrig "Jeg vil have")' },
            { time: '00:45', text: 'Må jeg bede om kvitteringen / bonen?', note: 'Ved kassen i butikken' },
            { time: '01:03', text: 'Hvad kan jeg hjælpe (dig) med?', note: 'Når du tilbyder hjælp/service' },
            { time: '01:19', text: 'Hvad kan jeg gøre for dig?', note: 'Høflig modtagelse af kunde/kollega' },
            { time: '01:33', text: 'Jeg har bare / lige et spørgsmål til', note: 'Småordene "bare/lige" blødgør' },
            { time: '01:51', text: 'Kom bare ind, det er jo koldt', note: 'Varm invitation med "bare" + "jo"' },
            { time: '02:13', text: 'Du siger bare til, hvis du har brug for hjælp', note: 'Åbent, varmt tilbud om hjælp' }
        ]
    }
];

const LANE_A_EXERCISES = [
    {
        situation: '1. Du står på hovedbanegården og vil spørge en ukendt pendler, hvilket spor toget til Odense kører fra.',
        prompt: 'Hvilken åbning passer til den sociale kontekst (fremmed person)?',
        options: [
            { text: 'Undskyld, må jeg spørge dig om noget? Ved du, hvilket spor toget til Odense kører fra?', correct: true },
            { text: 'Sig mig lige, hvor toget til Odense er!', correct: false },
            { text: 'Jeg vil have sporet til Odense.', correct: false }
        ],
        explanation: 'Til en fremmed på stationen starter man altid med "Undskyld..." efterfulgt af et høfligt spørgsmål.'
    },
    {
        situation: '2. Du går hen til din faste sidemand på kontoret, som du taler med hver dag, for at spørge om et link.',
        prompt: 'Hvordan åbner du samtalen mest naturligt på dansk (person du kender)?',
        options: [
            { text: '(Smiler) Må jeg lige forstyrre dig et øjeblik?', correct: true },
            { text: 'Undskyld, undskyld hr., må jeg tillade mig at henvende mig?', correct: false },
            { text: 'Giv mig linket nu.', correct: false }
        ],
        explanation: 'Til en kollega, du kender, dropper du "Undskyld" som samtalestarter – et smil + "Må jeg lige forstyrre dig et øjeblik?" er varmt og naturligt.'
    },
    {
        situation: '3. Du står i kaffebaren og vil bestille en cappuccino.',
        prompt: 'Hvordan siger du "Can I please have a cappuccino?" på naturligt dansk?',
        options: [
            { text: 'Jeg vil gerne bede om en cappuccino.', correct: true },
            { text: 'Jeg vil have en cappuccino, please.', correct: false },
            { text: 'Giv mig en cappuccino.', correct: false }
        ],
        explanation: '"Jeg vil gerne bede om..." er danskernes faste, høflige bestillingsfrase.'
    },
    {
        situation: '4. Du mangler en oplader til din telefon i undervisningen og vil spørge sidemanden ekstra høfligt.',
        prompt: 'Hvilken sætning bruger datids-modalverbet "skulle" + "tilfældigvis" rigtigt?',
        options: [
            { text: 'Skulle du tilfældigvis have en oplader, jeg må låne?', correct: true },
            { text: 'Skal du tilfældigvis låne mig din oplader nu?', correct: false },
            { text: 'Jeg vil gerne bede om din private oplader.', correct: false }
        ],
        explanation: '"Skulle du tilfældigvis have en..., jeg må låne?" (udtalt "Sku\' du tilfældigvis...") er ekstra høfligt og uforpligtende.'
    },
    {
        situation: '5. Din kollega spørger dig: "Du skulle vel ikke have set min blå mappe?" – og du HAR set den på mødebordet!',
        prompt: 'Hvad svarer du på et høfligt spørgsmål med "skulle vel ikke"?',
        options: [
            { text: 'Jo! Den ligger inde på mødebordet.', correct: true },
            { text: 'Ja! Den ligger inde på mødebordet.', correct: false },
            { text: 'Ellers tak, den ligger på mødebordet.', correct: false }
        ],
        explanation: 'Fordi spørgsmålet indeholder "ikke" ("Du skulle vel ikke..."), skal et positivt svar altid indledes med "Jo!".'
    },
    {
        situation: '6. Et møde er lige ved at slutte, men du er i tvivl om én lille detalje.',
        prompt: 'Hvilke småord bruger du til at blødgøre dit ekstraspørgsmål?',
        options: [
            { text: 'Jeg har bare lige et spørgsmål til.', correct: true },
            { text: 'Jeg kræver et spørgsmål mere nu.', correct: false },
            { text: 'Tak for besøget, jeg har et spørgsmål.', correct: false }
        ],
        explanation: 'Småordene "bare" og "lige" gør dit spørgsmål blødt, hurtigt og høfligt.'
    },
    {
        situation: '7. En ny kollega er lige startet i afdelingen. Du vil vise, at personen altid kan spørge dig.',
        prompt: 'Hvilket udtryk fra Video 3 passer perfekt her?',
        options: [
            { text: 'Du siger bare til, hvis du har brug for hjælp!', correct: true },
            { text: 'Må jeg bede om kvitteringen, hvis du har brug for hjælp!', correct: false },
            { text: 'Du skulle vel ikke have brug for mine briller?', correct: false }
        ],
        explanation: '"Du siger bare til, hvis du har brug for hjælp!" er varmt, uformelt og imødekommende.'
    },
    {
        situation: '8. Dine gæster står udenfor hoveddøren i regn og blæst.',
        prompt: 'Hvordan bruger du småordene "bare" og "jo" til at byde dem varmt indenfor?',
        options: [
            { text: 'Kom bare ind, det er jo koldt!', correct: true },
            { text: 'Gå ind nu, det er koldt!', correct: false },
            { text: 'Ellers tak, kom ind!', correct: false }
        ],
        explanation: '"Kom bare ind, det er jo koldt!" bruger "bare" til at gøre invitationen gæstfri og "jo" til at skabe fælles hygge.'
    }
];

// =========================================================================
// FANE 4: VIDEO-BANE B — TAK, SVAR PÅ TAK & "TAK FOR SIDST" (VIDEO 4, 5 & 6)
// =========================================================================
const VIDEO_LANE_B_VIDEOS = [
    {
        id: 'vuepGzOIN9M',
        badge: 'Video 4 af 4 • 2:24',
        title: 'At være høflig på dansk (Video 4): »Tak + mere!« (Mange / Tusind tak for...)',
        summary: 'Viser hvorfor et alene "Tak" ofte er for kort på dansk – og gennemgår de 8 vigtigste "Tak for..."-udtryk samt forstærkerne "Mange tak" og "Tusind tak".',
        phrases: [
            { time: '00:17', text: 'Tak for i aften', note: 'Gæsten siger det, når man går hjem' },
            { time: '00:28', text: 'Tak for besøget', note: 'Værten siger det til gæsterne!' },
            { time: '00:38', text: 'Tak for mad', note: 'Efter måltidet (Svar: Velbekomme!)' },
            { time: '00:45', text: 'Tak skal du have', note: 'Når nogen rækker dig noget / gør en tjeneste' },
            { time: '00:55', text: 'Tak for oplysningen', note: 'I telefonen / kundeservice når du har fået svar' },
            { time: '01:05', text: 'Tak for hjælpen / Tak for din hjælp', note: 'Efter praktisk eller faglig hjælp' },
            { time: '01:18', text: 'Tak for lån', note: 'Når du afleverer noget tilbage, du har lånt' },
            { time: '01:28', text: 'Tak for din tid', note: 'Efter et møde, en jobsamtale eller rådgivning' },
            { time: '01:44', text: 'Mange tak... / Tusind tak...', note: 'Sættes foran for at gøre takket ekstra varmt' }
        ]
    },
    {
        id: 'CgTKqch-38c',
        badge: 'Tak-dialogerne • 3:01',
        title: 'Tak på dansk: Begge sider af samtalen (Tak ↔ Hvad svarer den anden?)',
        summary: 'Gennemgår alle de vigtigste svar på "Tak": "Det var så lidt", "Selv tak", "Så lidt", "Det var ikke noget", "Ingen årsag", "Tak fordi I kunne komme" og svar på komplimenter.',
        phrases: [
            { time: '00:15', text: 'Det var så lidt / Så lidt', note: 'Det mest almindelige svar på "Tak for hjælpen"' },
            { time: '00:28', text: 'Selv tak!', note: 'Når begge parter har haft glæde af hjælpen/samværet' },
            { time: '01:05', text: 'Tak fordi du / I kunne komme!', note: 'Værtens varme svar ved afsked' },
            { time: '01:25', text: 'Tak for i går / Tak for sidst! → Selv tak, det var hyggeligt!', note: 'Næste gang man ses eller skriver sammen' },
            { time: '02:06', text: 'Tak skal du have! / Ej, tusind tak – hvor er du sød!', note: 'Når man får en kompliment' },
            { time: '02:49', text: 'Det var ikke noget / Ingen årsag', note: 'Høfligt svar efter hjælp på arbejdet' },
            { time: '02:58', text: 'Du siger bare til en anden gang!', note: 'Varm afslutning efter du har hjulpet nogen' }
        ]
    },
    {
        id: '2mamV0pAl1c',
        badge: 'Kultur-fælden • 1:49',
        title: '»Tak for i aftes – IKKE tak for i nat!« (+ »Tak for sidst!«)',
        summary: 'Forklarer forskellen på "Tak for i aftes / Tak for i går" (dagen efter), "Tak for sidst!" (næste gang man ses) – og hvorfor du aldrig må sige "Tak for i nat!" til en kollega.',
        phrases: [
            { time: '00:16', text: 'Tak for i aftes! / Tak for i går!', note: 'Sig dette dagen efter en middag eller fest' },
            { time: '00:29', text: 'Tak for sidst!', note: 'Sig dette næste gang I mødes (dage/uger/måneder efter)' },
            { time: '01:00', text: 'ALDRIG: "Tak for i nat!" (til kolleger/venner)', note: 'Betyder kun, at man har sovet i samme seng!' }
        ]
    }
];

const LANE_B_EXERCISES = [
    {
        situation: '1. Du har ringet til dit forsikringsselskab og fået svar på, hvornår pengene udbetales.',
        prompt: 'Hvilket "Tak for..."-udtryk fra Video 4 passer bedst, inden du lægger røret på?',
        options: [
            { text: 'Mange tak for oplysningen (og tak for hjælpen)!', correct: true },
            { text: 'Mange tak for besøget!', correct: false },
            { text: 'Tusind tak for lån!', correct: false }
        ],
        explanation: 'I telefonen, når du har fået et svar eller en information, siger danskere meget ofte "Tak for oplysningen!" eller "Tak for hjælpen!".'
    },
    {
        situation: '2. Du er vært til en fødselsdagsmiddag. Klokken 23 siger dine gæster i døren: "Tusind tak for i aften!".',
        prompt: 'Hvad siger du som VÆRT tilbage til gæsterne?',
        options: [
            { text: 'Tak for besøget! Og tak fordi I kunne komme!', correct: true },
            { text: 'Tak for mad, det smagte godt!', correct: false },
            { text: 'Tak for lån i aften!', correct: false }
        ],
        explanation: 'Værten siger altid "Tak for besøget!" og/eller "Tak fordi du/I kunne komme!".'
    },
    {
        situation: '3. Fredag aften var du til julefrokost med dine kolleger. Mandag morgen møder du din chef i kantinen.',
        prompt: 'Hvad siger du til chefen mandag morgen?',
        options: [
            { text: 'Godmorgen – og tak for sidst! (Eller dagen efter: Tak for i aftes!)', correct: true },
            { text: 'Godmorgen – og tusind tak for i nat!', correct: false },
            { text: 'Godmorgen – og velbekomme!', correct: false }
        ],
        explanation: '"Tak for sidst!" (eller dagen efter: "Tak for i aftes! / Tak for i går!") er den helt rigtige hilsen. "Tak for i nat!" må kun bruges til en romantisk partner!'
    },
    {
        situation: '4. En kollega siger til dig i frokostpausen: "Ej, hvor er det en flot jakke, du har på i dag!".',
        prompt: 'Hvad er det mest naturlige, varme svar på en kompliment på dansk?',
        options: [
            { text: 'Tak skal du have! / Ej, tusind tak – hvor er du sød!', correct: true },
            { text: 'Ingen årsag, det var så lidt!', correct: false },
            { text: 'Velbekomme med jakken!', correct: false }
        ],
        explanation: 'Som Mette viser ved 01:58 i "Tak på dansk": Ved en kompliment svarer man "Tak skal du have!" eller "Ej, tusind tak – hvor er du sød!".'
    },
    {
        situation: '5. Du har lånt din nabos boremaskine i weekenden og ringer nu på for at aflevere den tilbage.',
        prompt: 'Hvad siger du, når du rækker boremaskinen til naboen?',
        options: [
            { text: 'Her er boremaskinen tilbage – tusind tak for lån!', correct: true },
            { text: 'Her er boremaskinen – tak for besøget!', correct: false },
            { text: 'Her er boremaskinen – velbekomme!', correct: false }
        ],
        explanation: '"Tak for lån!" (eller "Tusind tak for lån!") er det faste danske udtryk, når man leverer en lånt ting tilbage.'
    },
    {
        situation: '6. Du har været til et 30 minutters kaffemøde med en travl afdelingsleder, som har givet dig gode råd.',
        prompt: 'Hvad er det mest respektfulde at sige, når du rejser dig og giver hånd til sidst?',
        options: [
            { text: 'Mange tak for din tid – og tak for hjælpen!', correct: true },
            { text: 'Tak for mad – og det var så lidt!', correct: false },
            { text: 'Tak for lån af mødelokalet!', correct: false }
        ],
        explanation: '"Tak for din tid" viser stor respekt for, at den anden har sat tid af i sin kalender til dig.'
    },
    {
        situation: '7. Din kollega siger til dig: "Tusind tak fordi du hjalp mig med regnearket!".',
        prompt: 'Hvilket svar lukker samtalen varmt og høfligt?',
        options: [
            { text: 'Det var så lidt! Du siger bare til en anden gang.', correct: true },
            { text: 'Tak for oplysningen!', correct: false },
            { text: 'Ellers tak!', correct: false }
        ],
        explanation: '"Det var så lidt! Du siger bare til en anden gang" er den perfekte kombination fra slutningen af videoen "Tak på dansk".'
    },
    {
        situation: '8. Du møder en ven på gaden 3 uger efter, at I var til koncert sammen.',
        prompt: 'Hvilke tre små ord siger danskere næsten altid lige efter "Hej!"?',
        options: [
            { text: 'Tak for sidst!', correct: true },
            { text: 'Tak for i nat!', correct: false },
            { text: 'Tak for lån!', correct: false }
        ],
        explanation: '"Tak for sidst!" binder venskaber og kollegaskaber sammen på dansk, uanset om det er 2 dage eller 2 måneder siden, I sås sidst.'
    }
];

// =========================================================================
// FANE 5: VIDEO-BANE C — HØFLIGE AFSLAG & DANSK AFTALEKULTUR (VIDEO 7 & 8)
// =========================================================================
const VIDEO_LANE_C_VIDEOS = [
    {
        id: 'KMxHfOnstys',
        badge: 'Høflige afslag • 0:54',
        title: 'Nej på forskellige måder på dansk (Fra »Ellers tak« til »Der springer jeg lige over«)',
        summary: 'Gennemgår 8 måder at sige nej på i en dansk samtale – fra de høflige standard-afslag ved bordet til de lune, kollegiale afslag med småordet "lige".',
        phrases: [
            { time: '00:05', text: 'Nej / Nej tak', note: 'Direkte og almindeligt høfligt afslag' },
            { time: '00:15', text: 'Ellers tak!', note: 'Ekstra høfligt afslag ("Nej tak, men tak fordi du spurgte!")' },
            { time: '00:22', text: 'Det tror jeg så ik\'', note: 'Uformelt, lunt afslag til venner/kolleger' },
            { time: '00:28', text: 'Der må jeg skuffe dig', note: 'Høfligt-humoristisk når man ikke kan opfylde et ønske' },
            { time: '00:34', text: 'Der springer jeg lige over', note: 'Klassisk dansk afslag med "lige" (fx til kage, druk eller løbetur)' },
            { time: '00:40', text: 'Den melder jeg lige pas på', note: 'Kollegialt afslag når man ikke vil deltage i noget' },
            { time: '00:46', text: 'Aldrig i livet!', note: 'Stærkt, følelsesladet uformelt afslag til tætte venner' }
        ]
    },
    {
        id: 'TsJvoWA6AdU',
        badge: 'Dansk høflighedskultur • 2:44',
        title: 'Hvad er uhøfligt i Danmark? (Tid, 5 minutters forsinkelse & uanmeldt besøg)',
        summary: 'Gennemgår de to vigtigste uskrevne høflighedsregler i Danmark: At komme til tiden (og altid give besked ved selv 5–10 minutters forsinkelse) og altid at lave en aftale, før man besøger folk.',
        phrases: [
            { time: '00:25', text: 'Kom til tiden (gerne 5 minutter før til møder)', note: 'At komme for sent opleves som respektløst over for andres tid' },
            { time: '00:55', text: 'Undskyld, jeg er / bliver 5–10 minutter forsinket!', note: 'Send altid en besked eller ring, så snart du ved, du er forsinket' },
            { time: '01:30', text: 'Skriv/ring altid og lav en aftale før et besøg', note: 'I Danmark dukker man sjældent uanmeldt op ved folks hoveddør' }
        ]
    }
];

const LANE_C_EXERCISES = [
    {
        situation: '1. Du er til møde hos en kunde, og receptionisten spørger: "Vil du have lidt mere kaffe i koppen?". Du har rigeligt.',
        prompt: 'Hvad er det mest høflige afslag i denne situation?',
        options: [
            { text: 'Ellers tak! (Eller: Nej tak, jeg har fint!)', correct: true },
            { text: 'Aldrig i livet!', correct: false },
            { text: 'Nej.', correct: false }
        ],
        explanation: '"Ellers tak!" er danskernes høfligste måde at sige nej tak til et venligt tilbud.'
    },
    {
        situation: '2. Fredag eftermiddag spørger en kollega med et glimt i øjet, om du vil med i styrketræningscenteret kl. 06:00 lørdag morgen.',
        prompt: 'Hvilket lunt, kollegialt afslag med småordet "lige" passer perfekt her?',
        options: [
            { text: 'Haha, der springer jeg lige over! (Eller: Den melder jeg lige pas på!)', correct: true },
            { text: 'Jeg vil gerne bede om kvitteringen.', correct: false },
            { text: 'Velbekomme!', correct: false }
        ],
        explanation: '"Der springer jeg lige over!" og "Den melder jeg lige pas på!" er varme, humoristiske måder at sige nej tak til en uformel invitation uden at ødelægge den gode stemning.'
    },
    {
        situation: '3. En kollega spørger, om du kan tage hans vagt søndag aften, men du har allerede planer med familien.',
        prompt: 'Hvilket høfligt afslag fra videoen kan du bruge med et venligt smil?',
        options: [
            { text: 'Årh, der må jeg desværre skuffe dig – vi har familiebesøg på søndag.', correct: true },
            { text: 'Aldrig i livet, luk røven!', correct: false },
            { text: 'Tak for lån på søndag!', correct: false }
        ],
        explanation: '"Der må jeg (desværre) skuffe dig..." efterfulgt af en kort forklaring er et høfligt og blødt afslag.'
    },
    {
        situation: '4. Du er inviteret til middag hos en dansk kollega kl. 18:00. Toget holder stille, så du kan se, at du først er der kl. 18:08.',
        prompt: 'Hvad forventes der i dansk høflighedskultur?',
        options: [
            { text: 'Du sender straks en besked: "Undskyld, toget holder stille – jeg bliver ca. 8 minutter forsinket!"', correct: true },
            { text: 'Du venter bare til du ankommer kl. 18:08 uden at skrive, for under 15 minutter tæller ikke.', correct: false },
            { text: 'Du skriver "Tak for sidst!" og bliver hjemme.', correct: false }
        ],
        explanation: 'I Danmark giver man besked med det samme – selv ved 5–10 minutters forsinkelse!'
    },
    {
        situation: '5. Du går en tur søndag eftermiddag og kommer forbi en dansk kollegas hus. Du har ikke nogen aftale med kollegaen.',
        prompt: 'Hvad siger videoen "Hvad er uhøfligt i Danmark?" om uanmeldte besøg?',
        options: [
            { text: 'I Danmark ringer eller skriver man altid først og laver en aftale i stedet for bare at ringe på døren uanmeldt.', correct: true },
            { text: 'I Danmark går man bare direkte ind i folks stue uden at ringe på.', correct: false },
            { text: 'I Danmark må man kun besøge folk om natten.', correct: false }
        ],
        explanation: 'Danskere planlægger deres fritid nøje, så det anses for god høflighed altid at skrive eller ringe og aftale et besøg på forhånd.'
    },
    {
        situation: '6. Din bedste ven spørger i sjov, om du vil sælge din elskede hund for 100 kroner.',
        prompt: 'Hvilket stærkt, uformelt afslag fra slutningen af videoen kan du bruge til en tæt ven i sjov?',
        options: [
            { text: 'Aldrig i livet!', correct: true },
            { text: 'Ellers tak, må jeg bede om bonen?', correct: false },
            { text: 'Tak for oplysningen!', correct: false }
        ],
        explanation: '"Aldrig i livet!" er det stærkeste, mest følelsesladede afslag og bruges uformelt til tætte venner.'
    }
];

// =========================================================================
// FANE 6: VIDEO-BANE D — HVERDAGENS 6 LYN-SITUATIONER (SHORTS) + TRÆNING
// =========================================================================
const VIDEO_LANE_D_SHORTS = [
    {
        id: 'OsSuUzENs4U',
        badge: 'Short 1 • 0:52',
        title: 'At tilbyde sin hjælp (Din ven skal flytte)',
        situation: 'Din ven skal flytte, og du vil gerne hjælpe ham. Hvad siger du?',
        phrases: [
            '»Sig til, hvis du har brug for en hånd med flytningen«',
            '»Skal jeg hjælpe dig med at flytte?«',
            '»Har du brug for hjælp med at flytte?«',
            '»Du siger bare til, hvis du har brug for en ekstra hånd«'
        ]
    },
    {
        id: 'Ao5qVV11oRw',
        badge: 'Short 2 • 0:35',
        title: 'At vælte nogens ting (Du vælter din vens kaffekop)',
        situation: 'Du kommer til at vælte din vens kop med kaffe i. Hvad siger du straks?',
        phrases: [
            '»Årh nej, undskyld!«',
            '»Det må du undskylde!«',
            '»Skal jeg ikke købe noget nyt til dig?«',
            '»Skal jeg ikke hente noget nyt (kaffe) til dig?«'
        ]
    },
    {
        id: 'MIRp8lGdOgc',
        badge: 'Short 3 • 0:15',
        title: 'Tak for mad ↔ Velbekomme!',
        situation: 'Du har spist hos en dansk ven, og I er færdige. Hvad siger I?',
        phrases: [
            'Gæst: »Tak for mad, det smagte rigtig godt!«',
            'Vært: »Velbekomme!«'
        ]
    },
    {
        id: 'souhu5MhU28',
        badge: 'Short 4 • 0:19',
        title: 'At spørge fremmede om noget (Bussen til Aarhus C)',
        situation: 'Du skal med bussen til Aarhus C, men ved ikke hvor den holder.',
        phrases: [
            'Dig: »Undskyld, ved du hvor bussen holder til Aarhus C?«',
            'Dig (efter svaret): »Tak!«'
        ]
    },
    {
        id: 'rg1F1LrX4Og',
        badge: 'Short 5 • 0:47',
        title: 'Du får en gave – hvad siger du?',
        situation: 'En ven eller kollega giver dig en gave. Hvordan reagerer du varmt på dansk?',
        phrases: [
            '»Ej, tusind tak! Hvor er du sød!«',
            '»Mange tak skal du have – det skulle du da slet ikke have gjort!«'
        ]
    },
    {
        id: 'UFjPoZKgJR0',
        badge: 'Short 6 • 0:59',
        title: 'At sende en hilsen på dansk (»Du må hilse!«)',
        situation: 'Du siger farvel til en ven eller kollega og vil sende en høflig tanke hjem til deres partner/familie.',
        phrases: [
            '»Du må hilse derhjemme!«',
            '»Hils din kone / mand / familie mange gange!«',
            'Når du overbringer hilsenen hjemme: »Jeg skulle hilse fra Mette!«'
        ]
    }
];

const LANE_D_EXERCISES = [
    {
        prompt: '1. Du kommer til at støde til din kollegas vandglas, så det vælter ud over bordet. Hvilken sætning tilbyder høfligt at gøre skaden god igen?',
        options: [
            { text: 'Årh nej, det må du undskylde! Skal jeg ikke hente et nyt glas vand til dig?', correct: true },
            { text: 'Det var så lidt! Du siger bare til en anden gang.', correct: false },
            { text: 'Ellers tak, jeg springer lige over!', correct: false }
        ],
        explanation: 'Som Mette viser i Short-videoen "At vælte nogens ting": "Årh nej, undskyld! Det må du undskylde – skal jeg ikke hente noget nyt til dig?".'
    },
    {
        prompt: '2. Din nabo fortæller over hækken, at de skal male hele carporten i weekenden. Hvordan tilbyder du uforpligtende din hjælp?',
        options: [
            { text: 'Du siger bare til, hvis du har brug for en ekstra hånd!', correct: true },
            { text: 'Må jeg bede om kvitteringen på malingen?', correct: false },
            { text: 'Tak for lån af carporten!', correct: false }
        ],
        explanation: '"Du siger bare til, hvis du har brug for en ekstra hånd!" er det mest naturlige tilbud om praktisk hjælp.'
    },
    {
        prompt: '3. Du siger farvel til din kollega Anders på parkeringspladsen. Du kender også hans kone Sara. Hvad siger du som en varm afslutning?',
        options: [
            { text: 'God weekend – og du må hilse Sara mange gange!', correct: true },
            { text: 'God weekend – og tak for mad til Sara!', correct: false },
            { text: 'God weekend – og der må jeg skuffe Sara!', correct: false }
        ],
        explanation: '"Du må hilse (derhjemme)!" eller "Hils [navn] mange gange!" er en varm, klassisk dansk høflighedshilsen ved afsked.'
    },
    {
        prompt: '4. Da Anders kommer hjem til Sara, hvordan giver han din hilsen videre på dansk?',
        options: [
            { text: 'Jeg skulle hilse mange gange fra din kollega!', correct: true },
            { text: 'Jeg vil gerne bede om en hilsen!', correct: false },
            { text: 'Du skulle vel ikke hilse?', correct: false }
        ],
        explanation: 'Når man afleverer en hilsen fra en anden på dansk, siger man altid: "Jeg skulle hilse (mange gange) fra...".'
    },
    {
        prompt: '5. Dine kolleger har købt en æske chokolade til dig på din fødselsdag. Hvad siger du, når du tager imod gaven?',
        options: [
            { text: 'Ej, tusind tak skal I have – hvor er I søde!', correct: true },
            { text: 'Det var så lidt, ingen årsag!', correct: false },
            { text: 'Der springer jeg lige over!', correct: false }
        ],
        explanation: 'Dialoglyden "Ej!" + "Tusind tak skal I have – hvor er I søde!" udtrykker spontan glæde og taknemmelighed.'
    },
    {
        prompt: '6. Du er færdig med frokosten hjemme hos en dansk familie, og værten begynder at tage tallerkenerne ud. Hvad siger du?',
        options: [
            { text: 'Tak for mad, det smagte rigtig godt!', correct: true },
            { text: 'Velbekomme, det smagte rigtig godt!', correct: false },
            { text: 'Tak for lån af maden!', correct: false }
        ],
        explanation: 'Den, der har spist, siger altid "Tak for mad!", hvorefter værten svarer "Velbekomme!".'
    }
];

// =========================================================================
// FANE 7: 14 HØFLIGHEDS-DETEKTIV MISSIONER I VRIMLEBILLEDET
// =========================================================================
const DETECTIVE_MISSIONS = [
    {
        prompt: '1. Find den rejsende med rygsæk ved busstoppestedet til venstre, der henvender sig til en FREMMED med døråbneren »Undskyld, må jeg spørge dig om noget?«.',
        answerId: 'p1_undskyld_fremmed',
        hint: 'Kig helt til venstre ved busstoppestedet (pegefelt #1).'
    },
    {
        prompt: '2. Find den lokale borger ved busstoppestedet, der smilende har hjulpet med at vise vej og svarer »Det var så lidt! / Selv tak!«.',
        answerId: 'p13_det_var_saa_lidt',
        hint: 'Kig på personen i brun jakke ved busstoppestedet (pegefelt #13).'
    },
    {
        prompt: '3. Find kunden ved bagermontren øverst til venstre, der bestiller to croissanter på høfligt dansk med »Jeg vil gerne bede om...«.',
        answerId: 'p3_gerne_bede_om',
        hint: 'Kig ved glasmontren med croissanter øverst til venstre (pegefelt #3).'
    },
    {
        prompt: '4. Find bageren bag disken, der tager smilende imod kunden med »Hvad kan jeg hjælpe dig med?«.',
        answerId: 'p9_hvad_kan_jeg_hjaelpe',
        hint: 'Kig bag bagerdisken øverst til venstre (pegefelt #9).'
    },
    {
        prompt: '5. Find kunden i grøn trøje ved kasseapparatet, der høfligt spørger »Må jeg bede om kvitteringen / bonen?«.',
        answerId: 'p4_maa_jeg_bede_om',
        hint: 'Kig til højre for bagermontren ved kassen (pegefelt #4).'
    },
    {
        prompt: '6. Find personen ved cafébordet nederst til venstre, der er kommet til at vælte en gul kaffekop og udbryder »Årh nej, det må du undskylde! Skal jeg ikke hente en ny?«.',
        answerId: 'p19_det_maa_du_undskylde',
        hint: 'Kig ved det lille runde bord nederst til venstre (pegefelt #19).'
    },
    {
        prompt: '7. Find kvinden på kontoret øverst midt-venstre, der smiler til en KOLLEGA (uden at sige "undskyld"!) og spørger »Må jeg lige forstyrre dig et øjeblik?«.',
        answerId: 'p2_forstyrre_kollega',
        hint: 'Kig på kvinden i orange blazer ved skrivebordet øverst midt-venstre (pegefelt #2).'
    },
    {
        prompt: '8. Find kollegaen i blå trøje ved arbejdsbordet i midten, der ekstra høfligt spørger »Skulle du tilfældigvis have en kuglepen, jeg må låne?«.',
        answerId: 'p5_skulle_tilfaeldigvis',
        hint: 'Kig til venstre ved arbejdsbordet i midten (pegefelt #5).'
    },
    {
        prompt: '9. Find kollegaen ved samme bord, der klapper sine lommer og spørger »Du skulle vel ikke have set mine briller?«.',
        answerId: 'p6_skulle_vel_ikke',
        hint: 'Kig til højre ved arbejdsbordet i midten, hvor brillerne ligger på bordet (pegefelt #6).'
    },
    {
        prompt: '10. Find kvinden ved flipover-tavlen i midten, der løfter én finger blødt og siger »Jeg har bare / lige et spørgsmål til«.',
        answerId: 'p8_bare_lige_spoergsmaal',
        hint: 'Kig ved tavlen med søjlediagrammet i midten (pegefelt #8).'
    },
    {
        prompt: '11. Find kollegaen med den gule kaffekop ved espressomaskinen, der hilser dagen efter firmafesten med »Tak for i aftes! / Tak for sidst!« (og aldrig "Tak for i nat!").',
        answerId: 'p16_tak_for_i_aftes_sidst',
        hint: 'Kig ved kaffemaskinen nederst midt-venstre (pegefelt #16).'
    },
    {
        prompt: '12. Find gæsten ved middagsbordet med stearinlys, der løfter hånden venligt og siger »Ellers tak!« til en ekstra kop kaffe.',
        answerId: 'p18_ellers_tak_springer_over',
        hint: 'Kig til højre ved middagsbordet, hvor værten hælder fra termokanden (pegefelt #18).'
    },
    {
        prompt: '13. Find vennerne i den grønne sofa nederst midt-højre, hvor en lånt bog afleveres tilbage med »Tusind tak for lån!«.',
        answerId: 'p17_tak_for_laan_skal_du_have',
        hint: 'Kig på den grønne sofa nederst til højre for midten (pegefelt #17).'
    },
    {
        prompt: '14. Find pendleren nederst i højre hjørne, der kigger på sit armbåndsur og sender en høflig besked: »Undskyld, jeg bliver 5 minutter forsinket!«.',
        answerId: 'p20_forsinket_du_maa_hilse',
        hint: 'Kig helt nederst i højre hjørne på brostenene (pegefelt #20).'
    }
];

function speakPolite(text, rate = 0.9, pitch = 1.02) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'da-DK';
    u.rate = rate;
    u.pitch = pitch;
    window.speechSynthesis.speak(u);
}

function injectSamtaleHoeflighedStyles() {
    if (document.getElementById('samtale-hoeflighed-styles')) return;
    const style = document.createElement('style');
    style.id = 'samtale-hoeflighed-styles';
    style.textContent = `
        #app:has(.samtale-hoeflighed-view) {
            max-width: 1200px;
        }
        .samtale-hoeflighed-view {
            width: 100%;
            max-width: 1160px;
            margin: 0 auto;
            padding: 1rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        ${SAMTALE_TR_CSS}
        .sh-hero {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.97) 0%, rgba(30, 41, 59, 0.96) 52%, rgba(16, 185, 129, 0.28) 100%);
            border: 1.5px solid rgba(16, 185, 129, 0.45);
            border-radius: 22px;
            padding: 1.35rem 1.5rem;
            margin-bottom: 1.15rem;
            box-shadow: 0 16px 38px rgba(0, 0, 0, 0.42);
        }
        .sh-hero-kicker {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.28rem 0.85rem;
            border-radius: 999px;
            background: rgba(16, 185, 129, 0.18);
            border: 1px solid rgba(16, 185, 129, 0.55);
            color: #6ee7b7;
            font-size: 0.76rem;
            font-weight: 900;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 0.55rem;
        }
        .sh-hero h1 {
            margin: 0 0 0.4rem;
            font-size: clamp(1.45rem, 2.6vw, 2.1rem);
            font-weight: 900;
            color: #ffffff;
        }
        .sh-hero p {
            margin: 0 0 0.95rem;
            color: #cbd5e1;
            font-size: 0.96rem;
            line-height: 1.55;
            max-width: 940px;
        }
        .sh-pillar-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
            gap: 0.75rem;
        }
        .sh-pillar-box {
            border-radius: 15px;
            padding: 0.8rem 0.95rem;
            background: rgba(15, 23, 42, 0.86);
        }
        .sh-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-bottom: 1.15rem;
        }
        .sh-tab-btn {
            background: rgba(15, 23, 42, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.3);
            color: #cbd5e1;
            padding: 0.58rem 0.92rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.83rem;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .sh-tab-btn:hover {
            border-color: #34d399;
            color: #ffffff;
            transform: translateY(-1px);
        }
        .sh-tab-btn.active {
            background: linear-gradient(135deg, #059669, #0284c7);
            border-color: #6ee7b7;
            color: #ffffff;
            box-shadow: 0 6px 18px rgba(5, 150, 105, 0.38);
        }
        .sh-panel {
            display: none;
        }
        .sh-panel.active {
            display: block;
        }
        .sh-card {
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(148, 163, 184, 0.24);
            border-radius: 20px;
            padding: 1.25rem;
            margin-bottom: 1.15rem;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
        .sh-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.65rem;
            margin-bottom: 0.9rem;
        }
        .sh-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 0.42rem;
        }
        .sh-filter-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.32);
            color: #e2e8f0;
            padding: 0.44rem 0.82rem;
            border-radius: 999px;
            font-weight: 800;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .sh-filter-btn.active {
            background: rgba(16, 185, 129, 0.24);
            border-color: #34d399;
            color: #ffffff;
            box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.22);
        }

        /* Vrimlebillede Stage & Pegefelter */
        .sh-stage-wrap {
            position: relative;
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            border: 2px solid rgba(148, 163, 184, 0.35);
            background: #090d16;
            margin-bottom: 1rem;
        }
        .sh-stage-inner {
            position: relative;
            width: 100%;
            transform-origin: center center;
            transition: transform 0.25s ease;
        }
        .sh-stage-img {
            width: 100%;
            height: auto;
            display: block;
            user-select: none;
        }
        .sh-pegefelt {
            position: absolute;
            transform: translate(-50%, -100%);
            padding: 0.25rem 0.54rem;
            border-radius: 10px;
            color: #ffffff;
            font-weight: 900;
            font-size: 0.73rem;
            line-height: 1.15;
            white-space: nowrap;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.26rem;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.62);
            transition: transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;
            z-index: 4;
        }
        .sh-pegefelt::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -7px;
            transform: translateX(-50%);
            border-width: 7px 6px 0 6px;
            border-style: solid;
        }
        .sh-pegefelt.dir-up {
            transform: translate(-50%, 0%);
        }
        .sh-pegefelt.dir-up::after {
            bottom: auto;
            top: -7px;
            border-width: 0 6px 7px 6px;
        }
        .sh-pegefelt.pillar-kontakt {
            background: linear-gradient(135deg, #d97706, #b45309);
            border: 1.5px solid #fde68a;
        }
        .sh-pegefelt.pillar-kontakt::after {
            border-color: #b45309 transparent transparent transparent;
        }
        .sh-pegefelt.pillar-kontakt.dir-up::after {
            border-color: transparent transparent #d97706 transparent;
        }
        .sh-pegefelt.pillar-bloedgoer {
            background: linear-gradient(135deg, #0891b2, #0e7490);
            border: 1.5px solid #a5f3fc;
        }
        .sh-pegefelt.pillar-bloedgoer::after {
            border-color: #0e7490 transparent transparent transparent;
        }
        .sh-pegefelt.pillar-bloedgoer.dir-up::after {
            border-color: transparent transparent #0891b2 transparent;
        }
        .sh-pegefelt.pillar-tak {
            background: linear-gradient(135deg, #059669, #047857);
            border: 1.5px solid #a7f3d0;
        }
        .sh-pegefelt.pillar-tak::after {
            border-color: #047857 transparent transparent transparent;
        }
        .sh-pegefelt.pillar-tak.dir-up::after {
            border-color: transparent transparent #059669 transparent;
        }
        .sh-pegefelt.pillar-afslag {
            background: linear-gradient(135deg, #9333ea, #6b21a8);
            border: 1.5px solid #e9d5ff;
        }
        .sh-pegefelt.pillar-afslag::after {
            border-color: #6b21a8 transparent transparent transparent;
        }
        .sh-pegefelt.pillar-afslag.dir-up::after {
            border-color: transparent transparent #9333ea transparent;
        }
        .sh-pegefelt:hover,
        .sh-pegefelt.active {
            transform: translate(-50%, -106%) scale(1.08);
            box-shadow: 0 0 0 3px #ffffff, 0 8px 22px rgba(0, 0, 0, 0.8);
            z-index: 15;
        }
        .sh-pegefelt.dir-up:hover,
        .sh-pegefelt.dir-up.active {
            transform: translate(-50%, 5%) scale(1.08);
        }
        .sh-pegefelt.compact-mode .sh-pegefelt-label {
            display: none;
        }
        .sh-pegefelt.hidden-pin {
            opacity: 0.14;
            pointer-events: none;
        }
        .sh-pegefelt-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 18px;
            height: 18px;
            padding: 0 4px;
            border-radius: 999px;
            background: rgba(0, 0, 0, 0.38);
            font-size: 0.68rem;
            font-weight: 900;
        }

        .sh-detail-box {
            border-radius: 16px;
            padding: 1.15rem 1.25rem;
            background: rgba(9, 14, 26, 0.94);
            border: 1.5px solid rgba(148, 163, 184, 0.32);
        }
        .sh-pill-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.25rem 0.7rem;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .sh-btn-primary {
            background: linear-gradient(135deg, #059669, #0284c7);
            border: 1px solid #6ee7b7;
            color: #ffffff;
            padding: 0.55rem 1.05rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .sh-btn-primary:hover {
            filter: brightness(1.1);
        }
        .sh-btn-secondary {
            background: rgba(30, 41, 59, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.35);
            color: #e2e8f0;
            padding: 0.5rem 0.92rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.82rem;
            cursor: pointer;
        }
        .sh-btn-secondary:hover {
            border-color: #6ee7b7;
            color: #ffffff;
        }
        .sh-two-cols {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
            gap: 0.95rem;
        }
        .sh-option-btn {
            width: 100%;
            text-align: left;
            background: rgba(30, 41, 59, 0.82);
            border: 1.5px solid rgba(148, 163, 184, 0.3);
            color: #f8fafc;
            padding: 0.78rem 1rem;
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
        .sh-option-btn:hover:not(:disabled) {
            border-color: #34d399;
            background: rgba(16, 185, 129, 0.14);
        }
        .sh-option-btn.correct {
            background: rgba(34, 197, 94, 0.22);
            border-color: #4ade80;
            color: #bbf7d0;
        }
        .sh-option-btn.wrong {
            background: rgba(239, 68, 68, 0.2);
            border-color: #f87171;
            color: #fecaca;
        }
        .sh-feedback {
            margin-top: 0.8rem;
            padding: 0.82rem 1rem;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 700;
            line-height: 1.5;
        }
        .sh-feedback.ok {
            background: rgba(34, 197, 94, 0.16);
            border: 1.5px solid rgba(74, 222, 128, 0.55);
            color: #bbf7d0;
        }
        .sh-feedback.err {
            background: rgba(239, 68, 68, 0.16);
            border: 1.5px solid rgba(248, 113, 113, 0.55);
            color: #fecaca;
        }
        @media (max-width: 720px) {
            .sh-pegefelt {
                padding: 0.18rem 0.38rem;
                font-size: 0.64rem;
            }
            .sh-pegefelt-label {
                display: none;
            }
            .sh-pegefelt.show-mobile-label .sh-pegefelt-label {
                display: inline;
            }
            .sh-card {
                padding: 0.95rem;
            }
        }
    `;
    document.head.appendChild(style);
}

export function renderSamtaleHoeflighedView(container, navigateFn, extraData = {}) {
    const lang = getLang() || 'da';
    const rtlAttr = stRtlAttr(lang);

    if (lang !== 'da' && !isSamtaleLangLoaded(lang)) {
        container.innerHTML = `<div class="view-container samtale-hoeflighed-view" style="padding:2.5rem 1rem; text-align:center; color:#cbd5e1; font-weight:700;">...</div>`;
        ensureSamtaleLang(lang).then(() => {
            if ((getLang() || 'da') === lang && container.isConnected) {
                renderSamtaleHoeflighedView(container, navigateFn, extraData);
            }
        });
        return;
    }

    container.innerHTML = '';
    injectSamtaleHoeflighedStyles();

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container samtale-hoeflighed-view';

    // Top bar med Tilbage + genveje til søster-fladerne (Små LYDE & Små ORD)
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.flexWrap = 'wrap';
    topBar.style.gap = '0.5rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + (getTranslation('back') || st('Tilbage til Samtaletræning', lang));
    backBtn.onclick = () => navigateFn('samtale_traening');
    topBar.appendChild(backBtn);

    const sisterWrap = document.createElement('div');
    sisterWrap.style.display = 'flex';
    sisterWrap.style.flexWrap = 'wrap';
    sisterWrap.style.gap = '0.45rem';

    const sisterLydeBtn = document.createElement('button');
    sisterLydeBtn.type = 'button';
    sisterLydeBtn.className = 'sh-btn-secondary';
    sisterLydeBtn.innerHTML = st('Små lyde →', lang);
    sisterLydeBtn.onclick = () => navigateFn('samtale_smaalyde');
    sisterWrap.appendChild(sisterLydeBtn);

    const sisterOrdBtn = document.createElement('button');
    sisterOrdBtn.type = 'button';
    sisterOrdBtn.className = 'sh-btn-secondary';
    sisterOrdBtn.innerHTML = st('Små ord →', lang);
    sisterOrdBtn.onclick = () => navigateFn('samtale_smaaord');
    sisterWrap.appendChild(sisterOrdBtn);

    topBar.appendChild(sisterWrap);
    viewContainer.appendChild(topBar);

    // Kompakt Hero — ingen gentagelse af søjler eller fraselister
    const hero = document.createElement('div');
    hero.className = 'sh-hero';
    hero.style.padding = '1rem 1.35rem';
    hero.innerHTML = `
        <h1${rtlAttr} style="margin:0 0 0.25rem; font-size:clamp(1.35rem, 2.4vw, 1.85rem); font-weight:900; text-align:start;">${st('Høflighed på dansk', lang)}</h1>
        <p${rtlAttr} style="margin:0; font-size:0.92rem; line-height:1.45;">
            ${st('20 centrale udtryk til at bede pænt, blødgøre, takke og afslå uden ordet "please".', lang)}
        </p>
    `;
    viewContainer.appendChild(hero);

    // Meget kort introboks: Effektivitet vs. Høflighed
    const introBox = document.createElement('div');
    introBox.style.cssText = 'display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.6rem; margin:0 0 0.85rem; padding:0.65rem 1rem; border-radius:12px; background:rgba(15,23,42,0.72); border:1px solid rgba(148,163,184,0.2); font-size:0.84rem; color:#cbd5e1; line-height:1.45;';
    introBox.innerHTML = `
        <div style="flex:1; min-width:220px;">
            <strong style="color:#f8fafc;">To regler i samtalens kunst:</strong>
            <span style="color:#fbbf24; font-weight:700;">Effektivitet</span> (kort, sandt, direkte) og
            <span style="color:#7dd3fc; font-weight:700;">Høflighed</span> (hensynsfuld, gavmild, positiv, beskeden, enig).
            På dansk bøjer vi ofte effektiviteten for at passe på relationen.
        </div>
        <button type="button" id="sh-open-principper" style="background:#151a21; border:1px solid rgba(203,213,225,0.2); color:#e2e8f0; padding:0.32rem 0.72rem; border-radius:999px; font-size:0.76rem; font-weight:700; cursor:pointer; white-space:nowrap;">
            8. Effektivitet vs. Høflighed →
        </button>
    `;
    introBox.querySelector('#sh-open-principper').onclick = () => switchTab('tab_principper');
    viewContainer.appendChild(introBox);

    const tabs = [
        { id:'tab_vrimmel', label: st('1. Vrimlebillede (20)', lang) },
        { id:'tab_kontekst', label: st('2. Social kontekst (30)', lang) },
        { id:'tab_video_please', label: st('3. Video: Uden "please"', lang) },
        { id:'tab_video_tak', label: st('4. Video: Tak & svar', lang) },
        { id:'tab_video_afslag', label: st('5. Video: Afslag & tid', lang) },
        { id:'tab_video_shorts', label: st('6. Video: 6 hverdags-klip', lang) },
        { id:'tab_detektiv', label: st('7. Detektiv', lang) },
        { id:'tab_principper', label: st('8. Effektivitet vs. Høflighed', lang) }
    ];

    let currentTab = extraData?.subPath && tabs.some(t => t.id === extraData.subPath)
        ? extraData.subPath
        :'tab_vrimmel';

    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'sh-tabs';
    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `sh-tab-btn ${t.id === currentTab ? 'active' :''}`;
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
        history.pushState(null, '', `#/${lang}/samtale_hoeflighed/${tabId}`);
        tabsMenu.querySelectorAll('.sh-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.sh-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    function makePanel(id) {
        const p = document.createElement('div');
        p.className = `sh-panel ${currentTab === id ? 'active' :''}`;
        p.dataset.panel = id;
        return p;
    }

    // =========================================================================
    // FANE 1: VRIMLEBILLEDE MED 20 PEGEFELTER + VALGFRI 4-SØJLE SORTERING
    // =========================================================================
    const panel1 = makePanel('tab_vrimmel');
    let activePillarFilter = 'alle';
    let selectedExpr = POLITENESS_EXPRESSIONS[0];
    let compactPins = true;
    let showSortDrill = false;

    const card1 = document.createElement('div');
    card1.className = 'sh-card';
    card1.innerHTML = `
        <div class="sh-toolbar">
            <div class="sh-filters">
                <button type="button" class="sh-filter-btn active" data-pfilter="alle">${st('Alle (20)', lang)}</button>
                <button type="button" class="sh-filter-btn" data-pfilter="kontakt" style="border-color:rgba(245,158,11,0.65); color:#fde68a;">${hoeflighedPillarIcon('kontakt', 14)} ${st('Kontakt & bøn (6)', lang)}</button>
                <button type="button" class="sh-filter-btn" data-pfilter="bloedgoer" style="border-color:rgba(6,182,212,0.65); color:#67e8f9;">${hoeflighedPillarIcon('bloedgoer', 14)} ${st('Blødgør & hjælp (5)', lang)}</button>
                <button type="button" class="sh-filter-btn" data-pfilter="tak" style="border-color:rgba(16,185,129,0.65); color:#6ee7b7;">${hoeflighedPillarIcon('tak', 14)} ${st('Tak & svar (6)', lang)}</button>
                <button type="button" class="sh-filter-btn" data-pfilter="afslag" style="border-color:rgba(192,132,252,0.75); color:#e9d5ff;">${hoeflighedPillarIcon('afslag', 14)} ${st('Afslag & takt (3)', lang)}</button>
            </div>
        </div>

        <div class="sh-stage-wrap">
            <div class="sh-stage-inner" id="sh-stage-inner">
                <img src="assets/samtale_hoeflighed_vrimmel.jpg" onerror="this.src= 'assets/samtale_smaaord_vrimmel.jpg'" alt="Vrimlebillede med de 20 mest almindelige danske høflighedsudtryk" class="sh-stage-img" />
                <div id="sh-pegefelter-layer"></div>
            </div>
        </div>

        <div class="sh-detail-box" id="sh-detail-box"></div>
    `;

    const pegefelterLayer = card1.querySelector('#sh-pegefelter-layer');
    const detailBox = card1.querySelector('#sh-detail-box');
    attachVrimmelControls(card1.querySelector('.sh-stage-wrap'), pegefelterLayer, { lang });

    function renderExprDetail(expr) {
        const meta = PILLAR_META[expr.pillar];
        detailBox.style.borderColor = meta.border;
        detailBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.55rem;">
                <div>
                    <div style="display:flex; align-items:center; gap:0.55rem; flex-wrap:wrap;">
                        <span style="font-size:1.25rem; font-weight:900; color:#ffffff;">#${expr.num}. »${expr.phrase}«</span>
                        <span class="sh-pill-tag" style="background:${meta.bg}; color:${meta.color}; border:1.5px solid ${meta.border};">
                            ${hoeflighedPillarIcon(expr.pillar, 13)} ${st(meta.short, lang)}
                        </span>
                    </div>
                    ${stSub(expr.phrase, 'st-tr-sent', lang)}
                </div>
                <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                    <button type="button" class="sh-btn-secondary" id="sh-goto-video-tab" style="display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.play(12)} ${st('Video →', lang)}
                    </button>
                    <button type="button" class="sh-btn-primary" id="sh-play-detail-audio" style="display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.audio(15)} ${st('Lyt', lang)}
                    </button>
                </div>
            </div>

            <div${rtlAttr} style="font-size:0.84rem; color:#94a3b8; margin-bottom:0.55rem; display:flex; flex-wrap:wrap; gap:0.85rem;">
                <span><strong>${st('Kontekst:', lang)}</strong> ${st(expr.socialContext, lang)}</span>
                <span><strong>${st('Tone:', lang)}</strong> ${st(expr.intonation, lang)}</span>
            </div>

            <p${rtlAttr} style="margin:0 0 0.65rem; color:#e2e8f0; font-size:0.92rem; line-height:1.5;">
                ${st(expr.definition, lang)}
            </p>

            <div style="background:rgba(15,23,42,0.95); border-left:4px solid ${meta.color}; border-radius:12px; padding:0.7rem 0.95rem; margin-bottom:0.6rem;">
                <div style="margin-bottom:0.35rem;">
                    <div style="font-size:0.91rem; color:#e2e8f0;">A: "${expr.dialogueA}"</div>
                    ${stSub(expr.dialogueA, 'st-tr', lang)}
                </div>
                <div>
                    <div style="font-size:0.92rem; color:#ffffff; font-weight:700;">B: "${expr.dialogueB}"</div>
                    ${stSub(expr.dialogueB, 'st-tr-sent', lang)}
                </div>
            </div>

            <div${rtlAttr} style="font-size:0.83rem; color:#fde68a; background:rgba(245,158,11,0.09); border:1px solid rgba(245,158,11,0.28); border-radius:10px; padding:0.48rem 0.8rem;">
                <strong>${st('Pas på:', lang)}</strong> ${st(expr.trapTip, lang)}
            </div>
        `;
        const playBtn = detailBox.querySelector('#sh-play-detail-audio');
        if (playBtn) {
            playBtn.onclick = () => speakPolite(expr.ttsText, expr.ttsRate, expr.ttsPitch);
        }
        const videoBtn = detailBox.querySelector('#sh-goto-video-tab');
        if (videoBtn) {
            videoBtn.onclick = () => switchTab(expr.videoTab);
        }
    }

    function renderPegefelter() {
        pegefelterLayer.innerHTML = '';
        POLITENESS_EXPRESSIONS.forEach(expr => {
            const isHidden = activePillarFilter !== 'alle' && expr.pillar !== activePillarFilter;
            const isSelected = expr.id === selectedExpr.id;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `sh-pegefelt pillar-${expr.pillar} ${expr.pointerDir === 'up' ? 'dir-up' :''} ${isSelected ? 'active show-mobile-label' :''} ${compactPins ? 'compact-mode' :''} ${isHidden ? 'hidden-pin' :''}`;
            btn.style.left = `${expr.x}%`;
            btn.style.top = `${expr.y}%`;
            btn.dataset.exprId = expr.id;
            btn.title = `#${expr.num} ${expr.phrase}`;
            const pIcon = hoeflighedPillarIcon(expr.pillar, 12);
            btn.innerHTML = compactPins
                ? `${pIcon}<span>${expr.num}</span>`
                : `<span class="sh-pegefelt-num">${expr.num}</span>${pIcon}<span class="sh-pegefelt-label">${expr.shortLabel}</span>`;
            btn.onclick = () => {
                selectedExpr = expr;
                renderExprDetail(expr);
                renderPegefelter();
            };
            pegefelterLayer.appendChild(btn);
        });
    }

    card1.querySelectorAll('.sh-filter-btn').forEach(btn => {
        btn.onclick = () => {
            activePillarFilter = btn.dataset.pfilter;
            card1.querySelectorAll('.sh-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPegefelter();
        };
    });

    renderExprDetail(selectedExpr);
    renderPegefelter();
    panel1.appendChild(card1);

    // Valgfri 4-søjle sorteringsbane (sammenklappet som standard; overflødig 20-rækkers tabel fjernet)
    const sortCard = document.createElement('div');
    sortCard.className = 'sh-card';
    const sortPool = shuffleArray([...POLITENESS_EXPRESSIONS]);
    const sortedBuckets = { kontakt: [], bloedgoer: [], tak: [], afslag: [] };
    let activeSortIdx = 0;
    let sortFeedback = '';

    function renderPillarSorting() {
        const placedSet = new Set([
            ...sortedBuckets.kontakt,
            ...sortedBuckets.bloedgoer,
            ...sortedBuckets.tak,
            ...sortedBuckets.afslag
        ]);
        if (placedSet.has(activeSortIdx)) {
            activeSortIdx = sortPool.findIndex((_, i) => !placedSet.has(i));
        }
        const activeItem = activeSortIdx >= 0 ? sortPool[activeSortIdx] : null;

        if (!showSortDrill) {
            sortCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
                    <div${rtlAttr} style="font-size:0.96rem; font-weight:800; color:#e2e8f0;">
                        ${st('Sorteringsøvelse: Placér de 20 udtryk i de 4 kategorier', lang)} (${placedSet.size}/${sortPool.length})
                    </div>
                    <button type="button" class="sh-btn-secondary" id="sh-sort-toggle">${st('Åbn øvelse', lang)}</button>
                </div>
            `;
            sortCard.querySelector('#sh-sort-toggle').onclick = () => {
                showSortDrill = true;
                renderPillarSorting();
            };
            return;
        }

        sortCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <h3${rtlAttr} style="margin:0; font-size:1.05rem; font-weight:900;">${st('Sortér efter funktion', lang)} (${placedSet.size}/${sortPool.length})</h3>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sh-btn-secondary" id="sh-sort-reset">${st('Nulstil', lang)}</button>
                    <button type="button" class="sh-btn-secondary" id="sh-sort-toggle">${st('Skjul', lang)}</button>
                </div>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:0.4rem; padding:0.75rem; border-radius:14px; background:rgba(9,14,26,0.85); border:1px solid rgba(148,163,184,0.22); margin-bottom:0.75rem;">
                ${sortPool.map((item, idx) => {
                    const isPlaced = placedSet.has(idx);
                    const isActive = idx === activeSortIdx;
                    return `
                        <button type="button" class="sh-btn-secondary" data-sort-item="${idx}" ${isPlaced ? 'disabled' :''} style="${isPlaced ? 'opacity:0.3; text-decoration:line-through;' :''}${isActive ? 'background:#10b981; color:#0f172a; border-color:#a7f3d0; font-weight:900;' :''}">
                            ${item.shortLabel}
                        </button>
                    `;
                }).join('')}
            </div>

            ${activeItem ? `
                <div style="margin-bottom:0.75rem; padding:0.65rem 0.9rem; border-radius:12px; background:rgba(16,185,129,0.12); border:1px solid #34d399; font-size:0.9rem;">
                    <div><strong style="color:#ffffff;">»${activeItem.phrase}«</strong> <span${rtlAttr} style="color:#cbd5e1;"> — ${st(activeItem.socialContext, lang)}</span></div>
                    ${stSub(activeItem.phrase, 'st-tr-sent', lang)}
                </div>
            ` : `
                <div class="sh-feedback ok"${rtlAttr} style="margin-bottom:0.75rem;">
                    ${st('Flot! Alle 20 høflighedsudtryk er sorteret.', lang)}
                </div>
            `}

            <div class="sh-pillar-grid">
                ${Object.values(PILLAR_META).map(m => {
                    const items = sortedBuckets[m.id].map(i => sortPool[i]);
                    return `
                        <button type="button" data-sort-bucket="${m.id}" style="text-align:left; padding:0.85rem; border-radius:14px; background:${m.bg}; border:2px dashed ${m.border}; color:#ffffff; cursor:pointer;">
                            <div style="font-size:0.9rem; font-weight:900; color:${m.color}; margin-bottom:0.45rem; display:flex; align-items:center; gap:0.35rem;">
                                ${hoeflighedPillarIcon(m.id, 14)} ${st(m.label, lang)} (${items.length}/${m.count})
                            </div>
                            <div style="display:flex; flex-wrap:wrap; gap:0.3rem;">
                                ${items.length
                                    ? items.map(it => `<span style="padding:0.18rem 0.48rem; border-radius:999px; background:rgba(15,23,42,0.88); border:1px solid ${m.border}; font-size:0.75rem; font-weight:800;">${it.shortLabel}</span>`).join('')
                                    : `<span style="font-size:0.8rem; color:#94a3b8;">${st('Klik for at placere', lang)}</span>`}
                            </div>
                        </button>
                    `;
                }).join('')}
            </div>
            ${sortFeedback ? `<div class="sh-feedback ${sortFeedback.startsWith('✓') ? 'ok' :'err'}"${rtlAttr}>${sortFeedback}</div>` :''}
        `;

        sortCard.querySelector('#sh-sort-toggle').onclick = () => {
            showSortDrill = false;
            renderPillarSorting();
        };
        sortCard.querySelector('#sh-sort-reset').onclick = () => {
            sortedBuckets.kontakt = [];
            sortedBuckets.bloedgoer = [];
            sortedBuckets.tak = [];
            sortedBuckets.afslag = [];
            activeSortIdx = 0;
            sortFeedback = '';
            renderPillarSorting();
        };

        sortCard.querySelectorAll('[data-sort-item]').forEach(btn => {
            btn.onclick = () => {
                activeSortIdx = Number(btn.dataset.sortItem);
                sortFeedback = '';
                renderPillarSorting();
            };
        });

        sortCard.querySelectorAll('[data-sort-bucket]').forEach(bucketBtn => {
            bucketBtn.onclick = () => {
                if (activeSortIdx < 0) return;
                const targetPillar = bucketBtn.dataset.sortBucket;
                const item = sortPool[activeSortIdx];
                if (item.pillar === targetPillar) {
                    sortedBuckets[targetPillar].push(activeSortIdx);
                    sortFeedback = `✓ ${st('Rigtigt!', lang)} »${item.phrase}« ${st('hører under', lang)} ${st(PILLAR_META[targetPillar].label, lang)}.`;
                } else {
                    sortFeedback = `✗ ${st('Ikke helt –', lang)} »${item.phrase}« ${st('hører under', lang)} ${st(PILLAR_META[item.pillar].label, lang)}.`;
                }
                renderPillarSorting();
            };
        });
    }

    renderPillarSorting();
    panel1.appendChild(sortCard);
    panelsHolder.appendChild(panel1);

    // =========================================================================
    // FANE 2: INDSÆT DET RIGTIGE UDTRYK I SOCIAL KONTEKST (20 + 10 = 30 OPGAVER)
    // =========================================================================
    const panel2 = makePanel('tab_kontekst');
    let kontekstMode = 'single';
    let ctxIdx = 0;
    let ctxAnswered = null;
    const ctxSolved = new Set();

    const modeBar2 = document.createElement('div');
    modeBar2.className = 'sh-filters';
    modeBar2.style.marginBottom = '0.9rem';

    const ctxCard = document.createElement('div');
    ctxCard.className = 'sh-card';

    const dualCard = document.createElement('div');
    dualCard.className = 'sh-card';

    function syncKontekstMode() {
        modeBar2.innerHTML = `
            <button type="button" class="sh-filter-btn ${kontekstMode === 'single' ? 'active' :''}" data-kmode="single">
                ${st('Del 1: Vælg udtryk (20)', lang)}
            </button>
            <button type="button" class="sh-filter-btn ${kontekstMode === 'dual' ? 'active' :''}" data-kmode="dual">
                ${st('Del 2: Dialog-bygger (10)', lang)}
            </button>
        `;
        modeBar2.querySelectorAll('[data-kmode]').forEach(btn => {
            btn.onclick = () => {
                kontekstMode = btn.dataset.kmode;
                syncKontekstMode();
            };
        });
        ctxCard.style.display = kontekstMode === 'single' ? 'block' :'none';
        dualCard.style.display = kontekstMode === 'dual' ? 'block' :'none';
    }

    function renderSocialContextTrack() {
        const q = SOCIAL_CONTEXT_CHALLENGES[ctxIdx];
        const m = PILLAR_META[q.pillar];

        ctxCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                    <span class="sh-pill-tag" style="background:${m.bg}; color:${m.color}; border:1.5px solid ${m.border};">
                        ${hoeflighedPillarIcon(q.pillar, 13)} ${st(m.short, lang)}
                    </span>
                    <span style="font-size:0.85rem; color:#94a3b8; font-weight:800;">
                        ${st('Scenarie', lang)} ${ctxIdx + 1}/${SOCIAL_CONTEXT_CHALLENGES.length} • ${st('Løst:', lang)} ${ctxSolved.size}/${SOCIAL_CONTEXT_CHALLENGES.length}
                    </span>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sh-btn-secondary" id="sh-ctx-prev" ${ctxIdx === 0 ? 'disabled' :''}>${st('← Forrige', lang)}</button>
                    <button type="button" class="sh-btn-secondary" id="sh-ctx-next" ${ctxIdx === SOCIAL_CONTEXT_CHALLENGES.length - 1 ? 'disabled' :''}>${st('Næste →', lang)}</button>
                </div>
            </div>

            <div${rtlAttr} style="padding:0.8rem 0.95rem; border-radius:14px; background:rgba(30,41,59,0.75); border:1px solid rgba(148,163,184,0.25); margin-bottom:0.8rem;">
                <div style="font-size:0.8rem; font-weight:900; color:#6ee7b7; text-transform:uppercase; margin-bottom:0.2rem;">
                    ${st(q.setting, lang)}
                </div>
                <div style="font-size:0.92rem; color:#e2e8f0; line-height:1.45;">
                    ${st(q.contextDesc, lang)}
                </div>
            </div>

            <div style="padding:0.95rem 1.1rem; border-radius:15px; background:rgba(9,14,26,0.95); border-left:4px solid ${m.color}; margin-bottom:0.9rem;">
                <div style="margin-bottom:0.4rem;">
                    <div style="font-size:0.96rem; color:#fde68a; font-weight:800;">${q.speakerA}</div>
                    ${stSub(q.speakerA, 'st-tr-sent', lang)}
                </div>
                <div>
                    <div style="font-size:0.94rem; color:#cbd5e1;">${q.speakerB}</div>
                    ${stSub(q.speakerB, 'st-tr', lang)}
                </div>
            </div>

            <div style="display:grid; gap:0.5rem;">
                ${q.options.map(opt => {
                    let cls = 'sh-option-btn';
                    if (ctxAnswered !== null) {
                        if (opt.id === q.answerId) cls += ' correct';
                        else if (opt.id === ctxAnswered) cls += ' wrong';
                    }
                    return `
                        <button type="button" class="${cls}" data-ctx-opt="${opt.id}">
                            <div>
                                <div>»${opt.text}«</div>
                                ${stSub(opt.text, 'st-tr-opt', lang)}
                            </div>
                            <span>${ctxAnswered !== null && opt.id === q.answerId ? '✓' :''}</span>
                        </button>
                    `;
                }).join('')}
            </div>

            ${ctxAnswered !== null ? `
                <div class="sh-feedback ${ctxAnswered === q.answerId ? 'ok' :'err'}"${rtlAttr}>
                    <div><strong>${ctxAnswered === q.answerId ? `✓ ${st('Rigtigt!', lang)}` : `✗ ${st('Ikke det bedste match:', lang)}`}</strong> ${st(q.explanation, lang)}</div>
                    <div style="margin-top:0.55rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <button type="button" class="sh-btn-secondary" id="sh-ctx-speak" style="display:inline-flex; align-items:center; gap:0.35rem;">${samtaleIcons.audio(14)} ${st('Lyt', lang)}</button>
                        ${ctxIdx < SOCIAL_CONTEXT_CHALLENGES.length - 1 ? `<button type="button" class="sh-btn-primary" id="sh-ctx-advance">${st('Næste →', lang)}</button>` :''}
                    </div>
                </div>
            ` :''}
        `;

        const prevBtn = ctxCard.querySelector('#sh-ctx-prev');
        if (prevBtn) prevBtn.onclick = () => { if (ctxIdx > 0) { ctxIdx--; ctxAnswered = null; renderSocialContextTrack(); } };
        const nextBtn = ctxCard.querySelector('#sh-ctx-next');
        if (nextBtn) nextBtn.onclick = () => { if (ctxIdx < SOCIAL_CONTEXT_CHALLENGES.length - 1) { ctxIdx++; ctxAnswered = null; renderSocialContextTrack(); } };

        ctxCard.querySelectorAll('[data-ctx-opt]').forEach(btn => {
            btn.onclick = () => {
                ctxAnswered = btn.dataset.ctxOpt;
                if (ctxAnswered === q.answerId) {
                    ctxSolved.add(ctxIdx);
                }
                renderSocialContextTrack();
            };
        });

        const speakBtn = ctxCard.querySelector('#sh-ctx-speak');
        if (speakBtn) {
            speakBtn.onclick = () => {
                const expr = POLITENESS_EXPRESSIONS.find(x => x.id === q.answerId);
                if (expr) speakPolite(expr.ttsText, expr.ttsRate, expr.ttsPitch);
            };
        }

        const advBtn = ctxCard.querySelector('#sh-ctx-advance');
        if (advBtn) {
            advBtn.onclick = () => {
                ctxIdx++;
                ctxAnswered = null;
                renderSocialContextTrack();
            };
        }
    }

    // Del 2 i Fane 2: 10 A↔B Dialog-byggere med 2 huller ([1] og [2])
    let dualIdx = 0;
    let pick1 = null;
    let pick2 = null;
    let dualChecked = false;
    const dualSolved = new Set();

    function renderDualSlotTrack() {
        const d = DUAL_SLOT_DIALOGUES[dualIdx];
        const previewHtml = d.slotsText
            .replace('[1]', `<strong style="padding:0.15rem 0.5rem; border-radius:7px; background:rgba(16,185,129,0.22); border:1px solid #34d399; color:#a7f3d0;">${pick1 || '[ 1 ]'}</strong>`)
            .replace('[2]', `<strong style="padding:0.15rem 0.5rem; border-radius:7px; background:rgba(56,189,248,0.22); border:1px solid #38bdf8; color:#bae6fd;">${pick2 || '[ 2 ]'}</strong>`);
        const isBothCorrect = pick1 === d.slot1Answer && pick2 === d.slot2Answer;

        dualCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <div>
                    <h3${rtlAttr} style="margin:0; font-size:1.08rem; font-weight:900;">${st(d.title, lang)}</h3>
                    <div style="font-size:0.83rem; color:#94a3b8;">${st('Dialog', lang)} ${dualIdx + 1}/${DUAL_SLOT_DIALOGUES.length} • ${st('Løst:', lang)} ${dualSolved.size}/${DUAL_SLOT_DIALOGUES.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sh-btn-secondary" id="sh-dual-prev" ${dualIdx === 0 ? 'disabled' :''}>${st('← Forrige', lang)}</button>
                    <button type="button" class="sh-btn-secondary" id="sh-dual-next" ${dualIdx === DUAL_SLOT_DIALOGUES.length - 1 ? 'disabled' :''}>${st('Næste →', lang)}</button>
                </div>
            </div>

            <div${rtlAttr} style="font-size:0.84rem; color:#94a3b8; margin-bottom:0.7rem;">${st(d.setting, lang)} • ${st(d.rawHint, lang)}</div>

            <div style="padding:0.95rem 1.1rem; border-radius:14px; background:rgba(9,14,26,0.94); border:1.5px solid rgba(16,185,129,0.4); font-size:0.96rem; line-height:1.55; color:#f8fafc; margin-bottom:0.9rem;">
                <div>${previewHtml}</div>
                ${stSub(d.slotsText, 'st-tr-sent', lang)}
            </div>

            <div class="sh-two-cols" style="margin-bottom:0.85rem;">
                <div style="padding:0.8rem; border-radius:14px; background:rgba(30,41,59,0.7); border:1px solid rgba(16,185,129,0.35);">
                    <div style="font-size:0.78rem; font-weight:900; color:#6ee7b7; text-transform:uppercase; margin-bottom:0.45rem;">${st('Hul [1]', lang)}</div>
                    <div style="display:grid; gap:0.4rem;">
                        ${d.slot1Options.map(o => `
                            <button type="button" class="sh-btn-secondary" data-dslot1="${o}" style="text-align:left; ${pick1 === o ? 'background:#059669; color:#ffffff; border-color:#a7f3d0;' :''}">
                                <div>»${o}«</div>
                                ${stSub(o, 'st-tr-opt', lang)}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div style="padding:0.8rem; border-radius:14px; background:rgba(30,41,59,0.7); border:1px solid rgba(56,189,248,0.35);">
                    <div style="font-size:0.78rem; font-weight:900; color:#7dd3fc; text-transform:uppercase; margin-bottom:0.45rem;">${st('Hul [2]', lang)}</div>
                    <div style="display:grid; gap:0.4rem;">
                        ${d.slot2Options.map(o => `
                            <button type="button" class="sh-btn-secondary" data-dslot2="${o}" style="text-align:left; ${pick2 === o ? 'background:#0284c7; color:#ffffff; border-color:#bae6fd;' :''}">
                                <div>»${o}«</div>
                                ${stSub(o, 'st-tr-opt', lang)}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>

            <button type="button" class="sh-btn-primary" id="sh-dual-check" ${!pick1 || !pick2 ? 'disabled style="opacity:0.5;"' :''}>
                ✓ ${st('Tjek dialogen', lang)}
            </button>

            ${dualChecked ? `
                <div class="sh-feedback ${isBothCorrect ? 'ok' :'err'}"${rtlAttr}>
                    <strong>${isBothCorrect ? `✓ ${st('Rigtigt!', lang)}` : `✗ ${st('Rigtig kombination:', lang)} [1] »${d.slot1Answer}« ${st('og', lang)} [2] »${d.slot2Answer}«.`}</strong>
                    <div style="margin-top:0.25rem;">${st(d.explanation, lang)}</div>
                </div>
            ` :''}
        `;

        const prev = dualCard.querySelector('#sh-dual-prev');
        if (prev) prev.onclick = () => { if (dualIdx > 0) { dualIdx--; pick1 = null; pick2 = null; dualChecked = false; renderDualSlotTrack(); } };
        const next = dualCard.querySelector('#sh-dual-next');
        if (next) next.onclick = () => { if (dualIdx < DUAL_SLOT_DIALOGUES.length - 1) { dualIdx++; pick1 = null; pick2 = null; dualChecked = false; renderDualSlotTrack(); } };

        dualCard.querySelectorAll('[data-dslot1]').forEach(b => {
            b.onclick = () => { pick1 = b.dataset.dslot1; dualChecked = false; renderDualSlotTrack(); };
        });
        dualCard.querySelectorAll('[data-dslot2]').forEach(b => {
            b.onclick = () => { pick2 = b.dataset.dslot2; dualChecked = false; renderDualSlotTrack(); };
        });

        const chk = dualCard.querySelector('#sh-dual-check');
        if (chk) {
            chk.onclick = () => {
                dualChecked = true;
                if (pick1 === d.slot1Answer && pick2 === d.slot2Answer) {
                    dualSolved.add(dualIdx);
                }
                renderDualSlotTrack();
            };
        }
    }

    renderSocialContextTrack();
    renderDualSlotTrack();
    panel2.appendChild(modeBar2);
    panel2.appendChild(ctxCard);
    panel2.appendChild(dualCard);
    syncKontekstMode();
    panelsHolder.appendChild(panel2);

    // =========================================================================
    // HJÆLPE-RENDERER TIL VIDEO-BANERNE (FANE 3, 4 & 5)
    // =========================================================================
    function buildVideoMasterclassPanel(panelEl, headerTitle, videosList, exercisesList, accentColor = '#10b981') {
        let activeVidIdx = 0;
        let exIdx = 0;
        let exAnswered = null;
        const exSolved = new Set();

        const vidCard = document.createElement('div');
        vidCard.className = 'sh-card';

        function renderVidSection() {
            const v = videosList[activeVidIdx];
            vidCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.8rem;">
                    <h3${rtlAttr} style="margin:0; font-size:1.15rem; font-weight:900; color:#ffffff;">${st(headerTitle, lang)}</h3>
                    <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener noreferrer" class="sh-btn-secondary" style="text-decoration:none;">
                        YouTube ↗
                    </a>
                </div>

                <div style="display:flex; flex-wrap:wrap; gap:0.45rem; margin-bottom:0.95rem;">
                    ${videosList.map((vid, idx) => `
                        <button type="button" class="sh-btn-secondary" data-vid-switch="${idx}" style="display:inline-flex; align-items:center; gap:0.35rem; ${idx === activeVidIdx ? `background:linear-gradient(135deg, #059669, #0284c7); color:#ffffff; border-color:#6ee7b7; font-weight:900;` :''}">
                            ${samtaleIcons.play(11)} ${st(vid.badge, lang)}: ${st(vid.title.split(':')[0], lang)}
                        </button>
                    `).join('')}
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:1rem; align-items:start;">
                    <div>
                        <div style="position:relative; width:100%; padding-bottom:56.25%; border-radius:16px; overflow:hidden; border:2px solid rgba(16,185,129,0.5); background:#000;">
                            <iframe
                                src="https://www.youtube.com/embed/${v.id}?rel=0"
                                title="${v.title}"
                                style="position:absolute; inset:0; width:100%; height:100%; border:0;"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>

                    <div style="background:rgba(9,14,26,0.92); border:1.5px solid rgba(148,163,184,0.25); border-radius:16px; padding:0.95rem;">
                        <div${rtlAttr} style="font-size:1rem; font-weight:900; color:#ffffff; margin-bottom:0.3rem;">
                            ${st(v.title, lang)}
                        </div>
                        <p${rtlAttr} style="margin:0 0 0.7rem; font-size:0.84rem; color:#cbd5e1; line-height:1.45;">
                            ${st(v.summary, lang)}
                        </p>
                        <div style="display:grid; gap:0.4rem;">
                            ${v.phrases.map(ph => `
                                <button type="button" class="sh-btn-secondary" data-phrase-tts="${ph.text.replace(/"/g, '&quot;')}" style="text-align:left; display:flex; justify-content:space-between; align-items:center; gap:0.5rem; padding:0.48rem 0.72rem;">
                                    <div>
                                        <div>
                                            <span style="font-size:0.73rem; font-weight:900; color:#6ee7b7; margin-right:0.35rem;">[${ph.time}]</span>
                                            <strong style="color:#ffffff; font-size:0.85rem;">»${ph.text}«</strong>
                                        </div>
                                        ${stSub(ph.text, 'st-tr-sent', lang)}
                                        <div${rtlAttr} style="font-size:0.75rem; color:#94a3b8; margin-top:0.1rem;">${st(ph.note, lang)}</div>
                                    </div>
                                    <span style="color:#6ee7b7;">${samtaleIcons.audio(14)}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            vidCard.querySelectorAll('[data-vid-switch]').forEach(btn => {
                btn.onclick = () => {
                    activeVidIdx = Number(btn.dataset.vidSwitch);
                    renderVidSection();
                };
            });

            vidCard.querySelectorAll('[data-phrase-tts]').forEach(btn => {
                btn.onclick = () => {
                    speakPolite(btn.dataset.phraseTts, 0.9, 1.03);
                };
            });
        }

        renderVidSection();
        panelEl.appendChild(vidCard);

        const exCard = document.createElement('div');
        exCard.className = 'sh-card';

        function renderExSection() {
            const q = exercisesList[exIdx];
            exCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.7rem;">
                    <div>
                        <h3${rtlAttr} style="margin:0; font-size:1.05rem; font-weight:900;">${st('Øvelser til videoen', lang)}</h3>
                        <div style="font-size:0.83rem; color:#94a3b8;">${st('Opgave', lang)} ${exIdx + 1}/${exercisesList.length} • ${st('Score:', lang)} ${exSolved.size}/${exercisesList.length}</div>
                    </div>
                    <div style="display:flex; gap:0.4rem;">
                        <button type="button" class="sh-btn-secondary" data-vex-prev ${exIdx === 0 ? 'disabled' :''}>${st('← Forrige', lang)}</button>
                        <button type="button" class="sh-btn-secondary" data-vex-next ${exIdx === exercisesList.length - 1 ? 'disabled' :''}>${st('Næste →', lang)}</button>
                    </div>
                </div>

                <div${rtlAttr} style="padding:0.85rem 1rem; border-radius:14px; background:rgba(30,41,59,0.78); border-left:4px solid ${accentColor}; margin-bottom:0.75rem;">
                    <div style="font-size:0.93rem; font-weight:800; color:#ffffff; margin-bottom:0.2rem;">${st(q.situation, lang)}</div>
                    <div style="font-size:0.86rem; color:#fde68a; font-weight:700;">${st(q.prompt, lang)}</div>
                </div>

                <div style="display:grid; gap:0.48rem;">
                    ${q.options.map((opt, oIdx) => {
                        let cls = 'sh-option-btn';
                        if (exAnswered !== null) {
                            if (opt.correct) cls += ' correct';
                            else if (oIdx === exAnswered) cls += ' wrong';
                        }
                        return `
                            <button type="button" class="${cls}" data-vex-opt="${oIdx}">
                                <div>
                                    <div>»${opt.text}«</div>
                                    ${stSub(opt.text, 'st-tr-opt', lang)}
                                </div>
                                <span>${exAnswered !== null && opt.correct ? '✓' :''}</span>
                            </button>
                        `;
                    }).join('')}
                </div>

                ${exAnswered !== null ? `
                    <div class="sh-feedback ${q.options[exAnswered]?.correct ? 'ok' :'err'}"${rtlAttr}>
                        <strong>${q.options[exAnswered]?.correct ? `✓ ${st('Rigtigt!', lang)}` : `✗ ${st('Forklaring:', lang)}`}</strong> ${st(q.explanation, lang)}
                    </div>
                ` :''}
            `;

            const prev = exCard.querySelector('[data-vex-prev]');
            if (prev) prev.onclick = () => { if (exIdx > 0) { exIdx--; exAnswered = null; renderExSection(); } };
            const next = exCard.querySelector('[data-vex-next]');
            if (next) next.onclick = () => { if (exIdx < exercisesList.length - 1) { exIdx++; exAnswered = null; renderExSection(); } };

            exCard.querySelectorAll('[data-vex-opt]').forEach(btn => {
                btn.onclick = () => {
                    const idx = Number(btn.dataset.vexOpt);
                    exAnswered = idx;
                    if (q.options[idx]?.correct) {
                        exSolved.add(exIdx);
                        speakPolite(q.options[idx].text, 0.9, 1.03);
                    }
                    renderExSection();
                };
            });
        }

        renderExSection();
        panelEl.appendChild(exCard);
    }

    // FANE 3: Video-bane A (Video 1, 2 & 3)
    const panel3 = makePanel('tab_video_please');
    buildVideoMasterclassPanel(panel3,
'Høflig på dansk uden "please" (Video 1–3)',
        VIDEO_LANE_A_VIDEOS,
        LANE_A_EXERCISES,
'#f59e0b');
    panelsHolder.appendChild(panel3);

    // FANE 4: Video-bane B (Video 4 + Tak på dansk + Tak for i aftes)
    const panel4 = makePanel('tab_video_tak');
    buildVideoMasterclassPanel(panel4,
'Tak, svar på tak & "Tak for sidst"',
        VIDEO_LANE_B_VIDEOS,
        LANE_B_EXERCISES,
'#10b981');
    panelsHolder.appendChild(panel4);

    // FANE 5: Video-bane C (Høflige afslag & Hvad er uhøfligt i Danmark?)
    const panel5 = makePanel('tab_video_afslag');
    buildVideoMasterclassPanel(panel5,
'Høflige afslag & dansk tidskultur',
        VIDEO_LANE_C_VIDEOS,
        LANE_C_EXERCISES,
'#c084fc');
    panelsHolder.appendChild(panel5);

    // =========================================================================
    // FANE 6: VIDEO-BANE D — 6 HVERDAGS-SHORTS + LYN-TRÆNING
    // =========================================================================
    const panel6 = makePanel('tab_video_shorts');
    let activeShortIdx = 0;
    let shortExIdx = 0;
    let shortExAns = null;
    const shortExSolved = new Set();

    const shortsCard = document.createElement('div');
    shortsCard.className = 'sh-card';

    function renderShortsSection() {
        const s = VIDEO_LANE_D_SHORTS[activeShortIdx];
        shortsCard.innerHTML = `
            <h3${rtlAttr} style="margin:0 0 0.75rem; font-size:1.15rem; font-weight:900;">${st('6 hverdags-situationer (Shorts)', lang)}</h3>

            <div style="display:flex; flex-wrap:wrap; gap:0.45rem; margin-bottom:0.95rem;">
                ${VIDEO_LANE_D_SHORTS.map((item, idx) => `
                    <button type="button" class="sh-btn-secondary" data-short-switch="${idx}" style="display:inline-flex; align-items:center; gap:0.35rem; ${idx === activeShortIdx ? 'background:linear-gradient(135deg, #0891b2, #059669); color:#ffffff; border-color:#a5f3fc; font-weight:900;' :''}">
                        ${samtaleIcons.play(11)} ${st(item.title.split('(')[0].trim(), lang)}
                    </button>
                `).join('')}
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr)); gap:1rem; align-items:start;">
                <div>
                    <div style="position:relative; width:100%; max-width:340px; margin:0 auto; padding-bottom:110%; border-radius:16px; overflow:hidden; border:2px solid rgba(6,182,212,0.55); background:#000;">
                        <iframe
                            src="https://www.youtube.com/embed/${s.id}?rel=0"
                            title="${s.title}"
                            style="position:absolute; inset:0; width:100%; height:100%; border:0;"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
                <div style="background:rgba(9,14,26,0.92); border:1.5px solid rgba(148,163,184,0.25); border-radius:16px; padding:1rem;">
                    <div${rtlAttr} style="font-size:1.05rem; font-weight:900; color:#ffffff; margin-bottom:0.3rem;">${st(s.title, lang)}</div>
                    <p${rtlAttr} style="margin:0 0 0.7rem; font-size:0.88rem; color:#fde68a; font-weight:700;">${st(s.situation, lang)}</p>
                    <div style="display:grid; gap:0.42rem;">
                        ${s.phrases.map(ph => `
                            <button type="button" class="sh-btn-secondary" data-short-tts="${ph.replace(/[»«]/g, '').replace(/"/g, '&quot;')}" style="text-align:left; display:flex; justify-content:space-between; align-items:center; gap:0.5rem; padding:0.55rem 0.8rem;">
                                <div>
                                    <div style="font-weight:800; color:#ffffff;">${ph}</div>
                                    ${stSub(ph, 'st-tr-sent', lang)}
                                </div>
                                <span style="color:#67e8f9;">${samtaleIcons.audio(14)}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        shortsCard.querySelectorAll('[data-short-switch]').forEach(btn => {
            btn.onclick = () => {
                activeShortIdx = Number(btn.dataset.shortSwitch);
                renderShortsSection();
            };
        });

        shortsCard.querySelectorAll('[data-short-tts]').forEach(btn => {
            btn.onclick = () => speakPolite(btn.dataset.shortTts, 0.9, 1.03);
        });
    }

    renderShortsSection();
    panel6.appendChild(shortsCard);

    const shortExCard = document.createElement('div');
    shortExCard.className = 'sh-card';

    function renderShortEx() {
        const q = LANE_D_EXERCISES[shortExIdx];
        shortExCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.7rem;">
                <div>
                    <h3${rtlAttr} style="margin:0; font-size:1.05rem; font-weight:900;">${st('Hurtig-træning', lang)}</h3>
                    <div style="font-size:0.83rem; color:#94a3b8;">${st('Situation', lang)} ${shortExIdx + 1}/${LANE_D_EXERCISES.length} • ${st('Løst:', lang)} ${shortExSolved.size}/${LANE_D_EXERCISES.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sh-btn-secondary" id="sh-sex-prev" ${shortExIdx === 0 ? 'disabled' :''}>${st('← Forrige', lang)}</button>
                    <button type="button" class="sh-btn-secondary" id="sh-sex-next" ${shortExIdx === LANE_D_EXERCISES.length - 1 ? 'disabled' :''}>${st('Næste →', lang)}</button>
                </div>
            </div>

            <div${rtlAttr} style="padding:0.85rem 1rem; border-radius:14px; background:rgba(30,41,59,0.78); border-left:4px solid #06b6d4; margin-bottom:0.75rem; font-size:0.94rem; font-weight:800; color:#ffffff;">
                ${st(q.prompt, lang)}
            </div>

            <div style="display:grid; gap:0.48rem;">
                ${q.options.map((opt, idx) => {
                    let cls = 'sh-option-btn';
                    if (shortExAns !== null) {
                        if (opt.correct) cls += ' correct';
                        else if (idx === shortExAns) cls += ' wrong';
                    }
                    return `
                        <button type="button" class="${cls}" data-sex-opt="${idx}">
                            <div>
                                <div>»${opt.text}«</div>
                                ${stSub(opt.text, 'st-tr-opt', lang)}
                            </div>
                            <span>${shortExAns !== null && opt.correct ? '✓' :''}</span>
                        </button>
                    `;
                }).join('')}
            </div>

            ${shortExAns !== null ? `
                <div class="sh-feedback ${q.options[shortExAns]?.correct ? 'ok' :'err'}"${rtlAttr}>
                    <strong>${q.options[shortExAns]?.correct ? `✓ ${st('Rigtigt!', lang)}` : `✗ ${st('Forklaring:', lang)}`}</strong> ${st(q.explanation, lang)}
                </div>
            ` :''}
        `;

        const prev = shortExCard.querySelector('#sh-sex-prev');
        if (prev) prev.onclick = () => { if (shortExIdx > 0) { shortExIdx--; shortExAns = null; renderShortEx(); } };
        const next = shortExCard.querySelector('#sh-sex-next');
        if (next) next.onclick = () => { if (shortExIdx < LANE_D_EXERCISES.length - 1) { shortExIdx++; shortExAns = null; renderShortEx(); } };

        shortExCard.querySelectorAll('[data-sex-opt]').forEach(btn => {
            btn.onclick = () => {
                const idx = Number(btn.dataset.sexOpt);
                shortExAns = idx;
                if (q.options[idx]?.correct) {
                    shortExSolved.add(shortExIdx);
                    speakPolite(q.options[idx].text, 0.9, 1.03);
                }
                renderShortEx();
            };
        });
    }

    renderShortEx();
    panel6.appendChild(shortExCard);
    panelsHolder.appendChild(panel6);

    // =========================================================================
    // FANE 7: HØFLIGHEDS-DETEKTIVEN I VRIMLEBILLEDET (14 MISSIONER)
    // =========================================================================
    const panel7 = makePanel('tab_detektiv');
    let detIdx = 0;
    let detFeedback = null;
    let detShowHint = false;
    const detSolved = new Set();

    const detCard = document.createElement('div');
    detCard.className = 'sh-card';

    function renderDetective() {
        const m = DETECTIVE_MISSIONS[detIdx];

        detCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <div>
                    <h3${rtlAttr} style="margin:0; font-size:1.1rem; font-weight:900;">${st('Høfligheds-detektiven', lang)}</h3>
                    <div style="font-size:0.83rem; color:#94a3b8;">${st('Mission', lang)} ${detIdx + 1}/${DETECTIVE_MISSIONS.length} • ${st('Fundet:', lang)} ${detSolved.size}/${DETECTIVE_MISSIONS.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                    <button type="button" class="sh-btn-secondary" id="sh-det-hint">${detShowHint ? st('Skjul spor', lang) : st('Vis spor', lang)}</button>
                    <button type="button" class="sh-btn-secondary" id="sh-det-prev" ${detIdx === 0 ? 'disabled' :''}>${st('← Forrige', lang)}</button>
                    <button type="button" class="sh-btn-secondary" id="sh-det-next" ${detIdx === DETECTIVE_MISSIONS.length - 1 ? 'disabled' :''}>${st('Næste →', lang)}</button>
                </div>
            </div>

            <div${rtlAttr} style="padding:0.85rem 1.05rem; border-radius:14px; background:rgba(30,41,59,0.85); border-left:4px solid #10b981; margin-bottom:0.8rem;">
                <div style="font-size:0.98rem; font-weight:900; color:#ffffff;">${st(m.prompt, lang)}</div>
                ${detShowHint ? `<div style="margin-top:0.35rem; font-size:0.84rem; color:#fde68a;">${st('Spor:', lang)} ${st(m.hint, lang)}</div>` :''}
            </div>

            ${detFeedback ? `
                <div class="sh-feedback ${detFeedback.ok ? 'ok' :'err'}" style="margin-bottom:0.8rem;">
                    <div${rtlAttr}>${detFeedback.text}</div>
                    ${detFeedback.subHtml || ''}
                    ${detFeedback.ok && detIdx < DETECTIVE_MISSIONS.length - 1 ? `
                        <button type="button" class="sh-btn-primary" id="sh-det-advance" style="margin-top:0.5rem;">${st('Næste mission →', lang)}</button>
                    ` :''}
                </div>
            ` :''}

            <div class="sh-stage-wrap">
                <div class="sh-stage-inner">
                    <img src="assets/samtale_hoeflighed_vrimmel.jpg" onerror="this.src= 'assets/samtale_smaaord_vrimmel.jpg'" alt="Detektiv-vrimlebillede" class="sh-stage-img" />
                    <div id="sh-det-layer"></div>
                </div>
            </div>
        `;

        const detLayer = detCard.querySelector('#sh-det-layer');
        attachVrimmelControls(detCard.querySelector('.sh-stage-wrap'), detLayer, { lang });
        POLITENESS_EXPRESSIONS.forEach(expr => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const isCorrectPick = detFeedback?.ok && expr.id === m.answerId;
            btn.className = `sh-pegefelt pillar-${expr.pillar} ${expr.pointerDir === 'up' ? 'dir-up' :''} ${isCorrectPick ? 'active show-mobile-label' :'compact-mode'}`;
            btn.style.left = `${expr.x}%`;
            btn.style.top = `${expr.y}%`;
            const pIcon = hoeflighedPillarIcon(expr.pillar, 12);
            btn.innerHTML = isCorrectPick
                ? `<span class="sh-pegefelt-num">${expr.num}</span>${pIcon}<span class="sh-pegefelt-label">${expr.shortLabel}</span>`
                : `${pIcon}<span>${expr.num}</span>`;
            btn.onclick = () => {
                if (expr.id === m.answerId) {
                    detSolved.add(detIdx);
                    detFeedback = {
                        ok: true,
                        text: `✓ ${st('Fundet!', lang)} #${expr.num} »${expr.phrase}« (${st(expr.socialContext, lang)}).`,
                        subHtml: stSub(expr.phrase, 'st-tr-sent', lang)
                    };
                    speakPolite(expr.ttsText, expr.ttsRate, expr.ttsPitch);
                } else {
                    detFeedback = {
                        ok: false,
                        text: `✗ ${st('Det var', lang)} #${expr.num} (»${expr.shortLabel}«). ${st('Prøv igen.', lang)}`
                    };
                }
                renderDetective();
            };
            detLayer.appendChild(btn);
        });

        const hintBtn = detCard.querySelector('#sh-det-hint');
        if (hintBtn) hintBtn.onclick = () => { detShowHint = !detShowHint; renderDetective(); };
        const prevBtn = detCard.querySelector('#sh-det-prev');
        if (prevBtn) prevBtn.onclick = () => { if (detIdx > 0) { detIdx--; detFeedback = null; detShowHint = false; renderDetective(); } };
        const nextBtn = detCard.querySelector('#sh-det-next');
        if (nextBtn) nextBtn.onclick = () => { if (detIdx < DETECTIVE_MISSIONS.length - 1) { detIdx++; detFeedback = null; detShowHint = false; renderDetective(); } };
        const advBtn = detCard.querySelector('#sh-det-advance');
        if (advBtn) advBtn.onclick = () => { detIdx++; detFeedback = null; detShowHint = false; renderDetective(); };
    }

    renderDetective();
    panel7.appendChild(detCard);
    panelsHolder.appendChild(panel7);

    // =========================================================================
    // TAB 8: EFFEKTIVITET VS. HØFLIGHED (VÆGTSKÅL, 5 REGLER & JO–MEN-BYGGER)
    // =========================================================================
    const panel8 = makePanel('tab_principper');
    panel8.appendChild(createSamtalePrincipperTab());
    panelsHolder.appendChild(panel8);

    container.appendChild(viewContainer);
}
