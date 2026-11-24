import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';
import { createPromptFlowSection } from '../utils/aiPromptHelper.js';

const WORD_LEARNING_PROMPTS = {
  semantic: `Rolle:
Du er en tålmodig sproglig mentor og quiz-master, der hjælper brugeren med at tilegne sig dansk ordforråd i dybden. Du anvender trinvise, letforståelige opgaver, fokuserer på meningsfuld sammenhæng og tilbyder tværsproglig støtte undervejs.

Fase 1: Konfiguration (Sprogvalg)
Når brugeren skriver "hej" eller starter samtalen, skal du altid indlede med at spørge: "Hvilket sprog ønsker du at bruge som støttesprog? (f.eks. engelsk, italiensk eller arabisk)". Gem dette sprog som [Støttesprog].

Fase 2: Input og Præsentation i Kontekst
Instruks på [Støttesprog]: Bed brugeren om at indtaste et dansk ord, de gerne vil undersøge og træne.
Når brugeren indtaster det danske ord (f.eks. "Hundedyrt" eller "Sygdom"), præsenterer du straks følgende struktur:

Metadata: Angiv ordklasse og evt. køn (en/et) på dansk og [Støttesprog].

Kollokationer (Chunks): Angiv de 2-3 mest almindelige ord, mål-ordet typisk optræder sammen med (f.eks. hvis ordet er "beslutning", viser du "at træffe en beslutning").

Eksempler: Skriv to eksempelsætninger på dansk, der viser ordet og dets kollokationer i naturlig brug.

Oversættelse: Oversæt begge eksempelsætninger til [Støttesprog].

Fase 3: Trinvis Quiz (Én opgave ad gangen!)
Du skal nu teste brugerens forståelse af ordet gennem 4 spørgsmål. VIGTIGT: Du må KUN stille ét spørgsmål ad gangen. Du skal vente på brugerens svar, før du præsenterer det næste spørgsmål. Alle svarmuligheder (A, B, C) skal være på dansk OG på [Støttesprog] samt passe til niveau A2 (hyppigt anvendte ord). Spørgsmålets overskrift skal stå på både dansk og [Støttesprog].

Spørgsmål 1: "Hvilken gruppe tilhører ordet? / [Oversættelse til Støttesprog]" (Giv 3 A/B/C muligheder)

Spørgsmål 2: "Hvad er et eksempel på dette? / [Oversættelse til Støttesprog]" (Giv 3 A/B/C muligheder)

Spørgsmål 3: "Hvilket ord betyder næsten det samme? / [Oversættelse til Støttesprog]" (Giv 3 A/B/C muligheder)

Spørgsmål 4: "Hvad er det modsatte? / [Oversættelse til Støttesprog]" (Giv 3 A/B/C muligheder)

Fase 4: Feedback-protokol (Efter hvert svar)
AL FEEDBACK SKAL VÆRE PÅ BRUGERENS [Støttesprog]!

Ved korrekt svar: Bekræft kort succesen på [Støttesprog]. Præsenter derefter straks det næste spørgsmål i rækken.

Ved forkert svar:

Identificér fejlen blidt på [Støttesprog].

Forklar nuancen mellem det forkerte ord, de valgte, og det korrekte svar. Brug logiske forklaringer i stedet for svær sproglig terminologi.

Kontekst: Skriv en ny eksempelsætning på dansk, der viser, hvordan det korrekte svar anvendes.

Præsenter derefter det næste spørgsmål i rækken.

Fase 5: Visuelt netværk
Når brugeren har besvaret det fjerde spørgsmål og modtaget sin feedback, skal du automatisk samle alle de korrekte begreber i et visuelt tekst-træ, så brugeren ser ordets relationer. Præsenter det således:

Ordets netværk:
[Det danske mål-ord]
├── Gruppe: [Korrekt svar fra Spørgsmål 1]
├── Eksempel: [Korrekt svar fra Spørgsmål 2]
├── Synonym: [Korrekt svar fra Spørgsmål 3]
└── Modsætning: [Korrekt svar fra Spørgsmål 4]

Fase 6: Aktiv brug og personlig relation
Når det visuelle netværk er præsenteret, skal du bede brugeren om at anvende ordet aktivt.
Instruks på [Støttesprog]: Formuler det cirka således: "Nu er det din tur! Skriv en kort sætning med [Ordet], der handler om dit eget liv, ELLER svar på dette spørgsmål: [Find på et simpelt, personligt spørgsmål på dansk, der indeholder mål-ordet og evt. en kollokation]".
Vent på brugerens sætning.

Hvis sætningen indeholder fejl (fx ordstilling, manglende V2-inversion eller bøjning), retter du dem opmuntrende og blidt på [Støttesprog].

Ros altid indsatsen.

Afslut ved at spørge på [Støttesprog], om brugeren er klar til at undersøge og træne et helt nyt dansk ord.`,

  naboord: `Rolle: Du er en pædagogisk sproglig mentor og "kontekst-detektiv". Din opgave er at hjælpe brugeren med at lære danske kollokationer (hvilke ord der naturligt optræder sammen) gennem trinvise "udfyld-det-tomme-felt"-opgaver (cloze-tests). Du støtter altid brugeren på deres foretrukne sprog.

Fase 1: Konfiguration (Sprogvalg)
Når brugeren skriver "hej", skal du altid starte med at spørge: "Hvilket sprog ønsker du at bruge som støttesprog? (f.eks. engelsk, italiensk eller arabisk)". Gem dette sprog som [Støttesprog].

Fase 2: Input og Præsentation
Instruks på [Støttesprog]: Bed brugeren om at indtaste et dansk ord, de gerne vil undersøge (f.eks. "beslutning", "ansvar" eller "kaffe"). Når brugeren indtaster ordet, præsenterer du en kort, opmuntrende bekræftelse på [Støttesprog] og forklarer, at I nu skal se på, hvilke ord der "bor sammen med" dette ord på dansk.

Fase 3: Trinvis Cloze-test (Én sætning ad gangen!)
Du skal nu teste brugerens fornemmelse for kontekst gennem 3 separate spørgsmål. VIGTIGT: Du må KUN stille ét spørgsmål ad gangen. Du skal vente på brugerens svar, før du præsenterer det næste spørgsmål. Hvert spørgsmål skal bestå af en kort dansk sætning (A2-niveau), hvor det naturlige verbum eller adjektiv mangler (markeret med "_______"). Giv altid 3 svarmuligheder (A, B, C) på dansk. Overskriften/instruktionen skal stå på både dansk og [Støttesprog].

Spørgsmål 1 (Verbum-kollokation): "Vælg det rigtige ord til at udfylde feltet: / [Oversættelse til Støttesprog]" (Eksempel hvis ordet er 'beslutning': "Vi skal _______ en beslutning i dag. A) tage, B) skrive, C) holde")
Spørgsmål 2 (Adjektiv-kollokation): "Vælg det rigtige ord til at udfylde feltet: / [Oversættelse til Støttesprog]" (Eksempel hvis ordet er 'beslutning': "Det var en meget _______ beslutning. A) tung, B) svær, C) hård")
Spørgsmål 3 (Hverdagskontekst): "Vælg det rigtige ord til at udfylde feltet: / [Oversættelse til Støttesprog]" (Sæt ordet ind i en ny, hyppig hverdagssætning med 3 nye A/B/C muligheder).

Fase 4: Feedback-protokol (Efter hvert svar)
AL FEEDBACK SKAL VÆRE PÅ BRUGERENS [Støttesprog]!

Ved korrekt svar: 1. Bekræft succesen på [Støttesprog]. 2. Ros brugeren og forklar kort på [Støttesprog], hvorfor netop denne kombination lyder naturlig på dansk. 3. Præsenter derefter straks det næste spørgsmål i rækken.
Ved forkert svar: 1. Identificér fejlen blidt på [Støttesprog]. 2. Forklar på [Støttesprog], hvorfor det valgte ord måske giver mening på deres modersmål, men at man på dansk anvender en anden konstruktion (f.eks. "På engelsk siger man 'make a decision', men på dansk hedder det 'at tage en beslutning'"). 3. Kontekst: Skriv den fulde, korrekte danske sætning, så de ser det rigtige svar i sin helhed. 4. Præsenter derefter det næste spørgsmål i rækken.
Når alle 3 spørgsmål er besvaret, afslutter du med at rose indsatsen og spørger på [Støttesprog], om brugeren vil undersøge et nyt dansk ord.`,

  ordfamilier: `Rolle: Du er en motiverende og pædagogisk sproglig guide og "Kategori-detektiv". Din opgave er at hjælpe en A2-kursist med at udbygge sit danske ordforråd ved at styrke de mentale forbindelser mellem ord gennem semantisk association (kategorisering). Du opstiller en række "Hvilket ord skal ud?"-opgaver (Odd One Out), der er umiddelbare og lette at gå til.

Kritiske Regler:
Ingen Morfologi: Du må ikke bede kursisten om at aflede navneord fra udsagnsord (f.eks. at rejse -> en rejse). Dette fokus flytter opmærksomheden væk fra det centrale ordforråd.
A2 Niveau: Alle danske ord og eksempler skal være almindeligt anvendte ord, der passer til B1-niveau.
Tværsproglig Støtte: Du skal altid bruge kursistens valgte [Støttesprog] til instruktioner og forklaringer, men præsentere de danske ord klart.

Fase 1: Konfiguration (Sprogvalg)
Når brugeren skriver "hej" (eller en lignende indledende hilsen), skal du altid starte med at spørge: "Hvilket sprog ønsker du at bruge som støttesprog? (f.eks. engelsk, italiensk eller arabisk) / What language would you like to use for support? (e.g., English, Italian, or Arabic)". Gem dette sprog som [Støttesprog].

Fase 2: Input og Præsentation
Når støttesproget er valgt, forklarer du kort på [Støttesprog], at I nu skal spille "Kategori-match". Din rolle er at præsentere en kategori og tre ord, og kursisten skal finde det ord, der ikke passer ind.

Fase 3: Trinvis Quiz (Én opgave ad gangen!)
Du skal nu teste kursistens ordfamilie-forståelse gennem 3 separate opgaver. VIGTIGT: Du må KUN stille ét spørgsmål ad gangen. Du skal vente på kursistens svar, før du præsenterer det næste spørgsmål. Spørgsmålet præsenterer en kategori og 4 valgmuligheder (A, B, C, D) på dansk. Overskriften/instruktionen skal stå på både dansk og [Støttesprog].

Eksempel Struktur (Spørgsmål 1): "Hvilket ord hører IKKE til i denne ordfamilie? / [Oversættelse til Støttesprog]" "Kategori: I køkkenet / [Oversættelse]" A) En pande B) En pude C) En tallerken D) En gaffel

Fase 4: Feedback-protokol (Efter hvert svar)
AL FEEDBACK SKAL VÆRE PÅ BRUGERENS [Støttesprog]!

Ved korrekt svar: 1. Bekræft succesfuldt på [Støttesprog]. 2. Forklar kort på [Støttesprog], hvorfor det valgte ord ikke passer (f.eks. "Helt rigtigt! 'Pude' bruges i soveværelset, ikke i køkkenet."). 3. Præsenter derefter straks det næste spørgsmål i rækken.
Ved forkert svar: 1. Identificér fejlen blidt på [Støttesprog]. 2. Forklar forbindelsen mellem de to ord, der faktisk passer ind i kategorien, og hvorfor det tredje ord er anderledes. 3. Kontekst: Præsenter en ny, helt kort dansk sætning, der tydeligt viser det korrekte ord (det der skulle ud) i sin rette sammenhæng. 4. Præsenter derefter det næste spørgsmål i rækken.
Når alle 3 opgaver er løst, afslutter du med en opmuntrende bekræftelse på [Støttesprog] og spørger, om kursisten vil undersøge en ny ordfamilie (kategori).`,

  historier: `Rolle: Du er en ekspert i sprogundervisning, specifikt trænet i TPRS-metoden (Teaching Proficiency through Reading and Storytelling) med fokus på voksne indlærere. Din opgave er at fungere som en interaktiv TPRS-indholdsgenerator.

Kontekst & Regler: Jeg vil starte med at give dig tre inputs:
Målord (Input ord)
Overordnet plot / Situation
Sværhedsgrad (f.eks. A1, A2, B1)
Når jeg skriver: "Klar", skal du skrive ordene Målord:, Overordnet plot: og Sværhedsgrad: i punktform, så jeg blot kan kopiere og indføre data. Altså sådan:

Målord:
Overordnet plot:
Sværhedsgrad:

VIGTIG REGEL OM PLOTTET: Når jeg beskriver det overordnede plot for dig, fungerer det udelukkende som en hemmelig drejebog for historiens retning. Du må under ingen omstændigheder afsløre, opsummere eller lade historien springe frem til slutningen i dine første svar. Start altid i de helt små detaljer i begyndelsen af plottet, og lad handlingen udvikle sig langsomt.
Dit sprog skal altid holdes strengt på den angivne sværhedsgrad. Da målgruppen er voksne, skal sproget holdes simpelt, men situationerne og tonen skal være realistiske og relaterbare for voksne. Du må gerne bruge subtil humor, ironi eller små, overraskende hverdags-drejninger, men undgå absolut barnlige, tegnefilmsagtige eller overdrevet absurde elementer (som f.eks. talende dyr eller folk, der spiser busbilletter), medmindre jeg specifikt beder om det.

Særlige Kommandoer:
- "tegn [denne situation]": Hvis jeg skriver dette, skal du øjeblikkeligt skifte persona til "nano-banana" og generere et billede af den specifikke situation for at understøtte historien visuelt. Derefter skifter du tilbage og afventer mit næste træk.
- "oversæt: [tekst]": Første gang jeg beder dig om en oversættelse, vil jeg angive målsprogene (f.eks. "oversæt til spansk og dansk: [tekst]"). Du skal gemme disse sprog i din interne hukommelse. Næste gang jeg blot skriver kommandoen "oversæt: [tekst]", skal du huske mine tidligere valgte sprog og automatisk oversætte teksten til dem. Giv mig oversættelserne og afvent derefter mit næste træk. Når du leverer en oversættelse, fungerer det udelukkende som en midlertidig pause i fortællingen. Du må under ingen omstændigheder nulstille sessionen, afbryde det igangværende forløb eller bede om et nyt plot. Levér oversættelsen og gentag derefter præcis det åbne spørgsmål fra Trin 3, så vi kan fortsætte.
- "Fortsæt": Hver gang jeg skriver "Fortsæt", skal du med det samme hoppe videre til næste trin.

Dit Workflow: Hver gang jeg giver dig de 3 inputs (eller besvarer et af dine spørgsmål for at drive en igangværende historie videre), skal du udføre følgende trin. VIGTIGT: Du må kun udføre ét trin ad gangen (bortset fra Trin 1 og 2 og 3). Stop altid dit svar og afvent min reaktion efter hvert enkelt trin (Trin 3, Trin 4 osv.), før du går videre til det næste. Du må aldrig præsentere flere trin i samme besked.

Trin 1: Scenariet (Håndterbare bidder)
Skriv et kort, engagerende scenarie på præcis 2 sætninger, som inkorporerer målordene og passer til sværhedsgraden. Vigtigt: Disse to sætninger må udelukkende etablere nuet. Du må ikke afsløre klimakset eller løsningen på det overordnede plot her.

Trin 2: Cirkelspørgsmål (Automatisering)
Opstil en struktureret runde af "circling questions" til de 2 sætninger, så sproget automatiseres. Brug præcis denne struktur, og angiv typen for hvert spørgsmål:
- Bekræftelse (Ja): [Stil et spørgsmål til teksten, hvor svaret er ja, for at etablere grundlæggende forståelse]
- Enten/Eller: [Stil et spørgsmål med to valgmuligheder, der tvinger hjernen til at skelne mellem ord]
- Benægtelse (Nej): [Stil et spørgsmål om noget bevidst forkert for at forstærke det korrekte ord gennem kontrast]
- Hv-spørgsmål: [Stil et "Hvad/Hvem/Hvor"-spørgsmål, der opfordrer til begrænset produktion hos eleven]
- Hvem/Hvor/Hvorfor: [Stil et uddybende spørgsmål for at udvide konteksten og interessen]

Trin 3: Historieudvikling (Medskabelse og Åbne spørgsmål)
Du må ikke styre handlingen for stramt eller give mig foruddefinerede valgmuligheder. For at vi kan "co-create" (medskabe) historien, skal du i stedet stille mig 1-2 åbne spørgsmål om, hvad der sker næstefter, eller bede mig om at tilføje en detalje. (F.eks. "Hvad siger kvinden til ham?", "Hvordan reagerer han på forsinkelsen?", eller "Hvad er hans egentlige motiv?"). Lad mig bruge min egen fantasi til at drive plottet fremad.
OG
Trin 3A: COLA Output & Perspektivskifte (Krav om produktion i klassen)
I TPRS 2.0 gælder reglen: "Hvis eleven ikke kan sige det, ved eleven det ikke." Du skal nu levere et oplæg til mig (læreren), som jeg kan bruge til at fremtvinge sprogproduktion hos mine kursister. Giv mig et forslag til en af følgende to opgaver, jeg kan stille klassen: A) Et forslag til, hvordan jeg beder en kursist om at genfortælle de 2 sætninger i 1. eller 2. person (f.eks. "Bed en kursist om at spille manden og spørg: 'Hvad sagde du lige til kvinden?'"). B) Et åbent spørgsmål til historiens dialog, som jeg kan stille klassen, og hvor de selv skal opfinde et svar i "jeg"-form på målsproget.

Trin 4: Stop og vent
Stop dit output her. Vent på, at jeg besvarer dit åbne spørgsmål, giver mit eget svar, eller bruger en af de "Særlige Kommandoer" ("tegn", "oversæt" eller "Fortsæt"). Når jeg har svaret, bygger du videre på mit svar med 2 nye sætninger og fortsætter processen.

Har du forstået opgaven? Hvis ja, så svar kort "Jeg er klar! Giv mig dine input ord, et overordnet plot og en sværhedsgrad."`
};

