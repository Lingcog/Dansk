(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const g of n)if(g.type==="childList")for(const o of g.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const g={};return n.integrity&&(g.integrity=n.integrity),n.referrerPolicy&&(g.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?g.credentials="include":n.crossOrigin==="anonymous"?g.credentials="omit":g.credentials="same-origin",g}function r(n){if(n.ep)return;n.ep=!0;const g=t(n);fetch(n.href,g)}})();const G="/Dansk/",Q={da:{selectLanguage:"Vælg sprog",title:"Træning i dansk",subtitle:"Vælg en kategori for at starte din træning.",dagensOpgave:"Dagens opgave",dagensOpgaveDesc:"Nyt emne, ny grammatik. Løs opgaven!",modulTest:"Træning til modultest",modulTestDesc:"Forskellige opgaver samlet på ét sted.",notes:"Undervisningsnoter",notesDesc:"Læs og øv noter fra undervisningen.",lavSporgsmal:"Lav spørgsmål",lavSporgsmalDesc:"Lær at stille præcise spørgsmål ud fra billeder.",lavSporgsmalBtnText:"Lav spørgsmål - tryk her",samtaleTraening:"Samtaletræning",samtaleTraeningDesc:"Øv dine samtaler og få hjælp til dit dansk.",skriveHjaelp:"Skrivehjælp",skriveHjaelpDesc:"Indsæt din tekst og få feedback uden svar.",verbumLearning:"Lær danske verber",verbumLearningDesc:"Træn de 100 mest almindelige danske udsagnsord.",phase2_instruction:"Gæt verbet ud fra definitionen.",back:"Tilbage",enterPassword:"Indtast adgangskode for at se indholdet:",du1mod3:"DU1, modul 3 og 4",du2mod1:"DU2, modul 1",smaahistorier:"Små historier",du2mod5:"DU2, modul 5",emailLaan:"E-mail om lån",opdragelse:"Historie om opdragelse",enKlage:"En klage",du3mod4:"DU3, modul 4",laerEtNytOrd:"Lær et nyt ord",laerEtNytOrdDesc:"Udforsk hvordan ord hænger sammen i netværk.",wordNetworkExplanation:"Ord er forbundet med andre ord. Det hjælper dig til at huske ordet meget bedre, når du ved hvordan ordet er forbundet til andre ord.",targetWord:"Hund",hypernym:"Overbegreb",hypernymWord:"Dyr",synonym:"Synonym",synonymWord:"Vovse",antonym:"Antonym",antonymWord:"Kat",hyponym:"Underbegreb",hyponymWord:"Puddel",geminiBtnText:"Lær et ord - tryk her",geminiConsentText:"Ved at klikke på dette link er du indforstået med at du bruger et af Googles produkter og at Google træner kunstig intelligens med dine svar.",hverdagssamtale:"Hverdagssamtale",hverdagssamtaleDesc:"Øv dig i almindelige samtaler om hverdagen.",samtaleBolig:"Samtale om bolig",samtaleArbejde:"Samtale om arbejde",samtaleBtnText:"Start samtalen - tryk her",skriveHjaelpBtnText:"Skrivehjælp - tryk her",du1mod3Desc:"Vælg et emne at øve.",minHverdag:"Min hverdag",minBolig:"Min bolig",mitArbejde:"Mit arbejde",minHverdagDesc:"Opgaver om din dagligdag.",transportSprogskole:"Transport til sprogskolen",madlavning:"Madlavning",rengoering:"Rengøring",transportDesc:"Hvordan kommer du i skole?",padletDesc:"Del med klassen, hvordan du kommer til sprogskolen i dag.",padletBtnText:"Åbn padlet",madlavningDesc:"Hvad kan du lide at lave af mad?",madlavningPadletDesc:"Del dine madoplevelser med klassen her.",rengoeringDesc:"Hvordan gør du rent?",rengoeringPadletDesc:"Del dine tanker om rengøring med klassen.",traenTidsudtryk:"Træn tidsudtryk",traenTidsudtrykDesc:"Hvordan bruger man forskellige tidsudtryk på dansk?",traenTidsudtrykBtnText:"Åbn tidsudtryk øvelse",ordstilling:"Ordstilling",ordstillingDesc:"Ryk rundt på ordene og sæt dem i den rigtige rækkefølge.",checkResult:"Tjek svar",correctOrder:"Flot! Rækkefølgen er rigtig.",wrongOrder:"Ikke helt rigtigt. Prøv igen!",ordstillingLet:"Ordstilling (let)",ordstillingSvaer:"Ordstilling (mellemsvær)",levelA1:"A1 sætninger",levelA2:"A2 sætninger",traenGrammatik:"Træn grammatik",grammatikDesc:"Udfyld hullerne med de rigtige ord i teksten.",let:"Let (a1)",mellemsvaer:"Mellemsvær (a2)",svaer:"Svær (b1)",modultest:"Modultest",modultestLongDesc:"En længere tekst på 10 linjer. Find de rigtige ord i listen og udfyld hullerne.",grammatikIntro:"Vælg et niveau for at starte øvelsen.",checkAnswers:"Tjek alle svar",allCorrect:"Fantastisk! Alle svar er korrekte.",someWrong:"Nogle af dine svar er ikke helt rigtige. Prøv igen!",newExercise:"Næste tekst",hintMean:"Dette ord giver ikke mening i sammenhængen.",hintTense:"Tjek tiden. Er det nutid eller datid?",hintForm:"Tjek ordets bøjning (f.eks. en/et eller ental/flertal).",hintPerson:"Tjek hvem der gør noget (jeg, du, han/hun).",hintContext:"Læs hele teksten igen. Hvad passer bedst her?",hintName:"Her skal du bruge et ord om navne.",hintPlace:"Her skal du bruge et ord om steder.",hintAction:"Dette ord beskriver en anden handling.",hintAdj:"Tjek tillægsordet (beskrivelse af en ting).",hintAdverb:"Tjek biordet (tid, sted eller måde).",derErDetEr:"Der er / det er?",derErExpl:"Der er' åbner døren for noget nyt. 'Det er' peger på det, vi kender.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Husk: 'Der er' (introduktion) vs 'Det er' (identifikation).",hvilketOrd:"Hvilket ord skal jeg vælge?",hvilketOrdDesc:"Træn pronominer (stedord) og verber (udsagnsord) i forskellige sammenhænge.",hanHamHans:"Han / ham / hans?",gårGikGået:"Går / gik / er gået?",verberM3:"Lær danske verber (nutid)",hvilketVerbDesc:"Vælg en kategori for at træne verber.",pronominerSubjekt:"Subjekt (fokus)",pronominerObjekt:"Objekt (ikke-fokus)",pronominerPossessiv:"Possessiv (ejer)",verberBevaegelse:"Bevægelse (gå, køre, komme)",verberHandling:"Handling (gøre, lave, bruge)",verberHjaelpe:"Hjælpeverber (kan, skal, vil)",verberTilstand:"Tilstand & besiddelse (er, har)",verberInteraktion:"Social interaktion (sige, spørge)",verberIndreLiv:"Det indre liv (se, tænke, vide)",verberDatid:"Datid (uregelmæssige)",verberDatidRegelm:"Datid (regelmæssige)",verberTider:"Datid vs. Førnutid (punktet & broen)",hintPronominer:"Tjek hvem der er i fokus eller hvem der ejer noget.",howToBuildSentence:"Hvordan bygger man en sætning?",howToBuildSentenceDesc:"Lær hvordan ord ankres til virkeligheden.",groundingIntro:"Uden grammatik svæver ord frit som balloner. Vi bruger grammatik til at ankre dem til virkeligheden (her og nu).",groundingStep1:"1. Konceptet (ballonen): 'Barn' er bare en idé. Vi ved ikke hvilket barn.",groundingStep2:"2. Handlingen: 'At spise' er bare en idé. Vi ved ikke hvornår.",groundingStep3:"3. Ankeret: Brug små ord (kendeord) og tid (bøjning) til at trække ballonerne ned.",sentenceGround:"Virkelighedens jord",wellDone:"Flot! Du har nu bygget en sætning, der er forankret i virkeligheden.",finitenessTitle:"Hvorfor bøjer vi kun det første ord?",finitenessDesc:"Det første ord (modalverbet) placerer sætningen i tid på tidslinjen. Det næste ord har kun fokus på selve handlingen.",timelineLabel:"Tidslinjen (Her forankres kraften)",actionLabel:"Handlingen (Selve aktiviteten)",nowLabel:"Nutid (Nu)",pastLabel:"Datid (Da)",finitenessExpl:"Læg mærke til: Kun det første ord bevæger sig på tidslinjen. Handlingen (spise) er den samme uanset tid.",adjectiveTitle:"Hvad slags barn?",adjectiveDesc:"Adjektiver er som en projektør, der lyser på et ord og giver det mere farve eller detalje.",adjectiveLabel:"Projektøren (Detalje)",adjectiveExpl:"Læg mærke til: Adjektivets form ændrer sig efter ordet foran (Et stort / Mit store).",nextStepAdjective:"Næste øvelse: Adjektiver ↓",adjectiveTeaser:"Hvordan kan vi beskrive barnet? Altså hvordan kan vi beskrive verden omkring os?",agreementTitle:"Hvad bestemmer bøjningen?",agreementDesc:"Substantivet (navneordet) bestemmer, hvilken endelse adjektivet skal have.",ubestemtLabel:"Ubestemt (Et / En)",bestemtLabel:"Bestemt (Det / Den)",agreementExpl:"Når vi taler om noget <strong>bestemt</strong>, tilføjer vi et <strong>-e</strong>. Omvendt bestemmer <em>Et barn</em>, at der skal et <strong>-t</strong> på (et stort barn).",exampleBarn:"barn",exampleBil:"bil",practiceMoreTitle:"Vil du øve mere?",adjectiveComparisonLink:"Adjektiver - stor / større / størst",adverbTeaser:"Hvordan beskriver vi en HANDLING? Altså hvordan kan vi beskrive måden vi gør ting på?",nextStepAdverb:"Næste øvelse: Adverbier ↓",adverbTitle:"Hvordan beskriver vi en handling?",adverbDesc:"Adverbiet fortæller os noget om, hvordan handlingen (verbet) bliver gjort.",adverbExpl:"Læg mærke til, hvordan det valgte ord beskriver <em>måden</em> barnet spiser på. Det giver liv og detaljer til handlingen!",nextStepAfterAdverb:"Næste skridt: Konjunktioner ↓",adverbTeaserNext:"Hvordan kan vi forbinde to tanker? Lad os se på konjunktioner.",conjunctionTitle:"Hvorfor forbinder vi sætninger?",conjunctionDesc:"Konjunktioner er som lim, der binder to tanker sammen og skaber dynamik og flow.",conjunctionExpl:"Læg mærke til, hvordan det lille ord (konjunktionen) ændrer flowet mellem dine tanker.",conjunctionTeaser:"Hvad sker der når vi sætter to ting sammen? Kan vi forklare hvorfor, hvornår eller trods noget?",sentence2_fordi:"det er sultent",sentence2_naar:"solen skinner",sentence2_da:"det blev mørkt",sentence2_selvom:"det ikke må",sentence2_alligevel:"det er svært",sentence2_men:"det er snart færdigt",sentence2_derfor:"er tallerkenen tom",conjExpl_fordi:"Pilen bevæger sig fra venstre mod højre for at pege på <strong>årsagen</strong> (hvorfor spiser barnet?).",conjExpl_derfor:"Pilen bevæger sig fra højre mod venstre for at pege <strong>tilbage</strong> på årsagen i den første sætning.",conjExpl_da:"Uret bevæger sig mod venstre for at vise, at noget skete én gang i <strong>fortiden</strong>.",conjExpl_naar:"Uret bevæger sig mod højre for at vise en <strong>fremtidig</strong> handling eller noget der sker <strong>hver gang</strong> (vane).",conjExpl_selvom:"Forhindringen må dele sig, fordi 'indrømmelsen' (selvom) lader handlingen ske <strong>trods modstand</strong>.",conjExpl_alligevel:"Pilen bevæger sig ufortrødent <strong>gennem</strong> forhindringen for at vise, at handlingen sker på trods af alt.",conjExpl_men:"Buen over forhindringen viser et skift eller en <strong>modsætning</strong> mellem to forskellige tanker.",conjFordi:"fordi",conjNaar:"når",conjDa:"da",conjSelvom:"selvom",conjAlligevel:"alligevel",conjMen:"men",conjDerfor:"Derfor",conjunctionPracticeLink:"Konjunktioner - men, fordi og når",conjunctionClosingReflection:"Nu har du set hvordan vi med grammatik kan konstruere og sætte ord på vores opfattelse af virkeligheden.",adjFeedback1:"Her er det blot en beskrivelse af én ting (fuglen).",adjFeedback2:"Her sammenlignes der to personer.",adjFeedback3:"Her fremhæves ét træ frem for alle de andre.",adjFeedback4:"Her er det en beskrivelse af flere ting (æblerne).",adjFeedback5:"Her beskrives et bestemt barn.",adjFeedback6:"Her sammenlignes størrelsen på to ting.",adjFeedback7:"Her er det blot en beskrivelse af én ting (smilet).",adjFeedback8:"Her fremhæves én dag frem for alle andre dage.",adjFeedback9:"Her beskrives nogle bestemte blomster.",adjFeedback10:"Her er det blot en beskrivelse af én ting (græsset).",exerciseSetCounter:"Sæt {n} / {total}",nextStepAfterConjunction:"Afslut øvelse",adjComparisonTitle:"Adjektiver - stor / større / størst",adjComparisonDesc:"Hvordan sammenligner vi ting? Klik på træerne for at se hvordan adjektiver bøjes i grader.",positiveLabel:"Positiv",comparativeLabel:"Komparativ",superlativeLabel:"Superlativ",verbExerciseSubtitle:"Bøj udsagnsord i nutid og datid.",advChoiceTitle:"Måske / godt / ikke",advChoiceDesc:"Træn brugen af centrale adverbier i forskellige sætninger.",adverbChoice:"Måske / godt / ikke",soedSoedereSoedest:"Adjektiver - stor / større / størst",nextPhase:"Næste fase →",nextExercise:"Næste opgave →",nextCategory:"Næste kategori →",next:"Næste →",filled:"udfyldt",correct:"korrekte",filledProgress:"{n} / {total} udfyldt",correctProgress:"{n} / {total} korrekte",selectAnchor:"Vælg anker...",selectTense:"Vælg tid...",tenseNow:"(nu)",tensePast:"(i går)",tenseFuture:"(senere)",pastTense:"Datid",presentTense:"Nutid",futureTense:"Fremtid",groundingRelation:"Mit barn (relation)",groundingIndefinite:"Et barn (ubestemt)",groundingDistal:"Det barn (udpegning)",groundingProximal:"Dette barn (nærhed)",pastTense:"Datid",presentTense:"Nutid",futureTense:"Fremtid",groundingRelation:"Mit barn (relation)",groundingIndefinite:"Et barn (ubestemt)",groundingDistal:"Det barn (udpegning)",groundingProximal:"Dette barn (nærhed)",dragInstruction:"Træk ordene ned på jorden for at bygge din sætning.",sentenceLabel:"Sætning:",finishBtn:"Afslut og gå tilbage",modalTeaserTitle:"Vil du øve mere?",modalTeaserText:"Sætningen er bygget... men hvem har egentlig kontrollen? Findes der en usynlig kraft mellem barnet og maden?",modalVerbLabel:"Modalverber (usynlig kraft)",bestemthedLabel:"Bestemthed - En / et",pronomenLabel:"Pronominer - Han/Ham/Hans",verberLabel:"Verber - Går/gik/gået",groundingSuccess:"Flot! Se animationen nedenfor.",groundingFinalMsg:"Flot! Du har nu bygget en sætning, der er forankret i virkeligheden.",modalForceTitle:"Modalverber: den usynlige kraft",modalForceSubtitle:'Modalverber ændrer ikke handlingen, men de ændrer "kraften" bag den.',modalForceSkal:"<strong>SKAL (social kraft):</strong> En ydre kraft eller en uundgåelig plan skubber barnet mod handlingen. Der er ingen vej udenom.",modalForceMaa:'<strong>MÅ (fjernelse af barriere):</strong> Vejen er spærret, men modalverbet "må" fjerner barrieren og giver tilladelse.',modalForceVil:"<strong>VIL (indre lyst):</strong> Kraften kommer indefra barnet selv. Det er et ønske eller en vilje, der trækker i retning af maden.",modalForceKan:"<strong>KAN (evne/potentiale):</strong> Barnet har energien og evnen til at udføre handlingen. Det er en indre ressource.",modalPracticeLabel:"Modalverber: kan, vil, skal og må",modalForcePlaceholder:"Vælg et modalverbum for at se kraften",whyConjugateFirst:"Hvorfor bøjer vi kun det første ord? ↓",whyConjugateAdjectives:"Hvorfor bøjer vi adjektiver? ↓",noun:"Substantiv",adjective:"Adjektiv",verb:"Verbum",adverb:"Adverbium",conjunction:"Konjunktion",handlingLabel:"Handling",projektørLabel:"Projektør",sentenceNode1:"Sætning 1",sentenceNode2:"Sætning 2",example:"Eksempel:",exampleBarn:"Barn (Et)",exampleBil:"Bil (En)",advLangsomt:"langsomt",advHurtigt:"hurtigt",advMeget:"meget",advLidt:"lidt",positiveLabelSimple:"Grundform",comparativeLabelSimple:"Højere grad",superlativeLabelSimple:"Højeste grad",comparisonBubbleComp:"Den er <strong>mere</strong> end den første!",comparisonBubbleSuper:"Den er <strong>mest</strong> af alle!",practiceMoreInflections:"Træn mere med bøjninger"},en:{selectLanguage:"Select language",title:"Danish Training",subtitle:"Select a category to start your training.",dagensOpgave:"Daily Task",dagensOpgaveDesc:"New topic, new grammar. Solve the task!",modulTest:"Module Test Training",modulTestDesc:"Various tasks gathered in one place.",notes:"Teaching Notes",notesDesc:"Read and practice notes from class.",lavSporgsmal:"Make Questions",lavSporgsmalDesc:"Learn to ask precise questions based on pictures.",lavSporgsmalBtnText:"Make questions - click here",samtaleTraening:"Conversation Training",samtaleTraeningDesc:"Practice conversations and get help with your Danish.",skriveHjaelp:"Writing Help",skriveHjaelpDesc:"Insert your text and get feedback without answers.",back:"Back",enterPassword:"Enter password to view content:",du1mod3:"DU1, Module 3 and 4",du2mod1:"DU2, Module 1",smaahistorier:"Short stories",du2mod5:"DU2, Module 5",emailLaan:"E-mail about loan",opdragelse:"Story about upbringing",enKlage:"A complaint",du3mod4:"DU3, Module 4",laerEtNytOrd:"Learn a new word",laerEtNytOrdDesc:"Explore how words are connected in networks.",wordNetworkExplanation:"Words are connected to other words. It helps you remember the word much better when you know how the word is connected to other words.",targetWord:"Dog",hypernym:"Hypernym",hypernymWord:"Animal",synonym:"Synonym",synonymWord:"Doggie",antonym:"Antonym",antonymWord:"Cat",hyponym:"Hyponym",hyponymWord:"Poodle",geminiBtnText:"Learn a word - click here",geminiConsentText:"By clicking this link, you agree that you are using a Google product and that Google trains artificial intelligence with your responses.",hverdagssamtale:"Everyday Conversation",hverdagssamtaleDesc:"Practice common everyday conversations.",samtaleBolig:"Conversation about housing",samtaleArbejde:"Conversation about work",samtaleBtnText:"Start conversation - click here",skriveHjaelpBtnText:"Writing help - click here",du1mod3Desc:"Choose a topic to practice.",minHverdag:"My everyday life",minBolig:"My housing",mitArbejde:"My work",minHverdagDesc:"Tasks about your daily life.",transportSprogskole:"Transport to language school",madlavning:"Cooking",rengoering:"Cleaning",transportDesc:"How do you get to school?",padletDesc:"Share with the class how you get to language school today.",padletBtnText:"Open Padlet",madlavningDesc:"What kind of food do you like to cook?",madlavningPadletDesc:"Share your cooking experiences with the class here.",rengoeringDesc:"How do you clean?",rengoeringPadletDesc:"Share your thoughts on cleaning with the class.",traenTidsudtryk:"Practice time expressions",traenTidsudtrykDesc:"How do you use different time expressions in Danish?",traenTidsudtrykBtnText:"Open time expressions exercise",ordstilling:"Word Order",ordstillingDesc:"Rearrange the words and put them in the correct order.",checkResult:"Check answer",correctOrder:"Great! The order is correct.",wrongOrder:"Not quite right. Try again!",ordstillingLet:"Word Order (Easy)",ordstillingSvaer:"Word Order (Medium)",levelA1:"A1 sentences",levelA2:"A2 sentences",traenGrammatik:"Practice Grammar",grammatikDesc:"Fill in the blanks with the correct words in the text.",let:"Easy (A1)",mellemsvaer:"Medium (A2)",svaer:"Hard (B1)",modultest:"Module Test",modultestLongDesc:"A longer 10-line text. Find the correct words in the list and fill in the blanks.",grammatikIntro:"Select a level to start the exercise.",checkAnswers:"Check all answers",allCorrect:"Fantastic! All answers are correct.",someWrong:"Some of your answers are not quite right. Try again!",newExercise:"Next text",hintMean:"This word doesn't make sense in this context.",hintTense:"Check the tense. Is it present or past?",hintForm:"Check the word form (e.g., gender or singular/plural).",hintPerson:"Check who is performing the action (I, you, he/she).",hintContext:"Read the whole text again. What fits best here?",hintName:"You need a word for names here.",hintPlace:"You need a word for places here.",hintAction:"This word describes a different action.",hintAdj:"Check the adjective (description of a thing).",hintAdverb:"Check the adverb (time, place, or manner).",derErDetEr:"Der er / Det er?",derErExpl:"'Der er' opens the door for new info. 'Det er' points to what we know.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Remember: 'Der er' (intro) vs 'Det er' (identification).",hvilketOrd:"Which word should I choose?",hvilketOrdDesc:"Practice pronouns and verbs in different contexts.",hanHamHans:"He / Him / His?",gårGikGået:"Go / went / has gone?",verberM3:"Learn Danish Verbs (Present)",hvilketVerbDesc:"Choose a category to practice verbs.",pronominerSubjekt:"Subject (Focus)",pronominerObjekt:"Object (Non-focus)",pronominerPossessiv:"Possessive (Owner)",verberBevaegelse:"Movement (go, drive, come)",verberHandling:"Action (do, make, use)",verberHjaelpe:"Helping Verbs (can, must, will)",verberTilstand:"State & Possession (be, have)",verberInteraktion:"Social Interaction (say, ask)",verberIndreLiv:"Inner Life (see, think, know)",verberDatid:"Past Tense (irregular)",verberDatidRegelm:"Past Tense (regular)",verberTider:"Past vs. Present Perfect (The Point & The Bridge)",hintPronominer:"Check who is in focus or who owns something.",howToBuildSentence:"How to build a sentence?",howToBuildSentenceDesc:"Learn how words are anchored to reality.",groundingIntro:"Without grammar, words float freely like balloons. We use grammar to anchor them to reality (HERE AND NOW).",groundingStep1:"1. The Concept (Balloon): 'Child' is just an idea. We don't know which child.",groundingStep2:"2. The Action: 'To eat' is just an idea. We don't know when.",groundingStep3:"3. The Anchor: Use small words (determiners) and tense (inflection) to pull the balloons down.",sentenceGround:"The ground of reality",wellDone:"Well done! You have now built a sentence anchored in reality.",conjExpl_fordi:"The arrow moves from left to right to point at the <strong>cause</strong> (why is the child eating?).",conjExpl_derfor:"The arrow moves from right to left to point <strong>back</strong> to the cause in the first sentence.",conjExpl_da:"The clock moves left to show that something happened once in the <strong>past</strong>.",conjExpl_naar:"The clock moves right to show a <strong>future</strong> action or something that happens <strong>every time</strong> (habit).",conjExpl_selvom:"The obstacle must split because the 'concession' (selvom) lets the action happen <strong>despite resistance</strong>.",conjExpl_alligevel:"The arrow moves undeterred <strong>through</strong> the obstacle to show that the action happens despite everything.",conjExpl_men:"The arc over the obstacle shows a shift or a <strong>contrast</strong> between two different thoughts.",conjFordi:"because",conjNaar:"when",conjDa:"when (past)",conjSelvom:"although",conjAlligevel:"nevertheless",conjMen:"but",conjDerfor:"Therefore",conjunctionPracticeLink:"Conjunctions - but, because, and when",conjunctionClosingReflection:"Now you have seen how we use grammar to construct and articulate our perception of reality.",adjFeedback1:"Here it is simply a description of one thing (the bird).",adjFeedback2:"Here two people are being compared.",adjFeedback3:"Here one tree is emphasized over all the others.",adjFeedback4:"Here it is a description of multiple things (the apples).",adjFeedback5:"Here a specific child is being described.",adjFeedback6:"Here the size of two things is being compared.",adjFeedback7:"Here it is simply a description of one thing (the smile).",adjFeedback8:"Here one day is emphasized over all others.",adjFeedback9:"Here some specific flowers are being described.",adjFeedback10:"Here it is simply a description of one thing (the grass).",exerciseSetCounter:"Set {n} / {total}",adjComparisonTitle:"Adjectives - big / bigger / biggest",adjComparisonDesc:"How do we compare things? Click on the trees to see how adjectives are inflected in degrees.",positiveLabel:"Positive",comparativeLabel:"Comparative",superlativeLabel:"Superlative",verbExerciseSubtitle:"Conjugate verbs in present and past tense.",advChoiceTitle:"Maybe / well / not",advChoiceDesc:"Practice using key adverbs in different sentences.",soedSoedereSoedest:"Adjectives - big / bigger / biggest",nextPhase:"Next phase →",nextExercise:"Next exercise →",nextCategory:"Next category →",next:"Next →",filled:"filled",correct:"correct",filledProgress:"{n} / {total} filled",correctProgress:"{n} / {total} correct",selectAnchor:"Select anchor...",selectTense:"Select tense...",tenseNow:"(now)",tensePast:"(yesterday)",tenseFuture:"(later)",pastTense:"Past Tense",presentTense:"Present Tense",futureTense:"Future Tense",groundingRelation:"Mit barn (relation)",groundingIndefinite:"Et barn (indefinite)",groundingDistal:"Det barn (distal/pointing)",groundingProximal:"Dette barn (proximal/nearness)",dragInstruction:"Drag the words to the ground to build your sentence.",sentenceLabel:"Sentence:",finishBtn:"Finish and go back",modalTeaserTitle:"Want to practice more?",modalTeaserText:"Sentence built... but who is in control? Is there an invisible force between the child and the food?",modalVerbLabel:"Modal verbs (invisible force)",bestemthedLabel:"Definiteness - En / et",pronomenLabel:"Pronouns - He/Him/His",verberLabel:"Verbs - Go/went/gone",groundingSuccess:"Great! See the animation below.",groundingFinalMsg:"Great! You have now built a sentence that is anchored in reality.",modalForceTitle:"Modal Verbs: the invisible force",modalForceSubtitle:`Modal verbs don't change the action, but they change the "force" behind it.`,modalForceSkal:"<strong>SKAL (social force):</strong> An external force or an unavoidable plan pushes the child towards the action. There is no way around it.",modalForceMaa:'<strong>MÅ (removal of barrier):</strong> The way is blocked, but the modal verb "må" removes the barrier and gives permission.',modalForceVil:"<strong>VIL (internal desire):</strong> The force comes from within the child. It is a wish or a will that pulls in the direction of the food.",modalForceKan:"<strong>KAN (ability/potential):</strong> The child has the energy and ability to perform the action. It is an internal resource.",modalPracticeLabel:"Modal verbs: kan, vil, skal and må",modalForcePlaceholder:"Select a modal verb to see the force",whyConjugateFirst:"Why do we only conjugate the first word? ↓",whyConjugateAdjectives:"Why do we conjugate adjectives? ↓",noun:"Noun",adjective:"Adjective",verb:"Verb",adverb:"Adverb",conjunction:"Conjunction",handlingLabel:"Action",projektørLabel:"Projector",sentenceNode1:"Sentence 1",sentenceNode2:"Sentence 2",example:"Example:",exampleBarn:"Child (Et)",exampleBil:"Car (En)",advLangsomt:"slowly",advHurtigt:"quickly",advMeget:"very",advLidt:"little",positiveLabelSimple:"Base form",comparativeLabelSimple:"Higher degree",superlativeLabelSimple:"Highest degree",comparisonBubbleComp:"It is <strong>more</strong> than the first one!",comparisonBubbleSuper:"It is <strong>most</strong> of all!",practiceMoreInflections:"Practice more with inflections"},de:{selectLanguage:"Sprache auswählen",title:"Dänisch Training",subtitle:"Wählen Sie eine Kategorie, um Ihr Training zu starten.",dagensOpgave:"Tägliche Aufgabe",dagensOpgaveDesc:"Neues Thema, neue Grammatik. Lösen Sie die Aufgabe!",modulTest:"Modultest-Training",modulTestDesc:"Verschiedene Aufgaben an einem Ort gesammelt.",notes:"Unterrichtsnotizen",notesDesc:"Lesen und üben Sie Notizen aus dem Unterricht.",lavSporgsmal:"Fragen stellen",lavSporgsmalDesc:"Lernen Sie, präzise Fragen anhand von Bildern zu stellen.",lavSporgsmalBtnText:"Fragen stellen - hier klicken",samtaleTraening:"Konversationstraining",samtaleTraeningDesc:"Üben Sie Konversationen und erhalten Sie Hilfe bei Ihrem Dänisch.",skriveHjaelp:"Schreibhilfe",skriveHjaelpDesc:"Fügen Sie Ihren Text ein und erhalten Sie Feedback ohne Antworten.",back:"Zurück",enterPassword:"Passwort eingeben, um den Inhalt anzuzeigen:",du1mod3:"DU1, Modul 3 und 4",du2mod1:"DU2, Modul 1",smaahistorier:"Kurzgeschichten",du2mod5:"DU2, Modul 5",emailLaan:"E-Mail über Kredit",opdragelse:"Geschichte über Erziehung",enKlage:"Eine Beschwerde",du3mod4:"DU3, Modul 4",laerEtNytOrd:"Ein neues Wort lernen",laerEtNytOrdDesc:"Entdecken Sie, wie Wörter in Netzwerken verbunden sind.",wordNetworkExplanation:"Wörter sind mit anderen Wörtern verbunden. Es hilft Ihnen, das Wort viel besser zu merken, wenn Sie wissen, wie das Wort mit anderen Wörtern verbunden ist.",targetWord:"Hund",hypernym:"Oberbegriff",hypernymWord:"Tier",synonym:"Synonym",synonymWord:"Hündchen",antonym:"Antonym",antonymWord:"Katze",hyponym:"Unterbegriff",hyponymWord:"Pudel",geminiBtnText:"Ein Wort lernen - hier klicken",geminiConsentText:"Durch Klicken auf diesen Link stimmen Sie zu, dass Sie ein Google-Produkt verwenden und dass Google künstliche Intelligenz mit Ihren Antworten trainiert.",hverdagssamtale:"Alltagskonversation",hverdagssamtaleDesc:"Üben Sie alltägliche Gespräche.",samtaleBolig:"Gespräch über Wohnen",samtaleArbejde:"Gespräch über Arbeit",samtaleBtnText:"Konversation starten - hier klicken",skriveHjaelpBtnText:"Schreibhilfe - hier klicken",du1mod3Desc:"Wählen Sie ein Thema zum Üben.",minHverdag:"Mein Alltag",minBolig:"Meine Wohnung",mitArbejde:"Meine Arbeit",minHverdagDesc:"Aufgaben zu Ihrem täglichen Leben.",transportSprogskole:"Transport zur Sprachschule",madlavning:"Kochen",rengoering:"Reinigung",transportDesc:"Wie kommen Sie zur Schule?",padletDesc:"Teilen Sie mit der Klasse, wie Sie heute zur Sprachschule kommen.",padletBtnText:"Padlet öffnen",madlavningDesc:"Welche Art von Essen kochen Sie gerne?",madlavningPadletDesc:"Teilen Sie hier Ihre Kocherlebnisse mit der Klasse.",rengoeringDesc:"Wie reinigen Sie?",rengoeringPadletDesc:"Teilen Sie Ihre Gedanken zur Reinigung mit der Klasse.",traenTidsudtryk:"Zeitangaben üben",traenTidsudtrykDesc:"Wie verwendet man verschiedene Zeitangaben im Dänischen?",traenTidsudtrykBtnText:"Zeitangaben-Übung öffnen",ordstilling:"Wortstellung",ordstillingDesc:"Ordnen Sie die Wörter neu an und bringen Sie sie in die richtige Reihenfolge.",checkResult:"Antwort überprüfen",correctOrder:"Großartig! Die Reihenfolge ist richtig.",wrongOrder:"Nicht ganz richtig. Versuchen Sie es noch einmal!",ordstillingLet:"Wortstellung (Leicht)",ordstillingSvaer:"Wortstellung (Mittel)",levelA1:"A1 Sätze",levelA2:"A2 Sätze",traenGrammatik:"Grammatik üben",grammatikDesc:"Füllen Sie die Lücken im Text mit den richtigen Wörtern aus.",let:"Leicht (A1)",mellemsvaer:"Mittel (A2)",svaer:"Schwer (B1)",modultest:"Modultest",modultestLongDesc:"Ein längerer 10-zeiliger Text. Finden Sie die richtigen Wörter in der Liste und füllen Sie die Lücken aus.",grammatikIntro:"Wählen Sie ein Niveau, um die Übung zu starten.",checkAnswers:"Alle Antworten überprüfen",allCorrect:"Fantastisch! Alle Antworten sind richtig.",someWrong:"Einige Ihrer Antworten sind nicht ganz richtig. Versuchen Sie es noch einmal!",newExercise:"Nächster Text",hintMean:"Dieses Wort ergibt in diesem Kontext keinen Sinn.",hintTense:"Überprüfen Sie die Zeitform. Ist es Präsens oder Präteritum?",hintForm:"Überprüfen Sie die Wortform (z.B. Geschlecht oder Singular/Plural).",hintPerson:"Überprüfen Sie, wer die Handlung ausführt (ich, du, er/sie).",hintContext:"Lesen Sie den gesamten Text noch einmal. Was passt hier am besten?",hintName:"Hier benötigen Sie ein Wort für Namen.",hintPlace:"Hier benötigen Sie ein Wort für Orte.",hintAction:"Dieses Wort beschreibt eine andere Handlung.",hintAdj:"Überprüfen Sie das Adjektiv (Beschreibung einer Sache).",hintAdverb:"Überprüfen Sie das Adverb (Zeit, Ort oder Art und Weise).",derErDetEr:"Der er / Det er?",derErExpl:"'Der er' öffnet die Tür für neue Informationen. 'Det er' verweist auf das, was wir kennen.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Merke: 'Der er' (Einführung) vs 'Det er' (Identifikation).",hvilketOrd:"Welches Wort soll ich wählen?",hvilketOrdDesc:"Üben Sie Pronomen und Verben in verschiedenen Kontexten.",hanHamHans:"Er / ihn / sein?",gårGikGået:"Gehen / ging / gegangen?",verberM3:"Dänische Verben lernen (Präsens)",hvilketVerbDesc:"Wählen Sie eine Kategorie, um Verben zu üben.",pronominerSubjekt:"Subjekt (Fokus)",pronominerObjekt:"Objekt (Nicht-Fokus)",pronominerPossessiv:"Possessiv (Besitzer)",verberBevaegelse:"Bewegung (gehen, fahren, kommen)",verberHandling:"Handlung (tun, machen, benutzen)",verberHjaelpe:"Hilfsverben (können, sollen, wollen)",verberTilstand:"Zustand & Besitz (sein, haben)",verberInteraktion:"Soziale Interaktion (sagen, fragen)",verberIndreLiv:"Inneres Leben (sehen, denken, wissen)",verberDatid:"Vergangenheit (unregelmäßig)",verberTider:"Vergangenheit vs. Perfekt (Der Punkt & Die Brücke)",hintPronominer:"Überprüfen Sie, wer im Fokus steht oder wem etwas gehört.",groundingSuccess:"Toll! Siehe die Animation unten.",groundingFinalMsg:"Toll! Sie haben jetzt einen Satz gebaut, der in der Realität verankert ist.",modalForceTitle:"Modalverben: die unsichtbare Kraft",modalForceSubtitle:'Modalverben ändern nicht die Handlung, aber sie ändern die "Kraft" dahinter.',modalForceSkal:"<strong>SKAL (soziale Kraft):</strong> Eine äußere Kraft oder ein unvermeidlicher Plan drängt das Kind zur Handlung. Es führt kein Weg daran vorbei.",modalForceMaa:'<strong>MÅ (Aufhebung einer Barriere):</strong> Der Weg ist versperrt, aber das Modalverb "må" hebt die Barriere auf und gibt die Erlaubnis.',modalForceVil:"<strong>VIL (innerer Wunsch):</strong> Die Kraft kommt aus dem Kind selbst. Es ist ein Wunsch oder ein Wille, der in Richtung des Essens zieht.",modalForceKan:"<strong>KAN (Fähigkeit/Potenzial):</strong> Das Kind hat die Energie und die Fähigkeit, die Handlung auszuführen. Es ist eine innere Ressource.",modalPracticeLabel:"Modalverben: kan, vil, skal und må",howToBuildSentence:"Wie baut man einen Satz?",howToBuildSentenceDesc:"Lernen Sie, wie Wörter in der Realität verankert werden.",groundingIntro:"Ohne Grammatik schweben Wörter frei wie Ballons. Wir verwenden Grammatik, um sie in der Realität (HIER UND JETZT) zu verankern.",groundingStep1:"1. Das Konzept (Ballon): 'Kind' ist nur eine Idee. Wir wissen nicht, welches Kind.",groundingStep2:"2. Die Handlung: 'Essen' ist nur eine Idee. Wir wissen nicht, wann.",groundingStep3:"3. Der Anker: Verwenden Sie kleine Wörter (Artikel) und Zeit (Beugung), um die Ballons herunterzuziehen.",sentenceGround:"Der Boden der Realität",wellDone:"Gut gemacht! Sie haben nun einen Satz gebaut, der in der Realität verankert ist.",finitenessTitle:"Warum beugen wir nur das erste Wort?",finitenessDesc:"Das erste Wort (das Modalverb) platziert den Satz zeitlich auf der Zeitachse. Das nächste Wort konzentriert sich nur auf die Handlung selbst.",timelineLabel:"Die Zeitachse (Hier wird die Kraft verankert)",actionLabel:"Die Handlung (Die Aktivität selbst)",nowLabel:"Gegenwart (Jetzt)",pastLabel:"Vergangenheit (Damals)",finitenessExpl:"Beachten Sie: Nur das erste Wort bewegt sich auf der Zeitachse. Die Handlung (essen) ist unabhängig von der Zeit dieselbe.",adjectiveTitle:"Was für ein Kind?",adjectiveDesc:"Adjektive sind wie ein Scheinwerfer, der ein Wort beleuchtet und ihm mehr Farbe oder Details verleiht.",adjectiveLabel:"Der Scheinwerfer (Detail)",adjectiveExpl:"Beachten Sie: Die Form des Adjektivs ändert sich je nach dem Wort davor (Et stort / Mit store).",nextStepAdjective:"Nächste Übung: Adjektive ↓",adjectiveTeaser:"Wie können wir das Kind beschreiben? Also, wie können wir die Welt um uns herum beschreiben?",agreementTitle:"Was bestimmt die Beugung?",agreementDesc:"Das Substantiv bestimmt, welche Endung das Adjektiv haben soll.",ubestemtLabel:"Unbestimmt (Ein / Eine)",bestemtLabel:"Bestimmt (Das / Die)",agreementExpl:"Wenn wir über etwas <strong>Bestimmtes</strong> sprechen, fügen wir ein <strong>-e</strong> hinzu. Umgekehrt bestimmt <em>Et barn</em>, dass ein <strong>-t</strong> angehängt werden muss (et stort barn).",exampleBarn:"Kind",exampleBil:"Auto",practiceMoreTitle:"Möchten Sie mehr üben?",adjectiveComparisonLink:"Adjektiver - stor / større / størst",adverbTeaser:"Wie beschreiben wir eine HANDLUNG? Also, wie können wir die Art und Weise beschreiben, wie wir Dinge tun?",nextStepAdverb:"Nächste Übung: Adverbien ↓",adverbTitle:"Wie beschreiben wir eine Handlung?",adverbDesc:"Das Adverb sagt uns etwas darüber, wie die Handlung (das Verb) ausgeführt wird.",adverbExpl:"Beachten Sie, wie das gewählte Wort die <em>Art und Weise</em> beschreibt, wie das Kind isst. Es verleiht der Handlung Leben und Details!",nextStepAfterAdverb:"Nächster Schritt: Konjunktionen ↓",adverbTeaserNext:"Wie können wir zwei Gedanken verbinden? Schauen wir uns Konjunktionen an.",conjunctionTitle:"Warum verbinden wir Sätze?",conjunctionDesc:"Konjunktionen sind wie Klebstoff, der zwei Gedanken miteinander verbindet und Dynamik und Fluss erzeugt.",conjunctionExpl:"Beachten Sie, wie das kleine Wort (die Konjunktion) den Fluss zwischen Ihren Gedanken verändert.",conjunctionTeaser:"Was passiert, wenn wir zwei Dinge zusammenfügen? Können wir erklären, warum, wann oder trotz etwas?",sentence2_fordi:"es hungrig ist",sentence2_naar:"die Sonne scheint",sentence2_da:"es dunkel wurde",sentence2_selvom:"es nicht darf",sentence2_alligevel:"es schwierig ist",sentence2_men:"es ist bald fertig",sentence2_derfor:"ist der Teller leer",conjExpl_fordi:"Der Pfeil bewegt sich von links nach rechts, um auf die <strong>Ursache</strong> zu zeigen (warum isst das Kind?).",conjExpl_derfor:"Der Pfeil bewegt sich von rechts nach links, um <strong>zurück</strong> auf die Ursache im ersten Satz zu zeigen.",conjExpl_da:"Die Uhr bewegt sich nach links, um zu zeigen, dass etwas einmal in der <strong>Vergangenheit</strong> geschah.",conjExpl_naar:"Die Uhr bewegt sich nach rechts, um eine <strong>zukünftige</strong> Handlung oder etwas zu zeigen, das <strong>jedes Mal</strong> passiert (Gewohnheit).",conjExpl_selvom:"Das Hindernis muss sich teilen, weil die 'Einräumung' (selvom) die Handlung <strong>trotz Widerstand</strong> geschehen lässt.",conjExpl_alligevel:"Der Pfeil bewegt sich unverdrossen <strong>durch</strong> das Hindernis, um zu zeigen, dass die Handlung trotz allem geschieht.",conjExpl_men:"Der Bogen über dem Hindernis zeigt einen Wechsel oder einen <strong>Gegensatz</strong> zwischen zwei verschiedenen Gedanken.",conjFordi:"weil",conjNaar:"wenn",conjDa:"als",conjSelvom:"obwohl",conjAlligevel:"trotzdem",conjMen:"aber",conjDerfor:"Deshalb",conjunctionPracticeLink:"Konjunktionen - aber, weil und wenn",conjunctionClosingReflection:"Nun haben Sie gesehen, wie wir mit Grammatik unsere Wahrnehmung der Realität konstruieren und ausdrücken können.",adjFeedback1:"Hier ist es einfach eine Beschreibung einer Sache (der Vogel).",adjFeedback2:"Hier werden zwei Personen verglichen.",adjFeedback3:"Hier wird ein Baum gegenüber allen anderen hervorgehoben.",adjFeedback4:"Hier ist es eine Beschreibung von mehreren Dingen (die Äpfel).",adjFeedback5:"Hier wird ein bestimmtes Kind beschrieben.",adjFeedback6:"Hier wird die Größe von zwei Dingen verglichen.",adjFeedback7:"Hier ist es einfach eine Beschreibung einer Sache (das Lächeln).",adjFeedback8:"Hier wird ein Tag gegenüber allen anderen Tagen hervorgehoben.",adjFeedback9:"Hier werden einige bestimmte Blumen beschrieben.",adjFeedback10:"Hier ist es einfach eine Beschreibung einer Sache (das Gras).",exerciseSetCounter:"Satz {n} / {total}",nextStepAfterConjunction:"Übung beenden",adjComparisonTitle:"Adjektiver - stor / større / størst",adjComparisonDesc:"Wie vergleichen wir Dinge? Klicken Sie auf die Bäume, um zu sehen, wie Adjektive in Graden gebeugt werden.",positiveLabel:"Positiv",comparativeLabel:"Komparativ",superlativeLabel:"Superlativ",verbExerciseSubtitle:"Verben im Präsens und Präteritum konjugieren.",advChoiceTitle:"Vielleicht / gut / nicht",advChoiceDesc:"Üben Sie die Verwendung wichtiger Adverbien in verschiedenen Sätzen.",nextPhase:"Nächste Phase →",nextExercise:"Nächste Aufgabe →",nextCategory:"Nächste Kategorie →",next:"Weiter →",filled:"ausgefüllt",correct:"korrekt",filledProgress:"{n} / {total} ausgefüllt",correctProgress:"{n} / {total} korrekt",selectAnchor:"Anker wählen...",selectTense:"Zeitform wählen...",tenseNow:"(jetzt)",tensePast:"(gestern)",tenseFuture:"(später)",pastTense:"Vergangenheit",presentTense:"Gegenwart",futureTense:"Zukunft",groundingRelation:"Mit barn (Beziehung)",groundingIndefinite:"Et barn (unbestimmt)",groundingDistal:"Det barn (Zeigen)",groundingProximal:"Dette barn (Nähe)",dragInstruction:"Ziehen Sie die Wörter auf den Boden, um Ihren Satz zu bauen.",sentenceLabel:"Satz:",finishBtn:"Beenden und zurück",modalTeaserTitle:"Möchten Sie mehr üben?",modalTeaserText:"Satz gebaut... aber wer hat die Kontrolle? Gibt es eine unsichtbare Kraft zwischen dem Kind und dem Essen?",modalVerbLabel:"Modalverber (unsichtbare Kraft)",bestemthedLabel:"Bestemthed - En / et",pronomenLabel:"Pronominer - Han/Ham/Hans",verberLabel:"Verber - Går/gik/gået",groundingSuccess:"Super! Sehen Sie sich die Animation unten an.",modalForcePlaceholder:"Wählen Sie ein Modalverb, um die Kraft zu sehen",whyConjugateFirst:"Warum beugen wir nur das erste Wort? ↓",whyConjugateAdjectives:"Warum beugen wir Adjektive? ↓",noun:"Substantiv",adjective:"Adjektiv",verb:"Verb",adverb:"Adverb",conjunction:"Konjunktion",handlingLabel:"Handlung",projektørLabel:"Projektor",sentenceNode1:"Satz 1",sentenceNode2:"Satz 2",example:"Beispiel:",exampleBarn:"Kind (Et)",exampleBil:"Auto (En)",advLangsomt:"langsam",advHurtigt:"schnell",advMeget:"sehr",advLidt:"wenig",positiveLabelSimple:"Grundform",comparativeLabelSimple:"Höhere Stufe",superlativeLabelSimple:"Höchste Stufe",comparisonBubbleComp:"Es ist <strong>mehr</strong> als das erste!",comparisonBubbleSuper:"Es ist am <strong>meisten</strong> von allen!",practiceMoreInflections:"Mehr mit Beugungen üben"},ar:{selectLanguage:"اختر لغة",title:"التدريب على الدنماركية",subtitle:"اختر فئة لبدء التدريب الخاص بك.",dagensOpgave:"المهمة اليومية",dagensOpgaveDesc:"موضوع جديد، قواعد جديدة. حل المهمة!",modulTest:"تدريب اختبار الوحدة",modulTestDesc:"مهام مختلفة مجمعة في مكان واحد.",notes:"ملاحظات التدريس",notesDesc:"اقرأ وتدرب على الملاحظات من الفصل.",lavSporgsmal:"طرح أسئلة",lavSporgsmalDesc:"تعلم طرح أسئلة دقيقة بناءً على الصور.",lavSporgsmalBtnText:"طرح الأسئلة - اضغط هنا",samtaleTraening:"تدريب المحادثة",samtaleTraeningDesc:"تمرن على المحادثات واحصل على مساعدة في الدنماركية.",skriveHjaelp:"مساعدة في الكتابة",skriveHjaelpDesc:"أدخل نصك واحصل على ملاحظات بدون إجابات.",back:"رجوع",du1mod3:"DU1، الوحدة 3 و 4",du2mod1:"DU2، الوحدة 1",du3mod4:"DU3، الوحدة 4",laerEtNytOrd:"تعلم كلمة جديدة",laerEtNytOrdDesc:"استكشف كيف ترتبط الكلمات في شبكات.",wordNetworkExplanation:"الكلمات مرتبطة بكلمات أخرى. يساعدك ذلك على تذكر الكلمة بشكل أفضل عندما تعرف كيف ترتبط الكلمة بكلمات أخرى.",targetWord:"كلب",hypernym:"مفهوم شامل (Hypernym)",hypernymWord:"حيوان",synonym:"مرادف",synonymWord:"كلب صغير",antonym:"مضاد",antonymWord:"قطة",hyponym:"مفهوم فرعي (Hyponym)",hyponymWord:"بودل",geminiBtnText:"تعلم كلمة - اضغط هنا",geminiConsentText:"بالنقر على هذا الرابط، فإنك توافق على استخدامك لمنتج من Google وأن Google تقوم بتدريب الذكاء الاصطناعي باستخدام إجاباتك.",hverdagssamtale:"محادثة يومية",hverdagssamtaleDesc:"تدرب على المحادثات اليومية الشائعة.",samtaleBolig:"محادثة حول السكن",samtaleArbejde:"محادثة حول العمل",samtaleBtnText:"ابدأ المحادثة - اضغط هنا",skriveHjaelpBtnText:"مساعدة في الكتابة - اضغط هنا",du1mod3Desc:"اختر موضوعًا للتدرب عليه.",minHverdag:"حياتي اليومية",minBolig:"سكني",mitArbejde:"عملي",minHverdagDesc:"مهام حول حياتك اليومية.",transportSprogskole:"النقل إلى مدرسة اللغة",madlavning:"طبخ",rengoering:"تنظيف",transportDesc:"كيف تذهب إلى المدرسة؟",padletDesc:"شارك مع الفصل كيف تذهب إلى مدرسة اللغة اليوم.",padletBtnText:"افتح بادليت",madlavningDesc:"ما نوع الطعام الذي تحب طهيه؟",madlavningPadletDesc:"شارك تجارب الطبخ الخاصة بك مع الفصل هنا.",rengoeringDesc:"كيف تنظف؟",rengoeringPadletDesc:"شارك أفكارك حول التنظيف مع الفصل.",traenTidsudtryk:"تدريب تعبيرات الوقت",traenTidsudtrykDesc:"كيف تستخدم تعبيرات الوقت المختلفة باللغة الدنماركية؟",traenTidsudtrykBtnText:"افتح تمرين تعبيرات الوقت",ordstilling:"ترتيب الكلمات",ordstillingDesc:"قم بإعادة ترتيب الكلمات ووضعها في الترتيب الصحيح.",checkResult:"تحقق من الإجابة",correctOrder:"رائع! الترتيب صحيح.",wrongOrder:"ليس تماماً. حاول مرة أخرى!",ordstillingLet:"ترتيب الكلمات (سهل)",ordstillingSvaer:"ترتيب الكلمات (صعب)",levelA1:"جمل A1",levelA2:"جمل A2",traenGrammatik:"تدريب القواعد",grammatikDesc:"املاً الفراغات بالكلمات الصحيحة في النص.",let:"سهل (A1)",mellemsvaer:"متوسط (A2)",svaer:"صعب (B1)",grammatikIntro:"اختر مستوى لبدء التمرين.",checkAnswers:"تحقق من جميع الإجابات",allCorrect:"رائع! جميع الإجابات صحيحة.",someWrong:"بعض إجاباتك ليست صحيحة تمامًا. حاول مرة أخرى!",newExercise:"النص التالي",hintMean:"هذه الكلمة لا معنى لها في هذا السياق.",hintTense:"تحقق من الزمن. هل هو مضارع أم ماضٍ؟",hintForm:"تحقق من صيغة الكلمة (مثل الجنس أو المفرد/الجمع).",hintPerson:"تحقق من يقوم بالفعل (أنا، أنت، هو/هي).",hintContext:"اقرأ النص بالكامل مرة أخرى. ما هو الأنسب هنا؟",hintName:"أنت بحاجة إلى كلمة للأسماء هنا.",hintPlace:"أنت بحاجة إلى كلمة للأماكن هنا.",hintAction:"هذه الكلمة تصف فعلاً مختلفاً.",hintAdj:"تحقق من الصفة (وصف لشيء ما).",hintAdverb:"تحقق من الظرف (الزمان أو المكان أو الطريقة).",hintConj:"تحقق من حرف العطف (يربط بين جملتين).",filled:"تمت تعبئته",verbExerciseSubtitle:"صرف الأفعال في المضارع والماضي.",advChoiceTitle:"ربما / جيداً / لا",advChoiceDesc:"تدرب على استخدام الظروف الرئيسية في جمل مختلفة.",nextPhase:"المرحلة التالية ←",nextExercise:"التمرين التالي ←",nextCategory:"الفئة التالية ←",next:"التالي ←",filled:"مكتمل",correct:"صحيح",filledProgress:"{n} / {total} مكتمل",correctProgress:"{n} / {total} صحيح",selectAnchor:"اختر المرساة...",selectTense:"اختر الزمن...",tenseNow:"(الآن)",tensePast:"(أمس)",tenseFuture:"(لاحقاً)",pastTense:"الماضي",presentTense:"الحاضر",futureTense:"المستقبل",groundingRelation:"Mit barn (العلاقة)",groundingIndefinite:"Et barn (نكرة)",groundingDistal:"Det barn (الإشارة)",groundingProximal:"Dette barn (القرب)",pastTense:"الماضي",presentTense:"الحاضر",futureTense:"المستقبل",groundingRelation:"Mit barn (العلاقة)",groundingIndefinite:"Et barn (نكرة)",groundingDistal:"Det barn (الإشارة)",groundingProximal:"Dette barn (القرب)",dragInstruction:"اسحب الكلمات إلى الأرض لبناء جملتك.",sentenceLabel:"جملة:",finishBtn:"إنهاء والعودة",modalTeaserTitle:"هل تريد التدرب أكثر؟",modalTeaserText:"تم بناء الجملة... ولكن من المسيطر حقاً؟ هل هناك قوة غير مرئية بين الطفل والطعام؟",modalVerbLabel:"الأفعال المساعدة (قوة غير مرئية)",bestemthedLabel:"التعريف - En / et",pronomenLabel:"الضمائر - Han/Ham/Hans",verberLabel:"الأفعال - Går/gik/gået",groundingSuccess:"رائع! شاهد الرسوم المتحركة أدناه.",groundingFinalMsg:"رائع! لقد قمت الآن ببناء جملة متجذرة في الواقع.",modalForceTitle:"الأفعال المساعدة: القوة غير المرئية",modalForceSubtitle:'الأفعال المساعدة لا تغير الفعل، لكنها تغير "القوة" الكامنة وراءه.',modalForceSkal:"<strong>SKAL (قوة اجتماعية):</strong> قوة خارجية أو خطة لا مفر منها تدفع الطفل نحو الفعل. لا يوجد مفر من ذلك.",modalForceMaa:'<strong>MÅ (إزالة الحاجز):</strong> الطريق مسدود، لكن الفعل المساعد "må" يزيل الحاجز ويعطي الإذن.',modalForceVil:"<strong>VIL (رغبة داخلية):</strong> تأتي القوة من داخل الطفل نفسه. إنها رغبة أو إرادة تجذب في اتجاه الطعام.",modalForceKan:"<strong>KAN (قدرة/إمكانية):</strong> الطفل لديه الطاقة والقدرة على القيام بالفعل. إنه مورد داخلي.",modalPracticeLabel:"الأفعال المساعدة: kan و vil و skal و må",modalForcePlaceholder:"اختر فعلاً مساعداً لرؤية القوة",whyConjugateFirst:"لماذا نصرف الكلمة الأولى فقط؟ ↓",whyConjugateAdjectives:"لماذا نصرف الصفات؟ ↓",noun:"اسم",adjective:"صفة",verb:"فعل",adverb:"ظرف",conjunction:"حرف عطف",handlingLabel:"عمل",projektørLabel:"جهاز عرض",sentenceNode1:"الجملة 1",sentenceNode2:"الجملة 2",example:"مثال:",exampleBarn:"طفل (Et)",exampleBil:"سيارة (En)",advLangsomt:"ببطء",advHurtigt:"بسرعة",advMeget:"جداً",advLidt:"قليلاً",positiveLabelSimple:"الصيغة الأساسية",comparativeLabelSimple:"درجة أعلى",superlativeLabelSimple:"أعلى درجة",comparisonBubbleComp:"إنها <strong>أكثر</strong> من الأولى!",comparisonBubbleSuper:"إنها <strong>الأكثر</strong> على الإطلاق!",conjExpl_fordi:"يتحرك السهم من اليسار إلى اليمين للإشارة إلى <strong>السبب</strong> (لماذا يأكل الطفل؟).",conjExpl_derfor:"يتحرك السهم من اليمين إلى اليسار ليشير <strong>إلى الوراء</strong> إلى السبب في الجملة الأولى.",conjExpl_da:"تتحرك الساعة إلى اليسار لتظهِر أن شيئاً ما حدث مرة واحدة في <strong>الماضي</strong>.",conjExpl_naar:"تتحرك الساعة إلى اليمين لتظهِر فعلاً <strong>مستقبلياً</strong> أو شيئاً يحدث <strong>في كل مرة</strong> (عادة).",conjExpl_selvom:"يجب أن ينقسم العائق لأن 'التنازل' (selvom) يسمح بحدوث الفعل <strong>على الرغم من المقاومة</strong>.",conjExpl_alligevel:"يتحرك السهم دون رادع <strong>عبر</strong> العائق ليظهِر أن الفعل يحدث على الرغم من كل شيء.",conjExpl_men:"تظهِر القوس فوق العائق تحولاً أو <strong>تناقضاً</strong> بين فكرتين مختلفتين.",conjFordi:"لأن",conjNaar:"عندما",conjDa:"عندما (ماضي)",conjSelvom:"على الرغم من",conjAlligevel:"مع ذلك",conjMen:"لكن",conjDerfor:"لذلك",adjFeedback1:"هنا مجرد وصف لشيء واحد (العصفور).",adjFeedback2:"هنا تتم مقارنة شخصين.",adjFeedback3:"هنا يتم إبراز شجرة واحدة عن بقية الأشجار.",adjFeedback4:"هنا وصف لعدة أشياء (التفاح).",adjFeedback5:"هنا يتم وصف طفل محدد.",adjFeedback6:"هنا تتم مقارنة الحجم بين شيئين.",adjFeedback7:"هنا مجرد وصف لشيء واحد (الابتسامة).",adjFeedback8:"هنا يتم إبراز يوم واحد عن بقية الأيام.",adjFeedback9:"هنا يتم وصف أزهار محددة.",adjFeedback10:"هنا مجرد وصف لشيء واحد (العشب).",exerciseSetCounter:"مجموعة {n} / {total}",practiceMoreInflections:"تدرب أكثر على التصريفات"},ur:{selectLanguage:"زبان منتخب کریں",title:"دانش کی تربیت",subtitle:"تربیت شروع کرنے کے لیے ایک زمرہ منتخب کریں۔",dagensOpgave:"آج کا کام",dagensOpgaveDesc:"نیا موضوع، نئی گرامر۔ کام حل کریں!",modulTest:"ماڈیول ٹیسٹ کی تربیت",modulTestDesc:"مختلف کام ایک ہی جگہ پر جمع ہیں۔",notes:"تدریسی نوٹس",notesDesc:"کلاس کے نوٹس پڑھیں اور ان کی مشق کریں۔",lavSporgsmal:"سوالات بنائیں",lavSporgsmalDesc:"تصاویر کی بنیاد پر درست سوالات پوچھنا سیکھیں۔",lavSporgsmalBtnText:"سوالات بنائیں - یہاں کلک کریں",samtaleTraening:"گفتگو کی تربیت",samtaleTraeningDesc:"اپنی گفتگو کی مشق کریں اور اپنی دانش میں مدد حاصل کریں۔",skriveHjaelp:"لکھنے میں مدد",skriveHjaelpDesc:"اپنا متن درج کریں اور جوابات کے بغیر فیڈ بیک حاصل کریں۔",back:"واپس",du1mod3:"DU1، ماڈیول 3 اور 4",du2mod1:"DU2، ماڈیول 1",du3mod4:"DU3، ماڈیول 4",laerEtNytOrd:"ایک نیا لفظ سیکھیں",laerEtNytOrdDesc:"دریافت کریں کہ الفاظ نیٹ ورکس میں کیسے جڑے ہوئے ہیں۔",wordNetworkExplanation:"الفاظ دوسرے الفاظ سے جڑے ہوتے ہیں۔ جب آپ کو معلوم ہو کہ لفظ دوسرے الفاظ سے کیسے جڑا ہوا ہے تو یہ آپ کو لفظ کو بہت بہتر طریقے سے یاد رکھنے میں مدد دیتا ہے۔",targetWord:"کتا",hypernym:"اعلیٰ تصور",hypernymWord:"جانور",synonym:"مترادف",synonymWord:"کتا (vovse)",antonym:"متضاد",antonymWord:"بلی",hyponym:"ذیلی تصور",hyponymWord:"پوڈل",geminiBtnText:"لفظ سیکھیں - یہاں کلک کریں",geminiConsentText:"اس لنک پر کلک کر کے، آپ گوگل کی مصنوعات استعمال کرنے اور اپنے جوابات کے ذریعے مصنوعی ذہانت کو تربیت دینے پر رضامند ہو رہے ہیں۔",hverdagssamtale:"روزمرہ گفتگو",hverdagssamtaleDesc:"روزمرہ کی عام گفتگو کی مشق کریں۔",samtaleBolig:"رہائش کے بارے میں گفتگو",samtaleArbejde:"کام کے بارے میں گفتگو",samtaleBtnText:"گفتگو شروع کریں - یہاں کلک کریں",skriveHjaelpBtnText:"لکھنے میں مدد - یہاں کلک کریں",du1mod3Desc:"مشق کرنے کے لیے ایک موضوع منتخب کریں۔",minHverdag:"میری روزمرہ زندگی",minBolig:"میری رہائش",mitArbejde:"میرا کام",minHverdagDesc:"آپ کی روزمرہ زندگی کے بارے میں کام۔",transportSprogskole:"اسکول تک آمد و رفت",madlavning:"کھانا پکانا",rengoering:"صفائی",transportDesc:"آپ اسکول کیسے جاتے ہیں؟",padletDesc:"کلاس کے ساتھ شیئر کریں کہ آپ آج اسکول کیسے پہنچے۔",padletBtnText:"Padlet کھولیں",madlavningDesc:"آپ کو کھانا پکانے میں کیا پسند ہے؟",madlavningPadletDesc:"اپنی کھانے کی یادیں کلاس کے ساتھ شیئر کریں۔",rengoeringDesc:"آپ صفائی کیسے کرتے ہیں؟",rengoeringPadletDesc:"صفائی کے بارے میں اپنے خیالات کلاس کے ساتھ شیئر کریں۔",traenTidsudtryk:"وقت کے اظہار کی مشق",traenTidsudtrykDesc:"دانش میں وقت کے مختلف اظہار کیسے استعمال ہوتے ہیں؟",traenTidsudtrykBtnText:"وقت کے اظہار کی مشق کھولیں",ordstilling:"الفاظ کی ترتیب",ordstillingDesc:"الفاظ کو دوبارہ ترتیب دیں اور انہیں صحیح ترتیب میں رکھیں.",checkResult:"جواب چیک کریں",correctOrder:"بہت خوب! ترتیب درست ہے.",wrongOrder:"بالکل درست نہیں. دوبارہ کوشش کریں!",ordstillingLet:"الفاظ کی ترتیب (آسان)",ordstillingSvaer:"الفاظ کی ترتیب (مشکل)",levelA1:"A1 جملے",levelA2:"A2 جملے",traenGrammatik:"گرائمر کی مشق",grammatikDesc:"متن میں خالی جگہوں کو صحیح الفاظ سے پر کریں۔",let:"آسان (A1)",mellemsvaer:"درمیانہ (A2)",svaer:"مشکل (B1)",grammatikIntro:"مشق شروع کرنے کے لیے لیول منتخب کریں۔",checkAnswers:"تمام جوابات چیک کریں",allCorrect:"شاندار! تمام جوابات درست ہیں۔",someWrong:"آپ کے کچھ جوابات بالکل درست نہیں ہیں۔ دوبارہ کوشش کریں!",newExercise:"اگلا متن",hintMean:"اس تناظر میں یہ لفظ معنی نہیں رکھتا.",hintTense:"زمانہ چیک کریں. کیا یہ حال ہے یا ماضی؟",hintForm:"لفظ کی شکل چیک کریں (مثلاً جنس یا واحد/جمع).",hintPerson:"چیک کریں کہ عمل کون کر رہا ہے (میں، آپ، وہ).",hintContext:"پورا متن دوبارہ پڑھیں. یہاں سب سے بہتر کیا ہے؟",hintName:"آپ کو یہاں ناموں کے لیے ایک لفظ کی ضرورت ہے.",hintPlace:"آپ کو یہاں مقامات کے لیے ایک لفظ کی ضرورت ہے.",hintAction:"یہ لفظ ایک مختلف عمل بیان کرتا.",hintAdj:"صفت چیک کریں (کسی چیز کی وضاحت).",hintAdverb:"متعلق فعل چیک کریں (وقت، جگہ یا طریقہ).",hintConj:"حرف عطف چیک کریں (دو جملوں کو جوڑتا ہے).",filled:"بھرا ہوا",verbExerciseSubtitle:"فعل کو حال اور ماضی میں تبدیل کریں۔",advChoiceTitle:"شاید / اچھا / نہیں",advChoiceDesc:"مختلف جملوں میں کلیدی متعلق فعل کے استعمال کی مشق کریں۔",nextPhase:"اگلا مرحلہ ←",nextExercise:"اگلی مشق ←",nextCategory:"اگلا زمرہ ←",next:"اگلا ←",filled:"پر کیا گیا",correct:"درست",filledProgress:"{n} / {total} پر کیا گیا",correctProgress:"{n} / {total} درست",selectAnchor:"اینکر منتخب کریں...",selectTense:"زمانہ منتخب کریں...",tenseNow:"(ابھی)",tensePast:"(کل)",tenseFuture:"(بعد میں)",pastTense:"ماضی",presentTense:"حال",futureTense:"مستقبل",groundingRelation:"Mit barn (تعلق)",groundingIndefinite:"Et barn (غیر معینہ)",groundingDistal:"Det barn (اشارہ)",groundingProximal:"Dette barn (قربت)",dragInstruction:"اپنی جملہ بنانے کے لیے الفاظ کو زمین پر کھینچیں۔",sentenceLabel:"جملہ:",finishBtn:"ختم کریں اور واپس جائیں",modalTeaserTitle:"کیا آپ مزید مشق کرنا چاہتے ہیں؟",modalTeaserText:"جملہ بن گیا... لیکن اصل میں کنٹرول کس کا ہے؟ کیا بچے اور کھانے کے درمیان کوئی پوشیدہ طاقت ہے؟",modalVerbLabel:"امدادی افعال (پوشیدہ طاقت)",bestemthedLabel:"تعریف - En / et",pronomenLabel:"ضمیر - Han/Ham/Hans",verberLabel:"افعال - Går/gik/gået",groundingSuccess:"بہت خوب! نیچے دی گئی اینیمیشن دیکھیں۔",groundingFinalMsg:"بہت اچھا! اب آپ نے ایک ایسا جملہ بنایا ہے جو حقیقت پر مبنی ہے۔",modalForceTitle:"امدادی افعال: پوشیدہ طاقت",modalForceSubtitle:'امدادی افعال عمل کو تبدیل نہیں کرتے، بلکہ اس کے پیچھے موجود "طاقت" کو تبدیل کرتے ہیں۔',modalForceSkal:"<strong>SKAL (سماجی طاقت):</strong> ایک بیرونی طاقت یا ایک ناگزیر منصوبہ بچے کو عمل کی طرف دھکیلتا ہے۔ اس سے بچنے کا کوئی راستہ نہیں ہے۔",modalForceMaa:'<strong>MÅ (رکاوٹ کا خاتمہ):</strong> راستہ بند ہے، لیکن امدادی فعل "må" رکاوٹ کو ختم کرتا ہے اور اجازت دیتا ہے۔',modalForceVil:"<strong>VIL (اندرونی خواہش):</strong> طاقت خود بچے کے اندر سے آتی ہے۔ یہ ایک خواہش یا ارادہ ہے جو کھانے کی سمت کھینچتا ہے۔",modalForceKan:"<strong>KAN (صلاحیت/امکان):</strong> بچے میں عمل کرنے کی توانائی اور صلاحیت ہے۔ یہ ایک اندرونی ذریعہ ہے۔",modalPracticeLabel:"امدادی افعال: kan، vil، skal اور må",modalForcePlaceholder:"طاقت دیکھنے کے لیے امدادی فعل منتخب کریں",whyConjugateFirst:"ہم صرف پہلے لفظ کو کیوں بدلتے ہیں؟ ↓",whyConjugateAdjectives:"ہم صفات کو کیوں بدلتے ہیں؟ ↓",noun:"اسم",adjective:"صفت",verb:"فعل",adverb:"متعلق فعل",conjunction:"حرف عطف",handlingLabel:"عمل",projektørLabel:"پروجیکٹر",sentenceNode1:"جملہ 1",sentenceNode2:"جملہ 2",example:"مثال:",exampleBarn:"بچہ (Et)",exampleBil:"گاڑی (En)",advLangsomt:"آہستہ",advHurtigt:"تیزی سے",advMeget:"بہت",advLidt:"تھوڑا",positiveLabelSimple:"بنیادی شکل",comparativeLabelSimple:"اعلی درجہ",superlativeLabelSimple:"سب سے اعلی درجہ",comparisonBubbleComp:"یہ پہلی سے <strong>زیادہ</strong> ہے!",comparisonBubbleSuper:"یہ سب سے <strong>زیادہ</strong> ہے!",conjExpl_fordi:"تیر بائیں سے دائیں منتقل ہوتا ہے تاکہ <strong>وجہ</strong> کی طرف اشارہ کیا جا سکے (بچہ کیوں کھا رہا ہے؟)۔",conjExpl_derfor:"تیر دائیں سے بائیں منتقل ہوتا ہے تاکہ پہلی جملے میں وجہ کی طرف <strong>واپس</strong> اشارہ کیا جا سکے ۔",conjExpl_da:"گھڑی بائیں طرف حرکت کرتی ہے یہ دکھانے کے لیے کہ ماضی میں کوئی کام ایک بار <strong>ہوا</strong> تھا۔",conjExpl_naar:"گھڑی دائیں طرف حرکت کرتی ہے مستقبل کے عمل کو دکھانے کے لیے یا ایسی چیز جو <strong>ہر بار</strong> (عادت) ہوتی ہے۔",conjExpl_selvom:"رکاوٹ کو تقسیم ہونا چاہیے کیونکہ 'رعایت' (selvom) مزاحمت کے باوجود عمل کو <strong>ہونے دیتی ہے</strong>۔",conjExpl_alligevel:"تیر رکاوٹ کے <strong>ذریعے</strong> بلا روک ٹوک حرکت کرتا ہے یہ دکھانے کے لیے کہ عمل ہر چیز کے باوجود ہوتا ہے۔",conjExpl_men:"رکاوٹ کے اوپر سے گزرنے والا قوس دو مختلف خیالات کے درمیان ایک تبدیلی یا <strong>تضاد</strong> دکھاتا ہے۔",conjFordi:"کیونکہ",conjNaar:"جب",conjDa:"جب (ماضی)",conjSelvom:"اگرچہ",conjAlligevel:"تاہم",conjMen:"لیکن",conjDerfor:"اس لیے",adjFeedback1:"یہاں صرف ایک چیز (پرندہ) کی وضاحت کی جا رہی ہے۔",adjFeedback2:"یہاں دو لوگوں کا موازنہ کیا جا رہا ہے۔",adjFeedback3:"یہاں ایک درخت کو دوسرے تمام درختوں پر فوقیت دی جا رہی ہے۔",adjFeedback4:"یہاں متعدد چیزوں (سیبوں) کی وضاحت کی جا رہی ہے۔",adjFeedback5:"یہاں ایک مخصوص بچے کی وضاحت کی جا رہی ہے۔",adjFeedback6:"یہاں دو چیزوں کے سائز کا موازنہ کیا جا رہا ہے۔",adjFeedback7:"یہاں صرف ایک چیز (مسکراہٹ) کی وضاحت کی جا رہی ہے۔",adjFeedback8:"یہاں تمام دنوں میں سے ایک دن کی اہمیت بتائی جا رہی ہے۔",adjFeedback9:"یہاں کچھ مخصوص پھولوں کی وضاحت کی جا رہی ہے۔",adjFeedback10:"یہاں صرف ایک چیز (گھاس) की وضاحت کی جا رہی ہے۔",exerciseSetCounter:"سیٹ {n} / {total}",practiceMoreInflections:"گردان की مزید مشق کریں"},zh:{selectLanguage:"选择语言",title:"丹麦语训练",subtitle:"选择一个类别开始你的训练。",dagensOpgave:"今日任务",dagensOpgaveDesc:"新主题，新语法。完成任务！",modulTest:"模块测试训练",modulTestDesc:"各种任务集中在一起。",notes:"教学笔记",notesDesc:"阅读并练习课堂笔记。",lavSporgsmal:"提问练习",lavSporgsmalDesc:"学习根据图片提出精确的问题。",lavSporgsmalBtnText:"开始提问 - 点击这里",samtaleTraening:"对话训练",samtaleTraeningDesc:"练习对话并获得丹麦语帮助。",skriveHjaelp:"写作助手",skriveHjaelpDesc:"输入你的文本，获得无答案的反馈。",back:"返回",du1mod3:"DU1, 模块 3 和 4",du2mod1:"DU2, 模块 1",du3mod4:"DU3, 模块 4",laerEtNytOrd:"学习一个新单词",laerEtNytOrdDesc:"探索单词在网络中的联系。",wordNetworkExplanation:"单词与其他单词相连。了解单词如何与其他单词联系可以帮助你更好地记住它。",targetWord:"狗",hypernym:"上位词",hypernymWord:"动物",synonym:"同义词",synonymWord:"狗狗",antonym:"反义词",antonymWord:"猫",hyponym:"下位词",hyponymWord:"贵宾犬",geminiBtnText:"学习单词 - 点击这里",geminiConsentText:"点击此链接即表示你同意使用 Google 产品，且 Google 会利用你的回答训练人工智能。",hverdagssamtale:"日常对话",hverdagssamtaleDesc:"练习常见的日常对话。",samtaleBolig:"关于住房的对话",samtaleArbejde:"关于工作的对话",samtaleBtnText:"开始对话 - 点击这里",skriveHjaelpBtnText:"写作助手 - 点击这里",du1mod3Desc:"选择一个主题进行练习。",minHverdag:"我的日常生活",minBolig:"我的住房",mitArbejde:"我的工作",minHverdagDesc:"关于你日常生活的任务。",transportSprogskole:"去语言学校的交通",madlavning:"烹饪",rengoering:"清洁",transportDesc:"你怎么去学校？",padletDesc:"与全班分享你今天如何去学校。",padletBtnText:"打开 Padlet",madlavningDesc:"你喜欢做什样的食物？",madlavningPadletDesc:"在这里与全班分享你的烹饪经验。",rengoeringDesc:"你如何进行清洁？",rengoeringPadletDesc:"与全班分享你对清洁的看法。",traenTidsudtryk:"练习时间表达",traenTidsudtrykDesc:"如何在丹麦语中使用不同的时间表达？",traenTidsudtrykBtnText:"打开时间表达练习",ordstilling:"词序练习",ordstillingDesc:"重新排列单词，并将它们按正确的顺序排列。",checkResult:"检查答案",correctOrder:"太棒了！顺序正确。",wrongOrder:"不完全正确。再试一次！",ordstillingLet:"词序 (简单)",ordstillingSvaer:"词序 (困难)",levelA1:"A1 句子",levelA2:"A2 句子",traenGrammatik:"练习语法",grammatikDesc:"在文本的空格处填入正确的单词。",let:"简单 (A1)",mellemsvaer:"中等 (A2)",svaer:"困难 (B1)",grammatikIntro:"选择等级开始练习。",checkAnswers:"检查所有答案",allCorrect:"太棒了！所有答案都正确。",someWrong:"你的某些答案不完全正确。再试一次！",newExercise:"下一篇",hintMean:"这个词在这种语境下没有意义。",hintTense:"检查时态。是现在时还是过去时？",hintForm:"检查单词形式（例如：性别或单复数）。",hintPerson:"检查谁在执行动作（我、你、他/她）。",hintContext:"重新阅读全文。这里最适合什么？",hintName:"你需要一个关于名字的词。",hintPlace:"你需要一个关于地点的词。",hintAction:"这个词描述的是另一种动作。",hintAdj:"检查形容词（描述事物的词）。",hintAdverb:"检查副词（时间、地点或方式）。",hintConj:"检查连词（连接两个句子）。",filled:"已填写",verbExerciseSubtitle:"将动词变位为现在时和过去时。",advChoiceTitle:"也许 / 好 / 不",advChoiceDesc:"练习在不同句子中使用关键副词。",nextPhase:"下一阶段 →",nextExercise:"下一题 →",nextCategory:"下一类别 →",next:"下一步 →",filled:"已填写",correct:"正确",filledProgress:"{n} / {total} 已填写",correctProgress:"{n} / {total} 正确",selectAnchor:"选择锚点...",selectTense:"选择时态...",tenseNow:"(现在)",tensePast:"(昨天)",tenseFuture:"(以后)",pastTense:"过去时",presentTense:"现在时",futureTense:"将来时",groundingRelation:"Mit barn (关系)",groundingIndefinite:"Et barn (不定)",groundingDistal:"Det barn (指定)",groundingProximal:"Dette barn (接近)",dragInstruction:"将单词拖到地面上以构建句子。",sentenceLabel:"句子：",finishBtn:"完成并返回",modalTeaserTitle:"想练习更多吗？",modalTeaserText:"句子已构建... 但究竟谁在控制？孩子和食物之间是否存在一种无形的力量？",modalVerbLabel:"虚词（无形力量）",bestemthedLabel:"限定性 - En / et",pronomenLabel:"代词 - Han/Ham/Hans",verberLabel:"动词 - Går/gik/gået",groundingSuccess:"太棒了！请看下面的动画。",groundingFinalMsg:"太棒了！你现在已经建立了一个植根于现实的句子。",modalForceTitle:"虚词：看不见的力量",modalForceSubtitle:"虚词不会改变动作，但它们会改变动作背后的“力量”。",modalForceSkal:"<strong>SKAL（社会力量）：</strong> 外部力量或不可避免的计划推动孩子采取行动。没有其他选择。",modalForceMaa:"<strong>MÅ（消除障碍）：</strong> 道路被阻塞，但虚词“må”排除了障碍并允许行动。",modalForceVil:"<strong>VIL（内部欲望）：</strong> 力量来自孩子内部。这是一种拉向食物方向的愿望或意志。",modalForceKan:"<strong>KAN（能力/潜力）：</strong> 孩子拥有执行该动作的能量和能力。这是一种内部资源。",modalPracticeLabel:"虚词：kan, vil, skal 和 må",modalForcePlaceholder:"选择一个虚词以查看力量",whyConjugateFirst:"为什么我们只变位第一个词？ ↓",whyConjugateAdjectives:"为什么我们要变位形容词？ ↓",noun:"名词",adjective:"形容词",verb:"动词",adverb:"副词",conjunction:"连词",handlingLabel:"动作",projektørLabel:"投影仪",sentenceNode1:"句子 1",sentenceNode2:"句子 2",example:"例子：",exampleBarn:"孩子 (Et)",exampleBil:"汽车 (En)",advLangsomt:"缓慢地",advHurtigt:"快速地",advMeget:"非常",advLidt:"一点",positiveLabelSimple:"原形",comparativeLabelSimple:"比较级",superlativeLabelSimple:"最高级",comparisonBubbleComp:"它比第一个<strong>更多</strong>！",comparisonBubbleSuper:"它是所有里面<strong>最多</strong>的！",conjExpl_fordi:"箭头从左向右移动，指向<strong>原因</strong>（孩子为什么在吃东西？）。",conjExpl_derfor:"箭头从右向左移动，指回第一句话中的<strong>原因</strong>。",conjExpl_da:"时钟向左移动，表示某事在<strong>过去</strong>发生过一次。",conjExpl_naar:"时钟向右移动，表示<strong>将来</strong>的动作或<strong>每次</strong>都会发生的事（习惯）。",conjExpl_selvom:"障碍必须分开，因为“让步”（selvom）让动作<strong>不顾阻力</strong>地发生。",conjExpl_alligevel:"箭头从障碍中<strong>穿过</strong>，表示动作尽管发生了一切，仍然发生了。",conjExpl_men:"障碍上方的弧线表示两种不同想法之间的转变或<strong>对比</strong>。",conjFordi:"因为",conjNaar:"当",conjDa:"当（过去）",conjSelvom:"虽然",conjAlligevel:"尽管如此",conjMen:"但是",conjDerfor:"因此",adjFeedback1:"这里仅仅是对一件事物（鸟）的描述。",adjFeedback2:"这里正在比较两个人。",adjFeedback3:"这里强调了一棵树优于其他所有树。",adjFeedback4:"这里是对多件事物（苹果）的描述。",adjFeedback5:"这里正在描述一个特定的孩子。",adjFeedback6:"这里正在比较两件事物的大小。",adjFeedback7:"这里仅仅是对一件事物（微笑）的描述。",adjFeedback8:"这里强调了某一天优于其他所有日子。",adjFeedback9:"这里正在描述一些特定的花。",adjFeedback10:"这里仅仅是对一件事物（草）的描述。",exerciseSetCounter:"第 {n} / {total} 组",practiceMoreInflections:"练习更多变位"},ru:{selectLanguage:"Выберите язык",title:"Изучение датского",subtitle:"Выберите категорию, чтобы начать обучение.",dagensOpgave:"Задание дня",dagensOpgaveDesc:"Новая тема, новая грамматика. Решите задачу!",modulTest:"Подготовка к тесту",modulTestDesc:"Различные задания, собранные в одном месте.",notes:"Конспекты занятий",notesDesc:"Читайте и практикуйте заметки с уроков.",lavSporgsmal:"Составление вопросов",lavSporgsmalDesc:"Научитесь задавать точные вопросы по картинкам.",lavSporgsmalBtnText:"Начать - нажмите здесь",samtaleTraening:"Разговорная практика",samtaleTraeningDesc:"Практикуйте общение и получайте помощь с датским.",skriveHjaelp:"Помощь в письме",skriveHjaelpDesc:"Введите текст и получите отзыв без готовых ответов.",back:"Назад",du1mod3:"DU1, модуль 3 и 4",laerEtNytOrd:"Выучить новое слово",laerEtNytOrdDesc:"Узнайте, как слова связаны в сети.",wordNetworkExplanation:"Слова связаны с другими словами. Это помогает лучше запоминать их.",targetWord:"Собака",hypernym:"Гипероним",hypernymWord:"Животное",synonym:"Синоним",synonymWord:"Пес",antonym:"Антоним",antonymWord:"Кошка",hyponym:"Гипоним",hyponymWord:"Пудель",geminiBtnText:"Выучить слово - нажмите здесь",geminiConsentText:"Нажимая на ссылку, вы соглашаетесь на использование продуктов Google и на то, что Google обучает ИИ на ваших ответах.",hverdagssamtale:"Повседневный разговор",hverdagssamtaleDesc:"Практикуйте обычные разговоры о жизни.",samtaleBolig:"Разговор о жилье",samtaleArbejde:"Разговор о работе",samtaleBtnText:"Начать разговор - нажмите здесь",skriveHjaelpBtnText:"Помощь в письме - нажмите здесь",du1mod3Desc:"Выберите тему для практики.",minHverdag:"Мои будни",minBolig:"Мое жилье",mitArbejde:"Моя работа",minHverdagDesc:"Задания о вашей повседневной жизни.",transportSprogskole:"Транспорт до школы",madlavning:"Готовка",rengoering:"Уборка",transportDesc:"Как вы добираетесь до школы?",padletDesc:"Поделитесь с классом, как вы добрались до школы сегодня.",padletBtnText:"Открыть Padlet",madlavningDesc:"Какую еду вы любите готовить?",madlavningPadletDesc:"Поделитесь своим кулинарным опытом с классом.",rengoeringDesc:"Как вы делаете уборку?",rengoeringPadletDesc:"Поделитесь своими мыслями об уборке с классом.",traenTidsudtryk:"Практика временных выражений",traenTidsudtrykDesc:"Как использовать различные временные выражения в датском?",traenTidsudtrykBtnText:"Открыть упражнение",ordstilling:"Порядок слов",ordstillingDesc:"Переставьте слова и расположите их в правильном порядке.",checkResult:"Проверить ответ",correctOrder:"Отлично! Порядок правильный.",wrongOrder:"Не совсем верно. Попробуйте еще раз!",ordstillingLet:"Порядок слов (Легко)",ordstillingSvaer:"Порядок слов (Сложно)",levelA1:"Предложения A1",levelA2:"Предложения A2",traenGrammatik:"Практика грамматики",grammatikDesc:"Заполните пропуски в тексте правильными словами.",let:"Легко (A1)",mellemsvaer:"Средне (A2)",svaer:"Сложно (B1)",grammatikIntro:"Выберите уровень, чтобы начать упражнение.",checkAnswers:"Проверить все ответы",allCorrect:"Фантастика! Все ответы верны.",someWrong:"Некоторые ваши ответы не совсем верны. Попробуйте еще раз!",newExercise:"Следующий текст",hintMean:"Это слово не имеет смысла в данном контексте.",hintTense:"Проверьте время. Это настоящее или прошедшее?",hintForm:"Проверьте форму слова (например, род или число).",hintPerson:"Проверьте, кто совершает действие (я, ты, он/она).",hintContext:"Прочитайте весь текст еще раз. Что здесь лучше всего подходит?",hintName:"Здесь нужно слово для имен.",hintPlace:"Здесь нужно слово для мест.",hintAction:"Это слово описывает другое действие.",hintAdj:"Проверьте прилагательное (описание предмета).",hintAdverb:"Проверьте наречие (время, место или образ действия).",hintConj:"Проверьте союз (соединяет два предложения).",filled:"заполнено",verbExerciseSubtitle:"Спрягайте глаголы в настоящем и прошедшем времени.",advChoiceTitle:"Может быть / хорошо / не",advChoiceDesc:"Практикуйтесь в использовании ключевых наречий в разных предложениях.",nextPhase:"Следующий этап →",nextExercise:"Следующее задание →",nextCategory:"Следующая категория →",next:"Далее →",filled:"заполнено",correct:"правильно",filledProgress:"{n} / {total} заполнено",correctProgress:"{n} / {total} правильно",selectAnchor:"Выберите якорь...",selectTense:"Выберите время...",tenseNow:"(сейчас)",tensePast:"(вчера)",tenseFuture:"(позже)",pastTense:"Прошедшее время",presentTense:"Настоящее время",futureTense:"Будущее время",groundingRelation:"Mit barn (отношение)",groundingIndefinite:"Et barn (неопределенное)",groundingDistal:"Det barn (указание)",groundingProximal:"Dette barn (близость)",dragInstruction:"Перетащите слова на землю, чтобы построить предложение.",sentenceLabel:"Предложение:",finishBtn:"Завершить и вернуться",modalTeaserTitle:"Хотите попрактиковаться еще?",modalTeaserText:"Предложение построено... но кто на самом деле его контролирует? Существует ли невидимая сила между ребенком и едой?",modalVerbLabel:"Модальные глаголы (невидимая сила)",bestemthedLabel:"Определенность - En / et",pronomenLabel:"Местоимения - Han/Ham/Hans",verberLabel:"Глаголы - Går/gik/gået",groundingSuccess:"Отлично! Посмотрите анимацию ниже.",groundingFinalMsg:"Отлично! Теперь вы построили предложение, основанное на реальности.",modalForceTitle:"Модальные глаголы: невидимая сила",modalForceSubtitle:"Модальные глаголы не меняют само действие, но они меняют «силу», стоящую за ним.",modalForceSkal:"<strong>SKAL (социальная сила):</strong> Внешняя сила или неизбежный план подталкивают ребенка к действию. Другого пути нет.",modalForceMaa:"<strong>MÅ (устранение барьера):</strong> Путь прегражден, но модальный глагол «må» убирает барьер и дает разрешение.",modalForceVil:"<strong>VIL (внутреннее желание):</strong> Сила исходит от самого ребенка. Это желание или воля, которые тянут в сторону еды.",modalForceKan:"<strong>KAN (способность/потенциал):</strong> У ребенка есть энергия и способность совершить действие. Это внутренний ресурс.",modalPracticeLabel:"Модальные глаголы: kan, vil, skal и må",modalForcePlaceholder:"Выберите модальный глагол, чтобы увидеть силу",whyConjugateFirst:"Почему мы спрягаем только первое слово? ↓",whyConjugateAdjectives:"Почему мы склоняем прилагательные? ↓",noun:"Существительное",adjective:"Прилагательное",verb:"Глагол",adverb:"Наречие",conjunction:"Союз",handlingLabel:"Действие",projektørLabel:"Проектор",sentenceNode1:"Предложение 1",sentenceNode2:"Предложение 2",example:"Пример:",exampleBarn:"Ребенок (Et)",exampleBil:"Машина (En)",advLangsomt:"медленно",advHurtigt:"быстро",advMeget:"очень",advLidt:"немного",positiveLabelSimple:"Начальная форма",comparativeLabelSimple:"Сравнительная степень",superlativeLabelSimple:"Превосходная степень",comparisonBubbleComp:"Это <strong>больше</strong>, чем первое!",comparisonBubbleSuper:"Это <strong>больше всего</strong> из всех!",conjExpl_fordi:"Стрелка движется слева направо, указывая на <strong>причину</strong> (Почему ребенок ест?).",conjExpl_derfor:"Стрелка движется справа налево, указывая на <strong>причину</strong> в первом предложении.",conjExpl_da:"Часы двигаются влево, показывая, что что-то произошло один раз в <strong>прошлом</strong>.",conjExpl_naar:"Часы двигаются вправо, показывая действие в <strong>будущем</strong> или то, что происходит <strong>каждый раз</strong> (привычка).",conjExpl_selvom:"Барьер должен быть разделен, потому что «уступка» (selvom) позволяет действию произойти <strong>несмотря на сопротивление</strong>.",conjExpl_alligevel:"Стрелка проходит <strong>сквозь</strong> барьер, показывая, что действие все равно произошло, несмотря ни на что.",conjExpl_men:"Дуга над барьером показывает переход или <strong>контраст</strong> между двумя разными мыслями.",adjFeedback1:"Здесь это просто описание одного предмета (птицы).",adjFeedback2:"Здесь сравниваются два человека.",adjFeedback3:"Здесь выделяется одно дерево среди всех остальных.",adjFeedback4:"Здесь это описание нескольких предметов (яблоки).",adjFeedback5:"Здесь описывается конкретный ребенок.",adjFeedback6:"Здесь сравнивается размер двух предметов.",adjFeedback7:"Здесь это просто описание одного предмета (улыбка).",adjFeedback8:"Здесь выделяется один день среди всех остальных.",adjFeedback9:"Здесь описываются конкретные цветы.",adjFeedback10:"Здесь это просто описание одного предмета (трава).",exerciseSetCounter:"Набор {n} / {total}",practiceMoreInflections:"Больше практики со склонениями"},ne:{selectLanguage:"भाषा छान्नुहोस्",title:"डेनिस प्रशिक्षण",subtitle:"प्रशिक्षण सुरु गर्न एक श्रेणी छान्नुहोस्।",dagensOpgave:"आजको कार्य",dagensOpgaveDesc:"नयाँ विषय, नयाँ व्याकरण। कार्य समाधान गर्नुहोस्!",modulTest:"मोड्युल परीक्षण प्रशिक्षण",modulTestDesc:"विभिन्न कार्यहरू एकै ठाउँमा संकलन गरिएको।",notes:"शिक्षण नोटहरू",notesDesc:"कक्षाबाट नोटहरू पढ्नुहोस् र अभ्यास गर्नुहोस्।",lavSporgsmal:"प्रश्नहरू बनाउनुहोस्",lavSporgsmalDesc:"चित्रहरूको आधारमा सटीक प्रश्नहरू सोध्न सिक्नुहोस्।",lavSporgsmalBtnText:"प्रश्नहरू बनाउनुहोस् - यहाँ क्लिक गर्नुहोस्",samtaleTraening:"कुराकानी प्रशिक्षण",samtaleTraeningDesc:"आफ्नो कुराकानी अभ्यास गर्नुहोस् र डेनिस भाषामा मद्दत लिनुहोस्।",skriveHjaelp:"लेखन मद्दत",skriveHjaelpDesc:"आफ्नो पाठ प्रविष्ट गर्नुहोस् र जवाफ बिना प्रतिक्रिया प्राप्त गर्नुहोस्।",back:"फिर्ता",du1mod3:"DU1, मोड्युल ३ र ४",laerEtNytOrd:"नयाँ शब्द सिक्नुहोस्",laerEtNytOrdDesc:"शब्दहरू नेटवर्कमा कसरी जोडिएका छन् पत्ता लगाउनुहोस्।",wordNetworkExplanation:"शब्दहरू अन्य शब्दहरूसँग जोडिएका हुन्छन्। शब्द कसरी जोडिएको छ थाहा पाउँदा सम्झन सजिलो हुन्छ।",targetWord:"कुकुर",hypernym:"माथिल्लो शब्द",hypernymWord:"जनावर",synonym:"पर्यायवाची",synonymWord:"कुकुर (vovse)",antonym:"विपरीतार्थी",antonymWord:"बिरालो",hyponym:"तल्लो शब्द",hyponymWord:"पुडल",geminiBtnText:"शब्द सिक्नुहोस् - यहाँ थिच्नुहोस्",geminiConsentText:"यो लिङ्कमा क्लिक गरेर, तपाईं गुगल उत्पादन प्रयोग गर्न र गुगलले तपाईंको जवाफबाट एआईलाई तालिम दिन सहमत हुनुहुन्छ।",hverdagssamtale:"दैनिक कुराकानी",hverdagssamtaleDesc:"सामान्य दैनिक कुराकानी अभ्यास गर्नुहोस्।",samtaleBolig:"आवासको बारेमा कुराकानी",samtaleArbejde:"कामको बारेमा कुराकानी",samtaleBtnText:"कुराकानी सुरु गर्नुहोस् - यहाँ क्लिक गर्नुहोस्",skriveHjaelpBtnText:"लेखन मद्दत - यहाँ क्लिक गर्नुहोस्",du1mod3Desc:"अभ्यास गर्न विषय छान्नुहोस्।",minHverdag:"मेरो दैनिक जीवन",minBolig:"मेरो आवास",mitArbejde:"मेरो काम",minHverdagDesc:"तपाईंको दैनिक जीवनको बारेमा कार्यहरू।",transportSprogskole:"स्कूल सम्मको यातायात",madlavning:"खाना पकाउने",rengoering:"सरसफाई",transportDesc:"तपाईं स्कूल कसरी जानुहुन्छ?",padletDesc:"तपाईं आज स्कूल कसरी पुग्नुभयो कक्षामा साझा गर्नुहोस्।",padletBtnText:"Padlet खोल्नुहोस्",madlavningDesc:"तपाईंलाई कस्तो खाना पकाउन मन पर्छ?",madlavningPadletDesc:"तपाईंको खाना पकाउने अनुभव कक्षामा साझा गर्नुहोस्।",rengoeringDesc:"तपाई सरसफाई कसरी गर्नुहुन्छ?",rengoeringPadletDesc:"सरसफाईको बारेमा आफ्नो विचार साझा गर्नुहोस्।",traenTidsudtryk:"समय अभिव्यक्ति अभ्यास",traenTidsudtrykDesc:"डेनिसमा विभिन्न समय अभिव्यक्तिहरू कसरी प्रयोग गर्ने?",traenTidsudtrykBtnText:"समय अभिव्यक्ति अभ्यास खोल्नुहोस्",ordstilling:"शब्द क्रम",ordstillingDesc:"शब्दहरूलाई पुन: व्यवस्थित गर्नुहोस् र तिनीहरूलाई सही क्रममा राख्नुहोस्।",checkResult:"उत्तर जाँच गर्नुहोस्",correctOrder:"उत्कृष्ट! क्रम सही छ।",wrongOrder:"पुरै सही छैन। फेरि प्रयास गर्नुहोस्!",ordstillingLet:"शब्द क्रम (सजिलो)",ordstillingSvaer:"शब्द क्रम (कठिन)",levelA1:"A1 वाक्यहरू",levelA2:"A2 वाक्यहरू",traenGrammatik:"व्याकरण अभ्यास",grammatikDesc:"पाठका खाली ठाउँहरूमा सही शब्दहरू भर्नुहोस्।",let:"सजिलो (A1)",mellemsvaer:"मध्यम (A2)",svaer:"कठिन (B1)",grammatikIntro:"अभ्यास सुरु गर्न एक स्तर छान्नुहोस्।",checkAnswers:"सबै उत्तरहरू जाँच गर्नुहोस्",allCorrect:"शानदार! सबै उत्तरहरू सही छन्।",someWrong:"तपाईका केही उत्तरहरू पूर्ण रूपमा सही छैनन्। फेरि प्रयास गर्नुहोस्!",newExercise:"अर्को पाठ",hintMean:"यो शब्द यस सन्दर्भमा अर्थहीन छ।",hintTense:"काल जाँच गर्नुहोस्। यो वर्तमान हो कि भूत?",hintForm:"शब्दको रूप जाँच गर्नुहोस् (जस्तै लिङ्ग वा एकवचन/बहुवचन)।",hintPerson:"कार्य कसले गरिरहेको छ जाँच गर्नुहोस् (म, तिमी, उ/उनी)।",hintContext:"फेरि पूरा पाठ पढ्नुहोस्। यहाँ सबैभन्दा उपयुक्त के हुन्छ?",hintName:"तपाईंलाई यहाँ नामका लागि शब्द चाहिन्छ।",hintPlace:"तपाईंलाई यहाँ ठाउँका लागि शब्द चाहिन्छ।",hintAction:"यो शब्दले अर्कै कार्यलाई वर्णन गर्दछ।",hintAdj:"विशेषण जाँच गर्नुहोस् (चीजको विवरण)।",hintAdverb:"क्रियाविशेषण जाँच गर्नुहोस् (समय, स्थान वा तरिका)।",hintConj:"संयोजक जाँच गर्नुहोस् (दुईवटा वाक्यहरू जोड्छ)।",filled:"भरिएको",verbExerciseSubtitle:"वर्तमान र भूतकालमा क्रियापदहरू संयोजन गर्नुहोस्।",advChoiceTitle:"सायद / राम्रो / होइन",advChoiceDesc:"विभिन्न वाक्यहरूमा मुख्य क्रियाविशेषणहरूको प्रयोग अभ्यास गर्नुहोस्।",nextPhase:"अर्को चरण →",nextExercise:"अर्को अभ्यास →",nextCategory:"अर्को श्रेणी →",next:"अर्को →",filled:"भरिएको",correct:"सही",filledProgress:"{n} / {total} भरिएको",correctProgress:"{n} / {total} सही",selectAnchor:"एनकर छान्नुहोस्...",selectTense:"काल छान्नुहोस्...",tenseNow:"(अहिले)",tensePast:"(हिजो)",tenseFuture:"(पछि)",dragInstruction:"वाक्य बनाउन शब्दहरूलाई जमिनमा तान्नुहोस्।",sentenceLabel:"वाक्य:",finishBtn:"समाप्त गर्नुहोस् र फिर्ता जानुहोस्",modalTeaserTitle:"थप अभ्यास गर्न चाहनुहुन्छ?",modalTeaserText:"वाक्य बन्यो... तर वास्तवमा नियन्त्रण कसको छ? के बच्चा र खानाको बीचमा कुनै अदृश्य शक्ति छ?",modalVerbLabel:"सहायक क्रियाहरू (अदृश्य शक्ति)",bestemthedLabel:"निश्चितता - En / et",pronomenLabel:"सर्वनाम - Han/Ham/Hans",verberLabel:"क्रियाहरू - Går/gik/gået",groundingSuccess:"उत्कृष्ट! तलको एनिमेसन हेर्नुहोस्।",groundingFinalMsg:"उत्कृष्ट! तपाईंले अब वास्तविकतामा आधारित एउटा वाक्य बनाउनुभएको छ।",modalForceTitle:"सहायक क्रियाहरू: अदृश्य शक्ति",modalForceSubtitle:'सहायक क्रियाहरूले कार्यलाई परिवर्तन गर्दैनन्, तर तिनीहरूले त्यसको पछाडिको "शक्ति" लाई परिवर्तन गर्छन्।',modalForceSkal:"<strong>SKAL (सामाजिक शक्ति):</strong> बाह्य शक्ति वा अपरिहार्य योजनाले बच्चालाई कार्यतर्फ धकेल्छ। यसबाट बच्ने कुनै उपाय छैन।",modalForceMaa:'<strong>MÅ (अवरोध हटाउने):</strong> बाटो अवरुद्ध छ, तर सहायक क्रिया "må" ले अवरोध हटाउँछ र अनुमति दिन्छ।',modalForceVil:"<strong>VIL (आन्तरिक इच्छा):</strong> शक्ति बच्चा भित्रबाट आउँछ। यो खानाको दिशामा तान्ने इच्छा वा संकल्प हो।",modalForceKan:"<strong>KAN (क्षमता/सम्भावना):</strong> बच्चामा कार्य गर्ने ऊर्जा र क्षमता छ। यो एउटा आन्तरिक स्रोत हो।",modalPracticeLabel:"सहायक क्रियाहरू: kan, vil, skal र må",modalForcePlaceholder:"शक्ति हेर्न सहायक क्रिया छान्नुहोस्",whyConjugateFirst:"हामी किन पहिलो शब्द मात्रै परिवर्तन गर्छौं? ↓",whyConjugateAdjectives:"हामी किन विशेषणहरू परिवर्तन गर्छौं? ↓",noun:"नाम",adjective:"विशेषण",verb:"क्रिया",adverb:"क्रियाविशेषण",conjunction:"संयोजक",handlingLabel:"कार्य",projektørLabel:"प्रोजेक्टर",sentenceNode1:"वाक्य १",sentenceNode2:"वाक्य २",example:"उदाहरण:",exampleBarn:"बच्चा (Et)",exampleBil:"कार (En)",advLangsomt:"बिस्तारै",advHurtigt:"छिटो",advMeget:"धेरै",advLidt:"थोरै",positiveLabelSimple:"आधारभूत रूप",comparativeLabelSimple:"उच्च स्तर",superlativeLabelSimple:"उच्चतम स्तर",comparisonBubbleComp:"यो पहिलो भन्दा <strong>धेरै</strong> छ!",comparisonBubbleSuper:"यो सबै भन्दा <strong>धेरै</strong> छ!",conjExpl_fordi:"काँडा बायाँबाट दायाँ सर्छ, <strong>कारण</strong> तर्फ संकेत गर्दै (बच्चा किन खाइरहेको छ?)।",conjExpl_derfor:"काँडा दायाँबाट बायाँ सर्छ, पहिलो वाक्यको <strong>कारण</strong> तर्फ संकेत गर्दै।",conjExpl_da:"घडी बायाँ सर्छ, जसले <strong>विगतमा</strong> कुनै कुरा एक पटक भएको थियो भनेर देखाउँछ।",conjExpl_naar:"घडी दायाँ सर्छ, जसले <strong>भविष्यको</strong> कार्य वा <strong>प्रत्येक पटक</strong> हुने कुरा (बानी) देखाउँछ।",conjExpl_selvom:"अवरोध विभाजित हुनुपर्छ किनभने 'सहुलियत' (selvom) ले <strong>प्रतिरोधको बाबजुद</strong> कार्य हुन दिन्छ।",conjExpl_alligevel:"काँडा अवरोधको <strong>बीचबाट</strong> जान्छ, जसले सबै कुराको बाबजुद कार्य भएको देखाउँछ।",conjExpl_men:"अवरोध माथिको चापले दुई फरक विचारहरू बीचको परिवर्तन वा <strong>विपरितता</strong> देखाउँछ।",adjFeedback1:"यहाँ केवल एउटा चीज (चरा) को वर्णन गरिएको छ।",adjFeedback2:"यहाँ दुई जना मानिसहरूको तुलना गरिएको छ।",adjFeedback3:"यहाँ एउटा रूखलाई अन्य सबैभन्दा फरक देखाइएको छ।",adjFeedback4:"यहाँ धेरै चीजहरू (स्याउ) को वर्णन गरिएको छ।",adjFeedback5:"यहाँ एउटा निश्चित बच्चाको वर्णन गरिएको छ।",adjFeedback6:"यहाँ दुईवटा चीजको आकारको तुलना गरिएको छ।",adjFeedback7:"यहाँ केवल एउटा चीज (मुस्कान) को वर्णन गरिएको छ।",adjFeedback8:"यहाँ एउटा दिनलाई अन्य सबै दिन भन्दा फरक देखाइएको छ।",adjFeedback9:"यहाँ केही निश्चित फूलहरूको वर्णन गरिएको छ।",adjFeedback10:"यहाँ केवल एउटा चीज (घाँस) को वर्णन गरिएको छ।",exerciseSetCounter:"सेट {n} / {total}",practiceMoreInflections:"रूपान्तरणको थप अभ्यास गर्नुहोस्"},th:{selectLanguage:"เลือกภาษา",title:"ฝึกภาษาเดนมาร์ก",subtitle:"เลือกหมวดหมู่เพื่อเริ่มการฝึกฝนของคุณ",dagensOpgave:"ภารกิจวันนี้",dagensOpgaveDesc:"หัวข้อใหม่ ไวยากรณ์ใหม่ แก้ปัญหาเลย!",modulTest:"ฝึกทำข้อสอบโมดูล",modulTestDesc:"รวบรวมงานต่างๆ ไว้ในที่เดียว",notes:"โน้ตการเรียน",notesDesc:"อ่านและฝึกฝนโน้ตจากทางห้องเรียน",lavSporgsmal:"สร้างคำถาม",lavSporgsmalDesc:"เรียนรู้การตั้งคำถามที่แม่นยำจากรูปภาพ",lavSporgsmalBtnText:"สร้างคำถาม - คลิกที่นี่",samtaleTraening:"ฝึกสนทนา",samtaleTraeningDesc:"ฝึกฝนการสนทนาและรับความช่วยเหลือเกี่ยวกับภาษาเดนมาร์ก",skriveHjaelp:"ตัวช่วยเขียน",skriveHjaelpDesc:"ใส่ข้อความของคุณและรับข้อเสนอแนะโดยไม่มีคำตอบ",back:"กลับ",du1mod3:"DU1, โมดูล 3 และ 4",laerEtNytOrd:"เรียนรู้คำศัพท์ใหม่",laerEtNytOrdDesc:"สำรวจความเชื่อมโยงของคำในเครือข่าย",wordNetworkExplanation:"คำศัพท์เชื่อมโยงกับคำอื่นๆ จะช่วยให้จำได้ดีขึ้นเมื่อรู้ความเชื่อมโยง",targetWord:"สุนัข",hypernym:"คำนามหลัก",hypernymWord:"สัตว์",synonym:"คำไวพจน์",synonymWord:"เจ้าตูบ",antonym:"คำตรงข้าม",antonymWord:"แมว",hyponym:"คำประเภทย่อย",hyponymWord:"พุดเดิ้ล",geminiBtnText:"เรียนรู้คำศัพท์ - กดที่นี่",geminiConsentText:"การคลิกที่ลิงก์นี้แสดงว่าคุณตกลงที่จะใช้ผลิตภัณฑ์ของ Google และให้ Google ฝึก AI ด้วยคำตอบของคุณ",hverdagssamtale:"สนทนาในชีวิตประจำวัน",hverdagssamtaleDesc:"ฝึกบทสนทนาทั่วไปเกี่ยวกับชีวิตประจำวัน",samtaleBolig:"คุยเรื่องที่อยู่อาศัย",samtaleArbejde:"คุยเรื่องงาน",samtaleBtnText:"เริ่มการสนทนา - กดที่นี่",skriveHjaelpBtnText:"ตัวช่วยเขียน - กดที่นี่",du1mod3Desc:"เลือกหัวข้อที่จะฝึกฝน",minHverdag:"ชีวิตประจำวันของฉัน",minBolig:"บ้านของฉัน",mitArbejde:"งานของฉัน",minHverdagDesc:"งานเกี่ยวกับชีวิตประจำวันของคุณ",transportSprogskole:"การเดินทางไปโรงเรียน",madlavning:"การทำอาหาร",rengoering:"การทำความสะอาด",transportDesc:"คุณมาโรงเรียนอย่างไร?",padletDesc:"แบ่งปันวิธีการมาโรงเรียนของคุณในวันนี้กับเพื่อนในห้อง",padletBtnText:"เปิด Padlet",madlavningDesc:"คุณชอบทำอาหารประเภทไหน?",madlavningPadletDesc:"แบ่งปันประสบการณ์การทำอาหารของคุณที่นี่",rengoeringDesc:"คุณทำความสะอาดอย่างไร?",rengoeringPadletDesc:"แบ่งปันความคิดเรื่องการทำความสะอาดกับเพื่อนในห้อง",traenTidsudtryk:"ฝึกการบอกเวลา",traenTidsudtrykDesc:"วิธีการใช้สำนวนเกี่ยวกับเวลาในภาษาเดนมาร์ก",traenTidsudtrykBtnText:"เปิดแบบฝึกหัดการบอกเวลา",ordstilling:"การเรียงลำดับคำ",ordstillingDesc:"จัดเรียงคำใหม่และวางตามลำดับที่ถูกต้อง",checkResult:"ตรวจคำตอบ",correctOrder:"ยอดเยี่ยม! ลำดับถูกต้อง",wrongOrder:"ยังไม่ถูกต้อง ลองอีกครั้ง!",ordstillingLet:"การเรียงลำดับคำ (ง่าย)",ordstillingSvaer:"การเรียงลำดับคำ (ยาก)",levelA1:"ประโยค A1",levelA2:"ประโยค A2",traenGrammatik:"ฝึกไวยากรณ์",grammatikDesc:"เติมคำที่ถูกต้องลงในช่องว่างในเนื้อข้อความ",let:"ง่าย (A1)",mellemsvaer:"ปานกลาง (A2)",svaer:"ยาก (B1)",grammatikIntro:"เลือกระดับเพื่อเริ่มแบบฝึกหัด",checkAnswers:"ตรวจคำตอบทั้งหมด",allCorrect:"สุดยอด! ทุกคำตอบถูกต้อง",someWrong:"คำตอบบางคำไม่ค่อยถูกต้อง ลองอีกครั้ง!",newExercise:"ข้อความถัดไป",hintMean:"คำนี้ไม่มีความหมายในบริบทนี้",hintTense:"ตรวจสอบกาล (Tense) เป็นปัจจุบันหรืออดีต?",hintForm:"ตรวจสอบรูปของคำ (เช่น เพศ หรือ เอกพจน์/พหูพจน์)",hintPerson:"ตรวจสอบว่าใครเป็นคนทำกริยานั้น (ฉัน, คุณ, เขา/เธอ)",hintContext:"อ่านข้อความทั้งหมดอีกครั้ง อะไรเหมาะที่สุดตรงนี้?",hintName:"คุณต้องการคำเรียกชื่อตรงนี้",hintPlace:"คุณต้องการคำระบุสถานที่ตรงนี้",hintAction:"คำนี้อธิบายการกระทำที่ต่างออกไป",hintAdj:"ตรวจสอบคำคุณศัพท์ (การบรรยายสิ่งของ)",hintAdverb:"ตรวจสอบคำวิเศษณ์ (เวลา สถานที่ หรืออาการ)",hintConj:"ตรวจสอบคำสันธาน (คำเชื่อมประโยค)",filled:"เติมแล้ว",verbExerciseSubtitle:"ผันคำกริยาในรูปปัจจุบันและอดีต",advChoiceTitle:"อาจจะ / ดี / ไม่",advChoiceDesc:"ฝึกใช้คำวิเศษณ์หลักในประโยคต่างๆ",nextPhase:"ระยะถัดไป →",nextExercise:"แบบฝึกหัดถัดไป →",nextCategory:"หมวดหมู่ถัดไป →",next:"ถัดไป →",filled:"เติมแล้ว",correct:"ถูกต้อง",filledProgress:"{n} / {total} เติมแล้ว",correctProgress:"{n} / {total} ถูกต้อง",selectAnchor:"เลือกจุดยึด...",selectTense:"เลือกกาล...",tenseNow:"(ตอนนี้)",tensePast:"(เมื่อวาน)",tenseFuture:"(ภายหลัง)",pastTense:"อดีตกาล",presentTense:"ปัจจุบันกาล",futureTense:"อนาคตกาล",groundingRelation:"Mit barn (ความสัมพันธ์)",groundingIndefinite:"Et barn (ไม่เจาะจง)",groundingDistal:"Det barn (การชี้เฉพาะ)",groundingProximal:"Dette barn (ความใกล้ชิด)",dragInstruction:"ลากคำลงบนพื้นเพื่อสร้างประโยคของคุณ",sentenceLabel:"ประโยค:",finishBtn:"เสร็จสิ้นและกลับ",modalTeaserTitle:"ต้องการฝึกฝนเพิ่มเติมหรือไม่?",modalTeaserText:"สร้างประโยคแล้ว... แต่ใครเป็นผู้ควบคุมกันแน่? มีพลังที่มองไม่เห็นระหว่างเด็กและอาหารหรือไม่?",modalVerbLabel:"คำกริยานุเคราะห์ (พลังที่มองไม่เห็น)",bestemthedLabel:"ความเฉพาะเจาะจноми - En / et",pronomenLabel:"คำสรรพนาม - Han/Ham/Hans",verberLabel:"คำกริยา - Går/gik/gået",groundingSuccess:"เยี่ยมมาก! ชมแอนิเมชันด้านล่าง",groundingFinalMsg:"เยี่ยมมาก! ตอนนี้คุณได้สร้างประโยคที่ยึดตามความเป็นจริงแล้ว",modalForceTitle:"Modal Verbs: พลังที่มองไม่เห็น",modalForceSubtitle:'กริยานุเคราะห์ (Modal verbs) ไม่ได้เปลี่ยนการกระทำ แต่เปลี่ยน "พลัง" ที่อยู่เบื้องหลังการกระทำนั้น',modalForceSkal:"<strong>SKAL (พลังทางสังคม):</strong> พลังภายนอกหรือแผนการที่หลีกเลี่ยงไม่ได้ผลักดันให้เด็กลงมือทำ ไม่มีทางเลือกอื่น",modalForceMaa:'<strong>MÅ (การขจัดอุปสรรค):</strong> ทางถูกปิดกั้น แต่กริยานุเคราะห์ "må" ช่วยขจัดอุปสรรคและอนุญาตให้ทำได้',modalForceVil:"<strong>VIL (ความปรารถนาภายใน):</strong> พลังมาจากภายในตัวเด็กเอง เป็นความปรารถนาหรือความตั้งใจที่ดึงไปในทิศทางของอาหาร",modalForceKan:"<strong>KAN (ความสามารถ/ศักยภาพ):</strong> เด็กมีพลังและความสามารถที่จะทำการนั้นได้ เป็นทรัพยากรภายในตัว",modalPracticeLabel:"กริยานุเคราะห์: kan, vil, skal และ må",modalForcePlaceholder:"เลือกคำกริยานุเคราะห์เพื่อดูพลัง",whyConjugateFirst:"ทำไมเราถึงผันแค่คำแรก? ↓",whyConjugateAdjectives:"ทำไมเราถึงผันคำคุณศัพท์? ↓",noun:"คำนาม",adjective:"คำคุณศัพท์",verb:"คำกริยา",adverb:"คำวิเศษณ์",conjunction:"คำสันธาน",handlingLabel:"การกระทำ",projektørLabel:"โปรเจกเตอร์",sentenceNode1:"ประโยคที่ 1",sentenceNode2:"ประโยคที่ 2",example:"ตัวอย่าง:",exampleBarn:"เด็ก (Et)",exampleBil:"รถ (En)",advLangsomt:"ช้าๆ",advHurtigt:"เร็วๆ",advMeget:"มาก",advLidt:"นิดหน่อย",positiveLabelSimple:"รูปพื้นฐาน",comparativeLabelSimple:"ขั้นกว่า",superlativeLabelSimple:"ขั้นสุด",comparisonBubbleComp:"มัน <strong>มากกว่า</strong> อันแรก!",comparisonBubbleSuper:"มัน <strong>มากที่สุด</strong> ในทั้งหมด!",conjExpl_fordi:"ลูกศรเคลื่อนจากซ้ายไปขวา ชี้ไปที่ <strong>เหตุผล</strong> (ทำไมเด็กถึงกำลังกิน?)",conjExpl_derfor:"ลูกศรเคลื่อนจากขวาไปซ้าย ชี้กลับไปที่ <strong>เหตุผล</strong> ในประโยคแรก",conjExpl_da:"นาฬิกาเคลื่อนไปทางซ้าย แสดงว่าบางอย่างเกิดขึ้นเพียงครั้งเดียวใน <strong>อดีต</strong>",conjExpl_naar:"นาฬิกาเคลื่อนไปทางขวา แสดงถึงการกระทำใน <strong>อนาคต</strong> หรือที่เกิดขึ้น <strong>ทุกครั้ง</strong> (นิสัย)",conjExpl_selvom:"สิ่งกีดขวางต้องแยกออก เพราะ 'การผ่อนปรน' (selvom) ยอมให้การกระทำเกิดขึ้น <strong>แม้จะมีแรงต้าน</strong>",conjExpl_alligevel:"ลูกศรเคลื่อน <strong>ทะลุ</strong> สิ่งกีดขวาง แสดงว่าการกระทำยังคงเกิดขึ้นไม่ว่าจะเกิดอะไรขึ้นก็ตาม",conjExpl_men:"เส้นโค้งเหนือสิ่งกีดขวางแสดงถึงการเปลี่ยนแปลงหรือ <strong>ความแตกต่าง</strong> ระหว่างสองความคิดที่ต่างกัน",adjFeedback1:"นี่เป็นเพียงคำอธิบายของสิ่งหนึ่ง (นก)",adjFeedback2:"ในกรณีนี้เป็นเปรียบเทียบคนสองคน",adjFeedback3:"ในกรณีนี้มีการเน้นต้นไม้ต้นหนึ่งท่ามกลางต้นไม้อื่นๆ ทั้งหมด",adjFeedback4:"นี่เป็นคำอธิบายถึงสิ่งของหลายอย่าง (แอปเปิล)",adjFeedback5:"ในกรณีนี้บรรยายถึงเด็กคนใดคนหนึ่งโดยเฉพาะ",adjFeedback6:"ในกรณีนี้เป็นการเปรียบเทียบขนาดของสองสิ่ง",adjFeedback7:"นี่เป็นเพียงคำอธิบายของสิ่งหนึ่ง (รอยยิ้ม)",adjFeedback8:"ในกรณีนี้มีการเน้นย้ำถึงวันหนึ่งท่ามกลางวันอื่นๆ ทั้งหมด",adjFeedback9:"นี่คือคำบรรยายภาพดอกไม้บางชนิดโดยเฉพาะ",adjFeedback10:"นี่เป็นเพียงคำอธิบายของสิ่งหนึ่ง (หญ้า)",exerciseSetCounter:"ชุดที่ {n} / {total}",practiceMoreInflections:"ฝึกฝนการผันคำเพิ่มเติม"},pt:{selectLanguage:"Escolher idioma",title:"Treino de Dinamarquês",subtitle:"Escolha uma categoria para começar o seu treino.",dagensOpgave:"Tarefa do Dia",dagensOpgaveDesc:"Novo tópico, nova gramática. Resolva a tarefa!",modulTest:"Treino para Teste de Módulo",modulTestDesc:"Várias tarefas reunidas num só lugar.",notes:"Notas de Aula",notesDesc:"Leia e pratique com as notas das aulas.",lavSporgsmal:"Criar Perguntas",lavSporgsmalDesc:"Aprenda a fazer perguntas precisas com base em imagens.",lavSporgsmalBtnText:"Criar perguntas - clique aqui",samtaleTraening:"Treino de Conversação",samtaleTraeningDesc:"Pratique as suas conversas e obtenha ajuda com o seu dinamarquês.",skriveHjaelp:"Ajuda na Escrita",skriveHjaelpDesc:"Insira o seu texto e obtenha feedback sem respostas.",back:"Voltar",du1mod3:"DU1, módulo 3 e 4",laerEtNytOrd:"Aprender uma palavra nova",laerEtNytOrdDesc:"Explore como as palavras se ligam em redes.",wordNetworkExplanation:"As palavras estão ligadas a outras palavras. Ajuda a lembrar-se muito melhor quando sabe as ligações.",targetWord:"Cão",hypernym:"Hiperónimo",hypernymWord:"Animal",synonym:"Sinónimo",synonymWord:"Cachorro",antonym:"Antónimo",antonymWord:"Gato",hyponym:"Hipónimo",hyponymWord:"Poodle",geminiBtnText:"Aprender uma palavra - prima aqui",geminiConsentText:"Ao clicar neste link, concorda em usar um produto da Google e que a Google treine inteligência artificial com as suas respostas.",hverdagssamtale:"Conversa do dia-a-dia",hverdagssamtaleDesc:"Pratique conversas comuns sobre o quotidiano.",samtaleBolig:"Conversa sobre habitação",samtaleArbejde:"Conversa sobre trabalho",samtaleBtnText:"Começar conversa - clicar aqui",skriveHjaelpBtnText:"Ajuda na escrita - clicar aqui",du1mod3Desc:"Escolha um tópico para praticar.",minHverdag:"O meu dia-a-dia",minBolig:"A minha casa",mitArbejde:"O meu trabalho",minHverdagDesc:"Tarefas sobre a sua rotina diária.",transportSprogskole:"Transporte para a escola",madlavning:"Culinária",rengoering:"Limpeza",transportDesc:"Como vem para a escola?",padletDesc:"Partilhe com a turma como chegou à escola hoje.",padletBtnText:"Abrir Padlet",madlavningDesc:"Que tipo de comida gosta de fazer?",madlavningPadletDesc:"Partilhe as suas experiências culinárias aqui.",rengoeringDesc:"Como faz as limpezas?",rengoeringPadletDesc:"Partilhe os seus pensamentos sobre limpezas.",traenTidsudtryk:"Treino de expressões de tempo",traenTidsudtrykDesc:"Como usar diferentes expressões de tempo em dinamarquês?",traenTidsudtrykBtnText:"Abrir exercício de expressões de tempo",ordstilling:"Ordem das Palavras",ordstillingDesc:"Reorganize as palavras e coloque-as na ordem correta.",checkResult:"Verificar resposta",correctOrder:"Excelente! A ordem está correta.",wrongOrder:"Não está bem. Tente novamente!",ordstillingLet:"Ordem das Palavras (Fácil)",ordstillingSvaer:"Ordem das Palavras (Difícil)",levelA1:"Frases A1",levelA2:"Frases A2",traenGrammatik:"Treinar Gramática",grammatikDesc:"Preencha as lacunas com as palavras corretas no texto.",let:"Fácil (A1)",mellemsvaer:"Médio (A2)",svaer:"Difícil (B1)",grammatikIntro:"Escolha um nível para começar o exercício.",checkAnswers:"Verificar todas as respostas",allCorrect:"Fantástico! Todas as respostas estão corretas.",someWrong:"Algumas das suas respostas não estão totalmente corretas. Tente novamente!",newExercise:"Próximo texto",hintMean:"Esta palavra não faz sentido neste contexto.",hintTense:"Verifique o tempo verbal. É presente ou passado?",hintForm:"Verifique a forma da palavra (ex: gênero ou singular/plural).",hintPerson:"Verifique quem está realizando a ação (eu, você, ele/ela).",hintContext:"Leia todo o texto novamente. O que melhor se encaixa aqui?",hintName:"Você precisa de uma palavra para nomes aqui.",hintPlace:"Você precisa de uma palavra para locais aqui.",hintAction:"Esta palavra descreve uma ação diferente.",hintAdj:"Verifique o adjetivo (descrição de uma coisa).",hintAdverb:"Verifique o advérbio (tempo, lugar ou modo).",hintConj:"Verifique a conjunção (conecta duas frases).",filled:"preenchido",verbExerciseSubtitle:"Conjugue verbos no presente e passado.",advChoiceTitle:"Talvez / bem / não",advChoiceDesc:"Pratique o uso de advérbios chave em diferentes frases.",nextPhase:"Próxima fase →",nextExercise:"Próximo exercício →",nextCategory:"Próxima categoria →",next:"Seguinte →",filled:"preenchido",correct:"correto",filledProgress:"{n} / {total} preenchido",correctProgress:"{n} / {total} correto",selectAnchor:"Escolher âncora...",selectTense:"Escolher tempo...",tenseNow:"(agora)",tensePast:"(ontem)",tenseFuture:"(mais tarde)",pastTense:"Pretérito",presentTense:"Presente",futureTense:"Futuro",groundingRelation:"Mit barn (relação)",groundingIndefinite:"Et barn (indefinido)",groundingDistal:"Det barn (distala/apontar)",groundingProximal:"Dette barn (proximal/proximidade)",dragInstruction:"Arraste as palavras para o chão para construir a sua frase.",sentenceLabel:"Frase:",finishBtn:"Terminar e voltar",modalTeaserTitle:"Quer praticar mais?",modalTeaserText:"Frase construída... mas quem tem o controlo realmente? Existe uma força invisível entre a criança e a comida?",modalVerbLabel:"Verbos modais (força invisível)",bestemthedLabel:"Definição - En / et",pronomenLabel:"Pronomes - Han/Ham/Hans",verberLabel:"Verbos - Går/gik/gået",groundingSuccess:"Excelente! Veja a animação abaixo.",groundingFinalMsg:"Excelente! Você agora construiu uma frase que está ancorada na realidade.",modalForceTitle:"Verbos Modais: a força invisível",modalForceSubtitle:'Os verbos modais não mudam a ação, mas mudam a "força" por trás dela.',modalForceSkal:"<strong>SKAL (força social):</strong> Uma força externa ou um plano inevitável empurra a criança para a ação. Não há como escapar.",modalForceMaa:'<strong>MÅ (remoção de barreira):</strong> O caminho está bloqueado, mas o verbo modal "må" remove a barreira e dá permissão.',modalForceVil:"<strong>VIL (desejo interno):</strong> A força vem de dentro da própria criança. É um desejo ou uma vontade que puxa na direção da comida.",modalForceKan:"<strong>KAN (capacidade/potencial):</strong> A criança tem a energia e a capacidade de realizar a ação. É um recurso interno.",modalPracticeLabel:"Verbos modais: kan, vil, skal e må",modalForcePlaceholder:"Escolha um verbo modal para ver a força",whyConjugateFirst:"Porque é que conjugamos apenas a primeira palavra? ↓",whyConjugateAdjectives:"Porque é que conjugamos adjetivos? ↓",noun:"Substantivo",adjective:"Adjetivo",verb:"Verbo",adverb:"Advérbio",conjunction:"Conjunção",handlingLabel:"Ação",projektørLabel:"Projetor",sentenceNode1:"Frase 1",sentenceNode2:"Frase 2",example:"Exemplo:",exampleBarn:"Criança (Et)",exampleBil:"Carro (En)",advLangsomt:"lentamente",advHurtigt:"rapidamente",advMeget:"muito",advLidt:"pouco",positiveLabelSimple:"Forma básica",comparativeLabelSimple:"Grau mais alto",superlativeLabelSimple:"Grau mais elevado",comparisonBubbleComp:"É <strong>mais</strong> do que o primeiro!",comparisonBubbleSuper:"É o <strong>mais</strong> de todos!",conjExpl_fordi:"A seta move-se da esquerda para a direita, apontando para a <strong>causa</strong> (Por que é que a criança está a comer?).",conjExpl_derfor:"A seta move-se da direita para a esquerda, apontando de volta para a <strong>causa</strong> na primeira frase.",conjExpl_da:"O relógio move-se para a esquerda, mostrando que algo aconteceu uma vez no <strong>passado</strong>.",conjExpl_naar:"O relógio move-se para a direita, mostrando uma ação no <strong>futuro</strong> ou algo que acontece <strong>sempre</strong> (hábito).",conjExpl_selvom:"A barreira deve ser dividida porque a 'concessão' (selvom) permite que a ação aconteça <strong>apesar da resistência</strong>.",conjExpl_alligevel:"A seta passa <strong>através</strong> da barreira, mostrando que a ação aconteceu apesar de tudo.",conjExpl_men:"O arco sobre a barreira mostra uma transição ou <strong>contraste</strong> entre duas ideias diferentes.",adjFeedback1:"Aqui é apenas uma descrição de uma coisa (o pássaro).",adjFeedback2:"Aqui estão a ser comparadas duas pessoas.",adjFeedback3:"Aqui destaca-se uma árvore em relação a todas as outras.",adjFeedback4:"Aqui é uma descrição de várias coisas (as maçãs).",adjFeedback5:"Aqui descreve-se uma criança específica.",adjFeedback6:"Aqui compara-se o tamanho de duas coisas.",adjFeedback7:"Aqui é apenas uma descrição de uma coisa (o sorriso).",adjFeedback8:"Aqui destaca-se um dia em relação a todos os outros dias.",adjFeedback9:"Aqui descrevem-se algumas flores específicas.",adjFeedback10:"Aqui é apenas uma descrição de uma coisa (a relva).",exerciseSetCounter:"Conjunto {n} / {total}",practiceMoreInflections:"Praticar mais com flexões"},vi:{selectLanguage:"Chọn ngôn ngữ",title:"Luyện tiếng Đan Mạch",subtitle:"Chọn một danh mục để bắt đầu luyện tập.",dagensOpgave:"Nhiệm vụ hàng ngày",dagensOpgaveDesc:"Chủ đề mới, ngữ pháp mới. Hãy giải nhiệm vụ!",modulTest:"Luyện thi mô-đun",modulTestDesc:"Nhiều nhiệm vụ khác nhau được tập hợp tại một nơi.",notes:"Ghi chú bài giảng",notesDesc:"Đọc và thực hành các ghi chú từ lớp học.",lavSporgsmal:"Đặt câu hỏi",lavSporgsmalDesc:"Học cách đặt câu hỏi chính xác dựa trên hình ảnh.",lavSporgsmalBtnText:"Đặt câu hỏi - bấm vào đây",samtaleTraening:"Luyện hội thoại",samtaleTraeningDesc:"Thực hành hội thoại và nhận trợ giúp về tiếng Đan Mạch.",skriveHjaelp:"Trợ giúp viết",skriveHjaelpDesc:"Nhập văn bản của bạn và nhận phản hồi không có đáp án.",back:"Quay lại",du1mod3:"DU1, mô-đun 3",laerEtNytOrd:"Học một từ mới",laerEtNytOrdDesc:"Khám phá cách các từ kết nối trong mạng lưới.",wordNetworkExplanation:"Các từ được kết nối với các từ khác. Việc biết cách kết nối giúp bạn nhớ từ tốt hơn nhiều.",targetWord:"Con chó",hypernym:"Từ bao nghĩa",hypernymWord:"Động vật",synonym:"Từ đồng nghĩa",synonymWord:"Cún",antonym:"Từ trái nghĩa",antonymWord:"Con mèo",hyponym:"Từ nghĩa hẹp",hyponymWord:"Chó Poodle",geminiBtnText:"Học một từ - nhấn vào đây",geminiConsentText:"Bằng cách nhấp vào liên kết này, bạn đồng ý sử dụng sản phẩm của Google và để Google huấn luyện trí tuệ nhân tạo bằng câu trả lời của bạn.",hverdagssamtale:"Hội thoại hàng ngày",hverdagssamtaleDesc:"Thực hành các cuộc hội thoại thông thường về cuộc sống hàng ngày.",samtaleBolig:"Hội thoại về nhà ở",samtaleArbejde:"Hội thoại về công việc",samtaleBtnText:"Bắt đầu hội thoại - bấm tại đây",skriveHjaelpBtnText:"Trợ giúp viết - bấm tại đây",du1mod3Desc:"Chọn một chủ đề để thực hành.",minHverdag:"Cuộc sống hàng ngày của tôi",minBolig:"Nhà ở của tôi",mitArbejde:"Công việc của tôi",minHverdagDesc:"Các nhiệm vụ về cuộc sống hàng ngày của bạn.",transportSprogskole:"Phương tiện đến trường",madlavning:"Nấu ăn",rengoering:"Dọn dẹp",transportDesc:"Bạn đến trường bằng cách nào?",padletDesc:"Chia sẻ với cả lớp cách bạn đến trường hôm nay.",padletBtnText:"Mở Padlet",madlavningDesc:"Bạn thích nấu món ăn gì?",madlavningPadletDesc:"Chia sẻ kinh nghiệm nấu ăn của bạn với cả lớp tại đây.",rengoeringDesc:"Bạn dọn dẹp như thế nào?",rengoeringPadletDesc:"Chia sẻ suy nghĩ của bạn về việc dọn dẹp với cả lớp.",traenTidsudtryk:"Luyện tập các cụm từ chỉ thời gian",traenTidsudtrykDesc:"Cách sử dụng các cụm từ chỉ thời gian khác nhau trong tiếng Đan Mạch?",traenTidsudtrykBtnText:"Mở bài tập chỉ thời gian",ordstilling:"Trật tự từ",ordstillingDesc:"Sắp xếp lại các từ và đặt chúng theo đúng thứ tự.",checkResult:"Kiểm tra đáp án",correctOrder:"Tuyệt vời! Thứ tự đã đúng.",wrongOrder:"Chưa hoàn toàn đúng. Thử lại nhé!",ordstillingLet:"Trật tự từ (Dễ)",ordstillingSvaer:"Trật tự từ (Khó)",levelA1:"Câu A1",levelA2:"Câu A2",traenGrammatik:"Luyện ngữ pháp",grammatikDesc:"Điền các từ đúng vào chỗ trống trong văn bản.",let:"Dễ (A1)",mellemsvaer:"Trung bình (A2)",svaer:"Khó (B1)",grammatikIntro:"Chọn một cấp độ để bắt đầu bài tập.",checkAnswers:"Kiểm tra tất cả đáp án",allCorrect:"Tuyệt vời! Tất cả đáp án đều đúng.",someWrong:"Một số câu trả lời của bạn chưa hoàn toàn đúng. Thử lại nhé!",newExercise:"Văn bản tiếp theo",hintMean:"Từ này không có ý nghĩa trong ngữ cảnh này.",hintTense:"Kiểm tra thì của động từ. Là hiện tại hay quá khứ?",hintForm:"Kiểm tra hình thức của từ (ví dụ: giống hoặc số ít/số nhiều).",hintPerson:"Kiểm tra ai là người thực hiện hành động (tôi, bạn, anh ấy/cô ấy).",hintContext:"Đọc lại toàn bộ văn bản. Điều gì phù hợp nhất ở đây?",hintName:"Bạn cần một từ cho tên ở đây.",hintPlace:"Bạn cần một từ cho nơi chốn ở đây.",hintAction:"Từ này mô tả một hành động khác.",verbExerciseSubtitle:"Chia động từ ở thì hiện tại và quá khứ.",advChoiceTitle:"Có lẽ / tốt / không",advChoiceDesc:"Thực hành sử dụng các trạng từ chính trong các câu khác nhau.",nextPhase:"Giai đoạn tiếp theo →",nextExercise:"Bài tập tiếp theo →",nextCategory:"Danh mục tiếp theo →",next:"Tiếp tục →",filled:"đã điền",correct:"chính xác",filledProgress:"{n} / {total} đã điền",correctProgress:"{n} / {total} chính xác",selectAnchor:"Chọn mỏ neo...",selectTense:"Chọn thì...",tenseNow:"(bây giờ)",tensePast:"(hôm qua)",tenseFuture:"(sau này)",dragInstruction:"Kéo các từ xuống đất để xây dựng câu của bạn.",sentenceLabel:"Câu:",finishBtn:"Kết thúc và quay lại",modalTeaserTitle:"Bạn muốn luyện tập thêm không?",modalTeaserText:"Câu đã được xây dựng... nhưng ai thực sự kiểm soát? Có một sức mạnh vô hình nào đó giữa đứa trẻ và thức ăn không?",modalVerbLabel:"Động từ khiếm khuyết (sức mạnh vô hình)",bestemthedLabel:"Xác định - En / et",pronomenLabel:"Đại từ - Han/Ham/Hans",verberLabel:"Động từ - Går/gik/gået",groundingSuccess:"Tuyệt vời! Hãy xem hoạt ảnh bên dưới.",groundingFinalMsg:"Tuyệt vời! Bây giờ bạn đã xây dựng được một câu bám sát thực tế.",modalForceTitle:"Động từ khiếm khuyết: sức mạnh vô hình",modalForceSubtitle:'Động từ khiếm khuyết không thay đổi hành động, nhưng chúng thay đổi "sức mạnh" đằng sau hành động đó.',modalForceSkal:"<strong>SKAL (sức mạnh xã hội):</strong> Một lực bên ngoài hoặc một kế hoạch không thể tránh khỏi đẩy đứa trẻ vào hành động. Không có cách nào khác.",modalForceMaa:'<strong>MÅ (loại bỏ rào cản):</strong> Đường bị chặn, nhưng động từ khiếm khuyết "må" loại bỏ rào cản và cho phép thực hiện.',modalForceVil:"<strong>VIL (mong muốn nội tại):</strong> Sức mạnh đến từ chính bên trong đứa trẻ. Đó là một ước muốn hoặc ý chí kéo về phía thức ăn.",modalForceKan:"<strong>KAN (khả năng/tiềm năng):</strong> Đứa trẻ có năng lượng và khả năng để thực hiện hành động. Đó là một nguồn lực bên trong.",modalPracticeLabel:"Động từ khiếm khuyết: kan, vil, skal và må",modalForcePlaceholder:"Chọn một động từ khiếm khuyết để thấy sức mạnh",whyConjugateFirst:"Tại sao chúng ta chỉ chia từ đầu tiên? ↓",whyConjugateAdjectives:"Tại sao chúng ta chia tính từ? ↓",noun:"Danh từ",adjective:"Tính từ",verb:"Động từ",adverb:"Trạng từ",conjunction:"Liên từ",handlingLabel:"Hành động",projektørLabel:"Máy chiếu",sentenceNode1:"Câu 1",sentenceNode2:"Câu 2",example:"Ví dụ:",exampleBarn:"Đứa trẻ (Et)",exampleBil:"Xe hơi (En)",advLangsomt:"chậm",advHurtigt:"nhanh",advMeget:"rất",advLidt:"một chút",positiveLabelSimple:"Dạng cơ bản",comparativeLabelSimple:"Mức độ cao hơn",superlativeLabelSimple:"Mức độ cao nhất",comparisonBubbleComp:"Nó <strong>nhiều hơn</strong> cái đầu tiên!",comparisonBubbleSuper:"Nó là <strong>nhất</strong> trong tất cả!",conjExpl_fordi:"Mũi tên di chuyển từ trái sang phải, chỉ vào <strong>lý do</strong> (Tại sao đứa trẻ đang ăn?).",conjExpl_derfor:"Mũi tên di chuyển từ phải sang trái, chỉ ngược lại <strong>lý do</strong> trong câu đầu tiên.",conjExpl_da:"Đồng hồ di chuyển sang trái, cho thấy điều gì đó đã xảy ra một lần trong <strong>quá khứ</strong>.",conjExpl_naar:"Đồng hồ di chuyển sang phải, cho thấy hành động trong <strong>tương lai</strong> hoặc điều gì đó xảy ra <strong>mọi lúc</strong> (thói quen).",conjExpl_selvom:"Rào cản phải được tách ra vì 'sự nhượng bộ' (selvom) cho phép hành động xảy ra <strong>bất chấp sự kháng cự</strong>.",conjExpl_alligevel:"Mũi tên đi <strong>xuyên qua</strong> rào cản, cho thấy hành động vẫn xảy ra bất chấp mọi thứ.",conjExpl_men:"Vòng cung phía trên rào cản cho thấy sự chuyển đổi hoặc <strong>đối lập</strong> giữa hai ý tưởng khác nhau.",adjFeedback1:"Ở đây chỉ đơn giản là mô tả về một sự vật (con chim).",adjFeedback2:"Ở đây so sánh hai người.",adjFeedback3:"Ở đây nhấn mạnh một cái cây so với tất cả những cái cây khác.",adjFeedback4:"Ở đây mô tả nhiều sự vật (những quả táo).",adjFeedback5:"Ở đây mô tả một đứa trẻ cụ thể.",adjFeedback6:"Ở đây so sánh kích thước của hai sự vật.",adjFeedback7:"Ở đây chỉ đơn giản là mô tả về một sự vật (nụ cười).",adjFeedback8:"Ở đây nhấn mạnh một ngày so với tất cả các ngày khác.",adjFeedback9:"Ở đây mô tả một số bông hoa cụ thể.",adjFeedback10:" Ở đây chỉ đơn giản là mô tả về một sự vật (cỏ).",exerciseSetCounter:"Bộ {n} / {total}",practiceMoreInflections:"Luyện tập thêm với các biến thể"},fa:{selectLanguage:"انتخاب زبان",title:"آموزش دانمارکی",subtitle:"یک دسته را برای شروع تمرین خود انتخاب کنید.",dagensOpgave:"تکلیف روز",dagensOpgaveDesc:"موضوع جدید، گرامر جدید. تکلیف را حل کنید!",modulTest:"تمرین آزمون ماژول",modulTestDesc:"وظایف مختلف در یک جا جمع شده‌اند.",notes:"یادداشت‌های آموزشی",notesDesc:"یادداشت‌های کلاس را بخوانید و تمرین کنید.",lavSporgsmal:"ساخت سوال",lavSporgsmalDesc:"یاد بگیرید بر اساس تصاویر سوالات دقیق بپرسید.",lavSporgsmalBtnText:"ساخت سوال - اینجا کلیک کنید",samtaleTraening:"تمرین مکالمه",samtaleTraeningDesc:"مکالمات خود را تمرین کنید و در زبان دانمارکی کمک بگیرید.",skriveHjaelp:"کمک در نوشتن",skriveHjaelpDesc:"متن خود را وارد کنید و بدون پاسخ، بازخورد بگیرید.",back:"بازگشت",du1mod3:"DU1، ماژول ۳",laerEtNytOrd:"یادگیری یک کلمه جدید",laerEtNytOrdDesc:"کشف کنید که کلمات چگونه در شبکه‌ها به هم متصل هستند.",wordNetworkExplanation:"کلمات به کلمات دیگر متصل هستند. وقتی بدانید کلمه چگونه متصل است، آن را خیلی بهتر به یاد می‌سپارید.",targetWord:"سگ",hypernym:"واژه فراگیر",hypernymWord:"حیوان",synonym:"مترادف",synonymWord:"هاپو",antonym:"متضاد",antonymWord:"گربه",hyponym:"واژه محدودتر",hyponymWord:"پودل",geminiBtnText:"یادگیری کلمه - اینجا کلیک کنید",geminiConsentText:"با کلیک بر روی این لینک، موافقت می‌کنید که از محصولات گوگل استفاده کنید و گوگل هوش مصنوعی را با پاسخ‌های شما آموزش دهد.",hverdagssamtale:"مکالمه روزمره",hverdagssamtaleDesc:"مکالمات معمول درباره زندگی روزمره را تمرین کنید.",samtaleBolig:"مکالمه درباره مسکن",samtaleArbejde:"مکالمه درباره کار",samtaleBtnText:"شروع مکالمه - اینجا کلیک کنید",skriveHjaelpBtnText:"کمک در نوشتن - اینجا کلیک کنید",du1mod3Desc:"یک موضوع را برای تمرین انتخاب کنید.",minHverdag:"زندگی روزمره من",minBolig:"مسکن من",mitArbejde:"کار من",minHverdagDesc:"تکالیفی درباره زندگی روزمره شما.",transportSprogskole:"رفت و آمد به مدرسه زبن",madlavning:"آشپزی",rengoering:"نظافت",transportDesc:"چطور به مدرسه می‌روید؟",padletDesc:"با کلاس در میان بگذارید که امروز چطور به مدرسه رسیدید.",padletBtnText:"باز کردن پدلت",madlavningDesc:"چه نوع غذایی دوست دارید درست کنید؟",madlavningPadletDesc:"تجربیات آشپزی خود را اینجا با کلاس به اشتراک بگذارید.",rengoeringDesc:"چطور نظافت می‌کنید؟",rengoeringPadletDesc:"نظرات خود را درباره نظافت با کلاس در میان بگذارید.",traenTidsudtryk:"تمرین اصطلاحات زمانی",traenTidsudtrykDesc:"چطور از اصطلاحات زمانی مختلف در دانمارکی استفاده کنیم؟",traenTidsudtrykBtnText:"باز کردن تمرین اصطلاحات زمانی",ordstilling:"ترتیب کلمات",ordstillingDesc:"کلمات را دوباره ترتیب دهید و آن‌ها را در جای درست بگذارید.",checkResult:"بررسی پاسخ",correctOrder:"عالی! ترتیب درست است.",wrongOrder:"کاملاً درست نیست. دوباره امتحان کنید!",ordstillingLet:"ترتیب کلمات (آسان)",ordstillingSvaer:"ترتیب کلمات (سخت)",levelA1:"جملات A1",levelA2:"جملات A2",traenGrammatik:"تمرین دستور زبان",grammatikDesc:"جاهای خالی متن را با کلمات درست پر کنید.",let:"آسان (A1)",mellemsvaer:"متوسط (A2)",svaer:"سخت (B1)",grammatikIntro:"یک سطح را برای شروع تمرین انتخاب کنید.",checkAnswers:"بررسی تمام پاسخ‌ها",allCorrect:"عالی! تمام پاسخ‌ها درست هستند.",someWrong:"برخی از پاسخ‌های شما کاملاً درست نیستند. دوباره امتحان کنید!",newExercise:"متن بعدی",hintMean:"این کلمه در این متن معنایی ندارد.",hintTense:"زمان فعل را بررسی کنید. حال است یا گذشته؟",hintForm:"شکل کلمه را بررسی کنید (مثلاً جنسیت یا مفرد/جمع).",hintPerson:"بررسی کنید چه کسی عمل را انجام می‌دهد (من، تو، او).",hintContext:"دوباره کل متن را بخوانید. چه چیزی اینجا بهتر است؟",hintName:"اینجا به کلمه‌ای برای نام‌ها نیاز دارید.",hintPlace:"اینجا به کلمه‌ای برای مکان‌ها نیاز دارید.",hintAction:"این کلمه عمل دیگری را توصیف می‌کند.",verbExerciseSubtitle:"افعال را در زمان حال و گذشته صرف کنید.",advChoiceTitle:"شاید / خوب / نه",advChoiceDesc:"استفاده از قیدهای کلیدی را در جملات مختلف تمرین کنید.",nextPhase:"مرحله بعدی ←",nextExercise:"تمرین بعدی ←",nextCategory:"دسته بعدی ←",next:"بعدی ←",filled:"پر شده",correct:"درست",filledProgress:"{n} / {total} پر شده",correctProgress:"{n} / {total} درست",selectAnchor:"انتخاب لنگر...",selectTense:"انتخاب زمان...",tenseNow:"(الان)",tensePast:"(دیروز)",tenseFuture:"(بعداً)",pastTense:"گذشته",presentTense:"حال",futureTense:"آینده",groundingRelation:"Mit barn (رابطه)",groundingIndefinite:"Et barn (نامعین)",groundingDistal:"Det barn (اشاره)",groundingProximal:"Dette barn (نزدیکی)",dragInstruction:"کلمات را برای ساختن جمله روی زمین بکشید.",sentenceLabel:"جمله:",finishBtn:"پایان و بازگشت",modalTeaserTitle:"آیا می‌خواهید بیشتر تمرین کنید؟",modalTeaserText:"جمله ساخته شد... اما در واقع چه کسی کنترل را در دست دارد؟ آیا نیروی نامرئی بین کودک و غذا وجود دارد؟",modalVerbLabel:"افعال کمکی (نیروی نامرئی)",bestemthedLabel:"شناسایی - En / et",pronomenLabel:"ضمایر - Han/Ham/Hans",verberLabel:"افعال - Går/gik/gået",groundingSuccess:"عالی! انیمیشن زیر را ببینید.",groundingFinalMsg:"عالی! شما اکنون جمله‌ای ساخته‌اید که در واقعیت ریشه دارد.",modalForceTitle:"افعال کمکی: نیروی نامرئی",modalForceSubtitle:"افعال کمکی عمل را تغییر نمی‌دهند، اما «نیرو» پشت آن را تغییر می‌دهند.",modalForceSkal:"<strong>SKAL (نیروی اجتماعی):</strong> یک نیروی خارجی یا یک برنامه اجتناب‌ناپذیر کودک را به سمت عمل سوق می‌دهد. راهی جز آن نیست.",modalForceMaa:"<strong>MÅ (برداشتن مانع):</strong> راه مسدود است، اما فعل کمکی «må» مانع را برمی‌دارد و اجازه می‌دهد.",modalForceVil:"<strong>VIL (تمایل درونی):</strong> نیرو از درون خود کودک می‌آید. این یک آرزو یا اراده است که به سمت غذا می‌کشد.",modalForceKan:"<strong>KAN (توانایی/پتانسیل):</strong> کودک انرژی و توانایی انجام عمل را دارد. این یک منبع درونی است.",modalPracticeLabel:"افعال کمکی: kan، vil، skal و må",modalForcePlaceholder:"یک فعل کمکی برای دیدن قدرت انتخاب کنید",whyConjugateFirst:"چرا ما فقط کلمه اول را صرف می‌کنیم؟ ↓",whyConjugateAdjectives:"چرا ما صفت‌ها را صرف می‌کنیم؟ ↓",noun:"اسم",adjective:"صفت",verb:"فعل",adverb:"قید",conjunction:"حرف ربط",handlingLabel:"عمل",projektørLabel:"پروژکتور",sentenceNode1:"جمله ۱",sentenceNode2:"جمله ۲",example:"مثال:",exampleBarn:"کودک (Et)",exampleBil:"ماشین (En)",advLangsomt:"آرام",advHurtigt:"سریع",advMeget:"خیلی",advLidt:"کمی",positiveLabelSimple:"شکل پایه",comparativeLabelSimple:"درجه بالاتر",superlativeLabelSimple:"بالاترین درجه",comparisonBubbleComp:"این <strong>بیشتر</strong> از اولی است!",comparisonBubbleSuper:"این <strong>بیشترین</strong> از همه است!",conjExpl_fordi:"فلش از چپ به راست حرکت می‌کند و به <strong>علت</strong> اشاره می‌کند (چرا کودک در حال غذا خوردن است؟).",conjExpl_derfor:"فلش از راست به چپ حرکت می‌کند و به <strong>علت</strong> در جمله اول اشاره می‌کند.",conjExpl_da:"ساعت به سمت چپ حرکت می‌کند و نشان می‌دهد که چیزی یک بار در <strong>گذشته</strong> اتفاق افتاده است.",conjExpl_naar:"ساعت به سمت راست حرکت می‌کند و حرکتی در <strong>آینده</strong> یا چیزی که <strong>هر بار</strong> اتفاق می‌افتد (عادت) را نشان می‌دهد.",conjExpl_selvom:"مانع باید تقسیم شود زیرا «با اینکه» (selvom) اجازه می‌دهد عمل <strong>با وجود مقاومت</strong> اتفاق بیفتد.",conjExpl_alligevel:"فلش از <strong>میان</strong> مانع عبور می‌کند و نشان می‌دهد که عمل با وجود همه چیز اتفاق افتاده است.",conjExpl_men:"کمان بالای مانع، گذار یا <strong>تضاد</strong> بین دو ایده متفاوت را نشان می‌دهد.",adjFeedback1:"اینجا فقط توصیف یک چیز (پرنده) است.",adjFeedback2:"اینجا دو نفر با هم مقایسه می‌شوند.",adjFeedback3:"اینجا یک درخت نسبت به بقیه درخت‌ها برجسته شده است.",adjFeedback4:"اینجا توصیف چند چیز (سیب‌ها) است.",adjFeedback5:"اینجا یک کودک خاص توصیف شده است.",adjFeedback6:"اینجا اندازه دو چیز با هم مقایسه می‌شود.",adjFeedback7:"اینجا فقط توصیف یک چیز (لبخند) است.",adjFeedback8:"اینجا یک روز نسبت به بقیه روزها برجسته شده است.",adjFeedback9:"اینجا چند گل خاص توصیف شده‌اند.",adjFeedback10:"اینجا فقط توصیف یک چیز (چمن) است.",exerciseSetCounter:"مجموعه {n} / {total}",practiceMoreInflections:"تمرین بیشتر با صرف کلمات"},tr:{selectLanguage:"Dil seçin",title:"Danca Eğitimi",subtitle:"Eğitiminize başlamak için bir kategori seçin.",dagensOpgave:"Günün Ödevi",dagensOpgaveDesc:"Yeni konu, yeni dilbilgisi. Ödevi çözün!",modulTest:"Modül Testi Eğitimi",modulTestDesc:"Çeşitli görevler tek bir yerde toplandı.",notes:"Ders Notları",notesDesc:"Derslerdeki notları okuyun ve pratik yapın.",lavSporgsmal:"Soru Hazırlama",lavSporgsmalDesc:"Resimlere bakarak kesin sorular sormayı öğrenin.",lavSporgsmalBtnText:"Soru hazırlayın - buraya tıklayın",samtaleTraening:"Konuşma Eğitimi",samtaleTraeningDesc:"Konuşma pratiği yapın ve Dancanız için yardım alın.",skriveHjaelp:"Yazma Yardımı",skriveHjaelpDesc:"Metninizi girin ve cevaplar olmadan geri bildirim alın.",back:"Geri",du1mod3:"DU1, modül 3",du2mod1:"DU2, modül 1",du3mod4:"DU3, modül 4",laerEtNytOrd:"Yeni bir kelime öğrenin",laerEtNytOrdDesc:"Kelimelerin ağlar içinde nasıl bağlandığını keşfedin.",wordNetworkExplanation:"Kelimeler diğer kelimelere bağlıdır. Kelimenin diğer kelimelere nasıl bağlandığını bildiğinizde, kelimeyi çok daha iyi hatırlamanıza yardımcı olur.",targetWord:"Köpek",hypernym:"Üst Terim",hypernymWord:"Hayvan",synonym:"Eşanlamlı",synonymWord:"Köpecik (vovse)",antonym:"Zıt Anlamlı",antonymWord:"Kedi",hyponym:"Alt Terim",hyponymWord:"Kaniş",geminiBtnText:"Kelime öğrenin - buraya tıklayın",geminiConsentText:"Bu bağlantıya tıklayarak bir Google ürünü kullandığınızı ve Google'ın yapay zekayı cevaplarınızla eğittiğini kabul etmiş olursunuz.",hverdagssamtale:"Günlük Konuşma",hverdagssamtaleDesc:"Günlük hayattan yaygın konuşmalar yapın.",samtaleBolig:"Konut hakkında konuşma",samtaleArbejde:"İş hakkında konuşma",samtaleBtnText:"Konuşmayı başlatın - buraya tıklayın",skriveHjaelpBtnText:"Yazma yardımı - buraya tıklayın",du1mod3Desc:"Pratik yapmak için bir konu seçin.",minHverdag:"Günlük hayatım",minBolig:"Konutum",mitArbejde:"İşim",minHverdagDesc:"Günlük hayatınızla ilgili görevler.",transportSprogskole:"Okula ulaşım",madlavning:"Yemek pişirme",rengoering:"Temizlik",transportDesc:"Okula nasıl geliyorsunuz?",padletDesc:"Bugün okula nasıl geldiğinizi sınıfla paylaşın.",padletBtnText:"Padlet'i aç",madlavningDesc:"Hangi yiyecekleri yapmayı seversiniz?",madlavningPadletDesc:"Yemek deneyimlerinizi burada sınıfla paylaşın.",rengoeringDesc:"Temizliği nasıl yaparsınız?",rengoeringPadletDesc:"Temizlikle ilgili düşüncelerinizi sınıfla paylaşın.",traenTidsudtryk:"Zaman ifadeleri çalışması",traenTidsudtrykDesc:"Dancada farklı zaman ifadeleri nasıl kullanılır?",traenTidsudtrykBtnText:"Zaman ifadeleri egzersizini aç",ordstilling:"Kelime Sıralaması",ordstillingDesc:"Kelimeleri yeniden düzenleyin ve doğru sıraya koyun.",checkResult:"Cevabı kontrol et",correctOrder:"Harika! Sıralama doğru.",wrongOrder:"Tam olarak doğru değil. Tekrar deneyin!",ordstillingLet:"Kelime Sıralaması (Kolay)",ordstillingSvaer:"Kelime Sıralaması (Zor)",levelA1:"A1 cümleleri",levelA2:"A2 cümleleri",traenGrammatik:"Gramer Çalışması",grammatikDesc:"Metindeki boşlukları doğru kelimelerle doldurun.",let:"Kolay (A1)",mellemsvaer:"Orta (A2)",svaer:"Zor (B1)",grammatikIntro:"Egzersize başlamak için bir seviye seçin.",checkAnswers:"Tüm cevapları kontrol et",allCorrect:"Harika! Tüm cevaplar doğru.",someWrong:"Bazı cevaplarınız tam olarak doğru değil. Tekrar deneyin!",newExercise:"Sonraki metin",hintMean:"Bu kelime bu bağlamda mantıklı değil.",hintTense:"Zamanı kontrol edin. Şimdiki zaman mı yoksa geçmiş zaman mı?",hintForm:"Kelime biçimini kontrol edin (örneğin cinsiyet veya tekil/çoğul).",hintPerson:"Eylemi kimin yaptığını kontrol edin (ben, sen, o).",hintContext:"Tüm metni tekrar okuyun. Buraya en iyi ne uyar?",hintName:"Burada isimler için bir kelimeye ihtiyacınız var.",hintPlace:"Burada yerler için bir kelimeye ihtiyacınız var.",hintAction:"Bu kelime farklı bir eylemi tanımlıyor.",nextPhase:"Sonraki aşama →",nextExercise:"Sonraki alıştırma →",nextCategory:"Sonraki kategori →",next:"İleri →",filled:"dolduruldu",correct:"doğru",filledProgress:"{n} / {total} dolduruldu",correctProgress:"{n} / {total} doğru",selectAnchor:"Çapa seçin...",selectTense:"Zaman seçin...",tenseNow:"(şimdi)",tensePast:"(dün)",tenseFuture:"(daha sonra)",pastTense:"Geçmiş Zaman",presentTense:"Şimdiki Zaman",futureTense:"Gelecek Zaman",groundingRelation:"Mit barn (ilişki)",groundingIndefinite:"Et barn (belirsiz)",groundingDistal:"Det barn (işaret)",groundingProximal:"Dette barn (yakınlık)",dragInstruction:"Cümlenizi oluşturmak için kelimeleri yere sürükleyin.",sentenceLabel:"Cümle:",finishBtn:"Bitir ve geri dön",modalTeaserTitle:"Daha fazla pratik yapmak ister misiniz?",modalTeaserText:"Cümle kuruldu... ama gerçekte kontrol kimde? Çocuk ve yemek arasında görünmez bir güç var mı?",modalVerbLabel:"Modal yardımcı fiiller (görünmez güç)",bestemthedLabel:"Belirlilik - En / et",pronomenLabel:"Zamirler - Han/Ham/Hans",verberLabel:"Fiiller - Går/gik/gået",groundingSuccess:"Harika! Aşağıdaki animasyonu izleyin.",groundingFinalMsg:"Harika! Gerçekliğe dayalı bir cümle kurdunuz.",modalForceTitle:"Modal Fiiller: Görünmez Güç",modalForceSubtitle:'Modal fiiller eylemi değiştirmez, ancak arkasındaki "gücü" değiştirir.',modalForceSkal:"<strong>SKAL (sosyal güç):</strong> Dış bir güç veya kaçınılmaz bir plan çocuğu eyleme iter. Başka yol yoktur.",modalForceMaa:'<strong>MÅ (engelin kaldırılması):</strong> Yol kapalıdır, ancak "må" modal fiili engeli kaldırır ve izin verir.',modalForceVil:"<strong>VIL (içsel istek):</strong> Güç çocuğun kendi içinden gelir. Yemeğe doğru çeken bir istek veya iradedir.",modalForceKan:"<strong>KAN (yetenek/potansiyel):</strong> Çocuğun eylemi gerçekleştirecek enerjisi ve yeteneği vardır. Bu içsel một kaynaktır.",modalPracticeLabel:"Modal fiiller: kan, vil, skal ve må",modalForcePlaceholder:"Gücü görmek için bir modal fiil seçin",whyConjugateFirst:"Neden sadece ilk kelimeyi çekimliyoruz? ↓",whyConjugateAdjectives:"Neden sıfatları çekimliyoruz? ↓",noun:"İsim",adjective:"Sıfat",verb:"Fiil",adverb:"Zarf",conjunction:"Bağlaç",handlingLabel:"Eylem",projektørLabel:"Projektör",sentenceNode1:"Cümle 1",sentenceNode2:"Cümle 2",example:"Örnek:",exampleBarn:"Çocuk (Et)",exampleBil:"Araba (En)",advLangsomt:"yavaşça",advHurtigt:"hızlıca",advMeget:"çok",advLidt:"biraz",positiveLabelSimple:"Temel biçim",comparativeLabelSimple:"Daha yüksek derece",superlativeLabelSimple:"En yüksek derece",comparisonBubbleComp:"Bu birincisinden <strong>daha fazla</strong>!",comparisonBubbleSuper:"Bu hepsinden <strong>en fazla</strong>!",conjExpl_fordi:"Ok soldan sağa hareket ederek <strong>nedeni</strong> gösterir (Çocuk neden yemek yiyor?).",conjExpl_derfor:"Ok sağdan sola hareket ederek ilk cümledeki <strong>nedene</strong> geri döner.",conjExpl_da:"Saat sola hareket ederek bir şeyin <strong>geçmişte</strong> bir kez gerçekleştiğini gösterir.",conjExpl_naar:"Saat sağa hareket ederek <strong>gelecekteki</strong> bir eylemi veya <strong>her seferinde</strong> olan bir şeyi (alışkanlık) gösterir.",conjExpl_selvom:"Engel bölünmelidir çünkü 'ödün' (selvom) eylemin <strong>dirence rağmen</strong> gerçekleşmesine izin verir.",conjExpl_alligevel:"Ok engelin <strong>içinden</strong> geçer, eylemin her şeye rağmen gerçekleştiğini gösterir.",conjExpl_men:"Engelin üzerindeki yay, iki farklı düşünce arasındaki geçişi veya <strong>zıtlığı</strong> gösterir.",adjFeedback1:"Burada sadece bir şeyin tanımı yapılıyor (kuş).",adjFeedback2:"Burada iki kişi karşılaştırılıyor.",adjFeedback3:"Burada bir ağaç diğerlerine göre vurgulanıyor.",adjFeedback4:"Burada birkaç şeyin (elmaların) tanımı yapılıyor.",adjFeedback5:"Burada belirli bir çocuk tanımlanıyor.",adjFeedback6:"Burada iki şeyin boyutu karşılaştırılıyor.",adjFeedback7:"Burada sadece bir şeyin tanımı yapılıyor (gülümseme).",adjFeedback8:"Burada bir gün diğerlerine göre vurgulanıyor.",adjFeedback9:"Burada bazı belirli çiçekler tanımlanıyor.",adjFeedback10:"Burada sadece bir şeyin tanımı yapılıyor (çimen).",exerciseSetCounter:"Set {n} / {total}",practiceMoreInflections:"Çekimlerle daha fazla pratik yap"},es:{selectLanguage:"Seleccionar idioma",title:"Entrenamiento de Danés",subtitle:"Selecciona una categoría para empezar tu entrenamiento.",dagensOpgave:"Tarea del día",dagensOpgaveDesc:"Nuevo tema, nueva gramática. ¡Resuelve la tarea!",modulTest:"Entrenamiento para el examen de módulo",modulTestDesc:"Varias tareas reunidas en un solo lugar.",notes:"Notas de clase",notesDesc:"Lee y practica con las notas de las clases.",lavSporgsmal:"Crear preguntas",lavSporgsmalDesc:"Aprende a hacer preguntas precisas a partir de imágenes.",lavSporgsmalBtnText:"Crear preguntas - haz clic aquí",samtaleTraening:"Entrenamiento de conversación",samtaleTraeningDesc:"Practica tus conversaciones y obtén ayuda con tu danés.",skriveHjaelp:"Ayuda con la escritura",skriveHjaelpDesc:"Inserta tu texto y obtén retroalimentación sin respuestas.",back:"Atrás",du1mod3:"DU1, módulo 3",du2mod1:"DU2, módulo 1",du3mod4:"DU3, módulo 4",laerEtNytOrd:"Aprender una palabra nueva",laerEtNytOrdDesc:"Explora cómo se conectan las palabras en redes.",wordNetworkExplanation:"Las palabras están conectadas con otras palabras. Ayuda a recordar la palabra mucho mejor cuando sabes cómo se conecta con otras palabras.",targetWord:"Perro",hypernym:"Hiperónimo",hypernymWord:"Animal",synonym:"Sinónimo",synonymWord:"Perrito (vovse)",antonym:"Antónimo",antonymWord:"Gato",hyponym:"Hipónimo",hyponymWord:"Caniche",geminiBtnText:"Aprender una palabra - haz clic aquí",geminiConsentText:"Al hacer clic en este enlace, aceptas que estás utilizando un producto de Google y que Google entrena la inteligencia artificial con tus respuestas.",hverdagssamtale:"Conversación diaria",hverdagssamtaleDesc:"Practica conversaciones comunes sobre la vida diaria.",samtaleBolig:"Conversación sobre vivienda",samtaleArbejde:"Conversación sobre trabajo",samtaleBtnText:"Empezar la conversación - haz clic aquí",skriveHjaelpBtnText:"Ayuda con la escritura - haz clic aquí",du1mod3Desc:"Elige un tema para practicar.",minHverdag:"Mi vida diaria",minBolig:"Mi vivienda",mitArbejde:"Mi trabajo",minHverdagDesc:"Tareas sobre tu vida cotidiana.",transportSprogskole:"Transporte a la escuela",madlavning:"Cocina",rengoering:"Limpieza",transportDesc:"¿Cómo vienes a la escuela?",padletDesc:"Comparte con la clase cómo has llegado a la escuela hoy.",padletBtnText:"Abrir Padlet",madlavningDesc:"¿Qué tipo de comida te gusta cocinar?",madlavningPadletDesc:"Comparte tus experiencias culinarias con la clase aquí.",rengoeringDesc:"¿Cómo haces la limpieza?",rengoeringPadletDesc:"Comparte tus pensamientos sobre la limpieza con la clase.",traenTidsudtryk:"Entrenamiento de expresiones de tiempo",traenTidsudtrykDesc:"¿Cómo se usan las diferentes expresiones de tiempo en danés?",traenTidsudtrykBtnText:"Abrir ejercicio de expresiones de tiempo",ordstilling:"Orden de las palabras",ordstillingDesc:"Reorganiza las palabras y ponlas en el orden correcto.",checkResult:"Comprobar respuesta",correctOrder:"¡Genial! El orden es correcto.",wrongOrder:"No es correcto. ¡Inténtalo de nuevo!",ordstillingLet:"Orden de las palabras (Fácil)",ordstillingSvaer:"Orden de las palabras (Difícil)",levelA1:"Frases A1",levelA2:"Frases A2",traenGrammatik:"Practicar Gramática",grammatikDesc:"Completa los huecos con las palabras correctas en el texto.",let:"Fácil (A1)",mellemsvaer:"Intermedio (A2)",svaer:"Difícil (B1)",grammatikIntro:"Selecciona un nivel para comenzar el ejercicio.",checkAnswers:"Comprobar todas las respuestas",allCorrect:"¡Fantástico! Todas las respuestas son correctas.",someWrong:"Algunas de tus respuestas no son del todo correctas. ¡Inténtalo de nuevo!",newExercise:"Siguiente texto",hintMean:"Esta palabra no tiene sentido en este contexto.",hintTense:"Comprueba el tiempo verbal. ¿Es presente o pasado?",hintForm:"Comprueba la forma de la palabra (p. ej., género o singular/plural).",hintPerson:"Comprueba quién realiza la acción (yo, tú, él/ella).",hintContext:"Lee todo el texto de nuevo. ¿Qué encaja mejor aquí?",hintName:"Necesitas una palabra para nombres aquí.",hintPlace:"Necesitas una palabra para lugares aquí.",hintAction:"Esta palabra describe una acción diferente.",nextPhase:"Siguiente fase →",nextExercise:"Siguiente ejercicio →",nextCategory:"Siguiente categoría →",next:"Siguiente →",filled:"rellenado",correct:"correcto",filledProgress:"{n} / {total} rellenado",correctProgress:"{n} / {total} correcto",selectAnchor:"Seleccionar ancla...",selectTense:"Seleccionar tiempo...",tenseNow:"(ahora)",tensePast:"(ayer)",tenseFuture:"(luego)",pastTense:"Pretérito",presentTense:"Presente",futureTense:"Futuro",groundingRelation:"Mit barn (relación)",groundingIndefinite:"Et barn (indefinido)",groundingDistal:"Det barn (distal/señalar)",groundingProximal:"Dette barn (proximal/cercanía)",dragInstruction:"Arrastra las palabras al suelo para construir tu frase.",sentenceLabel:"Frase:",finishBtn:"Terminar y volver",modalTeaserTitle:"¿Quieres practicar más?",modalTeaserText:"Frase construida... pero ¿quién tiene el control en realidad? ¿Existe una fuerza invisible entre el niño y la comida?",modalVerbLabel:"Verbos modales (fuerza invisible)",bestemthedLabel:"Definición - En / et",pronomenLabel:"Pronombres - Han/Ham/Hans",verberLabel:"Verbos - Går/gik/gået",groundingSuccess:"¡Excelente! Mira la animación de abajo.",groundingFinalMsg:"¡Excelente! Ahora has construido una frase que está anclada en la realidad.",modalForceTitle:"Verbos modales: la fuerza invisible",modalForceSubtitle:'Los verbos modales no cambian la acción, sino que cambian la "fuerza" que hay detrás de ella.',modalForceSkal:"<strong>SKAL (fuerza social):</strong> Una fuerza externa o un plan inevitable empuja al niño hacia la acción. No hay otra opción.",modalForceMaa:'<strong>MÅ (eliminación de barrera):</strong> El camino está bloqueado, pero el verbo modal "må" elimina la barrera y da permiso.',modalForceVil:"<strong>VIL (deseo interno):</strong> La fuerza proviene del interior del propio niño. Es un deseo o una voluntad que tira en dirección a la comida.",modalForceKan:"<strong>KAN (capacidad/potencial):</strong> El niño tiene la energía y la capacidad de realizar la acción. Es un recurso interno.",modalPracticeLabel:"Verbos modales: kan, vil, skal y må",modalForcePlaceholder:"Selecciona un verbo modal para ver la fuerza",whyConjugateFirst:"¿Por qué conjugamos solo la primera palabra? ↓",whyConjugateAdjectives:"¿Por qué conjugamos los adjetivos? ↓",noun:"Sustantivo",adjective:"Adjetivo",verb:"Verbo",adverb:"Adverbio",conjunction:"Conjunción",handlingLabel:"Acción",projektørLabel:"Proyector",sentenceNode1:"Frase 1",sentenceNode2:"Frase 2",example:"Ejemplo:",exampleBarn:"Niño (Et)",exampleBil:"Coche (En)",advLangsomt:"lentamente",advHurtigt:"rápidamente",advMeget:"muy",advLidt:"un poco",positiveLabelSimple:"Forma básica",comparativeLabelSimple:"Grado más alto",superlativeLabelSimple:"Grado más elevado",comparisonBubbleComp:"¡Es <strong>más</strong> que el primero!",comparisonBubbleSuper:"¡Es el <strong>más</strong> de todos!",conjExpl_fordi:"La flecha se mueve de izquierda a derecha, señalando la <strong>causa</strong> (¿Por qué está comiendo el niño?).",conjExpl_derfor:"La flecha se mueve de derecha a izquierda, señalando de vuelta a la <strong>causa</strong> en la primera frase.",conjExpl_da:"El reloj se mueve hacia la izquierda, mostrando que algo sucedió una vez en el <strong>pasado</strong>.",conjExpl_naar:"El reloj se mueve hacia la derecha, mostrando una acción en el <strong>futuro</strong> o algo que sucede <strong>cada vez</strong> (hábito).",conjExpl_selvom:"La barrera debe dividirse porque la 'concesión' (selvom) permite que la acción ocurra <strong>a pesar de la resistencia</strong>.",conjExpl_alligevel:"La flecha pasa <strong>a través</strong> de la barrera, mostrando que la acción ocurrió a pesar de todo.",conjExpl_men:"El arco sobre la barrera muestra una transición o <strong>contraste</strong> entre dos ideas diferentes.",adjFeedback1:"Aquí es simplemente una descripción de una cosa (el pájaro).",adjFeedback2:"Aquí se comparan dos personas.",adjFeedback3:"Aquí se destaca un árbol por encima de todos los demás.",adjFeedback4:"Aquí es una descripción de varias cosas (las manzanas).",adjFeedback5:"Aquí se describe a un niño específico.",adjFeedback6:"Aquí se compara el tamaño de dos cosas.",adjFeedback7:"Aquí es simplemente una descripción de una cosa (la sonrisa).",adjFeedback8:"Aquí se destaca un día por encima de todos los demás días.",adjFeedback9:"Aquí se describen algunas flores específicas.",adjFeedback10:"Aquí es simplemente una descripción de una cosa (la hierba).",exerciseSetCounter:"Conjunto {n} / {total}",practiceMoreInflections:"Practicar más con flexões"}},L={lang:localStorage.getItem("appLang")||null,currentView:"language"};function ee(){return L.lang||"da"}function e(m,s={}){const t=Q[ee()];let r=t&&t[m]?t[m]:Q.da[m]||m;return Object.keys(s).forEach(n=>{r=r.replace(`{${n}}`,s[n])}),r}function te(m){L.lang=m,localStorage.setItem("appLang",m)}function ne(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("h1");r.textContent="Træning i dansk";const n=document.createElement("p");n.className="subtitle",n.textContent="Vælg sprog / Select language";const g=document.createElement("div");g.className="lang-list",[{code:"da",label:"Dansk"},{code:"en",label:"English"},{code:"ar",label:"العربية"},{code:"ur",label:"اردو"},{code:"zh",label:"中文"},{code:"ru",label:"Русский"},{code:"ne",label:"नेपाली"},{code:"th",label:"ไทย"},{code:"pt",label:"Português"},{code:"vi",label:"Tiếng Việt"},{code:"fa",label:"فارسی"},{code:"tr",label:"Türkçe"},{code:"es",label:"Español"}].forEach(l=>{const c=document.createElement("button");c.className="lang-btn",c.textContent=l.label,c.onclick=()=>{te(l.code),s("main")},g.appendChild(c)}),t.appendChild(r),t.appendChild(n),t.appendChild(g),m.appendChild(t)}function re(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("h1");r.textContent=e("title");const n=document.createElement("p");n.className="subtitle",n.textContent=e("subtitle");const g=document.createElement("div");g.className="top-bar",g.style.justifyContent="flex-end",g.style.marginBottom="20px";const o=document.createElement("button");o.className="back-btn",o.textContent="🌐 "+e("selectLanguage"),o.onclick=()=>s("language"),g.appendChild(o);const l=[{icon:"✨",titleKey:"dagensOpgave",descKey:"dagensOpgaveDesc",action:()=>s("dagens_opgave")},{icon:"🎓",titleKey:"modulTest",descKey:"modulTestDesc",action:()=>alert("Mock: Gå til Træning til modultest")},{icon:"📘",titleKey:"notes",descKey:"notesDesc",action:()=>s("notes")},{icon:"💬",titleKey:"lavSporgsmal",descKey:"lavSporgsmalDesc",action:()=>s("lav_sporgsmal")},{icon:"🗣️",titleKey:"samtaleTraening",descKey:"samtaleTraeningDesc",action:()=>s("samtale_traening")},{icon:"✍️",titleKey:"skriveHjaelp",descKey:"skriveHjaelpDesc",action:()=>s("skrive_hjaelp")},{icon:"🏃",titleKey:"verbumLearning",descKey:"verbumLearningDesc",action:()=>s("verbum_menu")}],c=document.createElement("div");c.className="grid",l.forEach(i=>{const p=document.createElement("div");p.className="card",p.onclick=i.action;const d=document.createElement("div");d.className="card-icon",d.textContent=i.icon;const h=document.createElement("div");h.className="card-title",h.textContent=e(i.titleKey);const v=document.createElement("div");v.className="card-desc",v.textContent=e(i.descKey),p.appendChild(d),p.appendChild(h),p.appendChild(v),c.appendChild(p)});const a=document.createElement("footer");a.innerHTML='© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.',t.appendChild(g),t.appendChild(r),t.appendChild(n),t.appendChild(c),t.appendChild(a),m.appendChild(t)}function ae(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("main"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("notes");const o=document.createElement("p");o.className="subtitle",o.textContent=e("notesDesc");const l=(p,d,h)=>{if(localStorage.getItem(`access_${p}`)===h){s(d);return}const f=prompt(e("enterPassword"));f===h?(localStorage.setItem(`access_${p}`,h),s(d)):f!==null&&alert("Forkert adgangskode / Incorrect password")},c=[{icon:"📓",titleKey:"du1mod3",descKey:"",action:()=>l("du1_mod3","du1_modul3","dansk103")},{icon:"📖",titleKey:"du2mod1",descKey:"",action:()=>l("du2_mod1","du2_modul1","dansk307")},{icon:"📂",titleKey:"du2mod5",descKey:"",action:()=>s("du2_modul5")},{icon:"📚",titleKey:"du3mod4",descKey:"",action:()=>alert("Mock: Åbner DU3, modul 4")}],a=document.createElement("div");a.className="grid",c.forEach(p=>{const d=document.createElement("div");d.className="card",d.onclick=p.action;const h=document.createElement("div");h.className="card-icon",h.textContent=p.icon;const v=document.createElement("div");if(v.className="card-title",v.textContent=e(p.titleKey),d.appendChild(h),d.appendChild(v),p.descKey){const f=document.createElement("div");f.className="card-desc",f.textContent=e(p.descKey),d.appendChild(f)}a.appendChild(d)});const i=document.createElement("footer");i.innerHTML='© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.',t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(a),t.appendChild(i),m.appendChild(t)}function ie(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("main"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("dagensOpgave");const o=document.createElement("p");o.className="subtitle",o.textContent=e("dagensOpgaveDesc");const l=[{icon:"🧠",titleKey:"laerEtNytOrd",descKey:"laerEtNytOrdDesc",action:()=>s("word_learning")},{icon:"⏰",titleKey:"traenTidsudtryk",descKey:"traenTidsudtrykDesc",action:()=>s("traen_tidsudtryk")},{icon:"📖",titleKey:"traenGrammatik",descKey:"grammatikDesc",action:()=>s("traen_grammatik")},{icon:"🕰️",titleKey:"verberDatidRegelm",action:()=>s("verbum_learning",{categoryId:"datid_regelm"})},{icon:"🕰️",titleKey:"verberDatid",action:()=>s("verbum_learning",{categoryId:"datid"})},{icon:"🧩",titleKey:"ordstilling",descKey:"ordstillingDesc",action:()=>s("ordstilling")},{icon:"🫂",titleKey:"hvilketOrd",descKey:"hvilketOrdDesc",action:()=>s("pronomen")},{icon:"🏗️",titleKey:"howToBuildSentence",descKey:"howToBuildSentenceDesc",action:()=>s("grounding")}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const i=document.createElement("div");i.className="card",i.onclick=a.action;const p=document.createElement("div");p.className="card-icon",p.textContent=a.icon;const d=document.createElement("div");if(d.className="card-title",d.textContent=e(a.titleKey),i.appendChild(p),i.appendChild(d),a.descKey){const h=document.createElement("div");h.className="card-desc",h.textContent=e(a.descKey),i.appendChild(h)}c.appendChild(i)}),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(c),m.appendChild(t)}function oe(m,s){const t=document.createElement("div");t.className="view-container word-learning-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("dagens_opgave"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("laerEtNytOrd");const o=document.createElement("style");o.textContent=`
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
  `,t.appendChild(o);const l=document.createElement("div");l.className="semantic-network",[{class:"node center",label:e("targetWord"),hint:""},{class:"node top",label:e("hypernymWord"),hint:e("hypernym")},{class:"node bottom",label:e("hyponymWord"),hint:e("hyponym")},{class:"node left",label:e("synonymWord"),hint:e("synonym")},{class:"node right",label:e("antonymWord"),hint:e("antonym")}].forEach(f=>{const T=document.createElement("div");T.className=f.class;const u=document.createElement("div");if(u.className="word",u.textContent=f.label,T.appendChild(u),f.hint){const b=document.createElement("div");b.className="hint",b.textContent=f.hint,T.appendChild(b)}l.appendChild(T)}),l.insertAdjacentHTML("afterbegin",`
      <svg class="network-lines" xmlns="http://www.w3.org/2000/svg">
        <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
      </svg>
    `);const a=document.createElement("p");a.className="word-explanation",a.textContent=e("wordNetworkExplanation");const i=document.createElement("div");i.className="consent-container";const p=document.createElement("input");p.type="checkbox",p.className="consent-checkbox",p.id="gemini-consent";const d=document.createElement("label");d.htmlFor="gemini-consent",d.className="consent-text",d.textContent=e("geminiConsentText"),i.appendChild(p),i.appendChild(d);const h=document.createElement("div");h.className="gemini-btn-container";const v=document.createElement("a");v.href="https://gemini.google.com/gem/1053Zk0akFAs0u3zMgYkZbtae9CO55Tyb?usp=sharing",v.target="_blank",v.className="gemini-btn disabled",v.textContent=e("geminiBtnText"),h.appendChild(v),p.addEventListener("change",f=>{f.target.checked?v.classList.remove("disabled"):v.classList.add("disabled")}),t.appendChild(r),t.appendChild(g),t.appendChild(l),t.appendChild(a),t.appendChild(i),t.appendChild(h),m.appendChild(t)}function se(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("main"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("samtaleTraening");const o=document.createElement("p");o.className="subtitle",o.textContent=e("samtaleTraeningDesc");const l=[{icon:"🗣",titleKey:"hverdagssamtale",action:()=>s("samtale_hverdag")},{icon:"🏠",titleKey:"samtaleBolig",action:()=>alert("Mock: Åbner "+e("samtaleBolig"))},{icon:"💼",titleKey:"samtaleArbejde",action:()=>alert("Mock: Åbner "+e("samtaleArbejde"))}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const i=document.createElement("div");i.className="card",i.onclick=a.action;const p=document.createElement("div");p.className="card-icon",p.textContent=a.icon;const d=document.createElement("div");d.className="card-title",d.textContent=e(a.titleKey),i.appendChild(p),i.appendChild(d),c.appendChild(i)}),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(c),m.appendChild(t)}function le(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("samtale_traening"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("hverdagssamtale");const o=document.createElement("p");o.className="subtitle",o.textContent=e("hverdagssamtaleDesc");const l=document.createElement("div");l.className="consent-container";const c=document.createElement("input");c.type="checkbox",c.className="consent-checkbox",c.id="gemini-consent-samtale";const a=document.createElement("label");a.htmlFor="gemini-consent-samtale",a.className="consent-text",a.textContent=e("geminiConsentText"),l.appendChild(c),l.appendChild(a);const i=document.createElement("div");i.className="gemini-btn-container";const p=document.createElement("a");p.href="https://gemini.google.com/gem/1SX-yUWDxh31wEL0RZ7BSacdDUvWGtn-8?usp=sharing",p.target="_blank",p.className="gemini-btn disabled",p.textContent=e("samtaleBtnText"),i.appendChild(p),c.addEventListener("change",d=>{d.target.checked?p.classList.remove("disabled"):p.classList.add("disabled")}),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(l),t.appendChild(i),m.appendChild(t)}function de(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("main"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("skriveHjaelp");const o=document.createElement("p");o.className="subtitle",o.textContent=e("skriveHjaelpDesc");const l=document.createElement("div");l.className="consent-container";const c=document.createElement("input");c.type="checkbox",c.className="consent-checkbox",c.id="gemini-consent-skrive";const a=document.createElement("label");a.htmlFor="gemini-consent-skrive",a.className="consent-text",a.textContent=e("geminiConsentText"),l.appendChild(c),l.appendChild(a);const i=document.createElement("div");i.className="gemini-btn-container";const p=document.createElement("a");p.href="https://gemini.google.com/gem/1Ke_Ges6JxMDC51hTM744lHSQm_fi9BhQ?usp=sharing",p.target="_blank",p.className="gemini-btn disabled",p.textContent=e("skriveHjaelpBtnText"),i.appendChild(p),c.addEventListener("change",d=>{d.target.checked?p.classList.remove("disabled"):p.classList.add("disabled")}),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(l),t.appendChild(i),m.appendChild(t)}function ce(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("notes"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("du1mod3");const o=document.createElement("p");o.className="subtitle",o.textContent=e("du1mod3Desc");const l=[{icon:"📅",titleKey:"minHverdag",action:()=>s("du1_min_hverdag")},{icon:"🏠",titleKey:"minBolig",action:()=>alert("Mock: Åbner "+e("minBolig"))},{icon:"💼",titleKey:"mitArbejde",action:()=>alert("Mock: Åbner "+e("mitArbejde"))}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const i=document.createElement("div");i.className="card",i.onclick=a.action;const p=document.createElement("div");p.className="card-icon",p.textContent=a.icon;const d=document.createElement("div");d.className="card-title",d.textContent=e(a.titleKey),i.appendChild(p),i.appendChild(d),c.appendChild(i)}),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(c),m.appendChild(t)}function me(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("du1_modul3"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("minHverdag");const o=document.createElement("p");o.className="subtitle",o.textContent=e("minHverdagDesc");const l=[{icon:"🚌",titleKey:"transportSprogskole",action:()=>s("transport_sprogskole")},{icon:"🍳",titleKey:"madlavning",action:()=>s("du1_madlavning")},{icon:"🧹",titleKey:"rengoering",action:()=>s("du1_rengoering")}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const i=document.createElement("div");i.className="card",i.onclick=a.action;const p=document.createElement("div");p.className="card-icon",p.textContent=a.icon;const d=document.createElement("div");d.className="card-title",d.textContent=e(a.titleKey),i.appendChild(p),i.appendChild(d),c.appendChild(i)}),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(c),m.appendChild(t)}function ge(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("du1_min_hverdag"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("transportSprogskole");const o=document.createElement("p");o.className="subtitle",o.textContent=e("transportDesc");const l=document.createElement("div");l.className="thematic-content";const c=document.createElement("div");c.className="thematic-image-container";const a=document.createElement("img");a.src=`${baseUrl}Gemini_Generated_Image_bnobabnobabnobab.png`,a.alt="Transport illustration",c.appendChild(a);const i=document.createElement("div");i.className="thematic-link-container";const p=document.createElement("p");p.className="thematic-link-text",p.textContent=e("padletDesc");const d=document.createElement("a");d.href="https://padlet.com/mibf/hvordan-kommer-du-til-sprogskole-gm97y985khw1csk1",d.target="_blank",d.className="padlet-btn",d.textContent=e("padletBtnText"),i.appendChild(p),i.appendChild(d),l.appendChild(c),l.appendChild(i),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(l),m.appendChild(t)}function pe(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("du1_min_hverdag"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("madlavning");const o=document.createElement("p");o.className="subtitle",o.textContent=e("madlavningDesc");const l=document.createElement("div");l.className="thematic-content";const c=document.createElement("div");c.className="thematic-image-container";const a=document.createElement("img");a.src=`${baseUrl}mad.png`,a.alt="Madlavning illustration",c.appendChild(a);const i=document.createElement("div");i.className="thematic-link-container";const p=document.createElement("p");p.className="thematic-link-text",p.textContent=e("madlavningPadletDesc");const d=document.createElement("a");d.href="https://padlet.com/mibf/b-rn-og-mad-fvyr130ka0n9f2yu",d.target="_blank",d.className="padlet-btn",d.textContent=e("padletBtnText"),i.appendChild(p),i.appendChild(d),l.appendChild(c),l.appendChild(i),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(l),m.appendChild(t)}function ue(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("du1_min_hverdag"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("rengoering");const o=document.createElement("p");o.className="subtitle",o.textContent=e("rengoeringDesc");const l=document.createElement("div");l.className="thematic-content";const c=document.createElement("div");c.className="grid",c.style.maxWidth="800px",["rent1.png","rent2.png"].forEach(d=>{const h=document.createElement("div");h.className="thematic-image-container";const v=document.createElement("img");v.src=`${baseUrl}${d}`,v.alt="Rengøring illustration",h.appendChild(v),c.appendChild(h)});const a=document.createElement("div");a.className="thematic-link-container";const i=document.createElement("p");i.className="thematic-link-text",i.textContent=e("rengoeringPadletDesc");const p=document.createElement("a");p.href="https://padlet.com/mibf/jeg-g-r-rent-5udv7g0gczbo7vq9",p.target="_blank",p.className="padlet-btn",p.textContent=e("padletBtnText"),a.appendChild(i),a.appendChild(p),l.appendChild(c),l.appendChild(a),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(l),m.appendChild(t)}function he(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("notes"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("du2mod1");const o=document.createElement("p");o.className="subtitle",o.textContent=e("du1mod3Desc");const l=[{icon:"📚",titleKey:"smaahistorier",action:()=>s("smaa_historier")}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const i=document.createElement("div");i.className="card",i.onclick=a.action;const p=document.createElement("div");p.className="card-icon",p.textContent=a.icon;const d=document.createElement("div");d.className="card-title",d.textContent=e(a.titleKey),i.appendChild(p),i.appendChild(d),c.appendChild(i)}),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(c),m.appendChild(t)}function be(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("du2_modul1"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("smaahistorier");const o=document.createElement("p");o.className="subtitle",o.textContent=e("du1mod3Desc");const l=[{icon:"📝",title:"Lisa og Jens",action:()=>window.open("https://padlet.com/mibf/historie-om-lisa-og-jens-omv7710nz0tnp49","_blank")},{icon:"📝",title:"Andrea",action:()=>window.open("https://padlet.com/mibf/historie-om-andrea-26kzbgxc28yhl436","_blank")}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const i=document.createElement("div");i.className="card",i.onclick=a.action;const p=document.createElement("div");p.className="card-icon",p.textContent=a.icon;const d=document.createElement("div");d.className="card-title",d.textContent=a.title,i.appendChild(p),i.appendChild(d),c.appendChild(i)}),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(c),m.appendChild(t)}function ve(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("notes"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("du2mod5");const o=document.createElement("p");o.className="subtitle",o.textContent=e("du1mod3Desc");const l=[{icon:"📧",titleKey:"emailLaan",action:()=>s("email_laan")},{icon:"👨‍👩‍👧‍👦",titleKey:"opdragelse",action:()=>s("opdragelse")},{icon:"📢",titleKey:"enKlage",action:()=>s("en_klage")}],c=document.createElement("div");c.className="grid",l.forEach(a=>{const i=document.createElement("div");i.className="card",i.onclick=a.action;const p=document.createElement("div");p.className="card-icon",p.textContent=a.icon;const d=document.createElement("div");d.className="card-title",d.textContent=e(a.titleKey),i.appendChild(p),i.appendChild(d),c.appendChild(i)}),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(c),m.appendChild(t)}function ke(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("du2_modul5"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("emailLaan");const o=document.createElement("div");o.className="card",o.style.cursor="pointer",o.onclick=()=>window.open("https://padlet.com/mibf/e-mail-om-l-n-af-penge-pkdkrzrhemi6ftc4","_blank");const l=document.createElement("div");l.className="card-icon",l.textContent="📧";const c=document.createElement("div");c.className="card-title",c.textContent=e("emailLaan")+" (padlet)",o.appendChild(l),o.appendChild(c),t.appendChild(r),t.appendChild(g),t.appendChild(o),m.appendChild(t)}function xe(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("du2_modul5"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("opdragelse");const o=document.createElement("div");o.className="card",o.style.cursor="pointer",o.onclick=()=>window.open("https://padlet.com/mibf/fort-l-om-hvordan-du-blev-opdraget-se-opgave-16-side-48-i-fo-zhgtyifmg9e4f5ut","_blank");const l=document.createElement("div");l.className="card-icon",l.textContent="👨‍👩‍👧‍👦";const c=document.createElement("div");c.className="card-title",c.textContent=e("opdragelse")+" (padlet)",o.appendChild(l),o.appendChild(c),t.appendChild(r),t.appendChild(g),t.appendChild(o),m.appendChild(t)}function fe(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("du2_modul5"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("enKlage");const o=document.createElement("div");o.className="card",o.style.cursor="pointer",o.onclick=()=>window.open("https://padlet.com/mibf/en-klage-fv80qrahnyjw5e45","_blank");const l=document.createElement("div");l.className="card-icon",l.textContent="📢";const c=document.createElement("div");c.className="card-title",c.textContent=e("enKlage")+" (padlet)",o.appendChild(l),o.appendChild(c),t.appendChild(r),t.appendChild(g),t.appendChild(o),m.appendChild(t)}function ye(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("dagens_opgave"),r.appendChild(n),t.appendChild(r);const g=document.createElement("h1");g.textContent=e("traenTidsudtryk");const o=document.createElement("p");o.className="subtitle",o.textContent=e("traenTidsudtrykDesc"),t.appendChild(g),t.appendChild(o);const l=[{text:"Jeg drak kaffe [blank_0].",blanks:[{answer:"i morges",options:["i morges","i morgen","nu"],hint:"Se på verbet 'drak'. Er det nutid eller datid?"}]},{text:"Vi drikker vand [blank_0].",blanks:[{answer:"nu",options:["nu","i går","på torsdag"],hint:"Se på verbet 'drikker'. Er det nutid eller datid?"}]},{text:"Han skal til lægen [blank_0].",blanks:[{answer:"i morgen",options:["i morgen","i går","nu"],hint:"Se på verbet 'skal'. Det indikerer noget, der sker senere."}]},{text:"Hun var i biografen [blank_0].",blanks:[{answer:"i går",options:["i går","nu","i næste uge"],hint:"Se på verbet 'var'. Er det nutid eller datid?"}]},{text:"De spiller fodbold [blank_0].",blanks:[{answer:"om søndagen",options:["om søndagen","i går","på fredag"],hint:"Her beskrives noget, man gør hver uge."}]},{text:"Vi rejser til Spanien [blank_0].",blanks:[{answer:"i næste uge",options:["i næste uge","nu","i går"],hint:"Det er en plan for fremtiden."}]},{text:"Jeg læste en bog [blank_0].",blanks:[{answer:"i lørdags",options:["i lørdags","på søndag","i morgen"],hint:"Se på verbet 'læste'. Er det nutid eller datid?"}]},{text:"[blank_0] drikker vi kaffe.",blanks:[{answer:"Om morgenen",options:["Om morgenen","I går","I morgen"],hint:"Vi gør det som en vane hver dag."}]},{text:"[blank_0] var jeg træt.",blanks:[{answer:"I går",options:["I går","Nu","På mandag"],hint:"Se på verbet 'var'. Det er datid."}]},{text:"Jeg køber ind [blank_0].",blanks:[{answer:"i morgen",options:["i morgen","nu","i går"],hint:"Her er tale om en plan for fremtiden."}]},{text:"[blank_0] skal vi på ferie.",blanks:[{answer:"I næste måned",options:["I næste måned","I går","Nu"],hint:"Det er noget, der skal ske i fremtiden."}]},{text:"Vi går en tur [blank_0].",blanks:[{answer:"hver dag",options:["hver dag","i går","i morgen"],hint:"Det er noget, vi gør fast."}]},{text:"[blank_0] drak jeg en øl.",blanks:[{answer:"I fredags",options:["I fredags","Nu","På søndag"],hint:"Se på verbet 'drak'. Det er datid."}]},{text:"[blank_0] skal hun til fest.",blanks:[{answer:"På lørdag",options:["På lørdag","I går","Nu"],hint:"Det er en plan for fremtiden."}]},{text:"De ser fjernsyn [blank_0].",blanks:[{answer:"nu",options:["nu","i går","på torsdag"],hint:"Det foregår lige nu."}]}];let c=0;const a=document.createElement("div");a.className="exercise-card",t.appendChild(a);function i(){a.innerHTML="";const p=l[c],d=document.createElement("div");d.className="exercise-progress",d.style.textAlign="center",d.style.marginBottom="1rem",d.style.fontSize="0.9rem",d.style.opacity="0.7",d.textContent=`${c+1} / ${l.length}`,a.appendChild(d);const h=document.createElement("div");h.className="grammatik-text-container",p.text.split(/(\[blank_\d+\])/).forEach(j=>{const E=j.match(/\[blank_(\d+)\]/);if(E){const k=E[1],w=document.createElement("span");w.className="select-wrapper";const C=document.createElement("select");C.className="grammatik-select",C.dataset.idx=k;const H=document.createElement("option");H.value="",H.textContent="...",C.appendChild(H),p.blanks[k].options.forEach(S=>{const y=document.createElement("option");y.value=S,y.textContent=S,C.appendChild(y)}),w.appendChild(C),h.appendChild(w)}else{const k=document.createElement("span");k.textContent=j,h.appendChild(k)}}),a.appendChild(h);const f=document.createElement("div");f.className="exercise-feedback",a.appendChild(f);const T=document.createElement("div");T.className="game-controls";const u=document.createElement("button");u.className="gemini-btn",u.textContent=e("checkAnswers"),u.onclick=()=>{const j=h.querySelectorAll("select");let E=!0,k="";j.forEach(w=>{const C=w.dataset.idx;w.value===p.blanks[C].answer?(w.classList.add("correct"),w.classList.remove("wrong")):(w.classList.add("wrong"),w.classList.remove("correct"),E=!1,k||(k=p.blanks[C].hint))}),E?(f.style.display="none",u.style.display="none",b.style.display="inline-block"):(f.textContent=k||e("hintContext"),f.style.display="block")};const b=document.createElement("button");b.className="gemini-btn",b.textContent=c<l.length-1?e("next"):e("finish"),b.style.display="none",b.onclick=()=>{c<l.length-1?(c++,i()):s("dagens_opgave")},T.appendChild(u),T.appendChild(b),a.appendChild(T)}i(),m.appendChild(t)}function we(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("main"),r.appendChild(n);const g=document.createElement("h1");g.textContent=e("lavSporgsmal");const o=document.createElement("p");o.className="subtitle",o.textContent=e("lavSporgsmalDesc");const l=document.createElement("div");l.className="thematic-image-container",l.style.margin="2rem auto";const c=document.createElement("img");c.src=`${G}questions.png`,c.alt="Spørgsmålsdannelse illustration",l.appendChild(c);const a=document.createElement("div");a.className="consent-container";const i=document.createElement("input");i.type="checkbox",i.className="consent-checkbox",i.id="gemini-consent-lav-sporgsmal";const p=document.createElement("label");p.htmlFor="gemini-consent-lav-sporgsmal",p.className="consent-text",p.textContent=e("geminiConsentText"),a.appendChild(i),a.appendChild(p);const d=document.createElement("div");d.className="gemini-btn-container";const h=document.createElement("a");h.href="https://gemini.google.com/gem/1OKZRFhv_TlP2M32ApMHWsFVh4aCLHdNU?usp=sharing",h.target="_blank",h.className="gemini-btn disabled",h.textContent=e("lavSporgsmalBtnText"),d.appendChild(h),i.addEventListener("change",v=>{v.target.checked?h.classList.remove("disabled"):h.classList.add("disabled")}),t.appendChild(r),t.appendChild(g),t.appendChild(o),t.appendChild(l),t.appendChild(a),t.appendChild(d),m.appendChild(t)}function Ce(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.innerHTML=`← ${e("back")}`,n.onclick=()=>{l.style.display==="block"?(l.style.display="none",o.style.display="block",g.textContent=e("ordstilling")):s("dagens_opgave")},r.appendChild(n),t.appendChild(r);const g=document.createElement("h1");g.textContent=e("ordstilling"),t.appendChild(g);const o=document.createElement("div"),l=document.createElement("div");l.style.display="none";const c=document.createElement("p");c.className="subtitle",c.textContent=e("ordstillingDesc"),o.appendChild(c);const a=[{key:"let",level:"A1",icon:"🌱"},{key:"mellemsvaer",level:"A2",icon:"🌿"}],i=document.createElement("div");i.className="grid",a.forEach(d=>{const h=document.createElement("div");h.className="card",h.onclick=()=>p(d.level);const v=document.createElement("div");v.className="card-icon",v.textContent=d.icon;const f=document.createElement("div");f.className="card-title",f.textContent=e(d.key),h.appendChild(v),h.appendChild(f),i.appendChild(h)}),o.appendChild(i),t.appendChild(o);function p(d){o.style.display="none",l.style.display="block",l.innerHTML="",g.textContent=e(d==="A1"?"ordstillingLet":"ordstillingSvaer");const f=d==="A1"?["Jeg hedder Mikael.","Jeg kommer fra Danmark.","Hvor gammel er du?","Jeg bor i København.","Hvad laver du?","Jeg har en hund.","Min bil er rød.","Kaffen er varm."]:["Solen skinner altid i min have.","Jeg kan godt lide at lære dansk.","Vi ses i morgen på sprogskolen.","Kan du tale dansk og engelsk?","I går var jeg i biografen med min ven.","Jeg skal købe ind i supermarkedet nu.","Hvorfor kom du ikke til festen?","Det er vigtigt at øve sig hver dag."];let T=Math.floor(Math.random()*f.length),u,b,j,E;function k(){u=f[T],b=u.split(" "),j=[...b].sort(()=>Math.random()-.5),E=[]}const w=document.createElement("div");w.className="result-sentence-area";const C=document.createElement("div");C.className="word-pool";const H=document.createElement("div");H.className="game-feedback";const S=document.createElement("div");S.className="game-controls";const y=document.createElement("button");y.className="gemini-btn",y.textContent=e("checkResult"),y.onclick=()=>{E.join(" ")===u?(H.textContent=e("correctOrder"),H.className="game-feedback success",y.style.display="none",A.style.display="inline-block"):(H.textContent=e("wrongOrder"),H.className="game-feedback error")};const A=document.createElement("button");A.className="gemini-btn",A.textContent=e("next"),A.style.display="none",A.onclick=()=>{T=(T+1)%f.length,N()};function N(){k(),l.innerHTML="";const D=document.createElement("img");D.src=G+"v2_master_diagram.png",D.className="v2-illustration",l.appendChild(D),l.appendChild(w),l.appendChild(C),l.appendChild(H),S.innerHTML="",S.appendChild(y),S.appendChild(A),l.appendChild(S),y.style.display="inline-block",A.style.display="none",H.textContent="",x()}function x(){C.innerHTML="",j.forEach((D,B)=>{const F=document.createElement("div");F.className="word-chip",F.textContent=D,F.onclick=()=>{j.splice(B,1),E.push(D),x()},C.appendChild(F)}),w.innerHTML="",E.length===0?w.innerHTML='<div class="result-placeholder">...</div>':E.forEach((D,B)=>{const F=document.createElement("div");F.className="word-chip result-chip",F.textContent=D,F.onclick=()=>{E.splice(B,1),j.push(D),x()},w.appendChild(F)})}N()}if(t.appendChild(l),m.appendChild(t),!document.getElementById("ordstilling-styles")){const d=document.createElement("style");d.id="ordstilling-styles",d.textContent=`
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
        `,document.head.appendChild(d)}}function je(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.innerHTML=`← ${e("back")}`,n.onclick=()=>s("main"),r.appendChild(n),t.appendChild(r);const g=document.createElement("h1");g.textContent=e("traenGrammatik"),t.appendChild(g);const o=document.createElement("div"),l=document.createElement("div");l.style.display="none";const c=document.createElement("p");c.className="subtitle",c.textContent=e("grammatikIntro"),o.appendChild(c);const a=[{key:"let",level:"A1",icon:"🌱"},{key:"mellemsvaer",level:"A2",icon:"🌿"},{key:"svaer",level:"B1",icon:"🌳"},{key:"modultest",level:"modultest",icon:"🎓"}],i=document.createElement("div");i.className="grid",a.forEach(d=>{const h=document.createElement("div");h.className="card",h.onclick=()=>p(d.level);const v=document.createElement("div");v.className="card-icon",v.textContent=d.icon;const f=document.createElement("div");f.className="card-title",f.textContent=e(d.key),h.appendChild(v),h.appendChild(f),i.appendChild(h)}),o.appendChild(i),t.appendChild(o);function p(d){o.style.display="none",l.style.display="block",l.innerHTML="";const h=document.createElement("h2");h.textContent=e(d==="A1"?"let":d==="A2"?"mellemsvaer":d==="B1"?"svaer":"modultest"),h.style.textAlign="center",l.appendChild(h);const v=Ee(d);let f=0;function T(){l.innerHTML="",l.appendChild(h);const u=v[f];if(d==="modultest"){const y=document.createElement("div");y.className="word-list-hint";const N=[...u.blanks.map(x=>x.answer)].sort(()=>Math.random()-.5);y.textContent=N.join(", "),l.appendChild(y)}const b=document.createElement("div");b.className="grammatik-text-container",u.text.split(/(\[blank_\d+\])/).forEach(y=>{const A=y.match(/\[blank_(\d+)\]/);if(A){const N=A[1],x=document.createElement("span");x.className="select-wrapper";const D=document.createElement("select");D.className="grammatik-select",D.dataset.idx=N;const B=document.createElement("option");B.value="",B.textContent="...",D.appendChild(B);let F=[...u.blanks[N].options];F.sort(()=>Math.random()-.5),F.forEach(P=>{const z=document.createElement("option");z.value=P,z.textContent=P,D.appendChild(z)}),x.appendChild(D),b.appendChild(x)}else{const N=document.createElement("span");N.textContent=y,b.appendChild(N)}}),l.appendChild(b);const E=document.createElement("div");E.className="exercise-feedback",l.appendChild(E);const k=document.createElement("div");k.className="grammatik-summary",l.appendChild(k);function w(){const y=b.querySelectorAll("select"),A=Array.from(y).filter(D=>D.value!=="").length,N=Array.from(y).filter(D=>D.classList.contains("correct")).length,x=y.length;A===0?k.textContent="":N===x?(k.innerHTML=`<span class="success">${e("allCorrect")}</span>`,H.style.display="none",S.style.display="block",E.style.display="none"):k.textContent=e("filledProgress",{n:A,total:x})}b.querySelectorAll("select").forEach(y=>{y.onchange=()=>{const A=y.dataset.idx;if(y.value==="")y.classList.remove("correct","wrong"),E.style.display="none";else if(y.value===u.blanks[A].answer)y.classList.add("correct"),y.classList.remove("wrong"),E.style.display="none";else{y.classList.add("wrong"),y.classList.remove("correct");const N=y.value,x=u.blanks[A].hints&&u.blanks[A].hints[N]||"hintContext";E.textContent=e(x),E.style.display="block"}w()}});const C=document.createElement("div");C.className="game-controls";const H=document.createElement("button");H.className="gemini-btn",H.textContent=e("checkAnswers"),H.onclick=()=>{const y=b.querySelectorAll("select");let A=!0,N="";y.forEach(x=>{const D=x.dataset.idx;if(x.value===u.blanks[D].answer)x.classList.add("correct"),x.classList.remove("wrong");else if(x.classList.add("wrong"),x.classList.remove("correct"),A=!1,!N){const B=u.blanks[D].hints&&u.blanks[D].hints[x.value]||"hintContext";N=e(B)}}),!A&&N?(E.textContent=N,E.style.display="block"):A&&(E.style.display="none"),w()};const S=document.createElement("button");S.className="gemini-btn",S.textContent=e("newExercise"),S.style.display="none",S.onclick=()=>{f=(f+1)%v.length,T()},C.appendChild(H),C.appendChild(S),l.appendChild(C),w()}T()}t.appendChild(l),m.appendChild(t)}function Ee(m){return m==="A1"?[{text:"Jeg [blank_0] i København. Jeg har en lille [blank_1]. Her bor jeg sammen med min [blank_2]. Vi [blank_3] ofte mad sammen i køkkenet. Min kone er en rigtig god [blank_4]. Om morgenen [blank_5] vi kaffe. Vi [blank_6] også en avis sammen. Det er en [blank_7] dag i dag. Vi er meget [blank_8] for vores liv.",blanks:[{answer:"bor",options:["bor","spiser","læser"],hints:{spiser:"hintAction",læser:"hintAction"}},{answer:"lejlighed",options:["lejlighed","bil","bord"],hints:{bil:"hintContext",bord:"hintPlace"}},{answer:"kone",options:["kone","ven","hund"],hints:{ven:"hintContext",hund:"hintContext"}},{answer:"laver",options:["laver","drikker","køber"],hints:{drikker:"hintAction",køber:"hintMean"}},{answer:"kok",options:["kok","bog","skole"],hints:{bog:"hintContext",skole:"hintPlace"}},{answer:"drikker",options:["drikker","spiser","ser"],hints:{spiser:"hintMean",ser:"hintAction"}},{answer:"læser",options:["læser","hører","går"],hints:{hører:"hintContext",går:"hintAction"}},{answer:"dejlig",options:["dejlig","sur","kold"],hints:{sur:"hintMean",kold:"hintContext"}},{answer:"glade",options:["glade","trætte","sure"],hints:{trætte:"hintContext",sure:"hintMean"}}]}]:m==="A2"?[{text:"Det er [blank_0] vejr i dag. Solen skinner [blank_1], og vi [blank_2] en tur i den grønne skov. Vi ser mange [blank_3] træer med friske blade. Vi går [blank_4] for at nyde den smukke natur. Fuglene [blank_5] lystigt i trætoppene. Det [blank_6] som om, at sommeren endelig er på vej. Vi [blank_7] os til at spise frokost i det fri bagefter. Det bliver en [blank_8] oplevelse for os alle.",blanks:[{answer:"dejligt",options:["dejligt","langsomt","aldrig"],hints:{langsomt:"hintAdj",aldrig:"hintAdverb"}},{answer:"kraftigt",options:["kraftigt","smukt","ofte"],hints:{smukt:"hintAdj",ofte:"hintAdverb"}},{answer:"går",options:["går","gik","gået"],hints:{gik:"hintTense",gået:"hintTense"}},{answer:"høje",options:["høje","høj","højt"],hints:{høj:"hintForm",højt:"hintForm"}},{answer:"langsomt",options:["langsomt","langsom","hurtig"],hints:{langsom:"hintForm",hurtig:"hintAdj"}},{answer:"synger",options:["synger","sang","sunget"],hints:{sang:"hintTense",sunget:"hintTense"}},{answer:"føles",options:["føles","føler","føltes"],hints:{føler:"hintForm",føltes:"hintTense"}},{answer:"glæder",options:["glæder","glædede","glade"],hints:{glædede:"hintTense",glade:"hintForm"}},{answer:"fantastisk",options:["fantastisk","fantastiske","fantastisket"],hints:{fantastiske:"hintForm",fantastisket:"hintMean"}}]}]:m==="B1"?[{text:"Jeg tager ofte bussen på arbejde, [blank_0] min bil desværre er gået i stykker igen. Selvom det regner [blank_1], foretrækker jeg dog normalt at køre selv. Det er [blank_2] irriterende, da jeg har mange [blank_3] aftaler i løbet af i dag. Jeg [blank_4] dog planlægge min rute [blank_5], så jeg ikke kommer for sent. Heldigvis [blank_6] bussen lige uden for min dør. Hvis jeg [blank_7] mig lidt, kan jeg lige præcis nå den. Det [blank_8] meget tålmodighed at bruge offentlig transport hver eneste dag.",blanks:[{answer:"fordi",options:["fordi","selvom","men"],hints:{selvom:"hintConj",men:"hintConj"}},{answer:"kraftigt",options:["kraftigt","kraftig","kraftige"],hints:{kraftig:"hintForm",kraftige:"hintForm"}},{answer:"temmelig",options:["temmelig","temmelige","temmeligt"],hints:{temmelige:"hintForm",temmeligt:"hintForm"}},{answer:"vigtige",options:["vigtige","vigtig","vigtigt"],hints:{vigtig:"hintForm",vigtigt:"hintForm"}},{answer:"må",options:["må","skal","kan"],hints:{skal:"hintContext",kan:"hintContext"}},{answer:"omhyggeligt",options:["omhyggeligt","omhyggelig","omhyggelige"],hints:{omhyggelig:"hintForm",omhyggelige:"hintForm"}},{answer:"holder",options:["holder","holdt","holdt"],hints:{holdt:"hintTense"}},{answer:"skynder",options:["skynder","skyndte","skyndet"],hints:{skyndte:"hintTense",skyndet:"hintTense"}},{answer:"kræver",options:["kræver","krævede","krævet"],hints:{krævede:"hintTense",krævet:"hintTense"}}]}]:m==="modultest"?[{text:"Velkommen til den store [blank_0], hvor vi skal teste dit danske sprog. Denne tekst er [blank_1] end de andre, da den fylder ti linjer. Du skal læse hele teksten [blank_2] for at forstå sammenhængen rigtigt. Det er vigtigt at du [blank_3] dig om, før du vælger et ord. Der er mange [blank_4] i listen ovenover, som du kan bruge. Hvis du laver en [blank_5], kan du altid prøve igen her. Vi håber at du får alle svar [blank_6] i første forsøg. Det kræver meget [blank_7] at lære et nyt sprog helt perfekt. Men vi ved at du [blank_8] gøre det, hvis du øver dig meget. Rigtig god [blank_9] med denne svære modultest opgave!",blanks:[{answer:"modultest",options:["modultest","eksamen","prøve"]},{answer:"længere",options:["længere","kort","sværere"]},{answer:"grundigt",options:["grundigt","hurtigt","nemt"]},{answer:"umager",options:["umager","gør","passer"]},{answer:"ord",options:["ord","tekster","sætninger"]},{answer:"fejl",options:["fejl","kage","pause"]},{answer:"rigtige",options:["rigtige","forkerte","sjove"]},{answer:"arbejde",options:["arbejde","hygge","mad"]},{answer:"kan",options:["kan","skal","får"]},{answer:"fornøjelse",options:["fornøjelse","lykke","held"]}]}]:[]}function De(m){const s=[[{sentence:"Jeg kan ____ lide at læse.",options:["måske","godt","ikke"],correct:"godt"},{sentence:"Han kommer ____ i morgen.",options:["måske","godt","ikke"],correct:"måske"},{sentence:"Jeg har ____ tid i dag.",options:["måske","godt","ikke"],correct:"ikke"},{sentence:"Vi skal ____ ud at spise.",options:["måske","godt","ikke"],correct:"måske"},{sentence:"De kan ____ svømme.",options:["måske","godt","ikke"],correct:"godt"}],[{sentence:"Du må ____ glemme din taske.",options:["måske","godt","ikke"],correct:"ikke"},{sentence:"Det bliver ____ regnvejr.",options:["måske","godt","ikke"],correct:"måske"},{sentence:"Hun synger meget ____.",options:["måske","godt","ikke"],correct:"godt"},{sentence:"Jeg forstår ____ spørgsmålet.",options:["måske","godt","ikke"],correct:"ikke"},{sentence:"Vi ses ____ på mandag.",options:["måske","godt","ikke"],correct:"måske"}]];let t=0,r=[null,null,null,null,null];function n(){const g=s[t];if(!document.getElementById("adv-choice-styles")){const c=document.createElement("style");c.id="adv-choice-styles",c.textContent=`
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
            `,document.head.appendChild(c)}m.innerHTML=`
            <div class="exercise-container premium-card animate-fade-in adv-choice-container">
                <button id="adv-back-btn" class="back-btn" style="margin-bottom: 1.5rem;">
                    <i class="fas fa-arrow-left"></i> ${e("back")}
                </button>
                
                <div class="adv-choice-header">
                    <h2 style="color: var(--primary-color); margin: 0;">
                        ${e("advChoiceTitle")}
                    </h2>
                    <span class="adv-choice-set-counter">
                        ${e("exerciseSetCounter",{n:t+1,total:2})}
                    </span>
                </div>
                
                <p style="color: var(--text-secondary); margin-bottom: 2.5rem;">
                    ${e("advChoiceDesc")}
                </p>
 
                <div class="questions-list">
                    ${g.map((c,a)=>{const i=c.sentence.split("____"),p=r[a]===null?"rgba(255,255,255,0.1)":r[a]?"#4CAF50":"#F44336";return`
                            <div class="question-row">
                                <span>${i[0]}</span>
                                <select class="adverb-select-input" data-index="${a}" style="border: 2px solid ${p};">
                                    <option value="">...</option>
                                    ${c.options.map(d=>`<option value="${d}" ${r[a]!==null&&c.correct===d?"selected":""}>${d}</option>`).join("")}
                                </select>
                                <span>${i[1]||""}</span>
                                ${r[a]!==null?r[a]?'<i class="fas fa-check" style="color: #4CAF50; margin-left: 0.5rem;"></i>':'<i class="fas fa-times" style="color: #F44336; margin-left: 0.5rem;"></i>':""}
                            </div>
                        `}).join("")}
                </div>
 
                <div class="adv-choice-controls">
                    <button id="check-btn" class="cta-button" style="padding: 0.8rem 1.5rem;">
                        ${e("checkAnswers")}
                    </button>
                    ${t<1?`
                        <button id="next-set-btn" class="secondary-button" style="display: none; padding: 0.8rem 1.5rem;">
                            ${e("newExercise")} <i class="fas fa-arrow-right"></i>
                        </button>
                    `:`
                        <div id="final-success" style="display: none; color: #4CAF50; font-weight: bold; text-align: center;">
                            <i class="fas fa-star"></i> ${e("allCorrect")}
                        </div>
                    `}
                </div>
            </div>
        `,document.getElementById("adv-back-btn").addEventListener("click",()=>{window.location.hash="#/pronomen"});const o=document.getElementById("check-btn"),l=document.getElementById("next-set-btn");document.getElementById("final-success"),o.addEventListener("click",()=>{const c=m.querySelectorAll(".adverb-select-input");let a=!0;if(c.forEach((i,p)=>{const d=i.value,h=g[p].correct;r[p]=d===h,r[p]||(a=!1)}),n(),a)if(t<1){const i=document.getElementById("next-set-btn");i&&(i.style.display="block");const p=document.getElementById("check-btn");p&&(p.style.display="none")}else{const i=document.getElementById("final-success");i&&(i.style.display="block");const p=document.getElementById("check-btn");p&&(p.style.display="none")}}),l&&l.addEventListener("click",()=>{t++,r=[null,null,null,null,null],n()})}n()}function Te(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.innerHTML=`← ${e("back")}`,r.appendChild(n),t.appendChild(r);const g=document.createElement("h1");g.textContent=e("hvilketOrd"),t.appendChild(g);const o=document.createElement("div"),l=document.createElement("div"),c=document.createElement("div"),a=document.createElement("div"),i=document.createElement("div");c.style.display="none",a.style.display="none",i.style.display="none";let p=1;const d=document.createElement("div");d.className="grid",d.style.marginTop="2rem";const h=document.createElement("div");h.className="card",h.innerHTML=`
        <div class="card-icon">👥</div>
        <div class="card-title">${e("hanHamHans")}</div>
    `,h.onclick=()=>j("pronomen");const v=document.createElement("div");v.className="card",v.innerHTML=`
        <div class="card-icon">🏃</div>
        <div class="card-title">${e("gårGikGået")}</div>
    `,v.onclick=()=>j("verbum");const f=document.createElement("div");f.className="card",f.innerHTML=`
        <div class="card-icon">🚪</div>
        <div class="card-title">${e("derErDetEr")}</div>
    `,f.onclick=()=>k();const T=document.createElement("div");T.className="card",T.innerHTML=`
        <div class="card-icon">📈</div>
        <div class="card-title">${e("soedSoedereSoedest")}</div>
    `,T.onclick=()=>s("adjective_comparison");const u=document.createElement("div");u.className="card",u.innerHTML=`
        <div class="card-icon">💨</div>
        <div class="card-title">${e("advChoiceTitle")}</div>
    `,u.onclick=()=>C(),d.appendChild(h),d.appendChild(v),d.appendChild(f),d.appendChild(T),d.appendChild(u),l.appendChild(d),o.appendChild(l);const b=document.createElement("div");b.className="grid",c.appendChild(b),o.appendChild(c);function j(S){p=2,l.style.display="none",c.style.display="block",a.style.display="none",b.innerHTML="",(S==="pronomen"?[{key:"pronominerSubjekt",type:"subjekt",icon:"🔦",img:"pronominer_spotlight.png"},{key:"pronominerObjekt",type:"objekt",icon:"👤",img:"pronominer_objekt.png"},{key:"pronominerPossessiv",type:"possessiv",icon:"🏠",img:"pronominer_possessiv.png"}]:[{key:"verberM3",type:"verber_nutid",icon:"🏃",img:"verber_kategorier.png"}]).forEach(A=>{const N=document.createElement("div");N.className="card",N.onclick=()=>{A.type==="verber_nutid"?s("verbum_menu"):A.key.startsWith("verber")?s("verbum_learning",{categoryId:A.type,backView:"pronomen"}):H(A)};const x=document.createElement("div");x.className="card-icon",x.textContent=A.icon;const D=document.createElement("div");D.className="card-title",D.textContent=e(A.key),N.appendChild(x),N.appendChild(D),b.appendChild(N)})}const E=document.createElement("div");E.className="grid",a.appendChild(E),o.appendChild(a),n.onclick=()=>{i.style.display==="block"?(i.style.display="none",o.style.display="block",p===3?(a.style.display="block",c.style.display="none"):(c.style.display="block",a.style.display="none"),g.textContent=e("hvilketOrd")):a.style.display==="block"?(a.style.display="none",c.style.display="block",p=2,g.textContent=e("hvilketOrd")):c.style.display==="block"?(c.style.display="none",l.style.display="block",p=1,g.textContent=e("hvilketOrd")):s("dagens_opgave")};function k(){o.style.display="none",i.style.display="block",i.innerHTML="",g.textContent=e("derErDetEr");const S=document.createElement("div");S.className="der-er-explanation";const y=document.createElement("div");y.className="expl-slide",y.innerHTML=`
            <img src="${G}der_er_bil_gade.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${e("derErIntro1")}</div>
            <p class="expl-text">${e("derErExpl")}</p>
            <button class="gemini-btn next-slide-btn">Næste →</button>
        `;const A=document.createElement("div");A.className="expl-slide",A.style.display="none",A.innerHTML=`
            <img src="${G}det_er_bil_pegepind.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${e("derErIntro2")}</div>
            <p class="expl-text">Når vi kender tingen (den er inde i rummet), så bruger vi <b>det</b> til at pege.</p>
            <button class="gemini-btn start-practice-btn">Start øvelse!</button>
        `,y.querySelector(".next-slide-btn").onclick=()=>{y.style.display="none",A.style.display="block"},A.querySelector(".start-practice-btn").onclick=()=>{w()},S.appendChild(y),S.appendChild(A),i.appendChild(S)}function w(){i.innerHTML="";const S=[{text:"Se! [blank_0] en hund i haven.",answer:"Der er",options:["Der er","Det er"]},{text:"[blank_0] en stor hund. Se den!",answer:"Det er",options:["Der er","Det er"]},{text:"Hvem banker på døren? [blank_0] nok min mor.",answer:"Det er",options:["Der er","Det er"]},{text:"[blank_0] mange mennesker i toget i dag.",answer:"Der er",options:["Der er","Det er"]},{text:"[blank_0] en dejlig kop kaffe, du har her.",answer:"Det er",options:["Der er","Det er"]}];let y=0;function A(){i.innerHTML="";const x=S[y],D=document.createElement("div");D.className="pronomen-exercise-content";const B=document.createElement("div");B.className="exercise-progress",B.textContent=`Opgave ${y+1} af ${S.length}`,D.appendChild(B);const F=document.createElement("div");F.className="grammatik-text-container",x.text.split(/(\[blank_0\])/).forEach($=>{if($==="[blank_0]"){const M=document.createElement("select");M.className="grammatik-select";const q=document.createElement("option");q.value="",q.textContent="...",M.appendChild(q),x.options.forEach(O=>{const K=document.createElement("option");K.value=O,K.textContent=O,M.appendChild(K)});const I=document.createElement("div");I.className="exercise-feedback";const V=document.createElement("span");V.className="select-wrapper",V.appendChild(M),F.appendChild(V),M.onchange=()=>{M.value===x.answer?(M.classList.add("correct"),M.classList.remove("wrong"),I.style.display="none",z.disabled=!1):M.value!==""?(M.classList.add("wrong"),M.classList.remove("correct"),I.textContent=e("hintDerDet"),I.style.display="block",z.disabled=!0):(M.classList.remove("correct","wrong"),I.style.display="none",z.disabled=!0)},D.appendChild(I)}else{const M=document.createElement("span");M.textContent=$,F.appendChild(M)}}),D.appendChild(F);const z=document.createElement("button");z.className="gemini-btn",z.textContent="Check",z.disabled=!0,z.onclick=()=>{y++,y<S.length?A():N()},D.appendChild(z),i.appendChild(D)}function N(){i.innerHTML=`
                <div class="pronomen-exercise-content">
                    <h2>Flot klaret! 🎉</h2>
                    <p>Du har styr på 'Der er' og 'Det er'.</p>
                    <button class="gemini-btn" onclick="location.reload()">Tilbage til menu</button>
                </div>
            `}A()}function C(){o.style.display="none",i.style.display="block",i.innerHTML="",g.textContent=e("adverbChoice"),De(i)}function H(S){o.style.display="none",i.style.display="block",i.innerHTML="",g.textContent=e(S.key);const y=document.createElement("img");y.src=G+S.img,y.className="pronomen-illustration",i.appendChild(y);const A=Se(S.type);let N=0;function x(){i.querySelectorAll(".pronomen-exercise-content").forEach(V=>V.remove());const B=document.createElement("div");B.className="pronomen-exercise-content";const F=A[N],P=document.createElement("div");P.className="grammatik-text-container",F.text.split(/(\[blank_\d+\])/).forEach(V=>{const O=V.match(/\[blank_(\d+)\]/);if(O){const K=O[1],W=document.createElement("span");W.className="select-wrapper";const R=document.createElement("select");R.className="grammatik-select",R.dataset.idx=K;const J=document.createElement("option");J.value="",J.textContent="...",R.appendChild(J),[...F.blanks[K].options].sort(()=>Math.random()-.5).forEach(Z=>{const Y=document.createElement("option");Y.value=Z,Y.textContent=Z,R.appendChild(Y)}),P.appendChild(W)}else{const K=document.createElement("span");K.textContent=V,P.appendChild(K)}}),B.appendChild(P);const $=document.createElement("div");$.className="exercise-feedback",B.appendChild($);const M=document.createElement("div");M.className="game-controls";const q=document.createElement("button");q.className="gemini-btn",q.textContent=e("checkAnswers"),q.onclick=()=>{const V=P.querySelectorAll("select");let O=!0,K="";V.forEach(W=>{const R=W.dataset.idx;W.value===F.blanks[R].answer?(W.classList.add("correct"),W.classList.remove("wrong")):(W.classList.add("wrong"),W.classList.remove("correct"),O=!1,K||(K=e("hintPronominer")))}),O?($.style.display="none",q.style.display="none",I.style.display="inline-block"):($.textContent=K,$.style.display="block")};const I=document.createElement("button");I.className="gemini-btn",I.textContent=e("newExercise"),I.style.display="none",I.onclick=()=>{N=(N+1)%A.length,x()},M.appendChild(q),M.appendChild(I),B.appendChild(M),i.appendChild(B)}x()}if(t.appendChild(o),t.appendChild(i),m.appendChild(t),!document.getElementById("pronomen-styles")){const S=document.createElement("style");S.id="pronomen-styles",S.textContent=`
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
        `,document.head.appendChild(S)}}function Se(m){return m==="subjekt"?[{text:"Her er en mand. [blank_0] hedder Peter.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Mikael er lærer. [blank_0] bor i Aarhus.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Min far er gammel. [blank_0] er 80 år.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Drengen leger. [blank_0] er glad.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]}]:m==="objekt"?[{text:"Jeg ser en mand. Jeg ser [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]},{text:"Peter er her. Jeg ringer til [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]},{text:"Mikael er træt. Vi hjælper [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]}]:m==="possessiv"?[{text:"Her er Peter. [blank_0] bil er rød.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]},{text:"Mikael har en hund. [blank_0] hund er stor.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]},{text:"Min far er her. [blank_0] hus er gammelt.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]}]:[]}function Ae(m,s){const t=document.createElement("div");t.className="view-container grounding-view";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("dagens_opgave"),r.appendChild(n),t.appendChild(r);const g=document.createElement("h1");g.textContent=e("howToBuildSentence");const o=document.createElement("p");o.className="subtitle",o.textContent=e("howToBuildSentenceDesc"),t.appendChild(g),t.appendChild(o);const l=document.createElement("div");l.className="intro-area",l.innerHTML=`
        <div class="illustration-container">
            <img src="${G}images/grounding_balloon_child.png" alt="Balloon and Anchor" class="grounding-img">
        </div>
        <p class="grounding-text">${e("groundingIntro")}</p>
    `,t.appendChild(l);const c=document.createElement("div");c.className="exercise-container",t.appendChild(c);let a={step:1,nounAnchor:"",verbAnchor:"",sentenceParts:[]};function i(){c.innerHTML="",a.step===1?p():a.step===2?d():a.step===3&&h()}function p(){const u=document.createElement("div");u.className="step-content",u.innerHTML=`
            <h3>${e("groundingStep1")}</h3>
            <div class="grounding-interaction">
                <span class="word-bubble">Barn</span>
                <span class="arrow">←</span>
                <select class="grammatik-select" id="noun-select">
                    <option value="">${e("selectAnchor")}</option>
                    <option value="Mit">Mit</option>
                    <option value="Et">Et</option>
                    <option value="Det">Det</option>
                    <option value="Dette">Dette</option>
                </select>
            </div>
            <div class="exercise-feedback" id="step-feedback"></div>
        `,c.appendChild(u);const b=u.querySelector("#noun-select");b.onchange=()=>{b.value&&(a.nounAnchor=b.value,a.step=2,setTimeout(i,1e3))}}function d(){const u=document.createElement("div");u.className="step-content",u.innerHTML=`
            <h3>${e("groundingStep2")}</h3>
            <div class="grounding-interaction">
                <span class="word-bubble">At spise</span>
                <span class="arrow">←</span>
                <select class="grammatik-select" id="verb-select">
                    <option value="">${e("selectTense")}</option>
                    <option value="spiser">spiser ${e("tenseNow")}</option>
                    <option value="spiste">spiste ${e("tensePast")}</option>
                    <option value="skal spise">skal spise ${e("tenseFuture")}</option>
                </select>
            </div>
            <div class="exercise-feedback" id="step-feedback"></div>
        `,c.appendChild(u);const b=u.querySelector("#verb-select");b.onchange=()=>{b.value&&(a.verbAnchor=b.value,a.step=3,setTimeout(i,1e3))}}function h(){const u=document.createElement("div");u.className="step-content",u.innerHTML=`
            <h3>${e("groundingStep3")}</h3>
            <p>${e("dragInstruction")}</p>
            
            <div class="drag-source" id="source">
                <div class="drag-item" draggable="true" data-word="${a.nounAnchor}">${a.nounAnchor}</div>
                <div class="drag-item" draggable="true" data-word="barn">barn</div>
                <div class="drag-item" draggable="true" data-word="${a.verbAnchor}">${a.verbAnchor}</div>
            </div>

            <div class="drop-zone-container">
                <p class="ground-label">${e("sentenceGround")}</p>
                <div class="drop-zone" id="ground"></div>
            </div>

            <div class="controls">
                <button class="gemini-btn" id="check-btn">${e("checkResult")}</button>
            </div>
            <div class="exercise-feedback" id="step-feedback"></div>
        `,c.appendChild(u);const b=u.querySelectorAll(".drag-item"),j=u.querySelector("#ground"),E=u.querySelector("#source");b.forEach(x=>{x.ondragstart=D=>{D.dataTransfer.setData("text/plain",x.dataset.word),x.classList.add("dragging")},x.ondragend=()=>x.classList.remove("dragging")});let k=null,w=0,C=0,H=null;b.forEach(x=>{x.ontouchstart=D=>{k=x,H=x.parentElement;const B=D.touches[0],F=x.getBoundingClientRect();u.getBoundingClientRect(),w=B.clientX-F.left,C=B.clientY-F.top,x.classList.add("dragging"),x.style.position="absolute",x.style.zIndex="2000",x.style.width=F.width+"px",x.style.pointerEvents="none",x.style.transition="none",u.style.position="relative",u.appendChild(x),S(B.clientX,B.clientY),D.preventDefault()},x.ontouchmove=D=>{if(!k)return;const B=D.touches[0];S(B.clientX,B.clientY),D.preventDefault()},x.ontouchend=D=>{if(!k)return;const B=D.changedTouches[0];x.classList.remove("dragging"),x.style.position="",x.style.zIndex="",x.style.width="",x.style.top="",x.style.left="",x.style.pointerEvents="",x.style.transition="";const F=document.elementFromPoint(B.clientX,B.clientY),P=F?.closest(".drop-zone")||F?.closest(".drag-source");if(P)if(P.id==="ground"){const z=y(j,B.clientX);z==null?j.appendChild(x):j.insertBefore(x,z)}else E.appendChild(x);else H.appendChild(x);k=null,D.preventDefault()}});function S(x,D){if(k){const B=u.getBoundingClientRect();k.style.left=x-B.left-w+"px",k.style.top=D-B.top-C+"px"}}j.ondragover=x=>x.preventDefault(),j.ondrop=x=>{x.preventDefault();const D=x.dataTransfer.getData("text/plain"),B=E.querySelector(`.drag-item[data-word="${D}"]`)||j.querySelector(`.drag-item[data-word="${D}"]`);if(B){const F=y(j,x.clientX);F==null?j.appendChild(B):j.insertBefore(B,F)}};function y(x,D){return[...x.querySelectorAll(".drag-item:not(.dragging)")].reduce((F,P)=>{const z=P.getBoundingClientRect(),$=D-z.left-z.width/2;return $<0&&$>F.offset?{offset:$,element:P}:F},{offset:Number.NEGATIVE_INFINITY}).element}E.ondragover=x=>x.preventDefault(),E.ondrop=x=>{x.preventDefault();const D=document.querySelector(".drag-item.dragging");D&&E.appendChild(D)};const A=u.querySelector("#check-btn"),N=u.querySelector("#step-feedback");A.onclick=()=>{const x=Array.from(j.children).map(B=>B.dataset.word).join(" "),D=`${a.nounAnchor} barn ${a.verbAnchor}`.toLowerCase();x.toLowerCase()===D?(N.textContent=e("groundingSuccess"),N.className="exercise-feedback success-text",N.style.display="block",A.disabled=!0,v(u,()=>{f(u),setTimeout(()=>{T(u)},5500)})):(N.textContent=e("wrongOrder"),N.className="exercise-feedback",N.style.display="block")}}function v(u,b){let j=u.querySelector(".focus-container");j||(j=document.createElement("div"),j.className="focus-container animate-in",u.appendChild(j));const E=a.nounAnchor.toLowerCase();let k="",w="";E==="mit"?(w=e("groundingRelation"),k=`
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
            `):E==="et"?(w=e("groundingIndefinite"),k=`
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
            `):E==="det"?(w=e("groundingDistal"),k=`
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
            `):E==="dette"&&(w=e("groundingProximal"),k=`
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
            `),j.innerHTML=`
            <div class="focus-wrapper">
                <h3>${w}</h3>
                ${k}
            </div>
        `,setTimeout(()=>{j.scrollIntoView({behavior:"smooth",block:"center"})},300),setTimeout(b,5e3)}function f(u){const b=u.querySelector(".focus-container");b&&(b.style.opacity="0.3",b.style.transition="opacity 0.5s");let j=u.querySelector(".timeline-container");j||(j=document.createElement("div"),j.className="timeline-container animate-in",u.appendChild(j)),j.innerHTML=`
            <div class="timeline-wrapper">
                <div class="timeline-line"></div>
                <div class="timeline-points">
                    <div class="time-point" data-tense="past">${e("pastTense")}</div>
                    <div class="time-point" data-tense="present">${e("presentTense")}</div>
                    <div class="time-point" data-tense="future">${e("futureTense")}</div>
                </div>
                <div class="timeline-pointer" id="timeline-pointer">📍</div>
            </div>
        `,setTimeout(()=>{j.scrollIntoView({behavior:"smooth",block:"center"})},300);const E=j.querySelector("#timeline-pointer");let k="50%";a.verbAnchor==="spiste"&&(k="15%"),a.verbAnchor==="skal spise"&&(k="85%"),setTimeout(()=>{E.style.left=k,E.classList.add("bouncing")},100)}function T(u){let b=u.querySelector(".final-completion-container");b||(b=document.createElement("div"),b.className="final-completion-container animate-in",u.appendChild(b)),b.innerHTML=`
            <div class="completion-box">
                <div class="success-icon">✨</div>
                <p class="success-msg">${e("groundingFinalMsg")}</p>
                <div class="example-box">
                    <span class="example-label">${e("sentenceLabel")}</span>
                    <span class="example-text">${a.nounAnchor} barn ${a.verbAnchor}.</span>
                </div>

                <div class="recommendation-box">
                    <h4>${e("modalTeaserTitle")}</h4>
                    <p class="teaser-text">${e("modalTeaserText")}</p>
                    <div class="recommendation-grid">
                        <button class="rec-btn spotlight-btn" id="start-modal">
                            <span class="rec-icon">✨</span>
                            <span class="rec-label">${e("modalVerbLabel")}</span>
                        </button>
                        <button class="rec-btn" id="rec-bestemthed">
                            <span class="rec-icon">🏷️</span>
                            <span class="rec-label">${e("bestemthedLabel")}</span>
                        </button>
                        <button class="rec-btn" id="rec-pronomen">
                            <span class="rec-icon">👤</span>
                            <span class="rec-label">${e("pronomenLabel")}</span>
                        </button>
                        <button class="rec-btn" id="rec-verber">
                            <span class="rec-icon">⚡</span>
                            <span class="rec-label">${e("verberLabel")}</span>
                        </button>
                    </div>
                </div>

                <button class="gemini-btn outline-btn" id="finish-btn">${e("finishBtn")}</button>
            </div>
        `,b.querySelector("#finish-btn").onclick=()=>s("dagens_opgave"),b.querySelector("#start-modal").onclick=()=>s("modal_force",a),b.querySelector("#rec-bestemthed").onclick=()=>s("bestemthed"),b.querySelector("#rec-pronomen").onclick=()=>s("pronomen"),b.querySelector("#rec-verber").onclick=()=>s("verbum_learning",{categoryId:"datid"}),setTimeout(()=>{b.scrollIntoView({behavior:"smooth",block:"center"})},100)}if(i(),!document.getElementById("grounding-styles")){const u=document.createElement("style");u.id="grounding-styles",u.textContent=`
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
        `,document.head.appendChild(u)}m.appendChild(t)}const U=[{id:"hjaelpe",title:"Hjælpeverber",verbs:["kan","skal","vil","må","bør","lader"],exercises:[{title:"Modalverber - Sæt 1",instruction:"Vælg det rigtige hjælpeverbum.",segments:[{type:"text",content:"1. **[I can speak Danish]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"kan",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" tale dansk.\\n\\n2. **[I must go now]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"skal",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" gå nu.\\n\\n3. **[I want to buy a cake]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"vil",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" gerne købe en kage.\\n\\n4. **[May I sit here?]**\\nDansk: "},{type:"gap",id:3,correct:"Må",options:["Må","Skal","Kan","Vil","Bør"],explanation:"hintAction"},{type:"text",content:" jeg sidde her?\\n\\n5. **[You should read this]**\\nDansk: Du "},{type:"gap",id:4,correct:"bør",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" læse denne bog."}],phase2_tasks:[{correct:"kan",definition:"Når man har evnen eller muligheden for at gøre noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Kan' udtrykker evne."},{correct:"skal",definition:"Når man er nødt til at gøre noget, eller har en plan.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Skal' udtrykker nødvendighed."},{correct:"vil",definition:"Når man har et ønske eller en lyst til noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Vil' udtrykker ønske."},{correct:"må",definition:"Når man har tilladelse til noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Må' udtrykker tilladelse."},{correct:"bør",definition:"Når noget er en god idé eller moralsk rigtigt.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Bør' udtrykker anbefaling."}]}]},{id:"tilstand",title:"Tilstand og navne",verbs:["er","bliver","lever","bor","findes","sker","har","får","betyder","passer","koster","virker","ligner","gælder","hedder"],exercises:[{title:"Hvem er jeg? - Sæt 1",instruction:"Vælg det rigtige verbum om din tilstand.",segments:[{type:"text",content:"1. **[I am happy]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"er",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" glad.\\n\\n2. **[I have a dog]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"har",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" en hund.\\n\\n3. **[I live in Aarhus]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"bor",options:["er","har","bor","hedder","bliver"],explanation:"hintPlace"},{type:"text",content:" i Aarhus.\\n\\n4. **[My name is Peter]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"hedder",options:["er","har","bor","hedder","bliver"],explanation:"hintName"},{type:"text",content:" Peter.\\n\\n5. **[I am becoming a doctor]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"bliver",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" læge næste år."}],phase2_tasks:[{correct:"er",definition:"Bruges til at identificere sig selv eller sin tilstand.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"har",definition:"Når man ejer noget.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"bor",definition:"Når man har sit hjem et bestemt sted.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"hedder",definition:"Bruges når man fortæller sit navn.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"bliver",definition:"Når man ændrer sig til noget nyt.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"}]},{title:"Verden omkring os",instruction:"Vælg det rigtige verbum om tilstande i hverdagen.",segments:[{type:"text",content:"1. **[It costs 20 kroner]**\\nDansk: Det "},{type:"gap",id:0,correct:"koster",options:["koster","passer","virker","betyder","sker"],explanation:"hintContext"},{type:"text",content:" 20 kroner.\\n\\n2. **[What does it mean?]**\\nDansk: Hvad "},{type:"gap",id:1,correct:"betyder",options:["koster","passer","virker","betyder","sker"],explanation:"hintContext"},{type:"text",content:" det?\\n\\n3. **[The shoes fit well]**\\nDansk: Skoene "},{type:"gap",id:2,correct:"passer",options:["koster","passer","virker","betyder","sker"],explanation:"hintContext"},{type:"text",content:" godt.\\n\\n4. **[It works fine]**\\nDansk: Det "},{type:"gap",id:3,correct:"virker",options:["koster","passer","virker","betyder","sker"],explanation:"hintContext"},{type:"text",content:" fint.\\n\\n5. **[What is happening?]**\\nDansk: Hvad "},{type:"gap",id:4,correct:"sker",options:["koster","passer","virker","betyder","sker"],explanation:"hintContext"},{type:"text",content:" der?"}],phase2_tasks:[{correct:"koster",definition:"Prisen på en vare.",options:["koster","passer","virker","betyder","sker"],explanation:"Korrekt!"},{correct:"betyder",definition:"Hvad et ord eller en ting forklarer.",options:["koster","passer","virker","betyder","sker"],explanation:"Korrekt!"},{correct:"passer",definition:"Når tøj eller ting har den rigtige størrelse eller form.",options:["koster","passer","virker","betyder","sker"],explanation:"Korrekt!"},{correct:"virker",definition:"Når noget fungerer som det skal.",options:["koster","passer","virker","betyder","sker"],explanation:"Korrekt!"},{correct:"sker",definition:"Når noget finder sted eller hænder.",options:["koster","passer","virker","betyder","sker"],explanation:"Korrekt!"}]}]},{id:"bevaegelse",title:"Bevægelse",verbs:["går","kører","rejser","falder","stiger","kommer","når","vender","følger","fører","bringer"],exercises:[{title:"På farten - Sæt 1",instruction:"Vælg det rigtige verbum om bevægelse.",segments:[{type:"text",content:"1. **[I walk to school]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"går",options:["går","kører","rejser","falder","stiger"],explanation:"hintAction"},{type:"text",content:" til skole.\\n\\n2. **[I drive a car]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"kører",options:["går","kører","rejser","falder","stiger"],explanation:"hintAction"},{type:"text",content:" i bil.\\n\\n3. **[I travel to Spain]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"rejser",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" til Spanien i sommerferien.\\n\\n4. **[The apple falls from the tree]**\\nDansk: Æblet "},{type:"gap",id:3,correct:"falder",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" ned fra træet.\\n\\n5. **[The price increases]**\\nDansk: Prisen "},{type:"gap",id:4,correct:"stiger",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" hver måned."}],phase2_tasks:[{correct:"går",definition:"At flytte sig ved brug af benene.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"kører",definition:"At transportere sig i et køretøj som bil eller bus.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"rejser",definition:"At tage på en længere tur til et andet sted eller land.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"falder",definition:"At bevæge sig hurtigt mod jorden ved et uheld eller tyngdekraft.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"stiger",definition:"At bevæge sig opad eller blive højere (f.eks. priser).",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"}]},{title:"Ankomst og retning",instruction:"Vælg det rigtige verbum om destinationer.",segments:[{type:"text",content:"1. **[He comes tomorrow]**\\nDansk: Han "},{type:"gap",id:0,correct:"kommer",options:["kommer","når","vender","følger","bringer"],explanation:"hintContext"},{type:"text",content:" i morgen.\\n\\n2. **[I reach the station]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"når",options:["kommer","når","vender","følger","bringer"],explanation:"hintContext"},{type:"text",content:" stationen klokken 8.\\n\\n3. **[She turns around]**\\nDansk: Hun "},{type:"gap",id:2,correct:"vender",options:["kommer","når","vender","følger","bringer"],explanation:"hintContext"},{type:"text",content:" sig om.\\n\\n4. **[Follow the path]**\\nDansk: "},{type:"gap",id:3,correct:"Følg",options:["Følg","Bring","Vend","Kom","Nå"],explanation:"hintContext"},{type:"text",content:" stien.\\n\\n5. **[Bring the coffee]**\\nDansk: "},{type:"gap",id:4,correct:"Bring",options:["Følg","Bring","Vend","Kom","Nå"],explanation:"hintContext"},{type:"text",content:" kaffen."}],phase2_tasks:[{correct:"kommer",definition:"At ankomme til et sted.",options:["kommer","når","vender","følger","bringer"],explanation:"Korrekt!"},{correct:"når",definition:"At nå frem til et mål i tide.",options:["kommer","når","vender","følger","bringer"],explanation:"Korrekt!"},{correct:"vender",definition:"At skifte retning eller dreje om.",options:["kommer","når","vender","følger","bringer"],explanation:"Korrekt!"},{correct:"følger",definition:"At gå bagefter nogen eller rette sig efter noget.",options:["følger","kommer","når","vender","bringer"],explanation:"Korrekt!"},{correct:"bringer",definition:"At tage noget med til et sted eller en person.",options:["bringer","følger","kommer","når","vender"],explanation:"Korrekt!"}]}]},{id:"interaktion",title:"Sprog og kommunikation",verbs:["siger","taler","svarer","spørger","kalder","beder","fortæller","skriver","læser","viser","sender","hjælper","møder","kræver","sikrer"],exercises:[{title:"Samtale - Sæt 1",instruction:"Vælg det rigtige verbum om kommunikation.",segments:[{type:"text",content:"1. **[What do you say?]**\\nDansk: Hvad "},{type:"gap",id:0,correct:"siger",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" du?\\n\\n2. **[I speak Danish]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"taler",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" dansk.\\n\\n3. **[I answer the letter]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"svarer",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" på brevet.\\n\\n4. **[I ask a question]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"spørger",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" om vej.\\n\\n5. **[I tell a story]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"fortæller",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" en god historie."}],phase2_tasks:[{correct:"siger",definition:"At bruge ord til at udtrykke noget.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"taler",definition:"At bruge stemmen og et bestemt sprog.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"svarer",definition:"At give respons på et spørgsmål eller brev.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"spørger",definition:"Når man vil have information fra en anden person.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"fortæller",definition:"At give en længere forklaring eller beretning om noget.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"}]},{title:"At læse og skrive",instruction:"Vælg det rigtige verbum om skriftlig kontakt.",segments:[{type:"text",content:"1. **[I write an email]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"skriver",options:["skriver","læser","sender","viser","møder"],explanation:"hintAction"},{type:"text",content:" en e-mail.\\n\\n2. **[I read a book]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"læser",options:["skriver","læser","sender","viser","møder"],explanation:"hintAction"},{type:"text",content:" en god bog.\\n\\n3. **[I send a package]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"sender",options:["skriver","læser","sender","viser","møder"],explanation:"hintAction"},{type:"text",content:" en pakke til min mor.\\n\\n4. **[Show me the way]**\\nDansk: "},{type:"gap",id:3,correct:"Vis",options:["Vis","Send","Skriv","Læs","Mød"],explanation:"hintAction"},{type:"text",content:" mig vej.\\n\\n5. **[I meet a friend]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"møder",options:["skriver","læser","sender","viser","møder"],explanation:"hintAction"},{type:"text",content:" en ven i eftermiddag."}],phase2_tasks:[{correct:"skriver",definition:"At danne tegn eller ord på papir eller skærm.",options:["skriver","læser","sender","viser","møder"],explanation:"Korrekt!"},{correct:"læser",definition:"At forstå ord i en tekst.",options:["skriver","læser","sender","viser","møder"],explanation:"Korrekt!"},{correct:"sender",definition:"At få noget transporteret til en anden (post eller digitalt).",options:["skriver","læser","sender","viser","møder"],explanation:"Korrekt!"},{correct:"viser",definition:"At lade nogen se noget.",options:["skriver","læser","sender","viser","møder"],explanation:"Korrekt!"},{correct:"møder",definition:"At træffe en person på et bestemt sted.",options:["skriver","læser","sender","viser","møder"],explanation:"Korrekt!"}]}]},{id:"indre_liv",title:"Tanker og følelser",verbs:["ser","hører","mærker","lyder","ved","tror","mener","tænker","synes","forstår","kender","lærer","tæller","vælger","føler","ønsker","oplever","søger"],exercises:[{title:"Indre liv - Sæt 1",instruction:"Vælg det rigtige verbum om dine tanker.",segments:[{type:"text",content:"1. **[I know it]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"ved",options:["ved","tror","mener","tænker","synes"],explanation:"hintAction"},{type:"text",content:" det godt.\\n\\n2. **[I believe in it]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"tror",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" på dig.\\n\\n3. **[What is your opinion?]**\\nDansk: Hvad "},{type:"gap",id:2,correct:"mener",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" du om det?\\n\\n4. **[I am thinking about you]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tænker",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" på dig.\\n\\n5. **[I think (opinion) it's fun]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"synes",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" det er sjovt."}],phase2_tasks:[{correct:"ved",definition:"Når man har faktuel information om noget.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"tror",definition:"Når man antager noget eller har en religiøs overbevisning.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"mener",definition:"Når man har en holdning eller vil udtrykke en betydning.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"tænker",definition:"Den generelle proces der foregår i hovedet.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"synes",definition:"Når man har en personlig, følelsesmæssig holdning eller smag.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"}]},{title:"Sanser og læring",instruction:"Vælg det rigtige verbum om at mærke og lære.",segments:[{type:"text",content:"1. **[I see you]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"ser",options:["ser","hører","lærer","forstår","mærker"],explanation:"hintAction"},{type:"text",content:" dig.\\n\\n2. **[I hear the music]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"hører",options:["ser","hører","lærer","forstår","mærker"],explanation:"hintAction"},{type:"text",content:" musikken.\\n\\n3. **[I am learning Danish]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"lærer",options:["ser","hører","lærer","forstår","mærker"],explanation:"hintAction"},{type:"text",content:" dansk lige nu.\\n\\n4. **[I understand everything]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"forstår",options:["ser","hører","lærer","forstår","mærker"],explanation:"hintAction"},{type:"text",content:" det hele.\\n\\n5. **[I feel the heat]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"mærker",options:["ser","hører","lærer","forstår","mærker"],explanation:"hintAction"},{type:"text",content:" varmen."}],phase2_tasks:[{correct:"ser",definition:"At bruge øjnene til at observere.",options:["ser","hører","lærer","forstår","mærker"],explanation:"Korrekt!"},{correct:"hører",definition:"At bruge ørerne til at lytte.",options:["ser","hører","lærer","forstår","mærker"],explanation:"Korrekt!"},{correct:"lærer",definition:"At få ny viden eller færdigheder.",options:["ser","hører","lærer","forstår","mærker"],explanation:"Korrekt!"},{correct:"forstår",definition:"At begribe meningen med noget.",options:["ser","hører","lærer","forstår","mærker"],explanation:"Korrekt!"},{correct:"mærker",definition:"At have en fysisk eller følelsesmæssig fornemmelse.",options:["ser","hører","lærer","forstår","mærker"],explanation:"Korrekt!"}]}]},{id:"handling",title:"Handling og præstation",verbs:["gør","tager","bruger","laver","arbejder","klarer","handler","ændrer","lægger","ligger","sætter","sidder","stiller","står","holder","giver","finder","trækker","samler","slår","bryder","bygger","lukker","skaber","begynder","starter","fortsætter","prøver","forsøger","venter","betaler","køber","sælger","vinder","spiller"],exercises:[{title:"I gang - Sæt 1",instruction:"Vælg det rigtige verbum om handlinger.",segments:[{type:"text",content:"1. **[I am doing my homework]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"laver",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" lektier.\\n\\n2. **[I do my best]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"gør",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" mit bedste.\\n\\n3. **[I use a computer]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"bruger",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" en computer.\\n\\n4. **[I take the bus]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tager",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" bussen.\\n\\n5. **[I find my keys]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"finder",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" mine nøgler."}],phase2_tasks:[{correct:"laver",definition:"At producere eller udføre noget (især lektier eller mad).",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"gør",definition:"At udføre en handling (især abstrakte ting som 'sit bedste').",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"bruger",definition:"At anvende et redskab eller en ressource.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"tager",definition:"At fatte om noget eller vælge en transportmulighed.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"finder",definition:"At opdage noget man leder efter.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"}]},{title:"Job og indkøb",instruction:"Vælg det rigtige verbum om dagens arbejde og shopping.",segments:[{type:"text",content:"1. **[I am working at the office]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"arbejder",options:["arbejder","betaler","køber","sælger","venter"],explanation:"hintAction"},{type:"text",content:" på kontoret.\\n\\n2. **[I buy milk]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"køber",options:["arbejder","betaler","køber","sælger","venter"],explanation:"hintAction"},{type:"text",content:" mælk.\\n\\n3. **[I am paying for the bread]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"betaler",options:["arbejder","betaler","køber","sælger","venter"],explanation:"hintAction"},{type:"text",content:" for brødet.\\n\\n4. **[I am waiting for the bus]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"venter",options:["arbejder","betaler","køber","sælger","venter"],explanation:"hintAction"},{type:"text",content:" på bussen.\\n\\n5. **[I am playing football]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"spiller",options:["arbejder","spiller","køber","sælger","venter"],explanation:"hintAction"},{type:"text",content:" fodbold."}],phase2_tasks:[{correct:"arbejder",definition:"At udføre sit erhverv eller job.",options:["arbejder","betaler","køber","sælger","venter"],explanation:"Korrekt!"},{correct:"køber",definition:"At anskaffe sig noget mod betaling.",options:["arbejder","betaler","køber","sælger","venter"],explanation:"Korrekt!"},{correct:"betaler",definition:"At give penge for en vare eller tjeneste.",options:["arbejder","betaler","køber","sælger","venter"],explanation:"Korrekt!"},{correct:"venter",definition:"At bruge tid på at noget skal ske (f.eks. bussen).",options:["arbejder","betaler","køber","sælger","venter"],explanation:"Korrekt!"},{correct:"spiller",definition:"At deltage i en sport eller et spil (f.eks. fodbold).",options:["arbejder","spiller","køber","sælger","venter"],explanation:"Korrekt!"}]}]},{id:"datid_regelm",title:"Datid (regelmæssige)",verbs:["boede","spillede","snakkede","arbejdede","lyttede","vaskede","ventede","hentede","lavede","købte"],exercises:[{title:"Min historie - Sæt 1",instruction:"Vælg det rigtige verbum i regelmæssig datid (-ede eller -te).",segments:[{type:"text",content:"1. **[I lived in Odense]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"boede",options:["boede","bor","bliver","arbejdede","spillede"],explanation:"hintContext"},{type:"text",content:" i Odense sidste år.\\n\\n2. **[We played football]**\\nDansk: Vi "},{type:"gap",id:1,correct:"spillede",options:["boede","spillede","spiller","arbejdede","lavede"],explanation:"hintContext"},{type:"text",content:" fodbold i tirsdags.\\n\\n3. **[I worked a lot]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"arbejdede",options:["boede","spillede","arbejdede","arbejder","lavede"],explanation:"hintContext"},{type:"text",content:" meget i går.\\n\\n4. **[I made dinner]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"lavede",options:["lavede","laver","boede","spillede","arbejdede"],explanation:"hintContext"},{type:"text",content:" mad til hele familien.\\n\\n5. **[I waited for the bus]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"ventede",options:["ventede","venter","boede","spillede","arbejdede"],explanation:"hintContext"},{type:"text",content:" på bussen i 20 minutter."}],phase2_tasks:[{correct:"boede",definition:"At have haft sit hjem et sted i fortiden (regelmæssig).",options:["boede","arbejdede","spillede","lavede","ventede"],explanation:"Korrekt!"},{correct:"spillede",definition:"At have deltaget i leg eller sport i fortiden.",options:["boede","arbejdede","spillede","lavede","ventede"],explanation:"Korrekt!"},{correct:"arbejdede",definition:"At have udført sit job i fortiden.",options:["boede","arbejdede","spillede","lavede","ventede"],explanation:"Korrekt!"},{correct:"lavede",definition:"At have fremstillet noget i fortiden (f.eks. mad).",options:["boede","arbejdede","spillede","lavede","ventede"],explanation:"Korrekt!"},{correct:"ventede",definition:"At have brugt tid på at noget skulle ske i fortiden.",options:["boede","arbejdede","spillede","lavede","ventede"],explanation:"Korrekt!"}]}]},{id:"datid",title:"Datid (uregelmæssige)",verbs:["så","gik","kom","tog","spiste","drak","fik","var","havde","skrev","læste","sang","sov","løb","sad","stod"],exercises:[{title:"I går - Sæt 1",instruction:"Vælg det rigtige uregelmæssige verbum i datid.",segments:[{type:"text",content:"1. **[Yesterday I saw a movie]**\\nDansk: I går "},{type:"gap",id:0,correct:"så",options:["så","ser","seet","tog","gik"],explanation:"hintContext"},{type:"text",content:" jeg en god film.\\n\\n2. **[We walked to the party]**\\nDansk: Vi "},{type:"gap",id:1,correct:"gik",options:["så","gik","går","gået","kom"],explanation:"hintContext"},{type:"text",content:" til fest i lørdags.\\n\\n3. **[He came late this morning]**\\nDansk: Han "},{type:"gap",id:2,correct:"kom",options:["kom","kommer","kommet","så","tog"],explanation:"hintContext"},{type:"text",content:" for sent i morges.\\n\\n4. **[I took a cake with me]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tog",options:["tog","tager","taget","så","gik"],explanation:"hintContext"},{type:"text",content:" en kage med i går.\\n\\n5. **[We ate dinner at 18]**\\nDansk: Vi "},{type:"gap",id:4,correct:"spiste",options:["spiser","spist","spiste","kom","tog"],explanation:"hintContext"},{type:"text",content:" aftensmad klokken 18 i går."}],phase2_tasks:[{correct:"så",definition:"At have set noget i fortiden (datid af 'se').",options:["så","ser","seet","tog","gik"],explanation:"Korrekt!"},{correct:"gik",definition:"At have gået et sted hen i fortiden (datid af 'gå').",options:["så","gik","går","gået","kom"],explanation:"Korrekt!"},{correct:"kom",definition:"At være ankommet i fortiden (datid af 'komme').",options:["kom","kommer","kommet","så","tog"],explanation:"Korrekt!"},{correct:"tog",definition:"At have taget noget i fortiden (datid af 'tage').",options:["tog","tager","taget","så","gik"],explanation:"Korrekt!"},{correct:"spiste",definition:"At have indtaget mad i fortiden (datid af 'spise').",options:["spiser","spist","spiste","kom","tog"],explanation:"Korrekt!"}]}]},{id:"tider",title:"Datid vs. Førnutid",verbs:["var","har været","kom","er kommet","drak","har drukket","har boet","boede","har læst","læste"],exercises:[{title:"Punktet eller Broen? - Sæt 1",instruction:"Husk: Punktet (datid) er et bestemt tidspunkt. Broen (førnutid) forbinder fortid og nu.",segments:[{type:"text",content:"1. **[I was in the cinema yesterday]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"var",options:["var","har været"],explanation:"hintContext"},{type:"text",content:" i biografen i går.\\n\\n2. **[I have been in the cinema many times]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"har været",options:["var","har været"],explanation:"hintContext"},{type:"text",content:" i biografen mange gange.\\n\\n3. **[In 2010 he came to Denmark]**\\nDansk: I 2010 "},{type:"gap",id:2,correct:"kom",options:["kom","er kommet"],explanation:"hintContext"},{type:"text",content:" han til Danmark.\\n\\n4. **[He has just come to Denmark]**\\nDansk: Han "},{type:"gap",id:3,correct:"er kommet",options:["kom","er kommet"],explanation:"hintContext"},{type:"text",content:" lige til Danmark.\\n\\n5. **[We drank coffee an hour ago]**\\nDansk: Vi "},{type:"gap",id:4,correct:"drak",options:["drak","har drukket"],explanation:"hintContext"},{type:"text",content:" kaffe for en time siden."}],phase2_tasks:[{correct:"var",definition:"Bruges om en tilstand på et bestemt tidspunkt i fortiden.",options:["var","har været"],explanation:"Korrekt!"},{correct:"har været",definition:"Bruges når vi ser på erfaringen frem til nu.",options:["var","har været"],explanation:"Korrekt!"},{correct:"kom",definition:"Bruges om ankomst på et bestemt årstal eller tidspunkt.",options:["kom","er kommet"],explanation:"Korrekt!"},{correct:"er kommet",definition:"Bruges når handlingen lige er sket og er vigtig nu.",options:["kom","er kommet"],explanation:"Korrekt!"},{correct:"drak",definition:"Bruges om kaffedrikning på et bestemt tidspunkt i fortiden.",options:["drak","har drukket"],explanation:"Korrekt!"}]}]}];class Le{constructor(s,t=null,r="main"){this.navigateFn=s,this.backView=r,this.currentCategoryIndex=t?U.findIndex(n=>n.id===t):0,this.currentCategoryIndex===-1&&(this.currentCategoryIndex=0),this.currentExerciseIndex=0,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={}}render(){const s=document.createElement("div");s.className="verbum-learning-view view-container";const t=U[this.currentCategoryIndex];if(!t)return s;const r=t.exercises[this.currentExerciseIndex];return r&&(s.innerHTML=`
      <div class="top-bar">
        <button class="back-btn" id="back-to-main">← ${e("back")}</button>
      </div>
      <h1>${t.title}</h1>
      
      <div class="exercise-card">
        <img src="${G}verber_kategorier.png" class="category-illustration" alt="Category Illustration">
        
        <div class="exercise-header">
          <h2 style="text-align: center;">${r.title}</h2>
          <p class="subtitle" style="text-align: center;">${this.currentPhase===1?r.instruction:e("verbExerciseSubtitle")}</p>
        </div>

        <div class="grammatik-text-container" id="exercise-content">
          ${this.currentPhase===1?this.renderPhase1(r):this.renderPhase2(r)}
        </div>

        <div class="exercise-feedback" id="exercise-feedback"></div>

        <div class="grammatik-summary" id="grammatik-summary">
          ${this.getSummaryText(r)}
        </div>

        <div class="game-controls">
          <button class="gemini-btn" id="check-answers">${e("checkAnswers")}</button>
          ${this.renderFooterButtons(t)}
        </div>
      </div>
`,this.attachEventListeners(s),this.ensureStyles()),s}getSummaryText(s){const r=(this.currentPhase===1?s.segments.filter(g=>g.type==="gap"):s.phase2_tasks).length,n=Object.values(this.feedback).filter(g=>g==="correct").length;return n===0?"":n===r?`<span class="success">${e("allCorrect")}</span>`:e("filledProgress",{n,total:r})}renderPhase1(s){const t=[];let r=null;return s.segments.forEach(n=>{n.type==="text"?n.content.split(/(\d+\.\s+)/).forEach(o=>{o.match(/^\d+\.\s+$/)&&(r&&t.push(r),r={segments:[]}),r&&r.segments.push({type:"text",content:o})}):r&&r.segments.push(n)}),r&&t.push(r),t.map((n,g)=>{let o=null;const l=n.segments.map(a=>{if(a.type==="text"){const i=a.content.match(/\*\*\[(.*?)\]\*\*/);i&&(o=i[1]);let p=a.content.replace(i?i[0]:"","").replace(/\\n/g," ").replace(/\d+\.\s+/g,"").replace(/Dansk:\s*/gi,"").replace(/\s+/g," ").trim();return p?`<span class="text-part">${p}</span>`:""}else{const i=this.feedback[a.id]==="correct",p=this.feedback[a.id]==="wrong";return`
                        <span class="select-wrapper">
                            <select class="grammatik-select ${i?"correct":""} ${p?"wrong":""}" data-id="${a.id}" ${i?"disabled":""}>
                                <option value="">...</option>
                                ${a.options.map(d=>`<option value="${d}" ${this.answers[a.id]===d?"selected":""}>${d}</option>`).join("")}
                            </select>
                        </span>
                    `}}).join(" ");return`
                <div class="sentence-row">
                    ${o?`<div class="sent-clue">${o}</div>`:""}
                    <div class="sentence-content">
                        <span class="sentence-number">${g+1}.</span>
                        ${l}
                    </div>
                </div>
            `}).join("")}renderPhase2(s){return s.phase2_tasks.map((t,r)=>{const n=`phase2-${r}`,g=this.feedback[n]==="correct",o=this.feedback[n]==="wrong";return`
                <div class="phase2-item">
                    <p class="definition"><strong>${r+1}.</strong> ${t.definition}</p>
                    <span class="select-wrapper">
                        <select class="grammatik-select ${g?"correct":""} ${o?"wrong":""}" data-task-id="${n}" ${g?"disabled":""}>
                            <option value="">...</option>
                            ${t.options.map(l=>`<option value="${l}" ${this.answers[n]===l?"selected":""}>${l}</option>`).join("")}
                        </select>
                    </span>
                </div>
            `}).join("")}renderFooterButtons(s){const t=s.exercises[this.currentExerciseIndex],r=this.currentPhase===1?t.segments.filter(l=>l.type==="gap").length:t.phase2_tasks.length;if(!(Object.values(this.feedback).filter(l=>l==="correct").length===r))return"";const o=this.currentExerciseIndex===s.exercises.length-1;return this.currentPhase===1?`<button class="gemini-btn" id="next-phase">${e("nextPhase")}</button>`:o?`<button class="gemini-btn" id="next-category">${e("nextCategory")}</button>`:`<button class="gemini-btn" id="next-exercise">${e("nextExercise")}</button>`}attachEventListeners(s){s.querySelector("#back-to-main").onclick=()=>{this.navigateFn(this.backView)},s.querySelectorAll(".grammatik-select").forEach(o=>{o.onchange=l=>{const c=l.target.dataset.id||l.target.dataset.taskId;this.answers[c]=l.target.value,delete this.feedback[c],this.showHints[c]=!1,this.updateView()}});const t=s.querySelector("#check-answers");if(t){t.onclick=()=>{const a=U[this.currentCategoryIndex].exercises[this.currentExerciseIndex];let i=!0,p="";this.currentPhase===1?a.segments.forEach(h=>{h.type==="gap"&&(this.answers[h.id]===h.correct?this.feedback[h.id]="correct":(this.feedback[h.id]="wrong",p||(p=e(h.explanation||"hintAction")),i=!1))}):a.phase2_tasks.forEach((h,v)=>{const f=`phase2-${v}`;this.answers[f]===h.correct?this.feedback[f]="correct":(this.feedback[f]="wrong",p||(p=h.explanation||e("hintAction")),i=!1)});const d=s.querySelector("#exercise-feedback");i?d.style.display="none":(d.textContent=p,d.style.display="block"),this.updateView()};const o=U[this.currentCategoryIndex].exercises[this.currentExerciseIndex],l=this.currentPhase===1?o.segments.filter(a=>a.type==="gap").length:o.phase2_tasks.length;Object.values(this.feedback).filter(a=>a==="correct").length===l&&(t.style.display="none")}const r=s.querySelector("#next-phase");r&&(r.onclick=()=>{this.currentPhase=2,this.answers={},this.feedback={},this.showHints={},this.updateView()});const n=s.querySelector("#next-exercise");n&&(n.onclick=()=>{this.currentExerciseIndex++,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={},this.updateView()});const g=s.querySelector("#next-category");g&&(g.onclick=()=>{this.currentCategoryIndex++,this.currentExerciseIndex=0,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={},this.updateView()})}updateView(){const s=document.querySelector(".verbum-learning-view");if(s){const t=this.render();s.replaceWith(t)}}ensureStyles(){document.getElementById("verbum-learning-styles")&&document.getElementById("verbum-learning-styles").remove();const s=document.createElement("style");s.id="verbum-learning-styles",s.textContent=`
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
            }
            .exercise-card {
                background: rgba(255, 255, 255, 0.03);
                border-radius: 24px;
                padding: 2.5rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
                margin-top: 1rem;
            }
            .sentence-row {
                display: block;
                padding: 2.2rem 0;
                border-bottom: 2px solid rgba(255, 255, 255, 0.1);
                text-align: center;
                width: 100%;
            }
            .sentence-row:last-child {
                border-bottom: none;
            }
            .sent-clue {
                display: block !important;
                font-size: 1.25rem !important;
                color: rgba(255, 255, 255, 0.7) !important;
                font-style: italic !important;
                margin-bottom: 1.2rem !important;
                font-weight: 300 !important;
                text-align: center !important;
                letter-spacing: 0.02rem;
            }
            .sentence-content {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                font-size: 1.7rem;
                line-height: 1.6;
                color: #fff;
                gap: 0.4rem 0.8rem;
            }
            .sentence-number {
                font-weight: 900;
                color: #ffcc00;
                font-size: 1.4rem;
                margin-right: 0.5rem;
            }
            .text-part {
                display: inline-block;
            }
            .select-wrapper {
                display: inline-block;
                margin: 0.2rem 0.3rem;
            }
            .grammatik-select {
                min-width: 140px !important;
                height: 3.2rem;
                font-size: 1.6rem !important;
                background: rgba(255,255,255,0.08) !important;
                border: 1px solid rgba(255,255,255,0.2) !important;
                color: #fff !important;
                border-radius: 12px !important;
                padding: 0 1rem !important;
            }
            @media (max-width: 600px) {
                .sentence-content { font-size: 1.4rem; gap: 0.3rem 0.5rem; }
                .grammatik-select { min-width: 100px !important; height: 2.6rem; font-size: 1.25rem !important; }
                .sentence-row { padding: 1.8rem 0; }
                .sent-clue { font-size: 1.1rem !important; margin-bottom: 0.8rem !important; }
                .sentence-number { font-size: 1.2rem; }
            }
            .phase2-item {
                background: rgba(255, 255, 255, 0.04);
                padding: 1.5rem;
                border-radius: 18px;
                margin-bottom: 2rem !important;
                text-align: left;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
        `,document.head.appendChild(s)}}function Ne(m,s){const t=document.createElement("div");t.className="view-container bestemthed-view";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("grounding"),r.appendChild(n),t.appendChild(r);const g=document.createElement("h1");g.textContent="Bestemthed - En eller Et?";const o=document.createElement("p");o.className="subtitle",o.textContent="Lær at vælge det rigtige kendeord (artikel) til navneord.",t.appendChild(g),t.appendChild(o);const l=document.createElement("div");l.className="exercise-container",t.appendChild(l);const c=[{word:"bil",correct:"en",icon:"🚗"},{word:"hus",correct:"et",icon:"🏠"},{word:"barn",correct:"et",icon:"👶"},{word:"kop",correct:"en",icon:"☕"},{word:"æble",correct:"et",icon:"🍎"},{word:"stol",correct:"en",icon:"🪑"}];let a=0,i=0;function p(){if(l.innerHTML="",a>=c.length){d();return}const h=c[a],v=document.createElement("div");v.className="step-content animate-in",v.innerHTML=`
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
        `,l.appendChild(v),v.querySelectorAll(".option-btn").forEach(f=>{f.onclick=()=>{const T=f.dataset.val,u=v.querySelector("#feedback");T===h.correct?(u.textContent="Korrekt! ✅",u.className="feedback-area success",i++,f.classList.add("correct"),setTimeout(()=>{a++,p()},1e3)):(u.textContent="Prøv igen! ❌",u.className="feedback-area error",f.classList.add("wrong"))}})}function d(){l.innerHTML=`
            <div class="step-content final-step animate-in">
                <div class="success-icon">🎉</div>
                <h2>Flot gået!</h2>
                <p>Du fik ${i} ud af ${c.length} rigtige.</p>
                <button class="gemini-btn" id="finish-btn">Tilbage til Grounding</button>
            </div>
        `,l.querySelector("#finish-btn").onclick=()=>s("grounding")}if(p(),!document.getElementById("bestemthed-styles")){const h=document.createElement("style");h.id="bestemthed-styles",h.textContent=`
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
        `,document.head.appendChild(h)}m.appendChild(t)}function Be(m,s,t={}){const r=document.createElement("div");r.className="view-container modal-force-view";const n={nounAnchor:t.nounAnchor||"Et",verbAnchor:(t.verbAnchor||"spiser").replace(" (nu)","").replace(" (i går)","").replace(" (senere)",""),selectedModal:t.selectedModal||""},g=document.createElement("div");g.className="top-bar";const o=document.createElement("button");o.className="back-btn",o.textContent="← "+e("back"),o.onclick=()=>s("grounding"),g.appendChild(o),r.appendChild(g);const l=document.createElement("h1");l.textContent=e("modalForceTitle");const c=document.createElement("p");c.className="subtitle",c.textContent=e("modalForceSubtitle"),r.appendChild(l),r.appendChild(c);const a=document.createElement("div");a.className="exercise-container",r.appendChild(a);function i(){a.innerHTML=`
            <div id="force-section" class="step-content animate-in">
                <div class="force-visualization" id="force-viz">
                    <div class="viz-placeholder">${e("modalForcePlaceholder")}</div>
                </div>

                <div class="modal-interaction">
                    <span class="sentence-part no-wrap">${n.nounAnchor} barn</span>
                    <select class="grammatik-select modal-select" id="modal-select">
                        <option value="">???</option>
                        <option value="skal" ${n.selectedModal==="skal"?"selected":""}>skal</option>
                        <option value="må" ${n.selectedModal==="må"?"selected":""}>må</option>
                        <option value="vil" ${n.selectedModal==="vil"?"selected":""}>vil</option>
                        <option value="kan" ${n.selectedModal==="kan"?"selected":""}>kan</option>
                    </select>
                    <span class="sentence-part">spise</span>
                </div>

                <div class="force-explanation" id="force-expl"></div>
                
                <div class="navigation-controls" style="margin-top: 2rem; ${n.selectedModal?"":"display: none;"}" id="nav-controls">
                    <button class="gemini-btn spotlight-btn" id="next-step-btn">${e("whyConjugateFirst")}</button>
                </div>
            </div>

            <div id="finiteness-section" class="step-content animate-in" style="display: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 3rem; margin-top: 3rem;">
                <h2 style="margin-top: 0;">${e("finitenessTitle")}</h2>
                <p class="subtitle" style="margin-bottom: 2rem;">${e("finitenessDesc")}</p>

                <div class="finiteness-visual timeline-layout">
                    <div class="finiteness-box timeline-box" id="timeline-box">
                        <div class="label">${e("timelineLabel")}</div>
                        <div class="svg-container" id="timeline-svg"></div>
                        <div class="word-anchor">
                            <div class="word-display" id="modal-word-marker">${n.selectedModal||"skal"}</div>
                        </div>
                        <div class="time-toggle">
                            <button class="toggle-btn" data-time="da">${e("pastLabel")}</button>
                            <button class="toggle-btn active" data-time="nu">${e("nowLabel")}</button>
                        </div>
                    </div>

                    <div class="finiteness-box action-box" id="action-box">
                        <div class="label">${e("actionLabel")}</div>
                        <div class="svg-container" id="photo-svg"></div>
                        <div class="word-display static-word" id="action-word-static">spise</div>
                    </div>
                </div>

                <div class="force-explanation visible" id="finiteness-expl">
                    ${e("finitenessExpl")}
                </div>

                <div id="teaser-section" class="recommendation-box animate-in" style="margin-top: 4rem; display: none; text-align: center;">
                    <h4 style="font-size: 1.5rem; margin-bottom: 1.5rem;">${e("adjectiveTitle")}</h4>
                    <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">
                        ${e("adjectiveTeaser")}
                    </p>
                    <button class="gemini-btn spotlight-btn" id="go-to-adj-btn">
                        ${e("nextStepAdjective")}
                    </button>
                </div>

                <div class="recommendation-box" style="margin-top: 4rem;">
                    <h4 style="font-size: 1.5rem; margin-bottom: 1.5rem;">${e("modalTeaserTitle")}</h4>
                    <div class="recommendation-grid">
                        <button class="rec-btn spotlight-btn" id="rec-hjaelpe" style="min-width: 280px;">
                            <span class="rec-icon">⚡</span>
                            <span class="rec-label">${e("modalPracticeLabel")}</span>
                        </button>
                    </div>
                </div>

                <div class="navigation-controls" style="margin-top: 3rem;">
                    <button class="gemini-btn outline-btn" id="finish-btn">${e("finishBtn")}</button>
                </div>
            </div>
        `;const h=a.querySelector("#modal-select"),v=a.querySelector("#force-viz"),f=a.querySelector("#force-expl"),T=a.querySelector("#nav-controls"),u=a.querySelector("#next-step-btn"),b=a.querySelector("#teaser-section"),j=a.querySelector("#go-to-adj-btn"),E=a.querySelector("#finish-btn"),k=a.querySelector("#rec-hjaelpe");n.selectedModal&&(h.value=n.selectedModal,d(n.selectedModal,v,f)),h.onchange=()=>{const w=h.value;if(n.selectedModal=w,d(w,v,f),w){T.style.display="block";const C=a.querySelector("#modal-word-marker");C&&(C.textContent=w)}},u.onclick=()=>{const w=a.querySelector("#finiteness-section");w.style.display="block",p(),u.style.display="none",setTimeout(()=>{w.scrollIntoView({behavior:"smooth",block:"start"})},50),setTimeout(()=>{b.style.display="block"},1500)},j.onclick=()=>s("adjective_bridge",{nounAnchor:n.nounAnchor,selectedModal:n.selectedModal}),E.onclick=()=>s("dagens_opgave"),k.onclick=()=>s("verbum_learning",{categoryId:"hjaelpe"})}function p(){const h=a.querySelector("#timeline-svg"),v=a.querySelector("#photo-svg"),f=a.querySelector("#modal-word-marker"),T=a.querySelectorAll(".toggle-btn"),u=a.querySelector("#action-word-static");h.innerHTML=`
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
        `,T.forEach(b=>{b.onclick=()=>{T.forEach(w=>w.classList.remove("active")),b.classList.add("active");const j=b.dataset.time,E=n.selectedModal||"skal",k=a.querySelector("#moving-dot");if(j==="da"){k.setAttribute("cx","100");const w={skal:"skulle",må:"måtte",vil:"ville",kan:"kunne"};f.textContent=w[E]||E,f.style.color="#ff9800",f.classList.add("shift-past")}else k.setAttribute("cx","300"),f.textContent=E,f.style.color="white",f.classList.remove("shift-past");u.classList.add("action-pulse"),setTimeout(()=>u.classList.remove("action-pulse"),800)}})}function d(h,v,f){v.innerHTML="",f.innerHTML="",f.className="force-explanation visible";let T="",u="";const b=`
            <style>
                .viz-svg { width: 100%; max-width: 500px; height: 300px; }
                .stickman { stroke: white; stroke-width: 3; fill: none; }
                .target { fill: #ffeb3b; filter: drop-shadow(0 0 10px rgba(255, 235, 59, 0.5)); }
                .force-line { stroke-width: 4; stroke-linecap: round; fill: none; }
            </style>
        `;h==="skal"?(u=e("modalForceSkal"),T=`
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
            `):h==="må"?(u=e("modalForceMaa"),T=`
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
            `):h==="vil"?(u=e("modalForceVil"),T=`
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
            `):h==="kan"&&(u=e("modalForceKan"),T=`
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
            `),v.innerHTML=b+T,f.innerHTML=u}if(i(),!document.getElementById("modal-force-styles")){const h=document.createElement("style");h.id="modal-force-styles",h.textContent=`
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
        `,document.head.appendChild(h)}m.appendChild(r)}function He(m,s,t={}){const r=document.createElement("div");r.className="view-container adjective-bridge-view";const n={nounAnchor:t.nounAnchor||"Et",selectedModal:t.selectedModal||"skal",selectedAdjective:""},g=document.createElement("div");g.className="top-bar";const o=document.createElement("button");o.className="back-btn",o.textContent="← "+e("back"),o.onclick=()=>s("modal_force",{nounAnchor:n.nounAnchor,selectedModal:n.selectedModal}),g.appendChild(o),r.appendChild(g);const l=document.createElement("h1");l.textContent=e("adjectiveTitle");const c=document.createElement("p");c.className="subtitle",c.textContent=e("adjectiveDesc"),r.appendChild(l),r.appendChild(c);const a=document.createElement("div");a.className="exercise-container",r.appendChild(a);function i(){a.innerHTML=`
            <div class="step-content animate-in">
                <div class="adjective-visual">
                    <div class="projector-container">
                        <div class="label">${e("adjectiveLabel")}</div>
                        <div class="svg-container" id="adj-projector-svg"></div>
                    </div>
                    
                    <div class="adjective-interaction">
                        <div class="sentence-preview" id="adj-sentence-preview">
                            <span class="sentence-part">${n.nounAnchor}</span>
                            <select class="grammatik-select adj-select" id="adj-select">
                                <option value="">???</option>
                                <!-- Dynamic options inserted here -->
                            </select>
                            <span class="sentence-part">barn <span id="adj-modal-inherited">${n.selectedModal}</span> spise</span>
                        </div>
                    </div>
                </div>

                <div class="force-explanation" id="adj-expl"></div>

                <div class="navigation-controls" style="margin-top: 3rem;" id="agreement-nav">
                    <button class="gemini-btn spotlight-btn" id="next-agreement-btn">${e("whyConjugateAdjectives")}</button>
                </div>
            </div>

            <div id="agreement-section" class="step-content animate-in" style="display: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4rem; margin-top: 3rem;">
                <h2 style="margin-top: 0;">${e("agreementTitle")}</h2>
                <p class="subtitle" style="margin-bottom: 3rem;">${e("agreementDesc")}</p>

                <div class="agreement-visual">
                    <div class="magnet-container">
                        <div class="adjective-shape-box" id="adj-shaped">
                        <div class="shape-label">${e("adjective")}</div>
                            <div class="word-container">
                                <span class="stem">stor</span><span class="suffix" id="adj-suffix">x</span>
                            </div>
                        </div>

                        <!-- Magnetic Waves SVG -->
                        <div class="magnet-waves" id="magnet-waves-svg"></div>

                        <div class="noun-influence-box" id="noun-magnet">
                            <div class="magnet-label">${e("noun")}</div>
                            <div class="magnet-word" id="magnet-noun-display">Barn</div>
                        </div>
                    </div>

                    <div class="agreement-controls">
                        <div class="control-group">
                            <button class="toggle-btn active" data-type="ubestemt">${e("ubestemtLabel")}</button>
                            <button class="toggle-btn" data-type="bestemt">${e("bestemtLabel")}</button>
                        </div>
                        <div class="control-group" style="margin-top: 1rem;">
                            <button class="toggle-btn active" data-word="barn">${e("exampleBarn")}</button>
                            <button class="toggle-btn" data-word="bil">${e("exampleBil")}</button>
                        </div>
                    </div>
                </div>

                <div class="force-explanation visible" id="agreement-expl-box">
                    ${e("agreementExpl")}
                </div>

                <div class="recommendation-box animate-in" style="margin-top: 4rem;">
                    <div class="rec-title">${e("practiceMoreTitle")}</div>
                    <div class="rec-links">
                        <a href="#" class="rec-link" id="adj-comp-link">
                            <span class="icon">📈</span>
                            ${e("adjectiveComparisonLink")}
                        </a>
                    </div>
                </div>

                <div class="adverb-teaser animate-in" style="margin-top: 5rem; text-align: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 4rem;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem; color: #ffffff;">${e("adverbTeaser")}</h3>
                    <div class="navigation-controls">
                        <button class="gemini-btn spotlight-btn" id="next-adverb-btn">${e("nextStepAdverb")}</button>
                    </div>
                </div>

                <div class="navigation-controls" style="margin-top: 4rem; opacity: 0.5;">
                    <button class="back-btn" id="finish-btn" style="margin: 0 auto;">${e("back")}</button>
                </div>
            </div>
        `;const d=a.querySelector("#adj-projector-svg"),h=a.querySelector("#adj-select"),v=a.querySelector("#adj-expl"),f=a.querySelector("#finish-btn"),T=a.querySelector("#next-agreement-btn");d.innerHTML=`
            <svg viewBox="0 0 200 120" class="projector-svg-main">
                <rect x="20" y="40" width="60" height="40" rx="4" fill="#444" stroke="white" stroke-width="2" />
                <circle cx="40" cy="60" r="12" fill="#333" stroke="white" />
                <!-- Beam -->
                <path id="adj-beam" d="M 80 60 L 180 20 L 180 100 Z" fill="rgba(255, 235, 59, 0.4)" style="transition: all 0.5s ease;" />
                <!-- Highlighted area (Kugle) -->
                <circle id="adj-target-circle" cx="180" cy="60" r="35" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="1" style="transition: all 0.8s ease;" />
            </svg>
        `;const u=[{id:"stor",forms:{en:"stor",et:"stort",def:"store"}},{id:"træt",forms:{en:"træt",et:"træt",def:"trætte"}},{id:"smuk",forms:{en:"smuk",et:"smukt",def:"smukke"}}],j=n.nounAnchor!=="Et"&&n.nounAnchor!=="En"?"def":n.nounAnchor==="Et"?"et":"en";h.innerHTML+=u.map(w=>`<option value="${w.forms[j]}" data-base="${w.id}">${w.forms[j]}</option>`).join(""),h.onchange=()=>{const C=h.options[h.selectedIndex].dataset.base,H=h.value;if(!C)return;n.selectedAdjective=H,v.innerHTML=`
                <div class="agreement-notice">
                    <strong>${n.nounAnchor} ${H} barn...</strong><br>
                    ${e("adjectiveExpl")}
                </div>
            `,v.className="force-explanation visible";const S=a.querySelector("#adj-beam"),y=a.querySelector("#adj-target-circle"),N={stor:{beam:"rgba(76, 175, 80, 0.5)",circle:"rgba(76, 175, 80, 0.4)"},træt:{beam:"rgba(100, 149, 237, 0.5)",circle:"rgba(100, 149, 237, 0.4)"},smuk:{beam:"rgba(255, 105, 180, 0.6)",circle:"rgba(255, 105, 180, 0.5)"}}[C]||{beam:"rgba(255, 255, 255, 0.4)",circle:"rgba(255, 255, 255, 0.2)"};S.style.fill=N.beam,y.style.fill=N.circle,y.setAttribute("r","40"),setTimeout(()=>y.setAttribute("r","35"),500)},f.onclick=()=>s("dagens_opgave");const E=a.querySelector("#adj-comp-link");E.onclick=w=>{w.preventDefault(),s("adjective_comparison")};const k=a.querySelector("#next-adverb-btn");k.onclick=()=>{s("adverb_bridge",{nounAnchor:n.nounAnchor,selectedNoun:n.selectedNoun||"barn",selectedVerb:n.selectedVerb||"spiser",isPlural:n.isPlural||!1})},T.onclick=()=>{const w=a.querySelector("#agreement-section");w.style.display="block",p(),T.style.display="none",setTimeout(()=>{w.scrollIntoView({behavior:"smooth",block:"start"})},50)}}function p(){const d=a.querySelector("#magnet-waves-svg"),h=a.querySelector("#magnet-noun-display"),v=a.querySelector("#adj-suffix"),f=a.querySelector(".stem"),T=a.querySelectorAll(".toggle-btn");let u="barn",b="ubestemt";function j(){const k=b==="bestemt"?"#4caf50":"rgba(255,255,255,0.5)",w=b==="bestemt"?"1.0":"0.4",C=b==="bestemt"?"4":"2";d.innerHTML=`
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
            `}function E(){u==="barn"?(h.textContent=e("exampleBarn").split(" ")[0],f.textContent="stor",b==="bestemt"?(v.textContent="e",v.classList.add("active")):(v.textContent="t",v.classList.add("active"))):(h.textContent=e("exampleBil").split(" ")[0],f.textContent="hurtig",b==="bestemt"?(v.textContent="e",v.classList.add("active")):(v.textContent="",v.classList.remove("active"))),j()}T.forEach(k=>{k.onclick=()=>{k.parentElement.querySelectorAll(".toggle-btn").forEach(C=>C.classList.remove("active")),k.classList.add("active"),k.dataset.type&&(b=k.dataset.type),k.dataset.word&&(u=k.dataset.word),E()}}),E()}if(i(),!document.getElementById("adj-bridge-styles")){const d=document.createElement("style");d.id="adj-bridge-styles",d.textContent=`
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
        `,document.head.appendChild(d)}m.appendChild(r)}function _e(m,s,t={}){const r=t.nounAnchor||L.nounAnchor||"Et",n=t.selectedNoun||L.selectedNoun||"barn",g=t.selectedVerb||L.selectedVerb||"spiser";let o="langsomt";m.innerHTML=`
        <div class="grounding-container animate-in">
            <div class="header-section">
                <button class="back-btn" id="back-to-adj">←</button>
                <h1>${e("adverbTitle")}</h1>
                <p class="subtitle">${e("adverbDesc")}</p>
            </div>

            <div class="bridge-exercise-area">
                <div class="adverb-visual-section">
                    <div class="projector-container">
                        <div class="label">${e("projektørLabel")}</div>
                        <div class="svg-container" id="adv-projector-svg"></div>
                    </div>

                    <div class="handling-container">
                        <div class="handling-box" id="verb-box">
                            <div class="box-label">${e("handlingLabel")}</div>
                            <div class="box-word">${g}</div>
                        </div>
                        
                        <!-- Dynamic Waves Container -->
                        <div class="waves-interaction-area" id="waves-container"></div>

                        <div class="adverb-box" id="active-adv-box">
                            <div class="box-label">${e("adverb")}</div>
                            <div class="box-word" id="active-adverb">${e("advLangsomt")}</div>
                        </div>
                    </div>
                </div>

                <div class="sentence-display">
                    <span class="noun-anchor">${r}</span>
                    <span class="adjective-part" id="sentence-adj">stort</span>
                    <span class="noun-part">${n}</span>
                    <span class="verb-part" id="verb-display">${g}</span>
                    <div class="adverb-drop-zone">
                        <select id="adverb-select" class="grammatik-select premium-select">
                            <option value="langsomt">${e("advLangsomt")}</option>
                            <option value="hurtigt">${e("advHurtigt")}</option>
                            <option value="meget">${e("advMeget")}</option>
                            <option value="lidt">${e("advLidt")}</option>
                        </select>
                    </div>
                </div>

                <div class="force-explanation visible" id="adverb-expl-box">
                    ${e("adverbExpl")}
                </div>

                <div class="adverb-teaser animate-in" style="margin-top: 5rem; text-align: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 4rem;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem; color: #ffffff;">${e("adverbTeaserNext")}</h3>
                    <div class="navigation-controls">
                        <button class="gemini-btn spotlight-btn" id="next-conjunction-btn">${e("nextStepAfterAdverb")}</button>
                    </div>
                </div>

                <div class="navigation-controls" style="margin-top: 4rem; opacity: 0.5;">
                    <button class="back-btn" id="finish-btn" style="margin: 0 auto;">${e("back")}</button>
                </div>
            </div>
        </div>
    `;const l=m.querySelector("#back-to-adj"),c=m.querySelector("#finish-btn"),a=m.querySelector("#adverb-select"),i=m.querySelector("#active-adverb"),p=m.querySelector("#waves-container"),d=m.querySelector("#adv-projector-svg"),h=m.querySelector("#sentence-adj");d.innerHTML=`
        <svg viewBox="0 0 200 120" class="projector-svg-main">
            <rect x="20" y="40" width="60" height="40" rx="4" fill="#444" stroke="white" stroke-width="2" />
            <circle cx="40" cy="60" r="12" fill="#333" stroke="white" />
            <path id="adv-beam" d="M 80 60 L 180 20 L 180 100 Z" fill="rgba(255, 235, 59, 0.4)" style="transition: all 0.5s ease;" />
        </svg>
    `;const v=u=>u==="Et"?"stort":u==="Det"||u==="Mit"?"store":"stort";h.textContent=v(r);function f(u){let b="1.5s",j=3,E="#ffeb3b",k=2;u==="hurtigt"?(b="0.4s",E="#4caf50",j=5):u==="langsomt"?(b="3.5s",E="#2196f3",j=2):u==="meget"?(b="1s",E="#f44336",j=8,k=4):u==="lidt"&&(b="2s",E="#9e9e9e",j=1,k=1);let w="";for(let H=0;H<j;H++){const y=30+(H-(j-1)/2)*10;w+=`
                <path d="M 10 ${y} Q 50 ${y-10} 90 ${y} T 170 ${y}" fill="none" stroke="${E}" stroke-width="${k}" opacity="0.7">
                    <animate attributeName="d" values="M 10 ${y} Q 50 ${y-10} 90 ${y} T 170 ${y}; M 10 ${y} Q 50 ${y+10} 90 ${y} T 170 ${y}; M 10 ${y} Q 50 ${y-10} 90 ${y} T 170 ${y}" dur="${b}" repeatCount="infinite" />
                </path>
            `}p.innerHTML=`
            <svg viewBox="0 0 180 60" style="width: 100%; height: 60px;">
                ${w}
            </svg>
        `;const C=d.querySelector("#adv-beam");if(C){C.style.fill=E.replace(")",", 0.4)").replace("#","rgba(");const H={hurtigt:"rgba(76, 175, 80, 0.4)",langsomt:"rgba(33, 150, 243, 0.4)",meget:"rgba(244, 67, 54, 0.4)",lidt:"rgba(158, 158, 158, 0.4)"};C.style.fill=H[u]||"rgba(255, 235, 59, 0.4)"}}a.onchange=u=>{o=u.target.value,i.textContent=e("adv"+o.charAt(0).toUpperCase()+o.slice(1)),f(o),i.parentElement.classList.add("pulse"),setTimeout(()=>i.parentElement.classList.remove("pulse"),500)},l.onclick=()=>s("adjective_bridge"),c.onclick=()=>s("dagens_opgave");const T=m.querySelector("#next-conjunction-btn");if(T.onclick=()=>s("conjunction_bridge",{nounAnchor:r,selectedNoun:n,selectedVerb:g,selectedAdverb:o,adjectivePart:h.textContent}),f(o),!document.getElementById("adverb-bridge-styles")){const u=document.createElement("style");u.id="adverb-bridge-styles",u.textContent=`
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
        `,document.head.appendChild(u)}}function Fe(m,s,t={}){const r=t.nounAnchor||L.nounAnchor||"Et",n=t.selectedNoun||L.selectedNoun||"barn",g=t.selectedVerb||L.selectedVerb||"spiser",o=t.selectedAdverb||L.selectedAdverb||"langsomt",l=t.adjectivePart||"stort";let c="fordi";m.innerHTML=`
        <div class="grounding-container animate-in">
            <div class="header-section">
                <button class="back-btn" id="back-to-adv">←</button>
                <h1>${e("conjunctionTitle")}</h1>
                <p class="subtitle">${e("conjunctionDesc")}</p>
            </div>

            <div class="bridge-exercise-area">
                <div class="conjunction-visual-section">
                    <div class="flow-container" id="flow-visual-area">
                        <div class="sentence-node" id="node-1">${e("sentenceNode1")}</div>
                        <div class="flow-path-wrapper">
                            <div class="conj-label" id="conj-indicator">${e("conjFordi")}</div>
                            
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
                        <div class="sentence-node" id="node-2">${e("sentenceNode2")}</div>
                    </div>
                </div>

                <div class="full-sentence-display">
                    <div class="sentence-part-1">
                        <span class="noun-anchor">${r}</span>
                        <span class="adjective-part">${l}</span>
                        <span class="noun-part">${n}</span>
                        <span class="verb-part">${g}</span>
                        <span class="adverb-part">${o}</span>
                    </div>
                    
                    <div class="conjunction-part">
                        <span id="punctuation-before">,</span>
                        <select id="conjunction-select" class="grammatik-select premium-select conj-select">
                            <option value="fordi">${e("conjFordi")}</option>
                            <option value="når">${e("conjNaar")}</option>
                            <option value="da">${e("conjDa")}</option>
                            <option value="selvom">${e("conjSelvom")}</option>
                            <option value="alligevel">${e("conjAlligevel")}</option>
                            <option value="men">${e("conjMen")}</option>
                            <option value="Derfor">${e("conjDerfor")}</option>
                        </select>
                    </div>
                </div>

                <div class="force-explanation visible" id="conj-expl-box">
                    ${e("conjunctionExpl")}
                </div>

                <div class="recommendation-box animate-in" style="margin-top: 4rem;">
                    <div class="rec-title">${e("practiceMoreTitle")}</div>
                    <div class="rec-links">
                        <a href="#" class="rec-link" id="conj-practice-link">
                            <span class="icon">🔗</span>
                            ${e("conjunctionPracticeLink")}
                        </a>
                    </div>
                </div>

                <p class="reflection-text animate-in" style="margin-top: 2rem; color: var(--text-muted); font-style: italic; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                    ${e("conjunctionClosingReflection")}
                </p>

                <div class="navigation-controls" style="margin-top: 4rem;">
                    <button class="gemini-btn spotlight-btn" id="finish-btn">${e("nextStepAfterConjunction")}</button>
                </div>
            </div>
        </div>
    `;const a=m.querySelector("#back-to-adv"),i=m.querySelector("#finish-btn"),p=m.querySelector("#conjunction-select"),d=m.querySelector("#punctuation-before"),h=m.querySelector("#conj-practice-link"),v=m.querySelector("#flow-path"),f=m.querySelector("#conj-indicator"),T=m.querySelector("#clock-group"),u=m.querySelector("#timeline-base"),b=m.querySelector("#obstacle-group"),j=m.querySelector("#obs-part-1"),E=m.querySelector("#obs-part-2"),k=m.querySelector("#moving-arrow");function w(C){c=C,f.textContent=e("conj"+C.charAt(0).toUpperCase()+C.slice(1));const H=m.querySelector("#conj-expl-box");H&&(H.innerHTML=e(`conjExpl_${C.toLowerCase()}`)),T.style.opacity="0",u.style.opacity="0",b.style.opacity="0",k.style.opacity="0",j.setAttribute("y","30"),E.setAttribute("y","60"),v.style.opacity="1",v.style.strokeDasharray="none",v.classList.remove("animate-flow-lr","animate-flow-rl","animate-flow-break"),C==="Derfor"?(d.textContent=".",d.style.marginRight="1rem"):(d.textContent=",",d.style.marginRight="0.5rem");let S="#4caf50",y="M 50 60 L 350 60",A=!0;C==="fordi"?(S="#4caf50",y="M 50 60 L 350 60",v.classList.add("animate-flow-lr")):C==="Derfor"?(S="#4caf50",y="M 350 60 L 50 60",v.classList.add("animate-flow-rl")):C==="da"?(S="#2196f3",u.style.opacity="0.5",T.style.opacity="1",T.classList.add("animate-clock-past"),v.style.opacity="0",A=!1):C==="når"?(S="#2196f3",u.style.opacity="0.5",T.style.opacity="1",T.classList.add("animate-clock-future"),v.style.opacity="0",A=!1):C==="alligevel"?(S="#ff9800",b.style.opacity="1",v.classList.add("animate-flow-lr")):C==="selvom"?(S="#f44336",b.style.opacity="1",v.classList.add("animate-flow-break"),j.classList.add("animate-split-up"),E.classList.add("animate-split-down")):C==="men"&&(S="#f44336",y="M 50 60 Q 200 10 350 60",v.classList.add("animate-flow-lr")),v&&(v.setAttribute("d",y),v.setAttribute("stroke",S),v.style.animation="none",v.offsetHeight,v.style.animation=null),A&&k&&(k.style.opacity="1",k.style.color=S,k.innerHTML=`
                <polygon points="-12,-6 2,0 -12,6" fill="currentColor" />
                <animateMotion dur="1.5s" repeatCount="infinite" path="${y}" rotate="auto" />
            `),f.style.background=S,f.classList.add("pulse"),setTimeout(()=>f.classList.remove("pulse"),500)}if(p.onchange=C=>{T.classList.remove("animate-clock-past","animate-clock-future"),j.classList.remove("animate-split-up"),E.classList.remove("animate-split-down"),w(C.target.value)},a.onclick=()=>s("adverb_bridge",{nounAnchor:r,selectedNoun:n,selectedVerb:g,selectedAdverb:o,adjectivePart:l}),i.onclick=()=>s("dagens_opgave"),h.onclick=C=>{C.preventDefault(),s("traen_grammatik")},w(c),!document.getElementById("conj-bridge-styles")){const C=document.createElement("style");C.id="conj-bridge-styles",C.textContent=`
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
        `,document.head.appendChild(C)}}function Me(m,s){const t=document.createElement("div");t.className="view-container adjective-comparison";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+e("back"),n.onclick=()=>s("pronomen"),r.appendChild(n),t.appendChild(r);const g=document.createElement("h1");g.textContent=e("adjComparisonTitle"),t.appendChild(g);const o=document.createElement("p");o.className="subtitle",o.textContent=e("adjComparisonDesc"),t.appendChild(o);const l=document.createElement("div");l.className="exercise-area",t.appendChild(l);const c=[{positive:"højt",comparative:"højere",superlative:"højest",example:"Bjerget er [word]."},{positive:"stort",comparative:"større",superlative:"størst",example:"Huset er [word]."},{positive:"grønt",comparative:"grønnere",superlative:"grønnest",example:"Græsset er [word]."}];let a=0,i="positive";function p(){const u=c[a];l.innerHTML=`
            <div class="adj-tabs">
                ${c.map((b,j)=>`
                    <button class="tab-btn ${j===a?"active":""}" data-idx="${j}">
                        ${b.positive}
                    </button>
                `).join("")}
            </div>

            <div class="tree-comparison-container">
                <div class="tree-stage">
                    <!-- Tree 1: Positive -->
                    <div class="tree-box ${i==="positive"?"selected":""}" data-grade="positive">
                        <div class="tree-visual" id="tree-1">
                            <svg viewBox="0 0 100 120">
                                <rect x="45" y="80" width="10" height="30" fill="#5D4037" />
                                <circle cx="50" cy="60" r="30" fill="#4CAF50" />
                            </svg>
                        </div>
                        <div class="grade-label">${e("positiveLabel")}</div>
                        <div class="grade-word">${u.positive}</div>
                    </div>

                    <!-- Tree 2: Comparative -->
                    <div class="tree-box ${i==="comparative"?"selected":""}" data-grade="comparative">
                        <div class="tree-visual" id="tree-2">
                            <svg viewBox="0 0 100 150">
                                <rect x="42" y="100" width="16" height="40" fill="#5D4037" />
                                <circle cx="50" cy="70" r="45" fill="#388E3C" />
                                <!-- Comparison Line -->
                                ${i==="comparative"||i==="superlative"?'<line x1="100" y1="100" x2="-20" y2="100" stroke="rgba(255,255,255,0.3)" stroke-dasharray="4" />':""}
                            </svg>
                        </div>
                        <div class="grade-label">${e("comparativeLabel")}</div>
                        <div class="grade-word">${u.comparative}</div>
                    </div>

                    <!-- Tree 3: Superlative -->
                    <div class="tree-box ${i==="superlative"?"selected":""}" data-grade="superlative">
                        <div class="tree-visual" id="tree-3">
                            <svg viewBox="0 0 100 180">
                                <rect x="40" y="120" width="20" height="50" fill="#5D4037" />
                                <circle cx="50" cy="80" r="60" fill="#2E7D32" />
                            </svg>
                        </div>
                        <div class="grade-label">${e("superlativeLabel")}</div>
                        <div class="grade-word">${u.superlative}</div>
                    </div>
                </div>

                <div class="example-box animate-in">
                    <div class="example-label">${e("example")}</div>
                    <div class="example-text">
                        ${u.example.replace("[word]",`<span class="highlight highlight-grad">${u[i]}</span>`)}
                    </div>
                </div>

                <div class="interactive-comparison" id="comparison-highlight">
                    <!-- Dynamic comparison indicator -->
                </div>
            </div>

            <div class="adj-practice-section" style="margin-top: 4rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 3rem;">
                <h2 style="text-align: center; margin-bottom: 2rem;">${e("practiceMoreInflections")}</h2>
                
                <div id="adj-exercises-container">
                    <!-- Exercises rendered here -->
                </div>

                <div id="exercise-summary" class="grammatik-summary" style="margin-top: 2rem; text-align: center;"></div>

                <div style="text-align: center; margin-top: 2rem;">
                    <button id="next-set-btn" class="gemini-btn" style="display: none;">${e("newExercise")}</button>
                </div>
            </div>
        `,l.querySelectorAll(".tab-btn").forEach(b=>{b.onclick=()=>{a=parseInt(b.dataset.idx),p()}}),l.querySelectorAll(".tree-box").forEach(b=>{b.onclick=()=>{i=b.dataset.grade,p()}}),T(),v()}const d=[[{text:"Jeg ser en [blank_0] fugl.",options:["gul","gult","gule"],answer:"gul",feedback:e("adjFeedback1")},{text:"Min bror er [blank_1] end mig.",options:["høj","højere","højest"],answer:"højere",feedback:e("adjFeedback2")},{text:"Det er det [blank_2] træ i skoven.",options:["høj","højere","højeste"],answer:"højeste",feedback:e("adjFeedback3")},{text:"Vi spiser [blank_3] æbler.",options:["rød","rødt","røde"],answer:"røde",feedback:e("adjFeedback4")},{text:"Det [blank_4] barn leger i haven.",options:["glad","gladt","glade"],answer:"glade",feedback:e("adjFeedback5")}],[{text:"Huset er [blank_0] end bilen.",options:["stor","større","størst"],answer:"større",feedback:e("adjFeedback6")},{text:"Hun har et [blank_1] smil.",options:["smuk","smukt","smukke"],answer:"smukt",feedback:e("adjFeedback7")},{text:"Det er den [blank_2] dag i mit liv.",options:["god","bedre","bedste"],answer:"bedste",feedback:e("adjFeedback8")},{text:"De [blank_3] blomster dufter godt.",options:["smuk","smukt","smukke"],answer:"smukke",feedback:e("adjFeedback9")},{text:"Græsset er [blank_4].",options:["grøn","grønt","grønne"],answer:"grønt",feedback:e("adjFeedback10")}]];let h=0;function v(){const u=t.querySelector("#adj-exercises-container"),b=d[h];u.innerHTML=b.map((k,w)=>`
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
        `).join("");const j=u.querySelectorAll(".adj-practice-select"),E=document.getElementById("next-set-btn");j.forEach(k=>{k.onchange=()=>{const w=k.dataset.idx,C=b[w],H=document.getElementById(`feedback-${w}`);k.value===C.answer?(k.classList.add("correct"),k.classList.remove("wrong"),H.textContent=C.feedback,H.style.display="block"):k.value===""?(k.classList.remove("correct","wrong"),H.style.display="none"):(k.classList.add("wrong"),k.classList.remove("correct"),H.style.display="none"),f(j)}}),E&&(E.onclick=()=>{h=(h+1)%d.length,p()})}function f(u){const b=t.querySelector("#exercise-summary"),j=t.querySelector("#next-set-btn"),E=Array.from(u).filter(C=>C.value!=="").length,k=Array.from(u).filter(C=>C.classList.contains("correct")).length,w=u.length;E===0?b.textContent="":k===w?(b.innerHTML=`<span class="success">${e("allCorrect")}</span>`,j&&(j.style.display="inline-block")):b.textContent=`${E} / ${w} ${e("filled")||"udfyldt"}`}function T(){const u=l.querySelector("#comparison-highlight");i==="comparative"?u.innerHTML=`
                <div class="comparison-bubble">
                    ${e("comparisonBubbleComp")}
                </div>
            `:i==="superlative"?u.innerHTML=`
                <div class="comparison-bubble">
                    ${e("comparisonBubbleSuper")}
                </div>
            `:u.innerHTML=""}if(p(),m.appendChild(t),!document.getElementById("adj-comp-styles")){const u=document.createElement("style");u.id="adj-comp-styles",u.textContent=`
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
        `,document.head.appendChild(u)}}function ze(m,s){const t=document.createElement("div");t.className="view-container";const r=document.createElement("div");r.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.innerHTML=`← ${e("back")}`,n.onclick=()=>s("main"),r.appendChild(n),t.appendChild(r);const g=document.createElement("h1");g.textContent=e("verbumLearning"),t.appendChild(g);const o=document.createElement("p");o.className="subtitle",o.textContent=e("hvilketVerbDesc"),t.appendChild(o);const l=document.createElement("div");l.className="grid",[{key:"verberHjaelpe",type:"hjaelpe",icon:"💡"},{key:"verberTilstand",type:"tilstand",icon:"🏠"},{key:"verberBevaegelse",type:"bevaegelse",icon:"🚶"},{key:"verberHandling",type:"handling",icon:"🛠️"},{key:"verberInteraktion",type:"interaktion",icon:"🗣️"},{key:"verberIndreLiv",type:"indre_liv",icon:"🧠"}].forEach(a=>{const i=document.createElement("div");i.className="card",i.onclick=()=>s("verbum_learning",{categoryId:a.type,backView:"verbum_menu"});const p=document.createElement("div");p.className="card-icon",p.textContent=a.icon;const d=document.createElement("div");d.className="card-title",d.textContent=e(a.key),i.appendChild(p),i.appendChild(d),l.appendChild(i)}),t.appendChild(l),m.appendChild(t)}function _(m,s={},t=!1){const r=document.querySelector("#app");if(r.innerHTML="",!t){let n="/"+m;if(s&&Object.keys(s).length>0){const g=new URLSearchParams(s);n+="?"+g.toString()}window.location.hash=n}if(m==="language")L.currentView="language",ne(r,_);else if(m==="main")L.currentView="main",re(r,_);else if(m==="notes")L.currentView="notes",ae(r,_);else if(m==="dagens_opgave")L.currentView="dagens_opgave",ie(r,_);else if(m==="word_learning")L.currentView="word_learning",oe(r,_);else if(m==="samtale_traening")L.currentView="samtale_traening",se(r,_);else if(m==="samtale_hverdag")L.currentView="samtale_hverdag",le(r,_);else if(m==="skrive_hjaelp")L.currentView="skrive_hjaelp",de(r,_);else if(m==="du1_modul3")L.currentView="du1_modul3",ce(r,_);else if(m==="du2_modul1")L.currentView="du2_modul1",he(r,_);else if(m==="smaa_historier")L.currentView="smaa_historier",be(r,_);else if(m==="du2_modul5")L.currentView="du2_modul5",ve(r,_);else if(m==="email_laan")L.currentView="email_laan",ke(r,_);else if(m==="opdragelse")L.currentView="opdragelse",xe(r,_);else if(m==="en_klage")L.currentView="en_klage",fe(r,_);else if(m==="du1_min_hverdag")L.currentView="du1_min_hverdag",me(r,_);else if(m==="transport_sprogskole")L.currentView="transport_sprogskole",ge(r,_);else if(m==="du1_madlavning")L.currentView="du1_madlavning",pe(r,_);else if(m==="du1_rengoering")L.currentView="du1_rengoering",ue(r,_);else if(m==="traen_tidsudtryk")L.currentView="traen_tidsudtryk",ye(r,_);else if(m==="lav_sporgsmal")L.currentView="lav_sporgsmal",we(r,_);else if(m==="ordstilling")L.currentView="ordstilling",Ce(r,_);else if(m==="traen_grammatik")L.currentView="traen_grammatik",je(r,_);else if(m==="pronomen")L.currentView="pronomen",Te(r,_);else if(m==="verbum_learning"){L.currentView="verbum_learning";const n=new Le(_,s?.categoryId,s?.backView);r.appendChild(n.render())}else m==="verbum_menu"?(L.currentView="verbum_menu",ze(r,_)):m==="grounding"?(L.currentView="grounding",Ae(r,_)):m==="bestemthed"?(L.currentView="bestemthed",Ne(r,_)):m==="modal_force"?(L.currentView="modal_force",Be(r,_,s)):m==="adjective_bridge"?(L.currentView="adjective_bridge",He(r,_,s)):m==="adverb_bridge"?(L.currentView="adverb_bridge",_e(r,_,s)):m==="conjunction_bridge"?(L.currentView="conjunction_bridge",Fe(r,_,s)):m==="adjective_comparison"&&(L.currentView="adjective_comparison",Me(r,_))}function X(){const m=window.location.hash.replace(/^#\/?/,""),[s,t]=m.split("?"),r={};if(t){const n=new URLSearchParams(t);for(const[g,o]of n.entries())r[g]=o}s?_(s,r,!0):L.lang?_("main"):_("language")}document.addEventListener("DOMContentLoaded",()=>{window.addEventListener("hashchange",X),X()});
