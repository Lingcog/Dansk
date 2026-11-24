import { getTranslation, getLang } from '../utils/i18n.js';
import { shuffleArray } from '../utils/shuffle.js';
import { samtaleIcons, samtaleRoleIcon } from '../utils/samtaleIcons.js';
import { st, stSub, stRtlAttr, isSamtaleLangLoaded, ensureSamtaleLang, SAMTALE_TR_CSS } from '../utils/samtale_translations.js';
import { attachVrimmelControls } from '../utils/vrimmelPegefeltStandard.js';

/**
 * SamtaleSmaalydeView — "Små lyde der får en samtale til at fungere"
 * Placeret under hovedfladen "Samtaletræning" som søster-flade til
 * "Små ord der får en samtale til at fungere".
 *
 * Indeholder præcis de 20 danske dialoglyde opdelt i:
 * TALER (4 lyde: Øh/Øhm, Tja/Tjo, Jamen, Altså)
 * LYTTER (7 lyde: Mm/Mhm, Ja/Jaja, Indåndings-"ja", Aha, Nej/Næh, Hva'/Hæ?, Ih)
 * BEGGE — Taler & Lytter (9 lyde: Hm/Hmm, Nå/Nåh, Ej, Åh/Årh, Hov, Puha/Puh, Uha/Uh, Øv, Tsk)
 *
 * Samt den fulde YouTube-fane om "Nå… på dansk" (GIUuCmSt5uI) i Fane 4 (tab_tonefald).
 */

const ROLE_META = {
    taler: {
        id: 'taler',
        label: 'Taler',
        short: 'TALER',
        subtitle: 'Når du har eller tager taleturen',
        color: '#f59e0b',
        border: 'rgba(245, 158, 11, 0.78)',
        bg: 'rgba(245, 158, 11, 0.16)',
        chipBg: 'linear-gradient(135deg, rgba(180, 83, 9, 0.95), rgba(120, 53, 15, 0.96))'
    },
    lytter: {
        id: 'lytter',
        label: 'Lytter',
        short: 'LYTTER',
        subtitle: 'Når du viser opbakning eller reagerer',
        color: '#06b6d4',
        border: 'rgba(6, 182, 212, 0.82)',
        bg: 'rgba(6, 182, 212, 0.16)',
        chipBg: 'linear-gradient(135deg, rgba(14, 116, 144, 0.95), rgba(22, 78, 99, 0.96))'
    },
    begge: {
        id: 'begge',
        label: 'Begge (Taler & Lytter)',
        short: 'BEGGE',
        subtitle: 'Bruges både af taleren og lytteren',
        color: '#c084fc',
        border: 'rgba(192, 132, 252, 0.82)',
        bg: 'rgba(168, 85, 247, 0.16)',
        chipBg: 'linear-gradient(135deg, rgba(180, 83, 9, 0.92), rgba(14, 116, 144, 0.92))'
    }
};

// =========================================================================
// DE 20 DANSKE DIALOGLYDE (PRÆCIS EFTER TABELLEN)
// =========================================================================
export const DIALOG_SOUNDS = [
    {
        num: 1,
        id: 's1_oehm',
        sound: 'Øh / Øhm',
        shortLabel: 'Øh / Øhm',
        role: 'taler',
        turnAction: 'Tænkepause, tøven og et signal om, at man beholder ordet',
        intonation: 'Flad, udtrukket vokallyd → (ofte efterfulgt af lukket m-lyd)',
        x: 9,
        y: 34,
        pointerDir: 'down',
        bodyCue: 'Kigger tænksomt op til siden med en finger ved hagen.',
        definition: '"Øh..." og "Øhm..." er talerens vigtigste lyd til at holde taleturen åben, mens hjernen leder efter næste ord eller formulering.',
        talerUsage: 'Som TALER: "Jeg skal til møde klokken... øhm... halv tre." (Signalerer: Afbryd mig ikke, jeg er stadig i gang!)',
        lytterUsage: 'Bruges sjældent som ren lytter-lyd – hvis lytteren siger "Øhm...", betyder det normalt, at lytteren nu vil tage ordet.',
        trapTip: 'Hvis du er helt tavs i 3 sekunder i stedet for at sige "øhm...", tror danskeren, at du er færdig med at tale!',
        ttsText: 'Jeg kommer klokken, øhm, kvart over fire.',
        ttsRate: 0.88,
        ttsPitch: 0.98
    },
    {
        num: 2,
        id: 's2_mhm',
        sound: 'Mm / Mhm',
        shortLabel: 'Mm / Mhm',
        role: 'lytter',
        turnAction: 'Aktiv lytning og opbakning ("jeg følger med, fortsæt bare")',
        intonation: 'Blød, to-tonet næselyd med lukket mund og let stigende slutning ↗',
        x: 18,
        y: 44,
        pointerDir: 'down',
        bodyCue: 'Nikker roligt med lukkede læber og varm øjenkontakt.',
        definition: '"Mm" og "Mhm" med lukket mund er danskernes hyppigste lyttesignal. Det viser taleren, at du er 100 % med, uden at du afbryder.',
        talerUsage: 'Som TALER bruges "Mmm!" kun ved smag ("Mmm, god kaffe!") – i selve samtalen er "Mhm" en ren lytter-lyd.',
        lytterUsage: 'Som LYTTER: Taleren fortæller en længere historie, og du nikker for hver 2.-3. sætning: "Mm... mhm..."',
        trapTip: 'Uden små "mm / mhm"-lyde undervejs føler en dansk taler hurtigt, at du ikke hører efter.',
        ttsText: 'Mm-hm, det giver rigtig god mening.',
        ttsRate: 0.9,
        ttsPitch: 1.05
    },
    {
        num: 3,
        id: 's3_hmm',
        sound: 'Hm / Hmm',
        shortLabel: 'Hm / Hmm',
        role: 'begge',
        turnAction: 'Eftertænksomhed, overvejelse eller mild skepsis',
        intonation: 'Lang, dyb eller let svævende h-næselyd ~',
        x: 25,
        y: 31,
        pointerDir: 'down',
        bodyCue: 'Stryger sig tænksomt over hagen/skægget med let rynkede bryn.',
        definition: '"Hm / Hmm" viser, at hjernen vejer noget for og imod – eller at der er noget, der undrer én.',
        talerUsage: 'Som TALER (overvejelse før svar): "Hmm... lad mig lige tjekke kalenderen først."',
        lytterUsage: 'Som LYTTER (eftertanke eller mild skepsis): "Hmm... tror du virkelig, det holder i længden?"',
        trapTip: 'Pas på: Et meget kort, skarpt stigende "Hm?" betyder derimod "Hvad sagde du?".',
        ttsText: 'Hmm, det må jeg lige tænke lidt over.',
        ttsRate: 0.86,
        ttsPitch: 0.94
    },
    {
        num: 4,
        id: 's4_naa',
        sound: 'Nå / Nåh',
        shortLabel: 'Nå / Nåh',
        role: 'begge',
        turnAction: 'Overraskelse, ny forståelse eller markering af emneskift',
        intonation: 'Kort stigende "Nå!" (overraskelse ↗), langt "Nååh..." (forståelse ↘) eller "Nå, men..." (skift →)',
        x: 14,
        y: 66,
        pointerDir: 'up',
        bodyCue: 'Hævede øjenbryn i overraskelse eller varmt anerkendende nik.',
        definition: '"Nå" er dansk talesprogs schweizerkniv! Med tonefald og længde kan det udtrykke mindst 10 forskellige nuancer.',
        talerUsage: 'Som TALER (igangsætter / emneskift / erindring): "Nå, hvad så?" / "Nå, skal vi gå?" / "Nåå ja, det havde jeg glemt!"',
        lytterUsage: 'Som LYTTER (overraskelse / aha / empati / lytning): "Nå! Virkelig?" / "Nåååh, okay, nu forstår jeg!" / "Nåårh, hvor er den sød!"',
        trapTip: 'Se hele YouTube-analysen af de 10 danske "Nå"-betydninger i Fane 4 (Tonefalds-laboratoriet)!',
        ttsText: 'Nå! Det vidste jeg slet ikke! Nåååh, okay, nu forstår jeg!',
        ttsRate: 0.9,
        ttsPitch: 1.06
    },
    {
        num: 5,
        id: 's5_jajaja',
        sound: 'Ja / Jaja',
        shortLabel: 'Ja / Jaja',
        role: 'lytter',
        turnAction: 'Bekræftelse og enighed (jaja kan også signalere utålmodighed eller overbærenhed)',
        intonation: 'Roligt "Ja..." (opbakning →) vs. hurtigt "Jaja!" (utålmodigt/affejende)',
        x: 31,
        y: 48,
        pointerDir: 'down',
        bodyCue: 'Nikker bekræftende – eller vifter let med hånden ved hurtigt "jaja".',
        definition: 'Som lytter bruger man rolige "Ja..." til at bakke taleren op. Men siger man "Jaja" hurtigt, skifter betydningen til overbærenhed eller utålmodighed!',
        talerUsage: 'Som TALER kan "Jaja, men..." bruges til hurtigt at affeje en indvending og komme videre.',
        lytterUsage: 'Som LYTTER: Ét roligt "Ja..." = "Jeg er enig, fortsæt!". Hurtigt "Jaja..." = "Ja, det ved jeg godt, kom nu videre" eller "Det skal nok gå alt sammen".',
        trapTip: 'Sig aldrig "Ja-ja-ja!" tre gange hurtigt i træk, når en dansker forklarer dig noget – det opfattes som "Stop nu, jeg gider ikke høre mere!".',
        ttsText: 'Ja, det har du helt ret i. Jaja, det skal nok gå.',
        ttsRate: 0.92,
        ttsPitch: 1.02
    },
    {
        num: 6,
        id: 's6_indaanding_ja',
        sound: 'Indåndings-"ja"',
        shortLabel: 'Indåndings-"ja"',
        role: 'lytter',
        turnAction: 'Et hurtigt ja udtalt på indånding; udtrykker stille enighed, genkendelse eller eftertanke',
        intonation: 'Hviskende, luftigt ".hja" trukket IND på indåndingen (indånding ←)',
        x: 37,
        y: 35,
        pointerDir: 'down',
        bodyCue: 'Trækker vejret blødt ind gennem let åbne læber med et stille, indforstået nik.',
        definition: 'En ægte dansk (og nordisk) specialitet! I stedet for at sige "ja" på udåndingen trækker lytteren luften IND, mens læberne former "ja" (eller "jo").',
        talerUsage: 'Bruges nogle gange af taleren helt til sidst i egen sætning (".hja...") som et stille punktum.',
        lytterUsage: 'Som LYTTER: Når man deler en stille erkendelse eller genkender en følelse ("Det bliver tidligt mørkt nu..." — ".hja..."). Det viser dyb enighed uden at forstyrre stilheden.',
        trapTip: 'Udlændinge tror ofte, at danskeren gisper eller har ondt i halsen – men det er bare det varmeste, mest lavmælte danske "ja"!',
        ttsText: 'Ja... præcis, sådan er det jo.',
        ttsRate: 0.8,
        ttsPitch: 0.88
    },
    {
        num: 7,
        id: 's7_aha',
        sound: 'Aha',
        shortLabel: 'Aha!',
        role: 'lytter',
        turnAction: 'Pludselig forståelse eller erkendelse af en ny sammenhæng',
        intonation: 'Tydeligt to-stavelses løft på anden stavelse (a-HA! ↗↘)',
        x: 43,
        y: 56,
        pointerDir: 'up',
        bodyCue: 'Løfter pegefingeren eller knipser let, idet brikkerne falder på plads.',
        definition: '"Aha!" markerer det øjeblik, hvor lytteren gennemskuer sammenhængen eller forstår en teknisk/praktisk forklaring.',
        talerUsage: 'Sjældent som taler (kun hvis man selv opdager noget på en skærm: "Aha, der var fejlen!").',
        lytterUsage: 'Som LYTTER: "Du skal trykke på den blå knap først." — "Aha! Så forstår jeg bedre, hvorfor den ikke startede!"',
        trapTip: '"Aha" er mere fokuseret på logik og fakta ("nu ser jeg systemet"), mens "Nåååh" også rummer følelse og empati.',
        ttsText: 'Aha! Så er det derfor, det fungerer sådan!',
        ttsRate: 0.92,
        ttsPitch: 1.08
    },
    {
        num: 8,
        id: 's8_nej_naeh',
        sound: 'Nej / Næh',
        shortLabel: 'Nej! / Næh!',
        role: 'lytter',
        turnAction: 'Overraskelse, vantro eller medfølelse (f.eks. "nej, hvor ærgerligt")',
        intonation: 'Udbrud med eftertryk og faldende-stigende følelse ("Neeej!" / "Næh dog!")',
        x: 35,
        y: 72,
        pointerDir: 'up',
        bodyCue: 'Hænderne op til kinderne i medfølende eller glædelig forbløffelse.',
        definition: 'På dansk bruges "Nej!" og "Næh!" som lytter-udbrud SLET IKKE til at sige imod – men derimod til at vise stærk medfølelse, begejstring eller overraskelse!',
        talerUsage: 'Som taler er et almindeligt "nej" blot benægtelse – men som dialoglyd er det lytterens følelses-spejl.',
        lytterUsage: 'Som LYTTER (ved både gode og dårlige nyheder!): "Jeg har vundet 5.000 kr.!" — "Neeej, hvor fantastisk!" / "Min cykel er blevet stjålet." — "Nej, hvor ærgerligt!" / "Næh, sikke en flot jakke!"',
        trapTip: 'Bliv ikke forvirret, hvis en dansker svarer "Neeej!" med et stort smil, når du fortæller en god nyhed – det betyder "Hvor er det vildt og dejligt!".',
        ttsText: 'Neeej, hvor er det bare ærgerligt! Næh, hvor flot!',
        ttsRate: 0.9,
        ttsPitch: 1.1
    },
    {
        num: 9,
        id: 's9_ej',
        sound: 'Ej',
        shortLabel: 'Ej!',
        role: 'begge',
        turnAction: 'Protest, forundring eller forstærkelse af en reaktion ("ej, det mener du ikke")',
        intonation: 'Kort eller trukket ud diftong [ɑj] med kraftigt følelsestryk',
        x: 49,
        y: 38,
        pointerDir: 'down',
        bodyCue: 'Læner sig tilbage med åbne hænder i legende protest eller begejstring.',
        definition: '"Ej!" er danskernes foretrukne følelses-forstærker. Det kan udtrykke alt fra legende protest ("Ej, stop nu!") til varm begejstring ("Ej, hvor hyggeligt!").',
        talerUsage: 'Som TALER: "Ej, nu glemte jeg altså min pung igen!" (selvironisk ærgrelse) eller "Ej, hvor er det lækkert at se jer!"',
        lytterUsage: 'Som LYTTER: "Ej, det mener du ikke?!" (forundring) eller "Ej, hvor er det synd for ham!" (medfølelse).',
        trapTip: '"Ej" står næsten altid sammen med et følelsesord: "Ej hvor godt", "Ej hvor sjovt", "Ej hvor irriterende".',
        ttsText: 'Ej, det mener du ikke! Ej, hvor er det bare hyggeligt!',
        ttsRate: 0.94,
        ttsPitch: 1.12
    },
    {
        num: 10,
        id: 's10_aarh',
        sound: 'Åh / Årh',
        shortLabel: 'Åh / Årh',
        role: 'begge',
        turnAction: 'Medfølelse, lettelse, frustration eller begejstring',
        intonation: 'Lang, dyb og blødt udåndet vokallyd (med tydelig r-farvning i "Årh") ↘',
        x: 53,
        y: 67,
        pointerDir: 'up',
        bodyCue: 'Knæler varmt ned ved hundehvalpen eller lægger hånden blødt på brystet.',
        definition: '"Åh" og især det meget danske "Årh" åbner for de store følelser i samtalen – fra smeltende omsorg og lettelse til dybt suk.',
        talerUsage: 'Som TALER: "Årh, det var dejligt endelig at få fri!" (lettelse/nydelse) eller "Åh nej, bussen kører nu!" (frustration).',
        lytterUsage: 'Som LYTTER: "Årh, kom her og få et kram!" (varm medfølelse) eller "Årh, hvor er du sød at sige det!" (taknemmelighed).',
        trapTip: 'Når en dansker siger "Årh, det skal du ikke tænke på!", er det et varmt, beroligende signal.',
        ttsText: 'Årh, hvor er du sød! Åh, sikke en lettelse!',
        ttsRate: 0.88,
        ttsPitch: 0.98
    },
    {
        num: 11,
        id: 's11_tja_tjo',
        sound: 'Tja / Tjo',
        shortLabel: 'Tja / Tjo',
        role: 'taler',
        turnAction: 'Tvivl, forbehold eller halvhjertet enighed',
        intonation: 'Blødt t-foranslag efterfulgt af svævende, tøvende vokal ~',
        x: 58,
        y: 44,
        pointerDir: 'down',
        bodyCue: 'Hovedet på skrå og skuldrene løftet i et blødt, tøvende skuldertræk.',
        definition: 'Når en dansker ikke vil svare et hårdt "ja" eller "nej", bruger taleren "Tja..." eller "Tjo..." til at vise forbehold: "Både og / måske / med visse forbehold".',
        talerUsage: 'Som TALER (når man får et spørgsmål): "Gik mødet godt?" — "Tja... vi blev da enige om noget af det." / "Er det ikke en god idé?" — "Tjo, måske..."',
        lytterUsage: 'Bruges, når lytteren overtager taleturen for at give et modereret, diplomatisk svar.',
        trapTip: 'Læg mærke til parallellen til Ja/Jo: "Tja" bruges oftest ved neutrale spørgsmål, mens "Tjo" ofte bruges ved spørgsmål med "ikke" eller når man hælder lidt mod ja.',
        ttsText: 'Tja, det ved jeg nu ikke helt. Tjo, det kunne vi måske godt.',
        ttsRate: 0.86,
        ttsPitch: 0.96
    },
    {
        num: 12,
        id: 's12_hov',
        sound: 'Hov',
        shortLabel: 'Hov!',
        role: 'begge',
        turnAction: 'Pludselig opmærksomhed, opdagelse af en fejl eller et uventet indskud',
        intonation: 'Kort, vågent udbrud med diftong [hɒw] ↗',
        x: 62,
        y: 62,
        pointerDir: 'up',
        bodyCue: 'Griber hurtigt ud efter en kop, der er ved at vælte på bordet.',
        definition: '"Hov!" (og "Hovsa!") er danskernes bløde alarmklokke, når noget pludselig sker, når man opdager en lille fejl, eller når man kommer i tanke om et indskud.',
        talerUsage: 'Som TALER: "Hov, jeg sagde tirsdag – jeg mente selvfølgelig onsdag!" (retter egen fejl) eller "Hov, jeg var lige ved at spilde!"',
        lytterUsage: 'Som LYTTER: "Hov, du tabte vist din handske der!" (venlig opmærksomhed uden at skræmme).',
        trapTip: 'På dansk siger man ofte "Hov, undskyld!" i stedet for bare "Undskyld", når man kommer til at støde let ind i nogen.',
        ttsText: 'Hov! Jeg mente selvfølgelig på onsdag. Hov, du tabte din handske!',
        ttsRate: 0.95,
        ttsPitch: 1.08
    },
    {
        num: 13,
        id: 's13_hva_hae',
        sound: "Hva' / Hæ?",
        shortLabel: "Hva' / Hæ?",
        role: 'lytter',
        turnAction: 'Manglende forståelse og opfordring til gentagelse',
        intonation: 'Kort, skarpt stigende spørgetone ↗',
        x: 68,
        y: 34,
        pointerDir: 'down',
        bodyCue: 'Læner sig frem med hånden bag øret og spørgende øjenbryn.',
        definition: '"Hva\'?" (og det meget uformelle "Hæ?") er lytterens hurtige nødbremse, når man enten ikke hørte, hvad der blev sagt, eller slet ikke forstod det.',
        talerUsage: 'Kun som hurtig hale i uformelt sprog ("Det var sjovt, hva\'?"), men som selvstændig lyd er det lytterens opklarings-signal.',
        lytterUsage: 'Som LYTTER: "Vi mødes ved indgang C." — "Hva\'? Hvilken indgang sagde du?"',
        trapTip: 'Høfligheds-tip: "Hæ?" er meget uformelt (bruges mest mellem gode venner). Til fremmede eller på arbejde er "Hva\'behar?" eller "Undskyld, hvad sagde du?" meget pænere!',
        ttsText: 'Hva? Hvad sagde du lige der?',
        ttsRate: 0.94,
        ttsPitch: 1.12
    },
    {
        num: 14,
        id: 's14_jamen',
        sound: 'Jamen',
        shortLabel: 'Jamen...',
        role: 'taler',
        turnAction: 'Blød indvending, tilføjelse eller igangsættelse af et svar',
        intonation: 'Hurtigt sammensmeltet opstarts-lyd ("Jæm\'n...") i starten af taleturen →',
        x: 73,
        y: 52,
        pointerDir: 'up',
        bodyCue: 'Rækker en åben hånd frem for blødt at tage ordet eller svare.',
        definition: '"Jamen" (ja + men smeltet sammen til én lyd) gør både enighed og uenighed blødere i starten af en taletur.',
        talerUsage: 'Som TALER (blød indvending): "Jamen, vi aftalte jo klokken to?" — eller (varm tilslutning): "Jamen, det lyder da som en super idé!"',
        lytterUsage: 'Signalerer det præcise sekund, hvor lytteren skifter rolle og bliver TALER.',
        trapTip: 'Uden "Jamen..." i starten kan en indvending eller et svar på dansk let komme til at lyde lidt brat.',
        ttsText: 'Jamen det gør vi da bare! Jamen havde vi ikke aftalt i morgen?',
        ttsRate: 0.92,
        ttsPitch: 1.02
    },
    {
        num: 15,
        id: 's15_altsaa',
        sound: 'Altså',
        shortLabel: 'Altså...',
        role: 'taler',
        turnAction: 'Præcisering, uddybning eller markering af en vigtig pointe',
        intonation: 'Blødt tryk på første stavelse ("AL-så...") efterfulgt af kort mikro-pause →',
        x: 78,
        y: 36,
        pointerDir: 'down',
        bodyCue: 'Gestikulerer forklarende med begge hænder for at samle sin pointe.',
        definition: '"Altså..." i starten af taleturen samler opmærksomheden og signalerer: "Nu skal jeg forklare dig, hvordan det i virkeligheden hænger sammen".',
        talerUsage: 'Som TALER: "Altså, det er ikke fordi jeg ikke vil med – jeg har bare lovet at passe min niece."',
        lytterUsage: 'Kan også bruges som mildt opgivende/kærligt udbrud: "Ej, altså!" eller "Dig, altså!".',
        trapTip: 'Når "Altså" står allerførst, skifter det IKKE ordstillingen (ligesom "men" og "for"): "Altså, jeg kommer først kl. 16."',
        ttsText: 'Altså, hvis du spørger mig, så er det en rigtig god plan.',
        ttsRate: 0.9,
        ttsPitch: 1.0
    },
    {
        num: 16,
        id: 's16_puha',
        sound: 'Puha / Puh',
        shortLabel: 'Puha! / Puh!',
        role: 'begge',
        turnAction: 'Lettelse, udmattelse eller overvældelse',
        intonation: 'Kraftigt udåndet p-pust efterfulgt af faldende "-ha" ↘',
        x: 83,
        y: 64,
        pointerDir: 'up',
        bodyCue: 'Tørrer sveden af panden med håndryggen efter at have båret en tung kasse.',
        definition: '"Puha!" (og "Pyha!") lukker trykket ud af ballonen, når noget er fysisk hårdt, meget varmt, overvældende – eller når man ånder lettet op.',
        talerUsage: 'Som TALER: "Puha, jeg nåede lige toget i sidste sekund!" eller "Puha, hvor er der varmt herinde!"',
        lytterUsage: 'Som LYTTER (empatisk spejling): Kollegaen siger: "Jeg har haft 8 møder i træk i dag." — Du svarer: "Puha! Så trænger du da vist til en kop kaffe!"',
        trapTip: '"Puha" kan også bruges om dårlig lugt ("Puha, her lugter af røg!").',
        ttsText: 'Puha, det var en lang trappe! Puha, det lyder godt nok hårdt!',
        ttsRate: 0.9,
        ttsPitch: 0.96
    },
    {
        num: 17,
        id: 's17_uha',
        sound: 'Uha / Uh',
        shortLabel: 'Uha! / Uh!',
        role: 'begge',
        turnAction: 'Bekymring, spænding eller ubehag ved noget, der bliver sagt',
        intonation: 'Spændt, rundet u-lyd med lille løft eller gys ("U-ha!" ↗↘)',
        x: 86,
        y: 34,
        pointerDir: 'down',
        bodyCue: 'Trækker skuldrene lidt op og folder hænderne i spændt bekymring.',
        definition: '"Uha!" (og "Uh!") bruges, når noget lyder farligt, glat, dyrt, spændende eller lidt ubehageligt.',
        talerUsage: 'Som TALER: "Uha, det er glat på cykelstien i morges – pas på derude!"',
        lytterUsage: 'Som LYTTER: "Jeg skal til tandlægen og rodbehandles kl. 14." — "Uha! Det misunder jeg dig ikke!"',
        trapTip: 'Læg mærke til forskellen: "Puha" = udmattelse/varme/lettelse (puster ud). "Uha" = bekymring/spænding/ubehag (trækker sig let sammen).',
        ttsText: 'Uha, det lyder farligt i det glatte føre!',
        ttsRate: 0.9,
        ttsPitch: 1.06
    },
    {
        num: 18,
        id: 's18_oev',
        sound: 'Øv',
        shortLabel: 'Øv!',
        role: 'begge',
        turnAction: 'Skuffelse eller medfølelse over et dårligt udfald',
        intonation: 'Kort eller trukket ud faldende [øw]-lyd ↘',
        x: 89,
        y: 73,
        pointerDir: 'up',
        bodyCue: 'Kigger slukøret ned på kagen, der lige er faldet på gulvet.',
        definition: '"Øv!" er et unikt og ekstremt almindeligt dansk lydord for skuffelse, ærgrelse og uheld – både på egne og andres vegne.',
        talerUsage: 'Som TALER: "Øv, nu begynder det at regne, lige når vi skal grille!"',
        lytterUsage: 'Som LYTTER (hurtig medfølelse): "Koncerten blev desværre aflyst." — "Ej, øv! Hvor ærgerligt for jer!"',
        trapTip: 'Man kan også sige "Sikke en øv-dag" eller "Øv bøv" (lidt barnligt/humoristisk) på dansk.',
        ttsText: 'Øv! Hvor er det altså ærgerligt!',
        ttsRate: 0.9,
        ttsPitch: 0.94
    },
    {
        num: 19,
        id: 's19_ih',
        sound: 'Ih',
        shortLabel: 'Ih!',
        role: 'lytter',
        turnAction: 'Begejstring, overvældelse eller mild irritation',
        intonation: 'Lys, høj og lang [iː]-lyd ("Ih, hvor flot!" ↗↘)',
        x: 92,
        y: 45,
        pointerDir: 'down',
        bodyCue: 'Klapper begejstret hænderne sammen over en gave eller overraskelse.',
        definition: '"Ih!" er en lys, energisk reaktionslyd, der oftest udtrykker varm taknemmelighed og begejstring (eller sammen med "altså": mild irritation).',
        talerUsage: 'Som taler mest i faste udbrud som "Ih altså, nu driller computeren igen!"',
        lytterUsage: 'Som LYTTER / MODTAGER: "Vi har købt blomster med til dig." — "Ih, tusind tak! Hvor er I søde!" / "Ih, hvor glæder jeg mig!"',
        trapTip: '"Ih, tak skal du have!" får en tak til at lyde ekstra hjertelig og levende på dansk.',
        ttsText: 'Ih, tusind tak skal du have! Hvor er det flot!',
        ttsRate: 0.94,
        ttsPitch: 1.15
    },
    {
        num: 20,
        id: 's20_tsk',
        sound: 'Tsk',
        shortLabel: 'Tsk!',
        role: 'begge',
        turnAction: 'Smaskelyd med tungen; udtrykker irritation, misbilligelse eller ærgrelse',
        intonation: 'Kort klik-/smaskelyd med tungespidsen mod fortænderne (ofte 1 eller 2 gange: "tsk-tsk")',
        x: 94,
        y: 62,
        pointerDir: 'up',
        bodyCue: 'Kigger på uret og ryster let på hovedet med sammenpressede læber.',
        definition: '"Tsk" (tungeklik på indånding) er en ikke-vokal lyd, der udtrykker hovedrystende misbilligelse, irritation eller "det var dog utroligt".',
        talerUsage: 'Som TALER: Kigger på sin telefon eller et forsinket tog: "Tsk... nu er linje B forsinket igen!"',
        lytterUsage: 'Som LYTTER (solidarisk forargelse med taleren): "Han kørte bare videre uden at holde tilbage." — "Tsk! Det er simpelthen for dårligt!"',
        trapTip: 'Brug kun "Tsk" når du er forarget PÅ VEGNE AF samtalepartneren (eller over et fælles problem) – hvis du siger "Tsk" AD din samtalepartner, virker det meget nedladende!',
        ttsText: 'Tsk, tsk, det er simpelthen for dårligt!',
        ttsRate: 0.88,
        ttsPitch: 0.95
    }
];

