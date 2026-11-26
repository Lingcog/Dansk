---
trigger: always_on
---

# Lokal udvikling først — ingen automatisk deploy

- Kør **IKKE** `npm run deploy` og push **IKKE** til `origin/main` automatisk efter kodeændringer.
- Alle ændringer skal som udgangspunkt kun køre lokalt på `http://localhost:5175/Dansk/` og verificeres dér.
- Kør kun `git push` og/eller `npm run deploy`, når brugeren **eksplicit** beder om at publicere/deploye.
