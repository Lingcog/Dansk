---
name: pdf-idiom-html
description: >-
  Use this skill when the user uploads a PDF of a new idiom and says "PDF-talemåde: [danske talemåde]". It guides the agent on how to rebuild the static PDF slides into an interactive, multilingual HTML Scrollytelling format (Løsning 3).
---

# PDF-talemåde: Omdannelse af PDF til HTML (Løsning 3)

Når brugeren uploader en PDF og bruger kommandoen **"PDF-talemåde: [danske talemåde]"**, er målet at skabe en fuldt interaktiv, responsiv og oversættelsesklar HTML-version af PDF'en, magen til den vi lavede for "Mad er medicin".

## Trin for Trin Processen

### Trin 1: Hent illustrationerne
En PDF med brændt tekst kan ikke oversættes. For at bygge "Løsning 3" har vi brug for PDF'ens illustrationer uden baggrundstekst.
- Hvis brugeren ikke allerede har uploadet de små illustrationer/ikoner (f.eks. æblet, hjertet, radisen) uden tekst, så **bed brugeren om at uploade dem**.
- Gem de uploadede illustrationer i en ny mappe under `public/images/talemaader/[navn_på_talemåde]/`.

### Trin 2: Opret View-funktionen
Opret en ny funktion (f.eks. `render[Navn]View(container, navigateFn)`) i en passende visningsfil (f.eks. `TestPDFViews.js` eller en ny fil). Du skal genbruge HTML/CSS-strukturen fra `renderTestHtmlView`, men med det nye indhold.

Funktionen skal indeholde:
1. **Side 1 (Overskrift & Velkomst):** Ren tekst opsat flot med CSS og illustrationer som `<img>`.
2. **Side 2 (Bogstavelige oversættelser & Gloser):** Et CSS Grid-layout, der viser den direkte oversættelse af det danske udtryk ("Et æble om dagen...") til alle støttesprog. Det er her de lærer danske gloser som "æble" og "læge".
3. **Side 3 (Interaktiv Sektion):** Et klikbart gitter (JavaScript), hvor brugeren kan vælge et sprog for at læse det pågældende lands egen ægte kulturelle talemåde, samt den danske betydning.
4. **Side 4 & 5 (Opsamling og Konklusion):** Layout med illustrationerne, der runder fortællingen af og viser at "forskellige billeder har samme tanke".

### Trin 3: Navigation og Router
Sørg for, at brugeren kan tilgå den nye HTML-visning.
1. Importer og tilføj ruten i `src/main.js`.
2. Lav en knap/et kort i `src/views/TalemaaderView.js`, som peger på den nye rute.

### Trin 4: Deploy og Test
Når koden er skrevet, kør `npm run deploy`. Fortæl brugeren at løsningen nu ligger klar i "Talemåder" menuen som en ægte, levende HTML-flade klar til oversættelse.