// =========================================================================
// BANE 2: 20 "VÆLG DEN RIGTIGE DIALOGLYD"-ØVELSER (1 FOR HVER AF DE 20 LYDE)
// =========================================================================
const CHOOSE_SOUND_EXERCISES = [
    {
        num: 1,
        role: 'taler',
        context: 'Du er ved at give dit telefonnummer i telefonen, men skal lige tænke et sekund midt i tallene uden at miste taleturen.',
        speakerA: 'Receptionist: "Hvad er de sidste fire cifre i dit nummer?"',
        speakerB: 'Dig (Taler): "Det er 42... ___... 89."',
        options: ['s1_oehm', 's2_mhm', 's7_aha', 's18_oev'],
        answerId: 's1_oehm',
        explanation: '"Øh / Øhm" er talerens tænkepause-lyd, som viser, at du stadig er i gang med at svare.'
    },
    {
        num: 2,
        role: 'lytter',
        context: 'Din kollega fortæller engageret om sin weekend. Du vil vise med lukket mund, at du følger interesseret med, uden at afbryde.',
        speakerA: 'Kollega: "...og så sejlede vi ellers ud fra havnen klokken otte om morgenen..."',
        speakerB: 'Dig (Lytter, nikker roligt): "___"',
        options: ['s2_mhm', 's1_oehm', 's12_hov', 's13_hva_hae'],
        answerId: 's2_mhm',
        explanation: '"Mm / Mhm" er det klassiske danske lyttesignal ("jeg følger med, fortsæt bare").'
    },
    {
        num: 3,
        role: 'begge',
        context: 'En sælger påstår, at en brugt cykel uden bremser er "helt som ny". Du stryger dig over hagen og udtrykker eftertænksom skepsis.',
        speakerA: 'Sælger: "Den fejler absolut ingenting!"',
        speakerB: 'Dig (Eftertænksom / skeptisk): "___... forhjulet ser nu ret skævt ud."',
        options: ['s3_hmm', 's19_ih', 's7_aha', 's2_mhm'],
        answerId: 's3_hmm',
        explanation: '"Hm / Hmm" viser overvejelse, eftertænksomhed eller mild skepsis.'
    },
    {
        num: 4,
        role: 'begge',
        context: 'En medkursist fortæller dig en helt uventet nyhed om, at skolen flytter i nye lokaler i næste måned.',
        speakerA: 'Medkursist: "Har du hørt, at vi får helt nye klasselokaler fra den 1.?"',
        speakerB: 'Dig (Overrasket): "___! Det anede jeg slet ikke!"',
        options: ['s4_naa', 's1_oehm', 's11_tja_tjo', 's20_tsk'],
        answerId: 's4_naa',
        explanation: 'Et kort, stigende "Nå!" er danskernes hurtigste reaktion på ny og overraskende information.'
    },
    {
        num: 5,
        role: 'lytter',
        context: 'Din ven er lidt bekymret for, om maden til festen rækker. Du vil berolige ham lidt overbærende og bekræftende.',
        speakerA: 'Ven: "Tror du nu også, der er kartofler nok til alle?"',
        speakerB: 'Dig (Lytter): "___, der er masser af mad – tag det helt roligt!"',
        options: ['s5_jajaja', 's13_hva_hae', 's17_uha', 's18_oev'],
        answerId: 's5_jajaja',
        explanation: '"Ja / Jaja" bruges både til almindelig enighed og til varm, lidt overbærende beroligelse ("jaja, det skal nok gå").'
    },
    {
        num: 6,
        role: 'lytter',
        context: 'I sidder stille over en kop kaffe og kigger ud på efterårsregnen. Din ven siger stille: "Tiden går godt nok hurtigt i år." Du svarer med en stille nordisk lyd på indåndingen.',
        speakerA: 'Ven: "Tiden går godt nok hurtigt i år..."',
        speakerB: 'Dig (Lytter, på indånding): "___... det må man sige."',
        options: ['s6_indaanding_ja', 's12_hov', 's13_hva_hae', 's19_ih'],
        answerId: 's6_indaanding_ja',
        explanation: 'Indåndings-"ja" (.hja) udtrykker stille, dyb enighed, genkendelse og eftertanke i rolige samtaler.'
    },
    {
        num: 7,
        role: 'lytter',
        context: 'IT-supporteren viser dig, at skærmen kun var sort, fordi stikket under bordet sad løst. Pludselig ser du sammenhængen!',
        speakerA: 'IT-supporter: "Se her – strømstikket under hæve-sænkebordet var gledet ud."',
        speakerB: 'Dig (Lytter): "___! Så er det jo klart, at skærmen ikke tændte!"',
        options: ['s7_aha', 's11_tja_tjo', 's18_oev', 's13_hva_hae'],
        answerId: 's7_aha',
        explanation: '"Aha!" markerer pludselig logisk forståelse eller erkendelse af en ny sammenhæng.'
    },
    {
        num: 8,
        role: 'lytter',
        context: 'Din kollega fortæller trist, at hendes nye elcykel blev stjålet foran supermarkedet i går. Du vil udtrykke stærk medfølelse og vantro!',
        speakerA: 'Kollega: "Min helt nye elcykel blev stjålet i går aftes."',
        speakerB: 'Dig (Lytter): "___, hvor ærgerligt! Var den låst?"',
        options: ['s8_nej_naeh', 's2_mhm', 's7_aha', 's11_tja_tjo'],
        answerId: 's8_nej_naeh',
        explanation: 'På dansk bruges "Nej! / Næh!" som følelsesladet lytter-udbrud for vantro, overraskelse og medfølelse ("Nej, hvor ærgerligt!").'
    },
    {
        num: 9,
        role: 'begge',
        context: 'Din ven fortæller en helt vild historie om, at han mødte sin gamle folkeskolelærer midt i en landsby i Vietnam!',
        speakerA: 'Ven: "...og så stod min gamle matematiklærer simpelthen i køen foran mig i Hanoi!"',
        speakerB: 'Dig (Forundret forstærkning): "___, det mener du ikke?! Hvor er det vildt!"',
        options: ['s9_ej', 's1_oehm', 's11_tja_tjo', 's20_tsk'],
        answerId: 's9_ej',
        explanation: '"Ej!" bruges til forundring, legende protest eller til at forstærke en følelsesreaktion ("Ej, det mener du ikke!").'
    },
    {
        num: 10,
        role: 'begge',
        context: 'En kollega har taget sin 8 uger gamle hundehvalp med forbi gårdhaven, og den lægger hovedet på dine sko.',
        speakerA: 'Kollega: "Må jeg præsentere vores nye lille hvalp, Balder?"',
        speakerB: 'Dig (Smelter af begejstring/omsorg): "___, hvor er den bare nuttet!"',
        options: ['s10_aarh', 's13_hva_hae', 's17_uha', 's20_tsk'],
        answerId: 's10_aarh',
        explanation: '"Åh / Årh" udtrykker varm medfølelse, omsorg, lettelse eller begejstring.'
    },
    {
        num: 11,
        role: 'taler',
        context: 'Din nabo spørger, om du tror, det bliver tørvejr hele weekenden. Du tvivler og vil kun svare halvhjertet/forbeholdent.',
        speakerA: 'Nabo: "Tror du, vi slipper helt for regn på lørdag?"',
        speakerB: 'Dig (Taler): "___... de lovede vist enkelte byger sidst på eftermiddagen."',
        options: ['s11_tja_tjo', 's7_aha', 's12_hov', 's19_ih'],
        answerId: 's11_tja_tjo',
        explanation: '"Tja / Tjo" er talerens klassiske lyd til tvivl, forbehold eller halvhjertet enighed.'
    },
    {
        num: 12,
        role: 'begge',
        context: 'En person foran dig i bussen rejser sig, og du ser, at hans nøglebundt glider ud af lommen og falder ned på sædet.',
        speakerA: '(Nøglebundtet lander på bussædet)',
        speakerB: 'Dig (Pludselig opmærksomhed): "___! Du tabte vist dine nøgler der!"',
        options: ['s12_hov', 's6_indaanding_ja', 's11_tja_tjo', 's16_puha'],
        answerId: 's12_hov',
        explanation: '"Hov!" skaber hurtig, venlig opmærksomhed, når man opdager en fejl eller et uheld.'
    },
    {
        num: 13,
        role: 'lytter',
        context: 'I står på en larmende togstation, og din ven siger noget lavt, som drukner i højttalerstøjen.',
        speakerA: 'Ven: "(Mumler lavt i støjen) ...vi tager spor 7..."',
        speakerB: 'Dig (Lytter, hånden bag øret): "___? Hvilket spor sagde du?"',
        options: ['s13_hva_hae', 's2_mhm', 's6_indaanding_ja', 's16_puha'],
        answerId: 's13_hva_hae',
        explanation: '"Hva\'? / Hæ?" markerer manglende hørelse/forståelse og beder taleren om at gentage.'
    },
    {
        num: 14,
        role: 'taler',
        context: 'Din kollega siger, at I ikke har mere printerpapir, men du vil blødt indvende, at du lige har stillet to nye kasser ind i skabet.',
        speakerA: 'Kollega: "Vi er desværre løbet helt tør for printerpapir."',
        speakerB: 'Dig (Taler): "___ jeg stillede da to nye kasser ind i skabet i morges?"',
        options: ['s14_jamen', 's2_mhm', 's18_oev', 's20_tsk'],
        answerId: 's14_jamen',
        explanation: '"Jamen..." indleder en blød indvending, en tilføjelse eller et venligt svar uden at virke hård.'
    },
    {
        num: 15,
        role: 'taler',
        context: 'Du vil uddybe og præcisere over for dit team, hvad der er den allervigtigste pointe i dagens plan.',
        speakerA: 'Kollega: "Hvad skal vi fokusere mest på først?"',
        speakerB: 'Dig (Taler): "___, det vigtigste i dag er, at vi får sendt invitationerne ud inden kl. 12."',
        options: ['s15_altsaa', 's7_aha', 's13_hva_hae', 's18_oev'],
        answerId: 's15_altsaa',
        explanation: '"Altså..." samler opmærksomheden, når taleren vil præcisere, uddybe eller fremhæve en pointe.'
    },
    {
        num: 16,
        role: 'begge',
        context: 'Du har lige båret tre tunge flyttekasser op på 4. sal i sommervarmen og sætter dem endelig ned på gulvet.',
        speakerA: '(Sætter den sidste tunge kasse ned på 4. sal)',
        speakerB: 'Dig (Udmattet & lettet): "___! Det var godt nok en varm omgang!"',
        options: ['s16_puha', 's7_aha', 's11_tja_tjo', 's13_hva_hae'],
        answerId: 's16_puha',
        explanation: '"Puha / Puh" udtrykker fysisk udmattelse, varme, overvældelse eller lettelse.'
    },
    {
        num: 17,
        role: 'begge',
        context: 'Din nabo fortæller, at der er meldt isslag og spejlglatte veje i morgen tidlig, hvor du skal køre på arbejde kl. 6.',
        speakerA: 'Nabo: "Vejrudsigten melder om isslag og spejlglatte veje i morgen tidlig."',
        speakerB: 'Dig (Bekymret): "___! Så må jeg hellere køre hjemmefra i rigtig god tid."',
        options: ['s17_uha', 's2_mhm', 's5_jajaja', 's19_ih'],
        answerId: 's17_uha',
        explanation: '"Uha / Uh" udtrykker bekymring, spænding eller ubehag ved noget, der bliver sagt.'
    },
    {
        num: 18,
        role: 'begge',
        context: 'I kommer ned til bageren søndag morgen, men ser et skilt på døren om, at alle kanelsnegle lige er blevet udsolgt.',
        speakerA: 'Bagerjomfru: "Vi har desværre lige solgt den allersidste kanelsnegl."',
        speakerB: 'Dig (Skuffet): "___! Det var ellers lige dem, vi var kommet efter."',
        options: ['s18_oev', 's7_aha', 's16_puha', 's19_ih'],
        answerId: 's18_oev',
        explanation: '"Øv!" er det klassiske danske lydord for skuffelse eller medfølelse over et ærgerligt udfald.'
    },
    {
        num: 19,
        role: 'lytter',
        context: 'Dine kolleger overrasker dig med morgenbrød og flag på dit skrivebord på din fødselsdag.',
        speakerA: 'Kolleger: "Tillykke med fødselsdagen! Vi har dækket op til dig herhenne!"',
        speakerB: 'Dig (Modtager, begejstret): "___, hvor er I bare søde! Tusind tak!"',
        options: ['s19_ih', 's3_hmm', 's11_tja_tjo', 's20_tsk'],
        answerId: 's19_ih',
        explanation: '"Ih!" udtrykker lys, spontan begejstring og overvældet taknemmelighed ("Ih, tusind tak!").'
    },
    {
        num: 20,
        role: 'begge',
        context: 'Din ven fortæller, at en bilist parkerede lige foran deres indkørsel og nægtede at flytte bilen. Du klikker misbilligende med tungen i solidaritet.',
        speakerA: 'Ven: "...og så nægtede han simpelthen at flytte bilen fra vores indkørsel!"',
        speakerB: 'Dig (Misbilligende tungeklik): "___! Nogle mennesker tænker altså kun på sig selv."',
        options: ['s20_tsk', 's2_mhm', 's7_aha', 's19_ih'],
        answerId: 's20_tsk',
        explanation: '"Tsk" (smaskelyd med tungen) udtrykker irritation, misbilligelse eller hovedrystende ærgrelse.'
    }
];

