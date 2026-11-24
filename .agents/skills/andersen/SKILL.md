---
name: andersen
description: >-
  Activate when the user writes "@andersen" or asks to build, expand, or refine a H.C. Andersen fairy tale in the app. Transfers the complete pedagogical architecture, visual Nordic minimalist design, hybrid image+diagram explanation box, prose-book layout, vrimlebillede workflow, and two-layer exercise model (Words + Sentence Parts) established in "Klods-Hans" to any scene or new fairy tale.
---

# `@andersen` — Master-blueprint for H.C. Andersens Eventyr

Når brugeren skriver **`@andersen`** (eller beder om at bygge/udvide et eventyr eller en ny scene), skal samtlige pædagogiske, grafiske og tekniske principper fra reference-implementeringen af **"Klods-Hans"** overføres konsekvent.

---

## 1. Visuel stil & Farvepalet (Kølig Skandinavisk Minimalisme)

Formålet er en rolig **museums-/forlagsramme**, der fungerer på tværs af alle fem eventyr uden at kollidere med vrimlebilledernes farver eller ordklassefarverne i teksten.

- **Baggrunde & rammer:** Mat kølig skifer (`#101419`, `#151a21`, `#1a212b`) med tynde 1px-linjer (`rgba(203, 213, 225, 0.13)`). Ingen tunge farvede gradienter eller glødende skygger.
- **Sekundære knapper & mærkater:** 100 % monokrome (`#1a212b`, tekst `#94a3b8`, aktiv state `#e2e8f0` med mørk tekst `#0f172a`).
- **Én gennemgående hovedaccent (petrol):** `#2b6e78` (hover `#35838f`, kant `#3d8b96` / `#4c9ba6`, lys tekst-accent `#7ec4ce`). Bruges *kun* til:
  - Primære knapper (*«Jeg forstår sætningen – Næste sætning →»*, *«Læs eventyr →»*, *«Start talemåderne →»*)
  - Aktiv sætning-venstrestreg, fremdriftsbjælke, forklaringsboksens ramme og vrimlebillede-spotlights
  - `3 Vrimlebilleder`-badge og aktivt lag i 2-lags opgaveomskifteren.
- **Klasse:** Alle eventyr i denne model får `.hc-theme-nordic` på `.hc-reader-wrapper` (og katalog-forsiden bruger samme palet).
- **STRENG REGEL — Fravalg af emojis ("clutter AI"):**
  - Brug **aldrig** farvede Unicode-emojis (`🎨`, `📐`, `🎯`, `🔵`, `🟠`, `🔊`, `🎭`, `🏡`, osv.) i UI-knapper, forklaringsrammen, hint-pills, opgavefaner eller vrimlebillede-spotlights.
  - Brug i stedet **stramme monokrome SVG-ikoner** (`fill="none" stroke="currentColor" stroke-width="2"`), f.eks. øje, luk-kryds, kontrast `≠`, fyldt/åben prik, hus, krone, ur, relationstræ, søjler, reference-pil `↺`.

---

## 2. Katalog-forsidekort (Eventyroversigten)

- På eventyroversigten (`renderCatalog` i `src/views/HCAndersenView.js`) viser eventyr med vrimlebilleder:
  - Badges (`3 Vrimlebilleder`, niveau, læsetid)
  - Dansk titel + engelsk undertitel
  - **Første vrimlebillede** (`sections[0].vrimmelImage`) i `.hc-card-vrimmel-preview` som appetitvækker (i stedet for citat-boks og lang teaser-tekst)
  - Primær knap: **«Læs eventyr →»**.

---

## 3. Vrimlebilleder, Pegefelter & Separate Eventyr-billeder

