(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const g of n)if(g.type==="childList")for(const s of g.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function e(n){const g={};return n.integrity&&(g.integrity=n.integrity),n.referrerPolicy&&(g.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?g.credentials="include":n.crossOrigin==="anonymous"?g.credentials="omit":g.credentials="same-origin",g}function a(n){if(n.ep)return;n.ep=!0;const g=e(n);fetch(n.href,g)}})();const F={da:{selectLanguage:"Vælg sprog",title:"Træning i dansk",subtitle:"Vælg en kategori for at starte din træning.",dagensOpgave:"Dagens opgave",dagensOpgaveDesc:"Nyt emne, ny grammatik. Løs opgaven!",modulTest:"Træning til modultest",modulTestDesc:"Forskellige opgaver samlet på ét sted.",notes:"Undervisningsnoter",notesDesc:"Læs og øv noter fra undervisningen.",lavSporgsmal:"Lav spørgsmål",lavSporgsmalDesc:"Lær at stille præcise spørgsmål ud fra billeder.",lavSporgsmalBtnText:"Lav spørgsmål - tryk her",samtaleTraening:"Samtaletræning",samtaleTraeningDesc:"Øv dine samtaler og få hjælp til dit dansk.",skriveHjaelp:"Skrivehjælp",skriveHjaelpDesc:"Indsæt din tekst og få feedback uden svar.",verbumLearning:"Lær danske verber",verbumLearningDesc:"Træn de 100 mest almindelige danske udsagnsord.",phase2_instruction:"Gæt verbet ud fra definitionen.",back:"Tilbage",enterPassword:"Indtast adgangskode for at se indholdet:",du1mod3:"DU1, modul 3 og 4",du2mod1:"DU2, modul 1",smaahistorier:"Små historier",du2mod5:"DU2, modul 5",emailLaan:"E-mail om lån",opdragelse:"Historie om opdragelse",enKlage:"En klage",du3mod4:"DU3, modul 4",laerEtNytOrd:"Lær et nyt ord",laerEtNytOrdDesc:"Udforsk hvordan ord hænger sammen i netværk.",wordNetworkExplanation:"Ord er forbundet med andre ord. Det hjælper dig til at huske ordet meget bedre, når du ved hvordan ordet er forbundet til andre ord.",targetWord:"Hund",hypernym:"Overbegreb",hypernymWord:"Dyr",synonym:"Synonym",synonymWord:"Vovse",antonym:"Antonym",antonymWord:"Kat",hyponym:"Underbegreb",hyponymWord:"Puddel",geminiBtnText:"Lær et ord - tryk her",geminiConsentText:"Ved at klikke på dette link er du indforstået med at du bruger et af Googles produkter og at Google træner kunstig intelligens med dine svar.",hverdagssamtale:"Hverdagssamtale",hverdagssamtaleDesc:"Øv dig i almindelige samtaler om hverdagen.",samtaleBolig:"Samtale om bolig",samtaleArbejde:"Samtale om arbejde",samtaleBtnText:"Start samtalen - tryk her",skriveHjaelpBtnText:"Skrivehjælp - tryk her",du1mod3Desc:"Vælg et emne at øve.",minHverdag:"Min hverdag",minBolig:"Min bolig",mitArbejde:"Mit arbejde",minHverdagDesc:"Opgaver om din dagligdag.",transportSprogskole:"Transport til sprogskolen",madlavning:"Madlavning",rengoering:"Rengøring",transportDesc:"Hvordan kommer du i skole?",padletDesc:"Del med klassen, hvordan du kommer til sprogskolen i dag.",padletBtnText:"Åbn padlet",madlavningDesc:"Hvad kan du lide at lave af mad?",madlavningPadletDesc:"Del dine madoplevelser med klassen her.",rengoeringDesc:"Hvordan gør du rent?",rengoeringPadletDesc:"Del dine tanker om rengøring med klassen.",traenTidsudtryk:"Træn tidsudtryk",traenTidsudtrykDesc:"Hvordan bruger man forskellige tidsudtryk på dansk?",traenTidsudtrykBtnText:"Åbn tidsudtryk øvelse",ordstilling:"Ordstilling",ordstillingDesc:"Ryk rundt på ordene og sæt dem i den rigtige rækkefølge.",checkResult:"Tjek svar",correctOrder:"Flot! Rækkefølgen er rigtig.",wrongOrder:"Ikke helt rigtigt. Prøv igen!",ordstillingLet:"Ordstilling (let)",ordstillingSvaer:"Ordstilling (mellemsvær)",levelA1:"A1 sætninger",levelA2:"A2 sætninger",traenGrammatik:"Træn grammatik",grammatikDesc:"Udfyld hullerne med de rigtige ord i teksten.",let:"Let (a1)",mellemsvaer:"Mellemsvær (a2)",svaer:"Svær (b1)",modultest:"Modultest",modultestLongDesc:"En længere tekst på 10 linjer. Find de rigtige ord i listen og udfyld hullerne.",grammatikIntro:"Vælg et niveau for at starte øvelsen.",checkAnswers:"Tjek alle svar",allCorrect:"Fantastisk! Alle svar er korrekte.",someWrong:"Nogle af dine svar er ikke helt rigtige. Prøv igen!",newExercise:"Næste tekst",hintMean:"Dette ord giver ikke mening i sammenhængen.",hintTense:"Tjek tiden. Er det nutid eller datid?",hintForm:"Tjek ordets bøjning (f.eks. en/et eller ental/flertal).",hintPerson:"Tjek hvem der gør noget (jeg, du, han/hun).",hintContext:"Læs hele teksten igen. Hvad passer bedst her?",hintName:"Her skal du bruge et ord om navne.",hintPlace:"Her skal du bruge et ord om steder.",hintAction:"Dette ord beskriver en anden handling.",hintAdj:"Tjek tillægsordet (beskrivelse af en ting).",hintAdverb:"Tjek biordet (tid, sted eller måde).",derErDetEr:"Der er / det er?",derErExpl:"Der er' åbner døren for noget nyt. 'Det er' peger på det, vi kender.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Husk: 'Der er' (introduktion) vs 'Det er' (identifikation).",hvilketOrd:"Hvilket ord skal jeg vælge?",hvilketOrdDesc:"Træn pronominer (stedord) og verber (udsagnsord) i forskellige sammenhænge.",hanHamHans:"Han / ham / hans?",gårGikGået:"Går / gik / er gået?",verberM3:"Lær danske verber (nutid)",hvilketVerbDesc:"Vælg en kategori for at træne verber.",pronominerSubjekt:"Subjekt (fokus)",pronominerObjekt:"Objekt (ikke-fokus)",pronominerPossessiv:"Possessiv (ejer)",verberBevaegelse:"Bevægelse (gå, køre, komme)",verberHandling:"Handling (gøre, lave, bruge)",verberHjaelpe:"Hjælpeverber (kan, skal, vil)",verberTilstand:"Tilstand & besiddelse (er, har)",verberInteraktion:"Social interaktion (sige, spørge)",verberIndreLiv:"Det indre liv (se, tænke, vide)",verberDatid:"Datid (uregelmæssige)",verberTider:"Datid vs. Førnutid (punktet & broen)",hintPronominer:"Tjek hvem der er i fokus eller hvem der ejer noget.",howToBuildSentence:"Hvordan bygger man en sætning?",howToBuildSentenceDesc:"Lær hvordan ord ankres til virkeligheden.",groundingIntro:"Uden grammatik svæver ord frit som balloner. Vi bruger grammatik til at ankre dem til virkeligheden (her og nu).",groundingStep1:"1. Konceptet (ballonen): 'Barn' er bare en idé. Vi ved ikke hvilket barn.",groundingStep2:"2. Handlingen: 'At spise' er bare en idé. Vi ved ikke hvornår.",groundingStep3:"3. Ankeret: Brug små ord (kendeord) og tid (bøjning) til at trække ballonerne ned.",sentenceGround:"Virkelighedens jord",wellDone:"Flot! Du har nu bygget en sætning, der er forankret i virkeligheden.",finitenessTitle:"Hvorfor bøjer vi kun det første ord?",finitenessDesc:"Det første ord (modalverbet) placerer sætningen i tid på tidslinjen. Det næste ord har kun fokus på selve handlingen.",timelineLabel:"Tidslinjen (Her forankres kraften)",actionLabel:"Handlingen (Selve aktiviteten)",nowLabel:"Nutid (Nu)",pastLabel:"Datid (Da)",finitenessExpl:"Læg mærke til: Kun det første ord bevæger sig på tidslinjen. Handlingen (spise) er den samme uanset tid.",adjectiveTitle:"Hvad slags barn?",adjectiveDesc:"Adjektiver er som en projektør, der lyser på et ord og giver det mere farve eller detalje.",adjectiveLabel:"Projektøren (Detalje)",adjectiveExpl:"Læg mærke til: Adjektivets form ændrer si g efter ordet foran (Et sødt / Mit søde).",nextStepAdjective:"Næste øvelse: Adjektiver ↓",adjectiveTeaser:"Hvordan kan vi beskrive barnet? Altså hvordan kan vi beskrive verden omkring os?",agreementTitle:"Hvad bestemmer bøjningen?",agreementDesc:"Substantivet (navneordet) bestemmer, hvilken endelse adjektivet skal have.",ubestemtLabel:"Ubestemt (Et / En)",bestemtLabel:"Bestemt (Det / Den)",agreementExpl:"Når vi taler om noget <strong>bestemt</strong>, tilføjer vi et <strong>-e</strong>. Omvendt bestemmer <em>Et barn</em>, at der skal et <strong>-t</strong> på (et sød<strong>t</strong> barn).",exampleBarn:"barn",exampleBil:"bil",practiceMoreTitle:"Vil du øve mere?",adjectiveComparisonLink:"Adjektiver - Sød/sødere/sødst",adverbTeaser:"Hvordan beskriver vi en HANDLING? Altså hvordan kan vi beskrive måden vi gør ting på?",nextStepAdverb:"Næste øvelse: Adverbier ↓",adverbTitle:"Hvordan beskriver vi en handling?",adverbDesc:"Adverbiet fortæller os noget om, hvordan handlingen (verbet) bliver gjort.",adverbExpl:"Læg mærke til, hvordan det valgte ord beskriver <em>måden</em> barnet spiser på. Det giver liv og detaljer til handlingen!",nextStepAfterAdverb:"Næste skridt: Konjunktioner ↓",adverbTeaserNext:"Hvordan kan vi forbinde to tanker? Lad os se på konjunktioner.",conjunctionTitle:"Hvorfor forbinder vi sætninger?",conjunctionDesc:"Konjunktioner er som lim, der binder to tanker sammen og skaber dynamik og flow.",conjunctionExpl:"Læg mærke til, hvordan det lille ord (konjunktionen) ændrer flowet mellem dine tanker.",conjunctionTeaser:"Hvad sker der når vi sætter to ting sammen? Kan vi forklare hvorfor, hvornår eller trods noget?",sentence2_fordi:"det er sultent",sentence2_naar:"solen skinner",sentence2_da:"det blev mørkt",sentence2_selvom:"det ikke må",sentence2_alligevel:"det er svært",sentence2_men:"det er snart færdigt",sentence2_derfor:"er tallerkenen tom",conjExpl_fordi:"Pilen bevæger sig fra venstre mod højre for at pege på <strong>årsagen</strong> (hvorfor spiser barnet?).",conjExpl_derfor:"Pilen bevæger sig fra højre mod venstre for at pege <strong>tilbage</strong> på årsagen i den første sætning.",conjExpl_da:"Uret bevæger sig mod venstre for at vise, at noget skete én gang i <strong>fortiden</strong>.",conjExpl_naar:"Uret bevæger sig mod højre for at vise en <strong>fremtidig</strong> handling eller noget der sker <strong>hver gang</strong> (vane).",conjExpl_selvom:"Forhindringen må dele sig, fordi 'indrømmelsen' (selvom) lader handlingen ske <strong>trods modstand</strong>.",conjExpl_alligevel:"Pilen bevæger sig ufortrødent <strong>gennem</strong> forhindringen for at vise, at handlingen sker på trods af alt.",conjExpl_men:"Buen over forhindringen viser et skift eller en <strong>modsætning</strong> mellem to forskellige tanker.",conjunctionPracticeLink:"Konjunktioner - men, fordi og når",conjunctionClosingReflection:"Nu har du set hvordan vi med grammatik kan konstruere og sætte ord på vores opfattelse af virkeligheden.",nextStepAfterConjunction:"Afslut øvelse",adjComparisonTitle:"Sød, sødere, sødest",adjComparisonDesc:"Hvordan sammenligner vi ting? Klik på træerne for at se hvordan adjektiver bøjes i grader.",positiveLabel:"Positiv",comparativeLabel:"Komparativ",superlativeLabel:"Superlativ",soedSoedereSoedest:"Sød / sødere / sødest"},en:{selectLanguage:"Select language",title:"Danish Training",subtitle:"Select a category to start your training.",dagensOpgave:"Daily Task",dagensOpgaveDesc:"New topic, new grammar. Solve the task!",modulTest:"Module Test Training",modulTestDesc:"Various tasks gathered in one place.",notes:"Teaching Notes",notesDesc:"Read and practice notes from class.",lavSporgsmal:"Make Questions",lavSporgsmalDesc:"Learn to ask precise questions based on pictures.",lavSporgsmalBtnText:"Make questions - click here",samtaleTraening:"Conversation Training",samtaleTraeningDesc:"Practice conversations and get help with your Danish.",skriveHjaelp:"Writing Help",skriveHjaelpDesc:"Insert your text and get feedback without answers.",back:"Back",enterPassword:"Enter password to view content:",du1mod3:"DU1, Module 3 and 4",du2mod1:"DU2, Module 1",smaahistorier:"Short stories",du2mod5:"DU2, Module 5",emailLaan:"E-mail about loan",opdragelse:"Story about upbringing",enKlage:"A complaint",du3mod4:"DU3, Module 4",laerEtNytOrd:"Learn a new word",laerEtNytOrdDesc:"Explore how words are connected in networks.",wordNetworkExplanation:"Words are connected to other words. It helps you remember the word much better when you know how the word is connected to other words.",targetWord:"Dog",hypernym:"Hypernym",hypernymWord:"Animal",synonym:"Synonym",synonymWord:"Doggie",antonym:"Antonym",antonymWord:"Cat",hyponym:"Hyponym",hyponymWord:"Poodle",geminiBtnText:"Learn a word - click here",geminiConsentText:"By clicking this link, you agree that you are using a Google product and that Google trains artificial intelligence with your responses.",hverdagssamtale:"Everyday Conversation",hverdagssamtaleDesc:"Practice common everyday conversations.",samtaleBolig:"Conversation about housing",samtaleArbejde:"Conversation about work",samtaleBtnText:"Start conversation - click here",skriveHjaelpBtnText:"Writing help - click here",du1mod3Desc:"Choose a topic to practice.",minHverdag:"My everyday life",minBolig:"My housing",mitArbejde:"My work",minHverdagDesc:"Tasks about your daily life.",transportSprogskole:"Transport to language school",madlavning:"Cooking",rengoering:"Cleaning",transportDesc:"How do you get to school?",padletDesc:"Share with the class how you get to language school today.",padletBtnText:"Open Padlet",madlavningDesc:"What kind of food do you like to cook?",madlavningPadletDesc:"Share your cooking experiences with the class here.",rengoeringDesc:"How do you clean?",rengoeringPadletDesc:"Share your thoughts on cleaning with the class.",traenTidsudtryk:"Practice time expressions",traenTidsudtrykDesc:"How do you use different time expressions in Danish?",traenTidsudtrykBtnText:"Open time expressions exercise",ordstilling:"Word Order",ordstillingDesc:"Rearrange the words and put them in the correct order.",checkResult:"Check answer",correctOrder:"Great! The order is correct.",wrongOrder:"Not quite right. Try again!",ordstillingLet:"Word Order (Easy)",ordstillingSvaer:"Word Order (Medium)",levelA1:"A1 sentences",levelA2:"A2 sentences",traenGrammatik:"Practice Grammar",grammatikDesc:"Fill in the blanks with the correct words in the text.",let:"Easy (A1)",mellemsvaer:"Medium (A2)",svaer:"Hard (B1)",modultest:"Module Test",modultestLongDesc:"A longer 10-line text. Find the correct words in the list and fill in the blanks.",grammatikIntro:"Select a level to start the exercise.",checkAnswers:"Check all answers",allCorrect:"Fantastic! All answers are correct.",someWrong:"Some of your answers are not quite right. Try again!",newExercise:"Next text",hintMean:"This word doesn't make sense in this context.",hintTense:"Check the tense. Is it present or past?",hintForm:"Check the word form (e.g., gender or singular/plural).",hintPerson:"Check who is performing the action (I, you, he/she).",hintContext:"Read the whole text again. What fits best here?",hintName:"You need a word for names here.",hintPlace:"You need a word for places here.",hintAction:"This word describes a different action.",hintAdj:"Check the adjective (description of a thing).",hintAdverb:"Check the adverb (time, place, or manner).",derErDetEr:"Der er / Det er?",derErExpl:"'Der er' opens the door for new info. 'Det er' points to what we know.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Remember: 'Der er' (intro) vs 'Det er' (identification).",hvilketOrd:"Which word should I choose?",hvilketOrdDesc:"Practice pronouns and verbs in different contexts.",hanHamHans:"He / Him / His?",gårGikGået:"Go / went / has gone?",verberM3:"Learn Danish Verbs (Present)",hvilketVerbDesc:"Choose a category to practice verbs.",pronominerSubjekt:"Subject (Focus)",pronominerObjekt:"Object (Non-focus)",pronominerPossessiv:"Possessive (Owner)",verberBevaegelse:"Movement (go, drive, come)",verberHandling:"Action (do, make, use)",verberHjaelpe:"Helping Verbs (can, must, will)",verberTilstand:"State & Possession (be, have)",verberInteraktion:"Social Interaction (say, ask)",verberIndreLiv:"Inner Life (see, think, know)",verberDatid:"Past Tense (irregular)",verberTider:"Past vs. Present Perfect (The Point & The Bridge)",hintPronominer:"Check who is in focus or who owns something.",howToBuildSentence:"How to build a sentence?",howToBuildSentenceDesc:"Learn how words are anchored to reality.",groundingIntro:"Without grammar, words float freely like balloons. We use grammar to anchor them to reality (HERE AND NOW).",groundingStep1:"1. The Concept (Balloon): 'Child' is just an idea. We don't know which child.",groundingStep2:"2. The Action: 'To eat' is just an idea. We don't know when.",groundingStep3:"3. The Anchor: Use small words (determiners) and tense (inflection) to pull the balloons down.",sentenceGround:"The ground of reality",wellDone:"Well done! You have now built a sentence anchored in reality.",conjExpl_fordi:"The arrow moves from left to right to point at the <strong>cause</strong> (why is the child eating?).",conjExpl_derfor:"The arrow moves from right to left to point <strong>back</strong> to the cause in the first sentence.",conjExpl_da:"The clock moves left to show that something happened once in the <strong>past</strong>.",conjExpl_naar:"The clock moves right to show a <strong>future</strong> action or something that happens <strong>every time</strong> (habit).",conjExpl_selvom:"The obstacle must split because the 'concession' (selvom) lets the action happen <strong>despite resistance</strong>.",conjExpl_alligevel:"The arrow moves undeterred <strong>through</strong> the obstacle to show that the action happens despite everything.",conjExpl_men:"The arc over the obstacle shows a shift or a <strong>contrast</strong> between two different thoughts.",conjunctionPracticeLink:"Conjunctions - but, because, and when",conjunctionClosingReflection:"Now you have seen how we use grammar to construct and articulate our perception of reality.",adjComparisonTitle:"Sweet, sweeter, sweetest",adjComparisonDesc:"How do we compare things? Click on the trees to see how adjectives are inflected in degrees.",positiveLabel:"Positive",comparativeLabel:"Comparative",superlativeLabel:"Superlative",soedSoedereSoedest:"Sweet / sweeter / sweetest"},ar:{selectLanguage:"اختر لغة",title:"التدريب على الدنماركية",subtitle:"اختر فئة لبدء التدريب الخاص بك.",dagensOpgave:"المهمة اليومية",dagensOpgaveDesc:"موضوع جديد، قواعد جديدة. حل المهمة!",modulTest:"تدريب اختبار الوحدة",modulTestDesc:"مهام مختلفة مجمعة في مكان واحد.",notes:"ملاحظات التدريس",notesDesc:"اقرأ وتدرب على الملاحظات من الفصل.",lavSporgsmal:"طرح أسئلة",lavSporgsmalDesc:"تعلم طرح أسئلة دقيقة بناءً على الصور.",lavSporgsmalBtnText:"طرح الأسئلة - اضغط هنا",samtaleTraening:"تدريب المحادثة",samtaleTraeningDesc:"تمرن على المحادثات واحصل على مساعدة في الدنماركية.",skriveHjaelp:"مساعدة في الكتابة",skriveHjaelpDesc:"أدخل نصك واحصل على ملاحظات بدون إجابات.",back:"رجوع",du1mod3:"DU1، الوحدة 3 و 4",du2mod1:"DU2، الوحدة 1",du3mod4:"DU3، الوحدة 4",laerEtNytOrd:"تعلم كلمة جديدة",laerEtNytOrdDesc:"استكشف كيف ترتبط الكلمات في شبكات.",wordNetworkExplanation:"الكلمات مرتبطة بكلمات أخرى. يساعدك ذلك على تذكر الكلمة بشكل أفضل عندما تعرف كيف ترتبط الكلمة بكلمات أخرى.",targetWord:"كلب",hypernym:"مفهوم شامل (Hypernym)",hypernymWord:"حيوان",synonym:"مرادف",synonymWord:"كلب صغير",antonym:"مضاد",antonymWord:"قطة",hyponym:"مفهوم فرعي (Hyponym)",hyponymWord:"بودل",geminiBtnText:"تعلم كلمة - اضغط هنا",geminiConsentText:"بالنقر على هذا الرابط، فإنك توافق على استخدامك لمنتج من Google وأن Google تقوم بتدريب الذكاء الاصطناعي باستخدام إجاباتك.",hverdagssamtale:"محادثة يومية",hverdagssamtaleDesc:"تدرب على المحادثات اليومية الشائعة.",samtaleBolig:"محادثة حول السكن",samtaleArbejde:"محادثة حول العمل",samtaleBtnText:"ابدأ المحادثة - اضغط هنا",skriveHjaelpBtnText:"مساعدة في الكتابة - اضغط هنا",du1mod3Desc:"اختر موضوعًا للتدرب عليه.",minHverdag:"حياتي اليومية",minBolig:"سكني",mitArbejde:"عملي",minHverdagDesc:"مهام حول حياتك اليومية.",transportSprogskole:"النقل إلى مدرسة اللغة",madlavning:"طبخ",rengoering:"تنظيف",transportDesc:"كيف تذهب إلى المدرسة؟",padletDesc:"شارك مع الفصل كيف تذهب إلى مدرسة اللغة اليوم.",padletBtnText:"افتح بادليت",madlavningDesc:"ما نوع الطعام الذي تحب طهيه؟",madlavningPadletDesc:"شارك تجارب الطبخ الخاصة بك مع الفصل هنا.",rengoeringDesc:"كيف تنظف؟",rengoeringPadletDesc:"شارك أفكارك حول التنظيف مع الفصل.",traenTidsudtryk:"تدريب تعبيرات الوقت",traenTidsudtrykDesc:"كيف تستخدم تعبيرات الوقت المختلفة باللغة الدنماركية؟",traenTidsudtrykBtnText:"افتح تمرين تعبيرات الوقت",ordstilling:"ترتيب الكلمات",ordstillingDesc:"قم بإعادة ترتيب الكلمات ووضعها في الترتيب الصحيح.",checkResult:"تحقق من الإجابة",correctOrder:"رائع! الترتيب صحيح.",wrongOrder:"ليس تماماً. حاول مرة أخرى!",ordstillingLet:"ترتيب الكلمات (سهل)",ordstillingSvaer:"ترتيب الكلمات (صعب)",levelA1:"جمل A1",levelA2:"جمل A2",traenGrammatik:"تدريب القواعد",grammatikDesc:"املاً الفراغات بالكلمات الصحيحة في النص.",let:"سهل (A1)",mellemsvaer:"متوسط (A2)",svaer:"صعب (B1)",grammatikIntro:"اختر مستوى لبدء التمرين.",checkAnswers:"تحقق من جميع الإجابات",allCorrect:"رائع! جميع الإجابات صحيحة.",someWrong:"بعض إجاباتك ليست صحيحة تمامًا. حاول مرة أخرى!",newExercise:"النص التالي",hintMean:"هذه الكلمة لا معنى لها في هذا السياق.",hintTense:"تحقق من الزمن. هل هو مضارع أم ماضٍ؟",hintForm:"تحقق من صيغة الكلمة (مثل الجنس أو المفرد/الجمع).",hintPerson:"تحقق من يقوم بالفعل (أنا، أنت، هو/هي).",hintContext:"اقرأ النص بالكامل مرة أخرى. ما هو الأنسب هنا؟",hintName:"أنت بحاجة إلى كلمة للأسماء هنا.",hintPlace:"أنت بحاجة إلى كلمة للأماكن هنا.",hintAction:"هذه الكلمة تصف فعلاً مختلفاً.",hintAdj:"تحقق من الصفة (وصف لشيء ما).",hintAdverb:"تحقق من الظرف (الزمان أو المكان أو الطريقة).",hintConj:"تحقق من حرف العطف (يربط بين جملتين).",filled:"تمت تعبئته"},ur:{selectLanguage:"زبان منتخب کریں",title:"دانش کی تربیت",subtitle:"تربیت شروع کرنے کے لیے ایک زمرہ منتخب کریں۔",dagensOpgave:"آج کا کام",dagensOpgaveDesc:"نیا موضوع، نئی گرامر۔ کام حل کریں!",modulTest:"ماڈیول ٹیسٹ کی تربیت",modulTestDesc:"مختلف کام ایک ہی جگہ پر جمع ہیں۔",notes:"تدریسی نوٹس",notesDesc:"کلاس کے نوٹس پڑھیں اور ان کی مشق کریں۔",lavSporgsmal:"سوالات بنائیں",lavSporgsmalDesc:"تصاویر کی بنیاد پر درست سوالات پوچھنا سیکھیں۔",lavSporgsmalBtnText:"سوالات بنائیں - یہاں کلک کریں",samtaleTraening:"گفتگو کی تربیت",samtaleTraeningDesc:"اپنی گفتگو کی مشق کریں اور اپنی دانش میں مدد حاصل کریں۔",skriveHjaelp:"لکھنے میں مدد",skriveHjaelpDesc:"اپنا متن درج کریں اور جوابات کے بغیر فیڈ بیک حاصل کریں۔",back:"واپس",du1mod3:"DU1، ماڈیول 3 اور 4",du2mod1:"DU2، ماڈیول 1",du3mod4:"DU3، ماڈیول 4",laerEtNytOrd:"ایک نیا لفظ سیکھیں",laerEtNytOrdDesc:"دریافت کریں کہ الفاظ نیٹ ورکس میں کیسے جڑے ہوئے ہیں۔",wordNetworkExplanation:"الفاظ دوسرے الفاظ سے جڑے ہوتے ہیں۔ جب آپ کو معلوم ہو کہ لفظ دوسرے الفاظ سے کیسے جڑا ہوا ہے تو یہ آپ کو لفظ کو بہت بہتر طریقے سے یاد رکھنے میں مدد دیتا ہے۔",targetWord:"کتا",hypernym:"اعلیٰ تصور",hypernymWord:"جانور",synonym:"مترادف",synonymWord:"کتا (vovse)",antonym:"متضاد",antonymWord:"بلی",hyponym:"ذیلی تصور",hyponymWord:"پوڈل",geminiBtnText:"لفظ سیکھیں - یہاں کلک کریں",geminiConsentText:"اس لنک پر کلک کر کے، آپ گوگل کی مصنوعات استعمال کرنے اور اپنے جوابات کے ذریعے مصنوعی ذہانت کو تربیت دینے پر رضامند ہو رہے ہیں۔",hverdagssamtale:"روزمرہ گفتگو",hverdagssamtaleDesc:"روزمرہ کی عام گفتگو کی مشق کریں۔",samtaleBolig:"رہائش کے بارے میں گفتگو",samtaleArbejde:"کام کے بارے میں گفتگو",samtaleBtnText:"گفتگو شروع کریں - یہاں کلک کریں",skriveHjaelpBtnText:"لکھنے میں مدد - یہاں کلک کریں",du1mod3Desc:"مشق کرنے کے لیے ایک موضوع منتخب کریں۔",minHverdag:"میری روزمرہ زندگی",minBolig:"میری رہائش",mitArbejde:"میرا کام",minHverdagDesc:"آپ کی روزمرہ زندگی کے بارے میں کام۔",transportSprogskole:"اسکول تک آمد و رفت",madlavning:"کھانا پکانا",rengoering:"صفائی",transportDesc:"آپ اسکول کیسے جاتے ہیں؟",padletDesc:"کلاس کے ساتھ شیئر کریں کہ آپ آج اسکول کیسے پہنچے۔",padletBtnText:"Padlet کھولیں",madlavningDesc:"آپ کو کھانا پکانے میں کیا پسند ہے؟",madlavningPadletDesc:"اپنی کھانے کی یادیں کلاس کے ساتھ شیئر کریں۔",rengoeringDesc:"آپ صفائی کیسے کرتے ہیں؟",rengoeringPadletDesc:"صفائی کے بارے میں اپنے خیالات کلاس کے ساتھ شیئر کریں۔",traenTidsudtryk:"وقت کے اظہار کی مشق",traenTidsudtrykDesc:"دانش میں وقت کے مختلف اظہار کیسے استعمال ہوتے ہیں؟",traenTidsudtrykBtnText:"وقت کے اظہار کی مشق کھولیں",ordstilling:"الفاظ کی ترتیب",ordstillingDesc:"الفاظ کو دوبارہ ترتیب دیں اور انہیں صحیح ترتیب میں رکھیں.",checkResult:"جواب چیک کریں",correctOrder:"بہت خوب! ترتیب درست ہے.",wrongOrder:"بالکل درست نہیں. دوبارہ کوشش کریں!",ordstillingLet:"الفاظ کی ترتیب (آسان)",ordstillingSvaer:"الفاظ کی ترتیب (مشکل)",levelA1:"A1 جملے",levelA2:"A2 جملے",traenGrammatik:"گرائمر کی مشق",grammatikDesc:"متن میں خالی جگہوں کو صحیح الفاظ سے پر کریں۔",let:"آسان (A1)",mellemsvaer:"درمیانہ (A2)",svaer:"مشکل (B1)",grammatikIntro:"مشق شروع کرنے کے لیے لیول منتخب کریں۔",checkAnswers:"تمام جوابات چیک کریں",allCorrect:"شاندار! تمام جوابات درست ہیں۔",someWrong:"آپ کے کچھ جوابات بالکل درست نہیں ہیں۔ دوبارہ کوشش کریں!",newExercise:"اگلا متن",hintMean:"اس تناظر میں یہ لفظ معنی نہیں رکھتا.",hintTense:"زمانہ چیک کریں. کیا یہ حال ہے یا ماضی؟",hintForm:"لفظ کی شکل چیک کریں (مثلاً جنس یا واحد/جمع).",hintPerson:"چیک کریں کہ عمل کون کر رہا ہے (میں، آپ، وہ).",hintContext:"پورا متن دوبارہ پڑھیں. یہاں سب سے بہتر کیا ہے؟",hintName:"آپ کو یہاں ناموں کے لیے ایک لفظ کی ضرورت ہے.",hintPlace:"آپ کو یہاں مقامات کے لیے ایک لفظ کی ضرورت ہے.",hintAction:"یہ لفظ ایک مختلف عمل بیان کرتا ہے.",hintAdj:"صفت چیک کریں (کسی چیز کی وضاحت).",hintAdverb:"متعلق فعل چیک کریں (وقت، جگہ یا طریقہ).",hintConj:"حرف عطف چیک کریں (دو جملوں کو جوڑتا ہے).",filled:"بھرا ہوا"},zh:{selectLanguage:"选择语言",title:"丹麦语训练",subtitle:"选择一个类别开始你的训练。",dagensOpgave:"今日任务",dagensOpgaveDesc:"新主题，新语法。完成任务！",modulTest:"模块测试训练",modulTestDesc:"各种任务集中在一起。",notes:"教学笔记",notesDesc:"阅读并练习课堂笔记。",lavSporgsmal:"提问练习",lavSporgsmalDesc:"学习根据图片提出精确的问题。",lavSporgsmalBtnText:"开始提问 - 点击这里",samtaleTraening:"对话训练",samtaleTraeningDesc:"练习对话并获得丹麦语帮助。",skriveHjaelp:"写作助手",skriveHjaelpDesc:"输入你的文本，获得无答案的反馈。",back:"返回",du1mod3:"DU1, 模块 3 和 4",du2mod1:"DU2, 模块 1",du3mod4:"DU3, 模块 4",laerEtNytOrd:"学习一个新单词",laerEtNytOrdDesc:"探索单词在网络中的联系。",wordNetworkExplanation:"单词与其他单词相连。了解单词如何与其他单词联系可以帮助你更好地记住它。",targetWord:"狗",hypernym:"上位词",hypernymWord:"动物",synonym:"同义词",synonymWord:"狗狗",antonym:"反义词",antonymWord:"猫",hyponym:"下位词",hyponymWord:"贵宾犬",geminiBtnText:"学习单词 - 点击这里",geminiConsentText:"点击此链接即表示你同意使用 Google 产品，且 Google 会利用你的回答训练人工智能。",hverdagssamtale:"日常对话",hverdagssamtaleDesc:"练习常见的日常对话。",samtaleBolig:"关于住房的对话",samtaleArbejde:"关于工作的对话",samtaleBtnText:"开始对话 - 点击这里",skriveHjaelpBtnText:"写作助手 - 点击这里",du1mod3Desc:"选择一个主题进行练习。",minHverdag:"我的日常生活",minBolig:"我的住房",mitArbejde:"我的工作",minHverdagDesc:"关于你日常生活的任务。",transportSprogskole:"去语言学校的交通",madlavning:"烹饪",rengoering:"清洁",transportDesc:"你怎么去学校？",padletDesc:"与全班分享你今天如何去学校。",padletBtnText:"打开 Padlet",madlavningDesc:"你喜欢做什样的食物？",madlavningPadletDesc:"在这里与全班分享你的烹饪经验。",rengoeringDesc:"你如何进行清洁？",rengoeringPadletDesc:"与全班分享你对清洁的看法。",traenTidsudtryk:"练习时间表达",traenTidsudtrykDesc:"如何在丹麦语中使用不同的时间表达？",traenTidsudtrykBtnText:"打开时间表达练习",ordstilling:"词序练习",ordstillingDesc:"重新排列单词，并将它们按正确的顺序排列。",checkResult:"检查答案",correctOrder:"太棒了！顺序正确。",wrongOrder:"不完全正确。再试一次！",ordstillingLet:"词序 (简单)",ordstillingSvaer:"词序 (困难)",levelA1:"A1 句子",levelA2:"A2 句子",traenGrammatik:"练习语法",grammatikDesc:"在文本的空格处填入正确的单词。",let:"简单 (A1)",mellemsvaer:"中等 (A2)",svaer:"困难 (B1)",grammatikIntro:"选择等级开始练习。",checkAnswers:"检查所有答案",allCorrect:"太棒了！所有答案都正确。",someWrong:"你的某些答案不完全正确。再试一次！",newExercise:"下一篇",hintMean:"这个词在这种语境下没有意义。",hintTense:"检查时态。是现在时还是过去时？",hintForm:"检查单词形式（例如：性别或单复数）。",hintPerson:"检查谁在执行动作（我、你、他/她）。",hintContext:"重新阅读全文。这里最适合什么？",hintName:"你需要一个关于名字的词。",hintPlace:"你需要一个关于地点的词。",hintAction:"这个词描述的是另一种动作。",hintAdj:"检查形容词（描述事物的词）。",hintAdverb:"检查副词（时间、地点或方式）。",hintConj:"检查连词（连接两个句子）。",filled:"已填写"},ru:{selectLanguage:"Выберите язык",title:"Изучение датского",subtitle:"Выберите категорию, чтобы начать обучение.",dagensOpgave:"Задание дня",dagensOpgaveDesc:"Новая тема, новая грамматика. Решите задачу!",modulTest:"Подготовка к тесту",modulTestDesc:"Различные задания, собранные в одном месте.",notes:"Конспекты занятий",notesDesc:"Читайте и практикуйте заметки с уроков.",lavSporgsmal:"Составление вопросов",lavSporgsmalDesc:"Научитесь задавать точные вопросы по картинкам.",lavSporgsmalBtnText:"Начать - нажмите здесь",samtaleTraening:"Разговорная практика",samtaleTraeningDesc:"Практикуйте общение и получайте помощь с датским.",skriveHjaelp:"Помощь в письме",skriveHjaelpDesc:"Введите текст и получите отзыв без готовых ответов.",back:"Назад",du1mod3:"DU1, модуль 3 и 4",laerEtNytOrd:"Выучить новое слово",laerEtNytOrdDesc:"Узнайте, как слова связаны в сети.",wordNetworkExplanation:"Слова связаны с другими словами. Это помогает лучше запоминать их.",targetWord:"Собака",hypernym:"Гипероним",hypernymWord:"Животное",synonym:"Синоним",synonymWord:"Пес",antonym:"Антоним",antonymWord:"Кошка",hyponym:"Гипоним",hyponymWord:"Пудель",geminiBtnText:"Выучить слово - нажмите здесь",geminiConsentText:"Нажимая на ссылку, вы соглашаетесь на использование продуктов Google и на то, что Google обучает ИИ на ваших ответах.",hverdagssamtale:"Повседневный разговор",hverdagssamtaleDesc:"Практикуйте обычные разговоры о жизни.",samtaleBolig:"Разговор о жилье",samtaleArbejde:"Разговор о работе",samtaleBtnText:"Начать разговор - нажмите здесь",skriveHjaelpBtnText:"Помощь в письме - нажмите здесь",du1mod3Desc:"Выберите тему для практики.",minHverdag:"Мои будни",minBolig:"Мое жилье",mitArbejde:"Моя работа",minHverdagDesc:"Задания о вашей повседневной жизни.",transportSprogskole:"Транспорт до школы",madlavning:"Готовка",rengoering:"Уборка",transportDesc:"Как вы добираетесь до школы?",padletDesc:"Поделитесь с классом, как вы добрались до школы сегодня.",padletBtnText:"Открыть Padlet",madlavningDesc:"Какую еду вы любите готовить?",madlavningPadletDesc:"Поделитесь своим кулинарным опытом с классом.",rengoeringDesc:"Как вы делаете уборку?",rengoeringPadletDesc:"Поделитесь своими мыслями об уборке с классом.",traenTidsudtryk:"Практика временных выражений",traenTidsudtrykDesc:"Как использовать различные временные выражения в датском?",traenTidsudtrykBtnText:"Открыть упражнение",ordstilling:"Порядок слов",ordstillingDesc:"Переставьте слова и расположите их в правильном порядке.",checkResult:"Проверить ответ",correctOrder:"Отлично! Порядок правильный.",wrongOrder:"Не совсем верно. Попробуйте еще раз!",ordstillingLet:"Порядок слов (Легко)",ordstillingSvaer:"Порядок слов (Сложно)",levelA1:"Предложения A1",levelA2:"Предложения A2",traenGrammatik:"Практика грамматики",grammatikDesc:"Заполните пропуски в тексте правильными словами.",let:"Легко (A1)",mellemsvaer:"Средне (A2)",svaer:"Сложно (B1)",grammatikIntro:"Выберите уровень, чтобы начать упражнение.",checkAnswers:"Проверить все ответы",allCorrect:"Фантастика! Все ответы верны.",someWrong:"Некоторые ваши ответы не совсем верны. Попробуйте еще раз!",newExercise:"Следующий текст",hintMean:"Это слово не имеет смысла в данном контексте.",hintTense:"Проверьте время. Это настоящее или прошедшее?",hintForm:"Проверьте форму слова (например, род или число).",hintPerson:"Проверьте, кто совершает действие (я, ты, он/она).",hintContext:"Прочитайте весь текст еще раз. Что здесь лучше всего подходит?",hintName:"Здесь нужно слово для имен.",hintPlace:"Здесь нужно слово для мест.",hintAction:"Это слово описывает другое действие.",hintAdj:"Проверьте прилагательное (описание предмета).",hintAdverb:"Проверьте наречие (время, место или образ действия).",hintConj:"Проверьте союз (соединяет два предложения).",filled:"заполнено"},ne:{selectLanguage:"भाषा छान्नुहोस्",title:"डेनिस प्रशिक्षण",subtitle:"प्रशिक्षण सुरु गर्न एक श्रेणी छान्नुहोस्।",dagensOpgave:"आजको कार्य",dagensOpgaveDesc:"नयाँ विषय, नयाँ व्याकरण। कार्य समाधान गर्नुहोस्!",modulTest:"मोड्युल परीक्षण प्रशिक्षण",modulTestDesc:"विभिन्न कार्यहरू एकै ठाउँमा संकलन गरिएको।",notes:"शिक्षण नोटहरू",notesDesc:"कक्षाबाट नोटहरू पढ्नुहोस् र अभ्यास गर्नुहोस्।",lavSporgsmal:"प्रश्नहरू बनाउनुहोस्",lavSporgsmalDesc:"चित्रहरूको आधारमा सटीक प्रश्नहरू सोध्न सिक्नुहोस्।",lavSporgsmalBtnText:"प्रश्नहरू बनाउनुहोस् - यहाँ क्लिक गर्नुहोस्",samtaleTraening:"कुराकानी प्रशिक्षण",samtaleTraeningDesc:"आफ्नो कुराकानी अभ्यास गर्नुहोस् र डेनिस भाषामा मद्दत लिनुहोस्।",skriveHjaelp:"लेखन मद्दत",skriveHjaelpDesc:"आफ्नो पाठ प्रविष्ट गर्नुहोस् र जवाफ बिना प्रतिक्रिया प्राप्त गर्नुहोस्।",back:"फिर्ता",du1mod3:"DU1, मोड्युल ३ र ४",laerEtNytOrd:"नयाँ शब्द सिक्नुहोस्",laerEtNytOrdDesc:"शब्दहरू नेटवर्कमा कसरी जोडिएका छन् पत्ता लगाउनुहोस्।",wordNetworkExplanation:"शब्दहरू अन्य शब्दहरूसँग जोडिएका हुन्छन्। शब्द कसरी जोडिएको छ थाहा पाउँदा सम्झन सजिलो हुन्छ।",targetWord:"कुकुर",hypernym:"माथिल्लो शब्द",hypernymWord:"जनावर",synonym:"पर्यायवाची",synonymWord:"कुकुर (vovse)",antonym:"विपरीतार्थी",antonymWord:"बिरालो",hyponym:"तल्लो शब्द",hyponymWord:"पुडल",geminiBtnText:"शब्द सिक्नुहोस् - यहाँ थिच्नुहोस्",geminiConsentText:"यो लिङ्कमा क्लिक गरेर, तपाईं गुगल उत्पादन प्रयोग गर्न र गुगलले तपाईंको जवाफबाट एआईलाई तालिम दिन सहमत हुनुहुन्छ।",hverdagssamtale:"दैनिक कुराकानी",hverdagssamtaleDesc:"सामान्य दैनिक कुराकानी अभ्यास गर्नुहोस्।",samtaleBolig:"आवासको बारेमा कुराकानी",samtaleArbejde:"कामको बारेमा कुराकानी",samtaleBtnText:"कुराकानी सुरु गर्नुहोस् - यहाँ क्लिक गर्नुहोस्",skriveHjaelpBtnText:"लेखन मद्दत - यहाँ क्लिक गर्नुहोस्",du1mod3Desc:"अभ्यास गर्न विषय छान्नुहोस्।",minHverdag:"मेरो दैनिक जीवन",minBolig:"मेरो आवास",mitArbejde:"मेरो काम",minHverdagDesc:"तपाईंको दैनिक जीवनको बारेमा कार्यहरू।",transportSprogskole:"स्कूल सम्मको यातायात",madlavning:"खाना पकाउने",rengoering:"सरसफाई",transportDesc:"तपाईं स्कूल कसरी जानुहुन्छ?",padletDesc:"तपाईं आज स्कूल कसरी पुग्नुभयो कक्षामा साझा गर्नुहोस्।",padletBtnText:"Padlet खोल्नुहोस्",madlavningDesc:"तपाईंलाई कस्तो खाना पकाउन मन पर्छ?",madlavningPadletDesc:"तपाईंको खाना पकाउने अनुभव कक्षामा साझा गर्नुहोस्।",rengoeringDesc:"तपाई सरसफाई कसरी गर्नुहुन्छ?",rengoeringPadletDesc:"सरसफाईको बारेमा आफ्नो विचार साझा गर्नुहोस्।",traenTidsudtryk:"समय अभिव्यक्ति अभ्यास",traenTidsudtrykDesc:"डेनिसमा विभिन्न समय अभिव्यक्तिहरू कसरी प्रयोग गर्ने?",traenTidsudtrykBtnText:"समय अभिव्यक्ति अभ्यास खोल्नुहोस्",ordstilling:"शब्द क्रम",ordstillingDesc:"शब्दहरूलाई पुन: व्यवस्थित गर्नुहोस् र तिनीहरूलाई सही क्रममा राख्नुहोस्।",checkResult:"उत्तर जाँच गर्नुहोस्",correctOrder:"उत्कृष्ट! क्रम सही छ।",wrongOrder:"पुरै सही छैन। फेरि प्रयास गर्नुहोस्!",ordstillingLet:"शब्द क्रम (सजिलो)",ordstillingSvaer:"शब्द क्रम (कठिन)",levelA1:"A1 वाक्यहरू",levelA2:"A2 वाक्यहरू",traenGrammatik:"व्याकरण अभ्यास",grammatikDesc:"पाठका खाली ठाउँहरूमा सही शब्दहरू भर्नुहोस्।",let:"सजिलो (A1)",mellemsvaer:"मध्यम (A2)",svaer:"कठिन (B1)",grammatikIntro:"अभ्यास सुरु गर्न एक स्तर छान्नुहोस्।",checkAnswers:"सबै उत्तरहरू जाँच गर्नुहोस्",allCorrect:"शानदार! सबै उत्तरहरू सही छन्।",someWrong:"तपाईका केही उत्तरहरू पूर्ण रूपमा सही छैनन्। फेरि प्रयास गर्नुहोस्!",newExercise:"अर्को पाठ",hintMean:"यो शब्द यस सन्दर्भमा अर्थहीन छ।",hintTense:"काल जाँच गर्नुहोस्। यो वर्तमान हो कि भूत?",hintForm:"शब्दको रूप जाँच गर्नुहोस् (जस्तै लिङ्ग वा एकवचन/बहुवचन)।",hintPerson:"कार्य कसले गरिरहेको छ जाँच गर्नुहोस् (म, तिमी, उ/उनी)।",hintContext:"फेरि पूरा पाठ पढ्नुहोस्। यहाँ सबैभन्दा उपयुक्त के हुन्छ?",hintName:"तपाईंलाई यहाँ नामका लागि शब्द चाहिन्छ।",hintPlace:"तपाईंलाई यहाँ ठाउँका लागि शब्द चाहिन्छ।",hintAction:"यो शब्दले अर्कै कार्यलाई वर्णन गर्दछ।",hintAdj:"विशेषण जाँच गर्नुहोस् (चीजको विवरण)।",hintAdverb:"क्रियाविशेषण जाँच गर्नुहोस् (समय, स्थान वा तरिका)।",hintConj:"संयोजक जाँच गर्नुहोस् (दुईवटा वाक्यहरू जोड्छ)।",filled:"भरिएको"},th:{selectLanguage:"เลือกภาษา",title:"ฝึกภาษาเดนมาร์ก",subtitle:"เลือกหมวดหมู่เพื่อเริ่มการฝึกฝนของคุณ",dagensOpgave:"ภารกิจวันนี้",dagensOpgaveDesc:"หัวข้อใหม่ ไวยากรณ์ใหม่ แก้ปัญหาเลย!",modulTest:"ฝึกทำข้อสอบโมดูล",modulTestDesc:"รวบรวมงานต่างๆ ไว้ในที่เดียว",notes:"โน้ตการเรียน",notesDesc:"อ่านและฝึกฝนโน้ตจากทางห้องเรียน",lavSporgsmal:"สร้างคำถาม",lavSporgsmalDesc:"เรียนรู้การตั้งคำถามที่แม่นยำจากรูปภาพ",lavSporgsmalBtnText:"สร้างคำถาม - คลิกที่นี่",samtaleTraening:"ฝึกสนทนา",samtaleTraeningDesc:"ฝึกฝนการสนทนาและรับความช่วยเหลือเกี่ยวกับภาษาเดนมาร์ก",skriveHjaelp:"ตัวช่วยเขียน",skriveHjaelpDesc:"ใส่ข้อความของคุณและรับข้อเสนอแนะโดยไม่มีคำตอบ",back:"กลับ",du1mod3:"DU1, โมดูล 3 และ 4",laerEtNytOrd:"เรียนรู้คำศัพท์ใหม่",laerEtNytOrdDesc:"สำรวจความเชื่อมโยงของคำในเครือข่าย",wordNetworkExplanation:"คำศัพท์เชื่อมโยงกับคำอื่นๆ จะช่วยให้จำได้ดีขึ้นเมื่อรู้ความเชื่อมโยง",targetWord:"สุนัข",hypernym:"คำนามหลัก",hypernymWord:"สัตว์",synonym:"คำไวพจน์",synonymWord:"เจ้าตูบ",antonym:"คำตรงข้าม",antonymWord:"แมว",hyponym:"คำประเภทย่อย",hyponymWord:"พุดเดิ้ล",geminiBtnText:"เรียนรู้คำศัพท์ - กดที่นี่",geminiConsentText:"การคลิกที่ลิงก์นี้แสดงว่าคุณตกลงที่จะใช้ผลิตภัณฑ์ของ Google และให้ Google ฝึก AI ด้วยคำตอบของคุณ",hverdagssamtale:"สนทนาในชีวิตประจำวัน",hverdagssamtaleDesc:"ฝึกบทสนทนาทั่วไปเกี่ยวกับชีวิตประจำวัน",samtaleBolig:"คุยเรื่องที่อยู่อาศัย",samtaleArbejde:"คุยเรื่องงาน",samtaleBtnText:"เริ่มการสนทนา - กดที่นี่",skriveHjaelpBtnText:"ตัวช่วยเขียน - กดที่นี่",du1mod3Desc:"เลือกหัวข้อที่จะฝึกฝน",minHverdag:"ชีวิตประจำวันของฉัน",minBolig:"บ้านของฉัน",mitArbejde:"งานของฉัน",minHverdagDesc:"งานเกี่ยวกับชีวิตประจำวันของคุณ",transportSprogskole:"การเดินทางไปโรงเรียน",madlavning:"การทำอาหาร",rengoering:"การทำความสะอาด",transportDesc:"คุณมาโรงเรียนอย่างไร?",padletDesc:"แบ่งปันวิธีการมาโรงเรียนของคุณในวันนี้กับเพื่อนในห้อง",padletBtnText:"เปิด Padlet",madlavningDesc:"คุณชอบทำอาหารประเภทไหน?",madlavningPadletDesc:"แบ่งปันประสบการณ์การทำอาหารของคุณที่นี่",rengoeringDesc:"คุณทำความสะอาดอย่างไร?",rengoeringPadletDesc:"แบ่งปันความคิดเรื่องการทำความสะอาดกับเพื่อนในห้อง",traenTidsudtryk:"ฝึกการบอกเวลา",traenTidsudtrykDesc:"วิธีการใช้สำนวนเกี่ยวกับเวลาในภาษาเดนมาร์ก",traenTidsudtrykBtnText:"เปิดแบบฝึกหัดการบอกเวลา",ordstilling:"การเรียงลำดับคำ",ordstillingDesc:"จัดเรียงคำใหม่และวางตามลำดับที่ถูกต้อง",checkResult:"ตรวจคำตอบ",correctOrder:"ยอดเยี่ยม! ลำดับถูกต้อง",wrongOrder:"ยังไม่ถูกต้อง ลองอีกครั้ง!",ordstillingLet:"การเรียงลำดับคำ (ง่าย)",ordstillingSvaer:"การเรียงลำดับคำ (ยาก)",levelA1:"ประโยค A1",levelA2:"ประโยค A2",traenGrammatik:"ฝึกไวยากรณ์",grammatikDesc:"เติมคำที่ถูกต้องลงในช่องว่างในเนื้อข้อความ",let:"ง่าย (A1)",mellemsvaer:"ปานกลาง (A2)",svaer:"ยาก (B1)",grammatikIntro:"เลือกระดับเพื่อเริ่มแบบฝึกหัด",checkAnswers:"ตรวจคำตอบทั้งหมด",allCorrect:"สุดยอด! ทุกคำตอบถูกต้อง",someWrong:"คำตอบบางคำไม่ค่อยถูกต้อง ลองอีกครั้ง!",newExercise:"ข้อความถัดไป",hintMean:"คำนี้ไม่มีความหมายในบริบทนี้",hintTense:"ตรวจสอบกาล (Tense) เป็นปัจจุบันหรืออดีต?",hintForm:"ตรวจสอบรูปของคำ (เช่น เพศ หรือ เอกพจน์/พหูพจน์)",hintPerson:"ตรวจสอบว่าใครเป็นคนทำกริยานั้น (ฉัน, คุณ, เขา/เธอ)",hintContext:"อ่านข้อความทั้งหมดอีกครั้ง อะไรเหมาะที่สุดตรงนี้?",hintName:"คุณต้องการคำเรียกชื่อตรงนี้",hintPlace:"คุณต้องการคำระบุสถานที่ตรงนี้",hintAction:"คำนี้อธิบายการกระทำที่ต่างออกไป",hintAdj:"ตรวจสอบคำคุณศัพท์ (การบรรยายสิ่งของ)",hintAdverb:"ตรวจสอบคำวิเศษณ์ (เวลา สถานที่ หรืออาการ)",hintConj:"ตรวจสอบคำสันธาน (คำเชื่อมประโยค)",filled:"เติมแล้ว"},pt:{selectLanguage:"Escolher idioma",title:"Treino de Dinamarquês",subtitle:"Escolha uma categoria para começar o seu treino.",dagensOpgave:"Tarefa do Dia",dagensOpgaveDesc:"Novo tópico, nova gramática. Resolva a tarefa!",modulTest:"Treino para Teste de Módulo",modulTestDesc:"Várias tarefas reunidas num só lugar.",notes:"Notas de Aula",notesDesc:"Leia e pratique com as notas das aulas.",lavSporgsmal:"Criar Perguntas",lavSporgsmalDesc:"Aprenda a fazer perguntas precisas com base em imagens.",lavSporgsmalBtnText:"Criar perguntas - clique aqui",samtaleTraening:"Treino de Conversação",samtaleTraeningDesc:"Pratique as suas conversas e obtenha ajuda com o seu dinamarquês.",skriveHjaelp:"Ajuda na Escrita",skriveHjaelpDesc:"Insira o seu texto e obtenha feedback sem respostas.",back:"Voltar",du1mod3:"DU1, módulo 3 e 4",laerEtNytOrd:"Aprender uma palavra nova",laerEtNytOrdDesc:"Explore como as palavras se ligam em redes.",wordNetworkExplanation:"As palavras estão ligadas a outras palavras. Ajuda a lembrar-se muito melhor quando sabe as ligações.",targetWord:"Cão",hypernym:"Hiperónimo",hypernymWord:"Animal",synonym:"Sinónimo",synonymWord:"Cachorro",antonym:"Antónimo",antonymWord:"Gato",hyponym:"Hipónimo",hyponymWord:"Poodle",geminiBtnText:"Aprender uma palavra - prima aqui",geminiConsentText:"Ao clicar neste link, concorda em usar um produto da Google e que a Google treine inteligência artificial com as suas respostas.",hverdagssamtale:"Conversa do dia-a-dia",hverdagssamtaleDesc:"Pratique conversas comuns sobre o quotidiano.",samtaleBolig:"Conversa sobre habitação",samtaleArbejde:"Conversa sobre trabalho",samtaleBtnText:"Começar conversa - clicar aqui",skriveHjaelpBtnText:"Ajuda na escrita - clicar aqui",du1mod3Desc:"Escolha um tópico para praticar.",minHverdag:"O meu dia-a-dia",minBolig:"A minha casa",mitArbejde:"O meu trabalho",minHverdagDesc:"Tarefas sobre a sua rotina diária.",transportSprogskole:"Transporte para a escola",madlavning:"Culinária",rengoering:"Limpeza",transportDesc:"Como vem para a escola?",padletDesc:"Partilhe com a turma como chegou à escola hoje.",padletBtnText:"Abrir Padlet",madlavningDesc:"Que tipo de comida gosta de fazer?",madlavningPadletDesc:"Partilhe as suas experiências culinárias aqui.",rengoeringDesc:"Como faz as limpezas?",rengoeringPadletDesc:"Partilhe os seus pensamentos sobre limpezas.",traenTidsudtryk:"Treino de expressões de tempo",traenTidsudtrykDesc:"Como usar diferentes expressões de tempo em dinamarquês?",traenTidsudtrykBtnText:"Abrir exercício de expressões de tempo",ordstilling:"Ordem das Palavras",ordstillingDesc:"Reorganize as palavras e coloque-as na ordem correta.",checkResult:"Verificar resposta",correctOrder:"Excelente! A ordem está correta.",wrongOrder:"Não está bem. Tente novamente!",ordstillingLet:"Ordem das Palavras (Fácil)",ordstillingSvaer:"Ordem das Palavras (Difícil)",levelA1:"Frases A1",levelA2:"Frases A2",traenGrammatik:"Treinar Gramática",grammatikDesc:"Preencha as lacunas com as palavras corretas no texto.",let:"Fácil (A1)",mellemsvaer:"Médio (A2)",svaer:"Difícil (B1)",grammatikIntro:"Escolha um nível para começar o exercício.",checkAnswers:"Verificar todas as respostas",allCorrect:"Fantástico! Todas as respostas estão corretas.",someWrong:"Algumas das suas respostas não estão totalmente corretas. Tente novamente!",newExercise:"Próximo texto",hintMean:"Esta palavra não faz sentido neste contexto.",hintTense:"Verifique o tempo verbal. É presente ou passado?",hintForm:"Verifique a forma da palavra (ex: gênero ou singular/plural).",hintPerson:"Verifique quem está realizando a ação (eu, você, ele/ela).",hintContext:"Leia todo o texto novamente. O que melhor se encaixa aqui?",hintName:"Você precisa de uma palavra para nomes aqui.",hintPlace:"Você precisa de uma palavra para locais aqui.",hintAction:"Esta palavra descreve uma ação diferente.",hintAdj:"Verifique o adjetivo (descrição de uma coisa).",hintAdverb:"Verifique o advérbio (tempo, lugar ou modo).",hintConj:"Verifique a conjunção (conecta duas frases).",filled:"preenchido"},vi:{selectLanguage:"Chọn ngôn ngữ",title:"Luyện tiếng Đan Mạch",subtitle:"Chọn một danh mục để bắt đầu luyện tập.",dagensOpgave:"Nhiệm vụ hàng ngày",dagensOpgaveDesc:"Chủ đề mới, ngữ pháp mới. Hãy giải nhiệm vụ!",modulTest:"Luyện thi mô-đun",modulTestDesc:"Nhiều nhiệm vụ khác nhau được tập hợp tại một nơi.",notes:"Ghi chú bài giảng",notesDesc:"Đọc và thực hành các ghi chú từ lớp học.",lavSporgsmal:"Đặt câu hỏi",lavSporgsmalDesc:"Học cách đặt câu hỏi chính xác dựa trên hình ảnh.",lavSporgsmalBtnText:"Đặt câu hỏi - bấm vào đây",samtaleTraening:"Luyện hội thoại",samtaleTraeningDesc:"Thực hành hội thoại và nhận trợ giúp về tiếng Đan Mạch.",skriveHjaelp:"Trợ giúp viết",skriveHjaelpDesc:"Nhập văn bản của bạn và nhận phản hồi không có đáp án.",back:"Quay lại",du1mod3:"DU1, mô-đun 3",laerEtNytOrd:"Học một từ mới",laerEtNytOrdDesc:"Khám phá cách các từ kết nối trong mạng lưới.",wordNetworkExplanation:"Các từ được kết nối với các từ khác. Việc biết cách kết nối giúp bạn nhớ từ tốt hơn nhiều.",targetWord:"Con chó",hypernym:"Từ bao nghĩa",hypernymWord:"Động vật",synonym:"Từ đồng nghĩa",synonymWord:"Cún",antonym:"Từ trái nghĩa",antonymWord:"Con mèo",hyponym:"Từ nghĩa hẹp",hyponymWord:"Chó Poodle",geminiBtnText:"Học một từ - nhấn vào đây",geminiConsentText:"Bằng cách nhấp vào liên kết này, bạn đồng ý sử dụng sản phẩm của Google và để Google huấn luyện trí tuệ nhân tạo bằng câu trả lời của bạn.",hverdagssamtale:"Hội thoại hàng ngày",hverdagssamtaleDesc:"Thực hành các cuộc hội thoại thông thường về cuộc sống hàng ngày.",samtaleBolig:"Hội thoại về nhà ở",samtaleArbejde:"Hội thoại về công việc",samtaleBtnText:"Bắt đầu hội thoại - bấm tại đây",skriveHjaelpBtnText:"Trợ giúp viết - bấm tại đây",du1mod3Desc:"Chọn một chủ đề để thực hành.",minHverdag:"Cuộc sống hàng ngày của tôi",minBolig:"Nhà ở của tôi",mitArbejde:"Công việc của tôi",minHverdagDesc:"Các nhiệm vụ về cuộc sống hàng ngày của bạn.",transportSprogskole:"Phương tiện đến trường",madlavning:"Nấu ăn",rengoering:"Dọn dẹp",transportDesc:"Bạn đến trường bằng cách nào?",padletDesc:"Chia sẻ với cả lớp cách bạn đến trường hôm nay.",padletBtnText:"Mở Padlet",madlavningDesc:"Bạn thích nấu món ăn gì?",madlavningPadletDesc:"Chia sẻ kinh nghiệm nấu ăn của bạn với cả lớp tại đây.",rengoeringDesc:"Bạn dọn dẹp như thế nào?",rengoeringPadletDesc:"Chia sẻ suy nghĩ của bạn về việc dọn dẹp với cả lớp.",traenTidsudtryk:"Luyện tập các cụm từ chỉ thời gian",traenTidsudtrykDesc:"Cách sử dụng các cụm từ chỉ thời gian khác nhau trong tiếng Đan Mạch?",traenTidsudtrykBtnText:"Mở bài tập chỉ thời gian",ordstilling:"Trật tự từ",ordstillingDesc:"Sắp xếp lại các từ và đặt chúng theo đúng thứ tự.",checkResult:"Kiểm tra đáp án",correctOrder:"Tuyệt vời! Thứ tự đã đúng.",wrongOrder:"Chưa hoàn toàn đúng. Thử lại nhé!",ordstillingLet:"Trật tự từ (Dễ)",ordstillingSvaer:"Trật tự từ (Khó)",levelA1:"Câu A1",levelA2:"Câu A2",traenGrammatik:"Luyện ngữ pháp",grammatikDesc:"Điền các từ đúng vào chỗ trống trong văn bản.",let:"Dễ (A1)",mellemsvaer:"Trung bình (A2)",svaer:"Khó (B1)",grammatikIntro:"Chọn một cấp độ để bắt đầu bài tập.",checkAnswers:"Kiểm tra tất cả đáp án",allCorrect:"Tuyệt vời! Tất cả đáp án đều đúng.",someWrong:"Một số câu trả lời của bạn chưa hoàn toàn đúng. Thử lại nhé!",newExercise:"Văn bản tiếp theo",hintMean:"Từ này không có ý nghĩa trong ngữ cảnh này.",hintTense:"Kiểm tra thì của động từ. Là hiện tại hay quá khứ?",hintForm:"Kiểm tra hình thức của từ (ví dụ: giống hoặc số ít/số nhiều).",hintPerson:"Kiểm tra ai là người thực hiện hành động (tôi, bạn, anh ấy/cô ấy).",hintContext:"Đọc lại toàn bộ văn bản. Điều gì phù hợp nhất ở đây?",hintName:"Bạn cần một từ cho tên ở đây.",hintPlace:"Bạn cần một từ cho nơi chốn ở đây.",hintAction:"Từ này mô tả một hành động khác."},fa:{selectLanguage:"انتخاب زبان",title:"آموزش دانمارکی",subtitle:"یک دسته را برای شروع تمرین خود انتخاب کنید.",dagensOpgave:"تکلیف روز",dagensOpgaveDesc:"موضوع جدید، گرامر جدید. تکلیف را حل کنید!",modulTest:"تمرین آزمون ماژول",modulTestDesc:"وظایف مختلف در یک جا جمع شده‌اند.",notes:"یادداشت‌های آموزشی",notesDesc:"یادداشت‌های کلاس را بخوانید و تمرین کنید.",lavSporgsmal:"ساخت سوال",lavSporgsmalDesc:"یاد بگیرید بر اساس تصاویر سوالات دقیق بپرسید.",lavSporgsmalBtnText:"ساخت سوال - اینجا کلیک کنید",samtaleTraening:"تمرین مکالمه",samtaleTraeningDesc:"مکالمات خود را تمرین کنید و در زبان دانمارکی کمک بگیرید.",skriveHjaelp:"کمک در نوشتن",skriveHjaelpDesc:"متن خود را وارد کنید و بدون پاسخ، بازخورد بگیرید.",back:"بازگشت",du1mod3:"DU1، ماژول ۳",laerEtNytOrd:"یادگیری یک کلمه جدید",laerEtNytOrdDesc:"کشف کنید که کلمات چگونه در شبکه‌ها به هم متصل هستند.",wordNetworkExplanation:"کلمات به کلمات دیگر متصل هستند. وقتی بدانید کلمه چگونه متصل است، آن را خیلی بهتر به یاد می‌سپارید.",targetWord:"سگ",hypernym:"واژه فراگیر",hypernymWord:"حیوان",synonym:"مترادف",synonymWord:"هاپو",antonym:"متضاد",antonymWord:"گربه",hyponym:"واژه محدودتر",hyponymWord:"پودل",geminiBtnText:"یادگیری کلمه - اینجا کلیک کنید",geminiConsentText:"با کلیک بر روی این لینک، موافقت می‌کنید که از محصولات گوگل استفاده کنید و گوگل هوش مصنوعی را با پاسخ‌های شما آموزش دهد.",hverdagssamtale:"مکالمه روزمره",hverdagssamtaleDesc:"مکالمات معمول درباره زندگی روزمره را تمرین کنید.",samtaleBolig:"مکالمه درباره مسکن",samtaleArbejde:"مکالمه درباره کار",samtaleBtnText:"شروع مکالمه - اینجا کلیک کنید",skriveHjaelpBtnText:"کمک در نوشتن - اینجا کلیک کنید",du1mod3Desc:"یک موضوع را برای تمرین انتخاب کنید.",minHverdag:"زندگی روزمره من",minBolig:"مسکن من",mitArbejde:"کار من",minHverdagDesc:"تکالیفی درباره زندگی روزمره شما.",transportSprogskole:"رفت و آمد به مدرسه زبن",madlavning:"آشپزی",rengoering:"نظافت",transportDesc:"چطور به مدرسه می‌روید؟",padletDesc:"با کلاس در میان بگذارید که امروز چطور به مدرسه رسیدید.",padletBtnText:"باز کردن پدلت",madlavningDesc:"چه نوع غذایی دوست دارید درست کنید؟",madlavningPadletDesc:"تجربیات آشپزی خود را اینجا با کلاس به اشتراک بگذارید.",rengoeringDesc:"چطور نظافت می‌کنید؟",rengoeringPadletDesc:"نظرات خود را درباره نظافت با کلاس در میان بگذارید.",traenTidsudtryk:"تمرین اصطلاحات زمانی",traenTidsudtrykDesc:"چطور از اصطلاحات زمانی مختلف در دانمارکی استفاده کنیم؟",traenTidsudtrykBtnText:"باز کردن تمرین اصطلاحات زمانی",ordstilling:"ترتیب کلمات",ordstillingDesc:"کلمات را دوباره ترتیب دهید و آن‌ها را در جای درست بگذارید.",checkResult:"بررسی پاسخ",correctOrder:"عالی! ترتیب درست است.",wrongOrder:"کاملاً درست نیست. دوباره امتحان کنید!",ordstillingLet:"ترتیب کلمات (آسان)",ordstillingSvaer:"ترتیب کلمات (سخت)",levelA1:"جملات A1",levelA2:"جملات A2",traenGrammatik:"تمرین دستور زبان",grammatikDesc:"جاهای خالی متن را با کلمات درست پر کنید.",let:"آسان (A1)",mellemsvaer:"متوسط (A2)",svaer:"سخت (B1)",grammatikIntro:"یک سطح را برای شروع تمرین انتخاب کنید.",checkAnswers:"بررسی تمام پاسخ‌ها",allCorrect:"عالی! تمام پاسخ‌ها درست هستند.",someWrong:"برخی از پاسخ‌های شما کاملاً درست نیستند. دوباره امتحان کنید!",newExercise:"متن بعدی",hintMean:"این کلمه در این متن معنایی ندارد.",hintTense:"زمان فعل را بررسی کنید. حال است یا گذشته؟",hintForm:"شکل کلمه را بررسی کنید (مثلاً جنسیت یا مفرد/جمع).",hintPerson:"بررسی کنید چه کسی عمل را انجام می‌دهد (من، تو، او).",hintContext:"دوباره کل متن را بخوانید. چه چیزی اینجا بهتر است؟",hintName:"اینجا به کلمه‌ای برای نام‌ها نیاز دارید.",hintPlace:"اینجا به کلمه‌ای برای مکان‌ها نیاز دارید.",hintAction:"این کلمه عمل دیگری را توصیف می‌کند."},tr:{selectLanguage:"Dil seçin",title:"Danca Eğitimi",subtitle:"Eğitiminize başlamak için bir kategori seçin.",dagensOpgave:"Günün Ödevi",dagensOpgaveDesc:"Yeni konu, yeni dilbilgisi. Ödevi çözün!",modulTest:"Modül Testi Eğitimi",modulTestDesc:"Çeşitli görevler tek bir yerde toplandı.",notes:"Ders Notları",notesDesc:"Derslerdeki notları okuyun ve pratik yapın.",lavSporgsmal:"Soru Hazırlama",lavSporgsmalDesc:"Resimlere bakarak kesin sorular sormayı öğrenin.",lavSporgsmalBtnText:"Soru hazırlayın - buraya tıklayın",samtaleTraening:"Konuşma Eğitimi",samtaleTraeningDesc:"Konuşma pratiği yapın ve Dancanız için yardım alın.",skriveHjaelp:"Yazma Yardımı",skriveHjaelpDesc:"Metninizi girin ve cevaplar olmadan geri bildirim alın.",back:"Geri",du1mod3:"DU1, modül 3",du2mod1:"DU2, modül 1",du3mod4:"DU3, modül 4",laerEtNytOrd:"Yeni bir kelime öğrenin",laerEtNytOrdDesc:"Kelimelerin ağlar içinde nasıl bağlandığını keşfedin.",wordNetworkExplanation:"Kelimeler diğer kelimelere bağlıdır. Kelimenin diğer kelimelere nasıl bağlandığını bildiğinizde, kelimeyi çok daha iyi hatırlamanıza yardımcı olur.",targetWord:"Köpek",hypernym:"Üst Terim",hypernymWord:"Hayvan",synonym:"Eşanlamlı",synonymWord:"Köpecik (vovse)",antonym:"Zıt Anlamlı",antonymWord:"Kedi",hyponym:"Alt Terim",hyponymWord:"Kaniş",geminiBtnText:"Kelime öğrenin - buraya tıklayın",geminiConsentText:"Bu bağlantıya tıklayarak bir Google ürünü kullandığınızı ve Google'ın yapay zekayı cevaplarınızla eğittiğini kabul etmiş olursunuz.",hverdagssamtale:"Günlük Konuşma",hverdagssamtaleDesc:"Günlük hayattan yaygın konuşmalar yapın.",samtaleBolig:"Konut hakkında konuşma",samtaleArbejde:"İş hakkında konuşma",samtaleBtnText:"Konuşmayı başlatın - buraya tıklayın",skriveHjaelpBtnText:"Yazma yardımı - buraya tıklayın",du1mod3Desc:"Pratik yapmak için bir konu seçin.",minHverdag:"Günlük hayatım",minBolig:"Konutum",mitArbejde:"İşim",minHverdagDesc:"Günlük hayatınızla ilgili görevler.",transportSprogskole:"Okula ulaşım",madlavning:"Yemek pişirme",rengoering:"Temizlik",transportDesc:"Okula nasıl geliyorsunuz?",padletDesc:"Bugün okula nasıl geldiğinizi sınıfla paylaşın.",padletBtnText:"Padlet'i aç",madlavningDesc:"Hangi yiyecekleri yapmayı seversiniz?",madlavningPadletDesc:"Yemek deneyimlerinizi burada sınıfla paylaşın.",rengoeringDesc:"Temizliği nasıl yaparsınız?",rengoeringPadletDesc:"Temizlikle ilgili düşüncelerinizi sınıfla paylaşın.",traenTidsudtryk:"Zaman ifadeleri çalışması",traenTidsudtrykDesc:"Dancada farklı zaman ifadeleri nasıl kullanılır?",traenTidsudtrykBtnText:"Zaman ifadeleri egzersizini aç",ordstilling:"Kelime Sıralaması",ordstillingDesc:"Kelimeleri yeniden düzenleyin ve doğru sıraya koyun.",checkResult:"Cevabı kontrol et",correctOrder:"Harika! Sıralama doğru.",wrongOrder:"Tam olarak doğru değil. Tekrar deneyin!",ordstillingLet:"Kelime Sıralaması (Kolay)",ordstillingSvaer:"Kelime Sıralaması (Zor)",levelA1:"A1 cümleleri",levelA2:"A2 cümleleri",traenGrammatik:"Gramer Çalışması",grammatikDesc:"Metindeki boşlukları doğru kelimelerle doldurun.",let:"Kolay (A1)",mellemsvaer:"Orta (A2)",svaer:"Zor (B1)",grammatikIntro:"Egzersize başlamak için bir seviye seçin.",checkAnswers:"Tüm cevapları kontrol et",allCorrect:"Harika! Tüm cevaplar doğru.",someWrong:"Bazı cevaplarınız tam olarak doğru değil. Tekrar deneyin!",newExercise:"Sonraki metin",hintMean:"Bu kelime bu bağlamda mantıklı değil.",hintTense:"Zamanı kontrol edin. Şimdiki zaman mı yoksa geçmiş zaman mı?",hintForm:"Kelime biçimini kontrol edin (örneğin cinsiyet veya tekil/çoğul).",hintPerson:"Eylemi kimin yaptığını kontrol edin (ben, sen, o).",hintContext:"Tüm metni tekrar okuyun. Buraya en iyi ne uyar?",hintName:"Burada isimler için bir kelimeye ihtiyacınız var.",hintPlace:"Burada yerler için bir kelimeye ihtiyacınız var.",hintAction:"Bu kelime farklı bir eylemi tanımlıyor."},es:{selectLanguage:"Seleccionar idioma",title:"Entrenamiento de Danés",subtitle:"Selecciona una categoría para empezar tu entrenamiento.",dagensOpgave:"Tarea del día",dagensOpgaveDesc:"Nuevo tema, nueva gramática. ¡Resuelve la tarea!",modulTest:"Entrenamiento para el examen de módulo",modulTestDesc:"Varias tareas reunidas en un solo lugar.",notes:"Notas de clase",notesDesc:"Lee y practica con las notas de las clases.",lavSporgsmal:"Crear preguntas",lavSporgsmalDesc:"Aprende a hacer preguntas precisas a partir de imágenes.",lavSporgsmalBtnText:"Crear preguntas - haz clic aquí",samtaleTraening:"Entrenamiento de conversación",samtaleTraeningDesc:"Practica tus conversaciones y obtén ayuda con tu danés.",skriveHjaelp:"Ayuda con la escritura",skriveHjaelpDesc:"Inserta tu texto y obtén retroalimentación sin respuestas.",back:"Atrás",du1mod3:"DU1, módulo 3",du2mod1:"DU2, módulo 1",du3mod4:"DU3, módulo 4",laerEtNytOrd:"Aprender una palabra nueva",laerEtNytOrdDesc:"Explora cómo se conectan las palabras en redes.",wordNetworkExplanation:"Las palabras están conectadas con otras palabras. Ayuda a recordar la palabra mucho mejor cuando sabes cómo se conecta con otras palabras.",targetWord:"Perro",hypernym:"Hiperónimo",hypernymWord:"Animal",synonym:"Sinónimo",synonymWord:"Perrito (vovse)",antonym:"Antónimo",antonymWord:"Gato",hyponym:"Hipónimo",hyponymWord:"Caniche",geminiBtnText:"Aprender una palabra - haz clic aquí",geminiConsentText:"Al hacer clic en este enlace, aceptas que estás utilizando un producto de Google y que Google entrena la inteligencia artificial con tus respuestas.",hverdagssamtale:"Conversación diaria",hverdagssamtaleDesc:"Practica conversaciones comunes sobre la vida diaria.",samtaleBolig:"Conversación sobre vivienda",samtaleArbejde:"Conversación sobre trabajo",samtaleBtnText:"Empezar la conversación - haz clic aquí",skriveHjaelpBtnText:"Ayuda con la escritura - haz clic aquí",du1mod3Desc:"Elige un tema para practicar.",minHverdag:"Mi vida diaria",minBolig:"Mi vivienda",mitArbejde:"Mi trabajo",minHverdagDesc:"Tareas sobre tu vida cotidiana.",transportSprogskole:"Transporte a la escuela",madlavning:"Cocina",rengoering:"Limpieza",transportDesc:"¿Cómo vienes a la escuela?",padletDesc:"Comparte con la clase cómo has llegado a la escuela hoy.",padletBtnText:"Abrir Padlet",madlavningDesc:"¿Qué tipo de comida te gusta cocinar?",madlavningPadletDesc:"Comparte tus experiencias culinarias con la clase aquí.",rengoeringDesc:"¿Cómo haces la limpieza?",rengoeringPadletDesc:"Comparte tus pensamientos sobre la limpieza con la clase.",traenTidsudtryk:"Entrenamiento de expresiones de tiempo",traenTidsudtrykDesc:"¿Cómo se usan las diferentes expresiones de tiempo en danés?",traenTidsudtrykBtnText:"Abrir ejercicio de expresiones de tiempo",ordstilling:"Orden de las palabras",ordstillingDesc:"Reorganiza las palabras y ponlas en el orden correcto.",checkResult:"Comprobar respuesta",correctOrder:"¡Genial! El orden es correcto.",wrongOrder:"No es correcto. ¡Inténtalo de nuevo!",ordstillingLet:"Orden de las palabras (Fácil)",ordstillingSvaer:"Orden de las palabras (Difícil)",levelA1:"Frases A1",levelA2:"Frases A2",traenGrammatik:"Practicar Gramática",grammatikDesc:"Completa los huecos con las palabras correctas en el texto.",let:"Fácil (A1)",mellemsvaer:"Intermedio (A2)",svaer:"Difícil (B1)",grammatikIntro:"Selecciona un nivel para comenzar el ejercicio.",checkAnswers:"Comprobar todas las respuestas",allCorrect:"¡Fantástico! Todas las respuestas son correctas.",someWrong:"Algunas de tus respuestas no son del todo correctas. ¡Inténtalo de nuevo!",newExercise:"Siguiente texto",hintMean:"Esta palabra no tiene sentido en este contexto.",hintTense:"Comprueba el tiempo verbal. ¿Es presente o pasado?",hintForm:"Comprueba la forma de la palabra (p. ej., género o singular/plural).",hintPerson:"Comprueba quién realiza la acción (yo, tú, él/ella).",hintContext:"Lee todo el texto de nuevo. ¿Qué encaja mejor aquí?",hintName:"Necesitas una palabra para nombres aquí.",hintPlace:"Necesitas una palabra para lugares aquí.",hintAction:"Esta palabra describe una acción diferente."}},A={lang:localStorage.getItem("appLang")||null,currentView:"language"};function X(){return A.lang||"da"}function t(m){const d=F[X()];return d&&d[m]?d[m]:F.da[m]||m}function ee(m){A.lang=m,localStorage.setItem("appLang",m)}function te(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("h1");a.textContent="Træning i dansk";const n=document.createElement("p");n.className="subtitle",n.textContent="Vælg sprog / Select language";const g=document.createElement("div");g.className="lang-list",[{code:"da",label:"Dansk"},{code:"en",label:"English"},{code:"ar",label:"العربية"},{code:"ur",label:"اردو"},{code:"zh",label:"中文"},{code:"ru",label:"Русский"},{code:"ne",label:"नेपाली"},{code:"th",label:"ไทย"},{code:"pt",label:"Português"},{code:"vi",label:"Tiếng Việt"},{code:"fa",label:"فارسی"},{code:"tr",label:"Türkçe"},{code:"es",label:"Español"}].forEach(o=>{const l=document.createElement("button");l.className="lang-btn",l.textContent=o.label,l.onclick=()=>{ee(o.code),d("main")},g.appendChild(l)}),e.appendChild(a),e.appendChild(n),e.appendChild(g),m.appendChild(e)}function ne(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("h1");a.textContent=t("title");const n=document.createElement("p");n.className="subtitle",n.textContent=t("subtitle");const g=document.createElement("div");g.className="top-bar",g.style.justifyContent="flex-end",g.style.marginBottom="20px";const s=document.createElement("button");s.className="back-btn",s.textContent="🌐 "+t("selectLanguage"),s.onclick=()=>d("language"),g.appendChild(s);const o=[{icon:"✨",titleKey:"dagensOpgave",descKey:"dagensOpgaveDesc",action:()=>d("dagens_opgave")},{icon:"🎓",titleKey:"modulTest",descKey:"modulTestDesc",action:()=>alert("Mock: Gå til Træning til modultest")},{icon:"📘",titleKey:"notes",descKey:"notesDesc",action:()=>d("notes")},{icon:"💬",titleKey:"lavSporgsmal",descKey:"lavSporgsmalDesc",action:()=>d("lav_sporgsmal")},{icon:"🗣️",titleKey:"samtaleTraening",descKey:"samtaleTraeningDesc",action:()=>d("samtale_traening")},{icon:"✍️",titleKey:"skriveHjaelp",descKey:"skriveHjaelpDesc",action:()=>d("skrive_hjaelp")},{icon:"🏃",titleKey:"verbumLearning",descKey:"verbumLearningDesc",action:()=>d("verbum_learning")}],l=document.createElement("div");l.className="grid",o.forEach(c=>{const p=document.createElement("div");p.className="card",p.onclick=c.action;const i=document.createElement("div");i.className="card-icon",i.textContent=c.icon;const u=document.createElement("div");u.className="card-title",u.textContent=t(c.titleKey);const b=document.createElement("div");b.className="card-desc",b.textContent=t(c.descKey),p.appendChild(i),p.appendChild(u),p.appendChild(b),l.appendChild(p)});const r=document.createElement("footer");r.innerHTML='© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.',e.appendChild(g),e.appendChild(a),e.appendChild(n),e.appendChild(l),e.appendChild(r),m.appendChild(e)}function ae(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("main"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("notes");const s=document.createElement("p");s.className="subtitle",s.textContent=t("notesDesc");const o=(p,i,u)=>{if(localStorage.getItem(`access_${p}`)===u){d(i);return}const k=prompt(t("enterPassword"));k===u?(localStorage.setItem(`access_${p}`,u),d(i)):k!==null&&alert("Forkert adgangskode / Incorrect password")},l=[{icon:"📓",titleKey:"du1mod3",descKey:"",action:()=>o("du1_mod3","du1_modul3","dansk103")},{icon:"📖",titleKey:"du2mod1",descKey:"",action:()=>o("du2_mod1","du2_modul1","dansk307")},{icon:"📂",titleKey:"du2mod5",descKey:"",action:()=>d("du2_modul5")},{icon:"📚",titleKey:"du3mod4",descKey:"",action:()=>alert("Mock: Åbner DU3, modul 4")}],r=document.createElement("div");r.className="grid",l.forEach(p=>{const i=document.createElement("div");i.className="card",i.onclick=p.action;const u=document.createElement("div");u.className="card-icon",u.textContent=p.icon;const b=document.createElement("div");if(b.className="card-title",b.textContent=t(p.titleKey),i.appendChild(u),i.appendChild(b),p.descKey){const k=document.createElement("div");k.className="card-desc",k.textContent=t(p.descKey),i.appendChild(k)}r.appendChild(i)});const c=document.createElement("footer");c.innerHTML='© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.',e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(r),e.appendChild(c),m.appendChild(e)}function re(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("main"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("dagensOpgave");const s=document.createElement("p");s.className="subtitle",s.textContent=t("dagensOpgaveDesc");const o=[{icon:"🧠",titleKey:"laerEtNytOrd",descKey:"laerEtNytOrdDesc",action:()=>d("word_learning")},{icon:"⏰",titleKey:"traenTidsudtryk",descKey:"traenTidsudtrykDesc",action:()=>d("traen_tidsudtryk")},{icon:"📖",titleKey:"traenGrammatik",descKey:"grammatikDesc",action:()=>d("traen_grammatik")},{icon:"🧩",titleKey:"ordstilling",descKey:"ordstillingDesc",action:()=>d("ordstilling")},{icon:"🫂",titleKey:"hvilketOrd",descKey:"hvilketOrdDesc",action:()=>d("pronomen")},{icon:"🏗️",titleKey:"howToBuildSentence",descKey:"howToBuildSentenceDesc",action:()=>d("grounding")}],l=document.createElement("div");l.className="grid",o.forEach(r=>{const c=document.createElement("div");c.className="card",c.onclick=r.action;const p=document.createElement("div");p.className="card-icon",p.textContent=r.icon;const i=document.createElement("div");if(i.className="card-title",i.textContent=t(r.titleKey),c.appendChild(p),c.appendChild(i),r.descKey){const u=document.createElement("div");u.className="card-desc",u.textContent=t(r.descKey),c.appendChild(u)}l.appendChild(c)}),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(l),m.appendChild(e)}function ie(m,d){const e=document.createElement("div");e.className="view-container word-learning-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("dagens_opgave"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("laerEtNytOrd");const s=document.createElement("div");s.className="semantic-network",[{class:"node center",label:t("targetWord"),hint:""},{class:"node top",label:t("hypernymWord"),hint:t("hypernym")},{class:"node bottom",label:t("hyponymWord"),hint:t("hyponym")},{class:"node left",label:t("synonymWord"),hint:t("synonym")},{class:"node right",label:t("antonymWord"),hint:t("antonym")}].forEach(u=>{const b=document.createElement("div");b.className=u.class;const k=document.createElement("div");if(k.className="word",k.textContent=u.label,b.appendChild(k),u.hint){const j=document.createElement("div");j.className="hint",j.textContent=u.hint,b.appendChild(j)}s.appendChild(b)}),s.insertAdjacentHTML("afterbegin",`
      <svg class="network-lines" xmlns="http://www.w3.org/2000/svg">
        <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
      </svg>
    `);const l=document.createElement("p");l.className="word-explanation",l.textContent=t("wordNetworkExplanation");const r=document.createElement("div");r.className="consent-container";const c=document.createElement("input");c.type="checkbox",c.className="consent-checkbox",c.id="gemini-consent";const p=document.createElement("label");p.htmlFor="gemini-consent",p.className="consent-text",p.textContent=t("geminiConsentText"),r.appendChild(c),r.appendChild(p);const i=document.createElement("a");i.href="https://gemini.google.com/gem/1053Zk0akFAs0u3zMgYkZbtae9CO55Tyb?usp=sharing",i.target="_blank",i.className="gemini-btn disabled",i.textContent=t("geminiBtnText"),c.addEventListener("change",u=>{u.target.checked?i.classList.remove("disabled"):i.classList.add("disabled")}),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(l),e.appendChild(r),e.appendChild(i),m.appendChild(e)}function oe(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("main"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("samtaleTraening");const s=document.createElement("p");s.className="subtitle",s.textContent=t("samtaleTraeningDesc");const o=[{icon:"🗣",titleKey:"hverdagssamtale",action:()=>d("samtale_hverdag")},{icon:"🏠",titleKey:"samtaleBolig",action:()=>alert("Mock: Åbner "+t("samtaleBolig"))},{icon:"💼",titleKey:"samtaleArbejde",action:()=>alert("Mock: Åbner "+t("samtaleArbejde"))}],l=document.createElement("div");l.className="grid",o.forEach(r=>{const c=document.createElement("div");c.className="card",c.onclick=r.action;const p=document.createElement("div");p.className="card-icon",p.textContent=r.icon;const i=document.createElement("div");i.className="card-title",i.textContent=t(r.titleKey),c.appendChild(p),c.appendChild(i),l.appendChild(c)}),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(l),m.appendChild(e)}function se(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("samtale_traening"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("hverdagssamtale");const s=document.createElement("p");s.className="subtitle",s.textContent=t("hverdagssamtaleDesc");const o=document.createElement("div");o.className="consent-container",o.style.margin="2rem auto";const l=document.createElement("input");l.type="checkbox",l.className="consent-checkbox",l.id="gemini-consent-samtale";const r=document.createElement("label");r.htmlFor="gemini-consent-samtale",r.className="consent-text",r.textContent=t("geminiConsentText"),o.appendChild(l),o.appendChild(r);const c=document.createElement("div");c.style.textAlign="center";const p=document.createElement("a");p.href="https://gemini.google.com/gem/1SX-yUWDxh31wEL0RZ7BSacdDUvWGtn-8?usp=sharing",p.target="_blank",p.className="gemini-btn disabled",p.textContent=t("samtaleBtnText"),c.appendChild(p),l.addEventListener("change",i=>{i.target.checked?p.classList.remove("disabled"):p.classList.add("disabled")}),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(o),e.appendChild(c),m.appendChild(e)}function le(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("main"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("skriveHjaelp");const s=document.createElement("p");s.className="subtitle",s.textContent=t("skriveHjaelpDesc");const o=document.createElement("div");o.className="consent-container",o.style.margin="2rem auto";const l=document.createElement("input");l.type="checkbox",l.className="consent-checkbox",l.id="gemini-consent-skrive";const r=document.createElement("label");r.htmlFor="gemini-consent-skrive",r.className="consent-text",r.textContent=t("geminiConsentText"),o.appendChild(l),o.appendChild(r);const c=document.createElement("div");c.style.textAlign="center";const p=document.createElement("a");p.href="https://gemini.google.com/gem/1Ke_Ges6JxMDC51hTM744lHSQm_fi9BhQ?usp=sharing",p.target="_blank",p.className="gemini-btn disabled",p.textContent=t("skriveHjaelpBtnText"),c.appendChild(p),l.addEventListener("change",i=>{i.target.checked?p.classList.remove("disabled"):p.classList.add("disabled")}),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(o),e.appendChild(c),m.appendChild(e)}function ce(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("notes"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("du1mod3");const s=document.createElement("p");s.className="subtitle",s.textContent=t("du1mod3Desc");const o=[{icon:"📅",titleKey:"minHverdag",action:()=>d("du1_min_hverdag")},{icon:"🏠",titleKey:"minBolig",action:()=>alert("Mock: Åbner "+t("minBolig"))},{icon:"💼",titleKey:"mitArbejde",action:()=>alert("Mock: Åbner "+t("mitArbejde"))}],l=document.createElement("div");l.className="grid",o.forEach(r=>{const c=document.createElement("div");c.className="card",c.onclick=r.action;const p=document.createElement("div");p.className="card-icon",p.textContent=r.icon;const i=document.createElement("div");i.className="card-title",i.textContent=t(r.titleKey),c.appendChild(p),c.appendChild(i),l.appendChild(c)}),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(l),m.appendChild(e)}function de(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("du1_modul3"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("minHverdag");const s=document.createElement("p");s.className="subtitle",s.textContent=t("minHverdagDesc");const o=[{icon:"🚌",titleKey:"transportSprogskole",action:()=>d("transport_sprogskole")},{icon:"🍳",titleKey:"madlavning",action:()=>d("du1_madlavning")},{icon:"🧹",titleKey:"rengoering",action:()=>d("du1_rengoering")}],l=document.createElement("div");l.className="grid",o.forEach(r=>{const c=document.createElement("div");c.className="card",c.onclick=r.action;const p=document.createElement("div");p.className="card-icon",p.textContent=r.icon;const i=document.createElement("div");i.className="card-title",i.textContent=t(r.titleKey),c.appendChild(p),c.appendChild(i),l.appendChild(c)}),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(l),m.appendChild(e)}function me(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("du1_min_hverdag"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("transportSprogskole");const s=document.createElement("p");s.className="subtitle",s.textContent=t("transportDesc");const o=document.createElement("div");o.className="transport-content",o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="2rem",o.style.marginTop="2rem",o.style.width="100%";const l=document.createElement("div");l.className="image-container",l.style.width="100%",l.style.maxWidth="600px",l.style.borderRadius="var(--border-radius)",l.style.overflow="hidden",l.style.boxShadow="var(--box-shadow)";const r=document.createElement("img");r.src=`${baseUrl}Gemini_Generated_Image_bnobabnobabnobab.png`,r.alt="Transport illustration",r.style.width="100%",r.style.height="auto",r.style.display="block",l.appendChild(r);const c=document.createElement("div");c.className="padlet-link-container",c.style.width="100%",c.style.maxWidth="600px",c.style.textAlign="center",c.style.backgroundColor="var(--card-bg)",c.style.padding="2rem",c.style.borderRadius="var(--border-radius)",c.style.boxShadow="var(--box-shadow)",c.style.border="1px solid var(--accent-red)";const p=document.createElement("p");p.textContent=t("padletDesc"),p.style.marginBottom="1.5rem",p.style.fontSize="1.2rem";const i=document.createElement("a");i.href="https://padlet.com/mibf/hvordan-kommer-du-til-sprogskole-gm97y985khw1csk1",i.target="_blank",i.className="padlet-btn",i.textContent=t("padletBtnText"),i.style.display="inline-block",i.style.padding="1rem 3rem",i.style.backgroundColor="var(--text-light)",i.style.color="var(--bg-deep-red)",i.style.textDecoration="none",i.style.borderRadius="30px",i.style.fontWeight="700",i.style.fontSize="1.2rem",i.style.transition="all 0.3s ease",i.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",i.onmouseover=()=>{i.style.transform="translateY(-2px)",i.style.boxShadow="0 6px 20px rgba(0,0,0,0.3)",i.style.outline="2px solid var(--text-light)",i.style.outlineOffset="2px"},i.onmouseout=()=>{i.style.transform="translateY(0)",i.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",i.style.outline="none"},c.appendChild(p),c.appendChild(i),o.appendChild(l),o.appendChild(c),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(o),m.appendChild(e)}function pe(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("du1_min_hverdag"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("madlavning");const s=document.createElement("p");s.className="subtitle",s.textContent=t("madlavningDesc");const o=document.createElement("div");o.className="madlavning-content",o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="2rem",o.style.marginTop="2rem",o.style.width="100%";const l=document.createElement("div");l.className="image-container",l.style.width="100%",l.style.maxWidth="600px",l.style.borderRadius="var(--border-radius)",l.style.overflow="hidden",l.style.boxShadow="var(--box-shadow)";const r=document.createElement("img");r.src=`${baseUrl}mad.png`,r.alt="Madlavning illustration",r.style.width="100%",r.style.height="auto",r.style.display="block",l.appendChild(r);const c=document.createElement("div");c.className="padlet-link-container",c.style.width="100%",c.style.maxWidth="600px",c.style.textAlign="center",c.style.backgroundColor="var(--card-bg)",c.style.padding="2rem",c.style.borderRadius="var(--border-radius)",c.style.boxShadow="var(--box-shadow)",c.style.border="1px solid var(--accent-red)";const p=document.createElement("p");p.textContent=t("madlavningPadletDesc"),p.style.marginBottom="1.5rem",p.style.fontSize="1.2rem";const i=document.createElement("a");i.href="https://padlet.com/mibf/b-rn-og-mad-fvyr130ka0n9f2yu",i.target="_blank",i.className="padlet-btn",i.textContent=t("padletBtnText"),i.style.display="inline-block",i.style.padding="1rem 3rem",i.style.backgroundColor="var(--text-light)",i.style.color="var(--bg-deep-red)",i.style.textDecoration="none",i.style.borderRadius="30px",i.style.fontWeight="700",i.style.fontSize="1.2rem",i.style.transition="all 0.3s ease",i.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",i.onmouseover=()=>{i.style.transform="translateY(-2px)",i.style.boxShadow="0 6px 20px rgba(0,0,0,0.3)"},i.onmouseout=()=>{i.style.transform="translateY(0)",i.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)"},c.appendChild(p),c.appendChild(i),o.appendChild(l),o.appendChild(c),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(o),m.appendChild(e)}function ge(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("du1_min_hverdag"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("rengoering");const s=document.createElement("p");s.className="subtitle",s.textContent=t("rengoeringDesc");const o=document.createElement("div");o.className="rengoering-content",o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="2rem",o.style.marginTop="2rem",o.style.width="100%";const l=document.createElement("div");l.style.display="grid",l.style.gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))",l.style.gap="1.5rem",l.style.width="100%",l.style.maxWidth="800px",["rent1.png","rent2.png"].forEach(i=>{const u=document.createElement("div");u.style.borderRadius="var(--border-radius)",u.style.overflow="hidden",u.style.boxShadow="var(--box-shadow)";const b=document.createElement("img");b.src=`${baseUrl}${i}`,b.alt="Rengøring illustration",b.style.width="100%",b.style.height="auto",b.style.display="block",u.appendChild(b),l.appendChild(u)});const r=document.createElement("div");r.className="padlet-link-container",r.style.width="100%",r.style.maxWidth="600px",r.style.textAlign="center",r.style.backgroundColor="var(--card-bg)",r.style.padding="2rem",r.style.borderRadius="var(--border-radius)",r.style.boxShadow="var(--box-shadow)",r.style.border="1px solid var(--accent-red)";const c=document.createElement("p");c.textContent=t("rengoeringPadletDesc"),c.style.marginBottom="1.5rem",c.style.fontSize="1.2rem";const p=document.createElement("a");p.href="https://padlet.com/mibf/jeg-g-r-rent-5udv7g0gczbo7vq9",p.target="_blank",p.className="padlet-btn",p.textContent=t("padletBtnText"),p.style.display="inline-block",p.style.padding="1rem 3rem",p.style.backgroundColor="var(--text-light)",p.style.color="var(--bg-deep-red)",p.style.textDecoration="none",p.style.borderRadius="30px",p.style.fontWeight="700",p.style.fontSize="1.2rem",p.style.transition="all 0.3s ease",p.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",p.onmouseover=()=>{p.style.transform="translateY(-2px)",p.style.boxShadow="0 6px 20px rgba(0,0,0,0.3)"},p.onmouseout=()=>{p.style.transform="translateY(0)",p.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)"},r.appendChild(c),r.appendChild(p),o.appendChild(l),o.appendChild(r),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(o),m.appendChild(e)}function ue(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("notes"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("du2mod1");const s=document.createElement("p");s.className="subtitle",s.textContent=t("du1mod3Desc");const o=[{icon:"📚",titleKey:"smaahistorier",action:()=>d("smaa_historier")}],l=document.createElement("div");l.className="grid",o.forEach(r=>{const c=document.createElement("div");c.className="card",c.onclick=r.action;const p=document.createElement("div");p.className="card-icon",p.textContent=r.icon;const i=document.createElement("div");i.className="card-title",i.textContent=t(r.titleKey),c.appendChild(p),c.appendChild(i),l.appendChild(c)}),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(l),m.appendChild(e)}function he(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("du2_modul1"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("smaahistorier");const s=document.createElement("p");s.className="subtitle",s.textContent=t("du1mod3Desc");const o=[{icon:"📝",title:"Lisa og Jens",action:()=>window.open("https://padlet.com/mibf/historie-om-lisa-og-jens-omv7710nz0tnp49","_blank")},{icon:"📝",title:"Andrea",action:()=>window.open("https://padlet.com/mibf/historie-om-andrea-26kzbgxc28yhl436","_blank")}],l=document.createElement("div");l.className="grid",o.forEach(r=>{const c=document.createElement("div");c.className="card",c.onclick=r.action;const p=document.createElement("div");p.className="card-icon",p.textContent=r.icon;const i=document.createElement("div");i.className="card-title",i.textContent=r.title,c.appendChild(p),c.appendChild(i),l.appendChild(c)}),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(l),m.appendChild(e)}function be(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("notes"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("du2mod5");const s=document.createElement("p");s.className="subtitle",s.textContent=t("du1mod3Desc");const o=[{icon:"📧",titleKey:"emailLaan",action:()=>d("email_laan")},{icon:"👨‍👩‍👧‍👦",titleKey:"opdragelse",action:()=>d("opdragelse")},{icon:"📢",titleKey:"enKlage",action:()=>d("en_klage")}],l=document.createElement("div");l.className="grid",o.forEach(r=>{const c=document.createElement("div");c.className="card",c.onclick=r.action;const p=document.createElement("div");p.className="card-icon",p.textContent=r.icon;const i=document.createElement("div");i.className="card-title",i.textContent=t(r.titleKey),c.appendChild(p),c.appendChild(i),l.appendChild(c)}),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(l),m.appendChild(e)}function ve(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("du2_modul5"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("emailLaan");const s=document.createElement("div");s.className="card",s.style.cursor="pointer",s.onclick=()=>window.open("https://padlet.com/mibf/e-mail-om-l-n-af-penge-pkdkrzrhemi6ftc4","_blank");const o=document.createElement("div");o.className="card-icon",o.textContent="📧";const l=document.createElement("div");l.className="card-title",l.textContent=t("emailLaan")+" (padlet)",s.appendChild(o),s.appendChild(l),e.appendChild(a),e.appendChild(g),e.appendChild(s),m.appendChild(e)}function ke(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("du2_modul5"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("opdragelse");const s=document.createElement("div");s.className="card",s.style.cursor="pointer",s.onclick=()=>window.open("https://padlet.com/mibf/fort-l-om-hvordan-du-blev-opdraget-se-opgave-16-side-48-i-fo-zhgtyifmg9e4f5ut","_blank");const o=document.createElement("div");o.className="card-icon",o.textContent="👨‍👩‍👧‍👦";const l=document.createElement("div");l.className="card-title",l.textContent=t("opdragelse")+" (padlet)",s.appendChild(o),s.appendChild(l),e.appendChild(a),e.appendChild(g),e.appendChild(s),m.appendChild(e)}function fe(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("du2_modul5"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("enKlage");const s=document.createElement("div");s.className="card",s.style.cursor="pointer",s.onclick=()=>window.open("https://padlet.com/mibf/en-klage-fv80qrahnyjw5e45","_blank");const o=document.createElement("div");o.className="card-icon",o.textContent="📢";const l=document.createElement("div");l.className="card-title",l.textContent=t("enKlage")+" (padlet)",s.appendChild(o),s.appendChild(l),e.appendChild(a),e.appendChild(g),e.appendChild(s),m.appendChild(e)}function ye(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("dagens_opgave"),a.appendChild(n),e.appendChild(a);const g=document.createElement("h1");g.textContent=t("traenTidsudtryk");const s=document.createElement("p");s.className="subtitle",s.textContent=t("traenTidsudtrykDesc"),e.appendChild(g),e.appendChild(s);const o=[{text:"Jeg drak kaffe [blank_0].",blanks:[{answer:"i morges",options:["i morges","i morgen","nu"],hint:"Se på verbet 'drak'. Er det nutid eller datid?"}]},{text:"Vi drikker vand [blank_0].",blanks:[{answer:"nu",options:["nu","i går","på torsdag"],hint:"Se på verbet 'drikker'. Er det nutid eller datid?"}]},{text:"Han skal til lægen [blank_0].",blanks:[{answer:"i morgen",options:["i morgen","i går","nu"],hint:"Se på verbet 'skal'. Det indikerer noget, der sker senere."}]},{text:"Hun var i biografen [blank_0].",blanks:[{answer:"i går",options:["i går","nu","i næste uge"],hint:"Se på verbet 'var'. Er det nutid eller datid?"}]},{text:"De spiller fodbold [blank_0].",blanks:[{answer:"om søndagen",options:["om søndagen","i går","på fredag"],hint:"Her beskrives noget, man gør hver uge."}]},{text:"Vi rejser til Spanien [blank_0].",blanks:[{answer:"i næste uge",options:["i næste uge","nu","i går"],hint:"Det er en plan for fremtiden."}]},{text:"Jeg læste en bog [blank_0].",blanks:[{answer:"i lørdags",options:["i lørdags","på søndag","i morgen"],hint:"Se på verbet 'læste'. Er det nutid eller datid?"}]},{text:"[blank_0] drikker vi kaffe.",blanks:[{answer:"Om morgenen",options:["Om morgenen","I går","I morgen"],hint:"Vi gør det som en vane hver dag."}]},{text:"[blank_0] var jeg træt.",blanks:[{answer:"I går",options:["I går","Nu","På mandag"],hint:"Se på verbet 'var'. Det er datid."}]},{text:"Jeg køber ind [blank_0].",blanks:[{answer:"i morgen",options:["i morgen","nu","i går"],hint:"Her er tale om en plan for fremtiden."}]},{text:"[blank_0] skal vi på ferie.",blanks:[{answer:"I næste måned",options:["I næste måned","I går","Nu"],hint:"Det er noget, der skal ske i fremtiden."}]},{text:"Vi går en tur [blank_0].",blanks:[{answer:"hver dag",options:["hver dag","i går","i morgen"],hint:"Det er noget, vi gør fast."}]},{text:"[blank_0] drak jeg en øl.",blanks:[{answer:"I fredags",options:["I fredags","Nu","På søndag"],hint:"Se på verbet 'drak'. Det er datid."}]},{text:"[blank_0] skal hun til fest.",blanks:[{answer:"På lørdag",options:["På lørdag","I går","Nu"],hint:"Det er en plan for fremtiden."}]},{text:"De ser fjernsyn [blank_0].",blanks:[{answer:"nu",options:["nu","i går","på torsdag"],hint:"Det foregår lige nu."}]}];let l=0;const r=document.createElement("div");r.className="exercise-card",e.appendChild(r);function c(){r.innerHTML="";const p=o[l],i=document.createElement("div");i.className="exercise-progress",i.style.textAlign="center",i.style.marginBottom="1rem",i.style.fontSize="0.9rem",i.style.opacity="0.7",i.textContent=`${l+1} / ${o.length}`,r.appendChild(i);const u=document.createElement("div");u.className="grammatik-text-container",p.text.split(/(\[blank_\d+\])/).forEach(T=>{const E=T.match(/\[blank_(\d+)\]/);if(E){const D=E[1],x=document.createElement("span");x.className="select-wrapper";const w=document.createElement("select");w.className="grammatik-select",w.dataset.idx=D;const y=document.createElement("option");y.value="",y.textContent="...",w.appendChild(y),p.blanks[D].options.forEach(C=>{const v=document.createElement("option");v.value=C,v.textContent=C,w.appendChild(v)}),x.appendChild(w),u.appendChild(x)}else{const D=document.createElement("span");D.textContent=T,u.appendChild(D)}}),r.appendChild(u);const k=document.createElement("div");k.className="exercise-feedback",r.appendChild(k);const j=document.createElement("div");j.className="game-controls";const h=document.createElement("button");h.className="gemini-btn",h.textContent=t("checkAnswers"),h.onclick=()=>{const T=u.querySelectorAll("select");let E=!0,D="";T.forEach(x=>{const w=x.dataset.idx;x.value===p.blanks[w].answer?(x.classList.add("correct"),x.classList.remove("wrong")):(x.classList.add("wrong"),x.classList.remove("correct"),E=!1,D||(D=p.blanks[w].hint))}),E?(k.style.display="none",h.style.display="none",f.style.display="inline-block"):(k.textContent=D||t("hintContext"),k.style.display="block")};const f=document.createElement("button");f.className="gemini-btn",f.textContent=l<o.length-1?t("next"):t("finish"),f.style.display="none",f.onclick=()=>{l<o.length-1?(l++,c()):d("dagens_opgave")},j.appendChild(h),j.appendChild(f),r.appendChild(j)}c(),m.appendChild(e)}function xe(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("main"),a.appendChild(n);const g=document.createElement("h1");g.textContent=t("lavSporgsmal");const s=document.createElement("p");s.className="subtitle",s.textContent=t("lavSporgsmalDesc");const o=document.createElement("div");o.className="image-container",o.style.width="100%",o.style.maxWidth="600px",o.style.margin="2rem auto",o.style.borderRadius="var(--border-radius)",o.style.overflow="hidden",o.style.boxShadow="var(--box-shadow)";const l=document.createElement("img");l.src=`${G}questions.png`,l.alt="Spørgsmålsdannelse illustration",l.style.width="100%",l.style.height="auto",l.style.display="block",o.appendChild(l);const r=document.createElement("div");r.className="consent-container",r.style.margin="2rem auto";const c=document.createElement("input");c.type="checkbox",c.className="consent-checkbox",c.id="gemini-consent-lav-sporgsmal";const p=document.createElement("label");p.htmlFor="gemini-consent-lav-sporgsmal",p.className="consent-text",p.textContent=t("geminiConsentText"),r.appendChild(c),r.appendChild(p);const i=document.createElement("div");i.style.textAlign="center";const u=document.createElement("a");u.href="https://gemini.google.com/gem/1OKZRFhv_TlP2M32ApMHWsFVh4aCLHdNU?usp=sharing",u.target="_blank",u.className="gemini-btn disabled",u.textContent=t("lavSporgsmalBtnText"),i.appendChild(u),c.addEventListener("change",b=>{b.target.checked?u.classList.remove("disabled"):u.classList.add("disabled")}),e.appendChild(a),e.appendChild(g),e.appendChild(s),e.appendChild(o),e.appendChild(r),e.appendChild(i),m.appendChild(e)}function we(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.innerHTML=`← ${t("back")}`,n.onclick=()=>{o.style.display==="block"?(o.style.display="none",s.style.display="block",g.textContent=t("ordstilling")):d("dagens_opgave")},a.appendChild(n),e.appendChild(a);const g=document.createElement("h1");g.textContent=t("ordstilling"),e.appendChild(g);const s=document.createElement("div"),o=document.createElement("div");o.style.display="none";const l=document.createElement("p");l.className="subtitle",l.textContent=t("ordstillingDesc"),s.appendChild(l);const r=[{key:"let",level:"A1",icon:"🌱"},{key:"mellemsvaer",level:"A2",icon:"🌿"}],c=document.createElement("div");c.className="grid",r.forEach(i=>{const u=document.createElement("div");u.className="card",u.onclick=()=>p(i.level);const b=document.createElement("div");b.className="card-icon",b.textContent=i.icon;const k=document.createElement("div");k.className="card-title",k.textContent=t(i.key),u.appendChild(b),u.appendChild(k),c.appendChild(u)}),s.appendChild(c),e.appendChild(s);function p(i){s.style.display="none",o.style.display="block",o.innerHTML="",g.textContent=t(i==="A1"?"ordstillingLet":"ordstillingSvaer");const k=i==="A1"?["Jeg hedder Mikael.","Jeg kommer fra Danmark.","Hvor gammel er du?","Jeg bor i København.","Hvad laver du?","Jeg har en hund.","Min bil er rød.","Kaffen er varm."]:["Solen skinner altid i min have.","Jeg kan godt lide at lære dansk.","Vi ses i morgen på sprogskolen.","Kan du tale dansk og engelsk?","I går var jeg i biografen med min ven.","Jeg skal købe ind i supermarkedet nu.","Hvorfor kom du ikke til festen?","Det er vigtigt at øve sig hver dag."];let j=Math.floor(Math.random()*k.length),h,f,T,E;function D(){h=k[j],f=h.split(" "),T=[...f].sort(()=>Math.random()-.5),E=[]}const x=document.createElement("div");x.className="result-sentence-area";const w=document.createElement("div");w.className="word-pool";const y=document.createElement("div");y.className="game-feedback";const C=document.createElement("div");C.className="game-controls";const v=document.createElement("button");v.className="gemini-btn",v.textContent=t("checkResult"),v.onclick=()=>{E.join(" ")===h?(y.textContent=t("correctOrder"),y.className="game-feedback success",v.style.display="none",N.style.display="inline-block"):(y.textContent=t("wrongOrder"),y.className="game-feedback error")};const N=document.createElement("button");N.className="gemini-btn",N.textContent="Næste →",N.style.display="none",N.onclick=()=>{j=(j+1)%k.length,S()};function S(){D(),o.innerHTML="";const B=document.createElement("img");B.src=G+"v2_master_diagram.png",B.className="v2-illustration",o.appendChild(B),o.appendChild(x),o.appendChild(w),o.appendChild(y),C.innerHTML="",C.appendChild(v),C.appendChild(N),o.appendChild(C),v.style.display="inline-block",N.style.display="none",y.textContent="",H()}function H(){w.innerHTML="",T.forEach((B,$)=>{const M=document.createElement("div");M.className="word-chip",M.textContent=B,M.onclick=()=>{T.splice($,1),E.push(B),H()},w.appendChild(M)}),x.innerHTML="",E.length===0?x.innerHTML='<div class="result-placeholder">...</div>':E.forEach((B,$)=>{const M=document.createElement("div");M.className="word-chip result-chip",M.textContent=B,M.onclick=()=>{E.splice($,1),T.push(B),H()},x.appendChild(M)})}S()}if(e.appendChild(o),m.appendChild(e),!document.getElementById("ordstilling-styles")){const i=document.createElement("style");i.id="ordstilling-styles",i.textContent=`
            .ordstilling-game-area { display: flex; flex-direction: column; align-items: center; gap: 2rem; margin-top: 1rem; }
            .result-sentence-area { width: 100%; min-height: 80px; background: rgba(255, 255, 255, 0.05); border: 2px dashed rgba(255, 255, 255, 0.2); border-radius: 16px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.8rem; padding: 1rem; margin-bottom: 2rem; }
            .result-placeholder { color: rgba(255, 255, 255, 0.3); font-size: 1.5rem; }
            .word-pool { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.8rem; width: 100%; margin-bottom: 2rem; }
            .word-chip { background: var(--card-bg); border: 2px solid rgba(255, 255, 255, 0.1); color: var(--text-main); padding: 0.8rem 1.2rem; border-radius: 12px; cursor: pointer; font-size: 1.1rem; font-weight: 500; transition: all 0.2s; user-select: none; }
            .word-chip:hover { background: var(--card-hover); transform: translateY(-2px); border-color: rgba(255, 255, 255, 0.5); }
            .result-chip { background: rgba(255, 255, 255, 0.15); border-color: var(--ring-color); }
            .game-controls { display: flex; gap: 1rem; justify-content: center; }
            .game-feedback { font-size: 1.2rem; font-weight: 600; min-height: 1.5rem; transition: all 0.3s; text-align: center; margin-bottom: 1rem; }
            .game-feedback.success { color: #4CAF50; }
            .game-feedback.error { color: #FF5252; }
            .v2-illustration {
                width: 100%;
                max-width: 600px;
                height: auto;
                border-radius: 16px;
                margin-bottom: 2rem;
                display: block;
                margin-left: auto;
                margin-right: auto;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            }
        `,document.head.appendChild(i)}}function Ce(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.innerHTML=`← ${t("back")}`,n.onclick=()=>d("main"),a.appendChild(n),e.appendChild(a);const g=document.createElement("h1");g.textContent=t("traenGrammatik"),e.appendChild(g);const s=document.createElement("div"),o=document.createElement("div");o.style.display="none";const l=document.createElement("p");l.className="subtitle",l.textContent=t("grammatikIntro"),s.appendChild(l);const r=[{key:"let",level:"A1",icon:"🌱"},{key:"mellemsvaer",level:"A2",icon:"🌿"},{key:"svaer",level:"B1",icon:"🌳"},{key:"modultest",level:"modultest",icon:"🎓"}],c=document.createElement("div");c.className="grid",r.forEach(i=>{const u=document.createElement("div");u.className="card",u.onclick=()=>p(i.level);const b=document.createElement("div");b.className="card-icon",b.textContent=i.icon;const k=document.createElement("div");k.className="card-title",k.textContent=t(i.key),u.appendChild(b),u.appendChild(k),c.appendChild(u)}),s.appendChild(c),e.appendChild(s);function p(i){s.style.display="none",o.style.display="block",o.innerHTML="";const u=document.createElement("h2");u.textContent=t(i==="A1"?"let":i==="A2"?"mellemsvaer":i==="B1"?"svaer":"modultest"),u.style.textAlign="center",o.appendChild(u);const b=Ee(i);let k=0;function j(){o.innerHTML="",o.appendChild(u);const h=b[k];if(i==="modultest"){const v=document.createElement("div");v.className="word-list-hint";const S=[...h.blanks.map(H=>H.answer)].sort(()=>Math.random()-.5);v.textContent=S.join(", "),o.appendChild(v)}const f=document.createElement("div");f.className="grammatik-text-container",h.text.split(/(\[blank_\d+\])/).forEach(v=>{const N=v.match(/\[blank_(\d+)\]/);if(N){const S=N[1],H=document.createElement("span");H.className="select-wrapper";const B=document.createElement("select");B.className="grammatik-select",B.dataset.idx=S;const $=document.createElement("option");$.value="",$.textContent="...",B.appendChild($);let M=[...h.blanks[S].options];M.sort(()=>Math.random()-.5),M.forEach(V=>{const I=document.createElement("option");I.value=V,I.textContent=V,B.appendChild(I)}),H.appendChild(B),f.appendChild(H)}else{const S=document.createElement("span");S.textContent=v,f.appendChild(S)}}),o.appendChild(f);const E=document.createElement("div");E.className="exercise-feedback",o.appendChild(E);const D=document.createElement("div");D.className="grammatik-summary",o.appendChild(D);function x(){const v=f.querySelectorAll("select"),N=Array.from(v).filter(B=>B.value!=="").length,S=Array.from(v).filter(B=>B.classList.contains("correct")).length,H=v.length;N===0?D.textContent="":S===H?(D.innerHTML=`<span class="success">${t("allCorrect")}</span>`,y.style.display="none",C.style.display="block",E.style.display="none"):D.textContent=`${N} / ${H} ${t("filled")||"udfyldt"}`}f.querySelectorAll("select").forEach(v=>{v.onchange=()=>{const N=v.dataset.idx;if(v.value==="")v.classList.remove("correct","wrong"),E.style.display="none";else if(v.value===h.blanks[N].answer)v.classList.add("correct"),v.classList.remove("wrong"),E.style.display="none";else{v.classList.add("wrong"),v.classList.remove("correct");const S=v.value,H=h.blanks[N].hints&&h.blanks[N].hints[S]||"hintContext";E.textContent=t(H),E.style.display="block"}x()}});const w=document.createElement("div");w.className="game-controls";const y=document.createElement("button");y.className="gemini-btn",y.textContent=t("checkAnswers"),y.onclick=()=>{const v=f.querySelectorAll("select");let N=!0,S="";v.forEach(H=>{const B=H.dataset.idx;if(H.value===h.blanks[B].answer)H.classList.add("correct"),H.classList.remove("wrong");else if(H.classList.add("wrong"),H.classList.remove("correct"),N=!1,!S){const $=h.blanks[B].hints&&h.blanks[B].hints[H.value]||"hintContext";S=t($)}}),!N&&S?(E.textContent=S,E.style.display="block"):N&&(E.style.display="none"),x()};const C=document.createElement("button");C.className="gemini-btn",C.textContent=t("newExercise"),C.style.display="none",C.onclick=()=>{k=(k+1)%b.length,j()},w.appendChild(y),w.appendChild(C),o.appendChild(w),x()}j()}e.appendChild(o),m.appendChild(e)}function Ee(m){return m==="A1"?[{text:"Jeg [blank_0] i København. Jeg har en lille [blank_1]. Her bor jeg sammen med min [blank_2]. Vi [blank_3] ofte mad sammen i køkkenet. Min kone er en rigtig god [blank_4]. Om morgenen [blank_5] vi kaffe. Vi [blank_6] også en avis sammen. Det er en [blank_7] dag i dag. Vi er meget [blank_8] for vores liv.",blanks:[{answer:"bor",options:["bor","spiser","læser"],hints:{spiser:"hintAction",læser:"hintAction"}},{answer:"lejlighed",options:["lejlighed","bil","bord"],hints:{bil:"hintContext",bord:"hintPlace"}},{answer:"kone",options:["kone","ven","hund"],hints:{ven:"hintContext",hund:"hintContext"}},{answer:"laver",options:["laver","drikker","køber"],hints:{drikker:"hintAction",køber:"hintMean"}},{answer:"kok",options:["kok","bog","skole"],hints:{bog:"hintContext",skole:"hintPlace"}},{answer:"drikker",options:["drikker","spiser","ser"],hints:{spiser:"hintMean",ser:"hintAction"}},{answer:"læser",options:["læser","hører","går"],hints:{hører:"hintContext",går:"hintAction"}},{answer:"dejlig",options:["dejlig","sur","kold"],hints:{sur:"hintMean",kold:"hintContext"}},{answer:"glade",options:["glade","trætte","sure"],hints:{trætte:"hintContext",sure:"hintMean"}}]}]:m==="A2"?[{text:"Det er [blank_0] vejr i dag. Solen skinner [blank_1], og vi [blank_2] en tur i den grønne skov. Vi ser mange [blank_3] træer med friske blade. Vi går [blank_4] for at nyde den smukke natur. Fuglene [blank_5] lystigt i trætoppene. Det [blank_6] som om, at sommeren endelig er på vej. Vi [blank_7] os til at spise frokost i det fri bagefter. Det bliver en [blank_8] oplevelse for os alle.",blanks:[{answer:"dejligt",options:["dejligt","langsomt","aldrig"],hints:{langsomt:"hintAdj",aldrig:"hintAdverb"}},{answer:"kraftigt",options:["kraftigt","smukt","ofte"],hints:{smukt:"hintAdj",ofte:"hintAdverb"}},{answer:"går",options:["går","gik","gået"],hints:{gik:"hintTense",gået:"hintTense"}},{answer:"høje",options:["høje","høj","højt"],hints:{høj:"hintForm",højt:"hintForm"}},{answer:"langsomt",options:["langsomt","langsom","hurtig"],hints:{langsom:"hintForm",hurtig:"hintAdj"}},{answer:"synger",options:["synger","sang","sunget"],hints:{sang:"hintTense",sunget:"hintTense"}},{answer:"føles",options:["føles","føler","føltes"],hints:{føler:"hintForm",føltes:"hintTense"}},{answer:"glæder",options:["glæder","glædede","glade"],hints:{glædede:"hintTense",glade:"hintForm"}},{answer:"fantastisk",options:["fantastisk","fantastiske","fantastisket"],hints:{fantastiske:"hintForm",fantastisket:"hintMean"}}]}]:m==="B1"?[{text:"Jeg tager ofte bussen på arbejde, [blank_0] min bil desværre er gået i stykker igen. Selvom det regner [blank_1], foretrækker jeg dog normalt at køre selv. Det er [blank_2] irriterende, da jeg har mange [blank_3] aftaler i løbet af i dag. Jeg [blank_4] dog planlægge min rute [blank_5], så jeg ikke kommer for sent. Heldigvis [blank_6] bussen lige uden for min dør. Hvis jeg [blank_7] mig lidt, kan jeg lige præcis nå den. Det [blank_8] meget tålmodighed at bruge offentlig transport hver eneste dag.",blanks:[{answer:"fordi",options:["fordi","selvom","men"],hints:{selvom:"hintConj",men:"hintConj"}},{answer:"kraftigt",options:["kraftigt","kraftig","kraftige"],hints:{kraftig:"hintForm",kraftige:"hintForm"}},{answer:"temmelig",options:["temmelig","temmelige","temmeligt"],hints:{temmelige:"hintForm",temmeligt:"hintForm"}},{answer:"vigtige",options:["vigtige","vigtig","vigtigt"],hints:{vigtig:"hintForm",vigtigt:"hintForm"}},{answer:"må",options:["må","skal","kan"],hints:{skal:"hintContext",kan:"hintContext"}},{answer:"omhyggeligt",options:["omhyggeligt","omhyggelig","omhyggelige"],hints:{omhyggelig:"hintForm",omhyggelige:"hintForm"}},{answer:"holder",options:["holder","holdt","holdt"],hints:{holdt:"hintTense"}},{answer:"skynder",options:["skynder","skyndte","skyndet"],hints:{skyndte:"hintTense",skyndet:"hintTense"}},{answer:"kræver",options:["kræver","krævede","krævet"],hints:{krævede:"hintTense",krævet:"hintTense"}}]}]:m==="modultest"?[{text:"Velkommen til den store [blank_0], hvor vi skal teste dit danske sprog. Denne tekst er [blank_1] end de andre, da den fylder ti linjer. Du skal læse hele teksten [blank_2] for at forstå sammenhængen rigtigt. Det er vigtigt at du [blank_3] dig om, før du vælger et ord. Der er mange [blank_4] i listen ovenover, som du kan bruge. Hvis du laver en [blank_5], kan du altid prøve igen her. Vi håber at du får alle svar [blank_6] i første forsøg. Det kræver meget [blank_7] at lære et nyt sprog helt perfekt. Men vi ved at du [blank_8] gøre det, hvis du øver dig meget. Rigtig god [blank_9] med denne svære modultest opgave!",blanks:[{answer:"modultest",options:["modultest","eksamen","prøve"]},{answer:"længere",options:["længere","kort","sværere"]},{answer:"grundigt",options:["grundigt","hurtigt","nemt"]},{answer:"umager",options:["umager","gør","passer"]},{answer:"ord",options:["ord","tekster","sætninger"]},{answer:"fejl",options:["fejl","kage","pause"]},{answer:"rigtige",options:["rigtige","forkerte","sjove"]},{answer:"arbejde",options:["arbejde","hygge","mad"]},{answer:"kan",options:["kan","skal","får"]},{answer:"fornøjelse",options:["fornøjelse","lykke","held"]}]}]:[]}function De(m,d){const e=document.createElement("div");e.className="view-container";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.innerHTML=`← ${t("back")}`,a.appendChild(n),e.appendChild(a);const g=document.createElement("h1");g.textContent=t("hvilketOrd"),e.appendChild(g);const s=document.createElement("div"),o=document.createElement("div"),l=document.createElement("div"),r=document.createElement("div"),c=document.createElement("div");l.style.display="none",r.style.display="none",c.style.display="none";let p=1;const i=document.createElement("div");i.className="grid",i.style.marginTop="2rem";const u=document.createElement("div");u.className="card",u.innerHTML=`
        <div class="card-icon">👥</div>
        <div class="card-title">${t("hanHamHans")}</div>
    `,u.onclick=()=>f("pronomen");const b=document.createElement("div");b.className="card",b.innerHTML=`
        <div class="card-icon">🏃</div>
        <div class="card-title">${t("gårGikGået")}</div>
    `,b.onclick=()=>f("verbum");const k=document.createElement("div");k.className="card",k.innerHTML=`
        <div class="card-icon">🚪</div>
        <div class="card-title">${t("derErDetEr")}</div>
    `,k.onclick=()=>D();const j=document.createElement("div");j.className="card",j.innerHTML=`
        <div class="card-icon">📈</div>
        <div class="card-title">${t("soedSoedereSoedest")}</div>
    `,j.onclick=()=>d("adjective_comparison"),i.appendChild(u),i.appendChild(b),i.appendChild(k),i.appendChild(j),o.appendChild(i),s.appendChild(o);const h=document.createElement("div");h.className="grid",l.appendChild(h),s.appendChild(l);function f(y){p=2,o.style.display="none",l.style.display="block",r.style.display="none",h.innerHTML="",(y==="pronomen"?[{key:"pronominerSubjekt",type:"subjekt",icon:"🔦",img:"pronominer_spotlight.png"},{key:"pronominerObjekt",type:"objekt",icon:"👤",img:"pronominer_objekt.png"},{key:"pronominerPossessiv",type:"possessiv",icon:"🏠",img:"pronominer_possessiv.png"}]:[{key:"verberM3",type:"verber_nutid",icon:"🏃",img:"verber_kategorier.png"},{key:"verberDatid",type:"datid",icon:"🕰️",img:"verber_kategorier.png"},{key:"verberTider",type:"tider",icon:"🌉",img:"tider_guide.png"}]).forEach(v=>{const N=document.createElement("div");N.className="card",N.onclick=()=>{v.type==="verber_nutid"?E():v.key.startsWith("verber")?d("verbum_learning",{categoryId:v.type}):w(v)};const S=document.createElement("div");S.className="card-icon",S.textContent=v.icon;const H=document.createElement("div");H.className="card-title",H.textContent=t(v.key),N.appendChild(S),N.appendChild(H),h.appendChild(N)})}const T=document.createElement("div");T.className="grid",r.appendChild(T),s.appendChild(r);function E(){p=3,l.style.display="none",r.style.display="block",T.innerHTML="",[{key:"verberHjaelpe",type:"hjaelpe",icon:"💡"},{key:"verberTilstand",type:"tilstand",icon:"🏠"},{key:"verberBevaegelse",type:"bevaegelse",icon:"🚶"},{key:"verberHandling",type:"handling",icon:"🛠️"},{key:"verberInteraktion",type:"interaktion",icon:"🗣️"},{key:"verberIndreLiv",type:"indre_liv",icon:"🧠"}].forEach(C=>{const v=document.createElement("div");v.className="card",v.onclick=()=>d("verbum_learning",{categoryId:C.type});const N=document.createElement("div");N.className="card-icon",N.textContent=C.icon;const S=document.createElement("div");S.className="card-title",S.textContent=t(C.key),v.appendChild(N),v.appendChild(S),T.appendChild(v)})}n.onclick=()=>{c.style.display==="block"?(c.style.display="none",s.style.display="block",p===3?(r.style.display="block",l.style.display="none"):(l.style.display="block",r.style.display="none"),g.textContent=t("hvilketOrd")):r.style.display==="block"?(r.style.display="none",l.style.display="block",p=2,g.textContent=t("hvilketOrd")):l.style.display==="block"?(l.style.display="none",o.style.display="block",p=1,g.textContent=t("hvilketOrd")):d("dagens_opgave")};function D(){s.style.display="none",c.style.display="block",c.innerHTML="",g.textContent=t("derErDetEr");const y=document.createElement("div");y.className="der-er-explanation";const C=document.createElement("div");C.className="expl-slide",C.innerHTML=`
            <img src="${G}der_er_bil_gade.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${t("derErIntro1")}</div>
            <p class="expl-text">${t("derErExpl")}</p>
            <button class="gemini-btn next-slide-btn">Næste →</button>
        `;const v=document.createElement("div");v.className="expl-slide",v.style.display="none",v.innerHTML=`
            <img src="${G}det_er_bil_pegepind.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${t("derErIntro2")}</div>
            <p class="expl-text">Når vi kender tingen (den er inde i rummet), så bruger vi <b>det</b> til at pege.</p>
            <button class="gemini-btn start-practice-btn">Start øvelse!</button>
        `,C.querySelector(".next-slide-btn").onclick=()=>{C.style.display="none",v.style.display="block"},v.querySelector(".start-practice-btn").onclick=()=>{x()},y.appendChild(C),y.appendChild(v),c.appendChild(y)}function x(){c.innerHTML="";const y=[{text:"Se! [blank_0] en hund i haven.",answer:"Der er",options:["Der er","Det er"]},{text:"[blank_0] en stor hund. Se den!",answer:"Det er",options:["Der er","Det er"]},{text:"Hvem banker på døren? [blank_0] nok min mor.",answer:"Det er",options:["Der er","Det er"]},{text:"[blank_0] mange mennesker i toget i dag.",answer:"Der er",options:["Der er","Det er"]},{text:"[blank_0] en dejlig kop kaffe, du har her.",answer:"Det er",options:["Der er","Det er"]}];let C=0;function v(){c.innerHTML="";const S=y[C],H=document.createElement("div");H.className="pronomen-exercise-content";const B=document.createElement("div");B.className="exercise-progress",B.textContent=`Opgave ${C+1} af ${y.length}`,H.appendChild(B);const $=document.createElement("div");$.className="grammatik-text-container",S.text.split(/(\[blank_0\])/).forEach(I=>{if(I==="[blank_0]"){const _=document.createElement("select");_.className="grammatik-select";const O=document.createElement("option");O.value="",O.textContent="...",_.appendChild(O),S.options.forEach(W=>{const z=document.createElement("option");z.value=W,z.textContent=W,_.appendChild(z)});const P=document.createElement("div");P.className="exercise-feedback";const K=document.createElement("span");K.className="select-wrapper",K.appendChild(_),$.appendChild(K),_.onchange=()=>{_.value===S.answer?(_.classList.add("correct"),_.classList.remove("wrong"),P.style.display="none",V.disabled=!1):_.value!==""?(_.classList.add("wrong"),_.classList.remove("correct"),P.textContent=t("hintDerDet"),P.style.display="block",V.disabled=!0):(_.classList.remove("correct","wrong"),P.style.display="none",V.disabled=!0)},H.appendChild(P)}else{const _=document.createElement("span");_.textContent=I,$.appendChild(_)}}),H.appendChild($);const V=document.createElement("button");V.className="gemini-btn",V.textContent="Check",V.disabled=!0,V.onclick=()=>{C++,C<y.length?v():N()},H.appendChild(V),c.appendChild(H)}function N(){c.innerHTML=`
                <div class="pronomen-exercise-content">
                    <h2>Flot klaret! 🎉</h2>
                    <p>Du har styr på 'Der er' og 'Det er'.</p>
                    <button class="gemini-btn" onclick="location.reload()">Tilbage til menu</button>
                </div>
            `}v()}function w(y){s.style.display="none",c.style.display="block",c.innerHTML="",g.textContent=t(y.key);const C=document.createElement("img");C.src=G+y.img,C.className="pronomen-illustration",c.appendChild(C);const v=Te(y.type);let N=0;function S(){c.querySelectorAll(".pronomen-exercise-content").forEach(K=>K.remove());const B=document.createElement("div");B.className="pronomen-exercise-content";const $=v[N],M=document.createElement("div");M.className="grammatik-text-container",$.text.split(/(\[blank_\d+\])/).forEach(K=>{const W=K.match(/\[blank_(\d+)\]/);if(W){const z=W[1],q=document.createElement("span");q.className="select-wrapper";const R=document.createElement("select");R.className="grammatik-select",R.dataset.idx=z;const J=document.createElement("option");J.value="",J.textContent="...",R.appendChild(J),[...$.blanks[z].options].sort(()=>Math.random()-.5).forEach(Q=>{const Y=document.createElement("option");Y.value=Q,Y.textContent=Q,R.appendChild(Y)}),M.appendChild(q)}else{const z=document.createElement("span");z.textContent=K,M.appendChild(z)}}),B.appendChild(M);const I=document.createElement("div");I.className="exercise-feedback",B.appendChild(I);const _=document.createElement("div");_.className="game-controls";const O=document.createElement("button");O.className="gemini-btn",O.textContent=t("checkAnswers"),O.onclick=()=>{const K=M.querySelectorAll("select");let W=!0,z="";K.forEach(q=>{const R=q.dataset.idx;q.value===$.blanks[R].answer?(q.classList.add("correct"),q.classList.remove("wrong")):(q.classList.add("wrong"),q.classList.remove("correct"),W=!1,z||(z=t("hintPronominer")))}),W?(I.style.display="none",O.style.display="none",P.style.display="inline-block"):(I.textContent=z,I.style.display="block")};const P=document.createElement("button");P.className="gemini-btn",P.textContent=t("newExercise"),P.style.display="none",P.onclick=()=>{N=(N+1)%v.length,S()},_.appendChild(O),_.appendChild(P),B.appendChild(_),c.appendChild(B)}S()}if(e.appendChild(s),e.appendChild(c),m.appendChild(e),!document.getElementById("pronomen-styles")){const y=document.createElement("style");y.id="pronomen-styles",y.textContent=`
            .pronomen-illustration {
                width: 100%;
                max-width: 500px;
                height: auto;
                border-radius: 20px;
                margin: 0 auto 2.5rem;
                display: block;
                box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                border: 2px solid rgba(255, 255, 255, 0.1);
            }
            .expl-slide {
                text-align: center;
                animation: fadeIn 0.5s ease-out;
            }
            .expl-bubble {
                background: white;
                color: #2c3e50;
                padding: 1rem 1.5rem;
                border-radius: 20px;
                display: inline-block;
                font-weight: bold;
                margin-bottom: 1.5rem;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                border: 2px solid #3498db;
            }
            .expl-text {
                font-size: 1.1rem;
                margin-bottom: 2rem;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
                color: #ecf0f1;
            }
            .exercise-progress {
                margin-bottom: 1rem;
                font-size: 0.9rem;
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
        `,document.head.appendChild(y)}}function Te(m){return m==="subjekt"?[{text:"Her er en mand. [blank_0] hedder Peter.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Mikael er lærer. [blank_0] bor i Aarhus.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Min far er gammel. [blank_0] er 80 år.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Drengen leger. [blank_0] er glad.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]}]:m==="objekt"?[{text:"Jeg ser en mand. Jeg ser [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]},{text:"Peter er her. Jeg ringer til [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]},{text:"Mikael er træt. Vi hjælper [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]}]:m==="possessiv"?[{text:"Her er Peter. [blank_0] bil er rød.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]},{text:"Mikael har en hund. [blank_0] hund er stor.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]},{text:"Min far er her. [blank_0] hus er gammelt.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]}]:[]}function je(m,d){const e=document.createElement("div");e.className="view-container grounding-view";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("dagens_opgave"),a.appendChild(n),e.appendChild(a);const g=document.createElement("h1");g.textContent=t("howToBuildSentence");const s=document.createElement("p");s.className="subtitle",s.textContent=t("howToBuildSentenceDesc"),e.appendChild(g),e.appendChild(s);const o=document.createElement("div");o.className="intro-area",o.innerHTML=`
        <div class="illustration-container">
            <img src="${G}images/grounding_balloon_child.png" alt="Balloon and Anchor" class="grounding-img">
        </div>
        <p class="grounding-text">${t("groundingIntro")}</p>
    `,e.appendChild(o);const l=document.createElement("div");l.className="exercise-container",e.appendChild(l);let r={step:1,nounAnchor:"",verbAnchor:"",sentenceParts:[]};function c(){l.innerHTML="",r.step===1?p():r.step===2?i():r.step===3&&u()}function p(){const h=document.createElement("div");h.className="step-content",h.innerHTML=`
            <h3>${t("groundingStep1")}</h3>
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
        `,l.appendChild(h);const f=h.querySelector("#noun-select");f.onchange=()=>{f.value&&(r.nounAnchor=f.value,r.step=2,setTimeout(c,1e3))}}function i(){const h=document.createElement("div");h.className="step-content",h.innerHTML=`
            <h3>${t("groundingStep2")}</h3>
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
        `,l.appendChild(h);const f=h.querySelector("#verb-select");f.onchange=()=>{f.value&&(r.verbAnchor=f.value,r.step=3,setTimeout(c,1e3))}}function u(){const h=document.createElement("div");h.className="step-content",h.innerHTML=`
            <h3>${t("groundingStep3")}</h3>
            <p>Træk ordene ned på jorden for at bygge din sætning.</p>
            
            <div class="drag-source" id="source">
                <div class="drag-item" draggable="true" data-word="${r.nounAnchor}">${r.nounAnchor}</div>
                <div class="drag-item" draggable="true" data-word="barn">barn</div>
                <div class="drag-item" draggable="true" data-word="${r.verbAnchor}">${r.verbAnchor}</div>
            </div>

            <div class="drop-zone-container">
                <p class="ground-label">${t("sentenceGround")}</p>
                <div class="drop-zone" id="ground"></div>
            </div>

            <div class="controls">
                <button class="gemini-btn" id="check-btn">${t("checkResult")}</button>
            </div>
            <div class="exercise-feedback" id="step-feedback"></div>
        `,l.appendChild(h);const f=h.querySelectorAll(".drag-item"),T=h.querySelector("#ground"),E=h.querySelector("#source");f.forEach(y=>{y.ondragstart=C=>{C.dataTransfer.setData("text/plain",y.dataset.word),y.classList.add("dragging")},y.ondragend=()=>y.classList.remove("dragging")}),T.ondragover=y=>y.preventDefault(),T.ondrop=y=>{y.preventDefault();const C=y.dataTransfer.getData("text/plain"),v=E.querySelector(`.drag-item[data-word="${C}"]`)||T.querySelector(`.drag-item[data-word="${C}"]`);if(v){const N=D(T,y.clientX);N==null?T.appendChild(v):T.insertBefore(v,N)}};function D(y,C){return[...y.querySelectorAll(".drag-item:not(.dragging)")].reduce((N,S)=>{const H=S.getBoundingClientRect(),B=C-H.left-H.width/2;return B<0&&B>N.offset?{offset:B,element:S}:N},{offset:Number.NEGATIVE_INFINITY}).element}E.ondragover=y=>y.preventDefault(),E.ondrop=y=>{y.preventDefault();const C=document.querySelector(".drag-item.dragging");C&&E.appendChild(C)};const x=h.querySelector("#check-btn"),w=h.querySelector("#step-feedback");x.onclick=()=>{const y=Array.from(T.children).map(v=>v.dataset.word).join(" "),C=`${r.nounAnchor} barn ${r.verbAnchor}`.toLowerCase();y.toLowerCase()===C?(w.textContent="Flot! Se animationen nedenfor.",w.className="exercise-feedback success-text",w.style.display="block",x.disabled=!0,b(h,()=>{k(h),setTimeout(()=>{j(h)},5500)})):(w.textContent=t("wrongOrder"),w.className="exercise-feedback",w.style.display="block")}}function b(h,f){let T=h.querySelector(".focus-container");T||(T=document.createElement("div"),T.className="focus-container animate-in",h.appendChild(T));const E=r.nounAnchor.toLowerCase();let D="",x="";E==="mit"?(x="Mit barn (relation)",D=`
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
            `):E==="et"?(x="Et barn (ubestemt)",D=`
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
            `):E==="det"?(x="Det barn (udpegning)",D=`
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
            `):E==="dette"&&(x="Dette barn (nærhed)",D=`
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
            `),T.innerHTML=`
            <div class="focus-wrapper">
                <h3>${x}</h3>
                ${D}
            </div>
        `,setTimeout(()=>{T.scrollIntoView({behavior:"smooth",block:"center"})},300),setTimeout(f,5e3)}function k(h){const f=h.querySelector(".focus-container");f&&(f.style.opacity="0.3",f.style.transition="opacity 0.5s");let T=h.querySelector(".timeline-container");T||(T=document.createElement("div"),T.className="timeline-container animate-in",h.appendChild(T)),T.innerHTML=`
            <div class="timeline-wrapper">
                <div class="timeline-line"></div>
                <div class="timeline-points">
                    <div class="time-point" data-tense="past">Datid</div>
                    <div class="time-point" data-tense="present">Nutid</div>
                    <div class="time-point" data-tense="future">Fremtid</div>
                </div>
                <div class="timeline-pointer" id="timeline-pointer">📍</div>
            </div>
        `,setTimeout(()=>{T.scrollIntoView({behavior:"smooth",block:"center"})},300);const E=T.querySelector("#timeline-pointer");let D="50%";r.verbAnchor==="spiste"&&(D="15%"),r.verbAnchor==="skal spise"&&(D="85%"),setTimeout(()=>{E.style.left=D,E.classList.add("bouncing")},100)}function j(h){let f=h.querySelector(".final-completion-container");f||(f=document.createElement("div"),f.className="final-completion-container animate-in",h.appendChild(f)),f.innerHTML=`
            <div class="completion-box">
                <div class="success-icon">✨</div>
                <p class="success-msg">Flot! Du har nu bygget en sætning, der er forankret i virkeligheden.</p>
                <div class="example-box">
                    <span class="example-label">Sætning:</span>
                    <span class="example-text">${r.nounAnchor} barn ${r.verbAnchor}.</span>
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
        `,f.querySelector("#finish-btn").onclick=()=>d("dagens_opgave"),f.querySelector("#start-modal").onclick=()=>d("modal_force",r),f.querySelector("#rec-bestemthed").onclick=()=>d("bestemthed"),f.querySelector("#rec-pronomen").onclick=()=>d("pronomen"),f.querySelector("#rec-verber").onclick=()=>d("verbum_learning",{categoryId:"datid"}),setTimeout(()=>{f.scrollIntoView({behavior:"smooth",block:"center"})},100)}if(c(),!document.getElementById("grounding-styles")){const h=document.createElement("style");h.id="grounding-styles",h.textContent=`
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
                font-size: 1.2rem;
                text-align: center;
                max-width: 600px;
                margin: 0 auto 2rem;
                line-height: 1.6;
                opacity: 0.9;
            }
            .step-content {
                background: rgba(255, 255, 255, 0.05);
                padding: 2.5rem;
                border-radius: 24px;
                text-align: center;
                animation: fadeIn 0.5s ease;
            }
            .grounding-interaction {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.5rem;
                margin: 2rem 0;
            }
            .word-bubble {
                background: var(--bg-deep-red);
                padding: 1rem 2rem;
                border-radius: 50px;
                font-weight: 700;
                font-size: 1.5rem;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            .arrow {
                font-size: 2rem;
                opacity: 0.5;
            }
            .drag-source {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin: 2rem 0;
                min-height: 60px;
                padding: 1rem;
                background: rgba(255,255,255,0.03);
                border-radius: 12px;
            }
            .drag-item {
                background: rgba(255, 255, 255, 0.1);
                padding: 0.8rem 1.5rem;
                border-radius: 12px;
                cursor: grab;
                font-size: 1.2rem;
                border: 1px solid rgba(255,255,255,0.1);
                transition: transform 0.2s;
            }
            .drag-item:active { cursor: grabbing; }
            .drag-item.dragging { opacity: 0.5; }
            
            .drop-zone-container {
                margin: 3rem 0;
                position: relative;
            }
            .drop-zone {
                min-height: 80px;
                background: rgba(0, 0, 0, 0.2);
                border: 2px dashed rgba(255, 255, 255, 0.2);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 1rem;
            }
            .ground-label {
                position: absolute;
                bottom: -25px;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.5;
            }
            .final-sentence {
                font-size: 2rem;
                font-weight: 700;
                color: var(--text-light);
                margin: 2rem 0;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .success-text {
                color: #4CAF50 !important;
                font-weight: 700;
                font-size: 1.5rem;
            }
            
            /* Timeline Styles */
            .timeline-container {
                margin-top: 3rem;
                padding: 2rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .timeline-wrapper {
                position: relative;
                padding: 40px 0;
                width: 80%;
                margin: 0 auto;
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
        `,document.head.appendChild(h)}m.appendChild(e)}const U=[{id:"hjaelpe",title:"Hjælpeverber",verbs:["kan","skal","vil","må","bør"],exercises:[{title:"Modalverber - Sæt 1",instruction:"Vælg det rigtige hjælpeverbum.",segments:[{type:"text",content:"1. **[I can speak Danish]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"kan",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" tale dansk.\\n\\n2. **[I must go now]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"skal",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" gå nu.\\n\\n3. **[I want to buy a cake]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"vil",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" gerne købe en kage.\\n\\n4. **[May I sit here?]**\\nDansk: "},{type:"gap",id:3,correct:"Må",options:["Må","Skal","Kan","Vil","Bør"],explanation:"hintAction"},{type:"text",content:" jeg sidde her?\\n\\n5. **[You should read this]**\\nDansk: Du "},{type:"gap",id:4,correct:"bør",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" læse denne bog."}],phase2_tasks:[{correct:"kan",definition:"Når man har evnen eller muligheden for at gøre noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Kan' udtrykker evne."},{correct:"skal",definition:"Når man er nødt til at gøre noget, eller har en plan.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Skal' udtrykker nødvendighed."},{correct:"vil",definition:"Når man har et ønske eller en lyst til noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Vil' udtrykker ønske."},{correct:"må",definition:"Når man har tilladelse til noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Må' udtrykker tilladelse."},{correct:"bør",definition:"Når noget er en god idé eller moralsk rigtigt.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Bør' udtrykker anbefaling."}]}]},{id:"tilstand",title:"Tilstand og navne",verbs:["er","har","bor","hedder","bliver"],exercises:[{title:"Hvem er jeg? - Sæt 1",instruction:"Vælg det rigtige verbum om din tilstand.",segments:[{type:"text",content:"1. **[I am happy]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"er",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" glad.\\n\\n2. **[I have a dog]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"har",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" en hund.\\n\\n3. **[I live in Aarhus]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"bor",options:["er","har","bor","hedder","bliver"],explanation:"hintPlace"},{type:"text",content:" i Aarhus.\\n\\n4. **[My name is Peter]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"hedder",options:["er","har","bor","hedder","bliver"],explanation:"hintName"},{type:"text",content:" Peter.\\n\\n5. **[I am becoming a doctor]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"bliver",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" læge næste år."}],phase2_tasks:[{correct:"er",definition:"Bruges til at identificere sig selv eller sin tilstand.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"har",definition:"Når man ejer noget.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"bor",definition:"Når man har sit hjem et bestemt sted.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"hedder",definition:"Bruges når man fortæller sit navn.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"bliver",definition:"Når man ændrer sig til noget nyt.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"}]}]},{id:"bevaegelse",title:"Bevægelse",verbs:["går","kører","rejser","falder","stiger"],exercises:[{title:"På farten - Sæt 1",instruction:"Vælg det rigtige verbum om bevægelse.",segments:[{type:"text",content:"1. **[I walk to school]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"går",options:["går","kører","rejser","falder","stiger"],explanation:"hintAction"},{type:"text",content:" til skole.\\n\\n2. **[I drive a car]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"kører",options:["går","kører","rejser","falder","stiger"],explanation:"hintAction"},{type:"text",content:" i bil.\\n\\n3. **[I travel to Spain]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"rejser",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" til Spanien i sommerferien.\\n\\n4. **[The apple falls from the tree]**\\nDansk: Æblet "},{type:"gap",id:3,correct:"falder",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" ned fra træet.\\n\\n5. **[The price increases]**\\nDansk: Prisen "},{type:"gap",id:4,correct:"stiger",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" hver måned."}],phase2_tasks:[{correct:"går",definition:"At flytte sig ved brug af benene.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"kører",definition:"At transportere sig i et køretøj som bil eller bus.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"rejser",definition:"At tage på en længere tur til et andet sted eller land.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"falder",definition:"At bevæge sig hurtigt mod jorden ved et uheld eller tyngdekraft.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"stiger",definition:"At bevæge sig opad eller blive højere (f.eks. priser).",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"}]}]},{id:"interaktion",title:"Sprog og kommunikation",verbs:["siger","taler","svarer","spørger","fortæller"],exercises:[{title:"Samtale - Sæt 1",instruction:"Vælg det rigtige verbum om kommunikation.",segments:[{type:"text",content:"1. **[What do you say?]**\\nDansk: Hvad "},{type:"gap",id:0,correct:"siger",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" du?\\n\\n2. **[I speak Danish]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"taler",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" dansk.\\n\\n3. **[I answer the letter]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"svarer",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" på brevet.\\n\\n4. **[I ask a question]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"spørger",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" om vej.\\n\\n5. **[I tell a story]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"fortæller",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" en god historie."}],phase2_tasks:[{correct:"siger",definition:"At bruge ord til at udtrykke noget.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"taler",definition:"At bruge stemmen og et bestemt sprog.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"svarer",definition:"At give respons på et spørgsmål eller brev.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"spørger",definition:"Når man vil have information fra en anden person.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"fortæller",definition:"At give en længere forklaring eller beretning om noget.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"}]}]},{id:"indre_liv",title:"Tanker og følelser",verbs:["ved","tror","mener","tænker","synes"],exercises:[{title:"Indre liv - Sæt 1",instruction:"Vælg det rigtige verbum om dine tanker.",segments:[{type:"text",content:"1. **[I know it]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"ved",options:["ved","tror","mener","tænker","synes"],explanation:"hintAction"},{type:"text",content:" det godt.\\n\\n2. **[I believe in it]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"tror",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" på dig.\\n\\n3. **[What is your opinion?]**\\nDansk: Hvad "},{type:"gap",id:2,correct:"mener",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" du om det?\\n\\n4. **[I am thinking about you]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tænker",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" på dig.\\n\\n5. **[I think (opinion) it's fun]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"synes",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" det er sjovt."}],phase2_tasks:[{correct:"ved",definition:"Når man har faktuel information om noget.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"tror",definition:"Når man antager noget eller har en religiøs overbevisning.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"mener",definition:"Når man har en holdning eller vil udtrykke en betydning.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"tænker",definition:"Den generelle proces der foregår i hovedet.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"synes",definition:"Når man har en personlig, følelsesmæssig holdning eller smag.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"}]}]},{id:"handling",title:"Handling og præstation",verbs:["laver","gør","bruger","tager","finder"],exercises:[{title:"I gang - Sæt 1",instruction:"Vælg det rigtige verbum om handlinger.",segments:[{type:"text",content:"1. **[I am doing my homework]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"laver",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" lektier.\\n\\n2. **[I do my best]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"gør",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" mit bedste.\\n\\n3. **[I use a computer]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"bruger",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" en computer.\\n\\n4. **[I take the bus]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tager",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" bussen.\\n\\n5. **[I find my keys]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"finder",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" mine nøgler."}],phase2_tasks:[{correct:"laver",definition:"At producere eller udføre noget (især lektier eller mad).",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"gør",definition:"At udføre en handling (især abstrakte ting som 'sit bedste').",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"bruger",definition:"At anvende et redskab eller en ressource.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"tager",definition:"At fatte om noget eller vælge en transportmulighed.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"finder",definition:"At opdage noget man leder efter.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"}]}]},{id:"datid",title:"Verber i Datid",verbs:["så","gik","kom","tog","spiste"],exercises:[{title:"I går - Sæt 1",instruction:"Vælg det rigtige verbum i datid.",segments:[{type:"text",content:"1. **[Yesterday I saw a movie]**\\nDansk: I går "},{type:"gap",id:0,correct:"så",options:["så","ser","seet","tog","gik"],explanation:"hintContext"},{type:"text",content:" jeg en god film.\\n\\n2. **[We walked to the party]**\\nDansk: Vi "},{type:"gap",id:1,correct:"gik",options:["så","gik","går","gået","kom"],explanation:"hintContext"},{type:"text",content:" til fest i lørdags.\\n\\n3. **[He came late this morning]**\\nDansk: Han "},{type:"gap",id:2,correct:"kom",options:["kom","kommer","kommet","så","tog"],explanation:"hintContext"},{type:"text",content:" for sent i morges.\\n\\n4. **[I took a cake with me]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tog",options:["tog","tager","taget","så","gik"],explanation:"hintContext"},{type:"text",content:" en kage med i går.\\n\\n5. **[We ate dinner at 18]**\\nDansk: Vi "},{type:"gap",id:4,correct:"spiste",options:["spiser","spist","spiste","kom","tog"],explanation:"hintContext"},{type:"text",content:" aftensmad klokken 18 i går."}],phase2_tasks:[{correct:"så",definition:"At have set noget i fortiden (datid af 'se').",options:["så","ser","seet","tog","gik"],explanation:"Korrekt!"},{correct:"gik",definition:"At have gået et sted hen i fortiden (datid af 'gå').",options:["så","gik","går","gået","kom"],explanation:"Korrekt!"},{correct:"kom",definition:"At være ankommet i fortiden (datid af 'komme').",options:["kom","kommer","kommet","så","tog"],explanation:"Korrekt!"},{correct:"tog",definition:"At have taget noget i fortiden (datid af 'tage').",options:["tog","tager","taget","så","gik"],explanation:"Korrekt!"},{correct:"spiste",definition:"At have indtaget mad i fortiden (datid af 'spise').",options:["spiser","spist","spiste","kom","tog"],explanation:"Korrekt!"}]}]},{id:"tider",title:"Datid eller førnutid?",verbs:["var","har været","kom","er kommet","drak","har drukket"],exercises:[{title:"Tidspunkter - Sæt 1",instruction:"Husk: Punktet (datid) er et bestemt tidspunkt. Broen (førnutid) forbinder fortid og nu.",segments:[{type:"text",content:"1. **[I was in the cinema yesterday]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"var",options:["var","har været"],explanation:"hintContext"},{type:"text",content:" i biografen i går.\\n\\n2. **[I have been in the cinema many times]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"har været",options:["var","har været"],explanation:"hintContext"},{type:"text",content:" i biografen mange gange.\\n\\n3. **[In 2010 he came to Denmark]**\\nDansk: I 2010 "},{type:"gap",id:2,correct:"kom",options:["kom","er kommet"],explanation:"hintContext"},{type:"text",content:" han til Danmark.\\n\\n4. **[He has just come to Denmark]**\\nDansk: Han "},{type:"gap",id:3,correct:"er kommet",options:["kom","er kommet"],explanation:"hintContext"},{type:"text",content:" lige til Danmark.\\n\\n5. **[We drank coffee an hour ago]**\\nDansk: Vi "},{type:"gap",id:4,correct:"drak",options:["drak","har drukket"],explanation:"hintContext"},{type:"text",content:" kaffe for en time siden."}],phase2_tasks:[{correct:"var",definition:"Bruges om en tilstand på et bestemt tidspunkt i fortiden.",options:["var","har været"],explanation:"Korrekt!"},{correct:"har været",definition:"Bruges når vi ser på erfaringen frem til nu.",options:["var","har været"],explanation:"Korrekt!"},{correct:"kom",definition:"Bruges om ankomst på et bestemt årstal eller tidspunkt.",options:["kom","er kommet"],explanation:"Korrekt!"},{correct:"er kommet",definition:"Bruges når handlingen lige er sket og er vigtig nu.",options:["kom","er kommet"],explanation:"Korrekt!"},{correct:"drak",definition:"Bruges om kaffedrikning på et bestemt tidspunkt i fortiden.",options:["drak","har drukket"],explanation:"Korrekt!"}]}]}];class Ne{constructor(d,e=null){this.navigateFn=d,this.currentCategoryIndex=e?U.findIndex(a=>a.id===e):0,this.currentCategoryIndex===-1&&(this.currentCategoryIndex=0),this.currentExerciseIndex=0,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={}}render(){const d=document.createElement("div");d.className="verbum-learning-view view-container";const e=U[this.currentCategoryIndex];if(!e)return d;const a=e.exercises[this.currentExerciseIndex];if(!a)return d;const n=localStorage.getItem("appLang")||"da",g=s=>F[n]?.[s]||F.da?.[s]||s;return d.innerHTML=`
      <div class="top-bar">
        <button class="back-btn" id="back-to-main">← ${t("back")}</button>
      </div>
      <h1>${e.title}</h1>
      
      <div class="exercise-card">
        <img src="${G}verber_kategorier.png" class="category-illustration" alt="Category Illustration">
        
        <div class="exercise-header">
          <h2 style="text-align: center;">${a.title}</h2>
          <p class="subtitle" style="text-align: center;">${this.currentPhase===1?a.instruction:g("phase2_instruction")||"Gæt verbet ud fra definitionen."}</p>
        </div>

        <div class="grammatik-text-container" id="exercise-content">
          ${this.currentPhase===1?this.renderPhase1(a):this.renderPhase2(a)}
        </div>

        <div class="exercise-feedback" id="exercise-feedback"></div>

        <div class="grammatik-summary" id="grammatik-summary">
          ${this.getSummaryText(a)}
        </div>

        <div class="game-controls">
          <button class="gemini-btn" id="check-answers">${t("checkAnswers")}</button>
          ${this.renderFooterButtons(e)}
        </div>
      </div>
`,this.attachEventListeners(d),this.ensureStyles(),d}getSummaryText(d){const a=(this.currentPhase===1?d.segments.filter(g=>g.type==="gap"):d.phase2_tasks).length,n=Object.values(this.feedback).filter(g=>g==="correct").length;return n===0?"":n===a?`<span class="success">${t("allCorrect")}</span>`:`${n} / ${a} ${t("filled")||"korrekte"}`}renderPhase1(d){return d.segments.map(e=>{if(e.type==="text")return`<span class="text-part">${e.content.replace(/\\n/g,"<br>")}</span>`;if(e.type==="gap"){const a=this.feedback[e.id]==="correct",n=this.feedback[e.id]==="wrong";return`
          <span class="select-wrapper">
            <div class="select-hint ${this.showHints[e.id]?"visible":""}">
                ${t(e.explanation||"hintContext")}
            </div>
            <select class="grammatik-select ${a?"correct":""} ${n?"wrong":""}" data-id="${e.id}" ${a?"disabled":""}>
              <option value="">...</option>
              ${e.options.map(s=>`<option value="${s}" ${this.answers[e.id]===s?"selected":""}>${s}</option>`).join("")}
            </select>
          </span>
        `}}).join("")}renderPhase2(d){return d.phase2_tasks.map((e,a)=>{const n=`phase2-${a}`,g=this.feedback[n]==="correct",s=this.feedback[n]==="wrong",o=this.showHints[n];return`
        <div class="phase2-item" style="margin-bottom: 2rem; text-align: left;">
          <p class="definition"><strong>${a+1}.</strong> ${e.definition}</p>
          <span class="select-wrapper">
            <div class="select-hint ${o?"visible":""}">
                ${e.explanation||"Prøv igen!"}
            </div>
            <select class="grammatik-select ${g?"correct":""} ${s?"wrong":""}" data-task-id="${n}" ${g?"disabled":""}>
              <option value="">...</option>
              ${e.options.map(l=>`<option value="${l}" ${this.answers[n]===l?"selected":""}>${l}</option>`).join("")}
            </select>
          </span>
        </div>
      `}).join("")}renderFooterButtons(d){const e=d.exercises[this.currentExerciseIndex],a=this.currentPhase===1?e.segments.filter(o=>o.type==="gap").length:e.phase2_tasks.length;if(!(Object.values(this.feedback).filter(o=>o==="correct").length===a))return"";const s=this.currentExerciseIndex===d.exercises.length-1;return this.currentPhase===1?'<button class="gemini-btn" id="next-phase">Næste fase →</button>':s?'<button class="gemini-btn" id="next-category">Næste kategori →</button>':'<button class="gemini-btn" id="next-exercise">Næste opgave →</button>'}attachEventListeners(d){d.querySelector("#back-to-main").onclick=()=>{this.navigateFn("main")},d.querySelectorAll(".grammatik-select").forEach(s=>{s.onchange=o=>{const l=o.target.dataset.id||o.target.dataset.taskId;this.answers[l]=o.target.value,delete this.feedback[l],this.showHints[l]=!1,this.updateView()}});const e=d.querySelector("#check-answers");if(e){e.onclick=()=>{const r=U[this.currentCategoryIndex].exercises[this.currentExerciseIndex];let c=!0,p="";this.currentPhase===1?r.segments.forEach(u=>{u.type==="gap"&&(this.answers[u.id]===u.correct?this.feedback[u.id]="correct":(this.feedback[u.id]="wrong",p||(p=t(u.explanation||"hintAction")),c=!1))}):r.phase2_tasks.forEach((u,b)=>{const k=`phase2-${b}`;this.answers[k]===u.correct?this.feedback[k]="correct":(this.feedback[k]="wrong",p||(p=u.explanation||t("hintAction")),c=!1)});const i=d.querySelector("#exercise-feedback");c?i.style.display="none":(i.textContent=p,i.style.display="block"),this.updateView()};const s=U[this.currentCategoryIndex].exercises[this.currentExerciseIndex],o=this.currentPhase===1?s.segments.filter(r=>r.type==="gap").length:s.phase2_tasks.length;Object.values(this.feedback).filter(r=>r==="correct").length===o&&(e.style.display="none")}const a=d.querySelector("#next-phase");a&&(a.onclick=()=>{this.currentPhase=2,this.answers={},this.feedback={},this.showHints={},this.updateView()});const n=d.querySelector("#next-exercise");n&&(n.onclick=()=>{this.currentExerciseIndex++,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={},this.updateView()});const g=d.querySelector("#next-category");g&&(g.onclick=()=>{this.currentCategoryIndex++,this.currentExerciseIndex=0,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={},this.updateView()})}updateView(){const d=document.querySelector(".verbum-learning-view");if(d){const e=this.render();d.replaceWith(e)}}}function Ae(m,d){const e=document.createElement("div");e.className="view-container bestemthed-view";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("grounding"),a.appendChild(n),e.appendChild(a);const g=document.createElement("h1");g.textContent="Bestemthed - En eller Et?";const s=document.createElement("p");s.className="subtitle",s.textContent="Lær at vælge det rigtige kendeord (artikel) til navneord.",e.appendChild(g),e.appendChild(s);const o=document.createElement("div");o.className="exercise-container",e.appendChild(o);const l=[{word:"bil",correct:"en",icon:"🚗"},{word:"hus",correct:"et",icon:"🏠"},{word:"barn",correct:"et",icon:"👶"},{word:"kop",correct:"en",icon:"☕"},{word:"æble",correct:"et",icon:"🍎"},{word:"stol",correct:"en",icon:"🪑"}];let r=0,c=0;function p(){if(o.innerHTML="",r>=l.length){i();return}const u=l[r],b=document.createElement("div");b.className="step-content animate-in",b.innerHTML=`
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
                    <div class="object-bubble">${u.icon}</div>
                </div>
            </div>
            <h3>Hvad hedder det?</h3>
            <div class="word-display">____ ${u.word}</div>
            <div class="options-grid">
                <button class="option-btn" data-val="en">En</button>
                <button class="option-btn" data-val="et">Et</button>
            </div>
            <div class="feedback-area" id="feedback"></div>
        `,o.appendChild(b),b.querySelectorAll(".option-btn").forEach(k=>{k.onclick=()=>{const j=k.dataset.val,h=b.querySelector("#feedback");j===u.correct?(h.textContent="Korrekt! ✅",h.className="feedback-area success",c++,k.classList.add("correct"),setTimeout(()=>{r++,p()},1e3)):(h.textContent="Prøv igen! ❌",h.className="feedback-area error",k.classList.add("wrong"))}})}function i(){o.innerHTML=`
            <div class="step-content final-step animate-in">
                <div class="success-icon">🎉</div>
                <h2>Flot gået!</h2>
                <p>Du fik ${c} ud af ${l.length} rigtige.</p>
                <button class="gemini-btn" id="finish-btn">Tilbage til Grounding</button>
            </div>
        `,o.querySelector("#finish-btn").onclick=()=>d("grounding")}if(p(),!document.getElementById("bestemthed-styles")){const u=document.createElement("style");u.id="bestemthed-styles",u.textContent=`
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
            .options-grid {
                display: flex;
                gap: 1.5rem;
                justify-content: center;
                margin-bottom: 2rem;
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
            .option-btn:hover { background: rgba(255,255,255,0.2); }
            .option-btn.correct { background: #4CAF50; border-color: #4CAF50; }
            .option-btn.wrong { background: #F44336; border-color: #F44336; }
            
            .feedback-area {
                height: 30px;
                font-size: 1.2rem;
                font-weight: 600;
                margin-top: 1rem;
            }
            .feedback-area.success { color: #4CAF50; }
            .feedback-area.error { color: #F44336; }
        `,document.head.appendChild(u)}m.appendChild(e)}function Se(m,d,e={}){const a=document.createElement("div");a.className="view-container modal-force-view";const n={nounAnchor:e.nounAnchor||"Et",verbAnchor:(e.verbAnchor||"spiser").replace(" (nu)","").replace(" (i går)","").replace(" (senere)",""),selectedModal:e.selectedModal||""},g=document.createElement("div");g.className="top-bar";const s=document.createElement("button");s.className="back-btn",s.textContent="← "+t("back"),s.onclick=()=>d("grounding"),g.appendChild(s),a.appendChild(g);const o=document.createElement("h1");o.textContent="Modalverber: den usynlige kraft";const l=document.createElement("p");l.className="subtitle",l.textContent='Modalverber ændrer ikke handlingen, men de ændrer "kraften" bag den.',a.appendChild(o),a.appendChild(l);const r=document.createElement("div");r.className="exercise-container",a.appendChild(r);function c(){r.innerHTML=`
            <div id="force-section" class="step-content animate-in">
                <div class="force-visualization" id="force-viz">
                    <div class="viz-placeholder">Vælg et modalverbum for at se kraften</div>
                </div>

                <div class="modal-interaction">
                    <span class="sentence-part">${n.nounAnchor} barn</span>
                    <select class="grammatik-select modal-select" id="modal-select">
                        <option value="">???</option>
                        <option value="skal">skal (tvang/plan)</option>
                        <option value="må">må (tilladelse)</option>
                        <option value="vil">vil (ønske)</option>
                        <option value="kan">kan (evne/sandsynlighed)</option>
                    </select>
                    <span class="sentence-part">spise</span>
                </div>

                <div class="force-explanation" id="force-expl"></div>
                
                <div class="navigation-controls" style="margin-top: 2rem; ${n.selectedModal?"":"display: none;"}" id="nav-controls">
                    <button class="gemini-btn spotlight-btn" id="next-step-btn">Hvorfor bøjer vi kun det første ord? ↓</button>
                </div>
            </div>

            <div id="finiteness-section" class="step-content animate-in" style="display: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 3rem; margin-top: 3rem;">
                <h2 style="margin-top: 0;">${t("finitenessTitle")}</h2>
                <p class="subtitle" style="margin-bottom: 2rem;">${t("finitenessDesc")}</p>

                <div class="finiteness-visual timeline-layout">
                    <div class="finiteness-box timeline-box" id="timeline-box">
                        <div class="label">${t("timelineLabel")}</div>
                        <div class="svg-container" id="timeline-svg"></div>
                        <div class="word-anchor">
                            <div class="word-display" id="modal-word-marker">${n.selectedModal||"skal"}</div>
                        </div>
                        <div class="time-toggle">
                            <button class="toggle-btn" data-time="da">${t("pastLabel")}</button>
                            <button class="toggle-btn active" data-time="nu">${t("nowLabel")}</button>
                        </div>
                    </div>

                    <div class="finiteness-box action-box" id="action-box">
                        <div class="label">${t("actionLabel")}</div>
                        <div class="svg-container" id="photo-svg"></div>
                        <div class="word-display static-word" id="action-word-static">spise</div>
                    </div>
                </div>

                <div class="force-explanation visible" id="finiteness-expl">
                    ${t("finitenessExpl")}
                </div>

                <div id="teaser-section" class="recommendation-box animate-in" style="margin-top: 4rem; display: none; text-align: center;">
                    <h4 style="font-size: 1.5rem; margin-bottom: 1.5rem;">${t("adjectiveTitle")}</h4>
                    <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">
                        ${t("adjectiveTeaser")}
                    </p>
                    <button class="gemini-btn spotlight-btn" id="go-to-adj-btn">
                        ${t("nextStepAdjective")}
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
        `;const u=r.querySelector("#modal-select"),b=r.querySelector("#force-viz"),k=r.querySelector("#force-expl"),j=r.querySelector("#nav-controls"),h=r.querySelector("#next-step-btn"),f=r.querySelector("#teaser-section"),T=r.querySelector("#go-to-adj-btn"),E=r.querySelector("#finish-btn"),D=r.querySelector("#rec-hjaelpe");n.selectedModal&&(u.value=n.selectedModal,i(n.selectedModal,b,k)),u.onchange=()=>{const x=u.value;if(n.selectedModal=x,i(x,b,k),x){j.style.display="block";const w=r.querySelector("#modal-word-marker");w&&(w.textContent=x)}},h.onclick=()=>{const x=r.querySelector("#finiteness-section");x.style.display="block",p(),h.style.display="none",setTimeout(()=>{x.scrollIntoView({behavior:"smooth",block:"start"})},50),setTimeout(()=>{f.style.display="block"},1500)},T.onclick=()=>d("adjective_bridge",{nounAnchor:n.nounAnchor,selectedModal:n.selectedModal}),E.onclick=()=>d("dagens_opgave"),D.onclick=()=>d("verbum_learning",{categoryId:"hjaelpe"})}function p(){const u=r.querySelector("#timeline-svg"),b=r.querySelector("#photo-svg"),k=r.querySelector("#modal-word-marker"),j=r.querySelectorAll(".toggle-btn"),h=r.querySelector("#action-word-static");u.innerHTML=`
            <svg viewBox="0 0 400 100" class="timeline-svg-main">
                <line x1="50" y1="50" x2="350" y2="50" stroke="rgba(255,255,255,0.2)" stroke-width="4" stroke-linecap="round" />
                <circle cx="100" cy="50" r="6" fill="#666" />
                <circle cx="300" cy="50" r="6" fill="#666" />
                <circle id="moving-dot" cx="300" cy="50" r="10" fill="var(--bg-deep-red)" style="transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);" />
            </svg>
        `,b.innerHTML=`
            <svg viewBox="0 0 160 160" class="activity-svg">
                <path d="M 40 80 Q 20 80 20 60 Q 20 30 50 30 Q 60 10 90 10 Q 130 10 130 40 Q 150 40 150 70 Q 150 100 120 100 L 40 100 Z" 
                      fill="rgba(76, 175, 80, 0.1)" stroke="#4caf50" stroke-width="2" />
            </svg>
        `,j.forEach(f=>{f.onclick=()=>{j.forEach(x=>x.classList.remove("active")),f.classList.add("active");const T=f.dataset.time,E=n.selectedModal||"skal",D=r.querySelector("#moving-dot");if(T==="da"){D.setAttribute("cx","100");const x={skal:"skulle",må:"måtte",vil:"ville",kan:"kunne"};k.textContent=x[E]||E,k.style.color="#ff9800",k.classList.add("shift-past")}else D.setAttribute("cx","300"),k.textContent=E,k.style.color="white",k.classList.remove("shift-past");h.classList.add("action-pulse"),setTimeout(()=>h.classList.remove("action-pulse"),800)}})}function i(u,b,k){b.innerHTML="",k.innerHTML="",k.className="force-explanation visible";let j="",h="";const f=`
            <style>
                .viz-svg { width: 100%; max-width: 500px; height: 300px; }
                .stickman { stroke: white; stroke-width: 3; fill: none; }
                .target { fill: #ffeb3b; filter: drop-shadow(0 0 10px rgba(255, 235, 59, 0.5)); }
                .force-line { stroke-width: 4; stroke-linecap: round; fill: none; }
            </style>
        `;u==="skal"?(h="<strong>SKAL (social kraft):</strong> En ydre kraft eller en uundgåelig plan skubber barnet mod handlingen. Der er ingen vej udenom.",j=`
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
            `):u==="må"?(h='<strong>MÅ (fjernelse af barriere):</strong> Vejen er spærret, men modalverbet "må" fjerner barrieren og giver tilladelse.',j=`
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
            `):u==="vil"?(h="<strong>VIL (indre lyst):</strong> Kraften kommer indefra barnet selv. Det er et ønske eller en vilje, der trækker i retning af maden.",j=`
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
            `):u==="kan"&&(h="<strong>KAN (evne/potentiale):</strong> Barnet har energien og evnen til at udføre handlingen. Det er en indre ressource.",j=`
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
            `),b.innerHTML=f+j,k.innerHTML=h}if(c(),!document.getElementById("modal-force-styles")){const u=document.createElement("style");u.id="modal-force-styles",u.textContent=`
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
            .viz-placeholder {
                opacity: 0.4;
                font-style: italic;
            }
            .modal-interaction {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.5rem;
                margin: 2rem 0;
                font-size: 1.8rem;
                font-weight: 700;
            }
            .modal-select {
                font-size: 1.5rem !important;
                padding: 0.5rem 1rem !important;
                background: var(--bg-deep-red) !important;
                border-radius: 12px !important;
                color: white !important;
                border: none !important;
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
            }
            .action-box {
                width: 250px !important;
            }
            .timeline-svg-main {
                width: 100%;
                height: 100px;
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
            #modal-word-marker.shift-past {
                transform: translateX(-100px);
            }
            .activity-svg {
                width: 120px;
                height: 100px;
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
        `,document.head.appendChild(u)}m.appendChild(a)}function Be(m,d,e={}){const a=document.createElement("div");a.className="view-container adjective-bridge-view";const n={nounAnchor:e.nounAnchor||"Et",selectedModal:e.selectedModal||"skal",selectedAdjective:""},g=document.createElement("div");g.className="top-bar";const s=document.createElement("button");s.className="back-btn",s.textContent="← "+t("back"),s.onclick=()=>d("modal_force",{nounAnchor:n.nounAnchor,selectedModal:n.selectedModal}),g.appendChild(s),a.appendChild(g);const o=document.createElement("h1");o.textContent=t("adjectiveTitle");const l=document.createElement("p");l.className="subtitle",l.textContent=t("adjectiveDesc"),a.appendChild(o),a.appendChild(l);const r=document.createElement("div");r.className="exercise-container",a.appendChild(r);function c(){r.innerHTML=`
            <div class="step-content animate-in">
                <div class="adjective-visual">
                    <div class="projector-container">
                        <div class="label">${t("adjectiveLabel")}</div>
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
                    <button class="gemini-btn spotlight-btn" id="next-agreement-btn">Hvorfor bøjer vi adjektiver? ↓</button>
                </div>
            </div>

            <div id="agreement-section" class="step-content animate-in" style="display: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4rem; margin-top: 3rem;">
                <h2 style="margin-top: 0;">${t("agreementTitle")}</h2>
                <p class="subtitle" style="margin-bottom: 3rem;">${t("agreementDesc")}</p>

                <div class="agreement-visual">
                    <div class="magnet-container">
                        <div class="adjective-shape-box" id="adj-shaped">
                            <div class="shape-label">Adjektiv</div>
                            <div class="word-container">
                                <span class="stem">sød</span><span class="suffix" id="adj-suffix"></span>
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
                            <button class="toggle-btn active" data-type="ubestemt">${t("ubestemtLabel")}</button>
                            <button class="toggle-btn" data-type="bestemt">${t("bestemtLabel")}</button>
                        </div>
                        <div class="control-group" style="margin-top: 1rem;">
                            <button class="toggle-btn active" data-word="barn">Barn (Et)</button>
                            <button class="toggle-btn" data-word="bil">Bil (En)</button>
                        </div>
                    </div>
                </div>

                <div class="force-explanation visible" id="agreement-expl-box">
                    ${t("agreementExpl")}
                </div>

                <div class="recommendation-box animate-in" style="margin-top: 4rem;">
                    <div class="rec-title">${t("practiceMoreTitle")}</div>
                    <div class="rec-links">
                        <a href="#" class="rec-link" id="adj-comp-link">
                            <span class="icon">📈</span>
                            ${t("adjectiveComparisonLink")}
                        </a>
                    </div>
                </div>

                <div class="adverb-teaser animate-in" style="margin-top: 5rem; text-align: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 4rem;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem; color: #ffffff;">${t("adverbTeaser")}</h3>
                    <div class="navigation-controls">
                        <button class="gemini-btn spotlight-btn" id="next-adverb-btn">${t("nextStepAdverb")}</button>
                    </div>
                </div>

                <div class="navigation-controls" style="margin-top: 4rem; opacity: 0.5;">
                    <button class="back-btn" id="finish-btn" style="margin: 0 auto;">${t("back")}</button>
                </div>
            </div>
        `;const i=r.querySelector("#adj-projector-svg"),u=r.querySelector("#adj-select"),b=r.querySelector("#adj-expl"),k=r.querySelector("#finish-btn"),j=r.querySelector("#next-agreement-btn");i.innerHTML=`
            <svg viewBox="0 0 200 120" class="projector-svg-main">
                <rect x="20" y="40" width="60" height="40" rx="4" fill="#444" stroke="white" stroke-width="2" />
                <circle cx="40" cy="60" r="12" fill="#333" stroke="white" />
                <!-- Beam -->
                <path id="adj-beam" d="M 80 60 L 180 20 L 180 100 Z" fill="rgba(255, 235, 59, 0.4)" style="transition: all 0.5s ease;" />
                <!-- Highlighted area (Kugle) -->
                <circle id="adj-target-circle" cx="180" cy="60" r="35" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="1" style="transition: all 0.8s ease;" />
            </svg>
        `;const h=[{id:"stor",forms:{en:"stor",et:"stort",def:"store"}},{id:"træt",forms:{en:"træt",et:"træt",def:"trætte"}},{id:"smuk",forms:{en:"smuk",et:"smukt",def:"smukke"}}],T=n.nounAnchor!=="Et"&&n.nounAnchor!=="En"?"def":n.nounAnchor==="Et"?"et":"en";u.innerHTML+=h.map(x=>`<option value="${x.forms[T]}" data-base="${x.id}">${x.forms[T]}</option>`).join(""),u.onchange=()=>{const w=u.options[u.selectedIndex].dataset.base,y=u.value;if(!w)return;n.selectedAdjective=y,b.innerHTML=`
                <div class="agreement-notice">
                    <strong>${n.nounAnchor} ${y} barn...</strong><br>
                    ${t("adjectiveExpl")}
                </div>
            `,b.className="force-explanation visible";const C=r.querySelector("#adj-beam"),v=r.querySelector("#adj-target-circle"),S={stor:{beam:"rgba(76, 175, 80, 0.5)",circle:"rgba(76, 175, 80, 0.4)"},træt:{beam:"rgba(100, 149, 237, 0.5)",circle:"rgba(100, 149, 237, 0.4)"},smuk:{beam:"rgba(255, 105, 180, 0.6)",circle:"rgba(255, 105, 180, 0.5)"}}[w]||{beam:"rgba(255, 255, 255, 0.4)",circle:"rgba(255, 255, 255, 0.2)"};C.style.fill=S.beam,v.style.fill=S.circle,v.setAttribute("r","40"),setTimeout(()=>v.setAttribute("r","35"),500)},k.onclick=()=>d("dagens_opgave");const E=r.querySelector("#adj-comp-link");E.onclick=x=>{x.preventDefault(),d("adjective_comparison")};const D=r.querySelector("#next-adverb-btn");D.onclick=()=>{d("adverb_bridge",{nounAnchor:n.nounAnchor,selectedNoun:n.selectedNoun||"barn",selectedVerb:n.selectedVerb||"spiser",isPlural:n.isPlural||!1})},j.onclick=()=>{const x=r.querySelector("#agreement-section");x.style.display="block",p(),j.style.display="none",setTimeout(()=>{x.scrollIntoView({behavior:"smooth",block:"start"})},50)}}function p(){const i=r.querySelector("#magnet-waves-svg"),u=r.querySelector("#magnet-noun-display"),b=r.querySelector("#adj-suffix"),k=r.querySelector(".stem"),j=r.querySelectorAll(".toggle-btn");let h="barn",f="ubestemt";function T(){const D=f==="bestemt"?"#4caf50":"rgba(255,255,255,0.5)",x=f==="bestemt"?"1.0":"0.4",w=f==="bestemt"?"4":"2";i.innerHTML=`
                <svg viewBox="0 0 200 60" style="width: 100%; height: 60px;">
                    <path d="M 180 10 Q 100 10 20 10" fill="none" stroke="${D}" stroke-width="${w}" opacity="${x}" stroke-dasharray="10,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="15" dur="1s" repeatCount="infinite" />
                    </path>
                    <path d="M 180 30 Q 100 30 20 30" fill="none" stroke="${D}" stroke-width="${parseInt(w)+1}" opacity="${x}">
                        <animate attributeName="d" values="M 180 30 Q 100 30 20 30; M 180 30 Q 100 40 20 30; M 180 30 Q 100 30 20 30" dur="1.5s" repeatCount="infinite" />
                    </path>
                    <path d="M 180 50 Q 100 50 20 50" fill="none" stroke="${D}" stroke-width="${w}" opacity="${x}" stroke-dasharray="10,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="-15" dur="1.2s" repeatCount="infinite" />
                    </path>
                </svg>
            `}function E(){h==="barn"?(u.textContent="Barn",k.textContent="stor",f==="bestemt"?(b.textContent="e",b.classList.add("active")):(b.textContent="t",b.classList.add("active"))):(u.textContent="Bil",k.textContent="hurtig",f==="bestemt"?(b.textContent="e",b.classList.add("active")):(b.textContent="",b.classList.remove("active"))),T()}j.forEach(D=>{D.onclick=()=>{D.parentElement.querySelectorAll(".toggle-btn").forEach(w=>w.classList.remove("active")),D.classList.add("active"),D.dataset.type&&(f=D.dataset.type),D.dataset.word&&(h=D.dataset.word),E()}}),E()}if(c(),!document.getElementById("adj-bridge-styles")){const i=document.createElement("style");i.id="adj-bridge-styles",i.textContent=`
            .adjective-bridge-view .adjective-visual {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4rem;
                margin: 3rem 0;
                flex-wrap: wrap;
            }
            .projector-svg-main {
                width: 200px;
                height: 120px;
            }
            .adj-interaction {
                background: rgba(255,255,255,0.05);
                padding: 2rem;
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.1);
            }
            .sentence-preview {
                font-size: 1.8rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .adj-select {
                font-size: 1.5rem !important;
                padding: 0.4rem 0.8rem !important;
                background: #4caf50 !important;
                border-radius: 10px !important;
            }
            .force-explanation {
                background: rgba(255, 255, 255, 0.08);
                padding: 2.5rem;
                border-radius: 20px;
                line-height: 1.8;
                font-size: 1.2rem;
                text-align: left;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.5s ease;
                margin: 2rem auto;
                max-width: 600px;
                border: 1px solid rgba(255,255,255,0.1);
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
            .force-explanation.visible {
                opacity: 1;
                transform: translateY(0);
            }
            .agreement-notice {
                font-size: 1.25rem;
            }
            .agreement-notice strong {
                color: #4caf50;
                font-size: 1.4rem;
            }

            /* Agreement Interaction Styles */
            .agreement-visual {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 3rem;
                margin: 4rem 0;
            }
            .magnet-container {
                display: flex;
                align-items: center;
                gap: 1rem;
                width: 100%;
                max-width: 600px;
                background: rgba(0,0,0,0.2);
                padding: 3rem 2rem;
                border-radius: 30px;
                position: relative;
                border: 1px solid rgba(255,255,255,0.05);
            }
            .noun-influence-box {
                background: #6b0f1a;
                padding: 1.5rem 2rem;
                border-radius: 16px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 2;
                min-width: 150px;
                border: 1px solid rgba(255,255,255,0.1);
            }
            .magnet-label, .shape-label {
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.6;
                margin-bottom: 0.5rem;
            }
            .magnet-word {
                font-size: 1.8rem;
                font-weight: 800;
            }
            .magnet-waves {
                position: absolute;
                left: 200px;
                right: 170px;
                top: 50%;
                transform: translateY(-50%);
                pointer-events: none;
            }
            .adjective-shape-box {
                background: rgba(255,255,255,0.05);
                padding: 1.5rem 2rem;
                border-radius: 16px;
                border: 2px dashed rgba(255,255,255,0.2);
                min-width: 180px;
                text-align: center;
                transition: all 0.5s ease;
                z-index: 2;
            }
            .word-container {
                font-size: 2.2rem;
                font-weight: 800;
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
            }
            .toggle-btn {
                background: rgba(255, 255, 255, 0.05);
                border: 2px solid rgba(255, 255, 255, 0.1);
                color: var(--text-muted);
                padding: 0.8rem 1.5rem;
                border-radius: 12px;
                font-family: var(--font-family);
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
                font-size: 1.4rem !important;
                font-weight: 800 !important;
                letter-spacing: 0.5px;
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
                padding: 2.5rem;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.1);
            }
            .rec-title {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--text-muted);
                margin-bottom: 1.5rem;
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
                padding: 1.2rem 2rem;
                border-radius: 16px;
                text-decoration: none;
                color: white;
                font-size: 1.25rem;
                font-weight: 600;
                transition: all 0.3s ease;
                border: 1px solid rgba(255,255,255,0.1);
                width: 100%;
                max-width: 400px;
            }
            .rec-link:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateY(-3px);
                border-color: #4caf50;
            }
            .rec-link .icon {
                font-size: 1.5rem;
            }
        `,document.head.appendChild(i)}m.appendChild(a)}function He(m,d,e={}){const a=e.nounAnchor||A.nounAnchor||"Et",n=e.selectedNoun||A.selectedNoun||"barn",g=e.selectedVerb||A.selectedVerb||"spiser";let s="langsomt";m.innerHTML=`
        <div class="grounding-container animate-in">
            <div class="header-section">
                <button class="back-btn" id="back-to-adj">←</button>
                <h1>${t("adverbTitle")}</h1>
                <p class="subtitle">${t("adverbDesc")}</p>
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
                            <div class="box-word">${g}</div>
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
                    <span class="noun-anchor">${a}</span>
                    <span class="adjective-part" id="sentence-adj">sødt</span>
                    <span class="noun-part">${n}</span>
                    <span class="verb-part" id="verb-display">${g}</span>
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
                    ${t("adverbExpl")}
                </div>

                <div class="adverb-teaser animate-in" style="margin-top: 5rem; text-align: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 4rem;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem; color: #ffffff;">${t("adverbTeaserNext")}</h3>
                    <div class="navigation-controls">
                        <button class="gemini-btn spotlight-btn" id="next-conjunction-btn">${t("nextStepAfterAdverb")}</button>
                    </div>
                </div>

                <div class="navigation-controls" style="margin-top: 4rem; opacity: 0.5;">
                    <button class="back-btn" id="finish-btn" style="margin: 0 auto;">${t("back")}</button>
                </div>
            </div>
        </div>
    `;const o=m.querySelector("#back-to-adj"),l=m.querySelector("#finish-btn"),r=m.querySelector("#adverb-select"),c=m.querySelector("#active-adverb"),p=m.querySelector("#waves-container"),i=m.querySelector("#adv-projector-svg"),u=m.querySelector("#sentence-adj");i.innerHTML=`
        <svg viewBox="0 0 200 120" class="projector-svg-main">
            <rect x="20" y="40" width="60" height="40" rx="4" fill="#444" stroke="white" stroke-width="2" />
            <circle cx="40" cy="60" r="12" fill="#333" stroke="white" />
            <path id="adv-beam" d="M 80 60 L 180 20 L 180 100 Z" fill="rgba(255, 235, 59, 0.4)" style="transition: all 0.5s ease;" />
        </svg>
    `;const b=h=>h==="Et"?"stort":h==="Det"||h==="Mit"?"store":"stort";u.textContent=b(a);function k(h){let f="1.5s",T=3,E="#ffeb3b",D=2;h==="hurtigt"?(f="0.4s",E="#4caf50",T=5):h==="langsomt"?(f="3.5s",E="#2196f3",T=2):h==="meget"?(f="1s",E="#f44336",T=8,D=4):h==="lidt"&&(f="2s",E="#9e9e9e",T=1,D=1);let x="";for(let y=0;y<T;y++){const v=30+(y-(T-1)/2)*10;x+=`
                <path d="M 10 ${v} Q 50 ${v-10} 90 ${v} T 170 ${v}" fill="none" stroke="${E}" stroke-width="${D}" opacity="0.7">
                    <animate attributeName="d" values="M 10 ${v} Q 50 ${v-10} 90 ${v} T 170 ${v}; M 10 ${v} Q 50 ${v+10} 90 ${v} T 170 ${v}; M 10 ${v} Q 50 ${v-10} 90 ${v} T 170 ${v}" dur="${f}" repeatCount="infinite" />
                </path>
            `}p.innerHTML=`
            <svg viewBox="0 0 180 60" style="width: 100%; height: 60px;">
                ${x}
            </svg>
        `;const w=i.querySelector("#adv-beam");if(w){w.style.fill=E.replace(")",", 0.4)").replace("#","rgba(");const y={hurtigt:"rgba(76, 175, 80, 0.4)",langsomt:"rgba(33, 150, 243, 0.4)",meget:"rgba(244, 67, 54, 0.4)",lidt:"rgba(158, 158, 158, 0.4)"};w.style.fill=y[h]||"rgba(255, 235, 59, 0.4)"}}r.onchange=h=>{s=h.target.value,c.textContent=s,k(s),c.parentElement.classList.add("pulse"),setTimeout(()=>c.parentElement.classList.remove("pulse"),500)},o.onclick=()=>d("adjective_bridge"),l.onclick=()=>d("dagens_opgave");const j=m.querySelector("#next-conjunction-btn");if(j.onclick=()=>d("conjunction_bridge",{nounAnchor:a,selectedNoun:n,selectedVerb:g,selectedAdverb:s,adjectivePart:u.textContent}),k(s),!document.getElementById("adverb-bridge-styles")){const h=document.createElement("style");h.id="adverb-bridge-styles",h.textContent=`
            .sentence-display {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                font-size: 1.8rem;
                font-weight: 700;
                margin: 4rem 0;
                padding: 2rem;
                background: rgba(255,255,255,0.03);
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.05);
            }
            .adverb-drop-zone {
                min-width: 150px;
            }
            .premium-select {
                background: #4caf50 !important;
                color: white;
                padding: 0.4rem 0.8rem !important;
                border-radius: 10px !important;
                font-size: 1.5rem !important;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
                transition: all 0.3s ease;
            }
            .premium-select:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
            }

            .adverb-visual-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;
                margin: 4rem 0;
            }
            .projector-svg-main {
                width: 200px;
                height: 120px;
            }
            .handling-container {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                width: 100%;
                max-width: 800px;
                background: rgba(0,0,0,0.2);
                padding: 3rem 2rem;
                border-radius: 30px;
                position: relative;
                border: 1px solid rgba(255,255,255,0.05);
            }
            .handling-box, .adverb-box {
                background: rgba(255,255,255,0.05);
                padding: 1.5rem 2rem;
                border-radius: 16px;
                min-width: 160px;
                text-align: center;
                z-index: 2;
                border: 1px solid rgba(255,255,255,0.1);
            }
            .handling-box {
                background: #6b0f1a;
            }
            .adverb-box {
                background: linear-gradient(135deg, rgba(255, 235, 59, 0.1), rgba(255, 235, 59, 0.2));
                border-color: rgba(255, 235, 59, 0.3);
            }
            .box-label {
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.6;
                margin-bottom: 0.5rem;
            }
            .box-word {
                font-size: 1.8rem;
                font-weight: 800;
            }
            .waves-interaction-area {
                width: 180px;
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
                padding: 2.5rem;
                border-radius: 20px;
                line-height: 1.8;
                font-size: 1.2rem;
                text-align: left;
                margin: 2rem auto;
                max-width: 600px;
                border: 1px solid rgba(255,255,255,0.1);
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
        `,document.head.appendChild(h)}}function Le(m,d,e={}){const a=e.nounAnchor||A.nounAnchor||"Et",n=e.selectedNoun||A.selectedNoun||"barn",g=e.selectedVerb||A.selectedVerb||"spiser",s=e.selectedAdverb||A.selectedAdverb||"langsomt",o=e.adjectivePart||"stort";let l="fordi";m.innerHTML=`
        <div class="grounding-container animate-in">
            <div class="header-section">
                <button class="back-btn" id="back-to-adv">←</button>
                <h1>${t("conjunctionTitle")}</h1>
                <p class="subtitle">${t("conjunctionDesc")}</p>
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
                        <span class="noun-anchor">${a}</span>
                        <span class="adjective-part">${o}</span>
                        <span class="noun-part">${n}</span>
                        <span class="verb-part">${g}</span>
                        <span class="adverb-part">${s}</span>
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
                    ${t("conjunctionExpl")}
                </div>

                <div class="recommendation-box animate-in" style="margin-top: 4rem;">
                    <div class="rec-title">${t("practiceMoreTitle")}</div>
                    <div class="rec-links">
                        <a href="#" class="rec-link" id="conj-practice-link">
                            <span class="icon">🔗</span>
                            ${t("conjunctionPracticeLink")}
                        </a>
                    </div>
                </div>

                <p class="reflection-text animate-in" style="margin-top: 2rem; color: var(--text-muted); font-style: italic; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                    ${t("conjunctionClosingReflection")}
                </p>

                <div class="navigation-controls" style="margin-top: 4rem;">
                    <button class="gemini-btn spotlight-btn" id="finish-btn">${t("nextStepAfterConjunction")}</button>
                </div>
            </div>
        </div>
    `;const r=m.querySelector("#back-to-adv"),c=m.querySelector("#finish-btn"),p=m.querySelector("#conjunction-select"),i=m.querySelector("#punctuation-before"),u=m.querySelector("#conj-practice-link"),b=m.querySelector("#flow-path"),k=m.querySelector("#conj-indicator"),j=m.querySelector("#clock-group"),h=m.querySelector("#timeline-base"),f=m.querySelector("#obstacle-group"),T=m.querySelector("#obs-part-1"),E=m.querySelector("#obs-part-2"),D=m.querySelector("#moving-arrow");function x(w){l=w,k.textContent=w;const y=m.querySelector("#conj-expl-box");y&&(y.innerHTML=t(`conjExpl_${w.toLowerCase()}`)),j.style.opacity="0",h.style.opacity="0",f.style.opacity="0",D.style.opacity="0",T.setAttribute("y","30"),E.setAttribute("y","60"),b.style.opacity="1",b.style.strokeDasharray="none",b.classList.remove("animate-flow-lr","animate-flow-rl","animate-flow-break"),w==="Derfor"?(i.textContent=".",i.style.marginRight="1rem"):(i.textContent=",",i.style.marginRight="0.5rem");let C="#4caf50",v="M 50 60 L 350 60",N=!0;w==="fordi"?(C="#4caf50",v="M 50 60 L 350 60",b.classList.add("animate-flow-lr")):w==="Derfor"?(C="#4caf50",v="M 350 60 L 50 60",b.classList.add("animate-flow-rl")):w==="da"?(C="#2196f3",h.style.opacity="0.5",j.style.opacity="1",j.classList.add("animate-clock-past"),b.style.opacity="0",N=!1):w==="når"?(C="#2196f3",h.style.opacity="0.5",j.style.opacity="1",j.classList.add("animate-clock-future"),b.style.opacity="0",N=!1):w==="alligevel"?(C="#ff9800",f.style.opacity="1",b.classList.add("animate-flow-lr")):w==="selvom"?(C="#f44336",f.style.opacity="1",b.classList.add("animate-flow-break"),T.classList.add("animate-split-up"),E.classList.add("animate-split-down")):w==="men"&&(C="#f44336",v="M 50 60 Q 200 10 350 60",b.classList.add("animate-flow-lr")),b&&(b.setAttribute("d",v),b.setAttribute("stroke",C),b.style.animation="none",b.offsetHeight,b.style.animation=null),N&&D&&(D.style.opacity="1",D.style.color=C,D.innerHTML=`
                <polygon points="-12,-6 2,0 -12,6" fill="currentColor" />
                <animateMotion dur="1.5s" repeatCount="infinite" path="${v}" rotate="auto" />
            `),k.style.background=C,k.classList.add("pulse"),setTimeout(()=>k.classList.remove("pulse"),500)}if(p.onchange=w=>{j.classList.remove("animate-clock-past","animate-clock-future"),T.classList.remove("animate-split-up"),E.classList.remove("animate-split-down"),x(w.target.value)},r.onclick=()=>d("adverb_bridge",{nounAnchor:a,selectedNoun:n,selectedVerb:g,selectedAdverb:s,adjectivePart:o}),c.onclick=()=>d("dagens_opgave"),u.onclick=w=>{w.preventDefault(),d("traen_grammatik")},x(l),!document.getElementById("conj-bridge-styles")){const w=document.createElement("style");w.id="conj-bridge-styles",w.textContent=`
            .recommendation-box {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 24px;
                padding: 2.5rem;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.1);
                margin: 0 auto;
                max-width: 600px;
            }
            .rec-title {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--text-muted);
                margin-bottom: 1.5rem;
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
                padding: 1.2rem 2rem;
                border-radius: 16px;
                text-decoration: none;
                color: white;
                font-size: 1.25rem;
                font-weight: 600;
                transition: all 0.3s ease;
                border: 1px solid rgba(255,255,255,0.1);
                width: 100%;
                max-width: 400px;
            }
            .rec-link:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateY(-3px);
                border-color: #4caf50;
            }
            .rec-link .icon {
                font-size: 1.5rem;
            }

            .conjunction-visual-section {
                margin: 2rem 0;
                background: rgba(0,0,0,0.2);
                padding: 2rem;
                border-radius: 30px;
                border: 1px solid rgba(255,255,255,0.05);
                height: 180px;
                display: flex;
                align-items: center;
            }
            .flow-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                width: 100%;
            }
            .sentence-node {
                background: rgba(255,255,255,0.05);
                padding: 1rem;
                border-radius: 12px;
                border: 1px solid rgba(255,255,255,0.1);
                font-weight: 600;
                min-width: 100px;
                text-align: center;
                color: rgba(255,255,255,0.7);
                font-size: 0.9rem;
            }
            .flow-path-wrapper {
                flex-grow: 1;
                position: relative;
                height: 120px;
            }
            .flow-svg {
                width: 100%;
                height: 100%;
                overflow: visible;
            }
            .conj-label {
                position: absolute;
                top: -10px;
                left: 50%;
                transform: translateX(-50%);
                background: #4caf50;
                padding: 0.4rem 1.2rem;
                border-radius: 20px;
                font-size: 1.2rem;
                font-weight: 700;
                box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 10;
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
        `,document.head.appendChild(w)}}function _e(m,d){const e=document.createElement("div");e.className="view-container adjective-comparison";const a=document.createElement("div");a.className="top-bar";const n=document.createElement("button");n.className="back-btn",n.textContent="← "+t("back"),n.onclick=()=>d("pronomen"),a.appendChild(n),e.appendChild(a);const g=document.createElement("h1");g.textContent=t("adjComparisonTitle"),e.appendChild(g);const s=document.createElement("p");s.className="subtitle",s.textContent=t("adjComparisonDesc"),e.appendChild(s);const o=document.createElement("div");o.className="exercise-area",e.appendChild(o);const l=[{positive:"sød",comparative:"sødere",superlative:"sødest",example:"Barnet er [word]."},{positive:"stor",comparative:"større",superlative:"størst",example:"Træet er [word]."},{positive:"lille",comparative:"mindre",superlative:"mindst",example:"Barnet er [word]."},{positive:"god",comparative:"bedre",superlative:"bedst",example:"Det er [word]."},{positive:"mange",comparative:"flere",superlative:"flest",example:"De har [word] penge."}];let r=0,c="positive";function p(){const u=l[r];o.innerHTML=`
            <div class="adj-tabs">
                ${l.map((b,k)=>`
                    <button class="tab-btn ${k===r?"active":""}" data-idx="${k}">
                        ${b.positive}
                    </button>
                `).join("")}
            </div>

            <div class="tree-comparison-container">
                <div class="tree-stage">
                    <!-- Tree 1: Positive -->
                    <div class="tree-box ${c==="positive"?"selected":""}" data-grade="positive">
                        <div class="tree-visual" id="tree-1">
                            <svg viewBox="0 0 100 120">
                                <rect x="45" y="80" width="10" height="30" fill="#5D4037" />
                                <circle cx="50" cy="60" r="30" fill="#4CAF50" />
                            </svg>
                        </div>
                        <div class="grade-label">${t("positiveLabel")}</div>
                        <div class="grade-word">${u.positive}</div>
                    </div>

                    <!-- Tree 2: Comparative -->
                    <div class="tree-box ${c==="comparative"?"selected":""}" data-grade="comparative">
                        <div class="tree-visual" id="tree-2">
                            <svg viewBox="0 0 100 150">
                                <rect x="42" y="100" width="16" height="40" fill="#5D4037" />
                                <circle cx="50" cy="70" r="45" fill="#388E3C" />
                                <!-- Comparison Line -->
                                ${c==="comparative"||c==="superlative"?'<line x1="100" y1="100" x2="-20" y2="100" stroke="rgba(255,255,255,0.3)" stroke-dasharray="4" />':""}
                            </svg>
                        </div>
                        <div class="grade-label">${t("comparativeLabel")}</div>
                        <div class="grade-word">${u.comparative}</div>
                    </div>

                    <!-- Tree 3: Superlative -->
                    <div class="tree-box ${c==="superlative"?"selected":""}" data-grade="superlative">
                        <div class="tree-visual" id="tree-3">
                            <svg viewBox="0 0 100 180">
                                <rect x="40" y="120" width="20" height="50" fill="#5D4037" />
                                <circle cx="50" cy="80" r="60" fill="#2E7D32" />
                            </svg>
                        </div>
                        <div class="grade-label">${t("superlativeLabel")}</div>
                        <div class="grade-word">${u.superlative}</div>
                    </div>
                </div>

                <div class="example-box animate-in">
                    <div class="example-label">Eksempel:</div>
                    <div class="example-text">
                        ${u.example.replace("[word]",`<span class="highlight highlight-grad">${u[c]}</span>`)}
                    </div>
                </div>

                <div class="interactive-comparison" id="comparison-highlight">
                    <!-- Dynamic comparison indicator -->
                </div>
            </div>
        `,o.querySelectorAll(".tab-btn").forEach(b=>{b.onclick=()=>{r=parseInt(b.dataset.idx),p()}}),o.querySelectorAll(".tree-box").forEach(b=>{b.onclick=()=>{c=b.dataset.grade,p()}}),i()}function i(){const u=o.querySelector("#comparison-highlight");c==="comparative"?u.innerHTML=`
                <div class="comparison-bubble">
                    Den er <strong>mere</strong> end den første!
                </div>
            `:c==="superlative"?u.innerHTML=`
                <div class="comparison-bubble">
                    Den er <strong>mest</strong> af alle!
                </div>
            `:u.innerHTML=""}if(p(),m.appendChild(e),!document.getElementById("adj-comp-styles")){const u=document.createElement("style");u.id="adj-comp-styles",u.textContent=`
            .adjective-comparison .adj-tabs {
                display: flex;
                justify-content: center;
                gap: 0.8rem;
                margin-bottom: 3rem;
                flex-wrap: wrap;
            }
            .tree-stage {
                display: flex;
                align-items: flex-end;
                justify-content: center;
                gap: 2rem;
                margin-bottom: 3rem;
                min-height: 250px;
            }
            .tree-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                opacity: 0.7;
            }
            .tree-box:hover {
                transform: translateY(-10px);
                opacity: 1;
            }
            .tree-box.selected {
                opacity: 1;
                transform: scale(1.1);
            }
            .tree-visual {
                width: 100px;
                display: flex;
                align-items: flex-end;
                justify-content: center;
            }
            #tree-1 svg { height: 120px; }
            #tree-2 svg { height: 150px; }
            #tree-3 svg { height: 180px; }
            
            .grade-label {
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.6;
                margin-top: 1rem;
            }
            .grade-word {
                font-size: 1.4rem;
                font-weight: 800;
                color: #4CAF50;
            }
            .tree-box.selected .grade-word {
                color: #ffeb3b;
                text-shadow: 0 0 10px rgba(255, 235, 59, 0.5);
            }
            
            .example-box {
                background: rgba(255, 255, 255, 0.05);
                padding: 2rem;
                border-radius: 24px;
                border: 1px solid rgba(255,255,255,0.1);
                max-width: 500px;
                margin: 0 auto;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            .example-label {
                font-size: 0.9rem;
                opacity: 0.5;
                margin-bottom: 0.5rem;
            }
            .example-text {
                font-size: 1.8rem;
                font-weight: 600;
            }
            .highlight-grad {
                color: #ffeb3b;
                border-bottom: 2px dashed #ffeb3b;
            }
            
            .comparison-bubble {
                background: #4CAF50;
                color: white;
                padding: 1rem 2rem;
                border-radius: 20px;
                margin-top: 2rem;
                text-align: center;
                max-width: 300px;
                margin-left: auto;
                margin-right: auto;
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            
            @keyframes popIn {
                0% { transform: scale(0.5); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        `,document.head.appendChild(u)}}const G="/Dansk/";function L(m,d={},e=!1){const a=document.querySelector("#app");if(a.innerHTML="",e||(window.location.hash="/"+m),m==="language")A.currentView="language",te(a,L);else if(m==="main")A.currentView="main",ne(a,L);else if(m==="notes")A.currentView="notes",ae(a,L);else if(m==="dagens_opgave")A.currentView="dagens_opgave",re(a,L);else if(m==="word_learning")A.currentView="word_learning",ie(a,L);else if(m==="samtale_traening")A.currentView="samtale_traening",oe(a,L);else if(m==="samtale_hverdag")A.currentView="samtale_hverdag",se(a,L);else if(m==="skrive_hjaelp")A.currentView="skrive_hjaelp",le(a,L);else if(m==="du1_modul3")A.currentView="du1_modul3",ce(a,L);else if(m==="du2_modul1")A.currentView="du2_modul1",ue(a,L);else if(m==="smaa_historier")A.currentView="smaa_historier",he(a,L);else if(m==="du2_modul5")A.currentView="du2_modul5",be(a,L);else if(m==="email_laan")A.currentView="email_laan",ve(a,L);else if(m==="opdragelse")A.currentView="opdragelse",ke(a,L);else if(m==="en_klage")A.currentView="en_klage",fe(a,L);else if(m==="du1_min_hverdag")A.currentView="du1_min_hverdag",de(a,L);else if(m==="transport_sprogskole")A.currentView="transport_sprogskole",me(a,L);else if(m==="du1_madlavning")A.currentView="du1_madlavning",pe(a,L);else if(m==="du1_rengoering")A.currentView="du1_rengoering",ge(a,L);else if(m==="traen_tidsudtryk")A.currentView="traen_tidsudtryk",ye(a,L);else if(m==="lav_sporgsmal")A.currentView="lav_sporgsmal",xe(a,L);else if(m==="ordstilling")A.currentView="ordstilling",we(a,L);else if(m==="traen_grammatik")A.currentView="traen_grammatik",Ce(a,L);else if(m==="pronomen")A.currentView="pronomen",De(a,L);else if(m==="verbum_learning"){A.currentView="verbum_learning";const n=new Ne(L,d?.categoryId);a.appendChild(n.render())}else m==="grounding"?(A.currentView="grounding",je(a,L)):m==="bestemthed"?(A.currentView="bestemthed",Ae(a,L)):m==="modal_force"?(A.currentView="modal_force",Se(a,L,d)):m==="adjective_bridge"?(A.currentView="adjective_bridge",Be(a,L,d)):m==="adverb_bridge"?(A.currentView="adverb_bridge",He(a,L,d)):m==="conjunction_bridge"?(A.currentView="conjunction_bridge",Le(a,L,d)):m==="adjective_comparison"&&(A.currentView="adjective_comparison",_e(a,L))}function Z(){const m=window.location.hash.replace(/^#\/?/,"").split("?")[0];m?L(m,{},!0):A.lang?L("main"):L("language")}document.addEventListener("DOMContentLoaded",()=>{window.addEventListener("hashchange",Z),Z()});
