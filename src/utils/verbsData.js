export const verbsData = [
    {
        "id": "hjaelpe",
        "title": "Hjælpeverber",
        "verbs": ["kan", "skal", "vil", "må", "bør", "lader"],
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
        "title": "Tilstand og navne",
        "verbs": ["er", "bliver", "lever", "bor", "findes", "sker", "har", "får", "betyder", "passer", "koster", "virker", "ligner", "gælder", "hedder"],
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
            },
            {
                "title": "Verden omkring os",
                "instruction": "Vælg det rigtige verbum om tilstande i hverdagen.",
                "segments": [
                    { "type": "text", "content": "1. **[It costs 20 kroner]**\\nDansk: Det " },
                    { "type": "gap", "id": 0, "correct": "koster", "options": ["koster", "passer", "virker", "betyder", "sker"], "explanation": "hintContext" },
                    { "type": "text", "content": " 20 kroner.\\n\\n2. **[What does it mean?]**\\nDansk: Hvad " },
                    { "type": "gap", "id": 1, "correct": "betyder", "options": ["koster", "passer", "virker", "betyder", "sker"], "explanation": "hintContext" },
                    { "type": "text", "content": " det?\\n\\n3. **[The shoes fit well]**\\nDansk: Skoene " },
                    { "type": "gap", "id": 2, "correct": "passer", "options": ["koster", "passer", "virker", "betyder", "sker"], "explanation": "hintContext" },
                    { "type": "text", "content": " godt.\\n\\n4. **[It works fine]**\\nDansk: Det " },
                    { "type": "gap", "id": 3, "correct": "virker", "options": ["koster", "passer", "virker", "betyder", "sker"], "explanation": "hintContext" },
                    { "type": "text", "content": " fint.\\n\\n5. **[What is happening?]**\\nDansk: Hvad " },
                    { "type": "gap", "id": 4, "correct": "sker", "options": ["koster", "passer", "virker", "betyder", "sker"], "explanation": "hintContext" },
                    { "type": "text", "content": " der?" }
                ],
                "phase2_tasks": [
                    { "correct": "koster", "definition": "Prisen på en vare.", "options": ["koster", "passer", "virker", "betyder", "sker"], "explanation": "Korrekt!" },
                    { "correct": "betyder", "definition": "Hvad et ord eller en ting forklarer.", "options": ["koster", "passer", "virker", "betyder", "sker"], "explanation": "Korrekt!" },
                    { "correct": "passer", "definition": "Når tøj eller ting har den rigtige størrelse eller form.", "options": ["koster", "passer", "virker", "betyder", "sker"], "explanation": "Korrekt!" },
                    { "correct": "virker", "definition": "Når noget fungerer som det skal.", "options": ["koster", "passer", "virker", "betyder", "sker"], "explanation": "Korrekt!" },
                    { "correct": "sker", "definition": "Når noget finder sted eller hænder.", "options": ["koster", "passer", "virker", "betyder", "sker"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "bevaegelse",
        "title": "Bevægelse",
        "verbs": ["går", "kører", "rejser", "falder", "stiger", "kommer", "når", "vender", "følger", "fører", "bringer"],
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
            },
            {
                "title": "Ankomst og retning",
                "instruction": "Vælg det rigtige verbum om destinationer.",
                "segments": [
                    { "type": "text", "content": "1. **[He comes tomorrow]**\\nDansk: Han " },
                    { "type": "gap", "id": 0, "correct": "kommer", "options": ["kommer", "når", "vender", "følger", "bringer"], "explanation": "hintContext" },
                    { "type": "text", "content": " i morgen.\\n\\n2. **[I reach the station]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 1, "correct": "når", "options": ["kommer", "når", "vender", "følger", "bringer"], "explanation": "hintContext" },
                    { "type": "text", "content": " stationen klokken 8.\\n\\n3. **[She turns around]**\\nDansk: Hun " },
                    { "type": "gap", "id": 2, "correct": "vender", "options": ["kommer", "når", "vender", "følger", "bringer"], "explanation": "hintContext" },
                    { "type": "text", "content": " sig om.\\n\\n4. **[Follow the path]**\\nDansk: " },
                    { "type": "gap", "id": 3, "correct": "Følg", "options": ["Følg", "Bring", "Vend", "Kom", "Nå"], "explanation": "hintContext" },
                    { "type": "text", "content": " stien.\\n\\n5. **[Bring the coffee]**\\nDansk: " },
                    { "type": "gap", "id": 4, "correct": "Bring", "options": ["Følg", "Bring", "Vend", "Kom", "Nå"], "explanation": "hintContext" },
                    { "type": "text", "content": " kaffen." }
                ],
                "phase2_tasks": [
                    { "correct": "kommer", "definition": "At ankomme til et sted.", "options": ["kommer", "når", "vender", "følger", "bringer"], "explanation": "Korrekt!" },
                    { "correct": "når", "definition": "At nå frem til et mål i tide.", "options": ["kommer", "når", "vender", "følger", "bringer"], "explanation": "Korrekt!" },
                    { "correct": "vender", "definition": "At skifte retning eller dreje om.", "options": ["kommer", "når", "vender", "følger", "bringer"], "explanation": "Korrekt!" },
                    { "correct": "følger", "definition": "At gå bagefter nogen eller rette sig efter noget.", "options": ["følger", "kommer", "når", "vender", "bringer"], "explanation": "Korrekt!" },
                    { "correct": "bringer", "definition": "At tage noget med til et sted eller en person.", "options": ["bringer", "følger", "kommer", "når", "vender"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "interaktion",
        "title": "Sprog og kommunikation",
        "verbs": ["siger", "taler", "svarer", "spørger", "kalder", "beder", "fortæller", "skriver", "læser", "viser", "sender", "hjælper", "møder", "kræver", "sikrer"],
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
            },
            {
                "title": "At læse og skrive",
                "instruction": "Vælg det rigtige verbum om skriftlig kontakt.",
                "segments": [
                    { "type": "text", "content": "1. **[I write an email]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 0, "correct": "skriver", "options": ["skriver", "læser", "sender", "viser", "møder"], "explanation": "hintAction" },
                    { "type": "text", "content": " en e-mail.\\n\\n2. **[I read a book]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 1, "correct": "læser", "options": ["skriver", "læser", "sender", "viser", "møder"], "explanation": "hintAction" },
                    { "type": "text", "content": " en god bog.\\n\\n3. **[I send a package]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 2, "correct": "sender", "options": ["skriver", "læser", "sender", "viser", "møder"], "explanation": "hintAction" },
                    { "type": "text", "content": " en pakke til min mor.\\n\\n4. **[Show me the way]**\\nDansk: " },
                    { "type": "gap", "id": 3, "correct": "Vis", "options": ["Vis", "Send", "Skriv", "Læs", "Mød"], "explanation": "hintAction" },
                    { "type": "text", "content": " mig vej.\\n\\n5. **[I meet a friend]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 4, "correct": "møder", "options": ["skriver", "læser", "sender", "viser", "møder"], "explanation": "hintAction" },
                    { "type": "text", "content": " en ven i eftermiddag." }
                ],
                "phase2_tasks": [
                    { "correct": "skriver", "definition": "At danne tegn eller ord på papir eller skærm.", "options": ["skriver", "læser", "sender", "viser", "møder"], "explanation": "Korrekt!" },
                    { "correct": "læser", "definition": "At forstå ord i en tekst.", "options": ["skriver", "læser", "sender", "viser", "møder"], "explanation": "Korrekt!" },
                    { "correct": "sender", "definition": "At få noget transporteret til en anden (post eller digitalt).", "options": ["skriver", "læser", "sender", "viser", "møder"], "explanation": "Korrekt!" },
                    { "correct": "viser", "definition": "At lade nogen se noget.", "options": ["skriver", "læser", "sender", "viser", "møder"], "explanation": "Korrekt!" },
                    { "correct": "møder", "definition": "At træffe en person på et bestemt sted.", "options": ["skriver", "læser", "sender", "viser", "møder"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "indre_liv",
        "title": "Tanker og følelser",
        "verbs": ["ser", "hører", "mærker", "lyder", "ved", "tror", "mener", "tænker", "synes", "forstår", "kender", "lærer", "tæller", "vælger", "føler", "ønsker", "oplever", "søger"],
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
            },
            {
                "title": "Sanser og læring",
                "instruction": "Vælg det rigtige verbum om at mærke og lære.",
                "segments": [
                    { "type": "text", "content": "1. **[I see you]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 0, "correct": "ser", "options": ["ser", "hører", "lærer", "forstår", "mærker"], "explanation": "hintAction" },
                    { "type": "text", "content": " dig.\\n\\n2. **[I hear the music]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 1, "correct": "hører", "options": ["ser", "hører", "lærer", "forstår", "mærker"], "explanation": "hintAction" },
                    { "type": "text", "content": " musikken.\\n\\n3. **[I am learning Danish]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 2, "correct": "lærer", "options": ["ser", "hører", "lærer", "forstår", "mærker"], "explanation": "hintAction" },
                    { "type": "text", "content": " dansk lige nu.\\n\\n4. **[I understand everything]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 3, "correct": "forstår", "options": ["ser", "hører", "lærer", "forstår", "mærker"], "explanation": "hintAction" },
                    { "type": "text", "content": " det hele.\\n\\n5. **[I feel the heat]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 4, "correct": "mærker", "options": ["ser", "hører", "lærer", "forstår", "mærker"], "explanation": "hintAction" },
                    { "type": "text", "content": " varmen." }
                ],
                "phase2_tasks": [
                    { "correct": "ser", "definition": "At bruge øjnene til at observere.", "options": ["ser", "hører", "lærer", "forstår", "mærker"], "explanation": "Korrekt!" },
                    { "correct": "hører", "definition": "At bruge ørerne til at lytte.", "options": ["ser", "hører", "lærer", "forstår", "mærker"], "explanation": "Korrekt!" },
                    { "correct": "lærer", "definition": "At få ny viden eller færdigheder.", "options": ["ser", "hører", "lærer", "forstår", "mærker"], "explanation": "Korrekt!" },
                    { "correct": "forstår", "definition": "At begribe meningen med noget.", "options": ["ser", "hører", "lærer", "forstår", "mærker"], "explanation": "Korrekt!" },
                    { "correct": "mærker", "definition": "At have en fysisk eller følelsesmæssig fornemmelse.", "options": ["ser", "hører", "lærer", "forstår", "mærker"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "handling",
        "title": "Handling og præstation",
        "verbs": ["gør", "tager", "bruger", "laver", "arbejder", "klarer", "handler", "ændrer", "lægger", "ligger", "sætter", "sidder", "stiller", "står", "holder", "giver", "finder", "trækker", "samler", "slår", "bryder", "bygger", "lukker", "skaber", "begynder", "starter", "fortsætter", "prøver", "forsøger", "venter", "betaler", "køber", "sælger", "vinder", "spiller"],
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
            },
            {
                "title": "Job og indkøb",
                "instruction": "Vælg det rigtige verbum om dagens arbejde og shopping.",
                "segments": [
                    { "type": "text", "content": "1. **[I am working at the office]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 0, "correct": "arbejder", "options": ["arbejder", "betaler", "køber", "sælger", "venter"], "explanation": "hintAction" },
                    { "type": "text", "content": " på kontoret.\\n\\n2. **[I buy milk]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 1, "correct": "køber", "options": ["arbejder", "betaler", "køber", "sælger", "venter"], "explanation": "hintAction" },
                    { "type": "text", "content": " mælk.\\n\\n3. **[I am paying for the bread]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 2, "correct": "betaler", "options": ["arbejder", "betaler", "køber", "sælger", "venter"], "explanation": "hintAction" },
                    { "type": "text", "content": " for brødet.\\n\\n4. **[I am waiting for the bus]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 3, "correct": "venter", "options": ["arbejder", "betaler", "køber", "sælger", "venter"], "explanation": "hintAction" },
                    { "type": "text", "content": " på bussen.\\n\\n5. **[I am playing football]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 4, "correct": "spiller", "options": ["arbejder", "spiller", "køber", "sælger", "venter"], "explanation": "hintAction" },
                    { "type": "text", "content": " fodbold." }
                ],
                "phase2_tasks": [
                    { "correct": "arbejder", "definition": "At udføre sit erhverv eller job.", "options": ["arbejder", "betaler", "køber", "sælger", "venter"], "explanation": "Korrekt!" },
                    { "correct": "køber", "definition": "At anskaffe sig noget mod betaling.", "options": ["arbejder", "betaler", "køber", "sælger", "venter"], "explanation": "Korrekt!" },
                    { "correct": "betaler", "definition": "At give penge for en vare eller tjeneste.", "options": ["arbejder", "betaler", "køber", "sælger", "venter"], "explanation": "Korrekt!" },
                    { "correct": "venter", "definition": "At bruge tid på at noget skal ske (f.eks. bussen).", "options": ["arbejder", "betaler", "køber", "sælger", "venter"], "explanation": "Korrekt!" },
                    { "correct": "spiller", "definition": "At deltage i en sport eller et spil (f.eks. fodbold).", "options": ["arbejder", "spiller", "køber", "sælger", "venter"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "datid_regelm",
        "title": "Datid (regelmæssige)",
        "verbs": ["boede", "spillede", "snakkede", "arbejdede", "lyttede", "vaskede", "ventede", "hentede", "lavede", "købte"],
        "exercises": [
            {
                "title": "Min historie - Sæt 1",
                "instruction": "Vælg det rigtige verbum i regelmæssig datid (-ede eller -te).",
                "segments": [
                    { "type": "text", "content": "1. **[I lived in Odense]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 0, "correct": "boede", "options": ["boede", "bor", "bliver", "arbejdede", "spillede"], "explanation": "hintContext" },
                    { "type": "text", "content": " i Odense sidste år.\\n\\n2. **[We played football]**\\nDansk: Vi " },
                    { "type": "gap", "id": 1, "correct": "spillede", "options": ["boede", "spillede", "spiller", "arbejdede", "lavede"], "explanation": "hintContext" },
                    { "type": "text", "content": " fodbold i tirsdags.\\n\\n3. **[I worked a lot]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 2, "correct": "arbejdede", "options": ["boede", "spillede", "arbejdede", "arbejder", "lavede"], "explanation": "hintContext" },
                    { "type": "text", "content": " meget i går.\\n\\n4. **[I made dinner]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 3, "correct": "lavede", "options": ["lavede", "laver", "boede", "spillede", "arbejdede"], "explanation": "hintContext" },
                    { "type": "text", "content": " mad til hele familien.\\n\\n5. **[I waited for the bus]**\\nDansk: Jeg " },
                    { "type": "gap", "id": 4, "correct": "ventede", "options": ["ventede", "venter", "boede", "spillede", "arbejdede"], "explanation": "hintContext" },
                    { "type": "text", "content": " på bussen i 20 minutter." }
                ],
                "phase2_tasks": [
                    { "correct": "boede", "definition": "At have haft sit hjem et sted i fortiden (regelmæssig).", "options": ["boede", "arbejdede", "spillede", "lavede", "ventede"], "explanation": "Korrekt!" },
                    { "correct": "spillede", "definition": "At have deltaget i leg eller sport i fortiden.", "options": ["boede", "arbejdede", "spillede", "lavede", "ventede"], "explanation": "Korrekt!" },
                    { "correct": "arbejdede", "definition": "At have udført sit job i fortiden.", "options": ["boede", "arbejdede", "spillede", "lavede", "ventede"], "explanation": "Korrekt!" },
                    { "correct": "lavede", "definition": "At have fremstillet noget i fortiden (f.eks. mad).", "options": ["boede", "arbejdede", "spillede", "lavede", "ventede"], "explanation": "Korrekt!" },
                    { "correct": "ventede", "definition": "At have brugt tid på at noget skulle ske i fortiden.", "options": ["boede", "arbejdede", "spillede", "lavede", "ventede"], "explanation": "Korrekt!" }
                ]
            }
        ]
    },
    {
        "id": "datid",
        "title": "Datid (uregelmæssige)",
        "verbs": ["så", "gik", "kom", "tog", "spiste", "drak", "fik", "var", "havde", "skrev", "læste", "sang", "sov", "løb", "sad", "stod"],
        "exercises": [
            {
                "title": "I går - Sæt 1",
                "instruction": "Vælg det rigtige uregelmæssige verbum i datid.",
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
        "title": "Datid vs. Førnutid",
        "verbs": ["var", "har været", "kom", "er kommet", "drak", "har drukket", "har boet", "boede", "har læst", "læste"],
        "exercises": [
            {
                "title": "Punktet eller Broen? - Sæt 1",
                "instruction": "Husk: Punktet (datid) er et bestemt tidspunkt. Broen (førnutid) forbinder fortid og nu.",
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
