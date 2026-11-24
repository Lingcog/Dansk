---
name: test
description: >-
  Activate when the user writes "@test" or asks to build a new oral-exam / mindmap-driven topic view (like "Min bolig" under Mit hverdagsliv). Transfers the complete 8-tab pedagogical architecture, 6-box color-coded mindmap backbone, single-scene vrimlebillede workflow, 4-step writing workshop with Ordstilling color codes, mindmap keyword bridge, visual pronunciation trainer, Del 2 exam questions, and 18-language + RTL support.
---

# `@test` — Master-blueprint for Mindmap-drevne Prøveflader (DU1/DU2/DU3)

Når brugeren skriver **`@test [Emne]`** (f.eks. `@test Min familie`, `@test Mit arbejde`, `@test Min fritid`), skal hele den pædagogiske, grafiske og tekniske arkitektur fra reference-implementeringen **"Min bolig"** overføres konsekvent.

**Reference-filer i kodebasen:**
- Hovedflade (8 faner): `src/views/MinBoligView.js`
- Fane 5 (Skrivehjælp): `src/components/MinBoligSkrivevaerksted.js`
- Fane 7 (Træn udtale): `src/components/MinBoligUdtaleTab.js`
- Fælles ordstillings-farvekoder: `src/utils/ordstillingColorCodes.js`
- 18-sprogs oversættelser: `src/utils/min_bolig_translations.js` + `src/utils/mb_skrive_translations.js`

---

## 1. Den pædagogiske rygrad: 6-punkts mindmap som gennemgående akse

Hele fladen stilladserer en **mundtlig prøve i to dele** (**Del 1:** struktureret præsentation ud fra et mindmap med stikord + **Del 2:** opfølgende samtale med eksaminator) på enkelt, naturligt **A1/A2-dansk**.

- **6 farvekodede mindmap-bokse (`MINDMAP_BOXES`)** binder samtlige 8 faner sammen:
  1. **Boks 1** — Lyseblå `#38bdf8`
  2. **Boks 2** — Rav `#f59e0b`
  3. **Boks 3** — Smaragd `#10b981`
  4. **Boks 4** — Pink `#ec4899`
  5. **Boks 5** — Lilla `#a855f7`
  6. **Boks 6** — Grøn `#22c55e`
- Hver boks defineres med: `id`, `num` (`1..6`), `title`, `color`, `border`, `bg`, `oralQuestion` (ét klart mundtligt kernespørgsmål) og `modelSentence` (1–2 enkle A1/A2-sætninger).
- **Den sprogdidaktiske trappe på tværs af de 8 faner:**
  > **Forståelse & ordforråd** (Fane 1–2) → **Form & grammatik** (Fane 3–4) → **Egen skriftlig produktion** (Fane 5) → **Kondensering til stikord / mindmap** (Fane 6) → **Mundtlig udtaletræning af egne sætninger** (Fane 7) → **Samtale & eksamenssimulering** (Fane 8).

---

## 2. Vrimlebilledet & Pegefelter

- **Ét samlet 16:9 vrimlebillede** (`public/assets/[emne]_vrimmel.jpg`), tegnet som et sammenhængende dansk hverdagsmiljø uden tekst inde i billedet, hvor **alle 6 mindmap-bokse** er visuelt repræsenteret.
- **24 målord (`4 ord × 6 mindmap-bokse`)**:
  - Hvert ord har: `num`, `id`, `word`, `shortLabel`, `gender` (`en`/`et`/`-`), `forms`, `mindmapBox`, `x`, `y`, `meaning` (kort enkel dansk), `sentence` (kort A1/A2-sætning), `stikord` (2–3 stikord adskilt af `·`).
  - Pegefelter farvekodes efter ordets `mindmapBox`.
- **Genbrug med skiftende kognitiv funktion:**
  - **Fane 1 (Eksplorativ ordlæring):** Alle 24 pegefelter kan filtreres på `Alle (24)` eller hver enkelt mindmap-boks (`1..6`).
  - **Fane 2 (Ord-detektiv / aktiv genkaldelse):** **Vis KUN pegefelter, der tilhører den aktive missions mindmap-kategori**, så billedet forbliver roligt, fokuseret og mobilvenligt uden overlap.
- **Vrimlebillede-standard (`src/utils/vrimmelPegefeltStandard.js`):**
  - **Ingen Zoom-knap** og **ingen «Vis tekst / Kun tal»-knap** ved vrimlebilledet.
  - **Harmoniske tal-pegefelter uden ikoner:** Rene runde cirkler (`26 px` desktop, `20 px` mobil `≤ 640 px` med udvidet usynligt tryk-område `::before { inset: -7px; }`), ingen ikoner og ingen taleboble-trekant.
  - **Diskret nordisk skjul/vis-knap:** Brug `attachVrimmelControls(stageWrap, pinsLayer, { lang })` lige under både Fane 1- og Detektiv-vrimlebilledet (`Skjul pegefelter` / `Vis pegefelter`).