// =========================================================================
// BANE 3: 15 ROLLE- & FUNKTIONS-DUELLER (HVORDAN BRUGES LYDEN HER?)
// Viser især hvordan de 9 "Begge"-lyde skifter mellem Taler og Lytter!
// =========================================================================
const DUEL_CHOICES = [
    { id: 'taler_hold_take', icon: '', label: 'TALER: Tager ordet, holder tænkepause eller indleder svar', role: 'taler' },
    { id: 'taler_own_emotion', icon: '', label: 'TALER: Udtrykker egen følelse, tvivl eller opdagelse i egen tale', role: 'taler' },
    { id: 'lytter_backchannel', icon: '', label: 'LYTTER: Stille opbakning, forståelse eller opklaring ("fortsæt")', role: 'lytter' },
    { id: 'lytter_empathy', icon: '', label: 'LYTTER: Spejler talerens historie med medfølelse, overraskelse eller begejstring', role: 'lytter' }
];

const SOUND_DUELS = [
    {
        quote: 'A: "Jeg har slæbt mursten i haven hele weekenden." — B: "Puha! Så må du da være helt øm i ryggen i dag!"',
        signal: 'Puha! (brugt af B)',
        correctAction: 'lytter_empathy',
        explanation: '"Puha" er en "Begge"-lyd! Her bruger B den som LYTTER til empatisk at spejle, hvor hårdt A har arbejdet.'
    },
    {
        quote: 'A (tørrer panden efter cykelturen): "Puha, der var strid modvind hele vejen langs søerne i morges!"',
        signal: 'Puha! (brugt af A)',
        correctAction: 'taler_own_emotion',
        explanation: 'Her bruger A samme lyd ("Puha!") som TALER til at beskrive sin egen fysiske udmattelse og lettelse.'
    },
    {
        quote: 'A: "Vi skal mødes med kunden klokken... øhm... halv elleve inde i byen."',
        signal: 'Øhm...',
        correctAction: 'taler_hold_take',
        explanation: 'Taleren bruger "Øhm..." til at HOLDE taleturen åben under en tænkepause.'
    },
    {
        quote: 'A: "Det har godt nok været et langt år..." — B (på stille indånding): ".hja... det må man sige."',
        signal: 'Indåndings-"ja"',
        correctAction: 'lytter_backchannel',
        explanation: 'Indåndings-"ja" er et rendyrket, lavmælt LYTTER-signal for stille enighed og eftertanke.'
    },
    {
        quote: 'A: "Vores fly til Málaga blev aflyst, da vi stod i lufthavnen." — B: "Ej, øv! Hvor er det synd for jer!"',
        signal: 'Ej, øv! (brugt af B)',
        correctAction: 'lytter_empathy',
        explanation: 'B bruger "Begge"-lydene "Ej!" og "Øv!" som LYTTER til at vise varm medfølelse med A\'s uheld.'
    },
    {
        quote: 'A (kigger ud ad vinduet): "Øv, nu begynder det at styrtregne, lige før jeg skal cykle hjem!"',
        signal: 'Øv! (brugt af A)',
        correctAction: 'taler_own_emotion',
        explanation: 'Her bruger A "Øv!" som TALER til at udtrykke sin egen skuffelse over regnvejret.'
    },
    {
        quote: 'A: "Synes du, vi skal vælge den dyre model?" — B: "Tja... den billige kan jo egentlig det samme."',
        signal: 'Tja...',
        correctAction: 'taler_own_emotion',
        explanation: 'B tager taleturen med "Tja..." for at udtrykke tvivl, forbehold og en forsigtig vurdering.'
    },
    {
        quote: 'A: "Når du drejer nøglen til venstre, deaktiverer du alarmen." — B: "Aha! Nu giver det hele mening!"',
        signal: 'Aha!',
        correctAction: 'lytter_backchannel',
        explanation: 'Lytteren kvitterer med "Aha!", da den logiske sammenhæng pludselig falder på plads.'
    },
    {
        quote: 'A: "Jeg sagde vist, at mødet var i lokale 4 – hov, det er selvfølgelig i lokale 7!"',
        signal: 'Hov! (brugt af A)',
        correctAction: 'taler_own_emotion',
        explanation: 'Taleren bruger "Hov!" midt i sin egen sætning, da han pludselig opdager sin egen fejl.'
    },
    {
        quote: 'A: "Vi har købt din yndlingskage med til kaffen!" — B: "Ih, hvor er I bare betænksomme!"',
        signal: 'Ih!',
        correctAction: 'lytter_empathy',
        explanation: 'B reagerer som modtager/lytter med et lyst "Ih!" for at vise spontan begejstring og taknemmelighed.'
    },
    {
        quote: 'A: "Vi når det aldrig inden deadline." — B: "Jamen vi har da hele torsdagen til at gøre det færdigt?"',
        signal: 'Jamen...',
        correctAction: 'taler_hold_take',
        explanation: 'B tager taleturen med "Jamen..." for at komme med en blød, beroligende indvending.'
    },
    {
        quote: 'A: "Jeg skal holde oplæg for 200 mennesker i morgen." — B: "Uha! Er du spændt?"',
        signal: 'Uha! (brugt af B)',
        correctAction: 'lytter_empathy',
        explanation: 'B bruger "Uha!" som lytter til at leve sig ind i spændingen og nerverne omkring A\'s store oplæg.'
    }
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
            { label: 'Nårrh... — rynkede bryn ~', curve: 'M10,22 Q35,14 60,26 T90,22', color: '#a78bfa', meaning: 'Tror ikke på dig' }
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
        title: '11. Tre slags "JA": Indåndings-"ja" vs. Roligt "Ja" vs. "Ja-ja-ja!"',
        situation: 'En god ven sidder i skumringen og siger stille: "Det har været en lang uge, men nu er det endelig fredag." Hvilken lyd giver den mest indforståede, rolige nordiske enighed?',
        ttsSample: 'Ja... det har det virkelig.',
        correctIdx: 0,
        variants: [
            { label: 'Indåndings-"ja" (.hja på indånding (indånding ←))', curve: 'M85,22 Q50,16 15,24', color: '#4ade80', meaning: 'Stille, dyb genkendelse og eftertænksom enighed' },
            { label: 'Ja-ja-ja! (hurtigt 3 gange i træk)', curve: 'M10,28 L25,10 L40,28 L55,10 L70,28', color: '#f87171', meaning: 'Utålmodigt: "Stop nu, jeg har hørt det!"' },
            { label: 'Tja... (tøvende & svævende ~)', curve: 'M10,20 Q35,8 60,28 T90,18', color: '#f59e0b', meaning: 'Tvivl eller forbehold' }
        ],
        explanation: 'Indåndings-"ja" (.hja) er perfekt i rolige, fortrolige øjeblikke, hvor man viser stille enighed uden at bryde stemningen.'
    },
    {
        isNaaVideo: false,
        role: 'lytter',
        title: '12. Lukket mund i samtalen: "Mhm" vs. "Hmm" vs. "Øhm"',
        situation: 'Din makker forklarer en plan. Hvilken næselyd viser, at hun trygt skal fortælle videre (uden at du lyder skeptisk eller vil overtage ordet)?',
        ttsSample: 'Mm-hm! Fortsæt bare.',
        correctIdx: 0,
        variants: [
            { label: 'Mm / Mhm (to toner, let stigende ↗)', curve: 'M10,26 L42,26 L55,26 L88,12', color: '#4ade80', meaning: 'Aktiv lytning: "Jeg følger med, fortsæt bare"' },
            { label: 'Hm / Hmm (dyb & svævende ~)', curve: 'M10,22 Q35,14 60,26 T90,22', color: '#f59e0b', meaning: 'Eftertænksomhed eller mild skepsis' },
            { label: 'Øh / Øhm (lang flad tænkelyd →)', curve: 'M10,22 L90,22', color: '#38bdf8', meaning: 'Taler-lyd: "Jeg holder selv ordet og tænker"' }
        ],
        explanation: '"Mhm" med lille løft til sidst er ren opbakning, mens "Hmm..." lyder skeptisk/overvejende, og "Øhm..." er en taler-lyd.'
    },
    {
        isNaaVideo: false,
        role: 'begge',
        title: '13. Følelses-trioen: "Puha!" vs. "Uha!" vs. "Øv!"',
        situation: 'Du hører i radioen, at der er stormflod og væltede træer på de små landeveje, hvor din ven skal køre i aften. Hvilken lyd viser bekymring og spænding?',
        ttsSample: 'Uha! Så må du køre rigtig forsigtigt!',
        correctIdx: 1,
        variants: [
            { label: 'Puha! (puster ud ↘)', curve: 'M10,12 Q45,22 90,32', color: '#f59e0b', meaning: 'Fysisk udmattelse, varme eller lettelse bagefter' },
            { label: 'Uha! (spændt u-lyd ↗↘)', curve: 'M10,26 Q45,8 90,26', color: '#4ade80', meaning: 'Bekymring, spænding eller ubehag over noget risikabelt' },
            { label: 'Øv! (fladt faldende ↘)', curve: 'M10,18 L85,32', color: '#38bdf8', meaning: 'Skuffelse over noget ærgerligt, der allerede er sket' }
        ],
        explanation: '"Uha!" bruges ved bekymring og fare ("Uha, pas på!"), mens "Puha!" er lettelse/udmattelse, og "Øv!" er skuffelse.'
    },
    {
        isNaaVideo: false,
        role: 'lytter',
        title: '14. Når "Nej!" betyder det modsatte af nej!',
        situation: 'Din veninde viser dig stolt, at hun har bestået sin køreprøve i første forsøg! Hvad udbryder du som begejstret lytter?',
        ttsSample: 'Neeej, hvor er det bare flot! Stort tillykke!',
        correctIdx: 0,
        variants: [
            { label: 'Neeej! / Næh! (langt, varmt & begejstret ⌒↘)', curve: 'M10,10 Q45,6 90,28', color: '#4ade80', meaning: 'Positiv forbløffelse og glæde på den andens vegne' },
            { label: 'Tsk! (smaskelyd med tungen)', curve: 'M20,24 L35,12 L50,24', color: '#f87171', meaning: 'Irritation og misbilligelse!' },
            { label: 'Hæ? (kort, skarpt stigende ↗)', curve: 'M20,32 L80,6', color: '#f59e0b', meaning: 'Manglende forståelse' }
        ],
        explanation: 'Et langt, varmt "Neeej, hvor flot!" eller "Næh, tillykke!" er et af danskernes varmeste begejstrings-udbrud som lytter.'
    },
    {
        isNaaVideo: false,
        role: 'begge',
        title: '15. Blød opstart med "Jamen..." vs. "Altså..."',
        situation: 'En kollega spørger, om du kan hjælpe med et regneark lige nu. Du vil rigtig gerne hjælpe! Hvilken start-lyd gør dit ja ekstra varmt og imødekommende?',
        ttsSample: 'Jamen det kan du tro! Kom, lad os kigge på det.',
        correctIdx: 0,
        variants: [
            { label: 'Jamen det kan du tro! (sammensmeltet & varm →)', curve: 'M10,20 Q50,16 90,18', color: '#4ade80', meaning: 'Imødekommende igangsættelse af et positivt svar' },
            { label: 'Tja... måske (svævende ~)', curve: 'M10,22 Q40,10 70,28', color: '#f59e0b', meaning: 'Tøvende og halvhjertet' },
            { label: 'Tsk! (tungeklik)', curve: 'M20,24 L35,12 L50,24', color: '#f87171', meaning: 'Irriteret afvisning' }
        ],
        explanation: '"Jamen..." foran et positivt svar ("Jamen selvfølgelig!", "Jamen gerne!") gør tonen varm og hjælpsom.'
    }
];

// =========================================================================
// BANE 4B: YOUTUBE-VIDEO OM "AT VÆRE UENIG I NOGET" (Ej!, Nej nej nej!, jo & vist)
// Video: https://www.youtube.com/watch?v=Bzj63o4jeSI (@klartilstartidanmark – 3:01)
// Match i vores lister: Lyd #9 (Ej), Lyd #8 (Nej / Næh) og Ord #6 (jo) + småordet vist
// =========================================================================
const UENIG_YOUTUBE_ID = 'Bzj63o4jeSI';

const UENIG_VIDEO_VARIANTS = [
    {
        num: 1,
        id: 'uenig_1_ikke_helt',
        label: '1. Det er jeg ikke helt enig i',
        badgeText: '1) Det er jeg ikke helt enig i (Høflig & saglig uenighed)',
        register: 'hoeflig',
        registerLabel: 'Høflig / pæn',
        matchTag: 'Småord: ikke helt (blødgører)',
        role: 'taler',
        startSec: 25,
        endSec: 46,
        timeLabel: '0:25',
        curve: 'M10,20 Q50,22 90,26',
        color: '#4ade80',
        quoteFromVideo: '"Det er jeg ikke helt enig i."',
        bodyLanguage: 'Roligt ansigtsudtryk, lille venlig hovedrysten og saglig øjenkontakt.',
        meaning: 'Den mest neutrale og høflige måde at sige imod på i møder, på arbejde eller til folk, man ikke kender tæt. "Ikke helt" gør uenigheden blød.',
        ttsSample: 'Det er jeg ikke helt enig i.'
    },
    {
        num: 2,
        id: 'uenig_2_vist_ikke',
        label: '2. Det kan vi vist ikke blive enige om',
        badgeText: '2) Det kan vi vist ikke blive enige om (Diplomatisk med "vist")',
        register: 'hoeflig',
        registerLabel: 'Høflig / diplomatisk',
        matchTag: 'Småord: vist (diplomatisk dæmper)',
        role: 'begge',
        startSec: 47,
        endSec: 69,
        timeLabel: '0:47',
        curve: 'M10,18 Q48,22 90,28',
        color: '#22d3ee',
        quoteFromVideo: '"Det kan vi vist ikke blive enige om."',
        bodyLanguage: 'Lille afvæbnende smil og skuldertræk ("agree to disagree").',
        meaning: 'Småordet "vist" blødgør konklusionen og lukker venligt en diskussion ned, når I har forskellige meninger.',
        ttsSample: 'Det kan vi vist ikke blive enige om.'
    },
    {
        num: 3,
        id: 'uenig_3_vist_misforstaaet',
        label: '3. Det har du vist misforstået',
        badgeText: '3) Det har du vist misforstået (Blød korrektion med "vist")',
        register: 'hoeflig',
        registerLabel: 'Høflig korrektion',
        matchTag: 'Småord: vist (blødgør rettelse)',
        role: 'lytter',
        startSec: 70,
        endSec: 88,
        timeLabel: '1:10',
        curve: 'M10,16 Q50,22 90,28',
        color: '#38bdf8',
        quoteFromVideo: '"Det har du vist misforstået."',
        bodyLanguage: 'Venligt men bestemt blik; langt blødere end at sige "Du tager fejl!".',
        meaning: 'Når den anden har fået fat i noget forkert fakta. Småordet "vist" redder den andens ansigt i samtalen.',
        ttsSample: 'Det har du vist misforstået.'
    },
    {
        num: 4,
        id: 'uenig_4_ej_passer_jo_ikke',
        label: '4. Ej, det passer jo ikke!',
        badgeText: '4) Ej, det passer jo ikke! (Lyd #9 Ej + Ord #6 jo)',
        register: 'uformel',
        registerLabel: 'Uformelt udbrud',
        matchTag: 'Match: Lyd #9 (Ej) + Ord #6 (jo)',
        role: 'lytter',
        startSec: 104,
        endSec: 114,
        timeLabel: '1:44',
        curve: 'M10,8 Q38,24 90,30',
        color: '#f59e0b',
        quoteFromVideo: '"Ej, det passer jo ikke!"',
        bodyLanguage: 'Rynkede bryn, hovedet rystes med et spontant, levende udbrud.',
        meaning: 'Kombinerer direkte vores dialoglyd #9 "Ej!" (spontan protest/forundring) med småordet #6 "jo" ("det ved vi jo begge godt ikke passer!").',
        ttsSample: 'Ej, det passer jo ikke!'
    },
    {
        num: 5,
        id: 'uenig_5_hold_nu_op',
        label: '5. Hold nu op!',
        badgeText: '5) Hold nu op! (Uformel protest med småordet "nu")',
        register: 'uformel',
        registerLabel: 'Uformelt udbrud',
        matchTag: 'Småord: nu (forstærker udbrud)',
        role: 'lytter',
        startSec: 115,
        endSec: 121,
        timeLabel: '1:55',
        curve: 'M10,10 L55,28 L90,18',
        color: '#fb923c',
        quoteFromVideo: '"Hold nu op!"',
        bodyLanguage: 'Hovedet vipper bagover med himlende eller smilende vantro.',
        meaning: 'Bruges mellem venner og familie, når den anden overdriver eller siger noget skørt ("Stop med at sige det!").',
        ttsSample: 'Hold nu op!'
    },
    {
        num: 6,
        id: 'uenig_6_ej_stop_dig_selv',
        label: '6. Ej, stop dig selv!',
        badgeText: '6) Ej, stop dig selv! (Lyd #9 Ej i venlig/frisk afvisning)',
        register: 'uformel',
        registerLabel: 'Uformelt udbrud',
        matchTag: 'Match: Lyd #9 (Ej!)',
        role: 'lytter',
        startSec: 122,
        endSec: 132,
        timeLabel: '2:02',
        curve: 'M10,8 L40,26 L90,22',
        color: '#f472b6',
        quoteFromVideo: '"Ej, stop dig selv!"',
        bodyLanguage: 'Løftede bryn og et halvt grinende, halvt forarget udtryk.',
        meaning: 'Dialoglyden "Ej!" åbner et uformelt, ungdommeligt udbrud til venner, når nogen kommer med en vild påstand.',
        ttsSample: 'Ej, stop dig selv!'
    },
    {
        num: 7,
        id: 'uenig_7_nej_nej_nej',
        label: '7. Nej nej nej, det kan du ikke mene',
        badgeText: '7) Nej nej nej, det kan du ikke mene (Lyd #8 Nej × 3)',
        register: 'uformel',
        registerLabel: 'Uformel vantro',
        matchTag: 'Match: Lyd #8 (Nej / Næh) + Tabel-eksempel #9',
        role: 'lytter',
        startSec: 133,
        endSec: 146,
        timeLabel: '2:13',
        curve: 'M10,14 L28,28 M36,14 L54,28 M62,14 L90,32',
        color: '#e879f9',
        quoteFromVideo: '"Nej nej nej, det kan du ikke mene!"',
        bodyLanguage: 'Hånden ryger op til panden (hånd til panden) med hovedrysten.',
        meaning: 'Tredobbelt "Nej nej nej!" + "...det kan du ikke mene!" (tæt beslægtet med vores tabel-eksempel under #9: "Ej, det mener du ikke"). Udtrykker stærk, levende vantro.',
        ttsSample: 'Nej nej nej, det kan du ikke mene!'
    },
    {
        num: 8,
        id: 'uenig_8_slang_advarsel',
        label: '8. Er du helt væk? / Luk røven (Slang)',
        badgeText: '8) Er du helt væk? / Luk røven (Grov slang – pas på!)',
        register: 'slang',
        registerLabel: 'Grov slang (Advarsel)',
        matchTag: 'Kun meget tætte venner / ellers uhøfligt',
        role: 'lytter',
        startSec: 147,
        endSec: 175,
        timeLabel: '2:27',
        curve: 'M10,10 L90,34',
        color: '#f87171',
        quoteFromVideo: '"Er du helt væk?" / "Luk røven!" (Advarsel: Kun til rigtig gode venner!)',
        bodyLanguage: 'Tydelig advarsels-finger i videoen: Brug aldrig dette til chefen, kolleger eller fremmede!',
        meaning: 'Vigtigt at kunne GENKENDE i film og blandt unge/tætte venner, men uhøfligt i almindelige samtaler.',
        ttsSample: 'Er du helt væk?'
    }
];

