---
trigger: always_on
---

# Deploy-regel baseret på URL (`localhost` vs. `https://lingcog.github.io`)

- **Hvis brugeren linker til `localhost` (fx `http://localhost:5175/...`) — eller ikke angiver en live URL:**
  - Kør **IKKE** `git push` og kør **IKKE** `npm run deploy` automatisk.
  - Verificér ændringerne lokalt på `http://localhost:5175/Dansk/`, og vent til brugeren eksplicit beder om deploy.
- **Hvis brugeren linker til en live URL (`https://lingcog.github.io/...`):**
  - Verificér ændringerne først (syntaks/build/visuelt), og kør derefter **automatisk** `git commit`, `git push origin main` og `npm run deploy`.
- **H.C. Andersen-undtagelsen:** Hold fortsat H.C. Andersen låst til `localhost` via `src/utils/devMode.js`, medmindre brugeren eksplicit beder om at åbne den på GitHub Pages.