---

## 3. Den faste 8-faners arkitektur

### Fane 1: Vrimlebillede (24) & Mindmap-sortering
- Vrimlebillede med filterknapper (`Alle (24)` + 6 mindmap-bokse) og `Zoom (140 %)`.
- **Detaljekort** under billedet: ord, køn, relevante bøjningsformer, kort forklaring + oversættelse, let eksempelsætning + oversættelse samt færdigt **stikord-eksempel**.
- **Mindmap-sortering:** Interaktiv øvelse under billedet, hvor kursisten sorterer de 24 ord ned i de 6 mindmap-bokse.

### Fane 2: Detektiv
- Visuel søgeleg på samme vrimlebillede med missioner fordelt på de 6 mindmap-bokse.
- Kun pegefelter fra missionens egen mindmap-kategori vises på billedet.
- Pointtæller, hints og øjeblikkelig forklarende feedback.

### Fane 3: Emnets kerne-grammatik (3 opgavetyper)
- Vælg den grammatiske struktur, der er vigtigst for det valgte prøveemne (fx `min/mit/mine` i *Min bolig*, datid/nutid i *Min hverdag*, præpositioner/sted i *Min by*).
- Byg den op i **3 korte trin**:
  - **A. Hurtig duel** (vælg rigtig form)
  - **B. Omskrivning** (fra grundform til målform)
  - **C. Udfyldning i sammenhæng** (indsæt i hele A1/A2-sætninger).

### Fane 4: Byg sætninger
- **A. Pusleopgaver:** 4 farvekodede slots (`Subjekt (1)` → `Verbum (2)` → `Rest (3)` → `Sted/Tid (4)`), hvor kursisten klikker ordklodser på plads.
- **B. Trin-for-trin sætningsbygger:** 4 farvekodede rækker med valgmuligheder, som live samler kursistens egen sætning nederst.

### Fane 5: Skrivehjælp (Stilladseret 4-trins skriveværksted)
- Reference: `src/components/MinBoligSkrivevaerksted.js` + `src/utils/ordstillingColorCodes.js`.
- Scenarie-vælger for alle **6 mindmap-bokse** (farvekodet 1–6).
- **4 trin pr. sætning:**
  1. **Start (Trin 1):** Person, Tid (V2-inversion), Sted (V2-inversion), Sammenhæng (V2), `at`-ledsætning (og evt. `Kan lide`-skabelon, hvis emnet handler om præferencer/fritid).
  2. **Verbum (Trin 2):** Skifter automatisk til `Verbum + Subjekt` ved V2-inversion.
  3. **Objekt / Rest (Trin 3):** Emnespecifikke brikker + frit tekstfelt.
  4. **Udvidelse (Trin 4):** Bindeord (`fordi`, `men`, `og`) eller relativsætning (`som`, `der`).
- **Krav til UX & sprogpædagogik i Fane 5:**
  - **Ordstillings-farvekoder** (`ordstillingColorCodes.js`) med **`Farvekoder: Til / Fra`**-knap på både brikker og live-forhåndsvisning.
  - **Mobilvenlige tekstfelter:** Alle egne tekstinputs SKAL have `autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false"`, så mobil-tastaturer ikke tvinger stort begyndelsesbogstav.
  - **Bliv på boksen + `Næste punkt →`:** Når brugeren tilføjer en sætning, bliver man på samme mindmap-boks (så man kan skrive 2–3 sætninger pr. boks) og skifter selv videre med `Næste punkt →`.
  - **Gem i `localStorage`** pr. mindmap-boks, så sætningerne automatisk følger med til Fane 6 og Fane 7.
  - **Neutrale refleksions-hints (INGEN ros/bedømmelse):** Lokal feedback må aldrig give karakterer eller ros (*"Flot!"*, *"Godt klaret!"*), men skal stille neutrale, guidende spørgsmål med klikbare links til relevante træningsflader i appen.
  - **Kopiér til AI-tutor**-knap med system-prompt.

### Fane 6: Mindmap (Del 1)
- **Direkte bro fra Fane 5 → Fane 6:**
  - Over hver af de 6 mindmap-bokse vises kursistens egne sætninger fra Fane 5 som **klikbare ord-chips**, så brugeren kan klikke nøgleord direkte ned som stikord.
  - Knap: **`Foreslå stikord fra min tekst`** (udtrækker automatisk indholdsord som stikord).
  - Knap: **`Prøve-tilstand: Skjul sætninger`** (skjuler helsætningerne, så kursisten øver fri mundtlig tale kun ud fra mindmappet).
