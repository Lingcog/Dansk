(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const d of t)if(d.type==="childList")for(const o of d.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function e(t){const d={};return t.integrity&&(d.integrity=t.integrity),t.referrerPolicy&&(d.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?d.credentials="include":t.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function r(t){if(t.ep)return;t.ep=!0;const d=e(t);fetch(t.href,d)}})();const F="/Dansk/",R={da:{selectLanguage:"Vælg sprog",title:"Træning i dansk",subtitle:"Vælg en kategori for at starte din træning.",dagensOpgave:"Dagens opgave",dagensOpgaveDesc:"Nyt emne, ny grammatik. Løs opgaven!",modulTest:"Træning til modultest",modulTestDesc:"Forskellige opgaver samlet på ét sted.",notes:"Undervisningsnoter",notesDesc:"Læs og øv noter fra undervisningen.",lavSporgsmal:"Lav spørgsmål",lavSporgsmalDesc:"Lær at stille præcise spørgsmål ud fra billeder.",lavSporgsmalBtnText:"Lav spørgsmål - tryk her",samtaleTraening:"Samtaletræning",samtaleTraeningDesc:"Øv dine samtaler og få hjælp til dit dansk.",skriveHjaelp:"Skrivehjælp",skriveHjaelpDesc:"Indsæt din tekst og få feedback uden svar.",verbumLearning:"Lær danske verber",verbumLearningDesc:"Træn de 100 mest almindelige danske udsagnsord.",phase2_instruction:"Gæt verbet ud fra definitionen.",back:"Tilbage",enterPassword:"Indtast adgangskode for at se indholdet:",du1mod3:"DU1, modul 3 og 4",du2mod1:"DU2, modul 1",smaahistorier:"Små historier",du2mod5:"DU2, modul 5",emailLaan:"E-mail om lån",opdragelse:"Historie om opdragelse",enKlage:"En klage",du3mod4:"DU3, modul 4",laerEtNytOrd:"Lær et nyt ord",laerEtNytOrdDesc:"Udforsk hvordan ord hænger sammen i netværk.",wordNetworkExplanation:"Ord er forbundet med andre ord. Det hjælper dig til at huske ordet meget bedre, når du ved hvordan ordet er forbundet til andre ord.",targetWord:"Hund",hypernym:"Overbegreb",hypernymWord:"Dyr",synonym:"Synonym",synonymWord:"Vovse",antonym:"Antonym",antonymWord:"Kat",hyponym:"Underbegreb",hyponymWord:"Puddel",geminiBtnText:"Lær et ord - tryk her",geminiConsentText:"Ved at klikke på dette link er du indforstået med at du bruger et af Googles produkter og at Google træner kunstig intelligens med dine svar.",hverdagssamtale:"Hverdagssamtale",hverdagssamtaleDesc:"Øv dig i almindelige samtaler om hverdagen.",samtaleBolig:"Samtale om bolig",samtaleArbejde:"Samtale om arbejde",samtaleBtnText:"Start samtalen - tryk her",skriveHjaelpBtnText:"Skrivehjælp - tryk her",du1mod3Desc:"Vælg et emne at øve.",minHverdag:"Min hverdag",minBolig:"Min bolig",mitArbejde:"Mit arbejde",minHverdagDesc:"Opgaver om din dagligdag.",transportSprogskole:"Transport til sprogskolen",madlavning:"Madlavning",rengoering:"Rengøring",transportDesc:"Hvordan kommer du i skole?",padletDesc:"Del med klassen, hvordan du kommer til sprogskolen i dag.",padletBtnText:"Åbn padlet",madlavningDesc:"Hvad kan du lide at lave af mad?",madlavningPadletDesc:"Del dine madoplevelser med klassen her.",rengoeringDesc:"Hvordan gør du rent?",rengoeringPadletDesc:"Del dine tanker om rengøring med klassen.",traenTidsudtryk:"Træn tidsudtryk",traenTidsudtrykDesc:"Hvordan bruger man forskellige tidsudtryk på dansk?",traenTidsudtrykBtnText:"Åbn tidsudtryk øvelse",ordstilling:"Ordstilling",ordstillingDesc:"Ryk rundt på ordene og sæt dem i den rigtige rækkefølge.",checkResult:"Tjek svar",correctOrder:"Flot! Rækkefølgen er rigtig.",wrongOrder:"Ikke helt rigtigt. Prøv igen!",ordstillingLet:"Ordstilling (let)",ordstillingSvaer:"Ordstilling (mellemsvær)",levelA1:"A1 sætninger",levelA2:"A2 sætninger",traenGrammatik:"Træn grammatik",grammatikDesc:"Udfyld hullerne med de rigtige ord i teksten.",let:"Let (a1)",mellemsvaer:"Mellemsvær (a2)",svaer:"Svær (b1)",modultest:"Modultest",modultestLongDesc:"En længere tekst på 10 linjer. Find de rigtige ord i listen og udfyld hullerne.",grammatikIntro:"Vælg et niveau for at starte øvelsen.",checkAnswers:"Tjek alle svar",allCorrect:"Fantastisk! Alle svar er korrekte.",someWrong:"Nogle af dine svar er ikke helt rigtige. Prøv igen!",newExercise:"Næste tekst",hintMean:"Dette ord giver ikke mening i sammenhængen.",hintTense:"Tjek tiden. Er det nutid eller datid?",hintForm:"Tjek ordets bøjning (f.eks. en/et eller ental/flertal).",hintPerson:"Tjek hvem der gør noget (jeg, du, han/hun).",hintContext:"Læs hele teksten igen. Hvad passer bedst her?",hintName:"Her skal du bruge et ord om navne.",hintPlace:"Her skal du bruge et ord om steder.",hintAction:"Dette ord beskriver en anden handling.",hintAdj:"Tjek tillægsordet (beskrivelse af en ting).",hintAdverb:"Tjek biordet (tid, sted eller måde).",derErDetEr:"Der er / det er?",derErExpl:"Der er' åbner døren for noget nyt. 'Det er' peger på det, vi kender.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Husk: 'Der er' (introduktion) vs 'Det er' (identifikation).",hvilketOrd:"Hvilket ord skal jeg vælge?",hvilketOrdDesc:"Træn pronominer (stedord) og verber (udsagnsord) i forskellige sammenhænge.",hanHamHans:"Han / ham / hans?",gårGikGået:"Går / gik / er gået?",verberM3:"Lær danske verber (nutid)",hvilketVerbDesc:"Vælg en kategori for at træne verber.",pronominerSubjekt:"Subjekt (fokus)",pronominerObjekt:"Objekt (ikke-fokus)",pronominerPossessiv:"Possessiv (ejer)",verberBevaegelse:"Bevægelse (gå, køre, komme)",verberHandling:"Handling (gøre, lave, bruge)",verberHjaelpe:"Hjælpeverber (kan, skal, vil)",verberTilstand:"Tilstand & besiddelse (er, har)",verberInteraktion:"Social interaktion (sige, spørge)",verberIndreLiv:"Det indre liv (se, tænke, vide)",verberDatid:"Datid (uregelmæssige)",verberDatidRegelm:"Datid (regelmæssige)",verberTider:"Datid vs. Førnutid (punktet & broen)",hintPronominer:"Tjek hvem der er i fokus eller hvem der ejer noget.",howToBuildSentence:"Hvordan bygger man en sætning?",howToBuildSentenceDesc:"Lær hvordan ord ankres til virkeligheden.",groundingIntro:"Uden grammatik svæver ord frit som balloner. Vi bruger grammatik til at ankre dem til virkeligheden (her og nu).",groundingStep1:"1. Konceptet (ballonen): 'Barn' er bare en idé. Vi ved ikke hvilket barn.",groundingStep2:"2. Handlingen: 'At spise' er bare en idé. Vi ved ikke hvornår.",groundingStep3:"3. Ankeret: Brug små ord (kendeord) og tid (bøjning) til at trække ballonerne ned.",sentenceGround:"Virkelighedens jord",wellDone:"Flot! Du har nu bygget en sætning, der er forankret i virkeligheden.",finitenessTitle:"Hvorfor bøjer vi kun det første ord?",finitenessDesc:"Det første ord (modalverbet) placerer sætningen i tid på tidslinjen. Det næste ord har kun fokus på selve handlingen.",timelineLabel:"Tidslinjen (Her forankres kraften)",actionLabel:"Handlingen (Selve aktiviteten)",nowLabel:"Nutid (Nu)",pastLabel:"Datid (Da)",finitenessExpl:"Læg mærke til: Kun det første ord bevæger sig på tidslinjen. Handlingen (spise) er den samme uanset tid.",adjectiveTitle:"Hvad slags barn?",adjectiveDesc:"Adjektiver er som en projektør, der lyser på et ord og giver det mere farve eller detalje.",adjectiveLabel:"Projektøren (Detalje)",adjectiveExpl:"Læg mærke til: Adjektivets form ændrer sig efter ordet foran (Et stort / Mit store).",nextStepAdjective:"Næste øvelse: Adjektiver ↓",adjectiveTeaser:"Hvordan kan vi beskrive barnet? Altså hvordan kan vi beskrive verden omkring os?",agreementTitle:"Hvad bestemmer bøjningen?",agreementDesc:"Substantivet (navneordet) bestemmer, hvilken endelse adjektivet skal have.",ubestemtLabel:"Ubestemt (Et / En)",bestemtLabel:"Bestemt (Det / Den)",agreementExpl:"Når vi taler om noget <strong>bestemt</strong>, tilføjer vi et <strong>-e</strong>. Omvendt bestemmer <em>Et barn</em>, at der skal et <strong>-t</strong> på (et stort barn).",exampleBarn:"barn",exampleBil:"bil",practiceMoreTitle:"Vil du øve mere?",adjectiveComparisonLink:"Adjektiver - stor / større / størst",adverbTeaser:"Hvordan beskriver vi en HANDLING? Altså hvordan kan vi beskrive måden vi gør ting på?",nextStepAdverb:"Næste øvelse: Adverbier ↓",adverbTitle:"Hvordan beskriver vi en handling?",adverbDesc:"Adverbiet fortæller os noget om, hvordan handlingen (verbet) bliver gjort.",adverbExpl:"Læg mærke til, hvordan det valgte ord beskriver <em>måden</em> barnet spiser på. Det giver liv og detaljer til handlingen!",nextStepAfterAdverb:"Næste skridt: Konjunktioner ↓",adverbTeaserNext:"Hvordan kan vi forbinde to tanker? Lad os se på konjunktioner.",conjunctionTitle:"Hvorfor forbinder vi sætninger?",conjunctionDesc:"Konjunktioner er som lim, der binder to tanker sammen og skaber dynamik og flow.",conjunctionExpl:"Læg mærke til, hvordan det lille ord (konjunktionen) ændrer flowet mellem dine tanker.",conjunctionTeaser:"Hvad sker der når vi sætter to ting sammen? Kan vi forklare hvorfor, hvornår eller trods noget?",sentence2_fordi:"det er sultent",sentence2_naar:"solen skinner",sentence2_da:"det blev mørkt",sentence2_selvom:"det ikke må",sentence2_alligevel:"det er svært",sentence2_men:"det er snart færdigt",sentence2_derfor:"er tallerkenen tom",conjExpl_fordi:"Pilen bevæger sig fra venstre mod højre for at pege på <strong>årsagen</strong> (hvorfor spiser barnet?).",conjExpl_derfor:"Pilen bevæger sig fra højre mod venstre for at pege <strong>tilbage</strong> på årsagen i den første sætning.",conjExpl_da:"Uret bevæger sig mod venstre for at vise, at noget skete én gang i <strong>fortiden</strong>.",conjExpl_naar:"Uret bevæger sig mod højre for at vise en <strong>fremtidig</strong> handling eller noget der sker <strong>hver gang</strong> (vane).",conjExpl_selvom:"Forhindringen må dele sig, fordi 'indrømmelsen' (selvom) lader handlingen ske <strong>trods modstand</strong>.",conjExpl_alligevel:"Pilen bevæger sig ufortrødent <strong>gennem</strong> forhindringen for at vise, at handlingen sker på trods af alt.",conjExpl_men:"Buen over forhindringen viser et skift eller en <strong>modsætning</strong> mellem to forskellige tanker.",conjunctionPracticeLink:"Konjunktioner - men, fordi og når",conjunctionClosingReflection:"Nu har du set hvordan vi med grammatik kan konstruere og sætte ord på vores opfattelse af virkeligheden.",nextStepAfterConjunction:"Afslut øvelse",adjComparisonTitle:"Adjektiver - stor / større / størst",adjComparisonDesc:"Hvordan sammenligner vi ting? Klik på træerne for at se hvordan adjektiver bøjes i grader.",positiveLabel:"Positiv",comparativeLabel:"Komparativ",superlativeLabel:"Superlativ",verbExerciseSubtitle:"Bøj udsagnsord i nutid og datid.",advChoiceTitle:"Måske / godt / ikke",advChoiceDesc:"Træn brugen af centrale adverbier i forskellige sætninger.",adverbChoice:"Måske / godt / ikke",soedSoedereSoedest:"Adjektiver - stor / større / størst"},en:{selectLanguage:"Select language",title:"Danish Training",subtitle:"Select a category to start your training.",dagensOpgave:"Daily Task",dagensOpgaveDesc:"New topic, new grammar. Solve the task!",modulTest:"Module Test Training",modulTestDesc:"Various tasks gathered in one place.",notes:"Teaching Notes",notesDesc:"Read and practice notes from class.",lavSporgsmal:"Make Questions",lavSporgsmalDesc:"Learn to ask precise questions based on pictures.",lavSporgsmalBtnText:"Make questions - click here",samtaleTraening:"Conversation Training",samtaleTraeningDesc:"Practice conversations and get help with your Danish.",skriveHjaelp:"Writing Help",skriveHjaelpDesc:"Insert your text and get feedback without answers.",back:"Back",enterPassword:"Enter password to view content:",du1mod3:"DU1, Module 3 and 4",du2mod1:"DU2, Module 1",smaahistorier:"Short stories",du2mod5:"DU2, Module 5",emailLaan:"E-mail about loan",opdragelse:"Story about upbringing",enKlage:"A complaint",du3mod4:"DU3, Module 4",laerEtNytOrd:"Learn a new word",laerEtNytOrdDesc:"Explore how words are connected in networks.",wordNetworkExplanation:"Words are connected to other words. It helps you remember the word much better when you know how the word is connected to other words.",targetWord:"Dog",hypernym:"Hypernym",hypernymWord:"Animal",synonym:"Synonym",synonymWord:"Doggie",antonym:"Antonym",antonymWord:"Cat",hyponym:"Hyponym",hyponymWord:"Poodle",geminiBtnText:"Learn a word - click here",geminiConsentText:"By clicking this link, you agree that you are using a Google product and that Google trains artificial intelligence with your responses.",hverdagssamtale:"Everyday Conversation",hverdagssamtaleDesc:"Practice common everyday conversations.",samtaleBolig:"Conversation about housing",samtaleArbejde:"Conversation about work",samtaleBtnText:"Start conversation - click here",skriveHjaelpBtnText:"Writing help - click here",du1mod3Desc:"Choose a topic to practice.",minHverdag:"My everyday life",minBolig:"My housing",mitArbejde:"My work",minHverdagDesc:"Tasks about your daily life.",transportSprogskole:"Transport to language school",madlavning:"Cooking",rengoering:"Cleaning",transportDesc:"How do you get to school?",padletDesc:"Share with the class how you get to language school today.",padletBtnText:"Open Padlet",madlavningDesc:"What kind of food do you like to cook?",madlavningPadletDesc:"Share your cooking experiences with the class here.",rengoeringDesc:"How do you clean?",rengoeringPadletDesc:"Share your thoughts on cleaning with the class.",traenTidsudtryk:"Practice time expressions",traenTidsudtrykDesc:"How do you use different time expressions in Danish?",traenTidsudtrykBtnText:"Open time expressions exercise",ordstilling:"Word Order",ordstillingDesc:"Rearrange the words and put them in the correct order.",checkResult:"Check answer",correctOrder:"Great! The order is correct.",wrongOrder:"Not quite right. Try again!",ordstillingLet:"Word Order (Easy)",ordstillingSvaer:"Word Order (Medium)",levelA1:"A1 sentences",levelA2:"A2 sentences",traenGrammatik:"Practice Grammar",grammatikDesc:"Fill in the blanks with the correct words in the text.",let:"Easy (A1)",mellemsvaer:"Medium (A2)",svaer:"Hard (B1)",modultest:"Module Test",modultestLongDesc:"A longer 10-line text. Find the correct words in the list and fill in the blanks.",grammatikIntro:"Select a level to start the exercise.",checkAnswers:"Check all answers",allCorrect:"Fantastic! All answers are correct.",someWrong:"Some of your answers are not quite right. Try again!",newExercise:"Next text",hintMean:"This word doesn't make sense in this context.",hintTense:"Check the tense. Is it present or past?",hintForm:"Check the word form (e.g., gender or singular/plural).",hintPerson:"Check who is performing the action (I, you, he/she).",hintContext:"Read the whole text again. What fits best here?",hintName:"You need a word for names here.",hintPlace:"You need a word for places here.",hintAction:"This word describes a different action.",hintAdj:"Check the adjective (description of a thing).",hintAdverb:"Check the adverb (time, place, or manner).",derErDetEr:"Der er / Det er?",derErExpl:"'Der er' opens the door for new info. 'Det er' points to what we know.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Remember: 'Der er' (intro) vs 'Det er' (identification).",hvilketOrd:"Which word should I choose?",hvilketOrdDesc:"Practice pronouns and verbs in different contexts.",hanHamHans:"He / Him / His?",gårGikGået:"Go / went / has gone?",verberM3:"Learn Danish Verbs (Present)",hvilketVerbDesc:"Choose a category to practice verbs.",pronominerSubjekt:"Subject (Focus)",pronominerObjekt:"Object (Non-focus)",pronominerPossessiv:"Possessive (Owner)",verberBevaegelse:"Movement (go, drive, come)",verberHandling:"Action (do, make, use)",verberHjaelpe:"Helping Verbs (can, must, will)",verberTilstand:"State & Possession (be, have)",verberInteraktion:"Social Interaction (say, ask)",verberIndreLiv:"Inner Life (see, think, know)",verberDatid:"Past Tense (irregular)",verberDatidRegelm:"Past Tense (regular)",verberTider:"Past vs. Present Perfect (The Point & The Bridge)",hintPronominer:"Check who is in focus or who owns something.",howToBuildSentence:"How to build a sentence?",howToBuildSentenceDesc:"Learn how words are anchored to reality.",groundingIntro:"Without grammar, words float freely like balloons. We use grammar to anchor them to reality (HERE AND NOW).",groundingStep1:"1. The Concept (Balloon): 'Child' is just an idea. We don't know which child.",groundingStep2:"2. The Action: 'To eat' is just an idea. We don't know when.",groundingStep3:"3. The Anchor: Use small words (determiners) and tense (inflection) to pull the balloons down.",sentenceGround:"The ground of reality",wellDone:"Well done! You have now built a sentence anchored in reality.",conjExpl_fordi:"The arrow moves from left to right to point at the <strong>cause</strong> (why is the child eating?).",conjExpl_derfor:"The arrow moves from right to left to point <strong>back</strong> to the cause in the first sentence.",conjExpl_da:"The clock moves left to show that something happened once in the <strong>past</strong>.",conjExpl_naar:"The clock moves right to show a <strong>future</strong> action or something that happens <strong>every time</strong> (habit).",conjExpl_selvom:"The obstacle must split because the 'concession' (selvom) lets the action happen <strong>despite resistance</strong>.",conjExpl_alligevel:"The arrow moves undeterred <strong>through</strong> the obstacle to show that the action happens despite everything.",conjExpl_men:"The arc over the obstacle shows a shift or a <strong>contrast</strong> between two different thoughts.",conjunctionPracticeLink:"Conjunctions - but, because, and when",conjunctionClosingReflection:"Now you have seen how we use grammar to construct and articulate our perception of reality.",adjComparisonTitle:"Adjectives - big / bigger / biggest",adjComparisonDesc:"How do we compare things? Click on the trees to see how adjectives are inflected in degrees.",positiveLabel:"Positive",comparativeLabel:"Comparative",superlativeLabel:"Superlative",verbExerciseSubtitle:"Conjugate verbs in present and past tense.",advChoiceTitle:"Maybe / well / not",advChoiceDesc:"Practice using key adverbs in different sentences.",soedSoedereSoedest:"Adjectives - big / bigger / biggest"},de:{selectLanguage:"Sprache auswählen",title:"Dänisch Training",subtitle:"Wählen Sie eine Kategorie, um Ihr Training zu starten.",dagensOpgave:"Tägliche Aufgabe",dagensOpgaveDesc:"Neues Thema, neue Grammatik. Lösen Sie die Aufgabe!",modulTest:"Modultest-Training",modulTestDesc:"Verschiedene Aufgaben an einem Ort gesammelt.",notes:"Unterrichtsnotizen",notesDesc:"Lesen und üben Sie Notizen aus dem Unterricht.",lavSporgsmal:"Fragen stellen",lavSporgsmalDesc:"Lernen Sie, präzise Fragen anhand von Bildern zu stellen.",lavSporgsmalBtnText:"Fragen stellen - hier klicken",samtaleTraening:"Konversationstraining",samtaleTraeningDesc:"Üben Sie Konversationen und erhalten Sie Hilfe bei Ihrem Dänisch.",skriveHjaelp:"Schreibhilfe",skriveHjaelpDesc:"Fügen Sie Ihren Text ein und erhalten Sie Feedback ohne Antworten.",back:"Zurück",enterPassword:"Passwort eingeben, um den Inhalt anzuzeigen:",du1mod3:"DU1, Modul 3 und 4",du2mod1:"DU2, Modul 1",smaahistorier:"Kurzgeschichten",du2mod5:"DU2, Modul 5",emailLaan:"E-Mail über Kredit",opdragelse:"Geschichte über Erziehung",enKlage:"Eine Beschwerde",du3mod4:"DU3, Modul 4",laerEtNytOrd:"Ein neues Wort lernen",laerEtNytOrdDesc:"Entdecken Sie, wie Wörter in Netzwerken verbunden sind.",wordNetworkExplanation:"Wörter sind mit anderen Wörtern verbunden. Es hilft Ihnen, das Wort viel besser zu merken, wenn Sie wissen, wie das Wort mit anderen Wörtern verbunden ist.",targetWord:"Hund",hypernym:"Oberbegriff",hypernymWord:"Tier",synonym:"Synonym",synonymWord:"Hündchen",antonym:"Antonym",antonymWord:"Katze",hyponym:"Unterbegriff",hyponymWord:"Pudel",geminiBtnText:"Ein Wort lernen - hier klicken",geminiConsentText:"Durch Klicken auf diesen Link stimmen Sie zu, dass Sie ein Google-Produkt verwenden und dass Google künstliche Intelligenz mit Ihren Antworten trainiert.",hverdagssamtale:"Alltagskonversation",hverdagssamtaleDesc:"Üben Sie alltägliche Gespräche.",samtaleBolig:"Gespräch über Wohnen",samtaleArbejde:"Gespräch über Arbeit",samtaleBtnText:"Konversation starten - hier klicken",skriveHjaelpBtnText:"Schreibhilfe - hier klicken",du1mod3Desc:"Wählen Sie ein Thema zum Üben.",minHverdag:"Mein Alltag",minBolig:"Meine Wohnung",mitArbejde:"Meine Arbeit",minHverdagDesc:"Aufgaben zu Ihrem täglichen Leben.",transportSprogskole:"Transport zur Sprachschule",madlavning:"Kochen",rengoering:"Reinigung",transportDesc:"Wie kommen Sie zur Schule?",padletDesc:"Teilen Sie mit der Klasse, wie Sie heute zur Sprachschule kommen.",padletBtnText:"Padlet öffnen",madlavningDesc:"Welche Art von Essen kochen Sie gerne?",madlavningPadletDesc:"Teilen Sie hier Ihre Kocherlebnisse mit der Klasse.",rengoeringDesc:"Wie reinigen Sie?",rengoeringPadletDesc:"Teilen Sie Ihre Gedanken zur Reinigung mit der Klasse.",traenTidsudtryk:"Zeitangaben üben",traenTidsudtrykDesc:"Wie verwendet man verschiedene Zeitangaben im Dänischen?",traenTidsudtrykBtnText:"Zeitangaben-Übung öffnen",ordstilling:"Wortstellung",ordstillingDesc:"Ordnen Sie die Wörter neu an und bringen Sie sie in die richtige Reihenfolge.",checkResult:"Antwort überprüfen",correctOrder:"Großartig! Die Reihenfolge ist richtig.",wrongOrder:"Nicht ganz richtig. Versuchen Sie es noch einmal!",ordstillingLet:"Wortstellung (Leicht)",ordstillingSvaer:"Wortstellung (Mittel)",levelA1:"A1 Sätze",levelA2:"A2 Sätze",traenGrammatik:"Grammatik üben",grammatikDesc:"Füllen Sie die Lücken im Text mit den richtigen Wörtern aus.",let:"Leicht (A1)",mellemsvaer:"Mittel (A2)",svaer:"Schwer (B1)",modultest:"Modultest",modultestLongDesc:"Ein längerer 10-zeiliger Text. Finden Sie die richtigen Wörter in der Liste und füllen Sie die Lücken aus.",grammatikIntro:"Wählen Sie ein Niveau, um die Übung zu starten.",checkAnswers:"Alle Antworten überprüfen",allCorrect:"Fantastisch! Alle Antworten sind richtig.",someWrong:"Einige Ihrer Antworten sind nicht ganz richtig. Versuchen Sie es noch einmal!",newExercise:"Nächster Text",hintMean:"Dieses Wort ergibt in diesem Kontext keinen Sinn.",hintTense:"Überprüfen Sie die Zeitform. Ist es Präsens oder Präteritum?",hintForm:"Überprüfen Sie die Wortform (z.B. Geschlecht oder Singular/Plural).",hintPerson:"Überprüfen Sie, wer die Handlung ausführt (ich, du, er/sie).",hintContext:"Lesen Sie den gesamten Text noch einmal. Was passt hier am besten?",hintName:"Hier benötigen Sie ein Wort für Namen.",hintPlace:"Hier benötigen Sie ein Wort für Orte.",hintAction:"Dieses Wort beschreibt eine andere Handlung.",hintAdj:"Überprüfen Sie das Adjektiv (Beschreibung einer Sache).",hintAdverb:"Überprüfen Sie das Adverb (Zeit, Ort oder Art und Weise).",derErDetEr:"Der er / Det er?",derErExpl:"'Der er' öffnet die Tür für neue Informationen. 'Det er' verweist auf das, was wir kennen.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Merke: 'Der er' (Einführung) vs 'Det er' (Identifikation).",hvilketOrd:"Welches Wort soll ich wählen?",hvilketOrdDesc:"Üben Sie Pronomen und Verben in verschiedenen Kontexten.",hanHamHans:"Er / ihn / sein?",gårGikGået:"Gehen / ging / gegangen?",verberM3:"Dänische Verben lernen (Präsens)",hvilketVerbDesc:"Wählen Sie eine Kategorie, um Verben zu üben.",pronominerSubjekt:"Subjekt (Fokus)",pronominerObjekt:"Objekt (Nicht-Fokus)",pronominerPossessiv:"Possessiv (Besitzer)",verberBevaegelse:"Bewegung (gehen, fahren, kommen)",verberHandling:"Handlung (tun, machen, benutzen)",verberHjaelpe:"Hilfsverben (können, sollen, wollen)",verberTilstand:"Zustand & Besitz (sein, haben)",verberInteraktion:"Soziale Interaktion (sagen, fragen)",verberIndreLiv:"Inneres Leben (sehen, denken, wissen)",verberDatid:"Vergangenheit (unregelmäßig)",verberTider:"Vergangenheit vs. Perfekt (Der Punkt & Die Brücke)",hintPronominer:"Überprüfen Sie, wer im Fokus steht oder wem etwas gehört.",howToBuildSentence:"Wie baut man einen Satz?",howToBuildSentenceDesc:"Lernen Sie, wie Wörter in der Realität verankert werden.",groundingIntro:"Ohne Grammatik schweben Wörter frei wie Ballons. Wir verwenden Grammatik, um sie in der Realität (HIER UND JETZT) zu verankern.",groundingStep1:"1. Das Konzept (Ballon): 'Kind' ist nur eine Idee. Wir wissen nicht, welches Kind.",groundingStep2:"2. Die Handlung: 'Essen' ist nur eine Idee. Wir wissen nicht, wann.",groundingStep3:"3. Der Anker: Verwenden Sie kleine Wörter (Artikel) und Zeit (Beugung), um die Ballons herunterzuziehen.",sentenceGround:"Der Boden der Realität",wellDone:"Gut gemacht! Sie haben nun einen Satz gebaut, der in der Realität verankert ist.",finitenessTitle:"Warum beugen wir nur das erste Wort?",finitenessDesc:"Das erste Wort (das Modalverb) platziert den Satz zeitlich auf der Zeitachse. Das nächste Wort konzentriert sich nur auf die Handlung selbst.",timelineLabel:"Die Zeitachse (Hier wird die Kraft verankert)",actionLabel:"Die Handlung (Die Aktivität selbst)",nowLabel:"Gegenwart (Jetzt)",pastLabel:"Vergangenheit (Damals)",finitenessExpl:"Beachten Sie: Nur das erste Wort bewegt sich auf der Zeitachse. Die Handlung (essen) ist unabhängig von der Zeit dieselbe.",adjectiveTitle:"Was für ein Kind?",adjectiveDesc:"Adjektive sind wie ein Scheinwerfer, der ein Wort beleuchtet und ihm mehr Farbe oder Details verleiht.",adjectiveLabel:"Der Scheinwerfer (Detail)",adjectiveExpl:"Beachten Sie: Die Form des Adjektivs ändert sich je nach dem Wort davor (Et stort / Mit store).",nextStepAdjective:"Nächste Übung: Adjektive ↓",adjectiveTeaser:"Wie können wir das Kind beschreiben? Also, wie können wir die Welt um uns herum beschreiben?",agreementTitle:"Was bestimmt die Beugung?",agreementDesc:"Das Substantiv bestimmt, welche Endung das Adjektiv haben soll.",ubestemtLabel:"Unbestimmt (Ein / Eine)",bestemtLabel:"Bestimmt (Das / Die)",agreementExpl:"Wenn wir über etwas <strong>Bestimmtes</strong> sprechen, fügen wir ein <strong>-e</strong> hinzu. Umgekehrt bestimmt <em>Et barn</em>, dass ein <strong>-t</strong> angehängt werden muss (et stort barn).",exampleBarn:"Kind",exampleBil:"Auto",practiceMoreTitle:"Möchten Sie mehr üben?",adjectiveComparisonLink:"Adjektiver - stor / større / størst",adverbTeaser:"Wie beschreiben wir eine HANDLUNG? Also, wie können wir die Art und Weise beschreiben, wie wir Dinge tun?",nextStepAdverb:"Nächste Übung: Adverbien ↓",adverbTitle:"Wie beschreiben wir eine Handlung?",adverbDesc:"Das Adverb sagt uns etwas darüber, wie die Handlung (das Verb) ausgeführt wird.",adverbExpl:"Beachten Sie, wie das gewählte Wort die <em>Art und Weise</em> beschreibt, wie das Kind isst. Es verleiht der Handlung Leben und Details!",nextStepAfterAdverb:"Nächster Schritt: Konjunktionen ↓",adverbTeaserNext:"Wie können wir zwei Gedanken verbinden? Schauen wir uns Konjunktionen an.",conjunctionTitle:"Warum verbinden wir Sätze?",conjunctionDesc:"Konjunktionen sind wie Klebstoff, der zwei Gedanken miteinander verbindet und Dynamik und Fluss erzeugt.",conjunctionExpl:"Beachten Sie, wie das kleine Wort (die Konjunktion) den Fluss zwischen Ihren Gedanken verändert.",conjunctionTeaser:"Was passiert, wenn wir zwei Dinge zusammenfügen? Können wir erklären, warum, wann oder trotz etwas?",sentence2_fordi:"es hungrig ist",sentence2_naar:"die Sonne scheint",sentence2_da:"es dunkel wurde",sentence2_selvom:"es nicht darf",sentence2_alligevel:"es schwierig ist",sentence2_men:"es ist bald fertig",sentence2_derfor:"ist der Teller leer",conjExpl_fordi:"Der Pfeil bewegt sich von links nach rechts, um auf die <strong>Ursache</strong> zu zeigen (warum isst das Kind?).",conjExpl_derfor:"Der Pfeil bewegt sich von rechts nach links, um <strong>zurück</strong> auf die Ursache im ersten Satz zu zeigen.",conjExpl_da:"Die Uhr bewegt sich nach links, um zu zeigen, dass etwas einmal in der <strong>Vergangenheit</strong> geschah.",conjExpl_naar:"Die Uhr bewegt sich nach rechts, um eine <strong>zukünftige</strong> Handlung oder etwas zu zeigen, das <strong>jedes Mal</strong> passiert (Gewohnheit).",conjExpl_selvom:"Das Hindernis muss sich teilen, weil die 'Einräumung' (selvom) die Handlung <strong>trotz Widerstand</strong> geschehen lässt.",conjExpl_alligevel:"Der Pfeil bewegt sich unverdrossen <strong>durch</strong> das Hindernis, um zu zeigen, dass die Handlung trotz allem geschieht.",conjExpl_men:"Der Bogen über dem Hindernis zeigt einen Wechsel oder einen <strong>Gegensatz</strong> zwischen zwei verschiedenen Gedanken.",conjunctionPracticeLink:"Konjunktionen - aber, weil und wenn",conjunctionClosingReflection:"Nun haben Sie gesehen, wie wir mit Grammatik unsere Wahrnehmung der Realität konstruieren und ausdrücken können.",nextStepAfterConjunction:"Übung beenden",adjComparisonTitle:"Adjektiver - stor / større / størst",adjComparisonDesc:"Wie vergleichen wir Dinge? Klicken Sie auf die Bäume, um zu sehen, wie Adjektive in Graden gebeugt werden.",positiveLabel:"Positiv",comparativeLabel:"Komparativ",superlativeLabel:"Superlativ",verbExerciseSubtitle:"Verben im Präsens und Präteritum konjugieren.",advChoiceTitle:"Vielleicht / gut / nicht",advChoiceDesc:"Üben Sie die Verwendung wichtiger Adverbien in verschiedenen Sätzen."},ar:{selectLanguage:"اختر لغة",title:"التدريب على الدنماركية",subtitle:"اختر فئة لبدء التدريب الخاص بك.",dagensOpgave:"المهمة اليومية",dagensOpgaveDesc:"موضوع جديد، قواعد جديدة. حل المهمة!",modulTest:"تدريب اختبار الوحدة",modulTestDesc:"مهام مختلفة مجمعة في مكان واحد.",notes:"ملاحظات التدريس",notesDesc:"اقرأ وتدرب على الملاحظات من الفصل.",lavSporgsmal:"طرح أسئلة",lavSporgsmalDesc:"تعلم طرح أسئلة دقيقة بناءً على الصور.",lavSporgsmalBtnText:"طرح الأسئلة - اضغط هنا",samtaleTraening:"تدريب المحادثة",samtaleTraeningDesc:"تمرن على المحادثات واحصل على مساعدة في الدنماركية.",skriveHjaelp:"مساعدة في الكتابة",skriveHjaelpDesc:"أدخل نصك واحصل على ملاحظات بدون إجابات.",back:"رجوع",du1mod3:"DU1، الوحدة 3 و 4",du2mod1:"DU2، الوحدة 1",du3mod4:"DU3، الوحدة 4",laerEtNytOrd:"تعلم كلمة جديدة",laerEtNytOrdDesc:"استكشف كيف ترتبط الكلمات في شبكات.",wordNetworkExplanation:"الكلمات مرتبطة بكلمات أخرى. يساعدك ذلك على تذكر الكلمة بشكل أفضل عندما تعرف كيف ترتبط الكلمة بكلمات أخرى.",targetWord:"كلب",hypernym:"مفهوم شامل (Hypernym)",hypernymWord:"حيوان",synonym:"مرادف",synonymWord:"كلب صغير",antonym:"مضاد",antonymWord:"قطة",hyponym:"مفهوم فرعي (Hyponym)",hyponymWord:"بودل",geminiBtnText:"تعلم كلمة - اضغط هنا",geminiConsentText:"بالنقر على هذا الرابط، فإنك توافق على استخدامك لمنتج من Google وأن Google تقوم بتدريب الذكاء الاصطناعي باستخدام إجاباتك.",hverdagssamtale:"محادثة يومية",hverdagssamtaleDesc:"تدرب على المحادثات اليومية الشائعة.",samtaleBolig:"محادثة حول السكن",samtaleArbejde:"محادثة حول العمل",samtaleBtnText:"ابدأ المحادثة - اضغط هنا",skriveHjaelpBtnText:"مساعدة في الكتابة - اضغط هنا",du1mod3Desc:"اختر موضوعًا للتدرب عليه.",minHverdag:"حياتي اليومية",minBolig:"سكني",mitArbejde:"عملي",minHverdagDesc:"مهام حول حياتك اليومية.",transportSprogskole:"النقل إلى مدرسة اللغة",madlavning:"طبخ",rengoering:"تنظيف",transportDesc:"كيف تذهب إلى المدرسة؟",padletDesc:"شارك مع الفصل كيف تذهب إلى مدرسة اللغة اليوم.",padletBtnText:"افتح بادليت",madlavningDesc:"ما نوع الطعام الذي تحب طهيه؟",madlavningPadletDesc:"شارك تجارب الطبخ الخاصة بك مع الفصل هنا.",rengoeringDesc:"كيف تنظف؟",rengoeringPadletDesc:"شارك أفكارك حول التنظيف مع الفصل.",traenTidsudtryk:"تدريب تعبيرات الوقت",traenTidsudtrykDesc:"كيف تستخدم تعبيرات الوقت المختلفة باللغة الدنماركية؟",traenTidsudtrykBtnText:"افتح تمرين تعبيرات الوقت",ordstilling:"ترتيب الكلمات",ordstillingDesc:"قم بإعادة ترتيب الكلمات ووضعها في الترتيب الصحيح.",checkResult:"تحقق من الإجابة",correctOrder:"رائع! الترتيب صحيح.",wrongOrder:"ليس تماماً. حاول مرة أخرى!",ordstillingLet:"ترتيب الكلمات (سهل)",ordstillingSvaer:"ترتيب الكلمات (صعب)",levelA1:"جمل A1",levelA2:"جمل A2",traenGrammatik:"تدريب القواعد",grammatikDesc:"املاً الفراغات بالكلمات الصحيحة في النص.",let:"سهل (A1)",mellemsvaer:"متوسط (A2)",svaer:"صعب (B1)",grammatikIntro:"اختر مستوى لبدء التمرين.",checkAnswers:"تحقق من جميع الإجابات",allCorrect:"رائع! جميع الإجابات صحيحة.",someWrong:"بعض إجاباتك ليست صحيحة تمامًا. حاول مرة أخرى!",newExercise:"النص التالي",hintMean:"هذه الكلمة لا معنى لها في هذا السياق.",hintTense:"تحقق من الزمن. هل هو مضارع أم ماضٍ؟",hintForm:"تحقق من صيغة الكلمة (مثل الجنس أو المفرد/الجمع).",hintPerson:"تحقق من يقوم بالفعل (أنا، أنت، هو/هي).",hintContext:"اقرأ النص بالكامل مرة أخرى. ما هو الأنسب هنا؟",hintName:"أنت بحاجة إلى كلمة للأسماء هنا.",hintPlace:"أنت بحاجة إلى كلمة للأماكن هنا.",hintAction:"هذه الكلمة تصف فعلاً مختلفاً.",hintAdj:"تحقق من الصفة (وصف لشيء ما).",hintAdverb:"تحقق من الظرف (الزمان أو المكان أو الطريقة).",hintConj:"تحقق من حرف العطف (يربط بين جملتين).",filled:"تمت تعبئته",verbExerciseSubtitle:"صرف الأفعال في المضارع والماضي.",advChoiceTitle:"ربما / جيداً / لا",advChoiceDesc:"تدرب على استخدام الظروف الرئيسية في جمل مختلفة."},ur:{selectLanguage:"زبان منتخب کریں",title:"دانش کی تربیت",subtitle:"تربیت شروع کرنے کے لیے ایک زمرہ منتخب کریں۔",dagensOpgave:"آج کا کام",dagensOpgaveDesc:"نیا موضوع، نئی گرامر۔ کام حل کریں!",modulTest:"ماڈیول ٹیسٹ کی تربیت",modulTestDesc:"مختلف کام ایک ہی جگہ پر جمع ہیں۔",notes:"تدریسی نوٹس",notesDesc:"کلاس کے نوٹس پڑھیں اور ان کی مشق کریں۔",lavSporgsmal:"سوالات بنائیں",lavSporgsmalDesc:"تصاویر کی بنیاد پر درست سوالات پوچھنا سیکھیں۔",lavSporgsmalBtnText:"سوالات بنائیں - یہاں کلک کریں",samtaleTraening:"گفتگو کی تربیت",samtaleTraeningDesc:"اپنی گفتگو کی مشق کریں اور اپنی دانش میں مدد حاصل کریں۔",skriveHjaelp:"لکھنے میں مدد",skriveHjaelpDesc:"اپنا متن درج کریں اور جوابات کے بغیر فیڈ بیک حاصل کریں۔",back:"واپس",du1mod3:"DU1، ماڈیول 3 اور 4",du2mod1:"DU2، ماڈیول 1",du3mod4:"DU3، ماڈیول 4",laerEtNytOrd:"ایک نیا لفظ سیکھیں",laerEtNytOrdDesc:"دریافت کریں کہ الفاظ نیٹ ورکس میں کیسے جڑے ہوئے ہیں۔",wordNetworkExplanation:"الفاظ دوسرے الفاظ سے جڑے ہوتے ہیں۔ جب آپ کو معلوم ہو کہ لفظ دوسرے الفاظ سے کیسے جڑا ہوا ہے تو یہ آپ کو لفظ کو بہت بہتر طریقے سے یاد رکھنے میں مدد دیتا ہے۔",targetWord:"کتا",hypernym:"اعلیٰ تصور",hypernymWord:"جانور",synonym:"مترادف",synonymWord:"کتا (vovse)",antonym:"متضاد",antonymWord:"بلی",hyponym:"ذیلی تصور",hyponymWord:"پوڈل",geminiBtnText:"لفظ سیکھیں - یہاں کلک کریں",geminiConsentText:"اس لنک پر کلک کر کے، آپ گوگل کی مصنوعات استعمال کرنے اور اپنے جوابات کے ذریعے مصنوعی ذہانت کو تربیت دینے پر رضامند ہو رہے ہیں۔",hverdagssamtale:"روزمرہ گفتگو",hverdagssamtaleDesc:"روزمرہ کی عام گفتگو کی مشق کریں۔",samtaleBolig:"رہائش کے بارے میں گفتگو",samtaleArbejde:"کام کے بارے میں گفتگو",samtaleBtnText:"گفتگو شروع کریں - یہاں کلک کریں",skriveHjaelpBtnText:"لکھنے میں مدد - یہاں کلک کریں",du1mod3Desc:"مشق کرنے کے لیے ایک موضوع منتخب کریں۔",minHverdag:"میری روزمرہ زندگی",minBolig:"میری رہائش",mitArbejde:"میرا کام",minHverdagDesc:"آپ کی روزمرہ زندگی کے بارے میں کام۔",transportSprogskole:"اسکول تک آمد و رفت",madlavning:"کھانا پکانا",rengoering:"صفائی",transportDesc:"آپ اسکول کیسے جاتے ہیں؟",padletDesc:"کلاس کے ساتھ شیئر کریں کہ آپ آج اسکول کیسے پہنچے۔",padletBtnText:"Padlet کھولیں",madlavningDesc:"آپ کو کھانا پکانے میں کیا پسند ہے؟",madlavningPadletDesc:"اپنی کھانے کی یادیں کلاس کے ساتھ شیئر کریں۔",rengoeringDesc:"آپ صفائی کیسے کرتے ہیں؟",rengoeringPadletDesc:"صفائی کے بارے میں اپنے خیالات کلاس کے ساتھ شیئر کریں۔",traenTidsudtryk:"وقت کے اظہار کی مشق",traenTidsudtrykDesc:"دانش میں وقت کے مختلف اظہار کیسے استعمال ہوتے ہیں؟",traenTidsudtrykBtnText:"وقت کے اظہار کی مشق کھولیں",ordstilling:"الفاظ کی ترتیب",ordstillingDesc:"الفاظ کو دوبارہ ترتیب دیں اور انہیں صحیح ترتیب میں رکھیں.",checkResult:"جواب چیک کریں",correctOrder:"بہت خوب! ترتیب درست ہے.",wrongOrder:"بالکل درست نہیں. دوبارہ کوشش کریں!",ordstillingLet:"الفاظ کی ترتیب (آسان)",ordstillingSvaer:"الفاظ کی ترتیب (مشکل)",levelA1:"A1 جملے",levelA2:"A2 جملے",traenGrammatik:"گرائمر کی مشق",grammatikDesc:"متن میں خالی جگہوں کو صحیح الفاظ سے پر کریں۔",let:"آسان (A1)",mellemsvaer:"درمیانہ (A2)",svaer:"مشکل (B1)",grammatikIntro:"مشق شروع کرنے کے لیے لیول منتخب کریں۔",checkAnswers:"تمام جوابات چیک کریں",allCorrect:"شاندار! تمام جوابات درست ہیں۔",someWrong:"آپ کے کچھ جوابات بالکل درست نہیں ہیں۔ دوبارہ کوشش کریں!",newExercise:"اگلا متن",hintMean:"اس تناظر میں یہ لفظ معنی نہیں رکھتا.",hintTense:"زمانہ چیک کریں. کیا یہ حال ہے یا ماضی؟",hintForm:"لفظ کی شکل چیک کریں (مثلاً جنس یا واحد/جمع).",hintPerson:"چیک کریں کہ عمل کون کر رہا ہے (میں، آپ، وہ).",hintContext:"پورا متن دوبارہ پڑھیں. یہاں سب سے بہتر کیا ہے؟",hintName:"آپ کو یہاں ناموں کے لیے ایک لفظ کی ضرورت ہے.",hintPlace:"آپ کو یہاں مقامات کے لیے ایک لفظ کی ضرورت ہے.",hintAction:"یہ لفظ ایک مختلف عمل بیان کرتا.",hintAdj:"صفت چیک کریں (کسی چیز کی وضاحت).",hintAdverb:"متعلق فعل چیک کریں (وقت، جگہ یا طریقہ).",hintConj:"حرف عطف چیک کریں (دو جملوں کو جوڑتا ہے).",filled:"بھرا ہوا",verbExerciseSubtitle:"فعل کو حال اور ماضی میں تبدیل کریں۔",advChoiceTitle:"شاید / اچھا / نہیں",advChoiceDesc:"مختلف جملوں میں کلیدی متعلق فعل کے استعمال کی مشق کریں۔"},zh:{selectLanguage:"选择语言",title:"丹麦语训练",subtitle:"选择一个类别开始你的训练。",dagensOpgave:"今日任务",dagensOpgaveDesc:"新主题，新语法。完成任务！",modulTest:"模块测试训练",modulTestDesc:"各种任务集中在一起。",notes:"教学笔记",notesDesc:"阅读并练习课堂笔记。",lavSporgsmal:"提问练习",lavSporgsmalDesc:"学习根据图片提出精确的问题。",lavSporgsmalBtnText:"开始提问 - 点击这里",samtaleTraening:"对话训练",samtaleTraeningDesc:"练习对话并获得丹麦语帮助。",skriveHjaelp:"写作助手",skriveHjaelpDesc:"输入你的文本，获得无答案的反馈。",back:"返回",du1mod3:"DU1, 模块 3 和 4",du2mod1:"DU2, 模块 1",du3mod4:"DU3, 模块 4",laerEtNytOrd:"学习一个新单词",laerEtNytOrdDesc:"探索单词在网络中的联系。",wordNetworkExplanation:"单词与其他单词相连。了解单词如何与其他单词联系可以帮助你更好地记住它。",targetWord:"狗",hypernym:"上位词",hypernymWord:"动物",synonym:"同义词",synonymWord:"狗狗",antonym:"反义词",antonymWord:"猫",hyponym:"下位词",hyponymWord:"贵宾犬",geminiBtnText:"学习单词 - 点击这里",geminiConsentText:"点击此链接即表示你同意使用 Google 产品，且 Google 会利用你的回答训练人工智能。",hverdagssamtale:"日常对话",hverdagssamtaleDesc:"练习常见的日常对话。",samtaleBolig:"关于住房的对话",samtaleArbejde:"关于工作的对话",samtaleBtnText:"开始对话 - 点击这里",skriveHjaelpBtnText:"写作助手 - 点击这里",du1mod3Desc:"选择一个主题进行练习。",minHverdag:"我的日常生活",minBolig:"我的住房",mitArbejde:"我的工作",minHverdagDesc:"关于你日常生活的任务。",transportSprogskole:"去语言学校的交通",madlavning:"烹饪",rengoering:"清洁",transportDesc:"你怎么去学校？",padletDesc:"与全班分享你今天如何去学校。",padletBtnText:"打开 Padlet",madlavningDesc:"你喜欢做什样的食物？",madlavningPadletDesc:"在这里与全班分享你的烹饪经验。",rengoeringDesc:"你如何进行清洁？",rengoeringPadletDesc:"与全班分享你对清洁的看法。",traenTidsudtryk:"练习时间表达",traenTidsudtrykDesc:"如何在丹麦语中使用不同的时间表达？",traenTidsudtrykBtnText:"打开时间表达练习",ordstilling:"词序练习",ordstillingDesc:"重新排列单词，并将它们按正确的顺序排列。",checkResult:"检查答案",correctOrder:"太棒了！顺序正确。",wrongOrder:"不完全正确。再试一次！",ordstillingLet:"词序 (简单)",ordstillingSvaer:"词序 (困难)",levelA1:"A1 句子",levelA2:"A2 句子",traenGrammatik:"练习语法",grammatikDesc:"在文本的空格处填入正确的单词。",let:"简单 (A1)",mellemsvaer:"中等 (A2)",svaer:"困难 (B1)",grammatikIntro:"选择等级开始练习。",checkAnswers:"检查所有答案",allCorrect:"太棒了！所有答案都正确。",someWrong:"你的某些答案不完全正确。再试一次！",newExercise:"下一篇",hintMean:"这个词在这种语境下没有意义。",hintTense:"检查时态。是现在时还是过去时？",hintForm:"检查单词形式（例如：性别或单复数）。",hintPerson:"检查谁在执行动作（我、你、他/她）。",hintContext:"重新阅读全文。这里最适合什么？",hintName:"你需要一个关于名字的词。",hintPlace:"你需要一个关于地点的词。",hintAction:"这个词描述的是另一种动作。",hintAdj:"检查形容词（描述事物的词）。",hintAdverb:"检查副词（时间、地点或方式）。",hintConj:"检查连词（连接两个句子）。",filled:"已填写",verbExerciseSubtitle:"将动词变位为现在时和过去时。",advChoiceTitle:"也许 / 好 / 不",advChoiceDesc:"练习在不同句子中使用关键副词。"},ru:{selectLanguage:"Выберите язык",title:"Изучение датского",subtitle:"Выберите категорию, чтобы начать обучение.",dagensOpgave:"Задание дня",dagensOpgaveDesc:"Новая тема, новая грамматика. Решите задачу!",modulTest:"Подготовка к тесту",modulTestDesc:"Различные задания, собранные в одном месте.",notes:"Конспекты занятий",notesDesc:"Читайте и практикуйте заметки с уроков.",lavSporgsmal:"Составление вопросов",lavSporgsmalDesc:"Научитесь задавать точные вопросы по картинкам.",lavSporgsmalBtnText:"Начать - нажмите здесь",samtaleTraening:"Разговорная практика",samtaleTraeningDesc:"Практикуйте общение и получайте помощь с датским.",skriveHjaelp:"Помощь в письме",skriveHjaelpDesc:"Введите текст и получите отзыв без готовых ответов.",back:"Назад",du1mod3:"DU1, модуль 3 и 4",laerEtNytOrd:"Выучить новое слово",laerEtNytOrdDesc:"Узнайте, как слова связаны в сети.",wordNetworkExplanation:"Слова связаны с другими словами. Это помогает лучше запоминать их.",targetWord:"Собака",hypernym:"Гипероним",hypernymWord:"Животное",synonym:"Синоним",synonymWord:"Пес",antonym:"Антоним",antonymWord:"Кошка",hyponym:"Гипоним",hyponymWord:"Пудель",geminiBtnText:"Выучить слово - нажмите здесь",geminiConsentText:"Нажимая на ссылку, вы соглашаетесь на использование продуктов Google и на то, что Google обучает ИИ на ваших ответах.",hverdagssamtale:"Повседневный разговор",hverdagssamtaleDesc:"Практикуйте обычные разговоры о жизни.",samtaleBolig:"Разговор о жилье",samtaleArbejde:"Разговор о работе",samtaleBtnText:"Начать разговор - нажмите здесь",skriveHjaelpBtnText:"Помощь в письме - нажмите здесь",du1mod3Desc:"Выберите тему для практики.",minHverdag:"Мои будни",minBolig:"Мое жилье",mitArbejde:"Моя работа",minHverdagDesc:"Задания о вашей повседневной жизни.",transportSprogskole:"Транспорт до школы",madlavning:"Готовка",rengoering:"Уборка",transportDesc:"Как вы добираетесь до школы?",padletDesc:"Поделитесь с классом, как вы добрались до школы сегодня.",padletBtnText:"Открыть Padlet",madlavningDesc:"Какую еду вы любите готовить?",madlavningPadletDesc:"Поделитесь своим кулинарным опытом с классом.",rengoeringDesc:"Как вы делаете уборку?",rengoeringPadletDesc:"Поделитесь своими мыслями об уборке с классом.",traenTidsudtryk:"Практика временных выражений",traenTidsudtrykDesc:"Как использовать различные временные выражения в датском?",traenTidsudtrykBtnText:"Открыть упражнение",ordstilling:"Порядок слов",ordstillingDesc:"Переставьте слова и расположите их в правильном порядке.",checkResult:"Проверить ответ",correctOrder:"Отлично! Порядок правильный.",wrongOrder:"Не совсем верно. Попробуйте еще раз!",ordstillingLet:"Порядок слов (Легко)",ordstillingSvaer:"Порядок слов (Сложно)",levelA1:"Предложения A1",levelA2:"Предложения A2",traenGrammatik:"Практика грамматики",grammatikDesc:"Заполните пропуски в тексте правильными словами.",let:"Легко (A1)",mellemsvaer:"Средне (A2)",svaer:"Сложно (B1)",grammatikIntro:"Выберите уровень, чтобы начать упражнение.",checkAnswers:"Проверить все ответы",allCorrect:"Фантастика! Все ответы верны.",someWrong:"Некоторые ваши ответы не совсем верны. Попробуйте еще раз!",newExercise:"Следующий текст",hintMean:"Это слово не имеет смысла в данном контексте.",hintTense:"Проверьте время. Это настоящее или прошедшее?",hintForm:"Проверьте форму слова (например, род или число).",hintPerson:"Проверьте, кто совершает действие (я, ты, он/она).",hintContext:"Прочитайте весь текст еще раз. Что здесь лучше всего подходит?",hintName:"Здесь нужно слово для имен.",hintPlace:"Здесь нужно слово для мест.",hintAction:"Это слово описывает другое действие.",hintAdj:"Проверьте прилагательное (описание предмета).",hintAdverb:"Проверьте наречие (время, место или образ действия).",hintConj:"Проверьте союз (соединяет два предложения).",filled:"заполнено",verbExerciseSubtitle:"Спрягайте глаголы в настоящем и прошедшем времени.",advChoiceTitle:"Может быть / хорошо / не",advChoiceDesc:"Практикуйтесь в использовании ключевых наречий в разных предложениях."},ne:{selectLanguage:"भाषा छान्नुहोस्",title:"डेनिस प्रशिक्षण",subtitle:"प्रशिक्षण सुरु गर्न एक श्रेणी छान्नुहोस्।",dagensOpgave:"आजको कार्य",dagensOpgaveDesc:"नयाँ विषय, नयाँ व्याकरण। कार्य समाधान गर्नुहोस्!",modulTest:"मोड्युल परीक्षण प्रशिक्षण",modulTestDesc:"विभिन्न कार्यहरू एकै ठाउँमा संकलन गरिएको।",notes:"शिक्षण नोटहरू",notesDesc:"कक्षाबाट नोटहरू पढ्नुहोस् र अभ्यास गर्नुहोस्।",lavSporgsmal:"प्रश्नहरू बनाउनुहोस्",lavSporgsmalDesc:"चित्रहरूको आधारमा सटीक प्रश्नहरू सोध्न सिक्नुहोस्।",lavSporgsmalBtnText:"प्रश्नहरू बनाउनुहोस् - यहाँ क्लिक गर्नुहोस्",samtaleTraening:"कुराकानी प्रशिक्षण",samtaleTraeningDesc:"आफ्नो कुराकानी अभ्यास गर्नुहोस् र डेनिस भाषामा मद्दत लिनुहोस्।",skriveHjaelp:"लेखन मद्दत",skriveHjaelpDesc:"आफ्नो पाठ प्रविष्ट गर्नुहोस् र जवाफ बिना प्रतिक्रिया प्राप्त गर्नुहोस्।",back:"फिर्ता",du1mod3:"DU1, मोड्युल ३ र ४",laerEtNytOrd:"नयाँ शब्द सिक्नुहोस्",laerEtNytOrdDesc:"शब्दहरू नेटवर्कमा कसरी जोडिएका छन् पत्ता लगाउनुहोस्।",wordNetworkExplanation:"शब्दहरू अन्य शब्दहरूसँग जोडिएका हुन्छन्। शब्द कसरी जोडिएको छ थाहा पाउँदा सम्झन सजिलो हुन्छ।",targetWord:"कुकुर",hypernym:"माथिल्लो शब्द",hypernymWord:"जनावर",synonym:"पर्यायवाची",synonymWord:"कुकुर (vovse)",antonym:"विपरीतार्थी",antonymWord:"बिरालो",hyponym:"तल्लो शब्द",hyponymWord:"पुडल",geminiBtnText:"शब्द सिक्नुहोस् - यहाँ थिच्नुहोस्",geminiConsentText:"यो लिङ्कमा क्लिक गरेर, तपाईं गुगल उत्पादन प्रयोग गर्न र गुगलले तपाईंको जवाफबाट एआईलाई तालिम दिन सहमत हुनुहुन्छ।",hverdagssamtale:"दैनिक कुराकानी",hverdagssamtaleDesc:"सामान्य दैनिक कुराकानी अभ्यास गर्नुहोस्।",samtaleBolig:"आवासको बारेमा कुराकानी",samtaleArbejde:"कामको बारेमा कुराकानी",samtaleBtnText:"कुराकानी सुरु गर्नुहोस् - यहाँ क्लिक गर्नुहोस्",skriveHjaelpBtnText:"लेखन मद्दत - यहाँ क्लिक गर्नुहोस्",du1mod3Desc:"अभ्यास गर्न विषय छान्नुहोस्।",minHverdag:"मेरो दैनिक जीवन",minBolig:"मेरो आवास",mitArbejde:"मेरो काम",minHverdagDesc:"तपाईंको दैनिक जीवनको बारेमा कार्यहरू।",transportSprogskole:"स्कूल सम्मको यातायात",madlavning:"खाना पकाउने",rengoering:"सरसफाई",transportDesc:"तपाईं स्कूल कसरी जानुहुन्छ?",padletDesc:"तपाईं आज स्कूल कसरी पुग्नुभयो कक्षामा साझा गर्नुहोस्।",padletBtnText:"Padlet खोल्नुहोस्",madlavningDesc:"तपाईंलाई कस्तो खाना पकाउन मन पर्छ?",madlavningPadletDesc:"तपाईंको खाना पकाउने अनुभव कक्षामा साझा गर्नुहोस्।",rengoeringDesc:"तपाई सरसफाई कसरी गर्नुहुन्छ?",rengoeringPadletDesc:"सरसफाईको बारेमा आफ्नो विचार साझा गर्नुहोस्।",traenTidsudtryk:"समय अभिव्यक्ति अभ्यास",traenTidsudtrykDesc:"डेनिसमा विभिन्न समय अभिव्यक्तिहरू कसरी प्रयोग गर्ने?",traenTidsudtrykBtnText:"समय अभिव्यक्ति अभ्यास खोल्नुहोस्",ordstilling:"शब्द क्रम",ordstillingDesc:"शब्दहरूलाई पुन: व्यवस्थित गर्नुहोस् र तिनीहरूलाई सही क्रममा राख्नुहोस्।",checkResult:"उत्तर जाँच गर्नुहोस्",correctOrder:"उत्कृष्ट! क्रम सही छ।",wrongOrder:"पुरै सही छैन। फेरि प्रयास गर्नुहोस्!",ordstillingLet:"शब्द क्रम (सजिलो)",ordstillingSvaer:"शब्द क्रम (कठिन)",levelA1:"A1 वाक्यहरू",levelA2:"A2 वाक्यहरू",traenGrammatik:"व्याकरण अभ्यास",grammatikDesc:"पाठका खाली ठाउँहरूमा सही शब्दहरू भर्नुहोस्।",let:"सजिलो (A1)",mellemsvaer:"मध्यम (A2)",svaer:"कठिन (B1)",grammatikIntro:"अभ्यास सुरु गर्न एक स्तर छान्नुहोस्।",checkAnswers:"सबै उत्तरहरू जाँच गर्नुहोस्",allCorrect:"शानदार! सबै उत्तरहरू सही छन्।",someWrong:"तपाईका केही उत्तरहरू पूर्ण रूपमा सही छैनन्। फेरि प्रयास गर्नुहोस्!",newExercise:"अर्को पाठ",hintMean:"यो शब्द यस सन्दर्भमा अर्थहीन छ।",hintTense:"काल जाँच गर्नुहोस्। यो वर्तमान हो कि भूत?",hintForm:"शब्दको रूप जाँच गर्नुहोस् (जस्तै लिङ्ग वा एकवचन/बहुवचन)।",hintPerson:"कार्य कसले गरिरहेको छ जाँच गर्नुहोस् (म, तिमी, उ/उनी)।",hintContext:"फेरि पूरा पाठ पढ्नुहोस्। यहाँ सबैभन्दा उपयुक्त के हुन्छ?",hintName:"तपाईंलाई यहाँ नामका लागि शब्द चाहिन्छ।",hintPlace:"तपाईंलाई यहाँ ठाउँका लागि शब्द चाहिन्छ।",hintAction:"यो शब्दले अर्कै कार्यलाई वर्णन गर्दछ।",hintAdj:"विशेषण जाँच गर्नुहोस् (चीजको विवरण)।",hintAdverb:"क्रियाविशेषण जाँच गर्नुहोस् (समय, स्थान वा तरिका)।",hintConj:"संयोजक जाँच गर्नुहोस् (दुईवटा वाक्यहरू जोड्छ)।",filled:"भरिएको",verbExerciseSubtitle:"वर्तमान र भूतकालमा क्रियापदहरू संयोजन गर्नुहोस्।",advChoiceTitle:"सायद / राम्रो / होइन",advChoiceDesc:"विभिन्न वाक्यहरूमा मुख्य क्रियाविशेषणहरूको प्रयोग अभ्यास गर्नुहोस्।"},th:{selectLanguage:"เลือกภาษา",title:"ฝึกภาษาเดนมาร์ก",subtitle:"เลือกหมวดหมู่เพื่อเริ่มการฝึกฝนของคุณ",dagensOpgave:"ภารกิจวันนี้",dagensOpgaveDesc:"หัวข้อใหม่ ไวยากรณ์ใหม่ แก้ปัญหาเลย!",modulTest:"ฝึกทำข้อสอบโมดูล",modulTestDesc:"รวบรวมงานต่างๆ ไว้ในที่เดียว",notes:"โน้ตการเรียน",notesDesc:"อ่านและฝึกฝนโน้ตจากทางห้องเรียน",lavSporgsmal:"สร้างคำถาม",lavSporgsmalDesc:"เรียนรู้การตั้งคำถามที่แม่นยำจากรูปภาพ",lavSporgsmalBtnText:"สร้างคำถาม - คลิกที่นี่",samtaleTraening:"ฝึกสนทนา",samtaleTraeningDesc:"ฝึกฝนการสนทนาและรับความช่วยเหลือเกี่ยวกับภาษาเดนมาร์ก",skriveHjaelp:"ตัวช่วยเขียน",skriveHjaelpDesc:"ใส่ข้อความของคุณและรับข้อเสนอแนะโดยไม่มีคำตอบ",back:"กลับ",du1mod3:"DU1, โมดูล 3 และ 4",laerEtNytOrd:"เรียนรู้คำศัพท์ใหม่",laerEtNytOrdDesc:"สำรวจความเชื่อมโยงของคำในเครือข่าย",wordNetworkExplanation:"คำศัพท์เชื่อมโยงกับคำอื่นๆ จะช่วยให้จำได้ดีขึ้นเมื่อรู้ความเชื่อมโยง",targetWord:"สุนัข",hypernym:"คำนามหลัก",hypernymWord:"สัตว์",synonym:"คำไวพจน์",synonymWord:"เจ้าตูบ",antonym:"คำตรงข้าม",antonymWord:"แมว",hyponym:"คำประเภทย่อย",hyponymWord:"พุดเดิ้ล",geminiBtnText:"เรียนรู้คำศัพท์ - กดที่นี่",geminiConsentText:"การคลิกที่ลิงก์นี้แสดงว่าคุณตกลงที่จะใช้ผลิตภัณฑ์ของ Google และให้ Google ฝึก AI ด้วยคำตอบของคุณ",hverdagssamtale:"สนทนาในชีวิตประจำวัน",hverdagssamtaleDesc:"ฝึกบทสนทนาทั่วไปเกี่ยวกับชีวิตประจำวัน",samtaleBolig:"คุยเรื่องที่อยู่อาศัย",samtaleArbejde:"คุยเรื่องงาน",samtaleBtnText:"เริ่มการสนทนา - กดที่นี่",skriveHjaelpBtnText:"ตัวช่วยเขียน - กดที่นี่",du1mod3Desc:"เลือกหัวข้อที่จะฝึกฝน",minHverdag:"ชีวิตประจำวันของฉัน",minBolig:"บ้านของฉัน",mitArbejde:"งานของฉัน",minHverdagDesc:"งานเกี่ยวกับชีวิตประจำวันของคุณ",transportSprogskole:"การเดินทางไปโรงเรียน",madlavning:"การทำอาหาร",rengoering:"การทำความสะอาด",transportDesc:"คุณมาโรงเรียนอย่างไร?",padletDesc:"แบ่งปันวิธีการมาโรงเรียนของคุณในวันนี้กับเพื่อนในห้อง",padletBtnText:"เปิด Padlet",madlavningDesc:"คุณชอบทำอาหารประเภทไหน?",madlavningPadletDesc:"แบ่งปันประสบการณ์การทำอาหารของคุณที่นี่",rengoeringDesc:"คุณทำความสะอาดอย่างไร?",rengoeringPadletDesc:"แบ่งปันความคิดเรื่องการทำความสะอาดกับเพื่อนในห้อง",traenTidsudtryk:"ฝึกการบอกเวลา",traenTidsudtrykDesc:"วิธีการใช้สำนวนเกี่ยวกับเวลาในภาษาเดนมาร์ก",traenTidsudtrykBtnText:"เปิดแบบฝึกหัดการบอกเวลา",ordstilling:"การเรียงลำดับคำ",ordstillingDesc:"จัดเรียงคำใหม่และวางตามลำดับที่ถูกต้อง",checkResult:"ตรวจคำตอบ",correctOrder:"ยอดเยี่ยม! ลำดับถูกต้อง",wrongOrder:"ยังไม่ถูกต้อง ลองอีกครั้ง!",ordstillingLet:"การเรียงลำดับคำ (ง่าย)",ordstillingSvaer:"การเรียงลำดับคำ (ยาก)",levelA1:"ประโยค A1",levelA2:"ประโยค A2",traenGrammatik:"ฝึกไวยากรณ์",grammatikDesc:"เติมคำที่ถูกต้องลงในช่องว่างในเนื้อข้อความ",let:"ง่าย (A1)",mellemsvaer:"ปานกลาง (A2)",svaer:"ยาก (B1)",grammatikIntro:"เลือกระดับเพื่อเริ่มแบบฝึกหัด",checkAnswers:"ตรวจคำตอบทั้งหมด",allCorrect:"สุดยอด! ทุกคำตอบถูกต้อง",someWrong:"คำตอบบางคำไม่ค่อยถูกต้อง ลองอีกครั้ง!",newExercise:"ข้อความถัดไป",hintMean:"คำนี้ไม่มีความหมายในบริบทนี้",hintTense:"ตรวจสอบกาล (Tense) เป็นปัจจุบันหรืออดีต?",hintForm:"ตรวจสอบรูปของคำ (เช่น เพศ หรือ เอกพจน์/พหูพจน์)",hintPerson:"ตรวจสอบว่าใครเป็นคนทำกริยานั้น (ฉัน, คุณ, เขา/เธอ)",hintContext:"อ่านข้อความทั้งหมดอีกครั้ง อะไรเหมาะที่สุดตรงนี้?",hintName:"คุณต้องการคำเรียกชื่อตรงนี้",hintPlace:"คุณต้องการคำระบุสถานที่ตรงนี้",hintAction:"คำนี้อธิบายการกระทำที่ต่างออกไป",hintAdj:"ตรวจสอบคำคุณศัพท์ (การบรรยายสิ่งของ)",hintAdverb:"ตรวจสอบคำวิเศษณ์ (เวลา สถานที่ หรืออาการ)",hintConj:"ตรวจสอบคำสันธาน (คำเชื่อมประโยค)",filled:"เติมแล้ว",verbExerciseSubtitle:"ผันคำกริยาในรูปปัจจุบันและอดีต",advChoiceTitle:"อาจจะ / ดี / ไม่",advChoiceDesc:"ฝึกใช้คำวิเศษณ์หลักในประโยคต่างๆ"},pt:{selectLanguage:"Escolher idioma",title:"Treino de Dinamarquês",subtitle:"Escolha uma categoria para começar o seu treino.",dagensOpgave:"Tarefa do Dia",dagensOpgaveDesc:"Novo tópico, nova gramática. Resolva a tarefa!",modulTest:"Treino para Teste de Módulo",modulTestDesc:"Várias tarefas reunidas num só lugar.",notes:"Notas de Aula",notesDesc:"Leia e pratique com as notas das aulas.",lavSporgsmal:"Criar Perguntas",lavSporgsmalDesc:"Aprenda a fazer perguntas precisas com base em imagens.",lavSporgsmalBtnText:"Criar perguntas - clique aqui",samtaleTraening:"Treino de Conversação",samtaleTraeningDesc:"Pratique as suas conversas e obtenha ajuda com o seu dinamarquês.",skriveHjaelp:"Ajuda na Escrita",skriveHjaelpDesc:"Insira o seu texto e obtenha feedback sem respostas.",back:"Voltar",du1mod3:"DU1, módulo 3 e 4",laerEtNytOrd:"Aprender uma palavra nova",laerEtNytOrdDesc:"Explore como as palavras se ligam em redes.",wordNetworkExplanation:"As palavras estão ligadas a outras palavras. Ajuda a lembrar-se muito melhor quando sabe as ligações.",targetWord:"Cão",hypernym:"Hiperónimo",hypernymWord:"Animal",synonym:"Sinónimo",synonymWord:"Cachorro",antonym:"Antónimo",antonymWord:"Gato",hyponym:"Hipónimo",hyponymWord:"Poodle",geminiBtnText:"Aprender uma palavra - prima aqui",geminiConsentText:"Ao clicar neste link, concorda em usar um produto da Google e que a Google treine inteligência artificial com as suas respostas.",hverdagssamtale:"Conversa do dia-a-dia",hverdagssamtaleDesc:"Pratique conversas comuns sobre o quotidiano.",samtaleBolig:"Conversa sobre habitação",samtaleArbejde:"Conversa sobre trabalho",samtaleBtnText:"Começar conversa - clicar aqui",skriveHjaelpBtnText:"Ajuda na escrita - clicar aqui",du1mod3Desc:"Escolha um tópico para praticar.",minHverdag:"O meu dia-a-dia",minBolig:"A minha casa",mitArbejde:"O meu trabalho",minHverdagDesc:"Tarefas sobre a sua rotina diária.",transportSprogskole:"Transporte para a escola",madlavning:"Culinária",rengoering:"Limpeza",transportDesc:"Como vem para a escola?",padletDesc:"Partilhe com a turma como chegou à escola hoje.",padletBtnText:"Abrir Padlet",madlavningDesc:"Que tipo de comida gosta de fazer?",madlavningPadletDesc:"Partilhe as suas experiências culinárias aqui.",rengoeringDesc:"Como faz as limpezas?",rengoeringPadletDesc:"Partilhe os seus pensamentos sobre limpezas.",traenTidsudtryk:"Treino de expressões de tempo",traenTidsudtrykDesc:"Como usar diferentes expressões de tempo em dinamarquês?",traenTidsudtrykBtnText:"Abrir exercício de expressões de tempo",ordstilling:"Ordem das Palavras",ordstillingDesc:"Reorganize as palavras e coloque-as na ordem correta.",checkResult:"Verificar resposta",correctOrder:"Excelente! A ordem está correta.",wrongOrder:"Não está bem. Tente novamente!",ordstillingLet:"Ordem das Palavras (Fácil)",ordstillingSvaer:"Ordem das Palavras (Difícil)",levelA1:"Frases A1",levelA2:"Frases A2",traenGrammatik:"Treinar Gramática",grammatikDesc:"Preencha as lacunas com as palavras corretas no texto.",let:"Fácil (A1)",mellemsvaer:"Médio (A2)",svaer:"Difícil (B1)",grammatikIntro:"Escolha um nível para começar o exercício.",checkAnswers:"Verificar todas as respostas",allCorrect:"Fantástico! Todas as respostas estão corretas.",someWrong:"Algumas das suas respostas não estão totalmente corretas. Tente novamente!",newExercise:"Próximo texto",hintMean:"Esta palavra não faz sentido neste contexto.",hintTense:"Verifique o tempo verbal. É presente ou passado?",hintForm:"Verifique a forma da palavra (ex: gênero ou singular/plural).",hintPerson:"Verifique quem está realizando a ação (eu, você, ele/ela).",hintContext:"Leia todo o texto novamente. O que melhor se encaixa aqui?",hintName:"Você precisa de uma palavra para nomes aqui.",hintPlace:"Você precisa de uma palavra para locais aqui.",hintAction:"Esta palavra descreve uma ação diferente.",hintAdj:"Verifique o adjetivo (descrição de uma coisa).",hintAdverb:"Verifique o advérbio (tempo, lugar ou modo).",hintConj:"Verifique a conjunção (conecta duas frases).",filled:"preenchido",verbExerciseSubtitle:"Conjugue verbos no presente e passado.",advChoiceTitle:"Talvez / bem / não",advChoiceDesc:"Pratique o uso de advérbios chave em diferentes frases."},vi:{selectLanguage:"Chọn ngôn ngữ",title:"Luyện tiếng Đan Mạch",subtitle:"Chọn một danh mục để bắt đầu luyện tập.",dagensOpgave:"Nhiệm vụ hàng ngày",dagensOpgaveDesc:"Chủ đề mới, ngữ pháp mới. Hãy giải nhiệm vụ!",modulTest:"Luyện thi mô-đun",modulTestDesc:"Nhiều nhiệm vụ khác nhau được tập hợp tại một nơi.",notes:"Ghi chú bài giảng",notesDesc:"Đọc và thực hành các ghi chú từ lớp học.",lavSporgsmal:"Đặt câu hỏi",lavSporgsmalDesc:"Học cách đặt câu hỏi chính xác dựa trên hình ảnh.",lavSporgsmalBtnText:"Đặt câu hỏi - bấm vào đây",samtaleTraening:"Luyện hội thoại",samtaleTraeningDesc:"Thực hành hội thoại và nhận trợ giúp về tiếng Đan Mạch.",skriveHjaelp:"Trợ giúp viết",skriveHjaelpDesc:"Nhập văn bản của bạn và nhận phản hồi không có đáp án.",back:"Quay lại",du1mod3:"DU1, mô-đun 3",laerEtNytOrd:"Học một từ mới",laerEtNytOrdDesc:"Khám phá cách các từ kết nối trong mạng lưới.",wordNetworkExplanation:"Các từ được kết nối với các từ khác. Việc biết cách kết nối giúp bạn nhớ từ tốt hơn nhiều.",targetWord:"Con chó",hypernym:"Từ bao nghĩa",hypernymWord:"Động vật",synonym:"Từ đồng nghĩa",synonymWord:"Cún",antonym:"Từ trái nghĩa",antonymWord:"Con mèo",hyponym:"Từ nghĩa hẹp",hyponymWord:"Chó Poodle",geminiBtnText:"Học một từ - nhấn vào đây",geminiConsentText:"Bằng cách nhấp vào liên kết này, bạn đồng ý sử dụng sản phẩm của Google và để Google huấn luyện trí tuệ nhân tạo bằng câu trả lời của bạn.",hverdagssamtale:"Hội thoại hàng ngày",hverdagssamtaleDesc:"Thực hành các cuộc hội thoại thông thường về cuộc sống hàng ngày.",samtaleBolig:"Hội thoại về nhà ở",samtaleArbejde:"Hội thoại về công việc",samtaleBtnText:"Bắt đầu hội thoại - bấm tại đây",skriveHjaelpBtnText:"Trợ giúp viết - bấm tại đây",du1mod3Desc:"Chọn một chủ đề để thực hành.",minHverdag:"Cuộc sống hàng ngày của tôi",minBolig:"Nhà ở của tôi",mitArbejde:"Công việc của tôi",minHverdagDesc:"Các nhiệm vụ về cuộc sống hàng ngày của bạn.",transportSprogskole:"Phương tiện đến trường",madlavning:"Nấu ăn",rengoering:"Dọn dẹp",transportDesc:"Bạn đến trường bằng cách nào?",padletDesc:"Chia sẻ với cả lớp cách bạn đến trường hôm nay.",padletBtnText:"Mở Padlet",madlavningDesc:"Bạn thích nấu món ăn gì?",madlavningPadletDesc:"Chia sẻ kinh nghiệm nấu ăn của bạn với cả lớp tại đây.",rengoeringDesc:"Bạn dọn dẹp như thế nào?",rengoeringPadletDesc:"Chia sẻ suy nghĩ của bạn về việc dọn dẹp với cả lớp.",traenTidsudtryk:"Luyện tập các cụm từ chỉ thời gian",traenTidsudtrykDesc:"Cách sử dụng các cụm từ chỉ thời gian khác nhau trong tiếng Đan Mạch?",traenTidsudtrykBtnText:"Mở bài tập chỉ thời gian",ordstilling:"Trật tự từ",ordstillingDesc:"Sắp xếp lại các từ và đặt chúng theo đúng thứ tự.",checkResult:"Kiểm tra đáp án",correctOrder:"Tuyệt vời! Thứ tự đã đúng.",wrongOrder:"Chưa hoàn toàn đúng. Thử lại nhé!",ordstillingLet:"Trật tự từ (Dễ)",ordstillingSvaer:"Trật tự từ (Khó)",levelA1:"Câu A1",levelA2:"Câu A2",traenGrammatik:"Luyện ngữ pháp",grammatikDesc:"Điền các từ đúng vào chỗ trống trong văn bản.",let:"Dễ (A1)",mellemsvaer:"Trung bình (A2)",svaer:"Khó (B1)",grammatikIntro:"Chọn một cấp độ để bắt đầu bài tập.",checkAnswers:"Kiểm tra tất cả đáp án",allCorrect:"Tuyệt vời! Tất cả đáp án đều đúng.",someWrong:"Một số câu trả lời của bạn chưa hoàn toàn đúng. Thử lại nhé!",newExercise:"Văn bản tiếp theo",hintMean:"Từ này không có ý nghĩa trong ngữ cảnh này.",hintTense:"Kiểm tra thì của động từ. Là hiện tại hay quá khứ?",hintForm:"Kiểm tra hình thức của từ (ví dụ: giống hoặc số ít/số nhiều).",hintPerson:"Kiểm tra ai là người thực hiện hành động (tôi, bạn, anh ấy/cô ấy).",hintContext:"Đọc lại toàn bộ văn bản. Điều gì phù hợp nhất ở đây?",hintName:"Bạn cần một từ cho tên ở đây.",hintPlace:"Bạn cần một từ cho nơi chốn ở đây.",hintAction:"Từ này mô tả một hành động khác.",verbExerciseSubtitle:"Chia động từ ở thì hiện tại và quá khứ.",advChoiceTitle:"Có lẽ / tốt / không",advChoiceDesc:"Thực hành sử dụng các trạng từ chính trong các câu khác nhau."},fa:{selectLanguage:"انتخاب زبان",title:"آموزش دانمارکی",subtitle:"یک دسته را برای شروع تمرین خود انتخاب کنید.",dagensOpgave:"تکلیف روز",dagensOpgaveDesc:"موضوع جدید، گرامر جدید. تکلیف را حل کنید!",modulTest:"تمرین آزمون ماژول",modulTestDesc:"وظایف مختلف در یک جا جمع شده‌اند.",notes:"یادداشت‌های آموزشی",notesDesc:"یادداشت‌های کلاس را بخوانید و تمرین کنید.",lavSporgsmal:"ساخت سوال",lavSporgsmalDesc:"یاد بگیرید بر اساس تصاویر سوالات دقیق بپرسید.",lavSporgsmalBtnText:"ساخت سوال - اینجا کلیک کنید",samtaleTraening:"تمرین مکالمه",samtaleTraeningDesc:"مکالمات خود را تمرین کنید و در زبان دانمارکی کمک بگیرید.",skriveHjaelp:"کمک در نوشتن",skriveHjaelpDesc:"متن خود را وارد کنید و بدون پاسخ، بازخورد بگیرید.",back:"بازگشت",du1mod3:"DU1، ماژول ۳",laerEtNytOrd:"یادگیری یک کلمه جدید",laerEtNytOrdDesc:"کشف کنید که کلمات چگونه در شبکه‌ها به هم متصل هستند.",wordNetworkExplanation:"کلمات به کلمات دیگر متصل هستند. وقتی بدانید کلمه چگونه متصل است، آن را خیلی بهتر به یاد می‌سپارید.",targetWord:"سگ",hypernym:"واژه فراگیر",hypernymWord:"حیوان",synonym:"مترادف",synonymWord:"هاپو",antonym:"متضاد",antonymWord:"گربه",hyponym:"واژه محدودتر",hyponymWord:"پودل",geminiBtnText:"یادگیری کلمه - اینجا کلیک کنید",geminiConsentText:"با کلیک بر روی این لینک، موافقت می‌کنید که از محصولات گوگل استفاده کنید و گوگل هوش مصنوعی را با پاسخ‌های شما آموزش دهد.",hverdagssamtale:"مکالمه روزمره",hverdagssamtaleDesc:"مکالمات معمول درباره زندگی روزمره را تمرین کنید.",samtaleBolig:"مکالمه درباره مسکن",samtaleArbejde:"مکالمه درباره کار",samtaleBtnText:"شروع مکالمه - اینجا کلیک کنید",skriveHjaelpBtnText:"کمک در نوشتن - اینجا کلیک کنید",du1mod3Desc:"یک موضوع را برای تمرین انتخاب کنید.",minHverdag:"زندگی روزمره من",minBolig:"مسکن من",mitArbejde:"کار من",minHverdagDesc:"تکالیفی درباره زندگی روزمره شما.",transportSprogskole:"رفت و آمد به مدرسه زبن",madlavning:"آشپزی",rengoering:"نظافت",transportDesc:"چطور به مدرسه می‌روید؟",padletDesc:"با کلاس در میان بگذارید که امروز چطور به مدرسه رسیدید.",padletBtnText:"باز کردن پدلت",madlavningDesc:"چه نوع غذایی دوست دارید درست کنید؟",madlavningPadletDesc:"تجربیات آشپزی خود را اینجا با کلاس به اشتراک بگذارید.",rengoeringDesc:"چطور نظافت می‌کنید؟",rengoeringPadletDesc:"نظرات خود را درباره نظافت با کلاس در میان بگذارید.",traenTidsudtryk:"تمرین اصطلاحات زمانی",traenTidsudtrykDesc:"چطور از اصطلاحات زمانی مختلف در دانمارکی استفاده کنیم؟",traenTidsudtrykBtnText:"باز کردن تمرین اصطلاحات زمانی",ordstilling:"ترتیب کلمات",ordstillingDesc:"کلمات را دوباره ترتیب دهید و آن‌ها را در جای درست بگذارید.",checkResult:"بررسی پاسخ",correctOrder:"عالی! ترتیب درست است.",wrongOrder:"کاملاً درست نیست. دوباره امتحان کنید!",ordstillingLet:"ترتیب کلمات (آسان)",ordstillingSvaer:"ترتیب کلمات (سخت)",levelA1:"جملات A1",levelA2:"جملات A2",traenGrammatik:"تمرین دستور زبان",grammatikDesc:"جاهای خالی متن را با کلمات درست پر کنید.",let:"آسان (A1)",mellemsvaer:"متوسط (A2)",svaer:"سخت (B1)",grammatikIntro:"یک سطح را برای شروع تمرین انتخاب کنید.",checkAnswers:"بررسی تمام پاسخ‌ها",allCorrect:"عالی! تمام پاسخ‌ها درست هستند.",someWrong:"برخی از پاسخ‌های شما کاملاً درست نیستند. دوباره امتحان کنید!",newExercise:"متن بعدی",hintMean:"این کلمه در این متن معنایی ندارد.",hintTense:"زمان فعل را بررسی کنید. حال است یا گذشته؟",hintForm:"شکل کلمه را بررسی کنید (مثلاً جنسیت یا مفرد/جمع).",hintPerson:"بررسی کنید چه کسی عمل را انجام می‌دهد (من، تو، او).",hintContext:"دوباره کل متن را بخوانید. چه چیزی اینجا بهتر است؟",hintName:"اینجا به کلمه‌ای برای نام‌ها نیاز دارید.",hintPlace:"اینجا به کلمه‌ای برای مکان‌ها نیاز دارید.",hintAction:"این کلمه عمل دیگری را توصیف می‌کند.",verbExerciseSubtitle:"افعال را در زمان حال و گذشته صرف کنید.",advChoiceTitle:"شاید / خوب / نه",advChoiceDesc:"استفاده از قیدهای کلیدی را در جملات مختلف تمرین کنید."},tr:{selectLanguage:"Dil seçin",title:"Danca Eğitimi",subtitle:"Eğitiminize başlamak için bir kategori seçin.",dagensOpgave:"Günün Ödevi",dagensOpgaveDesc:"Yeni konu, yeni dilbilgisi. Ödevi çözün!",modulTest:"Modül Testi Eğitimi",modulTestDesc:"Çeşitli görevler tek bir yerde toplandı.",notes:"Ders Notları",notesDesc:"Derslerdeki notları okuyun ve pratik yapın.",lavSporgsmal:"Soru Hazırlama",lavSporgsmalDesc:"Resimlere bakarak kesin sorular sormayı öğrenin.",lavSporgsmalBtnText:"Soru hazırlayın - buraya tıklayın",samtaleTraening:"Konuşma Eğitimi",samtaleTraeningDesc:"Konuşma pratiği yapın ve Dancanız için yardım alın.",skriveHjaelp:"Yazma Yardımı",skriveHjaelpDesc:"Metninizi girin ve cevaplar olmadan geri bildirim alın.",back:"Geri",du1mod3:"DU1, modül 3",du2mod1:"DU2, modül 1",du3mod4:"DU3, modül 4",laerEtNytOrd:"Yeni bir kelime öğrenin",laerEtNytOrdDesc:"Kelimelerin ağlar içinde nasıl bağlandığını keşfedin.",wordNetworkExplanation:"Kelimeler diğer kelimelere bağlıdır. Kelimenin diğer kelimelere nasıl bağlandığını bildiğinizde, kelimeyi çok daha iyi hatırlamanıza yardımcı olur.",targetWord:"Köpek",hypernym:"Üst Terim",hypernymWord:"Hayvan",synonym:"Eşanlamlı",synonymWord:"Köpecik (vovse)",antonym:"Zıt Anlamlı",antonymWord:"Kedi",hyponym:"Alt Terim",hyponymWord:"Kaniş",geminiBtnText:"Kelime öğrenin - buraya tıklayın",geminiConsentText:"Bu bağlantıya tıklayarak bir Google ürünü kullandığınızı ve Google'ın yapay zekayı cevaplarınızla eğittiğini kabul etmiş olursunuz.",hverdagssamtale:"Günlük Konuşma",hverdagssamtaleDesc:"Günlük hayattan yaygın konuşmalar yapın.",samtaleBolig:"Konut hakkında konuşma",samtaleArbejde:"İş hakkında konuşma",samtaleBtnText:"Konuşmayı başlatın - buraya tıklayın",skriveHjaelpBtnText:"Yazma yardımı - buraya tıklayın",du1mod3Desc:"Pratik yapmak için bir konu seçin.",minHverdag:"Günlük hayatım",minBolig:"Konutum",mitArbejde:"İşim",minHverdagDesc:"Günlük hayatınızla ilgili görevler.",transportSprogskole:"Okula ulaşım",madlavning:"Yemek pişirme",rengoering:"Temizlik",transportDesc:"Okula nasıl geliyorsunuz?",padletDesc:"Bugün okula nasıl geldiğinizi sınıfla paylaşın.",padletBtnText:"Padlet'i aç",madlavningDesc:"Hangi yiyecekleri yapmayı seversiniz?",madlavningPadletDesc:"Yemek deneyimlerinizi burada sınıfla paylaşın.",rengoeringDesc:"Temizliği nasıl yaparsınız?",rengoeringPadletDesc:"Temizlikle ilgili düşüncelerinizi sınıfla paylaşın.",traenTidsudtryk:"Zaman ifadeleri çalışması",traenTidsudtrykDesc:"Dancada farklı zaman ifadeleri nasıl kullanılır?",traenTidsudtrykBtnText:"Zaman ifadeleri egzersizini aç",ordstilling:"Kelime Sıralaması",ordstillingDesc:"Kelimeleri yeniden düzenleyin ve doğru sıraya koyun.",checkResult:"Cevabı kontrol et",correctOrder:"Harika! Sıralama doğru.",wrongOrder:"Tam olarak doğru değil. Tekrar deneyin!",ordstillingLet:"Kelime Sıralaması (Kolay)",ordstillingSvaer:"Kelime Sıralaması (Zor)",levelA1:"A1 cümleleri",levelA2:"A2 cümleleri",traenGrammatik:"Gramer Çalışması",grammatikDesc:"Metindeki boşlukları doğru kelimelerle doldurun.",let:"Kolay (A1)",mellemsvaer:"Orta (A2)",svaer:"Zor (B1)",grammatikIntro:"Egzersize başlamak için bir seviye seçin.",checkAnswers:"Tüm cevapları kontrol et",allCorrect:"Harika! Tüm cevaplar doğru.",someWrong:"Bazı cevaplarınız tam olarak doğru değil. Tekrar deneyin!",newExercise:"Sonraki metin",hintMean:"Bu kelime bu bağlamda mantıklı değil.",hintTense:"Zamanı kontrol edin. Şimdiki zaman mı yoksa geçmiş zaman mı?",hintForm:"Kelime biçimini kontrol edin (örneğin cinsiyet veya tekil/çoğul).",hintPerson:"Eylemi kimin yaptığını kontrol edin (ben, sen, o).",hintContext:"Tüm metni tekrar okuyun. Buraya en iyi ne uyar?",hintName:"Burada isimler için bir kelimeye ihtiyacınız var.",hintPlace:"Burada yerler için bir kelimeye ihtiyacınız var.",hintAction:"Bu kelime farklı bir eylemi tanımlıyor."},es:{selectLanguage:"Seleccionar idioma",title:"Entrenamiento de Danés",subtitle:"Selecciona una categoría para empezar tu entrenamiento.",dagensOpgave:"Tarea del día",dagensOpgaveDesc:"Nuevo tema, nueva gramática. ¡Resuelve la tarea!",modulTest:"Entrenamiento para el examen de módulo",modulTestDesc:"Varias tareas reunidas en un solo lugar.",notes:"Notas de clase",notesDesc:"Lee y practica con las notas de las clases.",lavSporgsmal:"Crear preguntas",lavSporgsmalDesc:"Aprende a hacer preguntas precisas a partir de imágenes.",lavSporgsmalBtnText:"Crear preguntas - haz clic aquí",samtaleTraening:"Entrenamiento de conversación",samtaleTraeningDesc:"Practica tus conversaciones y obtén ayuda con tu danés.",skriveHjaelp:"Ayuda con la escritura",skriveHjaelpDesc:"Inserta tu texto y obtén retroalimentación sin respuestas.",back:"Atrás",du1mod3:"DU1, módulo 3",du2mod1:"DU2, módulo 1",du3mod4:"DU3, módulo 4",laerEtNytOrd:"Aprender una palabra nueva",laerEtNytOrdDesc:"Explora cómo se conectan las palabras en redes.",wordNetworkExplanation:"Las palabras están conectadas con otras palabras. Ayuda a recordar la palabra mucho mejor cuando sabes cómo se conecta con otras palabras.",targetWord:"Perro",hypernym:"Hiperónimo",hypernymWord:"Animal",synonym:"Sinónimo",synonymWord:"Perrito (vovse)",antonym:"Antónimo",antonymWord:"Gato",hyponym:"Hipónimo",hyponymWord:"Caniche",geminiBtnText:"Aprender una palabra - haz clic aquí",geminiConsentText:"Al hacer clic en este enlace, aceptas que estás utilizando un producto de Google y que Google entrena la inteligencia artificial con tus respuestas.",hverdagssamtale:"Conversación diaria",hverdagssamtaleDesc:"Practica conversaciones comunes sobre la vida diaria.",samtaleBolig:"Conversación sobre vivienda",samtaleArbejde:"Conversación sobre trabajo",samtaleBtnText:"Empezar la conversación - haz clic aquí",skriveHjaelpBtnText:"Ayuda con la escritura - haz clic aquí",du1mod3Desc:"Elige un tema para practicar.",minHverdag:"Mi vida diaria",minBolig:"Mi vivienda",mitArbejde:"Mi trabajo",minHverdagDesc:"Tareas sobre tu vida cotidiana.",transportSprogskole:"Transporte a la escuela",madlavning:"Cocina",rengoering:"Limpieza",transportDesc:"¿Cómo vienes a la escuela?",padletDesc:"Comparte con la clase cómo has llegado a la escuela hoy.",padletBtnText:"Abrir Padlet",madlavningDesc:"¿Qué tipo de comida te gusta cocinar?",madlavningPadletDesc:"Comparte tus experiencias culinarias con la clase aquí.",rengoeringDesc:"¿Cómo haces la limpieza?",rengoeringPadletDesc:"Comparte tus pensamientos sobre la limpieza con la clase.",traenTidsudtryk:"Entrenamiento de expresiones de tiempo",traenTidsudtrykDesc:"¿Cómo se usan las diferentes expresiones de tiempo en danés?",traenTidsudtrykBtnText:"Abrir ejercicio de expresiones de tiempo",ordstilling:"Orden de las palabras",ordstillingDesc:"Reorganiza las palabras y ponlas en el orden correcto.",checkResult:"Comprobar respuesta",correctOrder:"¡Genial! El orden es correcto.",wrongOrder:"No es correcto. ¡Inténtalo de nuevo!",ordstillingLet:"Orden de las palabras (Fácil)",ordstillingSvaer:"Orden de las palabras (Difícil)",levelA1:"Frases A1",levelA2:"Frases A2",traenGrammatik:"Practicar Gramática",grammatikDesc:"Completa los huecos con las palabras correctas en el texto.",let:"Fácil (A1)",mellemsvaer:"Intermedio (A2)",svaer:"Difícil (B1)",grammatikIntro:"Selecciona un nivel para comenzar el ejercicio.",checkAnswers:"Comprobar todas las respuestas",allCorrect:"¡Fantástico! Todas las respuestas son correctas.",someWrong:"Algunas de tus respuestas no son del todo correctas. ¡Inténtalo de nuevo!",newExercise:"Siguiente texto",hintMean:"Esta palabra no tiene sentido en este contexto.",hintTense:"Comprueba el tiempo verbal. ¿Es presente o pasado?",hintForm:"Comprueba la forma de la palabra (p. ej., género o singular/plural).",hintPerson:"Comprueba quién realiza la acción (yo, tú, él/ella).",hintContext:"Lee todo el texto de nuevo. ¿Qué encaja mejor aquí?",hintName:"Necesitas una palabra para nombres aquí.",hintPlace:"Necesitas una palabra para lugares aquí.",hintAction:"Esta palabra describe una acción diferente."}},N={lang:localStorage.getItem("appLang")||null,currentView:"language"};function ee(){return N.lang||"da"}function n(p){const i=R[ee()];return i&&i[p]?i[p]:R.da[p]||p}function te(p){N.lang=p,localStorage.setItem("appLang",p)}function ne(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("h1");r.textContent="Træning i dansk";const t=document.createElement("p");t.className="subtitle",t.textContent="Vælg sprog / Select language";const d=document.createElement("div");d.className="lang-list",[{code:"da",label:"Dansk"},{code:"en",label:"English"},{code:"ar",label:"العربية"},{code:"ur",label:"اردو"},{code:"zh",label:"中文"},{code:"ru",label:"Русский"},{code:"ne",label:"नेपाली"},{code:"th",label:"ไทย"},{code:"pt",label:"Português"},{code:"vi",label:"Tiếng Việt"},{code:"fa",label:"فارسی"},{code:"tr",label:"Türkçe"},{code:"es",label:"Español"}].forEach(l=>{const c=document.createElement("button");c.className="lang-btn",c.textContent=l.label,c.onclick=()=>{te(l.code),i("main")},d.appendChild(c)}),e.appendChild(r),e.appendChild(t),e.appendChild(d),p.appendChild(e)}function re(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("h1");r.textContent=n("title");const t=document.createElement("p");t.className="subtitle",t.textContent=n("subtitle");const d=document.createElement("div");d.className="top-bar",d.style.justifyContent="flex-end",d.style.marginBottom="20px";const o=document.createElement("button");o.className="back-btn",o.textContent="🌐 "+n("selectLanguage"),o.onclick=()=>i("language"),d.appendChild(o);const l=[{icon:"✨",titleKey:"dagensOpgave",descKey:"dagensOpgaveDesc",action:()=>i("dagens_opgave")},{icon:"🎓",titleKey:"modulTest",descKey:"modulTestDesc",action:()=>alert("Mock: Gå til Træning til modultest")},{icon:"📘",titleKey:"notes",descKey:"notesDesc",action:()=>i("notes")},{icon:"💬",titleKey:"lavSporgsmal",descKey:"lavSporgsmalDesc",action:()=>i("lav_sporgsmal")},{icon:"🗣️",titleKey:"samtaleTraening",descKey:"samtaleTraeningDesc",action:()=>i("samtale_traening")},{icon:"✍️",titleKey:"skriveHjaelp",descKey:"skriveHjaelpDesc",action:()=>i("skrive_hjaelp")},{icon:"🏃",titleKey:"verbumLearning",descKey:"verbumLearningDesc",action:()=>i("verbum_menu")}],c=document.createElement("div");c.className="grid",l.forEach(s=>{const g=document.createElement("div");g.className="card",g.onclick=s.action;const m=document.createElement("div");m.className="card-icon",m.textContent=s.icon;const h=document.createElement("div");h.className="card-title",h.textContent=n(s.titleKey);const v=document.createElement("div");v.className="card-desc",v.textContent=n(s.descKey),g.appendChild(m),g.appendChild(h),g.appendChild(v),c.appendChild(g)});const a=document.createElement("footer");a.innerHTML='© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.',e.appendChild(d),e.appendChild(r),e.appendChild(t),e.appendChild(c),e.appendChild(a),p.appendChild(e)}function ae(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("main"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("notes");const o=document.createElement("p");o.className="subtitle",o.textContent=n("notesDesc");const l=(g,m,h)=>{if(localStorage.getItem(`access_${g}`)===h){i(m);return}const x=prompt(n("enterPassword"));x===h?(localStorage.setItem(`access_${g}`,h),i(m)):x!==null&&alert("Forkert adgangskode / Incorrect password")},c=[{icon:"📓",titleKey:"du1mod3",descKey:"",action:()=>l("du1_mod3","du1_modul3","dansk103")},{icon:"📖",titleKey:"du2mod1",descKey:"",action:()=>l("du2_mod1","du2_modul1","dansk307")},{icon:"📂",titleKey:"du2mod5",descKey:"",action:()=>i("du2_modul5")},{icon:"📚",titleKey:"du3mod4",descKey:"",action:()=>alert("Mock: Åbner DU3, modul 4")}],a=document.createElement("div");a.className="grid",c.forEach(g=>{const m=document.createElement("div");m.className="card",m.onclick=g.action;const h=document.createElement("div");h.className="card-icon",h.textContent=g.icon;const v=document.createElement("div");if(v.className="card-title",v.textContent=n(g.titleKey),m.appendChild(h),m.appendChild(v),g.descKey){const x=document.createElement("div");x.className="card-desc",x.textContent=n(g.descKey),m.appendChild(x)}a.appendChild(m)});const s=document.createElement("footer");s.innerHTML='© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.',e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(a),e.appendChild(s),p.appendChild(e)}function ie(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("main"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("dagensOpgave");const o=document.createElement("p");o.className="subtitle",o.textContent=n("dagensOpgaveDesc");const l=[{icon:"🧠",titleKey:"laerEtNytOrd",descKey:"laerEtNytOrdDesc",action:()=>i("word_learning")},{icon:"⏰",titleKey:"traenTidsudtryk",descKey:"traenTidsudtrykDesc",action:()=>i("traen_tidsudtryk")},{icon:"📖",titleKey:"traenGrammatik",descKey:"grammatikDesc",action:()=>i("traen_grammatik")},{icon:"🕰️",titleKey:"verberDatidRegelm",action:()=>i("verbum_learning",{categoryId:"datid_regelm"})},{icon:"🕰️",titleKey:"verberDatid",action:()=>i("verbum_learning",{categoryId:"datid"})},{icon:"🧩",titleKey:"ordstilling",descKey:"ordstillingDesc",action:()=>i("ordstilling")},{icon:"🫂",titleKey:"hvilketOrd",descKey:"hvilketOrdDesc",action:()=>i("pronomen")},{icon:"🏗️",titleKey:"howToBuildSentence",descKey:"howToBuildSentenceDesc",action:()=>i("grounding")}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const s=document.createElement("div");s.className="card",s.onclick=a.action;const g=document.createElement("div");g.className="card-icon",g.textContent=a.icon;const m=document.createElement("div");if(m.className="card-title",m.textContent=n(a.titleKey),s.appendChild(g),s.appendChild(m),a.descKey){const h=document.createElement("div");h.className="card-desc",h.textContent=n(a.descKey),s.appendChild(h)}c.appendChild(s)}),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(c),p.appendChild(e)}function oe(p,i){const e=document.createElement("div");e.className="view-container word-learning-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("dagens_opgave"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("laerEtNytOrd");const o=document.createElement("style");o.textContent=`
    .semantic-network {
      position: relative;
      width: 100%;
      height: 400px;
      margin: 2rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .network-lines {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 0;
    }
    .node {
      position: absolute;
      background: var(--card-bg);
      padding: 1rem 1.5rem;
      border-radius: 50px;
      box-shadow: var(--box-shadow);
      border: 1px solid rgba(255,255,255,0.1);
      z-index: 1;
      text-align: center;
      min-width: 100px;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
    }
    .node.center { background: #4a040b; color: white; border: 2px solid white; scale: 1.1; }
    .node.top { top: 5%; }
    .node.bottom { bottom: 5%; }
    .node.left { left: 5%; }
    .node.right { right: 5%; }
    
    .node .word { font-weight: 700; font-size: 1.1rem; }
    .node .hint { font-size: 0.8rem; opacity: 0.7; margin-top: 2px; }

    .word-explanation {
      margin: 2rem auto;
      max-width: 600px;
      line-height: 1.6;
      opacity: 0.9;
    }

    @media (max-width: 600px) {
      .semantic-network {
        height: auto;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 0;
      }
      .network-lines { display: none; }
      .node {
        position: static;
        width: 100%;
        max-width: 280px;
        padding: 0.8rem 1.2rem;
      }
      .node.center { order: -1; margin-bottom: 0.5rem; }
    }
  `,e.appendChild(o);const l=document.createElement("div");l.className="semantic-network",[{class:"node center",label:n("targetWord"),hint:""},{class:"node top",label:n("hypernymWord"),hint:n("hypernym")},{class:"node bottom",label:n("hyponymWord"),hint:n("hyponym")},{class:"node left",label:n("synonymWord"),hint:n("synonym")},{class:"node right",label:n("antonymWord"),hint:n("antonym")}].forEach(x=>{const T=document.createElement("div");T.className=x.class;const u=document.createElement("div");if(u.className="word",u.textContent=x.label,T.appendChild(u),x.hint){const b=document.createElement("div");b.className="hint",b.textContent=x.hint,T.appendChild(b)}l.appendChild(T)}),l.insertAdjacentHTML("afterbegin",`
      <svg class="network-lines" xmlns="http://www.w3.org/2000/svg">
        <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
      </svg>
    `);const a=document.createElement("p");a.className="word-explanation",a.textContent=n("wordNetworkExplanation");const s=document.createElement("div");s.className="consent-container";const g=document.createElement("input");g.type="checkbox",g.className="consent-checkbox",g.id="gemini-consent";const m=document.createElement("label");m.htmlFor="gemini-consent",m.className="consent-text",m.textContent=n("geminiConsentText"),s.appendChild(g),s.appendChild(m);const h=document.createElement("div");h.className="gemini-btn-container";const v=document.createElement("a");v.href="https://gemini.google.com/gem/1053Zk0akFAs0u3zMgYkZbtae9CO55Tyb?usp=sharing",v.target="_blank",v.className="gemini-btn disabled",v.textContent=n("geminiBtnText"),h.appendChild(v),g.addEventListener("change",x=>{x.target.checked?v.classList.remove("disabled"):v.classList.add("disabled")}),e.appendChild(r),e.appendChild(d),e.appendChild(l),e.appendChild(a),e.appendChild(s),e.appendChild(h),p.appendChild(e)}function se(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("main"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("samtaleTraening");const o=document.createElement("p");o.className="subtitle",o.textContent=n("samtaleTraeningDesc");const l=[{icon:"🗣",titleKey:"hverdagssamtale",action:()=>i("samtale_hverdag")},{icon:"🏠",titleKey:"samtaleBolig",action:()=>alert("Mock: Åbner "+n("samtaleBolig"))},{icon:"💼",titleKey:"samtaleArbejde",action:()=>alert("Mock: Åbner "+n("samtaleArbejde"))}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const s=document.createElement("div");s.className="card",s.onclick=a.action;const g=document.createElement("div");g.className="card-icon",g.textContent=a.icon;const m=document.createElement("div");m.className="card-title",m.textContent=n(a.titleKey),s.appendChild(g),s.appendChild(m),c.appendChild(s)}),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(c),p.appendChild(e)}function le(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("samtale_traening"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("hverdagssamtale");const o=document.createElement("p");o.className="subtitle",o.textContent=n("hverdagssamtaleDesc");const l=document.createElement("div");l.className="consent-container";const c=document.createElement("input");c.type="checkbox",c.className="consent-checkbox",c.id="gemini-consent-samtale";const a=document.createElement("label");a.htmlFor="gemini-consent-samtale",a.className="consent-text",a.textContent=n("geminiConsentText"),l.appendChild(c),l.appendChild(a);const s=document.createElement("div");s.className="gemini-btn-container";const g=document.createElement("a");g.href="https://gemini.google.com/gem/1SX-yUWDxh31wEL0RZ7BSacdDUvWGtn-8?usp=sharing",g.target="_blank",g.className="gemini-btn disabled",g.textContent=n("samtaleBtnText"),s.appendChild(g),c.addEventListener("change",m=>{m.target.checked?g.classList.remove("disabled"):g.classList.add("disabled")}),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(l),e.appendChild(s),p.appendChild(e)}function de(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("main"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("skriveHjaelp");const o=document.createElement("p");o.className="subtitle",o.textContent=n("skriveHjaelpDesc");const l=document.createElement("div");l.className="consent-container";const c=document.createElement("input");c.type="checkbox",c.className="consent-checkbox",c.id="gemini-consent-skrive";const a=document.createElement("label");a.htmlFor="gemini-consent-skrive",a.className="consent-text",a.textContent=n("geminiConsentText"),l.appendChild(c),l.appendChild(a);const s=document.createElement("div");s.className="gemini-btn-container";const g=document.createElement("a");g.href="https://gemini.google.com/gem/1Ke_Ges6JxMDC51hTM744lHSQm_fi9BhQ?usp=sharing",g.target="_blank",g.className="gemini-btn disabled",g.textContent=n("skriveHjaelpBtnText"),s.appendChild(g),c.addEventListener("change",m=>{m.target.checked?g.classList.remove("disabled"):g.classList.add("disabled")}),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(l),e.appendChild(s),p.appendChild(e)}function ce(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("notes"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("du1mod3");const o=document.createElement("p");o.className="subtitle",o.textContent=n("du1mod3Desc");const l=[{icon:"📅",titleKey:"minHverdag",action:()=>i("du1_min_hverdag")},{icon:"🏠",titleKey:"minBolig",action:()=>alert("Mock: Åbner "+n("minBolig"))},{icon:"💼",titleKey:"mitArbejde",action:()=>alert("Mock: Åbner "+n("mitArbejde"))}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const s=document.createElement("div");s.className="card",s.onclick=a.action;const g=document.createElement("div");g.className="card-icon",g.textContent=a.icon;const m=document.createElement("div");m.className="card-title",m.textContent=n(a.titleKey),s.appendChild(g),s.appendChild(m),c.appendChild(s)}),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(c),p.appendChild(e)}function me(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("du1_modul3"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("minHverdag");const o=document.createElement("p");o.className="subtitle",o.textContent=n("minHverdagDesc");const l=[{icon:"🚌",titleKey:"transportSprogskole",action:()=>i("transport_sprogskole")},{icon:"🍳",titleKey:"madlavning",action:()=>i("du1_madlavning")},{icon:"🧹",titleKey:"rengoering",action:()=>i("du1_rengoering")}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const s=document.createElement("div");s.className="card",s.onclick=a.action;const g=document.createElement("div");g.className="card-icon",g.textContent=a.icon;const m=document.createElement("div");m.className="card-title",m.textContent=n(a.titleKey),s.appendChild(g),s.appendChild(m),c.appendChild(s)}),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(c),p.appendChild(e)}function pe(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("du1_min_hverdag"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("transportSprogskole");const o=document.createElement("p");o.className="subtitle",o.textContent=n("transportDesc");const l=document.createElement("div");l.className="thematic-content";const c=document.createElement("div");c.className="thematic-image-container";const a=document.createElement("img");a.src=`${baseUrl}Gemini_Generated_Image_bnobabnobabnobab.png`,a.alt="Transport illustration",c.appendChild(a);const s=document.createElement("div");s.className="thematic-link-container";const g=document.createElement("p");g.className="thematic-link-text",g.textContent=n("padletDesc");const m=document.createElement("a");m.href="https://padlet.com/mibf/hvordan-kommer-du-til-sprogskole-gm97y985khw1csk1",m.target="_blank",m.className="padlet-btn",m.textContent=n("padletBtnText"),s.appendChild(g),s.appendChild(m),l.appendChild(c),l.appendChild(s),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(l),p.appendChild(e)}function ge(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("du1_min_hverdag"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("madlavning");const o=document.createElement("p");o.className="subtitle",o.textContent=n("madlavningDesc");const l=document.createElement("div");l.className="thematic-content";const c=document.createElement("div");c.className="thematic-image-container";const a=document.createElement("img");a.src=`${baseUrl}mad.png`,a.alt="Madlavning illustration",c.appendChild(a);const s=document.createElement("div");s.className="thematic-link-container";const g=document.createElement("p");g.className="thematic-link-text",g.textContent=n("madlavningPadletDesc");const m=document.createElement("a");m.href="https://padlet.com/mibf/b-rn-og-mad-fvyr130ka0n9f2yu",m.target="_blank",m.className="padlet-btn",m.textContent=n("padletBtnText"),s.appendChild(g),s.appendChild(m),l.appendChild(c),l.appendChild(s),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(l),p.appendChild(e)}function ue(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("du1_min_hverdag"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("rengoering");const o=document.createElement("p");o.className="subtitle",o.textContent=n("rengoeringDesc");const l=document.createElement("div");l.className="thematic-content";const c=document.createElement("div");c.className="grid",c.style.maxWidth="800px",["rent1.png","rent2.png"].forEach(m=>{const h=document.createElement("div");h.className="thematic-image-container";const v=document.createElement("img");v.src=`${baseUrl}${m}`,v.alt="Rengøring illustration",h.appendChild(v),c.appendChild(h)});const a=document.createElement("div");a.className="thematic-link-container";const s=document.createElement("p");s.className="thematic-link-text",s.textContent=n("rengoeringPadletDesc");const g=document.createElement("a");g.href="https://padlet.com/mibf/jeg-g-r-rent-5udv7g0gczbo7vq9",g.target="_blank",g.className="padlet-btn",g.textContent=n("padletBtnText"),a.appendChild(s),a.appendChild(g),l.appendChild(c),l.appendChild(a),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(l),p.appendChild(e)}function he(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("notes"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("du2mod1");const o=document.createElement("p");o.className="subtitle",o.textContent=n("du1mod3Desc");const l=[{icon:"📚",titleKey:"smaahistorier",action:()=>i("smaa_historier")}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const s=document.createElement("div");s.className="card",s.onclick=a.action;const g=document.createElement("div");g.className="card-icon",g.textContent=a.icon;const m=document.createElement("div");m.className="card-title",m.textContent=n(a.titleKey),s.appendChild(g),s.appendChild(m),c.appendChild(s)}),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(c),p.appendChild(e)}function be(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("du2_modul1"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("smaahistorier");const o=document.createElement("p");o.className="subtitle",o.textContent=n("du1mod3Desc");const l=[{icon:"📝",title:"Lisa og Jens",action:()=>window.open("https://padlet.com/mibf/historie-om-lisa-og-jens-omv7710nz0tnp49","_blank")},{icon:"📝",title:"Andrea",action:()=>window.open("https://padlet.com/mibf/historie-om-andrea-26kzbgxc28yhl436","_blank")}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const s=document.createElement("div");s.className="card",s.onclick=a.action;const g=document.createElement("div");g.className="card-icon",g.textContent=a.icon;const m=document.createElement("div");m.className="card-title",m.textContent=a.title,s.appendChild(g),s.appendChild(m),c.appendChild(s)}),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(c),p.appendChild(e)}function ve(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("notes"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("du2mod5");const o=document.createElement("p");o.className="subtitle",o.textContent=n("du1mod3Desc");const l=[{icon:"📧",titleKey:"emailLaan",action:()=>i("email_laan")},{icon:"👨‍👩‍👧‍👦",titleKey:"opdragelse",action:()=>i("opdragelse")},{icon:"📢",titleKey:"enKlage",action:()=>i("en_klage")}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const s=document.createElement("div");s.className="card",s.onclick=a.action;const g=document.createElement("div");g.className="card-icon",g.textContent=a.icon;const m=document.createElement("div");m.className="card-title",m.textContent=n(a.titleKey),s.appendChild(g),s.appendChild(m),c.appendChild(s)}),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(c),p.appendChild(e)}function ke(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("du2_modul5"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("emailLaan");const o=document.createElement("div");o.className="card",o.style.cursor="pointer",o.onclick=()=>window.open("https://padlet.com/mibf/e-mail-om-l-n-af-penge-pkdkrzrhemi6ftc4","_blank");const l=document.createElement("div");l.className="card-icon",l.textContent="📧";const c=document.createElement("div");c.className="card-title",c.textContent=n("emailLaan")+" (padlet)",o.appendChild(l),o.appendChild(c),e.appendChild(r),e.appendChild(d),e.appendChild(o),p.appendChild(e)}function fe(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("du2_modul5"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("opdragelse");const o=document.createElement("div");o.className="card",o.style.cursor="pointer",o.onclick=()=>window.open("https://padlet.com/mibf/fort-l-om-hvordan-du-blev-opdraget-se-opgave-16-side-48-i-fo-zhgtyifmg9e4f5ut","_blank");const l=document.createElement("div");l.className="card-icon",l.textContent="👨‍👩‍👧‍👦";const c=document.createElement("div");c.className="card-title",c.textContent=n("opdragelse")+" (padlet)",o.appendChild(l),o.appendChild(c),e.appendChild(r),e.appendChild(d),e.appendChild(o),p.appendChild(e)}function xe(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("du2_modul5"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("enKlage");const o=document.createElement("div");o.className="card",o.style.cursor="pointer",o.onclick=()=>window.open("https://padlet.com/mibf/en-klage-fv80qrahnyjw5e45","_blank");const l=document.createElement("div");l.className="card-icon",l.textContent="📢";const c=document.createElement("div");c.className="card-title",c.textContent=n("enKlage")+" (padlet)",o.appendChild(l),o.appendChild(c),e.appendChild(r),e.appendChild(d),e.appendChild(o),p.appendChild(e)}function ye(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("dagens_opgave"),r.appendChild(t),e.appendChild(r);const d=document.createElement("h1");d.textContent=n("traenTidsudtryk");const o=document.createElement("p");o.className="subtitle",o.textContent=n("traenTidsudtrykDesc"),e.appendChild(d),e.appendChild(o);const l=[{text:"Jeg drak kaffe [blank_0].",blanks:[{answer:"i morges",options:["i morges","i morgen","nu"],hint:"Se på verbet 'drak'. Er det nutid eller datid?"}]},{text:"Vi drikker vand [blank_0].",blanks:[{answer:"nu",options:["nu","i går","på torsdag"],hint:"Se på verbet 'drikker'. Er det nutid eller datid?"}]},{text:"Han skal til lægen [blank_0].",blanks:[{answer:"i morgen",options:["i morgen","i går","nu"],hint:"Se på verbet 'skal'. Det indikerer noget, der sker senere."}]},{text:"Hun var i biografen [blank_0].",blanks:[{answer:"i går",options:["i går","nu","i næste uge"],hint:"Se på verbet 'var'. Er det nutid eller datid?"}]},{text:"De spiller fodbold [blank_0].",blanks:[{answer:"om søndagen",options:["om søndagen","i går","på fredag"],hint:"Her beskrives noget, man gør hver uge."}]},{text:"Vi rejser til Spanien [blank_0].",blanks:[{answer:"i næste uge",options:["i næste uge","nu","i går"],hint:"Det er en plan for fremtiden."}]},{text:"Jeg læste en bog [blank_0].",blanks:[{answer:"i lørdags",options:["i lørdags","på søndag","i morgen"],hint:"Se på verbet 'læste'. Er det nutid eller datid?"}]},{text:"[blank_0] drikker vi kaffe.",blanks:[{answer:"Om morgenen",options:["Om morgenen","I går","I morgen"],hint:"Vi gør det som en vane hver dag."}]},{text:"[blank_0] var jeg træt.",blanks:[{answer:"I går",options:["I går","Nu","På mandag"],hint:"Se på verbet 'var'. Det er datid."}]},{text:"Jeg køber ind [blank_0].",blanks:[{answer:"i morgen",options:["i morgen","nu","i går"],hint:"Her er tale om en plan for fremtiden."}]},{text:"[blank_0] skal vi på ferie.",blanks:[{answer:"I næste måned",options:["I næste måned","I går","Nu"],hint:"Det er noget, der skal ske i fremtiden."}]},{text:"Vi går en tur [blank_0].",blanks:[{answer:"hver dag",options:["hver dag","i går","i morgen"],hint:"Det er noget, vi gør fast."}]},{text:"[blank_0] drak jeg en øl.",blanks:[{answer:"I fredags",options:["I fredags","Nu","På søndag"],hint:"Se på verbet 'drak'. Det er datid."}]},{text:"[blank_0] skal hun til fest.",blanks:[{answer:"På lørdag",options:["På lørdag","I går","Nu"],hint:"Det er en plan for fremtiden."}]},{text:"De ser fjernsyn [blank_0].",blanks:[{answer:"nu",options:["nu","i går","på torsdag"],hint:"Det foregår lige nu."}]}];let c=0;const a=document.createElement("div");a.className="exercise-card",e.appendChild(a);function s(){a.innerHTML="";const g=l[c],m=document.createElement("div");m.className="exercise-progress",m.style.textAlign="center",m.style.marginBottom="1rem",m.style.fontSize="0.9rem",m.style.opacity="0.7",m.textContent=`${c+1} / ${l.length}`,a.appendChild(m);const h=document.createElement("div");h.className="grammatik-text-container",g.text.split(/(\[blank_\d+\])/).forEach(E=>{const D=E.match(/\[blank_(\d+)\]/);if(D){const k=D[1],w=document.createElement("span");w.className="select-wrapper";const C=document.createElement("select");C.className="grammatik-select",C.dataset.idx=k;const _=document.createElement("option");_.value="",_.textContent="...",C.appendChild(_),g.blanks[k].options.forEach(A=>{const y=document.createElement("option");y.value=A,y.textContent=A,C.appendChild(y)}),w.appendChild(C),h.appendChild(w)}else{const k=document.createElement("span");k.textContent=E,h.appendChild(k)}}),a.appendChild(h);const x=document.createElement("div");x.className="exercise-feedback",a.appendChild(x);const T=document.createElement("div");T.className="game-controls";const u=document.createElement("button");u.className="gemini-btn",u.textContent=n("checkAnswers"),u.onclick=()=>{const E=h.querySelectorAll("select");let D=!0,k="";E.forEach(w=>{const C=w.dataset.idx;w.value===g.blanks[C].answer?(w.classList.add("correct"),w.classList.remove("wrong")):(w.classList.add("wrong"),w.classList.remove("correct"),D=!1,k||(k=g.blanks[C].hint))}),D?(x.style.display="none",u.style.display="none",b.style.display="inline-block"):(x.textContent=k||n("hintContext"),x.style.display="block")};const b=document.createElement("button");b.className="gemini-btn",b.textContent=c<l.length-1?n("next"):n("finish"),b.style.display="none",b.onclick=()=>{c<l.length-1?(c++,s()):i("dagens_opgave")},T.appendChild(u),T.appendChild(b),a.appendChild(T)}s(),p.appendChild(e)}function we(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("main"),r.appendChild(t);const d=document.createElement("h1");d.textContent=n("lavSporgsmal");const o=document.createElement("p");o.className="subtitle",o.textContent=n("lavSporgsmalDesc");const l=document.createElement("div");l.className="thematic-image-container",l.style.margin="2rem auto";const c=document.createElement("img");c.src=`${F}questions.png`,c.alt="Spørgsmålsdannelse illustration",l.appendChild(c);const a=document.createElement("div");a.className="consent-container";const s=document.createElement("input");s.type="checkbox",s.className="consent-checkbox",s.id="gemini-consent-lav-sporgsmal";const g=document.createElement("label");g.htmlFor="gemini-consent-lav-sporgsmal",g.className="consent-text",g.textContent=n("geminiConsentText"),a.appendChild(s),a.appendChild(g);const m=document.createElement("div");m.className="gemini-btn-container";const h=document.createElement("a");h.href="https://gemini.google.com/gem/1OKZRFhv_TlP2M32ApMHWsFVh4aCLHdNU?usp=sharing",h.target="_blank",h.className="gemini-btn disabled",h.textContent=n("lavSporgsmalBtnText"),m.appendChild(h),s.addEventListener("change",v=>{v.target.checked?h.classList.remove("disabled"):h.classList.add("disabled")}),e.appendChild(r),e.appendChild(d),e.appendChild(o),e.appendChild(l),e.appendChild(a),e.appendChild(m),p.appendChild(e)}function Ce(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.innerHTML=`← ${n("back")}`,t.onclick=()=>{l.style.display==="block"?(l.style.display="none",o.style.display="block",d.textContent=n("ordstilling")):i("dagens_opgave")},r.appendChild(t),e.appendChild(r);const d=document.createElement("h1");d.textContent=n("ordstilling"),e.appendChild(d);const o=document.createElement("div"),l=document.createElement("div");l.style.display="none";const c=document.createElement("p");c.className="subtitle",c.textContent=n("ordstillingDesc"),o.appendChild(c);const a=[{key:"let",level:"A1",icon:"🌱"},{key:"mellemsvaer",level:"A2",icon:"🌿"}],s=document.createElement("div");s.className="grid",a.forEach(m=>{const h=document.createElement("div");h.className="card",h.onclick=()=>g(m.level);const v=document.createElement("div");v.className="card-icon",v.textContent=m.icon;const x=document.createElement("div");x.className="card-title",x.textContent=n(m.key),h.appendChild(v),h.appendChild(x),s.appendChild(h)}),o.appendChild(s),e.appendChild(o);function g(m){o.style.display="none",l.style.display="block",l.innerHTML="",d.textContent=n(m==="A1"?"ordstillingLet":"ordstillingSvaer");const x=m==="A1"?["Jeg hedder Mikael.","Jeg kommer fra Danmark.","Hvor gammel er du?","Jeg bor i København.","Hvad laver du?","Jeg har en hund.","Min bil er rød.","Kaffen er varm."]:["Solen skinner altid i min have.","Jeg kan godt lide at lære dansk.","Vi ses i morgen på sprogskolen.","Kan du tale dansk og engelsk?","I går var jeg i biografen med min ven.","Jeg skal købe ind i supermarkedet nu.","Hvorfor kom du ikke til festen?","Det er vigtigt at øve sig hver dag."];let T=Math.floor(Math.random()*x.length),u,b,E,D;function k(){u=x[T],b=u.split(" "),E=[...b].sort(()=>Math.random()-.5),D=[]}const w=document.createElement("div");w.className="result-sentence-area";const C=document.createElement("div");C.className="word-pool";const _=document.createElement("div");_.className="game-feedback";const A=document.createElement("div");A.className="game-controls";const y=document.createElement("button");y.className="gemini-btn",y.textContent=n("checkResult"),y.onclick=()=>{D.join(" ")===u?(_.textContent=n("correctOrder"),_.className="game-feedback success",y.style.display="none",S.style.display="inline-block"):(_.textContent=n("wrongOrder"),_.className="game-feedback error")};const S=document.createElement("button");S.className="gemini-btn",S.textContent="Næste →",S.style.display="none",S.onclick=()=>{T=(T+1)%x.length,B()};function B(){k(),l.innerHTML="";const j=document.createElement("img");j.src=F+"v2_master_diagram.png",j.className="v2-illustration",l.appendChild(j),l.appendChild(w),l.appendChild(C),l.appendChild(_),A.innerHTML="",A.appendChild(y),A.appendChild(S),l.appendChild(A),y.style.display="inline-block",S.style.display="none",_.textContent="",f()}function f(){C.innerHTML="",E.forEach((j,H)=>{const z=document.createElement("div");z.className="word-chip",z.textContent=j,z.onclick=()=>{E.splice(H,1),D.push(j),f()},C.appendChild(z)}),w.innerHTML="",D.length===0?w.innerHTML='<div class="result-placeholder">...</div>':D.forEach((j,H)=>{const z=document.createElement("div");z.className="word-chip result-chip",z.textContent=j,z.onclick=()=>{D.splice(H,1),E.push(j),f()},w.appendChild(z)})}B()}if(e.appendChild(l),p.appendChild(e),!document.getElementById("ordstilling-styles")){const m=document.createElement("style");m.id="ordstilling-styles",m.textContent=`
            .ordstilling-game-area { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin-top: 0.5rem; }
            .result-sentence-area { width: 100%; min-height: 60px; background: rgba(255, 255, 255, 0.05); border: 2px dashed rgba(255, 255, 255, 0.2); border-radius: 16px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.5rem; padding: 0.8rem; margin-bottom: 1.5rem; }
            @media (max-width: 600px) {
                .result-sentence-area { min-height: 50px; padding: 0.6rem; gap: 0.4rem; border-radius: 12px; }
            }
            .result-placeholder { color: rgba(255, 255, 255, 0.3); font-size: 1.2rem; }
            .word-pool { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; width: 100%; margin-bottom: 1.5rem; }
            @media (max-width: 600px) {
                .word-pool { gap: 0.4rem; }
            }
            .word-chip { background: var(--card-bg); border: 2px solid rgba(255, 255, 255, 0.1); color: var(--text-main); padding: 0.6rem 1rem; border-radius: 10px; cursor: pointer; font-size: 1rem; font-weight: 500; transition: all 0.2s; user-select: none; }
            @media (max-width: 600px) {
                .word-chip { padding: 0.5rem 0.8rem; font-size: 0.95rem; border-radius: 8px; }
            }
            .word-chip:hover { background: var(--card-hover); transform: translateY(-2px); border-color: rgba(255, 255, 255, 0.5); }
            .result-chip { background: rgba(255, 255, 255, 0.15); border-color: var(--ring-color); }
            .game-controls { display: flex; gap: 1rem; justify-content: center; }
            .game-feedback { font-size: 1.1rem; font-weight: 600; min-height: 1.5rem; transition: all 0.3s; text-align: center; margin-bottom: 1rem; }
            @media (max-width: 600px) {
                .game-feedback { font-size: 1rem; }
            }
            .game-feedback.success { color: #4CAF50; }
            .game-feedback.error { color: #FF5252; }
            .v2-illustration {
                width: 100%;
                max-width: 500px;
                height: auto;
                border-radius: 16px;
                margin-bottom: 1.5rem;
                display: block;
                margin-left: auto;
                margin-right: auto;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            }
            @media (max-width: 600px) {
                .v2-illustration { border-radius: 10px; margin-bottom: 1rem; }
            }
        `,document.head.appendChild(m)}}function Ee(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.innerHTML=`← ${n("back")}`,t.onclick=()=>i("main"),r.appendChild(t),e.appendChild(r);const d=document.createElement("h1");d.textContent=n("traenGrammatik"),e.appendChild(d);const o=document.createElement("div"),l=document.createElement("div");l.style.display="none";const c=document.createElement("p");c.className="subtitle",c.textContent=n("grammatikIntro"),o.appendChild(c);const a=[{key:"let",level:"A1",icon:"🌱"},{key:"mellemsvaer",level:"A2",icon:"🌿"},{key:"svaer",level:"B1",icon:"🌳"},{key:"modultest",level:"modultest",icon:"🎓"}],s=document.createElement("div");s.className="grid",a.forEach(m=>{const h=document.createElement("div");h.className="card",h.onclick=()=>g(m.level);const v=document.createElement("div");v.className="card-icon",v.textContent=m.icon;const x=document.createElement("div");x.className="card-title",x.textContent=n(m.key),h.appendChild(v),h.appendChild(x),s.appendChild(h)}),o.appendChild(s),e.appendChild(o);function g(m){o.style.display="none",l.style.display="block",l.innerHTML="";const h=document.createElement("h2");h.textContent=n(m==="A1"?"let":m==="A2"?"mellemsvaer":m==="B1"?"svaer":"modultest"),h.style.textAlign="center",l.appendChild(h);const v=De(m);let x=0;function T(){l.innerHTML="",l.appendChild(h);const u=v[x];if(m==="modultest"){const y=document.createElement("div");y.className="word-list-hint";const B=[...u.blanks.map(f=>f.answer)].sort(()=>Math.random()-.5);y.textContent=B.join(", "),l.appendChild(y)}const b=document.createElement("div");b.className="grammatik-text-container",u.text.split(/(\[blank_\d+\])/).forEach(y=>{const S=y.match(/\[blank_(\d+)\]/);if(S){const B=S[1],f=document.createElement("span");f.className="select-wrapper";const j=document.createElement("select");j.className="grammatik-select",j.dataset.idx=B;const H=document.createElement("option");H.value="",H.textContent="...",j.appendChild(H);let z=[...u.blanks[B].options];z.sort(()=>Math.random()-.5),z.forEach(I=>{const K=document.createElement("option");K.value=I,K.textContent=I,j.appendChild(K)}),f.appendChild(j),b.appendChild(f)}else{const B=document.createElement("span");B.textContent=y,b.appendChild(B)}}),l.appendChild(b);const D=document.createElement("div");D.className="exercise-feedback",l.appendChild(D);const k=document.createElement("div");k.className="grammatik-summary",l.appendChild(k);function w(){const y=b.querySelectorAll("select"),S=Array.from(y).filter(j=>j.value!=="").length,B=Array.from(y).filter(j=>j.classList.contains("correct")).length,f=y.length;S===0?k.textContent="":B===f?(k.innerHTML=`<span class="success">${n("allCorrect")}</span>`,_.style.display="none",A.style.display="block",D.style.display="none"):k.textContent=`${S} / ${f} ${n("filled")||"udfyldt"}`}b.querySelectorAll("select").forEach(y=>{y.onchange=()=>{const S=y.dataset.idx;if(y.value==="")y.classList.remove("correct","wrong"),D.style.display="none";else if(y.value===u.blanks[S].answer)y.classList.add("correct"),y.classList.remove("wrong"),D.style.display="none";else{y.classList.add("wrong"),y.classList.remove("correct");const B=y.value,f=u.blanks[S].hints&&u.blanks[S].hints[B]||"hintContext";D.textContent=n(f),D.style.display="block"}w()}});const C=document.createElement("div");C.className="game-controls";const _=document.createElement("button");_.className="gemini-btn",_.textContent=n("checkAnswers"),_.onclick=()=>{const y=b.querySelectorAll("select");let S=!0,B="";y.forEach(f=>{const j=f.dataset.idx;if(f.value===u.blanks[j].answer)f.classList.add("correct"),f.classList.remove("wrong");else if(f.classList.add("wrong"),f.classList.remove("correct"),S=!1,!B){const H=u.blanks[j].hints&&u.blanks[j].hints[f.value]||"hintContext";B=n(H)}}),!S&&B?(D.textContent=B,D.style.display="block"):S&&(D.style.display="none"),w()};const A=document.createElement("button");A.className="gemini-btn",A.textContent=n("newExercise"),A.style.display="none",A.onclick=()=>{x=(x+1)%v.length,T()},C.appendChild(_),C.appendChild(A),l.appendChild(C),w()}T()}e.appendChild(l),p.appendChild(e)}function De(p){return p==="A1"?[{text:"Jeg [blank_0] i København. Jeg har en lille [blank_1]. Her bor jeg sammen med min [blank_2]. Vi [blank_3] ofte mad sammen i køkkenet. Min kone er en rigtig god [blank_4]. Om morgenen [blank_5] vi kaffe. Vi [blank_6] også en avis sammen. Det er en [blank_7] dag i dag. Vi er meget [blank_8] for vores liv.",blanks:[{answer:"bor",options:["bor","spiser","læser"],hints:{spiser:"hintAction",læser:"hintAction"}},{answer:"lejlighed",options:["lejlighed","bil","bord"],hints:{bil:"hintContext",bord:"hintPlace"}},{answer:"kone",options:["kone","ven","hund"],hints:{ven:"hintContext",hund:"hintContext"}},{answer:"laver",options:["laver","drikker","køber"],hints:{drikker:"hintAction",køber:"hintMean"}},{answer:"kok",options:["kok","bog","skole"],hints:{bog:"hintContext",skole:"hintPlace"}},{answer:"drikker",options:["drikker","spiser","ser"],hints:{spiser:"hintMean",ser:"hintAction"}},{answer:"læser",options:["læser","hører","går"],hints:{hører:"hintContext",går:"hintAction"}},{answer:"dejlig",options:["dejlig","sur","kold"],hints:{sur:"hintMean",kold:"hintContext"}},{answer:"glade",options:["glade","trætte","sure"],hints:{trætte:"hintContext",sure:"hintMean"}}]}]:p==="A2"?[{text:"Det er [blank_0] vejr i dag. Solen skinner [blank_1], og vi [blank_2] en tur i den grønne skov. Vi ser mange [blank_3] træer med friske blade. Vi går [blank_4] for at nyde den smukke natur. Fuglene [blank_5] lystigt i trætoppene. Det [blank_6] som om, at sommeren endelig er på vej. Vi [blank_7] os til at spise frokost i det fri bagefter. Det bliver en [blank_8] oplevelse for os alle.",blanks:[{answer:"dejligt",options:["dejligt","langsomt","aldrig"],hints:{langsomt:"hintAdj",aldrig:"hintAdverb"}},{answer:"kraftigt",options:["kraftigt","smukt","ofte"],hints:{smukt:"hintAdj",ofte:"hintAdverb"}},{answer:"går",options:["går","gik","gået"],hints:{gik:"hintTense",gået:"hintTense"}},{answer:"høje",options:["høje","høj","højt"],hints:{høj:"hintForm",højt:"hintForm"}},{answer:"langsomt",options:["langsomt","langsom","hurtig"],hints:{langsom:"hintForm",hurtig:"hintAdj"}},{answer:"synger",options:["synger","sang","sunget"],hints:{sang:"hintTense",sunget:"hintTense"}},{answer:"føles",options:["føles","føler","føltes"],hints:{føler:"hintForm",føltes:"hintTense"}},{answer:"glæder",options:["glæder","glædede","glade"],hints:{glædede:"hintTense",glade:"hintForm"}},{answer:"fantastisk",options:["fantastisk","fantastiske","fantastisket"],hints:{fantastiske:"hintForm",fantastisket:"hintMean"}}]}]:p==="B1"?[{text:"Jeg tager ofte bussen på arbejde, [blank_0] min bil desværre er gået i stykker igen. Selvom det regner [blank_1], foretrækker jeg dog normalt at køre selv. Det er [blank_2] irriterende, da jeg har mange [blank_3] aftaler i løbet af i dag. Jeg [blank_4] dog planlægge min rute [blank_5], så jeg ikke kommer for sent. Heldigvis [blank_6] bussen lige uden for min dør. Hvis jeg [blank_7] mig lidt, kan jeg lige præcis nå den. Det [blank_8] meget tålmodighed at bruge offentlig transport hver eneste dag.",blanks:[{answer:"fordi",options:["fordi","selvom","men"],hints:{selvom:"hintConj",men:"hintConj"}},{answer:"kraftigt",options:["kraftigt","kraftig","kraftige"],hints:{kraftig:"hintForm",kraftige:"hintForm"}},{answer:"temmelig",options:["temmelig","temmelige","temmeligt"],hints:{temmelige:"hintForm",temmeligt:"hintForm"}},{answer:"vigtige",options:["vigtige","vigtig","vigtigt"],hints:{vigtig:"hintForm",vigtigt:"hintForm"}},{answer:"må",options:["må","skal","kan"],hints:{skal:"hintContext",kan:"hintContext"}},{answer:"omhyggeligt",options:["omhyggeligt","omhyggelig","omhyggelige"],hints:{omhyggelig:"hintForm",omhyggelige:"hintForm"}},{answer:"holder",options:["holder","holdt","holdt"],hints:{holdt:"hintTense"}},{answer:"skynder",options:["skynder","skyndte","skyndet"],hints:{skyndte:"hintTense",skyndet:"hintTense"}},{answer:"kræver",options:["kræver","krævede","krævet"],hints:{krævede:"hintTense",krævet:"hintTense"}}]}]:p==="modultest"?[{text:"Velkommen til den store [blank_0], hvor vi skal teste dit danske sprog. Denne tekst er [blank_1] end de andre, da den fylder ti linjer. Du skal læse hele teksten [blank_2] for at forstå sammenhængen rigtigt. Det er vigtigt at du [blank_3] dig om, før du vælger et ord. Der er mange [blank_4] i listen ovenover, som du kan bruge. Hvis du laver en [blank_5], kan du altid prøve igen her. Vi håber at du får alle svar [blank_6] i første forsøg. Det kræver meget [blank_7] at lære et nyt sprog helt perfekt. Men vi ved at du [blank_8] gøre det, hvis du øver dig meget. Rigtig god [blank_9] med denne svære modultest opgave!",blanks:[{answer:"modultest",options:["modultest","eksamen","prøve"]},{answer:"længere",options:["længere","kort","sværere"]},{answer:"grundigt",options:["grundigt","hurtigt","nemt"]},{answer:"umager",options:["umager","gør","passer"]},{answer:"ord",options:["ord","tekster","sætninger"]},{answer:"fejl",options:["fejl","kage","pause"]},{answer:"rigtige",options:["rigtige","forkerte","sjove"]},{answer:"arbejde",options:["arbejde","hygge","mad"]},{answer:"kan",options:["kan","skal","får"]},{answer:"fornøjelse",options:["fornøjelse","lykke","held"]}]}]:[]}function je(p){const i=[[{sentence:"Jeg kan ____ lide at læse.",options:["måske","godt","ikke"],correct:"godt"},{sentence:"Han kommer ____ i morgen.",options:["måske","godt","ikke"],correct:"måske"},{sentence:"Jeg har ____ tid i dag.",options:["måske","godt","ikke"],correct:"ikke"},{sentence:"Vi skal ____ ud at spise.",options:["måske","godt","ikke"],correct:"måske"},{sentence:"De kan ____ svømme.",options:["måske","godt","ikke"],correct:"godt"}],[{sentence:"Du må ____ glemme din taske.",options:["måske","godt","ikke"],correct:"ikke"},{sentence:"Det bliver ____ regnvejr.",options:["måske","godt","ikke"],correct:"måske"},{sentence:"Hun synger meget ____.",options:["måske","godt","ikke"],correct:"godt"},{sentence:"Jeg forstår ____ spørgsmålet.",options:["måske","godt","ikke"],correct:"ikke"},{sentence:"Vi ses ____ på mandag.",options:["måske","godt","ikke"],correct:"måske"}]];let e=0,r=[null,null,null,null,null];function t(){const d=i[e];if(!document.getElementById("adv-choice-styles")){const c=document.createElement("style");c.id="adv-choice-styles",c.textContent=`
                .adv-choice-container { max-width: 800px; margin: 2rem auto; padding: 2.5rem; }
                .adv-choice-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem; }
                .adv-choice-set-counter { font-weight: bold; color: var(--primary-color); }
                .questions-list { display: flex; flex-direction: column; gap: 1.5rem; }
                .question-row { display: flex; align-items: center; gap: 0.6rem; font-size: 1.2rem; line-height: 1.4; flex-wrap: wrap; }
                .adverb-select-input {
                    padding: 0.4rem 0.6rem;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    background: var(--bg-card);
                    color: var(--text-primary);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .adv-choice-controls { margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
                
                @media (max-width: 600px) {
                    .adv-choice-container { margin: 1rem; padding: 1.5rem; }
                    .question-row { font-size: 1.05rem; gap: 0.4rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.8rem; }
                    .adverb-select-input { font-size: 0.95rem; padding: 0.3rem 0.5rem; }
                    .adv-choice-controls { flex-direction: column; align-items: stretch; }
                    .adv-choice-controls button { width: 100%; }
                }
            `,document.head.appendChild(c)}p.innerHTML=`
            <div class="exercise-container premium-card animate-fade-in adv-choice-container">
                <button id="adv-back-btn" class="back-btn" style="margin-bottom: 1.5rem;">
                    <i class="fas fa-arrow-left"></i> ${n("back")}
                </button>
                
                <div class="adv-choice-header">
                    <h2 style="color: var(--primary-color); margin: 0;">
                        ${n("advChoiceTitle")}
                    </h2>
                    <span class="adv-choice-set-counter">
                        Set ${e+1} / 2
                    </span>
                </div>
                
                <p style="color: var(--text-secondary); margin-bottom: 2.5rem;">
                    ${n("advChoiceDesc")}
                </p>
 
                <div class="questions-list">
                    ${d.map((c,a)=>{const s=c.sentence.split("____"),g=r[a]===null?"rgba(255,255,255,0.1)":r[a]?"#4CAF50":"#F44336";return`
                            <div class="question-row">
                                <span>${s[0]}</span>
                                <select class="adverb-select-input" data-index="${a}" style="border: 2px solid ${g};">
                                    <option value="">...</option>
                                    ${c.options.map(m=>`<option value="${m}" ${r[a]!==null&&c.correct===m?"selected":""}>${m}</option>`).join("")}
                                </select>
                                <span>${s[1]||""}</span>
                                ${r[a]!==null?r[a]?'<i class="fas fa-check" style="color: #4CAF50; margin-left: 0.5rem;"></i>':'<i class="fas fa-times" style="color: #F44336; margin-left: 0.5rem;"></i>':""}
                            </div>
                        `}).join("")}
                </div>
 
                <div class="adv-choice-controls">
                    <button id="check-btn" class="cta-button" style="padding: 0.8rem 1.5rem;">
                        ${n("checkAnswers")}
                    </button>
                    ${e<1?`
                        <button id="next-set-btn" class="secondary-button" style="display: none; padding: 0.8rem 1.5rem;">
                            ${n("newExercise")} <i class="fas fa-arrow-right"></i>
                        </button>
                    `:`
                        <div id="final-success" style="display: none; color: #4CAF50; font-weight: bold; text-align: center;">
                            <i class="fas fa-star"></i> ${n("allCorrect")}
                        </div>
                    `}
                </div>
            </div>
        `,document.getElementById("adv-back-btn").addEventListener("click",()=>{window.location.hash="#/pronomen"});const o=document.getElementById("check-btn"),l=document.getElementById("next-set-btn");document.getElementById("final-success"),o.addEventListener("click",()=>{const c=p.querySelectorAll(".adverb-select-input");let a=!0;if(c.forEach((s,g)=>{const m=s.value,h=d[g].correct;r[g]=m===h,r[g]||(a=!1)}),t(),a)if(e<1){const s=document.getElementById("next-set-btn");s&&(s.style.display="block");const g=document.getElementById("check-btn");g&&(g.style.display="none")}else{const s=document.getElementById("final-success");s&&(s.style.display="block");const g=document.getElementById("check-btn");g&&(g.style.display="none")}}),l&&l.addEventListener("click",()=>{e++,r=[null,null,null,null,null],t()})}t()}function Te(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.innerHTML=`← ${n("back")}`,r.appendChild(t),e.appendChild(r);const d=document.createElement("h1");d.textContent=n("hvilketOrd"),e.appendChild(d);const o=document.createElement("div"),l=document.createElement("div"),c=document.createElement("div"),a=document.createElement("div"),s=document.createElement("div");c.style.display="none",a.style.display="none",s.style.display="none";let g=1;const m=document.createElement("div");m.className="grid",m.style.marginTop="2rem";const h=document.createElement("div");h.className="card",h.innerHTML=`
        <div class="card-icon">👥</div>
        <div class="card-title">${n("hanHamHans")}</div>
    `,h.onclick=()=>E("pronomen");const v=document.createElement("div");v.className="card",v.innerHTML=`
        <div class="card-icon">🏃</div>
        <div class="card-title">${n("gårGikGået")}</div>
    `,v.onclick=()=>E("verbum");const x=document.createElement("div");x.className="card",x.innerHTML=`
        <div class="card-icon">🚪</div>
        <div class="card-title">${n("derErDetEr")}</div>
    `,x.onclick=()=>k();const T=document.createElement("div");T.className="card",T.innerHTML=`
        <div class="card-icon">📈</div>
        <div class="card-title">${n("soedSoedereSoedest")}</div>
    `,T.onclick=()=>i("adjective_comparison");const u=document.createElement("div");u.className="card",u.innerHTML=`
        <div class="card-icon">💨</div>
        <div class="card-title">${n("advChoiceTitle")}</div>
    `,u.onclick=()=>C(),m.appendChild(h),m.appendChild(v),m.appendChild(x),m.appendChild(T),m.appendChild(u),l.appendChild(m),o.appendChild(l);const b=document.createElement("div");b.className="grid",c.appendChild(b),o.appendChild(c);function E(A){g=2,l.style.display="none",c.style.display="block",a.style.display="none",b.innerHTML="",(A==="pronomen"?[{key:"pronominerSubjekt",type:"subjekt",icon:"🔦",img:"pronominer_spotlight.png"},{key:"pronominerObjekt",type:"objekt",icon:"👤",img:"pronominer_objekt.png"},{key:"pronominerPossessiv",type:"possessiv",icon:"🏠",img:"pronominer_possessiv.png"}]:[{key:"verberM3",type:"verber_nutid",icon:"🏃",img:"verber_kategorier.png"}]).forEach(S=>{const B=document.createElement("div");B.className="card",B.onclick=()=>{S.type==="verber_nutid"?i("verbum_menu"):S.key.startsWith("verber")?i("verbum_learning",{categoryId:S.type,backView:"pronomen"}):_(S)};const f=document.createElement("div");f.className="card-icon",f.textContent=S.icon;const j=document.createElement("div");j.className="card-title",j.textContent=n(S.key),B.appendChild(f),B.appendChild(j),b.appendChild(B)})}const D=document.createElement("div");D.className="grid",a.appendChild(D),o.appendChild(a),t.onclick=()=>{s.style.display==="block"?(s.style.display="none",o.style.display="block",g===3?(a.style.display="block",c.style.display="none"):(c.style.display="block",a.style.display="none"),d.textContent=n("hvilketOrd")):a.style.display==="block"?(a.style.display="none",c.style.display="block",g=2,d.textContent=n("hvilketOrd")):c.style.display==="block"?(c.style.display="none",l.style.display="block",g=1,d.textContent=n("hvilketOrd")):i("dagens_opgave")};function k(){o.style.display="none",s.style.display="block",s.innerHTML="",d.textContent=n("derErDetEr");const A=document.createElement("div");A.className="der-er-explanation";const y=document.createElement("div");y.className="expl-slide",y.innerHTML=`
            <img src="${F}der_er_bil_gade.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${n("derErIntro1")}</div>
            <p class="expl-text">${n("derErExpl")}</p>
            <button class="gemini-btn next-slide-btn">Næste →</button>
        `;const S=document.createElement("div");S.className="expl-slide",S.style.display="none",S.innerHTML=`
            <img src="${F}det_er_bil_pegepind.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${n("derErIntro2")}</div>
            <p class="expl-text">Når vi kender tingen (den er inde i rummet), så bruger vi <b>det</b> til at pege.</p>
            <button class="gemini-btn start-practice-btn">Start øvelse!</button>
        `,y.querySelector(".next-slide-btn").onclick=()=>{y.style.display="none",S.style.display="block"},S.querySelector(".start-practice-btn").onclick=()=>{w()},A.appendChild(y),A.appendChild(S),s.appendChild(A)}function w(){s.innerHTML="";const A=[{text:"Se! [blank_0] en hund i haven.",answer:"Der er",options:["Der er","Det er"]},{text:"[blank_0] en stor hund. Se den!",answer:"Det er",options:["Der er","Det er"]},{text:"Hvem banker på døren? [blank_0] nok min mor.",answer:"Det er",options:["Der er","Det er"]},{text:"[blank_0] mange mennesker i toget i dag.",answer:"Der er",options:["Der er","Det er"]},{text:"[blank_0] en dejlig kop kaffe, du har her.",answer:"Det er",options:["Der er","Det er"]}];let y=0;function S(){s.innerHTML="";const f=A[y],j=document.createElement("div");j.className="pronomen-exercise-content";const H=document.createElement("div");H.className="exercise-progress",H.textContent=`Opgave ${y+1} af ${A.length}`,j.appendChild(H);const z=document.createElement("div");z.className="grammatik-text-container",f.text.split(/(\[blank_0\])/).forEach(W=>{if(W==="[blank_0]"){const M=document.createElement("select");M.className="grammatik-select";const O=document.createElement("option");O.value="",O.textContent="...",M.appendChild(O),f.options.forEach(G=>{const P=document.createElement("option");P.value=G,P.textContent=G,M.appendChild(P)});const $=document.createElement("div");$.className="exercise-feedback";const V=document.createElement("span");V.className="select-wrapper",V.appendChild(M),z.appendChild(V),M.onchange=()=>{M.value===f.answer?(M.classList.add("correct"),M.classList.remove("wrong"),$.style.display="none",K.disabled=!1):M.value!==""?(M.classList.add("wrong"),M.classList.remove("correct"),$.textContent=n("hintDerDet"),$.style.display="block",K.disabled=!0):(M.classList.remove("correct","wrong"),$.style.display="none",K.disabled=!0)},j.appendChild($)}else{const M=document.createElement("span");M.textContent=W,z.appendChild(M)}}),j.appendChild(z);const K=document.createElement("button");K.className="gemini-btn",K.textContent="Check",K.disabled=!0,K.onclick=()=>{y++,y<A.length?S():B()},j.appendChild(K),s.appendChild(j)}function B(){s.innerHTML=`
                <div class="pronomen-exercise-content">
                    <h2>Flot klaret! 🎉</h2>
                    <p>Du har styr på 'Der er' og 'Det er'.</p>
                    <button class="gemini-btn" onclick="location.reload()">Tilbage til menu</button>
                </div>
            `}S()}function C(){o.style.display="none",s.style.display="block",s.innerHTML="",d.textContent=n("adverbChoice"),je(s)}function _(A){o.style.display="none",s.style.display="block",s.innerHTML="",d.textContent=n(A.key);const y=document.createElement("img");y.src=F+A.img,y.className="pronomen-illustration",s.appendChild(y);const S=Ae(A.type);let B=0;function f(){s.querySelectorAll(".pronomen-exercise-content").forEach(V=>V.remove());const H=document.createElement("div");H.className="pronomen-exercise-content";const z=S[B],I=document.createElement("div");I.className="grammatik-text-container",z.text.split(/(\[blank_\d+\])/).forEach(V=>{const G=V.match(/\[blank_(\d+)\]/);if(G){const P=G[1],q=document.createElement("span");q.className="select-wrapper";const J=document.createElement("select");J.className="grammatik-select",J.dataset.idx=P;const Y=document.createElement("option");Y.value="",Y.textContent="...",J.appendChild(Y),[...z.blanks[P].options].sort(()=>Math.random()-.5).forEach(Z=>{const Q=document.createElement("option");Q.value=Z,Q.textContent=Z,J.appendChild(Q)}),I.appendChild(q)}else{const P=document.createElement("span");P.textContent=V,I.appendChild(P)}}),H.appendChild(I);const W=document.createElement("div");W.className="exercise-feedback",H.appendChild(W);const M=document.createElement("div");M.className="game-controls";const O=document.createElement("button");O.className="gemini-btn",O.textContent=n("checkAnswers"),O.onclick=()=>{const V=I.querySelectorAll("select");let G=!0,P="";V.forEach(q=>{const J=q.dataset.idx;q.value===z.blanks[J].answer?(q.classList.add("correct"),q.classList.remove("wrong")):(q.classList.add("wrong"),q.classList.remove("correct"),G=!1,P||(P=n("hintPronominer")))}),G?(W.style.display="none",O.style.display="none",$.style.display="inline-block"):(W.textContent=P,W.style.display="block")};const $=document.createElement("button");$.className="gemini-btn",$.textContent=n("newExercise"),$.style.display="none",$.onclick=()=>{B=(B+1)%S.length,f()},M.appendChild(O),M.appendChild($),H.appendChild(M),s.appendChild(H)}f()}if(e.appendChild(o),e.appendChild(s),p.appendChild(e),!document.getElementById("pronomen-styles")){const A=document.createElement("style");A.id="pronomen-styles",A.textContent=`
            .pronomen-illustration {
                width: 100%;
                max-width: 500px;
                height: auto;
                border-radius: 20px;
                margin: 0 auto 2rem;
                display: block;
                box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                border: 2px solid rgba(255, 255, 255, 0.1);
            }
            @media (max-width: 600px) {
                .pronomen-illustration { margin-bottom: 1.5rem; border-radius: 12px; }
            }
            .expl-slide {
                text-align: center;
                animation: fadeIn 0.5s ease-out;
            }
            .expl-bubble {
                background: white;
                color: #2c3e50;
                padding: 0.8rem 1.2rem;
                border-radius: 20px;
                display: inline-block;
                font-weight: bold;
                margin-bottom: 1.2rem;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                border: 2px solid #3498db;
                font-size: 1.1rem;
            }
            @media (max-width: 600px) {
                .expl-bubble { font-size: 1rem; padding: 0.6rem 1rem; }
            }
            .expl-text {
                font-size: 1.1rem;
                margin-bottom: 1.5rem;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
                color: #ecf0f1;
            }
            @media (max-width: 600px) {
                .expl-text { font-size: 0.95rem; margin-bottom: 1rem; }
            }
            .exercise-progress {
                margin-bottom: 0.8rem;
                font-size: 0.85rem;
                opacity: 0.8;
                text-align: center;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .pulse {
                animation: pulse 2s infinite ease-in-out;
            }
        `,document.head.appendChild(A)}}function Ae(p){return p==="subjekt"?[{text:"Her er en mand. [blank_0] hedder Peter.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Mikael er lærer. [blank_0] bor i Aarhus.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Min far er gammel. [blank_0] er 80 år.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Drengen leger. [blank_0] er glad.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]}]:p==="objekt"?[{text:"Jeg ser en mand. Jeg ser [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]},{text:"Peter er her. Jeg ringer til [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]},{text:"Mikael er træt. Vi hjælper [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]}]:p==="possessiv"?[{text:"Her er Peter. [blank_0] bil er rød.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]},{text:"Mikael har en hund. [blank_0] hund er stor.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]},{text:"Min far er her. [blank_0] hus er gammelt.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]}]:[]}function Se(p,i){const e=document.createElement("div");e.className="view-container grounding-view";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("dagens_opgave"),r.appendChild(t),e.appendChild(r);const d=document.createElement("h1");d.textContent=n("howToBuildSentence");const o=document.createElement("p");o.className="subtitle",o.textContent=n("howToBuildSentenceDesc"),e.appendChild(d),e.appendChild(o);const l=document.createElement("div");l.className="intro-area",l.innerHTML=`
        <div class="illustration-container">
            <img src="${F}images/grounding_balloon_child.png" alt="Balloon and Anchor" class="grounding-img">
        </div>
        <p class="grounding-text">${n("groundingIntro")}</p>
    `,e.appendChild(l);const c=document.createElement("div");c.className="exercise-container",e.appendChild(c);let a={step:1,nounAnchor:"",verbAnchor:"",sentenceParts:[]};function s(){c.innerHTML="",a.step===1?g():a.step===2?m():a.step===3&&h()}function g(){const u=document.createElement("div");u.className="step-content",u.innerHTML=`
            <h3>${n("groundingStep1")}</h3>
            <div class="grounding-interaction">
                <span class="word-bubble">Barn</span>
                <span class="arrow">←</span>
                <select class="grammatik-select" id="noun-select">
                    <option value="">Vælg anker...</option>
                    <option value="Mit">Mit</option>
                    <option value="Et">Et</option>
                    <option value="Det">Det</option>
                    <option value="Dette">Dette</option>
                </select>
            </div>
            <div class="exercise-feedback" id="step-feedback"></div>
        `,c.appendChild(u);const b=u.querySelector("#noun-select");b.onchange=()=>{b.value&&(a.nounAnchor=b.value,a.step=2,setTimeout(s,1e3))}}function m(){const u=document.createElement("div");u.className="step-content",u.innerHTML=`
            <h3>${n("groundingStep2")}</h3>
            <div class="grounding-interaction">
                <span class="word-bubble">At spise</span>
                <span class="arrow">←</span>
                <select class="grammatik-select" id="verb-select">
                    <option value="">Vælg tid...</option>
                    <option value="spiser">spiser (nu)</option>
                    <option value="spiste">spiste (i går)</option>
                    <option value="skal spise">skal spise (senere)</option>
                </select>
            </div>
            <div class="exercise-feedback" id="step-feedback"></div>
        `,c.appendChild(u);const b=u.querySelector("#verb-select");b.onchange=()=>{b.value&&(a.verbAnchor=b.value,a.step=3,setTimeout(s,1e3))}}function h(){const u=document.createElement("div");u.className="step-content",u.innerHTML=`
            <h3>${n("groundingStep3")}</h3>
            <p>Træk ordene ned på jorden for at bygge din sætning.</p>
            
            <div class="drag-source" id="source">
                <div class="drag-item" draggable="true" data-word="${a.nounAnchor}">${a.nounAnchor}</div>
                <div class="drag-item" draggable="true" data-word="barn">barn</div>
                <div class="drag-item" draggable="true" data-word="${a.verbAnchor}">${a.verbAnchor}</div>
            </div>

            <div class="drop-zone-container">
                <p class="ground-label">${n("sentenceGround")}</p>
                <div class="drop-zone" id="ground"></div>
            </div>

            <div class="controls">
                <button class="gemini-btn" id="check-btn">${n("checkResult")}</button>
            </div>
            <div class="exercise-feedback" id="step-feedback"></div>
        `,c.appendChild(u);const b=u.querySelectorAll(".drag-item"),E=u.querySelector("#ground"),D=u.querySelector("#source");b.forEach(f=>{f.ondragstart=j=>{j.dataTransfer.setData("text/plain",f.dataset.word),f.classList.add("dragging")},f.ondragend=()=>f.classList.remove("dragging")});let k=null,w=0,C=0,_=null;b.forEach(f=>{f.ontouchstart=j=>{k=f,_=f.parentElement;const H=j.touches[0],z=f.getBoundingClientRect();u.getBoundingClientRect(),w=H.clientX-z.left,C=H.clientY-z.top,f.classList.add("dragging"),f.style.position="absolute",f.style.zIndex="2000",f.style.width=z.width+"px",f.style.pointerEvents="none",f.style.transition="none",u.style.position="relative",u.appendChild(f),A(H.clientX,H.clientY),j.preventDefault()},f.ontouchmove=j=>{if(!k)return;const H=j.touches[0];A(H.clientX,H.clientY),j.preventDefault()},f.ontouchend=j=>{if(!k)return;const H=j.changedTouches[0];f.classList.remove("dragging"),f.style.position="",f.style.zIndex="",f.style.width="",f.style.top="",f.style.left="",f.style.pointerEvents="",f.style.transition="";const z=document.elementFromPoint(H.clientX,H.clientY),I=z?.closest(".drop-zone")||z?.closest(".drag-source");if(I)if(I.id==="ground"){const K=y(E,H.clientX);K==null?E.appendChild(f):E.insertBefore(f,K)}else D.appendChild(f);else _.appendChild(f);k=null,j.preventDefault()}});function A(f,j){if(k){const H=u.getBoundingClientRect();k.style.left=f-H.left-w+"px",k.style.top=j-H.top-C+"px"}}E.ondragover=f=>f.preventDefault(),E.ondrop=f=>{f.preventDefault();const j=f.dataTransfer.getData("text/plain"),H=D.querySelector(`.drag-item[data-word="${j}"]`)||E.querySelector(`.drag-item[data-word="${j}"]`);if(H){const z=y(E,f.clientX);z==null?E.appendChild(H):E.insertBefore(H,z)}};function y(f,j){return[...f.querySelectorAll(".drag-item:not(.dragging)")].reduce((z,I)=>{const K=I.getBoundingClientRect(),W=j-K.left-K.width/2;return W<0&&W>z.offset?{offset:W,element:I}:z},{offset:Number.NEGATIVE_INFINITY}).element}D.ondragover=f=>f.preventDefault(),D.ondrop=f=>{f.preventDefault();const j=document.querySelector(".drag-item.dragging");j&&D.appendChild(j)};const S=u.querySelector("#check-btn"),B=u.querySelector("#step-feedback");S.onclick=()=>{const f=Array.from(E.children).map(H=>H.dataset.word).join(" "),j=`${a.nounAnchor} barn ${a.verbAnchor}`.toLowerCase();f.toLowerCase()===j?(B.textContent="Flot! Se animationen nedenfor.",B.className="exercise-feedback success-text",B.style.display="block",S.disabled=!0,v(u,()=>{x(u),setTimeout(()=>{T(u)},5500)})):(B.textContent=n("wrongOrder"),B.className="exercise-feedback",B.style.display="block")}}function v(u,b){let E=u.querySelector(".focus-container");E||(E=document.createElement("div"),E.className="focus-container animate-in",u.appendChild(E));const D=a.nounAnchor.toLowerCase();let k="",w="";D==="mit"?(w="Mit barn (relation)",k=`
                <div class="focus-scene relation-scene">
                    <svg viewBox="0 0 200 100" class="focus-svg">
                        <circle cx="60" cy="40" r="10" class="stickman-head"/>
                        <line x1="60" y1="50" x2="60" y2="80" class="stickman-body"/>
                        <line x1="60" y1="60" x2="80" y2="70" class="stickman-arm speaker-arm"/>
                        <circle cx="100" cy="55" r="7" class="stickman-head child-head"/>
                        <line x1="100" y1="62" x2="100" y2="85" class="stickman-body"/>
                        <line x1="100" y1="70" x2="80" y2="70" class="stickman-arm child-arm"/>
                        <path d="M 80 65 Q 85 55 90 65" class="relation-heart" />
                    </svg>
                </div>
            `):D==="et"?(w="Et barn (ubestemt)",k=`
                <div class="focus-scene indefinite-scene">
                    <svg viewBox="0 0 200 100" class="focus-svg">
                        <g class="faint-child" transform="translate(40,10)">
                            <circle cx="0" cy="40" r="7" /> <line x1="0" y1="47" x2="0" y2="70" />
                        </g>
                        <g class="faint-child" transform="translate(160,10)">
                            <circle cx="0" cy="40" r="7" /> <line x1="0" y1="47" x2="0" y2="70" />
                        </g>
                        <g class="highlight-child" transform="translate(100,0)">
                            <circle cx="0" cy="40" r="7" /> <line x1="0" y1="47" x2="0" y2="70" />
                            <circle cx="0" cy="55" r="30" class="spotlight-circle" />
                        </g>
                    </svg>
                </div>
            `):D==="det"?(w="Det barn (udpegning)",k=`
                <div class="focus-scene distal-scene">
                    <svg viewBox="0 0 200 100" class="focus-svg">
                        <g class="speaker" transform="translate(40,0)">
                            <circle cx="0" cy="40" r="10" /> <line x1="0" y1="50" x2="0" y2="80" />
                            <line x1="0" y1="60" x2="40" y2="55" class="pointing-arm" />
                        </g>
                        <g class="child" transform="translate(150,15)">
                            <circle cx="0" cy="40" r="7" /> <line x1="0" y1="47" x2="0" y2="70" />
                            <path d="M -80 40 L -10 25" class="pointing-beam" />
                        </g>
                    </svg>
                </div>
            `):D==="dette"&&(w="Dette barn (nærhed)",k=`
                <div class="focus-scene proximal-scene">
                    <svg viewBox="0 0 200 100" class="focus-svg">
                        <circle cx="100" cy="60" r="45" class="here-now-circle" />
                        <g class="speaker" transform="translate(85,5)">
                            <circle cx="0" cy="40" r="10" /> <line x1="0" y1="50" x2="0" y2="80" />
                        </g>
                        <g class="child" transform="translate(115,15)">
                            <circle cx="0" cy="40" r="7" /> <line x1="0" y1="47" x2="0" y2="70" />
                        </g>
                    </svg>
                </div>
            `),E.innerHTML=`
            <div class="focus-wrapper">
                <h3>${w}</h3>
                ${k}
            </div>
        `,setTimeout(()=>{E.scrollIntoView({behavior:"smooth",block:"center"})},300),setTimeout(b,5e3)}function x(u){const b=u.querySelector(".focus-container");b&&(b.style.opacity="0.3",b.style.transition="opacity 0.5s");let E=u.querySelector(".timeline-container");E||(E=document.createElement("div"),E.className="timeline-container animate-in",u.appendChild(E)),E.innerHTML=`
            <div class="timeline-wrapper">
                <div class="timeline-line"></div>
                <div class="timeline-points">
                    <div class="time-point" data-tense="past">Datid</div>
                    <div class="time-point" data-tense="present">Nutid</div>
                    <div class="time-point" data-tense="future">Fremtid</div>
                </div>
                <div class="timeline-pointer" id="timeline-pointer">📍</div>
            </div>
        `,setTimeout(()=>{E.scrollIntoView({behavior:"smooth",block:"center"})},300);const D=E.querySelector("#timeline-pointer");let k="50%";a.verbAnchor==="spiste"&&(k="15%"),a.verbAnchor==="skal spise"&&(k="85%"),setTimeout(()=>{D.style.left=k,D.classList.add("bouncing")},100)}function T(u){let b=u.querySelector(".final-completion-container");b||(b=document.createElement("div"),b.className="final-completion-container animate-in",u.appendChild(b)),b.innerHTML=`
            <div class="completion-box">
                <div class="success-icon">✨</div>
                <p class="success-msg">Flot! Du har nu bygget en sætning, der er forankret i virkeligheden.</p>
                <div class="example-box">
                    <span class="example-label">Sætning:</span>
                    <span class="example-text">${a.nounAnchor} barn ${a.verbAnchor}.</span>
                </div>

                <div class="recommendation-box">
                    <h4>Vil du øve mere?</h4>
                    <p class="teaser-text">Sætningen er bygget... men hvem har egentlig kontrollen? Findes der en usynlig kraft mellem barnet og maden?</p>
                    <div class="recommendation-grid">
                        <button class="rec-btn spotlight-btn" id="start-modal">
                            <span class="rec-icon">✨</span>
                            <span class="rec-label">Modalverber (usynlig kraft)</span>
                        </button>
                        <button class="rec-btn" id="rec-bestemthed">
                            <span class="rec-icon">🏷️</span>
                            <span class="rec-label">Bestemthed - En / et</span>
                        </button>
                        <button class="rec-btn" id="rec-pronomen">
                            <span class="rec-icon">👤</span>
                            <span class="rec-label">Pronominer - Han/Ham/Hans</span>
                        </button>
                        <button class="rec-btn" id="rec-verber">
                            <span class="rec-icon">⚡</span>
                            <span class="rec-label">Verber - Går/gik/gået</span>
                        </button>
                    </div>
                </div>

                <button class="gemini-btn outline-btn" id="finish-btn">Afslut og gå tilbage</button>
            </div>
        `,b.querySelector("#finish-btn").onclick=()=>i("dagens_opgave"),b.querySelector("#start-modal").onclick=()=>i("modal_force",a),b.querySelector("#rec-bestemthed").onclick=()=>i("bestemthed"),b.querySelector("#rec-pronomen").onclick=()=>i("pronomen"),b.querySelector("#rec-verber").onclick=()=>i("verbum_learning",{categoryId:"datid"}),setTimeout(()=>{b.scrollIntoView({behavior:"smooth",block:"center"})},100)}if(s(),!document.getElementById("grounding-styles")){const u=document.createElement("style");u.id="grounding-styles",u.textContent=`
            .grounding-view .illustration-container {
                text-align: center;
                margin: 2rem 0;
            }
            .grounding-img {
                max-width: 300px;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .grounding-text {
                font-size: 1.1rem;
                text-align: center;
                max-width: 600px;
                margin: 0 auto 1.5rem;
                line-height: 1.5;
                opacity: 0.9;
            }
            @media (max-width: 600px) {
                .grounding-text { font-size: 1rem; margin-bottom: 1rem; }
            }
            .step-content {
                background: rgba(255, 255, 255, 0.05);
                padding: 2rem;
                border-radius: 24px;
                text-align: center;
                animation: fadeIn 0.5s ease;
            }
            @media (max-width: 600px) {
                .step-content { padding: 1.2rem; border-radius: 16px; }
            }
            .grounding-interaction {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.2rem;
                margin: 1.5rem 0;
            }
            @media (max-width: 600px) {
                .grounding-interaction { gap: 0.8rem; flex-wrap: wrap; }
            }
            .word-bubble {
                background: var(--bg-deep-red);
                padding: 0.8rem 1.5rem;
                border-radius: 50px;
                font-weight: 700;
                font-size: 1.35rem;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            @media (max-width: 600px) {
                .word-bubble { font-size: 1.15rem; padding: 0.6rem 1.2rem; }
            }
            .arrow {
                font-size: 1.8rem;
                opacity: 0.5;
            }
            .drag-source {
                display: flex;
                justify-content: center;
                gap: 0.8rem;
                margin: 1.5rem 0;
                min-height: 50px;
                padding: 0.8rem;
                background: rgba(255,255,255,0.03);
                border-radius: 12px;
                flex-wrap: wrap;
            }
            .drag-item {
                background: rgba(255, 255, 255, 0.1);
                padding: 0.6rem 1.2rem;
                border-radius: 12px;
                cursor: grab;
                font-size: 1.1rem;
                border: 1px solid rgba(255,255,255,0.1);
                transition: transform 0.2s, background 0.2s;
                touch-action: none;
                user-select: none;
            }
            @media (max-width: 600px) {
                .drag-item { font-size: 1rem; padding: 0.5rem 1rem; }
            }
            .drag-item:active { cursor: grabbing; }
            .drag-item.dragging { 
                opacity: 0.8; 
                box-shadow: 0 10px 20px rgba(0,0,0,0.4);
            }
            
            .drop-zone-container {
                margin: 2.5rem 0;
                position: relative;
            }
            .drop-zone {
                min-height: 70px;
                background: rgba(0, 0, 0, 0.2);
                border: 2px dashed rgba(255, 255, 255, 0.2);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 0.8rem;
                flex-wrap: wrap;
            }
            .ground-label {
                position: absolute;
                bottom: -22px;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.5;
            }
            .final-sentence {
                font-size: 1.8rem;
                font-weight: 700;
                color: var(--text-light);
                margin: 1.5rem 0;
                line-height: 1.3;
            }
            @media (max-width: 600px) {
                .final-sentence { font-size: 1.4rem; }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .success-text {
                color: #4CAF50 !important;
                font-weight: 700;
                font-size: 1.35rem;
            }
            @media (max-width: 600px) {
                .success-text { font-size: 1.2rem; }
            }
            
            /* Timeline Styles */
            .timeline-container {
                margin-top: 2rem;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            @media (max-width: 600px) {
                .timeline-container { padding: 1rem; }
            }
            .timeline-wrapper {
                position: relative;
                padding: 30px 0;
                width: 90%;
                margin: 0 auto;
            }
            @media (max-width: 600px) {
                .timeline-wrapper { width: 100%; padding: 25px 5px; }
            }
            .timeline-line {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                transform: translateY(-50%);
            }
            .timeline-points {
                display: flex;
                justify-content: space-between;
                position: relative;
                z-index: 2;
            }
            .time-point {
                font-size: 0.9rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.6;
                transition: opacity 0.3s;
                position: relative;
            }
            @media (max-width: 600px) {
                .time-point { font-size: 0.75rem; letter-spacing: 0.5px; }
            }
            .time-point::after {
                content: '';
                position: absolute;
                bottom: -20px;
                left: 50%;
                width: 12px;
                height: 12px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: translateX(-50%);
            }
            .timeline-pointer {
                position: absolute;
                top: 50%;
                left: 50%;
                font-size: 2rem;
                transform: translate(-50%, -50px);
                transition: left 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                z-index: 3;
                filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
            }
            .animate-in {
                animation: slideUpFade 0.8s ease forwards;
            }
            @keyframes slideUpFade {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .bouncing {
                animation: pointerBounce 2s infinite;
            }
            @keyframes pointerBounce {
                0%, 100% { transform: translate(-50%, -50px); }
                50% { transform: translate(-50%, -60px); }
            }

            /* Focus Scene Styles */
            .focus-container {
                margin-top: 2rem;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.03);
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .focus-wrapper h3 {
                font-size: 1.1rem;
                margin-bottom: 1rem;
                opacity: 0.8;
                color: var(--accent-light, #ffeb3b);
            }
            .focus-svg {
                width: 100%;
                max-width: 400px;
                height: auto;
                stroke: white;
                stroke-width: 3;
                fill: none;
                stroke-linecap: round;
            }
            .stickman-head { stroke-width: 3; }
            .here-now-circle {
                stroke: rgba(255, 235, 59, 0.3);
                fill: rgba(255, 235, 59, 0.05);
                stroke-dasharray: 4 4;
                animation: rotateCircle 20s linear infinite;
            }
            .spotlight-circle {
                stroke: rgba(255, 255, 255, 0.2);
                fill: rgba(255, 255, 255, 0.05);
                stroke-width: 1;
            }
            .faint-child { opacity: 0.2; }
            .highlight-child { animation: pulseHighlight 2s infinite; }
            .relation-heart {
                stroke: #ff4081;
                stroke-width: 2;
                fill: rgba(255, 64, 129, 0.2);
            }
            .pointing-beam {
                stroke: rgba(255, 255, 255, 0.3);
                stroke-width: 15;
                stroke-linecap: butt;
                filter: blur(5px);
            }
            
            @keyframes rotateCircle {
                from { transform: rotate(0deg); transform-origin: center; }
                to { transform: rotate(360deg); transform-origin: center; }
            }
            @keyframes pulseHighlight {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 1; }
            }

            /* Final Completion Styles */
            .final-completion-container {
                margin-top: 3rem;
                padding: 2.5rem;
                background: rgba(76, 175, 80, 0.1);
                border-radius: 24px;
                border: 2px solid rgba(76, 175, 80, 0.3);
            }
            .success-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            .success-msg {
                font-size: 1.3rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                line-height: 1.5;
            }
            .example-box {
                background: rgba(0,0,0,0.2);
                padding: 1.5rem;
                border-radius: 16px;
                margin-bottom: 2rem;
            }
            .example-label {
                display: block;
                font-size: 0.9rem;
                text-transform: uppercase;
                opacity: 0.6;
                margin-bottom: 0.5rem;
            }
            .example-text {
                font-size: 1.8rem;
                font-weight: 700;
                color: #fff;
            }

            /* Recommendation Box Styles */
            .recommendation-box {
                margin: 2.5rem 0;
                padding-top: 2rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                text-align: left;
            }
            .recommendation-box h4 {
                font-size: 1.1rem;
                margin-bottom: 1.5rem;
                opacity: 0.7;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .recommendation-grid {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .rec-btn {
                display: flex;
                align-items: center;
                gap: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 1.2rem;
                border-radius: 16px;
                color: white;
                cursor: pointer;
                transition: all 0.2s;
                width: 100%;
                text-align: left;
                font-size: 1.1rem;
            }
            .rec-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateX(5px);
                border-color: rgba(255, 255, 255, 0.3);
            }
            .rec-icon {
                font-size: 1.5rem;
            }
            .rec-label {
                font-weight: 600;
            }
            .teaser-text {
                font-size: 0.95rem;
                opacity: 0.8;
                font-style: italic;
                margin-bottom: 1.5rem;
                color: var(--accent-light, #ffeb3b);
                border-left: 3px solid var(--accent-light, #ffeb3b);
                padding-left: 1rem;
            }
            .spotlight-btn {
                background: linear-gradient(135deg, rgba(255, 235, 59, 0.1), rgba(255, 235, 59, 0.2)) !important;
                border: 1px solid rgba(255, 235, 255, 0.3) !important;
                animation: subtleGlow 3s infinite alternate;
            }
            @keyframes subtleGlow {
                from { box-shadow: 0 0 5px rgba(255, 235, 59, 0.1); }
                to { box-shadow: 0 0 15px rgba(255, 235, 59, 0.2); }
            }
            .outline-btn {
                background: transparent !important;
                border: 1px solid rgba(255,255,255,0.2) !important;
                opacity: 0.6;
            }
            .outline-btn:hover { opacity: 1; border-color: white !important; }
        `,document.head.appendChild(u)}p.appendChild(e)}const U=[{id:"hjaelpe",title:"Hjælpeverber",verbs:["kan","skal","vil","må","bør","lader"],exercises:[{title:"Modalverber - Sæt 1",instruction:"Vælg det rigtige hjælpeverbum.",segments:[{type:"text",content:"1. **[I can speak Danish]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"kan",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" tale dansk.\\n\\n2. **[I must go now]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"skal",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" gå nu.\\n\\n3. **[I want to buy a cake]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"vil",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" gerne købe en kage.\\n\\n4. **[May I sit here?]**\\nDansk: "},{type:"gap",id:3,correct:"Må",options:["Må","Skal","Kan","Vil","Bør"],explanation:"hintAction"},{type:"text",content:" jeg sidde her?\\n\\n5. **[You should read this]**\\nDansk: Du "},{type:"gap",id:4,correct:"bør",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" læse denne bog."}],phase2_tasks:[{correct:"kan",definition:"Når man har evnen eller muligheden for at gøre noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Kan' udtrykker evne."},{correct:"skal",definition:"Når man er nødt til at gøre noget, eller har en plan.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Skal' udtrykker nødvendighed."},{correct:"vil",definition:"Når man har et ønske eller en lyst til noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Vil' udtrykker ønske."},{correct:"må",definition:"Når man har tilladelse til noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Må' udtrykker tilladelse."},{correct:"bør",definition:"Når noget er en god idé eller moralsk rigtigt.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Bør' udtrykker anbefaling."}]}]},{id:"tilstand",title:"Tilstand og navne",verbs:["er","bliver","lever","bor","findes","sker","har","får","betyder","passer","koster","virker","ligner","gælder","hedder"],exercises:[{title:"Hvem er jeg? - Sæt 1",instruction:"Vælg det rigtige verbum om din tilstand.",segments:[{type:"text",content:"1. **[I am happy]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"er",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" glad.\\n\\n2. **[I have a dog]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"har",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" en hund.\\n\\n3. **[I live in Aarhus]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"bor",options:["er","har","bor","hedder","bliver"],explanation:"hintPlace"},{type:"text",content:" i Aarhus.\\n\\n4. **[My name is Peter]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"hedder",options:["er","har","bor","hedder","bliver"],explanation:"hintName"},{type:"text",content:" Peter.\\n\\n5. **[I am becoming a doctor]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"bliver",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" læge næste år."}],phase2_tasks:[{correct:"er",definition:"Bruges til at identificere sig selv eller sin tilstand.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"har",definition:"Når man ejer noget.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"bor",definition:"Når man har sit hjem et bestemt sted.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"hedder",definition:"Bruges når man fortæller sit navn.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"bliver",definition:"Når man ændrer sig til noget nyt.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"}]},{title:"Verden omkring os",instruction:"Vælg det rigtige verbum om tilstande i hverdagen.",segments:[{type:"text",content:"1. **[It costs 20 kroner]**\\nDansk: Det "},{type:"gap",id:0,correct:"koster",options:["koster","passer","virker","betyder","sker"],explanation:"hintContext"},{type:"text",content:" 20 kroner.\\n\\n2. **[What does it mean?]**\\nDansk: Hvad "},{type:"gap",id:1,correct:"betyder",options:["koster","passer","virker","betyder","sker"],explanation:"hintContext"},{type:"text",content:" det?\\n\\n3. **[The shoes fit well]**\\nDansk: Skoene "},{type:"gap",id:2,correct:"passer",options:["koster","passer","virker","betyder","sker"],explanation:"hintContext"},{type:"text",content:" godt.\\n\\n4. **[It works fine]**\\nDansk: Det "},{type:"gap",id:3,correct:"virker",options:["koster","passer","virker","betyder","sker"],explanation:"hintContext"},{type:"text",content:" fint.\\n\\n5. **[What is happening?]**\\nDansk: Hvad "},{type:"gap",id:4,correct:"sker",options:["koster","passer","virker","betyder","sker"],explanation:"hintContext"},{type:"text",content:" der?"}],phase2_tasks:[{correct:"koster",definition:"Prisen på en vare.",options:["koster","passer","virker","betyder","sker"],explanation:"Korrekt!"},{correct:"betyder",definition:"Hvad et ord eller en ting forklarer.",options:["koster","passer","virker","betyder","sker"],explanation:"Korrekt!"},{correct:"passer",definition:"Når tøj eller ting har den rigtige størrelse eller form.",options:["koster","passer","virker","betyder","sker"],explanation:"Korrekt!"},{correct:"virker",definition:"Når noget fungerer som det skal.",options:["koster","passer","virker","betyder","sker"],explanation:"Korrekt!"},{correct:"sker",definition:"Når noget finder sted eller hænder.",options:["koster","passer","virker","betyder","sker"],explanation:"Korrekt!"}]}]},{id:"bevaegelse",title:"Bevægelse",verbs:["går","kører","rejser","falder","stiger","kommer","når","vender","følger","fører","bringer"],exercises:[{title:"På farten - Sæt 1",instruction:"Vælg det rigtige verbum om bevægelse.",segments:[{type:"text",content:"1. **[I walk to school]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"går",options:["går","kører","rejser","falder","stiger"],explanation:"hintAction"},{type:"text",content:" til skole.\\n\\n2. **[I drive a car]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"kører",options:["går","kører","rejser","falder","stiger"],explanation:"hintAction"},{type:"text",content:" i bil.\\n\\n3. **[I travel to Spain]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"rejser",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" til Spanien i sommerferien.\\n\\n4. **[The apple falls from the tree]**\\nDansk: Æblet "},{type:"gap",id:3,correct:"falder",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" ned fra træet.\\n\\n5. **[The price increases]**\\nDansk: Prisen "},{type:"gap",id:4,correct:"stiger",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" hver måned."}],phase2_tasks:[{correct:"går",definition:"At flytte sig ved brug af benene.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"kører",definition:"At transportere sig i et køretøj som bil eller bus.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"rejser",definition:"At tage på en længere tur til et andet sted eller land.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"falder",definition:"At bevæge sig hurtigt mod jorden ved et uheld eller tyngdekraft.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"stiger",definition:"At bevæge sig opad eller blive højere (f.eks. priser).",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"}]},{title:"Ankomst og retning",instruction:"Vælg det rigtige verbum om destinationer.",segments:[{type:"text",content:"1. **[He comes tomorrow]**\\nDansk: Han "},{type:"gap",id:0,correct:"kommer",options:["kommer","når","vender","følger","bringer"],explanation:"hintContext"},{type:"text",content:" i morgen.\\n\\n2. **[I reach the station]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"når",options:["kommer","når","vender","følger","bringer"],explanation:"hintContext"},{type:"text",content:" stationen klokken 8.\\n\\n3. **[She turns around]**\\nDansk: Hun "},{type:"gap",id:2,correct:"vender",options:["kommer","når","vender","følger","bringer"],explanation:"hintContext"},{type:"text",content:" sig om.\\n\\n4. **[Follow the path]**\\nDansk: "},{type:"gap",id:3,correct:"Følg",options:["Følg","Bring","Vend","Kom","Nå"],explanation:"hintContext"},{type:"text",content:" stien.\\n\\n5. **[Bring the coffee]**\\nDansk: "},{type:"gap",id:4,correct:"Bring",options:["Følg","Bring","Vend","Kom","Nå"],explanation:"hintContext"},{type:"text",content:" kaffen."}],phase2_tasks:[{correct:"kommer",definition:"At ankomme til et sted.",options:["kommer","når","vender","følger","bringer"],explanation:"Korrekt!"},{correct:"når",definition:"At nå frem til et mål i tide.",options:["kommer","når","vender","følger","bringer"],explanation:"Korrekt!"},{correct:"vender",definition:"At skifte retning eller dreje om.",options:["kommer","når","vender","følger","bringer"],explanation:"Korrekt!"},{correct:"følger",definition:"At gå bagefter nogen eller rette sig efter noget.",options:["følger","kommer","når","vender","bringer"],explanation:"Korrekt!"},{correct:"bringer",definition:"At tage noget med til et sted eller en person.",options:["bringer","følger","kommer","når","vender"],explanation:"Korrekt!"}]}]},{id:"interaktion",title:"Sprog og kommunikation",verbs:["siger","taler","svarer","spørger","kalder","beder","fortæller","skriver","læser","viser","sender","hjælper","møder","kræver","sikrer"],exercises:[{title:"Samtale - Sæt 1",instruction:"Vælg det rigtige verbum om kommunikation.",segments:[{type:"text",content:"1. **[What do you say?]**\\nDansk: Hvad "},{type:"gap",id:0,correct:"siger",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" du?\\n\\n2. **[I speak Danish]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"taler",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" dansk.\\n\\n3. **[I answer the letter]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"svarer",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" på brevet.\\n\\n4. **[I ask a question]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"spørger",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" om vej.\\n\\n5. **[I tell a story]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"fortæller",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" en god historie."}],phase2_tasks:[{correct:"siger",definition:"At bruge ord til at udtrykke noget.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"taler",definition:"At bruge stemmen og et bestemt sprog.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"svarer",definition:"At give respons på et spørgsmål eller brev.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"spørger",definition:"Når man vil have information fra en anden person.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"fortæller",definition:"At give en længere forklaring eller beretning om noget.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"}]},{title:"At læse og skrive",instruction:"Vælg det rigtige verbum om skriftlig kontakt.",segments:[{type:"text",content:"1. **[I write an email]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"skriver",options:["skriver","læser","sender","viser","møder"],explanation:"hintAction"},{type:"text",content:" en e-mail.\\n\\n2. **[I read a book]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"læser",options:["skriver","læser","sender","viser","møder"],explanation:"hintAction"},{type:"text",content:" en god bog.\\n\\n3. **[I send a package]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"sender",options:["skriver","læser","sender","viser","møder"],explanation:"hintAction"},{type:"text",content:" en pakke til min mor.\\n\\n4. **[Show me the way]**\\nDansk: "},{type:"gap",id:3,correct:"Vis",options:["Vis","Send","Skriv","Læs","Mød"],explanation:"hintAction"},{type:"text",content:" mig vej.\\n\\n5. **[I meet a friend]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"møder",options:["skriver","læser","sender","viser","møder"],explanation:"hintAction"},{type:"text",content:" en ven i eftermiddag."}],phase2_tasks:[{correct:"skriver",definition:"At danne tegn eller ord på papir eller skærm.",options:["skriver","læser","sender","viser","møder"],explanation:"Korrekt!"},{correct:"læser",definition:"At forstå ord i en tekst.",options:["skriver","læser","sender","viser","møder"],explanation:"Korrekt!"},{correct:"sender",definition:"At få noget transporteret til en anden (post eller digitalt).",options:["skriver","læser","sender","viser","møder"],explanation:"Korrekt!"},{correct:"viser",definition:"At lade nogen se noget.",options:["skriver","læser","sender","viser","møder"],explanation:"Korrekt!"},{correct:"møder",definition:"At træffe en person på et bestemt sted.",options:["skriver","læser","sender","viser","møder"],explanation:"Korrekt!"}]}]},{id:"indre_liv",title:"Tanker og følelser",verbs:["ser","hører","mærker","lyder","ved","tror","mener","tænker","synes","forstår","kender","lærer","tæller","vælger","føler","ønsker","oplever","søger"],exercises:[{title:"Indre liv - Sæt 1",instruction:"Vælg det rigtige verbum om dine tanker.",segments:[{type:"text",content:"1. **[I know it]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"ved",options:["ved","tror","mener","tænker","synes"],explanation:"hintAction"},{type:"text",content:" det godt.\\n\\n2. **[I believe in it]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"tror",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" på dig.\\n\\n3. **[What is your opinion?]**\\nDansk: Hvad "},{type:"gap",id:2,correct:"mener",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" du om det?\\n\\n4. **[I am thinking about you]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tænker",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" på dig.\\n\\n5. **[I think (opinion) it's fun]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"synes",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" det er sjovt."}],phase2_tasks:[{correct:"ved",definition:"Når man har faktuel information om noget.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"tror",definition:"Når man antager noget eller har en religiøs overbevisning.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"mener",definition:"Når man har en holdning eller vil udtrykke en betydning.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"tænker",definition:"Den generelle proces der foregår i hovedet.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"synes",definition:"Når man har en personlig, følelsesmæssig holdning eller smag.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"}]},{title:"Sanser og læring",instruction:"Vælg det rigtige verbum om at mærke og lære.",segments:[{type:"text",content:"1. **[I see you]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"ser",options:["ser","hører","lærer","forstår","mærker"],explanation:"hintAction"},{type:"text",content:" dig.\\n\\n2. **[I hear the music]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"hører",options:["ser","hører","lærer","forstår","mærker"],explanation:"hintAction"},{type:"text",content:" musikken.\\n\\n3. **[I am learning Danish]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"lærer",options:["ser","hører","lærer","forstår","mærker"],explanation:"hintAction"},{type:"text",content:" dansk lige nu.\\n\\n4. **[I understand everything]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"forstår",options:["ser","hører","lærer","forstår","mærker"],explanation:"hintAction"},{type:"text",content:" det hele.\\n\\n5. **[I feel the heat]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"mærker",options:["ser","hører","lærer","forstår","mærker"],explanation:"hintAction"},{type:"text",content:" varmen."}],phase2_tasks:[{correct:"ser",definition:"At bruge øjnene til at observere.",options:["ser","hører","lærer","forstår","mærker"],explanation:"Korrekt!"},{correct:"hører",definition:"At bruge ørerne til at lytte.",options:["ser","hører","lærer","forstår","mærker"],explanation:"Korrekt!"},{correct:"lærer",definition:"At få ny viden eller færdigheder.",options:["ser","hører","lærer","forstår","mærker"],explanation:"Korrekt!"},{correct:"forstår",definition:"At begribe meningen med noget.",options:["ser","hører","lærer","forstår","mærker"],explanation:"Korrekt!"},{correct:"mærker",definition:"At have en fysisk eller følelsesmæssig fornemmelse.",options:["ser","hører","lærer","forstår","mærker"],explanation:"Korrekt!"}]}]},{id:"handling",title:"Handling og præstation",verbs:["gør","tager","bruger","laver","arbejder","klarer","handler","ændrer","lægger","ligger","sætter","sidder","stiller","står","holder","giver","finder","trækker","samler","slår","bryder","bygger","lukker","skaber","begynder","starter","fortsætter","prøver","forsøger","venter","betaler","køber","sælger","vinder","spiller"],exercises:[{title:"I gang - Sæt 1",instruction:"Vælg det rigtige verbum om handlinger.",segments:[{type:"text",content:"1. **[I am doing my homework]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"laver",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" lektier.\\n\\n2. **[I do my best]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"gør",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" mit bedste.\\n\\n3. **[I use a computer]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"bruger",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" en computer.\\n\\n4. **[I take the bus]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tager",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" bussen.\\n\\n5. **[I find my keys]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"finder",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" mine nøgler."}],phase2_tasks:[{correct:"laver",definition:"At producere eller udføre noget (især lektier eller mad).",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"gør",definition:"At udføre en handling (især abstrakte ting som 'sit bedste').",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"bruger",definition:"At anvende et redskab eller en ressource.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"tager",definition:"At fatte om noget eller vælge en transportmulighed.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"finder",definition:"At opdage noget man leder efter.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"}]},{title:"Job og indkøb",instruction:"Vælg det rigtige verbum om dagens arbejde og shopping.",segments:[{type:"text",content:"1. **[I am working at the office]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"arbejder",options:["arbejder","betaler","køber","sælger","venter"],explanation:"hintAction"},{type:"text",content:" på kontoret.\\n\\n2. **[I buy milk]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"køber",options:["arbejder","betaler","køber","sælger","venter"],explanation:"hintAction"},{type:"text",content:" mælk.\\n\\n3. **[I am paying for the bread]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"betaler",options:["arbejder","betaler","køber","sælger","venter"],explanation:"hintAction"},{type:"text",content:" for brødet.\\n\\n4. **[I am waiting for the bus]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"venter",options:["arbejder","betaler","køber","sælger","venter"],explanation:"hintAction"},{type:"text",content:" på bussen.\\n\\n5. **[I am playing football]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"spiller",options:["arbejder","spiller","køber","sælger","venter"],explanation:"hintAction"},{type:"text",content:" fodbold."}],phase2_tasks:[{correct:"arbejder",definition:"At udføre sit erhverv eller job.",options:["arbejder","betaler","køber","sælger","venter"],explanation:"Korrekt!"},{correct:"køber",definition:"At anskaffe sig noget mod betaling.",options:["arbejder","betaler","køber","sælger","venter"],explanation:"Korrekt!"},{correct:"betaler",definition:"At give penge for en vare eller tjeneste.",options:["arbejder","betaler","køber","sælger","venter"],explanation:"Korrekt!"},{correct:"venter",definition:"At bruge tid på at noget skal ske (f.eks. bussen).",options:["arbejder","betaler","køber","sælger","venter"],explanation:"Korrekt!"},{correct:"spiller",definition:"At deltage i en sport eller et spil (f.eks. fodbold).",options:["arbejder","spiller","køber","sælger","venter"],explanation:"Korrekt!"}]}]},{id:"datid_regelm",title:"Datid (regelmæssige)",verbs:["boede","spillede","snakkede","arbejdede","lyttede","vaskede","ventede","hentede","lavede","købte"],exercises:[{title:"Min historie - Sæt 1",instruction:"Vælg det rigtige verbum i regelmæssig datid (-ede eller -te).",segments:[{type:"text",content:"1. **[I lived in Odense]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"boede",options:["boede","bor","bliver","arbejdede","spillede"],explanation:"hintContext"},{type:"text",content:" i Odense sidste år.\\n\\n2. **[We played football]**\\nDansk: Vi "},{type:"gap",id:1,correct:"spillede",options:["boede","spillede","spiller","arbejdede","lavede"],explanation:"hintContext"},{type:"text",content:" fodbold i tirsdags.\\n\\n3. **[I worked a lot]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"arbejdede",options:["boede","spillede","arbejdede","arbejder","lavede"],explanation:"hintContext"},{type:"text",content:" meget i går.\\n\\n4. **[I made dinner]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"lavede",options:["lavede","laver","boede","spillede","arbejdede"],explanation:"hintContext"},{type:"text",content:" mad til hele familien.\\n\\n5. **[I waited for the bus]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"ventede",options:["ventede","venter","boede","spillede","arbejdede"],explanation:"hintContext"},{type:"text",content:" på bussen i 20 minutter."}],phase2_tasks:[{correct:"boede",definition:"At have haft sit hjem et sted i fortiden (regelmæssig).",options:["boede","arbejdede","spillede","lavede","ventede"],explanation:"Korrekt!"},{correct:"spillede",definition:"At have deltaget i leg eller sport i fortiden.",options:["boede","arbejdede","spillede","lavede","ventede"],explanation:"Korrekt!"},{correct:"arbejdede",definition:"At have udført sit job i fortiden.",options:["boede","arbejdede","spillede","lavede","ventede"],explanation:"Korrekt!"},{correct:"lavede",definition:"At have fremstillet noget i fortiden (f.eks. mad).",options:["boede","arbejdede","spillede","lavede","ventede"],explanation:"Korrekt!"},{correct:"ventede",definition:"At have brugt tid på at noget skulle ske i fortiden.",options:["boede","arbejdede","spillede","lavede","ventede"],explanation:"Korrekt!"}]}]},{id:"datid",title:"Datid (uregelmæssige)",verbs:["så","gik","kom","tog","spiste","drak","fik","var","havde","skrev","læste","sang","sov","løb","sad","stod"],exercises:[{title:"I går - Sæt 1",instruction:"Vælg det rigtige uregelmæssige verbum i datid.",segments:[{type:"text",content:"1. **[Yesterday I saw a movie]**\\nDansk: I går "},{type:"gap",id:0,correct:"så",options:["så","ser","seet","tog","gik"],explanation:"hintContext"},{type:"text",content:" jeg en god film.\\n\\n2. **[We walked to the party]**\\nDansk: Vi "},{type:"gap",id:1,correct:"gik",options:["så","gik","går","gået","kom"],explanation:"hintContext"},{type:"text",content:" til fest i lørdags.\\n\\n3. **[He came late this morning]**\\nDansk: Han "},{type:"gap",id:2,correct:"kom",options:["kom","kommer","kommet","så","tog"],explanation:"hintContext"},{type:"text",content:" for sent i morges.\\n\\n4. **[I took a cake with me]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tog",options:["tog","tager","taget","så","gik"],explanation:"hintContext"},{type:"text",content:" en kage med i går.\\n\\n5. **[We ate dinner at 18]**\\nDansk: Vi "},{type:"gap",id:4,correct:"spiste",options:["spiser","spist","spiste","kom","tog"],explanation:"hintContext"},{type:"text",content:" aftensmad klokken 18 i går."}],phase2_tasks:[{correct:"så",definition:"At have set noget i fortiden (datid af 'se').",options:["så","ser","seet","tog","gik"],explanation:"Korrekt!"},{correct:"gik",definition:"At have gået et sted hen i fortiden (datid af 'gå').",options:["så","gik","går","gået","kom"],explanation:"Korrekt!"},{correct:"kom",definition:"At være ankommet i fortiden (datid af 'komme').",options:["kom","kommer","kommet","så","tog"],explanation:"Korrekt!"},{correct:"tog",definition:"At have taget noget i fortiden (datid af 'tage').",options:["tog","tager","taget","så","gik"],explanation:"Korrekt!"},{correct:"spiste",definition:"At have indtaget mad i fortiden (datid af 'spise').",options:["spiser","spist","spiste","kom","tog"],explanation:"Korrekt!"}]}]},{id:"tider",title:"Datid vs. Førnutid",verbs:["var","har været","kom","er kommet","drak","har drukket","har boet","boede","har læst","læste"],exercises:[{title:"Punktet eller Broen? - Sæt 1",instruction:"Husk: Punktet (datid) er et bestemt tidspunkt. Broen (førnutid) forbinder fortid og nu.",segments:[{type:"text",content:"1. **[I was in the cinema yesterday]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"var",options:["var","har været"],explanation:"hintContext"},{type:"text",content:" i biografen i går.\\n\\n2. **[I have been in the cinema many times]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"har været",options:["var","har været"],explanation:"hintContext"},{type:"text",content:" i biografen mange gange.\\n\\n3. **[In 2010 he came to Denmark]**\\nDansk: I 2010 "},{type:"gap",id:2,correct:"kom",options:["kom","er kommet"],explanation:"hintContext"},{type:"text",content:" han til Danmark.\\n\\n4. **[He has just come to Denmark]**\\nDansk: Han "},{type:"gap",id:3,correct:"er kommet",options:["kom","er kommet"],explanation:"hintContext"},{type:"text",content:" lige til Danmark.\\n\\n5. **[We drank coffee an hour ago]**\\nDansk: Vi "},{type:"gap",id:4,correct:"drak",options:["drak","har drukket"],explanation:"hintContext"},{type:"text",content:" kaffe for en time siden."}],phase2_tasks:[{correct:"var",definition:"Bruges om en tilstand på et bestemt tidspunkt i fortiden.",options:["var","har været"],explanation:"Korrekt!"},{correct:"har været",definition:"Bruges når vi ser på erfaringen frem til nu.",options:["var","har været"],explanation:"Korrekt!"},{correct:"kom",definition:"Bruges om ankomst på et bestemt årstal eller tidspunkt.",options:["kom","er kommet"],explanation:"Korrekt!"},{correct:"er kommet",definition:"Bruges når handlingen lige er sket og er vigtig nu.",options:["kom","er kommet"],explanation:"Korrekt!"},{correct:"drak",definition:"Bruges om kaffedrikning på et bestemt tidspunkt i fortiden.",options:["drak","har drukket"],explanation:"Korrekt!"}]}]}];class Ne{constructor(i,e=null,r="main"){this.navigateFn=i,this.backView=r,this.currentCategoryIndex=e?U.findIndex(t=>t.id===e):0,this.currentCategoryIndex===-1&&(this.currentCategoryIndex=0),this.currentExerciseIndex=0,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={}}render(){const i=document.createElement("div");i.className="verbum-learning-view view-container";const e=U[this.currentCategoryIndex];if(!e)return i;const r=e.exercises[this.currentExerciseIndex];if(!r)return i;const t=localStorage.getItem("appLang")||"da",d=o=>R[t]?.[o]||R.da?.[o]||o;return i.innerHTML=`
      <div class="top-bar">
        <button class="back-btn" id="back-to-main">← ${n("back")}</button>
      </div>
      <h1>${e.title}</h1>
      
      <div class="exercise-card">
        <img src="${F}verber_kategorier.png" class="category-illustration" alt="Category Illustration">
        
        <div class="exercise-header">
          <h2 style="text-align: center;">${r.title}</h2>
          <p class="subtitle" style="text-align: center;">${this.currentPhase===1?r.instruction:d("phase2_instruction")||"Gæt verbet ud fra definitionen."}</p>
        </div>

        <div class="grammatik-text-container" id="exercise-content">
          ${this.currentPhase===1?this.renderPhase1(r):this.renderPhase2(r)}
        </div>

        <div class="exercise-feedback" id="exercise-feedback"></div>

        <div class="grammatik-summary" id="grammatik-summary">
          ${this.getSummaryText(r)}
        </div>

        <div class="game-controls">
          <button class="gemini-btn" id="check-answers">${n("checkAnswers")}</button>
          ${this.renderFooterButtons(e)}
        </div>
      </div>
`,this.attachEventListeners(i),this.ensureStyles(),i}getSummaryText(i){const r=(this.currentPhase===1?i.segments.filter(d=>d.type==="gap"):i.phase2_tasks).length,t=Object.values(this.feedback).filter(d=>d==="correct").length;return t===0?"":t===r?`<span class="success">${n("allCorrect")}</span>`:`${t} / ${r} ${n("filled")||"korrekte"}`}renderPhase1(i){return i.segments.map(e=>{if(e.type==="text"){const r=e.content.match(/\*\*\[(.*?)\]\*\*/);let t=e.content,d="";return r&&(d=`<div class="sent-clue">${r[1]}</div>`,t=t.replace(r[0],"").trim()),t=t.replace(/^Dansk:\s*/i,"").replace(/\\n/g,"<br>"),`
                    <div class="sentence-row">
                        ${d}
                        <span class="text-part">${t}</span>
                    </div>
                `}else if(e.type==="gap"){const r=this.feedback[e.id]==="correct",t=this.feedback[e.id]==="wrong";return`
                    <span class="select-wrapper">
                        <select class="grammatik-select ${r?"correct":""} ${t?"wrong":""}" data-id="${e.id}" ${r?"disabled":""}>
                            <option value="">...</option>
                            ${e.options.map(d=>`<option value="${d}" ${this.answers[e.id]===d?"selected":""}>${d}</option>`).join("")}
                        </select>
                    </span>
                `}}).join("")}renderPhase2(i){return i.phase2_tasks.map((e,r)=>{const t=`phase2-${r}`,d=this.feedback[t]==="correct",o=this.feedback[t]==="wrong";return`
                <div class="phase2-item">
                    <p class="definition"><strong>${r+1}.</strong> ${e.definition}</p>
                    <span class="select-wrapper">
                        <select class="grammatik-select ${d?"correct":""} ${o?"wrong":""}" data-task-id="${t}" ${d?"disabled":""}>
                            <option value="">...</option>
                            ${e.options.map(l=>`<option value="${l}" ${this.answers[t]===l?"selected":""}>${l}</option>`).join("")}
                        </select>
                    </span>
                </div>
            `}).join("")}renderFooterButtons(i){const e=i.exercises[this.currentExerciseIndex],r=this.currentPhase===1?e.segments.filter(l=>l.type==="gap").length:e.phase2_tasks.length;if(!(Object.values(this.feedback).filter(l=>l==="correct").length===r))return"";const o=this.currentExerciseIndex===i.exercises.length-1;return this.currentPhase===1?'<button class="gemini-btn" id="next-phase">Næste fase →</button>':o?'<button class="gemini-btn" id="next-category">Næste kategori →</button>':'<button class="gemini-btn" id="next-exercise">Næste opgave →</button>'}attachEventListeners(i){i.querySelector("#back-to-main").onclick=()=>{this.navigateFn(this.backView)},i.querySelectorAll(".grammatik-select").forEach(o=>{o.onchange=l=>{const c=l.target.dataset.id||l.target.dataset.taskId;this.answers[c]=l.target.value,delete this.feedback[c],this.showHints[c]=!1,this.updateView()}});const e=i.querySelector("#check-answers");if(e){e.onclick=()=>{const a=U[this.currentCategoryIndex].exercises[this.currentExerciseIndex];let s=!0,g="";this.currentPhase===1?a.segments.forEach(h=>{h.type==="gap"&&(this.answers[h.id]===h.correct?this.feedback[h.id]="correct":(this.feedback[h.id]="wrong",g||(g=n(h.explanation||"hintAction")),s=!1))}):a.phase2_tasks.forEach((h,v)=>{const x=`phase2-${v}`;this.answers[x]===h.correct?this.feedback[x]="correct":(this.feedback[x]="wrong",g||(g=h.explanation||n("hintAction")),s=!1)});const m=i.querySelector("#exercise-feedback");s?m.style.display="none":(m.textContent=g,m.style.display="block"),this.updateView()};const o=U[this.currentCategoryIndex].exercises[this.currentExerciseIndex],l=this.currentPhase===1?o.segments.filter(a=>a.type==="gap").length:o.phase2_tasks.length;Object.values(this.feedback).filter(a=>a==="correct").length===l&&(e.style.display="none")}const r=i.querySelector("#next-phase");r&&(r.onclick=()=>{this.currentPhase=2,this.answers={},this.feedback={},this.showHints={},this.updateView()});const t=i.querySelector("#next-exercise");t&&(t.onclick=()=>{this.currentExerciseIndex++,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={},this.updateView()});const d=i.querySelector("#next-category");d&&(d.onclick=()=>{this.currentCategoryIndex++,this.currentExerciseIndex=0,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={},this.updateView()})}updateView(){const i=document.querySelector(".verbum-learning-view");if(i){const e=this.render();i.replaceWith(e)}}ensureStyles(){if(document.getElementById("verbum-learning-styles"))return;const i=document.createElement("style");i.id="verbum-learning-styles",i.textContent=`
            .verbum-learning-view .category-illustration {
                width: 100%;
                max-width: 400px;
                height: auto;
                border-radius: 20px;
                margin: 0 auto 1.5rem;
                display: block;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            @media (max-width: 600px) {
                .verbum-learning-view .category-illustration { max-width: 280px; margin-bottom: 1rem; }
                .verbum-learning-view h1 { font-size: 1.6rem !important; }
                .verbum-learning-view h2 { font-size: 1.3rem !important; }
            }
            .exercise-card {
                background: rgba(255, 255, 255, 0.03);
                border-radius: 24px;
                padding: 2rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            @media (max-width: 600px) {
                .exercise-card { padding: 1.2rem; border-radius: 16px; }
            }
            .sentence-row {
                display: block;
                padding: 1.5rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            .sentence-row:last-child {
                border-bottom: none;
            }
            .sent-clue {
                display: block;
                font-size: 0.95rem;
                color: var(--text-muted);
                opacity: 0.8;
                font-style: italic;
                margin-bottom: 0.4rem;
                font-weight: 400;
            }
            .phase2-item {
                background: rgba(255,255,255,0.03);
                padding: 1.2rem;
                border-radius: 16px;
                margin-bottom: 1.5rem !important;
                text-align: left;
            }
            @media (max-width: 600px) {
                .phase2-item { padding: 1rem; margin-bottom: 1rem !important; }
                .phase2-item .definition { font-size: 1rem; }
            }
        `,document.head.appendChild(i)}}function Be(p,i){const e=document.createElement("div");e.className="view-container bestemthed-view";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("grounding"),r.appendChild(t),e.appendChild(r);const d=document.createElement("h1");d.textContent="Bestemthed - En eller Et?";const o=document.createElement("p");o.className="subtitle",o.textContent="Lær at vælge det rigtige kendeord (artikel) til navneord.",e.appendChild(d),e.appendChild(o);const l=document.createElement("div");l.className="exercise-container",e.appendChild(l);const c=[{word:"bil",correct:"en",icon:"🚗"},{word:"hus",correct:"et",icon:"🏠"},{word:"barn",correct:"et",icon:"👶"},{word:"kop",correct:"en",icon:"☕"},{word:"æble",correct:"et",icon:"🍎"},{word:"stol",correct:"en",icon:"🪑"}];let a=0,s=0;function g(){if(l.innerHTML="",a>=c.length){m();return}const h=c[a],v=document.createElement("div");v.className="step-content animate-in",v.innerHTML=`
            <div class="visual-cue">
                <div class="stickman-container">
                    <svg viewBox="0 0 100 100" class="mini-stickman">
                        <circle cx="50" cy="30" r="8" stroke="white" stroke-width="2" fill="none"/>
                        <line x1="50" y1="38" x2="50" y2="70" stroke="white" stroke-width="2"/>
                        <line x1="50" y1="45" x2="70" y2="35" stroke="white" stroke-width="2"/>
                        <line x1="50" y1="45" x2="30" y2="55" stroke="white" stroke-width="2"/>
                        <line x1="50" y1="70" x2="40" y2="90" stroke="white" stroke-width="2"/>
                        <line x1="50" y1="70" x2="60" y2="90" stroke="white" stroke-width="2"/>
                    </svg>
                    <div class="object-bubble">${h.icon}</div>
                </div>
            </div>
            <h3>Hvad hedder det?</h3>
            <div class="word-display">____ ${h.word}</div>
            <div class="options-grid">
                <button class="option-btn" data-val="en">En</button>
                <button class="option-btn" data-val="et">Et</button>
            </div>
            <div class="feedback-area" id="feedback"></div>
        `,l.appendChild(v),v.querySelectorAll(".option-btn").forEach(x=>{x.onclick=()=>{const T=x.dataset.val,u=v.querySelector("#feedback");T===h.correct?(u.textContent="Korrekt! ✅",u.className="feedback-area success",s++,x.classList.add("correct"),setTimeout(()=>{a++,g()},1e3)):(u.textContent="Prøv igen! ❌",u.className="feedback-area error",x.classList.add("wrong"))}})}function m(){l.innerHTML=`
            <div class="step-content final-step animate-in">
                <div class="success-icon">🎉</div>
                <h2>Flot gået!</h2>
                <p>Du fik ${s} ud af ${c.length} rigtige.</p>
                <button class="gemini-btn" id="finish-btn">Tilbage til Grounding</button>
            </div>
        `,l.querySelector("#finish-btn").onclick=()=>i("grounding")}if(g(),!document.getElementById("bestemthed-styles")){const h=document.createElement("style");h.id="bestemthed-styles",h.textContent=`
            .bestemthed-view .visual-cue {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 2rem;
            }
            .stickman-container {
                position: relative;
                width: 150px;
                height: 150px;
            }
            @media (max-width: 600px) {
                .stickman-container { width: 120px; height: 120px; }
            }
            .mini-stickman {
                width: 100%;
                height: 100%;
            }
            .object-bubble {
                position: absolute;
                top: 5px;
                right: -10px;
                background: white;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                animation: float 3s ease-in-out infinite;
            }
            @media (max-width: 600px) {
                .object-bubble { width: 50px; height: 50px; font-size: 2rem; right: -5px; }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .word-display {
                font-size: 2.5rem;
                font-weight: 700;
                margin: 2rem 0;
                color: #fff;
            }
            @media (max-width: 600px) {
                .word-display { font-size: 1.8rem; margin: 1.5rem 0; }
            }
            .options-grid {
                display: flex;
                gap: 1.5rem;
                justify-content: center;
                margin-bottom: 2rem;
            }
            @media (max-width: 600px) {
                .options-grid { gap: 1rem; margin-bottom: 1.5rem; }
            }
            .option-btn {
                background: rgba(255,255,255,0.1);
                border: 2px solid rgba(255,255,255,0.2);
                color: white;
                padding: 1.5rem 3rem;
                font-size: 1.5rem;
                font-weight: 700;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.2s;
                min-width: 120px;
            }
            @media (max-width: 600px) {
                .option-btn { padding: 1rem 2rem; font-size: 1.2rem; border-radius: 16px; min-width: 100px; }
            }
            .option-btn:hover { background: rgba(255,255,255,0.2); }
            .option-btn.correct { background: #4CAF50; border-color: #4CAF50; }
            .option-btn.wrong { background: #F44336; border-color: #F44336; }
            
            .feedback-area {
                height: 30px;
                font-size: 1.2rem;
                font-weight: 600;
                margin-top: 1rem;
            }
            @media (max-width: 600px) {
                .feedback-area { font-size: 1rem; height: 25px; }
            }
            .feedback-area.success { color: #4CAF50; }
            .feedback-area.error { color: #F44336; }
        `,document.head.appendChild(h)}p.appendChild(e)}function He(p,i,e={}){const r=document.createElement("div");r.className="view-container modal-force-view";const t={nounAnchor:e.nounAnchor||"Et",verbAnchor:(e.verbAnchor||"spiser").replace(" (nu)","").replace(" (i går)","").replace(" (senere)",""),selectedModal:e.selectedModal||""},d=document.createElement("div");d.className="top-bar";const o=document.createElement("button");o.className="back-btn",o.textContent="← "+n("back"),o.onclick=()=>i("grounding"),d.appendChild(o),r.appendChild(d);const l=document.createElement("h1");l.textContent="Modalverber: den usynlige kraft";const c=document.createElement("p");c.className="subtitle",c.textContent='Modalverber ændrer ikke handlingen, men de ændrer "kraften" bag den.',r.appendChild(l),r.appendChild(c);const a=document.createElement("div");a.className="exercise-container",r.appendChild(a);function s(){a.innerHTML=`
            <div id="force-section" class="step-content animate-in">
                <div class="force-visualization" id="force-viz">
                    <div class="viz-placeholder">Vælg et modalverbum for at se kraften</div>
                </div>

                <div class="modal-interaction">
                    <span class="sentence-part no-wrap">${t.nounAnchor} barn</span>
                    <select class="grammatik-select modal-select" id="modal-select">
                        <option value="">???</option>
                        <option value="skal" ${t.selectedModal==="skal"?"selected":""}>skal</option>
                        <option value="må" ${t.selectedModal==="må"?"selected":""}>må</option>
                        <option value="vil" ${t.selectedModal==="vil"?"selected":""}>vil</option>
                        <option value="kan" ${t.selectedModal==="kan"?"selected":""}>kan</option>
                    </select>
                    <span class="sentence-part">spise</span>
                </div>

                <div class="force-explanation" id="force-expl"></div>
                
                <div class="navigation-controls" style="margin-top: 2rem; ${t.selectedModal?"":"display: none;"}" id="nav-controls">
                    <button class="gemini-btn spotlight-btn" id="next-step-btn">Hvorfor bøjer vi kun det første ord? ↓</button>
                </div>
            </div>

            <div id="finiteness-section" class="step-content animate-in" style="display: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 3rem; margin-top: 3rem;">
                <h2 style="margin-top: 0;">${n("finitenessTitle")}</h2>
                <p class="subtitle" style="margin-bottom: 2rem;">${n("finitenessDesc")}</p>

                <div class="finiteness-visual timeline-layout">
                    <div class="finiteness-box timeline-box" id="timeline-box">
                        <div class="label">${n("timelineLabel")}</div>
                        <div class="svg-container" id="timeline-svg"></div>
                        <div class="word-anchor">
                            <div class="word-display" id="modal-word-marker">${t.selectedModal||"skal"}</div>
                        </div>
                        <div class="time-toggle">
                            <button class="toggle-btn" data-time="da">${n("pastLabel")}</button>
                            <button class="toggle-btn active" data-time="nu">${n("nowLabel")}</button>
                        </div>
                    </div>

                    <div class="finiteness-box action-box" id="action-box">
                        <div class="label">${n("actionLabel")}</div>
                        <div class="svg-container" id="photo-svg"></div>
                        <div class="word-display static-word" id="action-word-static">spise</div>
                    </div>
                </div>

                <div class="force-explanation visible" id="finiteness-expl">
                    ${n("finitenessExpl")}
                </div>

                <div id="teaser-section" class="recommendation-box animate-in" style="margin-top: 4rem; display: none; text-align: center;">
                    <h4 style="font-size: 1.5rem; margin-bottom: 1.5rem;">${n("adjectiveTitle")}</h4>
                    <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">
                        ${n("adjectiveTeaser")}
                    </p>
                    <button class="gemini-btn spotlight-btn" id="go-to-adj-btn">
                        ${n("nextStepAdjective")}
                    </button>
                </div>

                <div class="recommendation-box" style="margin-top: 4rem;">
                    <h4 style="font-size: 1.5rem; margin-bottom: 1.5rem;">Vil du øve mere?</h4>
                    <div class="recommendation-grid">
                        <button class="rec-btn spotlight-btn" id="rec-hjaelpe" style="min-width: 280px;">
                            <span class="rec-icon">⚡</span>
                            <span class="rec-label">Modalverber: kan, vil, skal og må</span>
                        </button>
                    </div>
                </div>

                <div class="navigation-controls" style="margin-top: 3rem;">
                    <button class="gemini-btn outline-btn" id="finish-btn">Afslut og gå tilbage</button>
                </div>
            </div>
        `;const h=a.querySelector("#modal-select"),v=a.querySelector("#force-viz"),x=a.querySelector("#force-expl"),T=a.querySelector("#nav-controls"),u=a.querySelector("#next-step-btn"),b=a.querySelector("#teaser-section"),E=a.querySelector("#go-to-adj-btn"),D=a.querySelector("#finish-btn"),k=a.querySelector("#rec-hjaelpe");t.selectedModal&&(h.value=t.selectedModal,m(t.selectedModal,v,x)),h.onchange=()=>{const w=h.value;if(t.selectedModal=w,m(w,v,x),w){T.style.display="block";const C=a.querySelector("#modal-word-marker");C&&(C.textContent=w)}},u.onclick=()=>{const w=a.querySelector("#finiteness-section");w.style.display="block",g(),u.style.display="none",setTimeout(()=>{w.scrollIntoView({behavior:"smooth",block:"start"})},50),setTimeout(()=>{b.style.display="block"},1500)},E.onclick=()=>i("adjective_bridge",{nounAnchor:t.nounAnchor,selectedModal:t.selectedModal}),D.onclick=()=>i("dagens_opgave"),k.onclick=()=>i("verbum_learning",{categoryId:"hjaelpe"})}function g(){const h=a.querySelector("#timeline-svg"),v=a.querySelector("#photo-svg"),x=a.querySelector("#modal-word-marker"),T=a.querySelectorAll(".toggle-btn"),u=a.querySelector("#action-word-static");h.innerHTML=`
            <svg viewBox="0 0 400 100" class="timeline-svg-main">
                <line x1="50" y1="50" x2="350" y2="50" stroke="rgba(255,255,255,0.2)" stroke-width="4" stroke-linecap="round" />
                <circle cx="100" cy="50" r="6" fill="#666" />
                <circle cx="300" cy="50" r="6" fill="#666" />
                <circle id="moving-dot" cx="300" cy="50" r="10" fill="var(--bg-deep-red)" style="transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);" />
            </svg>
        `,v.innerHTML=`
            <svg viewBox="0 0 160 160" class="activity-svg">
                <path d="M 40 80 Q 20 80 20 60 Q 20 30 50 30 Q 60 10 90 10 Q 130 10 130 40 Q 150 40 150 70 Q 150 100 120 100 L 40 100 Z" 
                      fill="rgba(76, 175, 80, 0.1)" stroke="#4caf50" stroke-width="2" />
            </svg>
        `,T.forEach(b=>{b.onclick=()=>{T.forEach(w=>w.classList.remove("active")),b.classList.add("active");const E=b.dataset.time,D=t.selectedModal||"skal",k=a.querySelector("#moving-dot");if(E==="da"){k.setAttribute("cx","100");const w={skal:"skulle",må:"måtte",vil:"ville",kan:"kunne"};x.textContent=w[D]||D,x.style.color="#ff9800",x.classList.add("shift-past")}else k.setAttribute("cx","300"),x.textContent=D,x.style.color="white",x.classList.remove("shift-past");u.classList.add("action-pulse"),setTimeout(()=>u.classList.remove("action-pulse"),800)}})}function m(h,v,x){v.innerHTML="",x.innerHTML="",x.className="force-explanation visible";let T="",u="";const b=`
            <style>
                .viz-svg { width: 100%; max-width: 500px; height: 300px; }
                .stickman { stroke: white; stroke-width: 3; fill: none; }
                .target { fill: #ffeb3b; filter: drop-shadow(0 0 10px rgba(255, 235, 59, 0.5)); }
                .force-line { stroke-width: 4; stroke-linecap: round; fill: none; }
            </style>
        `;h==="skal"?(u="<strong>SKAL (social kraft):</strong> En ydre kraft eller en uundgåelig plan skubber barnet mod handlingen. Der er ingen vej udenom.",T=`
                <svg viewBox="0 0 200 120" class="viz-svg">
                    <g class="stickman" transform="translate(40,40)">
                        <circle cx="0" cy="0" r="10"/> <line x1="0" y1="10" x2="0" y2="40"/>
                    </g>
                    <circle cx="160" cy="65" r="15" class="target"/>
                    <path d="M 10 65 L 70 65" class="force-line" stroke="#ff5722" marker-end="url(#arrowhead)"/>
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#ff5722" />
                        </marker>
                    </defs>
                    <path d="M 20 65 Q 45 65 70 65" stroke="#ff5722" stroke-width="8" stroke-opacity="0.3" fill="none">
                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="infinite" />
                    </path>
                </svg>
            `):h==="må"?(u='<strong>MÅ (fjernelse af barriere):</strong> Vejen er spærret, men modalverbet "må" fjerner barrieren og giver tilladelse.',T=`
                <svg viewBox="0 0 200 120" class="viz-svg">
                    <g class="stickman" transform="translate(40,40)">
                        <circle cx="0" cy="0" r="10"/> <line x1="0" y1="10" x2="0" y2="40"/>
                    </g>
                    <circle cx="160" cy="65" r="15" class="target"/>
                    <line x1="100" y1="30" x2="100" y2="100" stroke="#4caf50" stroke-width="4" id="barrier">
                        <animate attributeName="y2" from="100" to="30" dur="1.5s" fill="freeze" />
                        <animate attributeName="opacity" from="1" to="0.2" dur="1.5s" fill="freeze" />
                    </line>
                    <path d="M 60 65 L 140 65" stroke="#4caf50" stroke-width="2" stroke-dasharray="5,5" />
                </svg>
            `):h==="vil"?(u="<strong>VIL (indre lyst):</strong> Kraften kommer indefra barnet selv. Det er et ønske eller en vilje, der trækker i retning af maden.",T=`
                <svg viewBox="0 0 200 120" class="viz-svg">
                    <g class="stickman" transform="translate(40,40)">
                        <circle cx="0" cy="0" r="10"/> <line x1="0" y1="10" x2="0" y2="40"/>
                    </g>
                    <circle cx="160" cy="65" r="15" class="target"/>
                    <path d="M 65 55 Q 110 55 145 65" stroke="#ff4081" stroke-width="3" fill="none" stroke-dasharray="5,5">
                         <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.5s" repeatCount="infinite" />
                    </path>
                    <circle cx="60" cy="55" r="15" fill="#ff4081" opacity="0.1">
                        <animate attributeName="r" from="10" to="25" dur="2s" repeatCount="infinite" />
                    </circle>
                </svg>
            `):h==="kan"&&(u="<strong>KAN (evne/potentiale):</strong> Barnet har energien og evnen til at udføre handlingen. Det er en indre ressource.",T=`
                <svg viewBox="0 0 200 120" class="viz-svg">
                    <g class="stickman" transform="translate(40,40)">
                        <circle cx="0" cy="0" r="10"/> <line x1="0" y1="10" x2="0" y2="40"/>
                        <circle cx="0" cy="20" r="25" stroke="#2196f3" stroke-width="1" opacity="0.3">
                            <animate attributeName="r" from="20" to="35" dur="3s" repeatCount="infinite" />
                        </circle>
                    </g>
                    <circle cx="160" cy="65" r="15" class="target"/>
                    <path d="M 60 65 L 140 65" stroke="#2196f3" stroke-width="2" opacity="0.4" />
                </svg>
            `),v.innerHTML=b+T,x.innerHTML=u}if(s(),!document.getElementById("modal-force-styles")){const h=document.createElement("style");h.id="modal-force-styles",h.textContent=`
            .modal-force-view {
                padding-top: 2rem;
            }
            .modal-force-view .force-visualization {
                background: rgba(0,0,0,0.3);
                border-radius: 24px;
                height: 300px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 2rem;
                overflow: hidden;
                border: 1px solid rgba(255,255,255,0.05);
            }
            @media (max-width: 600px) {
                .modal-force-view .force-visualization { height: 180px; border-radius: 12px; margin-bottom: 1.2rem; }
            }
            .viz-placeholder {
                opacity: 0.4;
                font-style: italic;
                padding: 1rem;
                text-align: center;
            }
            .modal-interaction {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.5rem;
                margin: 2rem 0;
                font-size: 1.8rem;
                font-weight: 700;
                flex-wrap: wrap;
            }
            @media (max-width: 600px) {
                .modal-interaction { 
                    font-size: 1.1rem; 
                    gap: 0.4rem; 
                    margin: 1rem 0;
                    justify-content: space-evenly;
                }
            }
            .no-wrap {
                white-space: nowrap;
                display: inline-block;
            }
            .modal-select {
                font-size: 1.5rem !important;
                padding: 0.5rem 1rem !important;
                background: var(--bg-deep-red) !important;
                border-radius: 12px !important;
                color: white !important;
                border: none !important;
            }
            @media (max-width: 600px) {
                .modal-select { 
                    font-size: 1rem !important; 
                    padding: 0.3rem 0.6rem !important; 
                    border-radius: 6px !important;
                    min-width: 70px;
                }
            }
            .force-explanation {
                background: rgba(255, 255, 255, 0.05);
                padding: 2rem;
                border-radius: 16px;
                line-height: 1.6;
                text-align: left;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.5s ease;
            }
            @media (max-width: 600px) {
                .force-explanation { padding: 1.2rem; font-size: 0.95rem; }
            }
            .force-explanation.visible {
                opacity: 1;
                transform: translateY(0);
            }
            .sentence-part {
                color: rgba(255,255,255,0.9);
            }
            
            /* Finiteness Exercise Styles */
            .finiteness-visual {
                display: flex;
                justify-content: center;
                gap: 3rem;
                margin: 3rem 0;
            }
            @media (max-width: 600px) {
                .finiteness-visual { gap: 1.5rem; margin: 2rem 0; }
            }
            .finiteness-box {
                background: rgba(255,255,255,0.05);
                padding: 1.5rem;
                border-radius: 20px;
                width: 200px;
                display: flex;
                flex-direction: column;
                align-items: center;
                border: 2px solid transparent;
                transition: all 0.3s ease;
            }
            @media (max-width: 600px) {
                .finiteness-box { padding: 1rem; border-radius: 16px; }
            }
            .finiteness-box .label {
                font-size: 0.9rem;
                opacity: 0.6;
                margin-bottom: 1rem;
            }
            .finiteness-box .word-display {
                font-size: 2.2rem;
                font-weight: 800;
                margin: 1rem 0;
            }
            @media (max-width: 600px) {
                .finiteness-box .word-display { font-size: 1.6rem; margin: 0.5rem 0; }
            }
            .time-toggle {
                display: flex;
                gap: 0.5rem;
                margin-top: 1rem;
            }
            .toggle-btn {
                background: rgba(255,255,255,0.1);
                border: none;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .toggle-btn.active {
                background: var(--bg-deep-red);
                box-shadow: 0 0 10px rgba(183, 28, 28, 0.4);
            }
            .pulse-anim {
                animation: pulse 0.5s ease;
                border-color: var(--bg-deep-red) !important;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .static-word {
                color: #4caf50;
                transition: transform 0.3s ease;
            }
            .action-pulse {
                animation: actionPulse 0.8s ease;
            }
            @keyframes actionPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); color: #8bc34a; }
                100% { transform: scale(1); }
            }
            .timeline-layout {
                gap: 2rem !important;
                flex-wrap: wrap;
            }
            .timeline-box {
                width: 450px !important;
                max-width: 100%;
            }
            .action-box {
                width: 250px !important;
                max-width: 100%;
            }
            .timeline-svg-main {
                width: 100%;
                height: 100px;
            }
            @media (max-width: 600px) {
                .timeline-svg-main { height: 60px; }
            }
            .word-anchor {
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                width: 100%;
            }
            #modal-word-marker {
                transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                transform: translateX(100px);
            }
            @media (max-width: 600px) {
                #modal-word-marker { transform: translateX(60px); }
            }
            #modal-word-marker.shift-past {
                transform: translateX(-100px);
            }
            @media (max-width: 600px) {
                #modal-word-marker.shift-past { transform: translateX(-60px); }
            }
            .activity-svg {
                width: 120px;
                height: 100px;
            }
            @media (max-width: 600px) {
                .activity-svg { width: 80px; height: 70px; }
            }
            .spotlight-btn {
                background: linear-gradient(135deg, var(--bg-deep-red), #ff5252);
                border: none;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                padding: 1.2rem 2.4rem;
                color: white;
                border-radius: 12px;
                cursor: pointer;
            }
            @media (max-width: 600px) {
                .spotlight-btn { padding: 1rem 1.5rem; font-size: 0.95rem; border-radius: 10px; }
            }
            .outline-btn {
                background: transparent;
                border: 2px solid rgba(255,255,255,0.2);
                color: white;
                padding: 1rem 2rem;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .outline-btn:hover {
                border-color: rgba(255,255,255,0.4);
                background: rgba(255,255,255,0.05);
            }
            .rec-btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .rec-icon { font-size: 1.5rem; }
            .rec-label { font-size: 1rem; font-weight: 600; }
        `,document.head.appendChild(h)}p.appendChild(r)}function _e(p,i,e={}){const r=document.createElement("div");r.className="view-container adjective-bridge-view";const t={nounAnchor:e.nounAnchor||"Et",selectedModal:e.selectedModal||"skal",selectedAdjective:""},d=document.createElement("div");d.className="top-bar";const o=document.createElement("button");o.className="back-btn",o.textContent="← "+n("back"),o.onclick=()=>i("modal_force",{nounAnchor:t.nounAnchor,selectedModal:t.selectedModal}),d.appendChild(o),r.appendChild(d);const l=document.createElement("h1");l.textContent=n("adjectiveTitle");const c=document.createElement("p");c.className="subtitle",c.textContent=n("adjectiveDesc"),r.appendChild(l),r.appendChild(c);const a=document.createElement("div");a.className="exercise-container",r.appendChild(a);function s(){a.innerHTML=`
            <div class="step-content animate-in">
                <div class="adjective-visual">
                    <div class="projector-container">
                        <div class="label">${n("adjectiveLabel")}</div>
                        <div class="svg-container" id="adj-projector-svg"></div>
                    </div>
                    
                    <div class="adjective-interaction">
                        <div class="sentence-preview" id="adj-sentence-preview">
                            <span class="sentence-part">${t.nounAnchor}</span>
                            <select class="grammatik-select adj-select" id="adj-select">
                                <option value="">???</option>
                                <!-- Dynamic options inserted here -->
                            </select>
                            <span class="sentence-part">barn <span id="adj-modal-inherited">${t.selectedModal}</span> spise</span>
                        </div>
                    </div>
                </div>

                <div class="force-explanation" id="adj-expl"></div>

                <div class="navigation-controls" style="margin-top: 3rem;" id="agreement-nav">
                    <button class="gemini-btn spotlight-btn" id="next-agreement-btn">Hvorfor bøjer vi adjektiver? ↓</button>
                </div>
            </div>

            <div id="agreement-section" class="step-content animate-in" style="display: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4rem; margin-top: 3rem;">
                <h2 style="margin-top: 0;">${n("agreementTitle")}</h2>
                <p class="subtitle" style="margin-bottom: 3rem;">${n("agreementDesc")}</p>

                <div class="agreement-visual">
                    <div class="magnet-container">
                        <div class="adjective-shape-box" id="adj-shaped">
                            <div class="shape-label">Adjektiv</div>
                            <div class="word-container">
                                <span class="stem">stor</span><span class="suffix" id="adj-suffix">x</span>
                            </div>
                        </div>

                        <!-- Magnetic Waves SVG -->
                        <div class="magnet-waves" id="magnet-waves-svg"></div>

                        <div class="noun-influence-box" id="noun-magnet">
                            <div class="magnet-label">Substantiv</div>
                            <div class="magnet-word" id="magnet-noun-display">Barn</div>
                        </div>
                    </div>

                    <div class="agreement-controls">
                        <div class="control-group">
                            <button class="toggle-btn active" data-type="ubestemt">${n("ubestemtLabel")}</button>
                            <button class="toggle-btn" data-type="bestemt">${n("bestemtLabel")}</button>
                        </div>
                        <div class="control-group" style="margin-top: 1rem;">
                            <button class="toggle-btn active" data-word="barn">Barn (Et)</button>
                            <button class="toggle-btn" data-word="bil">Bil (En)</button>
                        </div>
                    </div>
                </div>

                <div class="force-explanation visible" id="agreement-expl-box">
                    ${n("agreementExpl")}
                </div>

                <div class="recommendation-box animate-in" style="margin-top: 4rem;">
                    <div class="rec-title">${n("practiceMoreTitle")}</div>
                    <div class="rec-links">
                        <a href="#" class="rec-link" id="adj-comp-link">
                            <span class="icon">📈</span>
                            ${n("adjectiveComparisonLink")}
                        </a>
                    </div>
                </div>

                <div class="adverb-teaser animate-in" style="margin-top: 5rem; text-align: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 4rem;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem; color: #ffffff;">${n("adverbTeaser")}</h3>
                    <div class="navigation-controls">
                        <button class="gemini-btn spotlight-btn" id="next-adverb-btn">${n("nextStepAdverb")}</button>
                    </div>
                </div>

                <div class="navigation-controls" style="margin-top: 4rem; opacity: 0.5;">
                    <button class="back-btn" id="finish-btn" style="margin: 0 auto;">${n("back")}</button>
                </div>
            </div>
        `;const m=a.querySelector("#adj-projector-svg"),h=a.querySelector("#adj-select"),v=a.querySelector("#adj-expl"),x=a.querySelector("#finish-btn"),T=a.querySelector("#next-agreement-btn");m.innerHTML=`
            <svg viewBox="0 0 200 120" class="projector-svg-main">
                <rect x="20" y="40" width="60" height="40" rx="4" fill="#444" stroke="white" stroke-width="2" />
                <circle cx="40" cy="60" r="12" fill="#333" stroke="white" />
                <!-- Beam -->
                <path id="adj-beam" d="M 80 60 L 180 20 L 180 100 Z" fill="rgba(255, 235, 59, 0.4)" style="transition: all 0.5s ease;" />
                <!-- Highlighted area (Kugle) -->
                <circle id="adj-target-circle" cx="180" cy="60" r="35" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="1" style="transition: all 0.8s ease;" />
            </svg>
        `;const u=[{id:"stor",forms:{en:"stor",et:"stort",def:"store"}},{id:"træt",forms:{en:"træt",et:"træt",def:"trætte"}},{id:"smuk",forms:{en:"smuk",et:"smukt",def:"smukke"}}],E=t.nounAnchor!=="Et"&&t.nounAnchor!=="En"?"def":t.nounAnchor==="Et"?"et":"en";h.innerHTML+=u.map(w=>`<option value="${w.forms[E]}" data-base="${w.id}">${w.forms[E]}</option>`).join(""),h.onchange=()=>{const C=h.options[h.selectedIndex].dataset.base,_=h.value;if(!C)return;t.selectedAdjective=_,v.innerHTML=`
                <div class="agreement-notice">
                    <strong>${t.nounAnchor} ${_} barn...</strong><br>
                    ${n("adjectiveExpl")}
                </div>
            `,v.className="force-explanation visible";const A=a.querySelector("#adj-beam"),y=a.querySelector("#adj-target-circle"),B={stor:{beam:"rgba(76, 175, 80, 0.5)",circle:"rgba(76, 175, 80, 0.4)"},træt:{beam:"rgba(100, 149, 237, 0.5)",circle:"rgba(100, 149, 237, 0.4)"},smuk:{beam:"rgba(255, 105, 180, 0.6)",circle:"rgba(255, 105, 180, 0.5)"}}[C]||{beam:"rgba(255, 255, 255, 0.4)",circle:"rgba(255, 255, 255, 0.2)"};A.style.fill=B.beam,y.style.fill=B.circle,y.setAttribute("r","40"),setTimeout(()=>y.setAttribute("r","35"),500)},x.onclick=()=>i("dagens_opgave");const D=a.querySelector("#adj-comp-link");D.onclick=w=>{w.preventDefault(),i("adjective_comparison")};const k=a.querySelector("#next-adverb-btn");k.onclick=()=>{i("adverb_bridge",{nounAnchor:t.nounAnchor,selectedNoun:t.selectedNoun||"barn",selectedVerb:t.selectedVerb||"spiser",isPlural:t.isPlural||!1})},T.onclick=()=>{const w=a.querySelector("#agreement-section");w.style.display="block",g(),T.style.display="none",setTimeout(()=>{w.scrollIntoView({behavior:"smooth",block:"start"})},50)}}function g(){const m=a.querySelector("#magnet-waves-svg"),h=a.querySelector("#magnet-noun-display"),v=a.querySelector("#adj-suffix"),x=a.querySelector(".stem"),T=a.querySelectorAll(".toggle-btn");let u="barn",b="ubestemt";function E(){const k=b==="bestemt"?"#4caf50":"rgba(255,255,255,0.5)",w=b==="bestemt"?"1.0":"0.4",C=b==="bestemt"?"4":"2";m.innerHTML=`
                <svg viewBox="0 0 200 60" style="width: 100%; height: 60px;">
                    <path d="M 180 10 Q 100 10 20 10" fill="none" stroke="${k}" stroke-width="${C}" opacity="${w}" stroke-dasharray="10,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="15" dur="1s" repeatCount="infinite" />
                    </path>
                    <path d="M 180 30 Q 100 30 20 30" fill="none" stroke="${k}" stroke-width="${parseInt(C)+1}" opacity="${w}">
                        <animate attributeName="d" values="M 180 30 Q 100 30 20 30; M 180 30 Q 100 40 20 30; M 180 30 Q 100 30 20 30" dur="1.5s" repeatCount="infinite" />
                    </path>
                    <path d="M 180 50 Q 100 50 20 50" fill="none" stroke="${k}" stroke-width="${C}" opacity="${w}" stroke-dasharray="10,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="-15" dur="1.2s" repeatCount="infinite" />
                    </path>
                </svg>
            `}function D(){u==="barn"?(h.textContent="Barn",x.textContent="stor",b==="bestemt"?(v.textContent="e",v.classList.add("active")):(v.textContent="t",v.classList.add("active"))):(h.textContent="Bil",x.textContent="hurtig",b==="bestemt"?(v.textContent="e",v.classList.add("active")):(v.textContent="",v.classList.remove("active"))),E()}T.forEach(k=>{k.onclick=()=>{k.parentElement.querySelectorAll(".toggle-btn").forEach(C=>C.classList.remove("active")),k.classList.add("active"),k.dataset.type&&(b=k.dataset.type),k.dataset.word&&(u=k.dataset.word),D()}}),D()}if(s(),!document.getElementById("adj-bridge-styles")){const m=document.createElement("style");m.id="adj-bridge-styles",m.textContent=`
            .adjective-bridge-view .adjective-visual {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 2rem;
                margin: 2rem 0;
                flex-wrap: wrap;
            }
            @media (max-width: 600px) {
                .adjective-bridge-view .adjective-visual { gap: 1rem; margin: 1.5rem 0; }
            }
            .projector-svg-main {
                width: 180px;
                height: 100px;
            }
            @media (max-width: 600px) {
                .projector-svg-main { width: 140px; height: 80px; }
            }
            .adj-interaction {
                background: rgba(255,255,255,0.05);
                padding: 1.5rem;
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.1);
                width: 100%;
                max-width: 450px;
            }
            @media (max-width: 600px) {
                .adj-interaction { padding: 1rem; border-radius: 16px; }
            }
            .sentence-preview {
                font-size: 1.5rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.8rem;
                flex-wrap: wrap;
            }
            @media (max-width: 600px) {
                .sentence-preview { font-size: 1.1rem; gap: 0.5rem; }
            }
            .adj-select {
                font-size: 1.3rem !important;
                padding: 0.3rem 0.6rem !important;
                background: #4caf50 !important;
                border-radius: 10px !important;
            }
            @media (max-width: 600px) {
                .adj-select { font-size: 1rem !important; padding: 0.2rem 0.4rem !important; border-radius: 6px !important; }
            }
            .force-explanation {
                background: rgba(255, 255, 255, 0.08);
                padding: 2rem;
                border-radius: 20px;
                line-height: 1.6;
                font-size: 1.1rem;
                text-align: left;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.5s ease;
                margin: 1.5rem auto;
                max-width: 600px;
                border: 1px solid rgba(255,255,255,0.1);
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
            @media (max-width: 600px) {
                .force-explanation { padding: 1.2rem; font-size: 0.95rem; margin: 1rem auto; }
            }
            .force-explanation.visible {
                opacity: 1;
                transform: translateY(0);
            }
            .agreement-notice {
                font-size: 1.15rem;
            }
            @media (max-width: 600px) {
                .agreement-notice { font-size: 1rem; }
                .agreement-notice strong { font-size: 1.2rem; }
            }
            .agreement-notice strong {
                color: #4caf50;
                font-size: 1.3rem;
            }

            /* Agreement Interaction Styles */
            .agreement-visual {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2.5rem;
                margin: 3rem 0;
            }
            @media (max-width: 600px) {
                .agreement-visual { gap: 1.5rem; margin: 2rem 0; }
            }
            .magnet-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                width: 100%;
                max-width: 600px;
                background: rgba(0,0,0,0.2);
                padding: 2.5rem 1.5rem;
                border-radius: 30px;
                position: relative;
                border: 1px solid rgba(255,255,255,0.05);
            }
            @media (max-width: 600px) {
                .magnet-container { padding: 1.5rem 1rem; border-radius: 20px; }
            }
            .noun-influence-box {
                background: #6b0f1a;
                padding: 1.2rem 1.5rem;
                border-radius: 16px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 2;
                min-width: 120px;
                border: 1px solid rgba(255,255,255,0.1);
            }
            @media (max-width: 600px) {
                .noun-influence-box { padding: 0.8rem 1rem; min-width: 90px; }
            }
            .magnet-label, .shape-label {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.6;
                margin-bottom: 0.4rem;
            }
            .magnet-word {
                font-size: 1.5rem;
                font-weight: 800;
            }
            @media (max-width: 600px) {
                .magnet-word { font-size: 1.2rem; }
            }
            .magnet-waves {
                flex: 1;
                height: 60px;
                pointer-events: none;
                z-index: 1;
            }
            .adjective-shape-box {
                background: rgba(255,255,255,0.05);
                padding: 1.2rem 1.5rem;
                border-radius: 16px;
                border: 2px dashed rgba(255,255,255,0.2);
                min-width: 150px;
                text-align: center;
                transition: all 0.5s ease;
                z-index: 2;
            }
            @media (max-width: 600px) {
                .adjective-shape-box { padding: 0.8rem 1rem; min-width: 110px; }
            }
            .word-container {
                font-size: 1.8rem;
                font-weight: 800;
            }
            @media (max-width: 600px) {
                .word-container { font-size: 1.4rem; }
            }
            .suffix {
                color: #ffeb3b; /* Bright yellow for suffix */
                display: inline-block;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                transform: scale(0.5);
                opacity: 0;
                font-weight: 800;
                text-shadow: 0 0 10px rgba(255, 235, 59, 0.5);
            }
            .suffix.active {
                transform: scale(1.1);
                opacity: 1;
                color: #4caf50; /* Green highlight when active */
                animation: pulse-suffix 1.5s infinite alternate;
            }
            @keyframes pulse-suffix {
                from { transform: scale(1); text-shadow: 0 0 5px rgba(76, 175, 80, 0.5); }
                to { transform: scale(1.2); text-shadow: 0 0 20px rgba(76, 175, 80, 0.8); }
            }
            .agreement-controls {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }
            .control-group {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                justify-content: center;
            }
            .toggle-btn {
                background: rgba(255, 255, 255, 0.05);
                border: 2px solid rgba(255, 255, 255, 0.1);
                color: var(--text-muted);
                padding: 0.70rem 1.2rem;
                border-radius: 12px;
                font-family: var(--font-family);
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 0.95rem;
            }
            @media (max-width: 600px) {
                .toggle-btn { padding: 0.5rem 1rem; font-size: 0.85rem; border-radius: 10px; }
            }
            .toggle-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.3);
            }
            .toggle-btn.active {
                background: #4caf50;
                color: white;
                border-color: #4caf50;
                box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
                transform: translateY(-2px);
            }
            .spotlight-btn {
                background: #ffcc00 !important;
                color: #000 !important;
                box-shadow: 0 0 25px rgba(255, 204, 0, 0.4);
                border: 2px solid rgba(255, 255, 255, 0.5) !important;
                font-size: 1.3rem !important;
                font-weight: 800 !important;
                letter-spacing: 0.5px;
            }
            @media (max-width: 600px) {
                .spotlight-btn { font-size: 1.1rem !important; padding: 0.8rem 1.2rem !important; }
            }
            .spotlight-btn:hover {
                background: #fff !important;
                color: #000 !important;
                box-shadow: 0 0 35px rgba(255, 255, 255, 0.6);
                transform: translateY(-3px) scale(1.02);
            }

            /* Recommendation Box Styles */
            .recommendation-box {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 24px;
                padding: 2rem;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.1);
            }
            @media (max-width: 600px) {
                .recommendation-box { padding: 1.5rem; border-radius: 16px; }
            }
            .rec-title {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-muted);
                margin-bottom: 1.2rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .rec-links {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                align-items: center;
            }
            .rec-link {
                display: flex;
                align-items: center;
                gap: 1rem;
                background: rgba(255, 255, 255, 0.08);
                padding: 1rem 1.5rem;
                border-radius: 16px;
                text-decoration: none;
                color: white;
                font-size: 1.15rem;
                font-weight: 600;
                transition: all 0.3s ease;
                border: 1px solid rgba(255,255,255,0.1);
                width: 100%;
                max-width: 400px;
                justify-content: center;
            }
            @media (max-width: 600px) {
                .rec-link { font-size: 1rem; padding: 0.8rem 1.2rem; }
            }
            .rec-link:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateY(-3px);
                border-color: #4caf50;
            }
            .rec-link .icon {
                font-size: 1.4rem;
            }
        `,document.head.appendChild(m)}p.appendChild(r)}function Le(p,i,e={}){const r=e.nounAnchor||N.nounAnchor||"Et",t=e.selectedNoun||N.selectedNoun||"barn",d=e.selectedVerb||N.selectedVerb||"spiser";let o="langsomt";p.innerHTML=`
        <div class="grounding-container animate-in">
            <div class="header-section">
                <button class="back-btn" id="back-to-adj">←</button>
                <h1>${n("adverbTitle")}</h1>
                <p class="subtitle">${n("adverbDesc")}</p>
            </div>

            <div class="bridge-exercise-area">
                <div class="adverb-visual-section">
                    <div class="projector-container">
                        <div class="label">Projektør</div>
                        <div class="svg-container" id="adv-projector-svg"></div>
                    </div>

                    <div class="handling-container">
                        <div class="handling-box" id="verb-box">
                            <div class="box-label">Handling</div>
                            <div class="box-word">${d}</div>
                        </div>
                        
                        <!-- Dynamic Waves Container -->
                        <div class="waves-interaction-area" id="waves-container"></div>

                        <div class="adverb-box" id="active-adv-box">
                            <div class="box-label">Adverbium</div>
                            <div class="box-word" id="active-adverb">langsomt</div>
                        </div>
                    </div>
                </div>

                <div class="sentence-display">
                    <span class="noun-anchor">${r}</span>
                    <span class="adjective-part" id="sentence-adj">stort</span>
                    <span class="noun-part">${t}</span>
                    <span class="verb-part" id="verb-display">${d}</span>
                    <div class="adverb-drop-zone">
                        <select id="adverb-select" class="grammatik-select premium-select">
                            <option value="langsomt">langsomt</option>
                            <option value="hurtigt">hurtigt</option>
                            <option value="meget">meget</option>
                            <option value="lidt">lidt</option>
                        </select>
                    </div>
                </div>

                <div class="force-explanation visible" id="adverb-expl-box">
                    ${n("adverbExpl")}
                </div>

                <div class="adverb-teaser animate-in" style="margin-top: 5rem; text-align: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 4rem;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem; color: #ffffff;">${n("adverbTeaserNext")}</h3>
                    <div class="navigation-controls">
                        <button class="gemini-btn spotlight-btn" id="next-conjunction-btn">${n("nextStepAfterAdverb")}</button>
                    </div>
                </div>

                <div class="navigation-controls" style="margin-top: 4rem; opacity: 0.5;">
                    <button class="back-btn" id="finish-btn" style="margin: 0 auto;">${n("back")}</button>
                </div>
            </div>
        </div>
    `;const l=p.querySelector("#back-to-adj"),c=p.querySelector("#finish-btn"),a=p.querySelector("#adverb-select"),s=p.querySelector("#active-adverb"),g=p.querySelector("#waves-container"),m=p.querySelector("#adv-projector-svg"),h=p.querySelector("#sentence-adj");m.innerHTML=`
        <svg viewBox="0 0 200 120" class="projector-svg-main">
            <rect x="20" y="40" width="60" height="40" rx="4" fill="#444" stroke="white" stroke-width="2" />
            <circle cx="40" cy="60" r="12" fill="#333" stroke="white" />
            <path id="adv-beam" d="M 80 60 L 180 20 L 180 100 Z" fill="rgba(255, 235, 59, 0.4)" style="transition: all 0.5s ease;" />
        </svg>
    `;const v=u=>u==="Et"?"stort":u==="Det"||u==="Mit"?"store":"stort";h.textContent=v(r);function x(u){let b="1.5s",E=3,D="#ffeb3b",k=2;u==="hurtigt"?(b="0.4s",D="#4caf50",E=5):u==="langsomt"?(b="3.5s",D="#2196f3",E=2):u==="meget"?(b="1s",D="#f44336",E=8,k=4):u==="lidt"&&(b="2s",D="#9e9e9e",E=1,k=1);let w="";for(let _=0;_<E;_++){const y=30+(_-(E-1)/2)*10;w+=`
                <path d="M 10 ${y} Q 50 ${y-10} 90 ${y} T 170 ${y}" fill="none" stroke="${D}" stroke-width="${k}" opacity="0.7">
                    <animate attributeName="d" values="M 10 ${y} Q 50 ${y-10} 90 ${y} T 170 ${y}; M 10 ${y} Q 50 ${y+10} 90 ${y} T 170 ${y}; M 10 ${y} Q 50 ${y-10} 90 ${y} T 170 ${y}" dur="${b}" repeatCount="infinite" />
                </path>
            `}g.innerHTML=`
            <svg viewBox="0 0 180 60" style="width: 100%; height: 60px;">
                ${w}
            </svg>
        `;const C=m.querySelector("#adv-beam");if(C){C.style.fill=D.replace(")",", 0.4)").replace("#","rgba(");const _={hurtigt:"rgba(76, 175, 80, 0.4)",langsomt:"rgba(33, 150, 243, 0.4)",meget:"rgba(244, 67, 54, 0.4)",lidt:"rgba(158, 158, 158, 0.4)"};C.style.fill=_[u]||"rgba(255, 235, 59, 0.4)"}}a.onchange=u=>{o=u.target.value,s.textContent=o,x(o),s.parentElement.classList.add("pulse"),setTimeout(()=>s.parentElement.classList.remove("pulse"),500)},l.onclick=()=>i("adjective_bridge"),c.onclick=()=>i("dagens_opgave");const T=p.querySelector("#next-conjunction-btn");if(T.onclick=()=>i("conjunction_bridge",{nounAnchor:r,selectedNoun:t,selectedVerb:d,selectedAdverb:o,adjectivePart:h.textContent}),x(o),!document.getElementById("adverb-bridge-styles")){const u=document.createElement("style");u.id="adverb-bridge-styles",u.textContent=`
            .sentence-display {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: 0.8rem;
                font-size: 1.5rem;
                font-weight: 700;
                margin: 2.5rem 0;
                padding: 1.5rem;
                background: rgba(255,255,255,0.03);
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.05);
            }
            @media (max-width: 600px) {
                .sentence-display { font-size: 1.1rem; padding: 1rem; gap: 0.5rem; margin: 1.5rem 0; }
            }
            .adverb-drop-zone {
                min-width: 120px;
            }
            @media (max-width: 600px) {
                .adverb-drop-zone { min-width: 90px; }
            }
            .premium-select {
                background: #4caf50 !important;
                color: white;
                padding: 0.3rem 0.6rem !important;
                border-radius: 10px !important;
                font-size: 1.3rem !important;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
                transition: all 0.3s ease;
            }
            @media (max-width: 600px) {
                .premium-select { font-size: 1rem !important; padding: 0.2rem 0.4rem !important; border-radius: 6px !important; }
            }
            .premium-select:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
            }

            .adverb-visual-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
                margin: 2.5rem 0;
            }
            @media (max-width: 600px) {
                .adverb-visual-section { gap: 1rem; margin: 1.5rem 0; }
            }
            .projector-svg-main {
                width: 180px;
                height: 100px;
            }
            @media (max-width: 600px) {
                .projector-svg-main { width: 140px; height: 80px; }
            }
            .handling-container {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                width: 100%;
                max-width: 800px;
                background: rgba(0,0,0,0.2);
                padding: 2.5rem 1.5rem;
                border-radius: 30px;
                position: relative;
                border: 1px solid rgba(255,255,255,0.05);
            }
            @media (max-width: 600px) {
                .handling-container { padding: 1.5rem 1rem; border-radius: 20px; gap: 0.5rem; }
            }
            .handling-box, .adverb-box {
                background: rgba(255,255,255,0.05);
                padding: 1.2rem 1.5rem;
                border-radius: 16px;
                min-width: 120px;
                text-align: center;
                z-index: 2;
                border: 1px solid rgba(255,255,255,0.1);
                flex: 1;
                max-width: 160px;
            }
            @media (max-width: 600px) {
                .handling-box, .adverb-box { padding: 0.8rem 1rem; min-width: 90px; }
            }
            .handling-box {
                background: #6b0f1a;
            }
            .adverb-box {
                background: linear-gradient(135deg, rgba(255, 235, 59, 0.1), rgba(255, 235, 59, 0.2));
                border-color: rgba(255, 235, 59, 0.3);
            }
            .box-label {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.6;
                margin-bottom: 0.4rem;
            }
            .box-word {
                font-size: 1.5rem;
                font-weight: 800;
            }
            @media (max-width: 600px) {
                .box-word { font-size: 1.1rem; }
            }
            .waves-interaction-area {
                flex: 1;
                height: 60px;
                z-index: 1;
            }
            .pulse {
                animation: box-pulse 0.5s ease;
            }
            @keyframes box-pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .force-explanation {
                background: rgba(255, 255, 255, 0.08);
                padding: 2rem;
                border-radius: 20px;
                line-height: 1.6;
                font-size: 1.1rem;
                text-align: left;
                margin: 1.5rem auto;
                max-width: 600px;
                border: 1px solid rgba(255,255,255,0.1);
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
            @media (max-width: 600px) {
                .force-explanation { padding: 1.2rem; font-size: 0.95rem; margin: 1rem auto; }
            }
        `,document.head.appendChild(u)}}function ze(p,i,e={}){const r=e.nounAnchor||N.nounAnchor||"Et",t=e.selectedNoun||N.selectedNoun||"barn",d=e.selectedVerb||N.selectedVerb||"spiser",o=e.selectedAdverb||N.selectedAdverb||"langsomt",l=e.adjectivePart||"stort";let c="fordi";p.innerHTML=`
        <div class="grounding-container animate-in">
            <div class="header-section">
                <button class="back-btn" id="back-to-adv">←</button>
                <h1>${n("conjunctionTitle")}</h1>
                <p class="subtitle">${n("conjunctionDesc")}</p>
            </div>

            <div class="bridge-exercise-area">
                <div class="conjunction-visual-section">
                    <div class="flow-container" id="flow-visual-area">
                        <div class="sentence-node" id="node-1">Sætning 1</div>
                        <div class="flow-path-wrapper">
                            <div class="conj-label" id="conj-indicator">fordi</div>
                            
                            <!-- Main SVG Container -->
                            <svg class="flow-svg" viewBox="0 0 400 120" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orientation="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                                    </marker>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                        <feMerge>
                                            <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                    </filter>
                                </defs>

                                <!-- Timeline (for Da/Når) -->
                                <line id="timeline-base" x1="50" y1="60" x2="350" y2="60" stroke="white" stroke-width="1" stroke-dasharray="4" opacity="0" />
                                
                                <!-- Obstacle (for Alligevel/Selvom) -->
                                <g id="obstacle-group" opacity="0">
                                    <rect id="obs-part-1" x="195" y="30" width="10" height="30" fill="rgba(255,255,255,0.3)" />
                                    <rect id="obs-part-2" x="195" y="60" width="10" height="30" fill="rgba(255,255,255,0.3)" />
                                </g>

                                <!-- Main Activity Path -->
                                <path id="flow-path" d="M 0 60 L 400 60" fill="none" stroke="#4caf50" stroke-width="4" filter="url(#glow)" />
                                
                                <!-- Clock Icon (for Da/Når) -->
                                <g id="clock-group" opacity="0">
                                    <circle cx="0" cy="0" r="15" fill="none" stroke="white" stroke-width="2" />
                                    <line x1="0" y1="0" x2="0" y2="-10" stroke="white" stroke-width="2" id="clock-hand-1" />
                                    <line x1="0" y1="0" x2="7" y2="0" stroke="white" stroke-width="1" id="clock-hand-2" />
                                </g>

                                <!-- moving arrow head -->
                                <g id="moving-arrow" opacity="0">
                                    <polygon points="-10,-5 2,0 -10,5" fill="currentColor" />
                                </g>
                            </svg>
                        </div>
                        <div class="sentence-node" id="node-2">Sætning 2</div>
                    </div>
                </div>

                <div class="full-sentence-display">
                    <div class="sentence-part-1">
                        <span class="noun-anchor">${r}</span>
                        <span class="adjective-part">${l}</span>
                        <span class="noun-part">${t}</span>
                        <span class="verb-part">${d}</span>
                        <span class="adverb-part">${o}</span>
                    </div>
                    
                    <div class="conjunction-part">
                        <span id="punctuation-before">,</span>
                        <select id="conjunction-select" class="grammatik-select premium-select conj-select">
                            <option value="fordi">fordi</option>
                            <option value="når">når</option>
                            <option value="da">da</option>
                            <option value="selvom">selvom</option>
                            <option value="alligevel">alligevel</option>
                            <option value="men">men</option>
                            <option value="Derfor">Derfor</option>
                        </select>
                    </div>
                </div>

                <div class="force-explanation visible" id="conj-expl-box">
                    ${n("conjunctionExpl")}
                </div>

                <div class="recommendation-box animate-in" style="margin-top: 4rem;">
                    <div class="rec-title">${n("practiceMoreTitle")}</div>
                    <div class="rec-links">
                        <a href="#" class="rec-link" id="conj-practice-link">
                            <span class="icon">🔗</span>
                            ${n("conjunctionPracticeLink")}
                        </a>
                    </div>
                </div>

                <p class="reflection-text animate-in" style="margin-top: 2rem; color: var(--text-muted); font-style: italic; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                    ${n("conjunctionClosingReflection")}
                </p>

                <div class="navigation-controls" style="margin-top: 4rem;">
                    <button class="gemini-btn spotlight-btn" id="finish-btn">${n("nextStepAfterConjunction")}</button>
                </div>
            </div>
        </div>
    `;const a=p.querySelector("#back-to-adv"),s=p.querySelector("#finish-btn"),g=p.querySelector("#conjunction-select"),m=p.querySelector("#punctuation-before"),h=p.querySelector("#conj-practice-link"),v=p.querySelector("#flow-path"),x=p.querySelector("#conj-indicator"),T=p.querySelector("#clock-group"),u=p.querySelector("#timeline-base"),b=p.querySelector("#obstacle-group"),E=p.querySelector("#obs-part-1"),D=p.querySelector("#obs-part-2"),k=p.querySelector("#moving-arrow");function w(C){c=C,x.textContent=C;const _=p.querySelector("#conj-expl-box");_&&(_.innerHTML=n(`conjExpl_${C.toLowerCase()}`)),T.style.opacity="0",u.style.opacity="0",b.style.opacity="0",k.style.opacity="0",E.setAttribute("y","30"),D.setAttribute("y","60"),v.style.opacity="1",v.style.strokeDasharray="none",v.classList.remove("animate-flow-lr","animate-flow-rl","animate-flow-break"),C==="Derfor"?(m.textContent=".",m.style.marginRight="1rem"):(m.textContent=",",m.style.marginRight="0.5rem");let A="#4caf50",y="M 50 60 L 350 60",S=!0;C==="fordi"?(A="#4caf50",y="M 50 60 L 350 60",v.classList.add("animate-flow-lr")):C==="Derfor"?(A="#4caf50",y="M 350 60 L 50 60",v.classList.add("animate-flow-rl")):C==="da"?(A="#2196f3",u.style.opacity="0.5",T.style.opacity="1",T.classList.add("animate-clock-past"),v.style.opacity="0",S=!1):C==="når"?(A="#2196f3",u.style.opacity="0.5",T.style.opacity="1",T.classList.add("animate-clock-future"),v.style.opacity="0",S=!1):C==="alligevel"?(A="#ff9800",b.style.opacity="1",v.classList.add("animate-flow-lr")):C==="selvom"?(A="#f44336",b.style.opacity="1",v.classList.add("animate-flow-break"),E.classList.add("animate-split-up"),D.classList.add("animate-split-down")):C==="men"&&(A="#f44336",y="M 50 60 Q 200 10 350 60",v.classList.add("animate-flow-lr")),v&&(v.setAttribute("d",y),v.setAttribute("stroke",A),v.style.animation="none",v.offsetHeight,v.style.animation=null),S&&k&&(k.style.opacity="1",k.style.color=A,k.innerHTML=`
                <polygon points="-12,-6 2,0 -12,6" fill="currentColor" />
                <animateMotion dur="1.5s" repeatCount="infinite" path="${y}" rotate="auto" />
            `),x.style.background=A,x.classList.add("pulse"),setTimeout(()=>x.classList.remove("pulse"),500)}if(g.onchange=C=>{T.classList.remove("animate-clock-past","animate-clock-future"),E.classList.remove("animate-split-up"),D.classList.remove("animate-split-down"),w(C.target.value)},a.onclick=()=>i("adverb_bridge",{nounAnchor:r,selectedNoun:t,selectedVerb:d,selectedAdverb:o,adjectivePart:l}),s.onclick=()=>i("dagens_opgave"),h.onclick=C=>{C.preventDefault(),i("traen_grammatik")},w(c),!document.getElementById("conj-bridge-styles")){const C=document.createElement("style");C.id="conj-bridge-styles",C.textContent=`
            .recommendation-box {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 24px;
                padding: 2rem;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.1);
                margin: 0 auto;
                max-width: 600px;
            }
            @media (max-width: 600px) {
                .recommendation-box { padding: 1.5rem; border-radius: 16px; }
            }
            .rec-title {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-muted);
                margin-bottom: 1.2rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .rec-links {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                align-items: center;
            }
            .rec-link {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                background: rgba(255, 255, 255, 0.08);
                padding: 1rem 1.5rem;
                border-radius: 16px;
                text-decoration: none;
                color: white;
                font-size: 1.15rem;
                font-weight: 600;
                transition: all 0.3s ease;
                border: 1px solid rgba(255,255,255,0.1);
                width: 100%;
                max-width: 400px;
            }
            @media (max-width: 600px) {
                .rec-link { font-size: 1rem; padding: 0.8rem 1.2rem; }
            }
            .rec-link:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateY(-3px);
                border-color: #4caf50;
            }
            .rec-link .icon {
                font-size: 1.4rem;
            }

            .conjunction-visual-section {
                margin: 1.5rem 0;
                background: rgba(0,0,0,0.2);
                padding: 1.5rem;
                border-radius: 30px;
                border: 1px solid rgba(255,255,255,0.05);
                height: 160px;
                display: flex;
                align-items: center;
            }
            @media (max-width: 600px) {
                .conjunction-visual-section { padding: 1rem; border-radius: 20px; height: 120px; margin: 1rem 0; }
            }
            .flow-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 0.5rem;
                width: 100%;
            }
            .sentence-node {
                background: rgba(255,255,255,0.05);
                padding: 0.8rem;
                border-radius: 10px;
                border: 1px solid rgba(255,255,255,0.1);
                font-weight: 600;
                min-width: 80px;
                text-align: center;
                color: rgba(255,255,255,0.7);
                font-size: 0.8rem;
            }
            @media (max-width: 600px) {
                .sentence-node { padding: 0.5rem; min-width: 60px; font-size: 0.7rem; }
            }
            .flow-path-wrapper {
                flex-grow: 1;
                position: relative;
                height: 100px;
            }
            @media (max-width: 600px) {
                .flow-path-wrapper { height: 60px; }
            }
            .flow-svg {
                width: 100%;
                height: 100%;
                overflow: visible;
            }
            .conj-label {
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                background: #4caf50;
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 1rem;
                font-weight: 700;
                box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 10;
            }
            @media (max-width: 600px) {
                .conj-label { font-size: 0.85rem; padding: 0.2rem 0.6rem; top: -10px; }
            }
            
            /* Animations */
            .animate-flow-lr {
                stroke-dasharray: 400;
                stroke-dashoffset: 400;
                animation: draw 1.5s ease-out forwards infinite;
            }
            .animate-flow-rl {
                stroke-dasharray: 400;
                stroke-dashoffset: -400;
                animation: draw-back 1.5s ease-out forwards infinite;
            }
            @keyframes draw { to { stroke-dashoffset: 0; } }
            @keyframes draw-back { to { stroke-dashoffset: 0; } }

            .animate-clock-past {
                animation: move-left 3s ease-in-out infinite;
            }
            .animate-clock-future {
                animation: move-right 3s ease-in-out infinite;
            }
            @keyframes move-left {
                0% { transform: translate(200px, 60px) rotate(0deg); }
                100% { transform: translate(50px, 60px) rotate(-360deg); }
            }
            @keyframes move-right {
                0% { transform: translate(200px, 60px) rotate(0deg); }
                100% { transform: translate(350px, 60px) rotate(360deg); }
            }

            .animate-split-up {
                animation: split-up 1s ease forwards;
            }
            .animate-split-down {
                animation: split-down 1s ease forwards;
            }
            @keyframes split-up { to { transform: translateY(-25px); opacity: 0.5; } }
            @keyframes split-down { to { transform: translateY(25px); opacity: 0.5; } }

            .animate-flow-break {
                stroke-dasharray: 400;
                stroke-dashoffset: 400;
                animation: draw 2s linear forwards infinite;
            }

            .full-sentence-display {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: 0.4rem;
                font-size: 1.5rem;
                font-weight: 700;
                margin: 2rem 0;
                padding: 2rem;
                background: rgba(255,255,255,0.03);
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.05);
                line-height: 1.4;
            }
            @media (max-width: 600px) {
                .full-sentence-display { font-size: 1.1rem; padding: 1.2rem; margin: 1.5rem 0; }
            }
            .conj-select {
                margin: 0 0.5rem;
            }
            .sentence-part-2 {
                color: #ffeb3b;
            }
            .pulse {
                animation: conj-pulse 0.5s ease;
            }
            @keyframes conj-pulse {
                0% { transform: translateX(-50%) scale(1); }
                50% { transform: translateX(-50%) scale(1.1); }
                100% { transform: translateX(-50%) scale(1); }
            }
        `,document.head.appendChild(C)}}function Me(p,i){const e=document.createElement("div");e.className="view-container adjective-comparison";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>i("pronomen"),r.appendChild(t),e.appendChild(r);const d=document.createElement("h1");d.textContent=n("adjComparisonTitle"),e.appendChild(d);const o=document.createElement("p");o.className="subtitle",o.textContent=n("adjComparisonDesc"),e.appendChild(o);const l=document.createElement("div");l.className="exercise-area",e.appendChild(l);const c=[{positive:"højt",comparative:"højere",superlative:"højest",example:"Bjerget er [word]."},{positive:"stort",comparative:"større",superlative:"størst",example:"Huset er [word]."},{positive:"grønt",comparative:"grønnere",superlative:"grønnest",example:"Græsset er [word]."}];let a=0,s="positive";function g(){const u=c[a];l.innerHTML=`
            <div class="adj-tabs">
                ${c.map((b,E)=>`
                    <button class="tab-btn ${E===a?"active":""}" data-idx="${E}">
                        ${b.positive}
                    </button>
                `).join("")}
            </div>

            <div class="tree-comparison-container">
                <div class="tree-stage">
                    <!-- Tree 1: Positive -->
                    <div class="tree-box ${s==="positive"?"selected":""}" data-grade="positive">
                        <div class="tree-visual" id="tree-1">
                            <svg viewBox="0 0 100 120">
                                <rect x="45" y="80" width="10" height="30" fill="#5D4037" />
                                <circle cx="50" cy="60" r="30" fill="#4CAF50" />
                            </svg>
                        </div>
                        <div class="grade-label">${n("positiveLabel")}</div>
                        <div class="grade-word">${u.positive}</div>
                    </div>

                    <!-- Tree 2: Comparative -->
                    <div class="tree-box ${s==="comparative"?"selected":""}" data-grade="comparative">
                        <div class="tree-visual" id="tree-2">
                            <svg viewBox="0 0 100 150">
                                <rect x="42" y="100" width="16" height="40" fill="#5D4037" />
                                <circle cx="50" cy="70" r="45" fill="#388E3C" />
                                <!-- Comparison Line -->
                                ${s==="comparative"||s==="superlative"?'<line x1="100" y1="100" x2="-20" y2="100" stroke="rgba(255,255,255,0.3)" stroke-dasharray="4" />':""}
                            </svg>
                        </div>
                        <div class="grade-label">${n("comparativeLabel")}</div>
                        <div class="grade-word">${u.comparative}</div>
                    </div>

                    <!-- Tree 3: Superlative -->
                    <div class="tree-box ${s==="superlative"?"selected":""}" data-grade="superlative">
                        <div class="tree-visual" id="tree-3">
                            <svg viewBox="0 0 100 180">
                                <rect x="40" y="120" width="20" height="50" fill="#5D4037" />
                                <circle cx="50" cy="80" r="60" fill="#2E7D32" />
                            </svg>
                        </div>
                        <div class="grade-label">${n("superlativeLabel")}</div>
                        <div class="grade-word">${u.superlative}</div>
                    </div>
                </div>

                <div class="example-box animate-in">
                    <div class="example-label">Eksempel:</div>
                    <div class="example-text">
                        ${u.example.replace("[word]",`<span class="highlight highlight-grad">${u[s]}</span>`)}
                    </div>
                </div>

                <div class="interactive-comparison" id="comparison-highlight">
                    <!-- Dynamic comparison indicator -->
                </div>
            </div>

            <div class="adj-practice-section" style="margin-top: 4rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 3rem;">
                <h2 style="text-align: center; margin-bottom: 2rem;">Træn mere med bøjninger</h2>
                
                <div id="adj-exercises-container">
                    <!-- Exercises rendered here -->
                </div>

                <div id="exercise-summary" class="grammatik-summary" style="margin-top: 2rem; text-align: center;"></div>

                <div style="text-align: center; margin-top: 2rem;">
                    <button id="next-set-btn" class="gemini-btn" style="display: none;">${n("newExercise")}</button>
                </div>
            </div>
        `,l.querySelectorAll(".tab-btn").forEach(b=>{b.onclick=()=>{a=parseInt(b.dataset.idx),g()}}),l.querySelectorAll(".tree-box").forEach(b=>{b.onclick=()=>{s=b.dataset.grade,g()}}),T(),v()}const m=[[{text:"Jeg ser en [blank_0] fugl.",options:["gul","gult","gule"],answer:"gul",feedback:"Her er det blot en beskrivelse af én ting (fuglen)."},{text:"Min bror er [blank_1] end mig.",options:["høj","højere","højest"],answer:"højere",feedback:"Her sammenlignes der to personer."},{text:"Det er det [blank_2] træ i skoven.",options:["høj","højere","højeste"],answer:"højeste",feedback:"Her fremhæves ét træ frem for alle de andre."},{text:"Vi spiser [blank_3] æbler.",options:["rød","rødt","røde"],answer:"røde",feedback:"Her er det en beskrivelse af flere ting (æblerne)."},{text:"Det [blank_4] barn leger i haven.",options:["glad","gladt","glade"],answer:"glade",feedback:"Her beskrives et bestemt barn."}],[{text:"Huset er [blank_0] end bilen.",options:["stor","større","størst"],answer:"større",feedback:"Her sammenlignes størrelsen på to ting."},{text:"Hun har et [blank_1] smil.",options:["smuk","smukt","smukke"],answer:"smukt",feedback:"Her er det blot en beskrivelse af én ting (smilet)."},{text:"Det er den [blank_2] dag i mit liv.",options:["god","bedre","bedste"],answer:"bedste",feedback:"Her fremhæves én dag frem for alle andre dage."},{text:"De [blank_3] blomster dufter godt.",options:["smuk","smukt","smukke"],answer:"smukke",feedback:"Her beskrives nogle bestemte blomster."},{text:"Græsset er [blank_4].",options:["grøn","grønt","grønne"],answer:"grønt",feedback:"Her er det blot en beskrivelse af én ting (græsset)."}]];let h=0;function v(){const u=e.querySelector("#adj-exercises-container"),b=m[h];u.innerHTML=b.map((k,w)=>`
            <div class="practice-row" style="margin-bottom: 2rem; background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 15px;">
                <div class="question-text" style="font-size: 1.3rem; margin-bottom: 1rem;">
                    ${k.text.replace(/\[blank_\d+\]/,`
                        <select class="grammatik-select adj-practice-select" data-idx="${w}">
                            <option value="">...</option>
                            ${k.options.map(C=>`<option value="${C}">${C}</option>`).join("")}
                        </select>
                    `)}
                </div>
                <div class="row-feedback" id="feedback-${w}" style="display: none; font-style: italic; color: #4CAF50; padding: 0.5rem; border-left: 3px solid #4CAF50; background: rgba(76, 175, 80, 0.1); border-radius: 4px;"></div>
            </div>
        `).join("");const E=u.querySelectorAll(".adj-practice-select"),D=document.getElementById("next-set-btn");E.forEach(k=>{k.onchange=()=>{const w=k.dataset.idx,C=b[w],_=document.getElementById(`feedback-${w}`);k.value===C.answer?(k.classList.add("correct"),k.classList.remove("wrong"),_.textContent=C.feedback,_.style.display="block"):k.value===""?(k.classList.remove("correct","wrong"),_.style.display="none"):(k.classList.add("wrong"),k.classList.remove("correct"),_.style.display="none"),x(E)}}),D&&(D.onclick=()=>{h=(h+1)%m.length,g()})}function x(u){const b=e.querySelector("#exercise-summary"),E=e.querySelector("#next-set-btn"),D=Array.from(u).filter(C=>C.value!=="").length,k=Array.from(u).filter(C=>C.classList.contains("correct")).length,w=u.length;D===0?b.textContent="":k===w?(b.innerHTML=`<span class="success">${n("allCorrect")}</span>`,E&&(E.style.display="inline-block")):b.textContent=`${D} / ${w} ${n("filled")||"udfyldt"}`}function T(){const u=l.querySelector("#comparison-highlight");s==="comparative"?u.innerHTML=`
                <div class="comparison-bubble">
                    Den er <strong>mere</strong> end den første!
                </div>
            `:s==="superlative"?u.innerHTML=`
                <div class="comparison-bubble">
                    Den er <strong>mest</strong> af alle!
                </div>
            `:u.innerHTML=""}if(g(),p.appendChild(e),!document.getElementById("adj-comp-styles")){const u=document.createElement("style");u.id="adj-comp-styles",u.textContent=`
            .adjective-comparison .adj-tabs {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }
            @media (max-width: 600px) {
                .adjective-comparison .adj-tabs { gap: 0.3rem; margin-bottom: 1.5rem; }
            }
            .tree-stage {
                display: flex;
                align-items: flex-end;
                justify-content: center;
                gap: 1.5rem;
                margin-bottom: 2.5rem;
                min-height: 220px;
            }
            @media (max-width: 600px) {
                .tree-stage { gap: 0.8rem; min-height: 180px; margin-bottom: 1.5rem; }
            }
            .tree-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                opacity: 0.7;
                flex: 1;
                max-width: 120px;
            }
            .tree-box:hover {
                transform: translateY(-10px);
                opacity: 1;
            }
            .tree-box.selected {
                opacity: 1;
                transform: scale(1.05);
            }
            .tree-visual {
                width: 100%;
                display: flex;
                align-items: flex-end;
                justify-content: center;
            }
            #tree-1 svg { height: 100px; }
            #tree-2 svg { height: 130px; }
            #tree-3 svg { height: 160px; }

            @media (max-width: 600px) {
                #tree-1 svg { height: 70px; }
                #tree-2 svg { height: 95px; }
                #tree-3 svg { height: 120px; }
            }
            
            .grade-label {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.6;
                margin-top: 0.8rem;
                text-align: center;
            }
            .grade-word {
                font-size: 1.2rem;
                font-weight: 800;
                color: #4CAF50;
                text-align: center;
                word-break: break-all;
            }
            @media (max-width: 600px) {
                .grade-label { font-size: 0.65rem; margin-top: 0.5rem; }
                .grade-word { font-size: 1rem; }
            }
            .tree-box.selected .grade-word {
                color: #ffeb3b;
                text-shadow: 0 0 10px rgba(255, 235, 59, 0.5);
            }
            
            .example-box {
                background: rgba(255, 255, 255, 0.05);
                padding: 1.5rem;
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.1);
                max-width: 500px;
                margin: 0 auto;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            @media (max-width: 600px) {
                .example-box { padding: 1rem; border-radius: 16px; }
            }
            .example-label {
                font-size: 0.85rem;
                opacity: 0.5;
                margin-bottom: 0.4rem;
            }
            .example-text {
                font-size: 1.6rem;
                font-weight: 600;
                line-height: 1.3;
            }
            @media (max-width: 600px) {
                .example-text { font-size: 1.2rem; }
            }
            .highlight-grad {
                color: #ffeb3b;
                border-bottom: 2px dashed #ffeb3b;
            }
            
            .comparison-bubble {
                background: #4CAF50;
                color: white;
                padding: 0.8rem 1.5rem;
                border-radius: 20px;
                margin-top: 1.5rem;
                text-align: center;
                max-width: 280px;
                margin-left: auto;
                margin-right: auto;
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                font-size: 1rem;
            }
            @media (max-width: 600px) {
                .comparison-bubble { font-size: 0.9rem; padding: 0.6rem 1.2rem; margin-top: 1rem; }
            }
            
            .adj-practice-section {
                margin-top: 3rem !important;
                padding-top: 2rem !important;
            }
            .practice-row {
                margin-bottom: 1.5rem !important;
                padding: 1.2rem !important;
            }
            @media (max-width: 600px) {
                .practice-row { padding: 1rem !important; margin-bottom: 1rem !important; }
                .question-text { font-size: 1.1rem !important; line-height: 1.6 !important; }
                .row-feedback { font-size: 0.9rem !important; }
            }
            
            @keyframes popIn {
                0% { transform: scale(0.5); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        `,document.head.appendChild(u)}}function Ke(p,i){const e=document.createElement("div");e.className="view-container";const r=document.createElement("div");r.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.innerHTML=`← ${n("back")}`,t.onclick=()=>i("main"),r.appendChild(t),e.appendChild(r);const d=document.createElement("h1");d.textContent=n("verbumLearning"),e.appendChild(d);const o=document.createElement("p");o.className="subtitle",o.textContent=n("hvilketVerbDesc"),e.appendChild(o);const l=document.createElement("div");l.className="grid",[{key:"verberHjaelpe",type:"hjaelpe",icon:"💡"},{key:"verberTilstand",type:"tilstand",icon:"🏠"},{key:"verberBevaegelse",type:"bevaegelse",icon:"🚶"},{key:"verberHandling",type:"handling",icon:"🛠️"},{key:"verberInteraktion",type:"interaktion",icon:"🗣️"},{key:"verberIndreLiv",type:"indre_liv",icon:"🧠"}].forEach(a=>{const s=document.createElement("div");s.className="card",s.onclick=()=>i("verbum_learning",{categoryId:a.type,backView:"verbum_menu"});const g=document.createElement("div");g.className="card-icon",g.textContent=a.icon;const m=document.createElement("div");m.className="card-title",m.textContent=n(a.key),s.appendChild(g),s.appendChild(m),l.appendChild(s)}),e.appendChild(l),p.appendChild(e)}function L(p,i={},e=!1){const r=document.querySelector("#app");if(r.innerHTML="",!e){let t="/"+p;if(i&&Object.keys(i).length>0){const d=new URLSearchParams(i);t+="?"+d.toString()}window.location.hash=t}if(p==="language")N.currentView="language",ne(r,L);else if(p==="main")N.currentView="main",re(r,L);else if(p==="notes")N.currentView="notes",ae(r,L);else if(p==="dagens_opgave")N.currentView="dagens_opgave",ie(r,L);else if(p==="word_learning")N.currentView="word_learning",oe(r,L);else if(p==="samtale_traening")N.currentView="samtale_traening",se(r,L);else if(p==="samtale_hverdag")N.currentView="samtale_hverdag",le(r,L);else if(p==="skrive_hjaelp")N.currentView="skrive_hjaelp",de(r,L);else if(p==="du1_modul3")N.currentView="du1_modul3",ce(r,L);else if(p==="du2_modul1")N.currentView="du2_modul1",he(r,L);else if(p==="smaa_historier")N.currentView="smaa_historier",be(r,L);else if(p==="du2_modul5")N.currentView="du2_modul5",ve(r,L);else if(p==="email_laan")N.currentView="email_laan",ke(r,L);else if(p==="opdragelse")N.currentView="opdragelse",fe(r,L);else if(p==="en_klage")N.currentView="en_klage",xe(r,L);else if(p==="du1_min_hverdag")N.currentView="du1_min_hverdag",me(r,L);else if(p==="transport_sprogskole")N.currentView="transport_sprogskole",pe(r,L);else if(p==="du1_madlavning")N.currentView="du1_madlavning",ge(r,L);else if(p==="du1_rengoering")N.currentView="du1_rengoering",ue(r,L);else if(p==="traen_tidsudtryk")N.currentView="traen_tidsudtryk",ye(r,L);else if(p==="lav_sporgsmal")N.currentView="lav_sporgsmal",we(r,L);else if(p==="ordstilling")N.currentView="ordstilling",Ce(r,L);else if(p==="traen_grammatik")N.currentView="traen_grammatik",Ee(r,L);else if(p==="pronomen")N.currentView="pronomen",Te(r,L);else if(p==="verbum_learning"){N.currentView="verbum_learning";const t=new Ne(L,i?.categoryId,i?.backView);r.appendChild(t.render())}else p==="verbum_menu"?(N.currentView="verbum_menu",Ke(r,L)):p==="grounding"?(N.currentView="grounding",Se(r,L)):p==="bestemthed"?(N.currentView="bestemthed",Be(r,L)):p==="modal_force"?(N.currentView="modal_force",He(r,L,i)):p==="adjective_bridge"?(N.currentView="adjective_bridge",_e(r,L,i)):p==="adverb_bridge"?(N.currentView="adverb_bridge",Le(r,L,i)):p==="conjunction_bridge"?(N.currentView="conjunction_bridge",ze(r,L,i)):p==="adjective_comparison"&&(N.currentView="adjective_comparison",Me(r,L))}function X(){const p=window.location.hash.replace(/^#\/?/,""),[i,e]=p.split("?"),r={};if(e){const t=new URLSearchParams(e);for(const[d,o]of t.entries())r[d]=o}i?L(i,r,!0):N.lang?L("main"):L("language")}document.addEventListener("DOMContentLoaded",()=>{window.addEventListener("hashchange",X),X()});