/**
 * WordLearningView with a selection state.
 */
export function renderWordLearningView(container, navigateFn) {
  let currentState = 'selection'; // 'selection', 'exercise_semantic', or 'exercise_naboord'

  function render() {
    container.innerHTML = '';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container word-learning-container';

    // Top bar with Back Button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => {
      if (currentState.startsWith('exercise')) {
        currentState = 'selection';
        render();
      } else {
        navigateFn('main');
      }
    };
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Common Styles
    const style = document.createElement('style');
    style.textContent = `
      .word-learning-container h1 { margin-bottom: 1.5rem; text-align: center; }
      
      /* Byggeplads Card */
      .byggeplads-card {
        background: rgba(15, 23, 42, 0.75);
        border: 1.5px solid rgba(255, 255, 255, 0.15);
        border-radius: 20px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        backdrop-filter: blur(12px);
      }
      .byggeplads-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.2rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .byggeplads-title {
        font-size: 1.3rem;
        font-weight: 800;
        color: #f8fafc;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .byggeplads-subtitle {
        font-size: 0.85rem;
        color: #94a3b8;
        margin-top: 0.2rem;
      }
      /* Vrimlebillede Stage & Hotspots */
      .byggeplads-stage {
        position: relative;
        width: 100%;
        line-height: 0;
        border-radius: 16px;
        overflow: hidden;
        margin-bottom: 1.2rem;
        border: 1.5px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      }
      .byggeplads-img {
        width: 100%;
        height: auto;
        display: block;
        filter: brightness(0.98);
        transition: filter 0.3s ease;
      }
      .hotspot-pin {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid #ffffff;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.6);
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 10;
        animation: pulsePin 2.5s infinite;
      }
      @keyframes pulsePin {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.08); }
      }
      .hotspot-pin.pin-adj { background: #f97316; }
      .hotspot-pin.pin-sub { background: #22c55e; }
      .hotspot-pin.pin-vrb { background: #ef4444; }
      .hotspot-pin.pin-adv { background: #38bdf8; }
      .hotspot-pin.pin-konj { background: #a855f7; }
      .hotspot-pin:hover, .hotspot-pin.active {
        transform: translate(-50%, -50%) scale(1.15) !important;
        z-index: 30;
        box-shadow: 0 0 14px #ffffff, 0 0 8px currentColor;
        border-color: #ffffff;
      }
      .hotspot-pin .pin-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #ffffff;
        display: block;
        pointer-events: none;
      }
      .hotspot-pill {
        position: absolute;
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(15, 23, 42, 0.94);
        backdrop-filter: blur(8px);
        color: #ffffff;
        border: 1px solid rgba(255,255,255,0.25);
        padding: 0.12rem 0.42rem;
        border-radius: 8px;
        font-size: 0.64rem;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 0.2rem;
        opacity: 0.95;
        transition: all 0.2s ease;
      }
      .hotspot-pin:hover .hotspot-pill, .hotspot-pin.active .hotspot-pill {
        opacity: 1;
        border-color: #ffffff;
        box-shadow: 0 3px 10px rgba(0,0,0,0.6);
      }
      .hotspot-pin.pin-adj.active .hotspot-pill {
        color: #fb923c;
        border-color: #f97316;
        box-shadow: 0 0 10px rgba(249, 115, 22, 0.6);
      }
      .hotspot-pin.pin-sub.active .hotspot-pill {
        color: #4ade80;
        border-color: #22c55e;
        box-shadow: 0 0 10px rgba(34, 197, 94, 0.6);
      }
      .hotspot-pin.pin-vrb.active .hotspot-pill {
        color: #f87171;
        border-color: #ef4444;
        box-shadow: 0 0 10px rgba(239, 68, 68, 0.6);
      }
      .hotspot-pin.pin-adv.active .hotspot-pill {
        color: #38bdf8;
        border-color: #38bdf8;
        box-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
      }
      .hotspot-pin.pin-konj.active .hotspot-pill {
        color: #c084fc;
        border-color: #a855f7;
        box-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
      }
      @media (max-width: 600px) {
        .hotspot-pin { width: 18px; height: 18px; border-width: 1.5px; }
        .hotspot-pin .pin-dot { width: 4px; height: 4px; }
        .hotspot-pill { font-size: 0.56rem; padding: 0.08rem 0.3rem; }
      }

      .sentence-flow-box {
        position: relative;
        background: rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.2rem 1rem 1rem;
      }
      .chips-row {
        position: relative;
        z-index: 2;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 1.2rem;
      }
      .flow-chip {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.6rem 1.1rem;
        border-radius: 12px;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.25s ease;
        user-select: none;
        border: 2px solid rgba(255, 255, 255, 0.2);
        background: rgba(15, 23, 42, 0.85);
        color: #ffffff;
      }
      .flow-chip span {
        color: inherit;
      }
      .flow-chip:hover {
        transform: translateY(-2px) scale(1.03);
        border-color: rgba(255, 255, 255, 0.5);
        color: #ffffff;
      }
      .flow-chip.active-adj {
        border-color: #f97316;
        color: #fb923c;
        background: rgba(249, 115, 22, 0.18);
        box-shadow: 0 0 16px rgba(249, 115, 22, 0.5);
      }
      .flow-chip.active-sub {
        border-color: #22c55e;
        color: #4ade80;
        background: rgba(34, 197, 94, 0.18);
        box-shadow: 0 0 16px rgba(34, 197, 94, 0.5);
      }
      .flow-chip.active-vrb {
        border-color: #ef4444;
        color: #f87171;
        background: rgba(239, 68, 68, 0.18);
        box-shadow: 0 0 16px rgba(239, 68, 68, 0.5);
      }
      .flow-chip.active-adv {
        border-color: #38bdf8;
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.18);
        box-shadow: 0 0 16px rgba(56, 189, 248, 0.5);
      }
      .flow-chip.active-konj {
        border-color: #a855f7;
        color: #c084fc;
        background: rgba(168, 85, 247, 0.18);
        box-shadow: 0 0 16px rgba(168, 85, 247, 0.5);
      }
      .flow-explanation {
        position: relative;
        z-index: 2;
        background: rgba(30, 41, 59, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 0.8rem 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .explanation-content {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        flex-wrap: wrap;
      }
      .explanation-badge {
        font-size: 0.75rem;
        font-weight: 800;
        color: white;
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        white-space: nowrap;
      }
      .explanation-text {
        font-size: 0.9rem;
        color: #f1f5f9;
        line-height: 1.4;
      }
      .explanation-cta-btn {
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 0.35rem 0.85rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }
      .explanation-cta-btn:hover {
        background: white;
        color: #0f172a;
        transform: translateX(2px);
      }
      
      /* Primary Modules Grid */
      .primary-modules-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.2rem;
        margin-bottom: 2.5rem;
      }
      .module-card {
        background: rgba(30, 41, 59, 0.7);
        border-radius: 18px;
        padding: 1.4rem;
        border-width: 2px;
        border-style: solid;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
      }
      .module-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.35);
      }
      .module-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.9rem;
      }
      .module-icon {
        font-size: 2.3rem;
      }
      .module-role-pill {
        display: flex;
        flex-direction: column;
      }
      .role-badge {
        font-size: 0.72rem;
        font-weight: 800;
        padding: 0.2rem 0.65rem;
        border-radius: 20px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        white-space: nowrap;
        width: fit-content;
      }
      .role-hint {
        font-size: 0.68rem;
        color: #94a3b8;
        font-weight: 600;
        margin-top: 0.15rem;
        padding-left: 0.2rem;
      }
      .progress-circle-wrap {
        position: relative;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .progress-circle {
        width: 42px;
        height: 42px;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }
      .progress-circle-bg {
        stroke: rgba(255, 255, 255, 0.12);
      }
      .progress-circle-fill {
        transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .progress-circle-text {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.72rem;
        font-weight: 800;
        color: #f8fafc;
      }
      .progress-circle-text.complete {
        color: #eab308;
        font-size: 0.95rem;
        filter: drop-shadow(0 0 6px rgba(234, 179, 8, 0.6));
      }
      .module-title {
        font-size: 1.22rem;
        font-weight: 800;
        color: white;
        margin-bottom: 0.3rem;
      }
      .module-subtext {
        font-size: 0.78rem;
        color: #94a3b8;
        margin-bottom: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
      }
      .module-desc {
        font-size: 0.88rem;
        color: #cbd5e1;
        line-height: 1.45;
        margin-bottom: 0;
      }

      /* Secondary Collapsible Section */
      .secondary-section-toggle {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 0.9rem 1.4rem;
        color: #cbd5e1;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        transition: all 0.2s ease;
      }
      .secondary-section-toggle:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }
      .secondary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }
      .secondary-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 1.2rem;
        cursor: pointer;
        transition: all 0.25s ease;
        text-align: center;
      }
      .secondary-card:hover {
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-3px);
      }
      .secondary-icon { font-size: 2rem; margin-bottom: 0.4rem; }
      .secondary-title { font-size: 1rem; font-weight: 700; color: white; margin-bottom: 0.2rem; }
      .secondary-desc { font-size: 0.8rem; color: #94a3b8; }

      @media (max-width: 650px) {
        .chips-row { gap: 0.5rem; }
        .flow-chip { font-size: 0.85rem; padding: 0.5rem 0.8rem; }
        .primary-modules-grid { grid-template-columns: 1fr; }
      }

      .semantic-network {
        position: relative;
        width: 100%;
        max-width: 600px;
        height: 400px;
        margin: 2rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .network-lines { position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 0; }
      .node {
        position: absolute;
        background: var(--card-bg);
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        border: 2px solid rgba(255,255,255,0.1);
        z-index: 1;
        text-align: center;
        width: 130px;
        height: 140px;
        padding: 0.8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }
      .node img { width: 70px; height: 50px; object-fit: contain; margin-bottom: 8px; }
      .node.center { background: rgba(255, 255, 255, 0.1); border: 3px solid white; width: 160px; height: 170px; z-index: 2; }
      .node.center img { width: 100px; height: 70px; }
      .node.top { top: -10%; left: 50%; transform: translateX(-50%); }
      .node.bottom { bottom: -10%; left: 50%; transform: translateX(-50%); }
      .node.left { left: -10%; top: 50%; transform: translateY(-50%); }
      .node.right { right: -10%; top: 50%; transform: translateY(-50%); }
      .node .word { font-weight: 700; color: white; }
      .node .hint { font-size: 0.75rem; opacity: 0.8; color: var(--text-muted); text-transform: uppercase; }

      .word-explanation { margin: 3rem auto 2rem; max-width: 650px; line-height: 1.7; text-align: center; font-size: 1.1rem; }
      .consent-container { margin: 2rem 0; text-align: center; }
      .gemini-btn-container { text-align: center; margin-top: 1rem; }
      .gemini-btn {
        display: inline-block;
        padding: 1rem 2.5rem;
        background: var(--primary-color);
        color: white;
        text-decoration: none;
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      .gemini-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
      .gemini-btn.disabled { opacity: 0.5; pointer-events: none; filter: grayscale(1); }

      @media (max-width: 700px) {
        .semantic-network { height: auto; flex-direction: column; gap: 1.5rem; }
        .network-lines { display: none; }
        .node { position: static; width: 100%; max-width: 320px; height: auto; transform: none !important; }
      }
    `;
    viewContainer.appendChild(style);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('laerNyeOrd');
    viewContainer.appendChild(title);

    if (currentState === 'selection') {
      renderSelection(viewContainer);
    } else if (currentState === 'exercise_semantic') {
      renderSemanticExercise(viewContainer);
    } else if (currentState === 'exercise_naboord') {
      renderNaboordExercise(viewContainer);
    } else if (currentState === 'exercise_ordfamilier') {
      renderOrdfamilierExercise(viewContainer);
    } else if (currentState === 'exercise_historier') {
      renderHistorierExercise(viewContainer);
    }

    container.appendChild(viewContainer);
  }

  function renderSelection(parent) {
    // --- 1. SPROGETS BYGGEPLADS (INTERAKTIVT SÆTNINGSFLOW) ---
    const byggepladsCard = document.createElement('div');
    byggepladsCard.className = 'byggeplads-card';

    const flowData = {
      adjektiv: {
        badge: "🟠 Adjektiv",
        color: "#f97316",
        chipClass: "active-adj",
        text: "Beskriver <strong>substantivet</strong>: Hvilken bil? Den <em>røde</em> bil.",
        target: "top100_adjektiver",
        targetTitle: "Gå til Adjektiver ➔"
      },
      substantiv: {
        badge: "🟢 Substantiv",
        color: "#22c55e",
        chipClass: "active-sub",
        text: "Kernen i scenen: Hvem eller hvad taler vi om? En <em>bil</em>, en <em>mand</em>, et <em>hus</em>.",
        target: "top100_substantiver",
        targetTitle: "Gå til Substantiver ➔"
      },
      verbum: {
        badge: "🔴 Verbum",
        color: "#ef4444",
        chipClass: "active-vrb",
        text: "Motoren i sætningen: Hvad gør bilen? Den <em>kører</em>.",
        target: "top100_verber",
        targetTitle: "Gå til Verber ➔"
      },
      adverbium: {
        badge: "🔵 Adverbium",
        color: "#38bdf8",
        chipClass: "active-adv",
        text: "Knytter sig til <strong>verbet</strong>: Hvordan kører den? Den kører <em>hurtigt</em> (eller <em>i dag</em>, <em>ikke</em>).",
        target: "top100_adverbier",
        targetTitle: "Gå til Adverbier ➔"
      },
      konjunktion: {
        badge: "🟣 Konjunktion",
        color: "#a855f7",
        chipClass: "active-konj",
        text: "Broen, der samler to billeder eller rammesætter indhold: <em>...fordi solen skinner</em> eller <em>Jeg tror, at...</em>",
        target: "top_konjunktioner",
        targetTitle: "Gå til Konjunktioner ➔"
      }
    };

    byggepladsCard.innerHTML = `
      <div class="byggeplads-header">
        <div>
          <div class="byggeplads-title">
            <span>✨</span>
            <span>Sprogets byggeplads</span>
          </div>
          <div class="byggeplads-subtitle">Tryk på en ordklasse eller et pegefelt for at se, hvordan ordene hænger sammen</div>
        </div>
      </div>

      <!-- Vrimlebillede med 5 spredte interaktive pegefelter -->
      <div class="byggeplads-stage" id="byggeplads-stage">
        <img src="assets/byggeplads_vrimmel.jpg" alt="Sprogets Byggeplads Vrimlebillede" class="byggeplads-img" />
        
        <!-- 1. 🟠 den røde (Adjektiv - på bilens røde kølerhjelm) -->
        <button type="button" class="hotspot-pin pin-adj active" data-type="adjektiv" style="left: 36%; top: 68%;" title="🟠 den røde (Adjektiv)">
          <span class="pin-dot"></span>
          <div class="hotspot-pill">den røde</div>
        </button>

        <!-- 2. 🟢 bil (Substantiv - på bilens tag/kabine) -->
        <button type="button" class="hotspot-pin pin-sub" data-type="substantiv" style="left: 47%; top: 45%;" title="🟢 bil (Substantiv)">
          <span class="pin-dot"></span>
          <div class="hotspot-pill">bil</div>
        </button>

        <!-- 3. 🔴 kører (Verbum - på føreren og de rullende hjul) -->
        <button type="button" class="hotspot-pin pin-vrb" data-type="verbum" style="left: 60%; top: 66%;" title="🔴 kører (Verbum)">
          <span class="pin-dot"></span>
          <div class="hotspot-pill">kører</div>
        </button>

        <!-- 4. 🔵 hurtigt (Adverbium - i fartstriberne og hvirvlerne til venstre) -->
        <button type="button" class="hotspot-pin pin-adv" data-type="adverbium" style="left: 17%; top: 86%;" title="🔵 hurtigt (Adverbium)">
          <span class="pin-dot"></span>
          <div class="hotspot-pill">hurtigt</div>
        </button>

        <!-- 5. 🟣 fordi... (Konjunktion - på broen og målet til højre) -->
        <button type="button" class="hotspot-pin pin-konj" data-type="konjunktion" style="left: 87%; top: 48%;" title="🟣 fordi... (Konjunktion)">
          <span class="pin-dot"></span>
          <div class="hotspot-pill">fordi...</div>
        </button>
      </div>

      <div class="sentence-flow-box">
        <div class="chips-row">
          <button type="button" class="flow-chip active-adj" data-type="adjektiv" id="chip-adj">
            <span>🟠</span>
            <span>den røde</span>
          </button>
          <button type="button" class="flow-chip" data-type="substantiv" id="chip-sub">
            <span>🟢</span>
            <span>bil</span>
          </button>
          <button type="button" class="flow-chip" data-type="verbum" id="chip-vrb">
            <span>🔴</span>
            <span>kører</span>
          </button>
          <button type="button" class="flow-chip" data-type="adverbium" id="chip-adv">
            <span>🔵</span>
            <span>hurtigt</span>
          </button>
          <button type="button" class="flow-chip" data-type="konjunktion" id="chip-konj">
            <span>🟣</span>
            <span>fordi...</span>
          </button>
        </div>

        <div class="flow-explanation" id="flow-explanation">
          <div class="explanation-content">
            <span class="explanation-badge" id="flow-badge" style="background: #f97316;">🟠 Adjektiv</span>
            <span class="explanation-text" id="flow-text">Beskriver <strong>substantivet</strong>: Hvilken bil? Den <em>røde</em> bil.</span>
          </div>
          <button type="button" class="explanation-cta-btn" id="flow-cta">Gå til Adjektiver ➔</button>
        </div>
      </div>
    `;

    // Chip & Hotspot interactions
    let currentFlowTarget = 'top100_adjektiver';
    const chips = byggepladsCard.querySelectorAll('.flow-chip');
    const pins = byggepladsCard.querySelectorAll('.hotspot-pin');
    const badgeEl = byggepladsCard.querySelector('#flow-badge');
    const textEl = byggepladsCard.querySelector('#flow-text');
    const ctaBtn = byggepladsCard.querySelector('#flow-cta');

    function activateWordClass(type) {
      const item = flowData[type];
      if (!item) return;

      // Update pins
      pins.forEach(p => {
        p.classList.remove('active');
        if (p.getAttribute('data-type') === type) {
          p.classList.add('active');
        }
      });

      // Update chips
      chips.forEach(c => {
        c.className = 'flow-chip';
        if (c.getAttribute('data-type') === type) {
          c.classList.add(item.chipClass);
        }
      });

      badgeEl.textContent = item.badge;
      badgeEl.style.background = item.color;
      textEl.innerHTML = item.text;
      ctaBtn.textContent = item.targetTitle;
      currentFlowTarget = item.target;

      // Highlight matching module card below
      const matchingCard = document.getElementById(`module-card-${type}`);
      if (matchingCard) {
        matchingCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        matchingCard.style.transform = 'translateY(-8px) scale(1.02)';
        setTimeout(() => {
          matchingCard.style.transform = '';
        }, 600);
      }
    }

    chips.forEach(chip => {
      chip.onclick = () => activateWordClass(chip.getAttribute('data-type'));
    });

    pins.forEach(pin => {
      pin.onclick = (e) => {
        e.stopPropagation();
        activateWordClass(pin.getAttribute('data-type'));
      };
    });

    ctaBtn.onclick = () => {
      navigateFn(currentFlowTarget);
    };

    parent.appendChild(byggepladsCard);

    // --- 2. DE 5 PRIMÆRE MODULKORT (FUNKTIONELLE BYGGEKLODSER) ---
    function getModuleProgress(key, fallbackPct = 0) {
      try {
        const stored = localStorage.getItem(`lingcog_progress_${key}`);
        if (stored !== null) {
          const val = parseInt(stored, 10);
          if (!isNaN(val)) return Math.min(100, Math.max(0, val));
        }
      } catch (e) {}
      return fallbackPct;
    }

    function createCircleProgressSvg(percent, color) {
      const radius = 16;
      const circumference = 2 * Math.PI * radius; // ~100.53
      const offset = circumference - (percent / 100) * circumference;
      const isComplete = percent >= 100;
      return `
        <div class="progress-circle-wrap" title="${percent}% udforsket">
          <svg class="progress-circle" viewBox="0 0 40 40">
            <circle class="progress-circle-bg" cx="20" cy="20" r="${radius}" stroke-width="3.5" fill="none" />
            <circle class="progress-circle-fill" cx="20" cy="20" r="${radius}" stroke-width="3.5" 
                    stroke="${isComplete ? '#eab308' : color}" 
                    stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" fill="none" />
          </svg>
          <div class="progress-circle-text ${isComplete ? 'complete' : ''}">
            ${isComplete ? '★' : (percent === 0 ? '<span style="opacity:0.4; font-size: 0.65rem;">0%</span>' : percent + '%')}
          </div>
        </div>
      `;
    }

    const primaryModules = [
      {
        id: 'exercise_top100_substantiver',
        key: 'substantiv',
        target: 'top100_substantiver',
        icon: '🚗',
        title: '1. Substantiver',
        subtext: 'Tingene & personerne',
        role: 'Byggeklodserne',
        roleHint: 'Hvem & hvad?',
        desc: 'De 100 mest almindelige navneord fordelt på Byen, Hjemmet, Klassen, Naturen og Stationen.',
        color: '#22c55e',
        badgeBg: 'rgba(34, 197, 94, 0.15)',
        fallbackProgress: 0
      },
      {
        id: 'exercise_top100_adjektiver',
        key: 'adjektiv',
        target: 'top100_adjektiver',
        icon: '🎨',
        title: '2. Adjektiver',
        subtext: 'Farver, former & følelser',
        role: 'Beskrivelsen',
        roleHint: 'Egenskaber',
        desc: 'Beskriver ting og personer (den <em>røde</em> bil). Knytter sig direkte til substantivet.',
        color: '#f97316',
        badgeBg: 'rgba(249, 115, 22, 0.15)',
        fallbackProgress: 0
      },
      {
        id: 'exercise_top100_verber',
        key: 'verbum',
        target: 'top100_verber',
        icon: '🏃',
        title: '3. Verber',
        subtext: 'Handlingerne',
        role: 'Motoren',
        roleHint: 'Hvad sker der?',
        desc: 'De 100 vigtigste hverdagsverber i nutid, datid og førnutid – sætningens drivkraft.',
        color: '#ef4444',
        badgeBg: 'rgba(239, 68, 68, 0.15)',
        fallbackProgress: 0
      },
      {
        id: 'exercise_top100_adverbier',
        key: 'adverbium',
        target: 'top100_adverbier',
        icon: '🧭',
        title: '4. Adverbier',
        subtext: 'Tid, sted, måde & holdning',
        role: 'De vigtige småord',
        roleHint: 'Ikke, gerne, altid...',
        desc: 'Livsnødvendige småord og justeringer der knytter sig til verbet (kører <em>ikke</em>, <em>hurtigt</em>).',
        color: '#38bdf8',
        badgeBg: 'rgba(56, 189, 248, 0.15)',
        fallbackProgress: 0
      },
      {
        id: 'exercise_top_konjunktioner',
        key: 'konjunktion',
        target: 'top_konjunktioner',
        icon: '🌉',
        title: '5. Konjunktioner og "at"',
        subtext: 'Bindeordene',
        role: 'Brobyggerne',
        roleHint: 'Binder sætninger',
        desc: 'Bindeordene (og, men, fordi, da/når, selvom) og et særskilt kognitivt felt om brugen af "at".',
        color: '#a855f7',
        badgeBg: 'rgba(168, 85, 247, 0.15)',
        fallbackProgress: 0
      },
      {
        id: 'mit_hverdagsliv',
        key: 'mit_hverdagsliv',
        target: 'mit_hverdagsliv',
        icon: '🏡',
        title: 'Mit hverdagsliv',
        subtext: 'Arbejde, Fritid & Årstider',
        role: 'Vrimlebilleder',
        roleHint: 'Udforsk scenarier',
        desc: 'Udforsk forskellige emner og scenarier i hverdagen som vrimlebilleder: <strong>Arbejde</strong>, <strong>Fritid</strong> og <strong>Årstider</strong>.',
        color: '#14b8a6',
        badgeBg: 'rgba(20, 184, 166, 0.15)',
        fallbackProgress: 0
      }
    ];

    const primaryGrid = document.createElement('div');
    primaryGrid.className = 'primary-modules-grid';

    primaryModules.forEach(mod => {
      const pct = getModuleProgress(mod.key, mod.fallbackProgress);
      const isComplete = pct >= 100;

      const card = document.createElement('div');
      card.className = 'module-card';
      card.id = `module-card-${mod.key}`;
      card.style.borderColor = isComplete ? '#eab30860' : `${mod.color}45`;
      card.style.background = `linear-gradient(145deg, ${mod.color}15, rgba(15, 23, 42, 0.85))`;

      card.innerHTML = `
        <div>
          <div class="module-top">
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <span class="module-icon">${mod.icon}</span>
              <div class="module-role-pill">
                <span class="role-badge" style="background: ${mod.badgeBg}; color: ${mod.color}; border: 1px solid ${mod.color}50;">
                  ${mod.role}
                </span>
                <span class="role-hint">${mod.roleHint}</span>
              </div>
            </div>
            ${createCircleProgressSvg(pct, mod.color)}
          </div>
          <div class="module-title">${mod.title}</div>
          <div class="module-subtext">${mod.subtext}</div>
          <div class="module-desc">${mod.desc}</div>
        </div>
      `;

      card.onclick = () => {
        navigateFn(mod.target);
      };

      primaryGrid.appendChild(card);
    });

    parent.appendChild(primaryGrid);

    // --- 3. SEKUNDÆRE / SUPPLERENDE ØVELSER (COLLAPSIBLE) ---
    const secondaryToggle = document.createElement('div');
    secondaryToggle.className = 'secondary-section-toggle';
    secondaryToggle.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span>📁</span>
        <span>Flere ordøvelser (semantik, naboord og historier)</span>
      </div>
      <span id="secondary-arrow" style="transition: transform 0.2s;">▾</span>
    `;

    const secondaryGrid = document.createElement('div');
    secondaryGrid.className = 'secondary-grid';
    secondaryGrid.style.display = 'none';

    const legacyTasks = [
      { id: 'exercise_semantic', title: 'laerEtNytOrd', desc: 'laerEtNytOrdDesc', icon: '✨' },
      { id: 'exercise_naboord', title: 'laerNaboord', desc: 'laerNaboordDesc', icon: '👯' },
      { id: 'exercise_ordfamilier', title: 'laerOrdfamilier', desc: 'laerOrdfamilierDesc', icon: '🌳' },
      { id: 'exercise_historier', title: 'laerNyeOrdHistorier', desc: 'laerNyeOrdHistorierDesc', icon: '📖' }
    ];

    legacyTasks.forEach(task => {
      const card = document.createElement('div');
      card.className = 'secondary-card';
      const t = getTranslation(task.title);
      const d = getTranslation(task.desc);

      card.innerHTML = `
        <div class="secondary-icon">${task.icon}</div>
        <div class="secondary-title">${t || task.title}</div>
        <div class="secondary-desc">${d || task.desc}</div>
      `;

      card.onclick = () => {
        currentState = task.id;
        render();
      };

      secondaryGrid.appendChild(card);
    });

    secondaryToggle.onclick = () => {
      const isHidden = secondaryGrid.style.display === 'none';
      secondaryGrid.style.display = isHidden ? 'grid' : 'none';
      secondaryToggle.querySelector('#secondary-arrow').style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
    };

    parent.appendChild(secondaryToggle);
    parent.appendChild(secondaryGrid);

    // --- 4. SUPPORT LINKS ---
    const supportArea = document.createElement('div');
    supportArea.className = 'support-links';
    supportArea.style.display = 'flex';
    supportArea.style.justifyContent = 'center';
    supportArea.style.flexWrap = 'wrap';
    supportArea.style.gap = '1rem';
    supportArea.style.marginTop = '2rem';
    supportArea.style.paddingBottom = '2rem';

    const kofiLink = document.createElement('a');
    kofiLink.href = 'https://ko-fi.com/dansktraening';
    kofiLink.target = '_blank';
    kofiLink.className = 'gemini-btn';
    kofiLink.style.textDecoration = 'none';
    kofiLink.style.backgroundColor = '#ff5e5b';
    kofiLink.textContent = '☕ Buy me a coffee';

    const mpLink = document.createElement('a');
    mpLink.href = 'https://qr.mobilepay.dk/box/0cfe35a7-fccc-4cb9-85e7-b246d3bfa48a/pay-in';
    mpLink.target = '_blank';
    mpLink.className = 'gemini-btn';
    mpLink.style.textDecoration = 'none';
    mpLink.style.backgroundColor = '#5a78ff';
    mpLink.textContent = '📱 Støt med MobilePay';

    supportArea.appendChild(kofiLink);
    supportArea.appendChild(mpLink);
    parent.appendChild(supportArea);
  }

  function renderSemanticExercise(parent) {
    const card = document.createElement('div');
    card.className = 'exercise-card';

    const t = document.createElement('h2');
    t.className = 'exercise-card-title';
    t.textContent = getTranslation('laerEtNytOrd');
    card.appendChild(t);

    const networkContainer = document.createElement('div');
    networkContainer.className = 'semantic-network';
    const nodes = [
      { class: 'node center', label: getTranslation('targetWord'), img: 'car_main.png' },
      { class: 'node top', label: getTranslation('hypernymWord'), hint: getTranslation('hypernym'), img: 'vehicle_group.png' },
      { class: 'node bottom', label: getTranslation('hyponymWord'), hint: getTranslation('hyponym'), img: 'electric_car.png' },
      { class: 'node left', label: getTranslation('synonymWord'), hint: getTranslation('synonym'), img: 'sedan_car.png' },
      { class: 'node right', label: getTranslation('antonymWord'), hint: getTranslation('antonym'), img: 'bicycle.png' }
    ];

    nodes.forEach(n => {
      const el = document.createElement('div');
      el.className = n.class;
      el.innerHTML = `<img src="${baseUrl}${n.img}" alt="${n.label}"><div class="word">${n.label}</div><span style="font-size: 0.68rem; font-weight: 700; color: #4ade80; background: rgba(34, 197, 94, 0.2); border: 1px solid #22c55e; border-radius: 4px; padding: 1px 6px; margin-top: 4px;">${getTranslation('top100_legend_substantiv')}</span>`;
      if (n.hint) el.innerHTML += `<div class="hint">${n.hint}</div>`;
      networkContainer.appendChild(el);
    });

    networkContainer.insertAdjacentHTML('afterbegin', `
      <svg class="network-lines"><line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="50%" y1="50%" x2="15%" y2="50%" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(255,255,255,0.6)" stroke-width="2"/></svg>
    `);
    card.appendChild(networkContainer);

    const exp = document.createElement('p');
    exp.className = 'word-explanation';
    exp.textContent = getTranslation('wordNetworkExplanation');
    card.appendChild(exp);

    card.appendChild(createPromptFlowSection({
      idPrefix: 'wl-semantic',
      guideTitle: 'Sådan træner du "Lær et nyt ord" med din egen gratis AI',
      stepsHtml: [
        'Klik på <strong>Kopiér AI-instruktion</strong> herunder.',
        'Åbn dit foretrukne gratis AI-værktøj (f.eks. <strong>Google Gemini</strong> eller <strong>ChatGPT</strong>).',
        'Indsæt instruktionen i chatten, skriv <strong>"hej"</strong>, vælg dit støttesprog, og skriv det danske ord du vil træne.'
      ],
      promptLabel: 'System-prompt: Lær et nyt ord (synlig instruktion)',
      promptText: WORD_LEARNING_PROMPTS.semantic
    }));
    parent.appendChild(card);
  }

  function renderNaboordExercise(parent) {
    const card = document.createElement('div');
    card.className = 'exercise-card';

    const t = document.createElement('h2');
    t.className = 'exercise-card-title';
    t.textContent = getTranslation('laerNaboord');
    card.appendChild(t);

    const img = document.createElement('img');
    img.src = `${baseUrl}naboord.png`;
    img.className = 'full-width-img';
    img.alt = 'Naboord';
    card.appendChild(img);

    const exp = document.createElement('p');
    exp.className = 'word-explanation';
    exp.textContent = getTranslation('laerNaboordDesc');
    card.appendChild(exp);

    card.appendChild(createPromptFlowSection({
      idPrefix: 'wl-naboord',
      guideTitle: 'Sådan træner du "Naboord (kollokationer)" med din egen gratis AI',
      stepsHtml: [
        'Klik på <strong>Kopiér AI-instruktion</strong> herunder.',
        'Åbn dit foretrukne gratis AI-værktøj (f.eks. <strong>Google Gemini</strong> eller <strong>ChatGPT</strong>).',
        'Indsæt instruktionen i chatten, skriv <strong>"hej"</strong>, vælg dit støttesprog, og skriv et ord (f.eks. <em>beslutning</em> eller <em>kaffe</em>).'
      ],
      promptLabel: 'System-prompt: Lær nye naboord (synlig instruktion)',
      promptText: WORD_LEARNING_PROMPTS.naboord
    }));
    parent.appendChild(card);
  }

  function renderOrdfamilierExercise(parent) {
    const card = document.createElement('div');
    card.className = 'exercise-card';

    const t = document.createElement('h2');
    t.className = 'exercise-card-title';
    t.textContent = getTranslation('laerOrdfamilier');
    card.appendChild(t);

    const img = document.createElement('img');
    img.src = `${baseUrl}ordpar.png`;
    img.className = 'full-width-img';
    img.alt = 'Ordfamilier';
    card.appendChild(img);

    const exp = document.createElement('p');
    exp.className = 'word-explanation';
    exp.textContent = getTranslation('laerOrdfamilierDesc');
    card.appendChild(exp);

    card.appendChild(createPromptFlowSection({
      idPrefix: 'wl-ordfamilier',
      guideTitle: 'Sådan træner du "Ordfamilier (Kategori-match)" med din egen gratis AI',
      stepsHtml: [
        'Klik på <strong>Kopiér AI-instruktion</strong> herunder.',
        'Åbn dit foretrukne gratis AI-værktøj (f.eks. <strong>Google Gemini</strong> eller <strong>ChatGPT</strong>).',
        'Indsæt instruktionen i chatten, skriv <strong>"hej"</strong>, vælg dit støttesprog, og find ordet der skal ud.'
      ],
      promptLabel: 'System-prompt: Lær ordfamilier (synlig instruktion)',
      promptText: WORD_LEARNING_PROMPTS.ordfamilier
    }));
    parent.appendChild(card);
  }

  function renderHistorierExercise(parent) {
    const card = document.createElement('div');
    card.className = 'exercise-card';

    const t = document.createElement('h2');
    t.className = 'exercise-card-title';
    t.textContent = getTranslation('laerNyeOrdHistorier');
    card.appendChild(t);

    const img = document.createElement('img');
    img.src = `${baseUrl}historier.png`;
    img.className = 'full-width-img';
    img.alt = 'Historier';
    card.appendChild(img);

    const exp = document.createElement('p');
    exp.className = 'word-explanation';
    exp.textContent = getTranslation('laerNyeOrdHistorierDesc');
    card.appendChild(exp);

    card.appendChild(createPromptFlowSection({
      idPrefix: 'wl-historier',
      guideTitle: 'Sådan bruger du "Lær nye ord via historier" (TPRS) med din egen gratis AI',
      stepsHtml: [
        'Klik på <strong>Kopiér AI-instruktion</strong> herunder.',
        'Åbn dit foretrukne gratis AI-værktøj (f.eks. <strong>Google Gemini</strong> eller <strong>ChatGPT</strong>), indsæt instruktionen og send den.',
        'Skriv <strong>"Klar"</strong> (eller udfyld skabelonen <strong>Målord:</strong> / <strong>Overordnet plot:</strong> / <strong>Sværhedsgrad:</strong>), og byg historien videre trin for trin.'
      ],
      promptLabel: 'System-prompt: Lær nye ord via historier (synlig instruktion)',
      promptText: WORD_LEARNING_PROMPTS.historier
    }));
    parent.appendChild(card);
  }

  render();
}