const UENIG_LAB_ITEMS = [
    {
        register: 'uformel',
        videoStart: 104,
        videoEnd: 114,
        videoTimeLabel: '1:44–1:54',
        role: 'lytter',
        title: '1. Video-case (1:44): Lyd #9 "Ej!" + Småord #6 "jo" i spontan protest',
        situation: 'Din gode ven påstår i frokostpausen, at det aldrig regner i Danmark om efteråret. Hvilket uformelt udbrud fra videoen kombinerer dialoglyden "Ej!" med fælles-viden småordet "jo"?',
        ttsSample: 'Ej, det passer jo ikke!',
        correctIdx: 0,
        variants: [
            { label: '"Ej, det passer jo ikke!" (Lyd #9 Ej + Ord #6 jo ↘)', curve: 'M10,8 Q38,24 90,30', color: '#4ade80', meaning: 'Spontant uformelt udbrud: "Det ved vi jo begge godt er forkert!"' },
            { label: '"Mm / Mhm..." (stille lukket mund ↗)', curve: 'M10,26 L42,26 L55,26 L88,12', color: '#38bdf8', meaning: 'Aktiv lytning uden modsigelse' },
            { label: '"Ih, tusind tak!" (lys begejstring ↗)', curve: 'M10,28 Q45,6 90,14', color: '#f472b6', meaning: 'Taknemmelighed over en gave' },
            { label: '"Luk røven!" (grov slang ↓)', curve: 'M10,10 L90,34', color: '#f87171', meaning: 'Alt for groft til en almindelig frokostsnak!' }
        ],
        explanation: 'I videoen (1:44) siger hun "Ej, det passer jo ikke!" – her starter dialoglyden "Ej!" protesten, mens småordet "jo" henviser til det, begge parter godt ved.'
    },
    {
        register: 'uformel',
        videoStart: 133,
        videoEnd: 146,
        videoTimeLabel: '2:13–2:26',
        role: 'lytter',
        title: '2. Video-case (2:13): Lyd #8 "Nej nej nej!" med hånden til panden',
        situation: 'En ven fortæller dig, at han vil sælge sin cykel og gå 15 kilometer på arbejde i snevejr hver dag. Hvad udbryder hun i videoen med hånden op til panden ()?',
        ttsSample: 'Nej nej nej, det kan du ikke mene!',
        correctIdx: 1,
        variants: [
            { label: '"Det er jeg helt enig i." (roligt →)', curve: 'M10,22 L90,22', color: '#38bdf8', meaning: '100 % enighed' },
            { label: '"Nej nej nej, det kan du ikke mene!" (3 × Nej + vantro ↘↘↘)', curve: 'M10,14 L28,28 M36,14 L54,28 M62,14 L90,32', color: '#4ade80', meaning: 'Stærk, levende vantro når nogen siger noget helt skørt' },
            { label: '"Øhm... hvad hedder det..." (flad tænkelyd →)', curve: 'M10,22 L90,22', color: '#f59e0b', meaning: 'Taler-lyd under ordsøgning' },
            { label: '"Aha, okay." (neutral kvittering ↘)', curve: 'M10,18 L90,26', color: '#a78bfa', meaning: 'Rolig modtagelse af info' }
        ],
        explanation: 'I videoen (2:13) tager hun hånden til panden () og siger tre hurtige "Nej nej nej, det kan du ikke mene!" – præcis som vores dialoglyd #8 (Nej) og #9 ("Ej, det mener du ikke").'
    },
    {
        register: 'hoeflig',
        videoStart: 25,
        videoEnd: 46,
        videoTimeLabel: '0:25–0:46',
        role: 'taler',
        title: '3. Video-case (0:25): Når du er uenig med en kollega eller chef til et møde',
        situation: 'Du sidder til et afdelingsmøde, og en kollega foreslår at flytte kundeservice til om natten. Du vil gerne sige pænt og professionelt imod. Hvad er nummer 1 i videoen?',
        ttsSample: 'Det er jeg ikke helt enig i.',
        correctIdx: 2,
        variants: [
            { label: '"Er du helt væk?!" (slang ↓)', curve: 'M10,10 L90,34', color: '#f87171', meaning: 'Uhøfligt og aggressivt på en arbejdsplads!' },
            { label: '"Ej, stop dig selv!" (venne-udbrud ↘)', curve: 'M10,8 L40,26 L90,22', color: '#f59e0b', meaning: 'Alt for uformelt til et formelt møde' },
            { label: '"Det er jeg ikke helt enig i." (blødgjort med "ikke helt" →↘)', curve: 'M10,20 Q50,22 90,26', color: '#4ade80', meaning: 'Høflig, respektfuld og professionel dansk uenighed' },
            { label: '"Hold nu op!" (udbrud ↘↗)', curve: 'M10,10 L55,28 L90,18', color: '#a78bfa', meaning: 'Uformelt udbrud til familie/venner' }
        ],
        explanation: 'I videoen (0:25) fremhæver hun "Det er jeg ikke helt enig i" som det vigtigste høflige udtryk på dansk. Ordet "helt" gør, at uenigheden ikke lyder hård.'
    },
    {
        register: 'hoeflig',
        videoStart: 47,
        videoEnd: 69,
        videoTimeLabel: '0:47–1:09',
        role: 'begge',
        title: '4. Video-case (0:47): Småordet "vist" når I må blive enige om at være uenige',
        situation: 'Du og en kollega har diskuteret en sag i fem minutter, men I ser stadig forskelligt på det. Hvordan runder hun diskussionen pænt af i videoens eksempel 2?',
        ttsSample: 'Det kan vi vist ikke blive enige om.',
        correctIdx: 0,
        variants: [
            { label: '"Det kan vi vist ikke blive enige om." (med småordet "vist" ↘)', curve: 'M10,18 Q48,22 90,28', color: '#4ade80', meaning: 'Diplomatisk afslutning ("let\'s agree to disagree")' },
            { label: '"Luk røven!" (grov slang ↓)', curve: 'M10,10 L90,34', color: '#f87171', meaning: 'Meget uhøfligt!' },
            { label: '"Hva\' / Hæ?" (skarpt stigende ↗)', curve: 'M20,32 L80,6', color: '#f59e0b', meaning: 'Betyder at du ikke hørte, hvad der blev sagt' },
            { label: '"Ih, hvor dejligt!" (begejstret ↗)', curve: 'M10,28 Q45,6 90,14', color: '#f472b6', meaning: 'Begejstring' }
        ],
        explanation: 'I videoen (0:47) viser hun sætningen "Det kan vi vist ikke blive enige om" – småordet "vist" fungerer som en blød støddæmper, så ingen taber ansigt.'
    },
    {
        register: 'hoeflig',
        videoStart: 70,
        videoEnd: 88,
        videoTimeLabel: '1:10–1:28',
        role: 'lytter',
        title: '5. Video-case (1:10): Når den anden har fået fat i noget forkert ("vist")',
        situation: 'En ny kollega tror, at I skal møde kl. 7 om søndagen, men kontoret har slet ikke åbent om søndagen. Hvordan retter man pænt misforståelsen ifølge videoens eksempel 3?',
        ttsSample: 'Det har du vist misforstået.',
        correctIdx: 3,
        variants: [
            { label: '"Du lyver!" (hård anklage ↓)', curve: 'M10,10 L90,34', color: '#f87171', meaning: 'Konfronterende og uhøfligt' },
            { label: '"Puha!" (udånding ↘)', curve: 'M10,12 Q45,22 90,32', color: '#f59e0b', meaning: 'Fysisk udmattelse eller lettelse' },
            { label: '"Indåndings-ja" (.hja (indånding ←))', curve: 'M85,22 Q50,16 15,24', color: '#38bdf8', meaning: 'Stille enighed' },
            { label: '"Det har du vist misforstået." (blødgjort med "vist" →↘)', curve: 'M10,16 Q50,22 90,28', color: '#4ade80', meaning: 'Venlig påpegning af en fejl uden at virke bedrevidende' }
        ],
        explanation: 'I videoen (1:10) bruger hun "Det har du vist misforstået". Uden småordet "vist" ville sætningen lyde meget hårdere!'
    },
    {
        register: 'uformel',
        videoStart: 115,
        videoEnd: 132,
        videoTimeLabel: '1:55–2:12',
        role: 'lytter',
        title: '6. Video-case (1:55 & 2:02): Venne-udbruddene "Hold nu op!" og "Ej, stop dig selv!"',
        situation: 'Din veninde driller dig til en hyggelig middag og siger, at hun kan løbe et maraton på en time. Hvilke to uformelle udbrud viser hun i videoen til den slags venne-drilleri?',
        ttsSample: 'Hold nu op! Ej, stop dig selv!',
        correctIdx: 1,
        variants: [
            { label: '"Øv, uha!" (skuffelse & bekymring ↘)', curve: 'M10,18 L85,32', color: '#f87171', meaning: 'Bruges ved uheld og fare' },
            { label: '"Hold nu op!" / "Ej, stop dig selv!" (energisk & smilende ↘↗)', curve: 'M10,10 L55,28 L90,18', color: '#4ade80', meaning: 'Uformel, levende afvisning af en overdrivelse mellem venner' },
            { label: '"Øh / Øhm..." (tænkepause →)', curve: 'M10,22 L90,22', color: '#38bdf8', meaning: 'Holder taleturen' },
            { label: '"Nåååh, okay!" (aha-oplevelse ⌒↘)', curve: 'M10,10 Q42,8 90,30', color: '#a78bfa', meaning: 'Når man pludselig forstår noget' }
        ],
        explanation: 'I videoen (1:55–2:12) viser hun "Hold nu op!" og "Ej, stop dig selv!" – begge bruger småordet "nu" eller dialoglyden "Ej!" til at skabe liv i uformelle samtaler.'
    },
    {
        register: 'slang',
        videoStart: 147,
        videoEnd: 175,
        videoTimeLabel: '2:27–2:55',
        role: 'lytter',
        title: '7. Video-case (2:27): Advarsel om grov slang ("Er du helt væk?" / "Luk røven")',
        situation: 'I slutningen af videoen gennemgår hun udtrykkene "Er du helt væk?" og "Luk røven!". Hvad er hendes vigtige advarsel om disse to udtryk?',
        ttsSample: 'Pas på! Brug kun dette til rigtig gode venner.',
        correctIdx: 2,
        variants: [
            { label: 'At man gerne må bruge dem til sin chef og på Borgerservice', curve: 'M10,22 L90,22', color: '#f87171', meaning: 'Forkert – det ville være meget uhøfligt!' },
            { label: 'At de betyder "Mange tak for hjælpen"', curve: 'M10,28 L90,10', color: '#f59e0b', meaning: 'Forkert!' },
            { label: 'Kun til meget tætte venner i sjov – ellers er det groft og uhøfligt!', curve: 'M10,10 L90,34', color: '#4ade80', meaning: 'Vigtig kulturel grænse i dansk samtale' }
        ],
        explanation: 'I videoen (2:27–2:55) understreger hun tydeligt, at "Er du helt væk?" og især "Luk røven!" er hård slang, som man aldrig må bruge i almindelige eller høflige samtaler.'
    },
    {
        register: 'uformel',
        videoStart: 89,
        videoEnd: 146,
        videoTimeLabel: '1:29–2:26',
        role: 'lytter',
        title: '8. Sammenligning: Hvilke to dialoglyde fra vores tabel bærer de uformelle uenigheds-udbrud?',
        situation: 'Når danskere skifter fra formel uenighed ("Det er jeg ikke helt enig i") til spontan hverdagssamtale, hvilke to dialoglyde fra vores 20-lyds-tabel sætter de så helt forrest i sætningen?',
        ttsSample: 'Ej, det passer jo ikke! Nej nej nej, det kan du ikke mene!',
        correctIdx: 0,
        variants: [
            { label: 'Lyd #9 "Ej!" ("Ej, det passer jo ikke!") og Lyd #8 "Nej!" ("Nej nej nej, det kan du ikke mene!")', curve: 'M10,8 Q38,24 90,30', color: '#4ade80', meaning: 'De to vigtigste danske udbruds-lyde ved protest og vantro' },
            { label: 'Lyd #1 "Øhm" og Lyd #2 "Mhm"', curve: 'M10,22 L90,22', color: '#38bdf8', meaning: 'Tænkelyd og passivt lyttesignal' },
            { label: 'Lyd #6 Indåndings-"ja" og Lyd #19 "Ih!"', curve: 'M10,26 Q45,10 90,18', color: '#f472b6', meaning: 'Samtykke og begejstring' }
        ],
        explanation: 'Præcis! Lyd #9 ("Ej!") og Lyd #8 ("Nej / Næh!") – ofte efterfulgt af småordet "jo" – er danskernes foretrukne startlyde, når man spontant siger imod i hverdagen.'
    }
];

// =========================================================================
// BANE 5: 3 INTERAKTIVE SAMTALE-SIMULATORER MED DE 20 DIALOGLYDE
// =========================================================================
const LIVE_SOUND_CONVERSATIONS = [
    {
        id: 'frokost_lyde',
        title: '1. Ved frokostbordet: Vintervejr, glatte veje og varm kaffe',
        partner: 'Kasper (kollega)',
        scene: 'Kasper kommer ind i frokoststuen med kolde fingre efter en cykeltur i frostvejr. Brug de rigtige danske dialoglyde som lytter og taler!',
        turns: [
            {
                partnerLine: 'Kasper (puster ud og gnider hænderne): "Puha! Det var godt nok en kold cykeltur langs havnen i morges..."',
                targetRole: 'lytter',
                instruction: 'Trin 1 (Lytter): Giv Kasper stille, indforstået opbakning og vis, at du lytter!',
                options: [
                    { text: 'Mhm... (med et stille indåndings-"ja"): .hja, vinden er virkelig bidende i dag!', ok: true, feedback: 'Stærkt! Kombinationen af "Mhm" og et stille indåndings-"ja" skaber straks varm, nordisk genkendelse.' },
                    { text: 'Hæ?', ok: false, feedback: '"Hæ?" betyder, at du slet ikke hørte eller forstod ham.' },
                    { text: 'Tsk! Stop nu.', ok: false, feedback: '"Tsk" ad Kasper virker afvisende og irriteret!' }
                ]
            },
            {
                partnerLine: 'Kasper: "Ja, og nede ved broen var der spejlglat sort is – cyklen foran mig skred simpelthen midt i svinget!"',
                targetRole: 'lytter',
                instruction: 'Trin 2 (Lytter): Reagér på det farlige øjeblik med den rigtige bekymrings-/spændingslyd!',
                options: [
                    { text: 'Uha! Ej, slog cyklisten sig?!', ok: true, feedback: 'Perfekt! "Uha!" viser spændt bekymring ved noget farligt, og "Ej!" forstærker dit engagement.' },
                    { text: 'Tja, tjo.', ok: false, feedback: '"Tja / Tjo" virker helt ligeglad, når nogen fortæller om et cykelstyrt!' },
                    { text: 'Jaja.', ok: false, feedback: 'Hurtigt "Jaja" lyder affejende og uinteresseret.' }
                ]
            },
            {
                partnerLine: 'Kasper: "Nej heldigvis ikke, han landede blødt i snebunken! Men min cykelkæde hoppede af, så jeg måtte trække cyklen de sidste to kilometer."',
                targetRole: 'lytter',
                instruction: 'Trin 3 (Lytter): Vis først lettelse over at ingen kom til skade, og derefter medfølelse med kæden!',
                options: [
                    { text: 'Åh, pyha/puha, godt han ikke kom til skade! Men øv med din cykelkæde!', ok: true, feedback: 'Lige i skabet! "Åh / Puha" viser lettelse, og "Øv!" viser medfølelse med hans uheld.' },
                    { text: 'Aha! Fedt nok.', ok: false, feedback: 'Det er ikke fedt at skulle trække cyklen 2 km i frostvejr!' },
                    { text: 'Øhm...', ok: false, feedback: '"Øhm..." er en tænkelyd for taleren, ikke medfølelse fra lytteren.' }
                ]
            },
            {
                partnerLine: 'Kasper: "Tak! Har du egentlig en kaffekop ekstra derhenne?"',
                targetRole: 'taler',
                instruction: 'Trin 4 (Taler): Svar varmt og opdag pludselig, at du er ved at tage en snavset kop!',
                options: [
                    { text: 'Jamen selvfølgelig! Værsgo... hov, den kop var vist ikke vasket op – her er en ren!', ok: true, feedback: 'Mestersvar! "Jamen" åbner svaret varmt, og "Hov!" markerer straks, at du opdager den lille fejl.' },
                    { text: 'Mhm.', ok: false, feedback: 'På et direkte spørgsmål skal du svare som taler, ikke bare sige "Mhm".' },
                    { text: 'Øv.', ok: false, feedback: 'Du har jo en ren kop lige ved siden af!' }
                ]
            }
        ]
    },
    {
        id: 'it_lyde',
        title: '2. På kontoret: Når teknikken driller og brikkerne falder på plads',
        partner: 'Nadia (IT-kollega)',
        scene: 'Du har bedt Nadia om hjælp til et nyt system. Øv dig i tænkelyde, aha-lyde og taknemmelighed!',
        turns: [
            {
                partnerLine: 'Nadia: "Hvilken fejlmeddelelse stod der på skærmen, da programmet lukkede ned?"',
                targetRole: 'taler',
                instruction: 'Trin 1 (Taler): Du skal lige tænke dig om for at huske fejlkoden og beholde taleturen!',
                options: [
                    { text: 'Øhm... der stod vist nok noget med... hm... fejlkode 403!', ok: true, feedback: 'Super! "Øhm..." og "hm..." holder taleturen åben, mens du graver fejlkoden frem fra hukommelsen.' },
                    { text: 'Aha!', ok: false, feedback: '"Aha!" er en lytter-reaktion på en forklaring – her er det dig, der skal svare.' },
                    { text: 'Ih!', ok: false, feedback: '"Ih!" er begejstring over en gave/overraskelse, ikke en fejlkode.' }
                ]
            },
            {
                partnerLine: 'Nadia: "Nåååh, okay! Fejl 403 kommer kun, hvis din VPN-forbindelse er slået fra oppe i hjørnet."',
                targetRole: 'lytter',
                instruction: 'Trin 2 (Lytter): Pludselig forstår du hele sammenhængen!',
                options: [
                    { text: 'Aha! Nåååh, det er selvfølgelig derfor! Den fik jeg slået fra i morges!', ok: true, feedback: 'Plet! "Aha!" + "Nåååh" viser øjeblikkelig logisk forståelse.' },
                    { text: 'Tja... tjo.', ok: false, feedback: '"Tja / Tjo" lyder som om du tvivler på Nadias rigtige løsning.' },
                    { text: 'Uha.', ok: false, feedback: 'Nu er problemet jo løst, så der er ingen fare på færde.' }
                ]
            },
            {
                partnerLine: 'Nadia: "Se, nu har jeg også lige sat en genvej ind på dit skrivebord, så du kun behøver ét klik fremover."',
                targetRole: 'lytter',
                instruction: 'Trin 3 (Lytter / Modtager): Vis begejstret og varm taknemmelighed for hendes ekstra hjælp!',
                options: [
                    { text: 'Ih, tusind tak skal du have, Nadia! Ej, hvor er det bare en stor hjælp!', ok: true, feedback: 'Fantastisk! "Ih, tusind tak!" og "Ej, hvor er det en stor hjælp!" gør din tak levende og hjertelig.' },
                    { text: 'Hm...', ok: false, feedback: '"Hm..." lyder skeptisk og utaknemmeligt, når nogen lige har hjulpet dig!' },
                    { text: 'Hva\'?', ok: false, feedback: 'Du hørte jo godt, hvad hun sagde!' }
                ]
            }
        ]
    },
    {
        id: 'nabo_lyde',
        title: '3. I gårdhaven: Nabosnak om håndværkere og hundehvalpe',
        partner: 'Søren (nabo)',
        scene: 'Du møder din nabo Søren i gårdhaven. Han har både en frustrerende historie om en håndværker og en sød nyhed!',
        turns: [
            {
                partnerLine: 'Søren: "Håndværkeren lovede at komme kl. 8 i morges, og så ringede han først kl. 15 og sagde, at han havde glemt aftalen!"',
                targetRole: 'lytter',
                instruction: 'Trin 1 (Lytter): Vis solidarisk forargelse og medfølelse med Søren!',
                options: [
                    { text: 'Neeej, det mener du ikke?! Tsk... hvor er det altså dårlig stil!', ok: true, feedback: 'Helt rigtigt! "Neeej!" viser medfølende vantro, og "Tsk..." viser solidarisk forargelse på Sørens vegne.' },
                    { text: 'Mhm.', ok: false, feedback: 'Bare et stille "Mhm" er lidt for passivt til sådan en frustrerende historie!' },
                    { text: 'Ih, hvor dejligt!', ok: false, feedback: 'Det er bestemt ikke dejligt at vente forgæves i 7 timer!' }
                ]
            },
            {
                partnerLine: 'Søren: "Ja, jeg spildte en hel fridag! Tror du egentlig, man kan kræve afslag i prisen for det?"',
                targetRole: 'taler',
                instruction: 'Trin 2 (Taler): Du er lidt i tvivl, men vil gerne give et forsigtigt, overvejende svar.',
                options: [
                    { text: 'Tja... altså, hvis du har aftalen på skrift, kan du måske godt prøve at spørge mesteren.', ok: true, feedback: 'Flot! "Tja..." viser ærlig tvivl/forbehold, og "altså..." indleder dit konstruktive råd.' },
                    { text: 'Hov!', ok: false, feedback: '"Hov!" passer til en pludselig hændelse, ikke et juridisk spørgsmål.' },
                    { text: 'Puha!', ok: false, feedback: 'Svarer ikke på hans spørgsmål.' }
                ]
            },
            {
                partnerLine: 'Søren: "God pointe! Nå, men se lige hvem der titter frem her fra kurven – vi har hentet vores nye lille gravhundehvalp i dag!"',
                targetRole: 'lytter',
                instruction: 'Trin 3 (Lytter): Giv den helt rigtige danske "nuttetheds-lyd"!',
                options: [
                    { text: 'Årh / Nåårh, hvor er den bare sød! Se lige de små ører!', ok: true, feedback: 'Lige i hjertet! "Årh!" og "Nåårh!" med blødt faldende tonefald er danskernes faste lyd til hvalpe og babyer.' },
                    { text: 'Uha!', ok: false, feedback: '"Uha!" lyder som om du er bange for den lille hvalp!' },
                    { text: 'Tsk.', ok: false, feedback: '"Tsk" ville fornærme både Søren og hvalpen!' }
                ]
            }
        ]
    }
];