- **3 dele pr. eventyr** (`Del 1`, `Del 2`, `Del 3`), hver med ét 16:9 vrimlebillede (`public/assets/[eventyr_id]_scene[1-3].jpg`).
- **Kunstnerisk stil:** Klassisk dansk eventyr-vrimlebillede (Wimmelbuch) med sprøde sorte blæk-konturer, varm håndmalet akvarel/gouache, 1800-tals dansk eventyratmosfære, **ingen tekst inde i billederne**.
- **Mobilvenlige pegefelter & diskret skjul-knap:**
  - På telefon (`@media (max-width: 640px)`) skal pegefelterne (`.hc-hotspot-pin`) være små, rolige prikker (`14px`, uden pulserende animation) **uden** synlige tekst-piller (`.hc-hotspot-pill { display: none; }`), så illustrationen kan ånde uden overlap — men med udvidet usynligt tryk-område (`::before { inset: -9px; }`), så de stadig er lette at ramme.
  - Lige under vrimlebilledet (højrejusteret i `.hc-vrimmel-controls`) placeres en diskret nordisk pille-knap (`.hc-pins-toggle-btn`, `#151a21`, petrol-hover, monokromt øje-SVG): **`Skjul pegefelter` / `Vis pegefelter`**, som gemmer brugerens valg i `localStorage` (`hc_hotspots_hidden_v1`).
- **Separate forklaringsbilleder** gemmes i `public/assets/[eventyr_id]_s[nr]/` i **præcis samme stil** som vrimlebilledet (nygenererede i samme stil eller knivskarpe 16:10 beskæringer fra eventyrets egne vrimlebilleder).

---

## 4. Eventyrtekst & Opstilling (`proseFlow: true`)

- **Rigtig eventyr-prosa — ikke teater-replikker:**
  - Sæt `proseFlow: true` på eventyret i `src/data/hc_andersen_stories.js`.
  - Brug `.hc-dialogue-list.hc-prose-book` (samlet bogside-ramme uden separate chat-bobler og uden `Speaker:`-headere).
  - Forfatteren fortæller løbende hvem der taler med **varierede, naturlige danske fortællemarkører** (ikke ensformigt *"X siger: ..."* — brug f.eks. *sagde X stolt*, *trådte Y frem og smilede*, *råbte*, *rystede på hovedet og svarede*, *spurgte forundret*, *nikkede*, *stønnede*).
  - Ingen teater-regibemærkninger i parentes (`(sveder)`, `(griner)` osv.).
- **Sætning-for-sætning flow:**
  - Teksten afsløres én sætning ad gangen med knappen **«Jeg forstår sætningen – Næste sætning →»**.
  - Knappen **«Vis samlet tekst»** lader brugeren/underviseren vise hele scenens tekst på én gang.
  - Instruktionstekst over teksten: *«Læs replikkerne sætning for sætning og tryk på de ord du ikke forstår.»*
  - **Ingen tvungne ordstillings-spærringer (`challenge`)** midt i teksten, som blokerer forståelsesflowet.
- **Skuespil med replikker til download (`.docx`):**
  - Selvom læsefladen præsenteres som ren eventyr-prosa (`proseFlow: true`), skal der til hvert eventyr også genereres en printklar Word-fil i `public/downloads/[Eventyr_Navn]_Skuespil.docx` (reference: `public/downloads/Klods_Hans_Skuespil.docx`) med eventyrets titel, rolleliste og alle 3 scener omskrevet til rene, letlæste teaterreplikker (`Rolle: Replik`) med fed rollenavn-markering — klar til højtlæsning og rollespil i klassen.

---

## 5. Visuel Forklaringsramme (Hybrid-princippet: Billede + Diagram)

Reference-implementering: `src/components/KlodsHansVisualSentence1Lab.js`.

- **On-demand & minimal støj:**
  - Ingen faste knap-rækker. Forklaringsrammen dukker **kun** op, når brugeren klikker på et ord i en sætning, og placeres direkte under den pågældende sætning.
  - **Auto-luk:** Klik på **«Jeg forstår sætningen – Næste sætning»** lukker automatisk forklaringsrammen, fjerner spotlight-ringe på vrimlebilledet og skjuler idle-hintet.
  - **Ingen oplæsning**, **ingen bund-opgaver** og **ingen meta-badges** (som *"Billede + Diagram"*) inde i forklaringsrammen.
