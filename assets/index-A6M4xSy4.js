(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const p of t)if(p.type==="childList")for(const s of p.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function e(t){const p={};return t.integrity&&(p.integrity=t.integrity),t.referrerPolicy&&(p.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?p.credentials="include":t.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function c(t){if(t.ep)return;t.ep=!0;const p=e(t);fetch(t.href,p)}})();const U={da:{selectLanguage:"Vælg sprog",title:"Træning i dansk",subtitle:"Vælg en kategori for at starte din træning.",dagensOpgave:"Dagens opgave",dagensOpgaveDesc:"Nyt emne, ny grammatik. Løs opgaven!",modulTest:"Træning til modultest",modulTestDesc:"Forskellige opgaver samlet på ét sted.",notes:"Undervisningsnoter",notesDesc:"Læs og øv noter fra undervisningen.",lavSporgsmal:"Lav spørgsmål",lavSporgsmalDesc:"Lær at stille præcise spørgsmål ud fra billeder.",lavSporgsmalBtnText:"Lav spørgsmål - tryk her",samtaleTraening:"Samtaletræning",samtaleTraeningDesc:"Øv dine samtaler og få hjælp til dit dansk.",skriveHjaelp:"Skrivehjælp",skriveHjaelpDesc:"Indsæt din tekst og få feedback uden svar.",verbumLearning:"Lær danske verber",verbumLearningDesc:"Træn de 100 mest almindelige danske udsagnsord.",phase2_instruction:"Gæt verbet ud fra definitionen.",back:"Tilbage",enterPassword:"Indtast adgangskode for at se indholdet:",du1mod3:"DU1, modul 3 og 4",du2mod1:"DU2, modul 1",smaahistorier:"Små historier",du2mod5:"DU2, modul 5",emailLaan:"E-mail om lån",opdragelse:"Historie om opdragelse",enKlage:"En klage",du3mod4:"DU3, modul 4",laerEtNytOrd:"Lær et nyt ord",laerEtNytOrdDesc:"Udforsk hvordan ord hænger sammen i netværk.",wordNetworkExplanation:"Ord er forbundet med andre ord. Det hjælper dig til at huske ordet meget bedre, når du ved hvordan ordet er forbundet til andre ord.",targetWord:"Hund",hypernym:"Overbegreb",hypernymWord:"Dyr",synonym:"Synonym",synonymWord:"Vovse",antonym:"Antonym",antonymWord:"Kat",hyponym:"Underbegreb",hyponymWord:"Puddel",geminiBtnText:"Lær et ord - tryk her",geminiConsentText:"Ved at klikke på dette link er du indforstået med at du bruger et af Googles produkter og at Google træner kunstig intelligens med dine svar.",hverdagssamtale:"Hverdagssamtale",hverdagssamtaleDesc:"Øv dig i almindelige samtaler om hverdagen.",samtaleBolig:"Samtale om bolig",samtaleArbejde:"Samtale om arbejde",samtaleBtnText:"Start samtalen - tryk her",skriveHjaelpBtnText:"Skrivehjælp - tryk her",du1mod3Desc:"Vælg et emne at øve.",minHverdag:"Min hverdag",minBolig:"Min bolig",mitArbejde:"Mit arbejde",minHverdagDesc:"Opgaver om din dagligdag.",transportSprogskole:"Transport til sprogskolen",madlavning:"Madlavning",rengoering:"Rengøring",transportDesc:"Hvordan kommer du i skole?",padletDesc:"Del med klassen, hvordan du kommer til sprogskolen i dag.",padletBtnText:"Åbn padlet",madlavningDesc:"Hvad kan du lide at lave af mad?",madlavningPadletDesc:"Del dine madoplevelser med klassen her.",rengoeringDesc:"Hvordan gør du rent?",rengoeringPadletDesc:"Del dine tanker om rengøring med klassen.",traenTidsudtryk:"Træn tidsudtryk",traenTidsudtrykDesc:"Hvordan bruger man forskellige tidsudtryk på dansk?",traenTidsudtrykBtnText:"Åbn tidsudtryk øvelse",ordstilling:"Ordstilling",ordstillingDesc:"Ryk rundt på ordene og sæt dem i den rigtige rækkefølge.",checkResult:"Tjek svar",correctOrder:"Flot! Rækkefølgen er rigtig.",wrongOrder:"Ikke helt rigtigt. Prøv igen!",ordstillingLet:"Ordstilling (let)",ordstillingSvaer:"Ordstilling (mellemsvær)",levelA1:"A1 sætninger",levelA2:"A2 sætninger",traenGrammatik:"Træn grammatik",grammatikDesc:"Udfyld hullerne med de rigtige ord i teksten.",let:"Let (a1)",mellemsvaer:"Mellemsvær (a2)",svaer:"Svær (b1)",modultest:"Modultest",modultestLongDesc:"En længere tekst på 10 linjer. Find de rigtige ord i listen og udfyld hullerne.",grammatikIntro:"Vælg et niveau for at starte øvelsen.",checkAnswers:"Tjek alle svar",allCorrect:"Fantastisk! Alle svar er korrekte.",someWrong:"Nogle af dine svar er ikke helt rigtige. Prøv igen!",newExercise:"Næste tekst",hintMean:"Dette ord giver ikke mening i sammenhængen.",hintTense:"Tjek tiden. Er det nutid eller datid?",hintForm:"Tjek ordets bøjning (f.eks. en/et eller ental/flertal).",hintPerson:"Tjek hvem der gør noget (jeg, du, han/hun).",hintContext:"Læs hele teksten igen. Hvad passer bedst her?",hintName:"Her skal du bruge et ord om navne.",hintPlace:"Her skal du bruge et ord om steder.",hintAction:"Dette ord beskriver en anden handling.",hintAdj:"Tjek tillægsordet (beskrivelse af en ting).",hintAdverb:"Tjek biordet (tid, sted eller måde).",derErDetEr:"Der er / det er?",derErExpl:"Der er' åbner døren for noget nyt. 'Det er' peger på det, vi kender.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Husk: 'Der er' (introduktion) vs 'Det er' (identifikation).",hvilketOrd:"Hvilket ord skal jeg vælge?",hvilketOrdDesc:"Træn pronominer (stedord) og verber (udsagnsord) i forskellige sammenhænge.",hanHamHans:"Han / ham / hans?",gårGikGået:"Går / gik / er gået?",verberM3:"Lær danske verber (nutid)",hvilketVerbDesc:"Vælg en kategori for at træne verber.",pronominerSubjekt:"Subjekt (fokus)",pronominerObjekt:"Objekt (ikke-fokus)",pronominerPossessiv:"Possessiv (ejer)",verberBevaegelse:"Bevægelse (gå, køre, komme)",verberHandling:"Handling (gøre, lave, bruge)",verberHjaelpe:"Hjælpeverber (kan, skal, vil)",verberTilstand:"Tilstand & besiddelse (er, har)",verberInteraktion:"Social interaktion (sige, spørge)",verberIndreLiv:"Det indre liv (se, tænke, vide)",verberDatid:"Datid (uregelmæssige)",verberTider:"Datid vs. Førnutid (punktet & broen)",hintPronominer:"Tjek hvem der er i fokus eller hvem der ejer noget.",howToBuildSentence:"Hvordan bygger man en sætning?",howToBuildSentenceDesc:"Lær hvordan ord ankres til virkeligheden.",groundingIntro:"Uden grammatik svæver ord frit som balloner. Vi bruger grammatik til at ankre dem til virkeligheden (her og nu).",groundingStep1:"1. Konceptet (ballonen): 'Barn' er bare en idé. Vi ved ikke hvilket barn.",groundingStep2:"2. Handlingen: 'At spise' er bare en idé. Vi ved ikke hvornår.",groundingStep3:"3. Ankeret: Brug små ord (kendeord) og tid (bøjning) til at trække ballonerne ned.",sentenceGround:"Virkelighedens jord",wellDone:"Flot! Du har nu bygget en sætning, der er forankret i virkeligheden.",finitenessTitle:"Hvorfor bøjer vi kun det første ord?",finitenessDesc:"Det første ord (modalverbet) placerer sætningen i tid på tidslinjen. Det næste ord har kun fokus på selve handlingen.",timelineLabel:"Tidslinjen (Her forankres kraften)",actionLabel:"Handlingen (Selve aktiviteten)",nowLabel:"Nutid (Nu)",pastLabel:"Datid (Da)",finitenessExpl:"Læg mærke til: Kun det første ord bevæger sig på tidslinjen. Handlingen (spise) er den samme uanset tid.",adjectiveTitle:"Hvad slags barn?",adjectiveDesc:"Adjektiver er som en projektør, der lyser på et ord og giver det mere farve eller detalje.",adjectiveLabel:"Projektøren (Detalje)",adjectiveExpl:"Læg mærke til: Adjektivets form ændrer si g efter ordet foran (Et sødt / Mit søde).",nextStepAdjective:"Næste øvelse: Adjektiver ↓",adjectiveTeaser:"Hvordan kan vi beskrive barnet? Altså hvordan kan vi beskrive verden omkring os?",agreementTitle:"Hvad bestemmer bøjningen?",agreementDesc:"Substantivet (navneordet) bestemmer, hvilken endelse adjektivet skal have.",ubestemtLabel:"Ubestemt (Et / En)",bestemtLabel:"Bestemt (Det / Den)",agreementExpl:"Når vi taler om noget <strong>bestemt</strong>, tilføjer vi et <strong>-e</strong>. Omvendt bestemmer <em>Et barn</em>, at der skal et <strong>-t</strong> på (et sød<strong>t</strong> barn).",exampleBarn:"barn",exampleBil:"bil"},en:{selectLanguage:"Select language",title:"Danish Training",subtitle:"Select a category to start your training.",dagensOpgave:"Daily Task",dagensOpgaveDesc:"New topic, new grammar. Solve the task!",modulTest:"Module Test Training",modulTestDesc:"Various tasks gathered in one place.",notes:"Teaching Notes",notesDesc:"Read and practice notes from class.",lavSporgsmal:"Make Questions",lavSporgsmalDesc:"Learn to ask precise questions based on pictures.",lavSporgsmalBtnText:"Make questions - click here",samtaleTraening:"Conversation Training",samtaleTraeningDesc:"Practice conversations and get help with your Danish.",skriveHjaelp:"Writing Help",skriveHjaelpDesc:"Insert your text and get feedback without answers.",back:"Back",enterPassword:"Enter password to view content:",du1mod3:"DU1, Module 3 and 4",du2mod1:"DU2, Module 1",smaahistorier:"Short stories",du2mod5:"DU2, Module 5",emailLaan:"E-mail about loan",opdragelse:"Story about upbringing",enKlage:"A complaint",du3mod4:"DU3, Module 4",laerEtNytOrd:"Learn a new word",laerEtNytOrdDesc:"Explore how words are connected in networks.",wordNetworkExplanation:"Words are connected to other words. It helps you remember the word much better when you know how the word is connected to other words.",targetWord:"Dog",hypernym:"Hypernym",hypernymWord:"Animal",synonym:"Synonym",synonymWord:"Doggie",antonym:"Antonym",antonymWord:"Cat",hyponym:"Hyponym",hyponymWord:"Poodle",geminiBtnText:"Learn a word - click here",geminiConsentText:"By clicking this link, you agree that you are using a Google product and that Google trains artificial intelligence with your responses.",hverdagssamtale:"Everyday Conversation",hverdagssamtaleDesc:"Practice common everyday conversations.",samtaleBolig:"Conversation about housing",samtaleArbejde:"Conversation about work",samtaleBtnText:"Start conversation - click here",skriveHjaelpBtnText:"Writing help - click here",du1mod3Desc:"Choose a topic to practice.",minHverdag:"My everyday life",minBolig:"My housing",mitArbejde:"My work",minHverdagDesc:"Tasks about your daily life.",transportSprogskole:"Transport to language school",madlavning:"Cooking",rengoering:"Cleaning",transportDesc:"How do you get to school?",padletDesc:"Share with the class how you get to language school today.",padletBtnText:"Open Padlet",madlavningDesc:"What kind of food do you like to cook?",madlavningPadletDesc:"Share your cooking experiences with the class here.",rengoeringDesc:"How do you clean?",rengoeringPadletDesc:"Share your thoughts on cleaning with the class.",traenTidsudtryk:"Practice time expressions",traenTidsudtrykDesc:"How do you use different time expressions in Danish?",traenTidsudtrykBtnText:"Open time expressions exercise",ordstilling:"Word Order",ordstillingDesc:"Rearrange the words and put them in the correct order.",checkResult:"Check answer",correctOrder:"Great! The order is correct.",wrongOrder:"Not quite right. Try again!",ordstillingLet:"Word Order (Easy)",ordstillingSvaer:"Word Order (Medium)",levelA1:"A1 sentences",levelA2:"A2 sentences",traenGrammatik:"Practice Grammar",grammatikDesc:"Fill in the blanks with the correct words in the text.",let:"Easy (A1)",mellemsvaer:"Medium (A2)",svaer:"Hard (B1)",modultest:"Module Test",modultestLongDesc:"A longer 10-line text. Find the correct words in the list and fill in the blanks.",grammatikIntro:"Select a level to start the exercise.",checkAnswers:"Check all answers",allCorrect:"Fantastic! All answers are correct.",someWrong:"Some of your answers are not quite right. Try again!",newExercise:"Next text",hintMean:"This word doesn't make sense in this context.",hintTense:"Check the tense. Is it present or past?",hintForm:"Check the word form (e.g., gender or singular/plural).",hintPerson:"Check who is performing the action (I, you, he/she).",hintContext:"Read the whole text again. What fits best here?",hintName:"You need a word for names here.",hintPlace:"You need a word for places here.",hintAction:"This word describes a different action.",hintAdj:"Check the adjective (description of a thing).",hintAdverb:"Check the adverb (time, place, or manner).",derErDetEr:"Der er / Det er?",derErExpl:"'Der er' opens the door for new info. 'Det er' points to what we know.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Remember: 'Der er' (intro) vs 'Det er' (identification).",hvilketOrd:"Which word should I choose?",hvilketOrdDesc:"Practice pronouns and verbs in different contexts.",hanHamHans:"He / Him / His?",gårGikGået:"Go / went / has gone?",verberM3:"Learn Danish Verbs (Present)",hvilketVerbDesc:"Choose a category to practice verbs.",pronominerSubjekt:"Subject (Focus)",pronominerObjekt:"Object (Non-focus)",pronominerPossessiv:"Possessive (Owner)",verberBevaegelse:"Movement (go, drive, come)",verberHandling:"Action (do, make, use)",verberHjaelpe:"Helping Verbs (can, must, will)",verberTilstand:"State & Possession (be, have)",verberInteraktion:"Social Interaction (say, ask)",verberIndreLiv:"Inner Life (see, think, know)",verberDatid:"Past Tense (irregular)",verberTider:"Past vs. Present Perfect (The Point & The Bridge)",hintPronominer:"Check who is in focus or who owns something.",howToBuildSentence:"How to build a sentence?",howToBuildSentenceDesc:"Learn how words are anchored to reality.",groundingIntro:"Without grammar, words float freely like balloons. We use grammar to anchor them to reality (HERE AND NOW).",groundingStep1:"1. The Concept (Balloon): 'Child' is just an idea. We don't know which child.",groundingStep2:"2. The Action: 'To eat' is just an idea. We don't know when.",groundingStep3:"3. The Anchor: Use small words (determiners) and tense (inflection) to pull the balloons down.",sentenceGround:"The ground of reality",wellDone:"Well done! You have now built a sentence anchored in reality."},ar:{selectLanguage:"اختر لغة",title:"التدريب على الدنماركية",subtitle:"اختر فئة لبدء التدريب الخاص بك.",dagensOpgave:"المهمة اليومية",dagensOpgaveDesc:"موضوع جديد، قواعد جديدة. حل المهمة!",modulTest:"تدريب اختبار الوحدة",modulTestDesc:"مهام مختلفة مجمعة في مكان واحد.",notes:"ملاحظات التدريس",notesDesc:"اقرأ وتدرب على الملاحظات من الفصل.",lavSporgsmal:"طرح أسئلة",lavSporgsmalDesc:"تعلم طرح أسئلة دقيقة بناءً على الصور.",lavSporgsmalBtnText:"طرح الأسئلة - اضغط هنا",samtaleTraening:"تدريب المحادثة",samtaleTraeningDesc:"تمرن على المحادثات واحصل على مساعدة في الدنماركية.",skriveHjaelp:"مساعدة في الكتابة",skriveHjaelpDesc:"أدخل نصك واحصل على ملاحظات بدون إجابات.",back:"رجوع",du1mod3:"DU1، الوحدة 3 و 4",du2mod1:"DU2، الوحدة 1",du3mod4:"DU3، الوحدة 4",laerEtNytOrd:"تعلم كلمة جديدة",laerEtNytOrdDesc:"استكشف كيف ترتبط الكلمات في شبكات.",wordNetworkExplanation:"الكلمات مرتبطة بكلمات أخرى. يساعدك ذلك على تذكر الكلمة بشكل أفضل عندما تعرف كيف ترتبط الكلمة بكلمات أخرى.",targetWord:"كلب",hypernym:"مفهوم شامل (Hypernym)",hypernymWord:"حيوان",synonym:"مرادف",synonymWord:"كلب صغير",antonym:"مضاد",antonymWord:"قطة",hyponym:"مفهوم فرعي (Hyponym)",hyponymWord:"بودل",geminiBtnText:"تعلم كلمة - اضغط هنا",geminiConsentText:"بالنقر على هذا الرابط، فإنك توافق على استخدامك لمنتج من Google وأن Google تقوم بتدريب الذكاء الاصطناعي باستخدام إجاباتك.",hverdagssamtale:"محادثة يومية",hverdagssamtaleDesc:"تدرب على المحادثات اليومية الشائعة.",samtaleBolig:"محادثة حول السكن",samtaleArbejde:"محادثة حول العمل",samtaleBtnText:"ابدأ المحادثة - اضغط هنا",skriveHjaelpBtnText:"مساعدة في الكتابة - اضغط هنا",du1mod3Desc:"اختر موضوعًا للتدرب عليه.",minHverdag:"حياتي اليومية",minBolig:"سكني",mitArbejde:"عملي",minHverdagDesc:"مهام حول حياتك اليومية.",transportSprogskole:"النقل إلى مدرسة اللغة",madlavning:"طبخ",rengoering:"تنظيف",transportDesc:"كيف تذهب إلى المدرسة؟",padletDesc:"شارك مع الفصل كيف تذهب إلى مدرسة اللغة اليوم.",padletBtnText:"افتح بادليت",madlavningDesc:"ما نوع الطعام الذي تحب طهيه؟",madlavningPadletDesc:"شارك تجارب الطبخ الخاصة بك مع الفصل هنا.",rengoeringDesc:"كيف تنظف؟",rengoeringPadletDesc:"شارك أفكارك حول التنظيف مع الفصل.",traenTidsudtryk:"تدريب تعبيرات الوقت",traenTidsudtrykDesc:"كيف تستخدم تعبيرات الوقت المختلفة باللغة الدنماركية؟",traenTidsudtrykBtnText:"افتح تمرين تعبيرات الوقت",ordstilling:"ترتيب الكلمات",ordstillingDesc:"قم بإعادة ترتيب الكلمات ووضعها في الترتيب الصحيح.",checkResult:"تحقق من الإجابة",correctOrder:"رائع! الترتيب صحيح.",wrongOrder:"ليس تماماً. حاول مرة أخرى!",ordstillingLet:"ترتيب الكلمات (سهل)",ordstillingSvaer:"ترتيب الكلمات (صعب)",levelA1:"جمل A1",levelA2:"جمل A2",traenGrammatik:"تدريب القواعد",grammatikDesc:"املاً الفراغات بالكلمات الصحيحة في النص.",let:"سهل (A1)",mellemsvaer:"متوسط (A2)",svaer:"صعب (B1)",grammatikIntro:"اختر مستوى لبدء التمرين.",checkAnswers:"تحقق من جميع الإجابات",allCorrect:"رائع! جميع الإجابات صحيحة.",someWrong:"بعض إجاباتك ليست صحيحة تمامًا. حاول مرة أخرى!",newExercise:"النص التالي",hintMean:"هذه الكلمة لا معنى لها في هذا السياق.",hintTense:"تحقق من الزمن. هل هو مضارع أم ماضٍ؟",hintForm:"تحقق من صيغة الكلمة (مثل الجنس أو المفرد/الجمع).",hintPerson:"تحقق من يقوم بالفعل (أنا، أنت، هو/هي).",hintContext:"اقرأ النص بالكامل مرة أخرى. ما هو الأنسب هنا؟",hintName:"أنت بحاجة إلى كلمة للأسماء هنا.",hintPlace:"أنت بحاجة إلى كلمة للأماكن هنا.",hintAction:"هذه الكلمة تصف فعلاً مختلفاً.",hintAdj:"تحقق من الصفة (وصف لشيء ما).",hintAdverb:"تحقق من الظرف (الزمان أو المكان أو الطريقة).",hintConj:"تحقق من حرف العطف (يربط بين جملتين).",filled:"تمت تعبئته"},ur:{selectLanguage:"زبان منتخب کریں",title:"دانش کی تربیت",subtitle:"تربیت شروع کرنے کے لیے ایک زمرہ منتخب کریں۔",dagensOpgave:"آج کا کام",dagensOpgaveDesc:"نیا موضوع، نئی گرامر۔ کام حل کریں!",modulTest:"ماڈیول ٹیسٹ کی تربیت",modulTestDesc:"مختلف کام ایک ہی جگہ پر جمع ہیں۔",notes:"تدریسی نوٹس",notesDesc:"کلاس کے نوٹس پڑھیں اور ان کی مشق کریں۔",lavSporgsmal:"سوالات بنائیں",lavSporgsmalDesc:"تصاویر کی بنیاد پر درست سوالات پوچھنا سیکھیں۔",lavSporgsmalBtnText:"سوالات بنائیں - یہاں کلک کریں",samtaleTraening:"گفتگو کی تربیت",samtaleTraeningDesc:"اپنی گفتگو کی مشق کریں اور اپنی دانش میں مدد حاصل کریں۔",skriveHjaelp:"لکھنے میں مدد",skriveHjaelpDesc:"اپنا متن درج کریں اور جوابات کے بغیر فیڈ بیک حاصل کریں۔",back:"واپس",du1mod3:"DU1، ماڈیول 3 اور 4",du2mod1:"DU2، ماڈیول 1",du3mod4:"DU3، ماڈیول 4",laerEtNytOrd:"ایک نیا لفظ سیکھیں",laerEtNytOrdDesc:"دریافت کریں کہ الفاظ نیٹ ورکس میں کیسے جڑے ہوئے ہیں۔",wordNetworkExplanation:"الفاظ دوسرے الفاظ سے جڑے ہوتے ہیں۔ جب آپ کو معلوم ہو کہ لفظ دوسرے الفاظ سے کیسے جڑا ہوا ہے تو یہ آپ کو لفظ کو بہت بہتر طریقے سے یاد رکھنے میں مدد دیتا ہے۔",targetWord:"کتا",hypernym:"اعلیٰ تصور",hypernymWord:"جانور",synonym:"مترادف",synonymWord:"کتا (vovse)",antonym:"متضاد",antonymWord:"بلی",hyponym:"ذیلی تصور",hyponymWord:"پوڈل",geminiBtnText:"لفظ سیکھیں - یہاں کلک کریں",geminiConsentText:"اس لنک پر کلک کر کے، آپ گوگل کی مصنوعات استعمال کرنے اور اپنے جوابات کے ذریعے مصنوعی ذہانت کو تربیت دینے پر رضامند ہو رہے ہیں۔",hverdagssamtale:"روزمرہ گفتگو",hverdagssamtaleDesc:"روزمرہ کی عام گفتگو کی مشق کریں۔",samtaleBolig:"رہائش کے بارے میں گفتگو",samtaleArbejde:"کام کے بارے میں گفتگو",samtaleBtnText:"گفتگو شروع کریں - یہاں کلک کریں",skriveHjaelpBtnText:"لکھنے میں مدد - یہاں کلک کریں",du1mod3Desc:"مشق کرنے کے لیے ایک موضوع منتخب کریں۔",minHverdag:"میری روزمرہ زندگی",minBolig:"میری رہائش",mitArbejde:"میرا کام",minHverdagDesc:"آپ کی روزمرہ زندگی کے بارے میں کام۔",transportSprogskole:"اسکول تک آمد و رفت",madlavning:"کھانا پکانا",rengoering:"صفائی",transportDesc:"آپ اسکول کیسے جاتے ہیں؟",padletDesc:"کلاس کے ساتھ شیئر کریں کہ آپ آج اسکول کیسے پہنچے۔",padletBtnText:"Padlet کھولیں",madlavningDesc:"آپ کو کھانا پکانے میں کیا پسند ہے؟",madlavningPadletDesc:"اپنی کھانے کی یادیں کلاس کے ساتھ شیئر کریں۔",rengoeringDesc:"آپ صفائی کیسے کرتے ہیں؟",rengoeringPadletDesc:"صفائی کے بارے میں اپنے خیالات کلاس کے ساتھ شیئر کریں۔",traenTidsudtryk:"وقت کے اظہار کی مشق",traenTidsudtrykDesc:"دانش میں وقت کے مختلف اظہار کیسے استعمال ہوتے ہیں؟",traenTidsudtrykBtnText:"وقت کے اظہار کی مشق کھولیں",ordstilling:"الفاظ کی ترتیب",ordstillingDesc:"الفاظ کو دوبارہ ترتیب دیں اور انہیں صحیح ترتیب میں رکھیں.",checkResult:"جواب چیک کریں",correctOrder:"بہت خوب! ترتیب درست ہے.",wrongOrder:"بالکل درست نہیں. دوبارہ کوشش کریں!",ordstillingLet:"الفاظ کی ترتیب (آسان)",ordstillingSvaer:"الفاظ کی ترتیب (مشکل)",levelA1:"A1 جملے",levelA2:"A2 جملے",traenGrammatik:"گرائمر کی مشق",grammatikDesc:"متن میں خالی جگہوں کو صحیح الفاظ سے پر کریں۔",let:"آسان (A1)",mellemsvaer:"درمیانہ (A2)",svaer:"مشکل (B1)",grammatikIntro:"مشق شروع کرنے کے لیے لیول منتخب کریں۔",checkAnswers:"تمام جوابات چیک کریں",allCorrect:"شاندار! تمام جوابات درست ہیں۔",someWrong:"آپ کے کچھ جوابات بالکل درست نہیں ہیں۔ دوبارہ کوشش کریں!",newExercise:"اگلا متن",hintMean:"اس تناظر میں یہ لفظ معنی نہیں رکھتا.",hintTense:"زمانہ چیک کریں. کیا یہ حال ہے یا ماضی؟",hintForm:"لفظ کی شکل چیک کریں (مثلاً جنس یا واحد/جمع).",hintPerson:"چیک کریں کہ عمل کون کر رہا ہے (میں، آپ، وہ).",hintContext:"پورا متن دوبارہ پڑھیں. یہاں سب سے بہتر کیا ہے؟",hintName:"آپ کو یہاں ناموں کے لیے ایک لفظ کی ضرورت ہے.",hintPlace:"آپ کو یہاں مقامات کے لیے ایک لفظ کی ضرورت ہے.",hintAction:"یہ لفظ ایک مختلف عمل بیان کرتا ہے.",hintAdj:"صفت چیک کریں (کسی چیز کی وضاحت).",hintAdverb:"متعلق فعل چیک کریں (وقت، جگہ یا طریقہ).",hintConj:"حرف عطف چیک کریں (دو جملوں کو جوڑتا ہے).",filled:"بھرا ہوا"},zh:{selectLanguage:"选择语言",title:"丹麦语训练",subtitle:"选择一个类别开始你的训练。",dagensOpgave:"今日任务",dagensOpgaveDesc:"新主题，新语法。完成任务！",modulTest:"模块测试训练",modulTestDesc:"各种任务集中在一起。",notes:"教学笔记",notesDesc:"阅读并练习课堂笔记。",lavSporgsmal:"提问练习",lavSporgsmalDesc:"学习根据图片提出精确的问题。",lavSporgsmalBtnText:"开始提问 - 点击这里",samtaleTraening:"对话训练",samtaleTraeningDesc:"练习对话并获得丹麦语帮助。",skriveHjaelp:"写作助手",skriveHjaelpDesc:"输入你的文本，获得无答案的反馈。",back:"返回",du1mod3:"DU1, 模块 3 和 4",du2mod1:"DU2, 模块 1",du3mod4:"DU3, 模块 4",laerEtNytOrd:"学习一个新单词",laerEtNytOrdDesc:"探索单词在网络中的联系。",wordNetworkExplanation:"单词与其他单词相连。了解单词如何与其他单词联系可以帮助你更好地记住它。",targetWord:"狗",hypernym:"上位词",hypernymWord:"动物",synonym:"同义词",synonymWord:"狗狗",antonym:"反义词",antonymWord:"猫",hyponym:"下位词",hyponymWord:"贵宾犬",geminiBtnText:"学习单词 - 点击这里",geminiConsentText:"点击此链接即表示你同意使用 Google 产品，且 Google 会利用你的回答训练人工智能。",hverdagssamtale:"日常对话",hverdagssamtaleDesc:"练习常见的日常对话。",samtaleBolig:"关于住房的对话",samtaleArbejde:"关于工作的对话",samtaleBtnText:"开始对话 - 点击这里",skriveHjaelpBtnText:"写作助手 - 点击这里",du1mod3Desc:"选择一个主题进行练习。",minHverdag:"我的日常生活",minBolig:"我的住房",mitArbejde:"我的工作",minHverdagDesc:"关于你日常生活的任务。",transportSprogskole:"去语言学校的交通",madlavning:"烹饪",rengoering:"清洁",transportDesc:"你怎么去学校？",padletDesc:"与全班分享你今天如何去学校。",padletBtnText:"打开 Padlet",madlavningDesc:"你喜欢做什样的食物？",madlavningPadletDesc:"在这里与全班分享你的烹饪经验。",rengoeringDesc:"你如何进行清洁？",rengoeringPadletDesc:"与全班分享你对清洁的看法。",traenTidsudtryk:"练习时间表达",traenTidsudtrykDesc:"如何在丹麦语中使用不同的时间表达？",traenTidsudtrykBtnText:"打开时间表达练习",ordstilling:"词序练习",ordstillingDesc:"重新排列单词，并将它们按正确的顺序排列。",checkResult:"检查答案",correctOrder:"太棒了！顺序正确。",wrongOrder:"不完全正确。再试一次！",ordstillingLet:"词序 (简单)",ordstillingSvaer:"词序 (困难)",levelA1:"A1 句子",levelA2:"A2 句子",traenGrammatik:"练习语法",grammatikDesc:"在文本的空格处填入正确的单词。",let:"简单 (A1)",mellemsvaer:"中等 (A2)",svaer:"困难 (B1)",grammatikIntro:"选择等级开始练习。",checkAnswers:"检查所有答案",allCorrect:"太棒了！所有答案都正确。",someWrong:"你的某些答案不完全正确。再试一次！",newExercise:"下一篇",hintMean:"这个词在这种语境下没有意义。",hintTense:"检查时态。是现在时还是过去时？",hintForm:"检查单词形式（例如：性别或单复数）。",hintPerson:"检查谁在执行动作（我、你、他/她）。",hintContext:"重新阅读全文。这里最适合什么？",hintName:"你需要一个关于名字的词。",hintPlace:"你需要一个关于地点的词。",hintAction:"这个词描述的是另一种动作。",hintAdj:"检查形容词（描述事物的词）。",hintAdverb:"检查副词（时间、地点或方式）。",hintConj:"检查连词（连接两个句子）。",filled:"已填写"},ru:{selectLanguage:"Выберите язык",title:"Изучение датского",subtitle:"Выберите категорию, чтобы начать обучение.",dagensOpgave:"Задание дня",dagensOpgaveDesc:"Новая тема, новая грамматика. Решите задачу!",modulTest:"Подготовка к тесту",modulTestDesc:"Различные задания, собранные в одном месте.",notes:"Конспекты занятий",notesDesc:"Читайте и практикуйте заметки с уроков.",lavSporgsmal:"Составление вопросов",lavSporgsmalDesc:"Научитесь задавать точные вопросы по картинкам.",lavSporgsmalBtnText:"Начать - нажмите здесь",samtaleTraening:"Разговорная практика",samtaleTraeningDesc:"Практикуйте общение и получайте помощь с датским.",skriveHjaelp:"Помощь в письме",skriveHjaelpDesc:"Введите текст и получите отзыв без готовых ответов.",back:"Назад",du1mod3:"DU1, модуль 3 и 4",laerEtNytOrd:"Выучить новое слово",laerEtNytOrdDesc:"Узнайте, как слова связаны в сети.",wordNetworkExplanation:"Слова связаны с другими словами. Это помогает лучше запоминать их.",targetWord:"Собака",hypernym:"Гипероним",hypernymWord:"Животное",synonym:"Синоним",synonymWord:"Пес",antonym:"Антоним",antonymWord:"Кошка",hyponym:"Гипоним",hyponymWord:"Пудель",geminiBtnText:"Выучить слово - нажмите здесь",geminiConsentText:"Нажимая на ссылку, вы соглашаетесь на использование продуктов Google и на то, что Google обучает ИИ на ваших ответах.",hverdagssamtale:"Повседневный разговор",hverdagssamtaleDesc:"Практикуйте обычные разговоры о жизни.",samtaleBolig:"Разговор о жилье",samtaleArbejde:"Разговор о работе",samtaleBtnText:"Начать разговор - нажмите здесь",skriveHjaelpBtnText:"Помощь в письме - нажмите здесь",du1mod3Desc:"Выберите тему для практики.",minHverdag:"Мои будни",minBolig:"Мое жилье",mitArbejde:"Моя работа",minHverdagDesc:"Задания о вашей повседневной жизни.",transportSprogskole:"Транспорт до школы",madlavning:"Готовка",rengoering:"Уборка",transportDesc:"Как вы добираетесь до школы?",padletDesc:"Поделитесь с классом, как вы добрались до школы сегодня.",padletBtnText:"Открыть Padlet",madlavningDesc:"Какую еду вы любите готовить?",madlavningPadletDesc:"Поделитесь своим кулинарным опытом с классом.",rengoeringDesc:"Как вы делаете уборку?",rengoeringPadletDesc:"Поделитесь своими мыслями об уборке с классом.",traenTidsudtryk:"Практика временных выражений",traenTidsudtrykDesc:"Как использовать различные временные выражения в датском?",traenTidsudtrykBtnText:"Открыть упражнение",ordstilling:"Порядок слов",ordstillingDesc:"Переставьте слова и расположите их в правильном порядке.",checkResult:"Проверить ответ",correctOrder:"Отлично! Порядок правильный.",wrongOrder:"Не совсем верно. Попробуйте еще раз!",ordstillingLet:"Порядок слов (Легко)",ordstillingSvaer:"Порядок слов (Сложно)",levelA1:"Предложения A1",levelA2:"Предложения A2",traenGrammatik:"Практика грамматики",grammatikDesc:"Заполните пропуски в тексте правильными словами.",let:"Легко (A1)",mellemsvaer:"Средне (A2)",svaer:"Сложно (B1)",grammatikIntro:"Выберите уровень, чтобы начать упражнение.",checkAnswers:"Проверить все ответы",allCorrect:"Фантастика! Все ответы верны.",someWrong:"Некоторые ваши ответы не совсем верны. Попробуйте еще раз!",newExercise:"Следующий текст",hintMean:"Это слово не имеет смысла в данном контексте.",hintTense:"Проверьте время. Это настоящее или прошедшее?",hintForm:"Проверьте форму слова (например, род или число).",hintPerson:"Проверьте, кто совершает действие (я, ты, он/она).",hintContext:"Прочитайте весь текст еще раз. Что здесь лучше всего подходит?",hintName:"Здесь нужно слово для имен.",hintPlace:"Здесь нужно слово для мест.",hintAction:"Это слово описывает другое действие.",hintAdj:"Проверьте прилагательное (описание предмета).",hintAdverb:"Проверьте наречие (время, место или образ действия).",hintConj:"Проверьте союз (соединяет два предложения).",filled:"заполнено"},ne:{selectLanguage:"भाषा छान्नुहोस्",title:"डेनिस प्रशिक्षण",subtitle:"प्रशिक्षण सुरु गर्न एक श्रेणी छान्नुहोस्।",dagensOpgave:"आजको कार्य",dagensOpgaveDesc:"नयाँ विषय, नयाँ व्याकरण। कार्य समाधान गर्नुहोस्!",modulTest:"मोड्युल परीक्षण प्रशिक्षण",modulTestDesc:"विभिन्न कार्यहरू एकै ठाउँमा संकलन गरिएको।",notes:"शिक्षण नोटहरू",notesDesc:"कक्षाबाट नोटहरू पढ्नुहोस् र अभ्यास गर्नुहोस्।",lavSporgsmal:"प्रश्नहरू बनाउनुहोस्",lavSporgsmalDesc:"चित्रहरूको आधारमा सटीक प्रश्नहरू सोध्न सिक्नुहोस्।",lavSporgsmalBtnText:"प्रश्नहरू बनाउनुहोस् - यहाँ क्लिक गर्नुहोस्",samtaleTraening:"कुराकानी प्रशिक्षण",samtaleTraeningDesc:"आफ्नो कुराकानी अभ्यास गर्नुहोस् र डेनिस भाषामा मद्दत लिनुहोस्।",skriveHjaelp:"लेखन मद्दत",skriveHjaelpDesc:"आफ्नो पाठ प्रविष्ट गर्नुहोस् र जवाफ बिना प्रतिक्रिया प्राप्त गर्नुहोस्।",back:"फिर्ता",du1mod3:"DU1, मोड्युल ३ र ४",laerEtNytOrd:"नयाँ शब्द सिक्नुहोस्",laerEtNytOrdDesc:"शब्दहरू नेटवर्कमा कसरी जोडिएका छन् पत्ता लगाउनुहोस्।",wordNetworkExplanation:"शब्दहरू अन्य शब्दहरूसँग जोडिएका हुन्छन्। शब्द कसरी जोडिएको छ थाहा पाउँदा सम्झन सजिलो हुन्छ।",targetWord:"कुकुर",hypernym:"माथिल्लो शब्द",hypernymWord:"जनावर",synonym:"पर्यायवाची",synonymWord:"कुकुर (vovse)",antonym:"विपरीतार्थी",antonymWord:"बिरालो",hyponym:"तल्लो शब्द",hyponymWord:"पुडल",geminiBtnText:"शब्द सिक्नुहोस् - यहाँ थिच्नुहोस्",geminiConsentText:"यो लिङ्कमा क्लिक गरेर, तपाईं गुगल उत्पादन प्रयोग गर्न र गुगलले तपाईंको जवाफबाट एआईलाई तालिम दिन सहमत हुनुहुन्छ।",hverdagssamtale:"दैनिक कुराकानी",hverdagssamtaleDesc:"सामान्य दैनिक कुराकानी अभ्यास गर्नुहोस्।",samtaleBolig:"आवासको बारेमा कुराकानी",samtaleArbejde:"कामको बारेमा कुराकानी",samtaleBtnText:"कुराकानी सुरु गर्नुहोस् - यहाँ क्लिक गर्नुहोस्",skriveHjaelpBtnText:"लेखन मद्दत - यहाँ क्लिक गर्नुहोस्",du1mod3Desc:"अभ्यास गर्न विषय छान्नुहोस्।",minHverdag:"मेरो दैनिक जीवन",minBolig:"मेरो आवास",mitArbejde:"मेरो काम",minHverdagDesc:"तपाईंको दैनिक जीवनको बारेमा कार्यहरू।",transportSprogskole:"स्कूल सम्मको यातायात",madlavning:"खाना पकाउने",rengoering:"सरसफाई",transportDesc:"तपाईं स्कूल कसरी जानुहुन्छ?",padletDesc:"तपाईं आज स्कूल कसरी पुग्नुभयो कक्षामा साझा गर्नुहोस्।",padletBtnText:"Padlet खोल्नुहोस्",madlavningDesc:"तपाईंलाई कस्तो खाना पकाउन मन पर्छ?",madlavningPadletDesc:"तपाईंको खाना पकाउने अनुभव कक्षामा साझा गर्नुहोस्।",rengoeringDesc:"तपाई सरसफाई कसरी गर्नुहुन्छ?",rengoeringPadletDesc:"सरसफाईको बारेमा आफ्नो विचार साझा गर्नुहोस्।",traenTidsudtryk:"समय अभिव्यक्ति अभ्यास",traenTidsudtrykDesc:"डेनिसमा विभिन्न समय अभिव्यक्तिहरू कसरी प्रयोग गर्ने?",traenTidsudtrykBtnText:"समय अभिव्यक्ति अभ्यास खोल्नुहोस्",ordstilling:"शब्द क्रम",ordstillingDesc:"शब्दहरूलाई पुन: व्यवस्थित गर्नुहोस् र तिनीहरूलाई सही क्रममा राख्नुहोस्।",checkResult:"उत्तर जाँच गर्नुहोस्",correctOrder:"उत्कृष्ट! क्रम सही छ।",wrongOrder:"पुरै सही छैन। फेरि प्रयास गर्नुहोस्!",ordstillingLet:"शब्द क्रम (सजिलो)",ordstillingSvaer:"शब्द क्रम (कठिन)",levelA1:"A1 वाक्यहरू",levelA2:"A2 वाक्यहरू",traenGrammatik:"व्याकरण अभ्यास",grammatikDesc:"पाठका खाली ठाउँहरूमा सही शब्दहरू भर्नुहोस्।",let:"सजिलो (A1)",mellemsvaer:"मध्यम (A2)",svaer:"कठिन (B1)",grammatikIntro:"अभ्यास सुरु गर्न एक स्तर छान्नुहोस्।",checkAnswers:"सबै उत्तरहरू जाँच गर्नुहोस्",allCorrect:"शानदार! सबै उत्तरहरू सही छन्।",someWrong:"तपाईका केही उत्तरहरू पूर्ण रूपमा सही छैनन्। फेरि प्रयास गर्नुहोस्!",newExercise:"अर्को पाठ",hintMean:"यो शब्द यस सन्दर्भमा अर्थहीन छ।",hintTense:"काल जाँच गर्नुहोस्। यो वर्तमान हो कि भूत?",hintForm:"शब्दको रूप जाँच गर्नुहोस् (जस्तै लिङ्ग वा एकवचन/बहुवचन)।",hintPerson:"कार्य कसले गरिरहेको छ जाँच गर्नुहोस् (म, तिमी, उ/उनी)।",hintContext:"फेरि पूरा पाठ पढ्नुहोस्। यहाँ सबैभन्दा उपयुक्त के हुन्छ?",hintName:"तपाईंलाई यहाँ नामका लागि शब्द चाहिन्छ।",hintPlace:"तपाईंलाई यहाँ ठाउँका लागि शब्द चाहिन्छ।",hintAction:"यो शब्दले अर्कै कार्यलाई वर्णन गर्दछ।",hintAdj:"विशेषण जाँच गर्नुहोस् (चीजको विवरण)।",hintAdverb:"क्रियाविशेषण जाँच गर्नुहोस् (समय, स्थान वा तरिका)।",hintConj:"संयोजक जाँच गर्नुहोस् (दुईवटा वाक्यहरू जोड्छ)।",filled:"भरिएको"},th:{selectLanguage:"เลือกภาษา",title:"ฝึกภาษาเดนมาร์ก",subtitle:"เลือกหมวดหมู่เพื่อเริ่มการฝึกฝนของคุณ",dagensOpgave:"ภารกิจวันนี้",dagensOpgaveDesc:"หัวข้อใหม่ ไวยากรณ์ใหม่ แก้ปัญหาเลย!",modulTest:"ฝึกทำข้อสอบโมดูล",modulTestDesc:"รวบรวมงานต่างๆ ไว้ในที่เดียว",notes:"โน้ตการเรียน",notesDesc:"อ่านและฝึกฝนโน้ตจากทางห้องเรียน",lavSporgsmal:"สร้างคำถาม",lavSporgsmalDesc:"เรียนรู้การตั้งคำถามที่แม่นยำจากรูปภาพ",lavSporgsmalBtnText:"สร้างคำถาม - คลิกที่นี่",samtaleTraening:"ฝึกสนทนา",samtaleTraeningDesc:"ฝึกฝนการสนทนาและรับความช่วยเหลือเกี่ยวกับภาษาเดนมาร์ก",skriveHjaelp:"ตัวช่วยเขียน",skriveHjaelpDesc:"ใส่ข้อความของคุณและรับข้อเสนอแนะโดยไม่มีคำตอบ",back:"กลับ",du1mod3:"DU1, โมดูล 3 และ 4",laerEtNytOrd:"เรียนรู้คำศัพท์ใหม่",laerEtNytOrdDesc:"สำรวจความเชื่อมโยงของคำในเครือข่าย",wordNetworkExplanation:"คำศัพท์เชื่อมโยงกับคำอื่นๆ จะช่วยให้จำได้ดีขึ้นเมื่อรู้ความเชื่อมโยง",targetWord:"สุนัข",hypernym:"คำนามหลัก",hypernymWord:"สัตว์",synonym:"คำไวพจน์",synonymWord:"เจ้าตูบ",antonym:"คำตรงข้าม",antonymWord:"แมว",hyponym:"คำประเภทย่อย",hyponymWord:"พุดเดิ้ล",geminiBtnText:"เรียนรู้คำศัพท์ - กดที่นี่",geminiConsentText:"การคลิกที่ลิงก์นี้แสดงว่าคุณตกลงที่จะใช้ผลิตภัณฑ์ของ Google และให้ Google ฝึก AI ด้วยคำตอบของคุณ",hverdagssamtale:"สนทนาในชีวิตประจำวัน",hverdagssamtaleDesc:"ฝึกบทสนทนาทั่วไปเกี่ยวกับชีวิตประจำวัน",samtaleBolig:"คุยเรื่องที่อยู่อาศัย",samtaleArbejde:"คุยเรื่องงาน",samtaleBtnText:"เริ่มการสนทนา - กดที่นี่",skriveHjaelpBtnText:"ตัวช่วยเขียน - กดที่นี่",du1mod3Desc:"เลือกหัวข้อที่จะฝึกฝน",minHverdag:"ชีวิตประจำวันของฉัน",minBolig:"บ้านของฉัน",mitArbejde:"งานของฉัน",minHverdagDesc:"งานเกี่ยวกับชีวิตประจำวันของคุณ",transportSprogskole:"การเดินทางไปโรงเรียน",madlavning:"การทำอาหาร",rengoering:"การทำความสะอาด",transportDesc:"คุณมาโรงเรียนอย่างไร?",padletDesc:"แบ่งปันวิธีการมาโรงเรียนของคุณในวันนี้กับเพื่อนในห้อง",padletBtnText:"เปิด Padlet",madlavningDesc:"คุณชอบทำอาหารประเภทไหน?",madlavningPadletDesc:"แบ่งปันประสบการณ์การทำอาหารของคุณที่นี่",rengoeringDesc:"คุณทำความสะอาดอย่างไร?",rengoeringPadletDesc:"แบ่งปันความคิดเรื่องการทำความสะอาดกับเพื่อนในห้อง",traenTidsudtryk:"ฝึกการบอกเวลา",traenTidsudtrykDesc:"วิธีการใช้สำนวนเกี่ยวกับเวลาในภาษาเดนมาร์ก",traenTidsudtrykBtnText:"เปิดแบบฝึกหัดการบอกเวลา",ordstilling:"การเรียงลำดับคำ",ordstillingDesc:"จัดเรียงคำใหม่และวางตามลำดับที่ถูกต้อง",checkResult:"ตรวจคำตอบ",correctOrder:"ยอดเยี่ยม! ลำดับถูกต้อง",wrongOrder:"ยังไม่ถูกต้อง ลองอีกครั้ง!",ordstillingLet:"การเรียงลำดับคำ (ง่าย)",ordstillingSvaer:"การเรียงลำดับคำ (ยาก)",levelA1:"ประโยค A1",levelA2:"ประโยค A2",traenGrammatik:"ฝึกไวยากรณ์",grammatikDesc:"เติมคำที่ถูกต้องลงในช่องว่างในเนื้อข้อความ",let:"ง่าย (A1)",mellemsvaer:"ปานกลาง (A2)",svaer:"ยาก (B1)",grammatikIntro:"เลือกระดับเพื่อเริ่มแบบฝึกหัด",checkAnswers:"ตรวจคำตอบทั้งหมด",allCorrect:"สุดยอด! ทุกคำตอบถูกต้อง",someWrong:"คำตอบบางคำไม่ค่อยถูกต้อง ลองอีกครั้ง!",newExercise:"ข้อความถัดไป",hintMean:"คำนี้ไม่มีความหมายในบริบทนี้",hintTense:"ตรวจสอบกาล (Tense) เป็นปัจจุบันหรืออดีต?",hintForm:"ตรวจสอบรูปของคำ (เช่น เพศ หรือ เอกพจน์/พหูพจน์)",hintPerson:"ตรวจสอบว่าใครเป็นคนทำกริยานั้น (ฉัน, คุณ, เขา/เธอ)",hintContext:"อ่านข้อความทั้งหมดอีกครั้ง อะไรเหมาะที่สุดตรงนี้?",hintName:"คุณต้องการคำเรียกชื่อตรงนี้",hintPlace:"คุณต้องการคำระบุสถานที่ตรงนี้",hintAction:"คำนี้อธิบายการกระทำที่ต่างออกไป",hintAdj:"ตรวจสอบคำคุณศัพท์ (การบรรยายสิ่งของ)",hintAdverb:"ตรวจสอบคำวิเศษณ์ (เวลา สถานที่ หรืออาการ)",hintConj:"ตรวจสอบคำสันธาน (คำเชื่อมประโยค)",filled:"เติมแล้ว"},pt:{selectLanguage:"Escolher idioma",title:"Treino de Dinamarquês",subtitle:"Escolha uma categoria para começar o seu treino.",dagensOpgave:"Tarefa do Dia",dagensOpgaveDesc:"Novo tópico, nova gramática. Resolva a tarefa!",modulTest:"Treino para Teste de Módulo",modulTestDesc:"Várias tarefas reunidas num só lugar.",notes:"Notas de Aula",notesDesc:"Leia e pratique com as notas das aulas.",lavSporgsmal:"Criar Perguntas",lavSporgsmalDesc:"Aprenda a fazer perguntas precisas com base em imagens.",lavSporgsmalBtnText:"Criar perguntas - clique aqui",samtaleTraening:"Treino de Conversação",samtaleTraeningDesc:"Pratique as suas conversas e obtenha ajuda com o seu dinamarquês.",skriveHjaelp:"Ajuda na Escrita",skriveHjaelpDesc:"Insira o seu texto e obtenha feedback sem respostas.",back:"Voltar",du1mod3:"DU1, módulo 3 e 4",laerEtNytOrd:"Aprender uma palavra nova",laerEtNytOrdDesc:"Explore como as palavras se ligam em redes.",wordNetworkExplanation:"As palavras estão ligadas a outras palavras. Ajuda a lembrar-se muito melhor quando sabe as ligações.",targetWord:"Cão",hypernym:"Hiperónimo",hypernymWord:"Animal",synonym:"Sinónimo",synonymWord:"Cachorro",antonym:"Antónimo",antonymWord:"Gato",hyponym:"Hipónimo",hyponymWord:"Poodle",geminiBtnText:"Aprender uma palavra - prima aqui",geminiConsentText:"Ao clicar neste link, concorda em usar um produto da Google e que a Google treine inteligência artificial com as suas respostas.",hverdagssamtale:"Conversa do dia-a-dia",hverdagssamtaleDesc:"Pratique conversas comuns sobre o quotidiano.",samtaleBolig:"Conversa sobre habitação",samtaleArbejde:"Conversa sobre trabalho",samtaleBtnText:"Começar conversa - clicar aqui",skriveHjaelpBtnText:"Ajuda na escrita - clicar aqui",du1mod3Desc:"Escolha um tópico para praticar.",minHverdag:"O meu dia-a-dia",minBolig:"A minha casa",mitArbejde:"O meu trabalho",minHverdagDesc:"Tarefas sobre a sua rotina diária.",transportSprogskole:"Transporte para a escola",madlavning:"Culinária",rengoering:"Limpeza",transportDesc:"Como vem para a escola?",padletDesc:"Partilhe com a turma como chegou à escola hoje.",padletBtnText:"Abrir Padlet",madlavningDesc:"Que tipo de comida gosta de fazer?",madlavningPadletDesc:"Partilhe as suas experiências culinárias aqui.",rengoeringDesc:"Como faz as limpezas?",rengoeringPadletDesc:"Partilhe os seus pensamentos sobre limpezas.",traenTidsudtryk:"Treino de expressões de tempo",traenTidsudtrykDesc:"Como usar diferentes expressões de tempo em dinamarquês?",traenTidsudtrykBtnText:"Abrir exercício de expressões de tempo",ordstilling:"Ordem das Palavras",ordstillingDesc:"Reorganize as palavras e coloque-as na ordem correta.",checkResult:"Verificar resposta",correctOrder:"Excelente! A ordem está correta.",wrongOrder:"Não está bem. Tente novamente!",ordstillingLet:"Ordem das Palavras (Fácil)",ordstillingSvaer:"Ordem das Palavras (Difícil)",levelA1:"Frases A1",levelA2:"Frases A2",traenGrammatik:"Treinar Gramática",grammatikDesc:"Preencha as lacunas com as palavras corretas no texto.",let:"Fácil (A1)",mellemsvaer:"Médio (A2)",svaer:"Difícil (B1)",grammatikIntro:"Escolha um nível para começar o exercício.",checkAnswers:"Verificar todas as respostas",allCorrect:"Fantástico! Todas as respostas estão corretas.",someWrong:"Algumas das suas respostas não estão totalmente corretas. Tente novamente!",newExercise:"Próximo texto",hintMean:"Esta palavra não faz sentido neste contexto.",hintTense:"Verifique o tempo verbal. É presente ou passado?",hintForm:"Verifique a forma da palavra (ex: gênero ou singular/plural).",hintPerson:"Verifique quem está realizando a ação (eu, você, ele/ela).",hintContext:"Leia todo o texto novamente. O que melhor se encaixa aqui?",hintName:"Você precisa de uma palavra para nomes aqui.",hintPlace:"Você precisa de uma palavra para locais aqui.",hintAction:"Esta palavra descreve uma ação diferente.",hintAdj:"Verifique o adjetivo (descrição de uma coisa).",hintAdverb:"Verifique o advérbio (tempo, lugar ou modo).",hintConj:"Verifique a conjunção (conecta duas frases).",filled:"preenchido"},vi:{selectLanguage:"Chọn ngôn ngữ",title:"Luyện tiếng Đan Mạch",subtitle:"Chọn một danh mục để bắt đầu luyện tập.",dagensOpgave:"Nhiệm vụ hàng ngày",dagensOpgaveDesc:"Chủ đề mới, ngữ pháp mới. Hãy giải nhiệm vụ!",modulTest:"Luyện thi mô-đun",modulTestDesc:"Nhiều nhiệm vụ khác nhau được tập hợp tại một nơi.",notes:"Ghi chú bài giảng",notesDesc:"Đọc và thực hành các ghi chú từ lớp học.",lavSporgsmal:"Đặt câu hỏi",lavSporgsmalDesc:"Học cách đặt câu hỏi chính xác dựa trên hình ảnh.",lavSporgsmalBtnText:"Đặt câu hỏi - bấm vào đây",samtaleTraening:"Luyện hội thoại",samtaleTraeningDesc:"Thực hành hội thoại và nhận trợ giúp về tiếng Đan Mạch.",skriveHjaelp:"Trợ giúp viết",skriveHjaelpDesc:"Nhập văn bản của bạn và nhận phản hồi không có đáp án.",back:"Quay lại",du1mod3:"DU1, mô-đun 3",laerEtNytOrd:"Học một từ mới",laerEtNytOrdDesc:"Khám phá cách các từ kết nối trong mạng lưới.",wordNetworkExplanation:"Các từ được kết nối với các từ khác. Việc biết cách kết nối giúp bạn nhớ từ tốt hơn nhiều.",targetWord:"Con chó",hypernym:"Từ bao nghĩa",hypernymWord:"Động vật",synonym:"Từ đồng nghĩa",synonymWord:"Cún",antonym:"Từ trái nghĩa",antonymWord:"Con mèo",hyponym:"Từ nghĩa hẹp",hyponymWord:"Chó Poodle",geminiBtnText:"Học một từ - nhấn vào đây",geminiConsentText:"Bằng cách nhấp vào liên kết này, bạn đồng ý sử dụng sản phẩm của Google và để Google huấn luyện trí tuệ nhân tạo bằng câu trả lời của bạn.",hverdagssamtale:"Hội thoại hàng ngày",hverdagssamtaleDesc:"Thực hành các cuộc hội thoại thông thường về cuộc sống hàng ngày.",samtaleBolig:"Hội thoại về nhà ở",samtaleArbejde:"Hội thoại về công việc",samtaleBtnText:"Bắt đầu hội thoại - bấm tại đây",skriveHjaelpBtnText:"Trợ giúp viết - bấm tại đây",du1mod3Desc:"Chọn một chủ đề để thực hành.",minHverdag:"Cuộc sống hàng ngày của tôi",minBolig:"Nhà ở của tôi",mitArbejde:"Công việc của tôi",minHverdagDesc:"Các nhiệm vụ về cuộc sống hàng ngày của bạn.",transportSprogskole:"Phương tiện đến trường",madlavning:"Nấu ăn",rengoering:"Dọn dẹp",transportDesc:"Bạn đến trường bằng cách nào?",padletDesc:"Chia sẻ với cả lớp cách bạn đến trường hôm nay.",padletBtnText:"Mở Padlet",madlavningDesc:"Bạn thích nấu món ăn gì?",madlavningPadletDesc:"Chia sẻ kinh nghiệm nấu ăn của bạn với cả lớp tại đây.",rengoeringDesc:"Bạn dọn dẹp như thế nào?",rengoeringPadletDesc:"Chia sẻ suy nghĩ của bạn về việc dọn dẹp với cả lớp.",traenTidsudtryk:"Luyện tập các cụm từ chỉ thời gian",traenTidsudtrykDesc:"Cách sử dụng các cụm từ chỉ thời gian khác nhau trong tiếng Đan Mạch?",traenTidsudtrykBtnText:"Mở bài tập chỉ thời gian",ordstilling:"Trật tự từ",ordstillingDesc:"Sắp xếp lại các từ và đặt chúng theo đúng thứ tự.",checkResult:"Kiểm tra đáp án",correctOrder:"Tuyệt vời! Thứ tự đã đúng.",wrongOrder:"Chưa hoàn toàn đúng. Thử lại nhé!",ordstillingLet:"Trật tự từ (Dễ)",ordstillingSvaer:"Trật tự từ (Khó)",levelA1:"Câu A1",levelA2:"Câu A2",traenGrammatik:"Luyện ngữ pháp",grammatikDesc:"Điền các từ đúng vào chỗ trống trong văn bản.",let:"Dễ (A1)",mellemsvaer:"Trung bình (A2)",svaer:"Khó (B1)",grammatikIntro:"Chọn một cấp độ để bắt đầu bài tập.",checkAnswers:"Kiểm tra tất cả đáp án",allCorrect:"Tuyệt vời! Tất cả đáp án đều đúng.",someWrong:"Một số câu trả lời của bạn chưa hoàn toàn đúng. Thử lại nhé!",newExercise:"Văn bản tiếp theo",hintMean:"Từ này không có ý nghĩa trong ngữ cảnh này.",hintTense:"Kiểm tra thì của động từ. Là hiện tại hay quá khứ?",hintForm:"Kiểm tra hình thức của từ (ví dụ: giống hoặc số ít/số nhiều).",hintPerson:"Kiểm tra ai là người thực hiện hành động (tôi, bạn, anh ấy/cô ấy).",hintContext:"Đọc lại toàn bộ văn bản. Điều gì phù hợp nhất ở đây?",hintName:"Bạn cần một từ cho tên ở đây.",hintPlace:"Bạn cần một từ cho nơi chốn ở đây.",hintAction:"Từ này mô tả một hành động khác."},fa:{selectLanguage:"انتخاب زبان",title:"آموزش دانمارکی",subtitle:"یک دسته را برای شروع تمرین خود انتخاب کنید.",dagensOpgave:"تکلیف روز",dagensOpgaveDesc:"موضوع جدید، گرامر جدید. تکلیف را حل کنید!",modulTest:"تمرین آزمون ماژول",modulTestDesc:"وظایف مختلف در یک جا جمع شده‌اند.",notes:"یادداشت‌های آموزشی",notesDesc:"یادداشت‌های کلاس را بخوانید و تمرین کنید.",lavSporgsmal:"ساخت سوال",lavSporgsmalDesc:"یاد بگیرید بر اساس تصاویر سوالات دقیق بپرسید.",lavSporgsmalBtnText:"ساخت سوال - اینجا کلیک کنید",samtaleTraening:"تمرین مکالمه",samtaleTraeningDesc:"مکالمات خود را تمرین کنید و در زبان دانمارکی کمک بگیرید.",skriveHjaelp:"کمک در نوشتن",skriveHjaelpDesc:"متن خود را وارد کنید و بدون پاسخ، بازخورد بگیرید.",back:"بازگشت",du1mod3:"DU1، ماژول ۳",laerEtNytOrd:"یادگیری یک کلمه جدید",laerEtNytOrdDesc:"کشف کنید که کلمات چگونه در شبکه‌ها به هم متصل هستند.",wordNetworkExplanation:"کلمات به کلمات دیگر متصل هستند. وقتی بدانید کلمه چگونه متصل است، آن را خیلی بهتر به یاد می‌سپارید.",targetWord:"سگ",hypernym:"واژه فراگیر",hypernymWord:"حیوان",synonym:"مترادف",synonymWord:"هاپو",antonym:"متضاد",antonymWord:"گربه",hyponym:"واژه محدودتر",hyponymWord:"پودل",geminiBtnText:"یادگیری کلمه - اینجا کلیک کنید",geminiConsentText:"با کلیک بر روی این لینک، موافقت می‌کنید که از محصولات گوگل استفاده کنید و گوگل هوش مصنوعی را با پاسخ‌های شما آموزش دهد.",hverdagssamtale:"مکالمه روزمره",hverdagssamtaleDesc:"مکالمات معمول درباره زندگی روزمره را تمرین کنید.",samtaleBolig:"مکالمه درباره مسکن",samtaleArbejde:"مکالمه درباره کار",samtaleBtnText:"شروع مکالمه - اینجا کلیک کنید",skriveHjaelpBtnText:"کمک در نوشتن - اینجا کلیک کنید",du1mod3Desc:"یک موضوع را برای تمرین انتخاب کنید.",minHverdag:"زندگی روزمره من",minBolig:"مسکن من",mitArbejde:"کار من",minHverdagDesc:"تکالیفی درباره زندگی روزمره شما.",transportSprogskole:"رفت و آمد به مدرسه زبن",madlavning:"آشپزی",rengoering:"نظافت",transportDesc:"چطور به مدرسه می‌روید؟",padletDesc:"با کلاس در میان بگذارید که امروز چطور به مدرسه رسیدید.",padletBtnText:"باز کردن پدلت",madlavningDesc:"چه نوع غذایی دوست دارید درست کنید؟",madlavningPadletDesc:"تجربیات آشپزی خود را اینجا با کلاس به اشتراک بگذارید.",rengoeringDesc:"چطور نظافت می‌کنید؟",rengoeringPadletDesc:"نظرات خود را درباره نظافت با کلاس در میان بگذارید.",traenTidsudtryk:"تمرین اصطلاحات زمانی",traenTidsudtrykDesc:"چطور از اصطلاحات زمانی مختلف در دانمارکی استفاده کنیم؟",traenTidsudtrykBtnText:"باز کردن تمرین اصطلاحات زمانی",ordstilling:"ترتیب کلمات",ordstillingDesc:"کلمات را دوباره ترتیب دهید و آن‌ها را در جای درست بگذارید.",checkResult:"بررسی پاسخ",correctOrder:"عالی! ترتیب درست است.",wrongOrder:"کاملاً درست نیست. دوباره امتحان کنید!",ordstillingLet:"ترتیب کلمات (آسان)",ordstillingSvaer:"ترتیب کلمات (سخت)",levelA1:"جملات A1",levelA2:"جملات A2",traenGrammatik:"تمرین دستور زبان",grammatikDesc:"جاهای خالی متن را با کلمات درست پر کنید.",let:"آسان (A1)",mellemsvaer:"متوسط (A2)",svaer:"سخت (B1)",grammatikIntro:"یک سطح را برای شروع تمرین انتخاب کنید.",checkAnswers:"بررسی تمام پاسخ‌ها",allCorrect:"عالی! تمام پاسخ‌ها درست هستند.",someWrong:"برخی از پاسخ‌های شما کاملاً درست نیستند. دوباره امتحان کنید!",newExercise:"متن بعدی",hintMean:"این کلمه در این متن معنایی ندارد.",hintTense:"زمان فعل را بررسی کنید. حال است یا گذشته؟",hintForm:"شکل کلمه را بررسی کنید (مثلاً جنسیت یا مفرد/جمع).",hintPerson:"بررسی کنید چه کسی عمل را انجام می‌دهد (من، تو، او).",hintContext:"دوباره کل متن را بخوانید. چه چیزی اینجا بهتر است؟",hintName:"اینجا به کلمه‌ای برای نام‌ها نیاز دارید.",hintPlace:"اینجا به کلمه‌ای برای مکان‌ها نیاز دارید.",hintAction:"این کلمه عمل دیگری را توصیف می‌کند."},tr:{selectLanguage:"Dil seçin",title:"Danca Eğitimi",subtitle:"Eğitiminize başlamak için bir kategori seçin.",dagensOpgave:"Günün Ödevi",dagensOpgaveDesc:"Yeni konu, yeni dilbilgisi. Ödevi çözün!",modulTest:"Modül Testi Eğitimi",modulTestDesc:"Çeşitli görevler tek bir yerde toplandı.",notes:"Ders Notları",notesDesc:"Derslerdeki notları okuyun ve pratik yapın.",lavSporgsmal:"Soru Hazırlama",lavSporgsmalDesc:"Resimlere bakarak kesin sorular sormayı öğrenin.",lavSporgsmalBtnText:"Soru hazırlayın - buraya tıklayın",samtaleTraening:"Konuşma Eğitimi",samtaleTraeningDesc:"Konuşma pratiği yapın ve Dancanız için yardım alın.",skriveHjaelp:"Yazma Yardımı",skriveHjaelpDesc:"Metninizi girin ve cevaplar olmadan geri bildirim alın.",back:"Geri",du1mod3:"DU1, modül 3",du2mod1:"DU2, modül 1",du3mod4:"DU3, modül 4",laerEtNytOrd:"Yeni bir kelime öğrenin",laerEtNytOrdDesc:"Kelimelerin ağlar içinde nasıl bağlandığını keşfedin.",wordNetworkExplanation:"Kelimeler diğer kelimelere bağlıdır. Kelimenin diğer kelimelere nasıl bağlandığını bildiğinizde, kelimeyi çok daha iyi hatırlamanıza yardımcı olur.",targetWord:"Köpek",hypernym:"Üst Terim",hypernymWord:"Hayvan",synonym:"Eşanlamlı",synonymWord:"Köpecik (vovse)",antonym:"Zıt Anlamlı",antonymWord:"Kedi",hyponym:"Alt Terim",hyponymWord:"Kaniş",geminiBtnText:"Kelime öğrenin - buraya tıklayın",geminiConsentText:"Bu bağlantıya tıklayarak bir Google ürünü kullandığınızı ve Google'ın yapay zekayı cevaplarınızla eğittiğini kabul etmiş olursunuz.",hverdagssamtale:"Günlük Konuşma",hverdagssamtaleDesc:"Günlük hayattan yaygın konuşmalar yapın.",samtaleBolig:"Konut hakkında konuşma",samtaleArbejde:"İş hakkında konuşma",samtaleBtnText:"Konuşmayı başlatın - buraya tıklayın",skriveHjaelpBtnText:"Yazma yardımı - buraya tıklayın",du1mod3Desc:"Pratik yapmak için bir konu seçin.",minHverdag:"Günlük hayatım",minBolig:"Konutum",mitArbejde:"İşim",minHverdagDesc:"Günlük hayatınızla ilgili görevler.",transportSprogskole:"Okula ulaşım",madlavning:"Yemek pişirme",rengoering:"Temizlik",transportDesc:"Okula nasıl geliyorsunuz?",padletDesc:"Bugün okula nasıl geldiğinizi sınıfla paylaşın.",padletBtnText:"Padlet'i aç",madlavningDesc:"Hangi yiyecekleri yapmayı seversiniz?",madlavningPadletDesc:"Yemek deneyimlerinizi burada sınıfla paylaşın.",rengoeringDesc:"Temizliği nasıl yaparsınız?",rengoeringPadletDesc:"Temizlikle ilgili düşüncelerinizi sınıfla paylaşın.",traenTidsudtryk:"Zaman ifadeleri çalışması",traenTidsudtrykDesc:"Dancada farklı zaman ifadeleri nasıl kullanılır?",traenTidsudtrykBtnText:"Zaman ifadeleri egzersizini aç",ordstilling:"Kelime Sıralaması",ordstillingDesc:"Kelimeleri yeniden düzenleyin ve doğru sıraya koyun.",checkResult:"Cevabı kontrol et",correctOrder:"Harika! Sıralama doğru.",wrongOrder:"Tam olarak doğru değil. Tekrar deneyin!",ordstillingLet:"Kelime Sıralaması (Kolay)",ordstillingSvaer:"Kelime Sıralaması (Zor)",levelA1:"A1 cümleleri",levelA2:"A2 cümleleri",traenGrammatik:"Gramer Çalışması",grammatikDesc:"Metindeki boşlukları doğru kelimelerle doldurun.",let:"Kolay (A1)",mellemsvaer:"Orta (A2)",svaer:"Zor (B1)",grammatikIntro:"Egzersize başlamak için bir seviye seçin.",checkAnswers:"Tüm cevapları kontrol et",allCorrect:"Harika! Tüm cevaplar doğru.",someWrong:"Bazı cevaplarınız tam olarak doğru değil. Tekrar deneyin!",newExercise:"Sonraki metin",hintMean:"Bu kelime bu bağlamda mantıklı değil.",hintTense:"Zamanı kontrol edin. Şimdiki zaman mı yoksa geçmiş zaman mı?",hintForm:"Kelime biçimini kontrol edin (örneğin cinsiyet veya tekil/çoğul).",hintPerson:"Eylemi kimin yaptığını kontrol edin (ben, sen, o).",hintContext:"Tüm metni tekrar okuyun. Buraya en iyi ne uyar?",hintName:"Burada isimler için bir kelimeye ihtiyacınız var.",hintPlace:"Burada yerler için bir kelimeye ihtiyacınız var.",hintAction:"Bu kelime farklı bir eylemi tanımlıyor."},es:{selectLanguage:"Seleccionar idioma",title:"Entrenamiento de Danés",subtitle:"Selecciona una categoría para empezar tu entrenamiento.",dagensOpgave:"Tarea del día",dagensOpgaveDesc:"Nuevo tema, nueva gramática. ¡Resuelve la tarea!",modulTest:"Entrenamiento para el examen de módulo",modulTestDesc:"Varias tareas reunidas en un solo lugar.",notes:"Notas de clase",notesDesc:"Lee y practica con las notas de las clases.",lavSporgsmal:"Crear preguntas",lavSporgsmalDesc:"Aprende a hacer preguntas precisas a partir de imágenes.",lavSporgsmalBtnText:"Crear preguntas - haz clic aquí",samtaleTraening:"Entrenamiento de conversación",samtaleTraeningDesc:"Practica tus conversaciones y obtén ayuda con tu danés.",skriveHjaelp:"Ayuda con la escritura",skriveHjaelpDesc:"Inserta tu texto y obtén retroalimentación sin respuestas.",back:"Atrás",du1mod3:"DU1, módulo 3",du2mod1:"DU2, módulo 1",du3mod4:"DU3, módulo 4",laerEtNytOrd:"Aprender una palabra nueva",laerEtNytOrdDesc:"Explora cómo se conectan las palabras en redes.",wordNetworkExplanation:"Las palabras están conectadas con otras palabras. Ayuda a recordar la palabra mucho mejor cuando sabes cómo se conecta con otras palabras.",targetWord:"Perro",hypernym:"Hiperónimo",hypernymWord:"Animal",synonym:"Sinónimo",synonymWord:"Perrito (vovse)",antonym:"Antónimo",antonymWord:"Gato",hyponym:"Hipónimo",hyponymWord:"Caniche",geminiBtnText:"Aprender una palabra - haz clic aquí",geminiConsentText:"Al hacer clic en este enlace, aceptas que estás utilizando un producto de Google y que Google entrena la inteligencia artificial con tus respuestas.",hverdagssamtale:"Conversación diaria",hverdagssamtaleDesc:"Practica conversaciones comunes sobre la vida diaria.",samtaleBolig:"Conversación sobre vivienda",samtaleArbejde:"Conversación sobre trabajo",samtaleBtnText:"Empezar la conversación - haz clic aquí",skriveHjaelpBtnText:"Ayuda con la escritura - haz clic aquí",du1mod3Desc:"Elige un tema para practicar.",minHverdag:"Mi vida diaria",minBolig:"Mi vivienda",mitArbejde:"Mi trabajo",minHverdagDesc:"Tareas sobre tu vida cotidiana.",transportSprogskole:"Transporte a la escuela",madlavning:"Cocina",rengoering:"Limpieza",transportDesc:"¿Cómo vienes a la escuela?",padletDesc:"Comparte con la clase cómo has llegado a la escuela hoy.",padletBtnText:"Abrir Padlet",madlavningDesc:"¿Qué tipo de comida te gusta cocinar?",madlavningPadletDesc:"Comparte tus experiencias culinarias con la clase aquí.",rengoeringDesc:"¿Cómo haces la limpieza?",rengoeringPadletDesc:"Comparte tus pensamientos sobre la limpieza con la clase.",traenTidsudtryk:"Entrenamiento de expresiones de tiempo",traenTidsudtrykDesc:"¿Cómo se usan las diferentes expresiones de tiempo en danés?",traenTidsudtrykBtnText:"Abrir ejercicio de expresiones de tiempo",ordstilling:"Orden de las palabras",ordstillingDesc:"Reorganiza las palabras y ponlas en el orden correcto.",checkResult:"Comprobar respuesta",correctOrder:"¡Genial! El orden es correcto.",wrongOrder:"No es correcto. ¡Inténtalo de nuevo!",ordstillingLet:"Orden de las palabras (Fácil)",ordstillingSvaer:"Orden de las palabras (Difícil)",levelA1:"Frases A1",levelA2:"Frases A2",traenGrammatik:"Practicar Gramática",grammatikDesc:"Completa los huecos con las palabras correctas en el texto.",let:"Fácil (A1)",mellemsvaer:"Intermedio (A2)",svaer:"Difícil (B1)",grammatikIntro:"Selecciona un nivel para comenzar el ejercicio.",checkAnswers:"Comprobar todas las respuestas",allCorrect:"¡Fantástico! Todas las respuestas son correctas.",someWrong:"Algunas de tus respuestas no son del todo correctas. ¡Inténtalo de nuevo!",newExercise:"Siguiente texto",hintMean:"Esta palabra no tiene sentido en este contexto.",hintTense:"Comprueba el tiempo verbal. ¿Es presente o pasado?",hintForm:"Comprueba la forma de la palabra (p. ej., género o singular/plural).",hintPerson:"Comprueba quién realiza la acción (yo, tú, él/ella).",hintContext:"Lee todo el texto de nuevo. ¿Qué encaja mejor aquí?",hintName:"Necesitas una palabra para nombres aquí.",hintPlace:"Necesitas una palabra para lugares aquí.",hintAction:"Esta palabra describe una acción diferente."}},H={lang:localStorage.getItem("appLang")||null,currentView:"language"};function Q(){return H.lang||"da"}function n(u){const d=U[Q()];return d&&d[u]?d[u]:U.da[u]||u}function Z(u){H.lang=u,localStorage.setItem("appLang",u)}function X(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("h1");c.textContent="Træning i dansk";const t=document.createElement("p");t.className="subtitle",t.textContent="Vælg sprog / Select language";const p=document.createElement("div");p.className="lang-list",[{code:"da",label:"Dansk"},{code:"en",label:"English"},{code:"ar",label:"العربية"},{code:"ur",label:"اردو"},{code:"zh",label:"中文"},{code:"ru",label:"Русский"},{code:"ne",label:"नेपाली"},{code:"th",label:"ไทย"},{code:"pt",label:"Português"},{code:"vi",label:"Tiếng Việt"},{code:"fa",label:"فارسی"},{code:"tr",label:"Türkçe"},{code:"es",label:"Español"}].forEach(i=>{const o=document.createElement("button");o.className="lang-btn",o.textContent=i.label,o.onclick=()=>{Z(i.code),d("main")},p.appendChild(o)}),e.appendChild(c),e.appendChild(t),e.appendChild(p),u.appendChild(e)}function ee(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("h1");c.textContent=n("title");const t=document.createElement("p");t.className="subtitle",t.textContent=n("subtitle");const p=document.createElement("div");p.className="top-bar",p.style.justifyContent="flex-end",p.style.marginBottom="20px";const s=document.createElement("button");s.className="back-btn",s.textContent="🌐 "+n("selectLanguage"),s.onclick=()=>d("language"),p.appendChild(s);const i=[{icon:"✨",titleKey:"dagensOpgave",descKey:"dagensOpgaveDesc",action:()=>d("dagens_opgave")},{icon:"🎓",titleKey:"modulTest",descKey:"modulTestDesc",action:()=>alert("Mock: Gå til Træning til modultest")},{icon:"📘",titleKey:"notes",descKey:"notesDesc",action:()=>d("notes")},{icon:"💬",titleKey:"lavSporgsmal",descKey:"lavSporgsmalDesc",action:()=>d("lav_sporgsmal")},{icon:"🗣️",titleKey:"samtaleTraening",descKey:"samtaleTraeningDesc",action:()=>d("samtale_traening")},{icon:"✍️",titleKey:"skriveHjaelp",descKey:"skriveHjaelpDesc",action:()=>d("skrive_hjaelp")},{icon:"🏃",titleKey:"verbumLearning",descKey:"verbumLearningDesc",action:()=>d("verbum_learning")}],o=document.createElement("div");o.className="grid",i.forEach(l=>{const m=document.createElement("div");m.className="card",m.onclick=l.action;const r=document.createElement("div");r.className="card-icon",r.textContent=l.icon;const g=document.createElement("div");g.className="card-title",g.textContent=n(l.titleKey);const b=document.createElement("div");b.className="card-desc",b.textContent=n(l.descKey),m.appendChild(r),m.appendChild(g),m.appendChild(b),o.appendChild(m)});const a=document.createElement("footer");a.innerHTML='© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.',e.appendChild(p),e.appendChild(c),e.appendChild(t),e.appendChild(o),e.appendChild(a),u.appendChild(e)}function te(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("main"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("notes");const s=document.createElement("p");s.className="subtitle",s.textContent=n("notesDesc");const i=(m,r,g)=>{if(localStorage.getItem(`access_${m}`)===g){d(r);return}const v=prompt(n("enterPassword"));v===g?(localStorage.setItem(`access_${m}`,g),d(r)):v!==null&&alert("Forkert adgangskode / Incorrect password")},o=[{icon:"📓",titleKey:"du1mod3",descKey:"",action:()=>i("du1_mod3","du1_modul3","dansk103")},{icon:"📖",titleKey:"du2mod1",descKey:"",action:()=>i("du2_mod1","du2_modul1","dansk307")},{icon:"📂",titleKey:"du2mod5",descKey:"",action:()=>d("du2_modul5")},{icon:"📚",titleKey:"du3mod4",descKey:"",action:()=>alert("Mock: Åbner DU3, modul 4")}],a=document.createElement("div");a.className="grid",o.forEach(m=>{const r=document.createElement("div");r.className="card",r.onclick=m.action;const g=document.createElement("div");g.className="card-icon",g.textContent=m.icon;const b=document.createElement("div");if(b.className="card-title",b.textContent=n(m.titleKey),r.appendChild(g),r.appendChild(b),m.descKey){const v=document.createElement("div");v.className="card-desc",v.textContent=n(m.descKey),r.appendChild(v)}a.appendChild(r)});const l=document.createElement("footer");l.innerHTML='© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.',e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(a),e.appendChild(l),u.appendChild(e)}function ne(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("main"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("dagensOpgave");const s=document.createElement("p");s.className="subtitle",s.textContent=n("dagensOpgaveDesc");const i=[{icon:"🧠",titleKey:"laerEtNytOrd",descKey:"laerEtNytOrdDesc",action:()=>d("word_learning")},{icon:"⏰",titleKey:"traenTidsudtryk",descKey:"traenTidsudtrykDesc",action:()=>d("traen_tidsudtryk")},{icon:"📖",titleKey:"traenGrammatik",descKey:"grammatikDesc",action:()=>d("traen_grammatik")},{icon:"🧩",titleKey:"ordstilling",descKey:"ordstillingDesc",action:()=>d("ordstilling")},{icon:"🫂",titleKey:"hvilketOrd",descKey:"hvilketOrdDesc",action:()=>d("pronomen")},{icon:"🏗️",titleKey:"howToBuildSentence",descKey:"howToBuildSentenceDesc",action:()=>d("grounding")}],o=document.createElement("div");o.className="grid",i.forEach(a=>{const l=document.createElement("div");l.className="card",l.onclick=a.action;const m=document.createElement("div");m.className="card-icon",m.textContent=a.icon;const r=document.createElement("div");if(r.className="card-title",r.textContent=n(a.titleKey),l.appendChild(m),l.appendChild(r),a.descKey){const g=document.createElement("div");g.className="card-desc",g.textContent=n(a.descKey),l.appendChild(g)}o.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(o),u.appendChild(e)}function ae(u,d){const e=document.createElement("div");e.className="view-container word-learning-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("dagens_opgave"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("laerEtNytOrd");const s=document.createElement("div");s.className="semantic-network",[{class:"node center",label:n("targetWord"),hint:""},{class:"node top",label:n("hypernymWord"),hint:n("hypernym")},{class:"node bottom",label:n("hyponymWord"),hint:n("hyponym")},{class:"node left",label:n("synonymWord"),hint:n("synonym")},{class:"node right",label:n("antonymWord"),hint:n("antonym")}].forEach(g=>{const b=document.createElement("div");b.className=g.class;const v=document.createElement("div");if(v.className="word",v.textContent=g.label,b.appendChild(v),g.hint){const A=document.createElement("div");A.className="hint",A.textContent=g.hint,b.appendChild(A)}s.appendChild(b)}),s.insertAdjacentHTML("afterbegin",`
      <svg class="network-lines" xmlns="http://www.w3.org/2000/svg">
        <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
      </svg>
    `);const o=document.createElement("p");o.className="word-explanation",o.textContent=n("wordNetworkExplanation");const a=document.createElement("div");a.className="consent-container";const l=document.createElement("input");l.type="checkbox",l.className="consent-checkbox",l.id="gemini-consent";const m=document.createElement("label");m.htmlFor="gemini-consent",m.className="consent-text",m.textContent=n("geminiConsentText"),a.appendChild(l),a.appendChild(m);const r=document.createElement("a");r.href="https://gemini.google.com/gem/1053Zk0akFAs0u3zMgYkZbtae9CO55Tyb?usp=sharing",r.target="_blank",r.className="gemini-btn disabled",r.textContent=n("geminiBtnText"),l.addEventListener("change",g=>{g.target.checked?r.classList.remove("disabled"):r.classList.add("disabled")}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(o),e.appendChild(a),e.appendChild(r),u.appendChild(e)}function re(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("main"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("samtaleTraening");const s=document.createElement("p");s.className="subtitle",s.textContent=n("samtaleTraeningDesc");const i=[{icon:"🗣",titleKey:"hverdagssamtale",action:()=>d("samtale_hverdag")},{icon:"🏠",titleKey:"samtaleBolig",action:()=>alert("Mock: Åbner "+n("samtaleBolig"))},{icon:"💼",titleKey:"samtaleArbejde",action:()=>alert("Mock: Åbner "+n("samtaleArbejde"))}],o=document.createElement("div");o.className="grid",i.forEach(a=>{const l=document.createElement("div");l.className="card",l.onclick=a.action;const m=document.createElement("div");m.className="card-icon",m.textContent=a.icon;const r=document.createElement("div");r.className="card-title",r.textContent=n(a.titleKey),l.appendChild(m),l.appendChild(r),o.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(o),u.appendChild(e)}function ie(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("samtale_traening"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("hverdagssamtale");const s=document.createElement("p");s.className="subtitle",s.textContent=n("hverdagssamtaleDesc");const i=document.createElement("div");i.className="consent-container",i.style.margin="2rem auto";const o=document.createElement("input");o.type="checkbox",o.className="consent-checkbox",o.id="gemini-consent-samtale";const a=document.createElement("label");a.htmlFor="gemini-consent-samtale",a.className="consent-text",a.textContent=n("geminiConsentText"),i.appendChild(o),i.appendChild(a);const l=document.createElement("div");l.style.textAlign="center";const m=document.createElement("a");m.href="https://gemini.google.com/gem/1SX-yUWDxh31wEL0RZ7BSacdDUvWGtn-8?usp=sharing",m.target="_blank",m.className="gemini-btn disabled",m.textContent=n("samtaleBtnText"),l.appendChild(m),o.addEventListener("change",r=>{r.target.checked?m.classList.remove("disabled"):m.classList.add("disabled")}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),e.appendChild(l),u.appendChild(e)}function oe(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("main"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("skriveHjaelp");const s=document.createElement("p");s.className="subtitle",s.textContent=n("skriveHjaelpDesc");const i=document.createElement("div");i.className="consent-container",i.style.margin="2rem auto";const o=document.createElement("input");o.type="checkbox",o.className="consent-checkbox",o.id="gemini-consent-skrive";const a=document.createElement("label");a.htmlFor="gemini-consent-skrive",a.className="consent-text",a.textContent=n("geminiConsentText"),i.appendChild(o),i.appendChild(a);const l=document.createElement("div");l.style.textAlign="center";const m=document.createElement("a");m.href="https://gemini.google.com/gem/1Ke_Ges6JxMDC51hTM744lHSQm_fi9BhQ?usp=sharing",m.target="_blank",m.className="gemini-btn disabled",m.textContent=n("skriveHjaelpBtnText"),l.appendChild(m),o.addEventListener("change",r=>{r.target.checked?m.classList.remove("disabled"):m.classList.add("disabled")}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),e.appendChild(l),u.appendChild(e)}function se(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("notes"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("du1mod3");const s=document.createElement("p");s.className="subtitle",s.textContent=n("du1mod3Desc");const i=[{icon:"📅",titleKey:"minHverdag",action:()=>d("du1_min_hverdag")},{icon:"🏠",titleKey:"minBolig",action:()=>alert("Mock: Åbner "+n("minBolig"))},{icon:"💼",titleKey:"mitArbejde",action:()=>alert("Mock: Åbner "+n("mitArbejde"))}],o=document.createElement("div");o.className="grid",i.forEach(a=>{const l=document.createElement("div");l.className="card",l.onclick=a.action;const m=document.createElement("div");m.className="card-icon",m.textContent=a.icon;const r=document.createElement("div");r.className="card-title",r.textContent=n(a.titleKey),l.appendChild(m),l.appendChild(r),o.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(o),u.appendChild(e)}function le(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("du1_modul3"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("minHverdag");const s=document.createElement("p");s.className="subtitle",s.textContent=n("minHverdagDesc");const i=[{icon:"🚌",titleKey:"transportSprogskole",action:()=>d("transport_sprogskole")},{icon:"🍳",titleKey:"madlavning",action:()=>d("du1_madlavning")},{icon:"🧹",titleKey:"rengoering",action:()=>d("du1_rengoering")}],o=document.createElement("div");o.className="grid",i.forEach(a=>{const l=document.createElement("div");l.className="card",l.onclick=a.action;const m=document.createElement("div");m.className="card-icon",m.textContent=a.icon;const r=document.createElement("div");r.className="card-title",r.textContent=n(a.titleKey),l.appendChild(m),l.appendChild(r),o.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(o),u.appendChild(e)}function ce(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("du1_min_hverdag"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("transportSprogskole");const s=document.createElement("p");s.className="subtitle",s.textContent=n("transportDesc");const i=document.createElement("div");i.className="transport-content",i.style.display="flex",i.style.flexDirection="column",i.style.alignItems="center",i.style.gap="2rem",i.style.marginTop="2rem",i.style.width="100%";const o=document.createElement("div");o.className="image-container",o.style.width="100%",o.style.maxWidth="600px",o.style.borderRadius="var(--border-radius)",o.style.overflow="hidden",o.style.boxShadow="var(--box-shadow)";const a=document.createElement("img");a.src=`${baseUrl}Gemini_Generated_Image_bnobabnobabnobab.png`,a.alt="Transport illustration",a.style.width="100%",a.style.height="auto",a.style.display="block",o.appendChild(a);const l=document.createElement("div");l.className="padlet-link-container",l.style.width="100%",l.style.maxWidth="600px",l.style.textAlign="center",l.style.backgroundColor="var(--card-bg)",l.style.padding="2rem",l.style.borderRadius="var(--border-radius)",l.style.boxShadow="var(--box-shadow)",l.style.border="1px solid var(--accent-red)";const m=document.createElement("p");m.textContent=n("padletDesc"),m.style.marginBottom="1.5rem",m.style.fontSize="1.2rem";const r=document.createElement("a");r.href="https://padlet.com/mibf/hvordan-kommer-du-til-sprogskole-gm97y985khw1csk1",r.target="_blank",r.className="padlet-btn",r.textContent=n("padletBtnText"),r.style.display="inline-block",r.style.padding="1rem 3rem",r.style.backgroundColor="var(--text-light)",r.style.color="var(--bg-deep-red)",r.style.textDecoration="none",r.style.borderRadius="30px",r.style.fontWeight="700",r.style.fontSize="1.2rem",r.style.transition="all 0.3s ease",r.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",r.onmouseover=()=>{r.style.transform="translateY(-2px)",r.style.boxShadow="0 6px 20px rgba(0,0,0,0.3)",r.style.outline="2px solid var(--text-light)",r.style.outlineOffset="2px"},r.onmouseout=()=>{r.style.transform="translateY(0)",r.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",r.style.outline="none"},l.appendChild(m),l.appendChild(r),i.appendChild(o),i.appendChild(l),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),u.appendChild(e)}function de(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("du1_min_hverdag"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("madlavning");const s=document.createElement("p");s.className="subtitle",s.textContent=n("madlavningDesc");const i=document.createElement("div");i.className="madlavning-content",i.style.display="flex",i.style.flexDirection="column",i.style.alignItems="center",i.style.gap="2rem",i.style.marginTop="2rem",i.style.width="100%";const o=document.createElement("div");o.className="image-container",o.style.width="100%",o.style.maxWidth="600px",o.style.borderRadius="var(--border-radius)",o.style.overflow="hidden",o.style.boxShadow="var(--box-shadow)";const a=document.createElement("img");a.src=`${baseUrl}mad.png`,a.alt="Madlavning illustration",a.style.width="100%",a.style.height="auto",a.style.display="block",o.appendChild(a);const l=document.createElement("div");l.className="padlet-link-container",l.style.width="100%",l.style.maxWidth="600px",l.style.textAlign="center",l.style.backgroundColor="var(--card-bg)",l.style.padding="2rem",l.style.borderRadius="var(--border-radius)",l.style.boxShadow="var(--box-shadow)",l.style.border="1px solid var(--accent-red)";const m=document.createElement("p");m.textContent=n("madlavningPadletDesc"),m.style.marginBottom="1.5rem",m.style.fontSize="1.2rem";const r=document.createElement("a");r.href="https://padlet.com/mibf/b-rn-og-mad-fvyr130ka0n9f2yu",r.target="_blank",r.className="padlet-btn",r.textContent=n("padletBtnText"),r.style.display="inline-block",r.style.padding="1rem 3rem",r.style.backgroundColor="var(--text-light)",r.style.color="var(--bg-deep-red)",r.style.textDecoration="none",r.style.borderRadius="30px",r.style.fontWeight="700",r.style.fontSize="1.2rem",r.style.transition="all 0.3s ease",r.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",r.onmouseover=()=>{r.style.transform="translateY(-2px)",r.style.boxShadow="0 6px 20px rgba(0,0,0,0.3)"},r.onmouseout=()=>{r.style.transform="translateY(0)",r.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)"},l.appendChild(m),l.appendChild(r),i.appendChild(o),i.appendChild(l),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),u.appendChild(e)}function me(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("du1_min_hverdag"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("rengoering");const s=document.createElement("p");s.className="subtitle",s.textContent=n("rengoeringDesc");const i=document.createElement("div");i.className="rengoering-content",i.style.display="flex",i.style.flexDirection="column",i.style.alignItems="center",i.style.gap="2rem",i.style.marginTop="2rem",i.style.width="100%";const o=document.createElement("div");o.style.display="grid",o.style.gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))",o.style.gap="1.5rem",o.style.width="100%",o.style.maxWidth="800px",["rent1.png","rent2.png"].forEach(r=>{const g=document.createElement("div");g.style.borderRadius="var(--border-radius)",g.style.overflow="hidden",g.style.boxShadow="var(--box-shadow)";const b=document.createElement("img");b.src=`${baseUrl}${r}`,b.alt="Rengøring illustration",b.style.width="100%",b.style.height="auto",b.style.display="block",g.appendChild(b),o.appendChild(g)});const a=document.createElement("div");a.className="padlet-link-container",a.style.width="100%",a.style.maxWidth="600px",a.style.textAlign="center",a.style.backgroundColor="var(--card-bg)",a.style.padding="2rem",a.style.borderRadius="var(--border-radius)",a.style.boxShadow="var(--box-shadow)",a.style.border="1px solid var(--accent-red)";const l=document.createElement("p");l.textContent=n("rengoeringPadletDesc"),l.style.marginBottom="1.5rem",l.style.fontSize="1.2rem";const m=document.createElement("a");m.href="https://padlet.com/mibf/jeg-g-r-rent-5udv7g0gczbo7vq9",m.target="_blank",m.className="padlet-btn",m.textContent=n("padletBtnText"),m.style.display="inline-block",m.style.padding="1rem 3rem",m.style.backgroundColor="var(--text-light)",m.style.color="var(--bg-deep-red)",m.style.textDecoration="none",m.style.borderRadius="30px",m.style.fontWeight="700",m.style.fontSize="1.2rem",m.style.transition="all 0.3s ease",m.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",m.onmouseover=()=>{m.style.transform="translateY(-2px)",m.style.boxShadow="0 6px 20px rgba(0,0,0,0.3)"},m.onmouseout=()=>{m.style.transform="translateY(0)",m.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)"},a.appendChild(l),a.appendChild(m),i.appendChild(o),i.appendChild(a),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),u.appendChild(e)}function pe(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("notes"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("du2mod1");const s=document.createElement("p");s.className="subtitle",s.textContent=n("du1mod3Desc");const i=[{icon:"📚",titleKey:"smaahistorier",action:()=>d("smaa_historier")}],o=document.createElement("div");o.className="grid",i.forEach(a=>{const l=document.createElement("div");l.className="card",l.onclick=a.action;const m=document.createElement("div");m.className="card-icon",m.textContent=a.icon;const r=document.createElement("div");r.className="card-title",r.textContent=n(a.titleKey),l.appendChild(m),l.appendChild(r),o.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(o),u.appendChild(e)}function ge(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("du2_modul1"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("smaahistorier");const s=document.createElement("p");s.className="subtitle",s.textContent=n("du1mod3Desc");const i=[{icon:"📝",title:"Lisa og Jens",action:()=>window.open("https://padlet.com/mibf/historie-om-lisa-og-jens-omv7710nz0tnp49","_blank")},{icon:"📝",title:"Andrea",action:()=>window.open("https://padlet.com/mibf/historie-om-andrea-26kzbgxc28yhl436","_blank")}],o=document.createElement("div");o.className="grid",i.forEach(a=>{const l=document.createElement("div");l.className="card",l.onclick=a.action;const m=document.createElement("div");m.className="card-icon",m.textContent=a.icon;const r=document.createElement("div");r.className="card-title",r.textContent=a.title,l.appendChild(m),l.appendChild(r),o.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(o),u.appendChild(e)}function ue(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("notes"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("du2mod5");const s=document.createElement("p");s.className="subtitle",s.textContent=n("du1mod3Desc");const i=[{icon:"📧",titleKey:"emailLaan",action:()=>d("email_laan")},{icon:"👨‍👩‍👧‍👦",titleKey:"opdragelse",action:()=>d("opdragelse")},{icon:"📢",titleKey:"enKlage",action:()=>d("en_klage")}],o=document.createElement("div");o.className="grid",i.forEach(a=>{const l=document.createElement("div");l.className="card",l.onclick=a.action;const m=document.createElement("div");m.className="card-icon",m.textContent=a.icon;const r=document.createElement("div");r.className="card-title",r.textContent=n(a.titleKey),l.appendChild(m),l.appendChild(r),o.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(o),u.appendChild(e)}function he(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("du2_modul5"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("emailLaan");const s=document.createElement("div");s.className="card",s.style.cursor="pointer",s.onclick=()=>window.open("https://padlet.com/mibf/e-mail-om-l-n-af-penge-pkdkrzrhemi6ftc4","_blank");const i=document.createElement("div");i.className="card-icon",i.textContent="📧";const o=document.createElement("div");o.className="card-title",o.textContent=n("emailLaan")+" (padlet)",s.appendChild(i),s.appendChild(o),e.appendChild(c),e.appendChild(p),e.appendChild(s),u.appendChild(e)}function be(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("du2_modul5"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("opdragelse");const s=document.createElement("div");s.className="card",s.style.cursor="pointer",s.onclick=()=>window.open("https://padlet.com/mibf/fort-l-om-hvordan-du-blev-opdraget-se-opgave-16-side-48-i-fo-zhgtyifmg9e4f5ut","_blank");const i=document.createElement("div");i.className="card-icon",i.textContent="👨‍👩‍👧‍👦";const o=document.createElement("div");o.className="card-title",o.textContent=n("opdragelse")+" (padlet)",s.appendChild(i),s.appendChild(o),e.appendChild(c),e.appendChild(p),e.appendChild(s),u.appendChild(e)}function ve(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("du2_modul5"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("enKlage");const s=document.createElement("div");s.className="card",s.style.cursor="pointer",s.onclick=()=>window.open("https://padlet.com/mibf/en-klage-fv80qrahnyjw5e45","_blank");const i=document.createElement("div");i.className="card-icon",i.textContent="📢";const o=document.createElement("div");o.className="card-title",o.textContent=n("enKlage")+" (padlet)",s.appendChild(i),s.appendChild(o),e.appendChild(c),e.appendChild(p),e.appendChild(s),u.appendChild(e)}function ke(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("dagens_opgave"),c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent=n("traenTidsudtryk");const s=document.createElement("p");s.className="subtitle",s.textContent=n("traenTidsudtrykDesc"),e.appendChild(p),e.appendChild(s);const i=[{text:"Jeg drak kaffe [blank_0].",blanks:[{answer:"i morges",options:["i morges","i morgen","nu"],hint:"Se på verbet 'drak'. Er det nutid eller datid?"}]},{text:"Vi drikker vand [blank_0].",blanks:[{answer:"nu",options:["nu","i går","på torsdag"],hint:"Se på verbet 'drikker'. Er det nutid eller datid?"}]},{text:"Han skal til lægen [blank_0].",blanks:[{answer:"i morgen",options:["i morgen","i går","nu"],hint:"Se på verbet 'skal'. Det indikerer noget, der sker senere."}]},{text:"Hun var i biografen [blank_0].",blanks:[{answer:"i går",options:["i går","nu","i næste uge"],hint:"Se på verbet 'var'. Er det nutid eller datid?"}]},{text:"De spiller fodbold [blank_0].",blanks:[{answer:"om søndagen",options:["om søndagen","i går","på fredag"],hint:"Her beskrives noget, man gør hver uge."}]},{text:"Vi rejser til Spanien [blank_0].",blanks:[{answer:"i næste uge",options:["i næste uge","nu","i går"],hint:"Det er en plan for fremtiden."}]},{text:"Jeg læste en bog [blank_0].",blanks:[{answer:"i lørdags",options:["i lørdags","på søndag","i morgen"],hint:"Se på verbet 'læste'. Er det nutid eller datid?"}]},{text:"[blank_0] drikker vi kaffe.",blanks:[{answer:"Om morgenen",options:["Om morgenen","I går","I morgen"],hint:"Vi gør det som en vane hver dag."}]},{text:"[blank_0] var jeg træt.",blanks:[{answer:"I går",options:["I går","Nu","På mandag"],hint:"Se på verbet 'var'. Det er datid."}]},{text:"Jeg køber ind [blank_0].",blanks:[{answer:"i morgen",options:["i morgen","nu","i går"],hint:"Her er tale om en plan for fremtiden."}]},{text:"[blank_0] skal vi på ferie.",blanks:[{answer:"I næste måned",options:["I næste måned","I går","Nu"],hint:"Det er noget, der skal ske i fremtiden."}]},{text:"Vi går en tur [blank_0].",blanks:[{answer:"hver dag",options:["hver dag","i går","i morgen"],hint:"Det er noget, vi gør fast."}]},{text:"[blank_0] drak jeg en øl.",blanks:[{answer:"I fredags",options:["I fredags","Nu","På søndag"],hint:"Se på verbet 'drak'. Det er datid."}]},{text:"[blank_0] skal hun til fest.",blanks:[{answer:"På lørdag",options:["På lørdag","I går","Nu"],hint:"Det er en plan for fremtiden."}]},{text:"De ser fjernsyn [blank_0].",blanks:[{answer:"nu",options:["nu","i går","på torsdag"],hint:"Det foregår lige nu."}]}];let o=0;const a=document.createElement("div");a.className="exercise-card",e.appendChild(a);function l(){a.innerHTML="";const m=i[o],r=document.createElement("div");r.className="exercise-progress",r.style.textAlign="center",r.style.marginBottom="1rem",r.style.fontSize="0.9rem",r.style.opacity="0.7",r.textContent=`${o+1} / ${i.length}`,a.appendChild(r);const g=document.createElement("div");g.className="grammatik-text-container",m.text.split(/(\[blank_\d+\])/).forEach(T=>{const f=T.match(/\[blank_(\d+)\]/);if(f){const E=f[1],D=document.createElement("span");D.className="select-wrapper";const w=document.createElement("select");w.className="grammatik-select",w.dataset.idx=E;const y=document.createElement("option");y.value="",y.textContent="...",w.appendChild(y),m.blanks[E].options.forEach(C=>{const x=document.createElement("option");x.value=C,x.textContent=C,w.appendChild(x)}),D.appendChild(w),g.appendChild(D)}else{const E=document.createElement("span");E.textContent=T,g.appendChild(E)}}),a.appendChild(g);const v=document.createElement("div");v.className="exercise-feedback",a.appendChild(v);const A=document.createElement("div");A.className="game-controls";const h=document.createElement("button");h.className="gemini-btn",h.textContent=n("checkAnswers"),h.onclick=()=>{const T=g.querySelectorAll("select");let f=!0,E="";T.forEach(D=>{const w=D.dataset.idx;D.value===m.blanks[w].answer?(D.classList.add("correct"),D.classList.remove("wrong")):(D.classList.add("wrong"),D.classList.remove("correct"),f=!1,E||(E=m.blanks[w].hint))}),f?(v.style.display="none",h.style.display="none",k.style.display="inline-block"):(v.textContent=E||n("hintContext"),v.style.display="block")};const k=document.createElement("button");k.className="gemini-btn",k.textContent=o<i.length-1?n("next"):n("finish"),k.style.display="none",k.onclick=()=>{o<i.length-1?(o++,l()):d("dagens_opgave")},A.appendChild(h),A.appendChild(k),a.appendChild(A)}l(),u.appendChild(e)}function ye(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("main"),c.appendChild(t);const p=document.createElement("h1");p.textContent=n("lavSporgsmal");const s=document.createElement("p");s.className="subtitle",s.textContent=n("lavSporgsmalDesc");const i=document.createElement("div");i.className="image-container",i.style.width="100%",i.style.maxWidth="600px",i.style.margin="2rem auto",i.style.borderRadius="var(--border-radius)",i.style.overflow="hidden",i.style.boxShadow="var(--box-shadow)";const o=document.createElement("img");o.src=`${q}questions.png`,o.alt="Spørgsmålsdannelse illustration",o.style.width="100%",o.style.height="auto",o.style.display="block",i.appendChild(o);const a=document.createElement("div");a.className="consent-container",a.style.margin="2rem auto";const l=document.createElement("input");l.type="checkbox",l.className="consent-checkbox",l.id="gemini-consent-lav-sporgsmal";const m=document.createElement("label");m.htmlFor="gemini-consent-lav-sporgsmal",m.className="consent-text",m.textContent=n("geminiConsentText"),a.appendChild(l),a.appendChild(m);const r=document.createElement("div");r.style.textAlign="center";const g=document.createElement("a");g.href="https://gemini.google.com/gem/1OKZRFhv_TlP2M32ApMHWsFVh4aCLHdNU?usp=sharing",g.target="_blank",g.className="gemini-btn disabled",g.textContent=n("lavSporgsmalBtnText"),r.appendChild(g),l.addEventListener("change",b=>{b.target.checked?g.classList.remove("disabled"):g.classList.add("disabled")}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),e.appendChild(a),e.appendChild(r),u.appendChild(e)}function xe(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.innerHTML=`← ${n("back")}`,t.onclick=()=>{i.style.display==="block"?(i.style.display="none",s.style.display="block",p.textContent=n("ordstilling")):d("dagens_opgave")},c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent=n("ordstilling"),e.appendChild(p);const s=document.createElement("div"),i=document.createElement("div");i.style.display="none";const o=document.createElement("p");o.className="subtitle",o.textContent=n("ordstillingDesc"),s.appendChild(o);const a=[{key:"let",level:"A1",icon:"🌱"},{key:"mellemsvaer",level:"A2",icon:"🌿"}],l=document.createElement("div");l.className="grid",a.forEach(r=>{const g=document.createElement("div");g.className="card",g.onclick=()=>m(r.level);const b=document.createElement("div");b.className="card-icon",b.textContent=r.icon;const v=document.createElement("div");v.className="card-title",v.textContent=n(r.key),g.appendChild(b),g.appendChild(v),l.appendChild(g)}),s.appendChild(l),e.appendChild(s);function m(r){s.style.display="none",i.style.display="block",i.innerHTML="",p.textContent=n(r==="A1"?"ordstillingLet":"ordstillingSvaer");const v=r==="A1"?["Jeg hedder Mikael.","Jeg kommer fra Danmark.","Hvor gammel er du?","Jeg bor i København.","Hvad laver du?","Jeg har en hund.","Min bil er rød.","Kaffen er varm."]:["Solen skinner altid i min have.","Jeg kan godt lide at lære dansk.","Vi ses i morgen på sprogskolen.","Kan du tale dansk og engelsk?","I går var jeg i biografen med min ven.","Jeg skal købe ind i supermarkedet nu.","Hvorfor kom du ikke til festen?","Det er vigtigt at øve sig hver dag."];let A=Math.floor(Math.random()*v.length),h,k,T,f;function E(){h=v[A],k=h.split(" "),T=[...k].sort(()=>Math.random()-.5),f=[]}const D=document.createElement("div");D.className="result-sentence-area";const w=document.createElement("div");w.className="word-pool";const y=document.createElement("div");y.className="game-feedback";const C=document.createElement("div");C.className="game-controls";const x=document.createElement("button");x.className="gemini-btn",x.textContent=n("checkResult"),x.onclick=()=>{f.join(" ")===h?(y.textContent=n("correctOrder"),y.className="game-feedback success",x.style.display="none",N.style.display="inline-block"):(y.textContent=n("wrongOrder"),y.className="game-feedback error")};const N=document.createElement("button");N.className="gemini-btn",N.textContent="Næste →",N.style.display="none",N.onclick=()=>{A=(A+1)%v.length,B()};function B(){E(),i.innerHTML="";const j=document.createElement("img");j.src=q+"v2_master_diagram.png",j.className="v2-illustration",i.appendChild(j),i.appendChild(D),i.appendChild(w),i.appendChild(y),C.innerHTML="",C.appendChild(x),C.appendChild(N),i.appendChild(C),x.style.display="inline-block",N.style.display="none",y.textContent="",S()}function S(){w.innerHTML="",T.forEach((j,P)=>{const M=document.createElement("div");M.className="word-chip",M.textContent=j,M.onclick=()=>{T.splice(P,1),f.push(j),S()},w.appendChild(M)}),D.innerHTML="",f.length===0?D.innerHTML='<div class="result-placeholder">...</div>':f.forEach((j,P)=>{const M=document.createElement("div");M.className="word-chip result-chip",M.textContent=j,M.onclick=()=>{f.splice(P,1),T.push(j),S()},D.appendChild(M)})}B()}if(e.appendChild(i),u.appendChild(e),!document.getElementById("ordstilling-styles")){const r=document.createElement("style");r.id="ordstilling-styles",r.textContent=`
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
        `,document.head.appendChild(r)}}function fe(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.innerHTML=`← ${n("back")}`,t.onclick=()=>d("main"),c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent=n("traenGrammatik"),e.appendChild(p);const s=document.createElement("div"),i=document.createElement("div");i.style.display="none";const o=document.createElement("p");o.className="subtitle",o.textContent=n("grammatikIntro"),s.appendChild(o);const a=[{key:"let",level:"A1",icon:"🌱"},{key:"mellemsvaer",level:"A2",icon:"🌿"},{key:"svaer",level:"B1",icon:"🌳"},{key:"modultest",level:"modultest",icon:"🎓"}],l=document.createElement("div");l.className="grid",a.forEach(r=>{const g=document.createElement("div");g.className="card",g.onclick=()=>m(r.level);const b=document.createElement("div");b.className="card-icon",b.textContent=r.icon;const v=document.createElement("div");v.className="card-title",v.textContent=n(r.key),g.appendChild(b),g.appendChild(v),l.appendChild(g)}),s.appendChild(l),e.appendChild(s);function m(r){s.style.display="none",i.style.display="block",i.innerHTML="";const g=document.createElement("h2");g.textContent=n(r==="A1"?"let":r==="A2"?"mellemsvaer":r==="B1"?"svaer":"modultest"),g.style.textAlign="center",i.appendChild(g);const b=Ce(r);let v=0;function A(){i.innerHTML="",i.appendChild(g);const h=b[v];if(r==="modultest"){const x=document.createElement("div");x.className="word-list-hint";const B=[...h.blanks.map(S=>S.answer)].sort(()=>Math.random()-.5);x.textContent=B.join(", "),i.appendChild(x)}const k=document.createElement("div");k.className="grammatik-text-container",h.text.split(/(\[blank_\d+\])/).forEach(x=>{const N=x.match(/\[blank_(\d+)\]/);if(N){const B=N[1],S=document.createElement("span");S.className="select-wrapper";const j=document.createElement("select");j.className="grammatik-select",j.dataset.idx=B;const P=document.createElement("option");P.value="",P.textContent="...",j.appendChild(P);let M=[...h.blanks[B].options];M.sort(()=>Math.random()-.5),M.forEach(I=>{const _=document.createElement("option");_.value=I,_.textContent=I,j.appendChild(_)}),S.appendChild(j),k.appendChild(S)}else{const B=document.createElement("span");B.textContent=x,k.appendChild(B)}}),i.appendChild(k);const f=document.createElement("div");f.className="exercise-feedback",i.appendChild(f);const E=document.createElement("div");E.className="grammatik-summary",i.appendChild(E);function D(){const x=k.querySelectorAll("select"),N=Array.from(x).filter(j=>j.value!=="").length,B=Array.from(x).filter(j=>j.classList.contains("correct")).length,S=x.length;N===0?E.textContent="":B===S?(E.innerHTML=`<span class="success">${n("allCorrect")}</span>`,y.style.display="none",C.style.display="block",f.style.display="none"):E.textContent=`${N} / ${S} ${n("filled")||"udfyldt"}`}k.querySelectorAll("select").forEach(x=>{x.onchange=()=>{const N=x.dataset.idx;if(x.value==="")x.classList.remove("correct","wrong"),f.style.display="none";else if(x.value===h.blanks[N].answer)x.classList.add("correct"),x.classList.remove("wrong"),f.style.display="none";else{x.classList.add("wrong"),x.classList.remove("correct");const B=x.value,S=h.blanks[N].hints&&h.blanks[N].hints[B]||"hintContext";f.textContent=n(S),f.style.display="block"}D()}});const w=document.createElement("div");w.className="game-controls";const y=document.createElement("button");y.className="gemini-btn",y.textContent=n("checkAnswers"),y.onclick=()=>{const x=k.querySelectorAll("select");let N=!0,B="";x.forEach(S=>{const j=S.dataset.idx;if(S.value===h.blanks[j].answer)S.classList.add("correct"),S.classList.remove("wrong");else if(S.classList.add("wrong"),S.classList.remove("correct"),N=!1,!B){const P=h.blanks[j].hints&&h.blanks[j].hints[S.value]||"hintContext";B=n(P)}}),!N&&B?(f.textContent=B,f.style.display="block"):N&&(f.style.display="none"),D()};const C=document.createElement("button");C.className="gemini-btn",C.textContent=n("newExercise"),C.style.display="none",C.onclick=()=>{v=(v+1)%b.length,A()},w.appendChild(y),w.appendChild(C),i.appendChild(w),D()}A()}e.appendChild(i),u.appendChild(e)}function Ce(u){return u==="A1"?[{text:"Jeg [blank_0] i København. Jeg har en lille [blank_1]. Her bor jeg sammen med min [blank_2]. Vi [blank_3] ofte mad sammen i køkkenet. Min kone er en rigtig god [blank_4]. Om morgenen [blank_5] vi kaffe. Vi [blank_6] også en avis sammen. Det er en [blank_7] dag i dag. Vi er meget [blank_8] for vores liv.",blanks:[{answer:"bor",options:["bor","spiser","læser"],hints:{spiser:"hintAction",læser:"hintAction"}},{answer:"lejlighed",options:["lejlighed","bil","bord"],hints:{bil:"hintContext",bord:"hintPlace"}},{answer:"kone",options:["kone","ven","hund"],hints:{ven:"hintContext",hund:"hintContext"}},{answer:"laver",options:["laver","drikker","køber"],hints:{drikker:"hintAction",køber:"hintMean"}},{answer:"kok",options:["kok","bog","skole"],hints:{bog:"hintContext",skole:"hintPlace"}},{answer:"drikker",options:["drikker","spiser","ser"],hints:{spiser:"hintMean",ser:"hintAction"}},{answer:"læser",options:["læser","hører","går"],hints:{hører:"hintContext",går:"hintAction"}},{answer:"dejlig",options:["dejlig","sur","kold"],hints:{sur:"hintMean",kold:"hintContext"}},{answer:"glade",options:["glade","trætte","sure"],hints:{trætte:"hintContext",sure:"hintMean"}}]}]:u==="A2"?[{text:"Det er [blank_0] vejr i dag. Solen skinner [blank_1], og vi [blank_2] en tur i den grønne skov. Vi ser mange [blank_3] træer med friske blade. Vi går [blank_4] for at nyde den smukke natur. Fuglene [blank_5] lystigt i trætoppene. Det [blank_6] som om, at sommeren endelig er på vej. Vi [blank_7] os til at spise frokost i det fri bagefter. Det bliver en [blank_8] oplevelse for os alle.",blanks:[{answer:"dejligt",options:["dejligt","langsomt","aldrig"],hints:{langsomt:"hintAdj",aldrig:"hintAdverb"}},{answer:"kraftigt",options:["kraftigt","smukt","ofte"],hints:{smukt:"hintAdj",ofte:"hintAdverb"}},{answer:"går",options:["går","gik","gået"],hints:{gik:"hintTense",gået:"hintTense"}},{answer:"høje",options:["høje","høj","højt"],hints:{høj:"hintForm",højt:"hintForm"}},{answer:"langsomt",options:["langsomt","langsom","hurtig"],hints:{langsom:"hintForm",hurtig:"hintAdj"}},{answer:"synger",options:["synger","sang","sunget"],hints:{sang:"hintTense",sunget:"hintTense"}},{answer:"føles",options:["føles","føler","føltes"],hints:{føler:"hintForm",føltes:"hintTense"}},{answer:"glæder",options:["glæder","glædede","glade"],hints:{glædede:"hintTense",glade:"hintForm"}},{answer:"fantastisk",options:["fantastisk","fantastiske","fantastisket"],hints:{fantastiske:"hintForm",fantastisket:"hintMean"}}]}]:u==="B1"?[{text:"Jeg tager ofte bussen på arbejde, [blank_0] min bil desværre er gået i stykker igen. Selvom det regner [blank_1], foretrækker jeg dog normalt at køre selv. Det er [blank_2] irriterende, da jeg har mange [blank_3] aftaler i løbet af i dag. Jeg [blank_4] dog planlægge min rute [blank_5], så jeg ikke kommer for sent. Heldigvis [blank_6] bussen lige uden for min dør. Hvis jeg [blank_7] mig lidt, kan jeg lige præcis nå den. Det [blank_8] meget tålmodighed at bruge offentlig transport hver eneste dag.",blanks:[{answer:"fordi",options:["fordi","selvom","men"],hints:{selvom:"hintConj",men:"hintConj"}},{answer:"kraftigt",options:["kraftigt","kraftig","kraftige"],hints:{kraftig:"hintForm",kraftige:"hintForm"}},{answer:"temmelig",options:["temmelig","temmelige","temmeligt"],hints:{temmelige:"hintForm",temmeligt:"hintForm"}},{answer:"vigtige",options:["vigtige","vigtig","vigtigt"],hints:{vigtig:"hintForm",vigtigt:"hintForm"}},{answer:"må",options:["må","skal","kan"],hints:{skal:"hintContext",kan:"hintContext"}},{answer:"omhyggeligt",options:["omhyggeligt","omhyggelig","omhyggelige"],hints:{omhyggelig:"hintForm",omhyggelige:"hintForm"}},{answer:"holder",options:["holder","holdt","holdt"],hints:{holdt:"hintTense"}},{answer:"skynder",options:["skynder","skyndte","skyndet"],hints:{skyndte:"hintTense",skyndet:"hintTense"}},{answer:"kræver",options:["kræver","krævede","krævet"],hints:{krævede:"hintTense",krævet:"hintTense"}}]}]:u==="modultest"?[{text:"Velkommen til den store [blank_0], hvor vi skal teste dit danske sprog. Denne tekst er [blank_1] end de andre, da den fylder ti linjer. Du skal læse hele teksten [blank_2] for at forstå sammenhængen rigtigt. Det er vigtigt at du [blank_3] dig om, før du vælger et ord. Der er mange [blank_4] i listen ovenover, som du kan bruge. Hvis du laver en [blank_5], kan du altid prøve igen her. Vi håber at du får alle svar [blank_6] i første forsøg. Det kræver meget [blank_7] at lære et nyt sprog helt perfekt. Men vi ved at du [blank_8] gøre det, hvis du øver dig meget. Rigtig god [blank_9] med denne svære modultest opgave!",blanks:[{answer:"modultest",options:["modultest","eksamen","prøve"]},{answer:"længere",options:["længere","kort","sværere"]},{answer:"grundigt",options:["grundigt","hurtigt","nemt"]},{answer:"umager",options:["umager","gør","passer"]},{answer:"ord",options:["ord","tekster","sætninger"]},{answer:"fejl",options:["fejl","kage","pause"]},{answer:"rigtige",options:["rigtige","forkerte","sjove"]},{answer:"arbejde",options:["arbejde","hygge","mad"]},{answer:"kan",options:["kan","skal","får"]},{answer:"fornøjelse",options:["fornøjelse","lykke","held"]}]}]:[]}function we(u,d){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.innerHTML=`← ${n("back")}`,c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent=n("hvilketOrd"),e.appendChild(p);const s=document.createElement("div"),i=document.createElement("div"),o=document.createElement("div"),a=document.createElement("div"),l=document.createElement("div");o.style.display="none",a.style.display="none",l.style.display="none";let m=1;const r=document.createElement("div");r.className="grid",r.style.marginTop="2rem";const g=document.createElement("div");g.className="card",g.innerHTML=`
        <div class="card-icon">👥</div>
        <div class="card-title">${n("hanHamHans")}</div>
    `,g.onclick=()=>h("pronomen");const b=document.createElement("div");b.className="card",b.innerHTML=`
        <div class="card-icon">🏃</div>
        <div class="card-title">${n("gårGikGået")}</div>
    `,b.onclick=()=>h("verbum");const v=document.createElement("div");v.className="card",v.innerHTML=`
        <div class="card-icon">🚪</div>
        <div class="card-title">${n("derErDetEr")}</div>
    `,v.onclick=()=>f(),r.appendChild(g),r.appendChild(b),r.appendChild(v),i.appendChild(r),s.appendChild(i);const A=document.createElement("div");A.className="grid",o.appendChild(A),s.appendChild(o);function h(w){m=2,i.style.display="none",o.style.display="block",a.style.display="none",A.innerHTML="",(w==="pronomen"?[{key:"pronominerSubjekt",type:"subjekt",icon:"🔦",img:"pronominer_spotlight.png"},{key:"pronominerObjekt",type:"objekt",icon:"👤",img:"pronominer_objekt.png"},{key:"pronominerPossessiv",type:"possessiv",icon:"🏠",img:"pronominer_possessiv.png"}]:[{key:"verberM3",type:"verber_nutid",icon:"🏃",img:"verber_kategorier.png"},{key:"verberDatid",type:"datid",icon:"🕰️",img:"verber_kategorier.png"},{key:"verberTider",type:"tider",icon:"🌉",img:"tider_guide.png"}]).forEach(C=>{const x=document.createElement("div");x.className="card",x.onclick=()=>{C.type==="verber_nutid"?T():C.key.startsWith("verber")?d("verbum_learning",{categoryId:C.type}):D(C)};const N=document.createElement("div");N.className="card-icon",N.textContent=C.icon;const B=document.createElement("div");B.className="card-title",B.textContent=n(C.key),x.appendChild(N),x.appendChild(B),A.appendChild(x)})}const k=document.createElement("div");k.className="grid",a.appendChild(k),s.appendChild(a);function T(){m=3,o.style.display="none",a.style.display="block",k.innerHTML="",[{key:"verberHjaelpe",type:"hjaelpe",icon:"💡"},{key:"verberTilstand",type:"tilstand",icon:"🏠"},{key:"verberBevaegelse",type:"bevaegelse",icon:"🚶"},{key:"verberHandling",type:"handling",icon:"🛠️"},{key:"verberInteraktion",type:"interaktion",icon:"🗣️"},{key:"verberIndreLiv",type:"indre_liv",icon:"🧠"}].forEach(y=>{const C=document.createElement("div");C.className="card",C.onclick=()=>d("verbum_learning",{categoryId:y.type});const x=document.createElement("div");x.className="card-icon",x.textContent=y.icon;const N=document.createElement("div");N.className="card-title",N.textContent=n(y.key),C.appendChild(x),C.appendChild(N),k.appendChild(C)})}t.onclick=()=>{l.style.display==="block"?(l.style.display="none",s.style.display="block",m===3?(a.style.display="block",o.style.display="none"):(o.style.display="block",a.style.display="none"),p.textContent=n("hvilketOrd")):a.style.display==="block"?(a.style.display="none",o.style.display="block",m=2,p.textContent=n("hvilketOrd")):o.style.display==="block"?(o.style.display="none",i.style.display="block",m=1,p.textContent=n("hvilketOrd")):d("dagens_opgave")};function f(){s.style.display="none",l.style.display="block",l.innerHTML="",p.textContent=n("derErDetEr");const w=document.createElement("div");w.className="der-er-explanation";const y=document.createElement("div");y.className="expl-slide",y.innerHTML=`
            <img src="${q}der_er_bil_gade.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${n("derErIntro1")}</div>
            <p class="expl-text">${n("derErExpl")}</p>
            <button class="gemini-btn next-slide-btn">Næste →</button>
        `;const C=document.createElement("div");C.className="expl-slide",C.style.display="none",C.innerHTML=`
            <img src="${q}det_er_bil_pegepind.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${n("derErIntro2")}</div>
            <p class="expl-text">Når vi kender tingen (den er inde i rummet), så bruger vi <b>det</b> til at pege.</p>
            <button class="gemini-btn start-practice-btn">Start øvelse!</button>
        `,y.querySelector(".next-slide-btn").onclick=()=>{y.style.display="none",C.style.display="block"},C.querySelector(".start-practice-btn").onclick=()=>{E()},w.appendChild(y),w.appendChild(C),l.appendChild(w)}function E(){l.innerHTML="";const w=[{text:"Se! [blank_0] en hund i haven.",answer:"Der er",options:["Der er","Det er"]},{text:"[blank_0] en stor hund. Se den!",answer:"Det er",options:["Der er","Det er"]},{text:"Hvem banker på døren? [blank_0] nok min mor.",answer:"Det er",options:["Der er","Det er"]},{text:"[blank_0] mange mennesker i toget i dag.",answer:"Der er",options:["Der er","Det er"]},{text:"[blank_0] en dejlig kop kaffe, du har her.",answer:"Det er",options:["Der er","Det er"]}];let y=0;function C(){l.innerHTML="";const N=w[y],B=document.createElement("div");B.className="pronomen-exercise-content";const S=document.createElement("div");S.className="exercise-progress",S.textContent=`Opgave ${y+1} af ${w.length}`,B.appendChild(S);const j=document.createElement("div");j.className="grammatik-text-container",N.text.split(/(\[blank_0\])/).forEach(I=>{if(I==="[blank_0]"){const _=document.createElement("select");_.className="grammatik-select";const z=document.createElement("option");z.value="",z.textContent="...",_.appendChild(z),N.options.forEach($=>{const K=document.createElement("option");K.value=$,K.textContent=$,_.appendChild(K)});const O=document.createElement("div");O.className="exercise-feedback";const V=document.createElement("span");V.className="select-wrapper",V.appendChild(_),j.appendChild(V),_.onchange=()=>{_.value===N.answer?(_.classList.add("correct"),_.classList.remove("wrong"),O.style.display="none",M.disabled=!1):_.value!==""?(_.classList.add("wrong"),_.classList.remove("correct"),O.textContent=n("hintDerDet"),O.style.display="block",M.disabled=!0):(_.classList.remove("correct","wrong"),O.style.display="none",M.disabled=!0)},B.appendChild(O)}else{const _=document.createElement("span");_.textContent=I,j.appendChild(_)}}),B.appendChild(j);const M=document.createElement("button");M.className="gemini-btn",M.textContent="Check",M.disabled=!0,M.onclick=()=>{y++,y<w.length?C():x()},B.appendChild(M),l.appendChild(B)}function x(){l.innerHTML=`
                <div class="pronomen-exercise-content">
                    <h2>Flot klaret! 🎉</h2>
                    <p>Du har styr på 'Der er' og 'Det er'.</p>
                    <button class="gemini-btn" onclick="location.reload()">Tilbage til menu</button>
                </div>
            `}C()}function D(w){s.style.display="none",l.style.display="block",l.innerHTML="",p.textContent=n(w.key);const y=document.createElement("img");y.src=q+w.img,y.className="pronomen-illustration",l.appendChild(y);const C=Ee(w.type);let x=0;function N(){l.querySelectorAll(".pronomen-exercise-content").forEach(V=>V.remove());const S=document.createElement("div");S.className="pronomen-exercise-content";const j=C[x],P=document.createElement("div");P.className="grammatik-text-container",j.text.split(/(\[blank_\d+\])/).forEach(V=>{const $=V.match(/\[blank_(\d+)\]/);if($){const K=$[1],W=document.createElement("span");W.className="select-wrapper";const G=document.createElement("select");G.className="grammatik-select",G.dataset.idx=K;const R=document.createElement("option");R.value="",R.textContent="...",G.appendChild(R),[...j.blanks[K].options].sort(()=>Math.random()-.5).forEach(Y=>{const J=document.createElement("option");J.value=Y,J.textContent=Y,G.appendChild(J)}),P.appendChild(W)}else{const K=document.createElement("span");K.textContent=V,P.appendChild(K)}}),S.appendChild(P);const I=document.createElement("div");I.className="exercise-feedback",S.appendChild(I);const _=document.createElement("div");_.className="game-controls";const z=document.createElement("button");z.className="gemini-btn",z.textContent=n("checkAnswers"),z.onclick=()=>{const V=P.querySelectorAll("select");let $=!0,K="";V.forEach(W=>{const G=W.dataset.idx;W.value===j.blanks[G].answer?(W.classList.add("correct"),W.classList.remove("wrong")):(W.classList.add("wrong"),W.classList.remove("correct"),$=!1,K||(K=n("hintPronominer")))}),$?(I.style.display="none",z.style.display="none",O.style.display="inline-block"):(I.textContent=K,I.style.display="block")};const O=document.createElement("button");O.className="gemini-btn",O.textContent=n("newExercise"),O.style.display="none",O.onclick=()=>{x=(x+1)%C.length,N()},_.appendChild(z),_.appendChild(O),S.appendChild(_),l.appendChild(S)}N()}if(e.appendChild(s),e.appendChild(l),u.appendChild(e),!document.getElementById("pronomen-styles")){const w=document.createElement("style");w.id="pronomen-styles",w.textContent=`
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
        `,document.head.appendChild(w)}}function Ee(u){return u==="subjekt"?[{text:"Her er en mand. [blank_0] hedder Peter.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Mikael er lærer. [blank_0] bor i Aarhus.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Min far er gammel. [blank_0] er 80 år.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Drengen leger. [blank_0] er glad.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]}]:u==="objekt"?[{text:"Jeg ser en mand. Jeg ser [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]},{text:"Peter er her. Jeg ringer til [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]},{text:"Mikael er træt. Vi hjælper [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]}]:u==="possessiv"?[{text:"Her er Peter. [blank_0] bil er rød.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]},{text:"Mikael har en hund. [blank_0] hund er stor.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]},{text:"Min far er her. [blank_0] hus er gammelt.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]}]:[]}function De(u,d){const e=document.createElement("div");e.className="view-container grounding-view";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("dagens_opgave"),c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent=n("howToBuildSentence");const s=document.createElement("p");s.className="subtitle",s.textContent=n("howToBuildSentenceDesc"),e.appendChild(p),e.appendChild(s);const i=document.createElement("div");i.className="intro-area",i.innerHTML=`
        <div class="illustration-container">
            <img src="${q}images/grounding_balloon_child.png" alt="Balloon and Anchor" class="grounding-img">
        </div>
        <p class="grounding-text">${n("groundingIntro")}</p>
    `,e.appendChild(i);const o=document.createElement("div");o.className="exercise-container",e.appendChild(o);let a={step:1,nounAnchor:"",verbAnchor:"",sentenceParts:[]};function l(){o.innerHTML="",a.step===1?m():a.step===2?r():a.step===3&&g()}function m(){const h=document.createElement("div");h.className="step-content",h.innerHTML=`
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
        `,o.appendChild(h);const k=h.querySelector("#noun-select");k.onchange=()=>{k.value&&(a.nounAnchor=k.value,a.step=2,setTimeout(l,1e3))}}function r(){const h=document.createElement("div");h.className="step-content",h.innerHTML=`
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
        `,o.appendChild(h);const k=h.querySelector("#verb-select");k.onchange=()=>{k.value&&(a.verbAnchor=k.value,a.step=3,setTimeout(l,1e3))}}function g(){const h=document.createElement("div");h.className="step-content",h.innerHTML=`
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
        `,o.appendChild(h);const k=h.querySelectorAll(".drag-item"),T=h.querySelector("#ground"),f=h.querySelector("#source");k.forEach(y=>{y.ondragstart=C=>{C.dataTransfer.setData("text/plain",y.dataset.word),y.classList.add("dragging")},y.ondragend=()=>y.classList.remove("dragging")}),T.ondragover=y=>y.preventDefault(),T.ondrop=y=>{y.preventDefault();const C=y.dataTransfer.getData("text/plain"),x=f.querySelector(`.drag-item[data-word="${C}"]`)||T.querySelector(`.drag-item[data-word="${C}"]`);if(x){const N=E(T,y.clientX);N==null?T.appendChild(x):T.insertBefore(x,N)}};function E(y,C){return[...y.querySelectorAll(".drag-item:not(.dragging)")].reduce((N,B)=>{const S=B.getBoundingClientRect(),j=C-S.left-S.width/2;return j<0&&j>N.offset?{offset:j,element:B}:N},{offset:Number.NEGATIVE_INFINITY}).element}f.ondragover=y=>y.preventDefault(),f.ondrop=y=>{y.preventDefault();const C=document.querySelector(".drag-item.dragging");C&&f.appendChild(C)};const D=h.querySelector("#check-btn"),w=h.querySelector("#step-feedback");D.onclick=()=>{const y=Array.from(T.children).map(x=>x.dataset.word).join(" "),C=`${a.nounAnchor} barn ${a.verbAnchor}`.toLowerCase();y.toLowerCase()===C?(w.textContent="Flot! Se animationen nedenfor.",w.className="exercise-feedback success-text",w.style.display="block",D.disabled=!0,b(h,()=>{v(h),setTimeout(()=>{A(h)},5500)})):(w.textContent=n("wrongOrder"),w.className="exercise-feedback",w.style.display="block")}}function b(h,k){let T=h.querySelector(".focus-container");T||(T=document.createElement("div"),T.className="focus-container animate-in",h.appendChild(T));const f=a.nounAnchor.toLowerCase();let E="",D="";f==="mit"?(D="Mit barn (relation)",E=`
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
            `):f==="et"?(D="Et barn (ubestemt)",E=`
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
            `):f==="det"?(D="Det barn (udpegning)",E=`
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
            `):f==="dette"&&(D="Dette barn (nærhed)",E=`
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
                <h3>${D}</h3>
                ${E}
            </div>
        `,setTimeout(()=>{T.scrollIntoView({behavior:"smooth",block:"center"})},300),setTimeout(k,5e3)}function v(h){const k=h.querySelector(".focus-container");k&&(k.style.opacity="0.3",k.style.transition="opacity 0.5s");let T=h.querySelector(".timeline-container");T||(T=document.createElement("div"),T.className="timeline-container animate-in",h.appendChild(T)),T.innerHTML=`
            <div class="timeline-wrapper">
                <div class="timeline-line"></div>
                <div class="timeline-points">
                    <div class="time-point" data-tense="past">Datid</div>
                    <div class="time-point" data-tense="present">Nutid</div>
                    <div class="time-point" data-tense="future">Fremtid</div>
                </div>
                <div class="timeline-pointer" id="timeline-pointer">📍</div>
            </div>
        `,setTimeout(()=>{T.scrollIntoView({behavior:"smooth",block:"center"})},300);const f=T.querySelector("#timeline-pointer");let E="50%";a.verbAnchor==="spiste"&&(E="15%"),a.verbAnchor==="skal spise"&&(E="85%"),setTimeout(()=>{f.style.left=E,f.classList.add("bouncing")},100)}function A(h){let k=h.querySelector(".final-completion-container");k||(k=document.createElement("div"),k.className="final-completion-container animate-in",h.appendChild(k)),k.innerHTML=`
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
        `,k.querySelector("#finish-btn").onclick=()=>d("dagens_opgave"),k.querySelector("#start-modal").onclick=()=>d("modal_force",a),k.querySelector("#rec-bestemthed").onclick=()=>d("bestemthed"),k.querySelector("#rec-pronomen").onclick=()=>d("pronomen"),k.querySelector("#rec-verber").onclick=()=>d("verbum_learning",{categoryId:"datid"}),setTimeout(()=>{k.scrollIntoView({behavior:"smooth",block:"center"})},100)}if(l(),!document.getElementById("grounding-styles")){const h=document.createElement("style");h.id="grounding-styles",h.textContent=`
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
        `,document.head.appendChild(h)}u.appendChild(e)}const F=[{id:"hjaelpe",title:"Hjælpeverber",verbs:["kan","skal","vil","må","bør"],exercises:[{title:"Modalverber - Sæt 1",instruction:"Vælg det rigtige hjælpeverbum.",segments:[{type:"text",content:"1. **[I can speak Danish]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"kan",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" tale dansk.\\n\\n2. **[I must go now]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"skal",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" gå nu.\\n\\n3. **[I want to buy a cake]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"vil",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" gerne købe en kage.\\n\\n4. **[May I sit here?]**\\nDansk: "},{type:"gap",id:3,correct:"Må",options:["Må","Skal","Kan","Vil","Bør"],explanation:"hintAction"},{type:"text",content:" jeg sidde her?\\n\\n5. **[You should read this]**\\nDansk: Du "},{type:"gap",id:4,correct:"bør",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" læse denne bog."}],phase2_tasks:[{correct:"kan",definition:"Når man har evnen eller muligheden for at gøre noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Kan' udtrykker evne."},{correct:"skal",definition:"Når man er nødt til at gøre noget, eller har en plan.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Skal' udtrykker nødvendighed."},{correct:"vil",definition:"Når man har et ønske eller en lyst til noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Vil' udtrykker ønske."},{correct:"må",definition:"Når man har tilladelse til noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Må' udtrykker tilladelse."},{correct:"bør",definition:"Når noget er en god idé eller moralsk rigtigt.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Bør' udtrykker anbefaling."}]}]},{id:"tilstand",title:"Tilstand og navne",verbs:["er","har","bor","hedder","bliver"],exercises:[{title:"Hvem er jeg? - Sæt 1",instruction:"Vælg det rigtige verbum om din tilstand.",segments:[{type:"text",content:"1. **[I am happy]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"er",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" glad.\\n\\n2. **[I have a dog]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"har",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" en hund.\\n\\n3. **[I live in Aarhus]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"bor",options:["er","har","bor","hedder","bliver"],explanation:"hintPlace"},{type:"text",content:" i Aarhus.\\n\\n4. **[My name is Peter]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"hedder",options:["er","har","bor","hedder","bliver"],explanation:"hintName"},{type:"text",content:" Peter.\\n\\n5. **[I am becoming a doctor]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"bliver",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" læge næste år."}],phase2_tasks:[{correct:"er",definition:"Bruges til at identificere sig selv eller sin tilstand.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"har",definition:"Når man ejer noget.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"bor",definition:"Når man har sit hjem et bestemt sted.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"hedder",definition:"Bruges når man fortæller sit navn.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"bliver",definition:"Når man ændrer sig til noget nyt.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"}]}]},{id:"bevaegelse",title:"Bevægelse",verbs:["går","kører","rejser","falder","stiger"],exercises:[{title:"På farten - Sæt 1",instruction:"Vælg det rigtige verbum om bevægelse.",segments:[{type:"text",content:"1. **[I walk to school]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"går",options:["går","kører","rejser","falder","stiger"],explanation:"hintAction"},{type:"text",content:" til skole.\\n\\n2. **[I drive a car]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"kører",options:["går","kører","rejser","falder","stiger"],explanation:"hintAction"},{type:"text",content:" i bil.\\n\\n3. **[I travel to Spain]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"rejser",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" til Spanien i sommerferien.\\n\\n4. **[The apple falls from the tree]**\\nDansk: Æblet "},{type:"gap",id:3,correct:"falder",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" ned fra træet.\\n\\n5. **[The price increases]**\\nDansk: Prisen "},{type:"gap",id:4,correct:"stiger",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" hver måned."}],phase2_tasks:[{correct:"går",definition:"At flytte sig ved brug af benene.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"kører",definition:"At transportere sig i et køretøj som bil eller bus.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"rejser",definition:"At tage på en længere tur til et andet sted eller land.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"falder",definition:"At bevæge sig hurtigt mod jorden ved et uheld eller tyngdekraft.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"stiger",definition:"At bevæge sig opad eller blive højere (f.eks. priser).",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"}]}]},{id:"interaktion",title:"Sprog og kommunikation",verbs:["siger","taler","svarer","spørger","fortæller"],exercises:[{title:"Samtale - Sæt 1",instruction:"Vælg det rigtige verbum om kommunikation.",segments:[{type:"text",content:"1. **[What do you say?]**\\nDansk: Hvad "},{type:"gap",id:0,correct:"siger",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" du?\\n\\n2. **[I speak Danish]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"taler",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" dansk.\\n\\n3. **[I answer the letter]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"svarer",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" på brevet.\\n\\n4. **[I ask a question]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"spørger",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" om vej.\\n\\n5. **[I tell a story]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"fortæller",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" en god historie."}],phase2_tasks:[{correct:"siger",definition:"At bruge ord til at udtrykke noget.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"taler",definition:"At bruge stemmen og et bestemt sprog.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"svarer",definition:"At give respons på et spørgsmål eller brev.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"spørger",definition:"Når man vil have information fra en anden person.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"fortæller",definition:"At give en længere forklaring eller beretning om noget.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"}]}]},{id:"indre_liv",title:"Tanker og følelser",verbs:["ved","tror","mener","tænker","synes"],exercises:[{title:"Indre liv - Sæt 1",instruction:"Vælg det rigtige verbum om dine tanker.",segments:[{type:"text",content:"1. **[I know it]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"ved",options:["ved","tror","mener","tænker","synes"],explanation:"hintAction"},{type:"text",content:" det godt.\\n\\n2. **[I believe in it]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"tror",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" på dig.\\n\\n3. **[What is your opinion?]**\\nDansk: Hvad "},{type:"gap",id:2,correct:"mener",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" du om det?\\n\\n4. **[I am thinking about you]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tænker",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" på dig.\\n\\n5. **[I think (opinion) it's fun]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"synes",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" det er sjovt."}],phase2_tasks:[{correct:"ved",definition:"Når man har faktuel information om noget.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"tror",definition:"Når man antager noget eller har en religiøs overbevisning.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"mener",definition:"Når man har en holdning eller vil udtrykke en betydning.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"tænker",definition:"Den generelle proces der foregår i hovedet.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"synes",definition:"Når man har en personlig, følelsesmæssig holdning eller smag.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"}]}]},{id:"handling",title:"Handling og præstation",verbs:["laver","gør","bruger","tager","finder"],exercises:[{title:"I gang - Sæt 1",instruction:"Vælg det rigtige verbum om handlinger.",segments:[{type:"text",content:"1. **[I am doing my homework]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"laver",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" lektier.\\n\\n2. **[I do my best]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"gør",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" mit bedste.\\n\\n3. **[I use a computer]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"bruger",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" en computer.\\n\\n4. **[I take the bus]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tager",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" bussen.\\n\\n5. **[I find my keys]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"finder",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" mine nøgler."}],phase2_tasks:[{correct:"laver",definition:"At producere eller udføre noget (især lektier eller mad).",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"gør",definition:"At udføre en handling (især abstrakte ting som 'sit bedste').",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"bruger",definition:"At anvende et redskab eller en ressource.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"tager",definition:"At fatte om noget eller vælge en transportmulighed.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"finder",definition:"At opdage noget man leder efter.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"}]}]},{id:"datid",title:"Verber i Datid",verbs:["så","gik","kom","tog","spiste"],exercises:[{title:"I går - Sæt 1",instruction:"Vælg det rigtige verbum i datid.",segments:[{type:"text",content:"1. **[Yesterday I saw a movie]**\\nDansk: I går "},{type:"gap",id:0,correct:"så",options:["så","ser","seet","tog","gik"],explanation:"hintContext"},{type:"text",content:" jeg en god film.\\n\\n2. **[We walked to the party]**\\nDansk: Vi "},{type:"gap",id:1,correct:"gik",options:["så","gik","går","gået","kom"],explanation:"hintContext"},{type:"text",content:" til fest i lørdags.\\n\\n3. **[He came late this morning]**\\nDansk: Han "},{type:"gap",id:2,correct:"kom",options:["kom","kommer","kommet","så","tog"],explanation:"hintContext"},{type:"text",content:" for sent i morges.\\n\\n4. **[I took a cake with me]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tog",options:["tog","tager","taget","så","gik"],explanation:"hintContext"},{type:"text",content:" en kage med i går.\\n\\n5. **[We ate dinner at 18]**\\nDansk: Vi "},{type:"gap",id:4,correct:"spiste",options:["spiser","spist","spiste","kom","tog"],explanation:"hintContext"},{type:"text",content:" aftensmad klokken 18 i går."}],phase2_tasks:[{correct:"så",definition:"At have set noget i fortiden (datid af 'se').",options:["så","ser","seet","tog","gik"],explanation:"Korrekt!"},{correct:"gik",definition:"At have gået et sted hen i fortiden (datid af 'gå').",options:["så","gik","går","gået","kom"],explanation:"Korrekt!"},{correct:"kom",definition:"At være ankommet i fortiden (datid af 'komme').",options:["kom","kommer","kommet","så","tog"],explanation:"Korrekt!"},{correct:"tog",definition:"At have taget noget i fortiden (datid af 'tage').",options:["tog","tager","taget","så","gik"],explanation:"Korrekt!"},{correct:"spiste",definition:"At have indtaget mad i fortiden (datid af 'spise').",options:["spiser","spist","spiste","kom","tog"],explanation:"Korrekt!"}]}]},{id:"tider",title:"Datid eller førnutid?",verbs:["var","har været","kom","er kommet","drak","har drukket"],exercises:[{title:"Tidspunkter - Sæt 1",instruction:"Husk: Punktet (datid) er et bestemt tidspunkt. Broen (førnutid) forbinder fortid og nu.",segments:[{type:"text",content:"1. **[I was in the cinema yesterday]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"var",options:["var","har været"],explanation:"hintContext"},{type:"text",content:" i biografen i går.\\n\\n2. **[I have been in the cinema many times]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"har været",options:["var","har været"],explanation:"hintContext"},{type:"text",content:" i biografen mange gange.\\n\\n3. **[In 2010 he came to Denmark]**\\nDansk: I 2010 "},{type:"gap",id:2,correct:"kom",options:["kom","er kommet"],explanation:"hintContext"},{type:"text",content:" han til Danmark.\\n\\n4. **[He has just come to Denmark]**\\nDansk: Han "},{type:"gap",id:3,correct:"er kommet",options:["kom","er kommet"],explanation:"hintContext"},{type:"text",content:" lige til Danmark.\\n\\n5. **[We drank coffee an hour ago]**\\nDansk: Vi "},{type:"gap",id:4,correct:"drak",options:["drak","har drukket"],explanation:"hintContext"},{type:"text",content:" kaffe for en time siden."}],phase2_tasks:[{correct:"var",definition:"Bruges om en tilstand på et bestemt tidspunkt i fortiden.",options:["var","har været"],explanation:"Korrekt!"},{correct:"har været",definition:"Bruges når vi ser på erfaringen frem til nu.",options:["var","har været"],explanation:"Korrekt!"},{correct:"kom",definition:"Bruges om ankomst på et bestemt årstal eller tidspunkt.",options:["kom","er kommet"],explanation:"Korrekt!"},{correct:"er kommet",definition:"Bruges når handlingen lige er sket og er vigtig nu.",options:["kom","er kommet"],explanation:"Korrekt!"},{correct:"drak",definition:"Bruges om kaffedrikning på et bestemt tidspunkt i fortiden.",options:["drak","har drukket"],explanation:"Korrekt!"}]}]}];class Te{constructor(d,e=null){this.navigateFn=d,this.currentCategoryIndex=e?F.findIndex(c=>c.id===e):0,this.currentCategoryIndex===-1&&(this.currentCategoryIndex=0),this.currentExerciseIndex=0,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={}}render(){const d=document.createElement("div");d.className="verbum-learning-view view-container";const e=F[this.currentCategoryIndex];if(!e)return d;const c=e.exercises[this.currentExerciseIndex];if(!c)return d;const t=localStorage.getItem("appLang")||"da",p=s=>U[t]?.[s]||U.da?.[s]||s;return d.innerHTML=`
      <div class="top-bar">
        <button class="back-btn" id="back-to-main">← ${n("back")}</button>
      </div>
      <h1>${e.title}</h1>
      
      <div class="exercise-card">
        <img src="${q}verber_kategorier.png" class="category-illustration" alt="Category Illustration">
        
        <div class="exercise-header">
          <h2 style="text-align: center;">${c.title}</h2>
          <p class="subtitle" style="text-align: center;">${this.currentPhase===1?c.instruction:p("phase2_instruction")||"Gæt verbet ud fra definitionen."}</p>
        </div>

        <div class="grammatik-text-container" id="exercise-content">
          ${this.currentPhase===1?this.renderPhase1(c):this.renderPhase2(c)}
        </div>

        <div class="exercise-feedback" id="exercise-feedback"></div>

        <div class="grammatik-summary" id="grammatik-summary">
          ${this.getSummaryText(c)}
        </div>

        <div class="game-controls">
          <button class="gemini-btn" id="check-answers">${n("checkAnswers")}</button>
          ${this.renderFooterButtons(e)}
        </div>
      </div>
`,this.attachEventListeners(d),this.ensureStyles(),d}getSummaryText(d){const c=(this.currentPhase===1?d.segments.filter(p=>p.type==="gap"):d.phase2_tasks).length,t=Object.values(this.feedback).filter(p=>p==="correct").length;return t===0?"":t===c?`<span class="success">${n("allCorrect")}</span>`:`${t} / ${c} ${n("filled")||"korrekte"}`}renderPhase1(d){return d.segments.map(e=>{if(e.type==="text")return`<span class="text-part">${e.content.replace(/\\n/g,"<br>")}</span>`;if(e.type==="gap"){const c=this.feedback[e.id]==="correct",t=this.feedback[e.id]==="wrong";return`
          <span class="select-wrapper">
            <div class="select-hint ${this.showHints[e.id]?"visible":""}">
                ${n(e.explanation||"hintContext")}
            </div>
            <select class="grammatik-select ${c?"correct":""} ${t?"wrong":""}" data-id="${e.id}" ${c?"disabled":""}>
              <option value="">...</option>
              ${e.options.map(s=>`<option value="${s}" ${this.answers[e.id]===s?"selected":""}>${s}</option>`).join("")}
            </select>
          </span>
        `}}).join("")}renderPhase2(d){return d.phase2_tasks.map((e,c)=>{const t=`phase2-${c}`,p=this.feedback[t]==="correct",s=this.feedback[t]==="wrong",i=this.showHints[t];return`
        <div class="phase2-item" style="margin-bottom: 2rem; text-align: left;">
          <p class="definition"><strong>${c+1}.</strong> ${e.definition}</p>
          <span class="select-wrapper">
            <div class="select-hint ${i?"visible":""}">
                ${e.explanation||"Prøv igen!"}
            </div>
            <select class="grammatik-select ${p?"correct":""} ${s?"wrong":""}" data-task-id="${t}" ${p?"disabled":""}>
              <option value="">...</option>
              ${e.options.map(o=>`<option value="${o}" ${this.answers[t]===o?"selected":""}>${o}</option>`).join("")}
            </select>
          </span>
        </div>
      `}).join("")}renderFooterButtons(d){const e=d.exercises[this.currentExerciseIndex],c=this.currentPhase===1?e.segments.filter(i=>i.type==="gap").length:e.phase2_tasks.length;if(!(Object.values(this.feedback).filter(i=>i==="correct").length===c))return"";const s=this.currentExerciseIndex===d.exercises.length-1;return this.currentPhase===1?'<button class="gemini-btn" id="next-phase">Næste fase →</button>':s?'<button class="gemini-btn" id="next-category">Næste kategori →</button>':'<button class="gemini-btn" id="next-exercise">Næste opgave →</button>'}attachEventListeners(d){d.querySelector("#back-to-main").onclick=()=>{this.navigateFn("main")},d.querySelectorAll(".grammatik-select").forEach(s=>{s.onchange=i=>{const o=i.target.dataset.id||i.target.dataset.taskId;this.answers[o]=i.target.value,delete this.feedback[o],this.showHints[o]=!1,this.updateView()}});const e=d.querySelector("#check-answers");if(e){e.onclick=()=>{const a=F[this.currentCategoryIndex].exercises[this.currentExerciseIndex];let l=!0,m="";this.currentPhase===1?a.segments.forEach(g=>{g.type==="gap"&&(this.answers[g.id]===g.correct?this.feedback[g.id]="correct":(this.feedback[g.id]="wrong",m||(m=n(g.explanation||"hintAction")),l=!1))}):a.phase2_tasks.forEach((g,b)=>{const v=`phase2-${b}`;this.answers[v]===g.correct?this.feedback[v]="correct":(this.feedback[v]="wrong",m||(m=g.explanation||n("hintAction")),l=!1)});const r=d.querySelector("#exercise-feedback");l?r.style.display="none":(r.textContent=m,r.style.display="block"),this.updateView()};const s=F[this.currentCategoryIndex].exercises[this.currentExerciseIndex],i=this.currentPhase===1?s.segments.filter(a=>a.type==="gap").length:s.phase2_tasks.length;Object.values(this.feedback).filter(a=>a==="correct").length===i&&(e.style.display="none")}const c=d.querySelector("#next-phase");c&&(c.onclick=()=>{this.currentPhase=2,this.answers={},this.feedback={},this.showHints={},this.updateView()});const t=d.querySelector("#next-exercise");t&&(t.onclick=()=>{this.currentExerciseIndex++,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={},this.updateView()});const p=d.querySelector("#next-category");p&&(p.onclick=()=>{this.currentCategoryIndex++,this.currentExerciseIndex=0,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={},this.updateView()})}updateView(){const d=document.querySelector(".verbum-learning-view");if(d){const e=this.render();d.replaceWith(e)}}}function Ne(u,d){const e=document.createElement("div");e.className="view-container bestemthed-view";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+n("back"),t.onclick=()=>d("grounding"),c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent="Bestemthed - En eller Et?";const s=document.createElement("p");s.className="subtitle",s.textContent="Lær at vælge det rigtige kendeord (artikel) til navneord.",e.appendChild(p),e.appendChild(s);const i=document.createElement("div");i.className="exercise-container",e.appendChild(i);const o=[{word:"bil",correct:"en",icon:"🚗"},{word:"hus",correct:"et",icon:"🏠"},{word:"barn",correct:"et",icon:"👶"},{word:"kop",correct:"en",icon:"☕"},{word:"æble",correct:"et",icon:"🍎"},{word:"stol",correct:"en",icon:"🪑"}];let a=0,l=0;function m(){if(i.innerHTML="",a>=o.length){r();return}const g=o[a],b=document.createElement("div");b.className="step-content animate-in",b.innerHTML=`
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
                    <div class="object-bubble">${g.icon}</div>
                </div>
            </div>
            <h3>Hvad hedder det?</h3>
            <div class="word-display">____ ${g.word}</div>
            <div class="options-grid">
                <button class="option-btn" data-val="en">En</button>
                <button class="option-btn" data-val="et">Et</button>
            </div>
            <div class="feedback-area" id="feedback"></div>
        `,i.appendChild(b),b.querySelectorAll(".option-btn").forEach(v=>{v.onclick=()=>{const A=v.dataset.val,h=b.querySelector("#feedback");A===g.correct?(h.textContent="Korrekt! ✅",h.className="feedback-area success",l++,v.classList.add("correct"),setTimeout(()=>{a++,m()},1e3)):(h.textContent="Prøv igen! ❌",h.className="feedback-area error",v.classList.add("wrong"))}})}function r(){i.innerHTML=`
            <div class="step-content final-step animate-in">
                <div class="success-icon">🎉</div>
                <h2>Flot gået!</h2>
                <p>Du fik ${l} ud af ${o.length} rigtige.</p>
                <button class="gemini-btn" id="finish-btn">Tilbage til Grounding</button>
            </div>
        `,i.querySelector("#finish-btn").onclick=()=>d("grounding")}if(m(),!document.getElementById("bestemthed-styles")){const g=document.createElement("style");g.id="bestemthed-styles",g.textContent=`
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
        `,document.head.appendChild(g)}u.appendChild(e)}function Ae(u,d,e={}){const c=document.createElement("div");c.className="view-container modal-force-view";const t={nounAnchor:e.nounAnchor||"Et",verbAnchor:(e.verbAnchor||"spiser").replace(" (nu)","").replace(" (i går)","").replace(" (senere)",""),selectedModal:e.selectedModal||""},p=document.createElement("div");p.className="top-bar";const s=document.createElement("button");s.className="back-btn",s.textContent="← "+n("back"),s.onclick=()=>d("grounding"),p.appendChild(s),c.appendChild(p);const i=document.createElement("h1");i.textContent="Modalverber: den usynlige kraft";const o=document.createElement("p");o.className="subtitle",o.textContent='Modalverber ændrer ikke handlingen, men de ændrer "kraften" bag den.',c.appendChild(i),c.appendChild(o);const a=document.createElement("div");a.className="exercise-container",c.appendChild(a);function l(){a.innerHTML=`
            <div id="force-section" class="step-content animate-in">
                <div class="force-visualization" id="force-viz">
                    <div class="viz-placeholder">Vælg et modalverbum for at se kraften</div>
                </div>

                <div class="modal-interaction">
                    <span class="sentence-part">${t.nounAnchor} barn</span>
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
        `;const g=a.querySelector("#modal-select"),b=a.querySelector("#force-viz"),v=a.querySelector("#force-expl"),A=a.querySelector("#nav-controls"),h=a.querySelector("#next-step-btn"),k=a.querySelector("#teaser-section"),T=a.querySelector("#go-to-adj-btn"),f=a.querySelector("#finish-btn"),E=a.querySelector("#rec-hjaelpe");t.selectedModal&&(g.value=t.selectedModal,r(t.selectedModal,b,v)),g.onchange=()=>{const D=g.value;if(t.selectedModal=D,r(D,b,v),D){A.style.display="block";const w=a.querySelector("#modal-word-marker");w&&(w.textContent=D)}},h.onclick=()=>{const D=a.querySelector("#finiteness-section");D.style.display="block",m(),h.style.display="none",setTimeout(()=>{D.scrollIntoView({behavior:"smooth",block:"start"})},50),setTimeout(()=>{k.style.display="block"},1500)},T.onclick=()=>d("adjective_bridge",{nounAnchor:t.nounAnchor,selectedModal:t.selectedModal}),f.onclick=()=>d("dagens_opgave"),E.onclick=()=>d("verbum_learning",{categoryId:"hjaelpe"})}function m(){const g=a.querySelector("#timeline-svg"),b=a.querySelector("#photo-svg"),v=a.querySelector("#modal-word-marker"),A=a.querySelectorAll(".toggle-btn"),h=a.querySelector("#action-word-static");g.innerHTML=`
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
        `,A.forEach(k=>{k.onclick=()=>{A.forEach(D=>D.classList.remove("active")),k.classList.add("active");const T=k.dataset.time,f=t.selectedModal||"skal",E=a.querySelector("#moving-dot");if(T==="da"){E.setAttribute("cx","100");const D={skal:"skulle",må:"måtte",vil:"ville",kan:"kunne"};v.textContent=D[f]||f,v.style.color="#ff9800",v.classList.add("shift-past")}else E.setAttribute("cx","300"),v.textContent=f,v.style.color="white",v.classList.remove("shift-past");h.classList.add("action-pulse"),setTimeout(()=>h.classList.remove("action-pulse"),800)}})}function r(g,b,v){b.innerHTML="",v.innerHTML="",v.className="force-explanation visible";let A="",h="";const k=`
            <style>
                .viz-svg { width: 100%; max-width: 500px; height: 300px; }
                .stickman { stroke: white; stroke-width: 3; fill: none; }
                .target { fill: #ffeb3b; filter: drop-shadow(0 0 10px rgba(255, 235, 59, 0.5)); }
                .force-line { stroke-width: 4; stroke-linecap: round; fill: none; }
            </style>
        `;g==="skal"?(h="<strong>SKAL (social kraft):</strong> En ydre kraft eller en uundgåelig plan skubber barnet mod handlingen. Der er ingen vej udenom.",A=`
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
            `):g==="må"?(h='<strong>MÅ (fjernelse af barriere):</strong> Vejen er spærret, men modalverbet "må" fjerner barrieren og giver tilladelse.',A=`
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
            `):g==="vil"?(h="<strong>VIL (indre lyst):</strong> Kraften kommer indefra barnet selv. Det er et ønske eller en vilje, der trækker i retning af maden.",A=`
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
            `):g==="kan"&&(h="<strong>KAN (evne/potentiale):</strong> Barnet har energien og evnen til at udføre handlingen. Det er en indre ressource.",A=`
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
            `),b.innerHTML=k+A,v.innerHTML=h}if(l(),!document.getElementById("modal-force-styles")){const g=document.createElement("style");g.id="modal-force-styles",g.textContent=`
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
        `,document.head.appendChild(g)}u.appendChild(c)}function je(u,d,e={}){const c=document.createElement("div");c.className="view-container adjective-bridge-view";const t={nounAnchor:e.nounAnchor||"Et",selectedModal:e.selectedModal||"skal",selectedAdjective:""},p=document.createElement("div");p.className="top-bar";const s=document.createElement("button");s.className="back-btn",s.textContent="← "+n("back"),s.onclick=()=>d("modal_force",{nounAnchor:t.nounAnchor,selectedModal:t.selectedModal}),p.appendChild(s),c.appendChild(p);const i=document.createElement("h1");i.textContent=n("adjectiveTitle");const o=document.createElement("p");o.className="subtitle",o.textContent=n("adjectiveDesc"),c.appendChild(i),c.appendChild(o);const a=document.createElement("div");a.className="exercise-container",c.appendChild(a);function l(){a.innerHTML=`
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
                        <div class="noun-influence-box" id="noun-magnet">
                            <div class="magnet-label">Substantiv</div>
                            <div class="magnet-word" id="magnet-noun-display">Barn</div>
                            <!-- Magnetic Waves SVG -->
                            <div class="magnet-waves" id="magnet-waves-svg"></div>
                        </div>

                        <div class="adjective-shape-box" id="adj-shaped">
                            <div class="shape-label">Adjektiv</div>
                            <div class="word-container">
                                <span class="stem">træt</span><span class="suffix" id="adj-suffix"></span>
                            </div>
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

                <div class="navigation-controls" style="margin-top: 4rem;">
                    <button class="gemini-btn outline-btn" id="finish-btn">Afslut og gå tilbage</button>
                </div>
            </div>
        `;const r=a.querySelector("#adj-projector-svg"),g=a.querySelector("#adj-select"),b=a.querySelector("#adj-expl"),v=a.querySelector("#finish-btn"),A=a.querySelector("#next-agreement-btn");r.innerHTML=`
            <svg viewBox="0 0 200 120" class="projector-svg-main">
                <rect x="20" y="40" width="60" height="40" rx="4" fill="#444" stroke="white" stroke-width="2" />
                <circle cx="40" cy="60" r="12" fill="#333" stroke="white" />
                <!-- Beam -->
                <path id="adj-beam" d="M 80 60 L 180 20 L 180 100 Z" fill="rgba(255, 235, 59, 0.4)" style="transition: all 0.5s ease;" />
                <!-- Highlighted area (Kugle) -->
                <circle id="adj-target-circle" cx="180" cy="60" r="35" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="1" style="transition: all 0.8s ease;" />
            </svg>
        `;const h=[{id:"sød",forms:{en:"sød",et:"sødt",def:"søde"}},{id:"glad",forms:{en:"glad",et:"glad",def:"glade"}},{id:"træt",forms:{en:"træt",et:"træt",def:"trætte"}}],T=t.nounAnchor!=="Et"&&t.nounAnchor!=="En"?"def":t.nounAnchor==="Et"?"et":"en";g.innerHTML+=h.map(f=>`<option value="${f.forms[T]}" data-base="${f.id}">${f.forms[T]}</option>`).join(""),g.onchange=()=>{const E=g.options[g.selectedIndex].dataset.base,D=g.value;if(!E)return;t.selectedAdjective=D,b.innerHTML=`
                <div class="agreement-notice">
                    <strong>${t.nounAnchor} ${D} barn...</strong><br>
                    ${n("adjectiveExpl")}
                </div>
            `,b.className="force-explanation visible";const w=a.querySelector("#adj-beam"),y=a.querySelector("#adj-target-circle"),x={sød:{beam:"rgba(255, 105, 180, 0.5)",circle:"rgba(255, 105, 180, 0.4)"},glad:{beam:"rgba(255, 235, 59, 0.6)",circle:"rgba(255, 235, 59, 0.5)"},træt:{beam:"rgba(100, 149, 237, 0.5)",circle:"rgba(100, 149, 237, 0.4)"}}[E]||{beam:"rgba(255, 255, 255, 0.4)",circle:"rgba(255, 255, 255, 0.2)"};w.style.fill=x.beam,y.style.fill=x.circle,y.setAttribute("r","40"),setTimeout(()=>y.setAttribute("r","35"),500)},v.onclick=()=>d("dagens_opgave"),A.onclick=()=>{const f=a.querySelector("#agreement-section");f.style.display="block",m(),A.style.display="none",setTimeout(()=>{f.scrollIntoView({behavior:"smooth",block:"start"})},50)}}function m(){const r=a.querySelector("#magnet-waves-svg"),g=a.querySelector("#magnet-noun-display"),b=a.querySelector("#adj-suffix"),v=a.querySelector(".stem"),A=a.querySelectorAll(".toggle-btn");let h="barn",k="ubestemt";function T(){const E=k==="bestemt"?"#4caf50":"rgba(255,255,255,0.2)",D=k==="bestemt"?"0.6":"0.2";r.innerHTML=`
                <svg viewBox="0 0 200 60" style="width: 100%; height: 60px;">
                    <path d="M 20 10 Q 60 10 100 10" fill="none" stroke="${E}" stroke-width="2" opacity="${D}">
                        <animate attributeName="stroke-dashoffset" from="40" to="0" dur="1s" repeatCount="infinite" />
                    </path>
                    <path d="M 20 30 Q 60 30 180 30" fill="none" stroke="${E}" stroke-width="3" opacity="${D}">
                        <animate attributeName="d" values="M 20 30 Q 60 30 180 30; M 20 30 Q 60 40 180 30; M 20 30 Q 60 30 180 30" dur="2s" repeatCount="infinite" />
                    </path>
                    <path d="M 20 50 Q 60 50 140 50" fill="none" stroke="${E}" stroke-width="2" opacity="${D}" />
                </svg>
            `}function f(){h==="barn"?(g.textContent=k==="ubestemt"?"Et barn":"Barnet",v.textContent="sød",k==="bestemt"?(b.textContent="de",b.classList.add("active")):(b.textContent="t",b.classList.add("active"))):(g.textContent=k==="ubestemt"?"En bil":"Bilen",v.textContent="hurtig",k==="bestemt"?(b.textContent="e",b.classList.add("active")):(b.textContent="",b.classList.remove("active"))),T()}A.forEach(E=>{E.onclick=()=>{E.parentElement.querySelectorAll(".toggle-btn").forEach(w=>w.classList.remove("active")),E.classList.add("active"),E.dataset.type&&(k=E.dataset.type),E.dataset.word&&(h=E.dataset.word),f()}}),f()}if(l(),!document.getElementById("adj-bridge-styles")){const r=document.createElement("style");r.id="adj-bridge-styles",r.textContent=`
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
                left: 170px;
                right: 220px;
                top: 50%;
                transform: translateY(-50%);
                pointer-events: none;
            }
            .adjective-shape-box {
                background: rgba(255,255,255,0.05);
                padding: 1.5rem 2rem;
                border-radius: 16px;
                border: 2px dashed rgba(255,255,255,0.2);
                margin-left: auto;
                min-width: 180px;
                text-align: center;
                transition: all 0.5s ease;
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
        `,document.head.appendChild(r)}u.appendChild(c)}const q="/Dansk/";function L(u,d={}){const e=document.querySelector("#app");if(e.innerHTML="",u==="language")H.currentView="language",X(e,L);else if(u==="main")H.currentView="main",ee(e,L);else if(u==="notes")H.currentView="notes",te(e,L);else if(u==="dagens_opgave")H.currentView="dagens_opgave",ne(e,L);else if(u==="word_learning")H.currentView="word_learning",ae(e,L);else if(u==="samtale_traening")H.currentView="samtale_traening",re(e,L);else if(u==="samtale_hverdag")H.currentView="samtale_hverdag",ie(e,L);else if(u==="skrive_hjaelp")H.currentView="skrive_hjaelp",oe(e,L);else if(u==="du1_modul3")H.currentView="du1_modul3",se(e,L);else if(u==="du2_modul1")H.currentView="du2_modul1",pe(e,L);else if(u==="smaa_historier")H.currentView="smaa_historier",ge(e,L);else if(u==="du2_modul5")H.currentView="du2_modul5",ue(e,L);else if(u==="email_laan")H.currentView="email_laan",he(e,L);else if(u==="opdragelse")H.currentView="opdragelse",be(e,L);else if(u==="en_klage")H.currentView="en_klage",ve(e,L);else if(u==="du1_min_hverdag")H.currentView="du1_min_hverdag",le(e,L);else if(u==="transport_sprogskole")H.currentView="transport_sprogskole",ce(e,L);else if(u==="du1_madlavning")H.currentView="du1_madlavning",de(e,L);else if(u==="du1_rengoering")H.currentView="du1_rengoering",me(e,L);else if(u==="traen_tidsudtryk")H.currentView="traen_tidsudtryk",ke(e,L);else if(u==="lav_sporgsmal")H.currentView="lav_sporgsmal",ye(e,L);else if(u==="ordstilling")H.currentView="ordstilling",xe(e,L);else if(u==="traen_grammatik")H.currentView="traen_grammatik",fe(e,L);else if(u==="pronomen")H.currentView="pronomen",we(e,L);else if(u==="verbum_learning"){H.currentView="verbum_learning";const c=new Te(L,d?.categoryId);e.appendChild(c.render())}else u==="grounding"?(H.currentView="grounding",De(e,L)):u==="bestemthed"?(H.currentView="bestemthed",Ne(e,L)):u==="modal_force"?(H.currentView="modal_force",Ae(e,L,d)):u==="adjective_bridge"&&(H.currentView="adjective_bridge",je(e,L,d))}document.addEventListener("DOMContentLoaded",()=>{H.lang?L("main"):L("language")});