// =========================================================================
// BANE 6: 8 "FRA STILLE ROBOT TIL LEVENDE DIALOGLYDE"-OPGRADERINGER
// =========================================================================
const ROBOT_SOUND_UPGRADES = [
    {
        title: '1. Når man skal tænke og præcisere et tidspunkt',
        robotText: 'Uden dialoglyde: "Jeg er færdig klokken ... 15.30. Det passer bedst der."',
        slotsText: 'Med danske dialoglyde: "Jeg er færdig klokken... [1]... 15.30. [2], det passer faktisk bedst der."',
        slot1Options: ['øhm', 'ih', 'tsk'],
        slot1Answer: 'øhm',
        slot2Options: ['Altså', 'Hov', 'Øv'],
        slot2Answer: 'Altså',
        explanation: '"Øhm" holder taleturen under tænkepausen, og "Altså" indleder din præcisering naturligt.'
    },
    {
        title: '2. Når en ven fortæller om en aflyst ferie',
        robotText: 'Uden dialoglyde: A: "Vores fly blev aflyst." — B: "Det er dårligt. Jeg føler med dig."',
        slotsText: 'Med danske dialoglyde: A: "Vores fly blev aflyst." — B: "[1], hvor ærgerligt! Ej, [2] for jer!"',
        slot1Options: ['Neeej', 'Aha', 'Tja'],
        slot1Answer: 'Neeej',
        slot2Options: ['øv', 'ih', 'mhm'],
        slot2Answer: 'øv',
        explanation: '"Neeej, hvor ærgerligt!" og "Ej, øv!" viser øjeblikkelig, varm dansk medfølelse.'
    },
    {
        title: '3. Når brikkerne pludselig falder på plads',
        robotText: 'Uden dialoglyde: A: "Knappen sidder på bagsiden." — B: "Nu forstår jeg det. Jeg så forkert."',
        slotsText: 'Med danske dialoglyde: A: "Knappen sidder på bagsiden." — B: "[1]! Nu forstår jeg! [2], jeg kiggede kun på forsiden!"',
        slot1Options: ['Aha', 'Øv', 'Uha'],
        slot1Answer: 'Aha',
        slot2Options: ['Hov', 'Tsk', 'Mhm'],
        slot2Answer: 'Hov',
        explanation: '"Aha!" markerer pludselig forståelse, og "Hov!" markerer, at du opdager din egen lille fejl.'
    },
    {
        title: '4. Efter en hård og farlig cykeltur i stormvejr',
        robotText: 'Uden dialoglyde: A: "Tagstenene fløj ned i stormen, men nu er jeg hjemme." — B: "Det var farligt."',
        slotsText: 'Med danske dialoglyde: A: "[1], så er jeg endelig inde i varmen efter den storm!" — B: "[2], det lød også farligt med de tagsten!"',
        slot1Options: ['Puha', 'Hæ', 'Aha'],
        slot1Answer: 'Puha',
        slot2Options: ['Uha', 'Ih', 'Tjo'],
        slot2Answer: 'Uha',
        explanation: 'A bruger "Puha!" om sin lettelse/udmattelse, og B svarer med "Uha!" om det farlige og bekymrende.'
    },
    {
        title: '5. Når man får en uventet gave af kollegerne',
        robotText: 'Uden dialoglyde: A: "Her er en gave til dig." — B: "Tak. Jeg bliver glad."',
        slotsText: 'Med danske dialoglyde: A: "Her er en gave til dig." — B: "[1], tusind tak! [2], hvor er I bare søde!"',
        slot1Options: ['Ih', 'Hmm', 'Tsk'],
        slot1Answer: 'Ih',
        slot2Options: ['Årh', 'Øhm', 'Hæ'],
        slot2Answer: 'Årh',
        explanation: '"Ih, tusind tak!" og "Årh, hvor er I søde!" udstråler ægte dansk begejstring og varme.'
    },
    {
        title: '6. Når man tvivler lidt, men kommer med et blødt modforslag',
        robotText: 'Uden dialoglyde: A: "Skal vi spise ude på terrassen i dag?" — B: "Det blæser meget. Vi kan sidde i udestuen."',
        slotsText: 'Med danske dialoglyde: A: "Skal vi spise ude på terrassen?" — B: "[1]... det blæser ret meget. [2] kan vi ikke sidde i udestuen?"',
        slot1Options: ['Tja', 'Aha', 'Ih'],
        slot1Answer: 'Tja',
        slot2Options: ['Jamen', 'Øv', 'Tsk'],
        slot2Answer: 'Jamen',
        explanation: '"Tja..." viser venligt forbehold, og "Jamen..." åbner et blødt, konstruktivt modforslag.'
    },
    {
        title: '7. Aktiv lytning til en spændende historie',
        robotText: 'Uden dialoglyde: A: "Jeg mødte borgmesteren i elevatoren..." — B: "Jeg lytter. Det er overraskende."',
        slotsText: 'Med danske dialoglyde: A: "Jeg mødte borgmesteren i elevatoren..." — B: "[1]? [2]! Hvad sagde han så?!"',
        slot1Options: ['Mhm', 'Øv', 'Puha'],
        slot1Answer: 'Mhm',
        slot2Options: ['Nå', 'Tja', 'Øhm'],
        slot2Answer: 'Nå',
        explanation: '"Mhm?" og et kort, stigende "Nå!" viser aktiv lytning og frisk overraskelse.'
    },
    {
        title: '8. Solidarisk forargelse over dårlig opførsel',
        robotText: 'Uden dialoglyde: A: "Han sprang bare over i køen foran den ældre dame." — B: "Det mener du ikke. Det er dårlig opførsel."',
        slotsText: 'Med danske dialoglyde: A: "Han sprang bare over i køen foran den ældre dame." — B: "[1], det mener du ikke?! [2], hvor er det frækt!"',
        slot1Options: ['Ej', 'Mhm', 'Tjo'],
        slot1Answer: 'Ej',
        slot2Options: ['Tsk', 'Aha', 'Ih'],
        slot2Answer: 'Tsk',
        explanation: '"Ej, det mener du ikke?!" forstærker forundringen, og "Tsk!" viser solidarisk misbilligelse.'
    }
];

// =========================================================================
// BANE 7: 12 LYD-DETEKTIV MISSIONER I VRIMLEBILLEDET
// =========================================================================
const DETECTIVE_SOUND_MISSIONS = [
    {
        prompt: '1. Find TALEREN længst til venstre, der kigger tænksomt op med en finger ved hagen for at holde taleturen i en tænkepause.',
        answerId: 's1_oehm',
        hint: 'Kig ved kaffebaren helt til venstre (pegefelt #1: Øh / Øhm).'
    },
    {
        prompt: '2. Find LYTTEREN, der trækker vejret blødt ind gennem læberne i et stille, nordisk samtykke.',
        answerId: 's6_indaanding_ja',
        hint: 'Kig i venstre-midterste gruppe (pegefelt #6: Indåndings-"ja").'
    },
    {
        prompt: '3. Find LYTTEREN, der lige har fået en logisk aha-oplevelse, så en ny sammenhæng er gået op for ham.',
        answerId: 's7_aha',
        hint: 'Kig nær midten til venstre (pegefelt #7: Aha!).'
    },
    {
        prompt: '4. Find LYTTEREN med hænderne ved kinderne, der siger et følelsesladet "Nej! / Næh!" i medfølelse eller overraskelse.',
        answerId: 's8_nej_naeh',
        hint: 'Kig nederst til venstre for midten (pegefelt #8: Nej / Næh).'
    },
    {
        prompt: '5. Find personen ved hundehvalpen på gulvet, der smelter med et langt, varmt og blødt udbrud.',
        answerId: 's10_aarh',
        hint: 'Kig nederst i midten (pegefelt #10: Åh / Årh).'
    },
    {
        prompt: '6. Find TALEREN, der trækker tøvende på skuldrene for at udtrykke tvivl eller halvhjertet enighed.',
        answerId: 's11_tja_tjo',
        hint: 'Kig midt i billedet (pegefelt #11: Tja / Tjo).'
    },
    {
        prompt: '7. Find personen ved bordet, der griber ud efter en kop, som pludselig er ved at vælte!',
        answerId: 's12_hov',
        hint: 'Kig lige til højre for midten (pegefelt #12: Hov!).'
    },
    {
        prompt: '8. Find LYTTEREN, der holder hånden bag øret, fordi han ikke hørte, hvad der blev sagt.',
        answerId: 's13_hva_hae',
        hint: 'Kig øverst til højre for midten (pegefelt #13: Hva\' / Hæ?).'
    },
    {
        prompt: '9. Find personen med den tunge kasse, der tørrer sveden af panden i lettelse og udmattelse.',
        answerId: 's16_puha',
        hint: 'Kig til højre i billedet (pegefelt #16: Puha / Puh).'
    },
    {
        prompt: '10. Find personen, der ser bekymret og spændt ud ved noget ubehageligt eller risikabelt, der bliver fortalt.',
        answerId: 's17_uha',
        hint: 'Kig øverst til højre (pegefelt #17: Uha / Uh).'
    },
    {
        prompt: '11. Find personen nederst til højre, der kigger skuffet ned på et uheldigt udfald (tabt kage).',
        answerId: 's18_oev',
        hint: 'Kig nederst til højre (pegefelt #18: Øv!).'
    },
    {
        prompt: '12. Find personen længst til højre, der laver en misbilligende smaskelyd med tungen over noget irriterende.',
        answerId: 's20_tsk',
        hint: 'Kig helt til højre (pegefelt #20: Tsk).'
    }
];

function speakSound(text, rate = 0.9, pitch = 1.0) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'da-DK';
    u.rate = rate;
    u.pitch = pitch;
    window.speechSynthesis.speak(u);
}