- **Hybrid-reglen for indholdet (Venstre match `●` `≠` Højre kontrast `○`):**
  1. **Konkrete indholdsord** *(steder, ting, personer, sanselige adjektiver)* → **2 separate eventyr-billeder** i vrimlebilledets stil (f.eks. *en gård* `≠` *et slot*, *gammel far* `≠` *ung mand*, *kongen* `≠` *en bonde*).
  2. **Grammatiske, relationelle & abstrakte ord** *(tid/datid/perfektum, eksistens, præpositioner/beholder, pronominer/reference `↺`, ejerskab/relationstræ, grad/superlativ, rækkefølge i familietræ)* → **Eventyr-billede med gennemskinneligt, 100 % ordløst SVG-diagram-lag ovenpå** (eller rent ordløst SVG-diagram, når et billede ikke kan vise den logiske struktur):
     - *Tid (`var der`, `har sagt`, `en dag`)*: Tidslinje med fortidspunkt / perfektum-pil til NU / kalender-række.
     - *Reference & rum (`og i den`, `hans datter`)*: Beholder-ramme + gul bue-pil (`↺`) tilbage til ankeret.
     - *Relation & familietræ (`havde tre sønner`, `storebror`, `mellembror`)*: 1 forældre-node → 3 grene til 3 lodrette sønne-prikker, hvor henholdsvis alle 3, den øverste prik (`storebror`) eller den mellemste prik (`mellembror`) lyser op.
     - *Grad & superlativ (`så kloge`, `taler bedst`)*: 3 stigende søjler mod maksimum / krone på nr. 1.
- **Forbindelse til vrimlebilledet:** Når et ord med en visuel placering i scenen vælges, tændes pulserende petrol-spotlight-ringe (`.kh-vrimmel-spotlight-ring`) direkte på det tilsvarende element i vrimlebilledet.

---

## 6. Knapper, Navigation & Gating (Hvad der vises — og hvad der er fjernet)

- **Header:** Kun bog-ikon, titel, engelsk undertitel, niveau og læsetid.
- **Trin-piller:** Kun `Del 1`, `Del 2`, `Del 3`.
- **Bundnavigation:** `← Tilbage til alle eventyr` + diskret monokrom **`Hovedsiden`**-knap med hus-SVG (`navigateFn('home')`).
- **Gating (vises FØRST når alle sætninger i delen er læst ELLER «Vis samlet tekst» er trykket):**
  1. **`Valgfri træning · X opgaver`** (`.hc-tasks-drawer`): Skjult under læsningen; dukker frem som en slank, sammenfoldet streg-knap nederst i scenekortet, som kursist/underviser kan folde ud efter behov.
  2. **Forståelsesspørgsmål** (`.hc-quiz-card`): Skjult under læsningen; viser **kun det forståelsesspørgsmål, der vedrører den pågældende del** (1 spørgsmål pr. del).
- **Eventyrets talemåder:** Vises **kun** som invitationsboks nederst i **3. del** (aldrig i 1. eller 2. del, og ingen knap øverst).
- **Diskret download af skuespil i 3. del:** Nederst til højre i scenekortet på **Del 3** (`index === 2`) placeres en afdæmpet nordisk pille-knap (`.hc-script-download-btn` i `.hc-script-download-row`, `#151a21`, petrol-hover, monokromt download-SVG — aldrig i Del 1 eller Del 2): **`Hent skuespil med replikker (.docx)`** (`Download original play script (.docx)` på engelsk), der downloader `downloads/[Eventyr_Navn]_Skuespil.docx`.
- **Bevisst fjernede elementer (må IKKE genindføres):**
  - Citat-banner i reader-header, `.hc-toolbar` (*Lyt til historien*, *Afsnit for afsnit / Hele teksten*, *Tekst A/A+/A++*), *TEKSTEN*-mærkat, *Gloser & ordforklaringer*-boks, *Sprog-spot*-boks, *Afslutning: 2 opgaver*, *Næste afsnit →*, *Næste eventyr →*, *Alle X sætninger læst*-badge.

