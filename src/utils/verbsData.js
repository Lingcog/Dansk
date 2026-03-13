export const verbsData = [
    {
        "id": "hjaelpe",
        "title": "Hjælpeverber",
        "verbs": ["kan", "skal", "vil", "må", "bør"],
        "exercises": [
            {
                "title": "Modalverber - Sæt 1",
                "instruction": "Vælg det rigtige hjælpeverbum.",
                "segments": [
                    { "type": "text", "content": "1. **[I can speak Danish]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 0, "correct": "kan", "options": ["kan", "skal", "vil", "må", "bør"], "explanation": "hintAction" },
                    { "type": "text", "content": " tale dansk.\\n\\n2. **[I must go now]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 1, "correct": "skal", "options": ["kan", "skal", "vil", "må", "bør"], "explanation": "hintAction" },
                    { "type": "text", "content": " gå nu.\\n\\n3. **[I want to buy a cake]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 2, "correct": "vil", "options": ["kan", "skal", "vil", "må", "bør"], "explanation": "hintAction" },
                    { "type": "text", "content": " gerne købe en kage.\\n\\n4. **[May I sit here?]**\\nDansk: " },
                    { "type": "gap", "id": 3, "correct": "Må", "options": ["Må", "Skal", "Kan", "Vil", "Bør"], "explanation": "hintAction" },
                    { "type": "text", "content": " jeg sidde her?\\n\\n5. **[You should read this]**\\nDansk: Du " },
                    { "type": "gap", "id": 4, "correct": "bør", "options": ["kan", "skal", "vil", "må", "bør"], "explanation": "hintAction" },
                    { "type": "text", "content": " læse denne bog." }
                ],
                "phase2_tasks": [
                    { "correct": "kan", "definition": "Når man har evnen eller muligheden for at gøre noget.", "options": ["kan", "skal", "vil", "må", "bør"], "explanation": "Korrekt! 'Kan' udtrykker evne." },
                    { "correct": "skal", "definition": "Når man er nødt til at gøre noget, eller har en plan.", "options": ["kan", "skal", "vil", "må", "bør"], "explanation": "Korrekt! 'Skal' udtrykker nødvendighed." },
                    { "correct": "vil", "definition": "Når man har et ønske eller en lyst til noget.", "options": ["kan", "skal", "vil", "må", "bør"], "explanation": "Korrekt! 'Vil' udtrykker ønske." },
                    { "correct": "må", "definition": "Når man har tilladelse til noget.", "options": ["kan", "skal", "vil", "må", "bør"], "explanation": "Korrekt! 'Må' udtrykker tilladelse." },
                    { "correct": "bør", "definition": "Når noget er en god idé eller moralsk rigtigt.", "options": ["kan", "skal", "vil", "må", "bør"], "explanation": "Korrekt! 'Bør' udtrykker anbefaling." }
                ]
            }
        ]
    },
    {
        "id": "tilstand",
        "title": "Tilstand og Navne",
        "verbs": ["er", "har", "bor", "hedder", "bliver"],
        "exercises": [
            {
                "title": "Hvem er jeg? - Sæt 1",
                "instruction": "Vælg det rigtige verbum om din tilstand.",
                "segments": [
                    { "type": "text", "content": "1. **[I am happy]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 0, "correct": "er", "options": ["er", "har", "bor", "hedder", "bliver"], "explanation": "hintContext" },
                    { "type": "text", "content": " glad.\\n\\n2. **[I have a dog]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 1, "correct": "har", "options": ["er", "har", "bor", "hedder", "bliver"], "explanation": "hintContext" },
                    { "type": "text", "content": " en hund.\\n\\n3. **[I live in Aarhus]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 2, "correct": "bor", "options": ["er", "har", "bor", "hedder", "bliver"], "explanation": "hintPlace" },
                    { "type": "text", "content": " i Aarhus.\\n\\n4. **[My name is Peter]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 3, "correct": "hedder", "options": ["er", "har", "bor", "hedder", "bliver"], "explanation": "hintName" },
                    { "type": "text", "content": " Peter.\\n\\n5. **[I am becoming a doctor]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 4, "correct": "bliver", "options": ["er", "har", "bor", "hedder", "bliver"], "explanation": "hintContext" },
                    { "type": "text", "content": " læge næste år." }
                ],
                "phase2_tasks": [
                    { "correct": "er", "definition": "Bruges til at identificere sig selv eller sin tilstand.", "options": ["er", "har", "bor", "hedder", "bliver"], "explanation": "Korrekt!" },
                    { "correct": "har", "definition": "Når man ejer noget.", "options": ["er", "har", "bor", "hedder", "bliver"], "explanation": "Korrekt!" },
                    { "correct": "bor", "definition": "Når man har sit hjem et bestemt sted.", "options": ["er", "har", "bor", "hedder", "bliver"], "explanation": "Korrekt!" },
                    { "correct": "hedder", "definition": "Bruges når man fortæller sit navn.", "options": ["er", "har", "bor", "hedder", "bliver"], "explanation": "Korrekt!" },
                    { "correct": "bliver", "definition": "Når man ændrer sig til noget nyt.", "options": ["er", "har", "bor", "hedder", "bliver"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "bevaegelse",
        "title": "Bevægelse",
        "verbs": ["går", "kører", "rejser", "falder", "stiger"],
        "exercises": [
            {
                "title": "På farten - Sæt 1",
                "instruction": "Vælg det rigtige verbum om bevægelse.",
                "segments": [
                    { "type": "text", "content": "1. **[I walk to school]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 0, "correct": "går", "options": ["går", "kører", "rejser", "falder", "stiger"], "explanation": "hintAction" },
                    { "type": "text", "content": " til skole.\\n\\n2. **[I drive a car]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 1, "correct": "kører", "options": ["går", "kører", "rejser", "falder", "stiger"], "explanation": "hintAction" },
                    { "type": "text", "content": " i bil.\\n\\n3. **[I travel to Spain]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 2, "correct": "rejser", "options": ["går", "kører", "rejser", "falder", "stiger"], "explanation": "hintContext" },
                    { "type": "text", "content": " til Spanien i sommerferien.\\n\\n4. **[The apple falls from the tree]**\\nDansk: Æblet " },
                    { "type": "gap", "id": 3, "correct": "falder", "options": ["går", "kører", "rejser", "falder", "stiger"], "explanation": "hintContext" },
                    { "type": "text", "content": " ned fra træet.\\n\\n5. **[The price increases]**\\nDansk: Prisen " },
                    { "type": "gap", "id": 4, "correct": "stiger", "options": ["går", "kører", "rejser", "falder", "stiger"], "explanation": "hintContext" },
                    { "type": "text", "content": " hver måned." }
                ],
                "phase2_tasks": [
                    { "correct": "går", "definition": "At flytte sig ved brug af benene.", "options": ["går", "kører", "rejser", "falder", "stiger"], "explanation": "Korrekt!" },
                    { "correct": "kører", "definition": "At transportere sig i et køretøj som bil eller bus.", "options": ["går", "kører", "rejser", "falder", "stiger"], "explanation": "Korrekt!" },
                    { "correct": "rejser", "definition": "At tage på en længere tur til et andet sted eller land.", "options": ["går", "kører", "rejser", "falder", "stiger"], "explanation": "Korrekt!" },
                    { "correct": "falder", "definition": "At bevæge sig hurtigt mod jorden ved et uheld eller tyngdekraft.", "options": ["går", "kører", "rejser", "falder", "stiger"], "explanation": "Korrekt!" },
                    { "correct": "stiger", "definition": "At bevæge sig opad eller blive højere (f.eks. priser).", "options": ["går", "kører", "rejser", "falder", "stiger"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "interaktion",
        "title": "Sprog og Kommunikation",
        "verbs": ["siger", "taler", "svarer", "spørger", "fortæller"],
        "exercises": [
            {
                "title": "Samtale - Sæt 1",
                "instruction": "Vælg det rigtige verbum om kommunikation.",
                "segments": [
                    { "type": "text", "content": "1. **[What do you say?]**\\nDansk: Hvad " },
                    { "type": "gap", "id": 0, "correct": "siger", "options": ["siger", "taler", "svarer", "spørger", "fortæller"], "explanation": "hintAction" },
                    { "type": "text", "content": " du?\\n\\n2. **[I speak Danish]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 1, "correct": "taler", "options": ["siger", "taler", "svarer", "spørger", "fortæller"], "explanation": "hintAction" },
                    { "type": "text", "content": " dansk.\\n\\n3. **[I answer the letter]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 2, "correct": "svarer", "options": ["siger", "taler", "svarer", "spørger", "fortæller"], "explanation": "hintAction" },
                    { "type": "text", "content": " på brevet.\\n\\n4. **[I ask a question]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 3, "correct": "spørger", "options": ["siger", "taler", "svarer", "spørger", "fortæller"], "explanation": "hintAction" },
                    { "type": "text", "content": " om vej.\\n\\n5. **[I tell a story]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 4, "correct": "fortæller", "options": ["siger", "taler", "svarer", "spørger", "fortæller"], "explanation": "hintAction" },
                    { "type": "text", "content": " en god historie." }
                ],
                "phase2_tasks": [
                    { "correct": "siger", "definition": "At bruge ord til at udtrykke noget.", "options": ["siger", "taler", "svarer", "spørger", "fortæller"], "explanation": "Korrekt!" },
                    { "correct": "taler", "definition": "At bruge stemmen og et bestemt sprog.", "options": ["siger", "taler", "svarer", "spørger", "fortæller"], "explanation": "Korrekt!" },
                    { "correct": "svarer", "definition": "At give respons på et spørgsmål eller brev.", "options": ["siger", "taler", "svarer", "spørger", "fortæller"], "explanation": "Korrekt!" },
                    { "correct": "spørger", "definition": "Når man vil have information fra en anden person.", "options": ["siger", "taler", "svarer", "spørger", "fortæller"], "explanation": "Korrekt!" },
                    { "correct": "fortæller", "definition": "At give en længere forklaring eller beretning om noget.", "options": ["siger", "taler", "svarer", "spørger", "fortæller"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "indre_liv",
        "title": "Tanker og Følelser",
        "verbs": ["ved", "tror", "mener", "tænker", "synes"],
        "exercises": [
            {
                "title": "Indre liv - Sæt 1",
                "instruction": "Vælg det rigtige verbum om dine tanker.",
                "segments": [
                    { "type": "text", "content": "1. **[I know it]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 0, "correct": "ved", "options": ["ved", "tror", "mener", "tænker", "synes"], "explanation": "hintAction" },
                    { "type": "text", "content": " det godt.\\n\\n2. **[I believe in it]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 1, "correct": "tror", "options": ["ved", "tror", "mener", "tænker", "synes"], "explanation": "hintContext" },
                    { "type": "text", "content": " på dig.\\n\\n3. **[What is your opinion?]**\\nDansk: Hvad " },
                    { "type": "gap", "id": 2, "correct": "mener", "options": ["ved", "tror", "mener", "tænker", "synes"], "explanation": "hintContext" },
                    { "type": "text", "content": " du om det?\\n\\n4. **[I am thinking about you]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 3, "correct": "tænker", "options": ["ved", "tror", "mener", "tænker", "synes"], "explanation": "hintContext" },
                    { "type": "text", "content": " på dig.\\n\\n5. **[I think (opinion) it's fun]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 4, "correct": "synes", "options": ["ved", "tror", "mener", "tænker", "synes"], "explanation": "hintContext" },
                    { "type": "text", "content": " det er sjovt." }
                ],
                "phase2_tasks": [
                    { "correct": "ved", "definition": "Når man har faktuel information om noget.", "options": ["ved", "tror", "mener", "tænker", "synes"], "explanation": "Korrekt!" },
                    { "correct": "tror", "definition": "Når man antager noget eller har en religiøs overbevisning.", "options": ["ved", "tror", "mener", "tænker", "synes"], "explanation": "Korrekt!" },
                    { "correct": "mener", "definition": "Når man har en holdning eller vil udtrykke en betydning.", "options": ["ved", "tror", "mener", "tænker", "synes"], "explanation": "Korrekt!" },
                    { "correct": "tænker", "definition": "Den generelle proces der foregår i hovedet.", "options": ["ved", "tror", "mener", "tænker", "synes"], "explanation": "Korrekt!" },
                    { "correct": "synes", "definition": "Når man har en personlig, følelsesmæssig holdning eller smag.", "options": ["ved", "tror", "mener", "tænker", "synes"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "handling",
        "title": "Handling og Præstation",
        "verbs": ["laver", "gør", "bruger", "tager", "finder"],
        "exercises": [
            {
                "title": "I gang - Sæt 1",
                "instruction": "Vælg det rigtige verbum om handlinger.",
                "segments": [
                    { "type": "text", "content": "1. **[I am doing my homework]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 0, "correct": "laver", "options": ["laver", "gør", "bruger", "tager", "finder"], "explanation": "hintAction" },
                    { "type": "text", "content": " lektier.\\n\\n2. **[I do my best]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 1, "correct": "gør", "options": ["laver", "gør", "bruger", "tager", "finder"], "explanation": "hintAction" },
                    { "type": "text", "content": " mit bedste.\\n\\n3. **[I use a computer]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 2, "correct": "bruger", "options": ["laver", "gør", "bruger", "tager", "finder"], "explanation": "hintAction" },
                    { "type": "text", "content": " en computer.\\n\\n4. **[I take the bus]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 3, "correct": "tager", "options": ["laver", "gør", "bruger", "tager", "finder"], "explanation": "hintAction" },
                    { "type": "text", "content": " bussen.\\n\\n5. **[I find my keys]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 4, "correct": "finder", "options": ["laver", "gør", "bruger", "tager", "finder"], "explanation": "hintAction" },
                    { "type": "text", "content": " mine nøgler." }
                ],
                "phase2_tasks": [
                    { "correct": "laver", "definition": "At producere eller udføre noget (især lektier eller mad).", "options": ["laver", "gør", "bruger", "tager", "finder"], "explanation": "Korrekt!" },
                    { "correct": "gør", "definition": "At udføre en handling (især abstrakte ting som 'sit bedste').", "options": ["laver", "gør", "bruger", "tager", "finder"], "explanation": "Korrekt!" },
                    { "correct": "bruger", "definition": "At anvende et redskab eller en ressource.", "options": ["laver", "gør", "bruger", "tager", "finder"], "explanation": "Korrekt!" },
                    { "correct": "tager", "definition": "At fatte om noget eller vælge en transportmulighed.", "options": ["laver", "gør", "bruger", "tager", "finder"], "explanation": "Korrekt!" },
                    { "correct": "finder", "definition": "At opdage noget man leder efter.", "options": ["laver", "gør", "bruger", "tager", "finder"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "datid",
        "title": "Verber i Datid",
        "verbs": ["så", "gik", "kom", "tog", "spiste"],
        "exercises": [
            {
                "title": "I går - Sæt 1",
                "instruction": "Vælg det rigtige verbum i datid.",
                "segments": [
                    { "type": "text", "content": "1. **[Yesterday I saw a movie]**\\nDansk: I går " },
                    { "type": "gap", "id": 0, "correct": "så", "options": ["så", "ser", "seet", "tog", "gik"], "explanation": "hintContext" },
                    { "type": "text", "content": " jeg en god film.\\n\\n2. **[We walked to the party]**\\nDansk: Vi " },
                    { "type": "gap", "id": 1, "correct": "gik", "options": ["så", "gik", "går", "gået", "kom"], "explanation": "hintContext" },
                    { "type": "text", "content": " til fest i lørdags.\\n\\n3. **[He came late this morning]**\\nDansk: Han " },
                    { "type": "gap", "id": 2, "correct": "kom", "options": ["kom", "kommer", "kommet", "så", "tog"], "explanation": "hintContext" },
                    { "type": "text", "content": " for sent i morges.\\n\\n4. **[I took a cake with me]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 3, "correct": "tog", "options": ["tog", "tager", "taget", "så", "gik"], "explanation": "hintContext" },
                    { "type": "text", "content": " en kage med i går.\\n\\n5. **[We ate dinner at 18]**\\nDansk: Vi " },
                    { "type": "gap", "id": 4, "correct": "spiste", "options": ["spiser", "spist", "spiste", "kom", "tog"], "explanation": "hintContext" },
                    { "type": "text", "content": " aftensmad klokken 18 i går." }
                ],
                "phase2_tasks": [
                    { "correct": "så", "definition": "At have set noget i fortiden (datid af 'se').", "options": ["så", "ser", "seet", "tog", "gik"], "explanation": "Korrekt!" },
                    { "correct": "gik", "definition": "At have gået et sted hen i fortiden (datid af 'gå').", "options": ["så", "gik", "går", "gået", "kom"], "explanation": "Korrekt!" },
                    { "correct": "kom", "definition": "At være ankommet i fortiden (datid af 'komme').", "options": ["kom", "kommer", "kommet", "så", "tog"], "explanation": "Korrekt!" },
                    { "correct": "tog", "definition": "At have taget noget i fortiden (datid af 'tage').", "options": ["tog", "tager", "taget", "så", "gik"], "explanation": "Korrekt!" },
                    { "correct": "spiste", "definition": "At have indtaget mad i fortiden (datid af 'spise').", "options": ["spiser", "spist", "spiste", "kom", "tog"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "tider",
        "title": "Datid eller Førnutid?",
        "verbs": ["var", "har været", "kom", "er kommet", "drak", "har drukket"],
        "exercises": [
            {
                "title": "Tidspunkter - Sæt 1",
                "instruction": "Husk: Punktet (Datid) er et bestemt tidspunkt. Broen (Førnutid) forbinder fortid og nu.",
                "segments": [
                    { "type": "text", "content": "1. **[I was in the cinema yesterday]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 0, "correct": "var", "options": ["var", "har været"], "explanation": "hintContext" },
                    { "type": "text", "content": " i biografen i går.\\n\\n2. **[I have been in the cinema many times]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 1, "correct": "har været", "options": ["var", "har været"], "explanation": "hintContext" },
                    { "type": "text", "content": " i biografen mange gange.\\n\\n3. **[In 2010 he came to Denmark]**\\nDansk: I 2010 " },
                    { "type": "gap", "id": 2, "correct": "kom", "options": ["kom", "er kommet"], "explanation": "hintContext" },
                    { "type": "text", "content": " han til Danmark.\\n\\n4. **[He has just come to Denmark]**\\nDansk: Han " },
                    { "type": "gap", "id": 3, "correct": "er kommet", "options": ["kom", "er kommet"], "explanation": "hintContext" },
                    { "type": "text", "content": " lige til Danmark.\\n\\n5. **[We drank coffee an hour ago]**\\nDansk: Vi " },
                    { "type": "gap", "id": 4, "correct": "drak", "options": ["drak", "har drukket"], "explanation": "hintContext" },
                    { "type": "text", "content": " kaffe for en time siden." }
                ],
                "phase2_tasks": [
                    { "correct": "var", "definition": "Bruges om en tilstand på et bestemt tidspunkt i fortiden.", "options": ["var", "har været"], "explanation": "Korrekt!" },
                    { "correct": "har været", "definition": "Bruges når vi ser på erfaringen frem til nu.", "options": ["var", "har været"], "explanation": "Korrekt!" },
                    { "correct": "kom", "definition": "Bruges om ankomst på et bestemt årstal eller tidspunkt.", "options": ["kom", "er kommet"], "explanation": "Korrekt!" },
                    { "correct": "er kommet", "definition": "Bruges når handlingen lige er sket og er vigtig nu.", "options": ["kom", "er kommet"], "explanation": "Korrekt!" },
                    { "correct": "drak", "definition": "Bruges om kaffedrikning på et bestemt tidspunkt i fortiden.", "options": ["drak", "har drukket"], "explanation": "Korrekt!" }
                ]
            }
        ]
    }
];