export function renderSamtaleSmaalydeView(container, navigateFn, extraData = {}) {
    const lang = getLang() || 'da';
    const rtlAttr = stRtlAttr(lang);

    if (lang !== 'da' && !isSamtaleLangLoaded(lang)) {
        container.innerHTML = `<div class="view-container sl-page" style="padding:2.5rem 1rem; text-align:center; color:#cbd5e1; font-weight:700;">...</div>`;
        ensureSamtaleLang(lang).then(() => {
            if ((getLang() || 'da') === lang && container.isConnected) {
                renderSamtaleSmaalydeView(container, navigateFn, extraData);
            }
        });
        return;
    }

    container.innerHTML = '';

    const tabs = [
        { id:'tab_vrimmel', label: st('1. Vrimlebillede (20)', lang) },
        { id:'tab_vaelg', label: st('2. Vælg lyd (20)', lang) },
        { id:'tab_duel', label: st('3. Taler eller lytter?', lang) },
        { id:'tab_tonefald', label: st('4. Video: "Nå"', lang) },
        { id:'tab_uenig_video', label: st('5. Video: Uenig', lang) },
        { id:'tab_live', label: st('6. Hold samtalen i live', lang) },
        { id:'tab_robot', label: st('7. Robot → Levende', lang) },
        { id:'tab_detektiv', label: st('8. Detektiv', lang) }
    ];

    let currentTab = 'tab_vrimmel';
    if (extraData && extraData.subPath && tabs.some(t => t.id === extraData.subPath)) {
        currentTab = extraData.subPath;
    } else if (extraData && extraData.tab && tabs.some(t => t.id === extraData.tab)) {
        currentTab = extraData.tab;
    }

    if (!document.getElementById('samtale-smaalyde-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'samtale-smaalyde-styles';
        styleEl.textContent = `
            ${SAMTALE_TR_CSS}
            .sl-page {
                width: 100%;
                max-width: 1260px;
                margin: 0 auto;
                padding: 1rem 1rem 4rem;
                color: #f8fafc;
                box-sizing: border-box;
            }
            .sl-hero {
                background: linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.94));
                border: 1.5px solid rgba(56, 189, 248, 0.35);
                border-radius: 22px;
                padding: 1.35rem 1.5rem;
                margin-bottom: 1.15rem;
                box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
            }
            .sl-role-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                gap: 0.85rem;
                margin-top: 1rem;
            }
            .sl-role-box {
                border-radius: 16px;
                padding: 0.85rem 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            .sl-role-box.taler {
                background: linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(180, 83, 9, 0.1));
                border: 1.5px solid rgba(245, 158, 11, 0.65);
            }
            .sl-role-box.lytter {
                background: linear-gradient(135deg, rgba(6, 182, 212, 0.18), rgba(14, 116, 144, 0.1));
                border: 1.5px solid rgba(6, 182, 212, 0.65);
            }
            .sl-role-box.begge {
                background: linear-gradient(135deg, rgba(245, 158, 11, 0.14), rgba(168, 85, 247, 0.18), rgba(6, 182, 212, 0.14));
                border: 1.5px solid rgba(192, 132, 252, 0.72);
            }
            .sl-tabs {
                display: flex;
                flex-wrap: wrap;
                gap: 0.45rem;
                margin-bottom: 1.15rem;
            }
            .sl-tab-btn {
                padding: 0.62rem 1rem;
                border-radius: 999px;
                border: 1px solid rgba(148, 163, 184, 0.35);
                background: rgba(15, 23, 42, 0.85);
                color: #cbd5e1;
                font-size: 0.86rem;
                font-weight: 800;
                cursor: pointer;
                transition: all 0.18s ease;
            }
            .sl-tab-btn:hover {
                border-color: rgba(56, 189, 248, 0.7);
                color: #ffffff;
                transform: translateY(-1px);
            }
            .sl-tab-btn.active {
                background: linear-gradient(135deg, #06b6d4, #a855f7, #f59e0b);
                color: #ffffff;
                border-color: #fef08a;
                box-shadow: 0 6px 18px rgba(168, 85, 247, 0.35);
            }
            .sl-panel { display: none; }
            .sl-panel.active { display: block; }
            .sl-card {
                background: rgba(15, 23, 42, 0.9);
                border: 1px solid rgba(148, 163, 184, 0.25);
                border-radius: 20px;
                padding: 1.25rem;
                margin-bottom: 1.15rem;
                box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
            }
            .sl-toolbar {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                gap: 0.65rem;
                margin-bottom: 0.85rem;
            }
            .sl-filters {
                display: flex;
                flex-wrap: wrap;
                gap: 0.45rem;
            }
            .sl-filter-btn {
                padding: 0.45rem 0.9rem;
                border-radius: 999px;
                border: 1.5px solid rgba(148, 163, 184, 0.35);
                background: rgba(30, 41, 59, 0.85);
                color: #e2e8f0;
                font-size: 0.82rem;
                font-weight: 800;
                cursor: pointer;
            }
            .sl-filter-btn.active {
                background: #f8fafc;
                color: #0f172a;
                border-color: #ffffff;
            }
            .sl-stage-wrap {
                position: relative;
                width: 100%;
                border-radius: 18px;
                overflow: hidden;
                border: 2px solid rgba(148, 163, 184, 0.35);
                background: #090d16;
                box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
            }
            .sl-stage-inner {
                position: relative;
                width: 100%;
                aspect-ratio: 16 / 9;
                transform-origin: center center;
                transition: transform 0.25s ease;
            }
            .sl-stage-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                user-select: none;
            }
            .sl-pegefelt {
                position: absolute;
                transform: translate(-50%, -100%);
                display: inline-flex;
                align-items: center;
                gap: 0.3rem;
                padding: 0.26rem 0.58rem;
                border-radius: 999px;
                font-size: 0.75rem;
                font-weight: 900;
                color: #ffffff;
                cursor: pointer;
                z-index: 6;
                white-space: nowrap;
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.65);
                transition: transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;
            }
            .sl-pegefelt::after {
                content:'';
                position: absolute;
                left: 50%;
                bottom: -7px;
                transform: translateX(-50%);
                border-width: 7px 6px 0 6px;
                border-style: solid;
            }
            .sl-pegefelt.dir-up {
                transform: translate(-50%, 0%);
            }
            .sl-pegefelt.dir-up::after {
                bottom: auto;
                top: -7px;
                border-width: 0 6px 7px 6px;
            }
            .sl-pegefelt.role-taler {
                background: linear-gradient(135deg, rgba(180, 83, 9, 0.96), rgba(120, 53, 15, 0.97));
                border: 2px solid #fbbf24;
            }
            .sl-pegefelt.role-taler::after {
                border-color: #fbbf24 transparent transparent transparent;
            }
            .sl-pegefelt.role-taler.dir-up::after {
                border-color: transparent transparent #fbbf24 transparent;
            }
            .sl-pegefelt.role-lytter {
                background: linear-gradient(135deg, rgba(14, 116, 144, 0.96), rgba(22, 78, 99, 0.97));
                border: 2px solid #22d3ee;
            }
            .sl-pegefelt.role-lytter::after {
                border-color: #22d3ee transparent transparent transparent;
            }
            .sl-pegefelt.role-lytter.dir-up::after {
                border-color: transparent transparent #22d3ee transparent;
            }
            .sl-pegefelt.role-begge {
                background: linear-gradient(135deg, rgba(180, 83, 9, 0.95), rgba(126, 34, 206, 0.95), rgba(14, 116, 144, 0.95));
                border: 2px solid #e879f9;
            }
            .sl-pegefelt.role-begge::after {
                border-color: #e879f9 transparent transparent transparent;
            }
            .sl-pegefelt.role-begge.dir-up::after {
                border-color: transparent transparent #e879f9 transparent;
            }
            .sl-pegefelt:hover,
            .sl-pegefelt.active {
                z-index: 20;
                transform: translate(-50%, -106%) scale(1.08);
                box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.32), 0 10px 24px rgba(0, 0, 0, 0.8);
            }
            .sl-pegefelt.dir-up:hover,
            .sl-pegefelt.dir-up.active {
                transform: translate(-50%, 6%) scale(1.08);
            }
            .sl-pegefelt.hidden-pin {
                opacity: 0.14;
                pointer-events: none;
            }
            .sl-pegefelt-num {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 19px;
                height: 19px;
                border-radius: 50%;
                background: rgba(15, 23, 42, 0.92);
                font-size: 0.7rem;
                font-weight: 900;
            }
            .sl-pegefelt.compact-mode .sl-pegefelt-label {
                display: none;
            }
            @media (max-width: 720px) {
                .sl-pegefelt .sl-pegefelt-label {
                    display: none;
                }
                .sl-pegefelt.show-mobile-label .sl-pegefelt-label {
                    display: inline;
                }
            }
            .sl-detail-box {
                margin-top: 1rem;
                border-radius: 18px;
                padding: 1.15rem 1.25rem;
                background: rgba(9, 14, 26, 0.92);
                border: 1.5px solid rgba(148, 163, 184, 0.35);
            }
            .sl-pill-tag {
                display: inline-flex;
                align-items: center;
                gap: 0.3rem;
                padding: 0.25rem 0.7rem;
                border-radius: 999px;
                font-size: 0.76rem;
                font-weight: 900;
                text-transform: uppercase;
            }
            .sl-btn-primary {
                padding: 0.55rem 1rem;
                border-radius: 12px;
                border: 1.5px solid rgba(250, 204, 21, 0.75);
                background: linear-gradient(135deg, #f59e0b, #d97706);
                color: #0f172a;
                font-weight: 900;
                font-size: 0.86rem;
                cursor: pointer;
            }
            .sl-btn-secondary {
                padding: 0.52rem 0.95rem;
                border-radius: 12px;
                border: 1px solid rgba(148, 163, 184, 0.4);
                background: rgba(30, 41, 59, 0.9);
                color: #f8fafc;
                font-weight: 800;
                font-size: 0.84rem;
                cursor: pointer;
            }
            .sl-option-btn {
                width: 100%;
                text-align: left;
                padding: 0.85rem 1rem;
                border-radius: 14px;
                border: 1.5px solid rgba(148, 163, 184, 0.3);
                background: rgba(30, 41, 59, 0.78);
                color: #f8fafc;
                font-size: 0.93rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.16s ease;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 0.6rem;
            }
            .sl-option-btn:hover {
                border-color: rgba(56, 189, 248, 0.75);
                background: rgba(30, 41, 59, 0.98);
            }
            .sl-option-btn.correct {
                border-color: #4ade80;
                background: rgba(22, 163, 74, 0.25);
                color: #bbf7d0;
            }
            .sl-option-btn.wrong {
                border-color: #f87171;
                background: rgba(220, 38, 38, 0.24);
                color: #fecaca;
            }
            .sl-feedback {
                margin-top: 0.85rem;
                padding: 0.9rem 1.05rem;
                border-radius: 14px;
                font-size: 0.92rem;
                line-height: 1.5;
                font-weight: 700;
            }
            .sl-feedback.ok {
                background: rgba(22, 163, 74, 0.2);
                border: 1.5px solid rgba(74, 222, 128, 0.55);
                color: #dcfce7;
            }
            .sl-feedback.err {
                background: rgba(220, 38, 38, 0.18);
                border: 1.5px solid rgba(248, 113, 113, 0.55);
                color: #fee2e2;
            }
            .sl-two-cols {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(265px, 1fr));
                gap: 0.85rem;
            }
            .sl-three-cols {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
                gap: 0.75rem;
            }
        `;
        document.head.appendChild(styleEl);
    }

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sl-page';

    // Top bar med Tilbage + hurtig genvej til søster-fladen "Små ORD"
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.flexWrap = 'wrap';
    topBar.style.gap = '0.5rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '←' + getTranslation('back');
    backBtn.onclick = () => navigateFn('samtale_traening');
    topBar.appendChild(backBtn);

    const sisterWrap = document.createElement('div');
    sisterWrap.style.display = 'flex';
    sisterWrap.style.flexWrap = 'wrap';
    sisterWrap.style.gap = '0.45rem';

    const sisterBtn = document.createElement('button');
    sisterBtn.type = 'button';
    sisterBtn.className = 'sl-btn-secondary';
    sisterBtn.innerHTML = st('Små ord →', lang);
    sisterBtn.onclick = () => navigateFn('samtale_smaaord');
    sisterWrap.appendChild(sisterBtn);

    const politeBtn = document.createElement('button');
    politeBtn.type = 'button';
    politeBtn.className = 'sl-btn-secondary';
    politeBtn.innerHTML = st('Høflighed →', lang);
    politeBtn.onclick = () => navigateFn('samtale_hoeflighed');
    sisterWrap.appendChild(politeBtn);

    topBar.appendChild(sisterWrap);

    viewContainer.appendChild(topBar);

    // Kompakt Hero — ingen gentagelse af lydlister eller rolle-bokse
    const hero = document.createElement('div');
    hero.className = 'sl-hero';
    hero.style.padding = '1rem 1.35rem';
    hero.innerHTML = `
        <h1${rtlAttr} style="margin:0 0 0.25rem; font-size:clamp(1.35rem, 2.4vw, 1.85rem); font-weight:900; color:#ffffff; text-align:start;">
            ${st('Små lyde i dansk samtale', lang)}
        </h1>
        <p${rtlAttr} style="margin:0; color:#cbd5e1; font-size:0.92rem; line-height:1.45;">
            ${st('20 danske dialoglyde, der styrer turtagning, aktiv lytning og følelser.', lang)}
        </p>
    `;
    viewContainer.appendChild(hero);

    // Faner
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'sl-tabs';
    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `sl-tab-btn ${currentTab === t.id ? 'active' :''}`;
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
        history.pushState(null, '', `#/${lang}/samtale_smaalyde/${tabId}`);
        tabsMenu.querySelectorAll('.sl-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.sl-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    function makePanel(id) {
        const p = document.createElement('div');
        p.className = `sl-panel ${currentTab === id ? 'active' :''}`;
        p.dataset.panel = id;
        return p;
    }

    // =========================================================================
    // FANE 1: VRIMLEBILLEDE MED 20 PEGEFELTER + VALGFRI ROLLE-SORTERING
    // =========================================================================
    const panel1 = makePanel('tab_vrimmel');
    let activeRoleFilter = 'alle';
    let selectedSound = DIALOG_SOUNDS[0];
    let compactPins = true;
    let showSortDrill = false;

    const card1 = document.createElement('div');
    card1.className = 'sl-card';
    card1.innerHTML = `
        <div class="sl-toolbar">
            <div class="sl-filters">
                <button type="button" class="sl-filter-btn active" data-rfilter="alle">${st('Alle (20)', lang)}</button>
                <button type="button" class="sl-filter-btn" data-rfilter="taler" style="border-color:rgba(245,158,11,0.65); color:#fde68a;">${samtaleRoleIcon('taler', 14)} ${st('Taler (4)', lang)}</button>
                <button type="button" class="sl-filter-btn" data-rfilter="lytter" style="border-color:rgba(6,182,212,0.65); color:#67e8f9;">${samtaleRoleIcon('lytter', 14)} ${st('Lytter (7)', lang)}</button>
                <button type="button" class="sl-filter-btn" data-rfilter="begge" style="border-color:rgba(192,132,252,0.75); color:#e9d5ff;">${samtaleRoleIcon('begge', 14)} ${st('Begge (9)', lang)}</button>
            </div>
        </div>

        <div class="sl-stage-wrap">
            <div class="sl-stage-inner" id="sl-stage-inner">
                <img src="assets/samtale_smaalyde_vrimmel.jpg" onerror="this.src= 'assets/samtale_smaaord_vrimmel.jpg'" alt="Vrimlebillede med 20 danske dialoglyde" class="sl-stage-img" />
                <div id="sl-pegefelter-layer"></div>
            </div>
        </div>

        <div class="sl-detail-box" id="sl-detail-box"></div>
    `;

    const pegefelterLayer = card1.querySelector('#sl-pegefelter-layer');
    const detailBox = card1.querySelector('#sl-detail-box');
    attachVrimmelControls(card1.querySelector('.sl-stage-wrap'), pegefelterLayer, { lang });

    function roleIcon(role, size = 13) {
        return samtaleRoleIcon(role, size);
    }

    function renderSoundDetail(sig) {
        const meta = ROLE_META[sig.role];
        detailBox.style.borderColor = meta.border;

        const showTaler = sig.role === 'taler' || sig.role === 'begge';
        const showLytter = sig.role === 'lytter' || sig.role === 'begge';
        const talerEx = sig.talerUsage.replace(/^Som TALER[^:]*:\s*/i, '');
        const lytterEx = sig.lytterUsage.replace(/^Som LYTTER[^:]*:\s*/i, '');

        detailBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.55rem;">
                <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
                    <span style="font-size:1.3rem; font-weight:900; color:#ffffff;">#${sig.num}. ${sig.sound}</span>
                    <span class="sl-pill-tag" style="background:${meta.bg}; color:${meta.color}; border:1.5px solid ${meta.border};">
                        ${roleIcon(sig.role, 13)} ${st(meta.short, lang)}
                    </span>
                </div>
                <button type="button" class="sl-btn-primary" id="sl-play-detail-audio" style="display:inline-flex; align-items:center; gap:0.4rem;">
                    ${samtaleIcons.audio(15)} ${st('Lyt', lang)}
                </button>
            </div>

            <div${rtlAttr} style="font-size:0.95rem; color:#f1f5f9; font-weight:700; margin-bottom:0.35rem;">
                ${st(sig.turnAction, lang)}
            </div>
            <div${rtlAttr} style="font-size:0.83rem; color:#94a3b8; margin-bottom:0.7rem;">
                <strong>${st('Tonefald:', lang)}</strong> ${st(sig.intonation, lang)}
            </div>

            <div class="${showTaler && showLytter ? 'sl-two-cols' :''}" style="margin-bottom:0.65rem;">
                ${showTaler ? `
                    <div style="background:rgba(245,158,11,0.1); border-left:4px solid #f59e0b; border-radius:12px; padding:0.7rem 0.9rem;">
                        <div style="font-size:0.74rem; font-weight:900; color:#fbbf24; text-transform:uppercase; margin-bottom:0.2rem; display:flex; align-items:center; gap:0.35rem;">
                            ${samtaleIcons.taler(13)} ${st('Som taler', lang)}
                        </div>
                        <div style="font-size:0.9rem; color:#f8fafc; line-height:1.45;">${talerEx}</div>
                        ${stSub(talerEx, 'st-tr-sent', lang)}
                    </div>
                ` :''}
                ${showLytter ? `
                    <div style="background:rgba(6,182,212,0.1); border-left:4px solid #06b6d4; border-radius:12px; padding:0.7rem 0.9rem;">
                        <div style="font-size:0.74rem; font-weight:900; color:#22d3ee; text-transform:uppercase; margin-bottom:0.2rem; display:flex; align-items:center; gap:0.35rem;">
                            ${samtaleIcons.lytter(13)} ${st('Som lytter', lang)}
                        </div>
                        <div style="font-size:0.9rem; color:#f8fafc; line-height:1.45;">${lytterEx}</div>
                        ${stSub(lytterEx, 'st-tr-sent', lang)}
                    </div>
                ` :''}
            </div>

            <div${rtlAttr} style="font-size:0.83rem; color:#fde68a; background:rgba(245,158,11,0.09); border:1px solid rgba(245,158,11,0.28); border-radius:10px; padding:0.5rem 0.8rem;">
                <strong>${st('Pas på:', lang)}</strong> ${st(sig.trapTip, lang)}
            </div>
        `;
        const playBtn = detailBox.querySelector('#sl-play-detail-audio');
        if (playBtn) {
            playBtn.onclick = () => speakSound(sig.ttsText, sig.ttsRate, sig.ttsPitch);
        }
    }

    function renderPegefelter() {
        pegefelterLayer.innerHTML = '';
        DIALOG_SOUNDS.forEach(sig => {
            const isHidden = activeRoleFilter !== 'alle' && sig.role !== activeRoleFilter;
            const isSelected = sig.id === selectedSound.id;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `sl-pegefelt role-${sig.role} ${sig.pointerDir === 'up' ? 'dir-up' :''} ${isSelected ? 'active show-mobile-label' :''} ${compactPins ? 'compact-mode' :''} ${isHidden ? 'hidden-pin' :''}`;
            btn.style.left = `${sig.x}%`;
            btn.style.top = `${sig.y}%`;
            btn.dataset.sigId = sig.id;
            btn.title = `#${sig.num} ${sig.sound} (${ROLE_META[sig.role].short})`;
            const rIcon = roleIcon(sig.role, 12);
            btn.innerHTML = compactPins
                ? `${rIcon}<span>${sig.num}</span>`
                : `<span class="sl-pegefelt-num">${sig.num}</span>${rIcon}<span class="sl-pegefelt-label">${sig.shortLabel}</span>`;
            btn.onclick = () => {
                selectedSound = sig;
                renderSoundDetail(sig);
                renderPegefelter();
            };
            pegefelterLayer.appendChild(btn);
        });
    }

    card1.querySelectorAll('.sl-filter-btn').forEach(btn => {
        btn.onclick = () => {
            activeRoleFilter = btn.dataset.rfilter;
            card1.querySelectorAll('.sl-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPegefelter();
        };
    });

    renderSoundDetail(selectedSound);
    renderPegefelter();
    panel1.appendChild(card1);

    // Valgfri 3-boks Rolle-sortering (sammenklappet som standard, så de 20 lyde ikke gentages på samme side)
    const sortCard = document.createElement('div');
    sortCard.className = 'sl-card';
    const sortPool = shuffleArray([...DIALOG_SOUNDS]);
    const sortedBuckets = { taler: [], lytter: [], begge: [] };
    let activeSortIdx = 0;
    let sortFeedback = '';

    function renderRoleSorting() {
        const placedSet = new Set([...sortedBuckets.taler, ...sortedBuckets.lytter, ...sortedBuckets.begge]);
        if (placedSet.has(activeSortIdx)) {
            activeSortIdx = sortPool.findIndex((_, i) => !placedSet.has(i));
        }
        const activeItem = activeSortIdx >= 0 ? sortPool[activeSortIdx] : null;

        if (!showSortDrill) {
            sortCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
                    <div${rtlAttr} style="font-size:0.96rem; font-weight:800; color:#e2e8f0;">
                        ${st('Sorteringsøvelse: Placér de 20 lyde i Taler, Lytter eller Begge', lang)} (${placedSet.size}/${sortPool.length})
                    </div>
                    <button type="button" class="sl-btn-secondary" id="sl-sort-toggle">${st('Åbn øvelse', lang)}</button>
                </div>
            `;
            sortCard.querySelector('#sl-sort-toggle').onclick = () => {
                showSortDrill = true;
                renderRoleSorting();
            };
            return;
        }

        sortCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <h3${rtlAttr} style="margin:0; font-size:1.05rem; font-weight:900;">${st('Sortér efter rolle', lang)} (${placedSet.size}/${sortPool.length})</h3>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sl-btn-secondary" id="sl-sort-reset">${st('Nulstil', lang)}</button>
                    <button type="button" class="sl-btn-secondary" id="sl-sort-toggle">${st('Skjul', lang)}</button>
                </div>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:0.4rem; padding:0.75rem; border-radius:14px; background:rgba(9,14,26,0.85); border:1px solid rgba(148,163,184,0.22); margin-bottom:0.75rem;">
                ${sortPool.map((item, idx) => {
                    const isPlaced = placedSet.has(idx);
                    const isActive = idx === activeSortIdx;
                    return `
                        <button type="button" class="sl-btn-secondary" data-sort-item="${idx}" ${isPlaced ? 'disabled' :''} style="${isPlaced ? 'opacity:0.32; text-decoration:line-through;' :''}${isActive ? 'background:#f59e0b; color:#0f172a; border-color:#fef08a; font-weight:900;' :''}">
                            ${item.sound}
                        </button>
                    `;
                }).join('')}
            </div>

            ${activeItem ? `
                <div${rtlAttr} style="margin-bottom:0.75rem; padding:0.6rem 0.9rem; border-radius:12px; background:rgba(56,189,248,0.12); border:1px solid #38bdf8; font-size:0.9rem;">
                    <strong style="color:#ffffff;">${activeItem.sound}</strong>
                    <span style="color:#cbd5e1;"> — ${st(activeItem.turnAction, lang)}</span>
                </div>
            ` : `
                <div class="sl-feedback ok"${rtlAttr} style="margin-bottom:0.75rem;">
                    ${st('Flot! Alle 20 dialoglyde er sorteret.', lang)}
                </div>
            `}

            <div class="sl-three-cols">
                ${[
                    { key:'taler', total: 4 },
                    { key:'lytter', total: 7 },
                    { key:'begge', total: 9 }
                ].map(({ key, total }) => {
                    const m = ROLE_META[key];
                    const items = sortedBuckets[key].map(i => sortPool[i]);
                    return `
                        <button type="button" data-sort-bucket="${key}" style="text-align:left; padding:0.85rem; border-radius:14px; background:${m.bg}; border:2px dashed ${m.border}; color:#ffffff; cursor:pointer;">
                            <div style="font-size:0.94rem; font-weight:900; color:${m.color}; margin-bottom:0.45rem; display:flex; align-items:center; gap:0.35rem;">
                                ${roleIcon(key, 14)} ${st(m.short, lang)} (${items.length}/${total})
                            </div>
                            <div style="display:flex; flex-wrap:wrap; gap:0.3rem;">
                                ${items.length
                                    ? items.map(it => `<span style="padding:0.18rem 0.48rem; border-radius:999px; background:rgba(15,23,42,0.88); border:1px solid ${m.border}; font-size:0.76rem; font-weight:800;">${it.shortLabel}</span>`).join('')
                                    : `<span style="font-size:0.8rem; color:#94a3b8;">${st('Klik for at placere', lang)}</span>`}
                            </div>
                        </button>
                    `;
                }).join('')}
            </div>
            ${sortFeedback ? `<div class="sl-feedback ${sortFeedback.startsWith('✓') ? 'ok' :'err'}"${rtlAttr}>${sortFeedback}</div>` :''}
        `;

        sortCard.querySelector('#sl-sort-toggle').onclick = () => {
            showSortDrill = false;
            renderRoleSorting();
        };
        sortCard.querySelector('#sl-sort-reset').onclick = () => {
            sortedBuckets.taler = [];
            sortedBuckets.lytter = [];
            sortedBuckets.begge = [];
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
                    sortFeedback = `✓ ${st('Rigtigt!', lang)} "${item.sound}" ${st('er', lang)} ${st(ROLE_META[targetRole].label, lang)}.`;
                } else {
                    sortFeedback = `✗ ${st('Ikke helt –', lang)} "${item.sound}" ${st('hører under', lang)} ${st(ROLE_META[item.role].label, lang)}.`;
                }
                renderRoleSorting();
            };
        });
    }

    renderRoleSorting();
    panel1.appendChild(sortCard);
    panelsHolder.appendChild(panel1);

    // =========================================================================
    // FANE 2: VÆLG DEN RIGTIGE DIALOGLYD (20 SITUATIONER)
    // =========================================================================
    const panel2 = makePanel('tab_vaelg');
    let chooseIdx = 0;
    let chooseScore = 0;
    let chooseAnswered = null;
    const chooseSolved = new Set();

    const card2 = document.createElement('div');
    card2.className = 'sl-card';

    function renderChooseTrack() {
        const q = CHOOSE_SOUND_EXERCISES[chooseIdx];
        const meta = ROLE_META[q.role];
        const sigMap = Object.fromEntries(DIALOG_SOUNDS.map(s => [s.id, s]));

        card2.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                    <span class="sl-pill-tag" style="background:${meta.bg}; color:${meta.color}; border:1.5px solid ${meta.border};">
                        ${roleIcon(q.role, 13)} ${st(meta.short, lang)}
                    </span>
                    <span style="font-size:0.85rem; color:#94a3b8; font-weight:800;">
                        ${st('Opgave', lang)} ${chooseIdx + 1}/${CHOOSE_SOUND_EXERCISES.length} • ${st('Score:', lang)} ${chooseScore}/${CHOOSE_SOUND_EXERCISES.length}
                    </span>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sl-btn-secondary" id="sl-choose-prev" ${chooseIdx === 0 ? 'disabled' :''}>${st('← Forrige', lang)}</button>
                    <button type="button" class="sl-btn-secondary" id="sl-choose-next" ${chooseIdx === CHOOSE_SOUND_EXERCISES.length - 1 ? 'disabled' :''}>${st('Næste →', lang)}</button>
                </div>
            </div>

            <div${rtlAttr} style="font-size:0.9rem; color:#fde68a; background:rgba(245,158,11,0.09); border:1px solid rgba(245,158,11,0.28); border-radius:12px; padding:0.7rem 0.95rem; margin-bottom:0.85rem;">
                <strong>${st('Situation:', lang)}</strong> ${st(q.context, lang)}
            </div>

            <div style="background:rgba(9,14,26,0.92); border-left:4px solid ${meta.color}; border-radius:14px; padding:0.95rem 1.1rem; margin-bottom:0.95rem;">
                <div style="margin-bottom:0.5rem;">
                    <div style="font-size:0.96rem; color:#cbd5e1;">${q.speakerA}</div>
                    ${stSub(q.speakerA, 'st-tr', lang)}
                </div>
                <div>
                    <div style="font-size:1.08rem; font-weight:900; color:#ffffff;">${q.speakerB}</div>
                    ${stSub(q.speakerB, 'st-tr-sent', lang)}
                </div>
            </div>

            <div class="sl-two-cols">
                ${q.options.map(optId => {
                    const s = sigMap[optId];
                    let cls = '';
                    if (chooseAnswered) {
                        if (optId === q.answerId) cls = 'correct';
                        else if (optId === chooseAnswered) cls = 'wrong';
                    }
                    return `
                        <button type="button" class="sl-option-btn ${cls}" data-choose-opt="${optId}">
                            <strong>${s.sound}</strong>
                        </button>
                    `;
                }).join('')}
            </div>

            ${chooseAnswered ? `
                <div class="sl-feedback ${chooseAnswered === q.answerId ? 'ok' :'err'}"${rtlAttr}>
                    <div>${chooseAnswered === q.answerId ? `✓ ${st('Rigtigt!', lang)}` : `✗ ${st('Bedste valg:', lang)} "${sigMap[q.answerId].sound}".`} ${st(q.explanation, lang)}</div>
                    <div style="margin-top:0.55rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <button type="button" class="sl-btn-primary" id="sl-choose-audio" style="display:inline-flex; align-items:center; gap:0.35rem;">${samtaleIcons.audio(14)} ${st('Lyt', lang)}</button>
                        ${chooseIdx < CHOOSE_SOUND_EXERCISES.length - 1 ? `<button type="button" class="sl-btn-secondary" id="sl-choose-advance">${st('Næste →', lang)}</button>` :''}
                    </div>
                </div>
            ` :''}
        `;

        card2.querySelector('#sl-choose-prev').onclick = () => {
            if (chooseIdx > 0) { chooseIdx--; chooseAnswered = null; renderChooseTrack(); }
        };
        card2.querySelector('#sl-choose-next').onclick = () => {
            if (chooseIdx < CHOOSE_SOUND_EXERCISES.length - 1) { chooseIdx++; chooseAnswered = null; renderChooseTrack(); }
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
        const audioBtn = card2.querySelector('#sl-choose-audio');
        if (audioBtn) {
            const ansSig = sigMap[q.answerId];
            audioBtn.onclick = () => speakSound(ansSig.ttsText, ansSig.ttsRate, ansSig.ttsPitch);
        }
        const advBtn = card2.querySelector('#sl-choose-advance');
        if (advBtn) {
            advBtn.onclick = () => { chooseIdx++; chooseAnswered = null; renderChooseTrack(); };
        }
    }

    renderChooseTrack();
    panel2.appendChild(card2);
    panelsHolder.appendChild(panel2);

    // =========================================================================
    // FANE 3: TALER, LYTTER ELLER BEGGE? (12 KONTEKST-DUELLER)
    // =========================================================================
    const panel3 = makePanel('tab_duel');
    let duelIdx = 0;
    let duelScore = 0;
    let duelPicked = null;
    const duelSolved = new Set();

    const card3 = document.createElement('div');
    card3.className = 'sl-card';

    function renderDuelTrack() {
        const d = SOUND_DUELS[duelIdx];
        card3.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                <div>
                    <h3${rtlAttr} style="margin:0; font-size:1.1rem; font-weight:900;">${st('Taler eller lytter?', lang)}</h3>
                    <div style="font-size:0.84rem; color:#94a3b8;">${st('Duel', lang)} ${duelIdx + 1}/${SOUND_DUELS.length} • ${st('Rigtige:', lang)} ${duelScore}/${SOUND_DUELS.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sl-btn-secondary" id="sl-duel-prev" ${duelIdx === 0 ? 'disabled' :''}>${st('← Forrige', lang)}</button>
                    <button type="button" class="sl-btn-secondary" id="sl-duel-next" ${duelIdx === SOUND_DUELS.length - 1 ? 'disabled' :''}>${st('Næste →', lang)}</button>
                </div>
            </div>

            <div style="background:rgba(9,14,26,0.92); border:1.5px solid rgba(192,132,252,0.45); border-radius:16px; padding:1rem 1.15rem; margin-bottom:0.95rem;">
                <div${rtlAttr} style="font-size:0.78rem; font-weight:900; color:#fde68a; text-transform:uppercase; margin-bottom:0.25rem;">
                    ${st('Fokus:', lang)} ${st(d.signal, lang)}
                </div>
                <div style="font-size:1.08rem; font-weight:900; color:#ffffff; line-height:1.45;">
                    ${d.quote}
                </div>
                ${stSub(d.quote, 'st-tr-sent', lang)}
            </div>

            <div class="sl-two-cols">
                ${DUEL_CHOICES.map(ch => {
                    const m = ROLE_META[ch.role];
                    let cls = '';
                    if (duelPicked) {
                        if (ch.id === d.correctAction) cls = 'correct';
                        else if (ch.id === duelPicked) cls = 'wrong';
                    }
                    return `
                        <button type="button" class="sl-option-btn ${cls}" data-duel-opt="${ch.id}">
                            <span style="display:inline-flex; align-items:center; gap:0.5rem;">
                                <span style="color:${m.color};">${roleIcon(ch.role, 16)}</span>
                                <span${rtlAttr}>${st(ch.label, lang)}</span>
                            </span>
                        </button>
                    `;
                }).join('')}
            </div>

            ${duelPicked ? `
                <div class="sl-feedback ${duelPicked === d.correctAction ? 'ok' :'err'}"${rtlAttr}>
                    <div>${duelPicked === d.correctAction ? `✓ ${st('Præcis!', lang)}` : `✗ ${st('Se på rollen i dialogen:', lang)}`} ${st(d.explanation, lang)}</div>
                    ${duelIdx < SOUND_DUELS.length - 1 ? `<button type="button" class="sl-btn-secondary" id="sl-duel-adv" style="margin-top:0.55rem;">${st('Næste →', lang)}</button>` :''}
                </div>
            ` :''}
        `;

        card3.querySelector('#sl-duel-prev').onclick = () => {
            if (duelIdx > 0) { duelIdx--; duelPicked = null; renderDuelTrack(); }
        };
        card3.querySelector('#sl-duel-next').onclick = () => {
            if (duelIdx < SOUND_DUELS.length - 1) { duelIdx++; duelPicked = null; renderDuelTrack(); }
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
        const advBtn = card3.querySelector('#sl-duel-adv');
        if (advBtn) {
            advBtn.onclick = () => { duelIdx++; duelPicked = null; renderDuelTrack(); };
        }
    }

    renderDuelTrack();
    panel3.appendChild(card3);
    panelsHolder.appendChild(panel3);

    // =========================================================================
    // FANE 4: YOUTUBE-MASTERCLASS OM "NÅ… PÅ DANSK" + TONEFALDS-LABORATORIET
    // =========================================================================
    const panel4 = makePanel('tab_tonefald');
    let activeNaaVariant = NAA_VIDEO_VARIANTS[0];
    let labFilter = 'naa_video';
    let labIdx = 0;
    let labPicked = null;

    const videoCard4 = document.createElement('div');
    videoCard4.className = 'sl-card';
    videoCard4.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.85rem;">
            <h3${rtlAttr} style="margin:0; font-size:1.18rem; font-weight:900; color:#ffffff;">
                ${st('"Nå… på dansk" — 10 betydninger', lang)}
            </h3>
            <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                <button type="button" class="sl-btn-secondary" id="sl-naa-play-start" style="display:inline-flex; align-items:center; gap:0.35rem;">
                    ${samtaleIcons.play(12)} ${st('Fra start', lang)}
                </button>
                <a href="https://youtu.be/${NAA_YOUTUBE_ID}" target="_blank" rel="noopener noreferrer" class="sl-btn-secondary" style="text-decoration:none;">
                    YouTube ↗
                </a>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:1rem; align-items:start;">
            <div style="background:rgba(9,14,26,0.94); border:1.5px solid rgba(56,189,248,0.35); border-radius:16px; overflow:hidden;">
                <div style="position:relative; width:100%; aspect-ratio:16/9; background:#020617;">
                    <iframe
                        id="sl-naa-yt-iframe"
                        src="https://www.youtube.com/embed/${NAA_YOUTUBE_ID}?rel=0"
                        title="Nå… på dansk (YouTube)"
                        style="position:absolute; inset:0; width:100%; height:100%; border:0;"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
                <div id="sl-naa-active-detail" style="padding:0.85rem 1rem;"></div>
            </div>

            <div style="background:rgba(9,14,26,0.9); border:1px solid rgba(148,163,184,0.22); border-radius:16px; padding:0.8rem;">
                <div id="sl-naa-variants-list" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:0.45rem;"></div>
            </div>
        </div>
    `;

    const ytIframe = videoCard4.querySelector('#sl-naa-yt-iframe');
    const activeNaaDetailBox = videoCard4.querySelector('#sl-naa-active-detail');
    const variantsListBox = videoCard4.querySelector('#sl-naa-variants-list');

    function jumpToVideoTimestamp(startSec, endSec) {
        const endParam = endSec ? `&end=${endSec}` :'';
        ytIframe.src = `https://www.youtube.com/embed/${NAA_YOUTUBE_ID}?start=${startSec}${endParam}&autoplay=1&rel=0`;
    }

    function renderNaaVideoDashboard() {
        const meta = ROLE_META[activeNaaVariant.role];
        activeNaaDetailBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.45rem;">
                <span class="sl-pill-tag" style="background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.border};">
                    ${roleIcon(activeNaaVariant.role, 12)} ${st(meta.short, lang)}
                </span>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sl-btn-primary" id="sl-naa-jump-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.play(12)} ${st('Klip', lang)} (${activeNaaVariant.timeLabel})
                    </button>
                    <button type="button" class="sl-btn-secondary" id="sl-naa-tts-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.audio(13)} ${st('Lyt', lang)}
                    </button>
                </div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.65rem; margin-bottom:0.35rem;">
                <div>
                    <div style="font-size:0.98rem; font-weight:900; color:#fde68a;">${activeNaaVariant.quoteFromVideo}</div>
                    ${stSub(activeNaaVariant.quoteFromVideo, 'st-tr-sent', lang)}
                </div>
                <svg width="88" height="34" viewBox="0 0 100 38" style="background:rgba(15,23,42,0.9); border-radius:8px; border:1px solid rgba(148,163,184,0.28); flex-shrink:0;">
                    <path d="${activeNaaVariant.curve}" fill="none" stroke="${activeNaaVariant.color}" stroke-width="3.2" stroke-linecap="round"/>
                </svg>
            </div>
            <div${rtlAttr} style="font-size:0.84rem; color:#cbd5e1; line-height:1.45;">
                ${st(activeNaaVariant.meaning, lang)}
            </div>
        `;

        activeNaaDetailBox.querySelector('#sl-naa-jump-clip').onclick = () => {
            jumpToVideoTimestamp(activeNaaVariant.startSec, activeNaaVariant.endSec);
        };
        activeNaaDetailBox.querySelector('#sl-naa-tts-clip').onclick = () => {
            speakSound(activeNaaVariant.ttsSample, 0.88, 1.04);
        };

        variantsListBox.innerHTML = NAA_VIDEO_VARIANTS.map(v => {
            const vMeta = ROLE_META[v.role];
            const isSel = v.id === activeNaaVariant.id;
            const subRaw = v.badgeText.split('= ')[1] ? v.badgeText.split('= ')[1].trim() : v.meaning;
            return `
                <button type="button" data-naa-vid="${v.id}" style="text-align:left; padding:0.5rem 0.68rem; border-radius:11px; background:${isSel ? 'rgba(56,189,248,0.18)' :'rgba(15,23,42,0.85)'}; border:1.5px solid ${isSel ? '#38bdf8' : vMeta.border}; color:#ffffff; cursor:pointer; display:flex; flex-direction:column; gap:0.2rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.35rem;">
                        <span style="font-size:0.83rem; font-weight:900; color:#ffffff;">${st(v.label, lang)}</span>
                        <span style="font-size:0.69rem; font-weight:900; padding:0.1rem 0.4rem; border-radius:999px; background:${vMeta.bg}; color:${vMeta.color}; display:inline-flex; align-items:center; gap:0.22rem;">${roleIcon(v.role, 11)} ${v.timeLabel}</span>
                    </div>
                    <div${rtlAttr} style="font-size:0.74rem; color:#94a3b8; line-height:1.3;">${st(subRaw, lang)}</div>
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

    videoCard4.querySelector('#sl-naa-play-start').onclick = () => {
        jumpToVideoTimestamp(0, null);
    };

    renderNaaVideoDashboard();
    panel4.appendChild(videoCard4);

    const card4 = document.createElement('div');
    card4.className = 'sl-card';

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
                    <h3${rtlAttr} style="margin:0; font-size:1.08rem; font-weight:900;">${st('Tonefalds-øvelser', lang)}</h3>
                    <div style="font-size:0.83rem; color:#94a3b8;">${st('Opgave', lang)} ${labIdx + 1}/${list.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sl-btn-secondary" id="sl-lab-prev" ${labIdx === 0 ? 'disabled' :''}>${st('← Forrige', lang)}</button>
                    <button type="button" class="sl-btn-secondary" id="sl-lab-next" ${labIdx === list.length - 1 ? 'disabled' :''}>${st('Næste →', lang)}</button>
                </div>
            </div>

            <div class="sl-filters" style="margin-bottom:0.85rem;">
                <button type="button" class="sl-filter-btn ${labFilter === 'naa_video' ? 'active' :''}" data-lfilter="naa_video">${st('"Nå" fra video (10)', lang)}</button>
                <button type="button" class="sl-filter-btn ${labFilter === 'other' ? 'active' :''}" data-lfilter="other">${st('Andre lyde (5)', lang)}</button>
                <button type="button" class="sl-filter-btn ${labFilter === 'all' ? 'active' :''}" data-lfilter="all">${st('Alle (15)', lang)}</button>
            </div>

            <div style="background:rgba(9,14,26,0.92); border:1.5px solid ${roleMeta.border}; border-radius:15px; padding:0.95rem 1.1rem; margin-bottom:0.9rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.45rem; margin-bottom:0.45rem;">
                    <span class="sl-pill-tag" style="background:${roleMeta.bg}; color:${roleMeta.color}; border:1px solid ${roleMeta.border};">
                        ${roleIcon(item.role || 'lytter', 12)} ${st(roleMeta.short, lang)}
                    </span>
                    <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                        <button type="button" class="sl-btn-primary" id="sl-lab-listen" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">${samtaleIcons.audio(13)} ${st('Lyt', lang)}</button>
                        ${item.isNaaVideo ? `
                            <button type="button" class="sl-btn-secondary" id="sl-lab-watch-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                                ${samtaleIcons.play(12)} ${st('Se klip', lang)} (${item.videoTimeLabel})
                            </button>
                        ` :''}
                    </div>
                </div>
                <div${rtlAttr} style="font-size:1rem; font-weight:900; color:#fde68a; margin-bottom:0.25rem;">${st(item.title, lang)}</div>
                <div${rtlAttr} style="font-size:0.93rem; color:#e2e8f0; line-height:1.45;">${st(item.situation, lang)}</div>
            </div>

            <div class="sl-two-cols">
                ${item.variants.map((v, vIdx) => {
                    let cls = '';
                    if (labPicked !== null) {
                        if (vIdx === item.correctIdx) cls = 'correct';
                        else if (vIdx === labPicked) cls = 'wrong';
                    }
                    return `
                        <button type="button" class="sl-option-btn ${cls}" data-lab-opt="${vIdx}" style="flex-direction:column; align-items:flex-start;">
                            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.5rem;">
                                <span${rtlAttr} style="font-size:0.94rem; font-weight:900; color:#ffffff;">${st(v.label, lang)}</span>
                                <svg width="88" height="34" viewBox="0 0 100 38" style="background:rgba(15,23,42,0.85); border-radius:8px; border:1px solid rgba(148,163,184,0.25); flex-shrink:0;">
                                    <path d="${v.curve}" fill="none" stroke="${v.color}" stroke-width="3.2" stroke-linecap="round"/>
                                </svg>
                            </div>
                            <div${rtlAttr} style="font-size:0.81rem; color:#cbd5e1; font-weight:600;">${st(v.meaning, lang)}</div>
                        </button>
                    `;
                }).join('')}
            </div>

            ${labPicked !== null ? `
                <div class="sl-feedback ${labPicked === item.correctIdx ? 'ok' :'err'}"${rtlAttr}>
                    <div>${labPicked === item.correctIdx ? `✓ ${st('Rigtigt!', lang)}` : `✗ ${st('Bemærk tonefaldet:', lang)}`} ${st(item.explanation, lang)}</div>
                    ${labIdx < list.length - 1 ? `<button type="button" class="sl-btn-secondary" id="sl-lab-adv" style="margin-top:0.55rem;">${st('Næste →', lang)}</button>` :''}
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
        card4.querySelector('#sl-lab-prev').onclick = () => {
            if (labIdx > 0) { labIdx--; labPicked = null; renderLabTrack(); }
        };
        card4.querySelector('#sl-lab-next').onclick = () => {
            if (labIdx < list.length - 1) { labIdx++; labPicked = null; renderLabTrack(); }
        };
        card4.querySelector('#sl-lab-listen').onclick = () => {
            speakSound(item.ttsSample, 0.88, 1.04);
        };
        const watchClipBtn = card4.querySelector('#sl-lab-watch-clip');
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
        const advBtn = card4.querySelector('#sl-lab-adv');
        if (advBtn) {
            advBtn.onclick = () => { labIdx++; labPicked = null; renderLabTrack(); };
        }
    }

    renderLabTrack();
    panel4.appendChild(card4);
    panelsHolder.appendChild(panel4);

    // =========================================================================
    // FANE 5: YOUTUBE-VIDEO OM "AT VÆRE UENIG I NOGET"
    // =========================================================================
    const panelUenig = makePanel('tab_uenig_video');
    let activeUenigVariant = UENIG_VIDEO_VARIANTS[0];
    let uenigFilter = 'all';
    let uenigIdx = 0;
    let uenigPicked = null;

    const videoCardUenig = document.createElement('div');
    videoCardUenig.className = 'sl-card';
    videoCardUenig.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.85rem;">
            <h3${rtlAttr} style="margin:0; font-size:1.18rem; font-weight:900; color:#ffffff;">
                ${st('"At være uenig i noget" — 8 udtryk', lang)}
            </h3>
            <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                <button type="button" class="sl-btn-secondary" id="sl-uenig-play-start" style="display:inline-flex; align-items:center; gap:0.35rem;">
                    ${samtaleIcons.play(12)} ${st('Fra start', lang)}
                </button>
                <a href="https://www.youtube.com/watch?v=${UENIG_YOUTUBE_ID}" target="_blank" rel="noopener noreferrer" class="sl-btn-secondary" style="text-decoration:none;">
                    YouTube ↗
                </a>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:1rem; align-items:start;">
            <div style="background:rgba(9,14,26,0.94); border:1.5px solid rgba(192,132,252,0.42); border-radius:16px; overflow:hidden;">
                <div style="position:relative; width:100%; aspect-ratio:16/9; background:#020617;">
                    <iframe
                        id="sl-uenig-yt-iframe"
                        src="https://www.youtube.com/embed/${UENIG_YOUTUBE_ID}?rel=0"
                        title="At være uenig i noget (YouTube)"
                        style="position:absolute; inset:0; width:100%; height:100%; border:0;"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
                <div id="sl-uenig-active-detail" style="padding:0.85rem 1rem;"></div>
            </div>

            <div style="background:rgba(9,14,26,0.9); border:1px solid rgba(148,163,184,0.22); border-radius:16px; padding:0.8rem;">
                <div id="sl-uenig-variants-list" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(225px, 1fr)); gap:0.45rem;"></div>
            </div>
        </div>
    `;

    const uenigYtIframe = videoCardUenig.querySelector('#sl-uenig-yt-iframe');
    const activeUenigDetailBox = videoCardUenig.querySelector('#sl-uenig-active-detail');
    const uenigVariantsListBox = videoCardUenig.querySelector('#sl-uenig-variants-list');

    function jumpToUenigTimestamp(startSec, endSec) {
        const endParam = endSec ? `&end=${endSec}` :'';
        uenigYtIframe.src = `https://www.youtube.com/embed/${UENIG_YOUTUBE_ID}?start=${startSec}${endParam}&autoplay=1&rel=0`;
    }

    function renderUenigVideoDashboard() {
        const meta = ROLE_META[activeUenigVariant.role];
        const regColor = activeUenigVariant.register === 'hoeflig'
            ? '#4ade80'
            : activeUenigVariant.register === 'uformel'
                ? '#fbbf24'
                :'#f87171';

        activeUenigDetailBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.45rem; margin-bottom:0.45rem;">
                <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
                    <span class="sl-pill-tag" style="background:rgba(15,23,42,0.9); color:${regColor}; border:1px solid ${regColor};">
                        ${st(activeUenigVariant.registerLabel, lang)}
                    </span>
                    <span class="sl-pill-tag" style="background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.border};">
                        ${roleIcon(activeUenigVariant.role, 12)} ${st(meta.short, lang)}
                    </span>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sl-btn-primary" id="sl-uenig-jump-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.play(12)} ${st('Klip', lang)} (${activeUenigVariant.timeLabel})
                    </button>
                    <button type="button" class="sl-btn-secondary" id="sl-uenig-tts-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                        ${samtaleIcons.audio(13)} ${st('Lyt', lang)}
                    </button>
                </div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.65rem; margin-bottom:0.35rem;">
                <div>
                    <div style="font-size:0.98rem; font-weight:900; color:#fde68a;">${activeUenigVariant.quoteFromVideo}</div>
                    ${stSub(activeUenigVariant.quoteFromVideo, 'st-tr-sent', lang)}
                </div>
                <svg width="88" height="34" viewBox="0 0 100 38" style="background:rgba(15,23,42,0.9); border-radius:8px; border:1px solid rgba(148,163,184,0.28); flex-shrink:0;">
                    <path d="${activeUenigVariant.curve}" fill="none" stroke="${activeUenigVariant.color}" stroke-width="3.2" stroke-linecap="round"/>
                </svg>
            </div>
            <div${rtlAttr} style="font-size:0.84rem; color:#cbd5e1; line-height:1.45;">
                ${st(activeUenigVariant.meaning, lang)}
            </div>
        `;

        activeUenigDetailBox.querySelector('#sl-uenig-jump-clip').onclick = () => {
            jumpToUenigTimestamp(activeUenigVariant.startSec, activeUenigVariant.endSec);
        };
        activeUenigDetailBox.querySelector('#sl-uenig-tts-clip').onclick = () => {
            speakSound(activeUenigVariant.ttsSample, 0.9, 1.02);
        };

        uenigVariantsListBox.innerHTML = UENIG_VIDEO_VARIANTS.map(v => {
            const isSel = v.id === activeUenigVariant.id;
            const rCol = v.register === 'hoeflig' ? '#4ade80' : v.register === 'uformel' ? '#f59e0b' :'#f87171';
            return `
                <button type="button" data-uenig-vid="${v.id}" style="text-align:left; padding:0.5rem 0.68rem; border-radius:11px; background:${isSel ? 'rgba(192,132,252,0.2)' :'rgba(15,23,42,0.85)'}; border:1.5px solid ${isSel ? '#e879f9' : rCol}; color:#ffffff; cursor:pointer; display:flex; flex-direction:column; gap:0.2rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.35rem;">
                        <span style="font-size:0.82rem; font-weight:900; color:#ffffff;">${v.label}</span>
                        <span style="font-size:0.69rem; font-weight:900; padding:0.1rem 0.4rem; border-radius:999px; background:rgba(15,23,42,0.9); color:${rCol}; border:1px solid ${rCol};">${v.timeLabel}</span>
                    </div>
                    <div${rtlAttr} style="font-size:0.73rem; color:#94a3b8; font-weight:700;">${st(v.registerLabel, lang)}</div>
                </button>
            `;
        }).join('');

        uenigVariantsListBox.querySelectorAll('[data-uenig-vid]').forEach(btn => {
            btn.onclick = () => {
                const found = UENIG_VIDEO_VARIANTS.find(x => x.id === btn.dataset.uenigVid);
                if (found) {
                    activeUenigVariant = found;
                    renderUenigVideoDashboard();
                    jumpToUenigTimestamp(found.startSec, found.endSec);
                }
            };
        });
    }

    videoCardUenig.querySelector('#sl-uenig-play-start').onclick = () => {
        jumpToUenigTimestamp(0, null);
    };

    renderUenigVideoDashboard();
    panelUenig.appendChild(videoCardUenig);

    const cardUenigQuiz = document.createElement('div');
    cardUenigQuiz.className = 'sl-card';

    function getFilteredUenigLabItems() {
        if (uenigFilter === 'hoeflig') return UENIG_LAB_ITEMS.filter(x => x.register === 'hoeflig');
        if (uenigFilter === 'uformel') return UENIG_LAB_ITEMS.filter(x => x.register === 'uformel' || x.register === 'slang');
        return UENIG_LAB_ITEMS;
    }

    function renderUenigLabTrack() {
        const list = getFilteredUenigLabItems();
        if (uenigIdx >= list.length) uenigIdx = 0;
        const item = list[uenigIdx];
        const roleMeta = ROLE_META[item.role || 'lytter'];

        cardUenigQuiz.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.7rem;">
                <div>
                    <h3${rtlAttr} style="margin:0; font-size:1.08rem; font-weight:900;">${st('Øvelser til videoen', lang)}</h3>
                    <div style="font-size:0.83rem; color:#94a3b8;">${st('Opgave', lang)} ${uenigIdx + 1}/${list.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sl-btn-secondary" id="sl-uenig-prev" ${uenigIdx === 0 ? 'disabled' :''}>${st('← Forrige', lang)}</button>
                    <button type="button" class="sl-btn-secondary" id="sl-uenig-next" ${uenigIdx === list.length - 1 ? 'disabled' :''}>${st('Næste →', lang)}</button>
                </div>
            </div>

            <div class="sl-filters" style="margin-bottom:0.85rem;">
                <button type="button" class="sl-filter-btn ${uenigFilter === 'all' ? 'active' :''}" data-ufilter="all">${st('Alle (8)', lang)}</button>
                <button type="button" class="sl-filter-btn ${uenigFilter === 'uformel' ? 'active' :''}" data-ufilter="uformel">${st('Uformel (5)', lang)}</button>
                <button type="button" class="sl-filter-btn ${uenigFilter === 'hoeflig' ? 'active' :''}" data-ufilter="hoeflig">${st('Høflig (3)', lang)}</button>
            </div>

            <div style="background:rgba(9,14,26,0.92); border:1.5px solid ${roleMeta.border}; border-radius:15px; padding:0.95rem 1.1rem; margin-bottom:0.9rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.45rem; margin-bottom:0.45rem;">
                    <span class="sl-pill-tag" style="background:${roleMeta.bg}; color:${roleMeta.color}; border:1px solid ${roleMeta.border};">
                        ${roleIcon(item.role || 'lytter', 12)} ${st(roleMeta.short, lang)}
                    </span>
                    <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                        <button type="button" class="sl-btn-primary" id="sl-uenig-listen" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">${samtaleIcons.audio(13)} ${st('Lyt', lang)}</button>
                        <button type="button" class="sl-btn-secondary" id="sl-uenig-watch-clip" style="padding:0.36rem 0.72rem; font-size:0.8rem; display:inline-flex; align-items:center; gap:0.35rem;">
                            ${samtaleIcons.play(12)} ${st('Se klip', lang)} (${item.videoTimeLabel})
                        </button>
                    </div>
                </div>
                <div${rtlAttr} style="font-size:1rem; font-weight:900; color:#fde68a; margin-bottom:0.25rem;">${st(item.title, lang)}</div>
                <div${rtlAttr} style="font-size:0.93rem; color:#e2e8f0; line-height:1.45;">${st(item.situation, lang)}</div>
            </div>

            <div class="sl-two-cols">
                ${item.variants.map((v, vIdx) => {
                    let cls = '';
                    if (uenigPicked !== null) {
                        if (vIdx === item.correctIdx) cls = 'correct';
                        else if (vIdx === uenigPicked) cls = 'wrong';
                    }
                    return `
                        <button type="button" class="sl-option-btn ${cls}" data-uenig-opt="${vIdx}" style="flex-direction:column; align-items:flex-start;">
                            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.5rem;">
                                <span${rtlAttr} style="font-size:0.94rem; font-weight:900; color:#ffffff;">${st(v.label, lang)}</span>
                                <svg width="88" height="34" viewBox="0 0 100 38" style="background:rgba(15,23,42,0.85); border-radius:8px; border:1px solid rgba(148,163,184,0.25); flex-shrink:0;">
                                    <path d="${v.curve}" fill="none" stroke="${v.color}" stroke-width="3.2" stroke-linecap="round"/>
                                </svg>
                            </div>
                            <div${rtlAttr} style="font-size:0.81rem; color:#cbd5e1; font-weight:600;">${st(v.meaning, lang)}</div>
                        </button>
                    `;
                }).join('')}
            </div>

            ${uenigPicked !== null ? `
                <div class="sl-feedback ${uenigPicked === item.correctIdx ? 'ok' :'err'}"${rtlAttr}>
                    <div>${uenigPicked === item.correctIdx ? `✓ ${st('Rigtigt!', lang)}` : `✗ ${st('Se videoens eksempel:', lang)}`} ${st(item.explanation, lang)}</div>
                    ${uenigIdx < list.length - 1 ? `<button type="button" class="sl-btn-secondary" id="sl-uenig-adv" style="margin-top:0.55rem;">${st('Næste →', lang)}</button>` :''}
                </div>
            ` :''}
        `;

        cardUenigQuiz.querySelectorAll('[data-ufilter]').forEach(btn => {
            btn.onclick = () => {
                uenigFilter = btn.dataset.ufilter;
                uenigIdx = 0;
                uenigPicked = null;
                renderUenigLabTrack();
            };
        });
        cardUenigQuiz.querySelector('#sl-uenig-prev').onclick = () => {
            if (uenigIdx > 0) { uenigIdx--; uenigPicked = null; renderUenigLabTrack(); }
        };
        cardUenigQuiz.querySelector('#sl-uenig-next').onclick = () => {
            if (uenigIdx < list.length - 1) { uenigIdx++; uenigPicked = null; renderUenigLabTrack(); }
        };
        cardUenigQuiz.querySelector('#sl-uenig-listen').onclick = () => {
            speakSound(item.ttsSample, 0.9, 1.02);
        };
        cardUenigQuiz.querySelector('#sl-uenig-watch-clip').onclick = () => {
            jumpToUenigTimestamp(item.videoStart, item.videoEnd);
            uenigYtIframe.scrollIntoView({ behavior:'smooth', block:'center' });
        };
        cardUenigQuiz.querySelectorAll('[data-uenig-opt]').forEach(btn => {
            btn.onclick = () => {
                uenigPicked = Number(btn.dataset.uenigOpt);
                renderUenigLabTrack();
            };
        });
        const advBtn = cardUenigQuiz.querySelector('#sl-uenig-adv');
        if (advBtn) {
            advBtn.onclick = () => { uenigIdx++; uenigPicked = null; renderUenigLabTrack(); };
        }
    }

    renderUenigLabTrack();
    panelUenig.appendChild(cardUenigQuiz);
    panelsHolder.appendChild(panelUenig);

    // =========================================================================
    // FANE 6: HOLD SAMTALEN I LIVE! (3 INTERAKTIVE LYD-SIMULATORER)
    // =========================================================================
    const panel5 = makePanel('tab_live');
    let simIdx = 0;
    let simTurnIdx = 0;
    let simPickedOpt = null;
    const simHistory = [];

    const card5 = document.createElement('div');
    card5.className = 'sl-card';

    function renderLiveSim() {
        const sim = LIVE_SOUND_CONVERSATIONS[simIdx];
        const turn = sim.turns[simTurnIdx];
        const roleMeta = turn ? ROLE_META[turn.targetRole] : null;

        card5.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                <h3${rtlAttr} style="margin:0; font-size:1.1rem; font-weight:900;">${st('Hold samtalen i live', lang)}</h3>
                <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                    ${LIVE_SOUND_CONVERSATIONS.map((c, idx) => `
                        <button type="button" class="sl-filter-btn ${idx === simIdx ? 'active' :''}" data-sim-pick="${idx}">
                            ${st(c.title, lang)}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div${rtlAttr} style="font-size:0.88rem; color:#cbd5e1; background:rgba(15,23,42,0.85); border:1px solid rgba(148,163,184,0.22); border-radius:12px; padding:0.65rem 0.95rem; margin-bottom:0.9rem;">
                ${st(sim.scene, lang)}
            </div>

            <div style="display:flex; flex-direction:column; gap:0.55rem; margin-bottom:0.95rem;">
                ${simHistory.map(h => `
                    <div style="background:rgba(30,41,59,0.75); border-radius:12px; padding:0.6rem 0.9rem; font-size:0.88rem; color:#cbd5e1;">
                        <div>${h.partnerLine}</div>
                        ${stSub(h.partnerLine, 'st-tr', lang)}
                    </div>
                    <div style="align-self:flex-end; background:rgba(34,197,94,0.18); border:1px solid rgba(74,222,128,0.45); border-radius:12px; padding:0.55rem 0.9rem; font-size:0.88rem; color:#bbf7d0; font-weight:800;">
                        <div>${st('Dig:', lang)} "${h.userReply}" ✓</div>
                        ${stSub(h.userReply, 'st-tr', lang)}
                    </div>
                `).join('')}
            </div>

            ${turn ? `
                <div style="background:rgba(9,14,26,0.94); border-left:4px solid ${roleMeta.color}; border-radius:14px; padding:0.95rem 1.1rem; margin-bottom:0.9rem;">
                    <div style="margin-bottom:0.5rem;">
                        <div style="font-size:1rem; color:#ffffff; font-weight:800;">${turn.partnerLine}</div>
                        ${stSub(turn.partnerLine, 'st-tr-sent', lang)}
                    </div>
                    <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                        <span class="sl-pill-tag" style="background:${roleMeta.bg}; color:${roleMeta.color}; border:1px solid ${roleMeta.border};">
                            ${roleIcon(turn.targetRole, 12)} ${st(roleMeta.short, lang)}
                        </span>
                        <span${rtlAttr} style="font-size:0.86rem; color:#fde68a; font-weight:700;">${st(turn.instruction, lang)}</span>
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
                            <button type="button" class="sl-option-btn ${cls}" data-sim-opt="${oIdx}" style="flex-direction:column; align-items:flex-start; gap:0.12rem;">
                                <span>"${opt.text}"</span>
                                ${stSub(opt.text, 'st-tr-opt', lang)}
                            </button>
                        `;
                    }).join('')}
                </div>

                ${simPickedOpt !== null ? `
                    <div class="sl-feedback ${turn.options[simPickedOpt].ok ? 'ok' :'err'}"${rtlAttr}>
                        <div>${st(turn.options[simPickedOpt].feedback, lang)}</div>
                        ${turn.options[simPickedOpt].ok ? `
                            <button type="button" class="sl-btn-primary" id="sl-sim-continue" style="margin-top:0.55rem;">
                                ${simTurnIdx < sim.turns.length - 1 ? st('Fortsæt →', lang) : st('Afslut', lang)}
                            </button>
                        ` :''}
                    </div>
                ` :''}
            ` : `
                <div class="sl-feedback ok"${rtlAttr}>
                    <div style="font-size:1rem; margin-bottom:0.45rem;">✓ ${st('Flot! Du gennemførte samtalen med', lang)} ${st(sim.partner, lang)}.</div>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <button type="button" class="sl-btn-secondary" id="sl-sim-restart">${st('Prøv igen', lang)}</button>
                        ${simIdx < LIVE_SOUND_CONVERSATIONS.length - 1 ? `<button type="button" class="sl-btn-primary" id="sl-sim-next-scene">${st('Næste samtale →', lang)}</button>` :''}
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
        const contBtn = card5.querySelector('#sl-sim-continue');
        if (contBtn) {
            contBtn.onclick = () => {
                const chosen = turn.options[simPickedOpt];
                simHistory.push({ partnerLine: turn.partnerLine, userReply: chosen.text });
                simTurnIdx++;
                simPickedOpt = null;
                renderLiveSim();
            };
        }
        const restartBtn = card5.querySelector('#sl-sim-restart');
        if (restartBtn) {
            restartBtn.onclick = () => {
                simTurnIdx = 0;
                simPickedOpt = null;
                simHistory.length = 0;
                renderLiveSim();
            };
        }
        const nextSceneBtn = card5.querySelector('#sl-sim-next-scene');
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
    // FANE 6: FRA STILLE ROBOT TIL LEVENDE DIALOGLYDE (8 OPGRADERINGER)
    // =========================================================================
    const panel6 = makePanel('tab_robot');
    let robIdx = 0;
    let pick1 = null;
    let pick2 = null;

    const card6 = document.createElement('div');
    card6.className = 'sl-card';

    function renderRobotTrack() {
        const item = ROBOT_SOUND_UPGRADES[robIdx];
        const bothDone = pick1 === item.slot1Answer && pick2 === item.slot2Answer;
        const previewHtml = item.slotsText
            .replace('[1]', `<strong style="padding:0.15rem 0.5rem; border-radius:6px; background:${pick1 === item.slot1Answer ? 'rgba(34,197,94,0.28)' :'rgba(245,158,11,0.25)'}; color:#fde68a;">${pick1 || '[ 1 ]'}</strong>`)
            .replace('[2]', `<strong style="padding:0.15rem 0.5rem; border-radius:6px; background:${pick2 === item.slot2Answer ? 'rgba(34,197,94,0.28)' :'rgba(6,182,212,0.25)'}; color:#67e8f9;">${pick2 || '[ 2 ]'}</strong>`);

        card6.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                <div>
                    <h3${rtlAttr} style="margin:0; font-size:1.1rem; font-weight:900;">${st('Fra robot-dansk til levende dialoglyde', lang)}</h3>
                    <div${rtlAttr} style="font-size:0.84rem; color:#94a3b8;">${st('Dialog', lang)} ${robIdx + 1}/${ROBOT_SOUND_UPGRADES.length}: ${st(item.title, lang)}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button type="button" class="sl-btn-secondary" id="sl-rob-prev" ${robIdx === 0 ? 'disabled' :''}>${st('← Forrige', lang)}</button>
                    <button type="button" class="sl-btn-secondary" id="sl-rob-next" ${robIdx === ROBOT_SOUND_UPGRADES.length - 1 ? 'disabled' :''}>${st('Næste →', lang)}</button>
                </div>
            </div>

            <div style="background:rgba(239,68,68,0.12); border:1px solid rgba(248,113,113,0.35); border-radius:12px; padding:0.7rem 0.95rem; margin-bottom:0.7rem; color:#fecaca; font-size:0.93rem;">
                <div>${item.robotText}</div>
                ${stSub(item.robotText, 'st-tr', lang)}
            </div>

            <div style="background:rgba(34,197,94,0.12); border:1.5px solid rgba(74,222,128,0.45); border-radius:14px; padding:0.9rem 1.05rem; margin-bottom:0.95rem; color:#ffffff; font-size:1.03rem; line-height:1.55;">
                <div>${previewHtml}</div>
                ${stSub(item.slotsText, 'st-tr-sent', lang)}
            </div>

            <div class="sl-two-cols">
                <div style="background:rgba(9,14,26,0.85); border:1px solid rgba(148,163,184,0.25); border-radius:14px; padding:0.85rem;">
                    <div style="font-size:0.8rem; font-weight:900; color:#fde68a; text-transform:uppercase; margin-bottom:0.45rem;">${st('Plads [ 1 ]', lang)}</div>
                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        ${item.slot1Options.map(opt => `
                            <button type="button" class="sl-option-btn ${pick1 === opt ? (opt === item.slot1Answer ? 'correct' :'wrong') :''}" data-rob-s1="${opt}">
                                <span>${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div style="background:rgba(9,14,26,0.85); border:1px solid rgba(148,163,184,0.25); border-radius:14px; padding:0.85rem;">
                    <div style="font-size:0.8rem; font-weight:900; color:#67e8f9; text-transform:uppercase; margin-bottom:0.45rem;">${st('Plads [ 2 ]', lang)}</div>
                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        ${item.slot2Options.map(opt => `
                            <button type="button" class="sl-option-btn ${pick2 === opt ? (opt === item.slot2Answer ? 'correct' :'wrong') :''}" data-rob-s2="${opt}">
                                <span>${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>

            ${bothDone ? `
                <div class="sl-feedback ok"${rtlAttr}>
                    <div>✓ ${st(item.explanation, lang)}</div>
                    ${robIdx < ROBOT_SOUND_UPGRADES.length - 1 ? `<button type="button" class="sl-btn-secondary" id="sl-rob-adv" style="margin-top:0.55rem;">${st('Næste →', lang)}</button>` :''}
                </div>
            ` :''}
        `;

        card6.querySelector('#sl-rob-prev').onclick = () => {
            if (robIdx > 0) { robIdx--; pick1 = null; pick2 = null; renderRobotTrack(); }
        };
        card6.querySelector('#sl-rob-next').onclick = () => {
            if (robIdx < ROBOT_SOUND_UPGRADES.length - 1) { robIdx++; pick1 = null; pick2 = null; renderRobotTrack(); }
        };
        card6.querySelectorAll('[data-rob-s1]').forEach(btn => {
            btn.onclick = () => { pick1 = btn.dataset.robS1; renderRobotTrack(); };
        });
        card6.querySelectorAll('[data-rob-s2]').forEach(btn => {
            btn.onclick = () => { pick2 = btn.dataset.robS2; renderRobotTrack(); };
        });
        const advBtn = card6.querySelector('#sl-rob-adv');
        if (advBtn) {
            advBtn.onclick = () => { robIdx++; pick1 = null; pick2 = null; renderRobotTrack(); };
        }
    }

    renderRobotTrack();
    panel6.appendChild(card6);
    panelsHolder.appendChild(panel6);

    // =========================================================================
    // FANE 7: LYD-DETEKTIVEN I VRIMLEBILLEDET (12 MISSIONER)
    // =========================================================================
    const panel7 = makePanel('tab_detektiv');
    let detIdx = 0;
    let detMsg = '';
    let detSolved = false;
    let detShowHint = false;
    const detDoneSet = new Set();

    const card7 = document.createElement('div');
    card7.className = 'sl-card';

    function renderDetective() {
        const m = DETECTIVE_SOUND_MISSIONS[detIdx];
        const sigMap = Object.fromEntries(DIALOG_SOUNDS.map(s => [s.id, s]));
        const targetSig = sigMap[m.answerId];

        card7.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                <div>
                    <h3${rtlAttr} style="margin:0; font-size:1.1rem; font-weight:900;">${st('Lyd-detektiven', lang)}</h3>
                    <div style="font-size:0.83rem; color:#94a3b8;">${st('Mission', lang)} ${detIdx + 1}/${DETECTIVE_SOUND_MISSIONS.length} • ${st('Løst:', lang)} ${detDoneSet.size}/${DETECTIVE_SOUND_MISSIONS.length}</div>
                </div>
                <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                    <button type="button" class="sl-btn-secondary" id="sl-det-hint">${detShowHint ? st('Skjul spor', lang) : st('Vis spor', lang)}</button>
                    <button type="button" class="sl-btn-secondary" id="sl-det-prev" ${detIdx === 0 ? 'disabled' :''}>${st('← Forrige', lang)}</button>
                    <button type="button" class="sl-btn-secondary" id="sl-det-next" ${detIdx === DETECTIVE_SOUND_MISSIONS.length - 1 ? 'disabled' :''}>${st('Næste →', lang)}</button>
                </div>
            </div>

            <div${rtlAttr} style="background:rgba(56,189,248,0.12); border:1.5px solid #38bdf8; border-radius:14px; padding:0.85rem 1.05rem; margin-bottom:0.8rem;">
                <div style="font-size:0.98rem; font-weight:900; color:#ffffff;">${st(m.prompt, lang)}</div>
                ${detShowHint ? `<div style="font-size:0.83rem; color:#bae6fd; margin-top:0.35rem;">${st('Spor:', lang)} ${st(m.hint, lang)}</div>` :''}
            </div>

            ${detMsg ? `<div class="sl-feedback ${detSolved ? 'ok' :'err'}"${rtlAttr} style="margin-top:0; margin-bottom:0.8rem;">${detMsg}</div>` :''}

            <div class="sl-stage-wrap">
                <div class="sl-stage-inner">
                    <img src="assets/samtale_smaalyde_vrimmel.jpg" onerror="this.src= 'assets/samtale_smaaord_vrimmel.jpg'" alt="Lyd-detektiv vrimlebillede" class="sl-stage-img" />
                    <div id="sl-det-pins"></div>
                </div>
            </div>
        `;

        const detPinsLayer = card7.querySelector('#sl-det-pins');
        attachVrimmelControls(card7.querySelector('.sl-stage-wrap'), detPinsLayer, { lang });
        DIALOG_SOUNDS.forEach(sig => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const isFound = detSolved && sig.id === m.answerId;
            btn.className = `sl-pegefelt role-${sig.role} ${sig.pointerDir === 'up' ? 'dir-up' :''} ${isFound ? 'active show-mobile-label' :'compact-mode'}`;
            btn.style.left = `${sig.x}%`;
            btn.style.top = `${sig.y}%`;
            btn.innerHTML = isFound
                ? `<span class="sl-pegefelt-num">${sig.num}</span>${roleIcon(sig.role, 12)}<span class="sl-pegefelt-label">${sig.shortLabel}</span>`
                : `${roleIcon(sig.role, 12)}<span>${sig.num}</span>`;
            btn.onclick = () => {
                if (sig.id === m.answerId) {
                    detSolved = true;
                    detDoneSet.add(detIdx);
                    detMsg = `✓ ${st('Fundet!', lang)} #${targetSig.num} "${targetSig.sound}" (${st(ROLE_META[targetSig.role].label, lang)}): ${st(targetSig.turnAction, lang)}`;
                    speakSound(targetSig.ttsText, targetSig.ttsRate, targetSig.ttsPitch);
                } else {
                    detSolved = false;
                    detMsg = `✗ ${st('Det var', lang)} #${sig.num} "${sig.sound}". ${st('Prøv igen.', lang)}`;
                }
                renderDetective();
            };
            detPinsLayer.appendChild(btn);
        });

        card7.querySelector('#sl-det-hint').onclick = () => {
            detShowHint = !detShowHint;
            renderDetective();
        };
        card7.querySelector('#sl-det-prev').onclick = () => {
            if (detIdx > 0) { detIdx--; detMsg = ''; detSolved = false; detShowHint = false; renderDetective(); }
        };
        card7.querySelector('#sl-det-next').onclick = () => {
            if (detIdx < DETECTIVE_SOUND_MISSIONS.length - 1) { detIdx++; detMsg = ''; detSolved = false; detShowHint = false; renderDetective(); }
        };
    }

    renderDetective();
    panel7.appendChild(card7);
    panelsHolder.appendChild(panel7);

    container.appendChild(viewContainer);
}