- **Stikord vs. hel sætning-quiz:** Kort quiz der træner eksamensreglen om stikord frem for oplæsning.
- **Én-klik eksport til Fane 7:** Knap der importerer kursistens sætninger direkte til **7. Træn udtale** og skifter fane.

### Fane 7: Træn udtale
- Reference: `src/components/MinBoligUdtaleTab.js`.
- Hver importeret sætning vises i sin egen boks, farvemærket med tilhørende mindmap-boks (og brugeren kan også tilføje egne sætninger).
- **Lyt (TTS `da-DK`, roligt tempo `0.88`) + Indtal (Web Speech API `da-DK`)**.
- **Visuel udtalefeedback:**
  - Cirkulær **score-ring (`0–100 %`)**
  - **Ord-for-ord procent-chips** (grøn / gul / rød), så brugeren straks ser hvilke ord der sad lige i skabet, og hvilke der skal øves igen.

### Fane 8: Spørgsmål (Del 2)
- Typiske opfølgende eksamensspørgsmål til emnet med klikbare svarskabeloner/stikord.
- **AI-samtaleøvelse** via `createPromptFlowSection`, så kursisten kan kopiere en skræddersyet eksaminator-prompt til Gemini eller ChatGPT.

---

## 4. Visuel stil & Designregler

- **Mørkt, roligt nordisk kort-design:** Baggrunde `#0f172a` / `#151a21`, skarpe 1px-rammer (`rgba(203, 213, 225, 0.13)`), afrundede piller og chips, høj læsbarhed på både desktop og mobil.
- **Farvekodning har altid pædagogisk funktion (ikke pynt):**
  - De **6 mindmap-farver** styrer *indhold/tema*.
  - De **5 ordstillings-farver** i Fane 5 styrer *syntaks/sætningsled*.
- **Monokrome SVG-ikoner** i Skrivehjælp og Træn udtale (ingen støjende emoji-clutter).
- **Enkelt A1/A2-dansk** i samtlige eksempelsætninger, forklaringer, opgaver og modeltekster.

---

## 5. 18 sprog & Fuld RTL-understøttelse

Alle tekster — UI, faner, ordforklaringer, eksempelsætninger, opgaveinstruktioner, feedback, Skrivehjælp og Mindmap — skal oversættes til appens **18 understøttede sprog**:
`da, en, de, es, pt, tr, ar, fa, ku, ur, ps, ru, uk, zh, vi, sq, th, ne`

- **Struktur:** Opdel i `src/utils/[emne]_da.js` + 4 sproggrupper (`g1`: `en, de, es, pt`, `g2`: `tr, ar, fa, ku`, `g3`: `ur, ps, ru, uk`, `g4`: `zh, vi, sq, th, ne`) + samlende helper `src/utils/[emne]_translations.js` med `t(key, lang)`, `sub(key, cls, lang)` og `isRtl(lang)`.
- **Tosproget visning:** Dansk målsprog står altid øverst; støttesprogets oversættelse vises diskret lige under (`sub()` returnerer tom streng på `da`).
- **RTL:** Tilføj `dir="rtl"` på alle oversatte tekstblokke for `ar, fa, ur, ps`.

---

## 6. Arbejdsgang & Verifikation ved `@test [Emne]`

1. **Planlæg de 6 mindmap-bokse & 24 ord** (4 pr. boks) + emnets kerne-grammatik til Fane 3.
2. **Vrimlebillede:** Generér `public/assets/[emne]_vrimmel.jpg` (16:9, ingen tekst i billedet) med tydelige visuelle ankre til alle 24 ord.
3. **Byg de 8 faner:** Opret hovedview (`src/views/[Emne]View.js`), emnespecifik Skrivehjælp-konfiguration (genbrug mønstret fra `MinBoligSkrivevaerksted.js` + `ordstillingColorCodes.js`) og kobl `MinBoligUdtaleTab.js`-mønstret på Fane 7. Registrér ruten i `src/main.js` og menupunktet under *Mit hverdagsliv*.
4. **Oversæt til alle 18 sprog** (parallelt i 4 sproggrupper `g1..g4`) og kør en programmatisk paritetstjek (`18` sprog, `0` manglende nøgler, `node --check` på alle filer).
5. **Verifikation i headless Chrome CDP:**
   - Test på `da`, `en` og `ar` (bekræft `dir="rtl"`-elementer).
   - Klik igennem alle 8 faner og verificér: `0` konsol-/runtime-fejl, vrimlebillede indlæst (`naturalWidth > 0`), kategori-filtrerede pins i Fane 2, Fane 5 → Fane 6 stikord-bro, Fane 6 → Fane 7 udtale-import og `autocapitalize="none"` på tekstfelter.
6. **Publicér live** med `npm run deploy` når verificeringen er grøn.