---

## 7. Opgaver til scenen — To-lags struktur (`1. Ord` & `2. Sætningsdele`)

Inde i `.hc-tasks-drawer` → `.hc-section-tasks` skifter brugeren mellem to lag:

- **Lag 1 (`1. Ord`):**
  - Faner for *Visuel detektiv* og ordklasser (*Substantiver, Verber, Adjektiver, Adverbier*).
  - **Kobling mellem tekst og opgave:** Klik på en ordklasse-fane sætter `card.dataset.activeHighlight` og fremhæver netop den valgte ordklasse direkte i eventyrteksten ovenfor.
- **Lag 2 (`2. Sætningsdele`):**
  - Reference-implementering: `src/components/KlodsHansSentencePartsLab.js`.
  - Viser at sætninger består af sammenhængende, manipulerbare byggeklodser i 4 populært navngivne kategorier:
    1. **Hvem & Handling** *(Subjekt & Verbal)* — udpeg samlede subjekt-klodser + indsæt småord i verbal-tangen (`vil [også] gå`).
    2. **Navne-pakker** *(Adjektiv + navneord)* — klods-puslespil for ubestemt vs. bestemt form (`en gammel gård`, `den gamle far`, `store og komplicerede ting`).
    3. **Sted & Tid** *(Præpositionsfraser & V2)* — flyt sted-/tidspakke forrest og oplev V2-inversion (`En dag fortalte den gamle far dem`), plus puslespil for præpositionsfraser.
    4. **Uddybninger (`som`/`der`)** *(Relativsætninger)* — flet to sætninger med `som`/`der`, hægt relativsætning på det rigtige anker, og fold relativsætningen ind/ud for at mærke hovedsætningen alene.

---

## 8. Arbejdsgang ved næste eventyr (`@andersen [Eventyrnavn]`)

1. **Data (`src/data/hc_andersen_stories.js`):** Omskriv eventyrets 3 scener til `proseFlow: true` med varierede danske fortællemarkører, farvekodede ord-tokens og 1 forståelsesspørgsmål pr. del (`quiz[0..2]`).
2. **Grafik:** Generér/indsæt 3 vrimlebilleder i Wimmelbuch-stil (0 tekst) + separate forklaringsbilleder i `public/assets/[eventyr_id]_s[nr]/` i nøjagtig samme stil.
3. **Visuel forklaringsboks:** Udvid eller opret en eventyr-specifik hybrid-konfiguration (eventyr-billeder til konkrete ord + ordløse SVG-diagram-lag til tid, rum, reference, relationer og grad), koblet med spotlight-ringe til vrimlebilledet.
4. **Lag 2 (Sætningsdele):** Opret scene-specifikke klods-opgaver i de 4 kategorier (*Hvem & Handling*, *Navne-pakker*, *Sted & Tid*, *Uddybninger*).
5. **Skuespil til download (`.docx`):** Generér `public/downloads/[Eventyr_Navn]_Skuespil.docx` (rolleliste + alle 3 scener som rene replikker) via `python-docx`, og kobl den diskrete `.hc-script-download-btn`-knap ind nederst i **Del 3** i `src/views/HCAndersenView.js`.
6. **Tema & Visning (`src/views/HCAndersenView.js`):** Aktivér `.hc-theme-nordic`, forside-vrimlebillede, `proseFlow` og gating-reglerne på det nye eventyr.
7. **Verifikation:** Verificér i headless Chrome CDP på `http://localhost:5175/Dansk/#/da/hc_andersen_eventyr`: `0` konsol-/runtime-fejl, `0` Unicode-emojis i de nye komponenter, alle billeder indlæst (`naturalWidth > 0`), auto-luk på *«Jeg forstår sætningen – Næste sætning»*, korrekt gating af *Valgfri træning* + per-del forståelsesspørgsmål, begge lag (*1. Ord* og *2. Sætningsdele*), samt at `.hc-script-download-btn` kun vises i **Del 3** og returnerer `HTTP 200` på `.docx`-filen.
